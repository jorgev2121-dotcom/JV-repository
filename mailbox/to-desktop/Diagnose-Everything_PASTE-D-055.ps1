# PASTE-D-055 - Jorge's PC, PowerShell (normal window). READ-ONLY: changes nothing, sends nothing, prints no secrets.
# Works in Windows PowerShell 5.1 and PowerShell 7. Prints PASS / WARN / FAIL for each check, then a summary.
$results = New-Object System.Collections.ArrayList
function Add-R($status, $name, $detail) {
  [void]$results.Add([pscustomobject]@{ S = $status; N = $name; D = $detail })
  $color = 'Gray'
  if ($status -eq 'PASS') { $color = 'Green' } elseif ($status -eq 'WARN') { $color = 'Yellow' } elseif ($status -eq 'FAIL') { $color = 'Red' }
  Write-Host ("[{0}] {1} - {2}" -f $status, $name, $detail) -ForegroundColor $color
}
function Age-Text($d) {
  if (-not $d) { return 'never' }
  $s = (New-TimeSpan -Start $d -End (Get-Date))
  if ($s.TotalMinutes -lt 90) { return ("{0} min ago" -f [int]$s.TotalMinutes) }
  if ($s.TotalHours -lt 48) { return ("{0} h ago" -f [int]$s.TotalHours) }
  return ("{0} days ago" -f [int]$s.TotalDays)
}
function Test-Port($hostName, $port) {
  try {
    $c = New-Object System.Net.Sockets.TcpClient
    $iar = $c.BeginConnect($hostName, $port, $null, $null)
    $ok = $iar.AsyncWaitHandle.WaitOne(2000, $false)
    $up = ($ok -and $c.Connected)
    $c.Close()
    return $up
  } catch { return $false }
}
Write-Host ("Diagnostic started " + (Get-Date -Format 'yyyy-MM-dd HH:mm')) -ForegroundColor Cyan

# 1. PC basics
try {
  $os = Get-CimInstance Win32_OperatingSystem -ErrorAction Stop
  $up = (New-TimeSpan -Start $os.LastBootUpTime -End (Get-Date))
  Add-R 'INFO' 'PC uptime' ("{0} days {1} h since last restart" -f $up.Days, $up.Hours)
  $free = [math]::Round((Get-PSDrive C -ErrorAction Stop).Free / 1GB, 1)
  if ($free -lt 10) { Add-R 'FAIL' 'Disk space C:' "$free GB free (too low)" } elseif ($free -lt 30) { Add-R 'WARN' 'Disk space C:' "$free GB free" } else { Add-R 'PASS' 'Disk space C:' "$free GB free" }
} catch { Add-R 'WARN' 'PC basics' 'could not read (not Windows, or blocked)' }

# 2. Background scheduled tasks
try {
  $want = @('CU-Uptime-Heartbeat','VTES-LOCAL-POLLER','CU-Inbox-Job-Watcher')
  $all = @(Get-ScheduledTask -ErrorAction Stop | Where-Object { $_.TaskName -like 'CU-*' -or $_.TaskName -like 'VTES-*' })
  foreach ($w in $want) { if (-not ($all | Where-Object { $_.TaskName -eq $w })) { Add-R 'FAIL' "Task $w" 'does not exist on this PC' } }
  foreach ($t in $all) {
    $i = Get-ScheduledTaskInfo -TaskName $t.TaskName -TaskPath $t.TaskPath
    $age = Age-Text $i.LastRunTime
    $line = "State=$($t.State), last run $age, last result $($i.LastTaskResult)"
    if ($t.State -eq 'Disabled') { Add-R 'FAIL' "Task $($t.TaskName)" ("DISABLED. " + $line) }
    elseif ($i.LastTaskResult -ne 0 -and $i.LastTaskResult -ne 267009 -and $i.LastTaskResult -ne 267011) { Add-R 'WARN' "Task $($t.TaskName)" ("last run reported an error. " + $line) }
    elseif ($i.LastRunTime -and ((Get-Date) - $i.LastRunTime).TotalHours -gt 24 -and $want -contains $t.TaskName) { Add-R 'FAIL' "Task $($t.TaskName)" ("has not run in over 24 h. " + $line) }
    else { Add-R 'PASS' "Task $($t.TaskName)" $line }
  }
  if ($all.Count -eq 0) { Add-R 'WARN' 'Scheduled tasks' 'no CU-* or VTES-* tasks found' }
} catch { Add-R 'WARN' 'Scheduled tasks' 'could not read (not Windows, or needs Run as administrator)' }

# 3. Google Drive folders and freshness (are files still landing?)
foreach ($p in @('G:\My Drive\VTES-Outbox','G:\My Drive\VTES-Inbox','G:\My Drive\_CLAUDE-MAILBOX')) {
  if (-not (Test-Path $p)) { Add-R 'FAIL' "Folder $p" 'not found (Google Drive not mounted as G:?)'; continue }
  $f = Get-ChildItem -Path $p -File -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
  if (-not $f) { Add-R 'WARN' "Folder $p" 'exists but empty' }
  else {
    $hrs = ((Get-Date) - $f.LastWriteTime).TotalHours
    if ($hrs -gt 24) { Add-R 'FAIL' "Folder $p" ("newest file is " + (Age-Text $f.LastWriteTime)) } elseif ($hrs -gt 6) { Add-R 'WARN' "Folder $p" ("newest file is " + (Age-Text $f.LastWriteTime)) } else { Add-R 'PASS' "Folder $p" ("newest file " + (Age-Text $f.LastWriteTime)) }
  }
}

