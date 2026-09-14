# HANDOFF — ☁️ CLOUD → 🖥️ RAMBO: 1Password single-source migration = BULK IMPORT (~280 logins), attended
**2026-09-14 · owner: ~280 logins to consolidate. SUPERSEDES the per-site loop — 280 one-at-a-time is not viable. Attended, owner present, 1Password unlocked.**

**⛔ SECURITY (hard — charter Art.5 / Rule-10):** the browser export is a **plaintext file of all ~280 passwords.**
It stays **LOCAL only**, is imported, then **securely deleted** (not recycle bin — overwrite/shred). It NEVER goes
to the repo, Drive, OneDrive, a mailbox, chat, or any sync folder. No credential value is ever logged. Do the
whole thing in ONE attended sitting so the export never lingers.

**METHOD (attended; ~30–60 min, mostly waiting on import):**
1. **Owner unlocks 1Password** (master pw / biometric — his gate; app must be running + unlocked, per 09-13 infra finding).
2. **Export saved logins per browser** (Chrome → Password Manager → export; Edge likewise) to a temp CSV in a local scratch dir.
3. **Import into 1Password** via its built-in importer (Chrome/Edge CSV formats are supported).
4. **Verify + dedup:** confirm the count in 1Password (~280), merge duplicates across browsers, flag any that failed to import.
5. **Make 1Password the single source:** turn OFF browser password saving/autofill, then clear the browser password stores.
6. **Securely delete the temp CSV.** Confirm it's gone.
7. **Registry:** write `1PW-MIGRATION-REGISTRY.md` (LOCAL, no secrets) — counts only: exported X / imported Y /
   dedup Z / hand-entry-needed N / browser-cleared done. That's the proof, with numbers, no passwords.

**Hand-entry subset (small):** logins saved in NO browser (in Jorge's head, sticky notes, or sites that block
export) get typed in attended — a handful, not 280.

**NOT covered by import — flag separately:** sites where 1Password won't autofill (e.g. the T&G/HOA portal, RI
recurring) — that's a per-site URL-match fix, not an import problem. List them for a follow-up.

**RED or GREEN:** the whole thing is **owner-attended (credentials = RED)** — never headless, never background,
never a skip-all-permissions mode. Report counts only.

**CLOSING QUESTION:** After the import, how many of the ~280 landed in 1Password (X of 280), how many need hand-entry, and which sites still won't autofill?

#1password #bulk-import #280-logins #attended #credentials-RED #secure-delete #single-source #cloud-to-desktop
