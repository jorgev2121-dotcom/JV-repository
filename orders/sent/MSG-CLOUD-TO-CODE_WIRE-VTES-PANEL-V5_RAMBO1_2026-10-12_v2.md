# MSG-CLOUD-TO-CODE — FIND COPILOT'S PANEL DESIGN, THEN WIRE THE VTES CONTROL PANEL (Rambo 1, Claude lane only). v2. QUEUE POSITION 2 OF 7 — CRITICAL.
Supersedes v1 of this order (trashed). Do STEP 0 first.
From: ☁️ CODE · CLOUD / WEB EXECUTOR · 2026-10-12
Lane: CLAUDE ONLY (needs G:\ Drive). Codex: do not run this; leave it unhandled.
Run right after RAISE-CLAUDE-RUN-CAP. Jorge, 2026-10-12: "Critical is update the VTES control panel and have it wired. That's where I live and I need that running like a Swiss watch."

## What the cloud found (read-only, 2026-10-12 01:15Z)
The v5 panel at G:\My Drive\MY-DESK\VTES-PANEL\v5-live\ is installed but EMPTY:
- All 7 files in v5-live\data\ (vtes5-heartbeat/state/bots/health/tokens/housekeeping/miamidade.js) are 125–133-byte stubs written 2026-10-10 08:55 and never updated since. The heartbeat reads `"at": null, "writer": "not written yet"`.
- vtes5-config.js has `status_dir_url: ""`, so the page doesn't look for live status at all.
- No desktop shortcut was made.
**Root cause: the page was installed, but nothing feeds it.** That's why Jorge sees "no evidence."

## STEP 0 — FIND COPILOT'S DESIGN FIRST (read-only). Jorge, 2026-10-12: "That is not the design that was displayed. By Copilot, which was working on it at the time. Establish contact with Copilot, have him share, and figure out why his design is not being displayed."
The cloud showed Jorge v5 (installed, unfed) and v5.2 (built 10-08 in the repo, never installed). **He says neither is the design Copilot showed him.** Copilot's design is not in Drive, Gmail or GitHub, so it is on this PC or inside Copilot's own history.
1. Contact Copilot. If the GitHub Copilot CLI is installed and signed in (C:\Users\JV\.copilot exists, per the 09-16 index), ask it in ONE prompt with no client data: "Where did you save the VTES control panel design you built for Jorge? Give the file paths and the date." Use the subscription sign-in only; never enter an API key. Also read its saved session history under .copilot for panel or control-panel work. If Copilot was the Microsoft Copilot app (Edge sidebar or the Copilot app), check its local history and Downloads for files it produced.
2. Look on disk for HTML files modified since 2026-09-20 with panel, control, dashboard, VTES, cockpit or launcher in the name or title. Check C:\Users\JV\LLM-Control-Panel, Desktop, Downloads, Documents, OneDrive, C:\AI, and G:\My Drive\MY-DESK. List path, date, size, and which tool made it (from the file header or comments, where it says).
3. Screenshot every candidate in a browser. Upload the screenshots and a list to G:\My Drive\VTES-Outbox\PANEL-CANDIDATES_2026-10-12\, so the cloud can show Jorge.
4. Explain why Copilot's design is not what Jorge sees. Name each desktop shortcut and panel button he uses to open the panel, and the exact file each one opens.
5. Write EXECUTED_RAMBO1_PANEL-CANDIDATES_2026-10-12.md with the list, the screenshots folder, Copilot's answer, and the shortcut targets. **STOP at this point.** Do NOT do the wiring steps below until Jorge picks the design. The cloud will send a GO naming the file.

## After Jorge picks (wire whichever design he picks; back up every file you change as .bak-20261012)
1. **Feeder.** Write ONE script, VTES5-Feeder.ps1, run by ONE scheduled task (CU-VTES5-Feeder) every 2 minutes. It rewrites the panel's data files from real sources, in the shape the page expects:
   - heartbeat: now, writer = CU-VTES5-Feeder.
   - state / bots: RAMBO 1 (Claude) and RAMBO 2 (Codex). For each: working / idle / waiting-for-reset, Claude runs used today out of the cap, queue count from the VTES-Inbox _LEDGER.csv, and the last EXECUTED_ file name and time.
   - health: the poller heartbeat age, _UPTIME-HEARTBEAT age, the Orange Tree index time (show it in big red, as Jorge asked), and the reconciler crisis flag.
   - tokens: from the usage governor's _LLM-USAGE-LOG / heartbeat once it exists. Until then write "governor not built yet (order queued)". Never invent a number.
   - housekeeping / miamidade: keep the current content, plus a written-at time.
   - Write each file to a temp name, then rename it, so the page never reads half a file.
2. **Config.** Set status_dir_url so the page reads the live data, or confirm the page already reads data\ every cycle.
3. **Stale = red.** Any tile whose source is more than 10 minutes old shows STALE in red, with its age. A dead feeder must look dead.
4. **Shortcut.** Put a desktop shortcut "VTES PANEL" pointing at the design Jorge picked. It opens on the visible monitor (RI-023: FancyZones, monitor 1 only). Keep the old panel's shortcut, renamed "VTES PANEL (old)".
5. **Verify.** Run VERIFY-v5.ps1 if it applies. Then take two screenshots 4 minutes apart showing the heartbeat time moving.

## Proof
Step 0: EXECUTED_RAMBO1_PANEL-CANDIDATES_2026-10-12.md (see above).
Wiring: EXECUTED_RAMBO1_WIRE-VTES-PANEL_2026-10-12.md with:
- The VERIFY output.
- The two screenshot paths.
- The data files' sizes and times, taken twice, 4 minutes apart.
- The task name and its next run time.
- The shortcut path.
Undo: disable CU-VTES5-Feeder, restore the .bak files and delete the shortcut.

Which file is Copilot's design, and what does each shortcut open?

Sent to VTES-Inbox 2026-10-12 01:23Z, Drive id 1CUixa-oPj0YEHSZHU5ciSStq0mNEs4DS. v1 (14tM488c66-JWBXQZiHsgW7z1ZLfy3IcY) trashed.
