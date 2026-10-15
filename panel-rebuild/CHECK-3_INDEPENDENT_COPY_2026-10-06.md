# CHECK-3 — independent second checker, panel v4, after fix round 1

OPUS 5.5 · PANEL V4 CHECKER 2 · ☁️ cloud session · 2026-10-06. Checked branch `claude/panel-v4-sonnet-build` at commit 80cffea.
I did not build v4. I did not reuse the engineer's test (`test-file-click.js`). Every result below comes from my own scripts and my own data files.

## Section A — Verdict

**FAIL. I found 14 new flaws. Of the first checker's 21, I confirm only 9 as FIXED. 9 are PARTIAL and 3 are NOT FIXED.**

1. **Worst new flaw:** a data file dated in the future makes every light green, and it stays green. In my test, all 12 lights, all 12 cards, 13 green badges and 3 vtes:// links went green from files dated one year ahead. The page shows no year, so that 2027 date reads "Oct 6, 2:00 PM EDT", the same as today.
2. **Second worst:** the page never re-checks the cards. After the page sat open for 2 hours, the header lights turned red STALE. But all 12 cards still said green "UP", and the top strip still said "OK". The header and the cards contradict each other, and green shows with no fresh file behind it. The engineer's test freezes the clock, so it cannot see this.
3. **Third:** the existing heartbeat writer, which v4 now trusts, always writes "up". It never checks anything. A scheduled task keeps RAMBO green even when the Claude app is closed. That is a typed status on a timer.
4. **The rollback is not exact.** I ran INSTALL and ROLLBACK myself under PowerShell 7.4.6. There are three failures, all reproduced (flaws N8 to N10).

