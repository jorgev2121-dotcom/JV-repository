# FIX-ROUND-3 - the 16 new flaws (F1 to F16) and the 6 downgraded claims from CHECK-4 (TRK-2026-9910-B, 2026-10-06)

SONNET 5.5 · PANEL V4 FIX ROUND 3. Branch claude/panel-v4-sonnet-build. Work only in panel-rebuild/v4/. No Drive, no PC, no pull request. Not ported onto the live v3: that file has not arrived.
Window: CODE, CLOUD / WEB EXECUTOR. Model: Sonnet 5.5 (not Opus; the order assigned this work to me).

## Section A - Answer first
1. **Of the 16 new flaws: 15 FIXED, 1 PARTIAL (F5, Windows junctions not testable here), 0 NOT FIXED.** Of the 6 downgraded claims: 5 FIXED, 1 PARTIAL (N11, same reason). I do not claim zero flaws: see Section D.
2. **I applied Tier 2, removal, as ordered.** Seven of the sixteen (F1, F2, F5, F6, F7, F14, F15) all lived in code that edited, backed up or restored files inside Jorge's live v3 folder. That code is gone. INSTALL now copies v4 into a NEW folder beside v3, and never writes inside v3. The EDIT script and all manifest code are deleted. Code that touches an existing file: none.
3. **Proof for that:** 58 PowerShell checks in 21 scenario groups, run under PowerShell 7.4.6 for Linux. In every one, the SHA256 of every file in the v3 folder is identical before and after.
4. **The same checker scenarios, run against the old round-2 scripts, reproduce the flaws** (test-round3-OLD-REPRO-RESULT.txt): F1 with the same sha the checker saw, F2, F5, F6, F7, F14, F15.
5. **The nine page flaws (F3, F4, F8 to F13, F16) each have their own test world, run before and after on the same data:** old package 41 of 78 pass, new package 87 of 87. Nothing else broke: 3,800 of 3,800 on the old walk (93 items) and 70 of 70 on the round-2 worlds.
6. **Three things my own tests caught this round, so you can see the method working:** a build-script ordering bug (patches written after the file was saved), a swap bug in the new reload (a status object replaced by the file), and two dead local links in the new folder (the bell and the house pointed at files that stay in v3). All three are fixed and have a test.

## Section B - The 16 flaws, one by one
Evidence file names are in panel-rebuild/v4/. "Before" = the round-2 package at commit 554aaf5.

**F1. A second rollback restored an OLD backup over a newer file. FIXED (removed).** There are no backups and no restores any more, so nothing can be restored over anything. Before: the checker's S9 run puts the writer back to sha e4e3b2b06dd6, not the newer version (d6c95252aa92) and Verify says PROBLEM (test-round3-OLD-REPRO-RESULT.txt, "FLAW F1 REPRODUCED"). After: scenario S9, v3 identical and the writer still has the version-B sha.

**F2. EDIT approved a hand-edit the tamper check was already flagging. FIXED (removed).** EDIT-VtesStatus-v4.ps1 is deleted; INSTALL never touches MANIFEST.sha256 or Write-VtesStatus.ps1. Before: after EDIT, Verify said "OK: 32 code files match". After: S13, the writer is hand-edited before install, Verify says "PROBLEM: changed = Write-VtesStatus.ps1" before AND exactly the same after; v3 identical. The optional writer edit is now a hand-made desktop order with its own backup (DESKTOP-WORK item 4b); it makes Verify say PROBLEM on purpose, and the item says so.

**F3. Build time hand-set 14 hours in the future. FIXED.** build-v4.js stamps the real instant of the build and ignores V4_BUILT (it prints a note). The page holds the build time to the BAD CLOCK rule: more than 2 minutes ahead of the PC clock gives red "Built BAD CLOCK" in the top line, the footer and the status report. Before: 2 of 6; after: 8 of 8 (test-round3, world F3). The page in this commit was built at 2026-10-06T08:28:14Z, which is 4:28 AM EDT, the real time.

**F4. Grok Bots "UP (proof)" with no proof. FIXED.** The BOTS proof field is now defined in DATA-CONTRACT rule 5: `executors.BOTS.proof_at`, the moment a Grok bot finished a real task. Without it (or older than 12 ticks, or in the future, or only from the status writer) the Map says NOT BUILT and the Grok card does not say "reporting UP with proof". Before 2 of 7; after 7 of 7.

