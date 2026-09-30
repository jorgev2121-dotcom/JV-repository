# FILING CONSTITUTION v1 — the one written rule set for files, folders, naming, OCR and AI access
**TRK: ADHOC-FILING-CONSTITUTION (no TRK issued: the 9xxx admin band is exhausted and registry edits are RED; Jorge to assign) · v1 · 2026-09-30 · #filing #constitution #naming #OCR #JorgeValdes #CU-Inspections #single-source-of-truth**

**Status: DRAFT FOR CRITIQUE.** It applies to NEW files from the day Jorge ratifies it. Nothing existing is moved, renamed or deleted by this document. Reorganizing what already exists is Section I, and it is RED until approved in batches.

---

## Section A — Why this exists, and what "hybrid" took from each side

Jorge's complaint, in his words: there were **no written rules**, so every new AI or agent filed or made folders as it pleased, and the work was done twice. The records agree. Four separate job-filing trees exist, two filename conventions collide (RI-012), and one property can have five identities.

Two rule-sets were already in use. This document is the hybrid.

**System 1 — `01-JOBS — ONE SOURCE OF TRUTH` (TRK system).** Strong: a tracking number is one job's identity; a fixed filename grammar; footer stamps; versions and `_Superseded`; GREEN/RED; orphan numbers for unknown jobs. Weak: rules lived in a charter on the PC that some windows never read; folder naming drifted into five patterns.

**System 2 — `Job Capsules` (the June 2026 Claude-chat system, with its own CHARTER gdoc).** Strong: **one capsule document per job that any AI reads first**; plain-language charter written for any AI; "hand the AI a capsule" instead of letting it roam. Weak: Claude-only writing, no tracking numbers, no version rule, and it became a parallel tree.

**Taken from System 1:** TRK identity, filename grammar, stamps, versions, `_Superseded`, GREEN/RED, OPH.
**Taken from System 2:** the capsule index that an AI reads first (here called `00-INDEX.md`), and the one-page charter for any AI (here `README-FIRST.md`).
**Dropped:** a second tree, Claude-only writing, address-first folder names, short-form `TRK-26-`, parentheses in names.

## Section B — The seven rules
See `README-FIRST.md`. They are repeated there on purpose so an AI can obey them without reading this whole document.

**Rule 7 needs Jorge's ratification because it amends his charter.** `CLAUDE.md` section 9 currently says "before editing an existing file, make a `.bak-YYYYMMDD` copy", and that copy lands beside the original. The sweeps of 2026-09-30 show the damage: for job 20001, 107 of about 156 Drive titles were `.bak` or sidecar files; about 45 of 85 "Karla" hits were nightly `.bak` copies; about 240 nightly copies bury the Bay Harbor results; about 60 bury the Alec DD results. **Proposed wording: "make the backup copy in `06-ARCHIVE/_BACKUPS/` under the same relative path."** Until ratified, the existing rule stands.

## Section C — The tree (a closed list; changing it needs Jorge's yes)

**The home of record is Google Drive (`G:\My Drive`).** Reason, in one line: every window can reach Drive (Claude through its connector, Gemini natively, Codex through the `G:` drive on the PC, Grok by pasted link) and his iPhone searches it. **Tradeoff:** bulk originals that are huge (for example the 14.6 GB `Jobs-Master` on OneDrive) stay where they are and are **indexed, not moved**.

