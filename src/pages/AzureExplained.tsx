import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, ShieldCheck, Database, Server, GitMerge } from 'lucide-react';
import { SEO } from '../utils/seo';

export const AzureExplained: React.FC = () => {
  return (
    <div className="w-full pb-20">
      <SEO
        title="How Azure is Shaped: Hierarchy, Agreements & Discount Stacking"
        description="Explainer on how Azure billing and resource structures work: Management Groups, Subscriptions, EA vs MCA agreements, and exact discount stacking order."
        canonicalPath="/azure-explained"
      />

      <section className="pt-12 pb-10 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[#3b9eff]">Foundations</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white mt-1">
            How Azure is Shaped
          </h1>
          <p className="mt-3 text-base text-[#a1a1a1] max-w-2xl leading-relaxed">
            Understanding the resource hierarchy, agreement scopes, and exact discount stacking order is prerequisite to designing scalable FinOps systems.
          </p>
        </div>
      </section>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 pt-10 space-y-16">
        {/* Hierarchy Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">01. The Resource Hierarchy</h2>
          <p className="text-sm text-[#d4d4d4] leading-relaxed">
            Azure organizes all cloud resources into a strict 5-layer parent-child hierarchy:
          </p>

          <div className="p-6 rounded-2xl border border-[#222222] bg-[#0a0a0a] space-y-4 font-mono text-xs">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#111111] border border-[#1f1f1f]">
              <span className="text-[#3b9eff] font-bold">1. Azure Tenant:</span>
              <span className="text-[#a1a1a1]">Root identity and Microsoft Entra boundary for all organizational users and apps.</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#111111] border border-[#1f1f1f] ml-4">
              <span className="text-[#3b9eff] font-bold">2. Management Groups:</span>
              <span className="text-[#a1a1a1]">Tree hierarchy that carries Azure Policy guardrails, RBAC, and commitment recommendations.</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#111111] border border-[#1f1f1f] ml-8">
              <span className="text-emerald-400 font-bold">3. Subscriptions:</span>
              <span className="text-[#a1a1a1]">The primary billing, quota, and budget boundary. Best practice: 1 subscription per workload per environment.</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#111111] border border-[#1f1f1f] ml-12">
              <span className="text-amber-400 font-bold">4. Resource Groups:</span>
              <span className="text-[#a1a1a1]">The operational lifecycle unit. Everything that lives and dies together goes into one resource group.</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#111111] border border-[#1f1f1f] ml-16">
              <span className="text-purple-400 font-bold">5. Resources:</span>
              <span className="text-[#a1a1a1]">Individual VMs, Disks, SQL DBs, App Service plans, and VNet components.</span>
            </div>
          </div>
        </section>

        {/* Commercial Agreements Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">02. Billing Accounts Differ by Agreement</h2>
          <p className="text-sm text-[#d4d4d4] leading-relaxed">
            Your commercial contract shapes which Cost Management APIs, scopes, exports, and invoicing features are accessible:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-2">
              <h3 className="text-base font-semibold text-white">Enterprise Agreement (EA)</h3>
              <p className="text-xs text-[#a1a1a1] leading-relaxed">
                Structured into Enrollment accounts, Departments, and Accounts. Typically negotiated for 3-year commitments with custom Monetary Commitment (upfront or quarterly).
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-2">
              <h3 className="text-base font-semibold text-white">Microsoft Customer Agreement (MCA)</h3>
              <p className="text-xs text-[#a1a1a1] leading-relaxed">
                Modern enterprise structure organized into Billing Accounts, Billing Profiles (payment methods), and Invoice Sections (cost center departmental splits).
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-2">
              <h3 className="text-base font-semibold text-white">Cloud Solution Provider (CSP)</h3>
              <p className="text-xs text-[#a1a1a1] leading-relaxed">
                Partner-managed tenants. Partner must enable Cost Management visibility for customer tenant readers to access native cost reporting.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] space-y-2">
              <h3 className="text-base font-semibold text-white">Pay-As-You-Go / Microsoft for Startups</h3>
              <p className="text-xs text-[#a1a1a1] leading-relaxed">
                Direct credit-card or sponsored promotional offer. Lacks centralized department hierarchies but supports full FOCUS daily exports and budgets.
              </p>
            </div>
          </div>
        </section>

        {/* Discount Stacking Order Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">03. The Exact Discount Stacking Order</h2>
          <p className="text-sm text-[#d4d4d4] leading-relaxed">
            Azure discounts do NOT apply arbitrarily. They calculate in a strict, predictable mathematical sequence:
          </p>

          <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/15 space-y-4">
            <ol className="space-y-3 font-mono text-xs text-[#ededed]">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded bg-[#161616] font-bold text-emerald-400 flex items-center justify-center shrink-0">1</span>
                <div>
                  <strong className="text-white">Azure Hybrid Benefit (AHB):</strong> Strips away the Windows Server and SQL Server software licensing surcharge first.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded bg-[#161616] font-bold text-emerald-400 flex items-center justify-center shrink-0">2</span>
                <div>
                  <strong className="text-white">Azure Reservations:</strong> Applies specific 1- or 3-year reservation discounts to the remaining base compute usage.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded bg-[#161616] font-bold text-emerald-400 flex items-center justify-center shrink-0">3</span>
                <div>
                  <strong className="text-white">Azure Savings Plans:</strong> If any eligible hourly spend remains unabsorbed by reservations, the savings plan covers it.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded bg-[#161616] font-bold text-emerald-400 flex items-center justify-center shrink-0">4</span>
                <div>
                  <strong className="text-white">MACC & Negotiated Discounts:</strong> Enterprise price-sheet discounts and custom contractual adjustments apply to the net remaining cost.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded bg-[#161616] font-bold text-emerald-400 flex items-center justify-center shrink-0">5</span>
                <div>
                  <strong className="text-white">Credits:</strong> Promotional or Monetary Commitment credits draw down the final invoiced total.
                </div>
              </li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};
