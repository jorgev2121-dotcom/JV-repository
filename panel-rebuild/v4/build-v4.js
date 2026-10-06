// build-v4.js - repairs the v3 launcher into v4 (never starts from nothing). Node. TRK-2026-9910-B
// Reads v3-source/VTES-LLM-LAUNCHER.html, applies each patch, FAILS LOUDLY if a patch finds nothing.
const fs = require('fs');
let h = fs.readFileSync(__dirname + '/v3-source/VTES-LLM-LAUNCHER.html', 'utf8');
const BUILT = process.env.V4_BUILT || new Date().toISOString().slice(0, 16).replace('T', ' ');
function rep(name, from, to) { if (!(from instanceof RegExp ? from.test(h) : h.includes(from))) { throw new Error('PATCH MISSED: ' + name); } h = h.replace(from, () => to); }
rep('title', /<title>[^<]*<\/title>/, '<title>VTES LLM Launcher v4 - TRK-2026-9910-B</title>');
// 1. data + live layer + cards scripts, loaded before the main script
const SCRIPTS = ['vtes4-heartbeat', 'vtes4-state', 'vtes4-health', 'vtes4-tokens', 'vtes4-housekeeping', 'vtes4-miamidade'].map(n => '<script src="data/' + n + '.js"></script>').join('') + '<script src="vtes4-live.js"></script><script src="vtes4-cards.js"></script><script src="vtes4-panels.js"></script>';
rep('scripts-in', '<body>', '<body>\n' + SCRIPTS);
// 2. cards: static v3 cards replaced by the generated ones
rep('cards', /<div class="grid" id="grid">[\s\S]*?<\/div>\n\n<div class="bus">/, '<div class="grid" id="grid"></div><script>VTES4C.renderCards(document.getElementById("grid"));</script>\n\n<div class="bus">');
// 3. chips: plain names
rep('chips', /var CHIPS = \[[^\n]*\];/, "var CHIPS = [['LLM-01','RAMBO desktop'],['LLM-02','Cloud keeper'],['LLM-03','Cowork'],['LLM-04','Chat'],['LLM-05','iPhone'],['LLM-06','Codex'],['LOCAL','Local'],['LLM-07','Grok'],['LLM-08','Gemini'],['LLM-10','Copilot']];");
rep('chip-label', "esc(c[1].split(' ')[0])", 'esc(c[1])');
rep('chipnum', "c[0].slice(4)", "(c[0].indexOf('LLM-') === 0 ? c[0].slice(4) : '')");
rep('ce', "'LLM-10': '🪟' };", "'LLM-10': '🪟', 'LOCAL': '💻' };");
// 4. WINDOWS + INFO: add LOCAL, plain names
rep('windows', "    { id:'LLM-10', name:'Microsoft Copilot', url:'https://copilot.microsoft.com', how:'' }", "    { id:'LLM-10', name:'Microsoft Copilot', url:'https://copilot.microsoft.com', how:'' },\n    { id:'LOCAL', name:'Local Executor (Ollama)', url:'', how:'There is no window. Save the packet as JOB-something.md in G:\\\\My Drive\\\\VTES-Inbox-LOCAL.' }");
rep('win01', "name:'Claude Code Desktop (RAMBO)'", "name:'Claude Code Desktop Executor / RAMBO'");
rep('win02', "name:'Claude Code Cloud'", "name:'Claude Code Cloud Executor / Repo Keeper'");
rep('info01', "t: 'CODE · DESKTOP'", "t: 'CODE · DESKTOP EXECUTOR / RAMBO'");
rep('info03', "t: 'COWORK'", "t: 'CLAUDE COWORK / ANALYST'");
rep('info-local', "    'LLM-10': { e: '🪟', t: 'COPILOT'", "    'LOCAL': { e: '💻', t: 'LOCAL EXECUTOR / OLLAMA (free)', d: 'Runs on this PC, free, nothing leaves the machine.', p: 'PASTE-X', a: 'No window. Use the Local lane folder.' },\n    'LLM-10': { e: '🪟', t: 'COPILOT'");
// 5. typed STATUS table removed; state read from the data files (probe-only entries kept: they are live browser checks)
rep('status', /var STATUS = \{[\s\S]*?\n  \};\n/, "var STATUS = {\n    'LLM-04': { probe: 'https://claude.ai/' }, 'LLM-07': { probe: 'https://grok.com/' }, 'LLM-08': { probe: 'https://gemini.google.com/' }, 'LLM-10': { probe: 'https://copilot.microsoft.com/' }\n  };\n");
rep('effective', "var s = STATUS[id] || { st: 'unknown' }, now = nowMs(), hrs = function (t) { return (now - t) / 3600000; };",
  "var s = STATUS[id] || {}, now = nowMs(), hrs = function (t) { return (now - t) / 3600000; };\n    if (!(s.probe && PROBE[id] && PROBE[id].ok)) { return window.VTES4C.effective(id); }");
