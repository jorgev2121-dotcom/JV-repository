# WINDOW-LLM-05 · Claude iPhone · VOICE — diagnosis (stage 1, cloud agent)

Read-only. Written by the cloud diagnostic agent, 2026-10-06 (about 03:40 UTC, which is 11:40 PM ET on 10-05).

## 1. Verdict

**UNKNOWN. Confidence: high that it cannot be known from files; no confidence about whether the phone is in use right now.**

Freshest evidence of any iPhone-originated instruction: **2026-09-23**, about 13 days old. Three items carry the "(iPhone)" tag from that day:

1. The three-proof freeze repeal. Source: `CLAUDE.md` section 12 Article 1 ("Jorge, 2026-09-23 (iPhone)") and `OPEN-ITEMS.md` row TRK-2026-9952g.
2. The PC-stays-on and night-run policy. Source: `OPEN-ITEMS.md` row TRK-2026-9952e ("Owner directive 2026-09-23 (iPhone)").
3. Remote Control auto-start. Source: Drive `MSG-CLOUD-TO-CODE_OWNER-DIRECTIVE_REMOTE-CONTROL-AUTOSTART_TRK-2026-9952j_2026-09-23.md`, ID `1VKRQppQsG7jhFMMNpJfkiotiN6OzaxY2` ("Approved by Jorge 2026-09-23 (iPhone): 'Yes, add Auto start'").

I found nothing later tagged iPhone. "Nothing found" is not "nothing happened" (see defect 4).

## 2. Identity

Source: `LLM-WINDOW-REGISTRY_v2.md`, Drive `142DMVzKis2Zhas9vvAmqMRvrE6UYvyH2`, created 2026-10-02 06:54Z. Entry: "LLM-05 · Claude iPhone · VOICE". It is the Claude app on Jorge's iPhone, for dictation, voice approvals ("AP-0088: GO") and quick questions. Same account as LLM-04 Chat. Subscription billing. Address `vtes://llm-05` has "no PC address". Hashtags #LLM-05 #IPHONE #voice #dictation.

`AUTONOMY-ARCHITECTURE.md` section 3b says the same from the other side: the iPhone is "a window, not a third executor". It is a chat client, not a Claude Code session, with "no ListAgents entry to reach". Its only machine-visible traces are the Drive files it reads and writes, and Jorge's replies.

## 3. What the header would need to show, and where it cannot be right

The registry gives this window no heartbeat, no seat and no process. The live seat table (`STATE-OF-PLAY.md`, ID `1Unf8pWzRfiTp7MtuEQ1vRUuhsOFP2Ho4`, auto-written 10-05 23:34) lists five seats: RAMBO-DESKTOP, ORCHESTRATOR, LOCAL-EXECUTOR, COWORK, CHAT. **There is no iPhone row.** `HEARTBEAT-ROSTER.json` (ID `1apeD19ETuYUwvPaopbrWMIAUeCl6jJWm`) lists only VTES-LOCAL-POLLER and RECONCILER.

So any green or red lamp for LLM-05 would be invented. Three tempting wrong sources:

1. **CHAT's row.** It reads "10-05 23:27, 7 min, active". Chat and iPhone share an account, so that activity could be the desktop or the phone. Do not inherit it.
2. **`REMOTE-CONTROL-STATUS.md`** (ID `1z3ZrMHNBQ53ZnPqhjvLOp_nFIbaWx0Et`): "CONNECTED, checked 2026-10-05 11:33:07 PM". That is the PC's side of the link ("can the phone reach this PC"). It says nothing about whether the phone is in use. The file itself warns the phone tile can be stale.
3. **The panel's own model table** (`control-panel/panel-data.json`, 2026-09-30, "NO-KEY" seed). It is about API keys and has no phone row.

**Recommended header: "UNKNOWN, last heard 2026-09-23" in neutral grey. I agree with your suggestion, with four changes:**

1. Say "last heard in files", not "last seen". The date comes from text a relay wrote, not from the phone.
2. Take the date from files only. Never from Chat's row or the Remote Control file.
3. Leave LLM-05 out of any "N of M are off" count. A window that cannot report cannot be off.
4. Show the age in days ("13 days"), because a bare date reads as a fact about now.

**Strongest objection to my own agreement:** a lamp that is permanently grey is a dead sensor, which is the RI-015 shape in `RECURRING-ISSUES.md`: nobody learns anything from it. **Alternative:** an owner-initiated check-in. Jorge says one phrase to the phone, and Chat writes a one-line dated file to VTES-Inbox, which Chat already does (`MSG-CHAT-TO-ALL` files). The header then reads "last check-in <date>". I would propose this only as optional.

## 4. Defects found

