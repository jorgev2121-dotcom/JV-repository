# Panel requirements — round 11 (from Jorge, 2026-10-10)
TRK-2026-9952o · add to v5 before install (build-v5.js + tests on claude/panel-v5-port)

- **R-12 Hover help on every button.** Every button and link gets a `title=` tooltip: one plain sentence saying what happens when clicked. Test: build fails if any `<button>` lacks `title`.
- **R-13 Real Send on owner-answer windows.** Each answer box gets a **Send** button. On click: write the answer to Drive (`VTES-Inbox/ANSWER-FROM-JORGE_<item>_YYYY-MM-DD.md`), then show **"Sent ✓ at HH:MM"** next to the box. If the write fails, show **"NOT sent — try again"** in red. Filling the note box is NOT a send.
- **R-14 Find the Path tab.** Owner directive. Lists the five lanes in `FIND-THE-PATH.md` with LIVE / DOWN / UNKNOWN and the time last checked, and which lane auto-select would pick.

Status: queued. v5 itself is built and passed CHECK-12 but is NOT installed — install order still waits for Jorge's yes.
- **R-15 Failure ledger tab.** Owner request 2026-10-10. A tab listing every task category with: what was assigned, status with a denominator ("n of N"), why it failed, and the test that would prove the next fix. Source file: `FAILURE-LEDGER_BY-CATEGORY_TRK-2026-9952u_2026-10-10.md` and OPEN-ITEMS.md. Unknown status shows UNKNOWN, never green.
