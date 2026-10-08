# Staged: automatic round-table writer for cloud sessions (NOT ACTIVE)

`round-table.js` appends every owner message and reply, with times, to `round-table/live/` at the
end of each turn, then commits and pushes only that folder. `settings.json.STAGED` is the project
setting that would switch it on (`.claude/settings.json`).

Claude Code's safety check refused to let the session enable this for itself (self-modification),
2026-10-08 10:08 AM ET. It is switched on only with Jorge's yes, by moving
`settings.json.STAGED` to `.claude/settings.json` and `round-table.js` to `.claude/hooks/`.
Runs only when CLAUDE_CODE_REMOTE=true, so the desktop is unaffected.
