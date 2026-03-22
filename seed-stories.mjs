/**
 * VoyageVerse Story Seeder
 * Usage: node seed-stories.mjs [count]
 * Example: node seed-stories.mjs 10
 * 
 * Adds N realistic travel stories to the database using your account.
 * Images are auto-fetched from Pexels. Coordinates from OpenStreetMap.
 */

import mongoose from "mongoose";

// ─── Config ────────────────────────────────────────────────────────────────
const MONGO_URI = "mongodb://ankurram2002:ankurram2002@ac-ki2r2zw-shard-00-00.exnkjri.mongodb.net:27017,ac-ki2r2zw-shard-00-01.exnkjri.mongodb.net:27017,ac-ki2r2zw-shard-00-02.exnkjri.mongodb.net:27017/blogAppNext?replicaSet=atlas-lixxbm-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
const PEXELS_API_KEY = "W8hPY2vWxyv7e79LBTPyll1KoOdQwNrxpRfvR7o9ojQf2NaYZoimZ1C2";
const USER_EMAIL = "ankurram2002@gmail.com"; // your account email

const COUNT = parseInt(process.argv[2]) || 5;

// ─── Story Templates (Location, Title, Desc) ──────────────────────────────
const storyTemplates = [
  {
    location: "Santorini, Greece",
    title: "Sunsets & Cycladic Dreams in Santorini",
    desc: "The caldera of Santorini greeted me with an amber blaze as the sun dipped below the horizon, painting the whitewashed cliffside villages in hues of gold and rose. Every narrow cobblestone lane winds toward a breath-taking view, past bougainvillea-draped doorways and the iconic blue-domed churches that have become synonymous with the Greek islands. I sipped on local Assyrtiko wine at a clifftop restaurant while the Aegean shimmered below — a moment of pure, unhurried magic. Oia's sunset is not just an event; it is a ceremony, with crowds gathered in reverent silence before erupting into applause as the last sliver of sun vanished. Cave houses carved into volcanic rock became my home for a week, and I realised that Santorini's beauty lies not just in its postcard views, but in its timeless pace of life. The fragrance of grilled octopus and fresh lemon drifted through the air of Amoudi Bay, where I spent afternoons watching local fishermen mend their nets against a backdrop of rusted cliffs and turquoise water.",
  },
  {
    location: "Patagonia, Argentina",
    title: "Into the Wild: Trekking Patagonia's Torres del Paine",
    desc: "At the southern tip of the world, where the Andes dissolve into wind-swept plains and glacial fjords, Patagonia exists in defiant, raw splendour. I began the famous W Trek before dawn, my breath visible in the frigid air as I hiked toward the granite spires of Torres del Paine. The towers emerged from the clouds like ancient sentinels — a sight so dramatic it felt unreal. Days were spent crossing suspension bridges above turquoise rivers, camping beside the thundering Grey Glacier, and navigating howling Patagonian winds that could knock you sideways mid-step. Condors circled effortlessly overhead. Guanacos grazed on the edge of cliffs with casual indifference. This is nature at its most indifferent and most magnificent — reminding you how small you are, and how beautiful that smallness can feel. The sheer scale of the Southern Patagonian Ice Field, stretching toward an unknown horizon, left me in a state of perpetual awe, a silence only broken by the occasional roar of ancient ice calving into the lakes below.",
  },
  {
    location: "Kyoto, Japan",
    title: "Temple Bells and Matcha Dreams in Ancient Kyoto",
    desc: "Cherry blossoms drifted like pink snow over the stone paths of Maruyama Park as I wandered through Kyoto in the height of hanami season. The former imperial capital holds its history with quiet dignity — every shrine, every moss-covered garden, every wooden machiya townhouse tells a story that stretches back centuries. I woke before sunrise to catch the bamboo grove of Arashiyama in solitude, the towering stalks swaying and whispering in the cool morning breeze. The streets of Gion revealed geisha hurrying between appointments, their wooden sandals clicking rhythmically on the cobblestones. At Fushimi Inari, I climbed thousands of vermillion torii gates into the forested hillside, leaving the crowds behind until I stood alone in an amber tunnel of light. Kyoto does not simply show you Japan — it lets you feel it. In the quiet halls of Nanzen-ji, I practiced zazen meditation, the sound of a distant temple bell acting as an anchor in a world that otherwise felt delightfully suspended in time.",
  },
  {
    location: "Marrakech, Morocco",
    title: "Labyrinthine Medinas and Spice-Laden Air in Marrakech",
    desc: "The moment I stepped through the gates of the Marrakech medina, every sense was instantly overwhelmed in the most extraordinary way. Centuries-old riads with hidden courtyards lay behind plain mud-brick walls, their tiles a riot of geometric colour and craftsmanship. The souks were a sensory labyrinth — towers of saffron and cumin, the hammering of copper, the rich smell of tanned leather from the famous dyeing pits. I navigated the chaos of Djemaa el-Fna as it transformed from a daytime market to a nocturnal carnival of storytellers, musicians, and food stalls. Mint tea was poured from impossible heights, sweet and piping hot, and tagines arrived fragrant with preserved lemon and olives. Getting intentionally lost in these streets is not a misfortune; it is the whole point. As the call to prayer echoed from the Koutoubia Mosque, the city seemed to hold its breath, a brief moment of spiritual clarity amidst the eternal hustle of the red city.",
  },
  {
    location: "Queenstown, New Zealand",
    title: "Adrenaline and Serenity in New Zealand's Adventure Capital",
    desc: "Queenstown sits impossibly gorgeous on the shores of Lake Wakatipu, ringed by the jagged Remarkables mountain range that turns amber at golden hour. I arrived for the adventure and stayed for the views. Bungy jumping off the historic Kawarau Bridge, the birthplace of commercial bungy, was terrifying — and euphoric. The Shotover Canyon jet boat whipped through gorges at stomach-dropping speed. But Queenstown surprised me with its capacity for quiet: a sunrise hike up Ben Lomond revealed an ocean of cloud below the peaks, while a solitary kayak on the lake in the late afternoon offered the kind of stillness that rearranges your insides. The craft beer scene is exceptional, the food world-class, and the people infused with the easy confidence of those who live somewhere genuinely extraordinary. Whether white-water rafting through glacial rapids or sipping a Central Otago Pinot Noir by a roaring fireplace, every moment here felt like a pulse-pounding celebration of the natural world.",
  },
  {
    location: "Tokyo, Japan",
    title: "Neon Shadows and Hidden Shrines: A Tokyo Odyssey",
    desc: "Tokyo is a city that never stops vibrating, a neon-lit dreamscape where the 22nd century lives side-by-side with the Edo period. I watched the famous Shibuya crossing from above, a coordinated dance of thousands of souls that somehow never collide, before diving into the subterranean world of Shinjuku's Golden Gai. There, in bars no larger than a walk-in closet, I shared whiskey and stories with locals under the warm glow of paper lanterns. But the true magic of Tokyo lies in its silence. Tucked between skyscrapers, I found tiny Inari shrines guarded by stone foxes, where the smell of incense provided a peaceful counterpoint to the hum of the city. Waking up at 4 AM to witness the tuna auction at Toyosu, followed by the freshest sushi of my life, was a sensory awakening. From the high-fashion boutiques of Ginza to the retro-gaming dens of Akihabara, Tokyo is a kaleidoscope of human ambition and quiet tradition, a city that requires multiple lifetimes to truly understand.",
  },
  {
    location: "Paris, France",
    title: "Haussmann Facades and Midnight Walks Along the Seine",
    desc: "To walk through Paris is to walk through a living museum of art and romance. I spent my mornings in the Latin Quarter, disappearing into the dusty stacks of Shakespeare and Company before crossing the bridge to watch the light change on the buttresses of Notre Dame. The city's legendary cafe culture is not just a pastime; it's a philosophy. I mastered the art of people-watching at Les Deux Magots, armed with a café au lait and a crusty baguette. As twilight fell, I found myself atop Montmartre, the Sacré-Cœur glowing white against a purple sky, while street artists captured the likenesses of tourists under flickering streetlamps. The Louvre's glass pyramid reflected the moon, and the Eiffel Tower burst into its hourly sparkle, a reminder that some clichés are classics for a reason. Paris doesn't just invite you to visit; it demands that you fall in love with the world all over again, one patisserie and one riverside stroll at a time.",
  },
  {
    location: "New York City, USA",
    title: "The Concrete Jungle: Chasing Dreams in Manhattan",
    desc: "New York City is an electric surge of ambition, a place where the air itself feels charged with possibility. I started my day in Central Park, where the autumn leaves turned the Reservoir into a mirror of gold and crimson, providing a temporary sanctuary from the surrounding canyons of steel. Crossing the Brooklyn Bridge at sunset, the Manhattan skyline rose up like a jagged crown of glass and light, a sight so iconic it felt like stepping into a movie. The city's neighbourhoods are distinct universes: the jazz-soaked basements of Greenwich Village, the dim-sum-laden streets of Chinatown, and the towering glass monoliths of Hudson Yards. I found beauty in the mundane — the steam rising from subway grates, the rhythmic clatter of the elevated train in Queens, and the late-night glow of a corner bodega. NYC is loud, relentless, and occasionally overwhelming, but it offers a sense of belonging to something much larger than oneself, a heartbeat that is impossible to ignore.",
  },
  {
    location: "Sydney, Australia",
    title: "Salt Water and Harbour Lights: The Sydney Spirit",
    desc: "Sydney is defined by its relationship with the Pacific, a city that breathes in the sea air and exhales a laid-back, sun-drenched energy. I took the ferry from Circular Quay to Manly at sunset, watching the Sydney Opera House's sails glow like pearls against the darkening harbour. The Bondi to Coogee coastal walk was a masterclass in natural beauty, with limestone cliffs carved by millennia of turquoise swells and hidden rock pools where locals cooled off in the midday heat. In the historic Rocks district, I found cobblestone lanes and pubs that whispered of the city's convict past, while the nearby Darling Harbour vibrated with the sound of luxury yachts and outdoor dining. Surfing at Maroubra, I felt the raw power of the ocean, a reminder of Australia's wild heart. Sydney is a city that perfectly balances the sophistication of a world-class metropolis with the rugged, adventurous spirit of the outback, all tied together by a golden thread of endless sunshine.",
  },
  {
    location: "Cairo, Egypt",
    title: "Sandstone Secrets and the Eternal Nile in Cairo",
    desc: "Cairo is a city of layers, where the weight of five millennia of history presses down on the vibrant, chaotic pulse of the modern world. Standing at the base of the Great Pyramid of Giza, the last of the ancient wonders, I felt a sense of vertigo — not from height, but from time. The sheer scale of the limestone blocks, hauled across the desert before the invention of the wheel, is a testament to human will that defies modern logic. In the Khan el-Khalili bazaar, I bartered for copper lamps and hand-woven rugs while the air was thick with the scent of rosewater and roasting coffee. A sunset felucca ride on the Nile offered a moment of profound peace, the ancient river reflecting the golden city as it has since the time of the pharaohs. The Egyptian Museum revealed the golden mask of Tutankhamun, its gaze fixed on eternity, while the Coptic and Islamic quarters offered a glimpse into the diverse spiritual heritage that defines this North African giant.",
  },
  {
    location: "Swiss Alps, Switzerland",
    title: "Glacial Silence and Alpine Peaks in the Heart of Europe",
    desc: "The Swiss Alps are a cathedral of rock and ice, a landscape of such staggering verticality that it seems to touch the heavens. I stayed in the car-free village of Zermatt, where the Matterhorn stands like an obsidian tooth, dominating the skyline with its lonely, iconic silhouette. Hiking through wildflower-strewn meadows to the Riffelsee, I watched the mountain's reflection shimmer in the mirror-still water, disturbed only by the occasional alpine marmot. The Glacier Express provided a cinematic journey across deep gorges and through spiral tunnels, revealing a world of frozen waterfalls and traditional wooden chalets buried in deep snow. I spent an afternoon in a mountain hut, warming my hands over a bowl of cheese fondue while a blizzard raged outside, the kind of cozy isolation that only the high mountains can provide. Switzerland is a place where precision meets the primordial, where the sound of cowbells is the only clock you ever need.",
  },
  {
    location: "Rio de Janeiro, Brazil",
    title: "Samba, Sunsets, and the Soul of Rio",
    desc: "Rio de Janeiro is a city trapped between a lush jungle and a shimmering sea, a place of extraordinary contrasts and infectious joy. Standing beneath the outstretched arms of Christ the Redeemer on Corcovado Mountain, I saw the city laid out like a green and gold tapestry, with the Sugarloaf Mountain rising from Guanabara Bay like a volcanic sentinel. Copacabana and Ipanema beaches are more than just sand; they are the city's living rooms, where football matches, samba rhythms, and chilled coconut water Create a perpetual celebration of life. In the bohemian neighbourhood of Santa Teresa, I wandered through colonial mansions and artist studios, riding the yellow 'bonde' tram over the Lapa Arches. As the sun set behind the Two Brothers peaks, the city's favelas lit up like a million stars, and the sound of batucada drums began to echo from the hills. Rio is a city of rhythm, where the heat of the sun is matched by the warmth of its people and the irrepressible spirit of Carnival.",
  },
  {
    location: "Barcelona, Spain",
    title: "Gaudí's Dreams and Gothic Shadows in Barcelona",
    desc: "Barcelona is a city where architectural madness meets Mediterranean grace. I began my journey at the Sagrada Família, Gaudí's unfinished forest of stone, where the filtered light turned the nave into a kaleidoscope of orange and blue. Every serpentine curve of Park Güell and every mosaic-tiled chimney of Casa Batlló felt like a rebellion against the straight lines of the modern world. In the Gothic Quarter, I sheltered from the midday sun in narrow alleys that felt unchanged since the Middle Ages, finding hidden plazas where the only sound was the splash of a fountain. La Boqueria market was a sensory explosion of jamón ibérico, salted cod, and vibrant produce, a testament to Catalonia's obsession with food. As night fell, I joined the crowds on Las Ramblas, watching street performers and sipping sangria, before heading to a basement tablao for a flamenca performance that left the air vibrating with passion and sorrow.",
  },
  {
    location: "Prague, Czech Republic",
    title: "The City of a Hundred Spires: Prague's Gothic Heart",
    desc: "Prague is a fairy tale written in stone, a city of narrow passages and baroque facades that feels like it belongs to another century. I crossed the Charles Bridge early in the morning, the statues of saints emerging from the river mist like ghostly guardians, while the Vltava river flowed silently below. The Prague Castle complex, a sprawling labyrinth of palaces and cathedrals, offered a view of the city's red-tiled roofs that stretched to the horizon. In the Old Town Square, I watched the Astronomical Clock strike the hour, a mechanical marvel that has kept time since 1410. The city's beer halls are legendary, offering dark lagers and hearty goulash in vaulted basements that once served as medieval dungeons. Winding through the Jewish Quarter, I felt the weight of history in the ancient stones of the Old-New Synagogue. Prague is a city of secrets, where every cobblestone has a story and every golden tower holds a piece of Europe's complex, beautiful soul.",
  },
  {
    location: "Petra, Jordan",
    title: "The Rose-Red City: Walking Through Petra's Siq",
    desc: "The journey into Petra begins through the Siq, a narrow canyon of vertical rock walls that filter the sunlight into a crimson glow. For over a kilometre, I walked beneath the towering cliffs, feeling smaller with every step, until the canyon finally opened to reveal the Treasury — a massive facade carved directly into the honey-coloured sandstone with impossible precision. This was the capital of the Nabataean Empire, a desert crossroads that once controlled the spice trade of the ancient world. I climbed the 800 steps to the Monastery, a colossal temple perched high above the valley, where the view stretched across the Araba Desert into Israel. At night, the plaza before the Treasury was lit by thousands of candles, the scent of frankincense and the sound of traditional Bedouin pipes creating an atmosphere of profound, ancient mystery. Petra is not just a ruin; it is a testament to human adaptability and the enduring power of art in the harshest of environments.",
  },
  {
    location: "Cape Town, South Africa",
    title: "Table Mountain Majesty and the Cape of Good Hope",
    desc: "Cape Town is a city of spectacular geographical drama, where the Atlantic and Indian Oceans battle for supremacy beneath the gaze of the iconic Table Mountain. I took the cable car to the summit during a 'tablecloth' of white cloud, witnessing the city and the Cape Peninsula unfold in a panoramic display of green mountains and white sand. Driving along Chapman's Peak, the road carved into the cliffside offered some of the most vertigo-inducing and beautiful views on Earth. At Boulders Beach, I shared the sand with a colony of African penguins, their tuxedoed antics providing a charming counterpoint to the rugged coastline. The Bo-Kaap neighbourhood, with its brightly painted houses and Cape Malay culture, offered a vibrant history lesson, while the District Six Museum provided a sobering reminder of the country's turbulent past. Exploring the Kirstenbosch Botanical Gardens, I felt the unique biodiversity of the Cape Floral Kingdom, a world where the flora is as diverse and resilient as the people who call this southern tip of Africa home.",
  },
  {
    location: "Amsterdam, Netherlands",
    title: "Canal Rings and Golden Age Dreams in Amsterdam",
    desc: "Amsterdam is a city of water and light, a masterclass in urban design where the 17th-century canal ring creates a sense of intimacy and order. I spent my mornings cycling past gabled houses that lean over the water like old friends, crossing hundreds of stone bridges draped in flower-filled bicycles. The Rijksmuseum revealed the sweeping shadows of Rembrandt's Night Watch, while the Van Gogh Museum offered a vibrant, swirling journey through the mind of a misunderstood genius. In the Jordaan neighbourhood, I found quirky boutiques and hidden 'hofjes' (courtyards) that provided a peaceful escape from the main thoroughfares. A candlelight canal cruise at night, with the historic bridges illuminated and reflecting in the dark water, was pure cinematic magic. Amsterdam's history as a global trading hub is evident in its diverse food scene and its stubbornly liberal spirit, a city that manages to be both a historic treasure and a cutting-edge laboratory for future living.",
  },
  {
    location: "Siem Reap, Cambodia",
    title: "Stone Faces and Jungle Ruins in Angkor Wat",
    desc: "The sunrise over Angkor Wat is one of those moments that redefines your sense of wonder. As the sky turned from deep indigo to burning orange behind the iconic five towers, the massive sandstone temple emerged from the Cambodian jungle like a vision from a lost civilisation. But Angkor is more than just one temple; it is a sprawling city of gods. At Bayon, I stood beneath the enigmatic stone smiles of hundreds of giant faces, while at Ta Prohm, I watched as the roots of massive silk-cotton trees strangled the ancient stonework in a slow-motion battle between nature and architecture. The detailed bas-reliefs of the Terrace of the Elephants and the intricate carvings of Banteay Srei revealed the incredible craftsmanship of the Khmer Empire. In the nearby Tonlé Sap lake, I visited floating villages where life is dictated by the pulse of the monsoon, a reminder of the enduring resilience of the Cambodian people and the sacred relationship between their culture and the land.",
  },
  {
    location: "Vancouver, Canada",
    title: "Pacific Peaks and Glass Skyscrapers: The Vancouver Vibe",
    desc: "Vancouver is a city that doesn't make you choose between the mountains and the sea; it gives you both in a single, spectacular embrace. I spent my morning cycling the Stanley Park Seawall, with the temperate rainforest on one side and the shimmering Pacific on the other, before heading to Granville Island to sample smoked salmon and local cheeses. The city's skyline, dominated by glass towers that reflect the changing light of the North Shore mountains, is a testament to its modern, multicultural identity. A quick ferry to North Vancouver led to the Capilano Suspension Bridge, where I walked 70 metres above the rushing Capilano River, feeling the sway of the bridge and the damp breath of the canyon. In Gastown, the Victorian architecture and the steam clock provided a link to the city's pioneer past, while the vibrant Asian community in Richmond offered some of the best culinary experiences in North America. Vancouver is a city of fresh air and big ideas, where the wilderness is never more than a short bike ride away.",
  },
  {
    location: "Edinburgh, Scotland",
    title: "Cobblestone Secrets and Scottish Spirits in Edinburgh",
    desc: "Edinburgh is a city of shadows and stone, built upon an extinct volcano and steeped in a history that is by turns bloody, intellectual, and magical. I walked the Royal Mile from the heights of Edinburgh Castle, where the Honours of Scotland are guarded behind thick walls, down to the Palace of Holyroodhouse, the Queen's official residence in Scotland. The city's 'Old Town' is a labyrinth of dark 'closes' and steep wynds, while the 'New Town' offers the neoclassical elegance of the Scottish Enlightenment. Climbing Arthur's Seat at sunset, I watched the city's Gothic spires and Georgian terraces glow against the Firth of Forth, a view that has inspired poets and writers for centuries. In the Greyfriars Kirkyard, I felt the chilling weight of the city's ghostly legends, while the warm glow of a whisky bar provided the perfect antidote with a dram of peaty single malt. Edinburgh is a city that wears its heart on its sleeve and its history in its bones, a place where every festival and every storm feels like a momentous event.",
  },
  {
    location: "Venice, Italy",
    title: "Gondolas and Ghostly Palazzos: A Venice Serenade",
    desc: "Venice is a city that shouldn't exist, a marble dream floating on a salt-clogged lagoon. I spent my days getting lost in the Castello district, where the sound of lapping water against green-slicked stone is the only soundtrack. Crossing the Rialto Bridge at dawn, I watched the market barges deliver fresh produce to a city with no roads, a testament to the enduring ingenuity of the Venetian people. A private gondola ride through the narrowest 'calli' revealed hidden gardens and crumbling palazzos that whispered of the city's maritime glory. In St. Mark's Basilica, the golden mosaics seemed to glow with an inner light, reflecting the wealth and piety of a lost empire. Exploring the glass-blowing workshops of Murano and the lace-makers of Burano, I felt the unique artistic heritage that defines this fragile, beautiful archipelago. Venice is a city of echoes and light, a place where the past is always present and the sea is both a protector and a threat.",
  },
  {
    location: "Dubai, UAE",
    title: "Sand Dunes and Sky-High Dreams in Dubai",
    desc: "Dubai is a city built on the sheer force of will, a vertical oasis where the desert meets the future. I stood on the 148th floor of the Burj Khalifa, the world's tallest building, watching the shadow of the needle-like tower stretch across the Persian Gulf like a sundial for the 21st century. The city's contrast is its greatest strength: from the ultra-modern Mall of the Emirates, where I skied on real snow in the middle of a desert, to the historic Al Fahidi district, where wind towers still cool the narrow lanes of the old city. A desert safari at sunset provided a glimpse into the Bedouin soul, with falconry displays and traditional dances under a canopy of stars. Crossing the Dubai Creek in a wooden 'abra' for a single dirham, I felt the heartbeat of the original trading port, while the nearby Palm Jumeirah offered a glimpse into a life of unimaginable luxury. Dubai is a city that refuses to be limited by geography or history, a place where the only constant is change.",
  },
  {
    location: "Seoul, South Korea",
    title: "Palaces and Pop Culture: The Seoul Pulse",
    desc: "Seoul is a city that pulses with a restless, creative energy, a place where the ultra-fast pace of digital life is tempered by the quiet grace of Confucian tradition. I watched the changing of the guard at Gyeongbokgung Palace, the bright silks of the guards' uniforms a vivid contrast against the grey granite of the city's skyscrapers. In the narrow alleys of Bukchon Hanok Village, I found centuries-old traditional houses where tea ceremonies are still performed with meditative precision. But Seoul is also the world's temple of technology and pop culture. In Myeongdong, the air is thick with the scent of street food and the sound of K-pop, while the neon-lit streets of Hongdae crawl with artists and students until the sun comes up. Waking up in a temple stay at Jogyesa, followed by a hike up Bukhansan Mountain, I felt the spiritual and physical resilience that defines the Korean spirit. Seoul is a city that is constantly reinventing itself, a place where every corner offers a new sensory experience and every meal is a celebration of community.",
  },
  {
    location: "Florence, Italy",
    title: "Renaissance Radiance and the Spirit of the Medici",
    desc: "Florence is a city that belongs to the giants of the Renaissance, a place where the air itself seems to be infused with the genius of Michelangelo, Da Vinci, and Brunelleschi. I stood beneath the massive red dome of the Cattedrale di Santa Maria del Fiore, feeling the weight of the city's artistic ambition and the enduring power of the Medici legacy. The Uffizi Gallery provided a breathtaking journey through the history of Western art, from the delicate grace of Botticelli's Venus to the raw power of Caravaggio's shadows. Crossing the Ponte Vecchio at sunset, the gold and silver shops glittered like a scene from a medieval illumination, while the Arno river reflected the terracotta roofs of the city. In the Oltrarno district, I found master craftsmen still working with wood, leather, and paper as they have for centuries, a living link to the city's golden age. Florence is not just a city; it is an education in beauty, a place where every statue and every fresco is a dialogue with the divine.",
  },
  {
    location: "Yosemite National Park, USA",
    title: "Granite Giants and Ancient Forests in Yosemite",
    desc: "Yosemite is a cathedral of nature, a landscape of such staggering scale that it makes everything man-made seem insignificant. I stood at Tunnel View as the morning mist cleared to reveal El Capitan and Half Dome, their sheer granite faces rising thousands of feet from the valley floor like the pillars of the world. Hiking through the Mariposa Grove, I felt a sense of profound reverence beneath the giant sequoias, some of which have been growing since the time of the Roman Empire. The thunder of Yosemite Falls, one of the tallest in the world, provided a constant, powerful soundtrack to my explorations, the mist cooling the air even in the heat of midday. In the high country of Tuolumne Meadows, the alpine lakes reflected the sky with a clarity that felt spiritual, a world of subalpine forests and granite domes that felt untouched by time. Yosemite is a place that demands you listen to the silence and respect the wild, a reminder of the raw, enduring power of the American wilderness.",
  },
  {
    location: "Great Barrier Reef, Australia",
    title: "Coral Castles and Turquoise Depths: The Reef",
    desc: "The Great Barrier Reef is a living masterpiece of biological engineering, an underwater world of such vibrant colour and diversity that it feels like visiting another planet. I dived into the crystal-clear waters of the Outer Reef, finding myself surrounded by a kaleidoscopic forest of hard and soft corals, where every crevice was home to a different species of fish. Shoals of neon-coloured damselfish darted between the branches of staghorn coral, while massive green sea turtles glided through the water with ancient, effortless grace. I followed a reef shark through a canyon of limestone, feeling the thrill of being in the presence of one of the ocean's apex predators, before surfacing to a world of endless blue and white sand. The complexity of the reef's ecosystem, with its delicate balance of life and death, is a testament to the resilience of nature and a sobering reminder of the importance of conservation. The reef is not just an attraction; it is a sacred, living pulse at the heart of the Pacific.",
  },
  {
    location: "Galapagos Islands, Ecuador",
    title: "Darwin's Laboratory: The Wild Galapagos",
    desc: "The Galapagos Islands are a place where time seems to have stood still, a volcanic archipelago where the animals have no fear of man and nature operates on its own ancient rules. I walked among giant tortoises on Santa Cruz, their slow, deliberate movements a reminder of a geological pace of life. Snorkelling with sea lion pups on San Cristobal, I was struck by their playful curiosity, a contrast to the stoic indifference of the marine iguanas sunning themselves on the black lava rocks. Each island is a distinct ecosystem, from the red sands of Rabida to the barren shield volcanoes of Fernandina, offering a living lesson in the power of evolution. Following the footsteps of Charles Darwin, I felt the weight of scientific discovery in every unique species, from the blue-footed boobies' elaborate dance to the flightless cormorants' adapted wings. The Galapagos is a place that challenges your understanding of the world, a raw, primordial sanctuary where life is celebrated in its most unique and vulnerable forms.",
  },
  {
    location: "Phuket, Thailand",
    title: "Emerald Waters and Golden Temples in Phuket",
    desc: "Phuket is an island of sensory extremes, where the lush, tropical jungle meets a sea of impossible emerald green and the air is thick with the scent of jasmine and lemongrass. I spent my mornings exploring the Old Phuket Town, where Sino-Portuguese architecture and vibrant street art provide a colourful backdrop to the local markets. The Big Buddha, perched high on the Nakkerd Hills, offered a panoramic view of the island and a moment of spiritual reflection amidst the gold and white marble. Long-tail boats took me to the hidden lagoons of Phang Nga Bay, where limestone karsts rise from the water like ancient dragons. In the evening, the night markets of Patong provided a chaotic, energetic celebration of Thai street food, from spicy som tum to sweet mango sticky rice. Phuket is a place that rewards the adventurous, offering a blend of natural beauty, deep-seated tradition, and a legendary, sun-drenched hospitality that is impossible to resist.",
  },
  {
    location: "Maui, Hawaii",
    title: "Volcanic Hearts and Pacific Rhythms in Maui",
    desc: "Maui is an island where the earth is still being born and the sea provides a constant, rhythmic embrace. I drove the Road to Hana, a winding journey through 620 curves and 59 bridges, where every turn revealed a hidden waterfall, a black sand beach, or a lush rainforest alive with the sound of tropical birds. Standing at the summit of Haleakalā at sunrise, 3,000 metres above sea level, I felt as if I were standing on the edge of the world, the volcanic crater glowing with unearthly reds and purples. The spirit of 'ohana' and the deep respect for the land define the local culture, from the traditional hula dances that tell the stories of the gods to the sacred taro patches that have fed the people for generations. Snorkelling in the crescent-shaped Molokini crater, I found a world of pristine coral and luminous fish, a reminder of the island's volcanic origins and its vibrant, living heart. Maui is a place of 'aloha', where the power of the volcano and the peace of the ocean combine to create a landscape of profound, natural magic.",
  },
  {
    location: "Istanbul, Turkey",
    title: "Where Continents Collide: The Soul of Istanbul",
    desc: "Istanbul is a city that straddles two continents and three millennia, a place where the shadows of Byzantium and the Ottoman Empire still stretch across the Bosphorus. I stood beneath the massive dome of the Hagia Sophia, where the light of the setting sun turned the ancient mosaics into a golden blaze, a testament to the city's complex spiritual heritage. In the Grand Bazaar, I lost myself in a labyrinth of 4,000 shops, the air thick with the smell of leather, spices, and the rhythmic hammer of copper smiths. A ferry ride across the Bosphorus provided a cinematic journey between Europe and Asia, with the Topkapi Palace and the Blue Mosque dominating the skyline like the crowns of lost empires. In the evening, I found myself in a traditional 'meyhane' in Beyoğlu, sharing meze and raki while the sound of a distant oud provided a haunting, beautiful soundtrack. Istanbul is a city of layers, a place where every cup of Turkish tea is a lesson in hospitality and every cobblestone is a witness to the rise and fall of civilizations.",
  },
  {
    location: "Iceland",
    title: "Dancing with the Aurora: Winter in Iceland",
    desc: "The night sky above the Vatnajökull glacier transformed into a swirling river of neon green and ethereal purple, the Aurora Borealis dancing in a silent, cosmic ballet. Iceland in winter is a world of stark, beautiful contrasts, where steam rises from cobalt-blue geysers against a backdrop of pristine snow. I spent my days exploring the Diamond Beach, where shards of ancient glacial ice glisten like jewels on black volcanic sand. The power of the Gulfoss waterfall, partially frozen into massive icicles, left me breathless. Between soaking in the Blue Lagoon and chasing the northern lights across the desolate highlands, I felt a profound connection to the raw, moving power of the Earth's geothermal heart. The Icelandic horse, with its sturdy build and gentle spirit, became my companion on treks across frozen lava fields, while the cozy cafes of Reykjavik provided a warm sanctuary with bowls of hearty lamb stew.",
  },
  {
    location: "Lake Como, Italy",
    title: "Villas and Alpine Vistas: The Elegance of Lake Como",
    desc: "Lake Como is a deep, Y-shaped jewel cradled by the Rhaetian Alps, where neogothic villas with manicured gardens spill down to the water's edge. I arrived in Bellagio, the 'Pearl of the Lake', where steep stone staircases wind between boutiques and gelaterias with views that have inspired composers and writers for centuries. A slow boat across the shimmering water revealed Villa del Balbianello, its terraced gardens and ivy-covered columns a masterclass in Italian romanticism. The air was thick with the scent of jasmine and the sound of distant church bells echoing across the lake. I spent my afternoons on a classic mahogany Riva boat, the wind in my hair as the peaks of the Alps reflected in the mirror-still water. Whether dining on fresh perch from the lake in a clifftop trattoria or wandering through the cypress-lined paths of Villa Melzi, Lake Como offers a timeless, sophisticated peace that seems to belong to a more graceful era.",
  },
  {
    location: "Beijing, China",
    title: "Forbidden Empires and Great Walls: A Beijing Chronicle",
    desc: "Beijing is a city where the weight of imperial history meets the high-speed ambition of a modern superpower. Standing in the middle of Tiananmen Square, the sheer scale of the space and the surrounding monuments of the People's Republic is a testament to China's revolutionary heart. But just across the street, the Forbidden City reveals a labyrinth of 9,999 rooms, their golden-tiled roofs and red walls holding the secrets of the Ming and Qing dynasties for over five hundred years. I hiked the Jinshanling section of the Great Wall at dawn, the ancient stone fortification snaking across the jagged mountains like a dragon of brick and mortar as the first light hit the watchtowers. In the narrow hutongs, I found a vanishing world of grey-brick courtyards and elders playing mahjong under the shade of ancient scholar trees. Beijing is a city of layers, where the smell of Peking duck and the neon glow of Wangfujing Street coexist with the silent, spiritual gardens of the Temple of Heaven.",
  },
];

