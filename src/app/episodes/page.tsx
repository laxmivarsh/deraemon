'use client';

import React, { useState, useMemo } from 'react';
import { Tv, Search, Calendar, Clock, Sparkles, Filter, Info, ShieldCheck } from 'lucide-react';
import { seriesList, initialEpisodes } from '@/data/episodes';
import { sounds } from '@/lib/audio';

export default function EpisodesPage() {
  const [selectedSeries, setSelectedSeries] = useState('series-1979');
  const [selectedSeason, setSelectedSeason] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentSeries = seriesList.find((s) => s.id === selectedSeries);

  const filteredEpisodes = useMemo(() => {
    return initialEpisodes.filter((ep) => {
      const matchesSeries = ep.series_id === selectedSeries;
      const matchesSeason = selectedSeason === 'all' || ep.season === selectedSeason;
      const matchesSearch =
        ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.featured_gadget.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSeries && matchesSeason && matchesSearch;
    });
  }, [selectedSeries, selectedSeason, searchQuery]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Tv className="w-4 h-4" />
          <span>Broadcast Television Archives</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
          EPISODE <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-amber-300">EXPLORER</span>
        </h1>
        <p className="text-sm sm:text-base text-sky-200/70">
          Navigate classic 1979 series and modern 2005 HD broadcasts. Review canonical Japanese broadcast dates, featured pocket gadgets, and episode descriptions.
        </p>
      </div>

      {/* Series Switcher Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {seriesList.map((series) => {
          const isSelected = selectedSeries === series.id;
          return (
            <div
              key={series.id}
              onClick={() => {
                sounds.playPop();
                setSelectedSeries(series.id);
                setSelectedSeason('all');
              }}
              className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-r from-sky-950 to-[#0B2545] border-sky-400 shadow-xl shadow-sky-500/20'
                  : 'bg-[#0B2545]/60 border-sky-500/20 hover:bg-sky-900/40 text-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-bold border border-sky-400/30">
                    {series.era}
                  </span>
                  <span className="text-xs font-mono text-amber-300">
                    {series.total_episodes} Total Broadcasts
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mt-1">{series.title}</h3>
                <p className="text-xs text-slate-300/80 mt-2 leading-relaxed">
                  {series.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-sky-900/40 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">
                  Broadcast Years: {series.start_year} - {series.end_year || 'Present'}
                </span>
                <span className={isSelected ? 'text-sky-300 font-bold' : 'text-slate-400'}>
                  {isSelected ? '● Active View' : 'Select Series'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filtering & Search Bar */}
      <div className="bg-[#0B2545]/80 border border-sky-500/30 rounded-3xl p-4 sm:p-6 backdrop-blur-md shadow-xl flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search episode title, gadget, or description..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-sky-950/60 border border-sky-500/30 text-white placeholder-sky-300/40 text-xs sm:text-sm focus:outline-none focus:border-sky-400 transition-colors"
          />
        </div>

        {/* Season Selector */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs text-sky-300/70 font-bold shrink-0">Season:</span>
          {(['all', 1, 2, 3, 5] as const).map((s) => {
            const isSelected = selectedSeason === s;
            return (
              <button
                key={s}
                onClick={() => {
                  sounds.playPop();
                  setSelectedSeason(s);
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'bg-sky-950/40 text-slate-300 border border-sky-500/20 hover:bg-sky-900/40'
                }`}
              >
                {s === 'all' ? 'All Seasons' : `Season ${s}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Episodes List */}
      <div className="space-y-4">
        {filteredEpisodes.length === 0 ? (
          <div className="text-center py-16 bg-sky-950/30 border border-sky-500/20 rounded-3xl p-8">
            <Info className="w-10 h-10 text-sky-400 mx-auto mb-2 opacity-60" />
            <h3 className="text-lg font-bold text-white">No episodes matched your filter</h3>
            <p className="text-xs text-sky-200/60 mt-1">
              Try searching another gadget keyword or switching the season selector.
            </p>
          </div>
        ) : (
          filteredEpisodes.map((ep) => (
            <div
              key={ep.id}
              className="p-6 rounded-3xl bg-[#0B2545] border border-sky-500/20 hover:border-sky-400/50 transition-all shadow-lg flex flex-col md:flex-row justify-between gap-6 items-start"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[11px] font-bold border border-sky-400/30">
                    Season {ep.season} • Episode {ep.episode_number}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {ep.japanese_title}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white">{ep.title}</h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {ep.description}
                </p>

                {ep.dub_notes && (
                  <p className="text-xs text-amber-300/90 italic bg-amber-500/10 p-2.5 rounded-xl border border-amber-400/20 inline-block">
                    ★ Broadcast Note: {ep.dub_notes}
                  </p>
                )}
              </div>

              {/* Gadget & Release Date pill */}
              <div className="md:w-64 space-y-2 shrink-0 bg-sky-950/50 p-4 rounded-2xl border border-sky-500/20 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    Featured Pocket Gadget:
                  </span>
                  <p className="font-bold text-amber-300 mt-0.5">{ep.featured_gadget}</p>
                </div>
                <div className="pt-2 border-t border-sky-900/60 flex items-center justify-between text-[11px] text-slate-300">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    {ep.release_date}
                  </span>
                  <span>{ep.duration_minutes}m runtime</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
