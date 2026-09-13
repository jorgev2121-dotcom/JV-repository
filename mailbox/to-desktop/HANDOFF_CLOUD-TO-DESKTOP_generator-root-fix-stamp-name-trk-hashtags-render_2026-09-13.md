# HANDOFF — ☁️ CLOUD → 🖥️ RAMBO: ROOT-FIX the file generator (stamp name+TRK+hashtags+render on EVERY output)
**2026-09-13 · owner APPROVED the root fix. Recurring defect: Alec portal blank header (09-12) + Plaza letter no-name/no-hashtags/raw-HTML (09-13) = same cause, twice.**

**RULE 4 — this is a logged recurrence, so NO band-aid.** Two files in two days came out unnamed / untagged /
un-rendered. That's not two accidents; it's the generator (`Build-Job-Portal.ps1` and whatever renders
letters/reports) not stamping identity. **Fix the source, not each file.** Prefer Tier-2 (fix the generator
so it can't emit an unstamped file) over Tier-1 (patch files by hand).

**EXACT NEXT ACTION (GREEN — code fix, no client file moved):**
1. **Every generated file gets, at creation:** (a) a real title/name in the header, (b) its **TRK stamped in
   the body** + footer (`TRK · v · pNNN · date · CURRENT`, charter §9), (c) **hashtags in the body/metadata**
   (`#job` `#c-` `#p-` `#j-` as applicable), (d) if it's an outbound document, a **rendered** form (PDF/text+images),
   with raw HTML kept only as source.
2. **Fail-closed:** the generator REFUSES to output (or flags LOUD) a file with a blank name, missing TRK,
   or no hashtags — so an unstamped file can't silently ship again. Log the refusal.
3. **Backfill:** run the fixed generator over the recent unstamped outputs (Alec portal, Plaza letter) so they
   inherit the stamp — don't leave the two known-bad ones behind.
4. Add the fix to **AI-BUILD-LIBRARY.md** and log the recurrence in **RECURRING-ISSUES.md** with today's date.

**RED or GREEN:** editing the generator + re-emitting files = GREEN. No client-file move/rename = RED (owner click).

**CLOSING QUESTION:** Does the generator now refuse to emit a file with no name/TRK/hashtags, and did the Alec portal + Plaza letter re-render stamped?

#generator-root-fix #rule-4-no-bandaid #stamp-name-trk-hashtags #fail-closed #RECURRING-ISSUES #cloud-to-desktop
