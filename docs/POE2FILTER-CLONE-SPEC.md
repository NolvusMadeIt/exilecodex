# poe2filter.com — Reverse-Engineering Spec (ground truth, captured live)

> Captured by driving the live site (chrome-devtools MCP) on 2026-06-13. This is the
> blueprint for the rebuild. Grok's version was a generic 3-column rule editor — that is
> NOT how poe2filter.com works. The real app is a structured, opinionated, multi-page
> filter builder driven by a single settings object + real item data + live economy.

## The mental model

A filter is **one settings object**. Six pages are different *views/editors* of that same
object. Every page shares the same chrome (header + tab nav + bottom ActionBar) and every
edit instantly regenerates the `.filter` text (shown in a "Filter output" panel at the
bottom of each page, and richly on Preview).

Philosophy (from their landing page — drives every visual decision):
- Minimalist, stays close to the game's **default** label styles. Dark, nostalgic.
- Highlights only via self-explanatory **beams**: white → yellow → orange → red → purple
  (brown for uniques), for top-tier items. Highlighted items also get a **minimap icon**.
- **Drop Tiers** = market value buckets. Higher tier = more valuable = stronger highlight.
  Currency/unique values come from a live economy backend (every 4h / daily).
- "Nothing to learn": the user never types syntax; they pick from visual controls.

## The 6 pages (+ Settings, Changelog)

Tab order: **Presets · Quick Filters · Tier Lists · Custom Rules · Cosmetic · Preview**
Right side of nav: **Settings · Changelog · (?)**

### 1. Presets — "Select where you are at in the game"
- 6 stage cards, each with an image + title + level label:
  - Campaign (Lvl 1), Interludes (Lvl 55), Progressing Maps (Lvl 70),
    Early Endgame (Lvl 80), Late Endgame (Lvl 90+), Very Late Endgame (Lvl 95+)
  - Each card also has a "Preview changes" (diff) button.
