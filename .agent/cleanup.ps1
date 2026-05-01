function Stop-ProcessTree {
  param([int]$ProcessId)
  $children = Get-CimInstance Win32_Process -Filter "ParentProcessId = $ProcessId" -ErrorAction SilentlyContinue
  foreach ($child in $children) {
    Stop-ProcessTree -ProcessId ([int]$child.ProcessId)
  }
  $proc = Get-Process -Id $ProcessId -ErrorAction SilentlyContinue
  if ($proc) {
    Stop-Process -Id $ProcessId -Force -ErrorAction SilentlyContinue
  }
}
if (Test-Path "E:\hydre-nutrition\.agent\dev-server.pid") {
  $val = Get-Content "E:\hydre-nutrition\.agent\dev-server.pid" -ErrorAction SilentlyContinue
  if ($val -match '^\d+$') {
    Stop-ProcessTree -ProcessId ([int]$val)
  }
  Remove-Item "E:\hydre-nutrition\.agent\dev-server.pid" -Force -ErrorAction SilentlyContinue
}
