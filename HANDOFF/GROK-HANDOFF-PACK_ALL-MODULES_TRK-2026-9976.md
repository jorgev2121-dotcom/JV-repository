# 00 - START HERE (Grok, or any AI taking the Orchestrator role)

**Tracking: TRK-2026-9976. Written 2026-09-23 by Claude Code (cloud), outgoing orchestrator.
Owner directive (Jorge, 2026-09-23): Grok becomes the Executive Orchestrator. Claude and the
other AIs become consultants.**

**You do not need to read the whole library.** Read these modules in order. Each one is short.
Stop when you have what the task in front of you needs.

1. `01-RULES-ON-ONE-PAGE.md` - how Jorge must be treated. **Read it every session.**
2. `02-WORK-IN-FLIGHT.md` - what is open today, and the next action on each item.
3. `03-SKILLS-INDEX.md` - the repeatable procedures (resolution, onboarding package, Sunbiz...).
4. `04-CHANNELS-AND-ACCESS.md` - where files live and how to reach the desktop PC, Cowork and Claude.
5. `05-TOKEN-AND-LLM-MONITOR.md` - **your first build task:** one agent that watches every AI's
   fuel and health and hands work off before anyone runs dry.
6. `06-ROUNDTABLE-CHAT.md` - **your second build task:** put all the AIs in one chat.
7. `07-HANDING-BACK.md` - how to hand the role to the next AI without losing anything.

**Deeper sources, only when a module points you there:** `../CLAUDE.md` (full charter),
`../OPEN-ITEMS.md` (every open item, newest at the bottom), `../RECURRING-ISSUES.md` (problems that
keep coming back; check it before fixing anything), `../mailbox/to-desktop/WORK-QUEUE.md`.

## Your first five actions

1. Say which window you are and which model, on the first line (charter section 10).
2. Read module 01. Then read module 02 and tell Jorge the top three open items in plain words.
3. **Unit 29 (TRK-2026-1667):** make sure Jorge sees Section A of
   `../jobs/TRK-2026-1667_10980-SW-202-Dr-Unit-29/INDEX-AND-GAP-REPORT.md`. The title
   (President or Vice President) and the value ($11,500 or $15,000) must be settled **before** the
   re-sign package goes to Cinde.
4. Start module 05 (the monitor). Until it exists, **write your state to a file after every task**
   so a sudden cutoff loses nothing.
5. End every message with a question Jorge can answer in one word.

---

# 01 - The rules on one page (full text: ../CLAUDE.md)

**Jorge Valdes, Team USA Sales, Inc. / CU Inspections of South Florida.** Non-technical, a one-man
operation. He has ADHD and dyslexia, dictates, and listens to replies through text-to-speech.

1. **Answer first.** Short paragraphs, numbered lists, bold the key sentence, few tables.
2. **End every message with a question** he can answer in one word. No exceptions (OD-01).
3. **Never hand technical work back to him.** Try, research a workaround, try again. Escalate only
   when it is impossible for you, and then give the smallest action: one click, a yes/no, or a
   pasted value.
4. **Never agree reflexively.** Before you implement his idea, state the strongest objection and one
   alternative, then recommend one.
5. **Three honest states:** DONE (with proof), BLOCKED (what you tried + the one thing needed),
   IN PROGRESS (what is left + when). Never claim what you did not verify.
6. **GREEN (do it, report after):** reading, OCR, counting, drafts held unsent, writing NEW files,
   copies. **RED (Jorge approves first):** sending anything to a client or agency, moving, renaming
   or deleting a client original, spending money, credentials, signing up.
7. **Tracking numbers:** `TRK-2026-NNNN`, never invented; check `../TRK-REGISTRY.md`. Unknown job:
   `OPH-2026-NNNN`. Filenames: `DATE _ TRK _ TYPE _ DESCRIPTION _ vN.ext`, with the TRK also inside
   the file.
8. **Recurring problems:** check `../RECURRING-ISSUES.md` first. Two or more hits means no patches;
   remove or enforce.
9. **Documents go to him as real files he can drag and drop.** Check that every attachment is really
   there and is not 0 KB (RI-048).
