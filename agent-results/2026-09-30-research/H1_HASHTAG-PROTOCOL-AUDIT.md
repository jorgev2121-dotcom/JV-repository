# H1 — Hashtag / Orphan-number / OCR-sidecar protocol audit

☁️ CODE · CLOUD / WEB EXECUTOR (subagent). Model: Sonnet 5.5, not Opus.
Date: 2026-09-30. Strictly read-only: nothing in Drive or the repo was changed. This file is the only thing written.
Serves: TRK-2026-9036 (stamp at OCR time), TRK-2026-9060 (intake stamp and exit gate), RI-016, RI-020.

**Headline: no program writes the stamp, and no program checks it. The rules live in documents. The writers are scripts that do not read documents.**

How the sample was taken (honest limits):
1. 30 files from Google Drive: 17 OCR sidecars, 6 tag files, 7 reports, contact sheets and portals.
2. Pure "most recently modified" returned only system files (heartbeats, CDM test files), so I searched by kind instead. The sample is **not random**, and the 17 sidecars mostly come from one batch (the 2026-09-05 desktop OCR pass). Read the counts as evidence of a pattern, not as a population estimate.
3. Five files were read in full. The other 25 were judged from the top 1,000 to 5,000 characters. That is where a stamp would sit, so absence there is a real finding.
4. Drive search is paged, so nothing here is a total.

---

## Section 1 — HOW THE PROTOCOL IS SUPPOSED TO WORK

1. Every document entering any holding area gets an `OPH-2026-NNNN` number at the door. A document inside a job folder gets that job's `TRK-2026-NNNN` from its path. (ORPHAN-NUMBERING rule 1; Constitution Section F.)
2. The number goes in the filename AND the body. Hashtags go in the body, never the filename. Each capsule carries at least 5 tags: `#JorgeValdes`, `#CU-Inspections`, the TRK as a tag, the owner or client, and the address or remembered name. (CLAUDE.md section 9; ORPHAN rule 5; hashtag audit of 2026-08-26.)
3. Each OCR sidecar's first line is `TRK | hashtags | address | folio | doc type | date`. The original is never touched. (Constitution Section F.)
4. An orphan is matched to a job only when the ID and the address agree. Never by fuzzy match. After matching, the OPH becomes `#OPH-2026-NNNN` in the body. (CLAUDE.md section 9; Constitution Rule 5.)
5. Nothing leaves a holding area for `01-JOBS` without a TRK. Each OPH ends as a TRK, NON-JOB, DUPLICATE or DISCARD-PENDING. **Conflict to fix: the Constitution says an unresolved item shows in the digest on day 8; ORPHAN-NUMBERING and CLAUDE.md say 30 days.**

---

## Section 2 — WHERE IT FAILS

Counts from my 30-file sample (full list of files is in Section 9):

1. Full `TRK-2026-NNNN` in the BODY: **11 of 30**.
   - Sidecars: 2 of 17. Tag files: 3 of 6. Hand-built reports and portals: 6 of 7.
   - One more file carries an OPH (the Bal Harbour and Plaza portal).
   - Of the other 18: 12 carry a legacy number such as `TUS-26-1033`, which a search for `TRK-2026-` cannot find. 5 sit in folders named `TRK-TBD`. 1 has no ID at all.
2. At least 5 hashtags: **10 of 30**. Sidecars: 1 of 17. The 16 sidecars with no tags carry none at all.
3. Address as a hashtag: **7 of 30**.
4. Owner or client name as a hashtag: **9 of 30**. Strictly the owner of record: **3 of 30**.
5. Folio present anywhere: **19 of 30**. As a hashtag: only 7. The other 12 are plain text, a header field, or only inside an "original:" path line.
6. Document type stated in the body: **11 of 30**.
7. A date in the body: **23 of 30**. For sidecars this is the OCR-run date, never the document's own date.
8. Permit or case number as a tag: **2 of 30**.
9. **All seven fields present: 1 of 30.** That one is the Email Tracker sidecar for TRK-2026-1667, built by hand.
10. Sidecars matching the Constitution's first-line format: **0 of 17**. (Caveat: the Constitution v2 is dated today, so older sidecars could not have followed it. The point is that the spec is still only text.)

