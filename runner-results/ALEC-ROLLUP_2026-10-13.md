# ALEC ROLLUP · TRK-2026-9047 · 2026-10-13
#rollup #orange-tree #TRK-2026-9047 #AlecValdes #AvisBuilders

**Written by:** Claude Code, CLOUD lane (☁️), helper for the VTES runner. Article 3 cash workstream ("Alec DD delivery … then invoice").
**State: DONE (prepared and verified). PREPARE ONLY: nothing was sent, drafted in Gmail or Outlook, filed, moved, renamed or invoiced. Not committed.**

## Section A — The answer

1. **5 of 8 ready to send:** 1612, 1534, 1289, 1286, 1292.
2. **2 of 8 need a PDF first:** 1535 and 1536. Their October 10 reports exist only as `.md` notes files. A Drive search on 2026-10-13 found no PDF for either.
3. **1 of 8 has no separate report:** TRK-2026-1531 is the eighth job. It is the microfilm batch parent, on the same parcel as 1292 (folio 01-3112-016-0030). It is delivered through the 1292 report and matters only for billing. Merging it into 1292 is still open (TRK-2026-9089, RED, Jorge's word).
4. **4 correction notes must travel with their reports:** 1535, 1289, 1286, 1292. 1612, 1534 and 1536 need none.
5. **Address check:** 1286 is shown everywhere as **11997 SW 218 ST**. The only "1997" on the page is a quoted warning that it is wrong.

## Section B — Files written

1. `reports/ALEC-ROLLUP_2026-10-13.html` (32,474 bytes, md5 9cc3bd1bc074be7db173717f9e66d141). Orange Tree layout. The CSS is copied byte for byte from `CAPSULE-ENHANCED_TRK-2026-1612_2026-10-13.html`. The page has:
   - one branch per job, 8 in all;
   - a checkbox on every row, plus a "pick this job" box that ticks the whole job;
   - a "Tick the ready jobs" button, "View these together" and "Copy for email";
   - colour print;
   - the 0000 money lock, the same mechanism as the capsules.
2. **Drive copy (a NEW file in `_ALEC-VALDES-DD` 17Bg1qkk7IaF75Qa6ZkBK2EC-ukdErDYI):**
   - name `_ALEC-ROLLUP_TRK-2026-9047_2026-10-13.html`, id **1-gizBwqBeefiDhNeZloocL9PkUxg7rUB**
   - link: https://drive.google.com/file/d/1-gizBwqBeefiDhNeZloocL9PkUxg7rUB/view
3. `runner-results/ALEC-EMAIL-DRAFT_2026-10-13.md`: the cover email as a text file only. It covers the 5 ready reports, lists the 3 correction notes for the reports being sent now, states the gaps honestly and says 1535 and 1536 will follow. It has no dollar amounts.
4. `runner-results/ALEC-INVOICE-DRAFT_2026-10-13.md`: marked DRAFT — NOT ISSUED.
   - The pass-through of **$100.25** is known: $56.25 county microfilm plus $44.00 for the City microfilm on 1292.
   - All 7 service fees are **[JORGE: amount?]**.
   - The Zelle credit and the invoice number are **[JORGE]**.
5. Scratch: `scratchpad/alec-rollup/` holds build.py, style.css and smoke.mjs.

## Section C — Per job

1. **TRK-2026-1612, 331 Tamiami Canal Rd: READY.** PDF 1AaqsKgAGeT0IDhEgpRgmiQOJ2yhXWz8B. No correction note. Gaps:
   - The City permit search has not started because its fee is unpaid.
   - The Clerk search is blocked by Turnstile.
   - Imagery not captured.
2. **TRK-2026-1534, 1840 NW 63 ST: READY.** PDF 1AcPeJPD2DYg6xHTQYHwJvql6bx4wzXVb. No correction note. Gaps:
   - The Clerk search is blocked by a CAPTCHA.
   - Tax Collector and imagery not done.
3. **TRK-2026-1535, 18020 SW 103 AVE: NOT READY (no PDF).** Notes file 1te-zH81z13WVJvbqFkL8FoBAyJAxmGze. Correction note 1JFcuceYbutlgGIJxLcGt_UJ_CP_4Hjy6. Gaps:
   - Alec has never been told that no jacket exists.
   - The CO is unconfirmed.
   - The Clerk search is blocked by a CAPTCHA.
   - Septic is unconfirmed.
4. **TRK-2026-1536, 10362 SW 180 ST: NOT READY (no PDF).** Notes file 1CRKKppY2A2AwOhvg7ZNF1Kgw3j9OiR0J. No correction note. Gaps:
   - The Clerk search is blocked by a CAPTCHA.
   - The CO is unconfirmed.
   - The unit count does not match (5 against 3).
   - Sunbiz is blocked.
5. **TRK-2026-1289, 1658 NW 1 ST Unit 1: READY, with its correction note.** PDF 1LTq_sjUZt2TPMOA204E88gIw7pIul_5l. Correction note 1Q_IN2lEL3ESRzjiT6esciojER5kYyxL8. Gaps:
   - The job was run on a reference folio, so the owner is not proven.
   - The City microfilm was most likely never ordered.
6. **TRK-2026-1286, 11997 SW 218 ST: READY, with its correction note.** PDF 18b___rGFsEy1rvxcim8w_F9U1IFHFZ_d. Correction note 1D7BL4WtuXsl4xSpnLrTr66rot97VFAKk. Gaps:
   - Master permit 2024043772 is behind a reCAPTCHA.
   - The Clerk name index is blocked.
7. **TRK-2026-1292, 7823 NW 5th Ave: READY, with its correction note.** PDF 1LGmHXAj-fh11LSDDOXG4C1wSPs1iNlkK. Correction note 17wrmNgLNbXt0em7VRpuOzX85ToJOSBjJ. Gaps:
   - The City microfilm was lost: its 14-day link expired.
   - The Clerk search is blocked by a CAPTCHA.
   - Imagery not captured.
8. **TRK-2026-1531, microfilm batch on the 1292 parcel: NO SEPARATE REPORT.** It has no folder of its own and only matters for billing.

## Section D — Verification output

```
build.py: wrote reports/ALEC-ROLLUP_2026-10-13.html 32474 bytes; ready 5 not 2 corr 4
build.py assert: no '$' anywhere in JOBS data -> passed
node --check page script -> JS-OK
playwright (chromium) smoke:
  branches 9 (8 jobs + money) · checkboxes locked 58 / unlocked 67 (9 money rows)
  '$' in page text while locked: false · '$' in page text after 0000: true
  "Tick the ready jobs" -> 35 rows selected; continuous view has '$': false; includes 1535: false
  unique Drive file links: 18 (7 reports + 4 correction notes + 7 capsules) · page errors: []
dollar amounts outside const MONEY: 0 · inside MONEY: 21
file:// -> rollup html 0 · email draft 0 · invoice draft 0
email draft: dollar amounts 0
Drive create_file -> id 1-gizBwqBeefiDhNeZloocL9PkUxg7rUB, fileSize 32474 == local wc -c 32474
```

**Limit, stated plainly:** the Drive copy matches the local file by size only (32,474 bytes on both). This lane cannot pipe a Drive download into the shell, and the metadata call returns no checksum, so a full md5 was not compared.

## Section E — Gaps the runner should know

1. The 1535 and 1536 reports need PDFs before they can be sent. That is a desktop (RAMBO) job with no owner gate.
2. The correction notes are `.md` files. Printing each one to PDF before sending would be kinder to Alec.
3. Owner answers still needed, one word each:
   - send yes or no;
   - the service fee per report;
   - whether the $5,000 Zelle is a deposit (the amount is shown in the money zone, and is repeated here only because this is a back-end file);
   - merge 1531 into 1292.
4. The $112.50 county-fee figure in ALEC-VALDES_ALL-JOBS_2026-08-24.md probably counts the same $56.25 twice. It is noted in the money zone as [VERIFY] and was not used.

Sources read: the 7 `CAPSULE_TRK-2026-*_2026-10-13.md` files and their capsule HTML data; ALEC-VALDES_ALL-JOBS_2026-08-24.md; OPEN-ITEMS.md (9047, 9089, 9157, 9960); TRK-REGISTRY.md §7; inbox-sweep/2026-10-10 A2 and _WHO-DOES-WHAT; TO-CLOUD_MIRROR_2026-09-03 (the $100.25 breakdown). From Drive: the hub `_STAGE.md`, the 4 v2-CORRECTIONS notes (read in full), and a "DD Alec Standard" title search.

TRK-2026-9047 · Alec Rollup · v1 · 2026-10-13 · CURRENT

**Shall the desktop make the 1535 and 1536 PDFs so all seven can go out together?**
