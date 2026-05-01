$ErrorActionPreference = "Stop"
New-Item -ItemType Directory -Force .agent | Out-Null

$port = 3000
$url = "http://127.0.0.1:$port"
$pidFile = ".agent/dev-server.pid"
$logFile = ".agent/dev-server.log"

$devCommand = "pnpm dev -- -H 127.0.0.1 -p $port"
$cwd = (Get-Location).Path
$psCommand = "Set-Location -LiteralPath '$cwd'; `$ErrorActionPreference = 'Continue'; $devCommand"

$process = Start-Process `
  -FilePath "powershell.exe" `
  -ArgumentList @("-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", $psCommand) `
  -PassThru `
  -WindowStyle Hidden `
  -RedirectStandardOutput $logFile `
  -RedirectStandardError $logFile

$process.Id | Set-Content $pidFile
Write-Host "Started dev server wrapper PID $($process.Id)"
