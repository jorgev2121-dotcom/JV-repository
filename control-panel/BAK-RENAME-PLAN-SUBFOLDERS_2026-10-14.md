# BAK-RENAME plan, part 2: subfolders and the mailbox, 2026-10-14

Made by: cloud session (Claude Code, web), helper for the VTES runner. Extends `BAK-RENAME-PLAN_2026-10-14.md`.
State: **survey and plan DONE. Nothing has been renamed, moved or deleted.** Renaming is RED and needs Jorge's yes.
Machine list: `control-panel/BAK-RENAME-PLAN-SUBFOLDERS_2026-10-14.tsv` (563 rows plus a header). Same columns and the same name rule as part 1: `NAME_bak-YYYYMMDD[-HHMM].ext`.

---

## Section A: The answer

1. **563 more backup files use the banned name form.** That is 85 in job subfolders and 478 in the mailbox group.
2. **Grand total with part 1: 2,710 files.** Part 1 has 2,147 (job top folders). Part 2 has 563.
3. **Every one has a new name ready. None of the new names collides** with another name in the same folder.
4. **The mailbox is the heavy part.** 476 files in `_CLAUDE-MAILBOX`, about 3.4 GB. 403 of them are copies of `TO-CLOUD.md`, about 9 MB each.
5. **The mailbox count has dropped** from the 874 quoted on 2026-09-20 to 476 today. Something pruned it. The newest mailbox backup is dated 2026-10-11.

Denominator for part 2: 85 of 85 job-subfolder backups and 478 of 478 mailbox-group backups found by the search, so 563 of 563.
Running total: **2,710 of 2,710** banned-form backups inside the scope of parts 1 and 2.

---

## Section B: Job subfolders (85 files in 19 of 41 jobs)

**What they are:**
1. **34 ENHANCED tax-jacket PDFs**, in `07-TAX-JACKET_2026-08-24 / ENHANCED`. All made on 2026-08-26 in one run. These are the largest: about 200 MB together.
2. **17 tag sidecars** (`.pdf.TAGS.txt.bak-…`). Eight from 2026-08-26 in the Bal Harbour Plaza unit folders. Nine from 2026-10-05 at 15:25 in the Bal Harbour folded-in report folders.
3. **34 one-off backups** that agents made before editing a report, permit form, CSV or log. They carry labels such as `-pre321fix`, `-2ndpass` and `-pre-fix`.

**Count per job ("N of 85"):**
1. J01 · TRK-2026-1310 Cutler Bay: 4 of 85
2. J04 · TRK-2026-1684 12248 SW 125 Ter: 4 of 85
3. J05 · TRK-2026-1265 Bal Harbour permits: 20 of 85
4. J06 · 15601 SW 137 Ave: 2 of 85
5. J07 · 13920 SW 34 St: 3 of 85
6. J08 · TRK-2026-1612 331 Tamiami Canal: 7 of 85
7. J09 · TRK-2026-1534 1840 NW 63 St: 3 of 85
8. J10 · OPH-2026-0007 Bal Harbour Plaza: 9 of 85
9. J13 · TRK-2026-1588 Port Charlotte: 1 of 85
10. J14 · 13328 SW 113 Ct: 2 of 85
11. J15 · 535 NW 7 St Homestead: 2 of 85
12. J16 · 2362 NW 32 St: 1 of 85
13. J23 · TRK-2026-1536 10362 SW 180 St: 3 of 85
14. J27 · TRK-2026-1294 Edison Towers II: 6 of 85
15. J30 · TRK-2026-1292 7823 NW 5 Ave: 3 of 85
16. J34 · TRK-2026-1262 Unit 143: 3 of 85
17. J38 · TUS-25-1023 14598 SW 110 St: 3 of 85
18. J39 · TUS-26-1033 Medley: 5 of 85
19. J41 · TRK-26-1042 15222 SW 108 Pl: 4 of 85

The other 22 jobs have no banned-form backup in any subfolder.

