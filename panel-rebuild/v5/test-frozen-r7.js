// test-frozen-r7.js - CHECK-8 flaw 1 ("one malformed list freezes the page with stale green"): the checker's scenarios, re-created. TRK-2026-9910-B
// Run: node test-frozen-r7.js <result.json>   (PKG=<package dir> to test another copy). Each scenario: (A) page opens GREEN, a writer then writes the bad shape, the clock runs on 41 minutes and 3 h 41 min,
// ONLY the bad file is rewritten at each step (as in CHECK-8: the other files are not refreshed, so they go stale and their cards turn red); (B) the bad file is there at open, then it is fixed and the page must recover within 60 s WITHOUT a reload.
const L = require('./test-v5-lib.js'), { fs, path, chromium, at, NOWMS, fresh, stage, sleep, open } = L;
const out = process.argv[2];
const CASES = [
  ['tokens.programs = one object', 'tokens', d => { d.programs = { name: 'x', tokens_today: 5 }; }],
  ['state.money = one object', 'state', d => { d.money = { item: 'i', status: 's' }; }],
  ['miamidade.sources = one object', 'miamidade', d => { d.sources = { id: '01', proof_ok: true, checked_at: new Date(NOWMS).toISOString() }; }],
  ['state.repairs = one object', 'state', d => { d.repairs = { id: 'R', text: 't', status: 'OPEN' }; }],
  ['state.repairs = [null]', 'state', d => { d.repairs = [null]; }],
  ['tokens.programs = [{}]', 'tokens', d => { d.programs = [{}]; }],
  ['state.money = [null]', 'state', d => { d.money = [null]; }],
  ['miamidade.sources = [null]', 'miamidade', d => { d.sources = [null]; }],
  ['tokens.programs = "text"', 'tokens', d => { d.programs = 'text'; }],
  ['heartbeat.executors = array', 'heartbeat', d => { d.executors = [1, 2]; }],
  ['bots.bots = array', 'bots', d => { d.bots = [{}]; }]
];
const GETTER = ['tokens.programs throws when read', 'tokens', 'tokens', 'Object.defineProperty(window.VTES_DATA.tokens,"programs",{get:function(){throw new Error("boom")},enumerable:true});'];
function writeAll(dir, now, files, post, only) {
  const f = fresh(now); for (const k of Object.keys(files)) f[k] = files[k];
  for (const k of Object.keys(f)) { if (only && only.indexOf(k) < 0) { continue; } let txt = L.wrap(k, f[k]); if (post && post[k]) txt += post[k]; fs.writeFileSync(path.join(dir, 'data', 'vtes5-' + k + '.js'), txt); }
}
const snap = p => p.evaluate(() => {
  const o = document.getElementById('v5overall'), strip = [...document.querySelectorAll('.v5b[data-src]')].map(b => b.className.replace('v5b ', '')),
    cards = [...document.querySelectorAll('.v5st[data-state]')].map(e => e.className.replace('v5st ', '')), age = document.getElementById('v5age2');
  return { overall: o ? o.className.replace('v5b ', '') : 'MISSING', overallText: o ? o.textContent.slice(0, 90) : '', strip, redCards: cards.filter(c => c === 'bad' || c === 'stk').length, cards: cards.length,
    rambo: !!document.getElementById('v5rambobtn'), readme: !!document.getElementById('v5read'), live: !!document.getElementById('livestatus'), recheck: age ? age.textContent : null, errs: window.__v5errs || 0,
    watch: (document.getElementById('v5watch') || {}).style ? document.getElementById('v5watch').style.display : null };
});
(async () => {
  const br = await chromium.launch(); const res = [];
  const all = CASES.concat([GETTER]);
  for (const c of all) {
    const isGet = c.length === 4, name = c[0], file = c[1];
    for (const mode of ['A-open-green-then-bad', 'B-bad-at-open-then-fixed']) {
      const dir = stage(null); const r = { name, mode };
      const mk = (now) => { const f = fresh(now), post = {}; if (isGet) { post[file] = c[3]; } else { c[2](f[file]); } return { f, post }; };
      if (mode[0] === 'A') {
        writeAll(dir, NOWMS, {}); const pg = await open(br, dir); const p = pg.p;
        r.before = await snap(p);
        const later = NOWMS + 41 * 60000; { const m = mk(later); writeAll(dir, later, { [file]: m.f[file] }, m.post, [file]); } await p.clock.fastForward(41 * 60000); await sleep(p, 1200); r.at41 = await snap(p);
        const later2 = NOWMS + (3 * 60 + 41) * 60000; { const m = mk(later2); writeAll(dir, later2, { [file]: m.f[file] }, m.post, [file]); } await p.clock.fastForward(3 * 3600000); await sleep(p, 1200); r.at341 = await snap(p);
        await pg.ctx.close();
      } else {
        { const m = mk(NOWMS); writeAll(dir, NOWMS, { [file]: m.f[file] }, m.post); }
        const pg = await open(br, dir); const p = pg.p; r.atOpen = await snap(p);
        writeAll(dir, NOWMS + 60000, {}); await p.clock.fastForward(61000); await sleep(p, 1200); r.afterFix = await snap(p); r.pageErrors = pg.errs.length;
        await pg.ctx.close();
      }
      // verdicts. FROZEN-GREEN = the page says green (overall ok or MISSING with green strip) while at least one card is red. MISSING top block at open = broken.
      const worse = s => !s ? 0 : ((s.overall === 'ok' || s.overall === 'MISSING') && (s.strip.some(x => x === 'ok') || s.overall === 'MISSING') && s.redCards > 0 ? 1 : 0);
      if (mode[0] === 'A') { r.frozenGreen = [r.at41, r.at341].some(worse); r.pass = !r.frozenGreen; }
      else { r.topMissing = !(r.atOpen.rambo && r.atOpen.readme && r.atOpen.live); r.frozenGreen = worse(r.atOpen); r.recovered = r.afterFix.overall !== 'MISSING' && !/NOT REFRESHING/.test(r.afterFix.overallText) && r.afterFix.errs === 0; r.pass = !r.topMissing && !r.frozenGreen && r.recovered; }
      res.push(r); console.log((r.pass ? 'PASS ' : 'FAIL ') + name + ' / ' + mode);
    }
  }
  await br.close();
  const n = res.filter(r => r.pass).length; const summary = n + ' of ' + res.length + ' frozen-page scenarios pass';
  fs.writeFileSync(out || 'test-frozen-r7-RESULT.json', JSON.stringify({ summary, results: res }, null, 1)); console.log(summary);
})();
