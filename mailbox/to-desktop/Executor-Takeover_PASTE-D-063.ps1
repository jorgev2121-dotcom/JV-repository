# PASTE-D-063 - Executor takeover. Run on DESKTOP-OTB90LR in PowerShell (5.1 or 7).
# Owner-authorized 2026-09-28 by Jorge: rebuild VTES-LOCAL-POLLER to run the EXISTING
# VTES-Bridge-Poller.ps1, keep CU-Uptime-Heartbeat alive, leave CU-Inbox-Job-Watcher disabled.
# Sends nothing. Touches no client documents. Writes only to VTES-Outbox and the undo folder.
# ASCII only on purpose (see RI-032).

$ErrorActionPreference = 'Continue'
$outbox = 'G:\My Drive\VTES-Outbox'
$result = Join-Path $outbox 'PASTE-D-062-RESULT.txt'
$status = Join-Path $outbox 'EXECUTOR-STATUS.txt'
$undoDir = Join-Path $env:USERPROFILE 'OneDrive\Documents\Reports\Undo_Manifests'
$stamp = Get-Date -Format 'yyyy-MM-dd_HHmm'
$log = New-Object System.Collections.ArrayList
function Say($s) { [void]$log.Add($s); Write-Output $s }

Say "PASTE-D-063 run $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') on $env:COMPUTERNAME"
if (-not (Test-Path $outbox)) { Say "Drive Outbox folder: NOT FOUND - results go to Desktop"; $outbox = [Environment]::GetFolderPath('Desktop'); $result = Join-Path $outbox 'PASTE-D-062-RESULT.txt'; $status = Join-Path $outbox 'EXECUTOR-STATUS.txt' }

# ---- 1. Read-only check (the PASTE-D-062 check) ----
Say "--- 1. Tasks ---"
foreach ($n in 'CU-Uptime-Heartbeat','VTES-LOCAL-POLLER','CU-Inbox-Job-Watcher') {
  $t = Get-ScheduledTask -TaskName $n -ErrorAction SilentlyContinue
  if (-not $t) { Say "MISSING  $n" } else { $i = Get-ScheduledTaskInfo -TaskName $n; Say "$($t.State)  $n  last run $($i.LastRunTime)  result $($i.LastTaskResult)" }
}
$f = Get-ChildItem $outbox -File -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
if ($f) { Say "Outbox newest file: $($f.Name)  $($f.LastWriteTime)" }
$sites = @()
foreach ($h in 'api.anthropic.com','github.com','drive.google.com') {
  try { $c = New-Object Net.Sockets.TcpClient; $ok = $c.BeginConnect($h,443,$null,$null).AsyncWaitHandle.WaitOne(2000); $c.Close() } catch { $ok = $false }
  $line = $(if ($ok) { "OK    $h" } else { "DOWN  $h" }); $sites += $line; Say $line
}
$printer = 'no print jobs waiting'
try { $jobs = Get-Printer -ErrorAction Stop | ForEach-Object { Get-PrintJob -PrinterName $_.Name -ErrorAction SilentlyContinue }; if ($jobs) { $printer = "$(@($jobs).Count) print job(s) waiting" } } catch { $printer = 'could not read' }
Say "Printer: $printer"

# ---- 2. Job-watcher stays disabled ----
$w = Get-ScheduledTask -TaskName 'CU-Inbox-Job-Watcher' -ErrorAction SilentlyContinue
if ($w -and $w.State -ne 'Disabled') { Disable-ScheduledTask -TaskName 'CU-Inbox-Job-Watcher' | Out-Null; Say "CU-Inbox-Job-Watcher was $($w.State) - set back to Disabled" } else { Say "CU-Inbox-Job-Watcher: left Disabled" }

# ---- 3. Heartbeat alive? ----
$fixed = @(); $blocked = @()
$hb = Get-ScheduledTask -TaskName 'CU-Uptime-Heartbeat' -ErrorAction SilentlyContinue
if ($hb) {
  $hi = Get-ScheduledTaskInfo -TaskName 'CU-Uptime-Heartbeat'
  if ($hb.State -eq 'Disabled') { Enable-ScheduledTask -TaskName 'CU-Uptime-Heartbeat' | Out-Null; $fixed += 'heartbeat re-enabled' }
  if (((Get-Date) - $hi.LastRunTime).TotalMinutes -gt 10) { Start-ScheduledTask -TaskName 'CU-Uptime-Heartbeat'; $fixed += 'heartbeat started'; Say "Heartbeat was stale - started it" } else { Say "Heartbeat OK - ran $([int]((Get-Date) - $hi.LastRunTime).TotalMinutes) min ago" }
} else { $blocked += 'CU-Uptime-Heartbeat task missing - not rebuilt by this script'; Say "Heartbeat task MISSING" }

