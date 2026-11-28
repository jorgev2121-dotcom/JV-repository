# BLOCKER_CLOUD — DECISION 15 of 40 · JOB-0110 · TRK-2026-1265
#owner-decision #APPROVE #JorgeValdes #JOB-0110 #TRK-2026-1265 #AP-0059 #Sunbiz #BalHarbour #Plaza

**Written by:** Claude Code, CLOUD lane (☁️), 2026-10-13 15:10 UTC
**Decision file:** DECISION_15_JOB-0110_APPROVE-1.md (Drive 1EkyIUSN-IlYVadOVdYambfhE9qWpVnIa)
**Close-out state: BLOCKED for the official Sunbiz read. EXECUTED-WITH-PROOF only for the parts listed in Section C.**

---

## Section A — The answer first

1. **The official Sunbiz lookup could not be run from the cloud.** Every route to search.sunbiz.org is blocked from this machine (proof in Section D). So nothing below is a fresh read of the state register.
2. **The best names on file already exist, from two desktop mirror reads on 2026-09-03 and 2026-09-04.** They are:
   - **Unit 714 — 714 PLAZA HOLDING LLC**, document **L23000195730**, filed 2023-04-19. Managers: **DAVID FEINGOLD** and **ELI NESS**. Either one is the likely signer.
   - **Unit 914 — 914 PLAZA HOLDINGS LLC**, document **L23000327240**, filed 2023-07-07. Only member on record is **DEG INVESTMENTS LLC** — a company, not a person. Registered agent per one mirror: **ELIYAHU NESS** (very likely the same Eli Ness). **No natural person is confirmed as signer for 914.**
   - **Unit 321 — ADENAT CORPORATION** (Brampton, Ontario address on the county roll). **No Florida Sunbiz record was found by web search.** The closest public record is **ADENAT INC.**, an Ontario business corporation, with a lapsed LEI (last updated January 2024). It is not confirmed to be the same company.
3. **The two mirrors disagree on whether 714 and 914 are active.** One says INACTIVE (no filings after 2023-11-03). The other says ACTIVE with 2024 and 2025 annual reports. The ACTIVE reading looks more current, but it is not proven.
4. **New risk since September:** Florida annual reports were due 2026-05-01, and administrative dissolution of non-filers happens in late September. **If either LLC missed its 2026 report, it may now be dissolved.** Only the live register can say.

**The one thing still needed: a 1-minute read of Sunbiz in a real browser** (Section E).

---

## Section B — The eight units and who is an entity

From the 2026-09-03 owners-of-record report (Drive 1cSJL5SF7kfvTHAU170u1bAHCZ3uRvzP4):

1. 922 — Daniel Raboh (person). No Sunbiz lookup needed.
2. 423 — Sylvia Azoulay (person). Not needed.
3. **714 — 714 Plaza Holding LLC (entity). Lookup needed.**
4. **914 — 914 Plaza Holdings LLC (entity). Lookup needed.**
5. **321 — Adenat Corporation (entity, Canadian address). Lookup needed (foreign-entity check).**
6. 220 — Doron Barnes and Sandra Metta (people). Not needed.
7. 721 — Fyon Florida Living Trust, trustees Alexandre Fyon and Natalie Oiknine. Trusts are not on Sunbiz. Not needed.
8. PH11 — Orfanopoulos trust, trustee Michael Orfanopoulos. Not on Sunbiz. Not needed.

**So three Sunbiz lookups are owed: 714, 914 and Adenat.** The 09-03 report named only the two LLCs; Adenat is added here because it is also an entity with no named human on the county roll.

---

## Section C — What was done this cycle

