const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), 'utf8');
const textExtensions = new Set(['.cjs', '.css', '.html', '.js', '.json', '.lua', '.md', '.txt', '.yml', '.yaml']);
const legacyPrefix = ['xi', 'le-'].join('');
const upstreamCredit = ['Xile', 'HUD'].join('');

function textFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'vendor' || entry.name === 'superpowers') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...textFiles(full));
    else if (textExtensions.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

const app = path.join(root, 'app');
const docs = path.join(root, 'docs');
const manifest = JSON.parse(read('app', 'plugins.manifest.json'));
const ui = read('app', 'client', 'ui', 'index.html');

test('ported addons use neutral folder names and identifiers', () => {
  for (const id of ['character', 'items', 'history', 'tools']) {
    assert.ok(fs.existsSync(path.join(app, 'addons', id, 'plugin.lua')), `${id} addon is present`);
    assert.ok(!fs.existsSync(path.join(app, 'addons', `${legacyPrefix}${id}`)), `legacy ${id} addon folder is gone`);
    assert.ok(manifest.plugins[id], `${id} is in the update manifest`);
    assert.match(manifest.plugins[id].url, new RegExp(`/app/addons/${id}/plugin\\.lua$`));
    assert.match(ui, new RegExp(`addons/${id}/plugin\\.lua`));
    assert.doesNotMatch(ui, new RegExp(`addons/${legacyPrefix}${id}/plugin\\.lua`));
    assert.match(read('app', 'addons', id, 'plugin.lua'), new RegExp(`id = "${id}"`));
  }
});

test('upstream attribution is limited to the explicit credit surfaces', () => {
  const allowed = new Set([
    path.join(root, 'ATTRIBUTION.md'),
    path.join(root, 'app', 'client', 'lua', 'core', 'settings.lua'),
  ]);
  for (const file of [...textFiles(app), ...textFiles(docs), path.join(root, 'package.json')]) {
    const source = fs.readFileSync(file, 'utf8');
    if (new RegExp(upstreamCredit, 'i').test(source)) assert.ok(allowed.has(file), `non-credit upstream trace: ${path.relative(root, file)}`);
  }
});

test('legacy xile addon names are absent from tracked text surfaces', () => {
  const files = [...textFiles(app), ...textFiles(docs), path.join(root, 'package.json')];
  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(source, new RegExp(`${legacyPrefix}(?:character|history|items|tools)`, 'i'), `legacy addon trace: ${path.relative(root, file)}`);
  }
});
