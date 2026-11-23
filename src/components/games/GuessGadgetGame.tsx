'use client';

import React, { useState } from 'react';
import { Wrench, CheckCircle2, XCircle, RotateCcw, Sparkles } from 'lucide-react';
import { sounds } from '@/lib/audio';

interface Scenario {
  id: string;
  situation: string;
  options: string[];
  correct: string;
  explanation: string;
}

const scenarios: Scenario[] = [
  {
    id: 'sc-1',
    situation: 'Nobita is stranded in a primordial Cretaceous jungle 100 million years ago and needs to return to his Tokyo home immediately.',
    options: ['Anywhere Door (Dokodemo Door)', 'Small Light', 'Pass Loop', 'Memory Bread'],
    correct: 'Anywhere Door (Dokodemo Door)',
    explanation: 'The Anywhere Door connects across space and time coordinates within a 10 light-year radius!'
  },
  {
    id: 'sc-2',
    situation: 'The gang needs to enter a thumb-sized alien starship to help President Papi fight galactic invaders.',
    options: ['Small Light (Shrink Ray)', 'Air Cannon', 'Take-copter', 'What-If Phone Booth'],
    correct: 'Small Light (Shrink Ray)',
    explanation: 'The Small Light emits molecular-compression photons, shrinking humans to toy dimensions.'
  },
  {
    id: 'sc-3',
    situation: 'Gian and Suneo trap Nobita in a dead-end alley with brick walls on every side.',
    options: ['Pass Loop (Toorinuke Hoop)', 'Memory Bread', 'Gourmet Tablecloth', 'Translation Jelly'],
    correct: 'Pass Loop (Toorinuke Hoop)',
    explanation: 'The Pass Loop creates an instant passage through any solid stone, concrete, or brick wall!'
  },
  {
    id: 'sc-4',
    situation: 'Nobita has zero marks on his math exam paper and desperately needs to memorize 30 pages of formulas before the bell rings.',
    options: ['Memory Bread (Anki-pan)', 'Take-copter', 'Air Cannon', 'Time Cloth'],
    correct: 'Memory Bread (Anki-pan)',
    explanation: 'Pressing Memory Bread onto textbook pages and eating the slice imprints the formulas directly into memory.'
  }
];

export default function GuessGadgetGame() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const scenario = scenarios[currentIdx];

  const handleSelect = (opt: string) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOpt(opt);

    if (opt === scenario.correct) {
      sounds.playSuccess();
      setScore((s) => s + 20);
    } else {
      sounds.playFailure();
    }
  };

  const nextScenario = () => {
    sounds.playPop();
    if (currentIdx + 1 < scenarios.length) {
      setCurrentIdx((i) => i + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setCurrentIdx(0);
      setSelectedOpt(null);
      setIsAnswered(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#0B2545] border border-sky-500/30 space-y-6 shadow-2xl">
      <div className="flex items-center justify-between text-xs font-bold border-b border-sky-900/60 pb-3">
        <span className="text-sky-300">Scenario {currentIdx + 1} of {scenarios.length}</span>
        <span className="text-amber-300 font-mono">Score: {score}</span>
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
          EMERGENCY SITUATION
        </span>
        <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
          {scenario.situation}
        </p>
      </div>

      <div className="space-y-2.5">
        <p className="text-xs text-sky-200/80 font-semibold">Which pocket gadget solves this predicament?</p>
        {scenario.options.map((opt) => {
          let style = 'bg-sky-950/40 border-sky-500/20 text-slate-200 hover:bg-sky-900/40';

          if (isAnswered) {
            if (opt === scenario.correct) {
              style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
            } else if (opt === selectedOpt) {
              style = 'bg-rose-950/80 border-rose-500 text-rose-200';
            } else {
              style = 'opacity-30 bg-sky-950/20 border-sky-900/30 text-slate-400';
            }
          }

          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={isAnswered}
              className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${style}`}
            >
              <span>{opt}</span>
              {isAnswered && opt === scenario.correct && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              )}
              {isAnswered && opt === selectedOpt && opt !== scenario.correct && (
                <XCircle className="w-4 h-4 text-rose-400" />
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="p-4 rounded-2xl bg-sky-950/80 border border-sky-500/30 space-y-3 animate-in fade-in duration-200">
          <p className="text-xs text-slate-200">
            <span className="font-bold text-amber-300">Why it works:</span> {scenario.explanation}
          </p>
          <button
            onClick={nextScenario}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider"
          >
            {currentIdx + 1 < scenarios.length ? 'Next Crisis' : 'Restart Scenarios'}
          </button>
        </div>
      )}
    </div>
  );
}
