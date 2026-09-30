<#
.SYNOPSIS
  Big red bell in the Windows tray (and optional red desktop shortcut) that counts what is waiting for Jorge.
.DESCRIPTION
  TRK-2026-9910-B · #reminders #tray #red-bell · NOT YET SEEN ON WINDOWS (only the counting logic is tested, on PowerShell 7 / Linux).
  Reads vtes-reminders.js next to this script. Red bell with the count; flashes when anything is overdue.
  Double-click = open the Reminders page. Right-click = Reminders, Panel, Exit. Refreshes every 60 seconds.
  -CreateShortcut  puts "VTES REMINDERS (red)" on the REAL desktop (+ writes vtes-redbell.ico beside this script) and exits.
  -SelfTest        6 checks of the counting logic. Prints RESULT.
  Reads one file, writes (with -CreateShortcut) one .ico and one .lnk. Sends nothing anywhere.
#>
param([switch]$CreateShortcut, [switch]$SelfTest, [string]$Dir = '')
$ErrorActionPreference = 'Stop'
if (-not $Dir) { $Dir = $PSScriptRoot }

function Get-Counts([string]$text, [datetime]$today) {
  $open = 0; $over = 0; $soon = 0
  foreach ($seg in ($text -split '\{\s*id:\s*')) {
    if ($seg -notmatch "^'[^']+'") { continue }
    if ($seg -match 'done:\s*true') { continue }
    $open++
    if ($seg -match "due:\s*'(\d{4}-\d{2}-\d{2})'") {
      $d = [datetime]::ParseExact($Matches[1], 'yyyy-MM-dd', [Globalization.CultureInfo]::InvariantCulture)
      $days = [int]($d.Date - $today.Date).TotalDays
      if ($days -lt 0) { $over++ } elseif ($days -le 7) { $soon++ }
    }
  }
  return [pscustomobject]@{ Open = $open; Overdue = $over; Soon = $soon }
}

if ($SelfTest) {
  $pass = 0; $fail = 0; function T($n, $c) { if ($c) { $script:pass++; Write-Host "PASS $n" } else { $script:fail++; Write-Host "FAIL $n" } }
  $js = "window.VTES_REMINDERS = [`n { id: 'R-01', due: '2026-10-11', done: false },`n { id: 'R-02', due: '', done: false },`n { id: 'R-03', due: '2026-09-25', done: false },`n { id: 'R-04', due: '2026-10-02', done: true },`n { id: 'R-05', due: '2026-10-05', done: false }`n];"
  $c = Get-Counts $js ([datetime]'2026-09-30')
  T 'counts 4 open (one is done)' ($c.Open -eq 4)
  T 'counts 1 overdue (9/25)' ($c.Overdue -eq 1)
  T 'counts 1 due within 7 days (10/05)' ($c.Soon -eq 1)
  T 'a done item is never counted' ((Get-Counts "{ id: 'X', due: '2020-01-01', done: true }" ([datetime]'2026-09-30')).Open -eq 0)
  T 'empty text gives zero' ((Get-Counts '' ([datetime]'2026-09-30')).Open -eq 0)
  $real = Join-Path $PSScriptRoot 'vtes-reminders.js'
  T 'the real reminders file parses to at least 1 open item' ((Test-Path $real) -and ((Get-Counts (Get-Content $real -Raw -Encoding UTF8) (Get-Date)).Open -ge 1))
  Write-Host "RESULT: $pass passed, $fail failed"; if ($fail) { exit 1 } else { exit 0 }
}

Add-Type -AssemblyName System.Windows.Forms, System.Drawing
function New-Bell([bool]$lit, [int]$n) {
  $bmp = New-Object Drawing.Bitmap 32, 32; $g = [Drawing.Graphics]::FromImage($bmp); $g.SmoothingMode = 'AntiAlias'
  $back = if ($lit) { [Drawing.Color]::FromArgb(179, 38, 30) } else { [Drawing.Color]::FromArgb(255, 120, 110) }
  $g.FillEllipse((New-Object Drawing.SolidBrush $back), 1, 1, 30, 30)
  $f = New-Object Drawing.Font 'Segoe UI', 15, ([Drawing.FontStyle]::Bold), ([Drawing.GraphicsUnit]::Pixel)
  $t = if ($n -gt 9) { '9+' } elseif ($n -gt 0) { "$n" } else { '!' }
  $sz = $g.MeasureString($t, $f); $g.DrawString($t, $f, [Drawing.Brushes]::White, (32 - $sz.Width) / 2, (32 - $sz.Height) / 2); $g.Dispose()
  return $bmp
}
$html = Join-Path $Dir 'VTES-REMINDERS.html'; $panel = Join-Path $Dir 'VTES-PANEL.html'; $js = Join-Path $Dir 'vtes-reminders.js'
if ($CreateShortcut) {
  $icoPath = Join-Path $Dir 'vtes-redbell.ico'; $bmp = New-Bell $true 0
  $ico = [Drawing.Icon]::FromHandle($bmp.GetHicon()); $fs = [IO.File]::Create($icoPath); $ico.Save($fs); $fs.Close()
  $desk = [Environment]::GetFolderPath('Desktop'); $lnk = Join-Path $desk 'VTES REMINDERS (red).lnk'
  $sh = New-Object -ComObject WScript.Shell; $s = $sh.CreateShortcut($lnk); $s.TargetPath = $html; $s.IconLocation = $icoPath; $s.Description = 'Things waiting for Jorge'; $s.Save()
  Write-Host "Shortcut written: $lnk (desktop folder: $desk)"; exit 0
}
$ni = New-Object Windows.Forms.NotifyIcon; $ni.Visible = $true
$menu = New-Object Windows.Forms.ContextMenuStrip
[void]$menu.Items.Add('Open Reminders', $null, { Start-Process $html }); [void]$menu.Items.Add('Open Panel', $null, { Start-Process $panel }); [void]$menu.Items.Add('Exit', $null, { $ni.Visible = $false; [Windows.Forms.Application]::Exit() })
$ni.ContextMenuStrip = $menu; $ni.add_DoubleClick({ Start-Process $html })
$script:state = [pscustomobject]@{ Open = 0; Overdue = 0; Lit = $true }
function Refresh-Bell {
  $txt = if (Test-Path $js) { Get-Content $js -Raw -Encoding UTF8 } else { '' }
  $c = Get-Counts $txt (Get-Date); $script:state.Open = $c.Open; $script:state.Overdue = $c.Overdue
  $ni.Text = ("VTES: {0} waiting, {1} overdue" -f $c.Open, $c.Overdue)
}
function Paint { $old = $ni.Icon; $b = New-Bell $script:state.Lit $script:state.Open; $ni.Icon = [Drawing.Icon]::FromHandle($b.GetHicon()) }
$t1 = New-Object Windows.Forms.Timer; $t1.Interval = 60000; $t1.add_Tick({ Refresh-Bell; Paint }); $t1.Start()
$t2 = New-Object Windows.Forms.Timer; $t2.Interval = 700; $t2.add_Tick({ if ($script:state.Overdue -gt 0) { $script:state.Lit = -not $script:state.Lit; Paint } elseif (-not $script:state.Lit) { $script:state.Lit = $true; Paint } }); $t2.Start()
Refresh-Bell; Paint; [Windows.Forms.Application]::Run()
