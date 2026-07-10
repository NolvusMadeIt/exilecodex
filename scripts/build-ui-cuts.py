# Builds composite/cut UI assets from the game textures in public/assets/ui/ (see
# ATTRIBUTION.md — GGG interface art, documented use). Output goes to public/assets/ui/cut/.
#
#   python scripts/build-ui-cuts.py
#
# ornateframe.png — the 8 loadingscreenborder pieces composed into ONE 9-patch image so CSS
#   border-image can draw the game's ornate carved frame around any panel (slice = 92).
#   Edges are CROPPED (never resized) and corners pasted last so the rails join seamlessly.
# btnnormal/btnhover/btnpressed.png — the 3-slice generic button (left cap + middle + right
#   cap, each 44x80) composed side by side so CSS border-image renders the button at ANY
#   height with crisp rims (slice 6 44 10 44).
from PIL import Image
from pathlib import Path

UI = Path(__file__).resolve().parent.parent / 'public' / 'assets' / 'ui'
OUT = UI / 'cut'
OUT.mkdir(exist_ok=True)

def load(name):
    return Image.open(UI / f'{name}.webp').convert('RGBA')

# --- ornate frame 9-patch -------------------------------------------------------------
C = 92  # corner size (px)
size = C * 3
img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
top, bottom = load('loadingscreenbordertop'), load('loadingscreenborderbottom')
left, right = load('loadingscreenborderleft'), load('loadingscreenborderright')
# edge strips first: crop a C-wide/tall window from the strip's center (no resizing)
img.paste(top.crop(((top.width - C) // 2, 0, (top.width - C) // 2 + C, top.height)), (C, 0))
img.paste(bottom.crop(((bottom.width - C) // 2, 0, (bottom.width - C) // 2 + C, bottom.height)), (C, size - bottom.height))
img.paste(left.crop((0, (left.height - C) // 2, left.width, (left.height - C) // 2 + C)), (0, C))
img.paste(right.crop((0, (right.height - C) // 2, right.width, (right.height - C) // 2 + C)), (size - right.width, C))
# corners on top so their flourishes overlap the rail joins
for name, pos in [('loadingscreenbordertopleft', (0, 0)), ('loadingscreenbordertopright', (size - C, 0)),
                  ('loadingscreenborderbottomleft', (0, size - C)), ('loadingscreenborderbottomright', (size - C, size - C))]:
    piece = load(name)
    img.paste(piece, pos, piece)
img.save(OUT / 'ornateframe.png')
print(f'ornateframe.png {img.size}')

# --- generic button 3-slices ----------------------------------------------------------
for state, out in [('normal', 'btnnormal'), ('hover', 'btnhover'), ('pressed', 'btnpressed')]:
    l = load(f'buttongeneric{state}left')
    m = load(f'buttongeneric{state}middle')
    r = load(f'buttongeneric{state}right')
    h = max(l.height, m.height, r.height)
    strip = Image.new('RGBA', (l.width + m.width + r.width, h), (0, 0, 0, 0))
    strip.paste(l, (0, 0))
    strip.paste(m, (l.width, 0))
    strip.paste(r, (l.width + m.width, 0))
    strip.save(OUT / f'{out}.png')
    print(f'{out}.png {strip.size}')
