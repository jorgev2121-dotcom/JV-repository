# Panel build: ORPHANS "Resolve to TRK" + LLMS "Fixed IDs" — 2026-10-14

Panel: `control-panel/VTES-Control-Panel_v13_connect-wired_2026-10-12.html` (edited in place, not republished, not committed).
Test: `tools/panel/test/orphans-llms-test.js`.

## Section A — Result

1. **BUILD now 69 of 116 = 59%.** It was 67 of 116 (58%) at git HEAD. Up by exactly 2.
2. **Tab that reached 100% in this run: ORPHANS** (2 of 2). LLMS is at 80% (4 of 5); the one piece left is the 13-provider health tile, which needs the PC helper.
3. Tabs at 100% overall: MENU, ORPHANS, WINDOWS, BRIDGES, RULES, TRACKER.
4. All five required tests pass (plus hover-tips as an extra check).

## Section B — What was built

1. **ORPHANS, Propose match.** Every OPH row has a "Propose match" button. It opens a small form: job number (typed, or picked from the TRK numbers already on the page) and one line of evidence. The form says "Proposal only. Filing happens in the morning with your yes."
   - It only accepts `TRK-2026-NNNN`. It refuses short forms, suffixes, the `.047` form, and the 9xxx internal admin band. It never makes up a number.
   - A number in the right format that is not on the page is still accepted, and the message says the registry gets checked in the morning.
   - It saves only to the page's shared store (`proposals/<OPH>`, status PROPOSED, filed false), plus a copy in this browser. It never moves, renames, files or calls a connector. There is also a "Copy for email" button.
2. **LLMS, Fixed IDs.** A "Fixed IDs: LLM-01 to LLM-09" card. Each row has a scarce, free or unknown label, and the existing plan rows got the same label.
   - **Deviation from the brief:** the IDs follow the existing system numbering (v5 LLM launcher and address book; for example, LLM-02 = Claude Code Cloud in the Round-Table file names, and LLM-08 = Gemini). They do not follow the panel's card order, because the panel only has 7 plan cards. Numbering those 7 in order would have given LLM-02 to SuperGrok and clashed with the IDs already in use.
   - Labels come from the cost line of the plan each one draws on: Subscription or API = scarce, Local = free, anything else = unknown. LLM-01 to 05 and LLM-07 are scarce. LLM-06 (Codex, ChatGPT plan not confirmed), LLM-08 (Gemini) and LLM-09 (router, dropped) are unknown. Ollama's plan row shows free.
   - The IDs are written into the page, so they are identical after a reload (tested).
3. **Fix outside the brief:** the RULES owner-directives list got the 3 directive files committed at 07:43 today (commit 9498362: FREEZE-AND-FINISH-01, 1PASSWORD-SSOT-01, SHARE-LINK-01). Without them, rules-bridges-windows-test failed at HEAD too, before this change.

## Section C — How the tests were run

- `node tools/panel/test/<test>.js <abs panel path> <png>` for orphans-llms, phone-width, menu-glossary and money-lock.
- orphans-llms compares against `git show HEAD:` and expects +2.
- rules-bridges-windows checks that its own 3 pieces went up by exactly 3. Its default baseline (git 00cd2b8) would now count 5, so it was run with a third argument: the 00cd2b8 version with only the two new pieces pre-flipped, kept in the session scratchpad. That isolates its own +3 (66 → 69).

## Section D — Test output

