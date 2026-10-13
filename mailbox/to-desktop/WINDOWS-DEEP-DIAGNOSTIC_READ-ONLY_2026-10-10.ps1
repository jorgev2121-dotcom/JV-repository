# WINDOWS-DEEP-DIAGNOSTIC_READ-ONLY_2026-10-10.ps1
# Purpose: one read-only health report of DESKTOP-OTB90LR, saved where EVERY LLM can read it.
# GREEN: reads only. Changes nothing. Writes one NEW report file. No admin needed (some sections say SKIPPED without admin).
# Run (RAMBO): powershell -NoProfile -ExecutionPolicy Bypass -File .\WINDOWS-DEEP-DIAGNOSTIC_READ-ONLY_2026-10-10.ps1
# Output: <Shared Folders for all LLMs>\DIAGNOSTICS\WINDOWS-DIAG_<yyyy-MM-dd_HHmm>.md  (falls back to the repo diagnosis folder)
# Footer stamp written into the report: WINDOWS-DIAG · v1 · <date> · CURRENT

$ErrorActionPreference = 'Continue'
$stamp = Get-Date -Format 'yyyy-MM-dd_HHmm'
$days = 14
$since = (Get-Date).AddDays(-$days)

# --- find the shared LLM folder by name (never guess a path) ---
$shared = $null
foreach ($root in @('G:\My Drive', "$env:USERPROFILE\My Drive", 'G:\Shared drives')) {
  if (Test-Path $root) {
    $hit = Get-ChildItem -Path $root -Directory -Recurse -Depth 2 -ErrorAction SilentlyContinue |
      Where-Object { $_.Name -eq 'Shared Folders for all LLMs' } | Select-Object -First 1
    if ($hit) { $shared = $hit.FullName; break }
  }
}
if ($shared) { $outDir = Join-Path $shared 'DIAGNOSTICS' } else { $outDir = 'C:\Users\JV\JV-repository\diagnosis' }
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
$out = Join-Path $outDir ("WINDOWS-DIAG_$stamp.md")
if (Test-Path $out) { Write-Output "BLOCKED: $out already exists. Nothing written."; exit 1 }

$L = New-Object System.Collections.Generic.List[string]
function Add([string]$s) { $L.Add($s) }
function Sec([string]$t) { Add ''; Add "## $t" }

$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
Add "# Windows deep diagnostic - $env:COMPUTERNAME - $stamp"
Add "Read-only. Window: last $days days. Admin: $isAdmin. Saved to: $outDir"
Add '#windows-diagnostic #DESKTOP-OTB90LR #JorgeValdes'

Sec 'A. Machine'
try { $os = Get-CimInstance Win32_OperatingSystem; Add "- OS: $($os.Caption) build $($os.BuildNumber)"; Add "- Last boot: $($os.LastBootUpTime)"; Add ("- Free RAM: {0:N1} of {1:N1} GB" -f ($os.FreePhysicalMemory/1MB), ($os.TotalVisibleMemorySize/1MB)) } catch { Add "- OS read failed: $($_.Exception.Message)" }
Get-CimInstance Win32_LogicalDisk -Filter 'DriveType=3' -ErrorAction SilentlyContinue | ForEach-Object { Add ("- Disk {0} free {1:N1} of {2:N1} GB" -f $_.DeviceID, ($_.FreeSpace/1GB), ($_.Size/1GB)) }
$pending = (Test-Path 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Component Based Servicing\RebootPending') -or (Test-Path 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\WindowsUpdate\Auto Update\RebootRequired')
Add "- Reboot pending: $pending"

Sec 'B. Crashes and hangs (Application log, errors 1000/1002, by app)'
try {
  $app = Get-WinEvent -FilterHashtable @{LogName='Application'; Id=1000,1002; StartTime=$since} -ErrorAction Stop
  $app | ForEach-Object { if ($_.Properties.Count -gt 0) { $_.Properties[0].Value } } | Group-Object | Sort-Object Count -Descending | Select-Object -First 15 | ForEach-Object { Add "- $($_.Count) x $($_.Name)" }
  Add "- Total crash/hang events: $($app.Count)"
} catch { Add '- None found, or the log could not be read.' }

