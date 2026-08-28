import React, { useState } from 'react';
import { CLOAK_PRESETS } from '../data/presets.js';
import { Shield, EyeOff, AlertTriangle, ExternalLink, Check, Sparkles } from 'lucide-react';

export const CloakModal = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  onOpenPortalAboutBlank,
}) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [panicKeyListening, setPanicKeyListening] = useState(false);

  if (!isOpen) return null;

  const handleSelectPreset = (presetId) => {
    setLocalSettings(prev => ({
      ...prev,
      cloakPreset: presetId
    }));
  };

  const handleSave = () => {
    onSaveSettings(localSettings);
    onClose();
  };

  const handleKeyRecord = (e) => {
    if (panicKeyListening) {
      e.preventDefault();
      setLocalSettings(prev => ({ ...prev, panicKey: e.key }));
      setPanicKeyListening(false);
    }
  };

  return (
    <div
      id="cloak-settings-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onKeyDown={handleKeyRecord}
    >
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Tab Cloaking & Stealth Filter Bypass</h2>
              <p className="text-xs text-slate-400">Disguise browser tab icons, titles, and configure panic keys.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab Cloaker Presets */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
            <EyeOff className="w-4 h-4" /> 1. Tab Disguise Preset
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {CLOAK_PRESETS.map((preset) => {
              const isSelected = localSettings.cloakPreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-500/15 border-sky-500 text-sky-200 shadow-md shadow-sky-500/10'
                      : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={preset.favicon}
                      alt={preset.name}
                      className="w-5 h-5 rounded object-contain shrink-0"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-200">{preset.name}</div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">{preset.title}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-sky-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panic Button Settings */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <label className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> 2. Emergency Panic Key (Boss Key)
          </label>
          <p className="text-xs text-slate-400">
            Pressing this key instantly redirects the current page to your chosen educational site.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] font-semibold text-slate-300 block mb-1.5">Trigger Key:</span>
              <button
                type="button"
                onClick={() => setPanicKeyListening(true)}
                className={`w-full py-2 px-3 rounded-lg border font-mono text-sm font-bold text-center transition-all cursor-pointer ${
                  panicKeyListening
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 animate-pulse'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-600'
                }`}
              >
                {panicKeyListening ? 'Press any key on keyboard...' : `[ ${localSettings.panicKey} ] (Click to rebind)`}
              </button>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-300 block mb-1.5">Panic Redirect URL:</span>
              <input
                type="text"
                value={localSettings.panicUrl}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, panicUrl: e.target.value }))}
                placeholder="https://classroom.google.com"
                className="w-full py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>

        {/* About:Blank Launcher */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> 3. About:Blank Tab Cloaker (No History)
          </label>
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-300">
              <span className="font-bold text-emerald-300 block">Spawn Entire Portal in about:blank</span>
              Leaves zero trace in browser history, bypassing filter extension inspections.
            </div>
            <button
              type="button"
              id="btn-spawn-about-blank"
              onClick={onOpenPortalAboutBlank}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shrink-0 transition-colors shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Launch Cloaked Window
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            id="btn-save-cloak-settings"
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-sky-500/20 cursor-pointer"
          >
            Apply Cloak Settings
          </button>
        </div>
      </div>
    </div>
  );
};
