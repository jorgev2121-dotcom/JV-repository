# Folder Label Sheet V3 (OfficeMax OM96352). Fixes the defects in JOB-NEXT_LABEL-STOCK-OM96352_ADDENDUM-A_SHEET-DEFECTS_2026-10-17:
#  1. Rows 1 and 2 hold PLAIN values only. ALL value hashtags go on row 3. Row 4 = group, #TBA, color word last (red adds three protocol tags just before #Red).
#  2. ONE fixed size per row on every label: row 1 13 pt, row 2 10.5 pt, rows 3 and 4 8 pt. Shrink only when a line would otherwise overflow (reported).
#  3. Times-style serif.  4. Row 1: main value left, folio or ID right, same size. Personal labels: category name, normal case, on row 1 left.
#  5. Label 1 is the exact sample: US Bank left, CAPAC 2010 right.
# Label 3.4375 x 0.6667 in. One column. One color per page. Page 1 = calibration. Unknown values print as ??.
import csv, re, json, subprocess, pymupdf
VER = "V3"
STAMP = subprocess.check_output(["bash", "-c", "TZ=America/New_York date +'%Y-%m-%d %-I:%M %p ET'"]).decode().strip()
rows = list(csv.DictReader(open("hardcopy-filing/HARDCOPY-FILING_Master_Index.csv", encoding="utf-8")))
COLORS = ["Yellow", "Blue", "Green", "Orange", "Pink", "Red"]
GROUP = {"Bal Harbour": "Plaza", "Bay Harbor": "BayHarbor", "Jobs": "OpenJob", "TEDC": "OpenJob", "Personal": "Personal"}
DEFAULT_COLOR = {"RED": "Red", "BLUE": "Blue", "YELLOW": "Yellow", "BEIGE": "Green"}  # Beige is not one of the six; Green is a placeholder until Jorge picks
KNOWN = {  # verified data only (renewal packet, TRK-2026-1265)
    "BH-321": dict(folio="12-2226-029-2610", owner="Adenat Corporation", contact="Miguel Zaldivar", company="MZ Solutions"),
    "BH-423": dict(folio="12-2226-029-2900", owner="Sylvia Azoulay", contact="Miguel Zaldivar", company="MZ Solutions"),
    "BH-922": dict(folio="12-2226-029-2810", owner="Daniel Raboh", contact="Miguel Zaldivar", company="MZ Solutions"),
}
PERSONAL_NAME = {"P-MED": "Medical", "P-FIN": "Financial / Bank", "P-HOME": "Home Improvement", "P-VEH": "Vehicles", "P-AI": "AI Printed Copies", "P-TAX": "Tax Records"}
RED = "#ScanApplyFullOCR #DiscardOriginalsAfterOcrProtocol #SoftCopyOnly"
def tag(s): return "#" + re.sub(r"[^A-Za-z0-9]+", "", s)
def clean(v): return (v or "").replace("\\#", "#").strip()

labels = []
for r in rows:
    fid = r["File ID"]; k = KNOWN.get(fid, {})
    grp = GROUP[r["Group"]]
    subj = clean(r["Subject"])
    if "confirm subject" in subj.lower(): subj = "Job 1029 ??"
    loc = clean(r["Location"]); loc = loc if re.search(r"\d", loc) and "confirm" not in loc.lower() else ""
    if r["Group"] == "Bal Harbour":
        main = subj.replace("Bal Harbour Plaza ", "Plaza "); loc = "10185 Collins Ave"
    elif r["Group"] == "Personal":
        main = PERSONAL_NAME[fid]
    else:
        main = subj
    right = k.get("folio", fid)                       # folio if known, else the file ID
    owner = k.get("owner", "??")
    contact = k.get("contact"); company = k.get("company")
    r2 = f"{owner} · {contact + ', ' + company if contact else '??'}"
    trk = r["Tracking"].strip()
    trk_tag = "#TRK-??" if trk.upper() == "TRK-TBD" else "#" + trk
    parts = [tag(loc) if loc else "#Address??", tag(owner) if k else "#Owner??", tag(contact) if contact else "#Contact??", tag(company) if company else "#Company??", trk_tag]
    if r["Group"] == "Personal": parts[0] = "#Personal"  # no street address for personal folders
    labels.append(dict(id=fid, group=grp, color=DEFAULT_COLOR[r["Folder"].split(" - ")[0]], r1l=main, r1r=right, r2=r2, r3=" ".join(parts), tail=f"#{grp} #TBA"))
