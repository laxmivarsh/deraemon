'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Sparkles, Home, ArrowLeft } from 'lucide-react';
import { sounds } from '@/lib/audio';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="relative w-32 h-32 mx-auto rounded-full bg-sky-500/20 border-2 border-sky-400/40 flex items-center justify-center text-5xl shadow-2xl animate-float">
          🌀
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30 uppercase tracking-wider">
            Time Paradox Error 404
          </span>
          <h1 className="text-4xl font-black text-white">Lost in the Continuum!</h1>
          <p className="text-xs sm:text-sm text-sky-200/70 leading-relaxed">
            The Anywhere Door failed to establish a wormhole to this coordinate. Doraemon suggests returning to safety in present-day Tokyo.
          </p>
        </div>

        <div className="flex justify-center gap-3">
          <Link
            href="/"
            onClick={() => sounds.playBellChime()}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/30 flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