# 4. Programs that must be running or installed
$od = @(Get-Process -Name OneDrive -ErrorAction SilentlyContinue).Count
if ($od -ge 1) { Add-R 'PASS' 'OneDrive' 'running' } else { Add-R 'WARN' 'OneDrive' 'not running' }
$ol = @(Get-Process -Name OUTLOOK -ErrorAction SilentlyContinue).Count
if ($ol -gt 2) { Add-R 'WARN' 'Outlook' "$ol copies running (leftover copies cause the 'exhausted resources' error)" } else { Add-R 'PASS' 'Outlook' "$ol copy running" }
foreach ($cmd in @('claude','git','python','op','node')) {
  $g = Get-Command $cmd -ErrorAction SilentlyContinue
  if ($g) { Add-R 'PASS' "Program $cmd" 'installed' } elseif ($cmd -eq 'op' -or $cmd -eq 'node') { Add-R 'WARN' "Program $cmd" 'not found' } else { Add-R 'FAIL' "Program $cmd" 'not found' }
}

# 5. Internet reach to the services the agents use
foreach ($h in @('api.anthropic.com','github.com','drive.google.com','api.x.ai')) {
  if (Test-Port $h 443) { Add-R 'PASS' "Internet $h" 'reachable' } else { Add-R 'FAIL' "Internet $h" 'NOT reachable (network, firewall or VPN)' }
}

# 6. Local services (info only: LiteLLM plan was dropped, so DOWN there is fine)
foreach ($s in @(@('LiteLLM',4001),@('LiteLLM alt',4000),@('Ollama',11434),@('9Router',20128))) {
  if (Test-Port '127.0.0.1' $s[1]) { Add-R 'INFO' "Local service $($s[0]) port $($s[1])" 'listening' } else { Add-R 'INFO' "Local service $($s[0]) port $($s[1])" 'not running' }
}

# 7. Keys present (shows only SET/NOT SET and length, never the key itself)
foreach ($v in @('ANTHROPIC_API_KEY','XAI_API_KEY','OPENROUTER_API_KEY','GEMINI_API_KEY','LITELLM_MASTER_KEY')) {
  $val = [Environment]::GetEnvironmentVariable($v, 'User')
  if (-not $val) { $val = [Environment]::GetEnvironmentVariable($v, 'Process') }
  if ($val) { Add-R 'INFO' "Key $v" ("SET, $($val.Length) characters") } else { Add-R 'INFO' "Key $v" 'NOT SET' }
}

# 8. Printer queue (stuck print jobs)
try {
  $jobs = @(Get-Printer -ErrorAction Stop | ForEach-Object { Get-PrintJob -PrinterName $_.Name -ErrorAction SilentlyContinue })
  if ($jobs.Count -eq 0) { Add-R 'PASS' 'Printer queue' 'empty' }
  else { foreach ($j in $jobs) { Add-R 'WARN' 'Printer queue' ("job waiting: '$($j.DocumentName)' status $($j.JobStatus), submitted $($j.SubmittedTime)") } }
} catch { Add-R 'WARN' 'Printer queue' 'could not read' }

# 9. Optional real test: ask Claude Code for one word (uses a tiny amount of your plan)
if (Get-Command claude -ErrorAction SilentlyContinue) {
  $a = Read-Host 'Run a real 1-word test of Claude Code now? Uses a tiny bit of your plan. (y/n)'
  if ($a -eq 'y') {
    try {
      $o = (& claude -p 'Reply with the single word OK' 2>&1 | Out-String).Trim()
      if ($o -match 'OK') { Add-R 'PASS' 'Claude Code real test' 'answered OK' } else { Add-R 'FAIL' 'Claude Code real test' ("unexpected answer: " + $o.Substring(0, [math]::Min(120, $o.Length))) }
    } catch { Add-R 'FAIL' 'Claude Code real test' $_.Exception.Message }
  } else { Add-R 'INFO' 'Claude Code real test' 'skipped by you' }
}

# Summary
$pass = @($results | Where-Object { $_.S -eq 'PASS' }).Count
$warn = @($results | Where-Object { $_.S -eq 'WARN' }).Count
$fail = @($results | Where-Object { $_.S -eq 'FAIL' }).Count
Write-Host ''
Write-Host '===== SUMMARY (paste only the lines below back) =====' -ForegroundColor Cyan
Write-Host ("PASS $pass   WARN $warn   FAIL $fail") -ForegroundColor Cyan
$results | Where-Object { $_.S -eq 'FAIL' -or $_.S -eq 'WARN' } | ForEach-Object { Write-Host ("[{0}] {1} - {2}" -f $_.S, $_.N, $_.D) }
try {
  $dir = Join-Path $env:USERPROFILE 'OneDrive\Documents\Reports'
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $file = Join-Path $dir ("DIAGNOSTIC_" + (Get-Date -Format 'yyyy-MM-dd_HHmm') + ".txt")
  ($results | ForEach-Object { "[{0}] {1} - {2}" -f $_.S, $_.N, $_.D }) | Set-Content -Path $file
  Write-Host "Full report saved: $file"
} catch { Write-Host 'Could not save the report file (not an error in your PC).' }
