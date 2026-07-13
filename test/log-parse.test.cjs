'use strict'
// Regression coverage for PoE2 Client.txt parsing. The sample lines below are
// REAL lines captured from a live run on client 4.5.4b / engine 2.8.0 — the patch
// that dropped "You have entered X." in favour of "[LOADING SCREEN] (X) Duration".
// If GGG changes the format again, these tests fail loudly instead of the guide +
// run tracker silently sitting at "Waiting for zone".
const test = require('node:test')
const assert = require('node:assert')
const { parseLogLine } = require('../app/client/electron/log-parse.cjs')

test('current PoE2 zone entry: [LOADING SCREEN] (Zone) Duration', () => {
  const line = '2026/07/12 22:08:13 2342640 4cba6a95 [INFO Client 9172] [LOADING SCREEN] (Clearfell) Duration = 5.18321 seconds'
  assert.deepStrictEqual(parseLogLine(line), { type: 'zone', ms: 2342640, name: 'Clearfell' })
})

test('multi-word zone names parse whole', () => {
  for (const [line, name] of [
    ['2026/07/12 22:12:27 2596546 4cba6a95 [INFO Client 20032] [LOADING SCREEN] (Mud Burrow) Duration = 18.6429 seconds', 'Mud Burrow'],
    ['2026/07/12 22:20:38 3086781 4cba6a95 [INFO Client 20032] [LOADING SCREEN] (The Grelwood) Duration = 4.25566 seconds', 'The Grelwood'],
    ['2026/07/12 22:14:57 2746093 4cba6a95 [INFO Client 20032] [LOADING SCREEN] (Clearfell Encampment) Duration = 7.67332 seconds', 'Clearfell Encampment'],
  ]) {
    const ev = parseLogLine(line)
    assert.strictEqual(ev.type, 'zone')
    assert.strictEqual(ev.name, name)
  }
})

test('legacy "You have entered X." still parses (fallback)', () => {
  const line = '2024/01/15 21:56:03 123456789 abcd1234 [INFO Client 4200] : You have entered Clearfell.'
  assert.deepStrictEqual(parseLogLine(line), { type: 'zone', ms: 123456789, name: 'Clearfell' })
})

test('level-up line parses char / class / level', () => {
  const line = '2026/07/12 22:12:46 2614734 3ef231e0 [INFO Client 20032] : Omega_Druid_Avatar (Druid) is now level 3'
  assert.deepStrictEqual(parseLogLine(line), { type: 'level', ms: 2614734, char: 'Omega_Druid_Avatar', cls: 'Druid', level: 3 })
})

test('load start line parses', () => {
  const line = '2026/07/12 22:12:09 2577890 2d8e6512 [DEBUG Client 20032] Got Instance Details from login server'
  assert.deepStrictEqual(parseLogLine(line), { type: 'load', ms: 2577890 })
})

test('chat that merely contains "entered" is NOT a zone event', () => {
  const line = "2026/06/27 22:37:35 1466742765 3ef231e0 [INFO Client 75424] #SuzakuMerc: first time i entered i spent 5min standing around"
  assert.strictEqual(parseLogLine(line), null)
})

test('noise lines return null', () => {
  for (const line of [
    '2026/07/12 22:08:10 2339312 7fbd1225 [INFO Client 9172] [SCENE] Set Source [Clearfell]',
    '2026/07/12 22:08:09 2337781 2caa2332 [DEBUG Client 9172] Generating level 2 area "G1_2" with seed 566047134',
    '2026/07/12 22:11:08 2517031 cb0f977e [INFO Client 20032] [STREAMLINE][XeSS] Enabled: true',
    '',
  ]) {
    assert.strictEqual(parseLogLine(line), null, `expected null for: ${line}`)
  }
})
