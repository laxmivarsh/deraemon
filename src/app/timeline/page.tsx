'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Clock, Calendar, Sparkles, Filter, ChevronRight, Bookmark } from 'lucide-react';
import { gsap } from 'gsap';
import { initialTimeline } from '@/data/timeline';
import { sounds } from '@/lib/audio';

const timelineCategories = [
  'All Milestones',
  'In-Universe Lore',
  'Manga Milestones',
  'Anime Eras',
  'Movie Milestones'
];

export default function TimelinePage() {
  const [selectedCat, setSelectedCat] = useState('All Milestones');
  const [expandedEventId, setExpandedEventId] = useState<string | null>('time-1');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredEvents = initialTimeline.filter(
    (ev) => selectedCat === 'All Milestones' || ev.category === selectedCat
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.timeline-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [selectedCat]);

  return (
    <div ref={containerRef} className="pt-28 pb-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Clock className="w-4 h-4" />
          <span>Chronological Spacetime Continuum</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
          INTERACTIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-amber-300">TIMELINE</span>
        </h1>
        <p className="text-sm sm:text-base text-sky-200/70">
          Traverse time from 2112 (Doraemon&apos;s robotic assembly) through Fujiko F. Fujio&apos;s 1969 manga debut, landmark anime eras, and modern theatrical milestones.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 bg-[#0B2545]/60 p-3 rounded-full border border-sky-500/20 max-w-2xl mx-auto backdrop-blur-md">
        {timelineCategories.map((cat) => {
          const isSelected = selectedCat === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                sounds.playPop();
                setSelectedCat(cat);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30 scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-sky-900/40'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Vertical Spine Timeline */}
      <div className="relative border-l-2 border-sky-500/30 ml-4 sm:ml-32 pl-6 sm:pl-10 space-y-10">
        {filteredEvents.map((event, idx) => {
          const isExpanded = expandedEventId === event.id;

          return (
            <div
              key={event.id}
              className="timeline-card relative group cursor-pointer"
              onClick={() => {
                sounds.playPop();
                setExpandedEventId(isExpanded ? null : event.id);
              }}
            >
              {/* Year Marker on the left spine */}
              <div className="absolute -left-[35px] sm:-left-[125px] top-1 sm:top-2 flex items-center gap-2">
                <span className="hidden sm:inline-block w-16 text-right font-mono font-bold text-xs text-amber-300">
                  {event.year}
                </span>
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold shadow-md transition-all ${
                  isExpanded
                    ? 'bg-amber-400 border-white text-slate-950 scale-125 ring-4 ring-amber-400/30'
                    : 'bg-[#0B2545] border-sky-400 text-sky-300 group-hover:border-amber-400'
                }`}>
                  🔔
                </span>
              </div>

              {/* Event Card Content */}
              <div className={`p-6 rounded-3xl border transition-all duration-300 ${
                isExpanded
                  ? 'bg-gradient-to-br from-[#0B2545] to-[#081F3B] border-sky-400 shadow-xl shadow-sky-500/20 translate-x-1'
                  : 'bg-[#0B2545]/70 border-sky-500/20 hover:bg-[#0B2545] hover:border-sky-400/40'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-bold border border-sky-400/30">
                      {event.category}
                    </span>
                    <span className="sm:hidden text-xs font-mono font-bold text-amber-300">
                      {event.year}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-sky-400 flex items-center gap-1">
                    {isExpanded ? 'Collapse' : 'Expand Event'}
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </span>
                </div>

                <h3 className="text-xl font-black text-white group-hover:text-sky-300 transition-colors">
                  {event.title}
                </h3>

                <p className={`text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                  {event.description}
                </p>

                {isExpanded && event.image_url && (
                  <div className="mt-4 rounded-2xl overflow-hidden border border-sky-500/30 h-48 sm:h-64 shadow-md">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${event.image_url})` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
