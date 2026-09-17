# INTEGRATION MAP — every AI surface, and how far each can actually join the loop
**TRK-2026-9774 · drafted by ☁️ CLOUD 2026-09-04 · owner: "I want more integration when at all possible."**
Extends `HANDOFF-PROTOCOL_TWO-SEAT-01.md`. The rule that decides membership:
**can the surface read AND write the shared board (repo + Drive) on its own, and run on a timer?**

---

## Tier 1 — FULL MEMBERS (autonomous, already live)
| Surface | Reads/writes board | Heartbeat | Powers |
|---|---|---|---|
| ☁️ **Code — Cloud** | repo + Drive + Gmail/Outlook + GitHub | yes (~10 min, stand-down) | data lanes; cannot touch PC |
| 🖥️ **Code — Desktop (RAMBO)** | repo + Drive + local files | yes (3 min, Windows task) | PC, 1Password, portals, OCR |

These two trade work with **no human in the middle.** Everything below is measured against them.

## Tier 2 — NEAR-FULL (joins if it can reach the board)
| Surface | Status | To join |
|---|---|---|
| 🤝 **Cowork** | lanes laid: `mailbox/to-cowork/`, `mailbox/from-cowork/` | confirm it can read/write this repo or Drive; if yes, it reads its lane at session start and drops handoffs to `to-cloud`/`to-desktop`. If it has no timer, it is **pull-when-opened**, not autonomous. |

## Tier 3 — PASTE-ONLY, by capability ceiling (not a config problem)
**Grok · ChatGPT · Gemini · Copilot — their chat windows.** They **cannot** read your repo/Drive or run
on a timer, and their replies only return if a human copies them. So a chat window **cannot be an
autonomous member.** Two honest ways to integrate them anyway:

1. **API, not chat — the real upgrade.** If you hold an **API key** for one, a Code seat *calls it as a
   tool* and folds its answer into the loop automatically (the "second opinion" bus already referenced
   in JOB-0096). **The key is the one owner step; it lives in 1Password, never in a repo file or chat.**
   This turns a paste-tier LLM into a callable service — the maximum integration available for them.
2. **Shared briefing — the paste-tier fallback (already exists).** The #sitdown board
   (`PASTE-INTO-EVERY-LLM.txt`, PASTE-X-004) every LLM reads at session start. Their output comes back
   by emailing the `JOB:` gmail or by Jorge pasting. Good for one-off opinions, not for a live loop.

## Bridges the Code seats can already use (no new accounts)
- **Zapier MCP** (9,000+ apps) and **CData Connect** are connected to the Code seats — they can reach
  many outside services directly as tools, which is often a cleaner integration than automating a chat
  window. Use these before trying to script someone's web UI.

## The one rule that does not bend with more members
Every new member is still bound by **RED/GREEN (Rule 9)** and the spend caps. More surfaces means work
reaches the RED line faster; **no surface — Tier 1, 2, or 3 — crosses it without Jorge's one click.**
And **no API key, password, or bank number is ever written to a repo file or a chat** — 1Password only.

## What advances integration next (ranked)
1. **Confirm Cowork's board access** → promote it to a working Tier-2 member (lanes are ready).
2. **Decide which outside LLM is worth an API key** (one at a time), store the key in 1Password → a Code
   seat calls it for second opinions automatically. Owner step: create the key + save it.
3. **Prefer Zapier/CData tool-calls** over scripting web chat windows wherever an app is on those.

**Which of the three do you want first — wire up Cowork, add one LLM by API key, or lean on Zapier?**

#TRK-2026-9774 #integration-map #cross-llm #cowork #api-not-chat #RED-GREEN