1. Read DECISION 15, the 09-03 owners report, the 09-03 Sunbiz BLOCKED reply (17tXE5y0pbkOPxs6lO4An5zHsTKggqC5W), the 09-03 AP-0059 mirror reply (1DyfROUT0zohQLLV9givzBkaATziLkTpT), and the 09-04 second-mirror finding (1wEvMOgrt3_dl5owJKg91EoE-gBw3QK8k). Names and document numbers in Section A come from those two mirror files.
2. Tried the official register and four mirrors from this cloud machine. All blocked (Section D).
3. Ran web searches for each entity name, each document number, "DEG INVESTMENTS LLC" Miramar, and "ADENAT CORPORATION". Results:
   - "714 PLAZA HOLDING LLC" — no indexed record. Search did show sibling entities at the same Miramar office park on Sunbiz (1118 PLAZA HOLDING LLC and 818 PLAZA HOLDING LLC, both at 2201 SW 145th Ave Suite 201, Miramar; 818's manager listed as CHANA CHRIQUI). **This suggests the "NNN Plaza Holding" LLCs are a family of unit-holding companies run from that Miramar address. Inference only.**
   - "914 PLAZA HOLDINGS LLC" — no indexed record.
   - L23000195730 and L23000327240 — not indexed by the search engine.
   - "DEG INVESTMENTS LLC" Miramar — no match. Still unresolved which DEG Investments is the member of 914.
   - "ADENAT CORPORATION" — no Florida record. Found ADENAT INC., Ontario, LEI 549300NG1UGS86581N21, status lapsed.

---

## Section D — Proof of the block (why this is BLOCKED, not PARTIAL)

Run 2026-10-13 15:04 UTC from the cloud container:

1. curl https://search.sunbiz.org/Inquiry/CorporationSearch/SearchResults?... → `CONNECT tunnel failed, response 403`. Proxy log: `connect_rejected ... host search.sunbiz.org:443`, 15:04:17Z and 15:04:18Z.
2. curl https://search.sunbiz.org/ (homepage control) → same 403.
3. WebFetch on the Sunbiz document-number URL for L23000195730 → `getaddrinfo ENOTFOUND search.sunbiz.org`.
4. WebFetch opengovus.com (the 09-03 mirror) → `ENOTFOUND`.
5. curl opengovus.com, bisprofiles.com (the 09-04 mirror), opencorporates.com, dos.fl.gov, lei.bloomberg.com, api.gleif.org → all `CONNECT tunnel failed, response 403`.
6. Control: curl balharbourfl.gov and floridabuilding.org → also 403. **The cloud sandbox blocks all outbound web except the search engine.** It is not a Sunbiz-specific problem, and it cannot be worked around from here.
7. The desktop lane already proved Sunbiz blocks scripts there too (403 with full browser headers, cookies and referer; 09-04 file). **A human browser is the only route.**

Captcha was not attempted. Nothing was emailed, filed, moved, renamed or deleted.

---

## Section E — The smallest owner action (WORKAROUND-CERT)

**Alternatives tried:** Sunbiz direct (blocked), WebFetch (blocked), four mirrors (blocked), GLEIF API (blocked), web search (works, but has no index of these records), Drive (holds only the September mirror reads).

**The one action, about one minute, no spend, no login:**

1. Open **search.sunbiz.org** → Search Records → **Document Number**.
2. Type **L23000195730**. Read back: Status, the latest Annual Report year, and the names under "Authorized Person(s)".
3. Do the same for **L23000327240**.
4. Then search by **Entity Name**: **ADENAT**. Say "none" if nothing comes up.

**Or, even simpler:** say "do it on desktop" and the desktop lane can try it through Claude in Chrome in your own browser, which Sunbiz does answer.

---

## Section F — Not claimed

1. That the managers named are still current. The mirrors are from 2024–2025 snapshots.
2. That a manager's signature satisfies the Village's owner notary block, or what proof of authority Bal Harbour wants for an LLC.
3. That ADENAT INC. (Ontario) is the same company as Adenat Corporation on the roll.
4. Who stands behind DEG INVESTMENTS LLC.

---

## Proof lines

- PROOF: Drive 1cSJL5SF7kfvTHAU170u1bAHCZ3uRvzP4 (09-03 owners-of-record report) read 2026-10-13; its gap line reads: "714 Plaza Holding LLC and 914 Plaza Holdings LLC need a Sunbiz officer lookup to name a person entitled to sign."
- PROOF: Drive 1DyfROUT0zohQLLV9givzBkaATziLkTpT and 1wEvMOgrt3_dl5owJKg91EoE-gBw3QK8k read 2026-10-13; source of document numbers and officer names.
- PROOF: proxy status log, recentRelayFailures, host search.sunbiz.org:443, 2026-10-13T15:04:17.715Z and 15:04:18.044Z.
- PROOF: WebFetch error `getaddrinfo ENOTFOUND search.sunbiz.org`, 2026-10-13.
- PROOF: copy saved at /home/user/JV-repository/runner-results/DECISION_15.md.

EXECUTED-WITH-PROOF: **NO** — the official lookup is BLOCKED. The compilation, the block proof and the owner action above are done and verifiable.

TRK-2026-1265 · DECISION-15 · 2026-10-13 · BLOCKED

**Can you spend one minute on Sunbiz, or shall the desktop lane try it in your browser?**