- **00-START-HERE** — this document, `README-FIRST.md`, the templates, the tree view link, `APPROVALS-NOW.md` pointer. Read by everyone, always small.
- **01-JOBS** — active jobs. **The canonical folder is the existing `01-JOBS — ONE SOURCE OF TRUTH` (Drive id `1U4hnBp5Tt0qb1sxvO6dd3csBCWjhdQJt`).** A duplicate `01-JOBS` folder was created 2026-08-23 and must be merged into it later (RED).
- **02-INTAKE** — the in-tray. Everything new lands here first (Section F). Nothing stays more than 7 days.
- **03-BUSINESS** — things that are not a job: Team USA Sales, Inc. corporate, insurance, licenses, tax, banking records, contracts with vendors. Personal and legal matters are walled off in a sub-area named `_PRIVATE` that AI windows do not open unless Jorge names the task.
- **04-AI-SYSTEM** — every AI-built program, its catalog, proof screens, the mailbox, and AI memory. Sub-compartments in Section G.
- **05-REFERENCE** — codes, zoning, county forms, templates, contacts. Read-only for AIs.
- **06-ARCHIVE** — inactive jobs and superseded material. **Nothing is ever deleted; it is moved here.**

**Reality check, stated plainly.** Drive is not yet the single place of truth for every job. The working capsule for Sugar Hill (about 247 files, 908 MB) and the clean originals (`Jobs-Master`, 4,149 PDFs, 14.6 GB) live on OneDrive, where the cloud windows and the iPhone's Drive search cannot see them. **Until Phase 4 copies them, each `00-INDEX.md` carries a `where:` line for anything that lives only on the PC or OneDrive, so a search still finds the pointer.**

**Grandfathered locations — registered, NOT moved, because running scripts depend on the exact path.** `VTES-Inbox` (id `1hI2TmVn86Cnh7h_6s93TG0KE1QzVCV5F`), `VTES-Outbox` (id `1NDadXJz9eKpRbmYrE-CRH2RtKbynQClN`), `MY-DESK` (holds the canonical `APPROVALS-QUEUE.json`), `AI-Programs-Catalog` (id `1z2tEC1HS15tmhueTNedZ_vXS1stJ2Iu_`), `_CLAUDE-MAILBOX`. They appear inside `04-AI-SYSTEM` as links and in the index, never as copies.

**Folders are created on first use, by one approved script, never by hand.** No empty folders.

## Section D — The job capsule skeleton (every folder under 01-JOBS)

Folder name: `TRK-2026-NNNN _ Address short _ Party`. **The TRK comes first so it sorts.** No address-first names, no parentheses, no `TRK-TBD`.

- `00-INDEX.md` — what an AI reads first: identity, parties, status, next action, one line per document. **Replaces the old Cover Page and Contact Sheet** (both become sections of this file).
- `01-INTAKE-ORIGINALS` — the untouched original as received.
- `02-GOVERNMENT` — county, city, permit, code, notices.
- `03-CLIENT` — one subfolder per party; client-facing material.
- `04-WORKING-PAPERS` — scrapes, screenshots, data snips, notes. **Every conclusion must trace back to a file here.**
- `05-REPORTS-DELIVERED` — what was sent, with the date and to whom.
- `06-FINANCIAL` — invoices, payments, proposals.
- `07-TAX-JACKET` — kept as it is today.
- `08-CORRESPONDENCE` — emails and letters, including circled emails.
- `_Superseded` — older versions. Never deleted.

## Section E — Naming

**Canonical file name (RI-012 resolved; the Drive form wins because it is what the library already contains and it sorts by date):**

`YYYY-MM-DD _ TRK-2026-NNNN _ TYPE _ Description _ vN.ext`

- **TYPE is a closed list:** Permit, Report, WorkingPaper, Invoice, Contract, Correspondence, Photo, Scan, Form, Notice, Receipt, Plan, Survey, Title, Note, Index. A new type needs an amendment here.
- **Version is a bare `vN`.** No free text. "CORRECTED" becomes the next number.
- **Page identity** goes last: `... _ v2 _ p047.pdf`.
- **A date always starts the name.** Use the document's own date when it has one, otherwise the filing date.
- **The body must also carry** the TRK, hashtags and the footer stamp `TRK-2026-NNNN · vN · YYYY-MM-DD · CURRENT`. A name alone is not an identity.
- **Hashtags** go in the body or metadata, never the filename.
- **Forbidden:** `.NNN` appended to a TRK, `TRK-26-` short form, parentheses around a TRK, `Copy`, `(2)`, `FINAL`, `final2`, spaces-only names with no delimiter.

