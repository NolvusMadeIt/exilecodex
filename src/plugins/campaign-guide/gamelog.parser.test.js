import { test, expect, describe } from 'vitest'
import { processLines } from '../../../electron/gamelog.cjs'

// These are the REAL PoE2 Client.txt line shapes (verified against Exiled-Exchange-2's PoE2 log
// fixtures). PoE2 does NOT log "You have entered X." — a zone load is a `Generating level N area`
// line paired with the following `[SCENE] Set Source [<name>]`. The watcher's parser must turn
// those into the right events; this locks that behaviour down without needing the game running.
const fresh = () => ({ pending: null })

describe('gamelog processLines — real PoE2 lines', () => {
  test('a Generating + Set Source pair becomes one zone event (with area level)', () => {
    const lines = [
      '2025/09/11 18:24:17 167845515 2caa1afc [DEBUG Client 438888] Generating level 16 area "G2_1" with seed 3515667606',
      '2025/09/11 18:24:18 167846000 2caa1afc [INFO Client 438888] [SCENE] Set Source [The Red Vale]',
    ]
    expect(processLines(lines, fresh())).toEqual([
      { type: 'zone', zone: 'The Red Vale', areaLevel: 16, areaId: 'G2_1' },
    ])
  })

  test('the (null) loading screen is skipped; the real name still resolves', () => {
    const lines = [
      '... [DEBUG Client 1] Generating level 1 area "G1_1" with seed 1',
      '... [INFO Client 1] [SCENE] Set Source [(null)]',
      '... [INFO Client 1] [SCENE] Set Source [Clearfell]',
    ]
    const events = processLines(lines, fresh())
    expect(events).toHaveLength(1)
    expect(events[0]).toMatchObject({ type: 'zone', zone: 'Clearfell' })
  })

  test('opening the in-game map (Set Source with no preceding Generating) is NOT a zone change', () => {
    const lines = [
      '... [INFO Client 1] [SCENE] Set Source [Atlas]',
      '... [INFO Client 1] [SCENE] Set Source [Act 1]',
      '... [INFO Client 1] [SCENE] Set Source [(unknown)]',
    ]
    expect(processLines(lines, fresh())).toEqual([])
  })

  test('zone names keep their real punctuation (colons)', () => {
    const lines = [
      '... [DEBUG Client 1] Generating level 12 area "G1_11_3" with seed 9',
      '... [INFO Client 1] [SCENE] Set Source [Ogham Manor: First Floor]',
    ]
    expect(processLines(lines, fresh())[0].zone).toBe('Ogham Manor: First Floor')
  })

  test('a level-up line yields name + base class + level', () => {
    const line = '2025/09/11 18:24:03 167830843 3ef232c2 [INFO Client 438888] : Kvan_seven_abyss (Mercenary) is now level 16'
    expect(processLines([line], fresh())).toEqual([
      { type: 'level', name: 'Kvan_seven_abyss', klass: 'Mercenary', level: 16 },
    ])
  })

  test('a slain line yields the character name', () => {
    const line = '2025/09/11 18:30:00 1 a1 [INFO Client 438888] : kvanClientLogTestOne has been slain.'
    expect(processLines([line], fresh())).toEqual([
      { type: 'death', name: 'kvanClientLogTestOne' },
    ])
  })

  test('pending area carries across read boundaries (ctx is the long-lived state)', () => {
    const ctx = fresh()
    // Generating arrives in one poll, the Set Source name in the next.
    expect(processLines(['... Generating level 5 area "G1_3" with seed 2'], ctx)).toEqual([])
    expect(ctx.pending).toMatchObject({ areaLevel: 5, areaId: 'G1_3' })
    const events = processLines(['... [SCENE] Set Source [The Grelwood]'], ctx)
    expect(events).toEqual([{ type: 'zone', zone: 'The Grelwood', areaLevel: 5, areaId: 'G1_3' }])
    expect(ctx.pending).toBeNull()
  })

  test('a realistic act-2 sequence produces the zones in order, ignoring map-opens', () => {
    const lines = [
      '... Generating level 9 area "G2_1" with seed 1',
      '... [SCENE] Set Source [(null)]',
      '... [SCENE] Set Source [Vastiri Outskirts]',
      '... [SCENE] Set Source [Atlas]',                 // opened the map mid-zone — ignore
      '... Generating level 10 area "G2_2" with seed 2',
      '... [SCENE] Set Source [Mawdun Quarry]',
    ]
    const zones = processLines(lines, fresh()).filter((e) => e.type === 'zone').map((e) => e.zone)
    expect(zones).toEqual(['Vastiri Outskirts', 'Mawdun Quarry'])
  })
})
