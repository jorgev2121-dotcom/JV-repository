# Make the "VTES Control Panel" icon (opens the panel as its own Chrome app window). Safe to run twice. Writes only a new shortcut. 2026-11-01
$ErrorActionPreference = 'Stop'
$url = 'https://claude.ai/artifact/321Zo6MTHdv9Mj3hGD1QDj'
$chrome = @("$env:ProgramFiles\Google\Chrome\Application\chrome.exe","${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe","$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $chrome) { throw 'Chrome not found.' }
$ws = New-Object -ComObject WScript.Shell
# Reuse the Chrome profile of the existing CLOUD icon (CU-Business) so Jorge is already signed in.
$profile = ''
foreach ($d in @([Environment]::GetFolderPath('Desktop'), 'C:\Users\JV\OneDrive\Desktop')) {
  $c = Join-Path $d 'CLOUD.lnk'
  if (Test-Path $c) { $a = $ws.CreateShortcut($c).Arguments; if ($a -match '--profile-directory=("[^"]+"|\S+)') { $profile = '--profile-directory=' + $Matches[1] }; break }
}
foreach ($dir in @([Environment]::GetFolderPath('Desktop'), (Join-Path ([Environment]::GetFolderPath('Programs')) ''))) {
  try {
    $l = $ws.CreateShortcut((Join-Path $dir 'VTES Control Panel.lnk'))
    $l.TargetPath = $chrome; $l.Arguments = ("$profile --app=$url").Trim()
    $l.Description = 'VTES Control Panel (master panel)'; $ico = Join-Path $PSScriptRoot 'icons\VTES-Control-Panel.ico'
    if (Test-Path $ico) { New-Item -ItemType Directory -Force -Path 'C:\VTES-LOCAL\icons' | Out-Null; Copy-Item $ico 'C:\VTES-LOCAL\icons\VTES-Control-Panel.ico' -Force; $l.IconLocation = 'C:\VTES-LOCAL\icons\VTES-Control-Panel.ico' } else { $l.IconLocation = "$chrome,0" }; $l.Save()
  } catch { "Could not make icon in $dir : $($_.Exception.Message)" }
}
"DONE · icon 'VTES Control Panel' on Desktop + Start Menu · profile: [$profile] · Pin: right-click > Show more options > Pin to taskbar"
