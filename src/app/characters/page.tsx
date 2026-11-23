'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Users, Search, ArrowRight, Heart, Sparkles, Filter, Smile } from 'lucide-react';
import { initialCharacters } from '@/data/characters';
import { sounds } from '@/lib/audio';

const categories = [
  'All Categories',
  'Main Characters',
  'Family Members',
  'School Friends',
  'Future Characters',
  'Supporting Characters'
];

export default function CharactersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredCharacters = useMemo(() => {
    return initialCharacters.filter((char) => {
      const matchesSearch =
        char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.short_intro.toLowerCase().includes(searchQuery.toLowerCase()) ||
        char.favourite_food.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'All Categories' || char.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Users className="w-4 h-4" />
          <span>Character Universe Archive</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
          MEET THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-amber-300">CHARACTERS</span>
        </h1>
        <p className="text-sm sm:text-base text-sky-200/70">
          Discover comprehensive biographies, canonical trivia, relationships, and stats for the residents of Nerima, Tokyo and the 22nd century.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0B2545]/80 border border-sky-500/30 rounded-3xl p-4 sm:p-6 mb-10 backdrop-blur-md shadow-xl flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search characters by name, food, or lore..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-sky-950/60 border border-sky-500/30 text-white placeholder-sky-300/40 text-xs sm:text-sm focus:outline-none focus:border-sky-400 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sounds.playPop();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30 scale-105'
                    : 'bg-sky-950/40 text-slate-300 hover:text-white hover:bg-sky-900/40 border border-sky-500/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Character Grid */}
      {filteredCharacters.length === 0 ? (
        <div className="text-center py-20 bg-sky-950/30 border border-sky-500/20 rounded-3xl p-8">
          <Smile className="w-12 h-12 text-sky-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-xl font-bold text-white mb-2">No characters found</h3>
          <p className="text-xs text-sky-200/60 mb-4">
            Try adjusting your search terms or selecting another category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Categories');
            }}
            className="px-5 py-2 rounded-full bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.map((char) => (
            <Link
              key={char.id}
              href={`/characters/${char.slug}`}
              onClick={() => sounds.playPop()}
              className="group rounded-3xl bg-[#0B2545] border border-sky-500/20 hover:border-sky-400/60 p-5 flex flex-col justify-between dora-card-hover overflow-hidden relative shadow-lg"
            >
              {/* Background ambient color splash */}
              <div
                className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-15 group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: char.color_theme }}
              ></div>

              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    {char.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {char.japanese_name}
                  </span>
                </div>

                {/* Character Portrait */}
                <div className="relative w-32 h-32 mx-auto my-3 rounded-full p-1 bg-gradient-to-tr from-sky-400 via-sky-300 to-amber-300 group-hover:scale-105 transition-transform duration-300 shadow-md">
                  <div
                    className="w-full h-full rounded-full bg-cover bg-center overflow-hidden border-2 border-slate-900"
                    style={{ backgroundImage: `url(${char.image_url})` }}
                  >
                    <div className="w-full h-full bg-sky-950/20"></div>
                  </div>
                </div>

                {/* Name & Intro */}
                <div className="text-center mt-2">
                  <h3 className="font-black text-white text-lg group-hover:text-sky-300 transition-colors">
                    {char.name}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                    {char.short_intro}
                  </p>
                </div>
              </div>

              {/* Stats & Food Footer */}
              <div className="mt-5 pt-3 border-t border-sky-900/50 flex items-center justify-between text-xs">
                <span className="text-amber-300 font-semibold truncate max-w-[140px]">
                  ❤️ {char.favourite_food.split('(')[0]}
                </span>
                <span className="text-sky-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
