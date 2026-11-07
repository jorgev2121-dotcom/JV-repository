# HASHTAG-PEOPLE v2 — per-job helper spec (GREEN: new file only)

Owner request 2026-10-13 (OVERNIGHT-QUEUE item HASHTAG-PEOPLE). One helper per job (CLAUDE.md Rule 5).
Goal: people named in job tags 8 of 40 (20%) → 40 of 40.

Tools: ToolSearch "select:mcp__Google_Drive__search_files,mcp__Google_Drive__read_file_content,mcp__Google_Drive__create_file".

For the ONE job you are given (Drive folder id + title):
1. Read `control-panel/hashtag-census/<folder_id>.json` (people, companies, keywords, title).
2. In Drive, find in that folder (parentId = '<id>'): `_HASHTAGS.txt`, `_TAGS.txt`, any `_HASHTAGS_v2.txt`.
   If `_HASHTAGS_v2.txt` already exists: STOP, write status SKIPPED-EXISTS. Never overwrite.
3. Read the old tag file(s). Merge into one list:
   - keep every old tag;
   - add `#First-Last` for each person, `#Company-Name` for each company (hyphens, no spaces);
   - add likely misspellings as plain words on a "Misspellings:" line (not as hashtags);
   - keep the job TRK tag; DROP the stray admin-band tags #TRK-2026-9490 and #TRK-2026-9754 (bug in DD-BOOK generator) and list under "Removed:" ONLY tags actually present in the old file (else "Removed: none").
   - NEVER invent a TRK. If the folder has none (FOLIO-TBD, TRK-TBD), leave it as it is.
4. Create `_HASHTAGS_v2.txt` in that folder: mimeType text/plain, disableConversionToGoogleType true.
   Layout: line 1 `# HASHTAGS v2 · <TRK or folder title> · 2026-10-14 · merged from _TAGS.txt/_HASHTAGS.txt + people census`,
   then one tag per line, then `Misspellings:` line, then `Removed:` line, then footer `#HASHTAG-PEOPLE-v2`.
   No money amounts, no passwords, no SSNs, no full card numbers.
5. Do not move, rename, edit, delete anything. New file only.
6. Append one line to `control-panel/hashtag-census/_V2-STATUS.tsv`:
   `<folder_id>\t<DONE|SKIPPED-EXISTS|BLOCKED>\t<people added>\t<drive file id or reason>\t<UTC time>`
7. Scratch files only in /tmp/claude-0/-home-user-JV-repository/6cf01967-6ccb-5506-8c1b-e9975b663611/scratchpad/<folder_id>/. Do not git commit.
Reply with one line: id · status · people added · new file id.
- If the old tags carry a DIFFERENT TRK than the folder title (e.g. Cutler Bay old tags had #TRK-2026-10052 and #TRK-2026-1667), keep them but add a line "Check: other TRK tags present: ..." so Jorge can decide in the morning.
