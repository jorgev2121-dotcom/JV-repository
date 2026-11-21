# Builds, for Units 423, 922, 321 (TRK-2026-1265): contact-sheet + scope-of-work cover set, pending task list, and a SAMPLE label sheet.
# Rule (Jorge 2026-10-15): every report starts with the contact sheet (page 1) and the scope of work (page 2). No money lines in these pages.
import pymupdf
DATE="2026-10-15"
GC=("MZ Solutions, LLC (general contractor and qualifier)","Miguel Zaldivar, CGC1528486","9770 SW 215 Lane, Cutler Bay, FL 33189","305-206-7413","miguel@mzsolutions.org")
ENG=("Tomas Hernandez Priento, P.E. (engineer, TomTech)","","1865 Brickell Ave #A1614, Miami, FL 33129","754-235-6217","TomTechEngineer@gmail.com")
VIL=[("Olga Kalogeropoulos, permit clerk","655 96th St, Bal Harbour, FL 33154","305.993.7366 / 305.866.4633","okalogeropoulos@balharbourfl.gov"),
     ("Hebert Martinez, building department","655 96th St, Bal Harbour, FL 33154","305.993.7472 / 305.865.7525","hmartinez@balharbourfl.gov"),
     ("Denilson Nunez, building department","655 96th St, Bal Harbour, FL 33154","","dnunez@balharbourfl.gov")]
U={"423":dict(p="BLC2024-0714",folio="12-2226-029-2900",owner="Sylvia Azoulay",oaddr="10185 Collins Ave #423, Bal Harbour, FL 33154",oc="No phone or email on file",
        work="Replace windows and doors with impact-rated product (as written on the 9/2 application: REPLACING WINDOWS - DOORS).",
        site="Install status not verified. No framing inspection on record that I could confirm.",exec="No executed copy found. Drafts only (GC signature still needed).",
        tasks=[("Renewal application executed by the GC (Miguel)","Miguel Zaldivar","OPEN - not found"),("Fee total and online payment link from the Village","Hebert Martinez","OPEN - to request"),("Miguel pays online by card","Miguel Zaldivar","WAITING on the link"),("Notice of Commencement signed (owner) and notarized","Owner, then notary","OPEN - prepared, permit no. blank"),("Originals to the Village (courier or U.S. Mail)","Jorge","OPEN"),("Renewal permit picked up or mailed back","Village to Jorge","WAITING")]),
   "922":dict(p="BLC2024-0717",folio="12-2226-029-2810",owner="Daniel Raboh",oaddr="10185 Collins Ave #922, Bal Harbour, FL 33154",oc="Lives on site. No phone or email on file",
        work="Change windows and doors to impact rated. Front door stays as existing.",
        site="Windows and doors installed. No framing inspection was ever called, so the work may have to be opened for one.",exec="Jorge holds a signed hard copy (not yet seen by the cloud). Signed scan is an attachment in the 9/9 email.",
        tasks=[("Renewal application executed (hard copy in Jorge's hand)","Jorge to scan","VERIFY - Renewal box marked?"),("Fee total and online payment link from the Village","Hebert Martinez","OPEN - to request"),("Miguel pays online by card","Miguel Zaldivar","WAITING on the link"),("Notice of Commencement signed (owner) and notarized","Owner, then notary","OPEN - prepared, permit no. blank"),("Originals to the Village (courier or U.S. Mail)","Jorge","OPEN"),("Renewal permit picked up or mailed back","Village to Jorge","WAITING"),("Framing inspection","MZ Solutions","OPEN after renewal")]),
   "321":dict(p="BLC2024-0707",folio="12-2226-029-2610",owner="Adenat Corporation (signer on 2024 notice: Israel Schwartz)",oaddr="3 Brewster Rd, Brampton/Brompton, Ontario L6T 5G9, Canada (spelling as on the recorded notice: BROMPTON)",oc="No phone or email on file",
        work="Replace existing windows and doors with impact-rated product.",
        site="Windows and doors installed. No framing inspection was ever called, so the work may have to be opened for one.",exec="Jorge holds a signed hard copy (not yet seen by the cloud). Signed scan is an attachment in the 9/9 email.",
        tasks=[("Renewal application executed (hard copy in Jorge's hand)","Jorge to scan","VERIFY - Renewal box marked?"),("Fix owner address line on the application (garbled)","Cloud","OPEN"),("Fee total and online payment link from the Village","Hebert Martinez","OPEN - to request"),("Miguel pays online by card","Miguel Zaldivar","WAITING on the link"),("Notice of Commencement signed (owner, Canada) and notarized","Owner, then notary","OPEN - prepared, permit no. blank"),("Originals to the Village (courier or U.S. Mail)","Jorge","OPEN"),("Renewal permit picked up or mailed back","Village to Jorge","WAITING"),("Framing inspection","MZ Solutions","OPEN after renewal")])}
