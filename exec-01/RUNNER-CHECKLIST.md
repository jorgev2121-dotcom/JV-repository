# RUNNER CHECKLIST · the exact tool calls (written 2026-10-22, fixes RI tool-name slip, Tier 2)
Read this at the start of every WATCH and RUNNER cycle. Use ONLY these names. Never improvise a tool name.
1. Outlook new mail: `mcp__Microsoft_365__outlook_email_search` with afterDateTime = last-mail-check time, limit 10.
2. Gmail new mail: `mcp__Gmail__search_threads` with query `newer_than:1h -category:promotions -category:social`, view THREAD_VIEW_METADATA_ONLY.
3. Read a mail: `mcp__Microsoft_365__read_resource` (Outlook uri) or `mcp__Gmail__get_thread`.
4. Panel: `ArtifactData` url https://claude.ai/artifact/321Zo6MTHdv9Mj3hGD1QDj, collection task-comments, query where status == new.
5. Outbox: `mcp__Google_Drive__search_files` with title contains EXECUTED_/BLOCKER_/CLAIM_ and modifiedTime > last run. Heartbeat: `mcp__Google_Drive__create_file` (text/plain, disableConversionToGoogleType true).
6. Send to Jorge: `mcp__Gmail__send_message` to jorgev2121@gmail.com ONLY. Push: PushNotification (not after 9 PM ET).
7. Throttle: `mcp__Claude_Code_Remote__get_session` (no id).
If a tool call is rejected as nonexistent, fix the name from this list and log it in RECURRING-ISSUES.md.
- 2026-10-23: Outlook search results were truncated (moreResults:true) at 8-10 items on several WATCH cycles; a real arrival could hide on page 2. From now: use limit 25, check moreResults, and ALSO run sender-specific searches for watched people (tomtechengineer@gmail.com, Frank/Santiago Gala).
