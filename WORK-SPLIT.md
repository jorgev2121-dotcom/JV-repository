# WORK-SPLIT — who does what, and why

**2026-08-16.** Split by **verified** access, not assumed access. Every capability
below was tested; RI-019 was cloud claiming a capability it had never tried, and that
error is not being repeated here.

---

## 1. Communication — the honest state

**Google Drive mailbox: WORKING, both directions, proven.**
Cloud wrote `TO-DESKTOP.md`; the desktop read it and replied with `TO-CLOUD.md`. Ten
files have moved this way. **This is a real channel, not a hope.**

**Remote Control: NOT connected.** A process is running on the PC; no session
registered. Cloud's `ListAgents` is still empty. Until that changes there is no
direct, instant messaging.

**Desktop → GitHub: BROKEN.** Git push hangs on Windows Credential Manager.
**Workaround in place and working:** the desktop writes to Drive, cloud mirrors into
the repo. Its holding-areas inventory reached GitHub by that route.

**So: is communication acceptable? Functionally yes — with one caveat that governs
everything below.**

**THE CAVEAT: the desktop cannot wake itself.** It runs only while a window is open.
Cloud wakes hourly, day and night, whether or not Jorge is present. The desktop does
not. **That is the real cap on throughput — not the task list.**

A perfect task list handed to a correspondent who is asleep produces nothing. **The
single highest-leverage change available is giving the desktop a heartbeat**
(TRK-2026-9070), and it is gated behind restoring the health report so it does not
become another silently-dead scheduled task.

---

## 2. Verified capabilities

### CLOUD — tested, works
- **Google Drive** — read, search, create, move, rename. Used all day.
- **Gmail** — read and search. Recovered the July approvals list this way.
- **GitHub repo** — read, write, commit, push. 20+ commits.
- **Web search and fetch** — **partial, and the limits are known.**
- **Scheduled hourly wake** — day and night, unattended.

### CLOUD — tested, does NOT work
- **`miamidade.gov`, `miamidadepa.gov`, `search.sunbiz.org`** — EGRESS_BLOCKED,
  403 on CONNECT. **All Miami-Dade and Sunbiz work is impossible from cloud.**
- **Jorge's PC** — no access of any kind. Ever.
- **OneDrive** — Microsoft 365 connector unauthorized.
- **Browser control** — none.

### DESKTOP — tested, works
- **The PC** — files, folders, settings, scheduled tasks, Task Scheduler history.
- **OneDrive** — including `ClaudeMemory` and the master tracking registry.
- **Outlook via MAPI** — counted 635 emails with attachments.
- **Chrome control** (`claude-in-chrome`).
- **Unrestricted network** — the county and state sites cloud cannot reach.
- **Opus 5**, confirmed by statusline 2026-08-16.

### DESKTOP — does NOT work
- **Waking itself.** The governing constraint.
- **Git push.** Credential Manager hangs.

---

## 3. The split

### CLOUD OWNS — needs nobody, runs overnight
| Item | TRK |
|---|---|
| Marketing campaign drafts | 1614 — **done**, in `marketing/` |
| Drive survey: full-text, short-form, untagged | 9033 |
| Normalise `TRK-26-` → `TRK-2026-` in Drive and Gmail | 9008 |
| Map which jobs lack version logs | — |
| Reconstruct the backlog from Drive + Gmail | 9046 |
| Assign OPH numbers to Drive-side orphans | 9066 |
| Maintain every ledger, log and registry | ongoing |
| Mirror the desktop's Drive files into the repo | ongoing |

### DESKTOP OWNS — cloud physically cannot
| Item | TRK | Why |
|---|---|---|
| **Find `_WORK-REGISTER.csv`** | **9053** | **Highest value on the board.** 183 rows |
| Finish Remote Control | 9069 | Unlocks direct messaging *and* phone push |
| Restore the daily health report | 9035 | Dead since 2026-06-19. The sensor for everything |
| Migrate `ClaudeMemory` into the repo | 9017 | OneDrive — cloud cannot reach it |
| **All 22 Miami-Dade sources** | 9007 | Cloud is egress-blocked. Reassigned |
| OCR: re-enable, long paths, TRK stamping | 9034–9038 | Local tasks and files |
| The 870 orphans in local holding areas | 9056–9058 | Local files |
| PaperPort: Send To Bar, searchable-PDF profile | 9059, RI-021 | Local application |
| Bridge button, terminal profile, Outlook reminders | 9013–9015 | Local |
| Verify TRK 1614–1629 against the master registry | 9067 | OneDrive |

### JORGE OWNS — four things, and only four
1. Send the Wally / Alec email? *(drafted since 2026-07-30)*
2. Approve two skip traces, ~$99? *(check the 6 recovered contacts first)*
3. Leave the PAD routine running, or review it?
4. Authorize the Microsoft 365 connector? *(optional)*

---

## 4. What genuinely runs in parallel

**Cloud on Drive/Gmail/repo, desktop on the PC — no overlap, no collisions.** The two
touch different substrates, which is why parallel work is safe here and would not be
if both were filing into `01-JOBS` at once.

**Where they must serialise:** anything writing to `01-JOBS`. One at a time, with the
rollback script written first. Misfiling is the failure the whole system exists to
prevent, and two agents filing simultaneously is how it would happen.