json.dump(dict(ver=VER, stamp=STAMP, labels=labels), open("hardcopy-filing/labels-data-v3.json", "w"), indent=1)
SAMPLE = dict(id="SAMPLE", group="Sample", color="Yellow", r1l="US Bank", r1r="CAPAC 2010", r2="Sample label: hold against the real folder label", r3="#USBank #CAPAC2010 #Sample", tail="#Sample #TBA")

LW, LH = 3.4375 * 72, 48.0
BAND = (14.0, 12.0, 9.0, 9.0)
PER = 15; X0 = (612 - LW) / 2; Y0 = 36.0
FONT = {"r1": "tibo", "r2": "tiro", "r3": "tiro", "r4": "tiro"}
BASE = {"r1": 13.0, "r2": 10.5, "r3": 8.0, "r4": 8.0}
shrunk = []
def tw(t, f, s): return pymupdf.get_text_length(t, fontname=f, fontsize=s)
def draw(page, x, y, l, color):
    pad = 4.0; avail = LW - 2 * pad
    r4 = l["tail"] + (" " + RED if color == "Red" else "") + " #" + color
    ytop = y + (LH - sum(BAND)) / 2
    s = BASE["r1"]
    while s > 4 and tw(l["r1l"], FONT["r1"], s) + tw(l["r1r"], FONT["r1"], s) + 8 > avail: s -= 0.1
    if s < BASE["r1"] - 0.05: shrunk.append((l["id"], "r1", round(s, 1)))
    yb = ytop + BAND[0] * 0.78
    page.insert_text((x + pad, yb), l["r1l"], fontsize=s, fontname=FONT["r1"])
    page.insert_text((x + LW - pad - tw(l["r1r"], FONT["r1"], s), yb), l["r1r"], fontsize=s, fontname=FONT["r1"])
    ytop += BAND[0]
    for i, (row, txt) in enumerate((("r2", l["r2"]), ("r3", l["r3"]), ("r4", r4))):
        s = BASE[row]
        while s > 4 and tw(txt, FONT[row], s) > avail: s -= 0.1
        if s < BASE[row] - 0.05: shrunk.append((l["id"], row, round(s, 1)))
        page.insert_text((x + pad, ytop + BAND[i + 1] * 0.78), txt, fontsize=s, fontname=FONT[row])
        ytop += BAND[i + 1]
def stamp(p, t): p.insert_text((X0, 24), t, fontsize=7, fontname="helv", color=(.45, .45, .45))
d = pymupdf.open()
p = d.new_page(width=612, height=792)
stamp(p, f"Folder Label Sheet {VER} · OM96352 calibration · {STAMP} · 100 percent")
for r in range(PER):
    y = Y0 + r * LH
    p.draw_rect(pymupdf.Rect(X0, y, X0 + LW, y + LH), color=(.2, .2, .2), width=.5, dashes="[3 2] 0")
    p.insert_text((X0 + 6, y + 28), f"slot {r+1} · 3 7/16 x 2/3 in", fontsize=8, fontname="tiro", color=(.3, .3, .3))
yb = Y0 + PER * LH + 18
p.draw_line((X0, yb), (X0 + 72, yb), width=1); p.insert_text((X0, yb + 11), "this bar is 1 inch at 100 percent", fontsize=7, fontname="helv", color=(.3, .3, .3))
pages = {}
for col in COLORS:
    sel = [l for l in labels if l["color"] == col]
    if col == "Yellow": sel = [SAMPLE] + sel
    pages[col] = 0
    for i in range(0, len(sel), PER):
        p = d.new_page(width=612, height=792); pages[col] += 1
        stamp(p, f"Folder Label Sheet {VER} · {col} p{pages[col]} · {STAMP} · OM96352 · 100 percent")
        for j, l in enumerate(sel[i:i + PER]): draw(p, X0, Y0 + j * LH, l, col)
OUT = "hardcopy-filing/FOLDER-LABELS_OM96352_3-7-16x2-3in_V3_2026-10-17.pdf"
d.save(OUT)
print(OUT, "pages", len(d), pages, STAMP)
print("labels that shrank:", len(shrunk), shrunk)
