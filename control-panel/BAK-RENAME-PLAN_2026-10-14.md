# BAK-RENAME plan, 2026-10-14

Made by: cloud session (Claude Code, web), overnight queue item BAK-RENAME.
State: **plan DONE. Nothing has been renamed.** Renaming is RED and needs Jorge's yes.
Machine list: `control-panel/BAK-RENAME-PLAN_2026-10-14.tsv` (2,147 rows plus a header).

---

## Section A: The answer

1. **2,147 backup files in the 41 job folders still use the banned name form**, `name.ext.bak-DATE`. Together they hold about 46 MB.
2. **Every one has a new name ready**, in the form `NAME_bak-DATE.ext`. For example, `_STAGE.md.bak-20260923` becomes `_STAGE_bak-20260923.md`.
3. **None of the new names collides** with another name in the same folder.
4. **The cause is the PC's portal and stage builders.** They wrote 2,130 of the 2,147 files.
5. **The builders have not written a new backup since 2026-10-08.** No job folder has a backup with a later date.

Denominator: 2,147 files found in 41 of 41 job folders. The 01-JOBS top folder itself holds 0.

---

## Section B: What kind of files these are

1. **1,078 are stage backups** (`_STAGE.md.bak-…`).
2. **1,052 are portal backups** (`_PORTAL_….html.bak-…`).
3. **17 are other files:**
   - 8 `_TAGS.txt` backups.
   - 5 `_HASHTAGS.txt` backups.
   - 1 Orange Tree capsules index.
   - 1 Orange Tree per-unit TAGS file.
   - 1 RFQ page for 1514 NW 73 St.
   - 1 version log for TRK-2026-1262.

**When they were made:** one portal and one stage backup per job, every night from 2026-08-30 to 2026-09-24. There was one more bulk run on 2026-10-08. A few older one-off backups go back to July and August.

**Six files have extra text after the date.** The new names keep that text:
1. Four Alec portal backups with a time on the end (`-1830`, `-1930`, `-2000`, `-2320`).
2. One Bal Harbour portal backup ending `-2345`.
3. One Medley tags backup ending `-job0099a`.

**Possible duplicates: 932 files have the same name base and the same size as an earlier backup in the same folder.**
1. 928 of the 932 are stage files. Stage files keep the same size from day to day, so the same size does not prove the same content. Treat this flag as a hint only.
2. The strongest case is the stage backups made on 10-08. In 40 of 41 folders, the 10-08 stage copy has the same size as the 09-24 copy. Its content date is also 09-24. So it is almost certainly a second copy of the 09-24 file.
3. No duplicate is deleted in this plan. Clearing duplicates would be a separate yes, and the files would go to quarantine, not deletion.

---

## Section C: How many in each job ("N of 2,147")

1. J01 · TRK-2026-1310 Cutler Bay: 53 of 2,147
2. J02 · TRK-2026-2221 Synergy brochure: 2 of 2,147
3. J03 · Alec Valdes DD: 84 of 2,147
4. J04 · TRK-2026-1684 12248 SW 125 Ter: 27 of 2,147
5. J05 · TRK-2026-1265 Bal Harbour permits: 56 of 2,147
6. J06 · 15601 SW 137 Ave: 52 of 2,147
7. J07 · 13920 SW 34 St: 52 of 2,147
8. J08 · TRK-2026-1612 331 Tamiami Canal: 55 of 2,147
9. J09 · TRK-2026-1534 1840 NW 63 St: 52 of 2,147
10. J10 · OPH-2026-0007 Bal Harbour Plaza: 85 of 2,147
11. J11 · TRK-2026-0708-JULIA: 52 of 2,147
12. J12 · TRK-2026-1611 Pembroke Pines: 52 of 2,147
13. J13 · TRK-2026-1588 Port Charlotte: 56 of 2,147
14. J14 · 13328 SW 113 Ct: 52 of 2,147
15. J15 · 535 NW 7 St Homestead: 52 of 2,147
16. J16 · 2362 NW 32 St: 52 of 2,147
17. J17 · Bay Harbor Unit 425: 52 of 2,147
18. J18 · Bay Harbor Unit 404: 52 of 2,147
19. J19 · Bay Harbor Unit 302: 52 of 2,147
20. J20 · Bay Harbor Unit 301: 52 of 2,147
21. J21 · Bay Harbor Unit 221: 52 of 2,147
22. J22 · TRK-2026-1535 18020 SW 103 Ave: 52 of 2,147
23. J23 · TRK-2026-1536 10362 SW 180 St: 52 of 2,147
24. J24 · TRK-2026-1297 Tuscany Cove: 52 of 2,147
25. J25 · TRK-2026-1296 TEDC credentials: 52 of 2,147
26. J26 · TRK-2026-1295 Principio: 52 of 2,147
27. J27 · TRK-2026-1294 Edison Towers II: 52 of 2,147
28. J28 · TRK-2026-1293 MZ credentials: 52 of 2,147
29. J29 · 1514 NW 73 St: 53 of 2,147
30. J30 · TRK-2026-1292 7823 NW 5 Ave: 52 of 2,147
31. J31 · TRK-2026-1289 City of Miami folio: 52 of 2,147
32. J32 · TRK-2026-1286 1997 SW 218 St: 52 of 2,147
33. J33 · TRK-2026-1280 14953 SW 34 St: 52 of 2,147
34. J34 · TRK-2026-1262 Unit 143: 54 of 2,147
35. J35 · TRK-2026-1268 1500 Ocean Dr: 52 of 2,147
36. J36 · TRK-2026-1256 Groves at Sunset: 53 of 2,147
37. J37 · TUS-26-1018 Pembroke Pines: 53 of 2,147
38. J38 · TUS-25-1023 14598 SW 110 St: 53 of 2,147
39. J39 · TUS-26-1033 Medley: 58 of 2,147
40. J40 · KAR-26-GROVES pool: 53 of 2,147
41. J41 · TRK-26-1042 15222 SW 108 Pl: 52 of 2,147

