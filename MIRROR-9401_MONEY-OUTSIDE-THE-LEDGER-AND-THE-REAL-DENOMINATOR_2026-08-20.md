# Mirror — desktop's overnight 9401 + 9038 reports (its push is broken)

**Cloud TRK-2026-9336 mirroring the desktop's 2026-08-19 evening cycles into version control.**
Consolidated, not verbatim. **Source files remain in `_CLAUDE-MAILBOX`:**
`COUNTS-9038` (1qzbGj2zrU5PO65pzJJlIQlaz6bvqG0Xd), `TEAM-9401` (1SjAFCN7QCmCpe8P5LBfzxkD4DpAY2-tB),
`REGISTRY-9401b` (1V1lold-QLMJERuap6tZ1iqh8EEYnFYBX — already mirrored in TRK-REGISTRY.md line 371),
`RESOLVE-9401c` (1ldj2HKOlNk3IQBU-VO0z-3do4TyM3t1N), `RECHECK-9401d` (1iGqYu4NJcT7neSMm5fcEIKT_5l0av3OW).
Desktop: say if you need any raw file committed too.

## 0. I withdrew my own escalation — desktop caught it, same as it caught the 1283 error
Last cycle I escalated 13920 SW 34 St to Jorge as a **misfiling risk** (row names *Medina-Rodriguez*,
folder names *Cesar Garcia - David - Guirola*). **`RESOLVE-9401c` proves that was overstated and I
withdraw it.** The names are different *roles*, not a mix-up:
- **Guirola** = `Guirola & Associates PA`, the architect/engineer firm — appears as its own subfolder
  on the unrelated 10783 SW 6 St job.
- **Cesar Garcia / David** = the referring contacts (also on 10783).
- **Medina-Rodriguez** = the owner of record, which is what the registry indexes.

A folder named for the referrer and a registry row named for the owner **is not a misfile.** No merge,
rename or move is warranted. Also `TRK-2026-1567` **does** exist in the master registry (L203) — the
repo file was simply short again. **This is the second time I over-called on "no hits in the short repo
file." Same lesson as the 1283 error: the repo `TRK-REGISTRY.md` is an incomplete mirror; its silence
is not evidence.**

## 1. THE MONEY IS OUTSIDE THE LEDGER — two invoiced jobs in six hours
This is the load-bearing finding of the night.

- **13920 SW 34 St (`RESOLVE-9401c`):** the registered capsule `JOB-0030-C` is a healthy *county-research*
  capsule (folio-matched, 8 case files, crosswalk) that holds **zero PDFs**. The **114 working PDFs** —
  incl. `_Invoice 6039`, a **$926.84 paid county fee**, change-of-contractor, lien-book notes — live in a
  Dropbox folder outside every capsule and ledger. Complementary, not duplicate. **Anyone opening
  JOB-0030-C to answer its own open question (was permit 2018007118 finaled) is reading half a job.**
- **20723 SW 119 PL (`RECHECK-9401d`):** a worked job with **no tracking number at all**, spread across
  five locations — `Invoice_6066_from_Team_USA_Sales_Inc.pdf`, site plans, CU reports, a certificate.
  8 of its 10 C: PDFs are conflict copies; `Jobs-Master` holds the clean original (Jobs-Master ≠ junk).

**Two invoices, two jobs, same overlooked Dropbox tree (`Transfer 07082025 gks`), neither in any ledger.**
Desktop's words: *"This is no longer an anecdote — it is where the money is."* A supervised pass through
that Dropbox area is the highest-value cleanup on the board. **All owner-gated — nothing moved.**

## 2. VOID TRK-2026-1614 — now THREE independent confirmations
`TEAM-9401` verified 1614-1629 against the **master** registry. All six numbers are free, but as an
*address* 1614 fails: **14598 SW 110 ST already carries `TRK-2026-1283` (master reference) + `TRK-2026-1424`
(electrical) since 2026-07-03.** Issuing 1614 gives one property its third number, duplicating the
registry's own designated master example. **"~7 documents waiting" was wrong 10×** — the two 14598 folders
hold **70 PDFs**. Recommendation (owner-gated): **VOID 1614, file under 1283, keep 1424 as the electrical
sub-number.** The other five 9063 addresses (11385 NW 12 AVE, 2262 SW 2 ST, 9907 NW 9 Cir, 1185 SW 183 ST,
20723 SW 119 PL) are genuinely unregistered, few docs each — filing under them is no longer blocked on the
registry check (still owner-gated to actually file). Closes TRK-2026-9067.

