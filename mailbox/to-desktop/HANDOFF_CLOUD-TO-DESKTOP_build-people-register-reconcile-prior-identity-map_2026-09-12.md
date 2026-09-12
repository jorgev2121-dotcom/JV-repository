# HANDOFF — ☁️ CLOUD → 🖥️ RAMBO: build PEOPLE-REGISTER — but RECONCILE the prior Identity Map first, don't start from scratch
**2026-09-12 · TRK-2026-9780 (admin band) · owner approved "yes, have Rambo build the PEOPLE-REGISTER.csv."**

**WHY THIS ISN'T A CLEAN BUILD — read before you touch anything:** Cloud searched Google Drive and
found the owner's memory was correct: a fuller version of this exact protocol was already written and
filed on **2026-08-19**, tracked as **TRK-2026-1582 / DIR-0047**. Proof in Drive:
`MSG-CODE-TO-CODE_PROTOCOL-IDENTITY-DISCRETION_TRK-2026-1582_2026-08-19.md` (file id
`1H71pb32bw6eDWR3Ne7YXXw1fYY3FCdtm`). It names two library files that Cloud **cannot reach** (they're
on OneDrive / local, Windows-path, and SharePoint search returns them to Cloud as empty):

- `PERM-APP-PORTAL\_LIBRARY-Forms\_PROTOCOL_Identity-Hashtags-and-Discretion-Redaction_2026-08-19.md`
- `PERM-APP-PORTAL\_LIBRARY-Forms\_IDENTITY-MAP_People-Addresses-Circles_2026-08-19.md`

**That second file IS the people register, already started.** Building a fresh CSV on top of it would be
a third parallel copy — the exact drift the charter warns about. So the first action is retrieval, not
creation.

**EXACT NEXT ACTIONS (GREEN — reading + creating a new file; no client file is moved/renamed/deleted):**

1. **Locate + open both 2026-08-19 library files** on the desktop (OneDrive `PERM-APP-PORTAL\_LIBRARY-Forms\`).
   Copy their full text into `mailbox/to-cloud/` so Cloud can finally see the fuller protocol. Confirm
   whether the **misspelling / typo (fuzzy) factor** the owner remembers is written in there — that's the
   piece he says is "almost impossible to find." If it is, quote it verbatim.
2. **Seed `PEOPLE-REGISTER.csv` FROM the existing Identity Map**, not blank. Columns (superset of both specs):
   `person_id · display_name · aliases · emails · phones · firms · addresses · TRKs · first_seen · last_seen · confidence · merged_by(owner/auto) · fuzzy_flag · source`.
   Carry the `#p-<name>` / `#c-<company>` / `#j-<jurisdiction>` tag convention from the 2026-08-19 protocol
   — do not invent a new tag namespace.
3. **Stamp a TRK on the cross-reference output itself** (owner asked for this explicitly). The register and
   any report generated from it carry `TRK-2026-9780` in the body/footer + `#people-register #cross-reference`.
   Individual people still resolve to the *job* TRKs they appear in — that's the `TRKs` column.
4. **Entity resolution rule — exact = auto, fuzzy = FLAG ONLY, never silent merge:**
   - Auto-link rows that share an **exact identifier** (same email or same phone).
   - The **Javi Vasquez** case (two firms, two emails, two addresses, switched firms mid-deal on Garden
     Walk West) is resolved by **following the chat/email history for consistency** — same person on both
     sides of the firm switch — then proposing the merge with `fuzzy_flag=Y`, `merged_by=PENDING-OWNER`.
   - The owner confirms merges with one batched click. Never file/merge on a fuzzy match (charter §9).
5. **Fuzzy/misspelling factor (the thing he can't find):** add a `fuzzy_flag` column + a similarity pass
   (name Levenshtein/token match, phone last-7, address normalization) that **surfaces likely-same rows for
   owner review** — it never merges them. This is the "filter them out manually if needed" he asked for.
6. **Write per-item as you go** (charter Rule 5 / Rule 11): the CSV grows row-by-row from filed jobs +
   `.TAGS.txt` sidecars + email headers; don't hold it all in memory. Report a denominator: "N people across
   M jobs; K merge candidates flagged for owner."

**RED vs GREEN:** reading the library files, building the new CSV, and flagging merge candidates = GREEN.
**Committing a proposed merge, or writing anything back into a client capsule, is RED** (owner's one batched click).

**CLOSING QUESTION:** Does the 2026-08-19 `_PROTOCOL_Identity-Hashtags-and-Discretion` file contain the
misspelling/typo factor the owner remembers — yes or no — and can you paste it to `mailbox/to-cloud/` so
we reconcile onto it instead of rebuilding?

#people-register #cross-reference #entity-resolution #TRK-2026-9780 #reconcile-prior-art #TRK-2026-1582 #DIR-0047 #cloud-to-desktop
