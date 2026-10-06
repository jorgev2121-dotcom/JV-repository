// test-pii-unit-r8.js - fix round 8, flaw 1: the digit guard on its own (VTES5U.piiReasons), without any button. TRK-2026-9910-B
// PERSONAL (137 notes: the round-7 forms plus the spellings CHECK-9 carried) must all be caught; ORDINARY (52) must all be carried; FALSE_ALARMS (6) are blocked on purpose (disclosed in KNOWN-LIMITS);
// MISSES (8, each with a category the Read me must name) are the spellings the guard still cannot catch: they are listed, not counted as failures; if one becomes caught the list is out of date and that is reported.
// Usage: node test-pii-unit-r8.js <out.json>   (env PKG = package folder to test)
const L = require('./test-v5-lib.js'); const { fs, stage, open, fresh, NOWMS } = L; const N = require('./pii-notes-r8.js'); const OUT = process.argv[2] || 'test-pii-unit-r8-RESULT.json';
(async () => {
  const br = await L.chromium.launch(); const { ctx, p, errs } = await open(br, stage(fresh(NOWMS)));
  const run = a => p.evaluate(a => a.map(t => window.VTES5U.piiReasons(t)), a);
  const per = await run(N.PERSONAL), ord = await run(N.ORDINARY), fa = await run(N.FALSE_ALARMS), mis = await run(N.MISSES.map(m => m.t));
  const missedPersonal = N.PERSONAL.filter((t, i) => !per[i].length), alarms = N.ORDINARY.filter((t, i) => per && ord[i].length), stillMiss = N.MISSES.filter((m, i) => !mis[i].length), nowCaught = N.MISSES.filter((m, i) => mis[i].length);
  const faBlocked = N.FALSE_ALARMS.filter((t, i) => fa[i].length);
  missedPersonal.forEach(t => console.log('FAIL personal note carried:', JSON.stringify(t).slice(0, 100))); alarms.forEach(t => console.log('FAIL ordinary note blocked:', JSON.stringify(t).slice(0, 100)));
  // 20,000-character limit and speed
  const big = await p.evaluate(() => { const t0 = Date.now(), a = window.VTES5U.piiReasons('word '.repeat(3999)), t1 = Date.now(), b = window.VTES5U.piiReasons('x'.repeat(20001)); return { ms: t1 - t0, over: b.length > 0, ok: a.length === 0 }; });
  const rows = [['personal notes caught', N.PERSONAL.length - missedPersonal.length, N.PERSONAL.length], ['ordinary notes carried', N.ORDINARY.length - alarms.length, N.ORDINARY.length], ['disclosed false alarms still blocked', faBlocked.length, N.FALSE_ALARMS.length], ['a note over 20,000 characters is blocked, a 20,000-character ordinary note is carried', big.over && big.ok ? 1 : 0, 1], ['page errors', errs.length === 0 ? 1 : 0, 1]];
  const pass = rows.reduce((a, r) => a + r[1], 0), total = rows.reduce((a, r) => a + r[2], 0);
  fs.writeFileSync(OUT, JSON.stringify({ test: 'test-pii-unit-r8', rows, misses_listed: N.MISSES.length, misses_still_missed: stillMiss.length, misses_now_caught: nowCaught.map(m => m.t), ms_for_20000_chars: big.ms, pass, total }, null, 1));
  rows.forEach(r => console.log('  ' + r[0] + ': ' + r[1] + ' of ' + r[2])); console.log('  known misses still missed: ' + stillMiss.length + ' of ' + N.MISSES.length + (nowCaught.length ? ' (NOW CAUGHT, update the list: ' + nowCaught.map(m => JSON.stringify(m.t)).join(', ') + ')' : '') + '; 20,000 characters took ' + big.ms + ' ms');
  console.log('PII UNIT R8: ' + pass + ' of ' + total + ' pass'); await ctx.close(); await br.close(); process.exit(pass === total ? 0 : 1);
})();
