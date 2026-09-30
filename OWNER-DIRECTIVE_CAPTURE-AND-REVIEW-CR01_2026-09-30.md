# OWNER DIRECTIVE OD-CR-01 — Capture the county page, then pop it up for my review

**Issued by:** Jorge Valdes (by voice, via the cloud window)
**Date:** 2026-09-30
**Status:** ACTIVE — standing, no expiry
**Applies to:** every Claude session and agent: Code desktop, Code cloud, Cowork, Chat, Grok Bots, Codex.
**TRK:** TRK-2026-9910-B · **Hashtags:** #OD-CR-01 #capture #county #review #outlook

## Section A — The directive, in plain words

1. **When a job needs proof of a county status** (a citation closed or open, a permit issued or finaled, a fee), an agent captures the county page **as a PDF**. A screenshot alone is not enough.
2. **The PDF is attached to a new Outlook email from Jorge@teamusasales.com.** The To line stays **blank** unless Jorge names a recipient. The subject and body carry the TRK and hashtags.
3. **That email pops up on Jorge's screen, on top of every other window, flashing.** It must never sit underneath another window. It stays until he answers.
4. **Jorge reviews it and he presses Send.** No agent ever sends, replies, forwards, or fills in the To line for him.
5. **This applies to all our work going forward**, not only the two first jobs (#20001 and #10980).

## Section B — What was built on 2026-09-30 (and what is unproven)

1. Skills: `.claude/skills/county-status-capture/`, `.claude/skills/owner-review-popup/`, `.claude/skills/permit-legalization-specialist/`.
2. Script: `tools/vtes-panel/VTES-CaptureReview.ps1` (modes: `-Pdf`, `-Watch`, `-Url`, `-SelfTest`). Self-test 10 of 10 on Linux, PowerShell 7. **Never run on Windows.** The flashing window and the Outlook draft are **unproven on the real PC**.
3. Pages: Capture Desk (`VTES-CAPTURE.html`) and Job Portal (`VTES-PORTAL.html`) in the control panel.
4. Red bell: a PDF waiting for review adds to the bell count and makes it flash (code in `vtes-common.js` and `VTES-RedBell.ps1`).

## Section C — Limits that cannot be removed from the cloud

1. **The cloud window cannot reach the county sites** (its network blocks miamidade.gov), and it **cannot touch Jorge's screen or Outlook**. So the capture runs on the PC (RAMBO) or in Cowork, and the pop-up runs on the PC.
2. A fresh capture must be read before it is sent. **If the county page says OPEN, it says OPEN.** Nobody writes "closed" on a page that says open.

## Section D — Proof that it works (not yet delivered)

A line in `capture-review.log` with the time and file name, plus a screenshot showing the window on top of another window. Until then the state is **IN PROGRESS**.

Question: has the review window ever popped up on top for you on the PC yet?

TRK-2026-9910-B · v1 · 2026-09-30 · CURRENT · #OD-CR-01 #capture #review #outlook
