const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const exists = (file) => fs.existsSync(path.join(root, file))

test('Market Companion is the startup fallback', () => {
  assert.match(read('app/client/lua/core/init.lua'), /market-companion/)
  assert.match(read('app/client/lua/core/settings.lua'), /market-companion/)
})

test('first-run campaign reset is explicit and scoped', () => {
  const guide = read('app/client/lua/core/guide.lua')
  const init = read('app/client/lua/core/init.lua')
  assert.match(guide, /reset_campaign_state/)
  for (const key of ['ec.step.campaign-league-start', 'ec.goals.campaign-league-start', 'ec.timer.acc', 'ec.timer.run', 'ec.timer.ts']) {
    assert.match(guide, new RegExp(key.replaceAll('.', '\\.'), 'g'))
  }
  assert.match(init, /onboarding\.completed/)
  assert.match(init, /reset_campaign_state/)
  assert.match(init, /localStorage.*removeItem/)
  assert.match(init, /ec\.default_view.*market-companion/)
})

test('renderer exposes tutorial coordination hooks', () => {
  assert.match(read('app/client/ui/index.html'), /onboarding\.lua/)
  assert.match(read('app/client/lua/core/widgets.lua'), /widget-id/)
  assert.match(read('app/client/lua/core/init.lua'), /on_menu_open|tutorial/)
})

test('first-launch tour is embedded in the main app surface', () => {
  const index = read('app/client/ui/index.html')
  const onboarding = read('app/client/ui/js/onboarding.js')
  const preload = read('app/client/electron/preload.cjs')
  assert.match(index, /id="onboarding"/)
  assert.match(index, /onboarding\.js/)
  assert.match(onboarding, /onTutorialState|onboarding/)
  assert.match(preload, /onTutorialState/)
  assert.doesNotMatch(read('app/client/electron/main.cjs'), /createTutorialWindow\(\)/)
})

test('first launch uses a normal foreground window before overlay mode is enabled', () => {
  assert.match(read('app/client/electron/main.cjs'), /onboarding\.completed/)
  assert.match(read('app/client/electron/main.cjs'), /currentMode\s*=\s*.*window/)
})

test('onboarding supports a durable suppression preference and reset path', () => {
  const index = read('app/client/ui/index.html')
  const js = read('app/client/ui/js/onboarding.js')
  const lua = read('app/client/lua/core/onboarding.lua')
  const settings = read('app/client/lua/core/settings.lua')
  assert.match(index, /ec-onboarding-never/)
  assert.match(js, /ec\.onboarding\.suppressed/)
  assert.match(lua, /onboarding\.suppressed/)
  assert.match(settings, /set-reset-tour/)
})

test('Electron tutorial bridge and page exist', () => {
  assert.ok(exists('app/client/electron/tutorial.html'))
  assert.ok(exists('app/client/electron/tutorial-preload.cjs'))
  assert.match(read('app/client/electron/tutorial-preload.cjs'), /ecTutorial/)
  assert.match(read('app/client/electron/main.cjs'), /ec:tutorial-action/)
  const page = read('app/client/electron/tutorial.html')
  for (const label of ['Welcome', 'Market Companion', 'orb', 'Settings', 'Skip']) assert.match(page, new RegExp(label, 'i'))
})
