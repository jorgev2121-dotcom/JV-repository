# ROOT CAUSE of the vanishing windows: FancyZones, proven by arithmetic. RI-023 was never a recurrence.

**TRK-2026-9377 · TRK-2026-9380 · desktop 20:35 UTC, mirrored 21:05 UTC**

## The finding

**FancyZones — the PowerToys module — has been throwing windows onto the monitor Jorge cannot
see. Not two owner buttons. Nineteen applications.**

**Proven, not suspected.** The two owner windows sat at −1919,8 (962×1071) and −963,8. Both
HTAs ask in their own code for *positive* coordinates (moveTo 5,55 and 260,60) — **a window
does not resize itself to a size its code never names** (610×840 → 962×1071). Then a Chrome
window was found at the byte-identical rectangle −1919,8 962×1071. **Two unrelated programs do
not choose the same four numbers. Only a zone does.**

## The arithmetic that closes it

DISPLAY2 (the invisible monitor, x −1920..0) has the FancyZones layout "CU 4-Half," 1 row × 2
columns, spacing 8. Computing it + Windows' 7px invisible border:

- **Zone 0:** predicted −1919, 8, 962×1071 → **observed −1919, 8, 962×1071 ✓**
- **Zone 1:** predicted −963 → **observed −963, 8 ✓**
- Margins reconcile: 8 + 948 + 8 + 948 + 8 = 1920, no residual.

**That is the zone. Not a theory.**

## Why it reaches them — five settings, all on

`appLastZone_moveWindows=true` · **`displayOrWorkAreaChange_moveWindows=true`** ·
`zoneSetChange_moveWindows=true` · `moveWindowsBasedOnPosition=true` · `excluded_apps=""` (nothing exempt).

**The second one explains what confused both executors: a window verified at 5,55 at 11:05 and
found at −1919,8 at 15:05 was NOT mis-verified. It was placed right, then re-yanked by a
work-area change hours later.** "Verified on the visible monitor" has a shelf life.

**And every owner button is `mshta.exe` — FancyZones can't tell STOP THEM from MAIL RESCUE.**
One remembered zone (zone 0, invisible monitor) governs all of them.

## The reframe — this is bigger than our buttons, and it is the two-year complaint

**`app-zone-history.json` holds 42 apps; 29 remember a zone on the invisible monitor; 19 point
at executables that exist today** — Chrome, Outlook, **explorer.exe**, Word, Excel, Windows
Terminal, Settings, mshta, cmd, notepad, PaperPort, Google Drive, Ollama, Malwarebytes, Phone
Link, the Store.

**RI-023 was never a recurrence. It was a symptom of a standing rule that nineteen applications
launch behind his back.** This is the mechanism behind "we build things and they disappear" and
"my windows go missing" — a two-year complaint, finally with a cause and an equation.

**Honest caveat kept:** a remembered zone means FancyZones *will* send that app there next time
it makes a window — measured for the ones on screen, not proven for all nineteen at once.

## The fix — built, previewed, NOT applied

`Stage-ExcludeMshtaFromFancyZones_2026-08-18.ps1` — 0 parse errors, preview clean, nothing
written. Half 1: `excluded_apps "" → "mshta.exe"` (stops FancyZones touching every owner button,
permanently, without disabling it for anything else). Half 2: drop the 29 invisible-monitor
memories. Backups, per-half read-back, auto-restore on failure, **and it refuses to run while
the PowerToys Settings window is open** (that window would write its in-memory copy back over
the fix — a silent revert that would read as "didn't work").

**Gated by CHARTER §1.33 (4-digit passcode) — both targets are completed builds. The passcode
now releases FOUR proven fixes, not three.**

## DIR-0043 corrected twice

Not only was PowerToys already installed — **the layouts already exist** (`custom-layouts.json`
= 13 layouts; the obsolete `zones-settings.json` the register looked for is a dead filename).
What's actually missing is the *specific five zones Jorge approved* — a smaller job than the
register claims.

#TRK-2026-9377 #TRK-2026-9380 #RI-023 #FancyZones #RootCause #JorgeValdes #CU-Inspections
