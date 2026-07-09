// Pure helper for the tabbed overlay shell: which enabled plugins appear as tabs, and in what
// order. A plugin is tabbable when it contributes a routed component; order comes from
// contributes.nav.order (missing order → end of the strip; ties keep input order — JS sort
// is stable).
export function overlayTabs(plugins = []) {
  return plugins
    .filter((p) => p?.contributes?.route?.component)
    .map((p) => ({
      id: p.id,
      label: p.contributes.nav?.label || p.name,
      order: p.contributes.nav?.order ?? Number.MAX_SAFE_INTEGER,
    }))
    .sort((a, b) => a.order - b.order)
}
