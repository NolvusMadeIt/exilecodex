import { test, expect, describe } from 'vitest'
import { classifyResponse } from '../../../electron/trade.cjs'

// The desktop trade transport must tell a Cloudflare challenge apart from a genuine expired/invalid
// POESESSID. GGG's own auth errors come back as JSON ({error:{code,message}}); a Cloudflare block is
// an HTML challenge page (no JSON) and/or carries a cf-mitigated header. Getting this wrong is the
// bug that trapped users in an endless "re-paste your POESESSID" loop on what was really a Cloudflare
// 403 — which re-pasting can never fix (you need cf_clearance from passing the challenge in a window).

describe('classifyResponse — Cloudflare vs real auth', () => {
  test('Cloudflare HTML challenge 403 → cloudflare', () => {
    const r = classifyResponse({
      status: 403,
      headers: { 'cf-ray': '8aa1b2c3d4-IAD', server: 'cloudflare' },
      json: null,
      text: '<!DOCTYPE html><html><head><title>Just a moment...</title></head><body>challenge-platform</body></html>',
    })
    expect(r.kind).toBe('cloudflare')
    expect(r.cfRay).toBe('8aa1b2c3d4-IAD')
  })

  test('Cloudflare managed-challenge header → cloudflare even if body is small', () => {
    const r = classifyResponse({ status: 403, headers: { 'cf-mitigated': 'challenge', 'cf-ray': 'abc' }, json: null, text: '' })
    expect(r.kind).toBe('cloudflare')
  })

  test('Cloudflare "Just a moment" served as 503 → cloudflare', () => {
    const r = classifyResponse({ status: 503, headers: { server: 'cloudflare' }, json: null, text: '<html>Just a moment... cf-chl-bypass</html>' })
    expect(r.kind).toBe('cloudflare')
  })

  test('bare 403 with an empty body (no JSON) is Cloudflare, not GGG', () => {
    const r = classifyResponse({ status: 403, headers: {}, json: null, text: '' })
    expect(r.kind).toBe('cloudflare')
  })

  test('genuine expired POESESSID (GGG JSON 401) → auth', () => {
    const r = classifyResponse({ status: 401, headers: { server: 'cloudflare' }, json: { error: { code: 1, message: 'You are not authenticated.' } }, text: '' })
    expect(r.kind).toBe('auth')
    expect(r.message).toMatch(/not authenticated/i)
  })

  test('GGG forbidden as JSON 403 → auth (not Cloudflare)', () => {
    const r = classifyResponse({ status: 403, headers: { server: 'cloudflare' }, json: { error: { code: 6, message: 'Forbidden' } }, text: '' })
    expect(r.kind).toBe('auth')
  })

  test('rate limited → rate', () => {
    expect(classifyResponse({ status: 429, headers: { 'retry-after': '57' }, json: null, text: '' }).kind).toBe('rate')
  })

  test('success → ok', () => {
    expect(classifyResponse({ status: 200, headers: {}, json: { id: 'x', result: [], total: 0 }, text: '' }).kind).toBe('ok')
  })
})
