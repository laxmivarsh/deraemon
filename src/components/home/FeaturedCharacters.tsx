'use client';

import React from 'react';
import Link from 'next/link';
import { Users, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { initialCharacters } from '@/data/characters';
import { sounds } from '@/lib/audio';

export default function FeaturedCharacters() {
  const featured = initialCharacters.slice(0, 5); // Doraemon, Nobita, Shizuka, Gian, Suneo

  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-4 h-4" />
            <span>Character Encyclopedia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            MEET THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-amber-300">CORE HEROES</span>
          </h2>
          <p className="text-sm text-sky-200/70 mt-1 max-w-xl">
            From the 22nd century robotic cat to the boy who never gives up, explore the beloved personalities that shape every adventure.
          </p>
        </div>

        <Link
          href="/characters"
          onClick={() => sounds.playPop()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-900/60 hover:bg-sky-800 border border-sky-500/30 text-white text-xs font-bold transition-all shadow-md group self-start md:self-auto"
        >
          <span>View All 13+ Characters</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid of Character Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {featured.map((char) => (
          <Link
            key={char.id}
            href={`/characters/${char.slug}`}
            onClick={() => sounds.playPop()}
            className="group relative rounded-3xl bg-[#0B2545] border border-sky-500/20 hover:border-sky-400/60 p-5 flex flex-col justify-between dora-card-hover overflow-hidden"
            style={{
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
            }}
          >
            {/* Background accent glow */}
            <div
              className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"
              style={{ backgroundColor: char.color_theme }}
            ></div>

            <div>
              {/* Category tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  {char.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {char.japanese_name}
                </span>
              </div>

              {/* Character Avatar Circle */}
              <div className="relative w-28 h-28 mx-auto my-3 rounded-full p-1 bg-gradient-to-tr from-sky-500 to-amber-300 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                <div
                  className="w-full h-full rounded-full bg-cover bg-center overflow-hidden border-2 border-slate-900"
                  style={{ backgroundImage: `url(${char.image_url})` }}
                >
                  <div className="w-full h-full bg-sky-950/20 backdrop-blur-[1px]"></div>
                </div>
              </div>

              {/* Character Name & Short Intro */}
              <div className="text-center mt-3">
                <h3 className="font-black text-white text-lg group-hover:text-sky-300 transition-colors">
                  {char.name}
                </h3>
                <p className="text-xs text-slate-300/80 line-clamp-2 mt-1 leading-relaxed">
                  {char.short_intro}
                </p>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="mt-5 pt-3 border-t border-sky-900/50 flex items-center justify-between text-[11px]">
              <span className="text-amber-300 font-medium truncate max-w-[130px]">
                ❤️ {char.favourite_food.split('(')[0]}
              </span>
              <span className="text-sky-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                Profile <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
