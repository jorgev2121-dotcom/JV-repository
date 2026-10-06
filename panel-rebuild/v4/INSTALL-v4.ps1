# INSTALL-v4.ps1 - installs VTES panel v4 BESIDE the live v3. TRK-2026-9910-B. No admin rights. Pure ASCII (RI-032). Fix round 2.
# v3 is never touched: v4 goes in as VTES-LLM-LAUNCHER_v4.html next to it. Run by the desktop executor, not by Jorge.
# Usage (from the folder that holds this file):
#   powershell -NoProfile -ExecutionPolicy Bypass -File INSTALL-v4.ps1 -LiveDir "C:\path\to\the\live\panel\folder" [-DryRun]
# -LiveDir is REQUIRED. This script never picks a folder by itself. It refuses a folder that is inside a git checkout.
# What it does, in this order:
#  1. checks the folder (exists, not inside git, holds a v3 launcher by one of the known names).
#  2. writes the install record FIRST (_Rollback\v4-install-record.txt): the SHA256 of every v3 launcher file, and for every file this
#     script or Verify-VtesPanel.ps1 can touch, whether it existed before and its SHA256. Existing files are backed up once as NAME.pre-v4.
#  3. copies the v4 files in as NEW files, updating the record after each step, so a half-failed install can still be rolled back.
#  4. never overwrites a data file that already holds a real report.
#  5. adds the four v4 code files to MANIFEST.sha256, then runs Verify-VtesPanel.ps1 (which rewrites vtes-verify.js; that file is tracked too).
#  6. checks v3 launcher SHA256 again. Any change = loud alarm.
param([string]$LiveDir = '', [switch]$DryRun)
$ErrorActionPreference = 'Stop'
$Here = Split-Path -Parent $MyInvocation.MyCommand.Path
$Now  = Get-Date -Format 'yyyy-MM-dd_HHmm'
$UP   = $env:USERPROFILE; if (-not $UP) { $UP = $HOME }
$SEP  = [IO.Path]::DirectorySeparatorChar
function Abs([string]$rel) { return (Join-Path $LiveDir ($rel -replace '[\\/]', [string]$SEP)) }
function Sha([string]$p) { try { return (Get-FileHash -LiteralPath $p -Algorithm SHA256).Hash.ToLower() } catch { return 'unreadable' } }

if ($LiveDir -eq '') {
    Write-Host 'STOP: INSTALL requires -LiveDir "the folder the Desktop shortcut for the launcher really opens". It never picks a folder by itself. Nothing was changed.'
    exit 2
}
if (-not (Test-Path -LiteralPath $LiveDir -PathType Container)) { Write-Host ('STOP: folder not found: ' + $LiveDir + '. Nothing was changed.'); exit 2 }
$LiveDir = (Resolve-Path -LiteralPath $LiveDir).Path
# refuse a git checkout (the folder or any parent holds .git): MANIFEST.sha256 is tracked there and v4 must not edit tracked files
$walk = $LiveDir
while ($walk) {
    if (Test-Path -LiteralPath (Join-Path $walk '.git')) { Write-Host ('STOP: ' + $LiveDir + ' is inside a git checkout (found .git in ' + $walk + '). v4 will not install into a git working copy. Nothing was changed.'); exit 2 }
    $par = Split-Path -Parent $walk
    if ((-not $par) -or ($par -eq $walk)) { break }
    $walk = $par
}
# the real v3 launcher names: the first two are the repo names, VTES-CONTROL-PANEL.html is the name the retired Drive page points at
$v3Present = @(Get-ChildItem -LiteralPath $LiveDir -File | Where-Object { ($_.Name -like 'VTES-LLM-LAUNCHER*.html' -or $_.Name -like 'VTES-CONTROL-PANEL*.html') -and $_.Name -notlike '*_v4*' -and $_.Name -notlike '*.bak*' -and $_.Name -notlike '*.pre-v4' } | ForEach-Object { $_.Name })
if ($v3Present.Count -eq 0) { Write-Host 'STOP: no v3 launcher in that folder (looked for VTES-LLM-LAUNCHER*.html and VTES-CONTROL-PANEL*.html). Nothing was changed.'; exit 2 }

