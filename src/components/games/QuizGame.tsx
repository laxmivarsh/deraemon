'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, Clock, CheckCircle2, XCircle, Award, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { quizQuestions } from '@/data/games';
import { sounds } from '@/lib/audio';

export default function QuizGame() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQ = quizQuestions[currentIdx];

  // Countdown timer for each question
  useEffect(() => {
    if (isAnswered || isGameOver) return;

    if (timeLeft <= 0) {
      handleTimeOut();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, isGameOver]);

  const handleTimeOut = () => {
    sounds.playFailure();
    setIsAnswered(true);
    setSelectedOpt(-1);
  };

  const handleAnswer = (optionIdx: number) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOpt(optionIdx);

    if (optionIdx === currentQ.correct_answer) {
      sounds.playSuccess();
      setScore((s) => s + 10 + Math.max(0, timeLeft));
    } else {
      sounds.playFailure();
    }
  };

  const nextQuestion = () => {
    sounds.playPop();
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx((i) => i + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
      setTimeLeft(15);
    } else {
      setIsGameOver(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const restartQuiz = () => {
    sounds.playBellChime();
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setTimeLeft(15);
    setIsGameOver(false);
  };

  if (isGameOver) {
    return (
      <div className="p-8 rounded-3xl bg-[#0B2545] border border-sky-500/30 text-center max-w-xl mx-auto space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/40 flex items-center justify-center mx-auto text-3xl">
          🏆
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">Quiz Completed!</h3>
          <p className="text-sm text-sky-200/70 mt-1">
            You scored <span className="font-bold text-amber-300 text-lg">{score} Points</span>!
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-sky-950/60 border border-sky-500/20 text-xs text-slate-300">
          {score >= 60 ? (
            <p>🌟 True 22nd Century Scholar! Doraemon awards you a freshly baked Dorayaki!</p>
          ) : (
            <p>📖 Good effort! Doraemon recommends eating a slice of Memory Bread before retrying!</p>
          )}
        </div>

        <button
          onClick={restartQuiz}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 mx-auto shadow-lg shadow-sky-500/30 hover:scale-105 transition-transform"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Play Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#0B2545] border border-sky-500/30 max-w-2xl mx-auto space-y-6 shadow-2xl">
      {/* Top Bar: Question index, timer, score */}
      <div className="flex items-center justify-between text-xs font-bold border-b border-sky-900/60 pb-4">
        <span className="text-sky-300">
          Question {currentIdx + 1} of {quizQuestions.length}
        </span>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950 border border-sky-500/30 text-amber-300">
          <Clock className="w-3.5 h-3.5" />
          <span>{timeLeft}s</span>
        </div>

        <span className="text-amber-300 font-mono">
          Score: {score}
        </span>
      </div>

      {/* Question Text */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
          {currentQ.category} • {currentQ.difficulty.toUpperCase()}
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-white pt-2 leading-snug">
          {currentQ.question}
        </h3>
      </div>

      {/* Options List */}
      <div className="space-y-2.5">
        {currentQ.options.map((option, idx) => {
          let btnStyle = 'bg-sky-950/50 border-sky-500/20 text-slate-200 hover:bg-sky-900/40 hover:border-sky-400/40';

          if (isAnswered) {
            if (idx === currentQ.correct_answer) {
              btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/20';
            } else if (idx === selectedOpt) {
              btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
            } else {
              btnStyle = 'opacity-40 bg-sky-950/20 border-sky-900/40 text-slate-400';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={isAnswered}
              className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
            >
              <span>{option}</span>
              {isAnswered && idx === currentQ.correct_answer && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              {isAnswered && idx === selectedOpt && idx !== currentQ.correct_answer && (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Explanation & Next Question button */}
      {isAnswered && (
        <div className="p-4 rounded-2xl bg-sky-950/80 border border-sky-500/30 space-y-3 animate-in fade-in duration-200">
          <p className="text-xs text-sky-200/90 leading-relaxed">
            <span className="font-bold text-amber-300">Canon Explanation:</span> {currentQ.explanation}
          </p>

          <button
            onClick={nextQuestion}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] transition-transform"
          >
            {currentIdx + 1 < quizQuestions.length ? 'Next Question' : 'View Final Score'}
          </button>
        </div>
      )}
    </div>
  );
}
