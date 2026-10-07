// ROUND 9 CHANGE (FIX-ROUND-9.md, older tests that changed): the CONFIRMED sentence no longer says 'by the desktop executor' (it names no executor, so that no line about saving names RAMBO); the test reads 'CONFIRMED as of'. Each allowed folder is still checked to be green.
// test-edge-r8.js - fix round 8, the cheap edge items of CHECK-9 Section C that remove a way to MISLEAD. TRK-2026-9910-B
//   e1  the local-folder check is an ALLOW rule: only C:\VTES-LOCAL\ and C:\AI\state\local\ (or a folder with who-checked and not-synced proof) is confirmed; Box, pCloud, MEGAsync, Nextcloud, DriveFS, 8.3 short names and the rest are refused
//   e2  Miami-Dade ids match exactly after trim ("101" is not source 01); when an id is listed twice the WORST row wins
//   e3  inherited and __proto__ keys are ignored by the sanitiser (values hidden under a __proto__ literal are not read)
//   e4  a time with no time zone is grey NO ZONE and never green
//   e15 status_dir_url must be a relative folder path: file://, http(s)://, UNC, a drive letter, "..", a leading slash are refused (no script is loaded from them)
//   e20 no sentence written for this page (Read me, notes, step lines) is longer than 25 words
// Usage: node test-edge-r8.js <out.json>   (env PKG = package folder to test)
const L = require('./test-v5-lib.js'); const { fs, path, stage, open, fresh, NOWMS, at, tick } = L; const OUT = process.argv[2] || 'test-edge-r8-RESULT.json';
const rows = []; const T = (g, n, ok, why) => { rows.push({ grp: g, name: n, ok: !!ok }); if (!ok) { console.log('FAIL', g, '|', n, '|', String(why || '').slice(0, 300)); } };
const lf = (label, extra) => { const f = fresh(NOWMS); f.heartbeat.local_only_folder = Object.assign({ ok: true, checked_at: at(30), label }, extra || {}); return f; };
const localState = p => p.evaluate(() => { const e = document.querySelector('.v5st[data-localfolder]'); return e ? { cls: e.className, txt: e.textContent } : null; });
(async () => {
  const br = await L.chromium.launch();
  // ---- e1
  const REFUSED = ['C:\\Users\\JV\\Box\\LOCAL', 'C:\\Users\\JV\\pCloud Drive\\x', 'C:\\Users\\JV\\MEGAsync\\x', 'C:\\Users\\JV\\Nextcloud\\x', 'C:\\Users\\JV\\AppData\\Local\\Google\\DriveFS\\x', 'C:\\Users\\JV\\ONEDRI~1\\x', 'C:\\PROGRA~1\\x', 'C:\\VTES-LOCAL-ONLY', 'C:\\Temp\\x', 'D:\\LOCAL', '\\\\pc\\share\\x', 'C:\\VTES-LOCAL\\..\\Users\\JV\\OneDrive', 'C:\\Users\\JV\\Desktop\\x', 'C:\\Users\\JV\\Documents\\x', 'G:\\My Drive\\x', 'C:\\VTES-LOCALX\\y', 'C:\\Users\\JV\\Sync\\x'];
  const CONFIRMED = ['C:\\VTES-LOCAL\\', 'C:\\VTES-LOCAL', 'c:\\vtes-local\\jobs', 'C:\\AI\\state\\local\\', 'C:\\AI\\state\\local\\jobs\\2026'];
  for (const label of REFUSED) { const { ctx, p } = await open(br, stage(lf(label))); const s = await localState(p); T('e1 refused', 'not confirmed: ' + label, s && /\bbad\b/.test(s.cls) && !/CONFIRMED as of/.test(s.txt), s && s.cls + ' ' + s.txt.slice(0, 80)); await ctx.close(); }
  for (const label of CONFIRMED) { const { ctx, p } = await open(br, stage(lf(label))); const s = await localState(p); T('e1 allowed', 'confirmed: ' + label, s && /\bok\b/.test(s.cls) && /CONFIRMED as of/.test(s.txt), s && s.cls + ' ' + s.txt.slice(0, 80)); await ctx.close(); }
  for (const [label, expectOk] of [['C:\\Weird\\Folder', true], ['C:\\Users\\JV\\Box\\x', false], ['C:\\Users\\JV\\ONEDRI~1\\x', false], ['C:\\Users\\JV\\OneDrive\\x', false]]) {
    const { ctx, p } = await open(br, stage(lf(label, { local_only_verified_by: 'RAMBO 2026-10-06', not_synced_proof: 'sync client list read: no sync app watches this folder' }))); const s = await localState(p);
    T('e1 proof', (expectOk ? 'with who-checked and proof, confirmed: ' : 'a cloud-looking or short name is refused even with proof: ') + label, s && (/\bok\b/.test(s.cls) === expectOk), s && s.cls + ' ' + s.txt.slice(0, 80)); await ctx.close();
  }
  // ---- e2
  const md = (list) => { const f = fresh(NOWMS); f.miamidade.sources = list; return f; };
  const okRow = id => ({ id, proof_ok: true, checked_at: at(60) }), badRow = id => ({ id, proof_ok: false, checked_at: at(60) });
  const full = except => Array.from({ length: 22 }, (_, i) => ('0' + (i + 1)).slice(-2)).filter(i => i !== except).map(okRow);
  const mdText = async (files) => { const { ctx, p } = await open(br, stage(files)); const t = await p.evaluate(() => [...document.querySelectorAll('#pn-miami li')].map(l => l.textContent)); await ctx.close(); return t; };
  { const t = await mdText(md(full('01').concat([okRow('101')]))); T('e2', 'id "101" does not turn source 01 green', /NOT RE-CHECKED/.test(t[0]) && !/proof checked/.test(t[0]), t[0].slice(-80)); }
  { const t = await mdText(md(full('01').concat([okRow(' 01 ')]))); T('e2', 'id " 01 " (spaces) is source 01', /proof checked/.test(t[0]), t[0].slice(-80)); }
  { const t = await mdText(md(full('01').concat([okRow('1')]))); T('e2', 'id "1" is source 01', /proof checked/.test(t[0]), t[0].slice(-80)); }
  { const t = await mdText(md(full('01').concat([okRow('0001')]))); T('e2', 'id "0001" is NOT source 01', /NOT RE-CHECKED/.test(t[0]), t[0].slice(-80)); }
  { const t = await mdText(md(full('01').concat([badRow('01'), okRow('1')]))); T('e2', 'listed twice (not ok, then ok): the worst row wins', /PROOF NOT OK/.test(t[0]) && !/proof checked/.test(t[0]), t[0].slice(-80)); }
  { const t = await mdText(md(full('01').concat([okRow('1'), badRow('01')]))); T('e2', 'listed twice (ok, then not ok): the worst row wins', /PROOF NOT OK/.test(t[0]) && !/proof checked/.test(t[0]), t[0].slice(-80)); }
  { const t = await mdText(md(full('01').concat([okRow('01'), { id: '01', proof_ok: true, checked_at: at(60 * 24 * 30) }]))); T('e2', 'listed twice (fresh, then 30 days old): the old row wins', /OLD/.test(t[0]) && !/proof checked/.test(t[0]), t[0].slice(-100)); }
  // ---- e3: values that sit under a __proto__ literal are not read
  const protoWorld = (name, good) => { const d = stage(fresh(NOWMS)); const own = JSON.stringify({ at: good.at, schema: 1 }), inh = JSON.stringify(Object.assign({}, good)); delete JSON.parse(inh).at;
    fs.writeFileSync(path.join(d, 'data', 'vtes5-' + name + '.js'), 'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.' + name + ' = {"at":' + JSON.stringify(good.at) + ',"schema":1,"__proto__":' + JSON.stringify(good.rest) + '};\n'); return d; };
  { const f = fresh(NOWMS), h = f.health; const d = protoWorld('health', { at: h.at, rest: { ok: true, checks_passed: 12, checks_total: 12, report_sent_at: h.report_sent_at } }); const { ctx, p } = await open(br, d);
    const r = await p.evaluate(() => { const b = document.querySelector('#v5dash .v5b[data-src="health"]'); return b ? b.className + ' | ' + b.textContent : ''; }); T('e3', 'a health file whose values sit under a __proto__ literal is not green', r && !/\bok\b/.test(r.split('|')[0]), r); await ctx.close(); }
  { const f = fresh(NOWMS), t = f.tokens; const d = protoWorld('tokens', { at: t.at, rest: { burn_per_hour: 41000, window_used_pct: 33, window_resets_at: t.window_resets_at, week_used_pct: 61, programs: t.programs } }); const { ctx, p } = await open(br, d);
    const r = await p.evaluate(() => { const b = document.querySelector('#v5dash .v5b[data-src="tokens"]'); return b ? b.className + ' | ' + b.textContent : ''; }); T('e3', 'a token file whose numbers sit under a __proto__ literal is not green', r && !/\bok\b/.test(r.split('|')[0]), r); await ctx.close(); }
  { const { ctx, p } = await open(br, stage(fresh(NOWMS))); const r = await p.evaluate(() => { const o = Object.create({ checks_passed: 5, checks_total: 5, ok: true }); o.at = new Date().toISOString(); o.schema = 1; const out = window.VTES5.sanitizeAll({ health: o }); return Object.keys(out.health || {}).join(','); }); T('e3', 'the sanitiser drops keys that are only inherited', !/checks_passed|ok/.test(r), r); await ctx.close(); }
  // ---- e4: no time zone = grey NO ZONE
  const strip = async (files, name) => { const { ctx, p } = await open(br, stage(files)); const r = await p.evaluate(n => { const b = document.querySelector('#v5dash .v5b[data-src="' + n + '"]'); return b ? { cls: b.className, txt: b.textContent } : null; }, name); await ctx.close(); return r; };
  const nz = ts => ts.replace(/(Z|[+-]\d\d:\d\d)$/, '');
  { const f = fresh(NOWMS); f.heartbeat.at = nz(at(1)); const r = await strip(f, 'heartbeat'); T('e4', 'heartbeat time with no zone: NO ZONE, never green (cards that depend on it, such as the LOCAL save line, may be red)', r && !/\bok\b/.test(r.cls) && /NO ZONE/.test(r.txt), r && r.cls + ' ' + r.txt.slice(0, 80)); }
  { const f = fresh(NOWMS); f.tokens.at = nz(at(1)); const r = await strip(f, 'tokens'); T('e4', 'token time with no zone: grey NO ZONE, not green', r && /\bna\b/.test(r.cls) && /NO ZONE/.test(r.txt), r && r.cls + ' ' + r.txt.slice(0, 80)); }
  { const f = fresh(NOWMS); f.bots.bots['CU-Orchestrator'].last_run_at = nz(at(3)); const { ctx, p } = await open(br, stage(f)); const r = await L.botCls(p, 'CU-Orchestrator'); T('e4', 'a bot last-run time with no zone: grey NO ZONE, not green', r && /\bunp\b|\bna\b/.test(r.cls) && /NO ZONE/.test(r.txt), r && r.cls + ' ' + r.txt.slice(0, 80)); await ctx.close(); }
  { const f = fresh(NOWMS); f.heartbeat.executors['LLM-01'].last_seen = nz(at(1)); const { ctx, p } = await open(br, stage(f)); const r = await L.stateCls(p, 'LLM-01'); T('e4', 'a window time with no zone: grey NO ZONE, not green', r && !/\bok\b/.test(r.cls) && /NO ZONE/.test(r.txt), r && r.cls + ' ' + r.txt.slice(0, 80)); await ctx.close(); }
  { const f = fresh(NOWMS); f.health.report_sent_at = nz(at(31)); const { ctx, p } = await open(br, stage(f)); const r = await p.evaluate(() => { const b = document.querySelector('#v5dash .v5b[data-src="health"]'); return b ? b.className : ''; }); T('e4', 'a daily-report time with no zone: the health strip entry is not green', r && !/\bok\b/.test(r), r); await ctx.close(); }
  { const f = fresh(NOWMS); const { ctx, p } = await open(br, stage(f)); const r = await strip(f, 'heartbeat'); T('e4', 'a time WITH a zone is still green (control)', r && /\bok\b/.test(r.cls), r && r.cls); await ctx.close(); }
  // ---- e15
  const cfgCases = [['file://other-pc/share/', false], ['file:///C:/x/', false], ['http://x/', false], ['https://x/', false], ['\\\\host\\share\\', false], ['C:/x/', false], ['C:\\x\\', false], ['../x/', false], ['a/../b/', false], ['/abs/', false], ['st/', true], ['st', true], ['sub/dir/', true]];
  for (const [url, good] of cfgCases) {
    const d = stage(fresh(NOWMS)); fs.writeFileSync(path.join(d, 'vtes5-config.js'), 'window.VTES5_CONFIG = ' + JSON.stringify({ status_dir_url: url }) + ';\n');
    const rel = url.replace(/\/*$/, '/'); if (good) { fs.mkdirSync(path.join(d, rel), { recursive: true }); fs.writeFileSync(path.join(d, rel, 'vtes-status.js'), 'window.VTES_STATUS = {};'); }
    const { ctx, p } = await open(br, d); const seen = []; ctx.on('request', r => { if (/vtes-status\.js/.test(r.url())) { seen.push(r.url()); } }); p.on('request', r => { if (/vtes-status\.js/.test(r.url())) { seen.push(r.url()); } });
    await p.evaluate(() => new Promise(res => window.VTES5.reload(res))); await p.waitForTimeout(300);
    T('e15', 'status_dir_url ' + JSON.stringify(url) + (good ? ': a relative folder is read' : ': refused, nothing is loaded from it'), good ? seen.length > 0 : seen.length === 0, seen.join(' ')); await ctx.close();
  }
  // ---- e20: sentence length
  { const { ctx, p } = await open(br, stage(fresh(NOWMS))); const texts = await p.evaluate(() => [...document.querySelectorAll('#v5read li, .v5note, .v5na2 > span, .v5na, .v5why, .gate, .v5ackmsg')].filter(e => !e.closest('.v5forrambo') && !e.classList.contains('v5forrambo')).map(e => e.textContent)); await ctx.close();
    const long = []; texts.forEach(t => t.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+(?=[A-Z0-9("'])/).forEach(s => { const w = s.trim().split(/\s+/).length; if (w > 25) { long.push(w + ' words: ' + s.slice(0, 90)); } }));
    T('e20', 'no Read me, note or step sentence is over 25 words (' + texts.length + ' text blocks read)', long.length === 0, long.join(' || ')); }
  await br.close();
  const bad = rows.filter(r => !r.ok).length, groups = {}; rows.forEach(r => { const g = groups[r.grp] = groups[r.grp] || { n: 0, ok: 0 }; g.n++; if (r.ok) { g.ok++; } });
  fs.writeFileSync(OUT, JSON.stringify({ test: 'test-edge-r8', pass: rows.length - bad, total: rows.length, groups, rows }, null, 1));
  Object.keys(groups).forEach(g => console.log('  ' + g + ': ' + groups[g].ok + ' of ' + groups[g].n));
  console.log('EDGE R8: ' + (rows.length - bad) + ' of ' + rows.length + ' pass'); process.exit(bad ? 1 : 0);
})();
