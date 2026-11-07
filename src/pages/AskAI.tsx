import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, AlertTriangle, ArrowRight, ShieldCheck, CheckCircle2, Loader2, RefreshCw, FileText } from 'lucide-react';
import { SEO } from '../utils/seo';

interface ActionCard {
  stepNumber: number;
  title: string;
  tipId: string;
  lever: string;
  effort: string;
  impact: string;
  description: string;
  verification: string;
}

interface AdviceResponse {
  headline: string;
  deadlineAlert: string;
  estimatedSavingsPotential: string;
  prioritizedActions: ActionCard[];
  orderOfOperationsWarning?: string;
  disclaimer: string;
}

export const AskAI: React.FC = () => {
  const [monthlySpend, setMonthlySpend] = useState('$50,000 – $250,000 / month');
  const [agreementType, setAgreementType] = useState('Enterprise Agreement (EA)');
  const [topServices, setTopServices] = useState('Azure VMs (D-series), AKS, Azure SQL Database, Log Analytics');
  const [windowsSqlFootprint, setWindowsSqlFootprint] = useState('~40 Windows Server VMs, 12 Azure SQL databases');
  const [reservationsStatus, setReservationsStatus] = useState('Several 3-year VM reservations expiring late 2027');
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AdviceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          monthlySpend,
          agreementType,
          topServices,
          windowsSqlFootprint,
          reservationsStatus,
          prompt: customPrompt,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || json.error || 'Failed to process request');
      }

      setResponse(json.data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An error occurred while connecting to Azure maxxing AI.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSampleScenario = (scenario: 'startup' | 'enterprise') => {
    if (scenario === 'startup') {
      setMonthlySpend('$15,000 / month (Currently covered by startup credits)');
      setAgreementType('Microsoft for Startups Founders Hub');
      setTopServices('Container Apps, Azure OpenAI (GPT-4o), Serverless PostgreSQL, Blob storage');
      setWindowsSqlFootprint('Zero Windows (100% Linux containerized)');
      setReservationsStatus('Zero commitments currently');
      setCustomPrompt('We have $30,000 in credits remaining burning $5k/mo. Need a plan to avoid the credit cliff and optimize OpenAI token usage.');
    } else {
      setMonthlySpend('$450,000 / month');
      setAgreementType('Enterprise Agreement (EA) with $3M 3-year MACC');
      setTopServices('Virtual Machines (v4 series), AKS multi-tenant, SQL Managed Instance, ExpressRoute, Log Analytics');
      setWindowsSqlFootprint('150 Windows Server 2016 VMs, 40 SQL Server Enterprise instances on IaaS');
      setReservationsStatus('30 active 3-year reservations expiring across 2027 and 2028');
      setCustomPrompt('We need to evaluate our risk for the Feb 1, 2027 reservation exchange changes and Windows Server 2016 end of extended support.');
    }
  };

  return (
    <div className="w-full pb-20">
      <SEO
        title="Ask Azure maxxing AI – Custom FinOps Architecture & Advice"
        description="Describe your Azure estate or paste Cost Analysis CSV to receive an AI-powered, prioritized optimization plan grounded in the 9-step Order of Operations."
        canonicalPath="/ask"
        noIndex={true}
      />

      <section className="pt-12 pb-10 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[1050px] mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-xs font-mono text-purple-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#3b9eff]" />
            <span>Server-Side Gemini 3.8 Flash Agent</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white">
            Ask Azure maxxing AI
          </h1>
          <p className="mt-3 text-base text-[#a1a1a1] max-w-2xl leading-relaxed">
            Describe your Azure architecture, agreement type, and footprint—or paste Cost Analysis summary data—to receive a prioritized action plan strictly following the FinOps Order of Operations.
          </p>
        </div>
      </section>

      <div className="max-w-[1050px] mx-auto px-4 sm:px-6 pt-10 space-y-12">
        {/* Scenario Presets */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono text-[#888888]">Load preset scenario:</span>
          <button
            type="button"
            onClick={() => handleLoadSampleScenario('startup')}
            className="px-3 py-1 rounded-lg bg-[#111111] hover:bg-[#1a1a1a] border border-[#222222] text-xs text-[#ededed]"
          >
            Startup Credit Cliff & AI
          </button>
          <button
            type="button"
            onClick={() => handleLoadSampleScenario('enterprise')}
            className="px-3 py-1 rounded-lg bg-[#111111] hover:bg-[#1a1a1a] border border-[#222222] text-xs text-[#ededed]"
          >
            Enterprise EA, MACC & Feb 2027 Deadlines
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl border border-[#222222] bg-[#0a0a0a] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                Monthly Azure Spend Range
              </label>
              <input
                type="text"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-[#111111] border border-[#262626] text-sm text-white"
                placeholder="e.g. $75,000 / month"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                Agreement Type
              </label>
              <select
                value={agreementType}
                onChange={(e) => setAgreementType(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-[#111111] border border-[#262626] text-sm text-white"
              >
                <option value="Enterprise Agreement (EA)">Enterprise Agreement (EA)</option>
                <option value="Microsoft Customer Agreement (MCA)">Microsoft Customer Agreement (MCA)</option>
                <option value="Cloud Solution Provider (CSP)">Cloud Solution Provider (CSP)</option>
                <option value="Pay-As-You-Go">Pay-As-You-Go</option>
                <option value="Microsoft for Startups Founders Hub">Microsoft for Startups Founders Hub</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                Top Services on Azure
              </label>
              <input
                type="text"
                value={topServices}
                onChange={(e) => setTopServices(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-[#111111] border border-[#262626] text-sm text-white"
                placeholder="e.g. VMs, AKS, Cosmos DB, Foundry"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                Windows Server & SQL Server Footprint
              </label>
              <input
                type="text"
                value={windowsSqlFootprint}
                onChange={(e) => setWindowsSqlFootprint(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-[#111111] border border-[#262626] text-sm text-white"
                placeholder="e.g. 50 Windows VMs, 8 Azure SQL databases"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                Existing Commitments & Expiry Horizon
              </label>
              <input
                type="text"
                value={reservationsStatus}
                onChange={(e) => setReservationsStatus(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-[#111111] border border-[#262626] text-sm text-white"
                placeholder="e.g. 3-year compute savings plan expiring Nov 2027"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase text-[#888888] mb-1.5">
                Describe Your Situation, Query, or Paste Cost Analysis CSV Text
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={4}
                className="w-full p-3 rounded-lg bg-[#111111] border border-[#262626] text-sm text-white font-mono placeholder-[#666666] outline-none focus:border-[#3b9eff]"
                placeholder="Describe specific questions, architecture pain points, or paste rows from a Cost Analysis export..."
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-[#666666]">
              Agent grounded on the complete 370-tip azuremaxxing corpus.
            </span>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-[#ededed] transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#3b9eff]" />
                  <span>Synthesizing Strategy...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#3b9eff]" />
                  <span>Generate Prioritized Action Plan</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Error Notification */}
        {error && (
          <div className="p-4 rounded-xl border border-red-500/40 bg-red-950/20 text-red-400 text-xs flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Generated Response Cards */}
        {response && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Executive Summary Banner */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[#262626] bg-[#0d0d0d] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#3b9eff] font-semibold tracking-wider">
                  Executive Optimization Plan
                </span>
                <span className="font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded">
                  Estimated Savings: {response.estimatedSavingsPotential}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white tracking-tight">
                {response.headline}
              </h2>

              {/* Deadline Alert Callout */}
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-mono uppercase font-bold text-amber-300">
                    Deadline Risk Evaluation
                  </h4>
                  <p className="text-xs text-[#d4d4d4] leading-relaxed">
                    {response.deadlineAlert}
                  </p>
                </div>
              </div>

              {response.orderOfOperationsWarning && (
                <div className="p-4 rounded-xl border border-[#3b9eff]/30 bg-[#3b9eff]/10 text-xs text-[#ededed]">
                  <strong className="text-white">Order of Operations Enforcement:</strong> {response.orderOfOperationsWarning}
                </div>
              )}
            </div>

            {/* Prioritized Action Cards */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white tracking-tight">Prioritized Action Sequence</h3>
              <div className="space-y-4">
                {response.prioritizedActions.map((action) => (
                  <div
                    key={action.stepNumber}
                    className="p-6 rounded-2xl border border-[#222222] bg-[#0a0a0a] space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#1a1a1a]">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-md bg-[#161616] font-mono text-xs font-bold text-[#3b9eff] flex items-center justify-center">
                          {action.stepNumber}
                        </span>
                        <h4 className="text-base font-semibold text-white">{action.title}</h4>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="px-2 py-0.5 rounded bg-[#111111] text-[#3b9eff] border border-[#222222] uppercase">
                          {action.lever} lever
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#111111] text-[#888888] border border-[#222222]">
                          {action.effort} effort
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#111111] text-emerald-400 border border-[#222222]">
                          {action.impact} impact
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#d4d4d4] leading-relaxed">
                      {action.description}
                    </p>

                    <div className="p-3 rounded-lg bg-[#0d0d0d] border border-[#1f1f1f] text-xs font-mono text-[#a1a1a1]">
                      <strong className="text-emerald-400">Verification: </strong>
                      {action.verification}
                    </div>

                    {action.tipId && (
                      <div className="pt-2 flex items-center justify-end">
                        <Link
                          to={`/tips?q=${action.tipId}`}
                          className="inline-flex items-center gap-1 text-xs font-mono text-[#3b9eff] hover:underline"
                        >
                          <span>Explore Tip {action.tipId} →</span>
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-4 rounded-xl border border-[#1f1f1f] bg-[#050505] text-[11px] text-[#666666] leading-relaxed font-mono">
              <strong className="text-[#888888]">Legal & Pricing Notice:</strong> {response.disclaimer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