Flaw 1 (built on the old launcher, not Jorge's live v3) is still open. As ordered, I do not count it again. Section E lists what must survive the port.

## Section B — The 21 flaws from CHECK-2: my verdict on each claim

Evidence comes from my scripts `c3.js`, `claims.js` and `census.js`, described in Section D.

1. **Built on the old launcher. NOT FIXED** (the engineer agrees). Not counted again. See Section E.
2. **Header green from a website ping. FIXED.** No data, internet ON (every outside address answered 200): 0 green lights, and all four "Site answers" marks said "yes". But green can now come from another source, the always-"up" writer (new flaw N3).
3. **vtes:// link for an empty address entry. FIXED on the page.** Registered, with only LLM-01 filled: exactly one link, `vtes://llm-01`. The LLM-03 card said "registered, but the address book entry for LLM-03 is empty". Caveat: a future-dated heartbeat makes all three links appear (N1).
4. **health ok:false shows OK. FIXED.** The strip read "health: NOT OK - the report says there is a problem".
5. **STALE not red everywhere. PARTIAL.** On first load: 0 amber, and the LLM-01 chip read "STALE since Oct 5, 2:00 PM EDT". After the page stays open, the cards and strip stay green while the header goes red (N2). So STALE is still not red everywhere.
6. **Times disagree. PARTIAL.** Header, cards and panels use "Oct 6, 2:05 PM EDT". But the hand-off packet's stamp has no zone: "10/6/2026, 6:00:08 PM" (N7). And no time anywhere shows a year (N1).
7. **Hand-typed status on the Map. PARTIAL** (the engineer agrees: labelled, not checked). Also, the reminder bell is always red, which is typed (N12).
8. **Grok contradiction. PARTIAL.** The text is fixed: "ride on SuperGrok" and "nothing set up yet" are gone. But the Map's Grok Bots box can show "NOT BUILT" and "● UP" at the same moment (N4).
9. **LLM-09 missing. FIXED.** The LLM-09 card, the LLM-09 chip and the CHIEF card all exist. The Map still lacks CHIEF and LOCAL (N13).
10. **RAMBO button hidden at first. FIXED.** On first view the read-me and the RAMBO button are both visible, with the button top at 437 of 720 pixels. Pressing it filled the packet and printed the next steps.
11. **Bell phantom. FIXED.** The bell shows 21, and the reminders file has 21 items not done.
12. **Test counts do not match. NOT FIXED.**
    - My count: 92 distinct items. That is 1 page load, 33 links (31 https and 2 local), 54 buttons including the 12 chips, 2 drop-downs and 2 expanders.
    - The engineer says 108. The first checker said 88. Three checkers, three numbers.
    - The engineer's 108 counts the chips twice. TEST-REPORT.md line 13 puts "2 more window chips (Governor, Chief)" inside the 57 buttons, and then adds "12 window chips clicked one by one" on top.
13. **Install trips the tamper alarm. FIXED for a single install.** My run printed "OK: 28 code files match" before, and "OK: 32" after two installs. But see N10: following the engineer's own DESKTOP-WORK steps, the alarm fires after a rollback.
14. **Rollback not exact. NOT FIXED.** Three reproduced failures: N8, N9 and N10.
15. **Overwrites v3 / wrong folder. PARTIAL.** v4 now goes beside v3, and the v3 SHA256 matched before and after. But the script still picks a folder by itself whenever it finds exactly one candidate (N11).
16. **Ignores the existing writer. PARTIAL** (the engineer agrees). Worse: the writer it now trusts always writes "up" (N3).
17. **Contract ambiguous. PARTIAL.** The six points are answered. Three new gaps:
    - No rule for future times (N1).
    - No upper limit on interval_sec (N5).
    - No rule for what a stale Miami-Dade file means for the proof marks (N6).
18. **Completion measures the wrong thing. PARTIAL** (the engineer agrees).
19. **Hands a task to Jorge. FIXED** on the Cowork card and in DESKTOP-WORK.md. Item 6 has its own fault (N14).
20. **"DOWN - DOWN". FIXED.** Grok's tooltip reads "DOWN - seen Oct 6, 1:59 PM EDT".
21. **Two files called v4. PARTIAL** (the engineer agrees).

**My tally of the engineer's claims:**
- FIXED, 9: flaws 2, 3, 4, 9, 10, 11, 13, 19 and 20.
- PARTIAL, 9: flaws 5, 6, 7, 8, 15, 16, 17, 18 and 21.
- NOT FIXED, 3: flaws 1, 12 and 14.

The engineer claimed 16, 4 and 1. **I downgrade seven "FIXED" claims: flaws 5, 6, 8, 12, 14, 15 and 17.**

## Section C — New flaws, worst first

N1. **A future-dated file is green forever, and no time shows a year.**
- File and line: `vtes4-live.js` lines 24–25. A negative age passes the stale test. The same happens for executor `last_seen` and `proof_at` (lines 57 and 61).
- `fmt()` at line 14 has no year.
- Test FUTURE, every file dated 2027-10-06: all 12 chips green, all 12 cards green, 13 green badges, `vtes://llm-01`, `llm-03` and `llm-09` clickable.
- The age line read "data as of Oct 6, 2:00 PM EDT", the same as today.
- How it happens on the PC: a PC clock that is wrong, or a writer bug.

N2. **Cards and panels are drawn once and never re-checked. The header and the cards then contradict each other.**
- Cards are drawn once (HTML line 255). The strip and panels are drawn once (HTML line 729). Only the header chips re-check, every 60 seconds (HTML line 973). The data files are loaded once and never reloaded.
- Test FRESH: the clock ran forward 2 hours with the page open. Header: 0 green. Cards: 12 green "UP". Badges: 13 green "OK". The age line was unchanged.
- The page is meant to stay docked all day (the Dock button). So after about 45 minutes the header is always red, even when the PC is fine.

N3. **The writer v4 now trusts always says "up".**
- `Write-VtesStatus.ps1` line 47 (branch `claude/executor-tray-icon-1cazza`) writes `st = 'up'` every time it runs. It checks nothing.
- v4 treats that the same as the poller (`vtes4-live.js` line 46). DATA-CONTRACT.md line 23 and DESKTOP-WORK.md item 4 tell RAMBO to extend it.
- Test STATUSONLY, with no data file at all: LLM-01 and LLM-09 green "UP".

N4. **Contradictions when only vtes-status.js reports** (same STATUSONLY test).
- RAMBO is green while the age line says "NO DATA (no data file has been written yet)" and the strip says "heartbeat: NO DATA".
- The Map's Grok Bots box shows "NOT BUILT" and "● UP - seen Oct 6, 1:59 PM EDT" together. The writer accepts the id BOTS (line 19); see `vtes4-cards.js` lines 121–122 and HTML lines 785 and 846.

N5. **The tick has no upper limit.**
- `vtes4-live.js` lines 39 and 57 trust any `interval_sec`.
- Test BIGTICK (interval_sec 864000, every window last seen 2 days ago): all 12 green "UP".

N6. **Miami-Dade "proof checked" shows green from a stale file.**
- `vtes4-panels.js` lines 73–76 read `sources` whatever the file's age.
- Test OLDMIAMI (file 30 days old): two green "proof checked" marks remained.

N7. **Times with no zone.**
- The packet stamp uses `new Date().toLocaleString()` (HTML line 329). Measured: "10/6/2026, 6:00:08 PM".
- Conversation-pad entries do the same (HTML line 566).
- This contradicts read-me sentence 6, "Every time is Eastern time". The packet travels to other windows, so the zone matters most there.

N8. **Rollback is not exact: vtes-verify.js changes.**
- INSTALL runs Verify-VtesPanel.ps1 (INSTALL-v4.ps1 line 122), which rewrites `vtes-verify.js`. Rollback never restores it.
- Run A (verify, install, install, rollback, SHA256 of every file before and after): 1 file differs.
- After rollback, that file still says `"checked":32` for files that are gone.

N9. **An install that fails part-way cannot be rolled back, and the rollback says nothing changed.**
- The record is written only at the end (INSTALL-v4.ps1 line 112).
- Run B: MANIFEST.sha256 made unreadable. INSTALL stopped with an error after copying VTES-LLM-LAUNCHER_v4.html and the data folder.
- ROLLBACK then printed "STOP: no install record in that folder. ... Nothing was changed." That sentence is false.

N10. **Following DESKTOP-WORK item 4 and then rolling back sets off the tamper alarm.**
- Run C: install; add LLM-09, LOCAL and CHIEF to Write-VtesStatus.ps1; `Verify-VtesPanel.ps1 -Build`; install again; rollback.
- Rollback printed "v4 rolled back. v3 is exactly as it was." Then Verify printed "PROBLEM: changed = Write-VtesStatus.ps1".
- Cause: ROLLBACK-v4.ps1 lines 31–35 put back the first manifest backup over the legitimate rebuild.
- The edit to Write-VtesStatus.ps1 is a change to the v3 folder that rollback never undoes. The v3 check covers only the two launcher names (INSTALL-v4.ps1 lines 18 and 59).

N11. **INSTALL still picks a folder by itself.**
- With exactly one candidate it installs with no question asked (INSTALL-v4.ps1 lines 27–29).
- The candidates include the git checkout `JV-repository\tools\vtes-panel`, which holds the old launcher.
- It recognises only two v3 file names (line 18). 01_INVENTORY.md points at `VTES-CONTROL-PANEL.html`.
- So if the live v3 has another name, v4 can land in the git checkout and edit its tracked MANIFEST.sha256.
- DESKTOP-WORK says to pass -LiveDir, but the script does not require it.

N12. **The bell is always red.**
- HTML line 194 hard-codes a red background, and its title says "Red means something is due or overdue".
- The count comes from vtes-reminders.js, which has no "at". So the count can be any age, with no STALE mark.

N13. **The Map leaves out two windows.**
- LOCAL and CHIEF have cards and lights, and "Windows confirmed up" counts 12. The Map shows 10 windows plus Grok Bots (HTML lines 779–790).

N14. **DESKTOP-WORK.md has gaps.**
- Item 6 lumps five writers into one line with no proof line. That breaks its own header: "Each item says what to do, how to prove it".
- Item 4 tells RAMBO to run `Verify-VtesPanel.ps1 -Build` in the live folder. The script's own help says "run only from a known-good git checkout". Rebuilding there approves any change already present.

What passed my reading:
- No admin rights, no network call, no password, and no non-ASCII byte in INSTALL-v4.ps1, ROLLBACK-v4.ps1, the vtes4 scripts or the data files (`grep -P '[^\x00-\x7F]'`: no hits; `file`: ASCII text).
- The only deletes are rollback removing files the record says v4 added, its own backups, the record, and empty folders.
- v3's launcher SHA256 stayed the same in every run.

## Section D — My own counts, N of N

These are my scripts, kept in my scratchpad, not committed (my only file is this one). The browser was headless Chromium at /opt/pw-browsers/chromium, opened from file://, with Playwright's clock set to 2026-10-06 2:00 PM EDT and then run forward.

1. **Click census: 92 of 92 items respond.** I clicked all 96 button presses across Console, Dir and Map with 0 script errors. The engineer says 108 (flaw 12).
2. **Local links: 2 of 2 are named, but only 1 of 2 ships in the package.** VTES-REMINDERS.html is not in the v4 package. It exists only in the old repo folder. UNVERIFIED in the live folder.
3. **The six data worlds, 6 of 6 run with 0 page errors:**
   - EMPTY: 0 green, correct.
   - FRESH: 12 green at load, 0 green chips but 12 green cards after 2 hours (N2).
   - FUTURE: 12 of 12 green for good (N1).
   - STATUSONLY: 2 green with no data file (N3, N4).
   - BIGTICK: 12 green from 2-day-old sightings (N5).
   - OLDMIAMI: 2 green proof marks on a 30-day-old file (N6).
4. **Claim checks:** 13 of 21 claims re-run in the browser (flaws 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 15, 17 and 20). 3 install runs (A, B and C) under PowerShell 7.4.6. I downloaded it into my scratchpad from the PowerShell GitHub release.
5. **PowerShell results:** 3 of 3 runs kept v3 byte-identical. 0 of 3 runs ended in an exact, alarm-free rollback.

## Section E — Flaw 1: what must survive the port onto the live v3

When v4 is rebuilt on Jorge's live v3 file, all of these must still hold, and each needs its own test:

1. Lights come only from data files, with the four site pings kept as grey marks.
2. Health is green only when `ok` is exactly true.
3. STALE is red everywhere, including after the page has been open an hour (N2).
4. Future times are refused, and every time shows the zone and the year (N1, N7).
5. One Grok sentence, and no "UP" on anything marked NOT BUILT (N4).
6. The LLM-09 and CHIEF cards and chips, plus the live v3's own extras: the 17 tabs, the 6 executor roles, the 6 bots, the queued items and the Repairs log.
7. The RAMBO button visible on first view.
8. An install beside v3 with a record written before the first copy, and a rollback that restores vtes-verify.js and never overwrites a newer manifest (N8 to N10).

## Section F — UNVERIFIED, with the exact PC check for each

1. **Windows PowerShell 5.1.** I ran 7.4.6 for Linux. PC check: copy the live panel folder to `C:\temp\v4test`. Run `powershell -NoProfile -ExecutionPolicy Bypass -File INSTALL-v4.ps1 -LiveDir C:\temp\v4test` twice, then `C:\temp\v4test\_Rollback\ROLLBACK-v4.ps1`. Compare `Get-ChildItem -Recurse | Get-FileHash` before and after.
2. **Which folder INSTALL picks.** PC check: run `INSTALL-v4.ps1 -DryRun` with no -LiveDir and read its first line. If it names `JV-repository\tools\vtes-panel`, stop.
3. **What writes vtes-status.js now.** PC check: run `schtasks /query /fo LIST /v | findstr /i "VtesStatus"` and open vtes-status.js in the live folder.
4. **The real browser over time.** I used a simulated clock. PC check: open v4 with fresh data, leave it open for one hour, then compare the RAMBO chip with the RAMBO card.
5. **Eastern time on the PC.** PC check: the top line ends in "EDT".
6. **Clipboard.** PC check: press the RAMBO button, then Ctrl+V into Notepad.
7. **VTES-REMINDERS.html in the live folder.** PC check: click the bell.
8. **The 31 https links and 22 Drive proof files.** PC check: click each once.
9. **vtes:// opens the right window.** PC check: after `VTES-Open.ps1 -Install`, run `VTES-Open.ps1 llm-01 -DryRun`.
10. **The live v3 HTML** (flaw 1). PC check: RAMBO copies the file the Desktop shortcut opens into the repo.

Jorge, shall the engineer fix the 14 new flaws during the port to your live v3, rather than in a separate round? (yes/no)

TRK-2026-9910-B · CHECK-3 · v1 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v4 #independent-check
