# LLM Usage Inventory — the fleet, its tanks, and what's in them

**TRK-2026-9952. Built 2026-09-23 by cloud, on Jorge's direct override of the Article-1 freeze
("overriding my own rule, execute now").** This is the shared module the Token Monitor idea
(TRK-2026-9949, itself a restatement of the FOREMAN/dispatcher spec in `ROUNDTABLE-CHANNEL.md`)
needs to run: one file any LLM session can read to know the whole fleet, not just itself.

**The race-car analogy, made literal:** for every subscription — tank size (total quota per
cycle), refuel cost (price), refuel date (reset day), current fuel (usage left right now), and
engine quality (how good it actually is at the work) — the goal is one table that answers
"who has room, and is it the right car for this job."

---

## ⚠ The honest limit, stated once

**I cannot see your billing pages or usage dashboards.** No session — cloud or desktop — has
login access to your ChatGPT, Gemini, Grok, or Copilot accounts, and Claude's own usage
figures below are drawn from what's visible in this conversation (a session-level context
counter), not your account-level plan usage. Every cell marked **NEEDS JORGE** below is a
real gap, not a placeholder I forgot — it requires you to check the source once and tell me,
or paste a screenshot. This was flagged the same way back on 2026-08-25 in
`AI-ROUTING-GUIDE_2026-08-25.md`: *"the agent can't see what YOU actually pay for or your
usage limits — that needs your own accounts."* Nothing has changed that since.

---

## The fleet

### Claude (Anthropic)
- **Your plan:** NEEDS JORGE — confirm exact tier (Pro / Max 5x / Max 20x). This session is
  configured `opusplan`, consistent with a Max tier, but the file should carry the confirmed
  plan name, not a guess.
- **Price:** Pro $20/mo · Max ~$100/mo (5x) · Max ~$200/mo (20x) — public list price, confirm
  against your actual invoice (AI-ROUTING-GUIDE, 2026-08-25).
- **Tank size (quota per cycle):** NEEDS JORGE — Anthropic states Max usage as a weekly
  rolling window measured in "hours of Claude Code" or message volume depending on plan;
  the exact number isn't visible from inside a session. Check `claude.ai/settings/usage`.
- **Reset date:** NEEDS JORGE — rolling weekly window; the exact anchor day isn't visible
  from inside a session, check the same usage page.
- **Current fuel level:** **Not the same thing as this conversation's token counter.** This
  session shows a per-conversation context budget (currently reported inline in the
  transcript) — that is this ONE conversation's working-memory limit, not your account's
  weekly usage allowance. Don't conflate the two when filling this in.
- **Quality rank (from AI-ROUTING-GUIDE):** best for long reports, contracts, code, and long
  multi-page handwriting/scans. Top pick for judgment work, per ROUNDTABLE-CHANNEL's own rule
  ("judgment/analysis on cheap models = REAL loss — keep it on Claude").

### ChatGPT (OpenAI)
- **Your plan:** NEEDS JORGE.
- **Price:** Plus $20/mo · Pro $100–200/mo (public list price).
- **Tank size:** NEEDS JORGE — check `chatgpt.com/settings` → usage/limits.
- **Reset date:** NEEDS JORGE.
- **Current fuel level:** NEEDS JORGE.
- **Quality rank:** best all-rounder; narrow lead on raw OCR accuracy; best for coding/automation
  per the routing table (ChatGPT → Claude for coding).

### Gemini (Google)
- **Your plan:** NEEDS JORGE.
- **Price:** Pro ~$20/mo · Ultra $100–200/mo (public list price).
- **Tank size:** NEEDS JORGE — check `one.google.com` → subscriptions/usage, or the Gemini
  app's account settings.
- **Reset date:** NEEDS JORGE.
- **Current fuel level:** NEEDS JORGE.
- **Quality rank:** biggest usable context window (hundreds of pages), native multimodal,
  native Google-Workspace data access. Best pick for long-document analysis (100s of pages).

### Grok (xAI)
- **Your plan:** NEEDS JORGE.
- **Price:** SuperGrok ~$30/mo · heavy $100–300/mo (public list price).
- **Tank size:** NEEDS JORGE.
- **Reset date:** NEEDS JORGE.
- **Current fuel level:** NEEDS JORGE.
- **Quality rank:** live/social/real-time data; cheapest per token of the five. Best for
  cheap high-volume grunt work, not judgment work.

### Copilot (Microsoft)
- **Your plan:** NEEDS JORGE — bundled into M365 Premium (~$20/mo) per the routing guide;
  confirm you're on that bundle, not the retired standalone Copilot Pro.
- **Price:** ~$20/mo bundled into M365 Premium.
- **Tank size / reset / fuel level:** **Not applicable the same way.** Copilot is app-only —
  Word/Excel/Outlook glue, a human drives it, no simple API, and it doesn't have a
  message-budget "tank" in the same sense as the other four.
- **Quality rank:** Office glue only — not a candidate for the Token Monitor's swap-over,
  since it can't take over an agent role unattended.

---

## What this file cannot do yet

- **It can't auto-update.** Nothing currently writes fresh usage numbers into this file on a
  schedule — filling it in is a one-time manual pass until (or unless) an API-based checker
  is built, which is itself freeze-gated behind the JOB-0079 pilot per `ROUNDTABLE-CHANNEL.md`.
- **It can't see other vendors' dashboards.** Claude agents can read this file and the rest
  of the Drive/repo shared memory autonomously; ChatGPT, Gemini, Grok and Copilot are chat
  apps that can't poll a file on their own — someone (you, or a future orchestrator) has to
  paste this in or wire an API. Same honest limit `ROUNDTABLE-CHANNEL.md` already states.

## The smallest next step

**One pass, five minutes, five tabs:** open each provider's usage/billing page, and tell me
(or paste a screenshot of) just three numbers per service — plan tier, reset date, and
percent used right now. I'll fill in the rest of this table and it becomes live from that
point on. You don't have to do all five today — even Claude's own confirmed numbers alone
would let the Token Monitor start working on the one AI doing the most agentic work right now.

---
*TRK-2026-9952 · built under explicit owner override of Article 1 · #TokenMonitor #LLMFleet #JorgeValdes*
