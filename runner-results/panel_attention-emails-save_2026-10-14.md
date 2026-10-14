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

## Section B — Feature 2: Emails drop-down becomes sub-category buttons (SPEC_EMAILS-SUBBUTTONS)

**State: DONE locally. Test `tools/panel/test/emails-subbuttons-test.js`: 29 PASS, 0 FAIL.**

1. **"📧 Emails" now opens a bar of big buttons just under the header row.** It has one labelled row per mailbox: "Gmail" and "Outlook (work)". Every email button has the same pale blue tint, an icon, a plain word and a hover tip saying what it opens.
2. Three buttons are new: **Emails needing a reply** (Gmail unread in the inbox, without promotions), **From the city** (Bal Harbour, Miami-Dade, Pembroke Pines, Medley) and **Outlook unread**. The 7 old links are all kept.
3. **"View as" switch:** Buttons (the default) · Compact list (the old look) · Big cards (best on the phone). The choice is remembered in each browser.
4. Minimize, maximize, close, Esc and a click outside all still work. The old emails-window and emails-menu checks still show the same open and close behaviour, and they have no page errors.
5. The search still finds every email button, now with its mailbox name. The money lock is untouched.

**Not verified:** Outlook on the web has no known direct link for "unread only". The **Outlook unread** button opens the work inbox, and its hover tip says to click Filter, then Unread. This is said plainly rather than shipping a link we guessed.

Tests run together after Feature 2: search 28/0 · phone-width 12/0 · menu-glossary 18/0 · button-groups 50/0 · money-lock 0 amounts locked, 0 relocked, no errors · attention 37/0 · emails-subbuttons 29/0.

## Section C — Feature 3: "⭐ Save" button and pop-up collections (SPEC_SAVE-POPUP-BUTTON)

**State: DONE locally. Test `tools/panel/test/save-popup-test.js`: 24 PASS, 0 FAIL. It was run with 3 random seeds, and all passed.**

1. **A "⭐ Save" button now sits on every search result, job capsule, email row, document, report, client card, Plaud row and orphan card.** That is 430 buttons on the page, plus one on each search result.
2. **Save asks one thing: which collection (hashtag).** It suggests the existing collections, and you can type a new name. A misspelled name ("#plza") lands in the existing "#plaza" instead of making a duplicate.
3. **Fuzzy hashtags.** Case, the # sign, hyphens and spaces are ignored. Up to 2 letters can be wrong. People names from the job capsules are added too. "#plza", "plaza" and "#PLAZA-PH11" all open #plaza. The test saves 5 random items into 5 collections, then tries 5 misspellings of each collection name, which makes 25 searches. All 25 find the collection, both in the Saved finder and in the top 3 results of the main search box.
4. **The new "⭐ Saved" header button** opens the collections. Each item has Open · View · Edit note · Send · Defer · Comment. **Send only copies the item, or opens a mailto draft. Nothing is sent by itself.**
5. **Defer** hides an item until the date you pick. When that date comes, the item shows in "Waiting on you" and the ⭐ Saved button flashes. Notes, comments and defer dates survive a reload. They are stored in the db collection `saved`, with this browser as a mirror.
6. **"Export collection"** makes one designed HTML file in the Orange Tree layout. It has branches that click open, a checkbox per item, "View these together", "Copy for email" and "Print in color".
7. The money lock is respected. No amounts show in the pop-up, the copied text or the export while the lock is on. The page fits at 375px, every control has a hover tip, and the Save buttons share one gold tint.

**Two limits, said plainly:**
1. **The "Misspellings:" lines in the 40 Drive `_HASHTAGS_v2.txt` files are not inside the page.** They live only in Drive, so fuzzy matching uses edit distance and the people names on the page. Reading those Drive lines would need a Drive read at view time.
2. **Export needs a download permission when it runs inside claude.ai.** It tries the `downloads` capability first, then a normal browser download. If v51 does not declare `downloads`, the export may be blocked inside claude.ai until the next publish adds it. "Copy all for email" works either way.

Tests run together after Feature 3: search 28/0 · phone-width 12/0 · menu-glossary 18/0 · button-groups 50/0 · money-lock 0 amounts locked, 0 relocked, no errors · attention 37/0 · emails-subbuttons 29/0 · save-popup 24/0.
