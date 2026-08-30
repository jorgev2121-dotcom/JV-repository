# WORK ORDER — Alec DD books → one Outlook draft per property, popped up for review+send
**TRK-2026-9751 · issued by ☁️ CLOUD 2026-08-30 · for 🖥️ DESKTOP executor**
**Owner intent (verbatim):** "build ALL of Alec DD reports, paste the pdf attachment on Team USA
Outlook, one property per email, pop it up on the desktop so I can review and send." Plus: one-click.

**Why the desktop owns this (cloud attempted first, per EXHAUST-FIRST):** the jacket PDFs are Gmail
attachments (not in Drive); cloud has no tool to pull multi-MB mail attachments and they overflow
context. Microsoft 365 / Outlook is not connected to the cloud session. The desktop has the Gmail
attachments locally, has Outlook, and can pop windows. So the desktop builds and drafts; cloud
provides the method + analysis (below) and the 10980 template.

---

## The method is already written — follow it exactly
- **Enhancement recipe:** `.claude/skills/tax-jacket/SKILL.md` (grayscale, never binarize; de-frame
  Polaroids; straighten; darken handwriting; drop blank forms; footer stamp).
- **NEW, proven photo de-framing (use this — it removes the copier black Jorge flagged):**
  connected-component extraction of the photo off the black field, then edge-peel. Reference
  implementation is in `scratchpad/build_10980_book.py` on cloud — replicate `extract_polaroid()`
  (OpenCV: threshold 55 → OPEN(7) → CLOSE(21) → largest connectedComponentsWithStats → bbox → peel
  rows/cols >75% dark). This is what fixed the black on 10980.
- **Book template (match this structure & numbering):** the committed
  `10980_DUE-DILIGENCE_BOOK_TRK-2026-1310.pdf` — cover, index with page ranges, executive summary +
  verdict, forensic story, causes of concern, permit ledger, methodology, then the numbered
  documents. Footer stamp on every page: `TRK-#### · v1 · pNNN · 2026-08-30 · CURRENT`.
- **Per-property analysis content:** pull from `scratchpad/alec-dossier-data.md` (cloud compiled it;
  mirror into repo if not present) — folio, owner, use/year/units, values, sales, permits, and the
  CAUSES OF CONCERN already written for each property.

## The properties (from the Alec dossier — 9)
County jackets exist for the folio-30 (Miami-Dade) ones; the folio-01 (City of Miami) ones have NO
county jacket — for those, build the DD book from the county-records data + note "municipal permits
held by City of Miami, not county."

1. **TRK-2026-1534 — 1840 NW 63 ST** — folio 30-3115-005-3770 — **jacket EMAILED (Aug 24 & 27, ~6 MB)**
2. **TRK-2026-1536 — 10362 SW 180 ST** — folio 30-5032-000-1352 — **jacket EMAILED (Aug 24, ~10 MB, the big one)**
3. **TRK-2026-1286 — 11997 SW 218 ST** — folio 30-6912-004-0951 — request jacket if not already emailed
4. **TRK-2026-1535 — 18020 SW 103 AVE** — folio 30-5032-086-0020 — **county replied "NO jacket"** — DD from records only
5. **TRK-2026-1289 — City of Miami ref folio 01-4102-098-0001** — master/reference folio, run unit folios
6. **TRK-2026-1292 / 1531 — 7823 NW 5 AVE** — folio 01-3112-016-0030 — City of Miami; vacant-coded but 6bd/4ba red flag
7. **TRK-2026-1612 — 331 Tamiami Canal Rd** — folio 01-4002-003-1200 — City of Miami; FEMA AE vs X conflict
8. **OPH-2026-0007 — 10000 W Bay Harbor Dr** — Bal Harbour; county replied "no jacket"

## Steps per property (GREEN until the draft; sending is Jorge's click = RED)
1. Locate the emailed jacket PDF(s) in Gmail (`bldg jacket for <addr>` from cpl@miamidadepa.gov) OR
   the filed copy in Drive `_CLAUDE-MAILBOX`. If none and it's a folio-30 property, request it
   (PAWebMail@MiamiDadePA.gov, MUST include folio).
2. Enhance every page per the recipe above (this is where the ~70 pages for the big jackets come from).
3. Prepend cover + index + analysis + concerns + permit ledger from the dossier.
4. Save `<ADDR>_DD-BOOK_<TRK>.pdf` to Drive `01-JOBS\<TRK>\` (filing a NEW file is GREEN).
5. **Create ONE Outlook draft per property** on Team USA (jorge@teamusasales.com): subject
   `Due Diligence — <ADDR> (<TRK>)`, a short body (verdict + top concerns), the PDF attached.
   **Leave it as a DRAFT — do NOT send. Pop the draft window up** so Jorge reviews and clicks Send.
6. Write each result to TO-CLOUD.md as it completes (per-item, Rule 5).

## The "one-click" Jorge asked for
Each property = one Outlook draft, pre-filled and attached, popped up. Jorge's only action per
property is **review → click Send.** That is the one click. Do not auto-send.

## Guardrails
- Sending client-facing email is RED — every email stays a DRAFT for Jorge's click.
- Filing the finished PDF into its own `01-JOBS\<TRK>\` folder is GREEN (new file). Do NOT move or
  overwrite existing client files.
- One subagent per property (Rule 5); write results as they land.

**Cloud has already delivered the 10980 book as the working template. This order covers the rest.**
#TRK-2026-9751 #alec #due-diligence #outlook-drafts #tax-jacket
