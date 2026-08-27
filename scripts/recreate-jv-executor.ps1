<#
================================================================================
  recreate-jv-executor.ps1
  ONE SCRIPT THAT REBUILDS THE "JV EXECUTOR" LAUNCHER FROM NOTHING.

  Written 2026-08-26 by the desktop cycle, answering
  TASK-C2D_LAUNCHER-DURABILITY-SURVIVE-REBOOT-CRASH-AND-FIRE_2026-08-26.

  WHAT IT IS FOR
    If this machine is ever wiped, replaced, or lost in a fire, Jorge clones
    the JV-repository from GitHub and runs THIS ONE FILE. It puts the launcher,
    the icon, and the Ctrl+Alt+J hotkey back exactly as they were.

  HOW TO RUN IT
    Right-click this file -> "Run with PowerShell".
    No administrator rights needed. It never asks for a password.

  WHAT IT REBUILDS
    1. C:\Users\JV\OneDrive\Scripts\JV-Executor.cmd   (the launcher itself)
    2. "JV Executor" shortcut on the OneDrive Desktop (the real desktop)
    3. "JV Executor" shortcut on the shell Desktop
    4. "JV Executor" shortcut in the Start Menu
    5. The global hotkey Ctrl+Alt+J on all three shortcuts
    6. The JV-repository folder pinned to File Explorer Quick Access

  WHAT IT DELIBERATELY DOES NOT DO
    - It does not pin to the taskbar. Windows blocks that from a script.
      After running, right-click "JV Executor" on the desktop -> Pin to taskbar.
    - It does not create scheduled tasks, watchers, or background agents.
      Those are gated on Jorge's word (money-lock rule: no new watchers).

  UNDO
    Delete these six things:
      C:\Users\JV\OneDrive\Scripts\JV-Executor.cmd
      C:\Users\JV\OneDrive\Desktop\JV Executor.lnk
      C:\Users\JV\Desktop\JV Executor.lnk
      %APPDATA%\Microsoft\Windows\Start Menu\Programs\JV Executor.lnk
    and unpin JV-repository from Quick Access by right-clicking it there.
================================================================================
#>

$ErrorActionPreference = 'Stop'

# ---- the four paths everything hangs off -------------------------------------
$Repo       = 'C:\Users\JV\JV-repository'
$ClaudeExe  = 'C:\Users\JV\.local\bin\claude.exe'
$ScriptsDir = 'C:\Users\JV\OneDrive\Scripts'
$LauncherCmd= Join-Path $ScriptsDir 'JV-Executor.cmd'

$ShortcutPaths = @(
  'C:\Users\JV\OneDrive\Desktop\JV Executor.lnk',
  'C:\Users\JV\Desktop\JV Executor.lnk',
  (Join-Path $env:APPDATA 'Microsoft\Windows\Start Menu\Programs\JV Executor.lnk')
)

$results = New-Object System.Collections.Generic.List[object]
function Note([string]$What, [string]$State, [string]$Detail) {
  $results.Add([pscustomobject]@{ Item = $What; State = $State; Detail = $Detail })
}

Write-Host ''
Write-Host '  Rebuilding the JV Executor launcher...' -ForegroundColor Cyan
Write-Host ''

# ---- 1. the launcher .cmd -----------------------------------------------------
if (-not (Test-Path $ScriptsDir)) { New-Item -ItemType Directory -Path $ScriptsDir -Force | Out-Null }
if (Test-Path $LauncherCmd) {
  Copy-Item $LauncherCmd "$LauncherCmd.bak-$(Get-Date -Format 'yyyyMMdd')" -Force
}

$cmdBody = @'
@echo off
REM ============================================================
REM  JV EXECUTOR - one-click launcher into the desktop executor
REM  Rebuilt by recreate-jv-executor.ps1
REM  Opens Claude Code already working in C:\Users\JV\JV-repository
REM  Undo: delete this file and the "JV Executor" shortcuts.
REM ============================================================
title JV Executor - CU Inspections

set "REPO=C:\Users\JV\JV-repository"
set "CLAUDE=C:\Users\JV\.local\bin\claude.exe"

if not exist "%REPO%" (
  echo.
  echo   Could not find your work folder:
  echo     %REPO%
  echo.
  echo   Nothing was changed. Tell Claude the folder is missing.
  echo.
  pause
  exit /b 1
)

if not exist "%CLAUDE%" (
  echo.
  echo   Could not find the executor program on this machine.
  echo   It was expected at:
  echo     %CLAUDE%
  echo.
  echo   Nothing was changed. Tell Claude the executor is missing.
  echo.
  pause
  exit /b 1
)

