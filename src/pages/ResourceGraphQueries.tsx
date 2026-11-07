import React, { useState } from 'react';
import { Terminal, Copy, Check, AlertTriangle, ShieldAlert, ArrowRight, ExternalLink } from 'lucide-react';
import { SEO } from '../utils/seo';
import { RESOURCE_GRAPH_QUERIES } from '../data/queries';
import { CodeBlock } from '../components/CodeBlock';

export const ResourceGraphQueries: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedCli, setCopiedCli] = useState<string | null>(null);

  const categories = [
    { key: 'all', label: 'All Queries' },
    { key: 'disks', label: 'Managed Disks' },
    { key: 'compute', label: 'Virtual Machines' },
    { key: 'networking', label: 'Networking & IPs' },
    { key: 'appservice', label: 'App Service' },
    { key: 'licensing', label: 'AHB Licensing' },
    { key: 'snapshots', label: 'Snapshots' },
    { key: 'governance', label: 'Tags & Governance' },
  ];

  const filteredQueries = selectedCategory === 'all'
    ? RESOURCE_GRAPH_QUERIES
    : RESOURCE_GRAPH_QUERIES.filter(q => q.wasteCategory === selectedCategory);

  const handleCopyCli = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCli(id);
    setTimeout(() => setCopiedCli(null), 2000);
  };

  const queriesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Azure Resource Graph Waste Hunting Queries',
    description: 'Copy-paste KQL queries for unattached disks, stopped VMs, and orphaned IPs across Azure subscriptions.',
    itemListElement: RESOURCE_GRAPH_QUERIES.map((q, i) => ({
      '@type': 'SoftwareSourceCode',
      position: i + 1,
      name: q.title,
      programmingLanguage: 'Kusto',
      text: q.kql
    }))
  };

  return (
    <div className="w-full pb-20">
      <SEO
        title="Azure Resource Graph Waste Hunting Queries (KQL & CLI)"
        description="Copy-paste library of Azure Resource Graph KQL queries to detect unattached disks, stopped VMs, empty App Service plans, and missing AHB across subscriptions."
        canonicalPath="/resource-graph-queries"
        schema={queriesSchema}
      />

      {/* Header */}
      <section className="pt-12 pb-10 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[#3b9eff]">Appendix</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white mt-1">
            Azure Resource Graph Waste-Hunting Queries
          </h1>
          <p className="mt-3 text-base text-[#a1a1a1] max-w-3xl leading-relaxed">
            Run these queries in Azure Resource Graph Explorer or via the Azure CLI to query across all subscriptions in seconds. Zero agent installations required.
          </p>

          {/* Safety Warning Callout */}
          <div className="mt-6 p-4 rounded-xl border border-amber-500/30 bg-amber-950/15 flex items-start gap-3 max-w-3xl">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-[#d4d4d4] leading-relaxed">
              <strong className="text-white">Safety Warning:</strong> Property names can change as Azure resource providers evolve. Always test each query manually before automating deletion scripts, and always take an incremental snapshot or backup export before deleting disks or resources.
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-14 z-20 border-b border-[#1f1f1f] bg-black/95 backdrop-blur-md py-3">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-white text-black font-semibold'
                  : 'bg-[#111111] text-[#a1a1a1] hover:text-white hover:bg-[#1a1a1a] border border-[#222222]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Query Cards */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-10 space-y-12">
        {filteredQueries.map(query => (
          <article
            key={query.id}
            id={query.id}
            className="p-6 rounded-2xl border border-[#222222] bg-[#0a0a0a] space-y-4 scroll-mt-28"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1a1a1a]">
              <div>
                <span className="text-[10px] font-mono text-[#3b9eff] uppercase tracking-wider">
                  Category: {query.wasteCategory}
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5">{query.title}</h2>
              </div>
              <span className="font-mono text-xs text-emerald-400 px-2.5 py-1 rounded bg-[#111111] border border-[#222222] shrink-0">
                Impact: {query.estimatedWasteImpact}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#d4d4d4] leading-relaxed">
              {query.description}
            </p>

            {/* KQL Query Code Block */}
            <CodeBlock code={query.kql} language="kusto" title={query.title} />

            {/* What to do with the results */}
            <div className="p-4 rounded-xl border border-[#1f1f1f] bg-[#0d0d0d] space-y-1.5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#3b9eff] font-semibold">
                What to do with the results:
              </h3>
              <p className="text-xs text-[#a1a1a1] leading-relaxed">
                {query.actionGuidance}
              </p>
            </div>

            {/* CLI Command */}
            <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-[#050505] border border-[#1a1a1a] text-xs font-mono">
              <span className="text-[#888888] truncate">
                {query.cliCommand}
              </span>
              <button
                onClick={() => handleCopyCli(query.id, query.cliCommand)}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#161616] hover:bg-[#222222] text-[#ededed] border border-[#2a2a2a] shrink-0"
              >
                {copiedCli === query.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#888888]" />
                    <span>Copy CLI</span>
                  </>
                )}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
