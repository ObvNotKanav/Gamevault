import React, { useState } from 'react';
import { X, Database, Key, CheckCircle2, AlertCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { gameService } from '../services/gameService';
import { useGameVault } from '../context/GameVaultContext';

export const ApiSettingsModal: React.FC = () => {
  const { isApiModalOpen, setApiModalOpen, showToast } = useGameVault();
  const [apiKeyInput, setApiKeyInput] = useState(() => gameService.getApiKey());
  const status = gameService.getDataSourceStatus();

  if (!isApiModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    gameService.setApiKey(apiKeyInput);
    showToast(apiKeyInput.trim() ? 'RAWG API Key saved' : 'Switched to Curated Demo Database');
    setApiModalOpen(false);
  };

  const handleResetToDemo = () => {
    setApiKeyInput('');
    gameService.setApiKey('');
    showToast('Reset to Curated Verified Game Vault');
    setApiModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-lg border border-slate-700 bg-[#131926] p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-[#10b981]" />
            <h2 className="font-display text-lg font-bold text-white">Data Access & API Settings</h2>
          </div>
          <button
            type="button"
            onClick={() => setApiModalOpen(false)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Current status display */}
        <div className="mt-5 rounded-md border border-slate-800 bg-[#0b0f17] p-4">
          <div className="flex items-start gap-3">
            {status.apiKeyConfigured ? (
              <CheckCircle2 className="h-5 w-5 text-[#10b981] shrink-0 mt-0.5" />
            ) : (
              <ShieldCheck className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="text-sm font-semibold text-white">
                {status.apiKeyConfigured ? 'Live External Game API' : 'Curated Verified Vault (Demo Mode)'}
              </p>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                {status.statusMessage}. GameVault uses a high-performance verified catalogue with authentic telemetry, real Metascores, gameplay breakdowns, and store links.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
              <span>RAWG API Key (Optional)</span>
              <a
                href="https://rawg.io/apidocs"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline inline-flex items-center gap-1 font-sans text-[11px] normal-case"
              >
                Get free RAWG key <ExternalLink className="h-3 w-3" />
              </a>
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={apiKeyInput}
                onChange={e => setApiKeyInput(e.target.value)}
                placeholder="Enter RAWG API key (e.g. 1a2b3c4d...)"
                className="w-full rounded-sm border border-slate-700 bg-[#1c2436] pl-9 pr-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-hidden"
              />
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">
              Keys are safely kept client-side in localStorage or server env. If omitted, GameVault defaults to its curated offline-capable dataset.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleResetToDemo}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Reset to Curated Vault
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setApiModalOpen(false)}
                className="rounded-sm px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-sm bg-[#10b981] px-4 py-1.5 text-xs font-bold text-[#0b0f17] hover:bg-[#34d399] transition-colors"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
