# Panel PH11 permit tags — 2026-10-14

**State: DONE locally (all tests pass). Not republished. Not committed. No backup made in the repo, as instructed.**
Directive: OWNER-DIRECTIVE TAGS-EVERYWHERE-01 (pilot TRK-2026-1265 / OPH-2026-0007).

## Section A — What changed

1. File: `control-panel/VTES-Control-Panel_v13_connect-wired_2026-10-12.html` (live copy is v52; this local file is not published yet).
2. New data block `PERMTAGS` for TRK-2026-1265, The Plaza of Bal Harbour, 10185 Collins Ave. It holds:
   - PH11: original BLC2024-1061, renewal BLC2026-1438.
   - 220: BLC2024-1335, renewal BLC2026-1437.
   - 721: BLC2024-0715, renewal BLC2026-1436.
   - Renewals issued 10/13/2026, valid to 4/11/2027 (marked "verify on the portal").
   - Expired: 423 BLC2024-0714, 15P BLC2024-0287, 321 BLC2024-0707. BLC2024-1333 approved, never issued.
   - Invoice WEB4575, the number only. No amount.
   - All the tags, the permit numbers as tags, and the 10 misspellings.
3. The 1265 job card (Clients tab, contact sheet) now shows a plain-words **Permits** block with a link to the Drive tag file 1x4yCzOWCAIKxnf2j6ovDBf8D-etUr849.
4. The OPH-2026-0007 card shows a short "Permits (cross-reference)" line pointing to TRK-2026-1265.
5. Search: a new "Job permits" result for 1265 (ranked first), a cross-reference result for OPH-0007, and the tags added to the 1265 capsule, both 1265 Drive job folders and the OPH-0007 orphan row.
6. Small fix: clicking results quickly no longer drops the highlight early (old timers are cleared).

## Section B — Tests (counts are passed checks)

1. `tools/panel/test/tags-ph11-test.js` (new): 25 of 25. All 9 queries find the 1265 permits block at rank 1 and the click highlights it: PH11, #ph11, BLC2026-1438, BLC20261438, blc2024-1061, penthouse 11, Orfanopolous, 10185 colins, bal harbor ph11.
2. `search-test.js`: 28 of 28. Its "not in the page" sample was BLC2026-1438, which the page now holds, so it is now BLC2099-9999.
3. `phone-width-test.js`: 12 of 12. `button-groups-test.js`: 50 of 50. `attention-test.js`: 37 of 37. `master-task-log-test.js`: 27 of 27.
4. `money-lock-test.js`: 0 visible amounts across 26 tabs when locked. 0000 opens them, relocking hides them again, 0 page errors.

## Section C — Still open

1. The panel needs republishing to v52 before Jorge sees this. Not done, as instructed.
2. The renewal dates still say "verify on the portal".

#TRK-2026-1265 #OPH-2026-0007 #PH11 #tags-everywhere #controlpanel

Shall the next agent republish it?
