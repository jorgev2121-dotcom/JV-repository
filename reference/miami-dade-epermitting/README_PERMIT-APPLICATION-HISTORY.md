# Miami-Dade e-Permitting — Permit Application History screen

**Reference sample supplied by Jorge Valdes, 2026-09-21.**
**Sample image:** `SAMPLE_Permit-Application-History_C2026170181_2026-09-21.png`
**Source:** `miamidade.gov/Apps/R...` (e-Permitting). Page footer reads "last edited on February 23, 2004."

**Purpose, in Jorge's words:** this is the screen we snip to **rebuild the forensic history of permits
— what they were for, when they were issued, whether they were finaled.** One snip per process
number, assembled into a chronology for a property.

---

## Why this screen matters

It is queried by **Process Number**, and it is the county's own record of what the county thinks it
has. **When a reviewer says "does not match county records," this screen is the county record being
referred to.** Comparing it line by line against the paper application is the fastest way to find a
mismatch, and it is free.

Note the footer: this page has not been redesigned since 2004. It is a mainframe-era screen with a
fixed field layout, which is good news for automated reading — the fields sit in the same place
every time.

---

## Field dictionary, from the live sample

| Field | Sample value | What it tells you |
|---|---|---|
| **Process Number** | `C2026170181` | The "C number." The key to everything else. `C` + year + sequence. |
| **Application Date** | `09/18/2026` | When the county received it — not when it was signed. |
| **Address** | `10980 SW 202 DR` | County's address of record. Unit numbers may not appear here. |
| **Folio Number** | `30-6007-009-0030` | The parcel. The reliable join key across county systems. |
| **Owner's Name** | `10960 SW 200TH AVENUE LLC` | **Cross-check against the Property Appraiser.** A mismatch here is its own rejection. |
| **Units / Floors** | `16` / `2` | Building scale. |
| **Sq Ft** | `21177` | Should match the application. |
| **Permit Number** | `0` | **`0` means NO PERMIT HAS BEEN ISSUED.** This is the single most important status field on the screen. |
| **Legal** | `7 56 40 .57 AC M/L PB 78-85` | Section-township-range, acreage, plat book. |
| *(unlabelled, beside Legal)* | `CABANA CLUB GDNS APTS SEC 1` | Subdivision. |
| **Contractor** | `DRYRUN` | See the warning below — this is not a contractor name. |
| **Application Type** | `08` + `REPAIR` | Numeric code and its plain-language meaning. |
| **Permit Type** | `BLDG` | Building, versus electrical, plumbing, mechanical, LPGX. |
| **Proposed Use** | `5 UNITS OR MORE - RESIDENTIAL` | Occupancy classification. |
| **Categories** | `GENERAL (COUNTY)` | Jurisdiction — county versus a municipality. |
| *(status line)* | `INQUIRY SUCCESSFUL` | The record exists. Absence of this line means the query failed. |

---

## ⚠ `DRYRUN` in the Contractor field — read before drawing conclusions

On this sample the **Contractor** field reads **`DRYRUN`**, not "MZ Solutions LLC" and not
`CGC1528486`.

**Cloud's reading, offered for correction rather than as a finding:** a "dry run" in Miami-Dade
e-permitting is a pre-submittal plan review, where drawings are reviewed before a contractor is
formally attached and before a permit is issued. The literal string `DRYRUN` appears to be the
placeholder the system stores when no contractor is yet of record. **That is consistent with
`Permit Number: 0` on the same screen** — nothing has been issued.

**If that reading is right, it may be the real explanation for the reviewer's comment.** If the
county's record carries no contractor at all, then *any* contractor information on the paper
application "does not match county records," and the mismatch is structural rather than a typo.

**But it does not displace the other two candidates, and all three should be held open:**

1. **The Qualifier No. field** — the application shows `8486`, the tail of the licence number, where
   the county's own data dictionary defines a nine-digit numeric field. Jorge's reading is that it
   wants the qualifier's Social Security last-4.
2. **`DRYRUN`** — no contractor attached to the process at all.
3. **The unresolved May 2026 insurance hold** on Miguel Zaldivar at the Contractor Licensing
   Section. If that was never released, MZ Solutions may not be in good standing in the county
   registry — which would also read as "does not match county records."

**All three are settled by one call to the Contractor Licensing Section, 786-315-2880, quoting
process C2026170181.** Jorge knows what `DRYRUN` means in his own workflow and his answer governs
over cloud's inference here.

---

## What to capture when rebuilding a property's permit history

Snip this screen for **every** process number on the folio, then assemble:

- **What it was for** — Application Type plus its plain-language label, and Permit Type.
- **When it was applied for** — Application Date.
- **Whether it issued** — Permit Number. `0` means no.
- **Whether it was finaled** — *not on this screen.* Final inspection status lives elsewhere in the
  e-permitting system and must be captured separately. **Do not infer "finaled" from this page.**
- **Who did it** — Contractor, remembering `DRYRUN` means nobody yet.

**The gap worth naming:** this screen answers "what and when," and partly "was it issued." It does
**not** answer "was it finaled," which is the question that matters most for an open-permit search.
Locating the screen that does is the next thing to capture as a sample.

---

**Status:** reference sample and field dictionary only. Building an automated reader for this screen
is construction and stays parked under the Article 1 freeze — it is a natural component of
`TRK-2026-10061`. Recording what the fields mean is documentation of existing manual work and is
usable immediately.

#JorgeValdes #CU-Inspections #TRK-2026-1667 #TRK-2026-10061 #epermitting #reference-sample
