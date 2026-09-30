# VTES-Attention.ps1
# ADHOC-ATTENTION-POPUP . #VTES-control-panel #JorgeValdes #approvals #RI-001 #RI-022
#
# WHAT IT DOES
#   Watches the existing approvals report (APPROVALS-QUEUE.json, JOB-0094) and any
#   ALERT_*.json that an agent drops in VTES-Outbox. When a NEW item needs Jorge, a
#   banner drops in at the TOP of the monitor he is using, flashes amber/red, plays
#   one sound, and offers: YES/GO, NO, or LATER (2 hours / tonight / tomorrow).
#   Every click is written to files the existing 15-minute cycle already ingests, so
#   the answer lands in the SAME pending-owner-action report. Nothing is decided
#   silently and nothing lives only on screen.
#
# DESIGN RULES (each one answers a logged failure)
#   RI-001  The banner NEVER takes keyboard focus (WS_EX_NOACTIVATE). Dictation keeps
#           going to the window he is typing in. No new PowerShell console per alert:
#           this is ONE resident hidden process, like the tray (TRK-2026-9740).
#   RI-001  Buttons stay dead for 1.5 s after the banner appears, so a stray mouse
#           click during dictation cannot approve anything. Money and filing items
#           need a second deliberate click. Credential items have NO approve button.
#   RI-022  Appears on the monitor the mouse is on, then is verified to sit fully
#           inside a real screen (the old ask window lived at x=-963, unseen).
#   RI-015  Heartbeat log grows every 5 min; the script also warns when the approvals
#           report itself has not been refreshed in 48 h. A component nothing
#           watches is how components die.
#   Flood   First run only BASELINES what is already open (no pop-ups for the old
#           backlog). More than 5 new at once collapse into ONE summary banner.
#   RI-036  HKCU only. No admin. No UAC.
#   RI-032  This file is pure ASCII plus a BOM. Do not add emoji or em-dashes.
#
# USAGE
#   -SelfTest   run the logic tests (no screen) and exit 0 only if all pass
#   -Demo       show three fake alerts (one per kind); writes nothing real
#   -Install    autostart at logon (hidden, via a .vbs wrapper) and start now
#   -Uninstall  remove autostart (a running copy keeps running until logoff)
#   (no switch) run the watcher in the foreground

param(
    [switch]$SelfTest,
    [switch]$Demo,
    [switch]$Install,
    [switch]$Uninstall,
    [string]$QueuePath,
    [string]$AlertDir,
    [string]$InboxDir,
    [string]$StateDir
)

$ErrorActionPreference = 'Stop'
$AppName  = 'VTES-Attention'
$Self     = $MyInvocation.MyCommand.Path
$RunKey   = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'

if (-not $QueuePath) { $QueuePath = 'G:\My Drive\MY-DESK\APPROVALS-QUEUE.json' }
$QueueFallback = 'G:\My Drive\VTES-Outbox\APPROVALS-QUEUE.json'
if (-not $AlertDir) { $AlertDir = 'G:\My Drive\VTES-Outbox' }
if (-not $InboxDir) { $InboxDir = 'G:\My Drive\VTES-Inbox' }
if (-not $StateDir) {
    $base = $env:LOCALAPPDATA
    if (-not $base) { $base = [System.IO.Path]::GetTempPath() }
    $StateDir = Join-Path $base $AppName
}
$MirrorDir = 'G:\My Drive\MY-DESK'

$PollSeconds  = 60
$ArmMs        = 1500
$FlashSeconds = 20
$MaxIndividual = 5
$StaleHours   = 48
$Utf8 = New-Object System.Text.UTF8Encoding($false)

# ---------------------------------------------------------------------------
# PURE LOGIC (no screen). Everything below is covered by -SelfTest.
# ---------------------------------------------------------------------------

function Read-Utf8Json([string]$Path) {
    $raw = [System.IO.File]::ReadAllText($Path, [System.Text.Encoding]::UTF8)
    if ($raw.Length -gt 0 -and $raw[0] -eq [char]0xFEFF) { $raw = $raw.Substring(1) }
    return ($raw | ConvertFrom-Json)
}

function New-State { return @{ ids = @(); snooze = @{}; baselined = $false; digest_date = ''; stale_date = '' } }

function Load-State([string]$Dir) {
    $s = New-State
    $p = Join-Path $Dir 'state.json'
    if (Test-Path $p) {
        try {
            $j = Read-Utf8Json $p
            if ($j.ids) { $s.ids = @($j.ids) }
            if ($j.snooze) { foreach ($pr in $j.snooze.PSObject.Properties) { $s.snooze[$pr.Name] = [string]$pr.Value } }
            $s.baselined   = [bool]$j.baselined
            $s.digest_date = [string]$j.digest_date
            $s.stale_date  = [string]$j.stale_date
        } catch { }
    }
    return $s
}

