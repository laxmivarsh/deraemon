import { Character } from '@/types';

export const initialCharacters: Character[] = [
  {
    id: 'char-1',
    slug: 'doraemon',
    name: 'Doraemon',
    japanese_name: 'ドラえもん',
    category: 'Main Characters',
    short_intro: 'The beloved robotic cat from the 22nd century sent back in time to guide and protect Nobita Nobi.',
    biography: 'Manufactured on September 3, 2112 at the Matsushiba Robot Factory (model MS-903), Doraemon was originally a yellow robotic cat with ears. After a mechanical robotic mouse nibbled off his ears, he fell into deep sorrow, and his tears washed away his yellow paint, revealing his iconic sky-blue hue. He traveled back to the 20th century via the time machine in Nobita\'s desk drawer on a mission commissioned by Sewashi to rewrite the Nobi family fate.',
    personality: 'Compassionate, loyal, highly protective of Nobita, though prone to panic when mice appear. He can be easily persuaded or bribed with delicious Dorayaki pancakes.',
    favourite_food: 'Dorayaki (Red bean pancake sandwich)',
    first_appearance: 'Manga: December 1969; Anime: 1973 / 1979 premiere episode',
    relationships: {
      family: ['Sewashi Nobi (Original 22nd-century owner)', 'Dorami (Cherished younger sister)'],
      friends: ['Nobita Nobi (Best friend & partner)', 'Shizuka Minamoto', 'Takeshi "Gian" Goda', 'Suneo Honekawa', 'Mii-chan (Romantic feline interest)'],
      rivals: ['Mice (Mortal terror & nemesis)']
    },
    interesting_facts: [
      'Has a secret 4-dimensional pocket attached to his belly with infinite internal capacity.',
      'His body dimensions are all themed around the number 129.3 (Height: 129.3 cm, Weight: 129.3 kg, Chest circumference: 129.3 cm, Running speed: 129.3 km/h when terrified of mice).',
      'His red tail doubles as an emergency system switch; pulling it shuts him down temporarily.'
    ],
    image_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    color_theme: '#008CD7',
    sound_voice_quote: 'Boku Doraemon! (I am Doraemon!)',
    stats: {
      kindness: 98,
      intelligence: 85,
      courage: 92,
      luck: 78,
      gadget_affinity: 100
    },
    related_characters: ['nobita-nobi', 'dorami', 'mini-doras', 'sewashi', 'mii-chan']
  },
  {
    id: 'char-2',
    slug: 'nobita-nobi',
    name: 'Nobita Nobi',
    japanese_name: '野比のび太',
    category: 'Main Characters',
    short_intro: 'A gentle-hearted, lazy elementary school boy who dreams of a bright future with Shizuka.',
    biography: 'Nobita is a fourth-grader (fifth in some adaptations) living in the Nerima Ward of Tokyo. Known for receiving zero marks on tests and being late to school, he possesses an extraordinary heart, unmatched sharpshooting marksmanship, and world-record catnapping speeds. Despite his flaws, his empathy towards all living creatures makes him a true hero during critical adventures.',
    personality: 'Sensitive, kind-hearted, easily discouraged yet fiercely brave when his friends or nature are threatened. Enjoys afternoon naps, reading comic books, and Cat\'s Cradle (Ayatori).',
    favourite_food: 'Sashimi, ramen, and his mother Tamako\'s home cooking',
    first_appearance: 'December 1969 Manga Premiere',
    relationships: {
      family: ['Tamako Nobi (Mother)', 'Nobisuke Nobi (Father)', 'Sewashi Nobi (Great-great-grandson)'],
      friends: ['Doraemon (Guardian & best friend)', 'Shizuka Minamoto (Future wife)', 'Gian Goda', 'Suneo Honekawa']
    },
    interesting_facts: [
      'Can fall asleep in exactly 0.93 seconds after his head touches the pillow.',
      'Possesses Olympic-level marksmanship skills with toy guns, laser blasters, and air cannons.',
      'A master of Ayatori (string figures), capable of crafting intricate 3D string sculptures.'
    ],
    image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    color_theme: '#EAB308',
    sound_voice_quote: 'Doraemonnn! Tasukete! (Doraemon, save me!)',
    stats: {
      kindness: 99,
      intelligence: 42,
      courage: 82,
      luck: 35,
      gadget_affinity: 70
    },
    related_characters: ['doraemon', 'shizuka-minamoto', 'takeshi-gian-goda', 'suneo-honekawa']
  },
  {
    id: 'char-3',
    slug: 'shizuka-minamoto',
    name: 'Shizuka Minamoto',
    japanese_name: '源静香',
    category: 'Main Characters',
    short_intro: 'The intelligent, sweet, and considerate girl of the group who loves playing the violin and taking baths.',
    biography: 'Shizuka is Nobita\'s neighborhood classmate and future wife. She is polite, diligent, and beloved by everyone in school. While she plays piano gracefully under her mother\'s guidance, her violin practice produces comically ear-piercing notes. She often acts as the moral anchor of the group, reconciling Gian and Suneo with Nobita.',
    personality: 'Empathetic, studious, polite, and strong-willed. She cannot stand seeing animals mistreated or friends bullied.',
    favourite_food: 'Baked sweet potatoes (Yaki-imo), though she keeps this a bashful secret; cheesecake, pancakes',
    first_appearance: 'December 1969 Manga Premiere',
    relationships: {
      family: ['Mrs. Minamoto (Mother)', 'Yoshio Minamoto (Father)'],
      friends: ['Nobita Nobi (Future husband)', 'Doraemon', 'Hidetoshi Dekisugi (Study partner)', 'Gian Goda', 'Suneo Honekawa']
    },
    interesting_facts: [
      'Takes an average of three relaxing baths a day, which Nobita inadvertently interrupts using the Anywhere Door.',
      'Her violin playing sounds remarkably similar to Gian\'s singing voice.',
      'In the future, she chooses to marry Nobita because "if I am not with him, he will always be in trouble."'
    ],
    image_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    color_theme: '#EC4899',
    sound_voice_quote: 'Nobita-san, let us study together!',
    stats: {
      kindness: 97,
      intelligence: 94,
      courage: 80,
      luck: 88,
      gadget_affinity: 86
    },
    related_characters: ['nobita-nobi', 'doraemon', 'hidetoshi-dekisugi']
  },
  {
    id: 'char-4',
    slug: 'takeshi-gian-goda',
    name: 'Takeshi "Gian" Goda',
    japanese_name: '剛田武 (ジャイアン)',
    category: 'Main Characters',
    short_intro: 'The physically strong neighborhood leader with an explosive temper and an unbearable singing voice.',
    biography: 'Takeshi, widely known by his nickname Gian (derived from giant), is the strongest kid on the block. His family operates the Goda grocery store. While frequently bullying Nobita and confiscating comics with his infamous motto ("What\'s yours is mine, and what\'s mine is mine"), Gian turns into an intensely heroic, loyal, and fearless comrade whenever his friends face grave danger in theatrical movies.',
    personality: 'Boisterous, athletic, hot-tempered, yet devoted to his little sister Jaiko and fiercely honorable in dire times.',
    favourite_food: 'Ramen, tonkatsu, and his own disastrous culinary concoctions (Gian Stew)',
    first_appearance: 'December 1969 Manga Premiere',
    relationships: {
      family: ['Mrs. Goda (Mother & the only person he fears)', 'Mr. Goda (Father)', 'Jaiko Goda (Beloved younger sister)'],
      friends: ['Suneo Honekawa (Sidekick & buddy)', 'Nobita Nobi', 'Doraemon']
    },
    interesting_facts: [
      'Dreams of becoming a superstar pop singer and forces the neighborhood to attend his terrifying open-air concerts.',
      'Terrified of his stern mother, who frequently drags him away by the ear to watch the grocery store.',
      'In feature films and world-saving adventures, Gian is consistently the most dependable frontline fighter.'
    ],
    image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    color_theme: '#F97316',
    sound_voice_quote: 'Ore wa Gian! Gaki-taishou! (I am Gian! The boss kid!)',
    stats: {
      kindness: 70,
      intelligence: 60,
      courage: 98,
      luck: 75,
      gadget_affinity: 65
    },
    related_characters: ['suneo-honekawa', 'jaiko', 'nobita-nobi', 'doraemon']
  },
  {
    id: 'char-5',
    slug: 'suneo-honekawa',
    name: 'Suneo Honekawa',
    japanese_name: '骨川スネ夫',
    category: 'Main Characters',
    short_intro: 'The wealthy, sharp-tongued boy who loves boasting about his luxury gadgets, vacations, and model kits.',
    biography: 'Suneo belongs to the affluent Honekawa family. Recognized by his fox-like hair silhouette and prominent front teeth, he frequently pairs up with Gian to tease Nobita. Despite his snootiness, Suneo is immensely talented in mechanical modeling, radio-controlled vehicles, and science facts. He holds secret insecurities regarding his height and can be easily moved to tears in moments of peril.',
    personality: 'Shrewd, narcissistic, prideful, yet creative, mechanically gifted, and deeply appreciative of his friends.',
    favourite_food: 'Gourmet French cuisine, high-grade steak, and imported Swiss chocolates',
    first_appearance: 'December 1969 Manga Premiere',
    relationships: {
      family: ['Mrs. Honekawa (Mother with matching hairstyle)', 'Mr. Honekawa (Successful businessman)', 'Sunetsugu (Little brother living in New York)'],
      friends: ['Gian Goda (Alliance partner)', 'Nobita Nobi', 'Doraemon', 'Shizuka Minamoto']
    },
    interesting_facts: [
      'Spends hours admiring his reflection in front of the mirror, convinced he is an exceptionally handsome boy.',
      'Possesses elite-level craft skills; he builds remote-controlled tanks, battleships, and custom dioramas from scratch.',
      'Frequently invites Shizuka and Gian on luxury yacht cruises or ski trips, leaving Nobita behind with comical excuses.'
    ],
    image_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    color_theme: '#06B6D4',
    sound_voice_quote: 'Mama~! Gian took my RC car!',
    stats: {
      kindness: 65,
      intelligence: 88,
      courage: 60,
      luck: 92,
      gadget_affinity: 84
    },
    related_characters: ['takeshi-gian-goda', 'nobita-nobi', 'doraemon']
  },
  {
    id: 'char-6',
    slug: 'dorami',
    name: 'Dorami',
    japanese_name: 'ドラミ',
    category: 'Future Characters',
    short_intro: 'Doraemon\'s cheerful, brilliant, and responsible younger sister who lives in the 22nd century.',
    biography: 'Born on December 2, 2114, Dorami was constructed from the same batch of oil as Doraemon. Because the oil had settled, she received the richer top layer, granting her higher processing power (10,000 horsepower compared to Doraemon\'s 129.3 hp). Instead of cat ears, she wears a red ribbon bow that functions as high-sensitivity auditory radar. She stays with Sewashi in the future and visits the 20th century whenever Doraemon needs emergency maintenance or guidance.',
    personality: 'Perky, exceptionally neat, reliable, and organized. She has a deep fear of cockroaches.',
    favourite_food: 'Melon Pan (Sweet melon bread)',
    first_appearance: '1973 Manga Special Chapter',
    relationships: {
      family: ['Doraemon (Beloved older brother)', 'Sewashi Nobi (Owner & family companion)'],
      friends: ['Nobita Nobi', 'Shizuka Minamoto', 'Mini-Doras']
    },
    interesting_facts: [
      'Her ribbon doubles as an ultra-sensitive acoustic sensor that can detect distant vibrations.',
      'Operates a floral tulip-shaped Time Machine, far cleaner and modern than Doraemon\'s rug carpet.',
      'Has 10,000 horsepower, making her vastly stronger mechanically than her big brother.'
    ],
    image_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    color_theme: '#F59E0B',
    sound_voice_quote: 'Onii-chan! Are you eating Dorayaki again?',
    stats: {
      kindness: 96,
      intelligence: 98,
      courage: 90,
      luck: 95,
      gadget_affinity: 98
    },
    related_characters: ['doraemon', 'sewashi', 'nobita-nobi']
  },
  {
    id: 'char-7',
    slug: 'hidetoshi-dekisugi',
    name: 'Hidetoshi Dekisugi',
    japanese_name: '出木杉英才',
    category: 'School Friends',
    short_intro: 'The handsome prodigy classmate who excels at academics, sports, cooking, and philosophy.',
    biography: 'His surname "Dekisugi" is a playful Japanese pun meaning "over-achiever" or "too perfect". Dekisugi consistently scores 100 on every test, leads the school baseball team, paints masterfully, and reads classical world literature. He is cordial and supportive towards Nobita, never looking down on anyone. Nobita views him as his greatest romantic rival for Shizuka\'s affection.',
    personality: 'Gentlemanly, modest, scholarly, and unfailingly polite. Never boasts about his immense talents.',
    favourite_food: 'Pasta, fruit tarts, and gourmet tea',
    first_appearance: 'April 1979 Episode',
    relationships: {
      friends: ['Shizuka Minamoto (Intellectual discussion partner)', 'Nobita Nobi (Classmate & respectful friend)', 'Doraemon']
    },
    interesting_facts: [
      'In future timelines, he grows up to become an acclaimed international astronaut and scientist.',
      'Never uses gadgets to cheat or shortcut tests, stating that genuine effort provides the true joy of learning.'
    ],
    image_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    color_theme: '#3B82F6',
    sound_voice_quote: 'Reading classical history helps us understand the universe.',
    stats: {
      kindness: 94,
      intelligence: 100,
      courage: 85,
      luck: 90,
      gadget_affinity: 75
    },
    related_characters: ['shizuka-minamoto', 'nobita-nobi']
  },
  {
    id: 'char-8',
    slug: 'tamako-nobi',
    name: 'Tamako Nobi',
    japanese_name: '野比玉子',
    category: 'Family Members',
    short_intro: 'Nobita\'s stern, hardworking mother who manages the household with strict discipline.',
    biography: 'Tamako is the matriarch of the Nobi family. Her daily routine involves maintaining an impeccably clean home, grocery budgeting, and uncovering the zero-score test papers Nobita desperately hides under his tatami mats, ceiling, or garbage bin. Despite her explosive 2-hour scolding lectures, her deep love for Nobita and gratitude toward Doraemon are evident throughout the series.',
    personality: 'Pragmatic, resolute, quick-tempered when provoked, yet deeply nurturing and family-oriented.',
    favourite_food: 'Traditional Japanese tea, seasonal persimmons, and sweet wagashi',
    first_appearance: 'December 1969 Manga Premiere',
    relationships: {
      family: ['Nobisuke Nobi (Husband)', 'Nobita Nobi (Son)', 'Doraemon (Adopted family member)', 'Sewashi Nobi (Descendant)']
    },
    interesting_facts: [
      'Can detect a hidden test paper anywhere inside the house through maternal intuition.',
      'Was once an athletic, energetic schoolgirl with dreams of studying botany.',
      'Consistently treats Doraemon as her eldest son, washing his futon and preparing his dorayaki.'
    ],
    image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    color_theme: '#A855F7',
    sound_voice_quote: 'NOBITA!! Where did you hide your test paper?!',
    stats: {
      kindness: 88,
      intelligence: 82,
      courage: 95,
      luck: 70,
      gadget_affinity: 50
    },
    related_characters: ['nobita-nobi', 'nobisuke-nobi', 'doraemon']
  },
  {
    id: 'char-9',
    slug: 'nobisuke-nobi',
    name: 'Nobisuke Nobi',
    japanese_name: '野比のび助',
    category: 'Family Members',
    short_intro: 'Nobita\'s easygoing, golf-loving father who works as a dedicated company salaryman.',
    biography: 'Nobisuke is a typical Japanese "sarariman" (office worker) who commutes tirelessly by train to support his family. In his youth, he had artistic talent and was offered an art scholarship, which he declined to care for his family. He loves golfing with colleagues, relaxing with a cold evening drink, and occasionally sympathizes with Nobita\'s academic struggles.',
    personality: 'Jovial, mild-mannered, fond of daytime daydreaming and occasional golfing excursions.',
    favourite_food: 'Sake, grilled yakitori skewers, and fresh sashimi',
    first_appearance: 'December 1969 Manga Premiere',
    relationships: {
      family: ['Tamako Nobi (Wife)', 'Nobita Nobi (Son)', 'Doraemon (Cherished companion)']
    },
    interesting_facts: [
      'Has repeatedly failed his driver\'s license examination, providing continuous running gags.',
      'Possessed outstanding oil painting skills in his youth before pursuing commercial employment.'
    ],
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    color_theme: '#64748B',
    sound_voice_quote: 'Ah, a warm bath after work is the greatest pleasure in life.',
    stats: {
      kindness: 92,
      intelligence: 78,
      courage: 72,
      luck: 70,
      gadget_affinity: 60
    },
    related_characters: ['nobita-nobi', 'tamako-nobi', 'doraemon']
  },
  {
    id: 'char-10',
    slug: 'sewashi',
    name: 'Sewashi Nobi',
    japanese_name: '野比セワシ',
    category: 'Future Characters',
    short_intro: 'Nobita\'s great-great-grandson from the 22nd century who dispatched Doraemon to change history.',
    biography: 'Living in the impoverished future caused by Nobita\'s disastrous business mistakes (including burning down his newly founded company with celebratory fireworks), Sewashi struggled to afford modern luxury robots. With his pocket money, he purchased the decommissioned Doraemon at an auction and sent him back 100 years into the past so Nobita could grow into a responsible adult.',
    personality: 'Thoughtful, visionary, practical, and deeply devoted to redeeming his family\'s destiny.',
    favourite_food: '22nd-century synthetic energy parfait and space noodles',
    first_appearance: 'Chapter 1 Manga Premiere',
    relationships: {
      family: ['Nobita Nobi (Great-great-grandfather)', 'Dorami (Companion robot)'],
      friends: ['Doraemon (First robot friend)']
    },
    interesting_facts: [
      'Thanks to Doraemon\'s interventions, the future timeline shifted so the Nobi descendants prospered happily.',
      'Shares identical facial traits with Nobita, but with significantly sharper wits and technological literacy.'
    ],
    image_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80',
    color_theme: '#10B981',
    sound_voice_quote: 'Doraemon, please take care of my great-great-grandfather!',
    stats: {
      kindness: 90,
      intelligence: 91,
      courage: 84,
      luck: 85,
      gadget_affinity: 95
    },
    related_characters: ['doraemon', 'nobita-nobi', 'dorami']
  },
  {
    id: 'char-11',
    slug: 'jaiko',
    name: 'Jaiko Goda',
    japanese_name: 'ジャイ子 (剛田ジャイ子)',
    category: 'Supporting Characters',
    short_intro: 'Gian\'s younger sister who aspires to be a professional manga creator under her pen name Christine Goda.',
    biography: 'In the original un-altered timeline, Nobita was destined to marry Jaiko after failing college. In the rewritten timeline, Jaiko develops an intense passion for drawing shojo manga, writing under the artistic pseudonym "Christine Goda". Her big brother Gian acts as her fiercely protective manager, intimidating neighbors into reading and praising her manuscripts.',
    personality: 'Sensitive, creative, determined, and deeply passionate about narrative storytelling and illustration.',
    favourite_food: 'Sweet bean jelly (Yokan) and strawberry parfaits',
    first_appearance: 'Manga Volume 1',
    relationships: {
      family: ['Takeshi "Gian" Goda (Protective brother)', 'Mrs. Goda (Mother)'],
      friends: ['Nobita Nobi', 'Shizuka Minamoto']
    },
    interesting_facts: [
      'Her official real first name was never revealed by author Fujiko F. Fujio to prevent schoolgirls with the same name from being teased.',
      'Her manga writing improves dramatically over the years, earning honest awards in regional competitions.'
    ],
    image_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    color_theme: '#D946EF',
    sound_voice_quote: 'My manga requires genuine passion and raw emotions!',
    stats: {
      kindness: 86,
      intelligence: 82,
      courage: 80,
      luck: 76,
      gadget_affinity: 60
    },
    related_characters: ['takeshi-gian-goda', 'nobita-nobi']
  },
  {
    id: 'char-12',
    slug: 'mini-doras',
    name: 'Mini-Doras',
    japanese_name: 'ミニドラ',
    category: 'Future Characters',
    short_intro: 'Adorable palm-sized miniature replicas of Doraemon with their own tiny pocket of mini-gadgets.',
    biography: 'Mini-Doras are pocket-sized support robots manufactured to celebrate Doraemon\'s heroics in capturing a notorious time criminal. They speak in a cheerful high-pitched language called "Dorarara" that only Doraemon and select friends can comprehend. Despite their tiny scale, their micro-gadgets function with complete physical accuracy.',
    personality: 'Mischievous, energetic, helpful, and easily excited by crumbs of dorayaki.',
    favourite_food: 'Miniature Dorayaki pancakes',
    first_appearance: '1973 Manga & 1989 Theatrical Special',
    relationships: {
      family: ['Doraemon (Inspiration & big brother figure)', 'Dorami'],
      friends: ['Nobita Nobi']
    },
    interesting_facts: [
      'Communicate exclusively through charming variations of "Dora-dora!" sounds.',
      'Come in various colored outfits: red, yellow, and green mini-models.',
      'Can crawl through keyholes, pipes, and machinery to fix mechanical defects from inside.'
    ],
    image_url: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80',
    color_theme: '#EF4444',
    sound_voice_quote: 'Dora-dora! Dorara!',
    stats: {
      kindness: 98,
      intelligence: 80,
      courage: 88,
      luck: 92,
      gadget_affinity: 96
    },
    related_characters: ['doraemon', 'dorami', 'nobita-nobi']
  },
  {
    id: 'char-13',
    slug: 'mii-chan',
    name: 'Mii-chan',
    japanese_name: 'ミイちゃん',
    category: 'Supporting Characters',
    short_intro: 'The charming neighborhood white cat who is the object of Doraemon\'s romantic feline daydreams.',
    biography: 'Mii-chan is a regular neighborhood cat with pristine white fur and a pink ribbon collar. Doraemon frequently goes out on neighborhood fence strolls with her, sharing snacks and showing off his gadgets to impress her. When street strays or rival alley cats threaten her, Doraemon immediately rushes to her rescue.',
    personality: 'Graceful, gentle, inquisitive, and fond of rooftop strolls.',
    favourite_food: 'Fresh tuna, premium milk, and catnip treats',
    first_appearance: 'Early Manga Serializations',
    relationships: {
      friends: ['Doraemon (Devoted robotic suitor)']
    },
    interesting_facts: [
      'Doraemon frequently purchases expensive 22nd-century cat delicacies just to win her affection.',
      'Sometimes gets terrified when Doraemon pulls out an enormous metallic gadget in excitement.'
    ],
    image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    color_theme: '#F43F5E',
    sound_voice_quote: 'Nya~ (Meow~)',
    stats: {
      kindness: 95,
      intelligence: 75,
      courage: 70,
      luck: 88,
      gadget_affinity: 50
    },
    related_characters: ['doraemon']
  }
];
