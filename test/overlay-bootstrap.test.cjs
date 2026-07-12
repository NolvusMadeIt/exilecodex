const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

const root = path.resolve(__dirname, '..')

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

test('Lua entrypoints remain parser-ordered and synchronous', () => {
  const html = read('app/client/ui/index.html')
  const scripts = Array.from(html.matchAll(/<script\b[^>]*>/gi), (match) => match[0])
  const luaScripts = scripts.filter((tag) => /\btype=["']application\/lua["']/i.test(tag))

  assert.ok(luaScripts.length > 0, 'expected Lua entrypoints in the UI document')
  assert.equal(
    luaScripts.find((tag) => /\basync(?:\s|=|>|\/)/i.test(tag)),
    undefined,
    'external Lua scripts must not use async because Fengari executes them in arrival order',
  )

  const sources = luaScripts.map((tag) => tag.match(/\bsrc=["']([^"']+)["']/i)?.[1])
  assert.equal(sources[0], '../lua/core/ui.lua', 'ui.lua must initialize the codex global first')
  assert.equal(sources.at(-1), '../lua/core/init.lua', 'init.lua must mount the UI last')

  const fengariIndex = scripts.findIndex((tag) => /\bsrc=["'][^"']*fengari-web\.js["']/i.test(tag))
  const firstLuaIndex = scripts.findIndex((tag) => /\btype=["']application\/lua["']/i.test(tag))
  assert.ok(fengariIndex >= 0 && fengariIndex < firstLuaIndex, 'Fengari must observe Lua tags while the document is parsing')
})

test('the sandboxed preload obtains Supabase config from the main process', () => {
  const preload = read('app/client/electron/preload.cjs')
  const main = read('app/client/electron/main.cjs')

  assert.doesNotMatch(preload, /require\(["'](?:fs|path)["']\)/, 'sandboxed preloads cannot import filesystem modules')
  assert.match(preload, /ipcRenderer\.sendSync\(["']ec:get-supabase-config["']\)/)
  assert.match(main, /ipcMain\.on\(["']ec:get-supabase-config["']/)
  assert.match(main, /\bsandbox:\s*true\b/, 'the BrowserWindow preload should remain sandboxed')
})
