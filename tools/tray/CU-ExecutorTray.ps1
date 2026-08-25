# CU-ExecutorTray.ps1
# TRK-2026-9740 . #CU-Inspections #JorgeValdes #tray #RI-031
#
# Puts THREE always-visible icons in the Windows notification tray, one per
# Claude window, so Jorge can always see and reach every executor:
#
#   D  (green)  = CODE - DESKTOP EXECUTOR   (the terminal on this PC)
#   C  (blue)   = CODE - CLOUD/WEB EXECUTOR (claude.ai/code in the browser)
#   X  (orange) = COWORK                    (the Cowork window)
#
# Left-click an icon: focuses that window if it is open, otherwise opens it.
# Right-click: menu with Open and Exit.
#
# Design constraints from RECURRING-ISSUES.md:
#   RI-032  - this file is deliberately pure ASCII. No emoji, no em-dashes,
#             no accented characters ANYWHERE in this script. PS 5.1 reads a
#             no-BOM file as CP-1252 and silently corrupts non-ASCII. Do not
#             add non-ASCII when editing.
#   RI-036  - nothing here needs elevation. HKCU only. No UAC prompt ever.
#   RI-031  - the whole point: the windows must identify themselves.
#   TRK-2026-9341 - icons must land VISIBLE on the tray, not in the hidden
#             overflow. The script promotes its own icons via the Win11
#             NotifyIconSettings registry (IsPromoted=1).
#   TRK-2026-9249 - a component nothing watches is how components die.
#             This script appends a heartbeat line every 5 minutes to
#             %LOCALAPPDATA%\CU-ExecutorTray\heartbeat.log so the roster
#             can check "file has grown", not "process exists".
#
# Usage:
#   powershell -NoProfile -STA -ExecutionPolicy Bypass -File CU-ExecutorTray.ps1
#       runs the tray icons AND installs the HKCU Run key so it restarts at
#       every logon (self-healing, Tier 3).
#   ... -Uninstall   removes the Run key and exits.

param(
    [switch]$Uninstall,
    [switch]$NoAutostart
)

$ErrorActionPreference = 'Stop'

$AppName   = 'CU-ExecutorTray'
$ScriptPath = $MyInvocation.MyCommand.Path
$RunKey    = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Run'
$DataDir   = Join-Path $env:LOCALAPPDATA $AppName
$Heartbeat = Join-Path $DataDir 'heartbeat.log'

# --- Uninstall: remove autostart and exit -----------------------------------
if ($Uninstall) {
    Remove-ItemProperty -Path $RunKey -Name $AppName -ErrorAction SilentlyContinue
    Write-Host "$AppName autostart removed. Any running instance keeps running until you Exit it from an icon's right-click menu."
    exit 0
}

# --- Single instance guard ---------------------------------------------------
$mutex = New-Object System.Threading.Mutex($false, "Local\$AppName")
if (-not $mutex.WaitOne(0, $false)) {
    Write-Host "$AppName is already running. Exiting this copy."
    exit 0
}

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

if (-not (Test-Path $DataDir)) { New-Item -ItemType Directory -Path $DataDir -Force | Out-Null }

# --- Autostart (Tier 3 enforcement): re-assert the Run key on every launch ---
if (-not $NoAutostart) {
    $psExe = Join-Path $env:WINDIR 'System32\WindowsPowerShell\v1.0\powershell.exe'
    $cmd = '"{0}" -NoProfile -STA -WindowStyle Hidden -ExecutionPolicy Bypass -File "{1}"' -f $psExe, $ScriptPath
    Set-ItemProperty -Path $RunKey -Name $AppName -Value $cmd -Force
}

# --- Win32 helpers for focusing windows --------------------------------------
Add-Type @'
using System;
using System.Runtime.InteropServices;
public class CUWin32 {
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
    [DllImport("user32.dll")] public static extern bool IsIconic(IntPtr hWnd);
}
'@

function Focus-WindowByTitle {
    param([string]$Pattern)
    $procs = Get-Process | Where-Object { $_.MainWindowTitle -and ($_.MainWindowTitle -match $Pattern) }
    $p = $procs | Select-Object -First 1
    if ($p -and $p.MainWindowHandle -ne [IntPtr]::Zero) {
        if ([CUWin32]::IsIconic($p.MainWindowHandle)) {
            [CUWin32]::ShowWindow($p.MainWindowHandle, 9) | Out-Null   # SW_RESTORE
        }
        [CUWin32]::SetForegroundWindow($p.MainWindowHandle) | Out-Null
        return $true
    }
    return $false
}

