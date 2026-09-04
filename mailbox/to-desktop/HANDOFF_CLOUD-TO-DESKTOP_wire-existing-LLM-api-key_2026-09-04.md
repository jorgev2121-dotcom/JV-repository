# HANDOFF — ☁️ CLOUD → 🖥️ DESKTOP (RAMBO): find the API key Jorge already has, wire the second-opinion call
**TRK-2026-9774 · 2026-09-04 · owner: "Can you complete the API without owner participation? I believe I already got you an API… ask your new best friend, Code terminal."**

**WHAT I FOUND / WHY IT'S YOURS:** Jorge says he already obtained an LLM API key. **Cloud cannot see it**
— I have no PC/1Password access, and Zapier has no LLM account connected (checked: no ChatGPT connection,
no enabled actions). The key almost certainly lives where only YOU can reach it: 1Password, a Windows
env var, or a file on the PC. So you complete the integration; the "owner participation" part is already
done (he got the key).

**LIKELY PROVIDER: GROK / xAI** (Jorge's best guess, 2026-09-04). Start there:
- 1Password items named/tagged **grok / xAI / x.ai**; env vars **`XAI_API_KEY`** or `GROK_API_KEY`;
  a key beginning **`xai-...`** in `.env` / notes / Downloads.
- xAI is **OpenAI-compatible**: base URL **`https://api.x.ai/v1`**, chat-completions shape, a current
  model id (e.g. `grok-2-latest` / newest available — query `/v1/models` if unsure). A one-line test:
  POST `/v1/chat/completions` with `Authorization: Bearer $XAI_API_KEY`.
- If it turns out NOT to be Grok, fall back to the general search below.

**EXACT NEXT ACTION:**
1. **Locate the existing key** — Grok/xAI first (above); else search 1Password (items tagged
   api/openai/grok/gemini/anthropic), then Windows env vars (`OPENAI_API_KEY`, `GEMINI_API_KEY`,
   `XAI_API_KEY`, etc.), then likely files (`.env`, a notes file, Downloads). Identify **which provider** it is.
2. **Wire a "second-opinion" call** from the desktop seat that reads the key **from 1Password/env at call
   time** and asks the outside model a question, returning its answer into the loop (this is the
   JOB-0096 second-opinion bus: route a finding to the model, log its reply verbatim).
3. **Test it once** with a throwaway prompt; confirm a real answer comes back.
4. **Report to `mailbox/to-cloud/`**: the **provider name and that a working key was found** — and confirm
   the test succeeded. Then Cloud can start routing second-opinion questions to it automatically.

**HARD GUARDRAIL (Rule 9 / Article 5) — the key is a credential:**
- **NEVER write the key value** into the repo, `mailbox/`, TO-CLOUD.md, a chat, or any file. Report the
  provider name only, never the secret. The call reads it from 1Password/env at runtime.
- Do not create a new key or sign up for a paid plan on your own — if the only key found is expired or
  missing, say so and stage it for Jorge; don't spend or register (RED).
- Second-opinion calls send **findings only, never client documents / PII** to an outside model
  (JOB-0096 rule).

**RED or GREEN:** locating the key, wiring the call, and testing it are **GREEN** (no spend beyond a
trivial test, no credential written out). Creating a new key or a paid subscription is **RED**.

**CLOSING QUESTION:** Which provider's key did you find, and did the test call return a real answer?

#TRK-2026-9774 #llm-api #second-opinion #credential-guardrail #cloud-to-desktop
