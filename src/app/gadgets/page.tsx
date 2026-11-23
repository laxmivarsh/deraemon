'use client';

import React, { useState, useMemo } from 'react';
import { 
  Wrench, 
  Search, 
  Zap, 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  Info, 
  ArrowRight,
  RotateCw,
  Box,
  Compass
} from 'lucide-react';
import { initialGadgets } from '@/data/gadgets';
import GadgetVisualizer3D from '@/components/three/GadgetVisualizer3D';
import AnywhereDoorPortal from '@/components/home/AnywhereDoorPortal';
import { sounds } from '@/lib/audio';

const categories = [
  'All Categories',
  'Travel & Mobility',
  'Time & Space',
  'Transformation & Light',
  'Communication & Daily',
  'Action & Play'
];

type Model3DType = 'door' | 'copter' | 'light' | 'cannon' | 'bell';

const interactive3DOptions: { id: Model3DType; name: string; icon: string }[] = [
  { id: 'door', name: 'Anywhere Door (Dokodemo Door)', icon: '🚪' },
  { id: 'copter', name: 'Take-copter (Bamboo Copter)', icon: '🚁' },
  { id: 'light', name: 'Small Light (Shrink Ray)', icon: '🔦' },
  { id: 'cannon', name: 'Air Cannon (Kuuki-hou)', icon: '💥' },
  { id: 'bell', name: 'Collar Bell & 4D Pocket', icon: '🔔' }
];

export default function GadgetsPage() {
  const [selected3D, setSelected3D] = useState<Model3DType>('door');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [expandedGadgetId, setExpandedGadgetId] = useState<string | null>('gadget-1');

  const activeGadgetName = interactive3DOptions.find((o) => o.id === selected3D)?.name || 'Gadget';

  const filteredGadgets = useMemo(() => {
    return initialGadgets.filter((g) => {
      const matchesSearch =
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.function_details.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'All Categories' || g.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      {/* Page Title Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Wrench className="w-4 h-4" />
          <span>22nd Century Technological Heritage</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
          FUTURISTIC GADGET <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-sky-300">MUSEUM</span>
        </h1>
        <p className="text-sm sm:text-base text-sky-200/70">
          Explore the revolutionary inventions crafted by future scientists. Rotate authentic 3D models in real-time, review dimensional physics, and analyze safety risks.
        </p>
      </div>

      {/* 3D Model Interactive Sandbox Section */}
      <div className="rounded-3xl bg-[#081F3B] border border-sky-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Box className="w-6 h-6 text-amber-400" />
              <span>Interactive 3D WebGL Model Inspector</span>
            </h2>
            <p className="text-xs text-sky-200/70 mt-1">
              Select a gadget below to inspect its procedural 3D geometry in our Three.js render pipeline.
            </p>
          </div>

          {/* Model Switcher Buttons */}
          <div className="flex flex-wrap gap-2">
            {interactive3DOptions.map((opt) => {
              const isSelected = selected3D === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    sounds.playPop();
                    setSelected3D(opt.id);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-400/30 scale-105'
                      : 'bg-sky-950/60 border border-sky-500/30 text-sky-200 hover:text-white hover:bg-sky-900/60'
                  }`}
                >
                  <span>{opt.icon}</span>
                  <span className="hidden sm:inline">{opt.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Canvas Visualizer */}
        <GadgetVisualizer3D modelType={selected3D} gadgetName={activeGadgetName} />
      </div>

      {/* Interactive Anywhere Door Gateway Feature */}
      <div className="rounded-3xl border border-sky-500/30 overflow-hidden shadow-2xl">
        <AnywhereDoorPortal />
      </div>

      {/* Gadget Archive & Spec Breakdown */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              SECRET GADGET ENCYCLOPEDIA ({filteredGadgets.length})
            </h2>
            <p className="text-xs sm:text-sm text-sky-200/70 mt-1">
              Classified database of dimensions, operation rules, and side effects.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gadgets by name or function..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-sky-950/60 border border-sky-500/30 text-white placeholder-sky-300/40 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sounds.playPop();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-400/30 scale-105'
                    : 'bg-sky-950/40 text-slate-300 hover:text-white hover:bg-sky-900/40 border border-sky-500/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gadget Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGadgets.map((gadget) => {
            const isExpanded = expandedGadgetId === gadget.id;
            return (
              <div
                id={gadget.slug}
                key={gadget.id}
                className="rounded-3xl bg-[#0B2545] border border-sky-500/20 hover:border-amber-400/50 p-6 flex flex-col justify-between dora-card-hover transition-all"
              >
                <div>
                  {/* Category and Risk pill */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/30">
                      {gadget.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                      gadget.risk_level === 'Reality Altering'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : gadget.risk_level === 'Handle With Care'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}>
                      {gadget.risk_level}
                    </span>
                  </div>

                  {/* Thumbnail Image */}
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-4 border border-sky-500/20 shadow-inner">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${gadget.image_url})` }}
                    >
                      <div className="w-full h-full bg-slate-950/20"></div>
                    </div>
                  </div>

                  <h3 className="font-black text-white text-xl tracking-tight">
                    {gadget.name}
                  </h3>
                  <p className="text-xs text-sky-300/70 font-mono mt-0.5">
                    {gadget.japanese_name}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-200 mt-3 leading-relaxed">
                    {gadget.description}
                  </p>

                  {/* Expandable Technical Mechanics */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-sky-900/60 space-y-3 animate-in fade-in duration-300">
                      <div>
                        <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5" /> Functional Physics
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed bg-sky-950/40 p-3 rounded-xl border border-sky-500/20">
                          {gadget.function_details}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-[11px] font-bold text-sky-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> Canonical Lore
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {gadget.interesting_facts.map((fact, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-amber-400 font-bold">•</span>
                              <span>{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-sky-900/50 flex items-center justify-between">
                  <button
                    onClick={() => {
                      sounds.playPop();
                      setExpandedGadgetId(isExpanded ? null : gadget.id);
                    }}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Collapse Specs' : 'Detailed Specs & Lore'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>

                  <button
                    onClick={() => {
                      sounds.playGadgetActivate();
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                      if (gadget.model_type === 'door') setSelected3D('door');
                      else if (gadget.model_type === 'copter') setSelected3D('copter');
                      else if (gadget.model_type === 'light') setSelected3D('light');
                      else if (gadget.model_type === 'cannon') setSelected3D('cannon');
                      else setSelected3D('bell');
                    }}
                    className="text-[11px] font-bold px-3 py-1 rounded-full bg-sky-900/50 hover:bg-sky-800 text-sky-200 border border-sky-500/30"
                  >
                    View in 3D
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