What else the sample showed:
11. **Tags exist but are spelled four ways.** Folio appears as `#folio-30-6007-009-0030`, `#folio3060070090030`, `#folio-2230110520020` and `#folio1222260292460`. Address appears as `#10980-SW-202-Dr`, `#10980SW202Dr`, `#10185CollinsAve`. A search for one spelling misses the others.
12. **Tag files that are empty.** `_TAGS.txt` for TRK-2026-1297 is listed at 0 KB. The Plaza-1515 capsule lists `_HASHTAGS.txt` and its PDF's `.TAGS.txt` at 0K.
13. **The portal for TRK-2026-1297 prints its own TRK in the address slot.** Its tag box is empty, and 9 of its 10 folders read "SHELL — AWAITING RETRO-SWEEP".
14. **Silent empties.** 3 of 17 sidecars hold only page markers, with no "needs human eyes" flag. 2 more carry a flag. 2 more are mirrored microfilm garbage. So 7 of 17 have no usable text, and all 17 look like successes.
15. **A digit match filed 11 documents into the wrong job.** The Plaza portal records this itself: `18703 SW 307 ST` was filed under unit 307 because the 307 matched. Nothing checked the address. The same portal shows the 11 sole copies were moved out on 2026-08-17.
16. **The owner name is not a safe key.** `10960 SW 200th Avenue LLC` is the owner on TRK-2026-1262 and also on TRK-2026-1667 and 1310. `MZ Solutions` is on at least six jobs.

