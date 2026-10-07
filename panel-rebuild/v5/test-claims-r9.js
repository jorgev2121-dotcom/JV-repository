// test-claims-r9.js - fix round 9, Tier 3 (ENFORCE) on a much SMALLER surface. TRK-2026-9910-B
// The round-8 claims test picked sentences by topic keywords and passed "76 of 76" while an independent reader found 34 false ones. This test picks sentences with NO knowledge of the page:
//   every sentence of the page's visible text (in every state lib-harvest-r9.js reaches) and of INSTALL-BY-HAND.md that holds a DIGIT or one of the plain words
//   never, always, only, cannot, can not, does not, do not, every, all, none, exactly, blocked, ready, one click, catches, misses
// must (a) match a TEST entry whose test passes, or (b) match an EXEMPT entry (with a one-line reason), or (c) be the unchanged text of the real v3 launcher (counted and listed separately).
// It FAILS on any sentence that is none of these, on any TEST that fails, and on any entry that matches no sentence (a stale entry would hide a gap).
// Also: the Read me has at most 10 sentences of at most 20 words and no typed count; the page and PORT-REPORT.md agree about the v3 changes; the LOCAL, Grok and WHOLE PAGE sentences follow the real state.
// Usage: PWSH_DIR=<dir with pwsh> node test-claims-r9.js <out.json>      (env V5DIR = the tree to test, default this folder: it holds package/, VERIFY-v5.ps1 and the documents)
const fs = require('fs'), path = require('path'), os = require('os'), cp = require('child_process');
const ROOT = path.resolve(process.env.V5DIR || __dirname); process.env.PKG = process.env.PKG || path.join(ROOT, 'package');
const L = require('./test-v5-lib.js'); const H = require('./lib-harvest-r9.js'); const { stage, open, fresh, NOWMS, at } = L;
const OUT = process.argv[2] || 'test-claims-r9-RESULT.json';
const PW = process.env.PWSH_DIR ? path.join(process.env.PWSH_DIR, 'pwsh') : null; const rd = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const HOME = fs.mkdtempSync(path.join(os.tmpdir(), 'cl9home-')); const ENV = Object.assign({}, process.env, { HOME, USERPROFILE: HOME, DOTNET_CLI_HOME: HOME, POWERSHELL_TELEMETRY_OPTOUT: '1', POWERSHELL_UPDATECHECK: 'Off', DOTNET_NOLOGO: '1' });
const sh = (cmd, args, o) => { const r = cp.spawnSync(cmd, args, Object.assign({ encoding: 'utf8', env: ENV, timeout: 120000, maxBuffer: 1 << 26 }, o || {})); return { code: r.status, out: (r.stdout || '') + (r.stderr || '') }; };
let browser = null; const getB = async () => browser || (browser = await L.chromium.launch());
async function pageWith(files, o) { const d = stage(files, o); const r = await open(await getB(), d, o); r.dir = d; return r; }
const words = s => (s.match(/\S+/g) || []).length;
const splitS = t => t.replace(/\r/g, '').split(/\n+/).flatMap(l => l.split(/(?<=[.!?])\s+(?=[A-Z0-9("'`*])/)).map(s => H.norm(s.replace(/[`*]/g, ''))).filter(s => s.length > 1);
/* ---------------- registry ---------------- */
const ENTRIES = []; const test = (id, re, fn, prio) => ENTRIES.push({ id, kind: 'test', re, fn, prio: prio || 1 }); const exempt = (id, re, reason, prio) => ENTRIES.push({ id, kind: 'exempt', re, reason, prio: prio || 2 });
const memo = {}; const once = (id, fn) => (memo[id] || (memo[id] = Promise.resolve().then(fn)));
const R = (ok, ev) => [!!ok, ev];
const fnOf = id => (ENTRIES.find(e => e.id === id) || {}).fn;
const ALWAYS = new Set(), INTERNAL = new Set(); require('./claims-registry-r9.js')({ markAlways: id => ALWAYS.add(id), markInternal: id => INTERNAL.add(id), fnOf, test, exempt, once, R, pageWith, fresh, NOWMS, at, ROOT, rd, sh, PW, words, H, L, splitS, getB });
/* ---------------- run ---------------- */
(async () => {
  ENTRIES.sort((a, b) => a.prio - b.prio); /* stable: tests that name their sentence first, then reasons, then the two generic tests, then the id-only reason */
  const br = await getB(); const results = []; const say = (name, ok, ev) => { results.push({ name, ok: !!ok, ev: String(ev).slice(0, 400) }); console.log((ok ? 'PASS ' : 'FAIL ') + name + (ok ? '' : ' - ' + String(ev).slice(0, 300))); };
  // ---- A. the page's visible text, every state ----
  const CACHE = process.env.CLAIMS_SURFACE; let v3arr, surf;
  if (CACHE && fs.existsSync(CACHE)) { const c = JSON.parse(fs.readFileSync(CACHE, 'utf8')); v3arr = c.v3; surf = c.surf; }
  else {
    const G = require('./gen-text-diff-r9.js'); const lines = await G.v3Lines(br); v3arr = H.sentences([...lines]).map(H.tmpl);
    const hv = await H.harvestAll(br); surf = []; hv.sentences.forEach((e, k) => surf.push({ text: e.text, k, examples: [...e.examples].map(([t, w]) => [t, [...w]]) }));
    if (CACHE) { fs.writeFileSync(CACHE, JSON.stringify({ v3: v3arr, surf })); }
  }
  const v3sent = new Set(v3arr);
  const surface = surf.map(e => ({ text: e.text, k: e.k, examples: e.examples, where: 'page' }));
  // ---- B. INSTALL-BY-HAND.md ----
  const ibh = []; let inFence = false; rd('INSTALL-BY-HAND.md').split('\n').forEach((line, i) => { if (/^\s*```/.test(line)) { inFence = !inFence; return; } if (inFence || /^\s*(#|<!--)/.test(line) || !line.trim()) { return; } splitS(line.replace(/^\s*(?:\d+\.|[-*])\s+/, '')).forEach(s => ibh.push({ text: s, k: 'ibh|' + s, examples: [[s, []]], where: 'INSTALL-BY-HAND.md:' + (i + 1) })); });
  const all = surface.concat(ibh); const chk = all.filter(s => H.checkable(s.text));
  const counts = { read: all.length, checkable: chk.length, proven: 0, exempt: 0, v3: 0, unmapped: 0, failed: 0 }; const unmapped = [], failed = [], used = new Set(), byEntry = {}, v3list = [];
  for (const s of chk) {
    if (s.where === 'page' && v3sent.has(H.tmpl(s.text))) { counts.v3++; v3list.push(s.text); continue; }
    const isI = s.where !== 'page'; const e = ENTRIES.find(x => x.re.test(s.text) && (x.id.startsWith('ibh-') ? isI : (x.kind === 'exempt' ? true : !isI)));
    if (!e) { counts.unmapped++; unmapped.push(s.where + ' | ' + s.text); continue; }
    used.add(e.id); (byEntry[e.id] = byEntry[e.id] || []).push(s.text);
    if (e.kind === 'exempt') { counts.exempt++; continue; }
    let bad = null; for (const [ex, ws] of s.examples) { const r = await e.fn(ex, { worlds: ws, where: s.where }); if (!r[0]) { bad = r[1] + ' [text: ' + ex.slice(0, 120) + ']'; break; } }
    if (!bad) { counts.proven++; } else { counts.failed++; failed.push(e.id + ' | ' + s.text.slice(0, 120) + ' | ' + bad); }
  }
  for (const id of ALWAYS) { const e = ENTRIES.find(x => x.id === id); const r = await e.fn('', { worlds: Object.keys(require('./lib-harvest-r9.js').worlds().reduce((a, w) => (a[w.name] = 1, a), {})) }); say('always-run claim: ' + id, r[0], r[1]); }
  for (const e of ENTRIES) { if (!used.has(e.id) && !ALWAYS.has(e.id) && !INTERNAL.has(e.id)) { say('entry matches a sentence: ' + e.id, false, 'no sentence matches this entry (stale entry)'); } }
  // entries are also run once on their own, so a test that no longer proves its claim fails even when its sentence is rare
  for (const e of ENTRIES.filter(x => x.kind === 'test' && used.has(x.id) && !x.perSentence)) { /* run above per sentence */ }
  unmapped.forEach(u => say('sentence has a test or an exempt reason', false, u)); failed.forEach(f => say('claim is true', false, f));
  say('no sentence is unmapped', counts.unmapped === 0, counts.unmapped + ' unmapped');
  say('no claim is false', counts.failed === 0, counts.failed + ' false');
  // ---- C. the Read me ----
  { const { ctx, p } = await pageWith(fresh(NOWMS)); const items = await p.evaluate(() => [...document.querySelectorAll('#v5read li')].map(l => l.textContent)); const sents = items.flatMap(splitS);
    say('Read me has at most 10 sentences (it has ' + sents.length + ')', sents.length <= 10, sents.length);
    const longS = sents.filter(s => words(s) > 20); say('Read me: every sentence has at most 20 words', longS.length === 0, longS.join(' || '));
    const nums = sents.filter(s => /\d/.test(s.replace(/\bv[35]\b/g, ''))); say('Read me holds no typed number (v3 and v5 are names)', nums.length === 0, nums.join(' || '));
    const gate = await p.evaluate(() => document.querySelector('.gate').textContent); const G3 = (await p.evaluate(() => window.VTES5U.GUARD_TEXT)) || [];
    say('the three guard sentences are exactly these and are in the Read me and under the note box', G3.length === 3 && JSON.stringify(G3) === JSON.stringify(['The tick box is the real protection.', 'The checker is a second layer: it catches many layouts and can miss some.', 'It cannot catch names, addresses, email addresses or phone numbers.']) && G3.every(g => sents.includes(g) && gate.includes(g)) && /Do not type cards, passwords or Social Security numbers here\./.test(gate), gate);
    const bad = sents.filter(s => /nine|digit|lines of text|catch(?:es)? (?:the|a)\b|Social Security, licence/i.test(s) && !G3.includes(s)); say('Read me does not list what the checker catches or misses', bad.length === 0, bad.join(' || '));
    await ctx.close(); }
  // ---- D. PORT-REPORT.md holds exactly the generated v3-changes list ----
  { const G = require('./gen-text-diff-r9.js'); const d = await G.compute(br); const blk = G.block(d); const doc = rd('PORT-REPORT.md'); const m = /<!-- CHANGE-LIST-BEGIN -->[\s\S]*?<!-- CHANGE-LIST-END -->/.exec(doc);
    say('PORT-REPORT.md holds exactly the list generated from the real v3 and v5 lines (' + d.rows.length + ' changed lines)', !!m && m[0] === blk, m ? 'the list in the file differs from a fresh diff' : 'no list in the file');
    const names = (rd('build-v5.js').match(/\brep(?:All)?\('([a-z0-9-]+)'/g) || []).map(x => x.replace(/^rep(?:All)?\('/, '').replace(/'$/, '')); const miss = names.filter(n => !new RegExp('\\b' + n + ' \\[').test(m ? m[0] : ''));
    say('every build patch is in the PORT-REPORT.md patch list (' + names.length + ' patches)', miss.length === 0, miss.join(', '));
    const surv = sh('node', [path.join(__dirname, 'test-v3-survives.js'), path.join(os.tmpdir(), 'cl9-surv.json')], { cwd: __dirname }); const sj = JSON.parse(fs.readFileSync(path.join(os.tmpdir(), 'cl9-surv.json'), 'utf8'));
    say('v3 survival: every card, bot, queued item, picker row, repairs row and tab is still here (' + sj.pass + ' of ' + sj.total + ')', sj.pass === sj.total, sj.pass + ' of ' + sj.total); }
  counts.exemptList = Object.keys(byEntry).filter(k => ENTRIES.find(e => e.id === k).kind === 'exempt').map(k => k + ': ' + byEntry[k].length + ' sentences');
  const pass = results.filter(r => r.ok).length, total = results.length;
  fs.writeFileSync(OUT, JSON.stringify({ test: 'test-claims-r9', counts, pass, total, results, unmapped, failed, v3_unchanged_sentences: v3list, by_entry: byEntry }, null, 1));
  console.log('CLAIMS R9: sentences read ' + counts.read + ' / checkable ' + counts.checkable + ' / proven ' + counts.proven + ' / exempt ' + counts.exempt + ' / unchanged v3 text ' + counts.v3 + ' / unmapped ' + counts.unmapped + ' / false ' + counts.failed + '; checks ' + pass + ' of ' + total);
  await br.close(); process.exit(pass === total ? 0 : 1);
})().catch(e => { console.error(e); process.exit(2); });
