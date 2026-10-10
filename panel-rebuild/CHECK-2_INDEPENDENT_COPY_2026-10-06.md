# CHECK-2 — independent second check of panel v4

OPUS 5.5 · PANEL V4 CHECKER (cloud session). Checked 2026-10-06 against branch `claude/panel-v4-sonnet-build`.

## Section A — Verdict

**FAIL. I found 21 flaws. 9 of them are serious enough that v4 should not be installed as it stands.**

1. **The keeper's flaw is CONFIRMED.** v4 was built from the older 2026-09-30 repo launcher, which has 10 cards. Jorge's live v3 (2026-10-02) has more than that. Installing v4 would remove things Jorge uses now.
2. **The worst new flaw:** four header lights (Chat, Grok, Gemini, Copilot) turn GREEN when a website answers, even when every data file is empty. The engineer's test ran with the internet blocked, so it never saw this.
3. **The RAMBO "one step" fix creates a new dead link.** After that step, RAMBO's address points at an empty entry and opens nothing.

The mechanics do work: every button I clicked responded with no script errors. The flaws are in what the page says, what it leaves out, and how it installs.

## Section B — Flaw list, worst first

1. **The page goes backwards from Jorge's live v3 (keeper's flaw, CONFIRMED).**
   - v4 is built from `v3-source/VTES-LLM-LAUNCHER.html`, the repo copy dated 2026-09-30 (build-v4.js line 4). KNOWN-LIMITS.md item 1 admits it has 10 cards.
   - I searched the v4 page and its scripts for features of the live v3. These had **0 matches**: CU-Orchestrator, CU-TokenMonitor, CU-Inbox-Job-Watcher, CU-Propagation-Check, VTES-LOCAL-POLLER, "Hand work here", "Email attachments", "Mini LLM", "Out-of-turn", "24/7", "Chief", CAPSULES, BRIDGES, PLAUD, CLIENTS, "FACTS LIVE IN".
   - Missing as a result: the 17 header tabs, the LLM-09 card, the 6 executor-role cards (including CHIEF), the 6 bots, the 6 queued items, and the 12-row Repairs log.
   - Limit of this check: the reference is Jorge's pasted text. Neither checker has seen the live v3 HTML.
2. **Header lights go green with no data file (breaks requirements 3 and 7).**
   - v4 kept the v3 website pings. If claude.ai, grok.com, gemini or copilot answers, that light shows green "UP · site reachable now" (VTES-LLM-LAUNCHER_v4.html lines 729–731 and 742–748; pings in runProbes, lines 776–786).
   - My test with all six data files empty and the internet on: lights 04, 07, 08 and 10 were green. Their cards said NO DATA.
   - With fresh test data, the Grok light was **green** while the Grok card said **DOWN**. The same page contradicts itself.
   - The engineer's TEST-REPORT says "no executor chip green". That is only true when the internet is blocked.
3. **The RAMBO and Cowork "one step" fix leads to a dead link (breaks requirement 11).**
   - The cards switch to a clickable vtes:// link when one shared flag, `vtes_scheme_registered`, is true (vtes4-cards.js lines 47–49).
   - But in vtes-addresses.json, LLM-01 and LLM-03 have an empty `url` and an empty `run`. VTES-Open.ps1 answers those with "(no address yet)" (line 87).
   - So after the "one step", the page shows "Open Claude Code Desktop Executor / RAMBO" as a working link that opens nothing.
4. **Health shows green "OK" when its own file says not OK.**
   - `badge()` checks only how old the file is (vtes4-live.js lines 19–21). The top strip labels it "OK" (vtes4-panels.js line 80).
   - Test with a fresh health file containing `"ok": false`: the strip showed "health: OK - as of …".
   - This breaks DATA-CONTRACT.md line 5: "Green appears only when the file is present AND fresh AND says OK."
5. **STALE is not red everywhere.**
   - In the header, a stale window gets the `warn` colour, amber #b26a00 (vtes4-cards.js line 96). Test with day-old data: all 10 lights were amber, not red.
   - The age line turns red only when the heartbeat is completely missing (vtes4-panels.js line 85). With stale data it stayed plain.
6. **Times on the same page disagree (breaks requirement 4).**
   - "Built 2026-10-06 05:41" is UTC time (build-v4.js line 5 uses toISOString), but it shows no time zone. Data times are shown in the PC's local time. On an Eastern-time PC the build time looks 4 hours off.
   - Two footers both say CURRENT, with different dates: "map v1 · 2026-09-30 · CURRENT" (line 726, MAP_DATE) and "v4 · built 2026-10-06 · CURRENT".
   - Token "Window resets" is printed as raw `2026-10-06T17:00:00-04:00`, while every other time is short local form. Text-to-speech reads the raw form badly.
