# EMAIL FORENSIC REBUILD — PHASE 1+ — TRK-2026-9414
**Fired by:** Chat discussion · **Date:** 2026-09-26 · **Status:** QUEUED — Start after TRK-2026-9404 (Phase 0 folder structure complete)
**TRK:** TRK-2026-9414
**Priority:** HIGH — Completes email forensic pipeline
**Executor:** CLOUD

---

## TASK SUMMARY

Execute Phase 1 and beyond of the email forensic rebuild. Once emails are organized by TRK folder (Phase 0, TRK-2026-9404), apply enhanced OCR to all email bodies and attachments, inject hashtags for cross-reference, and build a searchable forensic index.

---

## SCOPE

**Phase 1 — Email Body + Attachment OCR:**

1. **Input:** Organized emails from Phase 0 (TRK folders: `_INBOX`, `_SENT`, `_OTHER`)

2. **OCR protocol (identical to PROPERTY-TAX-JACKET-ENHANCEMENT-PROTOCOL.md):**
   - Email body: if scanned image or embedded PDF, OCR to text
   - Attachments: deskew, grayscale, adaptive threshold, denoise, Tesseract to searchable PDF + `.SEARCH.txt` sidecar
   - Identity stamp: TRK number in filename + footer on every OCR'd page + `.SEARCH.txt` sidecar with hashtags

3. **Hashtag injection:**
   - `#TRK-2026-NNNN` (job)
   - `#EMAIL-domain.com` (sender domain)
   - `#CONTACT-FIRSTNAME-LASTNAME` (sender name)
   - `#PHONE-###-###-####` (if phone extracted)
   - `#COMPANY-NAME` (inferred from domain)
   - `#DATE-YYYY-MM-DD` (email date)

4. **Output:**
   - OCR'd email bodies (plain text extracted)
   - OCR'd attachments (searchable PDF + sidecar per attachment)
   - Forensic index: by TRK, by contact, by date, by hashtag

5. **Consolidation:** Merge Gmail + Outlook forensic data once Phase 0 is complete on both.

**Reference:** WORK-QUEUE_OUTLOOK-CONTACT-EXTRACT_TRK-2026-9402 (OCR protocol), WORK-QUEUE_EMAIL-CLEANUP-PHASE-0_TRK-2026-9404 (folder structure), GMAIL-CONTACT-EXTRACT_TRK-2026-9401 (contact list)

---

## EXECUTION CHECKLIST

- [ ] Phase 0 folder structure verified (Gmail + Outlook aligned by TRK)
- [ ] OCR protocol applied to first 10 emails (5 with attachments, 5 plain text)
- [ ] Hashtag injection verified (sample sidecars reviewed)
- [ ] Forensic index schema designed
- [ ] Full Phase 1 execution queued to overnight (GREEN work: read email bodies, write OCR'd text + PDFs)
- [ ] First night run (100+ emails) completed with results logged
- [ ] Cross-reference by hashtag tested (e.g., search `#TRK-2026-1262 #CONTACT-JOHN-SMITH` returns all emails on that job with that contact)

---

## TIMELINE

**Duration:** ~1-2 weeks (depends on email volume and attachment count)  
**Start:** After TRK-2026-9404 Phase 0 complete  
**Parallel:** Runs while TRK-2026-9413 (PDF OCR) processes local files

---

## DEPENDENCIES

- TRK-2026-9404 Phase 0 complete (email folders organized by TRK)
- WORK-QUEUE_OUTLOOK-CONTACT-EXTRACT_TRK-2026-9402 (OCR protocol specs)
- GMAIL-CONTACT-EXTRACT_TRK-2026-9401 (unified contact list)

---

**Reason for existence:** Emails are currently searchable only by Gmail/Outlook search. Forensic rebuild makes them findable by TRK, contact, date, and cross-linked by hashtag — building a complete job history from email alone.

---

**Questions:** Ready to queue Phase 1+ and complete the email forensic pipeline?
