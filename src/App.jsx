/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CLOAK_PRESETS } from './data/presets.js';
import { DEFAULT_GAMES } from './data/defaultGames.js';
import { Navbar } from './components/Navbar.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayer } from './components/GamePlayer.jsx';
import { CloakModal } from './components/CloakModal.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { JsonManagerModal } from './components/JsonManagerModal.jsx';
import {
  Flame,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const DEFAULT_SETTINGS = {
  cloakPreset: 'default',
  customTitle: '',
  customFavicon: '',
  panicKey: '`',
  panicUrl: 'https://classroom.google.com',
  theme: 'dark',
  autoFullscreenOnPlay: false,
  stealthAboutBlank: false
};

const CATEGORIES = ['All', 'Popular', 'Action', 'Arcade', 'Puzzle', 'Retro', 'Sports', 'Strategy', 'Casual', 'Favorites'];

export default function App() {
  const [games, setGames] = useState(() => {
    try {
      const savedCustom = localStorage.getItem('unblocked_hub_custom_games');
      const customList = savedCustom ? JSON.parse(savedCustom) : [];
      return [...customList, ...DEFAULT_GAMES.filter(d => !customList.some(c => c.id === d.id))];
    } catch {
      return DEFAULT_GAMES;
    }
  });
  const [selectedGame, setSelectedGame] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('unblocked_hub_favs') || '[]');
    } catch {
      return [];
    }
  });

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('unblocked_hub_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modals
  const [isCloakOpen, setIsCloakOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isJsonOpen, setIsJsonOpen] = useState(false);

  // Load initial games from games.json or fallback to DEFAULT_GAMES
  useEffect(() => {
    const loadGames = async () => {
      try {
        const savedCustom = localStorage.getItem('unblocked_hub_custom_games');
        const customList = savedCustom ? JSON.parse(savedCustom) : [];

        const base = import.meta.env.BASE_URL || './';
        const res = await fetch(`${base}games.json`);
        if (res.ok) {
          const defaultList = await res.json();
          // Merge custom and defaults
          const merged = [...customList, ...defaultList.filter(d => !customList.some(c => c.id === d.id))];
          setGames(merged);
        }
      } catch (err) {
        console.warn('Using embedded DEFAULT_GAMES catalog fallback:', err);
      }
    };
    loadGames();
  }, []);

  // Sync Cloaking to DOM Title & Favicon
  useEffect(() => {
    const preset = CLOAK_PRESETS.find(p => p.id === settings.cloakPreset) || CLOAK_PRESETS[0];
    const targetTitle = settings.customTitle || preset.title;
    const targetFavicon = settings.customFavicon || preset.favicon;

    document.title = targetTitle;

    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'shortcut icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = targetFavicon;
  }, [settings]);

  // Global Panic Key Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) {
        return;
      }

      if (e.key && e.key.toLowerCase() === settings.panicKey.toLowerCase()) {
        e.preventDefault();
        window.location.replace(settings.panicUrl || 'https://classroom.google.com');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [settings.panicKey, settings.panicUrl]);

  // Favorite toggle
  const handleToggleFavorite = useCallback((id, e) => {
    if (e) e.stopPropagation();
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem('unblocked_hub_favs', JSON.stringify(next));
      return next;
    });
  }, []);

  // Save Settings
  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('unblocked_hub_settings', JSON.stringify(newSettings));
  };

  // Add Game
  const handleAddGame = (newGame) => {
    setGames(prev => {
      const updated = [newGame, ...prev];
      const customOnly = updated.filter(g => g.isCustom);
      localStorage.setItem('unblocked_hub_custom_games', JSON.stringify(customOnly));
      return updated;
    });
    setSelectedGame(newGame);
  };

  // Update Games from JSON editor
  const handleUpdateGamesFromJson = (newGames) => {
    setGames(newGames);
    const customOnly = newGames.filter(g => g.isCustom);
    localStorage.setItem('unblocked_hub_custom_games', JSON.stringify(customOnly));
  };

  // Reset to default
  const handleResetToDefault = async () => {
    localStorage.removeItem('unblocked_hub_custom_games');
    setGames(DEFAULT_GAMES);
  };

  // Stealth About:Blank Launcher for a specific game
  const handleLaunchGameAboutBlank = (game, e) => {
    if (e) e.stopPropagation();
    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert('Popup blocked! Please allow popups for stealth mode.');
      return;
    }
    const doc = win.document;
    doc.open();
    
    // Choose active cloak preset title & favicon
    const preset = CLOAK_PRESETS.find(p => p.id === settings.cloakPreset) || CLOAK_PRESETS[0];
    const targetTitle = settings.customTitle || preset.title;
    const targetFavicon = settings.customFavicon || preset.favicon;

    let gameSrc = '';
    if (game.iframeUrl) {
      if (game.iframeUrl.startsWith('http://') || game.iframeUrl.startsWith('https://') || game.iframeUrl.startsWith('data:')) {
        gameSrc = game.iframeUrl;
      } else {
        const clean = game.iframeUrl.replace(/^\/+/, '');
        gameSrc = new URL(clean, window.location.href).href;
      }
    }

    doc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${targetTitle}</title>
        <link rel="icon" href="${targetFavicon}">
        <style>
          * { margin:0; padding:0; box-sizing:border-box; overflow:hidden; }
          body, html { width:100%; height:100%; background:#000; }
          iframe { width:100%; height:100%; border:none; display:block; }
        </style>
      </head>
      <body>
        <iframe src="${gameSrc}" ${game.srcDoc ? `srcdoc="${encodeURIComponent(game.srcDoc)}"` : ''} allow="autoplay; fullscreen; gamepad; focus-without-user-activation"></iframe>
      </body>
      </html>
    `);
    doc.close();
  };

  // Stealth About:Blank Launcher for entire portal
  const handleLaunchPortalAboutBlank = () => {
    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert('Popup blocked! Please allow popups for stealth mode.');
      return;
    }
    const doc = win.document;
    doc.open();
    const preset = CLOAK_PRESETS.find(p => p.id === settings.cloakPreset) || CLOAK_PRESETS[0];
    const targetTitle = settings.customTitle || preset.title;
    const targetFavicon = settings.customFavicon || preset.favicon;

    doc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${targetTitle}</title>
        <link rel="icon" href="${targetFavicon}">
        <style>
          * { margin:0; padding:0; box-sizing:border-box; overflow:hidden; }
          body, html { width:100%; height:100%; background:#0b0f19; }
          iframe { width:100%; height:100%; border:none; display:block; }
        </style>
      </head>
      <body>
        <iframe src="${window.location.href}" allow="autoplay; fullscreen; gamepad; focus-without-user-activation"></iframe>
      </body>
      </html>
    `);
    doc.close();
  };

  // Pick random game
  const handlePickRandomGame = () => {
    if (games.length > 0) {
      const rand = games[Math.floor(Math.random() * games.length)];
      setSelectedGame(rand);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Filtered Games
  const filteredGames = useMemo(() => {
    let result = [...games];

    // Category filter
    if (selectedCategory === 'Popular') {
      result = result.filter(g => g.featured || (g.plays && g.plays > 15000));
    } else if (selectedCategory === 'Favorites') {
      result = result.filter(g => favorites.includes(g.id));
    } else if (selectedCategory !== 'All') {
      result = result.filter(g => (g.category || '').toLowerCase() === selectedCategory.toLowerCase());
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(g =>
        (g.title || '').toLowerCase().includes(q) ||
        (g.category || '').toLowerCase().includes(q) ||
        (g.description || '').toLowerCase().includes(q) ||
        (g.author && g.author.toLowerCase().includes(q)) ||
        (g.tags && g.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    return result;
  }, [games, selectedCategory, searchQuery, favorites]);

  // Featured games list
  const featuredGames = useMemo(() => {
    return games.filter(g => g.featured).slice(0, 4);
  }, [games]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (selectedGame) setSelectedGame(null);
        }}
        categories={CATEGORIES}
        favoriteCount={favorites.length}
        currentCloakId={settings.cloakPreset}
        panicKey={settings.panicKey}
        onOpenCloakModal={() => setIsCloakOpen(true)}
        onOpenAddModal={() => setIsAddOpen(true)}
        onOpenJsonModal={() => setIsJsonOpen(true)}
        onTriggerPanic={() => window.location.replace(settings.panicUrl || 'https://classroom.google.com')}
        onPickRandomGame={handlePickRandomGame}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {selectedGame ? (
          /* Game Player View */
          <GamePlayer
            game={selectedGame}
            allGames={games}
            isFavorite={favorites.includes(selectedGame.id)}
            onToggleFavorite={handleToggleFavorite}
            onBack={() => setSelectedGame(null)}
            onSelectGame={(g) => setSelectedGame(g)}
            onLaunchAboutBlank={(g) => handleLaunchGameAboutBlank(g)}
          />
        ) : (
          /* Game Catalog Grid View */
          <div className="space-y-8">
            {/* Quick Hero Banner only on All + empty search */}
            {selectedCategory === 'All' && !searchQuery && (
              <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 md:p-8 overflow-hidden shadow-2xl">
                <div className="relative z-10 max-w-2xl space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Client-Side Local Iframe Player
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black text-slate-100 tracking-tight leading-tight">
                    Play High Quality Unblocked Games Anywhere
                  </h1>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                    Designed to bypass strict school network blocks (Lightspeed, GoGuardian, Securly). Every game is served directly as a self-contained local HTML5 iframe with tab disguises and instant panic switches.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={handlePickRandomGame}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-sky-500/25 hover:scale-102 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" /> Quick Play Random
                    </button>
                    <button
                      onClick={() => setIsCloakOpen(true)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs border border-slate-700 transition-colors cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400" /> Disguise Tab Icon & Title
                    </button>
                  </div>
                </div>

                {/* Background ambient lighting */}
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-sky-500/10 to-transparent pointer-events-none" />
                <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              </div>
            )}

            {/* Popular / Featured row */}
            {selectedCategory === 'All' && !searchQuery && featuredGames.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-500" /> Most Popular Games
                  </h2>
                  <button
                    onClick={() => setSelectedCategory('Popular')}
                    className="text-xs text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
                  >
                    View all popular →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {featuredGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      isFavorite={favorites.includes(game.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onSelectGame={(g) => setSelectedGame(g)}
                      onLaunchAboutBlank={(g, e) => handleLaunchGameAboutBlank(g, e)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Main Games Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-100">
                    {selectedCategory === 'All' ? 'All Unblocked Games' : `${selectedCategory} Games`}
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-semibold">
                    {filteredGames.length}
                  </span>
                </div>

                {searchQuery && (
                  <span className="text-xs text-slate-400">
                    Results for "<span className="text-sky-400 font-semibold">{searchQuery}</span>"
                  </span>
                )}
              </div>

              {filteredGames.length === 0 ? (
                <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-3xl mx-auto">
                    🕹️
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-200">No games found</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                      {selectedCategory === 'Favorites'
                        ? "You haven't bookmarked any games yet. Click the bookmark icon on any game to save it here!"
                        : "Try a different search keyword or category, or add a custom game using the 'Add Game' button."}
                    </p>
                  </div>
                  {selectedCategory !== 'All' && (
                    <button
                      onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                      className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                    >
                      Show All Games
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      isFavorite={favorites.includes(game.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onSelectGame={(g) => setSelectedGame(g)}
                      onLaunchAboutBlank={(g, e) => handleLaunchGameAboutBlank(g, e)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">Unblocked Games Hub</span>
            <span>•</span>
            <span>Local HTML5 & JSON Powered</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCloakOpen(true)}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Tab Cloaking
            </button>
            <button
              onClick={() => setIsJsonOpen(true)}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Export JSON
            </button>
            <button
              onClick={() => setIsAddOpen(true)}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Add Custom Game
            </button>
          </div>

          <div className="text-slate-400">
            Emergency Panic Key: <kbd className="px-1.5 py-0.5 rounded bg-slate-900 font-mono text-[11px] text-slate-300 border border-slate-800">{settings.panicKey}</kbd>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CloakModal
        isOpen={isCloakOpen}
        onClose={() => setIsCloakOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
        onOpenPortalAboutBlank={handleLaunchPortalAboutBlank}
      />

      <AddGameModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddGame={handleAddGame}
      />

      <JsonManagerModal
        isOpen={isJsonOpen}
        onClose={() => setIsJsonOpen(false)}
        games={games}
        onUpdateGamesFromJson={handleUpdateGamesFromJson}
        onResetToDefault={handleResetToDefault}
      />
    </div>
  );
}
