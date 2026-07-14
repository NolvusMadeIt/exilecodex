const assert = require('node:assert/strict')
const { execFileSync } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const test = require('node:test')

const root = path.resolve(__dirname, '..')
const bumpScript = path.join(root, 'scripts', 'bump-versions.cjs')

const write = (fixture, relativePath, contents) => {
  const target = path.join(fixture, relativePath)
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, contents)
}

test('app bump synchronizes every release version surface', (t) => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'exilecodex-bump-'))
  t.after(() => fs.rmSync(fixture, { recursive: true, force: true }))

  write(fixture, 'package.json', '{"name":"fixture","version":"1.2.3-alpha"}\n')
  write(fixture, 'package-lock.json', '{"name":"fixture","version":"1.2.3-alpha","packages":{"":{"version":"1.2.3-alpha"}}}\n')
  write(fixture, 'app/plugins.manifest.json', '{"app":"1.2.3-alpha","plugins":{}}\n')
  write(fixture, 'app/client/lua/core/ui.lua', 'codex.VERSION = "1.2.3-alpha"\n')
  write(fixture, 'app/client/lua/core/boot.lua', 'step("ExileCodex 1.2.3-alpha available")\n')
  write(fixture, 'app/client/ui/splash.html', '<p>ExileCodex 1.2.3-alpha available</p>\n')
  write(fixture, 'site/index.html', '<meta name="site-version" content="1.0.0"><a href="/v1.2.3-alpha/ExileCodex-Setup-1.2.3-alpha.exe">ECX / 1.2.3-alpha</a>\n')
  write(fixture, 'app/client/runtime.js', 'module.exports = true\n')

  execFileSync('git', ['init'], { cwd: fixture, stdio: 'ignore' })
  execFileSync('git', ['add', '.'], { cwd: fixture, stdio: 'ignore' })
  execFileSync(process.execPath, [bumpScript], { cwd: fixture, stdio: 'ignore' })

  const pkg = JSON.parse(fs.readFileSync(path.join(fixture, 'package.json'), 'utf8'))
  const lock = JSON.parse(fs.readFileSync(path.join(fixture, 'package-lock.json'), 'utf8'))
  const manifest = JSON.parse(fs.readFileSync(path.join(fixture, 'app/plugins.manifest.json'), 'utf8'))
  assert.equal(pkg.version, '1.2.4-alpha')
  assert.equal(lock.version, pkg.version)
  assert.equal(lock.packages[''].version, pkg.version)
  assert.equal(manifest.app, pkg.version)

  for (const relativePath of [
    'app/client/lua/core/ui.lua',
    'app/client/lua/core/boot.lua',
    'app/client/ui/splash.html',
    'site/index.html',
  ]) {
    const contents = fs.readFileSync(path.join(fixture, relativePath), 'utf8')
    assert.match(contents, /1\.2\.4-alpha/, relativePath)
    assert.doesNotMatch(contents, /1\.2\.3-alpha/, relativePath)
  }

  assert.match(fs.readFileSync(path.join(fixture, 'site/index.html'), 'utf8'), /site-version" content="1\.0\.0"/)

  const staged = execFileSync('git', ['diff', '--cached', '--name-only'], { cwd: fixture, encoding: 'utf8' })
  for (const relativePath of [
    'package.json',
    'package-lock.json',
    'app/plugins.manifest.json',
    'app/client/lua/core/ui.lua',
    'app/client/lua/core/boot.lua',
    'app/client/ui/splash.html',
    'site/index.html',
  ]) {
    assert.match(staged, new RegExp(`^${relativePath.replaceAll('/', '\\/').replaceAll('.', '\\.')}$`, 'm'))
  }
})
