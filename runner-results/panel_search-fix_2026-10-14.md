# Panel search fix — 2026-10-14

**State: DONE locally (tests pass). Not republished, not committed by this agent.**

File changed: `control-panel/VTES-Control-Panel_v13_connect-wired_2026-10-12.html`
Backup made before editing: `control-panel/VTES-Control-Panel_v13_connect-wired_2026-10-12_bak-20261014-1341.html`
New test: `tools/panel/test/search-test.js`

## Section A — Why search gave nothing

1. **The whole box was matched as one string.** The search looked for the exact text `#ph11 #plaza`, with the `#` signs and the space, as one piece. No item holds that exact string, so it showed 0. One word worked. Two words, or a `#` on a word that is not a tag, did not.
2. The page's search also skipped most of what the page holds. Clients, people, email addresses, the last-email list, the Emails menu, the document library and Plaud were not searched at all.
3. The Drive search sent the whole phrase to Drive as one term, so it had the same problem.

## Section B — Why "Reading…" stuck

1. The Read button set "Reading…" when speech started, but **nothing ever cleared it.** It had no "finished" handler and no time limit.
2. There was no Stop button next to Read.
3. In the claude.ai window, speech can report that it started and then never finish. When that happens the message stays on screen forever.

## Section C — What changed

1. **Search:** each word is matched on its own. Case does not matter. A leading `#` is ignored. All the words must match. If nothing has all of them, items with any of the words are shown, and the page says so.
2. It now also searches job capsules (the contact sheet for each job), clients, people, email addresses, last emails, the Emails menu, the document library, Plaud recordings and hashtags. That is on top of what it already searched: tabs, job folders, reports, orphans, links, tasks and approvals.
3. Results show a count ("4 found") and are ranked best first. Clicking a result opens its tab, scrolls to the item and highlights it. Clicking a hashtag result searches that hashtag.
4. If nothing matches, the page says "0 found. … is not in this page's data — Drive search: the Google Drive results are just below", with a "Search Drive again" button. Drive is now searched word by word, all words required.
5. Enter searches, and there is a new 🔎 Search button. Typing still searches live, as before.
6. **Read:** if speech is missing, or has not started within 2 seconds, the page shows "Read aloud isn't available in this window — use Speechify or press Ctrl+Alt+R on the PC" and clears the reading state. When speech ends, it says "Finished reading." There is also a safety time limit.
7. There is a new ⏹ Stop button. It always cancels speech and shows "Stopped."
8. The 🎤 Speak button gives up after 2 seconds if the microphone never starts. It no longer overwrites a Read message.
9. Reading an approval card aloud has the same 2-second fallback.
10. Money stays locked: amounts in results show as 🔒$ until 0000 is typed.

## Section D — Honest note on PH11

The page's data has PH11 in only two places:

1. Two people on the job capsule **OPH-2026-0007 · Bal Harbour + Plaza** (Michael and Emanuel Orfanopoulos, "10185 Collins PH11").
2. Report **R-49, "MZ Solutions at Bal Harbour"** ("Unit PH11 360 DAYS PAST EXPIRATION BLC2024-1061 The Plaza of Bal Harbour").

`#ph11 #PLaza` finds these 4 items. **Nowhere in the page data is PH11 tied to TRK-2026-1265.** `BLC2026-1438` is not in the page at all. Searching it gives the honest "not in this page's data" line and the Drive search.

## Section E — Test results

1. `search-test.js`, seed 20261014: **RESULT ALL PASS**, 28 checks.
   - 26 random queries drawn from the page's data, plus the fixed ones.
   - Each one gave at least 1 result, or the honest not-in-page line.
   - Slowest query: 15.5 ms. The limit is 500 ms.
   - Read was tested three ways: speech missing, speech that never starts, and speech that starts and never ends. In every case the message cleared or Stop worked, and there were no page errors.
   - Money stayed locked in the results and opened with 0000. At 375px, results caused no sideways scroll.
2. Earlier runs with seeds 4242 and 541735 also passed.
3. `phone-width-test.js`: ALL PASS (12)
4. `menu-glossary-test.js`: ALL PASS (18)
5. `button-groups-test.js`: ALL PASS (50)
6. `money-lock-test.js`: 0 amounts showing on any of the 26 tabs while locked. 4 showing on USAGE when opened with 0000. 0 after locking again. No errors.
7. Also rerun with no errors:
   - hover-tips
   - search-voice: Read now gives the not-available line
   - menu-coming-next: "county monitor" and #comingnext still work
   - panel-map
   - approvals-readaloud
   - build-governor
   - links: its "#mdc finds 22 proof links" check passes. Its "BUILD count +5 vs git HEAD" check is a one-off baseline check from an earlier change, and it does not apply here.

## Section F — Sample of 10 queries (seed 20261014)

1. `#ph11 #PLaza` — 4 found, 15.5 ms
2. `miguel@mzsolutions.org` — 16 found, 10.6 ms
3. `BLC2026-1438` — 0 found, honest "not in this page's data" plus Drive search, 7.4 ms
4. `nICOLe.ORtIZ@MIAmiDAdE.gOv` — 3 found, 10.5 ms
5. `30-5910-018-0210 · 14598 SW 110 St Miami` — 17 found, 8.8 ms
6. `trk-2026-1612` — 15 found, 8.3 ms
7. `#CapsULE` — 72 found, 14.1 ms
8. `caso-sevastopoulos` (hashtag without #) — 11 found, 10.7 ms
9. `REyna joVel` — 6 found, 8.9 ms
10. `TRK-2026-1536 ALEC` — 8 found, 6.9 ms

## Section G — Notes

1. A commit named "WIP: panel search fix + root-cause report in progress (not published)" (9a85fb6) appeared while this work was running. It was not made by this agent. It holds an in-progress copy of the panel and the test, and it deletes `_bak-20261014.html`. The final edits are uncommitted in the working tree.
2. To go live, the panel still has to be republished. That was not done here.

Shall the desktop session republish the panel to v51 now?
