# Panel: RULES, BRIDGES and WINDOWS to 100% — 2026-10-14

**State: DONE (verified by tests below). Not republished.**

Panel file: `control-panel/VTES-Control-Panel_v13_connect-wired_2026-10-12.html`
Test: `tools/panel/test/rules-bridges-windows-test.js`

## Section A — The answer

1. **BUILD count is now 67 of 116, which is 58%.** It was 64 of 116 before this work, so it went up by 3.
2. **Three tabs reached 100%:** RULES, BRIDGES and WINDOWS.
3. All four tests pass: the new test, phone width, menu glossary, and the money lock.

## Section B — What was built

1. **RULES, "Owner directives list".** A static list of the 5 files named OWNER-DIRECTIVE in the repository root. Each row has its date, a short name, a one-line plain-English meaning, and the file name.
   - 2026-08-15: Always end with a question.
   - 2026-08-25: Desktop maximum autonomy.
   - 2026-10-12: 1Password is the one place for logins.
   - 2026-10-13: Pretty format and money lock.
   - 2026-10-13: Every reply can be heard.
2. **BRIDGES, "Live inbox count".** It counts the files in VTES-Inbox through the page's existing Google Drive connector call (search_files with a parentId query). It follows the next-page token, stops at 10 pages, and shows "N+" when it hits that cap. It shows a "checked HH:MM" stamp and a "Check again" button. Without the connector, it shows "count unavailable — open folder" with a link to the folder.
3. **WINDOWS, "Picture cards per window".** Three cards: 🖥️ CODE · DESKTOP (PASTE-D), ☁️ CODE · CLOUD (PASTE-C) and 🤝 COWORK (PASTE-X). Each card has a big emoji, one line on what the window does, and "paste IDs start with …". The cards use the page's own colour tokens, so dark mode works. They show three across on a wide screen and stack on a phone.

The money lock is unchanged, and no external scripts were added.

## Section C — Test output

### rules-bridges-windows-test.js — RESULT ALL PASS (26 checks)
```
PASS BUILD parsed :: 67 of 116 built (58%)
PASS BUILD count went up by 3 vs git 00cd2b8 :: 64 -> 67 of 116
PASS three pieces flipped to 1
PASS RULES at 100% in BUILD :: 2/2
PASS BRIDGES at 100% in BUILD :: 2/2
PASS WINDOWS at 100% in BUILD :: 2/2
PASS RULES lists owner directives :: 5 rows
PASS every OWNER-DIRECTIVE_*.md in repo root is listed :: 5 files; missing: none
PASS each row has a date matching its file and a one-line meaning
PASS RULES tab shows 100% :: 100%
PASS BRIDGES degrades without connector :: count unavailable — open folder ↗
PASS BRIDGES tab shows 100% :: 100%
PASS WINDOWS has three picture cards :: 🖥️ CODE · DESKTOP | ☁️ CODE · CLOUD | 🤝 COWORK
PASS cards: emoji, title, "paste IDs start with" match
PASS big emoji :: 52,52,52
PASS WINDOWS tab shows 100% :: 100%
PASS cards follow dark mode tokens :: rgb(255, 255, 255) -> rgb(18, 24, 34)
PASS 0000 money lock intact (locked, no amounts visible) :: {"open":false,"mz":34,"shown":0,"leak":false}
PASS 375px no sideways scroll on RULES, BRIDGES, WINDOWS :: all fit
PASS no page errors (no connector) :: []
PASS inbox count follows nextPageToken (100 + 37 = 137) :: 137files in VTES-Inbox · checked 06:45 open folder ↗ Check again
PASS connector called twice
PASS 375px BRIDGES with live count fits
PASS no page errors (two pages) :: []
PASS cap at 10 pages shows N+ :: 1000+ after 10 calls
PASS no page errors (capped) :: []
BUILD NOW 67 of 116 = 58%
RESULT ALL PASS
```

### phone-width-test.js — RESULT ALL PASS
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

### menu-glossary-test.js — RESULT ALL PASS (18 checks)
```
PASS 0000 money lock intact (locked, no amounts visible) :: {"open":false,"mz":34,"shown":0,"leak":false,"glTipMoney":false}
PASS 375px still fits with glossary open :: 375
PASS no page errors :: []
RESULT ALL PASS
```

### money-lock-test.js — pass
```
locked: visible dollar amounts across 26 tabs = 0  masks on page: 34
wrong: That is not the zone code.
open: visible amounts on USAGE = 4
relocked: visible amounts = 0
ERRS []
```

## Section D — Notes

1. The live inbox count was tested with a mock connector. It has not yet been run against the real Drive folder. It runs the first time the published page loads with Google Drive allowed.
2. This session did not make any commits. The panel and test edits were already in git through "WIP" commits f2f093f and 5d3061b, made by someone else. For that reason the test compares against the newest commit where the three pieces were still unbuilt (00cd2b8), not against HEAD.
3. Three directives have no file in the repository root: FREEZE-AND-FINISH-01, SHARE-LINK-01 and 1PASSWORD-SINGLE-SOURCE-01. They appear only in CLAUDE.md or are referenced by other directives, so they are not in the list.

Shall I publish the updated panel next?
- 2026-10-14 · RULES list gap: FREEZE-AND-FINISH-01, SHARE-LINK-01, 1PASSWORD-SSOT-01 have no OWNER-DIRECTIVE_*.md file in repo root (text lives in CLAUDE.md §12/§14). GREEN to write them as files.