## Section F — Intake, OCR and "email circles" (what happens to everything new)

**Four doors into `02-INTAKE`, each a sub-folder that an intake agent watches:** `SCANS` (PaperPort and scanner), `EMAIL-CIRCLES`, `DOWNLOADS` (browser and county sites), `IPHONE` (photos and shares).

For each item the intake agent must, in order:
1. **OCR it** so the text is searchable. Every PDF gets a text layer, **and a `.SEARCH.txt` sidecar whose FIRST line is the stamp** `TRK | hashtags | address | folio | doc type | date`, then the text. (Audit finding: only about 6 of 54 sidecars carried a TRK, about 11%. That is the bug this rule fixes.)
2. **Identify the job by exact ID** (TRK, folio, permit number, address plus unit as a last resort that still needs confirmation). Fuzzy matching is for searching only.
3. **Name it by Section E** and file it into the capsule folder by Section D. **If the job is not certain, issue an `OPH-2026-NNNN`, leave it in intake, and list it in the daily digest.** An OPH resolves to a TRK, `NON-JOB`, `DUPLICATE` or `DISCARD-PENDING`, and is never left open past 30 days.
4. **Log it** (who, when, from where, to where, undo path) in the capsule's `00-INDEX.md` and the intake log.

**Filing is RED, so approval is batched, not per file.** The approval banner shows once a day: "N documents are ready to file. YES / LATER." One click files the batch, with a rollback script. First two weeks: Jorge sees five examples before the first batch.

**Email circles.** My understanding, unverified: Jorge circles or marks an email (or part of one) to say "this belongs to a job and must be kept." It lands in `02-INTAKE/EMAIL-CIRCLES` with the message id, is saved as a PDF plus sidecar, matched by exact ID, and filed to the job's `08-CORRESPONDENCE`. **The repository has no written circling protocol, only a mention in a skill.** RAMBO must find the existing protocol on the PC and reconcile it with this paragraph before anything is automated.

## Section G — AI compartments: read only what pertains

**Four levels. An AI stops at the first level that answers its question.**
- **L0 — `README-FIRST.md`.** One page. Everyone reads it.
- **L1 — a compartment's `AGENT-INDEX.md`.** Says what is inside, who needs it, and **when not to read it.**
- **L2 — a job's `00-INDEX.md` or a program's catalog line.**
- **L3 — the documents themselves.** Opened only when an index points at them.

**`04-AI-SYSTEM` compartments:**
- `A-ACTIVE` — programs in use today. One catalog line each (the existing `CATALOG.md` format), a TRK, and where they live on the PC.
- `B-INACTIVE` — working but switched off, kept for reuse.
- `C-EARLIER-VERSIONS` — older builds, named `_vN`, never deleted.
- `D-PROOF-SCREENS` — the screenshots proving a program ran.
- `MAILBOX` — pointers to VTES-Inbox and VTES-Outbox.
- `MEMORY` — what agents must remember: open items, recurring issues, registries.

**Program states are exactly three:** ACTIVE, INACTIVE, EARLIER-VERSION. A program is ACTIVE only with proof it ran in the last 30 days. **Programs physically live on the PC (`C:\AI`, `OneDrive\Scripts`, Desktop); Drive holds the catalog and copies of the source so every LLM can read them.**

**Per-task read lists.** Job work reads L0 and that job's `00-INDEX.md` only. Filing reads L0 and `02-INTAKE/AGENT-INDEX.md`. Program work reads `04-AI-SYSTEM/AGENT-INDEX.md` and one catalog line. Approvals read `APPROVALS-NOW.md`. **An AI that opens a compartment its task does not name is breaking this rule.**

## Section H — Versions by timestamp (nothing is deleted)

