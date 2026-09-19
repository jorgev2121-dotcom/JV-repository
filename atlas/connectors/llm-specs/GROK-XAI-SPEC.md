# ⚫ xAI / Grok (+ X Premium) — SPEC
**TRK-2026-9800 · 2026-09-19 · from Stripe invoices in Gmail.**

## Current status
- **Active — two separate bills** under jorgev2121@gmail.com:
  1. **Grok / SuperGrok** — monthly Stripe receipt ~the **17th** (acct 1Pksdd…).
  2. **X / X Premium** — monthly Stripe receipt ~the **11th** (acct 1Ika5J…).
- ⚠ Prior finding (TRK-2026-9748): a **Grok API key exists** on the PC (`XAI_API_KEY`) but the **model string is retired** → API calls bounce until RAMBO updates it. So Grok-via-API is NOT currently usable for failover.

## Subscription type / pricing
- SuperGrok (app) + X Premium (app). **Exact $ TO-VERIFY** from the Stripe receipts (open the 9/17 and 9/11 emails for amounts).

## Reset mechanics
- **TO-VERIFY** at console.x.ai (API) and the X app tier. Do not assert from memory.

## Shortcuts (and what they link to)
- Usage/billing → console.x.ai · App tier → X Premium settings.

## Token / overage spend
- API = metered (currently dead per retired model string). App tiers = flat monthly.

## 1P ref
- `1P: xAI / Grok`, `1P: X / Twitter`. API key in env/1Password only.

`TRK-2026-9800 · v1 · p001 · 2026-09-19 · original · #xai #grok #x-premium`
