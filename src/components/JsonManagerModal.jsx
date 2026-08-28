import React, { useState, useEffect } from 'react';
import { FileJson, Download, Upload, Copy, Check, RefreshCw, AlertCircle } from 'lucide-react';

export const JsonManagerModal = ({
  isOpen,
  onClose,
  games = [],
  onUpdateGamesFromJson,
  onResetToDefault,
}) => {
  const [jsonText, setJsonText] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setJsonText(JSON.stringify(games, null, 2));
      setError(null);
      setSuccessMsg(null);
    }
  }, [isOpen, games]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        if (Array.isArray(parsed)) {
          setJsonText(JSON.stringify(parsed, null, 2));
          setError(null);
          setSuccessMsg(`Loaded ${parsed.length} games from file.`);
        } else {
          setError('Invalid format: JSON must be an array of game objects.');
        }
      } catch (err) {
        setError('JSON Syntax Error: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleSaveJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        setError('JSON must be an array of game objects.');
        return;
      }
      onUpdateGamesFromJson(parsed);
      setSuccessMsg(`Successfully saved ${parsed.length} games to registry!`);
      setError(null);
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err) {
      setError('Invalid JSON: ' + err.message);
    }
  };

  return (
    <div
      id="json-manager-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">JSON Game Catalog Manager</h2>
              <p className="text-xs text-slate-400">Directly view, edit, import, or export `games.json` catalog.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy JSON'}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download games.json
            </button>
            <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-300 transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5" /> Import JSON
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <button
            onClick={onResetToDefault}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-950/40 border border-rose-900/50 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset to Defaults
          </button>
        </div>

        {/* Feedback messages */}
        {error && (
          <div className="p-3 rounded-lg bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs font-semibold flex items-center gap-2 shrink-0">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}
        {successMsg && (
          <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-2 shrink-0">
            <Check className="w-4 h-4 shrink-0" />
            {successMsg}
          </div>
        )}

        {/* Code Editor Area */}
        <div className="flex-1 min-h-[300px] flex flex-col">
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            spellCheck={false}
            className="w-full flex-1 p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-sky-300 font-mono text-xs leading-relaxed resize-none outline-none focus:border-sky-500 shadow-inner"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 shrink-0">
          <span className="text-xs text-slate-500">
            {games.length} total games currently loaded in registry
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="btn-save-json-changes"
              onClick={handleSaveJson}
              className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-sky-500/20 cursor-pointer"
            >
              Save & Apply JSON Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
