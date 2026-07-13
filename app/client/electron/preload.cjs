// Bridge between the Lua/Bootstrap UI and the desktop shell.
const { contextBridge, ipcRenderer, webFrame } = require('electron')

// Filesystem access stays in the main process so this preload can remain
// sandboxed. The main process caches this value before the renderer loads.
const supabase = ipcRenderer.sendSync('ec:get-supabase-config') || { url: '', key: '' }

contextBridge.exposeInMainWorld('exileShell', {
  version: process.versions.electron,
  platform: process.platform,
  supabase,
  // Which personality the shell launched: 'window' (normal app window, default)
  // or 'overlay' (transparent click-through). Drives the renderer's background
  // + whether it arms click-through hover tracking.
  mode: ipcRenderer.sendSync('ec:get-mode') || 'window',
  // Developer mode: a session unlock held in the main process (survives a
  // window<->overlay switch, relocks when the app fully closes).
  getDevUnlocked: () => !!ipcRenderer.sendSync('ec:dev-get'),
  setDevUnlocked: (v) => ipcRenderer.send('ec:dev-set', !!v),
  // Windowless overlay: let clicks pass through empty space (true) or reach
  // our UI (false). Driven by cursor tracking in boot.js.
  setMouseThrough: (flag) => ipcRenderer.send('ec:mouse-through', !!flag),
  // Overlay only: temporarily make the (non-activating) overlay focusable so a
  // text field can take keyboard focus; dropped again when the field blurs.
  setOverlayFocusable: (flag) => ipcRenderer.send('ec:overlay-focusable', !!flag),
  quit: () => ipcRenderer.send('ec:quit'),
  // Real page zoom — scales everything, unlike body font-size.
  setZoom: (factor) => webFrame.setZoomFactor(Number(factor) || 1),
  // Native path pickers + install-location scanning (settings → Game paths).
  pickPath: (isFile, cb) => ipcRenderer.invoke('ec:pick-path', { file: !!isFile }).then(cb),
  autoLocate: (kind, hint, cb) => ipcRenderer.invoke('ec:auto-locate', { kind, hint }).then(cb),
  // Client.txt smart detection: point the watcher at a path, subscribe to
  // { char, cls, level, area, active } updates (zone changes + level-ups).
  watchClientTxt: (p) => ipcRenderer.send('ec:watch-clienttxt', p || ''),
  onDetect: (cb) => ipcRenderer.on('ec:detect', (_e, data) => cb(data)),
  // Speedrun events with the log's ms uptime counter: {type:'zone'|'level'|'load', ms, ...}
  onDetectEvent: (cb) => ipcRenderer.on('ec:detect-event', (_e, ev) => cb(ev)),
  // Tray commands: {cmd:'settings', group} — open the Settings panel to a group.
  onTray: (cb) => ipcRenderer.on('ec:tray', (_e, msg) => cb(msg)),
  // Game overlay: arm the global show/hide hotkey + pin to a display.
  setOverlayConfig: (enabled, hotkey, display) =>
    ipcRenderer.send('ec:overlay-config', {
      enabled: !!enabled, hotkey: String(hotkey || ''), display: String(display || 'auto'),
    }),
  listDisplays: (cb) => ipcRenderer.invoke('ec:list-displays').then(cb),
  // WoW-style SavedVariables: durable per-user settings file.
  loadVars: () => ipcRenderer.sendSync('ec:load-vars') || '',
  saveVars: (json) => ipcRenderer.send('ec:save-vars', String(json || '')),
  // Auto-update (electron-updater). appVersion is the installed build; onUpdate
  // streams { type:'checking'|'available'|'none'|'progress'|'downloaded'|'error', ... };
  // checkForUpdate() re-checks on demand; installUpdate() restarts into the new build.
  appVersion: ipcRenderer.sendSync('ec:app-version') || '',
  onUpdate: (cb) => ipcRenderer.on('ec:update-event', (_e, ev) => cb(ev)),
  checkForUpdate: () => ipcRenderer.send('ec:update-check'),
  installUpdate: () => ipcRenderer.send('ec:update-install'),
  setUpdateAuto: (flag) => ipcRenderer.send('ec:update-auto', !!flag),
  downloadUpdate: () => ipcRenderer.send('ec:update-download'),
})