10. **Label paste blocks** `PASTE-D/C/X-NNN` (logged in `../PASTE-LOG.md`), one block per window.
    Label sections A, B, C.
11. **Write results to files as you go.** Nothing lives only in a chat.

---

# 02 - Work in flight (snapshot 2026-09-23, ~16:45 UTC)

**The full list is `../OPEN-ITEMS.md` (newest rows at the bottom).** These are the items this
session was actively driving.

## 1. Unit 29 re-sign package - TRK-2026-1667 (also TRK-2026-1310) - IN PROGRESS, URGENT

- **Who:** 10980 SW 202nd Dr, Unit 29, Cutler Bay. Owner 10960 SW 200TH AVENUE LLC, signer Eli Bleeman.
  Property manager Cinde Velazquez (cvelazquez@asdenproperties.com). Contractor MZ Solutions /
  Miguel Zaldivar (CGC1528486, qualifier last 4 = 4053). Engineer Pedro Fiallo PE 76100.
- **Status:** the county rejected permit process UP26075409 (smudged notary seal; it was also a New
  Jersey notary). Jorge is re-sending the package to Cinde from Outlook.
- **Before it goes out:** settle Eli's title (the signed original says **President**; the new forms say
  **Vice President**) and the value of work (**$11,500** original vs **$15,000** new). The source is
  Sunbiz, which the desktop can reach.
- **Files to attach:** permit application v5 (qualifier 4053), NOC v4, and the Certificate of Company
  Resolution v8 (repo: `.claude/skills/owner-authorization-poa/examples/TRK-2026-1667_LLC_reference.pdf`).
  **v8 names Jade De Armas.** Jorge first asked to leave her off this job, then asked for her to be
  added. v8 follows the later request.
- **Complete job folder on Drive:** id `1rZBZDVN8NMVxYz7Y-5K9NtzqkXJ91bWY`. Index and gap list:
  `../jobs/TRK-2026-1667_10980-SW-202-Dr-Unit-29/INDEX-AND-GAP-REPORT.md`.
- **Still to do:**
  1. Upload the 18 OCR sidecars from `../jobs/.../ocr/` to Drive folder 07 (`1oqBoXUaW1mGQ6AW_mQnzKA1wHSDCfaHN`).
  2. Upload resolution v8 to folder 01 (`1A1hRxIjARzMG2afWg1BV31IuA3-HTbX-`).
  3. Read the email-attachment harvest result in folder 05.
  4. Get the missing items: Sunbiz, Eli's driver's license, COI, executed MZ proposal, county
     rejection notice.
  5. Build the Team USA agreement and invoice for the job; its portal says "delivered, not billed".

## 2. Skills built today - DONE, awaiting merge

