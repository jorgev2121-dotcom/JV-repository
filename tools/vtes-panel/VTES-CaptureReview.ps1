<#
.SYNOPSIS
  Owner review pop-up for a captured county/city page (standing owner directive OD-CR-01): a flashing, always-on-top window, then an Outlook draft from Jorge@teamusasales.com with the PDF attached. NEVER sends.
.DESCRIPTION
  TRK-2026-9910-B · #capture #review #popup #OD-CR-01 · NOT YET SEEN ON WINDOWS. Only the naming, text, parsing and "never sends" logic is self-tested (PowerShell 7 / Linux). The window, flashing and Outlook code have never run.
  Modes:
    -Pdf <file> -Trk TRK-2026-NNNN -What "<what the page shows>"   review this PDF now
    -Watch                                                         watch G:\My Drive\MY-DESK\CAPTURE-INBOX\ (or -Inbox) and pop up every new PDF
    -Url <page> -Trk ... -What ...                                 BEST EFFORT: headless Chrome prints a plain web address to PDF first (forms that need typing, logins and CAPTCHAs will not work; save the page from your browser instead)
    -SelfTest                                                      10 checks, prints RESULT
  The window: always on top, flashes (caption + taskbar), beeps, re-asserts itself every 30 seconds until you answer. Buttons: Open PDF (the window then shrinks to a bar at the top so the PDF is visible), Make email draft, Later (10 min), Discard.
  The email: a NEW Outlook message, sending account Jorge@teamusasales.com, PDF attached, To left blank unless -To is given. The code only ever calls Display(): you read it and press Send yourself.
  Writes: capture-review.log and vtes-reviews.js (pending reviews, for the red bell) in the panel folder; short-path copies of the PDF in %TEMP%\vtes-attach. Reads the PDF. Sends nothing anywhere.
#>
param([string]$Pdf = '', [string]$Trk = '', [string]$What = '', [string]$To = '', [string]$Url = '', [string]$Inbox = '', [switch]$Watch, [switch]$SelfTest)
$ErrorActionPreference = 'Stop'
$PanelDir = $PSScriptRoot
if (-not $Inbox) { $Inbox = 'G:\My Drive\MY-DESK\CAPTURE-INBOX' }
$FromAddress = 'Jorge@teamusasales.com'

function Get-TrkFromName([string]$name) {
  $m = [regex]::Match($name, '(TRK-\d{4}-\d{4}(?:-[A-Z]+)?|TUS-\d{2}-\d{4}|OPH-\d{4}-\d{4})'); if ($m.Success) { return $m.Value } else { return '' }
}
function New-CaptureName([string]$trk, [string]$what, [datetime]$when) {
  $clean = ($what -replace '[\\/:*?"<>|]', '-' -replace '\s+', ' ').Trim(); if ($clean.Length -gt 70) { $clean = $clean.Substring(0, 70).Trim() }
  return ('{0} _ {1} _ Portal-PDF _ {2} _ v1.pdf' -f $when.ToString('yyyy-MM-dd'), $trk, $clean)
}
function Get-Tags([string]$trk, [string]$what) {
  $t = @('#' + $trk, '#county-page', '#owner-review', '#JorgeValdes', '#CU-Inspections'); foreach ($n in [regex]::Matches($what, '\b(\d{5,})\b')) { $t += '#' + $n.Value }; return ($t | Select-Object -Unique) -join ' '
}
function Build-Subject([string]$trk, [string]$what, [datetime]$when) { return ('{0} - {1} - county page captured {2}' -f $trk, $what, $when.ToString('yyyy-MM-dd')) }
function Build-Body([string]$trk, [string]$what, [datetime]$when) {
  $L = @('Hello,', '', ('Attached is a PDF copy of the county page for: {0}.' -f $what), ('Captured {0}. It shows the status exactly as the county page displayed it at that time.' -f $when.ToString('yyyy-MM-dd HH:mm')), '', 'Please let me know if you have any questions.', '', 'Best Regards,', 'Jorge Valdes', 'Owner''s Agent | Plans Expeditor | Attorney-In-Fact', 'Team USA Sales, Inc.', 'Jorge@TeamUsaSales.com | Direct: 305.300.4500', '', (Get-Tags $trk $what), ('{0} · v1 · {1} · CURRENT' -f $trk, $when.ToString('yyyy-MM-dd')))
  return ($L -join "`r`n")
}
function Get-AttachPath([string]$pdf, [string]$tempRoot) {
  $name = [IO.Path]::GetFileName($pdf); if ($name.Length -gt 110) { $ext = [IO.Path]::GetExtension($name); $name = $name.Substring(0, 110 - $ext.Length) + $ext }
  $dir = Join-Path $tempRoot ([guid]::NewGuid().ToString('N').Substring(0, 6)); return (Join-Path $dir $name)
}
function Write-ReviewsJs([string]$dir, $pending) {
  $items = @(); foreach ($p in $pending) { $items += ("{{ id: '{0}', kind: 'review', title: 'Review and approve: {1}', due: '', detail: '{2}', src: 'VTES-CaptureReview.ps1', done: false }}" -f $p.Id, ($p.What -replace "'", ''), ($p.File -replace "'", '' -replace '\\', '/')) }
  [IO.File]::WriteAllText((Join-Path $dir 'vtes-reviews.js'), ('window.VTES_REVIEWS = [' + ($items -join ",`n") + '];' + "`n"), (New-Object Text.UTF8Encoding($false)))
}
function Log([string]$msg) { try { Add-Content -LiteralPath (Join-Path $PanelDir 'capture-review.log') -Value ('{0}  {1}' -f (Get-Date).ToString('yyyy-MM-dd HH:mm:ss'), $msg) -Encoding UTF8 } catch { } }

