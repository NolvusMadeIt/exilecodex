const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

const root = path.resolve(__dirname, '..')
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), 'utf8')

test('plugin updater consumes one-payload fetch and promise callbacks', () => {
  const plugins = read('app', 'client', 'lua', 'core', 'plugins.lua')
  const boot = read('app', 'client', 'ui', 'js', 'boot.js')

  assert.match(boot, /cb\(j\)/)
  assert.match(boot, /cb\(t\)/)
  assert.match(plugins, /ecJson:get\(P\.manifest_url\(\), function\(man\)/)
  assert.match(plugins, /ecHtml:get\(src_url, function\(src\)/)
  assert.match(plugins, /ecHtml:get\(info\.url, function\(src\)/)
  assert.match(plugins, /pluginWrite\(id, info\.latest, tostring\(src\)\):then_\(function\(res\)/)
  assert.match(plugins, /ecJson:get\("\/app\/plugins\.manifest\.json", function\(man\)/)
  assert.doesNotMatch(plugins, /ecJson:get\([^\n]+function\(_,/)
  assert.doesNotMatch(plugins, /ecHtml:get\([^\n]+function\(_,/)
  assert.doesNotMatch(plugins, /:then_\(function\(_,/)
})
