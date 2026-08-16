---
name: orphan-onboarding
description: Onboard a loose document into the filing system - assign an OPH number, extract identity evidence, match it to a TRK or leave it as an orphan, stamp it, and log it. Use whenever a document is found outside 01-JOBS with no tracking number, or when running a sweep of any holding area (Gmail, Drive, Outlook, OneDrive, Dropbox, PaperPort, Downloads, Desktop, removable drives).
---

# Orphan onboarding

**Tracking: TRK-2026-9073. Governed by `ORPHAN-NUMBERING.md` and `CLAUDE.md` section 9.**

This is the repetitive function. It runs the same way every time, on every
location, so that no session has to re-derive it and no two sessions do it
differently.

---

## The one rule that outranks the rest

**Never file against a fuzzy match.**

On 2026-08-15 a session mapped `14598 SW 110 ST` to `TRK-2026-1262`, which is
`20001 SW 110 CT Unit 143`. It matched on the digits "110". That would have put a
client's documents in another client's folder.

A failed search costs a minute. A misfile is discovered months later by the client.

**When identity is uncertain, the document stays an orphan. That is a success, not
a failure.** An OPH number is cheap and carries no client-visible meaning.

---

## Step 1 — Issue an OPH number

Read `ORPHAN-NUMBERING.md` for the current high-water mark. Increment by **1**
(orphan numbers are plain sequential; only TRK numbers use the +3 obfuscation).

```
OPH-2026-NNNN
```

Record it immediately in `ORPHAN-REGISTER.md` with: number, date found, where
found, filename, and one line describing what the document appears to be.

**Write the row before doing any analysis.** If the session dies mid-document, the
number and the location survive. That is the whole point of writing it first.

---

## Step 2 — Extract identity evidence

Pull every one of these that the document contains. Do not summarise — copy the
literal string, because these are what searches will match on later.

