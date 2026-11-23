'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Film, Search, Calendar, Clock, ArrowRight, Play, Sparkles } from 'lucide-react';
import { initialMovies } from '@/data/movies';
import { sounds } from '@/lib/audio';

const decades = ['All Eras', '1980s', '2010s', '2020s'];

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDecade, setSelectedDecade] = useState('All Eras');

  const filteredMovies = useMemo(() => {
    return initialMovies.filter((movie) => {
      const matchesSearch =
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDecade =
        selectedDecade === 'All Eras' || movie.decade === selectedDecade;

      return matchesSearch && matchesDecade;
    });
  }, [searchQuery, selectedDecade]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* Title Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Film className="w-4 h-4" />
          <span>Theatrical Cinematic Archives</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
          DORAEMON <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-amber-300">MOVIE COLLECTION</span>
        </h1>
        <p className="text-sm sm:text-base text-sky-200/70">
          From groundbreaking prehistoric expeditions to landmark 3D CG blockbusters, explore four decades of annual theatrical releases.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0B2545]/80 border border-sky-500/30 rounded-3xl p-4 sm:p-6 backdrop-blur-md shadow-xl flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movie title, synopsis, or director..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-sky-950/60 border border-sky-500/30 text-white placeholder-sky-300/40 text-xs sm:text-sm focus:outline-none focus:border-sky-400 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {decades.map((dec) => {
            const isSelected = selectedDecade === dec;
            return (
              <button
                key={dec}
                onClick={() => {
                  sounds.playPop();
                  setSelectedDecade(dec);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30 scale-105'
                    : 'bg-sky-950/40 text-slate-300 hover:text-white hover:bg-sky-900/40 border border-sky-500/20'
                }`}
              >
                {dec}
              </button>
            );
          })}
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMovies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movies/${movie.slug}`}
            onClick={() => sounds.playPop()}
            className="group rounded-3xl bg-[#0B2545] border border-sky-500/20 hover:border-sky-400/60 overflow-hidden flex flex-col justify-between dora-card-hover shadow-xl"
          >
            <div>
              {/* Poster Banner */}
              <div className="relative h-64 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${movie.poster_url})` }}
                >
                  <div className="w-full h-full bg-gradient-to-t from-[#0B2545] via-transparent to-transparent"></div>
                </div>

                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-sky-950/80 backdrop-blur-md border border-sky-400/40 text-white text-xs font-bold">
                    {movie.release_year}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/80 backdrop-blur-md text-slate-950 text-xs font-bold">
                    {movie.decade}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 p-2.5 rounded-full bg-sky-500 text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-white" />
                </div>
              </div>

              {/* Title & Info */}
              <div className="p-6">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {movie.genres.map((g, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-sky-900/40 text-sky-300 border border-sky-500/20">
                      {g}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-black text-white group-hover:text-sky-300 transition-colors">
                  {movie.title}
                </h3>
                <p className="text-xs text-sky-300/60 font-mono mt-0.5">
                  {movie.japanese_title}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 mt-3 leading-relaxed">
                  {movie.description}
                </p>
              </div>
            </div>

            {/* Bottom Details Footer */}
            <div className="p-6 pt-0 border-t border-sky-900/50 mt-4 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                {movie.runtime_minutes} mins
              </span>
              <span className="font-bold text-sky-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Movie Details <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
