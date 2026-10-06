// build-v4.js - repairs the v3 launcher into v4 (never starts from nothing). Node. TRK-2026-9910-B
// Reads v3-source/VTES-LLM-LAUNCHER_repo-copy-2026-09-30.html (the 2026-09-30 repo copy; NOT Jorge's live v3), applies each patch, FAILS LOUDLY if a patch finds nothing.
const fs = require('fs');
let h = fs.readFileSync(__dirname + '/v3-source/VTES-LLM-LAUNCHER_repo-copy-2026-09-30.html', 'utf8');
// The build time is the real instant this script runs, never hand-set (flaw F3). An environment variable cannot override it; the page also checks it against the BAD CLOCK rule.
if (process.env.V4_BUILT) { console.log('NOTE: V4_BUILT is ignored. The build time is always the real build instant.'); }
const BUILT = new Date().toISOString().slice(0, 19) + 'Z'; // ISO UTC; shown on the page as Eastern time
const BUILT_ET = new Date(BUILT).toLocaleString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
function rep(name, from, to) { if (!(from instanceof RegExp ? from.test(h) : h.includes(from))) { throw new Error('PATCH MISSED: ' + name); } h = h.replace(from, () => to); }
// vtes4-config.js (written by INSTALL-v4.ps1) holds the address of the v3 folder; the status-only file and the reminders are read from there (a file: address only)
const LOADER = f => '<script src="vtes4-config.js"></script><script>(function(){var c=window.VTES4_CONFIG,u=c&&c.v3_dir_url;window.VTES4_BASE=(typeof u==="string"&&/^file:/i.test(u)&&/\\/$/.test(u))?u:"";document.write("<scr"+"ipt src=\\""+window.VTES4_BASE+"%F%\\"></scr"+"ipt>");})();</script>'.replace('%F%', f);
rep('title', /<title>[^<]*<\/title>/, '<title>VTES LLM Launcher v4 - TRK-2026-9910-B</title>');
// 1. data + live layer + cards scripts, loaded before the main script
const SCRIPTS = ['vtes4-heartbeat', 'vtes4-state', 'vtes4-health', 'vtes4-tokens', 'vtes4-housekeeping', 'vtes4-miamidade'].map(n => '<script src="data/' + n + '.js"></script>').join('') + '<script src="vtes4-live.js"></script><script src="vtes4-cards.js"></script><script src="vtes4-panels.js"></script>';
rep('scripts-in', '<body>', '<body>\n<script>window.VTES4_BUILT = "' + BUILT + '";</script>' + LOADER('vtes-status.js') + SCRIPTS);
// 2. cards: static v3 cards replaced by the generated ones
rep('cards', /<div class="grid" id="grid">[\s\S]*?<\/div>\n\n<div class="bus">/, '<div class="grid" id="grid"></div><script>VTES4C.renderCards(document.getElementById("grid"));</script>\n\n<div class="bus">');
// 3. chips: plain names
rep('chips', /var CHIPS = \[[^\n]*\];/, "var CHIPS = [['LLM-01','RAMBO desktop'],['LLM-02','Cloud keeper'],['LLM-03','Cowork'],['LLM-04','Chat'],['LLM-05','iPhone'],['LLM-06','Codex'],['LOCAL','Local'],['LLM-07','Grok'],['LLM-08','Gemini'],['LLM-09','Governor'],['CHIEF','Chief'],['LLM-10','Copilot']];");
rep('chip-label', "esc(c[1].split(' ')[0])", 'esc(c[1])');
rep('chipnum', "c[0].slice(4)", "(c[0].indexOf('LLM-') === 0 ? c[0].slice(4) : '')");
rep('ce', "'LLM-10': '🪟' };", "'LLM-10': '🪟', 'LOCAL': '💻', 'LLM-09': '🧮', 'CHIEF': '🎖️' };");
// 4. WINDOWS + INFO: add LOCAL, plain names
rep('windows', "    { id:'LLM-10', name:'Microsoft Copilot', url:'https://copilot.microsoft.com', how:'' }", "    { id:'LLM-10', name:'Microsoft Copilot', url:'https://copilot.microsoft.com', how:'' },\n    { id:'LOCAL', name:'Local Executor (Ollama)', url:'', how:'There is no window. Save the packet as JOB-something.md in G:\\\\My Drive\\\\VTES-Inbox-LOCAL.' },\n    { id:'LLM-09', name:'Governor / Token and LLM Manager', url:'', how:'No window of its own from this page. Give the packet to the Desktop Executor (RAMBO).' },\n    { id:'CHIEF', name:'Chief / Orchestrator', url:'', how:'No window yet. Give the packet to the Desktop Executor (RAMBO).' }");
rep('win01', "name:'Claude Code Desktop (RAMBO)'", "name:'Claude Code Desktop Executor / RAMBO'");
rep('win02', "name:'Claude Code Cloud'", "name:'Claude Code Cloud Executor / Repo Keeper'");
rep('info01', "t: 'CODE · DESKTOP'", "t: 'CODE · DESKTOP EXECUTOR / RAMBO'");
rep('info03', "t: 'COWORK'", "t: 'CLAUDE COWORK / ANALYST'");
rep('info-local', "    'LLM-10': { e: '🪟', t: 'COPILOT'", "    'LOCAL': { e: '💻', t: 'LOCAL EXECUTOR / OLLAMA (free)', d: 'Runs on this PC, free, nothing leaves the machine.', p: 'PASTE-X', a: 'No window. Use the Local lane folder.' },\n    'LLM-09': { e: '🧮', t: 'GOVERNOR / TOKEN AND LLM MANAGER', d: 'Lives on the PC. Watches spend, keeps the lineup map, files spending motions for your yes. (From the old Map note: UNVERIFIED now.)', p: 'PASTE-D', a: 'No window of its own. Give the packet to the Desktop Executor (RAMBO).' },\n    'CHIEF': { e: '🎖️', t: 'CHIEF / ORCHESTRATOR', d: 'The Chief seat that hands jobs between executors. (From text pasted on 2026-10-06: UNVERIFIED.)', p: 'PASTE-X', a: 'No window yet. Give the packet to the Desktop Executor (RAMBO).' },\n    'LLM-10': { e: '🪟', t: 'COPILOT'");
// 5. typed STATUS table removed; state read from the data files (probe-only entries kept: they are live browser checks)
rep('status', /var STATUS = \{[\s\S]*?\n  \};\n/, "var STATUS = {\n    'LLM-04': { probe: 'https://claude.ai/' }, 'LLM-07': { probe: 'https://grok.com/' }, 'LLM-08': { probe: 'https://gemini.google.com/' }, 'LLM-10': { probe: 'https://copilot.microsoft.com/' }\n  };\n");
// FLAW 2: the status light is NEVER driven by a website ping. effective() reads only the data files. Pings feed a separate small "site answers" mark.
rep('effective', /function effective\(id\) \{[\s\S]*?\n  \}\n  var SYM/, "function effective(id) { return window.VTES4C.effective(id); }\n  var SYM");
rep('kcol', "var KCOL = { up:", "var KCOL = { nod: '#b3261e', up:");
rep('sym', "var SYM = { up: '●',", "var SYM = { nod: '✖', up: '●',");
rep('toggle', "['up', 'warn', 'down', 'pend', 'fut', 'unk'].forEach", "['up', 'warn', 'down', 'nod', 'pend', 'fut', 'unk'].forEach");
rep('chiplab', "SYM[e.k] + (s_ap(id) ? '~' : '') + fmtH(e.h)", "(e.lab ? SYM[e.k] + ' ' + e.lab : SYM[e.k] + (s_ap(id) ? '~' : '') + fmtH(e.h))");
rep('svglab', "' ' + (s_ap(n.id) ? '~' : '') + fmtH(e.h) : ''", "' ' + (e.lab || ((s_ap(n.id) ? '~' : '') + fmtH(e.h))) : ''");
rep('chiptxt', "(e.k === 'unk' ? '?' :", "(e.k === 'nod' ? 'NO DATA' : e.k === 'unk' ? (e.lab ? '? ' + e.lab : '?') :");
rep('css', '</style>', '  .chip.st-nod { border-color:#b3261e; background:#fdeceb; } .chip.st-nod .dot { background:#b3261e; box-shadow:0 0 0 1px #b3261e; } .chip.sel.st-nod { border-color:#ff8a80; }\n' + fs.readFileSync(__dirname + '/vtes4.css', 'utf8') + '\n</style>');
// 6. header: age stamp + dashboard + read-me-first, directly under the strip
rep('refresh', "function refreshAll() { paintChips(); paintCard(cur);", "function refreshAll() { paintChips(); paintCard(cur); window.VTES4C.paintSites(PROBE);");
rep('probefirst', "paintChips(); paintCard(cur); runProbes();", "paintChips(); paintCard(cur); window.VTES4C.paintSites(PROBE); runProbes();");
rep('tags', "    'LLM-10': '#LLM-10 #COPILOT", "    'LOCAL': '#LOCAL #OLLAMA #EXEC-LOCAL #PASTE-X #free #on-machine',\n    'LLM-09': '#LLM-09 #GOVERNOR #TOKEN-MANAGER #PASTE-D #budget #routing',\n    'CHIEF': '#CHIEF #ORCHESTRATOR #PASTE-X #CU-Orchestrator',\n    'LLM-10': '#LLM-10 #COPILOT");
rep('top', '<div id="map" hidden></div>', '<div id="v4top"></div>\n<div id="map" hidden></div>');
rep('panels-slot', '<div class="hand" id="hand">', '<div id="v4panels"></div>\n<div class="hand" id="hand">');
rep('panelsbtn', '<button class="tb" id="t_map"', '<button class="tb" id="t_pan" type="button" title="Token monitor, housekeeping, Miami-Dade, Grok, repairs">Panels</button>\n    <button class="tb" id="t_map"');
rep('stripage', '<div id="chips"></div>', '<div id="chips"></div>');
rep('init', "showMode('con'); selectLLM(cur);", "showMode('con'); selectLLM(cur);\n  document.getElementById('t_pan').addEventListener('click', function () { showMode('dir'); var p = document.getElementById('v4panels'); if (p.scrollIntoView) { p.scrollIntoView(); } });\n  VTES4P.render(window.VTES4_BUILT);");
// 7. timings + footer
rep('footer', /<p class="foot">TRK-2026-9910-B · repo copy 2026-09-30[^<]*<\/p>/, '<p class="foot">TRK-2026-9910-B · v4 · built <span id="v4fb"></span> · CURRENT · v3 is untouched and stays beside it as the rollback · #VTES-control-panel #LLM-registry</p>');
rep('hint', /<p class="hint">Every window has a fixed address[^<]*<\/p>/, '<p class="hint">Every card says what it is, shows its real state (green only when a fresh data file says so), and has a button that works or says plainly why it cannot yet.</p>');
// 8. drop the dead script tags for files that are not in the package (status now comes from data\\vtes4-*.js)
rep('dead', '<script src="vtes-status.js"></script>\n', '');
rep('legacy', '<script src="vtes-alerts.js"></script><script src="vtes-reviews.js"></script><script src="vtes-budget.js"></script>', '');

