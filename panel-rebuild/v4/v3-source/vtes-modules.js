// vtes-modules.js · TRK-2026-9910-B · #VTES-control-panel #modules #wiring
// The registry: one line per page of the panel. A page is LIVE only if its file exists in this folder (the verify script checks that).
// state: live | planned.  Planned pages show dashed violet and are not links.
window.VTES_MODULES = [
  { id: 'panel', emoji: '🏠', title: 'Panel home', short: 'Home', file: 'VTES-PANEL.html', state: 'live', what: 'Every module, how they are wired, and the file-integrity check.', tags: '#panel #home' },
  { id: 'windows', emoji: '💬', title: 'Windows, chat and Map', short: 'Windows', file: 'VTES-LLM-LAUNCHER.html', state: 'live', what: 'Talk to any LLM, dictate, read aloud, paste snips, shared folder, status colors, the Map.', tags: '#windows #LLM-01 #map #wiring' },
  { id: 'budget', emoji: '🧮', title: 'Budget and Router (Governor)', short: 'Budget', file: 'VTES-BUDGET.html', state: 'live', what: 'Which LLM should take this job right now, inside the subscription budgets. Subscriptions ledger.', tags: '#budget #governor #router #subscriptions' },
  { id: 'municipal', emoji: '🏛️', title: 'Municipalities and Forms', short: 'Cities', file: 'VTES-MUNICIPALITIES.html', state: 'live', what: '35 jurisdictions, portals, software families, the 22 county sites, and a permit fill sheet by folio.', tags: '#municipalities #permits #forms-library #folio' },
  { id: 'programs', emoji: '🧰', title: 'Programs and Shortcuts', short: 'Programs', file: 'VTES-PROGRAMS.html', state: 'live', what: 'Every program, task and shortcut found so far, searchable (look-alike-character tolerant) and by hashtag.', tags: '#programs #shortcuts #search #OCR' },
  { id: 'treeview', emoji: '🌳', title: 'Tree View', short: 'Tree', file: 'VTES-TREEMAP.html', state: 'live', what: 'The folder map from the inventory crawler (shows real data once the PC has scanned).', tags: '#treeview #inventory #TreeSize' },
  { id: 'reminders', emoji: '🔔', title: 'Reminders', short: 'Reminders', file: 'VTES-REMINDERS.html', state: 'live', what: 'Everything waiting for you, due dates first.', tags: '#reminders #owner-actions' },
  { id: 'tasks', emoji: '📋', title: 'Pending Tasks', short: 'Tasks', file: 'VTES-TASKS.html', state: 'live', what: '643 tasks merged and ranked (499 look live). Search, filter, change any rank.', tags: '#tasks #pending #priority' },
  { id: 'portal', emoji: '🗂️', title: 'Job Portal', short: 'Portal', file: 'VTES-PORTAL.html', state: 'live', what: 'Permit and legalization jobs on the 13-stage workflow: where each stands, what is next, what blocks it.', tags: '#portal #workflow #permit #legalization' },
  { id: 'capture', emoji: '🛰️', title: 'Capture Desk', short: 'Capture', file: 'VTES-CAPTURE.html', state: 'live', what: 'County page PDFs for a job: numbers to paste, links, file-name builder, the review-and-send pop-up plan.', tags: '#capture #county #OD-CR-01 #permit-status' },
  { id: 'where', emoji: '📍', title: 'Where Things Live', short: 'Where', file: 'VTES-WHERE.html', state: 'live', what: 'Searchable map of Drive folders, repo files, PC locations and county pages.', tags: '#where #map #drive #repo' },
  { id: 'interview', emoji: '🎤', title: 'Interview', short: 'Interview', file: 'VTES-INTERVIEW.html', state: 'live', what: '12 short voice-friendly questions, one at a time. Answers copy out with a stamp.', tags: '#interview #owner #voice' },
  { id: 'quote', emoji: '💵', title: 'Dollar Quote', short: 'Quote', file: 'VTES-QUOTE.html', state: 'live', what: 'Worst-case dollar quote before any per-token API call (OD-API-01). Approvals, logged actuals, project budgets.', tags: '#quote #api #budget #OD-API-01' },
  { id: 'crm', emoji: '📇', title: 'CRM', short: 'CRM', file: '', state: 'planned', what: 'Recommendation written (CRM-RECOMMENDATION.md): keep Airtable.', tags: '#crm #airtable #wally' },
  { id: 'dispatch', emoji: '📮', title: 'Dispatch board', short: 'Dispatch', file: '', state: 'planned', what: 'Task cards that hand build and install work to Codex, Cowork and Grok Bots (ROUNDTABLE-PROTOCOL.md).', tags: '#dispatch #roundtable' }
];
// Wires between modules: [from, to, what travels]. Planned wires are dashed violet in the picture.
window.VTES_WIRES = [
  ['windows', 'budget', 'status dots and headroom: who is up and who has room'],
  ['budget', 'windows', 'Route button: the recommended window is preselected'],
  ['reminders', 'windows', 'red bell on every page'],
  ['municipal', 'programs', 'portal and program links share one hashtag search'],
  ['programs', 'treeview', 'same inventory crawler feeds both'],
  ['municipal', 'crm', 'job address, folio, city code (planned)'],
  ['municipal', 'dispatch', 'portal-check batches for Codex, Cowork, Grok Bots (planned)'],
  ['budget', 'dispatch', 'router picks who takes each card (planned)'],
  ['windows', 'dispatch', 'every handoff becomes a card with an ACK deadline (planned)'],
  ['portal', 'capture', 'each job opens its own county page list and file-name builder'],
  ['portal', 'municipal', 'the job folio opens the permit fill sheet already typed'],
  ['portal', 'budget', 'Which LLM takes this: the task is preselected'],
  ['tasks', 'portal', 'job tasks and job stages describe the same jobs'],
  ['capture', 'reminders', 'a PDF waiting for your review raises the red bell'],
  ['where', 'programs', 'same search, same hashtags'],
  ['interview', 'tasks', 'your answers decide the ranking (you or an assistant applies them)'],
  ['portal', 'dispatch', 'copy-card hands one stage to another window (planned)'],
  ['quote', 'budget', 'API dollars (logged actuals) sit beside subscription room; only an approved quote lets a per-token call start']
];
