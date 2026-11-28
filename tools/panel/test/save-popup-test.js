// save-popup-test.js — 2026-10-14. SPEC_SAVE-POPUP-BUTTON: "⭐ Save" on search results, capsules, email rows, documents and
// client cards; one question (which collection); items stored in the db collection "saved". Saves 5 random items through
// the real dialog, then searches each collection with 5 misspellings (Saved pane finder and the top search box), plus the
// fixed "#plza" / "plaza" / "#PLAZA-PH11". Defer, comment and note survive a reload. A due pop-up shows in Waiting on you.
// Export = one Orange Tree HTML file. Money stays locked. 375px fits. Usage: node save-popup-test.js <abs panel path> [seed] [png prefix]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');const PANEL=process.argv[2];let seed=Number(process.argv[3])||(Date.now()%1000000);const PNG=process.argv[4]||'';
const rnd=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648};const SEED0=seed;const pick=a=>a[Math.floor(rnd()*a.length)];
let fails=0;const ok=(name,cond,extra)=>{console.log((cond?'PASS ':'FAIL ')+name+(extra!==undefined&&extra!==''?' '+extra:''));if(!cond)fails++};
const MOCK=()=>{if(!sessionStorage.getItem('__init')){try{localStorage.clear()}catch(e){}sessionStorage.setItem('__init','1');
  const now=Date.now();localStorage.setItem('__mockdb','{}')}
 const K='__mockdb',load=()=>JSON.parse(localStorage.getItem(K)||'{}'),save=o=>localStorage.setItem(K,JSON.stringify(o)),subs=[];
 const sd=(id,v)=>({id,exists:!!v,data:()=>v});
 const list=c=>{const o=load();return Object.keys(o).filter(k=>k.startsWith(c+'/')&&k.split('/').length===2).map(k=>sd(k.split('/')[1],o[k]))};
 const notify=()=>subs.forEach(([c,fn])=>setTimeout(()=>fn({docs:list(c)}),0));
 const DB={doc(p){return {get:async()=>sd(p.split('/').pop(),load()[p]),set:async v=>{const o=load();o[p]=JSON.parse(JSON.stringify(v));save(o);notify()},
   update:async v=>{const o=load();if(!o[p])throw {code:'not_found'};o[p]=Object.assign(o[p],JSON.parse(JSON.stringify(v)));save(o);notify()},delete:async()=>{const o=load();delete o[p];save(o);notify()}}},
  collection(c){const q={get:async()=>({docs:list(c)}),onSnapshot(fn){subs.push([c,fn]);setTimeout(()=>fn({docs:list(c)}),0);return ()=>{}},where(){return q},orderBy(){return q},limit(){return q},
   doc(id){return DB.doc(c+'/'+(id||Math.random().toString(36).slice(2)))},add:async v=>{const id=Math.random().toString(36).slice(2);await DB.doc(c+'/'+id).set(v);return DB.doc(c+'/'+id)}};return q}};
 window.__db=()=>load();window.claude={use:async n=>n==='db'?DB:null}};
