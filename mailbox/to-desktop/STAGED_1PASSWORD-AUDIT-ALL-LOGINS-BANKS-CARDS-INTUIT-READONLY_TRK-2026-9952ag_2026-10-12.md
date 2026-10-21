# STAGED (not yet in VTES-Inbox) — 1Password audit: Intuit/QuickBooks, banks, credit cards, duplicates. READ-ONLY.
TRK-2026-9952ag · from ☁️ CLOUD · 2026-10-12 · Jorge: "Rambo to jump in and fix," and "fix the other access information for banks and credit cards… using one password protocol and Rambo." Supersedes 9952af (the Codex lane refused it on the word "password" and Codex has no Drive or repo access).
**Send to VTES-Inbox only when the Claude desktop lane is answering** (a non-CODEX EXECUTED or BLOCKER file in VTES-Outbox newer than 2026-10-11 20:16 ET). Otherwise the Codex failover consumes it and writes a useless BLOCKER.
Protocol: ONE-PASSWORD-TAKEOVER_TRK-2026-9346. RI-046 (3rd sighting). Rule 4: Tier 2 first.

## HARD LIMITS
- Never read, print, type, copy, store or transmit any password, one-time code, passkey, secret key, security answer, PIN, CVV, full card number, full account number or routing number. Never write one to any file.
- **Cards: nickname and last-4 only (Charter Article 5).** Do not read the card-number field, even to compute last-4. Report the item TITLE as saved; flag any title that does not already show a last-4 so Jorge can rename it.
- Banks: report institution name, item ID, vault, URL host, tags, dates. No usernames for banks.
- Do not sign in anywhere. Do not click Update, Save, Archive or Delete in 1Password. No changes in this job.
- 1Password must be unlocked by Jorge with Windows Hello. If locked: BLOCKER "1Password locked; Jorge unlocks, then says continue."
- Timeout on every step. Headless.

## Phase 1 — read-only audit
1. `op whoami` (proof).
2. Count items per vault per category (counts only): Login, Credit Card, Bank Account, Secure Note, Password, Identity.
3. For every Login item whose URL host or title matches a bank or card issuer (Chase, Bank of America, Wells Fargo, Citi, Capital One, American Express, Discover, Synchrony, US Bank, TD, PNC, Truist, Regions, SBA, Stripe, PayPal, Intuit, QuickBooks, Mint) report: item ID, title, vault, URL host, tags, created, updated. Mark duplicates (same host, more than one item).
4. For the Intuit/QuickBooks set only, also report usernames (Jorge's screenshot already shows them): 5 items seen, 1 Mint plus 4 "QuickBooks Online - Team USA books".
5. List every Credit Card item by TITLE only, and flag titles lacking a last-4.
6. Read-only: Chrome and Edge built-in password managers ON or OFF (`credentials_enable_service`, `profile.password_manager_enabled`); the 1Password extension "default password manager" setting if readable. Change nothing.
7. Top 15 hosts by duplicate count across all Login items (counts and titles only).
8. Write a PROPOSED plan, not executed: per host, which single item to KEEP (most recently updated), which to ARCHIVE (1Password archive is recoverable for 30 days), the URL to set, and a column "needs password reset by Jorge via the site's own forgot-password link" for sites Jorge reports failing. Jorge's standing pre-approval (2026-08-18): always accept 1Password's suggested password; sign-ins and the decision to register remain his.

## Phase 2 — ONLY after Jorge answers yes to the plan in his own words
Archive (never delete) the duplicates he approves; correct URLs; write `Reports\1Password-Duplicate-Audit_BEFORE.csv` and `_AFTER.csv` (counts, titles, IDs, no secrets); build a weekly read-only Tier 3 check (via Run-Hidden.vbs) that reports any host with more than one Login item to the daily digest. Rollback: unarchive from the 1Password Archive.

## Exit
`EXECUTED_...` with the Phase 1 outputs (no secrets) and the proposed plan, or `BLOCKER_...` with what you tried, why it failed, and the one small thing you need.

Is the QuickBooks item list in the report?
#1Password #RI-046 #TRK-2026-9952ag
