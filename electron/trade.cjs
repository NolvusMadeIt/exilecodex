// Desktop trade transport — Cloudflare-aware. The PoE2 trade API (pathofexile.com/api/trade2) sits
// behind Cloudflare. A request only gets through if it carries a valid `cf_clearance` cookie that was
// earned by passing Cloudflare's challenge in a REAL browser session — and that cf_clearance is bound
// to the EXACT User-Agent that earned it (and to the IP). POESESSID is for GGG auth; cf_clearance is
// for Cloudflare. You need BOTH.
//
// So:
//   • We use Electron's Chromium net.request over a PERSISTENT session partition that holds the user's
//     pathofexile.com cookies (POESESSID + cf_clearance).
//   • We do NOT spoof the User-Agent. Cloudflare's "Verify you are human" challenge LOOPS when the UA
//     string disagrees with the rest of the browser identity (JS navigator props + Sec-CH-UA client
//     hints, which still reveal Electron). A clean fake Chrome UA fails this consistency check, so the
//     interactive solve never sticks. We instead use Electron's OWN native UA for BOTH the login
//     window (which earns cf_clearance) and net.request (which spends it) — fully consistent, so the
//     challenge passes and the cf_clearance it issues (bound to that UA) validates on later requests.
//   • Pasting a POESESSID alone is NOT enough: without cf_clearance Cloudflare 403s every request. The
//     reliable path is the "Log in" window, which loads /trade2 so the trade path's challenge is
//     solved and cf_clearance is captured. (This is how Awakened-PoE-Trade / Exiled-Exchange-2 do it:
//     "click Browser to complete a CAPTCHA".)
//
// A genuine expired/invalid POESESSID returns a JSON {error:{...}} (401/403); a Cloudflare block is an
// HTML challenge page (or a cf-mitigated header). classifyResponse() tells them apart so the UI shows
// the RIGHT fix (pass the Cloudflare check) instead of an endless, useless "re-paste your POESESSID".

const REALM = 'poe2'
const HOST = 'www.pathofexile.com'
const PARTITION = 'persist:poe2-trade'

// --- pure + testable: classify a trade-API response ---------------------------------------------
// GGG auth failures arrive as JSON ({error:{code,message}}). A Cloudflare challenge is an HTML page
// (no JSON) and/or carries cf-mitigated / cf-ray. A bare 403 with no JSON body is Cloudflare too
// (GGG always answers with JSON). Exported for unit tests — keep it dependency-free.
function classifyResponse({ status, headers = {}, json = null, text = '' } = {}) {
  const get = (k) => {
    const v = headers[k] ?? headers[k.toLowerCase()] ?? headers[k.toUpperCase()]
    return Array.isArray(v) ? v.join(',') : (v || '')
  }
  const cfMitigated = get('cf-mitigated')
  const cfRay = get('cf-ray')
  const htmlBody = json === null && /<\s*html|just a moment|challenge-platform|cf-chl|attention required|cloudflare/i.test(text || '')
  const cloudflare = !!cfMitigated || htmlBody || (status === 403 && json === null)
  if (cloudflare) return { kind: 'cloudflare', cfRay }
  if (status === 401 || status === 403) return { kind: 'auth', message: json?.error?.message || '' }
  if (status === 429) return { kind: 'rate' }
  if (status === 200 && json) return { kind: 'ok' }
  return { kind: 'other', status, message: json?.error?.message || (text ? String(text).slice(0, 200) : '') }
}

// --- electron-bound helpers (lazy require so the module stays unit-test importable) --------------
const ses = () => require('electron').session.fromPartition(PARTITION)
// Electron's own native User-Agent for this session. Deliberately NOT spoofed (see header note): we
// use this exact string for the login window AND net.request so the whole identity is consistent.
const nativeUA = () => { try { return ses().getUserAgent() } catch { return '' } }

async function cookieNames() {
  const all = await ses().cookies.get({ domain: '.pathofexile.com' }).catch(() => [])
  return new Set(all.map((c) => c.name))
}

async function setPoesessid(value) {
  if (!value) return
  try {
    await ses().cookies.set({ url: `https://${HOST}`, name: 'POESESSID', value: String(value).trim(), domain: '.pathofexile.com', path: '/', secure: true, httpOnly: true })
  } catch { /* non-fatal */ }
}

