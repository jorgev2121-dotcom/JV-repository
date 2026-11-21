// status-reports-orch-test.js — 2026-10-14. Four non-PC pieces:
// STATUS 'Age line per feed' + 'Watchdog "not refreshing" banner', REPORTS 'Repairs running log',
// ORCHESTRATOR 'Recovery route suggestion'.
// Checks: age lines render green / amber / red / unknown at fake times (mock Drive feed with injected timestamps,
// plus VTES.feedAge with a fixed clock); banner shows and names the red feeds when one is older than 6 h, and is
// hidden when all feeds are fresh; repairs log has >=1 row, newest first, Copy for email works; a recovery line for
// each failure kind (cap/quota, PII refusal, PC offline, other); 375px no sideways scroll on all three tabs;
// BUILD built-count up by exactly 4 vs baseline (git HEAD, or an optional 3rd argument); 0000 money lock intact.
// Usage: node status-reports-orch-test.js <abs panel path> <png path> [baseline panel path]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const PANEL=process.argv[2],PNG=process.argv[3]||'/tmp/status-reports-orch.png';
let fails=0;const ok=(name,cond,extra)=>{console.log((cond?'PASS ':'FAIL ')+name+(extra!==undefined?' :: '+extra:''));if(!cond)fails++};
function buildOf(src){const m=src.match(/var BUILD=(\{[\s\S]*?\]\]\]\]\]\]\});/);if(!m)return null;return Function('return '+m[1])()}
function stat(B){let n=0,d=0;const per={};Object.keys(B).forEach(t=>{let tn=0,td=0;B[t].forEach(s=>s[1].forEach(f=>f[1].forEach(it=>{tn++;if(it[1])td++})));per[t]=[td,tn];n+=tn;d+=td});return {n,d,per}}
const PIECES=[['STATUS','Age line per feed'],['STATUS','Watchdog "not refreshing" banner'],['REPORTS','Repairs running log'],['ORCHESTRATOR','Recovery route suggestion']];

// Mock Drive (feeds) + mock db (jobs). Feed ages in minutes come from window.__AGES, set before load.
function initMocks(cfg){
  const iso=m=>m==null?null:new Date(Date.now()-m*60000).toISOString();
  const A=cfg.ages;
  const hb=[];if(A.up!=null)hb.push({id:'u',title:'_UPTIME-HEARTBEAT.md',modifiedTime:iso(A.up)});
  if(A.ram!=null)hb.push({id:'r',title:'_RAM-GUARD-HEARTBEAT.md',modifiedTime:iso(A.ram)});
  if(A.cov!=null)hb.push({id:'c',title:'_OCR-COVERAGE.md',modifiedTime:iso(A.cov)});
  const res=A.lane!=null?[{id:'x1',title:'EXECUTED_RAMBO1_TEST.md',modifiedTime:iso(A.lane),viewUrl:'#'}]:[];
  const files={hb,res,rambo:[],act:[]};
  const mcp={watchTool(s,t,inp,h){setTimeout(()=>{if(s!=='Google Drive'){h({type:'error',error:{code:'blocked_by_policy'}});return}
      if(t==='read_file_content'){h({type:'data',result:{payload:{fileContent:'{}'}}});return}
      const q=inp.query||'';const k=q.includes('UPTIME')?'hb':q.includes('CLAIM_')?'act':(q.includes('EXECUTED_RAMBO1_')&&!q.includes('BLOCKER'))?'rambo':'res';
      h({type:'data',result:{payload:{files:files[k]}}})},30);return()=>{}},
    callTool(){return Promise.resolve({payload:{fileContent:'SIDECARS: 1,234\nCOVERAGE_PCT: 40\nPDFS: 3,000'}})},invalidate(){return Promise.resolve()}};
  const jobs=cfg.jobs||[];
  const db={collection(name){return {onSnapshot(cb){setTimeout(()=>cb({docs:name==='jobs'?jobs.map(j=>({id:j.id,data:j.data})):[]}),20);return()=>{}}}},
    doc(){return {get:async()=>null,set:async()=>{}}}};
  window.claude={use:async n=>n==='mcp'?mcp:n==='db'?db:null};
}
const now=Date.now(),isoAgo=m=>new Date(now-m*60000).toISOString();
const JOBSET=[
  {id:'VJ-T-CAP',data:{status:'FAILED',executor:'RAMBO (Desktop)',text:'Survey folder',created:isoAgo(90),blocker:'Daily run cap reached (CAP-REACHED file)'}},
  {id:'VJ-T-QUOTA',data:{status:'BLOCKED',executor:'Codex',text:'Count files',created:isoAgo(80),blocker:'OpenAI quota exceeded (429)'}},
  {id:'VJ-T-PII',data:{status:'FAILED',executor:'Codex',text:'Draft letter',created:isoAgo(70),blocker:'Codex refused: PII in the job (client personal data)'}},
  {id:'VJ-T-OFF',data:{status:'BLOCKED',executor:'RAMBO (Desktop)',text:'OCR scans',created:isoAgo(60),blocker:'PC offline — no heartbeat since 02:10'}},
  {id:'VJ-T-OTHER',data:{status:'FAILED',executor:'Cloud Code',text:'Build index',created:isoAgo(50),blocker:'Script crashed with TypeError'}},
  {id:'VJ-T-RUN',data:{status:'QUEUED',executor:'AUTO',text:'Waiting job',created:isoAgo(10)}}];

