const test = require('node:test')
const assert = require('node:assert/strict')
const { unionRects } = require('../app/client/electron/overlay-bounds.cjs')

test('unionRects returns a padded bounded work-area rectangle', () => {
  assert.deepEqual(
    unionRects([
      { x: 100, y: 200, width: 40, height: 40 },
      { x: 210, y: 250, width: 100, height: 80 },
    ], { x: 0, y: 0, width: 1920, height: 1080 }, 12),
    { x: 88, y: 188, width: 234, height: 154 },
  )
})

test('unionRects clips padding to the target work area', () => {
  assert.deepEqual(
    unionRects([{ x: -20, y: -10, width: 30, height: 30 }], { x: 0, y: 0, width: 100, height: 100 }, 12),
    { x: 0, y: 0, width: 22, height: 32 },
  )
})
