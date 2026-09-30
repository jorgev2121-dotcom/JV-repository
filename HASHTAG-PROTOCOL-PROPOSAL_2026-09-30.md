# HASHTAG AND STAMP PROTOCOL — PROPOSAL

☁️ CODE · CLOUD / WEB EXECUTOR (subagent). Model: Sonnet 5.5, not Opus.
Date: 2026-09-30. Admin TRK: TRK-2026-9910-B (admin band, never a job).
Status: **PROPOSAL, not adopted.** Nothing here has been run on the PC or on Drive.

**Answer first: build ONE stamp function that writes the stamp and the tags, and stop anyone typing them by hand. Measure first with the read-only checker, which is already written and self-tested.**

Inputs read: `agent-results/2026-09-30-research/H1_HASHTAG-PROTOCOL-AUDIT.md`, `HASHTAG-COVERAGE-AUDIT_2026-08-26.md`, `ORPHAN-NUMBERING.md`, CLAUDE.md section 9 (9.1 filename grammar, 9.2 `pNNN`, 9.3 footer stamp), `RECURRING-ISSUES.md`.

---

## Section A — Why this is needed (root cause, short)

1. **No program writes the stamp and no program checks it.** The rules live in documents. The writers are scripts that never read documents. (H1, Section 3.)
2. In a 30-file Drive sample, **only 1 of 30 files had all seven fields.** Only 2 of 17 OCR sidecars carried a full TRK.
3. The same gap was logged as **RI-016** on 2026-08-15 ("OCR output is not attached to tracking numbers", fix written as Tier 2, never built). Six weeks later the number is about the same. OPEN-ITEMS still shows 9036 and 9060 as NOT_STARTED.
4. The 2026-08-26 coverage audit told agents to add 5 tags by hand. It was Tier 1. Nothing measured whether it worked.
5. **Rule 4 applies.** This is at least a second sighting (RI-016 on 2026-08-15, H1 on 2026-09-30). Patches are forbidden. Section G gives the three options.

Honest limit: H1's sample was not random and 17 of its 30 files came from one OCR batch. It shows a pattern. It is not a population count.

## Section B — What the protocol must contain

Every generated or filed text file carries these, **in the body, never only in the filename**:

1. **An identity:** exactly one `TRK-2026-NNNN` (optional suffix, such as `-JULIA`) **or** one `OPH-2026-NNNN`. Never `TRK-TBD`. Never the short form `TRK-26-NNNN`. Never a bare legacy number on its own (`TUS-26-1033` may be added as an alias tag).
2. **A version:** `v1`, `v2`, and so on. Highest is current.
3. **A date:** `YYYY-MM-DD`, the day this version was written.
4. **A state:** `CURRENT` or `SUPERSEDED`.
5. **A page id, only when the file is one page of a document:** `pNNN`, after the version (CLAUDE.md 9.2).
6. **Hashtags** for the things Jorge searches by:
   - the property address, and the remembered name if there is one (the Orange Tree lesson)
   - the folio
   - the client, and separately the owner of record (the owner name alone is not a safe key; `10960 SW 200th Avenue LLC` sits on three jobs)
   - other entities (contractor, lender, agency)
   - the job type
   - the jurisdiction
   - the ID itself as a tag, plus the two baseline tags

**Minimum by construction: 5 tags.** `#JorgeValdes`, `#CU-Inspections`, the ID as a tag, the address or remembered name, and the client or owner.

**Admin-band files (9xxx) are exempt** from address, folio and client. They carry the two baseline tags, the ID tag, and topic tags. The 9xxx band stays admin-only, never a job.

## Section C — The exact stamp line

One line. Fields separated by a space, a middle dot (`·`), and a space.

Plain:

```
TRK-2026-1262 · v2 · 2026-09-30 · CURRENT
```

Page:

```
TRK-2026-1247 · v3 · p047 · 2026-08-15 · CURRENT
```

Orphan (an extension of the charter's stamp, needs Jorge's yes):

```
OPH-2026-0042 · v1 · 2026-09-30 · CURRENT
```

Rules:

1. The order is fixed: ID, version, optional page, date, state.
2. The middle dot is the separator. A hyphen or a pipe is not a stamp. The checker counts it as missing.
3. **Where it goes:** at the top for OCR sidecars (so the first lines are the identity); in the footer, bottom-right, for documents and pages (CLAUDE.md 9.3). The checker accepts either place.
4. The hashtags go on the next line, labelled `TAGS:`. A sidecar also gets a `SOURCE:` line with the original path or email id.
5. The filename follows 9.1 (`DATE _ TRK _ TYPE _ DESCRIPTION _ VERSION`, page id last). No hashtag ever goes in a filename.

Specimen of a sidecar head:

