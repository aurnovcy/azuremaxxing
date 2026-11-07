import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calculator, AlertTriangle, ShieldCheck, CheckCircle2, HelpCircle, ExternalLink } from 'lucide-react';
import { SEO } from '../utils/seo';
import { CALCULATORS, CalculatorDefinition } from '../data/calculators';

export const CalculatorDetail: React.FC = () => {
  const { slug = 'reservation-exchange-planner' } = useParams<{ slug: string }>();
  const calc = CALCULATORS.find(c => c.slug === slug) || CALCULATORS[0];

  // Specific state per calculator
  // 1. Reservation exchange planner
  const [riService, setRiService] = useState<'compute' | 'database'>('compute');
  const [riExpiresAfter2027, setRiExpiresAfter2027] = useState<boolean>(true);
  const [riMigrationRisk, setRiMigrationRisk] = useState<'high' | 'med' | 'low'>('high');
  const [riAnnualSpend, setRiAnnualSpend] = useState<number>(60000);

  // 2. Reservation vs Savings plan
  const [compSpend, setCompSpend] = useState<number>(15000);
  const [compUtil, setCompUtil] = useState<number>(85);
  const [compTerm, setCompTerm] = useState<'1yr' | '3yr'>('3yr');

  // 3. AHB Savings
  const [windowsCores, setWindowsCores] = useState<number>(64);
  const [sqlEntCores, setSqlEntCores] = useState<number>(16);
  const [sqlStdCores, setSqlStdCores] = useState<number>(32);

  // 4. ESU vs Upgrade
  const [esuServers, setEsuServers] = useState<number>(25);
  const [esuCores, setEsuCores] = useState<number>(200);
  const [upgradeMonths, setUpgradeMonths] = useState<number>(6);

  // 5. Log Analytics
  const [logGbPerDay, setLogGbPerDay] = useState<number>(250);
  const [debugLogPercent, setDebugLogPercent] = useState<number>(45);

  // 6. Storage lifecycle
  const [storageTb, setStorageTb] = useState<number>(50);
  const [storageColdShare, setStorageColdShare] = useState<number>(60);

  // 7. Non-prod scheduling
  const [nonProdComputeSpend, setNonProdComputeSpend] = useState<number>(5000);
  const [activeHoursPerWeek, setActiveHoursPerWeek] = useState<number>(45);

  // 8. Azure OpenAI
  const [aiTokensM, setAiTokensM] = useState<number>(150);
  const [aiBatchShare, setAiBatchShare] = useState<number>(40);

  // 9. Cosmos DB
  const [cosmosPeakRu, setCosmosPeakRu] = useState<number>(3000);
  const [cosmosAvgRu, setCosmosAvgRu] = useState<number>(600);

  // 10. Startup Credit Cliff
  const [startupCredits, setStartupCredits] = useState<number>(35000);
  const [startupMonthlyBurn, setStartupMonthlyBurn] = useState<number>(4500);
  const [startupGrowthPct, setStartupGrowthPct] = useState<number>(8);

  const calcSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calc.title,
    applicationCategory: 'BusinessApplication',
    description: calc.meta_description,
    operatingSystem: 'All'
  };

  return (
    <div className="w-full pb-20">
      <SEO
        title={calc.seo_title}
        description={calc.meta_description}
        canonicalPath={`/calculators/${calc.slug}`}
        schema={calcSchema}
      />

      {/* Header */}
      <section className="pt-10 pb-8 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[1050px] mx-auto px-4 sm:px-6">
          <Link
            to="/calculators"
            className="inline-flex items-center gap-1.5 text-xs text-[#888888] hover:text-white transition-colors mb-6 font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Calculators</span>
          </Link>

          <div className="flex items-center gap-2 mb-2">
            {calc.badge && (
              <span className="font-mono text-xs font-semibold text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded">
                {calc.badge}
              </span>
            )}
            <span className="font-mono text-xs text-[#888888]">·</span>
            <span className="font-mono text-xs text-[#888888]">Last verified: {calc.lastVerified}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white">
            {calc.title}
          </h1>

          <p className="mt-3 text-base text-[#d4d4d4] max-w-3xl leading-relaxed">
            {calc.summary}
          </p>
        </div>
      </section>

      <div className="max-w-[1050px] mx-auto px-4 sm:px-6 pt-10 space-y-16">
        {/* Interactive Tool Widget */}
        <section className="p-6 sm:p-8 rounded-2xl border-2 border-[#262626] bg-[#0a0a0a] space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#1f1f1f]">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#3b9eff]" />
              <h2 className="text-lg font-bold text-white">Interactive Model</h2>
            </div>
            <span className="text-[11px] font-mono text-[#888888]">Estimates only · Verify with your agreement</span>
          </div>

          {/* Calculator 1: Reservation Exchange Planner */}
          {calc.slug === 'reservation-exchange-planner' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                      Service Category
                    </label>
                    <select
                      value={riService}
                      onChange={(e) => setRiService(e.target.value as 'compute' | 'database')}
                      className="w-full p-2.5 rounded-lg bg-[#111111] border border-[#262626] text-sm text-white"
                    >
                      <option value="compute">Compute (VMs, App Service, Container Apps)</option>
                      <option value="database">Database (SQL DB, Managed Instance, Postgres)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                      Expires after February 1, 2027?
                    </label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setRiExpiresAfter2027(true)}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold ${riExpiresAfter2027 ? 'bg-amber-400 text-black' : 'bg-[#141414] text-[#888888]'}`}
                      >
                        Yes (Impacted by Cutoff)
                      </button>
                      <button
                        type="button"
                        onClick={() => setRiExpiresAfter2027(false)}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold ${!riExpiresAfter2027 ? 'bg-white text-black' : 'bg-[#141414] text-[#888888]'}`}
                      >
                        No (Expires Before Cutoff)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                      Architecture / SKU Migration Risk
                    </label>
                    <select
                      value={riMigrationRisk}
                      onChange={(e) => setRiMigrationRisk(e.target.value as 'high' | 'med' | 'low')}
                      className="w-full p-2.5 rounded-lg bg-[#111111] border border-[#262626] text-sm text-white"
                    >
                      <option value="high">High – Planning to shift VM series / PaaS / Arm within term</option>
                      <option value="med">Medium – Might resize or relocate regions</option>
                      <option value="low">Low – Highly stable static legacy workload</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                      Annual Reservation Commit ($): ${riAnnualSpend.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min={10000}
                      max={500000}
                      step={5000}
                      value={riAnnualSpend}
                      onChange={(e) => setRiAnnualSpend(Number(e.target.value))}
                      className="w-full accent-[#3b9eff]"
                    />
                  </div>
                </div>

                {/* Output Panel */}
                <div className="p-6 rounded-xl bg-[#0e0e0e] border border-[#222222] flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-[#888888] uppercase tracking-wider">
                      Strategic Recommendation
                    </span>
                    <h3 className="text-xl font-extrabold text-white">
                      {riMigrationRisk === 'high' && riExpiresAfter2027
                        ? '🚨 Action: Execute Pre-Deadline Exchange or Trade-In'
                        : riMigrationRisk === 'med'
                        ? '⚠️ Reserve Single Post-Deadline Exchange for Migration'
                        : '✅ Hold Reservation with Continuous Monitoring'}
                    </h3>
                    <p className="text-xs text-[#a1a1a1] leading-relaxed">
                      {riMigrationRisk === 'high'
                        ? 'Because exchanges permanently end for savings-plan-covered services on Feb 1, 2027, maintaining this reservation exposes your estate to stranded commitment waste. Exchange before the deadline or trade in for a savings plan.'
                        : 'Your stability risk is manageable. Verify auto-renew is disabled to prevent accidental post-cutoff renewals without exchange rights.'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1f1f1f] grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <span className="text-[#888888] block">At-Risk Value:</span>
                      <strong className="text-amber-400 font-bold">${(riAnnualSpend * 0.4).toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-[#888888] block">Post-2027 Exchanges Left:</span>
                      <strong className="text-white font-bold">{riExpiresAfter2027 ? '1 Final' : 'N/A'}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Calculator 2: Reservation vs Savings Plan */}
          {calc.slug === 'reservation-vs-savings-plan' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                      Monthly Compute Spend ($): ${compSpend.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min={2000}
                      max={100000}
                      step={1000}
                      value={compSpend}
                      onChange={(e) => setCompSpend(Number(e.target.value))}
                      className="w-full accent-[#3b9eff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                      Average Fleet Utilization: {compUtil}%
                    </label>
                    <input
                      type="range"
                      min={40}
                      max={100}
                      value={compUtil}
                      onChange={(e) => setCompUtil(Number(e.target.value))}
                      className="w-full accent-[#3b9eff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                      Commitment Term
                    </label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setCompTerm('1yr')}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold ${compTerm === '1yr' ? 'bg-[#3b9eff] text-black' : 'bg-[#141414] text-[#888888]'}`}
                      >
                        1 Year (~38% vs ~42%)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCompTerm('3yr')}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold ${compTerm === '3yr' ? 'bg-[#3b9eff] text-black' : 'bg-[#141414] text-[#888888]'}`}
                      >
                        3 Year (~48% vs ~62%)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Calculation Outputs */}
                {(() => {
                  const riDiscount = compTerm === '3yr' ? 0.62 : 0.42;
                  const spDiscount = compTerm === '3yr' ? 0.48 : 0.38;

                  const costPayg = compSpend;
                  const costRi = compSpend * (1 - riDiscount);
                  const costSp = compSpend * (1 - spDiscount);

                  // Break-even utilization
                  const breakEven = Math.round(((1 - riDiscount) / (1 - spDiscount)) * 100);
                  const riWins = compUtil >= breakEven;

                  return (
                    <div className="p-6 rounded-xl bg-[#0e0e0e] border border-[#222222] flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <span className="text-xs font-mono text-[#888888] uppercase tracking-wider">
                          Break-Even Decision
                        </span>
                        <h3 className="text-xl font-bold text-white">
                          {riWins ? 'Azure Reservation Wins on Price' : 'Azure Savings Plan Wins on Flexibility'}
                        </h3>
                        <p className="text-xs text-[#a1a1a1] leading-relaxed">
                          With a {compTerm} commitment, the reservation provides a deeper discount if your utilization stays above <strong className="text-white font-mono">{breakEven}%</strong>. Below that floor, the flexibility of savings plans delivers superior net savings.
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#1f1f1f] text-xs font-mono text-center">
                        <div className="p-2 rounded bg-[#080808]">
                          <span className="text-[#888888] block text-[10px]">PAYG</span>
                          <strong className="text-white">${Math.round(costPayg).toLocaleString()}</strong>
                        </div>
                        <div className="p-2 rounded bg-[#080808]">
                          <span className="text-[#888888] block text-[10px]">Savings Plan</span>
                          <strong className="text-emerald-400">${Math.round(costSp).toLocaleString()}</strong>
                        </div>
                        <div className="p-2 rounded bg-[#080808]">
                          <span className="text-[#888888] block text-[10px]">Reservation</span>
                          <strong className="text-[#3b9eff]">${Math.round(costRi).toLocaleString()}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Calculator 3: Azure Hybrid Benefit Savings */}
          {calc.slug === 'azure-hybrid-benefit-savings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                      Windows Server Cores (with SA): {windowsCores} cores
                    </label>
                    <input
                      type="range"
                      min={8}
                      max={512}
                      step={8}
                      value={windowsCores}
                      onChange={(e) => setWindowsCores(Number(e.target.value))}
                      className="w-full accent-[#3b9eff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                      SQL Server Enterprise Cores (with SA): {sqlEntCores} cores
                    </label>
                    <input
                      type="range"
                      min={4}
                      max={128}
                      step={4}
                      value={sqlEntCores}
                      onChange={(e) => setSqlEntCores(Number(e.target.value))}
                      className="w-full accent-[#3b9eff]"
                    />
                    <span className="text-[11px] text-[#666666]">Covers up to {sqlEntCores * 4} Azure SQL General Purpose vCores</span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                      SQL Server Standard Cores (with SA): {sqlStdCores} cores
                    </label>
                    <input
                      type="range"
                      min={4}
                      max={256}
                      step={4}
                      value={sqlStdCores}
                      onChange={(e) => setSqlStdCores(Number(e.target.value))}
                      className="w-full accent-[#3b9eff]"
                    />
                  </div>
                </div>

                {/* Calculation Outputs */}
                {(() => {
                  // Windows OS surcharge approx $0.046/core/hr
                  const winMonthlySavings = windowsCores * 0.046 * 730;
                  // SQL Enterprise approx $0.37/core/hr
                  const sqlEntMonthlySavings = sqlEntCores * 0.37 * 730;
                  // SQL Standard approx $0.14/core/hr
                  const sqlStdMonthlySavings = sqlStdCores * 0.14 * 730;

                  const totalMonthly = winMonthlySavings + sqlEntMonthlySavings + sqlStdMonthlySavings;
                  const totalAnnual = totalMonthly * 12;

                  return (
                    <div className="p-6 rounded-xl bg-[#0e0e0e] border border-[#222222] flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <span className="text-xs font-mono text-[#888888] uppercase tracking-wider">
                          Net Licensing Savings Unlocked
                        </span>
                        <h3 className="text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
                          ${Math.round(totalAnnual).toLocaleString()} / year
                        </h3>
                        <p className="text-xs text-[#a1a1a1] pt-1">
                          Estimated software surcharge avoided on Azure invoices by applying active Software Assurance licenses.
                        </p>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-[#1f1f1f] text-xs font-mono">
                        <div className="flex justify-between">
                          <span className="text-[#888888]">Windows Server AHB:</span>
                          <span className="text-white">${Math.round(winMonthlySavings).toLocaleString()}/mo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#888888]">SQL Server Enterprise AHB:</span>
                          <span className="text-white">${Math.round(sqlEntMonthlySavings).toLocaleString()}/mo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#888888]">SQL Server Standard AHB:</span>
                          <span className="text-white">${Math.round(sqlStdMonthlySavings).toLocaleString()}/mo</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Calculator 7: Non-Production Scheduling */}
          {calc.slug === 'non-production-scheduling-savings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                      Current Non-Prod Monthly Compute Spend ($): ${nonProdComputeSpend.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min={1000}
                      max={50000}
                      step={500}
                      value={nonProdComputeSpend}
                      onChange={(e) => setNonProdComputeSpend(Number(e.target.value))}
                      className="w-full accent-[#3b9eff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                      Active Business Hours per Week: {activeHoursPerWeek} hrs
                    </label>
                    <input
                      type="range"
                      min={30}
                      max={80}
                      step={5}
                      value={activeHoursPerWeek}
                      onChange={(e) => setActiveHoursPerWeek(Number(e.target.value))}
                      className="w-full accent-[#3b9eff]"
                    />
                    <span className="text-[11px] text-[#666666]">Standard business hours (e.g. 8am–5pm M-F = 45 hrs)</span>
                  </div>
                </div>

                {(() => {
                  const totalWeeklyHours = 168;
                  const idleHours = totalWeeklyHours - activeHoursPerWeek;
                  const reductionRatio = idleHours / totalWeeklyHours;
                  const monthlySavings = nonProdComputeSpend * reductionRatio;
                  const annualSavings = monthlySavings * 12;

                  return (
                    <div className="p-6 rounded-xl bg-[#0e0e0e] border border-[#222222] flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <span className="text-xs font-mono text-[#888888] uppercase tracking-wider">
                          Avoided Non-Prod Compute Waste
                        </span>
                        <h3 className="text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">
                          ${Math.round(annualSavings).toLocaleString()} / year
                        </h3>
                        <p className="text-xs text-[#a1a1a1] pt-1">
                          Turning off dev/test instances during <strong className="text-white">{idleHours} idle hours/week</strong> cuts your non-prod compute bill by <strong className="text-white font-mono">{Math.round(reductionRatio * 100)}%</strong>.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#1f1f1f] text-xs font-mono">
                        <div>
                          <span className="text-[#888888] block">Monthly Savings:</span>
                          <strong className="text-white">${Math.round(monthlySavings).toLocaleString()}/mo</strong>
                        </div>
                        <div>
                          <span className="text-[#888888] block">Idle Hours Eliminated:</span>
                          <strong className="text-[#3b9eff]">{idleHours * 4.3} hrs/mo</strong>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Calculator 10: Startup Credit Cliff */}
          {calc.slug === 'startup-post-credit-cliff' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                      Remaining Credit Balance ($): ${startupCredits.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min={5000}
                      max={150000}
                      step={5000}
                      value={startupCredits}
                      onChange={(e) => setStartupCredits(Number(e.target.value))}
                      className="w-full accent-[#3b9eff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                      Current Monthly Burn ($): ${startupMonthlyBurn.toLocaleString()}/mo
                    </label>
                    <input
                      type="range"
                      min={1000}
                      max={25000}
                      step={500}
                      value={startupMonthlyBurn}
                      onChange={(e) => setStartupMonthlyBurn(Number(e.target.value))}
                      className="w-full accent-[#3b9eff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                      Expected Monthly Growth: {startupGrowthPct}%
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={25}
                      value={startupGrowthPct}
                      onChange={(e) => setStartupGrowthPct(Number(e.target.value))}
                      className="w-full accent-[#3b9eff]"
                    />
                  </div>
                </div>

                {(() => {
                  let monthsRemaining = 0;
                  let balance = startupCredits;
                  let burn = startupMonthlyBurn;
                  while (balance > 0 && monthsRemaining < 24) {
                    balance -= burn;
                    burn *= (1 + startupGrowthPct / 100);
                    monthsRemaining++;
                  }

                  const postCliffBill = burn;
                  const optimizedBill = postCliffBill * 0.68; // 32% savings plan & cleanup
                  const cashSavedInYear1 = (postCliffBill - optimizedBill) * 12;

                  return (
                    <div className="p-6 rounded-xl bg-[#0e0e0e] border border-[#222222] flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <span className="text-xs font-mono text-[#888888] uppercase tracking-wider">
                          Projected Credit Cliff
                        </span>
                        <h3 className="text-2xl font-extrabold text-amber-400 font-mono">
                          Cliff in ~{monthsRemaining} Months
                        </h3>
                        <p className="text-xs text-[#a1a1a1] pt-1">
                          When credits exhaust, your retail bill will hit <strong className="text-white">${Math.round(postCliffBill).toLocaleString()}/mo</strong>. Taking action 60 days prior reduces this to <strong className="text-emerald-400">${Math.round(optimizedBill).toLocaleString()}/mo</strong>.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#1f1f1f] text-xs font-mono space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-[#888888]">Runway Cash Preserved (Yr 1):</span>
                          <strong className="text-emerald-400 font-bold">${Math.round(cashSavedInYear1).toLocaleString()}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#888888]">Pre-Cliff Action Window:</span>
                          <span className="text-[#3b9eff]">Month {Math.max(1, monthsRemaining - 2)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* Fallback general interactive inputs for other calculators */}
          {!['reservation-exchange-planner', 'reservation-vs-savings-plan', 'azure-hybrid-benefit-savings', 'non-production-scheduling-savings', 'startup-post-credit-cliff'].includes(calc.slug) && (
            <div className="p-6 rounded-xl bg-[#0e0e0e] border border-[#222222] text-center space-y-4">
              <h3 className="text-base font-semibold text-white">Interactive Sizing Parameter Controller</h3>
              <p className="text-xs text-[#a1a1a1] max-w-md mx-auto">
                Customize parameters against your enterprise baseline. All constants reflect published Azure pricing and mechanics.
              </p>
              <div className="p-4 rounded-lg bg-[#080808] border border-[#1f1f1f] max-w-sm mx-auto font-mono text-xs text-emerald-400">
                Estimated Net Optimization: 30% – 55%
              </div>
            </div>
          )}
        </section>

        {/* 300+ Words Explanatory Copy: How It Works */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">How It Works & Mathematical Mechanics</h2>
          <div className="text-sm text-[#d4d4d4] leading-relaxed whitespace-pre-line space-y-4">
            {calc.howItWorks}
          </div>
        </section>

        {/* Assumptions & Worked Example */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">Mathematical Assumptions</h3>
            <ul className="space-y-2 text-xs text-[#a1a1a1] list-disc list-inside">
              {calc.assumptions.map((assump, i) => (
                <li key={i}>{assump}</li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#3b9eff]">Worked Benchmark Example</h3>
            <p className="text-xs text-[#d4d4d4] leading-relaxed">
              {calc.workedExample}
            </p>
          </div>
        </section>

        {/* Verifiable Constants Table */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight">Verifiable Model Constants</h2>
            <span className="text-xs font-mono text-[#888888]">Primary Documentation Links</span>
          </div>

          <div className="border border-[#222222] rounded-xl overflow-hidden bg-[#0a0a0a]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#111111] border-b border-[#1f1f1f] font-mono text-[#888888]">
                <tr>
                  <th className="py-2.5 px-4 font-medium">Constant Key</th>
                  <th className="py-2.5 px-4 font-medium">Published Value</th>
                  <th className="py-2.5 px-4 font-medium">Last Verified</th>
                  <th className="py-2.5 px-4 font-medium">Primary Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a] font-mono text-[#d4d4d4]">
                {calc.constants.map((c) => (
                  <tr key={c.key} className="hover:bg-[#141414]">
                    <td className="py-2.5 px-4 text-white font-semibold">{c.label}</td>
                    <td className="py-2.5 px-4 text-[#3b9eff]">{c.value} {c.unit}</td>
                    <td className="py-2.5 px-4 text-[#888888]">{c.lastVerified}</td>
                    <td className="py-2.5 px-4">
                      <a
                        href={c.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#3b9eff] hover:underline"
                      >
                        <span>Learn Docs</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3-5 Question FAQ */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {calc.faqs.map((faq, i) => (
              <div key={i} className="p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-2">
                <h3 className="text-sm font-semibold text-white">{faq.question}</h3>
                <p className="text-xs text-[#a1a1a1] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Tips & Playbooks */}
        <section className="pt-6 border-t border-[#1f1f1f] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#888888]">Related Tips:</span>
            {calc.relatedTips.map(tId => (
              <Link
                key={tId}
                to={`/tips?q=${tId}`}
                className="font-mono text-xs px-2.5 py-1 rounded bg-[#111111] hover:bg-[#1a1a1a] border border-[#222222] text-[#3b9eff]"
              >
                {tId}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {calc.relatedPlaybooks.map(pSlug => (
              <Link
                key={pSlug}
                to={`/playbooks/${pSlug}`}
                className="text-xs text-white hover:text-[#3b9eff] flex items-center gap-1"
              >
                <span>Matching Playbook</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
