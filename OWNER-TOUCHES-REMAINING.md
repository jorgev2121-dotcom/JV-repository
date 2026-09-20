# OWNER-TOUCHES-REMAINING.md

**Answers the recurring question "when am I out of the middle?" with a list instead of
a speech.** Every AI-to-AI handoff (cloud ↔ desktop RAMBO ↔ Cowork) already happens
with zero owner participation via the Drive `VTES-Inbox`/`TO-CLOUD.md` channel. This
file is the complete, bounded list of what is LEFT — nothing else is silently waiting
on Jorge. When one clears, delete its line. When a lane hits a new owner-only wall, it
gets added here, not just spoken in a reply.

A line only belongs here if it is **IMPOSSIBLE** for any AI lane to do — his identity
(Windows Hello, a password, a signature), his money, or a decision no one else may make
for him. "Hard" does not qualify; see `CLAUDE.md` Rule 1.

---

1. **Windows Hello touch — unlock 1Password.** Clears the whole OD-107/RI-046 family
   (Word sign-in, Outlook MAPI exhaustion, 9Router lockout) at the root. One touch,
   face or PIN.
2. **One Admin PowerShell command — `Stop-Service WSearch -Force`.** Today's Outlook
   indexer block, hit twice (10:39 AM and 11:13 AM). Open Start → type "Services" →
   right-click **Windows Search** → **Stop** — same action, no terminal needed.
3. **Create a fresh `XAI_API_KEY`** at console.x.ai and set it as a Windows user
   environment variable. Nothing can reach Grok — not this session, not the desktop,
   not a future orchestrator — until this exists. This is the entire reason the Grok
   plan (TRK-2026-9975) hasn't moved: not a communication gap, a missing key.
4. **Yes/no: build the bypass-mode Desktop Executor lane** (TRK-2026-9967) — a second,
   ungoverned Claude Code lane for reaching things Code/Cowork can't. Answered
   conceptually, not built, pending this one word.
5. **Pick the first real job for the Grok/Ollama pilot**, or say "you pick"
   (TRK-2026-9975). The minimal pilot design is ready; it needs one job to prove
   itself on.
6. **Confirm before any file moves** — three probable misfiles found in the Drive scan
   (TRK-2026-9978, 9983, 9986). Filing is RED; no lane moves a client document on its
   own judgment.
7. **Confirm `OWNER-DIRECTIVE_SYSTEM-DOCUMENT-ACCESS-01` reads as intended**
   (TRK-2026-9992) — the "always approved, full access" directive, recorded with its
   stated scope limits.

**That is the whole list.** Everything else — routing between AI lanes, reading Drive,
diagnosing, drafting, building tools, filing reports — runs without a Jorge touch under
the standing directives already on file.

---
*Maintained by whichever lane last changed this file. #JorgeValdes #owner-touches*