```
OPH-2026-0042 · v1 · 2026-09-30 · CURRENT
SOURCE: Downloads\20001 Re-Work - test.pdf
TAGS: #JorgeValdes #CU-Inspections #OPH-2026-0042 #20001 #client-Name-Here
```

## Section D — The hashtag vocabulary rules

**Decision: keep the existing spellings and stop the drift. Do not switch everything to lowercase.**

One-line reason: the audit found the failure was four different *separators and digit groupings* (`#folio-30-6007-009-0030`, `#folio3060070090030`, `#10980-SW-202-Dr`, `#10980SW202Dr`), not upper versus lower case, so existing CamelCase tags (`#JorgeValdes`, `#CU-Inspections`, `#MDC`, `#Property-Address`) stay exactly as they are.

The rules:

1. **Hash sign, then letters, digits and single hyphens only.** No spaces, no underscores, no dots, no slashes.
2. **Words in a name are joined with a single hyphen, capitals kept as written.** `#Orange-Tree`, `#Alec-Valdes`, `#City-of-Miami`.
3. **Fixed prefix families for structured keys.** The prefix is lowercase, then a hyphen, then the value:
   - `#folio-` plus the 13 digits, no dashes: `#folio-3060070090030`. Unknown is `#folio-UNKNOWN`, never TBD.
   - `#permit-`, `#case-`, `#process-` plus the number as issued.
   - `#client-` and `#owner-` plus the name.
4. **Address:** number, direction, street, type, joined with hyphens. Direction in capitals, street type in Title case, as Jorge already writes it: `#1840-NW-63-St`, `#10980-SW-202-Dr`. A unit adds `-Unit-143`.
5. **Numeric property tags are allowed:** `#20001`, `#10980`. The checker counts a number only with 4 or more digits, so `#1` is not a tag.
6. **The ID as a tag:** `#TRK-2026-1262`. After an orphan is matched, `#OPH-2026-0042` stays in the body (ORPHAN-NUMBERING).
7. **Jurisdiction:** the short name Jorge already uses (`#MDC`) or the hyphenated full name. **Job type:** from the closed TYPE list in the Constitution, not free text.
8. **Legacy numbers** (`TUS-26-1033`) are allowed as alias tags. They are searchable, never the identity.

What is unproven: I assumed Drive, Gmail and Windows search ignore case. I did not test it. If any of them is case-sensitive, rule 2 needs a second look.

## Section E — The tiers of enforcement

CLAUDE.md defines three tiers (Rule 4). I added a measuring step, called Tier 0 here. **Tier 0 is my addition, not in the charter.**

0. **Tier 0 — Measure.** The read-only checker, `tools/stamps/Check-Stamps.ps1`. It changes nothing. It gives the denominator the 2026-08-26 audit never had.
1. **Tier 1 — Suppression (forbidden for this issue).** Tell every agent to add the tags. Lifespan: days. This is the 2026-08-26 audit again.
2. **Tier 2 — Removal.** **One stamp function writes the stamp and tags. Hand-typing is removed.** The function takes an ID, a state, a version, a date and tag values. It refuses `TRK-TBD` and `TRK-26-`. If the identity is not certain it writes `OPH-…`. Every generator calls it: the OCR script, the email sweep, the portal builder, and agents. Permanent for every file written through it.
3. **Tier 3 — Enforcement.** The checker runs on a schedule (nightly, and once on each new sidecar). It needs a **growth heartbeat**: it watches whether the report file grew, not whether the process exists (RI-015, RI-002, NIGHT-PROTOCOL). Three flat cycles means hung. A run with no report counts as a failed run.

**What the checker does not do yet.** It checks the shape only: id present, stamp present, at least one hashtag, drift, filename-only TRK. It does not check that the TRK is in the registry, that the folder agrees with the body (the misfile sensor), or that there are 5 tags. Those are the next checks. The registry is out of date (RI-013), so the registry check cannot be trusted until that is reconciled.

**RI-027 applies:** a presence check proves the stamp exists. It does not prove the stamp is correct.

## Section F — Migration plan, small steps

Each step ends with a denominator. Nothing moves until the step before it is verified.

