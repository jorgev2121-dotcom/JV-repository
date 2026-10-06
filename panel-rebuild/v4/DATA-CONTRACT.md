# DATA-CONTRACT - what the PC must write so the v4 panel is never green by default (TRK-2026-9910-B)

Rule (charter Rule 4, Tier 3 enforcement): every status, count and time on the panel is READ from one of the six files below. Nobody types a status.
If a file is missing, or its "at" is empty, the panel shows **NO DATA** in red. If "at" is older than the limit, it shows **STALE since <time>** in red.
Green appears only when the file is present AND fresh AND says OK.

## Format (same for all six)
Each file is a small JavaScript file (not JSON) so it opens from file:// with no server. Pure ASCII. Written to the SAME folder as the HTML pages, in the sub-folder `data\`.
It must contain exactly one statement:

    window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.NAME = { ...fields... };

Every file has these two fields: `"schema": 1` and `"at": "2026-10-06T14:05:00-04:00"` (ISO 8601 with offset, the moment the writer finished). `"writer"` = the task name.
Write it atomically: write to NAME.js.tmp then rename, so the page never reads half a file.

## The six files
1. data\vtes4-heartbeat.js   NAME=heartbeat   writer: the poller (RAMBO scheduled task)   LIMIT 15 minutes
   Fields: interval_sec (number, the REAL tick, e.g. 300), vtes_scheme_registered (true only after VTES-Open.ps1 -Install succeeded on the PC; until true the panel shows vtes:// addresses as not available, never as links), executors: { "LLM-01": {"state":"up|down|unknown","last_seen":"ISO"}, ... } with keys LLM-01, LLM-02, LLM-03, LLM-04, LLM-05, LLM-06, LLM-07, LLM-08, LLM-10 and LOCAL. An executor older than 3 ticks (3 x interval_sec) shows STALE
   Panel uses interval_sec for every "runs every N" sentence (no typed timings anywhere) and executors[].state for the header dots and card states.
2. data\vtes4-state.js       NAME=state       writer: the STATE-OF-PLAY exporter   LIMIT 26 hours
   Fields: open_items (n), in_progress (n), blocked (n), repairs: [{"id","text","status":"OPEN|DONE"}], money: [{"item","status"}]
3. data\vtes4-health.js      NAME=health      writer: the daily HEALTH report task   LIMIT 26 hours
   Fields: ok (true/false), checks_passed (n), checks_total (n), panel_built_at (ISO), report_sent_at (ISO or null)
4. data\vtes4-tokens.js      NAME=tokens      writer: the token monitor   LIMIT 30 minutes
   Fields: burn_per_hour (number, tokens), window_used_pct (0-100), window_resets_at (ISO), week_used_pct (0-100), programs: [{"name","tokens_today"}]
   Do not estimate. If the monitor cannot measure, write nothing; the panel will say NO DATA.
5. data\vtes4-housekeeping.js NAME=housekeeping writer: the housekeeping agent   LIMIT 26 hours
   Fields: last_report_at (ISO), report_delivered (true/false), delivered_to (text), items_cleaned (n)
6. data\vtes4-miamidade.js   NAME=miamidade   writer: the Miami-Dade scrape counter   LIMIT 7 days
   Fields: counted (n or null), target 300, sources: [{"id","name","url","proof_url","proof_ok":true|false}]
   Until counted, counted is null and the panel says "unknown of 300".

## Shipped state
v4 ships all six files with `"at": null` (empty). That is deliberate: a fresh install shows NO DATA everywhere until the PC writes real files.
INSTALL-v4.ps1 never overwrites a data file that already has a real "at".

## Panel-age stamp
Header shows: "Built <build time>, data as of <oldest 'at' among the files that exist>". Build time is written into the pages at build; the daily HEALTH report
should copy it into health.panel_built_at so the report itself says how old the panel is.

## What the cloud could NOT do
It cannot write these files; no writer task exists yet (UNVERIFIED that any does). The two desktop executors must create the six writers. Until then every light is red NO DATA, which is the true state.
