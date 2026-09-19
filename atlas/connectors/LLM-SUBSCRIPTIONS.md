# LLM SUBSCRIPTIONS — contact sheet + usage/balance module (one block per provider)
**TRK-2026-9783 (admin band) · owner directive 2026-09-13. The token agent (Conductor Part 1) reads this to go straight to each provider's usage/balance without relearning it.**

## ⛔ SECURITY LINE — READ FIRST (charter Art.5 + Rule-10 keys rule)
- **NO passwords, API keys, full card numbers, or full account numbers in this file, the repo, a mailbox, or chat.**
  Those live in **1Password only.** This sheet holds a **1Password item reference** (e.g. "1P: Anthropic Billing"),
  never the secret itself.
- **What MAY live here (non-secret):** provider, plan name, monthly $, the login **email** (identity, OK),
  a **masked** account id (last-4 only if needed), how to check usage, how to check balance, support contact, access scope.
- **Reading a usage/balance = GREEN** (read-only survey, Rule 9). **Changing a plan / paying = RED** (owner click).
  A bot logging in via 1Password to READ is fine; it never stores what it read as a credential, and never in the repo.

## How to pull USAGE per provider (VERIFY per account — do NOT assert from memory; RAMBO confirms in the live account)
| Provider | Usage check (to VERIFY) | Balance/plan check (to VERIFY) |
|---|---|---|
| **Anthropic / Claude** | `/usage` in the Code CLI (desktop); claude.ai → Settings → Usage | claude.ai billing; Console usage for API. **Owner confirmed 2026-09-13: usage looks fine.** |
| **OpenAI / ChatGPT** | platform.openai.com usage (API); ChatGPT app for the Plus/Pro cap | platform billing page | 
| **Google / Gemini** | AI Studio / Google Cloud console (API); Gemini app / Google One for the subscription | Google billing |
| **xAI / Grok** | console.x.ai usage/billing (API); X Premium for the app tier | console.x.ai billing |

**All four rows are UNVERIFIED placeholders** until RAMBO opens each live account and confirms the exact page/method,
because (a) Cloud is egress-blocked from these sites and (b) per the claude-api rule we don't state LLM limits from memory.

## Per-provider CONTACT SHEET (RAMBO to scrape via 1Password login; fill NON-SECRET fields only)
For each: **Provider · Plan name · Monthly $ · Billing cycle · Login email · Account id (masked) · Usage method ·
Balance method · Support contact · Access/scope (what it unlocks) · 1P item ref · #hashtags.**

- **Anthropic / Claude** — TO SCRAPE. `#LLM-subscription #anthropic #claude`
- **OpenAI / ChatGPT** — TO SCRAPE. `#LLM-subscription #openai #chatgpt`
- **Google / Gemini** — TO SCRAPE. `#LLM-subscription #google #gemini`
- **xAI / Grok** — TO SCRAPE. `#LLM-subscription #xai #grok`

## 💳 BILLING RECONCILIATION from Gmail invoices (☁️ Cloud, 2026-09-19, TRK-2026-9047) — non-secret; last-4 only
**OpenAI — THREE separate billing lines under jorgev2121@gmail.com (acct 8c5603d8…):**
1. **ChatGPT Plus** — **$20.00/mo**, auto-renew monthly, since **Nov 29 2025** (order sub_1SYypr…), card **Visa-0012**. Confirmed by receipt.
2. **ChatGPT Business** ("Jorge Valdes's Workspace") — onboarded **~Sept 7–9 2026**; seats + shared credit pool (Codex/Work/Excel/Agents). **Screenshot 2026-09-19: "out of Codex and Work usage / out of credits."** ⚠ No Business receipt found in Gmail — **price/seat-count UNVERIFIED; confirm in ChatGPT → Settings → Billing.**
3. **OpenAI API** (pay-as-you-go) — **$10.00** top-up **Jul 27 2026**, card ending **0058**, moved to **Usage Tier 1**. Separate from the ChatGPT subs.

**Cross-referenced OTHER AI/related subs found in the same Stripe invoices (bonus):**
- **xAI / Grok (SuperGrok)** — monthly receipts ~the **17th** (acct 1Pksdd…). Active.
- **X / X Premium** — monthly receipts ~the **11th** (acct 1Ika5J…). Active. (So X Premium AND SuperGrok are BOTH billing.)
- **Speechify** — receipt Jul 15 2026. **PLAUD** — trial Jul 16 → paid Jul 23 2026.
- Non-AI seen: JAM Software (TreeSize/UltraSearch), Future Share LLC.

**OpenAI RESET MECHANICS (WebSearch 2026-09-19 — verify on the live Usage dashboard):**
- Business seats include usage; when exhausted, the **workspace credit pool** covers overflow (Codex/Work/Excel/Agents share ONE pool).
- **Two independent windows: a ~5-hour rolling window + a weekly window.** A weekly reset refills weekly only; the 5-hour returns on its own rolling clock.
- **"Out of credits" ≠ a window limit** — the paid credit pool is empty. It refills only by **adding credits (RED/spend)** or at the **monthly workspace renewal** (~Oct 7–9, one month after onboarding).
- Goodwill resets happened **Aug 8 / Aug 29 / Sept 7 2026** but are **one-time, not guaranteed.**
- **Contrast with Claude:** Claude's plan usage auto-resets on a rolling window at no extra cost; ChatGPT's free windows also auto-reset, but the Business **credit pool is pay-as-you-go** and does not refill for free.

## Fable watch (owner directive 2026-09-13)
**Confirm `claude-fable-5-1` (Fable) is rarely used** — check the per-model breakdown on the Claude usage page.
If any window is defaulted to Fable unintentionally, flag it (this is the RI-008 class: a window silently pinned
to the wrong model). This Cloud session runs **Opus**, not Fable.

#llm-subscriptions #contact-sheet #usage #balances #1password-ref #TRK-2026-9783
`TRK-2026-9783 · v1 · p001 · 2026-09-13 · CURRENT`