**F5. The git-checkout refusal was bypassed through a link. PARTIAL.** INSTALL now resolves the real path (every link and junction on the way), checks the typed path, the real v3 path and the real parent where the new folder would go, by looking for `.git` (folder or file) AND by asking git itself when git is installed. Evidence: S6b (symlink into a checkout, refused, `git status` of the checkout clean), S6d (typed path in git, real path outside, refused), S6e (git hidden from PATH: the real-path walk alone refuses). Before: 10 entries in `git status` after the install. **Not tested: a Windows junction, a `subst` drive, a mapped drive** (KNOWN-LIMITS 3a has the exact PC check, `mklink /J` plus `-DryRun`). That is why PARTIAL.

**F6. A manifest with Windows line ends or a byte-order mark was not restored. FIXED (removed).** v4 never reads or writes the manifest. Before: S10 and S11, the manifest SHA256 differs after the rollback and the NOTE blames a "legitimate later change". After: S10 (CRLF) and S11 (BOM), v3 byte-identical.

**F7. The documented proof step (run Verify) made the rollback inexact. FIXED (removed).** v4 never writes vtes-verify.js and the rollback never restores it. Before: S4, "13 of 14", vtes-verify.js differs, a .pre-v4 file left behind. After: S4 and S5, after install, Verify in the v3 folder, rollback, the v3 folder equals the state just after Verify; two rounds leave v3 identical.

**F8. A tick above 15 minutes could never be green. FIXED.** The stale limit is 3 x interval_sec, never under 3 minutes (the page re-reads once a minute) and never over 3 hours. DATA-CONTRACT rule 3 and the heartbeat limit now say the same sentence (the old "LIMIT 15 minutes" line is gone). Before 13 of 17; after 17 of 17: a 30-minute tick 20 minutes old is green; 100 minutes old is red; a 60-minute tick is green at 170 minutes and red at 190; a 5-minute tick behaves as before.

**F9. Wrong state during the reload gap. FIXED.** The reload loads everything into NEW objects and swaps them in only when every file has answered; a probe answer that lands mid-reload sees the old, complete state. Reload and probes share one 60-second timer (probes every second tick, after the reload has finished). Before 1 of 2 and 1 of 3: the old page flips to NO DATA 20 times in 10 ticks. After 2 of 2 and 3 of 3: 57 to 59 forced repaints during loading per run and 0 flips. **Simulated clock only; a real browser over real time is UNVERIFIED** (KNOWN-LIMITS 17).

**F10. The bell missed "due today". FIXED.** A due DAY (Eastern) counts as due all day. Date forms read: YYYY-MM-DD (what the file really uses; a time after it is ignored), M/D/YYYY, "Oct 11, 2026". An unreadable or impossible date is flagged by item id in the tooltip and **counted as due** (my design choice, see the question below). Before 7 of 14 (the real reminders on 2026-10-11 gave a blue bell "0 due"); after 14 of 14 (red).

**F11. A deleted reminders file kept its old count. FIXED.** One reload later the count is gone, the bell is grey and the tooltip says the file is missing. Before 2 of 3; after 3 of 3.

**F12. A status-writer entry for LLM-04 or LLM-07 stopped the site check. FIXED.** The page no longer merges the status file into the probe table. With the writer stamping both, all four site checks answer. Before 1 of 3 (two stuck on "checking"); after 3 of 3.

**F13. interval_sec 0.001 accepted. FIXED.** Below 1 is invalid: heartbeat NOT OK, badge red, every window red (one page, one answer). Tested 0.001, 0.5, 0.999, 0, -1, "x"; 1 and 1.5 are valid. Before 5 of 8; after 8 of 8.

**F14. Rollback removed folders that existed before. FIXED (removed).** Nothing is created inside v3 now, so nothing can be removed there. A folder `vtes-panel-v4` that already exists, even empty, makes INSTALL stop; ROLLBACK refuses a folder with no record. Before: S12, `_Rollback` and `data` gone. After: S12 a, b, c.

**F15. INSTALL said DONE with exit 0 even when its own Verify printed PROBLEM. FIXED (removed).** INSTALL does not run Verify any more. Its exit code comes from checks it owns: 10 of 10 copied files match their source by SHA256, every v3 file has the same SHA256 before and after (a changed v3 launcher is exit 4 ALARM; another changed file such as vtes-status.js, which a live writer can rewrite, is printed as a NOTE), and a part-way failure is exit 5. Before: S13 exit 0 with one PROBLEM line.

