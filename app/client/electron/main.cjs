// ExileCodex desktop shell — WINDOWLESS. A transparent, frameless, always-on-top
// overlay covering the work area: only the orb and widgets are visible, and mouse
// input passes straight through the empty space to whatever is underneath
// (Overwolf-style). The renderer toggles pass-through via IPC as the cursor
// enters/leaves UI. Also serves the repo over a loopback-only HTTP server
// (fengari fetches .lua files via XHR, which file:// would block) and will grow
// the Client.txt watcher and clipboard hooks that the browser build can't do.
const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain, screen, dialog, globalShortcut, shell } = require('electron')
const { autoUpdater } = require('electron-updater')
const http = require('http')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { parseLogLine } = require('./log-parse.cjs')
const { createOverlayLayoutController } = require('./overlay-controller.cjs')
const {
  DEFAULT_POB_VERSION,
  POB_ASSET_ORIGIN,
  checkPobUpdate,
  safeAssetRelativePath,
} = require('./pob-updater.cjs')

const ROOT = path.resolve(__dirname, '..', '..', '..')
const BRAND_ICON = path.join(ROOT, 'app', 'media', 'brand', 'logo_icon.png')

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
let tray = null
let isQuitting = false
let currentMode = 'window'
let updateReady = false      // an update has downloaded and is ready to install on restart
let updaterInited = false
app.on('before-quit', () => { isQuitting = true })
function readSavedMode() {
  try {
    const vars = JSON.parse(fs.readFileSync(varsFile(), 'utf8'))
    return vars['ec.overlay.enabled'] === '1' ? 'overlay' : 'window'
  } catch { return 'window' }
}
// Persist an ec.* pref straight into the SavedVariables file (so a tray-driven
// mode switch is remembered and the app UI reflects it after the reload).
function setSavedVar(key, value) {
  let vars = {}
  try { vars = JSON.parse(fs.readFileSync(varsFile(), 'utf8')) || {} } catch { vars = {} }
  vars[key] = value
  try { fs.writeFileSync(varsFile(), JSON.stringify(vars)) } catch { /* ignore */ }
}
function getVar(key, def) {
  try {
    const vars = JSON.parse(fs.readFileSync(varsFile(), 'utf8')) || {}
    const v = vars[key]
    return (v === undefined || v === null) ? def : v
  } catch { return def }
}
ipcMain.on('ec:get-mode', (e) => { e.returnValue = currentMode })
ipcMain.on('ec:app-version', (e) => { e.returnValue = app.getVersion() })
ipcMain.on('ec:window-minimize', (event) => {
  if (currentMode === 'window' && win && event.sender.id === win.webContents.id) win.minimize()
})
ipcMain.on('ec:window-maximize-toggle', (event) => {
  if (currentMode !== 'window' || !win || event.sender.id !== win.webContents.id) return
  if (win.isMaximized()) win.unmaximize(); else win.maximize()
})
ipcMain.on('ec:window-close', (event) => {
  if (currentMode === 'window' && win && event.sender.id === win.webContents.id) win.close()
})

// Developer mode is a *session* unlock (Settings → tap About six times). It's
// held in main-process memory so it survives a window↔overlay switch (which
// recreates the renderer) but relocks when the whole app is closed.
let devUnlocked = false
ipcMain.on('ec:dev-get', (e) => { e.returnValue = devUnlocked })
ipcMain.on('ec:dev-set', (_e, v) => { devUnlocked = !!v })

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.lua': 'text/x-lua', '.json': 'application/json',
  '.wasm': 'application/wasm', '.mjs': 'text/javascript', '.zip': 'application/zip',
  '.data': 'application/octet-stream', '.zst': 'application/zstd', '.map': 'application/json',
  '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg',
}

// FIXED port: localStorage is origin-scoped (port included), so a random port
// would wipe every setting on each launch. Falls back to a random port only if
// something else owns ours (settings won't persist in that degraded mode).
const FIXED_PORT = 46620

// Downloaded plugin updates live here and override the bundled file, so a plugin
// can be updated without shipping a whole new app build.
function pluginsDir() { return path.join(app.getPath('userData'), 'plugins') }

// The bundled planner remains the offline-safe baseline. When the upstream
// manifest advertises a newer PoE2 release, the local server proxies that
// release through the same-origin loopback URL and caches each requested asset
// under the user's data directory. The iframe itself can stay unchanged.
let pobAssetVersion = DEFAULT_POB_VERSION
let pobAssetSource = 'bundled'
function pobAssetCacheDir() { return path.join(app.getPath('userData'), 'pob-assets', 'versions') }
function pobAssetMetadataPath() { return path.join(app.getPath('userData'), 'pob-assets', 'version.json') }

function servePobFile(file, res) {
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return false
  res.setHeader('Content-Type', MIME[path.extname(file).toLowerCase()] || 'application/octet-stream')
  fs.createReadStream(file).on('error', () => {
    if (!res.headersSent) res.statusCode = 500
    res.end()
  }).pipe(res)
  return true
}

