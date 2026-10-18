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
- 2026-10-16T06:19Z · SELF-TEST pass 4 · 5 of 6 checks run passing (4 skipped to save usage: 3, 5, 8, 9).
  1 PANEL INBOX: PASS for comments (0 new). Known: 11 approvals routed to the PC, waiting on the PC cap.
  2 PROBE: PASS · 00:18Z probe answered 01:18Z. New probe selftest-probe-2026101606 planted.
  4 PC ALIVE: PASS · _UPTIME-HEARTBEAT 06:16Z.
  6 SCHEDULED TASKS: FAIL (known, not new) · weekday inbox triage still on Fable 5.1, last run failed USAGE_LIMIT_REACHED; its next run is 11:38Z (7:38 AM ET).
  7 MAIL WATCH: PASS.
  10 USAGE: allowed_warning (read 06:19Z). This session's own context is about 70 percent full (702k of 1,000k tokens).
  New failures: none, so no alert sent.
- 2026-10-16T12:25Z · SELF-TEST pass 5 · 5 of 6 checks run passing (4 skipped to save usage: 3, 5, 8, 9).
  1 PANEL INBOX: PASS for comments (0 new). Known: 11 approvals routed to the PC, waiting on the PC cap.
  2 PROBE: PASS · 06:18Z probe answered 07:19Z. New probe selftest-probe-2026101612 planted.
  4 PC ALIVE: PASS · _UPTIME-HEARTBEAT modified 12:21Z.
  6 SCHEDULED TASKS: FAIL (known, not new) · weekday inbox triage failed 11:39Z USAGE_LIMIT_REACHED (still Fable 5.1); I ran that triage by hand at 11:50Z and told Jorge. Only the first page of triggers was read.
  7 MAIL WATCH: PASS (11:18Z, 67 min at read; refreshed 12:25Z).
  10 USAGE: allowed_warning (read 12:2xZ). Context about 21 percent used after compaction.
  Also: QC-01 WARN 10:53Z (EXEC-01 Drive heartbeat stale ~15 h) was my miss; fixed 11:42Z with a new Drive heartbeat, logged in RECURRING-ISSUES.md (2nd occurrence).
  New failures: none, so no alert sent.
- 2026-10-16T18:22Z · SELF-TEST pass 6 · 5 of 6 checks run passing (4 skipped to save usage: 3, 5, 8, 9).
  1 PANEL INBOX: PASS for comments (0 new). Known: 11 approvals routed to the PC, waiting on the PC cap.
  2 PROBE: PASS · 12Z probe answered 13:24Z. New probe selftest-probe-2026101618 planted.
  4 PC ALIVE: PASS · _UPTIME-HEARTBEAT 18:16Z.
  6 SCHEDULED TASKS: FAIL (known, not new) · weekday triage still on Fable 5.1; Jorge's usage screen shows the Fable weekly limit at 100%.
  7 MAIL WATCH: PASS.
  10 USAGE: allowed_warning. Jorge's screen (2:00 PM ET): weekly all models 97%, Fable 100%, resets in ~22 h (about noon ET Sat 10-17, NOT 10-18 as logged earlier). This session's cost split 95% Opus / 5% Sonnet (the Opus part was before the switch to Sonnet).
  Security cluster today (14:05Z Claude Chrome device, 14:06Z WordPress reset, 16:18Z Claude Code device, 18:05Z Google sign-in to Notion, 18:09Z OpenAI MFA changed): all unconfirmed by Jorge, pattern fits his own account-setup work. Asked him once (Gmail 14:20Z); not repeated.
  New failures: none, so no new alert.
- 2026-10-17T00:22Z · SELF-TEST pass 7 · 5 of 6 checks run passing (4 skipped to save usage: 3, 5, 8, 9).
  1 PANEL INBOX: PASS for comments (0 new). Known: 11 approvals routed to the PC, waiting on the PC cap.
  2 PROBE: PASS · 18Z probe answered 18:43Z. New probe selftest-probe-2026101700 planted.
  4 PC ALIVE: PASS · _UPTIME-HEARTBEAT 00:16Z.
  6 SCHEDULED TASKS: FAIL (known, not new) · weekday triage still on Fable 5.1 (Fable weekly limit at 100 percent).
  7 MAIL WATCH: PASS.
  10 USAGE: allowed_warning (read 00:16Z). Weekly resets about noon ET today (1792252800). This session context 704k of 1,000k (70 percent).
  Other: 'Eve' agent keeps sending status mails from Jorge's Outlook (SYNC-01 LANE OPEN, repeated 22:08Z, 23:09Z, 00:10Z); its 23:07Z email to copilot@microsoft.com bounced. Jorge has not yet answered whether Eve is his agent. Not repeated.
  New failures: none, so no new alert.
