# VERSION-LOG-GAP-MAP.md — TRK-2026-9103

**Counted by a cloud session overnight 2026-08-16 by enumerating Google Drive
directly. Read-only. Nothing filed, moved or renamed.**

The charter requires a version log in every job folder:

> *`_VERSION-LOG.md` in every TRK folder: Version · Date · What Changed · Status.*

---

## ⚠ CORRECTION 2026-08-16 — THE DENOMINATOR BELOW IS WRONG. It is 34, not 19.

**Found by a later cloud session running a full-text search for the short form
`TRK-26-` instead of a title search for `TRK-2026-`.**

`01-JOBS\_INDEX.html`, generated 2026-08-14 10:14 PM Miami by the desktop, states its
own count in the header:

```
G:\My Drive\01-JOBS        34 folders · 4 files
```

**This file counted 19 because it searched folder titles for `TRK-2026-`. Roughly
fifteen folders in the jobs root do not match that string and were therefore invisible
to it.** Among them:

| Folder | Files | Why it was missed |
|---|---|---|
| `TRK-26-1042 _ FOLIO-TBD _ 15222 SW 108 Pl (Daymara Yhanes)` | 9+ | **short form** `TRK-26-` |
| `1514 NW 73 St - House Project` | **104** | **no tracking number at all** |
| `TRK-2026-1256 - Groves at Sunset (Karla)` | 159 | *(was counted)* |
| `KAR-26-GROVES _ FOLIO-TBD _ 8850 SW 72 St Groves at Sunset Pool` | 23 | **a fourth numbering scheme** |
| `JOB-4225 _ Rose Arbor _ 4225 Rose Arbor Cir` | 12 | `JOB-` prefix, not `TRK` |
| `_CONVERGE-STAGING` | 44 | staging area |
| `_ORPHANS` | 7 | orphan holding |

**The most important line in that table is the second one. `1514 NW 73 St - House
Project` holds 104 files and has no tracking number.** It is the largest untracked
folder found so far.

### Two things this proves at once

1. **The `TRK-26-` / `TRK-2026-` drift is not theoretical.** `CLAUDE.md` §9 says
   *"a search for `TRK-2026-NNNN` cannot find it. Normalise on sight."* **It just cost
   this repository a wrong denominator in a file whose entire purpose was to count.**
2. **`TRK-26-1042` is a full client job, not a stray number.** Nine-plus documents —
   due-diligence report, violations-and-liens research, a violations log built from a
   client photo, an actions file, a Cowork scrape job — **and a `TRK-26-1042_LOG.md`,
   which may well be a second version log.**

**So the headline figure below is unsafe in both directions and should be read as
"1 of at least 20 TRK-numbered folders, out of 34 folders total."** The gap is wider
than five percent, not narrower.

## ✅ RECOUNT COMPLETED 2026-08-16, later the same night

**I said above that a recount "was not run tonight" because it was a night's work. It
is night, the work is read-only, and difficulty is not a reason to defer. Run.**

**Every folder in `G:\My Drive\01-JOBS` enumerated directly: 38 folders.**
*(The index says 34 as of 2026-08-14; four were created on 8/16, after it was
generated.)*

### The 38, by identity scheme

| Scheme | Count | Notes |
|---|---|---|
| **`TRK-2026-NNNN`** — canonical | **19** | the number my original count found, and it was right *for canonical folders* |
| **`TRK-TBD`** — the defect marker | **8** | see below |
| **`TUS-25-` / `TUS-26-`** | 3 | 8621 Pasadena Blvd · **14598 SW 110 St** · 7265 NW 74 St Medley |
| **`TRK-26-`** — short form | 1 | 15222 SW 108 Pl (Daymara Yhanes) |
| **`KAR-26-`** | 1 | 8850 SW 72 St, Groves at Sunset Pool |
| **`JOB-`** | 1 | 4225 Rose Arbor Cir, Port Charlotte |
| **`OPH-2026-`** — correct per the orphan standard | 1 | Bal Harbour + Plaza |
| **No identity at all** | 1 | **`1514 NW 73 St - House Project`** |
| Admin / staging | 3 | `_CONVERGE-STAGING` · `_ORPHANS` · `_ALEC-VALDES-DD` |

**Eight distinct identity schemes coexist in one folder.**

**19 of 35 job folders carry a canonical tracking number. Fifty-four percent.**

### ⚠ EIGHT folders are named `TRK-TBD`

`CLAUDE.md` §9 is unambiguous: **"`TRK-TBD` is a defect. Assign a real number."**

All eight were created **2026-08-10, within one second of each other** — so this was
one batch operation that stamped the placeholder rather than issuing numbers:

```
TRK-TBD _ FOLIO-TBD _ 13328 SW 113 CT (Nick)
TRK-TBD _ FOLIO-TBD _ 535 NW 7 ST Homestead (Renzo Cahuana)
TRK-TBD _ FOLIO-TBD _ 2362-2364 NW 32 ST City of Miami (2362 Acquisition LLC)
TRK-TBD _ FOLIO-TBD _ 10000 W Bay Harbor Dr Unit 221
TRK-TBD _ FOLIO-TBD _ 10000 W Bay Harbor Dr Unit 301
TRK-TBD _ FOLIO-TBD _ 10000 W Bay Harbor Dr Unit 302
TRK-TBD _ FOLIO-TBD _ 10000 W Bay Harbor Dr Unit 404 (Reyna Jovel)
TRK-TBD _ FOLIO-TBD _ 10000 W Bay Harbor Dr Unit 425
```

