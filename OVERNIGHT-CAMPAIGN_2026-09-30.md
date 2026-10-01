# Overnight campaign — 2026-09-30, through 11:00 AM ET (15:00 UTC)

**Owner said "run the three tonight" live in cloud chat at 03:54 UTC, then asked for an
aggressive parallel push with proof of completion by 11 AM ET.** This file is the single
place to check status. **Updated 15:0x UTC, past the 11 AM ET deadline — real numbers below,
not "good progress."**

## Denominator: 1 of 3 done with proof, 1 in progress uncredited, 2 not started

## 1 — Rebuild the inbox poller: **NOT DONE**

Relayed 03:55 UTC to VTES-Inbox. **Verified directly, not inferred:** `heartbeat.json`
`modifiedTime` is still `2026-09-24T15:34:02.868Z` — bit-for-bit the same value as before
the ask. That's now ~140 hours stale. No ACK, no proof line, nothing from RAMBO. This is a
Windows-PC action; it needed an attended desktop session tonight and, on the evidence,
didn't get one.

## 2 — Make heartbeat/watcher persistence permanent: **NOT DONE**

Same file, same evidence, same reason. Bundled with #1 — whoever sits down at the PC does
both in one pass.

## 3 — CDM: GO: **DONE, with real proof — and it opened a bigger, still-open door**

Cowork picked up the relay and acted within ~90 minutes (`HANDOFF-TO-CLOUD_JOB-0100_GO.md`,
VTES-Inbox, 05:21 UTC): explicitly logged "Jorge's 'run the three tonight' reads as CDM: GO,
does not revert to HOLD," closed AP-0080, and delivered a real final pass —
`CDM_FINAL-REPORT_v1_2026-09-30.html` (19,125 B, MY-DESK) plus a manifest listing 37 seed
files with sha256 and row counts. **That part is genuinely finished and verified.**

**But that same handoff assigned three more orders to "the Cloud Code lane" — merges, an
engine build, and a calibration test — and as of the 13:21 UTC progress board, 8 hours had
passed with zero pickup.** Nobody was watching the Inbox for a mid-night, cloud-addressed
handoff the same way nobody was watching it for desktop's poller — the identical shape of
failure, on the other side of the same broken pipe. This check-in is the first time any
cloud session has seen `HANDOFF-TO-CLOUD_JOB-0100_GO.md` at all.

**Not attempted in this same pass, on purpose.** The three orders are a real engineering
job — three byte-exact CSV merges (85→110, 411→461, 73→81 rows) governed by a rulebook
this session hasn't read yet, then building calculation code that must reproduce ten TEDC
verdicts to the cent (one example figure: $214,020.00 / cutoff $210,466.31 / PHA
$199,038.60). Rushing that inside a status-check turn, right after a missed deadline, is
exactly the failure this repo's own RI-025 already named — a wrong answer that looks
confident is worse than a late one that says so. **Recommendation: treat this as its own
dedicated task, next, not squeezed into tonight's tail end.**

## What else moved overnight (unprompted, no new dispatch needed)

- Watchdog ran on schedule (07:15 ET / 11:16 UTC): 88 issues, 0 new. Correctly flagged
  both the dead heartbeat and the un-proofed CDM handoff — it's watching the same things
  this file is.
- PC is confirmed awake the whole night (uptime heartbeat fresh, 310+ hours up, no sleep) —
  so items 1/2 not landing is a "nobody sat down," not a "machine was off."
- A separate live desktop session independently corrected the 1667 fee-review status and
  logged Cowork's no-proof finding (commit `cb5af1d`, merged into this branch).
- The 71-card approval backlog and 16 blocker asks are unchanged — expected, not a new gap.

## What was deliberately not dispatched

Nothing touching credentials, payments, client-facing sends, or physical actions, and the
CDM engineering follow-on above — held for a dedicated pass rather than rushed.

## Update, ~02:30 UTC Oct 1 — the three CDM merges, dispatched and now mid-correction

After the 11am deadline passed, Jorge approved starting the three merges the 13:21Z board
flagged as unowned. Dispatched as three parallel agents (`CDM-MERGE-STATUS_2026-09-30.md`
has the original dispatch). Real status, not "good progress":

- **Registry (411→461 rows):** working in its own isolated scratch directory (smart —
  avoided the collision below). Still in progress as of this update, not yet reported back.
- **Rulebook (85→110 rows):** reported DONE, 11 parts uploaded and individually
  hash-verified. **Cowork independently re-checked it byte-by-byte** (`CDM_MERGE-VERIFICATION_v1`,
  MY-DESK) and confirmed 99+ of 110 rows exact, but found two real defects: one
  in-place-append row (R-2026-203) overwrote three cells instead of appending to them and
  dropped a fourth entirely, and one row (X-34) is missing a 200-character clause — both
  look like hand-retyping errors on the two rows that needed editing (every untouched row
  came through byte-exact). Sent back for a targeted fix; not yet confirmed re-landed.
