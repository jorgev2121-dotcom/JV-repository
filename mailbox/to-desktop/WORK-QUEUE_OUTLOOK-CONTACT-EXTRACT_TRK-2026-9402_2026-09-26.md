# OUTLOOK CONTACT EXTRACTION WITH OCR PROTOCOL — TRK-2026-9402
**Fired by:** Cloud Session · **Date:** 2026-09-26 · **Status:** QUEUED — Execute in parallel with Gmail extraction (TRK-2026-9401)
**Parallel job:** GMAIL-CONTACT-EXTRACT (cloud, concurrent)
**Output destination:** `G:\My Drive\VTES-Outbox\OUTLOOK-CONTACT-EXTRACT_TRK-2026-9402_2026-09-26.md`

---

## TASK SUMMARY

Extract every contact from `Jorge@teamusasales.com` Outlook mailbox (all folders, all time). **Apply the enhanced OCR protocol to all email bodies and attachments.** AI determines contact category — ignore supplied labels. Write master contact extract with OCR'd text, hashtags, and forensic trail. This job runs in parallel with cloud's Gmail extraction; results consolidate in VTES-Outbox.

---

## EXTRACTION SCOPE

**Mailbox:** `Jorge@teamusasales.com` (Outlook)  
**Folders:** All (Inbox, Sent, Archive, subfolders, all time)  
**Fields per email:** To, From, CC, BCC (if readable), Date, Subject, Body, Attachments (count + names)

**Contact parse:** For each email, extract:
- **Name** (from display name, normalize whitespace)
- **Email address** (validate domain, lowercase, deduplicate within Outlook)
- **Phone** (if present in From-name, signature block, or attachment filename; support 10-digit US + international formats)
- **Company** (extracted from email domain if corporate, or from contact record if available)
- **Role transitions** (cc on early emails → to/from on later emails on same TRK = role escalation, flag it)

---

## OCR PROTOCOL — APPLY TO BOTH EMAIL BODY AND ATTACHMENTS

**This protocol is identical on desktop and cloud.** Results must be report-ready and synchronized.

### 1. EMAIL BODY OCR
- **If body contains scanned images or embedded PDFs:** OCR the image using Tesseract or Windows OCR.
- **If body is plain text:** pass through (already searchable).
- **Output:** Plain-text extraction with all scanned content converted to readable text. Preserve formatting and line breaks where present.
- **Stamp:** Include original email date + TRK number in extraction header.

### 2. ATTACHMENTS — FULL OCR PROTOCOL

For each attachment:
1. **Identify type** (PDF, image, Office doc, archive).
2. **If PDF or image:** Apply enhanced OCR pipeline:
   - Assess (resolution, skew, contrast, bleed-through).
   - Deskew + crop using ImageMagick (`-deskew 40%`) or ScanTailor Advanced.
   - Grayscale + contrast (`-normalize`).
   - Adaptive binarize (`-lat 25x25+10%`) — NOT global threshold.
   - Denoise (`-despeckle`, once only).
   - Upscale only if <300 DPI; skip if possible.
   - **OCR to searchable PDF + .txt sidecar (Tesseract: `tesseract clean.png out pdf txt --oem 1 --psm 6`).**
3. **If Office doc (docx, xlsx, pptx):** Extract text directly (no OCR needed; already digital text).
4. **If archive (zip, rar, 7z):** Enumerate contents, note compression; do not extract (preserve original).

### 3. IDENTITY STAMP — CRITICAL

Every OCR'd attachment must carry:
- **TRK number** in the filename: `2026-09-26_TRK-2026-NNNN_EmailFrom_ContactName_AttachmentType_v1.pdf`
- **Footer stamp** on every OCR'd page: `TRK-2026-#### · v1 · pNNN · 2026-09-26 · CURRENT`
- **.SEARCH.txt sidecar** with the same TRK stamp in the filename, containing full extracted text.
- **Hashtags injected into sidecar:** `#TRK-2026-NNNN`, `#EMAIL-domain.com`, `#CONTACT-FIRSTNAME-LASTNAME`, `#PHONE-###-###-####`, `#COMPANY-NAME`, `#DATE-2026-09-26`

