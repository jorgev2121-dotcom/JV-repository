# DATA-CONTRACT - what the PC must write so the v4 panel is never green by default (TRK-2026-9910-B)

Round 4 text (fix round 3, 2026-10-06). Replaces the fix round 2 text. Rules added or changed in fix round 3 are marked (R3).

Rule (charter Rule 4, Tier 3 enforcement): every status, count and time on the panel is READ from the files below. Nobody types a status.
If a file is missing, or its "at" is empty, the panel shows **NO DATA** in red. If "at" is older than the limit, it shows **STALE since <time>** in red.
**Green appears only when the file is present AND fresh AND says OK.** What "says OK" means is written per file below.
A website answering is never a status. The page shows a separate small "site answers" mark for the four chat sites; it is grey and never the light.

## Rules for time, tick and proof (R2)
1. **A time in the future is INVALID.** A file `at`, a window `last_seen` or a `proof_at` more than 2 minutes ahead of the PC clock shows red **BAD CLOCK**, is never green, and its numbers are not shown. (Writer and page share one PC, so 2 minutes is generous.)
2. **Every time on the page is Eastern, short form, with the zone** ("Oct 6, 2:05 PM EDT"). The **year is added whenever it is not the current year** ("Oct 6, 2027, 2:00 PM EDT"). This includes hand-off packet stamps and conversation-pad entries.
3. **`interval_sec` must be a number from 1 to 3600 (R3).** Anything else (below 1 such as 0.001 or 0, negative, text, bigger than 3600) makes the whole heartbeat file red **NOT OK** and every window red. A missing `interval_sec` falls back to 600 seconds (the 10-minute schedule Write-VtesStatus.ps1 documents).
   **The stale limit follows the tick (R3): the heartbeat file and every window's own `last_seen` are STALE after 3 x `interval_sec`, but never sooner than 3 minutes and never later than 3 hours.** So a 5-minute tick goes stale after 15 minutes (as before), a legitimate 30-minute tick after 90 minutes, a 60-minute tick after 3 hours (the cap). The page re-reads once a minute, which is why 3 minutes is the floor. Chat-only windows and BOTS keep their proof for 12 ticks (4 x the limit, so at most 12 hours).
4. **GREEN needs proof from the poller.** A window is green only when `data\vtes4-heartbeat.js` is valid and fresh AND that window's own `executors[id].last_seen` is within 3 ticks AND its state is "up" (chat-only windows also need a fresh `proof_at`). A report that comes only from `vtes-status.js` (Write-VtesStatus.ps1 always writes "up" and checks nothing) shows a grey **"WRITER SAYS UP, NOT PROVEN"**, never green, and is not counted as "confirmed up".
5. **BOTS (Grok bots) (R3)** shows UP only with a poller report that carries proof; otherwise it shows NOT BUILT. It can never show both. **The BOTS proof field is `executors.BOTS.proof_at`**: the moment a Grok bot finished a real task and the poller saw its result file (not a ping, not a login). Without `proof_at`, or with one older than 12 ticks or in the future, the state is NO DATA and the Map says NOT BUILT. The status-only writer cannot supply it. Shape: `"BOTS": {"state":"up","last_seen":"ISO","proof_at":"ISO"}`.
6. **A stale or invalid Miami-Dade file turns every proof mark neutral grey** ("proof not current"). Only a fresh file (7 days) can show a green "proof checked".
7. **The page re-reads every data file, `vtes-status.js` and `vtes-reminders.js` every 60 seconds** (cache-busted) and re-evaluates the header chips, the cards, the top strip and the panels together, so a page left docked all day never contradicts itself. A file that has been deleted counts as NO DATA on the next tick.
8. Optional: `vtes-reminders.js` may set `window.VTES_REMINDERS_AT = "ISO time"`. Without it the bell has a dashed border and says its count may be old. The bell is red only when a reminder is **due today or overdue** (the due DAY, Eastern time, counts as due all day), blue when some are open but none is due, grey when none is open (R3).
   The due date forms read: `YYYY-MM-DD` (what the file really uses; a time after it is ignored), `M/D/YYYY` (US order), `Oct 11, 2026` or `October 11 2026`. An empty date is simply not due. Any other text (or an impossible date such as 2026-13-45) is **flagged by the item's id in the bell's tooltip and counted as due** until it is fixed. If `vtes-reminders.js` is deleted, the bell shows no count at the next tick (R3).
