# WORK ORDER — OCR sweep, everything dated after 2026… no: after 2022-01-01
**TRK-2026-9754 · issued by ☁️ CLOUD 2026-08-30 · for 🖥️ DESKTOP executor · OVERNIGHT / GREEN**

**Owner directive (verbatim):** "also run OCR protocol on everything after 01/01/2022."

## Scope — EVERYWHERE ON THE SYSTEM (owner widened it 2026-08-30: "search everywhere, on the system")
- **Where — the entire machine and every store attached to it:** all local drives (`C:\` and any
  others), the mapped Google Drive (`G:\My Drive`), **OneDrive**, **Dropbox**, the **PaperPort**
  repository, **Downloads**, **Desktop**, **OneDrive/Documents**, and any **removable / USB** drives
  currently mounted. Also **Gmail attachments** (the desktop can pull them down locally to OCR).
- **Which files:** documents with **last-modified date ≥ 2022-01-01** — PDFs and images
  (`.pdf .tif .tiff .jpg .jpeg .png .bmp .heic`) that are **scanned/image-only** (no text layer).
- **Enumerate first, then OCR:** build the full candidate list across all locations and write a
  **count** to TO-CLOUD.md *before* OCR starts, so the night has a real denominator.
- **Skip (noise, not documents — so we OCR files, not the operating system):** `C:\Windows\`,
  `Program Files\`, `ProgramData\`, `AppData\`, application install dirs, `node_modules`, `.git`,
  and anything that isn't a scanned document/image. Skip files that already have a current
  `.SEARCH.txt` sidecar or already contain a text layer; skip `_Superseded\`.

## Action (GREEN — new files only, never touch the original)
1. OCR each qualifying file (tesseract or the desktop's existing OCR tool).
2. Write a **`<filename>.SEARCH.txt` sidecar** next to it with the extracted text. **Optionally** also
   write a searchable-PDF **copy** as `<name>_OCR.pdf` — a NEW file. **Never overwrite or modify the
   original, never move/rename/delete anything.** That is the whole GREEN guarantee.
3. Where the TRK is known from the folder path, stamp it at the top of the sidecar
   (`TRK-2026-#### · OCR · 2026-08-30`) so the text is findable by tracking number.

## Run discipline (Night Protocol, Section 11)
- **One worker per folder/batch** (Rule 5), not one session grinding all of them.
- **Write each result as it completes** — a run killed at file 400 leaves 399 sidecars, never zero.
- **Heartbeat = output growth**: if the sidecar count/output file has not grown in 3 cycles, the
  worker is hung — kill it, log it, start the next batch.
- **End with a denominator**: "OCR'd X of Y files dated ≥2022-01-01," written to TO-CLOUD.md.
  A night with no counted report counts as a failed night.

## RED — do NOT do any of these (they are not part of OCR)
- No moving, renaming, filing, or deleting any file. No registry edits. No outbound anything.
- OCR only reads the original and writes a new sidecar. Filing decisions come later, by owner click.

## Dependencies / notes
- If tesseract isn't installed on the PC, install it locally first (GREEN) — do not route OCR to the
  cloud (cloud cannot reach the file trees and has no OSD/OCR here).
- This addresses the long-standing dead-OCR problem (RI-002): detect death by output growth, not by
  "a process exists."

#TRK-2026-9754 #ocr #overnight #post-2022 #green
