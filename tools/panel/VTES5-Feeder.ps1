<#
VTES5-Feeder.ps1 - feeds live data into the VTES control panel v5 (TRK-2026-9910-B family). Pure ASCII.

What it does, every run (the scheduled task CU-VTES5-Feeder runs it every 2 minutes):
  Reads REAL sources on this PC and rewrites the seven data files the v5 page reads:
    data\vtes5-heartbeat.js     this feeder's own tick + the two RAMBO lanes (from EXECUTED_ / BLOCKER_ / CAP-REACHED_ files)
    data\vtes5-bots.js          the Windows scheduler (tasks named CU-*, VTES-*, AI-*)
    data\vtes5-state.js         live check lines (lanes, ledgers, OCR, RAM, uptime, Orange Tree, governor)
    data\vtes5-health.js        pass/fail counts of the live checks
    data\vtes5-tokens.js        the usage governor heartbeat, ONLY if it exists and gives real numbers
    data\vtes5-housekeeping.js  no source yet: written-at time only, no invented content
    data\vtes5-miamidade.js     no source yet: written-at time only, count left null (page says NOT COUNTED)
  A source that is missing is reported as missing. No number is ever invented.

Shape rules (from DATA-CONTRACT.md and VERIFY-v5.ps1): plain ASCII, LF only, no BOM, exactly
  window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.<name> = {one JSON object};
Every time is ISO 8601 WITH its zone offset (e.g. 2026-10-12T14:05:00-04:00). Each file is written to
<name>.js.tmp and then swapped in, so the page never reads half a file.

A data file whose "writer" is neither the shipped stub ("not written yet") nor this feeder is LEFT ALONE:
some other real writer owns it, and this feeder does not overwrite it.

  -PanelDir   the installed panel folder (its data\ subfolder is written).
  -DryRunDir  write the seven files into this folder instead (for testing). Nothing in -PanelDir is touched.
Undo: Unregister-ScheduledTask -TaskName CU-VTES5-Feeder -Confirm:$false
#>
param(
  [string]$PanelDir        = 'G:\My Drive\MY-DESK\VTES-PANEL\v5-live',
  [string]$DryRunDir       = '',
  [string]$OutboxDir       = 'G:\My Drive\VTES-Outbox',
  [string]$InboxDir        = 'G:\My Drive\VTES-Inbox',
  [string]$OrangeTreeIndex = 'G:\My Drive\ORANGE-TREE\_ORANGE-TREE-INDEX.html',
  [string]$LogFile         = 'C:\AI\panel\VTES5-Feeder.log',
  [switch]$NoScheduler
)
$ErrorActionPreference = 'Stop'
Set-StrictMode -Off

$WRITER       = 'CU-VTES5-Feeder (tools/panel/VTES5-Feeder.ps1)'
$SELF_TASK    = 'CU-VTES5-Feeder'
$TICK_SEC     = 120
$INV          = [Globalization.CultureInfo]::InvariantCulture
$NOW          = Get-Date
$problems     = New-Object System.Collections.Generic.List[string]
$script:written = 0
$script:skipped = New-Object System.Collections.Generic.List[string]

# ---------------------------------------------------------------- helpers
function Write-Log([string]$msg) {
  if ($DryRunDir -ne '' -or $LogFile -eq '') { Write-Output $msg; return }
  try {
    $d = Split-Path -Parent $LogFile
    if ($d -and -not (Test-Path -LiteralPath $d)) { New-Item -ItemType Directory -Force -Path $d | Out-Null }
    if ((Test-Path -LiteralPath $LogFile) -and (Get-Item -LiteralPath $LogFile).Length -gt 1MB) {
      Move-Item -LiteralPath $LogFile -Destination ($LogFile + '.old') -Force
    }
    Add-Content -LiteralPath $LogFile -Value ($NOW.ToString('yyyy-MM-dd HH:mm:ss', $INV) + ' ' + $msg) -Encoding ASCII
  } catch { }
}

