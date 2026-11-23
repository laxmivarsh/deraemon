import CinematicHero from '@/components/hero/CinematicHero';
import AnywhereDoorPortal from '@/components/home/AnywhereDoorPortal';
import FeaturedCharacters from '@/components/home/FeaturedCharacters';
import GadgetShowcase from '@/components/home/GadgetShowcase';
import UniverseStats from '@/components/home/UniverseStats';
import Link from 'next/link';
import { Gamepad2, Globe, Clock, ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* 1. Cinematic Hero Section */}
      <CinematicHero />

      {/* 2. Interactive Anywhere Door 3D Dimensional Portal */}
      <AnywhereDoorPortal />

      {/* 3. Universe Milestones & Stats Bar */}
      <UniverseStats />

      {/* 4. Featured Core Characters */}
      <FeaturedCharacters />

      {/* 5. Gadget Museum Showcase */}
      <GadgetShowcase />

      {/* 6. Interactive Teasers: Games & 3D Interactive World */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Playable Games Teaser */}
          <div className="relative rounded-3xl bg-gradient-to-br from-indigo-950/80 via-blue-950/80 to-[#0B2545] border border-sky-400/30 p-8 sm:p-10 overflow-hidden flex flex-col justify-between group shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Gamepad2 className="w-4 h-4" />
                <span>5 Playable Mini-Games</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                GAMES & TRIVIA FUN ZONE
              </h3>
              <p className="text-sm text-sky-200/80 leading-relaxed max-w-md">
                Test your knowledge in the Timed Doraemon Quiz, guess characters from silhouette clues, play the Memory Match card flip game, and pull surprise gadgets from the 4D Pocket.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/games"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-400 hover:to-sky-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/30 transition-all group-hover:translate-x-1"
              >
                <span>Play Mini-Games Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 3D World Experience Teaser */}
          <div className="relative rounded-3xl bg-gradient-to-br from-sky-950/80 via-teal-950/80 to-[#0B2545] border border-sky-400/30 p-8 sm:p-10 overflow-hidden flex flex-col justify-between group shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Globe className="w-4 h-4" />
                <span>Three.js / WebGL Sandbox</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                3D INTERACTIVE WORLD
              </h3>
              <p className="text-sm text-sky-200/80 leading-relaxed max-w-md">
                Explore a miniature cartoon world rendered in Three.js and React Three Fiber. Orbit the camera, discover floating gadgets, and click interactive hotspots across the neighborhood.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/world"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-400 hover:to-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-teal-500/30 transition-all group-hover:translate-x-1"
              >
                <span>Launch 3D World</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