7. **Hand-typed status is still on the page (breaks requirement 3).**
   - The Map → Subscriptions tab shows "ACTIVE" three times, typed text.
   - It also gives typed advice from 2026-09-30: "cancel X Premium Plus … before Oct 11".
   - The Map capability words "Can / Partly / Later" are typed.
   - The Miami-Dade notes "PARTIAL" and "login-blocked" are typed from a 2026-08-16 report (vtes4-panels.js lines 11, 12 and 17).
   - KNOWN-LIMITS item 10 admits the Map was not audited.
8. **The page contradicts itself about Grok bots (breaks requirement 3).**
   - The card says "NO Grok bots exist" (vtes4-cards.js line 32).
   - The Map shows a node "🤖 Grok Bots with SuperGrok".
   - Subscriptions says "Grok Bot and your two Grok Automations ride on SuperGrok", and also "Grok Bots: nothing set up yet".
9. **LLM-09 "Governor" is a missing window (breaks requirement 1).** It is the first node on the Map. It has no card, no header light, and is not in the DATA-CONTRACT executor list. "Find the gap of missing windows" was not done.
10. **On first open, the RAMBO paste button is hidden.**
    - The page opens in Console view. All cards, the token monitor and the Miami-Dade list are hidden in the Dir view. My first-view test: RAMBO paste button visible = false, cards visible = false, token panel visible = false.
    - Read-me sentence 4 says "press the blue button on the RAMBO card" but never says to press Dir first.
    - In fairness: the Console's "Copy + open chat" works for RAMBO once its light is selected.
11. **The reminder bell count includes one phantom.** It shows 22, but vtes-reminders.js has 21 items. v4 stopped loading vtes-budget.js but kept the code that adds one item whenever the budget file is missing (inline script near the end of the HTML).
12. **The test counts do not match (the brief says a mismatch is a flaw).**
    - The engineer counted 80 items, including 46 buttons. I found 88 items, including 50 buttons, plus 2 expanders and 2 drop-downs.
    - The engineer skipped 4 card buttons: "Copy JOB template" and the Grok, Gemini and Copilot paste buttons.
13. **Installing v4 sets off the panel's own tamper alarm.**
    - MANIFEST.sha256 line 2 holds the old launcher's fingerprint. Verify-VtesPanel.ps1 compares against it on a schedule.
    - INSTALL-v4.ps1 swaps the launcher but never updates the manifest. The next check will report the launcher as changed.
14. **ROLLBACK is not exact if INSTALL runs twice.**
    - The second run backs up v4 as `.bak-YYYYMMDD-HHMM` (INSTALL-v4.ps1 lines 45–48).
    - ROLLBACK runs only the newest rollback script (ROLLBACK-v4.ps1 line 10), so it restores v4, not v3.
    - Two runs in the same minute overwrite the rollback script itself (lines 65–68).
15. **INSTALL may land in the wrong folder and overwrites v3 in place.**
    - Its default folder is `%USERPROFILE%\JV-repository\tools\vtes-panel`. That is a git checkout holding the older 2026-09-30 launcher.
    - The Drive "retired" note points to `C:/Users/JV/JV-repository/VTES-CONTROL-PANEL.html` instead (01_INVENTORY.md). Jorge may never see the change, and the install leaves a tracked repo file edited.
    - The v3 file is replaced in place, with only a .bak copy kept. The brief said "keep v3 untouched".
16. **The data contract ignores a writer that already exists.**
    - Write-VtesStatus.ps1, in the same live folder, already writes heartbeats to vtes-status.js.
    - v4 stops reading that file, and DATA-CONTRACT.md line 42 says no writer exists. That makes two parallel heartbeat systems, a recurrence risk under Rule 4.
17. **The data contract is ambiguous in six places:**
    - It says "exactly one statement" (line 9), but the template is two statements.
    - It does not say what "up" means for chat-only windows (04, 05, 07, 08, 10). The poller cannot see them.
    - It does not fix the Miami-Dade source `id` format. The page matches only "01" to "22" (vtes4-panels.js lines 70–72), so any other format shows NOT RE-CHECKED.
    - It defines `money`, but the page never shows it.
    - LLM-09 and CHIEF are missing from the executor keys.
    - It defines `health.ok`, but the page ignores it (flaw 4).
18. **The completion figure measures the wrong thing (requirement 10).** "Completion" is health checks passed ("9 of 12 checks"). It is not how complete the windows are.
19. **The Cowork fix hands a technical task to Jorge.** "Jorge copies the Cowork window address into vtes-addresses.json" (vtes4-cards.js line 19). This breaks charter Rule 1 and Article 4, and comes with no WORKAROUND-CERT.
20. **Minor: doubled word.** When Grok is down, its header tooltip reads "DOWN - DOWN - seen …" (vtes4-cards.js line 97 plus vtes4-live.js line 33).
21. **Minor: two different launchers are both called "v4".** The repo copy's footer already says "v4 2026-09-30". Jorge's live copy says "v3 2026-10-02". This build is a third file, also called v4.

## Section C — Link and click test, N of N