The repo's own numbers:
17. About 11% of sidecars carry a TRK (6 of about 54, RI-016, 2026-08-15). My sample gives 2 of 17, or 12%. **Six weeks later, no change.**
18. 34 of 41 capsules were under 5 hashtags on 2026-08-26. The fix was written as "how to apply", never as a program.
19. Only 9 OPH numbers have ever been issued (next is 0010), against about 5,708 PDFs in OCR scope (15.9% already OCR'd, COUNTS-9038). OPH is being issued by hand, not at a door.
20. OPEN-ITEMS still shows 9036 (stamp at OCR time) and 9060 (intake stamp and exit gate) as NOT_STARTED.

---

## Section 3 — ROOT CAUSE

**Three steps are missing. Two never run. One never exists.**

1. **The stamp step has no program.** The OCR script writes text plus a source-path line. It has no input for TRK, OPH, tags, address, owner or folio. Three different writers produce three formats: the desktop OCR script (path only), the cloud email sweep (TRK, FOLIO and ADDRESS fields, but legacy `TUS-` numbers), and hand-built LLM files (complete). Only the hand-built one is complete, and it is built one file at a time.
2. **The door does not exist.** "Every document gets an OPH at the door" has no mechanism behind it. So unknown files carry `TRK-TBD` in a folder name or nothing at all. The orphan has no identity to search by, which is exactly Jorge's complaint.
3. **No machine-readable job card.** The facts that tie an orphan to a job (folios, normalized addresses, permit and case numbers, owners, legacy aliases) sit in prose in each job's `00-INDEX.md` human part. `TRK-REGISTRY.md` holds only "what it is". So a matcher, human or program, has nothing to look up, and the no-fuzzy rule correctly stalls it.
4. **No checker, no owner of the result.** Nothing counts how many files pass. The heartbeat that would run a check is still unverified (TRK-2026-9070). The 2026-08-26 audit set a target of 5 tags per capsule and nothing ever measured whether it was met.

Why orphans never reach the TRK: the path from folio or address to TRK is a manual reading task, done by whichever LLM happens to be awake, with no shared key table and no record of candidates.

---

## Section 4 — WHY EARLIER FIXES FAILED

1. **RI-016's fix was right and was never built.** "Stamp the TRK at OCR time" (Tier 2) was logged 2026-08-15 and is still NOT_STARTED. The fix exists only as text.
2. **The hold on bulk OCR was a sentence, not a lock.** 9034 was "blocked by design", yet a 2026-09-05 pass touched sidecars: files created 2026-08-26 show modified 2026-09-05/06 with a new header. That pass added a source-path line and no ID or tags. Nothing enforced the hold, and nothing enforced the stamp.
3. **The hashtag audit counted the wrong unit and told people to apply it by hand.** It counted tags on 41 capsule indexes, not on each document. Sidecars and tag files are what search reads. The apply step went to a manual fan-out with no check, and the empty tag files above are the result.
4. **Rules were aimed at agents, but the writers are scripts.** The Constitution's own Rule 7 says it about `.bak` copies: "these are written by a generating job, not by agents, so a rule to agents will not stop them." The same is true of sidecars and portals.
5. **The ID was demanded at entry.** RI-020 already showed this cannot work, because the TRK is often unknown on arrival. The OPH was the answer, but it has no door, so it fell back to `TRK-TBD`. CLAUDE.md calls `TRK-TBD` a defect, yet 5 of 17 sampled sidecars sit in such folders.
6. **No single spelling for a tag.** Even the good files cannot be searched reliably.
7. **The job-identity table was never built.** RI-013 shows the registry is out of date. No sweep added folio or address columns.

---

## Section 5 — THREE OPTIONS, RANKED BY HOW LONG EACH SURVIVES

RI-016, RI-020 and the hashtag audit share one cause, so the recurrence rule (Rule 4) applies: no patches. A dated recurrence line is owed in RECURRING-ISSUES.md (I could not write it; see Section 9).

1. **Option 1 — Tier 1, suppression: tell every agent to add 5 tags.** Survives days.
   - Failure mode: the scripts and generators never read the instruction. This is the 2026-08-26 audit again.
2. **Option 2 — Tier 2, removal: take tag-writing away from everyone and give it to ONE stamp function.** Survives permanently for every file written through it.
   - What it removes: free-typed tags and the separate hand-made `.TAGS.txt` layer.
   - How it works: one shared function writes the stamp block (Section 6). It reads a generated `_JOB-KEYS.csv` built from each job card. If the file's identity is not certain, it writes `OPH-…` and never `TRK-TBD`. Every generator calls it: the OCR script, the email sweep, the portal builder, and agents.
   - Failure mode: a new generator bypasses it, or the job card is wrong. It costs a build (9036 and 9060 together, about a night for the function).
3. **Option 3 — Tier 3, enforcement: a nightly checker plus a repair queue.** Survives months, but only while it runs.
   - Failure mode: it repairs symptoms and cannot invent identity. RI-015 shows scheduled tasks die silently, so it needs a growth heartbeat.

**Recommendation: Option 2.** It removes the cause. The one-line tradeoff: it needs a build, where Option 3 alone can start tonight but only treats symptoms. **Ship the Section 8 checker first, as a read-only baseline and as Option 2's acceptance test.** That is part of Option 2's "done", not a separate fix. Proceed on this unless Jorge objects.

---

## Section 6 — PROPOSED MINIMUM FIELDS AND THE MATCHING RULE

**Stamp block. Every generated file (sidecar, report, portal, contact sheet) carries it at the top, in the body, in this order:**

1. `ID:` exactly one of `TRK-2026-NNNN` (optionally `-SUFFIX`) or `OPH-2026-NNNN`. Never `TRK-TBD`, never `TRK-26-`, never a bare legacy number.
2. `ID-STATE:` CONFIRMED, CANDIDATE or ORPHAN.
3. `ALIAS:` legacy numbers such as `TUS-26-1033`. Searchable, never the identity.
4. `DATE:` the document's own date (`YYYY-MM-DD`), plus `OCR-DATE:` for sidecars.
5. `TYPE:` from the Constitution's closed list (Permit, Report, Invoice, TaxJacket and so on).
6. `ADDRESS:` as `#addr-10980-SW-202-DR` (number, street, direction, type, unit; fixed spelling).
7. `OWNER:` `#owner-…` (owner of record) and `#client-…` (who pays). Two tags, not one.
8. `FOLIO:` `#folio-3060070090030` (13 digits only, no dashes). Mark `#folio-UNKNOWN` if not known. Never `TBD`.
9. `PERMITS:` every permit, process and case number as `#permit-…`, `#case-…`, `#process-…`.
10. `SOURCE:` original path or email message id.
11. `TAGS:` `#JorgeValdes #CU-Inspections #TRK-2026-NNNN` (or `#OPH-…`), plus items 6 to 9. This gives at least 5 tags by construction.

The stamp's first line must also be a single searchable line: `ID | DATE | TYPE | ADDRESS | FOLIO` (the Constitution's format, with the ID first).

**Orphan-to-TRK matching rule. The ID finds candidates. It never proves a job.**

