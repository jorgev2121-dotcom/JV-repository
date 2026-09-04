# OWNER DIRECTIVE — OD-ONE-EXECUTOR-MANY-BRAINS-01
**Ratified by Jorge 2026-09-04 · standing directive · TRK-2026-9774 · applies to every seat and agent.**

**Directive (owner intent):** Do **not** install rival LLM desktop executors on Jorge's PC. Keep **one
executor with hands on the machine — RAMBO (Code Desktop)** — and let the other models contribute as
**brains via API**, which RAMBO reviews and installs. Vary the models; keep the executor one and trusted.

## The rule
1. **One hand on the machine.** Exactly one agent may run commands / touch files on Jorge's PC: **RAMBO
   (🖥️ Code Desktop).** ☁️ Code Cloud is the second Claude seat but has **no PC access**. No other
   vendor's desktop executor (e.g. Codex CLI, Gemini CLI, aider, Cline, OpenHands) is installed to act
   autonomously on the machine.
2. **Other LLMs are brains, not agents.** Grok/GPT/Gemini participate **only via API call** made by a
   Code seat — for reasoning, second opinions, and modular builds. They never get their own hands on the
   files.
3. **Modular builds come back as artifacts; RAMBO reviews, then installs.** Code produced by any outside
   model is **untrusted until RAMBO reads it.** Never blind-install a script another model wrote — same
   RED-default RAMBO applies to inbound repo files.
4. **Diversify by model, not by executor.** Route each job to the **cheapest capable worker**: free local
   deterministic compute first, then a cheap model, then Opus for real reasoning. The executor stays one.
5. **Exception — a second executor** may be added **only with explicit owner approval**, for genuine
   parallel long-runs, and still under RAMBO's review + RED/GREEN. Prefer RAMBO spawning parallel local
   workers over installing a competitor's agent.

## Guardrails that do not change
- **RED/GREEN (Rule 9)** and the spend caps (OD-BUDGET-01 $40/day, OD-CARD-VERIFY-01 $3/card) bind every
  model call and every install. API delegation is **metered new spend** — it counts against the cap; it
  is not "free capacity from a subscription."
- **No API key, password, or bank number is ever written to a repo file, mailbox, TO-CLOUD.md, or a
  chat.** Keys live in 1Password / env only; the call reads them at runtime.

## Why this exists
Every executor that can run commands is another thing that can misfile a client document or run
unreviewed code. Four rival agents multiply that risk and the "which window did what" confusion. One
reviewed hand on the machine, many brains behind it, is safer and cheaper and keeps Jorge out of the
middle.

#OD-ONE-EXECUTOR-MANY-BRAINS-01 #TRK-2026-9774 #standing-directive #one-executor #untrusted-code #RED-GREEN
