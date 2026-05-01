---
name: take-screenshots
description: use this skill when a frontend task requires screenshots, browser inspection, visual verification, or design matching for the HYDRE Nutrition Next.js app. it manages the pnpm dev server on Windows without blocking the shell, captures screenshots, prevents restart loops, and automatically cleans up only the process tree it started.
---

# Take Screenshots Safely

## Project assumptions

This skill is configured for HYDRE Nutrition:

```text
Framework: Next.js
Package manager: pnpm only
Dev URL: http://127.0.0.1:3000
Shell: Windows PowerShell
```

Do not use `npm` or `yarn` in this project.

## Non-negotiable rule

Never run any dev server command in the foreground from an agent tool shell.

Forbidden foreground commands include:

```text
pnpm dev
next dev
npm run dev
yarn dev
bun run dev
vite
```

A foreground dev server blocks the shell and prevents screenshot commands from running.

Always do this instead:

```text
check server → start in background if needed → save PID → write log → wait for readiness → take screenshot → inspect screenshot → clean up if this skill started the server
```

## Runtime files

Use these files:

```text
.agent/dev-server.pid
.agent/dev-server.log
.agent/latest-screenshot.png
```

Create the directory first:

```powershell
New-Item -ItemType Directory -Force .agent | Out-Null
```

## Windows-specific traps

Do not use:

```powershell
curl -Is http://localhost:3000
```

On Windows PowerShell, `curl` may resolve to `Invoke-WebRequest`, which does not support Unix curl flags.

Use:

```powershell
Invoke-WebRequest http://127.0.0.1:3000 -UseBasicParsing -TimeoutSec 2
```

or:

```powershell
curl.exe -I -s http://127.0.0.1:3000
```

Do not use:

```powershell
Start-Process pnpm -ArgumentList "dev" -NoNewWindow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "pnpm dev" -NoNewWindow
taskkill /F /IM node.exe
```

Why:

- `pnpm` is commonly a `.cmd` shim on Windows and may not launch correctly as a direct Win32 executable.
- `-NoExit` keeps the shell alive forever.
- `-NoNewWindow` can attach the long-running server to the agent's active shell.
- Killing all `node.exe` can stop unrelated dev servers, editors, CLIs, and tools.

## Server procedure

1. Check if `http://127.0.0.1:3000` already responds.
2. If it responds, reuse it. Do not start another server and do not create a PID file.
3. If it does not respond, start `pnpm dev` in a hidden background PowerShell process.
4. Store the started wrapper process PID in `.agent/dev-server.pid`.
5. Write server output to `.agent/dev-server.log`.
6. Wait for readiness with a 45-second timeout.
7. If readiness fails, read `.agent/dev-server.log`. Do not repeatedly restart.
8. Capture the screenshot.
9. Inspect `.agent/latest-screenshot.png` before claiming completion.
10. If this skill started the server, clean it up automatically before finishing.

## Start server in background

Use this exact pattern for HYDRE Nutrition:

```powershell
$ErrorActionPreference = "Stop"
New-Item -ItemType Directory -Force .agent | Out-Null

$port = 3000
$url = "http://127.0.0.1:$port"
$pidFile = ".agent/dev-server.pid"
$logFile = ".agent/dev-server.log"

# Reuse an existing server if it is already responding.
try {
  $response = Invoke-WebRequest $url -UseBasicParsing -TimeoutSec 2
  if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
    Write-Host "Dev server already responding at $url; reusing it."
    Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
    exit 0
  }
} catch {
  Write-Host "No existing dev server responding at $url"
}

# HYDRE uses pnpm only.
$devCommand = "pnpm dev -- -H 127.0.0.1 -p $port"
$cwd = (Get-Location).Path.Replace("'", "''")
$psCommand = "Set-Location -LiteralPath '$cwd'; `$ErrorActionPreference = 'Continue'; $devCommand *> '$logFile'"

$process = Start-Process `
  -FilePath "powershell.exe" `
  -ArgumentList @("-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", $psCommand) `
  -PassThru `
  -WindowStyle Hidden

$process.Id | Set-Content $pidFile
Write-Host "Started dev server wrapper PID $($process.Id) at $url"
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
  if (Test-Path $logFile) {
    Get-Content $logFile -Tail 120
  } else {
    Write-Host "No log file was created."
  }
  exit 1
}

Write-Host "Dev server ready at $url"
```

## Screenshot

If the project has a screenshot command, run it after readiness succeeds:

```powershell
pnpm screenshot
```

If no screenshot command exists, create or use a Playwright script and save the latest output to:

```text
.agent/latest-screenshot.png
```

Example:

```powershell
node scripts/agent-screenshot.mjs http://127.0.0.1:3000 .agent/latest-screenshot.png 1440 900
```

## Inspect the screenshot

The task is not complete after file creation alone.

Open or inspect:

```text
.agent/latest-screenshot.png
```

Compare it against the requested UI state or reference, then fix the main visible issue.

## Cleanup after screenshot

After the screenshot has been captured and inspected, if this skill started the dev server, immediately clean it up.

Use a process-tree cleanup, not a global Node kill:

```powershell
function Stop-ProcessTree {
  param([int]$ProcessId)

  $children = Get-CimInstance Win32_Process -Filter "ParentProcessId = $ProcessId" -ErrorAction SilentlyContinue
  foreach ($child in $children) {
    Stop-ProcessTree -ProcessId ([int]$child.ProcessId)
  }

  $proc = Get-Process -Id $ProcessId -ErrorAction SilentlyContinue
  if ($proc) {
    Stop-Process -Id $ProcessId -Force -ErrorAction SilentlyContinue
    Write-Host "Stopped process PID $ProcessId"
  }
}

if (Test-Path ".agent/dev-server.pid") {
  $pidValue = Get-Content ".agent/dev-server.pid" -ErrorAction SilentlyContinue
  if ($pidValue -match '^\d+$') {
    Stop-ProcessTree -ProcessId ([int]$pidValue)
  }
  Remove-Item ".agent/dev-server.pid" -Force -ErrorAction SilentlyContinue
}
```

Never kill all `node.exe`, `pnpm`, browser, terminal, editor, or IDE processes.

## Emergency manual close

The user should normally not need this because cleanup is automatic.

If the user asks for a one-click manual close, create a desktop `.bat` file that stops the PID stored at:

```text
E:\hydre-nutrition\.agent\dev-server.pid
```

Do not ask the user to type long cleanup commands manually.

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
cleanup once
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

## Completion criteria

The task is not complete until all are true:

- the dev server responded successfully;
- a screenshot was captured;
- the screenshot was inspected;
- the main visual issue was addressed;
- if this skill started the dev server, it was cleaned up automatically;
- no foreground dev server is blocking the shell.
