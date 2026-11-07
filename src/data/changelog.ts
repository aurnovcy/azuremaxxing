import { ChangelogItem } from '../types';

export const CHANGELOG_ITEMS: ChangelogItem[] = [
  {
    id: 'vnet-flow-log-filtering',
    date: '2026-10-29',
    title: 'VNet Flow Log Filtering Generally Available',
    tag: 'Networking & Observability',
    summary: 'Filtering by IP, port, protocol, and direction becomes Generally Available, letting teams drop health-check noise and intra-subnet chatter before ingestion into Log Analytics.',
    impact: 'Cuts network observability ingestion costs by 40% to 70% in high-traffic spoke VNets.',
    isPreview: false,
    links: [
      { label: 'Network Watcher Docs', url: 'https://learn.microsoft.com/azure/network-watcher/vnet-flow-logs-overview' }
    ]
  },
  {
    id: 'foundry-claude-attribution',
    date: '2026-10-15',
    title: 'Claude Model Spend & Cost Attribution in Microsoft Foundry',
    tag: 'AI & Microsoft Foundry',
    summary: 'Microsoft Foundry integrates Claude model usage directly into Azure Cost Management with full resource tagging and subscription attribution alongside OpenAI models.',
    impact: 'Enables unified enterprise FinOps reporting and showback across multi-vendor foundation models.',
    isPreview: false,
    links: [
      { label: 'FinOps for AI Announcement', url: 'https://techcommunity.microsoft.com/blog/ai-finops-blog/new-finops-for-ai-capabilities-control-spend-measure-value-and-optimize-for-impa/4559660' }
    ]
  },
  {
    id: 'copilot-cost-management-preview',
    date: '2026-09-25',
    title: 'Microsoft 365 Copilot Cost Management & Spending Policies',
    tag: 'AI & Governance',
    summary: 'Introduces spending policies, group-level limits, user spending alerts, model-family access controls, and a Microsoft Graph API for automated Copilot governance.',
    impact: 'Allows FinOps practitioners to govern usage-based Copilot consumption alongside Azure infrastructure.',
    isPreview: true,
    links: [
      { label: 'Copilot FinOps Update', url: 'https://techcommunity.microsoft.com/blog/ai-finops-blog/new-finops-for-ai-capabilities-control-spend-measure-value-and-optimize-for-impa/4559660' }
    ]
  },
  {
    id: 'mg-scoped-commitments',
    date: '2026-09-15',
    title: 'Management-Group-Scoped Savings Plan & Reservation Recommendations',
    tag: 'Commitments',
    summary: 'Evaluate commitment discount opportunities across an entire management group hierarchy in a unified view, rather than subscription by subscription.',
    impact: 'Dramatically simplifies commitment sizing for complex multi-subscription enterprise landing zones.',
    isPreview: false,
    links: [
      { label: 'Microsoft FinOps News', url: 'https://techcommunity.microsoft.com/blog/finopsblog/microsoft-finops-news---september-2026/4561596' }
    ]
  },
  {
    id: 'reservation-exchange-deadline-announced',
    date: '2026-07-30',
    title: 'Reservation Exchange Policy Cutoff Announced for February 1, 2027',
    tag: 'Commitments',
    summary: 'Microsoft announces that starting February 1, 2027, reservations for services covered by savings plans will permanently lose exchange rights. Existing reservations keep one final exchange.',
    impact: 'The single most significant Azure commitment strategy shift in years. Mandates immediate portfolio review.',
    isPreview: false,
    links: [
      { label: 'Official Microsoft FinOps Blog Post', url: 'https://techcommunity.microsoft.com/t5/finops-blog/reservation-exchanges-for-azure-services-covered-by-savings/ba-p/4542437' }
    ]
  },
  {
    id: 'arm-mcp-server-cost-toolsets',
    date: '2026-06-20',
    title: 'Cost Management & Pricing Toolsets in Azure ARM MCP Server',
    tag: 'Agentic FinOps',
    summary: 'Introduced at FinOps X 2026: The Azure Resource Manager Model Context Protocol (MCP) server enables AI developer agents and IDEs to query cost, pricing, budgets, and optimization recommendations directly.',
    impact: 'Enables real-time cost estimation and architectural trade-off analysis directly in developer coding workflows.',
    isPreview: false,
    links: [
      { label: 'ARM MCP Server Announcement', url: 'https://techcommunity.microsoft.com/blog/finopsblog/introducing-cost-management-and-pricing-toolsets-in-azure-resource-manager-mcp-s/4530710' }
    ]
  },
  {
    id: 'focus-14-ratification',
    date: '2026-06-15',
    title: 'FinOps Foundation Ratifies FOCUS 1.4 Specification',
    tag: 'Data & Reporting',
    summary: 'FOCUS 1.4 expands invoice reconciliation and provides deeper commitment dataset normalization. Azure exports continue leading native cloud adoption.',
    impact: 'Improves cross-cloud normalized billing and multi-cloud financial reporting.',
    isPreview: false,
    links: [
      { label: 'FinOps Foundation FOCUS', url: 'https://www.finops.org/insights/2026-finops-framework/' }
    ]
  },
  {
    id: 'finops-toolkit-14',
    date: '2026-04-18',
    title: 'FinOps Toolkit 14: Recommendations Pipeline & Copilot Studio Agent',
    tag: 'Tooling & Open Source',
    summary: 'FinOps hubs ingests Azure Advisor cost recommendations alongside a built-in catalog of Resource Graph waste queries and introduces a Copilot Studio agent template for Microsoft 365.',
    impact: 'Unifies Advisor recommendations with custom waste hunting scripts into an automated ticket pipeline.',
    isPreview: false,
    links: [
      { label: 'FinOps Toolkit 14 Release Notes', url: 'https://techcommunity.microsoft.com/blog/finopsblog/whats-new-in-finops-toolkit-14-%E2%80%93-april-2026/4519497' }
    ]
  },
  {
    id: 'savings-plan-databases',
    date: '2026-03-12',
    title: 'Azure Savings Plan for Databases Generally Available',
    tag: 'Databases & Commitments',
    summary: 'A spend-based, 1-year commitment floating across Azure SQL Database (including serverless and Hyperscale), SQL Managed Instance, PostgreSQL, MySQL, and Cosmos DB provisioned throughput.',
    impact: 'Brings savings plan flexibility to database estates that were previously locked to rigid single-region reservations.',
    isPreview: false,
    links: [
      { label: 'Savings Plan Overview', url: 'https://learn.microsoft.com/azure/cost-management-billing/savings-plan/savings-plan-overview' }
    ]
  },
  {
    id: 'finops-toolkit-13',
    date: '2026-01-20',
    title: 'FinOps Toolkit 13: Parquet Exports & Snappy Compression',
    tag: 'Data & Reporting',
    summary: 'Adds native Parquet format and Snappy compression to Cost Management exports via New-FinOpsCostExport PowerShell cmdlet, dramatically speeding up downstream query performance.',
    impact: 'Reduces export storage size by 70% and enables lightning-fast queries in Fabric, Synapse, and DuckDB.',
    isPreview: false,
    links: [
      { label: 'FinOps Toolkit 13 Announcement', url: 'https://techcommunity.microsoft.com/blog/finopsblog/what%E2%80%99s-new-in-finops-toolkit-13-%E2%80%93-january-2026/4493090' }
    ]
  }
];
