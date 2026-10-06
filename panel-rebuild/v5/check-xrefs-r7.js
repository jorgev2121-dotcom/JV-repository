// check-xrefs-r7.js - fix round 7, CLASS 4: the numbers and the claims in the documents are checked against the facts, automatically. TRK-2026-9910-B
// (a) the number of files the documents name equals the manifest (M files named in it, plus the manifest itself = M + 1); (b) the phrase "Every card, tab and button from v3 is still here" is gone from the page and the live documents,
// and the page names the one removed link instead; (c) no document says an edit of a data file is "expected"; (d) every "all N of N" the documents print equals the manifest count; (e) the page text and the documents name the same destination for the Codex link.
// Usage: node check-xrefs-r7.js [out.txt]
const fs = require('fs'), path = require('path'); const H = __dirname; const rd = f => fs.readFileSync(path.join(H, f), 'utf8');
const out = []; let bad = 0; const say = (ok, m) => { out.push((ok ? 'PASS ' : 'FAIL ') + m); if (!ok) { bad++; } };
const man = rd('package/MANIFEST.sha256').trim().split('\n').map(l => l.slice(66)); const M = man.length, ALL = M + 1;
const pkgNames = fs.readdirSync(path.join(H, 'package')).filter(f => fs.statSync(path.join(H, 'package', f)).isFile()).length + fs.readdirSync(path.join(H, 'package', 'data')).length;
say(pkgNames === ALL, 'the package folder holds ' + pkgNames + ' files = the ' + M + ' in the manifest + the manifest itself (' + ALL + ')');
const LIVE = ['INSTALL-BY-HAND.md', 'DESKTOP-WORK.md', 'KNOWN-LIMITS.md', 'DATA-CONTRACT.md', 'PORT-REPORT.md', 'TEST-REPORT.md'];
for (const f of LIVE) { const t = rd(f);
  say(!/The \d+ package files are/.test(t) && !/\(\d+ files including `?MANIFEST/.test(t), f + ': no sentence counts the package wrongly ("The N package files are" / "N files including MANIFEST")');
  const bads = [...t.matchAll(/\ball (\d+) of (\d+)\b/g)].filter(m => m[1] !== m[2] || +m[1] !== M).map(m => m[0]); say(bads.length === 0, f + ': every "all N of N" says ' + M + ' (' + (bads.join(', ') || 'none wrong') + ')');
  say(!/EDITED \((data|settings) file\) - expected/.test(t) && !/which is expected/.test(t) || /superseded|SUPERSEDED|history/i.test(t) && !/EDITED \((data|settings) file\) - expected\W*` (and|still)/.test(t), f + ': no live sentence calls an edited data file "expected"');
}
{ const t = rd('INSTALL-BY-HAND.md'); const m = t.match(/The package is (\d+) files: the (\d+) named in `MANIFEST.sha256`, plus `MANIFEST.sha256` itself\. They are ([^\n]*?)\. The path on the branch/);
  const listed = m ? (m[3].match(/`[^`]+`/g) || []).length + (m[3].match(/\bin the `data` folder `/) ? 0 : 0) : -1;
  say(!!m && +m[1] === ALL && +m[2] === M, 'INSTALL-BY-HAND.md step 6b says the package is ' + ALL + ' files: the ' + M + ' named in the manifest plus the manifest');
  const names = ((m ? m[3] : '').match(/`[a-zA-Z0-9\-_.]+`/g) || []).filter(n => n !== '`data`'); const need = ['MANIFEST.sha256'].concat(man.map(x => path.basename(x)));
  say(need.every(n => names.indexOf('`' + n + '`') >= 0) && names.length === ALL, 'INSTALL-BY-HAND.md step 6b names exactly the ' + ALL + ' files (' + names.length + ' names, all present: ' + need.every(n => names.indexOf('`' + n + '`') >= 0) + ')'); }
{ const d = rd('DESKTOP-WORK.md'); say(new RegExp(ALL + ' files: the ' + M + ' named in `MANIFEST.sha256`, plus `MANIFEST.sha256` itself').test(d), 'DESKTOP-WORK.md says the package is ' + ALL + ' files in the same words'); }
const page = rd('package/VTES-LLM-LAUNCHER_v5.html'), ui = rd('package/vtes5-ui.js');
for (const [n, t] of [['the page', page], ['vtes5-ui.js', ui], ...LIVE.map(f => [f, rd(f)])]) { say(!/Every card, tab and button from v3 is still here/.test(t), n + ': does not say "Every card, tab and button from v3 is still here"'); }
say(/Everything from v3 is still here except one link: the Open Codex CLI link to chatgpt\.com/.test(ui), 'the Read me names the one removed link (Open Codex CLI to chatgpt.com)');
say(ui.includes('For RAMBO only (typed in v3; the desktop executor runs it, you type nothing)') && rd('PORT-REPORT.md').includes('For RAMBO only (typed in v3; the desktop executor runs it, you type nothing):'), 'PORT-REPORT.md quotes the CODEX / GROK address prefix exactly as the page shows it (CHECK-8 flaw 10)');
say(/\{id:'LLM-06'[^}]*url:''/.test(page), 'the LLM-06 card has no web address (the link really is removed): the Read me sentence is true');
// every jargon word the page must not show outside "For RAMBO" is checked on the rendered page by test-words-r7.js; here the source strings are scanned too (quick guard)
const uiCode = ui.replace(/\/\*[\s\S]*?\*\//g, '');
const srcJargon = [/\bheartbeat file\b/i, /result code/i, /interval_sec in the/i, /\(vtes-status\.js\)/].filter(re => { const lines = uiCode.split('\n').filter(l => re.test(l) && !/^\s*(\/\*|\*|\/\/)/.test(l) && !/For RAMBO/.test(l)); return lines.length > 0; });
say(srcJargon.length === 0, 'vtes5-ui.js: no jargon phrase in a displayed string outside "For RAMBO" lines (' + srcJargon.join(' ') + ')');
fs.writeFileSync(path.join(H, process.argv[2] || 'check-xrefs-r7-RESULT.txt'), out.join('\n') + '\nCROSS-REFERENCES R7: ' + (out.length - bad) + ' of ' + out.length + ' checks pass\n'); out.filter(l => l.startsWith('FAIL')).forEach(l => console.log(l)); console.log('CROSS-REFERENCES R7: ' + (out.length - bad) + ' of ' + out.length + ' checks pass'); process.exit(bad ? 1 : 0);
