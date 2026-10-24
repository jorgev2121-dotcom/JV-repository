# Plaud backfill — instructions for one agent, one recording

Standing rule: OD-PL-01 (`OWNER-DIRECTIVE_PLAUD-INTAKE-PL01_2026-10-24.md`). You handle exactly ONE recording. Read this file, then do your item.

## What you do

1. **Find your row** in `/home/user/JV-repository/plaud-intake/PLAUD-INTAKE-REGISTRY.csv` by the `pld_id` you were given. Read it only; do not edit the CSV (the orchestrator merges results; parallel edits would collide).
2. **Check it is not already landed.** Search Drive (`fullText contains '<plaud_id>'`). If a doc exists, write a result with `"status":"ALREADY-LANDED"` and stop.
3. **Get the content** with the Plaud tools:
   - Mode `FULL`: `get_transcript` with block `transaction_polish` (page through all segments), plus `get_note` for the AI summary.
   - Mode `OUTLINE`: `get_note` only. Do not pull the full transcript. Say in the doc that the full transcript is available on request.
4. **Create ONE Google Doc** in Drive folder `1qyfGxKOidrnLoLDk6aVPCW2xvxs-TzzH` (PLAUD-TRANSCRIPTS) with `mcp__Google_Drive__create_file`: `contentMimeType` `text/html`, do NOT set `disableConversionToGoogleType`, so it becomes a Doc.
   - **Title:** `YYYY-MM-DD _ Plaud _ <Name>` where the date is the recording start date (Eastern time) and the Name is Plaud's title without the leading `MM-DD ` (if Plaud's name is only a timestamp, write a short plain title from the content).
   - **Body, in this order:**
     1. A line: `Intake id PLD-2026-NNNN · Recorded <date time ET> · Length <h/min> · Source: Plaud`
     2. A line of hashtags (8 to 15). Use `#Plaud`, `#PL-ORPHAN`, one per property or project named (for example `#Plaza-of-Bal-Harbour`, `#Art-House`), people and companies named, topic words (`#permits`, `#windows`, `#invoice`), and a `#TRK-2026-NNNN` ONLY if the transcript states that exact number.
     3. One paragraph summary (what it is, who, what was decided, open items). Plain words.
     4. **Orphan options** (heading): up to three suggested homes, each as `Option N: <where it may belong> — evidence: "<short quote>"`, then `Recommended: Option N` or `Recommended: NON-JOB` with a one-line reason. Homes are a job folder/TRK ONLY if you can name it from evidence you saw; never guess a TRK number and never invent one. If unsure, say `Option: stay ORPHAN, needs Jorge`.
     5. The timestamped, speaker-labeled transcript (`[mm:ss] Speaker N: text`). In OUTLINE mode instead write the section outline from the note and the line `Full transcript available on request.`
     6. Footer line: `Plaud recording id: <plaud_id> · Intake PLD-2026-NNNN · Landed 2026-10-24 by OD-PL-01 backfill · Private, not shared.`
   - **Mask secrets:** if anyone reads a card number, expiry, security code, password, SSN or bank account aloud, write `[REDACTED: card/password/etc.]` in its place.
5. **Never** share the doc, move or rename anything else, send any message, or edit any other file.
6. **Write your result** to `/home/user/JV-repository/agent-results/2026-10-24-plaud-backfill/<pld_id>.json`:
   ```
   {"pld_id":"PLD-2026-NNNN","plaud_id":"of_...","status":"LANDED|ALREADY-LANDED|FAILED","mode":"FULL|OUTLINE","doc_id":"<drive id or empty>","title":"<doc title>","hashtags":"#a #b ...","suggested_homes":"Option 1 ... | Option 2 ... | Recommended ...","segments":<number landed>,"notes":"<anything odd, or why it failed>"}
   ```
   If Drive or Plaud fails, retry once, then write `FAILED` with the error. Never claim LANDED without a doc id returned by Drive.
7. Reply with ONE line: pld_id, status, doc title. Nothing else.

## Style

Plain words. No emojis. This is read aloud by text-to-speech.
