// build-v5.js - ports the live layer onto Jorge's REAL v3 launcher (never starts from nothing). Node. TRK-2026-9910-B
// Reads ../v3-live/VTES-LLM-LAUNCHER_v3.html, FAILS if its SHA-256 is not the one read from Drive, applies each patch, FAILS LOUDLY if a patch finds nothing.
const fs = require('fs'), crypto = require('crypto');
const SRC = __dirname + '/../v3-live/VTES-LLM-LAUNCHER_v3.html';
const raw = fs.readFileSync(SRC);
const REAL_SHA = '28d3ed5e6b8e5713c079afd349b10a3c4b38993768ca850c91c6f6c333411fe3';
if (crypto.createHash('sha256').update(raw).digest('hex') !== REAL_SHA) { throw new Error('the v3 source is not the real v3 launcher (SHA-256 differs)'); }
let h = raw.toString('utf8');
// fix round 6 (flaw 12): v3 has two CRLF line ends in a file that is otherwise LF. The package must be pure LF so VERIFY can tell "only the line endings changed (CRLF)" from a real edit. Normalised here, the build fails if any CR is left.
h = h.replace(/\r\n/g, '\n'); if (/\r/.test(h)) { throw new Error('a lone CR is left in the v3 text'); }
// the build time is the real instant this script runs, never hand-set (flaw F3); the page also holds it to the BAD CLOCK rule
if (process.env.V5_BUILT) { console.log('NOTE: V5_BUILT is ignored. The build time is always the real build instant.'); }
const BUILT = new Date().toISOString().slice(0, 19) + 'Z';
// fix round 9 (CHECK-10 flaw 4, Tier 2): every patch is named in patch-table-r9.js with its kind and reason; a patch that is not in the table stops the build, and so does a name in the table that no patch uses.
// The list of changed lines in PORT-REPORT.md is NOT written by hand or counted from this table: gen-text-diff-r9.js reads the real v3 page and the v5 page in a browser and diffs the lines a person sees.
const { P: PATCHES, TRANSFORMS } = require('./patch-table-r9.js'); const USED = [];
function use(name) { if (!PATCHES[name]) { throw new Error('PATCH NOT IN patch-table-r9.js: ' + name); } USED.push(name); }
function rep(name, from, to) { use(name); if (!(from instanceof RegExp ? from.test(h) : h.includes(from))) { throw new Error('PATCH MISSED: ' + name); } h = h.replace(from, () => to); }
function repAll(name, from, to, n) { use(name); const c = h.split(from).length - 1; if (c !== n) { throw new Error('PATCH COUNT ' + name + ': expected ' + n + ' found ' + c); } h = h.split(from).join(to); }
// values the page text is built from, read from the one place they are defined (vtes5-ui.js), so no number or sentence is typed twice
const UI_SRC = fs.readFileSync(__dirname + '/package/vtes5-ui.js', 'utf8');
const GUARD_TEXT = (() => { const m = /var GUARD_TEXT = (\[[^\]]*\]);/.exec(UI_SRC); if (!m) { throw new Error('GUARD_TEXT not found in vtes5-ui.js'); } return JSON.parse(m[1].replace(/'/g, '"').replace(/\\"/g, "'")); })();
const MD_COUNT = (UI_SRC.match(/^    \['(?:0[1-9]|1\d|2\d)', '/gm) || []).length; if (MD_COUNT < 1) { throw new Error('the Miami-Dade source list was not found in vtes5-ui.js'); }
// --- head ---
rep('title', '<title>VTES LLM Launcher</title>', '<title>VTES LLM Launcher v5 - TRK-2026-9910-B</title>');
rep('css', '</style></head>', fs.readFileSync(__dirname + '/vtes5.css', 'utf8') + '</style></head>');
const SCRIPTS = ['heartbeat', 'bots', 'state', 'health', 'tokens', 'housekeeping', 'miamidade'].map(n => '<script src="data/vtes5-' + n + '.js"></script>').join('');
rep('scripts', '<body>\n<div class="tabs" id="tabs"></div>', '<body>\n<script>window.VTES5_BUILT = "' + BUILT + '";</script><script src="vtes5-config.js"></script>' + SCRIPTS + '<script src="vtes5-live.js"></script><script src="vtes5-ui.js"></script>\n<div class="tabs" id="tabs"></div>');
// --- top block, slots, 7th section ---
rep('tabhint', '<div class="tabs" id="tabs"></div>\n', '<div class="tabs" id="tabs"></div>\n<div class="v5tabhint" id="v5tabhint"></div>\n');
rep('top', 'autofocus>\n', 'autofocus>\n<div id="v5top"></div>\n');
rep('leadlead', '<p class="lead">Maintained by hand in VTES-LLM-LAUNCHER_v3.html. Repairs and enhancements across Jorge\'s windows.</p>', '<p class="lead">TYPED LOG. Maintained by hand in VTES-LLM-LAUNCHER_v3.html; the last row was typed on 2026-10-02. Nothing in this table is checked by this page. Repairs and enhancements across Jorge\'s windows.</p>');
rep('botslead', '<p class="lead">These run by themselves on the PC. Check any of them with Get-ScheduledTask.</p>\n<div class="grid" id="g-bots">', '<p class="lead">These run by themselves on the PC. The line on each card is read from a data file the PC writes (the Windows scheduler\'s own report); red NO DATA means nothing has written it yet. The desktop executor (RAMBO) checks the tasks on the PC; you type nothing.</p>\n<div id="v5tokens"></div><div id="v5house"></div>\n<div class="grid" id="g-bots">');
rep('repairslive', '</tbody></table>\n</div></div>\n', '</tbody></table>\n</div></div>\n<div id="v5repairs"></div>\n');
rep('sect7', '<p class="sub" style="margin-top:30px">TRK-2026-9910-B v3 2026-10-02 CURRENT.', '<h2 id="miamidade">7. Miami-Dade: ' + MD_COUNT + ' public sources</h2>\n<p class="lead">Added in v5. Every link opens that source\'s proof file in Drive. The count says unknown until the PC counts.</p>\n<div id="v5miami"></div>\n\n<p class="sub" style="margin-top:30px">TRK-2026-9910-B &middot; v5 &middot; built <span id="v5fb"></span> &middot; CURRENT.');
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
rep('win-grok', 'function win(id){', "WIN.push({id:'GROK',n:'GROK',url:'',how:'Paste the packet into grok.com. The desktop executor (RAMBO) can put the question to Grok for you.'});\nfunction win(id){");
// N10: a note that looks like a Social Security number is kept out of every packet except one for LOCAL (the page's own rule: client personal data goes to LOCAL only)
rep('guard', "note=$('note').value.trim()||'(no note typed", "note=window.VTES5U.guardNote($('note').value.trim(),t.id)||'(no note typed");
// --- cards: the live cards replace the static ones (same data, same order) ---
rep('render', "$('g-queued').innerHTML=QUEUED.map(", "VTES5U.renderAll(LLMS,ROLES,BOTS);\n$('g-queued').innerHTML=QUEUED.map(");
// F10: the search matches only the text v3 matched (v3's own card text is kept in data-s by renderAll), never the live state lines
rep('search', "var h=(c.dataset.k+' '+c.textContent).toLowerCase();", "var h=(c.dataset.k+' '+(c.dataset.s!==undefined?c.dataset.s:c.textContent)).toLowerCase();");
// F5: the RAMBO paste button gets its own slot directly under the page title
rep('rambo-slot', '<h1>VTES LLM Launcher</h1>\n', '<h1>VTES LLM Launcher</h1>\n<div class="v5rambo" id="v5rambo"></div>\n');
// F12: Codex CLI is a terminal program on the PC; the card must not open chatgpt.com (and "Copy packet and open" must not either)
rep('url-llm06', "url:'https://chatgpt.com'", "url:''");
// F13: AirDrop does not exist on a Windows PC
rep('airdrop', 'Send the packet with AirDrop or Notes first.', 'Get the packet onto the iPhone first (see the steps on the LLM-05 card in section 2).');
// F14: the line printed after "Copy packet and open" must not hand Jorge a command or a file job either (LOCAL, CODEX, RAMBO)
rep('how-local', "how:'Save the packet as JOB-*.md in G:\\\\My Drive\\\\VTES-Inbox-LOCAL with CLASS: and PROMPT: lines.'", "how:'Do not give this packet to any Claude window. Follow the steps on the LOCAL card. Where a local file may be saved is shown by the LOCAL save step line on the LOCAL card (section 3).'");
// fix round 6, flaw 2: v3 told Jorge to drop client data into a folder inside Google Drive and claimed it never leaves the PC. Both statements are replaced.
rep('local-j', 'and all client personal data. Never leaves the PC.', 'and all client personal data (typed in v3: "Never leaves the PC" - only true once a local-only folder outside Google Drive and OneDrive is confirmed; see the LOCAL save step on this card).');
rep('local-a', "a:'Drop JOB-*.md with CLASS: and PROMPT: into G:\\\\My Drive\\\\VTES-Inbox-LOCAL'", "a:'Where a local file may be saved: see the LOCAL save step line on this card.'");
rep('local-pick', "'PII never leaves the machine.'", "'PII goes to LOCAL only. It stays on the machine only once a local-only folder is confirmed (see the LOCAL card).'");
rep('how-codex', "how:'Windows Terminal: codex exec \"<task>\" then paste.'", "how:'Follow the steps on the CODEX card. You type no command: the desktop executor (RAMBO) runs Codex.'");
rep('how-rambo', "how:'Save the packet as JOB-*.md in G:\\\\My Drive\\\\VTES-Inbox.'", "how:'Open the Claude desktop app, click the Code tab, click in the message box and press Ctrl+V.'");
// F14 (round 5): the LLM-06 card line and the status after "Copy packet and open" must not hand Jorge a typed command either
rep('how-llm06', "how:'Windows Terminal, type codex, Enter, then Ctrl+V. First time: shortcut \"Codex - sign in (Jorge)\".'", "how:'You type no command: the desktop executor runs Codex for you (see the steps on the LLM-06 card in section 2). First time only: the shortcut \"Codex - sign in (Jorge)\".'");
// F15: the typed schedule on repair row 10 keeps its words and gets a visible label
rep('row10', '<td>Burn-rate agent installed, runs 7:00 AM daily</td>', '<td>Burn-rate agent installed, runs 7:00 AM daily <span class="v5typed">(typed note 2026-10-02; the note gives no time zone, so this page cannot say which clock it means)</span></td>');
// --- fix round 7, CLASS 2: the confirmation tick and the honest grey line under the note box ---
rep('gate-line', '<div class="gate">No card numbers, passwords or Social Security numbers in this box. Client personal data goes to LOCAL only.</div>', '<div class="gate">' + GUARD_TEXT.join(' ') + ' Do not type cards, passwords or Social Security numbers here.</div>\n<div class="v5ackrow"><label class="v5ack" for="v5ack"><input type="checkbox" id="v5ack"> This note has NO client personal data (Social Security, bank, card, licence, passport, date of birth, home address)</label><div class="v5ackmsg" id="v5ackmsg" role="status"></div></div>');
rep('refresh-gate', 'function refresh(){$(\'preview\').value=packet()}', 'function refresh(){$(\'preview\').value=(window.VTES5U&&window.VTES5U.allow&&!window.VTES5U.allow($(\'to\').value))?window.VTES5U.reasonFor($(\'to\').value):packet()}');
rep('show-gate', "$('show').onclick=function(){refresh();", "$('show').onclick=function(){if(window.VTES5U&&!window.VTES5U.allow($('to').value)){window.VTES5U.applyGate();$('status').textContent=window.VTES5U.reasonFor($('to').value);return}refresh();");
rep('go-gate', "$('go').onclick=function(){var txt=packet();", "$('go').onclick=function(){if(window.VTES5U&&!window.VTES5U.allow($('to').value)){window.VTES5U.applyGate();$('status').textContent=window.VTES5U.reasonFor($('to').value);return}var txt=packet();");
// fix round 8 (CHECK-9 flaw 2): the queued heading, lead and status line say only what happens
rep('queued-head', '<h2 id="queued">5. Queued items: now one click each</h2>', '<h2 id="queued">5. Queued items: one click fills the note box</h2>');
rep('queued-lead', '<p class="lead">These were grayed out as NOT READY. Each now sends a ready packet to the right lane. Items that need your call say so in the packet and wait for your GO.</p>', '<p class="lead">Each button puts the item in the note box and chooses the right lane. Then tick the box under the note box (not needed for LOCAL) and copy the packet. Items that need your call say so in the packet and wait for your GO.</p>');
rep('queued-status', "$('status').textContent='Packet ready for '+x.to+'. Press Copy packet and open.'", "if(window.VTES5U&&window.VTES5U.queuedStatus){window.VTES5U.queuedStatus()}else{$('status').textContent='The item is in the note box. Check the packet in section 1.'}");
rep('gemini', ' Gemini CLI can run headless on the PC under GEMINI.md.', ' Gemini CLI can run headless on the PC.');
rep('footer-rambo', 'Registry: LLM-WINDOW-REGISTRY_v2.md. Lanes: EXECUTORS-AND-ORCHESTRATOR_2026-10-01.md. #VTES-control-panel #LLM-registry', '<span class="v5forrambo">For RAMBO: registry LLM-WINDOW-REGISTRY_v2.md, lanes EXECUTORS-AND-ORCHESTRATOR_2026-10-01.md.</span> #VTES-control-panel #LLM-registry');
// --- start: top block, first load of the data files, then every 60 seconds ---
rep('init', '</body>', `<script>
/* fix round 7 (CLASS 1): this start-up block is its own script, after v3's script, so nothing in v3's script or in any data-dependent code can stop it. The timers are set FIRST; the top block (RAMBO button, Read me first, Live status) is drawn before any data is read; every step has its own try/catch. */
(function(){
var B=window.VTES5_BUILT,MSG='PAGE NOT REFRESHING - DO NOT TRUST';
function fail(m){try{var t=document.getElementById('v5top');if(t&&!document.getElementById('v5failbox')){t.insertAdjacentHTML('afterbegin','<div class="v5watch" id="v5failbox" role="alert">'+m+' Press F5 to reload the page. If this stays, tell the desktop executor (RAMBO).</div>')}}catch(e){}}
function tick(){try{window.VTES5.reload(function(){window.VTES5U.refresh(B)})}catch(e){try{window.VTES5U.paintFailed(e)}catch(e2){fail(MSG+'.')}}}
setInterval(tick,60000);
setInterval(function(){try{window.VTES5U.watchdog()}catch(e){fail(MSG+'.')}},15000);
try{window.VTES5U.renderFrame(B)}catch(e){fail(MSG+'. The top of this page could not be drawn.')}
try{window.VTES5U.measureHeader();window.addEventListener('resize',window.VTES5U.measureHeader)}catch(e){}
try{window.VTES5U.firstPaint(B)}catch(e){try{window.VTES5U.paintFailed(e)}catch(e2){fail(MSG+'.')}}
tick();
})();
</script>
</body>`);
// fix round 7 (flaw 25): every pixel font size in the page's style blocks becomes rem, so the browser's own text-size setting works (16 px = 1 rem: nothing changes at the default size)
h = h.replace(/<style[^>]*>[\s\S]*?<\/style>/g, st => st.replace(/(font-size:|font:(?:\d{3} )?)(\d+(?:\.\d+)?)px/g, (m, a, n) => a + (+n / 16) + 'rem'));
const unusedPatches = Object.keys(PATCHES).filter(n => !USED.includes(n)); if (unusedPatches.length) { throw new Error('patch-table-r9.js names with no patch: ' + unusedPatches.join(', ')); }
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

// PORT-REPORT.md: Section F is GENERATED by gen-text-diff-r9.js (it diffs the lines a person sees on the real v3 page and on this page, in a browser). The build stops if it cannot.
{
  const r = require('child_process').spawnSync('node', [__dirname + '/gen-text-diff-r9.js'], { encoding: 'utf8', timeout: 600000 });
  process.stdout.write(r.stdout || ''); if (r.status !== 0) { throw new Error('gen-text-diff-r9.js failed: ' + (r.stderr || '').slice(-500)); }
}