if ($SelfTest) {
  $pass = 0; $fail = 0; function T($n, $c) { if ($c) { $script:pass++; Write-Host "PASS $n" } else { $script:fail++; Write-Host "FAIL $n" } }
  $when = [datetime]'2026-10-01 09:30'
  T 'TRK read from a file name' ((Get-TrkFromName '2026-10-01 _ TRK-2026-1262 _ Portal-PDF _ Permit 2026061642 Status _ v1.pdf') -eq 'TRK-2026-1262')
  T 'TUS number read from a file name' ((Get-TrkFromName 'TUS-26-1033_PERMIT-APP.pdf') -eq 'TUS-26-1033')
  $nm = New-CaptureName 'TRK-2026-1262' 'Permit 2026061642: status / final?' $when
  T 'capture name follows the charter grammar and has no illegal characters' (($nm -match '^2026-10-01 _ TRK-2026-1262 _ Portal-PDF _ .+ _ v1\.pdf$') -and ($nm -notmatch '[\\/:*?"<>|]'))
  $sub = Build-Subject 'TRK-2026-1262' 'Permit 2026061642 status' $when; $body = Build-Body 'TRK-2026-1262' 'Permit 2026061642 status' $when
  T 'subject carries the TRK and the date' (($sub -match 'TRK-2026-1262') -and ($sub -match '2026-10-01'))
  T 'body carries hashtags (TRK, the digits as a tag), the stamp, and Jorge''s signature' (($body -match '#TRK-2026-1262') -and ($body -match '#2026061642') -and ($body -match 'TRK-2026-1262 · v1 · 2026-10-01 · CURRENT') -and ($body -match 'Jorge Valdes'))
  $longName = ('x' * 300) + '.pdf'; $ap = Get-AttachPath ($longName) (Join-Path ([IO.Path]::GetTempPath()) 'vtes-attach')
  T 'attachment name is cut to 110 characters, so the staging path stays well under 260 even for a 300-character name' (([IO.Path]::GetFileName($ap).Length -le 110) -and ($ap.Length -lt 260))
  Write-ReviewsJs ([IO.Path]::GetTempPath()) @([pscustomobject]@{ Id = 'V-1'; What = "Permit status for 20001's unit"; File = 'C:\x\y.pdf' })
  $rj = Get-Content (Join-Path ([IO.Path]::GetTempPath()) 'vtes-reviews.js') -Raw
  T 'reviews file is a JS list with one pending review (and apostrophes removed)' (($rj -match 'window\.VTES_REVIEWS = \[') -and ([regex]::Matches($rj, "\{ id: '").Count -eq 1) -and ($rj -notmatch "20001's"))
  Remove-Item (Join-Path ([IO.Path]::GetTempPath()) 'vtes-reviews.js') -ErrorAction SilentlyContinue
  $src = Get-Content -LiteralPath $PSCommandPath -Raw
  T 'NEVER SENDS: the source contains no Send( call on a mail item' (($src -notmatch '\.Send\s*\(') -and ($src -notmatch '\.Send\b\s*$'))
  T 'the draft is only Display()ed, from the teamusasales account, and the window is TopMost' (($src -match '\.Display\(\)') -and ($src -match 'SendUsingAccount') -and ($src -match 'Jorge@teamusasales\.com') -and ($src -match 'TopMost'))
  T 'the To line is left blank unless -To is given' (($src -match 'if \(\$to\) \{ \$m\.To = \$to \}'))
  Write-Host "RESULT: $pass passed, $fail failed"; if ($fail) { exit 1 } else { exit 0 }
}

