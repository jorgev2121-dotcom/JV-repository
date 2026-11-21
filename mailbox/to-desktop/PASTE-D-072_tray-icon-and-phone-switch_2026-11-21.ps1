# PASTE-D-072 | 2026-11-21 | Desktop PowerShell | Restores the VTES Control Panel tray icon and turns on the phone link.
# Creates files only. Deletes nothing. Undo: delete %USERPROFILE%\VTES-Tray and the "VTES Control Panel" Startup/Desktop shortcuts.
$u='https://claude.ai/artifact/321Zo6MTHdv9Mj3hGD1QDj'
$d="$env:USERPROFILE\VTES-Tray"; New-Item -ItemType Directory -Force $d | Out-Null
@'
Add-Type -AssemblyName System.Windows.Forms,System.Drawing
$global:u='https://claude.ai/artifact/321Zo6MTHdv9Mj3hGD1QDj'
$global:n=New-Object Windows.Forms.NotifyIcon
$n.Icon=[Drawing.SystemIcons]::Information
$n.Text='VTES Control Panel'
$n.Visible=$true
$n.add_MouseClick({ if($_.Button -eq 'Left'){ Start-Process $global:u } })
$m=New-Object Windows.Forms.ContextMenuStrip
[void]$m.Items.Add('Open VTES Control Panel').add_Click({ Start-Process $global:u })
[void]$m.Items.Add('Exit').add_Click({ $global:n.Visible=$false; [Windows.Forms.Application]::Exit() })
$n.ContextMenuStrip=$m
[Windows.Forms.Application]::Run()
'@ | Set-Content "$d\VTES-Tray.ps1" -Encoding UTF8
$w=New-Object -ComObject WScript.Shell
$a="-NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$d\VTES-Tray.ps1`""
$s=$w.CreateShortcut("$([Environment]::GetFolderPath('Startup'))\VTES Control Panel.lnk"); $s.TargetPath='powershell.exe'; $s.Arguments=$a; $s.WindowStyle=7; $s.Save()
$s=$w.CreateShortcut("$([Environment]::GetFolderPath('Desktop'))\VTES Control Panel.url"); $s.TargetPath=$u; $s.Save()
Start-Process powershell.exe -ArgumentList $a
$g='G:\My Drive\_CLAUDE-MAILBOX\Install-RC-Watchdog.ps1'
if(Test-Path $g){ & $g -WorkDir $env:USERPROFILE } else { 'WATCHDOG FILE NOT FOUND - tell Cloud' }
'DONE - look for the icon in the tray (click the ^ arrow if hidden)'
