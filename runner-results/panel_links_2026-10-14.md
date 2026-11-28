# Panel LINKS tab: chronology, 22 Miami-Dade proof links, document library with Drive links, stamp and filter

TRK-2026-9910-B (panel family) · v1 · 2026-10-14 · CURRENT
#VTES-control-panel #links #LLM-LIBRARY #MDC

## Section A. The answer first

1. **BUILD is now 81 of 116 (70%), up 5 from 76 at git HEAD.** LINKS is 7 of 8 (88%).
2. **All four tests pass:** links-test (new), phone-width, menu-glossary, money-lock.
3. Not republished, not committed. File changed: `control-panel/VTES-Control-Panel_v13_connect-wired_2026-10-12.html`.

## Section B. What was built (5 pieces flipped to 1)

1. **Chronology link.** CHRONOLOGY.html, Drive file 1XEq7q2o6A82R4LHWW-9HwjIjqKu9-h94, plus its folder LLM-LIBRARY (1IKD961UR4b62pGzYUZ74yR47QW1Nd-3w). Ids read from Drive on 2026-10-14; the repo only named the file.
2. **22 Miami-Dade proof links.** Numbered 01 to 22, one Drive proof file each, plus the "00 START HERE" index doc and the folder (1y5p2f_boXa3LZjyecT27jPQ_G5AObGpo). Source: `control-panel/MERGE-INVENTORY_v5-and-LLM-LIBRARY_2026-10-12.md` Section E (copied from v5 `vtes5-ui.js`). Spot-checked in Drive: site 22, the index, and sites 03, 05, 06, 12, 18 all sit in that folder with matching names. The global search finds them under #mdc.
3. **209 documents in 7 groups.** Same Section E source (LLM-LIBRARY index.html). Groups fold shut; counts 10, 5, 2, 39, 7, 15, 131.
4. **Drive links instead of G: paths.** Each library name opens its Drive folder. The G: path is small grey text underneath. All 7 folder ids (Shared Folders for all LLMs and 6 subfolders) were checked in Drive. Per-file ids are not recorded anywhere, so the link goes to the folder, not the file; no id was guessed. Also added 01-JOBS (1U4hnBp5Tt0qb1sxvO6dd3csBCWjhdQJt) with its G: path in grey.
5. **Updated stamp and filter.** "updated 2026-10-12" (the date of the library index), a filter box that narrows as you type (several words, matches name, group or folder), a live "N of 209 shown" line, and a plain message when nothing matches.

## Section C. Left at 0

1. **Proof-checked badge (7 days):** no check dates exist in the repo.
2. Every other LINKS piece was already built.

## Section D. Proof

1. `node tools/panel/test/links-test.js`: 25 checks, RESULT ALL PASS. These cover: each piece renders, the filter narrows to 9 and then 2 and then 0 and back to 209, no G:\ or file:/// path is a clickable link, all 210 G: paths are grey and sit under a Drive link, 375px stays at 375 with every group open, BUILD went 76 to 81, and the money lock is closed with 0 amounts showing.
2. `phone-width-test.js`: RESULT ALL PASS. `menu-glossary-test.js`: RESULT ALL PASS. `money-lock-test.js`: locked shows 0 amounts on 26 tabs, open shows 4 on USAGE, relocked shows 0, no errors.

Did this land the way you wanted?
