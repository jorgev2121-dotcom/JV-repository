# EDIT-VtesStatus-v4.ps1 - adds LLM-09, LOCAL and CHIEF to Write-VtesStatus.ps1 ($ValidIds) in the live folder, the safe way. TRK-2026-9910-B. ASCII only.
# Run by the desktop executor after INSTALL-v4.ps1. It backs the file up first (Write-VtesStatus.ps1.pre-v4), lists the edit in the install record,
# and updates that file's line in MANIFEST.sha256 (the old line is kept in the record), so ROLLBACK-v4.ps1 puts both back exactly.
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File EDIT-VtesStatus-v4.ps1 -LiveDir "C:\path\to\the\live\panel\folder"
param([string]$LiveDir = '')
$ErrorActionPreference = 'Stop'
$SEP = [IO.Path]::DirectorySeparatorChar
function Sha([string]$p) { (Get-FileHash -LiteralPath $p -Algorithm SHA256).Hash.ToLower() }
if ($LiveDir -eq '') { Write-Host 'STOP: -LiveDir is required. Nothing was changed.'; exit 2 }
$rbDir = Join-Path $LiveDir '_Rollback'; $record = Join-Path $rbDir 'v4-install-record.txt'
$target = Join-Path $LiveDir 'Write-VtesStatus.ps1'; $mf = Join-Path $LiveDir 'MANIFEST.sha256'
if (-not (Test-Path -LiteralPath $record)) { Write-Host 'STOP: no install record. Run INSTALL-v4.ps1 first. Nothing was changed.'; exit 2 }
if (-not (Test-Path -LiteralPath $target)) { Write-Host 'STOP: Write-VtesStatus.ps1 is not in that folder. Nothing was changed.'; exit 2 }
$raw = [IO.File]::ReadAllText($target)
$m = [regex]::Match($raw, "(?m)^(\`$ValidIds\s*=\s*)(.*)$")
if (-not $m.Success) { Write-Host 'STOP: could not find the $ValidIds line in Write-VtesStatus.ps1. Nothing was changed.'; exit 2 }
$need = @('LLM-09', 'LOCAL', 'CHIEF') | Where-Object { $m.Groups[2].Value -notmatch ("'" + $_ + "'") }
if (@($need).Count -eq 0) { Write-Host 'Nothing to do: LLM-09, LOCAL and CHIEF are already in $ValidIds.'; exit 0 }
$R = New-Object System.Collections.Generic.List[string]; foreach ($l in @(Get-Content -LiteralPath $record)) { if ($l -ne '') { $R.Add($l) } }
function Rec-Set([string]$kind, [string]$key, [string]$rest) {
    $line = $kind + '|' + $key + '|' + $rest
    for ($i = 0; $i -lt $R.Count; $i++) { if ($R[$i].StartsWith($kind + '|' + $key + '|')) { $R[$i] = $line; return } }
    $R.Add($line)
}
function Rec-Has([string]$kind, [string]$key) { foreach ($l in $R) { if ($l.StartsWith($kind + '|' + $key + '|')) { return $true } }; return $false }
function Rec-Save { $tmp = $record + '.tmp'; [IO.File]::WriteAllText($tmp, (($R.ToArray() -join "`n") + "`n"), (New-Object Text.ASCIIEncoding)); Move-Item -LiteralPath $tmp -Destination $record -Force }
# 1. backup and record FIRST
$oldSha = Sha $target
if (-not (Rec-Has 'PRE' 'Write-VtesStatus.ps1')) { Rec-Set 'PRE' 'Write-VtesStatus.ps1' $oldSha }
$bak = $target + '.pre-v4'; if (-not (Test-Path -LiteralPath $bak)) { Copy-Item -LiteralPath $target -Destination $bak }
Rec-Set 'TOUCH' 'Write-VtesStatus.ps1' 'x'
$oldLine = $null
if (Test-Path -LiteralPath $mf) {
    $mfLines = @(Get-Content -LiteralPath $mf -Encoding UTF8)
    foreach ($ln in $mfLines) { if ($ln -match ('^[0-9a-f]{64}  Write-VtesStatus\.ps1$')) { $oldLine = $ln } }
    if (-not (Rec-Has 'PRE' 'MANIFEST.sha256')) { Rec-Set 'PRE' 'MANIFEST.sha256' (Sha $mf); $mb = $mf + '.pre-v4'; if (-not (Test-Path -LiteralPath $mb)) { Copy-Item -LiteralPath $mf -Destination $mb } }
}
Rec-Save
# 2. edit (keep the file's own byte-order mark and line endings)
$hadBom = ([IO.File]::ReadAllBytes($target)[0] -eq 0xEF)
$newVal = $m.Groups[2].Value.TrimEnd() + (($need | ForEach-Object { ",'" + $_ + "'" }) -join '')
$new = $raw.Substring(0, $m.Index) + $m.Groups[1].Value + $newVal + $raw.Substring($m.Index + $m.Length)
[IO.File]::WriteAllText($target, $new, (New-Object Text.UTF8Encoding($hadBom)))
$newSha = Sha $target
Rec-Set 'AFTER' 'Write-VtesStatus.ps1' $newSha
# 3. keep the tamper check quiet: update only this file's line in the manifest, and remember the old line
if ($oldLine) {
    $oldHash = $oldLine.Substring(0, 64)
    if (-not (Rec-Has 'EDITLINE' 'Write-VtesStatus.ps1')) { Rec-Set 'EDITLINE' 'Write-VtesStatus.ps1' ($oldHash + '|' + $newSha) } else { $p = (($R | Where-Object { $_.StartsWith('EDITLINE|Write-VtesStatus.ps1|') } | Select-Object -First 1).Split('|')); Rec-Set 'EDITLINE' 'Write-VtesStatus.ps1' ($p[2] + '|' + $newSha) }
    $out = @($mfLines | ForEach-Object { if ($_ -eq $oldLine) { $newSha + '  Write-VtesStatus.ps1' } else { $_ } })
    [IO.File]::WriteAllText($mf, (($out -join "`n") + "`n"), (New-Object Text.UTF8Encoding($false)))
    Rec-Set 'AFTER' 'MANIFEST.sha256' (Sha $mf)
}
Rec-Save
Write-Host ('Added ' + (($need) -join ', ') + ' to $ValidIds in Write-VtesStatus.ps1. Backup: Write-VtesStatus.ps1.pre-v4. Listed in the install record. ROLLBACK-v4.ps1 puts it back.')
Write-Host 'Run Verify-VtesPanel.ps1 once to confirm the tamper check is quiet.'
