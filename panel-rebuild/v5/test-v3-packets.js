// test-v3-packets.js - every From-and-To packet pair of the REAL v3 page (12 x 12 = 144) must be word for word the same on v5, apart from the time stamp on the first line. TRK-2026-9910-B.
// Usage: node test-v3-packets.js <out.json>. The same page logic builds the packet (v3's own packet()); the test types the same note into both pages.
const L = require('./test-v5-lib.js'); const { fs, path, stage } = L; const OUT = process.argv[2] || 'test-v3-packets-RESULT.json';
const V3 = path.join(__dirname, '..', 'v3-live', 'VTES-LLM-LAUNCHER_v3.html');
(async () => {
  const br = await L.chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const d3 = fs.mkdtempSync(require('os').tmpdir() + '/v3p-'); fs.copyFileSync(V3, d3 + '/VTES-LLM-LAUNCHER_v3.html'); const d5 = stage(null);
  const mk = async f => { const ctx = await br.newContext({ viewport: { width: 1300, height: 900 } }); const p = await ctx.newPage(); await ctx.route(u => /^(https?|file:\/\/\/C:)/.test(u.toString()), r => r.abort()); await p.goto('file://' + f); await p.waitForTimeout(500); return { ctx, p }; };
  const a = await mk(d3 + '/VTES-LLM-LAUNCHER_v3.html'), b = await mk(d5 + '/VTES-LLM-LAUNCHER_v5.html');
  const ids = await a.p.$$eval('#from option', o => o.map(x => x.value)); const ids5 = await b.p.$$eval('#from option', o => o.map(x => x.value));
  const note = 'Test note: check the 2026 permit for 14598 SW 110 ST. Dictated, with "quotes" and an ampersand & a less-than <.';
  const run = async (p, f, t) => p.evaluate(([f, t, note]) => { document.getElementById('from').value = f; document.getElementById('to').value = t; document.getElementById('note').value = note; /* ROUND 7 CHANGE: v5 needs the confirmation tick for a non-LOCAL To (v3 has no such box); the tick is set the way a person does it */ const c = document.getElementById('v5ack'); if (c) { c.checked = false; c.dispatchEvent(new Event('change', { bubbles: true })); c.checked = true; c.dispatchEvent(new Event('change', { bubbles: true })); } window.refresh(); return document.getElementById('preview').value; }, [f, t, note]);
  const strip = s => s.split('\n').map((l, i) => i === 0 ? l.replace(/\)   .*$/, ')   <stamp>') : l).join('\n');
  let same = 0, total = 0; const bad = [];
  for (const f of ids) for (const t of ids) { total++; const x = strip(await run(a.p, f, t)), y = strip(await run(b.p, f, t)); if (x === y) { same++; } else { bad.push(f + '->' + t); } }
  const stampOk = /\)   Oct 6, \d{1,2}:\d{2} [AP]M E[DS]T$/.test((await run(b.p, 'LLM-04', 'LLM-01')).split('\n')[0]) || /\)   [A-Z][a-z]{2} \d{1,2}, \d{1,2}:\d{2} [AP]M E[DS]T$/.test((await run(b.p, 'LLM-04', 'LLM-01')).split('\n')[0]);
  console.log('v3 From entries: ' + ids.length + ', v5 From entries: ' + ids5.length + ' (v5 adds ' + ids5.filter(x => !ids.includes(x)).join(',') + ')');
  fs.writeFileSync(OUT, JSON.stringify({ pairs_total: total, pairs_identical: same, differing: bad, v3_entries: ids.length, v5_entries: ids5.length, v5_stamp_has_eastern_zone: stampOk }, null, 1));
  console.log('PACKETS: ' + same + ' of ' + total + ' From-and-To pairs identical to v3 apart from the stamp; v5 stamp has an Eastern zone: ' + stampOk);
  await br.close(); process.exit(same === total && stampOk ? 0 : 1);
})();
