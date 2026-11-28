// links-test.js — 2026-10-14. LINKS tab pieces: 'Chronology link', '22 Miami-Dade proof links',
// '209 documents in 7 groups', 'Drive links instead of G: paths', 'Updated stamp and filter'.
// Checks: each built piece renders; the library filter narrows the list as you type (and clears back);
// no G:\ path is the primary (clickable) link anywhere on LINKS where a Drive id is known — every G: path
// is small grey text under a Drive link; 375px no sideways scroll on LINKS (filter empty and filtered);
// BUILD built-count up by exactly N vs git HEAD (or an optional 3rd argument); 0000 money lock intact.
// Usage: node links-test.js <abs panel path> <png path> [baseline panel path]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const PANEL=process.argv[2],PNG=process.argv[3]||'/tmp/links-test.png';
let fails=0;const ok=(name,cond,extra)=>{console.log((cond?'PASS ':'FAIL ')+name+(extra!==undefined?' :: '+extra:''));if(!cond)fails++};
function buildOf(src){const m=src.match(/var BUILD=(\{[\s\S]*?\]\]\]\]\]\]\});/);if(!m)return null;return Function('return '+m[1])()}
function stat(B){let n=0,d=0;const per={};Object.keys(B).forEach(t=>{let tn=0,td=0;B[t].forEach(s=>s[1].forEach(f=>f[1].forEach(it=>{tn++;if(it[1])td++})));per[t]=[td,tn];n+=tn;d+=td});return {n,d,per}}
const PIECES=[['LINKS','Chronology link'],['LINKS','22 Miami-Dade proof links'],['LINKS','209 documents in 7 groups'],['LINKS','Drive links instead of G: paths'],['LINKS','Updated stamp and filter']];
const N=PIECES.length;
(async()=>{
const cur=buildOf(fs.readFileSync(PANEL,'utf8'));let base=null,baseFrom='';
if(process.argv[4]){base=buildOf(fs.readFileSync(process.argv[4],'utf8'));baseFrom=process.argv[4]}
else{try{const root=execFileSync('git',['-C',path.dirname(PANEL),'rev-parse','--show-toplevel']).toString().trim();
  base=buildOf(execFileSync('git',['-C',root,'show','HEAD:'+path.relative(root,PANEL)],{maxBuffer:64e6}).toString());baseFrom='git HEAD'}catch(e){}}
const C=stat(cur);ok('BUILD parsed',!!cur,C.d+' of '+C.n+' built ('+Math.round(C.d/C.n*100)+'%)');
if(base){const B=stat(base);ok('BUILD count went up by '+N+' vs '+baseFrom,C.d-B.d===N&&C.n===B.n,B.d+' -> '+C.d+' of '+C.n)}else ok('baseline available',false,'no git HEAD and no 3rd arg');
const leaf=(t,name)=>{let v=null;(cur[t]||[]).forEach(s=>s[1].forEach(f=>f[1].forEach(it=>{if(it[0]===name)v=it[1]})));return v};
ok(N+' pieces flipped to 1',PIECES.every(([t,n])=>leaf(t,n)===1),PIECES.map(([t,n])=>n+'='+leaf(t,n)).join(', '));
ok('proof-checked badge left at 0 (no check dates in the repo)',leaf('LINKS','Proof-checked badge (7 days)')===0);

const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.claude={use:async()=>null}});await p.goto('file://'+PANEL);await p.waitForTimeout(1000);
await p.evaluate(()=>VTES.show('LINKS'));await p.waitForTimeout(300);
const DRIVE=/^https:\/\/(drive|docs)\.google\.com\/(drive\/folders|file\/d|document\/d)\/[A-Za-z0-9_-]{20,}/;
// 1. Chronology
const ch=await p.$$eval('#chrono a',a=>a.map(x=>x.href));
ok('Chronology link renders (file + folder, Drive ids)',ch.length===2&&/\/file\/d\/1XEq7q2o6A82R4LHWW-9HwjIjqKu9-h94\/view$/.test(ch[0])&&ch.every(h=>/^https:\/\/drive\.google\.com\//.test(h)),ch.join(' '));
// 2. 22 MDC proof links
const md=await p.$$eval('#mdcproof .mdcrow',r=>r.map(x=>({n:x.querySelector('.kv').textContent,h:x.querySelector('a').href,t:x.querySelector('a').textContent})));
ok('22 Miami-Dade proof links render, numbered 01..22',md.length===22&&md.every((m,i)=>m.n===String(i+1).padStart(2,'0')),md.length);
ok('every proof link is a Drive file link, all distinct',md.every(m=>DRIVE.test(m.h))&&new Set(md.map(m=>m.h)).size===22);
const mdi=await p.$$eval('#mdcproof > p a',a=>a.map(x=>x.href));ok('22-source index document + folder linked',mdi.length===2&&mdi.every(h=>DRIVE.test(h)),mdi.join(' '));
// 3. library, groups, stamp
const lib=await p.evaluate(()=>({rows:document.querySelectorAll('#lib .librow').length,groups:[...document.querySelectorAll('#lib details.libg')].map(g=>g.querySelector('summary').textContent),stamp:(document.getElementById('lib-stamp')||{}).textContent,count:document.getElementById('libcount').textContent}));
ok('library renders 209 documents in 7 groups',lib.rows===209&&lib.groups.length===7,lib.rows+' rows; '+lib.groups.join(' | '));
ok('updated stamp "updated YYYY-MM-DD" shown',/^updated \d{4}-\d{2}-\d{2}$/.test(lib.stamp||''),lib.stamp);
ok('count line starts at 209 of 209',lib.count==='209 of 209 shown',lib.count);
// 4. filter narrows as you type
await p.click('#libq');await p.keyboard.type('owner-dir',{delay:20});await p.waitForTimeout(150);
const f1=await p.evaluate(()=>({vis:[...document.querySelectorAll('#lib .librow')].filter(r=>!r.hidden&&r.offsetHeight>0).map(r=>r.querySelector('a').textContent),count:document.getElementById('libcount').textContent,openG:[...document.querySelectorAll('#lib details.libg')].filter(g=>!g.hidden&&g.open).length}));
ok('typing narrows the list (fewer than 209, all match)',f1.vis.length>0&&f1.vis.length<209&&f1.vis.every(t=>t.toLowerCase().includes('owner-dir')),f1.vis.length+' visible');
ok('count line follows the filter, matching groups open',f1.count===f1.vis.length+' of 209 shown'&&f1.openG>=1,f1.count+' · open groups '+f1.openG);
await p.fill('#libq','chat-logs session');await p.dispatchEvent('#libq','input');await p.waitForTimeout(100);
const f2=await p.evaluate(()=>[...document.querySelectorAll('#lib .librow')].filter(r=>!r.hidden).length);
await p.fill('#libq','zzzz-no-such-doc');await p.dispatchEvent('#libq','input');await p.waitForTimeout(100);
const f3=await p.evaluate(()=>({n:[...document.querySelectorAll('#lib .librow')].filter(r=>!r.hidden).length,c:document.getElementById('libcount').textContent,g:[...document.querySelectorAll('#lib details.libg')].filter(g=>!g.hidden).length}));
ok('two words (folder + name) narrow to the CHAT-LOGS session logs; no match shows a plain message',f2>=1&&f2<=3&&f3.n===0&&f3.g===0&&/Nothing matches/.test(f3.c),'two-word '+f2+' · none '+f3.n+' · '+f3.c);
await p.fill('#libq','');await p.dispatchEvent('#libq','input');await p.waitForTimeout(100);
ok('clearing the box brings all 209 back',await p.evaluate(()=>[...document.querySelectorAll('#lib .librow')].filter(r=>!r.hidden).length)===209);
// 5. No G:\ as primary link; G: only as small grey text under a Drive link
const g=await p.evaluate(()=>{const pane=document.getElementById('pane-LINKS');
  const badA=[...pane.querySelectorAll('a')].filter(a=>/^G:|file:\/\/\/G:/i.test(a.textContent.trim())||/^file:/i.test(a.getAttribute('href')||'')).length;
  const tw=document.createTreeWalker(pane,NodeFilter.SHOW_TEXT);const gs=[];let n;while(n=tw.nextNode()){if(/G:\\/.test(n.nodeValue))gs.push(n.parentElement)}
  const muted=(()=>{const q=document.createElement('span');q.style.color='var(--muted)';document.body.appendChild(q);const c=getComputedStyle(q).color;q.remove();return c})();
  const notGrey=gs.filter(e=>!(e.classList.contains('gpath')&&getComputedStyle(e).color===muted&&parseFloat(getComputedStyle(e).fontSize)<14)).length;
  const noLinkAbove=gs.filter(e=>{const a=e.previousElementSibling;return !(a&&a.tagName==='A'&&/^https:\/\/(drive|docs)\.google\.com\//.test(a.href))}).length;
  return {badA,gpaths:gs.length,notGrey,noLinkAbove}});
ok('no G:\\ or file:/// path is a clickable link on LINKS',g.badA===0,g.badA);
ok('every G:\\ path is small grey text (page token --muted)',g.gpaths>=210&&g.notGrey===0,g.gpaths+' paths, '+g.notGrey+' not grey');
ok('every G:\\ path sits under a Drive link',g.noLinkAbove===0,g.noLinkAbove);
const libHrefs=await p.$$eval('#lib .librow a',a=>a.map(x=>x.href));ok('all 209 library links are Drive links',libHrefs.length===209&&libHrefs.every(h=>DRIVE.test(h)));
const jr=await p.$eval('#jobsroot a',a=>a.href);ok('01-JOBS shown as a Drive link (known id)',/1U4hnBp5Tt0qb1sxvO6dd3csBCWjhdQJt$/.test(jr),jr);
// 6. global search finds the new links
await p.fill('#q','#mdc');await p.dispatchEvent('#q','input');await p.waitForTimeout(300);
const hits=await p.evaluate(()=>(document.body.innerText.match(/MDC source \d\d:/g)||[]).length);ok('global search #mdc finds the proof links',hits>=22,hits);
await p.fill('#q','');await p.dispatchEvent('#q','input');await p.waitForTimeout(200);
// 7. 375px
await p.setViewportSize({width:375,height:800});await p.evaluate(()=>VTES.show('LINKS'));await p.waitForTimeout(200);
await p.evaluate(()=>document.querySelectorAll('#lib details.libg').forEach(d=>d.open=true));await p.waitForTimeout(150);
const sw1=await p.evaluate(()=>document.documentElement.scrollWidth);
await p.fill('#libq','report');await p.dispatchEvent('#libq','input');await p.waitForTimeout(150);
const sw2=await p.evaluate(()=>document.documentElement.scrollWidth);
ok('375px no sideways scroll on LINKS (all groups open, and filtered)',sw1<=375&&sw2<=375,sw1+' / '+sw2);
await p.fill('#libq','');await p.dispatchEvent('#libq','input');await p.evaluate(()=>{const d=document.querySelector('#lib details.libg');if(d)d.open=true});
await p.addStyleTag({content:'.header{position:static!important}'});
await (await p.$('#pane-LINKS')).screenshot({path:PNG});
// 8. money lock
const m=await p.evaluate(()=>({open:document.body.classList.contains('money-open'),mz:document.querySelectorAll('.mz').length,shown:[...document.querySelectorAll('.mz')].filter(s=>s.textContent!=='🔒$').length,leak:/\$\s?\d/.test(document.body.innerText)}));
ok('0000 money lock intact (locked, no amounts visible)',!m.open&&m.mz>0&&m.shown===0&&!m.leak,JSON.stringify(m));
ok('LINKS BUILD box readable',/%$/.test(await p.$eval('#bb-LINKS .bbpct',e=>e.textContent)),await p.$eval('#bb-LINKS .bbpct',e=>e.textContent));
ok('no page errors',errs.length===0,JSON.stringify(errs));await p.close();
console.log('  LINKS '+C.per.LINKS[0]+' of '+C.per.LINKS[1]+' ('+Math.round(C.per.LINKS[0]/C.per.LINKS[1]*100)+'%)');
console.log('BUILD NOW '+C.d+' of '+C.n+' = '+Math.round(C.d/C.n*100)+'%');
console.log(fails?'RESULT FAIL '+fails:'RESULT ALL PASS');await b.close();process.exit(fails?1:0)})();
