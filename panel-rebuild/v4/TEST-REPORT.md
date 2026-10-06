# TEST-REPORT - panel v4, fix round 2 (TRK-2026-9910-B, 2026-10-06)

**Answer first: every automated check passes: 3,800 of 3,800 (old walk, 8 runs), 70 of 70 (new round-2 worlds, run 3 times), 9 of 9 PowerShell scenarios. This does not prove zero flaws; see "What this test cannot see".**

## Section A - ONE counting method (flaw 12)
1. **An item is one distinct control the shipped page offers** (empty data, internet on), identified by its kind plus its id, its address or its label, and **counted once** however many views or data worlds show it.
2. **The 12 window chips are buttons. They are counted once, inside "buttons".** The test also clicks them one by one (96 clicks over 8 runs), but that second pass adds nothing to the count. (Round 1 added them twice; that was the error in my 108.)
3. **The "no script errors during the whole walk" check is a check, not a control, so it is not an item.** The page load is.
4. **Result: 93 items** = 1 page load + 31 https links + 2 local links + 55 buttons (12 are chips, 11 are hand-off-packet buttons on the cards, 1 is the big RAMBO button, the rest are the toolbar, dictation, pad and Map controls) + 2 drop-downs + 2 expanders. Every item is listed in Appendix 1 below and in `test-file-click-RESULT-ITEMS.txt`.
5. **Next to the others, honestly:** second checker 92, first checker 88, my own round 1 figure 108 (wrong: chips twice and one non-item). **Mine is 93, one more than 92.** I cannot say which single item the second checker did not count, because I do not have that checker's list. The new controls this build added are known (the Panels button, the big RAMBO button, the Governor and Chief packet buttons, the Governor, Chief and Local chips), so a difference of a few items against the older counts is expected; a difference of exactly one against the newest count is not explained. **Flaw 12 is therefore PARTIAL, not FIXED.**

## Section B - What was run
1. **The old walk (`test-file-click.js`), unchanged assertions, final package:** 4 data worlds x internet ON and OFF = 8 runs, from file://. **3,800 of 3,800 pass, 0 fail.** (Counts per kind are in `test-file-click-RESULT.json`.)
2. **New: `test-round2.js` (70 assertions), run 3 times in a row, 70 of 70 each time.** It builds its own worlds:
   - **FUTURE**: every file dated one year ahead. 0 green chips, 0 green cards, 0 green badges, no vtes:// link, "BAD CLOCK" on the age line, card and chip, the year 2027 shown, the future token numbers hidden.
   - **FUTUREEXEC / FUTUREPROOF**: the file time is fine but a window's own last_seen or test-reply time is in the future: not green, BAD CLOCK; a control checks other windows stay green.
   - **STATUSONLY**: no data file at all, only vtes-status.js says up (for RAMBO, Governor, BOTS, Cloud, Chat). 0 green anywhere; RAMBO and the Governor show grey "WRITER SAYS UP, NOT PROVEN"; Chat ignores the writer; "Windows confirmed up now: 0 of 12"; the age line says no valid data file and that the status writer cannot prove anything; **the Map's Grok Bots box says NOT BUILT and never UP**, in the Flow tab and the Wiring tab.
   - **BOTSPROVEN**: a poller report for BOTS with proof makes the box say UP and drop NOT BUILT. Never both.
   - **BIGTICK**: interval_sec 864000 with 2-day-old sightings: 0 green, heartbeat badge red NOT OK about interval_sec. Also 3601, 0, -5 and the text "300": 0 green. 3600 (the maximum) is accepted.
   - **OLDMIAMI**: a 30-day-old Miami-Dade file: 0 green "proof checked", all 22 marks neutral grey, badge STALE. A fresh file still shows its 2 green marks (control).
   - **BELL**: overdue item: red; open but none due: blue; none open: grey and no count; the tooltip says the file has no time stamp.
   - **STAMPS**: the hand-off packet stamp reads "Oct 6, 2:00 PM EDT" (no "10/6/2026, 6:00:08 PM"); a new conversation-pad entry reads the same; an old saved entry is shown in Eastern form too, with a year when it is not the current year.
   - **TWOHOURS-NOWRITER**: the page is opened with fresh files and left open for 2 hours on a simulated clock (the data files are never rewritten). At load lights, cards and strip agree and are green (control). After 2 hours: 0 green chips, 0 green cards, the heartbeat and token strip badges red, the age line red and re-checked at the new time, cards say STALE like the chips, the vtes:// link gone. The daily files (state, health, housekeeping, Miami-Dade) are still inside their own limits and stay green: that is correct, not a miss.
   - **TWOHOURS-WRITER**: files rewritten every 10 minutes for 2 hours (atomic write). Lights stay green and cards agree; the newest burn rate (53000) appears, which proves the reload is cache-busted; a deleted file shows NO DATA on the next tick; when the writer stops for 20 minutes, lights and cards both go red within one tick.
   - Sensitivity check: the same 70 assertions run against the round-1 package fail 34 times before the run stops on a script error, so these tests do detect the old behaviour.
