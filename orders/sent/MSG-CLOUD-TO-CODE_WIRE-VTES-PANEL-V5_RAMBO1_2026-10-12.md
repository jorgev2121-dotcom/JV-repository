# MSG-CLOUD-TO-CODE — WIRE THE VTES CONTROL PANEL v5 (Rambo 1, Claude lane only). QUEUE POSITION 2 OF 7 — CRITICAL.
From: ☁️ CODE · CLOUD / WEB EXECUTOR · 2026-10-12
Lane: CLAUDE ONLY (needs G:\ Drive). Codex: do not run this; leave it unhandled.
Run right after RAISE-CLAUDE-RUN-CAP. Jorge, 2026-10-12: "Critical is update the VTES control panel and have it wired. That's where I live and I need that running like a Swiss watch."

## What the cloud found (read-only, 2026-10-12 01:15Z)
The v5 panel at G:\My Drive\MY-DESK\VTES-PANEL\v5-live\ is installed but EMPTY:
- All 7 files in v5-live\data\ (vtes5-heartbeat/state/bots/health/tokens/housekeeping/miamidade.js) are 125–133-byte stubs written 2026-10-10 08:55 and never updated since. The heartbeat reads `"at": null, "writer": "not written yet"`.
- vtes5-config.js has `status_dir_url: ""`, so the page doesn't look for live status at all.
- No desktop shortcut was made.
**Root cause: the page was installed, but nothing feeds it.** That's why Jorge sees "no evidence."

## Do (back up every file you change as .bak-20261012)
1. **Feeder.** Write ONE script, VTES5-Feeder.ps1, run by ONE scheduled task (CU-VTES5-Feeder) every 2 minutes. It rewrites all 7 data files from real sources, in the shape vtes5-live.js's sanitiser expects:
   - heartbeat: now, writer = CU-VTES5-Feeder.
   - state / bots: RAMBO 1 (Claude) and RAMBO 2 (Codex). For each: working / idle / waiting-for-reset, Claude runs used today out of the cap, queue count from the VTES-Inbox _LEDGER.csv, and the last EXECUTED_ file name and time.
   - health: the poller heartbeat age, _UPTIME-HEARTBEAT age, the Orange Tree index time (show it in big red, as Jorge asked), and the reconciler crisis flag.
   - tokens: from the usage governor's _LLM-USAGE-LOG / heartbeat once it exists. Until then write "governor not built yet (order queued)". Never invent a number.
   - housekeeping / miamidade: keep the current content, plus a written-at time.
   - Write each file to a temp name, then rename it, so the page never reads half a file.
2. **Config.** Set status_dir_url so the page reads the live data, or confirm the page already reads data\ every cycle.
3. **Stale = red.** Any tile whose source is more than 10 minutes old shows STALE in red, with its age. A dead feeder must look dead.
4. **Shortcut.** Put a desktop shortcut "VTES PANEL" pointing at VTES-LLM-LAUNCHER_v5.html. It opens on the visible monitor (RI-023: FancyZones, monitor 1 only). Keep the old panel's shortcut, renamed "VTES PANEL (old)".
5. **Verify.** Run v5-live\VERIFY-v5.ps1 if it exists. Then take two screenshots 4 minutes apart showing the heartbeat time moving.

## Proof
EXECUTED_RAMBO1_WIRE-VTES-PANEL-V5_2026-10-12.md with:
- The VERIFY output.
- The two screenshot paths.
- The 7 data files' sizes and times, taken twice, 4 minutes apart.
- The task name and its next run time.
- The shortcut path.
Undo: disable CU-VTES5-Feeder, restore the .bak files and delete the shortcut.

Does the heartbeat on the panel move every 2 minutes?
