# INSTALL-v4.ps1 - installs VTES panel v4 BESIDE the live v3. TRK-2026-9910-B. No admin rights. Pure ASCII (RI-032).
# v3 is never touched: v4 goes in as VTES-LLM-LAUNCHER_v4.html next to it. Run by the desktop executor, not by Jorge.
# Usage (from the folder that holds this file):
#   powershell -NoProfile -ExecutionPolicy Bypass -File INSTALL-v4.ps1 [-LiveDir "C:\path\to\the\live\panel\folder"] [-DryRun]
# What it does:
#  1. finds the live folder (the one holding a v3 launcher). If it finds none or more than one it STOPS and lists them.
#  2. records the SHA256 of every v3 launcher file before, and checks them again after. Any change = loud alarm.
#  3. copies the v4 files in as NEW files. A file that already exists and is not ours is backed up once as NAME.pre-v4.
#  4. never overwrites a data file that already holds a real report.
#  5. adds the four v4 code files to MANIFEST.sha256 (the manifest is backed up once as MANIFEST.sha256.pre-v4),
#     so Verify-VtesPanel.ps1 does not raise the tamper alarm, then runs Verify-VtesPanel.ps1 if it is there.
#  6. writes _Rollback\v4-install-record.txt (merged across runs) and copies ROLLBACK-v4.ps1 next to it.
param([string]$LiveDir = '', [switch]$DryRun)
$ErrorActionPreference = 'Stop'
$Here = Split-Path -Parent $MyInvocation.MyCommand.Path
$Now  = Get-Date -Format 'yyyy-MM-dd_HHmm'
$UP   = $env:USERPROFILE; if (-not $UP) { $UP = $HOME }
$V3Names = @('VTES-LLM-LAUNCHER_v3.html', 'VTES-LLM-LAUNCHER.html')

function Find-Candidates {
    $c = @()
    foreach ($d in @('G:\My Drive\VTES-PANEL', (Join-Path $UP 'JV-repository\tools\vtes-panel'), (Join-Path $UP 'JV-repository'), (Join-Path $UP 'OneDrive\Documents\VTES-PANEL'), (Join-Path $UP 'Desktop'))) {
        foreach ($n in $V3Names) { if (Test-Path -LiteralPath (Join-Path $d $n)) { $c += $d; break } }
    }
    return $c
}
if ($LiveDir -eq '') {
    $cand = @(Find-Candidates)
    if ($cand.Count -eq 1) { $LiveDir = $cand[0]; Write-Host ('Live folder found: ' + $LiveDir) }
    else {
        Write-Host ('STOP: I need exactly one live folder and found ' + $cand.Count + '. Nothing was changed.')
        $cand | ForEach-Object { Write-Host ('  candidate: ' + $_) }
        Write-Host 'The desktop executor must pick the folder that the Desktop shortcut for the launcher really opens, then run again with -LiveDir "that folder".'
        exit 2
    }
}
if (-not (Test-Path -LiteralPath $LiveDir)) { Write-Host ('STOP: folder not found: ' + $LiveDir); exit 2 }
$v3Present = @($V3Names | Where-Object { Test-Path -LiteralPath (Join-Path $LiveDir $_) })
if ($v3Present.Count -eq 0) { Write-Host 'STOP: no v3 launcher (VTES-LLM-LAUNCHER_v3.html or VTES-LLM-LAUNCHER.html) in that folder. Nothing was changed.'; exit 2 }

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
foreach ($m in $map) { if (-not (Test-Path -LiteralPath (Join-Path $Here $m[0]))) { Write-Host ('STOP: package file missing: ' + $m[0]); exit 3 } }
foreach ($n in $v3Present) { if ($n -like '*_v4*') { Write-Host 'STOP: a v3 name looks like v4. Nothing was changed.'; exit 3 } }

function Sha([string]$p) { (Get-FileHash -LiteralPath $p -Algorithm SHA256).Hash.ToLower() }
function Get-V3Hashes { $h = [ordered]@{}; foreach ($n in $V3Names) { $p = Join-Path $LiveDir $n; if (Test-Path -LiteralPath $p) { $h[$n] = Sha $p } }; return $h }
$rbDir  = Join-Path $LiveDir '_Rollback'
$record = Join-Path $rbDir 'v4-install-record.txt'
$old = @(); if (Test-Path -LiteralPath $record) { $old = @(Get-Content -LiteralPath $record) }
$before = Get-V3Hashes
$newRec = New-Object System.Collections.Generic.List[string]
foreach ($l in $old) { $newRec.Add($l) }
function Has-Rec([string]$line) { return ($newRec -contains $line) }
function Add-Rec([string]$line) { if (-not (Has-Rec $line)) { $newRec.Add($line) } }
# first install records the v3 fingerprints; later runs keep the first ones
foreach ($k in $before.Keys) { if (-not ($newRec | Where-Object { $_ -like ('V3HASH|' + $k + '|*') })) { Add-Rec ('V3HASH|' + $k + '|' + $before[$k]) } }

