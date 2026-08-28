import React from 'react';
import { CLOAK_PRESETS } from '../data/presets.js';
import {
  Gamepad2,
  Search,
  Shield,
  AlertTriangle,
  Plus,
  FileJson,
  Bookmark,
  Shuffle,
  X,
} from 'lucide-react';

export const Navbar = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories = [],
  favoriteCount = 0,
  currentCloakId,
  panicKey,
  onOpenCloakModal,
  onOpenAddModal,
  onOpenJsonModal,
  onTriggerPanic,
  onPickRandomGame,
}) => {
  const currentCloak = CLOAK_PRESETS.find(p => p.id === currentCloakId) || CLOAK_PRESETS[0];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 space-y-3">
        {/* Top Tier: Brand, Search, Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div
              onClick={() => onSelectCategory('All')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="p-2 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-400 text-slate-950 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <Gamepad2 className="w-5 h-5 font-black" />
              </div>
              <div>
                <span className="text-base font-black text-slate-100 tracking-tight flex items-center gap-1.5">
                  UNBLOCKED <span className="text-sky-400 font-extrabold">HUB</span>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    BYPASS
                  </span>
                </span>
                <p className="text-[10px] text-slate-400 hidden sm:block">HTML5 • JSON Registry • Lightspeed Bypass</p>
              </div>
            </div>

            {/* Quick Panic button on mobile */}
            <button
              onClick={onTriggerPanic}
              title={`Emergency panic key [${panicKey}]`}
              className="sm:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" /> Panic
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              id="game-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search games, tags, genres (e.g., 2048, 3D, retro)..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-100 placeholder-slate-400 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/50 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Utility Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end overflow-x-auto pb-1 sm:pb-0">
            {/* Random Game */}
            <button
              id="btn-random-game"
              onClick={onPickRandomGame}
              title="Play a random game"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold transition-colors shrink-0 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Random</span>
            </button>

            {/* Tab Cloaker */}
            <button
              id="btn-open-cloak-modal"
              onClick={onOpenCloakModal}
              title="Disguise tab icon and title"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold transition-colors shrink-0 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cloak:</span>
              <span className="text-emerald-400 font-bold max-w-[80px] truncate">{currentCloak.name.split(' ')[0]}</span>
            </button>

            {/* Add Game */}
            <button
              id="btn-open-add-game"
              onClick={onOpenAddModal}
              title="Add custom game via Iframe URL or HTML"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold transition-colors shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden md:inline">Add Game</span>
            </button>

            {/* JSON Manager */}
            <button
              id="btn-open-json-manager"
              onClick={onOpenJsonModal}
              title="View, export, or edit games.json"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold transition-colors shrink-0 cursor-pointer"
            >
              <FileJson className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden lg:inline">games.json</span>
            </button>

            {/* Emergency Panic Button */}
            <button
              id="btn-panic-action"
              onClick={onTriggerPanic}
              title={`Emergency panic key [${panicKey}] - click or press ${panicKey} to redirect`}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/50 text-rose-300 text-xs font-bold transition-all shrink-0 cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Panic <kbd className="px-1 py-0.5 rounded bg-slate-900 font-mono text-[10px]">{panicKey}</kbd></span>
            </button>
          </div>
        </div>

        {/* Bottom Tier: Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`cat-filter-${cat.toLowerCase()}`}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 select-none cursor-pointer ${
                  isSelected
                    ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat === 'Favorites' ? (
                  <span className="flex items-center gap-1.5">
                    <Bookmark className={`w-3.5 h-3.5 ${isSelected ? 'fill-slate-950' : 'fill-amber-400 text-amber-400'}`} />
                    Favorites ({favoriteCount})
                  </span>
                ) : (
                  cat
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
