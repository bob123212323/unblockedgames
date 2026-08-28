import React from 'react';
import { Play, Star, Bookmark, ShieldCheck } from 'lucide-react';

export const GameCard = ({
  game,
  isFavorite,
  onToggleFavorite,
  onSelectGame,
  onLaunchAboutBlank,
}) => {
  return (
    <div
      id={`game-card-${game.id}`}
      onClick={() => onSelectGame(game)}
      className="group relative flex flex-col justify-between rounded-xl bg-slate-900/90 border border-slate-800 hover:border-sky-500/60 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10 cursor-pointer overflow-hidden backdrop-blur-sm"
    >
      {/* Top badges */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-sky-400 border border-slate-700">
          {game.category}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            id={`btn-fav-${game.id}`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={(e) => onToggleFavorite(game.id, e)}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isFavorite
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-amber-400 hover:border-amber-500/40'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
          <button
            id={`btn-stealth-${game.id}`}
            title="Launch in about:blank stealth window (bypass school monitoring)"
            onClick={(e) => onLaunchAboutBlank(game, e)}
            className="p-1.5 rounded-lg border bg-slate-800/80 border-slate-700 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Thumbnail / Icon area */}
      <div className="relative aspect-video rounded-lg bg-gradient-to-br from-slate-800 via-slate-850 to-slate-950 flex items-center justify-center border border-slate-800 group-hover:border-sky-500/40 overflow-hidden mb-3">
        <span className="text-5xl select-none transform transition-transform duration-200 group-hover:scale-110">
          {game.thumbnail}
        </span>
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-sky-950/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity duration-200">
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-500 text-slate-950 font-bold text-sm shadow-lg shadow-sky-500/30">
            <Play className="w-4 h-4 fill-slate-950" /> Play Now
          </span>
        </div>

        {game.featured && (
          <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-amber-500 text-slate-950">
            Popular
          </span>
        )}
      </div>

      {/* Info Section */}
      <div>
        <div className="flex items-start justify-between gap-1 mb-1">
          <h3 className="font-bold text-base text-slate-100 group-hover:text-sky-300 transition-colors line-clamp-1">
            {game.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{Number(game.rating).toFixed(1)}</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
          {game.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
          {(game.tags || []).slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50"
            >
              #{tag}
            </span>
          ))}
          {game.plays && (
            <span className="text-[11px] text-slate-500 ml-auto self-center">
              {(game.plays / 1000).toFixed(1)}k plays
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
