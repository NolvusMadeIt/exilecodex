// Exile Codex — Windows desktop shell.
//
// This is intentionally thin: it's the same web build (dist/) wrapped in a native window.
// By default it serves the bundled build through a custom `app://` protocol so the app works
// fully offline and self-contained. The app uses absolute asset paths (/assets, /data,
// /sounds), which a custom secure origin resolves correctly (a bare file:// origin would not).
//
// "Always-latest" mode: set NOLVUS_APP_URL (env var) or REMOTE_URL below to your deployed
// site URL and the shell will load the live site instead of the bundled build.

const { app, BrowserWindow, protocol, shell, ipcMain, globalShortcut, screen, Tray, Menu, nativeImage, dialog, powerMonitor } = require('electron')
const { autoUpdater } = require('electron-updater')
const path = require('node:path')
const fs = require('node:fs')
const { registerTrade } = require('./trade.cjs')
const { registerGameLog, stop: stopGameLog, autostart: autostartGameLog } = require('./gamelog.cjs')
const { registerOverlayWindow, closeOverlay } = require('./overlay-window.cjs')
const { registerXileClipboard } = require('./xilehud/register.cjs')

// Community invite — also used by the tray menu.
const DISCORD_URL = 'https://discord.gg/4gueh3Kb3A'

// The single main window + the currently-registered global hotkey (for the game overlay) +
// the system-tray icon.
let mainWindow = null
let overlayHotkey = null
let tray = null

// App logo, bundled with the Electron files so it's always available (icon.png) regardless of
// whether the web build has been copied into dist/ yet.
const ICON_PATH = path.join(__dirname, 'icon.png')

// The desktop shell loads the LIVE web app by default, so it always reflects the latest web deploy
// without needing an app update — the in-app auto-updater is then only for shell (native) changes.
// If the live site can't be reached (offline / down), we fall back to the bundled build (see the
// did-fail-load handler in createWindow), so the app still works. Override with NOLVUS_APP_URL, or
// set it to '' to force the offline bundle.
const REMOTE_URL = process.env.NOLVUS_APP_URL ?? 'https://exilecodex.com'
const BUNDLE_URL = 'app://bundle/index.html'

// The URL the plugin-overlay window loads for a given plugin: the same app the main window runs
// (live site / dev server / offline bundle), at the hash route the renderer's OverlayShell handles.
function overlayUrlFor(pluginId) {
  // Hash route the renderer's OverlayShell handles. http(s) bases get a trailing slash before the
  // hash (so the request hits the SPA root); the bundled file URL must keep its index.html as-is.
  if (REMOTE_URL) return `${REMOTE_URL.replace(/\/$/, '')}/#/overlay/${pluginId}`
  return `app://bundle/index.html#/overlay/${pluginId}`
}

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

// --- "Remember my size": persist the window's bounds + maximized state and restore them next
// launch, so it always reopens exactly where/how the user left it (no more guessing a default). ---
const stateFile = () => path.join(app.getPath('userData'), 'window-state.json')
let saveStateTimer = null

function loadWindowState() {
  try { return JSON.parse(fs.readFileSync(stateFile(), 'utf8')) } catch { return null }
}
function saveWindowState(win) {
  try {
    if (!win || win.isDestroyed() || win.isMinimized()) return
    const b = win.getNormalBounds()                 // un-maximized bounds, so a restore lands right
    fs.writeFileSync(stateFile(), JSON.stringify({ ...b, maximized: win.isMaximized() }))
  } catch { /* a write failure must never block the app */ }
}
const queueSaveState = (win) => { if (saveStateTimer) clearTimeout(saveStateTimer); saveStateTimer = setTimeout(() => saveWindowState(win), 400) }

