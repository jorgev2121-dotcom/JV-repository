# Unit-by-unit viewer for Units 423, 922, 321 (TRK-2026-1265): every document found, an ID on each, tick to pick, copy the picks for the email request.
import pymupdf,base64,html,re,glob,sys
SC=sys.argv[1]; W=SC+"w45/"
old=open(SC+"orange423.html").read(); style=re.search(r"<style>.*?</style>",old,re.S).group(0)
d2=re.search(r'<pre id="d2">(.*?)</pre>',old,re.S).group(1)
d1=re.search(r'<pre id="d1">(.*?)</pre>',old,re.S).group(1)
def b(pg,dpi=88): return base64.b64encode(pg.get_pixmap(dpi=dpi).tobytes("jpg",jpg_quality=72)).decode()
def pg(f,i=0): return pymupdf.open(f)[i]
def v5(u): return glob.glob(f"renewal-packet/*Application-RENEWAL-MARKED _ Unit-{u} *")[0]
def noc(u): return glob.glob(f"renewal-packet/*Notice-of-Commencement-RENEWAL _ Unit-{u} *")[0]
def cov(u,i): return pg(glob.glob(f"renewal-packet/COVER-SET_*Unit-{u}_*")[0],i)
rec=pymupdf.open(SC+"noc/recorded.pdf")
APP="Application"; 
U=[("423","BLC2024-0714","Sylvia Azoulay",[
  ("A",APP,pg(W+"423_v1.pdf"),"v1 · 9/2/2026","Owner name typed. Master Permit blank.","bad","Unsigned · Renewal NOT marked"),
  ("B",APP,pg(W+"423_v2.pdf"),"v2, v3, v4 (identical) · 9/2 to 9/3/2026","Master Permit filled. Owner print name blank.","bad","Unsigned · Renewal NOT marked"),
  ("C",APP,pg(v5("423")),"v5 · 10/15/2026","Renewal box has an X. Made today from v4.","warn","Renewal MARKED · unsigned"),
  ("D","Notice of Commencement",pg(noc("423")),"Renewal notice v1 · 10/15/2026","Permit number blank. Percent of common elements blank.","warn","Prepared · unsigned"),
  ("E","Cover set",cov("423",0),"Page 1 · contact sheet","Always the first page.","ok","Cover"),
  ("F","Cover set",cov("423",1),"Page 2 · scope of work and tasks","Always the second page.","ok","Cover")],
  "No owner-signed document of any kind was found in Drive for Unit 423."),
 ("922","BLC2024-0717","Daniel Raboh",[
  ("A",APP,pg(W+"922_x1.pdf"),"early v1 (regenerated) · 9/2/2026","Master Permit blank, longer work description.","bad","Unsigned · Renewal NOT marked"),
  ("B",APP,pg(W+"922_v1.pdf"),"v1 · 9/2/2026","Owner name typed. Master Permit blank.","bad","Unsigned · Renewal NOT marked"),
  ("C",APP,pg(W+"922_v4.pdf"),"v2, v3, v4 (identical) · 9/2 to 9/3/2026","Master Permit filled. Owner print name blank.","bad","Unsigned · Renewal NOT marked"),
  ("D",APP,pg(v5("922")),"v5 · 10/15/2026","Renewal box has an X. Made today from v4.","warn","Renewal MARKED · unsigned"),
  ("E","Notice of Commencement",pg(noc("922")),"Renewal notice v1 · 10/15/2026","Permit number blank. Percent of common elements blank.","warn","Prepared · unsigned"),
  ("F","Owner-executed 2024",rec[4],"Notice of Commencement recorded 6/12/2024 (old permit)","Signed by Daniel Raboh, notarized 2/28/2024. Expired one year after recording.","ok","Owner EXECUTED, 2024"),
  ("G","Cover set",cov("922",0),"Page 1 · contact sheet","Always the first page.","ok","Cover"),
  ("H","Cover set",cov("922",1),"Page 2 · scope of work and tasks","Always the second page.","ok","Cover")],
  "Your signed hard copy and the 9/9 email scans are not viewable from the cloud."),
 ("321","BLC2024-0707","Adenat Corporation (Ontario, Canada)",[
  ("A",APP,pg(W+"321_x1.pdf"),"early v1 (regenerated) · 9/2/2026","Master Permit blank, signer name typed.","bad","Unsigned · Renewal NOT marked"),
  ("B",APP,pg(W+"321_v1.pdf"),"v1 · 9/2/2026","Owner typed. Master Permit blank.","bad","Unsigned · Renewal NOT marked"),
  ("C",APP,pg(W+"321_v2.pdf"),"v2 and v3 (identical) · 9/2/2026","Master Permit filled.","bad","Unsigned · Renewal NOT marked"),
  ("D",APP,pg(W+"321_v4.pdf"),"v4 · 9/3/2026","Owner address line garbled.","bad","Unsigned · Renewal NOT marked · defect"),
  ("E",APP,pg(v5("321")),"v5 · 10/15/2026","Renewal box has an X. Same garbled address.","warn","Renewal MARKED · unsigned"),
  ("F","Notice of Commencement",pg(noc("321")),"Renewal notice v1 · 10/15/2026","Permit number blank. Percent filled (0.289290).","warn","Prepared · unsigned"),
  ("G","Owner-executed 2024",rec[0],"Notice of Commencement recorded 6/12/2024 (old permit)","Signed by Israel Schwartz for Adenat, notarized 2/12/2024. Expired one year after recording.","ok","Owner EXECUTED, 2024"),
  ("H","Cover set",cov("321",0),"Page 1 · contact sheet","Always the first page.","ok","Cover"),
  ("I","Cover set",cov("321",1),"Page 2 · scope of work and tasks","Always the second page.","ok","Cover")],
  "Your signed hard copy and the 9/9 email scans are not viewable from the cloud.")]
