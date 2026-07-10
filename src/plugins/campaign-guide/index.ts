import { lazy } from 'react'
import { Compass } from 'lucide-react'

// Plugin #4 — the Campaign Guide. A zone-by-zone PoE2 leveling companion: pick an Act (and a hub /
// mini-act within the Interlude), and it lays out the ordered run route plus every objective —
// bosses, quest turn-ins and optional side rewards — with gold reward tags, an "optional" marker,
// and a per-step "done" checkbox so you can track progress through the story. Route + objective data
// lives in ./data/campaign.json (acts 1–4 from the poe2-helper zones dataset; Interlude routes,
// bosses and the real hub/town names from the community guides — see that file's `gaps` note).
// Sharp corners, left-aligned, content-width controls (house rules).
export default {
  id: 'campaign-guide',
  name: 'Campaign Mode',
  description: 'PoE2 leveling — a full zone-by-zone Campaign guide with maps, plus a lean Speedrun mode with a live run timer.',
  version: '1.2.0',
  author: 'Nolvus',
  category: 'Leveling',
  icon: Compass,
  core: false,
  enabledByDefault: true,  // a headline feature — in the nav out of the box
  desktopOnly: false,      // the guide is fully browsable on the web; only live tracking + the
                           //   run timer need the desktop app (they degrade with a note)
  detail: {
    longDescription:
      'A two-mode PoE2 leveling companion. CAMPAIGN MODE is the full guide: pick an act and a zone and the '
      + 'zone’s layout map opens on the left with its objectives on the right — bosses, quest steps, permanent '
      + 'buffs and optional pickups, rewards tagged in gold, every zone name hoverable for its map. SPEEDRUN '
      + 'MODE is the lean, do-this-only critical path (no optional steps, only permanent-upgrade rewards), with '
      + 'a pre-run Prep checklist and a live run timer that runs while you’re in a zone and pauses in town, '
      + 'hideout or when you’re idle/AFK — completed runs are saved with splits, deaths and your time. On '
      + 'desktop it auto-detects your zone from the game log, follows you as you play, and pops out as an '
      + 'always-on-top overlay.',
    screenshots: [],
    changelog: [
      { version: '1.2.0', notes: 'New Speedrun mode: lean critical-path route, Prep checklist, live game-log run timer (pauses in town/hideout/idle) and device-local run history. Renamed to Campaign Mode.' },
      { version: '1.1.0', notes: 'Per-zone view with layout maps, hover-a-zone-name map popups, and live game-log zone tracking.' },
      { version: '1.0.0', notes: 'Initial release — acts 1–4 plus the Interlude, full routes, objectives and per-step progress.' },
    ],
  },
  contributes: {
    nav: { group: 'main', label: 'Campaign Mode', order: 70 },
    route: { path: '/campaign-guide', component: lazy(() => import('./CampaignGuideRoot.jsx').then(m => ({ default: m.CampaignGuideRoot }))) },
    settings: { component: lazy(() => import('./CampaignGuideSettings.jsx').then(m => ({ default: m.CampaignGuideSettings }))) },
  },
}
