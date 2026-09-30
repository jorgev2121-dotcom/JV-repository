# CRITIQUE OF THE FILING CONSTITUTION v1 (adversarial, read-only)
**ADHOC-FILING-CRITIQUE · 2026-09-30 · by a cloud reviewer · #filing #constitution #critique #JorgeValdes #CU-Inspections**

**Scope read:** README-FIRST, FILING-CONSTITUTION, AGENT-INDEX template and live index, the sweep registry and all nine sweeps, CLAUDE.md section 9, RI-012, RI-013, TRK-REGISTRY sections 3, 4 and the collisions block, ORPHAN-NUMBERING, and the four-trees mirror. Nothing was edited except this file. Limit: I could not see Drive, OneDrive or the PC. Every scenario below is built from facts written in those files.

## THE SINGLE WORST PROBLEM

**Rule 5 ("match a job only by exact ID") makes a misfile certain wherever one ID points at two jobs, and the sweeps found that in at least six places.** The rule treats an exact TRK match as proof. It is not proof when the number is double-booked. The system exists to prevent exactly one failure, and this rule is the route to it. It is item 1 below.

## Ranked list (severity order)

### 1. Exact-ID matching files documents into the wrong job when an ID is contested (SEVERITY: CRITICAL)

**Where:** README Rule 5; Constitution Section F step 2.

**Failing scenario.** A new Bay Harbor unit 404 document arrives. The registry says TRK-2026-1582 is Bay Harbor. The intake agent finds "1582" in the registry, finds a folder whose name contains `TRK-2026-1582`, and sees a perfect exact match. But the live 1582 folder family is the Plaza (Bal Harbour), with `TRK-2026-1582-PZ305` style files and `TRK-1582-LC` letters dated 2026-09-16. The Bay Harbor document goes into the Plaza capsule. Jorge approves it in a batch of 40 and the client finds out months later.

The same hole exists for TUS-26-1021 (three places for Karla), TUS-26-1033 (Medley, two folders, "both resolve"), 1412 (Garden Walk folder, but live on a Bay Harbor job; master register says 1463), and 1292/1531 (two capsules, one title). Folio is also not unique: the Alec 1289 folder is a condo master folio shared by many units. Permit numbers are not unique either: job 20001 has two live case numbers in one folder (C2026061642 and C2026116502) plus case 20260245510.

**Replacement wording (Rule 5):**

> **5. An ID finds candidates. It never proves a job.** A match needs two independent agreements: the ID, plus the street address and unit in the document body. If an ID resolves to more than one folder, or is on the CONTESTED-IDS list, or the address disagrees with the registry, **do not file**: issue an OPH, write the conflict into the intake log, and stop. A folio shared by several units matches the building only, never a unit. A permit number matches only the job whose index lists it. The CONTESTED-IDS list starts with 1582, 1412, 1033, 1021, 1531/1292 and is kept in `00-START-HERE`.

### 2. README says it is "the whole filing law" and says new files are not RED, which contradicts CLAUDE.md (SEVERITY: CRITICAL)

**Where:** README Rule 6 ("Filing or moving an existing client document is RED... New files follow the intake rules") versus Constitution Section F ("Filing is RED, so approval is batched") and CLAUDE.md section 11 (filing is RED at any hour).

**Failing scenario.** A cloud window reads only README-FIRST, as the page itself instructs ("Read only this page"). It sees that only existing documents are RED. A freshly scanned county notice is "new", so it files the notice into a job folder with no approval. CLAUDE.md never mentions README-FIRST (I searched), so a session that loads only CLAUDE.md never finds the constitution at all. Nothing says which document wins when they disagree. The constitution is marked DRAFT and "applies from ratification", but the README states Rule 7 as live law, while CLAUDE.md still requires the beside-the-file `.bak` copy. Two sessions comply with opposite rules on the same day.

**Replacement wording:**

