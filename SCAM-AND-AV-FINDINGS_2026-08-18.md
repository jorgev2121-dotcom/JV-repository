# The scam is dead, the vector was a Google ad — and Defender has been flagging our own tools

**TRK-2026-9355 · TRK-2026-9361 · desktop reports 11:30 + 11:47 ET, mirrored 16:15 UTC**

---

## Section A — The scam: killed, vector named, zero damage

- **Arrived 11:11:52, killed 11:26 by the desktop. Jorge never touched it.** The page resisted
  with a leave-site trap; the desktop clicked Leave; the window handle now returns not-a-window.
- **The vector was a GOOGLE AD CLICK — malvertising.** The URL carries a `gclid`, which only
  Google's own ad redirector mints. A throwaway Heroku subdomain. **Not a notification, not a
  task, not our fleet** — Chrome-KeepAlive proven innocent by its own log (0 entries today).
- **Damage check clean across five surfaces:** no task, startup item, service, extension or
  permission created. The page got engagement cookies and nothing else.
- **The notification-permission lists were audited and NOTHING was removed** — every entry is
  Jorge's own tooling. *"Deleting one to look busy would be a fake win."*
- **The desktop declared a foul against itself:** clearing evidence at 11:29 it stole focus,
  and Jorge's dictation landed in its window. **The 11:29–11:30 window is excluded from
  today's keystroke-thief table — that one was us.**
- Open: the scam URL sits in Chrome's memory queue, not yet on disk; precise history delete
  offered on Jorge's word. Quick scan running.

## Section B — The antivirus: my job's premise was wrong on this machine, said plainly

**The expired product is Malwarebytes Premium (expired 2026-07-29). But Defender was NEVER
held off by it** — Malwarebytes doesn't register in Security Center, so **Defender has been ON
the whole time**, all shields true, signatures fresh. My "worse than none" framing did not
apply here; the honest finding replaced it.

**Standing recommendation unchanged: pay nobody.** Remove Malwarebytes on Jorge's Yes purely
to stop the nag-service (vendor's own uninstaller, path recorded). **Bonus ghost: three
Webroot registrations in Security Center from 2020–21 with no Webroot on the machine** —
cosmetic, registry-gated, untouched.

## Section C — The finding that outranks both: Defender flags OUR automation as a Trojan

**Four detections of `Trojan:Win32/FileFix.BBA!MTB`, severity Severe, action Remove — all on
our own PowerShell commands**, verbatim from Sunday night's Tamiami correction session.

**Why:** FileFix is a *behavioural* signature for "web page tells victim to paste a PowerShell
command" — **the exact scam class that was on the left monitor today.** Our automation runs
the same shape (`-ExecutionPolicy Bypass -NoProfile -NonInteractive`). Defender is doing its
job on a pattern we match.

**Damage: none found** — the addendum file survived byte-for-byte; no active threats. **Honest
limit: the quarantine list needs elevation (Jorge), so "nothing we know is missing" ≠ "nothing
was quarantined."**

**Ruling, both executors agreed: NO Defender exclusion for pwsh or C:\AI — that would punch a
hole in the exact shield that catches the real version of today's scam.** Leave it, watch for
a tool call dying mid-run — **a Defender Remove on live pwsh looks exactly like a Claude
command failing for no reason.** That sentence goes in the troubleshooting vocabulary.

#TRK-2026-9355 #TRK-2026-9361 #security #JorgeValdes #CU-Inspections
