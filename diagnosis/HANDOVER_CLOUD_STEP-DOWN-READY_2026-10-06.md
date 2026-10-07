# HANDOVER: cloud seat (LLM-02, CODE · CLOUD / WEB EXECUTOR), step-down-ready

**Written 2026-10-06 so a replacement can start in minutes. Not a resignation; Jorge decides.**
**Start here:** read `CLAUDE.md` (the charter), then this file, then the bottom of `OPEN-ITEMS.md` (search `TRK-2026-9960`), then the top of `MORNING-REPORT_2026-09-28.md`, then `diagnosis/`.

## What this seat does
Watches the desktop and the other lanes through Google Drive (VTES-Inbox = orders in, VTES-Outbox = proof out), keeps the repo ledger, reports to Jorge in plain words ending with a question, and never takes a RED action (filing, moving, renaming or deleting client documents, anything outbound, spend, credentials, registry edits).

## The routine each hourly cycle
1. `ReadNotifications`. 2. `git fetch`; any commit not by Claude is news (Jorge merged PR #19 on 10-05 at 4:53 PM ET). 3. Drive search for changes: `DECISION`, `BLOCKER`, `EXECUTED`, `COWORK`, `MSG`, `HANDOVER`, `RECEIPT`, `NEEDS-YOU`, heartbeat. 4. Write to the repo only when something is materially new (row in OPEN-ITEMS, block at the top of the morning report, entry in RECURRING-ISSUES). 5. Reply short, answer first, end with a cheap question.

## Traps
- **Use Drive's `createdTime` for times, never an estimate.** Tonight's file labels ran about an hour ahead of it.
- The Drive connector returns about 5 rows a page; use the page token. Connector tools disconnect and reconnect every cycle: reload with ToolSearch.
- An ACK is a receipt and closes nothing. Look for EXECUTED_ or BLOCKER_.
- `_NEEDS-YOU.json` is written by the Orchestrator and false-flags finished work (four times in three days); treat it as a lead, not a fact.
- Jorge reads by text-to-speech and has dyslexia: short paragraphs, minimal tables, one question at the end.

## Open decisions waiting on Jorge (as of 2026-10-06)
AP-0022 click ($21,200 or $16,000; invoice TUS-26-1033, $10,600) · Plaza status email AP-0048 · the five empty Plaza PDFs · Bay Harbor = "#10000 building" (cloud reads: one job, plan v2 on hold, needs his confirmation and a "go") · Palmer Trust a real job? · archive the shadow root? · 9Router keep removed or restart · the lead-list vendor name · the Zapier yes · "stop CDM or keep going" · Cowork's Fable model · Orchestrator stopped from writing to `_NEEDS-YOU.json` · panel-age line in the daily HEALTH report (Jorge said yes on 10-06).

## Open work waiting on the desktop (RAMBO)
RED-6 close-out · registry next-free-number read (note in VTES-Inbox) · cross-LLM panel diagnosis (note in VTES-Inbox) · RED-4 card-statement half, RED-5, RED-1, RED-3 (ask for payment details by pop-up, never in a file), RED-2 now DEFERRED · unsafe-structures 2021-2026 run (not started as of 10-05 10 PM ET) · cookie-file cleanup · the stale shadow root.

## In flight in this folder
`BRIEF_WINDOW-DIAGNOSIS_2026-10-06.md`, nine `WINDOW-LLM-0N_DIAGNOSIS_*` files, two `LEDGER_*` files, `SELF-EVALUATION_CLOUD_2026-10-06.md`.

TRK-2026-9960 · v1 · 2026-10-06 · CURRENT
