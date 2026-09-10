from pathlib import Path
from collections import deque
from PIL import Image
import numpy as np

src = Path(r"D:\glorious_website\public\Products")
files = sorted([p for p in src.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}])
print(f"files={len(files)}", flush=True)

def is_near_white(pix, tol):
    r, g, b = int(pix[0]), int(pix[1]), int(pix[2])
    return r >= 255 - tol and g >= 255 - tol and b >= 255 - tol

def flood_mask(arr, tol=32):
    h, w = arr.shape[:2]
    visited = np.zeros((h, w), dtype=bool)
    q = deque()

    def try_seed(y, x):
        if not visited[y, x] and is_near_white(arr[y, x], tol):
            visited[y, x] = True
            q.append((y, x))

    step_x = max(1, w // 80)
    step_y = max(1, h // 80)
    for x in range(0, w, step_x):
        try_seed(0, x)
        try_seed(h - 1, x)
    for y in range(0, h, step_y):
        try_seed(y, 0)
        try_seed(y, w - 1)
    for y, x in ((0, 0), (0, w - 1), (h - 1, 0), (h - 1, w - 1)):
        try_seed(y, x)

    while q:
        y, x = q.popleft()
        for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and is_near_white(arr[ny, nx], tol):
                visited[ny, nx] = True
                q.append((ny, nx))
    return visited

def feather(mask, arr, tol=40):
    """Softer alpha for near-white fringe next to removed bg."""
    h, w = mask.shape
    alpha = np.where(mask, 0, arr[:, :, 3]).astype(np.uint8)
    # Partial transparency for near-white non-flooded pixels near bg? skip heavy morph
    # Soften: for non-mask pixels that are very near white, reduce alpha by distance
    r = arr[:, :, 0].astype(np.int16)
    g = arr[:, :, 1].astype(np.int16)
    b = arr[:, :, 2].astype(np.int16)
    mn = np.minimum(np.minimum(r, g), b)
    # only soften pixels already not fully opaque product centers
    near = (~mask) & (mn >= 255 - tol)
    # alpha scale 0 at 255, 255 at (255-tol)
    scale = ((255 - mn[near]).astype(np.float32) / float(tol) * 255.0).clip(0, 255).astype(np.uint8)
    alpha[near] = np.minimum(alpha[near], scale)
    return alpha

def trim(im: Image.Image, pad=10):
    bbox = im.split()[-1].getbbox()
    if not bbox:
        return im
    l, t, r, b = bbox
    l = max(0, l - pad)
    t = max(0, t - pad)
    r = min(im.width, r + pad)
    b = min(im.height, b + pad)
    return im.crop((l, t, r, b))

ok = fail = 0
for i, p in enumerate(files, 1):
    try:
        im = Image.open(p).convert("RGBA")
        arr = np.array(im)
        # If already mostly transparent, still re-trim
        if arr[:, :, 3].mean() < 250:
            # already has transparency (rembg) — just trim
            out_im = trim(im, pad=10)
        else:
            mask = flood_mask(arr, tol=34)
            arr[:, :, 3] = feather(mask, arr, tol=42)
            out_im = trim(Image.fromarray(arr, "RGBA"), pad=10)
        out = src / f"{p.stem}.png"
        out_im.save(out, "PNG", optimize=True)
        if p.suffix.lower() != ".png" and out.resolve() != p.resolve():
            p.unlink(missing_ok=True)
        ok += 1
        print(f"[{i}/{len(files)}] OK {p.name} -> {out.name} {out_im.size} transparent={arr[:,:,3].mean() if False else 'y'}", flush=True)
    except Exception as e:
        fail += 1
        print(f"[{i}/{len(files)}] FAIL {p.name}: {e}", flush=True)

print(f"DONE ok={ok} fail={fail}", flush=True)