foreach ($m in $map) {
    $src = Join-Path $Here $m[0]; $rel = $m[1]; $dst = Join-Path $LiveDir $rel; $kind = $m[2]
    $exists = Test-Path -LiteralPath $dst
    $ours = (Has-Rec ('ADDED|' + $rel)) -or (Has-Rec ('REPLACED|' + $rel))
    if ($exists -and ($kind -eq 'data' -or $kind -eq 'placeholder')) {
        $txt = Get-Content -LiteralPath $dst -Raw
        if ($txt -match '"at"\s*:\s*"' -or ($kind -eq 'placeholder' -and $txt -notmatch '^\s*window\.VTES_STATUS\s*=\s*window\.VTES_STATUS\s*\|\|\s*\{\}\s*;\s*$')) { Write-Host ('KEEP  (real content inside) ' + $rel); continue }
    }
    if ($exists -and -not $ours -and $kind -eq 'code') {
        $bak = $dst + '.pre-v4'
        Write-Host ('COPY  ' + $rel + '   (existing file backed up once as ' + (Split-Path -Leaf $bak) + ')')
        if (-not $DryRun) { if (-not (Test-Path -LiteralPath $bak)) { Copy-Item -LiteralPath $dst -Destination $bak }; Copy-Item -LiteralPath $src -Destination $dst -Force; Add-Rec ('REPLACED|' + $rel) }
    } else {
        Write-Host ('COPY  ' + $rel + $(if ($exists) { '   (our own earlier copy, overwritten)' } else { '   (new file)' }))
        if (-not $DryRun) {
            $dstDir = Split-Path -Parent $dst; if (-not (Test-Path -LiteralPath $dstDir)) { New-Item -ItemType Directory -Path $dstDir -Force | Out-Null }
            Copy-Item -LiteralPath $src -Destination $dst -Force
            if (-not (Has-Rec ('REPLACED|' + $rel))) { Add-Rec ('ADDED|' + $rel) }
        }
    }
}

# MANIFEST.sha256: add the four v4 code files so the tamper check stays quiet (v3 lines are not touched)
$mf = Join-Path $LiveDir 'MANIFEST.sha256'; $codeNames = @('VTES-LLM-LAUNCHER_v4.html', 'vtes4-live.js', 'vtes4-cards.js', 'vtes4-panels.js')
if (Test-Path -LiteralPath $mf) {
    Write-Host 'MANIFEST.sha256: adding the four v4 code files (backup once as MANIFEST.sha256.pre-v4)'
    if (-not $DryRun) {
        $mbak = $mf + '.pre-v4'; if (-not (Test-Path -LiteralPath $mbak)) { Copy-Item -LiteralPath $mf -Destination $mbak }
        $keep = @(Get-Content -LiteralPath $mf -Encoding UTF8 | Where-Object { $ln = $_; -not ($codeNames | Where-Object { $ln -match ('^[0-9a-f]{64}  ' + [regex]::Escape($_) + '$') }) })
        $out = @($keep); foreach ($n in $codeNames) { $out += ((Sha (Join-Path $LiveDir $n)) + '  ' + $n) }
        [IO.File]::WriteAllText($mf, (($out -join "`n") + "`n"), (New-Object Text.UTF8Encoding($false)))
        Add-Rec 'MANIFEST|1'
    }
} else { Write-Host 'FLAG: MANIFEST.sha256 was not found in the live folder, so no tamper-check entry was added. The desktop executor should report this.' }

if ($DryRun) { Write-Host 'DRY RUN: nothing was changed.'; exit 0 }
# v3 must be byte-for-byte unchanged
$after = Get-V3Hashes; $alarm = $false
foreach ($k in $before.Keys) { if ($after[$k] -ne $before[$k]) { $alarm = $true; Write-Host ('ALARM: v3 file changed during install: ' + $k) } }
if (-not $alarm) { Write-Host ('v3 untouched (SHA256 identical before and after): ' + (($before.Keys) -join ', ')) }
if (-not (Test-Path -LiteralPath $rbDir)) { New-Item -ItemType Directory -Path $rbDir -Force | Out-Null }
Set-Content -LiteralPath $record -Value $newRec.ToArray() -Encoding ASCII
Copy-Item -LiteralPath (Join-Path $Here 'ROLLBACK-v4.ps1') -Destination (Join-Path $rbDir 'ROLLBACK-v4.ps1') -Force
# charter: a rollback script in Undo_Manifests (a one-line stub that runs the real one; safe to overwrite)
$undo = Join-Path $UP 'OneDrive\Documents\Reports\Undo_Manifests'
if (Test-Path -LiteralPath $undo) {
    $stub = @('# Rollback_Panel-v4_' + $Now + '.ps1 - runs the v4 rollback. ASCII only.', ('& "' + (Join-Path $rbDir 'ROLLBACK-v4.ps1') + '" -LiveDir "' + $LiveDir + '"'))
    Set-Content -LiteralPath (Join-Path $undo ('Rollback_Panel-v4_' + $Now + '.ps1')) -Value $stub -Encoding ASCII
}
# run the existing tamper check, if the live folder has it
$vp = Join-Path $LiveDir 'Verify-VtesPanel.ps1'
if (Test-Path -LiteralPath $vp) { Write-Host 'Running Verify-VtesPanel.ps1:'; try { & $vp -Dir $LiveDir } catch { Write-Host ('Verify raised: ' + $_.Exception.Message) } }
if ($alarm) { exit 4 }
Write-Host ('DONE. Open VTES-LLM-LAUNCHER_v4.html in ' + $LiveDir + '. v3 is untouched beside it. Rollback: ' + (Join-Path $rbDir 'ROLLBACK-v4.ps1'))
Write-Host 'Every light is red NO DATA until the writers in DATA-CONTRACT.md exist. That is the true state.'
