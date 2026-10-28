// rules-bridges-windows-test.js — 2026-10-14. Three BUILD pieces that take three tabs to 100%:
// RULES "Owner directives list", BRIDGES "Live inbox count", WINDOWS "Picture cards per window".
// Checks: each renders, the inbox count works with a mocked Google Drive connector (paging, the N+ cap,
// the "checked HH:MM" stamp) and degrades to "count unavailable — open folder" without one, the three
// tabs read 100%, the BUILD built-count went up by exactly 3 against the baseline (git HEAD, or an
// optional 3rd argument path; default is the newest commit where the three pieces were still unbuilt), the 0000 money lock is intact, and 375px has no sideways scroll.
// Usage: node rules-bridges-windows-test.js <abs panel path> <png path> [baseline panel path]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const PANEL=process.argv[2],PNG=process.argv[3]||'/tmp/rbw.png';
let fails=0;const ok=(name,cond,extra)=>{console.log((cond?'PASS ':'FAIL ')+name+(extra!==undefined?' :: '+extra:''));if(!cond)fails++};
const INBOX='1hI2TmVn86Cnh7h_6s93TG0KE1QzVCV5F';
function buildOf(src){const m=src.match(/var BUILD=(\{[\s\S]*?\]\]\]\]\]\]\});/);if(!m)return null;return Function('return '+m[1])()}
function stat(B){let n=0,d=0;const per={};Object.keys(B).forEach(t=>{let tn=0,td=0;B[t].forEach(s=>s[1].forEach(f=>f[1].forEach(it=>{tn++;if(it[1])td++})));per[t]=[td,tn];n+=tn;d+=td});return {n,d,per}}
(async()=>{
// 0. BUILD count vs baseline
const cur=buildOf(fs.readFileSync(PANEL,'utf8'));let base=null,baseFrom='';
if(process.argv[4]){base=buildOf(fs.readFileSync(process.argv[4],'utf8'));baseFrom=process.argv[4]}
else{try{const root=execFileSync('git',['-C',path.dirname(PANEL),'rev-parse','--show-toplevel']).toString().trim();
  const rel=path.relative(root,PANEL);const three=B=>[['RULES','Owner directives list'],['BRIDGES','Live inbox count'],['WINDOWS','Picture cards per window']].some(([t,n])=>B[t].some(s=>s[1].some(f=>f[1].some(it=>it[0]===n&&!it[1]))));
  // baseline = newest committed version where any of the three pieces is still unbuilt (survives WIP commits)
  for(const h of execFileSync('git',['-C',root,'log','--format=%h','-40','--',rel]).toString().trim().split('\n')){
    const B=buildOf(execFileSync('git',['-C',root,'show',h+':'+rel],{maxBuffer:64e6}).toString());if(B&&three(B)){base=B;baseFrom='git '+h;break}}}catch(e){}}
const C=stat(cur);ok('BUILD parsed',!!cur,C.d+' of '+C.n+' built ('+Math.round(C.d/C.n*100)+'%)');
if(base){const B=stat(base);ok('BUILD count went up by 3 vs '+baseFrom,C.d-B.d===3&&C.n===B.n,B.d+' -> '+C.d+' of '+C.n)}else ok('baseline available',false,'no git HEAD and no 3rd arg');
const leaf=(t,name)=>{let v=null;(cur[t]||[]).forEach(s=>s[1].forEach(f=>f[1].forEach(it=>{if(it[0]===name)v=it[1]})));return v};
ok('three pieces flipped to 1',leaf('RULES','Owner directives list')===1&&leaf('BRIDGES','Live inbox count')===1&&leaf('WINDOWS','Picture cards per window')===1);
['RULES','BRIDGES','WINDOWS'].forEach(t=>ok(t+' at 100% in BUILD',C.per[t][0]===C.per[t][1],C.per[t].join('/')));
// owner directive files on disk vs the list
let root='';try{root=execFileSync('git',['-C',path.dirname(PANEL),'rev-parse','--show-toplevel']).toString().trim()}catch(e){}
const files=root?fs.readdirSync(root).filter(f=>/^OWNER-DIRECTIVE_.*\.md$/.test(f)).sort():[];

const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
async function page(mode,vw){const p=await b.newPage({viewport:{width:vw||1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.addInitScript(([mode,INBOX])=>{const fake={watchTool:()=>()=>{},callTool:async(srv,tool,inp)=>{
      if(srv==='Google Drive'&&tool==='search_files'&&inp.query.includes("parentId = '"+INBOX+"'")){window.__calls=(window.__calls||0)+1;
        const pg=inp.pageToken?+inp.pageToken:0;
        if(mode==='two'){return {payload:pg===0?{files:Array.from({length:100},(_,i)=>({id:'a'+i})),nextPageToken:'1'}:{files:Array.from({length:37},(_,i)=>({id:'b'+i}))}}}
        return {payload:{files:Array.from({length:100},(_,i)=>({id:'p'+pg+'_'+i})),nextPageToken:String(pg+1)}}}
      return {payload:{files:[]}}}};
    window.claude={use:async k=>mode==='none'?null:(k==='mcp'?fake:null)}},[mode,INBOX]);
  await p.goto('file://'+PANEL);await p.waitForTimeout(2200);return {p,errs}}
// 1. RULES
let {p,errs}=await page('none');
await p.evaluate(()=>VTES.show('RULES'));await p.waitForTimeout(300);
const od=await p.$$eval('#pane-RULES .odrow',r=>r.map(x=>({d:x.querySelector('.odd').textContent,f:x.querySelector('.odf').textContent,m:x.querySelector('.odm').textContent})));
ok('RULES lists owner directives',od.length>=5,od.length+' rows');
const missing=files.filter(f=>!od.some(o=>o.f===f));ok('every OWNER-DIRECTIVE_*.md in repo root is listed',files.length>0&&missing.length===0,files.length+' files; missing: '+(missing.join(', ')||'none'));
ok('each row has a date matching its file and a one-line meaning',od.every(o=>/^\d{4}-\d\d-\d\d$/.test(o.d)&&o.f.includes(o.d)&&o.m.length>20&&o.m.length<200&&!/\n/.test(o.m)));
const pct=async t=>p.$eval('#bb-'+t+' .bbpct',e=>e.textContent);
ok('RULES tab shows 100%',await pct('RULES')==='100%',await pct('RULES'));
// 2. BRIDGES degraded
const deg=await p.$eval('#inboxcount',e=>({t:e.textContent,h:(e.querySelector('a')||{}).href||''}));
ok('BRIDGES degrades without connector',/count unavailable — open folder/.test(deg.t)&&deg.h.includes(INBOX),deg.t);
ok('BRIDGES tab shows 100%',await pct('BRIDGES')==='100%',await pct('BRIDGES'));
// 3. WINDOWS
await p.evaluate(()=>VTES.show('WINDOWS'));await p.waitForTimeout(300);
const wc=await p.$$eval('#pane-WINDOWS .wcard',c=>c.map(x=>({e:x.querySelector('.we').textContent,h:x.querySelector('h3').textContent,t:x.querySelector('p').textContent,pid:x.querySelector('.wp').textContent,fs:parseFloat(getComputedStyle(x.querySelector('.we')).fontSize),bg:getComputedStyle(x).backgroundColor})));
ok('WINDOWS has three picture cards',wc.length===3,wc.map(x=>x.h).join(' | '));
const want=[['🖥️','CODE · DESKTOP','PASTE-D'],['☁️','CODE · CLOUD','PASTE-C'],['🤝','COWORK','PASTE-X']];
ok('cards: emoji, title, "paste IDs start with" match',want.every((w,i)=>wc[i]&&wc[i].e===w[0]&&wc[i].h.includes(w[1])&&wc[i].pid==='paste IDs start with '+w[2]&&wc[i].t.length>10));
ok('big emoji',wc.every(x=>x.fs>=40),wc.map(x=>x.fs).join(','));
ok('WINDOWS tab shows 100%',await pct('WINDOWS')==='100%',await pct('WINDOWS'));
await p.emulateMedia({colorScheme:'dark'});await p.waitForTimeout(150);
const dk=await p.$eval('#pane-WINDOWS .wcard',x=>getComputedStyle(x).backgroundColor);ok('cards follow dark mode tokens',dk!==wc[0].bg,wc[0].bg+' -> '+dk);
await p.emulateMedia({colorScheme:'light'});
// money lock
const m=await p.evaluate(()=>({open:document.body.classList.contains('money-open'),mz:document.querySelectorAll('.mz').length,shown:[...document.querySelectorAll('.mz')].filter(s=>s.textContent!=='🔒$').length,leak:/\$\s?\d/.test(document.body.innerText)}));
ok('0000 money lock intact (locked, no amounts visible)',!m.open&&m.mz>0&&m.shown===0&&!m.leak,JSON.stringify(m));
// 375px
await p.setViewportSize({width:375,height:800});const bad=[];
for(const t of ['RULES','BRIDGES','WINDOWS']){await p.evaluate(t=>VTES.show(t),t);await p.waitForTimeout(150);const sw=await p.evaluate(()=>document.documentElement.scrollWidth);if(sw>375)bad.push(t+'='+sw)}
ok('375px no sideways scroll on RULES, BRIDGES, WINDOWS',bad.length===0,bad.join(' ')||'all fit');
await p.evaluate(()=>VTES.show('WINDOWS'));await p.waitForTimeout(150);await p.screenshot({path:PNG,fullPage:false});
ok('no page errors (no connector)',errs.length===0,JSON.stringify(errs));await p.close();
// 4. BRIDGES with connector: two pages -> 137
({p,errs}=await page('two'));
let ib=await p.$eval('#inboxcount',e=>e.textContent);
ok('inbox count follows nextPageToken (100 + 37 = 137)',/^137\s*files in VTES-Inbox · checked \d\d:\d\d/.test(ib),ib);
ok('connector called twice',await p.evaluate(()=>window.__calls)===2);
await p.setViewportSize({width:375,height:800});await p.evaluate(()=>VTES.show('BRIDGES'));await p.waitForTimeout(150);
ok('375px BRIDGES with live count fits',await p.evaluate(()=>document.documentElement.scrollWidth)<=375);
await p.screenshot({path:PNG.replace(/\.png$/,'')+'-bridges.png'});
ok('no page errors (two pages)',errs.length===0,JSON.stringify(errs));await p.close();
// 5. endless pages -> capped "N+"
({p,errs}=await page('endless'));
ib=await p.$eval('#inboxn',e=>e.textContent);const calls=await p.evaluate(()=>window.__calls);
ok('cap at 10 pages shows N+',ib==='1000+'&&calls===10,ib+' after '+calls+' calls');
ok('no page errors (capped)',errs.length===0,JSON.stringify(errs));await p.close();
console.log('BUILD NOW '+C.d+' of '+C.n+' = '+Math.round(C.d/C.n*100)+'%');
console.log(fails?'RESULT FAIL '+fails:'RESULT ALL PASS');await b.close();process.exit(fails?1:0)})();