// ===== FIX ROUND 1 patches =====
// FLAW 11: the bell must count only the real reminders (no phantom item for the dropped budget file)
rep('bell', /\(function \(\) \{ try \{ var R = \(window\.VTES_REMINDERS[^\n]*\} catch \(e\) \{ \} \}\)\(\);/, 'window.VTES4C.paintBell();');
// FLAW N12: the bell colour comes from the reminders and today's date (red only when something is due or overdue), not from a fixed style
rep('bellstyle', 'title="Things waiting for you. Red means something is due or overdue." style="background:#b3261e;color:#fff;border-color:#b3261e;text-decoration:none"', 'title="Things waiting for you." style="background:#6b6b66;color:#fff;border-color:#6b6b66;text-decoration:none"');
// FLAW 6: one CURRENT footer only (the page footer). The Map footer goes; the copied status report carries the build stamp, not CURRENT.
rep('mapfoot', / \+\n      '<p class="foot">' \+ PROJ \+ ' · map v1 · ' \+ MAP_DATE \+ ' · CURRENT[^\n]*<\/p>';/, ";");
rep('rptstamp', "' · status · ' + MAP_DATE + ' · CURRENT'", "' · status report · built ' + window.VTES4.builtText(window.VTES4_BUILT)");
rep('rptnow', "new Date(nowMs()).toISOString() + ' · #STATUS", "window.VTES4.fmt(new Date(nowMs())) + ' · #STATUS");
rep('legendtime', "new Date(nowMs()).toLocaleTimeString()", "'<i id=\"v4legt\"></i>'");
// FLAW 5: STALE is red everywhere; amber is gone
rep('legend', /var it = \[\['up', 'UP \(green\)'\][^\n]*\n/, "var it = [['up', 'UP (green): a fresh data file says up'], ['down', 'DOWN or STALE (red)'], ['nod', 'NO DATA (red)'], ['fut', 'not built or not connected (violet, dashed)'], ['unk', 'unknown (grey)']];\n");
rep('legendhours', "<span>Hours = time since last sign of life. Checked ", "<span>Checked ");
rep('legendwire-dots', "● up · ▲ stale (amber, hours) · ✖ down (red, hours) · ◌ set up but not signed in (blue) or not connected yet (violet, dashed) · ? unknown.", "● up (green, from a fresh data file) · ✖ down, stale or no data (red) · ◌ not built or not connected yet (violet, dashed) · ? unknown.");
rep('reachword', "\"Reachable\" for web chats means the site answered from this browser, not that you are signed in.", "For web chats a separate small \"site answers\" mark on the card shows only whether the site answered from this browser; it is never the status light and never means you are signed in.");
rep('rptreach', "(Reachable = the site answered from this browser, not that a login works.)", "(The status lights come only from data files. Whether a web site answers is a separate small mark on each card.)");
// FLAW 7: typed Map words and subscription notes are labelled as typed notes, never green
rep('typedbanner', "legendStatus() + body", "legendStatus() + '<div class=\"v4typedbox\" id=\"v4typedmap\"><b>Typed note from 2026-09-30, not live.</b> Only the round status dot on each window is live (read from the data files). Everything else on these three tabs, namely the can / partly / later words, the wire dots, the WORKS and PARTLY tags and the subscription notes, was typed on 2026-09-30 and has not been re-checked. It is labelled as a typed note wherever it appears.</div>' + window.VTES4C.mapNote() + body");
rep('cantyped', "'</div><div class=\"mcan\">' + canText(n.id) + '</div>", "'</div><div class=\"mcan\"><i>Typed note, 2026-09-30:</i><br>' + canText(n.id) + '</div>");
rep('lanetag', "<span class=\"mtag ' + b.w[1] + '\">' + b.w[0] + '</span></div><div class=\"ld\">", "<span class=\"mtag un\">typed note 2026-09-30: ' + b.w[0] + '</span></div><div class=\"ld\">");
rep('wiretag', "<span class=\"mtag ' + b.w[1] + '\">' + b.w[0] + '</span> — '", "<span class=\"mtag un\">typed note 2026-09-30: ' + b.w[0] + '</span> — '");
rep('legendy', "['y', 'connected now']", "['y', 'connected (typed note 2026-09-30, not live)']");
rep('tword', "y: 'can, now'", "y: 'can (typed note 2026-09-30)'");
rep('subpill', "style=\"--c:' + s.c + '\"><span class=\"sw\">' + esc(s.w) + '</span>", "style=\"--c:#6b6b66\"><span class=\"sw\">typed note 2026-09-30: ' + esc(s.w) + '</span>");
rep('subsadvice', "'<div class=\"actbox\"><b>Two Grok charges, one too many.</b>", "'<div class=\"actbox\"><i>Typed note from 2026-09-30, not live. The advice below, including the date, may be out of date.</i><br><b>Two Grok charges, one too many.</b>");
rep('sub-why', "Why: Grok Bot and your two Grok Automations ride on SuperGrok, and Grok on grok.com does not need X Premium Plus.", "Why: Grok on grok.com does not need X Premium Plus.");
rep('sub-item1', "Both Automations (Daily Planner, Alec microfilm 30-day clock) should be listed there. If they are, nothing moves.", "Any Grok Automations you set up should be listed there. If they are, nothing moves.");
rep('sub-item2', "'<li>Grok Bots: nothing set up yet, nothing to move.</li>' +", "'<li>' + window.VTES4C.grokText() + '</li>' +");
rep('sub-feeds', "feeds: 'LLM-07 Grok · Grok Bots · Grok Automations'", "feeds: 'LLM-07 Grok (chat only)'");
rep('sub-note', "note: 'Six receipts in a row (Apr 17 to Sep 17). xAI says Grok Bot is now included with SuperGrok (8/27). Your two Grok Automations (Daily Planner, Alec microfilm 30-day clock) email you from this account.'", "note: 'Six receipts in a row (Apr 17 to Sep 17), read from email on 2026-09-30.'");
rep('subsread', "Read from your Gmail receipts on ' + MAP_DATE + '.", "Typed note: read from your Gmail receipts on ' + MAP_DATE + '.");
// FLAW 8: one honest Grok statement on the Map too
rep('row5', 'Row 5 · Analysts and bots · Cowork and Grok Bots do the same kind of job', 'Row 5 · Analysts, chat and phone');
rep('botsnode', "n: 'Grok Bots', s: 'with SuperGrok'", "n: 'Grok Bots', get s() { return window.VTES4C.botsSub(); }");
rep('reach-grok', "'LLM-07': 'Chat only. Its Automations email you (Daily Planner, Alec film clock); it cannot read your inbox.',", "get 'LLM-07'() { return window.VTES4C.grokText(); },");
rep('reach-bots', "'BOTS': 'Bots get their own computer and sign in to tools. Not set up.',", "get 'BOTS'() { return window.VTES4C.grokText(); },");

// ===== FIX ROUND 2 patches =====
// FLAW N2: every 60 seconds the data files are reloaded (cache-busted) and cards, panels, strip, chips, bell and Map are all re-evaluated together
rep('tick60', "setInterval(paintChips, 60000);", "var v4tickN = 0; setInterval(function () { v4tickN++; window.VTES4.reload(function () { window.VTES4P.refresh(window.VTES4_BUILT); window.VTES4C.repaint(); window.VTES4C.paintBell(); refreshAll(); window.VTES4C.paintSites(PROBE); if (v4tickN % 2 === 0) { runProbes(); } }); }, 60000);");
rep('probetimer', "setInterval(runProbes, 120000); ", "");
// FLAW N7: every time in the packet, the pad and the transcript is Eastern, short form, with the zone
rep('packetstamp', "var stamp = new Date().toLocaleString();", "var stamp = window.VTES4.fmt(window.VTES4.now());");
rep('padstamp', "at: new Date().toLocaleString(), att: atts || []", "at: window.VTES4.fmt(window.VTES4.now()), att: atts || []");
rep('padshow', "' · ' + esc(m.at) + '</div>'", "' · ' + esc(window.VTES4.padTime(m.at)) + '</div>'");
rep('padtranscript', "' · ' + m.at); out.push(m.t);", "' · ' + window.VTES4.padTime(m.at)); out.push(m.t);");
rep('todayet', "function todayStr() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }", "function todayStr() { try { return new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' }); } catch (e) { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); } }");

// ===== FIX ROUND 3 patches =====
// FLAW F12: the status-only file never replaces a probe address; the page reads it through VTES4 only
rep('statusmerge', "try { if (window.VTES_STATUS) { for (var sk in window.VTES_STATUS) { STATUS[sk] = window.VTES_STATUS[sk]; } } } catch (e) { }", "");
rep('sap', "function s_ap(id) { return !!(STATUS[id] && STATUS[id].approx); }", "function s_ap(id) { return false; }");
// the reminders file is read from the v3 folder too (same loader)
rep('remloader', '<script src="vtes-reminders.js"></script>', LOADER('vtes-reminders.js'));
// FLAW F16: redraw only what changed. Chips and the card line are written only when their text differs; the Map is rebuilt only when its html differs, its note survives, its legend time is its own node.
{ const m = /if \(hr\) \{ hr\.textContent = ([^\n]*?); \}\n      chip\.title/.exec(h); if (!m) { throw new Error('PATCH MISSED: chiptext'); } h = h.replace(m[0], () => 'if (hr) { window.VTES4.setText(hr, ' + m[1] + '); }\n      chip.title'); }
rep('cardtext', "el.style.color = KCOL[e.k]; el.textContent = SYM[e.k] + ' ' + e.txt + (e.why ? ' — ' + e.why : '');", "el.style.color = KCOL[e.k]; window.VTES4.setText(el, SYM[e.k] + ' ' + e.txt + (e.why ? ' — ' + e.why : ''));");
rep('mapvars', "var mapTab = 'flow';", "var mapTab = 'flow'; var mapNoteText = '';");
rep('mapassign', "    el.innerHTML = '<div class=\"mt\">'", "    var mapHtml = '<div class=\"mt\">'");
rep('maprebind', "    Array.prototype.forEach.call(el.querySelectorAll('.mt button[data-t]'), function (b) { b.addEventListener('click', function () { mapTab = b.getAttribute('data-t'); renderMap(); }); });\n    document.getElementById('mapcopy').addEventListener('click', function () { copyAny(statusReport()).then(function (ok) { document.getElementById('mapnote').textContent = ok ? 'Copied.' : 'Copy failed: select the text and press Ctrl+C.'; }); });",
"    if (el.__v4h !== mapHtml) {\n      el.innerHTML = mapHtml; el.__v4h = mapHtml;\n      Array.prototype.forEach.call(el.querySelectorAll('.mt button[data-t]'), function (b) { b.addEventListener('click', function () { mapTab = b.getAttribute('data-t'); mapNoteText = ''; renderMap(); }); });\n      document.getElementById('mapcopy').addEventListener('click', function () { copyAny(statusReport()).then(function (ok) { mapNoteText = ok ? 'Copied.' : 'Copy failed: select the text and press Ctrl+C.'; window.VTES4.setText(document.getElementById('mapnote'), mapNoteText); }); });\n    }\n    window.VTES4.setText(document.getElementById('mapnote'), mapNoteText);\n    window.VTES4.setText(document.getElementById('v4legt'), window.VTES4.fmt(new Date(nowMs())));");

fs.writeFileSync(__dirname + '/VTES-LLM-LAUNCHER_v4.html', h);
console.log('built VTES-LLM-LAUNCHER_v4.html ' + h.length + ' bytes, built ' + BUILT);
