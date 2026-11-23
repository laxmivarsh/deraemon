'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Compass, 
  Users, 
  Wrench, 
  Film, 
  Tv, 
  Clock, 
  Gamepad2, 
  Globe, 
  Image as ImageIcon, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Search, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';
import { sounds } from '@/lib/audio';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/', icon: Compass },
  { name: 'Characters', href: '/characters', icon: Users },
  { name: 'Gadgets', href: '/gadgets', icon: Wrench },
  { name: 'Movies', href: '/movies', icon: Film },
  { name: 'Episodes', href: '/episodes', icon: Tv },
  { name: 'Timeline', href: '/timeline', icon: Clock },
  { name: 'Games', href: '/games', icon: Gamepad2 },
  { name: '3D World', href: '/world', icon: Globe },
  { name: 'Gallery', href: '/gallery', icon: ImageIcon },
  { name: 'Admin', href: '/admin', icon: ShieldCheck },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMuted(sounds.getMuted());

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
  };

  const triggerSearch = () => {
    sounds.playPop();
    const event = new CustomEvent('open-doraemon-search');
    window.dispatchEvent(event);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 py-3',
          isScrolled
            ? 'bg-[#081B33]/90 backdrop-blur-md shadow-lg shadow-sky-950/40 border-b border-sky-500/20 py-2.5'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo with animated Bell & Collar */}
          <Link
            href="/"
            onClick={() => sounds.playBellChime()}
            className="flex items-center gap-2.5 group cursor-pointer select-none"
          >
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 via-sky-400 to-sky-300 p-0.5 shadow-md shadow-sky-500/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-[#0B2545] flex items-center justify-center overflow-hidden relative">
                {/* Doraemon Whiskers & Bell */}
                <span className="w-3.5 h-3.5 rounded-full bg-[#FFD200] border border-amber-300 flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform duration-300">
                  <span className="w-1 h-1 rounded-full bg-amber-900"></span>
                </span>
                <span className="absolute bottom-1 w-5 h-0.5 bg-red-500 rounded-full"></span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-white group-hover:text-sky-300 transition-colors flex items-center gap-1">
                DORAEMON
                <span className="text-xs px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-semibold border border-sky-400/30">
                  UNIVERSE
                </span>
              </span>
              <span className="text-[10px] text-sky-200/60 font-medium tracking-wide">
                Interactive Fan Encyclopedia
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0B2545]/60 border border-sky-400/20 rounded-full px-3 py-1.5 backdrop-blur-md shadow-inner">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => sounds.playPop()}
                  className={cn(
                    'relative px-3 py-1.5 text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all duration-200',
                    isActive
                      ? 'text-white bg-gradient-to-r from-sky-500 to-blue-600 shadow-md shadow-sky-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-sky-500/15'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#FFD200] rounded-full shadow-sm shadow-amber-300"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Tools: Global Search + Sound FX Toggle + Mobile Menu Trigger */}
          <div className="flex items-center gap-2">
            {/* Global Search Button */}
            <button
              onClick={triggerSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-950/70 border border-sky-500/30 text-sky-200 hover:text-white hover:bg-sky-800/40 hover:border-sky-400 text-xs font-medium transition-all shadow-sm group"
              title="Global Search (Press ⌘K or Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-sky-900/60 rounded border border-sky-600/40 text-sky-300">
                ⌘K
              </kbd>
            </button>

            {/* Audio Toggle Button */}
            <button
              onClick={handleSoundToggle}
              className={cn(
                'p-2 rounded-full border transition-all duration-300',
                isMuted
                  ? 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
                  : 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm shadow-amber-400/30 animate-pulse'
              )}
              title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                sounds.playPop();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-full bg-sky-900/60 border border-sky-500/30 text-sky-200 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-slate-950/80 backdrop-blur-xl pt-20 px-6 pb-8 flex flex-col justify-between animate-in fade-in zoom-in-95 duration-200">
          <div className="grid grid-cols-2 gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    sounds.playPop();
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    'p-3.5 rounded-2xl flex items-center gap-3 border transition-all duration-200 text-sm font-semibold',
                    isActive
                      ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white border-sky-400 shadow-lg shadow-sky-500/25'
                      : 'bg-sky-950/40 text-slate-300 border-sky-500/20 hover:bg-sky-900/50 hover:text-white'
                  )}
                >
                  <Icon className="w-4 h-4 text-sky-300" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-sky-950/40 border border-sky-500/20 text-center">
            <p className="text-xs text-sky-300/70">
              Unofficial fan encyclopedia dedicated to Fujiko F. Fujio’s timeless universe.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
