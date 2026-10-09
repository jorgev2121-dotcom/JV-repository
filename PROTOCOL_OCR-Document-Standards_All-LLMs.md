# PROTOCOL: OCR and Document Scanning Standards
## Master Protocol for All LLMs — Issued 2026-10-07

**Owner Directive:** All documents that undergo OCR (Optical Character Recognition) or contain scanned content must follow standardized protocols for accuracy, searchability, and cross-referencing.

---

## 1. PRE-SCAN DOCUMENT PREPARATION

Before scanning any document for OCR:

- ✅ Ensure document is clean and legible (remove staples, tape, folds)
- ✅ Scan at minimum 300 DPI (higher for small text)
- ✅ Use black and white or color mode as appropriate
- ✅ Ensure all pages are captured in order
- ✅ Check for skew and adjust if needed

---

## 2. OCR PROCESSING STANDARDS

After scanning, during OCR processing:

### Verify Accuracy:
- ✅ Check OCR text against original document (sample check minimum 10% of content)
- ✅ Flag and manually correct all OCR errors before storage
- ✅ Pay special attention to numbers (tracking numbers, permit numbers, dates)
- ✅ Verify all hashtags/tracking numbers are correctly captured

### Common OCR Error Zones (HIGH PRIORITY CHECK):
- Numbers (especially permit numbers: BLC2026-1436 often misread as BLC2026-1433)
- Dates (9/3/2026 often misread as 9/3/2026 or 93/2026)
- Dollar amounts ($968.62 misread as $96862 or similar)
- Hashtags and special characters
- Owner names and addresses
- Legal text and signatures

---

## 3. TRACKING NUMBER VERIFICATION (CRITICAL)

**ANY document containing tracking numbers MUST have 100% verification:**

