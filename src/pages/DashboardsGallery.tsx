import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, ArrowRight, BarChart3, Clock, Users } from 'lucide-react';
import { SEO } from '../utils/seo';
import { DASHBOARDS } from '../data/dashboards';

export const DashboardsGallery: React.FC = () => {
  const [filterAudience, setFilterAudience] = useState('all');

  const audiences = [
    { key: 'all', label: 'All Audiences' },
    { key: 'executive', label: 'Executive (CEO / CFO / CTO)' },
    { key: 'finops', label: 'FinOps & Procurement' },
    { key: 'engineering', label: 'Engineering & Platform' },
    { key: 'startup', label: 'Startup Founders' },
  ];

  const filteredDashboards = DASHBOARDS.filter((d) => {
    if (filterAudience === 'all') return true;
    if (filterAudience === 'executive') return d.audience.includes('CFO') || d.audience.includes('CTO') || d.audience.includes('CEO');
    if (filterAudience === 'finops') return d.audience.includes('FinOps') || d.audience.includes('Procurement');
    if (filterAudience === 'engineering') return d.audience.includes('Platform') || d.audience.includes('SRE') || d.audience.includes('DBA');
    if (filterAudience === 'startup') return d.audience.includes('Startup') || d.audience.includes('Founders');
    return true;
  });

  return (
    <div className="w-full pb-20">
      <SEO
        title="22 FinOps Dashboards for Azure – Executive to Squad Level"
        description="Specifications for 22 Azure Cost Management and FinOps dashboards, from Executive Cloud Pulse to AI Spend, AKS, and Waste Trackers."
        canonicalPath="/dashboards"
      />

      <section className="pt-12 pb-10 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[#3b9eff]">Reporting Specifications</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white mt-1">
            22 FinOps Dashboard Proposals
          </h1>
          <p className="mt-3 text-base text-[#a1a1a1] max-w-3xl leading-relaxed">
            Every dashboard proposal specifies exact widgets, target cadence, decision-making audience, underlying data sources (FOCUS exports, Advisor, Resource Graph), and sample queries.
          </p>

          <div className="flex items-center gap-2 mt-8 overflow-x-auto scrollbar-none">
            {audiences.map((aud) => (
              <button
                key={aud.key}
                onClick={() => setFilterAudience(aud.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  filterAudience === aud.key
                    ? 'bg-white text-black font-semibold'
                    : 'bg-[#111111] text-[#a1a1a1] hover:text-white hover:bg-[#1a1a1a] border border-[#222222]'
                }`}
              >
                {aud.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDashboards.map((dash) => (
            <Link
              key={dash.id}
              to={`/dashboards/${dash.id.toLowerCase()}-${dash.slug}`}
              className="group p-6 rounded-2xl border border-[#222222] bg-[#0a0a0a] hover:border-[#3b9eff]/50 hover:bg-[#0e0e0e] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-sm font-bold text-[#3b9eff] bg-[#3b9eff]/10 px-2 py-0.5 rounded border border-[#3b9eff]/20">
                    {dash.id}
                  </span>
                  <span className="font-mono text-[11px] text-[#888888]">{dash.cadence}</span>
                </div>

                <h2 className="text-lg font-semibold text-white group-hover:text-[#3b9eff] transition-colors leading-snug">
                  {dash.title}
                </h2>

                <p className="text-xs text-[#a1a1a1] leading-relaxed line-clamp-3">
                  {dash.summary}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] text-[#666666] block truncate">
                    Audience: <strong className="text-[#a1a1a1] font-normal">{dash.audience}</strong>
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1a1a1a] flex items-center justify-between text-xs font-mono text-[#888888]">
                <span>{dash.widgets.length} Widgets</span>
                <span className="text-[#3b9eff] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  View spec <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
