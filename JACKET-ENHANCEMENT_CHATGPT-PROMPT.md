# CHATGPT PROMPT — tax-jacket enhancement, run in ChatGPT's Python sandbox
**Paste this into ChatGPT (Plus), attach the three test PDFs, send. #tax-jacket #chatgpt-prompt**

---
You are running in your Python code-interpreter sandbox. I've attached three scanned property tax-jacket
PDFs (a 22-page, a 30-page, and a 2-page). Enhance them for legibility and OCR. Use only preinstalled
libraries: PyMuPDF (fitz) to render/rebuild PDFs, OpenCV (cv2), Pillow, and numpy. Do NOT try to pip-install
anything or use the internet.

GOVERNING RULE: classify each page BEFORE enhancing, and treat each type differently. A hard black-and-white
threshold that rescues a faint form will DESTROY a photograph — never binarize a photo.

HARD GUARDRAILS:
- Page count out MUST equal page count in. Never delete, drop, or reorder any page — including blanks.
- Never fabricate content on a blank or faint page. Keep blanks blank; just flag them.
- Work on copies; deliver new files, don't claim you changed my originals (you can't — they're uploads).

STEPS:
1) Render each PDF page to a 300-DPI image with PyMuPDF.
2) Classify each page as TEXT/FORM, HANDWRITING, PHOTO, or BLANK using pixel stats:
   - BLANK: very low std-dev AND dark-ink coverage < ~0.5%.
   - PHOTO: continuous tone — many distinct gray levels, few pure-black/white pixels (mid-tone heavy).
   - TEXT/FORM: near-bimodal, moderate dark coverage, straight lines.
   - HANDWRITING: sparser, softer strokes; if unsure between text and handwriting, treat as handwriting.
3) Orientation + deskew each non-blank page (detect 90/180/270 and straighten small skew with OpenCV).
4) Enhance BY TYPE:
   - TEXT/FORM: grayscale -> normalize -> ADAPTIVE threshold (cv2.adaptiveThreshold, Gaussian, block ~25,
     C ~10) -> light median denoise. Keeps table lines, rescues faint microfilm text.
   - HANDWRITING: grayscale -> CLAHE contrast -> gentle unsharp. Do NOT hard-binarize (preserve faint strokes).
   - PHOTO: grayscale optional -> recover blown highlights with a gamma/levels/sigmoidal curve. NO threshold,
     NO despeckle. Keep continuous tone.
   - BLANK: pass through unchanged; record as BLANK.
5) OCR (optional): if pytesseract AND the tesseract binary are available, OCR the TEXT/HANDWRITING pages and
   add a text layer. If tesseract is NOT installed, SKIP OCR and say so — do not fail the whole run over it.
6) Rebuild one enhanced PDF per jacket, SAME order and SAME page count (blanks in place).
7) Build a before/after montage of 3-4 representative pages per jacket (one text, one handwriting, one photo)
   so I can judge with my eyes.
8) Print a manifest table: page# | type | rotation applied | treatment | blank-flag | OCR-confidence (or "no OCR").

DELIVER as downloadable files: the three enhanced PDFs, the montages, and the manifest. Tell me plainly what
worked, what didn't (especially if OCR was unavailable), and which pages you flagged as blank.
---
