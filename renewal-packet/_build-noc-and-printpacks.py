# Builds the renewal NOCs and 3-copy print packs for Units 423, 922, 321 (TRK-2026-1265). Run: python3 -I this.py <scratch dir with noc/blank.pdf, noc/recorded.pdf>
import pymupdf,sys,glob
S=sys.argv[1]; DATE="2026-10-15"; K=0.72
U={ "423":dict(p="BLC2024-0714",folio="12-2226-029-2900",owner="SYLVIA AZOULAY 10185 COLLINS AVE #423 BAL HARBOUR FL 33154",
       legal2="THE PLAZA OF BAL HARBOUR CONDO UNIT 423 UNDIV ________% INT IN COMMON ELEMENTS OFF REC 12490-2354"),
    "922":dict(p="BLC2024-0717",folio="12-2226-029-2810",owner="DANIEL RABOH 10185 COLLINS AVE BAL HARBOUR FL 33154",
       legal2="THE PLAZA OF BAL HARBOUR CONDO UNIT 922 UNDIV ________% INT IN COMMON ELEMENTS OFF REC 12490-2354"),
    "321":dict(p="BLC2024-0707",folio="12-2226-029-2610",owner="ADENAT CORPORATION 3 BREWSTER RD BROMPTON ONTARIO L6T 5G9, CANADA",
       legal2="THE PLAZA OF BAL HARBOUR CONDO UNIT 321 UNDIV 0.289290% INT IN COMMON ELEMENTS OFF REC 12490-2354 OR 20352-4751 0402 1 COC 23434-3597 05 2005 1")}
BLUE=(0.05,0.15,0.7)
def put(p,x,y,t,size=9.5): p.insert_text((x*K,y*K),t,fontsize=size,fontname="helv",color=BLUE)
for u,v in U.items():
    d=pymupdf.open(f"{S}/noc/blank.pdf"); d.select([0,3]); p=d[0]
    def at(x,y,t,size=9.2): p.insert_text((x,y),t,fontsize=size,fontname="helv",color=BLUE)   # coordinates in points
    at(260,63,v["folio"]); at(108,164,f"UNIT #{u}",11)
    at(253,221.5,f"10185 Collins Ave #{u} Bal Harbour FL 33154"); at(42,234,v["legal2"],6.6)
    at(170,245,"Replace existing windows and doors with impact rated product")
    at(173,268,v["owner"],8.2); at(132,280,"100"); at(224,291,"Same as owner")
    at(252,302.5,"MZ SOLUTIONS LLC 9770 SW 215 LANE CUTLER BAY FL 33189 305-206-7413",8.2)
    at(188,337,"N/A"); at(120,349,"N/A"); at(172,360,"N/A"); at(188,395,"N/A"); at(188,441,"N/A")
    at(260,465,"ONE YEAR FROM THE DATE OF RECORDING",9)
    p.insert_text((430*K,1085*K),f"TRK-2026-1265 · v1 · {DATE} · CURRENT · NOC Unit {u} (renewal; permit no. left blank until issued)",fontsize=5.8,fontname="helv",color=(.3,.3,.3))
    d.save(f"renewal-packet/{DATE} _ TRK-2026-1265 _ Permit _ Notice-of-Commencement-RENEWAL _ Unit-{u} _ {v['p']}-blank-permit-no _ v1.pdf",garbage=3,deflate=True)
# print packs: 3 copies of each document, in order, per unit
rec=pymupdf.open(f"{S}/noc/recorded.pdf"); sigpage={"321":0,"922":4}
for u,v in U.items():
    app=glob.glob(f"renewal-packet/*Application-RENEWAL-MARKED _ Unit-{u} *")[0]
    noc=glob.glob(f"renewal-packet/*Notice-of-Commencement-RENEWAL _ Unit-{u} *")[0]
    out=pymupdf.open()
    for _ in range(3): out.insert_pdf(pymupdf.open(app))
    for _ in range(3): out.insert_pdf(pymupdf.open(noc),from_page=0,to_page=0)
    if u in sigpage:
        for _ in range(3): out.insert_pdf(rec,from_page=sigpage[u],to_page=sigpage[u])
    out.save(f"renewal-packet/PRINT-PACK_3-copies_Unit-{u}_{v['p']}_{DATE}.pdf",garbage=3,deflate=True)
    print(u,len(out),"pages")
