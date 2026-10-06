# INSTALL-v4.ps1 - installs VTES panel v4. TRK-2026-9910-B. No admin rights. Pure ASCII (RI-032).
# Usage (run from the folder that holds this file):
#   powershell -NoProfile -ExecutionPolicy Bypass -File INSTALL-v4.ps1 -LiveDir "C:\path\to\the\live\panel\folder"
#   add -DryRun to see what would happen without changing anything.
# What it does: (1) backs up every live file it will replace as NAME.bak-YYYYMMDD, (2) copies the v4 files in,
# (3) never overwrites a data file that already holds a real report, (4) writes a dated rollback script.
param([string]$LiveDir = '', [switch]$DryRun)
$ErrorActionPreference = 'Stop'
$Here  = Split-Path -Parent $MyInvocation.MyCommand.Path
$Stamp = Get-Date -Format 'yyyyMMdd'
$Now   = Get-Date -Format 'yyyy-MM-dd_HHmm'
if ($LiveDir -eq '') {
    $guess = Join-Path $env:USERPROFILE 'JV-repository\tools\vtes-panel'
    if (Test-Path (Join-Path $guess 'VTES-LLM-LAUNCHER.html')) { $LiveDir = $guess }
}
if ($LiveDir -eq '' -or -not (Test-Path (Join-Path $LiveDir 'VTES-LLM-LAUNCHER.html'))) {
    Write-Host 'STOP: I could not find the live panel folder (the one holding VTES-LLM-LAUNCHER.html). Nothing was changed.'
    Write-Host 'Run again with:  -LiveDir "full path of that folder"'
    exit 2
}
# files: source (here) -> target (live)
$map = @(
    @('VTES-LLM-LAUNCHER_v4.html', 'VTES-LLM-LAUNCHER.html', 'code'),
    @('vtes4-live.js',   'vtes4-live.js',   'code'),
    @('vtes4-cards.js',  'vtes4-cards.js',  'code'),
    @('vtes4-panels.js', 'vtes4-panels.js', 'code'),
    @('data\vtes4-heartbeat.js',    'data\vtes4-heartbeat.js',    'data'),
    @('data\vtes4-state.js',        'data\vtes4-state.js',        'data'),
    @('data\vtes4-health.js',       'data\vtes4-health.js',       'data'),
    @('data\vtes4-tokens.js',       'data\vtes4-tokens.js',       'data'),
    @('data\vtes4-housekeeping.js', 'data\vtes4-housekeeping.js', 'data'),
    @('data\vtes4-miamidade.js',    'data\vtes4-miamidade.js',    'data')
)
foreach ($m in $map) { if (-not (Test-Path (Join-Path $Here $m[0]))) { Write-Host ('STOP: package file missing: ' + $m[0]); exit 3 } }
$done = @()
foreach ($m in $map) {
    $src = Join-Path $Here $m[0]; $dst = Join-Path $LiveDir $m[1]
    $dstDir = Split-Path -Parent $dst
    $exists = Test-Path $dst
    if ($exists -and $m[2] -eq 'data') {
        $txt = Get-Content -Raw -Path $dst
        if ($txt -match '"at"\s*:\s*"') { Write-Host ('KEEP  (real report inside) ' + $m[1]); continue }
    }
    $bak = ''
    if ($exists) {
        $bak = $dst + '.bak-' + $Stamp
        if (Test-Path $bak) { $bak = $dst + '.bak-' + $Stamp + '-' + (Get-Date -Format 'HHmm') }
    }
    Write-Host ('COPY  ' + $m[1] + $(if ($bak -ne '') { '   (backup: ' + (Split-Path -Leaf $bak) + ')' } else { '   (new file)' }))
    if (-not $DryRun) {
        if (-not (Test-Path $dstDir)) { New-Item -ItemType Directory -Path $dstDir -Force | Out-Null }
        if ($bak -ne '') { Copy-Item -Path $dst -Destination $bak -Force }
        Copy-Item -Path $src -Destination $dst -Force
    }
    $done += ,@($dst, $bak)
}
if ($DryRun) { Write-Host 'DRY RUN: nothing was changed.'; exit 0 }
# rollback script (dated, standalone). Restores each backup; removes files that were new.
$lines = @('# Rollback_Panel-v4_' + $Now + '.ps1 - written by INSTALL-v4.ps1. Undoes the v4 install. ASCII only.', '$ErrorActionPreference = ''Continue''')
foreach ($d in $done) {
    if ($d[1] -ne '') { $lines += ('Copy-Item -Path "' + $d[1] + '" -Destination "' + $d[0] + '" -Force; Write-Host "restored ' + (Split-Path -Leaf $d[0]) + '"') }
    else { $lines += ('Remove-Item -Path "' + $d[0] + '" -Force -ErrorAction SilentlyContinue; Write-Host "removed new file ' + (Split-Path -Leaf $d[0]) + '"') }
}
$lines += 'Write-Host "v4 rolled back. The v3 launcher is back."'
$rbName = 'Rollback_Panel-v4_' + $Now + '.ps1'
$rbDir = Join-Path $LiveDir '_Rollback'
New-Item -ItemType Directory -Path $rbDir -Force | Out-Null
Set-Content -Path (Join-Path $rbDir $rbName) -Value $lines -Encoding ASCII
$undo = Join-Path $env:USERPROFILE 'OneDrive\Documents\Reports\Undo_Manifests'
if (Test-Path $undo) { Set-Content -Path (Join-Path $undo $rbName) -Value $lines -Encoding ASCII }
Write-Host ('DONE. Rollback script: ' + (Join-Path $rbDir $rbName))
Write-Host 'Next: open VTES-LLM-LAUNCHER.html. Every light should be red NO DATA until the six data writers exist (see DATA-CONTRACT.md).'
