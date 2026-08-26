# NIGHT vs DAY — which work runs unattended, which needs Jorge (browser-aware)
**Jorge's refinement of the night protocol, 2026-08-26. Extends CLAUDE.md §11. #night-day-split #JorgeValdes**

PC stays on 24/7 (only monitors off), so the desktop CAN run overnight. But "PC is on" ≠ "everything is
night-safe." Three buckets, by REVERSIBILITY + whether a human is needed:

## 1. NIGHT — SAFE & UNATTENDED (load-bearing night work; run these FIRST)
Reliable, free, no browser, no human:
- OCR (local tesseract, $0, no Claude limit) · read/index Drive & Gmail · draft emails/invoices (HELD, not sent)
- cloud interpretation & compilation · counting/enumeration/surveys · writing to NEW files only.

## 2. NIGHT — POSSIBLE BUT FRAGILE (guardrails required; run LAST)
Public browser lookups that need NO login — county sites, Sunbiz property/entity/permit:
- Runs on the desktop's Chrome/in-app browser. This is the silent-death risk ("3 of 20").
- Mandatory: per-item results the moment each completes · a denominator (X of N) · heartbeat that kills a
  hung run · mark UNREACHED, never fake. Because it's fragile, it runs AFTER bucket 1 — if it dies, the
  night's real work is already banked.

## 3. DAY — NEEDS JORGE (cannot be automated at night)
- Any browser task with a **login / CAPTCHA / 2FA / consent screen**: QuickBooks, xAI console, Gemini key,
  banking, OAuth connectors.
- All RED: send money/email, sign, approve an invoice, move/rename/delete a client ORIGINAL.
- Phone calls (Building Support, Chapelli). Final approvals.

## THE LINE THAT WAS MISSING
**A browser task is not automatically night-safe.** A *public-lookup* browser = fragile-night (bucket 2).
A *login* browser = day-only (bucket 3). Reversibility + "does it need a human" decide the bucket, not "is it a browser."

## OPERATING RULE
Each night: run bucket 1 to completion first (reliable, free), THEN attempt bucket 2 with guardrails.
Each morning: Jorge does bucket 3 from one batched list. Nights prepare; days execute.
