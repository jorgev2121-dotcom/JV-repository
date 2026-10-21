# FIND THE PATH — standing protocol (owner directive, 2026-10-10)
TRK-2026-9952o · applies to EVERY LLM and agent: Claude Code (desktop and cloud), Cowork, Chat, ChatGPT/Codex, Grok, Gemini, iPhone.

## Trigger
Jorge says **"F"**, **"Find the path"**, or **"FTP"** in any window. The agent answers:
**which working lanes can carry this task to the desktop executor right now, which one I picked, and why.**

## Step 1 — Say which window you are
🖥️ CODE · DESKTOP EXECUTOR · ☁️ CODE · CLOUD / WEB · 🤝 COWORK · 💬 other LLM (name it).
If you ARE the desktop executor, just do the task. Stop here.

## Step 2 — Check the lanes, live, in this order
Each lane gets one word: **LIVE**, **DOWN**, or **UNKNOWN** (could not check). Never guess LIVE.

1. **Drive job lane (works from any LLM with Google Drive).**
   Write `MSG-<FROM>-TO-CODE_<TASK>_TRK-2026-NNNN_YYYY-MM-DD.md` to Drive folder `VTES-Inbox`
   (id 1hI2TmVn86Cnh7h_6s93TG0KE1QzVCV5F). Filename must END with the date.
   Live check: newest file in `VTES-Outbox` (id 1NDadXJz9eKpRbmYrE-CRH2RtKbynQClN) is under 2 hours old.
   Result arrives as `EXECUTED_<jobname>` or `BLOCKER_<jobname>` in VTES-Outbox.
2. **Remote Control lane (Claude only).** Phone or web → Claude app → Code → session titled
   "🖥️ DESKTOP EXECUTOR · LIVE…". Live check: `list_sessions` shows a `bridge` session whose last turn did not error.
3. **Codex lane (backup executor).** OpenAI Codex desktop app / codex-cli on the PC. Reach it by a Drive job
   addressed `MSG-<FROM>-TO-CODEX_…`, or Jorge opens the Codex app.
4. **Cowork lane.** Cowork on the PC writes `MSG-COWORK-TO-CODE_…` jobs to VTES-Inbox (seen EXECUTED 2026-10-02).
5. **Paste lane (last resort).** A `PASTE-D-NNN` block Jorge pastes into the desktop window. Costs him a step — use only when 1–4 are DOWN.

## Step 3 — Auto-select
Pick the **first LIVE lane** in the list above, unless Jorge names one. Say it in one line:
"Sending by lane 1 (Drive job). Lane 2 is DOWN: <reason>."
If **every** lane is DOWN → report BLOCKED with a WORKAROUND-CERT and the one smallest owner action.

## Step 4 — Confirm
After sending, report the job name and when to expect the EXECUTED/BLOCKER file. End with a one-word question.

## Known breakers (check these first when a lane is DOWN)
- **Expired SSL / wrong PC clock** → desktop executor cannot reach the API. Fix: Settings → Time & language → Date & time → "Set time automatically" ON → "Sync now". (2026-10-10)
- PC asleep or off → all PC lanes DOWN.
- Drive for desktop not syncing → lane 1 slow.

## Panel
The VTES control panel shows a **Find the Path** tab listing these lanes with their live state (requirement R-14, `panel-rebuild/REQUIREMENTS_ROUND-11_2026-10-10.md`).
