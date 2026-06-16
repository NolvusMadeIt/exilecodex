// The Electron preload exposes window.nolvusDesktop. The ornate "window chrome" (custom
// title bar + filigree frame) renders only in the desktop shell — the web stays clean.
// A localStorage flag ('nolvus-chrome' = '1') lets us preview the chrome in a browser.
export const desktopApi = typeof window !== 'undefined' ? window.nolvusDesktop : null

// Where the "get the desktop app" buttons point. NOTE: the repo is currently private, so its
// release assets aren't publicly downloadable — point this at a public host (a public release
// mirror, the landing page, or a public repo) before shipping the web banner to real users.
export const DOWNLOAD_URL = 'https://github.com/NolvusMadeIt/nolvusfiltereditor/releases/latest'

export function isDesktopChrome() {
  if (desktopApi?.isDesktop) return true
  try { return localStorage.getItem('nolvus-chrome') === '1' } catch { return false }
}
