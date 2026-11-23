'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Users, Wrench, Film, Clock, ArrowRight, CornerDownLeft } from 'lucide-react';
import { initialCharacters } from '@/data/characters';
import { initialGadgets } from '@/data/gadgets';
import { initialMovies } from '@/data/movies';
import { initialTimeline } from '@/data/timeline';
import { sounds } from '@/lib/audio';

interface SearchItem {
  id: string;
  title: string;
  type: 'character' | 'gadget' | 'movie' | 'timeline';
  url: string;
  description: string;
  badge: string;
}

export default function GlobalSearchModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Combine database indices for instant search
  const searchableItems: SearchItem[] = [
    ...initialCharacters.map((c) => ({
      id: c.id,
      title: c.name,
      type: 'character' as const,
      url: `/characters/${c.slug}`,
      description: `${c.category} - ${c.short_intro}`,
      badge: c.category,
    })),
    ...initialGadgets.map((g) => ({
      id: g.id,
      title: g.name,
      type: 'gadget' as const,
      url: `/gadgets#${g.slug}`,
      description: `${g.category} - ${g.description}`,
      badge: 'Gadget',
    })),
    ...initialMovies.map((m) => ({
      id: m.id,
      title: m.title,
      type: 'movie' as const,
      url: `/movies/${m.slug}`,
      description: `${m.release_year} - ${m.description}`,
      badge: 'Movie',
    })),
    ...initialTimeline.map((t) => ({
      id: t.id,
      title: t.title,
      type: 'timeline' as const,
      url: '/timeline',
      description: `${t.year} - ${t.description}`,
      badge: 'Lore',
    })),
  ];

  const filteredItems = query.trim() === ''
    ? searchableItems.slice(0, 6)
    : searchableItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-doraemon-search', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-doraemon-search', handleCustomOpen);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const handleSelect = (item: SearchItem) => {
    sounds.playPop();
    setIsOpen(false);
    router.push(item.url);
  };

  const handleKeyDownInInput = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#0B2545] border border-sky-500/30 rounded-2xl shadow-2xl shadow-sky-950/80 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-sky-500/20 bg-sky-950/40">
          <Search className="w-5 h-5 text-sky-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownInInput}
            placeholder="Search characters, gadgets, movies, lore... (e.g. Doraemon, Anywhere Door)"
            className="w-full bg-transparent text-white placeholder-sky-200/50 text-sm focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="px-2 py-0.5 rounded text-xs text-sky-300/70 border border-sky-500/20 hover:bg-sky-900/40"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              <p>No results found for &ldquo;{query}&rdquo;.</p>
              <p className="text-xs text-sky-300/60 mt-1">Try searching for Nobita, Take-copter, Dinosaur, or 2112.</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              let Icon = ArrowRight;
              if (item.type === 'character') Icon = Users;
              if (item.type === 'gadget') Icon = Wrench;
              if (item.type === 'movie') Icon = Film;
              if (item.type === 'timeline') Icon = Clock;

              return (
                <div
                  key={`${item.type}-${item.id}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-sky-600/40 to-blue-600/40 border border-sky-400/40 text-white'
                      : 'hover:bg-sky-900/30 text-slate-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-sky-950/60 border border-sky-500/30 text-sky-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm truncate">{item.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 font-medium">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{item.description}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <CornerDownLeft className="w-4 h-4 text-sky-400 shrink-0 mr-1" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-sky-950/60 border-t border-sky-500/20 flex items-center justify-between text-[11px] text-slate-400">
          <span>Use <kbd className="px-1 py-0.5 rounded bg-sky-900 border border-sky-600/40 text-sky-300">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-sky-900 border border-sky-600/40 text-sky-300">↓</kbd> to navigate</span>
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-sky-900 border border-sky-600/40 text-sky-300">Enter</kbd> to select</span>
        </div>
      </div>
    </div>
  );
}
