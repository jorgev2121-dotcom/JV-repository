<#
OP-Group-Tag-And-Rotation-Worklist  ·  TRK-2026-10050  ·  v1  ·  2026-11-08
Replaces the pasted one-liner that re-titled EVERY item in the Personal vault and
overwrote EVERY password in it with a random string.

Governing rule (TRK-2026-9346 Section A): no executor ever sees, types, stores or
transmits a password value. Section B: during SUPERVISED work, Jorge clicks and accepts
1Password's own generated suggestion. This script therefore:

  DOES   - sign-in check (op whoami)
         - selects ONLY the items that belong to the group (by existing hashtag, by
           website pattern, or by an explicit id list) - never the whole vault unless
           you pass -All on purpose
         - DRY RUN by default: prints what it WOULD change and writes the worklist
         - with -Apply: prefixes the title with "[Group]" and merges the hashtags
         - writes a ROLLBACK script that restores every original title and tag set
         - writes a ROTATION WORKLIST (CSV) naming which items need a new password and
           which of those need Jorge's yes first - so the rotation can be done item by
           item, on the real website, with 1Password generating and saving the value

  NEVER  - reads, prints, generates or writes a password, OTP or any concealed field
         - deletes or moves an item
         - runs unattended: run it at the desktop with 1Password unlocked and Jorge present

Why the password step was removed entirely (not just gated):
  `op item edit <id> password=...` changes the value stored in the VAULT ONLY. The
  website still has the old password. Every account touched would stop working at the
  next sign-in, and nothing in the vault would say which ones. A rotation is a
  website action: open the site, Change Password, let 1Password generate + save.

Output (local only, never into this repo, never to Drive-shared folders):
  C:\Users\JV\OneDrive\Documents\Reports\RII\<yyyy-MM-dd>\
  C:\Users\JV\OneDrive\Documents\Reports\Undo_Manifests\Rollback_OP-Titles_<date>_<HHmm>.ps1

Examples:
  .\OP-Group-Tag-And-Rotation-Worklist_TRK-2026-10050.ps1                 # dry run, default scope
  .\OP-Group-Tag-And-Rotation-Worklist_TRK-2026-10050.ps1 -Apply          # apply titles + tags
  .\OP-Group-Tag-And-Rotation-Worklist_TRK-2026-10050.ps1 -ItemIds a1,b2  # exact items only

TRK-2026-10050 · v1 · 2026-11-08 · CURRENT
#TRK-2026-9346 #1Password #MiamiDade #Legalization #OwnerApprovalRequired
#>

[CmdletBinding()]
param(
    [string]   $VaultName  = "Personal",
    [string]   $GroupName  = "Permitting & Legalization",
    [string[]] $Hashtags   = @("#MiamiDade", "#Legalization", "#OwnerApprovalRequired"),

    # SCOPE - an item is in the group when ANY of these match. Default is NOT the whole vault.
    [string]   $MatchUrl   = "miamidade|miamidadeclerk|miamidadepa|miamigov|miamibeachfl|ppines|broward|coralgables|hialeah|doral|floridabuilding|myfloridalicense|sunbiz|accela|citizenserve|energov|tylerhost",
    [string[]] $MatchTags  = @("#MiamiDade", "#Legalization", "#Permitting"),
    [string[]] $ItemIds    = @(),
    [switch]   $All,       # take every item in the vault - only if you really mean it

    # Items whose title matches this need Jorge's yes before ANY rotation
    [string]   $OwnerTitlePattern = "Admin|Master|Primary|Financial|Bank|Payroll|IRS|Tax",

    [switch]   $Apply,     # without it nothing in 1Password changes
    [string]   $OutDir     = "$env:USERPROFILE\OneDrive\Documents\Reports\RII\$(Get-Date -Format yyyy-MM-dd)",
    [string]   $UndoDir    = "$env:USERPROFILE\OneDrive\Documents\Reports\Undo_Manifests"
)

$ErrorActionPreference = "Stop"
$stamp = Get-Date -Format "yyyy-MM-dd_HHmm"
New-Item -ItemType Directory -Path $OutDir  -Force | Out-Null
New-Item -ItemType Directory -Path $UndoDir -Force | Out-Null

Write-Host "== TRK-2026-10050 · 1Password group tag + rotation worklist ==" -ForegroundColor Cyan
Write-Host ("Mode: {0}" -f $(if ($Apply) { "APPLY (titles + tags only)" } else { "DRY RUN (nothing changes)" }))

# -- Step 1: signed in? --------------------------------------------------------------
try {
    $who = op whoami --format=json | ConvertFrom-Json
} catch {
    Write-Host "BLOCKED: 'op whoami' failed. Start the 1Password desktop app, unlock it, and turn on Settings > Developer > Integrate with 1Password CLI. Then run again." -ForegroundColor Red
    exit 2
}
Write-Host ("Signed in as {0}" -f $who.email)

# -- Step 2: list the vault -----------------------------------------------------------
$items = op item list --vault $VaultName --format json | ConvertFrom-Json
Write-Host ("Vault '{0}': {1} items total" -f $VaultName, $items.Count)

