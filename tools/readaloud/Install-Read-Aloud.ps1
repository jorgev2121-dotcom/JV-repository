# Install VTES Read-Aloud (OWNER-DIRECTIVE READ-ALOUD-01). Safe to run twice. Writes only new files.
# 1) Installs AutoHotkey v2 with winget if missing.  2) Copies Read-Aloud.ahk to C:\VTES-LOCAL\ReadAloud\.
# 3) Adds a Startup shortcut so the hotkeys work after every restart.  4) Starts it now.
$ErrorActionPreference = 'Stop'
$src  = Join-Path $PSScriptRoot 'Read-Aloud.ahk'
$dest = 'C:\VTES-LOCAL\ReadAloud'
New-Item -ItemType Directory -Force -Path $dest | Out-Null
Copy-Item $src (Join-Path $dest 'Read-Aloud.ahk') -Force
$ahk = @("$env:ProgramFiles\AutoHotkey\v2\AutoHotkey64.exe","$env:LOCALAPPDATA\Programs\AutoHotkey\v2\AutoHotkey64.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $ahk) {
  winget install --id AutoHotkey.AutoHotkey -e --accept-source-agreements --accept-package-agreements
  $ahk = @("$env:ProgramFiles\AutoHotkey\v2\AutoHotkey64.exe","$env:LOCALAPPDATA\Programs\AutoHotkey\v2\AutoHotkey64.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
}
if (-not $ahk) { throw 'AutoHotkey v2 not found after install.' }
$lnk = Join-Path ([Environment]::GetFolderPath('Startup')) 'VTES Read-Aloud.lnk'
$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut($lnk)
$s.TargetPath = $ahk; $s.Arguments = '"' + (Join-Path $dest 'Read-Aloud.ahk') + '"'; $s.Save()
Start-Process $ahk -ArgumentList ('"' + (Join-Path $dest 'Read-Aloud.ahk') + '"')
"INSTALLED · AutoHotkey: $ahk · Script: $dest\Read-Aloud.ahk · Startup: $lnk"