# ---- 4. Rebuild VTES-LOCAL-POLLER around the existing script ----
Say "--- 4. Poller ---"
if (Get-ScheduledTask -TaskName 'VTES-LOCAL-POLLER' -ErrorAction SilentlyContinue) {
  Say "VTES-LOCAL-POLLER already exists - not touched"
} else {
  $script = $null
  foreach ($root in @($env:USERPROFILE, 'G:\My Drive', 'C:\VTES', 'C:\Scripts')) {
    if (-not $script -and (Test-Path $root)) { $script = Get-ChildItem $root -Filter 'VTES-Bridge-Poller.ps1' -Recurse -Depth 6 -File -ErrorAction SilentlyContinue | Select-Object -First 1 }
  }
  if (-not $script) {
    $blocked += 'BLOCKED-NO-SCRIPT: VTES-Bridge-Poller.ps1 not found'; Say "VTES-Bridge-Poller.ps1 NOT FOUND - poller not rebuilt"
  } else {
    Say "Found script: $($script.FullName)"
    New-Item -ItemType Directory -Force -Path $undoDir | Out-Null
    $undo = Join-Path $undoDir "Rollback_VTES-LOCAL-POLLER_$stamp.ps1"
    "Unregister-ScheduledTask -TaskName 'VTES-LOCAL-POLLER' -Confirm:`$false" | Set-Content -Path $undo -Encoding ASCII
    try {
      $act = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$($script.FullName)`""
      $trg = @(
        (New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Minutes 5) -RepetitionDuration (New-TimeSpan -Days 3650)),
        (New-ScheduledTaskTrigger -AtLogOn -User "$env:USERDOMAIN\$env:USERNAME")
      )
      $set = New-ScheduledTaskSettingsSet -StartWhenAvailable -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -MultipleInstances IgnoreNew -ExecutionTimeLimit (New-TimeSpan -Minutes 10) -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1)
      $pri = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType Interactive
      Register-ScheduledTask -TaskName 'VTES-LOCAL-POLLER' -Action $act -Trigger $trg -Settings $set -Principal $pri -Description 'Rebuilt by PASTE-D-063 (owner-authorized 2026-09-28). Runs existing VTES-Bridge-Poller.ps1 every 5 min.' -ErrorAction Stop | Out-Null
      Start-ScheduledTask -TaskName 'VTES-LOCAL-POLLER'
      $fixed += 'VTES-LOCAL-POLLER rebuilt'; Say "VTES-LOCAL-POLLER registered and started. Undo: $undo"
    } catch { $blocked += "Poller register failed: $($_.Exception.Message)"; Say "Poller register FAILED: $($_.Exception.Message)" }
  }
}

# ---- Proof: heartbeat.json must move ----
$hj = Get-ChildItem 'G:\My Drive' -Filter 'heartbeat.json' -Recurse -Depth 4 -File -ErrorAction SilentlyContinue | Select-Object -First 1
if ($hj) {
  $t0 = $hj.LastWriteTime; Say "heartbeat.json before: $t0"
  Start-Sleep -Seconds 90
  $t1 = (Get-Item $hj.FullName).LastWriteTime; Say "heartbeat.json after 90s: $t1"
  if ($t1 -gt $t0) { Say "PROOF: poller is writing heartbeat.json" } else { $blocked += 'heartbeat.json did not move in 90s - recheck in 10 min'; Say "heartbeat.json did not move yet" }
} else { Say "heartbeat.json not found under G:\My Drive" }
foreach ($n in 'CU-Uptime-Heartbeat','VTES-LOCAL-POLLER','CU-Inbox-Job-Watcher') {
  $t = Get-ScheduledTask -TaskName $n -ErrorAction SilentlyContinue
  if ($t) { Say "AFTER: $($t.State)  $n" } else { Say "AFTER: MISSING  $n" }
}
Say "Finished."
$log | Set-Content -Path $result -Encoding ASCII

# ---- 5. Ten-line status ----
$taskLine = (($log | Where-Object { $_ -like 'AFTER:*' }) -join ' | ')
@(
  "EXECUTOR-STATUS  $(Get-Date -Format 'yyyy-MM-dd HH:mm')  (PASTE-D-063)",
  "Tasks: $taskLine",
  "Outbox newest file: $(if ($f) { "$($f.Name) $($f.LastWriteTime)" } else { 'none' })",
  "Sites: $($sites -join ', ')",
  "Printer: $printer",
  "Fixed: $(if ($fixed) { $fixed -join '; ' } else { 'nothing needed' })",
  "Blocked: $(if ($blocked) { $blocked -join '; ' } else { 'nothing' })",
  "Job-watcher: left Disabled (waits on approved-jobs gate)",
  "Full output: PASTE-D-062-RESULT.txt",
  "Next: executor works the GREEN night queue per TEAM-DEPLOYMENT-PLAN_2026-09-28.md Section C"
) | Set-Content -Path $status -Encoding ASCII
Write-Output "Wrote $result and $status"
