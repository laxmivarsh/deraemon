'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Sparkles, Compass, Users, ChevronDown, Wand2 } from 'lucide-react';
import { sounds } from '@/lib/audio';

export default function CinematicHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Cinematic Entrance Timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        cloudsRef.current,
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 1.4 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1 },
          '-=0.8'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.6'
        )
        .fromTo(
          characterRef.current,
          { opacity: 0, scale: 0.8, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'back.out(1.5)' },
          '-=0.7'
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        );

      // Mouse Parallax Effect on Hero Elements
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current) return;
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30;
        const yPos = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to(characterRef.current, {
          x: xPos * 1.5,
          y: yPos * 1.5,
          duration: 0.8,
          ease: 'power1.out',
        });

        gsap.to('.hero-gadget-floating', {
          x: -xPos * 2,
          y: -yPos * 2,
          duration: 1,
          ease: 'power1.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    sounds.playDoorSwoosh();
    // Smooth scroll down to the exploration section
    const target = document.getElementById('universe-portal');
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 bg-gradient-to-b from-[#024075] via-[#081B33] to-[#081B33]"
    >
      {/* Animated Sky Background & Floating Clouds */}
      <div ref={cloudsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Sun / Sky Light Glow */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-sky-400/25 via-blue-500/10 to-transparent blur-3xl rounded-full"></div>

        {/* Floating Clouds Layer 1 */}
        <div className="animated-cloud top-20 left-10 w-64 h-24 bg-white/10 rounded-full blur-xl animate-float-slow"></div>
        <div className="animated-cloud top-36 right-16 w-80 h-28 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="animated-cloud bottom-32 left-1/4 w-96 h-32 bg-sky-400/10 rounded-full blur-2xl animate-float-slow"></div>

        {/* Floating Gadget Motifs */}
        <div className="hero-gadget-floating absolute top-28 left-[12%] hidden md:flex items-center gap-2 p-3 rounded-2xl bg-sky-900/40 border border-sky-400/30 backdrop-blur-md animate-float shadow-xl">
          <span className="text-2xl">🚪</span>
          <div>
            <p className="text-xs font-bold text-white">Anywhere Door</p>
            <p className="text-[10px] text-pink-300">Wormhole Portal</p>
          </div>
        </div>

        <div className="hero-gadget-floating absolute top-40 right-[12%] hidden md:flex items-center gap-2 p-3 rounded-2xl bg-sky-900/40 border border-amber-400/30 backdrop-blur-md animate-float-slow shadow-xl">
          <span className="text-2xl">🚁</span>
          <div>
            <p className="text-xs font-bold text-white">Take-copter</p>
            <p className="text-[10px] text-yellow-300">80 km/h Flight</p>
          </div>
        </div>

        <div className="hero-gadget-floating absolute bottom-24 right-[18%] hidden lg:flex items-center gap-2 p-3 rounded-2xl bg-sky-900/40 border border-blue-400/30 backdrop-blur-md animate-float shadow-xl">
          <span className="text-2xl">🍞</span>
          <div>
            <p className="text-xs font-bold text-white">Memory Bread</p>
            <p className="text-[10px] text-sky-200">Exam Memory Absorber</p>
          </div>
        </div>
      </div>

      {/* Hero Central Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Doraemon Collar Bell Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-500/20 via-sky-400/10 to-amber-500/20 border border-sky-400/30 shadow-md mb-6">
          <span className="w-5 h-5 rounded-full bg-[#FFD200] border border-amber-300 flex items-center justify-center text-xs shadow-inner animate-wiggle">
            🔔
          </span>
          <span className="text-xs font-bold tracking-wide text-sky-200 uppercase">
            The Ultimate 22nd Century Fan Experience
          </span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
        </div>

        {/* Hero Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6 drop-shadow-lg"
        >
          EXPLORE THE WORLD OF{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-amber-300">
            DORAEMON
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-xl text-sky-100/80 max-w-2xl mx-auto font-medium leading-relaxed mb-8"
        >
          Step through the Anywhere Door into a living, interactive anime universe. Uncover 22nd-century secret gadgets, character lore, movie archives, and playable mini-games.
        </p>

        {/* Interactive Character Centerpiece */}
        <div
          ref={characterRef}
          className="relative my-4 cursor-pointer select-none group"
          onClick={() => sounds.playBellChime()}
          title="Click Doraemon's Bell!"
        >
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-tr from-sky-600 via-sky-400 to-sky-300 p-1.5 shadow-2xl shadow-sky-500/40 group-hover:scale-105 transition-all duration-300">
            <div className="w-full h-full rounded-full bg-[#0B2545] border-4 border-white flex flex-col items-center justify-center overflow-hidden relative">
              {/* Doraemon Face Illustration */}
              <div className="w-36 h-36 rounded-full bg-[#008CD7] flex flex-col items-center justify-center relative shadow-inner">
                {/* White Face Mask */}
                <div className="w-28 h-24 bg-white rounded-[50%] mt-6 relative flex flex-col items-center justify-start pt-2">
                  {/* Eyes */}
                  <div className="flex gap-1 -mt-4">
                    <div className="w-6 h-8 bg-white border-2 border-slate-900 rounded-full flex items-center justify-end pr-1">
                      <div className="w-2 h-3 bg-slate-900 rounded-full"></div>
                    </div>
                    <div className="w-6 h-8 bg-white border-2 border-slate-900 rounded-full flex items-center justify-start pl-1">
                      <div className="w-2 h-3 bg-slate-900 rounded-full"></div>
                    </div>
                  </div>
                  {/* Red Nose */}
                  <div className="w-4 h-4 bg-red-500 rounded-full border border-slate-900 -mt-1 shadow-sm"></div>
                  {/* Whiskers */}
                  <div className="w-full flex justify-between px-2 -mt-1">
                    <div className="space-y-1">
                      <div className="w-4 h-0.5 bg-slate-800 -rotate-12"></div>
                      <div className="w-4 h-0.5 bg-slate-800"></div>
                      <div className="w-4 h-0.5 bg-slate-800 rotate-12"></div>
                    </div>
                    <div className="space-y-1">
                      <div className="w-4 h-0.5 bg-slate-800 rotate-12"></div>
                      <div className="w-4 h-0.5 bg-slate-800"></div>
                      <div className="w-4 h-0.5 bg-slate-800 -rotate-12"></div>
                    </div>
                  </div>
                  {/* Happy Smile */}
                  <div className="w-12 h-6 border-b-2 border-slate-900 rounded-b-full mt-0.5"></div>
                </div>

                {/* Red Collar & Golden Bell */}
                <div className="absolute -bottom-1 w-full h-3 bg-red-600 border-t border-slate-900 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-[#FFD200] border-2 border-slate-900 shadow-md flex items-center justify-center -mb-2 group-hover:rotate-12 transition-transform">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-900"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-bold tracking-wider shadow-lg flex items-center gap-1 group-hover:bg-amber-400">
            <Wand2 className="w-3 h-3" />
            <span>TOUCH BELL</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div ref={buttonsRef} className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <a
            href="#universe-portal"
            onClick={handleExploreClick}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-blue-600 text-white font-bold text-sm tracking-wide shadow-xl shadow-sky-500/30 hover:shadow-sky-400/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer"
          >
            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            <span>EXPLORE UNIVERSE</span>
          </a>

          <Link
            href="/characters"
            onClick={() => sounds.playPop()}
            className="px-7 py-3.5 rounded-full bg-[#0B2545]/80 hover:bg-sky-900/60 border border-sky-400/30 text-sky-200 hover:text-white font-bold text-sm tracking-wide backdrop-blur-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-sky-400" />
            <span>DISCOVER CHARACTERS</span>
          </Link>
        </div>

        {/* Scroll indicator prompt */}
        <div className="mt-12 flex flex-col items-center gap-2 text-sky-300/60 text-xs">
          <span>Scroll to uncover 22nd century wonder</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-sky-400" />
        </div>
      </div>
    </section>
  );
}
