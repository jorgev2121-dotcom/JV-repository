# CHECK-12 - eighth independent check of panel v5 (after fix round 10) - FINAL

☁️ CODE · CLOUD / WEB EXECUTOR · independent checker 8 · 2026-10-07. Configured model: claude-opus-5-5 (the serving model may differ).

Checked: commit 14dcb093502eeb11f43f039878e904ed85c1ab25 of `claude/panel-v5-port` (checked with git rev-parse), on my branch `claude/panel-v5-check8`. I did not build v5. FIX-ROUND-10.md does not exist, so I judged from commits d9e722b and 14dcb09 and the r10 result files. I did not run or reuse the builder's tests. Every number below comes from scripts that I or my five helpers wrote, kept in my scratchpad and not committed. "Helper run" marks a helper's number. "Re-checked" means I ran it again myself.

## Section A - Verdict

**PASS WITH DOCUMENTED LIMITS. 0 flaws that mislead, 0 that damage, 0 that leak. 23 edge items, 9 of them new in round 10.**

1. **Both CHECK-11 flaws are FIXED, measured.**
   - F1: VERIFY now points to a step that exists and says what VERIFY implies.
   - F2: no packet to LOCAL gives any route back to a Claude window or the Outbox. That held in 7,488 of 7,488 packets in 8 data states (helper run) and 1,170 of 1,170 in mine.
2. **Nothing regressed in the classes that matter.**
   - No false green from any data file a correct writer can produce: 2,004 worlds, 8,016 measurements.
   - Unticked personal data reached a non-LOCAL route 0 times, in 44,250 captured outputs.
   - VERIFY left the fixture unchanged in 154 of 154 runs, with 0 wrong verdicts.
3. **Why this is not a clean PASS.** Round 10 added 9 small new edge items:
   - two step lines over the 25-word rule;
   - a LOCAL return line that names no real folder;
   - a self-contradicting limit item;
   - some document bookkeeping.
   None of them can make Jorge or RAMBO do something wrong. They are listed in Section C.
4. The real v3 launcher hashes to 28d3ed5e6b8e5713c079afd349b10a3c4b38993768ca850c91c6f6c333411fe3, as required.

## Section B - CHECK-11's 2 flaws

**F1 - VERIFY's pointer to a deleted step: FIXED.**
1. VERIFY can print from 55 places in its source (helper run). Exactly one printed string cites a document: "(INSTALL-BY-HAND.md, step 27)". No "Section A" and no old step number remain (re-checked with grep).
2. The CRLF line now says "Get the exact bytes again, into a NEW folder, never over this one". Step 27 says "get the exact bytes again, into a new folder name given by Jorge's order". They agree.
3. That line always prints under "PROBLEMS" (8 of 8 CRLF runs, helper run). So step 26 fires first: paste, report BLOCKED, and do not write over the folder or delete anything. Neither path can damage a file.
4. Citation resolver (helper run): 44 of 44 citations resolve to text that says what is claimed. That covers page, VERIFY and documents. It includes the LOCAL card's corrected "KNOWN-LIMITS item 44 (VTES-Inbox-LOCAL)", which I re-checked.

**F2 - the LOCAL packet's return path: FIXED.**
1. My scan covered 13 From, 13 To, 9 task kinds, 5 notes and the tick on or off. In 1,170 of 1,170 LOCAL packets:
   - there is no From in the header;
   - there is no FACTS LIVE IN line;
   - there is no "paste it back", no Outbox, no RAMBO, no Cowork and no Chat.
2. The only line with the word "Claude" is a ban: "RETURN PATH: write your answer in the local-only folder named in the card. Do not send it to any Claude window." Taken literally, the brief's "never mentions Claude" is not met, but the line forbids the route (edge 8).
3. A helper's scan agreed: 7,488 of 7,488 packets in 8 data states, with folder confirmed, unconfirmed, stale, refused and missing.
4. Every other route is unchanged from v3. In my run, 4,752 of 4,752 packets were identical to v3 apart from the time stamp; that is every combination where the note holds no personal data. In the rest, the only difference is that the checker left out a personal-data note, by design.
5. Every place on the page that says where a LOCAL packet or answer goes was read in 3 states (helper run). Each mention of Claude, RAMBO, Cowork or Drive is a ban or a "For RAMBO" warning.

## Section C - Edge items (no one can act wrongly; not failures)

New in round 10:
1. **Two new LOCAL card step lines break KNOWN-LIMITS item 62** ("A step line on the page is at most 25 words"). They are 29 and 33 words (re-checked): "Do NOT send the local answer ..." and "No folder is named on this card yet ...".
2. **The new LOCAL return line names no real folder.**
   - The packet says "the local-only folder named in the card", but it never carries the folder's name, and the local model cannot see the card.
   - The card says the packet tells the model to write in "the local-only folder named on this card".
   - Worst case: Jorge looks for an answer there and does not find it. Nothing leaks.