Total: 2,147.

---

## Section D: Root cause

**What writes these names: the portal builder and the stage builder on Jorge's PC.** They live in `OneDrive\Scripts`, not in this repo, and they hard-code `.bak-DATE` after the full file name. The evidence:

1. The backups appear at the same minute every night, about 1:00 AM Eastern (05:00 UTC), in all 41 folders at once.
2. Other builder runs show the same naming: 2026-09-01 around 1 PM and 5 PM, 2026-09-23 at about 1:09 PM, and the bulk run on 2026-10-08 at about 4:54 PM Eastern.

**Our own instructions also teach the banned form.** This is why the problem keeps coming back:

1. `AUTONOMY.md` line 44 says: "a `.bak-YYYYMMDD` copy first".
2. `mailbox/to-desktop/WORK-QUEUE.md` line 672 says: "Back up any file before editing it (`.bak-YYYYMMDD`)".

**Why the earlier fix did not hold.** On 2026-10-13 the rule in CLAUDE.md §9 was corrected. However, the builders on the PC never read CLAUDE.md, and these two instruction files still give the old rule to any agent that follows them. This problem is logged twice in `RECURRING-ISSUES.md` (first time and recurrence, both 2026-10-13), so under Rule 4 a patch is not allowed.

**A correction to the 10-13 recurrence note.** That note says the PC "still writes nightly backups". The job folders do not show that. The last nightly backup is dated 09-24, and the only later one is the 10-08 bulk run. Either the nightly builder stopped making backups after 09-24, or it stopped running. The desktop should check which one before changing it.

---

## Section E: The fix — three options, most durable first

**Option 1 — Remove (Tier 2, recommended).**
- **What:** Change both builders so that they only make a backup when the file's content has changed.
- **Name and place:** The backup is named `NAME_bak-YYYYMMDD-HHMM.ext` and goes into the job's `_Superseded\` subfolder, not the job's top folder.
- **Our text:** Correct the two instruction lines in Section D to the new form in the same change.
- **Why it is best:** It removes the bad name and also most of the clutter. 928 of the 1,078 stage copies are the same size as an earlier copy, which suggests nothing changed between them.
- **Failure mode:** someone later adds a new script with the old habit.
- **Lifespan:** permanent for these builders.

**Option 2 — Rename only (Tier 2).**
- **What:** Change the one name pattern in both builders to `NAME_bak-DATE.ext`, and correct the two instruction lines. Nothing else changes.
- **Failure mode:** the folders keep filling with one or two copies per job per run. That clutter is itself a recurring complaint.
- **Lifespan:** permanent for the name, but not for the clutter.

**Option 3 — Enforce (Tier 3).**
- **What:** A nightly read-only check that searches Drive for `.ext.bak-` names and adds any it finds to a morning rename list.
- **Failure mode:** like every night job here, it can die silently (RI-002). It also only reports; it does not fix anything.
- **Lifespan:** as long as the check is watched.
- **Use:** as a tripwire behind Option 1, not instead of it.

**Recommendation: Option 1, with Option 3 as the tripwire.** Tradeoff in one line: Option 1 changes when backups are made, not just their names, so the desktop must test it on one job first.

---

## Section F: The one-time rename batch for Jorge's morning yes

**What a yes allows:** renaming the 2,147 files in the TSV to the name in its `proposedName` column.

The rules for the run:
1. Change the name only. No file is moved, no content changes, nothing is deleted.
2. Run it job by job, with one helper per job (Rule 5), and write each job's result to a file as soon as it finishes.
3. Before the first rename, save the TSV as the undo list (new name back to old name), plus `Rollback_BAK-RENAME_2026-10-14_HHMM.ps1` in `Reports\Undo_Manifests\`.
4. Rename by `fileId`, never by searching for the name, so no file can be renamed in the wrong folder.
5. Finish with a count of renamed files over 2,147, per job.

**Best order:** fix the builders first (Section E). Otherwise a builder run could add new old-style names behind the rename.

Suggested reply for Jorge: "**yes BAK-RENAME**", or "**yes BAK-RENAME, job J34 only**" to try one folder first.

---

## Section G: Limits of this survey (said plainly)

1. **Only the top level of each job folder was searched.** Subfolders were not walked. The census files show at least one more backup in a subfolder (an ENHANCED PDF backup in `07-TAX-JACKET`). A subfolder sweep is the next GREEN item.
2. **Folders outside the 41 jobs were not counted.** That includes `_CLAUDE-MAILBOX` (about 874 old-style backups), the `TO-CLOUD.md.bak-…` snapshots, and `_INDEX.csv.bak-20261010`.
3. **The collision check compared names in the plan with each other and with the hashtag census.** Drive's search cannot match an exact file name, so a file already carrying the new name could only be ruled out from the census. The census shows none.
4. **"Duplicate" means the same base and the same size, not the same content.** Contents were not downloaded, as instructed.
5. **How the files were found:** Drive returns at most 5 results per search, so each folder was searched in two-day date slices, and every slice had 5 or fewer results. The total of 2,147 has no repeated file ID, and every name matches `\.[A-Za-z0-9]+\.bak-?\d`.

---

Shall I queue the subfolder sweep tonight so the morning batch covers everything?
