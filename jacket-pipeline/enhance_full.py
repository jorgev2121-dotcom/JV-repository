import fitz, numpy as np, os, io
import pytesseract
from pytesseract import Output
from PIL import Image, ImageOps, ImageFilter

SP = "/tmp/claude-0/-home-user-JV-repository/246af351-3041-50e4-ad7d-5d95f0db0ca5/scratchpad"
PARTS = [f"{SP}/331-Tamiami-Canal-Rd_TAXJACKET_part01.pdf", f"{SP}/331_part02.pdf", f"{SP}/331_part03.pdf"]
DPI = 200

def upright(rgb):
    try:
        rot = int(pytesseract.image_to_osd(rgb, output_type=Output.DICT).get("rotate",0))
    except Exception:
        rot = 0
    return (rgb.rotate(-rot, expand=True), rot) if rot%360 else (rgb,0)

def texture(g):
    gi=g.astype(np.int16); return float(np.abs(np.diff(gi,axis=1)).mean()+np.abs(np.diff(gi,axis=0)).mean())

def crop_black(gray):
    a=np.asarray(gray); rows=np.where(a.mean(axis=1)>45)[0]; cols=np.where(a.mean(axis=0)>45)[0]
    if len(rows)>20 and len(cols)>20: return gray.crop((int(cols[0]),int(rows[0]),int(cols[-1])+1,int(rows[-1])+1))
    return gray

def classify(g):
    nonwhite=float(np.mean(g<200)); mid=float(np.mean((g>=60)&(g<=200))); dark=float(np.mean(g<40))
    return ("PHOTO",nonwhite) if (mid>0.30 and texture(g)>=12 and dark<0.15) else ("TEXT/FORM",nonwhite)

def enh_text(gray):
    g=ImageOps.autocontrast(gray,cutoff=1); arr=np.asarray(g).astype(np.int16)
    local=np.asarray(g.filter(ImageFilter.BoxBlur(18))).astype(np.int16)
    return Image.fromarray(np.where(arr>(local-12),255,0).astype(np.uint8))

def enh_photo(gray): return ImageOps.autocontrast(gray,cutoff=2)

kept, manifest = [], []
gp = 0  # global page number across parts
for part_i, path in enumerate(PARTS, start=1):
    doc = fitz.open(path); mat = fitz.Matrix(DPI/72, DPI/72)
    for lp, page in enumerate(doc, start=1):
        gp += 1
        pix = page.get_pixmap(matrix=mat)
        rgb0 = Image.frombytes("RGB",[pix.width,pix.height],pix.samples)
        rgb, rot = upright(rgb0)
        gray = crop_black(ImageOps.grayscale(rgb)); gnp=np.asarray(gray)
        kind, nonwhite = classify(gnp)
        enh = enh_photo(gray) if kind=="PHOTO" else enh_text(gray)
        try: text = pytesseract.image_to_string(enh)
        except Exception: text=""
        alnum = sum(c.isalnum() for c in text)
        if alnum < 8 and nonwhite < 0.06:
            manifest.append((gp,f"pt{part_i}p{lp}","BLANK/JUNK","DROPPED",rot,alnum)); continue
        try: kept.append(pytesseract.image_to_pdf_or_hocr(enh.convert("RGB"),extension="pdf"))
        except Exception:
            buf=io.BytesIO(); enh.convert("RGB").save(buf,"PDF"); kept.append(buf.getvalue())
        manifest.append((gp,f"pt{part_i}p{lp}",kind,"KEPT",rot,alnum))
    doc.close()

merged = fitz.open()
for b in kept:
    s=fitz.open("pdf",b); merged.insert_pdf(s); s.close()
out = f"{SP}/TRK-2026-1612_TaxJacket_331-Tamiami-Canal-Rd_ENHANCED_v1_SEARCHABLE.pdf"
merged.save(out); merged.close()

drop=[m for m in manifest if m[3]=="DROPPED"]
lines=[]
lines.append(f"331 TAMIAMI CANAL RD — TRK-2026-1612 — full jacket enhancement manifest")
lines.append(f"PAGES IN: {len(manifest)}   KEPT: {len(kept)}   DROPPED(blank/junk): {len(drop)}")
lines.append(f"DROPPED global pages: {[m[0] for m in drop]}  ({[m[1] for m in drop]})")
lines.append("")
lines.append("global | source | type | status | rotation | ocr_chars")
for m in manifest: lines.append(f"  p{m[0]:02d} | {m[1]} | {m[2]} | {m[3]} | {m[4]} | {m[5]}")
man = f"{SP}/331_full_manifest.txt"
open(man,"w").write("\n".join(lines))
print("\n".join(lines[:3]))
print("OUT:", out, os.path.getsize(out)//1024,"KB")
print("MANIFEST:", man)
