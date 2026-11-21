# OWNER-DIRECTIVE VIEW-THREE-WAYS-01 — every document can be read as one continuous file, three ways
Issued by Jorge Valdes, 2026-10-14 (Cloud session, ~10:20 AM ET). Applies to: every window and agent (Code Cloud, Code Desktop/RAMBO, Cowork, Chat, Codex, Gemini, Grok, Copilot, all bots) and every job document, without exception.
#owner-directive #view-three-ways #capsule #OCR #JorgeValdes

## What Jorge said (verbatim)
"for each of these files. Provide default method to view all as a contiguous file. In one of three options, first and default, will be the image of the document or if no image the pretty version of your transcription or explanation report. Or similar. The third and last option be the transcription from which you used OCR to compose the report. … Add as an onus directive add to protocol for all related documents without exception throughout the system. … this is a more significant major task. That I want you to monitor the progress of completion."

## The rule, in plain words
1. Every job (TRK / TUS / OPH) gets ONE continuous viewer file: `_VIEW-ALL_<job>.html` in the job's Drive folder (new file; never overwrites).
2. It opens on **View 1 — Original (default):** every document's page image (PDF / scan / photo) shown one after another, in date order, top to bottom. If a document has no image, its pretty report shows in its place.
3. **View 2 — Report:** the pretty (Orange Tree) version — our explanation/summary of each document, in the same order.
4. **View 3 — Transcription:** the raw OCR text each report was built from, in the same order.
5. Each document block shows: date · name · TRK · page count · link to the original · which views exist. A missing piece is shown as a visible gap ("no OCR text yet"), never hidden.
6. Money stays locked behind 0000 in every view. Pages with client names stay private.
7. When a document is added to a job, its viewer is regenerated (new version; old one to `_Superseded`).

## Monitoring
1. Progress is tracked with a denominator in `control-panel/VIEW-THREE-WAYS_TRACKER.md` (jobs with a viewer N of M; documents with all three views N of M).
2. The hourly runner (EXEC-01) builds viewers one helper per job (Rule 5), reports the count in BUILDER-LOG, and messages Jorge at 25 / 50 / 75 / 100%.
3. Pilot: TUS-26-1033 Medley (#medley), because it is the closest to complete.

Source: Jorge's chat message 2026-10-14 ~10:20 AM ET. #OWNER-DIRECTIVE #JorgeValdes
