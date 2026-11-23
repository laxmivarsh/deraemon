'use client';

import React from 'react';
import Link from 'next/link';
import { Wrench, ArrowRight, Zap, ShieldAlert, Sparkles } from 'lucide-react';
import { initialGadgets } from '@/data/gadgets';
import { sounds } from '@/lib/audio';

export default function GadgetShowcase() {
  const gadgets = initialGadgets.slice(0, 4);

  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Wrench className="w-4 h-4" />
            <span>Futuristic Artifacts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            GADGET <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-sky-300">MUSEUM</span>
          </h2>
          <p className="text-sm text-sky-200/70 mt-1 max-w-xl">
            Inventions pulled straight from Doraemon&apos;s 4-dimensional pocket. Click to inspect technical functions, risk ratings, and lore.
          </p>
        </div>

        <Link
          href="/gadgets"
          onClick={() => sounds.playGadgetActivate()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-md group self-start md:self-auto"
        >
          <span>Enter Full Museum</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {gadgets.map((gadget) => (
          <div
            key={gadget.id}
            onClick={() => sounds.playGadgetActivate()}
            className="group rounded-3xl bg-[#0B2545] border border-sky-500/20 hover:border-amber-400/60 p-5 flex flex-col justify-between dora-card-hover cursor-pointer"
          >
            <div>
              {/* Category & Risk */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  {gadget.category}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  gadget.risk_level === 'Reality Altering'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  {gadget.risk_level}
                </span>
              </div>

              {/* Gadget Image Thumbnail */}
              <div className="relative h-44 rounded-2xl overflow-hidden mb-4 border border-sky-500/20 group-hover:scale-105 transition-transform duration-300">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${gadget.image_url})` }}
                >
                  <div className="w-full h-full bg-sky-950/30 backdrop-blur-[1px]"></div>
                </div>
                <div className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300">
                  <Zap className="w-3.5 h-3.5" />
                </div>
              </div>

              <h3 className="font-black text-white text-lg group-hover:text-amber-300 transition-colors">
                {gadget.name}
              </h3>
              <p className="text-xs text-slate-300/80 line-clamp-3 mt-2 leading-relaxed">
                {gadget.description}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-sky-900/50 flex items-center justify-between text-xs">
              <span className="text-sky-300 font-mono text-[11px]">
                {gadget.japanese_name}
              </span>
              <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Inspect Specs <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
