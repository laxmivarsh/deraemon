'use client';

import React from 'react';
import { Sparkles, Award, Film, Tv, Compass, ShieldCheck } from 'lucide-react';

const stats = [
  { label: 'Secret Gadgets in Lore', value: '4,500+', icon: Sparkles, color: 'text-amber-400' },
  { label: 'Theatrical Feature Films', value: '43+', icon: Film, color: 'text-sky-400' },
  { label: 'Anime Episodes Broadcast', value: '3,000+', icon: Tv, color: 'text-pink-400' },
  { label: 'Years of Timeless Wonder', value: '55+', icon: Award, color: 'text-emerald-400' },
];

export default function UniverseStats() {
  return (
    <section className="py-16 px-4 sm:px-6 relative border-y border-sky-500/20 bg-[#061528]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="flex flex-col items-center space-y-2">
              <div className={`p-3 rounded-2xl bg-sky-950/60 border border-sky-500/30 shadow-md ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-sky-200/70 font-medium">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