// A saved rectangle is only usable if it's still substantially on a connected display (a monitor
// could have been unplugged / resolution changed). Returns the bounds, or null to use the default.
function visibleBounds(saved) {
  if (!saved || !Number.isFinite(saved.width) || !Number.isFinite(saved.height) || !Number.isFinite(saved.x) || !Number.isFinite(saved.y)) return null
  const onScreen = screen.getAllDisplays().some(d => {
    const a = d.workArea
    const ix = Math.min(saved.x + saved.width, a.x + a.width) - Math.max(saved.x, a.x)
    const iy = Math.min(saved.y + saved.height, a.y + a.height) - Math.max(saved.y, a.y)
    return ix > 120 && iy > 80                       // at least a grabbable corner is reachable
  })
  return onScreen ? saved : null
}

function createWindow() {
  // "Remember my size": reopen at the bounds the user last left. On first launch (no saved state),
  // open at a generous wide default — ~92% of the screen — centered on the primary display.
  const { workArea } = screen.getPrimaryDisplay()
  const defW = Math.max(1100, Math.min(2400, Math.round(workArea.width * 0.92)))
  const defH = Math.max(700, Math.min(1500, Math.round(workArea.height * 0.9)))
  const saved = visibleBounds(loadWindowState())
  const bounds = saved || {
    width: defW, height: defH,
    x: workArea.x + Math.round((workArea.width - defW) / 2),
    y: workArea.y + Math.round((workArea.height - defH) / 2),
  }

  const win = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    minWidth: 1100,
    minHeight: 700,
    backgroundColor: '#000000',
    autoHideMenuBar: true,
    title: "Exile Codex",
    icon: ICON_PATH,
    // Frameless: no native Windows title bar. The app draws its own (TitleBar.jsx) and the
    // window stays movable (CSS drag region) and resizable (frameless keeps edge resize).
    frame: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.cjs'),
    },
  })

  mainWindow = win
  if (saved?.maximized) win.maximize()
  win.on('closed', () => { if (mainWindow === win) mainWindow = null })

  // Persist size/position whenever the user resizes, moves, maximizes or closes, so the window
  // reopens exactly here next launch (debounced; close saves synchronously).
  win.on('resize', () => queueSaveState(win))
  win.on('move', () => queueSaveState(win))
  win.on('close', () => saveWindowState(win))

  // Tell the renderer when the window's maximized state changes so the button icon can flip.
  const sendMax = () => { if (!win.isDestroyed()) win.webContents.send('win:maximized', win.isMaximized()) }
  win.on('maximize', () => { sendMax(); queueSaveState(win) })
  win.on('unmaximize', () => { sendMax(); queueSaveState(win) })

  // Pairs with the "draw-in" minimize (which leaves the window at opacity 0): fade it back in
  // when it's un-minimized, so it never reappears invisible.
  win.on('restore', () => { if (!win.isDestroyed()) fadeWindow(win, 0, 1, 170) })

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
    // Load the live site; if it fails to load (no network / site down), fall back to the offline
    // bundle exactly once so the app is never left blank.
    let fellBack = false
    win.webContents.on('did-fail-load', (e, errorCode, errorDesc, validatedURL, isMainFrame) => {
      if (!isMainFrame || fellBack) return
      // -3 (ABORTED) is a benign in-app navigation, not a real failure.
      if (errorCode === -3) return
      fellBack = true
      win.loadURL(BUNDLE_URL)
    })
    win.loadURL(REMOTE_URL)
  } else {
    win.loadURL(BUNDLE_URL)
  }
}

// Smoothly fade the window's opacity (easeOutCubic, matching the overlay's motion). Used by the
// "draw-in" minimize/restore so the window dissolves in place instead of the OS sliding it down
// to the taskbar.
let fadeTimer = null
function fadeWindow(win, from, to, dur, onDone) {
  if (!win || win.isDestroyed()) return
  if (fadeTimer) { clearInterval(fadeTimer); fadeTimer = null }
  win.setOpacity(from)
  const start = Date.now()
  fadeTimer = setInterval(() => {
    if (!win || win.isDestroyed()) { clearInterval(fadeTimer); fadeTimer = null; return }
    const t = Math.min(1, (Date.now() - start) / dur)
    const e = 1 - Math.pow(1 - t, 3) // easeOutCubic
    win.setOpacity(from + (to - from) * e)
    if (t >= 1) {
      clearInterval(fadeTimer); fadeTimer = null
      win.setOpacity(to)
      if (onDone) onDone()
    }
  }, 16)
}