**Count per subfolder.** The TSV's `jobFolder` column gives the full path for every row. The main groups are:
1. `07-TAX-JACKET_2026-08-24 / ENHANCED`: 34 files across 13 jobs.
2. J05 `01-INTAKE / _FOLDED-FROM-ONEDRIVE_2026-09-04 / … / 05-REPORTS-DELIVERABLES` and its `CONTIGUOUS-BY-UNIT` and `_Superseded` subfolders: 13 files.
3. `05-REPORTS-DELIVERABLES` in J01, J04, J05, J08, J10, J27 and J39: 13 files. J27's `_SUBMITTALS` folder holds 5 more.
4. J05 `02-PERMITS`: 5 files. J10's unit folders (`Plaza-305`, `-307`, `-321`, `-423`, `-721`, `-815`, `-1016`, `-1515`): 1 file each.
5. Single files: J04 `06-Chain-of-Title`, J05 `03-Doron-Evidence_2026-08-18`, J13 `_Superseded`, J39 `03_Research-and-Proposal` (3 files), and J41 `00-Intake`.

---

## Section C: The mailbox group (478 files)

1. **`_CLAUDE-MAILBOX`: 476 files.**
   - 403 `TO-CLOUD.md` copies, dated 2026-09-22 to 2026-10-11. In early October that was 28 to 54 copies a day. Most are labelled `-pre-prepend` (161), `-pre-append` (39) or `-pre-edit` (36). 164 carry a time only.
   - 13 `OWNER-QUEUE.md`, 10 `BACKLOG_JORGE-TASKS`, 10 `CORRECTIVE-9765_RESUME-ORDER`, 9 `CORRECTIVE-9765_PER-LEAD-RESULTS`, 8 `!!-READ-BEFORE-STEP-2`, 5 `CORRECTIVE-9765B_NORMALIZED-RETRY`, 3 `RECURRING-ISSUES.md`, and 13 single files.
2. **`00-CONTINUITY-BOARD`: 1 file**, `TO-CLOUD.md.bak-20260830`.
3. **`Shared Folders for all LLMs / CHAT-LOGS`: 1 file**, `_INDEX.csv.bak-20261010`.

**Possible duplicates: 3, all in the mailbox.** Each has the same name base and the same size as an earlier backup. This is a hint only. Contents were not downloaded.

---

## Section D: Which generator wrote them

This is inferred from the names and timestamps. None of these scripts is in this repo, so **it is unverified.**

1. **The mailbox `TO-CLOUD.md` copies come from the PC agent that adds to `TO-CLOUD.md`.** The labels `-pre-prepend`, `-pre-append` and `-pre-edit` name the step it was about to take. On 2026-09-20 this was logged as RAMBO's own backup habit, with no rotation (OPEN-ITEMS, OD-107). The writer is still active. 31 copies were made on 2026-10-10.
2. **The 34 ENHANCED PDFs come from the tax-jacket enhance run on 2026-08-26.** That run backed up each `part0N.pdf` before it rewrote the file.
3. **The tag sidecars come from two tagging runs.** One on 2026-08-26 wrote `.bak-YYYYMMDD`. One on 2026-10-05 at 15:25 wrote `.bak-YYYY-MM-DD_HHMM`, which is a third date format.
4. **The 34 one-off files were made by agents by hand** before an edit. This matches the old instruction "back up with `.bak-YYYYMMDD`" in `AUTONOMY.md` line 44 and `mailbox/to-desktop/WORK-QUEUE.md` line 672 (see part 1, Section D).

**The part-1 builders (portal and stage) wrote none of the 85 subfolder files.** Fixing those two builders will not stop these files. **The instruction lines and the mailbox writer must change too.** Under Rule 4, the part-1 recommendation (Option 1 removal plus Option 3 tripwire) should cover all four sources.

---

## Section E: Name changes worth knowing about

