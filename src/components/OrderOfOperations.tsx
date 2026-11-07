import React, { useState } from 'react';
import { ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StepDetail {
  number: number;
  label: string;
  tagline: string;
  description: string;
  keyTools: string;
  sampleTipId: string;
  sampleTipTitle: string;
  sampleTipUrl: string;
}

const STEPS: StepDetail[] = [
  {
    number: 1,
    label: 'See it',
    tagline: 'Visibility & Ingestion',
    description: 'Set up daily FOCUS exports, Cost Management smart views, and Advisor workbooks. You cannot optimize what you do not measure in amortized dollars.',
    keyTools: 'FOCUS Parquet exports, FinOps hubs, Advisor Cost Workbook',
    sampleTipId: 'VIS-01',
    sampleTipTitle: 'Turn on daily FOCUS exports on day one',
    sampleTipUrl: '/tips/vis-01-turn-on-focus-exports-on-day-one'
  },
  {
    number: 2,
    label: 'Own it',
    tagline: 'Hierarchy & Attribution',
    description: 'Establish a business-aligned management group hierarchy and subscription vending. Turn on tag inheritance so costs flow to squad cost centers.',
    keyTools: 'Management Groups, Subscription Vending, Tag Inheritance, Cost Allocation Rules',
    sampleTipId: 'TAG-02',
    sampleTipTitle: 'Enable Tag Inheritance in Cost Management',
    sampleTipUrl: '/tips/tag-02-enable-tag-inheritance-cost-management'
  },
  {
    number: 3,
    label: 'Delete it',
    tagline: 'Orphan Cleanup',
    description: 'Sweep zombie resources that bill 100% capacity with zero workload value: unattached managed disks, unassociated IPs, empty server farms, and idle gateways.',
    keyTools: 'Azure Resource Graph Waste Queries, az disk delete',
    sampleTipId: 'DSK-01',
    sampleTipTitle: 'Delete unattached managed disks immediately',
    sampleTipUrl: '/tips/dsk-01-delete-unattached-managed-disks'
  },
  {
    number: 4,
    label: 'Shrink it',
    tagline: 'Rightsizing & Modernization',
    description: 'Collect OS memory metrics and rightsize over-provisioned VMs, AKS node pools, and databases. Modernize to Cobalt 100 Arm and newer series.',
    keyTools: 'Azure Monitor VM Insights (Memory), Karpenter (NAP), Cobalt Arm v6',
    sampleTipId: 'VM-08',
    sampleTipTitle: 'Evaluate Arm-based Cobalt VMs for 40% price-performance',
    sampleTipUrl: '/tips/vm-08-evaluate-arm-cobalt-vms'
  },
  {
    number: 5,
    label: 'License it',
    tagline: 'Signature Azure Lever',
    description: 'Apply Azure Hybrid Benefit (AHB) for Windows and SQL Server. Use Dev/Test offers for non-prod and right-size SQL Server editions.',
    keyTools: 'Azure Hybrid Benefit, Enterprise Dev/Test Offers, Centralized SQL AHB',
    sampleTipId: 'LIC-01',
    sampleTipTitle: 'Apply Azure Hybrid Benefit to every eligible Windows VM',
    sampleTipUrl: '/tips/lic-01-apply-azure-hybrid-benefit-windows-vm'
  },
  {
    number: 6,
    label: 'Schedule it',
    tagline: 'Non-Production Auto-Stop',
    description: 'Dev and test environments are idle 128 out of 168 hours each week. Schedule auto-shutdown on VMs, stop dev AKS clusters, and use serverless auto-pause.',
    keyTools: 'Start/Stop VMs v2, az aks stop, SQL Serverless Auto-Pause',
    sampleTipId: 'DB-01',
    sampleTipTitle: 'Use Azure SQL serverless with auto-pause for dev',
    sampleTipUrl: '/tips/db-01-azure-sql-serverless-auto-pause'
  },
  {
    number: 7,
    label: 'Commit to it',
    tagline: 'Savings Plans & Reservations',
    description: 'Commit strictly to the lean, rightsized baseline! Mind the Feb 1, 2027 reservation exchange deadline and layer savings plans for flexible workloads.',
    keyTools: 'Azure Compute Savings Plans, Database Savings Plans, Reserved Instances',
    sampleTipId: 'COM-02',
    sampleTipTitle: 'Treat February 1, 2027 as a planning deadline',
    sampleTipUrl: '/tips/com-02-february-2027-reservation-deadline'
  },
  {
    number: 8,
    label: 'Re-architect it',
    tagline: 'Architectural Efficiency',
    description: 'Implement blob lifecycle policies, optimize egress with Front Door, filter VNet flow logs, and leverage AI prompt caching and Global Batch.',
    keyTools: 'Storage Lifecycle Rules, Front Door, Global Batch, Prompt Caching',
    sampleTipId: 'AI-03',
    sampleTipTitle: 'Structure prompts to maximize Prompt Caching discounts',
    sampleTipUrl: '/tips/ai-03-use-prompt-caching-for-models'
  },
  {
    number: 9,
    label: 'Govern it',
    tagline: 'Guardrails & Shift-Left',
    description: 'Establish subscription budgets with automated action groups, anomaly alerts, Infracost CI/CD PR checks, and team showback scorecards.',
    keyTools: 'Cost Budgets, Infracost, Anomaly Alerts, Team Scorecards (D17)',
    sampleTipId: 'GOV-01',
    sampleTipTitle: 'Create a budget with Action Group on every subscription',
    sampleTipUrl: '/tips/gov-01-create-budget-action-group-on-every-subscription'
  }
];

export const OrderOfOperations: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(7); // Default highlighted on Commit to it
  const selected = STEPS[activeStep - 1];

  return (
    <div className="w-full my-8">
      {/* Signature Alert Callout */}
      <div className="relative overflow-hidden rounded-xl border border-amber-500/30 bg-amber-950/15 p-4 sm:p-5 mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-white tracking-tight">
              FinOps Rule #1: Commit AFTER you shrink.
            </h4>
            <p className="text-xs sm:text-sm text-[#d4d4d4] leading-relaxed">
              With reservation exchanges disappearing for most compute and database reservations on{' '}
              <strong className="text-amber-300 font-mono">February 1, 2027</strong>, buying commitments against oversized or zombie resources is riskier on Azure than it has ever been. Delete orphans, rightsize instances, and schedule non-production <span className="underline decoration-amber-400/50">before</span> you sign commitments.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Stepper */}
      <div className="overflow-x-auto pb-4 scrollbar-thin">
        <div className="flex items-center gap-1.5 min-w-[880px] p-1.5 bg-[#0a0a0a] border border-[#222222] rounded-xl">
          {STEPS.map((step) => {
            const isActive = step.number === activeStep;
            const isPrior = step.number < activeStep;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(step.number)}
                className={`flex-1 flex flex-col items-center py-2.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#181818] border border-[#3b9eff] shadow-[0_0_15px_rgba(59,158,255,0.15)] text-white'
                    : 'hover:bg-[#141414] border border-transparent text-[#a1a1a1]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={`w-5 h-5 rounded-full text-[11px] font-mono flex items-center justify-center font-bold ${
                      isActive
                        ? 'bg-[#3b9eff] text-black'
                        : isPrior
                        ? 'bg-[#222222] text-[#888888]'
                        : 'bg-[#1a1a1a] text-[#666666]'
                    }`}
                  >
                    {step.number}
                  </span>
                  <span className={`text-xs font-semibold whitespace-nowrap ${isActive ? 'text-white' : 'text-[#d4d4d4]'}`}>
                    {step.label}
                  </span>
                </div>
                <span className="text-[10px] text-[#737373] truncate max-w-[85px]">
                  {step.tagline}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Details Drawer */}
      <div className="mt-4 p-5 rounded-xl border border-[#222222] bg-[#0d0d0d] relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#3b9eff]/10 border border-[#3b9eff]/30 font-mono text-sm font-bold text-[#3b9eff] flex items-center justify-center">
              0{selected.number}
            </span>
            <div>
              <h3 className="text-base font-semibold text-white">
                Step {selected.number}: {selected.label} — <span className="text-[#3b9eff]">{selected.tagline}</span>
              </h3>
              <p className="text-xs text-[#888888]">Order of Operations Phase {selected.number} of 9</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#888888]">Featured Tip:</span>
            <Link
              to={selected.sampleTipUrl}
              className="inline-flex items-center gap-1 text-xs font-mono font-medium text-[#3b9eff] hover:underline"
            >
              <span>{selected.sampleTipId}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="md:col-span-2 space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-mono text-[#888888]">Operating Guidance</h4>
            <p className="text-sm text-[#d4d4d4] leading-relaxed">
              {selected.description}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-mono text-[#888888]">Primary Tooling</h4>
            <div className="p-3 rounded-lg bg-[#080808] border border-[#1f1f1f] text-xs font-mono text-[#a1a1a1] space-y-1">
              {selected.keyTools.split(', ').map((tool, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3b9eff] shrink-0" />
                  <span>{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
