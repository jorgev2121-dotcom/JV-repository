# =============================================================================
# ADD-GEMINI-KEY.ps1
# TRK-2026-9200 | VTS Multi-LLM Panel | 2026-09-29
#
# PURPOSE: Lets Jorge paste his Gemini API key once.
#          Saves it to 1Password AND as a permanent Windows environment variable.
#          Runs a live health check to confirm the panel is working.
#
# RUN: Right-click → Run with PowerShell  (no typing needed)
# =============================================================================

Add-Type -AssemblyName Microsoft.VisualBasic
Add-Type -AssemblyName System.Windows.Forms

# ---------- STEP 1: Ask Jorge to paste the key --------------------------------
$apiKey = [Microsoft.VisualBasic.Interaction]::InputBox(
    "Paste your Gemini API key below." + [Environment]::NewLine + [Environment]::NewLine +
    "Where to get it (FREE, 2 minutes):" + [Environment]::NewLine +
    "  aistudio.google.com/app/apikey" + [Environment]::NewLine + [Environment]::NewLine +
    "The key starts with  AIzaSy  and is about 39 characters." + [Environment]::NewLine +
    "Just paste and click OK — nothing else to do.",
    "VTS Panel — Add Gemini Key (TRK-2026-9200)",
    ""
)

if ([string]::IsNullOrWhiteSpace($apiKey)) {
    [System.Windows.Forms.MessageBox]::Show(
        "No key entered. Script cancelled — nothing was changed.",
        "Cancelled", "OK", "Information"
    )
    exit 0
}

$apiKey = $apiKey.Trim()

# ---------- STEP 2: Basic format check ----------------------------------------
if ($apiKey.Length -lt 20 -or -not $apiKey.StartsWith("AIza")) {
    [System.Windows.Forms.MessageBox]::Show(
        "That does not look like a Gemini key." + [Environment]::NewLine + [Environment]::NewLine +
        "Expected: starts with AIzaSy, about 39 characters." + [Environment]::NewLine +
        "Got: " + $apiKey.Substring(0, [Math]::Min(12, $apiKey.Length)) + "..." + [Environment]::NewLine + [Environment]::NewLine +
        "Get the correct key at: aistudio.google.com/app/apikey",
        "Invalid Key — Nothing Saved", "OK", "Warning"
    )
    exit 1
}

$log = @()
$log += "ADD-GEMINI-KEY run — $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$log += "Key prefix: $($apiKey.Substring(0,10))..."

# ---------- STEP 3: Save to Windows environment (permanent) -------------------
try {
    [System.Environment]::SetEnvironmentVariable("GEMINI_API_KEY", $apiKey, "User")
    $env:GEMINI_API_KEY = $apiKey
    $log += "Windows env var GEMINI_API_KEY set — User scope (permanent across reboots)."
} catch {
    $log += "ERROR setting environment variable: $_"
    [System.Windows.Forms.MessageBox]::Show(
        "Failed to set Windows environment variable." + [Environment]::NewLine + $_,
        "Error", "OK", "Error"
    )
    exit 1
}

# ---------- STEP 4: Save to 1Password (if CLI is available and signed in) -----
$opPath = Get-Command op -ErrorAction SilentlyContinue
if ($opPath) {
    try {
        # Check if already signed in
        $whoami = & op whoami 2>&1
        if ($LASTEXITCODE -eq 0) {
            # Create the item
            $itemArgs = @(
                "item", "create",
                "--category=API Credential",
                "--title=Gemini API Key (VTS Panel TRK-2026-9200)",
                "credential[password]=$apiKey",
                "--tags=vts-panel,gemini,api-key"
            )
            $result = & op @itemArgs 2>&1
            if ($LASTEXITCODE -eq 0) {
                $log += "1Password: item created successfully."
            } else {
                # Try update if it already exists
                $updateResult = & op item edit "Gemini API Key (VTS Panel TRK-2026-9200)" "credential[password]=$apiKey" 2>&1
                if ($LASTEXITCODE -eq 0) {
                    $log += "1Password: existing item updated."
                } else {
                    $log += "1Password: create and update both failed — $result"
                }
            }
        } else {
            $log += "1Password CLI found but not signed in (op whoami failed). Key saved to environment only."
            $log += "To sign in: open 1Password desktop app, then re-run this script."
        }
    } catch {
        $log += "1Password CLI error: $_ — Key saved to environment only."
    }
} else {
    $log += "1Password CLI (op) not installed — key saved to environment only."
    $log += "Environment variable is permanent and sufficient for the VTS panel to run."
}

# ---------- STEP 5: Run a live health check ------------------------------------
$scriptDir  = Split-Path -Parent $MyInvocation.MyCommand.Path
$panelPath  = Join-Path $scriptDir "vts_llm_panel.py"
$healthOutput = ""

if (Test-Path $panelPath) {
    try {
        $healthOutput = & python $panelPath --health 2>&1 | Out-String
        $log += "Health check output:"
        $log += $healthOutput
    } catch {
        $log += "Health check failed to run: $_"
    }
} else {
    $log += "Panel script not found at $panelPath — health check skipped."
}

# ---------- STEP 6: Write a result log ----------------------------------------
$logPath = Join-Path $scriptDir "ADD-GEMINI-KEY-RESULT.txt"
$log | Out-File -FilePath $logPath -Encoding UTF8
$log += "Result log written to: $logPath"

# ---------- STEP 7: Show Jorge the result -------------------------------------
$geminiStatus = if ($healthOutput -match "gemini\s+LIVE") { "LIVE — Gemini is answering." }
                elseif ($healthOutput -match "gemini\s+NO-KEY") { "NO-KEY — key not loaded yet. Restart PowerShell and re-run health check." }
                elseif ($healthOutput -match "gemini\s+DEAD") { "DEAD — key was set but Gemini rejected it. Check the key at aistudio.google.com." }
                else { "Health check did not run — see log file." }

[System.Windows.Forms.MessageBox]::Show(
    "DONE." + [Environment]::NewLine + [Environment]::NewLine +
    "Gemini status: " + $geminiStatus + [Environment]::NewLine + [Environment]::NewLine +
    "Key saved to:" + [Environment]::NewLine +
    "  Windows environment variable (permanent)" + [Environment]::NewLine +
    "  1Password: see log" + [Environment]::NewLine + [Environment]::NewLine +
    "Full log: " + $logPath + [Environment]::NewLine + [Environment]::NewLine +
    "The VTS panel now uses Gemini first (free), then Grok, then Claude.",
    "VTS Panel — Gemini Key Saved", "OK", "Information"
)
