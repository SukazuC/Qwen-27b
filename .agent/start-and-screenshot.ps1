$ErrorActionPreference = "Stop"
New-Item -ItemType Directory -Force .agent | Out-Null

$url = "http://127.0.0.1:3000"
$pidFile = ".agent/dev-server.pid"
$logFile = ".agent/dev-server.log"

try {
  $response = Invoke-WebRequest $url -UseBasicParsing -TimeoutSec 2
  if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
    Write-Host "Dev server already responding at $url; reusing it."
    Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
    exit 0
  }
} catch {
  Write-Host "No existing dev server, starting..."
}

$devCommand = "pnpm dev -- -H 127.0.0.1 -p 3000"
$cwd = (Get-Location).Path.Replace("'", "''")
$psCommand = "Set-Location -LiteralPath '$cwd'; `$ErrorActionPreference = 'Continue'; $devCommand 2>&1 | Out-File -FilePath '$logFile' -Append"

$process = Start-Process `
  -FilePath "powershell.exe" `
  -ArgumentList @("-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", $psCommand) `
  -PassThru `
  -WindowStyle Hidden

$process.Id | Set-Content $pidFile
Write-Host "Started dev server wrapper PID $($process.Id)"

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

# Take screenshot
node scripts/agent-screenshot.mjs $url .agent/latest-screenshot.png 1440 900
Write-Host "Screenshot saved to .agent/latest-screenshot.png"
