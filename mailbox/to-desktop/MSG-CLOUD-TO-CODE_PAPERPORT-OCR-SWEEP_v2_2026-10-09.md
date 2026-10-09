# MSG-CLOUD-TO-CODE_PAPERPORT-OCR-SWEEP_v2_2026-10-09
OD-110 · PAPERPORT-OCR · v2 · 2026-10-09 · CURRENT (supersedes v1 of 2026-10-08)

**LANE: CLAUDE / RAMBO ONLY. Not a Codex job.**
Why v2 exists: v1 never ran. At 2026-10-09 01:34 ET the watcher sent v1 to the Codex lane (Claude was capped). Codex refused it
(BLOCKER_CODEX_..., its red-word guard matched the word "delete" in the NEVER list) and wrote "Left for Claude". Nothing put it back
in the Claude queue, so the night passed with 0 files OCR'd. Codex also has no Drive access (its NIGHT-OCR-BOARD receipt: "0 of unknown
files OCR'd. Drive access was denied"). If the Claude lane is capped, WAIT for the reset; do not hand this to Codex.
Everything this job does is GREEN (read originals, write NEW files in a mirror folder). It moves, renames and removes nothing.
To: RAMBO (Code Desktop) · From: Cloud Keeper · Priority: start now at Below-Normal priority (daytime rules, step 7), full speed 7 PM ET, then nightly until done
Daytime start: do NOT quit PaperPort or Dropbox while Jorge is using the PC; census and OCR skip any locked folder until 7 PM.
AMENDMENT-1 (bank offers first, 2026-10-08, still in VTES-Inbox) still applies: those folders go first. It was also blocked by Codex (client details), never run.

Owner instruction (Jorge, 2026-10-08 ~1:45 PM ET, with PaperPort screenshot, folder "My PaperPort Documents", 231 items): "access my PaperPort, apply OCR protocol most revised … go through the rest of the files and folders … set them in the background, do an aggressive scheduled run to get everything OCR'd and filed … find any and all documents."

## Protocols applied (exact names — tell Jorge these, nothing else)
1. **OCR-ALWAYS-ON_OPTIONS_2026-10-08 v1** — interim night lane: OCR is GREEN; write NEW files only; Option C heartbeat (count must GROW, never "process exists" — RI-002).
2. **OVERNIGHT-QUEUE Queue B** + **ORPHAN-NUMBERING.md / orphan-onboarding skill (TRK-2026-9073)** — PaperPort documents have no known job, so identity comes from the text, exact match only, never fuzzy (the 14598 SW 110 ST rule).
3. **NIGHT-PROTOCOL GREEN/RED** — filing, moving, renaming, deleting a client document is RED at any hour. Nights PREPARE filing decisions; Jorge approves them in the morning.
4. **Corrections folded in tonight (protocol-correction rule, decided directly):** sidecars and OCR'd copies go to a MIRROR folder outside PaperPort, never beside the originals, so PaperPort's view is not cluttered and no original is touched. And (owner, 2026-10-08) every report must disclose the OPH numbers and hashtags applied, per document.

## Steps
0. **Prep:** quit PaperPort (it locks files), quit Dropbox fully (not pause), exclude the mirror folder from Windows Search. Do not disable antivirus.
1. **Census first (denominator).** Root = PaperPort's documents folder (Desktop Options → Folders shows every PaperPort folder; screenshot root: `Documents\My PaperPort Documents`, 231 items) PLUS every other folder in PaperPort's folder pane, including `Business Cards` and the scanner folder (HOLDING-AREAS-INVENTORY). Write `C:\VTES\OCR-MIRROR\PaperPort\_CENSUS_2026-10-08.csv`: relative path, type (.pdf/.max/.jpg/.tif/other), size, pages, has text layer Y/N, sha256.
2. **Registry (Rule 5 fan-out):** `_REGISTRY.csv` one row per file, status pending/done/no-text/failed/needs-PaperPort. One worker per top-level folder; each writes its row the moment a file finishes.
3. **OCR (new files only):** for each .pdf/.jpg/.tif without text: `ocrmypdf --skip-text --rotate-pages --deskew` (images via img2pdf first) → copy to `C:\VTES\OCR-MIRROR\PaperPort\<same relative path>\<name>.ocr.pdf` + `<name>.SEARCH.txt`. Original never opened for write.
   `.max` files (PaperPort's own format) cannot be read by ocrmypdf → mark `needs-PaperPort`, list them; morning batch exports via PaperPort "Save As PDF" (PaperPort open, Jorge's PC idle).