- ✅ Compare OCR text of ALL tracking numbers (#TRK-, #BLC-, #OPH-) against source
- ✅ Verify permit numbers digit-by-digit (BLC2026-1436, not 1433)
- ✅ Do not proceed if any tracking number cannot be verified
- ✅ Flag discrepancies for manual correction before filing

---

## 4. SEARCHABILITY ENHANCEMENT

After OCR is verified:

### Add Searchable Metadata:
- Document title
- All tracking numbers found in document
- Property address
- Owner name(s)
- Unit number(s)
- Document type (permit, application, invoice, etc.)
- Date range (document date, not scan date)

### Example Metadata Block:
```
DOCUMENT METADATA
Title: Extension Application for Unit 220
Tracking Numbers: #TRK-2026-1265 #BLC2026-1436
Property: #PLAZA-OF-BAL-HARBOUR #10185-COLLINS-AVE
Unit: #UNIT-220
Owner: #ADENAT-CORPORATION
Document Type: Permit Application
Date: 2026-10-07
OCR Verified: [YES/NO]
Verification Date: [DATE]
Verified By: [AGENT/LLM NAME]
```

---

## 5. SIDECAR FILES (.SEARCH.TXT)

Every scanned/OCR'd document should have a `.SEARCH.txt` sidecar file:

**Filename:** `[ORIGINAL_FILENAME].SEARCH.txt`

**Content Format:**
```
=== SEARCHABLE METADATA ===
Document: [FULL TITLE]
Date: [YYYY-MM-DD]
Tracking Numbers: [ALL TRACKING NUMBERS]
Property: [PROPERTY NAME]
Address: [FULL ADDRESS]
Units: [ALL UNIT NUMBERS]
Owners: [ALL OWNER NAMES]
Permit Numbers: [ALL PERMIT NUMBERS]
Document Type: [TYPE]
Pages: [TOTAL PAGES]

=== EXTRACTED TRACKING NUMBERS (VERIFIED) ===
#TRK-2026-1265
#BLC2026-1436
#UNIT-220
#PLAZA-OF-BAL-HARBOUR
#10185-COLLINS-AVE
#ADENAT-CORPORATION

=== OCR VERIFICATION ===
Status: VERIFIED / NEEDS_REVIEW
Verification Date: [YYYY-MM-DD]
Verified By: [AGENT]
Issues Found: [NONE / LIST]
Corrections Made: [NONE / LIST]

=== NOTES ===
[ANY SPECIAL NOTES ABOUT THIS DOCUMENT]
```

---

## 6. FILING STRUCTURE

Scanned documents must be filed as:

```
G:\My Drive\01-JOBS\TRK-2026-1265\02-PERMITS\

├── 2026-10-07 _ TRK-2026-1265 _ Permit _ Extension-Application-BLC2026-1436-Unit-220 _ v1.pdf
├── 2026-10-07 _ TRK-2026-1265 _ Permit _ Extension-Application-BLC2026-1436-Unit-220 _ v1.SEARCH.txt
│
├── 2026-10-07 _ TRK-2026-1265 _ Permit _ Extension-Application-BLC2026-1437-Unit-721 _ v1.pdf
├── 2026-10-07 _ TRK-2026-1265 _ Permit _ Extension-Application-BLC2026-1437-Unit-721 _ v1.SEARCH.txt
│
└── 2026-10-07 _ TRK-2026-1265 _ Permit _ Extension-Application-BLC2026-1438-Unit-PH11 _ v1.pdf
    └── 2026-10-07 _ TRK-2026-1265 _ Permit _ Extension-Application-BLC2026-1438-Unit-PH11 _ v1.SEARCH.txt
```

---

## 7. QUALITY GATES

Document fails OCR processing if:
- ❌ Any tracking number cannot be verified (100% accuracy required)
- ❌ OCR accuracy below 95% for text passages
- ❌ Date fields cannot be verified
- ❌ Owner/address information is unclear or conflicting
- ❌ No sidecar metadata file generated

**Action if gate fails:** Return document for re-scan and re-processing.

---

## 8. HAND-WRITTEN CONTENT PROTOCOL

For documents with hand-written elements:

- ✅ Scan at 400+ DPI (higher resolution for clarity)
- ✅ OCR text from printed portions only (mark hand-written areas)
- ✅ Manually transcribe any hand-written tracking numbers or critical dates
- ✅ Flag hand-written sections in metadata
- ✅ Include note: "Hand-written content: [DESCRIPTION]"

---

## 9. MULTI-PAGE DOCUMENT PROTOCOL

For documents with multiple pages:

- ✅ Verify first page completely (metadata + tracking numbers)
- ✅ Sample-check middle pages (verify page numbers, layout consistency)
- ✅ Verify last page completely (ensure complete capture)
- ✅ Check total page count in metadata vs. actual pages
- ✅ Flag any missing or duplicate pages

---

## 10. DELIVERY TO RECIPIENTS

When sending OCR'd documents to external parties (Olga, Juan Carlos, etc.):

- ✅ Send PDF version (original scan + OCR text embedded)
- ✅ Include separate sidecar .SEARCH.txt file for searchability
- ✅ In transmittal email, reference all tracking numbers (not relying on recipient to locate them)
- ✅ Highlight critical tracking numbers in email body

---

## 11. APPLICATION TO ALL LLMs

This protocol applies to:
- All Cloud sessions
- All Desktop sessions (RAMBO)
- All Cowork sessions
- Any LLM scanning or OCRing documents

**Before filing any scanned document, an LLM MUST verify all tracking numbers at 100% accuracy.**

---

## 12. VERIFICATION CHECKLIST

Before declaring OCR complete:
- ✅ All tracking numbers verified against source
- ✅ All dates verified
- ✅ All dollar amounts verified (if applicable)
- ✅ All owner names match source
- ✅ All permit numbers verified
- ✅ Sidecar metadata file created
- ✅ Document meets 95%+ OCR accuracy
- ✅ Filing structure follows standard
- ✅ All quality gates passed

---

**Effective Date:** 2026-10-07  
**Owner Authorization:** Jorge Valdes  
**Protocol Version:** v1.0
