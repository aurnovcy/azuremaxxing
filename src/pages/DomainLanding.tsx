import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SEO } from '../utils/seo';
import { TIPS, DOMAINS } from '../data/tips';

export const DomainLanding: React.FC = () => {
  const { domain = 'commitments' } = useParams<{ domain: string }>();
  const domainInfo = DOMAINS[domain] || {
    name: domain.replace(/-/g, ' ').toUpperCase(),
    prefix: 'DOM',
    description: `Targeted architectural and cost optimization guidelines for ${domain}.`
  };

  const domainTips = TIPS.filter(t => t.domain === domain);

  return (
    <div className="w-full pb-20">
      <SEO
        title={`${domainInfo.name} Azure Cost Optimization Tips`}
        description={domainInfo.description}
        canonicalPath={`/tips/domain/${domain}`}
      />

      <section className="pt-12 pb-8 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <Link to="/tips" className="inline-flex items-center gap-1.5 text-xs text-[#888888] hover:text-white font-mono mb-4">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Domains</span>
          </Link>
          <div className="flex items-center gap-2 font-mono text-xs text-[#3b9eff] mb-2">
            <span>Prefix: {domainInfo.prefix}</span>
            <span>·</span>
            <span>{domainTips.length} Tips in this Domain</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {domainInfo.name}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#a1a1a1] max-w-2xl leading-relaxed">
            {domainInfo.description}
          </p>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {domainTips.map(tip => (
            <Link
              key={tip.id}
              to={`/tips/${tip.id.toLowerCase()}-${tip.slug}`}
              className="p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] hover:border-[#3b9eff]/50 hover:bg-[#0e0e0e] transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-[#3b9eff]">{tip.id}</span>
                  <span className="font-mono text-[#888888]">{'$'.repeat(tip.impact)}</span>
                </div>
                <h3 className="text-sm font-semibold text-white">{tip.title}</h3>
                <p className="text-xs text-[#a1a1a1] leading-relaxed line-clamp-2">{tip.summary}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#1a1a1a] flex items-center justify-between text-[11px] font-mono text-[#666666]">
                <span>{tip.last_verified}</span>
                <span className="text-[#3b9eff] flex items-center gap-1">Read tip <ArrowRight className="w-3 h-3" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