Sec 'C. System log errors (top sources)'
try {
  $sys = Get-WinEvent -FilterHashtable @{LogName='System'; Level=1,2; StartTime=$since} -ErrorAction Stop
  $sys | Group-Object ProviderName | Sort-Object Count -Descending | Select-Object -First 15 | ForEach-Object { Add "- $($_.Count) x $($_.Name)" }
  $bs = $sys | Where-Object { $_.Id -in 41,1001,6008 }
  Add "- Unexpected shutdowns / bugchecks (41, 1001, 6008): $($bs.Count)"
} catch { Add '- Could not read the System log.' }

Sec 'D. Reliability Monitor (last 25 records)'
try { Get-CimInstance Win32_ReliabilityRecords -ErrorAction Stop | Sort-Object TimeGenerated -Descending | Select-Object -First 25 | ForEach-Object { Add "- $($_.TimeGenerated) | $($_.SourceName) | $($_.ProductName) | $(($_.Message -replace '\s+',' ').Substring(0,[Math]::Min(140,($_.Message -replace '\s+',' ').Length)))" } } catch { Add '- SKIPPED: reliability data not readable.' }

Sec 'E. Antivirus products registered (two at once = conflict)'
try { Get-CimInstance -Namespace root\SecurityCenter2 -ClassName AntiVirusProduct -ErrorAction Stop | ForEach-Object { Add "- $($_.displayName) | state $($_.productState) | $($_.pathToSignedProductExe)" } } catch { Add '- SKIPPED: Security Center not readable.' }
try { $mp = Get-MpComputerStatus -ErrorAction Stop; Add "- Defender realtime: $($mp.RealTimeProtectionEnabled), signatures $($mp.AntivirusSignatureLastUpdated)" } catch { Add '- Defender status not readable.' }
try { Get-MpThreatDetection -ErrorAction Stop | Where-Object { $_.InitialDetectionTime -gt $since } | Select-Object -First 10 | ForEach-Object { Add "- Detection $($_.InitialDetectionTime): ThreatID $($_.ThreatID) on $((($_.Resources) -join '; ').Substring(0,[Math]::Min(160,(($_.Resources) -join '; ').Length)))" } } catch { Add '- Defender detections: SKIPPED (needs admin).' }

Sec 'F. Startup programs (what launches at sign-in)'
Get-CimInstance Win32_StartupCommand -ErrorAction SilentlyContinue | ForEach-Object { Add "- $($_.Name) | $($_.Location)" }

Sec 'G. Scheduled tasks that failed last run (non-Microsoft)'
try { Get-ScheduledTask -ErrorAction Stop | Where-Object { $_.TaskPath -notlike '\Microsoft\*' } | ForEach-Object { $i = $_ | Get-ScheduledTaskInfo -ErrorAction SilentlyContinue; if ($i -and $i.LastTaskResult -ne 0 -and $i.LastTaskResult -ne 267011) { Add "- $($_.TaskName) | state $($_.State) | last result $('0x{0:X}' -f $i.LastTaskResult) | last run $($i.LastRunTime)" } } } catch { Add '- Could not list scheduled tasks.' }

Sec 'H. Stopped services that are set to Automatic'
Get-CimInstance Win32_Service -Filter "StartMode='Auto' AND State<>'Running'" -ErrorAction SilentlyContinue | Select-Object -First 25 | ForEach-Object { Add "- $($_.Name) ($($_.DisplayName))" }

Sec 'I. Office / Outlook'
Get-Process -Name OUTLOOK,WINWORD,EXCEL,OneDrive,'1Password' -ErrorAction SilentlyContinue | ForEach-Object { Add "- Running: $($_.Name) pid $($_.Id) since $($_.StartTime)" }
try { Get-WinEvent -FilterHashtable @{LogName='Application'; ProviderName='Outlook'; StartTime=$since} -MaxEvents 10 -ErrorAction Stop | ForEach-Object { Add "- $($_.TimeCreated) | $($_.Id) | $((($_.Message -replace '\s+',' ')).Substring(0,[Math]::Min(140,($_.Message -replace '\s+',' ').Length)))" } } catch { Add '- No Outlook events in the window.' }

Sec 'J. Printers'
Get-CimInstance Win32_Printer -ErrorAction SilentlyContinue | ForEach-Object { Add "- $($_.Name) | status $($_.PrinterStatus) | offline $($_.WorkOffline)" }

Add ''
Add "Footer: WINDOWS-DIAG · v1 · $(Get-Date -Format 'yyyy-MM-dd') · CURRENT · read-only"
$L | Set-Content -Path $out -Encoding UTF8
Write-Output "EXECUTED: report written to $out ($($L.Count) lines)."