Add-Type -AssemblyName System.Windows.Forms, System.Drawing
Add-Type -TypeDefinition @"
using System; using System.Runtime.InteropServices;
public static class VtesWin {
  [StructLayout(LayoutKind.Sequential)] public struct FLASHWINFO { public uint cbSize; public IntPtr hwnd; public uint dwFlags; public uint uCount; public uint dwTimeout; }
  [DllImport("user32.dll")] public static extern bool FlashWindowEx(ref FLASHWINFO pwfi);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr hWnd, IntPtr after, int X, int Y, int cx, int cy, uint flags);
  public static void Flash(IntPtr h) { FLASHWINFO f = new FLASHWINFO(); f.cbSize = (uint)Marshal.SizeOf(f); f.hwnd = h; f.dwFlags = 3 | 12; f.uCount = uint.MaxValue; f.dwTimeout = 0; FlashWindowEx(ref f); }
  public static void Top(IntPtr h) { SetWindowPos(h, (IntPtr)(-1), 0, 0, 0, 0, 0x0001 | 0x0002 | 0x0040); SetForegroundWindow(h); }
}
"@

function New-OutlookDraft([string]$pdf, [string]$subject, [string]$body, [string]$to) {
  $tempRoot = Join-Path $env:TEMP 'vtes-attach'; $att = Get-AttachPath $pdf $tempRoot; New-Item -ItemType Directory -Path (Split-Path $att) -Force | Out-Null; Copy-Item -LiteralPath $pdf -Destination $att -Force
  $ol = New-Object -ComObject Outlook.Application; $m = $ol.CreateItem(0)
  foreach ($a in $ol.Session.Accounts) { if ($a.SmtpAddress -ieq $FromAddress) { $m.SendUsingAccount = $a; break } }
  $m.Subject = $subject; $m.Body = $body; if ($to) { $m.To = $to }
  [void]$m.Attachments.Add($att); $m.Display()
  Log ("DRAFT opened (not sent): {0} <- {1}" -f $subject, $att)
}

function Show-Review([string]$pdf, [string]$trk, [string]$what) {
  $when = Get-Date; $state = @{ Result = ''; Small = $false }
  $f = New-Object Windows.Forms.Form; $f.Text = 'VTES: REVIEW AND APPROVE'; $f.TopMost = $true; $f.ShowInTaskbar = $true; $f.StartPosition = 'CenterScreen'
  $wa = [Windows.Forms.Screen]::PrimaryScreen.WorkingArea; $f.Width = [int]($wa.Width * 0.6); $f.Height = [int]($wa.Height * 0.6); $f.FormBorderStyle = 'FixedDialog'; $f.ControlBox = $false; $f.BackColor = [Drawing.Color]::FromArgb(179, 38, 30)
  $lab = New-Object Windows.Forms.Label; $lab.Dock = 'Top'; $lab.Height = 120; $lab.TextAlign = 'MiddleCenter'; $lab.ForeColor = [Drawing.Color]::White; $lab.Font = New-Object Drawing.Font 'Segoe UI', 30, ([Drawing.FontStyle]::Bold); $lab.Text = "REVIEW AND APPROVE`r`n$trk"
  $info = New-Object Windows.Forms.Label; $info.Dock = 'Top'; $info.Height = 130; $info.TextAlign = 'MiddleCenter'; $info.ForeColor = [Drawing.Color]::White; $info.Font = New-Object Drawing.Font 'Segoe UI', 16; $info.Text = "$what`r`n`r`n$([IO.Path]::GetFileName($pdf))"
  $bar = New-Object Windows.Forms.FlowLayoutPanel; $bar.Dock = 'Fill'; $bar.FlowDirection = 'LeftToRight'; $bar.WrapContents = $true; $bar.Padding = New-Object Windows.Forms.Padding 20
  function Btn($t, $cb) { $b = New-Object Windows.Forms.Button; $b.Text = $t; $b.Width = 250; $b.Height = 70; $b.Font = New-Object Drawing.Font 'Segoe UI', 13, ([Drawing.FontStyle]::Bold); $b.BackColor = [Drawing.Color]::White; $b.Add_Click($cb); $bar.Controls.Add($b) }
  Btn 'Open PDF' { Start-Process -FilePath $pdf; $state.Small = $true; $f.Height = 210; $f.Width = [int]($wa.Width * 0.6); $f.Location = New-Object Drawing.Point ([int]($wa.Left + ($wa.Width - $f.Width) / 2)), $wa.Top; $lab.Height = 60; $lab.Font = New-Object Drawing.Font 'Segoe UI', 14, ([Drawing.FontStyle]::Bold); $info.Height = 0; Log "PDF opened by owner: $pdf" }
  Btn 'Make email draft (attached, NOT sent)' { try { New-OutlookDraft $pdf (Build-Subject $trk $what $when) (Build-Body $trk $what $when) $To; $state.Result = 'drafted'; $f.Close() } catch { [void][Windows.Forms.MessageBox]::Show("Outlook draft failed: $($_.Exception.Message)`r`nThe PDF is at: $pdf", 'VTES') } }
  Btn 'Later (10 minutes)' { $state.Result = 'later'; $f.Close() }
  Btn 'Discard' { $state.Result = 'discarded'; $f.Close() }
  $f.Controls.Add($bar); $f.Controls.Add($info); $f.Controls.Add($lab)
  $t1 = New-Object Windows.Forms.Timer; $t1.Interval = 600; $script:lit = $true
  $t1.Add_Tick({ if (-not $state.Small) { $script:lit = -not $script:lit; $f.BackColor = if ($script:lit) { [Drawing.Color]::FromArgb(179, 38, 30) } else { [Drawing.Color]::FromArgb(255, 193, 7) }; $lab.ForeColor = if ($script:lit) { [Drawing.Color]::White } else { [Drawing.Color]::Black }; $info.ForeColor = $lab.ForeColor } })
  $t2 = New-Object Windows.Forms.Timer; $t2.Interval = 30000; $t2.Add_Tick({ [VtesWin]::Top($f.Handle); if (-not $state.Small) { [VtesWin]::Flash($f.Handle); [Media.SystemSounds]::Exclamation.Play() } })
  $f.Add_Shown({ [VtesWin]::Top($f.Handle); [VtesWin]::Flash($f.Handle); [Media.SystemSounds]::Exclamation.Play(); $t1.Start(); $t2.Start(); Log "Review window shown: $pdf" })
  [void]$f.ShowDialog(); $t1.Stop(); $t2.Stop(); Log ("Review result: {0} ({1})" -f $state.Result, $pdf)
  return $state.Result
}