1. Keys come from `_JOB-KEYS.csv`: one row per TRK with folios, normalized addresses, permit and case numbers, owners, aliases. It is generated from each job card (a new file, GREEN).
2. Match on **whole normalized tokens only**. Never on digit fragments (`110`, `307`).
3. **Strong keys:** a permit or case number listed in exactly one job; a 13-digit folio matching exactly one building-level job. A folio shared by units matches the building only.
4. **Medium key:** the full normalized address including the unit.
5. **Weak key, never enough alone:** owner or contractor name. (See Section 2, item 16: it hits several jobs.)
6. A candidate needs **two independent key types that agree, and no key that contradicts.** Anything else stays `OPH`.
7. A candidate is written to `ORPHAN-REGISTER.md` as `CANDIDATE → TRK-2026-NNNN, evidence: …`. **Moving or filing is RED.** Jorge or a morning session approves each batch, and exceptions are shown alone.
8. On approval the TRK takes over and `#OPH-2026-NNNN` stays in the body.

---

## Section 7 — WHAT A SLOW BACKGROUND OCR RUN MAY SAFELY DO NOW

Jorge asked for a slow run that completes the OCR protocol. **Only Queue A may run. Queue B stays held.**

1. **Tighten the definition of Queue A.** A PDF qualifies only if its folder name carries a **real, registered** `TRK-2026-NNNN`. These do NOT qualify and go to Queue B:
   - `TRK-TBD` folders (the 5 Palmer Trust and 2362 NW 32 St files in my sample).
   - Legacy-numbered folders such as `TUS-26-1033`, `TUS-25-1023`, `TUS-26-1018`, unless the alias map resolves them to one TRK.
   - Contested numbers (1582, 1412, 1021, 1033, 1531; see `CONTESTED-IDS.md`).
   - Anything in `_CONVERGE-STAGING` or `_FROM-ARCHIVE`.
   Reason: the 2026-09-05 pass already OCR'd files in those folders and produced no usable identity.
2. **Step 0 is a count, and it is the gate.** No count of Queue A exists yet (the 2026-09-24 blocker says "item count: not computed"). Count: Queue A PDFs, how many already have a sidecar, how many sidecars lack a full stamp. Write it to a new file. No count, no run.
3. **Queue A-1, may run now:** Queue A PDFs with no sidecar. The worker writes one new sidecar per PDF, starting with the Section 6 stamp block. The ID comes from the path, `ID-STATE: CONFIRMED`. Nothing is overwritten.
4. **Queue A-2, hold for one approval:** existing sidecars that lack a stamp. Re-stamping edits an existing file. Do it only after Jorge's one-word yes, with the backup written to a local folder outside Drive (not a `.bak` beside the file, which is the clutter the Constitution's Rule 7 is about), and a rollback script in `Undo_Manifests`.
5. **"Slow" means:** one file at a time, below-normal priority, pause while Jorge is working, quit Dropbox and PaperPort first (NIGHT-PROTOCOL section 6).
6. **Each item is written the moment it completes.** Then the checker (Section 8) runs on that one sidecar. A fail is retried once, then put on a quarantine list, and the run moves on.
7. **Never:** move, rename or delete a client document; stamp an original; set Dropbox to online-only; OCR Queue B; edit registers.
8. **Completion is reported with a denominator:** "N of M Queue A PDFs have a sidecar that passes the checker."
9. **Queue B, what the night prepares instead (read-only):** build `_JOB-KEYS.csv`, and run the matcher over Queue B to write `CANDIDATE` rows to a new file. The morning approves. This is the work that connects orphans to TRKs.

---

## Section 8 — A CHECKER DESIGN

Read-only. One script, run by the desktop over `G:\My Drive` (the cloud sees only paged Drive results, so its counts are lower bounds). It runs nightly, on demand, and once on each sidecar the OCR worker writes.

