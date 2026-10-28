# ONE COCKPIT PLAN — 2026-10-12
☁️ Cloud Executor · owner question answered: "Is the VTES panel the revised v5? Did I achieve one place to do everything?"

## Facts (verified 2026-10-12 21:25Z)
- Three panels exist: (1) claude.ai artifact 321Zo6 "VTES Control Panel" (now v15, cloud page, 25 tabs); (2) local v5 at G:\My Drive\MY-DESK\VTES-PANEL\v5-live (installed 10-10, never fed); (3) Copilot's revised design (requirements recovered in COPILOT-DESIGN-RECOVERY_2026-10-12.md; the design file itself never found).
- 321Zo6 is NOT v5 and NOT Copilot's design.
- The green RAMBO light Jorge saw was a stored record from 2026-10-10 ("LIVE (last check)"), not live. Record corrected to amber; page now turns any green record older than 24 h amber ("OLD RECORD").
- Drive live feed: published, but NOT yet confirmed working in Jorge's view (page fell back to the stored record). Unverified.
- A claude.ai page cannot click anything on the PC. Only an agent running on the PC (Claude Desktop / Code Desktop with computer use, or `claude remote-control`) can.

## Recurrence (RI multi-panel drift, 2+ times) — patch forbidden, three options
1. Tier 2 REMOVAL (recommended): one panel only (321Zo6). Retire v5 and duplicates (quarantine, not delete). Cut 25 tabs to 5 big picture-tiles: DO NOW (owner clicks) · WHO'S WORKING · FIND (hashtag search) · JOBS · WINDOWS (picture picker). Failure mode: old links still open retired panels. Lifespan: permanent if retired panels show a "moved" banner.
2. Tier 3 ENFORCEMENT: keep all panels, nightly checker flags stale records and mismatches. Failure mode: checker dies silently (RI-002 pattern). Lifespan: as long as the checker lives.
3. REPLACE: make the Claude Desktop app the cockpit; the panel becomes read-only. Agent with computer use performs the clicks. Failure mode: OAuth/UAC still need Jorge. Lifespan: permanent; depends on desktop app staying signed in.
Recommended: 1 now, then 3 as "the hands".

## Hashtag single-source-of-truth
- Each document gets a sidecar `.TAGS.txt` (new file = GREEN at night) with TRK + 5+ hashtags.
- One index file in Drive (`_TAG-INDEX.json`) lists file → tags → TRK. The panel FIND tile searches it and opens the Drive file.
- Filing/moving stays RED (morning, owner yes).

## Steps
1. [cloud, now] Panel: 5 tiles + picture window picker + FIND reading _TAG-INDEX.json. Same URL.
2. [desktop] Tagger writes .TAGS.txt sidecars + _TAG-INDEX.json for 01-JOBS (Queue A first). Needs a working desktop executor.
3. [owner, once] Open Claude Desktop on the PC and leave it signed in, so a PC-side agent can do the clicks.
