# DATA-CONTRACT - what the PC must write so the v5 launcher is never green by default (TRK-2026-9910-B)

Round 5 text, 2026-10-06 (port onto Jorge's real v3 launcher). Same rules as the v4 contract after fix round 3, with these changes: files are named `vtes5-*.js`, there is a seventh file (`vtes5-bots.js`), the reminders bell is gone (v3 has no bell), and the status-only file is read only when INSTALL was given a folder for it. Changes against v4 are marked (V5).

Rule (charter Rule 4, Tier 3 enforcement): every status, count and time on the page is READ from the files below. Nobody types a status.
If a file is missing, or its "at" is empty, the page shows **NO DATA** in red. If "at" is older than the limit, it shows **STALE since <time>** in red.
**Green appears only when the file is present AND fresh AND says OK.** What "says OK" means is written per file below.
Words that ARE typed on the page (descriptions, how-to lines, the repairs log, Grok's 31-day note) are labelled "typed note" with their date, and are never green.

## Rules for time, tick and proof
1. **A time in the future is INVALID.** A file `at`, a window `last_seen`, a bot `last_run_at` or a `proof_at` more than 2 minutes ahead of the PC clock shows red **BAD CLOCK**, is never green, and its numbers are not shown.
2. **Every time on the page is Eastern, short form, with the zone** ("Oct 6, 2:05 PM EDT"). The year is added when it is not the current year. This includes the packet stamp on the first line of every hand-off packet (flaw 9 of the brief).
3. **`interval_sec` must be a number from 1 to 3600** (in the heartbeat file, in the bots file, and per bot). Anything else makes that whole file red **NOT OK**. A missing `interval_sec` in the heartbeat falls back to 600 seconds (the 10-minute schedule the old status writer documents).
   **The stale limit follows the tick: a file (and a window's `last_seen`) is STALE after 3 x `interval_sec`, never sooner than 3 minutes and never later than 3 hours.** Chat-only windows and BOTS keep their proof for 12 ticks (4 x the limit).
4. **GREEN needs proof from the poller.** A window is green only when `data\vtes5-heartbeat.js` is valid and fresh AND that window's own `executors[id].last_seen` is within 3 ticks AND its state is "up" (chat-only windows also need a fresh `proof_at`). A report that comes only from the old `vtes-status.js` shows a grey **"WRITER SAYS UP, NOT PROVEN"** and is never counted as "confirmed up".
5. **BOTS (the Grok bots)** shows UP only with `executors.BOTS.proof_at` (the moment a Grok bot finished a real task), fresh and not in the future. Otherwise the Grok card says no Grok bot has been built. It can never say both.
6. **A stale or invalid Miami-Dade file turns every proof mark neutral grey.** Only a fresh file (7 days) can show a green "proof checked".
7. **The page re-reads every data file every 60 seconds** (cache-busted) and re-evaluates every card, bot line and panel together. A file that has been deleted counts as NO DATA on the next tick.
8. **Reload swaps, it never half-empties.** Files load into NEW objects and replace the old ones only when all have answered.
9. **Only what changed is redrawn,** so a text selection survives the 60-second tick.
10. **The build time is the real build instant,** stamped by `build-v5.js` and held to rule 1 (a build time ahead of the PC clock shows red BAD CLOCK in the top line and the footer).

## The seven files (V5: the bots file is new)
Each is a small JavaScript file (not JSON) so it opens from file:// with no server. Pure ASCII. In `data\` beside the launcher in the NEW v5 folder. Exactly two statements:

    window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.NAME = { ...fields... };

Every file has `"schema": 1`, `"at"` (ISO 8601 with offset, e.g. "2026-10-06T14:05:00-04:00") and `"writer"`. Write it atomically: write NAME.js.tmp, then rename.

1. `data\vtes5-heartbeat.js`  NAME=heartbeat  writer: the poller (a RAMBO scheduled task)  LIMIT 3 x interval_sec
   - `interval_sec` (1 to 3600): the REAL tick. The only place a "every N minutes" sentence for a window or the poller comes from.
   - `vtes_scheme_registered` (true only after VTES-Open.ps1 -Install succeeded on the PC).
   - `addresses_filled`: { "LLM-01": true|false, ... } read from vtes-addresses.json each tick. A vtes:// link appears on a card only when `vtes_scheme_registered` is true AND that window's flag is true. Otherwise the card shows one sentence saying what is missing.
   - `executors`: { "LLM-01": {"state":"up|down|unknown","last_seen":"ISO","proof_at":"ISO (chat-only windows)"}, ... } for LLM-01 to LLM-09, LOCAL, CHIEF (LLM-10 is accepted and ignored: Jorge's v3 has no Copilot card) and optionally BOTS.
2. `data\vtes5-bots.js`  NAME=bots  writer: the poller, reading the Windows scheduler (`Get-ScheduledTask`, `Get-ScheduledTaskInfo`)  LIMIT 3 x its own interval_sec (30 minutes when absent)  (V5, new)
   Fields: `interval_sec` (the writer's tick) and `bots`: { "CU-Inbox-Job-Watcher": {"state":"Ready|Running|Disabled","last_run_at":"ISO","last_result":0,"next_run_at":"ISO or null","interval_sec": n or null}, ... } for the six bots: CU-Inbox-Job-Watcher, CU-Local-Executor, CU-TokenMonitor-Hourly, CU-Orchestrator, CU-Propagation-Check, VTES-LOCAL-POLLER. `interval_sec` per bot is the task's own repeat interval from its trigger.
   What the page shows per bot: GREEN only when the bots file is fresh, the entry exists, the scheduler state is Ready or Running, `last_result` is exactly the number 0, `last_run_at` is valid, not in the future and within 3 of the bot's own intervals. Red: DISABLED, FAILED (non-zero result code, shown), LATE, NO DATA (no entry, no time, no result), BAD CLOCK, STALE. Grey: ran with result 0 but no `interval_sec`, so lateness cannot be judged. **Green here means the scheduler says the task ran and ended 0. It does not prove the task's work was right.**
3. `data\vtes5-state.js`  NAME=state  writer: the STATE-OF-PLAY exporter  LIMIT 26 hours
   Fields: `open_items`, `in_progress`, `blocked` (numbers), `repairs`: [{"id","text","status":"OPEN|DONE"}], `money`: [{"item","status"}]. The `repairs` rows appear under the typed repairs log as "live rows"; if absent the page shows NO DATA there. Nobody types them.
4. `data\vtes5-health.js`  NAME=health  writer: the daily HEALTH report  LIMIT 26 hours
   Fields: `ok` (true/false, REQUIRED), `checks_passed`, `checks_total`, `panel_built_at`, `report_sent_at` (ISO or null). "says OK" = `ok` is exactly true; false shows red NOT OK; no `ok` field shows red NO DATA.
5. `data\vtes5-tokens.js`  NAME=tokens  writer: the token monitor  LIMIT 30 minutes
   Fields: `burn_per_hour`, `window_used_pct` (0-100), `window_resets_at`, `week_used_pct`, `programs`: [{"name","tokens_today"}]. Do not estimate: if the monitor cannot measure, write nothing and the page says NO DATA.
6. `data\vtes5-housekeeping.js`  NAME=housekeeping  writer: the housekeeping agent  LIMIT 26 hours
   Fields: `last_report_at`, `report_delivered` (true/false), `delivered_to`, `items_cleaned`. delivered=false shows red.
7. `data\vtes5-miamidade.js`  NAME=miamidade  writer: the Miami-Dade scrape counter  LIMIT 7 days
   Fields: `counted` (n or null), `target` 300, `sources`: [{"id","name","url","proof_url","proof_ok":true|false}]. `id` is the two-digit source number as text "01" to "22" (a bare number 3 is read as "03"). Until counted the page says "unknown of 300".

## What "up" means for each window
- Windows the poller can see (LLM-01 RAMBO, LLM-02 Cloud, LLM-03 Cowork, LLM-06 Codex, LLM-09 Thin API router, LOCAL, CHIEF): "up" = the poller saw the process or its own heartbeat within 3 ticks.
- Chat-only windows (LLM-04 Chat, LLM-05 iPhone, LLM-07 Grok, LLM-08 Gemini): the poller CANNOT see them. They show red NO DATA until RAMBO records a real test: `state:"up"` with `last_seen` and `proof_at` set to the moment a test message got a real reply. (V5: the v4 "site answers" mark that pinged the chat sites is NOT ported: it needed network calls, and v3's header promises no internet is needed.)

## The old status-only file (optional)
`Write-VtesStatus.ps1` writes `vtes-status.js` ("up" on a timer, checks nothing). Jorge's v3 launcher has no such file beside it. If the desktop executor wants the page to show it (as grey, never green), INSTALL-v5.ps1 is run with `-StatusDir "<folder holding vtes-status.js>"`, which writes that folder's `file:` address into `vtes5-config.js`. The page only reads it. Without `-StatusDir` the page never looks for it.

## Shipped state
v5 ships all seven files with `"at": null`. A fresh install shows NO DATA everywhere until the PC writes real files into `<new folder>\data\`. That is the true state, not a defect.