// Electron net.request over the persistent session (sends its cookies + a browser fingerprint). The
// User-Agent MUST equal the one the login window used to earn cf_clearance (see UA above).
function netReq(method, urlStr, bodyObj) {
  const { net } = require('electron')
  const ua = nativeUA()
  return new Promise((resolve) => {
    const r = net.request({ method, url: urlStr, partition: PARTITION, useSessionCookies: true })
    if (ua) r.setHeader('User-Agent', ua)
    r.setHeader('Accept', 'application/json')
    r.setHeader('Accept-Language', 'en-US,en;q=0.9')
    r.setHeader('Origin', `https://${HOST}`)
    r.setHeader('Referer', `https://${HOST}/trade2/search/${REALM}`)
    if (bodyObj) r.setHeader('Content-Type', 'application/json')
    let data = ''
    r.on('response', (res) => {
      res.on('data', (c) => (data += c))
      res.on('end', () => { let json = null; try { json = JSON.parse(data) } catch {} resolve({ status: res.statusCode || 0, headers: res.headers || {}, json, text: data }) })
    })
    r.on('error', () => resolve({ status: 0, headers: {}, json: null, text: '' }))
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
  // Need a POESESSID (auth). cf_clearance (Cloudflare) is also required but we surface that reactively
  // if the request gets challenged, so we don't block a session that already has a valid clearance.
  const names = await cookieNames()
  if (!names.has('POESESSID')) return { error: 'no-auth' }
  const hasClearance = names.has('cf_clearance')

  const s = await spaced(() => netReq('POST', `https://${HOST}/api/trade2/search/${REALM}/${encodeURIComponent(league)}`, query))
  const cs = classifyResponse(s)
  if (cs.kind === 'cloudflare') return { error: 'cloudflare', status: s.status, ray: cs.cfRay, hasClearance }
  if (cs.kind === 'auth') return { error: 'auth', status: s.status, detail: cs.message }
  if (cs.kind === 'rate') return { error: 'rate', retryAfter: retryAfter(s) }
  if (cs.kind !== 'ok') return { error: 'search', status: s.status, detail: cs.message }

  const { id, result = [], total = 0 } = s.json
  if (!result.length) return { total: 0, listings: [] }

  const hashes = result.slice(0, 10).join(',')
  const f = await spaced(() => netReq('GET', `https://${HOST}/api/trade2/fetch/${hashes}?query=${id}&realm=${REALM}`))
  const cf = classifyResponse(f)
  if (cf.kind === 'cloudflare') return { error: 'cloudflare', status: f.status, ray: cf.cfRay, hasClearance }
  if (cf.kind === 'auth') return { error: 'auth', status: f.status, detail: cf.message }
  if (cf.kind === 'rate') return { error: 'rate', retryAfter: retryAfter(f) }
  if (cf.kind !== 'ok') return { error: 'fetch', status: f.status, detail: cf.message }

  return { total, listings: f.json.result || [] }
}

// Open a real pathofexile.com session window on our partition. It loads the /trade2 page so
// Cloudflare's challenge for the trade path is solved (capturing cf_clearance) AND the user can sign
// in (capturing POESESSID). Uses the SAME UA as net.request so the cf_clearance it earns validates.
function login() {
  const { BrowserWindow } = require('electron')
  return new Promise((resolve) => {
    const win = new BrowserWindow({
      width: 1024, height: 860, title: 'Path of Exile — sign in & pass the Cloudflare check',
      autoHideMenuBar: true, webPreferences: { partition: PARTITION },
    })
    // No setUserAgent() — the window keeps Electron's native, self-consistent identity so Cloudflare's
    // interactive challenge actually sticks instead of looping.
    let done = false
    const finish = (payload) => {
      if (done) return
      done = true
      setTimeout(() => { try { if (!win.isDestroyed()) win.close() } catch {} }, 600)
      resolve(payload)
    }
    // Auto-close once the user is authed AND the trade page has actually loaded (challenge passed, so
    // cf_clearance has been captured along the way).
    const onLoad = async () => {
      if (done) return
      let url = ''
      try { url = win.webContents.getURL() } catch {}
      if (!/pathofexile\.com/i.test(url)) return
      const names = await cookieNames()
      if (names.has('POESESSID')) finish({ ok: true, hasSession: true, hasClearance: names.has('cf_clearance') })
    }
    win.webContents.on('did-finish-load', onLoad)
    win.webContents.on('did-navigate', onLoad)
    win.on('closed', async () => {
      if (done) return
      const names = await cookieNames().catch(() => new Set())
      resolve({ ok: names.has('POESESSID'), cancelled: !names.has('POESESSID'), hasClearance: names.has('cf_clearance') })
    })
    win.loadURL(`https://${HOST}/trade2/search/${REALM}/Standard`)
  })
}

function registerTrade(ipcMain) {
  ipcMain.handle('trade:price', (_e, args) => price(args || {}).catch((err) => ({ error: 'exception', detail: String(err?.message || err) })))
  ipcMain.handle('trade:login', () => login().catch((err) => ({ ok: false, detail: String(err?.message || err) })))
  ipcMain.handle('trade:hasSession', async () => {
    const names = await cookieNames()
    return { hasSession: names.has('POESESSID'), hasClearance: names.has('cf_clearance') }
  })
}

module.exports = { price, login, registerTrade, classifyResponse }
