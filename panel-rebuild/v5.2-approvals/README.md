# Panel v5.2: the NEEDS MY APPROVAL page
TRK-2026-9910-C · v5.2 · 2026-10-08 · CURRENT (built and tested in the cloud; not installed)

## Section A. What it does

**The panel now shows one approval card at a time, at the top of the page, with big buttons.**

1. A new box sits under the colour key. It says "5 things need your OK" in amber. When nothing is waiting, it turns green.
2. You see one card. It has a large title and one sentence saying why. Then come two big buttons, with the recommended one first, in blue, marked "(Recommended)".
3. Each button says what happens next and which window does it.
4. Each card has a "Read aloud" button, a "Later" link, and a line such as "Card 2 of 7".
5. If your answer needs a follow-up question, the next card appears straight away. Example: "Not now" leads to "When should this card come back?"
6. The last card is a "Done" card. It repeats what you chose, what happens next, and who does it.
7. The grey "NEEDS MY APPROVAL" tab is now a live blue tab, first in the row. It shows how many cards are waiting. The grey placeholder box in section 8 is gone.

## Section B. How your answer reaches RAMBO

1. **First answer only:** the page asks you to pick the VTES-Inbox folder (G: drive, My Drive). The browser remembers it.
2. Every answer after that is saved as one small file in that folder, for example `APPROVE_SAMPLE-TEDC-RENAME_20261008-142900.md`. It holds the item id, what you chose, the time, and the line "Answered by Jorge in the panel."
3. The page reads the file back after saving it. **It says "Done. Your answer is saved." only when that read-back matches.**
4. If the browser cannot save there (or you close the folder window, or pick the wrong folder), nothing is claimed. You get a "Copy answer" button, and the page tells you to paste it into the RAMBO window.
5. If you pick a folder that is not called VTES-Inbox, the page refuses it and asks again.

## Section C. What RAMBO has to write

The PC writes `data\vtes5-approvals.js`. It is plain ASCII with one statement:
`window.VTES5_APPROVALS = { "schema": 1, "written": "<ISO time with zone>", "writer": "...", "items": [ ... ] };`

1. Each item has: `id`, `title`, `why`, and optional `trk` and `money` (a number). It also has `source` (the file that raised it), `sample` (true only for test items), and `choices`.
2. Each choice has: `label`, `recommended` (true or false), and `effect` (one sentence: what happens next and which window does it). A choice can also have an optional `followup`, which has the same shape as an item: title, why and choices. A card shows 2 to 4 choices.
3. The page re-reads the file every 60 seconds.
4. **A missing file shows a red NO DATA line, never "0 things".**
5. A time older than 26 hours shows "STALE since ..." in red. A time in the future shows BAD CLOCK. A time with no zone shows NO ZONE. Items it cannot read are counted in a red UNREADABLE line.
6. The answer files are `.md`, because the PC watcher only sees `.md` files. The round-11 spec said `.json`; this follows the newer instruction.

**The shipped file holds 5 SAMPLE cards, each marked "SAMPLE - not real":** the TEDC rename (with a follow-up about drafting the invoices), the Medley total, the $44 microfilm fee (AP-0002), the two Plaza PH11 drafts, and the free Airtable account.

1. **Medley has no recommendation.** The records do not say which total is right, so the card says so.
2. **For Plaza, "Show me both drafts first" is recommended, not "Send".** An email should not go out unread.
3. Sample answers say "Do not act on it" inside the file.
4. The sample list's time is 2026-10-08 10:25 AM EDT, so from 2026-10-09 12:25 PM EDT it shows the red STALE line. That stays until RAMBO writes the real list. This is correct behaviour.

## Section D. Test results (Chromium through Playwright, 2026-10-08)

**67 of 67 checks passed.** The full list is in `test-v52-RESULT.txt`, and the script is `test-v52.js`.

At 1536x730 and at 390x844:
1. Page errors: 0 on v5.1 and 0 on v5.2.
2. The search for "ollama" hides 26 of 28 cards on both versions. The LOCAL packet last line is identical.
3. The card renders under the colour key with an amber header ("5 things need your OK"), Card 1 of 5, Recommended first, and the SAMPLE tag. No sideways scroll.
4. Clicking Recommended opens the follow-up card, and focus moves to its heading. Clicking Recommended again shows the Done card.
5. With File System Access turned off, the Done card shows "Not sent yet", the Copy answer button and the RAMBO paste sentence. No "saved" or "sent" claim appears. The copied text holds the id, the choice and the signature line.
6. With a stand-in folder: the page asked once for the folder and wrote 1 file with the right name and content. The green Done card showed only after the read-back. The second answer was saved with no second folder prompt (2 files, 1 prompt).
7. A wrong folder ("Downloads") was refused and 0 files were written. Closing the folder window fell back to Copy with no saved claim.
8. With the data file removed, a red NO DATA line shows, with no cards and no "0 things". Page errors: 0. The only console line is the expected missing-file line. The rest of the panel was unchanged.
9. A list 30 hours old showed the red "STALE since ... EDT" line.
10. The NEEDS MY APPROVAL tab jumps to the section without hiding it under the tab bar.

Also tested:
1. Keyboard only at 200% zoom (768 px wide): Tab reaches the first button in 1 press, the focus ring is a 4 px solid outline, and Enter answers. No sideways scroll.
2. Read aloud works. With no speech engine, a plain note replaces the button.
3. If the data file is deleted while the page is open, the next reload shows NO DATA.

Screenshots are in `screenshots/`: the laptop card view, and the phone Done card with the Copy fallback.

## Section E. Not tested, and known limits

1. **Not tested:** Edge on your PC, and a real save into `G:\My Drive\VTES-Inbox\`. The test used a stand-in folder object. Whether Edge allows the folder picker on a page opened from a `file:` address must be checked on the PC; if it does not, the Copy fallback appears. Real speech output was not heard.
2. VERIFY-v5.ps1 does not know the two new files (`vtes5-approvals.js`, `data/vtes5-approvals.js`). An install of v5.2 needs that list updated, or VERIFY will report them as extra files.
3. "Later" and copied-but-not-saved answers last only until the page reloads; then the card comes back. Saved answers stay hidden until the PC writes a newer list. If that newer list still holds the item, the card returns with "You answered this on ..., but the PC still lists it."
4. **Found, not fixed (it is a sealed v5.1 file):** v5.1 measures the tab bar as 87 px high, but with the guide's labels it is 118 px. So at laptop width, a jump to sections 1 to 8 puts their heading about 24 px under the bar. The new section works around this for itself only.

## Section F. Seal

Every package file except the manifest is listed in `package/MANIFEST.sha256`, 14 files, in the same format as v5.1. v5.1 and v5 were not changed.

**MANIFEST.sha256 SHA-256:** `365b82ecbafc4e0ef27ebd4f9b55c4fa9e07f25c9ce7d074d9ef26a0923254ca`

Question for RAMBO after install: did the first real answer file land in VTES-Inbox?
