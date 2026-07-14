const { unionRects } = require('./overlay-bounds.cjs')

function same(a, b) {
  return a && b && a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height
}

function createOverlayLayoutController({ getBounds, getWorkArea, setBounds, sendOrigin, margin = 12 }) {
  let last = null
  return {
    reset() { last = null },
    update(payload) {
      const current = getBounds()
      const wa = getWorkArea(current)
      const rects = Array.isArray(payload && payload.rects) ? payload.rects.map((r) => ({
        x: current.x + Number(r.x || 0), y: current.y + Number(r.y || 0),
        width: Number(r.width || 0), height: Number(r.height || 0),
      })) : []
      const next = unionRects(rects, wa, margin)
      if (same(last, next) || same(current, next)) {
        last = next
        return { changed: false, bounds: next }
      }
      const dx = next.x - current.x
      const dy = next.y - current.y
      last = next
      setBounds(next)
      sendOrigin({ dx, dy, originX: next.x, originY: next.y })
      return { changed: true, bounds: next, dx, dy }
    },
  }
}

module.exports = { createOverlayLayoutController }
