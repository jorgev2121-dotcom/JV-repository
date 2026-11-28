// plaud-test.js — 2026-10-14. PLAUD tab pieces: 'List recordings', 'Transcript links', 'File to TRK suggestion'.
// Checks: the recording list renders with >=1 row (or an honest "no recordings" line if the snapshot is empty), each row
// with date, title, length and Plaud id; the "snapshot taken YYYY-MM-DD HH:MM UTC" stamp; every row has either a real link
// or "open in the Plaud app" plus a working Copy id button; no transcript text (no text block over 300 characters);
// every suggestion is "no match" or a TRK that exists in _JOBS.tsv, with high/med/low and match words whose job-side word
// is in the cited source file; the "Suggestion only — filing needs your yes" label on every row; no ###-##-#### strings,
// 16-digit runs, phone numbers or $ amounts on PLAUD; 375px no sideways scroll; BUILD built-count up by exactly N vs git
// HEAD (or an optional 3rd argument); 0000 money lock intact.
// Usage: node plaud-test.js <abs panel path> <png path> [baseline panel path]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const PANEL=process.argv[2],PNG=process.argv[3]||'/tmp/plaud-test.png';
let fails=0;const ok=(name,cond,extra)=>{console.log((cond?'PASS ':'FAIL ')+name+(extra!==undefined?' :: '+extra:''));if(!cond)fails++};
function buildOf(src){const m=src.match(/var BUILD=(\{[\s\S]*?\]\]\]\]\]\]\});/);if(!m)return null;return Function('return '+m[1])()}
function stat(B){let n=0,d=0;const per={};Object.keys(B).forEach(t=>{let tn=0,td=0;B[t].forEach(s=>s[1].forEach(f=>f[1].forEach(it=>{tn++;if(it[1])td++})));per[t]=[td,tn];n+=tn;d+=td});return {n,d,per}}
const PIECES=[['PLAUD','List recordings'],['PLAUD','Transcript links'],['PLAUD','File to TRK suggestion']];
const N=PIECES.length;
(async()=>{
const src=fs.readFileSync(PANEL,'utf8');const cur=buildOf(src);let base=null,baseFrom='',root='';
try{root=execFileSync('git',['-C',path.dirname(PANEL),'rev-parse','--show-toplevel']).toString().trim()}catch(e){}
if(process.argv[4]){base=buildOf(fs.readFileSync(process.argv[4],'utf8'));baseFrom=process.argv[4]}
else if(root){try{base=buildOf(execFileSync('git',['-C',root,'show','HEAD:'+path.relative(root,PANEL)],{maxBuffer:64e6}).toString());baseFrom='git HEAD'}catch(e){}}
const C=stat(cur);ok('BUILD parsed',!!cur,C.d+' of '+C.n+' built ('+Math.round(C.d/C.n*100)+'%)');
if(base){const B=stat(base);ok('BUILD count went up by '+N+' vs '+baseFrom,C.d-B.d===N&&C.n===B.n,B.d+' -> '+C.d+' of '+C.n)}else ok('baseline available',false,'no git HEAD and no 3rd arg');
const leaf=(t,name)=>{let v=null;(cur[t]||[]).forEach(s=>s[1].forEach(f=>f[1].forEach(it=>{if(it[0]===name)v=it[1]})));return v};
ok(N+' pieces flipped to 1',PIECES.every(([t,n])=>leaf(t,n)===1),PIECES.map(([t,n])=>n+'='+leaf(t,n)).join(', '));

const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const ctx=await b.newContext({viewport:{width:1280,height:900}});await ctx.grantPermissions(['clipboard-read','clipboard-write']).catch(()=>{});
const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.claude={use:async()=>null}});await p.goto('file://'+PANEL);await p.waitForTimeout(1000);
await p.evaluate(()=>VTES.show('PLAUD'));await p.waitForTimeout(300);
const D=await p.evaluate(()=>VTES.plData());
// 1. list renders
const R=await p.evaluate(()=>({rows:[...document.querySelectorAll('#pllist .plrow')].map(r=>({id:r.dataset.id,t:r.innerText,title:r.querySelector('.pltitle').textContent,links:[...r.querySelectorAll('a')].map(a=>a.href),btn:!!r.querySelector('button.plcopy'),sug:r.querySelector('.plsug').innerText})),pane:document.getElementById('pane-PLAUD').innerText}));
ok('snapshot stamp "snapshot taken YYYY-MM-DD HH:MM UTC" shown',/snapshot taken \d{4}-\d{2}-\d{2} \d{2}:\d{2} UTC/.test(R.pane)&&/^\d{4}-\d{2}-\d{2} \d{2}:\d{2} UTC$/.test(D.at),D.at);
if(D.rec.length===0){ok('no recordings: honest "No recordings" line',/No recordings\./.test(R.pane)&&R.rows.length===0)}
else{
ok('recording list renders >=1 row, one per snapshot record',R.rows.length>=1&&R.rows.length===D.rec.length,R.rows.length+' rows');
const rowBad=R.rows.map((r,i)=>(r.id===D.rec[i][0]&&/^of_[0-9a-f]{32}$/.test(r.id.replace(/ /g,''))&&/\d{4}-\d{2}-\d{2} \d{2}:\d{2} ET/.test(r.t)&&/\d+ (s|min)\b/.test(r.t)&&r.title===D.rec[i][2]&&r.t.includes(r.id))?null:i+':'+JSON.stringify(r.t.slice(0,120))).filter(Boolean);
ok('every row has date (ET), length, title and its Plaud file id',rowBad.length===0,rowBad.join(' | '));
ok('rows are newest first',D.rec.map(r=>r[1]).join()===D.rec.map(r=>r[1]).slice().sort().reverse().join());
// 2. transcript links
ok('each row: a real Plaud link if the API gave one, otherwise "open in the Plaud app" + Copy id',R.rows.every(r=>D.url[r.id]?r.links.includes(D.url[r.id]):(/open in the Plaud app/.test(r.t)&&r.links.length===0&&r.btn)),Object.keys(D.url).length+' rows with a URL');
ok('no expiring signed audio links (amazonaws / X-Amz) on the page',!/amazonaws|X-Amz-/i.test(src.slice(src.indexOf('var PLAT='),src.indexOf('function plDur'))));
await p.click('#pllist .plrow:first-child button.plcopy');await p.waitForTimeout(300);
const cm=await p.$eval('#plm-0',e=>e.textContent);const clip=await p.evaluate(()=>navigator.clipboard.readText().catch(()=>null));
ok('Copy id button copies the id',/Copied/.test(cm)&&(clip===null||clip===D.rec[0][0].replace(/ /g,'')),cm+' / '+clip);
// 3. suggestions
const jobs=fs.readFileSync(path.join(root,'control-panel/hashtag-census/_JOBS.tsv'),'utf8');
ok('every row carries the label "Suggestion only — filing needs your yes"',R.rows.every(r=>r.sug.startsWith('Suggestion only — filing needs your yes:')));
const bad=D.sug.filter(s=>s[3]==='none'?!(s[1]===null&&s[5]):!(/^TRK-2026-\d{4}$/.test(s[1])&&['high','med','low'].includes(s[3])&&jobs.includes(s[1])&&jobs.includes(s[2])&&s[5].length>0));
ok('every suggestion is "no match" or a real TRK from _JOBS.tsv with high/med/low (none invented)',bad.length===0&&D.sug.length===D.rec.length,bad.map(s=>s[0]).join(', '));
const evBad=[];D.sug.filter(s=>s[3]!=='none').forEach(s=>s[5].forEach(e=>{const f=path.join(root,e[2]);if(!fs.existsSync(f)||!fs.readFileSync(f,'utf8').includes(e[1]))evBad.push(s[0]+':'+e[1])}));
ok('every match word is shown and its job-side word is in the cited source file',evBad.length===0&&R.rows.every((r,i)=>D.sug[i][3]==='none'?/no match/.test(r.sug):/Match words:/.test(r.sug)&&new RegExp('\\b'+D.sug[i][3]+'\\b').test(r.sug)),evBad.join(', '));
console.log('  suggestions: '+D.sug.filter(s=>s[3]!=='none').map(s=>s[1]+' '+s[3]).join(', ')+' · no match '+D.sug.filter(s=>s[3]==='none').length);
}
// 4. no transcript text: no text node / element text block over 300 chars inside the pane
const longest=await p.evaluate(()=>{let mx=0,w='';document.querySelectorAll('#pane-PLAUD p, #pane-PLAUD li .pltitle, #pane-PLAUD li .plline, #pane-PLAUD span').forEach(e=>{const l=e.innerText.length;if(l>mx){mx=l;w=e.innerText.slice(0,80)}});return [mx,w]});
const dataLong=[].concat(...D.rec.map(r=>r.map(String)),...D.sug.map(s=>[].concat(...s.map(x=>Array.isArray(x)?[].concat(...x):[String(x)])))).filter(x=>x.length>300);
ok('no transcript text: no text block over 300 characters (page or data)',longest[0]<=300&&dataLong.length===0,longest[0]+' chars max: '+longest[1]);
// 5. identifiers
let T2='';const T=await p.evaluate(()=>{const pane=document.getElementById('pane-PLAUD');return pane.innerText+'\n'+[...pane.querySelectorAll('[data-tip]')].map(e=>e.dataset.tip).join('\n')+'\n'+[...pane.querySelectorAll('a')].map(a=>a.href).join('\n')});
const PSRC=src.slice(src.indexOf('var PLAT='),src.indexOf('setTimeout(function(){if(window.VTES){VTES.plCopy'));T2=T+'\n'+PSRC;
const ssn=T2.match(/\b\d{3}-\d{2}-\d{4}\b/g)||[],r16=(T2.match(/(?<!\d)\d{16,}(?!\d)/g)||[]).concat(T2.match(/(?<![\d-])\d{4}([ -])\d{4}\1\d{4}\1\d{4}(?![\d-])/g)||[]),ph=T.match(/\(?\b\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b/g)||[],money=T.match(/\$\s?\d/g)||[];
ok('no ###-##-#### strings on PLAUD (page text, tooltips, links and the embedded data)',ssn.length===0,ssn.join(' '));
ok('no 16-digit runs (or 4-4-4-4 groups) on PLAUD (page and embedded data)',r16.length===0,r16.join(' '));
ok('no phone numbers on PLAUD',ph.length===0,ph.join(' '));
ok('no dollar amounts on PLAUD',money.length===0,money.length);
// 6. 375px
await p.setViewportSize({width:375,height:800});await p.evaluate(()=>VTES.show('PLAUD'));await p.waitForTimeout(250);
const sw=await p.evaluate(()=>[document.documentElement.scrollWidth,document.body.scrollWidth]);
ok('375px no sideways scroll on PLAUD',sw[0]<=375&&sw[1]<=375,sw.join(' / '));
await p.addStyleTag({content:'.header{position:static!important}'});
await p.screenshot({path:PNG,fullPage:false});
// 7. money lock
const m=await p.evaluate(()=>({open:document.body.classList.contains('money-open'),mz:document.querySelectorAll('.mz').length,shown:[...document.querySelectorAll('.mz')].filter(s=>s.textContent!=='🔒$').length,leak:/\$\s?\d/.test(document.body.innerText)}));
ok('0000 money lock intact (locked, no amounts visible)',!m.open&&m.mz>0&&m.shown===0&&!m.leak,JSON.stringify(m));
ok('PLAUD BUILD box shows 100%',await p.$eval('#bb-PLAUD .bbpct',e=>e.textContent)==='100%',await p.$eval('#bb-PLAUD .bbpct',e=>e.textContent));
ok('no page errors',errs.length===0,JSON.stringify(errs));await p.close();
console.log('  PLAUD '+C.per.PLAUD[0]+' of '+C.per.PLAUD[1]+' ('+Math.round(C.per.PLAUD[0]/C.per.PLAUD[1]*100)+'%)');
console.log('BUILD NOW '+C.d+' of '+C.n+' = '+Math.round(C.d/C.n*100)+'%');
console.log(fails?'RESULT FAIL '+fails:'RESULT ALL PASS');await b.close();process.exit(fails?1:0)})();
