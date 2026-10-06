# TEST-REPORT - panel v4, fix round 3 (TRK-2026-9910-B, 2026-10-06)

**Answer first: 3,800 of 3,800 (old walk, 8 runs, 93 items), 70 of 70 (round-2 worlds), 87 of 87 (new round-3 worlds), 58 of 58 PowerShell checks (21 scenario groups) with the v3 folder byte-identical in every one. The same round-3 worlds run against the round-2 package (commit 554aaf5) pass only 41 of 78 and fail on every flaw they were written for, so they do detect the old behaviour. The old PowerShell scripts, run through the checker's scenarios, reproduce F1, F2, F5, F6, F7, F14 and F15. This does not prove zero flaws; see "What this test cannot see".**

## Section A - ONE counting method (flaw 12)
1. **An item is one distinct control the shipped page offers** (empty data, internet on), identified by its kind plus its id, its address or its label, and **counted once** however many views or data worlds show it.
2. **The 12 window chips are buttons. They are counted once, inside "buttons".** The test also clicks them one by one (96 clicks over 8 runs), but that second pass adds nothing to the count. (Round 1 added them twice; that was the error in my 108.)
3. **The "no script errors during the whole walk" check is a check, not a control, so it is not an item.** The page load is.
4. **Result: 93 items** = 1 page load + 31 https links + 2 local links + 55 buttons (12 are chips, 11 are hand-off-packet buttons on the cards, 1 is the big RAMBO button, the rest are the toolbar, dictation, pad and Map controls) + 2 drop-downs + 2 expanders. Every item is listed in Appendix 1 below and in `test-file-click-RESULT-ITEMS.txt`.
5. **Next to the others, honestly:** second checker 92, first checker 88, my own round 1 figure 108 (wrong: chips twice and one non-item). **Mine is 93, one more than 92.** I cannot say which single item the second checker did not count, because I do not have that checker's list. The new controls this build added are known (the Panels button, the big RAMBO button, the Governor and Chief packet buttons, the Governor, Chief and Local chips), so a difference of a few items against the older counts is expected; a difference of exactly one against the newest count is not explained. **Flaw 12 is therefore PARTIAL, not FIXED.**

