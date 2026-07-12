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

local STEPS = {

  -- ========================================================= ACT 1 · Clearfell
  {
    act = "Act 1",
    zone = "The Riverbank",
    goals = {
      { action = "kill", text = "Kill the Bloated Miller", count = 1 },
      { action = "note", text = "Grab the Uncut Skill Gem he drops — your first real skill." },
      { action = "goto", text = "Enter Clearfell" },
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
    images = { ["Beira of the Rotten Pack"] = M .. "Clearfell-Seed-2-Pilot.webp" },
    reward = "Permanent: +10% Cold Resistance",
    goals = {
      { action = "kill", text = "Kill [Beira of the Rotten Pack]", count = 1 },
      { action = "note", text = "Beira is always north or northeast of the waypoint." },
      { action = "turnin", text = "Turn in 'The Rotten Pack' to Renly" },
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
      { action = "kill", text = "Find and kill The Devourer", count = 1 },
      { action = "note", text = "Skippable when racing — the gems are the only reason to go." },
    },
  },
  {
    act = "Act 1",
    zone = "The Grelwood",
    images = { ["The Grelwood"] = M .. "Grelwood-Pilot.png" },
    goals = {
      { action = "goto", text = "Enter [The Grelwood] and tag the waypoint" },
      { action = "talk", text = "Talk to Una by the great tree" },
      { action = "accept", text = "Accept 'The Red Vale'" },
    },
  },
  {
    act = "Act 1",
    zone = "The Grelwood",
    optional = true,
    reward = "Uncut skill gem (level 2)",
    goals = {
      { action = "kill", text = "Find and kill Brambleghast", count = 1 },
    },
  },
  {
    act = "Act 1",
    zone = "The Red Vale",
    images = { ["The Red Vale"] = M .. "Red-Vale-Pilot.webp" },
    reward = "Uncut skill gem (level 3)",
    goals = {
      { action = "collect", text = "Take the artefacts from the three obelisks in [The Red Vale]", count = 3 },
      { action = "note", text = "All three obelisks show on the map edge — clear them in one loop." },
      { action = "kill", text = "Kill The Rust King", count = 1 },
    },
  },
  {
    act = "Act 1",
    zone = "The Grelwood",
    goals = {
      { action = "turnin", text = "Return to Una and turn in 'The Red Vale'" },
      { action = "note", text = "The town sequence unlocks after you hand over the artefacts." },
    },
  },
  {
    act = "Act 1",
    zone = "The Grim Tangle",
    images = { ["The Grim Tangle"] = M .. "Grim-Tangle-Pilot.webp" },
    goals = {
      { action = "goto", text = "Push through [The Grim Tangle] to the Cemetery of the Eternals" },
      { action = "kill", text = "Find and kill The Rotten Druid", count = 1, optional = true },
      { action = "note", text = "The Druid is out of the way — an uncut support gem if you want it." },
    },
  },
  {
    act = "Act 1",
    zone = "Cemetery of the Eternals",
    images = { ["Cemetery of the Eternals"] = M .. "Cemetery-Pilot.webp" },
    goals = {
      { action = "goto", text = "Tag the [Cemetery of the Eternals] waypoint" },
      { action = "kill", text = "Kill Lachlann of Endless Lament", count = 1, optional = true },
      { action = "note", text = "Lachlann is an optional side boss reached through the Tomb." },
    },
  },
  {
    act = "Act 1",
    zone = "Hunting Grounds",
    images = { ["Hunting Grounds"] = M .. "Hunting-Grounds-Pilot.webp" },
    reward = "Permanent: +2 passive skill points (Crowbell)",
    goals = {
      { action = "goto", text = "Enter the [Hunting Grounds] and tag the waypoint" },
      { action = "kill", text = "Kill Crowbell in the Embered Reef", count = 1 },
    },
    ls_note = "Crowbell's +2 passives are permanent — take them on every character.",
  },
  {
    act = "Act 1",
    zone = "Freythorn",
    images = { ["Freythorn"] = M .. "Freythorn-Pilot.webp" },
    reward = "Permanent: +30 Spirit (The King in the Mist)",
    goals = {
      { action = "goto", text = "Enter [Freythorn] and tag the waypoint" },
      { action = "collect", text = "Clear the four ritual circles", count = 4 },
      { action = "kill", text = "Kill The King in the Mist", count = 1 },
      { action = "note", text = "+30 Spirit is build-defining — never skip it." },
    },
  },
  {
    act = "Act 1",
    zone = "Ogham Farmlands",
    images = { ["Ogham Farmlands"] = M .. "Ogham-Farmlands-Pilot.webp" },
    reward = "Permanent: +2 passive skill points (Una's Lute)",
    goals = {
      { action = "goto", text = "Cross the [Ogham Farmlands] to the village" },
      { action = "collect", text = "Recover Una's Lute", count = 1 },
    },
  },
  {
    act = "Act 1",
    zone = "Ogham Village",
    images = { ["Ogham Village"] = M .. "Ogham-Village-Pilot.webp" },
    goals = {
      { action = "goto", text = "Pass through [Ogham Village] toward the Manor" },
      { action = "talk", text = "Return the Lute to Una for the reward" },
    },
  },
  {
    act = "Act 1",
    zone = "Ogham Manor",
    images = { ["Ogham Manor"] = M .. "Ogham-Manor-First.webp" },
    reward = "Permanent: +20 maximum Life (Candlemass, Act 1 boss)",
    goals = {
      { action = "goto", text = "Work through [Ogham Manor] to the top floor" },
      { action = "kill", text = "Kill Candlemass, the Living Rite", count = 1 },
      { action = "note", text = "Cap your resistances before this fight — it ends Act 1." },
    },
    sr_note = "Take the manor's right-hand rooms; the left loop is a dead end.",
  },

  -- ================================================= ACT 2 · The Vastiri Desert
  -- Route order note: the three middle branches (Keth cluster, Mastodon/Bone
  -- Pits, Valley/Titan) are all done BEFORE Deshar — assembling the Horn of the
  -- Vastiri clears the Halani Gates sandstorm. Ordered here to match gameplay.
  {
    act = "Act 2",
    zone = "Vastiri Outskirts",
    images = { ["Vastiri Outskirts"] = M .. "A2-01-Vastiri-Outskirts-No-Text.png" },
    reward = "Uncut skill gem (Zarka, at the caravan)",
    goals = {
      { action = "goto", text = "Tag the [Vastiri Outskirts] checkpoint" },
      { action = "kill", text = "Kill Rathbreaker", count = 1 },
      { action = "goto", text = "Reach and unlock The Ardura Caravan (the Act 2 town)" },
      { action = "talk", text = "Talk to Sekhema Asala at the Desert Map" },
    },
  },
  {
    act = "Act 2",
    zone = "Mawdun Quarry",
    images = { ["Mawdun Quarry"] = M .. "A2-02-Mawdun-Quarry.webp" },
    goals = {
      { action = "goto", text = "Cross the [Mawdun Quarry] to the Mine (quest: The Trail of Corruption)" },
    },
    sr_note = "Nothing required here but traversal — head straight for the Mine.",
  },
  {
    act = "Act 2",
    zone = "Mawdun Mine",
    images = { ["Mawdun Mine"] = M .. "A2-03-Mawdun-Mine.webp" },
    goals = {
      { action = "kill", text = "Follow the rails and kill Rudja, the Dread Engineer", count = 1 },
      { action = "talk", text = "Free Risu from the cage (later runs the Currency Exchange)" },
    },
  },
  {
    act = "Act 2",
    zone = "Traitor's Passage",
    optional = true,
    images = { ["Traitor's Passage"] = M .. "A2-04-Traitors-Passage.png" },
    goals = {
      { action = "kill", text = "Kill Balbala, the Traitor in [Traitor's Passage]", count = 1 },
      { action = "get", text = "Take Balbala's Barya from the Ancient Seal door" },
      { action = "note", text = "The Barya keys the Trial of the Sekhemas — your first Ascendancy (2 points)." },
    },
    ls_note = "Run the Trial of the Sekhemas for your first Ascendancy before it gets harder.",
    sr_note = "Skippable on a speed pass — a backup Barya drops from Deshar vultures (~L28).",
  },
  {
    act = "Act 2",
    zone = "The Halani Gates",
    images = { ["The Halani Gates"] = M .. "A2-05-Halani-Gates.webp" },
    goals = {
      { action = "goal", text = "Summon Sekhema Asala to open the three gate levers in [The Halani Gates]" },
      { action = "kill", text = "Kill Jamanra, the Risen King", count = 1 },
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
      { action = "kill", text = "Kill Kabala, Constrictor Queen in the Venom Pit", count = 1 },
      { action = "collect", text = "Collect the Kabal Clan Relic (for the Valley of the Titans altar)" },
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
      { action = "kill", text = "Kill Azarian, the Forsaken Son in [Buried Shrines]", count = 1 },
      { action = "get", text = "Obtain the Essence of Water (1st Horn of the Vastiri item)" },
    },
  },
  {
    act = "Act 2",
    zone = "Mastodon Badlands",
    images = { ["Mastodon Badlands"] = M .. "A2-13-Mastodon-Badlands.webp" },
    goals = {
      { action = "goto", text = "Tag the [Mastodon Badlands] waypoint (quest: A Theft of Ivory)" },
      { action = "collect", text = "Collect the Sun Clan Relic (for the Valley of the Titans altar)" },
      { action = "goto", text = "Find the Lightless Passage to the Bone Pits" },
    },
    sr_note = "Lightless Passage (Abyss) is optional.",
  },
  {
    act = "Act 2",
    zone = "The Bone Pits",
    images = { ["The Bone Pits"] = M .. "A2-14-Bone-Pits.webp" },
    goals = {
      { action = "kill", text = "Kill Iktab, the Deathlord & Ekbab, Ancient Steed in [The Bone Pits]", count = 1 },
      { action = "get", text = "Obtain the Mastodon Tusks (2nd Horn of the Vastiri item)" },
    },
  },
  {
    act = "Act 2",
    zone = "Valley of the Titans",
    images = { ["Valley of the Titans"] = M .. "A2-09-Valley-Of-The-Titans.png" },
    reward = "Permanent: +1 Charm slot + swappable charm bonus (charges gained OR effect duration)",
    goals = {
      { action = "goto", text = "Tag the [Valley of the Titans] waypoint (quest: A Crown of Stone)" },
      { action = "use", text = "Place the Kabal Clan Relic + Sun Clan Relic at the Relic Altar" },
      { action = "goto", text = "Open the path to the Titan Grotto" },
    },
    ls_note = "The altar needs BOTH clan relics — do the Keth and Mastodon branches first.",
  },
  {
    act = "Act 2",
    zone = "Titan Grotto",
    images = { ["Titan Grotto"] = M .. "A2-10-Titan-Grotto.png" },
    goals = {
      { action = "kill", text = "Kill Zalmarath, the Colossus in [Titan Grotto]", count = 1 },
      { action = "get", text = "Obtain the Flame Ruby (3rd Horn of the Vastiri item)" },
      { action = "note", text = "With all three items, assemble the Horn and clear the Halani Gates sandstorm." },
    },
  },
  {
    act = "Act 2",
    zone = "Deshar",
    images = { ["Deshar"] = M .. "A2-11-Deshar.png" },
    reward = "Permanent: +2 Weapon-Set passive points (Shambrin — 'Tradition's Toll')",
    goals = {
      { action = "goto", text = "With the sandstorm cleared, advance into [Deshar]" },
      { action = "collect", text = "Pick up the Final Letter from a Fallen Dekhara" },
      { action = "turnin", text = "Deliver the Final Letter to Shambrin at the caravan" },
      { action = "goto", text = "Find and enter the Path of Mourning" },
    },
    sr_note = "Backup Trial Barya drops from Deshar vultures if you skipped Balbala.",
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
      { action = "use", text = "Touch the Sisters of Garukhan shrine in [The Spires of Deshar]" },
      { action = "kill", text = "Kill Tor Gul, the Defiler", count = 1 },
      { action = "note", text = "Automatons ambush you after the shrine — the resistance is already granted." },
    },
    sr_note = "Fast detour that offsets an act's -10% res penalty — grab it even on a speed run.",
  },
  {
    act = "Act 2",
    zone = "The Dreadnought",
    images = { ["The Dreadnought"] = M .. "A2-16-Dreadnought.webp" },
    goals = {
      { action = "goal", text = "Chase the caravan across [The Dreadnought]" },
      { action = "kill", text = "Kill Jamanra, the Abomination (Act 2 boss)", count = 1 },
      { action = "note", text = "Two-phase fight; phase two adds the sandstorm. Cap resistances first." },
    },
  },

  -- ================================================= ACT 3 · The Jungle / Utzaal
  {
    act = "Act 3",
    zone = "Sandswept Marsh",
    images = { ["Sandswept Marsh"] = M .. "A3-01-Sandswept-Marsh.webp" },
    goals = {
      { action = "goto", text = "Cross the [Sandswept Marsh] to the Ziggurat Encampment (town)" },
      { action = "talk", text = "Talk to The Hooded One, Alva and Oswald; grab the waypoint" },
    },
    sr_note = "Beeline the exit; skip Rootdredge and the side loot.",
  },
  {
    act = "Act 3",
    zone = "Jungle Ruins",
    images = { ["Jungle Ruins"] = M .. "A3-02-Jungle-Ruins-2.webp" },
    reward = "Permanent: +2 passive skill points (Mighty Silverfist)",
    goals = {
      { action = "kill", text = "Kill Mighty Silverfist in the [Jungle Ruins]", count = 1 },
      { action = "use", text = "Activate the Runes of Aldur runestone (1 of 3)" },
      { action = "note", text = "You return here later with the Large Soul Core to open Matlan Waterways." },
    },
    ls_note = "Silverfist is easy and the +2 points are permanent — always kill him.",
  },
  {
    act = "Act 3",
    zone = "The Venom Crypts",
    optional = true,
    images = { ["The Venom Crypts"] = M .. "act3-the-venom-crypts.png" },
    reward = "Permanent (LOCKED choice): +25% Stun threshold / +30% Ailment threshold / +25% Mana regen",
    goals = {
      { action = "goto", text = "Detour into [The Venom Crypts]" },
      { action = "collect", text = "Loot the Venom Vial from the corpse", count = 1 },
      { action = "turnin", text = "Hand the Venom Vial to Servi in town to claim the reward" },
      { action = "note", text = "This choice is PERMANENT and cannot be changed — +25% Stun threshold is the common pick." },
    },
    sr_note = "Off the critical path — skippable for pure speed.",
  },
  {
    act = "Act 3",
    zone = "Infested Barrens",
    images = { ["Infested Barrens"] = M .. "A3-03-Infested-Barrens.webp" },
    goals = {
      { action = "goto", text = "Cross the [Infested Barrens] to Chimeral Wetlands" },
      { action = "talk", text = "Talk to Alva; grab the waypoint" },
    },
  },
  {
    act = "Act 3",
    zone = "Chimeral Wetlands",
    images = { ["Chimeral Wetlands"] = M .. "A3-04-Chimeral%20Wetlands.png" },
    goals = {
      { action = "kill", text = "Kill Xyclucian, the Chimera in the [Chimeral Wetlands]", count = 1 },
      { action = "get", text = "Pick up the Inscribed Ultimatum it drops" },
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
      { action = "kill", text = "Kill Blackjaw, the Remnant on the way to the Sanctum", count = 1 },
    },
    ls_note = "Blackjaw is optional but grants permanent +10% Fire Res — do not skip him.",
  },
  {
    act = "Act 3",
    zone = "Jiquani's Sanctum",
    images = { ["Jiquani's Sanctum"] = M .. "A3-06-Jinquanis-Sanctum.png" },
    goals = {
      { action = "collect", text = "Place Medium Soul Cores in the mechanism", count = 2 },
      { action = "kill", text = "Kill Zicoatl, Warden of the Core", count = 1 },
      { action = "get", text = "Take the Large Soul Core, then use it on the Jungle Ruins altar" },
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
      { action = "use", text = "Activate the third Runes of Aldur runestone in [Azak Bog]" },
      { action = "kill", text = "Kill Ignagduk, the Bog Witch", count = 1 },
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
      { action = "kill", text = "Kill the Queen of Filth in [The Apex of Filth]", count = 1 },
      { action = "get", text = "Take the Temple Door Idol (opens the Temple of Kopec)" },
    },
  },
  {
    act = "Act 3",
    zone = "Temple of Kopec",
    images = { ["Temple of Kopec"] = M .. "A3-10-Temple-of-Kopec.webp" },
    goals = {
      { action = "goto", text = "Climb the [Temple of Kopec] to the summit" },
      { action = "kill", text = "Kill Ketzuli, High Priest of the Sun", count = 1 },
      { action = "note", text = "Each floor is triangular — the far corner is a coin-flip for the stairs." },
    },
  },
  {
    act = "Act 3",
    zone = "Utzaal",
    images = { ["Utzaal"] = M .. "a3-utzaal.webp" },
    goals = {
      { action = "kill", text = "Kill Viper Napuatzi in [Utzaal]", count = 1 },
      { action = "collect", text = "Farm a Sacrificial Heart from the Vaal Goliaths (for Aggorat)", count = 1 },
      { action = "goto", text = "Take the side path to the Aggorat entrance" },
    },
  },
  {
    act = "Act 3",
    zone = "Aggorat",
    images = { ["Aggorat"] = M .. "A3-12-Aggorat.png" },
    reward = "Permanent: +2 passive skill points (blood sacrifice)",
    goals = {
      { action = "use", text = "Place the Sacrificial Heart on the Altar in [Aggorat] and stab it" },
      { action = "goto", text = "Proceed to The Black Chambers" },
    },
    ls_note = "The sacrifice grants a permanent +2 passive points — always perform it.",
  },
  {
    act = "Act 3",
    zone = "The Black Chambers",
    images = { ["The Black Chambers"] = M .. "A3-13-Black-Chambers.png" },
    goals = {
      { action = "kill", text = "Kill Doryani, Royal Thaumaturge in [The Black Chambers] (Act 3 boss)", count = 1 },
      { action = "note", text = "Three phases: caster, then Doryani's Triumph below 50%, then airborne." },
      { action = "note", text = "Defeating Doryani completes Act 3 — continue to Act 4." },
    },
  },

  -- ================================================= ACT 4 · Ngamakanui
  -- Hub: Kingsmarch. The four islands appear in RANDOMISED order; each yields a
  -- Torn Map Piece. Visit all four before Plunder's Point unlocks.
  {
    act = "Act 4",
    zone = "Kingsmarch",
    images = { ["Kingsmarch"] = M .. "act4-kingsmarch-town.png" },
    goals = {
      { action = "talk", text = "Talk to Makoru in [Kingsmarch] to sail to an island" },
      { action = "note", text = "Visit all four islands, collect 4 Torn Map Pieces, then return here." },
    },
  },
  {
    act = "Act 4",
    zone = "Whakapanu Island",
    optional = true,
    images = { ["Whakapanu Island"] = M .. "A4-06-Whakapanu_Island.webp" },
    goals = {
      { action = "goto", text = "Reach the Singing Caverns within [Whakapanu Island]" },
      { action = "collect", text = "Grab a Torn Map Piece (1 of 4)" },
      { action = "note", text = "Optional: kill the Great White One, give Shark Fin to Kaimana for a swappable defence bonus." },
    },
    sr_note = "Islands can be done in any order — grab the piece and boss, skip side chests.",
  },
  {
    act = "Act 4",
    zone = "Singing Caverns",
    images = { ["Singing Caverns"] = M .. "A4-07-Singing-Caverns.webp" },
    goals = {
      { action = "kill", text = "Clear the [Singing Caverns] boss, then return to Kingsmarch", count = 1 },
    },
  },
  {
    act = "Act 4",
    zone = "Shrike Island",
    optional = true,
    images = { ["Shrike Island"] = M .. "A4-05-Shrike%20Island.webp" },
    goals = {
      { action = "kill", text = "Kill Scourge of the Skies on [Shrike Island]", count = 1 },
      { action = "collect", text = "Grab a Torn Map Piece (1 of 4)" },
    },
    sr_note = "Only the boss + map piece are needed.",
  },
  {
    act = "Act 4",
    zone = "Abandoned Prison",
    optional = true,
    images = { ["Abandoned Prison"] = M .. "A4-08-abandoned-prison-1.webp" },
    reward = "Permanent (swappable): Goddess of Justice — +30% Mana OR +30% Life Flask recovery",
    goals = {
      { action = "kill", text = "Kill Forael in the Chapel of the [Abandoned Prison]", count = 1 },
      { action = "get", text = "Choose the Goddess of Justice bonus (swappable later)" },
      { action = "collect", text = "Grab a Torn Map Piece (1 of 4)" },
    },
  },
  {
    act = "Act 4",
    zone = "Solitary Confinement",
    optional = true,
    images = { ["Solitary Confinement"] = M .. "A4-09-Solitary-Confinement.webp" },
    goals = {
      { action = "kill", text = "Kill The Prisoner in [Solitary Confinement]", count = 1 },
      { action = "note", text = "Sub-area of the Abandoned Prison; drops a Weapon Piece." },
    },
    sr_note = "Optional detour — skippable on a speedrun.",
  },
  {
    act = "Act 4",
    zone = "Isle of Kin",
    optional = true,
    images = { ["Isle of Kin"] = M .. "A4-01-Isle_of_Kin.webp" },
    reward = "Permanent: +2 Weapon-Set passives (Blind Beast — Bile-Soaked Tome)",
    goals = {
      { action = "kill", text = "Kill Mimok the Enslaved in the Beast Pen of the [Isle of Kin]", count = 1 },
      { action = "collect", text = "Grab a Torn Map Piece (1 of 4)" },
      { action = "kill", text = "Kill The Blind Beast in the Primal Arena for the Bile-Soaked Tome", count = 1 },
    },
    ls_note = "Do the Blind Beast for the free +2 weapon-set passives.",
  },
  {
    act = "Act 4",
    zone = "Volcanic Warrens",
    images = { ["Volcanic Warrens"] = M .. "A4-02-Volcanic-Warrens.webp" },
    goals = {
      { action = "kill", text = "Kill Krutog, Lord of Kin in the [Volcanic Warrens]", count = 1 },
      { action = "note", text = "Fire-heavy zone — bring Fire Resistance. Introduces Matiki, who opens the Eye of Hinekora." },
      { action = "kill", text = "Optional: the Magma Twins — kill order sets the ring reward", count = 2, optional = true },
    },
  },
  {
    act = "Act 4",
    zone = "Eye of Hinekora",
    images = { ["Eye of Hinekora"] = M .. "A4-10-Eye%20of%20Hinekora.webp" },
    reward = "Permanent: +5% maximum Mana (Silent Hall)",
    goals = {
      { action = "use", text = "Free Matiki, then complete the three Tests in the [Eye of Hinekora]" },
      { action = "use", text = "Pay your Respects at the Silent Hall for +5% max Mana" },
      { action = "note", text = "Optional: a Level 12 Spirit Gem hides in a chest behind the waterfall." },
    },
  },
  {
    act = "Act 4",
    zone = "Halls of the Dead",
    images = { ["Halls of the Dead"] = M .. "A4-11-Halls-of-the-Dead.webp" },
    reward = "Permanent: 3 tattoos (attribute OR resistance each) + 2 passives (Trial of the Ancestors)",
    goals = {
      { action = "goal", text = "Complete the three locked trials in the [Halls of the Dead] (attribute OR resistance each)" },
      { action = "kill", text = "Kill Yama the White", count = 1 },
      { action = "talk", text = "Speak to Hinekora for +2 passive skill points" },
      { action = "note", text = "Each trial gives EITHER the attribute OR the resistance — choose deliberately." },
    },
  },
  {
    act = "Act 4",
    zone = "Kedge Bay",
    images = { ["Kedge Bay"] = M .. "A4-03-Kedge%20Bay.webp" },
    goals = {
      { action = "goto", text = "Follow the shoreline of [Kedge Bay] to Journey's End" },
      { action = "collect", text = "Grab a Torn Map Piece from the Smuggler's Stash" },
    },
    sr_note = "Skip the side chests; run straight through to Journey's End.",
  },
  {
    act = "Act 4",
    zone = "Journey's End",
    images = { ["Journey's End"] = M .. "A4-04-Journeys_End.webp" },
    reward = "Permanent: +2 passive skill points (Omniphobia, Fear Manifest)",
    goals = {
      { action = "kill", text = "Kill Captain Harlin in [Journey's End]", count = 1 },
      { action = "use", text = "Activate the totem to summon Omniphobia" },
      { action = "kill", text = "Kill Omniphobia, Fear Manifest for +2 passives", count = 1 },
      { action = "note", text = "Hand all 4 Torn Map Pieces to Makoru to unlock Plunder's Point (Ancient Runes)." },
    },
  },
  {
    act = "Act 4",
    zone = "Arastas",
    images = { ["Arastas"] = M .. "A4-12-Arastas.webp" },
    goals = {
      { action = "kill", text = "Kill Torvian, Hand of the Saviour in [Arastas]", count = 1 },
      { action = "note", text = "Defeating Torvian opens The Excavation." },
    },
  },
  {
    act = "Act 4",
    zone = "Excavation",
    images = { ["Excavation"] = M .. "A4-13-Excavation.webp" },
    goals = {
      { action = "kill", text = "Kill Benedictus at the Precursor Forge in [Excavation]", count = 1 },
    },
  },
  {
    act = "Act 4",
    zone = "Ngakanu",
    optional = true,
    images = { ["Ngakanu"] = M .. "A4-14-Ngakanu.webp" },
    goals = {
      { action = "goto", text = "Pass through [Ngakanu] toward the Heart of the Tribe" },
      { action = "note", text = "Optional: an Abyss and the Mad Butcher encounter." },
    },
    sr_note = "Optional Abyss / Mad Butcher content is skippable.",
  },
  {
    act = "Act 4",
    zone = "Heart of the Tribe",
    images = { ["Heart of the Tribe"] = M .. "A4-15-Heart-of-the-tribe.webp" },
    goals = {
      { action = "kill", text = "Kill Tavakai in the [Heart of the Tribe] (Act 4 boss)", count = 1 },
      { action = "talk", text = "Talk to the Hooded One to unlock the Interludes" },
    },
  },

  -- ================================================= INTERLUDE 1 · Curse of Holten
  {
    act = "Interlude 1",
    zone = "Blackwood",
    images = { ["Blackwood"] = M .. "interlude-blackwood.png" },
    reward = "Permanent: +2 passive skill points (Oswin, the Dread Warden — Wolvenhold)",
    goals = {
      { action = "goto", text = "Clear the Darkness and push through [Blackwood] toward Holten" },
      { action = "kill", text = "Kill Oswin, the Dread Warden at Wolvenhold for +2 passives", count = 1 },
    },
  },
  {
    act = "Interlude 1",
    zone = "Holten Estate",
    images = { ["Holten Estate"] = M .. "interlude-holten-estate.png" },
    goals = {
      { action = "kill", text = "Clear the [Holten Estate] manor bosses", count = 1 },
      { action = "note", text = "Completes the Curse of Holten interlude." },
    },
  },

  -- ================================================= INTERLUDE 2 · The Stolen Barya
  {
    act = "Interlude 2",
    zone = "Khari Crossing",
    images = { ["Khari Crossing"] = M .. "interlude-khari-crossing.png" },
    reward = "Permanent: +2 passives (Akthi & Anundr) + +5% maximum Life (Molten Shrine)",
    goals = {
      { action = "kill", text = "Kill Akthi and Anundr in [Khari Crossing] for +2 passives", count = 2 },
      { action = "use", text = "Take the Skullmaw Stairway to the Molten Shrine; use the Molten One's Gift for +5% max Life" },
      { action = "talk", text = "Talk to Risu afterward" },
    },
  },
  {
    act = "Interlude 2",
    zone = "Pools of Kathal",
    images = { ["Pools of Kathal"] = M .. "interlude-pools-of-kathal.png" },
    goals = {
      { action = "goto", text = "Cross the [Pools of Kathal] (a guaranteed Expedition spawns here)" },
      { action = "note", text = "Later zones lead to Elzarah, then Orbala's Pillar (swappable boon), then Azmadi to finish." },
    },
    sr_note = "The Qimah Reservoir side area is optional.",
  },

  -- ============================================= INTERLUDE 3 · Doryani's Contingency
  {
    act = "Interlude 3",
    zone = "Ashen Forest",
    images = { ["Ashen Forest"] = M .. "interlude-ashen-forest.png" },
    goals = {
      { action = "goto", text = "Traverse the [Ashen Forest] (no waypoint here) toward Kriar Village" },
      { action = "note", text = "Follow the roving wisps to find the way." },
    },
  },
  {
    act = "Interlude 3",
    zone = "Kriar Village",
    images = { ["Kriar Village"] = M .. "interlude-kriar-village.png" },
    reward = "Permanent: +40 maximum Spirit (Lythara, the Wayward Spear)",
    goals = {
      { action = "kill", text = "Kill Lythara, the Wayward Spear in [Kriar Village] for +40 Spirit", count = 1 },
    },
  },
  {
    act = "Interlude 3",
    zone = "Glacial Tarn",
    optional = true,
    images = { ["Glacial Tarn"] = M .. "interlude-glacial-tarn.png" },
    goals = {
      { action = "goto", text = "Cross the [Glacial Tarn] (contains an Expedition and a Vaal Beacon)" },
    },
    sr_note = "The Expedition here is optional.",
  },
  {
    act = "Interlude 3",
    zone = "Howling Caves",
    images = { ["Howling Caves"] = M .. "interlude-howling-caves.png" },
    reward = "Permanent: +2 passive skill points (The Abominable Yeti)",
    goals = {
      { action = "collect", text = "Obtain the Icy Tusks in the [Howling Caves]" },
      { action = "kill", text = "Kill The Abominable Yeti for +2 passives", count = 1 },
    },
  },
  {
    act = "Interlude 3",
    zone = "Kriar Peaks",
    images = { ["Kriar Peaks"] = M .. "interlude-kriar-peaks.png" },
    reward = "Permanent: one free Unique Item (Elder Madox — one-time choice)",
    goals = {
      { action = "talk", text = "Find Elder Madox in the [Kriar Peaks] and choose your free Unique" },
      { action = "kill", text = "Kill Rakkar, the Frozen Talon", count = 1 },
      { action = "note", text = "The Elder Madox unique cannot be re-picked — take the one that fits your build." },
    },
  },
  {
    act = "Interlude 3",
    zone = "Etched Ravine",
    images = { ["Etched Ravine"] = M .. "interlude-etched-ravine.png" },
    reward = "Permanent: +2 passive skill points (Zolin & Zelina, Cuachic Vault)",
    goals = {
      { action = "kill", text = "Kill Stormgore, the Guardian in the [Etched Ravine]", count = 1 },
      { action = "kill", text = "Kill Zolin & Zelina in the Cuachic Vault for +2 passives", count = 1 },
    },
  },
  {
    act = "Interlude 3",
    zone = "Kingsmarch",
    reward = "Permanent: +2 passive skill points (the Hooded One, all interludes done)",
    goals = {
      { action = "talk", text = "Return to the Hooded One in Kingsmarch for +2 passives" },
      { action = "goto", text = "The Atlas and endgame maps now unlock — the campaign is complete." },
    },
  },

}

-- Loaded as a plain script chunk (no module system), so publish onto the codex
-- namespace for the campaign plugin to read at guide-build time.
codex.campaign_route = { patch = "0.5", steps = STEPS }
