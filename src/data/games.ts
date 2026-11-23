import { QuizQuestion } from '@/types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q-1',
    question: 'What is Doraemon\'s exact official manufacture birthday in the 22nd century?',
    options: ['September 3, 2112', 'August 15, 2100', 'January 1, 2200', 'December 2, 2114'],
    correct_answer: 0,
    explanation: 'Doraemon was manufactured on September 3, 2112 at the Matsushiba Robot Factory.',
    difficulty: 'easy',
    category: 'Lore'
  },
  {
    id: 'q-2',
    question: 'What is Doraemon\'s all-time favorite Japanese snack?',
    options: ['Taiyaki', 'Dorayaki (Red bean pancake sandwich)', 'Mitarashi Dango', 'Melon Pan'],
    correct_answer: 1,
    explanation: 'Doraemon is wildly passionate about Dorayaki and can be easily bribed with a fresh batch.',
    difficulty: 'easy',
    category: 'Characters'
  },
  {
    id: 'q-3',
    question: 'What incident originally caused Doraemon to lose his ears and turn sky blue?',
    options: [
      'A mechanical mouse nibbled them off, and his tears washed away his yellow paint',
      'He was born without ears in the factory',
      'Gian pulled them off during a fight',
      'An accident with the Small Light shrunk them permanently'
    ],
    correct_answer: 0,
    explanation: 'A robotic mouse chewed his ears while he slept. His three-day sorrow washed his yellow paint away, exposing his blue undercoat and instilling a lifelong mouse phobia.',
    difficulty: 'medium',
    category: 'Lore'
  },
  {
    id: 'q-4',
    question: 'What special hidden talent does Nobita possess that shocks everyone?',
    options: ['Olympic-level sharpshooting & Ayatori string art', 'Violin mastery', 'Gourmet cooking', 'Long-distance running'],
    correct_answer: 0,
    explanation: 'Nobita is an unmatched deadeye marksman with toy guns and air cannons, and an Ayatori string master.',
    difficulty: 'medium',
    category: 'Characters'
  },
  {
    id: 'q-5',
    question: 'What is the maximum operating distance limit of the Anywhere Door before requiring boosters?',
    options: ['10 Light Years', '100,000 Kilometers', 'The Earth\'s atmosphere only', 'Unlimited galactic radius'],
    correct_answer: 0,
    explanation: 'The standard Anywhere Door connects to destinations within a 10 light-year boundary.',
    difficulty: 'hard',
    category: 'Gadgets'
  },
  {
    id: 'q-6',
    question: 'How fast can Nobita fall asleep once his head touches a pillow?',
    options: ['0.93 seconds', '3.5 seconds', '12 seconds', '30 seconds'],
    correct_answer: 0,
    explanation: 'Nobita set the world record by falling completely asleep in exactly 0.93 seconds!',
    difficulty: 'hard',
    category: 'Characters'
  }
];

export interface GuessCharacterClue {
  id: string;
  name: string;
  silhouette_hint: string;
  clues: string[];
  image_url: string;
}

export const characterGuessData: GuessCharacterClue[] = [
  {
    id: 'gc-1',
    name: 'Doraemon',
    silhouette_hint: 'Round blue silhouette with a golden bell collar and red nose',
    clues: [
      'I am terrified of small rodents with whiskers.',
      'I have an infinite pocket that defies 3-dimensional physics.',
      'My favorite food has sweet azuki red bean paste inside.'
    ],
    image_url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gc-2',
    name: 'Nobita Nobi',
    silhouette_hint: 'Glasses, yellow polo shirt, blue shorts, messy hair',
    clues: [
      'I hold the world record for the fastest afternoon catnap (0.93s).',
      'I hide test papers with zero marks from my mother.',
      'I dream of marrying Shizuka in the future.'
    ],
    image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gc-3',
    name: 'Shizuka Minamoto',
    silhouette_hint: 'Twin pigtails, pink dress, gentle posture',
    clues: [
      'I practice playing the violin, even if it hurts my friends\' ears.',
      'I love hot relaxing baths and sweet baked sweet potatoes.',
      'I always treat Nobita with gentle kindness and encourage him to study.'
    ],
    image_url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gc-4',
    name: 'Takeshi "Gian" Goda',
    silhouette_hint: 'Broad, tall build with an orange striped sweater',
    clues: [
      'My motto is "What\'s yours is mine, and what\'s mine is mine!"',
      'I force everyone to attend my terrible pop concert recitals.',
      'I run a grocery store with my mom and fiercely protect my sister Jaiko.'
    ],
    image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'
  }
];

export interface MemoryCard {
  id: number;
  pairId: string;
  name: string;
  iconName: string;
  color: string;
}

export const memoryCardPairs = [
  { pairId: 'doraemon', name: 'Doraemon', iconName: 'Cat', color: 'bg-sky-500' },
  { pairId: 'bell', name: 'Collar Bell', iconName: 'Bell', color: 'bg-amber-400' },
  { pairId: 'door', name: 'Anywhere Door', iconName: 'DoorOpen', color: 'bg-pink-500' },
  { pairId: 'copter', name: 'Take-copter', iconName: 'Fan', color: 'bg-yellow-400' },
  { pairId: 'time', name: 'Time Machine', iconName: 'Clock', color: 'bg-indigo-500' },
  { pairId: 'bread', name: 'Memory Bread', iconName: 'BookOpen', color: 'bg-amber-600' },
  { pairId: 'dorayaki', name: 'Dorayaki', iconName: 'Cookie', color: 'bg-orange-600' },
  { pairId: 'pocket', name: '4D Pocket', iconName: 'Sparkles', color: 'bg-blue-600' }
];
