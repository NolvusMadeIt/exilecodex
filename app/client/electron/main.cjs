// ExileCodex desktop shell — WINDOWLESS. A transparent, frameless, always-on-top
// overlay covering the work area: only the orb and widgets are visible, and mouse
// input passes straight through the empty space to whatever is underneath
// (Overwolf-style). The renderer toggles pass-through via IPC as the cursor
// enters/leaves UI. Also serves the repo over a loopback-only HTTP server
// (fengari fetches .lua files via XHR, which file:// would block) and will grow
// the Client.txt watcher and clipboard hooks that the browser build can't do.
const { app, BrowserWindow, ipcMain, screen, dialog, globalShortcut, shell } = require('electron')
const http = require('http')
const fs = require('fs')
const os = require('os')
const path = require('path')

const ROOT = path.resolve(__dirname, '..', '..', '..')

// Single-instance lock: a second launch must NOT spawn a competing HTTP server
// on a random port — that changes the origin and wipes localStorage (every
// setting) on each start. Hold the lock so only one instance owns port 46620.
if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  app.on('second-instance', () => {
    const [w] = BrowserWindow.getAllWindows()
    if (w) { w.show(); w.focus() }
  })
}

// Supabase credentials live in .env.local at the repo root. Keep filesystem
// access in the main process so the renderer preload can stay sandboxed.
function readEnv() {
  try {
    const raw = fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8')
    const env = {}
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.+)\s*$/i)
      if (m) env[m[1]] = m[2]
    }
    return {
      url: env.VITE_SUPABASE_URL || '',
      key: env.VITE_SUPABASE_PUBLISHABLE_KEY || '',
    }
  } catch {
    return { url: '', key: '' }
  }
}

const supabaseConfig = readEnv()
ipcMain.on('ec:get-supabase-config', (event) => {
  event.returnValue = supabaseConfig
})

// WoW-addon-style SavedVariables: every ec.* pref is mirrored to a JSON file in
// the OS user-data dir so settings persist per user and survive reinstalls
// (localStorage lives in the Chromium profile; this file is the durable copy).
function varsFile() {
  return path.join(app.getPath('userData'), 'ExileCodex-SavedVariables.json')
}
ipcMain.on('ec:load-vars', (event) => {
  try { event.returnValue = fs.readFileSync(varsFile(), 'utf8') } catch { event.returnValue = '' }
})
ipcMain.on('ec:save-vars', (_e, json) => {
  try { fs.writeFileSync(varsFile(), json) } catch { /* disk full / locked — keep running */ }
})

// ---- Window mode (default) vs game-overlay mode --------------------------
// The app launches as a NORMAL, framed, resizable WINDOW by default. Turning on
// "Enable game overlay" (Settings → Game overlay) recreates the window as the
// transparent, click-through, always-on-top overlay — and back. The chosen mode
// is read from the durable SavedVariables at startup, and the renderer is told
// which mode it's in via a ?shell=<mode> query param + the get-mode bridge.
let win = null
let currentMode = 'window'
function readSavedMode() {
  try {
    const vars = JSON.parse(fs.readFileSync(varsFile(), 'utf8'))
    return vars['ec.overlay.enabled'] === '1' ? 'overlay' : 'window'
  } catch { return 'window' }
}
ipcMain.on('ec:get-mode', (e) => { e.returnValue = currentMode })

// Developer mode is a *session* unlock (Settings → tap About six times). It's
// held in main-process memory so it survives a window↔overlay switch (which
// recreates the renderer) but relocks when the whole app is closed.
let devUnlocked = false
ipcMain.on('ec:dev-get', (e) => { e.returnValue = devUnlocked })
ipcMain.on('ec:dev-set', (_e, v) => { devUnlocked = !!v })

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.lua': 'text/x-lua', '.json': 'application/json',
  '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg',
}

// FIXED port: localStorage is origin-scoped (port included), so a random port
// would wipe every setting on each launch. Falls back to a random port only if
// something else owns ours (settings won't persist in that degraded mode).
const FIXED_PORT = 46620

function serveRepo() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
      if (pathname === '/') pathname = '/app/client/ui/index.html'
      const file = path.resolve(path.join(ROOT, pathname))
      if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.statusCode = 404
        return res.end('not found')
      }
      res.setHeader('Content-Type', MIME[path.extname(file).toLowerCase()] || 'application/octet-stream')
      fs.createReadStream(file).pipe(res)
    })
    server.on('error', () => {
      console.warn(`ExileCodex: port ${FIXED_PORT} is taken — settings will not persist this run`)
      server.listen(0, '127.0.0.1', () => resolve(server.address().port))
    })
    server.listen(FIXED_PORT, '127.0.0.1', () => resolve(server.address().port))
  })
}

