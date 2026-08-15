# TRK-REGISTRY.md — Reconstructed from Google Drive

**Built by a cloud session, 2026-08-15, by surveying Google Drive directly.**
No paste, no desktop session, no input from Jorge required.

**Status:** FIRST PASS. Covers what a title-search for `TRK-2026` returned. It is not
yet complete — see "Still to survey" at the bottom.

**Purpose:** the authoritative registry lives at
`C:\Users\JV\OneDrive\Documents\ClaudeMemory\Tracking-Registry.md`, which no cloud
session can read. This file is what Drive *actually contains*, so the two can be
compared. Where they disagree, Drive is the evidence and the registry is the claim.

---

## 1. Numbers observed in Drive

| TRK | What it is |
|---|---|
| TRK-2026-0707-QR | Claude thread — QR code / marketing letter |
| TRK-2026-0708-JULIA | Julia's Place Bond Release (Piwko) |
| TRK-2026-1256 | Groves at Sunset (Karla) |
| TRK-2026-1262 | 20001 SW 110 CT Unit 143 |
| TRK-2026-1265 | Bal Harbour Permit Status (MZ Solutions) |
| TRK-2026-1268 | 1500 Ocean Drive, Miami Beach — Roof Permit DD |
| TRK-2026-1280 | 14953 SW 34 ST |
| TRK-2026-1286 | 1997 SW 218 St — Alec Valdes, Avis Builders |
| TRK-2026-1289 | City of Miami folio 01-4102-098-0001 — Alec Valdes |
| TRK-2026-1292 | 7823 NW 5th Ave — Alec Valdes, Avis Builders |
| TRK-2026-1293 | MZ Solutions LLC — Company Credentials 2026 |
| TRK-2026-1294 | Edison Towers II — 661 NW 58 St (TEDC) |
| TRK-2026-1295 | Principio — 5401 NW 7 Ave, 142-unit workforce housing (TEDC) |
| TRK-2026-1296 | TEDC Tacolcy EDC — Company Credentials 2026 |
| TRK-2026-1297 | Tuscany Cove folio 01-3114-072-0010 — City of Miami Code Case 00009753 (TEDC) |
| TRK-2026-1310 | 10980 SW 202 Dr, Cutler Bay — Concrete Restoration (FOLIO-TBD) |
| TRK-2026-1436 | DOH Non-Compliance Response — Permit 13-60-01441 (#karla) |
| TRK-2026-1531 | 7823 NW 5 AV — City of Miami charges |
| TRK-2026-1534 | 1840 NW 63 ST — folio 30-3115-005-3770 |
| TRK-2026-1535 | 18020 SW 103 AVE — folio 30-5032-086-0020 |
| TRK-2026-1536 | 10362 SW 180 ST — folio 30-5032-000-1352 |
| TRK-2026-1588 | Rose Arbor — research packet |
| TRK-2026-1611 | Pembroke Pines Contractor Registration (MZ Solutions) |
| TRK-26-1042 | *(short form)* Cowork job — 15222 due diligence |
| TRK-26-1043 | *(short form)* Desktop consolidation |
| TRK-TBD ×2 | Two job-trees with no identity assigned |

**Observed range: 0707 → 1611.** The stated registry range of 1247–1367 covers **less
than a third** of what exists.

---

## 2. The +3 increment is not being followed

The protocol states `1247 → 1250 → 1253 → 1256`, incrementing by 3.

Drive contains **1293, 1294, 1295, 1296, 1297** — five consecutive numbers, +1 apart,
all created in the same batch on 2026-07-31.

Also +3-inconsistent: 1262 → 1265 → 1268 follows the rule, then 1280, 1286, 1289,
1292 do not, then the 1293–1297 run breaks it entirely.

**Consequence:** "next number = last + 3" will collide. Any new number must be checked
against this list, not calculated.

**Next safe number, on the evidence: `TRK-2026-1614`** (1611 + 3). Verify against the
OneDrive registry before issuing — there may be numbers this survey has not seen.

---

## 3. CORRECTION — `.NNN` subordinate numbering is already deployed

**On 2026-08-15 a cloud session advised Jorge that `.NNN` was not in use in Drive and
that migration cost would be near zero. That was wrong.** It was based on a 15-file
sample. A wider survey found:

```
TRK-2026-1531.002_City-of-Miami_2026-08-07_7823 NW 5 AV INV. 1326704_...pdf
```

There is also an **owner directive already adopted on 2026-08-11**:

```
OWNER-DIRECTIVE_SUBORDINATE-TRK-HASHTAG-01_2026-08-11.md
JOB-0076_ADOPT_SUBORDINATE-TRK-HASHTAG-01_2026-08-11.md
ACK_JOB-0076_ADOPT_SUBORDINATE-TRK-HASHTAG-01_2026-08-11_AUTO.md
```

**Important distinction, and it changes the earlier advice:** `.002` there is a
**subordinate document number within a job** — the second document filed under job
1531 — not a page number. Subordinate-document identity and page identity are two
different problems.

**Therefore:**
- The `.NNN` suffix stays for **subordinate documents**. It is adopted policy with an
  owner directive behind it, and it is in live files. Do not remove it.
- The `_ pNNN` standard in `CLAUDE.md` 9.2 applies to **pages inside a document**,
  which `.NNN` does not address.
- **The two must not be conflated.** `TRK-2026-1531.002` is a document.
  `... _ v1 _ p047` is a page within one.

**Action required:** read `OWNER-DIRECTIVE_SUBORDINATE-TRK-HASHTAG-01_2026-08-11.md`
before writing any more numbering rules. It is the governing directive and neither the
protocol Jorge dictated nor `CLAUDE.md` currently reflects it. Tracked as
TRK-2026-9031.

---

## 4. Five folder-naming patterns in active use

1. `TRK-2026-1262` — bare number
2. `TRK-2026-1611 - Pembroke Pines Contractor Registration (MZ Solutions)` — hyphen
3. `TRK-2026-1535 _ 30-5032-086-0020 _ 18020 SW 103 AVE` — spaced underscore, folio field
4. `20001 SW 110 CT Unit 143 (TRK-2026-1262)` — **address first, TRK in parentheses**
5. `14953 SW 34 ST (TRK-2026-1280)` — same as 4

**Pattern 4/5 is the dangerous one.** A folder whose name begins with an address does
not sort with the TRK folders and will be missed by any listing that assumes the name
starts with `TRK`. Two known jobs are filed this way.

This is in addition to the two *file*-naming conventions already logged as RI-012.

---

## 5. What is working well

Worth recording, because it is genuinely good practice and should not be "fixed":

- `.SEARCH.txt` and `.TAGS.txt` sidecars beside PDFs — makes scanned content findable
- `VERSION-LOG_TRK-2026-1262.md` — the version log exists and is in use
- `.bak-20260730` backup copies — the backup rule is being followed
- `_JOB-TREE_`, `_PORTAL_`, `_MANIFEST_`, `_CAPSULE-INDEX_` overlays — a real system
- Hashtags in filenames like `#karla` — though the protocol says body-only, so this
  is drift worth a decision rather than a defect

---

## 6. Still to survey

This pass searched titles for `TRK-2026` only. Not yet covered:

1. Full-text search — files that carry a TRK inside the document but not in the name
2. `TRK-26-` short form — a separate search; two found incidentally
3. Files with no TRK at all, which is the largest unknown
4. The OneDrive registry itself — requires a desktop session or Microsoft 365
   authorization (TRK-2026-9020)
