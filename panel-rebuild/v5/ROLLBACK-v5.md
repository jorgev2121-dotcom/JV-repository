# ROLLBACK - launcher v5 (TRK-2026-9910-B)

Section A - The one-line answer
`ROLLBACK-v5.ps1 -NewDir "<the new folder>"` removes only what the install record lists. Jorge's v3 file is not involved at all: it was never changed, so there is nothing to put back.

Section B - What it does
1. Reads `<new folder>\v5-install-record.txt`, which INSTALL wrote BEFORE it copied anything, so even a half-failed install can be rolled back.
2. PRINTS every file, folder and stub it will remove, then removes exactly those. `-DryRun` only prints.
3. Refuses (exit 3, nothing removed) a record that lists a path outside the new folder, a path with `..`, a stub that is not a Rollback_Panel-v5 file in an Undo_Manifests folder, or a record that names a different folder.
4. A file in the new folder that is NOT in the record is never touched, and then the new folder stays (exit 4, the leftovers are named). A folder with no record is never removed (exit 2).
5. It removes the new folder itself only when it is empty afterwards. The parent folder is never removed.

Section C - Backup rule
v5 never edits an existing file, so there is no `.bak` to make or restore. The rollback of a new folder is deletion of the new files; the v3 launcher stays as it is (charter: "silently overwriting an old version" cannot happen here).

Section D - Proof
Scenarios S1 to S17 (RESULT file): after install and rollback the whole fixture is byte-identical to before, including the parent folders; after a half-failed install (hook stops before a file) the rollback removes everything; two rounds in a row are clean; a doctored record is refused; a file added to the new folder survives.

Did the rollback print "v5 rolled back completely"? (yes/no)

TRK-2026-9910-B · ROLLBACK-v5 · v1 · 2026-10-06 · CURRENT · #VTES-control-panel #panel-v5
