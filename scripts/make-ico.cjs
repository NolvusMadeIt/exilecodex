// Generate a multi-resolution Windows .ico from the app logo using Electron's nativeImage
// (no external image deps). Run with: npm run make:icon
//
// Produces build/icon.ico with PNG-compressed entries at the standard icon sizes. PNG-in-ICO
// is supported on Windows Vista+ (our targets are Win10/11) and accepted by electron-builder.
const { app, nativeImage } = require('electron')
const fs = require('node:fs')
const path = require('node:path')

const SRC = path.join(__dirname, '..', 'electron', 'icon.png')
const OUT = path.join(__dirname, '..', 'build', 'icon.ico')
const SIZES = [16, 24, 32, 48, 64, 128, 256]

app.disableHardwareAcceleration()
app.whenReady().then(() => {
  const base = nativeImage.createFromPath(SRC)
  if (base.isEmpty()) { console.error('Source icon is empty/unreadable:', SRC); app.exit(1); return }

  const pngs = SIZES.map(s => base.resize({ width: s, height: s, quality: 'best' }).toPNG())

  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: 1 = icon
  header.writeUInt16LE(pngs.length, 4)

  const dir = Buffer.alloc(16 * pngs.length)
  let offset = header.length + dir.length
  pngs.forEach((png, i) => {
    const s = SIZES[i]
    const e = i * 16
    dir.writeUInt8(s >= 256 ? 0 : s, e + 0) // width  (0 means 256)
    dir.writeUInt8(s >= 256 ? 0 : s, e + 1) // height (0 means 256)
    dir.writeUInt8(0, e + 2)  // palette colours
    dir.writeUInt8(0, e + 3)  // reserved
    dir.writeUInt16LE(1, e + 4)   // colour planes
    dir.writeUInt16LE(32, e + 6)  // bits per pixel
    dir.writeUInt32LE(png.length, e + 8)  // image data size
    dir.writeUInt32LE(offset, e + 12)     // image data offset
    offset += png.length
  })

  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, Buffer.concat([header, dir, ...pngs]))
  console.log(`Wrote ${OUT} — ${fs.statSync(OUT).size} bytes, sizes: ${SIZES.join(', ')}`)
  app.exit(0)
})
