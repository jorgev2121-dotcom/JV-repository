# OWNER DIRECTIVE OD-PL-01 — Plaud recordings: catch, label, keep, and route

**Issued by Jorge Valdes by voice, Plaud recording of 2026-10-23 (id `of_b435867f44e6440281618e90e5551261`, minutes 2:31 to 8:19). Rewritten in Claude's words and adopted 2026-10-24 by the cloud window.**
**Name checked against the repo and Drive before use: `OD-PL-01` was unused (RI-049 rule).**

#OD-PL-01 #Plaud #intake #orphan #hashtags #JorgeValdes

---

## Section A — Jorge's request, in plain words

Every Plaud recording should travel the whole road on its own:

1. Plaud makes the transcript.
2. The transcript is copied to Drive and the desktop without anyone clicking.
3. It is labeled, hashtagged, named by the filing convention, and filed to the right job folder.
4. If the job is not known, it becomes an orphan, with suggestions of where it may belong and lots of hashtags, so that Jorge only has to make the final choice.
5. Any recording shorter than 30 seconds is an accident (a tap on, a tap off) and is thrown away.
6. All of this lives in one dedicated folder with a small database of its own, and every entry is also passed to the single source of truth.
7. Jorge also asked for a plain status: is this happening automatically, yes or no?

## Section B — The rules

**Rule 1 — The 30-second rule.** A recording under 30 seconds (under 30,000 ms) is scrapped as accidental. It is never transcribed. It is written to `plaud-intake/PLAUD-DISCARD-LOG.csv` (id, start time, seconds) so a miscounted clip can be recovered. **Discarding means: do not land it.** The recording stays in the Plaud app; no agent deletes anything in Plaud. Deleting is RED and is Jorge's.

**Rule 2 — Everything 30 seconds or longer is landed.** This replaces the old 10-minute floor in the daily Plaud routine. Short but real calls (148 s, 389 s, 506 s) were being skipped.

**Rule 3 — Catch by upload date, not recording date.** The phone uploads recordings days after they are made. A "last 2 days by recording date" window misses them. The routine looks at the last **14 days by upload date** (`created_at`) and lands every id not already in the registry.

**Rule 4 — One dedicated place, two copies.**
- Drive folder `PLAUD-TRANSCRIPTS` (id `1qyfGxKOidrnLoLDk6aVPCW2xvxs-TzzH`): the Google Docs, one per recording.
- Repo folder `plaud-intake/`: `PLAUD-INTAKE-REGISTRY.csv` (the mini database), `PLAUD-DISCARD-LOG.csv`, `README.md`.
- Every doc carries the recording id in its footer. The registry is checked by id, never by title.

**Rule 5 — Every entry gets a registry row and a label.**
- **Intake id** `PLD-2026-NNNN`: plain sequential, never shown to clients, never reused.
- Naming: `YYYY-MM-DD _ Plaud _ Name` for the Doc. Once filed to a job it follows the filing grammar: `DATE _ TRK-2026-NNNN _ Plaud _ Name _ v1`.
- Hashtags go in the body, never the filename: `#Plaud`, the project or property, the people, the topic, `#PL-<status>`. Use many.
- Status is one of: `LANDED-ORPHAN`, `FILED` (TRK matched and approved), `NON-JOB`, `DUPLICATE`, `DISCARD-PENDING` (Jorge's decision), `DISCARDED-SHORT` (under 30 s).

**Rule 6 — Orphans, with options.** A recording whose job is not certain is an orphan. It gets up to three suggested homes (a TRK, a hashtag group, or NON-JOB), each with its evidence quoted from the transcript, and a recommended pick. **No TRK is issued to it** (CLAUDE.md section 9). An OPH number is issued by whichever window holds `ORPHAN-REGISTER.md`, one at a time, after reading its high-water mark. Orphans open more than 30 days appear in the daily digest.

**Rule 7 — Filing is RED.** Landing a Doc and writing a registry row is GREEN (a new file only). **Moving a transcript into a client job folder is a filing action and waits for Jorge's word.** The agent prepares the decision; Jorge makes it. Fuzzy matches are never used for filing.

**Rule 8 — Privacy.** Docs are never shared outside Jorge's account. Card numbers, passwords and codes spoken aloud in a recording are masked in the Doc and the registry (RESTRICTED note instead).

## Section C — Status question, answered on 2026-10-24

See `IPHONE-SYNC-STATUS_2026-10-24.md`, Section B. Short version: **partly automatic.** The daily 7 a.m. Eastern routine lands Docs on its own, but it used the wrong date window and the wrong length floor, so most long recordings since mid-September were never landed. No automatic labeling, hashtag, naming or filing existed before this directive. The auto-copy to the desktop (`CU-Plaud-DesktopBridge`) is unverified from the cloud.

## Section D — What changes at once

1. The daily routine prompt is rewritten to Rules 1 to 5 (old prompt saved in `plaud-intake/README.md` for rollback).
2. The registry is seeded from the Plaud list (denominator and per-row status are in the registry file).
3. Missing recordings are backfilled, one agent per recording (Rule 5 of the charter).
4. The desktop verifies the bridge task and reports (read-only check in `mailbox/to-desktop/`).

This directive is covered by the amendment `OWNER-DIRECTIVE_AMENDMENT-TRAFFIC-LIGHT-AM01_2026-10-24.md`: GREEN and YELLOW failures are fixed by the agent, RED goes to Jorge.

#OD-PL-01 #Plaud #30-second-rule #orphan #intake
