# MODEL-SPLIT ARCHITECTURE — should Jorge cut $200 Claude and spread it? Deep dive.
**Cloud engineering analysis, 2026-08-26, at Jorge's request. #architecture #cost #multi-LLM #JorgeValdes**

## THE QUESTION
Reduce the $200/mo Claude Max, spread ~$100 across other LLMs — IF integration is "fairly seamless."

## THE HONEST HEADLINE
**Don't cut Claude first. Prove the offload works with FREE Gemini, THEN rebalance.**
And you don't face "Claude OR the others" — the right build is "Claude for the brain, cheap/free models
for the volume."

## 1. What the $200 actually buys, and the real options
- **Claude Max 20x ($200)** = high usage ceiling on Claude Code with Opus. This week you hit that ceiling —
  which means you're doing real volume, not that the plan is wrong.
- **You are NOT stuck at $200-or-nothing.** Claude has **Max 5x ($100)** — same Claude Code, same Opus,
  half the ceiling. So a rebalance could be: **$100 Claude (5x) + $100 (or less) across other models.**
- Realistically the "other half" is mostly FREE or cheap: **Gemini has a genuine free API tier**, **Grok
  API is cheap metered** (you have the key), GPT API is paid metered. So the split might cost **less than
  $200 total** while giving **more total capacity**, because the free/cheap models absorb the volume.

## 2. What "seamless" really means — split it in two
- **Backend model-swap = near-seamless, and 80% built already.** A router (LiteLLM, already installed on
  your desktop) exposes ONE endpoint; behind it, calls go to Claude / Grok / Gemini / GPT. Wiring the 3
  keys in is a few lines (the Grok-wiring task). Once done, calling any model is as easy as calling Claude.
- **Automatic task-routing = a real build, NOT seamless yet.** Deciding "this OCR job → Gemini, this
  analysis → Claude" and having it happen *by itself* is the **JOB-0079 pilot** — which isn't finished and
  is freeze-gated. Until it's built, YOU or the desktop route work by hand (semi-seamless).
- **Verdict:** "call any model through one door" = yes, nearly seamless. "It all routes itself with no
  human" = no, that's the pilot you haven't proven. Be honest with yourself about which you're buying.

## 3. The right architecture — route by TASK TYPE, not replace Claude
- **Claude = the brain and the QC.** Agentic work (following your charter, tool use, filing decisions,
  pushback) is where Claude is strongest and the others are weakest. Keep this on Claude.
- **Grok / Gemini = the volume grunts.** Bulk OCR, page classification, first-draft text, long-document
  reading — cheap or free, and quality is fine for grunt work. **This is the load you move OFF Claude so
  you stop hitting the limit.**
- **Gemini free tier** does the biggest chunk at $0 (huge context, good OCR). **Grok** for cheap
  high-volume. **GPT** only if you specifically want it (paid).

## 4. Cost math (honest, ranges)
- Today: **$200** Claude 20x (+ your existing SuperGrok/X/Plaud etc., separate).
- Rebalanced: **$100** Claude 5x + **$0** Gemini free + **~$5–30** Grok API metered (volume-dependent)
  + optional GPT metered. → **~$105–130/mo**, with the heavy volume offloaded.
- **Risk:** metered = variable. OCR'ing thousands of pages via API could spike a bill. **A budget cap in
  the router is mandatory** so a runaway job can't drain the account.

## 5. The risk of cutting Claude too early
If you drop to 5x but keep doing heavy *agentic* work on Claude (not moving volume to the others), you'll
hit the 5x limit **faster**, and feel worse. The rebalance only works if the volume actually moves. So
**prove the move first** on free Gemini, before you touch the subscription.

## 6. RECOMMENDATION — two phases
**Phase 1 (this week, ~$0, keep $200 for now):** wire Gemini (free) + Grok into the desktop router. Move
one real volume job — the tax-jacket OCR — onto Gemini. Measure: does Claude's usage pressure drop? It
should, at no cost.
**Phase 2 (only after Phase 1 proves it):** downgrade Claude 20x→5x, put the saved $100 toward Grok/GPT
metered + the auto-routing pilot. Rebalance from evidence, not from a promise.

**Bottom line: keep Claude as the driver, offload volume to free/cheap models first, and let the savings
follow the proof — not the other way around.**

---
*#architecture #do-not-cut-claude-first #prove-the-offload #JorgeValdes #2026-08-26*
