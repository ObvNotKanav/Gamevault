import { Game } from '../types';

export const INITIAL_GAMES: Game[] = [
  {
    id: 'elden-ring',
    title: 'Elden Ring',
    slug: 'elden-ring',
    tagline: 'Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring.',
    description: 'An expansive fantasy action-RPG adventure in the Lands Between crafted by Hidetaka Miyazaki and George R. R. Martin. Explore vast dungeons, encounter mythic beasts, and customize your build with hundreds of spells, weapons, and skills.',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg',
    heroImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_hero.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_943bf6fe62352757d9070c1d33e50b92fe8539f1.1920x1080.jpg?t=1789162449',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_dcdac9e4b26ac0ee5248bfd2967d764fd00cdb42.1920x1080.jpg?t=1789162449',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_3c41384a24d86dddd58a8f61db77f9dc0bfda8b5.1920x1080.jpg?t=1789162449',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_e0316c76f8197405c1312d072b84331dd735d60b.1920x1080.jpg?t=1789162449'
    ],
    releaseDate: '2022-02-25',
    releaseYear: 2022,
    developer: 'FromSoftware Inc.',
    publisher: 'Bandai Namco Entertainment',
    genres: ['Action', 'RPG', 'Adventure'],
    platforms: ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X/S', 'Xbox One', 'Steam Deck'],
    rating: 96,
    reviewCount: 450000,
    popularityScore: 98,
    isFeatured: true,
    isTrending: true,
    isHiddenGem: false,
    isRecentlyReleased: false,
    priceTier: 'Full Price',
    priceFormatted: '$59.99',
    gameModes: ['Single-player', 'Co-op', 'PvP'],
    playtimeHours: {
      mainStory: 58,
      completionist: 133
    },
    narrativeDepth: 4,
    difficulty: 'Hardcore',
    tags: ['Souls-like', 'Open World', 'Dark Fantasy', 'Masterpiece', 'Exploration'],
    stores: [
      { name: 'Steam', storeType: 'Steam', url: 'https://store.steampowered.com/app/1245620/ELDEN_RING/', priceFormatted: '$59.99' },
      { name: 'PlayStation Store', storeType: 'PlayStation', url: 'https://store.playstation.com/', priceFormatted: '$59.99' },
      { name: 'Xbox Store', storeType: 'Xbox', url: 'https://www.xbox.com/', priceFormatted: '$59.99' }
    ],
    whyYouMightLike: {
      gameplaySummary: 'Uncompromising challenge combined with unparalleled freedom of exploration in a grand open world.',
      highlights: [
        'Massive non-linear open world full of secret dungeons and legacy castles',
        'Deep character progression with magic, melee, archery, and stealth builds',
        'Rewarding boss battles that test precision, patience, and strategy'
      ],
      idealFor: ['Souls veterans', 'Fans of deep combat systems', 'Players who love unguided exploration']
    }
  },
  {
    id: 'baldur-gate-3',
    title: "Baldur's Gate 3",
    slug: 'baldurs-gate-3',
    tagline: 'Gather your party and venture back to the Forgotten Realms in an epic story of fellowship and betrayal.',
    description: 'A grand party-based roleplaying game set in the Dungeons & Dragons universe. Your choices shape a story of fellowship, betrayal, sacrifice, survival, and the lure of absolute power with unmatched narrative reactivity.',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/capsule_616x353.jpg',
    heroImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/library_hero.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_c73bc54415178c07fef85f54ee26621728c77504.1920x1080.jpg?t=1777363040',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_73d93bea842b93914d966622104dcb8c0f42972b.1920x1080.jpg?t=1777363040',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_cf936d31061b58e98e0c646aee00e6030c410cda.1920x1080.jpg?t=1777363040',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_b6a6ee6e046426d08ceea7a4506a1b5f44181543.1920x1080.jpg?t=1777363040'
    ],
    releaseDate: '2023-08-03',
    releaseYear: 2023,
    developer: 'Larian Studios',
    publisher: 'Larian Studios',
    genres: ['RPG', 'Strategy', 'Adventure'],
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S', 'Steam Deck'],
    rating: 96,
    reviewCount: 520000,
    popularityScore: 99,
    isFeatured: true,
    isTrending: true,
    isHiddenGem: false,
    isRecentlyReleased: false,
    priceTier: 'Full Price',
    priceFormatted: '$59.99',
    gameModes: ['Single-player', 'Co-op'],
    playtimeHours: {
      mainStory: 65,
      completionist: 155
    },
    narrativeDepth: 5,
    difficulty: 'Moderate',
    tags: ['Turn-Based RPG', 'Rich Story', 'Choices Matter', 'D&D', 'Co-op Campaign'],
    stores: [
      { name: 'Steam', storeType: 'Steam', url: 'https://store.steampowered.com/app/1086940/Baldurs_Gate_3/', priceFormatted: '$59.99' },
      { name: 'GOG', storeType: 'GOG', url: 'https://www.gog.com/', priceFormatted: '$59.99' },
      { name: 'PlayStation Store', storeType: 'PlayStation', url: 'https://store.playstation.com/', priceFormatted: '$69.99' }
    ],
    whyYouMightLike: {
      gameplaySummary: 'The pinnacle of CRPG storytelling where every decision has meaningful ripple effects and tactical turn-based combat encourages creative solutions.',
      highlights: [
        'Thousands of branching dialogue paths and character outcomes',
        'Complex turn-based combat leveraging physics, elevation, and magic combos',
        'Full 4-player online campaign co-op with simultaneous turns'
      ],
      idealFor: ['Tabletop RPG fans', 'Story enthusiasts', 'Tactical strategists']
    }
  },
  {
    id: 'hades-2',
    title: 'Hades II',
    slug: 'hades-2',
    tagline: 'Battle beyond the Underworld using dark sorcery to take on the Titan of Time.',
    description: 'The bewitching sequel to Supergiant Games award-winning rogue-like dungeon crawler. As Melinoë, the immortal Princess of the Underworld, harness the full power of Olympus and dark witchcraft in an ever-shifting odyssey.',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145350/capsule_616x353.jpg',
    heroImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145350/library_hero.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145350/ss_ef0f63061d0a0a9a7e46f3b84f125d25330e8f19.1920x1080.jpg?t=1779901265',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145350/ss_f28befd916e59b8bf0a8a801b8a498b8adaa01eb.1920x1080.jpg?t=1779901265',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145350/ss_b88cb7b48a86f07a7288bf37141f6558279f9bfc.1920x1080.jpg?t=1779901265',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145350/ss_c8d2b18451a2cc4d5b4fdd78ed84a5e64e051eac.1920x1080.jpg?t=1779901265'
    ],
    releaseDate: '2024-05-06',
    releaseYear: 2024,
    developer: 'Supergiant Games',
    publisher: 'Supergiant Games',
    genres: ['Action', 'Roguelike', 'Indie', 'RPG'],
    platforms: ['PC', 'Steam Deck'],
    rating: 93,
    reviewCount: 98000,
    popularityScore: 92,
    isFeatured: true,
    isTrending: true,
    isHiddenGem: false,
    isRecentlyReleased: true,
    priceTier: 'Under $40',
    priceFormatted: '$29.99',
    gameModes: ['Single-player'],
    playtimeHours: {
      mainStory: 25,
      completionist: 85
    },
    narrativeDepth: 4,
    difficulty: 'Challenging',
    tags: ['Fast-Paced', 'Mythology', 'Roguelite', 'Great Soundtrack', 'Replayable'],
    stores: [
      { name: 'Steam', storeType: 'Steam', url: 'https://store.steampowered.com/app/1145350/Hades_II/', priceFormatted: '$29.99' },
      { name: 'Epic Games Store', storeType: 'Epic', url: 'https://store.epicgames.com/', priceFormatted: '$29.99' }
    ],
    whyYouMightLike: {
      gameplaySummary: 'Hyper-responsive hack-and-slash combat intertwined with Greek tragedy, dark witchcraft, and addictive run-based progression.',
      highlights: [
        'Dozens of Olympian boons and witchcraft incantations that create unique builds',
        'Vibrant, hand-painted art direction with pulse-pounding original score',
        'Rich character relationships that evolve with every single death and victory'
      ],
      idealFor: ['Action gamers', 'Greek mythology fans', 'Players looking for high replay value']
    }
  },
  {
    id: 'cyberpunk-2077',
    title: 'Cyberpunk 2077: Phantom Liberty',
    slug: 'cyberpunk-2077',
    tagline: 'Freedom always comes at a price in the deadly district of Dogtown.',
    description: 'An open-world action-adventure RPG set in the dystopian megalopolis of Night City. Step into the shoes of V, a cyberpunk mercenary caught in a high-stakes espionage thriller involving the New United States of America.',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/capsule_616x353.jpg',
    heroImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/library_hero.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_2f649b68d579bf87011487d29bc4ccbfdd97d34f.1920x1080.jpg?t=1784714077',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_0e64170751e1ae20ff8fdb7001a8892fd48260e7.1920x1080.jpg?t=1784714077',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_af2804aa4bf35d4251043744412ce3b359a125ef.1920x1080.jpg?t=1784714077',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_7924f64b6e5d586a80418c9896a1c92881a7905b.1920x1080.jpg?t=1784714077'
    ],
    releaseDate: '2023-09-26',
    releaseYear: 2023,
    developer: 'CD PROJEKT RED',
    publisher: 'CD PROJEKT RED',
    genres: ['Action', 'RPG', 'Shooter', 'Sci-Fi'],
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S', 'Steam Deck'],
    rating: 89,
    reviewCount: 650000,
    popularityScore: 95,
    isFeatured: true,
    isTrending: false,
    isHiddenGem: false,
    isRecentlyReleased: false,
    priceTier: 'Full Price',
    priceFormatted: '$59.99',
    gameModes: ['Single-player'],
    playtimeHours: {
      mainStory: 35,
      completionist: 105
    },
    narrativeDepth: 5,
    difficulty: 'Moderate',
    tags: ['Cyberpunk', 'First-Person', 'Espionage', 'Immersive Sim', 'Ray Tracing'],
    stores: [
      { name: 'Steam', storeType: 'Steam', url: 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/', priceFormatted: '$59.99' },
      { name: 'GOG', storeType: 'GOG', url: 'https://www.gog.com/', priceFormatted: '$59.99' },
      { name: 'PlayStation Store', storeType: 'PlayStation', url: 'https://store.playstation.com/', priceFormatted: '$59.99' }
    ],
    whyYouMightLike: {
      gameplaySummary: 'Stunning visual fidelity and deep cyberware customization combined with emotionally resonant storytelling and gunplay.',
      highlights: [
        'Night City is one of the most breathtaking, dense urban sandboxes ever built',
        'Diverse combat archetypes: netrunning hacker, cyber-ninja, or heavy gunner',
        'Featuring Idris Elba and Keanu Reeves in pivotal cinematic narrative roles'
      ],
      idealFor: ['Sci-fi lovers', 'Fans of immersive first-person RPGs', 'Players with modern gaming rigs']
    }
  },
  {
    id: 'sea-of-stars',
    title: 'Sea of Stars',
    slug: 'sea-of-stars',
    tagline: 'A turn-based RPG inspired by the golden classics of the 90s.',
    description: 'Sea of Stars tells the story of two Children of the Solstice who combine the powers of the sun and moon to perform Eclipse Magic, the only force capable of fending off the monstrous creations of the evil alchemist known as The Fleshmancer.',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1244090/capsule_616x353.jpg',
    heroImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1244090/library_hero.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1244090/ss_f756ff477590284c7192ffcef99237de056e4aeb.1920x1080.jpg?t=1780931183',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1244090/ss_c250a7fd789b3cbab5ca8e99e3530cf933656ad1.1920x1080.jpg?t=1780931183',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1244090/ss_889d4ddea7d0884d9d370dd280878570824e68fe.1920x1080.jpg?t=1780931183',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1244090/ss_cb9259d083c9d42db9b1f1197e030f8f85d42198.1920x1080.jpg?t=1780931183'
    ],
    releaseDate: '2023-08-29',
    releaseYear: 2023,
    developer: 'Sabotage Studio',
    publisher: 'Sabotage Studio',
    genres: ['RPG', 'Indie', 'Adventure'],
    platforms: ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X/S', 'Nintendo Switch', 'Steam Deck'],
    rating: 87,
    reviewCount: 38000,
    popularityScore: 78,
    isFeatured: false,
    isTrending: false,
    isHiddenGem: true,
    isRecentlyReleased: false,
    priceTier: 'Under $40',
    priceFormatted: '$34.99',
    gameModes: ['Single-player'],
    playtimeHours: {
      mainStory: 30,
      completionist: 45
    },
    narrativeDepth: 4,
    difficulty: 'Moderate',
    tags: ['Retro Pixel Art', 'Turn-Based Combat', 'JRPG', 'Chrono Trigger Vibes', 'Puzzles'],
    stores: [
      { name: 'Steam', storeType: 'Steam', url: 'https://store.steampowered.com/app/1244090/Sea_of_Stars/', priceFormatted: '$34.99' },
      { name: 'Nintendo eShop', storeType: 'Nintendo', url: 'https://www.nintendo.com/', priceFormatted: '$34.99' }
    ],
    whyYouMightLike: {
      gameplaySummary: 'A love letter to 16-bit JRPGs with modern navigation, seamless transitions, and timed combat hits.',
      highlights: [
        'Dynamic turn-based combat with timed button presses and spell interruptions',
        'Unshackled movement: swim, climb, vault, and hoist effortlessly through the world',
        'Original soundtrack featuring guest composer Yasunori Mitsuda (Chrono Trigger)'
      ],
      idealFor: ['Chrono Trigger & Golden Sun fans', 'Pixel art lovers', 'Casual turn-based strategists']
    }
  },
  {
    id: 'balatro',
    title: 'Balatro',
    slug: 'balatro',
    tagline: 'The poker roguelike that took the world by storm.',
    description: 'Balatro is a poker-inspired roguelike deck builder all about creating powerful synergies and winning big. Combine valid poker hands with unique Joker cards in order to trigger varied synergies and score enough chips to beat devious blinds.',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2379780/capsule_616x353.jpg',
    heroImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2379780/library_hero.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2379780/96208723dbedef49d71bf1b0a74aee1689018c50/ss_96208723dbedef49d71bf1b0a74aee1689018c50.1920x1080.jpg?t=1788961800',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2379780/ss_4862112e5030f74a5818cd4c31347d699ac5adf3.1920x1080.jpg?t=1788961800',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2379780/ss_3be65a7dd3be072d567e11883d208861a7e959fa.1920x1080.jpg?t=1788961800',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2379780/ss_e32ac94d7d1d6be7dd015d78f2b52aeb4cc282ed.1920x1080.jpg?t=1788961800'
    ],
    releaseDate: '2024-02-20',
    releaseYear: 2024,
    developer: 'LocalThunk',
    publisher: 'Playstack',
    genres: ['Roguelike', 'Strategy', 'Indie', 'Puzzle'],
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S', 'Nintendo Switch', 'Steam Deck'],
    rating: 90,
    reviewCount: 62000,
    popularityScore: 94,
    isFeatured: true,
    isTrending: true,
    isHiddenGem: true,
    isRecentlyReleased: true,
    priceTier: 'Under $20',
    priceFormatted: '$14.99',
    gameModes: ['Single-player'],
    playtimeHours: {
      mainStory: 15,
      completionist: 100
    },
    narrativeDepth: 1,
    difficulty: 'Challenging',
    tags: ['Deckbuilder', 'Addictive', 'Poker', 'Card Battler', 'Hypnotic Synth'],
    stores: [
      { name: 'Steam', storeType: 'Steam', url: 'https://store.steampowered.com/app/2379780/Balatro/', priceFormatted: '$14.99' },
      { name: 'Nintendo eShop', storeType: 'Nintendo', url: 'https://www.nintendo.com/', priceFormatted: '$14.99' }
    ],
    whyYouMightLike: {
      gameplaySummary: 'Hypnotically satisfying synergy building where simple poker rules explode into exponential multipliers and absurd combos.',
      highlights: [
        'Over 150 unique Jokers with game-breaking multiplier mechanics',
        'Endless modifier decks, Tarot cards, Planet upgrades, and Spectral enhancements',
        'Pick up and play for 10 minutes or lose 6 hours in a trance'
      ],
      idealFor: ['Deckbuilding fans', 'Strategy puzzle lovers', 'Steam Deck and portable players']
    }
  },
  {
    id: 'helldivers-2',
    title: 'Helldivers 2',
    slug: 'helldivers-2',
    tagline: 'Spread Managed Democracy across the galaxy with overwhelming firepower.',
    description: 'Join forces with up to three friends and wreak havoc on an alien scourge threatening the safety of your home planet, Super Earth. Unleash massive orbital strikes, heavy artillery, and automated sentries in chaotic third-person squad combat.',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/553850/capsule_616x353.jpg',
    heroImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/553850/library_hero.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/553850/aed08979e15f54798f287dd8820fb5838476b5fa/ss_aed08979e15f54798f287dd8820fb5838476b5fa.1920x1080.jpg?t=1788431424',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/553850/71ef7c65fcf63ff974ce42150190c0420c66c72b/ss_71ef7c65fcf63ff974ce42150190c0420c66c72b.1920x1080.jpg?t=1788431424',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/553850/6c8b61a7c63479b6f526d285af6687a362d5d7ae/ss_6c8b61a7c63479b6f526d285af6687a362d5d7ae.1920x1080.jpg?t=1788431424',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/553850/ss_0c79f56fc7be1bd0102f2ca1c92c8f0900daf4fb.1920x1080.jpg?t=1788431424'
    ],
    releaseDate: '2024-02-08',
    releaseYear: 2024,
    developer: 'Arrowhead Game Studios',
    publisher: 'PlayStation Publishing LLC',
    genres: ['Shooter', 'Action', 'Sci-Fi'],
    platforms: ['PC', 'PlayStation 5'],
    rating: 82,
    reviewCount: 420000,
    popularityScore: 97,
    isFeatured: false,
    isTrending: true,
    isHiddenGem: false,
    isRecentlyReleased: true,
    priceTier: 'Under $40',
    priceFormatted: '$39.99',
    gameModes: ['Multiplayer', 'Co-op'],
    playtimeHours: {
      mainStory: 20,
      completionist: 120
    },
    narrativeDepth: 2,
    difficulty: 'Challenging',
    tags: ['Co-op Shooter', 'Friendly Fire', 'Satirical Sci-Fi', 'Horde Combat', 'Live-Service'],
    stores: [
      { name: 'Steam', storeType: 'Steam', url: 'https://store.steampowered.com/app/553850/HELLDIVERS_2/', priceFormatted: '$39.99' },
      { name: 'PlayStation Store', storeType: 'PlayStation', url: 'https://store.playstation.com/', priceFormatted: '$39.99' }
    ],
    whyYouMightLike: {
      gameplaySummary: 'Cinematic squad cooperation where friendly fire, overwhelming enemy swarms, and devastating airstrikes create hilarious, emergent chaos.',
      highlights: [
        'Persistent galactic campaign where player victories liberate actual planets in real time',
        'Satisfying gunplay with tactile weapon handling, recoil, and armor penetration physics',
        'Hilarious emergent moments caused by chaotic friendly fire and drop pods'
      ],
      idealFor: ['Co-op groups', 'Third-person shooter fans', 'Starship Troopers aficionados']
    }
  },
  {
    id: 'stardew-valley',
    title: 'Stardew Valley',
    slug: 'stardew-valley',
    tagline: 'You\'ve inherited your grandfather\'s old farm plot in Pelican Town.',
    description: 'Armed with hand-me-down tools and a few coins, can you learn to live off the land and turn these overgrown fields into a thriving home? Grow crops, raise animals, mine ore, befriend townsfolk, and discover magical secrets.',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/capsule_616x353.jpg',
    heroImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/library_hero.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/ss_b887651a93b0525739049eb4194f633de2df75be.1920x1080.jpg?t=1786554168',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/ss_9ac899fe2cda15d48b0549bba77ef8c4a090a71c.1920x1080.jpg?t=1786554168',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/ss_4fa0866709ede3753fdf2745349b528d5e8c4054.1920x1080.jpg?t=1786554168',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/ss_d836f0a5b0447fb6a2bdb0a6ac5f954949d3c41e.1920x1080.jpg?t=1786554168'
    ],
    releaseDate: '2016-02-26',
    releaseYear: 2016,
    developer: 'ConcernedApe',
    publisher: 'ConcernedApe',
    genres: ['Simulation', 'RPG', 'Indie'],
    platforms: ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X/S', 'Xbox One', 'Nintendo Switch', 'Steam Deck'],
    rating: 89,
    reviewCount: 600000,
    popularityScore: 96,
    isFeatured: false,
    isTrending: false,
    isHiddenGem: false,
    isRecentlyReleased: false,
    priceTier: 'Under $20',
    priceFormatted: '$14.99',
    gameModes: ['Single-player', 'Co-op'],
    playtimeHours: {
      mainStory: 52,
      completionist: 150
    },
    narrativeDepth: 3,
    difficulty: 'Relaxed',
    tags: ['Cozy', 'Farming Sim', 'Relaxing', 'Crafting', 'Wholesome'],
    stores: [
      { name: 'Steam', storeType: 'Steam', url: 'https://store.steampowered.com/app/413150/Stardew_Valley/', priceFormatted: '$14.99' },
      { name: 'GOG', storeType: 'GOG', url: 'https://www.gog.com/', priceFormatted: '$14.99' },
      { name: 'Nintendo eShop', storeType: 'Nintendo', url: 'https://www.nintendo.com/', priceFormatted: '$14.99' }
    ],
    whyYouMightLike: {
      gameplaySummary: 'The ultimate comforting escape from modern life with zero rush, gentle music, and rich community progression.',
      highlights: [
        'Limitless freedom to design your farm, winery, apiary, or orchard',
        'Charming calendar of seasonal festivals, villager birthdays, and heart events',
        'Optional co-op multiplayer to build a shared paradise with friends'
      ],
      idealFor: ['Relaxation seekers', 'Cozy gamers', 'Simulation & crafting enthusiasts']
    }
  },
  {
    id: 'outer-wilds',
    title: 'Outer Wilds',
    slug: 'outer-wilds',
    tagline: 'An open world mystery about a solar system trapped in an endless time loop.',
    description: 'You\'re the newest recruit of Outer Wilds Ventures, a fledgling space program searching for answers in a strange, constantly evolving solar system. Can the 22-minute time loop be stopped? Discover ancient ruins and venture into deep space.',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/capsule_616x353.jpg',
    heroImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/library_hero.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/ss_ec95a283483f0438be40d033f08b9d956e748d54.1920x1080.jpg?t=1785424341',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/ss_09f0fa8d9b8d7da1408cf4e03303d896cbd9be18.1920x1080.jpg?t=1785424341',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/ss_c624a6b8edca0d451605592edd927dbcc14917a8.1920x1080.jpg?t=1785424341',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/753640/ss_8683942f8d09eec32daeebe94867287424968f97.1920x1080.jpg?t=1785424341'
    ],
    releaseDate: '2019-05-28',
    releaseYear: 2019,
    developer: 'Mobius Digital',
    publisher: 'Annapurna Interactive',
    genres: ['Adventure', 'Puzzle', 'Indie', 'Sci-Fi'],
    platforms: ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X/S', 'Xbox One', 'Nintendo Switch', 'Steam Deck'],
    rating: 85,
    reviewCount: 88000,
    popularityScore: 84,
    isFeatured: false,
    isTrending: false,
    isHiddenGem: true,
    isRecentlyReleased: false,
    priceTier: 'Under $40',
    priceFormatted: '$24.99',
    gameModes: ['Single-player'],
    playtimeHours: {
      mainStory: 16,
      completionist: 28
    },
    narrativeDepth: 5,
    difficulty: 'Moderate',
    tags: ['Masterpiece', 'Time Loop', 'Space Exploration', 'Curiosity-Driven', 'Mystery'],
    stores: [
      { name: 'Steam', storeType: 'Steam', url: 'https://store.steampowered.com/app/753640/Outer_Wilds/', priceFormatted: '$24.99' }
    ],
    whyYouMightLike: {
      gameplaySummary: 'A sublime game driven entirely by your own curiosity and knowledge, set in a meticulously simulated hand-crafted universe.',
      highlights: [
        'Planets that transform over time: crumble under volcanic ash or drown in sand',
        'Progress is tracked by your personal understanding rather than unlocked stat upgrades',
        'One of the most emotionally profound endings in video game history'
      ],
      idealFor: ['Curious explorers', 'Sci-fi puzzle lovers', 'Anyone who values genuine narrative discovery']
    }
  },
  {
    id: 'hollow-knight',
    title: 'Hollow Knight',
    slug: 'hollow-knight',
    tagline: 'Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom.',
    description: 'Beneath the fading town of Dirtmouth sleeps a vast, ancient insect kingdom. Many are drawn below the surface, searching for riches, or glory, or answers to old secrets. Explore cavernous ruins, battle tainted creatures and befriend bizarre bugs.',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/capsule_616x353.jpg',
    heroImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/library_hero.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/ss_5384f9f8b96a0b9934b2bc35a4058376211636d2.1920x1080.jpg?t=1776125684',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/ss_d5b6edd94e77ba6db31c44d8a3c09d807ab27751.1920x1080.jpg?t=1776125684',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/ss_a81e4231cc8d55f58b51a4a938898af46503cae5.1920x1080.jpg?t=1776125684',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/ss_62e10cf506d461e11e050457b08aa0e2a1c078d0.1920x1080.jpg?t=1776125684'
    ],
    releaseDate: '2017-02-24',
    releaseYear: 2017,
    developer: 'Team Cherry',
    publisher: 'Team Cherry',
    genres: ['Action', 'Adventure', 'Indie', 'Metroidvania', 'Platformer'],
    platforms: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch', 'Steam Deck'],
    rating: 90,
    reviewCount: 310000,
    popularityScore: 93,
    isFeatured: false,
    isTrending: false,
    isHiddenGem: false,
    isRecentlyReleased: false,
    priceTier: 'Under $20',
    priceFormatted: '$14.99',
    gameModes: ['Single-player'],
    playtimeHours: {
      mainStory: 27,
      completionist: 62
    },
    narrativeDepth: 4,
    difficulty: 'Hardcore',
    tags: ['Metroidvania', 'Souls-like', '2D Platformer', 'Atmospheric', 'Difficult'],
    stores: [
      { name: 'Steam', storeType: 'Steam', url: 'https://store.steampowered.com/app/367520/Hollow_Knight/', priceFormatted: '$14.99' },
      { name: 'Nintendo eShop', storeType: 'Nintendo', url: 'https://www.nintendo.com/', priceFormatted: '$14.99' }
    ],
    whyYouMightLike: {
      gameplaySummary: 'Razor-sharp nail combat, hauntingly beautiful hand-drawn art, and the greatest interconnected underground labyrinth ever crafted.',
      highlights: [
        'Huge world with over 150 unique enemies and 30 epic bosses',
        'Customizable playstyle through equippable Charms providing magical or combat perks',
        'Mesmerizing orchestral score by Christopher Larkin'
      ],
      idealFor: ['Metroidvania lovers', 'Challenging 2D action fans', 'Atmospheric world-builders']
    }
  },
  {
    id: 'disco-elysium',
    title: 'Disco Elysium — The Final Cut',
    slug: 'disco-elysium',
    tagline: 'A groundbreaking role playing game where you become a detective with a unique skill system.',
    description: 'You\'re a detective with a unique skill system at your disposal and a whole city block to carve your path across. Interrogate unforgettable characters, crack murders, or take bribes. Become a hero or an absolute disaster of a human being.',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/632470/capsule_616x353.jpg',
    heroImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/632470/library_hero.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/632470/ss_b3694e99ffdb686d1bbbbe16a540d3d2ccd509c4.1920x1080.jpg?t=1780913406',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/632470/ss_9125a718ee9ba85386ae5d4eb820f3266073fc97.1920x1080.jpg?t=1780913406',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/632470/ss_4f5fdc3cf42feca8dafb1f7d2910ef96e62708a2.1920x1080.jpg?t=1780913406',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/632470/ss_fc6969799ebf19fd2a2c8a986c9419e053606a17.1920x1080.jpg?t=1780913406'
    ],
    releaseDate: '2021-03-30',
    releaseYear: 2021,
    developer: 'ZA/UM',
    publisher: 'ZA/UM',
    genres: ['RPG', 'Adventure', 'Indie'],
    platforms: ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X/S', 'Xbox One', 'Nintendo Switch', 'Steam Deck'],
    rating: 97,
    reviewCount: 95000,
    popularityScore: 89,
    isFeatured: false,
    isTrending: false,
    isHiddenGem: true,
    isRecentlyReleased: false,
    priceTier: 'Under $40',
    priceFormatted: '$39.99',
    gameModes: ['Single-player'],
    playtimeHours: {
      mainStory: 22,
      completionist: 45
    },
    narrativeDepth: 5,
    difficulty: 'Moderate',
    tags: ['Literary Masterpiece', 'Detective', 'Dark Humor', 'Full Voice Acting', 'Deep Dialogue'],
    stores: [
      { name: 'Steam', storeType: 'Steam', url: 'https://store.steampowered.com/app/632470/Disco_Elysium__The_Final_Cut/', priceFormatted: '$39.99' },
      { name: 'GOG', storeType: 'GOG', url: 'https://www.gog.com/', priceFormatted: '$39.99' }
    ],
    whyYouMightLike: {
      gameplaySummary: 'Unmatched literary brilliance where your 24 distinct psychological traits argue inside your head during murder interrogations.',
      highlights: [
        'Zero traditional combat: every confrontation is fought through dialogue, wits, and skill checks',
        'Thought Cabinet mechanic where you incubate philosophical theories that permanently reshape you',
        'Complete voice acting that brings the ruined city of Revachol to life'
      ],
      idealFor: ['Avid readers', 'Noir mystery lovers', 'RPG purists who value dialogue over combat']
    }
  },
  {
    id: 'alan-wake-2',
    title: 'Alan Wake 2',
    slug: 'alan-wake-2',
    tagline: 'Monsters wear many faces in the nightmare of the Dark Place.',
    description: 'A string of ritualistic murders threatens Bright Falls, a small-town community surrounded by Pacific Northwest wilderness. Saga Anderson, an accomplished FBI agent, arrives to investigate. Meanwhile, Alan Wake remains trapped in a nightmare reality.',
    coverImage: 'https://images.igdb.com/igdb/image/upload/t_1080p/co5z8n.jpg',
    heroImage: 'https://images.igdb.com/igdb/image/upload/t_screenshot_huge/sccevf.jpg',
    screenshots: [
      'https://images.igdb.com/igdb/image/upload/t_screenshot_huge/sccevf.jpg',
      'https://images.igdb.com/igdb/image/upload/t_screenshot_huge/sccevg.jpg',
      'https://images.igdb.com/igdb/image/upload/t_screenshot_huge/sccevh.jpg'
    ],
    releaseDate: '2023-10-27',
    releaseYear: 2023,
    developer: 'Remedy Entertainment',
    publisher: 'Epic Games Publishing',
    genres: ['Horror', 'Action', 'Adventure'],
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
    rating: 89,
    reviewCount: 45000,
    popularityScore: 88,
    isFeatured: false,
    isTrending: false,
    isHiddenGem: false,
    isRecentlyReleased: false,
    priceTier: 'Full Price',
    priceFormatted: '$49.99',
    gameModes: ['Single-player'],
    playtimeHours: {
      mainStory: 18,
      completionist: 30
    },
    narrativeDepth: 5,
    difficulty: 'Moderate',
    tags: ['Survival Horror', 'Mind-Bending', 'Cinematic', 'Detective', 'Psychological'],
    stores: [
      { name: 'Epic Games Store', storeType: 'Epic', url: 'https://store.epicgames.com/en-US/p/alan-wake-2', priceFormatted: '$49.99' },
      { name: 'PlayStation Store', storeType: 'PlayStation', url: 'https://store.playstation.com/', priceFormatted: '$59.99' }
    ],
    whyYouMightLike: {
      gameplaySummary: 'A visual tour-de-force of psychological survival horror, blending live-action cinema with mind-bending dual-protagonist detective work.',
      highlights: [
        'Dual narrative paths between FBI Agent Saga Anderson and tortured writer Alan Wake',
        'The Mind Place deduction board lets you piece together clues and profile suspects',
        'Unrivaled atmospheric sound design and cutting-edge lighting'
      ],
      idealFor: ['Survival horror fans', 'Fans of Twin Peaks & Stephen King', 'Visual technology enthusiasts']
    }
  },
  {
    id: 'slay-the-spire',
    title: 'Slay the Spire',
    slug: 'slay-the-spire',
    tagline: 'Craft a unique deck, encounter bizarre creatures, and discover relics of immense power.',
    description: 'We fused card games and roguelikes together to make the best single-player deckbuilder we could. Craft a unique deck, encounter bizarre creatures, discover relics of immense power, and Slay the Spire!',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/646570/capsule_616x353.jpg',
    heroImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/646570/library_hero.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/646570/ss_c171816f7ecd35b5b46d2fa27532f4c5b8ca3cc5.1920x1080.jpg?t=1774015376',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/646570/ss_01aa3e7759e457bfbf2422f31c325d7b3ba8a6eb.1920x1080.jpg?t=1774015376',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/646570/ss_b757436d08ba08292796bfed9c60e7cc99d5f2c3.1920x1080.jpg?t=1774015376',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/646570/ss_1299d7fe55771cf564848c5046fbef7936178440.1920x1080.jpg?t=1774015376'
    ],
    releaseDate: '2019-01-23',
    releaseYear: 2019,
    developer: 'Mega Crit Games',
    publisher: 'Humble Bundle',
    genres: ['Roguelike', 'Strategy', 'Indie'],
    platforms: ['PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch', 'Steam Deck'],
    rating: 89,
    reviewCount: 140000,
    popularityScore: 91,
    isFeatured: false,
    isTrending: false,
    isHiddenGem: false,
    isRecentlyReleased: false,
    priceTier: 'Under $40',
    priceFormatted: '$24.99',
    gameModes: ['Single-player'],
    playtimeHours: {
      mainStory: 12,
      completionist: 150
    },
    narrativeDepth: 2,
    difficulty: 'Challenging',
    tags: ['Deckbuilder', 'Roguelike', 'Turn-Based', 'Endless Replayability'],
    stores: [
      { name: 'Steam', storeType: 'Steam', url: 'https://store.steampowered.com/app/646570/Slay_the_Spire/', priceFormatted: '$24.99' }
    ],
    whyYouMightLike: {
      gameplaySummary: 'The undisputed gold standard of deckbuilding roguelikes with mathematically flawless balance.',
      highlights: [
        'Four distinct characters with entirely different card pools and combat philosophies',
        'Hundreds of synergistic relics and card upgrades',
        '20 Ascension difficulty levels for endless mastery testing'
      ],
      idealFor: ['Card strategists', 'Analytical problem solvers', 'On-the-go deckbuilder fans']
    }
  },
  {
    id: 'hi-fi-rush',
    title: 'Hi-Fi RUSH',
    slug: 'hi-fi-rush',
    tagline: 'Feel the beat as wannabe rockstar Chai fights an evil robotic megacorp.',
    description: 'Feel the beat as wannabe rockstar Chai and his ragtag team of allies rebel against an evil tech megacorp with raucous rhythm combat! Everything in the world syncs to the music, from attacks and parries to the environmental factory machinery.',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1817230/capsule_616x353.jpg',
    heroImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1817230/library_hero.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1817230/ss_382e9d5abb00498eee6a86b0366a2db7826268b7.1920x1080.jpg?t=1764916407',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1817230/ss_8a13650ffe930da77593dae80f0118588c46a5ca.1920x1080.jpg?t=1764916407',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1817230/ss_62a7ff68fff7850be6a0784eff41edafd33b2099.1920x1080.jpg?t=1764916407',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1817230/ss_7dfaee4616fbed65b2b0fcb82d55dc0a957fd8a5.1920x1080.jpg?t=1764916407'
    ],
    releaseDate: '2023-01-25',
    releaseYear: 2023,
    developer: 'Tango Gameworks',
    publisher: 'Bethesda Softworks',
    genres: ['Action', 'Platformer'],
    platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S', 'Steam Deck'],
    rating: 87,
    reviewCount: 22000,
    popularityScore: 85,
    isFeatured: false,
    isTrending: false,
    isHiddenGem: true,
    isRecentlyReleased: false,
    priceTier: 'Under $40',
    priceFormatted: '$29.99',
    gameModes: ['Single-player'],
    playtimeHours: {
      mainStory: 11,
      completionist: 28
    },
    narrativeDepth: 3,
    difficulty: 'Moderate',
    tags: ['Rhythm Action', 'Saturday Morning Cartoon', 'Stylized 3D', 'Feel-Good', 'Rock Music'],
    stores: [
      { name: 'Steam', storeType: 'Steam', url: 'https://store.steampowered.com/app/1817230/HiFi_RUSH/', priceFormatted: '$29.99' },
      { name: 'PlayStation Store', storeType: 'PlayStation', url: 'https://store.playstation.com/', priceFormatted: '$29.99' }
    ],
    whyYouMightLike: {
      gameplaySummary: 'A burst of pure, joyful Saturday morning cartoon energy where combo attacks deal mega damage when timed to infectious rock beats.',
      highlights: [
        'Every animation, steam vent, and attack cue moves in lockstep with the licensed soundtrack',
        'Accessible rhythm design: you can never completely miss, but staying on beat unleashes devastating finishers',
        'Hilarious cast of characters and lovable robotic companion 808'
      ],
      idealFor: ['Character action fans (Devil May Cry)', 'Rhythm lovers', 'Gamers seeking upbeat feel-good fun']
    }
  },
  {
    id: 'street-fighter-6',
    title: 'Street Fighter 6',
    slug: 'street-fighter-6',
    tagline: 'Your moment. Your fight. Redefining the fighting game genre.',
    description: 'Powered by Capcom proprietary RE ENGINE, the Street Fighter 6 experience spans across three distinct game modes featuring World Tour, Fighting Ground and Battle Hub. Master the Drive System to parry, rush, and dominate.',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1364780/capsule_616x353.jpg',
    heroImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1364780/library_hero.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1364780/ss_387137f8cccb048c35a8685634372e97785d40aa.1920x1080.jpg?t=1785737403',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1364780/ss_a381f1b3b450c18900d47b991ce8e7456e9cdba5.1920x1080.jpg?t=1785737403',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1364780/ss_f62ce93269a6d8e0027853358af4d6368e2c4b93.1920x1080.jpg?t=1785737403',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1364780/ss_d186566a92ada8cdb08b04769a8c95cd1e380006.1920x1080.jpg?t=1785737403'
    ],
    releaseDate: '2023-06-02',
    releaseYear: 2023,
    developer: 'CAPCOM Co., Ltd.',
    publisher: 'CAPCOM Co., Ltd.',
    genres: ['Fighting', 'Action'],
    platforms: ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X/S', 'Steam Deck'],
    rating: 92,
    reviewCount: 35000,
    popularityScore: 90,
    isFeatured: false,
    isTrending: false,
    isHiddenGem: false,
    isRecentlyReleased: false,
    priceTier: 'Full Price',
    priceFormatted: '$59.99',
    gameModes: ['Single-player', 'Multiplayer', 'PvP'],
    playtimeHours: {
      mainStory: 18,
      completionist: 60
    },
    narrativeDepth: 3,
    difficulty: 'Challenging',
    tags: ['Fighting Game', 'Competitive', 'Rollback Netcode', 'Urban Style', 'Modern Controls'],
    stores: [
      { name: 'Steam', storeType: 'Steam', url: 'https://store.steampowered.com/app/1364780/Street_Fighter_6/', priceFormatted: '$59.99' },
      { name: 'PlayStation Store', storeType: 'PlayStation', url: 'https://store.playstation.com/', priceFormatted: '$59.99' }
    ],
    whyYouMightLike: {
      gameplaySummary: 'The modern gold standard of fighting games featuring state-of-the-art rollback netcode, approachable Modern controls, and high-level Drive Gauge mastery.',
      highlights: [
        'Modern control scheme makes flashy combos accessible without memorizing complex motion inputs',
        'World Tour single-player RPG mode lets you take your custom avatar across the globe',
        'Flawless online netcode and community virtual Battle Hubs'
      ],
      idealFor: ['Fighting game enthusiasts', 'Competitive players', 'Newcomers wanting to learn fighting games']
    }
  },
  {
    id: 'dave-the-diver',
    title: 'Dave the Diver',
    slug: 'dave-the-diver',
    tagline: 'Deep-sea exploration by day, sushi restaurant management by night.',
    description: 'A casual, single-player adventure RPG featuring deep-sea exploration and fishing during the day and sushi restaurant management at night. Join Dave and his quirky friends as they uncover the secrets of the mysterious Blue Hole.',
    coverImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1868140/capsule_616x353.jpg',
    heroImage: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1868140/library_hero.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1868140/ss_7c86a17d545b6260ecdcfdd62622e49dcc9011bd.1920x1080.jpg?t=1786442860',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1868140/ss_783e1f6c2d4c358fb494d055c47c0e888922abd5.1920x1080.jpg?t=1786442860',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1868140/ss_6eac5a3b59e181d1ffa26757b041be521bfe1779.1920x1080.jpg?t=1786442860',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1868140/ss_bc9150385c6fcd41ac7195be36597469f54a792c.1920x1080.jpg?t=1786442860'
    ],
    releaseDate: '2023-06-28',
    releaseYear: 2023,
    developer: 'MINTROCKET',
    publisher: 'MINTROCKET',
    genres: ['Adventure', 'Simulation', 'RPG', 'Indie'],
    platforms: ['PC', 'PlayStation 5', 'PlayStation 4', 'Nintendo Switch', 'Steam Deck'],
    rating: 90,
    reviewCount: 95000,
    popularityScore: 91,
    isFeatured: false,
    isTrending: false,
    isHiddenGem: true,
    isRecentlyReleased: false,
    priceTier: 'Under $20',
    priceFormatted: '$19.99',
    gameModes: ['Single-player'],
    playtimeHours: {
      mainStory: 25,
      completionist: 45
    },
    narrativeDepth: 3,
    difficulty: 'Relaxed',
    tags: ['Cozy Gameplay', 'Pixel Art', 'Fishing', 'Restaurant Sim', 'Underwater'],
    stores: [
      { name: 'Steam', storeType: 'Steam', url: 'https://store.steampowered.com/app/1868140/DAVE_THE_DIVER/', priceFormatted: '$19.99' },
      { name: 'Nintendo eShop', storeType: 'Nintendo', url: 'https://www.nintendo.com/', priceFormatted: '$19.99' }
    ],
    whyYouMightLike: {
      gameplaySummary: 'Addictive loop of harpooning exotic ocean fauna followed by serving high-roller sushi gourmands under cozy neon lighting.',
      highlights: [
        'Ever-shifting Blue Hole underwater ecosystem with surprise boss encounters',
        'Engaging restaurant upgrade loop with custom menus, staff hiring, and tea pouring',
        'Dozens of mini-games and quirky cutscenes filled with charming humor'
      ],
      idealFor: ['Cozy gamers', 'Simulation fans', 'Players who love multi-layered progression loops']
    }
  }
];