## Section B - What was run
1. **The old walk (`test-file-click.js`), unchanged assertions, final package:** 4 data worlds x internet ON and OFF = 8 runs, from file://. **3,800 of 3,800 pass.** One counting method: **93 items** (same list as round 2, Appendix 1).
2. **`test-round2.js`: 70 of 70** (round-2 worlds: FUTURE, FUTUREEXEC, STATUSONLY, BOTSPROVEN, BIGTICK, OLDMIAMI, BELL, STAMPS, 2-hour runs). Its BOTSPROVEN world now carries a `proof_at`, because a BOTS report without one is no longer proof (flaw F4).
3. **New `test-round3.js`: 87 of 87.** One world per flaw, taken from the checker's own scenarios in CHECK-4 Section D. **Before / after, same tests, same data** (the "before" run is `PKG=<round-2 package> node test-round3.js`, file `test-round3-BEFORE-RESULT.json`; the 9 checks that need new-only files, the build script and the config, are not run on the old package, so it has 78 checks):
   - F3 build time: before 2 of 6, after 8 of 8. Old page says "Built Oct 6, 5:00 PM EDT" at 3 AM EDT. New: the build instant is stamped by build-v4.js from the real clock (a hand-set V4_BUILT=2099 is ignored, and the script says so); a PC clock an hour before the build gives red BAD CLOCK in the top line and the footer.
   - F4 Grok Bots proof: before 2 of 7, after 7 of 7 (no proof_at, a day-old proof, a future proof, status-writer only: all NOT BUILT; a fresh proof: UP; the contract defines `executors.BOTS.proof_at`).
   - F8 stale limit: before 13 of 17, after 17 of 17 (30-minute tick 20 minutes old green; 100 minutes red; 60-minute tick 170 minutes green, 190 red; 1-minute tick 2 minutes green, 4 red; 5-minute tick as before; chip, card and badge agree each time).
   - F9 reload gap: before 1 of 2 and 1 of 3, after 2 of 2 and 3 of 3. Method: the checker's world F (RAMBO known only from the status writer). 15 reloads with repaints forced WHILE the files are loading (57 to 59 repaints per run, all seeing one complete state); and 10 one-minute ticks on a simulated clock with the sites unreachable (so the probe answers land mid-reload): the old page flips to red NO DATA 20 times in the 10 ticks, the new page 0 times.
   - F10 due today: before 7 of 14, after 14 of 14 (due today red; tomorrow blue; yesterday red; `10/01/2026`, `Oct 6, 2026`, an ISO date with a time read; "next week" and 2026-13-45 flagged by id and counted due; empty date not due; done items ignored; 11:30 PM Eastern still counts as that day; the real reminders file on 2026-10-11 gives a red bell).
   - F11 deleted reminders file: before 2 of 3, after 3 of 3 (count clears, bell grey, tooltip says the file is missing).
   - F12 status-writer entry vs probe address: before 1 of 3, after 3 of 3 (all four site checks answer; none stuck on "checking").
   - F13 interval_sec below 1: before 5 of 8, after 8 of 8 (0.001, 0.5, 0, -1, "x", 0.999 are NOT OK with a red badge; 1 and 1.5 are valid).
   - F16 redraw: before 2 of 8, after 8 of 8 (a 470-character selection in the Health panel, a selection in the top line when only "Re-checked" changes, a card state line, and inside the Map all survive a tick; the Map's "Copied." note survives a tick one minute later; typed text still survives).
   - N5 (downgraded claim): before 5 of 7, after 7 of 7.
   - CONFIG (new design, 7 checks, new package only): the page reads vtes-status.js and vtes-reminders.js from the v3 folder named in vtes4-config.js; a changed file shows after one tick; both files deleted clears the bell and the card; nothing is written into the v3 folder; a config that is not a file: address is ignored (no request to the outside address); the bell and house links point into the v3 folder (found by this round's own test: without that fix both would have been dead links in the new folder).
4. **PowerShell, 58 checks in 21 scenario groups, PowerShell 7.4.6 for Linux** (downloaded from the PowerShell GitHub release into the session scratch folder), against a copy of the v3 panel folder from branch executor-tray-icon-1cazza (tools/vtes-panel, plus a copy named VTES-CONTROL-PANEL.html). Script `test-install-rollback.sh`; output `test-install-rollback-RESULT.txt`; SHA256 lists in `test-install-rollback-HASHES.txt`. **Every scenario takes the SHA256 of every file (and the folder list) of the v3 folder before and after, and requires them identical.** Groups: S1 single install and rollback; S2 second install (refused, new folder byte-identical); S3 half-failed install (test hook) then rollback; S4 Verify run in the v3 folder after the install, then rollback; S5 two rounds; S6a to S6e git refusals (checkout, symlink into a checkout, `.git` file in a parent, typed path in git, and the real-path walk alone with git hidden); S7 no -LiveDir; S8 rollback with no record; S9 a later change to the v3 writer stays; S10 CRLF manifest; S11 manifest with a byte-order mark; S12 empty folders that existed before, and an empty vtes-panel-v4 beside v3; S13 writer hand-edited before install (tamper alarm exactly as loud after); S14 rollback twice; S15 stranger files are never removed; S16 a record naming a path outside the folder, or an absolute path, is refused with nothing removed; S17 a record that belongs to another folder is refused; S18 rollback -DryRun; S19 a folder name with a non-ASCII letter (config stays ASCII); S20 dangling link where the new folder would go, and v3 typed through a link; S21 the Undo_Manifests stub is removed with the rest.
5. **The BEFORE evidence for the PowerShell flaws:** `test-round3-OLD-repro.sh` runs the round-2 INSTALL, ROLLBACK and EDIT (commit 554aaf5) through the checker's scenarios; output `test-round3-OLD-REPRO-RESULT.txt`. It reproduces F1 (writer restored to sha e4e3b2b06dd6 instead of version B d6c95252aa92, the same e4e3b2b0 the checker saw), F2 (Verify says PROBLEM before, "OK: 32 code files match" after EDIT), F5 (10 entries in `git status` of the checkout), F6 (MANIFEST.sha256 differs after rollback for CRLF and for BOM), F7 (vtes-verify.js differs after the documented Verify step, "13 of 14"), F14 (the empty data and _Rollback folders are gone), F15 (INSTALL exit code 0 with one PROBLEM line).

## Section C - Results by world, in one place
1. NONE, FRESH, STALE, BADHEALTH, internet on and off: as in round 2 (3,800 of 3,800). 2. Every round-2 and round-3 world: see Section B. 3. The v3 folder was byte-identical after every PowerShell scenario that installed, refused, failed or rolled back.

## What this test cannot see (UNVERIFIED)
1. **The live v3 page (flaw 1).** Not ported; the file has not arrived.
2. **Windows PowerShell 5.1 and Windows junctions, `subst` drives, network drives.** I ran 7.4.6 on Linux. The code avoids PowerShell-7-only syntax, but that is reading, not testing. PC checks are in KNOWN-LIMITS 3 and 3a.
3. **A real browser over real time.** The reload and probe timing tests use a simulated clock (Playwright); the 62-second real-time check was made by the checker in round 3, not repeated here after this round's change to the reload. PC check: open the page, wait 2 minutes, rename `data\vtes4-heartbeat.js`; within a minute RAMBO must go red NO DATA, and the chip must not flicker at the 2-minute mark.
4. **Real clipboard, system dialogs, the outside sites, the 22 Drive proof pages, tray icons, vtes:// registration** (see KNOWN-LIMITS.md).
5. **What really writes vtes-status.js on the PC.** I read Write-VtesStatus.ps1 from the repo branch; the live copy is UNVERIFIED.
6. **Edge or Chrome on the PC loading a script from the v3 folder through a file: address** (config design). Worked in headless Chromium; UNVERIFIED on the PC.
7. **A selection inside a part that really changed is replaced** (only unchanged parts are left alone).

## Appendix 1 - every item counted (93)
    1. button|#addans
    2. button|#attbtn
    3. button|#botsave
    4. button|#clearpad
    5. button|#cp
    6. button|#cpfind
    7. button|#go
    8. button|#mapcopy
    9. button|#mic
    10. button|#readans
    11. button|#sendbtn
    12. button|#show
    13. button|#spans
    14. button|#speak
    15. button|#speechify
    16. button|#svdl
    17. button|#svpause
    18. button|#svpick
    19. button|#svre
    20. button|#t_con
    21. button|#t_dir
    22. button|#t_dock
    23. button|#t_map
    24. button|#t_mic
    25. button|#t_pan
    26. button|#t_sp
    27. button|#t_speak
    28. button|#v4rambobtn
    29. button|Copy JOB template
    30. button|Flow chart
    31. button|Subscriptions
    32. button|Wiring diagram
    33. button|chip CHIEF
    34. button|chip LLM-01
    35. button|chip LLM-02
    36. button|chip LLM-03
    37. button|chip LLM-04
    38. button|chip LLM-05
    39. button|chip LLM-06
    40. button|chip LLM-07
    41. button|chip LLM-08
    42. button|chip LLM-09
    43. button|chip LLM-10
    44. button|chip LOCAL
    45. button|packet button for CHIEF
    46. button|packet button for LLM-01
    47. button|packet button for LLM-02
    48. button|packet button for LLM-03
    49. button|packet button for LLM-04
    50. button|packet button for LLM-05
    51. button|packet button for LLM-06
    52. button|packet button for LLM-07
    53. button|packet button for LLM-08
    54. button|packet button for LLM-09
    55. button|packet button for LLM-10
    56. dropdown|select #1 (12 options all chosen)
    57. dropdown|select #2 (12 options all chosen)
    58. expander|details #1
    59. expander|details #2
    60. https-link|https://chatgpt.com
    61. https-link|https://claude.ai
    62. https-link|https://claude.ai/code/session_01CAqZRvV1WjuuxZCNwrE9Gf
    63. https-link|https://copilot.microsoft.com
    64. https-link|https://docs.google.com/document/d/1tqRhgNV-x-ZNzP5g_iTnPb3AwdVZgKTV6TLoFZR2N7o/
    65. https-link|https://drive.google.com/drive/folders/1NDadXJz9eKpRbmYrE-CRH2RtKbynQClN
    66. https-link|https://drive.google.com/drive/folders/1hI2TmVn86Cnh7h_6s93TG0KE1QzVCV5F
    67. https-link|https://drive.google.com/file/d/103RjsXYBPMTB7RXrVca93QRPFPMfae9l/view
    68. https-link|https://drive.google.com/file/d/1206ihC17HIk2IFKnYDJrFqySLpKml_gv/view
    69. https-link|https://drive.google.com/file/d/12CCgmd1jcFomJZDLnDL0-3anuHiy0XYK/view
    70. https-link|https://drive.google.com/file/d/1ArxF3o9ZfdHRB9cagpo6aLYsumG_hesk/view
    71. https-link|https://drive.google.com/file/d/1CJWObVncV2WtWtghlVyXQs5mWuSdsW0D/view
    72. https-link|https://drive.google.com/file/d/1IU-wcx_5fVuKEJPAJw0j-2_zbEC5lubz/view
    73. https-link|https://drive.google.com/file/d/1Sett3KYNpxOwcW2ddSDkeOlZe9xUg9Nu/view
    74. https-link|https://drive.google.com/file/d/1U6DHLvirKxeYc8P18-9TV6A4K-O4Qnp4/view
    75. https-link|https://drive.google.com/file/d/1YlTorY-w6Gff0TBiHmMAtkccEaWz1qvj/view
    76. https-link|https://drive.google.com/file/d/1Z5m-8lQdDyroTYNqEl5VzeSOn4pUOn3s/view
    77. https-link|https://drive.google.com/file/d/1aMjJj4B_RTnsuEK7zpUoAz2JRj1rTUWH/view
    78. https-link|https://drive.google.com/file/d/1c1dTYOoPHHXHGBu__dPUNQuwjUPDwU8p/view
    79. https-link|https://drive.google.com/file/d/1dnVieZEEC2H3xNI2lVqAnWfme0mK98kO/view
    80. https-link|https://drive.google.com/file/d/1eZlpGm5o_QhS-ymx_A-Lnrsjk8yrKRMl/view
    81. https-link|https://drive.google.com/file/d/1mSp3dlmvxCkk80fGYOAe3po3-kRwDGmn/view
    82. https-link|https://drive.google.com/file/d/1t48b9mvp53sicxbsYvd3mBjuBo8xfY0_/view
    83. https-link|https://drive.google.com/file/d/1wGKsjrwvo7q34eTKAO7rlYvroASMVElX/view
    84. https-link|https://drive.google.com/file/d/1wRPHDSjnRZtF5_0JkIInLFm4J3rFLA4x/view
    85. https-link|https://drive.google.com/file/d/1xCFNgzvou6vsE82Bm65QaXT3Ns6wIc1n/view
    86. https-link|https://drive.google.com/file/d/1xDlwM42EFkLEyskPEmMh_LRRgp-WFVQ5/view
    87. https-link|https://drive.google.com/file/d/1xqnUBSml1puN0caJAeiWZCcBo85QHS2L/view
    88. https-link|https://drive.google.com/file/d/1xzBT1GCYkFsNpCsC5FFpaCMwBrisGQAZ/view
    89. https-link|https://gemini.google.com
    90. https-link|https://grok.com
    91. local-link|VTES-PANEL.html
    92. local-link|VTES-REMINDERS.html
    93. page|load from file://

TRK-2026-9910-B · TEST-REPORT · v3 · 2026-10-06 · #VTES-control-panel #panel-v4

