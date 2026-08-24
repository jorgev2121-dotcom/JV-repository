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
