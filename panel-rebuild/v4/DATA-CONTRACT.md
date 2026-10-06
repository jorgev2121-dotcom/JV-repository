# DATA-CONTRACT - what the PC must write so the v4 panel is never green by default (TRK-2026-9910-B)

Round 2 text (fix round 1, 2026-10-06). Replaces the first version.

Rule (charter Rule 4, Tier 3 enforcement): every status, count and time on the panel is READ from the files below. Nobody types a status.
If a file is missing, or its "at" is empty, the panel shows **NO DATA** in red. If "at" is older than the limit, it shows **STALE since <time>** in red.
**Green appears only when the file is present AND fresh AND says OK.** What "says OK" means is written per file below.
A website answering is never a status. The page shows a separate small "site answers" mark for the four chat sites; it is grey and never the light.

## Format
Each file is a small JavaScript file (not JSON) so it opens from file:// with no server. Pure ASCII. In the SAME folder as the launcher, in the sub-folder `data\`.
A file is exactly two statements, one after the other (a guard, then the assignment):

    window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.NAME = { ...fields... };

Every file has `"schema": 1`, `"at"` = the moment the writer finished (ISO 8601 with offset, e.g. "2026-10-06T14:05:00-04:00") and `"writer"` = the task name.
Write it atomically: write NAME.js.tmp, then rename, so the page never reads half a file. All times are shown to Jorge in Eastern time with the zone.

## ONE heartbeat system, not two
The PC already has a heartbeat writer: `Write-VtesStatus.ps1`, which writes `vtes-status.js` (one entry per window: `st`, `seen`, `note`) every time it is run.
v4 reads that file too (the page loads vtes-status.js). The new poller file below adds what vtes-status.js cannot say (the tick, the vtes:// flags, down, proof).
For one window the page takes whichever report has the newer `seen`. Nobody should build a second, separate "alive" system.
Write-VtesStatus.ps1 only accepts the ids LLM-01..08, LLM-10 and BOTS: the desktop executor adds LLM-09, LOCAL and CHIEF to its list (then re-runs Verify-VtesPanel.ps1 -Build and INSTALL-v4.ps1 so the tamper check knows the new fingerprints).

## The six files
1. `data\vtes4-heartbeat.js`  NAME=heartbeat  writer: the poller (a RAMBO scheduled task)  LIMIT 15 minutes
   Fields:
   - `interval_sec` (number): the REAL tick, e.g. 300. Every "runs every N" sentence on the page comes from this. (No typed timings anywhere.)
   - `vtes_scheme_registered` (true only after VTES-Open.ps1 -Install succeeded on the PC).
   - `addresses_filled`: { "LLM-01": true|false, ... } - the poller READS vtes-addresses.json each tick and records, per window id, whether that entry has a non-empty `url` or `run`. A vtes:// link appears on a card only when `vtes_scheme_registered` is true AND that window's flag is true. A missing flag means false.
   - `executors`: { "LLM-01": {"state":"up|down|unknown","last_seen":"ISO","proof_at":"ISO (chat-only windows)"}, ... }
   The twelve keys: LLM-01, LLM-02, LLM-03, LLM-04, LLM-05, LLM-06, LLM-07, LLM-08, LLM-09, LLM-10, LOCAL, CHIEF (and optionally BOTS).
   "says OK" = the file is fresh. An executor is green only if its state is "up" AND its own last_seen is newer than 3 ticks (3 x interval_sec; if no interval_sec, 3 x 10 minutes, the schedule Write-VtesStatus.ps1 documents).
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
v4 ships all six files with `"at": null`. A fresh install shows NO DATA everywhere until the PC writes real files. INSTALL-v4.ps1 never overwrites a data file that already has a real "at" and never overwrites a vtes-status.js that holds real heartbeats.

## Panel-age stamp
Header shows: "Built <build time, Eastern>, data as of <oldest 'at' among the files that exist>". The line turns red when any file is missing, stale or not OK. The daily HEALTH report should copy the build time into `health.panel_built_at`.

## What the cloud could NOT do
It cannot write these files and has not seen any writer except Write-VtesStatus.ps1 (read from the repo branch executor-tray-icon-1cazza; the live copy is UNVERIFIED). The desktop executor builds the rest: see DESKTOP-WORK.md.
