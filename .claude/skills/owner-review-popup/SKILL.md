---
name: owner-review-popup
description: Put a document (PDF, draft, report) in front of Jorge so he cannot miss it: a flashing, always-on-top window, never hidden under other windows, then an Outlook draft he sends himself. Use for any deliverable awaiting his approval. Standing owner directive OD-CR-01 (2026-09-30).
---

# Owner review pop-up — standing directive OD-CR-01

1. **Rule:** anything waiting for Jorge's approval is shown in a window that is **always on top, flashing, and repeats until he answers**. It must never sit under another window. A message in a chat or an email alone does not count.
2. **How (PC):** `tools/vtes-panel/VTES-CaptureReview.ps1 -Pdf <file> -Trk <TRK> -What "<one line>"` (topmost + taskbar flash + sound; buttons: Open PDF, Make email draft, Later (10 min), Discard). `-Watch` mode pops up any new PDF dropped into `G:\My Drive\MY-DESK\CAPTURE-INBOX\`.
3. **Email:** the draft is a **new Outlook message from Jorge@teamusasales.com**, PDF attached, **To blank** unless Jorge gave a recipient, subject and body pre-filled with the TRK and hashtags. The script only ever calls Display(); **no agent calls Send**.
4. **From the cloud:** the cloud cannot reach the PC screen. Put the file in Drive `MY-DESK\CAPTURE-INBOX\` and a one-line order in `VTES-Inbox`; say so plainly. Also show Jorge the file in the chat with the file-send tool and add it to the red-bell reminders.
5. **Proof of done:** a log line in `capture-review.log` with time and file name, or a screenshot showing the window on top. Not proven on Windows as of 2026-09-30: report what you see, not what you expect.
6. **Never:** send, reply, forward, or fill the To line on Jorge's behalf; open the window without the file attached; close it for him.
