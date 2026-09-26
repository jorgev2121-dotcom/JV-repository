# 9ROUTER-WIRED-PROOF.md

**Generated:** 2026-09-26T14:17:00Z  
**Blocker:** 9ROUTER-WIRE-NOW  
**Status:** CONFIGURATION COMPLETE — AWAITING DESKTOP VERIFICATION

---

## Architecture: 9Router Integration

### Configuration State

**✅ COMPLETE:** Settings.json with router configuration merged  
**Location:** `.claude/settings.json`  
**Router Settings:**
```json
{
  "router": {
    "enabled": true,
    "provider": "9router",
    "base_url": "http://localhost:20128",
    "api_version": "v1",
    "timeout_seconds": 30,
    "fallback_to_claude": true,
    "model_mapping": {
      "opusplan": "claude-opus-5-5"
    }
  }
}
```

**Model Preservation:**  
`opusplan` default → `claude-opus-5-5` (Opus maintained as primary)

---

## Code Lanes Wiring

### Lane Configuration

| Lane | Executor | Model | Route Through Router | Fallback |
|------|----------|-------|----------------------|----------|
| **default** | claude | claude-opus-5-5 | ✅ Yes | — |
| **LANE:CHATGPT** | codex | gpt-4-turbo | ❌ No (Codex direct) | claude |
| **LANE:DESIGN** | claude | claude-opus-5-5 | ✅ Yes | — |

### Fallback Path

When 9Router unavailable at localhost:20128:
1. Router health check fails (timeout or connection refused)
2. Automatic fallback to Claude direct
3. Lane routing preserved; workload continues
4. Fallback logged to `.claude/fallback.log`

---

## Verification Required (Desktop)

**To complete this blocker, run on Jorge's desktop:**

```powershell
# 1. Verify 9Router API responding at localhost:20128
curl -i http://localhost:20128/v1/health

# Expected response: 200 OK, JSON status body

# 2. Test lane routing through router
$headers = @{
    "Authorization" = "Bearer $env:CLAUDE_API_KEY"
    "X-Lane" = "default"
}
$body = @{
    "messages" = @(@{ "role" = "user"; "content" = "hello" })
    "model" = "claude-opus-5-5"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:20128/v1/messages" `
  -Method POST `
  -Headers $headers `
  -Body $body

# Expected: 200 OK with message response

# 3. Confirm routing configuration
Test-Path "$env:USERPROFILE\.claude\settings.json" -PathType Leaf
Get-Content "$env:USERPROFILE\.claude\settings.json" | ConvertFrom-Json | Select -ExpandProperty router
```

---

## Status: READY FOR DESKTOP VERIFICATION

| Item | Status | Evidence |
|------|--------|----------|
| Router config in settings.json | ✅ Complete | File committed to repo |
| Model default preserved | ✅ Complete | opusplan → claude-opus-5-5 |
| Lane routing defined | ✅ Complete | All three lanes configured |
| Fallback to Claude enabled | ✅ Complete | fallback_to_claude: true |
| API health check ready | ⏳ Pending Desktop | Requires local access |
| Lane test execution | ⏳ Pending Desktop | Requires router running |

---

## Next Step

Desktop executor: Run verification commands above and confirm:
- [ ] 9Router responds to `/v1/health` at localhost:20128
- [ ] Message API test returns 200 OK
- [ ] Settings.json loads with router config

Once verified, update this document with verification timestamp and mark **BLOCKER 1 CLEARED**.

