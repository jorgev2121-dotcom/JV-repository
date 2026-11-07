const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const p=await b.newPage({viewport:{width:900,height:1400}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
const now=Date.now(),iso=m=>new Date(now-m*60000).toISOString();
await p.addInitScript(([iso0])=>{const iso=m=>new Date(Date.now()-m*60000).toISOString();
const files={hb:[{id:'u',title:'_UPTIME-HEARTBEAT.md',modifiedTime:iso(3)}],res:[{id:'c1',title:'EXECUTED_CODEX_TEST.md',modifiedTime:iso(30),viewUrl:'#'},{id:'b1',title:'BLOCKER_TEST.md',modifiedTime:iso(50),viewUrl:'#'}],rambo:[],act:[{id:'a1',title:'ACK_MSG-TEST_AUTO.md',modifiedTime:iso(70),viewUrl:'#'}]};
const mcp={watchTool(s,t,inp,h){setTimeout(()=>{if(s==='Claude Code Remote'){h({type:'error',error:{code:'blocked_by_policy'}});return}
if(t==='read_file_content'){h({type:'data',result:{payload:{fileContent:'﻿{ \n "VTES-LOCAL-POLLER": { "status": "green", "machine": "PC", "last\\_run": "'+iso(4)+'" } }'}}});return}
const q=inp.query;const k=q.includes('UPTIME')?'hb':q.includes('CLAIM_')?'act':q.includes("title contains 'EXECUTED_RAMBO1_'\"")||/EXECUTED_RAMBO1_'$/.test(q)?'rambo':q.includes('EXECUTED_RAMBO1_')&&!q.includes('BLOCKER')?'rambo':'res';
h({type:'data',result:{payload:{files:files[k]}}})},50);return()=>{}},callTool(){return Promise.reject({code:'tool_error'})},invalidate(){return Promise.resolve()}};
window.claude={use:async n=>n==='mcp'?mcp:null};},[0]);
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>VTES.show('CONNECT'));await p.waitForTimeout(1500);
const rows=await p.$$eval('#connectbody .ent',els=>els.map(e=>e.querySelector('h3').textContent+' | '+e.querySelector('.cstat').textContent+' | '+e.querySelector('.detail').textContent.slice(0,140)));
console.log(rows.filter(r=>/RAMBO|Codex|POLLER|Job-Watcher/.test(r)).join('\n'));
console.log('STAMP:',await p.textContent('#livestamp'));console.log('ERRS:',errs);
await p.screenshot({path:process.argv[3],fullPage:false});await b.close()})();
