import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, Zap, Building } from 'lucide-react';
import { SEO } from '../utils/seo';
import { TIPS } from '../data/tips';
import { AudienceType } from '../types';

export const AudienceLanding: React.FC = () => {
  const { audience = 'startups' } = useParams<{ audience: string }>();

  const audienceKey: AudienceType = audience.includes('startup')
    ? 'startup'
    : audience.includes('scale')
    ? 'scaleup'
    : 'enterprise';

  const metadataMap = {
    startup: {
      title: 'Azure FinOps for Startups & Founders',
      subtitle: 'Survive the post-credit cliff, configure budget circuit-breakers, and build lean scale-to-zero architectures.',
      seoTitle: 'Azure Cost Optimization for Startups: Credit Cliff & Runway',
      description: 'The startup guide to Azure: avoid accidental GPU bills, model post-credit runway, and exploit prompt caching and serverless SQL.',
      playbookLink: '/playbooks/startup-30-day-plan',
      playbookLabel: '30-Day Startup Playbook',
      intro: 'When venture credits mask your monthly invoice, cloud efficiency is easily overlooked. But once credits hit zero, unoptimized retail pricing drains cash runway overnight. The startup playbook focuses on defense: budget action groups that automatically halt rogue resources, single-region simplicity, scale-to-zero serverless backends, and prompt caching on AI endpoints.'
    },
    scaleup: {
      title: 'Azure FinOps for Scale-Ups ($50k–$1M/mo)',
      subtitle: 'Eliminate Kubernetes bin-packing slack, adopt Arm Cobalt, and transition to layered commitment portfolios.',
      seoTitle: 'Azure Cost Optimization for Scale-Ups: AKS, Arm & Commitments',
      description: 'Scale-up Azure optimization guide: Node auto-provisioning with Karpenter, memory-informed rightsizing, and database savings plans.',
      playbookLink: '/playbooks/scale-up-90-day-program',
      playbookLabel: '90-Day Scale-Up Program',
      intro: 'Growth-stage companies suffer from multi-cluster sprawl, oversized AKS request allocations, and fragmented reservations. At $50k to $1M per month, engineering velocity cannot come at the expense of gross margins. The scale-up playbook introduces automated node consolidation with Karpenter, an observability ingestion diet in Log Analytics, and layered savings plans designed with the February 2027 deadline in mind.'
    },
    enterprise: {
      title: 'Azure FinOps for Enterprises (> $1M/mo)',
      subtitle: 'Navigate the Feb 1, 2027 reservation cutoff, centralize SQL AHB, and maximize MACC consumption drawdown.',
      seoTitle: 'Enterprise Azure FinOps: MACC, Deadlines, AHB & Landing Zones',
      description: 'Strategic guide for enterprise EA/MCA leaders: managing the 2027 reservation cutoff, Windows Server 2016 ESUs, and centralized license pooling.',
      playbookLink: '/playbooks/enterprise-12-month-program',
      playbookLabel: '12-Month Enterprise Program',
      intro: 'At enterprise scale, cloud financial management is a commercial and architectural discipline. Enterprise Agreement and Microsoft Customer Agreement structures unlock deep leverage: MACC burndown through eligible Marketplace software, centralized SQL Server licensing pools, and Arc-enabled monthly ESUs. This program aligns executive governance with the impending February 1, 2027 reservation exchange changes.'
    }
  };

  const current = metadataMap[audienceKey];
  const matchingTips = TIPS.filter(t => t.audience.includes(audienceKey));

  return (
    <div className="w-full pb-20">
      <SEO
        title={current.seoTitle}
        description={current.description}
        canonicalPath={`/for/${audience}`}
      />

      <section className="pt-12 pb-10 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-[#888888] hover:text-white font-mono mb-4">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span className="block text-xs font-mono uppercase tracking-wider text-[#3b9eff]">Targeted Operating Model</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-1">
            {current.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#ededed] max-w-3xl leading-relaxed">
            {current.intro}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              to={current.playbookLink}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-[#ededed] transition-colors"
            >
              <span>Open {current.playbookLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/deadlines"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#111111] hover:bg-[#1a1a1a] border border-[#222222] text-xs text-white transition-colors"
            >
              <span>Deadlines Radar</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-10">
        <h2 className="text-lg font-bold text-white mb-6">
          Recommended Field Tips for {audienceKey.toUpperCase()}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchingTips.map(tip => (
            <Link
              key={tip.id}
              to={`/tips/${tip.id.toLowerCase()}-${tip.slug}`}
              className="p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] hover:border-[#3b9eff]/50 hover:bg-[#0e0e0e] transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-[#3b9eff]">{tip.id}</span>
                  <span className="font-mono text-[#888888]">{'$'.repeat(tip.impact)} · {tip.effort} effort</span>
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
