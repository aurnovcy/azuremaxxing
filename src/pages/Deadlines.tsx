import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, AlertTriangle, ArrowRight, ShieldAlert, CheckCircle, ExternalLink, Calendar } from 'lucide-react';
import { SEO } from '../utils/seo';
import { CountdownTimer } from '../components/CountdownTimer';
import { DEADLINES } from '../data/deadlines';
import { TIPS } from '../data/tips';

export const Deadlines: React.FC = () => {
  const deadlinesSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What happens to Azure reservations on February 1, 2027?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Starting February 1, 2027, reservations for services covered by an Azure savings plan (compute or databases) can no longer be exchanged. Active reservations purchased before that date keep one final exchange.'
        }
      },
      {
        '@type': 'Question',
        name: 'When does Windows Server 2016 extended support end on Azure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Windows Server 2016 reaches end of extended support on January 12, 2027. Workloads require in-place upgrades or monthly pay-as-you-go Extended Security Updates (ESUs) enabled through Azure Arc.'
        }
      }
    ]
  };

  return (
    <div className="w-full pb-20">
      <SEO
        title="Azure FinOps Deadlines: Feb 1, 2027 Cutoff & Windows 2016 EOS"
        description="Plain-English guide to critical Azure cost deadlines: the February 1, 2027 reservation exchange cutoff, January 12, 2027 Windows Server 2016 EOS, and SQL Server 2014 ESU end."
        canonicalPath="/deadlines"
        schema={deadlinesSchema}
      />

      {/* Header */}
      <section className="pt-12 pb-12 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-950/20 text-xs font-mono text-amber-300 mb-4">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Time-Sensitive FinOps Governance</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white">
            Critical Azure Deadlines Calendar
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#a1a1a1] max-w-3xl leading-relaxed">
            Policy, support, and licensing milestones that directly impact Azure unit costs, commitment portfolios, and compliance obligations.
          </p>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-12 space-y-16">
        {/* The Big One: February 1, 2027 Cutoff */}
        <section id="feb-1-2027" className="p-6 sm:p-8 rounded-2xl border-2 border-amber-500/40 bg-[#0d0d0d] relative shadow-[0_0_30px_rgba(245,158,11,0.06)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#1f1f1f]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-semibold text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Highest Priority Deadline · Feb 1, 2027</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                Azure Reservation Exchanges End for Savings-Plan-Covered Services
              </h2>
              <p className="text-sm text-[#a1a1a1] mt-1">
                Announced by Microsoft at the end of July 2026. The biggest commitment policy change in years.
              </p>
            </div>

            <div className="shrink-0 bg-[#080808] p-4 rounded-xl border border-[#222222]">
              <span className="block text-[11px] font-mono text-[#888888] mb-2 uppercase">Time Remaining Until Cutoff</span>
              <CountdownTimer targetDate="2027-02-01T00:00:00Z" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div className="space-y-4 text-sm text-[#d4d4d4] leading-relaxed">
              <h3 className="text-base font-semibold text-white">Plain-English Policy Breakdown</h3>
              <p>
                If an Azure service is covered by an Azure savings plan (such as Compute or Databases), reservations purchased on or after <strong className="text-white">February 1, 2027</strong> cannot be exchanged.
              </p>
              <ul className="space-y-2 list-disc list-inside text-[#a1a1a1]">
                <li><strong className="text-white">Active pre-deadline purchases:</strong> Keep the right to <em>one final exchange</em> after the cutoff.</li>
                <li><strong className="text-white">Cancel-and-repurchase rule:</strong> An exchange is legally a cancellation and new purchase. Whatever you receive from a post-deadline exchange is permanently non-exchangeable!</li>
                <li><strong className="text-white">Renewals count as new purchases:</strong> Any reservation renewing after Feb 1, 2027 is a new, non-exchangeable purchase.</li>
                <li><strong className="text-white">Trade-in remains supported:</strong> Self-service trade-in of compute reservations to compute savings plans and database reservations to database savings plans remains available.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white">Immediate Recommended Actions</h3>
              <div className="space-y-2.5">
                {[
                  'Inventory every active reservation across all subscriptions and enrollments.',
                  'Audit auto-renew settings: disable auto-renew on any reservation whose instance family or region may change.',
                  'Execute pre-deadline exchanges before Feb 1, 2027 for workloads slated to modernize to Cobalt Arm or newer series.',
                  'Reserve your "one final exchange" strictly for a planned, dated migration project.',
                  'Model trade-in to an Azure Savings Plan using our interactive planner.'
                ].map((action, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#080808] border border-[#1f1f1f] text-xs text-[#ededed]">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/calculators/reservation-exchange-planner"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-400 text-black hover:bg-amber-300 font-semibold text-xs transition-colors"
                >
                  <span>Launch Reservation Exchange Planner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/tips/com-02-february-2027-reservation-deadline"
                  className="text-xs text-[#3b9eff] hover:underline"
                >
                  Read Tip COM-02 →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Windows Server 2016 EOS (Jan 12, 2027) */}
        <section id="jan-12-2027" className="p-6 sm:p-8 rounded-2xl border border-[#222222] bg-[#0a0a0a]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#1f1f1f]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-semibold text-[#3b9eff]">
                <Calendar className="w-4 h-4" />
                <span>Operating System Lifecycle · Jan 12, 2027</span>
              </div>
              <h2 className="text-2xl font-bold text-white mt-2">
                Windows Server 2016 End of Extended Support
              </h2>
              <p className="text-sm text-[#a1a1a1] mt-1">
                Regular security patches cease. Workloads require upgrade, modernization, or Arc-enabled ESUs.
              </p>
            </div>

            <div className="shrink-0 bg-[#080808] p-4 rounded-xl border border-[#1f1f1f]">
              <span className="block text-[11px] font-mono text-[#888888] mb-2 uppercase">Time Remaining Until EOS</span>
              <CountdownTimer targetDate="2027-01-12T00:00:00Z" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div className="space-y-3 text-sm text-[#a1a1a1] leading-relaxed">
              <p>
                On January 12, 2027, Microsoft terminates regular security updates for Windows Server 2016. Any un-patched servers become immediate compliance liabilities for SOC 2, HIPAA, and PCI-DSS.
              </p>
              <p>
                <strong className="text-white">Azure Arc monthly billing:</strong> Instead of expensive multi-year annual upfront contracts, organizations can onboard machines to Azure Arc and subscribe to monthly pay-as-you-go ESUs billed through Azure (which also burns down MACC commitments).
              </p>
              <div className="pt-2">
                <Link
                  to="/calculators/esu-vs-upgrade-windows-server-sql-server-2016"
                  className="inline-flex items-center gap-1.5 text-xs text-[#3b9eff] hover:underline font-mono"
                >
                  <span>Model ESU cost vs Upgrade investment →</span>
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs uppercase font-mono tracking-wider text-[#888888]">Related Field Tips</h4>
              {TIPS.filter(t => ['EOS-01', 'EOS-03', 'LIC-01'].includes(t.id)).map(tip => (
                <Link
                  key={tip.id}
                  to={`/tips/${tip.id.toLowerCase()}-${tip.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#080808] hover:bg-[#141414] border border-[#1f1f1f] text-xs text-[#ededed] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#3b9eff] font-semibold">{tip.id}</span>
                    <span>{tip.title}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#888888]" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Other Milestones & Passed Dates */}
        <section className="space-y-6">
          <h3 className="text-xl font-bold text-white tracking-tight">Full Lifecycle Milestones Roadmap</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEADLINES.slice(2).map((item) => (
              <div key={item.id} className="p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#888888]">{item.date.split('T')[0]}</span>
                  {item.status === 'passed' ? (
                    <span className="px-2 py-0.5 rounded bg-red-950/40 border border-red-800/50 text-red-400 text-[10px] uppercase font-semibold">
                      Passed
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-blue-950/40 border border-blue-800/50 text-blue-400 text-[10px] uppercase font-semibold">
                      Upcoming
                    </span>
                  )}
                </div>

                <h4 className="text-base font-semibold text-white">{item.title}</h4>
                <p className="text-xs text-[#a1a1a1] leading-relaxed">{item.summary}</p>

                <div className="pt-2 border-t border-[#1a1a1a] flex items-center justify-between text-xs text-[#888888]">
                  <span>Last verified: {item.lastVerified}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
