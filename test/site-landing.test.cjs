const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'site', 'index.html');
const cssPath = path.join(root, 'site', 'css', 'style.css');
const scriptPath = path.join(root, 'site', 'js', 'site.js');
const packagePath = path.join(root, 'package.json');

const html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');
const script = fs.existsSync(scriptPath) ? fs.readFileSync(scriptPath, 'utf8') : '';
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const siteVersion = '1.0.0';

test('landing page is structured as an accessible product console', () => {
  assert.match(html, /class="skip-link"/);
  assert.match(html, /id="module-console"/);
  assert.match(html, /role="tablist"/);
  assert.equal((html.match(/role="tab"/g) || []).length, 3);
  assert.equal((html.match(/aria-selected="(?:true|false)"/g) || []).length, 3);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /id="module-ledger"/);
  assert.match(html, /id="operation"/);
  assert.match(html, /id="build-queue"/);
  assert.match(html, /id="install"/);
  assert.match(html, /<script src="js\/site\.js" defer><\/script>/);
});

test('landing page uses the real local captures and truthful release details', () => {
  for (const capture of ['img/hero.webp', 'img/market.webp', 'img/preview.webp']) {
    assert.match(html, new RegExp(capture.replace('.', '\\.')));
  }

  assert.match(html, /Real build capture/i);
  assert.match(html, /older filter branding/i);
  assert.match(html, new RegExp(pkg.version.replace('.', '\\.')));
  assert.match(html, /Windows 10\s*\/\s*11/i);
  assert.match(html, /https:\/\/github\.com\/NolvusMadeIt\/exilecodex\/releases\/latest/);
});

test('landing page publishes its own revision separately from the app build', () => {
  assert.match(html, new RegExp(`<meta name="site-version" content="${siteVersion.replace('.', '\\.')}"`));
  assert.match(html, new RegExp(`Site\\s*\/\\s*${siteVersion.replace('.', '\\.')}`, 'i'));
  assert.match(html, new RegExp(`ECX\\s*\/\\s*${pkg.version.replace('.', '\\.')}`, 'i'));
});

test('legacy AI landing-page skeleton does not regress', () => {
  const source = `${html}\n${css}`;
  for (const legacy of ['eyebrow', 'glow', 'chip', 'fcard', 'pillar', 'rcard', 'reveal']) {
    assert.doesNotMatch(source, new RegExp(`\\b${legacy}\\b`, 'i'), `legacy pattern remains: ${legacy}`);
  }

  assert.doesNotMatch(css, /perspective\s*\(/i);
  assert.doesNotMatch(css, /font-family\s*:[^;]*\bInter\b/i);
  assert.doesNotMatch(html, /safe for your account/i);
  assert.doesNotMatch(html, /<div[^>]+role="button"/i);
});

test('landing page makes no remote visual or code requests', () => {
  assert.doesNotMatch(html, /<(?:link|script|img)[^>]+(?:href|src)="https?:\/\//i);
  assert.doesNotMatch(css, /url\(\s*["']?https?:\/\//i);
  assert.doesNotMatch(css, /@import/i);
});

test('module console script synchronizes content and keyboard tab state', () => {
  assert.ok(script.length > 0, 'site/js/site.js must exist');
  for (const key of ['filter', 'market', 'preview']) {
    assert.match(script, new RegExp(`${key}\\s*:`));
  }

  for (const field of ['src', 'alt', 'title', 'summary', 'input', 'mode', 'state']) {
    assert.match(script, new RegExp(`${field}\\s*:`));
  }

  for (const id of ['moduleCapture', 'moduleTitle', 'moduleSummary', 'moduleInput', 'moduleMode', 'moduleState']) {
    assert.match(script, new RegExp(id));
  }

  assert.match(script, /aria-selected/);
  assert.match(script, /tabIndex/);
  for (const key of ['ArrowLeft', 'ArrowRight', 'Home', 'End']) {
    assert.match(script, new RegExp(key));
  }
});