> **Precedence.** 1) Jorge's latest instruction. 2) `CLAUDE.md`. 3) Owner directives, including the 2026-08-11 subordinate-numbering directive. 4) This constitution. 5) `README-FIRST.md`, which is a summary and never overrides. Anything not yet ratified is marked DRAFT at the top of the page and binds no one.
> **Rule 6.** Filing, moving, renaming or replacing any client document is RED, whether new or old. "New" does not exempt it. The only autonomous act is writing a NEW file into `02-INTAKE`. `CLAUDE.md` must carry one line pointing to `00-START-HERE/README-FIRST.md` once ratified.

### 3. The grammar forbids the suffix forms that live files already use (SEVERITY: HIGH)

**Where:** Section E ("Forbidden: `.NNN` appended to a TRK") and the filename template with bare `TRK-2026-NNNN`.

**Failing scenario.** The real numbering in use is `TRK-2026-1582-PZ305.0002` (dash unit plus four-digit document number, Plaza), `1442.001` to `.029` (Bay Harbor unit 425, 20 distinct numbers, 54 or more filenames), `1531.002`, and `0708-JULIA`. The owner directive of 2026-08-11 adopted `.NNN` for subordinate documents, and TRK-REGISTRY section 3 says "do not remove it". CLAUDE.md forbids `.NNN` only for page identity (9.2). The constitution widens that ban. Phase 1's conformance report then flags every such file as non-conforming, and Phase 2 proposes renaming them. A rename to bare `1442` makes 20 distinct documents collide, and unit 425 loses its only identity. Section J even lists the suffix conflict as "known" but gives no ruling, so each agent will invent its own: `-U221`, `-221`, `-PZ305`. The suffix letters already mean three different things (unit, person `JULIA`, doc type `LC`).

**Replacement wording (Section E):**

> **Identity grammar:** `TRK-2026-NNNN` then optional `-SUFFIX` (unit or party, upper-case letters and digits, for example `-U221`), then optional `.NNNN` for a subordinate document. The dot means "document number in this job", never a page. Page identity stays `_ pNNN` at the end. Existing `.NNN` and dash forms are **conforming and must not be renamed**. A validator reads the base `TRK-2026-NNNN` first and treats the suffix as a child of it. The Forbidden list bans only `.NNN` used as a page number and the short form `TRK-26-`.

### 4. "Never delete" contradicts itself, cannot be satisfied, and Rule 7 does not fix the flood (SEVERITY: HIGH)

**Where:** README Rule 1 ("Only Jorge can approve a delete") versus Section C ("Nothing is ever deleted") and Section I Phase 4 ("Never deletes"); README Rule 7.

**Failing scenario A, contradiction.** Jorge approves deleting 231,487 conflict copies on the PC (the 45 GB reclaim). README says that is allowed, the constitution says it is impossible, and Phase 4 forbids the very executor. The guard in Section I exists for a job the constitution forbids.

**Failing scenario B, Rule 7 is a Tier 1 suppression on a logged recurrence.** The `.bak` files are written by a generated-file job (portal HTML and `_STAGE.md`), not by agents. A rule addressed to agents does not stop a script, so the script keeps writing beside the file. If it is redirected to `06-ARCHIVE/_BACKUPS/` with the same path, Drive search still indexes that folder, because the iPhone search is global, not per folder. About 25 copies per file per month, never deleted, grow without limit. The sweeps also show sidecars are half the flood: 28 `.SEARCH` plus 27 `.TAGS` against 52 `.bak` in job 20001. Section F now adds the TRK to the first line of every sidecar, so a TRK search returns each PDF twice. It also breaks Rule 2 ("copies are links, not copies") because a backup is a copy.

**Replacement wording:**

> **Rule 1.** No agent deletes or overwrites a client document, ever. Jorge may approve a delete of a named batch, which RAMBO executes with a rollback script. **Generated files are not client documents**: portal pages, `_STAGE.md`, and backups of them may be pruned by the generating script to the latest 7 copies.
> **Rule 7 (Tier 2).** The generating job must stop writing `.bak` into job folders. Use Drive version history, or write backups outside Drive. Sidecars are named `.SEARCH.txt` only (no `.TAGS.txt`), carry the TRK, and the nightly check fails if any job folder holds more than 7 `.bak-` files.

### 5. "Highest vN wins, else newest modified time" and "(2)/Copy are superseded" will bury the real document (SEVERITY: HIGH)

