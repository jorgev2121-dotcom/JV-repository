# PRE-MORTEM 2026-11-06 (EXEC-01 cloud) - "It is a week from now and this failed. Why?"

1. **PC OCR stays stalled.** No new .SEARCH.txt files since 11-03. Watch: self-test 06Z check 5. Guard: read-only desktop item queued.
2. **1Password helper never finished.** Needs Jorge's four clicks; safety checker blocks agents. Guard: one email sent 03:16Z; do not repeat more than once a day.
3. **Four scheduled tasks still denied.** Recreate only on Jorge's word.
4. **Silent MCP disconnects.** Tools drop mid-cycle. Guard: reload via ToolSearch, log, never fake a result.
5. **Heartbeat gap.** Drive log stopped 23 h once. Guard: one Drive heartbeat per runner cycle.
6. **Bal Harbour permits unclaimed.** Fee payment and pickup are Jorge's. Guard: reminder only when he asks.
7. **PR 14 drift.** Weekly check Thu 11-12.
8. **Panel version mismatch (v63 vs v64/v65).** Read before touching the live panel.
9. **Money in emails.** Rule: no dollar amounts. Guard: re-read before every send.
10. **Weekly meter.** Currently allowed. Guard: check get_session each runner cycle.

Do you want these ten risks watched as written, yes or no?
