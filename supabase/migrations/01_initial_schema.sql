-- Doraemon Universe Database Schema (PostgreSQL for Supabase)

CREATE TABLE IF NOT EXISTS characters (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  japanese_name TEXT,
  category TEXT NOT NULL,
  short_intro TEXT NOT NULL,
  biography TEXT NOT NULL,
  personality TEXT NOT NULL,
  favourite_food TEXT NOT NULL,
  first_appearance TEXT NOT NULL,
  relationships JSONB DEFAULT '{}'::jsonb,
  interesting_facts TEXT[] DEFAULT ARRAY[]::TEXT[],
  image_url TEXT NOT NULL,
  color_theme TEXT DEFAULT '#008CD7',
  sound_voice_quote TEXT,
  stats JSONB DEFAULT '{"kindness": 90, "intelligence": 80, "courage": 80, "luck": 80, "gadget_affinity": 90}'::jsonb,
  related_characters TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gadgets (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  japanese_name TEXT,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  function_details TEXT NOT NULL,
  interesting_facts TEXT[] DEFAULT ARRAY[]::TEXT[],
  image_url TEXT NOT NULL,
  model_type TEXT DEFAULT 'generic',
  color_theme TEXT DEFAULT '#008CD7',
  risk_level TEXT DEFAULT 'Safe',
  first_used_episode TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS movies (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  japanese_title TEXT,
  release_year INTEGER NOT NULL,
  decade TEXT NOT NULL,
  runtime_minutes INTEGER NOT NULL,
  description TEXT NOT NULL,
  director TEXT NOT NULL,
  poster_url TEXT NOT NULL,
  banner_url TEXT,
  trailer_url TEXT,
  genres TEXT[] DEFAULT ARRAY[]::TEXT[],
  featured_gadgets TEXT[] DEFAULT ARRAY[]::TEXT[],
  synopsis TEXT NOT NULL,
  box_office TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS series (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  era TEXT NOT NULL,
  start_year INTEGER NOT NULL,
  end_year INTEGER,
  total_episodes INTEGER NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS episodes (
  id TEXT PRIMARY KEY,
  series_id TEXT REFERENCES series(id) ON DELETE CASCADE,
  season INTEGER NOT NULL,
  episode_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  japanese_title TEXT,
  description TEXT NOT NULL,
  release_date TEXT NOT NULL,
  featured_gadget TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  dub_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quiz_questions (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  options TEXT[] NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS timeline_events (
  id TEXT PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  importance TEXT DEFAULT 'regular',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gallery_assets (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  aspect_ratio TEXT DEFAULT 'landscape',
  license_information TEXT NOT NULL,
  author TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) policies
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE gadgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE series ENABLE ROW LEVEL SECURITY;
ALTER TABLE episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_assets ENABLE ROW LEVEL SECURITY;

-- Allow public read access on all encyclopedia tables
CREATE POLICY "Public read characters" ON characters FOR SELECT USING (true);
CREATE POLICY "Public read gadgets" ON gadgets FOR SELECT USING (true);
CREATE POLICY "Public read movies" ON movies FOR SELECT USING (true);
CREATE POLICY "Public read series" ON series FOR SELECT USING (true);
CREATE POLICY "Public read episodes" ON episodes FOR SELECT USING (true);
CREATE POLICY "Public read quiz_questions" ON quiz_questions FOR SELECT USING (true);
CREATE POLICY "Public read timeline_events" ON timeline_events FOR SELECT USING (true);
CREATE POLICY "Public read gallery_assets" ON gallery_assets FOR SELECT USING (true);

-- Admin mutation access is granted via service_role key or authenticated session
CREATE POLICY "Admin manage characters" ON characters FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin manage gadgets" ON gadgets FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin manage movies" ON movies FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin manage episodes" ON episodes FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin manage quiz_questions" ON quiz_questions FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin manage timeline_events" ON timeline_events FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin manage gallery_assets" ON gallery_assets FOR ALL TO authenticated USING (true);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_characters_category ON characters(category);
CREATE INDEX IF NOT EXISTS idx_characters_slug ON characters(slug);
CREATE INDEX IF NOT EXISTS idx_gadgets_category ON gadgets(category);
CREATE INDEX IF NOT EXISTS idx_gadgets_slug ON gadgets(slug);
CREATE INDEX IF NOT EXISTS idx_movies_year ON movies(release_year);
CREATE INDEX IF NOT EXISTS idx_episodes_series ON episodes(series_id);
