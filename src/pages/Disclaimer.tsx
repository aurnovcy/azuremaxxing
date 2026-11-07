import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { SEO } from '../utils/seo';

export const Disclaimer: React.FC = () => {
  return (
    <div className="w-full pb-20">
      <SEO
        title="Pricing & Legal Disclaimer – azuremaxxing"
        description="Legal and pricing disclaimer for azuremaxxing. Not affiliated with or endorsed by Microsoft Corporation."
        canonicalPath="/disclaimer"
      />

      <section className="pt-12 pb-10 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[#888888]">Legal & Compliance</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white mt-1">
            Disclaimer & Terms of Reference
          </h1>
          <p className="mt-3 text-base text-[#a1a1a1]">
            Clear statement of editorial independence, pricing mechanics, and trademark notices.
          </p>
        </div>
      </section>

      <div className="max-w-[900px] mx-auto px-4 sm:px-6 pt-10 space-y-8 text-sm text-[#d4d4d4] leading-relaxed">
        <div className="p-6 rounded-2xl border border-amber-500/30 bg-amber-950/15 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <strong className="text-white font-semibold">Not Affiliated with Microsoft:</strong>
            <p className="text-[#a1a1a1]">
              azuremaxxing is an independent, community-driven educational field guide. It is not affiliated with, sponsored by, authorized by, or endorsed by Microsoft Corporation. Microsoft, Microsoft Azure, Windows Server, SQL Server, and related trademarks belong solely to Microsoft Corporation.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white">Pricing Mechanics vs Fixed Dollar Lists</h2>
          <p>
            Azure infrastructure pricing varies continuously based on data center geography, currency exchange rates, agreement type (Enterprise Agreement, Microsoft Customer Agreement, Cloud Solution Provider, or Pay-As-You-Go), and custom commercial terms (such as MACC commitments).
          </p>
          <p>
            azuremaxxing explicitly does not publish a rigid dollar price list. Instead, all calculations, recommendations, and tips describe published relative discounts, mathematical formulas, and pricing mechanics. Users must verify all estimated rates against current Microsoft Learn documentation and their organization's specific Azure price sheet.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white">Research Currency & Review Schedule</h2>
          <p>
            All content, policy rules, and Resource Graph queries are maintained and reviewed quarterly, updated following major industry milestones including Microsoft Ignite, Microsoft Build, and FinOps X.
          </p>
        </div>
      </div>
    </div>
  );
};
