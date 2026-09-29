<#
  Save an API key from the clipboard straight into 1Password. The value is never printed,
  logged, or written to disk, and the clipboard is wiped afterwards. (TRK-2026-9200)

  Use:   1) on the provider's key page click "Copy"   2) run:
         .\tools\Save-ClipboardKeyTo1Password.ps1 -Title "Gemini API free"
  Check: .\tools\Save-ClipboardKeyTo1Password.ps1 -SelfTest   (saves + deletes a dummy item)
#>
param(
    [string]$Title,
    [string]$Vault = 'AI-Services',
    [switch]$SelfTest
)
$ErrorActionPreference = 'Stop'

if ($SelfTest) {
    $Title = 'ZZ SelfTest delete me'
    Set-Clipboard -Value ('selftest-' + [guid]::NewGuid().ToString('N') + [guid]::NewGuid().ToString('N'))
}
if (-not $Title) { throw 'Give -Title, for example -Title "Gemini API free".' }

$null = op vault get $Vault --format json   # fails loudly if 1Password is locked or the vault is missing

$key = (Get-Clipboard -Raw)
if ($key) { $key = $key.Trim() }
if (-not $key -or $key.Length -lt 20 -or $key -match '\s') {
    Set-Clipboard -Value ' '
    throw "Clipboard does not hold an API key. Nothing saved. Click Copy on the key page and run again."
}
$length = $key.Length

$template = @{
    title    = $Title
    category = 'API_CREDENTIAL'
    tags     = @('ai-access', 'TRK-2026-9200')
    notesPlain = 'Saved by tools/Save-ClipboardKeyTo1Password.ps1 (TRK-2026-9200). Value never displayed.'
    fields   = @(@{ id = 'credential'; type = 'CONCEALED'; label = 'credential'; value = $key })
} | ConvertTo-Json -Depth 5

try {
    $null = $template | op item create --vault $Vault --format json
}
finally {
    Set-Clipboard -Value ' '
    $key = $null; $template = $null
}

$saved = op item get $Title --vault $Vault --format json | ConvertFrom-Json
Write-Host ("SAVED: '{0}' in vault {1} ({2} characters, value not shown). Clipboard wiped." -f $saved.title, $Vault, $length)

if ($SelfTest) {
    op item delete $Title --vault $Vault
    Write-Host 'SELF-TEST PASSED: dummy item saved, found, and deleted.'
}