9. **Reload swaps, it never half-empties (R3).** Every 60 seconds the page loads all files into NEW objects and replaces the old ones only when all have answered; a file that fails to load is simply absent (NO DATA). A repaint that happens while files are loading (for example a site-check answer) sees the old, complete state. The site checks run on the same 60-second timer as the reload (every second tick), never on a timer of their own.
10. **Only what changed is redrawn (R3).** A text selection and the Map's note ("Copied.") survive the 60-second tick; the "Re-checked" time is its own node.
11. **The build time is the real build instant (R3).** It is stamped by `build-v4.js` from the clock at build time (it cannot be set by hand) and is held to rule 1: a build time more than 2 minutes ahead of the PC clock shows red BAD CLOCK in the top line, the footer and the status report.

## Format
Each file is a small JavaScript file (not JSON) so it opens from file:// with no server. Pure ASCII. In the SAME folder as the launcher, in the sub-folder `data\`.
A file is exactly two statements, one after the other (a guard, then the assignment):

    window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.NAME = { ...fields... };

Every file has `"schema": 1`, `"at"` = the moment the writer finished (ISO 8601 with offset, e.g. "2026-10-06T14:05:00-04:00") and `"writer"` = the task name.
Write it atomically: write NAME.js.tmp, then rename, so the page never reads half a file. All times are shown to Jorge in Eastern time with the zone.

