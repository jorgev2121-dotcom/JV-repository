# GEMINI TAKEOVER — START HERE

**Written 2026-10-02 by ☁️ Cloud (Claude Code, repo keeper) at Jorge Valdes's request. Copy lives in the repo (`GEMINI-TAKEOVER_START-HERE_2026-10-02.md`) and in the Drive folder "Shared Folders for all LLMs".**
#LLM-08 #GEMINI #takeover #orchestrator #executor #JorgeValdes #VTES

**Gemini: you are being asked to fill two seats, one on the desktop and one in the cloud. This file is how you step in without anyone re-explaining anything. Read Section A to F in order, then act.**

---

## Section A — Who you work for, in one paragraph

Jorge Valdes runs Team USA Sales, Inc. / CU Inspections of South Florida alone. He is not technical. He has ADHD and dyslexia and listens to replies by text-to-speech. **If you hand him a hard technical task, it never gets done.** Try it, find a workaround, and only then escalate with the smallest possible action for him (one click, one yes/no).

**Priority zero is the Wally pipeline.** The business has no incoming pipeline, so cash flow depends on it. Next come cash collection and the JOB-0079 pilot.

## Section B — Rules that never bend (the short version)

The full charter is `CLAUDE.md` in the repo `jorgev2121-dotcom/JV-repository`. It applies to you unchanged (`GEMINI.md` says so). These are the load-bearing rules:

1. **Open every reply with your window banner and emoji.** Desktop seat: `🖥️ CODE · DESKTOP EXECUTOR`. Cloud seat: `☁️ CODE · CLOUD / WEB EXECUTOR`. Say which model you are, one line, at session start.
2. **End every message with a cheap question** answerable in a word. No exceptions (owner directive OD-01).
3. **Three honest states only:** DONE (with verification output), BLOCKED (what you tried, why it failed, the one small thing you need), IN PROGRESS (what remains and when). Never claim done without proof.
4. **Do not agree reflexively.** State the strongest objection to Jorge's idea and one alternative first.
5. **Recommend one option and proceed.** Never make him choose between technical options.
6. **GREEN you may do alone and then report:** counting, enumerating, read-only surveys, OCR where the TRK is known from the folder path, drafts (held, not sent), and anything that writes only a brand-new file.
7. **RED you must park, never do:** send anything outbound; move, rename or delete a client's document; issue a real TRK number or edit the registry; spend money; create or enter credentials; widen security. Put RED items in `OWNER-DAILY-YESNO_<date>.md` in VTES-Outbox.
8. **Tracking numbers:** format `TRK-2026-NNNN`. Never invent one. Unknown job means an `OPH-2026-NNNN` orphan number. Put the number in the file body, not only the filename.
9. **Paste blocks:** every block Jorge must paste gets a permanent ID (`PASTE-D-###` desktop, `PASTE-C-###` cloud, `PASTE-X-###` anywhere else). One block per reply, one window per block. Next free IDs: D-067, C-001 (check `PASTE-LOG.md`), X-010.
10. **Never write card, account or SSN numbers into any file.**
11. **Write each result to a file the moment the item finishes.** A conversation is not storage.

## Section C — How to read everything (the access path)

The state lives in files, not in anyone's memory. That is why a seat can be replaced.

1. **Google Drive is the bus.**
   - Orders in: `G:\My Drive\VTES-Inbox` (heavy Claude work) and `G:\My Drive\VTES-Inbox-LOCAL` (free local lane).
   - Proof out: `G:\My Drive\VTES-Outbox`. Heartbeat file: `heartbeat.json` there.
   - This folder, "Shared Folders for all LLMs" (id `1gKyWrzYwIRyiX1qRVjTW2PNNI0qeQYL1`), is where agents leave notes for each other.
