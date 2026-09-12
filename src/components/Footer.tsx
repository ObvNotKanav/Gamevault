import React from 'react';
import { Database, Sparkles, Compass, Shield, ArrowUpRight } from 'lucide-react';
import { useGameVault } from '../context/GameVaultContext';

export const Footer: React.FC = () => {
  const { navigateTo, setApiModalOpen } = useGameVault();

  return (
    <footer className="border-t border-slate-800/80 bg-[#070a10] text-slate-400 py-12 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-[#131926] border border-[#10b981]/60">
                <span className="font-display text-xs font-bold text-[#10b981]">GV</span>
              </div>
              <span className="font-display text-lg font-bold text-white tracking-tight">
                GAME<span className="text-[#10b981]">VAULT</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              A refined video game discovery platform engineered to help you answer one question: "What game should I play next?"
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setApiModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-sm border border-slate-800 bg-[#131926] px-2.5 py-1 text-[11px] font-mono text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
              >
                <Database className="h-3 w-3 text-cyan-400" />
                <span>API Settings</span>
              </button>
            </div>
          </div>

          {/* Col 2: Discovery */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Discovery Engine
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('explore')}
                  className="hover:text-[#10b981] transition-colors"
                >
                  Explore All Games
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('quiz')}
                  className="hover:text-[#10b981] transition-colors flex items-center gap-1"
                >
                  <Sparkles className="h-3 w-3 text-[#10b981]" />
                  <span>The Perfect Fit Quiz</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('for-you')}
                  className="hover:text-[#10b981] transition-colors"
                >
                  Personalized For You
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('compare')}
                  className="hover:text-[#10b981] transition-colors"
                >
                  Game Comparison Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Curation & Archives */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Vault Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('explore')}
                  className="hover:text-[#10b981] transition-colors"
                >
                  Hidden Gems Radar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('explore')}
                  className="hover:text-[#10b981] transition-colors"
                >
                  Top Metacritic 90+
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('library')}
                  className="hover:text-[#10b981] transition-colors"
                >
                  Your Vault Library
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Integrity */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-[#10b981]" />
              <span>Data Transparency</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              GameVault does not invent game ratings or false release data. All scores, developers, and genres reflect verified catalog telemetry and official store distributions.
            </p>
            <div className="mt-3 text-[11px] font-mono text-slate-500">
              Stack: React 19 • TypeScript • Vite • Tailwind CSS
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} GameVault. Built for gamers, collectors, and explorers.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Protocol</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-slate-400 hover:text-[#10b981] transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
