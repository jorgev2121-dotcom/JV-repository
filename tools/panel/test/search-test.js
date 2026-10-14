// search-test.js — 2026-10-14. The top search box ("OCR" search, per Jorge) and the Read / Stop buttons.
// 1. Draws at least 20 random queries from the page's own data (email addresses, project names and addresses,
//    TRK numbers, hashtags with and without #, mixed case, multi-word) plus the fixed "#ph11 #PLaza" and one id the
//    page does not hold. Each query must show "N found" with N >= 1, or the honest "not in this page's data" line,
//    within 500 ms. Enter and the Search button both search. Clicking a result jumps to its tab and highlights it.
// 2. Money stays locked in results (no visible $ amounts) until 0000 is typed.
// 3. 375px with results on screen: no sideways scroll.
// 4. Read never hangs: speechSynthesis missing, hanging (never starts), and started-but-never-ends + Stop.
// Usage: node search-test.js <abs panel path> [seed]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const PANEL=process.argv[2];let seed=Number(process.argv[3])||(Date.now()%1000000);
const rnd=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648};const SEED0=seed;
const pick=a=>a[Math.floor(rnd()*a.length)];
const mix=s=>s.split('').map(c=>rnd()<0.5?c.toUpperCase():c.toLowerCase()).join('');
let fails=0;const ok=(name,cond,extra)=>{console.log((cond?'PASS ':'FAIL ')+name+(extra!==undefined&&extra!==''?' '+extra:''));if(!cond)fails++};
const NA=/Read aloud isn't available in this window — use Speechify or press Ctrl\+Alt\+R on the PC/;
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
console.log('seed',SEED0);
// ---------- 1. random queries ----------
const p=await b.newPage({viewport:{width:1100,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.claude={use:async()=>null};try{localStorage.clear()}catch(e){}});
await p.goto('file://'+PANEL);await p.waitForTimeout(900);
const pools=await p.evaluate(()=>{const IX=VTES.searchIndex(),cd=VTES.clData(),CLLIST=cd.list,CLJOBS=cd.jobs,u=a=>[...new Set(a.filter(Boolean))];
  const JN=IX.filter(x=>x.kind==='Job folder (Drive)').map(x=>x.name);
  const emails=u(CLLIST.flatMap(c=>c.e).concat(CLJOBS.flatMap(J=>J.p.flatMap(x=>x[2]))));
  const projects=u(CLJOBS.map(J=>J.w).concat(JN.map(n=>n.split(/ _ | - /).pop())));
  const trks=u(JN.flatMap(n=>n.match(/TRK-20\d\d-\d{4}(-[A-Z]+)?/g)||[]));
  const tags=u(IX.flatMap(x=>x.tags)).filter(t=>t.length>3);
  const words=u(CLJOBS.flatMap(J=>J.w.split(/[\s()_,.]+/)).filter(w=>w.length>=4&&/[a-z]/i.test(w)));
  const people=u(CLLIST.map(c=>c.n));
  return {emails,projects,trks,tags,words,people}});
console.log('pools: emails',pools.emails.length,'projects',pools.projects.length,'TRKs',pools.trks.length,'hashtags',pools.tags.length,'people',pools.people.length);
const Q=[['fixed','#ph11 #PLaza'],['fixed','miguel@mzsolutions.org'],['absent','BLC2026-1438']];
for(let i=0;i<4;i++)Q.push(['email',rnd()<0.4?mix(pick(pools.emails)):pick(pools.emails)]);
for(let i=0;i<4;i++)Q.push(['project/address',rnd()<0.4?mix(pick(pools.projects)):pick(pools.projects)]);
for(let i=0;i<3;i++)Q.push(['TRK',rnd()<0.5?pick(pools.trks).toLowerCase():pick(pools.trks)]);
for(let i=0;i<3;i++)Q.push(['hashtag #',mix(pick(pools.tags))]);
for(let i=0;i<3;i++)Q.push(['hashtag bare',pick(pools.tags).replace(/^#/,'')]);
for(let i=0;i<2;i++)Q.push(['person',mix(pick(pools.people))]);
for(let i=0;i<3;i++)Q.push(['multi-word','#'+pick(pools.words)+' '+pick(pools.words)]);
Q.push(['multi-word',pick(pools.trks)+' '+pick(pools.words).toUpperCase()]);
const rows=[];let slow=0,bad=0;
for(const [kind,q] of Q){
  const r=await p.evaluate(q=>{const el=document.getElementById('q');const t0=performance.now();el.value=q;el.dispatchEvent(new Event('input',{bubbles:true}));
    const c=document.getElementById('scount'),n=document.getElementById('snone');const ms=performance.now()-t0;
    const m=c&&c.textContent.match(/(\d+) found/);return {ms:Math.round(ms*10)/10,n:m?+m[1]:-1,honest:!!(n&&/not in this page's data — Drive search/.test(n.textContent)),hits:document.querySelectorAll('#searchpane .hit').length,any:/no item has all/.test(c?c.textContent:'')}},q);
  const good=(r.n>=1&&r.hits>=1)||(r.n===0&&r.honest);if(!good)bad++;if(r.ms>500)slow++;
  rows.push({kind,q,...r});console.log((good&&r.ms<=500?'  ok  ':'  BAD ')+kind.padEnd(16)+JSON.stringify(q).padEnd(56)+' '+(r.n===0?'0 found (honest not-in-page line)':r.n+' found'+(r.any?' (OR fallback)':''))+' · '+r.ms+' ms')}
ok('at least 20 queries drawn from page data',Q.length>=20,Q.length);
ok('every query returns >=1 result or the honest "not in this page\'s data" line',bad===0,bad+' bad');
ok('every query answers within 500 ms',slow===0,'max '+Math.max(...rows.map(r=>r.ms))+' ms');
const ph=rows.find(r=>r.q==='#ph11 #PLaza');ok('"#ph11 #PLaza" finds items (AND of both words)',ph.n>=1&&!ph.any,ph.n+' found');
const phTxt=await p.evaluate(()=>{const el=document.getElementById('q');el.value='#ph11 #PLaza';el.dispatchEvent(new Event('input'));return document.getElementById('searchpane').innerText});
ok('"#ph11 #PLaza" results mention PH11 and Plaza of Bal Harbour',/PH11/.test(phTxt)&&/Bal Harbour/i.test(phTxt));
const ab=rows.find(r=>r.kind==='absent');ok('id the page does not hold gives the honest line and offers Drive search',ab.n===0&&ab.honest&&await p.$('#snone button')!==null&&await p.$('#drivehits')!==null);
// Enter + Search button
await p.fill('#q','');await p.dispatchEvent('#q','input');
await p.evaluate(()=>{document.getElementById('q').value='TRK-2026-1265'});await p.focus('#q');await p.keyboard.press('Enter');
ok('Enter searches',/\d+ found/.test(await p.textContent('#scount')),await p.textContent('#scount'));
await p.evaluate(()=>{document.getElementById('q').value='Plaud';});await p.click('#qgo');
ok('Search button searches',/^\d+ found for “Plaud”/.test(await p.textContent('#scount')),await p.textContent('#scount'));
// click a result jumps
await p.fill('#q','miguel@mzsolutions.org');await p.click('#searchpane .hit .go');await p.waitForTimeout(250);
const j=await p.evaluate(()=>({tab:(document.querySelector('.tab.active')||{}).dataset.tab,flash:document.querySelectorAll('.srchflash').length,sp:!!document.getElementById('searchpane')}));
ok('clicking a result jumps to its tab and highlights it',j.tab==='CLIENTS'&&j.flash>=1&&!j.sp,JSON.stringify(j));
// ---------- 2. money lock ----------
const dollars=()=>p.evaluate(()=>{const s=document.getElementById('searchpane');return s?(s.innerText.match(/\$\s?\d[\d,]*/g)||[]).length:-1});
await p.fill('#q','invoice');await p.waitForTimeout(50);
const lockedN=await dollars(),masks=await p.$$eval('#searchpane .mz',e=>e.length);
ok('money locked: no $ amounts in results',lockedN===0,'visible='+lockedN+' masked='+masks);
await p.click('#mzbtn');await p.fill('#mzpin','0000');await p.click('#mzform button[type=submit]');await p.waitForTimeout(200);
await p.fill('#q','');await p.dispatchEvent('#q','input');await p.fill('#q','invoice');await p.waitForTimeout(150);
const openN=await dollars();ok('money open (0000): amounts show in results',masks===0||openN>0,'visible='+openN);
await p.click('#mzbtn');await p.waitForTimeout(250);ok('relocked: amounts hidden again',await dollars()===0);
ok('no page errors (desktop)',errs.length===0,JSON.stringify(errs));await p.close();
// ---------- 3. 375px ----------
const ph375=await b.newPage({viewport:{width:375,height:800}});const e2=[];ph375.on('pageerror',e=>e2.push(e.message));
await ph375.addInitScript(()=>{window.claude={use:async()=>null}});await ph375.goto('file://'+PANEL);await ph375.waitForTimeout(900);
let worst=0;for(const q of ['#ph11 #PLaza','miguel@mzsolutions.org','BLC2026-1438','#money']){await ph375.fill('#q',q);await ph375.waitForTimeout(80);worst=Math.max(worst,await ph375.evaluate(()=>document.documentElement.scrollWidth))}
ok('375px results: no sideways scroll',worst<=375,'scrollWidth max '+worst);ok('no page errors (375px)',e2.length===0,JSON.stringify(e2));await ph375.close();
// ---------- 4. Read never hangs ----------
const stubs={
  missing:()=>{Object.defineProperty(window,'speechSynthesis',{configurable:true,get:()=>undefined})},
  hanging:()=>{window.__c=0;const s={speaking:false,pending:true,speak(){},cancel(){window.__c++},getVoices(){return []}};Object.defineProperty(window,'speechSynthesis',{configurable:true,get:()=>s})},
  endless:()=>{window.__c=0;const s={speaking:true,pending:false,speak(u){setTimeout(()=>u.onstart&&u.onstart(),50)},cancel(){window.__c++},getVoices(){return []}};Object.defineProperty(window,'speechSynthesis',{configurable:true,get:()=>s})}};
for(const [name,fn] of Object.entries(stubs)){
  const q=await b.newPage({viewport:{width:1100,height:900}});const e3=[];q.on('pageerror',e=>e3.push(e.message));
  await q.addInitScript(()=>{window.claude={use:async()=>null}});await q.addInitScript(fn);
  await q.goto('file://'+PANEL);await q.waitForTimeout(800);
  const t0=Date.now();await q.click('button[onclick="VTES.readSel()"]');
  if(name==='endless'){await q.waitForTimeout(300);const m1=await q.textContent('#voicemsg');ok('endless speech: shows Reading… once it starts',/Reading/.test(m1),JSON.stringify(m1));
    await q.click('#readstop');const m2=await q.textContent('#voicemsg');const c=await q.evaluate(()=>window.__c);
    ok('endless speech: Stop clears Reading… and cancels speech',m2==='Stopped.'&&c>0,JSON.stringify(m2)+' cancels='+c);
    await q.waitForTimeout(1800);ok('endless speech: nothing re-sets Reading… after Stop',!/Reading/.test(await q.textContent('#voicemsg')))}
  else{await q.waitForFunction(()=>/isn't available/.test(document.getElementById('voicemsg').textContent),null,{timeout:3500}).catch(()=>{});
    const m=await q.textContent('#voicemsg'),ms=Date.now()-t0;
    ok('speechSynthesis '+name+': Read shows the not-available line, no stuck Reading…',NA.test(m)&&!/Reading/.test(m),JSON.stringify(m)+' after '+ms+' ms');
    ok('speechSynthesis '+name+': cleared within 2.5 s',ms<=2600,ms+' ms');
    await q.click('#readstop');ok('speechSynthesis '+name+': Stop still works',(await q.textContent('#voicemsg'))==='Stopped.')}
  if(name==='hanging'){await q.evaluate(()=>VTES.show('APPROVALS'));await q.waitForTimeout(200);
    const said=await q.evaluate(()=>{const c=document.querySelector('[data-id]');return c&&VTES.sayCard?VTES.sayCard(c.dataset.id):''});
    if(said){await q.waitForTimeout(2300);const rm=await q.evaluate(()=>(document.getElementById('ra-msg')||{}).textContent||'');ok('approvals read-aloud (hanging): not-available line after 2 s',NA.test(rm),JSON.stringify(rm))}}
  ok('no page errors ('+name+')',e3.length===0,JSON.stringify(e3));await q.close()}
console.log('SAMPLE '+JSON.stringify(rows.map(r=>[r.kind,r.q,r.n,r.ms])));
console.log(fails?'RESULT FAIL '+fails:'RESULT ALL PASS');await b.close();process.exit(fails?1:0)})();
