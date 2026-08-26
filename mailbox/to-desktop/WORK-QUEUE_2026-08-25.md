# DESKTOP WORK QUEUE — 2026-08-25 (CURRENT — read THIS first)

**FROM:** Cloud (claude.ai/code) · **TO:** Desktop Claude Code executor
**This supersedes the top of the old `WORK-QUEUE.md` for today. Work top to bottom.**

**Pointer target for `PASTE-D-027`.**

---

## GROUND RULES FOR TODAY (read before starting)
1. **State your model first.** If not Opus, fix that before analytical work (RI-008).
2. **The machine is pegged ~100% CPU on the tesseract OCR job until ~tonight.**
   **Do LIGHT tasks (1–4) now. Do NOT start heavy tasks (6–7) until the OCR finishes.**
3. **Do NOT build ONE BOARD / FOREMAN / July cards — those are Cowork's.** Claim nothing
   in `HANDOFF-LEDGER.jsonl` for them.
4. **RED steps stay parked for Jorge** — no sending money, no sending email, no sign-ins.
5. Each item is DONE only with pasted evidence (a screenshot or a file path). Update
   `OPEN-ITEMS.md` as you go.

---

## LIGHT — safe to do now, during the CPU peak

### 1. Open ChatGPT in Chrome (take-me-there)
Jorge asked for ChatGPT open. **Open `chatgpt.com` in Chrome and leave it on screen** —
don't just point at it. Whatever ChatGPT model is live is fine.

### 2. Verify the window label
Close and reopen the Code terminal, then **paste a screenshot of the taskbar**. It must
read **"DESKTOP - Claude Code"**, not "?? CLAUDE CODE". This closes the label task.

### 3. Stage the beige Claude desktop app (the control panel Jorge saw)
**Download the installer from `claude.ai/download` and open it**, then leave the Install
screen on Jorge's monitor. **STOP there** — Jorge clicks Install and signs in
(jorgev2121@gmail.com). This is a light download; safe during the OCR peak.

### 4. Stage the Grok / LiteLLM wiring (do NOT restart heavy services yet)
LiteLLM is UP on `localhost:4001` but every model 401s for lack of keys. Jorge's unused
Grok/xAI key is already on the machine.
- **Confirm the key file exists** and paste its path (not the key itself).
- **Write out the exact 4-line block** that goes into `litellm_config_4001.yaml` and paste
  it back to cloud for QC. **Do NOT paste the live key into the file yet** — that's Jorge's
  credential step. Do NOT restart the LiteLLM service during the CPU peak.

### 5. Pause Dropbox sync to free RAM (Jorge's request)
**Pause Dropbox syncing** (tray icon → account → Pause syncing). **Do NOT uninstall it** —
open ledger item 9147 has not confirmed whether Dropbox files were backed up to OneDrive
first, so removal could strand files. Pause is reversible; that's all Jorge wants.
Note: the real CPU hog is the OCR job, not Dropbox — pausing helps only a little.

---

## HEAVY — ONLY after tonight's OCR job finishes

### 6. Miami-Dade county sites — remaining half → one proof-of-concept report
Cloud is egress-blocked from these; you have Chrome. Scrape the remaining MDC sites
(list: `MIAMI-DADE-SITES.md`, 22 sources). **Write each site's result to its own file as
you finish it** (Rule 5). Then hand cloud the raw results and cloud writes the single
proof-of-concept report.

### 7. TEDC (Tacolcy Economic Development Corporation) — OCR + number + capsule factory
Resume the intake as a tracked run **with a denominator** (X of ~1,200). Write each item's
result to disk the moment it completes. Cloud QCs each batch. Confirm the home folder with
Jorge before writing (capsules live in OneDrive = your turf).

---

## PARK FOR JORGE (do NOT execute — queue these to him)
- **AJ-1:** approve sending the Alabama Jack's **$4,750** proposal to Rick.
- **QuickBooks invoice 5975 ($1,000) stops being collectible Aug 30** — Jorge's login.
- Beige-app sign-in; any Grok live-key paste; any outbound email or money.

---
*Written by cloud 2026-08-25. #work-queue #desktop #PASTE-D-027*
