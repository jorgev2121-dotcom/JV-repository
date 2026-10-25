# JOB_ALL-DOCS-OCR-AND-RENAME_V1_GO

To: 🖥️ CODE · DESKTOP EXECUTOR (RAMBO) on Jorge's PC. Backup lane: Cowork.
From: ☁️ Cloud window, for Jorge Valdes
Date: 2026-10-25
Tracking: TRK-2026-10055 (admin band) · #OCR #Naming #FilingEngine
Builds on: JOB_AUTO-FILING-ENGINE-BUILD_V1_GO (TRK-2026-10052; the copy in VTES-Inbox says 10016). This job **widens the engine's scope and changes its naming rule.**
Naming rule: `NAMING-CONVENTION-V2_PROPOSAL_2026-10-25.md` in the repo (copy in VTES-Inbox).
Paste pointer: PASTE-D-070
Return path: `REPLY-TO-CHAT_JOB_ALL-DOCS-OCR-AND-RENAME_V1.md` in VTES-Outbox.

## What changes in the engine

1. **Scope: every document in the system**, not just the Desktop and intake: all of `G:\My Drive\`, `C:\Users\JV\OneDrive\`, Downloads, Desktop, and any Dropbox or PaperPort folder found. System and app folders are skipped.
2. **OCR everything.** Every PDF, image and scan gets a text layer (searchable PDF) or, where the file can't be changed, a `.SEARCH.txt` sidecar. Write each file's result the moment it's done (charter Rule 5).
3. **Rename to Naming Convention V2:** `ADDRESS-or-NAME _ TYPE _ DESCRIPTION _ vN _ YYYY-MM-DD _ ID.ext`. Blind hashtags go in the sidecar and the file properties, never in the name.

## Phases

- **Phase A, tonight (GREEN; changes nothing):**
  - Count every document, with a denominator ("31,400 files, 18,200 already searchable, 13,200 need OCR").
  - OCR into sidecars only.
  - Write `PROPOSED-RENAMES_<date>.csv` (old name, new name, ID, evidence).
  - Put 25 sample renames, readable, at the top of the summary so Jorge can judge the convention by eye.
- **Phase B (after Jorge's YES to the convention AND his typed OK for the engine's scheduled task):** the engine renames at most 200 files per run, with a rollback script before each run and copy-verify-remove for moves.
- **A file with no exact ID** keeps its place, gets an OPH number as its last field, and is listed for matching.

## Never

- Rename or move a file that's open, locked or syncing.
- Change the content of a signed or sealed document (sealed plans, signed contracts, permits). Those get a sidecar only, not a new text layer.
- Use fuzzy matching to choose an ID.
- Delete anything.

## Proof for DONE (Phase A)

1. The count with a denominator.
2. The proposed-renames CSV and the 25 samples.
3. The number of sidecars written, and the error list.

RAMBO: when will Phase A's count and the 25 samples be in VTES-Outbox?