3. **KNOWN-LIMITS item 55 contradicts itself.** The old sentence says a mixed-ending file is EDITED. The new sentence, which is true in 3 of 3 runs (helper run), says it is LINE ENDINGS CHANGED (CRLF) when it normalises. Both answers are BLOCKED.
4. **PORT-REPORT Section F1 pairs the v3 LOCAL packet lines with v5's GROK lines.** The new v5 LOCAL header and return line appear nowhere in F1. F3 item 29 says the line "names the local-only folder"; it does not.
5. **PORT-REPORT F1's count depends on the clock.**
   - Rebuilt in my scratchpad, the page is byte-identical apart from the build time.
   - The generated list came out at 52 lines. The committed one says 53: v3's own time stamp makes one more HANDOFF line.
6. **Round-10 bookkeeping.**
   - test-v3-packets.js cites "FIX-ROUND-10.md, older tests that changed", which does not exist.
   - No round-10 list of changed older tests exists.
   - TEST-REPORT.md and run-all do not list the r10 tests.
   - The one older test that changed, the v3 packet test, now expects the three LOCAL edits and still compares every other To word for word. I judge that not weakened.
7. **VERIFY's CRLF line leaves out "name given by Jorge's order".** Steps 1 and 28 still forbid choosing a path.
8. **The LOCAL packet contains the word "Claude"**, but only inside the ban.
9. **The LOCAL copy buttons still copy and say "Copied."** while the card says STOP HERE. The packet goes to this PC's clipboard only. Re-classed from earlier rounds; new wording, same behaviour.

