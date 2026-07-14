const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')
const assert = require('node:assert/strict')

const root = path.resolve(__dirname, '..')
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), 'utf8')

test('window mode uses the custom toolbar while overlay remains frameless', () => {
  const main = read('app', 'client', 'electron', 'main.cjs')
  assert.ok((main.match(/frame: false/g) || []).length >= 2)
  assert.match(main, /ec:window-minimize/)
  assert.match(main, /ec:window-maximize-toggle/)
  assert.match(main, /ec:window-close/)
})

test('renderer exposes the window toolbar and keeps it window-only', () => {
  const index = read('app', 'client', 'ui', 'index.html')
  const onboarding = read('app', 'client', 'ui', 'js', 'onboarding.js')
  assert.match(index, /id="ec-window-toolbar"/)
  assert.match(index, /id="ec-window-minimize"/)
  assert.match(index, /id="ec-window-maximize"/)
  assert.match(index, /id="ec-window-close"/)
  assert.match(onboarding, /shell\.mode === 'window'/)
  assert.match(onboarding, /windowMaximizeToggle/)
})

test('launcher has explicit normal and plugins contexts', () => {
  const init = read('app', 'client', 'lua', 'core', 'init.lua')
  assert.match(init, /__context-normal/)
  assert.match(init, /__context-plugins/)
  assert.match(init, /menu_context = "normal"/)
  assert.match(init, /menu_context == "plugins"/)
})
