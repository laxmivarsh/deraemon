import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Film, 
  Calendar, 
  Clock, 
  Award, 
  User, 
  Wrench, 
  ExternalLink,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { initialMovies } from '@/data/movies';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return initialMovies.map((m) => ({
    slug: m.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const movie = initialMovies.find((m) => m.slug === params.slug);
  if (!movie) return { title: 'Movie Not Found' };

  return {
    title: `${movie.title} | Doraemon Movie Collection`,
    description: movie.description,
  };
}

export default function MovieDetailPage({ params }: { params: { slug: string } }) {
  const movie = initialMovies.find((m) => m.slug === params.slug);

  if (!movie) {
    notFound();
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
      {/* Back button */}
      <div>
        <Link
          href="/movies"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-950/60 hover:bg-sky-900/60 border border-sky-500/30 text-sky-200 text-xs font-bold transition-all shadow-md group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Movie Archives</span>
        </Link>
      </div>

      {/* Main Banner */}
      <div className="relative rounded-3xl bg-[#0B2545] border border-sky-500/30 overflow-hidden shadow-2xl">
        <div className="relative h-72 sm:h-96 w-full">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.poster_url})` }}
          >
            <div className="w-full h-full bg-gradient-to-t from-[#0B2545] via-[#0B2545]/70 to-transparent"></div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-sky-500 text-white text-xs font-bold">
                  {movie.release_year}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900/80 text-sky-300 text-xs font-semibold border border-sky-500/30">
                  {movie.decade}
                </span>
                <span className="text-xs font-mono text-slate-300">
                  {movie.japanese_title}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {movie.title}
              </h1>
            </div>

            {movie.trailer_url && (
              <a
                href={movie.trailer_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-600/30 transition-transform active:scale-95 self-start md:self-auto"
              >
                <span>Watch Official Trailer</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Metadata Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-[#0B2545] border border-sky-500/20">
          <Clock className="w-5 h-5 text-sky-400 mx-auto mb-1" />
          <span className="text-xs text-slate-400">Runtime</span>
          <p className="text-base font-bold text-white">{movie.runtime_minutes} Minutes</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#0B2545] border border-sky-500/20">
          <User className="w-5 h-5 text-amber-400 mx-auto mb-1" />
          <span className="text-xs text-slate-400">Director</span>
          <p className="text-base font-bold text-white truncate">{movie.director}</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#0B2545] border border-sky-500/20">
          <Award className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
          <span className="text-xs text-slate-400">Box Office</span>
          <p className="text-base font-bold text-white">{movie.box_office || 'Blockbuster'}</p>
        </div>
        <div className="p-4 rounded-2xl bg-[#0B2545] border border-sky-500/20">
          <Film className="w-5 h-5 text-pink-400 mx-auto mb-1" />
          <span className="text-xs text-slate-400">Genres</span>
          <p className="text-base font-bold text-white truncate">{movie.genres.join(', ')}</p>
        </div>
      </div>

      {/* Synopsis & Featured Gadgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#0B2545] border border-sky-500/20 shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Film className="w-5 h-5 text-sky-400" /> Complete Narrative Synopsis
          </h2>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {movie.synopsis}
          </p>

          <div className="pt-4 border-t border-sky-900/50 p-4 rounded-2xl bg-sky-950/40 border border-sky-500/20 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 leading-relaxed">
              Official Viewing Advisory: This fan encyclopedia does not stream copyrighted video files. To experience this feature film, please support official theatrical distributors, DVD/Blu-ray releases, and licensed anime broadcast channels.
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#0B2545] border border-sky-500/20 shadow-lg space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-amber-400" /> Key Featured Gadgets
          </h2>
          <p className="text-xs text-slate-300">
            Crucial inventions from Doraemon&apos;s 4-dimensional pocket deployed to overcome the challenges in this movie:
          </p>

          <div className="space-y-2">
            {movie.featured_gadgets.map((gadget, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-sky-950/50 border border-sky-500/20 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  <span className="text-sm font-semibold text-white">{gadget}</span>
                </div>
                <Link
                  href="/gadgets"
                  className="text-xs text-sky-400 hover:text-sky-300 font-bold"
                >
                  Inspect
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
