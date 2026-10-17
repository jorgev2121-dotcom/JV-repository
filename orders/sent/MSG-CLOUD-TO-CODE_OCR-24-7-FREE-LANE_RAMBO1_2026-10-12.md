# MSG-CLOUD-TO-CODE — OCR RUNNING 24/7 ON THE FREE LANE (Rambo 1 builds it once; after that it costs zero AI usage)
From: ☁️ CODE · CLOUD / WEB EXECUTOR · 2026-10-12
Lane: CLAUDE ONLY to BUILD (needs G:\). After that it runs as a plain Windows scheduled task: no Claude, no Codex, no tokens.
Queue position 2b: run right after the panel step 0.
Jorge, 2026-10-12: "Why have you not assigned Cowork or similar to run tasks that should be running 24/7, for example the OCR protocol?"

## Why not Cowork (the cloud's answer to Jorge)
Cowork is a chat window. It works only while a conversation is open, it can't receive orders from the bus, and it spends the same Claude allowance. OCR needs a machine that never sleeps and never runs out, which means a free script on the PC.

## What the cloud found
- In Drive, "OCR-HEARTBEAT.json" is an empty FOLDER created 10-10, not a heartbeat file. Nothing is reporting OCR.
- No OCR output in Drive since 10-05.
- NIGHT-PROTOCOL section 5: Queue A (PDFs already inside 01-JOBS\<TRK> folders) is GREEN. Queue B stays held until the intake stamp (TRK-2026-9060) exists.
- RI-015: four OCR tasks once sat disabled for weeks unnoticed.

## Build (back up anything you change as .bak-20261012)
1. Check what's installed: OCRmyPDF, Tesseract, Ghostscript. Use the existing free stack (PROPERTY-TAX-JACKET-ENHANCEMENT-PROTOCOL.md). Install nothing new without reporting it first.
2. One script, OCR-QueueA-Runner.ps1, run by one task, CU-OCR-QueueA-24x7. It starts at logon, restarts on failure, and runs below-normal priority so the PC stays usable.
   - It walks G:\My Drive\01-JOBS — ONE SOURCE OF TRUTH\<TRK folders> only (Queue A), oldest unprocessed first.
   - It writes ONLY new files: `<name>.SEARCH.txt` next to each PDF, with the TRK (from the folder path) stamped on line 1. It never changes, moves or renames a PDF.
   - It skips any PDF that already has a .SEARCH.txt, so it resumes after a crash.
   - It logs one line per file to OCR-QueueA-LOG.csv (time, TRK, file, pages, characters, ok/fail) as each one finishes.
3. **Heartbeat:** every 5 minutes it writes G:\My Drive\VTES-Outbox\_OCR-HEARTBEAT.md with the time, files done today, files left (a real count), current file, and the last error. Delete the empty "OCR-HEARTBEAT.json" folder only if it is empty; otherwise leave it.
4. Feed the panel: the panel feeder shows the OCR line "N of M done, last at <time>". Stale for more than 15 minutes shows red.
5. Quality check: 1 in 20 files is checked by the cheapest model, as the 9952e directive says. Skip this if it would need an API key.

## Proof
EXECUTED_RAMBO1_OCR-24-7_2026-10-12.md with:
- The task name, state and next run.
- The first 20 log lines.
- Two heartbeat times 5 minutes apart, with the count going up.
- The denominator: "N of M Queue A PDFs".
Undo: disable the task. The .SEARCH.txt files are new files; delete them by the log list if you ever need to.

Is the OCR count going up every 5 minutes?