Per file it verifies:
1. **C1 Identity present.** Exactly one `TRK-2026-NNNN` or `OPH-2026-NNNN` in the first 15 lines. Fail on `TRK-TBD`, `TRK-26-`, or a legacy number with no alias entry.
2. **C2 Identity is real.** The ID exists in `TRK-REGISTRY.md` or `ORPHAN-REGISTER.md`. Catches invented numbers.
3. **C3 Path agrees.** The ID in the body equals the ID in the filename equals the ID of the containing folder (after alias resolution). A mismatch is `FAIL-CONFLICT`. This is the misfile sensor (the 307-versus-18703 case).
4. **C4 Fields present.** All Section 6 fields, with `UNKNOWN` allowed but blank or `TBD` not.
5. **C5 Tag count and spelling.** At least 5 tags, including the ID tag, address, owner or client, and folio. Every tag matches the fixed pattern, so the four-spelling problem is caught.
6. **C6 Type valid.** In the closed list. **Date valid.** A real `YYYY-MM-DD`.
7. **C7 Text present.** A sidecar is non-empty, or carries an explicit `NO-TEXT` marker and is on the re-OCR list. Catches the silent empties.
8. **C8 Tag file not empty.** `_TAGS.txt`, `_HASHTAGS.txt` and `.TAGS.txt` are not 0 bytes.
9. **C9 OPH age.** Any OPH with no outcome past the agreed limit (resolve the 7 versus 30 day conflict first) goes to the digest.

How it reports:
1. **One new file per run:** `HASHTAG-CHECK_YYYY-MM-DD.md`, plus a CSV of failing paths with the failing check named. Nothing else is written.
2. **Always a denominator:** "PASS 412 of 3,180 files in scope. FAIL 2,768: C1 1,900; C5 640; C7 228." The scope list itself is counted and printed, so a scan that missed folders shows as a short denominator, not a good score.
3. **Baseline:** my sample would read "PASS 1 of 30, all seven fields." The first real run replaces that with a true number.
4. **Growth heartbeat:** the report file's size and time are what the heartbeat watches (NIGHT-PROTOCOL 3b), not whether the process exists. Three flat cycles means hung: kill it, log it, go on.
5. **A run with no report is a failed run.**

---

## Section 9 — THE 30 FILES SAMPLED (so this can be re-checked)

Sidecars (17): `ONLINE-FORM_3_30-5032-000-1352_TRK-2026-1536…png.SEARCH.txt`; the three `TUS-26-1033` email sidecars (Bounce-Evidence, Job-Status-Dashboard v2, Project-Onboarding-Schedule); the `TRK-2026-1667` Email-Tracker sidecar; the `TRK-2026-1612` ENHANCED tax-jacket sidecar; `image001.png`, `DERM_APPLICATION-FORM_NDS-TIRES`, `Elevation- 8621 Pasedina`, `TAXJACKET_14598…part01`, `ENHANCED_14598…part01`, `Building-Sketch_30-5910-018-0210_2025.png`, `TAXJACKET_2362-NW-32-ST…part02`, `PROCESS STAMP 12112019.PDF`, `000243.PDF`, `000428.PDF`, `000355.PDF` (Palmer Trust, `TRK-TBD`).

Tag files (6): the `TRK-2026-1310` `_TAGS.txt`; the three `TUS-26-1033` `.TAGS.txt`; the `TRK-2026-1667` Email-Tracker `.TAGS.txt`; the Unit-220 Extension `.TAGS.txt` (`TRK-2026-1265`).

Reports and portals (7): the `TRK-2026-1667` Contact Sheet (fee review); `JACKET-ORDER-LOG_TRK-2026-9047.md`; `RESULT_LLM-USAGE-REPORT_TRK-2026-9952d`; `EXECUTED…CODEX…TRK-2026-9952g v2`; `_PORTAL_TRK-2026-1297.html`; `_CAPSULE-REPORT_Plaza-1515_TRK-2026-1582-PZ1515.html`; `_PORTAL_BAL-HARBOUR-PLAZA_OPH-2026-0007.html`.

Two of the 30 are admin-band documents (9952d, 9952g), where address, owner and folio do not apply. If they are dropped, the address, owner and folio counts are out of 28.

Not done, because I was limited to writing this one file: the recurrence line for RECURRING-ISSUES.md. Suggested text for the next session to add: "2026-09-30 — RI-016 and RI-020 recurrence: 2 of 17 sampled sidecars carry a full TRK (12%, same as 11% on 2026-08-15); 9036 and 9060 still NOT_STARTED; 9 OPH issued against about 5,708 PDFs in scope."

**Question: may the next session start with the read-only count of Queue A and the checker baseline, before anything is written?**
