const test = require('node:test')
const assert = require('node:assert/strict')
const { createOverlayLayoutController } = require('../app/client/electron/overlay-controller.cjs')

test('bounded overlay lifecycle moves once and deduplicates identical layouts', () => {
  let bounds = { x: 0, y: 0, width: 220, height: 220 }
  const moves = []
  const origins = []
  const controller = createOverlayLayoutController({
    getBounds: () => bounds,
    getWorkArea: () => ({ x: 0, y: 0, width: 1920, height: 1080 }),
    setBounds: (next) => { moves.push(next); bounds = next },
    sendOrigin: (origin) => origins.push(origin),
  })
  const layout = { rects: [{ id: 'orb', x: 100, y: 120, width: 46, height: 46 }, { id: 'market', x: 160, y: 160, width: 300, height: 240 }] }
  assert.equal(controller.update(layout).changed, true)
  // The renderer compensates its local coordinates after the origin shift.
  const shiftedLayout = { rects: [{ id: 'orb', x: 12, y: 12, width: 46, height: 46 }, { id: 'market', x: 72, y: 52, width: 300, height: 240 }] }
  assert.equal(controller.update(shiftedLayout).changed, false)
  assert.equal(moves.length, 1)
  assert.equal(origins.length, 1)
  assert.deepEqual(moves[0], { x: 88, y: 108, width: 384, height: 304 })
  assert.deepEqual(origins[0], { dx: 88, dy: 108, originX: 88, originY: 108 })
})