function Save-State([string]$Dir, $State) {
    if (-not (Test-Path $Dir)) { New-Item -ItemType Directory -Path $Dir -Force | Out-Null }
    $o = [ordered]@{ ids = @($State.ids); snooze = $State.snooze; baselined = $State.baselined; digest_date = $State.digest_date; stale_date = $State.stale_date }
    [System.IO.File]::WriteAllText((Join-Path $Dir 'state.json'), ($o | ConvertTo-Json -Depth 4), $Utf8)
}

# What kind of buttons does this item get?
#   NOAPPROVE = credential item: Jorge enters it himself, popup offers no approve
#   DOMYSELF  = a click/physical task only Jorge can do
#   CONFIRM2  = money or filing: YES needs a second click
#   DECIDE    = plain YES / NO
function Get-Kind($Item) {
    $c = ([string]$Item.class).ToUpper().Trim()
    switch -Regex ($c) {
        '^CRED'                          { return 'NOAPPROVE' }
        '^(CLICK|PHYSICAL|PRINT)'        { return 'DOMYSELF' }
        '^(SPEND|FILING)'                { return 'CONFIRM2' }
        default                          { return 'DECIDE' }
    }
}

function Get-Alertable($Items, $State, [datetime]$NowUtc) {
    $out = New-Object System.Collections.ArrayList
    foreach ($i in $Items) {
        if ([string]$i.state -ne 'OPEN') { continue }
        $id = [string]$i.id
        if (-not $id) { continue }
        if ($State.snooze.ContainsKey($id)) {
            $due = [datetime]::Parse($State.snooze[$id], [System.Globalization.CultureInfo]::InvariantCulture, [System.Globalization.DateTimeStyles]::RoundtripKind)
            if ($NowUtc -lt $due.ToUniversalTime()) { continue }
        } elseif ($State.ids -contains $id) { continue }
        [void]$out.Add($i)
    }
    return ,$out.ToArray()
}

function Get-SnoozeUntil([string]$Choice, [datetime]$NowLocal) {
    switch ($Choice) {
        '2h'       { $t = $NowLocal.AddHours(2) }
        'tonight'  { $t = $NowLocal.Date.AddHours(19); if ($t -le $NowLocal.AddMinutes(30)) { $t = $NowLocal.AddHours(2) } }
        'tomorrow' { $t = $NowLocal.Date.AddDays(1).AddHours(8) }
        default    { $t = $NowLocal.AddHours(2) }
    }
    return $t.ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ')
}

function Clip([string]$s, [int]$n) {
    if (-not $s) { return '' }
    $s = ($s -replace '\s+', ' ').Trim()
    if ($s.Length -le $n) { return $s }
    return $s.Substring(0, $n - 3).TrimEnd() + '...'
}

# File written for the existing ingest path (same convention as OWNER-APPROVAL_AP-####).
function New-DecisionFile($Item, [string]$Decision, [string]$Until, [datetime]$NowLocal) {
    $id = [string]$Item.id
    $stamp = $NowLocal.ToString('yyyy-MM-dd-HHmm')
    switch ($Decision) {
        'GO'     { $prefix = 'OWNER-APPROVAL' }
        'NO'     { $prefix = 'OWNER-APPROVAL' }
        'LATER'  { $prefix = 'OWNER-DEFER' }
        'DOING'  { $prefix = 'OWNER-TAKING-ACTION' }
        default  { $prefix = 'OWNER-NOTE' }
    }
    $name = '{0}_{1}_{2}_{3}.md' -f $prefix, $id, $Decision, $stamp
    $lines = @(
        ('# {0} {1} = {2}' -f $prefix, $id, $Decision),
        ('**Answered by Jorge Valdes with a real click on the VTES-Attention banner, {0} local.** #approvals #JorgeValdes #VTES-control-panel #{1}' -f $NowLocal.ToString('yyyy-MM-dd HH:mm:ss'), $id),
        '',
        ('- Item: {0}  class={1}' -f $id, [string]$Item.class),
        ('- Decision: **{0}**' -f $Decision)
    )
    if ($Decision -eq 'LATER') { $lines += ('- Ask again after (UTC): {0}' -f $Until) }
    if ($Decision -eq 'DOING') { $lines += '- Jorge says he is doing this himself. This does NOT close the item: close it only with proof (Rule 2).' }
    $lines += ('- What was asked: {0}' -f (Clip ([string]$Item.action) 400))
    $lines += ''
    $lines += 'Action for the desktop cycle: set owner_choice / owner_choice_ts on this AP in APPROVALS-QUEUE.json, refresh APPROVALS-NOW.md, then act per the charter (GREEN now, RED only with this approval).'
    $lines += ''
    $lines += 'Did the queue and APPROVALS-NOW.md show this answer after your next cycle?'
    $lines += ''
    $lines += ('*ADHOC-ATTENTION-POPUP . {0} . CURRENT*' -f $NowLocal.ToString('yyyy-MM-dd'))
    return @{ name = $name; body = ($lines -join "`r`n") }
}

