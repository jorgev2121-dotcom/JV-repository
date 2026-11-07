// attention-test.js — 2026-10-14. SPEC_ATTENTION-FLASH: things that wait on Jorge flash at 1 Hz, a header counter
// "N waiting on you" opens one list, every item has an EXEC-01 recommendation and Approve · Defer · Deny · Note, a batch
// "Approve all N recommended" asks once and leaves RED (spend/credentials/install/outbound) items out unless ticked,
// the green/yellow/red legend sits at the top. Choices survive a reload (mock db persisted in localStorage).
// Also: prefers-reduced-motion and the Pause switch give a steady ring; money stays locked; 375px fits; hover tips.
// Usage: node attention-test.js <abs panel path> [png prefix]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const PANEL=process.argv[2],PNG=process.argv[3]||'';
let fails=0;const ok=(name,cond,extra)=>{console.log((cond?'PASS ':'FAIL ')+name+(extra!==undefined&&extra!==''?' '+extra:''));if(!cond)fails++};
// In-page mock of the db capability: documents persist in localStorage so a reload keeps them (like the real store).
const MOCK=()=>{if(!sessionStorage.getItem('__init')){try{localStorage.clear()}catch(e){}sessionStorage.setItem('__init','1');
  const now=Date.now();localStorage.setItem('__mockdb',JSON.stringify({
   'tracker/TT-1':{title:'Test schedule waiting',status:'proposed',build_due:new Date(now+86400000).toISOString(),test_hours:2,assignee:'Cloud Code'},
   'tracker/TT-2':{title:'Test blocked on Jorge',status:'blocked',build_due:new Date(now+86400000).toISOString(),test_hours:1,assignee:'Jorge'}}))}
 const K='__mockdb',load=()=>JSON.parse(localStorage.getItem(K)||'{}'),save=o=>localStorage.setItem(K,JSON.stringify(o)),subs=[];
 const sd=(id,v)=>({id,exists:!!v,data:()=>v});
 const list=c=>{const o=load();return Object.keys(o).filter(k=>k.startsWith(c+'/')&&k.split('/').length===2).map(k=>sd(k.split('/')[1],o[k]))};
 const notify=()=>subs.forEach(([c,fn])=>setTimeout(()=>fn({docs:list(c)}),0));
 const DB={doc(p){return {get:async()=>sd(p.split('/').pop(),load()[p]),set:async v=>{const o=load();o[p]=JSON.parse(JSON.stringify(v));save(o);notify()},
   update:async v=>{const o=load();if(!o[p])throw {code:'not_found'};o[p]=Object.assign(o[p],JSON.parse(JSON.stringify(v)));save(o);notify()},delete:async()=>{const o=load();delete o[p];save(o);notify()}}},
  collection(c){const q={get:async()=>({docs:list(c)}),onSnapshot(fn){subs.push([c,fn]);setTimeout(()=>fn({docs:list(c)}),0);return ()=>{}},where(){return q},orderBy(){return q},limit(){return q},
   doc(id){return DB.doc(c+'/'+(id||Math.random().toString(36).slice(2)))},add:async v=>{const id=Math.random().toString(36).slice(2);await DB.doc(c+'/'+id).set(v);return DB.doc(c+'/'+id)}};return q}};
 window.__db=()=>load();window.claude={use:async n=>n==='db'?DB:null}};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const ctx=await b.newContext({viewport:{width:1100,height:900}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(MOCK);await p.goto('file://'+PANEL);await p.waitForTimeout(1500);
// 1. counter + per-tab counts
const s1=await p.evaluate(()=>{const L=VTES.attItems(),c=document.getElementById('attnbtn'),m=c.textContent.match(/(\d+) waiting on you/);
  const tabs=[...document.querySelectorAll('.tab[data-tab]')].map(t=>({t:t.dataset.tab,n:+(t.dataset.attn||0),badge:(t.querySelector('.attnn')||{}).textContent||'',attn:t.classList.contains('attn')}));
  const r=c.getBoundingClientRect();return {L:L.length,n:m?+m[1]:-1,tabs,visible:r.width>0&&r.top>=0&&r.top<window.innerHeight,kinds:[...new Set(L.map(x=>x.kind))].sort(),fab:!!document.getElementById('attnfab')}});
const sumTabs=s1.tabs.reduce((a,x)=>a+x.n,0);
ok('header counter says "N waiting on you" and is on screen',s1.n>0&&s1.visible,s1.n);
ok('counter equals the number of waiting items',s1.n===s1.L,s1.n+' vs '+s1.L);
ok('each tab shows its own count badge, and the badges add up to the counter',sumTabs===s1.n&&s1.tabs.filter(x=>x.n).every(x=>+x.badge===x.n),s1.tabs.filter(x=>x.n).map(x=>x.t+':'+x.n).join(' '));
ok('sources read: approvals, RED asks, jobs, tasks and tracker (db)',['appr','job','red','task','trk'].every(k=>s1.kinds.includes(k)),s1.kinds.join(','));
ok('TRACKER tab counts the 2 schedules from the db',(s1.tabs.find(x=>x.t==='TRACKER')||{}).n===2);
ok('a floating counter exists for when the header scrolls away',s1.fab);
// 2. 1 Hz flashing
const fl=await p.evaluate(()=>{const g=e=>{const c=getComputedStyle(e);return {name:c.animationName,dur:c.animationDuration,it:c.animationIterationCount}};
  const on=[...document.querySelectorAll('.tab.attn')].map(g),off=[...document.querySelectorAll('.tab[data-tab]:not(.attn)')].map(g),ctr=g(document.getElementById('attnbtn'));return {on,off,ctr}});
ok('every tab with waiting items pulses: attnpulse, 1 s, infinite (1 Hz, under 3 per second)',fl.on.length>0&&fl.on.every(x=>x.name==='attnpulse'&&x.dur==='1s'&&x.it==='infinite'),fl.on.length+' tabs');
ok('tabs with nothing waiting do not flash',fl.off.every(x=>x.name!=='attnpulse'),fl.off.length+' quiet tabs');
ok('the header counter pulses too',fl.ctr.name==='attnpulse'&&fl.ctr.dur==='1s');
// 3. legend at the top
const lg=await p.textContent('#attnleg');ok('green/yellow/red legend at the top',/🟢 \d+ done by an AI/.test(lg)&&/🟡 \d+ tested \/ running/.test(lg)&&/🔴 \d+ need you/.test(lg),lg.replace(/\s+/g,' '));
// 4. the list
await p.click('#attnbtn');await p.waitForTimeout(300);
const li=await p.evaluate(()=>{const pn=document.getElementById('attnpane');pn.querySelectorAll('details').forEach(d=>d.open=true);const its=[...pn.querySelectorAll('.attn-it')];
  return {open:!pn.hidden,n:its.length,rec:its.every(i=>/^EXEC-01 recommends: (Approve|Defer|Deny|Approve and reroute to RAMBO \(Desktop\)) — \S/.test((i.querySelector('.attn-rec')||{}).textContent||'')),
   btns:its.every(i=>['Approve','Defer','Deny','Note'].every(w=>[...i.querySelectorAll('button')].some(b=>b.textContent.includes(w)))),legend:/🟢.*🟡.*🔴/.test(pn.querySelector('.attn-legend').textContent),
   batch:(document.getElementById('attn-batch')||{}).textContent||'',ticks:pn.querySelectorAll('.attn-tick').length,
   tips:[...pn.querySelectorAll('button,summary')].filter(b=>!(b.dataset.tip||'').trim()).length,first:(pn.querySelector('.attn-grp summary')||{}).textContent||''}});
ok('clicking the counter opens one "Waiting on you" list with every item',li.open&&li.n===s1.n,li.n);
ok('every item carries an EXEC-01 recommendation line',li.rec);
ok('every item has Approve · Defer · Deny · Note',li.btns);
ok('legend repeated inside the list',li.legend);
ok('batch button reads "Approve all N recommended"',/Approve all \d+ recommended/.test(li.batch),li.batch);
ok('RED items carry a tick box (excluded from batch unless ticked)',li.ticks>0,li.ticks+' RED');
ok('APPROVALS branch is listed first',/APPROVALS/.test(li.first),li.first.trim());
ok('every button in the list has a hover tip',li.tips===0,li.tips+' without');
await p.evaluate(()=>VTES.attnOpen(false));await p.evaluate(()=>VTES.show('APPROVALS'));await p.waitForTimeout(1700);
const ac=await p.evaluate(()=>[...document.querySelectorAll('#pane-APPROVALS .apcard')].map(c=>!!c.querySelector('.attn-rec')));
ok('the approval cards on their own tab show the recommendation too',ac.length>0&&ac.every(Boolean),ac.length+' cards');
if(PNG){await p.evaluate(()=>VTES.attnOpen(true));await p.waitForTimeout(300);await p.screenshot({path:PNG+'-list.png'});await p.evaluate(()=>VTES.attnOpen(false))}
// 5. individual actions
const before=await p.evaluate(()=>VTES.attItems().length);
await p.evaluate(()=>VTES.attAct('appr-outlook-fix','approve'));await p.waitForTimeout(300);
let db=await p.evaluate(()=>__db());const pill=await p.textContent('#pill-outlook-fix');
ok('Approve one card: pill says approved, saved to approvals/ and attention/ in the db',/approved/.test(pill)&&(db['approvals/outlook-fix']||{}).status==='approved'&&(db['attention/appr-outlook-fix']||{}).decision==='approved',pill);
const tid=await p.evaluate(()=>VTES.attItems().find(x=>x.kind==='task'&&!x.risky).id);
await p.evaluate(id=>VTES.attAct('task-'+id.replace(/[^A-Za-z0-9_-]/g,'_'),'deny'),tid);await p.waitForTimeout(300);db=await p.evaluate(()=>__db());
ok('Deny one task: saved in tasks/state in the db',((db['tasks/state']||{}).map||{})[tid]&&db['tasks/state'].map[tid].decision==='denied',tid);
await p.evaluate(()=>VTES.attAct('red-pc-run-cap','defer'));await p.waitForTimeout(300);db=await p.evaluate(()=>__db());
const dr=db['attention/red-pc-run-cap']||{};ok('Defer the RED ask: hidden until tomorrow 8 AM, saved in the db',dr.decision==='deferred'&&Date.parse(dr.until)>Date.now()&&!(await p.evaluate(()=>VTES.attItems().some(x=>x.key==='red-pc-run-cap'))),dr.until);
await p.evaluate(()=>{VTES.attnOpen(true);document.querySelectorAll('#attnpane details').forEach(d=>d.open=true)});
await p.evaluate(()=>{VTES.toggle('an-appr-edge-cookie-clear');document.getElementById('ant-appr-edge-cookie-clear').value='Do it Friday after backup.'});
await p.evaluate(()=>VTES.attNote('appr-edge-cookie-clear'));await p.waitForTimeout(200);
const after=await p.evaluate(()=>VTES.attItems().length);ok('counter drops by exactly the 3 decided items',after===before-3,before+' -> '+after);
// reload: durable
await p.reload();await p.waitForTimeout(1600);
const rl=await p.evaluate(()=>{VTES.attnOpen(true);document.querySelectorAll('#attnpane details').forEach(d=>d.open=true);return {n:VTES.attItems().length,note:(document.getElementById('ant-appr-edge-cookie-clear')||{}).value,red:VTES.attItems().some(x=>x.key==='red-pc-run-cap'),pill:document.getElementById('pill-outlook-fix').textContent}});
ok('after reload: same count, note kept, deferred item still hidden, approval still approved',rl.n===after&&rl.note==='Do it Friday after backup.'&&!rl.red&&/approved/.test(rl.pill),JSON.stringify(rl));
// 6. batch
const bt=await p.evaluate(()=>{const L=VTES.attItems();return {all:L.length,rec:L.filter(x=>(x.rec==='approve'||x.rec==='reroute')&&!x.risky).length,risky:L.filter(x=>x.risky).length,other:L.filter(x=>!x.risky&&!(x.rec==='approve'||x.rec==='reroute')).length}});
const btxt=await p.textContent('#attn-batch');ok('batch number = recommended items that are not RED',btxt.includes('Approve all '+bt.rec+' recommended'),btxt.trim()+' · '+JSON.stringify(bt));
const tickKey=await p.evaluate(()=>{const t=document.querySelector('#attnpane .attn-tick');t.checked=true;VTES.attTick(t);return t.dataset.key});await p.waitForTimeout(100);
const btxt2=await p.textContent('#attn-batch');ok('ticking one RED item adds it to the batch',btxt2.includes('Approve all '+(bt.rec+1)+' recommended'),btxt2.trim());
await p.click('#attn-batch');await p.waitForTimeout(150);
const asked=await p.evaluate(()=>!!document.getElementById('attn-yes')&&VTES.attItems().length);ok('batch asks once before acting (nothing approved yet)',asked===bt.all,asked);
await p.click('#attn-yes');await p.waitForTimeout(1500);
const left=await p.evaluate(()=>{const L=VTES.attItems();return {n:L.length,risky:L.filter(x=>x.risky).length,msg:document.getElementById('attn-msg').textContent}});
ok('after the batch only unticked RED items and non-approve recommendations remain',left.n===bt.risky-1+bt.other&&left.risky===bt.risky-1,JSON.stringify(left));
db=await p.evaluate(()=>__db());const tm=(db['tasks/state']||{}).map||{};
ok('batch saved tasks in one tasks/state write, stuck-on-owner tasks rerouted to RAMBO',Object.values(tm).filter(s=>s.decision==='approved').length>=50&&Object.values(tm).some(s=>/rambo/i.test(s.who||"")));
ok('batch approved tracker schedules; the blocked one moved to RAMBO (Desktop)',(db['tracker/TT-1']||{}).schedule_approved===true&&(db['tracker/TT-2']||{}).assignee==='RAMBO (Desktop)');
ok('the ticked RED item was approved',(db['attention/'+tickKey]||{}).decision==='approved',tickKey);
// 7. money lock + copy text
const mz=await p.evaluate(()=>{VTES.attnOpen(true);const t=document.getElementById('attnpane').innerText;return {vis:(t.match(/\$\s?\d/g)||[]).length,copy:(VTES.attText().match(/\$\s?\d/g)||[]).length}});
ok('money locked: no $ amounts in the list or in its copied text',mz.vis===0&&mz.copy===0,JSON.stringify(mz));
// 8. read aloud never hangs when speech is missing
const ra=await p.evaluate(()=>{try{Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true})}catch(e){}return VTES.attRead()});
ok('Read this list: answers "unavailable" when speech is missing (no hang)',ra==='unavailable',ra);
// 9. pause switch, remembered
await p.evaluate(()=>VTES.attnOpen(false));await p.click('#attnpause');await p.waitForTimeout(100);
const pz=await p.evaluate(()=>{const t=document.querySelector('.tab.attn');return {cls:document.body.classList.contains('attn-paused'),an:t?getComputedStyle(t).animationName:'?',ring:t?getComputedStyle(t).boxShadow:''}});
await p.reload();await p.waitForTimeout(1200);const pz2=await p.evaluate(()=>document.body.classList.contains('attn-paused'));
ok('Pause flashing: steady red ring, no animation, remembered after reload',pz.cls&&pz.an==='none'&&/rgb/.test(pz.ring)&&pz2,JSON.stringify(pz));
await p.click('#attnpause');
// 10. reduced motion
const p2=await b.newPage({viewport:{width:1100,height:900},reducedMotion:'reduce'});await p2.addInitScript(MOCK);await p2.goto('file://'+PANEL);await p2.waitForTimeout(1200);
const rm=await p2.evaluate(()=>{const t=document.querySelector('.tab.attn');return t?{an:getComputedStyle(t).animationName,ring:getComputedStyle(t).boxShadow}:null});
ok('prefers-reduced-motion: no flashing, steady red ring instead',rm&&rm.an==='none'&&/rgb/.test(rm.ring),JSON.stringify(rm));await p2.close();
// 11. 375px
for(const w of [375]){const p3=await b.newPage({viewport:{width:w,height:800}});const e3=[];p3.on('pageerror',e=>e3.push(e.message));await p3.addInitScript(MOCK);await p3.goto('file://'+PANEL);await p3.waitForTimeout(1200);
  const a=await p3.evaluate(()=>document.documentElement.scrollWidth);await p3.evaluate(()=>{VTES.attnOpen(true);document.querySelectorAll('#attnpane details').forEach(d=>d.open=true)});await p3.waitForTimeout(200);
  const c=await p3.evaluate(()=>({sw:document.documentElement.scrollWidth,pw:document.getElementById('attnpane').scrollWidth,cw:document.getElementById('attnpane').clientWidth}));
  ok(w+'px: no sideways scroll, closed and with the list open',a<=w&&c.sw<=w&&c.pw<=c.cw+1,a+' / '+JSON.stringify(c));
  if(PNG)await p3.screenshot({path:PNG+'-list-375.png'});errs.push(...e3);await p3.close()}
ok('no page errors',errs.length===0,errs.slice(0,3).join(' | '));
console.log(fails?'RESULT: '+fails+' FAILED':'RESULT: ALL PASS');await b.close();process.exit(fails?1:0)})();
