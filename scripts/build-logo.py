# Generates the Exile Codex logo set with the game's typeface (Fontin SmallCaps):
#   public/128.png      — app icon: dark plaque, gold ring, EC monogram (gold gradient)
#   public/wordmark.png — "Exile Codex" wordmark, gold gradient, transparent bg (2x for retina)
#
#   python scripts/build-logo.py <path-to-Fontin-SmallCaps.otf>
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
FONT = sys.argv[1] if len(sys.argv) > 1 else None
if not FONT or not Path(FONT).exists():
    sys.exit('usage: build-logo.py <Fontin-SmallCaps.otf>')

GOLD_TOP, GOLD_MID, GOLD_LOW = (240, 217, 160), (201, 164, 79), (138, 106, 48)

def gold_gradient(w, h):
    g = Image.new('RGB', (w, h))
    for y in range(h):
        t = y / max(1, h - 1)
        if t < 0.5:
            a, b, f = GOLD_TOP, GOLD_MID, t * 2
        else:
            a, b, f = GOLD_MID, GOLD_LOW, (t - 0.5) * 2
        g.paste(tuple(int(a[i] + (b[i] - a[i]) * f) for i in range(3)), (0, y, w, y + 1))
    return g

def gold_text(text, font_size):
    font = ImageFont.truetype(FONT, font_size)
    pad = font_size // 2
    dummy = ImageDraw.Draw(Image.new('L', (1, 1)))
    x0, y0, x1, y1 = dummy.textbbox((0, 0), text, font=font)
    w, h = x1 - x0 + pad * 2, y1 - y0 + pad * 2
    mask = Image.new('L', (w, h), 0)
    ImageDraw.Draw(mask).text((pad - x0, pad - y0), text, 255, font=font)
    out = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    # drop shadow
    shadow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    shadow.paste((0, 0, 0, 230), (0, 0), mask)
    out.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(3)), (2, 3))
    # dark stroke (edge weight so the gold reads on any surface)
    stroke = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    stroke.paste((20, 12, 4, 255), (0, 0), mask)
    for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (1, 1), (-1, 1), (1, -1)]:
        out.alpha_composite(stroke, (dx, dy))
    # gold gradient fill
    fill = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    fill.paste(gold_gradient(w, h), (0, 0), mask)
    out.alpha_composite(fill)
    return out

# --- icon -----------------------------------------------------------------------------
S = 512
icon = Image.new('RGBA', (S, S), (0, 0, 0, 0))
d = ImageDraw.Draw(icon)
# dark plaque with a warm center glow
d.ellipse([8, 8, S - 8, S - 8], fill=(13, 10, 7, 255))
glow = Image.new('RGBA', (S, S), (0, 0, 0, 0))
ImageDraw.Draw(glow).ellipse([S * 0.22, S * 0.22, S * 0.78, S * 0.78], fill=(70, 52, 30, 140))
icon.alpha_composite(glow.filter(ImageFilter.GaussianBlur(60)))
# double gold ring (thin outer, thick inner — the game's plaque language)
d.ellipse([8, 8, S - 8, S - 8], outline=(138, 106, 48, 255), width=6)
d.ellipse([22, 22, S - 22, S - 22], outline=(201, 164, 79, 255), width=10)
d.ellipse([40, 40, S - 40, S - 40], outline=(90, 68, 34, 180), width=3)
mono = gold_text('EC', 300)
icon.alpha_composite(mono, ((S - mono.width) // 2, (S - mono.height) // 2 - 6))
icon.resize((128, 128), Image.LANCZOS).save(ROOT / 'public' / '128.png')
print('public/128.png')

# --- wordmark -------------------------------------------------------------------------
wm = gold_text('Exile Codex', 96)
wm.save(ROOT / 'public' / 'wordmark.png')
print(f'public/wordmark.png {wm.size}')
