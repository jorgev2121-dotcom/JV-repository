// test-fuzz-r7.js - fix round 7, CLASS 1 Tier 3 (enforcement): TYPE-FUZZ, 85 hand worlds and 300 seeded random worlds. TRK-2026-9910-B
// node test-fuzz-r7.js <mode: typefuzz|hand|random|all> <result.json>   (PKG=<package dir> tests another copy; WORKERS=n)
// For every case it asserts: (a) the page FINISHED painting (WHOLE PAGE line present) or shows the explicit failure box, and the top block (RAMBO button, Read me first, Live status) is there with no uncaught error;
// (b) WHOLE PAGE is never greener than the worst card or mark on the page; (c) after the data is fixed the page recovers by itself within 60 s (one 61 s tick), WITHOUT a reload.
// Hand and random worlds also assert: 0 injected scripts ran, 0 network calls, 0 storage use.
const L = require('./test-v5-lib.js'), { fs, path, chromium, NOWMS, fresh, stage, sleep, open } = L;
const mode = process.argv[2] || 'all', out = process.argv[3] || ('test-fuzz-r7-' + mode + '-RESULT.json'), WORKERS = +(process.env.WORKERS || 6);
const FILES = ['heartbeat', 'bots', 'state', 'health', 'tokens', 'housekeeping', 'miamidade'];
const KINDS = {
  object: '{}', array: '[]', 'array-of-null': '[null]', 'array-of-empty-object': '[{}]', string: '"abc"', number: '42', NaN: 'NaN', Infinity: 'Infinity', 'minus-one': '-1', true: 'true', null: 'null', undefined: 'undefined',
  'empty-string': '""', '2MB-string': 'new Array(2000001).join("a")', 'getter-that-throws': '@GETTER'
};
// every field of every file, found by walking the fresh world: object fields, list entry 0, first key of each map
function leaves(o, p, acc) {
  if (Array.isArray(o)) { if (o.length) { leaves(o[0], p.concat(0), acc); } return; }
  if (o && typeof o === 'object') { for (const k of Object.keys(o)) { acc.push(p.concat(k)); leaves(o[k], p.concat(k), acc); } }
}
function allFields() {
  const f = fresh(NOWMS), acc = [];
  for (const n of FILES) { acc.push([n]); const l = []; leaves(f[n], [], l); l.forEach(x => acc.push([n].concat(x))); }
  return acc;
}
const q = k => typeof k === 'number' ? '[' + k + ']' : '[' + JSON.stringify(k) + ']';
function post(pathArr, kind) {
  const file = pathArr[0], rest = pathArr.slice(1);
  if (!rest.length) { return kind === 'getter-that-throws' ? 'Object.defineProperty(window.VTES_DATA,"' + file + '",{get:function(){throw new Error("boom")},enumerable:true,configurable:true});' : 'window.VTES_DATA.' + file + '=' + KINDS[kind] + ';'; }
  let parent = 'window.VTES_DATA.' + file; rest.slice(0, -1).forEach(k => { parent += q(k); });
  const last = rest[rest.length - 1];
  return ';(function(){var P=' + parent + ';' + (kind === 'getter-that-throws' ? 'Object.defineProperty(P,' + JSON.stringify(last) + ',{get:function(){throw new Error("boom")},enumerable:true,configurable:true});' : 'P' + q(last) + '=' + KINDS[kind] + ';') + '})();';
}
function writeAll(dir, now, postBy) {
  const f = fresh(now);
  for (const k of FILES) { fs.writeFileSync(path.join(dir, 'data', 'vtes5-' + k + '.js'), L.wrap(k, f[k]) + ((postBy && postBy[k]) || '')); }
}
const RANK = { ok: 0, na: 1, neu: 1, unp: 1, bad: 2, stk: 2 };
const cls = c => { const m = (' ' + c + ' '); for (const n of ['stk', 'bad', 'neu', 'unp', 'na', 'ok']) { if (m.indexOf(' ' + n + ' ') >= 0) { return n; } } return 'ok'; };
const snap = p => p.evaluate(() => {
  const o = document.getElementById('v5overall'), items = [...document.querySelectorAll('.v5st[data-files], .pn .v5b:not([data-src])')].map(e => e.className), strip = [...document.querySelectorAll('.v5b[data-src]')].map(e => e.className);
  return { overall: o ? o.className : null, overallText: o ? o.textContent.slice(0, 110) : null, items, strip, rambo: !!document.getElementById('v5rambobtn'), readme: !!document.getElementById('v5read'), live: !!document.getElementById('livestatus'),
    failBox: document.body.innerText.indexOf('COULD NOT BE DRAWN') >= 0, watch: (document.getElementById('v5watch') || { style: {} }).style.display || '', unreadable: document.body.innerText.indexOf('UNREADABLE') >= 0 || document.body.innerText.indexOf('unreadable') >= 0,
    pwn: window.__pwn || null, storage: (function () { try { return localStorage.length + sessionStorage.length + document.cookie.length; } catch (e) { return 0; } })() };
});
function judge(s, label) {
  const f = [];
  if (!s.rambo || !s.readme || !s.live) { f.push(label + ': top block missing'); }
  if (!s.overall) { f.push(label + ': WHOLE PAGE line missing (paint never finished and no failure box)'); return f; }
  if (!/^WHOLE PAGE/.test(s.overallText || '')) { f.push(label + ': WHOLE PAGE line not painted: ' + s.overallText); }
  const worst = Math.max(0, ...s.items.map(c => RANK[cls(c)]), ...s.strip.map(c => RANK[cls(c)])), ov = RANK[cls(s.overall)];
  if (ov < worst) { f.push(label + ': WHOLE PAGE (rank ' + ov + ') greener than the worst card or mark (rank ' + worst + ')'); }
  if (s.pwn) { f.push(label + ': injected script ran'); }
  if (s.storage) { f.push(label + ': storage or cookie used'); }
  return f;
}
async function runCase(br, c) {
  const dir = stage(null), r = { name: c.name, fails: [] };
  writeAll(dir, NOWMS, c.post);
  if (c.extra) { c.extra(dir); }
  const pg = await open(br, dir, { settle: 500 }); const p = pg.p; let net = 0; p.on('request', rq => { if (/^https?:/.test(rq.url())) { net++; } });
  const s1 = await snap(p); r.atOpen = { overall: s1.overall, text: s1.overallText, failBox: s1.failBox }; r.fails.push(...judge(s1, 'at open'));
  // one more tick on the bad data
  await p.clock.fastForward(61000); await sleep(p, 700); const s2 = await snap(p); r.fails.push(...judge(s2, 'after 61 s'));
  r.pageErrors = pg.errs.length; if (pg.errs.length) { r.fails.push('uncaught page error: ' + pg.errs[0]); }
  // the data is fixed: recovery within one tick, no reload
  writeAll(dir, NOWMS + 61000 + 60000, {}); if (c.fix) { c.fix(dir); }
  await p.clock.fastForward(61000); await sleep(p, 900); const s3 = await snap(p); r.recovered = { overall: s3.overall, text: s3.overallText };
  r.fails.push(...judge(s3, 'after fix'));
  if (s3.failBox || s3.watch === 'block' || /NOT REFRESHING/.test(s3.overallText || '')) { r.fails.push('after fix: the page did not recover without a reload'); }
  if (s3.unreadable) { r.fails.push('after fix: still shows unreadable'); }
  r.net = net; if (net) { r.fails.push(net + ' network calls'); }
  r.pass = r.fails.length === 0; await pg.ctx.close(); return r;
}
function prng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function caseList() {
  const cs = [], fields = allFields();
  if (mode === 'typefuzz' || mode === 'all') { for (const f of fields) { for (const k of Object.keys(KINDS)) { cs.push({ name: 'typefuzz ' + f.join('.') + ' = ' + k, post: { [f[0]]: post(f, k) }, group: 'typefuzz' }); } } }
  if (mode === 'hand' || mode === 'all') {
    const H = [];
    const bodies = { missing: null, empty: '', throws: 'throw new Error("load failure");', syntax: 'window.VTES_DATA.X = {{{;', 'assign-then-throw': 'window.VTES_DATA.X = {"at":"2026-10-06T17:59:00Z"}; throw new Error("late");', 'whole-VTES_DATA-is-a-string': 'window.VTES_DATA = "text";', 'whole-VTES_DATA-is-an-array': 'window.VTES_DATA = [1,2,3];' };
    for (const n of FILES) { for (const b of Object.keys(bodies)) { H.push({ name: 'hand ' + n + ' ' + b, group: 'hand', extra: dir => { const f = path.join(dir, 'data', 'vtes5-' + n + '.js'); if (bodies[b] === null) { fs.unlinkSync(f); } else { fs.writeFileSync(f, bodies[b].replace('X', n)); } } }); } }
    for (const n of FILES) { H.push({ name: 'hand ' + n + ' is a directory', group: 'hand', extra: dir => { const f = path.join(dir, 'data', 'vtes5-' + n + '.js'); fs.unlinkSync(f); fs.mkdirSync(f); }, fix: dir => { const f = path.join(dir, 'data', 'vtes5-' + n + '.js'); try { fs.rmdirSync(f); } catch (e) { } fs.writeFileSync(f, L.wrap(n, fresh(NOWMS + 122000)[n])); } }); }
    const inj = '<img src=x onerror="window.__pwn=1"><script>window.__pwn=2</script>"\'`</td></tr>';
    for (const n of FILES) {
      const f = fresh(NOWMS)[n]; const paths = []; (function w(o, p) { if (Array.isArray(o)) { if (o.length) { w(o[0], p.concat(0)); } return; } if (o && typeof o === 'object') { for (const k of Object.keys(o)) { if (typeof o[k] === 'string' && k !== 'at') { paths.push(p.concat(k)); } w(o[k], p.concat(k)); } } })(f, []);
      const pathsAll = paths.length ? paths : [['writer']];
      const pp = pathsAll.map(x => { let parent = 'window.VTES_DATA.' + n; x.slice(0, -1).forEach(k => { parent += q(k); }); return ';(function(){var P=' + parent + ';P' + q(x[x.length - 1]) + '=' + JSON.stringify(inj) + ';})();'; }).join('');
      H.push({ name: 'hand ' + n + ' HTML injection in every text field', group: 'hand', post: { [n]: pp } });
      H.push({ name: 'hand ' + n + ' __proto__ and constructor keys', group: 'hand', post: { [n]: ';(function(){var o=window.VTES_DATA.' + n + ';var j=JSON.parse(\'{"__proto__":{"polluted":1},"constructor":{"x":1}}\');Object.keys(j).forEach(function(k){Object.defineProperty(o,k,{value:j[k],enumerable:true,configurable:true})});})();' } });
      H.push({ name: 'hand ' + n + ' at in the future (3 days)', group: 'hand', post: { [n]: 'window.VTES_DATA.' + n + '.at="' + new Date(NOWMS + 3 * 86400000).toISOString() + '";' } });
      H.push({ name: 'hand ' + n + ' at in the year 1970', group: 'hand', post: { [n]: 'window.VTES_DATA.' + n + '.at="1970-01-01T00:00:00Z";' } });
      H.push({ name: 'hand ' + n + ' at is a 2 MB string', group: 'hand', post: { [n]: 'window.VTES_DATA.' + n + '.at=new Array(2000001).join("9");' } });
    }
    cs.push(...H);
  }
  if (mode === 'random' || mode === 'all') {
    const rnd = prng(20261006), kinds = Object.keys(KINDS);
    for (let i = 0; i < 300; i++) {
      const n = 1 + Math.floor(rnd() * 3), postBy = {}, names = [];
      for (let j = 0; j < n; j++) { const f = fields[Math.floor(rnd() * fields.length)], k = kinds[Math.floor(rnd() * kinds.length)]; postBy[f[0]] = (postBy[f[0]] || '') + post(f, k); names.push(f.join('.') + '=' + k); }
      cs.push({ name: 'random #' + (i + 1) + ' ' + names.join(' + '), post: postBy, group: 'random' });
    }
  }
  return cs;
}
(async () => {
  const br = await chromium.launch(), cs = caseList(), res = [], t0 = Date.now(); let next = 0;
  async function worker() { while (next < cs.length) { const c = cs[next++]; let r; try { r = await runCase(br, c); } catch (e) { r = { name: c.name, pass: false, fails: ['test harness error: ' + e.message] }; } r.group = c.group; res.push(r); if (!r.pass) { console.log('FAIL ' + r.name + ' :: ' + r.fails.slice(0, 2).join(' | ')); } fs.writeFileSync(out + '.partial', JSON.stringify(res.length + ' of ' + cs.length + ' done')); } }
  await Promise.all(Array.from({ length: WORKERS }, worker)); await br.close();
  const groups = {}; res.forEach(r => { const g = groups[r.group] = groups[r.group] || { n: 0, pass: 0 }; g.n++; if (r.pass) { g.pass++; } });
  const pass = res.filter(r => r.pass).length, summary = pass + ' of ' + res.length + ' fuzz cases pass (' + Object.keys(groups).map(g => g + ' ' + groups[g].pass + ' of ' + groups[g].n).join('; ') + '), ' + Math.round((Date.now() - t0) / 1000) + ' s';
  fs.writeFileSync(out, JSON.stringify({ summary, groups, results: res.sort((a, b) => a.name < b.name ? -1 : 1) }, null, 1)); try { fs.unlinkSync(out + '.partial'); } catch (e) { } console.log(summary);
})();