(async()=>{
const cur=buildOf(fs.readFileSync(PANEL,'utf8'));let base=null,baseFrom='';
if(process.argv[4]){base=buildOf(fs.readFileSync(process.argv[4],'utf8'));baseFrom=process.argv[4]}
else{try{const root=execFileSync('git',['-C',path.dirname(PANEL),'rev-parse','--show-toplevel']).toString().trim();
  base=buildOf(execFileSync('git',['-C',root,'show','HEAD:'+path.relative(root,PANEL)],{maxBuffer:64e6}).toString());baseFrom='git HEAD'}catch(e){}}
const C=stat(cur);ok('BUILD parsed',!!cur,C.d+' of '+C.n+' built ('+Math.round(C.d/C.n*100)+'%)');
if(base){const B=stat(base);ok('BUILD count went up by 4 vs '+baseFrom,C.d-B.d===4&&C.n===B.n,B.d+' -> '+C.d+' of '+C.n)}else ok('baseline available',false,'no git HEAD and no 3rd arg');
const leaf=(t,name)=>{let v=null;(cur[t]||[]).forEach(s=>s[1].forEach(f=>f[1].forEach(it=>{if(it[0]===name)v=it[1]})));return v};
ok('four pieces flipped to 1',PIECES.every(([t,n])=>leaf(t,n)===1),PIECES.map(([t,n])=>t+'/'+n+'='+leaf(t,n)).join(', '));

const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
async function open(cfg,vp){const p=await b.newPage({viewport:vp||{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.addInitScript(initMocks,cfg);await p.goto('file://'+PANEL);await p.waitForTimeout(1200);return {p,errs}}

// 1. Pure clock check (stubbed clock: fixed "now")
{const {p,errs}=await open({ages:{}});
  const fixed=Date.parse('2026-10-14T12:00:00Z');
  const r=await p.evaluate(f=>{const at=m=>new Date(f-m*60000).toISOString();return {
    g:VTES.feedAge(at(12),f),a:VTES.feedAge(at(150),f),r:VTES.feedAge(at(60*8),f),d:VTES.feedAge(at(60*24*3),f),u:VTES.feedAge(null,f),x:VTES.feedAge('not a date',f),e29:VTES.feedAge(at(29.9),f),e30:VTES.feedAge(at(30),f),e359:VTES.feedAge(at(359),f),e360:VTES.feedAge(at(360),f)}},fixed);
  ok('fixed clock: 12 min -> green "updated 12 min ago"',r.g.c==='g'&&r.g.t==='updated 12 min ago',JSON.stringify(r.g));
  ok('fixed clock: 150 min -> amber "updated 2 h ago"',r.a.c==='a'&&r.a.t==='updated 2 h ago',JSON.stringify(r.a));
  ok('fixed clock: 8 h -> red "updated 8 h ago"',r.r.c==='r'&&r.r.t==='updated 8 h ago',JSON.stringify(r.r));
  ok('fixed clock: 3 days -> red "updated 3 days ago"',r.d.c==='r'&&r.d.t==='updated 3 days ago',JSON.stringify(r.d));
  ok('no timestamp -> "age unknown"',r.u.c==='u'&&r.u.t==='age unknown'&&r.x.t==='age unknown');
  ok('edges: 29.9 min green, 30 min amber, 359 min amber, 360 min red',r.e29.c==='g'&&r.e30.c==='a'&&r.e359.c==='a'&&r.e360.c==='r');
  ok('no page errors (clock page)',errs.length===0,JSON.stringify(errs));await p.close()}

// 2. Rendered age lines + banner with one stale feed (RAM guard 7 h) and one unknown (OCR coverage absent -> no hb row? keep it present)
{const {p,errs}=await open({ages:{up:5,ram:60*7,cov:45,lane:60*30},jobs:JOBSET});
  await p.evaluate(()=>VTES.show('STATUS'));await p.waitForTimeout(400);
  const rows=await p.$$eval('#pcstrip2 .pcs-r[id]',els=>els.map(e=>({id:e.id,k:e.querySelector('.pcs-k').textContent,age:(e.querySelector('.fage')||{}).textContent,c:(e.querySelector('.fage')||{dataset:{}}).dataset.age,col:e.querySelector('.fage')?getComputedStyle(e.querySelector('.fage')).color:''})));
  const tok=await p.evaluate(()=>{const o={};['--good','--warn','--bad','--muted'].forEach(v=>{const q=document.createElement('span');q.style.color='var('+v+')';document.body.appendChild(q);o[v]=getComputedStyle(q).color;q.remove()});return o});
  console.log('  rows: '+rows.map(r=>r.k+'='+r.age+'/'+r.c).join(' | '));
  const by=k=>rows.find(r=>r.k===k)||{};
  ok('every STATUS feed tile has an age line',rows.length>=4&&rows.every(r=>r.age),rows.length+' tiles');
  ok('PC awake 5 min -> green, page token --good',by('PC awake').c==='g'&&/updated 5 min ago/.test(by('PC awake').age)&&by('PC awake').col===tok['--good'],JSON.stringify(by('PC awake')));
  ok('OCR count 45 min -> amber, page token --warn',by('OCR done so far').c==='a'&&by('OCR done so far').col===tok['--warn'],JSON.stringify(by('OCR done so far')));
  ok('RAM guard 7 h -> red, page token --bad',by('RAM guard').c==='r'&&/updated 7 h ago/.test(by('RAM guard').age)&&by('RAM guard').col===tok['--bad'],JSON.stringify(by('RAM guard')));
  ok('Claude lane 30 h -> red "1 day ago"',by('Claude lane').c==='r'&&/updated 1 day ago/.test(by('Claude lane').age),JSON.stringify(by('Claude lane')));
  const top=await p.$$eval('#pcstrip .fage',e=>e.length);ok('top live strip shows age lines too',top>=4,top);
  const ban=await p.$eval('#feedwatch',e=>({hidden:e.hidden,vis:e.offsetHeight>0,t:e.innerText,links:[...e.querySelectorAll('a')].map(a=>a.getAttribute('href')),first:e.parentElement.firstElementChild===e||e.parentElement.querySelector('#feedwatch')===e}));
  ok('banner shown when a feed is older than 6 h',!ban.hidden&&ban.vis&&/^⚠ 2 feeds not refreshing: /.test(ban.t),ban.t.split('\n')[0]);
  ok('banner names the red feeds and links to their tiles',/RAM guard/.test(ban.t)&&/Claude lane/.test(ban.t)&&!/PC awake/.test(ban.t)&&ban.links.length===2&&ban.links.every(h=>rows.some(r=>'#'+r.id===h)),ban.links.join(' '));
  const firstEl=await p.evaluate(()=>{const pane=document.getElementById('pane-STATUS');const kids=[...pane.children].filter(e=>!e.classList.contains('bbox'));return kids[0]&&kids[0].id});
  ok('banner is at the top of STATUS',firstEl==='feedwatch',firstEl);
  await p.click('#feedwatch a');await p.waitForTimeout(300);
  ok('banner link jumps to the tile',await p.evaluate(()=>{const e=document.querySelector('#pcstrip2 .pcs-r.reading');return !!e}));
  // 375px with banner + failed jobs + repairs
  await p.setViewportSize({width:375,height:800});await p.waitForTimeout(200);
  const sws={};for(const t of ['STATUS','REPORTS','ORCHESTRATOR']){await p.evaluate(t=>VTES.show(t),t);await p.waitForTimeout(250);sws[t]=await p.evaluate(()=>document.documentElement.scrollWidth)}
  ok('375px no sideways scroll on STATUS, REPORTS, ORCHESTRATOR',Object.values(sws).every(v=>v<=375),JSON.stringify(sws));
  await p.evaluate(()=>VTES.show('STATUS'));await p.waitForTimeout(200);
  await p.addStyleTag({content:'.header{position:static!important}'});
  await (await p.$('#pane-STATUS')).screenshot({path:PNG});
  await p.setViewportSize({width:1280,height:900});
  // 3. Recovery route per failure kind
  await p.evaluate(()=>VTES.show('ORCHESTRATOR'));await p.waitForTimeout(400);
  const fr=await p.$$eval('#jobfail .card',cs=>cs.map(c=>({h:c.querySelector('h3').textContent,r:c.querySelector('.recov')?c.querySelector('.recov').textContent:'',k:c.querySelector('.recov')?c.querySelector('.recov').dataset.kind:''})));
  console.log('  failed rows: '+fr.map(x=>x.h+' -> '+x.k).join(' | '));
  const want={'VJ-T-CAP':['cap','wait for reset or move to the cloud lane'],'VJ-T-QUOTA':['cap','wait for reset or move to the cloud lane'],'VJ-T-PII':['pii','send to Claude desktop or Claude cloud'],'VJ-T-OFF':['offline','queue for morning, cloud does the read-only part'],'VJ-T-OTHER':['other','retry once, then tell Jorge']};
  ok('every failed-lane row has a recovery line',fr.length===5&&fr.every(x=>x.r),fr.length+' failed rows');
  Object.keys(want).forEach(id=>{const x=fr.find(f=>f.h.includes(id))||{};ok('recovery '+id+' -> '+want[id][0],x.k===want[id][0]&&x.r.toLowerCase().includes(want[id][1].toLowerCase()),x.r)});
  const qn=await p.$$eval('#jobqueue .recov',e=>e.length);ok('no recovery line on healthy rows',qn===0,qn);
  const kinds=await p.evaluate(()=>['Weekly usage limit hit','PII refusal by Codex','The PC is asleep','Unexpected EOF'].map(t=>VTES.failKind(t).kind));
  ok('failKind helper covers all four kinds',kinds.join(',')==='cap,pii,offline,other',kinds.join(','));
  // 4. Repairs log
  await p.evaluate(()=>VTES.show('REPORTS'));await p.waitForTimeout(300);
  const rl=await p.$$eval('#replog li',l=>l.map(x=>({at:x.dataset.at,t:x.textContent})));
  ok('repairs log has at least 1 row',rl.length>=1,rl.length+' rows');
  ok('repairs rows are within the last 3 days and mention a fix',rl.every(r=>r.at>='2026-10-12'&&/fix/i.test(r.t)));
  ok('repairs rows newest first',rl.every((r,i)=>i===0||rl[i-1].at>=r.at),rl.map(r=>r.at).join(' > '));
  const btn=await p.$('#repairs button');ok('Copy for email button present',!!btn&&/Copy for email/.test(await btn.textContent()));
  await p.click('#repairs button');await p.waitForTimeout(200);
  const txt=await p.evaluate(()=>VTES.repairsText());const msg=await p.textContent('#repcopy-msg');
  ok('Copy for email text built and message shown',/^Repairs running log/.test(txt)&&txt.split('\n').length===rl.length+1&&msg.length>0,msg);
  // money lock
  const m=await p.evaluate(()=>({open:document.body.classList.contains('money-open'),mz:document.querySelectorAll('.mz').length,shown:[...document.querySelectorAll('.mz')].filter(s=>s.textContent!=='🔒$').length,leak:/\$\s?\d/.test(document.body.innerText)}));
  ok('0000 money lock intact (locked, no amounts visible)',!m.open&&m.mz>0&&m.shown===0&&!m.leak,JSON.stringify(m));
  ok('no page errors (stale page)',errs.length===0,JSON.stringify(errs));await p.close()}

// 5. All feeds fresh -> banner hidden
{const {p,errs}=await open({ages:{up:2,ram:3,cov:10,lane:20}});
  await p.evaluate(()=>VTES.show('STATUS'));await p.waitForTimeout(400);
  const ban=await p.$eval('#feedwatch',e=>({hidden:e.hidden,h:e.offsetHeight,t:e.innerText}));
  const cs=await p.$$eval('#pcstrip2 .fage',e=>e.map(x=>x.dataset.age));
  ok('all fresh: every age line green',cs.length>=4&&cs.every(c=>c==='g'),cs.join(','));
  ok('all fresh: banner hidden',ban.hidden&&ban.h===0&&ban.t==='',JSON.stringify(ban));
  ok('no page errors (fresh page)',errs.length===0,JSON.stringify(errs));await p.close()}

// 6. No Drive at all -> no banner, no crash
{const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.addInitScript(()=>{window.claude={use:async()=>null}});await p.goto('file://'+PANEL);await p.waitForTimeout(1000);
  await p.evaluate(()=>VTES.show('STATUS'));await p.waitForTimeout(200);
  ok('no Drive: banner hidden',await p.$eval('#feedwatch',e=>e.hidden));
  for(const t of ['STATUS','REPORTS','ORCHESTRATOR']){await p.evaluate(t=>VTES.show(t),t);await p.waitForTimeout(150);ok(t+' BUILD box readable',/%$/.test(await p.$eval('#bb-'+t+' .bbpct',e=>e.textContent)),await p.$eval('#bb-'+t+' .bbpct',e=>e.textContent))}
  ok('no page errors (no Drive)',errs.length===0,JSON.stringify(errs));await p.close()}

const full=Object.keys(C.per).filter(t=>C.per[t][0]===C.per[t][1]);
console.log('TABS AT 100%: '+full.join(', '));
['STATUS','REPORTS','ORCHESTRATOR'].forEach(t=>console.log('  '+t+' '+C.per[t][0]+' of '+C.per[t][1]+' ('+Math.round(C.per[t][0]/C.per[t][1]*100)+'%)'));
console.log('BUILD NOW '+C.d+' of '+C.n+' = '+Math.round(C.d/C.n*100)+'%');
console.log(fails?'RESULT FAIL '+fails:'RESULT ALL PASS');await b.close();process.exit(fails?1:0)})();
