<#
RAM-Guard.ps1 - TRK-2026-9960 family - 2026-10-12 - written by the cloud, installed by Rambo 1.
Runs every minute. Keeps the PC from crashing during the overnight run. Zero AI tokens.
  FREE RAM >= 3 GB : GREEN. Clears the pause flag.
  FREE RAM <  3 GB : AMBER. Writes C:\AI\state\PAUSE-NEW-WORK.flag. The OCR runner and the Inbox watcher
                     must not START new work while the flag exists (work already running continues).
  FREE RAM <  1.5 GB: RED. Also stops the OCR runner (it resumes by itself; nothing is lost) and lowers the
                     priority of claude/codex/node/python processes. Never kills Jorge's own apps.
Security watch: lists the 8 biggest processes each minute and flags any process name not seen in the last
7 days' allowlist (new-process alert, e.g. the 2026-08 fake Defender page, TRK-2026-9355).
Heartbeat: G:\My Drive\VTES-Outbox\_RAM-GUARD-HEARTBEAT.md. Log: C:\AI\state\RAM-GUARD-LOG.csv
#>
param(
  [double]$AmberGB = 3.0,
  [double]$RedGB   = 1.5,
  [string]$Heartbeat = 'G:\My Drive\VTES-Outbox\_RAM-GUARD-HEARTBEAT.md',
  [string]$StateDir  = 'C:\AI\state'
)
$ErrorActionPreference = 'Continue'
New-Item -ItemType Directory -Force -Path $StateDir | Out-Null
$flag  = Join-Path $StateDir 'PAUSE-NEW-WORK.flag'
$log   = Join-Path $StateDir 'RAM-GUARD-LOG.csv'
$seen  = Join-Path $StateDir 'RAM-GUARD-SEEN.csv'
if (-not (Test-Path $log)) { 'time,freeGB,totalGB,level,action,top' | Set-Content $log -Encoding UTF8 }

$os = Get-CimInstance Win32_OperatingSystem
$freeGB  = [math]::Round($os.FreePhysicalMemory / 1MB, 2)
$totalGB = [math]::Round($os.TotalVisibleMemorySize / 1MB, 2)
$procs = Get-Process | Sort-Object WorkingSet64 -Descending
$top = ($procs | Select-Object -First 8 | ForEach-Object { "$($_.ProcessName)=$([math]::Round($_.WorkingSet64/1MB))MB" }) -join '; '

$level = 'GREEN'; $action = 'none'
if ($freeGB -lt $AmberGB) { $level = 'AMBER' }
if ($freeGB -lt $RedGB)   { $level = 'RED' }

if ($level -eq 'GREEN') {
  if (Test-Path $flag) { Remove-Item $flag -Force; $action = 'pause flag cleared' }
} else {
  Set-Content $flag "$((Get-Date).ToString('s')) free=$freeGB GB level=$level"
  $action = 'pause flag set (no new work starts)'
}
if ($level -eq 'RED') {
  # Stop only the OCR runner. It is resumable: files already done keep their sidecars.
  Get-CimInstance Win32_Process -Filter "Name='powershell.exe'" |
    Where-Object { $_.CommandLine -match 'OCR-QueueA-Runner\.ps1' } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue; $action += '; OCR runner stopped' }
  foreach ($n in 'claude','codex','node','python','ollama') {
    Get-Process -Name $n -ErrorAction SilentlyContinue | ForEach-Object {
      try { $_.PriorityClass = 'BelowNormal' } catch { }
    }
  }
  $action += '; AI processes set to below-normal priority'
}

# Security watch: new process names compared with the last 7 days.
$known = @{}
if (Test-Path $seen) { Import-Csv $seen | Where-Object { [datetime]$_.last -gt (Get-Date).AddDays(-7) } | ForEach-Object { $known[$_.name] = $_.last } }
$new = @()
$names = $procs | Select-Object -ExpandProperty ProcessName -Unique
$firstRun = ($known.Count -eq 0)
foreach ($n in $names) { if (-not $known.ContainsKey($n) -and -not $firstRun) { $new += $n }; $known[$n] = (Get-Date).ToString('s') }
$known.GetEnumerator() | ForEach-Object { [pscustomobject]@{ name = $_.Key; last = $_.Value } } | Export-Csv $seen -NoTypeInformation -Encoding UTF8
$newText = if ($firstRun) { 'first run - learning the normal process list' } elseif ($new.Count) { 'NEW: ' + ($new -join ', ') } else { 'none' }

"$((Get-Date).ToString('s')),$freeGB,$totalGB,$level,""$action"",""$top""" | Add-Content $log -Encoding UTF8

$body = @"
# RAM GUARD HEARTBEAT
Written: $((Get-Date).ToString('yyyy-MM-dd HH:mm:ss')) (Miami time) by CU-RAM-Guard on $env:COMPUTERNAME. Runs every minute.
Level: **$level** - free RAM $freeGB GB of $totalGB GB (amber below $AmberGB GB, red below $RedGB GB)
Action this minute: $action
Pause flag (no new work starts): $(Test-Path $flag)
Biggest processes: $top
New process names (security watch): $newText

Stale for more than 5 minutes = the guard is dead. The cloud alerts Jorge.
"@
try { Set-Content "$Heartbeat.tmp" $body -Encoding UTF8; Move-Item -Force "$Heartbeat.tmp" $Heartbeat } catch { }
