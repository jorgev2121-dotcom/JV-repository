# Methodology — scraping to delivery, end to end

Asked by Jorge Valdes 2026-10-06. Sources: CLAUDE.md §9 (tracking, filename grammar, stamps), TASK-11 (proof standard, ladder), MIAMI-DADE-SITES.md (TRK-2026-9007), the 2026-08-15/16 run (TRK-2026-9078). Items marked **PROPOSED** are mine and need Jorge's yes; everything else is existing convention.

## Who does what
1. **The cloud keeper cannot reach the county sites** (outbound block). It writes orders and checks results in Drive.
2. **The desktop (RAMBO) and its helpers scrape.** One helper per site.

## The workflow (Section A)
1. **Order.** Jorge's order is written to VTES-Inbox as a file. It names the sites, the depth, and the property or catalog it serves.
2. **Number.** A job lookup uses that job's TRK. A reference catalog uses the existing admin number TRK-2026-9078. A document with no known job gets an OPH number. Nobody invents a TRK; a new TRK means a registry entry, which is RED and needs Jorge.
3. **Pick the method, cheapest first:** official data feed, then a plain page request, then the county map service (ArcGIS), then the browser, then manual. Public pages only. No logins, no passwords, no getting around a captcha.
4. **One helper per site.** A status line per site: "n of N".
5. **Retrieve and keep the raw copy untouched:** the page or data as received, plus a screenshot. The original is never overwritten.
6. **Proof standard.** Proof is real data for a real property, quoted as text: the working URL, the input needed, the actual result, whether the browser was needed, how long it took. "No record found" is a valid finding. A screenshot alone is not proof.
7. **Status per site:** EXECUTED-WITH-PROOF, PARTIAL, or BLOCKED with the reason. A site that blocks is logged and the run moves on.
8. **Write each result the moment it finishes,** never at the end.
9. **Make it searchable.** OCR any PDF. Write a `.SEARCH.txt` sidecar. Put the TRK number and hashtags in the file body.
10. **Name it by the grammar:** `DATE _ TRK _ TYPE _ DESCRIPTION _ VERSION.ext`. Example: `2026-10-07 _ TRK-2026-1292 _ Evidence _ Property Appraiser Folio Search _ v1.pdf`. A page that needs its own identity gets `_ p047` at the end.
11. **Stamp the footer of every page:** `TRK-2026-#### · v1 · 2026-10-07 · CURRENT`.
12. **File it** (see Section B).
13. **Index it.** One clickable list. Drive web links only, never `file://`. File counts are real counts.
14. **Verify.** Read back what was written. Open the links. A second window (Codex) re-fetches one site at random.
15. **Log and make it undoable.** `_VERSION-LOG.md` in the folder. A `.bak-YYYYMMDD` copy before any edit. A rollback script in `Undo_Manifests`. A line in OPEN-ITEMS.
16. **Deliver.** The index opens on Jorge's phone. Report with a denominator, not "good progress."
17. **Keep it fresh.** Twice a month, request each address without logging in. If it moved or died, flag CHANGED and propose the new address.

## Where it goes (Section B — folders)
1. **Run record for a county catalog:** Drive `_CLAUDE-MAILBOX\COUNTY-PROOF-TRK-2026-9078\`. Existing files are named `SITE-NN_slug.md`. **PROPOSED:** each new run gets its own dated subfolder, `RUN-YYYY-MM-DD\`, so old runs are never overwritten, and the clickable index sits at the top of the folder.
2. **Results about one property or job:** that job's capsule under `G:\My Drive\01-JOBS — ONE SOURCE OF TRUTH\TRK-2026-#### - Name\`, in the capsule's existing numbered subfolder. The desktop confirms the exact subfolder name; **I will not invent one.**
3. **Not an active job:** OneDrive master filing cabinet. The Desktop is never storage.
4. **Moving or renaming an existing client document is RED.** Writing a brand-new file into the folder an order names is fine.
5. **Never file against a fuzzy match.** Fuzzy matching is for searching only.

## What stops the line (Section C)
1. A login, a captcha or a verification code: it becomes a BLOCKER with one small action for Jorge.
2. Anything outbound, spend, delete or password: Jorge approves first.
3. A dead run is caught when its output file stops growing, not when the process vanishes.

TRK-2026-9960 · v1 · 2026-10-06 · METHODOLOGY (cloud keeper)
