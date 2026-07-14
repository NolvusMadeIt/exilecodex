# Build Planner Loader and Stable Canvas Design

**Date:** 2026-07-14  
**Status:** Approved concept; implementation pending

## Problem

The embedded Build Planner currently presents a blank surface while its WebAssembly runtime, game data, and passive-tree assets load. Its host canvas is also in auto-size mode: resizing the ExileCodex window changes the PoB render surface itself. That causes the passive-tree composition and background art to recalculate and stretch during a window drag, unlike the standalone Path of Building application.

## Product intent

Treat the planner as a stable PoB drafting board inside a flexible shell. Users should see what the planner is doing during startup, and resizing the shell should fit the existing PoB composition rather than redraw it at a new aspect ratio.

## Scope

### In scope

- Add a visible planner loading overlay inside the Build Planner frame.
- Report meaningful startup phases from the planner runtime to its host page.
- Provide a host-side fallback phase when the embedded runtime cannot report progress.
- Keep a stable logical PoB canvas (the current 1550x800 baseline) while the host window changes size.
- Fit and center that canvas with letterboxing when the window ratio differs, preserving the background and tree proportions.
- Keep resize events coalesced so a drag does not trigger a burst of expensive render reallocations.
- Increase the normal desktop window default modestly (target about 1440x900, clamped to the monitor work area).
- Keep the existing splash visual language, increasing its footprint only enough to support the larger startup log without making it dominant.

### Out of scope

- Replacing the WebAssembly PoB runtime or its rendering backend.
- Inventing byte or percentage progress that the runtime cannot measure.
- Changing PoB gameplay/layout semantics, tree data, or asset contents.
- Removing the user-facing fixed/auto canvas controls; the default behavior changes, but an explicit user choice remains respected.

## Design

### Planner loading overlay

The host plugin creates a loading layer over the iframe. It uses the existing ExileCodex dark/gold visual language, a spinner or animated indeterminate bar, a concise phase title, and an optional detail line. The overlay is removed only after the planner signals that the runtime has attached and produced its first usable frame.

The runtime sends semantic phase messages through `window.parent.postMessage` with a namespaced event and a small payload. Proposed phases:

1. `prepare` — “Preparing the planner”
2. `runtime` — “Starting the PoB runtime”
3. `data` — “Loading game data”
4. `tree` — “Building the passive tree”
5. `ready` — “Planner ready”
6. `error` — “Planner could not finish loading” with a retry/reload affordance if the existing host contract permits it

The host validates `event.source === iframe.contentWindow` and the expected event name before updating the overlay. If no phase arrives for a bounded interval, the host keeps the loader visible and changes the detail line to a truthful waiting message; it does not fabricate completion. A normal ready event is authoritative. Existing runtime errors remain visible in the developer console and are also surfaced as a user-readable error state.

### Stable canvas behavior

The planner driver keeps a logical render surface at its established minimum baseline (1550x800). Window resize updates the container bounds and the CSS transform/translation, not the logical PoB render dimensions. The fit algorithm:

- chooses the largest uniform scale that keeps the logical canvas visible in the available container;
- centers the result on both axes;
- uses dark letterbox margins when the aspect ratios differ;
- preserves pointer-coordinate inversion through the same transform;
- recalculates only after the existing resize coalescer settles, so dragging remains responsive.

The first attach computes a fit scale for the available container. A user-selected fixed size/zoom remains an explicit override. Returning to auto mode returns to the stable logical baseline and fit behavior rather than making the logical surface equal to every container size.

### Desktop sizing

The normal desktop shell targets approximately 1440x900 on first launch, constrained by the primary display work area and the existing minimum bounds. The planner plugin keeps enough internal room for the stable canvas while remaining usable on smaller displays. The native startup splash is enlarged modestly (roughly 540x400) and retains its current compact panel, log, and progress styling.

## Error and fallback behavior

- If the iframe never loads, the host shows a planner error state rather than an empty black rectangle.
- If phase messages are delayed, the overlay shows the last confirmed phase plus a waiting detail.
- If a browser/runtime path does not support `postMessage` delivery as expected, the host fallback still provides a visible indeterminate loader and clears it when the iframe reports its first ready frame through the existing handshake.
- If the stable canvas cannot fit the available minimum size, it scales down uniformly; it never stretches independently on either axis.

## Verification

### Automated

- Unit-test the phase message parser/validator and the host fallback timer.
- Unit-test the canvas fit/letterbox math for wide, tall, and undersized containers.
- Preserve and rerun the resize-coalescer tests and driver TypeScript check.
- Build the nested planner bundle with relative asset paths and copy the verified output into `app/vendor/pobweb`.

### Manual

- Open Build Planner from a clean profile and observe each loader state before the first passive-tree frame.
- Confirm the loader disappears only when the planner is usable.
- Resize the ExileCodex window through wide, tall, and narrow ratios; confirm the PoB background and tree remain proportionally unchanged and centered.
- Drag-resize repeatedly and verify no blank frame, runaway CPU, or input-coordinate drift.
- Check the default desktop window and splash on a smaller monitor so both remain clamped and usable.

## Acceptance criteria

1. Users can see an honest, phase-based loading state while Build Planner starts.
2. A successful planner startup ends in the rendered PoB UI, not a permanent overlay.
3. Resizing the shell never independently stretches the PoB background or passive-tree art.
4. Pointer interaction still maps to the correct PoB coordinates after fitting and letterboxing.
5. The normal desktop window is modestly larger by default without exceeding the monitor work area.
6. Existing planner assets, tree data, and unrelated plugins remain unchanged.