# --- The three windows --------------------------------------------------------
# TitlePattern: regex tried against every open window title first (focus wins
# over opening a duplicate - RI-007). OpenCommand: what to run if not found.
# DESKTOP EXECUTOR VERIFIES THESE THREE LINES against the real machine.
$Targets = @(
    @{
        Key = 'D'; ColorName = 'ForestGreen'
        Tip = 'CODE - DESKTOP EXECUTOR  (terminal on this PC)'
        TitlePattern = 'DESKTOP EXECUTOR|Claude Code'
        OpenCommand  = { Start-Process 'wt.exe' -ArgumentList '-w','0','nt','powershell','-NoExit','-Command','claude' }
    },
    @{
        Key = 'C'; ColorName = 'RoyalBlue'
        Tip = 'CODE - CLOUD/WEB EXECUTOR  (claude.ai/code)'
        TitlePattern = 'claude\.ai/code|CLOUD/WEB EXECUTOR|CLOUD EXECUTOR'
        OpenCommand  = { Start-Process 'https://claude.ai/code' }
    },
    @{
        Key = 'X'; ColorName = 'DarkOrange'
        Tip = 'COWORK  (Claude Cowork window)'
        TitlePattern = 'Cowork'
        OpenCommand  = { Start-Process 'https://claude.ai/' }
    }
)

# --- Draw a badge icon: colored circle + white letter ------------------------
function New-BadgeIcon {
    param([string]$Letter, [string]$ColorName)
    $bmp = New-Object System.Drawing.Bitmap 32, 32
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $color = [System.Drawing.Color]::FromName($ColorName)
    $brush = New-Object System.Drawing.SolidBrush $color
    $g.FillEllipse($brush, 1, 1, 30, 30)
    $font = New-Object System.Drawing.Font('Segoe UI', 17, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
    $rect = New-Object System.Drawing.RectangleF 0, 1, 32, 31
    $g.DrawString($Letter, $font, [System.Drawing.Brushes]::White, $rect, $sf)
    $g.Dispose()
    $hicon = $bmp.GetHicon()
    return [System.Drawing.Icon]::FromHandle($hicon)
}

# --- Promote our icons out of the hidden overflow (Win11) --------------------
# Fixes the TRK-2026-9341 failure: icons that exist but live behind the ^ arrow.
function Promote-TrayIcons {
    $base = 'HKCU:\Control Panel\NotifyIconSettings'
    if (-not (Test-Path $base)) { return }   # older Windows: nothing to do
    Get-ChildItem $base | ForEach-Object {
        $exe = (Get-ItemProperty -Path $_.PSPath -ErrorAction SilentlyContinue).ExecutablePath
        if ($exe -and ($exe -match 'powershell\.exe$|pwsh\.exe$')) {
            Set-ItemProperty -Path $_.PSPath -Name 'IsPromoted' -Value 1 -Type DWord -ErrorAction SilentlyContinue
        }
    }
}

# --- Build the three tray icons ----------------------------------------------
$notifyIcons = New-Object System.Collections.ArrayList

function Invoke-Target {
    param($Target)
    if (-not (Focus-WindowByTitle -Pattern $Target.TitlePattern)) {
        & $Target.OpenCommand
    }
}

foreach ($t in $Targets) {
    $ni = New-Object System.Windows.Forms.NotifyIcon
    $ni.Icon = New-BadgeIcon -Letter $t.Key -ColorName $t.ColorName
    $ni.Text = $t.Tip.Substring(0, [Math]::Min(63, $t.Tip.Length))
    $ni.Visible = $true

    $target = $t
    $ni.add_MouseClick({
        param($s, $e)
        if ($e.Button -eq [System.Windows.Forms.MouseButtons]::Left) {
            Invoke-Target -Target $target
        }
    }.GetNewClosure())

    $menu = New-Object System.Windows.Forms.ContextMenuStrip
    $miOpen = $menu.Items.Add(('Open {0}' -f $t.Tip))
    $miOpen.add_Click({ Invoke-Target -Target $target }.GetNewClosure())
    $menu.Items.Add('-') | Out-Null
    $miExit = $menu.Items.Add('Exit all three tray icons')
    $miExit.add_Click({ [System.Windows.Forms.Application]::Exit() })
    $ni.ContextMenuStrip = $menu

    [void]$notifyIcons.Add($ni)
}

# --- Heartbeat + one-time promotion timer ------------------------------------
Add-Content -Path $Heartbeat -Value ("{0}  START  pid={1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $PID)

$timer = New-Object System.Windows.Forms.Timer
$timer.Interval = 300000   # 5 minutes
$timer.add_Tick({
    Add-Content -Path $Heartbeat -Value ("{0}  ALIVE" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'))
})
$timer.Start()

# Promotion runs 8 seconds after the icons appear (the registry entries do not
# exist until Windows has seen the icons at least once).
$promoTimer = New-Object System.Windows.Forms.Timer
$promoTimer.Interval = 8000
$promoTimer.add_Tick({
    Promote-TrayIcons
    $promoTimer.Stop()
})
$promoTimer.Start()

# --- Run the message pump; clean up on exit ----------------------------------
try {
    [System.Windows.Forms.Application]::Run()
}
finally {
    foreach ($ni in $notifyIcons) { $ni.Visible = $false; $ni.Dispose() }
    Add-Content -Path $Heartbeat -Value ("{0}  STOP" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'))
    $mutex.ReleaseMutex()
}
