'use client';

import React, { useState } from 'react';
import { HelpCircle, Sparkles, CheckCircle2, XCircle, RotateCcw, Lightbulb } from 'lucide-react';
import { characterGuessData } from '@/data/games';
import { sounds } from '@/lib/audio';

const characterOptions = [
  'Doraemon',
  'Nobita Nobi',
  'Shizuka Minamoto',
  'Takeshi "Gian" Goda',
  'Suneo Honekawa',
  'Dorami'
];

export default function GuessCharacterGame() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealedClues, setRevealedClues] = useState(1);
  const [selectedGuess, setSelectedGuess] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const character = characterGuessData[currentIdx];

  const handleRevealClue = () => {
    sounds.playPop();
    if (revealedClues < character.clues.length) {
      setRevealedClues((c) => c + 1);
    }
  };

  const handleGuess = (guess: string) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedGuess(guess);

    if (guess === character.name) {
      sounds.playSuccess();
      const points = 30 - (revealedClues - 1) * 8;
      setScore((s) => s + Math.max(10, points));
    } else {
      sounds.playFailure();
    }
  };

  const handleNext = () => {
    sounds.playPop();
    if (currentIdx + 1 < characterGuessData.length) {
      setCurrentIdx((i) => i + 1);
      setRevealedClues(1);
      setSelectedGuess(null);
      setIsAnswered(false);
    } else {
      // Loop or restart
      setCurrentIdx(0);
      setRevealedClues(1);
      setSelectedGuess(null);
      setIsAnswered(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#0B2545] border border-sky-500/30 space-y-6 shadow-2xl">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-bold border-b border-sky-900/60 pb-3">
        <span className="text-sky-300">
          Character {currentIdx + 1} of {characterGuessData.length}
        </span>
        <span className="text-amber-300 font-mono">
          Score: {score}
        </span>
      </div>

      {/* Silhouette Centerpiece */}
      <div className="relative w-40 h-40 mx-auto rounded-full p-2 bg-gradient-to-tr from-sky-500 to-amber-300 flex items-center justify-center shadow-lg">
        <div
          className={`w-full h-full rounded-full bg-cover bg-center transition-all duration-700 ${
            isAnswered ? 'filter-none' : 'filter brightness-0 contrast-200 blur-sm'
          }`}
          style={{ backgroundImage: `url(${character.image_url})` }}
        ></div>
        {!isAnswered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-black text-amber-300 drop-shadow">?</span>
          </div>
        )}
      </div>

      {/* Clues Box */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-sky-300">
          <span className="flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Character Clues ({revealedClues}/{character.clues.length})</span>
          </span>

          {revealedClues < character.clues.length && !isAnswered && (
            <button
              onClick={handleRevealClue}
              className="text-[11px] text-amber-300 hover:text-amber-200 underline underline-offset-2"
            >
              + Reveal Next Clue (-5 pts)
            </button>
          )}
        </div>

        <div className="space-y-2">
          {character.clues.slice(0, revealedClues).map((clue, i) => (
            <div
              key={i}
              className="p-3 rounded-2xl bg-sky-950/60 border border-sky-500/20 text-xs text-slate-200 animate-in fade-in duration-200"
            >
              <span className="font-bold text-amber-300 mr-1.5">Clue #{i + 1}:</span>
              {clue}
            </div>
          ))}
        </div>
      </div>

      {/* Guessing Options */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-slate-300">Who is this character?</p>
        <div className="grid grid-cols-2 gap-2">
          {characterOptions.map((opt) => {
            let style = 'bg-sky-950/40 border-sky-500/20 text-slate-200 hover:bg-sky-900/40';

            if (isAnswered) {
              if (opt === character.name) {
                style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
              } else if (opt === selectedGuess) {
                style = 'bg-rose-950/80 border-rose-500 text-rose-200';
              } else {
                style = 'opacity-30 bg-sky-950/20 border-sky-900/30 text-slate-400';
              }
            }

            return (
              <button
                key={opt}
                onClick={() => handleGuess(opt)}
                disabled={isAnswered}
                className={`p-3 rounded-xl border text-xs font-semibold transition-all ${style}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Next button */}
      {isAnswered && (
        <div className="pt-2 animate-in fade-in duration-200">
          <button
            onClick={handleNext}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] transition-transform"
          >
            {currentIdx + 1 < characterGuessData.length ? 'Next Mystery Character' : 'Loop & Keep Playing'}
          </button>
        </div>
      )}
    </div>
  );
}