app.whenReady().then(async () => {
  const port = await serveRepo()
  console.log(`ExileCodex desktop shell: serving on http://127.0.0.1:${port}`)

  currentMode = readSavedMode()

  // The two window personalities. Overlay = transparent, click-through,
  // always-on-top, covering the work area. Window = a normal framed, opaque,
  // resizable desktop window centred on the primary display.
  function windowOpts(mode) {
    const base = {
      icon: path.join(ROOT, 'app', 'media', 'brand', '128.png'),
      webPreferences: {
        preload: path.join(__dirname, 'preload.cjs'),
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true,
      },
    }
    const wa = screen.getPrimaryDisplay().workArea
    if (mode === 'overlay') {
      return {
        ...base, x: wa.x, y: wa.y, width: wa.width, height: wa.height,
        frame: false, transparent: true, backgroundColor: '#00000000', hasShadow: false,
        resizable: false, movable: false, alwaysOnTop: true,
      }
    }
    const w = Math.min(1360, wa.width - 80), h = Math.min(900, wa.height - 80)
    return {
      ...base, width: w, height: h, minWidth: 900, minHeight: 600, center: true,
      frame: true, transparent: false, backgroundColor: '#0e0d0b', hasShadow: true,
      resizable: true, movable: true, alwaysOnTop: false,
    }
  }

  function createWindow(mode) {
    currentMode = mode
    win = new BrowserWindow(windowOpts(mode))
    if (mode === 'overlay') {
      // Screen-saver level keeps the overlay above borderless games (PoE2 in
      // Borderless); reassert on blur so it never sinks behind the game.
      win.setAlwaysOnTop(true, 'screen-saver', 1)
      win.on('blur', () => { if (!win.isDestroyed()) win.setAlwaysOnTop(true, 'screen-saver', 1) })
      // Default to pass-through: if hover detection ever breaks, the failure
      // mode is "orb not clickable", never "invisible wall over the desktop".
      win.setIgnoreMouseEvents(true, { forward: true })
    }
    // external links (Buy/Sell on the trade site, wiki, etc.) open in the system browser
    win.webContents.setWindowOpenHandler(({ url }) => {
      if (/^https?:\/\//.test(url)) shell.openExternal(url)
      return { action: 'deny' }
    })
    // Tell the renderer which personality it is (drives transparent-vs-painted
    // background + whether to arm click-through hover tracking).
    win.loadURL(`http://127.0.0.1:${port}/app/client/ui/index.html?shell=${mode}`)
    return win
  }

  // Switch personalities by recreating the window (transparent is immutable
  // after creation). Create the new one BEFORE destroying the old so
  // window-all-closed never fires mid-switch and quits the app.
  function switchMode(mode) {
    if (mode === currentMode && win && !win.isDestroyed()) return
    const old = win
    createWindow(mode)
    if (old && !old.isDestroyed()) old.destroy()
  }

  ipcMain.on('ec:mouse-through', (_e, flag) => {
    // Only the overlay is ever click-through; a normal window stays solid.
    if (currentMode === 'overlay' && win && !win.isDestroyed()) win.setIgnoreMouseEvents(!!flag, { forward: true })
  })
  ipcMain.on('ec:quit', () => app.quit())

  ipcMain.handle('ec:pick-path', async (_e, opts) => {
    const r = await dialog.showOpenDialog(win, {
      properties: [opts && opts.file ? 'openFile' : 'openDirectory'],
    })
    return r.canceled ? null : r.filePaths[0]
  })

  // Scan the usual suspects for PoE2 installs / logs / filter folders.
  ipcMain.handle('ec:auto-locate', (_e, req) => {
    const exists = (p) => { try { return fs.existsSync(p) } catch { return false } }
    const gameDirs = [
      'C:\\Program Files (x86)\\Grinding Gear Games\\Path of Exile 2',
      'C:\\Program Files\\Grinding Gear Games\\Path of Exile 2',
      'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Path of Exile 2',
      'C:\\SteamLibrary\\steamapps\\common\\Path of Exile 2',
      'D:\\SteamLibrary\\steamapps\\common\\Path of Exile 2',
      'D:\\Steam\\steamapps\\common\\Path of Exile 2',
      'D:\\Games\\Path of Exile 2',
      'D:\\Grinding Gear Games\\Path of Exile 2',
      'E:\\SteamLibrary\\steamapps\\common\\Path of Exile 2',
    ]
    const kind = req && req.kind
    if (kind === 'game') return gameDirs.find(exists) || null
    if (kind === 'clienttxt') {
      const bases = req && req.hint ? [req.hint, ...gameDirs] : gameDirs
      for (const b of bases) {
        const p = path.join(b, 'logs', 'Client.txt')
        if (exists(p)) return p
      }
      return null
    }
    if (kind === 'filters') {
      const p = path.join(os.homedir(), 'Documents', 'My Games', 'Path of Exile 2')
      return exists(p) ? p : null
    }
    return null
  })

  // ---- Client.txt watcher -------------------------------------------------
  // PoE2 logs zone changes and level-ups to Client.txt. We tail it so the guide
  // can show character / level / area (Discord-presence style) and so the run
  // timer only counts while the game is actually running.
  const detect = { char: null, cls: null, level: null, area: null, active: false }
  let watchPath = null
  let watchSize = 0
  let watchListener = null

  function pushDetect() {
    if (!win.isDestroyed()) win.webContents.send('ec:detect', { ...detect })
  }

  function parseLines(text) {
    for (const line of text.split(/\r?\n/)) {
      const lv = line.match(/\] : (.+?) \((.+?)\) is now level (\d+)/)
      if (lv) { detect.char = lv[1]; detect.cls = lv[2]; detect.level = Number(lv[3]) }
      const zone = line.match(/\] : You have entered (.+?)\.\s*$/)
      if (zone) { detect.area = zone[1] }
    }
  }

  function readAppended(from, to) {
    try {
      const fd = fs.openSync(watchPath, 'r')
      const buf = Buffer.alloc(to - from)
      fs.readSync(fd, buf, 0, to - from, from)
      fs.closeSync(fd)
      parseLines(buf.toString('utf8'))
    } catch { /* file busy / gone — ignore this tick */ }
  }

  function stopWatch() {
    if (watchPath && watchListener) fs.unwatchFile(watchPath, watchListener)
    watchPath = null
    watchListener = null
  }

  function startWatch(p) {
    stopWatch()
    detect.char = detect.cls = detect.level = detect.area = null
    detect.active = false
    if (!p || !fs.existsSync(p)) { pushDetect(); return }
    watchPath = p
    try {
      const size = fs.statSync(p).size
      // seed from the tail so we already know name/level/area at launch
      readAppended(Math.max(0, size - 262144), size)
      watchSize = size
    } catch { watchSize = 0 }
    detect.active = true
    pushDetect()
    watchListener = (curr) => {
      if (curr.size < watchSize) watchSize = 0 // log rotated / truncated
      if (curr.size > watchSize) {
        readAppended(watchSize, curr.size)
        watchSize = curr.size
        pushDetect()
      }
    }
    fs.watchFile(p, { interval: 1000 }, watchListener)
  }

  ipcMain.on('ec:watch-clienttxt', (_e, p) => startWatch(p))

  // ---- Game overlay controls ----------------------------------------------
  // A global hotkey shows/hides the whole overlay even while PoE2 has focus,
  // and the overlay can be pinned to a chosen display. The renderer pushes its
  // stored overlay prefs here (Settings → Game overlay).
  let overlayHotkey = null
  function setOverlayHotkey(accel) {
    if (overlayHotkey) { globalShortcut.unregister(overlayHotkey); overlayHotkey = null }
    if (!accel) return
    try {
      const ok = globalShortcut.register(accel, () => {
        if (win.isVisible()) {
          win.hide()
        } else {
          win.show()
          win.setAlwaysOnTop(true, 'screen-saver', 1) // re-assert above the game
        }
      })
      if (ok) overlayHotkey = accel
    } catch { /* invalid accelerator — ignore */ }
  }

  function placeOnDisplay(which) {
    const displays = screen.getAllDisplays()
    const primary = screen.getPrimaryDisplay()
    let target = primary
    if (which && which !== 'auto' && which !== 'primary') {
      const byId = displays.find((d) => String(d.id) === String(which))
      if (byId) target = byId
    }
    const wa = target.workArea
    win.setBounds({ x: wa.x, y: wa.y, width: wa.width, height: wa.height })
  }

  ipcMain.on('ec:overlay-config', (_e, cfg) => {
    cfg = cfg || {}
    // "Enable game overlay" ON -> become the overlay; OFF -> a normal window.
    // Recreating the window is the "reload as an overlay" the toggle promises.
    const want = cfg.enabled ? 'overlay' : 'window'
    switchMode(want)
    // The global show/hide hotkey + display pinning only apply to the overlay.
    setOverlayHotkey(want === 'overlay' ? (cfg.hotkey || 'Shift+Alt+F') : null)
    if (want === 'overlay') {
      if (cfg.display) placeOnDisplay(cfg.display)
      if (win && !win.isVisible()) win.show()
    }
  })

  // Report the available monitors so Settings can offer a real display picker.
  ipcMain.handle('ec:list-displays', () => {
    const primary = screen.getPrimaryDisplay()
    return screen.getAllDisplays().map((d, i) => ({
      id: String(d.id),
      label: `Display ${i + 1}${d.id === primary.id ? ' (primary)' : ''} — ${d.size.width}×${d.size.height}`,
    }))
  })

  createWindow(currentMode)
})

app.on('will-quit', () => globalShortcut.unregisterAll())
app.on('window-all-closed', () => app.quit())
