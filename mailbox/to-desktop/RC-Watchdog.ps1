# RC-Watchdog.ps1 - keeps `claude remote-control` running on Jorge-PC.
# Run by scheduled task "Claude-RC-Watchdog" at logon and every 10 minutes.
# Starts a new copy ONLY if none is running (no duplicates). One log line per run.
# -TestDecision: report what it would do, pretending none is running; starts nothing.
param([string]$WorkDir = $env:USERPROFILE, [switch]$TestDecision)

$dir = Join-Path $env:USERPROFILE 'ClaudeWatchdog'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$log = Join-Path $dir 'rc-watchdog.log'
function Log($m) { Add-Content -Path $log -Value ("{0}  {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $m) }

$running = @(Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
    Where-Object { $_.CommandLine -match 'remote-control' -and $_.CommandLine -notmatch 'RC-Watchdog' })
if ($TestDecision) { $running = @() }

if ($running.Count -gt 0) {
    Log ("OK running pid={0}" -f (($running | ForEach-Object ProcessId) -join ','))
    exit 0
}

$claude = (Get-Command claude -ErrorAction SilentlyContinue).Source
if (-not $claude) { Log 'FAIL claude not found on PATH'; exit 1 }

if ($TestDecision) { Log "TEST would start: $claude remote-control (in $WorkDir)"; exit 0 }

Start-Process -FilePath $claude -ArgumentList 'remote-control' -WorkingDirectory $WorkDir -WindowStyle Minimized
Start-Sleep -Seconds 20
$now = @(Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'remote-control' -and $_.CommandLine -notmatch 'RC-Watchdog' })
if ($now.Count -gt 0) { Log "RESTARTED pid=$(($now | ForEach-Object ProcessId) -join ',')" } else { Log 'FAIL started but no process after 20s' }
