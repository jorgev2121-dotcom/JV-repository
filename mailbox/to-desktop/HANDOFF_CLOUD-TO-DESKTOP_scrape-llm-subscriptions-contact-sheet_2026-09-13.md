# HANDOFF — ☁️ CLOUD → 🖥️ RAMBO: build the per-LLM subscription contact sheet + usage methods (1 provider per agent)
**2026-09-13 · owner: contact sheet for each LLM we pay for (Claude, ChatGPT/OpenAI, Gemini, Grok) + how to pull usage/balance. Module = LLM-SUBSCRIPTIONS.md (TRK-2026-9783).**

**WHY IT'S YOURS:** Cloud is egress-blocked from these billing sites and has no 1Password. You log in (via
1Password), read the NON-SECRET account facts, and confirm each provider's usage/balance page.

**⛔ SECURITY (hard, charter Art.5):** write ONLY non-secret fields into LLM-SUBSCRIPTIONS.md — provider, plan
name, monthly $, billing cycle, login **email**, **masked** account id (last-4), usage method, balance method,
support contact, access scope, and a **1Password item reference**. **NEVER** write a password, API key, full
card number, or full account number into the repo/mailbox/chat. Reading a balance = GREEN; changing a plan or
paying = RED.

**EXACT NEXT ACTIONS — Rule 5: ONE agent per provider (4 providers), per-item result:**
1. For each of Claude, OpenAI/ChatGPT, Gemini, Grok: log in via 1Password, capture the non-secret contact-sheet
   fields, and **confirm the exact usage page + balance page** (fills the UNVERIFIED rows in the module).
2. **Confirm Fable (`claude-fable-5-1`) is rarely used** — read the per-model breakdown on the Claude usage page;
   flag any window defaulted to Fable (RI-008 class).
3. Write results into `LLM-SUBSCRIPTIONS.md` (non-secret only) + tag `#LLM-subscription #<provider>`; report a
   denominator ("4 of 4 providers sheeted; Fable usage = X%").
4. **Balances on request:** wire a read-only "check balance" the token agent can run via 1Password — reads,
   never stores the credential, never writes a balance into the repo as a secret.

**CLOSING QUESTION:** For all 4 LLM subscriptions — plan, price, login email, and the confirmed usage/balance page — and is Fable confirmed rarely used?

#llm-subscriptions #contact-sheet #usage-per-provider #fable-watch #one-agent-per-provider #1password-read-only #cloud-to-desktop
