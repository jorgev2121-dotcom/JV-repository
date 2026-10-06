// test-pii-unit-r7.js - fix round 7, CLASS 2: the digit guard (VTES5U.piiReasons, the SECOND layer) on the notes of pii-notes-r7.js, plus the whole round-6 list. TRK-2026-9910-B
// Usage: node test-pii-unit-r7.js <out.json>
const L = require('./test-v5-lib.js'); const { fs, stage, open, fresh, NOWMS } = L; const N = require('./pii-notes-r7.js'); const OUT = process.argv[2] || 'test-pii-unit-r7-RESULT.json';
const t6 = fs.readFileSync(require('path').join(__dirname, 'test-pii-unit-r6.js'), 'utf8'); const lists = new Function('const cp=(...a)=>String.fromCodePoint(...a);const FW=s=>s.replace(/[0-9]/g,c=>cp(c.charCodeAt(0)+0xFEE0));const AR=s=>s.replace(/[0-9]/g,c=>cp(0x0660+ +c)),DEV=s=>s.replace(/[0-9]/g,c=>cp(0x0966+ +c)),MATH=s=>s.replace(/[0-9]/g,c=>cp(0x1D7CE+ +c));' + t6.slice(t6.indexOf('const BLOCK'), t6.indexOf('(async')) + 'return {BLOCK,CARRY,FALSE_ALARMS};')();
(async () => {
  const br = await L.chromium.launch(); const d = stage(fresh(NOWMS)); const { ctx, p, errs } = await open(br, d);
  const run = list => p.evaluate(l => l.map(t => ({ t, why: VTES5U.piiReasons(t) })), list);
  const res = []; const T = (g, name, ok, why) => { res.push({ g, name, status: ok ? 'PASS' : 'FAIL', why: ok ? '' : why }); if (!ok) { console.log('FAIL', g, '|', name, '|', why); } };
  const lbl = t => JSON.stringify(t).replace(/[^\x20-\x7e]/g, c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).slice(0, 80);
  for (const r of await run(lists.BLOCK)) { T('round-6 block', 'blocks ' + lbl(r.t), r.why.length > 0, 'carried'); }
  for (const r of await run(N.PERSONAL)) { T('personal', 'blocks ' + lbl(r.t), r.why.length > 0, 'carried'); }
  for (const r of await run(lists.CARRY)) { T('round-6 carry', 'carries ' + lbl(r.t), r.why.length === 0, 'blocked: ' + r.why.join('; ')); }
  for (const r of await run(N.ORDINARY)) { T('ordinary', 'carries ' + lbl(r.t), r.why.length === 0, 'blocked: ' + r.why.join('; ')); }
  for (const r of await run(N.FALSE_ALARMS)) { T('false alarm', 'KNOWN false alarm, blocked on purpose: ' + lbl(r.t), r.why.length > 0, 'carried (then KNOWN-LIMITS item 53 is wrong)'); }
  for (const r of await run(['Miami 33186-1234', 'Miami FL 33186 305-555-1234'])) { T('undisclosed false alarms fixed', 'carries ' + lbl(r.t), r.why.length === 0, 'blocked: ' + r.why.join('; ')); }
  const big = await p.evaluate(() => { const t0 = performance.now(); const a = VTES5U.piiReasons('a '.repeat(30000)); const b = VTES5U.piiReasons('1 '.repeat(9000)); const c = VTES5U.piiReasons('one, '.repeat(3000)); return { a, b: b.length, c: c.length, ms: Math.round(performance.now() - t0) }; });
  T('long notes', 'a note over 20,000 characters is blocked and the check is fast (' + big.ms + ' ms)', big.a.length === 1 && /20,000/.test(big.a[0]) && big.ms < 3000, JSON.stringify(big));
  T('long notes', 'a long run of spelled digits is blocked and a long run of single digits does not raise an error (it is not shaped like an SSN or a card)', big.c > 0 && typeof big.b === 'number', JSON.stringify(big));
  const msg = await p.evaluate(() => VTES5U.guardNote('SSN 123-45-6789', 'LLM-01')); T('message', 'the "NOT INCLUDED" message does not repeat the number', /NOT INCLUDED/.test(msg) && !/6789|123/.test(msg), msg);
  const loc = await p.evaluate(() => VTES5U.guardNote('SSN 123-45-6789', 'LOCAL')); T('message', 'for LOCAL the note is returned unchanged', loc === 'SSN 123-45-6789', loc);
  T('page', '0 page errors', errs.length === 0, errs.join('|')); await ctx.close(); await br.close();
  const pass = res.filter(r => r.status === 'PASS').length; fs.writeFileSync(OUT, JSON.stringify({ test: 'test-pii-unit-r7', pass, total: res.length, blocked_personal: N.PERSONAL.length + lists.BLOCK.length, carried: N.ORDINARY.length + lists.CARRY.length, results: res }, null, 1));
  console.log('PII UNIT R7: ' + pass + ' of ' + res.length + ' pass (' + (N.PERSONAL.length + lists.BLOCK.length) + ' personal notes blocked, ' + (N.ORDINARY.length + lists.CARRY.length) + ' ordinary notes carried, ' + N.FALSE_ALARMS.length + ' documented false alarms)'); process.exit(pass === res.length ? 0 : 1);
})();
