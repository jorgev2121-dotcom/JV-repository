# Folder label format v3 (owner directive 10/17/2026, skill folder-label-format).
# Label 3.5 in x 0.625 in, white, black ink, no border, four fixed row bands: 13 / 10.5 / 7.5 / 7.5 pt.
# Fonts: row1 11pt bold, row2 8.5pt, row3 5.5pt bold, row4 5.5pt italic. Shrink only to fit one line (floor 3.5pt).
# Color is only the LAST hashtag. One page per color. Red adds three protocol hashtags before #Red.
# Unknown values print as ?? (never invented). Source: HARDCOPY-FILING_Master_Index.csv (38 files).
import csv, json, re, pymupdf
SRC = "hardcopy-filing/HARDCOPY-FILING_Master_Index.csv"
rows = list(csv.DictReader(open(SRC, encoding="utf-8")))
COLORS = ["Yellow", "Blue", "Green", "Orange", "Pink", "Red"]
GROUP = {"Bal Harbour": "Plaza", "Bay Harbor": "BayHarbor", "Jobs": "OpenJob", "TEDC": "OpenJob", "Personal": "Personal"}
DEFAULT_COLOR = {"RED": "Red", "BLUE": "Blue", "YELLOW": "Yellow", "BEIGE": "Green"}  # Beige is not one of the six; Green is a placeholder Jorge can change per group
# Verified data only (renewal packet builder, TRK-2026-1265). Everything else stays ??.
KNOWN = {
    "BH-321": dict(folio="12-2226-029-2610", owner="Adenat Corporation", contact="Miguel Zaldivar", company="MZ Solutions"),
    "BH-423": dict(folio="12-2226-029-2900", owner="Sylvia Azoulay", contact="Miguel Zaldivar", company="MZ Solutions"),
    "BH-922": dict(folio="12-2226-029-2810", owner="Daniel Raboh", contact="Miguel Zaldivar", company="MZ Solutions"),
}
RED_EXTRA = "#ScanApplyFullOCR #DiscardOriginalsAfterOcrProtocol #SoftCopyOnly"

def tag(s): return "#" + re.sub(r"[^A-Za-z0-9]+", "", s)

def addr_ok(loc):
    loc = loc.replace("\\#", "#").strip()
    return loc if re.search(r"\d", loc) else ""

labels = []
for r in rows:
    fid = r["File ID"]; k = KNOWN.get(fid, {})
    subj = r["Subject"].replace("\\#", "#").strip()
    if "confirm subject" in subj.lower(): subj = "Job 1029 ??"
    loc = addr_ok(r["Location"])
    if r["Group"] == "Bal Harbour":
        unit = subj.replace("Bal Harbour Plaza ", "Plaza ")
        loc = "10185 Collins Ave"
    else:
        unit = subj
    addr_tag = tag(loc) if loc else "#Address??"
    folio = k.get("folio", "??")
    owner = k.get("owner", "??")
    contact = k.get("contact"); company = k.get("company")
    contact_txt = f"{contact}, {company}" if contact else "??"
    trk = r["Tracking"].strip()
    trk_tag = "#TRK-??" if trk.upper() == "TRK-TBD" else "#" + trk
    row1 = f"{unit} {addr_tag} · Folio {folio} #Folio"
    row2 = f"Owner {owner} #Owner · {contact_txt} #Contact"
    row3 = f"{tag(company) if company else '#Company??'} {tag(contact) if contact else '#Contact??'} {trk_tag}"
    grp = GROUP[r["Group"]]
    color = DEFAULT_COLOR[r["Folder"].split(" - ")[0]]
    labels.append(dict(id=fid, group=grp, color=color, r1=row1, r2=row2, r3=row3, tail=f"#{grp} #TBA"))
json.dump(labels, open("hardcopy-filing/labels-data.json", "w"), indent=1)

def row4(l):
    extra = RED_EXTRA + " " if l["color"] == "Red" else ""
    return f"{l['tail']} {extra}#{l['color']}"

# ---- PDF: one page per color (more pages if a color has more than 32 labels), 2 cols x 16 rows, Letter, 100 percent
LW, LH = 252.0, 45.0           # 3.5 in x 0.625 in
X0, Y0 = 54.0, 36.0            # 0.75 in left, 0.5 in top
def fit(page, x, y, txt, size, font, floor=3.5):
    while size > floor and pymupdf.get_text_length(txt, fontname=font, fontsize=size) > LW - 6:
        size -= 0.1
    page.insert_text((x + 3, y), txt, fontsize=size, fontname=font, color=(0, 0, 0))
d = pymupdf.open()
for col in COLORS:
    sel = [l for l in labels if l["color"] == col]
    for i in range(0, len(sel), 32):
        p = d.new_page(width=612, height=792)
        for j, l in enumerate(sel[i:i + 32]):
            c, rr = divmod(j, 16)
            x = X0 + c * LW; y = Y0 + rr * LH
            fit(p, x, y + 3 + 11, l["r1"], 11, "hebo")
            fit(p, x, y + 3 + 13 + 8.5, l["r2"], 8.5, "helv")
            fit(p, x, y + 3 + 23.5 + 5.5, l["r3"], 5.5, "hebo")
            fit(p, x, y + 3 + 31 + 5.5, row4(l), 5.5, "heit")
OUT = "hardcopy-filing/FOLDER-LABELS_3.5x0.625in_by-color_2026-10-17.pdf"
d.save(OUT)
print(OUT, "pages", len(d), {c: sum(1 for l in labels if l["color"] == c) for c in COLORS})
