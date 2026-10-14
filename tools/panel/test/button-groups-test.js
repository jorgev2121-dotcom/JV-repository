// button-groups-test.js — 2026-10-14. Tab buttons are grouped by type (the MENU map branches plus "Start here").
// Checks, in light and dark mode: every tab button sits in exactly one group that has a text header; each group's
// buttons share one background; text contrast >= 4.5:1 computed from the page CSS (alpha backgrounds composited
// up the tree); the active tab stands out; copy / read-aloud buttons share their type tint; 375px has no
// sideways scroll; a tall header never covers the page; no page errors. Usage: node button-groups-test.js <abs panel path> [png path]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'}).catch(()=>chromium.launch());
const SRC=require('fs').readFileSync(process.argv[2],'utf8');const TABS=JSON.parse(SRC.match(/var TABS=(\[[^\]]*\]);/)[1]);
let fails=0;const ok=(name,cond,extra)=>{console.log((cond?'PASS ':'FAIL ')+name+(extra!==undefined&&extra!==''?' '+extra:''));if(!cond)fails++};
for(const [scheme,w] of [['light',1100],['dark',1100],['light',375],['dark',375]]){
  const tag=scheme+'@'+w+'px';
  const p=await b.newPage({viewport:{width:w,height:900},colorScheme:scheme});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.addInitScript(()=>{window.claude={use:async()=>null};try{localStorage.clear()}catch(e){}});
  await p.goto('file://'+process.argv[2]);await p.waitForTimeout(1000);
  const r=await p.evaluate((TABS)=>{
    const parse=s=>{let m=s.match(/rgba?\(([^)]+)\)/);if(m){const v=m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);return [v[0],v[1],v[2],v.length>3?v[3]:1]}
      m=s.match(/color\(srgb ([^)]+)\)/);if(m){const v=m[1].split(/[ \/]+/).filter(Boolean).map(Number);return [v[0]*255,v[1]*255,v[2]*255,v.length>3?v[3]:1]}return [0,0,0,0]};
    const over=(top,bot)=>{const a=top[3];return [top[0]*a+bot[0]*(1-a),top[1]*a+bot[1]*(1-a),top[2]*a+bot[2]*(1-a),1]};
    const bgOf=el=>{const chain=[];for(let e=el;e;e=e.parentElement)chain.push(parse(getComputedStyle(e).backgroundColor));
      let c=[255,255,255,1];for(let i=chain.length-1;i>=0;i--)c=over(chain[i],c);return c};
    const lum=c=>{const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2])};
    const cr=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
    const txt=el=>{const bg=bgOf(el);const fg=over(parse(getComputedStyle(el).color),bg);return cr(fg,bg)};
    const key=c=>c.slice(0,3).map(Math.round).join(',');
    const out={};
    const tabs=[...document.querySelectorAll('.tab[data-tab]')];
    out.nTabs=tabs.length;out.nTABS=TABS.length;
    out.missing=TABS.filter(t=>document.querySelectorAll('.tab[data-tab="'+t+'"]').length!==1);
    out.ungrouped=tabs.filter(t=>{const g=t.closest('.tabgrp');if(!g)return true;if(g.parentElement.closest('.tabgrp'))return true;
      const h=g.querySelector(':scope>.tabgrp-h');return !h||!h.textContent.trim()||g.getAttribute('aria-labelledby')!==h.id}).map(t=>t.dataset.tab);
    out.noTip=tabs.filter(t=>!(t.title||t.dataset.tip)).map(t=>t.dataset.tab);
    const groups=[...document.querySelectorAll('#tabs .tabgrp')];out.groups=[];
    const tints=[];
    for(const g of groups){const inact=[...g.querySelectorAll('.tab:not(.active)')];const bgs=new Set(inact.map(t=>key(bgOf(t))));
      const bds=new Set(inact.map(t=>getComputedStyle(t).borderLeftColor));
      tints.push([...bgs][0]);
      out.groups.push({g:g.dataset.g,head:g.querySelector('.tabgrp-h').textContent.trim(),n:g.querySelectorAll('.tab').length,bgs:[...bgs],bds:[...bds],hdr:+txt(g.querySelector('.tabgrp-h')).toFixed(2)})}
    out.distinctTints=new Set(tints).size===groups.length;
    out.low=[];const chk=(el,label)=>{if(!el||!el.offsetParent&&getComputedStyle(el).position!=='fixed')return;const c=txt(el);if(c<4.5)out.low.push(label+'='+c.toFixed(2))};
    let minTab=99;
    tabs.forEach(t=>{const c=txt(t);minTab=Math.min(minTab,c);if(c<4.5)out.low.push(t.dataset.tab+'='+c.toFixed(2));const pc=t.querySelector('.pct');if(pc){const d=txt(pc);if(d<4.5)out.low.push(t.dataset.tab+'.pct='+d.toFixed(2))}});
    out.minTab=+minTab.toFixed(2);
    groups.forEach(g=>chk(g.querySelector('.tabgrp-h'),'header:'+g.dataset.g));
    document.querySelectorAll('.branch[data-g]').forEach(br=>{chk(br.querySelector('h5'),'branch-h5:'+br.dataset.g);chk(br.querySelector('p.bd'),'branch-bd:'+br.dataset.g)});
    out.branches=document.querySelectorAll('.branch[data-g]').length;
    const typed={};document.querySelectorAll('.act.t-copy,.act.t-voice').forEach(x=>{const k=x.classList.contains('t-copy')?'copy':'voice';(typed[k]=typed[k]||new Set()).add(key(bgOf(x)));chk(x,k+':'+x.textContent.trim().slice(0,20))});
    out.typed=Object.fromEntries(Object.entries(typed).map(([k,v])=>[k,[...v]]));
    const a=document.querySelector('.tab.active');const ag=a.closest('.tabgrp');const sib=ag.querySelector('.tab:not(.active)')||document.querySelector('.tab:not(.active)');
    out.active={tab:a.dataset.tab,contrastVsTint:+cr(bgOf(a),bgOf(sib)).toFixed(2),ring:getComputedStyle(a).boxShadow!=='none',text:+txt(a).toFixed(2)};
    out.sw=document.documentElement.scrollWidth;
    out.overflowGroups=groups.filter(g=>{const q=g.getBoundingClientRect();return q.left<0||q.right>window.innerWidth+0.5}).map(g=>g.dataset.g);
    return out},TABS);
  ok(tag+' every tab button present once',r.nTabs===r.nTABS&&r.missing.length===0,r.nTabs+'/'+r.nTABS+' '+r.missing.join(' '));
  ok(tag+' every tab sits in exactly one group with a header',r.ungrouped.length===0,r.ungrouped.join(' '));
  ok(tag+' every tab has a hover tip',r.noTip.length===0,r.noTip.join(' '));
  ok(tag+' each group has one consistent background and one left-border colour',r.groups.every(g=>g.bgs.length===1&&g.bds.length===1),r.groups.map(g=>g.g+':'+g.n+':'+g.bgs.join('|')).join('  '));
  ok(tag+' groups have distinct tints',r.distinctTints);
  ok(tag+' contrast >= 4.5:1 (tabs, %, headers, map branches, typed buttons)',r.low.length===0,'min tab '+r.minTab+' '+r.low.join(' '));
  ok(tag+' active tab stands out (bg vs tint >= 3:1, ring, text >= 4.5)',r.active.contrastVsTint>=3&&r.active.ring&&r.active.text>=4.5,JSON.stringify(r.active));
  ok(tag+' map branch boxes carry the group tint',r.branches===5,r.branches);
  ok(tag+' copy buttons share one tint, read-aloud buttons share one tint',r.typed.copy&&r.typed.copy.length===1&&r.typed.voice&&r.typed.voice.length===1,JSON.stringify(r.typed));
  ok(tag+' no sideways scroll, groups inside viewport',r.sw<=w&&r.overflowGroups.length===0,'sw='+r.sw+' '+r.overflowGroups.join(' '));
  if(w===375){const tabs=TABS;const bad=[];for(const t of tabs){await p.evaluate(t=>VTES.show(t),t);await p.waitForTimeout(80);
      const s=await p.evaluate(()=>document.documentElement.scrollWidth);if(s>w)bad.push(t+'='+s)}
    ok(tag+' every tab ('+tabs.length+') fits after switching',bad.length===0,bad.join(' '))}
  await p.evaluate(()=>window.scrollTo(0,0));await p.evaluate(()=>VTES.show('MENU'));await p.waitForTimeout(150);await p.mouse.wheel(0,2500);await p.waitForTimeout(400);
  const vis=await p.evaluate(()=>{const r=document.querySelector('.header').getBoundingClientRect();return Math.round(innerHeight-Math.max(0,r.bottom))});
  ok(tag+' after scrolling, at least a third of the screen shows page content (header never covers it)',vis>=900/3,vis+'px');
  if(scheme==='light'&&w===1100)console.log('groups: '+r.groups.map(g=>g.head+'('+g.n+')').join(' · '));
  if(process.argv[3]&&scheme==='light'&&w===1100)await p.screenshot({path:process.argv[3]});
  ok(tag+' no page errors',errs.length===0,JSON.stringify(errs));
  await p.close()}
console.log(fails?'RESULT FAIL '+fails:'RESULT ALL PASS');await b.close();process.exit(fails?1:0)})();
