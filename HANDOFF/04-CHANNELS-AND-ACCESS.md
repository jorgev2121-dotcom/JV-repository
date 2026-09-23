# 04 - Channels and access

**Files are the only memory. Chats are forgotten.**

1. **Git repo** `jorgev2121-dotcom/JV-repository`: charter, skills, logs, handoffs. Cloud Claude
   sessions and Codex can read and write it. The default branch is `claude/chaude-code-max20-kp2o46`.
2. **Google Drive (the single source of truth for job files)**
   - Jobs: `01-JOBS - ONE SOURCE OF TRUTH/TRK-... _ folio _ address/`.
   - Mailbox (AI to AI), folder id `1hI2TmVn86Cnh7h_6s93TG0KE1QzVCV5F`. To send, write
     `MSG-<FROM>-TO-<TO>_<SUBJECT>_<TRK>_<DATE>.md`. The desktop poller writes `ACK_..._AUTO.md` and later
     `RESULT_...` / `REPLY-TO-...`. Status files live in folder `1NDadXJz9eKpRbmYrE-CRH2RtKbynQClN`.
   **Every job MUST tell the executor to finish with `EXECUTED_<job name>.md` or `BLOCKER_<job name>.md`
   in `G:\My Drive\VTES-Outbox\`.** Anything else, such as a `RESULT_` file, counts as silence: the
   executor marks it FAILED-VERIFICATION, retries once and then drops it (it happened on 2026-09-23).
3. **Desktop PC executor** (Claude Code on Jorge's Windows PC, called RAMBO). It has Chrome, the county
   and Sunbiz websites, Outlook, and local files. Reach it only through the Drive mailbox.
4. **Cowork**: Claude with computer use on the PC. Reach it by a paste block (PASTE-X) that Jorge
   drops in, or through the mailbox.
5. **Cloud Claude Code** (this outgoing session): repo, Drive, Gmail, Outlook (Microsoft 365),
   Calendar and GitHub tools. It cannot reach county sites or Sunbiz (network allow-list).
6. **Email:** Outlook `Jorge@TeamUsaSales.com` is the business mailbox; Gmail `jorgev2121@gmail.com`
   is personal. **Sending is RED.**
7. **What Grok needs before it can execute (not just advise):** read and write access to Drive, and
   either GitHub or the Drive mailbox. Without them Grok can plan, but a Claude executor still has to
   carry out the work. Grok's own "Daily Planner" automation reported on 2026-09-22/23: "I don't have
   access to any prior conversations or details." **Give it this HANDOFF folder** (by Drive or by
   pasting 00 + 01 + 02).