## ONE heartbeat system, not two
The PC already has a heartbeat writer: `Write-VtesStatus.ps1`, which writes `vtes-status.js` (one entry per window: `st`, `seen`, `note`) every time it is run.
v4 reads that file too: it lives in the v3 folder, and `vtes4-config.js` in the v4 folder (written by INSTALL-v4.ps1) holds the address of that folder (a file: address only; anything else is ignored). v4 never writes there. The page also reads `vtes-reminders.js` from the v3 folder. The new poller file below adds what vtes-status.js cannot say (the tick, the vtes:// flags, down, proof).
For one window the page takes whichever report has the newer `seen`. Nobody should build a second, separate "alive" system.
Write-VtesStatus.ps1 only accepts the ids LLM-01..08, LLM-10 and BOTS. Adding LLM-09, LOCAL and CHIEF to it is a separate, hand-made desktop order outside this package (DESKTOP-WORK.md item 4, with its own backup). Nothing in v4 depends on it, and its entries are never proof (rule 4 above).

## The six files
1. `data\vtes4-heartbeat.js`  NAME=heartbeat  writer: the poller (a RAMBO scheduled task)  LIMIT 3 x interval_sec (3 minutes to 3 hours; 30 minutes when interval_sec is missing)
   Fields:
   - `interval_sec` (number): the REAL tick, e.g. 300. Every "runs every N" sentence on the page comes from this. (No typed timings anywhere.)
   - `vtes_scheme_registered` (true only after VTES-Open.ps1 -Install succeeded on the PC).
   - `addresses_filled`: { "LLM-01": true|false, ... } - the poller READS vtes-addresses.json each tick and records, per window id, whether that entry has a non-empty `url` or `run`. A vtes:// link appears on a card only when `vtes_scheme_registered` is true AND that window's flag is true. A missing flag means false.
   - `executors`: { "LLM-01": {"state":"up|down|unknown","last_seen":"ISO","proof_at":"ISO (chat-only windows)"}, ... }
   The twelve keys: LLM-01, LLM-02, LLM-03, LLM-04, LLM-05, LLM-06, LLM-07, LLM-08, LLM-09, LLM-10, LOCAL, CHIEF (and optionally BOTS).
   "says OK" = the file is fresh and valid (rules 1 and 3). An executor is green only if its state is "up" AND its own last_seen is newer than 3 ticks (3 x interval_sec; if no interval_sec, 3 x 10 minutes) AND not in the future.
2. `data\vtes4-state.js`  NAME=state  writer: the STATE-OF-PLAY exporter  LIMIT 26 hours
   Fields: `open_items` (n), `in_progress` (n), `blocked` (n), `repairs`: [{"id","text","status":"OPEN|DONE"}], `money`: [{"item","status"}]. The page shows all of them (money included, in the Health panel).
3. `data\vtes4-health.js`  NAME=health  writer: the daily HEALTH report task  LIMIT 26 hours
   Fields: `ok` (true/false, REQUIRED), `checks_passed` (n), `checks_total` (n), `panel_built_at` (ISO), `report_sent_at` (ISO or null).
   "says OK" = `ok` is exactly true. `ok:false` shows red "NOT OK". A file with no `ok` field shows red NO DATA.
   The page labels the numbers "health checks passed". It does NOT call them "completion".
4. `data\vtes4-tokens.js`  NAME=tokens  writer: the token monitor  LIMIT 30 minutes
   Fields: `burn_per_hour` (tokens), `window_used_pct` (0-100), `window_resets_at` (ISO), `week_used_pct` (0-100), `programs`: [{"name","tokens_today"}]
   Do not estimate. If the monitor cannot measure, write nothing; the page says NO DATA. "says OK" = fresh.
5. `data\vtes4-housekeeping.js`  NAME=housekeeping  writer: the housekeeping agent  LIMIT 26 hours
   Fields: `last_report_at` (ISO), `report_delivered` (true/false), `delivered_to` (text), `items_cleaned` (n). "says OK" = fresh; delivered=false still shows red.
6. `data\vtes4-miamidade.js`  NAME=miamidade  writer: the Miami-Dade scrape counter  LIMIT 7 days
   Fields: `counted` (n or null), `target` 300, `sources`: [{"id","name","url","proof_url","proof_ok":true|false}]
   **`id` is the two-digit source number as text: "01" to "22"** (a bare number 3 is also accepted and read as "03"). Any other form shows NOT RE-CHECKED.
   Until counted, `counted` is null and the page says "unknown of 300".

## What "up" means for each window
- Windows the poller can see (LLM-01 RAMBO, LLM-02 Cloud, LLM-03 Cowork, LLM-06 Codex, LLM-09 Governor, LOCAL, CHIEF): "up" = the poller saw the process or its own heartbeat within 3 ticks.
- Chat-only windows (LLM-04 Chat, LLM-05 iPhone, LLM-07 Grok, LLM-08 Gemini, LLM-10 Copilot): the poller CANNOT see them. They show red NO DATA until RAMBO records a real test: `state:"up"` with `last_seen` and `proof_at` set to the moment a test message got a real reply. The proof is accepted for 12 ticks (4 times the 3-tick limit); after that the light goes back to red NO DATA. vtes-status.js entries are ignored for these windows.
- Grok (LLM-07) therefore stays red until a test reply exists. That is the true state (see the Grok card).

## Shipped state
v4 ships all six files with `"at": null`, in the NEW v4 folder (INSTALL-v4.ps1 creates that folder fresh and refuses if it already exists, so it can never overwrite a real report). A fresh install shows NO DATA everywhere until the PC writes real files into `<new folder>\data\`. The poller writes the heartbeat file THERE, not into the v3 folder.

## Panel-age stamp
Header shows: "Built <real build time, Eastern>, data as of <oldest 'at' among the files that exist>". The line turns red when any file is missing, stale or not OK. The daily HEALTH report should copy the build time into `health.panel_built_at`.

## What the cloud could NOT do
It cannot write these files and has not seen any writer except Write-VtesStatus.ps1 (read from the repo branch executor-tray-icon-1cazza; the live copy is UNVERIFIED). The desktop executor builds the rest: see DESKTOP-WORK.md.
