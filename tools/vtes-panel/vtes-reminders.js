// vtes-reminders.js · TRK-2026-9910-B · #reminders #owner-actions
// One line per thing waiting for Jorge. Edit here (or let an agent edit); the red bell counts items with done:false.
// as-of 2026-09-30, from the session notes and OPEN-ITEMS.md. Anything marked "check" has not been re-verified today.
// kind: money | owner | desktop | check.  due is YYYY-MM-DD or ''.  NEVER put a password, card number or key in this file.
window.VTES_REMINDERS = [
  { id: 'R-01', kind: 'money', title: 'Cancel X Premium Plus ($40/month) before Oct 11, or keep it if you use the blue check', due: '2026-10-11', detail: 'SuperGrok ($30) already covers Grok. Saves $480 a year. Only you can cancel. Confirm your two Grok Automations are listed at grok.com/automations first.', src: 'Budget page / OPEN-ITEMS 9/30', done: false },
  { id: 'R-02', kind: 'desktop', title: 'Paste PASTE-D-054 into the PC session (RAMBO) so the desktop wakes up', due: '', detail: 'Find it with the sidebar Search box: RAMBO. The desktop has been silent since about 9/24.', src: 'PASTE-LOG.md', done: false },
  { id: 'R-03', kind: 'owner', title: 'Sign in to ChatGPT for Codex (desktop shortcut: Codex - sign in (Jorge))', due: '', detail: 'Codex is installed and waiting. No ChatGPT receipt was found in your email, so also check which account pays for it.', src: 'LLM-WINDOW-REGISTRY LLM-06', done: false },
  { id: 'R-04', kind: 'owner', title: '1Password: is the vault named Personal the one you want gone? (yes or no)', due: '', detail: 'It is deleted only if completely empty.', src: 'session 9/30', done: false },
  { id: 'R-05', kind: 'owner', title: 'Microsoft passkey: the owner-present step', due: '', detail: 'RAMBO has a read-only check ordered.', src: 'session 9/30', done: false },
  { id: 'R-06', kind: 'owner', title: 'Open copilot.microsoft.com signed in and read which tier it shows', due: '', detail: 'No Copilot charge exists in your email. One look settles it.', src: 'Budget page', done: false },
  { id: 'R-07', kind: 'money', title: 'Medley $8,000 invoice: send click', due: '', detail: 'Sending is yours.', src: 'CLAUDE.md Article 3', done: false, check: true },
  { id: 'R-08', kind: 'money', title: 'Alec: three finished books, send click; then invoice $100.25 after delivery is confirmed', due: '', detail: 'Do not invoice until delivery is confirmed.', src: 'CLAUDE.md Article 3', done: false, check: true },
  { id: 'R-09', kind: 'owner', title: 'Answer the three short decisions: five charter amendments, Drive filename style, a real TRK for the filing project', due: '', detail: 'Each is a yes or a pick.', src: 'OPEN-ITEMS', done: false, check: true },
  { id: 'R-10', kind: 'check', title: 'Open items to re-check: the $349 charge, the Association email, the RFA outcome', due: '', detail: 'Carried from earlier sessions; not re-verified today.', src: 'session notes', done: false, check: true },
  { id: 'R-11', kind: 'owner', title: 'Decide the CRM: keep Airtable (recommended)', due: '', detail: 'See CRM-RECOMMENDATION.md. One word: keep or change.', src: 'CRM-RECOMMENDATION.md', done: false }
];
