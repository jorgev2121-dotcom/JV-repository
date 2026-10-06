# TEST-REPORT - launcher v5 (port onto Jorge's real v3) (TRK-2026-9910-B, 2026-10-06)

SONNET 5.5 · PANEL V5 PORT. Window: CODE, CLOUD / WEB EXECUTOR. Model: Sonnet 5.5 (not Opus; the order assigned this work to me).
All tests are my own. I did not use the v4 tests or any checker's scripts. Every number below comes from a result file in this folder.

## Section A - Answer first
1. **490 checks, 490 pass, run on the final build (VTES-LLM-LAUNCHER_v5.html, 28,176 bytes, built 2026-10-06 09:19 UTC = 5:19 AM EDT).** That is 98 click checks, 129 data-world checks, 166 "nothing of v3 was lost" checks, 16 before-and-after checks on the real v3, and 81 PowerShell checks.
2. **Install and rollback under PowerShell 7.4.6 for Linux: 81 of 81, 22 scenario groups.** In every scenario the SHA-256 of every file in the whole fixture (the "Desktop" folder holding the REAL v3 launcher, and the parent folders) was identical before and after, recursively. After install plus rollback the whole fixture equals the start.
3. **The tests can fail:** five deliberate breaks of the live layer were each caught (Section F).
4. **Failures along the way, so you can see the method working:** Section G lists 9 things my own tests caught while I built this, including 2 real bugs in the product (a rollback that refused a folder with an accent, and buttons shown in tiny type because v3's CSS is invalid). All are fixed and re-tested.
5. **Not tested, and cannot be from the cloud:** the PC, Windows PowerShell 5.1, a real clipboard, real time, vtes:// registration, the outside sites (KNOWN-LIMITS.md).

## Section B - How the page was tested
Headless Chromium (/opt/pw-browsers/chromium, Playwright), page opened from `file://`, copied with its scripts and data folder into a temporary folder. Fake clock Playwright, fixed at 2026-10-06 2:00 PM ET. Outside requests (https and the file:///C: snapshot links) are aborted, so no test depends on the internet. Clipboard writes are recorded by the test.
Files: test-v5-lib.js (helpers), test-v5-click.js, test-v5-worlds.js, test-v3-survives.js, test-v3-before.js, run-mutations.sh, test-install-rollback.sh.

## Section C - Click everything: 98 of 98 (test-v5-click-RESULT.json)
1. **The test finds the controls itself.** It lists every `a[href]`, `button`, `select`, `summary`, `input` and `textarea` on the page, de-duplicated by tag, id, address, text and data attributes, and checks that each one was exercised: **87 of 87**.
2. **The 87 are:** 8 tabs on the page, 10 old-panel tabs, 2 corner links (PANEL, INDEX), 6 https links (Open buttons for LLM-02, 04, 06, 07, 08, and the Miami-Dade index), 22 Drive proof links, 2 vtes:// links, 9 big copy buttons (3 LLM cards, 5 role cards, the top RAMBO button), 13 "Hand work here" buttons, 6 queued-item buttons, 3 pick lists (task kind, From, To), and 6 others (Copy packet and open, Just show the packet, Read me first, note box, packet box, search box).
3. **What each check proves:** a tab jumps to a section that exists and has size; an old tab carries the label "OLD PANEL, snapshot of 2026-09-02, not live", points at the snapshot and opens a new tab; an https link opens a new tab with noopener; a big copy button puts a packet addressed to the right window on the clipboard with the six labels (WHO, TASK, HOW TO ANSWER, HARD RULES, FACTS LIVE IN, RETURN PATH) and an Eastern stamp, and the card says "Copied the packet." and shows the steps; a queued button fills note, To and packet; each of the 9 task kinds sets the To box; each of the 13 To and From entries builds a packet with that id (GROK, the button that threw an error in v3, is among them); the search box handles an id, a hashtag, no match, mixed case, a job word and clearing.
4. **Not clicked, only checked:** the 2 vtes:// links (the operating system opens them) and the 2 corner links (they leave the page); each is checked by address and label.
5. **Also in this file:** the copy-failure path (both copy routes fail: the card says "Could not copy by itself", where the packet is, and still gives the steps); 8 section jumps at 4 window widths never hide the heading under the tab bar; no sideways scroll at 1300 and 420 pixels; the no-data page has the same controls minus the 2 vtes links; 0 page errors during all of it.

## Section D - Data worlds: 129 of 129 (test-v5-worlds-RESULT.json)
Each world is a folder of data files plus the page. W1 none: 33. W2 fresh: 14. W3 stale: 7. W4 future dates: 11. W5 status-only writer: 6. W6 ticks: 16. W7 Miami-Dade: 5. W8 two-hour run: 5. W9 living writer, deleted file: 6. W10 bots: 10. W11 Grok: 4. W12 times: 3. W13 redraw: 3. W14 ten hours: 3. W15 half package: 3.
1. **None (the shipped state):** 0 green anywhere; every window, role and all 6 bots say NO DATA in red; the top line says "data as of NO DATA" in red; no typed interval ("every N minutes", "15-minute", "300 seconds", "runs every") anywhere on the page; token numbers absent; housekeeping "Last report time: NONE"; Miami-Dade "unknown of 300" and 22 links; no vtes:// link, and 8 one-sentence notes saying what is missing.
2. **Fresh:** every card and every bot line green; the interval sentences read "every 5 minutes" from the heartbeat; a bot shows its own "Scheduled every 10 minutes"; vtes:// links appear on LLM-01 and LLM-03 only (registered AND filled), the other six say the entry is empty; token monitor, housekeeping, health, state, money and live repair rows show the fixture's numbers.
3. **Stale / future / 2-hour:** a 40-minute-old heartbeat with a 5-minute tick: 0 green. All files a year ahead: 0 green, BAD CLOCK, "2027" shown, numbers hidden. One window, one proof and one bot's last run 30 minutes ahead: only that one is BAD CLOCK. Clock one hour before the build time: the top line and footer say BAD CLOCK in red. **Two simulated hours with the real 60-second timer and no writer: 0 green, "Re-checked Oct 6, 4:00 PM EDT".**
4. **Status-only writer:** ten ids stamped up: 0 green, LLM-01 reads "WRITER SAYS UP, NOT PROVEN" in grey, "Windows confirmed up now: 0 of 11".
5. **Ticks:** interval_sec 864000, 3601, 0, 0.001, 0.5, -5, "300" and true: heartbeat NOT OK and 0 green windows. A 30-minute tick 20 minutes old is green, 100 minutes old red; a 60-minute tick green at 170 minutes, red at 190; 5-minute: 14 green, 16 red; 1-second: 2 green, 4 red.
6. **Bots:** result code 267009 red FAILED with the code; disabled red; late red; no entry red NO DATA; no schedule interval grey; running with result 0 green; interval_sec 0.001 in the bots file: all 6 NOT OK; bots file dated ahead: all 6 BAD CLOCK.
7. **Miami-Dade:** 30-day-old file: 0 green, 22 neutral marks; counted null: "unknown of 300"; a bare number 3 read as 03; a file dated ahead: BAD CLOCK.
8. **Writer alive and file deleted:** a writer rewriting every minute for 12 minutes keeps LLM-01 and a bot green and shows the new seen time; deleting the heartbeat file gives NO DATA at the next tick; deleting the bots file gives NO DATA on all 6 bots.
9. **Redraw and memory:** a 470-character selection in the Health panel survives 3 ticks; typed text survives; a selection inside an unchanged card state line survives. Ten simulated hours (600 reloads): DOM nodes and script tags did not grow; 0 page errors.
10. **Half package (no config file, no data folder):** 0 page errors, everything NO DATA, the hand-off still works.

## Section E - Nothing of v3 was lost: 166 of 166, and the nine defects before and after
1. **test-v3-survives-RESULT.json (166):** the same page is opened as the REAL v3 and as v5, and every card, bot, queued item, picker row, tab, section heading and repair row is compared. 9 LLM cards (name, role, description, pool, hashtags, address text, how-to line, Hand work here button, Open buttons), 6 role cards, 6 bots, the 6 queued cards word for word, 9 picker rows, 17 tabs in the same order plus the new MIAMI-DADE, the six numbered headings in order plus a 7th, all 12 repair rows word for word with the OPEN row still marked, and the packet text for three window pairs identical except the stamp. The complete list of intentional text edits (9 phrases) is in the test file; nothing else differs.
2. **test-v3-before-RESULT.json (16 of 16):** the same checks run on the real v3 and on v5. Each row shows what v3 does and what v5 does; in all 16 rows v3 shows the defect and v5 does not. A row proves the page change only; PORT-REPORT.md gives the honest verdict on each defect, including what stays unproven.

## Section F - Do the tests catch mistakes? (mutation-RESULT.txt)
I broke the live layer on a scratch copy five ways and ran the data worlds against each. Each was caught:
- M1 trust future dates: 115 of 126 pass (11 failures). M2 let the writer count as proof: 123 of 126 (3). M3 a fixed 15-minute limit: 123 of 126 (3). M4 a late bot still green: 128 of 129 (1). M5 a vtes:// link always shown: 123 of 129 (6).

## Section G - What my own tests caught while I built it
1. **Real bug, installer: a folder name with an accent made the rollback refuse** (the record was written as plain ASCII, so e-acute became "?"). Found by scenario S16. Fixed: the record is UTF-8 with a byte-order mark when the text needs it. Re-tested.
2. **Real bug, v3 CSS: every button in v3 showed in tiny 13-pixel type** because `.btn{font:700 16px inherit}` is invalid CSS and was ignored. Found by the "nothing lost" test comparing sizes. Fixed in v5 (17 pixels, bold; big copy buttons 20). Logged as D10.
3. **My own regression:** I first dropped the address line from the iPhone card (LLM-05). The no-data world expected 8 address notes and found 7. Restored.
4. **Layout: the taller tab bar (each old tab carries its label) hid headings after a jump,** and at 420 pixels wide it covered 80% of the screen. Found by measuring the bar. Fixed: its height is measured into a variable, and on windows under 1150 pixels it is not sticky.
5. **Inventory error:** my step-1 note counted 11 repair rows; there are 12 (11 plus the OPEN row). Corrected.
6. **Test mistakes, not product faults:** a first PowerShell expectation of 5 files directly in the Desktop folder (there are 4, the 5th is in a sub-folder); a regex that missed the packet stamp; two Miami-Dade counts that included the header badge; a race in the "writer alive" check; test state left over from the From/To list test; hidden popup tabs that stopped Playwright's clicks. All fixed in the tests, none changed the page.

## Section H - PowerShell scenarios (test-install-rollback-RESULT.txt, test-install-rollback-HASHES.txt)
S1 single install and rollback. S2 second install onto the existing folder (refused, folder byte-identical). S3 install fails part-way, then rollback. S4 the v3 file is edited after the install, rollback leaves it. S5 two rounds. S6 git refusals: target inside a checkout, a symbolic link into one, a `.git` file in a parent, typed path in git but real place outside, git not installed. S7 no -TargetDir. S8 rollback with no record. S9 target inside the v3 folder (4 cases). S10 -V3File missing, and an edited v3 launcher. S11 -StatusDir. S12 a file added to the new folder survives the rollback. S13 a doctored record is refused. S14 dry runs. S15 existing empty folder and a dangling link at the target. S16 a space and an accent in the name. S17 the Undo_Manifests stub. S18 an incomplete package. S19 ASCII check of both scripts. S20 missing parent folder. S21 folder renamed after the install. S22 a v3 folder with 205 files and a 20 MB file.
Evidence line example (S1): "v3 untouched: SHA256 of all 4 files in the v3 folder is identical before and after", "new folder check: 10 of 10 copied files have the same SHA256 as the package", "v5 rolled back completely", and the whole-fixture comparison "SHA-256 of N files (and the folder list) before == after: IDENTICAL" 22 times.

## Section I - Not tested
Windows, Windows PowerShell 5.1, Edge, the real clipboard, real elapsed time, vtes:// registration, the outside links, junctions and `subst` drives, names with `#`, `%` or `\`. The three other Desktop pages (stand-ins used). See KNOWN-LIMITS.md for the exact PC check for each.

Jorge, shall the independent checker audit the port now? (yes/no)

TRK-2026-9910-B · TEST-REPORT · v5 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v5