1. The current version is the highest `vN`. With no `vN`, the newest modified time wins.
2. Older versions, `(2)` and `- Copy` files are **marked SUPERSEDED in the index first**. They move to `_Superseded` only after approval. They are never deleted.
3. Files with identical content (same SHA-256) are listed together and counted as one.
4. **One identity per property.** If a property has several numbers, the index names the one survivor and lists the others as aliases. Merging identities is RED (Jorge decides).

## Section I — Reorganizing what already exists (phased, most recent first)

- **Phase 0 — Inventory (read-only, nightly).** TreeSize for size and duplicates; `VTES-Inventory.ps1` for names, TRK presence, OCR sidecars and conformance. Output feeds the tree view on the control panel.
- **Phase 1 — Conformance report.** Per folder: how many files follow the grammar, how many have a TRK, sidecars present, duplicates.
- **Phase 2 — Proposed-moves manifest.** A file listing `from → to`. **Nothing is executed.**
- **Phase 3 — Jorge approves in batches** through the banner: YES, NO or LATER per batch.
- **Phase 4 — RAMBO executes** a batch with a rollback script and a log. Never deletes.
- **Phase 5 — Verify by recount** with a denominator ("412 of 3,180"), never "good progress."
- **Order:** the proof of concept is the most recent active jobs: the five Alec Valdes DD reports, the Bal Harbour and Bay Harbor units, TEDC Garden Walk and Sugar Hill, the Karla jobs, 20001 and 13980. **The Alec DD delivery is also a cash item, so it goes first.**

**Guard that must exist before any reclaim script runs:** hard-coded literal absolute paths, and abort if the target folder count is wrong (the wrong-tree run that would have deleted about 4,100 originals, from the filing-integrity sweep).

## Section J — Critique and conflict analysis

A critique packet goes to every LLM (launcher: "Hand work to another window"). Each one is asked to find conflicts and bugs in Sections A to I, and to name the single worst one. Known conflicts to seed it:
- RI-012: two filename grammars; five folder-name patterns; four filing trees.
- Same TRK on two folders (Medley TUS-26-1033; also 1292 and 1531 double-filed; two capsule folders titled TRK-2026-1536).
- **TRK-2026-1582 is double-booked:** the registry says Bay Harbor, the live files use it for Plaza. So "all Bay Harbor units share 1582" would make the collision permanent.
- **Numbers used in filenames but absent from the registry:** 1442 (Bay Harbor unit 425), 1451 (unit 221), 1414 (Sugar Hill), 1412 (Garden Walk, but live on an unrelated Bay Harbor job; the master register says 1463).
- **Suffix conflict:** `CLAUDE.md` allows a dash suffix (`TRK-2026-0708-JULIA`) and forbids `.NNN` on page IDs, yet `TRK-REGISTRY.md` section 3 and the AI catalog (`2026-1639.001`) already use `.NNN` for subordinate numbers.
- `TRK-TBD` folders, and unit folders that are empty shells while the real files sit in `_FROM-ARCHIVE`.
- `OPH-2026-0007` is described as Bay Harbor Dr, a different building from the Bal Harbour units it was issued for.
- Short-form `TRK-26-`, duplicate `01-JOBS`, sidecars without a TRK, and a retired number that exists only as a folder name (TUS-26-1022).
- Hashtags live in filenames but Drive search reads the body, so `#Karla` finds almost nothing.

## Section K — What needs Jorge (one line each)

1. **Yes to the Drive form as the canonical filename** (it was already RI-012's recommendation). Proceeding unless he objects.
2. **A real TRK** for this project (registry edit is RED).
3. **Ratify the tree in Section C.** Nothing above is created in Drive except `00-START-HERE` and `04-AI-SYSTEM` until he does.

*TRK ADHOC-FILING-CONSTITUTION · v1 · 2026-09-30 · DRAFT FOR CRITIQUE · Does anything in Sections C to G look wrong to you, yes or no?*
