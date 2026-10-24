// handoffs-test.js — 2026-10-14. HANDOFFS packet-builder pieces:
// "Task-type picker, cheapest lane", "Personal-data tick box + digit checker", "LOCAL safe-folder rule".
// Checks: every task type fills the To lane with a reason line (RED types say "Prepare only — Jorge's yes");
// Codex (and ChatGPT/Gemini) never picked or offered when the client-data box is ticked; the digit checker flags
// 123-45-6789 and 4111111111111111 and blocks Copy, passes plain text, and ticking the box unblocks it;
// the rule line is shown; BUILD built-count up by exactly 3 vs baseline (git HEAD, or an optional 3rd argument);
// HANDOFFS at 100%; 0000 money lock intact; 375px has no sideways scroll.
// Usage: node handoffs-test.js <abs panel path> <png path> [baseline panel path]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const PANEL=process.argv[2],PNG=process.argv[3]||'/tmp/handoffs.png';
let fails=0;const ok=(name,cond,extra)=>{console.log((cond?'PASS ':'FAIL ')+name+(extra!==undefined?' :: '+extra:''));if(!cond)fails++};
function buildOf(src){const m=src.match(/var BUILD=(\{[\s\S]*?\]\]\]\]\]\]\});/);if(!m)return null;return Function('return '+m[1])()}
function stat(B){let n=0,d=0;const per={};Object.keys(B).forEach(t=>{let tn=0,td=0;B[t].forEach(s=>s[1].forEach(f=>f[1].forEach(it=>{tn++;if(it[1])td++})));per[t]=[td,tn];n+=tn;d+=td});return {n,d,per}}
const RULE='Packets with client data go only to LOCAL lanes (Claude desktop / Claude cloud) and the safe folder; never to free external AIs.';
(async()=>{
const cur=buildOf(fs.readFileSync(PANEL,'utf8'));let base=null,baseFrom='';
if(process.argv[4]){base=buildOf(fs.readFileSync(process.argv[4],'utf8'));baseFrom=process.argv[4]}
else{try{const root=execFileSync('git',['-C',path.dirname(PANEL),'rev-parse','--show-toplevel']).toString().trim();
  base=buildOf(execFileSync('git',['-C',root,'show','HEAD:'+path.relative(root,PANEL)],{maxBuffer:64e6}).toString());baseFrom='git HEAD'}catch(e){}}
const C=stat(cur);ok('BUILD parsed',!!cur,C.d+' of '+C.n+' built ('+Math.round(C.d/C.n*100)+'%)');
if(base){const B=stat(base);ok('BUILD count went up by 3 vs '+baseFrom,C.d-B.d===3&&C.n===B.n,B.d+' -> '+C.d+' of '+C.n)}else ok('baseline available',false,'no git HEAD and no 3rd arg');
const leaf=(t,name)=>{let v=null;(cur[t]||[]).forEach(s=>s[1].forEach(f=>f[1].forEach(it=>{if(it[0]===name)v=it[1]})));return v};
ok('three pieces flipped to 1',['Task-type picker, cheapest lane','Personal-data tick box + digit checker','LOCAL safe-folder rule'].every(n=>leaf('HANDOFFS',n)===1));
ok('HANDOFFS BUILD complete',C.per.HANDOFFS[0]===C.per.HANDOFFS[1],C.per.HANDOFFS.join('/'));

const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.claude={use:async()=>null}});
await p.goto('file://'+PANEL);await p.waitForTimeout(1200);
await p.evaluate(()=>VTES.show('HANDOFFS'));await p.waitForTimeout(250);
ok('HANDOFFS tab shows 100%',await p.$eval('#bb-HANDOFFS .bbpct',e=>e.textContent)==='100%',await p.$eval('#bb-HANDOFFS .bbpct',e=>e.textContent));
// rule line
const rule=await p.$eval('#hp-rule',e=>({t:e.innerText,v:e.offsetHeight>0})).catch(()=>null);
ok('LOCAL safe-folder rule line visible',rule&&rule.v&&rule.t.includes(RULE),rule&&rule.t);
// picker
const types=await p.$$eval('#hp-type option',o=>o.filter(x=>x.value).map(x=>({v:x.value,l:x.textContent})));
ok('picker has the task types',types.length>=6&&['survey','ocr','draft','code','filing','email'].every(k=>types.some(t=>t.v===k)),types.map(t=>t.l).join(' | '));
const toLabel=()=>p.$eval('#hp-to',s=>s.options[s.selectedIndex].textContent);
const toList=()=>p.$$eval('#hp-to option',o=>o.map(x=>x.textContent));
const setPii=async v=>{const c=await p.isChecked('#hp-pii');if(c!==v)await p.click('#hp-pii')};
const res={};
for(const t of types){await setPii(false);await p.selectOption('#hp-type',t.v);await p.waitForTimeout(40);
  res[t.v]={to:await toLabel(),why:await p.textContent('#hp-why'),pii:await p.isChecked('#hp-pii'),pv:await p.inputValue('#hp-preview')}}
