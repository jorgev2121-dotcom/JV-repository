# BLOCKED-WORKAROUNDS · 2026-10-14
Window: CLOUD runner. Research only. Nothing was sent, changed or bought.
Evidence level: web search summaries (not full page reads). Where a fact is not confirmed, it says UNVERIFIED.
Rules applied: money = RED (needs cost estimate). Credentials = RED (Jorge clicks, agents never type passwords).

## Section A. Answer first (best workaround per item)
1. Texting: use the Zapier "SMS by Zapier" action for texts to Jorge's own verified number, and wa.me links for contacts. Free. Cloud executes.
2. Outlook send: create Outlook drafts with the connector today (works now), and try Entra admin consent as the permanent fix.
3. Headless cap: cloud checks VTES-Outbox for the proof file and the 7th-job test.
4. OneDrive 200 cap: have the PC list the folders with a script, write a CSV, and push it to the repo.
5. Drive upload 130 KB: commit to the repo (always works) and let the PC copy it to Drive.
6. PaperPort-188 and OPH register: PC pushes a CSV copy into the repo. Already queued in PASTE-D-071/072 item A4.
7. Plaud links expire: pull the transcript text right away with the Plaud connector and save it to the repo. Never store the link.

## Section B. Item 1. Texting (SMS / WhatsApp)
Ranked best to worst:
1. **BEST: SMS by Zapier to Jorge's own iPhone.**
   - Cost: free tool; each send uses one Zapier task. Check the plan's task count (UNVERIFIED which plan he is on).
   - Limits (Zapier help article): verified phone numbers only (one-time PIN), 15 messages per hour, US and UK numbers, T-Mobile numbers not supported, 153 characters, content rules apply.
   - Owner clicks: 2 (open Zapier verify link, type the PIN code he receives). If his carrier is T-Mobile this fails, so then use the runner-up.
   - Who: Jorge does the one-time PIN. Cloud then sends through the Zapier connector (needs a Zapier connection; Zapier currently shows 0 connections, so this connection step is a Jorge click).
   - Next step: cloud calls discover/enable for "SMS by Zapier", then gives Jorge the one verify link.
2. **RUNNER-UP: iPhone Shortcuts automation.** Free. Trigger on time of day or on an incoming message, with a Send Message action and "Ask Before Running" turned off. No email trigger was confirmed (UNVERIFIED), so the trick is a time-of-day check that reads a Calendar event or a file. Owner clicks: about 10 once to build. Who: Jorge once (cannot be built from the cloud). Weaker, because it is fiddly and iOS can still prompt.
3. **Contacts (Miguel at MZ Solutions): wa.me link.** Free. Cloud writes a tap-to-send link with the message pre-filled; Jorge taps it and presses Send. 1 tap per message. This is not automatic sending. (wa.me pre-fill details were not confirmed by my search; UNVERIFIED but it is long-standing behaviour.)
4. **Twilio (true automatic texts to anyone).** RED, costs money. About $0.0083 per message plus carrier fees of roughly $0.002 to $0.005. One-time US registration (A2P 10DLC) about $4.50 for sole proprietor, $46 for standard brand, plus about $1.50 to $2 per month campaign fee and about $1.15 per month number. Rough first-month estimate for 100 texts: $8 to $12. Needs credentials and signup, so Jorge clicks. Do not start without his yes on the estimate. Sources disagree on fees; confirm on Twilio's pricing page.
5. **WhatsApp Business API.** RED. Meta charges per message from 1 Oct 2026 (utility about $0.006 in the US per vendor blogs). Needs business verification. Overkill for one person. Not recommended.
6. **Carrier email-to-text gateways. Do not use.** AT&T shut down June 17 2025. T-Mobile unreliable since late 2024. Verizon degrading, full shutdown planned March 31 2027. Lifespan: days.
7. **Google Voice.** No official send API from the cloud. Manual only. Skip.
8. **Microsoft Phone Link on the PC.** Works with iPhone over Bluetooth only: no group chats, no photos, iPhone must stay connected, sends are manual from the PC. Not usable by the cloud. Skip.

