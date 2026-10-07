# DRAFT - NOT SENT. Desktop install order for panel v5 (TRK-2026-9910-C)

**STATUS: DRAFT. Do not send to VTES-Inbox until Jorge says yes in his own words.** No Drive file exists for this. Nothing is installed. The Desktop is never touched.

Basis: CHECK-12 (eighth independent check) = PASS WITH DOCUMENTED LIMITS, 0 mislead, 0 damage, 0 leak, 23 edge, judged at commit 14dcb093502eeb11f43f039878e904ed85c1ab25 of claude/panel-v5-port.

## Body of the order (to be filed in VTES-Inbox as MSG-CLOUD-TO-CODE_INSTALL-PANEL-V5-NEW-FOLDER)

To: RAMBO (desktop executor). From: Cloud keeper. Class: GREEN apart from the new folder (only files that did not exist before).

1. Do the steps in panel-rebuild/v5/INSTALL-BY-HAND.md exactly as numbered, from commit 14dcb093502eeb11f43f039878e904ed85c1ab25 of claude/panel-v5-port. Use `git fetch origin claude/panel-v5-port` and `git show <ref>:<path>`. Never pull, merge, reset or switch the checkout.
2. Put every file into a NEW folder: G:\My Drive\MY-DESK\VTES-PANEL\v5-live . If it already exists, stop and report BLOCKED. Do not write over anything.
3. Do not touch the Desktop. Do not create any shortcut. Do not edit or move VTES-LLM-LAUNCHER_v3.html.
4. Run VERIFY-v5.ps1 (read-only). Paste its single OK line, or its PROBLEMS list, into your receipt.
5. Then run these PC checks and paste each answer (CHECK-12 Section H): (a) day-one VERIFY line in PowerShell 5.1; (b) `(Get-Item 'G:\My Drive').Attributes`; (c) press Copy packet for LOCAL, paste in Notepad, report whether the last line starts "RETURN PATH: write your answer in the local-only folder"; (d) paste 20,000 letters O in the note box, tick, press Just show the packet, report the seconds; (e) open the page at 200% zoom in Edge and say whether the blue RAMBO button shows without scrolling.
6. Receipt: EXECUTED_ with the VERIFY output, or BLOCKER_ with what you tried, why it failed, and the one small thing you need.
7. Do not send any outbound message and do not file any client document.

End: Did VERIFY print its OK line, yes or no?

## Known small items to clean AFTER install (builder round 11, optional; none can mislead)
CHECK-12 Section C edges 1-9 (two LOCAL step lines over 25 words; LOCAL return line names no real folder; item 55 self-contradiction; PORT-REPORT F1/F3 bookkeeping; missing FIX-ROUND-10.md list of changed older tests).