---

## 5. On "huge progress like never seen before"

**Straight answer, because an inflated one would be worthless.**

**Today was genuinely unusual.** A charter that loads into every session where none
existed. A ledger with 70+ items. 21 recurring issues diagnosed. The model fixed after
months of silent degradation. 870 orphaned documents found. Six untracked jobs given
numbers. A misfiling caught before it happened. **And the backlog located — it was a
file all along.**

**Tomorrow is capped by two things, not by ambition:**

1. **The desktop's heartbeat.** Its list is longer and heavier than cloud's, and it
   only moves while Jorge has a window open. Fix that and its throughput changes
   category.
2. **Four approvals.** Seventeen of them sat unanswered from 2026-07-31 and froze ~40
   jobs. Four is a much better number, and they are all one-word answers.

**What will NOT produce a breakthrough:** a longer task list. The list is not the
constraint. **The constraint is that one of the two workers is asleep unless
someone opens a window.**

---

# Division of work 2026-11-21 (Cloud executor and Desktop executor / RAMBO)

**Owner order, Jorge, 2026-11-21 (iPhone):** connect the cloud executor and the desktop
executor, then divide the work so the two do not collide. Free two-way talk if possible,
handoffs if not. List it on the VTES Control Panel.

## Section A. The connection, as verified today

1. **Drive mailbox: WORKING.** Cloud wrote `MSG-CLOUD-TO-CODE_UNSAFE-STRUCTURES-PRIORITIES_2026-11-21.md`
   to VTES-Inbox and read it back (4,073 bytes). This is the guaranteed route.
2. **Cloud to PC direct messages: ENABLED today.** Cloud's send was refused until Jorge
   approved, in person on his phone, that this session may reach his other sessions. He did.
   Cloud then sent one message to the RAMBO session (`session_017mUMsg6Ta1yqQudpdCtVBz`);
   the tool reported `delivered`.
3. **Reply from RAMBO: NOT SEEN.** Every desktop session on DESKTOP-OTB90LR reads
   `disconnected`; the newest error is `computer_unreachable` (last seen 2026-11-17).
   `list_computer_folders` is empty. Until RAMBO answers, treat the link as one-way.
4. **Smallest action for Jorge if RAMBO stays silent:** at the PC, open the Claude desktop
   app and make sure Remote Control is on (Settings, Claude Code, Remote Control).
   Cloud cannot do this part. It is IMPOSSIBLE from here, not hard.
5. **Desktop to git push:** recorded BROKEN on 2026-08-16. Not re-tested today. Do not
   rely on it. Desktop writes to Drive; cloud mirrors into the repo.

## Section B. The split

**CLOUD takes** anything that needs Gmail, Google Drive, QuickBooks, GitHub, the Control
Panel, reports and artifacts, scheduled wakes, and the ledgers (`OPEN-ITEMS.md`,
`RECURRING-ISSUES.md`, `PASTE-LOG.md`, the checkpoint).

**DESKTOP (RAMBO) takes** anything that needs the PC: miamidade.gov, miamidadepa.gov,
sunbiz.org and the Clerk site (cloud is refused there), OneDrive, 1Password, Outlook,
desktop apps, local OCR, scheduled tasks on Windows, and the tracking-number registry.

**Current jobs**

1. Unsafe Structures live refresh: **Desktop** (county and Sunbiz). **Cloud** builds the
   report and the owner brief from whatever Desktop saves.
2. Issue the Unsafe Structures TRK number: **Desktop**, from the registry. Cloud must not.
3. Wally pipeline and the three cash items: unchanged, Priority Zero. Cloud drafts and
   sends nothing without Jorge's YES; Desktop does PC-side steps.
4. QuickBooks: **Cloud** (connectors say "sign in again", so Jorge's click is needed).
5. Mail-repair ACK, PASTE-D-071, RI-057 and RI-058 numbering check: **Desktop**.

## Section C. Rules so the two never collide

1. **One owner per job.** The owner is named in this file. A different window does not
   start it; it asks.
2. **Claim before you touch.** Write `CLAIM_<job>_<window>.md` to VTES-Outbox first.
3. **Only one writer into `01-JOBS` at a time.** Filing is RED. Rollback script first.
4. **Cloud never issues a TRK.** Desktop issues from the registry.
5. **Every message ends with a question** (OD-01). Silence is not an answer.
6. **If direct messaging fails, fall back to the Drive mailbox** and say so in the message.

Is RAMBO back on Remote Control so it can answer?

**CORRECTION 2026-11-21 ~11:00 ET (cloud's own error).** Section A item 3 and the panel text implied the PC was unreachable. Drive `STATE-OF-PLAY` (10:43 ET) shows RAMBO-DESKTOP **active**, last activity 10:39 ET. The PC is alive. Only the **Remote Control lane** is down (all sessions `disconnected`, `computer_unreachable` 11-16 to 11-17). The Drive lane works. `delivered` on a direct message means the server accepted it, not that RAMBO read it. Investigation job sent to RAMBO via Drive: `JOB-RAMBO_INVESTIGATE-REMOTE-CONTROL-LANE_2026-11-21.md`. Which of the lanes can RAMBO see from its side?
