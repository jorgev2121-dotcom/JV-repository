# PASTE-D-062 quick check. Read-only. Changes nothing.
foreach ($n in 'CU-Uptime-Heartbeat','VTES-LOCAL-POLLER','CU-Inbox-Job-Watcher') {
  $t = Get-ScheduledTask -TaskName $n -ErrorAction SilentlyContinue
  if (-not $t) { "MISSING  $n" } else { $i = Get-ScheduledTaskInfo -TaskName $n; "$($t.State)  $n  last run $($i.LastRunTime)  result $($i.LastTaskResult)" }
}
$f = Get-ChildItem 'G:\My Drive\VTES-Outbox' -File -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
if ($f) { "Drive Outbox newest file: $($f.Name)  $($f.LastWriteTime)" } else { "Drive Outbox folder: NOT FOUND" }
foreach ($h in 'api.anthropic.com','github.com','drive.google.com') {
  try { $c = New-Object Net.Sockets.TcpClient; $ok = $c.BeginConnect($h,443,$null,$null).AsyncWaitHandle.WaitOne(2000); if ($ok) { "OK    $h" } else { "DOWN  $h" }; $c.Close() } catch { "DOWN  $h" }
}
try { Get-Printer -ErrorAction Stop | ForEach-Object { Get-PrintJob -PrinterName $_.Name -ErrorAction SilentlyContinue } | ForEach-Object { "PRINT JOB WAITING: $($_.DocumentName)" } } catch { "Printer check: could not read" }
"Finished. Copy everything above and paste it to the manager window."
