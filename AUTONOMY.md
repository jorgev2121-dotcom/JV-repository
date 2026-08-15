# AUTONOMY.md — What an executor may do without asking

**Issued 2026-08-15 at Jorge's direction. Applies to every Claude executor —
desktop and cloud.**

---

## 1. The objection, recorded before the rules

Jorge asked for autonomous executors on both sides. The direction is right. **But
autonomy multiplies error rate, and this system produced three confident errors in a
single day:**

1. Desktop reported the OCR run as a total loss. It was not — 54 files had been
   written successfully.
2. Cloud told Jorge `.NNN` numbering was not deployed. It was, and an owner directive
   adopting it had been signed four days earlier.
3. Desktop designed a cloud↔desktop bridge whose cloud endpoint was a Windows path no
   cloud session can reach.

**Each was stated with full confidence and none was flagged as uncertain.** An
executor that is wrong ten percent of the time and takes a hundred unattended actions
produces ten wrong actions with nobody watching.

**So the guardrail that matters is not rollback. It is classifying actions by
reversibility before they are taken.** Rollback assumes you noticed. The point of
these rules is to make the unnoticed case harmless.

---

## 2. The permission ladder

### GREEN — act freely, never ask, no announcement

- Read anything, anywhere you have access
- Create **new** files
- Append to logs, ledgers, registries
- Commit and push to the working branch
- Web research and scraping of public sources
- Draft emails **into drafts** — never send

### YELLOW — act, but leave an undo, and log it

Permitted unattended, on three conditions: **a `.bak-YYYYMMDD` copy first, a rollback
script written before the change, and a line in the daily digest.**

- Edit an existing file
- Rename or move files
- Enable or disable a scheduled task
- Change an application or OS setting
- Reorganise folders

Rollback scripts go to
`C:\Users\JV\OneDrive\Documents\Reports\Undo_Manifests\` as
`Rollback_[Action]_[YYYY-MM-DD]_[HHMM].ps1` — Jorge's existing convention, now
mandatory rather than optional.

**No rollback script means the action is not permitted. Write it first, not after.**

### RED — never unattended, no exceptions

- **Delete anything.** Move to `_Superseded\` instead; deletion is Jorge's alone
- Send email or any outbound message to a third party
- Anything that costs money
- Modify the **contents** of a client-facing document or a live TRK job folder
- Uninstall software
- Registry writes outside an explicitly approved list
- Push to any branch other than the working branch
- Change these rules

---

## 3. The brake

**A file named `STOP-AUTONOMY.txt` anywhere in `G:\My Drive\_CLAUDE-MAILBOX\` halts
all unattended action immediately.**

Every executor checks for it at the start of every run. If present: stop, do nothing,
report that autonomy is halted and wait.

Jorge can create it by hand in five seconds with no command and no technical
knowledge. **That is the point — the emergency brake must be reachable by the person
who is not technical.**

---

## 4. The blast-radius limit

**No more than 20 YELLOW actions in a single unattended run.** On reaching 20, stop
and write a digest entry saying what remains.

A runaway loop that damages twenty files is recoverable. One that damages two thousand
is not.

---

## 5. The daily digest — one message, not a stream

Once per day, one summary of everything done unattended: GREEN actions counted,
YELLOW actions listed individually with their rollback paths, anything BLOCKED, and
anything an executor is uncertain about.

**Per-action notifications are forbidden.** Jorge has ADHD and interruption is
expensive; a stream of pings is worse than silence.

---

## 6. Uncertainty must be spoken

Given the three errors in section 1, this is not optional.

**When an executor states a fact that drives a decision, it states how it knows.**
"No results in a 15-file sample" is not "not in use." "The log says it failed" is not
"it failed" — check the output.

**An unattended run may not act on an unverified claim.** Verify it, or log it as
uncertain and leave it for a live session.

---

## 7. Division of labour

**Cloud, unattended, hourly, day and night:**
public web scraping including the Miami-Dade sites; repo, ledger and documentation
work; reconciliation and analysis.

**Cloud, live sessions only:**
Google Drive and Gmail. Scheduled cloud runs have no connector access.

**Desktop, always:**
anything touching the PC — OCR, files, settings, scheduled tasks, installs, Outlook,
the registry — and OneDrive, which cloud cannot reach at all.

---

## 8. RESOLVED 2026-08-15 — renames inside 01-JOBS are YELLOW

**Ruled by the desktop executor, which is the side that performs these renames.** Its
argument is accepted:

Renames inside active job folders happen frequently — tracking-number
standardisation, address corrections, client-name updates. **Making them RED would
stall the system.** They are reversible, they destroy no job data, and the audit trail
is written. The residual risk is orphaning cross-references, and requiring a rollback
script forces the impact to be thought through first.

**Additional conditions it imposed on itself, adopted as binding:**

1. Rename only on an owner directive — never on an executor's own initiative
2. Zip the entire folder structure before renaming, not just the file
3. Rollback script must reverse the rename **and** restore the structure
4. Log it in `_RENAME-LOG.md` inside the job folder: timestamp, old name, new name, reason
5. `STOP-AUTONOMY.txt` halts it mid-run

## 8b. RESOLVED — where file tagging sits

The desktop asked whether stamping TRK numbers, hashtags and OCR sidecars onto
existing files is GREEN or YELLOW.

**The line is whether the original file changes.**

- **GREEN — creating a new companion file.** `.SEARCH.txt`, `.TAGS.txt`, a sidecar, an
  index entry. The original is untouched, so there is nothing to roll back. This is
  file *creation*, which is already GREEN.
- **YELLOW — writing into the original.** Stamping a footer into a PDF, editing
  metadata in place, renaming. The original changes, so `.bak` + rollback + digest
  apply.

**"Append-only" is not the test — an append still modifies the file.** The test is
whether the byte stream of the original is altered. If it is, it is YELLOW.
