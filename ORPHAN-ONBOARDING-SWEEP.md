# ORPHAN ONBOARDING SWEEP — every location, split by who can reach it

**Requested by Jorge 2026-08-16:** onboard orphan documents from **all** locations —
Outlook, Gmail, Dropbox, OneDrive, all system files, PaperPort, and anything
forgotten.

**Method:** `ORPHAN-NUMBERING.md`. Every document gets an `OPH-2026-NNNN` on arrival.
A real `TRK` is required to leave a holding area for `01-JOBS`. **Gate on exit, never
on entry.**

---

## 1. Locations, and who can actually reach each

**Split by tested access. Assumed access is how RI-019 happened.**

### CLOUD CAN REACH — verified
| Location | Status | Notes |
|---|---|---|
| **Gmail** | ✅ verified | Search and read. Recovered the July approvals list this way |
| **Google Drive** | ✅ verified | Read, write, create, move, rename. Used all day |

### DESKTOP ONLY — cloud is physically blocked
| Location | Why cloud cannot |
|---|---|
| **Outlook** | MAPI, local application. 635 emails with attachments already counted |
| **OneDrive** | Microsoft 365 connector unauthorized (TRK-2026-9020) |
| **Dropbox** | **NEW — first mentioned 2026-08-16.** No cloud connector exists. Local folder only |
| **PaperPort** | Local application. Two separate folders: the 15-item scanner folder and `Business Cards` |
| **`C:\Users\JV\Downloads`** | Local filesystem |
| **`C:\Users\JV\Desktop`** | Local filesystem |
| **Anything else on the machine** | Local filesystem |

### NOT YET IDENTIFIED — the "any others I may have forgotten"
**This is the important half.** Every tool with an inbox creates a holding area. The
desktop must go looking rather than working from a list, because the dangerous ones
are the forgotten ones.

Candidates worth checking:
- Any second Dropbox account or shared folder
- Phone camera roll / photo backups — inspection photos
- WhatsApp or SMS attachments
- A scanner's own default folder, separate from PaperPort's
- Browser download folders other than the default
- USB drives — `USB20FD (E:)` was visible in a screenshot 2026-08-15
- `Seagate Portable Drive (B:)` — also visible
- Old machine backups, `Jorge-Backup`, `PAD related files 20260307`, `exports`
- Email accounts other than the two known ones

**Report what is found, do not file any of it yet.**

---

## 2. The rule that matters more than the sweep

**Never file against a fuzzy match.**

On 2026-08-15 `14598 SW 110 ST` was one step from being filed into `TRK-2026-1262`
because both addresses contain "110". Different street, different party. **Cloud caught
it only because it held the registry and the desktop held the file.**

At the scale of ~870 documents that error will recur unless it is designed against.
**A document whose job is not certain from a permit number, folio or address stays an
orphan.** That is the correct outcome, not a failure.

**An unfiled document is merely waiting. A misfiled one corrupts a job record.**

---

## 3. Order — by lostness, not by count

**Established 2026-08-15 and it still holds.**

1. **PaperPort** (45 items) — 0% tagged, no text layer, no index. **Most lost.**
2. **Downloads** (30) — findable only if the filename is remembered
3. **Drive root** (8) — at least full-text searchable
4. **Dropbox** — unknown size, unknown searchability. **Survey before deciding**
5. **Outlook** (635 emails) — **least lost.** Searchable by sender, subject, date, in
   a tool used daily. **Do not build an extraction machine for this.**

**Count is not severity.** 635 emails is a frightening number that is not 635 problems.

---

## 4. Make it a Skill — Jorge's suggestion, and it is right

He asked for this to work "jointly with skills, as this will be a repetitive
function." **Correct, and it is the difference between doing this once and having it.**

The procedure is stable: find holding areas → assign OPH → extract evidence (permit
number, folio, address, party) → match to TRK or mark UNKNOWN → rename to convention →
file → log. **That is a procedure, and procedures belong in a Skill rather than being
re-explained to every new session.**

Without it, the next session rediscovers all of this from scratch — which is RI-005,
the reason the charter exists at all.

**Cloud can draft the Skill.** Tracked as TRK-2026-9073.

---

## 5. Miami-Dade — Jorge's Chrome point, tested

**He is right that Chrome is the fix. He is wrong that it applies to cloud.**

**Re-tested 2026-08-16, all four still refused:**

```
miamidade.gov                      -> 000
miamidadepa.gov                    -> 000
search.sunbiz.org                  -> 000
onlineservices.miamidadeclerk.gov  -> 000
github.com                         -> 400   (connected — control)
```

The control matters: `github.com` answering proves the network works and these
specific hosts are refused. **Nothing changed since the first test.**

**And cloud has no browser tool at all** — so even reachable sites could not be driven
through Chrome from here.

**The desktop has both:** unrestricted network *and* `claude-in-chrome`. **So the
Chrome route is real. It just belongs to the other executor.**

**This does not block scheduling.** Once the heartbeat exists (TASK-07), the desktop
can run the 22 sources on a timer — same automation Jorge wants, executed by the agent
that can actually reach them. **Cloud does the assembly, the registry and the report.**
