// Shared hook: builds the active filter's .filter text (async, because the base file is a real
// fetch) and re-builds whenever the settings / game info / prefs change. Base files are cached,
// so rebuilds after the first are effectively instant.
import { useEffect, useState } from 'react'
import { buildFilter } from './buildFilter.js'

export function useFilterText(settings, { gameInfo, prefs } = {}) {
  const [text, setText] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    setLoading(true)
    buildFilter(settings, { gameInfo, prefs })
      .then((t) => { if (alive) { setText(t); setError(null) } })
      .catch((e) => { if (alive) { setError(e); setText('') } })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [settings, gameInfo, prefs])

  return { text, error, loading }
}
