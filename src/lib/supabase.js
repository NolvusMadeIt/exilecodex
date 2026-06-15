import { createClient } from '@supabase/supabase-js'

// Public Supabase project. The publishable key is designed to live in client code —
// access is governed by Row Level Security on the server, not by key secrecy.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://vofkgydinpdtasxuzmyq.supabase.co'
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_krkLInTvxybJkG-R1H7orA_zhGBew15'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  // No login system; we key data by an anonymous per-device id (see clientId()).
  auth: { persistSession: false, autoRefreshToken: false },
})

// Stable anonymous per-device id used to key the user's settings row. Not personal data.
const CID_KEY = 'nolvus-client-id'
export function clientId() {
  try {
    let id = localStorage.getItem(CID_KEY)
    if (!id) {
      id = (crypto?.randomUUID ? crypto.randomUUID() : 'c-' + Math.random().toString(36).slice(2) + Date.now().toString(36))
      localStorage.setItem(CID_KEY, id)
    }
    return id
  } catch {
    return 'anon'
  }
}
