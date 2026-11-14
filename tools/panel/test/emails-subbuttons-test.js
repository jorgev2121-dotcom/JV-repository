// emails-subbuttons-test.js — 2026-10-14. SPEC_EMAILS-SUBBUTTONS: "📧 Emails" opens a bar of big sub-buttons under the
// header, one labelled row per mailbox (Gmail, Outlook (work)), one pale tint for all, icon + plain word + hover tip.
// New: Emails needing a reply, From the city, Outlook unread. "View as": Buttons (default) · Compact list · Big cards,
// remembered per browser. Minimize / maximize / close still work. 375/390px no sideways scroll, light + dark contrast,
// money lock untouched, the search still finds the email buttons. Usage: node emails-subbuttons-test.js <abs panel path> [png prefix]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const PANEL=process.argv[2],PNG=process.argv[3]||'';
let fails=0;const ok=(name,cond,extra)=>{console.log((cond?'PASS ':'FAIL ')+name+(extra!==undefined&&extra!==''?' '+extra:''));if(!cond)fails++};
const CONTRAST=()=>{const parse=s=>{let m=s.match(/rgba?\(([^)]+)\)/);if(m){const v=m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);return [v[0],v[1],v[2],v.length>3?v[3]:1]}return [0,0,0,0]};
  const over=(t,b)=>{const a=t[3];return [t[0]*a+b[0]*(1-a),t[1]*a+b[1]*(1-a),t[2]*a+b[2]*(1-a),1]};
  const bgOf=el=>{const ch=[];for(let e=el;e;e=e.parentElement)ch.push(parse(getComputedStyle(e).backgroundColor));let c=[255,255,255,1];for(let i=ch.length-1;i>=0;i--)c=over(ch[i],c);return c};
  const lum=c=>{const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2])};
  return [...document.querySelectorAll('.mailpop a.mbtn')].map(a=>{const w=a.querySelector('.mw')||a,bg=bgOf(a),fg=over(parse(getComputedStyle(w).color),bg),x=lum(fg),y=lum(bg);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)})};
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const ctx=await b.newContext({viewport:{width:1100,height:900}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.addInitScript(()=>{window.claude={use:async()=>null};if(!sessionStorage.getItem('__i')){sessionStorage.setItem('__i','1');try{localStorage.clear()}catch(e){}}});
await p.goto('file://'+PANEL);await p.waitForTimeout(1000);
const isOpen=()=>p.$eval('details.mailmenu',d=>d.open);
await p.click('.mailmenu summary');await p.waitForTimeout(250);
const s=await p.evaluate(()=>{const pop=document.querySelector('.mailpop'),sm=document.querySelector('.mailmenu summary').getBoundingClientRect(),r=pop.getBoundingClientRect();
  const rows=[...pop.querySelectorAll('.mrow')].map(x=>({box:x.dataset.box,h:x.querySelector('.mh').textContent,n:x.querySelectorAll('a.mbtn').length}));
  const A=[...pop.querySelectorAll('a.mbtn')];const bgs=[...new Set(A.map(a=>getComputedStyle(a).backgroundColor))];
  return {open:document.querySelector('details.mailmenu').open,view:['v-buttons','v-list','v-cards'].filter(c=>pop.classList.contains(c)),pressed:(pop.querySelector('.mv[aria-pressed="true"]')||{}).dataset.v,
   below:r.top>=sm.bottom-1,rows,bgs,tint:A.every(a=>a.classList.contains('t-mail')),big:A.every(a=>a.getBoundingClientRect().height>=44),iconWord:A.every(a=>a.querySelector('.mi')&&a.querySelector('.mw')&&a.querySelector('.mw').textContent.trim()),
   tips:A.every(a=>/^Opens /.test(a.dataset.tip||'')),newTab:A.every(a=>a.target==='_blank'&&/noopener/.test(a.rel)),
   links:A.map(a=>({w:a.querySelector('.mw').textContent,h:a.href})),ctlTips:[...pop.querySelectorAll('button')].every(x=>(x.dataset.tip||'').trim())}});
ok('clicking Emails opens the bar, in Buttons view by default',s.open&&s.view.join()==='v-buttons'&&s.pressed==='buttons',s.view.join());
ok('the bar opens just under the header row (not a tiny pop-up list)',s.below);
ok('one labelled row per mailbox: "Gmail" and "Outlook (work)"',s.rows.length===2&&/^Gmail/.test(s.rows[0].h)&&/^Outlook \(work\)/.test(s.rows[1].h),s.rows.map(r=>r.h+' ('+r.n+')').join(' | '));
ok('all email buttons share one pale tint',s.tint&&s.bgs.length===1,s.bgs.join(' '));
ok('every sub-button is big (>=44px tall) with an icon and a plain word',s.big&&s.iconWord);
ok('every sub-button has a hover tip saying what it opens',s.tips);
ok('every button in the bar has a hover tip (view switch, minimize, maximize, close)',s.ctlTips);
ok('links open in a new tab; nothing on the bar sends anything',s.newTab&&!s.links.some(l=>/^mailto:|send/i.test(l.h)));
const L=s.links,has=(w,re)=>L.some(l=>l.w===w&&re.test(decodeURIComponent(l.h).replace(/\+/g,' ')));
ok('old 7 links kept (Gmail Inbox/Unread/Sent/TRK, Outlook Inbox/Sent/Drafts)',has('Inbox',/#inbox$/)&&has('Unread',/is:unread$/)&&has('Sent',/#sent$/)&&has('Emails with a TRK number',/TRK-2026/)&&has('Inbox',/outlook\.office\.com\/mail\/\?login_hint/)&&has('Sent',/sentitems/)&&has('Drafts',/drafts/));
ok('new: "Emails needing a reply" = is:unread in:inbox -category:promotions',has('Emails needing a reply',/is:unread in:inbox -category:promotions$/));
ok('new: "From the city" = Bal Harbour, Miami-Dade, Pembroke Pines, Medley',has('From the city',/from:\(balharbourfl\.gov OR miamidade\.gov OR ppines\.com OR townofmedley\.com\)/));
ok('new: "Outlook unread" in the Outlook row',s.rows[1].n>=4&&L.some(l=>l.w==='Outlook unread'&&/outlook\.office\.com/.test(l.h)));
if(PNG)await p.screenshot({path:PNG+'-buttons-1100.png'});
// views
const view=async v=>{await p.click('.mailview .mv[data-v="'+v+'"]');await p.waitForTimeout(150);return p.evaluate(()=>{const pop=document.querySelector('.mailpop'),a=pop.querySelector('a.mbtn');return {cls:['v-buttons','v-list','v-cards'].filter(c=>pop.classList.contains(c)).join(),disp:getComputedStyle(a).display,h:Math.round(a.getBoundingClientRect().height),md:getComputedStyle(a.querySelector('.md')).display,open:document.querySelector('details.mailmenu').open,pressed:pop.querySelector('.mv[aria-pressed="true"]').dataset.v}})};
const vl=await view('list');ok('View as Compact list: today\'s short list look',vl.cls==='v-list'&&vl.disp==='block'&&vl.md==='none'&&vl.open&&vl.pressed==='list',JSON.stringify(vl));
const vc=await view('cards');ok('View as Big cards: big cards with a help line',vc.cls==='v-cards'&&vc.h>=90&&vc.md==='block'&&vc.open,JSON.stringify(vc));
if(PNG)await p.screenshot({path:PNG+'-cards-1100.png'});
await p.reload();await p.waitForTimeout(900);
const rem=await p.evaluate(()=>{const pop=document.querySelector('.mailpop');return pop.classList.contains('v-cards')});ok('the view choice is remembered after a reload',rem);
await p.click('.mailmenu summary');await p.waitForTimeout(150);const vb=await view('buttons');ok('switch back to Buttons',vb.cls==='v-buttons'&&vb.h>=44,JSON.stringify(vb));
// window controls
await p.click('.mailbar button:nth-of-type(2)');const big=await p.$eval('.mailpop',e=>e.classList.contains('big'));ok('Maximize makes it big and keeps it open',big&&await isOpen());
await p.click('.mailbar button:nth-of-type(2)');ok('Maximize again shrinks it',!(await p.$eval('.mailpop',e=>e.classList.contains('big'))));
await p.click('.mailbar button:nth-of-type(1)');ok('Minimize folds it away',!(await isOpen()));
await p.click('.mailmenu summary');await p.click('.mailbar button.x');ok('Close closes it',!(await isOpen()));
await p.click('.mailmenu summary');await p.keyboard.press('Escape');ok('Esc closes it',!(await isOpen()));
await p.click('.mailmenu summary');await p.mouse.click(1050,880);ok('a click outside closes it',!(await isOpen()));
// search still finds the buttons
const sr=await p.evaluate(()=>{const q=document.getElementById('q');const f=w=>{q.value=w;q.dispatchEvent(new Event('input'));return document.getElementById('searchpane').innerText};const a=f('Outlook unread'),c=f('From the city');q.value='';q.dispatchEvent(new Event('input'));return {a:/Outlook \(work\)[^\n]*Outlook unread/.test(a),c:/Gmail[^\n]*From the city/.test(c)}});
ok('search finds the new email buttons with their mailbox name',sr.a&&sr.c,JSON.stringify(sr));
// money lock untouched
const mz=await p.evaluate(()=>({btn:!!document.getElementById('mzbtn'),vis:(document.body.innerText.match(/\$\s?\d/g)||[]).length}));ok('money lock untouched: lock button present, no $ amounts visible',mz.btn&&mz.vis===0,JSON.stringify(mz));
// contrast light + dark
for(const scheme of ['light','dark']){const q=await b.newPage({viewport:{width:1100,height:900},colorScheme:scheme});await q.addInitScript(()=>{window.claude={use:async()=>null};try{localStorage.clear()}catch(e){}});await q.goto('file://'+PANEL);await q.waitForTimeout(700);
  await q.click('.mailmenu summary');await q.waitForTimeout(150);const cr=await q.evaluate(CONTRAST);ok(scheme+': email button text contrast >= 4.5:1',cr.every(x=>x>=4.5),'min '+Math.min(...cr).toFixed(2));await q.close()}
// phone widths
for(const w of [375,390]){const q=await b.newPage({viewport:{width:w,height:800}});const e2=[];q.on('pageerror',e=>e2.push(e.message));await q.addInitScript(()=>{window.claude={use:async()=>null};try{localStorage.clear()}catch(e){}});await q.goto('file://'+PANEL);await q.waitForTimeout(800);
  await q.click('.mailmenu summary');await q.waitForTimeout(150);const bad=[];
  for(const v of ['buttons','list','cards']){await q.evaluate(v=>VTES.mailView(v),v);for(const mx of [false,true]){if(mx)await q.click('.mailbar button:nth-of-type(2)');await q.waitForTimeout(120);
    const r=await q.evaluate(()=>{const p=document.querySelector('.mailpop').getBoundingClientRect();return {sw:document.documentElement.scrollWidth,l:Math.round(p.left),r:Math.round(p.right),inner:[...document.querySelectorAll('.mailpop a.mbtn')].every(a=>{const x=a.getBoundingClientRect();return x.left>=p.left-1&&x.right<=p.right+1})}});
    if(r.sw>w||r.l<0||r.r>w||!r.inner)bad.push(v+(mx?'+max':'')+'='+JSON.stringify(r));if(mx)await q.click('.mailbar button:nth-of-type(2)')}}
  ok(w+'px: no sideways scroll in all 3 views, normal and maximized',bad.length===0,bad.join(' '));
  if(PNG&&w===375){await q.evaluate(()=>VTES.mailView('buttons'));await q.waitForTimeout(100);await q.screenshot({path:PNG+'-buttons-375.png'});await q.evaluate(()=>VTES.mailView('cards'));await q.waitForTimeout(100);await q.screenshot({path:PNG+'-cards-375.png'})}
  errs.push(...e2);await q.close()}
ok('no page errors',errs.length===0,errs.slice(0,3).join(' | '));
console.log(fails?'RESULT: '+fails+' FAILED':'RESULT: ALL PASS');await b.close();process.exit(fails?1:0)})();
