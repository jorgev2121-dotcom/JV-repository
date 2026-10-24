# plaud-intake — the dedicated Plaud folder and mini database

Directive: `OWNER-DIRECTIVE_PLAUD-INTAKE-PL01_2026-10-24.md` (OD-PL-01). Amendment: `OWNER-DIRECTIVE_AMENDMENT-TRAFFIC-LIGHT-AM01_2026-10-24.md` (OD-AM-01).
#Plaud #intake #OD-PL-01

## Files
- `PLAUD-INTAKE-REGISTRY.csv`: one row per recording of 30 seconds or longer (the mini database). Columns: intake id `PLD-2026-NNNN`, Plaud id, times, seconds, name, status, Drive doc id, hashtags, suggested homes, notes.
- `PLAUD-DISCARD-LOG.csv`: every recording under 30 seconds, logged and not landed. Nothing was deleted in Plaud.
- `INSTRUCTIONS.md`: the brief each backfill agent followed (one agent per recording).
- Drive: `PLAUD-TRANSCRIPTS` (id `1qyfGxKOidrnLoLDk6aVPCW2xvxs-TzzH`) holds the Docs.

## Status words
LANDED · ALREADY-LANDED (another folder) · BACKFILL-QUEUED · BACKFILL-OUTLINE · HOLD-PERSONAL (Jorge decides) · PRE-ROUTINE-CHECK (uploaded before 27 Aug, not yet checked) · FAILED (reason in notes) · FILED (only after Jorge approves; filing is RED) · NON-JOB · DUPLICATE · DISCARD-PENDING.

## Known facts
- Two landing folders exist. A second one, `Plaud-Transcripts` (id `1MTli3_qBWDSchs6mDQNYcWRyVYHGD98f`, made 2026-10-20 by another window), holds 2 markdown files (10-16 and 10-20 recordings). The registry records them as ALREADY-LANDED. Recommendation: keep PLAUD-TRANSCRIPTS as the one place; move nothing without Jorge.
- Registry covers 100 recordings listed from 2026-08-06 to 2026-10-23. Earlier ones are not yet enumerated.
- PLD ids are intake ids only. No TRK is issued here. OPH numbers are issued by whoever holds `ORPHAN-REGISTER.md`, one at a time, after reading its high-water mark (last seen 0016 on 2026-09-04).

## Rollback: the old daily-routine prompt (replaced 2026-10-24)
"Daily Plaud sync (Jorge's standing order 2026-08-27, token-frugal). Use the Plaud MCP tools: list files for the last 2 days; skip clips under 10 minutes (duration under 600000 ms) and recordings already landed (search the PLAUD-TRANSCRIPTS Drive folder, id 1qyfGxKOidrnLoLDk6aVPCW2xvxs-TzzH, for a doc citing that recording id in its footer). For each new real recording: fetch the transaction_polish transcript, create a Google Doc in that folder (title YYYY-MM-DD _ Plaud _ Name; contentMimeType text/html WITHOUT disableConversion so it converts to a Doc) with a one-paragraph summary first, then the timestamped speaker-labeled transcript, and a footer citing the recording id. Never share any doc externally — sharing is Jorge's click. Then message Jorge one short paragraph with no blank lines listing what landed, ending with a one-word-answerable question; if nothing new landed, the entire reply is: \"Nothing new from Plaud today. All good?\""
Trigger id: `trig_01QMxfM4FEJQbwudgxjxKq28`.
