import React, { useRef, useState, useEffect } from 'react';
import {
  ArrowLeft,
  Maximize2,
  Minimize2,
  RotateCw,
  ExternalLink,
  ShieldCheck,
  Bookmark,
  Keyboard,
  Share2,
  Flame
} from 'lucide-react';

export const GamePlayer = ({
  game,
  allGames = [],
  isFavorite,
  onToggleFavorite,
  onBack,
  onSelectGame,
  onLaunchAboutBlank,
}) => {
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);

  // Monitor fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        containerRef.current.requestFullscreen().catch(err => {
          console.error("Fullscreen error:", err);
        });
      }
    } else {
      document.exitFullscreen().catch(err => {
        console.error("Exit fullscreen error:", err);
      });
    }
  };

  const handleReload = () => {
    if (iframeRef.current) {
      const src = iframeRef.current.src;
      iframeRef.current.src = '';
      setTimeout(() => {
        if (iframeRef.current) iframeRef.current.src = src;
      }, 50);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Filter recommendations
  const relatedGames = allGames.filter(g => g.id !== game.id).slice(0, 4);

  const getResolvedUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {
      return url;
    }
    const clean = url.replace(/^\/+/, '');
    const base = import.meta.env.BASE_URL || './';
    return `${base}${clean}`;
  };

  const gameSrc = getResolvedUrl(game.iframeUrl);

  return (
    <div className={`space-y-6 transition-all duration-300 ${theaterMode ? 'bg-slate-950 py-4' : ''}`}>
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <button
          id="btn-back-to-hub"
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-sky-400" /> Back to Catalog
        </button>

        <div className="flex items-center flex-wrap gap-2">
          {/* Controls modal toggle */}
          <button
            id="btn-toggle-controls"
            onClick={() => setShowControls(!showControls)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
              showControls
                ? 'bg-sky-500/20 border-sky-500 text-sky-300'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Keyboard className="w-3.5 h-3.5" /> Controls Guide
          </button>

          {/* Favorite */}
          <button
            id="btn-player-favorite"
            onClick={(e) => onToggleFavorite(game.id, e)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
              isFavorite
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400' : ''}`} />
            {isFavorite ? 'Saved' : 'Favorite'}
          </button>

          {/* Stealth Tab Launcher */}
          <button
            id="btn-player-stealth"
            onClick={() => onLaunchAboutBlank(game)}
            title="Open in about:blank cloaked window (invisible to school network logging)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-emerald-950/40 border-emerald-600/40 text-emerald-400 hover:bg-emerald-900/50 text-xs font-semibold transition-colors shadow-sm cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Stealth Mode (about:blank)
          </button>

          {/* Open in New Tab */}
          {gameSrc && (
            <a
              id="btn-player-new-tab"
              href={gameSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Popout
            </a>
          )}

          {/* Reload Game */}
          <button
            id="btn-player-reload"
            onClick={handleReload}
            title="Reload game iframe"
            className="p-2 rounded-lg border bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen */}
          <button
            id="btn-player-fullscreen"
            onClick={toggleFullscreen}
            title="Toggle fullscreen"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-extrabold transition-colors shadow-md shadow-sky-500/20 cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            {isFullscreen ? 'Exit' : 'Fullscreen'}
          </button>
        </div>
      </div>

      {/* Controls Overlay Guide if open */}
      {showControls && game.controls && (
        <div className="bg-slate-900/95 border border-sky-500/30 rounded-xl p-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-sky-400 flex items-center gap-2">
              <Keyboard className="w-4 h-4" /> Controls & Key Mappings for {game.title}
            </h4>
            <button
              onClick={() => setShowControls(false)}
              className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              ✕ Close
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {Object.entries(game.controls).map(([key, action], idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded bg-slate-800 border border-slate-700"
              >
                <kbd className="px-2 py-1 rounded bg-slate-950 text-sky-300 font-mono text-xs font-bold border border-slate-700">
                  {key}
                </kbd>
                <span className="text-xs text-slate-300 font-medium">{action}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Game Stage / Iframe Frame */}
      <div
        ref={containerRef}
        id="game-viewport-container"
        className={`relative w-full rounded-2xl bg-black border-2 border-slate-800 shadow-2xl overflow-hidden flex flex-col items-center justify-center ${
          isFullscreen ? 'h-screen border-none rounded-none' : 'aspect-video min-h-[480px] max-h-[780px]'
        }`}
      >
        <iframe
          ref={iframeRef}
          id="game-iframe-element"
          src={gameSrc}
          srcDoc={game.srcDoc}
          title={game.title}
          allow="autoplay; fullscreen; gamepad; focus-without-user-activation; cross-origin-isolated"
          sandbox="allow-scripts allow-same-origin allow-modals allow-pointer-lock allow-forms allow-popups"
          className="w-full h-full border-none select-none bg-black"
        />
      </div>

      {/* Game Details & Description */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{game.thumbnail}</span>
                <h1 className="text-2xl font-black text-slate-100">{game.title}</h1>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Category: <span className="text-sky-400 font-semibold">{game.category}</span>
                {game.author && <span> • Developer: <span className="text-slate-300">{game.author}</span></span>}
              </p>
            </div>
            
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              {copiedLink ? 'Link Copied!' : 'Share Game'}
            </button>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
            {game.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {(game.tags || []).map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-sky-400 border border-slate-700/60 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Tips & Stealth Tips */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Filter Bypass Information
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              This game runs purely as a self-contained local HTML5 iframe. It makes zero unapproved third-party network requests, preventing school filters like Lightspeed, GoGuardian, and Securly from blocking access.
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 text-xs space-y-1.5 text-slate-300">
            <div className="font-semibold text-sky-400">💡 School Pro Tips:</div>
            <div>• Press the <b>Panic Key</b> (default: <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-[11px]">`</kbd>) anytime to instantly hide games.</div>
            <div>• Use <b>Stealth Mode</b> to disguise browser history.</div>
          </div>
        </div>
      </div>

      {/* More Games Row */}
      {relatedGames.length > 0 && (
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" /> You Might Also Like
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedGames.map(rel => (
              <div
                key={rel.id}
                onClick={() => onSelectGame(rel)}
                className="group p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-sky-500/50 cursor-pointer transition-all hover:-translate-y-1"
              >
                <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center text-3xl mb-2 group-hover:scale-105 transition-transform">
                  {rel.thumbnail}
                </div>
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-sky-300 line-clamp-1">
                  {rel.title}
                </h4>
                <p className="text-[11px] text-slate-400">{rel.category}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
