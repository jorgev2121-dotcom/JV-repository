# VERSION-LOG-GAP-MAP.md — TRK-2026-9103

**Counted by a cloud session overnight 2026-08-16 by enumerating Google Drive
directly. Read-only. Nothing filed, moved or renamed.**

The charter requires a version log in every job folder:

> *`_VERSION-LOG.md` in every TRK folder: Version · Date · What Changed · Status.*

---

## The count

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
