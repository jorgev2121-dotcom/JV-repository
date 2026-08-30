# CREDENTIAL CONSOLIDATION — finish the 1Password migration (the stalled ~300)
**TRK-2026-9762 · 2026-08-30 · durable plan (Rule 4: recurring, no patch). Owner: Jorge.**

## The honest diagnosis
~300 credentials were migrated into 1Password to consolidate onto one manager. 3–4 weeks in, <10%
is "done" — because the migration only *moved* them; nothing *verified* them. 1Password stores; it
does not test/dedupe/repair logins. That labor (RAMBO on the desktop + Jorge's captcha clicks) was
never run as a tracked pipeline, and the one heuristic that ran mis-quarantined LIVE logins (RI-032).

## The approach — TRIAGE, not brute-force
Do NOT try to perfect all 300. Sort them, fix what matters, set the rest aside for deletion.

### Registry (one row per item — RAMBO fills from a 1Password export; NON-SECRET metadata only)
| # | item name | site/URL | username | last-used | Watchtower flags | STATUS | action |
|---|---|---|---|---|---|---|---|
STATUS ∈ { UNCHECKED, WORKING, DEAD, DUPLICATE, IN-USE-KEEP, ZZ-DELETE }
action ∈ { none, fix-password, re-register, quarantine-dupe, mark-delete }

### Steps (RAMBO on desktop; per DEDUP PROTOCOL + guardrails already in the rider)
1. **Export the inventory** — from 1Password, list every item's NAME, URL, USERNAME, LAST-USED, and
   Watchtower flags (weak / reused / breached / inactive). **NO passwords, NO secrets** — metadata
   only — to a file cloud can turn into the registry.
2. **Triage by last-used + Watchtower:** items used in the last year or flagged in-use → KEEP list;
   never-used / dead-domain → candidate DEAD; same-site repeats → DUPLICATE.
3. **KEEP list:** confirm one login works per site; if the password is weak/reused, set a 1Password
   strong password. Save clean (name, URL, username).
4. **DUPLICATES:** keep the working one, rename the rest `ZZ-DELETE-<site>-<date>` (never delete).
5. **DEAD:** rename `ZZ-DELETE-<site>-<date>`; if it's a site Jorge still needs, re-register it via the
   `portal-registration` skill (cloud watches Gmail for the approval/reset emails).
6. **Jorge deletes the ZZ-DELETE group** in one batch when he's ready. NEVER auto-delete.
7. **Track with a denominator** in this registry — "X of ~300 triaged, Y kept-clean, Z queued-to-delete"
   — written to TO-CLOUD.md each cycle. A silent run is a failed run (Night Protocol).

## Guardrails (unchanged)
Never touch personal/family accounts. Never auto-delete. Bank/routing stay in 1Password + portals.
GREEN/RED holds; RED clicks stay Jorge's.

#TRK-2026-9762 #1password #consolidation #credentials #triage
