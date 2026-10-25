# JOB_JOEY_SPEECHIFY-FIX-AND-OVERLAY_V1_GO

To: Joey (Grok Bot hub, Owner's Executor). Joey may delegate to RAMBO or a Grok specialist for the PC work.
From: Cloud window (Claude Code, cloud), for Jorge Valdes
Date: 2026-10-25
Tracking: TRK-2026-10014 · #Speechify #Accessibility
Priority: **Top.** Jorge cannot read his work without it. Owner directive SPEECHIFY-PRIORITY-01 applies.
Return path: write `REPLY-TO-CHAT_JOB_JOEY_SPEECHIFY-FIX-AND-OVERLAY_V1.md` to VTES-Outbox with proof. A receipt-only reply counts as nothing.

---

## The problem, in Jorge's words

Speechify isn't reading again. It reads at random, then stops at times, and then stops for good. **The screen does not freeze; it just will not read.**

## Task 1 — Get Speechify reading again now (GREEN)

1. Close every Speechify window and process (desktop app, Edge/Chrome extension tabs). Then restart Speechify once.
2. Test: copy one paragraph and have Speechify read it. Record whether it reads, and how many seconds it takes to start.
3. If it still won't read, sign out of Speechify and back in. Jorge types any password himself; agents never see it.

## Task 2 — Find out WHY it reads at random, then stops (GREEN, read-only)

Check each of these and write down what you find. Don't fix anything yet.

1. **Clipboard fights.** List every program that watches the clipboard: 1Password, Grok, Claude, ChatGPT, Ditto or another clipboard manager, Windows clipboard history (Win+V), Phone Link, OneDrive or Google Drive sync, and any VTES script that reads or writes the clipboard.
2. **RAM.** Note free memory when it fails. List the top 10 memory users, and say whether Speechify's processes are among the ones being squeezed.
3. **Browser extension sleep.** If the Chrome or Edge extension is used, check whether the browser's memory saver or sleeping tabs put it to sleep (Chrome: Settings, then Performance).
4. **Audio device.** Check whether the default playback device changes (Bluetooth headset, monitor speakers, Phone Link) when it goes silent.
5. **Speechify logs and errors.** Look at Windows Event Viewer, Application log, for Speechify or browser errors at the times it stopped.
6. **Account limits.** Check whether a Speechify plan or AI-credit limit shows a message when it stops. Jorge asked Speechify support on 10-21 to stop extra AI charges.

**Deliver:** a short ranked list of causes, most likely first, with the evidence for each.

## Task 3 — Turn off ("disengage") Speechify's AI features (GREEN, settings only)

Turn off the AI extras so only plain text-to-speech is left: AI summaries, AI chat or "Ask AI", AI voice cloning, auto-generated podcasts and any AI auto-top-up. Keep his paid voices and reading speed as they are. Screenshot the settings before and after. **Don't change his plan or billing.** That's RED and Jorge's decision.

## Task 4 — Build the "Paste and GO" overlay (GREEN; it's a new file)

A small always-on-top window with as few steps as possible:

1. **One big text box.** Jorge pastes text (Ctrl+V), or it fills itself from the clipboard when it opens.
2. **One big GO button.** Reading starts right away, with no delay. Space or Enter also triggers GO.
3. **STOP** and **PAUSE** buttons, and a speed slider that remembers his setting.
4. **Resilient by design:**
   - It tries Speechify first.
   - If Speechify doesn't start reading within 3 seconds, it reads with the built-in Windows neural voice (Windows Narrator voices or Edge read-aloud) instead, so reading never stops completely.
   - It never holds the clipboard. It copies the text in once and lets go.
   - It runs at above-normal priority.
5. **Launch:** a single desktop shortcut called **"READ IT"**, plus a hotkey (Ctrl+Alt+R) that opens the overlay already filled with the clipboard text.
6. **Desktop is a launchpad, not storage** (charter §9). Keep the program file in the VTES tools folder and put only the shortcut on the Desktop.

## Task 5 — Make it last (Tier 3, enforcement)

1. A scheduled check every 15 minutes, only while Jorge is logged in. It confirms Speechify (or the overlay) is alive and that no clipboard watcher is stuck. If something is hung, it restarts it and writes one line to a log.
2. Put SPEECHIFY-PRIORITY-01 into the protocol: Speechify wins clipboard and RAM conflicts (see the directive file).

## RED — do NOT do these without Jorge's typed YES

- Uninstall any program, or change a Speechify plan or payment.
- Force-close any program with unsaved work (Word, Acrobat, Outlook drafts, client documents).
- Create, paste or ask for an API key (Grok billing guardrail, GROK-BOT-HUB-JOEY-01 Rule 4).
- Make permanent startup or registry changes beyond the one scheduled check in Task 5. That one needs Jorge's typed OK on the PC.

## Proof required for DONE

1. A screenshot of Speechify reading, with a timestamp.
2. The ranked cause list from Task 2.
3. Before and after screenshots of the AI settings.
4. A screenshot of the READ IT overlay reading pasted text after one GO click, plus proof that the fallback voice works (the test with Speechify closed).
5. The scheduled check's name and its first log line.

Close out in three states only: DONE with proof, BLOCKED with what you tried and the one small thing you need, or IN PROGRESS with what's left and when.

Joey: when will you start, and when should Jorge expect the first REPLY-TO-CHAT?
