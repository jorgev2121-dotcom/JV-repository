// master-task-log-test.js — 2026-10-14. SPEC_MASTER-TASK-LOG: the MYASKS tab is the master log (one list, no second copy);
// header button "📜 Master task log" opens it. Rows: the 23 seed rows (MASTER-TASK-LOG.json, embedded) + the older asks,
// oldest first (newest-first toggle, remembered); date · what · executor · status · proof. Status filter + counts click through.
// 💬 Comment writes {taskId, executor, text, at} to the db collection "task-comments"; a runner reply with a recommendation
// shows in the same thread; db "task-log" rows override / append. No db: kept in this browser and sent on the next load.
// Blocked rows join "Waiting on you". Money lock, 375px, hover tips, read aloud. Usage: node master-task-log-test.js <abs panel path> [png prefix]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs'),path=require('path');
const PANEL=process.argv[2],PNG=process.argv[3]||'';
const SEED=JSON.parse(fs.readFileSync(path.join(path.dirname(PANEL),'MASTER-TASK-LOG.json'),'utf8'));
let fails=0;const ok=(name,cond,extra)=>{console.log((cond?'PASS ':'FAIL ')+name+(extra!==undefined&&extra!==''?' '+extra:''));if(!cond)fails++};
const MOCK=()=>{if(!sessionStorage.getItem('__init')){try{localStorage.clear()}catch(e){}sessionStorage.setItem('__init','1');
  localStorage.setItem('__mockdb',JSON.stringify({'task-log/T-20261014-23':{status:'done-proof',proof:'https://example.com/proof-23'},
   'task-log/T-20261014-24':{asked:'2026-10-14 10:45 ET',what:'Runner-appended request from the db',exec:'Desktop RAMBO',status:'scheduled',proof:'mailbox/to-desktop/WORK-QUEUE.md item 30'}}))}
 if(sessionStorage.getItem('__nodb')){window.claude={use:async()=>null};return}
 const K='__mockdb',load=()=>JSON.parse(localStorage.getItem(K)||'{}'),save=o=>localStorage.setItem(K,JSON.stringify(o)),subs=[];
 const sd=(id,v)=>({id,exists:!!v,data:()=>v});
 const list=c=>{const o=load();return Object.keys(o).filter(k=>k.startsWith(c+'/')&&k.split('/').length===2).map(k=>sd(k.split('/')[1],o[k]))};
 const notify=()=>subs.forEach(([c,fn])=>setTimeout(()=>fn({docs:list(c)}),0));
 const DB={doc(p){return {get:async()=>sd(p.split('/').pop(),load()[p]),set:async v=>{const o=load();o[p]=JSON.parse(JSON.stringify(v));save(o);notify()},
   update:async v=>{const o=load();if(!o[p])throw {code:'not_found'};o[p]=Object.assign(o[p],JSON.parse(JSON.stringify(v)));save(o);notify()},delete:async()=>{const o=load();delete o[p];save(o);notify()}}},
  collection(c){const q={get:async()=>({docs:list(c)}),onSnapshot(fn){subs.push([c,fn]);setTimeout(()=>fn({docs:list(c)}),0);return ()=>{}},where(){return q},orderBy(){return q},limit(){return q},
   doc(id){return DB.doc(c+'/'+(id||Math.random().toString(36).slice(2)))},add:async v=>{const id=Math.random().toString(36).slice(2);await DB.doc(c+'/'+id).set(v);return DB.doc(c+'/'+id)}};return q}};
 window.__db=()=>load();window.__dbput=(k,v)=>{const o=load();o[k]=v;save(o);notify()};window.claude={use:async n=>n==='db'?DB:null}};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const p=await b.newPage({viewport:{width:1100,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(MOCK);await p.goto('file://'+PANEL);await p.waitForTimeout(1300);
// 1. header button opens the MYASKS tab; one list
await p.click('#mtlbtn');await p.waitForTimeout(250);
const a=await p.evaluate(()=>{const pane=document.getElementById('pane-MYASKS'),rows=[...pane.querySelectorAll('.mtl-row')];return {active:pane.classList.contains('active'),n:rows.length,ids:rows.map(r=>r.dataset.id),old:pane.querySelectorAll('.rep').length,tab:document.querySelector('.tab[data-tab="MYASKS"]').classList.contains('active'),
  lists:document.querySelectorAll('#mtl').length,asked:rows.map(r=>r.querySelector('.mtl-when').textContent),tip:document.getElementById('mtlbtn').dataset.tip,label:document.getElementById('mtlbtn').textContent}});
ok('header button "📜 Master task log" opens the MYASKS tab',a.active&&a.tab&&/📜 Master task log/.test(a.label)&&!!a.tip);
ok('one list only: the old MYASKS table is replaced, not duplicated',a.lists===1&&a.old===0);
ok('all 23 seed rows are embedded and shown',SEED.tasks.every(t=>a.ids.includes(t.id)),SEED.tasks.length+' seed');
ok('db "task-log" appends a row the runner wrote',a.ids.includes('T-20261014-24'));
ok('the older asks are folded into the same log (one list, 18 older + 23 seed + 1 db)',a.n===42,a.n);
ok('oldest first',a.asked.every((x,i)=>i===0||a.asked[i-1]<=x),a.asked[0]+' … '+a.asked[a.asked.length-1]);
// 2. row content
const r=await p.evaluate(()=>{const g=id=>document.querySelector('.mtl-row[data-id="'+id+'"]');const t1=g('T-20261014-01'),t23=g('T-20261014-23'),t10=g('T-20261014-10'),t05=g('T-20261014-05'),t13=g('T-20261014-13');
  return {t1:t1&&{st:t1.querySelector('.mtl-st').textContent,ex:t1.querySelector('.mtl-exec').textContent,a:(t1.querySelector('.mtl-meta a')||{}).href,when:t1.querySelector('.mtl-when').textContent,what:t1.querySelector('.mtl-what').textContent},
   t23:t23&&{st:t23.dataset.status,a:(t23.querySelector('.mtl-meta a')||{}).href},t10:t10&&{st:t10.querySelector('.mtl-st').textContent,col:t10.dataset.st},t05:t05&&{st:t05.querySelector('.mtl-st').textContent,col:t05.dataset.st,ex:t05.querySelector('.mtl-exec').textContent},t13:t13&&(t13.querySelector('.mtl-meta a')||{}).href}});
ok('a row shows date/time asked · what · executor · status · proof link',r.t1&&r.t1.when==='2026-10-14 08:41 ET'&&r.t1.what==='Show the Einar capsule'&&/☁️ Cloud/.test(r.t1.ex)&&/🟢✅ Completed with proof/.test(r.t1.st)&&/claude\.ai\/artifact/.test(r.t1.a),JSON.stringify(r.t1));
ok('status colours: running = yellow, blocked = red (needs Jorge)',/🔄 Running/.test(r.t05.st)&&r.t05.col==='wait'&&/⛔ Blocked/.test(r.t10.st)&&r.t10.col==='down');
ok('executors named with icons (☁️ Cloud + 🖥️ Desktop RAMBO)',/☁️ Cloud \+ 🖥️ Desktop RAMBO/.test(r.t05.ex),r.t05.ex);
ok('a repo-path proof becomes a GitHub link',/github\.com\/.*runner-results\/ROOT-CAUSE_SINGLE-SOURCE-OF-TRUTH_2026-10-14\.md$/.test(r.t13||''),r.t13);
ok('db "task-log" overrides a seed row status and proof',r.t23.st==='done-proof'&&/proof-23/.test(r.t23.a||''));
// 3. filter + counts
const exp={scheduled:0,running:0,'done-proof':0,blocked:0};
const f=await p.evaluate(()=>{const out={};const opts=[...document.querySelectorAll('#mtlf option')].map(o=>o.value);for(const v of opts){VTES.mtlFilter(v);const rows=[...document.querySelectorAll('#mtlrows .mtl-row')].map(r=>r.dataset.status);
  const lab=[...document.querySelectorAll('#mtlf option')].find(o=>o.value===v).textContent;out[v]={n:rows.length,st:[...new Set(rows)],lab}}VTES.mtlFilter('all');return out});
const total=f.all.n;const okF=['scheduled','running','done-proof','blocked','deferred'].every(k=>f[k].st.every(s=>s===k))&&f.completed.st.every(s=>/^done/.test(s));
ok('status drop-down: All · Scheduled · Running · Completed · With proof · Blocked (· Deferred), each shows only its status',okF&&['all','scheduled','running','completed','done-proof','blocked'].every(k=>f[k]),Object.keys(f).map(k=>k+'='+f[k].n).join(' '));
ok('counts per status are shown and add up',Object.keys(f).every(k=>f[k].lab.includes('('+f[k].n+')'))&&f.scheduled.n+f.running.n+f.completed.n+f.blocked.n+f.deferred.n===total,total+' total');
await p.click('.mtl-chip[data-f="blocked"]');const chip=await p.evaluate(()=>document.querySelectorAll('#mtlrows .mtl-row').length);ok('status chips click through too',chip===f.blocked.n,chip);
await p.evaluate(()=>VTES.mtlFilter('all'));
await p.click('#mtlord');const nf=await p.evaluate(()=>[...document.querySelectorAll('#mtlrows .mtl-when')].map(x=>x.textContent));ok('newest-first toggle',nf.every((x,i)=>i===0||nf[i-1]>=x),nf[0]);
// 4. comment → db task-comments
await p.evaluate(()=>{VTES.toggle('mtc-T-20261014-22');document.getElementById('mtt-T-20261014-22').value='Please finish the Medley capsule deep dive today.'});
await p.click('.mtl-row[data-id="T-20261014-22"] .commentbox button');await p.waitForTimeout(250);
const db=await p.evaluate(()=>__db());const cm=Object.keys(db).filter(k=>k.startsWith('task-comments/')).map(k=>db[k]);
ok('💬 Comment writes {taskId, executor, text, at} to the db collection "task-comments"',cm.length===1&&cm[0].taskId==='T-20261014-22'&&cm[0].executor==='Cloud'&&/Medley capsule/.test(cm[0].text)&&!isNaN(Date.parse(cm[0].at)),JSON.stringify(cm[0]));
await p.evaluate(()=>__dbput('task-comments/reply1',{taskId:'T-20261014-22',executor:'Cloud',by:'EXEC-01',reply:true,text:'Routed to Cloud. Starting now.',rec:'Approve the 2-pass plan: census first, then fill the gaps.',at:new Date(Date.now()+1000).toISOString()}));await p.waitForTimeout(300);
const th=await p.evaluate(()=>{const b=document.getElementById('mtc-T-20261014-22');return {open:b.classList.contains('open'),t:b.innerText}});
ok('the runner\'s reply shows in the same thread, with its agent recommendation',th.open&&/Medley capsule/.test(th.t)&&/EXEC-01: Routed to Cloud/.test(th.t)&&/Agent recommendation: Approve the 2-pass plan/.test(th.t));
ok('every button in the log has a hover tip',await p.evaluate(()=>[...document.querySelectorAll('#pane-MYASKS #mtl button,#pane-MYASKS #mtl select')].every(x=>(x.dataset.tip||'').trim())));
// 5. reload keeps order choice + thread
await p.reload();await p.waitForTimeout(1300);await p.evaluate(()=>VTES.show('MYASKS'));await p.waitForTimeout(200);
const rl=await p.evaluate(()=>({ord:document.getElementById('mtlord').textContent,c:document.querySelector('.mtl-row[data-id="T-20261014-22"] .actions button').textContent}));ok('after reload: newest-first remembered, thread count kept',/Newest first/.test(rl.ord)&&/Comment \(2\)/.test(rl.c),JSON.stringify(rl));
// 6. blocked rows wait on you
const w=await p.evaluate(()=>{const L=VTES.attItems().filter(x=>x.kind==='mtl');const t=document.querySelector('.tab[data-tab="MYASKS"]');return {n:L.length,flash:t.classList.contains('attn'),badge:+(t.dataset.attn||0),rec:L.every(x=>x.risky&&x.rec==='approve')}});
ok('blocked rows show in Waiting on you (red), and the MYASKS tab flashes with its count',w.n===f.blocked.n&&w.flash&&w.badge===w.n&&w.rec,JSON.stringify(w));
await p.evaluate(()=>VTES.attAct('mtl-T-20261014-12','approve'));await p.waitForTimeout(300);const db3=await p.evaluate(()=>__db());
ok('answering a blocked row in Waiting on you posts the answer to its executor',Object.values(db3).some(v=>v.taskId==='T-20261014-12'&&/Owner: YES/.test(v.text)));
// 7. money + read aloud
ok('money locked: no $ amounts in the log',await p.evaluate(()=>!(document.getElementById('pane-MYASKS').innerText.match(/\$\s?\d/))));
const ra=await p.evaluate(()=>{try{Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true})}catch(e){}return VTES.mtlRead()});ok('🔊 Read the log answers "unavailable" when speech is missing (no hang)',ra==='unavailable',ra);
if(PNG){await p.evaluate(()=>{VTES.mtlOrder(false);VTES.toggle('mtc-T-20261014-22');document.getElementById('pane-MYASKS').scrollIntoView()});await p.screenshot({path:PNG+'-1100.png'})}
// 8. no db: kept locally, sent on next load with db
const q=await b.newPage({viewport:{width:375,height:800}});const e3=[];q.on('pageerror',e=>e3.push(e.message));await q.addInitScript(MOCK);
await q.goto('file://'+PANEL);await q.waitForTimeout(300);await q.evaluate(()=>sessionStorage.setItem('__nodb','1'));await q.reload();await q.waitForTimeout(1200);
await q.evaluate(()=>VTES.show('MYASKS'));const m1=await q.evaluate(async()=>{const w=await VTES.mtlComment('T-20261014-03','Phone test comment');return {w,msg:document.getElementById('mtlmsg').textContent}});
ok('no database in this window: the comment is kept and the page says it is not delivered yet',m1.w==='local'&&/Not delivered yet/.test(m1.msg),m1.msg);
const sw=await q.evaluate(()=>{document.querySelectorAll('#pane-MYASKS .commentbox').forEach(c=>c.classList.add('open'));return document.documentElement.scrollWidth});ok('375px: no sideways scroll with every comment box open',sw<=375,sw);
if(PNG)await q.screenshot({path:PNG+'-375.png'});
await q.evaluate(()=>sessionStorage.removeItem('__nodb'));await q.reload();await q.waitForTimeout(1300);
const fl=await q.evaluate(()=>Object.values(__db()).some(v=>v.taskId==='T-20261014-03'&&v.text==='Phone test comment'));ok('the kept comment is sent the next time the database is reachable',fl);
errs.push(...e3);await q.close();
ok('no page errors',errs.length===0,errs.slice(0,3).join(' | '));
console.log(fails?'RESULT: '+fails+' FAILED':'RESULT: ALL PASS');await b.close();process.exit(fails?1:0)})();