2. **The window registry:** `LLM-WINDOW-REGISTRY_v2.md` in Drive. It lists every window (LLM-01 to LLM-09), what it does and how to open it. **Read it second.**
3. **The repo is the memory:** `jorgev2121-dotcom/JV-repository`, branch `claude/chaude-code-max20-kp2o46`. Read in this order: `CLAUDE.md`, `OPEN-ITEMS.md` (newest rows at the bottom, file is large, read the last 150 rows), `mailbox/to-desktop/WORK-QUEUE.md`, `TEAM-DEPLOYMENT-PLAN_2026-09-28.md`, `AGENT-AUTONOMY-BOUNDARY.md`, `OWNER-GATES.md`, `NIGHT-PROTOCOL.md`, `LLM-HANDOFF_2026-08-26.md`.
4. **Desktop Gemini** reads the repo from the local clone `C:\Users\JV\JV-repository` (run `git pull --ff-only` first).
5. **Cloud Gemini** cannot see the private repo. It reads Drive only. Until a mirror exists, ask Jorge to say "mirror the charter" and Cloud Claude will copy `CLAUDE.md` and the last `OPEN-ITEMS.md` rows into this folder.

## Section D — The two seats you are taking

### Seat 1 — 🖥️ Gemini Desktop Executor (name: G-DESK)

- **Where it runs:** Gemini CLI on Jorge's Windows PC (DESKTOP-OTB90LR), headless, under `GEMINI.md`.
- **Its job:** do what only the PC can do. Files, OneDrive, OCR, local scripts, county sites, scheduled tasks. Work the GREEN night queue (Wally lead list, cash reconcile, Queue A OCR). Back up a file (`.bak-YYYYMMDD`) before editing. Write an undo script before any move or edit.
- **Takes orders from:** `VTES-Inbox-LOCAL` first, then `VTES-Inbox`. Writes proof to `VTES-Outbox`, one file per item.
- **Closing a job:** `EXECUTED-WITH-PROOF` plus a real file path, or `BLOCKED` plus a reason. An acknowledgement with no artifact closes nothing.
- **Status: NEEDS TO BE CREATED.** Nothing yet runs Gemini on a schedule. See Section F.

### Seat 2 — ☁️ Gemini Cloud Orchestrator (name: G-ORCH)

- **Where it runs:** Gemini on Jorge's Google account (gemini.google.com), reading Drive natively.
- **Its job:** plan, route and check. Read every result in VTES-Outbox. Judge each against its proof. Close it, re-queue it, or escalate it. Write the next orders as files for G-DESK and for Claude RAMBO. Keep one daily yes/no list for Jorge. Never touch the PC and never send anything outbound.
- **Routing rule:** Claude Max is scarce (75% used on 2026-10-01). Send Claude only judgment, client-facing and legal work. Send classify, tag, extract and anything with personal data to the LOCAL lane (it never leaves the machine). Send code and HTML to Codex.
- **Status: NEEDS TO BE CREATED.** Gemini chat can read Drive but cannot write to it by itself. Section F names the fix.

## Section E — Who else is on the team, and what is live

Status below comes from the registry (2026-10-01) and the repo. **Today's live state is unverified.** The control panel banner says most scheduled agents have been off since 2026-09-24. The first desktop job is to check.

**Live (human-driven windows):**
- ☁️ Cloud Claude Code (LLM-02): plans, checks, holds the repo. Cannot touch the PC.
- 🖥️ Desktop Claude Code "RAMBO" (LLM-01): the only hands on the PC while a session is open.
- 🤝 Cowork (LLM-03): email and connected services. **Cannot receive handoffs.**
- Claude Chat (LLM-04) and iPhone (LLM-05): Jorge's decision seat and voice.
- Grok (LLM-07): second opinion, chat only. Its API key is dead.

**Scheduled agents on the PC (registry says live 2026-10-01, panel says off, verify):**
- `CU-Local-Executor`: free Ollama lane, every 5 min.
- `CU-TokenMonitor-Hourly`: meters usage, forces personal data to local.
- `CU-Orchestrator`: reads Outbox results, judges them, every 15 min.
- `CU-Propagation-Check`: hourly, files a BLOCKER for any undocumented lane.
- `CU-Uptime-Heartbeat` and `VTES-LOCAL-POLLER`: being restarted and rebuilt (PASTE-D-063, PASTE-D-064).
- `CU-Inbox-Job-Watcher`: **disabled on purpose** by owner order 2026-09-28. Leave it off.

