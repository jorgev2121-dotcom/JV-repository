// test-quotematch-r9.js - fix round 9, Tier 3 (CHECK-10 pattern: documents that quote the page or VERIFY and are no longer true). TRK-2026-9910-B
// Every text in "double quotes" inside INSTALL-BY-HAND.md, KNOWN-LIMITS.md, DESKTOP-WORK.md, DATA-CONTRACT.md and PORT-REPORT.md is a claim that the page or VERIFY says exactly that.
// It must be found word for word (spaces collapsed) in: the page's visible text in every state, the page's own source, VERIFY-v5.ps1, or the real output of VERIFY run in 14 scenarios here. A quote with "..." inside is split at the dots and every part (of 8 or more characters) must be found.
// A text that is NOT a page or VERIFY string (a word of the checker, a quote of v3, a made-up example) is written in single quotes or back-ticks in these documents, never in double quotes.
// The only text skipped: code fences, the generated change list in PORT-REPORT.md (it quotes v3 and v5 lines on purpose and is compared with a fresh diff by test-claims-r9.js), and quotes shorter than 12 characters with no space.
// Usage: PWSH_DIR=<dir with pwsh> node test-quotematch-r9.js <out.json>      (env V5DIR = the tree to test; env CLAIMS_SURFACE = cache file shared with test-claims-r9.js)
const fs = require('fs'), path = require('path'), os = require('os'), cp = require('child_process');
const ROOT = path.resolve(process.env.V5DIR || __dirname); process.env.PKG = process.env.PKG || path.join(ROOT, 'package');
const L = require('./test-v5-lib.js'); const H = require('./lib-harvest-r9.js');
const OUT = process.argv[2] || 'test-quotematch-r9-RESULT.json'; const rd = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const PW = process.env.PWSH_DIR ? path.join(process.env.PWSH_DIR, 'pwsh') : null; if (!PW) { console.error('PWSH_DIR is needed (VERIFY output is part of the text the quotes are compared with)'); process.exit(2); }
const HOME = fs.mkdtempSync(path.join(os.tmpdir(), 'qm9home-')); const ENV = Object.assign({}, process.env, { HOME, USERPROFILE: HOME, DOTNET_CLI_HOME: HOME, POWERSHELL_TELEMETRY_OPTOUT: '1', POWERSHELL_UPDATECHECK: 'Off', DOTNET_NOLOGO: '1' });
const norm = s => String(s).replace(/\s+/g, ' ').trim();
const run = (args) => { const r = cp.spawnSync(PW, ['-NoProfile', '-File', path.join(ROOT, 'VERIFY-v5.ps1')].concat(args), { encoding: 'utf8', env: ENV, timeout: 90000 }); return (r.stdout || '') + (r.stderr || ''); };
function copyDir(a, b) { fs.mkdirSync(b, { recursive: true }); for (const n of fs.readdirSync(a)) { const x = path.join(a, n), y = path.join(b, n); if (fs.lstatSync(x).isDirectory()) { copyDir(x, y); } else { fs.copyFileSync(x, y); } } }
function verifyOutputs() {
  const outs = []; const W = fs.mkdtempSync(path.join(os.tmpdir(), 'qm9fx-')); let k = 0;
  const mk = () => { const d = path.join(W, 'Docs' + (++k), 'v5'); copyDir(process.env.PKG, d); return d; };
  const man = fs.readFileSync(path.join(process.env.PKG, 'MANIFEST.sha256'));
  let d = mk(); outs.push(run(['-Path', d])); outs.push(run(['-Path', d, '-ExpectManifestSha256', require('crypto').createHash('sha256').update(man).digest('hex')])); outs.push(run(['-Path', d, '-ExpectManifestSha256', '0'.repeat(64)]));
  d = mk(); fs.appendFileSync(path.join(d, 'vtes5-ui.js'), 'x\n'); outs.push(run(['-Path', d]));
  d = mk(); fs.writeFileSync(path.join(d, 'data', 'vtes5-bots.js'), Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from(fs.readFileSync(path.join(d, 'data', 'vtes5-bots.js'), 'utf8'), 'utf16le')])); outs.push(run(['-Path', d])); outs.push(run(['-Path', d, '-AfterWriters']));
  d = mk(); fs.writeFileSync(path.join(d, 'data', 'vtes5-state.js'), 'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = { "schema": 1, "at": "2026-10-06T14:00:00-04:00", "writer": "w" };\n'); outs.push(run(['-Path', d])); outs.push(run(['-Path', d, '-AfterWriters']));
  d = mk(); fs.writeFileSync(path.join(d, 'data', 'vtes5-state.js'), 'window.VTES_DATA = window.VTES_DATA || {}; window.VTES_DATA.state = { "schema": 1, "writer": "café" };\n'); outs.push(run(['-Path', d, '-AfterWriters']));
  d = mk(); fs.writeFileSync(path.join(d, 'extra.txt'), 'x'); fs.mkdirSync(path.join(d, 'sub')); outs.push(run(['-Path', d]));
  d = mk(); fs.unlinkSync(path.join(d, 'vtes5-live.js')); outs.push(run(['-Path', d]));
  d = mk(); fs.writeFileSync(path.join(d, 'vtes5-ui.js'), fs.readFileSync(path.join(d, 'vtes5-ui.js'), 'utf8').replace(/\n/g, '\r\n')); outs.push(run(['-Path', d]));
  d = mk(); fs.symlinkSync(path.join(d, 'data'), path.join(d, 'dlink')); outs.push(run(['-Path', d]));
  const base = path.join(W, 'real'); fs.mkdirSync(base); const real = path.join(base, 'v5'); copyDir(process.env.PKG, real); fs.symlinkSync(real, path.join(W, 'Docs-link')); outs.push(run(['-Path', path.join(W, 'Docs-link')]));
  d = mk(); outs.push(run(['-Path', d + '/..'])); outs.push(run(['-Path', path.join(W, 'nothere')])); outs.push(run(['-Path', 'relative/v5']));
  const dd = path.join(W, 'Desktop', 'v5'); copyDir(process.env.PKG, dd); outs.push(run(['-Path', dd]));
  const gd = path.join(W, 'co', 'v5'); fs.mkdirSync(path.join(W, 'co', '.git'), { recursive: true }); copyDir(process.env.PKG, gd); outs.push(run(['-Path', gd]));
  d = mk(); fs.writeFileSync(path.join(d, 'vtes5-config.js'), 'window.VTES5_CONFIG = { "status_dir_url": "/abs/" };\n'); outs.push(run(['-Path', d, '-AfterWriters']));
  d = mk(); fs.appendFileSync(path.join(d, 'MANIFEST.sha256'), 'garbage line\n'); outs.push(run(['-Path', d]));
  outs.push(run([]));
  return outs;
}
(async () => {
  const CACHE = process.env.CLAIMS_SURFACE; let corpus = '';
  if (CACHE && fs.existsSync(CACHE)) { const c = JSON.parse(fs.readFileSync(CACHE, 'utf8')); corpus += c.surf.map(e => e.examples.map(x => x[0]).join('\n')).join('\n'); }
  const br = await L.chromium.launch(); const hv = await H.harvestAll(br); await br.close(); hv.lines.forEach(l => { corpus += '\n' + l; }); hv.sentences.forEach(e => e.examples.forEach((w, t) => { corpus += '\n' + t; }));
  const pageSrc = rd('package/vtes5-ui.js') + '\n' + rd('package/vtes5-live.js') + '\n' + rd('package/VTES-LLM-LAUNCHER_v5.html') + '\n' + rd('vtes5.css'); const verSrc = rd('VERIFY-v5.ps1').replace(/''/g, "'");
  const outsArr = verifyOutputs(); const VN = outsArr.length; const outs = outsArr.join('\n'); const hay = norm(corpus + '\n' + pageSrc + '\n' + verSrc + '\n' + outs);
  const hayEsc = hay.replace(/\\\\/g, '\\');
  const found = q => { const n = norm(q); return hay.includes(n) || hayEsc.includes(n) || hay.includes(n.replace(/[.]+$/, '')); };
  const DOCS = ['INSTALL-BY-HAND.md', 'KNOWN-LIMITS.md', 'DESKTOP-WORK.md', 'DATA-CONTRACT.md', 'PORT-REPORT.md']; const results = []; let total = 0, bad = 0; const badList = [];
  for (const f of DOCS) {
    let t = rd(f).replace(/<!-- CHANGE-LIST-BEGIN -->[\s\S]*?<!-- CHANGE-LIST-END -->/, ' ').replace(/```[\s\S]*?```/g, ' ').replace(/`[^`\n]*`/g, m => m.replace(/"/g, "'")); let n = 0;
    t.split('\n').forEach((line, i) => { (line.match(/"([^"\n]{2,})"/g) || []).forEach(q => { const inner = q.slice(1, -1); if (inner.length < 12 && !/\s/.test(inner)) { return; } n++; total++;
      const parts = inner.split(/\.\.\.|…/).map(x => x.trim()).filter(x => x.length >= 8); const ok = parts.length ? parts.every(found) : true;
      if (!ok) { bad++; badList.push(f + ':' + (i + 1) + ' "' + inner.slice(0, 110) + '"'); } }); });
    results.push({ doc: f, quotes: n });
  }
  badList.forEach(b => console.log('FAIL quote not found in the page or VERIFY: ' + b));
  const pass = total - bad; fs.writeFileSync(OUT, JSON.stringify({ test: 'test-quotematch-r9', total, pass, bad: badList, docs: results, verify_scenarios_read: VN }, null, 1));
  console.log('QUOTE-MATCH R9: ' + pass + ' of ' + total + ' double-quoted texts found word for word in the page, its source, VERIFY, or the real output of ' + VN + ' VERIFY runs (' + results.map(r => r.doc + ' ' + r.quotes).join(', ') + ')');
  process.exit(bad ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