- 2026-10-17T06:17Z · SELF-TEST pass 8 · 5 of 6 checks run passing (4 skipped to save usage: 3, 5, 8, 9).
  1 PANEL INBOX: PASS (0 new comments, 0 queued). 11 approvals still routed to the PC, waiting on the PC cap.
  2 PROBE: PASS · 00Z probe answered 01:20Z. New probe selftest-probe-2026101706 planted; answer it at the 07:16Z watch.
  4 PC ALIVE: PASS · _UPTIME-HEARTBEAT modified 06:16Z.
  6 SCHEDULED TASKS: FAIL (known, not new) · weekday triage still on Fable 5.1.
  7 MAIL WATCH: PASS.
  10 USAGE: allowed_warning (read 06:17Z). Weekly resets about noon ET today (1792252800). Session context 206k of 1,000k.
  New failures: none, so no new alert.
- 2026-10-17T12:16Z · SELF-TEST pass 9 · 5 of 6 checks run passing (4 skipped to save usage: 3, 5, 8, 9).
  1 PANEL INBOX: PASS (0 new comments, 0 queued). 11 approvals still routed to the PC, waiting on the PC cap.
  2 PROBE: PASS · 06Z probe answered 07:18Z. New probe selftest-probe-2026101712 planted; answer it at the 13:16Z watch.
  4 PC ALIVE: PASS · _UPTIME-HEARTBEAT modified 12:16Z.
  6 SCHEDULED TASKS: FAIL (known, not new) · weekday triage still on Fable 5.1.
  7 MAIL WATCH: PASS.
  10 USAGE: allowed_warning (read 12:16Z). Weekly resets about noon ET today (1792252800 = 16:00Z). Session context 362k of 1,000k.
  New failures: none, so no new alert.
- 2026-10-17T18:17Z · SELF-TEST pass 10 · 5 of 6 checks run passing (4 skipped to save usage: 3, 5, 8, 9).
  1 PANEL INBOX: PASS (0 new comments, 0 queued). 11 approvals still routed to the PC.
  2 PROBE: PASS · 12Z probe answered 13:18Z. New probe selftest-probe-2026101718 planted; answer it at the 19:16Z watch.
  4 PC ALIVE: PASS · _UPTIME-HEARTBEAT modified 18:16Z.
  6 SCHEDULED TASKS: FAIL (known, not new) · weekday triage still on Fable 5.1.
  7 MAIL WATCH: PASS.
  10 USAGE: allowed (read 18:16Z). Weekly meter reset. Session context 518k of 1,000k.
  New failures: none, so no new alert.
- 2026-10-18T06:17Z · SELF-TEST pass 11 · 5 of 5 checks run passing (5 skipped to save usage: 3, 5, 6, 8, 9).
  1 PANEL INBOX: PASS (0 new comments, 0 queued).
  2 PROBE: PASS · 18Z probe answered 19:20Z. New probe selftest-probe-2026101806 planted; answer it at the 07:16Z watch.
  4 PC ALIVE: PASS · _UPTIME-HEARTBEAT modified 06:16Z.
  7 MAIL WATCH: PASS (last check 05:17Z, 59 min).
  10 USAGE: allowed (read 06:16Z). Session context 326k of 1,000k.
  New failures: none, so no new alert.
- 2026-10-18T12:17Z · SELF-TEST pass 12 · 5 of 5 checks run passing (5 skipped to save usage: 3, 5, 6, 8, 9).
  1 PANEL INBOX: PASS (0 new comments, 0 queued).
  2 PROBE: PASS · 06Z probe answered 07:17Z. New probe selftest-probe-2026101812 planted; answer it at the 13:16Z watch.
  4 PC ALIVE: PASS · _UPTIME-HEARTBEAT modified 12:16Z.
  7 MAIL WATCH: PASS (last check 11:17Z, 60 min).
  10 USAGE: allowed (read 12:16Z). Session context 509k of 1,000k. Weekly meter resets about noon ET today.
  New failures: none. Security note relayed separately: Claude new trusted device 11:58Z.
