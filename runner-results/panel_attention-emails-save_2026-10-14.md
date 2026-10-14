# Panel · attention flash, Emails sub-buttons, Save pop-ups — 2026-10-14

**File changed:** `control-panel/VTES-Control-Panel_v13_connect-wired_2026-10-12.html` (published copy is v51; this build is NOT republished and NOT committed).
No backup copy was made in the repo — git history is the backup. Scratch files and screenshots live outside the repo.

## Section A — Feature 1: attention flashing + "waiting on you" (SPEC_ATTENTION-FLASH)

**State: DONE locally. Test `tools/panel/test/attention-test.js`: 37 PASS, 0 FAIL.**

1. **A red counter sits at the top of the header: "🔴 N waiting on you".** Click it and one list opens with every item. A small copy of the counter floats bottom-right when the header scrolls away.
2. Today's count, offline: **150** (138 tasks, 6 approval items including the EXEC-01 RED ask, 6 Alec job cards). Tracker schedules from the database add to it live.
3. **Tabs with waiting items pulse once per second** (1 Hz, under the 3-per-second safety limit) and show their own count badge. Quiet tabs do not flash.
4. Reduced-motion setting, or the new "⏸ Pause flashing" switch (remembered), shows a steady red ring instead.
5. **Every item has an EXEC-01 recommendation line** ("EXEC-01 recommends: Approve — reason") and Approve · Defer · Deny · Note · Go to tab. Defer hides it until tomorrow 8 AM. Blockers stuck on you are recommended "Approve and reroute to RAMBO (Desktop)".
6. **"Approve all N recommended"** asks once, then approves. RED items (spend, credentials, installs, sign-ins, outbound) are listed with a tick box and left out unless ticked one by one. Today: 103 recommended, 39 RED left out.
7. Legend at the top and inside the list: 🟢 done by an AI · 🟡 tested / running · 🔴 needs you, with counts.
8. Durable: every choice goes to the db collection `attention` (plus `approvals/`, `tasks/state`, `tracker/` through the page's existing functions). A reload keeps them.
9. Money stays masked in the list and in its "Copy" text. 🔊 reads the list through the page's existing Read button.

**Found and fixed on the way:** the real db hands back `data()` as a function, but the page read `.data` as a field in 10 places. So approval choices, task choices, LLM ledger, handoff log and queue did not come back after a reload. One small helper (`dsnap`) now reads both shapes.

**Heads-up, not changed:** the older red "🚩 Approve all" header button still approves everything, RED items included. The new batch in the list is the safe one.

Tests run together after Feature 1 (same counts on git HEAD before the change): search 28/0 · phone-width 12/0 · menu-glossary 18/0 · button-groups 50/0 · money-lock 0 amounts locked, 0 relocked, no errors · attention 37/0.