**Where:** Section H rules 1 and 2.

**Failing scenarios (all from the sweeps).**
- Bal Harbour unit 220 has a v4 application that is unsigned and unverified, while the signed original is the one that counts. "Highest vN is current" moves the executed original to `_Superseded`.
- Sugar Hill: proposal v6 is $38,000, but the draft invoice 2486 bills $23,890 on a superseded figure. "Newest modified" can pick the wrong one. A void invoice (INV-2026-03741) has no status slot.
- Alec Orange Tree: the Drive file is a 347-byte broken stub and three more are named `ZZ-BROKEN-partial-347bytes`. A stub can be the newest file and therefore "current". The real 31,889-byte file is in the repo.
- Job 20001: the OneDrive fold-in on 2026-09-04 recreated files, so modified times there say 09-04 for documents from 07-29.
- OneDrive conflict copies: the file marked `(2)` or carrying a computer-name suffix is often the one holding the later edit. Marking all of them SUPERSEDED inverts the truth at scale (the 231,487 names).

**Replacement wording (Section H):**

> 1. **Version order is by `vN`, never by modified time.** Modified time is a hint and may never decide alone.
> 2. **Status is separate from version:** DRAFT, SENT, EXECUTED, VOID. An EXECUTED or SENT document is never replaced by a later DRAFT. A file under 1 KB, or one that will not open, is INVALID and is never current.
> 3. A `(2)`, `- Copy` or conflict file is marked **REVIEW**, not SUPERSEDED, until its content is compared with the original. The report lists which is larger, which is newer and which differs.

### 6. "Untouched original" and "stamp every file in the body" cannot both be true (SEVERITY: HIGH)

**Where:** Section D (`01-INTAKE-ORIGINALS` "the untouched original"); Section E (body must carry TRK, hashtags and footer stamp); Section F step 1 (every PDF gets a text layer).

**Failing scenario.** A county PDF arrives. To obey Rule 4 the agent stamps the footer and OCRs it. That is a new file with a new SHA-256, so Section H rule 3 no longer sees it as the same document. The 20001 sweep already shows the result: six permit PDFs from 07-29 and five "TRUE-PDF 2026-08-22" re-saves in a different name style, about 28 files for 6 documents. The footer also says `CURRENT`. When a v2 arrives, the v1 stamp is false, and changing it edits a filed document. The tax-jacket parts are mostly images, so "TRK on the page" is impossible there.

**Replacement wording:**

> **Originals are never stamped or OCR-rewritten.** The stamp lives in the `.SEARCH.txt` sidecar, the index line and PDF metadata, never as a rewritten page. If a stamped copy is required for delivery, it is a **new version** `vN+1` with a `Type` of Report or Scan and a link to the original. The footer shows `TRK · vN · date` only. **CURRENT / SUPERSEDED is recorded in `00-INDEX.md`, not in the document body.**

### 7. The capsule skeleton and the hand-kept index fail at scale and recreate the "empty shell" defect (SEVERITY: HIGH)

**Where:** Section C ("No empty folders"; "folders created on first use"); Section D (ten mandatory subfolders plus one index line per document); Section G per-task read lists.

**Failing scenario.** Section D mandates ten subfolders for every job, but Section C forbids empty folders. A script cannot obey both. If it creates the skeleton, it reproduces Finding 5 of the sweep registry (Bay Harbor has eight empty subfolders in each of five shells, 20001 has empty permits, invoices, correspondence and reports folders). A hand-written "one line per document" index cannot stay true: Sugar Hill has 1,085 documents and Jobs-Master 4,149 PDFs. The 20001 `VERSION-LOG` already stopped on 2026-07-30 while the tax jacket was produced 09-03. The index is also what an AI "reads first and only", so a stale index gives a confident wrong answer.

Worse, "Job work reads L0 and that job's index only" plus a split identity means the agent on Karla opens the 1256 index and never sees that `KAR-26-GROVES` holds the six newest files. "Filing reads L0 and the intake index only" also means the filing agent may not read the registry or the job indexes it needs for Rule 5, so it cannot do its own job.

