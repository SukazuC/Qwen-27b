---
name: take-screenshots
description: use this skill when a frontend task requires screenshots, browser inspection, visual verification, or design matching. it manages the dev server without blocking the shell, captures screenshots, prevents restart loops, and cleans up only processes it started.
---

# Take Screenshots Safely

## Non-negotiable rule

Never run `npm run dev`, `pnpm dev`, `yarn dev`, `bun run dev`, `vite`, or `next dev` in the foreground.

A foreground dev server blocks the shell and prevents screenshot commands from running.

Always start the dev server as a background process, store its PID, write logs, probe readiness with a timeout, then run the screenshot command from the free shell.

## Runtime files

Use:

```text
.agent/dev-server.pid
.agent/dev-server.log
.agent/latest-screenshot.png
```

Create the directory first:

```powershell
New-Item -ItemType Directory -Force .agent | Out-Null
```

## Server procedure

1. Check if the expected URL already responds.
2. If it responds, reuse it.
3. If it does not respond, start the dev server in the background.
4. Store the started process PID in `.agent/dev-server.pid`.
5. Write stdout and stderr to `.agent/dev-server.log`.
6. Wait for readiness with a maximum timeout of 45 seconds.
7. If readiness fails, read the log. Do not repeatedly restart.

## Preferred ports

Use the framework default unless the project says otherwise:

```text
Next.js: http://127.0.0.1:3000
Vite/React: http://127.0.0.1:5173
Astro: http://127.0.0.1:4321
```

## Start server in background

For Vite/React:

```powershell
New-Item -ItemType Directory -Force .agent | Out-Null

$port = 5173
$url = "http://127.0.0.1:$port"

try {
  $response = Invoke-WebRequest $url -UseBasicParsing -TimeoutSec 2
  if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
    Write-Host "Dev server already responding at $url"
    exit 0
  }
} catch {
  Write-Host "No existing dev server responding at $url"
}

$cmd = "npm run dev -- --host 127.0.0.1 --port $port"
$log = ".agent/dev-server.log"

$process = Start-Process `
  -FilePath "powershell" `
  -ArgumentList "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", $cmd `
  -RedirectStandardOutput $log `
  -RedirectStandardError $log `
  -PassThru `
  -WindowStyle Hidden

$process.Id | Set-Content ".agent/dev-server.pid"
Write-Host "Started dev server PID $($process.Id) at $url"
```

For Next.js, use:

```powershell
$port = 3000
$url = "http://127.0.0.1:$port"
$cmd = "npm run dev -- -H 127.0.0.1 -p $port"
```

## Wait for readiness

```powershell
$deadline = (Get-Date).AddSeconds(45)
$ready = $false

while ((Get-Date) -lt $deadline) {
  try {
    $response = Invoke-WebRequest $url -UseBasicParsing -TimeoutSec 2
    if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
      $ready = $true
      break
    }
  } catch {
    Start-Sleep -Seconds 1
  }
}

if (-not $ready) {
  Write-Host "Dev server did not become ready. Last log lines:"
  Get-Content ".agent/dev-server.log" -Tail 120
  exit 1
}

Write-Host "Dev server ready at $url"
```

## Screenshot

If the project already has a screenshot command, run it now.

Examples:

```powershell
npm run screenshot
node scripts/agent-screenshot.mjs http://127.0.0.1:5173 .agent/latest-screenshot.png 1440 900
```

If no screenshot script exists, create one using Playwright.

## Anti-loop rule

If the dev server has been started or stopped twice without a successful screenshot, stop manipulating the server.

Do this instead:

```text
read .agent/dev-server.log
identify the first real error
fix the error
start once
probe once
screenshot once
```

Do not continue this loop:

```text
check server
kill server
start server
wait
kill server
start server
wait
```

## Cleanup

Only stop the process if this skill started it and `.agent/dev-server.pid` exists.

```powershell
if (Test-Path ".agent/dev-server.pid") {
  $pidValue = Get-Content ".agent/dev-server.pid" -ErrorAction SilentlyContinue
  if ($pidValue) {
    $proc = Get-Process -Id $pidValue -ErrorAction SilentlyContinue
    if ($proc) {
      Stop-Process -Id $pidValue -Force
      Write-Host "Stopped dev server PID $pidValue"
    }
  }
  Remove-Item ".agent/dev-server.pid" -Force -ErrorAction SilentlyContinue
}
```

Never kill all `node.exe`, `npm`, `pnpm`, `yarn`, browser, or IDE processes.

## Completion criteria

The task is not complete until:

- the dev server responded successfully;
- a screenshot was captured;
- the screenshot was inspected;
- the main visual issue was addressed;
- no foreground dev server is blocking the shell.
