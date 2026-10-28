# OWNER-DIRECTIVE: 1PASSWORD-SSOT-02 — 1Password is the ONE place for every login. Standing protocol.
Date: 2026-10-12 · Issued by: Jorge Valdes (owner), Cloud window · Extends (does not replace): OWNER-DIRECTIVE_1PASSWORD-SINGLE-SOURCE-01 (2026-10-10)
TRK-2026-9960 family · #1Password #SSOT #RAMBO

## The directive, in the cloud's words
1. 1Password becomes the single source of truth for every login: those already in it, those imported from other password savers, and those still sitting in browser favourites or other stores.
2. RAMBO, the desktop executor, works through them systematically, using a hybrid: a scheduled bot does the counting, checking and re-quarantining, and RAMBO does the hands-on steps.
3. Every new or changed password is the one **1Password suggests** and saves through its own prompt. **No person and no agent ever sees it.**
4. All "forks in the road" are removed: no personal-vs-work picker, no second autofill offer. Only 1Password autofills. Every other inherited option is quarantined, never deleted.

## Protocol (applies to every window, every session)
- **P1 — Never reveal.** No agent runs `op item get --reveal`, prints or reads a password field, or types one. Passwords are created only by 1Password's generator, in its own save prompt.
- **P2 — Quarantine, never delete.** Duplicates and old copies go to the QUARANTINE vault, excluded from autofill. Deleting anything needs Jorge's yes for each batch.
- **P3 — One autofill.** Autofill and "offer to save passwords" are switched OFF in Edge, Chrome, Google Password Manager, Windows/Microsoft and any other manager once 1Password holds a verified copy. Each switch-off is logged with how to undo it.
- **P4 — No forks.** One 1Password account and one default vault for autofill. Where Jorge has both a personal and a work account for the same site, keep one item per account with a plain label ("Work — Jorge@TEAMUSASALES.COM"), mark one canonical per purpose, and quarantine the rest.
- **P5 — Rotation order, lowest risk first.** Batches of 10:
  - Watchtower "reused/weak/compromised" items on low-stakes sites go first.
  - **Money, government, Microsoft 365, Google, Apple and 1Password itself go last, and only with Jorge present for the 2-step codes.** RI-046: the M365 password was reset 9 times since August; a lockout costs more than a weak password.
- **P6 — Proof without secrets.** Reports carry counts and item names only, never passwords: scanned / canonical / quarantined / rotated / exceptions.
- **P7 — Auto-heal.** A weekly task re-runs the checks and re-quarantines new duplicates (SSOT-01 Rule 6).

## Strongest objection (Rule 3), so it is on record
Rotating every password to a new generated one is the risky part. Each change happens on the website's own page, many ask for a 2-step code, and a half-finished change can lock Jorge out.
- **Recommendation:** phases 1–2 below (consolidate and remove the forks) are safe and fast, and they remove most of the daily friction.
- Rotation (phase 3) only goes in small batches, and the high-stakes accounts wait for Jorge to be present.

## Phases
- **Phase 0 — Gate (read-only).** Is 1Password unlocked, is the CLI integration ON, and does `op whoami` work? On 09-21 the switch Settings → Developer → "Integrate with 1Password CLI" was OFF. **That switch blocks everything else.** If it's still OFF, it's the one owner click, shown with a screenshot.
- **Phase 1 — Inventory (counts only).** Logins in each source (1Password vaults, Edge, Chrome, Google, Windows Credential Manager, Microsoft, the import files in OneDrive), and duplicates per site.
- **Phase 2 — Consolidate + remove forks.** Pick a canonical item per site and purpose, quarantine the rest, repair imported web addresses, and switch off the other autofills (P3), with a default vault and no picker (P4).
- **Phase 3 — Rotate (P5 order).** Done through the browser with the 1Password extension's suggested password, so it needs an interactive window: RAMBO in the desktop Code tab with computer use, or Cowork. Headless can't do it.
- **Phase 4 — Auto-heal task** plus a weekly one-line report.

SSOT-01 was run twice on 10-10/10-11 and ended FAILED-VERIFICATION, with no result either time. This is the third request on the same topic, so it's logged in RECURRING-ISSUES.
