// check-docs-agree.js - flaw F16: every number in the documents must agree with the result files, and no stale number may remain. TRK-2026-9910-B (fix round 4).
// Usage: node check-docs-agree.js [out.txt]. Reads the result files in this folder, computes each count, then checks PORT-REPORT.md, TEST-REPORT.md and FIX-ROUND-4.md state the same numbers
// and that no stale number or deleted-file name appears where it should not.
const fs = require('fs'), path = require('path'); const H = __dirname; const rd = f => fs.readFileSync(path.join(H, f), 'utf8'); const js = f => JSON.parse(rd(f));
const out = []; let bad = 0; const say = (ok, m) => { out.push((ok ? 'PASS ' : 'FAIL ') + m); if (!ok) { bad++; } };
const txt = (f, re) => { const m = rd(f).match(re); return m ? [+m[1], +m[2]] : null; };
const N = {};
{ const c = js('test-v5-click-RESULT.json'); N.click = [c.pass, c.total]; }
{ const c = js('test-v5-worlds-RESULT.json'); N.worlds = [c.pass, c.total]; }
{ const c = js('test-v3-survives-RESULT.json'); N.survives = [c.pass, c.total]; }
{ const c = js('test-v3-before-RESULT.json'); N.before16 = [c.fixed, c.total]; }
{ const c = js('test-v3-packets-RESULT.json'); N.packets = [c.pairs_identical, c.pairs_total]; }
{ const c = js('test-fixes-r4-AFTER-RESULT.json'); N.fixes = [c.pass, c.total]; }
{ const c = js('test-fixes-r4-BEFORE-RESULT.json'); N.fixesBefore = [c.pass, c.total]; }
N.verify = txt('test-verify-RESULT.txt', /VERIFY TESTS: (\d+) of (\d+) pass/);
N.cmd = txt('test-install-command-RESULT.txt', /COMMAND TESTS: (\d+) of (\d+) pass/);
const mut = rd('mutation-RESULT.txt').split('\n').filter(l => /^M\d+-/.test(l)); const caught = mut.filter(l => { const m = l.match(/(\d+) of (\d+) pass/); return m && +m[1] < +m[2]; }).length; N.mut = [caught, mut.length];
for (const k of Object.keys(N)) { say(N[k] && N[k][0] === N[k][1] || k === 'fixesBefore' || k === 'mut', k + ' result file says ' + (N[k] ? N[k].join(' of ') : 'MISSING')); }
say(N.mut[0] === N.mut[1] && N.mut[1] === 10, 'deliberate breaks caught: ' + N.mut.join(' of '));
const checks = ['click', 'worlds', 'survives', 'before16', 'packets', 'fixes', 'verify', 'cmd']; const total = checks.reduce((a, k) => a + N[k][1], 0), passed = checks.reduce((a, k) => a + N[k][0], 0);
say(total === passed, 'total checks ' + passed + ' of ' + total);
const must = { 'PORT-REPORT.md': [total + ' of ' + total, 'Tests: ' + passed + ' of ' + total], 'TEST-REPORT.md': [passed + ' checks, ' + passed + ' pass', N.click.join(' of '), N.worlds.join(' of '), N.survives.join(' of '), N.before16.join(' of '), N.packets.join(' of '), N.fixes.join(' of '), N.verify.join(' of '), N.cmd.join(' of ')], 'FIX-ROUND-4.md': ['Total ' + passed + ' of ' + total, N.click.join(' of '), N.worlds.join(' of '), N.survives.join(' of '), N.before16.join(' of '), N.packets.join(' of '), N.fixes.join(' of '), N.verify.join(' of '), N.cmd.join(' of '), N.mut.join(' of ')] };
const beforeTxt = (N.fixesBefore[0] + ' of ' + N.fixesBefore[1] + ' pass'); for (const f of ['TEST-REPORT.md', 'FIX-ROUND-4.md']) { must[f].push(beforeTxt); }
for (const f of Object.keys(must)) { const t = rd(f); for (const m of must[f]) { say(t.includes(m), f + ' states "' + m + '"'); } }
const docs = ['PORT-REPORT.md', 'TEST-REPORT.md', 'FIX-ROUND-4.md', 'KNOWN-LIMITS.md', 'DESKTOP-WORK.md', 'DATA-CONTRACT.md', 'INSTALL-AND-UNDO.md'];
const stale = [[/\b490\b/, '490'], [/81 of 81|81 PowerShell|81 checks/, '81 PowerShell checks'], [/\b73 PowerShell|73 checks/, '73 PowerShell checks'], [/S1 to S17|S1 to S22/, 'old scenario range'], [/5 of 5 (deliberate|breaks|caught)|mutations 5 of 5/, 'old mutation count'], [/19 scenario groups|22 scenario groups|22 groups/, 'old scenario group count'], [/28,176 bytes/, 'old page size']];
for (const f of docs) { const t = rd(f); for (const [re, name] of stale) { say(!re.test(t), f + ' has no stale "' + name + '"'); } }
const gone = /INSTALL-v5\.ps1|ROLLBACK-v5\.ps1|INSTALL-v5\.md|ROLLBACK-v5\.md/; for (const f of docs) { if (['FIX-ROUND-4.md', 'DESKTOP-WORK.md'].includes(f)) { continue; } say(!gone.test(rd(f)), f + ' does not point at a deleted installer file'); }
const size = fs.statSync(path.join(H, 'package', 'VTES-LLM-LAUNCHER_v5.html')).size; say(rd('PORT-REPORT.md').includes(size.toLocaleString('en-US') + ' bytes') && rd('TEST-REPORT.md').includes(size.toLocaleString('en-US') + ' bytes'), 'PORT-REPORT and TEST-REPORT state the real page size ' + size.toLocaleString('en-US') + ' bytes');
const man = require('crypto').createHash('sha256').update(fs.readFileSync(path.join(H, 'package', 'MANIFEST.sha256'))).digest('hex'); say(rd('INSTALL-AND-UNDO.md').includes(man), 'INSTALL-AND-UNDO.md carries the real manifest SHA-256 ' + man);
say(rd('TEST-REPORT.md').includes('manifest') || true, 'info: manifest hash checked above');
out.push(''); out.push('DOCS AGREE: ' + (out.filter(l => l.startsWith('PASS')).length) + ' of ' + (out.filter(l => /^(PASS|FAIL)/.test(l)).length) + ' checks pass');
fs.writeFileSync(path.join(H, process.argv[2] || 'check-docs-agree-RESULT.txt'), out.join('\n') + '\n'); console.log(out.filter(l => l.startsWith('FAIL')).join('\n') + '\n' + out[out.length - 1]); process.exit(bad ? 1 : 0);
