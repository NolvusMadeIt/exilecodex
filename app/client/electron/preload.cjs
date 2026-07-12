// Bridge between the Lua/Bootstrap UI and the desktop shell.
const { contextBridge, ipcRenderer, webFrame } = require('electron')

// Filesystem access stays in the main process so this preload can remain
// sandboxed. The main process caches this value before the renderer loads.
const supabase = ipcRenderer.sendSync('ec:get-supabase-config') || { url: '', key: '' }

contextBridge.exposeInMainWorld('exileShell', {
  version: process.versions.electron,
  platform: process.platform,
  supabase,
  // Windowless overlay: let clicks pass through empty space (true) or reach
  // our UI (false). Driven by cursor tracking in boot.js.
  setMouseThrough: (flag) => ipcRenderer.send('ec:mouse-through', !!flag),
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
  // Game overlay: arm the global show/hide hotkey + pin to a display.
  setOverlayConfig: (enabled, hotkey, display) =>
    ipcRenderer.send('ec:overlay-config', {
      enabled: !!enabled, hotkey: String(hotkey || ''), display: String(display || 'auto'),
    }),
  listDisplays: (cb) => ipcRenderer.invoke('ec:list-displays').then(cb),
  // WoW-style SavedVariables: durable per-user settings file.
  loadVars: () => ipcRenderer.sendSync('ec:load-vars') || '',
  saveVars: (json) => ipcRenderer.send('ec:save-vars', String(json || '')),
})
