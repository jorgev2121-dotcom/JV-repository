# OWNER-DIRECTIVE: AUTO-FILING-ENGINE-AND-THE-BOOK-01

Date: 2026-10-25
Issued by: Jorge Valdes (owner), to the Cloud window
Applies to: every Claude window, Joey and every Grok Bot, Codex, RAMBO, and any agent added later
Tracking: TRK-2026-10052 (admin band)

## Part 1 — The Auto-Filing Engine (in Cloud's words, as confirmed back to Jorge)

Build a program that runs in the background on its own schedule and keeps checking how Jorge's documents are filed, named and grouped. When it finds something misfiled, misnamed, duplicated or ungrouped, it fixes it **without asking first**, but it writes a rollback script for every change before making it. Every change, every script and every health check is logged on one page of the book, the **Filing Engine** page. That page also explains in plain words what the system does, its pros and cons, the routine maintenance, and the AI checks that confirm it's working.

### Owner override of the RED filing rule, with guardrails

Jorge's instruction lets the engine change files without his approval. That overrides the charter's "filing is RED" rule **for this engine only**, and only within these guardrails:

1. **Rollback before every change.** Each run writes its rollback script first, to `C:\Users\JV\OneDrive\Documents\Reports\Undo_Manifests\`. A change with no rollback script is not allowed.
2. **Moves are copy, verify, then remove.** Copy the file, check its hash matches, and only then remove the original. Nothing is ever deleted. Duplicates and empty items go to `G:\My Drive\_QUARANTINE\`.
3. **Exact-match rule for client job folders.** The engine files a document into a client's job folder only on an exact TRK, folio, permit or case number, or a full street address. A partial or "looks like" match goes to `00-INTAKE` with an OPH number. This one rule still protects clients from a wrong-folder file.
4. **Hands off:** files that are open or locked, the system folders of Google Drive and OneDrive, anything holding credentials (flag it in one line instead), and the clipboard while Speechify reads (SPEECHIFY-PRIORITY-01).
5. **A size brake:** if one run would move more than 200 items, or more than 10 percent of a folder, it stops, logs a red card, and waits for Jorge's one-word YES.

### Strongest objection, recorded per Rule 3

Automatic moves without approval are exactly how a client document ends up in the wrong client's folder, and the client finds it months later. **The alternative adopted keeps Jorge's no-approval request but limits what can move silently:** renames, tagging, grouping and quarantine happen automatically, while client-folder filing needs an exact identifier. Everything stays reversible.

## Part 2 — "The book" (protocol for every agent)

1. **"The book"** (also "the master book", "VTES book", "VTES control book"; dictation spellings VTS, BTES, BTS) always means **The VTES Control Book**: https://claude.ai/artifact/XE6QRfTbaKswTgFn62wnTz. That's the master control book, with all its chapters and pages, properly named and indexed, with version numbers.
2. **Every enhancement to the book raises its version by exactly 1** (V1.16 becomes V1.17). The new number goes in the title bar and in the book's version history, with a dated note.
3. **Rollback stays one click away.** The version box at the foot of each page lists earlier versions. Rolling back means publishing the chosen earlier version over the same address. Record the old version id in `OPEN-ITEMS.md` every time.
4. A fix that adds nothing new doesn't need a new number (same as charter §13 for the panel).
