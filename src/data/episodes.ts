import { Series, Episode } from '@/types';

export const seriesList: Series[] = [
  {
    id: 'series-1979',
    title: 'Doraemon (1979 - 2005 Classic Series)',
    era: '1979 Series',
    start_year: 1979,
    end_year: 2005,
    total_episodes: 1787,
    description: 'The monumental 26-year television series produced by Shin-Ei Animation with Nobuyo Oyama as the iconic voice of Doraemon. Defined generations of childhood across Japan, Asia, Europe, and the world.'
  },
  {
    id: 'series-2005',
    title: 'Doraemon (2005 - Present Modern Series)',
    era: '2005 Series',
    start_year: 2005,
    total_episodes: 1300,
    description: 'The revitalized modern high-definition era featuring Wasabi Mizuta as Doraemon, updated character designs faithful to Fujiko F. Fujio’s original manga, and cutting-edge digital animation.'
  }
];

export const initialEpisodes: Episode[] = [
  {
    id: 'ep-1',
    series_id: 'series-1979',
    season: 1,
    episode_number: 1,
    title: 'All the Way From the Country of the Future',
    japanese_title: 'ゆめの町 ノビタランド',
    description: 'Nobita is stunned when a robotic blue cat suddenly climbs out of his desk drawer eating snacks. Doraemon presents a photo album showing Nobita’s bleak future and promises to help him succeed.',
    release_date: '1979-04-02',
    featured_gadget: 'Take-copter & Time Machine',
    duration_minutes: 11,
    dub_notes: 'Original Japanese broadcast premiere of the 1979 Shin-Ei anime run.'
  },
  {
    id: 'ep-2',
    series_id: 'series-1979',
    season: 1,
    episode_number: 2,
    title: 'Transforming Biscuit',
    japanese_title: '変身ビスケット',
    description: 'Doraemon provides magical animal crackers that transform anyone who consumes them into that respective animal for ten minutes. Hilarious chaos ensues when mother eats the feline biscuit.',
    release_date: '1979-04-03',
    featured_gadget: 'Animal Transformation Biscuits',
    duration_minutes: 11
  },
  {
    id: 'ep-3',
    series_id: 'series-1979',
    season: 2,
    episode_number: 15,
    title: 'The Memory Bread for Exams',
    japanese_title: 'テストにアンキパン',
    description: 'Faced with a monstrous arithmetic exam the following morning, Nobita relies on Memory Bread to imprint pages of formulas, only to eat so much bread that his stomach revolts before the test begins.',
    release_date: '1979-06-12',
    featured_gadget: 'Memory Bread',
    duration_minutes: 11
  },
  {
    id: 'ep-4',
    series_id: 'series-1979',
    season: 3,
    episode_number: 44,
    title: 'Goodbye, Doraemon (Sayonara, Doraemon)',
    japanese_title: 'さようならドラえもん',
    description: 'Doraemon must permanently return to the 22nd century. To prove to Doraemon that he can stand on his own two feet without worry, Nobita confronts the neighborhood bully Gian in a grueling fistfight until Gian yields.',
    release_date: '1980-03-20',
    featured_gadget: 'Liar Draught (Uso 800)',
    duration_minutes: 22,
    dub_notes: 'Universally acclaimed as the emotional high point of the entire franchise.'
  },
  {
    id: 'ep-5',
    series_id: 'series-2005',
    season: 1,
    episode_number: 1,
    title: 'The Rebirth: Fishing with the Fish Basin',
    japanese_title: 'お座敷つりぼり',
    description: 'The grand premiere of the 2005 reboot series featuring stunning digital colors, expressive hand-drawn fluid animation, and a renewed look at the magical indoor fish-pond gadget.',
    release_date: '2005-04-15',
    featured_gadget: 'Indoor Fishing Basin & Feed',
    duration_minutes: 12
  },
  {
    id: 'ep-6',
    series_id: 'series-2005',
    season: 5,
    episode_number: 120,
    title: 'The Day Doraemon Was Born',
    japanese_title: 'ドラえもんが生まれ変わる日',
    description: 'A special episode commemorating September 3, exploring Doraemon’s manufacturing on the factory assembly line, his lightning strike accident, and his heartwarming bond with Sewashi.',
    release_date: '2007-09-07',
    featured_gadget: 'Factory Assembler & Time Patrol Communicator',
    duration_minutes: 24
  }
];
