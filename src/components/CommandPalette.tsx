import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Terminal, Calculator, LayoutDashboard, BookOpen, Clock, X } from 'lucide-react';
import { TIPS } from '../data/tips';
import { RESOURCE_GRAPH_QUERIES } from '../data/queries';
import { CALCULATORS } from '../data/calculators';
import { DASHBOARDS } from '../data/dashboards';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // open command palette
          const event = new CustomEvent('open-command-palette');
          window.dispatchEvent(event);
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Search Results
  const matchingTips = TIPS.filter(t =>
    t.id.toLowerCase().includes(normalizedQuery) ||
    t.title.toLowerCase().includes(normalizedQuery) ||
    t.summary.toLowerCase().includes(normalizedQuery) ||
    t.services.some(s => s.toLowerCase().includes(normalizedQuery))
  ).slice(0, 4);

  const matchingQueries = RESOURCE_GRAPH_QUERIES.filter(q =>
    q.title.toLowerCase().includes(normalizedQuery) ||
    q.description.toLowerCase().includes(normalizedQuery) ||
    q.kql.toLowerCase().includes(normalizedQuery)
  ).slice(0, 3);

  const matchingCalcs = CALCULATORS.filter(c =>
    c.title.toLowerCase().includes(normalizedQuery) ||
    c.summary.toLowerCase().includes(normalizedQuery)
  ).slice(0, 3);

  const matchingDashboards = DASHBOARDS.filter(d =>
    d.id.toLowerCase().includes(normalizedQuery) ||
    d.title.toLowerCase().includes(normalizedQuery) ||
    d.summary.toLowerCase().includes(normalizedQuery)
  ).slice(0, 3);

  const handleSelect = (url: string) => {
    navigate(url);
    onClose();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="relative w-full max-w-2xl bg-[#0d0d0d] border border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#1f1f1f] bg-[#0a0a0a]">
          <Search className="w-4 h-4 text-[#888888] shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tips, Resource Graph queries, calculators, dashboards..."
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-[#666666] outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-[#888888] hover:text-white hover:bg-[#1a1a1a]"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4">
          {/* Quick Shortcuts when empty */}
          {normalizedQuery === '' && (
            <div className="p-2 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#666666] px-2">Quick Navigation</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSelect('/deadlines')}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#111111] hover:bg-[#181818] border border-[#1f1f1f] text-left text-xs text-[#ededed] transition-colors"
                >
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>February 1, 2027 Deadlines</span>
                </button>
                <button
                  onClick={() => handleSelect('/resource-graph-queries')}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#111111] hover:bg-[#181818] border border-[#1f1f1f] text-left text-xs text-[#ededed] transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5 text-[#3b9eff] shrink-0" />
                  <span>Waste Hunting Queries</span>
                </button>
                <button
                  onClick={() => handleSelect('/calculators/reservation-exchange-planner')}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#111111] hover:bg-[#181818] border border-[#1f1f1f] text-left text-xs text-[#ededed] transition-colors"
                >
                  <Calculator className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Reservation Exchange Planner</span>
                </button>
                <button
                  onClick={() => handleSelect('/ask')}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#111111] hover:bg-[#181818] border border-[#1f1f1f] text-left text-xs text-[#ededed] transition-colors"
                >
                  <Search className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Ask Azure maxxing AI</span>
                </button>
              </div>
            </div>
          )}

          {/* Tips */}
          {matchingTips.length > 0 && (
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#666666] px-3">Tips Library</span>
              {matchingTips.map(t => (
                <button
                  key={t.id}
                  onClick={() => handleSelect(`/tips/${t.id.toLowerCase()}-${t.slug}`)}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#161616] text-left text-xs text-[#ededed] transition-colors group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="font-mono text-[#3b9eff] text-[11px] font-semibold shrink-0">{t.id}</span>
                    <span className="truncate group-hover:text-white">{t.title}</span>
                  </div>
                  <span className="text-[10px] text-[#666666] shrink-0 font-mono uppercase ml-2">{t.lever}</span>
                </button>
              ))}
            </div>
          )}

          {/* Resource Graph Queries */}
          {matchingQueries.length > 0 && (
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#666666] px-3">Resource Graph Queries</span>
              {matchingQueries.map(q => (
                <button
                  key={q.id}
                  onClick={() => handleSelect(`/resource-graph-queries#${q.id}`)}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-[#161616] text-left text-xs text-[#ededed] transition-colors group"
                >
                  <Terminal className="w-3.5 h-3.5 text-[#3b9eff] shrink-0" />
                  <span className="truncate group-hover:text-white">{q.title}</span>
                </button>
              ))}
            </div>
          )}

          {/* Calculators */}
          {matchingCalcs.length > 0 && (
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#666666] px-3">Interactive Calculators</span>
              {matchingCalcs.map(c => (
                <button
                  key={c.slug}
                  onClick={() => handleSelect(`/calculators/${c.slug}`)}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-[#161616] text-left text-xs text-[#ededed] transition-colors group"
                >
                  <Calculator className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate group-hover:text-white">{c.title}</span>
                </button>
              ))}
            </div>
          )}

          {/* Dashboards */}
          {matchingDashboards.length > 0 && (
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#666666] px-3">Dashboards</span>
              {matchingDashboards.map(d => (
                <button
                  key={d.id}
                  onClick={() => handleSelect(`/dashboards/${d.id.toLowerCase()}-${d.slug}`)}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-[#161616] text-left text-xs text-[#ededed] transition-colors group"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="font-mono text-xs text-[#888888]">{d.id}</span>
                  <span className="truncate group-hover:text-white">{d.title}</span>
                </button>
              ))}
            </div>
          )}

          {normalizedQuery !== '' &&
            matchingTips.length === 0 &&
            matchingQueries.length === 0 &&
            matchingCalcs.length === 0 &&
            matchingDashboards.length === 0 && (
              <div className="py-8 text-center text-xs text-[#888888]">
                No matching results found for "{query}". Try searching for "disks", "Feb 2027", "AHB", or "Karpenter".
              </div>
            )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#080808] border-t border-[#1a1a1a] text-[11px] text-[#666666] font-mono">
          <div className="flex items-center gap-3">
            <span>Navigation: <kbd className="px-1.5 py-0.5 rounded bg-[#1f1f1f] text-[#a1a1a1]">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-[#1f1f1f] text-[#a1a1a1]">↓</kbd></span>
            <span>Select: <kbd className="px-1.5 py-0.5 rounded bg-[#1f1f1f] text-[#a1a1a1]">↵</kbd></span>
          </div>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
};
