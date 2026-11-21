# Builds REVISED label sheets from HARDCOPY-FILING_Master_Index.csv (40 files).
# Jorge 2026-10-17: populate what we have; leave a #hashtag placeholder for anything missing.
# Tab labels 2.5 x 0.5 in, 2 cols x 18 rows (36 per Letter sheet). Title blocks 4.0 x 5.0 in, 4 per Letter sheet.
# Never invents data. A missing or "confirm" value prints as a #hashtag.
import csv, re, sys, pymupdf
DATE = "2026-10-17"
SRC = "hardcopy-filing/HARDCOPY-FILING_Master_Index.csv"
rows = list(csv.DictReader(open(SRC, encoding="utf-8")))
COL = {"RED": (0.78, 0.10, 0.10), "BLUE": (0.12, 0.30, 0.75), "BEIGE": (0.80, 0.72, 0.52), "YELLOW": (0.95, 0.80, 0.10)}
MEAN = {"RED": "originals waiting on action", "BLUE": "originals held", "BEIGE": "job copies", "YELLOW": "personal"}

def missing(v):
    v = (v or "").strip()
    return (not v) or v.upper() in ("TRK-TBD", "CONFIRM") or v.lower().startswith("confirm") and len(v) < 8

def tag(label):  # placeholder hashtag
    return "#" + re.sub(r"[^A-Za-z0-9]+", "-", label).strip("-")

def fld(v, label):
    v = (v or "").strip()
    if v.upper() == "TRK-TBD" or not v or v.lower() in ("confirm", "tell me the subject"):
        return tag(label)
    return v

def clean(v):
    return (v or "").replace("\\#", "#").strip()

def trk(r):
    t = clean(r["Tracking"])
    return "#TRK-NEEDED" if t.upper() == "TRK-TBD" or not t else t

def fit(page, x, y, txt, size, font, maxw, color=(0, 0, 0)):
    while size > 4.5 and pymupdf.get_text_length(txt, fontname=font, fontsize=size) > maxw:
        size -= 0.3
    page.insert_text((x, y), txt, fontsize=size, fontname=font, color=color)

def wrap(txt, font, size, maxw):
    out, cur = [], ""
    for w in txt.split():
        t = (cur + " " + w).strip()
        if pymupdf.get_text_length(t, fontname=font, fontsize=size) <= maxw:
            cur = t
        else:
            out.append(cur); cur = w
    if cur: out.append(cur)
    return out

def subject(r):
    s = clean(r["Subject"])
    return "#SUBJECT-NEEDED" if "confirm subject" in s.lower() else s

def where(r):
    w = clean(r["Location"])
    if w.lower() == "confirm" or "(confirm address)" in w.lower() or not w:
        base = w.replace("(confirm address)", "").strip()
        return (base + " " if base and base.lower() != "confirm" else "") + "#ADDRESS-NEEDED"
    return w

d = pymupdf.open()
W, H = 180, 36; X = [72, 270]; Y0 = 44
per = 36
for s in range(0, len(rows), per):
    p = d.new_page(width=612, height=792)
    p.insert_text((72, 30), f"TAB LABELS · 2.5 x 0.5 in · 36 per sheet · print at 100% · cut on the dotted lines · {DATE} · sheet {s//per+1}",
                  fontsize=7.5, fontname="helv", color=(.4, .4, .4))
    for k in range(per):
        r_, c_ = divmod(k, 2)
        x = X[c_]; y = Y0 + r_ * H
        p.draw_rect(pymupdf.Rect(x, y, x + W, y + H), color=(.6, .6, .6), width=.4, dashes="[2 2] 0")
        i = s + k
        if i >= len(rows): continue
        r = rows[i]; key = r["Folder"].split(" - ")[0]
        p.draw_rect(pymupdf.Rect(x + 1, y + 1, x + 7, y + H - 1), color=None, fill=COL[key])
        fit(p, x + 11, y + 14, f"{r['File ID']} · {subject(r)}", 9.5, "hebo", W - 15)
        fit(p, x + 11, y + 27, f"{trk(r)} · {key} · {r['Updated']}", 7, "helv", W - 15, (.25, .25, .25))

p = None
blocks = []
for i, r in enumerate(rows):
    if i % 4 == 0:
        p = d.new_page(width=612, height=792)
        p.insert_text((36, 22), f"TITLE BLOCKS · 4.0 x 5.0 in · 4 per Letter sheet · print at 100% · cut on the dotted lines · {DATE} · sheet {i//4+1}",
                      fontsize=7.5, fontname="helv", color=(.4, .4, .4))
    x, y = [(18, 36), (306, 36), (18, 396), (306, 396)][i % 4]
    p.draw_rect(pymupdf.Rect(x, y, x + 288, y + 360), color=(.6, .6, .6), width=.4, dashes="[2 2] 0")
    key = r["Folder"].split(" - ")[0]
    p.draw_rect(pymupdf.Rect(x + 1, y + 1, x + 287, y + 22), color=None, fill=COL[key])
    p.insert_text((x + 10, y + 16), f"{key} · {r['Folder'].split(' - ')[1]} · {MEAN[key]}", fontsize=9.5, fontname="hebo",
                  color=(1, 1, 1) if key != "YELLOW" and key != "BEIGE" else (0, 0, 0))
    p.insert_text((x + 12, y + 56), r["File ID"], fontsize=30, fontname="hebo")
    yy = y + 76
    for ln in wrap(subject(r), "hebo", 13, 262)[:2]:
        p.insert_text((x + 12, yy), ln, fontsize=13, fontname="hebo"); yy += 16
    yy += 4
    KNOWN = {"BH-321": ("Adenat Corporation", "BLC2024-0707"), "BH-423": ("Sylvia Azoulay", "BLC2024-0714"), "BH-922": ("Daniel Raboh", "BLC2024-0717"), "BH-721": ("#OWNER", "BLC2026-1436")}
    own, permit = KNOWN.get(r["File ID"], ("#OWNER", "#PERMIT-NO"))
    for lab, val in (("Where", where(r)), ("Group", r["Group"]), ("Owner", own), ("Permit / case", permit), ("Status", clean(r["Status"])), ("Next", clean(r["Next step"])), ("Contents", "#CONTENTS")):
        ls = wrap(f"{lab}: {val}", "helv", 9.5, 262)[:3]
        for ln in ls:
            p.insert_text((x + 12, yy), ln, fontsize=9.5, fontname="helv"); yy += 12
        yy += 3
    p.insert_text((x + 12, y + 336), f"Tracking: {trk(r)}", fontsize=11, fontname="hebo")
    p.insert_text((x + 12, y + 350), f"{trk(r)} · v2 · {DATE} · CURRENT · {r['File ID']}", fontsize=6.5, fontname="helv", color=(.4, .4, .4))

OUT = f"hardcopy-filing/LABELS_Tab-and-Title-blocks_40-files_v2_{DATE}.pdf"
d.save(OUT)
n_t = sum(1 for r in rows if trk(r).startswith("#"))
n_s = sum(1 for r in rows if subject(r).startswith("#"))
n_a = sum(1 for r in rows if "#ADDRESS-NEEDED" in where(r))
print(OUT, "pages", len(d), "rows", len(rows), "missing TRK", n_t, "missing subject", n_s, "missing address", n_a)
