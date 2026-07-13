-- Shared campaign route data — the single source of truth both campaign guides
-- build from. Patch 0.5 (Return of the Ancients): Acts 1–4 + three Interludes,
-- no Cruel. Route + permanent rewards cross-verified from Maxroll / Mobalytics /
-- community 0.5 guides (2026-07-11). Zone maps are our own pilot-route art.
--
-- Each step is a normal guide step (zone / reward / images / goals) plus:
--   optional = true   → dropped from the Alt · speedrun guide (side content)
--   sr_note  = "..."  → an extra note shown ONLY in the speedrun guide
--   ls_note  = "..."  → an extra note shown ONLY in the league-start guide
-- Permanent-reward quests (res / passives / spirit / life / mana) are NEVER
-- marked optional — both guides keep the full reward spine.
--
-- [Bracketed] words in a goal link to that step's images entry: hover to
-- preview, click to dock the zone map beside the guide.
local M = "../../media/maps/"
local B = "../../media/bosses/"

local STEPS = {
  {
    act = "Act 1",
    zone = "The Riverbank",
    goals = {
      { action = "kill", text = "Kill [Bloated Miller]", count = 1 },
      { action = "note", text = "Grab the Uncut Skill Gem he drops — your first real skill." },
      { action = "goto", text = "Go to [Clearfell Encampment]" },
    },
  },
  {
    act = "Act 1",
    zone = "Clearfell",
    images = { ["Clearfell"] = M .. "Clearfell-Seed-1-Pilot.webp" },
    goals = {
      { action = "goto", text = "Tag the waypoint in [Clearfell]" },
      { action = "note", text = "Two common seeds — pin the map and rotate it to match yours." },
    },
    ls_note = "Clear packs on the way — early XP and drops matter when you have nothing.",
    sr_note = "Hug the walls to the waypoint; skip white packs, you are already overlevelled.",
  },
  {
    act = "Act 1",
    zone = "Clearfell",
    reward = "Permanent: +10% Cold Resistance",
    goals = {
      { action = "kill", text = "Kill [Beira of the Rotten Pack]", count = 1 },
      { action = "note", text = "Beira is always north or northeast of the waypoint. Killing her completes 'The Rotten Pack' and grants the Cold Resistance automatically." },
    },
  },
  {
    act = "Act 1",
    zone = "Clearfell",
    optional = true,
    reward = "Uncut skill gem (level 1)",
    goals = {
      { action = "goal", text = "Find the Mysterious Campsite" },
      { action = "note", text = "Spawns left or right of the starting zone." },
    },
  },
  {
    act = "Act 1",
    zone = "Mud Burrow",
    optional = true,
    reward = "Uncut skill gem (lv 2) + uncut support gem (lv 1)",
    goals = {
      { action = "kill", text = "Find and kill [The Devourer], then report back to camp", count = 1 },
      { action = "note", text = "Skippable when racing — the gems are the only reason to go." },
    },
  },
  {
    act = "Act 1",
    zone = "The Grelwood",
    images = { ["The Grelwood"] = M .. "Grelwood-Pilot.png" },
    goals = {
      { action = "goto", text = "Enter [The Grelwood] and tag the waypoint" },
      { action = "talk", text = "Summon Una near the waypoint (by the great tree)" },
      { action = "accept", text = "Accept 'The Red Vale'" },
    },
  },
  {
    act = "Act 1",
    zone = "The Grelwood",
    optional = true,
    reward = "Medium Life & Mana Flask + uncut support gem (level 1)",
    goals = {
      { action = "collect", text = "Loot Aregane's Hut", count = 1 },
      { action = "kill", text = "Kill the rare [Brambleghast] that spawns", count = 1 },
    },
  },
  {
    act = "Act 1",
    zone = "The Red Vale",
    goals = {
      { action = "collect", text = "Activate the three [Obelisks of Rust] and take their runed artefacts", count = 3 },
      { action = "note", text = "You leave with the [Runed Girdle], [Runed Guard] and [Runed Skull Cap] — the start of the rune quest." },
      { action = "kill", text = "Kill [The Rust King]", count = 1 },
      { action = "goto", text = "Portal to [Clearfell Encampment]" },
    },
  },
  {
    act = "Act 1",
    zone = "The Grelwood",
    reward = "Uncut skill gem (level 3)",
    goals = {
      { action = "note", text = "In [Clearfell Encampment] first: talk to the NPCs to receive the [Runed Spikes]." },
      { action = "collect", text = "Back in [The Grelwood], activate the three Runic Seals", count = 3 },
      { action = "turnin", text = "Return to Una and turn in 'The Red Vale' for the Uncut Skill Gem" },
    },
  },
  {
    act = "Act 1",
    zone = "The Grim Tangle",
    images = { ["The Grim Tangle"] = M .. "Grim-Tangle-Pilot.webp" },
    goals = {
      { action = "goto", text = "Enter [The Grim Tangle] (top-left of Una)" },
      { action = "collect", text = "Summon Una and click the three Runestones at the end of the zone", count = 3 },
      { action = "kill", text = "Summon Farrow and kill the zone boss", count = 1 },
      { action = "kill", text = "Find and kill [The Rotten Druid]", count = 1, optional = true },
      { action = "note", text = "[The Rotten Druid] is off the path — an uncut support gem if you want it." },
    },
  },
  {
    act = "Act 1",
    zone = "Cemetery of the Eternals",
    images = { ["Cemetery of the Eternals"] = M .. "Cemetery-Pilot.webp" },
    goals = {
      { action = "goto", text = "Tag the [Cemetery of the Eternals] waypoint" },
      { action = "talk", text = "Talk to Lachlann to open the memorial doors" },
      { action = "note", text = "The two crypts below hold the Praetor and his Consort — do both, then return here." },
    },
  },
  {
    act = "Act 1",
    zone = "Mausoleum of the Praetor",
    goals = {
      { action = "kill", text = "Kill [Draven, the Eternal Praetor]", count = 1 },
      { action = "collect", text = "Take [Draven's Memorial Key Piece]", count = 1 },
      { action = "goto", text = "Return to the Cemetery of the Eternals" },
    },
  },
  {
    act = "Act 1",
    zone = "Tomb of the Consort",
    goals = {
      { action = "note", text = "Entrance is opposite the Cemetery waypoint." },
      { action = "kill", text = "Kill [Asinia, the Praetor's Consort]", count = 1 },
      { action = "collect", text = "Take [Asinia's Memorial Key Piece]", count = 1 },
      { action = "goto", text = "Return to the Cemetery of the Eternals" },
    },
  },
  {
    act = "Act 1",
    zone = "Cemetery of the Eternals",
    optional = true,
    reward = "Count Lachlann's Ring",
    goals = {
      { action = "talk", text = "Talk to Lachlann again" },
      { action = "kill", text = "Kill [Lachlann of Endless Lament]", count = 1 },
      { action = "note", text = "Optional side boss — drops Count Lachlann's Ring. Portal to [Clearfell Encampment] after." },
    },
  },
  {
    act = "Act 1",
    zone = "Hunting Grounds",
    images = { ["Hunting Grounds"] = M .. "Hunting-Grounds-Pilot.webp" },
    reward = "Permanent: +2 passive skill points",
    goals = {
      { action = "goto", text = "Enter the [Hunting Grounds] and tag the waypoint" },
      { action = "kill", text = "Kill [The Crowbell]", count = 1 },
    },
    ls_note = "Crowbell's +2 passives are permanent — take them on every character.",
  },
  {
    act = "Act 1",
    zone = "Freythorn",
    images = { ["Freythorn"] = M .. "Freythorn-Pilot.webp" },
    reward = "Permanent: +30 Spirit",
    goals = {
      { action = "goto", text = "Enter [Freythorn] and tag the waypoint" },
      { action = "collect", text = "Complete the four ritual circles", count = 4 },
      { action = "kill", text = "Kill [The King in the Mists]", count = 1 },
      { action = "note", text = "+30 Spirit is build-defining — never skip it." },
    },
  },
  {
    act = "Act 1",
    zone = "Ogham Farmlands",
    images = { ["Ogham Farmlands"] = M .. "Ogham-Farmlands-Pilot.webp" },
    goals = {
      { action = "goto", text = "Cross the [Ogham Farmlands] toward the village" },
      { action = "collect", text = "Take [Una's Lute] from the Lute Box (before the farms)", count = 1 },
    },
  },
  {
    act = "Act 1",
    zone = "Ogham Village",
    reward = "Permanent: +2 passive skill points",
    goals = {
      { action = "collect", text = "Take the [Smithing Tools] — unlocks the Salvage Bench (once per league)", count = 1 },
      { action = "kill", text = "Kill [The Executioner] at the end of the zone", count = 1 },
      { action = "goto", text = "Use the Lever, talk to Leitis, then head to the [Manor Ramparts]" },
    },
  },
  {
    act = "Act 1",
    zone = "Manor Ramparts",
    images = { ["Manor Ramparts"] = M .. "Manor-Ramparts-Pilot.webp" },
    reward = "Permanent: +2 passive skill points",
    goals = {
      { action = "goto", text = "Tag the [Manor Ramparts] waypoint" },
      { action = "turnin", text = "Return to [Clearfell Encampment] and hand [Una's Lute] back for the reward" },
      { action = "goto", text = "Waypoint back and enter the Ogham Manor" },
    },
  },
  {
    act = "Act 1",
    zone = "Ogham Manor",
    images = { ["Ogham Manor"] = M .. "Ogham-Manor-First.webp" },
    reward = "Permanent: +20 maximum Life",
    goals = {
      { action = "goto", text = "Work through [Ogham Manor] to the top floor" },
      { action = "kill", text = "Kill [Candlemass, the Living Rite]", count = 1 },
      { action = "note", text = "Cap your resistances before this fight." },
    },
    sr_note = "Take the manor's right-hand rooms; the left loop is a dead end.",
  },
  {
    act = "Act 1",
    zone = "Ogham Manor",
    goals = {
      { action = "goto", text = "Take the stairs down to the Arena" },
      { action = "kill", text = "Kill [Count Geonor] — the Act 1 boss", count = 1 },
      { action = "note", text = "Portal to [Clearfell Encampment], talk to the Hooded One, then travel to Act 2." },
    },
  },
  {
    act = "Act 2",
    zone = "Vastiri Outskirts",
    images = { ["Vastiri Outskirts"] = M .. "A2-01-Vastiri-Outskirts-No-Text.png" },
    reward = "Uncut skill gem (Zarka, at the caravan)",
    goals = {
      { action = "goto", text = "Tag the [Vastiri Outskirts] checkpoint" },
      { action = "kill", text = "Kill [Rathbreaker]", count = 1 },
      { action = "collect", text = "Loot the Devastated Camp for an uncut support gem", optional = true },
      { action = "goto", text = "Reach and unlock [The Ardura Caravan] — the Act 2 town" },
      { action = "talk", text = "Talk to Sekhema Asala at the Desert Map" },
    },
  },
  {
    act = "Act 2",
    zone = "Mawdun Quarry",
    images = { ["Mawdun Quarry"] = M .. "A2-02-Mawdun-Quarry.webp" },
    goals = {
      { action = "goto", text = "Cross the [Mawdun Quarry] toward the Mine (quest: The Trail of Corruption)" },
      { action = "collect", text = "Loot the camp along the outer wall for an Artificer's Orb", optional = true },
    },
    sr_note = "Nothing required here but traversal — head straight for the Mine.",
  },
  {
    act = "Act 2",
    zone = "Mawdun Mine",
    images = { ["Mawdun Mine"] = M .. "A2-03-Mawdun-Mine.webp" },
    goals = {
      { action = "goto", text = "Tag the [Mawdun Mine] waypoint" },
      { action = "kill", text = "Follow the rails and kill [Rudja, the Dread Engineer]", count = 1 },
      { action = "talk", text = "Open the cage and free Risu (later runs the Currency Exchange)" },
    },
  },
  {
    act = "Act 2",
    zone = "The Halani Gates",
    images = { ["The Halani Gates"] = M .. "A2-05-Halani-Gates.webp" },
    goals = {
      { action = "goto", text = "Enter [The Halani Gates] and find Sekhema Asala" },
      { action = "talk", text = "Talk to Asala — she sends you through Traitor's Passage to open the gates" },
    },
  },
  {
    act = "Act 2",
    zone = "Traitor's Passage",
    images = { ["Traitor's Passage"] = M .. "A2-04-Traitors-Passage.png" },
    goals = {
      { action = "goto", text = "Tag the [Traitor's Passage] waypoint" },
      { action = "use", text = "Activate the Ancient Seal in the middle of the zone" },
      { action = "collect", text = "Activate the three Runic Seals", count = 3 },
      { action = "kill", text = "Kill [Balbala, the Traitor]", count = 1 },
      { action = "get", text = "Take [Balbala's Barya] from the Ancient Seal door" },
      { action = "collect", text = "Loot the Bellchest for an uncut skill gem", optional = true },
      { action = "note", text = "The Barya keys the Trial of the Sekhemas — your first Ascendancy (2 points)." },
    },
    ls_note = "Run the Trial of the Sekhemas for your first Ascendancy before it gets harder.",
    sr_note = "A backup Barya drops from Deshar vultures (~L28) if you skip the Trial for now.",
  },
  {
    act = "Act 2",
    zone = "The Halani Gates",
    images = { ["The Halani Gates"] = M .. "A2-05-Halani-Gates.webp" },
    goals = {
      { action = "goal", text = "Return to [The Halani Gates] and summon Asala to open the three gate levers" },
      { action = "kill", text = "Defeat [Jamanra, the Risen King]", count = 1 },
      { action = "note", text = "Jamanra flees on the Dreadnought; the sandstorm now gates Deshar until the Horn is built." },
    },
  },
  {
    act = "Act 2",
    zone = "Keth",
    images = { ["Keth"] = M .. "A2-06-Keth.webp" },
    reward = "Permanent: +2 Weapon-Set passive points (Kabala's Book of Specialisation)",
    goals = {
      { action = "goto", text = "Tag the [Keth] waypoint (quest: The City of Seven Waters)" },
      { action = "kill", text = "Kill [Kabala, Constrictor Queen] in the Venom Pit", count = 1 },
      { action = "collect", text = "Collect the Kabal Clan Relic (for the Valley of the Titans altar)" },
      { action = "collect", text = "Find the Treasure Room for a white-base Amulet", optional = true },
    },
    ls_note = "Kabala is optional but her +2 weapon-set points are permanent — do not skip.",
    sr_note = "One of the three Horn branches; grab the relic + points, then push through the Lost City.",
  },
  {
    act = "Act 2",
    zone = "The Lost City",
    images = { ["The Lost City"] = M .. "A2-07-Lost-City.png" },
    goals = {
      { action = "goto", text = "Pass through [The Lost City] toward Buried Shrines" },
      { action = "kill", text = "Optional: The Ninth Treasure of Keth in The Galleria", count = 1, optional = true },
    },
    sr_note = "Skip the Ninth Treasure detour; head to Buried Shrines.",
  },
  {
    act = "Act 2",
    zone = "Buried Shrines",
    images = { ["Buried Shrines"] = M .. "A2-08-Buried-Shrines.png" },
    goals = {
      { action = "goto", text = "Descend through [Buried Shrines] to Azarian's chamber" },
      { action = "collect", text = "Find the Elemental Shrine and loot its chest for an Elemental Ring + matching Rune", optional = true },
      { action = "kill", text = "Kill [Azarian, the Forsaken Son] in [Buried Shrines]", count = 1 },
      { action = "get", text = "Obtain the Essence of Water (1st Horn of the Vastiri item)" },
    },
  },
  {
    act = "Act 2",
    zone = "Mastodon Badlands",
    images = { ["Mastodon Badlands"] = M .. "A2-13-Mastodon-Badlands.webp" },
    goals = {
      { action = "goto", text = "Cross the [Mastodon Badlands] to The Bone Pits (quest: A Theft of Ivory)" },
      { action = "collect", text = "Collect the [Sun Clan Relic] (for the Valley of the Titans altar)" },
      { action = "note", text = "First clear here grants a Lesser Jeweller's Orb — do not skip it." },
    },
    sr_note = "The Lightless Passage (Abyss) side content off this zone is optional.",
  },
  {
    act = "Act 2",
    zone = "The Bone Pits",
    images = { ["The Bone Pits"] = M .. "A2-14-Bone-Pits.webp" },
    goals = {
      { action = "goto", text = "Tag the waypoint in [The Bone Pits]" },
      { action = "kill", text = "Kill [Iktab, the Deathlord] & [Ekbab, Ancient Steed] in [The Bone Pits]", count = 1 },
      { action = "get", text = "Obtain the [Mastodon Tusks] (2nd Horn of the Vastiri item)" },
    },
  },
  {
    act = "Act 2",
    zone = "Valley of the Titans",
    images = { ["Valley of the Titans"] = M .. "A2-09-Valley-Of-The-Titans.png" },
    reward = "Permanent: +1 Charm slot + swappable charm bonus (charges gained OR effect duration)",
    goals = {
      { action = "goto", text = "Tag the [Valley of the Titans] waypoint (quest: A Crown of Stone)" },
      { action = "use", text = "Activate the Medallion near the waypoint for the Charm slot" },
      { action = "use", text = "Place the Kabal Clan Relic + [Sun Clan Relic] at the Relic Altar" },
      { action = "note", text = "The altar needs BOTH clan relics — from Keth and the Mastodon Badlands." },
      { action = "collect", text = "First clear grants a random Unique item (Runes of Aldur reward)", optional = true },
    },
    ls_note = "The altar needs BOTH clan relics — do the Keth and Mastodon Badlands branches first.",
  },
  {
    act = "Act 2",
    zone = "Titan Grotto",
    images = { ["Titan Grotto"] = M .. "A2-10-Titan-Grotto.png" },
    goals = {
      { action = "kill", text = "Kill [Zalmarath, the Colossus] in [Titan Grotto]", count = 1 },
      { action = "get", text = "Obtain the Flame Ruby (3rd Horn of the Vastiri item)" },
    },
  },
  {
    act = "Act 2",
    zone = "The Ardura Caravan",
    goals = {
      { action = "use", text = "Return to the Ardura Caravan and sound [The Horn of the Vastiri]" },
      { action = "note", text = "With all three Horn pieces the Horn clears the Halani Gates sandstorm and opens Deshar." },
    },
  },
  {
    act = "Act 2",
    zone = "Deshar",
    images = { ["Deshar"] = M .. "A2-11-Deshar.png" },
    goals = {
      { action = "goto", text = "With the sandstorm cleared, advance into [Deshar]" },
      { action = "collect", text = "Pick up the [Final Letter] from a Fallen Dekhara" },
      { action = "goto", text = "Find and enter the Path of Mourning" },
    },
    sr_note = "Backup Trial Barya drops from Deshar vultures if you skipped Balbala's.",
  },
  {
    act = "Act 2",
    zone = "Path of Mourning",
    images = { ["Path of Mourning"] = M .. "A2-12-Path-Of-Mourning.png" },
    goals = {
      { action = "goto", text = "Cross the [Path of Mourning] to the Spires of Deshar" },
      { action = "kill", text = "Optional: Watchful Twins in Forgotten Corpses", count = 1, optional = true },
    },
    sr_note = "Pure connector; skip the Watchful Twins detour.",
  },
  {
    act = "Act 2",
    zone = "The Spires of Deshar",
    images = { ["The Spires of Deshar"] = M .. "A2-15-Spires-of-Deshar.webp" },
    reward = "Permanent: +10% Lightning Resistance (Sisters of Garukhan shrine)",
    goals = {
      { action = "goto", text = "Tag the waypoint in [The Spires of Deshar]" },
      { action = "use", text = "Touch the Sisters of Garukhan shrine" },
      { action = "kill", text = "Kill [Tor Gul, the Defiler]", count = 1 },
      { action = "note", text = "Automatons ambush you after the shrine — the resistance is already granted." },
    },
    sr_note = "Fast detour that offsets an act's -10% res penalty — grab it even on a speed run.",
  },
  {
    act = "Act 2",
    zone = "The Ardura Caravan",
    reward = "Permanent: +2 Weapon-Set passive points (Shambrin — 'Tradition's Toll')",
    goals = {
      { action = "turnin", text = "Return to the Ardura Caravan and deliver the [Final Letter] to Shambrin" },
    },
  },
  {
    act = "Act 2",
    zone = "Trial of the Sekhemas",
    reward = "Permanent: +2 Ascendancy Points",
    goals = {
      { action = "use", text = "Enter the [Trial of the Sekhemas] with [Balbala's Barya]" },
      { action = "goal", text = "Complete the trial to ascend for your first 2 Ascendancy Points" },
      { action = "note", text = "~Level 28+ recommended; watch your Honour — losing it all fails the run." },
    },
    ls_note = "Skippable for progression, but the Ascendancy points are permanent and huge — do it.",
  },
  {
    act = "Act 2",
    zone = "The Dreadnought",
    images = { ["The Dreadnought"] = M .. "A2-16-Dreadnought.webp" },
    goals = {
      { action = "goal", text = "Chase the caravan across [The Dreadnought]" },
      { action = "kill", text = "Kill [Jamanra, the Abomination] — the Act 2 boss", count = 1 },
      { action = "note", text = "Two-phase fight; phase two adds the sandstorm. Cap resistances first." },
      { action = "talk", text = "Talk to Asala, then proceed to Act 3" },
    },
  },
  {
    act = "Act 3",
    zone = "Sandswept Marsh",
    images = { ["Sandswept Marsh"] = M .. "A3-01-Sandswept-Marsh.webp" },
    goals = {
      { action = "goto", text = "Cross the [Sandswept Marsh] to the [Ziggurat Encampment] (Act 3 [Ziggurat Encampment])" },
      { action = "talk", text = "Talk to The Hooded One, Alva and Oswald; grab the waypoint" },
      { action = "kill", text = "Optional: kill [Rootdredge] for early loot", count = 1, optional = true },
    },
    sr_note = "Beeline the exit; skip Rootdredge and the side loot.",
  },
  {
    act = "Act 3",
    zone = "Jungle Ruins",
    images = { ["Jungle Ruins"] = M .. "A3-02-Jungle-Ruins-2.webp" },
    reward = "Permanent: +2 passive skill points (Mighty Silverfist)",
    goals = {
      { action = "kill", text = "Kill [Mighty Silverfist] in the [Jungle Ruins]", count = 1 },
      { action = "use", text = "Activate the [Runes of Aldur] runestone (1 of 3)" },
      { action = "note", text = "You return here later with the [Large Soul Core] to open the Matlan Waterways." },
    },
    ls_note = "Silverfist is easy and the +2 points are permanent — always kill him.",
  },
  {
    act = "Act 3",
    zone = "The Venom Crypts",
    images = { ["The Venom Crypts"] = M .. "act3-the-venom-crypts.png" },
    reward = "Permanent (LOCKED choice): +25% Stun threshold / +30% Ailment threshold / +25% Mana regen",
    goals = {
      { action = "goto", text = "Detour into [The Venom Crypts]" },
      { action = "collect", text = "Loot the [Venom Vial] from the corpse", count = 1 },
      { action = "turnin", text = "Hand the Venom Vial to Servi in [Ziggurat Encampment] to claim the reward" },
      { action = "note", text = "This choice is PERMANENT and cannot be changed — +25% Stun threshold is the common pick." },
    },
    sr_note = "Off the critical path — skippable for pure speed.",
  },
  {
    act = "Act 3",
    zone = "Infested Barrens",
    images = { ["Infested Barrens"] = M .. "A3-03-Infested-Barrens.webp" },
    goals = {
      { action = "goto", text = "Cross the [Infested Barrens] toward the Chimeral Wetlands" },
      { action = "talk", text = "Talk to Alva; grab the waypoint" },
    },
  },
  {
    act = "Act 3",
    zone = "Chimeral Wetlands",
    images = { ["Chimeral Wetlands"] = M .. "A3-04-Chimeral%20Wetlands.png" },
    goals = {
      { action = "kill", text = "Kill [Xyclucian, the Chimera] in the [Chimeral Wetlands]", count = 1 },
      { action = "get", text = "Pick up the [Inscribed Ultimatum] it drops" },
      { action = "note", text = "Use the Ultimatum at the Trial of Chaos for your 2nd Ascendancy (2 points)." },
    },
    ls_note = "Do the Trial of Chaos for the 2nd Ascendancy before pushing deeper.",
  },
  {
    act = "Act 3",
    zone = "Jiquani's Machinarium",
    images = { ["Jiquani's Machinarium"] = M .. "A3-05-Jinquanis-Machinarium.webp" },
    reward = "Permanent: +10% Fire Resistance (Blackjaw, the Remnant)",
    goals = {
      { action = "collect", text = "Collect Small Soul Cores in [Jiquani's Machinarium]", count = 4 },
      { action = "kill", text = "Kill [Blackjaw, the Remnant] on the way to the Sanctum", count = 1 },
    },
    ls_note = "Blackjaw is optional but grants permanent +10% Fire Res — do not skip him.",
  },
  {
    act = "Act 3",
    zone = "Jiquani's Sanctum",
    images = { ["Jiquani's Sanctum"] = M .. "A3-06-Jinquanis-Sanctum.png" },
    goals = {
      { action = "collect", text = "Place Medium Soul Cores in the mechanism in [Jiquani's Sanctum]", count = 2 },
      { action = "kill", text = "Kill [Zicoatl, Warden of the Core]", count = 1 },
      { action = "get", text = "Take the [Large Soul Core], then use it on the Jungle Ruins altar" },
    },
  },
  {
    act = "Act 3",
    zone = "Matlan Waterways",
    images = { ["Matlan Waterways"] = M .. "A3-07-Matlan-Waterways.webp" },
    goals = {
      { action = "use", text = "Step on the pressure pads to route the water in [Matlan Waterways]" },
      { action = "goto", text = "Cross to The Drowned City and the Azak Bog" },
    },
  },
  {
    act = "Act 3",
    zone = "Azak Bog",
    images = { ["Azak Bog"] = M .. "A3-14-Azak-Bog.webp" },
    reward = "Permanent: +30 Spirit (Ignagduk, the Bog Witch)",
    goals = {
      { action = "use", text = "Activate the third [Runes of Aldur] runestone in [Azak Bog]" },
      { action = "kill", text = "Kill [Ignagduk, the Bog Witch]", count = 1 },
    },
    ls_note = "+30 Spirit is one of the biggest permanent boosts in the campaign — never skip it.",
  },
  {
    act = "Act 3",
    zone = "The Drowned City",
    images = { ["The Drowned City"] = M .. "A3-Drowned-City-Update.webp" },
    goals = {
      { action = "goto", text = "Explore [The Drowned City] to the Apex of Filth and the Molten Vault" },
      { action = "note", text = "The Molten Vault (Mektul) unlocks the Reforging Bench — a first-character detour." },
    },
    sr_note = "On alts you can skip the Molten Vault once the Reforging Bench is unlocked.",
  },
  {
    act = "Act 3",
    zone = "The Apex of Filth",
    images = { ["The Apex of Filth"] = M .. "A3-Apex-of-Filth-Updated.webp" },
    goals = {
      { action = "kill", text = "Kill the [Queen of Filth] in [The Apex of Filth]", count = 1 },
      { action = "get", text = "Take the [Temple Door Idol] (opens the Temple of Kopec)" },
    },
  },
  {
    act = "Act 3",
    zone = "Temple of Kopec",
    images = { ["Temple of Kopec"] = M .. "A3-10-Temple-of-Kopec.webp" },
    goals = {
      { action = "goto", text = "Climb the [Temple of Kopec] to the summit" },
      { action = "kill", text = "Kill [Ketzuli, High Priest of the Sun]", count = 1 },
      { action = "note", text = "Each floor is triangular — the far corner is a coin-flip for the stairs." },
    },
  },
  {
    act = "Act 3",
    zone = "Utzaal",
    images = { ["Utzaal"] = M .. "a3-utzaal.webp" },
    goals = {
      { action = "kill", text = "Kill [Viper Napuatzi] in [Utzaal]", count = 1 },
      { action = "collect", text = "Farm a [Sacrificial Heart] from the Vaal Goliaths (for Aggorat)", count = 1 },
      { action = "goto", text = "Take the side path to the Aggorat entrance" },
    },
  },
  {
    act = "Act 3",
    zone = "Aggorat",
    images = { ["Aggorat"] = M .. "A3-12-Aggorat.png" },
    reward = "Permanent: +2 passive skill points (blood sacrifice)",
    goals = {
      { action = "use", text = "Place the [Sacrificial Heart] on the Altar in [Aggorat] and stab it" },
      { action = "goto", text = "Proceed to The Black Chambers" },
    },
    ls_note = "The sacrifice grants a permanent +2 passive points — always perform it.",
  },
  {
    act = "Act 3",
    zone = "The Black Chambers",
    images = { ["The Black Chambers"] = M .. "A3-13-Black-Chambers.png" },
    goals = {
      { action = "kill", text = "Kill [Doryani, Royal Thaumaturge] in [The Black Chambers] (Act 3 boss)", count = 1 },
      { action = "note", text = "Three phases: caster, then Doryani's Triumph below 50%, then airborne. Cap resistances first." },
      { action = "note", text = "Defeating Doryani completes Act 3 — continue to Act 4." },
    },
  },
  {
    act = "Act 4",
    zone = "Kingsmarch",
    images = { ["Kingsmarch"] = M .. "act4-kingsmarch-town.png" },
    goals = {
      { action = "talk", text = "Talk to the NPCs in [Kingsmarch] to receive the Book Charter" },
      { action = "talk", text = "Talk to [Makoru] to set sail for [Kedge Bay]" },
      { action = "note", text = "[Kingsmarch] is the Act 4 hub — you sail out to each island and back from here." },
    },
  },
  {
    act = "Act 4",
    zone = "Kedge Bay",
    images = { ["Kedge Bay"] = M .. "A4-03-Kedge%20Bay.webp" },
    goals = {
      { action = "goto", text = "Sail to and push through [Kedge Bay] toward Journey's End" },
      { action = "note", text = "Runes of Aldur (first clear): Uncut Support Gem L4." },
    },
    sr_note = "Skip the side chests; run straight through to Journey's End.",
  },
  {
    act = "Act 4",
    zone = "Journey's End",
    images = { ["Journey's End"] = M .. "A4-04-Journeys_End.webp" },
    reward = "Permanent: +2 passive skill points",
    goals = {
      { action = "talk", text = "Summon [Tujen] in [Journey's End]" },
      { action = "kill", text = "Kill [Captain Hartlin]", count = 1 },
      { action = "collect", text = "Take the Verisium, then talk to [Dannig] for [Verisium Spikes]" },
      { action = "talk", text = "Talk to [Freya] and activate the Karui Totems" },
      { action = "kill", text = "Kill [Omniphobia, Fear Manifest] for +2 passive skill points", count = 1 },
    },
  },
  {
    act = "Act 4",
    zone = "Whakapanu Island",
    images = { ["Whakapanu Island"] = M .. "A4-06-Whakapanu_Island.webp" },
    goals = {
      { action = "goto", text = "Sail to [Whakapanu Island]" },
      { action = "note", text = "Rotating requirement — Act 4's required islands change each league, so the layout rotates; clear it when it's the active island." },
      { action = "kill", text = "Kill the [Great White One] and take the [Shark Fin] (turn in later at Ngakanu)", count = 1, optional = true },
    },
    sr_note = "Grab the Shark Fin if you want the swappable defence buff; otherwise push on.",
  },
  {
    act = "Act 4",
    zone = "Singing Caverns",
    images = { ["Singing Caverns"] = M .. "A4-07-Singing-Caverns.webp" },
    goals = {
      { action = "goto", text = "Tag the [Singing Caverns] waypoint" },
      { action = "kill", text = "Kill [Diamora, Song of Death]", count = 1 },
      { action = "collect", text = "Loot the Beckoning Clam for a Pearl → all-resistance Amulet" },
    },
  },
  {
    act = "Act 4",
    zone = "Ngakanu",
    images = { ["Ngakanu"] = M .. "A4-14-Ngakanu.webp" },
    reward = "Permanent (swappable): Kaimana's Lesson — Kaom's Lesson (+30% Armour/Evasion/ES) or Rakiata's Lesson",
    goals = {
      { action = "goto", text = "Sail to [Ngakanu]" },
      { action = "turnin", text = "Turn in the [Shark Fin] to [Kaimana] for a swappable Lesson" },
      { action = "note", text = "Only needed if you took the optional [Shark Fin] from the [Great White One]." },
    },
  },
  {
    act = "Act 4",
    zone = "Abandoned Prison",
    images = { ["Abandoned Prison"] = M .. "A4-08-abandoned-prison-1.webp" },
    reward = "Permanent (swappable): Goddess of Justice — +30% Life OR +30% Mana Recovery from Flasks",
    goals = {
      { action = "note", text = "Rotating requirement — Act 4's required islands change each league, so the layout rotates." },
      { action = "kill", text = "Kill monsters in the [Abandoned Prison] for the [Chapel Key]", count = 1 },
      { action = "use", text = "Open the Chapel Door" },
      { action = "goto", text = "Tag the waypoint" },
      { action = "use", text = "Activate the [Goddess of Justice] and choose the swappable bonus" },
      { action = "use", text = "Use the Levers to open the way forward" },
    },
  },
  {
    act = "Act 4",
    zone = "Solitary Confinement",
    images = { ["Solitary Confinement"] = M .. "A4-09-Solitary-Confinement.webp" },
    optional = true,
    goals = {
      { action = "kill", text = "Kill [The Prisoner] in [Solitary Confinement]", count = 1 },
      { action = "note", text = "Sub-area of the Abandoned Prison; drops a Weapon Piece." },
    },
    sr_note = "Optional detour — skippable on a speedrun.",
  },
  {
    act = "Act 4",
    zone = "Isle of Kin",
    images = { ["Isle of Kin"] = M .. "A4-01-Isle_of_Kin.webp" },
    reward = "Greater Rune (Blind Beast, first clear)",
    goals = {
      { action = "note", text = "Rotating requirement (Land of the Kin) — Act 4's required islands change each league, so the layout rotates; do it when it's the active island. Kept in the speedrun." },
      { action = "goto", text = "Cross the [Isle of Kin] toward the [Volcanic Warrens]" },
      { action = "kill", text = "Optional side boss: kill [The Blind Beast] for a free Greater Rune", count = 1, optional = true },
      { action = "note", text = "Search the outer walls for a Lesser Jeweller's Orb. Runes of Aldur (first clear): Gemcutter's Prism." },
    },
    ls_note = "Do the Blind Beast for the free Greater Rune — a strong early upgrade.",
  },
  {
    act = "Act 4",
    zone = "Volcanic Warrens",
    images = { ["Volcanic Warrens"] = M .. "A4-02-Volcanic-Warrens.webp" },
    goals = {
      { action = "kill", text = "Kill the Fire and Lightning Golems → Topaz Ring or Ruby Ring (kill order sets the reward)", count = 2, optional = true },
      { action = "kill", text = "Kill [Krutog, Lord of Kin] in the [Volcanic Warrens]", count = 1 },
      { action = "note", text = "Fire-heavy zone — bring Fire Resistance." },
    },
  },
  {
    act = "Act 4",
    zone = "Shrike Island",
    images = { ["Shrike Island"] = M .. "A4-05-Shrike%20Island.webp" },
    goals = {
      { action = "note", text = "Rotating requirement — Act 4's required islands change each league, so the layout rotates." },
      { action = "kill", text = "Kill [Scourge of the Skies] on [Shrike Island]", count = 1 },
    },
  },
  {
    act = "Act 4",
    zone = "Eye of Hinekora",
    images = { ["Eye of Hinekora"] = M .. "A4-10-Eye%20of%20Hinekora.webp" },
    reward = "Permanent: +5% maximum Mana",
    goals = {
      { action = "use", text = "Activate the Well of Hinekora and pass the three tests in the [Eye of Hinekora]" },
      { action = "use", text = "Click Pay your Respects at the Silent Hall for +5% maximum Mana" },
      { action = "note", text = "Optional: a Level 12 Spirit Gem hides in a chest behind the waterfall. Runes of Aldur (first clear): Chaos Orb." },
    },
  },
  {
    act = "Act 4",
    zone = "Halls of the Dead",
    images = { ["Halls of the Dead"] = M .. "A4-11-Halls-of-the-Dead.webp" },
    reward = "Permanent: 3 choices of +5 Attribute OR +5% Resistance (Tawhoa / Tasalio / Ngamahu Tests)",
    goals = {
      { action = "goto", text = "Tag the [Halls of the Dead] waypoint" },
      { action = "goal", text = "Pass [Tawhoa's Test] → +5 Dexterity OR +5% Lightning Resistance (choice)" },
      { action = "goal", text = "Pass [Tasalio's Test] → +5 Intelligence OR +5% Cold Resistance (choice)" },
      { action = "goal", text = "Pass [Ngamahu's Test] → +5 Strength OR +5% Fire Resistance (choice)" },
      { action = "kill", text = "Defeat [Yama the White]", count = 1 },
      { action = "collect", text = "Take the [Silver Coin]" },
      { action = "note", text = "Each test gives EITHER the attribute OR the resistance — choose deliberately." },
    },
  },
  {
    act = "Act 4",
    zone = "Trial of the Ancestors",
    reward = "Permanent: +2 passive skill points",
    goals = {
      { action = "goto", text = "Tag the [Trial of the Ancestors] waypoint" },
      { action = "talk", text = "Talk to [Navali]" },
      { action = "collect", text = "Take the [Tattoo of Hinekora] for +2 passive skill points" },
    },
  },
  {
    act = "Act 4",
    zone = "Arastas",
    images = { ["Arastas"] = M .. "A4-12-Arastas.webp" },
    goals = {
      { action = "goto", text = "Tag the [Arastas] waypoint" },
      { action = "goal", text = "Enter the church, exit, then destroy the forcefield" },
      { action = "kill", text = "Kill [Torvian, Hand of the Saviour]", count = 1 },
      { action = "collect", text = "Interact with both Bells → 3 Exalted Orbs + 3 Regal Orbs", optional = true },
    },
  },
  {
    act = "Act 4",
    zone = "Excavation",
    images = { ["Excavation"] = M .. "A4-13-Excavation.webp" },
    goals = {
      { action = "kill", text = "Kill [Benedictus, First Herald of Utopia] at the Precursor Forge in [Excavation]", count = 1 },
      { action = "talk", text = "Enter the forge and talk to the [Hooded One]" },
    },
  },
  {
    act = "Act 4",
    zone = "Ngakanu",
    images = { ["Ngakanu"] = M .. "A4-14-Ngakanu.webp" },
    goals = {
      { action = "goto", text = "Sail back to [Ngakanu] and head toward the Heart of the Tribe" },
      { action = "talk", text = "Talk to [Rhodri]" },
      { action = "note", text = "Runes of Aldur (first clear): Greater Jeweller's Orb — DO NOT SKIP." },
    },
  },
  {
    act = "Act 4",
    zone = "Heart of the Tribe",
    images = { ["Heart of the Tribe"] = M .. "A4-15-Heart-of-the-tribe.webp" },
    goals = {
      { action = "goto", text = "Tag the [Heart of the Tribe] waypoint" },
      { action = "kill", text = "Kill [Tavakai] through all phases (Act 4 boss)", count = 1 },
      { action = "talk", text = "Talk to the [Hooded One] to complete Act 4 and unlock the Interludes" },
    },
  },
  {
    act = "Interlude 1",
    zone = "Khari Crossing",
    images = { ["Khari Crossing"] = M .. "interlude-khari-crossing.png" },
    reward = "Permanent: +2 passive skill points",
    goals = {
      { action = "goto", text = "Enter [Khari Crossing] from the [Khari Bazaar] and tag the waypoint" },
      { action = "kill", text = "Kill [Akthi, the Final Sting] and [Anundr, the Sandworm]", count = 2 },
    },
    ls_note = "Akthi & Anundr grant a permanent +2 passives — run this interlude on every character.",
  },
  {
    act = "Interlude 1",
    zone = "Skullmaw Stairway",
    reward = "Permanent: +5% maximum Life",
    goals = {
      { action = "goto", text = "Climb the [Skullmaw Stairway] to the Molten Shrine" },
      { action = "collect", text = "Take the [Molten One's Gift]", count = 1 },
      { action = "note", text = "The +5% maximum Life is permanent — always grab it while you are here." },
    },
  },
  {
    act = "Interlude 1",
    zone = "Pools of Kathal",
    images = { ["Pools of Kathal"] = M .. "interlude-pools-of-kathal.png" },
    goals = {
      { action = "goto", text = "Tag the [Pools of Kathal] waypoint on the way to the [Sel Khari Sanctuary]" },
      { action = "note", text = "A guaranteed Expedition spawns here — worth a quick detour for currency." },
    },
    sr_note = "Pure connector; tag the waypoint and push toward the Sanctuary.",
  },
  {
    act = "Interlude 1",
    zone = "Sel Khari Sanctuary",
    images = { ["Sel Khari Sanctuary"] = M .. "interlude-sel-khari-sanctuary.png" },
    reward = "1 of 4 rare Amulets + 1 of 4 rare Rings (from the optional two Baryas)",
    goals = {
      { action = "goto", text = "Tag the [Sel Khari Sanctuary] waypoint" },
      { action = "collect", text = "Find the two Baryas and place them in their sockets (left and right of the map)", count = 2, optional = true },
      { action = "kill", text = "Kill [Elzarah, the Cobra Lord]", count = 1 },
    },
  },
  {
    act = "Interlude 1",
    zone = "Galai Gates",
    goals = {
      { action = "goto", text = "Tag the [Galai Gates] waypoint" },
      { action = "kill", text = "Kill [Vornas, the Fell Flame]", count = 1 },
    },
  },
  {
    act = "Interlude 1",
    zone = "Qimah",
    images = { ["Qimah"] = M .. "interlude-qimah.png" },
    reward = "Permanent: Seven Pillars boon (swappable) — +5 all Attributes / +5% all Elemental Resistances / +12% Cooldown Recovery / +3% Movement Speed / +20% Area of Effect / +15% Global Defences",
    goals = {
      { action = "goto", text = "Tag the [Qimah] waypoint" },
      { action = "use", text = "Activate all [Seven Pillars] (hidden at the edges of the map) and choose your boon (swappable later)", count = 7 },
      { action = "talk", text = "Summon [Jado] at the end of the zone" },
    },
    ls_note = "The Seven Pillars boon is permanent and re-choosable — pick +5% all Elemental Resistances early to help cap res.",
  },
  {
    act = "Interlude 1",
    zone = "Qimah Reservoir",
    images = { ["Qimah Reservoir"] = M .. "interlude-qimah-reservoir.png" },
    goals = {
      { action = "goto", text = "Tag the [Qimah Reservoir] waypoint" },
      { action = "collect", text = "Find the Vials and use them on the wells for currency", optional = true },
      { action = "kill", text = "Kill [Azmadi, the Faridun Prince]", count = 1 },
      { action = "use", text = "Activate the [Grand Barya], then talk to [Jado]" },
    },
  },
  {
    act = "Interlude 1",
    zone = "Khari Bazaar",
    goals = {
      { action = "talk", text = "Return to the [Khari Bazaar] and talk to the [Hooded One]" },
      { action = "goto", text = "Interlude complete — proceed to Interlude 2" },
    },
  },
  {
    act = "Interlude 2",
    zone = "Ashen Forest",
    images = { ["Ashen Forest"] = M .. "interlude-ashen-forest.png" },
    goals = {
      { action = "goto", text = "Enter [Ashen Forest] and head toward [Kriar Village]" },
    },
    ls_note = "Do Mount Kriar first among the interludes - the early +40 Spirit from Kriar Village powers up your gems.",
  },
  {
    act = "Interlude 2",
    zone = "Kriar Village",
    images = { ["Kriar Village"] = M .. "interlude-kriar-village.png" },
    reward = "Permanent: +30 Spirit",
    goals = {
      { action = "goto", text = "Reach [Kriar Village] and tag the waypoint" },
      { action = "kill", text = "Kill [Lythara, the Wayward Spear] for +40 Spirit", count = 1 },
    },
  },
  {
    act = "Interlude 2",
    zone = "Glacial Tarn",
    images = { ["Glacial Tarn"] = M .. "interlude-glacial-tarn.png" },
    goals = {
      { action = "goto", text = "Enter the [Glacial Tarn] and tag the waypoint" },
    },
  },
  {
    act = "Interlude 2",
    zone = "Howling Caves",
    images = { ["Howling Caves"] = M .. "interlude-howling-caves.png" },
    reward = "Permanent: +2 passive skill points",
    goals = {
      { action = "goto", text = "Head into the [Howling Caves] and tag the waypoint" },
      { action = "kill", text = "Kill [The Abominable Yeti] for +2 passive skill points", count = 1 },
      { action = "get", text = "Take the [Icy Tusks]" },
    },
  },
  {
    act = "Interlude 2",
    zone = "Glacial Tarn",
    goals = {
      { action = "goto", text = "Return to the [Glacial Tarn]" },
      { action = "kill", text = "Kill [Rakkar, the Frozen Talon]", count = 1 },
    },
  },
  {
    act = "Interlude 2",
    zone = "Kriar Peaks",
    images = { ["Kriar Peaks"] = M .. "interlude-kriar-peaks.png" },
    reward = "Free Unique Item of your choice",
    goals = {
      { action = "goto", text = "Climb to [Kriar Peaks] and tag the waypoint" },
      { action = "talk", text = "Talk to [Elder Madox] to claim a free Unique Item of your choice" },
    },
    ls_note = "The free unique from Elder Madox can be a real power spike - pick one that fits your build.",
  },
  {
    act = "Interlude 2",
    zone = "Etched Ravine",
    images = { ["Etched Ravine"] = M .. "interlude-etched-ravine.png" },
    goals = {
      { action = "goto", text = "Cross the [Etched Ravine] and tag the waypoint" },
      { action = "kill", text = "Kill [Stormgore, the Guardian]", count = 1 },
    },
  },
  {
    act = "Interlude 2",
    zone = "Cuachic Vault",
    images = { ["Cuachic Vault"] = M .. "interlude-the-cuachic-vault.png" },
    goals = {
      { action = "goto", text = "Descend into the [Cuachic Vault] and tag the waypoint" },
      { action = "kill", text = "Kill [Zelina, Blood Priestess] and [Zolin, Blood Priest]", count = 2 },
      { action = "talk", text = "Summon [Doryani] at the vault's heart" },
      { action = "turnin", text = "Talk to the [Hooded One] to complete Doryani's Contingency and proceed to Interlude 3" },
    },
  },
  {
    act = "Interlude 3",
    zone = "Scorched Farmlands",
    images = { ["Scorched Farmlands"] = M .. "interlude-scorched-farmlands.png" },
    goals = {
      { action = "goto", text = "Enter the [Scorched Farmlands] (Ogham interlude — [The Refuge] [The Refuge])" },
      { action = "kill", text = "Kill [Heldra of the Black Pyre] and [Isolde of the White Shroud]", count = 2 },
      { action = "note", text = "The two witch-sisters patrol the burnt fields — clear both before pushing on to the Stones of Serle." },
    },
  },
  {
    act = "Interlude 3",
    zone = "Stones of Serle",
    images = { ["Stones of Serle"] = M .. "interlude-stones-of-serle.png" },
    goals = {
      { action = "goto", text = "Enter the [Stones of Serle]" },
      { action = "use", text = "Activate all the Runed Megaliths" },
      { action = "kill", text = "Kill [Siora, Blade of the Mists]", count = 1 },
      { action = "talk", text = "Talk to Una after the fight" },
    },
  },
  {
    act = "Interlude 3",
    zone = "Blackwood",
    images = { ["Blackwood"] = M .. "interlude-blackwood.png" },
    goals = {
      { action = "goto", text = "Clear the Darkness and push through [Blackwood] toward Holten" },
      { action = "note", text = "The Darkness drains you outside the light — stay near the roving wisps and braziers." },
    },
  },
  {
    act = "Interlude 3",
    zone = "Holten",
    images = { ["Holten"] = M .. "interlude-holten.png" },
    goals = {
      { action = "goto", text = "Enter the ruined [The Refuge] of [Holten]" },
      { action = "talk", text = "Interact with the Soul of the Ferryman in the centre to trade Greater Runes for Gold", optional = true },
      { action = "note", text = "The Ferryman trade is an optional Gold sink — take it or leave it, then head to Wolvenhold." },
    },
  },
  {
    act = "Interlude 3",
    zone = "Wolvenhold",
    images = { ["Wolvenhold"] = M .. "interlude-wolvenhold.png" },
    reward = "Permanent: +2 passive skill points",
    goals = {
      { action = "goto", text = "Enter [Wolvenhold]" },
      { action = "kill", text = "Kill [Oswin, the Dread Warden]", count = 1 },
    },
    ls_note = "Oswin's +2 passives are permanent — never skip this fight.",
  },
  {
    act = "Interlude 3",
    zone = "Holten Estate",
    images = { ["Holten Estate"] = M .. "interlude-holten-estate.png" },
    goals = {
      { action = "goto", text = "Tag the [Holten Estate] waypoint" },
      { action = "goto", text = "Head upstairs, then back down to the ground floor to open the way" },
      { action = "kill", text = "Kill [Thane Wulfric] and [Lady Elswyth]", count = 2 },
      { action = "note", text = "Defeating the estate lord and lady completes The Curse of Holten." },
    },
    sr_note = "Cap resistances before the paired boss fight — they hit hard together.",
  },
  {
    act = "Interlude 3",
    zone = "Kingsmarch",
    reward = "Permanent: +2 passive skill points",
    goals = {
      { action = "talk", text = "Return to the Hooded One — all three interludes complete for +2 passives" },
      { action = "goto", text = "Travel to Oriath and run one map to unlock mapping; the Atlas is now open" },
      { action = "note", text = "This is the final interlude — the campaign is complete after handing in to the Hooded One." },
    },
  },
  {
    act = "Endgame",
    zone = "Kingsmarch",
    images = { ["Kingsmarch"] = M .. "act4-kingsmarch-town.png" },
    reward = "Permanent: +2 passive skill points",
    goals = {
      { action = "goto", text = "Waypoint back to [Kingsmarch] (the Act 4 town)" },
      { action = "talk", text = "Talk to the Hooded One — all three Interludes are now complete" },
      { action = "turnin", text = "Claim the final campaign reward for finishing every Interlude" },
      { action = "note", text = "This is the last permanent character bonus of the campaign — +2 passive skill points." },
    },
    ls_note = "Do not miss this — the +2 passives only unlock once all three Interludes are cleared.",
  },
  {
    act = "Endgame",
    zone = "Oriath",
    goals = {
      { action = "goto", text = "Travel to [Oriath]" },
      { action = "goal", text = "Run one map to unlock mapping", count = 1 },
      { action = "note", text = "The Atlas and endgame maps now open — the campaign is complete and endgame begins." },
    },
    sr_note = "One map clears the gate to the Atlas; pick your first map node and go.",
  },
}

-- Loaded as a plain script chunk (no module system), so publish onto the codex
-- namespace for the campaign plugin to read at guide-build time.
codex.campaign_route = { patch = "0.5", steps = STEPS }
