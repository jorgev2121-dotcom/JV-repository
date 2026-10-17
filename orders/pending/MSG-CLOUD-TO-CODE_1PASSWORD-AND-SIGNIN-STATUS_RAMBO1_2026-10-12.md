# MSG-CLOUD-TO-CODE — 1PASSWORD SSOT-02: PHASES 0–2 NOW, PHASE 3 IN BATCHES (Rambo 1, Claude lane only, interactive preferred)
From: ☁️ CODE · CLOUD / WEB EXECUTOR · 2026-10-12
Lane: CLAUDE ONLY. Codex: never (credentials). Queue position 9.
Read first: OWNER-DIRECTIVE_1PASSWORD-SSOT-02_2026-10-12.md in the repo, and OWNER-DIRECTIVE_1PASSWORD-SINGLE-SOURCE-01 on the Continuity Board.
Owner directive, Jorge 2026-10-12: 1Password is the one source of truth. Suggested passwords only, so nobody sees them. Remove the personal/work forks. Only 1Password autofills. Quarantine everything else.

## Never
- Reveal, print, log or type a password.
- Delete anything.
- Touch money, government, Microsoft 365, Google, Apple or 1Password-account passwords without Jorge present.

## Phase 0 — gate (read-only)
1. Is 1Password unlocked? Is the CLI integration ON? Does `op whoami` work (account and email only)?
2. If the integration is OFF, stop phases 1–3. Write the single owner click with a screenshot of exactly where it is (Settings → Developer → "Integrate with 1Password CLI").

## Phase 1 — inventory (counts only)
Logins in each source:
- 1Password vaults
- Edge, Chrome and Google Password Manager
- Windows Credential Manager and Microsoft
- Import or export files in OneDrive
Then: duplicates per site, the personal/work account pairs, and the Watchtower counts (weak / reused / compromised).

## Phase 2 — consolidate and remove the forks
1. Pick one canonical item per site and purpose. Quarantine the rest in the QUARANTINE vault, which is excluded from autofill.
2. Repair imported web addresses.
3. Move any plaintext export files to quarantine and flag them for Jorge.
4. Switch OFF autofill and "offer to save" in the other managers (P3). Log each switch and how to undo it.
5. Set one default vault, so there's no picker (P4).
6. The duplicate Microsoft account picker seen 10-12 (Jorge@TEAMUSASALES.COM vs jorge@teamusasales.com): identify the stale cached entry and report it. Do not remove it.

## Phase 3 — rotate, only in an interactive window (Code tab with computer use, or Cowork)
Batches of 10, starting with Watchtower's lowest-risk sites. Use the 1Password extension's suggested password and its save prompt. One line per site: changed / skipped (why). High-stakes accounts are listed for a session with Jorge.

## Phase 4 — auto-heal
Weekly scheduled task. Report the task name and its next run.

## Proof
EXECUTED_RAMBO1_1PASSWORD-SSOT-02_2026-10-12.md, counts only, in this form: scanned N / canonical N / quarantined N / autofills switched off N / rotated N of M / exceptions N.

Is the 1Password CLI integration ON?