Draft PR https://github.com/jorgev2121-dotcom/JV-repository/pull/11 (branch `claude/fervent-bell-jp8xnx`).
The skills are listed in `03-SKILLS-INDEX.md`. **The master resolution template is locked** (v8, from
attorney Jacqueline R. Hernandez-Valdes's template).

## 3. E-signature and online notary research - SENT TO COWORK, reply pending

Drive mailbox `MSG-CLOUD-TO-COWORK_ESIGN-AND-REMOTE-NOTARY-RESEARCH_TRK-2026-9961_2026-09-23.md`.
**Caution:** the desktop poller acknowledged it as queued for *Claude Code desktop*, not Cowork.
Confirm that Cowork actually got it.

## 4. Sunbiz is blocked in the cloud - BLOCKED on one setting

The fix: Jorge adds `search.sunbiz.org` to the cloud environment's allowed domains, or the desktop runs
`../.claude/skills/sunbiz-signer-check/sunbiz_lookup.py`.

## 5. Standing infrastructure faults (see ../OPEN-ITEMS.md)

- RI-038: the LiteLLM router flapped 3+ times today. Recommendation: remove it.
- The backup executor (Codex CLI) install is waiting on Jorge's one sign-in.
- TRK-2026-9955: the dictation tray tasks are dead on the PC.

---

# 03 - Skills index (each is a folder in ../.claude/skills/ with a SKILL.md)

**A skill is a procedure that runs the same way every time.** Use the skill; do not re-invent it.

1. **orphan-onboarding** - a loose document with no job: give it an OPH number, match it or leave it
   an orphan, stamp it, log it. Never file against a fuzzy match.
2. **sunbiz-signer-check** - an owner that is an LLC, Inc. or trust: look it up on Sunbiz, require
   ACTIVE, list the possible signers, save the working paper, draft the "who will sign?" email
   (a draft; Jorge sends).
3. **owner-authorization-poa** - the Certificate of Company/Corporate Resolution (attorney template,
   locked master v8), or a Trustee Authorization / Limited POA. Built by `make_poa.py`. The defaults
   are Jorge + Jade named, one-year term, two witnesses, a Florida notary, and square boxes only
   before physical/online. `SIGNING-AUTHORITY-RESEARCH.md` covers who may sign what: **the NOC is
   signed by the owner personally**, and the permit application for an individual owner is signed by
   the owner.
4. **onboarding-package** - every new job: services agreement (30-day termination without cause, paid
   to month-end, hold harmless, non-disparagement for entities only), invoice, contact sheet, pet and
   site disclosure, the resolution, and a checklist for the county forms. **DRAFT - FOR ATTORNEY
   REVIEW.**
5. **vtes-protocol-correction-learning** (account-level skill) - when a protocol gap is found, fix it
   once in the skill so it is never repeated.

**Every generator uses built-in PDF fonts and no form fields, and re-checks its output. It cannot
produce a blank attachment (RI-048).**

---

# 04 - Channels and access

**Files are the only memory. Chats are forgotten.**

1. **Git repo** `jorgev2121-dotcom/JV-repository`: charter, skills, logs, handoffs. Cloud Claude
   sessions and Codex can read and write it. The default branch is `claude/chaude-code-max20-kp2o46`.
2. **Google Drive (the single source of truth for job files)**
   - Jobs: `01-JOBS - ONE SOURCE OF TRUTH/TRK-... _ folio _ address/`.
   - Mailbox (AI to AI), folder id `1hI2TmVn86Cnh7h_6s93TG0KE1QzVCV5F`. To send, write
     `MSG-<FROM>-TO-<TO>_<SUBJECT>_<TRK>_<DATE>.md`. The desktop poller writes `ACK_..._AUTO.md` and later
     `RESULT_...` / `REPLY-TO-...`. Status files live in folder `1NDadXJz9eKpRbmYrE-CRH2RtKbynQClN`.
3. **Desktop PC executor** (Claude Code on Jorge's Windows PC, called RAMBO). It has Chrome, the county
   and Sunbiz websites, Outlook, and local files. Reach it only through the Drive mailbox.
4. **Cowork**: Claude with computer use on the PC. Reach it by a paste block (PASTE-X) that Jorge
   drops in, or through the mailbox.
5. **Cloud Claude Code** (this outgoing session): repo, Drive, Gmail, Outlook (Microsoft 365),
   Calendar and GitHub tools. It cannot reach county sites or Sunbiz (network allow-list).
6. **Email:** Outlook `Jorge@TeamUsaSales.com` is the business mailbox; Gmail `jorgev2121@gmail.com`
   is personal. **Sending is RED.**
7. **What Grok needs before it can execute (not just advise):** read and write access to Drive, and
   either GitHub or the Drive mailbox. Without them Grok can plan, but a Claude executor still has to
   carry out the work. Grok's own "Daily Planner" automation reported on 2026-09-22/23: "I don't have
   access to any prior conversations or details." **Give it this HANDOFF folder** (by Drive or by
   pasting 00 + 01 + 02).

---

# 05 - Build task 1: the Token + LLM Monitor (one agent, owner directive 2026-09-23)

**Why:** Jorge was left stranded more than once when an AI hit its limit mid-task (the 2026-08-26
Claude weekly limit at 99%; LiteLLM flapping, RI-038). The monitor was specified as the "FOREMAN" in
`../ROUNDTABLE-CHANNEL.md` (2026-08-26) and TRK-2026-9949, but **it was never built**. It is ONE agent
that does both jobs:

## A. Fuel (tokens / usage limits)

1. Keep one ledger file, `LLM-FUEL-LEDGER.md` (Drive mailbox + repo). For each AI: plan, limit type
   (weekly / daily / credits), used %, reset time, source of the number, and when it was last checked.
2. Sources:
   - Claude: `ccusage` on the desktop (WORK-QUEUE item 14, PASTE-D-051) and the claude.ai usage page.
   - Grok and ChatGPT: their account usage pages.
   - Gemini: AI Studio quota.
   **If a number cannot be read, mark it UNKNOWN. Never guess.**
3. **Staged thresholds, not one cutoff:**
   - 70%: warn in the roundtable.
   - 85%: the role holder writes a state snapshot (`HANDOFF/02-WORK-IN-FLIGHT.md`) after every task.
   - 95%: hand the role to the next AI in the roster.
4. **Never swap in the middle of judgment work** (a legal document, a client email). Finish the step,
   snapshot, then swap.

## B. Health (is each AI and route actually answering?)

1. Every 15 minutes, send each route a tiny test prompt: Claude cloud, the desktop via the mailbox
   ACK time, Cowork, Grok, and any local router. Record the answer time.
2. **Alive means it answered, not that its process exists** (RI-002). Three silent checks in a row
   means DOWN: log it and route around it.

## C. The roster (who takes over from whom)

1. Orchestrator: **Grok** (Jorge's choice, 2026-09-23). Backup: Claude (Opus). Second backup: ChatGPT
   or Gemini.
2. Executors (they touch files and the PC): Claude Code desktop, then Codex CLI (install pending
   Jorge's sign-in).
3. Consultants: Claude, ChatGPT, Gemini, plus a light model (Claude Haiku / GPT mini / Gemini
   Flash) for cheap bulk work.

## D. Done means

1. The ledger updates at least twice a day, with a timestamp.
2. One real forced handoff has been tested end to end, and the next AI continued from the files
   without asking Jorge anything.
3. Jorge gets a one-line daily status: who holds the role, the fuel %, and who is DOWN.

---

# 06 - Build task 2: put all the AIs in one chat (owner directive 2026-09-23)

**Goal:** one place where the orchestrator (Grok) posts the plan and the consultants (Claude,
ChatGPT, Gemini, a light model) answer, so Jorge reads one thread instead of five windows.

## Recommended channel: a Slack channel

Jorge's workspace **TeamUsaSales.com** already exists (Slack Pro trial started 2026-09-22).
1. Create a channel `#llm-roundtable`.
2. Add the official apps where they exist: Claude for Slack and ChatGPT for Slack. Gemini and Grok
   join through a Zapier or API bridge.
3. **Tradeoff:** Slack is live and phone-friendly, but it costs money after the trial. That is spend,
   so it is RED: ask Jorge first.

## Fallback channel (free, works today): the Drive file `ROUNDTABLE-CHANNEL.md`

Each AI appends a dated, signed entry (`[Grok 2026-09-23 17:00]`) and ends it with a question.
The orchestrator reads it at the start of every session.

## Rules of the room

1. The orchestrator assigns; the consultants answer only what they are asked. One question, one owner.
2. Every decision gets written to `../OPEN-ITEMS.md` (or to the Drive mirror) with a TRK number.
3. Anything outbound or involving money still goes to Jorge (RED), whichever AI proposes it.
4. Every message ends with a question (OD-01).

**Setting up accounts, API keys or paid plans is RED.** Prepare everything and give Jorge a single
click or yes/no.

---

# 07 - Handing the role to the next AI (use it every time)

1. Update `02-WORK-IN-FLIGHT.md`: every open item, its state (DONE / BLOCKED / IN PROGRESS), and the next action.
2. Update `../OPEN-ITEMS.md` for everything you touched. Log any recurrence in `../RECURRING-ISSUES.md`.
3. Commit or save every file. **Nothing may live only in your chat.**
4. Post in the roundtable: "Handing orchestrator role to <X> because <reason>. Start at HANDOFF/00."
5. Tell Jorge in one line which AI now holds the role, ending with a yes/no question.

---

Can you confirm, in one word, that you have read modules 00 to 02 and are taking the orchestrator role?
