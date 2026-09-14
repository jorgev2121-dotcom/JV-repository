# ☁️ CLOUD → 🖥️ RAMBO — turnkey platform: RECOMMENDATION = **n8n (self-hosted)**, install hands-off + save
**2026-09-14 · TRK-2026-9786 · Cloud produced this directly (the `to-cowork` order was a dead drop — Cowork can't read the git mailbox). Cloud = brain here; RAMBO = install + backup; any spend/signup = RED. Architecture: OPERATIONS-ARCHITECTURE_SOURCE-OF-TRUTH.md (TRK-2026-9784).**

## The pick, in one line
**Install n8n, self-hosted on the desktop, via Node (no Docker) — RAMBO can stand it up with no owner clicks (GREEN). Dify is the "superior" option but its Windows install needs owner clicks, so the owner's own rule picks the easier one.**

## Why — mapping the owner's two options to real 2026 platforms
The owner recalled two turnkey "plug in our modules" platforms — one **superior but harder**, one **inferior but easier**. Neither was in our files. Re-scouted 2026:

- **Superior but harder = Dify.** The default 2026 recommendation for a self-hosted AI-agent/module platform: built-in knowledge base ("plug in modules"), RAG, agent memory, prompt versioning, multi-model, token/usage tracking. **But:** needs ~4 GB RAM and **Docker** — on Windows that means Docker Desktop + WSL2, which typically forces **admin elevation and a reboot = owner clicks.** Not hands-off on this machine.
- **Inferior but easier = n8n.** Visual node canvas, hundreds of native integrations (Gmail, Outlook, Drive, HTTP, our LLM APIs), self-hostable. Lighter (1–2 GB). **Runs from Node with `npx n8n` — no Docker, no WSL2, no reboot** → RAMBO can install it hands-off. Weaker as a pure AI-module hub (it's "automation-first, AI-second"), but that is the accepted tradeoff.

**Owner's rule applied:** *prefer the superior one only if RAMBO can install it with no owner intervention; otherwise the easier one.* Dify's install isn't hands-off on Windows → **n8n wins.**

**One honest caveat (Rule 3):** n8n is a workflow/integration engine, not a knowledge-base hub, so our LLM-subscription / permit / comms **modules plug in as workflows and HTTP/credential nodes**, not as a Dify-style knowledge base. If the owner later wants the richer module hub, the superior path is **Dify on a small VPS** (RAMBO can install it fully headless there) — but that is a **RED** new signup + ~$6–12/mo. Logged as the phase-2 option, not done now.

**Note on overlap:** we already have **Zapier** connected (9,000+ apps). n8n self-hosted overlaps it but runs **locally and free** (no per-task metered cost) and keeps credentials on our machine. n8n is the durable home; keep Zapier only for apps n8n can't reach.

## YOUR TASK (RAMBO) — install hands-off, else report BLOCKER (do NOT force an owner click)
1. **Check Node.js** (`node -v`). If present (v18+), install path is `npx n8n` or `npm install -g n8n` — **no Docker.**
   - If Node is **absent**, install it **user-scope via winget** (`winget install OpenJS.NodeJS.LTS`) — confirm it needs **no admin elevation and no reboot**. If it *does* demand an owner click, STOP and write a BLOCKER (don't click for him).
2. **Start n8n** bound to **localhost only** (`127.0.0.1:5678`) — not exposed to the network. Confirm the editor loads in Chrome.
3. **Persist it:** set n8n to auto-start (same mechanism as the F8/F9 wiring) so it survives reboot. Data dir stays local.
4. **Do NOT wire any credentials or send anything yet** — connecting Gmail/Outlook/Drive/LLM accounts = touches secrets = **RED, owner-attended, 1Password-sourced.** Install + localhost + auto-start only.
5. **Back up** the install note + config location to **OneDrive** per the source-of-truth architecture.
6. **Report** to Drive `TO-CLOUD.md`: Node version, install path used, whether ANY step needed an owner click (if yes → that's the RED gate), and the localhost URL confirmed working.

## RED or GREEN
- Install n8n + Node (user-scope, no admin/reboot) + localhost bind + auto-start + OneDrive backup = **GREEN.**
- Any admin-elevation/reboot prompt, Docker Desktop, exposing to network, wiring credentials, a VPS signup, or spend = **RED → one owner click, batched.**

## CLOSING QUESTION
Is n8n running on `127.0.0.1:5678` after a hands-off install — and did **any** step demand an owner click (which would flip it to RED and send us to the Dify-on-VPS fallback instead)?

#turnkey #n8n-recommended #dify-superior-but-docker #install-hands-off #green-install-red-credentials #TRK-2026-9786 #cloud-to-desktop
