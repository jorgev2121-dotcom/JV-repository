# ROLLBACK-v4.ps1 - undoes INSTALL-v4.ps1. TRK-2026-9910-B. No admin rights. Pure ASCII (RI-032).
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File ROLLBACK-v4.ps1 -LiveDir "C:\path\to\live\panel\folder"
# It runs the NEWEST Rollback_Panel-v4_*.ps1 that INSTALL-v4.ps1 wrote into <LiveDir>\_Rollback, which restores every
# file from its .bak-YYYYMMDD copy and removes files that v4 added. Nothing is deleted without a backup of the v3 original.
param([string]$LiveDir = '')
$ErrorActionPreference = 'Stop'
if ($LiveDir -eq '') { $LiveDir = Join-Path $env:USERPROFILE 'JV-repository\tools\vtes-panel' }
$rbDir = Join-Path $LiveDir '_Rollback'
if (-not (Test-Path $rbDir)) { Write-Host 'STOP: no _Rollback folder in that location. Was v4 installed there? Nothing was changed.'; exit 2 }
$latest = Get-ChildItem -Path $rbDir -Filter 'Rollback_Panel-v4_*.ps1' | Sort-Object Name | Select-Object -Last 1
if ($null -eq $latest) { Write-Host 'STOP: no rollback script found. Nothing was changed.'; exit 3 }
Write-Host ('Running ' + $latest.Name)
& $latest.FullName
