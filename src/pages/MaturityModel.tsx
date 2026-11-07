import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, CheckCircle2, ArrowRight, Award, Compass } from 'lucide-react';
import { SEO } from '../utils/seo';

export const MaturityModel: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [assessmentResult, setAssessmentResult] = useState<'crawl' | 'walk' | 'run' | null>(null);

  const quizQuestions = [
    {
      q: 'How does your organization export and analyze Azure cost data?',
      options: [
        { label: 'Manual portal inspection and monthly PDF invoices', score: 1 },
        { label: 'Automated daily FOCUS exports in storage queried via Power BI', score: 2 },
        { label: 'FinOps hubs in Azure Data Explorer/Fabric joined with business unit telemetry', score: 3 }
      ]
    },
    {
      q: 'How is cost allocation and tagging enforced across subscriptions?',
      options: [
        { label: 'Ad-hoc tagging with >30% unallocated spend', score: 1 },
        { label: 'Tag inheritance enabled with 80%+ coverage across teams', score: 2 },
        { label: '95%+ allocated including AKS namespaces, shared networking, and chargeback', score: 3 }
      ]
    },
    {
      q: 'What is your approach to compute and database commitments?',
      options: [
        { label: 'Mostly Pay-As-You-Go, occasional uncoordinated 1-yr reservations', score: 1 },
        { label: 'Layered savings plans and reservations covering steady-state baseline', score: 2 },
        { label: 'Algorithmic commitment ladder, centralized SQL AHB, and pre-2027 audit complete', score: 3 }
      ]
    },
    {
      q: 'How are idle resources and rightsizing recommendations handled?',
      options: [
        { label: 'Periodic manual cleanup when bills spike unexpectedly', score: 1 },
        { label: 'Monthly cost reviews with assigned Advisor tickets', score: 2 },
        { label: 'Automated policy-based remediation, Infracost CI/CD checks, and PR cost diffs', score: 3 }
      ]
    },
    {
      q: 'How are budgets and anomaly alerts configured?',
      options: [
        { label: 'Generic threshold emails sent to a central inbox', score: 1 },
        { label: 'Subscription budgets with action groups routing to squad Slack/Teams', score: 2 },
        { label: 'Automated circuit-breakers in sandboxes and unit cost OKRs per team', score: 3 }
      ]
    }
  ];

  const handleSelectAnswer = (qIndex: number, score: number) => {
    setAnswers(prev => ({ ...prev, [qIndex]: score }));
  };

  const handleCalculateScore = () => {
    const scores = Object.values(answers);
    if (scores.length < quizQuestions.length) {
      alert('Please answer all 5 questions to receive your maturity assessment.');
      return;
    }

    const total = scores.reduce((a, b) => a + b, 0);
    if (total <= 7) {
      setAssessmentResult('crawl');
    } else if (total <= 12) {
      setAssessmentResult('walk');
    } else {
      setAssessmentResult('run');
    }
  };

  return (
    <div className="w-full pb-20">
      <SEO
        title="Azure FinOps Maturity Model – Crawl, Walk, Run Self-Assessment"
        description="Benchmark your Azure cost optimization maturity across Visibility, Allocation, Optimization, and Governance with our interactive self-assessment quiz."
        canonicalPath="/maturity-model"
      />

      <section className="pt-12 pb-10 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[#3b9eff]">FinOps Framework 2026</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white mt-1">
            Azure FinOps Maturity Model
          </h1>
          <p className="mt-3 text-base text-[#a1a1a1] max-w-2xl leading-relaxed">
            The progression path from reactive bill shock to automated, unit-economics-driven cloud engineering across the 4 FinOps domains.
          </p>
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-10 space-y-16">
        {/* Interactive Self-Assessment Quiz */}
        <section className="p-6 sm:p-8 rounded-2xl border-2 border-[#262626] bg-[#0a0a0a] space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#3b9eff] uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Diagnostic Assessment</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              Where does your Azure estate sit today?
            </h2>
            <p className="text-xs sm:text-sm text-[#888888] mt-1">
              Answer these 5 questions to benchmark your current operational posture and receive a tailored action plan.
            </p>
          </div>

          <div className="space-y-6">
            {quizQuestions.map((question, qIdx) => (
              <div key={qIdx} className="space-y-3 pb-6 border-b border-[#1a1a1a]">
                <h3 className="text-sm font-semibold text-white">
                  0{qIdx + 1}. {question.q}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {question.options.map((opt, optIdx) => {
                    const isSelected = answers[qIdx] === opt.score;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectAnswer(qIdx, opt.score)}
                        className={`p-3.5 rounded-xl text-left text-xs transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#181818] border-[#3b9eff] text-white shadow-[0_0_15px_rgba(59,158,255,0.15)]'
                            : 'bg-[#111111] border-[#222222] text-[#a1a1a1] hover:bg-[#141414] hover:text-white'
                        }`}
                      >
                        <span className="font-mono text-[10px] text-[#666666] block mb-1">
                          Option {optIdx === 0 ? 'A (Crawl)' : optIdx === 1 ? 'B (Walk)' : 'C (Run)'}
                        </span>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <button
              onClick={handleCalculateScore}
              className="px-6 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-[#ededed] transition-colors"
            >
              Calculate Maturity Stage
            </button>

            {assessmentResult && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#888888]">Your Result:</span>
                <span className="font-mono text-sm font-bold text-[#3b9eff] uppercase px-3 py-1 rounded bg-[#3b9eff]/10 border border-[#3b9eff]/30">
                  {assessmentResult} Stage
                </span>
              </div>
            )}
          </div>

          {/* Result Action Callout */}
          {assessmentResult && (
            <div className="p-6 rounded-xl bg-[#0e0e0e] border border-[#222222] space-y-4 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-[#3b9eff]" />
                <span>
                  {assessmentResult === 'crawl' && 'Priority: Establish Guardrails & Basic Visibility'}
                  {assessmentResult === 'walk' && 'Priority: Scale Allocation & Layered Commitments'}
                  {assessmentResult === 'run' && 'Priority: Unit Economics & Shift-Left CI/CD'}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-[#a1a1a1] leading-relaxed">
                {assessmentResult === 'crawl' &&
                  'Your environment is currently exposed to accidental bill shocks. Focus on setting subscription budgets with action groups, turning on FOCUS daily exports, and executing Resource Graph orphan cleanup.'}
                {assessmentResult === 'walk' &&
                  'You have strong fundamentals. Your next inflection point is deploying FinOps hubs, centralizing SQL AHB management, adopting Cobalt Arm, and preparing for the Feb 1, 2027 reservation exchange cutoff.'}
                {assessmentResult === 'run' &&
                  'You run an elite FinOps operation! Keep momentum by driving Infracost PR cost diffs, AI prompt caching, unit economics showback, and full MACC burndown.'}
              </p>
              <div className="flex items-center gap-4 pt-2">
                <Link
                  to={
                    assessmentResult === 'crawl'
                      ? '/playbooks/startup-30-day-plan'
                      : assessmentResult === 'walk'
                      ? '/playbooks/scale-up-90-day-program'
                      : '/playbooks/enterprise-12-month-program'
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3b9eff] hover:underline"
                >
                  <span>Launch matching playbook →</span>
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Crawl / Walk / Run Reference Table */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Maturity Table at a Glance</h2>

          <div className="border border-[#222222] rounded-2xl overflow-hidden bg-[#0a0a0a]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#111111] border-b border-[#1f1f1f] font-mono text-[#888888]">
                <tr>
                  <th className="py-3.5 px-4 font-semibold text-white">Stage</th>
                  <th className="py-3.5 px-4 font-semibold text-white">Visibility</th>
                  <th className="py-3.5 px-4 font-semibold text-white">Allocation</th>
                  <th className="py-3.5 px-4 font-semibold text-white">Optimization</th>
                  <th className="py-3.5 px-4 font-semibold text-white">Governance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a] text-[#d4d4d4] leading-relaxed">
                <tr className="hover:bg-[#141414]">
                  <td className="py-4 px-4 font-mono font-bold text-[#888888]">Crawl</td>
                  <td className="py-4 px-4">Cost analysis, budgets, Advisor</td>
                  <td className="py-4 px-4">Subscription per environment</td>
                  <td className="py-4 px-4">Delete orphans, auto-shutdown, AHB on obvious VMs</td>
                  <td className="py-4 px-4">Budget alerts to email</td>
                </tr>
                <tr className="hover:bg-[#141414] bg-[#0c0c0c]">
                  <td className="py-4 px-4 font-mono font-bold text-[#3b9eff]">Walk</td>
                  <td className="py-4 px-4">FOCUS exports, Power BI / FinOps toolkit reports</td>
                  <td className="py-4 px-4">Tag policy with inheritance, 80%+ tagged, allocation rules</td>
                  <td className="py-4 px-4">Rightsizing, Spot, scheduling, layered savings plans & reservations</td>
                  <td className="py-4 px-4">Anomaly alerts, Azure Policy guardrails, monthly reviews</td>
                </tr>
                <tr className="hover:bg-[#141414]">
                  <td className="py-4 px-4 font-mono font-bold text-emerald-400">Run</td>
                  <td className="py-4 px-4">FinOps hubs, unit economics, ARM MCP / Copilot for engineers</td>
                  <td className="py-4 px-4">95%+ allocated incl. AKS namespaces and shared services</td>
                  <td className="py-4 px-4">Automated remediation, architecture modernization, AI cost controls</td>
                  <td className="py-4 px-4">Policy-as-code in CI, efficiency targets in OKRs, chargeback</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