cd /d "%REPO%"
"%CLAUDE%" %*

if errorlevel 1 (
  echo.
  echo   The executor closed with a problem. Nothing on disk was changed
  echo   by this launcher. Copy the lines above and show them to Claude.
  echo.
  pause
)
'@

Set-Content -LiteralPath $LauncherCmd -Value $cmdBody -Encoding ASCII
Note 'Launcher script' 'REBUILT' $LauncherCmd

# ---- 2-5. the three shortcuts + the hotkey ------------------------------------
$ws = New-Object -ComObject WScript.Shell
foreach ($lnk in $ShortcutPaths) {
  $parent = Split-Path $lnk -Parent
  if (-not (Test-Path $parent)) {
    Note "Shortcut $(Split-Path $parent -Leaf)" 'SKIPPED' "Folder does not exist: $parent"
    continue
  }
  try {
    $s = $ws.CreateShortcut($lnk)
    $s.TargetPath       = $LauncherCmd
    $s.WorkingDirectory = $Repo
    $s.IconLocation     = "$ClaudeExe,0"
    $s.WindowStyle      = 1
    $s.Hotkey           = 'CTRL+ALT+J'
    $s.Description      = 'JV Executor - opens Claude Code already working in your JV-repository folder. Hotkey: Ctrl+Alt+J'
    $s.Save()

    # read it back - a Save() that silently did nothing is not a rebuild
    $check = $ws.CreateShortcut($lnk)
    if ($check.TargetPath -eq $LauncherCmd) {
      Note "Shortcut: $parent" 'REBUILT' "Hotkey=$($check.Hotkey)"
    } else {
      Note "Shortcut: $parent" 'FAILED' 'Saved but read back wrong target'
    }
  } catch {
    Note "Shortcut: $parent" 'FAILED' $_.Exception.Message
  }
}

# ---- 6. Quick Access pin ------------------------------------------------------
try {
  $shell = New-Object -ComObject Shell.Application
  $qa = $shell.Namespace('shell:::{679f85cb-0220-4080-b29b-5540cc05aab6}')
  $already = @($qa.Items() | ForEach-Object { $_.Path }) -contains $Repo
  if ($already) {
    Note 'Quick Access pin' 'ALREADY THERE' $Repo
  } else {
    $item = $shell.Namespace((Split-Path $Repo -Parent)).ParseName((Split-Path $Repo -Leaf))
    $verb = $item.Verbs() | Where-Object { ($_.Name -replace '&','') -match 'Quick access' }
    if ($verb) {
      $verb.DoIt(); Start-Sleep -Milliseconds 1200
      $now = @($shell.Namespace('shell:::{679f85cb-0220-4080-b29b-5540cc05aab6}').Items() | ForEach-Object { $_.Path }) -contains $Repo
      Note 'Quick Access pin' $(if ($now) { 'PINNED' } else { 'FAILED' }) $Repo
    } else {
      Note 'Quick Access pin' 'FAILED' 'Windows did not offer the pin option'
    }
  }
} catch {
  Note 'Quick Access pin' 'FAILED' $_.Exception.Message
}

# ---- 7. prove the launcher can actually launch --------------------------------
if (Test-Path $ClaudeExe) {
  Note 'Executor program present' 'OK' $ClaudeExe
} else {
  Note 'Executor program present' 'MISSING' "Not found at $ClaudeExe - install Claude Code, then re-run this script"
}
if (Test-Path $Repo) {
  Note 'Work folder present' 'OK' $Repo
} else {
  Note 'Work folder present' 'MISSING' "Clone the JV-repository to $Repo first, then re-run this script"
}

# ---- the report ---------------------------------------------------------------
Write-Host ''
$results | Format-Table -AutoSize
Write-Host ''
Write-Host '  ONE THING LEFT FOR YOU:' -ForegroundColor Yellow
Write-Host '  Right-click "JV Executor" on your desktop, choose "Pin to taskbar".'
Write-Host '  Windows will not let a script do that one.'
Write-Host ''
Write-Host '  Or just press Ctrl+Alt+J from anywhere - that works now.' -ForegroundColor Green
Write-Host ''

$failed = @($results | Where-Object { $_.State -in 'FAILED','MISSING' })
if ($failed.Count -gt 0) {
  Write-Host "  $($failed.Count) item(s) did not come back. Show this window to Claude." -ForegroundColor Red
  Write-Host ''
}
