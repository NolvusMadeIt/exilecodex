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
  name: 'Campaign Guide',
  description: 'A zone-by-zone PoE2 leveling route — every act, boss, quest reward and optional pickup, with progress tracking.',
  version: '1.0.0',
  author: 'Nolvus',
  category: 'Leveling',
  icon: Compass,
  core: false,
  enabledByDefault: true,
  detail: {
    longDescription:
      'A complete walkthrough for leveling a new character through the Path of Exile 2 campaign. Pick '
      + 'an act — and, in the Interlude, the mini-act of The Third Edict you are on — and the guide lays '
      + 'out the exact ordered route between zones alongside every objective: story bosses, quest turn-ins, '
      + 'permanent buffs, and the optional side encounters worth detouring for. Skill-gem, passive-point and '
      + 'buff rewards are tagged in gold, optional steps are marked, and each step has a checkbox so you can '
      + 'tick off progress as you go — your ticks are remembered across sessions.',
    screenshots: [],
    changelog: [
      { version: '1.0.0', notes: 'Initial release — acts 1–4 plus the Interlude, full routes, objectives and per-step progress.' },
    ],
  },
  contributes: {
    nav: { group: 'main', label: 'Campaign Guide', order: 70 },
    route: { path: '/campaign-guide', component: lazy(() => import('./CampaignGuideRoot.jsx').then(m => ({ default: m.CampaignGuideRoot }))) },
    settings: { component: lazy(() => import('./CampaignGuideSettings.jsx').then(m => ({ default: m.CampaignGuideSettings }))) },
  },
}
