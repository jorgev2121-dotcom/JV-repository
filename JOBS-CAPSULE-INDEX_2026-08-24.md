# JOB CAPSULES — Google Drive index (2026-08-24, by cloud)
**Source:** `01-JOBS — ONE SOURCE OF TRUTH` in Google Drive. #jobs #capsules #single-source-of-truth

## ⚠ Data-quality flags (read first — they undercut "one source of truth")

> **UPDATE 2026-08-24 (desktop root-caused this — TRK-2026-9671 / 9672):** flags **1 and 4 are NOT a
> duplication — they are ONE encoding bug, now fixed at source.** A filing script (`Doc-Filing-Arm.ps1`)
> hardcoded the jobs path with an em-dash, had no BOM, and ran under PowerShell 5.1, which read the file
> as Windows-1252 and created a **phantom folder** `01-JOBS â€" ONE SOURCE OF TRUTH`. The phantom holds
> **0 files / 8 empty dirs** — but the same defect **swallowed 7 real documents into a ghost tree once
> before, on 2026-08-23 (TRK-2026-9602).** Desktop added a BOM (fix on disk, verified) and a sweep of
> all 180 scheduled tasks confirmed **no enabled task can recreate it now.** **Do not merge or trust any
> job list built from the phantom folder.** Flags 5–6 (and my flag 7) still stand. See RI-032.

1. ~~**There are TWO folders both named `01-JOBS — ONE SOURCE OF TRUTH`**~~ **[RESOLVED — one encoding bug, fixed at source; see the UPDATE box above. The second folder is a mojibake phantom, not a real source of truth.]**
2. **TRK-2026-1262 exists in ≥2 places** (`20001 SW 110 CT Unit 143 (TRK-2026-1262)` and a bare `TRK-2026-1262`) — the "one job, two homes" issue (OPEN-ITEMS 9104).
3. **TRK-2026-1265 exists in ≥2 places** (`Bal Harbour Permit Status` and `TRK-2026-1265_The-Plaza`).
4. ~~**TRK-2026-1536 and TRK-2026-1292 each appear twice**~~ **[RESOLVED — same encoding phantom as flag 1. One of the two appearances was the ghost folder; not a real duplicate.]**
   *(Flags 2 and 3 — TRK-1262 and TRK-1265 in ≥2 places — are NOT the phantom; those names aren't in the ghost tree, so they remain genuine and still need checking.)*
5. **Split across two clouds:** these are the Google-Drive capsules; the **TEDC money-lock capsules (Sugar Hill 1414, Garden Walk 1412/1413) live in OneDrive `Jobs-Master`**, not here. Two homes.
6. **No capsule yet** for **Alabama Jack's (JOB-0086)** or **Miami Art House (TUS-26-1033)** — active jobs with no folder in 01-JOBS.
7. **⭐ Alec Valdes is ONE client with EIGHT tracking numbers — but the list makes him look like 4.** This is the "6–9 addresses not reflecting" problem, and it is a *labeling* failure, not a *dropped-job* failure. The folders exist; three of them (1534/1535/1536) are titled by address only, with no client name, and **TRK-2026-1531 (the ALEC MICROFILM BATCH parent) has no capsule folder at all** — it lives only as a registry row + a jacket `.eml`. Desktop report **TRK-2026-9477** proved the same failure runs down into the money layer: $5,640 that Alec Zelle'd was set aside as "family, not claimed" purely because he shares Jorge's surname. **The full 8: 1286, 1289, 1292, 1531, 1534, 1535, 1536, 1612** (see `ALEC-VALDES_ALL-JOBS_2026-08-24.md`).

## Job capsules (under the main `01-JOBS`)
1. TRK-2026-1612 — 331 Tamiami Canal Rd, Miami (Alec Valdes)
2. TRK-2026-1611 — Pembroke Pines Contractor Registration (MZ Solutions)
3. TRK-2026-1588 — 4225 Rose Arbor Cir, Port Charlotte
4. TRK-2026-1536 — 10362 SW 180 ST **(Alec Valdes DD)**
5. TRK-2026-1535 — 18020 SW 103 AVE **(Alec Valdes DD)**
6. TRK-2026-1534 — 1840 NW 63 ST **(Alec Valdes DD)**
7. TRK-2026-1310 — 10980 SW 202 Dr, Cutler Bay (Concrete Restoration)
8. TRK-2026-1297 — Tuscany Cove, City of Miami Code Case 00009753 (TEDC)
9. TRK-2026-1296 — TEDC Tacolcy EDC Company Credentials (TEDC)
10. TRK-2026-1295 — Principio, 5401 NW 7 Ave, 142-unit workforce housing (TEDC)
11. TRK-2026-1294 — Edison Towers II, 661 NW 58 St, Miami (TEDC)
12. TRK-2026-1293 — MZ Solutions LLC Company Credentials (MZ Solutions)
13. TRK-2026-1292 — 7823 NW 5th Ave (Alec Valdes / Avis Builders)
14. TRK-2026-1289 — City of Miami folio 01-4102-098-0001 (Alec Valdes)
15. TRK-2026-1286 — 1997 SW 218 St (Alec Valdes / Avis Builders)
16. TRK-2026-1280 — 14953 SW 34 ST
17. TRK-2026-1268 — 1500 Ocean Drive, Miami Beach (Roof Permit DD)
18. TRK-2026-1265 — Bal Harbour Permit Status (MZ Solutions)
19. TRK-2026-1262 — 20001 SW 110 CT Unit 143 (MZ Solutions — the open NOV job)
20. TRK-2026-1256 — Groves at Sunset (Karla)
21. TRK-2026-0708-JULIA — Julia's Place Bond Release (Piwko)

## Proposals to follow up on
- **`Pending Jobs (Quoted – Awaiting Approval)`** folder holds only **one**: **NMB-3811-U3 — 3811 NE 166 St Unit 3, North Miami Beach.**
- Most active proposals actually live *inside* their job capsules or the TEDC OneDrive capsules — not in the Pending-Jobs folder. Examples on the live board: **Alabama Jack's ($4,750), Miami Art House ($16,000/$8,000 due), Groves at Sunset, Sugar Hill (never signed).**

*Note: the Drive search returned up to 40 folders; a few more capsules may exist beyond this page.*
