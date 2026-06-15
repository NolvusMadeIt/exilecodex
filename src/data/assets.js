import manifest from './assetManifest.json'

// All item art lives under /img with opaque, hashed filenames. Code refers to the original
// logical path; this resolves it to the real (obfuscated) file so served URLs reveal nothing.
const BASE = '/img'
export const asset = (rel) => `${BASE}/${manifest[rel] || rel}`
