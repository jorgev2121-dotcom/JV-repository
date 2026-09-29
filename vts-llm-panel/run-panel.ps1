<#
  Run the VTS panel with keys pulled from 1Password for this one run only.
  Keys never sit in a file or a permanent environment variable. (TRK-2026-9200)
  Example:  .\vts-llm-panel\run-panel.ps1 --health
#>
$ErrorActionPreference = 'Stop'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path

# Keep only references whose 1Password item exists, so one missing key does not block the rest.
$lines = Get-Content "$here\panel.env" | Where-Object { $_ -match '^\w+=op://' }
$usable = foreach ($line in $lines) {
    $item = ($line -split '/')[3]
    op item get $item --vault AI-Services --format json 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) { $line }
}
$tmp = New-TemporaryFile
try {
    Set-Content -Path $tmp -Value $usable   # references only, no secrets
    op run --env-file $tmp -- python "$here\vts_llm_panel.py" @args
}
finally { Remove-Item $tmp -ErrorAction SilentlyContinue }