# package files: source (here) -> target (live), kind
$map = @(
    @('VTES-LLM-LAUNCHER_v4.html',      'VTES-LLM-LAUNCHER_v4.html',      'code'),
    @('vtes4-live.js',                  'vtes4-live.js',                  'code'),
    @('vtes4-cards.js',                 'vtes4-cards.js',                 'code'),
    @('vtes4-panels.js',                'vtes4-panels.js',                'code'),
    @('vtes-status.js',                 'vtes-status.js',                 'placeholder'),
    @('data\vtes4-heartbeat.js',        'data\vtes4-heartbeat.js',        'data'),
    @('data\vtes4-state.js',            'data\vtes4-state.js',            'data'),
    @('data\vtes4-health.js',           'data\vtes4-health.js',           'data'),
    @('data\vtes4-tokens.js',           'data\vtes4-tokens.js',           'data'),
    @('data\vtes4-housekeeping.js',     'data\vtes4-housekeeping.js',     'data'),
    @('data\vtes4-miamidade.js',        'data\vtes4-miamidade.js',        'data')
)
foreach ($m in $map) { if (-not (Test-Path -LiteralPath (Join-Path $Here ($m[0] -replace '[\\/]', [string]$SEP)))) { Write-Host ('STOP: package file missing: ' + $m[0] + '. Nothing was changed.'); exit 3 } }
if (-not (Test-Path -LiteralPath (Join-Path $Here 'ROLLBACK-v4.ps1'))) { Write-Host 'STOP: ROLLBACK-v4.ps1 is missing from the package. Nothing was changed.'; exit 3 }
$codeNames = @('VTES-LLM-LAUNCHER_v4.html', 'vtes4-live.js', 'vtes4-cards.js', 'vtes4-panels.js')
# every file this script or Verify-VtesPanel.ps1 can touch (Write-VtesStatus.ps1 is covered by EDIT-VtesStatus-v4.ps1, which adds itself to the record)
$tracked = @(); foreach ($m in $map) { $tracked += $m[1] }; $tracked += 'MANIFEST.sha256'; $tracked += 'vtes-verify.js'

$rbDir  = Join-Path $LiveDir '_Rollback'
$record = Join-Path $rbDir 'v4-install-record.txt'
$R = New-Object System.Collections.Generic.List[string]
if (Test-Path -LiteralPath $record) { foreach ($l in @(Get-Content -LiteralPath $record)) { if ($l -ne '') { $R.Add($l) } } }
function Rec-Get([string]$kind, [string]$key) { foreach ($l in $R) { if ($l.StartsWith($kind + '|' + $key + '|')) { return $l } }; return $null }
function Rec-Set([string]$kind, [string]$key, [string]$rest) {
    $line = $kind + '|' + $key + '|' + $rest
    for ($i = 0; $i -lt $R.Count; $i++) { if ($R[$i].StartsWith($kind + '|' + $key + '|')) { $R[$i] = $line; return } }
    $R.Add($line)
}
function Rec-Save {
    if (-not (Test-Path -LiteralPath $rbDir)) { New-Item -ItemType Directory -Path $rbDir -Force | Out-Null }
    $tmp = $record + '.tmp'
    [IO.File]::WriteAllText($tmp, (($R.ToArray() -join "`n") + "`n"), (New-Object Text.ASCIIEncoding))
    Move-Item -LiteralPath $tmp -Destination $record -Force
}

if ($DryRun) {
    Write-Host ('DRY RUN. Live folder: ' + $LiveDir + '. v3 launcher file(s): ' + ($v3Present -join ', '))
    foreach ($m in $map) { Write-Host ('  would copy ' + $m[1] + $(if (Test-Path -LiteralPath (Abs $m[1])) { '  (exists; kept if it holds a real report, else backed up as .pre-v4 first)' } else { '  (new file)' })) }
    Write-Host '  would add 4 lines to MANIFEST.sha256 (backup first), run Verify-VtesPanel.ps1 (rewrites vtes-verify.js, backup first).'
    Write-Host 'DRY RUN: nothing was changed.'; exit 0
}

