'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Heart, Sparkles, BookOpen, Compass, ShieldAlert } from 'lucide-react';
import { sounds } from '@/lib/audio';

export default function Footer() {
  const scrollToTop = () => {
    sounds.playBellChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#051324] border-t border-sky-500/20 pt-16 pb-12 overflow-hidden text-slate-300">
      {/* Decorative gradient flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-sky-500/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#FFD200] border border-amber-300 flex items-center justify-center text-amber-900 font-bold shadow-md shadow-amber-400/40">
                🔔
              </span>
              <span className="text-xl font-black text-white tracking-wider">
                DORAEMON <span className="text-sky-400">UNIVERSE</span>
              </span>
            </div>
            <p className="text-xs text-sky-200/70 leading-relaxed">
              Explore the World of Doraemon. An interactive, animated digital encyclopedia celebrating the imaginative masterpiece created by Fujiko F. Fujio.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/30 text-[11px] text-sky-300">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>4-Dimensional Pocket Wonder</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-sky-400" /> Exploration
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/characters" className="hover:text-sky-300 transition-colors">
                  Characters Universe (13+ profiles)
                </Link>
              </li>
              <li>
                <Link href="/gadgets" className="hover:text-sky-300 transition-colors">
                  Gadget Museum & 3D Door
                </Link>
              </li>
              <li>
                <Link href="/world" className="hover:text-sky-300 transition-colors">
                  3D Interactive Neighborhood
                </Link>
              </li>
              <li>
                <Link href="/timeline" className="hover:text-sky-300 transition-colors">
                  Universe Chronological Timeline
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-sky-300 transition-colors">
                  Artwork & Wallpaper Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Media & Entertainment */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-yellow-400" /> Entertainment
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/movies" className="hover:text-sky-300 transition-colors">
                  Theatrical Movie Collection
                </Link>
              </li>
              <li>
                <Link href="/episodes" className="hover:text-sky-300 transition-colors">
                  Classic 1979 & 2005 Episode Explorer
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-sky-300 transition-colors">
                  Games & Trivia Fun Zone (5 Mini-Games)
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-sky-300 transition-colors">
                  Admin Database Control Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Unofficial Fan Project Disclaimer */}
          <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/20 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>Unofficial Fan Disclaimer</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              This digital experience is an independent, non-commercial educational fan tribute. Doraemon, all related characters, and trademarks are copyright © Fujiko Pro, Shogakukan, and TV Asahi. No copyright infringement is intended.
            </p>
          </div>
        </div>

        {/* Bottom bar with Back to Top */}
        <div className="pt-8 border-t border-sky-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Doraemon fans worldwide.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-900/50 hover:bg-sky-700/60 border border-sky-500/30 text-white font-medium transition-all group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
