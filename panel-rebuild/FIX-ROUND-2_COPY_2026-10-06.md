# FIX-ROUND-2 - the 14 new flaws and the 7 downgraded claims from CHECK-3 (TRK-2026-9910-B, 2026-10-06)

SONNET 5.5 · PANEL V4 FIX ROUND 2. Branch claude/panel-v4-sonnet-build. Work only in panel-rebuild/v4/. No Drive, no PC, no pull request. Not ported onto the live v3: that file has not arrived.

## Section A - Answer first
1. **Of the 14 new flaws, 14 are FIXED on cloud evidence. Of the 7 claims the checker downgraded, 6 are FIXED and 1 is PARTIAL (flaw 12, the counts).** I do not claim zero flaws: see Section D.
2. **The worst one is closed.** A file dated in the future is now red BAD CLOCK, never green, in every file, every window, every proof time. The page shows the year whenever it is not this year.
3. **The page can no longer contradict itself.** Every 60 seconds it re-reads all data files (cache-busted) and redraws the header chips, the cards, the strip and the panels together. A simulated 2-hour run shows lights and cards agree, in both the "writer stopped" and the "writer keeps writing" case.
4. **The heartbeat writer that always says "up" can no longer make anything green.** Its reports show grey "WRITER SAYS UP, NOT PROVEN". Green needs the poller's own report.
5. **Install and rollback are now exact,** shown by SHA256 of every file before and after, run under PowerShell 7.4.6 for Linux: 9 of 9 scenarios pass (the checker's A, B, C plus 6 new ones). Not run on Windows PowerShell 5.1.
6. Tests: 3,800 of 3,800 (old walk), 70 of 70 (new worlds, 3 runs), 9 of 9 PowerShell scenarios. One counting method: **93 items**, next to the checker's 92 and 88 (details in TEST-REPORT.md).

## Section B - The 14 new flaws
**N1. Future-dated file green forever, no year. FIXED.** `vtes4-live.js`: a time more than 2 minutes ahead of the PC clock gives state BAD CLOCK for a file `at`, a window `last_seen` and a `proof_at`; BAD CLOCK is red, hides the file's numbers, and a future heartbeat turns every window red. `fmt()` adds the year when it is not the current year. Evidence: tests FUTURE, FUTUREEXEC, FUTUREPROOF: 0 green chips, 0 green cards, 0 green badges, no vtes:// link, "BAD CLOCK" on the age line, card and chip, "2027" shown, token numbers hidden; a control proves other windows still go green when their own times are fine. Contract rules 1 and 2.

**N2. Cards and panels never re-checked. FIXED.** Every 60 seconds `VTES4.reload()` loads all six data files, vtes-status.js and vtes-reminders.js again with a cache-busting `?t=` and then redraws chips, cards (state line, tick sentence, open block, Grok note, without wiping the packet messages), the age line, the strip, the panels, the bell, the Map if open. A deleted file becomes NO DATA. Evidence (simulated clock): TWOHOURS-NOWRITER at load all agree; after 2 hours 0 green chips and 0 green cards, heartbeat and token badges red, age line red and "Re-checked Oct 6, 4:0x PM EDT"; TWOHOURS-WRITER lights and cards agree after 2 hours with a writer every 10 minutes, newest burn rate 53000 shown (proves the reload picks up new files), deleted file shows NO DATA on the next tick, writer stopped for 20 minutes turns lights and cards red together. UNVERIFIED in a real browser over real time (KNOWN-LIMITS 17).

**N3. The writer v4 trusts always says "up". FIXED.** A report that comes only from vtes-status.js is never green: grey "WRITER SAYS UP, NOT PROVEN", grey chip (`st-unk`), not counted in "Windows confirmed up". Green needs a heartbeat report from the poller with this window's own last_seen within 3 ticks. Evidence: STATUSONLY (no data file, five windows stamped up by the writer): 0 green chips, cards or badges; RAMBO and Governor grey with the exact words; Chat ignores the writer. DESKTOP-WORK item 4 now says so.

**N4. Contradictions when only vtes-status.js reports. FIXED.** (a) RAMBO is no longer green while the age line says NO DATA: it is grey, the age line now reads "no valid data file ... Only the status-only writer has reported, and it cannot prove anything". (b) The Map's Grok Bots box: UP only with a poller report that has proof, otherwise NOT BUILT, never both (the subtitle, the status line, the wiring node, the Grok sentence and the Map reach note all read from one function). Evidence: STATUSONLY (box says NOT BUILT, no UP, in the Flow and Wiring tabs); BOTSPROVEN (UP shown, NOT BUILT dropped).

**N5. No upper limit on interval_sec. FIXED.** A number from 1 to 3600 only; anything else makes the heartbeat red NOT OK and every window red, and the badge names interval_sec. Evidence: BIGTICK: 864000, 3601, 0, -5 and the text "300" all give 0 green with 2-day-old sightings; 3600 is accepted and a 100-minute-old sighting is green (3 ticks = 180 minutes).

**N6. Miami-Dade proof checked from a stale file. FIXED.** A stale, future-dated or missing Miami-Dade file makes all 22 marks neutral grey "proof not current (the Miami-Dade file is STALE)". Evidence: OLDMIAMI: 0 green "proof checked", 22 grey marks; with a fresh file the 2 green marks remain (control).

**N7. Times with no zone. FIXED.** The hand-off packet stamp, new conversation-pad entries, older saved pad entries (converted when shown) and the transcript all use the Eastern short form with the zone, and the year when not current; the date in file stamps is the Eastern date. Evidence: STAMPS: packet "Oct 6, 2:00 PM EDT", pad entry the same, no "10/6/2026"; an old "10/6/2026, 6:00:08 PM" is shown with EDT; a 2025 time shows "2025".

**N8. Rollback did not restore vtes-verify.js. FIXED.** vtes-verify.js is a tracked file: its pre-state and a backup are recorded before Verify runs, and rollback restores it (or removes it if it did not exist). Evidence: scenario A 39 files identical before and after (the old run had 1 differing file); A0 38 identical.

**N9. Half-failed install could not be rolled back, and the rollback said "Nothing was changed". FIXED.** The record is written FIRST (before any copy) with the SHA256 of every v3 launcher and the pre-state of every file INSTALL or Verify can touch, backups are made before the first change, and the record is saved after every step. A rollback with no record now says "I cannot tell what v4 changed here. THIS ROLLBACK CHANGED NOTHING" and lists any v4-looking files. INSTALL also checks every file is readable before it writes anything. Evidence: B (the checker's run, unreadable manifest as a non-root user): INSTALL stops with nothing changed, ROLLBACK says it changed nothing, 37 files identical. D (part-way failure after 4 files were copied): rollback restores 39 files identical, nothing left over.

**N10. Rollback after the DESKTOP-WORK item 4 steps set off the tamper alarm. FIXED, with one disclosed behaviour.** Rollback no longer restores the manifest backup over anything: it takes out only the four v4 lines (and puts an edited writer's line back only if the writer itself was restored). New `EDIT-VtesStatus-v4.ps1` makes the Write-VtesStatus.ps1 edit with a backup, a record entry and a manifest-line update, so rollback undoes it exactly; `Verify -Build` in the live folder is now forbidden in DESKTOP-WORK. Evidence: C2 (safe way) 39 files identical, Verify OK, the writer's self-test "8 passed, 0 failed" after the edit; C1 (the checker's exact hand-edit and `-Build` steps): Verify prints "OK: 28 code files match" after the rollback (it printed PROBLEM before). **Disclosed:** in C1 the folder is not byte-identical, because the hand edit and the rebuilt manifest are legitimate later changes that the rollback keeps on purpose; it prints a NOTE and says "WITH NOTES: 12 of 13", never "exactly as it was".

**N11. INSTALL picked a folder by itself. FIXED.** `-LiveDir` is required (no auto-pick, no candidate list); a folder inside a git checkout is refused (it looks for .git in the folder and every parent); v3 names recognised: VTES-LLM-LAUNCHER*.html and VTES-CONTROL-PANEL*.html (excluding _v4, .bak, .pre-v4). Evidence: E (no -LiveDir: refused, nothing changed), F (git checkout: refused, nothing changed), G (only VTES-CONTROL-PANEL.html: recognised, installed, rolled back exactly). **Open tension, not decided by me:** the retired Drive page points at `C:\Users\JV\JV-repository\VTES-CONTROL-PANEL.html`, which may be a git checkout; if so INSTALL refuses it by design (KNOWN-LIMITS 2).

**N12. The bell was always red. FIXED.** Colour and count come from the reminders and today's date: red (flashing) only when something is due or overdue, blue when some are open and none is due, grey when none is open; recomputed on the 60-second tick; the tooltip gives the numbers and says the file has no time stamp (dashed border), and an optional `VTES_REMINDERS_AT` can supply one. Evidence: BELL: red / blue / grey, counts 2 / 1 / none.

**N13. The Map leaves out LOCAL and CHIEF. FIXED the second way (said plainly, not drawn).** A box on the Map says "The Map does not draw LOCAL (Local Executor) or CHIEF (Chief / Orchestrator)" and shows their live state in words, recomputed each tick. I did not add nodes because their reach table would be invented. Evidence: STATUSONLY world, Map text.

**N14. DESKTOP-WORK.md gaps. FIXED.** Each item has what to do and how to prove it; item 6 is split into 6a to 6e with a proof line each; item 4 no longer runs `Verify -Build` in the live folder (it says never to, and why) and uses EDIT-VtesStatus-v4.ps1; item 1 explains -LiveDir and the git refusal.

## Section C - The 7 claims the checker downgraded
**5. STALE red everywhere. FIXED** (was PARTIAL): the N2 tests show chips, cards, strip and age line all red together after 2 hours.
**6. Times disagree. FIXED** (was PARTIAL): N7 and N1: one Eastern short form with the zone everywhere, and the year when not current.
**8. Grok contradiction. FIXED** (was PARTIAL): N4: one Grok sentence from one function; the box can never show NOT BUILT and UP together.
**12. Test counts do not match. PARTIAL** (was NOT FIXED): ONE method is now defined in TEST-REPORT.md (every item listed, chips counted once inside "buttons", the no-script-errors check is not an item). My count is **93**; the second checker's is 92, the first checker's 88, my old figure 108 (wrong: chips twice and one non-item). The one-item gap to 92 is **not explained**: I do not have the checker's list. Not claiming this one.
**14. Rollback not exact. FIXED** (was NOT FIXED): scenarios A, A0, B, C2, D, E, F, G are byte-identical or unchanged by SHA256 of every file (TEST-REPORT.md, test-install-rollback-HASHES.txt); C1 keeps the legitimate later edits by design and says so. UNVERIFIED on Windows PowerShell 5.1.
**15. Overwrites v3 / wrong folder. FIXED** (was PARTIAL): N11.
**17. Contract ambiguous. FIXED** (was PARTIAL): DATA-CONTRACT.md rules 1 to 8: future times, interval_sec 1 to 3600, stale Miami-Dade file, proof from the poller only, the 60-second reload.

The four claims I already called PARTIAL in round 1 are unchanged and still PARTIAL: **7** (the Map's typed content is labelled, not verified; the bell is now state-based), **16** (the poller and the writer extension are PC work; the extension script exists but has not run on the live folder), **18** (no per-window completion percentage; I will not invent one), **21** (the original file in branch executor-tray-icon-1cazza still says v4; I may not touch it).

## Section D - Not done, and UNVERIFIED
1. **Flaw 1 (not ported onto the live v3): NOT FIXED.** The file has not arrived. Section E of CHECK-3 is the list the port must satisfy.
2. Nothing was run on Windows PowerShell 5.1, a real browser over real time, the real clipboard, the PC, Drive or the outside sites.
3. What really writes vtes-status.js on the PC is UNVERIFIED (read from the repo branch).
4. The reminders file has no time stamp; the bell says so.
5. The Map still carries typed text, labelled as such.
6. The git-checkout tension in N11.
7. The grey "WRITER SAYS UP" state is a design choice of mine; if Jorge would rather the status writer count for something, that is his call.

## Section E - Counts and one question
**New flaws: FIXED 14, PARTIAL 0, NOT FIXED 0. Downgraded claims: FIXED 6, PARTIAL 1 (flaw 12). Round-1 PARTIALs unchanged: 4 (7, 16, 18, 21). Flaw 1 NOT FIXED (waiting for the live v3 HTML).** Tests: 3,800 of 3,800; 70 of 70 (x3); 9 of 9 PowerShell scenarios; 93 items by one method.

Jorge, if your live panel turns out to sit inside the JV-repository folder, may I plan to put v4 in a plain copy beside it instead of refusing? (yes/no)

TRK-2026-9910-B · FIX-ROUND-2 · v1 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v4
