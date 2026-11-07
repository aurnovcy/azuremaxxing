import React, { useState } from 'react';
import { Target, Search, ArrowRight, ShieldCheck, Cpu, Terminal } from 'lucide-react';
import { SEO } from '../utils/seo';
import { KPIS } from '../data/kpis';
import { KPIItem } from '../types';

export const KpisGlossary: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Commitments & Commercial', 'Licensing', 'Usage Optimization', 'Allocation & Governance', 'AI & Foundry', 'Unit Economics'];

  const filteredKpis = KPIS.filter(kpi => {
    if (selectedCategory !== 'all' && kpi.category !== selectedCategory) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        kpi.name.toLowerCase().includes(q) ||
        kpi.formula.toLowerCase().includes(q) ||
        kpi.whyItMatters.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="w-full pb-20">
      <SEO
        title="Azure FinOps KPI Glossary – Formulas & Benchmark Targets"
        description="Comprehensive KPI catalog for Azure cost optimization: Effective Savings Rate (ESR), commitment coverage, AHB coverage, orphan spend, and AI unit costs."
        canonicalPath="/kpis"
      />

      <section className="pt-12 pb-10 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[#3b9eff]">Standard Metrics</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white mt-1">
            Azure FinOps KPI Glossary
          </h1>
          <p className="mt-3 text-base text-[#a1a1a1] max-w-3xl leading-relaxed">
            Standardized definitions, mathematical formulas, recommended starting targets, and strategic rationale across Rate, Usage, and License optimization.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search KPI by name, formula, or keyword..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#0d0d0d] border border-[#262626] text-xs text-white placeholder-[#666666] outline-none focus:border-[#3b9eff]"
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === c
                      ? 'bg-white text-black font-semibold'
                      : 'bg-[#111111] text-[#a1a1a1] hover:text-white hover:bg-[#1a1a1a] border border-[#222222]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-10">
        <div className="space-y-6">
          {filteredKpis.map(kpi => (
            <article
              key={kpi.id}
              id={kpi.id}
              className="p-6 rounded-2xl border border-[#222222] bg-[#0a0a0a] space-y-4 scroll-mt-28"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1a1a1a]">
                <div>
                  <span className="text-[10px] font-mono text-[#3b9eff] uppercase tracking-wider">
                    {kpi.category} · {kpi.frequency}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-0.5">{kpi.name}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-emerald-400 px-2.5 py-1 rounded bg-[#111111] border border-[#222222] shrink-0">
                    Target: {kpi.target}
                  </span>
                </div>
              </div>

              {/* Formula */}
              <div className="p-3.5 rounded-xl bg-[#0e0e0e] border border-[#1f1f1f] space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#888888]">Mathematical Formula</span>
                <div className="font-mono text-sm text-[#3b9eff] font-semibold">{kpi.formula}</div>
              </div>

              {/* Why It Matters */}
              <div className="space-y-1">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#888888]">Why It Matters</h3>
                <p className="text-xs sm:text-sm text-[#d4d4d4] leading-relaxed">
                  {kpi.whyItMatters}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
