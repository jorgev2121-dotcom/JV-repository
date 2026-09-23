"""Tiny multi-page text engine on PDF built-in fonts (Helvetica).

No embedded fonts, no form fields: small files that cannot render blank (RI-048).
"""
import pymupdf as f

class Doc:
    X0, X1, TOP, BOTTOM = 54, 558, 58, 740

    def __init__(self, stamp):
        self.doc = f.open(); self.stamp = stamp; self.page = None; self.new_page()

    def new_page(self):
        self.page = self.doc.new_page(width=612, height=792); self.y = self.TOP

    def tl(self, s, fn, fs):
        return f.get_text_length(s, fontname=fn, fontsize=fs)

    def need(self, h):
        if self.y + h > self.BOTTOM: self.new_page()

    def rich(self, segs, fs=10, center=False, gap=7, indent=0):
        """segs: str or list of (text, bold). '[]' draws an empty checkbox."""
        if isinstance(segs, str): segs = [(segs, 0)]
        x0 = self.X0 + indent; width_max = self.X1 - x0
        words = []
        for text, bold in segs:
            for w in text.split(" "):
                if w: words.append((w, "hebo" if bold else "helv"))
        wl = lambda w, fn: fs * 0.75 if w == "[]" else self.tl(w, fn, fs)
        sp = self.tl(" ", "helv", fs)
        lines, cur, width = [], [], 0
        for w, fn in words:
            add = (sp if cur else 0) + wl(w, fn)
            if cur and width + add > width_max:
                lines.append((cur, width)); cur, width, add = [], 0, wl(w, fn)
            cur.append((w, fn)); width += add
        if cur: lines.append((cur, width))
        for ln, wid in lines:
            self.need(fs * 1.32)
            x = x0 + ((width_max - wid) / 2 if center else 0)
            for w, fn in ln:
                if w == "[]":
                    b = fs * 0.75   # square check box
                    self.page.draw_rect(f.Rect(x, self.y - b + 1, x + b, self.y + 1), width=0.8); x += b + sp
                else:
                    self.page.insert_text((x, self.y), w, fontname=fn, fontsize=fs); x += self.tl(w, fn, fs) + sp
            self.y += fs * 1.32
        self.y += gap

    def title(self, *lines):
        for i, l in enumerate(lines):
            self.rich([(l, 1)], 12.5, True, 8 if i == len(lines) - 1 else 0)

    def heading(self, text):
        self.need(40); self.rich([(text, 1)], 10.5, gap=4)

    def box(self, rows):
        """rows: list of (label, value). Draws a bordered block."""
        self.need(len(rows) * 14 + 20)
        top = self.y - 10; self.y += 4
        for lab, val in rows: self.rich([(lab + " ", 1), (val, 0)], gap=0)
        self.page.draw_rect(f.Rect(self.X0 - 5, top, self.X1, self.y - 5), width=0.8); self.y += 10

    def sig_block(self, label, witnesses=False, notary_ack=None):
        u = lambda n: "_" * n
        self.need(110 + (90 if witnesses else 0) + (110 if notary_ack else 0))
        self.rich([(label, 1)], gap=14)
        self.rich("By: " + u(46) + "     Date: " + u(18), gap=10)
        self.rich("Print name: " + u(36) + "     Title: " + u(22), gap=12)
        if witnesses:
            self.rich([("Signed in the presence of two witnesses:", 1)], gap=10)
            for n in (1, 2):
                self.rich(f"Witness {n}: " + u(32) + "   Print: " + u(32), gap=5)
                self.rich("Address: " + u(76), gap=10)
        if notary_ack:
            self.rich([("STATE OF FLORIDA, COUNTY OF ", 1), (u(24), 0)], gap=8)
            self.rich("The foregoing instrument was acknowledged before me by means of [] physical presence or [] online notarization, this "
                      + u(5) + " day of " + u(15) + ", 20" + u(4) + ", by " + u(28) + ", " + notary_ack
                      + " who is [] personally known to me or [] has produced " + u(22) + " as identification.", gap=18)
            self.rich(u(44) + "   (SEAL)", gap=0); self.rich("Notary Public - State of Florida", gap=0)
            self.rich("Print name: " + u(28) + "   My commission expires: " + u(16))

    def save(self, out, must=()):
        n = len(self.doc)
        for i, pg in enumerate(self.doc):
            pg.insert_text((54, 772), f"{self.stamp} | p{i+1:03d} of {n:03d}", fontname="helv", fontsize=6.5)
        self.doc.save(out, garbage=4, deflate=True, clean=True)
        chk = f.open(out); txt = "".join(p.get_text() for p in chk)
        for m in must:
            if m not in txt: raise SystemExit(f"VERIFY FAILED: '{m}' not found in {out}")
        if sum(len(list(p.widgets())) for p in chk): raise SystemExit("VERIFY FAILED: form fields present")
        return len(chk)
