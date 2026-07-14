const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

test('main process has bounded overlay lifecycle hooks', () => {
  const main = read('app/client/electron/main.cjs')
  assert.match(main, /overlay-controller\.cjs/)
  assert.match(main, /overlayHost === 'legacy'/)
  assert.match(main, /overlayInitialBounds/)
  assert.match(main, /ec:overlay-layout/)
  assert.match(main, /ec:overlay-origin/)
  assert.match(main, /ec\.overlay\.host/)
})

test('preload and renderer expose overlay geometry contracts', () => {
  assert.match(read('app/client/electron/preload.cjs'), /overlayLayout/)
  assert.match(read('app/client/electron/preload.cjs'), /onOverlayOrigin/)
  assert.match(read('app/client/ui/index.html'), /core\/overlay\.lua/)
  assert.match(read('app/client/lua/core/overlay.lua'), /request_report/)
  assert.match(read('app/client/lua/core/widgets.lua'), /codex\.overlay/)
})

test('overlay mode avoids the animated market marquee', () => {
  assert.match(read('app/client/ui/css/theme.css'), /\.shell .*mkt-tickrun|mkt-tickrun.*animation\s*:\s*none/)
})
