// test-claims-r8.js - fix round 8, CLASS "words that claim more than the page or the script does", Tier 3 (ENFORCE). TRK-2026-9910-B
// Charter Rule 4: a recurring class gets an enforcement, not a patch. This test EXTRACTS every checkable factual sentence from
//   the Read me on the page, the queued-item headings and status lines, the card sentences, VERIFY-v5.ps1 (header comments and printed messages), INSTALL-BY-HAND.md, DATA-CONTRACT.md and KNOWN-LIMITS.md,
// maps each one to a test that proves it on REAL BEHAVIOUR (exit codes, whether a button is enabled, which words VERIFY prints, ASCII, whether a git command writes anything),
// and FAILS when (a) a checkable sentence has no test, (b) a test fails, or (c) a test no longer matches any sentence (a stale test would hide a missing one).
// A claim marked "retired" is a sentence that was once false and was removed: it may stay in the list so that it cannot come back (if the sentence returns, its test must pass).
// Usage: PWSH_DIR=<dir with pwsh> node test-claims-r8.js <out.json> [--no-docs]     (env V5DIR = the tree to test, default this folder; the tree holds package/, VERIFY-v5.ps1 and the documents)
const fs = require('fs'), path = require('path'), os = require('os'), cp = require('child_process');
const ROOT = path.resolve(process.env.V5DIR || __dirname);
process.env.PKG = process.env.PKG || path.join(ROOT, 'package');
const L = require('./test-v5-lib.js'); const { stage, open, fresh, NOWMS, at } = L;
const OUT = process.argv[2] || 'test-claims-r8-RESULT.json'; const COVER_DOCS = !process.argv.includes('--no-docs');
const PWD_DIR = process.env.PWSH_DIR; const PW = PWD_DIR ? path.join(PWD_DIR, 'pwsh') : null; const VER = path.join(ROOT, 'VERIFY-v5.ps1');
const rd = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const HOME = fs.mkdtempSync(path.join(os.tmpdir(), 'cl8home-'));
const ENV = Object.assign({}, process.env, { HOME, USERPROFILE: HOME, DOTNET_CLI_HOME: HOME, POWERSHELL_TELEMETRY_OPTOUT: '1', POWERSHELL_UPDATECHECK: 'Off', DOTNET_CLI_TELEMETRY_OPTOUT: '1', DOTNET_NOLOGO: '1' });
/* ---------- sentence extraction ---------- */
function split(t) { return t.replace(/\r/g, '').split(/\n+|(?<=[.!?])\s+(?=[A-Z0-9("'`<*])/).map(s => s.replace(/\s+/g, ' ').trim()).filter(s => s.length > 8); }
const plain = s => s.replace(/[`*]/g, '');
function mdSentences(f) { const out = []; rd(f).split('\n').forEach((line, i) => { if (/^\s*(#|```|<!--|\|?\s*-{3})/.test(line)) { return; } split(line.replace(/^\s*(?:[-*]|\d+\.|[a-z]\))\s+/, '')).forEach(s => out.push({ raw: s, s: plain(s), where: f + ':' + (i + 1) })); }); return out; }
function verifySentences() {
  const out = [], lines = rd('VERIFY-v5.ps1').split('\n'); let inHead = true, head = [];
  lines.forEach((line, i) => {
    if (inHead && /^param\(/.test(line)) { inHead = false; }
    if (inHead && /^#/.test(line)) { head.push(line.replace(/^#\s*/, '').replace(/^\s*-\s+/, '- ')); }
    else if (/Write-Host|Say \(|\.Add\(|Stop-Early|return \(/.test(line)) { (line.match(/'(?:[^']|'')*'/g) || []).forEach(q => { const s = q.slice(1, -1).replace(/''/g, "'"); if (s.length > 25 && /[a-z]{3} [a-z]{3}/.test(s)) { split(s).forEach(x => out.push({ raw: x, s: x, where: 'VERIFY-v5.ps1:' + (i + 1) + ' (message)' })); } }); }
  });
  head.join(' ').replace(/\s+/g, ' ').split(/(?<=[.!?])\s+(?=[A-Z(\-])|(?<=\.)\s+(?=\(\w+\) )/).map(s => s.trim()).filter(s => s.length > 8).forEach((s, i) => out.push({ raw: s, s: plain(s), where: 'VERIFY-v5.ps1 header, sentence ' + (i + 1) }));
  return out;
}
/* a sentence is CHECKABLE (it states a fact that behaviour can prove or disprove) when it holds one of these signals. Instructions to the executor ("Open the parent folder") hold none. */
const TRIGGER = /exit(?:s|ed)?(?: with)?(?: code)?s? \d|exit codes?|identical|ASCII|UTF-?16|UTF-?8|\bOK\b|PROBLEMS|CANNOT CHECK|writes? nothing|no write|only reads|read[- ]only|not followed|only updates|still here|no longer|one click|\bready\b|switched off|catch(?:es)?\b|can still miss|\d[\d,]* of \d[\d,]*|\d+ (?:scenarios|files|tests|lines|tabs|cards|bots|checks)|changes? no\b|BAD DATA FILE|EDITED|overwrit|Pure ASCII|never leaves/i;
/* ---------- the claim registry ---------- */
const CLAIMS = []; const claim = (id, src, re, test, o) => CLAIMS.push(Object.assign({ id, src, re, test }, o || {}));
const SRC = {}; /* name -> [{s, raw, where}] */
const cache = {};
const memo = (k, fn) => (k in cache ? cache[k] : (cache[k] = fn()));
/* ---------- behaviour helpers ---------- */
const sh = (cmd, args, o) => { const r = cp.spawnSync(cmd, args, Object.assign({ encoding: 'utf8', env: ENV, timeout: 120000, maxBuffer: 1 << 26 }, o || {})); return { code: r.status, out: (r.stdout || '') + (r.stderr || '') }; };
const needPw = () => { if (!PW || !fs.existsSync(PW)) { throw new Error('PWSH_DIR is not set or has no pwsh: the VERIFY claims cannot be proved'); } };
function copyDir(a, b) { fs.mkdirSync(b, { recursive: true }); for (const n of fs.readdirSync(a)) { const x = path.join(a, n), y = path.join(b, n); if (fs.statSync(x).isDirectory()) { copyDir(x, y); } else { fs.copyFileSync(x, y); } } }
function fixture() { const base = fs.mkdtempSync(path.join(os.tmpdir(), 'cl8fx-')); fs.mkdirSync(path.join(base, 'Docs')); const N = path.join(base, 'Docs', 'v5'); copyDir(process.env.PKG, N); return { base, N }; }
function verify(N, args, o) { needPw(); return sh(PW, ['-NoProfile', '-File', VER, '-Path', N].concat(args || []), o); }
function verifyRaw(args, o) { needPw(); return sh(PW, ['-NoProfile', '-File', VER].concat(args), o); }
const sha = f => require('crypto').createHash('sha256').update(fs.readFileSync(f)).digest('hex');
function tree(dir) { const o = []; (function w(d) { for (const n of fs.readdirSync(d).sort()) { const f = path.join(d, n), s = fs.lstatSync(f); if (s.isDirectory()) { o.push('D ' + f); w(f); } else if (s.isSymbolicLink()) { o.push('L ' + f + ' ' + fs.readlinkSync(f)); } else if (s.isFile()) { o.push('F ' + f + ' ' + sha(f)); } else { o.push('O ' + f); } } })(dir); return o.join('\n'); }
const utf16 = s => Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from(s, 'utf16le')]);
let browser = null; const getBrowser = async () => browser || (browser = await L.chromium.launch());
async function pageWith(files, o) { const d = stage(files, o); const r = await open(await getBrowser(), d, o); r.dir = d; return r; }
const EV = (p, fn, a) => p.evaluate(fn, a);
const spawnNode = (f, args) => sh('node', [path.join(__dirname, f)].concat(args || []), { cwd: __dirname });
const stateText = () => memo('state', () => { const out = path.join(os.tmpdir(), 'cl8-state-' + process.pid + '.json'); const r = spawnNode('test-state-text-r8.js', [out]); try { return Object.assign(JSON.parse(fs.readFileSync(out, 'utf8')), { log: r.out }); } catch (e) { return { error: 'state-text test did not finish: ' + r.out.slice(-300), groups: {} }; } });
const grp = (g, name) => { const s = stateText(), x = s.groups && s.groups[name]; return x ? [x.ok === x.n, name + ': ' + x.ok + ' of ' + x.n + (x.ok === x.n ? '' : ' - see test-state-text-r8 for the failing rows')] : [false, name + ' did not run (' + (s.error || 'no group') + ')']; };
/* ---------- the text-change list (flaw 3) ---------- */
const TEXT_PATCHES = ['title', 'leadlead', 'botslead', 'sect7', 'tabs-render', 'panel-btn', 'index-btn', 'url-llm02', 'url-llm06', 't-llm01', 't-chief', 't-localexec', 't-orch', 't-prop', 't-poller', 't-queued', 't-rambo', 't-codex', 'd9', 'stamp', 'airdrop', 'how-local', 'local-j', 'local-a', 'local-pick', 'how-codex', 'how-rambo', 'how-llm06', 'row10', 'gate-line', 'gemini', 'footer-rambo', 'queued-head', 'queued-lead'];
const builtPatches = () => (rd('build-v5.js').match(/\brep(?:All)?\('([a-z0-9-]+)'/g) || []).map(x => x.replace(/^rep(?:All)?\('/, '').replace(/'$/, ''));

/* =====================================================================================================
   PAGE CLAIMS: the Read me, the queued items, the cards
   ===================================================================================================== */
const READ_RE = i => new RegExp(i, 'i');
const BASE = () => memo('basepage', () => null);
// ---- Read me 1 (flaw 3): "Everything from v3 is still here ..."
claim('R1', 'readme', /still here/i, async (s) => {
  const ev = []; const built = builtPatches(), missing = TEXT_PATCHES.filter(n => !built.includes(n)); const truthN = TEXT_PATCHES.length - missing.length;
  const m = /(\d+) (?:lines|places|pieces) of text/.exec(s), exceptOne = /except one/i.test(s);
  if (exceptOne) { return [false, 'the sentence says only one thing from v3 was changed, but ' + truthN + ' places of v3 text were changed, added to or removed by the build (' + built.filter(n => TEXT_PATCHES.includes(n)).slice(0, 8).join(', ') + ' ...)']; }
  if (!m) { return [false, 'the sentence names no number of changed lines and does not say "except one"; it must say how many (generated from the change list)']; }
  const N = +m[1]; ev.push('page says ' + N + ', build patches counted ' + truthN);
  if (N !== truthN) { return [false, ev.join('; ') + ' - the numbers differ']; }
  const rep = rd('PORT-REPORT.md'), blk = /<!-- CHANGE-LIST-BEGIN -->([\s\S]*?)<!-- CHANGE-LIST-END -->/.exec(rep);
  if (!blk) { return [false, 'PORT-REPORT.md has no CHANGE-LIST block']; }
  const lines = blk[1].split('\n').filter(l => /^\d+\. /.test(l)).length; ev.push('PORT-REPORT.md lists ' + lines);
  if (lines !== N) { return [false, ev.join('; ') + ' - the list has a different number of lines']; }
  const r = spawnNode('test-v3-survives.js', [path.join(os.tmpdir(), 'cl8-surv.json')]); const jj = JSON.parse(fs.readFileSync(path.join(os.tmpdir(), 'cl8-surv.json'), 'utf8')), j = Array.isArray(jj) ? jj : (jj.results || jj.rows || []); const fail = j.filter(x => x.status !== 'PASS').length;
  ev.push('v3 survival test: ' + (j.length - fail) + ' of ' + j.length + ' checks pass');
  return [fail === 0, ev.join('; ')];
}, { perItem: true });
claim('R2', 'readme', /NO DATA means nothing on the PC has reported/i, async () => {
  const bad = []; let n = 0; for (const files of [null, fresh(NOWMS)]) { const { ctx, p } = await pageWith(files); const r = await EV(p, () => [...document.querySelectorAll('.v5st,.v5b')].filter(e => /^NO DATA/.test(e.textContent.trim())).map(e => e.className)); n += r.length; r.forEach(c => { if (!/\bbad\b/.test(c)) { bad.push(c); } }); await ctx.close(); }
  return [n > 0 && bad.length === 0, n + ' NO DATA marks, ' + bad.length + ' not red'];
}, { perItem: true });
claim('R3', 'readme', /Green appears only when a fresh report file with proof/i, async () => {
  const { ctx, p } = await pageWith(null); const g = await EV(p, () => [...document.querySelectorAll('.v5st.ok,.v5b.ok')].length); await ctx.close();
  const f = fresh(NOWMS); f.heartbeat.at = at(300); f.bots.at = at(300); f.tokens.at = at(600); f.miamidade.at = at(60 * 24 * 9); const w = await pageWith(f);
  const strip = await EV(w.p, () => [...document.querySelectorAll('.v5b[data-src]')].filter(e => e.closest('#v5dash')).map(e => ({ n: e.getAttribute('data-src'), c: e.className }))); await w.ctx.close();
  const staleNames = ['heartbeat', 'bots', 'tokens', 'miamidade'], wrong = strip.filter(x => staleNames.includes(x.n) && /\bok\b/.test(x.c)).map(x => x.n);
  const w2 = await pageWith(fresh(NOWMS)); const g3 = await EV(w2.p, () => [...document.querySelectorAll('.v5st.ok')].length); await w2.ctx.close();
  return [g === 0 && strip.length === 7 && wrong.length === 0 && g3 > 0, 'no data: ' + g + ' green marks; stale world: ' + wrong.length + ' of 4 stale reports shown green (' + strip.length + ' strip entries read); fresh world: ' + g3 + ' green cards'];
}, { perItem: true });
claim('R3b', 'readme', /Grey NOT PROVEN means only the simple status writer/i, async () => {
  const f = fresh(NOWMS); delete f.heartbeat.executors['LLM-01']; const w = await pageWith(f, { status: { 'LLM-01': { st: 'up', seen: at(1) } } }); await L.tick(w.p);
  const r = await EV(w.p, () => { const e = document.querySelector('.v5st[data-state="LLM-01"]'); return e ? { c: e.className, t: e.textContent } : null; }); await w.ctx.close();
  return [!!r && /\bunp\b/.test(r.c) && /NOT PROVEN/.test(r.t) && /checks nothing/i.test(r.t), r ? r.c + ' | ' + r.t.slice(0, 140) : 'no card'];
}, { perItem: true });
claim('R4', 'readme', /press the big blue RAMBO button directly under the page title/i, async (s) => {
  const { ctx, p } = await pageWith(fresh(NOWMS)); const r = await EV(p, () => { const h = document.querySelector('h1'), b = document.getElementById('v5rambobtn'); return { next: h && h.nextElementSibling && h.nextElementSibling.id, inside: !!(b && h.nextElementSibling && h.nextElementSibling.contains(b)), disabled: b && b.disabled, cls: b && b.className }; }); await ctx.close();
  const tickWord = /tick/i.test(s); const st = grp(null, 'S7 press X names an enabled button');
  return [r.next === 'v5rambo' && r.inside && !r.disabled && st[0], 'button under the title: ' + JSON.stringify(r) + '; ' + st[1] + (tickWord ? '' : ' (the sentence does not mention the tick, so it is true only while the note is empty)')];
}, { perItem: true });
claim('R5', 'readme', /A web page cannot open a desktop app/i, async () => {
  const a = grp(null, 'S1 one click needs a link'), b = grp(null, 'S3 never both'), c = grp(null, 'S2 no Open button needs no link');
  return [a[0] && b[0] && c[0], [a[1], b[1], c[1]].join('; ')];
}, { perItem: true });
claim('R6', 'readme', /Tabs marked OLD PANEL go to a snapshot/i, async () => {
  const { ctx, p } = await pageWith(null); const r = await EV(p, () => [...document.querySelectorAll('#tabs a.panel')].map(a => ({ h: a.getAttribute('href'), t: a.textContent }))); await ctx.close();
  const ok = r.length === 10 && r.every(x => /VTES-CONTROL-PANEL\.html#/.test(x.h) && /OLD PANEL/.test(x.t)); return [ok, r.length + ' old-panel tabs, each labelled OLD PANEL and pointing at the snapshot file'];
}, { perItem: true });
const tickBehaviour = () => memo('tick', () => (async () => { const { ctx, p } = await pageWith(fresh(NOWMS)); const rs = await EV(p, async () => {
  const $ = i => document.getElementById(i), out = {}; window.open = () => null; const settle = async () => { for (let i = 0; i < 6; i++) { await Promise.resolve(); } };
  $('to').value = 'LLM-07'; $('to').dispatchEvent(new Event('change', { bubbles: true })); $('note').value = 'Check the permit'; $('note').dispatchEvent(new Event('input')); await settle();
  out.offWhenUnticked = $('go').disabled && $('show').disabled; const c = $('v5ack'); c.checked = true; c.dispatchEvent(new Event('change', { bubbles: true })); await settle(); out.onWhenTicked = !$('go').disabled && !$('show').disabled;
  $('note').value = 'Check the permit now'; $('note').dispatchEvent(new Event('input')); await settle(); out.resetOnNote = !c.checked && $('go').disabled; c.checked = true; c.dispatchEvent(new Event('change', { bubbles: true })); await settle();
  $('to').value = 'LLM-08'; $('to').dispatchEvent(new Event('change', { bubbles: true })); await settle(); out.resetOnRoute = !c.checked && $('go').disabled;
  $('to').value = 'LOCAL'; $('to').dispatchEvent(new Event('change', { bubbles: true })); await settle(); out.localNeedsNoTick = !$('go').disabled;
  return out; }); await ctx.close(); return rs; })());
claim('R7a', ['readme', 'limits'], /you must tick the box|Until it is ticked/i, async () => { const r = await tickBehaviour(); return [r.offWhenUnticked && r.onWhenTicked, 'buttons off when unticked: ' + r.offWhenUnticked + ', on when ticked: ' + r.onWhenTicked]; });
claim('R7b', 'readme', /tick clears itself/i, async () => { const r = await tickBehaviour(); return [r.resetOnNote && r.resetOnRoute, 'tick cleared on a note change: ' + r.resetOnNote + ', on a To change: ' + r.resetOnRoute]; });
claim('R7c', 'readme', /goes to LOCAL only/i, async () => { const r = await tickBehaviour(); return [r.localNeedsNoTick, 'LOCAL needs no tick (buttons enabled): ' + r.localNeedsNoTick + ' (that LOCAL needs a confirmed folder is a separate, live line on the LOCAL card)']; });
// ---- Read me, the guard (flaw 1)
const NOTES = () => require('./pii-notes-r8.js');
const guardCaught = async (samples) => { const { ctx, p } = await pageWith(fresh(NOWMS)); const r = await EV(p, s => s.map(x => [x, window.VTES5U.piiReasons(x).length > 0]), samples); await ctx.close(); return r; };
const CAP = [
  { re: /nine digits|9 digits|Social Security|many layouts/i, name: 'nine digits', sam: () => NOTES().PERSONAL.filter(t => /^[^a-z]*\d/i.test(t) || /ssn|social|s\.s\.n/i.test(t)).slice(0, 30) },
  { re: /card numbers?/i, name: 'card numbers', sam: () => ['4111 1111 1111 1111', '4111-1111-1111-1111', '4111111111111111', '378282246310005', '5555 5555 5555 4444', '6011000990139424', '4111, 1111, 1111, 1111'] },
  { re: /spelled out in words|written in words|in words/i, name: 'spelled-out words', sam: () => ['one two three four five six seven eight nine', 'one twenty three, forty five, sixty seven eighty nine', 'uno dos tres cuatro cinco seis siete ocho nueve', 'ssn 123 apples 45 pears 6789', 'ssn is 123 and then 45 and also 6789'] },
  { re: /commas/i, name: 'split with commas', sam: () => ['SSN 123, 45, 6789', 'his number is 123, 45, 6789', '4111, 1111, 1111, 1111'] },
  { re: /base64|hex/i, name: 'base64 or hex', sam: () => ['MTIzNDU2Nzg5', '313233343536373839', '31 32 33 34 35 36 37 38 39', '0x31 0x32 0x33 0x34 0x35 0x36 0x37 0x38 0x39', 'ssn hex 3132333435363738393031 ok'] },
  { re: /date[- ]of[- ]birth/i, name: 'date of birth', sam: () => ['born March 3, 1949', 'DOB: January second nineteen seventy', 'date of birth: March third, nineteen eighty one', 'DOB 01 02 1970', 'born on the 2nd of January 1970'] },
  { re: /licen[cs]e/i, name: 'licence', sam: () => ['FL DL S530 4607 5123 0', 'FL license: S530 460 75 123 0', 'dl s530460751230', 'driver licence V123-456-78-901-0'] },
  { re: /passport/i, name: 'passport', sam: () => ['passport A12345678', 'passport a12345678', 'pasaporte c03005988'] },
  { re: /bank/i, name: 'bank', sam: () => ['bank account 1234567890', 'IBAN GB82 WEST 1234 5698 7654 32', 'acct no 0012345678 routing 021000021'] }
];
const MISS_KEYS = { 'other languages': /other languages|languages other than/i, 'other scripts': /other scripts|scripts/i, 'letters between the digits': /letters/i, 'more than four words between the digit groups': /four words|more than four/i, 'encodings split into pieces': /split|pieces/i };
const BASIC_KEYS = [[/names/i, 'names'], [/home addresses?|addresses/i, 'home addresses'], [/email/i, 'email addresses'], [/phone/i, 'phone numbers']];
claim('R8', 'readme', /DIGITS in your note/i, async (s) => {
  const ev = []; let ok = true; const cut = s.search(/cannot catch|can not catch|can still miss|does not catch|will miss|may miss/i); const pos = cut < 0 ? s : s.slice(0, cut), neg = cut < 0 ? '' : s.slice(cut);
  if (cut < 0) { ok = false; ev.push('the sentence has no "can still miss" part: it promises without a limit'); }
  for (const c of CAP) { if (c.re.test(pos)) { const r = await guardCaught(c.sam()); const miss = r.filter(x => !x[1]).map(x => x[0]); ev.push(c.name + ': ' + (r.length - miss.length) + ' of ' + r.length + ' samples caught'); if (miss.length) { ok = false; ev.push('  the sentence says it catches ' + c.name + ' but it MISSES: ' + miss.slice(0, 3).map(x => JSON.stringify(x)).join(', ')); } } }
  const mr = await guardCaught(NOTES().MISSES.map(m => m.t)); const missed = NOTES().MISSES.filter((m, i) => !mr[i][1]); const cats = [...new Set(missed.map(m => m.cat))];
  ev.push('spellings the guard still misses: ' + missed.length + ' of ' + mr.length + ' known samples, in ' + cats.length + ' categories');
  cats.forEach(cat => { if (!MISS_KEYS[cat].test(neg)) { ok = false; ev.push('  the sentence does not name the category "' + cat + '" that the guard misses'); } });
  BASIC_KEYS.forEach(([re, nm]) => { if (!re.test(neg)) { ok = false; ev.push('  the sentence does not say it cannot catch ' + nm); } });
  return [ok, ev.join('; ')];
}, { perItem: true });
claim('R8b', 'readme', /tick[^.]*(?:real|only|main) (?:protection|check|guard)|real protection|Only the tick box/i, async () => {
  const N = NOTES(), notes = N.PERSONAL.concat(N.MISSES.map(m => m.t), N.ORDINARY); const { ctx, p } = await pageWith(fresh(NOWMS));
  const r = await EV(p, async notes => { const $ = i => document.getElementById(i); let n = 0, off = 0; window.open = () => null; const st = async () => { for (let i = 0; i < 6; i++) { await Promise.resolve(); } };
    for (const to of ['LLM-01', 'LLM-03', 'LLM-07', 'RAMBO', 'COWORK']) { for (const note of notes) { $('to').value = to; $('to').dispatchEvent(new Event('change', { bubbles: true })); $('note').value = note; $('note').dispatchEvent(new Event('input')); const c = $('v5ack'); c.checked = false; c.dispatchEvent(new Event('change', { bubbles: true })); await st(); n++; if ($('go').disabled && $('show').disabled && $('v5rambobtn').disabled) { off++; } } } return { n, off }; }, notes); await ctx.close();
  return [r.n === r.off, r.off + ' of ' + r.n + ' (note x route) cases had every copy and show button switched off while the box was not ticked'];
}, { optional: true, perItem: true });
claim('R9', 'readme', /WHOLE PAGE/i, async () => {
  const worlds = [null, fresh(NOWMS), (() => { const f = fresh(NOWMS); f.bots.bots['CU-Orchestrator'].state = 'Disabled'; return f; })(), (() => { const f = fresh(NOWMS); f.heartbeat.at = at(300); return f; })(), (() => { const f = fresh(NOWMS); f.tokens.programs = { name: 'x' }; return f; })(), (() => { const f = fresh(NOWMS); f.health.checks_passed = 20; return f; })()];
  let n = 0, bad = 0; for (const w of worlds) { const { ctx, p } = await pageWith(w); const r = await EV(p, () => { const rank = { ok: 0, na: 1, neu: 1, unp: 1, bad: 2, stk: 2 }, it = window.VTES5U.pageItems().map(i => rank[i.cls] || 0), o = document.getElementById('v5overall'), oc = (o.className.match(/\b(ok|na|neu|unp|bad|stk)\b/) || [, 'ok'])[1]; return { worst: Math.max.apply(null, it.concat([0])), over: rank[oc] }; }); n++; if (r.over < r.worst) { bad++; } await ctx.close(); }
  return [bad === 0, n + ' worlds, WHOLE PAGE never greener than the worst card: ' + (n - bad) + ' of ' + n];
}, { perItem: true });
claim('R10', 'readme', /typed note were typed by hand on the date shown/i, async () => {
  const { ctx, p } = await pageWith(fresh(NOWMS)); const r = await EV(p, () => { const o = [], w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); while (w.nextNode()) { const t = w.currentNode.textContent; if (/typed note/i.test(t) && !w.currentNode.parentElement.closest('#v5read,script,style')) { o.push(t.trim()); } } return o; }); await ctx.close();
  const bad = r.filter(t => !/\d{4}-\d{2}-\d{2}/.test(t)); return [r.length > 0 && bad.length === 0, r.length + ' typed notes, ' + bad.length + ' without a date' + (bad.length ? ': ' + bad[0].slice(0, 80) : '')];
}, { perItem: true });
claim('R11', 'readme', /Every time is Eastern time/i, async () => {
  const { ctx, p } = await pageWith(fresh(NOWMS)); const r = await EV(p, () => ['2026-07-04T15:00:00-04:00', '2026-01-10T15:00:00-05:00', '2025-07-04T15:00:00-04:00', '2027-01-10T15:00:00-05:00'].map(i => window.VTES5.fmtIso(i))); await ctx.close();
  const ok = /EDT/.test(r[0]) && /EST/.test(r[1]) && !/2026/.test(r[0]) && /2025/.test(r[2]) && /2027/.test(r[3]); return [ok, r.join(' | ')];
}, { perItem: true });
// ---- queued items (flaw 2) and the cards (flaw 4)
claim('Q-head', 'queued', /one click each/i, async () => { const q = grp(null, 'Q1 queued status matches the button'); return [false, 'one click does not leave a usable packet on every item: the item needs the tick first for every route except LOCAL (' + q[1] + ')']; }, { retired: true });
claim('Q-lead', 'queued', /sends a ready packet/i, async () => { const { ctx, p } = await pageWith(fresh(NOWMS)); let req = 0; p.on('request', r => { if (!/^file:/.test(r.url())) { req++; } }); await EV(p, () => { window.open = () => null; document.querySelector('[data-q]').click(); }); await p.waitForTimeout(300); await ctx.close(); return [false, 'the page sent ' + req + ' requests when the queued button was pressed: it fills the packet box and never sends anything']; }, { retired: true });
claim('Q-gray', 'queued', /grayed out as NOT READY/i, async () => [false, 'a statement about an older page (v2) that no test on this page can prove: the real v3 file holds the words NOT READY only in this one sentence'], { retired: true });
claim('Q-gate', 'queued', /need your call say so in the packet/i, async () => {
  const { ctx, p } = await pageWith(fresh(NOWMS)); const q = await EV(p, () => window.QUEUED.map(x => ({ n: x.n, gate: x.gate, p: x.p }))); await ctx.close();
  const need = q.filter(x => /needs your|gated|approval/i.test(x.gate)), bad = need.filter(x => !/\bGO\b|approv|explicit yes/i.test(x.p)); return [need.length > 0 && bad.length === 0, need.length + ' queued items need your call; ' + bad.length + ' of them do not say so in the packet'];
});
claim('Q-fill', 'queued', /puts the item in the note box|one click fills the note box/i, async () => {
  const { ctx, p } = await pageWith(fresh(NOWMS)); const r = await EV(p, async () => { window.open = () => null; const out = []; const n = document.querySelectorAll('[data-q]').length; for (let i = 0; i < n; i++) { document.querySelectorAll('[data-q]')[i].click(); out.push({ note: document.getElementById('note').value === window.QUEUED[i].p, to: document.getElementById('to').value }); } return out; }); await ctx.close();
  return [r.length === 6 && r.every(x => x.note), r.filter(x => x.note).length + ' of ' + r.length + ' queued buttons put the item text into the note box'];
}, { optional: true });
claim('Q-tick', 'queued', /tick the box under the note box \(not needed for LOCAL\)/i, async () => {
  const { ctx, p } = await pageWith(fresh(NOWMS)); const n = await EV(p, () => { window.open = () => null; return document.querySelectorAll('[data-q]').length; }), r = [];
  for (let i = 0; i < n; i++) {
    await EV(p, () => { const c = document.getElementById('v5ack'); c.checked = false; c.dispatchEvent(new Event('change', { bubbles: true })); }); await p.clock.runFor(1200);
    await EV(p, i => document.querySelectorAll('[data-q]')[i].click(), i); await p.clock.runFor(1200);
    const a = await EV(p, () => ({ to: document.getElementById('to').value, off: document.getElementById('go').disabled }));
    await EV(p, () => { const c = document.getElementById('v5ack'); c.checked = true; c.dispatchEvent(new Event('change', { bubbles: true })); }); await p.clock.runFor(1200);
    const b = await EV(p, () => !document.getElementById('go').disabled); r.push({ to: a.to, offBefore: a.off, onAfter: b });
  }
  await ctx.close(); const bad = r.filter(x => x.offBefore !== (x.to !== 'LOCAL') || !x.onAfter); return [r.length === 6 && bad.length === 0, r.length + ' queued items: the copy button is off until the tick unless the lane is LOCAL, and on after the tick: ' + (r.length - bad.length) + ' of ' + r.length];
});
claim('Q-status', 'queued-status', /Packet ready|Press Copy packet and open|Packet written|Tick the box|item is in the note box|packet is not made yet/i, async () => { const a = grp(null, 'Q1 queued status matches the button'), b = grp(null, 'Q3 when the button is enabled the status says ready'); return [a[0] && b[0], a[1] + '; ' + b[1]]; });
claim('C-oneclick', 'card', /one click|no Open button/i, async () => { const a = grp(null, 'S1 one click needs a link'), b = grp(null, 'S2 no Open button needs no link'), c = grp(null, 'S3 never both'), d = grp(null, 'S4 phone card'); return [a[0] && b[0] && c[0] && d[0], [a[1], b[1], c[1], d[1]].join('; ')]; });
claim('C-press', 'card', /press (?:the )?(?:big )?(?:blue|copy packet)/i, async () => { const a = grp(null, 'S7 press X names an enabled button'), b = grp(null, 'S5 status says ready'); return [a[0], a[1]]; });

/* =====================================================================================================
   VERIFY AND DOCUMENT CLAIMS (flaws 5 to 11)
   ===================================================================================================== */
// flaw 7: the words INSTALL-BY-HAND.md quotes for a UTF-16 data file are the words VERIFY really prints
claim('V-utf16', 'install', /UTF-16/i, async (s, ent) => {
  const quotes = (ent.raw.match(/`[^`]+`/g) || []).map(q => q.slice(1, -1)).filter(q => /UTF-16|BAD DATA FILE|EDITED/.test(q)); if (!quotes.length) { return [true, 'no quoted VERIFY words in this sentence']; }
  const ev = []; let ok = true; const fx = fixture(); const f = path.join(fx.N, 'data', 'vtes5-bots.js'); fs.writeFileSync(f, utf16(fs.readFileSync(f, 'utf8')));
  const day = verify(fx.N, []).out, aft = verify(fx.N, ['-AfterWriters']).out;
  quotes.forEach(q => { const after = /^BAD DATA FILE/.test(q) && /AfterWriters/.test(s); const out = after ? aft : day; const frags = q.split(/\s*\.\.\.\s*/).map(x => x.trim()).filter(x => x.length > 2); const miss = frags.filter(x => out.indexOf(x) < 0); if (miss.length) { ok = false; } ev.push('"' + q + '" (' + (after ? 'with -AfterWriters' : 'day one') + '): ' + (miss.length ? 'VERIFY does not print ' + miss.map(x => '"' + x + '"').join(', ') : 'printed word for word')); });
  return [ok, ev.join('; ')];
}, { perItem: true });
// flaw 8: no document may say VERIFY answers OK for a changed data file on day one
claim('V-okchanged', 'install', /VERIFY now says OK when only|says OK when only the eight/i, async () => {
  const fx = fixture(); const f = path.join(fx.N, 'data', 'vtes5-state.js'); fs.writeFileSync(f, 'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = {"schema":1};\n'); const r = verify(fx.N, []); return [/^OK/m.test(r.out) && r.code === 0, 'a changed, valid data file on day one gives exit ' + r.code + (/^PROBLEMS/m.test(r.out) ? ' and PROBLEMS' : '') + ', not OK'];
}, { retired: true });
// flaw 9: "Pure ASCII"
claim('V-ascii', 'contract', /Pure ASCII/i, async () => {
  const fx = fixture(); const f = path.join(fx.N, 'data', 'vtes5-state.js'); fs.writeFileSync(f, Buffer.from('window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = {"schema":1,"x":"café"};\n', 'utf8')); const r = verify(fx.N, ['-AfterWriters']);
  const fx2 = fixture(); const f2 = path.join(fx2.N, 'data', 'vtes5-state.js'); fs.writeFileSync(f2, 'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = {"schema":1,"x":"caf\\u00e9"};\n'); const r2 = verify(fx2.N, ['-AfterWriters']);
  return [r.code === 1 && /PROBLEMS/.test(r.out) && r2.code === 0, 'a UTF-8 accent under -AfterWriters: exit ' + r.code + ' (' + (/PROBLEMS/.test(r.out) ? 'PROBLEMS' : 'not refused') + '); the same text written as \\u00e9: exit ' + r2.code];
});
/* =====================================================================================================
   DOCUMENT CLAIMS: VERIFY's header and messages, INSTALL-BY-HAND.md, DATA-CONTRACT.md, KNOWN-LIMITS.md
   A sentence is EXEMPT only for a stated reason: it is an instruction to the executor, a question, history of an earlier round, or a sentence that itself says UNVERIFIED / not run / cannot.
   ===================================================================================================== */
function EXEMPT(s) {
  if (/\?$/.test(s)) { return 'question'; }
  if (/^(?:PC check|Do not|Do NOT|Never|Run |Open |Paste |Report |Put |Click|Save |Read |Write |Check |Turn |Create |Use |Make |If |Keep |Follow |Stop |Then |First |Name |Before |Take |Add |Choose |Set |Press |Ask |Get |Give |Write |Look |Leave |Copy |Pick |Say |Show |Try |Type |Right-click |Fetch|Find |Move |Never )/.test(s) || /\bPC check:/.test(s)) { return 'instruction'; }
  if (/\b(?:fix round \d|round \d|CHECK-\d|the checker|checker's|SUPERSEDED|FIX-ROUND|was removed|were removed|used to|no longer says|Fix round)/i.test(s)) { return 'history'; }
  if (/UNVERIFIED|not run here|NOT run|not tested|NOT tested|untested|could not be tested|cannot (?:speak|see|prove|catch|know|stop|check)|not (?:been )?proved|never run/i.test(s)) { return 'limit'; }
  return null;
}
const vres = () => memo('vres', () => { const txt = rd('test-verify-r8-RESULT.txt'), sha = sha256f(VER), scen = {}; for (const m of txt.matchAll(/^SCENARIO (\S+): (.*)$/gm)) { scen[m[1]] = m[2]; } const tot = /(\d+) of (\d+) scenarios as expected; fixture identical before and after in (\d+) of (\d+)/.exec(txt) || []; const pf = []; for (const m of txt.matchAll(/^  (PASS|FAIL) ([A-Z]\d+[a-z]*)[:\s]/gm)) { pf.push([m[1], m[2]]); } return { pf, scen, hasSha: txt.includes(sha), total: +tot[2], asExpected: +tot[1], identical: +tot[3], checks: /VERIFY TESTS: (\d+) of (\d+) pass/.exec(txt) }; });
function sha256f(f) { return require('crypto').createHash('sha256').update(fs.readFileSync(f)).digest('hex'); }
const sc = (from, to) => { const r = vres(); const n = k => parseInt(k.replace(/^\D+/, ''), 10), pre = from.replace(/\d+.*$/, ''); return [...new Set(Object.keys(r.scen).concat(r.pf.map(x => x[1].replace(/[a-z]$/, ''))))].filter(k => k.startsWith(pre) && n(k) >= n(from) && n(k) <= n(to)); };
const suite = (...ids) => { const r = vres(); if (!r.hasSha) { return [false, 'test-verify-r8-RESULT.txt was not produced by this VERIFY-v5.ps1 (its SHA-256 is not in that file): run test-verify.sh again']; } const all = ids.flatMap(i => Array.isArray(i) ? i : [i]); const okId = i => /^AS EXPECTED/.test(r.scen[i] || '') || (!(i in r.scen) && r.pf.some(x => x[1] === i || (x[1].startsWith(i) && /[a-z]$/.test(x[1]) && x[1].length === i.length + 1)) && !r.pf.some(x => x[0] === 'FAIL' && x[1].startsWith(i))); const bad = all.filter(i => !okId(i)); return [all.length > 0 && bad.length === 0, 'scenarios ' + all.slice(0, 6).join(',') + (all.length > 6 ? ' ... (' + all.length + ')' : '') + (bad.length ? ' NOT as expected or missing: ' + bad.join(',') : ' all as expected') + ' in test-verify-r8-RESULT.txt']; };
const both = async (...fns) => { const out = []; let ok = true; for (const f of fns) { const r = await f(); ok = ok && r[0]; out.push(r[1]); } return [ok, out.join('; ')]; };
const DOCS = ['verify-header', 'verify-msgs', 'install', 'contract', 'limits'];
// read-only and no-write
claim('D-readonly', DOCS, /READ-ONLY|only reads|It only opens plain files|contains no write command|no command that writes|changed nothing in the folder|no copy command, no delete command/i, async () => {
  const r = spawnNode('test-no-write-commands.js', []); const fx = fixture(), before = tree(fx.base); const v = verify(fx.N, []); const after = tree(fx.base);
  return [r.code === 0 && before === after && v.code === 0, 'the write-command scan: exit ' + r.code + ' (' + (r.out.trim().split('\n').pop() || '').slice(0, 80) + '); a run on a fresh copy changed nothing in the folder tree: ' + (before === after)];
}, { oncePerRun: true });
claim('D-ascii', ['verify-header'], /ASCII only/i, async () => { const b = fs.readFileSync(VER); let hi = 0, cr = 0, nul = 0; b.forEach(x => { if (x > 127) { hi++; } if (x === 13) { cr++; } if (x === 0) { nul++; } }); return [hi + cr + nul === 0, 'VERIFY-v5.ps1: ' + hi + ' bytes above 127, ' + cr + ' CR, ' + nul + ' NUL']; }, { oncePerRun: true });
claim('D-usage', ['verify-header'], /VERIFY-v5\.ps1 - READ-ONLY check|full path of the installed folder|from the order \(optional|catches a doctored manifest|use ONLY after a PC writer|Without it the check is EXACT|it is then reported as|changed by a PC writer/i, async () => suite(sc('V24', 'V25'), sc('V04', 'V04e'), sc('V36', 'V37'), ['R01', 'R01b', 'R22']), { oncePerRun: true });
claim('D-exit', ['verify-header', 'install'], /Exit codes?|PowerShell ITSELF|exit code is 1|CANNOT CHECK/i, async () => both(async () => {
  const fx = fixture(), empty = fs.mkdtempSync(path.join(os.tmpdir(), 'cl8e-')), want = [['a wrong switch', () => verify(fx.N, ['-NoSuchSwitch']).code, 1], ['no -Path', () => verifyRaw([]).code, 1], ['a relative path', () => verify('relative/dir', []).code, 2], ['a path with ..', () => verify(fx.N + '/../v5', []).code, 2], ['a missing folder', () => verify(path.join(os.tmpdir(), 'cl8-nope-' + process.pid), []).code, 2], ['a missing manifest', () => verify(empty, []).code, 2], ['a good package', () => verify(fx.N, []).code, 0]];
  const out = [], hd = rd('VERIFY-v5.ps1').split('\n').filter(l => /^#/.test(l)).join(' '); let ok = /0 = OK/.test(hd) && /1 = at least one problem/.test(hd) && /2 = this script could not start/.test(hd) && /wrong switch[^.]*exit|exits 1/.test(hd);
  want.forEach(([n, f, w]) => { const g = f(); if (g !== w) { ok = false; } out.push(n + ': ' + g + (g === w ? '' : ' <-- expected ' + w)); }); return [ok, 'exit codes: ' + out.join(', ')]; }, async () => suite(sc('X01', 'X06'), ['V15', 'V16', 'V17', 'V31'])), { oncePerRun: true });
claim('D-labels', DOCS, /one line per difference|reads MANIFEST\.sha256 inside the folder|recomputes the SHA-256|package files are identical|MISSING|UNREACHABLE|UNREADABLE|EDITED|TOO BIG|NOT A PLAIN FILE|CASE DUPLICATE|EXTRA FILE|EXTRA FOLDER|BAD MANIFEST LINE|LINK OR NOT A PLAIN FILE|PROBLEMS lists every difference|WRONG PLACE|not counted as identical/i, async () => suite(['V02', 'V05', 'V07', 'V09', 'V11', 'V14', 'V21', 'V33', 'V34', 'R05', 'R07', 'R10', 'R12']), { oncePerRun: true });
claim('D-link', DOCS, /\blinks?\b|LINK IN PATH|junction|no count of identical|were read through it|manifest cannot be trusted/i, async () => both(async () => { const fx = fixture(); const l = path.join(fx.base, 'Docs', 'v5link'); fs.symlinkSync(fx.N, l); const r = verify(l, []); return [r.code === 1 && /LINK/.test(r.out) && !/\d+ of \d+ package files are identical/.test(r.out), 'a link as the folder: exit ' + r.code + ', no identical-count line']; }, async () => suite(sc('V40', 'V44'), sc('X10', 'X24'), ['R09', 'R09b', 'R25'])), { oncePerRun: true });
claim('D-encoding', DOCS, /UTF-?16|byte-order mark|BOM\b|NUL byte|\bCR\b|plain ASCII|byte above 127|Pure ASCII|every byte must be 127|redirect|re-encod/i, async () => both(async () => { const fx = fixture(); const f = path.join(fx.N, 'data', 'vtes5-bots.js'); fs.writeFileSync(f, utf16(fs.readFileSync(f, 'utf8'))); const r = verify(fx.N, []), a = verify(fx.N, ['-AfterWriters']); return [/saved as UTF-16/.test(r.out) && /BAD DATA FILE/.test(a.out) && r.code === 1 && a.code === 1, 'UTF-16: day one exit ' + r.code + ' says UTF-16; with the switch exit ' + a.code + ' says BAD DATA FILE']; }, async () => suite(['R02', 'R02b', 'R03', 'R13', 'R14', 'R23'], sc('X40', 'X51'), ['V39b'])), { oncePerRun: true });
claim('D-shape', DOCS, /strict shape|exactly the (?:one )?(?:fixed )?assign|ONE JSON object|wrapper|trailing LF|at most one LF|size from the file length|1048576|1 MB|2 MB|empty file|0 bytes|status_dir_url|injected|hand-written token|ConvertFrom-Json|shape check/i, async () => suite(['R04', 'R04b', 'R04c', 'R05b', 'R06', 'R06c', 'R15', 'R15b', 'R16', 'R16b', 'R17', 'R18', 'R19', 'R20'], sc('R11', 'R11i'), sc('X70', 'X89'), ['R17f', 'R17h']), { oncePerRun: true });
claim('D-afterwriters', DOCS, /-AfterWriters|day one|day-one|fresh install|exact|changed by a PC writer|OK \(after writers\)|expected edit|only the eight|eight (?:data|files)|ANY other package file|Any other file that differs/i, async () => both(async () => { const fx = fixture(); const f = path.join(fx.N, 'data', 'vtes5-state.js'); fs.writeFileSync(f, 'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = {"schema":1};\n'); const d = verify(fx.N, []), a = verify(fx.N, ['-AfterWriters']); return [d.code === 1 && /PROBLEMS/.test(d.out) && a.code === 0 && /after writers/.test(a.out), 'a valid rewritten data file: day one exit ' + d.code + ' (PROBLEMS); with the switch exit ' + a.code + ' (OK after writers)']; }, async () => suite(sc('V04', 'V04e'), sc('V36', 'V37'), sc('R01', 'R01c'), ['R22', 'V45'])), { oncePerRun: true });
claim('D-okline', DOCS, /OK: all \d+ of \d+|all \d+ of \d+ package files|identical \(SHA-256\)|nothing else is in the folder|the only good answer|single OK line|closing line|N of M/i, async () => both(async () => { const fx = fixture(); const r = verify(fx.N, []), n = fs.readFileSync(path.join(fx.N, 'MANIFEST.sha256'), 'utf8').trim().split('\n').length; return [r.code === 0 && r.out.includes('OK: all ' + n + ' of ' + n + ' package files are present, readable and identical (SHA-256), and nothing else is in the folder.'), 'the OK line for a fresh copy names ' + n + ' of ' + n + ' files']; }, async () => suite(['V01', 'V35', 'X90', 'X91'])), { oncePerRun: true });
claim('D-control', DOCS, /control character|escaped|fake a line|can never look like an OK/i, async () => suite(sc('X60', 'X69')), { oncePerRun: true });
claim('D-crlf', DOCS, /CRLF|line endings|autocrlf/i, async () => suite(['V38', 'V39', 'V39c']), { oncePerRun: true });
claim('D-nowrite-run', DOCS, /identical before and after|the whole test area|every scenario|Tested under PowerShell|\d+ scenarios|tested/i, async () => { const r = vres(), ok = r.total > 0 && r.asExpected === r.total && r.identical === r.total && r.checks && r.checks[1] === r.checks[2]; return [!!ok && r.hasSha, 'test-verify-r8-RESULT.txt: ' + r.asExpected + ' of ' + r.total + ' scenarios as expected, fixture identical in ' + r.identical + '; checks ' + (r.checks ? r.checks[1] + ' of ' + r.checks[2] : 'missing') + '; written by this VERIFY: ' + r.hasSha]; }, { oncePerRun: true });
claim('D-6d', ['install'], /Save VERIFY beside the new folder|never over a file that is already there|already there|\.new-|never overwrite it/i, async (s, ent) => { const r = await claims6d(); return r; });
async function claims6d() { const all = rd('INSTALL-BY-HAND.md'); const at6 = all.search(/6d\./); if (at6 < 0) { return [false, 'no step 6d']; } const e = all.indexOf('\n7. ', at6); const step = all.slice(at6, e > 0 ? e : at6 + 4000); const testFirst = step.search(/Test-Path|already (?:there|exists)|exists/i), save = step.search(/\bsave\b/i); const never = /never overwrite|do not overwrite|never replace/i.test(step), nn = /VERIFY-v5\.ps1\.new-/.test(step), bl = /BLOCKED/.test(step);
  const s = suite(['X35']); return [testFirst >= 0 && never && nn && bl && s[0], 'step 6d: tests first ' + (testFirst >= 0) + ', never overwrite ' + never + ', .new- copy ' + nn + ', BLOCKED ' + bl + '; ' + s[1]]; }
claim('D-fetch', ['install'], /git fetch|\.git\b|remote branches|remote-tracking|changes no working file/i, async (s) => claimFetch(s));
async function claimFetch(s) {
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'cl8git-')); const g = (cwd, ...a) => sh('git', ['-c', 'user.email=t@t', '-c', 'user.name=t', '-c', 'protocol.file.allow=always'].concat(a), { cwd });
  g(base, 'init', '-q', '--bare', 'o.git'); g(base, 'clone', '-q', 'o.git', 'w'); const W = path.join(base, 'w'); fs.writeFileSync(path.join(W, 'a.txt'), '1\n'); g(W, 'add', '.'); g(W, 'commit', '-q', '-m', 'one'); g(W, 'branch', '-M', 'main'); g(W, 'push', '-q', 'origin', 'main');
  g(base, 'clone', '-q', 'o.git', 'c'); const C = path.join(base, 'c'); fs.writeFileSync(path.join(W, 'b.txt'), (Math.random() + '\n').repeat(50)); g(W, 'add', '.'); g(W, 'commit', '-q', '-m', 'two'); g(W, 'push', '-q', 'origin', 'main');
  const count = () => sh('bash', ['-c', 'find .git -type f | wc -l'], { cwd: C }).out.trim() * 1, wt = () => g(C, 'status', '--porcelain').out + sh('bash', ['-c', 'ls -la --time-style=+%s . | grep -v " \\.git$" | md5sum'], { cwd: C }).out, head0 = g(C, 'rev-parse', 'HEAD').out, br0 = g(C, 'for-each-ref', 'refs/heads').out, wt0 = wt(), n0 = count(), trk0 = g(C, 'for-each-ref', 'refs/remotes').out;
  g(C, 'fetch', '-q', 'origin', 'main'); const n1 = count(), trk1 = g(C, 'for-each-ref', 'refs/remotes').out, same = g(C, 'rev-parse', 'HEAD').out === head0 && g(C, 'for-each-ref', 'refs/heads').out === br0 && wt() === wt0;
  const real = 'fetch wrote ' + (n1 - n0) + ' new files inside .git, moved the remote-tracking list: ' + (trk1 !== trk0) + ', changed a working file, HEAD or a branch: ' + !same;
  if (/only (?:updates|changes|touches)|just (?:updates|changes)/i.test(s)) { return [false, 'the sentence says fetch only updates the remote-branch list, but ' + real]; }
  if (!/downloads|writes|changes no|only updates|objects|remote branches|inside the checkout/i.test(s)) { return [true, 'an instruction, not a claim about what fetch writes']; }
  const claimsWrites = /objects?|files inside|downloads/i.test(s), claimsNoChange = /changes no working file/i.test(s), claimsList = /remote branches|remote-tracking/i.test(s);
  return [same && (!claimsWrites || n1 > n0) && (!claimsList || trk1 !== trk0), real + '; the sentence ' + [claimsWrites ? 'says it writes files inside .git' : '', claimsNoChange ? 'says it changes no working file or branch' : '', claimsList ? 'says it adds to the remote-branch list' : ''].filter(Boolean).join(' and ')]; }
claim('D-count', DOCS, /\b(?:11|12) (?:files|named)|12 files|package is 1\d files|the 11 named|11 of 11|all 11/i, async () => { const n = fs.readFileSync(path.join(process.env.PKG, 'MANIFEST.sha256'), 'utf8').trim().split('\n').length, listed = fs.readdirSync(process.env.PKG).filter(f => fs.statSync(path.join(process.env.PKG, f)).isFile()).length + fs.readdirSync(path.join(process.env.PKG, 'data')).length; return [listed === n + 1, 'the manifest names ' + n + ' files; the package folder holds ' + listed + ' (= ' + (n + 1) + ' with the manifest itself)']; }, { oncePerRun: true });
claim('D-pinned', ['install'], /SHA-256 must be|-ExpectManifestSha256|MANIFEST\.sha256 SHA/i, async () => { const d = rd('INSTALL-BY-HAND.md'), man = sha256f(path.join(process.env.PKG, 'MANIFEST.sha256')), ver = sha256f(VER); return [d.includes('-ExpectManifestSha256 ' + man) && d.includes(ver), 'the pinned manifest hash is the real one: ' + d.includes(man) + '; the pinned VERIFY hash is the real one: ' + d.includes(ver)]; }, { oncePerRun: true });
claim('D-v3', DOCS, /real v3|v3 launcher is never touched|byte-exact|28d3ed5e/i, async () => suite(['V27', 'V30e']), { oncePerRun: true });
claim('D-files', ['install'], /files? (?:are|is) named|the package is|it is one folder up|not in the package|beside the new folder|panel-rebuild\/v5/i, async () => { const d = rd('INSTALL-BY-HAND.md'); const man = fs.readFileSync(path.join(process.env.PKG, 'MANIFEST.sha256'), 'utf8').trim().split('\n').map(l => l.slice(66)); const miss = man.filter(f => !d.includes(f.replace(/^data\//, ''))); return [miss.length === 0 && fs.existsSync(VER), 'every one of the ' + man.length + ' manifest files is named in INSTALL-BY-HAND.md (missing: ' + (miss.join(',') || 'none') + '); VERIFY-v5.ps1 exists beside the package']; }, { oncePerRun: true });
// ---- contract and limits claims that the page proves
const pg = async (mut, fn, o) => { const f = fresh(NOWMS); mut && mut(f); const w = await pageWith(f, o); try { return await EV(w.p, fn); } finally { await w.ctx.close(); } };
claim('C-interval', ['contract'], /interval_sec of the heartbeat file and of the bots file|writers' own tick\) must be a number from 1 to 3600/i, async () => {
  const bad = []; for (const iv of [0, -5, 3601, 100000, 'x', null]) { const r = await pg(f => { f.heartbeat.interval_sec = iv; f.bots.interval_sec = iv; }, () => [window.VTES5.status('heartbeat').state, window.VTES5.status('bots').state]); const isBad = iv === null ? false : true; if (isBad && (r[0] === 'OK' || r[1] === 'OK')) { bad.push(JSON.stringify(iv) + ' -> ' + r.join('/')); } }
  const good = await pg(f => { f.heartbeat.interval_sec = 3600; f.bots.interval_sec = 1; }, () => [window.VTES5.status('heartbeat').state, window.VTES5.status('bots').state]);
  return [bad.length === 0 && good[0] === 'OK' && good[1] === 'OK', 'interval_sec outside 1 to 3600 never gives OK (' + (bad.join('; ') || '0 wrong of 5') + '); 3600 and 1 are accepted: ' + good.join('/')];
}, { oncePerRun: true });
claim('C-bots', ['contract'], /Fields: interval_sec \(the writer's tick\) and bots|GREEN only when the bots file is fresh|What the page shows per bot/i, async () => {
  const q = (mut) => pg(f => mut(f.bots.bots['CU-Orchestrator'], f), () => window.VTES5.bot('CU-Orchestrator').state); const res = {};
  res.good = await q(b => { }); res.running = await q(b => { b.state = 'Running'; b.last_result = 267009; }); res.disabled = await q(b => { b.state = 'Disabled'; }); res.failed = await q(b => { b.last_result = 1; }); res.future = await q(b => { b.last_run_at = at(-30); }); res.late = await q(b => { b.last_run_at = at(60 * 24); }); res.noentry = await q((b, f) => { delete f.bots.bots['CU-Orchestrator']; }); res.badstate = await q(b => { b.state = 'Weird'; }); res.staleFile = await pg(f => { f.bots.at = at(600); }, () => window.VTES5.bot('CU-Orchestrator').state);
  const ok = res.good === 'OK' && res.running === 'RUNNING' && res.disabled === 'DOWN' && res.failed === 'DOWN' && res.future === 'BAD CLOCK' && res.late === 'DOWN' && res.noentry !== 'OK' && res.badstate !== 'OK' && res.staleFile !== 'OK'; return [ok, JSON.stringify(res)];
}, { oncePerRun: true });
claim('C-health', ['contract'], /Fields: ok \(true\/false, REQUIRED\)|says OK" = ok is exactly true/i, async () => {
  const v = (mut) => pg(f => mut(f.health), () => { const x = window.VTES5.verdict('health'); return x.cls + ':' + x.kind; }); const r = { ok: await v(h => { }), okfalse: await v(h => { h.ok = false; }), nook: await v(h => { delete h.ok; }), oktext: await v(h => { h.ok = 'true'; }) };
  return [/^ok:/.test(r.ok) && /^bad:NOT OK/.test(r.okfalse) && /^bad:NO DATA/.test(r.nook) && !/^ok:/.test(r.oktext), JSON.stringify(r)];
}, { oncePerRun: true });
claim('C-miami', ['contract'], /proof_ok true with no checked_at is grey|PROOF OK BUT NO CHECK DATE|PROOF OLD|NOT RE-CHECKED|PROOF NOT OK/i, async () => {
  const t = (mut) => pg(f => { f.miamidade.sources = Array.from({ length: 22 }, (_, i) => ({ id: ('0' + (i + 1)).slice(-2), proof_ok: true, checked_at: at(60) })); mut(f.miamidade.sources, f.miamidade); }, () => document.querySelector('#pn-miami li').outerHTML);
  const r = { nodate: await t(s => { delete s[0].checked_at; }), old: await t(s => { s[0].checked_at = at(60 * 24 * 8); }), future: await t(s => { s[0].checked_at = at(-600); }), notok: await t(s => { s[0].proof_ok = false; }), missing: await t(s => { s.shift(); }) };
  const ok = /v5b na[^>]*>PROOF OK BUT NO CHECK DATE/.test(r.nodate) && /v5b bad[^>]*>PROOF OLD/.test(r.old) && /v5b bad[^>]*>PROOF DATE IN THE FUTURE \(BAD CLOCK\)/.test(r.future) && /v5b bad[^>]*>PROOF NOT OK/.test(r.notok) && /v5b bad[^>]*>NOT RE-CHECKED/.test(r.missing); return [ok, Object.keys(r).map(k => k + ': ' + (r[k].match(/<span class="v5b (\w+)"[^>]*>([^<]{0,40})/) || [])[2]).join('; ')];
}, { oncePerRun: true });
claim('C-tokens', ['contract'], /Do not estimate: if the monitor cannot measure/i, async () => { const r = await pg(f => { delete f.tokens; }, () => { const x = window.VTES5.verdict('tokens'); return x.cls + ':' + x.kind; }); return [/^bad:NO DATA/.test(r), 'no token file: ' + r]; });
claim('C-tabs', ['limits'], /8 live tabs \(LLMS, EXECUTORS/i, async () => { const r = await pg(null, () => [...document.querySelectorAll('#tabs a.tab')].map((a, i) => ({ n: a.firstChild.textContent.trim(), o: +getComputedStyle(a).order || 0, i })).sort((x, y) => x.o - y.o || x.i - y.i).map(x => x.n)); const want = ['LLMS', 'EXECUTORS', 'BOTS', 'HAND OFF', 'QUEUED', 'STATUS', 'REPAIRS', 'MIAMI-DADE']; return [JSON.stringify(r.slice(0, 8)) === JSON.stringify(want) && r.length === 18, r.length + ' tabs; the first eight are ' + r.slice(0, 8).join(', ')]; });
claim('C-nonever', ['limits'], /"Never leaves the PC"/i, async () => { const t = await pg(null, () => document.body.innerText); const m = t.match(/Never leaves the PC/g) || []; const loose = t.split('\n').filter(l => /Never leaves the PC/.test(l) && !/typed in v3/.test(l)); return [loose.length === 0, m.length + ' mentions, all inside the "typed in v3" sentence: ' + (loose.length === 0)]; });
claim('C-search', ['limits'], /search finds words a card no longer shows/i, async () => {
  const w = await pageWith(fresh(NOWMS)); const r = await EV(w.p, () => { const s = document.getElementById('q') || document.querySelector('input[type=search],input[type=text]'); const out = {}; for (const k of ['hourly', 'airdrop', 'gemini.md']) { s.value = k; s.dispatchEvent(new Event('input', { bubbles: true })); out[k] = [...document.querySelectorAll('.card')].filter(c => c.style.display !== 'none' && c.offsetParent !== null).map(c => c.id).filter(Boolean); } return out; }); await w.ctx.close();
  return [r.hourly.includes('bot-CU-Propagation-Check') && !r.airdrop.includes('card-LLM-05') && !r['gemini.md'].includes('card-LLM-08'), JSON.stringify(r).slice(0, 220)];
});
claim('C-words', ['limits'], /words on the page are cross-checked/i, async () => { const r = await pg(null, () => { const o = [], w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); while (w.nextNode()) { const n = w.currentNode, par = n.parentElement; if (!par || par.closest('.v5forrambo,.repair-log,script,style,noscript')) { continue; } o.push(n.textContent); } return o.join('\n'); }); const J = [/heartbeat/i, /result code/i, /vtes:\/\//i, /GEMINI\.md/, /vtes5-/i, /\.js\b/]; const hit = J.filter(re => re.test(r)).map(String); return [hit.length === 0, 'jargon words outside "For RAMBO" lines: ' + (hit.join(' ') || 'none')]; });
claim('C-limit62', ['limits'], /claims test\. test-claims-r8\.js extracts/i, async () => { const s = stateText(); return [fs.existsSync(path.join(__dirname, 'test-claims-r8.js')) && s.worlds === 9 && s.pass === s.total, 'test-state-text-r8: ' + s.pass + ' of ' + s.total + ' over ' + s.worlds + ' worlds']; });
/* =====================================================================================================
   RUN
   ===================================================================================================== */
(async () => {
  const br = await getBrowser(); const rows = []; const add = (r) => { rows.push(r); console.log(r.status + ' ' + r.id + ' | ' + r.src + ' | ' + r.sentence.slice(0, 110) + ' | ' + String(r.evidence).slice(0, 330)); };
  // extract the sentences
  { const { ctx, p } = await pageWith(fresh(NOWMS)); SRC.readme = (await EV(p, () => [...document.querySelectorAll('#v5read li')].map(l => l.textContent))).flatMap((t, i) => split(t).map(s => ({ s, raw: s, item: t.replace(/\s+/g, ' ').trim(), where: 'Read me item ' + (i + 1) })));
    SRC.queued = (await EV(p, () => ['#queued', '#queued + p.lead'].map(q => (document.querySelector(q) || {}).textContent || ''))).flatMap(t => split(t).map(s => ({ s, raw: s, where: 'section 5' })));
    const qs = await EV(p, async () => { const out = []; window.open = () => null; for (const b of document.querySelectorAll('[data-q]')) { b.click(); out.push(document.getElementById('status').textContent); } return out; }); SRC['queued-status'] = qs.flatMap(t => split(t).map(s => ({ s, raw: s, where: 'status line after a queued click' })));
    SRC.card = (await EV(p, () => [...document.querySelectorAll('.card')].map(c => c.innerText))).flatMap(t => split(t).filter(s => /one click|no Open button|press (?:the )?(?:big )?(?:blue|copy packet)/i.test(s)).map(s => ({ s, raw: s, where: 'card text' }))); await ctx.close(); }
  SRC['verify-header'] = []; SRC['verify-msgs'] = []; verifySentences().forEach(x => SRC[/header/.test(x.where) ? 'verify-header' : 'verify-msgs'].push(x));
  SRC.install = mdSentences('INSTALL-BY-HAND.md'); SRC.contract = mdSentences('DATA-CONTRACT.md'); SRC.limits = mdSentences('KNOWN-LIMITS.md');
  const covered = new Set(); let uncovered = 0;
  for (const c of CLAIMS) {
    const srcs = Array.isArray(c.src) ? c.src : [c.src]; let ents = []; srcs.forEach(sn => (SRC[sn] || []).forEach(e => { if (c.re.test(c.perItem ? (e.item || e.s) : e.s)) { ents.push(Object.assign({ sn }, e)); covered.add(sn + '|' + e.where + '|' + e.s); } }));
    const seen = new Set(); ents = ents.filter(e => { const k = (c.perItem ? (e.item || e.s) : e.s); if (seen.has(k)) { return false; } seen.add(k); return true; });
    if (!ents.length) { const gone = c.retired || c.optional; add({ id: c.id, src: c.src, sentence: '(no sentence matches)', status: gone ? 'ABSENT-OK' : 'STALE', evidence: gone ? 'the sentence is not in the text (a retired or optional claim)' : 'this claim test matches no sentence any more: remove it or fix its pattern' }); if (!gone) { uncovered++; } continue; }
    let done = false;
    for (const e of ents) {
      if (c.oncePerRun && done) { continue; } done = true; let r; try { r = await c.test(c.perItem ? (e.item || e.s) : e.s, e); } catch (x) { r = [false, 'the test could not run: ' + String(x && x.message || x).slice(0, 200)]; }
      add({ id: c.id, src: e.sn, where: e.where, sentence: c.perItem ? (e.item || e.s) : e.s, status: r[0] ? 'PASS' : 'FAIL', evidence: r[1] });
    }
  }
  // coverage: every checkable sentence must have a test
  const miss = [];
  let EXEMPT_COUNTS = {}; const checkable = { readme: () => true, queued: () => true, 'queued-status': () => true, card: () => true };
  for (const src of Object.keys(SRC)) {
    const docSrc = ['verify-header', 'verify-msgs', 'install', 'contract', 'limits'].includes(src); if (docSrc && !COVER_DOCS) { continue; }
    SRC[src].forEach(e => { const must = checkable[src] ? checkable[src](e) : TRIGGER.test(e.s); if (must && !covered.has(src + '|' + e.where + '|' + e.s)) { miss.push({ src, where: e.where, s: e.s }); } });
  }
  const exempt = {}; const miss2 = miss.filter(m => { if (!['verify-header', 'verify-msgs', 'install', 'contract', 'limits'].includes(m.src)) { return true; } const r = EXEMPT(m.s); if (r) { exempt[r] = (exempt[r] || 0) + 1; return false; } return true; });
  miss.length = 0; miss2.forEach(m => miss.push(m)); EXEMPT_COUNTS = exempt;
  miss.forEach(m => add({ id: 'UNTESTED', src: m.src, where: m.where, sentence: m.s, status: 'UNTESTED', evidence: 'a checkable sentence with no test (' + m.where + ')' }));
  const bad = rows.filter(r => ['FAIL', 'STALE', 'UNTESTED'].includes(r.status)); const sentencesChecked = rows.filter(r => r.status === 'PASS' || r.status === 'FAIL').length;
  const total = rows.filter(r => r.status !== 'ABSENT-OK').length, pass = rows.filter(r => r.status === 'PASS').length;
  fs.writeFileSync(OUT, JSON.stringify({ test: 'test-claims-r8', root: ROOT, docs_covered: COVER_DOCS, exempt_sentences: EXEMPT_COUNTS, claims: CLAIMS.length, sentences_extracted: Object.fromEntries(Object.keys(SRC).map(k => [k, SRC[k].length])), pass, total, untested: miss.length, rows }, null, 1));
  console.log('\nCLAIMS R8: ' + pass + ' of ' + total + ' claim checks pass; ' + miss.length + ' checkable sentences have no test; ' + bad.filter(r => r.status === 'FAIL').length + ' claims are FALSE; ' + rows.filter(r => r.status === 'STALE').length + ' tests are stale. Sentences extracted: ' + JSON.stringify(Object.fromEntries(Object.keys(SRC).map(k => [k, SRC[k].length]))));
  await br.close(); process.exit(bad.length === 0 ? 0 : 1);
})();
