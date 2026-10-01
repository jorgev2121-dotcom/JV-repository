#!/usr/bin/env python3
"""Pretty folder index. Writes ONE new file, _INDEX.html, in the folder. Touches nothing else.
usage: python pretty_index.py "C:\\path\\to\\folder" [--manifest COU-CLASSIFY-MANIFEST.csv]
Light/dark aware, searchable, sortable by clicking headers, phone-width safe."""
import csv, html, os, sys, datetime, urllib.parse

ICON = {".pdf":"📄",".txt":"📝",".png":"🖼️",".jpg":"🖼️",".jpeg":"🖼️",".msg":"✉️",".eml":"✉️",".docx":"📘",".xlsx":"📗",".json":"🧩",".csv":"📊"}
def human(n):
    for u in ("B","kB","MB","GB"):
        if n < 1024 or u == "GB": return f"{n:.0f} {u}" if u=="B" else f"{n:.1f} {u}"
        n /= 1024
def build(folder, manifest=None):
    cat = {}
    if manifest and os.path.exists(manifest):
        for r in csv.DictReader(open(manifest, encoding="utf-8-sig")): cat[r["path"]] = (r["proposed_category"], r["confidence"])
    items = sorted(os.scandir(folder), key=lambda e: (not e.is_dir(), e.name.lower()))
    rows = []
    for e in items:
        if e.name == "_INDEX.html": continue
        st = e.stat(); ext = os.path.splitext(e.name)[1].lower()
        ic = "📁" if e.is_dir() else ("🔎" if e.name.lower().endswith(".search.txt") else ICON.get(ext, "📎"))
        size = "" if e.is_dir() else human(st.st_size)
        mod = datetime.datetime.fromtimestamp(st.st_mtime).strftime("%Y-%m-%d %H:%M")
        c = cat.get(e.path); badge = f'<span class="b {c[1].lower()}">{html.escape("COU legacy · "+c[1]) if c[0].startswith("COU") else "review"}</span>' if c else ""
        href = urllib.parse.quote(e.name) + ("/" if e.is_dir() else "")
        rows.append(f'<tr><td class="i">{ic}</td><td class="n"><a href="{href}">{html.escape(e.name)}</a> {badge}</td>'
                    f'<td data-v="{0 if e.is_dir() else st.st_size}">{size}</td><td>{mod}</td></tr>')
    title = os.path.basename(folder.rstrip("\\/")) or folder
    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title)}</title><style>
:root{{--bg:#f6f7f9;--card:#fff;--ink:#1c2430;--mute:#6b7685;--line:#e3e7ee;--acc:#1f5fbf;--hi:#1e8e5a;--me:#b7791f;--lo:#6b7685}}
@media(prefers-color-scheme:dark){{:root{{--bg:#12161c;--card:#1a2029;--ink:#e8edf4;--mute:#97a3b3;--line:#2a3340;--acc:#7db1ff;--hi:#4cc38a;--me:#e3b341}}}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui,Segoe UI,sans-serif}}
main{{max-width:980px;margin:0 auto;padding:24px 16px}}h1{{font-size:1.35rem;margin:0 0 4px;word-break:break-word}}
.sub{{color:var(--mute);margin:0 0 16px;font-size:.9rem}}input{{width:100%;padding:12px 14px;font-size:1rem;border:1px solid var(--line);border-radius:10px;background:var(--card);color:var(--ink);margin-bottom:12px}}
.card{{background:var(--card);border:1px solid var(--line);border-radius:12px;overflow:hidden}}table{{width:100%;border-collapse:collapse}}
th{{text-align:left;font-size:.78rem;text-transform:uppercase;letter-spacing:.04em;color:var(--mute);padding:10px 12px;border-bottom:1px solid var(--line);cursor:pointer;user-select:none}}
td{{padding:10px 12px;border-bottom:1px solid var(--line);font-size:.92rem;vertical-align:top}}tr:last-child td{{border:0}}tr:hover td{{background:color-mix(in srgb,var(--acc) 7%,transparent)}}
td.i{{width:34px;font-size:1.1rem}}td.n{{word-break:break-word}}a{{color:var(--acc);text-decoration:none}}a:hover{{text-decoration:underline}}
.b{{display:inline-block;font-size:.7rem;padding:1px 8px;border-radius:99px;border:1px solid currentColor;margin-left:6px;white-space:nowrap}}.b.high{{color:var(--hi)}}.b.medium{{color:var(--me)}}.b.low{{color:var(--lo)}}
td:nth-child(3),td:nth-child(4){{white-space:nowrap;color:var(--mute)}}@media(max-width:560px){{th:nth-child(4),td:nth-child(4){{display:none}}}}
</style></head><body><main><h1>{html.escape(title)}</h1><p class="sub">{len(rows)} items · built {datetime.date.today()} · read-only view</p>
<input id="q" placeholder="Type to filter…" autofocus><div class="card"><table id="t"><thead><tr><th></th><th>Name</th><th>Size</th><th>Modified</th></tr></thead><tbody>{''.join(rows)}</tbody></table></div></main>
<script>const q=document.getElementById('q'),b=document.querySelector('#t tbody');q.oninput=()=>{{const v=q.value.toLowerCase();for(const r of b.rows)r.hidden=!r.textContent.toLowerCase().includes(v)}};
document.querySelectorAll('th').forEach((h,i)=>h.onclick=()=>{{if(!i)return;const d=h.dataset.d=h.dataset.d==='1'?'-1':'1';[...b.rows].sort((x,y)=>{{const a=x.cells[i].dataset.v??x.cells[i].textContent,c=y.cells[i].dataset.v??y.cells[i].textContent;return(isNaN(a)||isNaN(c)?a.localeCompare(c):a-c)*d}}).forEach(r=>b.append(r))}});</script></body></html>"""
if __name__ == "__main__":
    if len(sys.argv) < 2: sys.exit(__doc__)
    f = sys.argv[1]; m = sys.argv[sys.argv.index("--manifest")+1] if "--manifest" in sys.argv else None
    out = os.path.join(f, "_INDEX.html"); open(out, "w", encoding="utf-8").write(build(f, m)); print("wrote", out)
