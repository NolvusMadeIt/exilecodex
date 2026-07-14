const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), 'utf8');
const workflow = read('.github', 'workflows', 'release.yml');
const pkg = JSON.parse(read('package.json'));
const lock = JSON.parse(read('package-lock.json'));
const manifest = JSON.parse(read('app', 'plugins.manifest.json'));
const releaseVersion = '2.1.4-alpha';

test('release workflow creates one complete prerelease from a version tag', () => {
  assert.doesNotMatch(workflow, /workflow_dispatch/);
  assert.match(workflow, /node-version:\s*22/);
  assert.match(workflow, /electron-builder[^\r\n]*--publish never/);
  assert.doesNotMatch(workflow, /--publish always/);
  assert.equal((workflow.match(/gh release create/g) || []).length, 1);
  assert.match(workflow, /--prerelease/);
  assert.match(workflow, /\.exe\.blockmap/);
  assert.match(workflow, /latest\.yml/);
  assert.match(workflow, /releases\?per_page=100/);
  assert.match(workflow, /browser_download_url/);
  assert.match(workflow, /StatusCode[^\r\n]*-ne 200/);
  assert.doesNotMatch(JSON.stringify(pkg.scripts), /--publish always/);
});

test('release artifacts are retained together for recovery', () => {
  assert.match(workflow, /actions\/upload-artifact@v4/);
  assert.match(workflow, /dist\/\*\.exe/);
  assert.match(workflow, /dist\/\*\.exe\.blockmap/);
  assert.match(workflow, /dist\/latest\.yml/);
});

test('all app version surfaces match the release version', () => {
  assert.equal(pkg.version, releaseVersion);
  assert.equal(lock.version, releaseVersion);
  assert.equal(lock.packages[''].version, releaseVersion);
  assert.equal(manifest.app, releaseVersion);

  const installerUrl = `https://github.com/NolvusMadeIt/exilecodex/releases/download/v${releaseVersion}/ExileCodex-Setup-${releaseVersion}.exe`;
  assert.equal((read('site', 'index.html').match(new RegExp(installerUrl.replaceAll('.', '\\.'), 'g')) || []).length, 3);

  for (const file of [
    ['app', 'client', 'lua', 'core', 'boot.lua'],
    ['app', 'client', 'lua', 'core', 'ui.lua'],
    ['app', 'client', 'ui', 'splash.html'],
    ['site', 'index.html'],
  ]) {
    assert.match(read(...file), new RegExp(releaseVersion.replaceAll('.', '\\.'), 'g'), file.join('/'));
  }
});
