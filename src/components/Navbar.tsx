import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';
import { CommandPalette } from './CommandPalette';

export const Navbar: React.FC = () => {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Listen for open-command-palette custom events
  React.useEffect(() => {
    const handleOpen = () => setPaletteOpen(true);
    window.addEventListener('open-command-palette', handleOpen);
    return () => window.removeEventListener('open-command-palette', handleOpen);
  }, []);

  const navLinks = [
    { label: 'Deadlines', path: '/deadlines' },
    { label: 'Playbooks', path: '/playbooks/startup-30-day-plan' },
    { label: 'Tips', path: '/tips' },
    { label: 'Queries', path: '/resource-graph-queries' },
    { label: 'Calculators', path: '/calculators' },
    { label: 'Dashboards', path: '/dashboards' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#1f1f1f] bg-black/85 backdrop-blur-md">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 h-14">
          {/* Zone 1: Brand wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2 text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            <div className="w-5 h-5 rounded bg-[#3b9eff] flex items-center justify-center text-black font-mono text-xs font-black">
              ▲
            </div>
            <span>azuremaxxing</span>
          </Link>

          {/* Zone 2: Single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#a1a1a1]">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors whitespace-nowrap hover:text-white ${
                    isActive ? 'text-white font-semibold' : ''
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Search + Primary Action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger (⌘K) */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#111111] hover:bg-[#1a1a1a] border border-[#222222] text-xs text-[#888888] hover:text-[#ededed] transition-colors"
              title="Search command palette"
              aria-label="Open command palette"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline font-mono text-[10px] bg-[#1f1f1f] px-1.5 py-0.5 rounded text-[#a1a1a1]">
                ⌘K
              </kbd>
            </button>

            {/* Ask AI Primary Button */}
            <Link
              to="/ask"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-black bg-white hover:bg-[#eaeaea] rounded-md transition-colors whitespace-nowrap shrink-0 font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#3b9eff]" />
              <span>Ask AI</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded text-[#a1a1a1] hover:text-white hover:bg-[#111111]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-[#1f1f1f] bg-[#0a0a0a] px-4 py-3 space-y-2 animate-in slide-in-from-top duration-150">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-[#ededed] hover:text-white hover:bg-[#141414] rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-[#1a1a1a] flex gap-2">
              <Link
                to="/kpis"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 text-xs text-[#888888] hover:text-white bg-[#111111] rounded"
              >
                KPI Glossary
              </Link>
              <Link
                to="/whats-new"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 text-center py-2 text-xs text-[#888888] hover:text-white bg-[#111111] rounded"
              >
                What's New
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Palette */}
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
};
