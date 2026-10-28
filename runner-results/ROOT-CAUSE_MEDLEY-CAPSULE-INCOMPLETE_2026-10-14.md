# ROOT CAUSE — why the Medley capsule is still not one center of truth

**Job:** TUS-26-1033 · 7265 NW 74 St Bay 2, Medley · Miami Art House / Teatro Miami
**Date:** 2026-10-14. **Written by:** ☁️ cloud lane, read-only (CLAUDE.md Rule 6). Builds on `ROOT-CAUSE_SINGLE-SOURCE-OF-TRUTH_2026-10-14.md`; does not repeat it.
**Inventory:** `runner-results/MEDLEY-INVENTORY_2026-10-14.tsv` (121 rows).
Nothing was moved, renamed, sent or deleted. No number was issued. No dollar amounts appear in this file.

---

## Section A — The answer, first

1. **OCR is not the main problem in the Medley folder.** 36 of the 37 files that need OCR already have a search sidecar. Only one is missing: the DERM `.msg` email.
2. **The problem is that the Medley documents never reach the folder.** Some of the most important Medley papers live in Outlook, in a second Drive folder, and in the agents' mailbox. The capsule only reads the one Drive folder, so it cannot see them.
3. **The capsule is a photograph, not a window.** It was built once, on October 13. A file added 15 hours later (`_HASHTAGS_v2.txt`) is already missing from it.
4. **Your own money decisions are not in the money zone.** On September 16 you confirmed the June invoice was paid, and on October 8 you chose the contract total. Both answers were written to the agents' mailbox, not to the job. So on October 13 the capsule still says "not shown as paid" and "your one answer decides it."
5. **One job carries three identities.** It is TUS-26-1033. It is also TUS-26-1022 (a June 22 engineering request and an empty folder). And there is a twin job folder in the root of My Drive holding 20 copies. It has no TRK-2026 number.

**The load-bearing sentence: Medley is incomplete because nothing moves documents and decisions from where they arrive (Outlook, the agent mailbox) into the job folder, and the capsule only shows what is already in the folder.**

---

## Section B — Scorecard (with denominators)

1. **Documents in the folder: 89.** That is 88 the capsule listed, plus 1 created after it. The capsule itself is not counted. There are also 63 backup copies, 37 search sidecars, 42 tag sidecars and 7 index pages, which are not documents. The tree is 19 folders, 3 levels deep, and 8 of them are empty.
2. **Documents OCR'd: 36 of 37** that need OCR (35 of 35 PDFs, 1 of 1 image, 0 of 1 `.msg`). The other 52 are text files that need no OCR.
   - **0 of 12** documents outside the folder are OCR'd.
   - The newest sidecar is dated **2026-09-17**. Nothing has been OCR'd in 4 weeks, because nothing new arrived in the folder.
3. **Job number written on the document itself: 24 of 37** scanned or PDF files. The 13 without it are the 6 plan sheets, `MEDLEY_5_PLANS`, the Work Without Permit form, 3 DERM PDFs, the DERM `.msg` and `image001.png`. **59 of 89** carry it in the filename.
4. **Documents linked in the capsule:**
   - **88 of 89** documents in the folder (99%).
   - **88 of 101** if you count the 12 job documents that sit outside the folder (87%).
5. **Documents outside the folder: 12.**
   - **7 are elsewhere in Drive:** the Gantt chart Google Doc; the June screenshot and an older contact list, both in the twin folder; the owner payment confirmation; the owner's decision on the total and the deposit invoice order; the county-lien order; and the DECISION_17 record.
   - **5 are attachment sets never saved from Outlook:** the 92-photo site report; Synergyn's fee proposal; Fabregat's CAD and PDF files; the approved set B2020-0177, which was **lost when the WeTransfer link expired on 09-27**; and the microfilm images, which are paid but not retrieved.
   - **Not counted:** 20 duplicate copies in the twin folder, 3 TEST copies, and about 28 agent receipt files.