// Window controls for the custom title bar. Resolve the calling window from the sender so
// this works no matter how many windows exist.
const senderWin = (e) => BrowserWindow.fromWebContents(e.sender)
ipcMain.on('win:minimize', (e) => {
  const w = senderWin(e); if (!w || w.isMinimized()) return
  // "Draw in" minimize: fade the window out, then minimize while it's invisible so the OS never
  // plays its slide-down-to-taskbar animation. The 'restore' handler fades it back in.
  fadeWindow(w, 1, 0, 150, () => { if (!w.isDestroyed()) w.minimize() })
})
ipcMain.on('win:maximize', (e) => {
  const w = senderWin(e); if (!w) return
  w.isMaximized() ? w.unmaximize() : w.maximize()
})
ipcMain.on('win:close', (e) => senderWin(e)?.close())
ipcMain.handle('win:isMaximized', (e) => !!senderWin(e)?.isMaximized())

// --- Game overlay: dock to one screen's edge (~38% wide, ~90% tall, vertically centered),
// stay on top, and slide + fade in/out smoothly. Toggle visibility with a global hotkey while
// in-game. The target display is chosen explicitly so it never wanders onto the wrong monitor
// on a multi-screen setup. ---

// Remembered so the hotkey knows how to slide, which edge to dock to, and which screen to use.
let overlayState = { enabled: false, side: 'right', display: 'auto' }
let slideTimer = null

// List the connected displays for the Settings dropdown (left-to-right), tagging the primary.
function listDisplays() {
  const primaryId = screen.getPrimaryDisplay().id
  return screen.getAllDisplays()
    .slice()
    .sort((a, b) => a.bounds.x - b.bounds.x)
    .map((d, i) => ({
      id: String(d.id),
      index: i + 1,
      width: d.bounds.width,
      height: d.bounds.height,
      primary: d.id === primaryId,
    }))
}

// Resolve the overlay-display preference to an actual Electron display:
//   'auto'    → the screen the mouse is on (i.e. the one the game is on while you play)
//   'primary' → the primary display
//   <id>      → that specific display, falling back to primary if it's gone
function resolveDisplay() {
  const pref = overlayState.display || 'auto'
  if (pref === 'auto') return screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
  if (pref === 'primary') return screen.getPrimaryDisplay()
  return screen.getAllDisplays().find(d => String(d.id) === String(pref)) || screen.getPrimaryDisplay()
}

// Docked geometry on a given display: a tall side panel ~38% of the screen wide and ~90% tall,
// centered vertically against the chosen edge.
function overlayMetrics(side, display) {
  const { workArea } = display
  const width = Math.max(460, Math.min(1200, Math.round(workArea.width * 0.38)))
  const height = Math.round(workArea.height * 0.9)
  const y = workArea.y + Math.round((workArea.height - height) / 2)
  const dockedX = side === 'left' ? workArea.x : workArea.x + workArea.width - width
  return { side, width, height, y, dockedX }
}

function setDockedBounds(m, x) {
  mainWindow.setBounds({ x: Math.round(x), y: m.y, width: m.width, height: m.height })
}

