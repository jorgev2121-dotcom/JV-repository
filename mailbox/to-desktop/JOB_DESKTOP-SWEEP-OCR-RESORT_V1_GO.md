# JOB_DESKTOP-SWEEP-OCR-RESORT_V1_GO

To: 🖥️ CODE · DESKTOP EXECUTOR (RAMBO) on Jorge's PC. Backup lane: Cowork.
From: ☁️ Cloud window, for Jorge Valdes
Date: 2026-10-25
Tracking: TRK-2026-10015 (admin band) · #DesktopSweep #OCR #Filing
Paste pointer: PASTE-D-069
Return path: `REPLY-TO-CHAT_JOB_DESKTOP-SWEEP-OCR-RESORT_V1.md` in VTES-Outbox, with proof. A receipt-only reply counts as nothing.

---

## What Jorge asked for (his words, condensed)

Take every icon, shortcut, file and folder on the Desktop, including subfolders. Run the OCR protocol on all of them. Sort them by group, rename them to a searchable naming convention, and move them to an appropriate place (Google Drive preferred). Empty folders and old copies may go to quarantine. **Only the icons Windows or a program insists on keeping may stay on the Desktop.**

## Two phases. Phase 2 does not start without Jorge's YES.

Moving, renaming or filing a client document is **RED** under the charter: a misfile is found months later by the client. So this job runs in two phases.

- **Phase 1 (GREEN; may run tonight):** inventory, OCR, propose. Nothing is moved, renamed or deleted.
- **Phase 2 (RED):** execute the move list only after Jorge says YES to it. He answers once for the whole list, not item by item.

---

## PHASE 1 — inventory, OCR, proposal (GREEN)

Fan this out per charter Rule 5: work in batches and write each item's result to the registry the moment it's done. Never hold the results in memory.