tree=""; total=0
for u,perm,owner,items,tail in U:
    kids=""
    for k,kind,page,t,note,cls,chip in items:
        total+=1; code=f"{u}-{k}"
        kids+=f'''<div class="item"><label class="pick"><input type="checkbox" class="sel" data-id="{code}" data-title="{html.escape(kind+' · '+t)}"> <span class="itl"><span class="code">{code}</span> {html.escape(kind)} · {html.escape(t)}</span></label>
<div class="pills"><span class="pill {cls}">{html.escape(chip)}</span></div><div class="note">{html.escape(note)}</div>
<details><summary>Open the page</summary><img class="pg" alt="{code}" src="data:image/jpeg;base64,{b(page)}"></details></div>'''
    kids+=f'<div class="item"><span class="itl">Not viewable from here</span><div class="note">{html.escape(tail)} The 9/6 reissue PDF is a saved error screen, not a form.</div></div>'
    tree+=f'<details class="branch" open><summary><b>Unit {u}</b> · permit {perm} · {html.escape(owner)} <span class="pill">{len(items)} pages</span></summary><div class="kids">{kids}</div></details>'
page=f'''<title>Renewal Packet Units 423 922 321</title>
<meta name="claude:viewport-fit-sides" content="cover">
{style}
<style>.pg{{max-width:760px}} #tog img{{max-width:760px}} .code{{font-family:ui-monospace,Menlo,Consolas,monospace;background:var(--chip);padding:0 6px}} .req{{background:var(--card);border:1px solid var(--line);border-left:5px solid var(--accent);padding:12px 16px}}</style>
<div class="wrap">
<header><div class="tag">TRK-2026-1265 · The Plaza of Bal Harbour · private page</div>
<h1>Renewal packet: Units 423, 922, 321</h1>
<p class="sub">Open a unit to see every document found for it, each with a code. Tick the ones you want, press View these together to read them in order, then Copy my picks and paste them to me. I build the email draft with those pages attached.</p></header>
<section class="verdict"><b>Read this first.</b> Nothing found is an executed renewal application. {total} pages are below. The signed 9/9 scans and your hard copies of 922 and 321 are not viewable from the cloud, so they are not here. Once they are scanned and saved, they become the best picks and get the next codes.</section>
<section class="req"><b>How to send:</b> tick pages, press <b>Copy my picks</b>, paste the codes to me in the chat. I attach them to a Gmail draft addressed to Hebert and Olga (the draft below). You open it, fill it out and send it yourself. Pages made from the Drive files are re-saved smaller so they fit in an email; the originals stay as they are. Dragging a page out of this window into an email will not carry a PDF.</section>
<div class="bar"><button id="vt">View these together</button><button class="alt" id="cp">Copy my picks</button><button class="alt" id="clr">Clear ticks</button><span class="msg" id="msg" role="status"></span></div>
<section id="tog" hidden><h2>Selected, top to bottom</h2><div id="together"></div></section>
{tree}
<section class="draft" style="background:var(--card);border:1px solid var(--line);padding:12px 14px"><h2>Email draft to the Village</h2><p class="note">Attach only the pages that are signed. If Unit 423 is not signed, delete its lines. No dollar amounts.</p><pre id="d2">{d2}</pre><button data-copy="d2">Copy Village draft</button></section>
</div>
<script>
var msg=document.getElementById("msg");
function say(t){{msg.textContent=t;setTimeout(function(){{msg.textContent=""}},3500)}}
function copyText(t,ok){{function fb(){{var a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();try{{document.execCommand("copy");say(ok)}}catch(e){{say("Select the text and copy it by hand")}}document.body.removeChild(a)}}
  if(navigator.clipboard&&navigator.clipboard.writeText){{navigator.clipboard.writeText(t).then(function(){{say(ok)}},fb)}}else fb()}}
function sel(){{return Array.prototype.slice.call(document.querySelectorAll(".sel:checked"))}}
document.getElementById("vt").onclick=function(){{var s=sel(),box=document.getElementById("together"),tog=document.getElementById("tog");box.innerHTML="";
  if(!s.length){{tog.hidden=true;say("Tick at least one page first");return}}
  s.forEach(function(c){{var d=document.createElement("div"),h=document.createElement("div");h.className="itl";h.textContent=c.getAttribute("data-id")+" · "+c.getAttribute("data-title");d.appendChild(h);d.appendChild(c.closest(".item").querySelector("img.pg").cloneNode(true));box.appendChild(d)}});
  tog.hidden=false;tog.scrollIntoView({{behavior:"smooth"}})}};
document.getElementById("cp").onclick=function(){{var s=sel();if(!s.length){{say("Tick at least one page first");return}}
  copyText("Attach these to the Hebert and Olga draft: "+s.map(function(c){{return c.getAttribute("data-id")}}).join(", "),"Copied "+s.length+" codes. Paste them to Claude.")}};
document.getElementById("clr").onclick=function(){{sel().forEach(function(c){{c.checked=false}});document.getElementById("tog").hidden=true}};
Array.prototype.forEach.call(document.querySelectorAll("[data-copy]"),function(b){{b.onclick=function(){{copyText(document.getElementById(b.getAttribute("data-copy")).textContent,"Copied")}}}});
</script>'''
open(SC+"unitviewer.html","w").write(page); print(total,"pages",len(page)/1e6,"MB")