async function proxyPobAsset(pathname, res) {
  const match = /^\/app\/vendor\/pobweb\/game-assets\/games\/poe2\/versions\/(v\d+\.\d+\.\d+)\/(.*)$/.exec(pathname)
  if (!match) return false

  const requestedVersion = match[1]
  const relative = safeAssetRelativePath(match[2])
  if (!relative) {
    res.statusCode = 400
    res.end('invalid asset path')
    return true
  }

  const useRemote = pobAssetSource === 'remote' || pobAssetSource === 'cached'
  const targetVersion = useRemote ? pobAssetVersion : requestedVersion
  const relativeParts = relative.split('/')
  const cacheFile = path.join(pobAssetCacheDir(), targetVersion, ...relativeParts)
  const bundledFile = path.join(ROOT, 'app', 'vendor', 'pobweb', 'game-assets', 'games', 'poe2', 'versions', requestedVersion, ...relativeParts)

  if (fs.existsSync(cacheFile) && servePobFile(cacheFile, res)) return true
  if (!useRemote && servePobFile(bundledFile, res)) return true

  if (useRemote) {
    const remoteUrl = `${POB_ASSET_ORIGIN}/games/poe2/versions/${targetVersion}/${relative}`
    try {
      const response = await fetch(remoteUrl, { signal: AbortSignal.timeout(15000) })
      if (!response.ok) throw new Error(`asset request failed: HTTP ${response.status}`)
      const data = Buffer.from(await response.arrayBuffer())
      fs.mkdirSync(path.dirname(cacheFile), { recursive: true })
      const temp = `${cacheFile}.tmp-${process.pid}-${Date.now()}-${Math.random().toString(16).slice(2)}`
      fs.writeFileSync(temp, data)
      fs.renameSync(temp, cacheFile)
      res.setHeader('Content-Type', response.headers.get('content-type') || MIME[path.extname(cacheFile).toLowerCase()] || 'application/octet-stream')
      res.end(data)
      return true
    } catch (error) {
      console.warn(`ExileCodex: PoB asset unavailable (${targetVersion}/${relative})`, error.message)
      if (servePobFile(bundledFile, res)) return true
      res.statusCode = 502
      res.end('planner asset unavailable')
      return true
    }
  }

  res.statusCode = 404
  res.end('planner asset not found')
  return true
}

function serveRepo() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      void (async () => {
      let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
      if (pathname === '/') pathname = '/app/client/ui/index.html'

      if (await proxyPobAsset(pathname, res)) return

      let file = path.resolve(path.join(ROOT, pathname))
      // If a downloaded override exists for this plugin, serve it in place of the
      // bundled file — this is what makes plugin updates "stick" across launches.
      const ov = /^\/app\/addons\/([A-Za-z0-9_-]+)\/plugin\.lua$/.exec(pathname)
      if (ov) {
        const cand = path.join(pluginsDir(), ov[1], 'plugin.lua')
        if (fs.existsSync(cand)) file = cand
      }
      const okRoot = file.startsWith(ROOT) || file.startsWith(pluginsDir())
      if (!okRoot || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.statusCode = 404
        return res.end('not found')
      }
      res.setHeader('Content-Type', MIME[path.extname(file).toLowerCase()] || 'application/octet-stream')
      fs.createReadStream(file).pipe(res)
      })().catch((error) => {
        console.error('ExileCodex: local server request failed', error)
        if (!res.headersSent) res.statusCode = 500
        res.end('server error')
      })
    })
    server.on('error', () => {
      console.warn(`ExileCodex: port ${FIXED_PORT} is taken — settings will not persist this run`)
      server.listen(0, '127.0.0.1', () => resolve(server.address().port))
    })
    server.listen(FIXED_PORT, '127.0.0.1', () => resolve(server.address().port))
  })
}