rep('kcol', "var KCOL = { up:", "var KCOL = { nod: '#b3261e', up:");
rep('sym', "var SYM = { up: '●',", "var SYM = { nod: '✖', up: '●',");
rep('toggle', "['up', 'warn', 'down', 'pend', 'fut', 'unk'].forEach", "['up', 'warn', 'down', 'nod', 'pend', 'fut', 'unk'].forEach");
rep('chiptxt', "(e.k === 'unk' ? '?' :", "(e.k === 'nod' ? 'NO DATA' : e.k === 'unk' ? '?' :");
rep('css', '</style>', '  .chip.st-nod { border-color:#b3261e; background:#fdeceb; } .chip.st-nod .dot { background:#b3261e; box-shadow:0 0 0 1px #b3261e; } .chip.sel.st-nod { border-color:#ff8a80; }\n' + fs.readFileSync(__dirname + '/vtes4.css', 'utf8') + '\n</style>');
// 6. header: age stamp + dashboard + read-me-first, directly under the strip
rep('top', '<div id="map" hidden></div>', '<div id="v4top"></div>\n<div id="map" hidden></div>');
rep('panels-slot', '<div class="hand" id="hand">', '<div id="v4panels"></div>\n<div class="hand" id="hand">');
rep('panelsbtn', '<button class="tb" id="t_map"', '<button class="tb" id="t_pan" type="button" title="Token monitor, housekeeping, Miami-Dade, Grok, repairs">Panels</button>\n    <button class="tb" id="t_map"');
rep('stripage', '<div id="chips"></div>', '<div id="chips"></div>');
rep('init', "showMode('con'); selectLLM(cur);", "showMode('con'); selectLLM(cur);\n  document.getElementById('t_pan').addEventListener('click', function () { showMode('dir'); var p = document.getElementById('v4panels'); if (p.scrollIntoView) { p.scrollIntoView(); } });\n  VTES4P.render('" + BUILT + "');");
// 7. timings + footer
rep('footer', /<p class="foot">TRK-2026-9910-B · v4 · 2026-09-30[^<]*<\/p>/, '<p class="foot">TRK-2026-9910-B · v4 · built ' + BUILT + ' · CURRENT · rollback = v3 (v3-source/) · #VTES-control-panel #LLM-registry</p>');
rep('hint', /<p class="hint">Every window has a fixed address[^<]*<\/p>/, '<p class="hint">Every card says what it is, shows its real state (green only when a fresh data file says so), and has a button that works or says plainly why it cannot yet.</p>');
// 8. drop the dead script tags for files that are not in the package (status now comes from data\\vtes4-*.js)
rep('dead', '<script src="vtes-status.js"></script>\n', '');
rep('legacy', '<script src="vtes-alerts.js"></script><script src="vtes-reviews.js"></script><script src="vtes-budget.js"></script>', '');
fs.writeFileSync(__dirname + '/VTES-LLM-LAUNCHER_v4.html', h);
console.log('built VTES-LLM-LAUNCHER_v4.html ' + h.length + ' bytes, built ' + BUILT);