**Replacement wording:**

> **Folders are created on first use only. Section D is a menu, not a mandate.** `00-INDEX.md` has two parts: a human part (identity, parties, status, next action, aliases, where: lines) and a **generated part** (file list, counts and the "counted on" date), rebuilt by script, never hand edited. Every index carries **ALIASES** (every other number or folder name for this job). **A filing agent must read the TRK registry, the CONTESTED-IDS list, the target job's index and the OPH register. That is required, not a breach of the read list.** The index must exclude `.bak` and sidecars from its list.

### 8. Two trees, one home, and the path and count problems at about 250,000 files (SEVERITY: HIGH)

**Where:** Section C (Drive home of record, Jobs-Master "indexed not moved"); README Rule 2 ("one home per file"); Section I Phase 4 and 5 and the guard.

**Failing scenarios.**
- The 20001 permit package is SHA-proven identical in a Drive capsule and OneDrive Jobs-Master. Rule 2 says one home, but the constitution leaves one twin on OneDrive by design. Every agent must break a rule and nothing says which.
- The guard in Section I covers "reclaim scripts" only. A Phase 4 move manifest built with `$env:USERPROFILE`, or after Known Folder redirection toggles, resolves into the OneDrive twin (3,997 folders) instead of the duplicate tree (6,479). Moves, not deletions, can scramble the clean originals. The guard must cover every script that touches either tree.
- Paths: `06-ARCHIVE\_BACKUPS\` adds about 20 characters, `.bak-YYYYMMDD` adds 13, and `" _ "` delimiters cost 15 characters per name. With `TRK-2026-NNNN _ Address short _ Party\03-CLIENT\<party>\` in the path, long names pass the Windows 260-character limit under `G:`, and those files fail silently.
- Phase 5 demands a denominator "412 of 3,180", but every cloud sweep could only return paged lower bounds. A cloud window will write a lower bound as if it were a count.
- Drive shortcuts (Rule 2's "links") are not followed by Codex through `G:` and are not indexed by the iPhone search.

**Replacement wording:**

> **Two-tree guard.** Any script that reads or writes `CU Inspections\Jobs` or `Jobs-Master` must (a) use literal absolute paths, (b) print the top-level folder count of both trees and abort if they differ from the values in `TREE-COUNTS.md` (6,479 and 3,997 today), and (c) write a dry-run manifest first. **Identical files in two trees: the Drive copy is the home; the OneDrive copy is an INDEXED MIRROR and is marked so in the index. It is not a violation of Rule 2.** Counts from a cloud window must be labelled **"at least N (paged)"**. Only PC inventory may claim exact counts. Name length limit: 120 characters, path limit 220.

### 9. OPH rules disagree with each other, and the constitution breaks its own grammar (SEVERITY: MEDIUM-HIGH)

**Where:** Section F step 3 versus ORPHAN-NUMBERING rule 1 and 5; Section F ("nothing stays more than 7 days") versus "OPH never open past 30 days"; Section C versus the live OPH-2026-0007 folder.

**Failing scenarios.**
- ORPHAN-NUMBERING says **every** document entering a holding area gets an OPH immediately, with no judgement. The constitution says issue an OPH only if the job is uncertain. Two agents behave differently and the OPH register stops being complete.
- Intake may hold a file 7 days, but an unresolved OPH may sit 30. Day 8 to day 30 has no rule.
- ORPHAN rule 5 puts the OPH in the filename. The grammar has only a TRK slot, so an orphan cannot be named legally.
- OPH-2026-0007 is a folder **inside 01-JOBS** holding identified Bal Harbour documents (TRK-2026-1265), contradicting ORPHAN rule 3 ("nothing enters 01-JOBS without a TRK") and Section D ("folder name starts with a TRK"). It is also described as Bay Harbor Dr, a different building.
- The constitution has no TRK of its own ("ADHOC-FILING-CONSTITUTION"), although CLAUDE.md says everything gets a TRK and `TRK-TBD` is a defect. Its own files break Rule 4: `README-FIRST.md` and `00-INDEX.md` carry no date, TRK, type or version, and the live `AGENT-INDEX.md` stamp line does not match the template stamp (`TRK-...`). A validator written to Rule 4 flags the constitution itself. A fifth ID prefix (`ADHOC-`) is also introduced.

**Replacement wording:**

> **OPH is issued at the door for every item, as ORPHAN-NUMBERING says.** The intake agent then tries to resolve it under Rule 5. **Intake holds an item for 7 days; if it is unresolved, it becomes `OPH-open` and appears in the daily digest on day 8, not day 30.** An orphan file is named `YYYY-MM-DD _ OPH-2026-NNNN _ TYPE _ Description _ v1.ext`. Administrative files that are not jobs (index, README, template, portal, log) are exempt from the job grammar and keep fixed names listed in Section E. **Jorge assigns one TRK or one OPH to this project before ratification**; until then, every file of this project uses an `OPH-` number, never `ADHOC-`.

### 10. Undeclared amendments of CLAUDE.md, and privacy (SEVERITY: MEDIUM)

**Where:** Section B says only Rule 7 needs ratification. Other changes go unmentioned, and Section K lists neither Rule 7 nor these.

- CLAUDE.md requires `_VERSION-LOG.md` in every TRK folder; Section D drops it.
- CLAUDE.md lists "Cover Page, Contact Sheet, one per party"; Section D replaces them with `00-INDEX.md`.
- CLAUDE.md says OneDrive is the master filing cabinet for everything that is not an active job; Section C makes Drive the home of record for business, reference and archive.
- CLAUDE.md requires rollback scripts in `OneDrive\...\Undo_Manifests`; Phase 4 names no location.
- Section C places personal and legal matters in `_PRIVATE` on Drive, "not opened unless Jorge names the task". That is an honour rule. The Drive connector does full-text search across everything, and Gemini reads Drive natively. The four-trees report names a signed settlement (Piombo v Edison) and personal finance items. Moving them into an AI-searchable tree raises the risk.

**Replacement wording:**

> **Amendments to CLAUDE.md.** Section K lists each one, and none takes effect until Jorge says yes to that line: (1) Rule 7, (2) index replaces Cover Page and Contact Sheet, (3) the `_VERSION-LOG.md` duty moves into `00-INDEX.md`, (4) Drive is home of record for non-job material. **`_PRIVATE` is not placed in Drive.** It stays on the PC or OneDrive, outside every AI connector, until Jorge chooses otherwise.

## Other things an AI could misread (short list)

- "Never delete" also covers temporary and generated files, which would make every agent keep its scratch output forever. Fixed by item 4.
- "New file" is undefined: is a re-scan of an old document new? Is a file an agent generates new? Fixed by item 2.
- "Closed list" of folders, yet the README sends requests to `02-INTAKE/_REQUESTS`, which is on no list and has no watcher. A request written there is never read.
- "Address short" and "Party" in the folder name are free text, so a sixth folder-naming pattern appears within a month.
- TYPE is a closed list, yet real files use `TaxJacket`, `DD-BOOK` and `DD-Research-Partial`, none of which is in it. The list also has `Index` without any index file using the grammar.
- "Date: the document's own date" is ambiguous on an invoice (issue, due, paid). Two agents name one document differently.
- "Proceeding unless he objects" on the filename canon sits against RI-012's "Jorge's decision; do not write filing automation until resolved". Write it as a question.
- The daily batch approval ("N documents ready to file. YES / LATER") hides a single misfile among many. Approval fatigue turns RED into a rubber stamp. Suggest: only items with ID plus address agreement are batched; every exception is shown singly.
- The five-example trial cannot show collisions. Choose the five examples from contested IDs (1582, 1021, 1033, 1412, 1531).

## Closing

The constitution's direction is right (one index an AI reads first, a closed list, batch approval). The weakness is that it is written for a clean world, and the nine sweeps show a world where numbers collide, the same property has six names, and the working copy is on the other side of a wall.

**Yes or no: may I rewrite Sections C to H of the constitution with the ten replacements above, as a v2 draft for you to see before anything is ratified?**

*ADHOC-FILING-CRITIQUE · 2026-09-30 · CURRENT*
