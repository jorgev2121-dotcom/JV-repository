# Plan v2: Bay Harbor = the 10000 building = ONE job, separate from the Plaza

**Staged by the cloud session 2026-10-06 ~04:05Z (12:05 AM Miami, Tuesday). Nothing has been moved, renamed, numbered or deleted.**
Supersedes [v1 (fold into 1265)](PLAN_FOLD-BAY-HARBOR-UNITS-INTO-1265_2026-10-06.md), which Jorge retracted ("SORRY. YJAY IS WRONG").

## What Jorge said, and what cloud reads from it

**Jorge, typed:** *"Bay Harbor is equal to #10000 building."*

**Cloud's reading, please confirm:** "Bay Harbor" is the building at **10000 W Bay Harbor Dr ("Building 10000")**. It is **its own property, not the Plaza.** The five unit capsules (221, 301, 302, 404, 425) are the units of that one building. **One building is one project, so it gets ONE tracking number, not five** (charter: one TRK = one project; address, owner and permits share it).

**Evidence for that reading (read-only):**

- The Plaza job, TRK-2026-1265, is **The Plaza of Bal Harbour, 10185 Collins Ave** (a different town, Bal Harbour). Bay Harbor Islands is where 10000 W Bay Harbor Dr is.
- The unit documents themselves say so: `[301_ 10000 W BAY HARBOR DR_ Building 10000 _ 13-2227-055-006]` and `[322 ... Building 10000 _ 13-2227-055-037]`. Two different folios, one building.
- The five unit capsules were made in one batch on 08-17 and are all named `10000 W Bay Harbor Dr Unit NNN`.

## The wrinkle: Building 10000 papers are sitting inside the Plaza capsule

The 1265 capsule's `_FROM-ARCHIVE` folder holds **unit 301 and unit 322** documents for Building 10000, including the **five empty (0-byte) PDFs** the OCR run found on 10-05:

- unit 301 CERT-COI (MZ to Town of Bay Harbor)
- unit 322 PERMIT APP out for signature
- unit 322 CERT-COI
- unit 322 NOC (Notice of Commencement) out for signature
- unit 322 PERM APP, 10000 Building, out for signature

**That is a misfile (Building 10000 papers in the Plaza job).** It also explains why the fold-in felt wrong: the 1265 job is Bal Harbour, the units are Bay Harbor. **Unit 322 has no capsule of its own** (only 221, 301, 302, 404, 425 do), so the building probably has at least six units.

## What this does to the numbers

- **Before:** 10 `TRK-TBD` capsules.
- **After:** the 5 Bay Harbor units become **1** job (one new number) and **5** other capsules still need numbers: [13920 SW 34 ST](https://drive.google.com/drive/folders/17P7SwyVURWYCh9w4spWp7hu3mAyOvB6n), [15601 SW 137 AVE](https://drive.google.com/drive/folders/1C7IbxE_K81HqLmqdXwD0-cvF6N9bOdY-), [13328 SW 113 CT](https://drive.google.com/drive/folders/1UhGKht4kyDRZh4wJ4AfotDMurigX-qvS), [535 NW 7 ST Homestead](https://drive.google.com/drive/folders/1u5VINVcGaGlU4hy3E0VqvgEsSaS1Em04), [2362-2364 NW 32 ST](https://drive.google.com/drive/folders/1ytvJCzwLtpqUqKNGRDpvxhVyBUxzBvvR). Plus Palmer Trust (a real paying job?).
- **New numbers needed in total: 7** (Bay Harbor 1, the five others, Palmer Trust if real) instead of 11.

## The five unit capsules (current locations)

- [Unit 301](https://drive.google.com/drive/folders/1TaOSDjV2TSBVULlHnplRC5aCNk5HZF_A)
- [Unit 302](https://drive.google.com/drive/folders/1iAuVs7WfL6yjGypRhappO5DLngwOooJl)
- [Unit 404 (Reyna Jovel)](https://drive.google.com/drive/folders/11BBc5FKWh7-kVV_nNeyLEcSu7oqCDxGG)
- [Unit 425](https://drive.google.com/drive/folders/1R_84yzKyapzG0-Rsi7tL0tJQEw0viMZB)
- [Unit 221](https://drive.google.com/drive/folders/15l6ISulILZG-NA4KVxU_lP9on-zaL2gX)

## Steps (all staged; each needs Jorge's "go"; nothing deleted)

0. **Get the number (read-only, GREEN).** The next free `TRK-2026-NNNN` has to come from the registry on Jorge's OneDrive, which cloud cannot see. Desktop reads it and reports the next unused value on the +3 ladder. **Cloud will not invent one.** Known problem to settle first: the registry's stated range does not cover 1536, 1611 or 2221.
1. **Make one new capsule** `TRK-2026-#### - Bay Harbor Building 10000 (10000 W Bay Harbor Dr)` in the real root, with the standard subfolders, and **one subfolder per unit** (`Unit-221`, `301`, `302`, `404`, `425`, plus `322`). Reason for per-unit folders: **Unit 404 names a different owner (Reyna Jovel), so units must stay separable for billing.**
2. **Inventory first.** Count every file under the five capsules (path, size, hash). Cloud only saw the top level.
3. **Copy, verify, then retire.** Copy each unit's files into its subfolder, re-hash every copy, stop on any mismatch. Then move each old `TRK-TBD` unit capsule into `_Superseded` with a one-line note. **Never delete.**
4. **Building 10000 papers in the Plaza capsule: COPY them into the new capsule's `Unit-301` and `Unit-322` folders; do not move or delete the originals in 1265 until Jorge says.** The five zero-byte PDFs get a `NEEDS-REQUEST` note (re-request from MZ Solutions or the Town of Bay Harbor).
5. **Stamp** every copied document with the new TRK, `#Bay-Harbor`, `#Building-10000` and `#Unit-NNN` in its body or sidecar. `_VERSION-LOG.md` lines for the new capsule.
6. **Rollback** manifest (path and hash of every file created) and a one-command script, proven on Unit 302 first.
7. **Stop the regeneration (Tier 2).** Tell the portal builder the five units are no longer "unassigned," so the `_PORTAL_UNASSIGNED_TRK-TBD...Unit-NNN.html` pages stop coming back.
8. **Registry (RED).** One new entry for Building 10000. The five old capsules are noted as folded into it and never numbered.

## What Jorge says to start

1. **Confirm the reading:** *"Yes, Bay Harbor Building 10000 is one separate job."*
2. **"Go"** for step 0 (the registry read).

#capsule-tree #Bay-Harbor #Building-10000 #MZ-Solutions #JorgeValdes

TRK-2026-9960 · v2 · 2026-10-06 · CURRENT
