# Panel piece built — APPROVALS "One card at a time mode" — 2026-10-14

**State: DONE in the local file (all 9 tests pass). Not republished, not committed — by instruction; the VTES runner does those.**

## What was built
1. A **One card at a time** button next to Read all / Stop on the APPROVALS page. Click it again ("Show all cards") to go back to the normal list.
2. When it is on, **only one approval card shows**, big: 30px title, 22px text, thicker border.
3. Below the card are two big buttons only: **Approve** and **Not now** (72px tall, 24px text). The small per-card Approve/Defer buttons are hidden, so there is one decision on screen.
4. After Approve or Not now, the choice is saved the same way as before, and the next card shows by itself ("Approved saved. Here is the next card.").
5. **"Card N of M"** with **Back** and **Next** buttons. The left and right **arrow keys** do the same, except while typing in a box, while the 0000 dialog is open, or on another tab.
6. **Remembered:** the on/off choice is kept on this computer (localStorage, key `vtes-onecard`, wrapped in try/catch). If storage is blocked, the page still works.
7. **Works with the existing pieces:**
   - The waiting clock shows on the big card and stops on Approve.
   - "Read this card" button. "Read all" moves the big card along as each card is read.
   - The 0000 money lock hides amounts on the big card and in speech. They show after 0000 and hide again after re-lock.
   - Hover tips on all six new buttons.

## Files
- Panel: `control-panel/VTES-Control-Panel_v13_connect-wired_2026-10-12.html`. BUILD entry `['One card at a time mode',0,3]` changed to `['One card at a time mode',1]`. Approval cards now carry class `apcard` and `data-id`. New `VTES.oneCard / ocGo / ocDecide / ocRead / ocState`.
- New test: `tools/panel/test/approvals-onecard-test.js` (32 checks; injects a $8,000 test card into a temporary copy, stubs speech, tests storage-blocked mode).
- Pre-edit backup: scratchpad `panel-onecard/VTES-Control-Panel_v13_bak-20261014.html`.

## Test results (all pass, page errors 0 in every test)
- approvals-onecard: 32 of 32 true
- approvals-readaloud: button on every card 6 of 6, read all 6 of 6, no `$` spoken while locked, BUILD flipped true
- approvals-clock: clock on every card 5 of 5, all true
- today-stamp: all true
- handoff-packet: all true
- view-controls: zoom/contrast/remember OK
- money-lock: 0 visible dollar amounts across 26 tabs when locked, 4 on USAGE when open, 0 after re-lock
- emails-window: all open/close states correct (the "false" lines are the expected closed states)
- hover-tips: 1196 of 1196 buttons/links have tips

## Count
**62 of 116 pieces built (53%)**, up from 61. APPROVALS tab: 4 of 5 (80%). The only piece left in APPROVALS is "Approvals fed from the PC", which needs the PC.

Next step for the runner: republish the same artifact URL, commit, and add a BUILDER-LOG line. Shall the runner go ahead?
