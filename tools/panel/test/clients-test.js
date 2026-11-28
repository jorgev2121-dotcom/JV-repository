// clients-test.js — 2026-10-14. CLIENTS tab pieces: 'Client list', 'Contact sheet per TRK', 'Last email per client'.
// Checks: the client list renders with Drive job-folder links and the search box narrows it (and clears back);
// the per-job contact cards render and open; the last-contact snapshot renders with a source on every line;
// every person/email shown traces to a census file; no ###-##-#### strings or 16-digit runs, no phone numbers,
// no $ amounts on CLIENTS; 375px no sideways scroll (list, filtered, all cards open);
// BUILD built-count up by exactly N vs git HEAD (or an optional 3rd argument); 0000 money lock intact.
// Usage: node clients-test.js <abs panel path> <png path> [baseline panel path]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const PANEL=process.argv[2],PNG=process.argv[3]||'/tmp/clients-test.png';
let fails=0;const ok=(name,cond,extra)=>{console.log((cond?'PASS ':'FAIL ')+name+(extra!==undefined?' :: '+extra:''));if(!cond)fails++};
function buildOf(src){const m=src.match(/var BUILD=(\{[\s\S]*?\]\]\]\]\]\]\});/);if(!m)return null;return Function('return '+m[1])()}
function stat(B){let n=0,d=0;const per={};Object.keys(B).forEach(t=>{let tn=0,td=0;B[t].forEach(s=>s[1].forEach(f=>f[1].forEach(it=>{tn++;if(it[1])td++})));per[t]=[td,tn];n+=tn;d+=td});return {n,d,per}}
const PIECES=[['CLIENTS','Client list'],['CLIENTS','Contact sheet per TRK'],['CLIENTS','Last email per client']];
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
const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.claude={use:async()=>null}});await p.goto('file://'+PANEL);await p.waitForTimeout(1000);
await p.evaluate(()=>VTES.show('CLIENTS'));await p.waitForTimeout(300);
const DRIVE=/^https:\/\/drive\.google\.com\/drive\/folders\/[A-Za-z0-9_-]{20,}$/;
// 1. client list
const L=await p.evaluate(()=>({rows:[...document.querySelectorAll('#cllist .clrow')].map(r=>({n:r.querySelector('.clhead b').textContent,tip:r.dataset.tip,links:[...r.querySelectorAll('.cljobs a')].map(a=>a.href),ltips:[...r.querySelectorAll('.cljobs li')].map(l=>l.dataset.tip)})),count:document.getElementById('clcount').textContent,data:VTES.clData().list.length}));
ok('client list renders (one row per client)',L.rows.length>=20&&L.rows.length===L.data,L.rows.length+' rows');
ok('count line starts at all shown',L.count===L.data+' of '+L.data+' shown',L.count);
ok('every client has at least one job, every job is a Drive folder link',L.rows.every(r=>r.links.length>0&&r.links.every(h=>DRIVE.test(h))));
ok('every row and job line has a "source:" tooltip',L.rows.every(r=>/^source: control-panel\/hashtag-census\//.test(r.tip)&&r.ltips.every(t=>/^source: /.test(t))));
ok('no city staff or vendors in the list (Jorge, county, city names absent)',!L.rows.some(r=>/Jorge Valdes|Miami-Dade|City of|Town of|Synergyn|Masonite/.test(r.n)),L.rows.map(r=>r.n).join(', ').slice(0,160)+'…');
// 2. search narrows
await p.click('#clq');await p.keyboard.type('alec',{delay:20});await p.waitForTimeout(150);
const s1=await p.evaluate(()=>({vis:[...document.querySelectorAll('#cllist .clrow')].filter(r=>!r.hidden&&r.offsetHeight>0).map(r=>r.querySelector('.clhead b').textContent),count:document.getElementById('clcount').textContent}));
ok('typing "alec" narrows the list to Alec Valdes',s1.vis.length>=1&&s1.vis.length<L.rows.length&&s1.vis.includes('Alec Valdes'),s1.vis.join(', '));
ok('count line follows the search',s1.count===s1.vis.length+' of '+L.data+' shown',s1.count);
await p.fill('#clq','TRK-2026-1265');await p.dispatchEvent('#clq','input');await p.waitForTimeout(100);
const s2=await p.evaluate(()=>[...document.querySelectorAll('#cllist .clrow')].filter(r=>!r.hidden).map(r=>r.querySelector('.clhead b').textContent));
ok('searching a job number finds that job\'s clients',s2.includes('Miguel Zaldivar')&&s2.length<L.rows.length,s2.join(', '));
await p.fill('#clq','zzzz-no-such-client');await p.dispatchEvent('#clq','input');await p.waitForTimeout(100);
const s3=await p.evaluate(()=>({n:[...document.querySelectorAll('#cllist .clrow')].filter(r=>!r.hidden).length,c:document.getElementById('clcount').textContent}));
ok('no match shows a plain message',s3.n===0&&/Nothing matches/.test(s3.c),s3.c);
await p.fill('#clq','');await p.dispatchEvent('#clq','input');await p.waitForTimeout(100);
ok('clearing the box brings everyone back',await p.evaluate(()=>[...document.querySelectorAll('#cllist .clrow')].filter(r=>!r.hidden).length)===L.rows.length);
// 3. contact cards open
const K=await p.evaluate(()=>({n:document.querySelectorAll('#clsheet details.clcard').length,jobs:VTES.clData().jobs.length,open:document.querySelectorAll('#clsheet details.clcard[open]').length}));
ok('one contact card per job folder, all closed at start',K.n===K.jobs&&K.n>=40&&K.open===0,K.n+' cards, '+K.open+' open');
const card=await p.$('#clsheet details.clcard[data-k="TRK-2026-1265"]');await (await card.$('summary')).click();await p.waitForTimeout(150);
const c1=await card.evaluate(d=>({open:d.open,h:d.querySelector('.clbody').offsetHeight,names:[...d.querySelectorAll('.clpl li b')].map(b=>b.textContent),tips:[...d.querySelectorAll('.clpl li')].every(l=>/^source: control-panel\/hashtag-census\//.test(l.dataset.tip)),drive:d.querySelector('.clbody a').href,mail:d.innerText.includes('miguel@mzsolutions.org')}));
ok('clicking a card opens it and shows people + companies',c1.open&&c1.h>0&&c1.names.includes('Miguel Zaldivar')&&c1.names.includes('MZ Solutions LLC'),c1.names.length+' entries');
ok('card rows carry source tooltips, emails and a Drive folder link',c1.tips&&c1.mail&&DRIVE.test(c1.drive),c1.drive);
await (await card.$('summary')).click();await p.waitForTimeout(100);ok('clicking again closes it',!(await card.evaluate(d=>d.open)));
// 4. every name/email on CLIENTS traces to a census file (never invented)
const shown=await p.evaluate(()=>{const {jobs:CLJOBS,list:CLLIST,last:CLLAST}=VTES.clData();return {names:[...new Set([].concat(...CLJOBS.map(j=>j.p.map(x=>x[0]).concat(j.c.map(x=>x[0])))))],mails:[...new Set([].concat(...CLJOBS.map(j=>[].concat(...j.p.map(x=>x[2])))))],client:CLLIST.map(c=>c.n),last:CLLAST.map(x=>[x[0],x[4]])}});
const census=fs.readdirSync(path.join(root,'control-panel/hashtag-census')).filter(f=>f.endsWith('.json')).map(f=>fs.readFileSync(path.join(root,'control-panel/hashtag-census',f),'utf8')).join('\n');
const ce=census;const unq=s=>JSON.stringify(s).slice(1,-1);
const missN=shown.names.filter(n=>!ce.includes(unq(n))),missM=shown.mails.filter(m=>!ce.toLowerCase().includes(m.toLowerCase()));
ok('every person/company name is in a census file',missN.length===0,missN.join(', '));
ok('every email is in a census file',shown.mails.length>0&&missM.length===0,shown.mails.length+' emails; missing '+missM.join(', '));
const merged=shown.client.filter(n=>!ce.includes(unq(n))&&!/^TEDC \(|^MZ Solutions LLC$/.test(n));ok('every client name traces to the census',merged.length===0,merged.join(', '));
ok('every last-contact line names its source file, and that file exists',shown.last.length>0&&shown.last.every(([n,s])=>s.split(' + ').every(f=>fs.existsSync(path.join(root,f)))),shown.last.map(x=>x[0]).join(', '));
// 5. last contact card
const LL=await p.evaluate(()=>[...document.querySelectorAll('#cllast .cllastrow')].map(r=>({t:r.textContent,tip:r.dataset.tip})));
ok('last-contact snapshot renders, dated, newest first, sourced',LL.length===shown.last.length&&LL.every(r=>/^\d{4}-\d{2}-\d{2}/.test(r.t)&&/^source: (inbox-sweep|reports)\//.test(r.tip))&&LL.map(r=>r.t.slice(0,10)).join()===LL.map(r=>r.t.slice(0,10)).sort().reverse().join(),LL.length+' lines');
// 6. no identifiers, phones or money on CLIENTS (cards all open so every string is in innerText)
await p.evaluate(()=>document.querySelectorAll('#clsheet details.clcard').forEach(d=>d.open=true));await p.waitForTimeout(150);
const T=await p.evaluate(()=>{const pane=document.getElementById('pane-CLIENTS');return pane.innerText+'\n'+[...pane.querySelectorAll('[data-tip]')].map(e=>e.dataset.tip).join('\n')+'\n'+[...pane.querySelectorAll('a')].map(a=>a.href).join('\n')});
const ssn=T.match(/\b\d{3}-\d{2}-\d{4}\b/g)||[],r16=(T.match(/(?<!\d)\d{16,}(?!\d)/g)||[]).concat(T.match(/(?<![\d-])\d{4}([ -])\d{4}\1\d{4}\1\d{4}(?![\d-])/g)||[]),ph=T.match(/\(?\b\d{3}\)?[-. ]\d{3}[-. ]\d{4}\b/g)||[],money=T.match(/\$\s?\d/g)||[];
ok('no ###-##-#### strings on CLIENTS',ssn.length===0,ssn.join(' '));
ok('no 16-digit runs (or 4-4-4-4 card groups) on CLIENTS',r16.length===0,r16.join(' '));
ok('no phone numbers on CLIENTS',ph.length===0,ph.join(' '));
ok('no dollar amounts on CLIENTS',money.length===0,money.length);
// 7. 375px
await p.setViewportSize({width:375,height:800});await p.evaluate(()=>VTES.show('CLIENTS'));await p.waitForTimeout(200);
const sw0=await p.evaluate(()=>document.documentElement.scrollWidth);
await p.evaluate(()=>document.querySelectorAll('#clsheet details.clcard').forEach(d=>d.open=true));await p.waitForTimeout(150);
const sw1=await p.evaluate(()=>document.documentElement.scrollWidth);
await p.fill('#clq','miguel');await p.dispatchEvent('#clq','input');await p.waitForTimeout(150);
const sw2=await p.evaluate(()=>document.documentElement.scrollWidth);
ok('375px no sideways scroll on CLIENTS (closed, all cards open, filtered)',sw0<=375&&sw1<=375&&sw2<=375,sw0+' / '+sw1+' / '+sw2);
await p.fill('#clq','');await p.dispatchEvent('#clq','input');
await p.evaluate(()=>document.querySelectorAll('#clsheet details.clcard').forEach((d,i)=>d.open=i<2));
await p.addStyleTag({content:'.header{position:static!important}'});
await (await p.$('#pane-CLIENTS')).screenshot({path:PNG});
// 8. money lock
const m=await p.evaluate(()=>({open:document.body.classList.contains('money-open'),mz:document.querySelectorAll('.mz').length,shown:[...document.querySelectorAll('.mz')].filter(s=>s.textContent!=='🔒$').length,leak:/\$\s?\d/.test(document.body.innerText)}));
ok('0000 money lock intact (locked, no amounts visible)',!m.open&&m.mz>0&&m.shown===0&&!m.leak,JSON.stringify(m));
ok('CLIENTS BUILD box shows 100%',await p.$eval('#bb-CLIENTS .bbpct',e=>e.textContent)==='100%',await p.$eval('#bb-CLIENTS .bbpct',e=>e.textContent));
ok('no page errors',errs.length===0,JSON.stringify(errs));await p.close();
console.log('  CLIENTS '+C.per.CLIENTS[0]+' of '+C.per.CLIENTS[1]+' ('+Math.round(C.per.CLIENTS[0]/C.per.CLIENTS[1]*100)+'%)');
console.log('BUILD NOW '+C.d+' of '+C.n+' = '+Math.round(C.d/C.n*100)+'%');
console.log(fails?'RESULT FAIL '+fails:'RESULT ALL PASS');await b.close();process.exit(fails?1:0)})();
