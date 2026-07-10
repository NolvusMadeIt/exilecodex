// Merchant-history persistence — our storage layer for the vendored XileHUD history renderer.
// One JSON file per league under userData, mirroring the upstream store shape verbatim
// ({ entries, totals, lastSync, lastFetchAt, league }) so the renderer modules run unmodified.
// The network half lives in trade.cjs (our transport, our identity rules) — see history().
const { app } = require('electron')
const fs = require('fs')
const path = require('path')

const GAME = 'poe2'
const EMPTY = () => ({ entries: [], totals: {}, lastSync: 0, lastFetchAt: 0 })

const fileFor = (league) => {
  const safe = String(league || 'Standard').replace(/[^a-zA-Z0-9_-]/g, '_')
  return path.join(app.getPath('userData'), `merchant-history-${GAME}-${safe}.json`)
}

function loadHistory(league) {
  try {
    const raw = JSON.parse(fs.readFileSync(fileFor(league), 'utf8'))
    if (raw && typeof raw === 'object') {
      return {
        entries: Array.isArray(raw.entries) ? raw.entries : [],
        totals: raw.totals && typeof raw.totals === 'object' ? raw.totals : {},
        lastSync: Number(raw.lastSync) || 0,
        lastFetchAt: Number(raw.lastFetchAt) || 0,
        league: raw.league || league,
      }
    }
  } catch { /* missing or corrupt file → fresh store; the renderer shows its empty state */ }
  return { ...EMPTY(), league }
}

function saveHistory(store, league) {
  try {
    const file = fileFor(league)
    const data = {
      entries: store?.entries || [],
      totals: store?.totals || {},
      lastSync: store?.lastSync || 0,
      lastFetchAt: store?.lastFetchAt || 0,
      league: league || store?.league || 'Standard',
    }
    fs.writeFileSync(file, JSON.stringify(data, null, 2))
    return { ok: true, league: data.league }
  } catch (e) {
    return { ok: false, error: String(e?.message || 'write_failed') }
  }
}

function registerHistoryStore(ipcMain) {
  ipcMain.handle('xile:history:load', (_e, league) => loadHistory(league))
  ipcMain.handle('xile:history:save', (_e, store, league) => saveHistory(store, league))
}

module.exports = { loadHistory, saveHistory, registerHistoryStore }
