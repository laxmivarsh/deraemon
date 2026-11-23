'use client';

import React, { useState } from 'react';
import { Gamepad2, HelpCircle, UserCheck, Wrench, Layers, Wand2, Sparkles } from 'lucide-react';
import QuizGame from '@/components/games/QuizGame';
import GuessCharacterGame from '@/components/games/GuessCharacterGame';
import GuessGadgetGame from '@/components/games/GuessGadgetGame';
import MemoryMatchGame from '@/components/games/MemoryMatchGame';
import RandomGadgetGenerator from '@/components/games/RandomGadgetGenerator';
import { sounds } from '@/lib/audio';

type GameTab = 'quiz' | 'character' | 'gadget' | 'memory' | 'pocket';

const gamesList = [
  { id: 'quiz' as GameTab, name: 'Doraemon Quiz', icon: HelpCircle, desc: 'Timed trivia test' },
  { id: 'character' as GameTab, name: 'Guess Character', icon: UserCheck, desc: 'Silhouette clue game' },
  { id: 'gadget' as GameTab, name: 'Gadget Guesser', icon: Wrench, desc: 'Emergency crisis solver' },
  { id: 'memory' as GameTab, name: 'Memory Match', icon: Layers, desc: 'Card flip pairing' },
  { id: 'pocket' as GameTab, name: '4D Pocket Pull', icon: Wand2, desc: 'Surprise gadget generator' },
];

export default function GamesPage() {
  const [activeTab, setActiveTab] = useState<GameTab>('quiz');

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Gamepad2 className="w-4 h-4" />
          <span>Interactive Entertainment Hub</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
          GAMES & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-sky-300">TRIVIA ZONE</span>
        </h1>
        <p className="text-sm sm:text-base text-sky-200/70">
          Play 5 genuine interactive mini-games crafted for fans. Test your anime lore knowledge, flip memory cards, solve gadget dilemmas, and reach into Doraemon&apos;s pocket!
        </p>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {gamesList.map((g) => {
          const isSelected = activeTab === g.id;
          const Icon = g.icon;

          return (
            <button
              key={g.id}
              onClick={() => {
                sounds.playPop();
                setActiveTab(g.id);
              }}
              className={`px-5 py-3 rounded-2xl border transition-all flex items-center gap-2.5 text-xs sm:text-sm font-bold shadow-md ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-300 shadow-amber-500/25 scale-105'
                  : 'bg-[#0B2545] border-sky-500/20 text-slate-200 hover:text-white hover:bg-sky-900/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{g.name}</span>
            </button>
          );
        })}
      </div>

      {/* Game Arena Stage */}
      <div className="relative min-h-[460px] flex items-center justify-center">
        {activeTab === 'quiz' && <QuizGame />}
        {activeTab === 'character' && <GuessCharacterGame />}
        {activeTab === 'gadget' && <GuessGadgetGame />}
        {activeTab === 'memory' && <MemoryMatchGame />}
        {activeTab === 'pocket' && <RandomGadgetGenerator />}
      </div>
    </div>
  );
}
