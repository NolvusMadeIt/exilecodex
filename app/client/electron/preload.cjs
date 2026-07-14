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
  // Per-plugin updates: downloaded plugin .lua files persist to userData and are
  // served over the bundled file, so a plugin updates without a full app rebuild.
  pluginOverrides: () => ipcRenderer.sendSync('ec:plugin-overrides') || {},
  pluginWrite: (id, version, source) =>
    ipcRenderer.invoke('ec:plugin-write', { id: String(id), version: String(version || ''), source: String(source || '') }),
  pluginRemove: (id) => ipcRenderer.invoke('ec:plugin-remove', String(id)),
  // Configurable global keybinds. setKeybinds takes a JSON string { accel: action };
  // onKeybind streams the action string when a bound shortcut fires.
  setKeybinds: (json) => { try { ipcRenderer.send('ec:set-keybinds', JSON.parse(json || '{}')) } catch { /* */ } },
  onKeybind: (cb) => ipcRenderer.on('ec:keybind', (_e, action) => cb(action)),
  quit: () => ipcRenderer.send('ec:quit'),
  windowMinimize: () => ipcRenderer.send('ec:window-minimize'),
  windowMaximizeToggle: () => ipcRenderer.send('ec:window-maximize-toggle'),
  windowClose: () => ipcRenderer.send('ec:window-close'),
  onWindowState: (cb) => ipcRenderer.on('ec:window-state', (_e, state) => cb(state || {})),
  // Real page zoom — scales everything, unlike body font-size.
  setZoom: (factor) => webFrame.setZoomFactor(Number(factor) || 1),
  // Native path pickers + install-location scanning (settings → Game paths).
  pickPath: (isFile, cb) => ipcRenderer.invoke('ec:pick-path', { file: !!isFile }).then(cb),
  autoLocate: (kind, hint, cb) => ipcRenderer.invoke('ec:auto-locate', { kind, hint }).then(cb),
  // Loot filter: write the generated .filter straight into the PoE2 filter folder.
  saveFilter: (folder, name, content, cb) =>
    ipcRenderer.invoke('ec:save-filter', { folder: folder || '', name: name || '', content: content || '' }).then(cb),
  openFilterFolder: (folder, cb) => ipcRenderer.invoke('ec:open-filter-folder', folder || '').then(cb || (() => {})),
  // Client.txt smart detection: point the watcher at a path, subscribe to
  // { char, cls, level, area, active } updates (zone changes + level-ups).
  watchClientTxt: (p) => ipcRenderer.send('ec:watch-clienttxt', p || ''),
  onDetect: (cb) => ipcRenderer.on('ec:detect', (_e, data) => cb(data)),
  // Speedrun events with the log's ms uptime counter: {type:'zone'|'level'|'load', ms, ...}
  onDetectEvent: (cb) => ipcRenderer.on('ec:detect-event', (_e, ev) => cb(ev)),
  // Tray commands: {cmd:'settings', group} — open the Settings panel to a group.
  onTray: (cb) => ipcRenderer.on('ec:tray', (_e, msg) => cb(msg)),
  // First-launch guided tour: the renderer reports live target rectangles and
  // receives state/commands for the in-app walkthrough layer.
  tutorialStart: () => ipcRenderer.send('ec:tutorial-start'),
  tutorialAction: (action) => ipcRenderer.send('ec:tutorial-action', String(action || '')),
  tutorialTarget: (kind, x, y, width, height) =>
    ipcRenderer.send('ec:tutorial-target', {
      kind: String(kind || ''), x: Number(x) || 0, y: Number(y) || 0,
      width: Number(width) || 0, height: Number(height) || 0,
    }),
  onTutorialState: (cb) => ipcRenderer.on('ec:tutorial-state', (_e, state) => cb(state)),
  onTutorialCommand: (cb) => ipcRenderer.on('ec:tutorial-command', (_e, command) => cb(command)),
  // Bounded overlay geometry: the renderer reports only visible UI bounds and
  // compensates local coordinates when the native window moves.
  overlayLayout: (json) => ipcRenderer.send('ec:overlay-layout', String(json || '{}')),
  onOverlayOrigin: (cb) => ipcRenderer.on('ec:overlay-origin', (_e, origin) => cb(origin)),
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
  // Boot splash: stream renderer-side init milestones to the launch splash
  // window, then signal that the UI is ready so the shell hands off from the
  // splash to the app. Both are no-ops if the splash has already closed.
  bootStep: (line, level) =>
    ipcRenderer.send('ec:boot-step', { line: String(line == null ? '' : line), level: String(level || 'info') }),
  // Boot splash update phase: set the subtitle/visual mode, and drive a progress bar.
  bootPhase: (sub, mode) => ipcRenderer.send('ec:boot-phase', { sub: String(sub == null ? '' : sub), mode: String(mode || '') }),
  bootProgress: (percent, label) => ipcRenderer.send('ec:boot-progress', { progress: Number(percent), label: label == null ? '' : String(label) }),
  bootReady: () => ipcRenderer.send('ec:boot-ready'),
})
