'use client';

import React, { useState, useMemo } from 'react';
import { Image as ImageIcon, Search, Download, Eye, X, Sparkles, ShieldCheck } from 'lucide-react';
import { initialGallery } from '@/data/gallery';
import { GalleryAsset } from '@/types';
import { sounds } from '@/lib/audio';

const categories = ['All Categories', 'Characters', 'Gadgets', 'Movies', 'Wallpapers'];

export default function GalleryPage() {
  const [selectedCat, setSelectedCat] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxAsset, setLightboxAsset] = useState<GalleryAsset | null>(null);

  const filteredAssets = useMemo(() => {
    return initialGallery.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat =
        selectedCat === 'All Categories' || item.category === selectedCat;

      return matchesSearch && matchesCat;
    });
  }, [selectedCat, searchQuery]);

  const handleDownload = (e: React.MouseEvent, asset: GalleryAsset) => {
    e.stopPropagation();
    sounds.playPop();
    // Open image in new window for permitted fan wallpaper downloading
    window.open(asset.image_url, '_blank');
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3">
          <ImageIcon className="w-4 h-4" />
          <span>Curated Visual Artwork Archives</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
          FAN ARTWORK & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-amber-300">WALLPAPERS</span>
        </h1>
        <p className="text-sm sm:text-base text-sky-200/70">
          Browse authorized high-resolution wallpapers, character artwork, gadget blueprints, and cinematic movie vistas.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0B2545]/80 border border-sky-500/30 rounded-3xl p-4 sm:p-6 backdrop-blur-md shadow-xl flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search wallpapers by title or tag (e.g. sky, portal)..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-sky-950/60 border border-sky-500/30 text-white placeholder-sky-300/40 text-xs sm:text-sm focus:outline-none focus:border-sky-400 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sounds.playPop();
                  setSelectedCat(cat);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30 scale-105'
                    : 'bg-sky-950/40 text-slate-300 hover:text-white hover:bg-sky-900/40 border border-sky-500/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            onClick={() => {
              sounds.playPop();
              setLightboxAsset(asset);
            }}
            className="group rounded-3xl bg-[#0B2545] border border-sky-500/20 hover:border-sky-400/50 overflow-hidden flex flex-col justify-between dora-card-hover cursor-pointer shadow-xl"
          >
            <div>
              <div className="relative h-60 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${asset.image_url})` }}
                >
                  <div className="w-full h-full bg-gradient-to-t from-[#0B2545] via-transparent to-transparent"></div>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-sky-950/80 backdrop-blur-md border border-sky-400/30 text-[10px] font-bold text-sky-300">
                    {asset.category}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 p-2 rounded-full bg-slate-900/80 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-white text-base group-hover:text-sky-300 transition-colors">
                  {asset.title}
                </h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  {asset.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-sky-950 border border-sky-500/20 text-slate-300">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-sky-900/50 mt-2 flex items-center justify-between text-xs text-slate-400">
              <span className="truncate max-w-[160px] text-[11px]">{asset.license_information}</span>
              <button
                onClick={(e) => handleDownload(e, asset)}
                className="flex items-center gap-1 text-sky-400 hover:text-white font-bold"
                title="Open/Download Asset"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxAsset && (
        <div
          onClick={() => setLightboxAsset(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-[#0B2545] border border-sky-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            <div className="p-4 border-b border-sky-500/20 flex items-center justify-between bg-sky-950/60">
              <h3 className="text-base font-bold text-white">{lightboxAsset.title}</h3>
              <button
                onClick={() => setLightboxAsset(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative max-h-[70vh] overflow-hidden flex items-center justify-center bg-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightboxAsset.image_url}
                alt={lightboxAsset.title}
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>

            <div className="p-4 border-t border-sky-500/20 bg-sky-950/40 flex items-center justify-between text-xs">
              <div>
                <span className="text-amber-300 font-semibold">{lightboxAsset.category}</span>
                <p className="text-slate-400 text-[11px]">{lightboxAsset.license_information}</p>
              </div>

              <a
                href={lightboxAsset.image_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Open Full Image</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
