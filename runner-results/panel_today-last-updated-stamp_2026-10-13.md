# Panel piece built — TODAY · Freshness · Stamps · "Last updated on page"

**Date:** 2026-10-13 · **Window:** ☁️ CODE · CLOUD (helper for the VTES runner) · **Admin band:** VTES panel builder

**Status: DONE. All 6 tests passed. New count: 59 of 116 (51%). TODAY tab: 3 of 5 (60%).**

## Why this piece
The first tab in the build line with cloud work left is TODAY. It was the lowest-effort piece there (about 1 hour), and it does not need the PC.

## What changed
File: `control-panel/VTES-Control-Panel_v13_connect-wired_2026-10-12.html`

1. New `TODAYAT` value: the time the Today page was last written (2026-10-05, 9:40 PM Miami).
2. New stamp at the top of the Today page: "Last updated Oct 5, 9:40 PM Miami · 8 days ago".
   - Green, ending "fresh", when the page is under 24 hours old.
   - Amber when the page is older than a day, with the words "OLDER THAN A DAY: the daily rewrite has not run (it needs the PC helper)".
   - Redraws every minute. Has a hover tip.
3. Test hook `VTES.todayStamp(iso)` redraws the stamp, and can take a new time.
4. BUILD: `['Last updated on page',0,1]` changed to `['Last updated on page',1]`.

The money lock is untouched (money-lock test passes, 0 dollar amounts visible while locked).

## Test (new): `tools/panel/test/today-stamp-test.js`
```
stamp visible true
STAMP Last updated Oct 5, 9:40 PM Miami · 8 days ago · OLDER THAN A DAY: the daily rewrite has not run (it needs the PC helper)
has date true
old stamp marked stale true
fresh stamp not stale true Last updated Oct 13, 4:43 PM Miami · 2 h ago · fresh
tip true
BUILD flipped true
ERRS []
```

## Existing tests, all passed (exit 0, ERRS [])
handoff-packet, view-controls, money-lock (locked: 0 visible amounts across 26 tabs, 34 masks), emails-window, hover-tips (1177 of 1177 controls have a tip).

## Not done here, by instruction
No republish, no git commit. The parent runner does both.

## Next piece suggested
The "Auto daily rewrite" piece needs the PC, so the stamp will stay amber until the PC helper rewrites the Today page. Shall the parent queue that piece in the PC bundle?
