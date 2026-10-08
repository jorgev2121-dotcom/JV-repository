# ROUND-TABLE-PROTOCOL.md — the round-table log, the request log, and the sweeper

Owner directives 2026-10-08 10:01 AM and 10:05 AM ET (REQUEST-LOG RQ-20261008-14 and -15).
Enhances, does not replace: OPEN-ITEMS.md (the ledger), the PROJECTS item "LLM LIBRARY + chat
chronology", and the `_HANDOVERS` folder. v1 · 2026-10-08 · CURRENT

## Why

Sessions have no memory, Jorge runs several windows at once, and requests made in chat have been
"discussed, agreed, and never completed" for eighteen months. Three pieces close that gap:

1. **Round table**: one time-stamped transcript per window per day, so every window's
   conversation reads in order, like everyone at one table.
2. **Request log** (`REQUEST-LOG.md`): every request Jorge makes, his exact words, the
   interpretation, duplicate/enhancement notes, status, and where it is tracked. It is the front
   door to OPEN-ITEMS.
3. **Sweeper**: a second agent, running behind the conversation, that compares what Jorge said
   against the request log and logs anything a window forgot.

## Where things live

- Repo: `round-table/` (one file per window per day), `REQUEST-LOG.md`, `round-table/_REVISIONS/`.
- Google Drive: `Shared Folders for all LLMs/ROUND-TABLE/` (mirror of the above, readable by
  every window and by Jorge), with `_REVISIONS/` inside it.
- File name: `YYYY-MM-DD_<WINDOW-ID>_<session-8>.md`, e.g. `2026-10-08_LLM-02-CLOUD_51afdd27.md`.
  Window IDs are the panel's: LLM-01 RAMBO, LLM-02 CLOUD, LLM-03 COWORK, LLM-04 CHAT,
  LLM-05 IPHONE, LLM-06 CODEX, LLM-07 GROK, LLM-08 GEMINI, LOCAL.

## Every entry

`### <time ET> · <SPEAKER (window)>` then the words. Owner messages in full; replies cut at
6,000 characters with a pointer to the full transcript. Artifacts are listed by link and report
number (RPT-…) the moment they are published.

## When to write (every window)

1. **At the end of every reply that changed anything** (a file, an order, a decision).
2. **Before any pause of 10 minutes or more**, and before a session ends. A window that is
   about to stop writes its round-table entry and its `_HANDOVERS` note first.
3. **New request from Jorge:** add the REQUEST-LOG row in the same reply that answers it, before
   any work starts. State the interpretation. If it repeats or upgrades something already logged,
   say so in the row ("Enhances RQ-… / Duplicate of …") and in the reply.
4. Cloud mirrors new round-table files and REQUEST-LOG to the Drive folder at least once per
   working block (the Drive connector cannot edit files, so each mirror is a new part file:
   `..._part-NN.md`).

## Revisions — so we can go back in time

When a protocol, rule or spec is changed, copy the current version to
`_REVISIONS/<NAME>/<NAME>_v<N>_<YYYY-MM-DD>.md` **before** editing, then bump the version line
in the file. Git keeps history too; the folder exists so Jorge can see the versions without git.

## The sweeper (the agent behind us)

- **Desktop (all Claude Code sessions on the PC):** a script reads new lines from every local
  session transcript (`C:\Users\JV\.claude\projects\*\*.jsonl`), pulls out owner messages,
  and checks each against REQUEST-LOG. Anything missing gets a row marked `SWEEPER-ADDED`, with
  the interpretation written by LOCAL (free), and a line in the next daily report. Runs every
  5 minutes. **Needs Jorge's one-time yes**: making a background task is "persistence", which the
  PC's safety check blocks without him (RI-015).
- **Cloud:** the same job is done at the end of every turn by a Stop hook
  (`round-table/_staged-hook/`). **Staged, not active**: Claude Code's safety check refused to
  let a session switch this on for itself. It needs Jorge's yes.
- **Other windows (Cowork, Chat, iPhone, Grok, Gemini):** their chats are not on disk where a
  script can read them. Until they are, each must follow "When to write" by hand, and the panel
  packet tells them to.
- **Platform limit:** cloud scheduled routines run at most hourly, so "five minutes behind" is
  only possible on the desktop.

## The Orchestrator's part

Every REQUEST-LOG row with status NOT STARTED is a job card for the Orchestrator: it routes it to
a lane, or marks it NEEDS JORGE with one plain question. A row cannot be closed without a proof
path (Rule 2). Nothing is ever deleted from the log; it is only closed.

## OCR on everything

Every file in ROUND-TABLE and every artifact saved there gets a `.SEARCH.txt` sidecar from the
OCR pipeline, so a remark made in a chat can be found by search later.

ROUND-TABLE-PROTOCOL · v1 · 2026-10-08 · CURRENT
