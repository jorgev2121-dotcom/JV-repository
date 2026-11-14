# Panel piece built — APPROVALS · Cards · "Waiting clock, overdue after 24 h"

**Date:** 2026-10-13 · **Window:** ☁️ CODE · CLOUD (helper for the VTES runner) · **Admin band:** VTES panel builder

**Status: DONE. All 7 tests passed (1 new + 6 existing). New count: 60 of 116 (52%). APPROVALS tab: 2 of 5 (40%).**

## Why this piece
It was named by the runner, it existed unbuilt (`['Waiting clock, overdue after 24 h',0,1]`), and it is not a PC piece. Effort about 1 hour.

## What changed
File: `control-panel/VTES-Control-Panel_v13_connect-wired_2026-10-12.html`

1. Every approval card now shows a clock next to "waiting on you":
   - Green "Waiting 5 h" under 24 hours.
   - Amber "⏰ OVERDUE · waiting 30 h" after 24 hours.
   - Red "⏰ OVERDUE · waiting N days (more than 3 days)" after 3 days.
   - Grey "Clock stopped · waited N" once the card is Approved. Deferred cards keep counting.
2. Hover tip on each clock explains the colours and that the count is a lower bound.
3. Start time: `WSINCE = 2026-10-10T15:19:23Z`, the earliest record of these 5 cards in the repo (panel v12 copy). The real wait may be longer. A saved `waitingSince` on `approvals/<id>` in the page database overrides it.
4. Redraws every minute, after a decision, and after saved statuses load.
5. Test hook `VTES.waitClock(id, iso)` sets a start time and redraws.
6. BUILD: `['Waiting clock, overdue after 24 h',0,1]` changed to `['Waiting clock, overdue after 24 h',1]`.

Only the 5 APPROVALS cards carry a clock. The JOBS cards share the card code but have no start time, so they are unchanged.

## Test (new): `tools/panel/test/approvals-clock-test.js`
```
clock on every card true 5 of 5
CLOCK ⏰ OVERDUE · waiting 3 days (more than 3 days)
old card overdue red true
under 24 h green true Waiting 5 h
after 24 h amber true ⏰ OVERDUE · waiting 30 h
visible true
approved stops clock true Clock stopped · waited 3 days
tip true
BUILD flipped true
ERRS []
```

## Existing tests, all passed (ERRS [])
- today-stamp: all true.
- handoff-packet: all true.
- view-controls: zoom and high contrast remembered.
- money-lock: locked, 0 visible dollar amounts across 26 tabs, 34 masks.
- emails-window: all states correct.
- hover-tips: 1177 of 1177 controls have a tip.

Screenshots: scratchpad `panel-approvals/` (not in repo).

## Not done here, by instruction
No republish, no git commit, no BUILDER-LOG line. The parent runner does all three.

## Next
APPROVALS still has "Read aloud" (about 1 h, cloud) and "One card at a time mode" (about 3 h, cloud). Shall the next run take "Read aloud"?
