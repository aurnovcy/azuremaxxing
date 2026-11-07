import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Sparkles, AlertTriangle, ShieldCheck, Terminal, Cpu, Database, ChevronRight, Zap } from 'lucide-react';
import { SEO } from '../utils/seo';
import { CountdownTimer } from '../components/CountdownTimer';
import { OrderOfOperations } from '../components/OrderOfOperations';
import { TIPS } from '../data/tips';
import { CALCULATORS } from '../data/calculators';
import { CHANGELOG_ITEMS } from '../data/changelog';
import { RESOURCE_GRAPH_QUERIES } from '../data/queries';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSpend, setSelectedSpend] = useState<'startup' | 'scaleup' | 'enterprise'>('startup');

  const handleSpendSelect = (spend: 'startup' | 'scaleup' | 'enterprise') => {
    setSelectedSpend(spend);
    const routes = {
      startup: '/playbooks/startup-30-day-plan',
      scaleup: '/playbooks/scale-up-90-day-program',
      enterprise: '/playbooks/enterprise-12-month-program',
    };
    navigate(routes[spend]);
  };

  const homeFaqs = [
    {
      q: 'What does "maxxing" mean in Azure cost optimization?',
      a: 'Maxxing means maximizing the business value returned for every single dollar on the Azure invoice. It focuses on three levers: removing waste, lowering unit prices with layered commitments, and unlocking license optimization (Azure Hybrid Benefit and Dev/Test pricing).'
    },
    {
      q: 'Why is February 1, 2027 considered a critical Azure deadline?',
      a: 'Microsoft announced that starting February 1, 2027, reservations for any service covered by an Azure savings plan (compute or databases) can no longer be exchanged. Active reservations purchased before that date keep only one final exchange. Commitments made against oversized resources now represent an irreversible financial trap.'
    },
    {
      q: 'Why is License Optimization called Azure\'s "third lever"?',
      a: 'Unlike other clouds where optimization is limited to rate discounts and rightsizing, Azure has an enormous third lever: Windows Server and SQL Server licensing. Using Azure Hybrid Benefit, Dev/Test subscriptions, and edition rightsizing can cut invoices by up to 40% to 55%.'
    },
    {
      q: 'Why does azuremaxxing not hard-code fixed dollar prices?',
      a: 'Azure prices vary substantially by geography, agreement type (EA, MCA, CSP, pay-as-you-go), currency, and date. Quoting hardcoded dollar prices creates misinformation. We focus on pricing mechanics and published relative discounts.'
    }
  ];

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'azuremaxxing',
    url: 'https://azuremaxxing.com/',
    description: 'The Field Guide to Getting Maximum Value from Every Azure Dollar. Rate, usage, and license optimization for engineering and FinOps teams.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://azuremaxxing.com/tips?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <div className="w-full">
      <SEO
        title="azuremaxxing – The Field Guide to Getting Maximum Value from Every Azure Dollar"
        description="The Field Guide to Getting Maximum Value from Every Azure Dollar. Rate, usage, and license optimization for startups, scale-ups, and enterprises."
        canonicalPath="/"
        schema={homeSchema}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#1f1f1f]">
        {/* Subtle radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#3b9eff]/8 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Top Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#262626] bg-[#0d0d0d] text-xs font-mono text-[#888888] mb-6">
            <span className="text-[#3b9eff]">●</span>
            <span className="text-[#ededed]">FinOps Framework Aligned</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.04em] text-white leading-[1.05] max-w-4xl text-balance">
            The Field Guide to Getting Maximum Value from Every Azure Dollar.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#a1a1a1] max-w-2xl leading-relaxed">
            Rate, usage, and license optimization for engineering and FinOps teams. Remove waste, lower unit prices, and unlock Software Assurance value.
          </p>

          {/* Interactive Bill-Size Selector */}
          <div className="mt-10 p-5 sm:p-6 rounded-2xl border border-[#222222] bg-[#0a0a0a] max-w-2xl">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#888888] mb-3">
              What's your monthly Azure bill? Select your playbook:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleSpendSelect('startup')}
                className="flex flex-col items-start p-3.5 rounded-xl border border-[#262626] bg-[#111111] hover:border-[#3b9eff] hover:bg-[#141414] transition-all text-left group cursor-pointer"
              >
                <span className="text-xs font-mono text-[#3b9eff] font-semibold">Under $50k / mo</span>
                <span className="text-sm font-semibold text-white mt-1 group-hover:text-[#3b9eff] flex items-center gap-1">
                  Startup 30-Day
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
                <span className="text-[11px] text-[#777777] mt-1">Guardrails & credit cliff</span>
              </button>

              <button
                onClick={() => handleSpendSelect('scaleup')}
                className="flex flex-col items-start p-3.5 rounded-xl border border-[#262626] bg-[#111111] hover:border-[#3b9eff] hover:bg-[#141414] transition-all text-left group cursor-pointer"
              >
                <span className="text-xs font-mono text-[#3b9eff] font-semibold">$50k – $1M / mo</span>
                <span className="text-sm font-semibold text-white mt-1 group-hover:text-[#3b9eff] flex items-center gap-1">
                  Scale-Up 90-Day
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
                <span className="text-[11px] text-[#777777] mt-1">AKS, Arm & commitments</span>
              </button>

              <button
                onClick={() => handleSpendSelect('enterprise')}
                className="flex flex-col items-start p-3.5 rounded-xl border border-[#262626] bg-[#111111] hover:border-[#3b9eff] hover:bg-[#141414] transition-all text-left group cursor-pointer"
              >
                <span className="text-xs font-mono text-[#3b9eff] font-semibold">Over $1M / mo</span>
                <span className="text-sm font-semibold text-white mt-1 group-hover:text-[#3b9eff] flex items-center gap-1">
                  Enterprise 12-Mo
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
                <span className="text-[11px] text-[#777777] mt-1">Deadlines, MACC & AHB</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Deadlines Banner */}
      <section className="border-b border-[#1f1f1f] bg-[#080808] py-8">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Critical Planning Deadline
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              February 1, 2027: Azure Reservation Exchanges End
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1a1] leading-relaxed">
              New reservations for savings-plan-covered services lose exchange rights. Active reservations purchased before the cutoff keep one final exchange.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
            <CountdownTimer targetDate="2027-02-01T00:00:00Z" />
            <Link
              to="/deadlines"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#141414] hover:bg-[#1f1f1f] border border-[#2a2a2a] text-xs font-medium text-white transition-colors whitespace-nowrap"
            >
              <span>Deadlines Guide</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#3b9eff]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-16 space-y-24">
        {/* Order of Operations Visual Component */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#3b9eff]">The Methodology</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                The 9-Step Order of Operations
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#888888] max-w-md">
              Step through the strict sequence required to eliminate waste before locking in multi-year commitments.
            </p>
          </div>

          <OrderOfOperations />
        </section>

        {/* The Three Levers Explainer */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-[#3b9eff]">Azure Architecture</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Two Levers, Plus a Third That's Unusually Big
            </h2>
            <p className="mt-3 text-sm text-[#a1a1a1]">
              Every cloud has Rate and Usage optimization. But on Azure, License Optimization can rival both combined.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lever 1: Rate */}
            <div className="p-6 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#111111] border border-[#222222] flex items-center justify-center text-[#3b9eff]">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">01. Rate Optimization</h3>
              <p className="text-xs sm:text-sm text-[#a1a1a1] leading-relaxed">
                Lowers the unit price of what you consume. Combines Azure compute and database savings plans, reservations for stable baselines, Spot VMs, and MACC consumption discounts.
              </p>
              <div className="pt-2 border-t border-[#1a1a1a] flex items-center justify-between text-xs font-mono text-[#888888]">
                <span>Goal: High ESR</span>
                <Link to="/tips?lever=rate" className="text-[#3b9eff] hover:underline flex items-center gap-1">
                  Rate tips <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Lever 2: Usage */}
            <div className="p-6 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#111111] border border-[#222222] flex items-center justify-center text-emerald-400">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">02. Usage Optimization</h3>
              <p className="text-xs sm:text-sm text-[#a1a1a1] leading-relaxed">
                Lowers the quantity of what you run. Eliminates orphan disks and IPs, down-sizes over-provisioned VMs/DBs, auto-shuts down dev environments, and prunes observability bloat.
              </p>
              <div className="pt-2 border-t border-[#1a1a1a] flex items-center justify-between text-xs font-mono text-[#888888]">
                <span>Goal: Lean Baseline</span>
                <Link to="/tips?lever=usage" className="text-[#3b9eff] hover:underline flex items-center gap-1">
                  Usage tips <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Lever 3: Licensing (Signature) */}
            <div className="p-6 rounded-xl border border-[#3b9eff]/40 bg-[#0d0d0d] space-y-4 relative shadow-[0_0_20px_rgba(59,158,255,0.08)]">
              <div className="absolute top-4 right-4">
                <span className="font-mono text-[10px] text-[#3b9eff] px-2 py-0.5 rounded bg-[#3b9eff]/10 border border-[#3b9eff]/30 uppercase font-semibold">
                  Signature Lever
                </span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#111111] border border-[#222222] flex items-center justify-center text-[#3b9eff]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">03. License Optimization</h3>
              <p className="text-xs sm:text-sm text-[#a1a1a1] leading-relaxed">
                Removes software license surcharges entirely. Applies Azure Hybrid Benefit across Windows and SQL Server, leverages Dev/Test subscription offers, and governs Arc ESU lifecycles.
              </p>
              <div className="pt-2 border-t border-[#1a1a1a] flex items-center justify-between text-xs font-mono text-[#888888]">
                <span>Saves up to 55%</span>
                <Link to="/tips?lever=license" className="text-[#3b9eff] hover:underline flex items-center gap-1">
                  License tips <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Featured Stat Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-1">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
              40%
            </span>
            <h4 className="text-xs font-semibold text-[#ededed]">Windows AHB Savings</h4>
            <p className="text-[11px] text-[#777777] leading-relaxed">
              Base VM rate reduction when applying Software Assurance licenses.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-1">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#3b9eff] tracking-tight tabular-nums">
              128h
            </span>
            <h4 className="text-xs font-semibold text-[#ededed]">Weekly Non-Prod Waste</h4>
            <p className="text-[11px] text-[#777777] leading-relaxed">
              Out of 168 hours in a week, dev environments run idle 76% of the time.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-1">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight tabular-nums">
              02/01
            </span>
            <h4 className="text-xs font-semibold text-[#ededed]">2027 Reservation Cutoff</h4>
            <p className="text-[11px] text-[#777777] leading-relaxed">
              Exchanges end permanently for savings-plan-covered services.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-1">
            <span className="font-mono text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight tabular-nums">
              50%
            </span>
            <h4 className="text-xs font-semibold text-[#ededed]">AI Batch & Cache Discount</h4>
            <p className="text-[11px] text-[#777777] leading-relaxed">
              Instant savings on Foundry input tokens via caching and batch queues.
            </p>
          </div>
        </section>

        {/* Featured Calculators Grid */}
        <section>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1f1f1f]">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#3b9eff]">Interactive Models</span>
              <h2 className="text-2xl font-bold tracking-tight text-white mt-1">Featured FinOps Calculators</h2>
            </div>
            <Link to="/calculators" className="text-xs font-medium text-[#3b9eff] hover:underline flex items-center gap-1">
              View all 10 calculators <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CALCULATORS.slice(0, 3).map((calc) => (
              <Link
                key={calc.slug}
                to={`/calculators/${calc.slug}`}
                className="group p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] hover:border-[#3b9eff]/50 hover:bg-[#0e0e0e] transition-all flex flex-col justify-between"
              >
                <div>
                  {calc.badge && (
                    <span className="font-mono text-[10px] uppercase font-semibold text-amber-400 tracking-wider">
                      {calc.badge}
                    </span>
                  )}
                  <h3 className="text-base font-semibold text-white group-hover:text-[#3b9eff] transition-colors mt-1">
                    {calc.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#a1a1a1] leading-relaxed line-clamp-3">
                    {calc.summary}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#1a1a1a] flex items-center justify-between text-xs text-[#888888] font-mono">
                  <span>Last verified: {calc.lastVerified}</span>
                  <span className="text-[#3b9eff] group-hover:translate-x-0.5 transition-transform">Run tool →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Waste Hunting Resource Graph Preview */}
        <section className="p-6 sm:p-8 rounded-2xl border border-[#222222] bg-[#0a0a0a]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#3b9eff]">Resource Graph Appendix</span>
              <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
                Zero-Dollar Inventory Waste Hunting
              </h2>
              <p className="text-xs sm:text-sm text-[#888888] mt-1">
                Run cross-subscription KQL queries to uncover unattached disks, idle IPs, and stopped VMs in seconds.
              </p>
            </div>
            <Link
              to="/resource-graph-queries"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black hover:bg-[#ededed] text-xs font-semibold transition-colors shrink-0"
            >
              <span>Explore All Queries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {RESOURCE_GRAPH_QUERIES.slice(0, 2).map((q) => (
              <div key={q.id} className="p-4 rounded-xl border border-[#1f1f1f] bg-[#050505]">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h4 className="text-sm font-semibold text-white">{q.title}</h4>
                  <span className="text-[11px] font-mono text-emerald-400">{q.estimatedWasteImpact}</span>
                </div>
                <p className="text-xs text-[#a1a1a1] mb-3">{q.description}</p>
                <div className="p-3 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] font-mono text-xs text-[#ededed] overflow-x-auto">
                  <pre><code>{q.cliCommand}</code></pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest What's New items */}
        <section>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1f1f1f]">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#3b9eff]">Changelog</span>
              <h2 className="text-2xl font-bold tracking-tight text-white mt-1">What's New in Azure Cost Management</h2>
            </div>
            <Link to="/whats-new" className="text-xs font-medium text-[#3b9eff] hover:underline flex items-center gap-1">
              View feed <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CHANGELOG_ITEMS.slice(0, 3).map((item) => (
              <div key={item.id} className="p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#888888]">
                  <span>{item.date}</span>
                  <span className="text-[#3b9eff]">{item.tag}</span>
                </div>
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="text-xs text-[#a1a1a1] leading-relaxed line-clamp-3">{item.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Home FAQ Section */}
        <section className="pt-6 border-t border-[#1f1f1f]">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-[#3b9eff]">Frequently Asked Questions</span>
            <h2 className="text-2xl font-bold tracking-tight text-white mt-1">Azure maxxing Philosophy & Answers</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {homeFaqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-2">
                <h3 className="text-sm font-semibold text-white">{faq.q}</h3>
                <p className="text-xs sm:text-sm text-[#a1a1a1] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
