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
  ['windows', 'dispatch', 'every handoff becomes a card with an ACK deadline (planned)']
];
