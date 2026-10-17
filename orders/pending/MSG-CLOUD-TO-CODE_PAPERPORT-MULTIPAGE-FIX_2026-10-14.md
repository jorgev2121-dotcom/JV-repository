# MSG-CLOUD-TO-CODE · PaperPort multi-page feeder fix · 2026-10-14

**Window:** 🖥️ DESKTOP EXECUTOR (Claude Code on Jorge's PC). Not for cloud or Cowork.
**Class:** YELLOW. Settings change, rollback recorded first. No client documents touched.
**Owner's words, verbatim:** "fix my Paperport currently I scan multiple documents through the feeder and only the first page is displayed"
**Related:** RI-021 (PaperPort Send To Bar empty). Not the same fault; check RECURRING-ISSUES.md before proposing anything beyond this order.

## Section A. Likely causes, ranked

1. **Display, not scan.** A multi-page item shows only page 1 as its thumbnail. All pages may already be inside. (Check step B first. If true, nothing is broken.)
2. **Profile/Source set wrong.** The scan profile Source is Flatbed, or not set to the feeder (ADF / Duplex ADF). Source: Windows Report guide (third party).
3. **Old or wrong scanner driver.** Outdated TWAIN driver, or WIA used instead of TWAIN. Source: Windows Report guide. HP forum and Scanitto FAQ show the same symptom on other scanners from driver feeder-check handling.
4. **Single-page output setting.** The profile's "single page items" option makes one file per page (Tungsten help describes it). Then pages land as separate items, or only one is noticed. Exact label: check.
5. **Scanner dialog hidden or shown.** The Windows Report guide says to use advanced setup, custom mode, and enable "Hide scanner native user interface". Whether to hide or show is unconfirmed: try both.

## Section B. Order of work

**Step 0. Never delete or move any existing scan.** Read-only on all existing files. Test scans go to a new folder named PaperPort-TEST-2026-10-14 only.

**Step A. Record current settings FIRST (rollback).**
1. Screenshot: Scan pane, the selected profile, and its Settings dialog (every tab).
2. Screenshot: Desktop Options (Scan and file-format tabs).
3. Screenshot: the scanner's TWAIN dialog, if it opens.
4. Write all values as text to `PAPERPORT-SETTINGS-BEFORE_2026-10-14.md` in VTES-Outbox. Note PaperPort version (14 or 14.5), scanner make/model, driver version, and whether the profile uses TWAIN or WIA.
5. Export the PaperPort settings registry key to a .reg file (HKCU\Software\Nuance\PaperPort or ScanSoft, check which exists). Name it `PAPERPORT-SETTINGS_bak-20261014.reg`. Do not edit the registry otherwise.

**Step B. Did the last feeder scan keep every page?**
1. Open the most recent feeder scan (read-only, do not save).
2. Record page count. Switch to Page Thumbnails view (check exact button name) and screenshot.
3. If all pages are there: cause 1. Record it, fix is "use Page Thumbnails view", and stop at proof step E using this scan as evidence plus a fresh 3-page test.
4. If only one page: continue.

**Step C. Apply fixes one at a time. After EACH, scan a 3-page test from the feeder and record the page count.**
1. Profile Source: set to ADF / feeder (Duplex ADF only if the scanner supports it). Re-test.
2. Profile Settings: make sure the "single page items" option is OFF and any multi-page / "scan multiple pages" option is ON (labels: check). Re-test.
3. Toggle the scanner-dialog option ("Hide scanner native user interface", per Windows Report) and re-test both ways. In the scanner's own dialog, make sure the feeder / "scan all pages" choice is selected.
4. Choose TWAIN, not WIA, for the scanner if both are listed. Re-test.
5. Update the scanner's TWAIN driver from the maker's site (note exact model first). This is a software install: if it needs a download choice Jorge must make, log BLOCKED with the one-click ask. Re-test.
6. Desktop Options file format: PDF versus PaperPort .max. Test PDF output. Re-test.
Stop at the first fix that gives 3 of 3 pages. Record which one.

## Section C. Rollback

Restore every value recorded in Step A (settings document + screenshots + .reg file). Rollback script goes to `C:\Users\JV\OneDrive\Documents\Reports\Undo_Manifests\Rollback_PaperPortSettings_2026-10-14_HHMM.ps1` per charter. Test scan files are the only thing that may be removed, and only in the PaperPort-TEST folder: but deletion needs Jorge's yes, so leave them.

## Section D. Proof (required for DONE)

`EXECUTED_PAPERPORT-MULTIPAGE_2026-10-14.md` in VTES-Outbox containing:
1. Before-settings summary and which fix worked.
2. Screenshot of a 3-page feeder test showing 3 pages in Page Thumbnails view.
3. Page count of the test item (3 of 3).
4. Rollback path.
No screenshot showing 3 pages = not done. If nothing works: report BLOCKED with every attempt and the one small ask. Stamp: TRK-2026-NNNN or OPH number per the registry (do not invent one).

## Section E. Sources

- Windows Report, "PaperPort Only Scanning First Page: 5 Ways to Fix it": https://windowsreport.com/paperport-14-wont-scan-multiple-pages/ (third party; page itself could not be opened from the cloud, search summary only)
- Tungsten PaperPort 14.7 help, Settings tab: https://docshield.tungstenautomation.com/PaperPort/en_US/14.7.0-ng2rrq9m4g/help/Content/hid_dlg_tab_scanningsettings.htm (not opened; snippet mentions "single page items")
- Scanitto FAQ (driver feeder-check, other software): https://scanitto.com/support/faq/6.html
- HP forum, same symptom on Officejet 8740: https://h30434.www3.hp.com/t5/Unanswered-Topics-Printers/Document-Feeder-Fails/m-p/6388254
- Unconfirmed: exact label for multi-page option in 14 / 14.5, Page Thumbnails button name. Marked "check" above.

Did this order make sense to run tonight, or should it wait for the scanner to be on?