## 3. 95.6% of the TEAM-* product line carries no tracking number
`TEAM-9401` characterised **4,192 business PDFs** across 169 folders. Only 3 folders (184 PDFs) carry a
number the master registry knows. **This is the third instrument to land at ~4-5% numbered** (version-log
gap 5%, Registrar 4%, this 4.4%). Biggest unregistered sets:
- **`XYZ - Habitat for Humanity` = 1,635 PDFs** — the single largest unregistered document set on the
  machine, with an **approved permit** (2023-018833, cookie-cutter duplex programme). No registry row.
- **`__ BAL HARBOUR PROJECT` = 681 PDFs** — and the job was declared COMPLETE.

Registration is owner-gated and blocks on **OD-02** (does the registry cover pre-2020 work, or start at a
cut-off?).

## 4. THE DENOMINATOR — the OCR job is ~5,700 documents, not 241,000 (`COUNTS-9038`)
`TRK-2026-9038` finally has its number. Raw total across five roots: **241,427 PDFs, 0.4% OCR'd** — but
**do not quote 0.4%.** 97.6% of that (235,719 PDFs) is **one duplicate tree** (`Documents\CU Inspections\Jobs`),
96.3% of which carry conflict-copy / `(n)` / `- Copy` markers. Excluding it:

**Real scope = 5,708 PDFs, 908 sidecars, 15.9% already OCR'd.** Two roots effectively finished
(`CU-FILING-SYSTEM` 97%, PaperPort 91%); remaining work concentrated in `OneDrive\Documents\CU Inspections`
(4,156 PDFs). **Trap named:** 233,445 of the 235,719 filenames are *distinct strings* (a conflict copy
embeds a date + machine name), so **filename-distinctness is not a dedup measure** — anything using it
concludes the tree is 99% unique. Does **not** unblock bulk OCR (RI-016 attribution defect is untouched).

## 5. Dropbox is the biggest holding area — but the lapse panic was mostly wrong (`COUNTS-9038`)
Dropbox counted for the first time: **277,434 files / 45,664 PDFs / 606.76 GB / 202 top folders** — eight
times more PDFs than every other holding area combined outside the duplicate tree. **Downgrade `TRK-2026-9100`
from URGENT:** 99.8% (276,913) are local bytes on disk; only **521 files (0.2%) are online-only stubs.** A
lapse stops *sync*, not *possession* — the exposure is 521 files, not 277,434. 90% is personal
(`Personal-Archive` 105,346, `Camera Uploads` 72,087, `Transfer 07082025 gks` 71,938). **Honest limit:** the
45,664 PDFs are not yet broken down by folder, so how many are job documents is still unknown. **Decoy:**
`C:\Dropbox` is empty (0 files); the real path is `C:\Users\JV\Dropbox`.

## 6. Drive-letter facts, so a future survey isn't believed wrongly (`COUNTS-9038`)
- **B:** 3.6 TB used = `WindowsImageBackup` + `DESKTOP-OTB90LR` — machine-image backup, not a document area.
  But **`DESKTOP-OTB90LR` is a backup of a machine that is not this one, owner unestablished** (open Q).
- **E:** genuinely empty (one stray PDF + Dropbox markers) — close 9075's E: half.
- **A: and C: report identical size/free** — A: is almost certainly a second mount of the system volume.
  **Any recursive survey walking both double-counts all of C:.** Flagged before a future count is believed.

## What waits for JORGE (all RED / owner-gated — NOTHING executed)
1. **Void TRK-2026-1614**, file 14598 under 1283 (+ 1424 electrical). Triple-confirmed.
2. **The two invoiced jobs** (13920 Invoice 6039, 20723 Invoice 6066) — a supervised Dropbox pass to pull
   the money file into its capsule. These are dollars, not bookkeeping.
3. **OD-02** — does registration cover pre-2020 work? Blocks numbering Habitat (1,635), Bal Harbour (681),
   and the rest of the 95.6%.
4. **Which registry is canonical** (OD-11) — master `Tracking-Registry.md` vs repo mirror. I recommend the
   master; desktop still needs to publish it into Drive so cloud can read it.

## What I did / did NOT do this cycle
Withdrew my 13920 escalation, mirrored the four reports, logged every finding to `OPEN-ITEMS.md`, corrected
the morning report. **Executed NO merges, NO renames, NO number voids, NO filing, NO deletions** — all
RED/owner. The desktop's cycles were read-only; so is this mirror.

*TRK-2026-9038 · TRK-2026-9067 · TRK-2026-9100 · TRK-2026-9401 · #money-outside-ledger #denominator
#dropbox #void-1614 #JOB-0030 #20723-SW-119 #JorgeValdes #CU-Inspections*
