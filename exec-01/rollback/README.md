# EXEC-01 rollback scripts
#EXEC-01 #ROLLBACK

1. **No YELLOW or RED action has run yet.** So there are no rollback scripts yet.
2. Every action so far (3, all GREEN, on 2026-10-14) only read files or wrote new files. Nothing needs undoing.
3. **Where they will go:** this folder, `exec-01/rollback/` in the repo, with a Drive copy in VTES-Outbox / EXEC-LOG / rollback.
4. **Name:** `Rollback_<Action>_<YYYY-MM-DD>_<HHMM>.<ext>` (`.ps1` for PC changes, `.md` steps for cloud changes such as a scheduled-task edit).
5. PC changes also get a copy in `C:\Users\JV\OneDrive\Documents\Reports\Undo_Manifests\` (CLAUDE.md section 9).
6. **Rule (charter section 3, rule 1):** the script is written and saved before the action runs. Each new kind of change gets its rollback tested once.
7. The EXEC-LOG line for each action names its script path here.

Anything else this folder should hold?
