# Owner directives of 2026-10-19, recorded by the cloud executor (EXEC-01) on 2026-10-20 00:30 ET
Why this file exists: the PC ran each of these three directive jobs twice (6 Claude sessions in total, the whole daily cap) and each run ended with FAILED-VERIFICATION (neither an EXECUTED_ nor a BLOCKER_ file). The cloud can read the directives in Drive (folder 00-CONTINUITY-BOARD) and record the standing rules here so every session sees them. CLAUDE.md was NOT edited; Jorge decides whether to promote these into the charter.
Sources (Drive, 00-CONTINUITY-BOARD, all dated 2026-10-19): API-SPEND-HARD-CAP-50 (12:36 AM ET), ARCHITECTURE-V2 (about 12:45 AM ET), VERSIONING-RULE_VTES-PRODUCTS_V1 (1:13 AM ET).
#OWNER-DIRECTIVE #SPEND-CAP #ARCHITECTURE-V2 #VERSIONING

## 1. Spending: $50 a month hard cap on pay-per-use services, default spend zero
- All pay-per-use services combined (model APIs, data APIs, per-record data, cloud browsers, scraping) capped at $50 a month. Spending is zero until a measured need is shown to Jorge in one line. The earlier $300 ceiling is withdrawn.
- No API key is created unless a hard stop is shown on screen (prepaid balance with auto-reload off, or no card on file). Alert-only accounts are not allowed.
- xAI API account and Gemini paid key: paused / never approved. Use flat subscriptions (Claude plan, ChatGPT pool for Codex, SuperGrok) and free tiers on PUBLIC data only. No client scan, tax jacket or owner address goes to a free tier.
- Log every paid call in Drive; show the running total in the 6:00 PM status line; stop and ask at $40; stop at $50.
- Purchases that are not API use (research fees, certified copies, bulk files) each need their own yes.
- This matches CLAUDE.md Article 5 (paid API runs need a cost estimate and Jorge's approval first).

## 2. Architecture V2: cloud first, the PC (RAMBO) for exceptions only
- Heavy work runs on stateless scheduled cloud workers (Cowork scheduled tasks, Codex, n8n if ever approved). State lives in Drive; every item writes a checkpoint and exits; jobs are safe to repeat.
- RAMBO acts only on THINK tickets, ERROR tickets and the daily 8:00 AM Access Window. It never owns a batch, a ledger or a site.
- Personal-data jobs stay on the local lane in small checkpointed batches. Codex stays blocked from personal-data jobs.
- Cloud watchdog on the PC heartbeat file: ticket if stale for 30 minutes.
- Daily 6:00 PM status line to Jorge: items DONE WITH PROOF, PARTIAL, BLOCKED.
- The two yeses in that directive (paid Gemini key, n8n Cloud trial) were never given and are not requested.

## 3. Versioning: every major VTES product carries a version in its name
- Names start with VTES; new version = new file, never overwrite; one CURRENT pointer per product; every change logged in the version register; rollback moves the pointer.
- Register at issue time: VTES-DD-55 CURRENT V2; VTES-ABSORB-42 CURRENT V1; VTES-SOLICIT CURRENT V1; VTES-PANEL version unknown (RAMBO to record and name it; the live panel is titled "VTES Control Panel v58 (CURRENT)").

## What the cloud did NOT do
Nothing was bought, enabled or sent. The PC-only items (stamp the panel with a version, set up the cloud watchdog, the 6:00 PM line, the Access Window) remain for the PC or a later cloud step.
