export interface Character {
  id: string;
  slug: string;
  name: string;
  japanese_name?: string;
  category: 'Main Characters' | 'Family Members' | 'School Friends' | 'Future Characters' | 'Supporting Characters' | 'Movie Characters';
  short_intro: string;
  biography: string;
  personality: string;
  favourite_food: string;
  first_appearance: string;
  relationships: {
    family?: string[];
    friends?: string[];
    rivals?: string[];
  };
  interesting_facts: string[];
  image_url: string;
  color_theme: string;
  sound_voice_quote?: string;
  stats?: {
    kindness: number;
    intelligence: number;
    courage: number;
    luck: number;
    gadget_affinity: number;
  };
  related_characters?: string[];
}

export interface Gadget {
  id: string;
  slug: string;
  name: string;
  japanese_name?: string;
  category: 'Travel & Mobility' | 'Time & Space' | 'Transformation & Light' | 'Communication & Daily' | 'Action & Play';
  description: string;
  function_details: string;
  interesting_facts: string[];
  image_url: string;
  model_type: 'door' | 'copter' | 'light' | 'timemachine' | 'cannon' | 'generic';
  color_theme: string;
  first_used_episode?: string;
  risk_level: 'Safe' | 'Handle With Care' | 'Reality Altering';
}

export interface Movie {
  id: string;
  slug: string;
  title: string;
  japanese_title?: string;
  release_year: number;
  decade: string;
  runtime_minutes: number;
  description: string;
  director: string;
  poster_url: string;
  banner_url?: string;
  trailer_url?: string;
  genres: string[];
  featured_gadgets: string[];
  synopsis: string;
  box_office?: string;
}

export interface Series {
  id: string;
  title: string;
  era: '1979 Series' | '2005 Series' | 'Original 1973';
  start_year: number;
  end_year?: number;
  total_episodes: number;
  description: string;
}

export interface Episode {
  id: string;
  series_id: string;
  season: number;
  episode_number: number;
  title: string;
  japanese_title?: string;
  description: string;
  release_date: string;
  featured_gadget: string;
  duration_minutes: number;
  dub_notes?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'Lore' | 'Gadgets' | 'Characters' | 'Movies';
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  category: 'In-Universe Lore' | 'Manga Milestones' | 'Anime Eras' | 'Movie Milestones';
  description: string;
  importance: 'major' | 'regular';
  image_url?: string;
}

export interface GalleryAsset {
  id: string;
  title: string;
  category: 'Characters' | 'Gadgets' | 'Movies' | 'Wallpapers' | 'Fan Artwork';
  image_url: string;
  aspect_ratio: 'landscape' | 'portrait' | 'square';
  license_information: string;
  author?: string;
  tags: string[];
}