1. **No self-report channel.** Evidence: the seat table and roster above. Severity: low. It blocks no work. It only matters if the header pretends otherwise.
2. **Chat and iPhone cannot be told apart in any file I read.** Evidence: the CHAT seat row. Severity: medium for the header, because a green LLM-05 copied from CHAT would be false.
3. **Voice approvals leave no device-tagged trace.** The approvals store records `owner_choice` and `owner_choice_ts` (RAMBO's EXECUTED restore note, ID `1NnZu5n1e8XLG0FMZbEPMHGpymzpGb56M`, 10-03). I saw no device field. That note says a decision "given... in a chat window with no file trace would not show up". So "last heard" will undercount, and the true last use of the phone is probably later than 09-23. Severity: medium. I found no evidence that AP-0088 was ever answered (card opened 2026-09-15). That is UNVERIFIED either way.
5. **Registry claim "anything said here is visible to the cockpit" is untested.** Plausible, since it is the same account, but UNVERIFIED. If false, voice approvals vanish between windows. Severity: medium, but it is a registry question, not a header question.
6. **Registry entry is thinner than its neighbours.** There is no handoff line and no paste-ID prefix. Under `CLAUDE.md` section 10 the iPhone maps to PASTE-X ("anywhere else"). Severity: low.
7. **Encoding damage in the Drive copy of the registry.** The window emojis read as "ð±" and "ð¥️" when I read the file. Cause UNVERIFIED (the file or the connector). The emoji is the window's identity banner, so check it. Severity: low.
8. **Date conflict.** `MORNING-REPORT_2026-09-05.md` line 219 mentions the iPhone freeze repeal, but its git history ends 09-21 and the repeal is dated 09-23 everywhere else. I used 09-23. Cause UNVERIFIED. Severity: low.

## OD-01 (every message ends with a question) and what depends on it

Source: `CLAUDE.md` section 8, `OWNER-DIRECTIVE_ALWAYS-END-WITH-QUESTION-01_2026-08-15.md` (Drive `14bFKLKP7cDCxtAQISOfEFdLmUhymL_p6`). It is an owner directive, permanent, and it names the iPhone protocol as its origin ("both sides end with a question and both sides answer").

What depends on it, as far as I could find:

1. **Nothing mechanical.** In the repo I found no script, parser or panel field that checks for a closing question mark. The references are rule text only: `NIGHT-PROTOCOL.md` line 166 ("One question, per OD-01"), `HANDOFF.md` line 122, `.claude/skills/orphan-onboarding/SKILL.md` line 215. I could not search Jorge's PC scripts: UNVERIFIED.
2. **The loop itself depends on it.** The directive's stated purpose is forcing a reply so threads do not die. The iPhone is the one window where Jorge actually replies, so the question is the hand-off there.
3. **The header does not need it.** Do not build a lamp that reads "last message had a question". It would be a second invented signal.
4. **Whether the phone app obeys OD-01 is UNVERIFIED.** The app is a chat client. It does not load `CLAUDE.md` by itself. It would only follow OD-01 through Jorge's own app settings or memory, which I cannot see. I also found no transcript of an iPhone thread.
5. **A tension to settle once.** `OWNER-NOTICE_ACCESSIBILITY-ADHD-DYSLEXIA_2026-10-05.md` (ID `1Y5Ahbf-4F6gYw2P1nV-WWEGCfwRM3toP`) says "Every question costs him executive function". `CLAUDE.md` section 8 says the closing question must be cheap. They are compatible only if the question is answerable in a word. No change needed, but say so in the registry.

## 5. Could not be checked from the cloud

1. Whether the phone is in use right now, or when it was last used. No file can answer this.
2. Whether Jorge's phone chats show up in Chat. Exact check for the desktop: open Chat on the PC, look at the newest conversation, and confirm it is the one last dictated on the phone. That settles defect 5.
3. The live panel and launcher on the PC. The Drive `VTES-LLM-LAUNCHER_v3.html` (ID `1uuH8C6gA-FtPhGoKIbRmhcN2GNtl6tBt`, modified 2026-10-02 18:42Z) is an 889-byte redirect stub "retired 2026-10-02". Exact check for the desktop: open `C:\Users\JV\JV-repository\VTES-CONTROL-PANEL.html` and look at what it shows for LLM-05. If it shows green or "active", that is wrong.

## 6. Proposed repairs (proposals only)

1. Header for LLM-05 reads "UNKNOWN, last heard in files <date> (<N> days)" in grey. GREEN, reversible.
2. Exclude LLM-05 from all "N of M off" counts. GREEN, reversible.
3. Forbid deriving LLM-05 from the CHAT row or the REMOTE-CONTROL file. GREEN, reversible.
4. Compute "last heard" from files containing "(iPhone)", reading `OPEN-ITEMS.md`, `PASTE-LOG.md` and VTES-Inbox. GREEN, reversible.
5. Optional: an owner-initiated check-in phrase that Chat turns into a one-line dated file. GREEN to build; RED if it writes into any registry.
6. Add a "source device" field to the approvals store, so voice approvals are countable. RED (touches the approvals script), reversible with backup.
7. Fix the registry entry: add handoff and paste-ID lines and check the emoji encoding. RED (registry edit), reversible with a `.bak` copy.

## 7. Question for Jorge

**Is a grey "UNKNOWN, last heard 13 days ago" the right way to show your iPhone, instead of green or red?**

TRK-2026-9960 · v1 · 2026-10-06 · DIAGNOSIS (stage 1, cloud agent)