**These are not placeholders for unknown work.** They carry named clients — Nick,
Renzo Cahuana, Reyna Jovel, 2362 Acquisition LLC — and real addresses. **Five are
units in one building at 10000 W Bay Harbor Dr**, which is a single job with five
sub-matters, not five jobs.

**Every one of them is invisible to a tracking-number search, and any document filed
"by TRK" cannot reach them at all.**

**Issuing eight numbers is Jorge's call** — the registry increments by 3 from a
deliberately high seed, and inventing numbers is a charter violation. **What can be
said without deciding anything: these eight are the single largest identity gap in
the filing system, and they were created in one second by one operation that could
just as easily have issued numbers.**

### The version-log answer, finally

**1 confirmed version log across 35 job folders. Under three percent.**

A possible second — `TRK-26-1042_LOG.md` — sits in the short-form folder and was not
opened, so it is counted as *possible*, not confirmed.

**The original headline of 5% was arithmetically right and structurally wrong: it
divided by the folders it could see.** The true figure is worse, and the reason it was
worse is the same reason the folders were invisible.

---

## The count *(as originally written — see the correction above)*

**1 of 19 job folders has a version log. Five percent.**

| | |
|---|---|
| Distinct TRK job folders in Drive | **19** |
| Version-log files in the entire Drive | **1** |
| Which one | `VERSION-LOG_TRK-2026-1262.md` |

The single log lives in `20001 SW 110 CT Unit 143 (TRK-2026-1262)`, was created
2026-07-17 and last touched 2026-07-30. It has a `.bak-20260730` beside it, so **the
backup rule was followed on the one job where the version rule was followed** — the
practice is real where it exists, it simply exists once.

**Five percent is close to the four percent completion rate found in the Registrar
sweep.** Two unrelated measurements, both landing near the same figure. **The standards
in this operation are written down and followed almost nowhere** — not because they are
wrong, but because nothing creates the artifact at the moment work happens.

---

## ⚠ The finding that matters more than the count

**TRK-2026-1262 has TWO folders, under two different parents.**

```
20001 SW 110 CT Unit 143 (TRK-2026-1262)   created 2026-07-03   parent 1U4hnBp5…
TRK-2026-1262                              created 2026-08-12   parent 191XQNAE…
```

**One job, two homes.** A document filed correctly by tracking number can land in
either, and a search of one folder returns a complete-looking answer that is missing
whatever went to the other.

**This is a silent-split, and it is worse than a missing version log** — a missing log
is a gap you can see; a split job looks whole from either side.

**It is also the only job with a version log, so the log covers one half of a job
nobody knew was in two pieces.**

**Not actioned. Merging job folders is RED.** Recorded as TRK-2026-9104.

---

## The 19 folders

Ordered by number. The two folders that lead with an address rather than the TRK are
marked — they sort away from every other job and are missed by any listing that
assumes the name starts with `TRK` (RI-012, TRK-2026-9032).

| TRK | Folder | Version log |
|---|---|---|
| 0708-JULIA | Julia's Place Bond Release (Piwko) | — |
| 1256 | Groves at Sunset (Karla) | — |
| 1262 | `20001 SW 110 CT Unit 143 (…)` **address-first** | **YES** |
| 1262 | `TRK-2026-1262` **← duplicate, different parent** | — |
| 1265 | Bal Harbour Permit Status (MZ Solutions) | — |
| 1268 | 1500 Ocean Drive, Miami Beach — Roof Permit DD | — |
| 1280 | `14953 SW 34 ST (…)` **address-first** | — |
| 1286 | 1997 SW 218 St — Alec Valdes, Avis Builders | — |
| 1289 | City of Miami folio 01-4102-098-0001 — Alec Valdes | — |
| 1292 | 7823 NW 5th Ave — Alec Valdes, Avis Builders | — |
| 1293 | MZ Solutions LLC — Company Credentials 2026 | — |
| 1294 | Edison Towers II — 661 NW 58 St (TEDC) | — |
| 1295 | Principio — 5401 NW 7 Ave, 142-unit workforce housing (TEDC) | — |
| 1296 | TEDC Tacolcy EDC — Company Credentials 2026 | — |
| 1297 | Tuscany Cove — City of Miami Code Case 00009753 (TEDC) | — |
| 1310 | 10980 SW 202 Dr, Cutler Bay — Concrete Restoration | — |
| 1534 | 1840 NW 63 ST | — |
| 1535 | 18020 SW 103 AVE | — |
| 1536 | 10362 SW 180 ST | — |
| 1611 | Pembroke Pines Contractor Registration (MZ Solutions) | — |

---

## What has a number but no folder

Cross-referenced against `TRK-REGISTRY.md`:

- **1436**, **1531**, **1582**, **1588**, and the `TRK-26-` short-form pair
- **1614 through 1629** — the six issued 2026-08-15. **Expected**: they were assigned
  to properties whose documents are still loose, and no folder has been created yet.

**`1531` having no folder is consistent with tonight's separate finding that it is a
duplicate of 1292** — the same parcel, filed twice as a number but only once as a
folder.

---

## What to do about it, and what not to

**Do NOT bulk-create nineteen version logs.** A log written retroactively by a script
records nothing — it would say "v1, created today, no changes known," which is a file
that looks like compliance and carries no information. **That is the same shape as the
mass ACK.**

**The version log has to be written at the moment a version changes**, which means it
belongs in the same place as the intake stamp (TRK-2026-9060). One mechanism, two
outputs.

**Worth doing now, cheaply:**

1. **Resolve the 1262 duplicate** — RED, needs Jorge.
2. **Add a version log to jobs that are actually active**, as their next revision
   happens. Not all nineteen.

---

**Question: the 1262 duplicate — merge the two folders, or keep the newer one and
archive the older?**
