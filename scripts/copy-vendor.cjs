// Copies the third-party browser bundles we actually ship into ui/vendor/ so the
// app runs fully offline with no bundler. Run automatically on `npm install`.
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const nm = path.join(root, 'node_modules')
const vendor = path.join(root, 'app', 'client', 'ui', 'vendor')

const files = [
  ['bootstrap/dist/css/bootstrap.min.css', 'bootstrap.min.css'],
  ['bootstrap/dist/js/bootstrap.bundle.min.js', 'bootstrap.bundle.min.js'],
  ['bootstrap-icons/font/bootstrap-icons.min.css', 'bootstrap-icons.min.css'],
  ['bootstrap-icons/font/fonts/bootstrap-icons.woff', 'fonts/bootstrap-icons.woff'],
  ['bootstrap-icons/font/fonts/bootstrap-icons.woff2', 'fonts/bootstrap-icons.woff2'],
  ['fengari-web/dist/fengari-web.js', 'fengari-web.js'],
]

fs.mkdirSync(path.join(vendor, 'fonts'), { recursive: true })
let copied = 0
for (const [src, dest] of files) {
  const from = path.join(nm, src)
  if (!fs.existsSync(from)) {
    console.warn(`copy-vendor: missing ${src} (did npm install finish?)`)
    continue
  }
  fs.copyFileSync(from, path.join(vendor, dest))
  copied++
}
console.log(`copy-vendor: ${copied}/${files.length} files -> ui/vendor/`)

// Monaco editor (the Filter Editor IDE) ships as its AMD "min/vs" bundle. It's large (~14 MB) and
// version-pinned in devDependencies, so we regenerate the vendored copy from node_modules when it's
// present. If monaco-editor isn't installed we leave the committed copy untouched (skip, don't wipe)
// so a checkout without a full install still runs.
const monacoVs = path.join(nm, 'monaco-editor', 'min', 'vs')
const monacoDest = path.join(vendor, 'monaco', 'vs')
if (fs.existsSync(monacoVs)) {
  fs.rmSync(monacoDest, { recursive: true, force: true })
  fs.cpSync(monacoVs, monacoDest, { recursive: true })
  console.log('copy-vendor: monaco min/vs -> ui/vendor/monaco/vs')
} else {
  console.log('copy-vendor: monaco-editor not installed — keeping the committed ui/vendor/monaco copy')
}
