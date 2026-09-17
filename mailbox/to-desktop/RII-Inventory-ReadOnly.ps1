<#
RII (RAMBO Identity Intelligence) — read-only 1Password inventory
TRK-2026-9348 (the audit run), scoped per TRK-2026-9346 Section A: no executor ever
sees, types, stores, or transmits a password value.

What this script does:
  - Verifies `op` CLI sign-in (op whoami)
  - Lists vaults (op vault list)
  - Lists Login items per vault (op item list) — title, urls, tags, vault, updated_at
  - Reads ONLY the username field per item (op item get --fields label=username)
  - NEVER requests, reveals, or prints the password/OTP/concealed fields
  - NEVER modifies, rotates, or deletes anything (read-only start to finish)

What this script does NOT do:
  - It does not rank by real usage — the op CLI does not expose usage-frequency data.
    "Top 60" below is a labeled heuristic (recency + identity-group weight), not
    actual most-used accounts. Say so in the summary; do not present it as measured.

Run this on the desktop, with Jorge present and 1Password unlocked. It must NOT be
run from a cloud/headless session — there is no vault to connect to from there.

Output goes to a LOCAL folder only, never into this git repo and never committed:
  C:\Users\JV\OneDrive\Documents\Reports\RII\<yyyy-MM-dd>\
Usernames/emails are personal data even without passwords — keep this folder local.
#>

param(
    [string]$OutDir = "$env:USERPROFILE\OneDrive\Documents\Reports\RII\$(Get-Date -Format yyyy-MM-dd)"
)

$ErrorActionPreference = "Stop"

function Get-IdentityGroup($title, $urls, $vaultName) {
    $haystack = (@($title, $vaultName) + $urls) -join " " | Select-Object -First 1
    $haystack = ((@($title, $vaultName) + $urls) -join " ").ToLower()
    switch -Regex ($haystack) {
        "teamusasales|cu-inspections"                      { return "TeamUSASales" }
        "miamidade|miamidadeclerk|miamidadepa|miamibeachfl|ppines|broward|miamigov" { return "Miami-Dade" }
        "myfloridalicense|floridabuilding|sunbiz"          { return "MDC" }
        "microsoftonline|office365|outlook\.com|\.onmicrosoft\.com" { return "Microsoft" }
        "google\.com|gmail\.com|myaccount\.google"         { return "Google" }
        "bank|chase|wellsfargo|bofa|citi|usbank"           { return "Banking" }
        default                                            { return "Vendors" }
    }
}

New-Item -ItemType Directory -Path $OutDir -Force | Out-Null

Write-Host "== Step 1: op whoami =="
$whoami = op whoami --format=json | ConvertFrom-Json
Write-Host "Signed in as: $($whoami.email) ($($whoami.url))"

Write-Host "== Step 2: op vault list =="
$vaults = op vault list --format=json | ConvertFrom-Json
Write-Host "Vaults found: $($vaults.Count)"

$rows = @()
foreach ($vault in $vaults) {
    Write-Host "-- Scanning vault: $($vault.name) --"
    $items = op item list --vault $vault.id --categories Login --format=json | ConvertFrom-Json
    foreach ($item in $items) {
        $username = $null
        try {
            $userField = op item get $item.id --fields "label=username" --format=json 2>$null | ConvertFrom-Json
            $username = $userField.value
        } catch {
            $username = $null
        }
        $urls = @($item.urls | ForEach-Object { $_.href })
        $rows += [pscustomobject]@{
            Id           = $item.id
            Title        = $item.title
            Username     = $username
            Websites     = ($urls -join "; ")
            Vault         = $vault.name
            Tags         = ($item.tags -join "; ")
            LastModified = $item.updated_at
            IdentityGroup = Get-IdentityGroup $item.title $urls $vault.name
        }
    }
}

Write-Host "== Step 3: writing Inventory.csv =="
$rows | Export-Csv -Path "$OutDir\Inventory.csv" -NoTypeInformation