// ─── Schemas ──────────────────────────────────────────────────────────────
const postSchema = new mongoose.Schema(
  { title: String, desc: String, img: String, userId: String, slug: String, location: String, lat: Number, lng: Number },
  { timestamps: true }
);
const userSchema = new mongoose.Schema(
  { username: String, email: String, password: String, img: String, isAdmin: Boolean },
  { timestamps: true }
);
const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
const User = mongoose.models?.User || mongoose.model("User", userSchema);

// ─── Helpers ──────────────────────────────────────────────────────────────
async function geocode(location) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
      { headers: { "User-Agent": "VoyageVerseSeeder/1.0" } }
    );
    const data = await res.json();
    if (data?.length > 0) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch (_) {}
  return { lat: null, lng: null };
}

async function fetchPexelsImage(title, location) {
  try {
    const queryText = `${title || ""} ${location || ""} travel scenery`.trim();
    const query = encodeURIComponent(queryText);
    const randomPage = Math.floor(Math.random() * 3) + 1; // variety
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=1&page=${randomPage}&orientation=landscape`,
      { headers: { Authorization: PEXELS_API_KEY } }
    );
    const data = await res.json();
    if (data?.photos?.length > 0) return data.photos[0].src.large2x;
  } catch (_) {}
  return null;
}

function makeSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString(36);
}

// ─── Main ─────────────────────────────────────────────────────────────────
async function seed() {
  console.log(`\n🌍 VoyageVerse Story Seeder`);
  console.log(`📝 Adding ${COUNT} stories using account: ${USER_EMAIL}\n`);

  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB\n');

  // Find user
  const user = await User.findOne({ email: USER_EMAIL });
  if (!user) {
    console.error(`❌ No user found with email: ${USER_EMAIL}`);
    console.error('   Update USER_EMAIL at the top of this script.');
    process.exit(1);
  }
  console.log(`👤 Found user: ${user.username} (${user._id})\n`);

  // Get existing stories to avoid duplicates
  const existingPosts = await Post.find({}, { title: 1 });
  const existingTitles = new Set(existingPosts.map(p => p.title));
  console.log(`📋 Found ${existingTitles.size} existing stories in database.`);

  const toAdd = [];
  const shuffled = [...storyTemplates].sort(() => Math.random() - 0.5);

  for (const template of shuffled) {
    if (!existingTitles.has(template.title)) {
      toAdd.push(template);
      existingTitles.add(template.title);
      if (toAdd.length >= COUNT) break;
    }
  }

  if (toAdd.length === 0) {
    console.log("ℹ️ No unique stories found to add. All current templates already exist in the database.");
    process.exit(0);
  }

  if (toAdd.length < COUNT) {
    console.log(`⚠️ Only found ${toAdd.length} unique new stories to add. (No more templates available)\n`);
  } else {
    console.log(`✨ Found ${toAdd.length} unique new stories to add.\n`);
  }

  let added = 0;
  for (const story of toAdd) {
    const { location, title, desc } = story;
    console.log(`  📌 "${title}"`);

    try {
      // Geocode
      const { lat, lng } = await geocode(location);
      console.log(`     ↳ Coords: ${lat?.toFixed(4)}, ${lng?.toFixed(4)}`);

      // Pexels image
      const img = await fetchPexelsImage(title, location);
      console.log(`     ↳ Image: ${img ? '✓ Found' : '✗ Not found'}`);

      // Build unique slug
      const slug = makeSlug(title);

      // Save post
      const post = new Post({ title, desc, img, userId: user._id.toString(), slug, location, lat, lng });
      await post.save();
      console.log(`     ↳ ✅ Saved!\n`);
      added++;

    } catch (err) {
      console.error(`     ↳ ❌ Failed: ${err.message}\n`);
    }

    // Respect Nominatim rate limit (1 req/sec)
    await new Promise(r => setTimeout(r, 1100));
  }

  console.log(`\n🎉 Done! Added ${added} stories.\n`);
  process.exit(0);
}

seed().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
