# Panel piece built — Buttons grouped by type, one light colour per group

**Date:** 2026-10-14 · **Window:** ☁️ CODE · CLOUD (helper for the VTES runner) · **Admin band:** VTES panel builder

**Status: DONE. New test 50 of 50 passed. The 8 existing tests also passed: phone width, menu glossary, hover tips, money lock, panel map, build governor, view controls and read-aloud. Not republished and not committed, as asked.**

## Section A — What Jorge sees now

1. **The 26 tab buttons now sit in 6 labelled groups.** Each group has a small text header, so the meaning never depends on colour alone.
2. **The groups use the same names as the MENU map's branch boxes.** The map already defined a grouping, so we reused it rather than inventing a new one:
   - 🏠 Start here: MENU, TODAY
   - ✅ Needs your click: TASKS, MYASKS, ORCHESTRATOR, APPROVALS
   - 🔌 Who is working: HANDOFFS, SESSIONS, CONNECT, TRACKER
   - 🪟 Links and windows: STATUS, LINKS, WINDOWS
   - 📄 Documents: OCR, REPORTS, ORPHANS, JOBS, CAPSULES, PLAUD, CLIENTS
   - 🍳 Behind the kitchen door: LLMS, BRIDGES, AGENTS, USAGE, RULES, BACKUP
3. **Each group has one light tint and a matching thick left edge.** The colours are gold, coral, teal, blue, violet and olive. Dark mode uses darker, muted versions.
4. **The five MENU map branch boxes use the same tints**, so the tab bar and the map match.
5. **Two button types got their own tint:**
   - Copy buttons (Copy for email, Copy packet, Copy id) are pale green.
   - Read-aloud buttons (Speak, Read, Speechify, Read all cards, Read this card, Read aloud, Stop) are pale lavender.
   - Approve and deny buttons kept their colours. The money-lock controls were not touched.
6. **The active tab is solid blue with a dark ring around it.** In dark mode its text is now dark, because the old white text on light blue was too faint (about 2.8 to 1).

## Section B — Two things that moved or changed, and why

1. **The green, amber and red status colour moved from the left edge to the bottom edge of each tab.** The left edge now shows the group. The status meaning is the same and the % badge is unchanged.
2. **Fixed a bug that was already there: on a phone, the top bar covered the whole screen once you scrolled.** The bar is about 1,160 px tall at 375 px wide, so nothing below it could be seen. Now the bar stays pinned only while it uses no more than 65% of the screen height. Taller than that, it scrolls away with the page. On a 1100 × 900 desktop it still stays pinned.
   - Tradeoff: in short desktop windows, or at a big zoom, the tab bar scrolls away instead of staying on screen.
   - The grouped tab bar is about 110 px taller at 1100 px wide: 547 px against 437 px before.

## Section C — Proof

New test: `tools/panel/test/button-groups-test.js`. It runs in light and dark mode, at 1100 px and at 375 px, and checks these things:

1. All 26 tabs are present, each exactly once, in exactly one group that has a text header (the group is labelled by its header for screen readers).
2. Every tab has a hover tip.
3. Each group has one background colour and one left-edge colour, and no two groups share a tint.
4. Contrast is at least 4.5 to 1 for every tab label, every % badge, every group header, the map branch text, and the copy and read-aloud buttons. The test works this out from the page's real colours, including see-through backgrounds layered over the page.
   - Lowest result in light mode: 4.55 to 1, on the active tab.
   - Lowest result in dark mode: 6.98 to 1.
5. The active tab stands out from its group's tint by at least 3 to 1 (4.12 light, 5.58 dark) and has its ring.
6. Copy buttons share one tint, and read-aloud buttons share one tint.
7. At 375 px there is no sideways scroll, on the home page and on all 26 tabs.
8. After scrolling, page content is visible below the top bar: 324 px at 1100 × 900, and the full screen on a phone.
9. There are no page errors.

Result: `RESULT ALL PASS`, 50 checks. Run against the old file, the test fails (it errors out, because the old file has no groups).

The other tests, run against the new file:

1. phone-width: 12 of 12 passed.
2. menu-glossary: 18 of 18 passed, money lock intact.
3. hover-tips: 1,631 of 1,631 buttons have a tip, no errors.
4. money-lock: 0 amounts showing while locked, 4 after 0000, 0 after relocking, no errors.
5. panel-map, build-governor, view-controls and approvals-readaloud: no errors, and the outputs match what they showed before.

**Screenshots** are in `/tmp/claude-0/-home-user-JV-repository/6cf01967-6ccb-5506-8c1b-e9975b663611/scratchpad/panel-group/`:

1. Before: `before_1100.png`, `before_375.png`
2. After: `after_1100.png`, `after_375.png`, `after_1100_dark.png`, `after_375_dark.png`

## Files

1. Changed: `control-panel/VTES-Control-Panel_v13_connect-wired_2026-10-12.html`
   - New colour tokens on `:root`, with dark versions in both dark-mode rules.
   - A new CSS block just before `</style>`.
   - The tab bar now draws its buttons inside groups.
   - The map branch boxes are tagged with their group.
   - Copy and read-aloud buttons are tagged with their type.
   - A small "header fit" script just before `</body>`.
2. New: `tools/panel/test/button-groups-test.js`
3. No backup was made in the repo, as asked. A copy of the original file is in the scratch folder: `original.html`.

Shall the runner republish the panel so Jorge can see it?
