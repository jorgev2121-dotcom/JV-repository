# PRE-MORTEM 2026-10-28 (written 4:4x AM ET by EXEC-01 cloud)

Question: what is most likely to go wrong in the next 24 hours, and what are we doing about it?

1. Jorge's open questions stay unanswered. Open: Capital One new card (shipped, and "activate your card" notice), TransUnion x2 and Azure me-or-not-me, Tyler password reset, Codex failover yes/no, tool-names-in-prompts yes/no, Burn Rate 7 AM yes/no, 1Password call, ES Windows bounce. Mitigation: one morning digest at 7:16 AM ET, one closing question, nothing treated as approved.
2. Two other-session scheduled tasks still fail with ACCESS_DENIED. Alerted once. Not fixable here.
3. Codex lane keeps failing (timeout, earlier PII refusals). Watch for non-CODEX EXECUTED receipts.
4. Gmail quota ran out about 00Z to 05Z. Outlook covers the same mail. If it repeats, log it in RECURRING-ISSUES.md.
5. Another nonexistent-tool-name slip (13 so far). Durable fix needs Jorge's yes.
6. Session context about 780k of 1,000k, autocompact at 784k. Resume from repo files: this file, HEARTBEAT.md, SELFTEST-LOG.md, alerts-relayed.txt.
7. Tomas (TUS-26-1018, city deadline Nov 16), Frank/Santiago, Medley records and PLF (TRK-2026-1310) still need watching hourly.
8. Self-test pass 52 is due at 12Z. Plant selftest-probe-2026102812.
