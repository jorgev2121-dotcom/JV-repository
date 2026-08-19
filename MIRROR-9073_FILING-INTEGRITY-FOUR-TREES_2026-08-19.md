# Filing-integrity sweep — mirrored from the desktop (its push is broken)

**Cloud TRK-2026-9336 mirroring the desktop's overnight read-only sweep, 2026-08-19.**
This consolidates the desktop's four reports so the findings live in version control (Drive
is not versioned and the desktop cannot push). **Source files remain in `_CLAUDE-MAILBOX`:**
`ENUM-9073c` (161eWQpEp-Xkj_lgRuuxZEvJtT-7UpngY), `DEDUP-9073d` (1ryZ74zo1GCcN9FOFu3lXnHSg5YlokuvU),
`CAPSULES-9073e` (1meZsg9DhO9r0pvdBJf4XQWhjXAc2Prt5), `CAPSULES-9073f` (1kcH2yJzlEB30EfwylSzr_7zmvwC3-QPi).
Consolidated, not 4 verbatim copies — desktop, say if you need the raw files committed too.

## THE DANGER — read this first (a cleanup script could delete ~4,100 originals)
There are **two `CU Inspections` trees one path-segment apart:**
- `C:\Users\JV\Documents\CU Inspections\Jobs` — **6,479 folders, 235,719 PDFs, 46.8 GB** — the
  duplicate/conflict-copy tree (231,487 carry `(2)`/`- Copy`/UTC-stamp names). This is the 45 GB reclaim target.
- `C:\Users\JV\OneDrive\Documents\CU Inspections\Jobs-Master` — **3,997 folders, 4,149 PDFs, 14.6 GB**
  — **clean originals: ~4,100 field-inspection reports, one per address.** The largest body of
  original CU work on the machine. (Verified: a real directory, not a symlink/junction.)

**A dedup script written as `$env:USERPROFILE\Documents\CU Inspections\...`, or run after Windows
Known-Folder redirection toggles, resolves to the OneDrive twin and deletes ~4,100 originals while
reporting success.** MITIGATION (one line): any reclaim script must hard-code the literal absolute
path `C:\Users\JV\Documents\CU Inspections\Jobs` and **abort if the target holds < 6,000 top-level
folders** (the clean twin has 3,997, so that guard alone stops the wrong-tree run). **This guard
must be on the job before it is ever scheduled.**

## FOUR capsule filing trees exist, not two
| Tree | Path | Contents |
|---|---|---|
| A | `01-JOBS — ONE SOURCE OF TRUTH` | 39 folders (36 capsules + _ALEC-VALDES-DD, _CONVERGE-STAGING, _ORPHANS), 2,832 files, 870.8 MB |
| B | `G:\My Drive` root | 9 loose job capsules |
| C | `G:\My Drive\CU-Jobs` | TUS-26-1018, TUS-26-1021, `_SUPERSEDED_TUS-26-1022-USE-1033`, _GC-Registrations |
| D | `G:\My Drive\Job Capsules` | Sunset Cove Pool, 2362 NW 32 St, TEDC-CONSOLIDATION — **plus its own `CHARTER - Operating Rules for AI Assistants.gdoc`** = an abandoned parallel filing system with its own rules |

Not swept (large enough to be a 5th/6th tree): `MASTER CATALOG FOLDER` (503 files/406 MB), `MISE` (145/124 MB).

## Duplicate identities — a pattern, not accidents (every property checked has 2–5)
- **Groves at Sunset = FIVE identities:** TRK-2026-1256 (165 files, survivor) · KAR-26-GROVES (30) ·
  TUS-26-1021 root (9) · TUS-26-1021 in CU-Jobs (0, empty shell, same number) · "Sunset Cove Pool -
  Karla Morales" gdoc in tree D (name-match only, unproven).
- **14598 SW 110 St = THREE + a wrongly-minted fourth:** TUS-25-1023 (117 files, folio 30-5910-018-0210,
  survivor) · TUS-26-1041 root (5) · unnumbered `Permits\14598…C2023071746` (2) · **TRK-2026-1614 —
  minted on paper (TRK-REGISTRY line 57) because HOLDING-AREAS-INVENTORY twice claimed the property had
  "no tracking number at all." Both statements false — it had TUS-25-1023 since 2025.** Same error class
  as the fuzzy-match the sweep refused, mirror-imaged.
- **Medley 7265 NW 74 St = one number on two folders:** TUS-26-1033 appears as 123 files (tree A) AND
  22 files (tree B root) — **same tracking number, two folders, both resolve.** Most dangerous kind.
  Plus `_SUPERSEDED_TUS-26-1022-USE-1033` (tree C): **TUS-26-1022 was retired → 1033 but appears in
  ZERO repo .md — the only record it existed is a folder name.**
