import fitz, numpy as np, os, io
import pytesseract
from pytesseract import Output
from PIL import Image, ImageOps, ImageFilter, ImageDraw

SRC = "/tmp/claude-0/-home-user-JV-repository/246af351-3041-50e4-ad7d-5d95f0db0ca5/scratchpad/331-Tamiami-Canal-Rd_TAXJACKET_part01.pdf"
OUT = "/tmp/claude-0/-home-user-JV-repository/246af351-3041-50e4-ad7d-5d95f0db0ca5/scratchpad"
DPI = 200
doc = fitz.open(SRC); mat = fitz.Matrix(DPI/72, DPI/72)

def render(p):
    pix = p.get_pixmap(matrix=mat)
    return Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

def upright(rgb):
    try:
        osd = pytesseract.image_to_osd(rgb, output_type=Output.DICT)
        rot = int(osd.get("rotate", 0))
    except Exception:
        rot = 0
    return (rgb.rotate(-rot, expand=True), rot) if rot % 360 else (rgb, 0)

def texture(g):
    gi = g.astype(np.int16)
    return float(np.abs(np.diff(gi,axis=1)).mean() + np.abs(np.diff(gi,axis=0)).mean())

def crop_black_border(gray):
    a = np.asarray(gray)
    rows = np.where(a.mean(axis=1) > 45)[0]
    cols = np.where(a.mean(axis=0) > 45)[0]
    if len(rows) > 20 and len(cols) > 20:
        return gray.crop((int(cols[0]), int(rows[0]), int(cols[-1])+1, int(rows[-1])+1))
    return gray

def classify(g):
    nonwhite=float(np.mean(g<200)); mid=float(np.mean((g>=60)&(g<=200))); darkf=float(np.mean(g<40))
    if mid>0.30 and texture(g)>=12 and darkf<0.15:
        return "PHOTO", nonwhite
    return "TEXT/FORM", nonwhite

def enhance_text(gray):
    g = ImageOps.autocontrast(gray, cutoff=1)
    arr = np.asarray(g).astype(np.int16)
    local = np.asarray(g.filter(ImageFilter.BoxBlur(18))).astype(np.int16)
    return Image.fromarray(np.where(arr > (local-12), 255, 0).astype(np.uint8))

def enhance_photo(gray):
    return ImageOps.autocontrast(gray, cutoff=2)

kept_pdf, manifest, ba = [], [], []
for i, page in enumerate(doc, start=1):
    rgb0 = render(page)
    rgb, rot = upright(rgb0)
    gray = crop_black_border(ImageOps.grayscale(rgb))
    gnp = np.asarray(gray)
    kind, nonwhite = classify(gnp)
    enh = enhance_photo(gray) if kind=="PHOTO" else enhance_text(gray)
    try: text = pytesseract.image_to_string(enh)
    except Exception: text = ""
    alnum = sum(c.isalnum() for c in text)
    if alnum < 8 and nonwhite < 0.06:
        manifest.append((i,"BLANK/JUNK","DROPPED",rot,alnum)); continue
    try:
        kept_pdf.append(pytesseract.image_to_pdf_or_hocr(enh.convert("RGB"), extension="pdf"))
    except Exception:
        buf=io.BytesIO(); enh.convert("RGB").save(buf,"PDF"); kept_pdf.append(buf.getvalue())
    manifest.append((i,kind,"KEPT",rot,alnum))
    ba.append((i,kind,rgb,enh))

merged = fitz.open()
for b in kept_pdf:
    s=fitz.open("pdf",b); merged.insert_pdf(s); s.close()
enh_pdf = os.path.join(OUT,"331-Tamiami_ENHANCED_v2_searchable.pdf")
merged.save(enh_pdf); merged.close()

# Large single-page before/after comparisons for a few representative kept pages
def big(im, TH=1100):
    im=im.convert("RGB"); w,h=im.size; return im.resize((int(w*TH/h),TH))
picks = ba[:4]
for i,kind,o,e in picks:
    to,te=big(o),big(e); pad=14; w=to.width+te.width+pad*3; h=max(to.height,te.height)+pad*2+26
    c=Image.new("RGB",(w,h),(255,255,255)); d=ImageDraw.Draw(c)
    d.text((pad,6),f"p{i:02d}  {kind}    LEFT = original (upright)      RIGHT = cleaned",fill=(15,15,15))
    c.paste(to,(pad,26+pad)); c.paste(te,(to.width+pad*2,26+pad))
    c.save(os.path.join(OUT,f"331_v2_FULL_p{i:02d}.jpg"),"JPEG",quality=80)

print(f"PAGES IN: {len(doc)}   OUT: {len(kept_pdf)}")
drop=[m for m in manifest if m[2]=='DROPPED']
print(f"DROPPED blank/junk: {len(drop)} -> pages {[m[0] for m in drop]}")
rotd=[m for m in manifest if m[3]]
print(f"ROTATED upright: {[(m[0],m[3]) for m in rotd]}")
for m in manifest: print("  ",m)
print("PDF:",enh_pdf,"pages saved for view:",[i for i,_,_,_ in picks])
