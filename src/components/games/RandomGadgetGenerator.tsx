'use client';

import React, { useState } from 'react';
import { Sparkles, Wand2, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialGadgets } from '@/data/gadgets';
import { sounds } from '@/lib/audio';

export default function RandomGadgetGenerator() {
  const [isPulling, setIsPulling] = useState(false);
  const [pulledGadget, setPulledGadget] = useState<typeof initialGadgets[0] | null>(null);

  const pullGadgetFromPocket = () => {
    sounds.playGadgetActivate();
    setIsPulling(true);
    setPulledGadget(null);

    // Pocket pulling animation delay
    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * initialGadgets.length);
      const chosen = initialGadgets[randomIdx];
      setPulledGadget(chosen);
      setIsPulling(false);
      sounds.playSuccess();
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    }, 1200);
  };

  return (
    <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#0B2545] border border-sky-500/30 text-center space-y-6 shadow-2xl">
      <div>
        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider">
          4-Dimensional Pocket Simulator
        </span>
        <h3 className="text-2xl font-black text-white mt-2">
          REACH INTO THE POCKET
        </h3>
        <p className="text-xs text-sky-200/70 mt-1 max-w-sm mx-auto">
          Doraemon&apos;s white half-moon pocket contains thousands of secret gadgets. Click the button to pull out a mystery item!
        </p>
      </div>

      {/* The 4D Pocket Graphical Centerpiece */}
      <div className="relative w-48 h-32 mx-auto my-4 flex items-end justify-center select-none">
        {/* White Half-moon pocket */}
        <div className={`w-44 h-24 bg-white border-4 border-slate-900 rounded-b-full shadow-2xl relative flex items-center justify-center overflow-hidden transition-all duration-300 ${
          isPulling ? 'animate-pulse scale-105 shadow-amber-400/50' : ''
        }`}>
          {/* Internal void */}
          <div className="w-36 h-2 border-b-2 border-slate-400 -mt-16"></div>

          {isPulling && (
            <div className="absolute inset-0 bg-gradient-to-t from-amber-400/40 via-sky-400/30 to-transparent flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-amber-300 animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={pullGadgetFromPocket}
        disabled={isPulling}
        className="px-8 py-3.5 rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-amber-400 hover:from-sky-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-sky-500/30 flex items-center gap-2 mx-auto transition-transform active:scale-95 disabled:opacity-60"
      >
        <Wand2 className="w-4 h-4" />
        <span>{isPulling ? 'Searching Pocket Continuum...' : 'Reach Into 4D Pocket!'}</span>
      </button>

      {/* Pulled Gadget Result Card */}
      {pulledGadget && (
        <div className="p-5 rounded-2xl bg-sky-950/70 border border-amber-400/40 space-y-3 text-left animate-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
              {pulledGadget.category}
            </span>
            <span className="text-xs text-sky-300/80 font-mono">
              {pulledGadget.japanese_name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-sky-500/30">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${pulledGadget.image_url})` }}
              ></div>
            </div>
            <div>
              <h4 className="font-black text-white text-base">{pulledGadget.name}</h4>
              <p className="text-xs text-slate-300 line-clamp-2 mt-0.5">{pulledGadget.description}</p>
            </div>
          </div>

          <p className="text-xs text-amber-200/90 italic pt-1 border-t border-sky-900/50">
            ★ Did you know? {pulledGadget.interesting_facts[0]}
          </p>
        </div>
      )}
    </div>
  );
}
