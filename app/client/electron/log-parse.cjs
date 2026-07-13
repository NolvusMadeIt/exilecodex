'use strict'
// PoE2 Client.txt line parser — isolated + pure so it is unit-testable and so a
// future log-format change can be fixed in one place with regression coverage.
//
// Each line looks like:  2026/07/12 22:08:13 2342640 4cba6a95 [INFO Client 9172] <payload>
// The 3rd token (2342640) is the log's millisecond uptime counter (monotonic),
// which the run tracker uses for load removal + precise auto-splits.
//
// Zone entry: PoE2 engine 2.8+ (client 4.5.x) NO LONGER writes "You have entered X."
// It logs a loading-screen line carrying the zone DISPLAY name + the load duration:
//     [LOADING SCREEN] (Clearfell) Duration = 5.18321 seconds
// We match that first, and keep the legacy "You have entered X." as a fallback so
// older clients (or a reverted format) still work. `[SCENE] Set Source [X]` is NOT
// used — it is noisy (emits "Act 1", "(null)", "(unknown)" and double-fires).

const RE_LEVEL = /^\S+ \S+ (\d+).* : (.+?) \((.+?)\) is now level (\d+)/
const RE_ZONE_LOAD = /^\S+ \S+ (\d+).*\[LOADING SCREEN\] \((.+?)\) Duration = /
const RE_ZONE_ENTERED = /^\S+ \S+ (\d+).*You have entered (.+)\.\s*$/
const RE_LOAD = /^\S+ \S+ (\d+).*Got Instance Details/

// Parse one Client.txt line into a typed event, or null if it isn't one we track.
//   { type: 'level', ms, char, cls, level }
//   { type: 'zone',  ms, name }
//   { type: 'load',  ms }
function parseLogLine(line) {
  let m
  if ((m = line.match(RE_LEVEL))) {
    return { type: 'level', ms: Number(m[1]), char: m[2], cls: m[3], level: Number(m[4]) }
  }
  if ((m = line.match(RE_ZONE_LOAD)) || (m = line.match(RE_ZONE_ENTERED))) {
    return { type: 'zone', ms: Number(m[1]), name: m[2] }
  }
  if ((m = line.match(RE_LOAD))) {
    return { type: 'load', ms: Number(m[1]) }
  }
  return null
}

module.exports = { parseLogLine }
