import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, ShieldCheck, Clock, HelpCircle } from 'lucide-react';
import { SEO } from '../utils/seo';
import { CALCULATORS } from '../data/calculators';

export const CalculatorsIndex: React.FC = () => {
  const calcSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Azure FinOps Interactive Calculators',
    description: 'Working mathematical models for Azure reservations, savings plans, AHB licensing, and storage lifecycle.',
    numberOfItems: CALCULATORS.length,
    itemListElement: CALCULATORS.map((c, i) => ({
      '@type': 'SoftwareApplication',
      position: i + 1,
      name: c.title,
      url: `https://azuremaxxing.com/calculators/${c.slug}`
    }))
  };

  return (
    <div className="w-full pb-20">
      <SEO
        title="10 Interactive Azure FinOps Calculators & Break-Even Models"
        description="Run your own numbers through 10 Azure cost calculators: reservation exchange planner, reservation vs savings plan, AHB savings, ESU vs upgrade, and storage lifecycle."
        canonicalPath="/calculators"
        schema={calcSchema}
      />

      <section className="pt-12 pb-10 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[#3b9eff]">Financial Engineering</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white mt-1">
            10 Azure FinOps Calculators
          </h1>
          <p className="mt-3 text-base text-[#a1a1a1] max-w-3xl leading-relaxed">
            All models are driven by your own inputs and contract rates. Every calculator includes comprehensive mathematical assumptions, worked examples, and verifiable source documentation.
          </p>

          <div className="mt-6 p-4 rounded-xl border border-[#222222] bg-[#0d0d0d] flex items-center justify-between text-xs text-[#888888] font-mono">
            <span>Estimates only; verify against published Azure pricing and your commercial agreement (EA / MCA).</span>
          </div>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CALCULATORS.map((calc) => (
            <Link
              key={calc.slug}
              to={`/calculators/${calc.slug}`}
              className="group p-6 rounded-2xl border border-[#222222] bg-[#0a0a0a] hover:border-[#3b9eff]/50 hover:bg-[#0e0e0e] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  {calc.badge ? (
                    <span className="font-mono text-[10px] font-semibold text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded">
                      {calc.badge}
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] text-[#888888]">
                      Interactive Tool
                    </span>
                  )}
                  <span className="font-mono text-[11px] text-[#666666]">
                    Verified {calc.lastVerified}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white group-hover:text-[#3b9eff] transition-colors leading-snug">
                  {calc.title}
                </h2>

                <p className="text-xs text-[#a1a1a1] leading-relaxed line-clamp-3">
                  {calc.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1a1a1a] flex items-center justify-between text-xs font-mono text-[#888888]">
                <span>{calc.faqs.length} FAQs & Formulas</span>
                <span className="text-[#3b9eff] group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-medium">
                  Launch tool <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
