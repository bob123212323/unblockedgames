import React, { useState } from 'react';
import { PlusCircle, Link, Code } from 'lucide-react';

export const AddGameModal = ({
  isOpen,
  onClose,
  onAddGame,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [embedType, setEmbedType] = useState('url');
  const [iframeUrl, setIframeUrl] = useState('');
  const [srcDoc, setSrcDoc] = useState('');
  const [thumbnail, setThumbnail] = useState('🎮');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [tagsInput, setTagsInput] = useState('unblocked, html5, fun');
  const [controlsKey, setControlsKey] = useState('WASD / Arrows');
  const [controlsAction, setControlsAction] = useState('Movement');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a game title');
      return;
    }
    if (embedType === 'url' && !iframeUrl.trim()) {
      setError('Please provide an iframe embed URL');
      return;
    }
    if (embedType === 'srcDoc' && !srcDoc.trim()) {
      setError('Please provide HTML/JS embed source code');
      return;
    }

    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const controls = {};
    if (controlsKey && controlsAction) {
      controls[controlsKey] = controlsAction;
    } else {
      controls['Mouse / Touch / Keys'] = 'Interact';
    }

    const newGame = {
      id,
      title: title.trim(),
      category,
      description: description.trim() || 'Custom user embedded HTML5 game.',
      iframeUrl: embedType === 'url' ? iframeUrl.trim() : undefined,
      srcDoc: embedType === 'srcDoc' ? srcDoc.trim() : undefined,
      thumbnail: thumbnail.trim() || '🎮',
      author: author.trim() || 'Custom Added',
      rating: 5.0,
      plays: 1,
      controls,
      tags: tags.length > 0 ? tags : ['Custom', 'Iframe'],
      isCustom: true,
      featured: false
    };

    onAddGame(newGame);
    onClose();
  };

  const EMOJI_PICKER = ['🎮', '🕹️', '🚀', '⚽', '🏎️', '⚔️', '👾', '🧩', '🎯', '🛹', '🔥', '🎲', '🧠', '💣', '⭐'];

  return (
    <div
      id="add-game-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Add Game via Iframe / JSON</h2>
              <p className="text-xs text-slate-400">Embed any HTML5 game URL or self-contained HTML code.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Game Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 block mb-1">Game Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Retro Bowl, 1v1.LOL, Paper.io"
                className="w-full py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs outline-none focus:border-sky-500"
              >
                <option value="Arcade">Arcade</option>
                <option value="Action">Action</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Retro">Retro</option>
                <option value="Sports">Sports</option>
                <option value="Strategy">Strategy</option>
                <option value="Casual">Casual</option>
              </select>
            </div>
          </div>

          {/* Embed Mode Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">Iframe Embed Method</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEmbedType('url')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                  embedType === 'url'
                    ? 'bg-sky-500/20 border-sky-500 text-sky-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <Link className="w-3.5 h-3.5" /> Web Iframe URL
              </button>
              <button
                type="button"
                onClick={() => setEmbedType('srcDoc')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                  embedType === 'srcDoc'
                    ? 'bg-sky-500/20 border-sky-500 text-sky-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                <Code className="w-3.5 h-3.5" /> Direct HTML / JS Code
              </button>
            </div>

            {embedType === 'url' ? (
              <input
                type="url"
                value={iframeUrl}
                onChange={(e) => setIframeUrl(e.target.value)}
                placeholder="https://example.com/games/my-game or /games/custom.html"
                className="w-full py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono outline-none focus:border-sky-500"
              />
            ) : (
              <textarea
                rows={4}
                value={srcDoc}
                onChange={(e) => setSrcDoc(e.target.value)}
                placeholder="<!DOCTYPE html><html><body><canvas id='game'></canvas><script>...</script></body></html>"
                className="w-full py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono outline-none focus:border-sky-500"
              />
            )}
          </div>

          {/* Emoji Thumbnail Picker */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Thumbnail Emoji / Icon</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-16 py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-center text-lg outline-none focus:border-sky-500"
              />
              <div className="flex flex-wrap gap-1">
                {EMOJI_PICKER.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setThumbnail(emoji)}
                    className="p-1.5 rounded hover:bg-slate-800 text-base cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Quick summary of the game"
                className="w-full py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Developer / Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Original creator"
                className="w-full py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="arcade, 3d, unblocked, multiplayer"
              className="w-full py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs outline-none focus:border-sky-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="btn-confirm-add-game"
              className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-sky-500/20 cursor-pointer"
            >
              Save Game to Catalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