# preflight: every tracked file that exists must be readable BEFORE anything is written (a file that cannot be read cannot be backed up)
foreach ($rel in $tracked) {
    $p = Abs $rel
    if (Test-Path -LiteralPath $p -PathType Leaf) { try { $fs = [IO.File]::OpenRead($p); $fs.Close() } catch { Write-Host ('STOP: ' + $rel + ' exists but cannot be read, so it cannot be backed up. Nothing was changed. Reason: ' + $_.Exception.Message); exit 2 } }
}
try {
    # ---- 1. the record FIRST: v3 fingerprints, then pre-state and a backup of every tracked file, all before any copy
    if ($null -eq (Rec-Get 'VERSION' '2')) { $R.Add('VERSION|2|record format 2') }
    Rec-Set 'LIVEDIR' 'x' $LiveDir
    Rec-Set 'STARTED' 'x' $Now
    foreach ($n in $v3Present) { if ($null -eq (Rec-Get 'V3HASH' $n)) { Rec-Set 'V3HASH' $n (Sha (Abs $n)) } }
    $fresh = @()
    foreach ($rel in $tracked) {
        if ($null -ne (Rec-Get 'PRE' $rel)) { continue }
        $fresh += $rel
        $p = Abs $rel
        if (Test-Path -LiteralPath $p -PathType Leaf) { Rec-Set 'PRE' $rel (Sha $p) } else { Rec-Set 'PRE' $rel 'absent' }
    }
    Rec-Save
    foreach ($rel in $fresh) {
        $p = Abs $rel; $bak = $p + '.pre-v4'
        if ((Test-Path -LiteralPath $p -PathType Leaf) -and -not (Test-Path -LiteralPath $bak)) { Copy-Item -LiteralPath $p -Destination $bak }
    }
    Write-Host ('Record written first: ' + $record)
    Copy-Item -LiteralPath (Join-Path $Here 'ROLLBACK-v4.ps1') -Destination (Join-Path $rbDir 'ROLLBACK-v4.ps1') -Force
    $before = @{}; foreach ($n in $v3Present) { $before[$n] = (Rec-Get 'V3HASH' $n).Split('|')[2] }

    # ---- 2. copy the package, updating the record around every file
    foreach ($m in $map) {
        $rel = $m[1]; $src = Join-Path $Here ($m[0] -replace '[\\/]', [string]$SEP); $dst = Abs $rel; $kind = $m[2]
        $exists = Test-Path -LiteralPath $dst
        if ($exists -and ($kind -eq 'data' -or $kind -eq 'placeholder')) {
            $txt = Get-Content -LiteralPath $dst -Raw
            if ($txt -match '"at"\s*:\s*"' -or ($kind -eq 'placeholder' -and $txt -notmatch '^\s*window\.VTES_STATUS\s*=\s*window\.VTES_STATUS\s*\|\|\s*\{\}\s*;\s*$')) { Write-Host ('KEEP  (real content inside) ' + $rel); continue }
        }
        Write-Host ('COPY  ' + $rel + $(if ($exists) { '   (existing file; backup is in the record)' } else { '   (new file)' }))
        Rec-Set 'TOUCH' $rel 'x'; Rec-Save
        $dstDir = Split-Path -Parent $dst; if (-not (Test-Path -LiteralPath $dstDir)) { New-Item -ItemType Directory -Path $dstDir -Force | Out-Null }
        Copy-Item -LiteralPath $src -Destination $dst -Force
        Rec-Set 'AFTER' $rel (Sha $dst); Rec-Save
    }

    # ---- 3. MANIFEST.sha256: add the four v4 code files so the tamper check stays quiet (v3 lines are not touched)
    $mf = Abs 'MANIFEST.sha256'
    if (Test-Path -LiteralPath $mf) {
        Write-Host 'MANIFEST.sha256: adding the four v4 code files'
        Rec-Set 'TOUCH' 'MANIFEST.sha256' 'x'; Rec-Save
        $keep = @(Get-Content -LiteralPath $mf -Encoding UTF8 | Where-Object { $ln = $_; -not ($codeNames | Where-Object { $ln -match ('^[0-9a-f]{64}  ' + [regex]::Escape($_) + '$') }) })
        $out = @($keep); foreach ($n in $codeNames) { $out += ((Sha (Abs $n)) + '  ' + $n) }
        [IO.File]::WriteAllText($mf, (($out -join "`n") + "`n"), (New-Object Text.UTF8Encoding($false)))
        Rec-Set 'AFTER' 'MANIFEST.sha256' (Sha $mf); Rec-Save
    } else { Write-Host 'FLAG: MANIFEST.sha256 was not found in the live folder, so no tamper-check entry was added. The desktop executor should report this.' }

    # ---- 4. v3 must be byte-for-byte unchanged
    $alarm = $false
    foreach ($n in $v3Present) { if ((Sha (Abs $n)) -ne $before[$n]) { $alarm = $true; Write-Host ('ALARM: v3 file changed during install: ' + $n) } }
    if (-not $alarm) { Write-Host ('v3 untouched (SHA256 identical before and after): ' + ($v3Present -join ', ')) }

    # ---- 5. the existing tamper check (it rewrites vtes-verify.js, which is tracked and backed up above)
    $vp = Abs 'Verify-VtesPanel.ps1'
    if (Test-Path -LiteralPath $vp) {
        Rec-Set 'TOUCH' 'vtes-verify.js' 'x'; Rec-Save
        Write-Host 'Running Verify-VtesPanel.ps1:'
        try { & $vp -Dir $LiveDir } catch { Write-Host ('Verify raised: ' + $_.Exception.Message) }
        $vj = Abs 'vtes-verify.js'; if (Test-Path -LiteralPath $vj) { Rec-Set 'AFTER' 'vtes-verify.js' (Sha $vj) }
    } else { Write-Host 'FLAG: Verify-VtesPanel.ps1 is not in the live folder, so the tamper check was not run.' }

    # ---- 6. charter: a rollback script in Undo_Manifests (a one-line stub that runs the real one; the record lists it)
    $undo = Join-Path $UP 'OneDrive\Documents\Reports\Undo_Manifests'
    if (Test-Path -LiteralPath $undo) {
        $stubPath = Join-Path $undo ('Rollback_Panel-v4_' + $Now + '.ps1')
        $stub = @('# Rollback_Panel-v4_' + $Now + '.ps1 - runs the v4 rollback. ASCII only.', ('& "' + (Join-Path $rbDir 'ROLLBACK-v4.ps1') + '" -LiveDir "' + $LiveDir + '"'))
        Set-Content -LiteralPath $stubPath -Value $stub -Encoding ASCII
        Rec-Set 'STUB' $stubPath 'x'
    }
    Rec-Set 'DONE' 'x' $Now; Rec-Save
    if ($alarm) { exit 4 }
    Write-Host ('DONE. Open VTES-LLM-LAUNCHER_v4.html in ' + $LiveDir + '. v3 is untouched beside it. Rollback: ' + (Join-Path $rbDir 'ROLLBACK-v4.ps1') + ' -LiveDir "' + $LiveDir + '"')
    Write-Host 'Every light is red NO DATA until the writers in DATA-CONTRACT.md exist. That is the true state.'
} catch {
    Write-Host ('FAILED part-way: ' + $_.Exception.Message)
    Write-Host ('The install record was written BEFORE the first copy, so the rollback still works: run ' + (Join-Path $rbDir 'ROLLBACK-v4.ps1') + ' -LiveDir "' + $LiveDir + '"')
    exit 5
}