# -- Step 3: select the group ----------------------------------------------------------
$selected = @()
foreach ($it in $items) {
    $urls = @()
    if ($it.urls) { $urls = @($it.urls | ForEach-Object { $_.href }) }
    $tags = @()
    if ($it.tags) { $tags = @($it.tags) }

    $inScope = $false
    if ($All)                                                { $inScope = $true }
    elseif ($ItemIds.Count -gt 0 -and $ItemIds -contains $it.id) { $inScope = $true }
    elseif ($ItemIds.Count -eq 0) {
        if ($MatchUrl -and (($urls -join " ") -match $MatchUrl))                 { $inScope = $true }
        foreach ($t in $MatchTags) { if ($tags -contains $t)                     { $inScope = $true } }
    }
    if (-not $inScope) { continue }

    $alreadyPrefixed = $it.title.StartsWith("[$GroupName]")
    $newTitle = if ($alreadyPrefixed) { $it.title } else { "[$GroupName] $($it.title)" }
    $newTags  = @($tags + $Hashtags) | Where-Object { $_ } | Select-Object -Unique
    $requiresOwner = ($tags -contains "#OwnerApprovalRequired") -or ($it.title -match $OwnerTitlePattern)

    $selected += [pscustomobject]@{
        Id            = $it.id
        Title         = $it.title
        NewTitle      = $newTitle
        Vault         = $VaultName
        Websites      = ($urls -join "; ")
        OldTags       = ($tags -join ",")
        NewTags       = ($newTags -join ",")
        TitleChange   = -not $alreadyPrefixed
        TagChange     = (@($newTags).Count -ne @($tags).Count)
        RequiresOwner = $requiresOwner
        RotationStep  = $(if ($requiresOwner) { "ASK JORGE FIRST, then rotate on the website with 1Password generating" } else { "Rotate on the website with 1Password generating (Section B pre-approval)" })
        Updated       = $it.updated_at
    }
}

Write-Host ("Selected for group '{0}': {1} of {2}" -f $GroupName, $selected.Count, $items.Count)
if ($selected.Count -eq 0) { Write-Host "Nothing matched the scope. Widen -MatchUrl / -MatchTags or pass -ItemIds."; exit 0 }
if (-not $All -and $selected.Count -gt [math]::Max(5, [int]($items.Count * 0.5))) {
    Write-Host ("WARNING: {0} of {1} items matched. That is more than half the vault. Check the scope before using -Apply." -f $selected.Count, $items.Count) -ForegroundColor Yellow
}

# -- Step 4: worklist + rollback (always written, even in dry run) ----------------------
$csv = Join-Path $OutDir "OP-ROTATION-WORKLIST_TRK-2026-10050_$stamp.csv"
$selected | Export-Csv -Path $csv -NoTypeInformation -Encoding UTF8
Write-Host "Worklist written: $csv"

$undo = Join-Path $UndoDir "Rollback_OP-Titles_$stamp.ps1"
$lines = @("# Rollback for TRK-2026-10050 run at $stamp - restores original titles and tags. Run at the desktop with 1Password unlocked.")
foreach ($s in $selected) {
    $t = $s.Title.Replace('"', '`"')
    if ($s.OldTags) {
        $lines += ('op item edit "{0}" --vault "{1}" --title "{2}" --tags "{3}" | Out-Null' -f $s.Id, $s.Vault, $t, $s.OldTags)
    } else {
        $lines += ('op item edit "{0}" --vault "{1}" --title "{2}" | Out-Null   # had no tags; remove the added ones by hand in the app' -f $s.Id, $s.Vault, $t)
    }
}
$lines | Set-Content -Path $undo -Encoding UTF8
Write-Host "Rollback written: $undo"

# -- Step 5: show the plan -------------------------------------------------------------
$selected | Select-Object Title, NewTitle, RequiresOwner, Websites | Format-Table -AutoSize | Out-String -Width 200 | Write-Host

# -- Step 6: apply titles + tags (never the password) ------------------------------------
if (-not $Apply) {
    Write-Host "DRY RUN complete. Nothing in 1Password was changed. Re-run with -Apply to set titles and tags." -ForegroundColor Green
    exit 0
}

$changed = 0; $skipped = 0; $failed = 0
foreach ($s in $selected) {
    if (-not $s.TitleChange -and -not $s.TagChange) { $skipped++; continue }
    try {
        op item edit $s.Id --vault $s.Vault --title $s.NewTitle --tags $s.NewTags | Out-Null
        $changed++
    } catch {
        $failed++
        Write-Host ("FAILED on '{0}': {1}" -f $s.Title, $_.Exception.Message) -ForegroundColor Red
    }
}

# -- Step 7: verify by reading back ------------------------------------------------------
$verifyOk = 0
foreach ($s in $selected) {
    $after = op item get $s.Id --vault $s.Vault --format json | ConvertFrom-Json
    if ($after.title -eq $s.NewTitle) { $verifyOk++ }
}
Write-Host ""
Write-Host ("RESULT: changed {0}, already correct {1}, failed {2}. Read-back verified {3} of {4} titles." -f $changed, $skipped, $failed, $verifyOk, $selected.Count) -ForegroundColor Green
Write-Host "Passwords: 0 read, 0 written (by design). Next: work the worklist CSV top to bottom on each website with Jorge present."
