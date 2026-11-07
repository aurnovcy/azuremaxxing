import React from 'react';
import { ExternalLink, BookOpen, ShieldCheck } from 'lucide-react';
import { SEO } from '../utils/seo';

export const Sources: React.FC = () => {
  const microsoftSources = [
    {
      title: 'Reservation exchanges for Azure services covered by savings plans end starting Feb. 1, 2027',
      publisher: 'Microsoft FinOps Blog (July 30, 2026)',
      url: 'https://techcommunity.microsoft.com/t5/finops-blog/reservation-exchanges-for-azure-services-covered-by-savings/ba-p/4542437',
      annotation: 'Primary source establishing the February 1, 2027 reservation exchange policy change and single-exchange grandfathering rule.'
    },
    {
      title: 'Azure Reserved VM Instances Pricing & Exchange Policy',
      publisher: 'Microsoft Azure Official Pricing',
      url: 'https://azure.microsoft.com/pricing/reserved-vm-instances',
      annotation: 'Official documentation detailing instance size flexibility, cancellation refund caps, and exchange procedures.'
    },
    {
      title: 'Self-service trade-in for Azure savings plans',
      publisher: 'Microsoft Learn',
      url: 'https://learn.microsoft.com/azure/cost-management-billing/savings-plan/reservation-trade-in',
      annotation: 'Defines rules for converting compute and database reservations into savings plans.'
    },
    {
      title: 'Azure Savings Plan for Databases Overview',
      publisher: 'Microsoft Learn (March 2026)',
      url: 'https://learn.microsoft.com/azure/cost-management-billing/savings-plan/savings-plan-overview',
      annotation: 'Details service eligibility across SQL Database, Managed Instance, PostgreSQL, MySQL, and Cosmos DB throughput.'
    },
    {
      title: 'Management-group-scoped savings plan and reservation recommendations',
      publisher: 'Microsoft FinOps News (September 2026)',
      url: 'https://techcommunity.microsoft.com/blog/finopsblog/microsoft-finops-news---september-2026/4561596',
      annotation: 'Official release notes for management-group-level commitment recommendations.'
    },
    {
      title: 'Cost Management and Pricing toolsets in Azure Resource Manager MCP Server',
      publisher: 'Microsoft FinOps Blog (June 2026)',
      url: 'https://techcommunity.microsoft.com/blog/finopsblog/introducing-cost-management-and-pricing-toolsets-in-azure-resource-manager-mcp-s/4530710',
      annotation: 'Documentation on agentic cost tooling and Model Context Protocol integrations for developer IDEs.'
    },
    {
      title: 'FinOps Toolkit 13 & 14 Releases (Parquet & Recommendations Pipeline)',
      publisher: 'Microsoft FinOps Toolkit GitHub',
      url: 'https://techcommunity.microsoft.com/blog/finopsblog/whats-new-in-finops-toolkit-14-%E2%80%93-april-2026/4519497',
      annotation: 'Open-source documentation on FinOps hubs, FOCUS Parquet exports, and Copilot Studio agent templates.'
    },
    {
      title: 'Extended Security Updates (ESU) for Windows Server and SQL Server',
      publisher: 'Microsoft Commercial Licensing',
      url: 'https://www.microsoft.com/windows-server/extended-security-updates',
      annotation: 'Official timeline and pricing mechanics for Windows Server 2016 and SQL Server 2016 ESUs via Azure Arc.'
    }
  ];

  const communitySources = [
    {
      title: 'FinOps Framework 2026',
      publisher: 'FinOps Foundation',
      url: 'https://www.finops.org/insights/2026-finops-framework/',
      annotation: 'Defines the core capability domains: Executive Strategy Alignment, Usage Optimization, and FOCUS integration.'
    },
    {
      title: 'FOCUS 1.4 Specification Ratification',
      publisher: 'FinOps Foundation (June 2026)',
      url: 'https://www.finops.org/insights/2026-finops-framework/',
      annotation: 'Normative specification for cloud billing and usage data normalization.'
    }
  ];

  return (
    <div className="w-full pb-20">
      <SEO
        title="Primary Sources & Citations – Azure maxxing"
        description="Official Microsoft Learn, Tech Community, and FinOps Foundation primary sources cited throughout the Azure maxxing field guide."
        canonicalPath="/sources"
      />

      <section className="pt-12 pb-10 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[#3b9eff]">Editorial Rigor</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white mt-1">
            Primary Sources & Documentation
          </h1>
          <p className="mt-3 text-base text-[#a1a1a1] max-w-2xl leading-relaxed">
            Every optimization claim, date, and policy mechanic in azuremaxxing is verified against primary Microsoft and FinOps Foundation sources.
          </p>
        </div>
      </section>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 pt-10 space-y-12">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#3b9eff]" />
            <span>Microsoft Primary Documentation</span>
          </h2>
          <div className="space-y-3">
            {microsoftSources.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] hover:border-[#3b9eff]/50 hover:bg-[#0e0e0e] transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-[#888888] font-mono mb-1">
                  <span>{s.publisher}</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:text-white" />
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-[#3b9eff] transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-[#a1a1a1] mt-1.5 leading-relaxed">
                  {s.annotation}
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span>FinOps Foundation Normative Sources</span>
          </h2>
          <div className="space-y-3">
            {communitySources.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 rounded-xl border border-[#222222] bg-[#0a0a0a] hover:border-[#3b9eff]/50 hover:bg-[#0e0e0e] transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-[#888888] font-mono mb-1">
                  <span>{s.publisher}</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:text-white" />
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-[#3b9eff] transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-[#a1a1a1] mt-1.5 leading-relaxed">
                  {s.annotation}
                </p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
