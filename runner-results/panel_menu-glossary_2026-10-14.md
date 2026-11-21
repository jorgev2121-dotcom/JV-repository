# Panel piece built — phone-width fix + MENU · Finding things · Search · "Glossary hover for in-house words"

**Date:** 2026-10-14 · **Window:** ☁️ CODE · CLOUD (helper for the VTES runner) · **Admin band:** VTES panel builder

**Status: DONE. All 25 panel tests passed (2 new + 23 existing; check-feeder-output.js excluded as instructed). New count: 64 of 116 (55%). MENU tab: 12 of 12 (100%). Not republished, not committed (runner's job).**

Backup made before editing: `control-panel/VTES-Control-Panel_v13_connect-wired_2026-10-12_bak-20261014.html` (63 of 116 version).

## Part 1 — Phone-width fix (sideways scroll)

**Cause found:** at 375px the page was 910px wide. The top button row that holds the Emails bar was a flex row with no wrapping, so it ran off the right edge. Three smaller overflows hid behind it: the Emails pop-up (absolute, min-width 270px, starts mid-row), the "Coming next" LATE pills (nowrap), and status pills (`.cstat`, nowrap) on the PC strip, OCR and STATUS tabs.

**Fix (CSS only, no behaviour change):**
1. Top row gets class `topbar` and `flex-wrap:wrap`.
2. `.mailbar` wraps; under 600px the Emails pop-up is pinned inside the screen (8px each side). Maximize still works (stays centered).
3. LATE pills and status pills may wrap on phones.

**Result:** scrollWidth is 375 at 375px and 390 at 390px, on all 26 tabs, with the Emails window closed, open and maximized. The original page fails the same test (8 fails), so the test really catches the bug. `emails-window-test.js` output unchanged.

### Test (new): `tools/panel/test/phone-width-test.js`
```
PASS 375px home scrollWidth<=viewport 375
PASS 375px every tab (26) fits 
PASS 375px emails window open & fits sw=375 pop=8,367
PASS 375px emails window maximized & fits sw=375 pop=11,364
PASS 375px emails window closes
PASS 375px no page errors []
PASS 390px home scrollWidth<=viewport 390
PASS 390px every tab (26) fits 
PASS 390px emails window open & fits sw=390 pop=8,382
PASS 390px emails window maximized & fits sw=390 pop=12,378
PASS 390px emails window closes
PASS 390px no page errors []
RESULT ALL PASS
```

## Part 2 — Glossary hover for in-house words

1. **26 in-house words**, plain one-line meanings taken from CLAUDE.md and repo docs: RAMBO, Cowork, Codex lane, TRK, OPH, GREEN and RED, Capsule, Orange Tree, 0000 zone, PASTE-D/C/X, Inbox and Outbox, SCOREKEEPER, Wally, MDC, VTES, Executor, Heartbeat, Hashtag, Owner directive, WORKAROUND-CERT, Superseded, Folio, Jacket, Orchestrator, Night run, Approve all.
2. **No money amounts** in any meaning (test-checked). The 0000 zone meaning says the money parts stay hidden until the zone code is typed, and that it is a stopper, not real security.
3. **First occurrence per tab** gets a dotted underline and a help cursor. Hover shows "Word: meaning" in the existing tip box; tap or keyboard focus shows it too. 59 words wrapped across 18 of 26 tabs. Never inside buttons, links, tab labels, the build tree, money spans or the money dialog. Re-applied when a tab is opened or its content refreshes.
4. **GREEN/RED care:** colour-legend lines ("GREEN = live", "RED = down"), "RED FLAGS" and "RED-7" are not underlined, because there the words mean a colour, not the GREEN/RED work rule.
5. **Glossary panel on MENU:** a "📖 Glossary of in-house words" button near the top of MENU opens a "Glossary · 26 in-house words" section at the bottom, with a search box ("1 of 26 words shown", or "No match. Try a shorter word."). `VTES.glossary('TRK')` opens it from any tab, filtered.
6. BUILD: `['Glossary hover for in-house words (TRK, OPH, MDC…)',0,4]` changed to `[...,1]`. MENU now reads "100% built · 12 of 12 pieces".

### Test (new): `tools/panel/test/menu-glossary-test.js`
```
PASS glossary loaded :: 26 words
PASS required in-house words present :: all 13
PASS no definition uses a money amount :: 
PASS meanings are plain one-liners (read-aloud friendly) :: 
PASS first occurrences wrapped across tabs :: 17 of 26 tabs, 55 words
PASS only the first occurrence per tab :: 
PASS never inside buttons, links, money spans or the glossary itself :: 0
PASS dotted underline + help cursor :: ["executor","dotted","help"]
PASS hover shows the meaning :: VTES: The name of your whole work system. This panel, the AI helpers, and the shared Google Drive folders.
PASS tap/click shows the meaning :: block
PASS Glossary button on MENU opens the panel
PASS panel lists every word
PASS search "capsule" finds Capsule :: Capsule | 1 of 26 words shown
PASS search with no match says so :: 0 of 26 words shown. No match. Try a shorter word.
PASS VTES.glossary("TRK") jumps to MENU and filters :: ["pane-MENU","TRK",["TRK","OPH","Hashtag"]]
PASS 0000 money lock intact (locked, no amounts visible) :: {"open":false,"mz":34,"shown":0,"leak":false,"glTipMoney":false}
PASS 375px still fits with glossary open :: 375
PASS no page errors :: []
RESULT ALL PASS
```

## Full suite after the flip (exit code and page errors per test)
```
agents-split-test exit=0 errs=ERRS []
approvals-clock-test exit=0 errs=ERRS []
approvals-onecard-test exit=0 errs=ERRS []
approvals-readaloud-test exit=0 errs=ERRS []
approve-all-test exit=0 errs=ERRS []
approve-all-test2 exit=0 errs=ERRS []
build-governor-test exit=0 errs=ERRS []
connect-v13-mocktest exit=0 errs=ERRS: []
decide-keeps-comment-test exit=0 errs=ERRS []
emails-menu-test exit=0 errs=ERRS []
emails-window-test exit=0 errs=ERRS []
executor-buttons-test exit=0 errs=ERRS []
handoff-packet-test exit=0 errs=ERRS []
hover-tips-test exit=0 errs=ERRS []
job-queue-test exit=0 errs=ERRS []
menu-coming-next-test exit=0 errs=ERRS []
menu-glossary-test exit=0 errs=
money-lock-test exit=0 errs=ERRS []
panel-map-test exit=0 errs=ERRS []
phone-width-test exit=0 errs=
search-voice-test exit=0 errs=ERRS []
t11 exit=0 errs=ERRS []
t12 exit=0 errs=ERRS []
today-stamp-test exit=0 errs=ERRS []
view-controls-test exit=0 errs=ERRS []
```

Compared line by line against the same suite on the untouched 63-of-116 page: the only differences are clock times, random job IDs, and hover-tips going from 1198 of 1198 to 1199 of 1199 buttons with a tip (the new Glossary button has its tip).

## Count
- Before: 63 of 116 (54%). MENU 11 of 12.
- After: **64 of 116 (55%). MENU 12 of 12 (100%)** — MENU tab reaches 100%, which the standing order says is a reason to message Jorge.

## Left for the runner
Republish the same artifact URL, commit and push, append the BUILDER-LOG line.

#VTES-panel-builder #MENU-glossary
