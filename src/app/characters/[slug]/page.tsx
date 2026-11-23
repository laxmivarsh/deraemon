import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Sparkles, 
  Heart, 
  Utensils, 
  Calendar, 
  Users, 
  Award, 
  Volume2, 
  HelpCircle,
  Shield,
  Brain,
  Zap
} from 'lucide-react';
import { initialCharacters } from '@/data/characters';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return initialCharacters.map((char) => ({
    slug: char.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const character = initialCharacters.find((c) => c.slug === params.slug);
  if (!character) return { title: 'Character Not Found' };

  return {
    title: `${character.name} | Doraemon Universe Encyclopedia`,
    description: character.short_intro,
  };
}

export default function CharacterDetailPage({ params }: { params: { slug: string } }) {
  const character = initialCharacters.find((c) => c.slug === params.slug);

  if (!character) {
    notFound();
  }

  const relatedList = initialCharacters.filter((c) => 
    character.related_characters?.includes(c.slug)
  );

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/characters"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-950/60 hover:bg-sky-900/60 border border-sky-500/30 text-sky-200 text-xs font-bold transition-all shadow-md group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Character Directory</span>
        </Link>
      </div>

      {/* Main Hero Header */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0B2545] to-[#06182E] border border-sky-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden mb-12">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ backgroundColor: character.color_theme }}
        ></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Character Portrait with ring */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-2 bg-gradient-to-tr from-sky-400 via-sky-300 to-amber-300 shadow-2xl shadow-sky-500/30">
              <div
                className="w-full h-full rounded-full bg-cover bg-center overflow-hidden border-4 border-slate-900 shadow-inner"
                style={{ backgroundImage: `url(${character.image_url})` }}
              >
                <div className="w-full h-full bg-sky-950/15"></div>
              </div>
            </div>

            {/* Favorite food badge */}
            <div className="mt-4 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold inline-flex items-center gap-1.5 shadow-sm">
              <Utensils className="w-3.5 h-3.5" />
              <span>Fav: {character.favourite_food}</span>
            </div>
          </div>

          {/* Character Bio & Info */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-400/30">
                {character.category}
              </span>
              <span className="text-sm font-mono text-slate-400 px-3 py-1 rounded-full bg-slate-900/40 border border-slate-700/50">
                {character.japanese_name}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              {character.name}
            </h1>

            {character.sound_voice_quote && (
              <div className="p-3.5 rounded-2xl bg-sky-950/60 border border-sky-500/30 flex items-center gap-3 text-sky-200 text-sm italic">
                <Volume2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>&ldquo;{character.sound_voice_quote}&rdquo;</span>
              </div>
            )}

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {character.biography}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-sky-200/80">
              <div className="flex items-center gap-1.5 bg-sky-900/30 px-3 py-1.5 rounded-xl border border-sky-500/20">
                <Calendar className="w-4 h-4 text-sky-400" />
                <span>First Appearance: {character.first_appearance}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Personality & Stats + Relationships & Trivia */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Column: Stats & Personality */}
        <div className="lg:col-span-5 space-y-6">
          {/* Personality Card */}
          <div className="p-6 rounded-3xl bg-[#0B2545] border border-sky-500/20 shadow-lg space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-sky-400" /> Personality Traits
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {character.personality}
            </p>
          </div>

          {/* Stats Bar */}
          {character.stats && (
            <div className="p-6 rounded-3xl bg-[#0B2545] border border-sky-500/20 shadow-lg space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" /> Character Attributes
              </h3>

              <div className="space-y-3 text-xs">
                {Object.entries(character.stats).map(([stat, val]) => (
                  <div key={stat} className="space-y-1">
                    <div className="flex justify-between font-semibold capitalize text-slate-300">
                      <span>{stat.replace('_', ' ')}</span>
                      <span className="text-sky-300">{val}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-400 to-amber-400 transition-all duration-700"
                        style={{ width: `${val}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Relationships Graph / Pills */}
          <div className="p-6 rounded-3xl bg-[#0B2545] border border-sky-500/20 shadow-lg space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-pink-400" /> Key Relationships
            </h3>

            {character.relationships.family && (
              <div>
                <p className="text-[11px] font-bold text-sky-300 uppercase tracking-wider mb-2">Family</p>
                <div className="flex flex-wrap gap-2">
                  {character.relationships.family.map((item, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-pink-950/40 border border-pink-500/30 text-pink-200 text-xs">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {character.relationships.friends && (
              <div>
                <p className="text-[11px] font-bold text-sky-300 uppercase tracking-wider mb-2">Friends & Allies</p>
                <div className="flex flex-wrap gap-2">
                  {character.relationships.friends.map((item, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-sky-950/40 border border-sky-500/30 text-sky-200 text-xs">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {character.relationships.rivals && (
              <div>
                <p className="text-[11px] font-bold text-rose-300 uppercase tracking-wider mb-2">Rivals / Fears</p>
                <div className="flex flex-wrap gap-2">
                  {character.relationships.rivals.map((item, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Interesting Canonical Facts & Trivia */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-[#0B2545] border border-sky-500/20 shadow-lg space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Canonical Lore & Trivia
            </h3>

            <div className="space-y-3">
              {character.interesting_facts.map((fact, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-sky-950/50 border border-sky-500/20 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {fact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Characters Roster */}
          {relatedList.length > 0 && (
            <div className="p-6 rounded-3xl bg-[#0B2545] border border-sky-500/20 shadow-lg space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-400" /> Related Companions
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {relatedList.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/characters/${rel.slug}`}
                    className="p-3 rounded-2xl bg-sky-950/40 border border-sky-500/20 hover:border-sky-400/50 flex flex-col items-center text-center transition-all group"
                  >
                    <div className="w-14 h-14 rounded-full p-0.5 bg-sky-400 mb-2 group-hover:scale-105 transition-transform">
                      <div
                        className="w-full h-full rounded-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${rel.image_url})` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                      {rel.name}
                    </span>
                    <span className="text-[10px] text-sky-300/60 mt-0.5">
                      {rel.category.split(' ')[0]}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