- **8621 Pasadena = three** (TUS-26-1018 213 files / RFQ-package 4 / CU-Jobs copy 3).
- **2362-2364 NW 32 St = two** (TRK-TBD 5 files / tree-D "2362 NW 32 St" gdoc).

## Unregistered capsules — 110 files in NO ledger, biggest is 148.9 MB
Root capsules with zero repo `.md` hits: `3180 Munroe Dr` (72 files/95.6 MB, 2019), `2037 NW 1 TER`
(10, 2019), `3811 NE 166 ST Unit 3 - Sean Wayne` (19, legalization), `TUS-26-1021` Groves-root,
`TUS-26-1029 - Recording Device DD` (5). Plus **`Garden walk builing 3 2019052465` — 128 files /
148.9 MB at Drive root, zero ledger hits** — TEDC work (its `02_GARDEN-WALK_consolidation.md` sits in
tree D's TEDC-CONSOLIDATION beside `01_SUGAR-HILL`), while TEDC's four registered capsules
(TRK-2026-1294–1297) hold 12 files total.

## Two of Jorge's questions answered by the sweep
- **The 10510 SW 153 CT orphan is real and already on disk** — `…\My PaperPort Documents\Business
  Cards\HOA application…10510 SW 153 CT Unit 1.pdf` (8.4 MB, OCR'd 2026-07-14). HOA = Courtesy Property
  Management, 13250 SW 135th Ave, 305-254-3888. Owner/folio/permit NOT extractable (handwritten form,
  OCR failed those fields). → **OPH-2026-0008** (written to ORPHAN-REGISTER.md this cycle).
- **The 20001 permit package is already filed twice, SHA-proven** (`71C63EFE…` identical in the Drive
  capsule and OneDrive Jobs-Master). **Do NOT file the 2026-06-03 draft** — it's a superseded draft;
  if wanted it goes in `_Superseded\`. Also: `REG-0163` (reconcile C2026061642 vs C2026116502) is not
  ambiguous — **both numbers are live on files in the same folder**: C2026061642 on the permit/BatchPrint,
  C2026116502 on the fee statement/receipt/EPS comments.

## "Business Cards" PaperPort folder = the real intake bin (0 business cards)
68 PDFs, 49 real business/client docs, 0 cards. HOLDING-AREAS-INVENTORY lists it as 30 files/12
job-docs — **undercounts files 56%, job-docs 75%**, and it's the source of the "~700+ docs / 6 areas"
headline, which is therefore low. SHA dedup: **only 6 of 68 are already filed; 62 are not** (upper
bound — hash-identity only). Contains open-item docs: 3 Einar/Pembroke Pines (REG-0094 — but 5 are
already in TUS-26-1018 byte-for-byte, so **withdraw that question**), 4 Bay Harbor, 4 well-permit
14598, 4 MZ worker's-comp. Plus a **signed legal settlement (Piombo v Edison Insurance)** and 7
personal-finance items — named only so a sweep routes them out of 01-JOBS (DIR-0047 discretion).

## What waits for JORGE (all RED — merges/retirements/number-issuance are owner-gated; NOT executed)
1. **Medley TUS-26-1033** — one number, two folders. Adjudicate which survives.
2. **Groves** — recommend TRK-2026-1256 survives; fold KAR-26-GROVES + root TUS-26-1021 in. (REG-0154/0155)
3. **14598** — retire TRK-2026-1614 as a duplicate; TUS-25-1023 survives (has folio + 117 files); fold in TUS-26-1041. (REG-0105/0154/0155, TRK-REGISTRY line 57)
4. **Register** the unregistered capsules (Munroe, 2037 NW 1 TER, Sean Wayne, Garden Walk, TUS-26-1029) — **pending Jorge's OD-02 answer: does the registry cover pre-2020 work, or start at a cut-off?**
5. **OD-03:** tree D's `CHARTER - Operating Rules for AI Assistants.gdoc` — is it a superseded copy of `ClaudeMemory\CHARTER.md`, or a divergent live ruleset something still writes under? If something still writes to tree D, registering C/D without stopping the writer just makes a fifth place. (I can read that gdoc from the cloud to settle it — flagged as my next step.)

## What I did / did NOT do
Mirrored the findings + wrote OPH-2026-0008 + recorded pending collisions in TRK-REGISTRY (as
DISCOVERED, not ratified). **Executed NO merges, NO renames, NO number retirements, NO deletions** —
all RED/owner. Recorded pending census corrections (HOLDING-AREAS-INVENTORY undercounts; strike 14598
from "no tracking number"). The desktop's sweep was read-only; so is this mirror.

*TRK-2026-9073 · TRK-2026-9086 · #filing-integrity #four-trees #dedup-guard #duplicate-identities #JOB-0079 #JorgeValdes #CU-Inspections*
