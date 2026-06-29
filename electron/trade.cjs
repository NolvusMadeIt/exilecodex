// Desktop trade transport — the Exiled-Exchange-2 / Awakened-PoE-Trade method. The browser and any
// datacenter proxy get Cloudflare-403'd; only the user's own machine + a real browser session works.
// So we use Electron's Chromium network stack (net.request) over a PERSISTENT session partition that
// holds the user's pathofexile.com cookies (POESESSID + cf_clearance). The user either pastes their
// POESESSID (we set it on that session) or — far more reliable for Cloudflare — logs in via a window,
// which captures cf_clearance too. search → fetch(10) → raw listings; politely spaced + serialized.
const { net, session, BrowserWindow } = require('electron')

const REALM = 'poe2'
const HOST = 'www.pathofexile.com'
const PARTITION = 'persist:poe2-trade'
// A real Chrome UA — combined with net.request's Chromium TLS fingerprint, this is what gets past
// Cloudflare from the user's residential IP.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

const ses = () => session.fromPartition(PARTITION)

async function setPoesessid(value) {
  if (!value) return
  try {
    await ses().cookies.set({ url: `https://${HOST}`, name: 'POESESSID', value, domain: '.pathofexile.com', path: '/', secure: true, httpOnly: true })
  } catch { /* non-fatal */ }
}

// Electron net.request over the persistent session (sends its cookies + a browser fingerprint).
function netReq(method, urlStr, bodyObj) {
  return new Promise((resolve) => {
    const r = net.request({ method, url: urlStr, partition: PARTITION, useSessionCookies: true })
    r.setHeader('User-Agent', UA)
    r.setHeader('Accept', 'application/json')
    r.setHeader('Origin', `https://${HOST}`)
    r.setHeader('Referer', `https://${HOST}/trade2/search/${REALM}`)
    if (bodyObj) r.setHeader('Content-Type', 'application/json')
    let data = ''
    r.on('response', (res) => {
      res.on('data', (c) => (data += c))
      res.on('end', () => { let json = null; try { json = JSON.parse(data) } catch {} resolve({ status: res.statusCode || 0, headers: res.headers, json }) })
    })
    r.on('error', () => resolve({ status: 0, headers: {}, json: null }))
    if (bodyObj) r.write(JSON.stringify(bodyObj))
    r.end()
  })
}

let chain = Promise.resolve()
let lastAt = 0
const MIN_SPACING = 1500
function spaced(fn) {
  const run = async () => {
    const wait = Math.max(0, MIN_SPACING - (Date.now() - lastAt))
    if (wait) await new Promise((r) => setTimeout(r, wait))
    lastAt = Date.now()
    return fn()
  }
  chain = chain.then(run, run)
  return chain
}
const retryAfter = (res) => Number(res.headers['retry-after'] || res.headers['Retry-After']) || 60

async function price({ query, league, poesessid }) {
  if (!league) return { error: 'no-league' }
  if (poesessid) await setPoesessid(poesessid)
  // Need either a pasted POESESSID or a logged-in session.
  const cookies = await ses().cookies.get({ domain: '.pathofexile.com', name: 'POESESSID' }).catch(() => [])
  if (!cookies.length) return { error: 'no-auth' }

  const s = await spaced(() => netReq('POST', `https://${HOST}/api/trade2/search/${REALM}/${encodeURIComponent(league)}`, query))
  if (s.status === 401 || s.status === 403) return { error: 'auth', status: s.status }
  if (s.status === 429) return { error: 'rate', retryAfter: retryAfter(s) }
  if (s.status !== 200 || !s.json) return { error: 'search', status: s.status, detail: s.json?.error?.message || (s.json ? JSON.stringify(s.json).slice(0, 200) : '') }

  const { id, result = [], total = 0 } = s.json
  if (!result.length) return { total: 0, listings: [] }

  const hashes = result.slice(0, 10).join(',')
  const f = await spaced(() => netReq('GET', `https://${HOST}/api/trade2/fetch/${hashes}?query=${id}&realm=${REALM}`))
  if (f.status === 401 || f.status === 403) return { error: 'auth', status: f.status }
  if (f.status === 429) return { error: 'rate', retryAfter: retryAfter(f) }
  if (f.status !== 200 || !f.json) return { error: 'fetch', status: f.status, detail: f.json?.error?.message || (f.json ? JSON.stringify(f.json).slice(0, 200) : '') }

  return { total, listings: f.json.result || [] }
}

// Open a real pathofexile.com login window on our session partition. When the user logs in, the
// session captures POESESSID + cf_clearance, so subsequent net.request calls pass Cloudflare.
function login() {
  return new Promise((resolve) => {
    const win = new BrowserWindow({
      width: 980, height: 820, title: 'Log in to Path of Exile',
      autoHideMenuBar: true, webPreferences: { partition: PARTITION },
    })
    let done = false
    const finish = async () => {
      if (done) return
      const cookies = await ses().cookies.get({ domain: '.pathofexile.com', name: 'POESESSID' }).catch(() => [])
      if (cookies.length) { done = true; setTimeout(() => { if (!win.isDestroyed()) win.close() }, 800); resolve({ ok: true }) }
    }
    win.webContents.on('did-navigate', finish)
    win.webContents.on('did-frame-navigate', finish)
    win.on('closed', () => { if (!done) resolve({ ok: false, cancelled: true }) })
    win.loadURL(`https://${HOST}/login`)
  })
}

function registerTrade(ipcMain) {
  ipcMain.handle('trade:price', (_e, args) => price(args || {}).catch((err) => ({ error: 'exception', detail: String(err?.message || err) })))
  ipcMain.handle('trade:login', () => login().catch((err) => ({ ok: false, detail: String(err?.message || err) })))
  ipcMain.handle('trade:hasSession', async () => {
    const c = await ses().cookies.get({ domain: '.pathofexile.com', name: 'POESESSID' }).catch(() => [])
    return { hasSession: c.length > 0 }
  })
}

module.exports = { price, login, registerTrade }
