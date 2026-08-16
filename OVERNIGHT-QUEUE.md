# OVERNIGHT-QUEUE.md — mundane batch work, 2026-08-16 night

**TRK-2026-9079.** Written by cloud at Jorge's request: *"use the night as
productive time for processing mundane tasks like OCR protocol and similar."*

---

## 0. The objection, first — do not bulk-OCR tonight

**Running the full OCR tonight would produce more of the defect, faster.**

`TRK-2026-9034` is **BLOCKED BY DESIGN**, not by accident. Both executors agreed the
hold on 2026-08-15. The reason is `RI-016`: **only about 11% of the `.SEARCH.txt`
sidecars carry a TRK.** The other 89% are extracted text belonging to no job.

An eight-hour unattended run against that pipeline does not clear the backlog. It
enlarges the pile of text that will have to be re-attributed by hand later, and it
does so while nobody is watching. **Throughput against a broken pipeline is not
progress.**

The gate is `TRK-2026-9060` — the intake stamp and exit gate. Until that ships,
bulk OCR stays held.

---

## 1. The workaround — a safe subset that CAN run tonight

**The 89% problem is documents whose identity is unknown at extraction time. It is
not a problem for documents already sitting inside a TRK folder.**

For those, the TRK is knowable from the path. The sidecar can be stamped correctly
the moment it is written, which is the whole point of 9036.

**So split the queue by whether identity is already known:**

| Queue | Contents | Tonight |
|---|---|---|
| **A — SAFE** | PDFs already inside a `01-JOBS\TRK-2026-NNNN\` folder | **RUN IT.** Stamp the TRK from the folder path into the sidecar at write time |
| **B — HELD** | PDFs anywhere else — Downloads, Desktop, PaperPort, staging | **DO NOT RUN.** These are what 9060 exists to fix |

Queue A is genuinely mundane, genuinely unattended-safe, and every file it touches
comes out correctly attributed. **It is the largest amount of real OCR progress
available tonight without making the backlog worse.**

If the path-to-TRK stamp cannot be implemented quickly, **Queue A still runs** —
the folder path is recoverable afterwards, so the sidecars can be stamped in a
second pass. Losing the stamp is recoverable; that is what separates Queue A from
Queue B.

---

## 2. Free the machine first — and the constraint is probably not RAM

Jorge recalls Dropbox hogging RAM on the last attempt and remembers suspending it.
Suspending it was right. **The reason it helped is worth correcting, because it
changes what else to suspend.**

**Bulk OCR is bound by disk I/O and CPU, not RAM.** What Dropbox does to an OCR run
is not mainly memory — it is a continuous file-system watcher plus indexing,
competing for the same disk the OCR is reading and writing. That is why quitting it
produced a speed-up out of proportion to the memory freed.

**Do these, in order of payoff:**

1. **Quit Dropbox completely** — tray icon, then Quit. **Pausing sync is not
   enough**; the process stays resident and keeps watching the filesystem.
2. **Quit PaperPort** if it is open. It holds file handles on the same documents.
3. **Exclude the OCR working folder from Windows Search indexing** — the indexer and
   the OCR run fight over exactly the same files.
4. **Close the Chrome windows** that are not needed for the run.

**Do NOT do either of these:**

- **Do not set Dropbox to online-only / placeholder files.** Jorge's Dropbox has not
  been surveyed yet (`TRK-2026-9074`) and online-only files are stubs — OCR would
  read nothing and report success on empty content. That is a silent-failure
  generator.
- **Do not disable antivirus.** If AV scanning is slowing the run, the correct move
  is a folder exclusion, and that is Jorge's decision to make, not an executor's.

---

## 3. The queue, in order

Ordered so that the counting happens before the processing. **A run with no
denominator cannot report a completion percentage, which is how the last one ended
in a four-hour misunderstanding.**

| # | Task | TRK | Owner | Why it is safe unattended |
|---|---|---|---|---|
| 1 | **Count PDFs in scope vs `.SEARCH.txt` sidecars** | 9038 | Desktop | Pure counting. No writes. Produces the denominator that has been missing since the start |
| 2 | Report capacity-used vs files-found on `B:` and `E:` | 9074/9075 | Desktop | Settles whether the Seagate is empty or the scan missed it. See TASK-09 |
| 3 | Enumerate Dropbox — counts only, no filing | 9074 | Desktop | Counting, not deciding. Filing needs judgement and waits for morning |
| 4 | **OCR Queue A** — files already under a TRK folder | 9034-A | Desktop | Identity known from path. Cannot create untagged output |
| 5 | Enumerate Gmail attachments — counts and senders only | 9073 | **Cloud** | Within cloud's verified access. No writes to Drive |
| 6 | Finish the Drive survey — full-text and short-form TRK | 9033/9008 | **Cloud** | Read-only survey. Already in progress |
| 7 | Map which TRK folders have no `_VERSION-LOG.md` | — | **Cloud** | Read-only. Produces a punch list for the morning |

**Nothing in this list files, moves, renames or deletes a client document.** Every
item is either counting, reading, or OCR against files whose identity is already
certain. **That is the criterion for unattended overnight work** — if a task needs a
judgement call, it waits for a session that can be questioned.

---

## 4. The honest limit on all of this

**Two of the seven items are cloud's and will run. The other five need a desktop
executor that is actually awake.**

The `CLAUDE-HEARTBEAT` scheduled task is reported to run every 15 minutes. **Whether
it executes work or only writes a log line is unverified** — marked so in
`OPEN-ITEMS.md` under 9070. Four OCR scheduled tasks were silently disabled before
and nobody noticed for weeks (`RI-015`).

**If the heartbeat only logs, items 1 through 4 do not happen tonight** and are
waiting in the mailbox when the desktop next opens. That is not a failure of the
plan; it is the plan's known dependency, stated up front rather than discovered in
the morning.

**The proof to look for:** two consecutive heartbeat cycles in the log, and a row
written to `ORPHAN-REGISTER.md` or a count file that did not exist at midnight.

---

**Question for the desktop: does the heartbeat task execute Claude Code with a
prompt, or does it only write a timestamp to `claude-heartbeat.log`?**