// 5 misspellings of a collection name: upper case with #, no #, one letter dropped, two letters swapped, one letter changed
function miss(name){const w=name.replace(/^#/,''),i=1+Math.floor(rnd()*(w.length-2)),j=1+Math.floor(rnd()*(w.length-2));const sub=w.slice(0,j)+(w[j]==='x'?'z':'x')+w.slice(j+1);
  return ['#'+w.toUpperCase(),w,'#'+w.slice(0,i)+w.slice(i+1),w.slice(0,i)+w[i+1]+w[i]+w.slice(i+2),sub]}
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());console.log('seed',SEED0);
const ctx=await b.newContext({viewport:{width:1100,height:900},acceptDownloads:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(MOCK);await p.goto('file://'+PANEL);await p.waitForTimeout(1300);
// 1. Save buttons everywhere
await p.evaluate(()=>{const q=document.getElementById('q');q.value='plaza';q.dispatchEvent(new Event('input'))});await p.waitForTimeout(400);
const cnt=await p.evaluate(()=>Object.fromEntries([['search results','#searchpane .hit'],['capsules','.clcard'],['email rows','.cllastrow'],['documents','.librow'],['reports','.rep'],['client cards','.clrow']].map(([k,s])=>{const all=[...document.querySelectorAll(s)];return [k,all.length+'/'+all.filter(e=>e.querySelector(':scope>.savebtn')).length]})));
ok('a ⭐ Save button on every search result, capsule, email row, document, report and client card',Object.values(cnt).every(v=>{const [a,c]=v.split('/');return +a>0&&a===c}),JSON.stringify(cnt));
ok('every Save button has a hover tip',await p.evaluate(()=>[...document.querySelectorAll('.savebtn')].every(b=>/Save this/.test(b.dataset.tip||''))));
await p.evaluate(()=>{const q=document.getElementById('q');q.value='';q.dispatchEvent(new Event('input'))});
// 2. save 5 random items through the dialog
const NAMES=['#plaza','#medley-house','#groves','#popup-friday','#einar-matter'];const TYPES=[['#searchpane .hit',null],['.clcard','CLIENTS'],['.cllastrow','CLIENTS'],['.librow','LINKS'],['.rep','REPORTS'],['.clrow','CLIENTS']];
const saved=[];
for(let k=0;k<5;k++){const [sel,tab]=TYPES[k===0?0:1+Math.floor(rnd()*(TYPES.length-1))];
  if(!tab){await p.evaluate(w=>{const q=document.getElementById('q');q.value=w;q.dispatchEvent(new Event('input'))},pick(['plaza','medley','cutler','groves','permit']));await p.waitForTimeout(400)}else{await p.evaluate(t=>VTES.show(t),tab);await p.waitForTimeout(300)}
  const n=await p.evaluate(s=>document.querySelectorAll(s+'>.savebtn').length,sel);const idx=Math.floor(rnd()*n);
  const title=await p.evaluate(([s,i])=>{const b=document.querySelectorAll(s+'>.savebtn')[i];b.scrollIntoView({block:'center'});b.click();return document.querySelector('#savedlg .attn-t, #savedlg p b').textContent},[sel,idx]);
  await p.waitForTimeout(80);const dlg=await p.evaluate(()=>!document.getElementById('savedlg').hidden&&!!document.getElementById('svname'));
  await p.fill('#svname',NAMES[k]);await p.press('#svname','Enter');await p.waitForTimeout(250);saved.push({sel,title,coll:NAMES[k],dlg})}
ok('Save asks one thing (which collection) in a small dialog',saved.every(s=>s.dlg));
const db1=await p.evaluate(()=>__db());const sv=Object.keys(db1).filter(k=>k.startsWith('saved/')).map(k=>db1[k]);
ok('5 random items saved in the db collection "saved"',sv.length===5&&NAMES.every(n=>sv.some(r=>r.coll===n)),saved.map(s=>s.sel+' → '+s.coll+': '+s.title.slice(0,40)).join(' | '));
// suggestions + misspelled name merges
const sg=await p.evaluate(()=>VTES.saveAsk({kind:'Test',title:'Plaza permit card',url:'https://example.com/plaza',sub:'',tags:['#plaza']}));
ok('Save suggests existing collections',Array.isArray(sg)&&sg.includes('#plaza'),JSON.stringify(sg));
await p.fill('#svname','#plza');await p.press('#svname','Enter');await p.waitForTimeout(250);
const merged=await p.evaluate(()=>{const L=VTES.savedList();return {plaza:Object.values(L).filter(r=>r.coll==='#plaza').length,colls:[...new Set(Object.values(L).map(r=>r.coll))].length}});
ok('a misspelled new name ("#plza") lands in the existing #plaza, no duplicate collection',merged.plaza===2&&merged.colls===5,JSON.stringify(merged));
// 3. fuzzy search: 5 misspellings each, Saved finder + top search
let bad=[];for(const n of NAMES){for(const m of miss(n)){const r=await p.evaluate(m=>{const f=VTES.savedFind(m);const q=document.getElementById('q');q.value=m;q.dispatchEvent(new Event('input'));
   const top=[...document.querySelectorAll('#searchpane .hit')].slice(0,3).map(h=>h.innerText);q.value='';q.dispatchEvent(new Event('input'));return {f,top}},m);
  const inTop=r.top.some(t=>t.includes('Saved collection')&&t.includes('⭐ '+n));if(!r.f.includes(n)||!inTop)bad.push(n+'←'+m+' '+JSON.stringify(r.f)+(inTop?'':' (not in top 3 search results)'))}}
ok('each of 5 collections pops up for 5 misspellings, in the Saved finder and in the top 3 search results (25 queries)',bad.length===0,bad.slice(0,4).join(' | '));
const fx=await p.evaluate(()=>['#plza','plaza','#PLAZA-PH11'].map(q=>VTES.savedFind(q).join(',')));ok('"#plza", "plaza", "#PLAZA-PH11" all pop up #plaza',fx.every(x=>x.split(',').includes('#plaza')),JSON.stringify(fx));
const neg=await p.evaluate(()=>VTES.savedFind('zzqx'));ok('an unrelated word finds no collection',neg.length===0);
// 4. open a collection: item actions
await p.click('#savedbtn');await p.waitForTimeout(150);await p.fill('#svq','PLZA');await p.waitForTimeout(100);
ok('Saved pane finder filters chips by misspelling',await p.evaluate(()=>[...document.querySelectorAll('#svchips .svchip')].map(c=>c.dataset.norm).join()==='plaza'));
await p.click('#svchips .svchip');await p.waitForTimeout(150);
const pane=await p.evaluate(()=>{const P=document.getElementById('savedpane'),its=[...P.querySelectorAll('.svit')];return {title:(document.getElementById('svtitle')||{}).textContent,n:its.length,
  acts:its.every(i=>{const t=[...i.querySelectorAll('button,a')].map(x=>x.textContent).join('|');return /Open/.test(t)&&/View/.test(t)&&/Edit note/.test(t)&&/Copy for email/.test(t)&&/Email draft/.test(t)&&/Defer/.test(t)&&/Comment/.test(t)}),
  mail:[...P.querySelectorAll('a.svmail')].every(a=>/^mailto:\?subject=/.test(a.getAttribute('href'))),tips:[...P.querySelectorAll('button,a,input[type=search]')].filter(x=>x.tagName!=='INPUT'&&!(x.dataset.tip||'').trim()).length,
  docs:its.map(i=>i.dataset.doc)}});
ok('opening a collection shows its pop-up file of items',/#plaza · 2 items/.test(pane.title)&&pane.n===2,pane.title);
ok('each item: Open · View · Edit note · Send (Copy for email + Email draft) · Defer · Comment',pane.acts);
ok('Send never sends: a copy button and a mailto draft link only',pane.mail);
ok('every control in the pane has a hover tip',pane.tips===0,pane.tips+' without');
if(PNG)await p.screenshot({path:PNG+'-collection-1100.png'});
const [d0,d1]=pane.docs;
await p.evaluate(d=>{VTES.toggle('svn-'+d);document.getElementById('svnt-'+d).value='Bring to Friday meeting'},d0);await p.evaluate(d=>VTES.savedNote(d),d0);
await p.evaluate(d=>{VTES.toggle('svc-'+d);document.getElementById('svct-'+d).value='Alec asked for this one'},d0);await p.evaluate(d=>VTES.savedComment(d),d0);
const tom=new Date(Date.now()+2*86400000).toISOString().slice(0,10);await p.evaluate(([d,t])=>VTES.savedDefer(d,t),[d1,tom]);await p.waitForTimeout(200);
const hid=await p.evaluate(d=>!document.querySelector('#savedpane .svit[data-doc="'+d+'"]'),d1);ok('Defer hides the item until the date',hid);
// reload: round trip
await p.reload();await p.waitForTimeout(1400);
const rt=await p.evaluate(([a,b2])=>{const L=VTES.savedList();VTES.savedOpen('#plaza');return {note:L[a]&&L[a].note,com:L[a]&&(L[a].comments||[]).map(c=>c.text).join('|'),def:L[b2]&&L[b2].deferUntil,shown:[...document.querySelectorAll('#savedpane .svit')].map(i=>i.dataset.doc),defnote:/Show 1 deferred/.test(document.getElementById('savedpane').innerText)}},[d0,d1]);
const db2=await p.evaluate(()=>__db());
ok('after reload: note, comment thread and defer date are kept (db)',rt.note==='Bring to Friday meeting'&&rt.com==='Alec asked for this one'&&rt.def&&rt.def.slice(0,10)===tom&&db2['saved/'+d0].comments.length===1&&db2['saved/'+d1].deferUntil===rt.def,JSON.stringify(rt));
ok('after reload: the deferred item stays hidden, with a "Show 1 deferred" switch',rt.shown.length===1&&rt.shown[0]===d0&&rt.defnote);
// 5. due pop-up in Waiting on you
await p.evaluate(d=>VTES.savedDefer(d,'2026-01-02'),d1);await p.waitForTimeout(1700);
const due=await p.evaluate(()=>{const L=VTES.attItems().filter(x=>x.kind==='pop');return {n:L.length,flash:document.getElementById('savedbtn').classList.contains('attn'),key:L[0]&&L[0].key}});
ok('a deferred item whose date has come shows in Waiting on you, and ⭐ Saved flashes',due.n===1&&due.flash,JSON.stringify(due));
await p.evaluate(k=>VTES.attAct(k,'approve'),due.key);await p.waitForTimeout(300);
const seen=await p.evaluate(d=>({left:VTES.attItems().filter(x=>x.kind==='pop').length,def:VTES.savedList()[d].deferUntil}),d1);ok('approving the pop-up marks it seen (back in the collection)',seen.left===0&&seen.def==='',JSON.stringify(seen));
// 6. money
await p.evaluate(()=>{VTES.saveAsk({kind:'Test',title:'Medley invoice for $8,000 plus $250 fee',url:'',sub:'Owed $8,000',tags:[]})});await p.fill('#svname','#money-test');await p.press('#svname','Enter');await p.waitForTimeout(250);
await p.evaluate(()=>VTES.savedOpen('#money-test'));await p.waitForTimeout(200);
const mz=await p.evaluate(()=>(document.getElementById('savedpane').innerText.match(/\$\s?\d/g)||[]).length);
const [dl]=await Promise.all([p.waitForEvent('download',{timeout:5000}),p.click('#svexp')]);const html=fs.readFileSync(await dl.path(),'utf8');
ok('money locked: no $ amounts in the collection pop-up',mz===0,mz);
ok('money locked: no $ amounts in the exported file',!/\$\s?\d/.test(html));
// 7. export
await p.evaluate(()=>VTES.savedOpen('#plaza'));const [dl2]=await Promise.all([p.waitForEvent('download',{timeout:5000}),p.click('#svexp')]);const h2=fs.readFileSync(await dl2.path(),'utf8');
ok('Export: one designed HTML file (Orange Tree: branches open, a checkbox per item, View these together, Copy for email, print in color)',/^<!doctype html>/.test(h2)&&/details class="br" open/.test(h2)&&(h2.match(/type="checkbox"/g)||[]).length===2&&/View these together/.test(h2)&&/Copy for email/.test(h2)&&/print-color-adjust:exact/.test(h2)&&/Print in color/.test(h2),dl2.suggestedFilename());
if(PNG){fs.writeFileSync(PNG+'-export.html',h2);const e=await b.newPage({viewport:{width:900,height:700}});await e.goto('file://'+PNG+'-export.html');await e.screenshot({path:PNG+'-export.png'});await e.close()}
// 8. 375px
const q=await b.newPage({viewport:{width:375,height:800}});const e3=[];q.on('pageerror',e=>e3.push(e.message));await q.addInitScript(MOCK);await q.goto('file://'+PANEL);await q.waitForTimeout(1100);
await q.evaluate(()=>{VTES.saveAsk({kind:'Test',title:'Phone test item with a long long name that wraps',url:'https://example.com/a/very/long/link/that/should/wrap/nicely',sub:'',tags:[]})});const w1=await q.evaluate(()=>document.documentElement.scrollWidth);
await q.fill('#svname','#phone');await q.press('#svname','Enter');await q.evaluate(()=>VTES.savedOpen('#phone'));await q.waitForTimeout(150);
const w2=await q.evaluate(()=>{document.querySelectorAll('#savedpane .commentbox').forEach(c=>c.classList.add('open'));const P=document.getElementById('savedpane');return {sw:document.documentElement.scrollWidth,pw:P.scrollWidth,cw:P.clientWidth}});
await q.evaluate(()=>{VTES.savedOpen(false);const s=document.getElementById('q');s.value='plaza';s.dispatchEvent(new Event('input'))});await q.waitForTimeout(300);const w3=await q.evaluate(()=>document.documentElement.scrollWidth);
ok('375px: no sideways scroll (Save dialog, collection pop-up with every box open, search results with Save buttons)',w1<=375&&w2.sw<=375&&w2.pw<=w2.cw+1&&w3<=375,JSON.stringify([w1,w2,w3]));
if(PNG){await q.evaluate(()=>VTES.savedOpen('#phone'));await q.screenshot({path:PNG+'-collection-375.png'})}
errs.push(...e3);await q.close();
ok('no page errors',errs.length===0,errs.slice(0,3).join(' | '));
console.log(fails?'RESULT: '+fails+' FAILED':'RESULT: ALL PASS');await b.close();process.exit(fails?1:0)})();
