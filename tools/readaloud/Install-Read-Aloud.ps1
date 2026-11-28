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
# 3b) Visible "Read Aloud" icons: Desktop launchpad + Start Menu (the Start Menu one can be pinned). Added 2026-11-01 after the icon went missing.
foreach ($dir in @([Environment]::GetFolderPath('Desktop'), (Join-Path ([Environment]::GetFolderPath('Programs')) ''))) {
  try {
    $icon = Join-Path $dir 'Read Aloud.lnk'
    $i = $ws.CreateShortcut($icon)
    $i.TargetPath = $ahk; $i.Arguments = '"' + (Join-Path $dest 'Read-Aloud.ahk') + '"'
    $i.Description = 'Read Aloud: highlight text, press Ctrl+Alt+R (Edge) or Ctrl+Alt+S (Chrome + Speechify)'
    $ico = Join-Path $PSScriptRoot 'icons\Read-Aloud.ico'
    if (Test-Path $ico) { New-Item -ItemType Directory -Force -Path 'C:\VTES-LOCAL\icons' | Out-Null; Copy-Item $ico 'C:\VTES-LOCAL\icons\Read-Aloud.ico' -Force; $i.IconLocation = 'C:\VTES-LOCAL\icons\Read-Aloud.ico' } else { $i.IconLocation = "$env:SystemRoot\System32\imageres.dll,109" }
    $i.Save()
  } catch { "Could not make icon in $dir : $($_.Exception.Message)" }
}
# Windows does not let scripts pin to the taskbar. Pin by hand: right-click the Desktop "Read Aloud" icon, then "Show more options" > "Pin to taskbar".
Start-Process $ahk -ArgumentList ('"' + (Join-Path $dest 'Read-Aloud.ahk') + '"')
"INSTALLED · AutoHotkey: $ahk · Script: $dest\Read-Aloud.ahk · Startup: $lnk · Icons: Desktop + Start Menu (pin the Desktop one to the taskbar by right-click)"