def head(p,t,sub):
    p.insert_text((54,60),"TRK-2026-1265 · The Plaza of Bal Harbour · 10185 Collins Ave",fontsize=8.5,fontname="helv",color=(.4,.4,.4))
    p.insert_text((54,88),t,fontsize=20,fontname="hebo"); p.insert_text((54,106),sub,fontsize=10,fontname="helv",color=(.35,.35,.35)); p.draw_line((54,114),(558,114),width=1)
def L(p,x,y,ls,size=10.5,lead=14.5,bold0=False):
    for i,t in enumerate(ls): p.insert_text((x,y+i*lead),t,fontsize=size,fontname="hebo" if (bold0 and i==0) else "helv")
    return y+len(ls)*lead
def foot(p,doc): p.insert_text((54,764),f"TRK-2026-1265 · v1 · {DATE} · CURRENT · {doc}",fontsize=8,fontname="helv",color=(.3,.3,.3))
for u,v in U.items():
    d=pymupdf.open()
    p=d.new_page(width=612,height=792); head(p,f"CONTACT SHEET · Unit {u}",f"Permit {v['p']} · Folio {v['folio']} · renewal")
    y=L(p,54,138,["OWNER OF RECORD",v["owner"],v["oaddr"],v["oc"]],bold0=True)
    y=L(p,54,y+8,["GENERAL CONTRACTOR AND QUALIFIER (signs the renewal)",GC[0],GC[1],GC[2],f"{GC[3]}   ·   {GC[4]}"],bold0=True)
    y=L(p,54,y+8,["ENGINEER",ENG[0],ENG[2],f"{ENG[3]}   ·   {ENG[4]}"],bold0=True)
    y=L(p,54,y+8,["OWNER'S AGENT","Jorge Valdes, Team USA Sales, Inc.","13633 SW 142nd Terrace, Miami, FL 33186","305-300-4500   ·   Jorge@TeamUsaSales.com"],bold0=True)
    y=L(p,54,y+8,["WINDOW INSTALLER","Juan Carlos Martinez, Impact Window Services","impactwindowservices@gmail.com"],bold0=True)
    y=L(p,54,y+8,["VILLAGE OF BAL HARBOUR, BUILDING DEPARTMENT / PERMIT INTAKE"],bold0=True)
    for n,a,ph,em in VIL: y=L(p,54,y+2,[f"{n}",f"    {a}   {ph}   {em}".replace("   ","  ").strip() if ph else f"    {a}   {em}"],size=9.5,lead=12.5)
    y=L(p,54,y+8,["COURIER","Baron Delivery on Demand, orders@barondelivers.com, 305-688-0074 (open 24/7).","Bill to Team USA Sales, Inc., c/o Jorge Valdes."],size=9.5,lead=12.5,bold0=True)
    foot(p,f"Contact sheet Unit {u}")
    p=d.new_page(width=612,height=792); head(p,f"SCOPE OF WORK · Unit {u}",f"Permit {v['p']} · renewal of an expired permit")
    y=L(p,54,138,["WORK","Replace existing windows and doors with impact-rated product.",v["work"]],bold0=True)
    y=L(p,54,y+10,["SITE STATUS",v["site"]],bold0=True)
    y=L(p,54,y+10,["EXECUTION STATUS OF THE RENEWAL APPLICATION",v["exec"],"Rule (Jorge, 10/15): a renewal needs the GC's signature only.","The Notice of Commencement still has an owner signature line."],bold0=True)
    y=L(p,54,y+10,["PENDING TASKS"],bold0=True); y+=4
    for t,w,s in v["tasks"]:
        p.insert_text((54,y),"[  ]",fontsize=10,fontname="helv"); p.insert_text((84,y),t,fontsize=10,fontname="helv"); y+=12.5
        p.insert_text((84,y),f"Who: {w}   ·   Status: {s}",fontsize=8.5,fontname="helv",color=(.35,.35,.35)); y+=17
    foot(p,f"Scope of work Unit {u}")
    d.save(f"renewal-packet/COVER-SET_contact-sheet-and-scope_Unit-{u}_{v['p']}_v1_{DATE}.pdf")
