PROTOCOL_VTES-Section-Addition · v1.0 · 2026-10-08 · CURRENT

# VT ES Control Panel — Section Addition Protocol

Every time a new section (button) is added to the VT ES Control Panel, this
protocol must be followed in full. No section ships without completing all steps.

---

## What qualifies as a new section

A new section is any addition to the 24-button launcher grid — a new category
of work, a new data source, or a new role or tool that Jorge needs to navigate to
from the top-level panel.

Renaming an existing section, changing a badge count, or toggling grey/active
status does NOT require this protocol. That is a data update.

---

## Step 1 — Define the section record

Before touching any file, write down the following:

| Field | Value |
|---|---|
| `id` | Unique lowercase-hyphen identifier (e.g. `permit-watch`) |
| `label` | All-caps display name, max 14 chars (e.g. `PERMIT WATCH`) |
| `sub` | One plain-English description line, max 30 chars |
| `badge` | Count string if applicable, otherwise blank |
| `badgeAlert` | true if badge represents a warning count (yellow), false = green |
| `speechify` | true if this section produces text Speechify can read aloud |
| `mic` | true if this section accepts voice dictation as input |
| `grey` | true if not yet wired / unavailable; false if live |

**Speechify rule:** mark `speechify: true` if the section outputs readable text
to the screen. Nearly all sections qualify. Mark `false` only for a section that
produces binary output only (e.g. a raw file download with no summary).

**Mic rule:** mark `mic: true` only if a human can dictate new input INTO this
section (e.g. CLIENTS lets Jorge dictate a new client name; USAGE is read-only
and does not accept dictation). The mic must be of equal or greater quality than
the built-in dictation in the Claude chat windows. If the dictation quality cannot
be confirmed, mark `mic: false` and note it as pending.

---

## Step 2 — Add the record to the SECTIONS array

File: the VT ES Control Panel artifact (`claude.ai/artifact/WBANos1wgsgFWoh5H5PW1N`).

Insert the new record object into the `SECTIONS` array in alphabetical order by
`label`, or at the end if placement is unclear. Do not reorder existing records.

```js
{ id:'permit-watch', label:'PERMIT WATCH', sub:'active permit status',
  speechify:true, mic:false },
```

---

## Step 3 — Update OPEN-ITEMS.md

Add one line under the appropriate TRK or admin section:

```
- VTES-SECTION: PERMIT WATCH added 2026-10-08 · speechify=Y · mic=N · grey=N
```

---

## Step 4 — If the section has a live data source

Define where the data lives and who writes it:

1. The section must have a corresponding entry in `_ROLE-PROTOCOLS/` that
   specifies the role responsible for updating it.
2. The data source path must be recorded here (e.g. a JSONL file path, a Google
   Drive folder, a GitHub file path).
3. The update cadence must be defined (e.g. "regenerated every 15 minutes by
   Orchestrator").

If no data source exists yet, mark `grey: true` until it is wired.

---

## Step 5 — Publish the updated artifact

Republish the updated HTML to the same artifact URL so Jorge's link stays stable.
Do not create a new artifact for a section addition.

---

## Step 6 — Commit to repo

Commit this protocol file and any supporting files with message:
`Add VTES section: [LABEL] · speechify=[Y/N] · mic=[Y/N]`

---

## Never do

- Add a section without a defined `id` (two sections with the same id will
  overwrite each other in the launcher).
- Mark `mic: true` without confirming dictation quality meets the standard.
- Leave `grey: true` for more than 30 days without either wiring the section
  or removing it from the launcher.
- Add a section whose data source is undefined and `grey: false`.

---

## Current section count

24 sections as of 2026-10-08. Next addition increments to 25.
See VTES artifact for current roster.

TRK-2026-9953 · v1.0 · 2026-10-08 · CURRENT