# ISO 8601 with the zone offset, e.g. 2026-10-12T14:05:00-04:00. The page refuses a time with no zone.
function Iso([object]$d) {
  if ($d -eq $null) { return $null }
  $dt = [datetime]$d
  if ($dt.Kind -eq [DateTimeKind]::Utc) { $dt = $dt.ToLocalTime() }
  return ([DateTimeOffset]$dt).ToString("yyyy-MM-dd'T'HH:mm:sszzz", $INV)
}
function ShortTime([datetime]$d) {
  $fmt = 'MMM d, h:mm tt'
  if ($d.Year -ne $NOW.Year) { $fmt = 'MMM d yyyy, h:mm tt' }
  return $d.ToString($fmt, $INV)
}
function AgeText([datetime]$d) {
  $m = ($NOW - $d).TotalMinutes
  if ($m -lt 0) { return 'in the future (bad clock)' }
  if ($m -lt 1) { return 'less than 1 minute ago' }
  if ($m -lt 120) { return ([int][math]::Floor($m)).ToString($INV) + ' min ago' }
  if ($m -lt 2880) { return ([int][math]::Floor($m / 60)).ToString($INV) + ' hours ago' }
  return ([int][math]::Floor($m / 1440)).ToString($INV) + ' days ago'
}
# keep text ASCII-safe and short (the JSON writer escapes anything else anyway)
function Clean([string]$s, [int]$max = 300) {
  if ($s -eq $null) { return '' }
  $s = $s -replace '\*\*', ''
  $s = $s -replace '[\r\n\t]+', ' '
  $s = $s.Trim()
  if ($s.Length -gt $max) { $s = $s.Substring(0, $max - 3) + '...' }
  return $s
}

