# OCR and tag scoreboard · 2026-10-15 · ☁️ Cloud
Plain counts from the files on record. Where a number is old, its date is given.

1. OCR text exists (any version): 3,436 sidecars for 3,858 Drive PDFs, about 89% (count of 10-12).
2. OCR at the latest protocol (TRK on line 1 + tags file): about 3%, about 94 of 3,436 (60-file sample, 10-12).
3. OCR empty or unreadable: about 14%, about 498 (same sample).
4. New OCR since 10-05: zero. The PC OCR lane has been silent for 10 days.
5. Email attachments filed from Gmail: 3 of 442+ PDF threads (10-12). Outlook, OneDrive, PaperPort, Downloads, Dropbox: not counted. They need the PC.
6. Email circle (all contacts per job, with emails and phones): 1 of 40 jobs started (Medley pilot today: 22 emails, 16 phones pulled from its 36 documents). Contact cards on file: 7.
7. Jobs fully tagged (permits, units, people, misspellings): 1 of 40 (TRK-2026-1265).
8. Jobs with a one-scroll viewer of real pages: 1 of 40 (Medley, 36 of 36 documents, 101 pages, 10-15).
9. Master index (one row per document: job, address, folio, permits, people, link): 1 of 40 jobs (Medley pilot, 36 rows, 10-15). In Medley, 19 of 36 documents carry the folio, and the address appears in 8 spellings.

## Root cause
1. There is no single index. Tags sit in sidecars, tag files, filenames and folder names, and nothing reads them all into one place that a hashtag search can query.
2. The protocol was rewritten four times (L0 to L3) and never back-filled. Each new session wrote a new rule instead of finishing the old files.
3. Scanned pages and non-Drive sources need the PC, and the PC lane keeps stopping (usage caps, disabled tasks), silently.

## Fix chosen: the master index (Tier 2, replace)
- One index row per document, filled from the OCR text that already exists. No re-OCR for the 89% that have text.
- A hashtag, address, folio, permit or name search reads only the index and builds the Orange Tree from links. No files are moved, so it is GREEN and it is not filing.
- Every protocol (OCR, email circle, orphans, PaperPort) has one job: add rows to the index.
- The panel shows the denominator: rows indexed out of documents found.
Tool: tools/master_index/extract.py. Pilot output: control-panel/master-index/TUS-26-1033.json.
