// orphans-llms-test.js — 2026-10-14. Two BUILD pieces:
// ORPHANS "Resolve to TRK button" (a Propose match form per OPH row that saves a PROPOSAL only) and
// LLMS "Fixed IDs LLM-01…09 and scarce/free label".
// Checks: both render; the form refuses malformed TRKs (and the 9xxx admin band) and accepts TRK-2026-1262;
// the proposal is written only to db doc proposals/<OPH> (never jobs/, never a connector call); the
// "Proposal only..." line is shown; LLM-01..09 present, in order, same after reload, each with a
// scarce/free/unknown label derived from the page's cost info; BUILD built-count up by exactly 2 vs baseline
// (git HEAD, or an optional 3rd argument path); 0000 money lock intact; 375px has no sideways scroll.
// Usage: node orphans-llms-test.js <abs panel path> <png path> [baseline panel path]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const PANEL=process.argv[2],PNG=process.argv[3]||'/tmp/orphans-llms.png';
let fails=0;const ok=(name,cond,extra)=>{console.log((cond?'PASS ':'FAIL ')+name+(extra!==undefined?' :: '+extra:''));if(!cond)fails++};
function buildOf(src){const m=src.match(/var BUILD=(\{[\s\S]*?\]\]\]\]\]\]\});/);if(!m)return null;return Function('return '+m[1])()}
function stat(B){let n=0,d=0;const per={};Object.keys(B).forEach(t=>{let tn=0,td=0;B[t].forEach(s=>s[1].forEach(f=>f[1].forEach(it=>{tn++;if(it[1])td++})));per[t]=[td,tn];n+=tn;d+=td});return {n,d,per}}
(async()=>{
// 0. BUILD count vs baseline
const cur=buildOf(fs.readFileSync(PANEL,'utf8'));let base=null,baseFrom='';
if(process.argv[4]){base=buildOf(fs.readFileSync(process.argv[4],'utf8'));baseFrom=process.argv[4]}
else{try{const root=execFileSync('git',['-C',path.dirname(PANEL),'rev-parse','--show-toplevel']).toString().trim();
  base=buildOf(execFileSync('git',['-C',root,'show','HEAD:'+path.relative(root,PANEL)],{maxBuffer:64e6}).toString());baseFrom='git HEAD'}catch(e){}}
const C=stat(cur);ok('BUILD parsed',!!cur,C.d+' of '+C.n+' built ('+Math.round(C.d/C.n*100)+'%)');
if(base){const B=stat(base);ok('BUILD count went up by 2 vs '+baseFrom,C.d-B.d===2&&C.n===B.n,B.d+' -> '+C.d+' of '+C.n)}else ok('baseline available',false,'no git HEAD and no 3rd arg');
const leaf=(t,name)=>{let v=null;(cur[t]||[]).forEach(s=>s[1].forEach(f=>f[1].forEach(it=>{if(it[0]===name)v=it[1]})));return v};
ok('two pieces flipped to 1',leaf('ORPHANS','Resolve to TRK button')===1&&leaf('LLMS','Fixed IDs LLM-01…09 and scarce/free label')===1);
['ORPHANS','LLMS'].forEach(t=>console.log('INFO '+t+' BUILD '+C.per[t].join('/')+(C.per[t][0]===C.per[t][1]?' (100%)':'')));

const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const ctx=await b.newContext({viewport:{width:1280,height:900}});
await ctx.addInitScript(()=>{window.__use=[];window.__mcp=0;window.__writes=[];window.__store=window.__store||{};
  const store=JSON.parse(sessionStorage.getItem('__store')||'{}');
  const doc=k=>({get:async()=>store[k]?{data:store[k]}:null,set:async v=>{window.__writes.push(k);store[k]=v;sessionStorage.setItem('__store',JSON.stringify(store))},update:async v=>{window.__writes.push(k);store[k]=Object.assign(store[k]||{},v);sessionStorage.setItem('__store',JSON.stringify(store))}});
  const db={doc,collection:()=>({onSnapshot:()=>()=>{}})};
  const mcp={watchTool:()=>()=>{},callTool:async()=>{window.__mcp++;return {payload:{files:[]}}}};
  window.claude={use:async k=>{window.__use.push(k);return k==='db'?db:k==='mcp'?mcp:null}}});
const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+PANEL);await p.waitForTimeout(2000);
const pct=async t=>p.$eval('#bb-'+t+' .bbpct',e=>e.textContent);
// 1. ORPHANS renders a Propose match button on every OPH row
await p.evaluate(()=>VTES.show('ORPHANS'));await p.waitForTimeout(300);
const rows=await p.$$eval('#pane-ORPHANS .card',c=>c.filter(x=>/OPH-2026-\d{4}/.test(x.textContent)).map(x=>({oph:x.textContent.match(/OPH-2026-\d{4}/)[0],btn:[...x.querySelectorAll('button')].some(b=>b.textContent==='Propose match')})));
ok('ORPHANS: every OPH row has a Propose match button',rows.length>=9&&rows.every(r=>r.btn),rows.length+' rows');
const ID='OPH-2026-0001';
await p.click('#pane-ORPHANS button[onclick="VTES.opOpen(\''+ID+'\')"]');await p.waitForTimeout(150);
ok('form opens',await p.$eval('#op-'+ID,f=>!f.hidden&&f.offsetHeight>0));
ok('form says "Proposal only. Filing happens in the morning with your yes."',await p.$eval('#op-'+ID,f=>f.textContent.includes('Proposal only. Filing happens in the morning with your yes.')));
const dl=await p.$$eval('#trklist option',o=>o.map(x=>x.value));
ok('TRK picker lists only TRK-2026-NNNN numbers already on the page (no 9xxx admin band)',dl.length>0&&dl.every(v=>/^TRK-2026-[0-8]\d{3}$/.test(v)),dl.length+' listed, e.g. '+dl.slice(0,4).join(', '));
// 2. validation: refuses malformed, accepts TRK-2026-1262
const mcp0=await p.evaluate(()=>window.__mcp),use0=await p.evaluate(()=>window.__use.length),w0=await p.evaluate(()=>window.__writes.length);
const try1=async(trk,ev)=>{await p.fill('#opt-'+ID,trk);await p.fill('#ope-'+ID,ev);const r=await p.evaluate(id=>VTES.opSave(id),ID);return {r,msg:await p.$eval('#opm-'+ID,m=>m.textContent)}};
const badList=['TRK-26-1262','TRK-2026-126','TRK-2026-12620','TRK-2026-1262.047','TRK-2026-0708-JULIA','1262','TRK-2026-ABCD','TRK-2026-9121','OPH-2026-0001',''];
const refused=[];for(const t of badList){const x=await try1(t,'same folio');if(x.r===false&&/TRK-2026-|admin band|job number/i.test(x.msg))refused.push(t)}
ok('refuses malformed TRKs and the 9xxx admin band',refused.length===badList.length,refused.length+' of '+badList.length+' refused');
const noEv=await try1('TRK-2026-1262','  ');ok('refuses an empty evidence line',noEv.r===false,noEv.msg);
const w1=await p.evaluate(()=>window.__writes.length);ok('nothing saved by refused attempts',w1===w0);
const good=await try1('trk-2026-1262 ','Same folio 30-5022-000-0130 on permit card and report');
ok('accepts TRK-2026-1262 (normalised)',good.r===true&&/TRK-2026-1262/.test(good.msg)&&/Nothing was moved or renamed/.test(good.msg),good.msg);
const after=await p.evaluate(w0=>window.__writes.slice(w0),w0);
ok('proposal written only to proposals/'+ID,after.length===1&&after[0]==='proposals/'+ID,JSON.stringify(after));
const rec=await p.evaluate(id=>JSON.parse(sessionStorage.getItem('__store'))['proposals/'+id],ID);
ok('record is a PROPOSAL, not filed, carries no new TRK',rec&&rec.status==='PROPOSED'&&rec.filed===false&&rec.trk==='TRK-2026-1262'&&rec.oph===ID,JSON.stringify(rec));
const mcp1=await p.evaluate(()=>window.__mcp),useNew=await p.evaluate(u=>window.__use.slice(u),use0);
ok('no connector call made by the proposal',mcp1===mcp0&&!useNew.includes('mcp'),'callTool +'+(mcp1-mcp0)+', capabilities asked: '+JSON.stringify([...new Set(useNew)]));
ok('saved proposal shown on the row',await p.$eval('#opl-'+ID,e=>!e.hidden&&e.textContent.includes('TRK-2026-1262')&&/not filed yet/.test(e.textContent)));
ok('ORPHANS tab shows 100%',await pct('ORPHANS')==='100%',await pct('ORPHANS'));
// 3. LLMS ids + labels
await p.evaluate(()=>VTES.show('LLMS'));await p.waitForTimeout(300);
const ids=()=>p.$$eval('#llmids .llmid',r=>r.map(x=>({id:x.dataset.llm,pool:x.querySelector('.pool').dataset.pool,txt:x.textContent})));
const L1=await ids();const want=Array.from({length:9},(_,i)=>'LLM-0'+(i+1));
ok('LLMS: IDs LLM-01..09 present, in order',JSON.stringify(L1.map(x=>x.id))===JSON.stringify(want),L1.map(x=>x.id).join(' '));
ok('each card has scarce/free/unknown label',L1.length===9&&L1.every(x=>['scarce','free','unknown'].includes(x.pool)),L1.map(x=>x.id.slice(4)+'='+x.pool).join(' '));
const derived=(await p.evaluate(()=>VTES.llmIds())).map(x=>x.mode==='Local'?'free':(x.mode==='Subscription'||x.mode==='API')?'scarce':'unknown');
ok('labels follow the page cost info (Subscription/API = scarce, Local = free, else unknown)',JSON.stringify(derived)===JSON.stringify(L1.map(x=>x.pool)));
const lanePools=await p.$$eval('#pane-LLMS .card .pool',e=>e.map(x=>x.dataset.pool));ok('plan rows carry labels too (Ollama free)',lanePools.includes('free'),lanePools.length+' labels');
console.log('INFO LLMS tab shows '+await pct('LLMS'));
// money lock
const m=await p.evaluate(()=>({open:document.body.classList.contains('money-open'),mz:document.querySelectorAll('.mz').length,shown:[...document.querySelectorAll('.mz')].filter(s=>s.textContent!=='🔒$').length,leak:/\$\s?\d/.test(document.body.innerText)}));
ok('0000 money lock intact (locked, no amounts visible)',!m.open&&m.mz>0&&m.shown===0&&!m.leak,JSON.stringify(m));
// 375px
await p.setViewportSize({width:375,height:800});const bad=[];
for(const t of ['ORPHANS','LLMS']){await p.evaluate(t=>VTES.show(t),t);await p.waitForTimeout(150);const sw=await p.evaluate(()=>document.documentElement.scrollWidth);if(sw>375)bad.push(t+'='+sw)}
ok('375px no sideways scroll on ORPHANS (form open) and LLMS',bad.length===0,bad.join(' ')||'all fit');
await p.evaluate(()=>VTES.show('ORPHANS'));await p.waitForTimeout(100);await p.addStyleTag({content:'.header{position:static!important}'});await (await p.$('#op-'+ID)).evaluateHandle(e=>e.closest('.card')).then(h=>h.asElement().screenshot({path:PNG}));
await p.evaluate(()=>VTES.show('LLMS'));await p.waitForTimeout(100);await (await p.$('#llmids')).screenshot({path:PNG.replace(/\.png$/,'')+'-llms.png'});
ok('no page errors',errs.length===0,JSON.stringify(errs));
// 4. reload: IDs unchanged, proposal reloaded from the store
await p.reload();await p.waitForTimeout(2000);await p.evaluate(()=>VTES.show('LLMS'));await p.waitForTimeout(200);
const L2=await ids();ok('IDs identical after reload',JSON.stringify(L2.map(x=>x.id+x.txt))===JSON.stringify(L1.map(x=>x.id+x.txt)));
ok('proposal still shown after reload',await p.$eval('#opl-'+ID,e=>!e.hidden&&e.textContent.includes('TRK-2026-1262')));
ok('no page errors after reload',errs.length===0,JSON.stringify(errs));
console.log('BUILD NOW '+C.d+' of '+C.n+' = '+Math.round(C.d/C.n*100)+'%');
console.log(fails?'RESULT FAIL '+fails:'RESULT ALL PASS');await b.close();process.exit(fails?1:0)})();
