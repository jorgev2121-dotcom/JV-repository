# AI ROUTING GUIDE — which tool for which job (Aug 2026)
**Built by a delegated agent, QC'd by cloud. #ai-routing #delegation #JorgeValdes**

## ⚠ QC note from cloud (read first — one nuance that matters)
The agent correctly says **4 of the 5 tools (Claude, ChatGPT, Gemini, Grok) have APIs and *could* be
auto-dispatched by a program.** True in general — **but I (this Claude window) do NOT have the keys/tools
wired up to call Grok, Gemini, or ChatGPT from here.** So in practice, for ME right now: **I auto-run
Claude agents; everything else you (or the desktop) drive by hand.** Wiring me to call the others would be
a real dev project (and it trips the freeze). Also: **the agent can't see what YOU actually pay for or
your usage limits — that needs your own accounts.**

## The five tools, one line each
- **Claude (me):** careful long reports, contracts, code, and **long multi-page handwriting/scans.** API ✅
- **ChatGPT:** best all-rounder; **narrow lead on raw OCR accuracy.** API ✅
- **Gemini:** biggest usable context (100s of pages), native multimodal, Google-Workspace data. API ✅
- **Grok:** live/social/real-time data, cheap high-volume. API ✅ (cheapest per token)
- **Copilot:** Office glue (Word/Excel/Outlook) — **app-only, a human drives it.** No simple API ❌

## Routing table — best → runner-up
- **Read/OCR a scanned or handwritten doc** → ChatGPT → Gemini · *(Claude/me is the pick for LONG multi-page scans)*
- **Clean up / enhance a scan (deskew, sharpen, upscale)** → **NOT any chatbot — image software** (Topaz Photo AI, Adobe, free ImageMagick/ScanTailor). Hand the LLM the *cleaned* image to read.
- **Write reports/summaries from data** → Claude → ChatGPT
- **Live scrape / browse gated sites** → *(no consumer chatbot logs into gated/paywalled sites)* — that's a **browser + human-login or a scraping tool** (your desktop's Chrome). Grok/Gemini only for open/real-time.
- **Coding / automation** → ChatGPT → Claude
- **Long-document analysis (100s pages)** → Gemini → Claude
- **Spreadsheet / number crunching** → a real **formula or script** beats any LLM's mental math; use Copilot-in-Excel or Gemini-in-Sheets to *set up* the calc.

## Plan tiers (public list prices — confirm against your own accounts)
Claude Pro $20 / Max $100–$200 · ChatGPT Plus $20 / Pro $100–$200 · Gemini Pro ~$20 / Ultra $100–$200 ·
Grok SuperGrok ~$30 / heavy $100–$300 · Copilot bundled into M365 Premium ~$20 (standalone Copilot Pro
retired, support ends 2026-08-01).

## What this means for YOUR work
- **Tax jackets:** clean the scan with **software (desktop)**, then **I read it** (I'm strong on long scans). Not a "graphics LLM."
- **County scraping:** **desktop Chrome + you** for the gated/CAPTCHA sites; a chatbot can't log in.
- **Reports/contracts:** me.
- **Number work:** a script/formula, not an LLM guessing arithmetic.

*Agent-built + cloud-QC'd 2026-08-25. Sources in the agent transcript. #ai-routing*
