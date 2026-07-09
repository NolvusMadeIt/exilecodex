import { test, expect } from 'vitest'
import { overlayTabs } from './overlayTabs.js'

const mk = (id, { order, label, route = true } = {}) => ({
  id,
  name: id.toUpperCase(),
  contributes: {
    ...(route ? { route: { path: `/${id}`, component: () => null } } : {}),
    nav: { label: label ?? id, ...(order != null ? { order } : {}) },
  },
})

test('overlayTabs keeps only routable plugins, sorted by nav.order', () => {
  const tabs = overlayTabs([mk('b', { order: 20 }), mk('a', { order: 10 }), mk('x', { route: false })])
  expect(tabs.map((t) => t.id)).toEqual(['a', 'b'])
})

test('plugins without an order sink to the end; ties keep input order', () => {
  const tabs = overlayTabs([mk('late'), mk('c', { order: 5 }), mk('later')])
  expect(tabs.map((t) => t.id)).toEqual(['c', 'late', 'later'])
})

test('tab label prefers nav.label and falls back to the plugin name', () => {
  const noLabel = { id: 'p', name: 'Pretty Name', contributes: { route: { path: '/p', component: () => null } } }
  expect(overlayTabs([noLabel])[0].label).toBe('Pretty Name')
  expect(overlayTabs([mk('q', { label: 'Q Tab' })])[0].label).toBe('Q Tab')
})
