'use client';

import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { memoryCardPairs } from '@/data/games';
import { sounds } from '@/lib/audio';

interface CardItem {
  instanceId: number;
  pairId: string;
  name: string;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryMatchGame() {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [isWon, setIsWon] = useState(false);

  // Initialize and shuffle card deck
  const initGame = () => {
    sounds.playBellChime();
    const deck: CardItem[] = [];
    let idCounter = 0;

    memoryCardPairs.forEach((pair) => {
      // 2 cards for each pair
      deck.push({
        instanceId: idCounter++,
        pairId: pair.pairId,
        name: pair.name,
        color: pair.color,
        isFlipped: false,
        isMatched: false,
      });
      deck.push({
        instanceId: idCounter++,
        pairId: pair.pairId,
        name: pair.name,
        color: pair.color,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle deck
    const shuffled = deck.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatchedCount(0);
    setIsWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (idx: number) => {
    const card = cards[idx];
    if (card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    sounds.playPop();

    const newCards = [...cards];
    newCards[idx].isFlipped = true;
    setCards(newCards);

    const nextFlipped = [...flippedCards, idx];
    setFlippedCards(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const firstIdx = nextFlipped[0];
      const secondIdx = nextFlipped[1];

      if (cards[firstIdx].pairId === cards[secondIdx].pairId) {
        // MATCH!
        sounds.playSuccess();
        setTimeout(() => {
          const matchedDeck = [...cards];
          matchedDeck[firstIdx].isMatched = true;
          matchedDeck[secondIdx].isMatched = true;
          setCards(matchedDeck);
          setFlippedCards([]);
          setMatchedCount((c) => {
            const next = c + 1;
            if (next === memoryCardPairs.length) {
              setIsWon(true);
              confetti({ particleCount: 120, spread: 80 });
            }
            return next;
          });
        }, 400);
      } else {
        // NO MATCH
        setTimeout(() => {
          const resetDeck = [...cards];
          resetDeck[firstIdx].isFlipped = false;
          resetDeck[secondIdx].isFlipped = false;
          setCards(resetDeck);
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Metrics Bar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0B2545] border border-sky-500/20 text-xs font-bold text-slate-300">
        <span>Moves: <span className="text-amber-300 font-mono text-sm">{moves}</span></span>
        <span>Pairs Found: <span className="text-sky-300 font-mono text-sm">{matchedCount} / {memoryCardPairs.length}</span></span>
        <button
          onClick={initGame}
          className="px-3 py-1.5 rounded-full bg-sky-900/60 hover:bg-sky-800 border border-sky-500/30 text-white flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Deck</span>
        </button>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card, idx) => {
          const isRevealed = card.isFlipped || card.isMatched;

          return (
            <div
              key={card.instanceId}
              onClick={() => handleCardClick(idx)}
              className={`h-24 sm:h-28 rounded-2xl cursor-pointer border transition-all duration-300 perspective-1000 flex items-center justify-center p-2 text-center select-none ${
                card.isMatched
                  ? 'border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-500/20 scale-95'
                  : isRevealed
                  ? 'border-amber-400 bg-sky-950 shadow-md shadow-sky-500/30 scale-100'
                  : 'border-sky-500/30 bg-[#0B2545] hover:bg-sky-900/40 hover:border-sky-400'
              }`}
            >
              {isRevealed ? (
                <div className="space-y-1 animate-in zoom-in-75 duration-200">
                  <div className={`w-8 h-8 rounded-full ${card.color} text-white font-bold flex items-center justify-center mx-auto text-xs shadow-md`}>
                    🔔
                  </div>
                  <p className="text-[11px] font-bold text-white line-clamp-1">{card.name}</p>
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-xs text-sky-300">
                  ?
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Win Banner */}
      {isWon && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-[#0B2545] to-emerald-950 border border-emerald-500/40 text-center space-y-3 shadow-2xl animate-in fade-in duration-300">
          <Trophy className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-xl font-black text-white">Congratulations! Memory Master!</h3>
          <p className="text-xs text-sky-200/80">
            You matched all 8 pairs in <span className="font-bold text-amber-300">{moves} moves</span>!
          </p>
          <button
            onClick={initGame}
            className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
