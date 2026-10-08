# OCR always on — three options (Rule 4: RI-015 has recurred five or more times, so no patch)

Owner complaint 2026-10-08 (RQ-20261008-14): OCR is not running 24/7. Goal: a background OCR
engine that never stops, on a cheap lane, feeding two "aisles": INTAKE (original + snapshot
images) and FINISHED (full transcription + enhanced images), so report-building can pull
ingredients from known shelves by TRK and document type.

## Root cause (ROOT CAUSE answers)

1. **What is causing it:** OCR runs as homemade Windows scheduled tasks. They get disabled
   (mass disable 2026-09-24: 85 of 119 tasks) or never exist (VTES-LOCAL-POLLER had no task at
   all), and nothing announces it. OCR coverage today: about 4% of PDFs (PROJECTS page).
2. **Why previous fixes failed:** each fix re-enabled a task by hand (Tier 1). The PC's own
   safety check blocks Claude from creating durable background jobs ("Unauthorized
   Persistence"), so the real fix was never allowed to finish without Jorge present.
3. **Options, ranked by how long they will survive:**

### Option A — Replace with Paperless-ngx (Tier 2, remove the homemade pipeline). RECOMMENDED
Free, widely used document system: watches a folder, OCRs everything, keeps the ORIGINAL (intake
aisle) and an OCR'd ARCHIVE copy with full text (finished aisle), tags, document types, custom
fields (TRK, folio, address), versions, and an API the report builder can query. Already
installed on the PC (Docker, stopped) and staged as a pilot.
- **Failure mode:** Docker Desktop not running after a reboot or update.
- **Guard:** Docker set to start at login, plus Option C.
- **Lifespan:** years. Maintained open-source project.
- **Needs Jorge:** one yes to start Docker and let it start with Windows (persistence).

### Option B — Replace with OCRmyPDF run as a Windows service (Tier 2, lighter)
Free command-line OCR, run by one service that watches the landing folders. No Docker.
- **Failure mode:** the service gets stopped or disabled, the same shape as the tasks.
- **Lifespan:** months, only as long as someone watches it. No tags, no catalog, no API, so the
  "grocery store" catalog still has to be built by hand.
- **Needs Jorge:** one yes to create the service (persistence).

### Option C — Enforcement watchdog (Tier 3, REQUIRED with A or B)
Every 15 minutes the PC writes `OCR-HEARTBEAT.json` to Drive: documents OCR'd so far, queue
size, last file done. **The check is "is the count growing", never "is a process running"**
(RI-002). Three flat readings mean red on the panel and a line in the daily HEALTH report.
Cloud also reads the heartbeat's age from Drive at every check-in, which makes it a check from
outside the PC, the one thing RI-015 never had.
- **Failure mode:** the watchdog task itself disabled; caught by cloud's outside check.
- **Lifespan:** as long as cloud check-ins run.

## Recommendation
**A + C.** Option B only if Jorge does not want Docker running at all.
Until he answers, RAMBO runs OCR overnight as a GREEN night job (writes new `.SEARCH.txt`
sidecars only; TRK known from the folder path), with per-item results and a denominator.

## Note on Docker and the launcher
Earlier today Dashy was turned down for the launcher because it needs Docker always on. If Docker
becomes always-on for Paperless, that objection weakens, but the launcher still belongs inside
the panel, which is Jorge's home.

OCR-ALWAYS-ON · v1 · 2026-10-08 · CURRENT
