# Fix-Icons-And-Remote-Access_PASTE-D-066.ps1   (ASCII only on purpose)
# TRK-2026-9952f  |  Owner directive Jorge 2026-11-22  |  Window: DESKTOP EXECUTOR
# 1) Shrinks oversize desktop icons to regular (Medium, 48 px) and restarts Explorer.
# 2) -MakeRightPrimary : makes the RIGHT-hand monitor the main display, so the icons land there.
# 3) Pops up the "Allow phone remote access?" window; on YES it starts Claude Remote Control.
# 4) Puts permit shortcuts on the Desktop: Cowork, Code Desktop Executor, Phone Remote Access.
# Safe: backs up the old icon setting, deletes nothing, sends nothing outbound.
# Switches: -IconsOnly  -RemoteOnly  -MakeRightPrimary  -NoShortcuts
param([switch]$IconsOnly,[switch]$RemoteOnly,[switch]$MakeRightPrimary,[switch]$NoShortcuts)
$ErrorActionPreference = 'Continue'
$logDir = Join-Path $env:USERPROFILE 'ClaudeWatchdog'
New-Item -ItemType Directory -Force -Path $logDir | Out-Null
$log = Join-Path $logDir 'icons-and-remote.log'
function Log($m){ $l=("{0}  {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'),$m); Add-Content $log $l; Write-Host $l }
Add-Type -AssemblyName System.Windows.Forms, System.Drawing

# ---------- 1. ICON SIZE ----------
function Set-IconSize {
  $key = 'HKCU:\Software\Microsoft\Windows\Shell\Bags\1\Desktop'
  if (-not (Test-Path $key)) { New-Item -Path $key -Force | Out-Null }
  $old = (Get-ItemProperty -Path $key -Name IconSize -ErrorAction SilentlyContinue).IconSize
  Log "ICON before: IconSize=$old (96=Large, 48=Medium, 32=Small)"
  Set-Content (Join-Path $logDir 'icon-size-backup.txt') "IconSize=$old saved $(Get-Date -Format s)"
  Set-ItemProperty -Path $key -Name IconSize -Type DWord -Value 48
  Set-ItemProperty -Path $key -Name LogicalViewMode -Type DWord -Value 3 -ErrorAction SilentlyContinue
  Stop-Process -Name explorer -Force -ErrorAction SilentlyContinue
  Start-Sleep -Seconds 3
  if (-not (Get-Process explorer -ErrorAction SilentlyContinue)) { Start-Process explorer.exe }
  Start-Sleep -Seconds 4
  $new = (Get-ItemProperty -Path $key -Name IconSize).IconSize
  Log "ICON after: IconSize=$new  -> $(if($new -eq 48){'VERIFIED Medium'}else{'NOT SET'})"
}

# ---------- 2. RIGHT MONITOR = MAIN ----------
function Set-RightPrimary {
  $screens = [System.Windows.Forms.Screen]::AllScreens
  Log ("MONITORS found: " + $screens.Count)
  foreach($s in $screens){ Log ("  {0}  X={1} Y={2} W={3} H={4} primary={5}" -f $s.DeviceName,$s.Bounds.X,$s.Bounds.Y,$s.Bounds.Width,$s.Bounds.Height,$s.Primary) }
  if ($screens.Count -lt 2) { Log 'Only one monitor seen - nothing to move.'; return }
  $right = $screens | Sort-Object { $_.Bounds.X } | Select-Object -Last 1
  if ($right.Primary) { Log 'Right monitor is ALREADY the main display.'; return }
  Add-Type @"
using System; using System.Runtime.InteropServices;
public class DispCfg {
  [StructLayout(LayoutKind.Sequential, CharSet=CharSet.Ansi)]
  public struct DEVMODE {
    [MarshalAs(UnmanagedType.ByValTStr, SizeConst=32)] public string dmDeviceName;
    public short dmSpecVersion, dmDriverVersion, dmSize, dmDriverExtra;
    public int dmFields; public int dmPositionX, dmPositionY; public int dmDisplayOrientation, dmDisplayFixedOutput;
    public short dmColor, dmDuplex, dmYResolution, dmTTOption, dmCollate;
    [MarshalAs(UnmanagedType.ByValTStr, SizeConst=32)] public string dmFormName;
    public short dmLogPixels; public int dmBitsPerPel, dmPelsWidth, dmPelsHeight, dmDisplayFlags, dmDisplayFrequency;
    public int dmICMMethod, dmICMIntent, dmMediaType, dmDitherType, dmReserved1, dmReserved2, dmPanningWidth, dmPanningHeight;
  }
  [DllImport("user32.dll", CharSet=CharSet.Ansi)] public static extern bool EnumDisplaySettings(string dev, int mode, ref DEVMODE dm);
  [DllImport("user32.dll", CharSet=CharSet.Ansi)] public static extern int ChangeDisplaySettingsEx(string dev, ref DEVMODE dm, IntPtr hwnd, int flags, IntPtr lp);
  [DllImport("user32.dll", CharSet=CharSet.Ansi)] public static extern int ChangeDisplaySettingsEx(string dev, IntPtr dm, IntPtr hwnd, int flags, IntPtr lp);
}
"@
  $dx = $right.Bounds.X; $dy = $right.Bounds.Y
  foreach($s in $screens){
    $dm = New-Object DispCfg+DEVMODE; $dm.dmSize = [Runtime.InteropServices.Marshal]::SizeOf($dm)
    if (-not [DispCfg]::EnumDisplaySettings($s.DeviceName, -1, [ref]$dm)) { Log "FAIL read $($s.DeviceName)"; continue }
    $dm.dmPositionX = $s.Bounds.X - $dx; $dm.dmPositionY = $s.Bounds.Y - $dy
    $dm.dmFields = 0x20 -bor 0x80000   # DM_POSITION
    $flags = 0x1 -bor 0x10000000       # UPDATEREGISTRY | NORESET
    if ($s.DeviceName -eq $right.DeviceName) { $flags = $flags -bor 0x10 }   # SET_PRIMARY
    $r = [DispCfg]::ChangeDisplaySettingsEx($s.DeviceName, [ref]$dm, [IntPtr]::Zero, $flags, [IntPtr]::Zero)
    Log "  stage $($s.DeviceName) -> result $r (0=ok)"
  }
  $r = [DispCfg]::ChangeDisplaySettingsEx($null, [IntPtr]::Zero, [IntPtr]::Zero, 0, [IntPtr]::Zero)
  Log "APPLY result $r (0=ok)"
  Start-Sleep -Seconds 4
  $now = [System.Windows.Forms.Screen]::PrimaryScreen
  Log ("PRIMARY now: {0}  (was right-hand {1}) -> {2}" -f $now.DeviceName,$right.DeviceName,$(if($now.DeviceName -eq $right.DeviceName){'VERIFIED'}else{'NOT CHANGED - use Settings > Display > pick right screen > Make this my main display'}))
}

# ---------- 3. REMOTE ACCESS POPUP ----------
function Show-RemotePermit {
  $msg = "PHONE REMOTE ACCESS`n`nAllow Jorge (and Claude) to reach this desktop from the phone?`n`nYES = turn on Claude Remote Control now.`nNO = leave it off.`n`nYou can turn it off any time by closing the 'claude remote-control' window."
  $ans = [System.Windows.Forms.MessageBox]::Show($msg,'Remote access permit - Claude','YesNo','Question','Button1','DefaultDesktopOnly')
  Log "PERMIT popup answer: $ans"
  if ($ans -ne 'Yes') { return }
  $wd = Join-Path $env:USERPROFILE 'ClaudeWatchdog\RC-Watchdog.ps1'
  if (Test-Path $wd) { & powershell -NoProfile -ExecutionPolicy Bypass -File $wd }
  else {
    $c = (Get-Command claude -ErrorAction SilentlyContinue).Source
    if ($c) { Start-Process $c -ArgumentList 'remote-control' -WorkingDirectory $env:USERPROFILE -WindowStyle Minimized; Start-Sleep 20 }
    else { Log 'FAIL claude not on PATH - cannot start Remote Control'; return }
  }
  $run = @(Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'remote-control' -and $_.CommandLine -notmatch 'Fix-Icons' })
  Log ("REMOTE CONTROL processes: {0} -> {1}" -f $run.Count,$(if($run.Count -gt 0){'VERIFIED RUNNING'}else{'NOT RUNNING'}))
  Start-Process 'https://claude.ai/code'
}

# ---------- 4. PERMIT SHORTCUTS ----------
function New-Shortcut($name,$target,$args,$iconIdx,$desc){
  $desk = [Environment]::GetFolderPath('Desktop')
  $w = New-Object -ComObject WScript.Shell
  $s = $w.CreateShortcut((Join-Path $desk "$name.lnk"))
  $s.TargetPath = $target; $s.Arguments = $args; $s.Description = $desc
  $s.IconLocation = "$env:SystemRoot\System32\shell32.dll,$iconIdx"; $s.Save()
  Log "SHORTCUT $name -> $(Test-Path (Join-Path $desk "$name.lnk"))"
}
function Add-Shortcuts {
  $self = $PSCommandPath
  New-Shortcut 'Phone Remote Access PERMIT' 'powershell.exe' "-NoProfile -ExecutionPolicy Bypass -File `"$self`" -RemoteOnly" 18 'Pops the remote-access permit window'
  $app = Get-ChildItem "$env:LOCALAPPDATA\AnthropicClaude","$env:LOCALAPPDATA\Programs\Claude","$env:ProgramFiles\Claude" -Filter 'claude*.exe' -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($app) { New-Shortcut 'Claude Cowork' $app.FullName '' 220 'Claude desktop app (Cowork tab)' } else { Log 'Claude Cowork shortcut SKIPPED - desktop app exe not found' }
  $cc = (Get-Command claude -ErrorAction SilentlyContinue).Source
  if ($cc) { New-Shortcut 'Claude Code Desktop Executor' 'powershell.exe' "-NoExit -Command `"cd `$env:USERPROFILE; & '$cc'`"" 15 'Claude Code - Desktop Executor window' } else { Log 'Executor shortcut SKIPPED - claude not on PATH' }
}

Log '=== START Fix-Icons-And-Remote-Access (TRK-2026-9952f) ==='
if ($RemoteOnly) { Show-RemotePermit; exit 0 }
Set-IconSize
if ($MakeRightPrimary -and -not $IconsOnly) { Set-RightPrimary; Set-IconSize }   # re-apply: icons re-flow on the new main screen
if (-not $IconsOnly) { if (-not $NoShortcuts) { Add-Shortcuts }; Show-RemotePermit }
Log '=== END ==='