ok('each type fills a lane with a one-line reason',types.every(t=>res[t.v].to&&res[t.v].why.length>10&&!res[t.v].why.includes('\n')),types.map(t=>t.v+'→'+res[t.v].to).join(', '));
ok('cheap items go to cheap lanes (survey → Ollama, code → Codex)',/Ollama/.test(res.survey.to)&&/Codex/.test(res.code.to));
ok('client-data types go only to Claude cloud / desktop',['ocr','draft','filing','email'].every(k=>/Cloud executor|Desktop executor/.test(res[k].to)&&res[k].pii));
ok('RED type shows "Prepare only — Jorge\'s yes"',res.email.why.includes("Prepare only — Jorge's yes")&&res.email.pv.includes("Prepare only — Jorge's yes"),res.email.why);
// PII rule
const piiRes=[];for(const t of types){await setPii(true);await p.selectOption('#hp-type','');await p.selectOption('#hp-type',t.v);await p.waitForTimeout(40);piiRes.push({t:t.v,to:await toLabel(),list:await toList()})}
ok('Codex never picked when client-data box is ticked',piiRes.every(r=>!/Codex/.test(r.to)),piiRes.map(r=>r.t+'→'+r.to).join(', '));
ok('ticked: every pick is a LOCAL lane (Claude cloud / desktop)',piiRes.every(r=>/Cloud executor|Desktop executor/.test(r.to)));
ok('ticked: Codex, ChatGPT and Gemini removed from To list',piiRes.every(r=>!r.list.some(x=>/Codex|ChatGPT|Gemini/.test(x))),piiRes[0].list.join(' | '));
ok('ticked: packet carries the client-data line',(await p.inputValue('#hp-preview')).includes('Client data: YES · LOCAL lanes only'));
await setPii(false);await p.selectOption('#hp-type','');await p.waitForTimeout(40);
ok('unticked: Codex back in To list',(await toList()).some(x=>/Codex/.test(x)));
// digit checker
const typeWhat=async v=>{await p.fill('#hp-what',v);await p.waitForTimeout(40);return {warn:await p.$eval('#hp-warn',e=>!e.hidden&&e.offsetHeight>0?e.textContent:''),dis:await p.$eval('#hp-copy',e=>e.disabled),copy:await p.evaluate(()=>VTES.hpCopy())}};
await setPii(false);
for(const bad of ['Client SSN 123-45-6789 on the form','Card 4111111111111111 for the fee','Card 4111-1111-1111-1111','Account 000123456789']){const r=await typeWhat(bad);
  ok('flags and blocks Copy: '+bad,r.warn&&r.dis&&r.copy===false,r.warn)}
const red=await p.$eval('#hp-warn',e=>{const q=document.createElement('span');q.style.color='var(--bad)';document.body.appendChild(q);const want=getComputedStyle(q).color;q.remove();const got=getComputedStyle(e).color;return {ok:got===want,got,want}});
const plain=await typeWhat('Survey the TRK-2026-1262 folder, folio 30-5022-000-0130, call 305-555-1234 by 2026-10-15');
ok('plain text passes (no warning, Copy enabled)',!plain.warn&&!plain.dis,plain.warn||'clean');
const full=await typeWhat('Client SSN 123-45-6789');
ok('warning does not echo the full number',!full.warn.includes('123-45-6789')&&full.warn.includes('6789'),full.warn);
await setPii(true);await p.waitForTimeout(40);
ok('ticking the box unblocks Copy',!(await p.$eval('#hp-copy',e=>e.disabled)));
ok('warning is red (page token --bad) when blocking',red.ok,JSON.stringify(red));
await p.fill('#hp-what','Client SSN 123-45-6789');await setPii(true);
await p.setViewportSize({width:375,height:800});await p.waitForTimeout(150);
const sw=await p.evaluate(()=>document.documentElement.scrollWidth);ok('375px no sideways scroll on HANDOFFS (builder filled)',sw<=375,'scrollWidth '+sw);
await p.addStyleTag({content:'.header{position:static!important}'});await (await p.$('#hp-card')).screenshot({path:PNG});
await p.setViewportSize({width:1280,height:900});
await setPii(false);await p.fill('#hp-what','');
const m=await p.evaluate(()=>({open:document.body.classList.contains('money-open'),mz:document.querySelectorAll('.mz').length,shown:[...document.querySelectorAll('.mz')].filter(s=>s.textContent!=='🔒$').length,leak:/\$\s?\d/.test(document.body.innerText)}));
ok('0000 money lock intact (locked, no amounts visible)',!m.open&&m.mz>0&&m.shown===0&&!m.leak,JSON.stringify(m));
ok('no page errors',errs.length===0,JSON.stringify(errs));
console.log('BUILD NOW '+C.d+' of '+C.n+' = '+Math.round(C.d/C.n*100)+'%');
console.log(fails?'RESULT FAIL '+fails:'RESULT ALL PASS');await b.close();process.exit(fails?1:0)})();