1. **Nine tag sidecars use the date form `2026-10-05_1525`, and one TO-CLOUD copy uses `2026-10-05-2256`.** The new names write these as `20261005-1525` and `20261005-2256`.
2. **Double extensions stay.** For example, `X.pdf.TAGS.txt.bak-20260826` becomes `X.pdf.TAGS_bak-20260826.txt`. The inner `.pdf` is kept, as in part 1.
3. **Extra labels after the date are kept**, for example `-pre-prepend`, `-2ndpass` and `-pre-quarantine`. Seven mailbox files carry the date twice (`-20260826-20260826-1940-pre-quarantine`). That is kept as it is.
4. **One file already has its extension last**: `… Expired-Permit-Reissue-Clock _ v1.bak-20260902.md` in J05. Drive can preview it. Renaming it to `_bak-` is optional and only gives one consistent form.

---

## Section F: Found but outside this plan (not in the TSV)

The same search found **419 more banned-form backups outside the 41 jobs and the mailbox:**
1. MY-DESK: 205. Mostly the nightly `_MATTER-BOARD.html/.csv`, `APPROVALS-QUEUE.json` and `CDM_*.csv` copies.
2. VTES-Outbox: 96.
3. 00-CONTINUITY-BOARD: 41, not counting the TO-CLOUD copy above.
4. UNS-OPEN-CASES-2020-2026: 20.
5. 01-JOBS / `_DRAFTS-PENDING-PACKAGES`: 18. 01-JOBS / `_MUNICIPALITY-PLAN-SUBMISSION-PORTALS`: 18. These are the nightly `_STAGE.md` copies, from the part-1 builders.
6. Projects 6, Shared Folders for all LLMs 5, ORANGE-TREE 4, VTES-Inbox 3, VTES-Bridge 2, Capsule-Tree 1.

**Four folders also carry banned-form names.** None of them is in a job. Three are in `Shared Folders for all LLMs / _VERSIONS` (`CHAT-LOGS__INDEX.csv.bak-20261010`, `NIGHT-PROTOCOL.md.bak-20260924`, `ORANGE-TREE-FORMAT-PROTOCOL_…md.bak-20261007`). The fourth is `_dd-skills.bak-20260904-2142`. These are folders, not files, so Drive previews are not affected. They are left alone.

Full-Drive total of banned-form backup files: **2,147 + 563 + 419 = 3,129.**

---

## Section G: How this was found and checked

1. **Drive search.** One query covered all of Drive: `title contains 'bak'`, excluding folders, the 41 job top folders, and the mailbox. A second query covered the mailbox. Paging works when snippets are turned on, about 100 results a page. That replaces the two-day date slices used in part 1.
2. **Each file was traced up to its folder.** 81 parent and ancestor folders were looked up one by one. Every one of the 85 subfolder files reaches one of the 41 job folders. Nothing was assigned by name match.
3. **The search was checked against part 1.** The same query on J01's top folder returned 53 files, and part 1 counted 53.
4. **Collision check.** A Drive search for `bak` returns every name that holds a `bak` word, old form or new. So any file already named like a proposed new name would have appeared in these results. None did, and none of the new names repeats within a folder.
5. **The generator script and raw lists are in the cloud scratch folder `scratchpad/bak-sub/`.** They are `build_sub.py`, `classified.tsv` and `folders.tsv`. That folder does not survive the session. This file and the TSV are the record.

---

## Section H: For Jorge's morning yes

The rename batch rules from part 1, Section F, apply unchanged: change names only, rename by `fileId`, one job at a time, and write the undo list first.

Suggested replies:
1. "**yes BAK-RENAME**" covers part 1 and part 2 job folders, 2,232 files.
2. "**yes BAK-RENAME mailbox**" covers the 478 mailbox-group files.

**Recommendation: rename the job folders, but do not rename the 403 `TO-CLOUD.md` copies.** Quarantine them instead, as a separate yes, because they are about 3.4 GB of copies of one file. Tradeoff in one line: renaming them keeps 3.4 GB of clutter, and quarantining them means asking for a second approval.

Shall I queue the four-source fix (builders, instruction lines, mailbox writer, tag tool) as one desktop work item?