3. **PowerShell, 9 scenarios, PowerShell 7.4.6 for Linux** (downloaded from the PowerShell GitHub release into the session scratch folder), against a copy of the v3 panel folder from branch executor-tray-icon-1cazza (tools/vtes-panel, plus a copy named VTES-CONTROL-PANEL.html). Script: `test-install-rollback.sh`. Output: `test-install-rollback-RESULT.txt`. **SHA256 of every file, before and after, for every scenario: `test-install-rollback-HASHES.txt`.** **9 passed, 0 failed.**
   - **A** (the checker's run A: Verify, install, install, rollback): 39 files before, 39 after, **identical**, including vtes-verify.js. The old failure (vtes-verify.js still saying "checked":32) is gone.
   - **A0** (vtes-verify.js did not exist before): 38 before, 38 after, identical (the file is removed again).
   - **B** (the checker's run B: MANIFEST.sha256 unreadable, run as the non-root user nobody, so it really cannot be read): INSTALL now checks every file it will touch BEFORE writing anything, stops with "cannot be read ... Nothing was changed", and ROLLBACK then says "no install record ... THIS ROLLBACK CHANGED NOTHING", which is true. 37 files before, 37 after, identical.
   - **C1** (the checker's run C, exactly: install; hand-edit Write-VtesStatus.ps1; `Verify-VtesPanel.ps1 -Build` in the live folder; install again; rollback): **Verify now prints "OK: 28 code files match"** (the old run printed "PROBLEM: changed = Write-VtesStatus.ps1"). The rollback does not overwrite the later legitimate rebuild; it takes out only the four v4 lines and prints a NOTE. The folder is therefore NOT byte-identical to before (the hand edit and the rebuilt manifest are real later changes, kept on purpose; the diff lists exactly those two plus the vtes-verify.js my own check run created). The rollback says "WITH NOTES: 12 of 13", never "exactly as it was".
   - **C2** (the same job done the safe way: install; `EDIT-VtesStatus-v4.ps1`; Verify; the writer's own self-test; install again; rollback): Verify "OK: 32 code files match" after the edit, `Write-VtesStatus.ps1 -SelfTest` "8 passed, 0 failed", and after the rollback 39 files **identical**, the writer and the manifest back.
   - **D** (new: a part-way failure, the folder name `data` is a plain file so the copy fails after four files were already copied): INSTALL says FAILED and prints the rollback command; the record already existed; ROLLBACK puts back all 39 files **identical**, no `.pre-v4` left over.
   - **E** (no -LiveDir): refused, nothing changed. **F** (a git checkout): refused, nothing changed. **G** (only the name VTES-CONTROL-PANEL.html, no manifest): recognised, installed, rolled back, 36 files identical.

## Section C - Results by world, in one place
1. NONE: all 12 lights red NO DATA, 0 green, internet on or off (flaw 2 still holds). 2. FRESH: green exactly for RAMBO, Cloud, Governor, Chief (fresh up reports) and Chat (recorded test reply); Grok red DOWN on light and card; only vtes://llm-01 clickable. 3. STALE and BADHEALTH as in round 1. 4. Every new world in Section B.

## What this test cannot see (UNVERIFIED)
1. **The live v3 page (flaw 1).** Not ported; the file has not arrived.
2. **Windows PowerShell 5.1.** I ran 7.4.6 on Linux. On Linux the scripts accept both `\` and `/` as folder separators; on Windows `\`. The same code path, but UNVERIFIED on Windows. PC check: the checker's three-step test on a copy of the folder (INSTALL twice, ROLLBACK, `Get-FileHash` before and after).
3. **A real two hours.** The 2-hour tests use a simulated clock. PC check: leave the page open for one hour with the writers running and compare the RAMBO chip with the RAMBO card.
4. **Real clipboard, system dialogs, the outside sites, the 22 Drive proof pages, tray icons, vtes:// registration** (see KNOWN-LIMITS.md).
5. **What really writes vtes-status.js on the PC.** I read Write-VtesStatus.ps1 from the repo branch; the live copy is UNVERIFIED.
6. **The reminders file has no time stamp**, so the bell's count can be old; the bell says so (dashed border).

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
