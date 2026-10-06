# TEST-REPORT - panel v4, fix round 1 (TRK-2026-9910-B, 2026-10-06)

**Answer first: 3,800 of 3,800 automated checks pass, 0 fail, across 8 runs. Counted the checker's way (one run, each distinct item once) it is 108 items, against the checker's 88. This does not prove zero flaws: see "What this test cannot see".**

## How it was run (the checker's method)
- Script: `test-file-click.js`. Raw summary: `test-file-click-RESULT.json`. Headless Chromium at /opt/pw-browsers/chromium (no install).
- The page is opened from **file://** (a temporary copy of the package folder), exactly as Jorge opens it. No web server.
- Each run walks Console, Dir, every chip, and all three Map tabs (Flow, Wiring, Subscriptions), then clicks every button, opens every expander, and picks every option of every drop-down.
- **Four data worlds x internet ON and OFF = 8 runs.** NONE = shipped empty files. FRESH = all six files fresh. STALE = heartbeat and tokens a day old. BADHEALTH = fresh but health.ok is false.
- Internet ON means every outside address answers 200. OFF means every outside address fails. This is the case the first engineer's test missed (the checker's flaw 2).
- Data fixtures are written into the temporary copy; the clock is fixed at 2026-10-06 2:00 PM Eastern.

## Count, next to the checker's
- Checker: 88 of 88 = 1 page load, 2 local links, 31 https links, 50 buttons, 2 expanders, 2 drop-downs.
- This round, same scenario (NONE, internet ON), each distinct item once: **108 of 108** = 2 page checks (load, and no script errors through the whole walk), 2 local links, 31 https links, **57 buttons**, 2 expanders, 2 drop-downs, 12 window chips clicked one by one.
- Why 57 buttons and not 50: 3 new (the RAMBO button at the top, the Governor card button, the Chief card button) and 2 more window chips (Governor, Chief). The remaining 2 are the same buttons seen with a changed label ("Saving: ON" / "Saving: OFF", "Tap to dictate" / "Tap again to clear"), counted once per label. I did not itemise this against the checker's own list, which I do not have.
- All 8 runs together: 3,800 checks (the same items repeat in every world and view): 2,168 button clicks, 1,240 https links, 148 flaw assertions, 96 chip clicks, 80 local links, 20 vtes links, 16 page loads, 16 expanders, 16 drop-downs.
- The 148 assertions are 25 different statements about the flaws (listed in the RESULT file), each checked in the worlds where it applies.

## Results by world (what the page showed)
1. NONE, internet ON: all 12 lights red NO DATA. **0 green lights** even though the four chat sites answer (flaw 2). The small grey mark on each chat card says "Site answers from this browser: yes".
2. NONE, internet OFF: all red. The same mark says "no". No light changes between ON and OFF, which is the point.
3. FRESH: lights green exactly for LLM-01, LLM-02, LLM-09, CHIEF (fresh "up" reports) and LLM-04 (it has a recorded test reply). Grok light and Grok card both red DOWN. Only vtes://llm-01 is clickable (its address book flag is true); Cowork and Governor stay "not available yet".
4. STALE: no light green and none amber. All red.
5. BADHEALTH: health strip shows red "NOT OK", not "OK".
6. Every run: RAMBO paste button visible on first view and produces a HANDOFF packet; bell count equals the real reminders (21); exactly one CURRENT footer; times in Eastern with the zone; no doubled "DOWN - DOWN".

## Install and rollback (flaws 13, 14, 15) - actually executed this round
PowerShell 7.4.6 (Linux build) was downloaded into the cloud container and the real scripts were run against a copy of the v3 panel folder taken from branch executor-tray-icon-1cazza, including the real `Verify-VtesPanel.ps1` and its 28-file MANIFEST.sha256, plus a v3 launcher copy named VTES-LLM-LAUNCHER_v3.html.
1. Before: `Verify-VtesPanel.ps1` printed "OK: 28 code files match".
2. INSTALL run 1: "v3 untouched (SHA256 identical before and after)"; Verify printed "OK: 32 code files match" (the four v4 files are added to the manifest, so no tamper alarm).
3. INSTALL run 2 (the repeat case): same two lines.
4. A fake writer put a real report into data\vtes4-tokens.js. ROLLBACK removed every file v4 added, **kept** that file (it holds a real report), restored MANIFEST.sha256, and printed "v3 check OK (same SHA256 as before v4)" for both v3 files.
5. After removing the kept file by hand, the folder's file list and SHA256 sums were **identical to the "before" list** (diff empty).
- Caveat: this was a Linux build of PowerShell. On Linux a backslash in `data\file.js` is part of the file name; on Windows it is a folder separator. I expect the same result on Windows but it is UNVERIFIED there. The desktop executor runs `INSTALL-v4.ps1 -DryRun` first (DESKTOP-WORK.md).

## What this test cannot see (UNVERIFIED)
- The live v3 page (flaw 1): the cloud has never seen its HTML. This package is still built on the 2026-09-30 repo copy. Not fixed this round.
- Real clipboard, the system dialogs behind "Attach" and "Choose folder", the 22 Drive proof pages, the five outside chat sites, tray icons, vtes:// registration (see KNOWN-LIMITS.md).
- Windows PowerShell 5.1 (the PC's built-in one). I ran PowerShell 7.4.6. The scripts use only plain commands, but that is not proof.
- Whether the page looks right on the PC's browser and screen. I looked at one screenshot of the first view (file://, empty data) and it showed the lights red, the read-me, and the RAMBO button.

TRK-2026-9910-B · TEST-REPORT · v2 · 2026-10-06 · #VTES-control-panel #panel-v4
