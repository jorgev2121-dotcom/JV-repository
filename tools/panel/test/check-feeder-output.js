// Loads feeder output files + the real package/vtes5-live.js in a fake window and reports what the page would show.
const fs = require('fs'), path = require('path'), vm = require('vm');
const [, , outDir, live] = process.argv;
const names = ['heartbeat', 'bots', 'state', 'health', 'tokens', 'housekeeping', 'miamidade'];
let fail = 0;
const ctx = { window: {}, console, Date, Math, JSON, Object, String, Number, Array, isNaN, isFinite, setTimeout, clearTimeout };
ctx.window.window = ctx.window; vm.createContext(ctx);
for (const n of names) {
  const f = path.join(outDir, 'vtes5-' + n + '.js'), buf = fs.readFileSync(f), txt = buf.toString('latin1');
  const asciiOk = !buf.some(b => b > 127), crOk = txt.indexOf('\r') < 0;
  const re = new RegExp('^window\\.VTES_DATA = window\\.VTES_DATA \\|\\| \\{\\}; window\\.VTES_DATA\\.' + n + ' = ([\\s\\S]*);\\n?$');
  const m = txt.match(re); let jsonOk = false, obj;
  if (m) { try { obj = JSON.parse(m[1]); jsonOk = obj && typeof obj === 'object' && !Array.isArray(obj); } catch (e) {} }
  const atOk = obj && typeof obj.at === 'string' && /(Z|[+-]\d{2}:\d{2})$/.test(obj.at) && obj.schema === 1 && typeof obj.writer === 'string';
  const ok = asciiOk && crOk && !!m && jsonOk && atOk;
  if (!ok) fail++;
  console.log((ok ? 'SHAPE OK  ' : 'SHAPE BAD ') + n, JSON.stringify({ asciiOk, crOk, wrapper: !!m, jsonOk, atOk }));
  vm.runInContext(txt.replace('window.VTES_DATA = window.VTES_DATA || {};', 'window.VTES_DATA = window.VTES_DATA || {};'), ctx);
}
ctx.window.VTES_DATA = ctx.window.VTES_DATA; ctx.VTES_DATA = ctx.window.VTES_DATA;
vm.runInContext('window = this.window;', ctx);
vm.runInContext(fs.readFileSync(live, 'utf8'), ctx);
const V = ctx.window.VTES5;
for (const n of names) {
  const bad = V.badCount(n), v = V.verdict(n);
  if (bad > 0) fail++;
  console.log('PAGE ' + n.padEnd(13) + ' unreadable=' + bad + '  ' + v.cls.toUpperCase() + ' ' + v.kind + ' | ' + v.text.slice(0, 150));
}
console.log('fileProblems', JSON.stringify(V.fileProblems()));
for (const id of ['LLM-01', 'LLM-06', 'LOCAL']) { const e = V.executor(id); console.log('CARD ' + id + ': ' + e.state + ' | ' + e.text); }
const bots = ctx.window.VTES_DATA.bots && ctx.window.VTES_DATA.bots.bots ? Object.keys(ctx.window.VTES_DATA.bots.bots) : [];
for (const b of ['CU-Inbox-Job-Watcher'].concat(bots)) { const r = V.bot(b); console.log('BOT ' + b + ': ' + r.state + ' | ' + r.text.slice(0, 140)); }
console.log(fail ? 'RESULT: FAIL (' + fail + ')' : 'RESULT: PASS - all 7 files have the strict shape and 0 unreadable values in the page sanitiser');
process.exit(fail ? 1 : 0);
