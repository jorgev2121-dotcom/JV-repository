# Capsule helper spec (used by the always-on runner, 2026-10-13)

Build ONE ENHANCED Orange Tree job capsule per STANDING-ORDER_ENCAPSULATE-EVERY-JOB_2026-10-13.md part A.

- Template: styling/scripts of reports/CAPSULE-ENHANCED_TUS-26-1018_2026-10-13.html (pilot); Findings branch and money lock as in reports/CAPSULE-ENHANCED_TRK-2026-1262_2026-10-13.html.
- Status at a glance + what's missing; folders → documents with real Drive links (https://drive.google.com/file/d/<id>/view); people/contacts; hashtags; checkboxes; "View these together"; "Copy for email"; color print; all money behind 0000.
- Never file:///. Keep page under ~60 KB: huge folders (OneDrive copies, _FROM-ARCHIVE, microfilm, raw) are counted per folder with a folder link.
- Steps: (1) list the full tree with Drive search_files (excludeContentSnippets true); read _PLACEHOLDERS.md, _ARRIVALS_*, _TAGS/_HASHTAGS, _STAGE, _VERSION-LOG if present, and inbox-sweep/PEOPLE-INDEX.md lines for the job. (2) Write reports/CAPSULE-ENHANCED_<JOB>_2026-10-13.html with §9 footer stamp. (3) Upload as NEW file _CAPSULE-ENHANCED_<JOB>_2026-10-13.html into the job folder (create_file, text/html, disableConversionToGoogleType true). (4) Verify N of M docs, file:// = 0, download back and compare size/hash. (5) Write runner-results/CAPSULE_<JOB>_2026-10-13.md.
- Never move/rename/overwrite/delete anything; findings go in the capsule only. No email, no messages, no git commit.
- Return a short report: Drive id, counts, top status, top findings.
