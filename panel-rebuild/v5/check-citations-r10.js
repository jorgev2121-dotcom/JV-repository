// check-citations-r10.js - fix round 10, flaw F1 class fix (Tier 3, enforcement). EVERY place that cites a document, a section, a step, an item or a file number - in the text VERIFY-v5.ps1 prints, in the page and its JS and data files, and in every live document - is resolved
// against the REAL text of the document it cites: the step / item / file / section must EXIST, a citation of a section in a document that has no sections fails, and a citation of an INSTALL-BY-HAND step must carry its gist words in BOTH the printed sentence
// and the real step text (GIST table below: a step citation with no entry fails, so a new one cannot slip in unchecked). Round 9 cut the sections and step numbers of INSTALL-BY-HAND.md; VERIFY still printed "Section A, step 6". Usage: node check-citations-r10.js [out.txt]. TRK-2026-9910-B
const fs = require('fs'), path = require('path'); const H = path.resolve(process.env.V5DIR || __dirname); const rd = f => fs.readFileSync(path.join(H, f), 'utf8'); const ex = f => fs.existsSync(path.join(H, f));
const out = []; let bad = 0, cites = 0; const say = (ok, m) => { out.push((ok ? 'PASS ' : 'FAIL ') + m); if (!ok) { bad++; } };
const plain = s => s.replace(/[`*]/g, '').toLowerCase();
const DOCS = { 'INSTALL-BY-HAND': 'INSTALL-BY-HAND.md', 'KNOWN-LIMITS': 'KNOWN-LIMITS.md', 'DESKTOP-WORK': 'DESKTOP-WORK.md', 'DATA-CONTRACT': 'DATA-CONTRACT.md', 'PORT-REPORT': 'PORT-REPORT.md', 'TEST-REPORT': 'TEST-REPORT.md' };
fs.readdirSync(H).filter(f => /^(FIX-ROUND-\d+|CHECK-\d+_INDEPENDENT)\.md$/.test(f)).forEach(f => { DOCS[f.replace(/\.md$/, '')] = f; });
const SCAN = ['VERIFY-v5.ps1'].concat(fs.readdirSync(path.join(H, 'package')).filter(f => /\.(html|js)$/.test(f)).map(f => 'package/' + f), fs.readdirSync(path.join(H, 'package', 'data')).map(f => 'package/data/' + f), ['INSTALL-BY-HAND.md', 'DESKTOP-WORK.md', 'KNOWN-LIMITS.md', 'DATA-CONTRACT.md', 'PORT-REPORT.md', 'TEST-REPORT.md']);
// what each document really has
const steps = {}; [...rd('INSTALL-BY-HAND.md').matchAll(/^(\d+)\. (.*)$/gm)].forEach(m => { steps[m[1]] = plain(m[2]); });
function numbered(f) { const o = {}; let cur = null; rd(f).split('\n').forEach(l => { const m = l.match(/^(\d+)\. /); if (m) { cur = m[1]; o[cur] = plain(l); } else if (cur && /^\s+/.test(l) && l.trim()) { o[cur] += ' ' + plain(l); } else if (!l.trim() || /^(Section|#)/.test(l)) { cur = null; } }); return o; }
const items = { 'KNOWN-LIMITS': numbered('KNOWN-LIMITS.md'), 'DESKTOP-WORK': numbered('DESKTOP-WORK.md') };
const files = {}; { let inF = false; rd('DATA-CONTRACT.md').split('\n').forEach(l => { if (/^## The seven files/.test(l)) { inF = true; } else if (/^## /.test(l)) { inF = false; } const m = inF && l.match(/^(\d+)\. `data/); if (m) { files[m[1]] = plain(l); } }); }
const sections = {}; Object.keys(DOCS).forEach(k => { sections[k] = new Set([...rd(DOCS[k]).matchAll(/^(?:#{2,3} )?Section ([A-Z]\d*)\b/gm)].map(m => m[1])); });
// gist: words that must be in the real step AND in the printed sentence that cites it (lower case)
const GIST = { 'INSTALL-BY-HAND step 27': ['exact bytes', 'new folder'] };
const DOCRE = '(INSTALL-BY-HAND|KNOWN-LIMITS|DESKTOP-WORK|DATA-CONTRACT|PORT-REPORT|TEST-REPORT|FIX-ROUND-\\d+|CHECK-\\d+_INDEPENDENT)';
for (const f of SCAN) {
  const t = rd(f); const own = path.basename(f).replace(/\.(md|ps1|html|js)$/, '');
  // 1. "DOC(.md), Section X" and "DOC(.md), Section X, step N"
  for (const m of t.matchAll(new RegExp(DOCRE + '(?:\\.md)?,? Section ([A-Z]\\d*)(?:, step (\\d+))?', 'g'))) { cites++; const ok = sections[m[1]] && sections[m[1]].has(m[2]) && (!m[3] || m[1] !== 'INSTALL-BY-HAND' || !!steps[m[3]]); say(ok, f + ': "' + m[0] + '" -> ' + (ok ? 'that section exists' : 'NO SUCH SECTION in ' + m[1] + ' (it has: ' + ([...(sections[m[1]] || [])].join(', ') || 'no sections') + ')')); }
  // 2. "INSTALL-BY-HAND(.md), step N" (with or without a Section word in between is caught by 1)
  for (const m of t.matchAll(/INSTALL-BY-HAND(?:\.md)?,? step (\d+)/g)) { cites++; const at = m.index, before = t.slice(Math.max(0, at - 260), at).split(/[\n]/).pop().toLowerCase(); const key = 'INSTALL-BY-HAND step ' + m[1]; const g = GIST[key];
    say(!!steps[m[1]], f + ': "' + m[0] + '" names a step that exists (' + Object.keys(steps).length + ' steps)');
    if (own !== 'INSTALL-BY-HAND') { say(!!g, f + ': "' + m[0] + '" has an entry in the gist table'); if (g) { say(g.every(w => (steps[m[1]] || '').includes(w)), f + ': step ' + m[1] + ' really contains "' + g.join('" and "') + '"'); say(g.every(w => before.includes(w) || before.includes(w.replace('new folder', 'new folder'))), f + ': the printed sentence before "' + m[0] + '" says "' + g.join('" and "') + '"'); } } }
  // 3. "KNOWN-LIMITS item N" / "DESKTOP-WORK item N" / "DATA-CONTRACT file N" must exist
  for (const m of t.matchAll(/(KNOWN-LIMITS|DESKTOP-WORK)(?:\.md)? items? (\d+)/g)) { cites++; say(!!items[m[1]][m[2]], f + ': "' + m[0] + '" names an item that exists (' + Object.keys(items[m[1]]).length + ' items)'); }
  for (const m of t.matchAll(/DATA-CONTRACT(?:\.md)? files? (\d+)/g)) { cites++; say(!!files[m[1]], f + ': "' + m[0] + '" names a file number that exists'); }
  // 3b. inside a document, a bare "item N", "step N" or "Section X" (no other document named just before it) points into THE SAME document and must exist there
  if (/\.md$/.test(f) && !/^(FIX-ROUND|CHECK)/.test(f)) { for (const m of t.matchAll(/\b(item|step|Section) ([A-Z]\d*|\d+)\b/g)) { const b = t.slice(Math.max(0, m.index - 45), m.index); if (new RegExp(DOCRE + '(?:\\.md)?,? (?:Section [A-Z]\\d*, )?$').test(b)) { continue; } if (m[1] === 'step' && /^[A-Z]/.test(m[2])) { continue; } const comp = t.slice(Math.max(0, m.index - 140), m.index).match(/(KNOWN-LIMITS|DESKTOP-WORK)(?:\.md)? items? \d+ \([^()]*\)(?: and| or|,)? $/); cites++; if (comp && m[1] === 'item') { say(!!items[comp[1]][m[2]], f + ': "' + comp[1] + ' ... ' + m[0] + '" (second item of a pair) names an item that exists'); continue; }
    const kind = m[1], n = m[2]; let ok, what; if (kind === 'Section') { ok = sections[own] && sections[own].has(n); what = 'section'; } else if (kind === 'step') { ok = own === 'INSTALL-BY-HAND' && !!steps[n]; what = 'step'; } else { ok = !!(items[own] && items[own][n]) || (own === 'DATA-CONTRACT' && !!files[n]); what = 'item'; }
    say(!!ok, f + ': own-document "' + m[0] + '" -> ' + (ok ? 'that ' + what + ' exists here' : 'NO SUCH ' + what.toUpperCase() + ' in ' + own)); } }
  // 4. a bare "Section X" or "step N" in text VERIFY or the page prints, with no document named right before it, cannot be resolved by a reader
  if (f === 'VERIFY-v5.ps1' || /^package\//.test(f)) { for (const m of t.matchAll(/\b(Section [A-Z]\b|step \d+\b)/g)) { const b = t.slice(Math.max(0, m.index - 60), m.index); if (!new RegExp(DOCRE + '(?:\\.md)?[ ,]*$').test(b) && !/INSTALL-BY-HAND(?:\.md)?, $/.test(b)) { cites++; say(false, f + ': printed "' + m[0] + '" does not say which document it is in (context: "' + t.slice(Math.max(0, m.index - 40), m.index + 20).replace(/\n/g, ' ') + '")'); } } }
}
// 5. documents named by a citation must exist as files
for (const f of SCAN) { for (const m of rd(f).matchAll(/\b([A-Z][A-Za-z0-9-]+)\.md\b/g)) { /* only the documents of this folder */ if (DOCS[m[1]] && !ex(m[1] + '.md')) { say(false, f + ': names ' + m[0] + ' which does not exist'); } } }
out.push(''); out.push('CITATIONS R10: ' + out.filter(l => l.startsWith('PASS')).length + ' of ' + out.filter(l => /^(PASS|FAIL)/.test(l)).length + ' checks pass (' + cites + ' citations resolved against the real text of ' + SCAN.length + ' files scanned)');
fs.writeFileSync(path.join(__dirname, process.argv[2] || 'check-citations-r10-RESULT.txt'), out.join('\n') + '\n'); console.log(out.filter(l => l.startsWith('FAIL')).join('\n') + '\n' + out[out.length - 1]); process.exit(bad ? 1 : 0);