// Slide + fade the panel against its docked edge. The motion stays *inside* the chosen display
// (it eases in from a small inset toward the edge while fading), so it never bleeds onto an
// adjacent monitor. Moving x + opacity only (constant size) keeps it light and smooth.
function animateOverlay(dir, m, onDone) {
  const w = mainWindow; if (!w || w.isDestroyed()) return
  if (slideTimer) { clearInterval(slideTimer); slideTimer = null }
  const nudge = Math.min(90, Math.round(m.width * 0.16))
  const inset = m.side === 'left' ? nudge : -nudge // offset toward screen centre (away from edge)
  const fromX = dir === 'in' ? m.dockedX + inset : m.dockedX
  const toX = dir === 'in' ? m.dockedX : m.dockedX + inset
  const fromOp = dir === 'in' ? 0 : 1
  const toOp = dir === 'in' ? 1 : 0
  if (dir === 'in') {
    if (w.isMaximized()) w.unmaximize()
    setDockedBounds(m, fromX)
    w.setOpacity(0)
    if (!w.isVisible()) w.show()
  }
  const dur = 220
  const start = Date.now()
  slideTimer = setInterval(() => {
    const win = mainWindow
    if (!win || win.isDestroyed()) { clearInterval(slideTimer); slideTimer = null; return }
    const t = Math.min(1, (Date.now() - start) / dur)
    const e = 1 - Math.pow(1 - t, 3) // easeOutCubic
    setDockedBounds(m, fromX + (toX - fromX) * e)
    win.setOpacity(fromOp + (toOp - fromOp) * e)
    if (t >= 1) {
      clearInterval(slideTimer); slideTimer = null
      win.setOpacity(toOp)
      if (onDone) onDone()
    }
  }, 16)
}

function applyOverlay({ enabled, side, display } = {}) {
  const w = mainWindow; if (!w || w.isDestroyed()) return
  overlayState = { enabled: !!enabled, side: side || 'right', display: display || 'auto' }
  if (overlayState.enabled) {
    w.setAlwaysOnTop(true, 'screen-saver')
    animateOverlay('in', overlayMetrics(overlayState.side, resolveDisplay()))
  } else {
    if (slideTimer) { clearInterval(slideTimer); slideTimer = null }
    w.setAlwaysOnTop(false)
    w.setOpacity(1)
    // Restore a comfortable centered window when leaving overlay mode.
    const { workArea } = resolveDisplay()
    const ww = Math.min(1800, workArea.width - 80)
    const hh = Math.min(1000, workArea.height - 80)
    w.setBounds({
      x: workArea.x + Math.round((workArea.width - ww) / 2),
      y: workArea.y + Math.round((workArea.height - hh) / 2),
      width: ww, height: hh,
    })
  }
}

// Global-hotkey toggle. With the overlay on it slides/fades out then hides, and slides/fades
// back in on the chosen screen (re-resolved each time, so 'auto' follows the mouse / game);
// otherwise it's a plain show/hide.
function toggleOverlayVisibility() {
  const w = mainWindow; if (!w || w.isDestroyed()) return
  const showing = w.isVisible() && !w.isMinimized()
  if (overlayState.enabled) {
    const m = overlayMetrics(overlayState.side, resolveDisplay())
    if (showing) {
      animateOverlay('out', m, () => { if (mainWindow && !mainWindow.isDestroyed()) mainWindow.hide() })
    } else {
      w.setAlwaysOnTop(true, 'screen-saver')
      animateOverlay('in', m, () => { if (mainWindow && !mainWindow.isDestroyed()) mainWindow.focus() })
    }
  } else {
    if (showing) w.hide()
    else { w.show(); w.focus() }
  }
}

function setOverlayHotkey(accel) {
  try {
    if (overlayHotkey) { globalShortcut.unregister(overlayHotkey); overlayHotkey = null }
    if (!accel) return true
    const ok = globalShortcut.register(accel, toggleOverlayVisibility)
    if (ok) overlayHotkey = accel
    return ok
  } catch { return false }
}

ipcMain.on('overlay:apply', (e, opts) => applyOverlay(opts || {}))
ipcMain.on('overlay:toggle', () => toggleOverlayVisibility())
ipcMain.handle('overlay:setHotkey', (e, accel) => setOverlayHotkey(accel))
ipcMain.handle('overlay:getDisplays', () => listDisplays())

