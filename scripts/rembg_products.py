from pathlib import Path
from rembg import remove
from PIL import Image
import io, shutil

src = Path(r"D:\glorious_website\public\Products")
backup = Path(r"C:\Users\AFSAL KABEER\agent-tools\ga-products-backup-20260910")
backup.mkdir(parents=True, exist_ok=True)

files = sorted([p for p in src.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}])
print(f"files={len(files)}", flush=True)

def trim_alpha(im: Image.Image, pad=12):
    if im.mode != "RGBA":
        im = im.convert("RGBA")
    bbox = im.split()[-1].getbbox()
    if not bbox:
        return im
    l, t, r, b = bbox
    l = max(0, l - pad)
    t = max(0, t - pad)
    r = min(im.width, r + pad)
    b = min(im.height, b + pad)
    return im.crop((l, t, r, b))

ok = 0
fail = []
for i, p in enumerate(files, 1):
    try:
        bdest = backup / p.name
        if not bdest.exists():
            shutil.copy2(p, bdest)
        cut = remove(p.read_bytes())
        im = Image.open(io.BytesIO(cut)).convert("RGBA")
        im = trim_alpha(im, pad=12)
        out = src / (p.stem + ".png")
        im.save(out, "PNG", optimize=True)
        if p.suffix.lower() != ".png" and out.resolve() != p.resolve():
            p.unlink(missing_ok=True)
        ok += 1
        print(f"[{i}/{len(files)}] OK {p.name} -> {out.name} {im.size}", flush=True)
    except Exception as e:
        fail.append((p.name, str(e)))
        print(f"[{i}/{len(files)}] FAIL {p.name}: {e}", flush=True)

print(f"DONE ok={ok} fail={len(fail)}", flush=True)
for n, e in fail:
    print("FAIL", n, e, flush=True)