function Review-One([string]$pdf, [string]$trk, [string]$what) {
  if (-not $trk) { $trk = Get-TrkFromName ([IO.Path]::GetFileName($pdf)) }; if (-not $trk) { $trk = 'TRK-UNKNOWN (name the file with its TRK)' }
  if (-not $what) { $what = [IO.Path]::GetFileNameWithoutExtension($pdf) }
  $id = 'V-' + (Get-Date).ToString('yyyyMMddHHmmss'); $pending = @([pscustomobject]@{ Id = $id; What = $what; File = $pdf }); Write-ReviewsJs $PanelDir $pending
  do { $r = Show-Review $pdf $trk $what; if ($r -eq 'later') { Start-Sleep -Seconds 600 } } while ($r -eq 'later')
  Write-ReviewsJs $PanelDir @()
}

if ($Url) {
  if (-not $Trk -or -not $What) { throw '-Url needs -Trk and -What so the file can be named.' }
  $chrome = @("$env:ProgramFiles\Google\Chrome\Application\chrome.exe", "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
  if (-not $chrome) { throw 'Chrome not found. Open the page in your browser and save it as PDF into the CAPTURE-INBOX folder instead.' }
  New-Item -ItemType Directory -Path $Inbox -Force | Out-Null; $Pdf = Join-Path $Inbox (New-CaptureName $Trk $What (Get-Date))
  & $chrome --headless=new --disable-gpu --no-pdf-header-footer "--print-to-pdf=$Pdf" $Url | Out-Null; Start-Sleep -Seconds 3
  if (-not (Test-Path -LiteralPath $Pdf) -or (Get-Item -LiteralPath $Pdf).Length -lt 2000) { throw 'The page did not print to a usable PDF (forms, logins and CAPTCHAs cannot be printed this way). Open it in your browser and use Print, Save as PDF into CAPTURE-INBOX.' }
  Log "Printed $Url to $Pdf"
}
if ($Pdf) { Review-One $Pdf $Trk $What; exit 0 }
if ($Watch) {
  New-Item -ItemType Directory -Path $Inbox -Force | Out-Null; $doneFile = Join-Path $PanelDir 'capture-review.done.txt'; Log "Watching $Inbox"
  while ($true) {
    $done = if (Test-Path $doneFile) { Get-Content $doneFile } else { @() }
    foreach ($f in (Get-ChildItem -LiteralPath $Inbox -Filter *.pdf -File -ErrorAction SilentlyContinue)) {
      if ($done -contains $f.FullName) { continue }
      $s1 = $f.Length; Start-Sleep -Seconds 2; $f.Refresh(); if ($f.Length -ne $s1 -or $f.Length -lt 500) { continue }
      Add-Content -LiteralPath $doneFile -Value $f.FullName -Encoding UTF8; Review-One $f.FullName '' ''
    }
    Start-Sleep -Seconds 5
  }
}
Write-Host 'Nothing to do: give -Pdf, -Url or -Watch (see the help at the top of this file).'
