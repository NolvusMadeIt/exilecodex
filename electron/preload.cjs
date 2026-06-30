// Minimal, secure preload. contextIsolation is on and nodeIntegration is off, so the
// renderer (our web app) gets no Node access. We expose a small read-only flag so the web
// app can detect the desktop shell, plus the window controls the custom title bar needs.
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('nolvusDesktop', {
  isDesktop: true,
  platform: process.platform,
  // Window controls for the custom (frameless) title bar.
  minimize: () => ipcRenderer.send('win:minimize'),
  toggleMaximize: () => ipcRenderer.send('win:maximize'),
  close: () => ipcRenderer.send('win:close'),
  isMaximized: () => ipcRenderer.invoke('win:isMaximized'),
  // Subscribe to maximize/restore changes. Returns an unsubscribe fn.
  onMaximizeChange: (cb) => {
    const handler = (_e, value) => cb(!!value)
    ipcRenderer.on('win:maximized', handler)
    return () => ipcRenderer.removeListener('win:maximized', handler)
  },
  // --- Game overlay ---
  overlayApply: (opts) => ipcRenderer.send('overlay:apply', opts),
  overlayToggle: () => ipcRenderer.send('overlay:toggle'),
  overlaySetHotkey: (accel) => ipcRenderer.invoke('overlay:setHotkey', accel),
  overlayGetDisplays: () => ipcRenderer.invoke('overlay:getDisplays'),
  // --- App version + auto-update ---
  getVersion: () => ipcRenderer.invoke('app:version'),
  checkForUpdate: () => ipcRenderer.send('update:check'),
  installUpdate: () => ipcRenderer.send('update:install'),
  // Subscribe to update status: { state, current?, next?, percent?, message? }. Returns unsubscribe.
  onUpdateStatus: (cb) => {
    const handler = (_e, payload) => cb(payload)
    ipcRenderer.on('update:status', handler)
    return () => ipcRenderer.removeListener('update:status', handler)
  },
  // Tray-driven navigation (e.g. "Settings"). Returns unsubscribe.
  onNavigate: (cb) => {
    const handler = (_e, route) => cb(route)
    ipcRenderer.on('app:navigate', handler)
    return () => ipcRenderer.removeListener('app:navigate', handler)
  },
})

// --- Price Check live trade transport ---
// The renderer checks for `window.nolvusTrade` to know it can pull live prices (desktop only). The
// main process makes the calls from this machine with the user's POESESSID (passed per call).
contextBridge.exposeInMainWorld('nolvusTrade', {
  isDesktop: true,
  price: (args) => ipcRenderer.invoke('trade:price', args),
  login: () => ipcRenderer.invoke('trade:login'),
  hasSession: () => ipcRenderer.invoke('trade:hasSession'),
})

// --- Plugin overlay window (pop a single plugin out as an always-on-top widget) ---
// The renderer checks for `window.nolvusOverlay` to know it can pop a plugin out (desktop only).
contextBridge.exposeInMainWorld('nolvusOverlay', {
  isDesktop: true,
  open: (pluginId) => ipcRenderer.invoke('pluginOverlay:open', pluginId),
  close: () => ipcRenderer.invoke('pluginOverlay:close'),
  toggle: (pluginId) => ipcRenderer.invoke('pluginOverlay:toggle', pluginId),
  isOpen: () => ipcRenderer.invoke('pluginOverlay:isOpen'),
  setHotkey: (pluginId, accel, mode) => ipcRenderer.invoke('pluginOverlay:setHotkey', { pluginId, accel, mode }),
})

// --- Speedrun timer global hotkeys ---
// Settings calls setHotkeys({start,pause,stop,reset}); the run timer subscribes via onAction so a
// global key press (even while the game is focused) starts/pauses/stops/resets the run.
contextBridge.exposeInMainWorld('nolvusTimer', {
  isDesktop: true,
  setHotkeys: (map) => ipcRenderer.invoke('timer:setHotkeys', map),
  onAction: (cb) => {
    const handler = (_e, action) => cb(action)
    ipcRenderer.on('timer:action', handler)
    return () => ipcRenderer.removeListener('timer:action', handler)
  },
})

// --- Game-log watcher (Campaign Guide auto-tracking) ---
// The renderer checks for `window.nolvusGameLog` to know it can auto-detect the live zone by tailing
// PoE2's Client.txt (desktop only, read-only). `onEvent` streams {type:'zone'|'level'|'death', …}.
contextBridge.exposeInMainWorld('nolvusGameLog', {
  isDesktop: true,
  start: (opts) => ipcRenderer.invoke('gamelog:start', opts),
  stop: () => ipcRenderer.invoke('gamelog:stop'),
  status: () => ipcRenderer.invoke('gamelog:status'),
  pickPath: () => ipcRenderer.invoke('gamelog:pickPath'),
  // Speedrun run history (device-local).
  listRuns: () => ipcRenderer.invoke('runs:list'),
  saveRun: (run) => ipcRenderer.invoke('runs:save', run),
  clearRuns: () => ipcRenderer.invoke('runs:clear'),
  onEvent: (cb) => {
    const handler = (_e, payload) => cb(payload)
    ipcRenderer.on('gamelog:event', handler)
    return () => ipcRenderer.removeListener('gamelog:event', handler)
  },
})
