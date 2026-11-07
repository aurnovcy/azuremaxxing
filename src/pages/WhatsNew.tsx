import React from 'react';
import { Rss, ExternalLink, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { SEO } from '../utils/seo';
import { CHANGELOG_ITEMS } from '../data/changelog';

export const WhatsNew: React.FC = () => {
  return (
    <div className="w-full pb-20">
      <SEO
        title="What's New in Azure Cost Management (2025–2026)"
        description="Comprehensive changelog of Azure cost management, FinOps toolkit, FOCUS 1.4, agentic cost tooling, and database savings plans."
        canonicalPath="/whats-new"
      />

      <section className="pt-12 pb-10 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#3b9eff]">Changelog</span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white mt-1">
                What's New in Azure Cost Management
              </h1>
              <p className="mt-3 text-base text-[#a1a1a1] max-w-2xl leading-relaxed">
                Chronological ledger of Azure FinOps releases, policy updates, FOCUS schema ratifications, and agentic cost tooling from late 2025 through late 2026.
              </p>
            </div>
            <a
              href="/feed.xml"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111111] hover:bg-[#1a1a1a] border border-[#262626] text-xs font-mono text-[#ededed] shrink-0"
              title="Subscribe to RSS/Atom Feed"
            >
              <Rss className="w-3.5 h-3.5 text-amber-400" />
              <span>feed.xml</span>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 pt-12 space-y-8">
        {CHANGELOG_ITEMS.map((item) => (
          <article
            key={item.id}
            id={item.id}
            className="p-6 rounded-2xl border border-[#222222] bg-[#0a0a0a] space-y-3 scroll-mt-28"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#3b9eff] font-semibold">{item.date}</span>
                <span className="font-mono text-[11px] text-[#888888] px-2 py-0.5 rounded bg-[#111111] border border-[#222222]">
                  {item.tag}
                </span>
                {item.isPreview && (
                  <span className="font-mono text-[10px] text-amber-400 px-2 py-0.5 rounded bg-amber-950/40 border border-amber-800/50 uppercase font-semibold">
                    Preview
                  </span>
                )}
              </div>
            </div>

            <h2 className="text-xl font-bold text-white">{item.title}</h2>
            <p className="text-xs sm:text-sm text-[#d4d4d4] leading-relaxed">{item.summary}</p>

            <div className="p-3.5 rounded-xl bg-[#0e0e0e] border border-[#1f1f1f] text-xs text-emerald-400 font-mono">
              <strong>FinOps Impact:</strong> {item.impact}
            </div>

            {item.links && item.links.length > 0 && (
              <div className="pt-2 flex items-center gap-3">
                {item.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#3b9eff] hover:underline"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};