1. **Step 1 (GREEN, tonight).** Desktop runs the self-test, then the checker over `G:\My Drive\01-JOBS`. Output is a new CSV. Result: a true baseline, such as "PASS 12 of 3,180".
2. **Step 2 (GREEN).** Count Queue A: PDFs in a folder whose name carries a **real, registered** TRK. How many already have a sidecar. How many sidecars lack a full stamp. Written to a new file. No count, no run (H1, Section 7).
3. **Step 3 (GREEN, a build).** Write the stamp function (TRK-2026-9036 and 9060 together). Test it on a scratch folder. It writes only files that did not exist before.
4. **Step 4 (GREEN).** **Queue A-1:** PDFs with a real TRK in the folder path and no sidecar. One new sidecar per PDF, starting with the stamp. ID from the path, state CONFIRMED. The checker runs on each sidecar the moment it is written. A fail is retried once, then quarantined. Reported as "N of M Queue A PDFs have a sidecar that passes."
5. **Step 5 (needs one yes from Jorge).** **Queue A-2:** re-stamp existing sidecars. This edits an existing file, so it needs a backup outside Drive and a rollback script in `Undo_Manifests`.
6. **Step 6 (prepare only, never file).** **Queue B stays held** under the RI-016 hold: `TRK-TBD` folders, legacy-numbered folders without an alias, contested numbers (see `CONTESTED-IDS.md`), `_CONVERGE-STAGING`, `_FROM-ARCHIVE`. Nights may only build `_JOB-KEYS.csv` and write `CANDIDATE` rows to a new file. The morning approves.
7. **Step 7 (Tier 3).** Point the OCR script, email sweep and portal builder at the function. Schedule the checker with its growth heartbeat.

**GREEN:** counting, read-only scans, the checker, building the function, writing any file that did not exist before.

**RED, at any hour:** filing, moving, renaming or deleting a client document; stamping or editing an original; editing registers (TRK registry, OPH register); anything outbound; deleting an orphan (Jorge decides, `DISCARD-PENDING`). **Filing is RED even though it is mundane.** `14598 SW 110 ST` was one digit-match from another client's folder.

## Section G — Three options, ranked by how long each survives

1. **Option 1 — Tier 2, removal of hand-typing (RECOMMENDED).** One stamp function. Free-typed tags go away.
   - Lifespan: permanent for every file written through it.
   - Failure mode: a new generator bypasses it, or the job card behind it is wrong. Hand-built LLM files are the only complete ones today, and they are also the ones that would bypass it.
   - Cost: a build. I have no measured estimate (H1 says about a night for the function; unverified).
2. **Option 2 — Tier 2, remove the component entirely: delete the hand-made tag layer** (`_TAGS.txt`, `_HASHTAGS.txt`, `.TAGS.txt`) and generate one tags index per job folder from the job card.
   - Lifespan: permanent, because the hand-made files are gone.
   - Failure mode: a page copied out of its folder loses its tags. That breaks the 2026-08-26 lesson and CLAUDE.md 9.3 (identity travels with the page). It also needs `_JOB-KEYS.csv`, which does not exist yet. I rank it second for that reason.
3. **Option 3 — Tier 3, the checker alone on a schedule.**
   - Lifespan: months, and only while it runs. RI-015 shows scheduled tasks die silently.
   - Failure mode: it reports symptoms and cannot invent identity.
   - Benefit: it can start tonight.

**Recommendation: Option 1, with Option 3 as its acceptance test.** One-line tradeoff: Option 1 needs a build, Option 3 alone starts tonight but only counts the damage. Proceed on this unless Jorge objects.

**Strongest objection to my own proposal:** a function only protects files written through it. Nothing yet forces a script or an LLM to call it. Unless the generators are actually switched over (Step 7), this becomes another rule in a document.

## Section H — What is unproven, and the baseline

1. **The checker has never run on Windows PowerShell 5.1 or on Drive.** It passed its own self-test (25 of 25) under PowerShell 7 on Linux.
2. **The stamp function does not exist.** `_JOB-KEYS.csv` does not exist.
3. **H1's counts come from a 30-file, non-random sample.** Read them as a pattern.
4. **Conflicts still open:** the OPH age limit (7 days in the Constitution versus 30 days in CLAUDE.md and ORPHAN-NUMBERING), and the register name (`OPH-REGISTER.md` in ORPHAN-NUMBERING versus `ORPHAN-REGISTER.md` in H1). Resolve before the checker tests OPH age.
5. **Recurrence line still owed.** RECURRING-ISSUES.md has no hashtag-specific entry; the gap is logged inside RI-016 and RI-020. H1 wrote suggested text for a new dated line. I did not edit RECURRING-ISSUES.md. Related entries: RI-012 (two filename conventions), RI-013 (registry out of date), RI-015 (silent scheduled failures), RI-025 (failure wearing a success costume), RI-027 (presence, not correctness), RI-032 (scripts need a BOM for 5.1), RI-047 (hand-typed delivery).

**Baseline (cloud repo files only, NOT Drive):** the checker was run on `agent-results/2026-09-30-research`, 9 text files.

```
SUMMARY: PASS 0 of 9 files read (id + stamp + hashtag, no drift, no filename-only TRK).
TRK-2026-NNNN in body: 7 of 9. Stamp line present: 0 of 9. At least one hashtag: 6 of 9.
```

Read it as a floor for one small folder of agent reports. It says nothing about Drive. The Drive baseline is Step 1.

TRK-2026-9910-B · v1 · 2026-09-30 · CURRENT · #hashtag-protocol #stamps

**Question: may the desktop run the self-test and then the read-only checker over 01-JOBS tonight (yes or no)?**