- **Calibration (73→81 rows... except it's actually 80, see below):** the most eventful of
  the three.
  - **Real finding, not a technical nitpick: the target row count itself was wrong.**
    `BASE-2026-203` already existed in the base file; the delta's version of it was meant
    to *replace* it, not be appended under a new id. I made the append call earlier tonight
    based on the delta's own confusing wording plus Cowork's own repeated "81" tally in its
    progress boards — Cowork has now corrected itself: the right count is 80, and its own
    earlier count caused the error. Logged so the next session doesn't re-derive this from
    scratch.
  - **Cowork's same independent check caught a second, unrelated defect**: one row (GAP-10)
    landed with 23 of 31 columns in an earlier, partly hand-typed attempt at this file (a
    `CDM_..._v15_2026-09-30.csv` + 21 `ZTMP-v15-part*` fragments, all now superseded).
  - **Separately, this session found and fixed a tooling bug**: the agent's merge script
    rebuilt every row through Python's `csv` module, which re-quotes fields and changes a
    row's exact bytes even when the content is identical — this would have failed every
    single byte-exact check Cowork runs, not just the flagged rows. Rebuilt the merge using
    verbatim byte-level row copying instead; re-verified three of the four flagged rows
    against Cowork's own expected hashes and they now match exactly.
  - Corrected 80-row file built and handed back to the agent to re-split, re-upload, and
    clean up the two abandoned attempts (the old 81-row PART-1/2 uploads and the 21 ZTMP
    fragments). Not yet confirmed landed.

**New process finding, logged to `RECURRING-ISSUES.md` as RI-050:** the rulebook and
calibration agents were both given the same shared scratch directory and both defaulted to
identical generic filenames (`PART-1.csv` through `PART-6.csv`), and one agent's output
silently overwrote the other's mid-run. No data was lost on Drive (each agent verified its
own upload before the collision happened), but it was close — the registry agent avoided
this entirely by using its own isolated subdirectory on its own initiative. Future fan-outs
sharing a scratchpad should give each agent its own named subdirectory from the start.

## Update, ~02:50 UTC Oct 1 — registry merge done, and it checks out

**Registry (411→456 rows, not the originally stated ~461): reported DONE, 25 parts
uploaded, and this time independently spot-checked rather than taken on trust.** The
agent's own report flagged something worth real scrutiny on its own: the target had been
~461 everywhere it was written down, but it delivered 456 and explained why — every delta
file assumed it was building on a hypothetical 416-row intermediate base that was never
actually produced, and 5 rows each delta thought it was adding fresh (C-ET2-13, C-ET2-14,
C-ET2-15, C-ALL-11, S-ET2-11) already existed in the real, hash-verified 411-row base.

**Checked directly rather than accepted:** downloaded the agent's local copy of the real
base file, confirmed its hash matches the known-good value, parsed it with a proper CSV
reader (not naive line-splitting, since this file has embedded newlines inside quoted
cells), and confirmed all 411 rows are unique with no duplicates — and all five of the
"already there" ids the agent named are genuinely present, exactly once each. The claim
holds up independently, not just on the agent's say-so.

**This is the one of the three merges that needed no correction round** — it worked in its
own isolated scratch subdirectory from the start (avoiding RI-050 entirely) and its central,
most-suspicious claim survived an outside check. Not claiming a full row-by-row audit the
way Cowork ran on the other two — this was a targeted spot-check of the one thing worth
doubting, not exhaustive verification.

## Update, ~03:10 UTC Oct 1 — rulebook merge: DONE, fully confirmed

**Rulebook (85→110 rows): both Cowork-flagged defects fixed, re-verified against
Cowork's own expected hashes, and closed.**

- **X-34** — expected hash `bb028fbb3cada8e8` from Cowork's verification sheet,
  cross-checked by the agent against its live, currently-deployed row: exact match.
  Clean.
- **R-2026-203** — this row has no single post-merge target hash to check against.
  Cowork's sheet shows a composite value (the two *source*-row hashes being merged,
  not a computed target), because it's an in-place-append, not a plain replace —
  there's no independently-pre-computed "correct final bytes" for a row built by
  concatenating two sources. The agent's own fix — rebuilding the row from the actual
  v8/v12 source cells, concatenating old + separator + new across all four affected
  cells (rule_as_extracted, round_status, verification_status, notes, plus restoring
  the previously-dropped evidence_artifact field) — is the correct and sufficient
  check for this row. Closed on that basis, not on a hash that was never going to
  exist.

**110 data rows across 11 verified Drive parts, no further corrections outstanding.**
This is the second of the three merges fully closed (registry, now rulebook).
Calibration is the last one still mid-correction (80-row rebuild, re-upload, cleanup
of the old 81-row parts and the 21 ZTMP fragments — not yet confirmed landed).

## Next check

**2 of 3 CDM merges fully done and verified: registry (456 rows) and rulebook (110
rows).** Calibration (80 rows) is the only one still open. No further automatic check
queued — watching for the calibration agent's final report.
