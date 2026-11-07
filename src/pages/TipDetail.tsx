import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck, CheckCircle2, LayoutDashboard, Target } from 'lucide-react';
import { SEO } from '../utils/seo';
import { TIPS } from '../data/tips';
import { CodeBlock } from '../components/CodeBlock';
import { Tip } from '../types';

export const TipDetail: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find tip by full ID prefix or slug match
  const rawId = id.toUpperCase();
  const matchedTip = TIPS.find((t) => {
    const combined = `${t.id.toLowerCase()}-${t.slug}`;
    return combined === id.toLowerCase() || t.id.toUpperCase() === rawId.split('-')[0];
  }) || TIPS[0];

  const currentIdx = TIPS.findIndex(t => t.id === matchedTip.id);
  const prevTip = currentIdx > 0 ? TIPS[currentIdx - 1] : null;
  const nextTip = currentIdx < TIPS.length - 1 ? TIPS[currentIdx + 1] : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: matchedTip.seo_title,
    description: matchedTip.meta_description,
    author: {
      '@type': 'Organization',
      name: 'azuremaxxing'
    },
    dateModified: matchedTip.last_verified,
    mainEntityOfPage: `https://azuremaxxing.com/tips/${matchedTip.id.toLowerCase()}-${matchedTip.slug}`
  };

  return (
    <div className="w-full pb-20">
      <SEO
        title={matchedTip.seo_title}
        description={matchedTip.meta_description}
        canonicalPath={`/tips/${matchedTip.id.toLowerCase()}-${matchedTip.slug}`}
        ogType="article"
        schema={articleSchema}
      />

      {/* Header */}
      <section className="pt-10 pb-8 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <Link
            to="/tips"
            className="inline-flex items-center gap-1.5 text-xs text-[#888888] hover:text-white transition-colors mb-6 font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Tips Library</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-mono text-sm font-bold text-[#3b9eff] px-2.5 py-0.5 rounded bg-[#3b9eff]/10 border border-[#3b9eff]/30">
              {matchedTip.id}
            </span>
            <span className="font-mono text-xs text-[#a1a1a1] px-2.5 py-0.5 rounded bg-[#111111] border border-[#222222] capitalize">
              {matchedTip.lever} Lever
            </span>
            <span className="font-mono text-xs text-[#a1a1a1] px-2.5 py-0.5 rounded bg-[#111111] border border-[#222222] capitalize">
              {matchedTip.effort} Effort
            </span>
            <span className="font-mono text-xs text-emerald-400 px-2 py-0.5 rounded bg-[#111111] border border-[#222222]">
              {'$'.repeat(matchedTip.impact)} Impact
            </span>
            {matchedTip.isPreview && (
              <span className="font-mono text-xs text-amber-400 px-2 py-0.5 rounded bg-amber-950/40 border border-amber-800/50">
                Preview
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] text-white leading-tight">
            {matchedTip.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#d4d4d4] leading-relaxed">
            {matchedTip.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-[#888888] border-t border-[#1a1a1a] pt-4">
            <span>Domain: <Link to={`/tips/domain/${matchedTip.domain}`} className="text-[#3b9eff] hover:underline">{matchedTip.domainName || matchedTip.domain}</Link></span>
            <span>·</span>
            <span>Last verified: <strong className="text-white">{matchedTip.last_verified}</strong></span>
          </div>
        </div>
      </section>

      {/* Main Tip Body */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 pt-10 space-y-12">
        {/* Step-by-Step How-To */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Step-by-Step Implementation</h2>
          <div className="space-y-3">
            {matchedTip.how_to.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-[#1f1f1f] bg-[#0a0a0a]">
                <span className="w-6 h-6 rounded-md bg-[#161616] border border-[#262626] font-mono text-xs text-[#3b9eff] flex items-center justify-center font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-[#ededed] leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Code Snippets (CLI, KQL, JSON, Bicep) */}
        {matchedTip.snippets && matchedTip.snippets.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Ready-to-Run Automation & Queries</h2>
            {matchedTip.snippets.map((snip, idx) => (
              <CodeBlock key={idx} code={snip.code} language={snip.language} title={snip.title} />
            ))}
          </section>
        )}

        {/* How to Verify Savings */}
        <section className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-950/15 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>How to Verify the Savings</span>
          </div>
          <p className="text-xs sm:text-sm text-[#ededed] leading-relaxed">
            {matchedTip.verify}
          </p>
        </section>

        {/* Dashboards & KPIs Linked */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchedTip.dashboard && matchedTip.dashboard.length > 0 && (
            <div className="p-4 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#888888]">
                <LayoutDashboard className="w-4 h-4 text-purple-400" />
                <span>Linked Dashboards</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {matchedTip.dashboard.map(dId => (
                  <Link
                    key={dId}
                    to={`/dashboards`}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] text-white"
                  >
                    Dashboard {dId} →
                  </Link>
                ))}
              </div>
            </div>
          )}

          {matchedTip.kpi && matchedTip.kpi.length > 0 && (
            <div className="p-4 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#888888]">
                <Target className="w-4 h-4 text-[#3b9eff]" />
                <span>Impacted KPIs</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {matchedTip.kpi.map(kId => (
                  <Link
                    key={kId}
                    to={`/kpis#${kId}`}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] text-[#3b9eff]"
                  >
                    {kId.replace(/_/g, ' ')}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Primary Microsoft Docs Links */}
        {matchedTip.docs && matchedTip.docs.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#888888]">Official Microsoft Documentation</h3>
            <div className="space-y-2">
              {matchedTip.docs.map((docUrl, idx) => (
                <a
                  key={idx}
                  href={docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-[#0a0a0a] hover:bg-[#111111] border border-[#222222] text-xs text-[#a1a1a1] hover:text-white transition-colors"
                >
                  <span className="truncate pr-4">{docUrl}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#888888]" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Related Tips */}
        {matchedTip.related && matchedTip.related.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-[#1f1f1f]">
            <h3 className="text-base font-semibold text-white">Related Optimization Tips</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matchedTip.related.map(rId => {
                const rTip = TIPS.find(t => t.id === rId);
                if (!rTip) return null;
                return (
                  <Link
                    key={rId}
                    to={`/tips/${rTip.id.toLowerCase()}-${rTip.slug}`}
                    className="p-3.5 rounded-lg border border-[#222222] bg-[#0a0a0a] hover:border-[#3b9eff]/40 transition-colors flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <span className="font-mono text-xs font-bold text-[#3b9eff]">{rTip.id}</span>
                      <h4 className="text-xs font-semibold text-white truncate max-w-xs">{rTip.title}</h4>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#888888] shrink-0" />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Next / Previous Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[#1f1f1f] text-xs font-mono">
          {prevTip ? (
            <Link
              to={`/tips/${prevTip.id.toLowerCase()}-${prevTip.slug}`}
              className="flex items-center gap-2 text-[#888888] hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{prevTip.id}</span>
            </Link>
          ) : <div />}

          {nextTip ? (
            <Link
              to={`/tips/${nextTip.id.toLowerCase()}-${nextTip.slug}`}
              className="flex items-center gap-2 text-[#888888] hover:text-white"
            >
              <span>{nextTip.id}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
};