Older, still present:
10. **INSTALL step 29 ("save that file again") contradicts steps 26 and 30.** Step 26 fires first and stops (CHECK-11 edge 30). The file in question is a fresh package copy, not a client file.
11. **VERIFY's dangling "(see the same sentence below)"** when only the manifest has CRLF (CHECK-11 edge 19).
12. **VERIFY's relative-path error gives an example path**, "C:\Users\JV\OneDrive\Documents\VTES-PANEL-v5". That does not match step 1's `G:\My Drive\MY-DESK\VTES-PANEL\`. VERIFY only reads, and step 1 forbids choosing a path.
13. **Checker misses with the tick wrongly ticked, not listed one by one** (helper run, 11 re-checked by me). Examples:
    - other separators: "123+45+6789", "card 4111+1111+1111+1111", "Visa 4111=1111=1111=1111 exp 12/29", and the same with & > or an emoji;
    - Cyrillic look-alikes: "SSN 123-45-678О";
    - other date forms: "DOB 12/Apr/1975", "DOB 12.IV.1975", "DOB 4 12 75".

    KNOWN-LIMITS item 37's "Nine digits in a row written any way" overstates. Item 36 and the page say the checker can miss layouts, and the tick box is the protection. Unticked: 0 leaks.
14. **Wrong in the safe direction.**
    - Item 63: a card with only one look-alike letter is blocked.
    - Item 37's 3-7-7 order exception: "Order 123-4567890-1234567" is held.
15. **KNOWN-LIMITS item 43 says every line naming RAMBO or Claude starts "Do NOT".** "For RAMBO:" lines do not (CHECK-11 edge 10).
16. **DATA-CONTRACT line 78 says INSTALL-BY-HAND lists the same eight changeable files.** It does not.
17. **DESKTOP-WORK says data files are UTF-8; VERIFY requires ASCII.** It fails safe.
18. **Search loses some v3 words.** "airdrop", "inbox", "prompt" and "ctrl" no longer find some cards (re-checked "airdrop" and "inbox"), because those card lines changed.
19. **The watchdog misses one rare case.**
    - If the PC clock steps back 1 hour and then the re-read timer dies, the page stays green for 64 minutes before PAGE NOT REFRESHING.
    - I re-read the helper's repro output: 3 of 3. The control without the clock jump goes red in 4 minutes.
    - It needs two faults at once. vtes5-live.js was not changed in round 10.
20. **A data file that runs code can still fake green.**
    - `Object.prototype.ok = true` makes health green.
    - `window.VTES5U = undefined` freezes the page green while only the failure box shows.
    - This is the class in KNOWN-LIMITS item 51 ("A data file is code"). VERIFY's strict shape check refuses such files.
21. **PowerShell's .NET also makes temporary pipes in /tmp and removes them.** KNOWN-LIMITS item 57 names only the cache under HOME.
22. **Packets from LOCAL to a cloud window still say "paste it back to LOCAL" and name the Outbox,** as v3 did. They carry no client data unless the tick is wrong.
23. **At 360 x 640, the fixed PANEL/INDEX corner box covers part of the search box** on the first screen. It does not cover the RAMBO button.

## Section D - CHECK-11 Section C items that round 10 says it documented or fixed

1. **Three tick-wrong misses** (look-alike card, "Maria (b. 04/12/1975)", bare 13 digits): now item 63. All carried as stated (helper run).
2. **Spanish and other birth wordings and Medicare:** now item 64. All 7 carried as stated (helper run).
3. **"DOB 12-Apr-1975":** now item 65, and item 37 is corrected.
   - Measured: "DOB 12-Apr-1975" carried; "DOB 12 Apr 1975" held (re-checked).
   - The 5 spaced month forms are all held (helper run).
4. **Checker time:** now item 66 and item 40, "up to about 1.3 seconds", and the PC check is restored. Measured here:
   - 20,000 letters O: 244 ms (re-checked).
   - Worst median 338 ms, maximum 428 ms (helper run).
   - A 1 MB note is refused in under 5 ms.
   The claim is conservative and true. It is not run on every key (input event 0 to 1 ms, helper run).
5. **Document nits:**
   - FIX-ROUND-9 now names TEST-REPORT.
   - DATA-CONTRACT uses single quotes.
   - The LOCAL card cites item 44.
   - DESKTOP-WORK says LINK, and the real output agrees.
   - Item 55: fixed but self-contradicting (edge 3).
6. **New sentences that claim more than the code:** item 62 (edge 1), item 55 (edge 3), PORT-REPORT F3 item 29 (edge 4), and the LOCAL card line (edge 2). None can lead to a wrong action.

## Section E - Regression sweep, own scripts, N of N

1. **Claims (helper run).**
   - 10 page states.
   - 388 page sentences and 76 INSTALL-BY-HAND sentences extracted.
   - 44 of 44 citations resolve.
   - 120 double-quoted strings: 61 match word for word. The 59 misses are 4 run-time strings in INSTALL-BY-HAND, checked against the code that builds them, and 55 in PORT-REPORT F1, mostly v3-side strings and generator artefacts. KNOWN-LIMITS, DESKTOP-WORK, DATA-CONTRACT and TEST-REPORT have 0 misses.
   - The numbers all match: 12 files, 11 of 11, seven data files, the Read me at 10 sentences of at most 20 words, steps at most 38 words.
2. **Invariant and freeze (helper run).**
   - Worlds: 141 hand-made, 400 seeded random and 1,463 type-fuzz (77 fields × 19 bad values), each in 4 phases.
   - 0 greener-than-worst from any data a writer can produce. The 3 flags were 2 for edge 20 and 1 oracle error.
   - Fixed phases back to green: 4,008 of 4,008.
   - Clock jumps 18 of 18. Watchdog plants 10 of 11; the 11th is edge 19.
   - 0 injected scripts ran, 0 network calls, 0 storage writes.
   - 8 simulated hours: 779 page elements flat; heap 1.40 to 1.50 MB.
3. **Privacy (helper run, partly re-checked).**
   - Notes: 113 personal-data in 113 spellings, 64 ordinary, plus 101 claim probes.
   - Routes: 12 copy routes, 13 To values, tick on and off: 44,250 captured outputs.
   - Unticked leaks: 0.
   - Wrongly ticked carried: 19 of 113, 16 disclosed and 3 date forms in edge 13.
   - False alarms: 6 of 64, fail closed.
   - Bypass attempts: 65, leaks 0, including clicks 0 to 1,500 ms after a silent change.
4. **VERIFY under PowerShell 7.4.6 for Linux (helper run).**
   - The archive SHA-256 6f6015203c47806c5cc444c19d8ed019695e610fbd948154264bf9ca8e157561 matches the release's hashes.sha256.
   - 154 scenarios, with expected answers written first.
   - Fixture identical before and after: 154 of 154.
   - 0 wrong verdicts; the 2 mismatches were the helper's own setup mistakes, redone.
   - Parser: 69 commands, 0 write commands, 0 redirections. VERIFY is ASCII only, with 0 CR and 0 NUL.
   - Package grep: 0 write calls.
   - strace: no writes outside PowerShell's cache.
   - All 9 VERIFY strings quoted in INSTALL-BY-HAND appear in real output.
   - Hashes (re-checked): VERIFY 14b9b06b...70e5 = step 17; MANIFEST 180cbc35...f0e5 = the VERIFY-CMD line; 11 of 11 manifest lines OK; 12 package files.
5. **Survival and sizes (helper run).**
   - 152 of 161 v3 items exact. The 9 differences are 2 disclosed link changes (url-llm02 and url-llm06 in PORT-REPORT F3) and 7 listed text changes.
   - v3's GROK hand-work bug (empty To) is fixed.
   - Search: 429 of 462 queries return the same cards (edge 18).
   - Sizes: 12 window sizes from 360 x 640 to 1920 x 1080, plus 5 at 200%: 17 of 17 pass. The RAMBO button is fully on the first screen and uncovered, all 18 tabs are reachable, there is no sideways scroll, and no visible text is under 14 px.

## Section F - INSTALL-BY-HAND.md read as RAMBO (by reading; I cannot run Windows)

1. 31 numbered steps, with no gaps. The longest is 38 words (re-checked).
2. **No step writes to the Desktop.**
   - Files go only to a new folder under `G:\My Drive\MY-DESK\VTES-PANEL\` (steps 1 to 5).
   - VERIFY is saved beside that folder (step 16).
   - An old VERIFY is never overwritten (steps 18 and 19).
3. **The git commands are exact and do not touch the working tree.**
   - Commands: `git status`, `git fetch origin claude/panel-v5-port`, `git rev-parse` and `git show <ref>:<path>`.
   - Step 11 forbids pull, merge, reset and checkout.
   - No step switches branch, pulls, deletes or overwrites a checkout file.
   - `git status` may refresh `.git/index`, which is inside `.git`.
4. Hashes and counts are right (Section E item 4).
5. The only contradiction is step 29 against step 26 (edge 10). Step 26 comes first and stops.

## Section G - Review of the diff 894e6ac..14dcb09

1. **Logic.**
   - The two new build patches change `packet()` only when `t.id === 'LOCAL'`. Every other To keeps v3's text: 4,752 of 4,752 identical.
   - `rep()` throws if a patch misses, so a silent miss is impossible.
   - The rebuild is reproducible: byte-identical apart from the build time.
2. **False-green paths.** None added. vtes5-live.js is unchanged (0 diff lines).
3. **Fragile patterns.** None added. The LOCAL test is an exact id compare.
4. **Accessibility.** No change to controls. The new lines are plain text in the existing list.
5. **Older tests.** One changed, test-v3-packets.js. It now applies exactly the three LOCAL edits to v3's packet and compares word for word; it is not weakened. Its comment points to a missing file (edge 6).

## Section H - UNVERIFIED here: the one-line PC check for RAMBO (never a task for Jorge)

1. **PowerShell 5.1:** run the day-one VERIFY line from INSTALL-BY-HAND step 23 once on the fresh install and paste the output.
2. **Junctions:** make a junction loop in a scratch folder outside the install, run VERIFY on it, and report whether it ends within 60 seconds with a LINK line.
3. **One-click link:** click one vtes:// link once the shortcuts exist, and report whether the browser asks "Open ...?" first.
4. **Is Drive a link?** Run `(Get-Item 'G:\My Drive').Attributes` and paste the answer.
5. **Checker speed:** paste 20,000 letters O into the note box, tick, press Just show the packet, and say how many seconds it takes (KNOWN-LIMITS item 66).
6. **Dictation:** dictate the two made-up numbers in KNOWN-LIMITS item 24 and paste what appears.
7. **git fetch writes:** run `git fetch origin claude/panel-v5-port` and say whether any sign-in window appeared.
8. **Writers' time format:** paste one `at` value each writer really writes.
9. **Real clipboard, LOCAL:** press Copy packet for LOCAL, paste into Notepad, and confirm the last line starts "RETURN PATH: write your answer in the local-only folder".
10. **Real 200% zoom:** in Edge press Ctrl and plus to 200%, open the page, and say whether the blue RAMBO button shows without scrolling.
11. **Sleep and clock (edge 19):** leave the page open while the PC sleeps for an hour, wake it, and say whether WHOLE PAGE turns red or refreshes within 5 minutes.

## Section I - For the cloud keeper (charter end of session)

I changed only this file in the repository. OPEN-ITEMS.md and RECURRING-ISSUES.md were not updated by me. Suggested dated line for RECURRING-ISSUES.md:

"2026-10-07: panel v5 CHECK-12 PASS WITH DOCUMENTED LIMITS: 0 mislead, 0 damage, 0 leak, 23 edge (9 new in round 10). Both CHECK-11 flaws fixed. The words-claim-more class shrank to edge size; round 10's own new lines broke the 25-word rule and item 55's consistency, so new lines still need the same tests as old ones."

Shall the builder clean up the 9 new edge items before RAMBO installs, or install now? (yes = clean up first / no = install now)

TRK-2026-9910-C - CHECK-12 - v1 - 2026-10-07 - CURRENT · #VTES-control-panel #panel-v5 #independent-check
