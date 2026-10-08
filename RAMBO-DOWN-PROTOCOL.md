# RAMBO-DOWN PROTOCOL — who executes when the desktop Claude lane stops

**Written 2026-10-08 3:55 PM ET by ☁️ Code Cloud, at Jorge's request:** *"What is the protocol if RAMBO goes down, so we can execute?"*
**Status: PROPOSED. Parts 1–3 work today with no install. Part 4 needs one owner yes.**

## Section A — Why this exists (what happened today)

1. RAMBO's headless lane hit its own 12-a-day Claude session cap at 1:46 AM.
2. 24 Inbox jobs then sat for 14 hours. Every other lane was healthy and idle: LOCAL proved it in 44 seconds at $0, and Codex was never asked.
3. Nobody knew, because the cap fails silently (RI-002 shape).
4. **The pieces of a backup already existed** (depth chart: Codex is 2nd string; AGENTS.md makes the charter model-neutral; TRK-2026-9952f). **What never existed is the switch that hands work over.** FOREMAN, the planned automatic swap, was never built.

## Section B — What counts as "RAMBO down"

Any one of these, measured from files, never from "the window looks open":

1. The watcher log says `daily cap reached`.
2. The Claude weekly limit is at 95% or more.
3. The Inbox has a job older than 60 minutes with no `EXECUTED_`, `RESULT_` or `BLOCKER_` file in Outbox.
4. RAMBO's live window has been waiting on an owner answer for more than 60 minutes while jobs queue.
5. The PC heartbeat (`_UPTIME-HEARTBEAT.md`) is more than 15 minutes old. That means the whole PC is down, so skip to step 4 of Section C.

## Section C — Succession order (cheapest lane that can do the job)

1. **LOCAL (Ollama, free, on the PC).** Classify, tag, extract, summarise, rename proposals, and anything with client personal data. Drop `JOB-*.md` with `CLASS:` and `PROMPT:` into `VTES-Inbox-LOCAL`. Proven today, 3:44 PM.
2. **CODEX (ChatGPT pool, on the PC).** Scripts, HTML, spreadsheets, file reading and writing, PC-side checks. Same Inbox job text, run with `codex exec`. Same GREEN/RED rules via AGENTS.md. Proven 2026-10-05.
3. **CLOUD (this window, works even when the PC is off).** Anything that lives in Drive, Gmail drafts, Calendar, the repo, or the web: reading job files, drafting invoices and letters as Drive files, Gmail **drafts** (never send), research, QC. Cannot touch the PC, QuickBooks desktop, 1Password or the printer.
4. **COWORK.** Long analysis, and Chrome when Jorge permits it. Needs Jorge to paste the order, since it has no inbound channel.
5. **JORGE.** Only the steps no lane may do: send, pay, sign, CAPTCHA, password. One card, one action.

**RED stays RED in every lane.** No lane may send, spend, file a client document, delete or enter credentials because RAMBO is down.

## Section D — The switch

1. **Today, by hand (works now):** Cloud checks Section B on every check-in. When it trips, Cloud reads the waiting jobs, does the Cloud-doable ones itself, writes LOCAL job files for the free ones, and lists the Codex ones for RAMBO's next live minute.
2. **Durable (needs one owner yes):** change `C:\AI\scripts\Inbox-Job-Watcher.ps1` so that when the cap trips it (a) writes `CAP-REACHED_<date>.md` to Outbox at once, and (b) re-routes the next GREEN job to `codex exec` instead of skipping it. That is Tier 2: the silent failure is removed rather than watched.

#RAMBO-DOWN #failover #LLM-01 #LLM-06 #LOCAL #RI-002 #TRK-2026-9952f