4. **Identity evidence** (orphan-onboarding Step 2), per file into `_IDENTITY-EVIDENCE_<date>.csv`: property address with unit, folio, permit no., party names, document date, issuing body, any TRK/OPH already in the body. Literal strings, no summaries.
5. **Number, tag, and propose** (orphan-onboarding Steps 1, 3, 4):
   - **Issue an OPH to every PaperPort document as it is OCR'd**, from the reserved block **OPH-2026-0100 to OPH-2026-1999** (reserved for this sweep in ORPHAN-REGISTER.md so no other session collides). Plain +1. Write the register row BEFORE analysis. OPH numbers are cheap and client-invisible; issuing them is not a filing action.
   - **Hashtags** (category handles) written into the `.SEARCH.txt` sidecar and the mirror `.ocr.pdf` metadata (Keywords), never into the filename, never into the original: always `#OPH-2026-NNNN` `#PaperPort` `#<source folder>`; plus, only when the literal string is in the text: `#<street-address>` (e.g. `#7265-NW-74-ST`), `#<folio>`, `#<permit-no>`, `#<issuer>` (`#MDC`, `#Medley`, `#DOH`, `#DERM`, `#CityOfMiami`), `#<doc-type>` (`#Permit`, `#NOV`, `#Invoice`, `#W9`, `#BankStatement`, `#Receipt`), `#<party-surname>`, and `#TRK-2026-NNNN` only on an EXACT match.
   - **Footer stamp** in the sidecar first line: `OPH-2026-NNNN · v1 · YYYY-MM-DD · ORPHAN` (or the TRK on exact match).
   - **Proposals** into `_FILING-PROPOSALS_<date>.md`, grouped: A) EXACT match to an existing TRK (show the matching field); B) NO match → stays orphan (record rejected candidates); C) NON-JOB; D) DUPLICATE (same sha256 as a file in 01-JOBS). Nothing moved, renamed or deleted.
   - **DISCLOSURE RULE (owner, 2026-10-08):** every report line names the document AND its OPH AND every hashtag applied AND the TRK if matched. A report that says "OCR'd 40 files" without listing OPH numbers and hashtags is incomplete.
6. **Heartbeat:** every 15 min write `OCR-HEARTBEAT.json` (done count, queue size, last file) to Drive `Shared Folders for all LLMs`. Flat 3 readings = hung → kill, log, next folder.
7. **Daytime:** may continue at Below-Normal priority, read-only, skipping any locked file. PaperPort open = skip that folder.
8. **Schedule:** run nightly 7 PM–7 AM until `_REGISTRY` shows 0 pending. Refill: when PaperPort is done, move to Queue A (01-JOBS PDFs without sidecars).
9. **Morning report** `EXECUTED_PAPERPORT-OCR-SWEEP_<date>.md` to VTES-Outbox: "N of M OCR'd" (denominator from census), first and last OPH issued, counts by group A/B/C/D, .max count, failures with reasons, and a per-document table: file · OPH · hashtags · TRK (if exact) · group. Top 20 proposals for Jorge's one-click approval.

## Never
Write into PaperPort folders · move/rename/delete originals · issue a TRK · file on a fuzzy match · full card or account numbers in any output (nickname + last 4).

END — First reply within 15 minutes: did the census start, and how many PaperPort documents did the census count in total, and how many had no text layer?

OD-110 · MSG-PAPERPORT-OCR · v2 · 2026-10-09 · CURRENT
MSG-CLOUD-TO-CODE_PAPERPORT-OCR-SWEEP_v2_2026-10-09.md
