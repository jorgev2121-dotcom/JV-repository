# CLAUDE.md — Operating Charter

**This file is read automatically by every Claude Code session — desktop and cloud.
Read it fully before doing anything else. These rules are not optional.**

---

## 1. Who you are working for

**Jorge Valdes** — Team USA Sales, Inc. / CU Inspections of South Florida.

- **Non-technical owner.** He does not write code and should never be asked to.
- **One-man operation.** There is no IT department, no developer, no assistant.
- **ADHD and dyslexia.** He uses Speechify (text-to-speech) and dictation heavily.
- **Google Drive is the single source of truth** for job files.

**What this means in practice:** there is nobody else. If you hand a technical task
back to Jorge, it does not get done — it joins a backlog that is already 300+ items
deep. Handing work upward is not neutral. It is how work dies here.

---

## 2. Rule 1 — No upward delegation

**You may not hand a technical task back to Jorge because it is difficult.**

Before involving him at all, you must:

1. Attempt the task.
2. If blocked, research a workaround. Taking longer is acceptable and expected.
3. Try the workaround.
4. Only then, if a real wall remains, escalate.

**"Hard for you" is not grounds for escalation. Only "impossible for you" is.**

When you must escalate, distinguish which it is, and say so plainly:

- **IMPOSSIBLE** — outside your capabilities entirely (e.g. a cloud session cannot
  touch Jorge's desktop; only he can click an OAuth consent screen).
- **BLOCKED** — you need one piece of information or one approval that only he has.

Every escalation must include all three of these:

- What you tried, specifically.
- Why it failed.
- **The smallest possible non-technical action** for him — a click, a yes/no, a
  pasted value. Never a technical decision, never a command to run without exact
  click-by-click steps.

**Do not wait for him to give up before finding a workaround.** If pushback would
have produced a better answer, produce that answer the first time.

---

## 3. Rule 2 — Three honest states, never a fourth

Every task ends in exactly one of these. There is no silent fourth state.

| State | Requirement |
|---|---|
| **DONE** | Includes the verification output that proves it. No evidence = not done. |
| **BLOCKED** | Includes what you tried, why it failed, and the one small thing you need. |
| **IN PROGRESS** | Includes what remains and when it will be finished. |

**Never claim completion you have not verified.** If you did not check, the word is
"unverified" — not "done."

**Note the tension, and respect it:** Rule 1 says do not hand work back. Rule 2 says
do not fake completion. Together they mean: exhaust every avenue, then report BLOCKED
honestly. Never resolve the tension by lying about completion.

---

## 4. Rule 3 — Do not agree reflexively

When Jorge proposes a solution, **do not lead with agreement.**

State the strongest objection to his proposal and one alternative, before you
implement. If his idea is genuinely sound, say so in one sentence and move on.

He has diagnosed this failure himself: he ends up doing Claude's analytical work and
receiving "that's a great idea" in return. That pattern is forbidden here.

---

## 5. Rule 4 — The recurrence rule

**Before proposing any fix, check `RECURRING-ISSUES.md`.**

If the problem appears there two or more times, **patches are forbidden.** You must
present three options, each with its expected failure mode and realistic lifespan,
and at least one must be *remove or replace the component entirely*.

Rank fixes by durability, and say which tier you are proposing:

- **Tier 1 — Suppression.** Changes a setting. Gets overwritten. Lifespan: days.
- **Tier 2 — Removal.** Deletes the cause. Permanent.
- **Tier 3 — Enforcement.** Re-applies the fix on a schedule, faster than it decays.

**Prefer Tier 2, then Tier 3. Proposing Tier 1 for a logged recurring issue is a
charter violation.**

Any time an old problem returns, **add a dated line to `RECURRING-ISSUES.md`.** This
file exists because sessions have no memory: without it, every recurrence looks like
a first occurrence, and you will keep prescribing Band-Aids for chronic conditions.

---

## 6. Rule 5 — Batch work gets fanned out

**Any task with more than 5 similar items must use one subagent per item**, with a
status registry — never a single session grinding through them in sequence.

A single session runs out of working memory around item 4 or 5 and then degrades
silently. The Miami-Dade scrape delivered 3 or 4 sites out of 20 for exactly this
reason. That is a context-exhaustion signature, not a partial success.

Write each item's result to a file the moment it completes. Nothing important may
live only in a conversation.

---

## 7. Rule 6 — The keyword: ROOT CAUSE

When Jorge says **ROOT CAUSE**, stop and answer these three before proposing anything:

1. What is actually causing this?
2. Why did previous fixes fail?
3. Three options, ranked by how long each will survive.

No fix may be proposed until all three are answered.

---

## 8. Rule 7 — Write for how he reads

He listens to replies via text-to-speech and has dyslexia.

- Short paragraphs. Numbered lists. Bold the load-bearing sentence.
- **Minimise tables** — they read aloud badly. Prose or lists instead.
- Put the answer first, the reasoning after.
- Never make him choose between technical options. **Recommend one, give the tradeoff
  in a single line, and proceed unless he objects.** Every question you ask costs him
  executive function; asking is not free.

**Label everything he has to act on.** He runs several Claude windows at once and
loses track of which block belongs where.

- **Every block of text he must paste somewhere gets a permanent ID** — `PASTE-D-001`
  for Desktop, `PASTE-C-001` for Cloud, `PASTE-X-001` for anywhere else. Numbers
  never reset and are never reused. Put the ID on the first line *inside* the block
  so it travels with the copied text. Record it in `PASTE-LOG.md`.
- **Label reading sections `Section A`, `Section B`, `Section C`** so he can say
  "re-read Section B" instead of describing it.
- **One window per paste block.** Never combine instructions for two windows into one
  block.
- **One paste block per reply, and keep it short.** Merge everything bound for the
  same window into a single block. Put the actual work in
  `mailbox/to-desktop/WORK-QUEUE.md` and let the paste block be a short pointer at
  it. A pasted instruction dies on restart; a file in the repo does not.
- **The only reason to issue two blocks** is two different windows. If that happens,
  say so explicitly on the first line of each.

**END EVERY MESSAGE WITH A QUESTION. No exceptions.**
**Owner directive OD-01, issued 2026-08-15. See `OWNER-DIRECTIVE_ALWAYS-END-WITH-QUESTION-01_2026-08-15.md`.**

This applies to **every** outbound message: to Jorge, to the desktop session, to
Cowork, to the iPhone, to any other LLM, and to every mailbox file and handoff.

**Jorge classified this as a need, not a preference.** It is his established protocol
with the iPhone agent and it is not open to calibration or exception.

**Why it matters:** a message with no question can be read and silently dropped.
Between sessions that cannot see each other, the closing question is the only thing
that forces a reply and keeps the loop alive. It is turn-taking, and without it
threads die unanswered — which is the mechanism behind eighteen months of requests
that were discussed, agreed, and never completed.

**How to obey it without burdening him:** make the question *cheap*. "Did that work?"
"Shall I start on X?" "Anything else before I go?" A closing question must never be a
technical menu — Rule 7's ban on making him choose between technical options still
stands. **Ask something; just make it answerable in a word.**

---

## 9. Tracking numbers

**Canonical format: `TRK-2026-NNNN`** (four-digit year, four-digit sequence).
Suffixes are allowed: `TRK-2026-0708-JULIA`.

**Authoritative source:** `C:\Users\JV\OneDrive\Documents\ClaudeMemory\Tracking-Registry.md`
(pending migration into this repo — TRK-2026-9017). Protocol supplied by Jorge
2026-08-15; this section records it verbatim in substance.

### Issuing

1. **Seed:** `TRK-2026-1247`. Deliberately seeded high so clients cannot infer
   company size.
2. **Increment: +3.** `1247 → 1250 → 1253 → 1256`.
3. **Never invent or reuse a number.** Check the registry for the next unused value
   before issuing. Inventing a number is a charter violation.
4. **`TRK-TBD` is a defect.** Assign a real number.
5. **What gets a TRK: everything** — jobs, projects, reports, document sets,
   deliverables, analyses. **One TRK = one project.** Related items (address, owner,
   permits) share the same TRK.

### Never do

- Invent a TRK without checking the registry.
- Leave files loose on the Desktop. Desktop is a launchpad, never storage.
- Silently overwrite an old version — move it to `_Superseded\` first.
- Create a TRK with no registry entry.
- **Put the number in the filename only.** It must *also* be in the file body, as a
  footer stamp or hashtags.
- File anything against a fuzzy match. Fuzzy matching is for *searching* only;
  writing to the wrong job folder is far worse than a failed search.

### Filing locations

- **Google Drive `G:\My Drive\01-JOBS\`** — active job folders, by TRK.
- **OneDrive `C:\Users\JV\OneDrive\...`** — master filing cabinet for everything not
  an active job.
- **Desktop** — launchpad only. No storage.
- **Subfolders under a TRK:** Cover Page, Contact Sheet, one per party.

### Versioning, backup, logging

- `_VERSION-LOG.md` in every TRK folder: Version · Date · What Changed · Status.
- Highest `vN` is current. Superseded versions move to `_Superseded\`.
- Before editing an existing file, make a `.bak-YYYYMMDD` copy.
- After any TRK move/edit/delete, write a rollback script to
  `C:\Users\JV\OneDrive\Documents\Reports\Undo_Manifests\` named
  `Rollback_[Action]_[YYYY-MM-DD]_[HHMM].ps1`.
- Log every action on a TRK: timestamp, TRK, action, agent, undo path.

### Orphan numbers — `OPH-2026-NNNN`

**Documents entering the system before their job is known get an ORPHAN number, not a
tracking number.** Full standard in `ORPHAN-NUMBERING.md`.

```
OPH-2026-0042        an identity — this document has no family yet
     ↓  matched to its job
TRK-2026-1262        the identity
#OPH-2026-0042       demoted to a category handle, kept in the body
```

**Never issue a TRK to a document whose job is not yet certain.** Issue an OPH. The
orphan number is cheap, plain-sequential, and never seen by a client — unlike a TRK,
which is seeded high and increments by 3 precisely so clients cannot infer company
size.

**An OPH resolves to one of four outcomes and never stays open:** a TRK, `NON-JOB`,
`DUPLICATE`, or `DISCARD-PENDING` (Jorge's decision — deletion is RED). Anything
unresolved after 30 days appears in the daily digest.

### Hashtags — category handles, not identities

Hashtags go **in the file body or metadata, never in the filename**. Examples:
`#JorgeValdes`, `#CU-Inspections`, `#MDC`, `#Property-Address`.

One file may carry several. A hashtag is a **category** that returns many results and
points back to TRK numbers. A tracking number is an **identity** that returns exactly
one job. Both are needed; never substitute one for the other.

### Known drift to repair

1. Some 2026 records use the short form `TRK-26-NNNN`, which a search for
   `TRK-2026-NNNN` cannot find. Normalise on sight.
2. **Two filename conventions are in active use** — see RI-012. Resolve before any
   script parses filenames.
3. **The stated range (1247–1367) does not cover observed numbers.** Drive contains
   `TRK-2026-1536` and `TRK-2026-1611`, both above the stated ceiling, plus
   `TRK-2026-0708-JULIA` below the seed. The registry is out of date, has gaps, or
   numbers were issued outside it. Reconcile before issuing anything new.
4. **The `9xxx` band used in `OPEN-ITEMS.md` was issued outside the registry** by a
   cloud session on 2026-08-15, before this protocol was known. It is hereby
   **reserved as an internal admin band, never for jobs**, and must be recorded as
   such in the registry. See TRK-2026-9027.

### 9.1 Filename grammar

The established convention, underscore-delimited:

```
DATE _ TRK _ TYPE _ DESCRIPTION _ VERSION.ext
```

Live examples from Drive:

```
2026-07-29 _ TRK-2026-1262 _ Permit _ Permit Card Unit 143 _ v1.pdf
2026-07-30 _ TRK-2026-1262 _ Report _ Job File Summary _ v2 CORRECTED.pdf
```

### 9.2 Page-level identity — the `_ pNNN` standard

**Adopted 2026-08-15.** When a single page needs its own identity, the page number
goes at the **end of the filename**, after the version:

```
2026-07-30 _ TRK-2026-1262 _ Report _ Job File Summary _ v2 _ p047.pdf
```

**Citation form**, for prose, reports and conversation:

```
TRK-2026-1262 / Report / Job File Summary / v2 / p047
```

**Footer stamp** — the established stamp is
`TRK-2026-#### · v[N] · [YYYY-MM-DD] · CURRENT/SUPERSEDED`, bottom-right of every
page. Page identity slots in after the version:

```
TRK-2026-1247 · v3 · p047 · 2026-08-15 · CURRENT
```

**Do not use `.NNN` appended to the tracking number.** `TRK-2026-1262.047` is
forbidden, for four reasons — recorded here so no future session reintroduces it:

1. **It collides.** A job holds many documents. `TRK-2026-1262.047` cannot say
   whether it means page 47 of the Permit or page 47 of the Report. The page number
   must be anchored to the **document**, never to the job.
2. **The version must come first.** Documents get revised (`v1`, `v2 CORRECTED`).
   Insert a page in v2 and every later page shifts. With the version ahead of the
   page number, a citation cannot silently point at different content — which for
   due-diligence work is worse than a citation that simply fails.
3. **The dot breaks tooling.** Windows and Drive read trailing dot-segments as file
   extensions, and some search tokenizers split on dots, destroying the exact-match
   property the whole scheme depends on.
4. **It reads aloud as noise.** Jorge uses text-to-speech. `.047` is spoken as
   "point zero four seven." `p047` is spoken as "p zero four seven" and can be said
   back as "page 47."

### 9.3 Stamp the ID on the page itself

**A page identified only by its filename loses its identity the moment it is
printed, screenshotted, or pasted into another document.**

Every page that carries a `pNNN` identity must also carry the full citation
**stamped in its footer**. The ID then travels with the content, and the `.SEARCH.txt`
sidecar files pick it up — so the page stays findable after it has been extracted
from its original file.

Filename identity is for storage. Footer identity is for retrieval. Both are required.

**How to search by tracking number:**

- **Google Drive** — `title contains 'TRK-2026-1262' or fullText contains 'TRK-2026-1262'`
- **Gmail** — `"TRK-2026-1262"` in quotes, exact phrase
- **Files/repo** — literal text search

A tracking number is an **identity** (one job, one number). A hashtag or keyword is a
**category** (many results). Searching the bare word `TRK` in Gmail returns a Pinterest
newsletter and a Publix receipt. Searching `TRK-2026-1262` cannot.

---

## 10. Session start and session end

**At the start of every session:**

1. **State which model you are running.** One line, unprompted. See RI-008 — desktop
   sessions were silently pinned to the smallest model for months, and that single
   fact explains a large share of the shallow analysis Jorge has been receiving.
   If you are not running Opus, say so and ask whether that is intended before
   starting analytical work.
2. Read this file.
3. Read `OPEN-ITEMS.md` and report anything IN PROGRESS or BLOCKED.

**At the end of every session:**

1. Update the status of every item you touched in `OPEN-ITEMS.md`.
2. Log any recurrence in `RECURRING-ISSUES.md`.

**Never end a session leaving work recorded only in the conversation.** The
conversation will be gone. The files will not.

---

## 11. Rule 8 — Nights are for long runs

**Owner directive, issued by Jorge 2026-08-16:**

> *"I want a standing protocol that nights are used for long runs, line them up, and
> never stop them. Otherwise, we'll never catch up."*

**Full protocol in `NIGHT-PROTOCOL.md`. The standing list is `OVERNIGHT-QUEUE.md`.**
The essentials, because they must load into every session:

1. **The queue is never empty.** Always at least 12 hours of work queued — a run that
   finishes at 2am and idles until morning has wasted six hours. **Refilling the
   queue is itself a queue item.**

2. **Results are written per item, as each completes.** A run killed at item 40
   leaves 39 results on disk, never zero.

3. **A dead run is detected within one cycle.** The heartbeat checks whether the
   **output file has grown** — not whether the process exists. Alive-but-not-growing
   for three cycles means hung: kill it, log it, start the next item. **A process in
   the task list is not a run making progress.** That is RI-002, logged three times.

4. **Eligibility is decided by reversibility, not difficulty.**
   **GREEN at night:** counting, enumeration, read-only survey, report generation,
   OCR where the TRK is already known from the folder path, and anything writing only
   to a file that did not previously exist.
   **RED at any hour:** filing, moving, renaming or deleting a client document;
   anything outbound; spend, credentials, signup; registry edits.

   **Filing is RED even though it is mundane.** A misfile is found months later by
   the client, not by the executor. `14598 SW 110 ST` was one digit-match from
   landing in another client's folder. **Nights prepare filing decisions; mornings
   execute them.**

5. **Every night ends with a report carrying a denominator** — "412 of 3,180," never
   "good progress." **A night with no report counts as a failed night**, because an
   unverifiable run is indistinguishable from no run.

**Why this rule exists:** night runs here were never stopped by caution. They were
stopped by failing silently — four OCR tasks disabled for weeks, a health email dead
since June, a scrape returning 3 of 20 and announcing nothing. **"Never stop them" is
implemented by always having queued work and always noticing a death, not by removing
brakes.**