# Hand-written JSON writer: ASCII only (every char outside 0x20-0x7E is a \uXXXX escape), invariant numbers,
# ordered keys, and no PowerShell 5.1 ConvertTo-Json surprises (single-item arrays, depth limit, locale).
function To-Json([object]$v) {
  if ($v -eq $null) { return 'null' }
  if ($v -is [bool]) { if ($v) { return 'true' } else { return 'false' } }
  if ($v -is [string] -or $v -is [char]) {
    $sb = New-Object System.Text.StringBuilder
    [void]$sb.Append('"')
    foreach ($ch in ([string]$v).ToCharArray()) {
      $c = [int]$ch
      if ($ch -eq '"') { [void]$sb.Append('\"') }
      elseif ($ch -eq '\') { [void]$sb.Append('\\') }
      elseif ($c -lt 32 -or $c -gt 126) { [void]$sb.Append('\u' + $c.ToString('x4', $INV)) }
      else { [void]$sb.Append($ch) }
    }
    [void]$sb.Append('"')
    return $sb.ToString()
  }
  if ($v -is [int] -or $v -is [long] -or $v -is [uint32] -or $v -is [int16] -or $v -is [uint16] -or $v -is [byte] -or $v -is [uint64]) {
    return ([decimal]$v).ToString($INV)
  }
  if ($v -is [double] -or $v -is [single] -or $v -is [decimal]) {
    $dbl = [double]$v
    if ([double]::IsNaN($dbl) -or [double]::IsInfinity($dbl)) { return 'null' }
    return $dbl.ToString('R', $INV)
  }
  if ($v -is [System.Collections.IDictionary]) {
    $parts = New-Object System.Collections.Generic.List[string]
    foreach ($k in $v.Keys) { $parts.Add((To-Json ([string]$k)) + ': ' + (To-Json $v[$k])) }
    if ($parts.Count -eq 0) { return '{}' }
    return '{ ' + ($parts -join ', ') + ' }'
  }
  if ($v -is [System.Collections.IEnumerable]) {
    $parts = New-Object System.Collections.Generic.List[string]
    foreach ($x in $v) { $parts.Add((To-Json $x)) }
    return '[' + ($parts -join ', ') + ']'
  }
  return To-Json ([string]$v)
}

# The writer of an existing data file, or '' when there is none / it cannot be read.
function Get-ExistingWriter([string]$path) {
  try {
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { return '' }
    $t = [IO.File]::ReadAllText($path)
    $m = [regex]::Match($t, '"writer"\s*:\s*"((?:[^"\\]|\\.)*)"')
    if ($m.Success) { return $m.Groups[1].Value }
  } catch { }
  return ''
}

function Write-DataFile([string]$dir, [string]$name, $obj) {
  $final = Join-Path $dir ('vtes5-' + $name + '.js')
  $tmp = $final + '.tmp'
  $owner = Get-ExistingWriter $final
  if ($owner -ne '' -and $owner -ne 'not written yet' -and -not $owner.StartsWith('CU-VTES5-Feeder')) {
    Write-Log ('SKIP ' + $name + ': another writer owns it ("' + (Clean $owner 80) + '")')
    $script:skipped.Add($name)
    return
  }
  $text = 'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.' + $name + ' = ' + (To-Json $obj) + ";`n"
  $bytes = [Text.Encoding]::ASCII.GetBytes($text)   # To-Json already escaped everything above 126, so nothing is lost
  try {
    [IO.File]::WriteAllBytes($tmp, $bytes)
    $swapped = $false
    if (Test-Path -LiteralPath $final -PathType Leaf) {
      # ReplaceFile swaps in one step on NTFS; Google Drive's virtual drive may refuse it, then Move-Item -Force.
      try { [IO.File]::Replace($tmp, $final, $null); $swapped = $true } catch { $swapped = $false }
    }
    if (-not $swapped) { Move-Item -LiteralPath $tmp -Destination $final -Force }
    $script:written++
  } catch {
    $problems.Add('could not write ' + $name + ': ' + $_.Exception.Message)
  } finally {
    # a leftover .tmp would be an EXTRA FILE for VERIFY-v5.ps1, so never leave one behind
    if (Test-Path -LiteralPath $tmp) { try { Remove-Item -LiteralPath $tmp -Force } catch { } }
  }
}

function Get-FileInfoOrNull([string]$path) {
  try { if ($path -ne '' -and (Test-Path -LiteralPath $path -PathType Leaf)) { return (Get-Item -LiteralPath $path -Force) } } catch { }
  return $null
}
# first line starting with "<label>:" in a small text file, cleaned; '' when absent
function Get-Line([string]$path, [string]$label) {
  try {
    foreach ($ln in [IO.File]::ReadAllLines($path)) {
      if ($ln -match ('^\s*' + [regex]::Escape($label) + '\s*:\s*(.*)$')) { return (Clean $Matches[1] 160) }
    }
  } catch { }
  return ''
}

# ---------------------------------------------------------------- where to write
if ($DryRunDir -ne '') {
  $dataDir = $DryRunDir
  if (-not (Test-Path -LiteralPath $dataDir -PathType Container)) { New-Item -ItemType Directory -Force -Path $dataDir | Out-Null }
} else {
  $dataDir = Join-Path $PanelDir 'data'
  if (-not (Test-Path -LiteralPath $dataDir -PathType Container)) {
    Write-Log ('STOP: the panel data folder does not exist: ' + $dataDir + ' (the feeder never creates an install).')
    exit 2
  }
}

# ---------------------------------------------------------------- live checks (each one from a real file or command)
$checks = New-Object System.Collections.Generic.List[object]   # each: id, ok (bool), text
function Add-Check([string]$id, [bool]$ok, [string]$text) {
  $checks.Add([ordered]@{ id = $id; ok = $ok; text = (Clean $text 400) })
}
function Check-Heartbeat([string]$id, [string]$label, [string]$path, [double]$limitMin, [string]$extraLabel) {
  $fi = Get-FileInfoOrNull $path
  if ($fi -eq $null) { Add-Check $id $false ($label + ': MISSING - ' + (Split-Path -Leaf $path) + ' was not found in VTES-Outbox.'); return }
  $t = $fi.LastWriteTime
  $age = ($NOW - $t).TotalMinutes
  $extra = ''
  if ($extraLabel -ne '') { $ln = Get-Line $fi.FullName $extraLabel; if ($ln -ne '') { $extra = ' ' + $extraLabel + ': ' + $ln + '.' } }
  if ($age -lt -2) { Add-Check $id $false ($label + ': BAD CLOCK - file time ' + (ShortTime $t) + ' is in the future.' + $extra); return }
  if ($age -gt $limitMin) { Add-Check $id $false ($label + ': STALE - last written ' + (ShortTime $t) + ' (' + (AgeText $t) + '); limit ' + $limitMin + ' min.' + $extra); return }
  Add-Check $id $true ($label + ': written ' + (ShortTime $t) + ' (' + (AgeText $t) + ').' + $extra)
}

try { Check-Heartbeat 'LIVE-UPTIME' 'PC uptime heartbeat (_UPTIME-HEARTBEAT.md)' (Join-Path $OutboxDir '_UPTIME-HEARTBEAT.md') 15 '' } catch { $problems.Add('uptime: ' + $_.Exception.Message) }
try {
  Check-Heartbeat 'LIVE-OCR' 'OCR lane (_OCR-HEARTBEAT.md)' (Join-Path $OutboxDir '_OCR-HEARTBEAT.md') 20 'State'
  $ocr = Join-Path $OutboxDir '_OCR-HEARTBEAT.md'
  $last = $checks[$checks.Count - 1]
  if ($last.ok -and (Get-Line $ocr 'State') -match 'CRASHED') { $last.ok = $false; $last.text = 'OCR lane CRASHED. ' + $last.text }
  $prog = Get-Line $ocr 'Progress'; if ($prog -ne '') { $last.text = Clean ($last.text + ' Progress: ' + $prog) 400 }
} catch { $problems.Add('ocr: ' + $_.Exception.Message) }
try {
  Check-Heartbeat 'LIVE-RAMGUARD' 'RAM guard (_RAM-GUARD-HEARTBEAT.md)' (Join-Path $OutboxDir '_RAM-GUARD-HEARTBEAT.md') 5 'Level'
} catch { $problems.Add('ramguard: ' + $_.Exception.Message) }

# free RAM, measured now (same red line as RAM-Guard.ps1: under 1.5 GB is red)
try {
  $os = Get-CimInstance Win32_OperatingSystem -ErrorAction Stop
  $freeGB = [math]::Round(([double]$os.FreePhysicalMemory) / 1MB, 1)
  $totGB  = [math]::Round(([double]$os.TotalVisibleMemorySize) / 1MB, 1)
  $lvl = 'GREEN'; if ($freeGB -lt 3) { $lvl = 'AMBER' }; if ($freeGB -lt 1.5) { $lvl = 'RED' }
  Add-Check 'LIVE-RAM' ($freeGB -ge 1.5) ('Free RAM now: ' + $freeGB.ToString($INV) + ' GB of ' + $totGB.ToString($INV) + ' GB (' + $lvl + '; red below 1.5 GB).')
} catch {
  Add-Check 'LIVE-RAM' $false ('Free RAM: NO DATA - Windows did not answer (' + (Clean $_.Exception.Message 120) + ').')
}

# Orange Tree index: when it was last rebuilt (26-hour limit, the same daily limit the page uses for daily reports)
try {
  $fi = Get-FileInfoOrNull $OrangeTreeIndex
  if ($fi -eq $null) { Add-Check 'LIVE-ORANGETREE' $false 'ORANGE TREE INDEX: MISSING - _ORANGE-TREE-INDEX.html was not found.' }
  else {
    $t = $fi.LastWriteTime; $ok = (($NOW - $t).TotalHours -le 26) -and (($NOW - $t).TotalMinutes -ge -2)
    $w = 'ORANGE TREE INDEX last written ' + (ShortTime $t) + ' (' + (AgeText $t) + ').'
    if (-not $ok) { $w = $w + ' OLDER THAN 26 HOURS.' }
    Add-Check 'LIVE-ORANGETREE' $ok $w
  }
} catch { $problems.Add('orangetree: ' + $_.Exception.Message) }

# usage governor heartbeat (may not exist yet)
$govPath = Join-Path $OutboxDir '_USAGE-GOVERNOR-HEARTBEAT.md'
$govInfo = Get-FileInfoOrNull $govPath
if ($govInfo -eq $null) { Add-Check 'LIVE-GOVERNOR' $false 'Usage governor: governor not built yet (order queued). No token numbers are shown because none were measured.' }
else { Check-Heartbeat 'LIVE-GOVERNOR' 'Usage governor (_USAGE-GOVERNOR-HEARTBEAT.md)' $govPath 30 '' }

# ledgers: row counts and last write (a count of ledger rows, NOT a count of open jobs)
foreach ($pair in @(@('LIVE-INBOX-LEDGER', 'VTES-Inbox ledger', $InboxDir), @('LIVE-OUTBOX-LEDGER', 'VTES-Outbox ledger', $OutboxDir))) {
  try {
    $p = Join-Path $pair[2] '_LEDGER.csv'
    $fi = Get-FileInfoOrNull $p
    if ($fi -eq $null) { Add-Check $pair[0] $false ($pair[1] + ': MISSING - _LEDGER.csv not found.'); continue }
    $rows = @(Import-Csv -LiteralPath $p)
    $txt = $pair[1] + ': ' + $rows.Count + ' row(s), last written ' + (ShortTime $fi.LastWriteTime) + ' (' + (AgeText $fi.LastWriteTime) + ').'
    if ($rows.Count -gt 0) {
      $col = @($rows[0].PSObject.Properties | Where-Object { $_.Name -match '^(status|state)$' } | Select-Object -First 1)
      if ($col.Count -eq 1) {
        $cn = $col[0].Name
        $groups = $rows | Group-Object -Property $cn | Sort-Object Count -Descending | Select-Object -First 5
        $txt = $txt + ' By ' + $cn + ': ' + (($groups | ForEach-Object { (Clean $_.Name 30) + ' ' + $_.Count }) -join ', ') + '.'
      }
    }
    Add-Check $pair[0] $true $txt
  } catch { Add-Check $pair[0] $false ($pair[1] + ': UNREADABLE - ' + (Clean $_.Exception.Message 120)) }
}

# ---------------------------------------------------------------- RAMBO lanes, from VTES-Outbox file names
# CODEX in the name = Rambo 2 (Codex lane, card LLM-06). Anything else = Rambo 1 (Claude lane, card LLM-01).
$executors = [ordered]@{}
try {
  $laneFiles = @()
  if (Test-Path -LiteralPath $OutboxDir -PathType Container) {
    $laneFiles = @(Get-ChildItem -LiteralPath $OutboxDir -File -Force | Where-Object { $_.Name -match '^(EXECUTED|BLOCKER|CAP-REACHED)_.*\.md$' })
  } else { $problems.Add('VTES-Outbox folder not found: ' + $OutboxDir) }
  foreach ($lane in @(@('LLM-01', 'Rambo 1 (Claude lane)', $false), @('LLM-06', 'Rambo 2 (Codex lane)', $true))) {
    $mine = @($laneFiles | Where-Object { ($_.Name -match 'CODEX') -eq $lane[2] })
    $caps = @($mine | Where-Object { $_.Name -like 'CAP-REACHED_*' -and $_.LastWriteTime.Date -eq $NOW.Date } | Sort-Object LastWriteTime -Descending)
    $work = @($mine | Where-Object { $_.Name -notlike 'CAP-REACHED_*' } | Sort-Object LastWriteTime -Descending)
    $today = @($work | Where-Object { $_.LastWriteTime.Date -eq $NOW.Date }).Count
    if ($caps.Count -gt 0) {
      $c = $caps[0]
      $executors[$lane[0]] = [ordered]@{ state = 'waiting-for-reset'; last_seen = (Iso $c.LastWriteTime) }
      Add-Check ('LIVE-' + $lane[0]) $false ($lane[1] + ': WAITING FOR RESET - ' + (Clean $c.Name 120) + ' written ' + (ShortTime $c.LastWriteTime) + '. Result files today: ' + $today + '.')
    } elseif ($work.Count -gt 0) {
      $w = $work[0]
      $executors[$lane[0]] = [ordered]@{ state = 'up'; last_seen = (Iso $w.LastWriteTime) }
      $word = 'last result file'; if ($w.Name -like 'BLOCKER_*') { $word = 'last result file is a BLOCKER' }
      Add-Check ('LIVE-' + $lane[0]) ($w.Name -notlike 'BLOCKER_*') ($lane[1] + ': ' + $word + ' ' + (Clean $w.Name 120) + ', written ' + (ShortTime $w.LastWriteTime) + ' (' + (AgeText $w.LastWriteTime) + '). Result files today: ' + $today + '.')
    } else {
      Add-Check ('LIVE-' + $lane[0]) $false ($lane[1] + ': NO DATA - no EXECUTED_, BLOCKER_ or CAP-REACHED_ file for this lane in VTES-Outbox.')
    }
  }
} catch { $problems.Add('lanes: ' + $_.Exception.Message) }

# ---------------------------------------------------------------- bots, from the Windows scheduler
$bots = [ordered]@{}
function Get-TaskIntervalSec($task) {
  $best = $null
  foreach ($tr in @($task.Triggers)) {
    if ($tr -eq $null) { continue }
    try { if ($tr.Enabled -eq $false) { continue } } catch { }
    $sec = $null
    try { $iv = $tr.Repetition.Interval; if ($iv) { $sec = [int][System.Xml.XmlConvert]::ToTimeSpan($iv).TotalSeconds } } catch { $sec = $null }
    if (-not $sec) {
      try {
        $cls = $tr.CimClass.CimClassName
        if ($cls -eq 'MSFT_TaskDailyTrigger' -and $tr.DaysInterval) { $sec = 86400 * [int]$tr.DaysInterval }
        elseif ($cls -eq 'MSFT_TaskWeeklyTrigger' -and $tr.WeeksInterval) { $sec = 604800 * [int]$tr.WeeksInterval }
      } catch { $sec = $null }
    }
    if ($sec -and $sec -ge 1 -and $sec -le 604800 -and ($best -eq $null -or $sec -lt $best)) { $best = $sec }
  }
  return $best
}
$schedulerOk = $false
if (-not $NoScheduler) {
  try {
    $tasks = @(Get-ScheduledTask -ErrorAction Stop | Where-Object { $_.TaskName -match '^(CU-|VTES-|AI-)' -and $_.TaskName -ne $SELF_TASK } | Sort-Object TaskName)
    $schedulerOk = $true
    foreach ($t in $tasks) {
      if ($bots.Contains($t.TaskName)) { continue }   # same name in two task folders: the first one is reported
      $lastRun = $null; $nextRun = $null; $res = $null
      try {
        $info = Get-ScheduledTaskInfo -TaskName $t.TaskName -TaskPath $t.TaskPath -ErrorAction Stop
        if ($info.LastRunTime -and $info.LastRunTime.Year -ge 2000) { $lastRun = Iso $info.LastRunTime }
        if ($info.NextRunTime -and $info.NextRunTime.Year -ge 2000) { $nextRun = Iso $info.NextRunTime }
        if ($info.LastTaskResult -ne $null) { $res = [long]$info.LastTaskResult }
      } catch { }
      $bots[$t.TaskName] = [ordered]@{ state = [string]$t.State; last_run_at = $lastRun; last_result = $res; next_run_at = $nextRun; interval_sec = (Get-TaskIntervalSec $t) }
    }
  } catch { $problems.Add('scheduler: ' + $_.Exception.Message) }
}

# ---------------------------------------------------------------- tokens: only real numbers from the governor
$tokens = [ordered]@{ schema = 1; at = (Iso $NOW); writer = ($WRITER + ': governor not built yet (order queued)') }
if ($govInfo -ne $null) {
  $tokens.writer = $WRITER + ': governor heartbeat found but it gives no burn_per_hour / window_used_pct lines'
  $num = { param($label) $s = Get-Line $govInfo.FullName $label; $d = 0.0
           if ($s -match '^-?[0-9]+(\.[0-9]+)?' -and [double]::TryParse($Matches[0], [Globalization.NumberStyles]::Float, $INV, [ref]$d)) { return $d }; return $null }
  $burn = & $num 'burn_per_hour'; $wpct = & $num 'window_used_pct'; $kpct = & $num 'week_used_pct'
  $resetRaw = Get-Line $govInfo.FullName 'window_resets_at'; $reset = $null
  if ($resetRaw -ne '') { $dto = [DateTimeOffset]::MinValue; if ([DateTimeOffset]::TryParse($resetRaw, $INV, [Globalization.DateTimeStyles]::None, [ref]$dto) -and $resetRaw -match '(Z|[+-]\d{2}:?\d{2})$') { $reset = $dto.ToString("yyyy-MM-dd'T'HH:mm:sszzz", $INV) } }
  if ($burn -ne $null) { $tokens.burn_per_hour = $burn }
  if ($wpct -ne $null) { $tokens.window_used_pct = $wpct }
  if ($kpct -ne $null) { $tokens.week_used_pct = $kpct }
  if ($reset -ne $null) { $tokens.window_resets_at = $reset }
  if ($burn -ne $null -or $wpct -ne $null) { $tokens.writer = $WRITER + ': read from _USAGE-GOVERNOR-HEARTBEAT.md written ' + (Iso $govInfo.LastWriteTime) }
}

# ---------------------------------------------------------------- assemble and write the seven files
$at = Iso $NOW
$passed = @($checks | Where-Object { $_.ok }).Count
$repairs = @($checks | ForEach-Object { $s = 'DONE'; if (-not $_.ok) { $s = 'OPEN' }; [ordered]@{ id = $_.id; text = ('LIVE CHECK - ' + $_.text); status = $s } })

$heartbeat = [ordered]@{ schema = 1; at = $at; writer = $WRITER; interval_sec = $TICK_SEC; executors = $executors }
if ($schedulerOk) { $botsFile = [ordered]@{ schema = 1; at = $at; writer = $WRITER; interval_sec = $TICK_SEC; bots = $bots } }
else { $botsFile = [ordered]@{ schema = 1; at = $null; writer = ($WRITER + ': the Windows scheduler could not be read') } }
$state = [ordered]@{ schema = 1; at = $at; writer = $WRITER; repairs = $repairs }
$health = [ordered]@{ schema = 1; at = $at; writer = $WRITER; ok = ($passed -eq $checks.Count -and $checks.Count -gt 0); checks_passed = $passed; checks_total = $checks.Count; report_sent_at = $null }
$housekeeping = [ordered]@{ schema = 1; at = $at; writer = ($WRITER + ': no housekeeping source on this PC yet, nothing measured') }
$miamidade = [ordered]@{ schema = 1; at = $at; writer = ($WRITER + ': no Miami-Dade counter source yet, nothing counted'); counted = $null; target = 300 }

Write-DataFile $dataDir 'heartbeat' $heartbeat
Write-DataFile $dataDir 'bots' $botsFile
Write-DataFile $dataDir 'state' $state
Write-DataFile $dataDir 'health' $health
Write-DataFile $dataDir 'tokens' $tokens
Write-DataFile $dataDir 'housekeeping' $housekeeping
Write-DataFile $dataDir 'miamidade' $miamidade

if ($problems.Count -gt 0) {
  Write-Log ('DONE WITH PROBLEMS (' + $problems.Count + '): ' + ($problems -join ' | '))
  exit 1
}
$skipTxt = ''; if ($script:skipped.Count -gt 0) { $skipTxt = ' (left alone, owned by another writer: ' + ($script:skipped -join ', ') + ')' }
Write-Log ('OK: ' + $script:written + ' of 7 files written to ' + $dataDir + $skipTxt + '; checks ' + $passed + ' of ' + $checks.Count + ' passed; ' + $bots.Count + ' bots; ' + $executors.Count + ' lanes')
exit 0
