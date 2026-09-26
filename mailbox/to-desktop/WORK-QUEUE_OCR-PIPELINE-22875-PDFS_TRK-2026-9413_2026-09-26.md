# FULL OCR PIPELINE EXECUTION — 22,875 PDFs — TRK-2026-9413
**Fired by:** Chat discussion · **Date:** 2026-09-26 · **Status:** QUEUED
**TRK:** TRK-2026-9413
**Priority:** HIGH — Core to forensic rebuild
**Executor:** DESKTOP

---

## TASK SUMMARY

Execute the enhanced OCR protocol (PROPERTY-TAX-JACKET-ENHANCEMENT-PROTOCOL.md, 8-step pipeline) against all 22,875 local PDF documents. The protocol cleans each page (deskew, grayscale, adaptive threshold, denoise) and produces searchable PDF + `.txt` sidecars stamped with TRK, page identity (pNNN), and hashtags.

---

## SCOPE

**Execution:**

1. **Batch processing:** 
   - Input: all PDF files under local job folders (G:\My Drive\01-JOBS\*)
   - Enhancement pipeline per PROPERTY-TAX-JACKET-ENHANCEMENT-PROTOCOL.md
   - Output: `ENHANCED_vN.pdf` + `_vN.SEARCH.txt` sidecars, TRK-stamped

2. **Denominator:** 22,875 files (from TRK-2026-9938 census)

3. **Nightly execution:** Queue into OVERNIGHT-QUEUE.md as GREEN work (read-only source, writes to new destination)

4. **Progress tracking:** Result file grows per page; heartbeat monitors for stalls

5. **Expected output:**
   - 22,875 searchable PDFs (indexed for forensic rebuild)
   - 22,875+ sidecar files (OCR text, TRK-stamped)
   - Final report: "22,875 of 22,875 PDFs processed, N blanks dropped, searchable layer added"

**Reference:** PROPERTY-TAX-JACKET-ENHANCEMENT-PROTOCOL.md, OVERNIGHT-QUEUE.md (Rule 8), TRK-2026-9938 (denominator)

---

## EXECUTION CHECKLIST

- [ ] Input folder enumerated (22,875 count verified)
- [ ] Enhanced OCR pipeline script deployed on desktop
- [ ] Test run on 10 files (2 per job folder) verified
- [ ] Batch job configured for nightly execution
- [ ] Progress heartbeat verified (output file growth, not process existence)
- [ ] First night run (100+ files) completed with results logged
- [ ] Quality spot-check: 5 random enhanced PDFs reviewed for readability
- [ ] Final report generated with denominator + completion count

---

## TIMELINE

**Duration:** ~2-3 weeks (22,875 files at ~5-10 sec/file unattended)  
**Start:** Queue to OVERNIGHT-QUEUE immediately; execution starts next night  
**Parallel:** Cloud does TRK-2026-9414 (consolidation) while desktop OCRs

---

## DEPENDENCIES

- PROPERTY-TAX-JACKET-ENHANCEMENT-PROTOCOL.md (8-step pipeline spec)
- ImageMagick + Tesseract installed and operational on desktop
- TRK-2026-9938 (denominator: 22,875 confirmed)

---

**Reason for existence:** 22,875 documents exist locally. Without OCR, they are not searchable. Without the protocol, they are lost after filing.

---

**Questions:** Ready to queue this to overnight and start the forensic rebuild pipeline?
