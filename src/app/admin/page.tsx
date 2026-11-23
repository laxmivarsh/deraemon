'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Users, 
  Wrench, 
  Film, 
  HelpCircle, 
  Clock, 
  Database, 
  Check, 
  X, 
  AlertTriangle,
  ArrowRight,
  LogOut,
  Sparkles
} from 'lucide-react';
import { initialCharacters } from '@/data/characters';
import { initialGadgets } from '@/data/gadgets';
import { initialMovies } from '@/data/movies';
import { quizQuestions } from '@/data/games';
import { initialTimeline } from '@/data/timeline';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { sounds } from '@/lib/audio';
import { Character, Gadget, Movie, QuizQuestion, TimelineEvent } from '@/types';

type AdminTab = 'characters' | 'gadgets' | 'movies' | 'quiz' | 'timeline';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('characters');

  // Dynamic state for CRUD
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [gadgets, setGadgets] = useState<Gadget[]>(initialGadgets);
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [questions, setQuestions] = useState<QuizQuestion[]>(quizQuestions);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(initialTimeline);

  // Search filter
  const [searchFilter, setSearchFilter] = useState('');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState('');

  // Delete Confirm Modal
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin secret is doraemon2112
    if (password === 'doraemon2112' || password === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      sounds.playSuccess();
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      sounds.playFailure();
      setAuthError('Invalid admin passcode. Hint: doraemon2112');
    }
  };

  const handleLogout = () => {
    sounds.playPop();
    setIsAuthenticated(false);
    setPassword('');
  };

  const openAddModal = () => {
    sounds.playPop();
    setEditingItem(null);
    setFormName('');
    setFormCategory('Main Characters');
    setFormDesc('');
    setFormImage('https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80');
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    sounds.playPop();
    setEditingItem(item);
    setFormName(item.name || item.title || item.question);
    setFormCategory(item.category || '');
    setFormDesc(item.short_intro || item.description || item.explanation || '');
    setFormImage(item.image_url || item.poster_url || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();

    if (activeTab === 'characters') {
      if (editingItem) {
        setCharacters((prev) =>
          prev.map((c) =>
            c.id === editingItem.id
              ? { ...c, name: formName, category: formCategory as any, short_intro: formDesc, image_url: formImage }
              : c
          )
        );
      } else {
        const newChar: Character = {
          id: `char-${Date.now()}`,
          slug: formName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name: formName,
          category: (formCategory as any) || 'Main Characters',
          short_intro: formDesc,
          biography: formDesc,
          personality: 'Friendly and adventurous',
          favourite_food: 'Dorayaki',
          first_appearance: 'Special Chapter',
          relationships: {},
          interesting_facts: ['Newly added character record via Admin Portal'],
          image_url: formImage,
          color_theme: '#008CD7',
        };
        setCharacters([newChar, ...characters]);
      }
    } else if (activeTab === 'gadgets') {
      if (editingItem) {
        setGadgets((prev) =>
          prev.map((g) =>
            g.id === editingItem.id
              ? { ...g, name: formName, category: formCategory as any, description: formDesc, image_url: formImage }
              : g
          )
        );
      } else {
        const newGadget: Gadget = {
          id: `gadget-${Date.now()}`,
          slug: formName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          name: formName,
          category: (formCategory as any) || 'Travel & Mobility',
          description: formDesc,
          function_details: formDesc,
          interesting_facts: ['Added via Admin Console'],
          image_url: formImage,
          model_type: 'generic',
          color_theme: '#008CD7',
          risk_level: 'Safe',
        };
        setGadgets([newGadget, ...gadgets]);
      }
    }

    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    sounds.playFailure();

    if (activeTab === 'characters') {
      setCharacters((prev) => prev.filter((c) => c.id !== deleteId));
    } else if (activeTab === 'gadgets') {
      setGadgets((prev) => prev.filter((g) => g.id !== deleteId));
    } else if (activeTab === 'movies') {
      setMovies((prev) => prev.filter((m) => m.id !== deleteId));
    } else if (activeTab === 'quiz') {
      setQuestions((prev) => prev.filter((q) => q.id !== deleteId));
    } else if (activeTab === 'timeline') {
      setTimelineEvents((prev) => prev.filter((t) => t.id !== deleteId));
    }

    setDeleteId(null);
  };

  // If unauthenticated, show protected login screen
  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-24 px-4 sm:px-6 max-w-md mx-auto">
        <div className="p-8 rounded-3xl bg-[#0B2545] border border-sky-500/30 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-sky-500/20 text-sky-400 border border-sky-400/40 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-white">Admin Control Portal</h1>
            <p className="text-xs text-sky-200/70 mt-1">
              Authorized credentials required to manage the Doraemon Universe database.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="text-xs font-bold text-sky-300 block mb-1">Passcode</label>
              <div className="relative">
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin passcode (doraemon2112)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-sky-950 border border-sky-500/30 text-white placeholder-sky-400/30 text-xs focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>

            {authError && (
              <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-500/30 p-2.5 rounded-xl font-semibold">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/30 transition-transform active:scale-95"
            >
              Authenticate Admin Session
            </button>
          </form>

          <p className="text-[11px] text-slate-400">
            Default sandbox passcode: <code className="text-amber-300">doraemon2112</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0B2545] border border-sky-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-300 border border-sky-400/40 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Database Control Dashboard</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`}></span>
              <span className="text-xs text-slate-300">
                {isSupabaseConfigured ? 'Supabase Live Connected' : 'Local Canonical In-Memory Mode'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openAddModal}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Record</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-full bg-sky-950 border border-sky-500/30 text-slate-300 hover:text-white hover:bg-sky-900"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: 'Characters', count: characters.length, icon: Users, color: 'text-sky-400' },
          { label: 'Gadgets', count: gadgets.length, icon: Wrench, color: 'text-amber-400' },
          { label: 'Movies', count: movies.length, icon: Film, color: 'text-pink-400' },
          { label: 'Quiz Questions', count: questions.length, icon: HelpCircle, color: 'text-emerald-400' },
          { label: 'Timeline Milestones', count: timelineEvents.length, icon: Clock, color: 'text-purple-400' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-4 rounded-2xl bg-[#0B2545] border border-sky-500/20 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <span className="text-2xl font-black text-white mt-2">{stat.count}</span>
            </div>
          );
        })}
      </div>

      {/* Tab Switcher & Table */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-sky-900/60 pb-3">
          {[
            { id: 'characters' as AdminTab, label: `Characters (${characters.length})` },
            { id: 'gadgets' as AdminTab, label: `Gadgets (${gadgets.length})` },
            { id: 'movies' as AdminTab, label: `Movies (${movies.length})` },
            { id: 'quiz' as AdminTab, label: `Quiz Questions (${questions.length})` },
            { id: 'timeline' as AdminTab, label: `Timeline (${timelineEvents.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playPop();
                setActiveTab(tab.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-sky-950/40 text-slate-300 hover:bg-sky-900/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Data Table */}
        <div className="rounded-3xl bg-[#0B2545] border border-sky-500/20 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-200">
              <thead className="bg-sky-950/70 border-b border-sky-500/20 text-sky-300 uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-4">Name / Title</th>
                  <th className="p-4">Category / Type</th>
                  <th className="p-4">Description / Summary</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-900/40">
                {activeTab === 'characters' &&
                  characters.map((char) => (
                    <tr key={char.id} className="hover:bg-sky-950/40 transition-colors">
                      <td className="p-4 font-bold text-white flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-full bg-cover bg-center shrink-0 border border-sky-400/40"
                          style={{ backgroundImage: `url(${char.image_url})` }}
                        ></div>
                        <span>{char.name}</span>
                      </td>
                      <td className="p-4 text-sky-300">{char.category}</td>
                      <td className="p-4 line-clamp-1 max-w-md">{char.short_intro}</td>
                      <td className="p-4 text-right space-x-2 shrink-0">
                        <button
                          onClick={() => openEditModal(char)}
                          className="p-1.5 rounded-lg bg-sky-900/50 hover:bg-sky-800 text-sky-300"
                          title="Edit Record"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteId(char.id)}
                          className="p-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900 text-rose-300"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}

                {activeTab === 'gadgets' &&
                  gadgets.map((gadget) => (
                    <tr key={gadget.id} className="hover:bg-sky-950/40 transition-colors">
                      <td className="p-4 font-bold text-white">{gadget.name}</td>
                      <td className="p-4 text-amber-300">{gadget.category}</td>
                      <td className="p-4 line-clamp-1 max-w-md">{gadget.description}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(gadget)}
                          className="p-1.5 rounded-lg bg-sky-900/50 hover:bg-sky-800 text-sky-300"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteId(gadget.id)}
                          className="p-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900 text-rose-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}

                {activeTab === 'movies' &&
                  movies.map((movie) => (
                    <tr key={movie.id} className="hover:bg-sky-950/40 transition-colors">
                      <td className="p-4 font-bold text-white">{movie.title}</td>
                      <td className="p-4 text-pink-300">{movie.decade} ({movie.release_year})</td>
                      <td className="p-4 line-clamp-1 max-w-md">{movie.description}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setDeleteId(movie.id)}
                          className="p-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900 text-rose-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}

                {activeTab === 'quiz' &&
                  questions.map((q) => (
                    <tr key={q.id} className="hover:bg-sky-950/40 transition-colors">
                      <td className="p-4 font-bold text-white">{q.question}</td>
                      <td className="p-4 text-emerald-300">{q.difficulty} ({q.category})</td>
                      <td className="p-4 line-clamp-1 max-w-md">{q.explanation}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setDeleteId(q.id)}
                          className="p-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900 text-rose-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}

                {activeTab === 'timeline' &&
                  timelineEvents.map((t) => (
                    <tr key={t.id} className="hover:bg-sky-950/40 transition-colors">
                      <td className="p-4 font-bold text-white">{t.title}</td>
                      <td className="p-4 text-purple-300">{t.year} ({t.category})</td>
                      <td className="p-4 line-clamp-1 max-w-md">{t.description}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setDeleteId(t.id)}
                          className="p-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900 text-rose-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Record Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[#0B2545] border border-sky-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-sky-900/60">
              <h3 className="text-lg font-bold text-white">
                {editingItem ? 'Edit Existing Record' : 'Create New Record'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-sky-300 block mb-1">Name / Title</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sky-950 border border-sky-500/30 text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="font-bold text-sky-300 block mb-1">Category</label>
                <input
                  type="text"
                  required
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sky-950 border border-sky-500/30 text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="font-bold text-sky-300 block mb-1">Description / Summary</label>
                <textarea
                  required
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sky-950 border border-sky-500/30 text-white focus:outline-none focus:border-sky-400"
                ></textarea>
              </div>

              <div>
                <label className="font-bold text-sky-300 block mb-1">Image URL</label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-sky-950 border border-sky-500/30 text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#0B2545] border border-rose-500/40 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Confirm Record Deletion</h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to delete this record? This action cannot be undone.
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30"
              >
                Yes, Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