Write-Host "== Step 4: duplicate detection =="
$dupUrls  = $rows | Where-Object { $_.Websites } | Group-Object Websites  | Where-Object { $_.Count -gt 1 }
$dupUsers = $rows | Where-Object { $_.Username } | Group-Object Username | Where-Object { $_.Count -gt 1 }
$dupTitles = $rows | Group-Object Title | Where-Object { $_.Count -gt 1 }

$dupRows = @()
$dupUrls  | ForEach-Object { foreach ($r in $_.Group) { $dupRows += [pscustomobject]@{Type="Website"; Key=$_.Name; Title=$r.Title; Vault=$r.Vault} } }
$dupUsers | ForEach-Object { foreach ($r in $_.Group) { $dupRows += [pscustomobject]@{Type="Username"; Key=$_.Name; Title=$r.Title; Vault=$r.Vault} } }
$dupTitles | ForEach-Object { foreach ($r in $_.Group) { $dupRows += [pscustomobject]@{Type="Title"; Key=$_.Name; Title=$r.Title; Vault=$r.Vault} } }
$dupRows | Export-Csv -Path "$OutDir\Duplicates.csv" -NoTypeInformation

$missingUrl  = ($rows | Where-Object { -not $_.Websites }).Count
$missingUser = ($rows | Where-Object { -not $_.Username }).Count

Write-Host "== Step 5: identity map + url map =="
$identityMap = $rows | Group-Object IdentityGroup | ForEach-Object {
    [pscustomobject]@{ Group = $_.Name; Count = $_.Count; Titles = ($_.Group.Title -join "; ") }
}
$identityMap | ConvertTo-Json -Depth 4 | Out-File "$OutDir\IdentityMap.json"

$urlMap = $rows | Where-Object { $_.Websites } | ForEach-Object {
    [pscustomobject]@{ Title = $_.Title; Websites = $_.Websites; Group = $_.IdentityGroup }
}
$urlMap | ConvertTo-Json -Depth 4 | Out-File "$OutDir\UrlMap.json"

Write-Host "== Step 6: Top 60 heuristic (recency + group weight — NOT real usage data) =="
$groupWeight = @{ "TeamUSASales"=5; "Miami-Dade"=4; "MDC"=4; "Microsoft"=3; "Google"=3; "Banking"=5; "Vendors"=1 }
$top60 = $rows | Sort-Object -Property @{Expression={
    $w = $groupWeight[$_.IdentityGroup]; if (-not $w) { $w = 0 }
    $w
}; Descending=$true}, @{Expression="LastModified"; Descending=$true} | Select-Object -First 60
$top60 | Export-Csv -Path "$OutDir\Top60.csv" -NoTypeInformation

Write-Host "== Step 7: Summary.md =="
$summary = @"
# RII read-only inventory — $(Get-Date -Format "yyyy-MM-dd HH:mm")

Account: $($whoami.email)
Vaults: $($vaults.Count)
Total login items: $($rows.Count)

Duplicate websites: $($dupUrls.Count)
Duplicate usernames: $($dupUsers.Count)
Duplicate titles: $($dupTitles.Count)
Missing website: $missingUrl
Missing username: $missingUser

Identity groups:
$(($identityMap | ForEach-Object { "- $($_.Group): $($_.Count)" }) -join "`n")

**Top 60 is a heuristic (recency + identity-group weight) — this CLI does not expose
real usage frequency, so this is NOT a measured "most used" ranking. Say so if this
report is read aloud or forwarded.**

No password, passkey, MFA secret, recovery code, token, or cookie value was read,
displayed, or exported at any point in this run. No item was modified, rotated, or
deleted. Output is local-only: $OutDir — do not commit this folder to the repo, it
contains real usernames/emails per account.
"@
$summary | Out-File "$OutDir\Summary.md"

Write-Host ""
Write-Host "DONE. Reports written to: $OutDir"
Write-Host "Items: $($rows.Count) | Duplicates (url/user/title): $($dupUrls.Count)/$($dupUsers.Count)/$($dupTitles.Count) | Missing url/user: $missingUrl/$missingUser"
