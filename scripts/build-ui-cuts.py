# Builds composite/cut UI assets from the game textures in public/assets/ui/ (see
# ATTRIBUTION.md — GGG interface art, documented use). Output goes to public/assets/ui/cut/.
#
#   python scripts/build-ui-cuts.py
#
# ornateframe.png — the 8 loadingscreenborder pieces composed into ONE 9-patch image so CSS
# border-image can draw the game's ornate carved frame around any panel (slice = 92).
from PIL import Image
from pathlib import Path

UI = Path(__file__).resolve().parent.parent / 'public' / 'assets' / 'ui'
OUT = UI / 'cut'
OUT.mkdir(exist_ok=True)

def load(name):
    return Image.open(UI / f'{name}.webp').convert('RGBA')

C = 92  # corner size (px)
tl, tr = load('loadingscreenbordertopleft'), load('loadingscreenbordertopright')
bl, br = load('loadingscreenborderbottomleft'), load('loadingscreenborderbottomright')
top, bottom = load('loadingscreenbordertop'), load('loadingscreenborderbottom')
left, right = load('loadingscreenborderleft'), load('loadingscreenborderright')

# 3C x 3C canvas: corners in the corners, edge strips resized to fill the C-wide slots,
# center left transparent (the panel's own background shows through border-image fill=off).
size = C * 3
img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
img.paste(tl, (0, 0))
img.paste(tr, (size - C, 0))
img.paste(bl, (0, size - C))
img.paste(br, (size - C, size - C))
img.paste(top.resize((C, top.height)), (C, 0))
img.paste(bottom.resize((C, bottom.height)), (C, size - bottom.height))
img.paste(left.resize((left.width, C)), (0, C))
img.paste(right.resize((right.width, C)), (size - right.width, C))
img.save(OUT / 'ornateframe.png')
print(f'ornateframe.png {img.size} -> {OUT}')
