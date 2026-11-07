# Folder Label Sheet V2: OfficeMax permanent file folder labels, model OM96352 (SKU 21065366).
# Order: JOB-NEXT_LABEL-STOCK-OM96352_FOUR-LINE-FONTS_2026-10-17 (Chat for Jorge). Revises V1 (3.5 x 0.625 in, Helvetica 11/8.5/5.5/5.5).
# Label 3.4375 x 0.6667 in (3 7/16 x 2/3), white, black ink, no border. Times New Roman. Rows ~13 / 10.5 / 8 / 8 pt in bands 14 / 12 / 9 / 9 pt.
# Row 1: main value left, second value (folio) right-aligned. One color per page. Single-column strip, 15 per Letter page.
# Sheet grid is NOT confirmed (no measurement of the physical sheet): a calibration page is page 1.
# Unknown values print as ??. Sources: HARDCOPY-FILING_Master_Index.csv (38 files) via labels-data.json.
import json, sys, subprocess, pymupdf
VER = "V2"
STAMP = subprocess.check_output(["bash", "-c", "TZ=America/New_York date +'%Y-%m-%d %-I:%M %p ET'"]).decode().strip()
labels = json.load(open("hardcopy-filing/labels-data.json"))
COLORS = ["Yellow", "Blue", "Green", "Orange", "Pink", "Red"]
RED = "#ScanApplyFullOCR #DiscardOriginalsAfterOcrProtocol #SoftCopyOnly"
LW, LH = 3.4375 * 72, 48.0     # 247.5 x 48 pt
BAND = (14.0, 12.0, 9.0, 9.0)  # row bands, 44 of 48 pt; ~2 pt top and bottom
PER = 15; X0 = (612 - LW) / 2; Y0 = 36.0
FONT = {"r1": "tibo", "r2": "tiro", "r3": "tiro", "r4": "tiro"}  # Times (Roman / Bold)
BASE = {"r1": 13.0, "r2": 10.5, "r3": 8.0, "r4": 8.0}
FLOOR = {"r1": 8.0, "r2": 8.0, "r3": 6.0, "r4": 6.0}
HARD_FLOOR = 4.0  # only if a red hashtag run cannot fit at the stated floor; reported in the build output
shrunk_below_floor = []

def tw(t, f, s): return pymupdf.get_text_length(t, fontname=f, fontsize=s)

def fit_size(txt, row, avail, who):
    s = BASE[row]
    while s > FLOOR[row] and tw(txt, FONT[row], s) > avail: s -= 0.1
    if tw(txt, FONT[row], s) > avail:
        while s > HARD_FLOOR and tw(txt, FONT[row], s) > avail: s -= 0.1
        shrunk_below_floor.append((who, row, round(s, 1)))
    return s

def rows_for(l, color):
    right = l["r1"].split(" · Folio ")[1] if " · Folio " in l["r1"] else ""
    left = l["r1"].split(" · Folio ")[0]
    r1l, r1r = left, ("Folio " + right) if right else ""
    r2 = l["r2"]
    r3 = l["r3"]
    r4 = l["tail"] + ((" " + RED) if color == "Red" else "") + " #" + color
    return r1l, r1r, r2, r3, r4

def draw_label(page, x, y, parts, who):
    r1l, r1r, r2, r3, r4 = parts
    pad = 4.0; avail = LW - 2 * pad
    ytop = y + (LH - sum(BAND)) / 2
    # row 1: left + right on one line; shrink both together until they fit
    s1 = BASE["r1"]
    while s1 > FLOOR["r1"] and tw(r1l, FONT["r1"], s1) + tw(r1r, FONT["r1"], s1) + 8 > avail: s1 -= 0.1
    if tw(r1l, FONT["r1"], s1) + tw(r1r, FONT["r1"], s1) + 8 > avail:
        shrunk_below_floor.append((who, "r1", round(s1, 1)))
        while s1 > HARD_FLOOR and tw(r1l, FONT["r1"], s1) + tw(r1r, FONT["r1"], s1) + 8 > avail: s1 -= 0.1
    yb = ytop + BAND[0] * 0.78
    page.insert_text((x + pad, yb), r1l, fontsize=s1, fontname=FONT["r1"], color=(0, 0, 0))
    if r1r: page.insert_text((x + LW - pad - tw(r1r, FONT["r1"], s1), yb), r1r, fontsize=s1, fontname=FONT["r1"], color=(0, 0, 0))
    ytop += BAND[0]
    for k, (row, txt) in enumerate((("r2", r2), ("r3", r3), ("r4", r4))):
        s = fit_size(txt, row, avail, who)
        page.insert_text((x + pad, ytop + BAND[k + 1] * 0.78), txt, fontsize=s, fontname=FONT[row], color=(0, 0, 0))
        ytop += BAND[k + 1]

SAMPLE = ("US Bank", "CAPAC 2010", "Sample label: hold it against the real folder label to check size", "#USBank #CAPAC2010 #Sample", "#Sample #TBA #Yellow")

def stamp(page, text):
    page.insert_text((X0, 24), text, fontsize=7, fontname="helv", color=(.45, .45, .45))

d = pymupdf.open()
# ---- page 1: calibration (one outline per slot at 100 percent, nominal pitch = label height, no gap)
p = d.new_page(width=612, height=792)
stamp(p, f"Folder Label Sheet {VER} · OM96352 calibration · {STAMP} · 100 percent")
for r in range(PER):
    y = Y0 + r * LH
    p.draw_rect(pymupdf.Rect(X0, y, X0 + LW, y + LH), color=(.2, .2, .2), width=.5, dashes="[3 2] 0")
    p.insert_text((X0 + 6, y + 28), f"slot {r+1} · 3 7/16 x 2/3 in", fontsize=8, fontname="tiro", color=(.3, .3, .3))
yb = Y0 + PER * LH + 18
p.draw_line((X0, yb), (X0 + 72, yb), width=1); p.insert_text((X0, yb + 11), "this bar is 1 inch at 100 percent", fontsize=7, fontname="helv", color=(.3, .3, .3))
p.insert_text((X0 + 130, yb + 11), "Overlay on a blank OM96352 sheet. If the slots do not line up, tell me the pitch and margins.", fontsize=7, fontname="helv", color=(.3, .3, .3))
# ---- color pages
n_pages = {}
for col in COLORS:
    sel = [rows_for(l, col) + (l["id"],) for l in labels if l["color"] == col]
    if col == "Yellow": sel = [(SAMPLE[0], SAMPLE[1], SAMPLE[2], SAMPLE[3], SAMPLE[4], "SAMPLE")] + sel
    n_pages[col] = 0
    for i in range(0, len(sel), PER):
        p = d.new_page(width=612, height=792); n_pages[col] += 1
        stamp(p, f"Folder Label Sheet {VER} · {col} p{n_pages[col]} · {STAMP} · OM96352 · 100 percent")
        for j, item in enumerate(sel[i:i + PER]):
            draw_label(p, X0, Y0 + j * LH, item[:5], item[5])
OUT = "hardcopy-filing/FOLDER-LABELS_OM96352_3-7-16x2-3in_V2_2026-10-17.pdf"
d.save(OUT)
json.dump(dict(ver=VER, stamp=STAMP, sample=SAMPLE, labels=labels), open("hardcopy-filing/labels-data-v2.json", "w"))
print(OUT, "pages", len(d), n_pages, "stamp", STAMP)
print("shrunk below floor:", shrunk_below_floor)
