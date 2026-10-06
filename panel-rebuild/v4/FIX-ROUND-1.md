# FIX-ROUND-1 - the 21 flaws from CHECK-2, one by one (TRK-2026-9910-B, 2026-10-06)

SONNET 5.5 · PANEL V4 FIX ROUND 1. Branch claude/panel-v4-sonnet-build. Work only in panel-rebuild/v4/. No Drive, no PC, no pull request.

## Section A - Answer first
1. **16 of 21 FIXED, 4 PARTIAL, 1 NOT FIXED.** I do not claim zero flaws.
2. The one NOT FIXED is flaw 1 (the page is built on the old repo copy, not Jorge's live v3). It waits for the live v3 HTML, as ordered.
3. Tests: 3,800 of 3,800 pass across 8 runs (4 data worlds x internet ON and OFF, opened from file://). Counted the checker's way: **108 items, against the checker's 88.** Details in TEST-REPORT.md.
4. I could run PowerShell this round (a Linux build, 7.4.6). INSTALL and ROLLBACK were really executed against a copy of the v3 folder, with the real tamper check. Not run on Windows.

## Section B - The 21 flaws
**1. Page goes backwards from the live v3. NOT FIXED.** Reason: the live v3 HTML has not arrived. This package is still built from the 2026-09-30 repo copy. A later round ports onto the live file. Until then v4 must not replace v3 (it now cannot: see 15).

**2. Header lights green from a website ping. FIXED.** The light is computed only from data files (`effective()` now just calls the data layer). The ping feeds a separate grey mark on each chat card: "Site answers from this browser: yes/no. (A small extra mark, not the status light.)" Evidence: with all data empty and internet ON, 0 lights green; with internet OFF, 0 lights green; the mark flips yes/no; with fresh data the Grok light and Grok card are both red DOWN.

**3. Clickable vtes:// link for an empty address entry. FIXED on the page.** A link needs the scheme registered AND the entry's flag `addresses_filled[id]` true; the poller must read vtes-addresses.json each tick and set that flag (DATA-CONTRACT item 1). A missing flag means no link. Evidence: in FRESH only vtes://llm-01 is clickable; LLM-03 and LLM-09 (entry not filled) show "registered, but the address book entry is empty". Caveat: that poller does not exist yet, so today no vtes link ever shows. The page reads the flag; it cannot open the JSON file itself from file://.

**4. health.ok=false shows OK. FIXED.** Health is OK only when `ok` is exactly true. false shows red "NOT OK - the report says there is a problem"; a missing field shows red NO DATA. Evidence: BADHEALTH world, both internet states.

**5. STALE not red everywhere. FIXED.** Amber is removed from the lights, the legends and the wiring key. Stale lights show red "STALE" text. The age line at the top turns red whenever any file is missing, stale or not OK. Evidence: STALE world, 0 green and 0 amber lights.

**6. Times disagree. FIXED.** Every time on the page is Eastern, short form, with the zone ("Oct 6, 2:05 PM EDT"); the build time is stored as a real instant and shown the same way; "Window resets" uses the same form; raw ISO text no longer appears. One CURRENT footer: the Map's own footer is deleted and the copied status report carries the build time instead of CURRENT. Evidence: assertions for zone, no raw ISO, one CURRENT footer, "Oct 6, 5:00 PM EDT". UNVERIFIED: the PC's browser must support the Eastern time-zone setting; if it does not, times show as UTC and say so.

**7. Hand-typed status on the Map. PARTIAL.** Nothing typed is green any more. The subscription tags (ACTIVE, KEEP, DUPLICATE?...) are grey and read "typed note 2026-09-30: ACTIVE"; the cancel advice carries "Typed note from 2026-09-30, not live. The advice below, including the date, may be out of date."; the Can / Partly / Later words, the wire dots and the WORKS / PARTLY tags are labelled typed notes, with a banner on the Map saying only the round status dots are live; the Miami-Dade PARTIAL / login-blocked words are labelled "typed note from 2026-08-16, not re-checked". Not done: I did not verify or remove the typed content itself; it is labelled, not checked.

**8. Grok contradiction. FIXED.** One sentence (`VTES4C.GROK`) is used by the card, the Map (Grok and Grok Bots nodes), and the Subscriptions tab: "Grok is chat only. No Grok bot has been built ... The registry brief of 2026-10-06 says Grok has been unproven for 31 days (typed note, not checked by this page)." The Grok Bots node now reads NOT BUILT (violet, never green). The sentences "ride on SuperGrok" and "nothing set up yet" are gone (assertion). Left: the hashtags #grok-bots and #Grok-Automations inside copied packets; they are labels, not claims.

**9. LLM-09 Governor missing. FIXED.** Card, header light (chip), packet target (drop-downs), INFO and tag entries added; also CHIEF (card, light, drop-downs). Both are in DATA-CONTRACT's twelve executor keys. The Map already had the Governor node; it now gets its live light. Not added: a CHIEF node on the Map (its reach table would be invented). Their descriptions come from the Map text and from Jorge's pasted text and are marked UNVERIFIED on the cards.

**10. RAMBO paste button hidden on first view. FIXED.** A big blue "Copy hand-off packet for RAMBO" button sits directly under the read-me on every view (Console, Dir, Map). Read-me sentence 4 now points to it. Evidence: first-view assertion in all 8 runs; the press fills a HANDOFF packet and prints the next steps. Clipboard itself UNVERIFIED (needs the PC).

**11. Bell phantom (22 vs 21). FIXED.** The leftover "budget file missing" item is removed. Evidence: the bell equals the number of open reminders (21) in all 8 runs.

**12. Test counts do not match. FIXED (reported honestly).** My count, the checker's way: 108 of 108 vs 88; the 4 skipped card buttons are now clicked (the test clicks every button, in every view). The extra 20 items and why are itemised in TEST-REPORT.md; the difference between 57 and the checker's 50 buttons is explained for 5 of 7 and the other 2 are label changes of the same buttons. I did not have the checker's item list, so this is not a line-by-line match.

**13. Install trips the tamper alarm. FIXED.** INSTALL adds the four v4 code files to MANIFEST.sha256 (backed up once as MANIFEST.sha256.pre-v4) and runs Verify-VtesPanel.ps1. Executed: "OK: 28 code files match" before, "OK: 32 code files match" after install (and after a second install). If MANIFEST.sha256 is missing the script prints FLAG instead of staying silent. Caveat: if someone later runs `Verify-VtesPanel.ps1 -Build`, it rebuilds the list without the v4 lines (no alarm, but v4 is no longer fingerprinted): DESKTOP-WORK.md item 4 says to re-run INSTALL after that.

**14. Rollback not exact after two runs. FIXED.** One merged record file, a single `.pre-v4` backup per replaced file (first run wins), and a single manifest backup. v4 is added as new files, so v3 is never replaced at all. The rollback also checks the v3 SHA256 against the fingerprint taken before the first install. Executed: install twice, rollback once, then the folder's file list and SHA256 sums matched the "before" list exactly. Rollback keeps any data file that now holds a real report.

**15. Overwrites v3 in place; wrong folder. FIXED (folder choice UNVERIFIED).** v4 installs beside v3 as VTES-LLM-LAUNCHER_v4.html; v3 is never written; before and after SHA256 prove it. The script no longer guesses one folder: it looks in five and stops unless exactly one holds a v3 launcher; the desktop executor then picks the folder the real Desktop shortcut opens (DESKTOP-WORK.md item 1). Which folder that is, I do not know.

**16. Contract ignores the existing heartbeat writer. PARTIAL.** The page now also reads vtes-status.js (the file Write-VtesStatus.ps1 writes) and takes the newer report per window; DATA-CONTRACT says there is ONE heartbeat system and tells the desktop to extend Write-VtesStatus.ps1 (add LLM-09, LOCAL, CHIEF). Not done: the extension itself (PC work). UNVERIFIED: I read Write-VtesStatus.ps1 from the repo branch executor-tray-icon-1cazza, not the live copy.

**17. Contract ambiguous in six places. FIXED.** (1) now "two statements"; (2) "up" for chat-only windows defined: red NO DATA until a recorded test reply, accepted for 12 ticks; (3) Miami-Dade id is "01".."22" (a bare number is also read); (4) `money` is now shown in the Health panel; (5) LLM-09 and CHIEF are in the keys; (6) `health.ok` is required and used. Also added: `addresses_filled`, `proof_at`.

**18. Completion measures the wrong thing. PARTIAL.** The number is now labelled "health checks passed (9 of 12)" and says it is the daily check, not completion. A separate line shows "Windows confirmed up now: n of 12" (NO DATA when no window has reported). Not done: a true "how complete is each window" percentage. Jorge's requirement 10 does not define it, and I will not invent one.

**19. Hands a technical task to Jorge. FIXED.** The Cowork card now says "Nothing for you to do. The Desktop Executor (RAMBO) ..." and DESKTOP-WORK.md lists seven items for the desktop executor with a proof line each, plus a WORKAROUND-CERT for the removed step. Not done: the desktop work itself (cloud cannot).

**20. "DOWN - DOWN". FIXED.** One DOWN. Assertion in all 8 runs.

**21. Two files both called v4. PARTIAL.** In this package only the launcher is called v4: the old repo copy is now v3-source/VTES-LLM-LAUNCHER_repo-copy-2026-09-30.html with its footer changed from "v4" to "repo copy". Not fixed: the original in branch executor-tray-icon-1cazza (tools/vtes-panel) still says v4 2026-09-30 (I may not touch it), and the vtes4-*.js helper files keep their prefix. Also a naming question for the port round: Jorge's live page is v3, so the ported build may need a different number.

## Section C - What I did not do, and what is UNVERIFIED
1. Did not port onto the live v3 (no HTML yet).
2. Did not run anything on Windows, Windows PowerShell 5.1, Drive, or the PC.
3. Clipboard, Attach / Choose folder dialogs, outside sites, the 22 Drive proof pages: not checked.
4. The typed content on the Map, subscriptions and Miami-Dade notes: labelled, not verified.
5. Descriptions of LLM-09 and CHIEF: from old Map text and Jorge's pasted text, UNVERIFIED.

## Section D - Counts and one question
FIXED 16 · PARTIAL 4 (7, 16, 18, 21) · NOT FIXED 1 (flaw 1). Click test: 3,800 of 3,800 (8 runs); checker-style 108 of 108 vs the checker's 88.

Jorge, may the desktop executor (RAMBO) install v4 next to your v3 so you can look at it without losing anything? (yes/no)

TRK-2026-9910-B · FIX-ROUND-1 · v1 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v4
