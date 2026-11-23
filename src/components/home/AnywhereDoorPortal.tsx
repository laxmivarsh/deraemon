'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DoorOpen, Sparkles, MapPin, Volume2, Compass, ArrowRight } from 'lucide-react';
import { sounds } from '@/lib/audio';

interface Destination {
  id: string;
  name: string;
  era: string;
  description: string;
  bgGradient: string;
  image: string;
  tag: string;
}

const destinations: Destination[] = [
  {
    id: 'tokyo',
    name: 'Nerima, Tokyo (Present Day)',
    era: '1970s - Present',
    description: 'Nobita\'s quiet residential neighborhood with green parks, vacant lot concrete pipes, and tatami rooms.',
    bgGradient: 'from-blue-600 via-sky-400 to-emerald-400',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    tag: 'Daily Life'
  },
  {
    id: 'cretaceous',
    name: 'Prehistoric Dinosaur Valley',
    era: '100 Million BC',
    description: 'Vast primordial jungle teeming with Plesiosaurs, Tyrannosaurs, and untouched nature.',
    bgGradient: 'from-amber-600 via-emerald-600 to-teal-800',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    tag: 'Prehistoric'
  },
  {
    id: 'future',
    name: '22nd Century Cyber Metropolis',
    era: 'Year 2112',
    description: 'Floating maglev skyways, robot factories, Matsushiba manufacturing plants, and neon spires.',
    bgGradient: 'from-fuchsia-600 via-indigo-600 to-sky-500',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    tag: 'Future Lore'
  },
  {
    id: 'moon',
    name: 'Moon Rabbit Kingdom',
    era: 'Far Side of the Moon',
    description: 'Secret crater rabbit civilization powered by ethereal moon energy, glowing under diamond stars.',
    bgGradient: 'from-purple-900 via-indigo-900 to-slate-900',
    image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=800&q=80',
    tag: 'Space Fantasy'
  }
];

export default function AnywhereDoorPortal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState<Destination>(destinations[0]);

  const toggleDoor = () => {
    sounds.playDoorSwoosh();
    setIsOpen(!isOpen);
  };

  const handleSelectDestination = (dest: Destination) => {
    sounds.playPop();
    setSelectedDest(dest);
    if (!isOpen) {
      sounds.playDoorSwoosh();
      setIsOpen(true);
    }
  };

  return (
    <section id="universe-portal" className="py-24 px-4 sm:px-6 relative overflow-hidden bg-[#0A2240]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300 text-xs font-bold uppercase tracking-wider mb-3">
            <DoorOpen className="w-4 h-4" />
            <span>Interactive 3D Dimensional Gateway</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            STEP THROUGH THE{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300">
              ANYWHERE DOOR
            </span>
          </h2>
          <p className="text-sm sm:text-base text-sky-200/70">
            Click the iconic pink door or select a coordinates coordinate preset below to warp spacetime and peek into another dimension.
          </p>
        </div>

        {/* Anywhere Door Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Destination Selector Cards */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-sm font-bold uppercase text-sky-300 tracking-wider mb-2 flex items-center gap-2">
              <Compass className="w-4 h-4 text-pink-400" /> Choose Destination Target
            </h3>

            {destinations.map((dest) => {
              const isCurrent = selectedDest.id === dest.id;
              return (
                <div
                  key={dest.id}
                  onClick={() => handleSelectDestination(dest)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isCurrent
                      ? 'bg-gradient-to-r from-pink-950/60 to-sky-950/60 border-pink-500/60 shadow-lg shadow-pink-500/20 translate-x-2'
                      : 'bg-sky-950/40 border-sky-500/20 hover:bg-sky-900/40 hover:border-sky-400/40'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-semibold border border-pink-400/30">
                        {dest.tag}
                      </span>
                      <span className="text-xs text-sky-300/70">{dest.era}</span>
                    </div>
                    <h4 className="font-bold text-white text-base">{dest.name}</h4>
                    <p className="text-xs text-slate-300 line-clamp-1">{dest.description}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                    isCurrent ? 'bg-pink-500 border-pink-300 text-white shadow-md' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}

            <div className="pt-4 flex items-center justify-between text-xs text-sky-300/70">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                10 Light-Year Navigation CPU Active
              </span>
              <button
                onClick={toggleDoor}
                className="text-pink-400 font-semibold hover:text-pink-300 underline underline-offset-4"
              >
                {isOpen ? 'Close Gateway' : 'Open Gateway'}
              </button>
            </div>
          </div>

          {/* The 3D Anywhere Door Model Simulation */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] h-[520px] sm:h-[580px] perspective-1000 flex items-center justify-center">
              {/* Door Frame (Exterior Pink Casing) */}
              <div className="relative w-full h-full bg-[#E6007E] rounded-3xl p-5 shadow-2xl shadow-pink-900/60 border-4 border-[#C7006E] flex items-center justify-center overflow-hidden">
                {/* Inner Portal Portal Void / Scene Reveal */}
                <div className="relative w-full h-full bg-slate-950 rounded-xl overflow-hidden border-2 border-pink-800 shadow-inner flex flex-col justify-end p-6">
                  {/* Scene Image revealed through the door */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                    style={{ backgroundImage: `url(${selectedDest.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                  </div>

                  {/* Destination Info Overlay inside Portal */}
                  <div className="relative z-10 space-y-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-500/80 text-white text-[11px] font-bold shadow-md">
                      <MapPin className="w-3.5 h-3.5" /> {selectedDest.name}
                    </span>
                    <p className="text-xs text-white/90 drop-shadow-md">
                      {selectedDest.description}
                    </p>
                    <Link
                      href="/gadgets"
                      onClick={() => sounds.playPop()}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200"
                    >
                      <span>Explore this gadget in Museum</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* The Swinging Door Leaf (Rotates on Y axis) */}
                  <div
                    onClick={toggleDoor}
                    className={`absolute inset-0 bg-[#FF2D92] border-4 border-[#E6007E] rounded-xl flex items-center justify-end pr-5 transition-transform duration-700 ease-out cursor-pointer origin-left shadow-2xl ${
                      isOpen ? 'rotate-y-[-85deg] [transform:perspective(1000px)_rotateY(-85deg)]' : '[transform:perspective(1000px)_rotateY(0deg)]'
                    }`}
                    style={{ backfaceVisibility: 'hidden' }}
                    title={isOpen ? 'Click to Close Door' : 'Click to Open Anywhere Door!'}
                  >
                    {/* Door Texture Panels */}
                    <div className="absolute inset-6 border-2 border-pink-400/40 rounded-lg flex flex-col justify-around p-4 pointer-events-none">
                      <div className="w-full h-1/2 border-b-2 border-pink-400/40 mb-2"></div>
                      <div className="w-full h-1/2"></div>
                    </div>

                    {/* Brass Doorknob */}
                    <div className="relative z-20 w-8 h-8 rounded-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 border-2 border-amber-200 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="w-2 h-2 rounded-full bg-amber-900"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Pill below Door */}
              <div
                onClick={toggleDoor}
                className="absolute -bottom-6 px-5 py-2 rounded-full bg-pink-600 hover:bg-pink-500 text-white text-xs font-black tracking-wider cursor-pointer shadow-lg shadow-pink-600/40 border border-pink-300 flex items-center gap-2 transition-transform active:scale-95"
              >
                <DoorOpen className="w-4 h-4" />
                <span>{isOpen ? 'GATEWAY ACTIVE (CLICK TO SHUT)' : 'CLICK TO OPEN DOOR'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
