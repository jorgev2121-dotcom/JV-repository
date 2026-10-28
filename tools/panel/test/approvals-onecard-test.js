// APPROVALS "One card at a time mode": a toggle that shows one approval card, big, with big
// Approve / Not now buttons, "Card N of M", Back/Next, arrow keys, remembered in localStorage,
// and still working with the waiting clock, read aloud, the 0000 money lock and hover tips.
// Usage: node approvals-onecard-test.js <abs panel path> <png path>
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs'),path=require('path');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
// copy of the panel with one extra money card injected, so the lock can be tested on real card text
const src=fs.readFileSync(process.argv[2],'utf8'),tmp=path.join(path.dirname(process.argv[3]),'onecard-money-copy.html');
const inj='var approvalItems=[\n{id:"money-test",since:new Date(Date.now()-30*3600000).toISOString(),title:"Send Medley invoice $8,000",body:"Invoice for $8,000.00 plus a $1.5k fee.",detail:"x"},';
if(!src.includes('var approvalItems=[\n')){console.log('inject point missing',false);process.exit(1)}
fs.writeFileSync(tmp,src.replace('var approvalItems=[\n',inj));
const ctx=await b.newContext({viewport:{width:1280,height:900}});
await ctx.addInitScript(()=>{window.claude={use:async()=>null};window.__spoken=[];
  window.SpeechSynthesisUtterance=function(t){this.text=t};
  Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{speak:u=>{window.__spoken.push(u.text);u.onstart&&u.onstart();},cancel:()=>{},speaking:false}})});
