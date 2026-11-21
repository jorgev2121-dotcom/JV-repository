# GW-0001 — NOT APPROVED (Jorge, 2026-09-29): "no, describe work to be completed"

Nothing bought. WORK-QUEUE item 18 is ON HOLD until Jorge approves a described scope.

**Finding cloud missed on 09-27/09-29 (Article 4 fault, logged):** a $0 path already exists.
`vts-llm-panel/vts_llm_panel.py` (TRK-2026-9200, built 2026-08-26) is a no-router dispatcher that
calls each provider directly with real fallback, Gemini free tier first. It needs only a free
Gemini key (aistudio.google.com). OpenRouter is only worth paying for if work needs a model the
free tier cannot do, or volume beyond the free limits.

Work that would run through either path (the description Jorge asked for):
1. Night-run grunt work: page classification and first-draft text for OCR'd job files (OCR itself
   stays Tesseract, zero tokens).
2. Wally pipeline: turning call-list records into call-sheet summaries.
3. QC second opinion on filing suggestions (1 in 20 sample), cheaper model than Claude.
4. Daily/weekly planner bots that currently run on x.ai Automations.
5. One endpoint all bots share, so a dead key or provider falls back instead of stopping.