**F16. The 60-second redraw wiped a selection and the Map's note. FIXED.** Each panel, the strip, each card line, the chips and the Map are redrawn only when their content changed; the "Re-checked" time and the Map legend time are their own small nodes; the Map note is kept across a redraw. Before 2 of 8; after 8 of 8 (a 470-character selection in the Health panel, in the top line, in a card, inside the Map, and the "Copied." note all survive; typed text still survives). A part that really changed is still replaced (KNOWN-LIMITS 21).

## Section C - The 6 downgraded claims
**N4 status-only contradictions. FIXED.** The status-only case was already right; the remaining hole was F4 (BOTS without proof). Re-tested: test-round2 STATUSONLY and BOTSPROVEN (now with proof_at), plus the F4 world.

**N5 interval_sec. FIXED.** 864000, 3601, 0, -5, "300" and 0.001 give 0 green; 1800 can be green (F8). test-round2 BIGTICK and test-round3 N5: 7 of 7.

**N8 vtes-verify.js not restored. FIXED (removed).** v4 never writes vtes-verify.js. S4 and S5.

**N10 tamper alarm after DESKTOP-WORK item 4. FIXED (removed).** Install and rollback never touch the manifest, the writer or Verify's output; S4, S13. The only thing that can set off the alarm now is the optional hand edit in item 4b, which says so.

**N11 INSTALL picks a folder. PARTIAL.** `-LiveDir` required (S7, S7b), the new folder must not exist (S2, S12b, S20a), git refused through real path, typed path, `.git` file, and git itself (S6a to S6e). PARTIAL for the same reason as F5: Windows junction and `subst` are untested.

**N12 bell always red. FIXED.** Red / blue / grey by the rules in DATA-CONTRACT rule 8: test-round2 BELL plus F10 (14 checks) and F11 (3 checks).

## Section D - Not done, UNVERIFIED, and things I chose
1. **Flaw 1 (not ported onto Jorge's live v3): NOT FIXED.** The file has not arrived. Nothing in this round was ported.
2. **Not run:** Windows PowerShell 5.1, Windows junctions, a real browser over real time, Edge on the PC loading a script from the v3 folder through a file: address (worked in headless Chromium), the real clipboard, the outside sites, the PC. Exact PC checks are in KNOWN-LIMITS.md.
3. **A test-only hook is in INSTALL-v4.ps1** (`VTES4_TEST_FAIL_BEFORE`, does nothing when unset). It is how the half-failed install is proven (S3). Disclosed in KNOWN-LIMITS 3b.
4. **Changed behaviour the desktop executor must know:** the data writers now write into `<parent>\vtes-panel-v4\data\`, not into the v3 folder (DESKTOP-WORK items 2, 4, 6). The page reads vtes-status.js and vtes-reminders.js from the v3 folder through vtes4-config.js. INSTALL no longer copies a vtes-status.js placeholder, and no longer touches the Verify result.
5. **How much smaller:** the old three scripts were 333 lines (INSTALL 168, ROLLBACK 109, EDIT 56); the new two are 270 (INSTALL 177, ROLLBACK 93). Not dramatically smaller, because real-path and git checks were added; what is gone is the class of code that touches an existing file.
6. **Charter end-of-session items NOT done, because the order limits me to panel-rebuild/v4/:** I did not update OPEN-ITEMS.md or RECURRING-ISSUES.md, and I did not read OPEN-ITEMS.md at the start. For the cloud keeper to add to RECURRING-ISSUES.md, as one dated line: "2026-10-06: panel v4 install/rollback/edit code produced new edge cases in three checks in a row (21, then 14, then 16 flaws; 7 of the last 16 in that code). Tier 2 applied: INSTALL now writes only a new folder beside v3 and never touches v3."
7. **My choice, for Jorge to confirm:** a reminder whose due date nobody can read counts as due (red bell) so a typo cannot hide an item.

## Section E - Counts and one question
**New flaws F1 to F16: FIXED 15, PARTIAL 1 (F5), NOT FIXED 0. Downgraded claims: FIXED 5, PARTIAL 1 (N11). Flaw 1 (port to live v3): NOT FIXED, waiting for the file.** Tests: 3,800 of 3,800; 70 of 70; 87 of 87 (old package 41 of 78); 58 of 58 PowerShell checks with the v3 folder identical in all; 93 items by one method.

Jorge, should a reminder whose date cannot be read turn the bell red, so nothing hides? (yes/no)

TRK-2026-9910-B · FIX-ROUND-3 · v1 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v4