6. **Emails not captured: 10 of 17** Medley email threads are not in the folder at all. The other 7 are only partly captured, as a status line or a printed PDF. **0 of 17** are saved as a full email with all of its attachments.
7. **Money items captured: 7 of 11** are in the money zone. Its 6 rows cover 7 items. 4 items are missing:
   - the September 16 payment confirmation;
   - your October 8 choice of the contract total;
   - the county lien (Clerk file 2025 R 844413);
   - the "unpaid ticket or fine" on process W2026066388, which shows in the OCR of `image001.png` and which you said belongs to another matter.

   **2 of the 7 captured items contradict your own later answers.**
8. **Three-way viewer (VIEW-THREE-WAYS-01): 0 of 89** documents have all three views. No `_VIEW-ALL_TUS-26-1033.html` exists yet.

---

## Section C — Question 1: what is actually causing this, in this job

Six mechanisms. Each is tied to evidence in this job.

### Cause 1 — Attachments are never saved, because saving is RED and waits for a machine that rarely runs

1. On 09-24, Jorge Fabregat sent "MIAMI ART HOUSE - CAD FILES" with attachments, and a WeTransfer link to the full approved set B2020-0177 (173 MB).
2. The capsule itself says these files are "waiting for your OK to file" and waiting on "the desktop helper." Filing a client document is RED, so it waits for your yes and then for a PC run. The PC is capped at 6 runs a day.
3. **The WeTransfer link expired on 09-27. The approved set is gone** unless Fabregat re-sends it (that request is drafted and not sent) or the microfilm happens to contain it.
4. The same thing happened to the 08-07 site photo report (92 photos), Synergyn's 08-24 proposal attachment, and the 10-12 microfilm images.
5. When work is handed to the Codex lane instead, it stops on personal data. There are 5 `BLOCKER_CODEX-PII` receipts for Medley in the mailbox: the NOV requests, the deposit invoice, the lien pull and others.

### Cause 2 — Outlook holds the Medley history, and nothing copies it into the folder

1. Your business mail is `jorge@teamusasales.com` in Outlook. Almost every Medley thread from June to September is there: the Synergyn requests, the documents sent for signature, the photo report, Fabregat, WeTransfer, the Julio thread and the onboarding schedule.
2. The email sweep began on **2026-10-13** ("Mail watch … first run"). It only looks forward, and it writes status lines, not files. The sources the capsule read include `inbox-sweep/ARRIVALS.md`, which has 2 lines.
3. So 10 of 17 threads never touched the folder. That includes the 06-22 request filed under the other job number, TUS-26-1022.

### Cause 3 — Your decisions go to the agents' mailbox, and the capsule never reads it

1. `OWNER-CONFIRM_TUS-26-1033-PAYMENT-RECEIVED_2026-09-16.md` is in the VTES outbox, not in the job folder.
2. Your 10-08 answer choosing the contract total sits inside `MSG-CLOUD-TO-CODE_TEDC-RENAME-AND-INVOICES-PLUS-MEDLEY-DEPOSIT_2026-10-08.md`. Its follow-up was blocked, so the deposit invoice was never drafted.
3. The two answers also disagree with each other: one says the June invoice was paid, the other orders a new deposit invoice. **No file reconciles them.**
4. The capsule built on 10-13 read only folder files. So it shows both questions as still open.
5. A third writer, the x.ai daily planner, sent **14 Medley emails** between 10-03 and 10-14. Most of them are "TUS-26-1033 money decision" or "decision block" reminders. It keeps re-asking a question you already answered. RAMBO flagged this as stale on 10-09 (`CORRECTION_…_STALE-IN-MATTER-AGING`), and nothing changed.

### Cause 4 — The capsule is a one-time snapshot with no "new document" trigger

1. It was built 2026-10-13 15:53Z, by hand, by one helper, under a standing order.
2. `_HASHTAGS_v2.txt` landed at 2026-10-14 06:52Z and is not in it.
3. Nothing rebuilds it when a file arrives. The PC portal (`_PORTAL_TUS-26-1033.html`) does rebuild daily, but it is a different page, with links that only work on the PC.
4. The job folder now has 4 summary pages that overlap: the portal, the EMBEDDED portal, POP-UP-ALL and the capsule. None is marked as the master.

