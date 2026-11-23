'use client';

import React, { useState } from 'react';
import { Globe, MapPin, Sparkles, Compass, Eye, ShieldCheck, ArrowRight } from 'lucide-react';
import InteractiveWorld3D, { worldHotspots, Hotspot } from '@/components/three/InteractiveWorld3D';
import { sounds } from '@/lib/audio';

export default function WorldPage() {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(worldHotspots[0]);
  const [fallbackMode, setFallbackMode] = useState(false);

  const handleSelect = (spot: Hotspot) => {
    sounds.playBellChime();
    setSelectedHotspot(spot);
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Globe className="w-4 h-4" />
          <span>Real-time Three.js WebGL Experience</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
          3D INTERACTIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-sky-200 to-amber-300">WORLD</span>
        </h1>
        <p className="text-sm sm:text-base text-sky-200/70">
          Step into a cartoon-inspired miniature 3D island of Nerima, Tokyo. Orbit around Nobita&apos;s residence, inspect the vacant lot concrete pipes, and locate the Anywhere Door.
        </p>
      </div>

      {/* Main 3D Stage & Hotspot Information Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 3D Canvas / WebGL Island or Fallback */}
        <div className="lg:col-span-8 space-y-4">
          {!fallbackMode ? (
            <InteractiveWorld3D onSelectHotspot={handleSelect} />
          ) : (
            <div className="p-8 rounded-3xl bg-[#06182E] border border-sky-500/30 text-center space-y-4 h-[480px] flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-2xl mx-auto border border-teal-400/30">
                🏡
              </div>
              <h3 className="text-2xl font-bold text-white">2D Neighborhood Overview</h3>
              <p className="text-xs text-sky-200/70 max-w-md">
                Lightweight mode activated for reduced GPU load. Select any landmark below to explore its historical anime significance.
              </p>
              <button
                onClick={() => setFallbackMode(false)}
                className="px-5 py-2 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md"
              >
                Switch Back to 3D WebGL View
              </button>
            </div>
          )}

          {/* Fallback Mode Toggle */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span>Powered by Three.js & WebGL 2.0</span>
            <button
              onClick={() => {
                sounds.playPop();
                setFallbackMode(!fallbackMode);
              }}
              className="text-teal-400 hover:text-teal-300 underline underline-offset-2"
            >
              {fallbackMode ? 'Enable 3D Canvas' : 'Low-power 2D Fallback'}
            </button>
          </div>
        </div>

        {/* Hotspot Inspector Side Card */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Selectors */}
          <div className="p-6 rounded-3xl bg-[#0B2545] border border-sky-500/20 shadow-xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-sky-300 flex items-center gap-2">
              <Compass className="w-4 h-4 text-teal-400" /> Landmark Waypoints
            </h3>

            <div className="space-y-2">
              {worldHotspots.map((spot) => {
                const isSelected = selectedHotspot.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => handleSelect(spot)}
                    className={`w-full p-3 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-teal-950 to-sky-950 border-teal-400 text-white shadow-md shadow-teal-500/20 translate-x-1'
                        : 'bg-sky-950/40 border-sky-500/20 text-slate-300 hover:bg-sky-900/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-teal-400' : 'text-slate-400'}`} />
                      <span>{spot.name}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Landmark Lore Sheet */}
          <div className="p-6 rounded-3xl bg-[#0B2545] border border-teal-500/30 shadow-xl space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-teal-300 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Selected Neighborhood Landmark</span>
            </div>

            <h3 className="text-2xl font-black text-white">
              {selectedHotspot.name}
            </h3>

            <p className="text-xs text-sky-200/80 leading-relaxed bg-sky-950/60 p-3.5 rounded-2xl border border-sky-500/20">
              {selectedHotspot.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-sky-900/50">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Canonical Lore & History:
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {selectedHotspot.lore}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
