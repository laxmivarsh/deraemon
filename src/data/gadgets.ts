import { Gadget } from '@/types';

export const initialGadgets: Gadget[] = [
  {
    id: 'gadget-1',
    slug: 'anywhere-door',
    name: 'Anywhere Door (Dokodemo Door)',
    japanese_name: 'どこでもドア',
    category: 'Travel & Mobility',
    description: 'A pink door that instantly connects to any location in the universe within a 10 light-year perimeter simply by turning the knob and thinking of the destination.',
    function_details: 'Equipped with a subconscious spatial navigation CPU. Upon grasping the brass doorknob, the door reads the operator\'s cognitive intent, verifies dimensional stability, and folds local spacetime through wormhole topology. Can access past and present eras when synced with a Time Drive.',
    interesting_facts: [
      'Has a safety limit of 10 light years; attempting to reach galaxies further away requires an Astronomical Super-Booster.',
      'If the user does not specify coordinates clearly, it defaults to the place most on their mind—frequently landing Nobita inside Shizuka\'s bathroom.',
      'One of the most frequently used secret gadgets in the entire franchise, appearing in over 600 episodes and nearly every theatrical film.'
    ],
    image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    model_type: 'door',
    color_theme: '#EC4899',
    risk_level: 'Handle With Care',
    first_used_episode: 'Early 1970 Manga Chapters'
  },
  {
    id: 'gadget-2',
    slug: 'take-copter',
    name: 'Take-copter (Bamboo Copter)',
    japanese_name: 'タケコプター',
    category: 'Travel & Mobility',
    description: 'A pocket-sized dual-blade propeller equipped with a suction cup that attaches to the head, granting anti-gravity personal flight.',
    function_details: 'Harnesses a miniaturized zero-point antigravity repulsion field. When attached to clothing or the skull, it creates an anti-gravitational envelope around the wearer\'s body, controlled purely by brainwave impulses for banking, hovering, and diving at speeds up to 80 km/h.',
    interesting_facts: [
      'Has an internal continuous battery lifespan of 8 hours, after which the propeller winds down and must recharge for 4 hours.',
      'Originally named "Heri-tonbo" in early 1969 manga printings before becoming universally standardized as Take-copter.',
      'Flying too fast in cold rain can cause the suction cup to peel if the operator perspires heavily.'
    ],
    image_url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80',
    model_type: 'copter',
    color_theme: '#EAB308',
    risk_level: 'Safe',
    first_used_episode: 'Episode 1: All the Way From the Country of the Future'
  },
  {
    id: 'gadget-3',
    slug: 'time-machine',
    name: 'Time Machine',
    japanese_name: 'タイムマシン',
    category: 'Time & Space',
    description: 'An open-cockpit platform that travels through the hyper-space time continuum, located inside Nobita\'s study desk drawer.',
    function_details: 'Equipped with chrono-thrusters, a digital retro-flux chronometer, and tachyon navigational rudder. Glides through the multidimensional time river, allowing occupants to travel forward and backward by thousands of millions of years.',
    interesting_facts: [
      'Exits directly through the top drawer of Nobita\'s study desk in his Nerima bedroom.',
      'Doraemon\'s model is a budget open-air rug vehicle; Dorami operates a high-tier flower tulip enclosed cabin model.',
      'Temporal Police patrol the time stream to intercept illegal smugglers and prevent paradoxes.'
    ],
    image_url: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=600&q=80',
    model_type: 'timemachine',
    color_theme: '#0284C7',
    risk_level: 'Reality Altering',
    first_used_episode: 'Volume 1, Chapter 1'
  },
  {
    id: 'gadget-4',
    slug: 'small-light',
    name: 'Small Light (Shrink Ray)',
    japanese_name: 'スモールライト',
    category: 'Transformation & Light',
    description: 'A cylindrical flashlight that shrinks any targeted living being or object to microscopic or doll proportions with concentrated reduction waves.',
    function_details: 'Projects a coherent beam of molecular-compression photons that compact atomic spacing without decreasing density or structural integrity. Reversing the process requires the Big Light or waiting for the natural temporal decay of the radiation.',
    interesting_facts: [
      'Often used by Doraemon and friends to enter dollhouses, micro-submarines, or Nobita\'s digestive tract for rescue operations.',
      'The battery lasts an extraordinarily long time, but if dropped into water, the beam can accidentally scatter.',
      'In "Nobita\'s Little Star Wars", the gang teams up with miniature alien President Papi using the Small Light.'
    ],
    image_url: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=600&q=80',
    model_type: 'light',
    color_theme: '#38BDF8',
    risk_level: 'Handle With Care',
    first_used_episode: 'Manga Volume 5'
  },
  {
    id: 'gadget-5',
    slug: 'big-light',
    name: 'Big Light (Magnifying Ray)',
    japanese_name: 'ビッグライト',
    category: 'Transformation & Light',
    description: 'The counter-gadget to the Small Light, emitting expansion radiation that enlarges targeted objects to colossal proportions.',
    function_details: 'Projects an atomic-dilatation matrix. Enlarges insects, toys, and foods up to skyscraper scale. Crucial for countering giant monsters or enlarging single Dorayaki pancakes to the size of a bouncy castle.',
    interesting_facts: [
      'When Nobita accidentally enlarges a cockroach, the resulting monstrosity causes neighborhood panic.',
      'Reverses the shrinking effects of the Small Light instantly with zero lingering side effects.'
    ],
    image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    model_type: 'light',
    color_theme: '#F97316',
    risk_level: 'Handle With Care',
    first_used_episode: 'Volume 21'
  },
  {
    id: 'gadget-6',
    slug: 'translation-jelly',
    name: 'Translation Jelly (Honyaku Konnyaku)',
    japanese_name: 'ほんやくコンニャク',
    category: 'Communication & Daily',
    description: 'A slab of delicious konjac jelly that instantly bestows fluency in every galactic language upon ingestion.',
    function_details: 'Once chewed and swallowed, the jelly chemically bonds with the speech and auditory centers of the cerebral cortex, translating alien dialects, ancient hieroglyphs, and animal speech into seamless native dialogue.',
    interesting_facts: [
      'Tastes like bland jelly in standard models, though flavored varieties (soy sauce, miso, and red bean flavor) exist in deluxe 22nd-century supermarkets.',
      'Enables communication with prehistoric tribes, extraterrestrials, and even robotic civilizations in theatrical films.'
    ],
    image_url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    model_type: 'generic',
    color_theme: '#A855F7',
    risk_level: 'Safe',
    first_used_episode: 'Volume 12'
  },
  {
    id: 'gadget-7',
    slug: 'memory-bread',
    name: 'Memory Bread (Anki-pan)',
    japanese_name: 'アンキパン',
    category: 'Communication & Daily',
    description: 'Sliced bread that absorbs notebook pages when pressed onto text; eating the toasted slice instantly imprints the information into your memory.',
    function_details: 'The bread\'s surface functions as biological optical storage. Once digested, neuro-nutrients upload the copied text, equations, and diagrams directly to long-term memory cells. However, if the user suffers an upset stomach and excretes the bread, the knowledge vanishes instantly.',
    interesting_facts: [
      'Nobita used this before a big test and memorized his entire textbook, but ate so many slices he suffered indigestion before class started.',
      'One of the most wished-for gadgets by real-world students across Asia during examination seasons.'
    ],
    image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    model_type: 'generic',
    color_theme: '#D97706',
    risk_level: 'Safe',
    first_used_episode: 'Manga Volume 2'
  },
  {
    id: 'gadget-8',
    slug: 'air-cannon',
    name: 'Air Cannon (Kuuki-hou)',
    japanese_name: '空気砲',
    category: 'Action & Play',
    description: 'A cylindrical tube slipped over the wrist that launches compressed shockwaves of high-velocity air upon shouting "Bang!".',
    function_details: 'Compresses ambient air inside an acoustic chamber and releases a non-lethal sonic concussion slug triggered by the wearer\'s vocal frequency. Used as primary defense against alien invaders and rogue robots.',
    interesting_facts: [
      'Features a safety dial: setting 1 produces a mild gust; setting 10 can shatter reinforced concrete boulders.',
      'Nobita is an absolute deadeye sniper with the Air Cannon, often out-shooting elite interstellar warriors.'
    ],
    image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    model_type: 'cannon',
    color_theme: '#64748B',
    risk_level: 'Handle With Care',
    first_used_episode: 'Volume 4'
  },
  {
    id: 'gadget-9',
    slug: 'what-if-phone-booth',
    name: 'What-If Phone Booth (Moshimo Box)',
    japanese_name: 'もしもボックス',
    category: 'Time & Space',
    description: 'A vintage red telephone booth that temporarily rewires reality into a parallel universe where any "What if..." scenario is true.',
    function_details: 'Upon picking up the handset and reciting "What if [scenario] was true?", quantum branch generators spin up an alternate timeline manifold. Entering the booth again and requesting "Please return the world to normal" restores baseline reality.',
    interesting_facts: [
      'Nobita once created a world without money (where people got paid to take items), and a world where magic replaced science.',
      'Classified as one of the most powerful reality-altering gadgets in the 22nd century.'
    ],
    image_url: 'https://images.unsplash.com/photo-1520923642038-b4259aceffd7?auto=format&fit=crop&w=600&q=80',
    model_type: 'generic',
    color_theme: '#EF4444',
    risk_level: 'Reality Altering',
    first_used_episode: 'Volume 11'
  },
  {
    id: 'gadget-10',
    slug: 'pass-loop',
    name: 'Pass Loop (Toorinuke Hoop)',
    japanese_name: '通りぬけフープ',
    category: 'Travel & Mobility',
    description: 'A flexible hoop that creates an instantaneous spatial passage through any solid wall, door, or rock surface when pressed against it.',
    function_details: 'Creates a temporary localized sub-atomic gateway that neutralizes the electromagnetic repulsion of solid matter, allowing people to step through walls without causing structural damage.',
    interesting_facts: [
      'Can be stuck onto floors to drop into subterranean basements or secret underground caves.',
      'If someone pulls the hoop off the wall while you are halfway through, you may become comically stuck.'
    ],
    image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    model_type: 'generic',
    color_theme: '#06B6D4',
    risk_level: 'Safe',
    first_used_episode: 'Volume 9'
  },
  {
    id: 'gadget-11',
    slug: 'time-cloth',
    name: 'Time Furoshiki (Time Cloth)',
    japanese_name: 'タイムふろしき',
    category: 'Time & Space',
    description: 'A reversible square wrapping cloth; red advances time forward, while blue reverses time backward.',
    function_details: 'Wrapping an ancient fossil in the blue side reverts it to a living dinosaur egg; wrapping a broken TV in the blue side restores it to brand new showroom condition. Wrapping an adult in the red side ages them into an elder.',
    interesting_facts: [
      'Extremely useful for fixing broken vases and antique clocks Nobita accidentally smashes.',
      'Can restore stale bread to fresh piping-hot pastry in seconds.'
    ],
    image_url: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=600&q=80',
    model_type: 'generic',
    color_theme: '#8B5CF6',
    risk_level: 'Handle With Care',
    first_used_episode: 'Volume 2'
  },
  {
    id: 'gadget-12',
    slug: 'gourmet-tablecloth',
    name: 'Gourmet Tablecloth (Gourmet Tablecloth)',
    japanese_name: 'グルメテーブルかけ',
    category: 'Communication & Daily',
    description: 'A picnic cloth that instantly synthesizes any requested delicacy, hot meal, or dessert out of thin air upon vocal command.',
    function_details: 'Equipped with subatomic matter-synthesizers. Speaking any food name ("Steak with garlic butter!", "Giant bowl of tonkotsu ramen!", "Warm Dorayaki!") materializes the piping-hot dish in elegant tableware.',
    interesting_facts: [
      'The generated food has zero calories unless nutritional balance is requested, making it the ultimate dream banquet gadget.',
      'Saved the group from starvation on deserted islands, prehistoric forests, and distant galaxy outposts.'
    ],
    image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    model_type: 'generic',
    color_theme: '#10B981',
    risk_level: 'Safe',
    first_used_episode: 'Volume 32'
  }
];
