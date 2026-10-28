OCR_LATEST_VERSION: L3 (2026-10-04 OCR-PROTOCOL-OVERNIGHT-QUEUE-01, sidecar-checkable part)
OCR_SAMPLE: 60
OCR_AT_LATEST_PCT: 3
OCR_OLDER_PCT: 83
OCR_EMPTY_PCT: 14

# OCR protocol audit: which .SEARCH.txt sidecars meet the latest protocol (2026-10-12)

Cloud audit, read-only on Drive. Nothing in Drive was changed. The three percentages above are
**estimates from a 60-file sample**, weighted by how many sidecars were created each month. They
are not a full count.

**Bottom line: only about 3 in 100 sidecars meet the newest OCR protocol. About 83 in 100 meet
an older version, and about 14 in 100 hold no usable text.** Even the generous reading ("TRK on
line 1 plus a five-hashtag tags file") gives only about 11%.

Population base: 3,436 sidecars and 3,858 PDFs, counted earlier today (`_OCR-COVERAGE.md` in Drive).
Estimated counts out of 3,436: about 94 at the latest version, about 2,843 at older versions,
about 498 empty or unreadable. The 95% range for "at latest" is wide, roughly 0.3% to 9%.

---

## Section A: The protocol versions, from the documents

None of the documents uses version numbers. The versions below are defined by the **dated
requirement** each source adds. Each level includes everything in the level before it.

1. **L0, plain text (before 2026-08-15).** The sidecar holds extracted text only. No job
   identity.
   Source: `OCR-STATUS.md` (2026-08-15) describes the 2026-08-13 sidecars this way. RI-016 in
   `RECURRING-ISSUES.md` measured only about 11% carrying a TRK.

2. **L1, TRK stamped (2026-08-15).** The TRK is stamped into the sidecar header at OCR time,
   taken from the job folder path.
   Sources: RI-016 fix (`RECURRING-ISSUES.md`); Queue A rule in `NIGHT-PROTOCOL.md` section 5 and
   `OVERNIGHT-QUEUE.md`; `CLAUDE.md` section 9 (the TRK must be in the file body, not only the
   filename) and section 9.3 (the footer citation travels into the `.SEARCH.txt`);
   `.claude/skills/orphan-onboarding/SKILL.md` (the stamp goes in the sidecar too).

3. **L2, full header plus tags file (2026-09-02).**
   Source: Drive `HANDOFF-TO-COWORK_OCR-PROTOCOL-2022-TO-PRESENT_2026-09-02.md`. It requires:
   - line 1: `TRK-2026-NNNN . OCR . <timestamp>`
   - `# source:` line (TEXTLAYER, TESSERACT and so on), `# run <id>`, `# unit / permit / folio`,
     `# original: <full path>`
   - a hashtag line inside the sidecar
   - a companion `<file>.TAGS.txt` with **at least 4 hashtags**, always including `#TRK-...`
   - OCR capped at 12 pages, with the cap recorded

4. **L3, current protocol (2026-10-04). This is the latest.**
   Source: Drive `JOB-NEXT_OCR-PROTOCOL-OVERNIGHT-QUEUE-01_RAMBO.md` (Chat, on the owner's
   instruction). It defines the OCR protocol as: OCR plus email-circling; a hashtag file with **at
   least 5 hashtags per document**; red-circled emails and phone numbers; and the
   scanned-document cleanup standard.
   Supporting sources:
   - Drive `JOB-0091_URGENT_OCR-PROTOCOL-CONTINUOUS-RUN-OVERNIGHT_2026-09-15`: phone and
     email-circle extraction linked to the master TRK, using the 7-step method.
   - Drive `EXECUTED_MSG-CHAT-TO-CODE_OCR-PROGRESS-AND-EMAIL-INVENTORY-REQUEST_2026-09-22.md`: the
     7-step method was "ratified 9/13".
   - `PROPERTY-TAX-JACKET-ENHANCEMENT-PROTOCOL.md` (2026-08-25): the cleanup standard and the
     identity stamp.

   **What this audit can check for L3:** an L2 header with a canonical TRK on line 1, plus a
   `.TAGS.txt` with 5 or more hashtags including the TRK. Email-circle and phone extraction live
   in separate circle artifacts, not in the sidecar, so they were **not verified here**. By the
   2026-09-22 report, only 2 circles had been built, so this check overstates L3 if anything.

**Not a new version: the 2026-10-12 runner.** `tools/ocr/OCR-QueueA-Runner.ps1` writes line 1
`TRK · OCR-SIDECAR · date · source · method`, then a `#TRK` line, and no `.TAGS.txt`. That is
**L1-level output**. If it is installed as written, every new sidecar it produces will be "older".

---

## Section B: Results

### How the sample was drawn

- 60 sidecars, spread across every creation month that has sidecars in Drive, and across
  different folders and batches within each month.
- Per month: June 11, July 1, August 18, September 16, October 14.
- July has only 1 sidecar in Drive, so it is fully covered. **No sidecars were created between
  2026-09-20 and 2026-09-30, and none after 2026-10-05**, so those windows could not be sampled.
- For each file, the first lines were read in full. Every sampled file's folder was then searched
  for a matching `.TAGS.txt`, and its hashtags were counted.

### Classification (sample of 60, unweighted)

- **At latest (L3): 1 of 60 (1.7%).** Index S35, TRK-2026-1667. Full L2 header, in-sidecar
  hashtag line, and a tags file with 31 hashtags including the TRK.
- **Older: 52 of 60 (86.7%).**
  - L0, plain text: 37. This includes 4 where a TRK appears only because the source document
    prints it, and 3 headered files with no TRK (TRK-TBD or legacy ID only).
  - Headered (L0h), no canonical TRK: 8 more. Their headers carry only a legacy `TUS-25/26-NNNN`
    or short-form `TRK-26-NNNN` ID, or TRK-TBD.
  - L1, TRK stamped: 5. These are 4 Queue A sidecars from 2026-08-19 (TRK on line 2), plus 1
    hand-written summary with the TRK in the body.
  - L1 layout but with a legacy TUS ID labelled "TRK": 3. These came from the 2026-09-17 email-OCR
    sweep.
  - L2 layout but with a legacy TUS ID on line 1 and no tags file: 1.
  - **Near-latest: 3** (S36 to S38, TRK-2026-1265). Each has TRK on line 1, the original path,
    unit/permit/folio, and a tags file with 10 hashtags including the TRK. They miss two L2 items:
    the in-sidecar hashtag line and the run ID.
- **Empty or unreadable: 7 of 60 (11.7%).** These have a header only, blank page markers, a
  watermark line only, or about 30 characters of OCR noise. Only 1 of the 7 is under 100 bytes
  (77 bytes). The rest are 156 to 425 bytes, because a header pads the size. **A byte-size cut
  misses most empties**, so text content was used instead.

### Per month (sample)

- **2026-06 (n=11, population 41):** latest 0, older 11 (all L0), empty 0. All 11 have a
  `.TAGS.txt`. None of those tags files carries a TRK.
- **2026-07 (n=1, population 1):** latest 0, older 1 (L1), empty 0. No tags file.
- **2026-08 (n=18, population 1,696):** latest 0, older 15, empty 3. 4 are TRK-stamped Queue A
  files. All 18 have a tags file. 3 of those tags files have 5 or more hashtags including the TRK.
- **2026-09 (n=16, population 1,512):** latest 1, older 13 (3 of them near-latest), empty 2.
  12 of 16 have a tags file.
- **2026-10 (n=14, population 186; all created 2026-10-04 or 05):** latest 0, older 12, empty 2.
  All are plain text with no sidecar header. All 14 have a tags file, mostly from the 2026-10-05
  "tags-only backfill". 5 of those tags files have 5 or more hashtags including the TRK.

### Tags-file companion checks (sample of 60)

- A matching `.TAGS.txt` exists for **55 of 60 (92%)**.
- It has 5 or more hashtags for **35 of 60 (58%)**.
- It carries a `#TRK-2026-NNNN` for **21 of 60 (35%)**.
- Both conditions together (5 or more hashtags and a TRK): **13 of 60 (22%)**.
- A canonical TRK stamped inside the sidecar itself: **9 of 60 (15%)**. Month-weighted, about 22%.
- A TRK in either the sidecar or its tags file: **22 of 60 (37%)**.
- One tags file uses an `#ORPH-2026-NNNN` handle. The standard is `OPH-2026-NNNN`
  (`ORPHAN-NUMBERING.md`), so this is drift.

### Population estimate (3,436 sidecars), weighted by month

- At latest: **about 3%** (about 94 files). Unweighted it is 1.7%. 95% interval 0.3% to 8.9%.
- Older: **about 83%** (about 2,843 files). Unweighted it is 86.7%.
- Empty or unreadable: **about 14%** (about 498 files). Unweighted it is 11.7%. 95% interval
  5.8% to 22.2%.
- Generous reading (latest plus near-latest): about 11%.

---

## Section C: Caveats and side findings

1. **This is an estimate.** 60 files, with weights taken from another agent's per-month counts.
   Within a month, sidecars come in large batches from one tool, so a sample can over- or
   under-represent a batch.
2. **The 3,436 denominator may be inflated.** Drive's `title contains '.SEARCH.txt'` also matches
   `.TAGS.txt` files and names like `c10_search.txt`. That was seen in this audit's own queries.
   The coverage file says it counts sidecars, but it does not say whether it filtered those out.
3. **L3's email/phone circling was not checked.** It is not stored in sidecars. The figure above
   is therefore an upper bound for full L3 compliance.
4. **Two sidecar naming conventions are in use.** One is `Foo.SEARCH.txt` (June files, and what the
   new runner writes). The other is `Foo.pdf.SEARCH.txt` (the August-onward sweeps, which are most
   of the files).
   **Defect in the 2026-10-12 runner:** its skip test is
   `-replace '\.pdf$', '.SEARCH.txt'`, so it looks for `Foo.SEARCH.txt`. It will not see the
   existing `Foo.pdf.SEARCH.txt` sidecars. It will therefore re-OCR PDFs that are already done and
   write a second, L1-only sidecar beside each one.
   This was found by reading the code, and it is **unverified on the PC**. Fix it before the task is
   installed. (This is the same family as the naming mismatch in Drive file
   `VERDICT-10013_THE-OCR-SWEEP-WRITES-A-SIDECAR-NAME-THE-MATCHER-NEVER-LOOKS-FOR`.)
5. **Legacy IDs still head many sidecars.** `TUS-25-NNNN`, `TUS-26-NNNN` and the short form
   `TRK-26-NNNN` all appear. A search for `TRK-2026-` cannot find these files (CLAUDE.md section 9,
   drift item 1).
6. **No OCR output has reached Drive since 2026-10-05**, and none was created 2026-09-20 to
   2026-09-30.
7. The sample registry (file IDs and per-file notes, no names or addresses) is in this session's
   scratchpad only. Files above are referred to by index (S01 to S60) and TRK only.

Shall the runner's skip test and output format be fixed to L3 before it is installed?