## Section C. Item 2. Outlook send
Best: **keep using outlook_create_draft and Gmail for sending today**, and try the consent fix below.
1. **Admin consent click path (Jorge, about 6 clicks):**
   1. Go to entra.microsoft.com and sign in as the TEAMUSASALES.COM admin (1Password fills it; agents never type it).
   2. Identity, then Applications, then Enterprise applications.
   3. Remove the "Application type" filter, search the client id 07c030f6-5743-41b7-ba00-0a6e85f37c17.
   4. Open it, then Security, then Permissions.
   5. Click "Grant admin consent for TEAMUSASALES.COM", sign in, click Accept.
   6. Tell Claude to reconnect the Microsoft 365 connector.
2. **Role needed:** Global Administrator always works. Privileged Role Administrator also works for Microsoft Graph permissions. Application or Cloud Application Administrator cannot grant Graph permissions. (Role list from general Entra knowledge; my search did not return Microsoft's page, so UNVERIFIED. A vendor guide said Global Admin.)
3. **Important honesty point (UNVERIFIED):** admin consent only grants the permissions the connector app already asks for. If the connector never requests Mail.Send, consenting will not add it. First check with get_granted_scopes after step 6. If Mail.Send is still missing, this fix is impossible from the tenant side and the connector vendor must add it. Then use the runner-up.
4. **Runner-up: Zapier "Microsoft Outlook: Send Email".** Free within task limits. Zapier has 0 Outlook connections, so Jorge must click "Connect" and sign in once (credential click). Then cloud can send. This path does not depend on the connector scopes.
5. Third option: create Outlook drafts (works now); Jorge presses Send. 1 click per email.
Who: Jorge for consent. Cloud verifies with get_granted_scopes.
Next step: cloud runs get_granted_scopes now and records what is granted. Cost: free.

## Section D. Item 3. PC headless 6-a-day cap (PASTE-D-072 / D-071 item 23A)
Note: the cap-removal order is WORK-QUEUE item 23 (PASTE-D-071), which D-072 says it supersedes; D-072 itself covers items 23 and 24.
Cloud can verify only from files in VTES-Outbox and the repo. Checklist:
1. Look for `EXECUTED_REMOVE-HEADLESS-CAP_2026-10-14.md` in VTES-Outbox. Missing = not done (state IN PROGRESS, not DONE).
2. It must contain: the diff, the backup path (`Inbox-Codex-Failover_bak-20261014.ps1`), and the rollback path (`Rollback_Remove-Headless-Cap_2026-10-14_HHMM.ps1`).
3. It must show one headless job that started after the old 6th run, with a timestamp later than the 6th run today.
4. Search VTES-Outbox for any new `CAP-REACHED_*.md` dated after the fix time. There should be none.
5. Check the drain list moved: orders/pending/ emptied oldest first, RAMBO-QUEUE_2026-10-12 processed, PaperPort-188 table copy and Alec PDFs copy appeared in the repo or Drive.
6. Recheck 24 hours later: still no CAP-REACHED file, and run count above 6 on a normal day. Add a dated line to RECURRING-ISSUES.md either way.
Cost: free. Who: cloud. Next step: cloud polls VTES-Outbox and reports counts.

## Section E. Item 4. OneDrive listing capped at 200 per folder
1. **BEST: do it on the PC.** One PowerShell script lists every folder with Get-ChildItem -Recurse and writes a CSV (path, size, date) per folder to the repo as each finishes. No cap, no Graph needed. Free. Owner clicks: 0 if queued in the WORK-QUEUE. Who: desktop. Next step: cloud writes a WORK-QUEUE item.
2. **RUNNER-UP: Graph delta.** Microsoft's driveItem delta call is built for full enumeration: keep following @odata.nextLink until none remains, then save the @odata.deltaLink to get only later changes. Supports $top. I could not confirm a page-size maximum (UNVERIFIED). The M365 connector does not expose delta; it would need an app registration with credentials (RED, Jorge clicks).
3. sharepoint_search pagination: try with narrower queries (by year or file type) to split a folder into under-200 slices. Free, cloud, but incomplete by design. Use only as a spot check.

## Section F. Item 5. Drive upload of files about 130 KB or larger
1. **BEST: commit to the repo, then the PC copies to Drive.** Always works, keeps version history. Free. Who: cloud commits; desktop runs the copy (add to WORK-QUEUE). 0 owner clicks.
2. **RUNNER-UP: Drive copy_file** when the file already exists in Drive (copy a template then update it). Only helps for files that Drive already holds.
3. Chunking: split into parts under 100 KB with a manifest, PC reassembles. Works, but adds failure points. Fallback only.
4. GitHub raw URL: gives a download link only; Drive cannot fetch private raw URLs. Useful only if the repo file is public, which client files must never be. Skip for client data.

## Section G. Item 6. PaperPort-188 table and OPH register only on the PC
1. **BEST: PC pushes a CSV copy into the repo** (scripted, per-item, on a schedule: Tier 3 enforcement). Already ordered as the "PaperPort-188 table copy" in PASTE-D-071 item 23A4. Free. Who: desktop.
2. **RUNNER-UP: PC copies both into Google Drive "Shared Folders for all LLMs"** (read-only), so the cloud reads them through the Drive connector. Needed anyway if the files are too big for the repo. Client names: keep the Drive copy private.
Verification: file appears with a row count; cloud reports "N of N rows" and compares to the PC count.
Next step: confirm the 23A4 copy landed; if not, put the register on a nightly copy job.

## Section H. Item 7. Plaud transcript links expire after 1 hour
1. **BEST: pull the content, not the link.** Use the Plaud connector (list_files, get_transcript, get_note) the moment a recording appears, and write the text to the repo. Free. Who: cloud. Run it from the nightly queue so every new recording is captured within one cycle.
2. **RUNNER-UP:** if only a link is ever given, fetch the link immediately in the same turn and save the file. Links older than 1 hour are re-requested through the connector, which issues a fresh one.
Never store the expiring link as the record. Store the transcript text with the Plaud file id and the TRK or OPH.
Next step: cloud adds "Plaud sweep: save new transcripts" as an OVERNIGHT-QUEUE item (read-only, writes only new files, so GREEN).

## Section I. Sources
- Zapier SMS limits: https://help.zapier.com/hc/en-us/articles/8496258419341
- Twilio US pricing: https://www.twilio.com/en-us/sms/pricing/usa ; fees: https://support.twilio.com/hc/en-us/articles/1260803965530
- Carrier gateways shut down: https://textbolt.com/blog/att-email-to-text-alternative/ ; https://www.sociocs.com/post/how-to-send-a-text-message-from-email-why-the-manual-method-fails-business/
- WhatsApp pricing 2026: https://respond.io/blog/whatsapp-pricing-change-2026 ; https://chakrahq.com/article/whatsapp-api-pricing-guide/
- Phone Link on iPhone: https://macrumors.com/2023/02/28/microsoft-windows-imessage ; https://www.pcworld.com/article/1801392/all-iphone-owners-can-now-use-phone-link-on-windows-11.html
- Shortcuts auto-send: https://wccftech.com/how-to/how-to-schedule-text-messages-on-iphone-and-ipad-using-shortcuts-app/amp/
- Graph delta paging: https://learn.microsoft.com/graph/api/driveitem-delta
- Mail.Send consent (vendor guide, weak): https://pypi.org/project/django-msgraphbackend
- Internal: PASTE-LOG.md line 120; mailbox/to-desktop/WORK-QUEUE.md items 23 and 24.

Shall I queue the PC items (4, 5, 6) in WORK-QUEUE.md now?