### Cause 5 — One job, three identities, and third-party papers carry no number

1. TUS-26-1022 was used on 06-22 for the same theater. That left an empty folder, `_SUPERSEDED_TUS-26-1022-USE-1033`, and one Outlook thread.
2. A twin folder, `TUS-26-1033 - Medley Miami Art House (Legalization)`, sits in the root of My Drive. It holds 20 copies, and two of them were modified 10-12.
3. The job has no TRK-2026 number at all (CLAUDE.md §9 drift item 1), so a TRK search can never find it.
4. Plans, DERM papers and county forms are other people's documents. They never get the job number stamped inside them. **13 of 37** are linked only by the folder they sit in, or by a sidecar.

### Cause 6 — OCR runs only on the PC, and only on files already in Drive

1. Every sidecar was written by a PC sweep: the `email-ocr-protocol` sweep and the tesseract runs of 08-13, 09-05 and 09-17.
2. OCR never reaches Outlook attachments or the twin folder. That is why the folder scores 36 of 37 while everything outside scores 0 of 12.
3. **OCR is downstream of intake.** It cannot be complete while intake is broken.

---

## Section D — Question 2: why the previous fixes did not close Medley

1. **2026-08-13 / 09-17 OCR sweeps.** These worked inside the folder. They never touched mail, because they only scan Drive.
2. **2026-09-17 bounce evidence and onboarding PDFs.** Two emails were printed into the folder by hand. That was a one-off, with no rule to repeat it.
3. **2026-10-08 order: "Medley deposit invoice + VERSION-LOG".** Codex blocked it on personal data. `_VERSION-LOG.md` still does not exist.
4. **2026-10-11 lien-and-records pull.** Also blocked by Codex PII. The lien image is still unread (overnight report, 10-12).
5. **2026-10-13 capsule (88 of 88).** The count was honest, but the denominator was "the folder." It was correct about the folder and silent about everything outside it.
6. **2026-10-13 mail watch.** It only looks forward and produces status lines, so history stays in Outlook.

**Common thread:** every fix measured completeness against the folder. None of them moved anything into the folder.

---

## Section E — Question 3: three fixes, ranked by how long each will last

### Fix 1 — Tier 2, REPLACE: the folder's own ledger becomes the only input, and the capsule and viewer become generated pages (lasts longest)

What changes:
1. **Remove the extra storage places.**
   - Quarantine the twin folder and the empty 1022 shell to `_Superseded`. This needs your yes, because moving them is RED.
   - From now on, agents write job decisions and money facts into the job folder, in `_LEDGER_TUS-26-1033.md`. The mailbox holds only a pointer. The 4 missing money facts are copied in first, each with its source.
2. **Stop building the capsule by hand.** The cloud runner, which can read Drive, Gmail and Outlook, generates the capsule and `_VIEW-ALL_TUS-26-1033.html` every hour. It builds them from the folder listing, the sidecars and the ledger. When the file count or the newest file time changes, it writes a new version; the old version goes to `_Superseded`.
3. **One standing approval for intake.** If an email names the exact job number (TUS-26-1033), or the exact folio or address, its attachments may be saved as new files into `00-INTAKE-UNFILED` in that job, with the email ID. That counts as writing a new file, not moving one. Moving files out of `00-INTAKE-UNFILED` stays RED and is decided in the morning.

How VIEW-THREE-WAYS-01 fits:
1. The viewer is generated from the same ledger and listing.
2. Every outside or missing item appears in it as a visible gap block. For example: "Fabregat CAD files: in Outlook 09-24, not saved," or "Approved set B2020-0177: link expired 09-27."
3. Gaps are shown, not hidden, so the viewer becomes the to-do list. The pilot stays Medley.

