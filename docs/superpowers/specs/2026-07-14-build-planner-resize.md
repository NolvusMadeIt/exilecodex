# Build Planner resize and rendering

## Decision

Treat the embedded Path of Building surface as a native-pixel workspace. The
host widget may be resized and repositioned, but it must not scale the PoB
iframe. The planner keeps a 1320x900 CSS-pixel viewport and the surrounding
widget scrolls when the available area is smaller.

## Rationale

The previous iframe used `width: 100%`, `height: 100%`, and desktop-wide
Chromium zoom. Both paths changed PoB's effective rendering scale, causing its
canvas/images to interpolate and making text appear to grow with the shell.
The fix removes desktop page zoom and gives PoB an explicit viewport.

## Acceptance criteria

- Resizing the ExileCodex window does not change PoB's font or image scale.
- Enlarging the Build Planner keeps the passive tree and other PoB imagery sharp.
- A smaller widget exposes scrollbars rather than stretching the PoB surface.
- Browser builds retain their existing font-scale preference.