```
== orphans-llms-test
PASS BUILD parsed :: 69 of 116 built (59%)
PASS BUILD count went up by 2 vs git HEAD :: 67 -> 69 of 116
PASS two pieces flipped to 1
INFO ORPHANS BUILD 2/2 (100%)
INFO LLMS BUILD 4/5
PASS ORPHANS: every OPH row has a Propose match button :: 9 rows
PASS form opens
PASS form says "Proposal only. Filing happens in the morning with your yes."
PASS TRK picker lists only TRK-2026-NNNN numbers already on the page (no 9xxx admin band) :: 33 listed, e.g. TRK-2026-1256, TRK-2026-1262, TRK-2026-1265, TRK-2026-1268
PASS refuses malformed TRKs and the 9xxx admin band :: 10 of 10 refused
PASS refuses an empty evidence line :: Add one line of evidence: why you think it belongs to TRK-2026-1262.
PASS nothing saved by refused attempts
PASS accepts TRK-2026-1262 (normalised) :: Saved as a proposal in the shared list: OPH-2026-0001 -> TRK-2026-1262. Listed on this page. Nothing was moved or renamed. Filing happens in the morning with your yes.
PASS proposal written only to proposals/OPH-2026-0001 :: ["proposals/OPH-2026-0001"]
PASS record is a PROPOSAL, not filed, carries no new TRK :: {"oph":"OPH-2026-0001","trk":"TRK-2026-1262","evidence":"Same folio 30-5022-000-0130 on permit card and report","onPage":true,"status":"PROPOSED","filed":false,"at":"2026-10-14T07:49:15.980Z","by":"Jorge (panel)"}
PASS no connector call made by the proposal :: callTool +0, capabilities asked: ["db"]
PASS saved proposal shown on the row
PASS ORPHANS tab shows 100% :: 100%
PASS LLMS: IDs LLM-01..09 present, in order :: LLM-01 LLM-02 LLM-03 LLM-04 LLM-05 LLM-06 LLM-07 LLM-08 LLM-09
PASS each card has scarce/free/unknown label :: 01=scarce 02=scarce 03=scarce 04=scarce 05=scarce 06=unknown 07=scarce 08=unknown 09=unknown
PASS labels follow the page cost info (Subscription/API = scarce, Local = free, else unknown)
PASS plan rows carry labels too (Ollama free) :: 16 labels
INFO LLMS tab shows 80%
PASS 0000 money lock intact (locked, no amounts visible) :: {"open":false,"mz":34,"shown":0,"leak":false}
PASS 375px no sideways scroll on ORPHANS (form open) and LLMS :: all fit
PASS no page errors :: []
PASS IDs identical after reload
PASS proposal still shown after reload
PASS no page errors after reload :: []
BUILD NOW 69 of 116 = 59%
RESULT ALL PASS
== phone-width-test
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
== menu-glossary-test
PASS glossary loaded :: 26 words
PASS required in-house words present :: all 13
PASS no definition uses a money amount :: 
PASS meanings are plain one-liners (read-aloud friendly) :: 
PASS first occurrences wrapped across tabs :: 18 of 26 tabs, 60 words
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
== rules-bridges-windows-test (3rd arg baseline = git 00cd2b8 with the 2 new pieces pre-flipped)
PASS BUILD parsed :: 69 of 116 built (59%)
PASS BUILD count went up by 3 vs /tmp/claude-0/-home-user-JV-repository/6cf01967-6ccb-5506-8c1b-e9975b663611/scratchpad/panel-ol/rbw-baseline_plus-orphans-llms.html :: 66 -> 69 of 116
PASS three pieces flipped to 1
PASS RULES at 100% in BUILD :: 2/2
PASS BRIDGES at 100% in BUILD :: 2/2
PASS WINDOWS at 100% in BUILD :: 2/2
PASS RULES lists owner directives :: 8 rows
PASS every OWNER-DIRECTIVE_*.md in repo root is listed :: 8 files; missing: none
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
PASS inbox count follows nextPageToken (100 + 37 = 137) :: 137files in VTES-Inbox · checked 07:49 open folder ↗ Check again
PASS connector called twice
PASS 375px BRIDGES with live count fits
PASS no page errors (two pages) :: []
PASS cap at 10 pages shows N+ :: 1000+ after 10 calls
PASS no page errors (capped) :: []
BUILD NOW 69 of 116 = 59%
RESULT ALL PASS
== money-lock-test
locked: visible dollar amounts across 26 tabs = 0  masks on page: 34
wrong: That is not the zone code.
open: visible amounts on USAGE = 4
relocked: visible amounts = 0
ERRS []
== hover-tips-test (extra)
with tip / total: [ 1236, 1236 ]
ERRS []
```

Shall the LLM IDs stay on the launcher numbering (recommended), rather than the panel card order?
