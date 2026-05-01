Start-Sleep -Seconds 15
try {
    $r = Invoke-WebRequest http://127.0.0.1:3000 -UseBasicParsing -TimeoutSec 5
    Write-Host "READY status: " $r.StatusCode
} catch {
    Write-Host "NOT READY: " $_.Exception.Message
    Write-Host "Log tail:"
    Get-Content "E:\hydre-nutrition\.agent\dev-server.log" -Tail 20
}
