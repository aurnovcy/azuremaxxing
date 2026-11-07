import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, ShieldCheck, Cpu, Terminal, X, RotateCcw } from 'lucide-react';
import { SEO } from '../utils/seo';
import { TIPS, DOMAINS } from '../data/tips';
import { Tip, LeverType, EffortType, AudienceType } from '../types';

export const TipsLibrary: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const domainParam = searchParams.get('domain') || 'all';
  const leverParam = searchParams.get('lever') || 'all';
  const audienceParam = searchParams.get('audience') || 'all';
  const effortParam = searchParams.get('effort') || 'all';
  const queryParam = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(queryParam);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'all' || !value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam('q', searchQuery.trim());
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSearchParams(new URLSearchParams());
  };

  // Filter tips
  const filteredTips = useMemo(() => {
    return TIPS.filter((tip) => {
      if (domainParam !== 'all' && tip.domain !== domainParam) return false;
      if (leverParam !== 'all' && tip.lever !== leverParam) return false;
      if (audienceParam !== 'all' && !tip.audience.includes(audienceParam as AudienceType)) return false;
      if (effortParam !== 'all' && tip.effort !== effortParam) return false;

      if (queryParam) {
        const q = queryParam.toLowerCase();
        const matches =
          tip.id.toLowerCase().includes(q) ||
          tip.title.toLowerCase().includes(q) ||
          tip.summary.toLowerCase().includes(q) ||
          tip.services.some(s => s.toLowerCase().includes(q));
        if (!matches) return false;
      }

      return true;
    });
  }, [domainParam, leverParam, audienceParam, effortParam, queryParam]);

  const tipsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Azure maxxing Tips Library',
    description: 'Field guide tips for Azure rate, usage, and license optimization.',
    numberOfItems: filteredTips.length,
    itemListElement: filteredTips.map((tip, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: `${tip.id} · ${tip.title}`,
      url: `https://azuremaxxing.com/tips/${tip.id.toLowerCase()}-${tip.slug}`
    }))
  };

  const getLeverBadge = (lever: LeverType) => {
    switch (lever) {
      case 'rate':
        return <span className="text-xs font-mono text-[#3b9eff]">Rate</span>;
      case 'usage':
        return <span className="text-xs font-mono text-emerald-400">Usage</span>;
      case 'license':
        return <span className="text-xs font-mono text-amber-400">License</span>;
    }
  };

  const renderImpact = (impact: number) => {
    return '$'.repeat(impact);
  };

  return (
    <div className="w-full pb-20">
      <SEO
        title="Azure FinOps Tips Library – Rate, Usage & License Guides"
        description="Searchable, filterable library of field-tested Azure optimization tips across 22 domains. Real Azure CLI, KQL, and Bicep automation snippets."
        canonicalPath="/tips"
        schema={tipsSchema}
      />

      {/* Header */}
      <section className="pt-12 pb-8 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[#3b9eff]">Knowledge Repository</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white mt-1">
            Azure maxxing Tips Library
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#a1a1a1] max-w-2xl leading-relaxed">
            Every tip includes practical step-by-step instructions, CLI/KQL snippets, savings verification queries, and verified source documentation links.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="mt-6 flex items-center gap-2 max-w-lg">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by keyword, SKU, or ID (e.g. COM-02, AHB, disks)..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#0d0d0d] border border-[#262626] text-xs sm:text-sm text-white placeholder-[#666666] outline-none focus:border-[#3b9eff] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); updateParam('q', ''); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-white text-black hover:bg-[#ededed] text-xs font-semibold whitespace-nowrap transition-colors"
            >
              Filter
            </button>
          </form>
        </div>
      </section>

      {/* Filter Toolbar */}
      <section className="sticky top-14 z-20 border-b border-[#1f1f1f] bg-black/95 backdrop-blur-md py-3">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Lever filter */}
            <select
              value={leverParam}
              onChange={(e) => updateParam('lever', e.target.value)}
              className="px-2.5 py-1.5 rounded-md bg-[#111111] border border-[#222222] text-[#ededed] text-xs outline-none focus:border-[#3b9eff]"
            >
              <option value="all">All Levers</option>
              <option value="rate">Rate Optimization</option>
              <option value="usage">Usage Optimization</option>
              <option value="license">License Optimization</option>
            </select>

            {/* Audience filter */}
            <select
              value={audienceParam}
              onChange={(e) => updateParam('audience', e.target.value)}
              className="px-2.5 py-1.5 rounded-md bg-[#111111] border border-[#222222] text-[#ededed] text-xs outline-none focus:border-[#3b9eff]"
            >
              <option value="all">All Audiences</option>
              <option value="startup">Startup (&lt; $50k)</option>
              <option value="scaleup">Scale-up ($50k–$1M)</option>
              <option value="enterprise">Enterprise (&gt; $1M)</option>
            </select>

            {/* Effort filter */}
            <select
              value={effortParam}
              onChange={(e) => updateParam('effort', e.target.value)}
              className="px-2.5 py-1.5 rounded-md bg-[#111111] border border-[#222222] text-[#ededed] text-xs outline-none focus:border-[#3b9eff]"
            >
              <option value="all">All Efforts</option>
              <option value="low">Low Effort (Minutes–Day)</option>
              <option value="med">Medium Effort (Days–Weeks)</option>
              <option value="high">High Effort (Project)</option>
            </select>

            {/* Domain filter */}
            <select
              value={domainParam}
              onChange={(e) => updateParam('domain', e.target.value)}
              className="px-2.5 py-1.5 rounded-md bg-[#111111] border border-[#222222] text-[#ededed] text-xs outline-none focus:border-[#3b9eff] max-w-[180px] sm:max-w-xs truncate"
            >
              <option value="all">All Domains (22)</option>
              {Object.entries(DOMAINS).map(([slug, d]) => (
                <option key={slug} value={slug}>
                  {d.prefix} · {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[#888888] text-xs">
              Showing <strong className="text-white">{filteredTips.length}</strong> tips
            </span>
            {(domainParam !== 'all' || leverParam !== 'all' || audienceParam !== 'all' || effortParam !== 'all' || queryParam) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-[11px] font-mono text-[#3b9eff] hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset filters</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Tips Grid */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-10">
        {filteredTips.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <p className="text-sm text-[#888888]">No tips found matching your exact filter combination.</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-[#2a2a2a] text-xs text-white"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTips.map((tip) => (
              <Link
                key={tip.id}
                to={`/tips/${tip.id.toLowerCase()}-${tip.slug}`}
                className="group p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] hover:border-[#3b9eff]/50 hover:bg-[#0e0e0e] transition-all flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#3b9eff] bg-[#3b9eff]/10 px-2 py-0.5 rounded border border-[#3b9eff]/20">
                        {tip.id}
                      </span>
                      {getLeverBadge(tip.lever)}
                      {tip.isPreview && (
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-950/40 text-amber-400 border border-amber-800/50">
                          Preview
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[11px] text-[#888888]">
                      <span>{renderImpact(tip.impact)}</span>
                      <span>·</span>
                      <span className="capitalize">{tip.effort} effort</span>
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-white group-hover:text-[#3b9eff] transition-colors leading-snug">
                    {tip.title}
                  </h3>

                  <p className="text-xs text-[#a1a1a1] leading-relaxed line-clamp-2">
                    {tip.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#1a1a1a] flex items-center justify-between text-[11px] text-[#666666] font-mono">
                  <span>Last verified: {tip.last_verified}</span>
                  <span className="text-[#3b9eff] group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-medium">
                    Read guide <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
