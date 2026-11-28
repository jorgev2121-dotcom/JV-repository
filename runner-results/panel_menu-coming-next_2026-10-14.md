# Panel piece built — MENU · Map · Coming next list · "Greyed future pages with dates"

**Date:** 2026-10-14 · **Window:** ☁️ CODE · CLOUD (helper for the VTES runner) · **Admin band:** VTES panel builder

**Status: DONE. All 23 panel tests passed (1 new + 22 existing). New count: 63 of 116 (54%). MENU tab: 11 of 12 (92%). Not republished, not committed (runner's job).**

## Why this piece
Tab counts before the build (non-PC pieces only matter):
- TRACKER 3 of 3 (100%, done) · MENU 10 of 12 (83%) · APPROVALS 4 of 5 (80%, last piece is PC) · TASKS 3 of 4 (75%, last piece is PC) · CAPSULES 2 of 3 and BACKUP 2 of 3 (67%, last pieces are PC).
- So MENU was the tab closest to 100% with a cloud piece left. Of its two pieces, this one is the smaller (marked 3 h; the other, glossary hover, is 4 h). Built in about an hour.

## What changed
File: `control-panel/VTES-Control-Panel_v13_connect-wired_2026-10-12.html`

1. A new dashed "🕓 Coming next" box on the MENU map, under the branches, above the colour legend. It lists the nine planned pages from panel v5.1/v5.2 (`vtes5-guide.js` PLANNED list): NEEDS MY APPROVAL, BILLING, BOOKS, PROJECTS, COUNTY MONITOR, ORANGE TREE, LLM LIBRARY, LAUNCHER, PROTOCOLS. The merge inventory (item 34) said to add them as one list on MENU, not as tabs.
2. Unbuilt pages are greyed: dimmed, dashed border, title marked aria-disabled. They cannot be opened.
3. Dates are worked out from today's date every time the page loads:
   - Past the estimate: "LATE · was expected Oct 10 · 4 days late · no new date yet".
   - Today: "Expected today, Oct 14 (estimate)".
   - Future: "Expected Oct 16 · in 2 days (estimate)".
   - **The old estimates (set 2026-10-08) were kept, not invented over.** Five are now late. The heading says "8 of 9 pages not built yet · 5 late".
4. NEEDS MY APPROVAL is marked BUILT, with an "Open APPROVALS" button (one-card mode was built 2026-10-14). LLM LIBRARY has a "Where it will live: LINKS" button.
5. Hover tip on every row. Search now finds the planned pages (try "county monitor" or #comingnext).
6. No dollar figures in the box, so the 0000 money lock is unaffected (money-lock test still passes).
7. Test hook `VTES.coming(now)` returns the list, state per page and the HTML for a chosen date.
8. BUILD: `['Greyed future pages with dates (...)',0,3]` changed to `[...,1]`.

## Test (new): `tools/panel/test/menu-coming-next-test.js`
```
Coming next box visible on MENU true
the five named pages are listed true 9 rows
unbuilt rows are greyed (dimmed + dashed + aria-disabled) true
every unbuilt row carries a date true ["Expected today, Oct 14 (estimate)","LATE · was expected Oct 10 · 4 days late · no new date yet","LATE · was expected Oct 10 · 4 days late · no new date yet","LATE · was expected Oct 13 · 1 day late · no new date yet","LATE · was expected Oct 12 · 2 days late · no new date yet","LATE · was expected Oct 12 · 2 days late · no new date yet","Expected Oct 16 · in 2 days (estimate)","Expected Oct 15 · in 1 day (estimate)"]
past date says LATE with days late (BOOKS, Oct 10 -> 4 days) true "LATE · was expected Oct 10 · 4 days late · no new date yet"
today says Expected today (BILLING Oct 14) true "Expected today, Oct 14 (estimate)"
future says Expected in N days (LAUNCHER Oct 16 -> 2) true "Expected Oct 16 · in 2 days (estimate)"
heading counts with a denominator (8 of 9 not built, 5 late) true "Coming next · 8 of 9 pages not built yet · 5 late"
NEEDS MY APPROVAL shown as built with Open APPROVALS true
hover tips on every row true
hover tip shows for LAUNCHER true "LAUNCHER: Every website and app you use (about 300) as picture icons, "
Open APPROVALS button works true
LLM LIBRARY button goes to LINKS true
search "county monitor" finds the planned page true
search #comingnext lists all 9 true
locked: no dollar amount in Coming next true
phone width: Coming next box and its rows fit the screen true 359
BUILD flipped true
ERRS []
```

## All existing tests (run against the changed panel)
```
agents-split, approvals-clock, approvals-onecard, approvals-readaloud, approve-all, approve-all2,
build-governor, connect-v13-mocktest, decide-keeps-comment, emails-menu, emails-window,
executor-buttons, handoff-packet, hover-tips, job-queue, money-lock, panel-map, search-voice,
t11, t12, today-stamp, view-controls: all exit 0, ERRS [] on every one.
```
- The "false" lines in build-governor (tab bar does not overflow) and emails-window (popup closed after min/close/Esc) are expected-false checks. Their output is byte-identical to the panel before the change, apart from MENU now showing 92% and a shorter ETA.
- `check-feeder-output.js` is not a panel test. It reads a PC feeder output folder, so it does not apply here (it fails the same way on the unchanged panel).

## Found, not fixed (pre-existing)
At phone width (375 px) the whole page scrolls sideways to 910 px because of the older email bar (`.mailbar` / `.mailpop`). Same before this change. The new box itself fits (right edge 359 px).

## Remaining on MENU
1 piece: "Glossary hover for in-house words (TRK, OPH, MDC…)", 4 h, cloud-buildable (port from `vtes5-guide.js`). That would take MENU to 100%.

Is the runner republishing this as v41?
