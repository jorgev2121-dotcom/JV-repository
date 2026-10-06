# INVENTORY - Jorge's real launcher v3 (read from Drive, 2026-10-06)

PORT STEP 1 of 4. Window: CODE, CLOUD / WEB EXECUTOR. Model: Sonnet 5.5.

## Section A - The copy
1. Source: Drive folder LIVE-COPY-2026-10-06 (18aCU-pEZXU79qR11xjxHdGlUYTftvGt7), file VTES-LLM-LAUNCHER_v3.html (104sYoYpR0AzmrtMerxklubRx8Y6yAYFd). Read with the Drive connector action that returns the file bytes (base64), not the markdown rendition. So no unescaping was needed.
2. Saved at `panel-rebuild/v3-live/VTES-LLM-LAUNCHER_v3.html`.
3. **Size: 24,463 bytes. Manifest says 24,463. Match.**
4. **SHA-256: 28d3ed5e6b8e5713c079afd349b10a3c4b38993768ca850c91c6f6c333411fe3. Manifest says the same. Match.** It is a byte-exact copy, checked with sha256sum.
5. Drive metadata says modified 2026-10-06T08:05:20Z (that is the desktop's copy time). The manifest's "last modified 2026-10-03 16:27 ET" is the PC file's own time; I cannot see it. UNVERIFIED, not needed.
6. The file has 2 CRLF line ends (one at the end of the script, one after the footer block) and the rest LF. 0 non-ASCII bytes (emoji are written as \u escapes).

## Section B - What is in it (counted by running its own arrays)
1. 17 tabs. 7 are anchors on the page (LLMS, EXECUTORS, BOTS, HAND OFF, QUEUED, STATUS, REPAIRS); 10 are links to file:///C:/Users/JV/JV-repository/VTES-CONTROL-PANEL.html (APPROVALS, SESSIONS, JOBS, CAPSULES, BRIDGES, AGENTS, USAGE, PLAUD, CLIENTS, RULES).
2. 9 LLM cards (LLM-01 to LLM-09), 6 role cards (LOCAL, CODEX, RAMBO, GROK, COWORK, CHIEF), 6 bots, 6 queued items, 9 picker rows.
3. 6 sections in this order: 1 Hand work, 2 LLMs, 3 Executor roles, 4 Bots, 5 Queued, 6 Repairs.
4. Repairs table: 12 rows (11 plain rows and 1 OPEN row marked class repair-open), all dated 2026-10-02. This matches the reference note (12 rows, one OPEN). My first count of 11 left out the OPEN row; corrected in step 4.
5. 3 file:/// addresses in the source: the 10 tab links and the two PANEL / INDEX links at the bottom-left.

## Section C - The nine defects, each confirmed in the source
1. **No Open button for LLM-01, LLM-03, LLM-05 (url is empty); LLM-09 has none either.** Confirmed. The Open link is only built when url is set.
2. **vtes:// shown as plain text.** Confirmed: "Address: vtes://llm-NN" is a bold, unlinked line on 8 cards. LLM-09 has an empty address.
3. **10 tabs plus PANEL and INDEX go to the stale snapshot.** Confirmed. Also new: the STATUS tab points at `#status`, which is the one-line message under the Hand-work buttons, not a status section. See Section D.
4. **LLM-02 url = https://claude.ai/code/session_01CAqZRvV1WjuuxZCNwrE9Gf.** Confirmed.
5. **Typed timings.** Confirmed, five of them: LLM-01 "Runs every 2 minutes"; CHIEF role "Runs every 2 minutes"; bot CU-Local-Executor "every 5 minutes"; bot CU-Orchestrator "Every 15 minutes"; bot VTES-LOCAL-POLLER "The 15-minute poller". (The Hand-work packet and CHIEF queued text also say "last 15 minutes".)
6. **Bots have no state.** Confirmed: a bot card is name, text, pool.
7. **Typed facts as if live.** Confirmed: CODEX "Proven 2026-10-01", RAMBO "About 75% of the Max quota was used on 2026-10-01; forecast to run out Saturday", repair rows.
8. **Repairs log hand-maintained.** Confirmed in the lead sentence.
9. **Packet stamp uses `new Date().toLocaleString()`** (PC format, no zone). Confirmed in packet().

## Section D - Defects the brief did not list (found while reading)
1. **D1. The STATUS tab goes nowhere useful.** `#status` is the message line in section 1. There is no status section.
2. **D2. Hand-work "Copy packet and open" for a window with no url just copies;** the status text then says the how-to line. That is by design, but for RAMBO the how-to is only a drive-folder path, not a click path (covered by defect 1).
3. **D3. The 'to' picker offers the 9 LLMs plus LOCAL, CODEX, RAMBO** (WIN list), but not GROK, COWORK or CHIEF; the queued items send to LOCAL, CODEX or RAMBO only. Kept as is (house rule: remove nothing); noted.
4. **D4. Packet text says "No tables, no bullet lists" but the packet itself is bullet lines.** Kept unchanged (packet text must survive).
5. **D5. LLM-06 how-to references a shortcut "Codex - sign in (Jorge)"; LLM-07 "Chat only"; role GROK address "Second-Opinion.ps1 -Prompt ..." are typed instructions I cannot verify.** Labelled as typed notes.
6. **D6. The footer says "TRK-2026-9910-B v3 2026-10-02 CURRENT"** and the repair log says it is "Maintained by hand in VTES-LLM-LAUNCHER_v3.html".
7. **D7. Bottom-left PANEL / INDEX buttons are fixed-position at z-index 99999 and link to the stale snapshot.**

## Section E - Question for Jorge
Shall I go on to the port (step 2)? (yes/no)

TRK-2026-9910-B · v3-live INVENTORY · v1 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v5
