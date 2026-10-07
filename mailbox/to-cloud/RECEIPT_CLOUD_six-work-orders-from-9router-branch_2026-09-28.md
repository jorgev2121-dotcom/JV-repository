# RECEIPT — Cloud read its mailbox · 2026-09-28

**FROM:** ☁️ Code · Cloud / Web Executor (session_01Vrs2ytMJQFG6P1q4i8NYar)
**TO:** Jorge, Desktop, Cowork
**STATUS:** BLOCKED on renumbering; nothing built yet

---

## Section A — What was in the mailbox

1. **The main branch's `mailbox/to-cloud/` was empty.** It held only its README.
2. **Six Cloud work orders were sitting on a side branch that was never merged.**
   The branch is `claude/9router-codex-blockers-ewm293`, dated 2026-09-26. They were
   never delivered to main, so no Cloud session saw them until today.
   - TRK-2026-9410: session-end compliance hook ("deploy first")
   - TRK-2026-9411: daily worker system
   - TRK-2026-9412: token/LLM cost monitoring agent
   - TRK-2026-9414: email forensic rebuild, Phase 1+
   - TRK-2026-9415: continuous night-protocol activation
   - TRK-2026-9416: cost optimization system
3. That same branch also added **Rule 9** to `CLAUDE.md` ("nothing lives in conversation
   only"). **Rule 9 is not on main either.**

## Section B — Why none of them can start as written

1. **All six TRK numbers were already issued in August for other work.** That breaks
   the charter rule "never reuse a number":
   - 9410 = Adobe Acrobat pop-up item
   - 9411 = OWNER-QUEUE.md build
   - 9412 = SPINE-9412 invoices
   - 9414 and 9415 = the inflated-money-count finding
   - 9416 = the 1,894-PDF issuer sweep
   A search for any of these numbers now returns two unrelated jobs.
2. **The 9xxx admin band is full.** It is used up through 9999. The next free number
   has to come from the Tracking Registry on the PC, and Cloud cannot read that file.
3. **Three orders duplicate work that already exists:**
   - 9412 and 9416 repeat the Token Monitor / FOREMAN (TRK-2026-9949, 9952, 9952d).
   - 9411 and 9415 repeat each other and `NIGHT-PROTOCOL.md`.
4. **Two orders need the PC, not Cloud.** The 22,875-PDF OCR and email Phase 1 read
   files that live on the PC. Cloud containers cannot reach them. Phase 1 also waits
   on Phase 0 (TRK-2026-9404, Desktop), which has not finished.
5. **The 9410 hook is specified with a trigger that does not exist**
   (`session.post_end`). Also, a session-end hook cannot stop a session from closing.
   Cloud built a working version as a Stop hook. The auto-mode safety check then
   **refused to let a session install a hook on its own settings**, so it was removed.
   It was not committed. Installing any hook needs Jorge's approval on his side.

## Section C — What Cloud recommends

1. **Merge all six into three:** night runner (9411 + 9415), cost monitor
   (9412 + 9416, folded into the existing Token Monitor), and the save-your-work hook
   (9410). Email Phase 1 (9414) stays parked behind Phase 0.
2. **Desktop issues three fresh numbers from the registry**, one per merged item.
3. **Jorge approves installing the hook** once. After that, Cloud installs it.

*#TRK-collision #mailbox-receipt #RULE-9*
