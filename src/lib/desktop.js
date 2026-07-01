// The Electron preload exposes window.nolvusDesktop. The ornate "window chrome" (custom
// title bar + filigree frame) renders only in the desktop shell — the web stays clean.
// A localStorage flag ('nolvus-chrome' = '1') lets us preview the chrome in a browser.
export const desktopApi = typeof window !== 'undefined' ? window.nolvusDesktop : null

// Where the "get the desktop app" buttons point — the PUBLIC releases repo (installers only).
// The main code repo stays private; releases live here so downloads + auto-update are public.
export const DOWNLOAD_URL = 'https://github.com/NolvusMadeIt/nolvusfilter-releases/releases/latest'

export function isDesktopChrome() {
  if (desktopApi?.isDesktop) return true
  try { return localStorage.getItem('nolvus-chrome') === '1' } catch { return false }
}
