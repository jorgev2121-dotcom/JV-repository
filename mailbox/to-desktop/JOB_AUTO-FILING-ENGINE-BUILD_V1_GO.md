# JOB_AUTO-FILING-ENGINE-BUILD_V1_GO

To: 🖥️ CODE · DESKTOP EXECUTOR (RAMBO) on Jorge's PC. Backup lane: Cowork.
From: ☁️ Cloud window, for Jorge Valdes
Date: 2026-10-25
Tracking: TRK-2026-10052 (admin band) · #FilingEngine #AutoFiling #Rollback
Directive: OWNER-DIRECTIVE_AUTO-FILING-ENGINE-AND-THE-BOOK-01 (charter §15). Read it first.
Depends on: JOB_DESKTOP-SWEEP-OCR-RESORT_V1_GO (TRK-2026-10051). The engine reuses its inventory, OCR and naming rules.
Paste pointer: PASTE-D-070
Return path: `REPLY-TO-CHAT_JOB_AUTO-FILING-ENGINE-BUILD_V1.md` in VTES-Outbox, with proof.
Log folder (Drive): VTES-FILING-ENGINE, id 1fz40pKOj69hcwVjNF5thJVOs2tqo4xI2 (`G:\My Drive\VTES-FILING-ENGINE\`)

---

## What to build

**A background program, "VTES Filing Engine".** It runs on a schedule, keeps checking how Jorge's files are filed, named and grouped, and fixes what it finds **without asking**, inside the guardrails below. It writes a rollback script before every change.

### Where it looks

1. The Desktop (both the real one and the OneDrive one).
2. Downloads.
3. `G:\My Drive\00-INTAKE\` and `G:\My Drive\01-JOBS\`.
4. `C:\Users\JV\OneDrive\Documents\`.
5. Any folder added later to `G:\My Drive\VTES-FILING-ENGINE\WATCH-LIST.txt`, one path per line.

### What it does each run

1. **Inventory and OCR** new or changed files: hash, OCR text, a `.SEARCH.txt` sidecar, and the identifiers found (TRK, OPH, folio, permit, case, full address, party names).
2. **Group.** Put each file in its one group, using the group list from the desktop-sweep job.
3. **Name.** Rename to the charter grammar: `DATE _ TRK-or-OPH _ TYPE _ DESCRIPTION _ vN.ext`. Stamp the ID inside the file too (sidecar hashtags).
4. **File:**
   - A file goes into `01-JOBS\<TRK>\` **only on an exact identifier**.
   - Otherwise it goes to `00-INTAKE\<group>\` with an OPH number.
   - When a later run finds an exact match for an OPH file, it moves the file to its job and records the OPH resolving to a TRK.
5. **Quarantine** empty items, exact duplicates (keep the newest), superseded versions (an older `vN` next to a newer one) and broken shortcuts. They go to `G:\My Drive\_QUARANTINE\<date>\`, keeping their original paths. **Never delete.**
6. **Rollback first.** Before any change, write `Rollback_FilingEngine_<YYYY-MM-DD>_<HHMM>.ps1` to `C:\Users\JV\OneDrive\Documents\Reports\Undo_Manifests\`, with one line per change. Run it once with `-WhatIf` to prove it parses.
7. **Move safely:** copy, verify the hash, then remove the original.
8. **Log every change** as one JSON line in `G:\My Drive\VTES-FILING-ENGINE\FILING-ENGINE-LOG.jsonl`:
   `{"ts":"<ISO ET>","run":"<run id>","action":"rename|move|quarantine|tag|resolve-OPH","from":"...","to":"...","id":"TRK/OPH","reason":"...","evidence":"...","rollback":"<script path>","result":"ok|failed"}`
9. **Write one summary line per run**, in `FILING-ENGINE-RUNS.jsonl` in the same folder:
   `{"ts":...,"run":...,"scanned":N,"changed":N,"quarantined":N,"skipped_locked":N,"errors":N,"rollback":"...","health":"green|amber|red","note":"..."}`

### Guardrails (do not loosen)

- **Size brake:** if one run would change more than 200 items, or more than 10 percent of one folder, change nothing. Write `health:"red"` and a `RED-CARD_FILING-ENGINE_<date>.md` to VTES-Outbox, and wait for Jorge's YES.
- Skip files that are open or locked. Never touch the Google Drive or OneDrive system folders.
- If a file looks like it holds credentials, don't move it. Log `"action":"flag"`.
- SPEECHIFY-PRIORITY-01: never use the clipboard, and pause while Speechify is reading.
- **No fuzzy filing into a client job folder, ever.**

### Schedule and liveness

1. A Windows scheduled task, "VTES-FILING-ENGINE", every 60 minutes while Jorge is logged in, plus a full deep pass at 2:00 AM.
2. **The heartbeat checks that output grows, not that a process exists** (charter Rule 8). Each run touches `G:\My Drive\VTES-FILING-ENGINE\engine-heartbeat.json`, holding `{"ts":...,"run":...}`.
3. Creating this scheduled task is a persistence change. **Jorge types his own OK on the PC before it's created**; agents don't approve it for him. Phase A below needs no OK.

## Build phases

- **Phase A, dry run, today (GREEN):** build the engine, then run it **once with `-WhatIf`**: it logs what it would do and changes nothing. Put the dry-run log and a short readable summary in VTES-Outbox.
- **Phase B, live:** after Jorge's one typed OK on the PC for the scheduled task, turn on live mode. **The first live run reuses the approved desktop-sweep proposal if there is one.**

## Proof for DONE

1. The dry-run log, with a denominator: "scanned N, would change M".
2. A rollback script that parses (the `-WhatIf` output).
3. The scheduled task's name and its next run time.
4. The first two live heartbeats.
5. One real change undone with the rollback script, then redone, to prove rollback works.

Close out in three states only.

RAMBO: when will the Phase A dry-run log be in VTES-Outbox?