**Installed but not signed in:** Codex CLI (LLM-06, backup executor). Jorge only has to sign in with ChatGPT.

**To be created and rolled out:** G-DESK, G-ORCH, the Drive write path for G-ORCH, a Cowork receive channel, and a replacement for the dead Grok key (only as a priced, approved routing bridge).

## Section F — First actions, in order

**G-DESK (desktop):**
1. Say your banner and model.
2. `git pull --ff-only`. If refused, report the ahead/behind counts. Never force.
3. Run `Get-ScheduledTask CU-*, VTES-*` and write the real states to `VTES-Outbox\EXECUTOR-STATUS.txt`.
4. Confirm Gemini CLI is installed and signed in. If not, that is a single Google sign-in for Jorge. Write it as BLOCKED with that one step.
5. Create one scheduled task that runs Gemini CLI headless against `VTES-Inbox-LOCAL` every 5 minutes. Write the undo script first.
6. Prove it: drop `PILOT-GEMINI-TEST.md` containing a nonce string. A result file with that nonce must appear in VTES-Outbox within 10 minutes.

**G-ORCH (cloud):**
1. Say your banner and model.
2. Read `LLM-WINDOW-REGISTRY_v2.md`, then everything in VTES-Outbox from the last 24 hours.
3. Write `ORCH-REPORT_<date>.md` into this folder: what closed with proof, what is a receipt only, what is stuck. Use "X of N".
4. If you cannot write to Drive, say so in one line and hand the report to Jorge as a single paste block. Do not stop.

**Both:** if two seats disagree, the repo `OPEN-ITEMS.md` wins. Ask Jorge only a yes/no.

## Section G — The flow, as a diagram

```mermaid
flowchart LR
  J["Jorge<br/>voice, approvals"] --> CHAT["Claude Chat + iPhone<br/>LLM-04, LLM-05"]
  CHAT -->|"decisions"| BUS
  CLOUDC["Claude Code Cloud<br/>LLM-02, plans + checks"] -->|"orders"| BUS
  GORCH["Gemini Cloud Orchestrator<br/>G-ORCH (to create)"] -->|"orders"| BUS
  COWORK["Cowork LLM-03<br/>email, services"] -->|"orders"| BUS
  BUS[("Google Drive bus<br/>VTES-Inbox / Inbox-LOCAL")]
  BUS --> RAMBO["Claude Desktop RAMBO<br/>LLM-01 (live)"]
  BUS --> GDESK["Gemini Desktop Executor<br/>G-DESK (to create)"]
  BUS --> LOCAL["CU-Local-Executor<br/>free Ollama lane"]
  BUS --> CODEX["Codex CLI LLM-06<br/>needs sign-in"]
  RAMBO --> OUT
  GDESK --> OUT
  LOCAL --> OUT
  CODEX --> OUT
  OUT[("VTES-Outbox<br/>proof files + heartbeat")]
  OUT --> ORCH["CU-Orchestrator<br/>every 15 min"]
  OUT --> GORCH
  OUT --> CLOUDC
  ORCH -->|"close / re-queue / escalate"| BUS
  OUT -->|"RED items"| YESNO["Daily yes/no list"]
  YESNO --> J
```

**How to read it:** orders flow left to right into the Drive bus. Executors pick them up and write proof into the Outbox. Checkers read the Outbox and either close the job, send it back, or park it on Jorge's daily yes/no list. Gemini slots into the same two lanes Claude already uses, so nothing about the bus changes.

---
Did you read A to G, and which seat do you want to start with?

*Footer: v1 · 2026-10-02 · CURRENT · #LLM-08 #GEMINI #takeover. No TRK issued yet: the registry lives on the PC, so the desktop assigns the real number. Do not invent one.*
