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
