import pymupdf
DATE="2026-10-15"
UNITS=[("423","BLC2024-0714"),("922","BLC2024-0717"),("321","BLC2024-0707")]
def page(d,title,sub):
    p=d.new_page(width=612,height=792)
    p.insert_text((54,72),title,fontsize=20,fontname="hebo")
    p.insert_text((54,92),sub,fontsize=10,fontname="helv",color=(.35,.35,.35))
    p.draw_line((54,102),(558,102),width=1); return p
def foot(p,doc): p.insert_text((54,764),f"TRK-2026-1265 · v1 · {DATE} · CURRENT · {doc}",fontsize=8,fontname="helv",color=(.3,.3,.3))
def lines(p,x,y,ls,size=11,lead=15,bold_first=False):
    for i,t in enumerate(ls): p.insert_text((x,y+i*lead),t,fontsize=size,fontname="hebo" if (bold_first and i==0) else "helv")
    return y+len(ls)*lead
def table(p,y,doc,status):
    cols=[54,110,235,430]
    for x,h in zip(cols,["Unit","Original permit no.","Document","Status"]): p.insert_text((x,y),h,fontsize=10,fontname="hebo")
    p.draw_line((54,y+5),(558,y+5),width=.7)
    for i,(u,n) in enumerate(UNITS):
        yy=y+24+i*24
        for x,t in zip(cols,[f"#{u}",n,doc,status]): p.insert_text((x,yy),t,fontsize=11,fontname="helv")
        p.draw_line((54,yy+8),(558,yy+8),width=.3)
    return y+24+len(UNITS)*24+8
d=pymupdf.open(); p=page(d,"TRANSMITTAL","Renewal permit applications · The Plaza of Bal Harbour · 10185 Collins Avenue")
y=lines(p,54,130,["TO:  Village of Bal Harbour, Permit Intake Department","       Attention: Olga Kalogeropoulos and Hebert Martinez","       655 96th Street, Bal Harbour, FL 33154"])
y=lines(p,54,y+6,["FROM:  Jorge Valdes, Team USA Sales, Inc.","            13633 SW 142nd Terrace, Miami, FL 33186","            305-300-4500 · Jorge@TeamUSASales.com"])
y=lines(p,54,y+6,[f"DATE:  {DATE}","RE:  Renewal of expired permits, three units"])
y=table(p,y+22,"Renewal application","Executed original")
y=lines(p,54,y+16,["Enclosed are three (3) renewal permit applications, one for each unit above. Each is an original,","fully executed (signed by the owner, signed by the qualifier and notarized). Each lists its original","permit number so the Village can match it to the expired permit.","","Please process each as a RENEWAL of the original permit listed, and call or email me when the","renewal permit numbers are assigned or if anything else is needed."])
lines(p,54,y+14,["Received by (Village):  ______________________   Date: ____________   Time: ________"])
foot(p,"Transmittal to Village")
d.save(f"envelopes/TRANSMITTAL_Village-of-Bal-Harbour_Renewals-423-922-321_v1_{DATE}.pdf")
d=pymupdf.open(); p=page(d,"COURIER REQUEST","Pickup at the Village, delivery to Team USA Sales, Inc.")
y=lines(p,54,130,["PICK UP FROM:","Village of Bal Harbour, Permit Intake Department","Attention: Olga Kalogeropoulos or Hebert Martinez","655 96th Street, Bal Harbour, FL 33154","Phone: 305.993.7366"],bold_first=True)
y=lines(p,54,y+14,["DELIVER TO:","Jorge Valdes, Team USA Sales, Inc.","13633 SW 142nd Terrace, Miami, FL 33186","Phone: 305-300-4500"],bold_first=True)
y=lines(p,54,y+14,["PACKAGE:  1 envelope. Whatever the Village has ready for these renewals:"])
y=table(p,y+16,"Renewal permit papers","Pick up")
y=lines(p,54,y+14,["Pickup date: ____________   Pickup window: ____________   Signature required on delivery: YES","Courier / company: ______________________   Tracking no.: ______________________","","Please pick up whatever the Village has ready for Units #423, #922 and #321 (approved applications,","permit cards, receipts or notes) and deliver it to the address above. Hold nothing back at the Village."])
foot(p,"Courier request")
d.save(f"envelopes/COURIER-REQUEST_Village-to-Jorge-Valdes_Units-423-922-321_v1_{DATE}.pdf")
S="/tmp/claude-0/-home-user-JV-repository/6cf01967-6ccb-5506-8c1b-e9975b663611/scratchpad/"
pymupdf.open(f"envelopes/TRANSMITTAL_Village-of-Bal-Harbour_Renewals-423-922-321_v1_{DATE}.pdf")[0].get_pixmap(dpi=60,clip=pymupdf.Rect(0,250,612,420)).save(S+"t2.png")
