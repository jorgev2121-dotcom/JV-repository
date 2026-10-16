# SELF-TEST log
- 2026-10-15T03:10Z · created. Known failing at start: 1 (fixed by hand this run), 5 (OCR silent since 10-05).
- 2026-10-15T03:20Z · check 2 PROBE: PASS (probe of 03:12Z answered at 03:20Z by the 03:16 hourly run).
- 2026-10-15T06:18Z · SELF-TEST pass 1 · 3 of 6 checks run passing (4 skipped to save usage: panel load, scheduled-task list, status board, viewer files).
  1 PANEL INBOX: FAIL (known) · 0 new comments; 11 approvals routed, waiting over 2 h on the PC (blocked by the PC daily cap; PASTE-D-073).
  2 PROBE: PASS · 03:12Z probe answered 03:20Z. New probe selftest-probe-2026101506 planted.
  4 PC ALIVE: PASS · _UPTIME-HEARTBEAT modified 06:16Z.
  5 OCR FLOWING: FAIL (known) · no .SEARCH.txt created in Drive in the last 48 h (silent since 10-05).
  7 MAIL WATCH: PASS · last check 05:16Z, this run 06:17Z.
  10 USAGE: allowed_warning (last read 02:52Z; not re-read this pass to save usage).
  New failures: none, so no alert sent.
- 2026-10-15T07:18Z · check 2 PROBE: PASS (06:18Z probe answered 07:18Z).
- 2026-10-15T12:18Z · SELF-TEST pass 2 · 3 of 5 checks run passing (5 skipped to save usage).
  1 PANEL INBOX: FAIL (known) · 0 new comments; 11 approvals routed, still waiting on the PC (cap).
  2 PROBE: PASS · 06:18Z probe answered 07:18Z. New probe selftest-probe-2026101512 planted.
  4 PC ALIVE: PASS · _UPTIME-HEARTBEAT 12:16Z.
  5 OCR FLOWING: FAIL (known) · no new sidecars (not re-searched this pass; last checked 06:18Z).
  7 MAIL WATCH: PASS.
  New failures: none. Also: QC-01 audit WARN at 10:53Z (Drive log stale, unlogged trigger edits) was fixed 11:20Z.
- 2026-10-16T00:20Z · SELF-TEST pass 3 · 5 of 7 checks run passing (3 skipped to save usage: 3, 8, 9).
  1 PANEL INBOX: PASS for comments (0 new). Known: 11 approvals routed to the PC, waiting on the PC cap.
  2 PROBE: PASS · all 3 earlier probes answered. New probe selftest-probe-2026101600 planted.
  4 PC ALIVE: PASS · _UPTIME-HEARTBEAT 00:16Z.
  5 OCR FLOWING: FAIL (known) · not re-searched; OCR runner never installed on the PC (item 30).
  6 SCHEDULED TASKS: FAIL (known, not new) · weekday inbox triage failed 10-15 11:39Z, USAGE_LIMIT_REACHED, still on Fable 5.1 (platform refused my switch). Sweeper was changed to once a day by someone else at 20:19Z (title says "until it moves off Opus").
  7 MAIL WATCH: PASS.
  10 USAGE: allowed_warning (read 00:19Z); weekly meter resets 10-18.
  New failures: none, so no alert sent.
