// build-v5.js - ports the live layer onto Jorge's REAL v3 launcher (never starts from nothing). Node. TRK-2026-9910-B
// Reads ../v3-live/VTES-LLM-LAUNCHER_v3.html, FAILS if its SHA-256 is not the one read from Drive, applies each patch, FAILS LOUDLY if a patch finds nothing.
const fs = require('fs'), crypto = require('crypto');
const SRC = __dirname + '/../v3-live/VTES-LLM-LAUNCHER_v3.html';
const raw = fs.readFileSync(SRC);
const REAL_SHA = '28d3ed5e6b8e5713c079afd349b10a3c4b38993768ca850c91c6f6c333411fe3';
if (crypto.createHash('sha256').update(raw).digest('hex') !== REAL_SHA) { throw new Error('the v3 source is not the real v3 launcher (SHA-256 differs)'); }
let h = raw.toString('utf8');
// the build time is the real instant this script runs, never hand-set (flaw F3); the page also holds it to the BAD CLOCK rule
if (process.env.V5_BUILT) { console.log('NOTE: V5_BUILT is ignored. The build time is always the real build instant.'); }
const BUILT = new Date().toISOString().slice(0, 19) + 'Z';
function rep(name, from, to) { if (!(from instanceof RegExp ? from.test(h) : h.includes(from))) { throw new Error('PATCH MISSED: ' + name); } h = h.replace(from, () => to); }
function repAll(name, from, to, n) { const c = h.split(from).length - 1; if (c !== n) { throw new Error('PATCH COUNT ' + name + ': expected ' + n + ' found ' + c); } h = h.split(from).join(to); }
// --- head ---
rep('title', '<title>VTES LLM Launcher</title>', '<title>VTES LLM Launcher v5 - TRK-2026-9910-B</title>');
rep('css', '</style></head>', fs.readFileSync(__dirname + '/vtes5.css', 'utf8') + '</style></head>');
const SCRIPTS = ['heartbeat', 'bots', 'state', 'health', 'tokens', 'housekeeping', 'miamidade'].map(n => '<script src="data/vtes5-' + n + '.js"></script>').join('');
rep('scripts', '<body>\n<div class="tabs" id="tabs"></div>', '<body>\n<script>window.VTES5_BUILT = "' + BUILT + '";</script><script src="vtes5-config.js"></script>' + SCRIPTS + '<script src="vtes5-live.js"></script><script src="vtes5-ui.js"></script>\n<div class="tabs" id="tabs"></div>');
// --- top block, slots, 7th section ---
rep('top', 'autofocus>\n', 'autofocus>\n<div id="v5top"></div>\n');
rep('leadlead', '<p class="lead">Maintained by hand in VTES-LLM-LAUNCHER_v3.html. Repairs and enhancements across Jorge\'s windows.</p>', '<p class="lead">TYPED LOG. Maintained by hand in VTES-LLM-LAUNCHER_v3.html; the last row was typed on 2026-10-02. Nothing in this table is checked by this page. Repairs and enhancements across Jorge\'s windows.</p>');
rep('botslead', '<p class="lead">These run by themselves on the PC. Check any of them with Get-ScheduledTask.</p>\n<div class="grid" id="g-bots">', '<p class="lead">These run by themselves on the PC. The line on each card is read from a data file the PC writes (the Windows scheduler\'s own report); red NO DATA means nothing has written it yet. Check any of them with Get-ScheduledTask.</p>\n<div id="v5tokens"></div><div id="v5house"></div>\n<div class="grid" id="g-bots">');
rep('repairslive', '</tbody></table>\n</div></div>\n', '</tbody></table>\n</div></div>\n<div id="v5repairs"></div>\n');
rep('sect7', '<p class="sub" style="margin-top:30px">TRK-2026-9910-B v3 2026-10-02 CURRENT.', '<h2 id="miamidade">7. Miami-Dade: 22 public sources</h2>\n<p class="lead">Added in v5. Every link opens that source\'s proof file in Drive. The count says unknown until the PC counts.</p>\n<div id="v5miami"></div>\n\n<p class="sub" style="margin-top:30px">TRK-2026-9910-B &middot; v5 &middot; built <span id="v5fb"></span> &middot; CURRENT.');
// --- tabs ---
rep('tabs-status', "['status','STATUS',1]", "['livestatus','STATUS',1]");
rep('tabs-add', "['repairs','REPAIRS',1]]", "['repairs','REPAIRS',1],['miamidade','MIAMI-DADE',1]]");
rep('tabs-render', "'<a class=\"tab panel\" href=\"file:///C:/Users/JV/JV-repository/VTES-CONTROL-PANEL.html#'+t[0].toUpperCase()+'\" target=\"_blank\" rel=\"noopener\">'+t[1]+'</a>'", "'<a class=\"tab panel\" title=\"OLD PANEL: a snapshot made on 2026-09-02, not live\" href=\"file:///C:/Users/JV/JV-repository/VTES-CONTROL-PANEL.html#'+t[0].toUpperCase()+'\" target=\"_blank\" rel=\"noopener\">'+t[1]+'<small>OLD PANEL, snapshot of 2026-09-02, not live</small></a>'");
rep('panel-btn', '&#8592; PANEL</a>', '&#8592; PANEL (OLD, snapshot of 2026-09-02, not live)</a>');
rep('index-btn', 'workspace index">INDEX</a>', 'workspace index">INDEX (OLD, snapshot of 2026-09-02, not live)</a>');
// --- defect 4: the hard-coded session address ---
rep('url-llm02', "url:'https://claude.ai/code/session_01CAqZRvV1WjuuxZCNwrE9Gf'", "url:'https://claude.ai/code'");
// --- defect 5: every typed interval goes ---
rep('t-llm01', ' Runs every 2 minutes and executes anything in VTES-Inbox.', ' Executes anything dropped in VTES-Inbox.');
rep('t-chief', 'CU-Orchestrator is chartered and Runs every 2 minutes on the free lane: closes', 'CU-Orchestrator is chartered and runs on the free lane: closes');
rep('t-localexec', ', runs jobs on Ollama, every 5 minutes.', ', runs jobs on Ollama.');
rep('t-orch', 'or escalates. Every 15 minutes.', 'or escalates.');
rep('t-prop', "'Hourly. Finds any lane", "'Finds any lane");
rep('t-poller', "'The 15-minute poller that wakes RAMBO", "'The poller that wakes RAMBO");
rep('t-queued', 'Confirm CU-Orchestrator ran in the last 15 minutes and list', 'Confirm CU-Orchestrator ran on its last scheduled run and list');
// --- defect 7: typed claims leave the card text (the dated notes are shown, labelled, by vtes5-ui.js) ---
rep('t-rambo', ' About 75% of the Max quota was used on 2026-10-01; forecast to run out Saturday.', '');
rep('t-codex', ' Proven 2026-10-01.', '');
// --- D9: the packet box is read only but its label said editable ---
rep('d9', 'The packet (editable before pasting)', 'The packet (read only: use the buttons above to copy it)');
// --- defect 9 and D8 ---
rep('stamp', 'new Date().toLocaleString()', 'window.VTES5.fmt(window.VTES5.now())');
rep('win-grok', 'function win(id){', "WIN.push({id:'GROK',n:'GROK',url:'',how:'Paste the packet into grok.com. The desktop executor (RAMBO) can run Second-Opinion.ps1 for you.'});\nfunction win(id){");
// --- cards: the live cards replace the static ones (same data, same order) ---
rep('render', "$('g-queued').innerHTML=QUEUED.map(", "VTES5U.renderAll(LLMS,ROLES,BOTS);\n$('g-queued').innerHTML=QUEUED.map(");
// F10: the search matches only the text v3 matched (v3's own card text is kept in data-s by renderAll), never the live state lines
rep('search', "var h=(c.dataset.k+' '+c.textContent).toLowerCase();", "var h=(c.dataset.k+' '+(c.dataset.s!==undefined?c.dataset.s:c.textContent)).toLowerCase();");
// F5: the RAMBO paste button gets its own slot directly under the page title
rep('rambo-slot', '<h1>VTES LLM Launcher</h1>\n', '<h1>VTES LLM Launcher</h1>\n<div class="v5rambo" id="v5rambo"></div>\n');
// F12: Codex CLI is a terminal program on the PC; the card must not open chatgpt.com (and "Copy packet and open" must not either)
rep('url-llm06', "url:'https://chatgpt.com'", "url:''");
// F13: AirDrop does not exist on a Windows PC
rep('airdrop', 'Send the packet with AirDrop or Notes first.', 'Get the packet onto the iPhone first (see the steps on this card).');
// F14: the line printed after "Copy packet and open" must not hand Jorge a command or a file job either (LOCAL, CODEX, RAMBO)
rep('how-local', "how:'Save the packet as JOB-*.md in G:\\\\My Drive\\\\VTES-Inbox-LOCAL with CLASS: and PROMPT: lines.'", "how:'Hand the packet to the desktop executor (RAMBO) with the blue RAMBO button at the top; it saves the job file for you.'");
rep('how-codex', "how:'Windows Terminal: codex exec \"<task>\" then paste.'", "how:'Open Windows Terminal, type codex, press Enter, then press Ctrl+V.'");
rep('how-rambo', "how:'Save the packet as JOB-*.md in G:\\\\My Drive\\\\VTES-Inbox.'", "how:'Open the Claude desktop app, click the Code tab, click in the message box and press Ctrl+V.'");
// F15: the typed schedule on repair row 10 keeps its words and gets a visible label
rep('row10', '<td>Burn-rate agent installed, runs 7:00 AM daily</td>', '<td>Burn-rate agent installed, runs 7:00 AM daily <span class="v5typed">(typed note 2026-10-02, Eastern time)</span></td>');
// --- start: top block, first load of the data files, then every 60 seconds ---
rep('init', "$('kind').value=5;choose();\n", "$('kind').value=5;choose();\nVTES5U.renderTop(window.VTES5_BUILT);VTES5U.measureHeader();window.addEventListener('resize',VTES5U.measureHeader);\nfunction v5tick(){window.VTES5.reload(function(){VTES5U.refresh(window.VTES5_BUILT);VTES5U.repaint()})}\nv5tick();setInterval(v5tick,60000);\n");
const PKG = __dirname + '/package';
fs.writeFileSync(PKG + '/VTES-LLM-LAUNCHER_v5.html', h);
console.log('built package/VTES-LLM-LAUNCHER_v5.html ' + h.length + ' bytes, built ' + BUILT);
// vtes5-config.js: shipped with no status folder (the page then does not look for vtes-status.js). No time and no writer name: nothing in it can drift or lack a zone.
fs.writeFileSync(PKG + '/vtes5-config.js', '/* vtes5-config.js - TRK-2026-9910-B. status_dir_url: a folder holding vtes-status.js, read only (empty = the page does not look for it). */\nwindow.VTES5_CONFIG = { "status_dir_url": "" };\n');
// MANIFEST.sha256: one line per package file, "<64 hex>  <path with forward slashes>", sorted. It is the only file not listed in itself. VERIFY-v5.ps1 reads it.
function walk(dir, rel) { let o = []; for (const n of fs.readdirSync(dir).sort()) { const f = dir + '/' + n, r = rel ? rel + '/' + n : n; if (fs.statSync(f).isDirectory()) { o = o.concat(walk(f, r)); } else if (r !== 'MANIFEST.sha256') { o.push(r); } } return o; }
const files = walk(PKG, '');
fs.writeFileSync(PKG + '/MANIFEST.sha256', files.map(r => crypto.createHash('sha256').update(fs.readFileSync(PKG + '/' + r)).digest('hex') + '  ' + r).join('\n') + '\n');
console.log('MANIFEST.sha256: ' + files.length + ' files, manifest SHA-256 ' + crypto.createHash('sha256').update(fs.readFileSync(PKG + '/MANIFEST.sha256')).digest('hex'));
