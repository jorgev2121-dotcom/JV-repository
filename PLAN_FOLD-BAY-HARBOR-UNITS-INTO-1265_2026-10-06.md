# Plan: fold the five Bay Harbor unit capsules into TRK-2026-1265 (The Plaza)

**Staged by the cloud session 2026-10-06 ~03:40Z (11:40 PM Miami, Monday). Nothing has been moved, renamed or deleted.**
**Jorge's answer, typed to the cloud session:** *"yes the Bay Harbor units are part of the Plaza."* That settles the identity question: **these five capsules need no new TRK numbers.** It is **not yet a go to move files.** Filing is RED; this plan is ready to run once Jorge says "go."

## The five capsules (all under the real root, all `TRK-TBD _ FOLIO-TBD`)

- [Unit 301](https://drive.google.com/drive/folders/1TaOSDjV2TSBVULlHnplRC5aCNk5HZF_A)
- [Unit 302](https://drive.google.com/drive/folders/1iAuVs7WfL6yjGypRhappO5DLngwOooJl)
- [Unit 404 (Reyna Jovel)](https://drive.google.com/drive/folders/11BBc5FKWh7-kVV_nNeyLEcSu7oqCDxGG)
- [Unit 425](https://drive.google.com/drive/folders/1R_84yzKyapzG0-Rsi7tL0tJQEw0viMZB)
- [Unit 221](https://drive.google.com/drive/folders/15l6ISulILZG-NA4KVxU_lP9on-zaL2gX)

**Destination:** [TRK-2026-1265 - Bal Harbour Permit Status (MZ Solutions)](https://drive.google.com/drive/folders/1D32Vs9joWehiGe0PutoecSckS-CyS171)

## What cloud saw, read-only

- Each unit capsule is the standard empty skeleton, created in one batch on 2026-08-17 at 19:41Z: `01-INTAKE`, `02-PERMITS` (not on every unit), `03-INVOICES-PAYMENTS`, `04-CORRESPONDENCE`, `05-REPORTS-DELIVERABLES`, `_Superseded`.
- Each also holds one generated page, `_PORTAL_UNASSIGNED_TRK-TBD-FOLIO-TBD-10000-W-Bay-Harbor-Dr-Unit-NNN.html` (about 16 KB). **A portal builder rewrote all five at 10-05 22:46Z, so it will keep regenerating them with "TRK-TBD" in the name until its list is changed.**
- **Not counted: the files inside each subfolder.** Drive returns five rows a page, so I listed only the top level. **Step 1 below counts them before anything moves.**
- The 1265 capsule already holds Bay Harbor documents for units 301 and 322 (including the five empty PDFs found on 10-05), plus `00-Capsule`, `03-Doron-Evidence_2026-08-18`, `04-CORRESPONDENCE`, `_CONTACTS-EXTRACTED.txt` (66 emails, 138 phones) and `_PORTAL_TRK-2026-1265.html`.

## Strongest objection, and how the plan answers it

**One TRK is one project, but the units have different owners.** Unit 404 names a person (Reyna Jovel). If the five are poured into one flat folder, one owner's papers become hard to pull out for billing or a dispute.
**Answer:** fold each unit into **its own subfolder** inside 1265 and tag every document with `#Unit-NNN`, so a unit can still be pulled alone.

## Steps (copy first, verify, then retire; nothing is deleted)

1. **Count (read-only).** List every file under each unit capsule: path, size, hash. Write `INVENTORY_BAYHARBOR-UNITS_<date>.csv`. Stop and report if any file is zero bytes or any name collides.
2. **Make the destination.** Under the 1265 capsule, create `06-UNITS\Unit-301`, `Unit-302`, `Unit-404`, `Unit-425`, `Unit-221` (name to confirm against the capsule's own convention).
3. **Copy, do not move.** Copy each unit's files into its subfolder. Re-hash every copy against the inventory. **Any mismatch stops the run.**
4. **Stamp.** Each copied document carries `TRK-2026-1265`, `#Unit-NNN`, and `#The-Plaza` in its body or sidecar (not the filename only). `_VERSION-LOG.md` in 1265 gets one line per unit.
5. **Retire the old capsules.** Move each now-verified old unit capsule into `_Superseded`. **Do not delete.** The old capsules get a one-line note: *"Folded into TRK-2026-1265 on <date>; do not use."*
6. **Roll back.** Write `ROLLBACK-MANIFEST_BAYHARBOR-FOLD_<date>.csv` (path and hash of every file created) and a one-command `ROLLBACK_...ps1` that hash-checks before it removes anything. **Prove it on Unit 302 (the smallest) first.**
7. **Stop the regeneration.** Remove the five units from the portal builder's "unassigned" list and add them to the 1265 portal, so the `TRK-TBD` pages stop coming back. **This is the Tier 2 fix (remove the cause).**
8. **Registry note (RED, desktop with Jorge's yes).** Record in the registry that the five capsules were folded into 1265 and never received numbers. **No new number is issued for any of them.**

## Effect on the TRK-TBD count

- **Before:** 10 `TRK-TBD` capsules. **After this fold: 5.**
- **Still needing a decision:** [13920 SW 34 ST](https://drive.google.com/drive/folders/17P7SwyVURWYCh9w4spWp7hu3mAyOvB6n), [15601 SW 137 AVE](https://drive.google.com/drive/folders/1C7IbxE_K81HqLmqdXwD0-cvF6N9bOdY-), [13328 SW 113 CT](https://drive.google.com/drive/folders/1UhGKht4kyDRZh4wJ4AfotDMurigX-qvS), [535 NW 7 ST Homestead](https://drive.google.com/drive/folders/1u5VINVcGaGlU4hy3E0VqvgEsSaS1Em04), [2362-2364 NW 32 ST](https://drive.google.com/drive/folders/1ytvJCzwLtpqUqKNGRDpvxhVyBUxzBvvR). **Plus Palmer Trust in staging.**
- Those five need real numbers from a registry read the cloud cannot do (see DRIFT-FLAGS-CAPSULE-TREE_2026-10-06.md).

## What Jorge says to start

**"Go."** One word. Cloud then writes the order to the desktop, with the rollback requirement and the stop-on-mismatch rule in it.

#capsule-tree #TRK-2026-1265 #The-Plaza #Bay-Harbor #fold-in #JorgeValdes

TRK-2026-1265 · v1 · 2026-10-06 · CURRENT
