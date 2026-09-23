# 08 - LLM roster and router status (live check 2026-09-23 ~1:15 PM ET)

**Sources: Drive status folder `1NDadXJz9eKpRbmYrE-CRH2RtKbynQClN` (SOS-LLM_*, FAILED-VERIFICATION_*,
_UPTIME-HEARTBEAT.md), `HEARTBEAT-ROSTER.json`, `../RECURRING-ISSUES.md` RI-038.**

## Who is alive

1. **Cloud Claude Code (outgoing orchestrator): ALIVE.** Opus, about 14.9M tokens left in this session.
   It has repo, Drive, Gmail, Outlook and GitHub tools. It is blocked from county sites and Sunbiz.
2. **Jorge's PC: AWAKE** for 6.2 days (since 9/17 8:16 AM) and set never to sleep. `CU-Uptime-Heartbeat`
   runs every 5 minutes.
3. **Desktop mailbox poller (VTES-LOCAL-POLLER): GREEN** (last run 1:11 PM ET). **Reconciler: GREEN**
   (12:45 PM ET).
4. **Desktop job executor (Claude Code headless, "RAMBO"): ALIVE but UNRELIABLE.**
   - It completed Cowork's e-sign/RON research (REPLY delivered 1:13 PM ET).
   - **It FAILED the Outlook-attachment job** (FAILED-VERIFICATION 12:54 PM, attempt 1 of 2, re-queued once).
   - The payment pop-up job (sent 1:13 PM ET) is pending.
5. **Cowork: UNVERIFIED.** The e-sign research was addressed to Cowork, but the desktop lane
   (RAMBO) answered it. Nothing shows Cowork itself reading the mailbox.

## Local routers: ALL DOWN

1. **`127.0.0.1:4001` and `:4002` (LiteLLM self-hosted router): DOWN.**
2. **`127.0.0.1:11434` (Ollama): DOWN.**
3. **Today's pattern:** SOS alerts at 10:36, 11:00, 11:33, 11:41, 11:45, 12:00 and 12:54 ET, after an
   overnight run of failures 23:32-03:33. **It has flapped 4+ separate times today.**
4. **RI-038, a recurring issue, so patching is not allowed.**
   - Restarting it is a Tier 1 patch. It has failed as a fix since August.
   - **Recommended, Tier 2: remove the self-hosted LiteLLM router.** Call each provider's API directly
     with a verified try-then-fallback order, and keep Ollama only as an optional offline backup.
   - Tier 3, on top of that: the Token + LLM Monitor (module 05) auto-restarts Ollama and routes
     around any dead route.
5. **What the router outage breaks:** only the cheap local-model lane (bulk OCR summaries,
   classification). Claude Code desktop and cloud run on Anthropic's own service, not on these
   routes, so Jorge's main executors keep working.

## Roster (target, per module 05)

1. **Orchestrator: Grok** (owner directive 2026-09-23). **NOT CONNECTED YET.** No repo, Drive or email
   access. The handoff pack was delivered to Jorge as a file (PASTE-X-007).
2. **Backup orchestrator: Claude (Opus)**, meaning this cloud session or the next one.
3. **Executors:** Claude Code desktop (alive, unreliable), then Codex CLI (install waiting on Jorge's
   one sign-in, TRK-2026-9952g).
4. **Consultants:** Claude, ChatGPT, Gemini, plus a light model (Haiku / GPT mini / Gemini Flash).
   **None of them are wired into a shared chat yet** (module 06).
5. **Grok key:** an unused Grok API key already exists inside the LiteLLM config (OPEN-ITEMS
   TRK-2026-9737/9739). If LiteLLM is removed, move that key into the direct-API caller.
