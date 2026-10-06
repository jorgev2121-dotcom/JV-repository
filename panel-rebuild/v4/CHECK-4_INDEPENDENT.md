# CHECK-4 - independent third checker, panel v4, after fix round 2

OPUS 5.5 · PANEL V4 CHECKER 3 · cloud session · 2026-10-06. Checked branch `claude/panel-v4-sonnet-build` at commit 554aaf5.
I did not build v4. I did not use the engineer's tests or checker 2's scripts. Every result below comes from my own scripts and fixtures (kept in my scratchpad, not committed: this file is my only new file).

## Section A - Verdict

**FAIL. I found 16 new flaws (F1 to F16). Of the 14 N-flaws, I confirm 8 FIXED and 6 PARTIAL. Of the 7 downgraded claims, 2 FIXED, 4 PARTIAL, 1 NOT FIXED.**

1. **Worst: a second install and rollback silently puts an OLD copy of Write-VtesStatus.ps1 back over a newer one.** A leftover backup from the first round is reused. The tamper check then says PROBLEM. (F1, reproduced.)
2. **Second: EDIT-VtesStatus-v4.ps1 silences the tamper alarm.** If Write-VtesStatus.ps1 was already changed by hand, EDIT writes the new hash into MANIFEST.sha256 and Verify then says OK. That is the same danger as `-Build` in the live folder, which DESKTOP-WORK forbids. (F2.)
3. **Third: the page carries a hand-set build time 14 hours in the future.** It says "Built Oct 6, 5:00 PM EDT". Git says it was built at 3:01 AM EDT. In my real-time run the top line read "Built Oct 6, 5:00 PM EDT ... Re-checked Oct 6, 3:47 AM EDT". (F3.)
4. **Fourth: the Map says Grok Bots "UP (proof)" with no proof at all.** That breaks the contract's own rule 5. (F4.)
5. The good news, measured: future dates, the 2-hour stale run, the status-only writer, the stale Miami-Dade file, the time zones, and a half-failed install all now behave as claimed. Typed text survives the 60-second reload. Memory stays flat over 10 simulated hours. The reload works from file:// in real time.

