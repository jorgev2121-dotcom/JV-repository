# OVERNIGHT RUN PLAN — 2026-10-11 night → 2026-10-12 08:00 ET
Owner: Jorge Valdes. Planner: ☁️ Cloud. Goal: every item DONE with proof, or BLOCKED with the one reason, by 8:00 AM.
Rule: Claude and Codex only. A free lane (plain scripts) takes everything that needs no AI.

## Lanes (running in parallel)
- **L1 RAMBO 1 (Claude, PC)** — installs and does client/Drive work. Up to 2 sessions at once, ONLY on items in different folders, and each item takes a lock file `C:\AI\state\LOCK_<item>.lock` first. No two sessions ever touch the same file (RI-048).
- **L2 FREE LANE (Windows tasks, zero tokens)** — RAM guard, OCR, panel feeder. Runs 24/7 once installed.
- **L3 RAMBO 2 (Codex)** — non-client builds only (no client data, no Drive).
- **L4 CLOUD (this session)** — writes the scripts ahead of time, checks every hour, relays proof to Jorge (Claude app push + Gmail), and re-sends anything that gets swallowed.

## The list, A to Z (times are targets, ET)
**A. 9:35 PM · Jorge** — paste PASTE-D-069 into the desktop Code tab. Starts L1 now, without waiting for midnight. If he doesn't, L1 starts on its own at midnight.
**B. L1 · ~9:45 PM** — raise the watcher's counter from 12 to 40 runs, and switch lanes only on Claude's real limit message. Test: the counter shows the new cap. Proof: EXECUTED_RAMBO1_RAISE-CLAUDE-RUN-CAP.
**C. L1 → L2 · ~9:55 PM** — the **RAM guard already exists** (CU-RAM-Guard, built 10-10, DIR-0096, every 10 minutes, pauses heavy jobs below 6 GB free). Confirm it is still Ready and its log is growing. Then add **CU-RAM-Heartbeat** (tools/ramguard). It shares the same pause flag and the same 6 GB / 4 GB floors, writes a 1-minute heartbeat to Drive, stops OCR at the 4 GB floor, and watches for new processes. **Do not replace or rename CU-RAM-Guard.** Test: the heartbeat updates every minute. Proof: EXECUTED_RAMBO1_RAM-GUARD.
**D. L1 · ~10:00 PM** — panel step 0: ask the Copilot app and search the disk for Copilot's design, then screenshot the candidates. Stops for Jorge's pick. Proof: EXECUTED_RAMBO1_PANEL-CANDIDATES.
**E. L1 → L2 · ~10:15 PM (in parallel with D)** — install **OCR 24/7** (tools/ocr). Test: the count goes up across two heartbeats 5 minutes apart. Proof: EXECUTED_RAMBO1_OCR-24-7. Then it runs all night.
**F. L1 → L2 · ~10:30 PM** — install the **panel feeder** (tools/panel, every 2 minutes) against the installed v5, so the panel shows live data tonight. When Jorge picks Copilot's design, the same feeder is pointed at it. Test: two screenshots 4 minutes apart with the clock moving. Proof: EXECUTED_RAMBO1_WIRE-VTES-PANEL.
**G. L1 · ~11:00 PM** — Joey/Grok hub check: how Joey takes work, plus one test message (SuperGrok only, never an API key). Proof: verdict file.
**H. L1 · ~11:30 PM** — Rambo 1 / Rambo 2 lane split in the router, plus 2 panel tiles. Test: one test order through each lane.
**I. L1 · ~12:30 AM** — usage governor: check what exists, then build the real-limit switch, the usage log and a 15-minute heartbeat.
**J. L1 · ~1:30 AM** — Orange Tree live deploy v3: render, the big red timestamp, alerts, with OCR status coming from E.
**K. L1 · ~3:00 AM (client documents, saves copies only)** — file the 32 email attachments into the job folders (Jorge approved). Undo list included.
**L. L1 · ~4:30 AM (read-only)** — desktop and taskbar AI icons: inventory, screenshot and proposed clean layout. Nothing moves without Jorge's yes.
**M. L1 · ~5:00 AM (read-only first)** — 1Password one-source-of-truth and the duplicate Copilot sign-in: finish everything the PC can do alone, and name the one owner click only if it's unavoidable.
**N. L4 · every hour, 10:16 PM to 8:16 AM** — the cloud checks every proof, retries swallowed orders once, and alerts if the OCR, RAM guard or panel heartbeat goes stale.
**O. L4 · 7:30 AM** — the **morning report** to Jorge by push and email. It covers each item A–M as DONE (proof file), BLOCKED (one reason) or IN PROGRESS, plus the OCR denominator ("N of M PDFs") and the RAM guard's worst minute.

## Needs Jorge (cannot finish without him, will be waiting in the morning report)
1. A — the paste (optional; midnight is the fallback).
2. D — pick which screenshot is Copilot's design.
3. L — yes or no on the clean icon layout.
4. M — at most one 1Password click, and only if the PC proves it can't do it alone.

## Safety
- RAM guard first, before any heavy job.
- OCR writes only new sidecar files.
- Filing saves copies only.
- No sends, no spending, no deletes, no passwords.

## Clarification (cloud, 01:50Z) — panel order v2 vs. plan item F
The panel order v2 says to STOP after step 0. **That STOP covers only the design switch and the desktop shortcut.** Installing the data feeder (tools/panel/Install-VTES5-Feeder.ps1) against the installed v5 is plan item F and goes ahead tonight. It changes only the 7 data files, so the panel shows real data instead of NO DATA. When Jorge picks Copilot's design, the feeder gets pointed at it.
Known feeder gaps (from its builder; to be fixed after it runs on the PC):
- The health "daily report sent" field has no source yet, so it stays red.
- Housekeeping and money show NO DATA.
- Tokens show NO DATA until the governor (item I) exists.
- The Orange Tree time appears as a status row, not in big red. That's a later page change, after the design pick.
All scripts in tools/ocr, tools/ramguard and tools/panel parse with 0 errors under PowerShell 7.4. They have NOT yet been run under Windows PowerShell 5.1 on the PC, so Rambo 1 tests each one before it reports DONE.
