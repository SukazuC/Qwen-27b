Start-Sleep -Seconds 5
$conn = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if ($conn) {
    $procId = $conn.OwningProcess
    Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
    Write-Host "Killed PID $procId"
} else {
    Write-Host "Port 3000 is free"
}