// --- Speedrun timer global hotkeys (start / pause / stop / reset) ---
// Registered from Settings; each fires a 'timer:action' to every window so the run timer responds
// even while the game has focus. One accelerator per action; falsy clears it.
let timerHotkeys = {}
function broadcastTimerAction(action) {
  for (const w of BrowserWindow.getAllWindows()) if (w && !w.isDestroyed()) w.webContents.send('timer:action', action)
}
function setTimerHotkeys(map = {}) {
  for (const accel of Object.values(timerHotkeys)) { try { if (accel) globalShortcut.unregister(accel) } catch {} }
  timerHotkeys = {}
  const result = {}
  for (const action of ['start', 'pause', 'stop', 'reset']) {
    const accel = map[action]
    if (!accel) { result[action] = false; continue }
    try {
      const ok = globalShortcut.register(accel, () => broadcastTimerAction(action))
      if (ok) timerHotkeys[action] = accel
      result[action] = ok
    } catch { result[action] = false }
  }
  return result
}
ipcMain.handle('timer:setHotkeys', (e, map) => setTimerHotkeys(map || {}))

// Bring the window back into a normal, visible, focused state (from the tray or after hiding).
function restoreWindow() {
  const w = mainWindow; if (!w || w.isDestroyed()) return
  if (w.isMinimized()) {
    w.restore() // the 'restore' handler fades it back in (draw-in)
  } else {
    w.setOpacity(1)
    if (!w.isVisible()) w.show()
  }
  w.focus()
}

// --- Auto-update (electron-updater + GitHub releases) ---
// Downloads new versions in the background and tells the renderer so it can show the bottom-left
// update banner. The user picks when to restart-and-install. Only active in the packaged app.
autoUpdater.autoDownload = true
autoUpdater.autoInstallOnAppQuit = true
let manualCheck = false

function sendUpdate(payload) {
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('update:status', payload)
}

function wireAutoUpdater() {
  autoUpdater.on('checking-for-update', () => sendUpdate({ state: 'checking' }))
  autoUpdater.on('update-available', (info) => sendUpdate({ state: 'available', current: app.getVersion(), next: info.version }))
  autoUpdater.on('update-not-available', () => {
    sendUpdate({ state: 'none', current: app.getVersion() })
    if (manualCheck) dialog.showMessageBox(mainWindow, { type: 'info', title: 'Up to date', message: `You're on the latest version (v${app.getVersion()}).`, buttons: ['OK'] })
    manualCheck = false
  })
  autoUpdater.on('download-progress', (p) => sendUpdate({ state: 'downloading', percent: Math.round(p.percent || 0) }))
  autoUpdater.on('update-downloaded', (info) => sendUpdate({ state: 'downloaded', current: app.getVersion(), next: info.version }))
  autoUpdater.on('error', (err) => {
    const msg = String(err?.message || err || '')
    // A 404 / "no published version" just means there is no release to update to (private repo
    // or none published yet) — surface that as "up to date", not a wall of HTTP headers.
    const benign = /\b404\b|Unable to find latest version|No published versions|releases\.atom|ERR_UPDATER_CHANNEL_FILE_NOT_FOUND|latest\.yml/i.test(msg)
    const network = /net::|ENOTFOUND|ETIMEDOUT|ECONNREFUSED|EAI_AGAIN|getaddrinfo/i.test(msg)
    sendUpdate({ state: benign ? 'none' : 'error', message: benign ? '' : msg })
    if (manualCheck) {
      if (benign) dialog.showMessageBox(mainWindow, { type: 'info', title: 'Up to date', message: `You're on the latest version (v${app.getVersion()}).`, buttons: ['OK'] })
      else if (network) dialog.showMessageBox(mainWindow, { type: 'warning', title: 'Updates', message: "Couldn't reach the update server. Check your internet connection and try again.", buttons: ['OK'] })
      else dialog.showMessageBox(mainWindow, { type: 'warning', title: 'Updates', message: `Couldn't check for updates:\n${msg.split('\n')[0]}`, buttons: ['OK'] })
    }
    manualCheck = false
  })
}

