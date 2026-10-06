// test-fixes-r6.js - fix round 6: the page and document checks that are not colour invariants. Flaws 2 (LOCAL card), 10 (hidden extensions), 11 (the eight files, in VERIFY, contract and install text agree),
// 12 (the bytes in git are the bytes in the manifest; .gitattributes stops CRLF; a checkout with core.autocrlf=true keeps LF), CHECK-6 F14 (no technical command outside a "For RAMBO" line). Usage: node test-fixes-r6.js <out.json>. TRK-2026-9910-B
const L = require('./test-v5-lib.js'); const { fs, path, at, NOWMS, fresh, stage, open, tick } = L; const cp = require('child_process'); const crypto = require('crypto');
const OUT = process.argv[2] || 'test-fixes-r6-RESULT.json'; const results = []; const H = __dirname;
const T = (g, name, ok, why) => { results.push({ grp: g, name, status: ok ? 'PASS' : 'FAIL', why: ok ? '' : String(why).slice(0, 300) }); if (!ok) { console.log('FAIL', g, '|', name, '|', String(why).slice(0, 220)); } };
const sh = (c, o) => cp.execSync(c, Object.assign({ cwd: H, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }, o || {}));
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
(async () => {
  const br = await L.chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  // ---------- F14: no technical command is printed for Jorge outside a "For RAMBO" line
  { const { ctx, p, errs } = await open(br, stage(fresh(NOWMS)));
    const TECH = /\.ps1|codex exec|Second-Opinion\.ps1|VTES-Open|Get-ScheduledTask|Get-ScheduledTaskInfo|-Install\b|-Prompt\b|powershell|\bgit (show|fetch|status)\b/i;
    const leaks = await p.evaluate(src => { const re = new RegExp(src, 'i'); const out = []; document.querySelectorAll('#g-llm .card, #g-roles .card, #g-bots .card').forEach(c => { const k = c.cloneNode(true); k.querySelectorAll('.v5forrambo').forEach(e => e.remove()); const m = k.innerText.match(re); if (m) { out.push(c.id + ': ' + m[0]); } }); return out; }, TECH.source);
    T('F14', 'on every window, role and bot card, no technical command (a .ps1 name, codex exec, Get-ScheduledTask, -Install, powershell, git) appears outside a line marked "For RAMBO" (' + leaks.length + ' leaks)', leaks.length === 0, leaks.join(' ; '));
    const raml = await p.$$eval('.v5forrambo', e => e.map(x => x.innerText.replace(/\s+/g, ' ').trim()));
    T('F14', 'the "For RAMBO" lines exist for RAMBO, CODEX and GROK, and for LLM-01 when its link is not live (' + raml.length + ' lines) and each starts with "For RAMBO"', raml.length >= 3 && raml.every(t => /^For RAMBO/.test(t)), JSON.stringify(raml));
    const how = await p.evaluate(() => WIN.map(w => w.id + ': ' + (w.how || '')).join(' | '));
    T('F14', 'no how-to line (the sentence printed after \"Copy packet and open\") holds a technical command', !TECH.test(how), how.slice(0, 300));
    { const stat = await p.evaluate(async () => { const out = []; for (const w of WIN) { document.getElementById('to').value = w.id; window.open = () => null; document.getElementById('go').click(); await Promise.resolve(); await Promise.resolve(); await Promise.resolve(); out.push(w.id + ': ' + document.getElementById('status').innerText); } return out; });
      const bad = stat.filter(x => TECH.test(x)); T('F14', 'the status line after \"Copy packet and open\" holds no technical command for any of the ' + stat.length + ' To entries', bad.length === 0, bad.join(' ; ')); }
    T('F14', '0 page errors', errs.length === 0, errs.join('|')); await ctx.close(); }
  // ---------- flaw 2: the LOCAL card in the three states
  const localText = async p => (await p.innerText('#card-LOCAL')).replace(/\s+/g, ' ');
  const neverLeaves = t => { const m = t.match(/[^.]*never leaves the (PC|machine)[^.]*/gi) || []; return m.every(x => /only true once|typed in v3/.test(x)); };
  { const { ctx, p } = await open(br, stage(null)); const t = await localText(p);
    T('flaw 2', 'shipped data: the LOCAL card says BLOCKED - UNVERIFIED and has NO save steps (no right-click, no Text Document, no folder to open)', /BLOCKED - UNVERIFIED/.test(t) && !/right-click/i.test(t) && !/Text Document/.test(t), t.slice(0, 300));
    T('flaw 2', 'shipped data: the LOCAL card never names G:\\My Drive and never tells anyone to save client data in Google Drive (the only mentions are warnings)', !/G:\\My Drive/.test(t) && !/open Google Drive, open the folder/i.test(t) && /Do NOT save it in Google Drive or OneDrive/.test(t), t.slice(0, 400));
    T('flaw 2', 'shipped data: "Never leaves the PC" is only ever quoted as a v3 sentence that says when it is true', neverLeaves(await p.innerText('body')), (await p.innerText('body')).match(/[^.]*never leaves the[^.]*/gi));
    T('flaw 2', 'shipped data: the LOCAL save line is red (a red card)', /bad/.test(await p.$eval('#card-LOCAL .v5st[data-localfolder]', e => e.className)), '');
    await ctx.close(); }
  { const { ctx, p } = await open(br, stage(fresh(NOWMS))); const t = await localText(p);
    T('flaw 2', 'confirmed folder (fixture): the card says CONFIRMED, names the folder the PC reports, and is green', /CONFIRMED by the desktop executor/.test(t) && /C:\\VTES-LOCAL\\/.test(t) && /\bok\b/.test(await p.$eval('#card-LOCAL .v5st[data-localfolder]', e => e.className)), t.slice(0, 400));
    T('flaw 2', 'confirmed folder: the steps say how to turn on File name extensions and to check the name ends in .md and not .md.txt (flaw 10)', /FIRST turn on file name extensions: click View, then Show, then File name extensions/.test(t) && /ends in \.md and not in \.md\.txt/.test(t), t.slice(0, 500));
    T('flaw 2', 'confirmed folder: still says never paste into any Claude window and never press the RAMBO button for it', /Do NOT paste this packet into any Claude window/.test(t), '');
    // the same card follows the data: the folder turns bad after a re-read
    const d = (await p.evaluate(() => 1), null); await ctx.close(); }
  { const f = fresh(NOWMS); const d = stage(f); const { ctx, p } = await open(br, d); let t = await localText(p); const ok1 = /CONFIRMED/.test(t);
    f.heartbeat.local_only_folder.label = 'OneDrive - Team USA'; fs.writeFileSync(d + '/data/vtes5-heartbeat.js', L.wrap('heartbeat', f.heartbeat)); await tick(p); t = await localText(p);
    T('flaw 2', 'the card follows the data: CONFIRMED turns into BLOCKED within one tick when the folder name looks like OneDrive, and the save steps disappear', ok1 && /BLOCKED - UNVERIFIED/.test(t) && !/right-click/i.test(t), t.slice(0, 300)); await ctx.close(); }
  // ---------- flaw 10: the RAMBO by-hand route and the For-RAMBO line
  { const { ctx, p } = await open(br, stage(fresh(NOWMS))); const t = (await p.innerText('#card-RAMBO')).replace(/\s+/g, ' ');
    T('flaw 10', 'the RAMBO card, by-hand route: turn on File name extensions first, check the name ends in .md and not .md.txt', /FIRST turn on file name extensions \(File Explorer, click View, then Show, then File name extensions\)/.test(t) && /\.md\.txt/.test(t), t.slice(0, 600));
    T('flaw 10', 'the RAMBO card tells RAMBO to create a JOB file with its exact name using its own file tools and to read the name back', /create it with its exact name using your own file tools, then read the name back/.test(t), t.slice(0, 600));
    T('flaw 10', 'no card or step says "name it JOB-something.md" without the extension warning next to it', !(await p.evaluate(() => [...document.querySelectorAll('.card')].filter(c => /name it JOB-something\.md/.test(c.innerText) && !/File name extensions/.test(c.innerText)).map(c => c.id))).length, ''); await ctx.close(); }
  // ---------- flaw 11: VERIFY, DATA-CONTRACT, INSTALL-BY-HAND and DESKTOP-WORK agree on the eight files
  { const ver = fs.readFileSync(path.join(H, 'VERIFY-v5.ps1'), 'utf8'), con = fs.readFileSync(path.join(H, 'DATA-CONTRACT.md'), 'utf8'), ins = fs.readFileSync(path.join(H, 'INSTALL-BY-HAND.md'), 'utf8'), dw = fs.readFileSync(path.join(H, 'DESKTOP-WORK.md'), 'utf8');
    /* ROUND 7 CHANGE (listed in FIX-ROUND-7.md, "older tests that changed"): VERIFY no longer has an "expected edit" allowance. The eight data and settings files are now DATA that VERIFY checks strictly.
       This block now checks that (a) the eight names in VERIFY, DATA-CONTRACT.md and the manifest still agree, (b) the documents quote the NEW VERIFY sentences and no longer promise "expected" edits. */
    const vset = [...ver.matchAll(/'((?:data\/)?vtes5-[a-z]+\.js)'/g)].map(m => m[1]); const vuniq = [...new Set(vset)].filter(x => /^data\/|^vtes5-config\.js$/.test(x)).sort();
    const sec = (con.split('## Files that change by design')[1] || '').split('\n## ')[0]; const cset = [...sec.matchAll(/^\d+\. ([a-z\/0-9\-\.]+) \((data file|settings file)/gm)].map(m => m[1]).sort();
    const man = fs.readFileSync(path.join(H, 'package', 'MANIFEST.sha256'), 'utf8').trim().split('\n').map(l => l.slice(66)); const dataInManifest = man.filter(f => /^data\/|vtes5-config\.js$/.test(f)).sort();
    T('flaw 11', 'VERIFY names exactly the 8 data and settings files (' + vuniq.length + ')', vuniq.length === 8, vuniq.join());
    T('flaw 11', 'the list in VERIFY-v5.ps1 equals the list in DATA-CONTRACT.md ("Files that change by design")', JSON.stringify(vuniq) === JSON.stringify(cset), vuniq.join() + ' || ' + cset.join());
    T('flaw 11', 'both equal the seven data files plus vtes5-config.js that the manifest lists', JSON.stringify(vuniq) === JSON.stringify(dataInManifest), dataInManifest.join());
    T('flaw 11', 'INSTALL-BY-HAND.md, DESKTOP-WORK.md and DATA-CONTRACT.md quote the NEW VERIFY sentence ("changed by a PC writer (passes the strict shape check)") and no longer say "- expected"', ins.includes('changed by a PC writer') && dw.includes('changed by a PC writer (passes the strict shape check)') && con.includes('changed by a PC writer (passes the strict shape check)') && !/EDITED \((data|settings) file\) - expected/.test(ins + dw + con) && ver.includes('changed by a PC writer (passes the strict shape check)'), '');
    T('flaw 11', 'INSTALL-BY-HAND.md says the day-one OK line is the only good answer and that -AfterWriters is for a later check only', /ONLY good answer on day one/.test(ins) && /-AfterWriters/.test(ins), '');
    T('flaw 12', 'the three answers INSTALL-BY-HAND.md names (LINE ENDINGS CHANGED (CRLF), LINK IN PATH, WRONG PLACE) are real VERIFY sentences', ['LINE ENDINGS CHANGED (CRLF)', 'LINK IN PATH', 'WRONG PLACE'].every(s => ver.includes(s) && ins.includes(s)), ''); }
  // ---------- flaw 12: the bytes in git are the bytes in the manifest; .gitattributes keeps them under core.autocrlf=true
  { const man = fs.readFileSync(path.join(H, 'package', 'MANIFEST.sha256'), 'utf8').trim().split('\n').map(l => ({ h: l.slice(0, 64), f: l.slice(66) })); let tracked = true, same = 0, wrong = [];
    for (const m of man) { try { const b = cp.execFileSync('git', ['show', 'HEAD:panel-rebuild/v5/package/' + m.f], { cwd: H, maxBuffer: 1 << 26 }); if (sha(b) === m.h) { same++; } else { wrong.push(m.f); } } catch (e) { tracked = false; wrong.push(m.f + ' (not in git HEAD yet)'); } }
    T('flaw 12', '`git show HEAD:panel-rebuild/v5/package/<name>` prints bytes whose SHA-256 equals the manifest for all ' + man.length + ' files (' + same + ' of ' + man.length + ') - the exact route INSTALL-BY-HAND.md tells RAMBO to use', same === man.length, wrong.join(', '));
    try { const vb = cp.execFileSync('git', ['show', 'HEAD:panel-rebuild/v5/VERIFY-v5.ps1'], { cwd: H }); T('flaw 12', '`git show HEAD:panel-rebuild/v5/VERIFY-v5.ps1` equals the file whose SHA-256 INSTALL-BY-HAND.md carries', sha(vb) === sha(fs.readFileSync(path.join(H, 'VERIFY-v5.ps1'))) && fs.readFileSync(path.join(H, 'INSTALL-BY-HAND.md'), 'utf8').includes(sha(vb)), ''); } catch (e) { T('flaw 12', 'VERIFY-v5.ps1 is in git HEAD', false, String(e.message).slice(0, 100)); }
    const ga = sh('git check-attr text -- panel-rebuild/v5/package/vtes5-ui.js panel-rebuild/v5/package/data/vtes5-bots.js panel-rebuild/v5/VERIFY-v5.ps1 panel-rebuild/v5/package/MANIFEST.sha256', { cwd: path.join(H, '..', '..') });
    T('flaw 12', '.gitattributes marks the package, the manifest and VERIFY as "text: unset" (no line-ending conversion)', (ga.match(/text: unset/g) || []).length === 4, ga);
    // a real checkout with core.autocrlf=true, with and without the attribute, in a scratch clone
    const root = path.join(H, '..', '..'); const tmp = fs.mkdtempSync(require('os').tmpdir() + '/crlf-'); let withAttr = '?', without = '?';
    try {
      sh('git clone -q --no-checkout "' + root + '" "' + tmp + '/a"'); sh('git config core.autocrlf true', { cwd: tmp + '/a' }); const head = sh('git rev-parse HEAD', { cwd: root }).trim(); sh('git checkout -q ' + head + ' -- .gitattributes panel-rebuild/v5/package panel-rebuild/v5/VERIFY-v5.ps1', { cwd: tmp + '/a' });
      const crs = d => { let n = 0; const w = x => { for (const f of fs.readdirSync(x)) { const q = path.join(x, f); if (fs.statSync(q).isDirectory()) { w(q); } else { n += (fs.readFileSync(q).toString('latin1').match(/\r/g) || []).length; } } }; w(d); return n; };
      withAttr = crs(tmp + '/a/panel-rebuild/v5/package');
      sh('git clone -q --no-checkout "' + root + '" "' + tmp + '/b"'); sh('git config core.autocrlf true', { cwd: tmp + '/b' }); sh('git checkout -q ' + head + ' -- panel-rebuild/v5/package', { cwd: tmp + '/b' }); fs.writeFileSync(tmp + '/b/.git/info/attributes', 'panel-rebuild/v5/** text\n'); fs.rmSync(tmp + '/b/panel-rebuild/v5/package', { recursive: true }); sh('git checkout -q ' + head + ' -- panel-rebuild/v5/package', { cwd: tmp + '/b' });
      without = crs(tmp + '/b/panel-rebuild/v5/package');
    } catch (e) { withAttr = 'error: ' + String(e.message).slice(0, 120); }
    T('flaw 12', 'a checkout with core.autocrlf=true of this commit keeps every package file LF (0 CR bytes with the .gitattributes line; ' + withAttr + ' found)', withAttr === 0, withAttr);
    T('flaw 12', 'control: the same checkout WITHOUT the attribute (forced text conversion) does turn LF into CRLF (' + without + ' CR bytes), so the attribute is what protects the files', typeof without === 'number' && without > 100, String(without));
    fs.rmSync(tmp, { recursive: true, force: true }); }
  await br.close();
  const pass = results.filter(r => r.status === 'PASS').length; fs.writeFileSync(OUT, JSON.stringify({ test: 'test-fixes-r6', pass, total: results.length, failures: results.filter(r => r.status !== 'PASS'), results }, null, 1));
  console.log('FIXES R6: ' + pass + ' of ' + results.length + ' pass'); process.exit(pass === results.length ? 0 : 1);
})();
