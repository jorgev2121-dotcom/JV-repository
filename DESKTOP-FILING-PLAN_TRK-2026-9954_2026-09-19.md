# Desktop filing plan — TRK-2026-9954

**Drafted by cloud 2026-09-19, at Jorge's request ("go straight to drafting the filing
plan"). This is the SCHEME, not the execution.** Cloud has no filesystem access to the
PC (verified — see `orphan-onboarding` skill, "where each session can actually reach").
Applying this plan to the real ~150-icon Desktop is Desktop/Cowork work; the actual
move-list comes back here for Jorge's one-word yes before anything crosses into
`01-JOBS`.

Governed by `ORPHAN-NUMBERING.md`, `CLAUDE.md` §9, and the `orphan-onboarding` skill.
This is RI-020 item 1 (the Desktop as an unmanaged holding area) — see that entry for
why "just file it all now" is the one approach this plan does not take.

---

## Honest priority note before the plan itself

The `orphan-onboarding` skill ranks holding areas **by lostness, not by count.**
Desktop is its lowest-priority tier (5 of 5) — "high churn, mostly duplicates of the
above" — below removable drives, email attachments, cloud storage, and PaperPort.
**That doesn't mean don't do it** — Jorge asked directly — it means: if the survey
(PASTE-X-009) turns up genuinely orphaned client documents nowhere else on record,
those jump the queue; if most of the 150 icons turn out to be shortcuts and app
launchers, this was cheap and low-stakes, exactly as the skill predicts.

---

## Step 0 — Sort the 150 icons into four buckets before anything else

Not every icon on that Desktop is a "file" in the sense the OPH process means.

1. **Shortcuts (`.lnk`)** — harmless to move or delete; they just repoint. Not a
   filing action, no rollback needed. Sweep these into a `_SHORTCUTS` folder or
   remove duplicates freely.
2. **Applications / installers** — leave alone or move to `_APPS`. Not job documents.
3. **Empty files or folders** — quarantine, don't delete. Move to
   `_EMPTY-QUARANTINE\<today's date>\` intact, so an empty folder that turns out to
   matter (a placeholder someone was about to fill) isn't destroyed.
4. **Real documents and real job-identity folders** — everything else. This is the
   only bucket the OPH process below applies to. **Folders that are already
   client/address-named (e.g. an address, a client name) are not "generic files by
   type" — they're already job-identity carriers and go straight to Step 2, not
   into a type folder.**

Bucket 4 is very likely under 30 real items once shortcuts and apps are pulled out —
the survey (PASTE-X-009) will give the real count instead of guessing from icon size.

---

## Step 1 — OPH numbers, per the standing skill (Batch Rule applies)

**Per `orphan-onboarding`'s own batch rule: if bucket 4 has more than 5 items, one
subagent per document (or tight related batch), never one session grinding through
the list.** Each gets:

1. An OPH number, incremented by 1 from `ORPHAN-NUMBERING.md`'s current high-water
   mark — **issued and logged to `ORPHAN-REGISTER.md` before analysis starts**, so a
   killed run still leaves the number and location on record.
2. OCR (if it's a scan with no text layer, that's noted and the item stops at
   "needs OCR" — it does not get a match attempt yet).

---

## Step 2 — Identity evidence, extracted not summarised

Per document: property address (with unit), folio number, permit number, party
names, the date **on** the document, issuing body, and any TRK already inside the
body text. Copy literal strings — these are what later searches match on.

---

## Step 3 — Match attempt, exact only

Order: folio → permit → full address+unit → party name+address. **A partial match
is not a match.** Two surviving candidates = no match, not a coin flip.

**The one rule that outranks the rest, restated because this plan is exactly the
scenario it warns about:** never file against a fuzzy match. `14598 SW 110 ST` is
not `20001 SW 110 CT Unit 143` — that exact collision already happened once. When
identity is uncertain, the document stays an orphan. **That's a success, not a
stall.**

---

## Step 4 — One of four outcomes, nothing left half-resolved

- **TRK found** — files per `CLAUDE.md` 9.1 grammar; OPH demotes to a `#hashtag` kept
  in the body.
- **Still an orphan** — stays in `_INTAKE-STAGING\01-NEEDS-TRK\`, with rejected
  candidates recorded (not just "no match") so the next pass doesn't repeat the
  same failed search.
- **NON-JOB** (personal/marketing/admin) — routes to OneDrive filing, never `01-JOBS`.
- **DUPLICATE** — noted against the TRK it duplicates, marked `DISCARD-PENDING`.
  **Never deleted** — deletion is Jorge's decision alone.

---

## What comes back before anything moves into `01-JOBS`

One list: every bucket-4 item, its OPH, its match outcome, and the proposed
destination. **Jorge reviews that list once — not each item — and says yes.** Then
the move executes with a `.bak` + rollback script per `AUTONOMY.md`'s YELLOW rules,
in batches under the 20-action blast-radius limit, not in one sweep.

**Question:** once the survey (PASTE-X-009) and this plan are both in Cowork's hands,
should quarantining empties and sweeping shortcuts/apps (Step 0, buckets 1-3) go
ahead immediately since nothing in those three buckets is a filing decision — or hold
even those for the same single yes?
