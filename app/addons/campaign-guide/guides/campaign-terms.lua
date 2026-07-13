-- codex.terms — entity database for the campaign guide: every [bracketed] name
-- maps to its kind (colour), image (hover portrait/icon), and flavour text, so a
-- mention anywhere gets the wiki-style coloured tooltip. Generated from poe2wiki.
-- Regenerate via scratchpad/build-terms.mjs. Images resolve from app/client/ui/.
codex.terms = codex.terms or {}
local T = codex.terms
local B  = "../../media/bosses/"
local TO = "../../media/towns/"
local I  = "../../media/items/"

T["Akthi, the Final Sting"] = { kind = "boss", img = B .. "akthi-the-final-sting.png" }
T["Anundr, the Sandworm"] = { kind = "boss", img = B .. "anundr-the-sandworm.png" }
T["Asinia's Memorial Key Piece"] = { kind = "item", img = I .. "asinias-memorial-key-piece.png", flavor = "The cruelty of the Eternals endures even in death." }
T["Asinia, the Praetor's Consort"] = { kind = "boss", img = B .. "asinia-the-praetor-s-consort.jpg" }
T["Azarian, the Forsaken Son"] = { kind = "boss", img = B .. "azarian-the-forsaken-son.jpg" }
T["Azmadi, the Faridun Prince"] = { kind = "boss", img = B .. "azmadi-the-faridun-prince.png" }
T["Balbala's Barya"] = { kind = "item", img = I .. "balbala-s-barya.png" }
T["Balbala, the Traitor"] = { kind = "boss", img = B .. "balbala-the-traitor.jpg" }
T["Beira of the Rotten Pack"] = { kind = "boss", img = B .. "beira-of-the-rotten-pack.jpg" }
T["Benedictus, First Herald of Utopia"] = { kind = "boss", img = B .. "benedictus-first-herald-of-utopia.jpg" }
T["Blackjaw, the Remnant"] = { kind = "boss", img = B .. "blackjaw-the-remnant.jpg" }
T["Bloated Miller"] = { kind = "boss", img = B .. "bloated-miller.jpg" }
T["Candlemass, the Living Rite"] = { kind = "boss", img = B .. "candlemass-the-living-rite.jpg" }
T["Captain Hartlin"] = { kind = "boss", img = B .. "captain-hartlin.jpg" }
T["Chapel Key"] = { kind = "item", img = I .. "chapel-key.png" }
T["Clearfell Encampment"] = { kind = "town", img = TO .. "clearfell-encampment.png", flavor = "Clearfell Encampment is the town for Act 1 and is connected to The Riverbank and Clearfell, and allows access to The Vastiri Outskirts of Act 2 after slaying Count Geonor and speaking with The Hooded One." }
T["Corpse-snake Venom"] = { kind = "item", img = I .. "corpse-snake-venom.png" }
T["Count Geonor"] = { kind = "boss", img = B .. "count-geonor.png" }
T["Diamora, Song of Death"] = { kind = "boss", img = B .. "diamora-song-of-death.jpg" }
T["Djinn Barya"] = { kind = "item", img = I .. "djinn-barya.png" }
T["Doryani, Royal Thaumaturge"] = { kind = "boss", img = B .. "doryani-royal-thaumaturge.jpg" }
T["Draven's Memorial Key Piece"] = { kind = "item", img = I .. "dravens-memorial-key-piece.png", flavor = "So that the Praetor shall never be forgotten." }
T["Draven, the Eternal Praetor"] = { kind = "boss", img = B .. "draven-the-eternal-praetor.jpg" }
T["Ekbab, Ancient Steed"] = { kind = "boss", img = B .. "ekbab-ancient-steed.jpg" }
T["Elzarah, the Cobra Lord"] = { kind = "boss", img = B .. "elzarah-the-cobra-lord.png" }
T["Final Letter"] = { kind = "item", img = I .. "final-letter.png" }
T["Great White One"] = { kind = "boss", img = B .. "great-white-one.jpg" }
T["Heldra of the Black Pyre"] = { kind = "boss", img = B .. "heldra-of-the-black-pyre.png" }
T["Icy Tusks"] = { kind = "item", img = I .. "icy-tusks.png" }
T["Ignagduk's Ghastly Spear"] = { kind = "item", img = I .. "ignagduk-s-ghastly-spear.png" }
T["Ignagduk, the Bog Witch"] = { kind = "boss", img = B .. "ignagduk-the-bog-witch.jpg" }
T["Iktab, the Deathlord"] = { kind = "boss", img = B .. "iktab-the-deathlord.jpg" }
T["Isolde of the White Shroud"] = { kind = "boss", img = B .. "isolde-of-the-white-shroud.png" }
T["Jamanra, the Abomination"] = { kind = "boss", img = B .. "jamanra-the-abomination.png" }
T["Jamanra, the Risen King"] = { kind = "boss", img = B .. "jamanra-the-risen-king.jpg" }
T["Kabala Clan Relic"] = { kind = "item", img = I .. "kabala-clan-relic.png" }
T["Kabala, Constrictor Queen"] = { kind = "boss", img = B .. "kabala-constrictor-queen.jpg" }
T["Ketzuli, High Priest of the Sun"] = { kind = "boss", img = B .. "ketzuli-high-priest-of-the-sun.jpg" }
T["Kingsmarch"] = { kind = "town", img = TO .. "kingsmarch.png", flavor = "Kingsmarch is the town for Act 4. A port established by Kalguurans on the shore of Wraeclast." }
T["Krutog, Lord of Kin"] = { kind = "boss", img = B .. "krutog-lord-of-kin.jpg" }
T["Lachlann of Endless Lament"] = { kind = "boss", img = B .. "lachlann-of-endless-lament.jpg" }
T["Lady Elswyth"] = { kind = "boss", img = B .. "lady-elswyth.png" }
T["Large Soul Core"] = { kind = "item", img = I .. "large-soul-core.png" }
T["Lythara, the Wayward Spear"] = { kind = "boss", img = B .. "lythara-the-wayward-spear.png" }
T["Mastodon Tusks"] = { kind = "item", img = I .. "mastodon-tusks.png" }
T["Medium Soul Core"] = { kind = "item", img = I .. "medium-soul-core.png" }
T["Mighty Silverfist"] = { kind = "boss", img = B .. "mighty-silverfist.jpg" }
T["Oswin, the Dread Warden"] = { kind = "boss", img = B .. "oswin-the-dread-warden.png" }
T["Queen of Filth"] = { kind = "boss", img = B .. "queen-of-filth.jpg" }
T["Rakkar, the Frozen Talon"] = { kind = "boss", img = B .. "rakkar-the-frozen-talon.png" }
T["Rathbreaker"] = { kind = "boss", img = B .. "rathbreaker.jpg" }
T["Rootdredge"] = { kind = "boss", img = B .. "rootdredge.jpg" }
T["Rudja, the Dread Engineer"] = { kind = "boss", img = B .. "rudja-the-dread-engineer.jpg" }
T["Runed Girdle"] = { kind = "item", img = I .. "runed-girdle.png", flavor = "The rune on the buckle means 'unity' or 'safety from harm.'" }
T["Runed Guard"] = { kind = "item", img = I .. "runed-guard.png", flavor = "The rune at the base of the blade means 'to strike true' or 'truth.'" }
T["Runed Skull Cap"] = { kind = "item", img = I .. "runed-skull-cap.png", flavor = "The rune emblazoned on the crest means 'freedom' or 'for a worthy cause.'" }
T["Runed Spikes"] = { kind = "item", img = I .. "runed-spikes.png", flavor = "Together, the runes are an oath of peaceful passage and a request for freedom in pursuit of an important cause." }
T["Sacrificial Dagger"] = { kind = "item", img = I .. "sacrificial-dagger.png" }
T["Sacrificial Heart"] = { kind = "item", img = I .. "sacrificial-heart.png" }
T["Scourge of the Skies"] = { kind = "boss", img = B .. "scourge-of-the-skies.jpg" }
T["Shark Fin"] = { kind = "item", img = I .. "shark-fin.png" }
T["Silver Coin"] = { kind = "item", img = I .. "silver-coin.png" }
T["Small Soul Core"] = { kind = "item", img = I .. "small-soul-core.png" }
T["Smithing Tools"] = { kind = "item", img = I .. "smithing-tools.png", flavor = "Forgework tools belonging to Renly and his son." }
T["Stormgore, the Guardian"] = { kind = "boss", img = B .. "stormgore-the-guardian.png" }
T["Sun Clan Relic"] = { kind = "item", img = I .. "sun-clan-relic.png" }
T["Tattoo of Hinekora"] = { kind = "item", img = I .. "tattoo-of-hinekora.png" }
T["Tavakai"] = { kind = "boss", img = B .. "tavakai.jpg" }
T["Temple Door Idol"] = { kind = "item", img = I .. "temple-door-idol.png" }
T["Thane Wulfric"] = { kind = "boss", img = B .. "thane-wulfric.png" }
T["The Abominable Yeti"] = { kind = "boss", img = B .. "the-abominable-yeti.png" }
T["The Ardura Caravan"] = { kind = "town", img = TO .. "the-ardura-caravan.png", flavor = "The Ardura Caravan is the town for Act 2 and allows movement to several areas within the Vastiri Desert." }
T["The Blind Beast"] = { kind = "boss", img = B .. "the-blind-beast.jpg" }
T["The Crowbell"] = { kind = "boss", img = B .. "the-crowbell.jpg" }
T["The Devourer"] = { kind = "boss", img = B .. "the-devourer.jpg" }
T["The Essence of Water"] = { kind = "item", img = I .. "the-essence-of-water.png" }
T["The Executioner"] = { kind = "boss", img = B .. "the-executioner.jpg" }
T["The Flame Ruby"] = { kind = "item", img = I .. "the-flame-ruby.png" }
T["The Hammer of Kamasa"] = { kind = "item", img = I .. "the-hammer-of-kamasa.png" }
T["The Horn of the Vastiri"] = { kind = "item", img = I .. "the-horn-of-the-vastiri.png" }
T["The Khari Bazaar"] = { kind = "town", img = TO .. "the-khari-bazaar.png" }
T["The Prisoner"] = { kind = "boss", img = B .. "the-prisoner.jpg" }
T["The Refuge"] = { kind = "town", img = TO .. "the-refuge.png" }
T["The Rotten Druid"] = { kind = "boss", img = B .. "the-rotten-druid.jpg" }
T["The Rust King"] = { kind = "boss", img = B .. "the-rust-king.jpg" }
T["The Ziggurat Refuge"] = { kind = "town", img = TO .. "the-ziggurat-refuge.png", flavor = "The Ziggurat Refuge is the current town for Endgame. It acts as the hub for the player to begin exploring the Atlas." }
T["Tor Gul, the Defiler"] = { kind = "boss", img = B .. "tor-gul-the-defiler.jpg" }
T["Torvian, Hand of the Saviour"] = { kind = "boss", img = B .. "torvian-hand-of-the-saviour.jpg" }
T["Una's Lute"] = { kind = "item", img = I .. "unas-lute.png", flavor = "This grelwood heirloom hums softly with latent emotion, imbued by centuries of songs passed from mother to daughter." }
T["Verisium Spikes"] = { kind = "item", img = I .. "verisium-spikes.png" }
T["Viper Napuatzi"] = { kind = "boss", img = B .. "viper-napuatzi.jpg" }
T["Vornas, the Fell Flame"] = { kind = "boss", img = B .. "vornas-the-fell-flame.png" }
T["Xyclucian, the Chimera"] = { kind = "boss", img = B .. "xyclucian-the-chimera.jpg" }
T["Yama the White"] = { kind = "boss", img = B .. "yama-the-white.jpg" }
T["Zalmarath, the Colossus"] = { kind = "boss", img = B .. "zalmarath-the-colossus.jpg", flavor = "Zalmarath, the Colossus is a unique monster located in the Titan Grotto at the Dais of Reckoning." }
T["Zelina, Blood Priestess"] = { kind = "boss", img = B .. "zelina-blood-priestess.png" }
T["Zicoatl, Warden of the Core"] = { kind = "boss", img = B .. "zicoatl-warden-of-the-core.jpg", flavor = "Zicoatl, Warden of the Core is a unique monster located in Jiquani's Sanctum at a site named Grand Soul Core Nexus." }
T["Ziggurat Encampment"] = { kind = "town", img = TO .. "ziggurat-encampment.png", flavor = "Ziggurat Encampment is the town for Act 3." }
T["Zolin, Blood Priest"] = { kind = "boss", img = B .. "zolin-blood-priest.png" }