My script was my own, not the engineer's: `check2.js`, headless Chromium at `/opt/pw-browsers/chromium`. I opened the page from `file://`, which is how Jorge opens it. The engineer used a local web server. I walked through Console, Dir and all three Map tabs, then clicked every button, expander and drop-down.

1. **88 of 88 respond.** That is 1 page load, 2 local links (both files exist), 31 https links (address format checked only), 50 buttons, 2 expanders and 2 drop-downs.
   - No script errors.
   - "Attach" and "Choose folder" open system dialogs that a headless browser cannot see. They are counted as responding, but UNVERIFIED.
2. **The engineer counted 80 of 80.** The difference of 8 is flaw 12.
3. **What the page showed under different data conditions:**
   - Every data file empty: all red. With the internet on, 4 lights went green (flaw 2).
   - All data files deleted: all red NO DATA. Correct.
   - Fresh test data: RAMBO green from the heartbeat, Grok card DOWN, "every 5 minutes" read from the file, "75% (9 of 12 checks)" shown.
   - Day-old data: cards red "STALE since …", header lights amber (flaw 5).
4. **No vtes:// link was clickable** in any test. Correct, until the flag flips (flaw 3).
5. **The RAMBO paste button** fills the packet ("HANDOFF LLM-04 … -> LLM-01 (Claude Code Desktop Executor / RAMBO)") and shows plain steps. It opens nothing, which is correct. Whether the text really reaches the clipboard is UNVERIFIED.

## Section D — Install and rollback scripts (brief item 6)

1. **Backup first:** yes. Each live file is copied to `.bak-YYYYMMDD` before it is replaced.
2. **Exact restore:** only after a single install (flaw 14). The `data` and `_Rollback` folders are left behind.
3. **Admin rights, network calls, passwords:** none. The only delete is the rollback removing files that v4 added.
4. **Non-ASCII bytes (RI-032):** none. Both files are pure ASCII, checked with grep and `file`. The v3 file VTES-Open.ps1 starts with an invisible UTF-8 marker (BOM), but v4 does not ship it.
5. **v3 untouched:** no. It is replaced in place, with only a backup kept (flaw 15).
6. **Neither script was run.** There is no PowerShell in the cloud.

## Section E — Requirements 1 to 11

1. Every window clearly named: **FAIL.** The names are good, but LLM-09 and CHIEF are missing and the window gap was not found (flaws 1 and 9).
2. Every executor and its state: **FAIL.** The cards exist, but the v3 executor-role section is gone (flaw 1).
3. Grok told honestly: **FAIL.** The page contradicts itself (flaw 8).
4. Token monitor shows real numbers or red NO DATA: **PASS** in my tests.
5. Housekeeping last-report time: **PASS.** It shows red NONE when there is no data.
6. No dead, mislabeled or stale tiles: **FAIL.** The Map is stamped 2026-09-30 with typed statuses (flaws 6 and 7).
7. Header reads live state: **FAIL** (flaws 2 and 5).
8. Miami-Dade: **PARTIAL / UNVERIFIED.** The 22 links and "unknown of 300" are there. I did not open the proof files, because the brief keeps me off Drive.
9. Panel age in the daily HEALTH report: **UNVERIFIED.** The header line exists, but the PC writer does not.
10. Real completion percentage: **FAIL.** It measures the wrong thing (flaw 18).
11. No dead links, and Jorge can paste to the desktop executor: **FAIL.** Paste works, but the one-step fix creates a dead link (flaw 3) and the button is hidden at first (flaw 10).

**Read-me panel:** 7 short numbered sentences. Fine for text-to-speech, apart from sentence 4 (flaw 10).

## Section F — UNVERIFIED, with the PC check for each

1. **Whether the live v3 has more than v4.** PC check: open the live launcher, then the v4 test copy, side by side. Count the tabs, bots and queued items on each.
2. **Where the live launcher really is.** PC check: run `INSTALL-v4.ps1 -DryRun` and read the path it prints. If it is not the file Jorge opens, stop.
3. **Clipboard.** PC check: press the RAMBO paste button, then Ctrl+V into Notepad.
4. **The 22 Miami-Dade proof links and the third-party sites.** PC check: click each one once.
5. **Install and rollback.** PC check: dry run, then a real install on a copy of the folder, then ROLLBACK. Confirm the v3 footer "2026-10-02" comes back.
6. **The tamper alarm (flaw 13).** PC check: after a test install, run `Verify-VtesPanel.ps1` and read the result.

## Section G — Fix order I recommend

**Rebuild v4 on top of the real live v3 HTML.** RAMBO can copy it to the repo in one step. Then fix flaws 2 to 8.

Patching the 2026-09-30 copy cannot pass, because flaw 1 alone fails it.

Jorge, shall the next build start from your live v3 page instead of the old repo copy? (yes/no)

TRK-2026-9910-B · CHECK-2 · v1 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v4 #independent-check