const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+tmp);await p.waitForTimeout(800);
await p.evaluate(()=>{try{localStorage.removeItem('vtes-onecard')}catch(e){}});await p.reload();await p.waitForTimeout(800);
await p.evaluate(()=>VTES.show('APPROVALS'));await p.waitForTimeout(400);
const vis=()=>p.evaluate(()=>[...document.querySelectorAll('#pane-APPROVALS .apcard')].filter(c=>c.offsetParent!==null).map(c=>c.dataset.id));
const M=await p.evaluate(()=>document.querySelectorAll('#pane-APPROVALS .apcard').length);
console.log('default off: all cards showing',(await vis()).length===M,(await vis()).length+' of '+M);
console.log('toggle button visible',await p.isVisible('#oc-toggle'));
console.log('one-card nav hidden while off',!(await p.isVisible('#oc-nav')));
await p.click('#oc-toggle');await p.waitForTimeout(150);
let v=await vis();console.log('on: exactly one card showing',v.length===1&&v[0]==='money-test',JSON.stringify(v));
console.log('count says Card 1 of '+M,(await p.textContent('#oc-count'))==='Card 1 of '+M,JSON.stringify(await p.textContent('#oc-count')));
console.log('big Approve / Not now buttons',await p.isVisible('#oc-yes')&&await p.isVisible('#oc-no')&&/Not now/.test(await p.textContent('#oc-no')));
const sz=await p.evaluate(()=>{const c=document.querySelector('#pane-APPROVALS .apcard.oc-cur'),y=document.getElementById('oc-yes');return {f:Math.min(parseFloat(getComputedStyle(c).fontSize),parseFloat(getComputedStyle(c.querySelector('p')).fontSize)),h:parseFloat(getComputedStyle(c.querySelector('h3')).fontSize),bh:y.getBoundingClientRect().height,bf:parseFloat(getComputedStyle(y).fontSize)}});
console.log('big text (card >=20px, title >=28px, buttons >=64px tall)',sz.f>=20&&sz.h>=28&&sz.bh>=64&&sz.bf>=22,JSON.stringify(sz));
console.log('small per-card Approve/Defer hidden (one decision on screen)',await p.evaluate(()=>[...document.querySelectorAll('#pane-APPROVALS .apcard .act.approve,#pane-APPROVALS .apcard .act.defer')].every(e=>e.offsetParent===null)));
console.log('back disabled on first card',await p.isDisabled('#oc-back'));
// money lock on the shown card
const shown=await p.evaluate(()=>document.querySelector('#pane-APPROVALS .apcard.oc-cur').innerText);
console.log('locked: no dollar amount visible on the big card',!/\$\s?\d/.test(shown)&&/🔒\$/.test(shown),JSON.stringify(shown.slice(0,80)));
// waiting clock
console.log('waiting clock on the big card',await p.evaluate(()=>{const c=document.querySelector('#pane-APPROVALS .apcard.oc-cur .wclock');return !!c&&c.offsetParent!==null&&/waiting/i.test(c.textContent)&&c.classList.contains('over')}));
// read this card while locked
await p.evaluate(()=>{window.__spoken=[]});await p.click('#oc-read');await p.waitForTimeout(100);
const s1=await p.evaluate(()=>window.__spoken.slice());
console.log('read this card: locked, no $ spoken',s1.length===1&&/^Send Medley invoice/.test(s1[0])&&!s1[0].includes('$')&&/amount locked/.test(s1[0]),JSON.stringify(s1[0]));
// arrows + next/back
await p.keyboard.press('ArrowRight');await p.waitForTimeout(100);
console.log('right arrow -> card 2',(await p.textContent('#oc-count'))==='Card 2 of '+M&&(await vis()).length===1);
await p.click('#oc-next');await p.waitForTimeout(100);
console.log('Next -> card 3',(await p.textContent('#oc-count'))==='Card 3 of '+M);
await p.keyboard.press('ArrowLeft');await p.waitForTimeout(100);
console.log('left arrow -> card 2',(await p.textContent('#oc-count'))==='Card 2 of '+M);
await p.click('#oc-back');await p.waitForTimeout(100);
console.log('Back -> card 1',(await p.textContent('#oc-count'))==='Card 1 of '+M);
// arrows ignored while typing in a comment box
await p.evaluate(()=>{const t=document.createElement('textarea');t.id='tmpta';document.getElementById('pane-APPROVALS').appendChild(t)});await p.focus('#tmpta');await p.keyboard.press('ArrowRight');await p.waitForTimeout(100);
console.log('arrows ignored while typing',(await p.textContent('#oc-count'))==='Card 1 of '+M);await p.evaluate(()=>document.getElementById('tmpta').remove());
// decide
await p.click('#oc-yes');await p.waitForTimeout(150);
console.log('Approve saves card 1 and moves to card 2',/approved/.test(await p.textContent('#pill-money-test'))&&(await p.textContent('#oc-count'))==='Card 2 of '+M&&/Approved saved/.test(await p.textContent('#oc-msg')));
console.log('approved card clock shows done',await p.evaluate(()=>document.getElementById('wclock-money-test').classList.contains('done')));
const id2=(await vis())[0];await p.click('#oc-no');await p.waitForTimeout(150);
console.log('Not now defers card 2 and moves to card 3',/deferred/.test(await p.textContent('#pill-'+id2))&&(await p.textContent('#oc-count'))==='Card 3 of '+M);
// last card
for(let i=0;i<M;i++)await p.keyboard.press('ArrowRight');await p.waitForTimeout(100);
console.log('stops at last card, Next disabled',(await p.textContent('#oc-count'))==='Card '+M+' of '+M&&await p.isDisabled('#oc-next'));
// Read all moves the big card along with the voice
await p.evaluate(()=>{window.__spoken=[]});await p.click('#ra-all');await p.waitForTimeout(150);
console.log('read all speaks every card, big card follows',await p.evaluate(n=>window.__spoken.length===n,M)&&(await vis()).length===1,await p.textContent('#oc-count'));
// hover tips
const tips=await p.evaluate(()=>['#oc-toggle','#oc-yes','#oc-no','#oc-back','#oc-next','#oc-read'].map(s=>(document.querySelector(s).dataset.tip||'').length>10));
console.log('hover tips on all one-card buttons',tips.every(Boolean),JSON.stringify(tips));
await p.evaluate(()=>VTES.ocGo(-99));await p.waitForTimeout(100);
await p.hover('#oc-toggle');await p.waitForTimeout(500);console.log('toggle hover tip shows',/One card at a time/.test(await p.textContent('#tipbox')),JSON.stringify(await p.textContent('#tipbox')));
await p.screenshot({path:process.argv[3]});
// 0000 opens the amount on the big card
await p.click('#mzbtn');await p.fill('#mzpin','0000');await p.click('#mzform button[type=submit]');await p.waitForTimeout(250);
console.log('open after 0000: amount visible on big card',/\$8,000/.test(await p.evaluate(()=>document.querySelector('#pane-APPROVALS .apcard.oc-cur').innerText)));
await p.click('#mzbtn');await p.waitForTimeout(200);
console.log('relocked: hidden again',!/\$8,000/.test(await p.evaluate(()=>document.querySelector('#pane-APPROVALS .apcard.oc-cur').innerText)));
// remembered after reload
console.log('saved in localStorage',await p.evaluate(()=>localStorage.getItem('vtes-onecard'))==='1');
await p.reload();await p.waitForTimeout(800);await p.evaluate(()=>VTES.show('APPROVALS'));await p.waitForTimeout(300);
console.log('remembered after reload',(await vis()).length===1&&await p.isVisible('#oc-nav'));
await p.click('#oc-toggle');await p.waitForTimeout(150);
console.log('off again: all cards back',(await vis()).length===M&&!(await p.isVisible('#oc-nav'))&&await p.evaluate(()=>localStorage.getItem('vtes-onecard'))==='0');
// arrows do nothing when mode is off / on another tab
await p.evaluate(()=>{VTES.oneCard(true);VTES.show('TODAY')});await p.keyboard.press('ArrowRight');
console.log('arrows ignored on other tabs',await p.evaluate(()=>VTES.ocState().i===0));await p.evaluate(()=>VTES.oneCard(false));
// storage blocked: page still works
const p2=await ctx.newPage();const e2=[];p2.on('pageerror',e=>e2.push(e.message));
await p2.addInitScript(()=>{Object.defineProperty(window,'localStorage',{configurable:true,get(){throw new Error('blocked')}})});
await p2.goto('file://'+tmp);await p2.waitForTimeout(800);await p2.evaluate(()=>VTES.show('APPROVALS'));await p2.click('#oc-toggle');await p2.waitForTimeout(150);
console.log('works with storage blocked',await p2.evaluate(()=>[...document.querySelectorAll('#pane-APPROVALS .apcard')].filter(c=>c.offsetParent!==null).length===1),'errs',e2.length);
console.log('BUILD flipped',fs.readFileSync(process.argv[2],'utf8').includes("['One card at a time mode',1]"));
fs.unlinkSync(tmp);console.log('ERRS',errs);await b.close()})();