- **Selecting a card dynamically reveals MORE sections below** (this is the part Grok missed):
  - A one-line contextual description (e.g. Early Endgame → "You're running Tier 15 maps.
    You only care about the highest quality flasks, Expert items, Lvl 17+ skill gems…").
  - **Endgame Content** toggles: Boss Uniques, Chance Bases, Trials of Chaos,
    Trials of the Sekhemas, Show Support Gems, Show Jewels, Show Low-value Uniques,
    Show All Identified Items.
  - **Select your class**: 8 portrait cards — Warrior, Mercenary, Ranger, Huntress, Monk,
    Witch, Sorceress, Druid. (Shows items relevant to your class' weapon/armour types.)
- **Game Mode & Economy** toggles: Return of the Ancients (League), Hardcore,
  Solo-Self-Found (SSF). Plus: "Change Top-Tier Item Label Styles (Customize)",
  "Transparent Gold".
- Applying a preset sets many Quick Filters + the Currency/Uniques tiering mode.

### 2. Quick Filters — 2-column accordion of toggle-rows
Each section header shows "N active rules" and expands/collapses.
- Left column sections: **Campaign**, **Flasks & Charms**, **Currency**,
  **Uniques & Chance Bases**, **Other Items**.
- Right column sections: **My Equipment**, **Other Equipment**, **Remaining Equipment**.
- Inside each section are sub-groups, and inside those are **toggle-rows**. A row =
  `[on/off toggle] Label (?) [controls…]`. Control types seen:
  - **Item-type multiselect dropdown** with item images (e.g. My Jewellery → Rings shows
    Gold Ring / Prismatic Ring / Amethyst Ring … each with `.webp` icon).
  - **Rarity** dropdown with a colored dot: `≥ ● Normal ▼`.
  - **Influence** dropdown: `Any ▼`.
  - **iLvl** comparator: `≥ iLvl [n]`.
  - **Tier** dropdown: `≥ T4 ▼` (waystone/area tiers).
  - **Quality** dropdown: `≥ ♥ Expert ▼`.
  - **Sockets**, number inputs (`Between Area Levels 60–70`), eye (show/hide) toggles.
- Examples of real rows: Auto-Scaling Leveling Items (Leveling Gear/Weapons/Armour/Flasks/
  Gold/Verisium), Disenchanting/Selling/Salvaging (Rares to Disenchant, Socketed Gear,
  Quality Martial/Caster Weapons, Quality Shields & Armour), My Weapons/Armour/Jewellery/
  Jewels, Unidentified Equipment (Rare/Magic Gear+Jewellery), Hide Remaining …
- First-visit shows a **Quick Filter Tutorial** modal: "Take a Tour" / "I Got This".

### 3. Tier Lists — drag items into value tiers
- Tiers (currency/items): **S A B C D E** (and **F** = hidden on Cosmetic).
- Uniques tiers labelled: **Excellent · Good · Potential · Other · Searching**.
- Drag-and-drop an item to move it between tiers; values seeded from the live economy.

### 4. Custom Rules — precedence-ordered Show/Hide/Highlight rules
- Intro: "Create custom Show, Hide and Highlight rules based on Item Class, Base Type,
  Rarity, and Advanced Conditions. These rules have higher precedence than Quick Filters,
  processed top-to-bottom. The higher the rule, the higher its precedence."
- "Add Custom Rule" → a rule row:
  `[on] [Class ▼ (icon+name, default "All")] [BaseType search "All Items" multiselect]
   [≥ ▼] [● Normal ▼ rarity] [E-Tier ▼ drop tier] [n] [style ▼] [✕]`
- **Free-text Rules** (collapsible): "Insert At Top" / "Insert At Bottom" textareas for raw
  filter syntax (with a warning). Inserted verbatim at top/bottom of the generated file.
- Generated output example (verbatim from the live site after adding a default rule):
  ```
  Show # Custom Rule 1 for All All Gear (custom-rule/custom/1)
    Class == "Bows" "Crossbows" "Foci" "One Hand Maces" "Quivers" "Quarterstaves"
      "Sceptres" "Spears" "Talismans" "Staves" "Two Hand Maces" "Wands" "Body Armours"
      "Helmets" "Gloves" "Boots" "Shields" "Bucklers"
  ```

### 5. Cosmetic — "change how items are displayed" (no show/hide impact)
- **Drop Tier Styles**, sub-tabs: **Currency · Items · Uniques · Chance Bases**.
- A per-tier table; each row = tier + value threshold + controls:
  | Tier | Threshold | Hide | Highlight | Sound | Live label preview | ⋯ |
  - S-Tier — Purple highlight — ≥100 🔶
  - A-Tier — Red highlight — ≥15
  - B-Tier — Orange highlight — ≥3
  - C-Tier — Yellow highlight — ~1
  - D-Tier — White highlight — <0.5
  - E-Tier — Visible, no highlight — <0.1
  - F-Tier — Hidden — <0.01
  - "Highlight" cell shows beam-color + minimap-color dots; "Sound (n)" picks a drop sound;
    the preview cell renders a live in-game-style label ("Example Orb").
- **Hidden Items** toggles: Hidden Gear Transparent, Flasks, Jewellery.
- **Custom Cosmetic Rules** + an "Explainer: Partial" about the `Continue` statement
  (Cosmetic rules default to Partial/Continue so later rules can still add highlights).

### 6. Preview — in-game simulation
- Renders the filter as **real styled item labels** (colored text + optional bg + border,
  smallcaps) over a game-scene background. Examples seen: Mirror of Kalandra (red border),
  Greater Jeweller's Orb, Stellar Amulet, Exceptional Twin Bow, Una's Lute, Bronze/Silver/
  Gold Key…
- Controls: ☐ Beams, ☐ Proximity label glow, background selector (Woods/Desert/Marshes/
  Caves), Hold Alt. Left sidebar: section visibility toggles + Item Library.
- Live "Filter output" panel below.

## Persistent chrome (every page)
- **Top header**: login link (top-left "Log in on pathofexile.com"), PoE2 "Filter" logo
  centered, top-right "Active filter: <name> (Change)" + social icons.
- **Tab nav bar** (the 6 pages + Settings + Changelog + help).
- **Bottom ActionBar**: `Import ⌄ | Save to new file | Log in to Sync | Copy to Clipboard
  | … | Presets | Reset`. (Our build: drop Sync or stub it; keep Import/Save/Copy/Reset.)
- A "Filter output" section + marketing content (Examples, Filter Philosophy, How To Use,
  testimonials) live below the tool on every page (can be trimmed in our clone).

## Design system (measured from the live CSS)
- Background: `rgb(14,17,21)` (#0E1115), near-black blue.
- Body text: `rgb(163,141,109)` tan/gold. Body font: **Verdana**, Arial, sans-serif.
- Headings: `rgb(226,226,226)` near-white, font **FontinSmallCaps** (the iconic PoE look).
- Section headers: brown→gold horizontal gradient bars with smallcaps gold titles.
- Beams (bg images): `static.poe2filter.com/img/beams/beam-{white,yellow,orange,red,purple,brown}.png`
- Real fonts downloaded to `public/font/`: fontin-smallcaps, fontin-regular/italic/bold,
  Cinzel-Regular/Medium, OptimusPrincepsSemiBold, FrizQuadrataC.

## Data layer (all static JSON — downloaded to `public/data/poe2/`)
Fetched from `poe2filter.com/data/poe2/` (+ `/data/` for tutorials/tooltips):
- `gear-data.json` — array[566] `{name, lvl, implicits[], minDmg/maxDmg/crit/aps/dex|str|int,
  arm/ev/es/block…}`. Class/category/image are DERIVED (not stored): class from the stat
  profile (dmg+dex→Bow, arm+es→Gloves…), image slug = `name.toLowerCase().replace(/\s+/g,'')`.
- `jewellery-data.json` — array[69] `{name, implicits[]}` (rings/amulets/belts/jewels).
- `flask-data.json` — array[18] `{name, effects[]}`.
- `currency-data.json` — array[332] `{baseType, effects[], description}` (+ `-manual` extras).
- `uniques-data.json` — array[458] `{category, name, baseType, image:"AbAeterno.png",
  implicitMods[], explicitMods[], flavorText}`. **Uniques carry an explicit image filename.**
- `mod-data.json` (196KB), `zones.json` (10KB), plus div-card/gem/quest/vendor (mostly empty
  right now under the Return-of-the-Ancients reset).
- Live economy snapshots: `economy.poe2filter.com/v3/state-currency.json`,
  `state-uniques.json` (captured as `economy-state-*.json`). These drive Drop Tier values;
  they are NOT in the static data and update every 4h/daily — use the captured snapshot,
  labelled as a snapshot.

## Image URL patterns (predictable — confirmed live)
Base: `https://static.poe2filter.com/img/…`
- Presets: `/presets/presetEarlyEndgame80.webp`, `presetLateEndgame90.webp`,
  `presetVeryStrict95.webp`, `presetProgressingMaps70.webp`, `interludes.webp`,
  `presetEarlyCampaign1.webp`.
- Classes: `/presets/{warrior,mercenary,ranger,huntress,monk,witch,sorceress,druid}.webp`.
- Gear (by category folder): `/gear/<category>/<slug>.webp`
  e.g. `/gear/rings/goldring.webp`, `/gear/weapons/onehandweapons/onehandspears/1hspear01.webp`,
  `/gear/belts/stalkingbelt.webp`, `/gear/jewels/emeraldjewel.webp`.
- Shields: `/shields/shield-green.png`. Beams: `/beams/beam-red.png`.
- Uniques: use the `image` field from uniques-data (e.g. `AbAeterno.png`).
- Strategy: hotlink from `static.poe2filter.com` at first (always correct), mirror locally
  later if we want offline. Slug rule: lowercase, strip spaces & apostrophes.

## Image system (cracked from main-*.js bundle + CDN probes)
Confirmed how icons actually resolve (so dropdowns can be image-rich with NO broken icons):
- **Class "All" icons**: `/img/all-items.png`, `all-weapons.png`, `all-jewels.png`,
  `all-augments.png`, `all-runes.png`, `all-gems.png`, `all-uncut-gems.png`.
- **Category folders** (confirmed in bundle):
  - weapons: `/img/gear/weapons/onehandweapons/{onehandmaces,scepters,onehandspears,wands}/`,
    `/img/gear/weapons/twohandweapons/{twohandmaces,warstaves,bows,crossbows,staves}/`
  - armours: `/img/gear/armours/{helmets,boots,gloves,bodyarmours}/`
  - jewellery: `/img/gear/{rings,amulets,belts}/`  · offhand: `/img/gear/offhand/{shields,foci,talismans}/`
  - other: `/img/gear/{charms,jewels,flasks,quivers,relics,divination}/`, `/img/gear/maps/endgamemaps/`
- **Weapons reuse generic icons** (e.g. `bow1.webp`, `2hcrossbow01.webp`, `focus02.webp`,
  `1hspear01.webp`) — NOT per-base-type. So a category-representative icon next to each base
  name is faithful to the real site.
- **Per-name icons exist** for rings/amulets/jewels (`goldring.webp`, `goldamulet.webp`,
  `emeraldjewel.webp`) — confirmed 200. Use per-name where present, category default otherwise.
- **Currency**: CamelCase filenames in `/img/currency/` (+ subfolders breach/maps/heist/…):
  `CoinPileTier2.webp`, `RefinedVerisium.webp`, `UncutSkillGem.webp`, `UhtredCrest.webp`. NOT slug-derived.
- **Shields**: `/img/shields/shield-{red,green,blue,red-green,…}.png` (by socket colors).
- **Uniques**: `/img/uniques/<image-field>` (exact, case-sensitive, e.g. `AbAeterno.png`).
- Strategy: per-category default icon map (confirmed filenames) + per-name override for
  rings/amulets/jewels/uniques. To get a 100% per-base map later, scrape the live rendered
  dropdowns (each renders its exact computed icon) — that's the ground-truth capture step.

## Item classes (from the Custom Rule "All Gear" output)
Bows, Crossbows, Foci, One Hand Maces, Quivers, Quarterstaves, Sceptres, Spears, Talismans,
Staves, Two Hand Maces, Wands, Body Armours, Helmets, Gloves, Boots, Shields, Bucklers
(+ jewellery: Rings, Amulets, Belts; + Jewels; + Flasks, Charms; + Currency, Waystones,
Uncut/Skill/Spirit Gems, Runes, Relics, Trial keys, etc.)

## .filter output format (observed)
- Banner comment blocks: `### General Partial Rules`, `### Cosmetic & Custom Rules`,
  `### Uniques & Chance Bases Rules`, etc. (wrapped in `####…` rules of `#`).
- Rules: `Show`/`Hide` + ` # <comment> (<rule-id>)` then indented condition lines:
  `Class == "…" "…"`, `BaseType == "…"`, `Rarity >= Normal`, `ItemLevel >= n`,
  `WaystoneTier >= n`, style lines (SetTextColor/SetBorderColor/SetBackgroundColor/
  SetFontSize/PlayEffect/MinimapIcon/PlayAlertSound), and `Continue` for Partial rules.
