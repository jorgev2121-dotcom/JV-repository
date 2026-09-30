# VTES-Open.ps1
# TRK-2026-9910-B . #VTES-control-panel #LLM-registry #JorgeValdes
#
# Gives every LLM window a fixed ADDRESS that works like a web link:
#     vtes://llm-01   vtes://llm-02   ...   vtes://llm-08
# Click one (in the launcher, an email, a Drive doc, a bookmark, or type it in
# Win+R) and the RIGHT window opens. Where a window has a real web address, the
# alias just forwards to it. Addresses live in ONE file: vtes-addresses.json
# (same folder). To change where a window goes, edit that file. Never this script.
#
# Usage (nothing here needs admin rights; HKCU only; no UAC prompt - RI-036):
#   powershell -NoProfile -ExecutionPolicy Bypass -File VTES-Open.ps1 -Install
#   powershell -NoProfile -ExecutionPolicy Bypass -File VTES-Open.ps1 -Address vtes://llm-07 -DryRun
#   powershell -NoProfile -ExecutionPolicy Bypass -File VTES-Open.ps1 -List
#   powershell -NoProfile -ExecutionPolicy Bypass -File VTES-Open.ps1 -Uninstall
#
# RI-032: this file is deliberately pure ASCII (plus the BOM). Do not add
# emoji, em-dashes or accents when editing; PS 5.1 would corrupt them.

param(
    [string]$Address,
    [switch]$Install,
    [switch]$Uninstall,
    [switch]$List,
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
$Self   = $MyInvocation.MyCommand.Path
$Here   = Split-Path -Parent $Self
$Book   = Join-Path $Here 'vtes-addresses.json'
$Scheme = 'vtes'
$PsExe  = Join-Path $env:WINDIR 'System32\WindowsPowerShell\v1.0\powershell.exe'
$LogDir = Join-Path $env:LOCALAPPDATA 'VTES-Open'
$Log    = Join-Path $LogDir 'open.log'

function Write-Log([string]$msg) {
    try {
        if (-not (Test-Path $LogDir)) { New-Item -ItemType Directory -Path $LogDir -Force | Out-Null }
        Add-Content -Path $Log -Value ((Get-Date -Format 'yyyy-MM-dd HH:mm:ss') + '  ' + $msg)
    } catch { }
}

function Show-Note([string]$text) {
    Add-Type -AssemblyName System.Windows.Forms
    [System.Windows.Forms.MessageBox]::Show($text, 'VTES address') | Out-Null
}

if ($Uninstall) {
    Remove-Item -Path ("HKCU:\Software\Classes\" + $Scheme) -Recurse -ErrorAction SilentlyContinue
    Write-Host "vtes:// addresses removed. Nothing else was changed."
    exit 0
}

if ($Install) {
    if (-not (Test-Path $Book)) { throw "Missing address book: $Book" }
    $root = "HKCU:\Software\Classes\" + $Scheme
    New-Item -Path $root -Force | Out-Null
    Set-ItemProperty -Path $root -Name '(default)' -Value 'URL:VTES window address'
    Set-ItemProperty -Path $root -Name 'URL Protocol' -Value ''
    New-Item -Path ($root + '\shell\open\command') -Force | Out-Null
    $cmd = '"{0}" -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass -File "{1}" -Address "%1"' -f $PsExe, $Self
    Set-ItemProperty -Path ($root + '\shell\open\command') -Name '(default)' -Value $cmd
    Write-Host "Installed. Registry key: $root"
    Write-Host "Handler: $cmd"
    Write-Host "Try it: press Win+R and type  vtes://llm-07   (opens Grok)"
    Write-Host "Undo:   ... -File VTES-Open.ps1 -Uninstall"
    exit 0
}

if (-not (Test-Path $Book)) { throw "Missing address book: $Book" }
$data = Get-Content -Raw -Encoding UTF8 -Path $Book | ConvertFrom-Json

if ($List) {
    foreach ($w in $data.windows) {
        $target = if ($w.url) { $w.url } elseif ($w.run) { $w.run } else { '(no address yet)' }
        Write-Host ("{0}  vtes://{1}  ->  {2}" -f $w.id, $w.id.ToLower(), $target)
    }
    exit 0
}

if (-not $Address) { throw 'Give -Address vtes://llm-NN, or use -List / -Install / -Uninstall.' }

$id = ($Address -replace '^vtes:(//)?', '').Trim('/').Trim().ToUpper()
$entry = $data.windows | Where-Object { $_.id -eq $id } | Select-Object -First 1
if (-not $entry) {
    Write-Log "UNKNOWN address '$Address' (parsed '$id')"
    if ($DryRun) { Write-Host "DRYRUN: unknown address $id"; exit 2 }
    Show-Note ("No window is registered at " + $Address + ". Known: LLM-01 to LLM-08.")
    exit 2
}

$action = 'none'
$target = ''
if ($entry.focusTitle) {
    $p = Get-Process | Where-Object { $_.MainWindowHandle -ne 0 -and $_.MainWindowTitle -match $entry.focusTitle } | Select-Object -First 1
    if ($p) { $action = 'focus'; $target = $p.MainWindowTitle }
}
if ($action -eq 'none' -and $entry.url) { $action = 'url';  $target = $entry.url }
if ($action -eq 'none' -and $entry.run) { $action = 'run';  $target = $entry.run }

Write-Log ("{0} -> {1} {2}" -f $id, $action, $target)

if ($DryRun) {
    Write-Host ("DRYRUN: {0} ({1}) would {2}: {3}" -f $id, $entry.name, $action, $target)
    exit 0
}

switch ($action) {
    'focus' {
        Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public class VtesWin {
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
    [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h, int n);
    [DllImport("user32.dll")] public static extern bool IsIconic(IntPtr h);
}
'@
        $h = $p.MainWindowHandle
        if ([VtesWin]::IsIconic($h)) { [VtesWin]::ShowWindow($h, 9) | Out-Null }
        [VtesWin]::SetForegroundWindow($h) | Out-Null
    }
    'url'   { Start-Process $target }
    'run'   { Start-Process -FilePath $target }
    default {
        $note = if ($entry.note) { $entry.note } else { 'No address has been filled in for this window yet.' }
        Show-Note ($id + ' ' + $entry.name + ': ' + $note)
        exit 3
    }
}
exit 0
