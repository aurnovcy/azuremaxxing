import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, LayoutDashboard, Clock, Users, Database, Layers } from 'lucide-react';
import { SEO } from '../utils/seo';
import { DASHBOARDS } from '../data/dashboards';
import { SimpleChart } from '../components/SimpleChart';
import { CodeBlock } from '../components/CodeBlock';

export const DashboardDetail: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();

  // Extract ID e.g. D01 or slug
  const matched = DASHBOARDS.find(d => {
    const combined = `${d.id.toLowerCase()}-${d.slug}`;
    return combined === id.toLowerCase() || d.id.toLowerCase() === id.toLowerCase().split('-')[0];
  }) || DASHBOARDS[0];

  const currentIdx = DASHBOARDS.findIndex(d => d.id === matched.id);
  const prevDash = currentIdx > 0 ? DASHBOARDS[currentIdx - 1] : null;
  const nextDash = currentIdx < DASHBOARDS.length - 1 ? DASHBOARDS[currentIdx + 1] : null;

  return (
    <div className="w-full pb-20">
      <SEO
        title={`${matched.id}: ${matched.title} – Azure FinOps Dashboard Spec`}
        description={matched.summary}
        canonicalPath={`/dashboards/${matched.id.toLowerCase()}-${matched.slug}`}
      />

      {/* Header */}
      <section className="pt-10 pb-8 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <Link
            to="/dashboards"
            className="inline-flex items-center gap-1.5 text-xs text-[#888888] hover:text-white transition-colors mb-6 font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Dashboards</span>
          </Link>

          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold text-[#3b9eff] px-2.5 py-0.5 rounded bg-[#3b9eff]/10 border border-[#3b9eff]/30">
              {matched.id}
            </span>
            <span className="font-mono text-xs text-[#888888]">·</span>
            <span className="font-mono text-xs text-[#888888]">Cadence: {matched.cadence}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white">
            {matched.title}
          </h1>

          <p className="mt-3 text-base text-[#a1a1a1] max-w-2xl leading-relaxed">
            {matched.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-[#888888] border-t border-[#1a1a1a] pt-4">
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-[#a1a1a1]" />
              <span>Target Audience: <strong className="text-white">{matched.audience}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#a1a1a1]" />
              <span>Review Cadence: <strong className="text-white">{matched.cadence}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Spec Body */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-10 space-y-12">
        {/* Metric Cards Row */}
        {matched.metrics && matched.metrics.length > 0 && (
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {matched.metrics.map((m, i) => (
              <div key={i} className="p-4 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-1">
                <span className="text-[11px] text-[#888888] block truncate">{m.name}</span>
                <span className="font-mono text-2xl font-bold text-white tracking-tight tabular-nums block">
                  {m.value}
                </span>
                <div className="flex items-center gap-1.5 text-[11px] font-mono">
                  <span className={m.isPositive ? 'text-emerald-400' : 'text-amber-400'}>{m.change}</span>
                  <span className="text-[#666666]">({m.timeframe})</span>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Interactive Simulated Chart Viewport */}
        <section className="p-6 rounded-2xl border border-[#222222] bg-[#0a0a0a] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1a1a1a]">
            <div>
              <h2 className="text-base font-semibold text-white">Simulated Telemetry Viewport</h2>
              <p className="text-xs text-[#888888]">Interactive preview based on normalized FOCUS export metrics</p>
            </div>
            <span className="text-xs font-mono text-[#3b9eff] px-2 py-0.5 rounded bg-[#3b9eff]/10 border border-[#3b9eff]/30">
              Interactive View
            </span>
          </div>

          <SimpleChart
            data={matched.chartData}
            labels={matched.chartLabels}
            type="area"
            height={220}
          />
        </section>

        {/* Widget Inventory */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Widget & Visualization Inventory</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {matched.widgets.map((widget, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-[#1f1f1f] bg-[#080808]">
                <span className="w-5 h-5 rounded bg-[#161616] font-mono text-[11px] text-[#3b9eff] flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-xs sm:text-sm text-[#ededed] leading-relaxed">{widget}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Underlying Data Sources & KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#888888]">
              <Database className="w-4 h-4 text-[#3b9eff]" />
              <span>Required Data Sources</span>
            </div>
            <ul className="space-y-2 text-xs text-[#d4d4d4]">
              {matched.dataSources.map((ds, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3b9eff]" />
                  <span>{ds}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#888888]">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Monitored KPIs</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {matched.kpis.map((kpiId, i) => (
                <Link
                  key={i}
                  to={`/kpis#${kpiId}`}
                  className="font-mono text-xs px-2.5 py-1 rounded bg-[#141414] hover:bg-[#1a1a1a] border border-[#262626] text-[#ededed]"
                >
                  {kpiId.replace(/_/g, ' ')}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Example Query */}
        {matched.exampleQuery && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Example Ingestion Query</h2>
            <CodeBlock
              code={matched.exampleQuery.code}
              language={matched.exampleQuery.language}
              title={matched.exampleQuery.title}
            />
          </section>
        )}

        {/* Next / Previous Dashboard Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[#1f1f1f] text-xs font-mono">
          {prevDash ? (
            <Link
              to={`/dashboards/${prevDash.id.toLowerCase()}-${prevDash.slug}`}
              className="flex items-center gap-2 text-[#888888] hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{prevDash.id}: {prevDash.title}</span>
            </Link>
          ) : <div />}

          {nextDash ? (
            <Link
              to={`/dashboards/${nextDash.id.toLowerCase()}-${nextDash.slug}`}
              className="flex items-center gap-2 text-[#888888] hover:text-white"
            >
              <span>{nextDash.id}: {nextDash.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
};
