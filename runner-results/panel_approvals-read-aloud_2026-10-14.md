# Panel piece built — APPROVALS "Read aloud" — 2026-10-14

**State: DONE in the local file (tests pass). Not republished, not committed — by instruction; the VTES runner does those.**

## What was built
1. A **🔊 Read aloud** button on every approval card. It reads the title, the plain-language summary, the status, and the waiting time (for example "OVERDUE, waiting 3 days").
2. A **🔊 Read all cards** button that reads every card in order ("Card 2 of 5 …"), and a **⏹ Stop** button.
3. The card being read gets a green outline; a status line says "Reading card 2 of 5 … press Stop to stop."
4. **Money lock:** while the 0000 money zone is locked, every dollar amount is spoken as "amount locked" and no `$` reaches the speech engine. After 0000 is typed, amounts are read.
5. Hover tips on all three new buttons.
6. If the browser has no speech engine, it says to highlight and press Ctrl+Alt+S for Speechify.
7. Uses the browser's built-in speechSynthesis — no cost, no outside service.

## Files
- Panel: `control-panel/VTES-Control-Panel_v13_connect-wired_2026-10-12.html` — BUILD entry `['Read aloud',0,1]` changed to `['Read aloud',1]`.
- New test: `tools/panel/test/approvals-readaloud-test.js` (stubs speechSynthesis, records spoken text, injects a test card with $8,000 / $1.5k / $ 250 into a temporary copy).
- Pre-edit backup: scratchpad `panel-readaloud/VTES-Control-Panel_v13_bak-20261014.html`.

## Test results (all pass, page errors 0 in every test)
- approvals-readaloud: button on every card 6 of 6 · read all speaks 6 of 6 · locked: no `$` spoken (single card, read all, and after re-lock) · open after 0000: `$8,000` read · stop cancels · hover tips present · Speechify fallback · BUILD flipped true
- approvals-clock: all true, BUILD flipped true
- today-stamp: all true
- handoff-packet: all true
- view-controls: zoom/contrast/remember OK
- money-lock: 0 visible dollar amounts across 26 tabs when locked; 4 on USAGE when open; 0 after re-lock
- emails-window: all open/close states correct
- hover-tips: 1190 of 1190 buttons/links have tips

## Count
**61 of 116 pieces built (53%)**, up from 60. APPROVALS tab: 3 of 5 (60%). Remaining in APPROVALS: "One card at a time mode" (cloud, effort 3) and "Approvals fed from the PC" (needs the PC).

Next step for the runner: republish the same artifact URL, commit, log a BUILDER-LOG line. Shall the runner go ahead?