1. **Property address** — full, with unit number if present
2. **Folio number** — `NN-NNNN-NNN-NNNN`
3. **Permit number**
4. **Party names** — owner, contractor, engineer, agent
5. **Date on the document** (not the file's modified date)
6. **Issuing body** — city, county, DOH, DERM
7. **Any TRK already inside the body** — the filename may not have one when the
   footer does

If the document is a scan with no text layer, note that and stop at Step 2. It
needs OCR before it can be matched. Leave it as an open orphan and flag it.

---

## Step 3 — Attempt the match

Search in this order. Stop at the first **exact** hit.

1. **Folio number** — the strongest identifier. One folio, one parcel.
2. **Permit number** — nearly as strong.
3. **Full address including unit** — must match completely. `SW 110 ST` and
   `SW 110 CT` are different streets. `Unit 143` and no unit are different jobs.
4. **Party name plus address** — name alone is never sufficient. Jorge has repeat
   clients across multiple properties.

Search surfaces:

- **Google Drive:** `title contains 'TRK-2026' or fullText contains '<folio>'`
- **This repo:** `TRK-REGISTRY.md`, then literal text search
- **Gmail:** the identifier in quotes, exact phrase
- **Desktop only:** `G:\My Drive\01-JOBS\`, OneDrive master registry

**A partial match is not a match.** If two candidate TRKs survive, that is a
no-match — go to Step 4b.

---

## Step 4 — Resolve to exactly one of four outcomes

An orphan never stays open indefinitely. Anything unresolved after 30 days appears
in the daily digest.

**4a. TRK** — exact match found. The TRK becomes the identity; the OPH is demoted
to a hashtag `#OPH-2026-NNNN` kept in the body. File per the grammar in
`CLAUDE.md` 9.1:

```
DATE _ TRK _ TYPE _ DESCRIPTION _ VERSION.ext
```

**4b. Still an orphan** — no exact match. Keep the OPH, stage it in
`_INTAKE-STAGING/01-NEEDS-TRK/`, and record in the register what evidence was
found and which candidates were rejected and why. **Recording the rejected
candidates is required** — otherwise the next session repeats the same failed
search and may talk itself into the fuzzy match.

**4c. NON-JOB** — personal, marketing, vendor, admin. Not a job document. Route to
OneDrive filing, not `01-JOBS`.

**4d. DUPLICATE** — byte-identical or a lower version of something already filed.
Note the TRK it duplicates. **Do not delete.** Deletion is RED and Jorge's
decision alone. Mark `DISCARD-PENDING` and move on.

---

## Step 5 — Stamp it

**A page identified only by its filename loses its identity the moment it is
printed, screenshotted, or pasted elsewhere.** Filename identity is for storage;
footer identity is for retrieval. Both are required.

Footer, bottom-right of every page:

```
TRK-2026-NNNN · v[N] · p047 · YYYY-MM-DD · CURRENT
```

An unresolved orphan carries its OPH in the same slot until it gets a TRK.

If a `.SEARCH.txt` sidecar is generated, the stamp goes in it too — that is how the
page stays findable after being extracted from its original file.

---

## Step 6 — Log and close

1. Append the outcome to `ORPHAN-REGISTER.md`.
2. If it became a TRK, confirm the TRK exists in `TRK-REGISTRY.md`. **Never create
   a TRK with no registry entry.**
3. If a new TRK had to be issued, check the registry for collisions first —
   "last + 3" will collide, because the +3 rule is not actually being followed in
   Drive. See `TRK-REGISTRY.md` section 2.

---

## Running a sweep — batch rules

**Rule 5 of the charter applies: more than 5 similar items means one subagent per
item, with a status registry. Never one session grinding through a list.**

A single session degrades around item 4 or 5 and then fails silently. The
Miami-Dade scrape returned 3 or 4 of 20 for exactly this reason. That is a
context-exhaustion signature, not a partial success.

1. **Enumerate first, process second.** Produce the full list of items and write it
   to a file before onboarding anything. A count you can check against is what
   turns a silent partial into a visible gap.
2. **One subagent per document**, or per tight batch of related documents.
3. **Write each result the moment it completes.** Nothing important lives only in
   a conversation.
4. **Report the denominator.** "47 of 312" is a status. "Made good progress" is
   not, and per Rule 2 it is not one of the three honest states.

---

## Where each session can actually reach

Tested, not assumed. Re-test before claiming — see RI-019.

**Cloud sessions can reach:** Gmail, Google Drive, Google Calendar, this repo,
GitHub. Nothing else. Cloud has **no browser tool** and **no filesystem access to
the PC**, and all Miami-Dade / Sunbiz / Clerk domains are egress-blocked.

**Desktop sessions can reach:** Outlook, OneDrive, Dropbox, PaperPort, Downloads,
Desktop, all local and removable drives, and the open internet via
`claude-in-chrome`.

**Microsoft 365 connector is unauthorized**, so the OneDrive master registry is
desktop-only until Jorge authorizes it.

Assign each location to the session that has verified access to it. Probe before
you claim, and probe before you reassign.

---

## Order of work — by lostness, not by count

A holding area with 800 documents that are already staged and searchable is less
urgent than a USB stick with 40 that nobody has opened in two years.

1. **Unidentified holding areas** — removable drives, phone photos, messaging
   attachments. Unknown contents, no backup, nobody looking.
2. **Email attachments** — Gmail, then Outlook. Actively growing.
3. **Cloud storage** — Dropbox, OneDrive, Drive outside `01-JOBS`.
4. **PaperPort** — large but stable, already in one place.
5. **Downloads and Desktop** — high churn, mostly duplicates of the above.

---

## The root cause this exists to fix

Recorded as RI-020, named by a desktop session:

> *The filing convention exists for outputs, not inputs. Everything downstream
> assumes the TRK is already there.*

Documents arrive from email, scanner, portal and client without a number, and
there is no step that gives them one. This skill is that step.

---

**Every handoff, mailbox file and status report produced by this skill ends with a
question.** Owner directive OD-01. A message with no question can be read and
silently dropped.