### 4. OUTPUT FORMAT

Write one `.md` report per contact group (contacts on the same TRK are grouped). Format:

```
## Contact: John Smith
**Email:** john.smith@permits.miamidade.gov  
**Phone:** 305-555-0123 (Category: CORPORATE — recurring Miami-Dade area code, business hours pattern)  
**Company:** Miami-Dade County  
**TRK history:** TRK-2026-1262 (cc, Jan–Feb 2026; then to/from Mar–Sep 2026 = role escalated)  

### Emails on TRK-2026-1262
| Date | Subject | Attachments | Status |
|---|---|---|---|
| 2026-01-15 | Permit questions | 2 PDFs, 1 image | OCR complete, 3 sidecars written |
| 2026-03-20 | Permit issued | 1 PDF | OCR complete, 1 sidecar written |

### OCR Summary
**Total attachments processed:** 3  
**Total extracted text:** 47 KB across 3 sidecars  
**Hashtags injected:** #TRK-2026-1262, #EMAIL-miamidade.gov, #CONTACT-JOHN-SMITH, #PHONE-305-555-0123, #COMPANY-MIAMI-DADE
```

---

## AI-DETERMINED CONTACT CATEGORIZATION

**Ignore supplied labels. AI determines category based on pattern:**

**PHONE CATEGORY** (AI learns from call patterns + associated metadata):
- **CORPORATE:** Recurring business-hours calls, associated with company domain (@company.com), shared extensions, callback numbers.
- **PERSONAL/CELL:** Evening/weekend calls, unique number (appears once or twice), associated with individual name not company.
- **GOVERNMENT:** County/city area code + known government department, published contact number.
- **UNKNOWN:** Cannot determine; flag as such.

**EMAIL CATEGORY** (AI learns from domain + frequency):
- **ROLE ACCOUNT:** `permits@`, `info@`, `support@` — shared mailbox, multiple people may use.
- **INDIVIDUAL:** `firstname.lastname@domain` or `first.last@domain` — one person.
- **CORPORATE DOMAIN:** Associated with company (your CRM may have this).
- **GOVERNMENT DOMAIN:** .gov, .edu, recognized municipal patterns.
- **FREE EMAIL:** Gmail, Yahoo, Outlook.com — lower confidence on sender identity.

**COMPANY CATEGORY:**
- Extract from email domain (@company.com) if available.
- If blank, check Outlook contact record or infer from context.
- AI flags guesses.

---

## EXECUTION CHECKLIST

- [ ] **Start time recorded** (metadata for sync report).
- [ ] **All folders enumerated** (Inbox, Sent, Archive, subfolders, any custom folders).
- [ ] **Email count recorded** (denominator for progress tracking).
- [ ] **Contact extraction complete** — deduplicated by email+phone.
- [ ] **OCR pipeline run on all attachments** — Tesseract sidecars + footer stamps + hashtags.
- [ ] **OCR'd email bodies** (if any scanned content).
- [ ] **Contact grouping by TRK** — all emails for TRK-2026-1262 together, etc.
- [ ] **Report written** — `OUTLOOK-CONTACT-EXTRACT_TRK-2026-9402_2026-09-26.md` with contact list + OCR summary.
- [ ] **All sidecars to VTES-Outbox** — `.SEARCH.txt` files alongside OCR'd PDFs, TRK-stamped.
- [ ] **Completion timestamp recorded** — start, contact count, attachment count, sidecar count, end time.

---

## SYNC AND CONSOLIDATION

When both Gmail (TRK-2026-9401, cloud) and Outlook (this job, desktop) complete:
1. Both files land in `VTES-Outbox` timestamped.
2. Cloud runs consolidation: merge by email+phone identity, unify TRK history.
3. Output: `CONTACT-GRAPH-UNIFIED_TRK-2026-9403_2026-09-26.md` — master contact list, report-ready.

**This is forensic email indexing; every byte must be traceable and durable.**

---

**Questions:** Is there anything unclear about the OCR protocol or contact categorization? Ready to start?
