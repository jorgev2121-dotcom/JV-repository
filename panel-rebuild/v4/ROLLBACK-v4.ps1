# ROLLBACK-v4.ps1 - undoes INSTALL-v4.ps1 exactly, however many times it ran. TRK-2026-9910-B. No admin rights. Pure ASCII (RI-032).
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File ROLLBACK-v4.ps1 -LiveDir "C:\path\to\live\panel\folder"
# Reads <LiveDir>\_Rollback\v4-install-record.txt (merged across every install run). Removes the files v4 added, puts back any file it
# replaced from NAME.pre-v4, restores MANIFEST.sha256 from MANIFEST.sha256.pre-v4, and checks that v3 still has the SHA256 it had before v4.
# A data file that has meanwhile received a real report is KEPT (never deleted).
param([string]$LiveDir = '')
$ErrorActionPreference = 'Stop'
if ($LiveDir -eq '') { $LiveDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path) }
$rbDir = Join-Path $LiveDir '_Rollback'; $record = Join-Path $rbDir 'v4-install-record.txt'
if (-not (Test-Path -LiteralPath $record)) { Write-Host 'STOP: no install record in that folder. Was v4 installed there? Nothing was changed.'; exit 2 }
function Sha([string]$p) { (Get-FileHash -LiteralPath $p -Algorithm SHA256).Hash.ToLower() }
$lines = @(Get-Content -LiteralPath $record)
foreach ($l in $lines) {
    $p = $l.Split('|')
    if ($p[0] -eq 'REPLACED') {
        $dst = Join-Path $LiveDir $p[1]; $bak = $dst + '.pre-v4'
        if (Test-Path -LiteralPath $bak) { Copy-Item -LiteralPath $bak -Destination $dst -Force; Remove-Item -LiteralPath $bak -Force; Write-Host ('restored ' + $p[1]) } else { Write-Host ('WARNING: backup missing for ' + $p[1]) }
    }
}
foreach ($l in $lines) {
    $p = $l.Split('|')
    if ($p[0] -eq 'ADDED') {
        $dst = Join-Path $LiveDir $p[1]
        if (-not (Test-Path -LiteralPath $dst)) { continue }
        $txt = Get-Content -LiteralPath $dst -Raw
        if ($p[1] -like 'data\*' -and $txt -match '"at"\s*:\s*"') { Write-Host ('kept (holds a real report now) ' + $p[1]); continue }
        if ($p[1] -eq 'vtes-status.js' -and $txt -notmatch '^\s*window\.VTES_STATUS\s*=\s*window\.VTES_STATUS\s*\|\|\s*\{\}\s*;\s*$') { Write-Host 'kept (holds real heartbeats now) vtes-status.js'; continue }
        Remove-Item -LiteralPath $dst -Force; Write-Host ('removed ' + $p[1])
    }
}
foreach ($l in $lines) {
    if ($l -eq 'MANIFEST|1') {
        $mf = Join-Path $LiveDir 'MANIFEST.sha256'; $mbak = $mf + '.pre-v4'
        if (Test-Path -LiteralPath $mbak) { Copy-Item -LiteralPath $mbak -Destination $mf -Force; Remove-Item -LiteralPath $mbak -Force; Write-Host 'restored MANIFEST.sha256' } else { Write-Host 'WARNING: MANIFEST backup missing' }
    }
}
$dataDir = Join-Path $LiveDir 'data'
if ((Test-Path -LiteralPath $dataDir) -and @(Get-ChildItem -LiteralPath $dataDir -Force).Count -eq 0) { Remove-Item -LiteralPath $dataDir -Force }
$bad = $false
foreach ($l in $lines) {
    $p = $l.Split('|')
    if ($p[0] -eq 'V3HASH') {
        $f = Join-Path $LiveDir $p[1]
        if ((Test-Path -LiteralPath $f) -and (Sha $f) -eq $p[2]) { Write-Host ('v3 check OK (same SHA256 as before v4): ' + $p[1]) } else { $bad = $true; Write-Host ('v3 check FAILED: ' + $p[1]) }
    }
}
Remove-Item -LiteralPath $record -Force
Remove-Item -LiteralPath (Join-Path $rbDir 'ROLLBACK-v4.ps1') -Force -ErrorAction SilentlyContinue
if (@(Get-ChildItem -LiteralPath $rbDir -Force).Count -eq 0) { Remove-Item -LiteralPath $rbDir -Force }
if ($bad) { Write-Host 'ROLLED BACK, but a v3 check failed: tell the desktop executor.'; exit 4 }
Write-Host 'v4 rolled back. v3 is exactly as it was.'
