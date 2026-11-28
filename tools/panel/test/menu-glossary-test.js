// menu-glossary-test.js — 2026-10-14. MENU piece "Glossary hover for in-house words".
// Checks: glossary data (plain one-line meanings, required words, never money amounts), first-occurrence
// dotted-underline wraps in each tab, hover + tap tips, Glossary panel reachable from MENU and searchable,
// 0000 money lock still intact, phone width still fits. Usage: node menu-glossary-test.js <abs panel path> <png path>
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
let fails=0;const ok=(name,cond,extra)=>{console.log((cond?'PASS ':'FAIL ')+name+(extra!==undefined?' :: '+extra:''));if(!cond)fails++};
const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.claude={use:async()=>null}});
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(1500);
// 1. data
const GL=await p.evaluate(()=>(window.VTES_GLOSSARY||[]).map(g=>({k:g.k,d:g.d,a:g.a||''})));
ok('glossary loaded',GL.length>=14,GL.length+' words');
const need=['RAMBO','Cowork','Codex lane','TRK','OPH','GREEN and RED','Capsule','Orange Tree','0000 zone','PASTE-D, PASTE-C, PASTE-X','Inbox and Outbox','SCOREKEEPER','Wally'];
const miss=need.filter(k=>!GL.some(g=>g.k===k));ok('required in-house words present',miss.length===0,miss.join(', ')||'all '+need.length);
const MONEY=/\$|\d[\d,]*(?:\.\d+)?\s*(?:dollars?|usd|bucks)\b|\b(?:usd|dollars?)\s*\d/i;
const money=GL.filter(g=>MONEY.test(g.k+' '+g.d+' '+g.a));ok('no definition uses a money amount',money.length===0,money.map(g=>g.k).join(', '));
const bad=GL.filter(g=>/[\n<>|*`{}]/.test(g.d)||g.d.length>180||!/\.$/.test(g.d));ok('meanings are plain one-liners (read-aloud friendly)',bad.length===0,bad.map(g=>g.k).join(', '));
// 2. wraps
const w=await p.evaluate(()=>{const panes=[...document.querySelectorAll('.pane')];let dup=[],tabsWith=0,total=0;
 panes.forEach(pn=>{const s=[...pn.querySelectorAll('.gl')];if(s.length)tabsWith++;total+=s.length;const seen={};s.forEach(x=>{if(seen[x.dataset.gl])dup.push(pn.id+':'+x.dataset.gl);seen[x.dataset.gl]=1})});
 const badPlace=[...document.querySelectorAll('.gl')].filter(x=>x.parentElement.closest('a,button,summary,label,script,style,.mz,.nogl,#mzdlg,.gl,.tab')).length;
 return {panes:panes.length,tabsWith,total,dup,badPlace}});
ok('first occurrences wrapped across tabs',w.tabsWith>=10,w.tabsWith+' of '+w.panes+' tabs, '+w.total+' words');
ok('only the first occurrence per tab',w.dup.length===0,w.dup.slice(0,5).join(' '));
ok('never inside buttons, links, money spans or the glossary itself',w.badPlace===0,w.badPlace);
await p.evaluate(()=>VTES.show('CONNECT'));await p.waitForTimeout(400);
const deco=await p.evaluate(()=>{const g=document.querySelector('#pane-CONNECT .gl')||document.querySelector('.pane.active .gl');return g?[g.textContent,getComputedStyle(g).textDecorationStyle,getComputedStyle(g).cursor]:null});
ok('dotted underline + help cursor',deco&&deco[1]==='dotted'&&deco[2]==='help',JSON.stringify(deco));
// 3. hover + tap
await p.evaluate(()=>VTES.show('MENU'));await p.waitForTimeout(400);
const sel='#pane-MENU .gl';const first=await p.$(sel);
if(first){await first.scrollIntoViewIfNeeded();await first.hover();await p.waitForTimeout(500);
 const t=await p.textContent('#tipbox');const k=await first.getAttribute('data-gl');ok('hover shows the meaning',t.startsWith(k+': '),t);
 await p.mouse.move(5,5);await p.waitForTimeout(200);await first.click();await p.waitForTimeout(300);
 const vis=await p.$eval('#tipbox',e=>e.style.display);ok('tap/click shows the meaning',vis==='block'&&(await p.textContent('#tipbox')).startsWith(k+': '),vis);
}else ok('MENU has a glossary word',false);
// 4. panel from MENU + search
await p.click('#glbtn');await p.waitForTimeout(300);
ok('Glossary button on MENU opens the panel',await p.$eval('#glossary',d=>d.open&&d.offsetHeight>0));
ok('panel lists every word',await p.$$eval('#gllist .gl-row',r=>r.length)===GL.length);
await p.fill('#glq','capsule');await p.waitForTimeout(150);
const vis1=await p.$$eval('#gllist .gl-row',r=>r.filter(x=>x.style.display!=='none').map(x=>x.dataset.k));
ok('search "capsule" finds Capsule',vis1.includes('Capsule'),vis1.join(', ')+' | '+await p.textContent('#glcount'));
await p.screenshot({path:process.argv[3]});
await p.fill('#glq','zzzqqq');await p.waitForTimeout(150);
ok('search with no match says so',(await p.$$eval('#gllist .gl-row',r=>r.filter(x=>x.style.display!=='none').length))===0&&/No match/.test(await p.textContent('#glcount')),await p.textContent('#glcount'));
await p.evaluate(()=>VTES.show('TRACKER'));await p.evaluate(()=>VTES.glossary('TRK'));await p.waitForTimeout(300);
const jump=await p.evaluate(()=>[document.querySelector('.pane.active').id,document.getElementById('glq').value,[...document.querySelectorAll('#gllist .gl-row')].filter(x=>x.style.display!=='none').map(x=>x.dataset.k)]);
ok('VTES.glossary("TRK") jumps to MENU and filters',jump[0]==='pane-MENU'&&jump[1]==='TRK'&&jump[2].includes('TRK'),JSON.stringify(jump));
// 5. money lock intact
const m=await p.evaluate(()=>({open:document.body.classList.contains('money-open'),mz:document.querySelectorAll('.mz').length,shown:[...document.querySelectorAll('.mz')].filter(s=>s.textContent!=='🔒$').length,leak:/\$\s?\d/.test(document.body.innerText),glTipMoney:[...document.querySelectorAll('.gl')].some(g=>/\$/.test(g.dataset.tip))}));
ok('0000 money lock intact (locked, no amounts visible)',!m.open&&m.mz>0&&m.shown===0&&!m.leak&&!m.glTipMoney,JSON.stringify(m));
// 6. phone width with glossary open
await p.setViewportSize({width:375,height:800});await p.waitForTimeout(300);
const sw=await p.evaluate(()=>document.documentElement.scrollWidth);ok('375px still fits with glossary open',sw<=375,sw);
ok('no page errors',errs.length===0,JSON.stringify(errs));
console.log(fails?'RESULT FAIL '+fails:'RESULT ALL PASS');await b.close();process.exit(fails?1:0)})();
