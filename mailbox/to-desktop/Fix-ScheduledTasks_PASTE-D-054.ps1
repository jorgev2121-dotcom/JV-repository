# PASTE-D-054 - Jorge's PC, PowerShell (normal window). UNTESTED: written on Linux, no PowerShell there.
# What it does: (1) reports the state of the 3 background tasks, read-only.
#               (2) for any task that is Disabled, asks you y/n, then enables it and starts it once.
#               (3) writes an undo script and a report. Nothing is deleted. No emails. No spending.
$names = @('CU-Uptime-Heartbeat','VTES-LOCAL-POLLER','CU-Inbox-Job-Watcher')
$stamp = Get-Date -Format 'yyyy-MM-dd_HHmm'
$rep = Join-Path $env:USERPROFILE 'OneDrive\Documents\Reports'
$undo = Join-Path $rep 'Undo_Manifests'
New-Item -ItemType Directory -Force -Path $undo | Out-Null
$reportFile = Join-Path $rep ("TASK-REPAIR_" + $stamp + ".txt")
$undoFile = Join-Path $undo ("Rollback_EnableTasks_" + $stamp + ".ps1")
$lines = @()
foreach ($n in $names) {
  $t = Get-ScheduledTask -TaskName $n -ErrorAction SilentlyContinue
  if (-not $t) { $lines += "$n : NOT FOUND (task does not exist on this PC)"; continue }
  $i = Get-ScheduledTaskInfo -TaskName $n
  $lines += "$n : State=$($t.State) LastRun=$($i.LastRunTime) LastResult=$($i.LastTaskResult) NextRun=$($i.NextRunTime)"
  if ($t.State -eq 'Disabled') {
    $a = Read-Host "$n is DISABLED. Enable it and start it once? (y/n)"
    if ($a -eq 'y') {
      try {
        Enable-ScheduledTask -TaskName $n | Out-Null
        Add-Content -Path $undoFile -Value "Disable-ScheduledTask -TaskName '$n'"
        Start-ScheduledTask -TaskName $n
        Start-Sleep -Seconds 20
        $i2 = Get-ScheduledTaskInfo -TaskName $n
        $t2 = Get-ScheduledTask -TaskName $n
        $lines += "  -> AFTER: State=$($t2.State) LastRun=$($i2.LastRunTime) LastResult=$($i2.LastTaskResult)"
      } catch {
        $lines += "  -> FAILED: $($_.Exception.Message)  (if it says Access denied, right-click PowerShell, Run as administrator, and run this again)"
      }
    } else { $lines += "  -> skipped by you" }
  }
}
$lines | Set-Content -Path $reportFile
Write-Host ""
Write-Host "===== SUMMARY (paste only this back) ====="
$lines | ForEach-Object { Write-Host $_ }
Write-Host "Report saved: $reportFile"
if (Test-Path $undoFile) { Write-Host "Undo script saved: $undoFile" }