Flaw 1 (built on the older launcher, not Jorge's live v3) is known and not counted again.

## Section B - The 14 N-flaws, re-verified

Browser evidence: my harness `w1.js` to `w6.js`, headless Chromium at /opt/pw-browsers/chromium, file://, Playwright clock at 2026-10-06 2:00 PM EDT, offline unless stated. PowerShell evidence: PowerShell 7.4.6 for Linux, downloaded into my scratchpad from the PowerShell GitHub release, run on copies of the v3 folder from branch `claude/executor-tray-icon-1cazza`, SHA256 of every file before and after.

1. **N1 future dates. FIXED.** Every file dated one year ahead: 0 green chips, 0 green cards, 0 green badges, 0 vtes:// links, "2027" shown, token numbers hidden. One window's last_seen 30 minutes ahead: that card alone is red BAD CLOCK. A proof_at 30 minutes ahead: same.
2. **N2 cards never re-checked. FIXED.** Page open 2 hours with no writer: 12 green chips and 12 green cards at load, 0 and 0 after. The age line turned red. In a real 2-minute run with no fake clock, a rewritten file was picked up within 62 seconds and a deleted file went NO DATA within 61 seconds.
3. **N3 the always-up writer. FIXED.** Status file only, ten ids stamped up: 0 green anywhere. RAMBO reads "WRITER SAYS UP, NOT PROVEN". "Confirmed up now: 0 of 12".
4. **N4 status-only contradictions. PARTIAL.** The status-only case is fixed: Map says NOT BUILT and no UP. But a poller report with no proof turns Grok Bots "UP (proof)" (F4).
5. **N5 interval_sec. PARTIAL.** 864000, 3601, 0, -5 and the text "300" all give red NOT OK and 0 green. But 0.001 is accepted although the contract says 1 to 3600 (F13). And any tick above 15 minutes can never stay green (F8).
6. **N6 stale Miami-Dade proof. FIXED.** File 30 days old: 0 green "proof checked", 22 grey marks.
7. **N7 times with no zone. FIXED.** Packet header: "Oct 6, 2:00 PM EDT". Pad entry: "Oct 6, 2:00 PM EDT", no slash dates.
8. **N8 vtes-verify.js not restored. PARTIAL.** Fixed in a clean run (scenario S1, 37 of 37 files identical). But after a second round the rollback "restores" vtes-verify.js from a stale backup that is older than the install it is undoing (scenario S5, F7).
9. **N9 half-failed install. FIXED.** I made the install fail part-way by putting a FILE named `data` in the folder. It copied 5 files, then stopped with "FAILED part-way". The rollback brought back 38 of 38 files identical.
10. **N10 tamper alarm after DESKTOP-WORK item 4. PARTIAL.** Install, EDIT, rollback with nothing in between: 37 of 37 identical (S4c). But doing item 4's own proof step (run Verify) makes the rollback inexact (S4). And EDIT silences an existing tamper alarm (F2).
11. **N11 INSTALL picks a folder. PARTIAL.** No -LiveDir: refused. A folder inside a git checkout: refused, 36 of 36 files unchanged. A `.git` file in a parent: refused. But the same checkout reached through a link is NOT refused (F5).
12. **N12 bell always red. PARTIAL.** Red with an overdue item, blue with open items, grey with none: correct. But an item due today shows blue "0 due or overdue" (F10). And a deleted reminders file keeps its old count (F11).
13. **N13 Map leaves out LOCAL and CHIEF. FIXED** (in words). The box is there with live state.
14. **N14 DESKTOP-WORK gaps. FIXED** as text: items 1 to 7 each have a "Prove" line, and item 4 forbids `-Build`. Its proof step still triggers F7, but that fault is in the rollback.

**N-tally: FIXED 8 (N1, N2, N3, N6, N7, N9, N13, N14). PARTIAL 6 (N4, N5, N8, N10, N11, N12). NOT FIXED 0.** The engineer claimed 14 FIXED.

## Section C - The 7 downgraded claims

1. **Flaw 5, STALE red everywhere. FIXED.** Same evidence as N2.
2. **Flaw 6, times disagree. PARTIAL.** Zone and year are fixed. But the build time disagrees with every other time on the page (F3).
3. **Flaw 8, Grok contradiction. PARTIAL.** The Grok text now says "reporting UP with proof" when no proof exists (F4).
4. **Flaw 12, counts. FIXED.** My own count matches 93; see Section E.
5. **Flaw 14, rollback exact. NOT FIXED.** Not exact in 6 of my 18 scenarios: S4, S5, S9, S10, S11, S12. Details in F1, F6, F7 and F14.
6. **Flaw 15, wrong folder. PARTIAL.** The link bypass (F5).
7. **Flaw 17, contract ambiguous. PARTIAL.** Rule 3 contradicts the heartbeat's 15-minute limit (F8). Rule 5 needs a BOTS proof field that the contract never defines (F4).

## Section D - New flaws, worst first

F1. **A second rollback restores an OLD backup over a newer code file.**
- Files: ROLLBACK-v4.ps1 line 62 keeps `NAME.pre-v4` when it keeps a changed file. INSTALL-v4.ps1 line 106 and EDIT-VtesStatus-v4.ps1 line 30 make a backup only if none exists, so that old backup is reused next time. ROLLBACK line 61 then restores it.
- Scenario S9:
  1. Install, then EDIT.
  2. Make a later legitimate change to the writer, then roll back. The writer is kept, and the original's backup is left behind.
  3. Redeploy writer version B (Verify OK, sha 81683720...).
  4. Install, EDIT, roll back.
- Result: "restored Write-VtesStatus.ps1". The writer is now sha e4e3b2b0..., the ORIGINAL from before round 1, not B. Verify: "PROBLEM: changed = Write-VtesStatus.ps1". Rollback exit 4.

F2. **EDIT approves a hand-edit that the tamper check was already flagging.**
- File: EDIT-VtesStatus-v4.ps1 lines 35 and 47 to 52. It swaps the manifest line without first checking that the file matches the old line.
- Scenario S13: before install, LLM-09 is added to the writer by hand. INSTALL's own Verify run prints "PROBLEM: changed = Write-VtesStatus.ps1", yet INSTALL ends with exit 0 (F15). EDIT then adds LOCAL and CHIEF and rewrites the manifest line. Verify now prints "OK: 32 code files match". The unexplained change is hidden.

F3. **Build time hand-set in the future.**
- Files: VTES-LLM-LAUNCHER_v4.html line 189 has `VTES4_BUILT = "2026-10-06T21:00:00Z"`, and line 266 says "built Oct 6, 2026, 5:00 PM EDT". build-v4.js line 5 takes this from the `V4_BUILT` environment variable.
- Git: the commit that last built the page (cac4037) is dated 2026-10-06 07:01 UTC, which is 3:01 AM EDT.
- The BAD CLOCK rule does not cover the build time.
- Real-time run: "Built Oct 6, 5:00 PM EDT, data as of Oct 6, 3:42 AM EDT ... Re-checked Oct 6, 3:47 AM EDT."

F4. **Grok Bots shows "UP (proof)" with no proof.**
- Files: vtes4-cards.js line 11. `botsBuilt()` uses `executor('BOTS')`, which needs no proof_at for BOTS (vtes4-live.js lines 85 to 91, where CHAT_ONLY has no BOTS).
- The contract contradicts itself: DATA-CONTRACT.md line 15 says "UP only with a poller report that has proof", but line 41 defines proof_at only for chat-only windows.
- World B: BOTS `{state:'up', last_seen: 1 minute ago}` with no proof_at. Map: "UP (proof)". Grok card: "A Grok bot is reporting UP with proof".

F5. **The git-checkout refusal is bypassed through a link.**
- File: INSTALL-v4.ps1 lines 28 to 36. Resolve-Path keeps the link path, so the walk up the folders never finds `.git`.
- Scenario S6b: a committed fake repo, with a symlink to its `tools/vtes-panel` folder passed as -LiveDir. INSTALL: exit 0. `git status`: " M tools/vtes-panel/MANIFEST.sha256" plus 9 untracked v4 files.
- On Windows the same would be a junction or a `subst` drive: UNVERIFIED, PC check 1.

F6. **A manifest with Windows line ends or a byte-order mark is not restored, and its only backup is deleted.**
- Files: INSTALL-v4.ps1 lines 132 to 134 and ROLLBACK-v4.ps1 line 76 rewrite it with LF and no BOM. ROLLBACK line 78 then prints a false NOTE, and line 79 deletes MANIFEST.sha256.pre-v4.
- S10 (CRLF) and S11 (BOM): the SHA256 differs after rollback. The NOTE says it "was changed legitimately after the install", but nothing changed it. Afterwards 0 `.pre-v4` files are left.

F7. **Following the documented proof step makes the rollback inexact and leaves a stale backup.**
- Files: EDIT-VtesStatus-v4.ps1 line 56 and DESKTOP-WORK.md line 23 both say to run Verify. That rewrites vtes-verify.js.
- S4: "WITH NOTES: 13 of 14". vtes-verify.js still says `"checked":32` after the v4 files are gone, and `vtes-verify.js.pre-v4` is left behind.
- S5 (install and rollback again): "restored vtes-verify.js" from the round-1 backup. It printed "the others are explained in the notes above", but there was no NOTE line at all.

F8. **Any tick above 15 minutes can never be green, although the contract allows up to 60.**
- DATA-CONTRACT.md line 13 allows interval_sec up to 3600. Line 36 (vtes4-live.js line 4) makes the heartbeat file STALE after 15 minutes.
- World C: interval_sec 1800, file and sightings 20 minutes old (on schedule). Result: RAMBO red "STALE since Oct 6, 1:40 PM EDT", tick "every 30 minutes (STALE)".

F9. **Wrong state during the reload gap.**
- File: vtes4-live.js line 133 empties VTES_STATUS before the files reload. HTML line 977 starts the 2-minute probe timer and the 60-second reload timer together, so at every 2-minute mark a probe answer repaints the chips mid-reload.
- World F: RAMBO grey "NOT PROVEN". Over 10 reload ticks its chip went to red NO DATA and back 5 times, exactly at the 5 shared ticks. It flipped once more when I called reload and refresh back to back.

F10. **The bell misses "due today".**
- File: vtes4-cards.js line 123 counts an item only after 23:59:59 of its due day. A due date not in YYYY-MM-DD form is never counted.
- Clock 2026-10-11 noon, the real reminders: R-01 is due that day. Bell: blue, "21 open, 0 due or overdue (blue: none is due)". A due date of "10/01/2026" also stays blue.

F11. **A deleted reminders file keeps its old count.**
- File: vtes4-live.js line 138 clears data and status files on a failed load, but not reminders.
- World D: vtes-reminders.js deleted, one reload later the bell still shows 21.

F12. **Status-writer entries for LLM-04 or LLM-07 stop the site check for good.**
- File: HTML line 746 replaces STATUS[id], probe address included.
- N3N4 world: "LLM-04: checking", "LLM-07: checking" for the whole run, while LLM-08 and LLM-10 answered "no".

F13. **interval_sec 0.001 is accepted** (vtes4-live.js line 44 tests `iv <= 0`, not `iv < 1`). The heartbeat badge says OK while all 12 windows are red: one page, two answers.

F14. **Rollback removes folders that existed before.**
- File: ROLLBACK-v4.ps1 lines 85 and 105 delete an empty `data` or `_Rollback` folder, whoever made it.
- S12: both existed empty before install; both are gone after rollback.

F15. **INSTALL says DONE with exit 0 even when its own Verify run prints PROBLEM.** File: INSTALL-v4.ps1 line 148 never reads Verify's result (S13).

F16. **The 60-second refresh wipes what the user selected or was told.**
- Files: vtes4-panels.js line 102 and HTML line 977 (renderMap).
- A selection of 468 characters in the Health panel became 0 after one tick. The Map's "Copied." note was erased.
- Typed text was NOT lost: #say, #reply, #note and #q, focus, caret and the Dir filter all survived.

What passed my reading:
- No non-ASCII byte in INSTALL, ROLLBACK, EDIT, the vtes4 scripts, vtes-status.js or the data files (`grep -P '[^\x00-\x7F]'`: no hits).
- No admin rights, network call or password in the three PowerShell scripts.
- v3's launcher SHA256 was unchanged in all 15 fixture folders I checked afterwards (every scenario except the no-change S5, S7 and S7b runs, which used folders already counted).

## Section E - My own counts, N of N

1. **Items, my method:** every distinct `a[href]`, `button`, `select` and `summary` across Console, Dir, Panels and the three Map tabs, de-duplicated by tag, id, address, text and data attribute, plus the page load.
   - Shipped data: **93** = page load + 31 https links + 2 local links + 55 buttons (12 are chips) + 2 drop-downs + 2 expanders.
   - With data saying vtes:// is registered for LLM-01: **94** (one more link appears).
   - Next to the others: engineer 93 (same breakdown as mine), checker 2 92 (54 buttons, one fewer than me), checker 1 88 (older build).
   - The count changes with the data, so any future count must name its data world.
   - The 7 text fields and 1 file picker are not counted.
2. **Button presses:** 88 of 88 presses across Console, Dir and Map (Dock, Clear pad and the microphones left out), 0 page errors.
3. **N-flaw worlds:** 20 of 20 ran with 0 page errors.
4. **Gap, reminders and Grok worlds:** 7 of 7 ran with 0 page errors.
5. **Memory, 10 simulated hours** (600 reloads, writer rewriting the heartbeat every tick, Map open for the second half):
   - JS heap 1.07 MB at start, 1.27 MB at hour 1, 1.99 MB at hour 5 (the Map opened), 2.13 MB at hour 10.
   - DOM nodes 1301 at start, 1740 at hours 5 and 10. Listeners 65, then 82.
   - 0 leftover script tags. No growth flaw found.
6. **Real time, file://, no fake clock:** 2 of 2. A rewritten tokens file was shown after 62 seconds. A deleted heartbeat went NO DATA after 61 seconds.
7. **PowerShell scenarios, 18 in all.** The rollback came out byte-identical (or "nothing changed" was true) in 10 of 18:
   - Byte-identical or unchanged: S1 single install, S2 double install, S3 half-failed install, S4c EDIT, S6a git refused, S6c `.git` file refused, S7 no -LiveDir, S7b DryRun with no -LiveDir, S8 rollback with no record, S14 EDIT twice.
   - Not exact: S4, S5, S9, S10, S11 and S12.
   - S6b broke the git rule.
   - S13 hid a tamper.

## Section F - UNVERIFIED, with the exact PC check for each

1. **Junction bypass on Windows (F5).** PC check: `cmd /c mklink /J C:\temp\pj C:\Users\JV\JV-repository\tools\vtes-panel`, then `INSTALL-v4.ps1 -LiveDir C:\temp\pj -DryRun`. If it prints "DRY RUN" instead of "STOP", F5 is real on the PC. DryRun changes nothing.
2. **Line ends of the live MANIFEST.sha256 (F6).** PC check: `Format-Hex MANIFEST.sha256 | Select-Object -First 2` in the live folder. "0D 0A" or a start of "EF BB BF" means F6 applies.
3. **Is the live writer already hand-edited (F2)?** PC check: `Verify-VtesPanel.ps1 -Dir "<live folder>"` BEFORE any install. If it prints PROBLEM, do not run EDIT.
4. **Windows PowerShell 5.1.** Everything here ran on 7.4.6 for Linux. PC check: copy the live folder to `C:\temp\v4test`, run INSTALL twice, then ROLLBACK, and compare `Get-ChildItem -Recurse | Get-FileHash` before and after.
5. **Edge or Chrome on Windows, reload from file://.** PC check: open v4, wait 2 minutes, rename `data\vtes4-heartbeat.js`, and within 1 minute RAMBO must go red NO DATA.
6. **The flicker (F9) to the eye.** PC check: turn Wi-Fi off and watch the RAMBO chip at each 2-minute mark.
7. **Does the live writer stamp LLM-04 or LLM-07 (F12)?** PC check: open `vtes-status.js` in the live folder and look for those ids.
8. Still open from earlier checkers: the real clipboard, the 31 https links and 22 Drive proofs, vtes:// opening the right window, and the live v3 file (flaw 1).

Jorge, shall the engineer fix F1 to F16 in the same round as the port to your live v3? (yes/no)

TRK-2026-9910-B · CHECK-4 · v1 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v4 #independent-check