app.whenReady().then(async () => {
  // ---- Boot splash -------------------------------------------------------
  // A small always-on-top window shown the instant the app launches. It streams
  // the real init steps (server, mode, window, then the renderer's plugins) as a
  // PoB-style console, ends on the green "ready" line, then hands off to the main
  // window — which stays hidden (show:false) until the handoff.
  let splash = null
  let splashReady = false
  let bootDone = false
  let safetyTimer = null
  const splashStart = Date.now()
  const bootBuffer = []
  // Any splash activity (a streamed line, a phase change, download progress)
  // resets the "boot looks stuck" safety timer, so a legit long step (an update
  // download, a reload) never trips it — only 12s of true silence does.
  function bumpSafety() {
    if (bootDone) return
    if (safetyTimer) clearTimeout(safetyTimer)
    safetyTimer = setTimeout(finishBoot, 12000)
  }
  function splashSend(msg) {
    if (splash && !splash.isDestroyed() && splashReady) { try { splash.webContents.send('ec:boot', msg) } catch { /* */ } }
    else bootBuffer.push(msg)
    bumpSafety()
  }
  function boot(line, level) { splashSend({ line: String(line == null ? '' : line), level: level || 'info' }) }
  function createSplash() {
    try {
      splashReady = false
      splash = new BrowserWindow({
        width: 540, height: 400, show: false, frame: false, transparent: true,
        backgroundColor: '#00000000', hasShadow: false, resizable: false, movable: false,
        center: true, alwaysOnTop: true, skipTaskbar: true, focusable: false, fullscreenable: false,
        webPreferences: {
          preload: path.join(__dirname, 'splash-preload.cjs'),
          contextIsolation: true, nodeIntegration: false, sandbox: true,
        },
      })
      splash.setAlwaysOnTop(true, 'screen-saver', 1)
      splash.once('ready-to-show', () => { try { if (splash && !splash.isDestroyed()) splash.show() } catch { /* */ } })
      splash.webContents.once('did-finish-load', () => {
        splashReady = true
        for (const m of bootBuffer) { try { splash.webContents.send('ec:boot', m) } catch { /* */ } }
        bootBuffer.length = 0
      })
      splash.loadFile(path.join(__dirname, '..', 'ui', 'splash.html'))
    } catch { splash = null }
  }
  // Close the splash and reveal the app. Idempotent + heavily guarded so the
  // main window is NEVER left hidden, even if the renderer never signals ready.
  function finishBoot() {
    if (bootDone) return
    bootDone = true
    if (safetyTimer) { clearTimeout(safetyTimer); safetyTimer = null }
    boot('Loaded and ready (running in background)', 'done')
    const wait = Math.max(850, 1700 - (Date.now() - splashStart)) // let the splash breathe
    setTimeout(() => {
      try { if (win && !win.isDestroyed() && !win.isVisible()) { win.show(); if (currentMode === 'window') win.focus() } } catch { /* */ }
      try { if (splash && !splash.isDestroyed()) splash.close() } catch { /* */ }
      splash = null
    }, wait)
  }
  createSplash()
  boot('ExileCodex ' + app.getVersion() + ' — starting…', 'accent')
  boot('Electron ' + process.versions.electron + ' · Chromium ' + process.versions.chrome + ' · Node ' + process.versions.node, 'dim')
  boot('Starting local server…', 'info')

  const port = await serveRepo()
  boot('Server ready on 127.0.0.1:' + port, 'ok')
  console.log(`ExileCodex desktop shell: serving on http://127.0.0.1:${port}`)

  // Keep the embedded PoE2 planner current without requiring a full
  // ExileCodex installer release. The server-side check avoids renderer CORS
  // restrictions; planner assets are fetched and cached only when requested.
  boot('Checking Path of Building data…', 'info')
  const pobStatus = await checkPobUpdate({ metadataPath: pobAssetMetadataPath() })
  pobAssetVersion = pobStatus.version
  pobAssetSource = pobStatus.source
  boot(`Planner data ${pobAssetVersion} (${pobAssetSource})`, pobAssetSource === 'bundled' ? 'dim' : 'ok')

  // A first launch must be a real foreground app window. If a previous test
  // left the overlay preference behind while onboarding was still incomplete,
  // opening the tour over the desktop hides the very plugin it is explaining.
  // The user can enable overlay mode from Settings after the walkthrough.
  const firstLaunch = getVar('ec.onboarding.completed', '') !== '1'
    && getVar('ec.onboarding.suppressed', '') !== '1'
  currentMode = firstLaunch ? 'window' : readSavedMode()
  boot('Display mode: ' + currentMode, 'info')

  // Bounded overlay is the default. Set ec.overlay.host=legacy in the durable
  // variables file to recover the old full-work-area behavior while diagnosing
  // a machine-specific issue.
  const overlayHost = getVar('ec.overlay.host', 'bounded') === 'legacy' ? 'legacy' : 'bounded'
  const overlayController = createOverlayLayoutController({
    getBounds: () => win.getBounds(),
    getWorkArea: (bounds) => screen.getDisplayMatching(bounds).workArea,
    setBounds: (bounds) => win.setBounds(bounds),
    sendOrigin: (origin) => { try { win.webContents.send('ec:overlay-origin', origin) } catch { /* renderer is reloading */ } },
  })

  function overlayInitialBounds() {
    const wa = screen.getPrimaryDisplay().workArea
    const raw = getVar('ec.orb.screen', getVar('ec.orb', ''))
    const match = String(raw || '').match(/(-?\d+),(-?\d+)/)
    const targetX = match ? Number(match[1]) : wa.x + wa.width - 42
    const targetY = match ? Number(match[2]) : wa.y + wa.height - 42
    const rects = [{ x: targetX, y: targetY, width: 46, height: 46 }]
    const open = String(getVar('ec.openwidgets', '') || '')
    for (const id of open.split(',').map((s) => s.trim()).filter(Boolean)) {
      const rawWidget = String(getVar(`ec.widget.${id}`, '') || '')
      const m = rawWidget.match(/^(-?\d+),(-?\d+),(\d),?(\d*),?(\d*)/)
      if (!m) continue
      rects.push({ x: Number(m[1]), y: Number(m[2]), width: Number(m[4] || 320), height: Number(m[3] === '1' ? 42 : (m[5] || 240)) })
    }
    const left = Math.min(...rects.map((r) => r.x)) - 24
    const top = Math.min(...rects.map((r) => r.y)) - 24
    const right = Math.max(...rects.map((r) => r.x + r.width)) + 24
    const bottom = Math.max(...rects.map((r) => r.y + r.height)) + 24
    const width = Math.min(wa.width, Math.max(220, right - left))
    const height = Math.min(wa.height, Math.max(220, bottom - top))
    const x = Math.max(wa.x, Math.min(wa.x + wa.width - width, left))
    const y = Math.max(wa.y, Math.min(wa.y + wa.height - height, top))
    return { x: Math.round(x), y: Math.round(y), width: Math.round(width), height: Math.round(height) }
  }

  // The two window personalities. Overlay = transparent, click-through,
  // always-on-top, covering the work area. Window = a normal framed, opaque,
  // resizable desktop window centred on the primary display.
  function windowOpts(mode) {
    const base = {
      title: 'ExileCodex',
      icon: BRAND_ICON,
      webPreferences: {
        preload: path.join(__dirname, 'preload.cjs'),
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true,
      },
    }
    const wa = screen.getPrimaryDisplay().workArea
    if (mode === 'overlay') {
      const initial = overlayHost === 'legacy'
        ? { x: wa.x, y: wa.y, width: wa.width, height: wa.height }
        : overlayInitialBounds()
      return {
        ...base, ...initial,
        frame: false, transparent: true, backgroundColor: '#00000000', hasShadow: false,
        resizable: false, movable: false, alwaysOnTop: true,
        // Never show in the taskbar/alt-tab — it's an overlay, not an app window.
        // (Opening a native dropdown briefly makes the window focusable to take
        // keyboard focus; without this that flashed the app into the taskbar.)
        skipTaskbar: true,
        // Non-activating: clicking the overlay UI must NOT steal foreground from
        // the game, otherwise the first click back on the game is eaten by the
        // window-activation and you have to click twice. Focus is re-enabled just
        // while a text field is in use (see ec:overlay-focusable).
        focusable: false,
      }
    }
    const w = Math.min(1440, wa.width - 80), h = Math.min(900, wa.height - 80)
    return {
      ...base, width: w, height: h, minWidth: 900, minHeight: 600, center: true,
      frame: false, transparent: false, backgroundColor: '#0e0d0b', hasShadow: true,
      resizable: true, movable: true, alwaysOnTop: false,
    }
  }

  function createWindow(mode, hidden) {
    currentMode = mode
    overlayController.reset()
    const opts = windowOpts(mode)
    // Only the initial launch window starts hidden (revealed by the boot-splash
    // handoff). Mode switches recreate the window shown, as before.
    if (hidden) opts.show = false
    win = new BrowserWindow(opts)
    if (mode === 'window') {
      const sendWindowState = () => {
        if (win && !win.isDestroyed()) win.webContents.send('ec:window-state', { maximized: win.isMaximized() })
      }
      win.on('maximize', sendWindowState)
      win.on('unmaximize', sendWindowState)
      win.webContents.once('did-finish-load', sendWindowState)
    }
    if (mode === 'overlay') {
      // Screen-saver level keeps the overlay above borderless games (PoE2 in
      // Borderless); reassert on blur so it never sinks behind the game.
      win.setAlwaysOnTop(true, 'screen-saver', 1)
      win.on('blur', () => { if (!win.isDestroyed()) win.setAlwaysOnTop(true, 'screen-saver', 1) })
      // Default to pass-through: if hover detection ever breaks, the failure
      // mode is "orb not clickable", never "invisible wall over the desktop".
      // Bounded mode forwards pointer movement only inside the small union
      // window; legacy mode retains the old full-screen behavior for rollback.
      win.setIgnoreMouseEvents(true, { forward: true })
    }
    // Closing the window hides to the tray instead of quitting (the app lives in
    // the tray; "Quit" there really exits). Mode switches destroy the window
    // programmatically, which sets isQuitting-like intent via `destroy()` (no
    // close event), so this only intercepts a real user close.
    win.on('close', (e) => {
      if (!isQuitting) { e.preventDefault(); win.hide() }
    })
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

  ipcMain.on('ec:overlay-layout', (event, json) => {
    if (currentMode !== 'overlay' || overlayHost === 'legacy' || !win || win.isDestroyed()) return
    if (event.sender.id !== win.webContents.id) return
    let payload
    try { payload = JSON.parse(String(json || '{}')) } catch { return }
    overlayController.update(payload)
  })

  // ---- First-launch guided tour ------------------------------------------
  // The tour is rendered in the main app surface. The shell only coordinates
  // phase/state and forwards semantic commands to Lua; no second desktop window
  // is created, so the real plugin remains visible underneath the dim layer.
  let tutorialPhase = 'welcome'
  const tutorialTargets = new Map()
  const targetForPhase = { market: 'market', orb: 'orb', menu: 'settings-button', settings: 'settings' }
  function tutorialCompleted() { return getVar('ec.onboarding.completed', '') === '1' }
  function tutorialPayload() {
    const kind = targetForPhase[tutorialPhase]
    return { phase: tutorialPhase, target: kind ? (tutorialTargets.get(kind) || { kind, x: 0, y: 0, width: 0, height: 0 }) : null }
  }
  function tutorialSendState() {
    if (!win || win.isDestroyed()) return
    try { win.webContents.send('ec:tutorial-state', tutorialPayload()) } catch { /* renderer is reloading */ }
  }
  function tutorialSendCommand(command) {
    if (!win || win.isDestroyed()) return
    try { win.webContents.send('ec:tutorial-command', command) } catch { /* renderer is reloading */ }
  }
  function closeTutorial(markComplete) {
    if (markComplete) setSavedVar('ec.onboarding.completed', '1')
    tutorialPhase = 'closed'
    tutorialSendState()
  }

  ipcMain.on('ec:tutorial-start', (event) => {
    if (!win || event.sender.id !== win.webContents.id || tutorialCompleted()) return
    tutorialPhase = 'welcome'
    tutorialTargets.clear()
    tutorialSendState()
  })
  ipcMain.on('ec:tutorial-target', (event, payload) => {
    if (!win || event.sender.id !== win.webContents.id || !payload) return
    const kind = String(payload.kind || '')
    if (!kind) return
    tutorialTargets.set(kind, {
      kind,
      // Renderer and in-app walkthrough share the same content viewport, so
      // keep these coordinates local instead of translating to screen space.
      x: Number(payload.x || 0),
      y: Number(payload.y || 0),
      width: Math.max(0, Number(payload.width || 0)),
      height: Math.max(0, Number(payload.height || 0)),
    })
    tutorialSendState()
  })
  ipcMain.on('ec:tutorial-action', (event, action) => {
    if (!win || event.sender.id !== win.webContents.id) return
    action = String(action || '')
    if (action === 'skip' || action === 'finish') { closeTutorial(true); return }
    if (action === 'begin') {
      tutorialPhase = 'market'; tutorialSendState(); tutorialSendCommand('show-market'); return
    }
    if (action === 'market-next') { tutorialPhase = 'orb'; tutorialSendState(); return }
    if (action === 'open-menu') {
      tutorialPhase = 'menu'; tutorialSendState(); tutorialSendCommand('open-menu'); return
    }
    if (action === 'open-settings') {
      tutorialPhase = 'settings'; tutorialSendState(); tutorialSendCommand('open-settings'); return
    }
  })

  // Switch personalities by recreating the window (transparent is immutable
  // after creation). Create the new one BEFORE destroying the old so
  // window-all-closed never fires mid-switch and quits the app.
  function switchMode(mode) {
    if (mode === currentMode && win && !win.isDestroyed()) return
    const old = win
    createWindow(mode)
    if (old && !old.isDestroyed()) old.destroy()
    if (tray) tray.setContextMenu(buildTrayMenu()) // reflect the new mode's radio
  }

  // Overlay text fields need real keyboard focus, which a non-activating window
  // can't take. The renderer flips this on while an input is focused, off after.
  ipcMain.on('ec:overlay-focusable', (_e, flag) => {
    if (currentMode === 'overlay' && win && !win.isDestroyed()) {
      win.setFocusable(!!flag)
      win.setSkipTaskbar(true) // setFocusable(true) can re-add the window to the taskbar on Windows
      if (flag) win.focus()
    }
  })
  ipcMain.on('ec:mouse-through', (_e, flag) => {
    // Only the overlay is ever click-through; a normal window stays solid.
    if (currentMode === 'overlay' && win && !win.isDestroyed()) win.setIgnoreMouseEvents(!!flag, { forward: true })
  })

  // ---- Per-plugin updates (download + persist, no full-app rebuild) ---------
  // Installed overrides: { id: version } for every plugin we've downloaded.
  ipcMain.on('ec:plugin-overrides', (e) => {
    const out = {}
    try {
      const dir = pluginsDir()
      if (fs.existsSync(dir)) for (const id of fs.readdirSync(dir)) {
        try {
          if (!fs.existsSync(path.join(dir, id, 'plugin.lua'))) continue
          const vp = path.join(dir, id, 'version')
          out[id] = fs.existsSync(vp) ? fs.readFileSync(vp, 'utf8').trim() : '1'
        } catch { /* skip a bad entry */ }
      }
    } catch { /* no overrides yet */ }
    e.returnValue = out
  })
  // Persist a downloaded plugin as an override (served over the bundled file).
  ipcMain.handle('ec:plugin-write', (_e, { id, version, source }) => {
    try {
      if (!/^[A-Za-z0-9_-]+$/.test(String(id))) return { ok: false, error: 'bad id' }
      // Only accept something that actually looks like one of our plugins.
      if (!/codex\.registry\.register/.test(String(source || ''))) return { ok: false, error: 'not a valid plugin file' }
      const dir = path.join(pluginsDir(), String(id))
      fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(path.join(dir, 'plugin.lua'), String(source), 'utf8')
      fs.writeFileSync(path.join(dir, 'version'), String(version || ''), 'utf8')
      return { ok: true }
    } catch (err) { return { ok: false, error: String((err && err.message) || err) } }
  })
  // Remove an override (revert that plugin to the bundled version on next launch).
  ipcMain.handle('ec:plugin-remove', (_e, id) => {
    try {
      if (!/^[A-Za-z0-9_-]+$/.test(String(id))) return { ok: false }
      fs.rmSync(path.join(pluginsDir(), String(id)), { recursive: true, force: true })
      return { ok: true }
    } catch (err) { return { ok: false, error: String(err) } }
  })
  ipcMain.on('ec:quit', () => app.quit())

  // ---- Save the generated loot filter straight into the PoE2 filter folder ---
  function poe2FilterFolder(hint) {
    const ok = (p) => { try { return p && fs.existsSync(p) && fs.statSync(p).isDirectory() } catch { return false } }
    if (ok(hint)) return hint
    const home = os.homedir()
    return [
      path.join(home, 'Documents', 'My Games', 'Path of Exile 2'),
      path.join(home, 'OneDrive', 'Documents', 'My Games', 'Path of Exile 2'),
      path.join(home, 'OneDrive', 'My Games', 'Path of Exile 2'),
    ].find(ok) || null
  }
  ipcMain.handle('ec:save-filter', (_e, { folder, name, content }) => {
    try {
      const dir = poe2FilterFolder(folder)
      if (!dir) return { ok: false, error: 'PoE2 filter folder not found — set it in Settings → Game paths.' }
      const safe = String(name || 'ExileCodex').replace(/[^A-Za-z0-9 _().-]/g, '').trim() || 'ExileCodex'
      const file = path.join(dir, safe + '.filter')
      fs.writeFileSync(file, String(content || ''), 'utf8')
      return { ok: true, path: file, name: safe }
    } catch (err) { return { ok: false, error: String((err && err.message) || err) } }
  })
  ipcMain.handle('ec:open-filter-folder', (_e, folder) => {
    try {
      const dir = poe2FilterFolder(folder)
      if (!dir) return { ok: false, error: 'PoE2 filter folder not found.' }
      shell.openPath(dir)
      return { ok: true, path: dir }
    } catch (err) { return { ok: false, error: String(err) } }
  })

  ipcMain.handle('ec:pick-path', async (_e, opts) => {
    const r = await dialog.showOpenDialog(win, {
      properties: [opts && opts.file ? 'openFile' : 'openDirectory'],
    })
    return r.canceled ? null : r.filePaths[0]
  })

  // Scan the usual suspects for PoE2 installs / logs / filter folders.
  ipcMain.handle('ec:auto-locate', (_e, req) => {
    const exists = (p) => { try { return fs.existsSync(p) } catch { return false } }
    // Every fixed drive C:..Z: (cheap — non-existent roots fail fast).
    const drives = []
    for (let c = 67; c <= 90; c++) {
      const d = String.fromCharCode(c) + ':\\'
      if (exists(d)) drives.push(d)
    }
    // The install layouts PoE2 uses under any drive root.
    const layouts = [
      'Program Files (x86)\\Grinding Gear Games\\Path of Exile 2',
      'Program Files\\Grinding Gear Games\\Path of Exile 2',
      'Grinding Gear Games\\Path of Exile 2',
      'Program Files (x86)\\Steam\\steamapps\\common\\Path of Exile 2',
      'Program Files\\Steam\\steamapps\\common\\Path of Exile 2',
      'Steam\\steamapps\\common\\Path of Exile 2',
      'SteamLibrary\\steamapps\\common\\Path of Exile 2',
      'Games\\Path of Exile 2',
      'Path of Exile 2',
    ]
    const gameDirs = []
    for (const d of drives) for (const l of layouts) gameDirs.push(d + l)
    // Steam custom libraries — read libraryfolders.vdf so we find installs on
    // drives/paths the layouts above don't guess.
    try {
      const vdfs = []
      for (const d of drives) {
        vdfs.push(d + 'Program Files (x86)\\Steam\\steamapps\\libraryfolders.vdf')
        vdfs.push(d + 'Steam\\steamapps\\libraryfolders.vdf')
        vdfs.push(d + 'SteamLibrary\\steamapps\\libraryfolders.vdf')
      }
      for (const vp of vdfs) {
        if (!exists(vp)) continue
        const vdf = fs.readFileSync(vp, 'utf8')
        for (const m of vdf.matchAll(/"path"\s*"([^"]+)"/g)) {
          const lib = m[1].replace(/\\\\/g, '\\')
          gameDirs.push(path.join(lib, 'steamapps', 'common', 'Path of Exile 2'))
        }
      }
    } catch { /* unreadable vdf — fall back to the guessed layouts */ }

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
      // "My Games" may sit under Documents or OneDrive-redirected Documents.
      const home = os.homedir()
      const cands = [
        path.join(home, 'Documents', 'My Games', 'Path of Exile 2'),
        path.join(home, 'OneDrive', 'Documents', 'My Games', 'Path of Exile 2'),
        path.join(home, 'OneDrive', 'My Games', 'Path of Exile 2'),
      ]
      return cands.find(exists) || null
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

  // Speedrun tracker feed: besides the deduped snapshot, emit per-line events
  // WITH the log's 3rd-token millisecond uptime counter (monotonic, ms-precise)
  // so the renderer can auto-split and remove load time. `Got Instance Details`
  // marks a load start; `You have entered` marks its end (and a zone change).
  function emitEvent(ev) {
    if (win && !win.isDestroyed()) win.webContents.send('ec:detect-event', ev)
  }

  // Line parsing lives in ./log-parse.cjs (pure + unit-tested). Here we just fold
  // each parsed event into the detect snapshot and, unless seeding history on
  // launch, forward it on the timestamped event channel.
  function parseLines(text, seed) {
    for (const line of text.split(/\r?\n/)) {
      const ev = parseLogLine(line)
      if (!ev) continue
      if (ev.type === 'level') {
        detect.char = ev.char; detect.cls = ev.cls; detect.level = ev.level
        if (!seed) emitEvent({ type: 'level', level: ev.level, char: ev.char, cls: ev.cls, ms: ev.ms })
      } else if (ev.type === 'zone') {
        detect.area = ev.name
        if (!seed) emitEvent({ type: 'zone', name: ev.name, ms: ev.ms })
      } else if (ev.type === 'load') {
        if (!seed) emitEvent({ type: 'load', ms: ev.ms })
      } else if (ev.type === 'reward') {
        if (!seed) emitEvent({ type: 'reward', text: ev.text, ms: ev.ms })
      }
    }
  }

  function readAppended(from, to, seed) {
    try {
      const fd = fs.openSync(watchPath, 'r')
      const buf = Buffer.alloc(to - from)
      fs.readSync(fd, buf, 0, to - from, from)
      fs.closeSync(fd)
      parseLines(buf.toString('utf8'), seed)
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
      // seed from the tail so we already know name/level/area at launch.
      // seed=true suppresses events so historical lines don't fire bogus splits.
      readAppended(Math.max(0, size - 262144), size, true)
      watchSize = size
    } catch { watchSize = 0 }
    detect.active = true
    pushDetect()
    watchListener = (curr) => {
      if (curr.size < watchSize) watchSize = 0 // log rotated / truncated
      if (curr.size > watchSize) {
        readAppended(watchSize, curr.size, false)
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

  // ---- Configurable keybinds (launcher + per-plugin) -----------------------
  // The renderer sends { accel: action }; we register a global shortcut for each
  // so they fire even while PoE2 is focused. On trigger we send the action back
  // to the renderer, which toggles the launcher orb or that plugin's window.
  const keybinds = new Map() // accel -> action
  ipcMain.on('ec:set-keybinds', (_e, map) => {
    for (const accel of keybinds.keys()) { try { globalShortcut.unregister(accel) } catch { /* */ } }
    keybinds.clear()
    for (const [accel, action] of Object.entries(map || {})) {
      if (!accel || !action || accel === overlayHotkey) continue
      try {
        const ok = globalShortcut.register(accel, () => {
          if (win && !win.isDestroyed()) win.webContents.send('ec:keybind', String(action))
        })
        if (ok) keybinds.set(accel, action)
      } catch { /* invalid accelerator — skip */ }
    }
  })

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

  // ---- Auto-update -------------------------------------------------------
  // electron-updater reads latest.yml from the public GitHub repo releases.
  // "Automatically download updates" (ec.update.auto) decides whether a new
  // version downloads in the background (then a "restart to update" toast) or
  // just notifies you with a "download" toast. Only runs when packaged.
  let updateReadyVer = null
  function sendUpdate(payload) {
    if (win && !win.isDestroyed()) win.webContents.send('ec:update-event', payload)
  }
  // Reuse the splash aesthetic for the "installing + restarting" beat before an
  // app update applies (the boot splash is long gone by now, so make a fresh one),
  // then quitAndInstall. Guarded — any failure just installs directly.
  function restartToUpdate() {
    try {
      createSplash()
      const v = updateReadyVer ? ' v' + updateReadyVer : ''
      splashSend({ sub: 'Restarting to install' + v + '…', mode: 'restart' })
      splashSend({ line: 'Installing ExileCodex' + v + '…', level: 'update' })
      splashSend({ line: 'Restarting…', level: 'accent' })
      setTimeout(() => installUpdate(), 2000)
    } catch { installUpdate() }
  }
  function initUpdater() {
    if (updaterInited || !app.isPackaged) return
    updaterInited = true
    try {
      autoUpdater.autoDownload = getVar('ec.update.auto', '1') === '1'
      autoUpdater.autoInstallOnAppQuit = true
      autoUpdater.on('checking-for-update', () => sendUpdate({ type: 'checking' }))
      autoUpdater.on('update-available', (info) => sendUpdate({ type: 'available', version: info && info.version }))
      autoUpdater.on('update-not-available', () => sendUpdate({ type: 'none' }))
      autoUpdater.on('download-progress', (p) => sendUpdate({ type: 'progress', percent: Math.round((p && p.percent) || 0) }))
      autoUpdater.on('update-downloaded', (info) => {
        updateReady = true
        updateReadyVer = info && info.version
        sendUpdate({ type: 'downloaded', version: info && info.version })
        if (tray) tray.setContextMenu(buildTrayMenu())
      })
      autoUpdater.on('error', (err) => sendUpdate({ type: 'error', message: String((err && err.message) || err) }))
      autoUpdater.checkForUpdates().catch(() => {})
    } catch { /* non-fatal */ }
  }
  function installUpdate() {
    isQuitting = true
    try { autoUpdater.quitAndInstall(false, true) } catch { app.quit() }
  }
  ipcMain.on('ec:update-check', () => {
    if (app.isPackaged) autoUpdater.checkForUpdates().catch(() => {})
    else sendUpdate({ type: 'none' }) // dev: no updater — report "up to date" so callers don't hang
  })
  ipcMain.on('ec:update-install', () => restartToUpdate())
  ipcMain.on('ec:update-auto', (_e, flag) => { autoUpdater.autoDownload = !!flag })
  ipcMain.on('ec:update-download', () => { if (app.isPackaged) autoUpdater.downloadUpdate().catch(() => {}) })

  // Boot splash bridge: the renderer streams its init milestones here, then
  // signals ready so the shell can close the splash and reveal the app.
  ipcMain.on('ec:boot-step', (_e, m) => boot(m && m.line, m && m.level))
  ipcMain.on('ec:boot-phase', (_e, m) => splashSend({ sub: (m && m.sub) || '', mode: (m && m.mode) || '' }))
  ipcMain.on('ec:boot-progress', (_e, m) => splashSend({ progress: (m && typeof m.progress === 'number') ? m.progress : -1, plabel: m && m.label }))
  ipcMain.on('ec:boot-ready', () => finishBoot())

  // ---- System tray -------------------------------------------------------
  // A hidden-app tray icon: toggle the window, switch window<->overlay (kept in
  // sync with the in-app setting), and jump into any Settings section.
  const SETTINGS_GROUPS = [
    { id: 'general', label: 'General' },
    { id: 'steps', label: 'Step display' },
    { id: 'tracker', label: 'Run Tracker' },
    { id: 'guidewin', label: 'Guide window' },
    { id: 'display', label: 'Display' },
    { id: 'paths', label: 'Game paths' },
    { id: 'detection', label: 'Smart detection' },
    { id: 'overlay', label: 'Game overlay' },
    { id: 'about', label: 'About' },
  ]
  function openSettings(group) {
    if (!win || win.isDestroyed()) return
    win.show(); win.focus()
    const send = () => win.webContents.send('ec:tray', { cmd: 'settings', group: group || '' })
    if (win.webContents.isLoading()) win.webContents.once('did-finish-load', send)
    else send()
  }
  function syncMode(mode) {
    if (mode === currentMode) return
    setSavedVar('ec.overlay.enabled', mode === 'overlay' ? '1' : '0') // keep the in-app toggle in sync
    switchMode(mode) // recreates the window; also rebuilds the tray menu
  }
  function buildTrayMenu() {
    return Menu.buildFromTemplate([
      { label: 'Show / Hide ExileCodex', click: () => { if (win && !win.isDestroyed()) { if (win.isVisible()) win.hide(); else { win.show(); win.focus() } } } },
      { type: 'separator' },
      updateReady
        ? { label: 'Restart to update', click: () => installUpdate() }
        : { label: 'Check for updates…', click: () => { openSettings('about'); if (app.isPackaged) autoUpdater.checkForUpdates().catch(() => {}) } },
      { type: 'separator' },
      { label: 'Window mode', type: 'radio', checked: currentMode === 'window', click: () => syncMode('window') },
      { label: 'Game overlay', type: 'radio', checked: currentMode === 'overlay', click: () => syncMode('overlay') },
      { type: 'separator' },
      { label: 'Settings', submenu: [
        { label: 'Open Settings…', click: () => openSettings('') },
        { type: 'separator' },
        ...SETTINGS_GROUPS.map((g) => ({ label: g.label, click: () => openSettings(g.id) })),
      ] },
      { type: 'separator' },
      { label: 'Quit ExileCodex', click: () => app.quit() },
    ])
  }
  try {
    let img = nativeImage.createFromPath(BRAND_ICON)
    if (!img.isEmpty()) img = img.resize({ width: 16, height: 16 })
    tray = new Tray(img)
    tray.setToolTip('ExileCodex')
    tray.setContextMenu(buildTrayMenu())
    tray.on('click', () => { if (win && !win.isDestroyed()) { win.show(); win.focus() } })
  } catch { /* tray unavailable on this platform — non-fatal */ }

  boot('Creating main window…', 'info')
  createWindow(currentMode, true)
  boot('Loading interface…', 'info')

  // Application menu — replace Electron's default (whose Help pointed at
  // electronjs.org) with one whose Help matches our repo.
  const REPO = 'https://github.com/NolvusMadeIt/exilecodex'
  const openExt = (u) => () => shell.openExternal(u)
  // Native About panel — shows the installed version (auto-reflects across updates,
  // since app.getVersion() is the running build's version).
  app.setAboutPanelOptions({
    applicationName: 'ExileCodex',
    applicationVersion: 'v' + app.getVersion(),
    copyright: 'Companion overlay for Path of Exile 2 — unofficial, not affiliated with Grinding Gear Games.',
    website: REPO,
    iconPath: BRAND_ICON,
  })
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { role: 'fileMenu' },
    { role: 'editMenu' },
    {
      label: 'View',
      submenu: [
        ...(app.isPackaged ? [] : [{ role: 'reload' }, { role: 'forceReload' }, { role: 'toggleDevTools' }, { type: 'separator' }]),
        { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' },
      ],
    },
    { role: 'windowMenu' },
    {
      role: 'help',
      submenu: [
        { label: 'Learn More', click: openExt(REPO) },
        { label: 'Documentation', click: openExt(REPO + '#readme') },
        { label: 'Community Discussions', click: openExt(REPO + '/discussions') },
        { label: 'Search Issues', click: openExt(REPO + '/issues') },
        { type: 'separator' },
        { label: 'Download the Latest Version', click: openExt(REPO + '/releases') },
        { label: 'Check for Updates…', click: () => { openSettings('about'); if (app.isPackaged) autoUpdater.checkForUpdates().catch(() => {}) } },
        { type: 'separator' },
        { label: 'About ExileCodex', role: 'about' },
      ],
    },
  ]))

  // Kick off the update check once the UI is ready. The boot splash hands off on
  // the renderer's ready signal; bumpSafety()'s silence timer is the fallback.
  win.webContents.once('did-finish-load', () => initUpdater())
})

app.on('will-quit', () => globalShortcut.unregisterAll())
app.on('window-all-closed', () => app.quit())
