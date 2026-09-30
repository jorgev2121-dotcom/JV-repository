# OWNER DIRECTIVE OD-API-01 — No per-token API call without a dollar quote and Jorge's yes
Issued by Jorge Valdes, 2026-09-29. Applies to every Grok bot/Rockbot/Grokbot and every other
agent, script, bridge or LLM that would bill per token (xAI API first; any other API too).

## Why (researched 2026-09-29)
SuperGrok (the flat monthly subscription) covers grok.com and the phone apps only. It does not
include xAI API credits. The xAI API is billed per token, separately. A bot that uses an API key
is therefore spending real money, not drawing on the subscription.
Sources: docs.x.ai/developers/pricing; toolcolumn.com/learn/grok-subscription-vs-xai-api-pricing.

## Rules
1. **No API key is used, created, or added to any bot without Jorge's yes.** Subscription
   surfaces (grok.com, phone app) are not API and are not covered.
2. **Quote before every run.** Before any API call, the requester writes a quote in US dollars
   and submits it to Jorge. Jorge approves or denies. Silence is a denial.
3. **Tokens are never shown alone. Always converted to US dollars.**
4. **Quote format (worst case, so the bill cannot exceed it):**
   - Model and its price per 1M input tokens and per 1M output tokens, with the date of the price.
   - Estimated input tokens (characters divided by 4 if no exact count) and a hard output cap.
   - Worst-case dollars = input x input price + output cap x output price.
   - Add 10% if the US regional endpoint is used. Prompts over 200K tokens are billed at the higher
     long-context rate for the whole request; the quote must use it.
   - One line: "Worst case $X.XX. Approve?"
5. **Every request goes through Jorge.** No standing approvals. No batching several jobs under one
   yes unless the quote names the total.
6. **After the run, log actual cost** (from the response's usage figures, in dollars) next to the
   quote. If actual exceeded the quote, that is a Class-A fault and the bot is switched off.
7. Prices come from the provider's current pricing page, stamped with the date. A stale or
   remembered price is not allowed.
8. **Unverified:** whether xAI offers an exact token-count endpoint for pre-counting. Until
   verified, use the characters-divided-by-4 estimate and the hard output cap.

## Smallest owner action (BLOCKED item)
A hard monthly spending limit set in the provider's console is the only cap outside our own rules.
Jorge sets it in the xAI console billing page (one number). Cloud cannot log in to do it.

Will Jorge answer one cheap question: shall the same rule cover any other per-token API too?