# ---- sample label sheet: tab labels 2.5 x 0.5 in, 2 columns x 18 rows (36 per Letter sheet), 3 copies per unit, plus title blocks 4 per Letter sheet
d=pymupdf.open(); p=d.new_page(width=612,height=792)
p.insert_text((72,30),"SAMPLE tab labels · 2.5 x 0.5 in · 36 per sheet · print at 100%, cut on the dotted lines",fontsize=7.5,fontname="helv",color=(.5,.1,.1))
W,H=180,36; X=[72,270]; Y0=44; k=0
labels=[]
for u,v in U.items():
    for _ in range(3): labels.append((f"PLAZA {u} · {v['p']}","TRK-2026-1265 · RENEWAL · originals waiting"))
for r in range(18):
    for c in range(2):
        x=X[c]; y=Y0+r*H
        p.draw_rect(pymupdf.Rect(x,y,x+W,y+H),color=(.6,.6,.6),width=.4,dashes="[2 2] 0")
        if k<len(labels):
            a,b=labels[k]; p.insert_text((x+6,y+14),a,fontsize=10.5,fontname="hebo"); p.insert_text((x+6,y+27),b,fontsize=6.8,fontname="helv")
        k+=1
p=d.new_page(width=612,height=792)
p.insert_text((36,22),"SAMPLE title blocks · 4.0 x 5.0 in (fits printer margins) · 4 per Letter sheet · cut on the dotted lines",fontsize=7.5,fontname="helv",color=(.5,.1,.1))
pos=[(18,36),(306,36),(18,396),(306,396)]
for i,(x,y) in enumerate(pos):
    p.draw_rect(pymupdf.Rect(x,y,x+288,y+360),color=(.6,.6,.6),width=.4,dashes="[2 2] 0")
    if i<3:
        u=list(U)[i]; v=U[u]
        p.insert_text((x+12,y+34),f"UNIT {u}",fontsize=26,fontname="hebo")
        yy=L(p,x+12,y+60,["The Plaza of Bal Harbour","10185 Collins Ave, Bal Harbour FL 33154",f"Permit {v['p']} (expired, renewing)",f"Folio {v['folio']}",f"Owner: {v['owner'].split(' (')[0]}","GC: MZ Solutions, LLC (Miguel Zaldivar)","TRK-2026-1265"],size=10,lead=15)
        yy=L(p,x+12,yy+10,["FOLDER: RED LEGAL (originals waiting on action)","Contents: renewal application, notice of","commencement, owner-signed pages, receipts"],size=8.5,lead=12)
        p.insert_text((x+12,y+350),f"TRK-2026-1265 · v1 · {DATE} · CURRENT · sample",fontsize=6.5,fontname="helv",color=(.4,.4,.4))
d.save(f"renewal-packet/SAMPLE_labels-and-title-blocks_Units-423-922-321_v1_{DATE}.pdf")
# ---- pending task list (text)
md=["# Pending task list · Plaza renewals, Units 423, 922, 321 · TRK-2026-1265 · "+DATE,"","Rule: a renewal application needs the GC's signature only (Jorge 2026-10-15). No money amounts on this list.",""]
for u,v in U.items():
    md+= [f"## Unit {u} · {v['p']}",""]+[f"1. ☐ {t} — who: {w} — status: {s}" if False else f"- ☐ {t} · who: {w} · status: {s}" for t,w,s in v["tasks"]]+[""]
md+=["Will you tell me whether the Renewal box is marked on your signed copies of 922 and 321?"]
open(f"renewal-packet/PENDING-TASK-LIST_Units-423-922-321_{DATE}.md","w").write("\n".join(md))
S="/tmp/claude-0/-home-user-JV-repository/6cf01967-6ccb-5506-8c1b-e9975b663611/scratchpad/"
pymupdf.open(f"renewal-packet/COVER-SET_contact-sheet-and-scope_Unit-922_BLC2024-0717_v1_{DATE}.pdf")[0].get_pixmap(dpi=75).save(S+"cs1.png")
pymupdf.open(f"renewal-packet/COVER-SET_contact-sheet-and-scope_Unit-922_BLC2024-0717_v1_{DATE}.pdf")[1].get_pixmap(dpi=75).save(S+"cs2.png")
pymupdf.open(f"renewal-packet/SAMPLE_labels-and-title-blocks_Units-423-922-321_v1_{DATE}.pdf")[0].get_pixmap(dpi=60).save(S+"lab1.png")
pymupdf.open(f"renewal-packet/SAMPLE_labels-and-title-blocks_Units-423-922-321_v1_{DATE}.pdf")[1].get_pixmap(dpi=60).save(S+"lab2.png")
