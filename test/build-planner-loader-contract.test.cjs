const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

const root = path.resolve(__dirname, '..')

test('build planner host declares a validated phase loader', () => {
  const plugin = fs.readFileSync(path.join(root, 'app', 'addons', 'build-planner', 'plugin.lua'), 'utf8')
  const css = fs.readFileSync(path.join(root, 'app', 'client', 'ui', 'css', 'theme.css'), 'utf8')

  assert.match(plugin, /(?:event|ev)\.source\s*(?:===|~=)\s*frame\.contentWindow/)
  assert.match(plugin, /Preparing the planner/)
  assert.match(plugin, /msg\.detail/)
  assert.match(plugin, /data-error|planner-error/)
  assert.match(plugin, /12000|setTimeout/)
  assert.match(css, /pob-loader/)
  assert.match(css, /@keyframes/)
})

test('desktop shell and splash targets leave room for the planner', () => {
  const main = fs.readFileSync(path.join(root, 'app', 'client', 'electron', 'main.cjs'), 'utf8')
  const splash = fs.readFileSync(path.join(root, 'app', 'client', 'ui', 'splash.html'), 'utf8')

  assert.match(main, /Math\.min\(1440, wa\.width - 80\)/)
  assert.match(main, /width: 540, height: 400/)
  assert.match(splash, /max-width:\s*500px/)
  assert.match(splash, /height:\s*170px/)
})
