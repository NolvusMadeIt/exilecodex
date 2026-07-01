import { test, expect, describe } from 'vitest'
import { readState } from './Plugins.jsx'

// Pure-state lifecycle tests for the WordPress-style plugin model. readState() normalizes the
// per-plugin prefs.plugins[id] blob (migrating the legacy {enabled} shape) into the canonical
// { installed, active, version } triple that drives the sidebar/routes and the manager UI.

const optional = { id: 'market', version: '1.0.0', enabledByDefault: false }
const optionalDefaultOn = { id: 'filter', version: '1.0.0', enabledByDefault: true }

describe('new-shape state', () => {
  test('undefined → not installed (defensive)', () => {
    expect(readState(optional, undefined)).toEqual({ installed: false, active: false, version: '1.0.0' })
  })
  test('empty object → not installed', () => {
    expect(readState(optional, {})).toEqual({ installed: false, active: false, version: '1.0.0' })
  })
  test('fresh default-ON plugin → installed + active (e.g. the Filter Editor)', () => {
    // A default-on plugin with no stored state ships installed+active — but stays deletable (not core).
    expect(readState(optionalDefaultOn, undefined)).toEqual({ installed: true, active: true, version: '1.0.0' })
    expect(readState(optionalDefaultOn, {})).toEqual({ installed: true, active: true, version: '1.0.0' })
  })
  test('installed + inactive (WordPress installs deactivated)', () => {
    expect(readState(optional, { installed: true, active: false, version: '1.0.0' }))
      .toEqual({ installed: true, active: false, version: '1.0.0' })
  })
  test('installed + active', () => {
    expect(readState(optional, { installed: true, active: true, version: '1.0.0' }))
      .toEqual({ installed: true, active: true, version: '1.0.0' })
  })
  test('active is forced false when not installed', () => {
    // A stray active:true with installed:false must not resolve to active.
    expect(readState(optional, { installed: false, active: true }).active).toBe(false)
  })
  test('stored version is preserved (drives hasUpdate)', () => {
    expect(readState(optional, { installed: true, active: true, version: '0.9.0' }).version).toBe('0.9.0')
  })
})

describe('legacy {enabled} migration', () => {
  test('enabled:true → installed + active', () => {
    expect(readState(optional, { enabled: true }))
      .toEqual({ installed: true, active: true, version: '1.0.0' })
  })
  test('enabled:false on a default-on plugin → installed but inactive', () => {
    expect(readState(optionalDefaultOn, { enabled: false }))
      .toEqual({ installed: true, active: false, version: '1.0.0' })
  })
  test('enabled:false on a default-off plugin → not installed', () => {
    expect(readState(optional, { enabled: false }))
      .toEqual({ installed: false, active: false, version: undefined })
  })
  test('migration keeps an explicit stored version', () => {
    expect(readState(optional, { enabled: true, version: '0.8.0' }).version).toBe('0.8.0')
  })
  test('new shape wins even when a stale enabled key lingers', () => {
    // Once `installed` is present we are on the new model — ignore the legacy `enabled` flag.
    expect(readState(optional, { installed: true, active: false, enabled: true }))
      .toEqual({ installed: true, active: false, version: '1.0.0' })
  })
})

describe('lifecycle action transitions (store merge semantics)', () => {
  // The store's actions persist these exact partials via a shallow merge into prefs.plugins[id].
  // We replay that merge here and resolve through readState to prove each WordPress transition.
  const merge = (prev, partial) => ({ ...prev, ...partial })
  const m = optional

  test('install puts it in the list, DEACTIVATED', () => {
    const s = merge({}, { installed: true, active: false, version: m.version })
    const r = readState(m, s)
    expect(r.installed).toBe(true)
    expect(r.active).toBe(false)
  })

  test('install → activate → it goes active (sidebar)', () => {
    let s = merge({}, { installed: true, active: false, version: m.version })
    s = merge(s, { installed: true, active: true, version: m.version }) // activate
    expect(readState(m, s)).toEqual({ installed: true, active: true, version: '1.0.0' })
  })

  test('deactivate flips active off but keeps it installed', () => {
    let s = merge({}, { installed: true, active: true, version: m.version })
    s = merge(s, { active: false }) // deactivate (partial merge)
    expect(readState(m, s)).toEqual({ installed: true, active: false, version: '1.0.0' })
  })

  test('deactivating a default-ON plugin from IMPLICIT state keeps it installed (not deleted)', () => {
    // The Filter Editor ships installed+active with no stored blob. The store's patchState applies
    // partials on top of the RESOLVED state, so deactivate must keep installed:true — a naive
    // { active:false } over an empty blob would otherwise read back as not-installed.
    const dm = optionalDefaultOn
    const resolved = readState(dm, undefined)        // implicit → installed+active
    const stored = merge(resolved, { active: false }) // patchState builds on resolved, not the raw blob
    expect(readState(dm, stored)).toEqual({ installed: true, active: false, version: '1.0.0' })
  })

  test('delete (uninstall) removes it from the list', () => {
    let s = merge({}, { installed: true, active: false, version: m.version })
    s = merge(s, { installed: false, active: false }) // uninstall
    expect(readState(m, s).installed).toBe(false)
  })

  test('update bumps the stored version, clearing the update flag', () => {
    const newer = { ...m, version: '1.1.0' }
    let s = merge({}, { installed: true, active: true, version: '1.0.0' })
    // hasUpdate would be true here (stored 1.0.0 !== manifest 1.1.0).
    expect(readState(newer, s).version).toBe('1.0.0')
    s = merge(s, { version: newer.version }) // updatePlugin
    expect(readState(newer, s).version).toBe('1.1.0')
  })
})
