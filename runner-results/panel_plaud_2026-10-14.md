# Panel PLAUD tab — 2026-10-14

**State: DONE (local file only — not republished, not committed by this run).**
Panel: `control-panel/VTES-Control-Panel_v13_connect-wired_2026-10-12.html`

## New count
- PLAUD: 3 of 3 pieces = **100%** (was 0 of 3).
- Whole panel: **87 of 116 = 75%** (was 84 of 116 at commit 3986757, "Panel v48: CLIENTS to 100%").

## What was built
1. **List recordings** — static snapshot of the 50 most recent Plaud recordings (2026-08-20 to 2026-10-10), stamped
   "snapshot taken 2026-10-14 12:44 UTC". Each row: date and time (Eastern), length, title, Plaud file id.
   20 have a real title; 30 are titled only with a date; 21 are under 10 seconds. The panel has no Plaud connector, so no live call.
2. **Transcript links** — Plaud's API returns no web-page URL for a recording (list_files has no URL field; get_file only
   gives a signed audio link that expires in 1 hour; note links also expire in 1 hour). So every row says
   "open in the Plaud app" with a Copy id button. No signed links and no transcript text are in the page.
   The id is shown in groups of 8 (so no long digit run appears); Copy id copies it without spaces.
3. **File to TRK suggestion** — labelled "Suggestion only — filing needs your yes" on every row. Matched on title words,
   plus the summary note for 5 recordings, against `_JOBS.tsv`, the census JSON files and `inbox-sweep/PEOPLE-INDEX.md`.
   - 08-20 "Units 815, 1016, 307" -> TRK-2026-1265 Bal Harbour Permit Status, **high** ("City of Bal Harbour", "Miguel" = Miguel Zaldivar, "Durron" = Doron).
   - 08-26 "Window Installations, Permits, and Invoice Dispute" -> TRK-2026-1265, **med** ("Val Harbor" = Bal Harbour).
   - 09-12 "... Potential TDC Job" -> TRK-2026-1296 TEDC company folder, **low** ("TDC" = TEDC; 4 TEDC folders exist).
   - The other 47: **no match**, each with a one-line reason. No TRK was made up.

## Tests (all pass)
- `tools/panel/test/plaud-test.js` (new): RESULT ALL PASS, 23 checks. Run with the pre-PLAUD baseline as 3rd argument (see note).
- `phone-width-test.js`: RESULT ALL PASS.
- `menu-glossary-test.js`: RESULT ALL PASS.
- `money-lock-test.js`: exit 0 (locked = 0 amounts visible across 26 tabs; wrong code refused; relocks).

## Note for whoever commits
A WIP commit (dcc9f10, "WIP: panel PLAUD in progress") landed in git HEAD while this was being built, and it already
holds part of this work. So "BUILD up by 3 vs git HEAD" reads 87 -> 87. Against the real pre-PLAUD commit 3986757 it reads
84 -> 87. To re-check: `git show 3986757:<panel> > /tmp/base.html`, then
`node tools/panel/test/plaud-test.js <abs panel> <png> /tmp/base.html`.

## One correction made during the build
One file id was mistyped by hand at first (08-26 recording). The test caught it, and a second Plaud listing confirmed all 50 ids match.

#plaud #control-panel #TRK-2026-1265