function Read-AlertDrops([string]$Dir) {
    $out = New-Object System.Collections.ArrayList
    if (-not (Test-Path $Dir)) { return ,$out.ToArray() }
    foreach ($f in (Get-ChildItem -Path $Dir -Filter 'ALERT_*.json' -ErrorAction SilentlyContinue)) {
        try {
            $j = Read-Utf8Json $f.FullName
            $id = [string]$j.id
            if (-not $id) { $id = 'ALERT-' + [System.IO.Path]::GetFileNameWithoutExtension($f.Name) }
            $o = New-Object PSObject -Property @{
                id = $id; class = [string]$j.class; action = [string]$j.action; consequence = [string]$j.consequence
                ref = [string]$j.ref; deadline = [string]$j.deadline; state = 'OPEN'; opened_utc = [string]$j.opened_utc
            }
            [void]$out.Add($o)
        } catch { }
    }
    return ,$out.ToArray()
}

function Write-Log([string]$Dir, [string]$Event, [string]$Id, [string]$Detail) {
    $line = ('{{"t":"{0}","event":"{1}","id":"{2}","detail":"{3}"}}' -f (Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ'), $Event, $Id, (($Detail -replace '["\\\r\n]', ' ')))
    foreach ($d in @($Dir, $MirrorDir)) {
        try {
            if (Test-Path $d) { [System.IO.File]::AppendAllText((Join-Path $d 'APPROVAL-ALERT-LOG.jsonl'), $line + "`r`n", $Utf8) }
            elseif ($d -eq $Dir) { New-Item -ItemType Directory -Path $d -Force | Out-Null; [System.IO.File]::AppendAllText((Join-Path $d 'APPROVAL-ALERT-LOG.jsonl'), $line + "`r`n", $Utf8) }
        } catch { }
    }
}

# Deliver a decision file. If Drive is not reachable, keep it and retry next poll. Never lose an answer.
function Send-Decision($File, [string]$Inbox, [string]$Dir) {
    $pend = Join-Path $Dir 'pending-send'
    try {
        if (-not (Test-Path $Inbox)) { throw 'inbox unreachable' }
        [System.IO.File]::WriteAllText((Join-Path $Inbox $File.name), $File.body, $Utf8)
        return $true
    } catch {
        if (-not (Test-Path $pend)) { New-Item -ItemType Directory -Path $pend -Force | Out-Null }
        [System.IO.File]::WriteAllText((Join-Path $pend $File.name), $File.body, $Utf8)
        return $false
    }
}

function Flush-Pending([string]$Inbox, [string]$Dir) {
    $pend = Join-Path $Dir 'pending-send'
    if (-not (Test-Path $pend) -or -not (Test-Path $Inbox)) { return }
    foreach ($f in (Get-ChildItem -Path $pend -Filter '*.md' -ErrorAction SilentlyContinue)) {
        try { Copy-Item -Path $f.FullName -Destination (Join-Path $Inbox $f.Name) -Force; Remove-Item $f.FullName -Force } catch { }
    }
}

function Build-DigestHtml($Items, [datetime]$NowUtc) {
    $open = @($Items | Where-Object { [string]$_.state -eq 'OPEN' })
    $rows = foreach ($i in $open) {
        $age = ''
        if ($i.opened_utc) { try { $age = [int](($NowUtc - [datetime]::Parse([string]$i.opened_utc, [System.Globalization.CultureInfo]::InvariantCulture, [System.Globalization.DateTimeStyles]::RoundtripKind).ToUniversalTime()).TotalDays) } catch { } }
        $a = [System.Net.WebUtility]::HtmlEncode((Clip ([string]$i.action) 420))
        $c = [System.Net.WebUtility]::HtmlEncode((Clip ([string]$i.consequence) 260))
        $dl = ''
        if ($i.deadline) { $dl = '<div class="dl">Deadline: ' + [System.Net.WebUtility]::HtmlEncode([string]$i.deadline) + '</div>' }
        $ageTxt = ''
        if ($age -ne '') { $ageTxt = ' &middot; ' + $age + ' days old' }
        ('<div class="it"><div class="h">{0} &middot; {1}{2}</div><div class="a">{3}</div><div class="c">If you wait: {4}</div>{5}</div>' -f $i.id, [System.Net.WebUtility]::HtmlEncode([string]$i.class), $ageTxt, $a, $c, $dl)
    }
    $head = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Waiting on Jorge</title><style>body{font:20px/1.5 Segoe UI,Arial;background:#f6f4ef;color:#1d1d1b;margin:0;padding:24px}h1{font-size:30px;margin:0 0 6px}.it{background:#fff;border:1px solid #d9d5cc;border-radius:12px;padding:14px 16px;margin:12px 0}.h{font-weight:700;color:#1b5e9e;font-size:16px}.a{margin:6px 0}.c{color:#5b5b57;font-size:17px}.dl{color:#8a2d1f;font-weight:700}</style></head><body>'
    $top = ('<h1>Waiting on Jorge: {0} open</h1><p>ADHOC-ATTENTION-POPUP. Source: APPROVALS-QUEUE.json. Answer with the banner, or reply in chat: AP number + GO / NO / LATER.</p>' -f $open.Count)
    return ($head + $top + ($rows -join "`n") + '</body></html>')
}

function Get-AllItems([string]$Queue, [string]$Fallback, [string]$Alerts) {
    $items = New-Object System.Collections.ArrayList
    $src = $null
    foreach ($p in @($Queue, $Fallback)) { if ($p -and (Test-Path $p)) { $src = $p; break } }
    $age = $null
    if ($src) {
        $q = Read-Utf8Json $src
        foreach ($i in @($q.items)) { [void]$items.Add($i) }
        $age = (Get-Date) - (Get-Item $src).LastWriteTime
    }
    foreach ($d in (Read-AlertDrops $Alerts)) { [void]$items.Add($d) }
    return @{ items = $items.ToArray(); source = $src; age = $age }
}

# ---------------------------------------------------------------------------
# SELF TEST (runs anywhere PowerShell runs; no screen)
# ---------------------------------------------------------------------------
if ($SelfTest) {
    $pass = 0; $fail = 0
    function Check([string]$n, $cond) { if ($cond) { $script:pass++; Write-Host ('PASS  ' + $n) } else { $script:fail++; Write-Host ('FAIL  ' + $n) } }

    $tmp = Join-Path ([System.IO.Path]::GetTempPath()) ('vtes-attn-test-' + [guid]::NewGuid().ToString('N').Substring(0, 8))
    New-Item -ItemType Directory -Path $tmp -Force | Out-Null
    $inbox = Join-Path $tmp 'inbox'; $alerts = Join-Path $tmp 'alerts'; $st = Join-Path $tmp 'state'
    New-Item -ItemType Directory -Path $inbox, $alerts -Force | Out-Null
    $now = [datetime]::Parse('2026-09-30T20:00:00Z', [System.Globalization.CultureInfo]::InvariantCulture, [System.Globalization.DateTimeStyles]::RoundtripKind).ToUniversalTime()

    $qjson = '{"items":[' +
      '{"id":"AP-0001","class":"DECIDE","action":"Write the email?","state":"OPEN","opened_utc":"2026-09-01T00:00:00Z"},' +
      '{"id":"AP-0002","class":"CRED","action":"Paste key","state":"OPEN"},' +
      '{"id":"AP-0003","class":"CLICK","action":"Click tray icon","state":"OPEN"},' +
      '{"id":"AP-0004","class":"SPEND","action":"Pay $100","state":"OPEN"},' +
      '{"id":"AP-0005","class":"DECIDE","action":"Old closed","state":"CLOSED"},' +
      '{"id":"AP-0006","class":"FILING","action":"File it","state":"ANSWERED"}]}'
    $qp = Join-Path $tmp 'queue.json'
    [System.IO.File]::WriteAllText($qp, [char]0xFEFF + $qjson, $Utf8)

    $all = Get-AllItems $qp $null $alerts
    Check 'reads queue with BOM'           ($all.items.Count -eq 6)
    Check 'kind CRED has no approve'       ((Get-Kind $all.items[1]) -eq 'NOAPPROVE')
    Check 'kind CLICK is do-it-myself'     ((Get-Kind $all.items[2]) -eq 'DOMYSELF')
    Check 'kind SPEND needs 2 clicks'      ((Get-Kind $all.items[3]) -eq 'CONFIRM2')
    Check 'kind DECIDE is yes/no'          ((Get-Kind $all.items[0]) -eq 'DECIDE')

    $s = New-State
    $a = Get-Alertable $all.items $s $now
    Check 'only OPEN items are alertable'  ($a.Count -eq 4)
    $s.ids = @('AP-0001','AP-0002','AP-0003','AP-0004')
    Check 'seen items do not re-alert'     ((Get-Alertable $all.items $s $now).Count -eq 0)

    $s.snooze['AP-0001'] = '2026-09-30T22:00:00Z'
    Check 'snoozed item stays quiet'       ((Get-Alertable $all.items $s $now).Count -eq 0)
    $later = $now.AddHours(3)
    $r = Get-Alertable $all.items $s $later
    Check 'snoozed item returns when due'  (($r.Count -eq 1) -and ($r[0].id -eq 'AP-0001'))

    $loc = Get-Date '2026-09-30 10:00:00'
    Check 'snooze 2h'                      ((Get-SnoozeUntil '2h' $loc) -eq $loc.AddHours(2).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ'))
    Check 'snooze tonight = 7pm'           ((Get-SnoozeUntil 'tonight' $loc) -eq (Get-Date '2026-09-30 19:00:00').ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ'))
    $late = Get-Date '2026-09-30 21:00:00'
    Check 'tonight after 7pm falls to 2h'  ((Get-SnoozeUntil 'tonight' $late) -eq $late.AddHours(2).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ'))
    Check 'snooze tomorrow = 8am'          ((Get-SnoozeUntil 'tomorrow' $loc) -eq (Get-Date '2026-10-01 08:00:00').ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ'))

    $f = New-DecisionFile $all.items[0] 'GO' '' $loc
    Check 'decision file name'             ($f.name -eq 'OWNER-APPROVAL_AP-0001_GO_2026-09-30-1000.md')
    Check 'decision ends with a question'  ($f.body.TrimEnd().Split("`n")[-2].Trim().EndsWith('?') -or ($f.body -match '\?\s*\r?\n\r?\n\*ADHOC'))
    Check 'decision carries hashtag in body' ($f.body -match '#approvals' -and $f.body -match '#AP-0001')
    Check 'doing-it does not close'        ((New-DecisionFile $all.items[2] 'DOING' '' $loc).body -match 'does NOT close')
    Check 'defer file is OWNER-DEFER'      ((New-DecisionFile $all.items[0] 'LATER' '2026-09-30T22:00:00Z' $loc).name -like 'OWNER-DEFER_AP-0001_LATER_*')

    Check 'delivers to inbox'              ((Send-Decision $f $inbox $st) -eq $true -and (Test-Path (Join-Path $inbox $f.name)))
    $f2 = New-DecisionFile $all.items[0] 'NO' '' $loc.AddMinutes(1)
    Check 'unreachable inbox is kept'      ((Send-Decision $f2 (Join-Path $tmp 'nope') $st) -eq $false -and (Test-Path (Join-Path $st 'pending-send')))
    Flush-Pending $inbox $st
    Check 'pending flushed when back'      (Test-Path (Join-Path $inbox $f2.name))

    [System.IO.File]::WriteAllText((Join-Path $alerts 'ALERT_test.json'), '{"id":"ALERT-T1","class":"DECIDE","action":"Agent raised hand","consequence":"none"}', $Utf8)
    $all2 = Get-AllItems $qp $null $alerts
    Check 'agent ALERT drop is picked up'  (($all2.items | Where-Object { $_.id -eq 'ALERT-T1' }) -ne $null)

    Save-State $st $s
    $s2 = Load-State $st
    Check 'state round-trips'              (($s2.ids.Count -eq 4) -and $s2.snooze.ContainsKey('AP-0001'))

    $html = Build-DigestHtml $all2.items $now
    Check 'digest lists only open items'   (($html -match 'AP-0001') -and ($html -notmatch 'AP-0005') -and ($html -match '5 open'))
    Check 'clip shortens long text'        ((Clip ('x' * 500) 50).Length -eq 50)

    Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
    Write-Host ('RESULT: {0} passed, {1} failed' -f $pass, $fail)
    if ($fail -eq 0) { exit 0 } else { exit 1 }
}

# ---------------------------------------------------------------------------
# INSTALL / UNINSTALL (HKCU only, hidden via .vbs so no console ever flashes)
# ---------------------------------------------------------------------------
if ($Uninstall) {
    Remove-ItemProperty -Path $RunKey -Name $AppName -ErrorAction SilentlyContinue
    Write-Host "$AppName autostart removed. A running copy stays until you log off."
    exit 0
}

if ($Install) {
    $psExe = Join-Path $env:WINDIR 'System32\WindowsPowerShell\v1.0\powershell.exe'
    $vbs = Join-Path (Split-Path -Parent $Self) 'VTES-Attention-Run.vbs'
    $inner = '"' + $psExe + '" -NoProfile -STA -WindowStyle Hidden -ExecutionPolicy Bypass -File "' + $Self + '"'
    $vbsText = 'CreateObject("WScript.Shell").Run "' + ($inner -replace '"', '""') + '", 0, False'
    [System.IO.File]::WriteAllText($vbs, $vbsText, [System.Text.Encoding]::ASCII)
    Set-ItemProperty -Path $RunKey -Name $AppName -Value ('wscript.exe "' + $vbs + '"') -Force
    Start-Process -FilePath 'wscript.exe' -ArgumentList ('"' + $vbs + '"')
    Write-Host "Installed. Starts at every logon, hidden. Started now. Undo: -Uninstall"
    exit 0
}

# ---------------------------------------------------------------------------
# SCREEN PART (Windows only)
# ---------------------------------------------------------------------------
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Windows.Forms, System.Drawing -TypeDefinition @'
using System;
using System.Windows.Forms;
public class VtesAlertForm : Form {
    protected override bool ShowWithoutActivation { get { return true; } }
    protected override CreateParams CreateParams {
        get {
            CreateParams cp = base.CreateParams;
            cp.ExStyle |= 0x08000000;  // WS_EX_NOACTIVATE: never takes keyboard focus
            cp.ExStyle |= 0x00000080;  // WS_EX_TOOLWINDOW: no taskbar button
            cp.ExStyle |= 0x00000008;  // WS_EX_TOPMOST
            return cp;
        }
    }
    protected override void WndProc(ref Message m) {
        if (m.Msg == 0x0021) { m.Result = (IntPtr)3; return; }  // WM_MOUSEACTIVATE -> MA_NOACTIVATE
        base.WndProc(ref m);
    }
}
'@

if (-not $Demo) {
    $mutex = New-Object System.Threading.Mutex($false, "Local\$AppName")
    if (-not $mutex.WaitOne(0, $false)) { Write-Host "$AppName is already running."; exit 0 }
}
if (-not (Test-Path $StateDir)) { New-Item -ItemType Directory -Path $StateDir -Force | Out-Null }

$script:State   = Load-State $StateDir
$script:Pending = New-Object System.Collections.ArrayList
$script:Active  = $null
$script:Items   = @()
$script:DemoMode = [bool]$Demo
$script:DemoOut = Join-Path $StateDir 'demo'

function Open-Digest {
    try {
        $p = Join-Path $StateDir 'waiting-on-jorge.html'
        [System.IO.File]::WriteAllText($p, (Build-DigestHtml $script:Items ((Get-Date).ToUniversalTime())), $Utf8)
        Start-Process $p
    } catch { Write-Log $StateDir 'digest-open-failed' '' $_.Exception.Message }
}

function Record-Decision($Item, [string]$Decision, [string]$SnoozeChoice) {
    $nowL = Get-Date
    $until = ''
    $id = [string]$Item.id
    if ($Decision -eq 'LATER') {
        $until = Get-SnoozeUntil $SnoozeChoice $nowL
        $script:State.snooze[$id] = $until
    } else {
        if ($script:State.snooze.ContainsKey($id)) { $script:State.snooze.Remove($id) }
    }
    if ($script:State.ids -notcontains $id) { $script:State.ids = @($script:State.ids) + $id }
    $file = New-DecisionFile $Item $Decision $until $nowL
    if ($script:DemoMode) {
        if (-not (Test-Path $script:DemoOut)) { New-Item -ItemType Directory -Path $script:DemoOut -Force | Out-Null }
        [System.IO.File]::WriteAllText((Join-Path $script:DemoOut $file.name), $file.body, $Utf8)
        $sent = $false
    } else {
        $sent = Send-Decision $file $InboxDir $StateDir
        Save-State $StateDir $script:State
    }
    Write-Log $StateDir ('decision-' + $Decision) $id ('sent=' + $sent + ' file=' + $file.name + ' until=' + $until)
}

function Show-Next {
    if ($script:Active -or $script:Pending.Count -eq 0) { return }
    $entry = $script:Pending[0]; $script:Pending.RemoveAt(0)
    $item = $entry.item; $summary = $entry.summary
    $kind = if ($summary) { 'DECIDE' } else { Get-Kind $item }
    $left = $script:Pending.Count

    $form = New-Object VtesAlertForm
    $form.FormBorderStyle = 'None'
    $form.StartPosition = 'Manual'
    $form.TopMost = $true
    $form.ShowInTaskbar = $false
    $form.BackColor = [System.Drawing.Color]::DarkOrange
    $form.Padding = New-Object System.Windows.Forms.Padding(14)
    $screen = [System.Windows.Forms.Screen]::FromPoint([System.Windows.Forms.Cursor]::Position)
    $wa = $screen.WorkingArea
    $w = [Math]::Min(820, $wa.Width - 40)
    $form.Size = New-Object System.Drawing.Size($w, 250)
    $form.Location = New-Object System.Drawing.Point(($wa.Left + [int](($wa.Width - $w) / 2)), ($wa.Top + 8))

    $title = New-Object System.Windows.Forms.Label
    $title.AutoSize = $false; $title.Dock = 'Top'; $title.Height = 34
    $title.Font = New-Object System.Drawing.Font('Segoe UI', 15, [System.Drawing.FontStyle]::Bold)
    $title.ForeColor = [System.Drawing.Color]::White; $title.BackColor = [System.Drawing.Color]::Transparent
    $body = New-Object System.Windows.Forms.Label
    $body.AutoSize = $false; $body.Dock = 'Top'; $body.Height = 100
    $body.Font = New-Object System.Drawing.Font('Segoe UI', 12)
    $body.ForeColor = [System.Drawing.Color]::White; $body.BackColor = [System.Drawing.Color]::Transparent

    if ($summary) {
        $title.Text = ('{0} NEW APPROVALS ARE WAITING' -f $summary.count)
        $body.Text = 'Too many at once to pop up one by one. SHOW ALL lists them with what each one needs. Nothing is lost: all are in the approvals report.'
    } else {
        $more = ''
        if ($left -gt 0) { $more = ('   (+{0} more after this)' -f $left) }
        $title.Text = ('APPROVAL NEEDED  {0}  [{1}]{2}' -f $item.id, ([string]$item.class), $more)
        $txt = Clip ([string]$item.action) 260
        if ($item.consequence) { $txt += "`r`nIf you wait: " + (Clip ([string]$item.consequence) 150) }
        if ($item.deadline) { $txt += "`r`nDEADLINE: " + (Clip ([string]$item.deadline) 60) }
        $body.Text = $txt
    }
    $form.Controls.Add($body); $form.Controls.Add($title)

    $btns = New-Object System.Collections.ArrayList
    $mk = {
        param([string]$text, [int]$x, [int]$y, [int]$bw, $bg)
        $b = New-Object System.Windows.Forms.Button
        $b.Text = $text; $b.Location = New-Object System.Drawing.Point($x, $y); $b.Size = New-Object System.Drawing.Size($bw, 40)
        $b.Font = New-Object System.Drawing.Font('Segoe UI', 11, [System.Drawing.FontStyle]::Bold)
        $b.FlatStyle = 'Flat'; $b.BackColor = $bg; $b.ForeColor = [System.Drawing.Color]::White
        $b.TabStop = $false; $b.Enabled = $false
        $form.Controls.Add($b); [void]$btns.Add($b); return $b
    }
    $dark = [System.Drawing.Color]::FromArgb(60, 60, 60)
    $green = [System.Drawing.Color]::FromArgb(30, 120, 60)
    $red = [System.Drawing.Color]::FromArgb(150, 35, 35)
    $y1 = 146; $y2 = 194
    $close = {
        param($it, [string]$dec, [string]$snz)
        if ($script:Active) { $script:Active.flash.Stop(); $script:Active.form.Close(); $script:Active = $null }
        if ($it) { Record-Decision $it $dec $snz }
        Show-Next
    }

    if ($summary) {
        $bAll = & $mk 'SHOW ALL' 14 $y1 200 $dark
        $bAll.add_Click({ Open-Digest; & $close $null '' '' }.GetNewClosure())
        $bOk = & $mk 'LATER (2 hours)' 226 $y1 200 $dark
        $bOk.add_Click({ & $close $null '' '' }.GetNewClosure())
    } else {
        $it = $item
        switch ($kind) {
            'NOAPPROVE' {
                $bOpen = & $mk 'OPEN DETAILS' 14 $y1 200 $dark
                $bOpen.add_Click({ Open-Digest }.GetNewClosure())
            }
            'DOMYSELF' {
                $bDo = & $mk "OK, I'M DOING IT" 14 $y1 230 $green
                $bDo.add_Click({ & $close $it 'DOING' '' }.GetNewClosure())
            }
            default {
                $bYes = & $mk 'YES / GO' 14 $y1 150 $green
                $bNo = & $mk 'NO' 174 $y1 100 $red
                $bNo.add_Click({ & $close $it 'NO' '' }.GetNewClosure())
                if ($kind -eq 'CONFIRM2') {
                    $armed = @{ v = $false }
                    $yesBtn = $bYes
                    $bYes.add_Click({
                        if (-not $armed.v) {
                            $armed.v = $true; $yesBtn.Text = 'CLICK AGAIN TO CONFIRM'; $yesBtn.Width = 260
                            $t = New-Object System.Windows.Forms.Timer; $t.Interval = 6000
                            $t.add_Tick({ $t.Stop(); $armed.v = $false; $yesBtn.Text = 'YES / GO'; $yesBtn.Width = 150 }.GetNewClosure()); $t.Start()
                        } else { & $close $it 'GO' '' }
                    }.GetNewClosure())
                } else {
                    $bYes.add_Click({ & $close $it 'GO' '' }.GetNewClosure())
                }
            }
        }
        $bx = 14
        foreach ($opt in @(@('LATER 2 HOURS', '2h'), @('TONIGHT 7 PM', 'tonight'), @('TOMORROW 8 AM', 'tomorrow'))) {
            $bl = & $mk $opt[0] $bx $y2 170 $dark
            $code = $opt[1]
            $bl.add_Click({ & $close $it 'LATER' $code }.GetNewClosure())
            $bx += 178
        }
        $bAll = & $mk 'SHOW ALL' $bx $y2 130 $dark
        $bAll.add_Click({ Open-Digest }.GetNewClosure())
    }

    $flash = New-Object System.Windows.Forms.Timer
    $flash.Interval = 500
    $tick = @{ n = 0 }
    $flash.add_Tick({
        $tick.n++
        if ($tick.n -ge ($FlashSeconds * 2)) { $form.BackColor = [System.Drawing.Color]::DarkOrange; $flash.Stop(); return }
        if ($tick.n % 2 -eq 0) { $form.BackColor = [System.Drawing.Color]::DarkOrange } else { $form.BackColor = [System.Drawing.Color]::Firebrick }
    }.GetNewClosure())

    $arm = New-Object System.Windows.Forms.Timer
    $arm.Interval = $ArmMs
    $arm.add_Tick({ $arm.Stop(); foreach ($b in $btns) { $b.Enabled = $true } }.GetNewClosure())

    $script:Active = @{ form = $form; flash = $flash }
    $form.Show()
    # RI-022: prove the banner is fully inside a real screen, else pull it onto the primary one.
    $ok = $false
    foreach ($s in [System.Windows.Forms.Screen]::AllScreens) { if ($s.WorkingArea.Contains($form.Bounds)) { $ok = $true } }
    if (-not $ok) {
        $pw = [System.Windows.Forms.Screen]::PrimaryScreen.WorkingArea
        $form.Location = New-Object System.Drawing.Point(($pw.Left + 20), ($pw.Top + 8))
        Write-Log $StateDir 'banner-repositioned' ([string]$item.id) 'was off-screen'
    }
    Write-Log $StateDir 'banner-shown' ([string]$item.id) ('screen=' + $screen.DeviceName + ' x=' + $form.Left + ' y=' + $form.Top + ' kind=' + $kind)
    try { [System.Media.SystemSounds]::Exclamation.Play() } catch { }
    $flash.Start(); $arm.Start()
}

function Enqueue-New($New) {
    if ($New.Count -gt $MaxIndividual) {
        [void]$script:Pending.Add(@{ item = $null; summary = @{ count = $New.Count } })
        foreach ($i in $New) { if ($script:State.ids -notcontains [string]$i.id) { $script:State.ids = @($script:State.ids) + [string]$i.id } }
        Save-State $StateDir $script:State
        Write-Log $StateDir 'summary-queued' '' ('count=' + $New.Count)
    } else {
        foreach ($i in $New) { [void]$script:Pending.Add(@{ item = $i; summary = $null }) }
    }
}

function Poll {
    try {
        Flush-Pending $InboxDir $StateDir
        $r = Get-AllItems $QueuePath $QueueFallback $AlertDir
        $script:Items = $r.items
        $nowU = (Get-Date).ToUniversalTime()
        if (-not $script:State.baselined) {
            foreach ($i in $r.items) { if ([string]$i.state -eq 'OPEN' -and $script:State.ids -notcontains [string]$i.id) { $script:State.ids = @($script:State.ids) + [string]$i.id } }
            $script:State.baselined = $true
            Save-State $StateDir $script:State
            $n = @($r.items | Where-Object { [string]$_.state -eq 'OPEN' }).Count
            Write-Log $StateDir 'baseline' '' ('open=' + $n)
            return
        }
        $new = Get-Alertable $r.items $script:State $nowU
        $queued = @($script:Pending | ForEach-Object { [string]$_.item.id })
        $new = @($new | Where-Object { $queued -notcontains [string]$_.id })
        if ($new.Count -gt 0) { Enqueue-New $new }
        # the report itself must stay fresh (RI-015)
        $today = (Get-Date).ToString('yyyy-MM-dd')
        if ($r.age -and $r.age.TotalHours -gt $StaleHours -and $script:State.stale_date -ne $today) {
            $script:State.stale_date = $today; Save-State $StateDir $script:State
            $days = [int]$r.age.TotalDays
            $fake = New-Object PSObject -Property @{ id = 'REPORT-STALE'; class = 'DECIDE'; action = ('The approvals report has not been refreshed in ' + $days + ' days, so new requests may not be reaching this alert. Tell the desktop to refresh it?'); consequence = 'Approvals can sit unseen.'; deadline = ''; state = 'OPEN' }
            [void]$script:Pending.Add(@{ item = $fake; summary = $null })
        }
        Show-Next
    } catch { Write-Log $StateDir 'poll-error' '' $_.Exception.Message }
}

Write-Log $StateDir 'start' '' ('pid=' + $PID + ' demo=' + $script:DemoMode)

if ($Demo) {
    $d1 = New-Object PSObject -Property @{ id = 'DEMO-1'; class = 'DECIDE'; action = 'DEMO: May I write the Association email for you to review and send?'; consequence = 'The notary deadline gets closer.'; deadline = 'Tue 2026-10-06'; state = 'OPEN' }
    $d2 = New-Object PSObject -Property @{ id = 'DEMO-2'; class = 'CLICK'; action = 'DEMO: OneDrive is using a lot of CPU. A tray-icon click pauses it.'; consequence = 'Only slows the PC.'; deadline = ''; state = 'OPEN' }
    $d3 = New-Object PSObject -Property @{ id = 'DEMO-3'; class = 'CRED'; action = 'DEMO: A login needs your password. Type it yourself; this alert never handles passwords.'; consequence = 'The job waits.'; deadline = ''; state = 'OPEN' }
    foreach ($d in @($d1, $d2, $d3)) { [void]$script:Pending.Add(@{ item = $d; summary = $null }) }
    $script:Items = @($d1, $d2, $d3)
    Show-Next
    $end = New-Object System.Windows.Forms.Timer; $end.Interval = 500
    $end.add_Tick({ if (-not $script:Active -and $script:Pending.Count -eq 0) { $end.Stop(); [System.Windows.Forms.Application]::Exit() } })
    $end.Start()
    [System.Windows.Forms.Application]::Run()
    exit 0
}

$pollTimer = New-Object System.Windows.Forms.Timer
$pollTimer.Interval = $PollSeconds * 1000
$pollTimer.add_Tick({ Poll })
$pollTimer.Start()

$hb = New-Object System.Windows.Forms.Timer
$hb.Interval = 300000
$hb.add_Tick({ Add-Content -Path (Join-Path $StateDir 'heartbeat.log') -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + '  ALIVE') })
$hb.Start()
Add-Content -Path (Join-Path $StateDir 'heartbeat.log') -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + '  START pid=' + $PID)

Poll
try { [System.Windows.Forms.Application]::Run() }
finally { Write-Log $StateDir 'stop' '' ''; if ($mutex) { $mutex.ReleaseMutex() } }