1. **Rollback first.** Before anything else, write `Rollback_DesktopSweep_2026-10-25_HHMM.ps1` to `C:\Users\JV\OneDrive\Documents\Reports\Undo_Manifests\`.
2. **Inventory.** Every item on the Desktop, in all subfolders, for both `C:\Users\JV\Desktop` and `C:\Users\JV\OneDrive\Desktop` (and the Public Desktop, read-only). Record for each:
   - path, type, size, created and modified dates;
   - a SHA-256 hash for files;
   - the target for shortcuts (.lnk / .url) and whether that target still exists.
3. **OCR protocol** on every PDF, image and scan:
   - Write a `.SEARCH.txt` sidecar next to the inventory copy (in the registry folder, not on the Desktop).
   - Extract identifiers: TRK and OPH numbers, folio, permit, case or process numbers, full street addresses, and client and party names.
4. **Classify each item into ONE group:**
   - **Files:** 01 Jobs (matched) · 02 Jobs (unmatched / orphan) · 03 Money & Banking · 04 Personal & Medical · 05 Reference & Manuals · 06 VTES System & Scripts · 07 Media · 08 Other.
   - **Shortcuts:** AI & Agents · Jobs & County · Office & Documents · Money & Banking · Browsers & Web · VTES Panels · Utilities & System.
5. **Job matching: exact identifiers only.** A file goes to a job folder only on an exact TRK, folio, permit or case number, or full address. **Fuzzy matches are for searching only, never for filing** (charter §9; the 14598 SW 110 ST near-miss). Anything not exactly matched gets an **OPH-2026-NNNN** from the orphan ledger, not a TRK.
6. **Quarantine candidates** (proposed only):
   - empty files and folders;
   - exact duplicates (same hash: keep the newest, quarantine the rest);
   - older versions where a newer `vN` sits next to them;
   - broken shortcuts whose target is gone.
7. **Mandatory-icon test.** Mark an item "stays" only if it's a Windows system icon (Recycle Bin, This PC) or a program puts it back by itself after removal. Test that by moving the item to quarantine, then checking again after a restart or after 30 minutes.
8. **Write the proposal**, `PROPOSAL_DESKTOP-SWEEP_2026-10-25.csv` plus a short readable `.md`, to VTES-Outbox. One row per item: current path → proposed new name → proposed destination → group → reason → evidence (identifier found).
   - **Lead the .md with totals** that carry a denominator, for example "412 items: 37 job files matched, 88 orphans, 21 to quarantine, 9 stay."

## Destinations (Cloud's choice, per Jorge's "up to you")

- **Job files (exact match):** `G:\My Drive\01-JOBS\<TRK>\<party subfolder>\`, the existing job tree.
- **Unmatched files:** `G:\My Drive\00-INTAKE\DESKTOP-SWEEP_2026-10-25\<NN Group>\`. Each gets an OPH number and moves to its job later, once it's matched.
- **Personal, money and medical:** `C:\Users\JV\OneDrive\Documents\<NN Group>\`. That's the master filing cabinet for non-job files (charter §9). Keep these off the shared job Drive.
- **Shortcuts:** `%APPDATA%\Microsoft\Windows\Start Menu\Programs\VTES Launchpad\<Group>\`.
  - Windows search then finds every one by name: Jorge presses the Windows key and types.
  - A copy of the folder is kept at `G:\My Drive\09-LAUNCHPAD\` as a backup.
  - Optional: one "VTES Launchpad" toolbar on the taskbar. It sits on the taskbar, not the Desktop.
- **Quarantine:** `G:\My Drive\_QUARANTINE\DESKTOP-SWEEP_2026-10-25\` keeps the original folder paths. **Nothing is deleted.** Deletion is Jorge's decision (charter: DISCARD-PENDING).

## Naming convention

- **Files** use the charter grammar: `DATE _ TRK-or-OPH _ TYPE _ DESCRIPTION _ vN.ext`.
  - Example: `2026-07-29 _ TRK-2026-1262 _ Permit _ Permit Card Unit 143 _ v1.pdf`
  - Example: `2026-10-25 _ OPH-2026-0108 _ Letter _ County Notice Unknown Property _ v1.pdf`
  - DATE is the document's own date if OCR finds one; otherwise the file's modified date.
- **The ID also goes inside the file:** the footer stamp, or hashtags in the `.SEARCH.txt`. Never in the filename only (charter §9.3).
- **Folders:** `NN Group Name`, for example `03 Money & Banking`.
- **Shortcuts:** `Group - Name`, for example `AI - Claude Desktop` or `County - Miami-Dade Permit Search`.

---

## PHASE 2 — execute the proposal (RED: needs Jorge's typed YES on the proposal)

1. Copy each item to its destination, then **verify the copy's hash matches**. Only then remove the Desktop original.
2. Shortcuts: recreate each in the Launchpad, then click-test that it opens.
3. Quarantine moves keep the original path inside `_QUARANTINE`.
4. After the sweep, the Desktop holds only the "stays" items. **Take a screenshot of the Desktop afterwards.**
5. Extend the rollback script with every actual move, so the whole thing can be undone with one run.
6. Log each action, per the charter: timestamp, TRK or OPH, action, agent, undo path.

## Safety (always)

- **SPEECHIFY-PRIORITY-01:** don't hold the clipboard; pause if Speechify is reading.
- Don't touch files that are open or locked. List them and leave them where they are.
- Don't move items inside Google Drive's or OneDrive's own system folders.
- Never type, store or show passwords. If a file holds credentials, quarantine-propose it and flag it to Jorge in one line.
- If the Desktop is redirected into OneDrive, say so in the reply. Moving those items changes OneDrive sync.

## Proof for DONE

- **Phase 1:** the proposal CSV and .md in VTES-Outbox, with totals, plus the rollback script path.
- **Phase 2:** a before and after screenshot of the Desktop, a hash-verified move log, the click-test results for the Launchpad shortcuts, and the quarantine count.

Close out in three states only: DONE, BLOCKED or IN PROGRESS.

RAMBO: when will Phase 1's proposal be in VTES-Outbox?
