# CLAUDE WINDOWS — configuration & restore sheet
**Built 2026-08-24 by cloud, at Jorge's request. This window's specs are pulled live from the session;
the others are the TARGET config (confirm on each window — cloud can't read the desktop/Cowork directly).**
*#window-config #restore #RI-031 #RI-008 #JorgeValdes*

---

## A. ☁️ THIS window — Code, Cloud/Web (LIVE-CONFIRMED)
Pulled from the running session 2026-08-24:

- **Surface:** Claude Code **on the web** (opened from claude.ai) — origin `web_claude_ai`.
- **Runs where:** **Anthropic's cloud**, not your PC (`environment_kind: anthropic_cloud`). It's an
  ephemeral container — anything not committed/pushed is lost when it recycles.
- **Model:** **Opus 4.8** (`claude-opus-4-8`) — and the model actually serving is the same. ✅ (This is
  the thing RI-008 says to always check — you were silently on a small model for months.)
- **Reasoning effort:** **high**.
- **Permission mode:** **auto**.
- **Claude Code version (container):** 2.1.233.
- **Repo / branch:** `jorgev2121-dotcom/JV-repository` · `claude/chaude-code-max20-kp2o46`.
- **Rate-limit window:** 5-hour.
- **IDs (for restore):** session `session_01Pw9Z5c6w57prm2rnfa3Wvu` · environment `env_01NVDYu9gyb9QViMpGyjsXf9`.

**To restore this exact window:** open claude.ai → Code → the `JV-repository` environment, pick branch
`claude/chaude-code-max20-kp2o46`, set **model = Opus**, effort = high, permission = auto.

---

## B. The four windows, same config, one difference each
Every window should match A on the two things that matter most — **Model = Opus** and **the charter
(`CLAUDE.md`) auto-loads** — and each carries its own identity banner (RI-031). The only real
difference is *which surface it is and what it's allowed to touch.*

**1. ☁️ Code — Cloud / Web** (this one)
- Runs in Anthropic cloud. **Can:** the repo, Google Drive, Gmail, web. **Can't:** your PC, Outlook,
  miamidade.gov (egress-blocked), your desktop files.
- Banner `☁️ CODE · CLOUD / WEB EXECUTOR`, paste prefix **PASTE-C**.

**2. 🖥️ Code — Desktop executor**
- Same repo/branch, **same Opus model**, same charter. Runs the Claude Code CLI **on your Windows PC**.
- **Can (and only it can):** your PC files, Outlook, miamidade.gov, PaperPort, local scripts, Chrome.
- **Known issue:** its GitHub push is down — root cause found today (9674): **the PC was never signed
  into GitHub**, not "broken." Fix = sign in once; then it can push like cloud.
- Banner `🖥️ CODE · DESKTOP EXECUTOR`, paste prefix **PASTE-D**, statusline set to the same label.

**3. 🤝 Cowork — Desktop**
- Same Opus model, same charter loading. The Cowork window on your PC.
- **Role:** conversational / planning surface; not the repo executor.
- Banner `🤝 COWORK`, paste prefix **PASTE-X**.

**4. Web versions (Code-web = this window; Cowork-web)**
- Code-web is #1 above. **Cowork-web** = Cowork in a browser: same Opus model + charter, no local-PC
  reach (same limits as cloud).
- Use the same banner/prefix as its desktop twin so a block never lands in the wrong place.

**The one rule that ties them together:** every window states its banner + model on line 1, prefixes
every reply with its emoji, and restates identity when you type `ID` (CLAUDE.md §10 / RI-031). If any
window opens **not** on Opus, it must say so and stop before analytical work (RI-008).

---

## C. What only you / the desktop can confirm
Cloud can read its own session but **cannot see the desktop or Cowork settings.** For each of those,
open the window and check three things: **(1)** does it say Opus on line 1? **(2)** did `CLAUDE.md`
load? **(3)** is its banner correct? If any is wrong, that window is misconfigured — fix before use.

*Built by cloud 2026-08-24. This window's rows are live-confirmed; B/C are the target spec to verify on
each surface. #window-config #one-Opus-everywhere #RI-031 #RI-008*

---

## D. Microphone map — the beige windows with built-in mics (added 2026-08-25)
**Source: the desktop session's own run report, 2026-08-25, mirrored here by cloud so it survives a
restart.** Nothing below needs installing — it is already on the PC.

**The three beige windows WITH a built-in mic** (desktop opened all three, cascaded 30 px apart on the
left screen; mic device confirmed free):

1. **Claude desktop app** — the beige MS Store app (`Claude_pzs8sxrjxfjjc!Claude`). This is "Claude BEIGE."
2. **Claude Cowork** — claude.ai/cowork in its own Chrome window (not a tab).
3. **Claude Code (web)** — claude.ai/code in its own Chrome window.

**The one that CANNOT have a mic:** the Claude Code **terminal** (the beige console). It is a
command-line window — no mic button exists for it. **Dictation there = `Win+H`**, which
`Dictation-Tray.ps1` and `Mic-Button-Overlay.ps1` already run.

**The launchers already on the desktop** (this is the "installed" part — they exist, nothing to add):
- `1 - Claude BEIGE (Chat-Cowork-Code).lnk` → the desktop app
- `5 - Claude COWORK (browser).url` → claude.ai/cowork
- `4 - Claude CODE (browser).url` → claude.ai/code
- `3 - Claude CHAT (browser).url` → claude.ai/new

**Open defect from that run (desktop's own admission):** its window-matcher caught every window titled
"Claude" and **moved 9 windows, including six Code terminals; their previous positions are not
restorable.** Logged here so the next desktop session knows the cascade on the left screen is
post-move, not the original layout.

*#mic #dictation #window-config #RI-031*

---

## E. "I want ALL my windows to look like this one" — the rule (added 2026-08-29, Jorge's ask)

The window Jorge likes — mic button, shows the agent working, accepts pasted screenshots — is
**Claude Code in the browser (claude.ai/code)**. That style is not a setting; it IS the browser
version. So:

1. **To get that style, open Claude through the browser launchers** — `4 - Claude CODE (browser).url`
   and `5 - Claude COWORK (browser).url`. Every browser window has the mic, the running-agent view,
   and screenshot paste.
2. **The terminal can never look like this.** The beige console is a command-line program: no mic
   button, no agent panel; images paste via `Alt+V` (RI-009), dictation via `Win+H`. Its identity
   comes from the 🖥️ statusline (PASTE-D-024).
3. **Cloud vs desktop, the 3-second test:** if the window has a **browser address bar with
   claude.ai** in it → it runs in **Anthropic's cloud** (☁️ — can't touch the PC). If it's a **black
   console/terminal** → it runs **on the PC** (🖥️ — can touch files, Outlook, Chrome). The beige
   MS Store app is chat/Cowork on the PC's screen, but its "Code" tab still runs in the cloud.
4. Any window can also be asked directly: type **`ID`** and the charter (§10) obliges it to restate
   its banner, surface, and model.

---

## F. HUB-AND-EXECUTOR — Jorge's standing working model (owner directive, 2026-08-29)

**Jorge talks to ☁️ CODE·CLOUD (this browser window — mic, paste, advice) as his one communication
seat. Cloud ALWAYS collaborates with 🖥️ CODE·DESKTOP and brings back the MUTUAL determination, and
relays the desktop's replies to Jorge** so he doesn't have to shuttle between windows.

**The channels, in order:**
1. **GitHub repo** — cloud writes work orders to `mailbox/to-desktop/`; desktop pulls, works,
   answers via `TO-CLOUD.md` / its own commits. Survives everything.
2. **Google Drive continuity board** (`00-CONTINUITY-BOARD\` + `_CLAUDE-MAILBOX`) — both seats read
   it; cloud can create files there, desktop can edit in place. LAST-BUS-OUT carries each seat's beat.
3. **Jorge as courier (backup of last resort)** — numbered PASTE-D blocks, only when the desktop
   hasn't pulled.

**Pacing:** cloud is not always-on — it runs when Jorge writes or a scheduled check-in fires. While
a handoff is OPEN, cloud keeps a ~30-minute self check-in scheduled to poll Drive + TO-CLOUD and
relay the desktop's answer proactively. (A 15-second poll is not possible and would burn the shared
usage allowance that froze the iPhone; 30 minutes is the deliberate trade.)

**Backup if a channel dies:** Drive down → repo; repo push down on the PC (RI: GitHub sign-in) →
Drive; both down → paste blocks. And if THIS session dies, nothing is lost: every determination is
committed to the repo and boarded on Drive, so a fresh cloud session reads CLAUDE.md + OPEN-ITEMS +
#sitdown and continues without Jorge re-briefing anyone.

