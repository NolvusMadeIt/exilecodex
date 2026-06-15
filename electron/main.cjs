// Nolvus's Filter — Windows desktop shell.
//
// This is intentionally thin: it's the same web build (dist/) wrapped in a native window.
// By default it serves the bundled build through a custom `app://` protocol so the app works
// fully offline and self-contained. The app uses absolute asset paths (/assets, /data,
// /sounds), which a custom secure origin resolves correctly (a bare file:// origin would not).
//
// "Always-latest" mode: set NOLVUS_APP_URL (env var) or REMOTE_URL below to your deployed
// site URL and the shell will load the live site instead of the bundled build.

const { app, BrowserWindow, protocol, shell, ipcMain } = require('electron')
const path = require('node:path')
const fs = require('node:fs')

// Point this at your deployed URL (e.g. 'https://nolvusfiltereditor.vercel.app') to load the live
// site instead of the bundled build. Leave empty to use the offline bundle.
const REMOTE_URL = process.env.NOLVUS_APP_URL || ''

const DIST = path.join(__dirname, '..', 'dist')

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ttf': 'font/ttf', '.otf': 'font/otf', '.mp3': 'audio/mpeg', '.map': 'application/json',
}

// Must run before app is ready: make `app://` a real, secure, fetch-capable origin.
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true } },
])

function serveBundle(req) {
  const url = new URL(req.url)
  let rel = decodeURIComponent(url.pathname)
  if (rel === '/' || rel === '') rel = '/index.html'

  const filePath = path.normalize(path.join(DIST, rel))
  // Block path traversal outside dist/.
  if (!filePath.startsWith(DIST)) return new Response('Forbidden', { status: 403 })

  try {
    const data = fs.readFileSync(filePath)
    const ext = path.extname(filePath).toLowerCase()
    return new Response(data, { headers: { 'content-type': MIME[ext] || 'application/octet-stream' } })
  } catch {
    // Unknown path → serve the SPA entry so client-side routing can take over.
    try {
      const html = fs.readFileSync(path.join(DIST, 'index.html'))
      return new Response(html, { headers: { 'content-type': 'text/html' } })
    } catch {
      return new Response('Not found', { status: 404 })
    }
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1480,
    height: 940,
    minWidth: 1024,
    minHeight: 700,
    backgroundColor: '#000000',
    autoHideMenuBar: true,
    title: "Nolvus's Filter",
    // Frameless: no native Windows title bar. The app draws its own (TitleBar.jsx) and the
    // window stays movable (CSS drag region) and resizable (frameless keeps edge resize).
    frame: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.cjs'),
    },
  })

  // Tell the renderer when the window's maximized state changes so the button icon can flip.
  const sendMax = () => { if (!win.isDestroyed()) win.webContents.send('win:maximized', win.isMaximized()) }
  win.on('maximize', sendMax)
  win.on('unmaximize', sendMax)

  // Any external http(s) links open in the system browser, not in-app.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) shell.openExternal(url)
    return { action: 'deny' }
  })
  win.webContents.on('will-navigate', (e, url) => {
    const internal = REMOTE_URL ? url.startsWith(REMOTE_URL) : url.startsWith('app://')
    if (!internal && /^https?:/.test(url)) {
      e.preventDefault()
      shell.openExternal(url)
    }
  })

  if (REMOTE_URL) {
    win.loadURL(REMOTE_URL)
  } else {
    win.loadURL('app://bundle/index.html')
  }
}

// Window controls for the custom title bar. Resolve the calling window from the sender so
// this works no matter how many windows exist.
const senderWin = (e) => BrowserWindow.fromWebContents(e.sender)
ipcMain.on('win:minimize', (e) => senderWin(e)?.minimize())
ipcMain.on('win:maximize', (e) => {
  const w = senderWin(e); if (!w) return
  w.isMaximized() ? w.unmaximize() : w.maximize()
})
ipcMain.on('win:close', (e) => senderWin(e)?.close())
ipcMain.handle('win:isMaximized', (e) => !!senderWin(e)?.isMaximized())

app.whenReady().then(() => {
  protocol.handle('app', serveBundle)
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
