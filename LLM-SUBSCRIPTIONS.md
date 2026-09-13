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

## Fable watch (owner directive 2026-09-13)
**Confirm `claude-fable-5-1` (Fable) is rarely used** — check the per-model breakdown on the Claude usage page.
If any window is defaulted to Fable unintentionally, flag it (this is the RI-008 class: a window silently pinned
to the wrong model). This Cloud session runs **Opus**, not Fable.

#llm-subscriptions #contact-sheet #usage #balances #1password-ref #TRK-2026-9783
`TRK-2026-9783 · v1 · p001 · 2026-09-13 · CURRENT`