function checkForUpdates(manual = false) {
  manualCheck = manual
  if (!app.isPackaged) {
    if (manual) dialog.showMessageBox(mainWindow, { type: 'info', title: 'Updates', message: 'Update checks only run in the installed app.', buttons: ['OK'] })
    return
  }
  autoUpdater.checkForUpdates().catch((err) => sendUpdate({ state: 'error', message: String(err?.message || err) }))
}

ipcMain.handle('app:version', () => app.getVersion())
ipcMain.on('update:check', () => checkForUpdates(true))
ipcMain.on('update:install', () => { try { autoUpdater.quitAndInstall() } catch (e) { sendUpdate({ state: 'error', message: String(e?.message || e) }) } })

// Bring the window to the front and route the app to a page (used by the tray menu).
function goToRoute(route) {
  restoreWindow()
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('app:navigate', route)
}

// System-tray icon: the app logo, scaled to a crisp small size. Left-click shows the window;
// right-click opens a menu (open, settings, check for updates, Discord, quit).
function createTray() {
  try {
    const base = nativeImage.createFromPath(ICON_PATH)
    if (base.isEmpty()) return
    const icon = base.resize({ width: 16, height: 16, quality: 'best' })
    tray = new Tray(icon)
    tray.setToolTip("Exile Codex")
    tray.setContextMenu(Menu.buildFromTemplate([
      { label: "Open Exile Codex", click: restoreWindow },
      { label: 'Settings', click: () => goToRoute('/settings') },
      { label: 'Check for updates…', click: () => checkForUpdates(true) },
      { label: 'Toggle game overlay', click: toggleOverlayVisibility },
      { type: 'separator' },
      { label: 'Join our Discord', click: () => shell.openExternal(DISCORD_URL) },
      { type: 'separator' },
      { label: 'Quit', click: () => app.quit() },
    ]))
    tray.on('click', restoreWindow)
  } catch { /* tray is a nicety — never let it block startup */ }
}

app.whenReady().then(() => {
  protocol.handle('app', serveBundle)
  registerTrade(ipcMain)
  registerGameLog(ipcMain, () => BrowserWindow.getAllWindows())
  registerOverlayWindow(ipcMain, overlayUrlFor)
  registerXileClipboard(ipcMain, () => BrowserWindow.getAllWindows())
  createWindow()
  // Begin zone tracking immediately using the remembered Client.txt (or auto-detect), so it works
  // from launch and the saved location is never "forgotten".
  try { autostartGameLog() } catch {}

  // OS idle signal for the speedrun timer (the log has no fine-grained idle/movement). Broadcast
  // system-wide seconds-since-input every 2s on the same gamelog event channel; the renderer's timer
  // pauses when you've been idle past its threshold (you're not actively running).
  setInterval(() => {
    try {
      const idleSec = powerMonitor.getSystemIdleTime()
      for (const w of BrowserWindow.getAllWindows()) if (w && !w.isDestroyed()) w.webContents.send('gamelog:event', { type: 'idle', idleSec, at: Date.now() })
    } catch { /* powerMonitor can throw very early; ignore */ }
  }, 2000)
  createTray()
  wireAutoUpdater()
  // Check for updates shortly after launch (once the window can receive the banner event).
  setTimeout(() => checkForUpdates(false), 5000)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('will-quit', () => { globalShortcut.unregisterAll(); try { stopGameLog() } catch {} try { closeOverlay() } catch {} })
app.on('before-quit', () => { if (tray) { tray.destroy(); tray = null } })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
