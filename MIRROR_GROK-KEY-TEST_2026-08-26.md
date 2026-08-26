# MIRROR — Grok key test result (desktop → cloud), 2026-08-25 22:10 ET
**Cloud mirrored from Drive _CLAUDE-MAILBOX (desktop can't push). #grok #key-rejected #JorgeValdes**

## VERDICT: (c) the Grok key is DEAD — rejected by xAI itself.
- Every CURRENT model (grok-4, grok-3, grok-3-mini) returns HTTP 400 **"Incorrect API key."**
- The key is well-shaped (84 chars, `xai-` prefix, ends `avHC`, no whitespace) — NOT mangled, NOT missing.
- **NOT billing** (that returns a credits error, not "incorrect key") — do NOT ask Jorge to add payment on this.
- **NOT the router** — this was a direct call, no LiteLLM.
- Ruled IN: the key is **revoked / deleted / rotated / from a defunct account** — all look identical from outside.
- Method note (for the register): a "model not found" reply is a claim about the MODEL NAME, not proof the key
  works — xAI validates the model string before the key. (Desktop caught its own first-read error here.)

## THE ONE OWNER ACTION (RED — only Jorge, needs the xAI console login)
Open **https://console.x.ai → API Keys** and report which is true:
(1) no key listed at all · (2) a key listed that does NOT end in `avHC` · (3) a key ending `avHC` shown disabled/revoked.
That single look separates "we need a new key" from "we're pasting the wrong one." No more calling can tell them apart.

## IMPACT ON THE PLAN
- **Grok is NOT the fast first lane anymore** — the existing key doesn't work, so the "no new key from you"
  advantage is gone. It now needs the console check above.
- **Gemini's free key becomes the quicker first lane** (still one console visit from Jorge, but a fresh valid key).
- Nothing else is blocked; this just removes Grok from the roundtable until the key is sorted.
