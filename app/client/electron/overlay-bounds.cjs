// Pure geometry for the bounded overlay host. Rectangles are screen-space CSS
// pixels; keeping this separate makes the sizing policy testable without Electron.
function finite(v) { return Number.isFinite(Number(v)) }

function unionRects(rects, workArea, margin = 12) {
  const wa = workArea || { x: 0, y: 0, width: 1, height: 1 }
  const safe = (v, fallback) => finite(v) ? Number(v) : fallback
  const leftEdge = safe(wa.x, 0)
  const topEdge = safe(wa.y, 0)
  const rightEdge = leftEdge + Math.max(1, safe(wa.width, 1))
  const bottomEdge = topEdge + Math.max(1, safe(wa.height, 1))
  const pad = Math.max(0, safe(margin, 0))
  const valid = (Array.isArray(rects) ? rects : []).map((r) => ({
    x: safe(r && r.x, NaN), y: safe(r && r.y, NaN),
    width: safe(r && r.width, 0), height: safe(r && r.height, 0),
  })).filter((r) => finite(r.x) && finite(r.y) && r.width > 0 && r.height > 0)

  if (!valid.length) {
    const width = Math.min(64, rightEdge - leftEdge)
    const height = Math.min(64, bottomEdge - topEdge)
    return { x: Math.round(rightEdge - width), y: Math.round(bottomEdge - height), width, height }
  }

  const left = Math.max(leftEdge, Math.min(rightEdge, Math.min(...valid.map((r) => r.x)) - pad))
  const top = Math.max(topEdge, Math.min(bottomEdge, Math.min(...valid.map((r) => r.y)) - pad))
  const right = Math.max(left, Math.min(rightEdge, Math.max(...valid.map((r) => r.x + r.width)) + pad))
  const bottom = Math.max(top, Math.min(bottomEdge, Math.max(...valid.map((r) => r.y + r.height)) + pad))
  return {
    x: Math.round(left), y: Math.round(top),
    width: Math.max(1, Math.round(right - left)),
    height: Math.max(1, Math.round(bottom - top)),
  }
}

module.exports = { unionRects }