Expected failure mode, lifespan and your part:
1. **Failure mode:** an agent keeps writing a decision only to the mailbox. Built-in catch: the generator lists any mailbox file naming TUS-26-1033 that has no ledger line, so you see "N decisions not in ledger."
2. **Second failure mode:** the hourly runner stops. The existing hourly watch catches that.
3. **Lifespan:** permanent while the runner exists. No agent has to remember a rule.
4. **Your part:** a yes to the standing intake approval, a yes to quarantine the twin and 1022 folders, and one 10-minute sitting to confirm the payment question and the total.

### Fix 2 — Tier 3, ENFORCE: an hourly reconciler that compares and reports

What it is: every hour, search Outlook, Gmail and Drive for the Medley keys, compare the results with the folder and the capsule, and print the denominators.

1. **Failure mode:** it detects gaps but cannot close them, because saving attachments is still RED. It adds one more report. Scheduled checks here have died silently 8 times (RI-015).
2. **Lifespan:** weeks to a few months.

### Fix 3 — Tier 1, SUPPRESS: a rule ("always save attachments and decisions to the job folder")

1. **Failure mode:** the next agent that did not read the rule, or that cannot write to Drive (Codex), breaks it. That is exactly what happened to the CAD files and to the payment confirmation.
2. **Lifespan:** days. It is listed only for comparison.

**Recommendation: Fix 1.** Tradeoff in one line: it needs two yeses and one 10-minute sitting from you. After that, no agent has to remember anything.

---

## Section F — "100% complete" for Medley: pass/fail checklist

Medley is complete only when every line below is PASS. Today the score is **1 of 12**.

1. **One folder.** A Drive search for the Medley keys finds job documents only in the main folder. The twin folder and the 1022 shell are quarantined. **FAIL** (12 outside).
2. **One identity.** TUS-26-1033 has a TRK-2026 number in the registry, or a recorded decision to keep the TUS number, and TUS-26-1022 is marked "same job." **FAIL.**
3. **Every email saved.** 17 of 17 Medley threads are in `04-CORRESPONDENCE` as PDF or `.eml`. **FAIL** (0 of 17 complete).
4. **Every attachment saved:** CAD set, Synergyn proposal, photo report and photos, approved set B2020-0177 (re-obtained), and the microfilm images (by 11-11). **FAIL** (0 of 5).
5. **OCR.** Every PDF, image and `.msg` has a `.SEARCH.txt`. **FAIL** (36 of 37; the DERM `.msg` is missing).
6. **Job number on every page,** as a footer stamp or a sidecar header. **FAIL** (24 of 37 inside the document).
7. **Capsule covers 100%, and is regenerated within 1 hour of any new file.** **FAIL** (88 of 89; no trigger).
8. **Money zone covers 11 of 11 money items,** each with a source, and none contradicts an owner answer. **FAIL** (7 of 11; 2 contradictions).
9. **Decisions in the folder.** `_VERSION-LOG.md` and a decisions ledger exist in the job folder. **FAIL** (none).
10. **Three-way viewer.** `_VIEW-ALL_TUS-26-1033.html` exists, with every document shown three ways and every gap shown. **FAIL** (0 of 89).
11. **No stale duplicates.** Older versions are in `_SUPERSEDED`, and backups use `NAME_bak-DATE.ext`. **FAIL** (63 backups in the banned form; 5 older versions are loose).
12. **The folder has documents at all.** **PASS** (89 documents, 19 folders).

---

## Section G — What I did not do

1. I did not read the full text of every email. Counts are by subject, sender and attachment flag, and "captured" was decided by matching against folder file names.
2. Outlook searches were paged to 50 results per query. Older or unusual Medley mail may exist beyond that, so the email count of 17 is a floor, not a ceiling.
3. I did not add a line to `RECURRING-ISSUES.md`. This task was limited to two output files. "Capsule misses documents outside the folder" should be logged there by the parent session.

#TUS-26-1033 #Medley #Miami-Art-House #7265-NW-74-St #capsule #ROOT-CAUSE #view-three-ways

Shall I turn Fix 1 into a build order for the hourly runner?
