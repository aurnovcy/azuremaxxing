import { DashboardProposal } from '../types';

export const DASHBOARDS: DashboardProposal[] = [
  {
    id: 'D01',
    slug: 'executive-cloud-pulse',
    title: 'Executive Cloud Pulse',
    audience: 'CEO, CFO, CTO, VP Engineering',
    cadence: 'Monthly',
    summary: 'Executive overview of month-to-date amortized spend, budget vs forecast variance, Effective Savings Rate, and headline unit economics.',
    widgets: [
      'Month-to-date vs budget vs forecast variance waterfall',
      '13-month amortized spend trend by business unit',
      'Effective Savings Rate (ESR) gauge and historical trend',
      'Azure Hybrid Benefit coverage percentage across Windows and SQL',
      'Commitments and ESU renewal obligations in the next 90 days',
      'MACC consumption burndown against contract milestones'
    ],
    kpis: ['effective_savings_rate', 'unit_cost', 'ahb_coverage', 'commitment_coverage'],
    dataSources: ['FOCUS exports (Cost Management)', 'FinOps hubs', 'Enterprise Agreement / MCA Billing API'],
    exampleQuery: {
      language: 'kusto',
      title: 'FinOps hubs Monthly Effective Cost by Service',
      code: `Costs()
| where ChargePeriodStart >= startofmonth(ago(365d))
| summarize EffectiveCost = sum(EffectiveCost), BilledCost = sum(BilledCost)
    by Month = startofmonth(ChargePeriodStart), ServiceName
| order by Month desc, EffectiveCost desc`
    },
    metrics: [
      { name: 'MTD Amortized Spend', value: '$342,850', change: '-4.2% MoM', isPositive: true, timeframe: 'vs last month' },
      { name: 'Effective Savings Rate', value: '34.8%', change: '+3.1% MoM', isPositive: true, timeframe: 'Target 35%' },
      { name: 'AHB Coverage', value: '92.4%', change: '+1.5%', isPositive: true, timeframe: 'Windows & SQL' },
      { name: 'Unallocated Spend', value: '3.1%', change: '-0.8%', isPositive: true, timeframe: 'Target <5%' }
    ],
    chartData: [
      { name: 'May 26', value1: 410, value2: 395, target: 400 },
      { name: 'Jun 26', value1: 425, value2: 388, target: 400 },
      { name: 'Jul 26', value1: 395, value2: 360, target: 390 },
      { name: 'Aug 26', value1: 380, value2: 350, target: 380 },
      { name: 'Sep 26', value1: 365, value2: 345, target: 370 },
      { name: 'Oct 26', value1: 342, value2: 330, target: 360 }
    ],
    chartLabels: { series1: 'Actual Spend ($k)', series2: 'Optimized ($k)' }
  },
  {
    id: 'D02',
    slug: 'unit-economics',
    title: 'Unit Economics Command',
    audience: 'Product Leaders, FinOps, Finance',
    cadence: 'Weekly',
    summary: 'Correlates raw cloud cost with business drivers: cost per active user, cost per processed transaction, and cost per AI conversation.',
    widgets: [
      'Unit cost by product line over 12 months',
      'Cost to serve by customer enterprise tier',
      'Marginal cost curve during growth spikes',
      'Cost composition per unit: compute, storage, networking, AI, licensing, observability'
    ],
    kpis: ['unit_cost', 'ai_cost_per_outcome'],
    dataSources: ['FOCUS export joined with Product Telemetry DB (Postgres / Snowflake)'],
    exampleQuery: {
      language: 'sql',
      title: 'Cost Per Active Tenant from FOCUS and App DB',
      code: `SELECT DATE_TRUNC('month', f.ChargePeriodStart) AS month,
       f.SubAccountName,
       SUM(f.EffectiveCost) / NULLIF(u.ActiveTenants, 0) AS cost_per_tenant
FROM focus_costs f
JOIN monthly_tenant_metrics u ON DATE_TRUNC('month', f.ChargePeriodStart) = u.month
GROUP BY 1, 2, u.ActiveTenants
ORDER BY 1 DESC;`
    },
    metrics: [
      { name: 'Cost per Active User', value: '$0.042', change: '-12% YoY', isPositive: true, timeframe: '6-mo trend' },
      { name: 'Cost per 1k Transactions', value: '$1.18', change: '-8.5%', isPositive: true, timeframe: 'Payment gateway' },
      { name: 'Cost per AI Resolution', value: '$0.019', change: '-34%', isPositive: true, timeframe: 'Prompt caching active' }
    ],
    chartData: [
      { name: 'May', value1: 0.052, value2: 0.048 },
      { name: 'Jun', value1: 0.049, value2: 0.046 },
      { name: 'Jul', value1: 0.047, value2: 0.044 },
      { name: 'Aug', value1: 0.045, value2: 0.042 },
      { name: 'Sep', value1: 0.043, value2: 0.040 },
      { name: 'Oct', value1: 0.042, value2: 0.039 }
    ]
  },
  {
    id: 'D03',
    slug: 'commitment-command-center',
    title: 'Commitment Command Center',
    audience: 'FinOps Practitioners, Procurement, Cloud Architects',
    cadence: 'Weekly',
    summary: 'Tracks reservation and savings plan utilization, coverage ladders, auto-renew risks, and the February 1, 2027 exchange cutoff inventory.',
    widgets: [
      'Compute and Database Savings Plan hourly utilization',
      'Reservation utilization and idle commitment burn rate',
      'Commitment coverage ladder by service family (VMs, DBs, Storage, PTU)',
      'Pre-Feb 2027 reservation exchange candidate inventory',
      'Auto-renew audit tracker for upcoming expirations',
      'Management-group scoped commitment purchase recommendations'
    ],
    kpis: ['commitment_utilization', 'commitment_coverage', 'unused_commitment_cost', 'effective_savings_rate'],
    dataSources: ['Cost Management Reservations API', 'Savings Plan API', 'FOCUS Exports'],
    exampleQuery: {
      language: 'kusto',
      title: 'Unused Commitment Cost by Type',
      code: `Costs()
| where ChargePeriodStart >= startofmonth(ago(180d)) and CommitmentDiscountStatus == 'Unused'
| summarize UnusedCost = sum(EffectiveCost) by Month = startofmonth(ChargePeriodStart), CommitmentDiscountType
| order by Month desc`
    },
    metrics: [
      { name: 'Savings Plan Utilization', value: '98.6%', change: '+1.2%', isPositive: true, timeframe: 'Compute & DB' },
      { name: 'Reservation Utilization', value: '97.2%', change: '+0.8%', isPositive: true, timeframe: 'No idle commitments' },
      { name: 'Unused Commitment Waste', value: '$410/mo', change: '-75%', isPositive: true, timeframe: 'Near zero target' },
      { name: 'Pre-2027 Exchange Flagged', value: '4 RIs', change: 'Action required', isPositive: false, timeframe: 'Review before Feb 1' }
    ],
    chartData: [
      { name: 'W1', value1: 96.5, value2: 98.1, target: 95 },
      { name: 'W2', value1: 97.0, value2: 98.4, target: 95 },
      { name: 'W3', value1: 96.8, value2: 98.9, target: 95 },
      { name: 'W4', value1: 97.4, value2: 98.6, target: 95 }
    ]
  },
  {
    id: 'D04',
    slug: 'waste-and-orphan-tracker',
    title: 'Waste and Orphan Tracker',
    audience: 'Engineering Managers, SREs, FinOps',
    cadence: 'Weekly',
    summary: 'Real-time inventory of unattached disks, unassociated IPs, stopped-not-deallocated VMs, empty App Service plans, and expired snapshots.',
    widgets: [
      'Unattached managed disk volume and monthly accrued cost',
      'Stopped VMs billing compute (PowerState/stopped)',
      'Empty App Service plans with 0 hosted applications',
      'Unassociated Public IP addresses and idle NAT gateways',
      'Snapshots older than 90 days',
      'Remediation backlog assigned to engineering teams'
    ],
    kpis: ['orphan_spend_share', 'waste_percent'],
    dataSources: ['Azure Resource Graph', 'Advisor Cost Recommendations', 'FinOps hubs recommendation pipeline'],
    exampleQuery: {
      language: 'kusto',
      title: 'Unattached Disks by Size and Cost',
      code: `Resources
| where type =~ 'microsoft.compute/disks'
| where properties.diskState =~ 'Unattached'
| project name, resourceGroup, subscriptionId, sizeGB = toint(properties.diskSizeGB), sku = tostring(sku.name)`
    },
    metrics: [
      { name: 'Active Orphan Waste', value: '$1,840/mo', change: '-62% in 30d', isPositive: true, timeframe: 'Down from $4,800' },
      { name: 'Unattached Disks', value: '14 disks', change: '-28 disks', isPositive: true, timeframe: 'Cleaned up' },
      { name: 'Stopped Non-Deallocated VMs', value: '0 VMs', change: 'Clean', isPositive: true, timeframe: 'Zero phantom compute' },
      { name: 'Empty App Plans', value: '1 plan', change: '-3 plans', isPositive: true, timeframe: 'Pending review' }
    ],
    chartData: [
      { name: 'Oct 1', value1: 4800, value2: 1200 },
      { name: 'Oct 8', value1: 3900, value2: 950 },
      { name: 'Oct 15', value1: 2800, value2: 600 },
      { name: 'Oct 22', value1: 2200, value2: 450 },
      { name: 'Oct 29', value1: 1840, value2: 300 }
    ]
  },
  {
    id: 'D05',
    slug: 'license-optimization',
    title: 'License Optimization (AHB & Dev/Test)',
    audience: 'Licensing Team, FinOps, Infrastructure Directors',
    cadence: 'Monthly',
    summary: 'Monitors Azure Hybrid Benefit entitlement coverage across Windows Server, SQL Server, and Linux (RHEL/SLES), plus Dev/Test offer utilization.',
    widgets: [
      'Windows Server AHB coverage by subscription and management group',
      'SQL Server vCore AHB coverage across PaaS DB, MI, and IaaS',
      'SQL edition right-sizing distribution (Enterprise vs Standard vs Developer)',
      'Dev/Test subscription usage share for non-production environments',
      'Constrained vCPU core sizing adoption for database instances'
    ],
    kpis: ['ahb_coverage', 'dev_test_usage_share'],
    dataSources: ['Azure Resource Graph', 'Cost Management Amortized Details', 'Microsoft Volume Licensing Service Center'],
    exampleQuery: {
      language: 'kusto',
      title: 'Windows VMs Missing AHB',
      code: `Resources
| where type =~ 'microsoft.compute/virtualmachines'
| where tostring(properties.storageProfile.osDisk.osType) =~ 'Windows'
| extend licenseType = tostring(properties.licenseType)
| where licenseType !in~ ('Windows_Server', 'Windows_Client')
| project name, resourceGroup, subscriptionId, vmSize = tostring(properties.hardwareProfile.vmSize)`
    },
    metrics: [
      { name: 'Windows AHB Coverage', value: '94.2%', change: '+5.4%', isPositive: true, timeframe: 'Target >90%' },
      { name: 'SQL Server AHB Coverage', value: '98.0%', change: '+2.1%', isPositive: true, timeframe: 'Centralized pool' },
      { name: 'Dev/Test Offer Adoption', value: '89.5%', change: '+12%', isPositive: true, timeframe: 'Dev subscriptions' },
      { name: 'Monthly License Savings', value: '$84,500', change: 'Realized', isPositive: true, timeframe: 'vs Full Retail' }
    ],
    chartData: [
      { name: 'May', value1: 72, value2: 85 },
      { name: 'Jun', value1: 78, value2: 88 },
      { name: 'Jul', value1: 84, value2: 92 },
      { name: 'Aug', value1: 89, value2: 95 },
      { name: 'Sep', value1: 91, value2: 97 },
      { name: 'Oct', value1: 94, value2: 98 }
    ]
  },
  {
    id: 'D06',
    slug: 'rightsizing-and-modernization',
    title: 'Rightsizing and Modernization',
    audience: 'Platform Engineering, DevOps, Cloud Architects',
    cadence: 'Bi-weekly',
    summary: 'Drives adoption of current-generation VM series, Cobalt Arm processors, Spot instances, and memory-informed rightsizing.',
    widgets: [
      'Percentage of VM hours on current series (v5/v6 vs legacy v3/v4)',
      'Arm Cobalt adoption percentage across container pools and scale sets',
      'Spot instance share for interruptible workloads',
      'VM Insights memory metric coverage percentage',
      'Advisor rightsizing savings potential vs realized'
    ],
    kpis: ['modern_series_share', 'arm_spot_share', 'recommendation_realization'],
    dataSources: ['Advisor API', 'Azure Resource Graph', 'Azure Monitor VM Insights'],
    exampleQuery: {
      language: 'kusto',
      title: 'VM Fleet Series Breakdown',
      code: `Resources
| where type =~ 'microsoft.compute/virtualmachines'
| extend vmSize = tostring(properties.hardwareProfile.vmSize)
| summarize count() by vmSize
| order by count_ desc`
    },
    metrics: [
      { name: 'Modern Series Share', value: '82.4%', change: '+14% QoQ', isPositive: true, timeframe: 'v5/v6' },
      { name: 'Arm Cobalt Share', value: '24.1%', change: '+8.3%', isPositive: true, timeframe: 'AKS node pools' },
      { name: 'Spot Compute Share', value: '18.5%', change: '+3.2%', isPositive: true, timeframe: 'CI/CD and batch' },
      { name: 'Open Rightsizing Pipeline', value: '$12,400/mo', change: '34 recommendations', isPositive: false, timeframe: 'Pending review' }
    ],
    chartData: [
      { name: 'Jun', value1: 65, value2: 12 },
      { name: 'Jul', value1: 70, value2: 15 },
      { name: 'Aug', value1: 75, value2: 18 },
      { name: 'Sep', value1: 79, value2: 21 },
      { name: 'Oct', value1: 82, value2: 24 }
    ]
  },
  {
    id: 'D07',
    slug: 'allocation-health',
    title: 'Allocation Health & Tag Governance',
    audience: 'FinOps, Finance, Engineering VPs',
    cadence: 'Monthly',
    summary: 'Audits cost attribution completeness: tag coverage by cost, cost allocation rule distribution, AKS namespace showback, and unallocated residuals.',
    widgets: [
      'Amortized cost carrying mandatory tags (owner, application, cost-center)',
      'Unallocated spend trend by subscription and resource provider',
      'AKS namespace allocation breakdown via native cost analysis add-on',
      'Managed resource group spend (MC_* for AKS, Databricks)',
      'Tag inheritance compliance rate'
    ],
    kpis: ['tag_coverage'],
    dataSources: ['FOCUS Exports', 'Cost Allocation Rules API', 'AKS Cost Analysis Add-on'],
    exampleQuery: {
      language: 'kusto',
      title: 'Tag Coverage Percentage by Amortized Cost',
      code: `Costs()
| where ChargePeriodStart >= startofmonth(ago(90d))
| extend Team = tostring(Tags['team'])
| summarize Total = sum(EffectiveCost), Tagged = sumif(EffectiveCost, isnotempty(Team)) by Month = startofmonth(ChargePeriodStart)
| extend TagCoverage = Tagged / Total`
    },
    metrics: [
      { name: 'Mandatory Tag Coverage', value: '96.2%', change: '+4.1%', isPositive: true, timeframe: 'Target >95%' },
      { name: 'Unallocated Spend Share', value: '3.8%', change: '-4.1%', isPositive: true, timeframe: 'Lowest on record' },
      { name: 'AKS Namespace Allocated', value: '98.5%', change: '+1.1%', isPositive: true, timeframe: 'OpenCost add-on' }
    ],
    chartData: [
      { name: 'Jun', value1: 88, value2: 12 },
      { name: 'Jul', value1: 91, value2: 9 },
      { name: 'Aug', value1: 93, value2: 7 },
      { name: 'Sep', value1: 95, value2: 5 },
      { name: 'Oct', value1: 96, value2: 4 }
    ]
  },
  {
    id: 'D08',
    slug: 'anomaly-feed',
    title: 'Anomaly Feed & Alert Monitor',
    audience: 'On-Call Engineers, SRE, FinOps Duty',
    cadence: 'Daily',
    summary: 'Live tracker of active cost anomalies across subscriptions, MTTR (mean time to resolution), and budget threshold breaches.',
    widgets: [
      'Active cost anomalies ranked by dollar deviation',
      'Subscription and service anomalous spike radar',
      'Mean time to acknowledge (MTTA) and resolve (MTTR)',
      'Budget threshold alarms fired in the last 7 days'
    ],
    kpis: ['anomaly_time_to_resolve', 'forecast_accuracy'],
    dataSources: ['Cost Management Anomaly API', 'Azure Monitor Alerts'],
    exampleQuery: {
      language: 'kusto',
      title: 'Recent Cost Anomalies by Impact',
      code: `// Queried via Cost Management Anomaly API`
    },
    metrics: [
      { name: 'Active Anomalies', value: '1', change: 'Investigating', isPositive: false, timeframe: 'AI token spike' },
      { name: 'Avg Resolution Time', value: '1.4 days', change: '-0.8 days', isPositive: true, timeframe: 'Target <2d' },
      { name: 'False Alarm Rate', value: '12%', change: '-4%', isPositive: true, timeframe: 'Model tuned' }
    ],
    chartData: [
      { name: 'Mon', value1: 2, value2: 2 },
      { name: 'Tue', value1: 3, value2: 3 },
      { name: 'Wed', value1: 1, value2: 1 },
      { name: 'Thu', value1: 0, value2: 0 },
      { name: 'Fri', value1: 1, value2: 0 }
    ]
  },
  {
    id: 'D09',
    slug: 'network-and-egress-map',
    title: 'Network & Egress Map',
    audience: 'Network Architecture, SRE, Platform Team',
    cadence: 'Monthly',
    summary: 'Deconstructs data transfer costs across internet egress, inter-region replication, VNet peering, NAT gateways, and private endpoints.',
    widgets: [
      'Spend by transfer type (Internet, Inter-Region, Peering, Private Link)',
      'Idle NAT Gateway and VPN Gateway tracker',
      'Azure Front Door cache hit ratio vs origin egress reduction',
      'VNet flow log ingestion volume after GA filtering rules',
      'Egress cost per customer / tenant'
    ],
    kpis: ['egress_share', 'unit_cost'],
    dataSources: ['FOCUS Exports (Network meters)', 'Azure Front Door Analytics', 'Network Watcher'],
    exampleQuery: {
      language: 'kusto',
      title: 'Bandwidth Spend by Meter Category',
      code: `Costs()
| where MeterCategory =~ 'Bandwidth' or MeterSubCategory contains 'Data Transfer'
| summarize Cost = sum(EffectiveCost) by MeterName, ChargePeriodStart`
    },
    metrics: [
      { name: 'Egress Share of Total', value: '5.2%', change: '-1.8%', isPositive: true, timeframe: 'Target <8%' },
      { name: 'Front Door Cache Hit', value: '88.4%', change: '+4.2%', isPositive: true, timeframe: 'Saves origin egress' },
      { name: 'Flow Log Volume', value: '420 GB/mo', change: '-55%', isPositive: true, timeframe: 'Filtering active' }
    ],
    chartData: [
      { name: 'Jun', value1: 22.4, value2: 18.1 },
      { name: 'Jul', value1: 24.1, value2: 19.0 },
      { name: 'Aug', value1: 20.8, value2: 16.5 },
      { name: 'Sep', value1: 18.9, value2: 15.2 },
      { name: 'Oct', value1: 17.5, value2: 14.1 }
    ]
  },
  {
    id: 'D10',
    slug: 'storage-lifecycle',
    title: 'Storage Lifecycle & Backup',
    audience: 'Data Platform, Storage Admins, Backup Owners',
    cadence: 'Monthly',
    summary: 'Monitors Blob capacity distribution across Hot, Cool, Cold, and Archive tiers, lifecycle rule coverage, snapshot growth, and backup retention.',
    widgets: [
      'Storage capacity by access tier and redundancy class (LRS vs GRS)',
      'Lifecycle rule coverage percentage across storage accounts',
      'Managed disk IOPS measured vs provisioned tier',
      'Snapshot age histogram and orphan backup items',
      'Azure Backup recovery point tiering to archive'
    ],
    kpis: ['waste_percent'],
    dataSources: ['Storage Blob Inventory', 'Storage Insights', 'Azure Backup Reports'],
    exampleQuery: {
      language: 'kusto',
      title: 'Storage Capacity by Access Tier',
      code: `// Queried via Storage Blob Inventory reports`
    },
    metrics: [
      { name: 'Cold & Archive Share', value: '64.8%', change: '+12%', isPositive: true, timeframe: 'Optimized tiers' },
      { name: 'Lifecycle Rule Coverage', value: '88.0%', change: '+9%', isPositive: true, timeframe: 'Automated age-out' },
      { name: 'Snapshot Waste Eliminated', value: '$2,100/mo', change: 'Pruned', isPositive: true, timeframe: '>90d deleted' }
    ],
    chartData: [
      { name: 'Hot', value1: 35 },
      { name: 'Cool', value1: 25 },
      { name: 'Cold', value1: 20 },
      { name: 'Archive', value1: 20 }
    ]
  },
  {
    id: 'D11',
    slug: 'aks-and-containers',
    title: 'AKS & Containers Efficiency',
    audience: 'Platform Team, Kubernetes Operators',
    cadence: 'Weekly',
    summary: 'Cluster-level and namespace-level breakdown of requested vs used CPU/memory, idle node costs, Karpenter consolidation, and Spot node share.',
    widgets: [
      'Cost per cluster and per Kubernetes namespace',
      'CPU & Memory Request-to-Usage ratio (slack waste)',
      'Karpenter node auto-provisioning consolidation rate',
      'Spot and Arm Cobalt node pool percentage',
      'Container Insights ingestion spend'
    ],
    kpis: ['unit_cost', 'arm_spot_share'],
    dataSources: ['AKS Cost Analysis Add-on', 'Prometheus / OpenCost', 'Azure Monitor'],
    exampleQuery: {
      language: 'kusto',
      title: 'Container Insights Billable Ingestion',
      code: `Usage
| where DataType =~ 'ContainerLogV2'
| summarize IngestionGB = sum(Quantity)/1000 by bin(TimeGenerated, 1d)`
    },
    metrics: [
      { name: 'Cluster CPU Utilization', value: '74.2%', change: '+18%', isPositive: true, timeframe: 'NAP active' },
      { name: 'Namespace Allocated Share', value: '98.5%', change: '+1.5%', isPositive: true, timeframe: 'No unassigned pods' },
      { name: 'Spot Node Pool Share', value: '38.0%', change: '+5%', isPositive: true, timeframe: 'Stateless apps' }
    ],
    chartData: [
      { name: 'W1', value1: 58, value2: 32 },
      { name: 'W2', value1: 64, value2: 34 },
      { name: 'W3', value1: 69, value2: 36 },
      { name: 'W4', value1: 74, value2: 38 }
    ]
  },
  {
    id: 'D12',
    slug: 'ai-and-foundry-spend',
    title: 'AI & Microsoft Foundry Spend',
    audience: 'AI Product Leads, FinOps, LLM Engineering',
    cadence: 'Daily',
    summary: 'Monitors Azure OpenAI, Microsoft Foundry, Claude in Foundry attribution, prompt caching efficiency, batch workload share, and PTU utilization.',
    widgets: [
      'Spend by model family (GPT-4o, Mini, Claude 3.5 Sonnet in Foundry)',
      'Token breakdown: cached input, standard input, output, reasoning tokens',
      'Global Batch deployment share (50% discount)',
      'Provisioned Throughput (PTU) hourly utilization vs overage spillover',
      'Cost per AI conversation or automated workflow completion',
      'Microsoft 365 Copilot usage-based spend policies and limits'
    ],
    kpis: ['ai_cost_per_outcome', 'batch_cache_share', 'ptu_utilization'],
    dataSources: ['Cost Management (AI meters)', 'Foundry Usage Analytics', 'API Management AI Gateway metrics'],
    exampleQuery: {
      language: 'kusto',
      title: 'Azure OpenAI Spend by Deployment Name',
      code: `Costs()
| where ServiceName contains 'Azure OpenAI' or ServiceName contains 'Foundry'
| summarize DailySpend = sum(EffectiveCost) by tostring(Tags['deployment']), bin(ChargePeriodStart, 1d)`
    },
    metrics: [
      { name: 'Cached Token Ratio', value: '46.8%', change: '+14% MoM', isPositive: true, timeframe: '50% input discount' },
      { name: 'Global Batch Share', value: '31.2%', change: '+8%', isPositive: true, timeframe: 'Async enrichment' },
      { name: 'PTU Utilization', value: '94.5%', change: '+2.1%', isPositive: true, timeframe: 'High-density packing' },
      { name: 'Cost per Resolved Ticket', value: '$0.024', change: '-28%', isPositive: true, timeframe: 'Target <$0.03' }
    ],
    chartData: [
      { name: 'May', value1: 14.2, value2: 3.1 },
      { name: 'Jun', value1: 18.5, value2: 5.2 },
      { name: 'Jul', value1: 22.0, value2: 7.8 },
      { name: 'Aug', value1: 24.8, value2: 9.5 },
      { name: 'Sep', value1: 23.1, value2: 10.2 },
      { name: 'Oct', value1: 21.4, value2: 10.8 }
    ],
    chartLabels: { series1: 'Standard Tokens ($k)', series2: 'Batch & Cached ($k)' }
  },
  {
    id: 'D13',
    slug: 'databases',
    title: 'Databases & Cosmos DB',
    audience: 'Lead DBAs, Platform Engineering',
    cadence: 'Monthly',
    summary: 'Tracks database engine spend, serverless auto-pause efficiency, database savings plan coverage, idle databases, and Cosmos DB RU tuning.',
    widgets: [
      'Spend by engine: Azure SQL, Managed Instance, PostgreSQL, MySQL, Cosmos DB',
      'Serverless auto-pause duration in non-production environments',
      'Database savings plan coverage vs standalone reservations',
      'Cosmos DB autoscale max RU/s vs actual consumption floor',
      'Idle database detection (0 connections in 30 days)'
    ],
    kpis: ['commitment_coverage', 'non_prod_off_hours_ratio'],
    dataSources: ['FOCUS Exports (DB meters)', 'Azure Monitor Query Performance Insight'],
    exampleQuery: {
      language: 'kusto',
      title: 'Database Spend by Engine and SKU',
      code: `Costs()
| where MeterCategory in~ ('Azure SQL Database', 'Cosmos DB', 'Azure Database for PostgreSQL')
| summarize Cost = sum(EffectiveCost) by MeterCategory, bin(ChargePeriodStart, 1d)`
    },
    metrics: [
      { name: 'DB Savings Plan Coverage', value: '88.5%', change: '+15%', isPositive: true, timeframe: '1-yr floating' },
      { name: 'Serverless Off-Hours Rate', value: '68.0%', change: '+12%', isPositive: true, timeframe: 'Paused nights/wknds' },
      { name: 'Idle Databases Retired', value: '6 DBs', change: 'Cleaned', isPositive: true, timeframe: 'Saved $1,200/mo' }
    ],
    chartData: [
      { name: 'SQL DB', value1: 42 },
      { name: 'SQL MI', value1: 28 },
      { name: 'Postgres', value1: 18 },
      { name: 'Cosmos', value1: 12 }
    ]
  },
  {
    id: 'D14',
    slug: 'observability-spend',
    title: 'Observability & Monitoring Spend',
    audience: 'SRE Leadership, Observability Engineers',
    cadence: 'Monthly',
    summary: 'Monitors Log Analytics ingestion by table, table plan mix (Analytics vs Basic vs Auxiliary), Sentinel connectors, and Application Insights sampling.',
    widgets: [
      'Billable ingestion by table and workspace',
      'Table plan allocation (Analytics vs Basic vs Auxiliary)',
      'Commitment tier fit (100 GB/day to 5,000 GB/day tiers)',
      'Application Insights adaptive sampling rate',
      'Observability spend as a percentage of total cloud bill'
    ],
    kpis: ['observability_share'],
    dataSources: ['Log Analytics Usage Table', 'Cost Management'],
    exampleQuery: {
      language: 'kusto',
      title: 'Log Analytics 30-Day Table Ranking',
      code: `Usage
| where TimeGenerated > ago(30d)
| where IsBillable == true
| summarize IngestedGB = sum(Quantity) / 1000 by DataType
| sort by IngestedGB desc`
    },
    metrics: [
      { name: 'Observability % of Bill', value: '4.8%', change: '-2.1%', isPositive: true, timeframe: 'Target <6%' },
      { name: 'Basic & Aux Table Share', value: '44.0%', change: '+22%', isPositive: true, timeframe: 'Debug & logs' },
      { name: 'Commitment Tier Savings', value: '$3,800/mo', change: 'Active', isPositive: true, timeframe: '200 GB/day tier' }
    ],
    chartData: [
      { name: 'Jun', value1: 24.5, value2: 18.0 },
      { name: 'Jul', value1: 26.2, value2: 19.5 },
      { name: 'Aug', value1: 21.0, value2: 15.0 },
      { name: 'Sep', value1: 18.4, value2: 13.8 },
      { name: 'Oct', value1: 16.5, value2: 12.2 }
    ]
  },
  {
    id: 'D15',
    slug: 'lifecycle-and-esu',
    title: 'Lifecycle & ESU Tracker',
    audience: 'CTO, Head of Infrastructure, Licensing Director',
    cadence: 'Monthly',
    summary: 'Tracks server counts approaching or past end-of-support (Windows Server 2016, SQL Server 2016), Azure Arc ESU monthly spend, and upgrade timelines.',
    widgets: [
      'Server counts by OS/DB version (2012, 2014, 2016, 2019, 2022, 2025)',
      'Azure Arc monthly pay-as-you-go ESU cost trend',
      'Projected ESU costs over 12/24/36 months if unmigrated',
      'Countdown to January 12, 2027 (WS2016 EOS)',
      'Upgrade burndown progress by application team'
    ],
    kpis: ['esu_spend', 'servers_past_eos'],
    dataSources: ['Azure Arc Connected Machines', 'Azure Migrate', 'Resource Graph'],
    exampleQuery: {
      language: 'kusto',
      title: 'Inventory Legacy Windows Servers',
      code: `Resources
| where type =~ 'microsoft.compute/virtualmachines'
| where properties.storageProfile.osDisk.osType =~ 'Windows'
| extend sku = tostring(properties.storageProfile.imageReference.sku)
| where sku contains '2016' or sku contains '2012'
| summarize count() by sku`
    },
    metrics: [
      { name: 'Days to WS2016 EOS', value: '77 days', change: 'Jan 12, 2027', isPositive: false, timeframe: 'Urgent' },
      { name: 'WS2016 Instances Remaining', value: '42 VMs', change: '-18 in 60d', isPositive: true, timeframe: 'Migration wave' },
      { name: 'Arc ESU Monthly Run Rate', value: '$8,400/mo', change: 'Declining', isPositive: true, timeframe: 'Canceled as upgraded' }
    ],
    chartData: [
      { name: 'May', value1: 94 },
      { name: 'Jun', value1: 82 },
      { name: 'Jul', value1: 71 },
      { name: 'Aug', value1: 60 },
      { name: 'Sep', value1: 52 },
      { name: 'Oct', value1: 42 }
    ]
  },
  {
    id: 'D16',
    slug: 'budget-vs-forecast-variance',
    title: 'Budget vs Forecast Variance Waterfall',
    audience: 'Finance, FinOps Controllers',
    cadence: 'Monthly',
    summary: 'Reconciles actual invoice with approved budgets and models variance drivers: usage growth, rate discounts, architecture shifts, and new workloads.',
    widgets: [
      'Budget vs Actual vs Forecast waterfall by cost center',
      'Variance decomposition: volume vs price vs mix',
      'Forecast accuracy percentage over rolling 6 months',
      'Budget threshold alarms fired by department'
    ],
    kpis: ['forecast_accuracy'],
    dataSources: ['Cost Management Budgets API', 'Financial ERP (SAP / NetSuite)'],
    exampleQuery: {
      language: 'sql',
      title: 'Variance Decomposition',
      code: `// Financial reconciliation query`
    },
    metrics: [
      { name: 'Forecast Accuracy', value: '97.2%', change: '+1.4%', isPositive: true, timeframe: 'Target >95%' },
      { name: 'Net Variance', value: '-$8,400', change: 'Favorable', isPositive: true, timeframe: 'Under budget' },
      { name: 'Fired Budget Alerts', value: '2', change: 'Non-critical', isPositive: true, timeframe: 'Last 30d' }
    ],
    chartData: [
      { name: 'Budget', value1: 350 },
      { name: 'Volume +', value1: 22 },
      { name: 'Rightsizing -', value1: -18 },
      { name: 'Commitments -', value1: -16 },
      { name: 'Actual', value1: 338 }
    ]
  },
  {
    id: 'D17',
    slug: 'team-showback-scorecard',
    title: 'Team Showback Scorecard',
    audience: 'Engineering Team Leads, Product Managers',
    cadence: 'Weekly Digest',
    summary: 'Gamified, actionable weekly scorecard for each engineering squad: team spend, unit cost trend, open rightsizing recommendations, and orphan assets.',
    widgets: [
      'Team weekly amortized spend and MoM trend',
      'Assigned orphan resources (unattached disks, idle test VMs)',
      'Open Advisor recommendations with one-click Jira/ADO sync',
      'Tag compliance score',
      'Team efficiency rank across the engineering organization'
    ],
    kpis: ['recommendation_realization', 'tag_coverage'],
    dataSources: ['FOCUS Exports tagged by Team', 'FinOps hubs Jira webhook'],
    exampleQuery: {
      language: 'kusto',
      title: 'Spend by Owning Team',
      code: `Costs()
| where ChargePeriodStart >= ago(30d)
| summarize Cost = sum(EffectiveCost) by Team = tostring(Tags['team'])`
    },
    metrics: [
      { name: 'Team Spend MTD', value: '$24,180', change: '-6.2%', isPositive: true, timeframe: 'Squad Core' },
      { name: 'Open Quick Wins', value: '$840/mo', change: '3 tickets', isPositive: false, timeframe: 'Ready to action' },
      { name: 'Tag Compliance', value: '99.1%', change: 'Gold Tier', isPositive: true, timeframe: 'Top 5 squad' }
    ],
    chartData: [
      { name: 'W1', value1: 6400 },
      { name: 'W2', value1: 6100 },
      { name: 'W3', value1: 5900 },
      { name: 'W4', value1: 5780 }
    ]
  },
  {
    id: 'D18',
    slug: 'credits-burn-down',
    title: 'Credits Burn-down & Runway',
    audience: 'Startup Founders, Lead Engineers, CFOs',
    cadence: 'Weekly',
    summary: 'Tracks Microsoft for Startups or promotional credit balances, burn velocity, projected exhaustion date, and unoptimized post-credit run-rate.',
    widgets: [
      'Remaining credit balance and expiration date',
      'Weekly burn rate and runway depletion forecast',
      'Estimated monthly invoice post-credit cliff without optimization',
      'Pre-cliff optimization plan: 1-year monthly savings plan impact'
    ],
    kpis: ['unit_cost', 'effective_savings_rate'],
    dataSources: ['Cost Management Credits API', 'FOCUS Exports'],
    exampleQuery: {
      language: 'kusto',
      title: 'Credit Burn Rate by Day',
      code: `Costs()
| where ChargeCategory =~ 'Credit' or ChargeSubCategory =~ 'Promotional'
| summarize DailyCreditBurn = sum(abs(BilledCost)) by bin(ChargePeriodStart, 1d)`
    },
    metrics: [
      { name: 'Remaining Credits', value: '$48,250', change: 'Expires June 2027', isPositive: true, timeframe: 'Founder offer' },
      { name: 'Monthly Burn Rate', value: '$6,400/mo', change: '+4.2%', isPositive: false, timeframe: '7.5 months runway' },
      { name: 'Post-Cliff Run Rate', value: '$4,100/mo', change: 'Optimized', isPositive: true, timeframe: 'Savings plan modeled' }
    ],
    chartData: [
      { name: 'Jun', value1: 80 },
      { name: 'Jul', value1: 73 },
      { name: 'Aug', value1: 66 },
      { name: 'Sep', value1: 59 },
      { name: 'Oct', value1: 52 },
      { name: 'Nov', value1: 48 }
    ]
  },
  {
    id: 'D19',
    slug: 'startup-runway-view',
    title: 'Startup Runway & Gross Margin View',
    audience: 'Founders, Board of Directors, Investors',
    cadence: 'Monthly',
    summary: 'Cloud infrastructure cost as a percentage of total operational burn, gross margin impact with and without cloud credits, and cloud cost per paying customer.',
    widgets: [
      'Cloud spend as % of monthly burn and total revenue',
      'SaaS Gross Margin with and without credits',
      'Cloud unit cost per active customer account',
      'Runway extension gained through FinOps optimization'
    ],
    kpis: ['unit_cost'],
    dataSources: ['Financial Model + Cost Management'],
    exampleQuery: {
      language: 'sql',
      title: 'Gross Margin Impact',
      code: `// Financial calculation`
    },
    metrics: [
      { name: 'Cloud % of Burn', value: '14.2%', change: '-3.1%', isPositive: true, timeframe: 'Healthy <20%' },
      { name: 'True Gross Margin', value: '78.5%', change: '+4.5%', isPositive: true, timeframe: 'Excl. credit subsidy' },
      { name: 'Runway Extended', value: '+1.8 months', change: 'By optimization', isPositive: true, timeframe: 'Realized savings' }
    ],
    chartData: [
      { name: 'May', value1: 72 },
      { name: 'Jun', value1: 74 },
      { name: 'Jul', value1: 75 },
      { name: 'Aug', value1: 77 },
      { name: 'Sep', value1: 78 },
      { name: 'Oct', value1: 79 }
    ]
  },
  {
    id: 'D20',
    slug: 'marketplace-and-macc',
    title: 'Marketplace & MACC Command',
    audience: 'Procurement, Strategic Sourcing, Enterprise Architecture',
    cadence: 'Quarterly',
    summary: 'Tracks third-party Azure Marketplace software spend, Azure Benefit eligibility, and burndown against Microsoft Azure Consumption Commitments (MACC).',
    widgets: [
      'Marketplace spend by publisher and contract renewal date',
      'MACC burndown progress vs committed contract milestone',
      'Percentage of Marketplace spend counting toward MACC (Azure Benefit Eligible)',
      'Private offer pricing verification'
    ],
    kpis: ['commitment_coverage'],
    dataSources: ['Marketplace Billing Details', 'MACC Agreement Tracker'],
    exampleQuery: {
      language: 'kusto',
      title: 'MACC-Eligible Marketplace Purchases',
      code: `Costs()
| where PublisherType =~ 'Marketplace'
| summarize Cost = sum(EffectiveCost) by PublisherName, MeterCategory`
    },
    metrics: [
      { name: 'MACC Contract Milestone', value: '84.2%', change: 'On track', isPositive: true, timeframe: 'Year 2 of 3' },
      { name: 'Marketplace MACC Burn', value: '$320k/yr', change: 'Datadog & Confluent', isPositive: true, timeframe: 'Counts to commitment' },
      { name: 'Shortfall Risk', value: '$0', change: 'Zero risk', isPositive: true, timeframe: 'Forecast exceeds MACC' }
    ],
    chartData: [
      { name: 'Q1', value1: 22, target: 20 },
      { name: 'Q2', value1: 44, target: 40 },
      { name: 'Q3', value1: 68, target: 60 },
      { name: 'Q4', value1: 84, target: 80 }
    ]
  },
  {
    id: 'D21',
    slug: 'sustainability',
    title: 'Sustainability & Carbon Efficiency',
    audience: 'Sustainability Leads, ESG Reporting, Cloud Architects',
    cadence: 'Quarterly',
    summary: 'Correlates cloud spend reduction with carbon emission reduction using the Microsoft Emissions Impact Dashboard, Arm Cobalt adoption, and idle hours eliminated.',
    widgets: [
      'Estimated MTCO2e emissions by region and service',
      'Idle compute hours eliminated and avoided emissions',
      'Cobalt Arm and energy-efficient hardware share',
      'Carbon intensity per business transaction'
    ],
    kpis: ['modern_series_share', 'arm_spot_share'],
    dataSources: ['Microsoft Emissions Impact Dashboard', 'FOCUS Cost Data'],
    exampleQuery: {
      language: 'kusto',
      title: 'Emissions Trend by Scope',
      code: `// Microsoft Emissions Impact Dashboard exports`
    },
    metrics: [
      { name: 'Emissions Reduction', value: '-24.8%', change: 'YoY', isPositive: true, timeframe: 'MTCO2e' },
      { name: 'Cobalt Energy Savings', value: '38%', change: 'Per compute unit', isPositive: true, timeframe: 'Arm vs legacy' },
      { name: 'Idle Wattage Saved', value: '18,400 kWh', change: 'Quarterly', isPositive: true, timeframe: 'Auto-shutdown' }
    ],
    chartData: [
      { name: 'Q1', value1: 42 },
      { name: 'Q2', value1: 38 },
      { name: 'Q3', value1: 34 },
      { name: 'Q4', value1: 31 }
    ]
  },
  {
    id: 'D22',
    slug: 'optimization-pipeline',
    title: 'Optimization Pipeline & Value Realized',
    audience: 'FinOps Lead, CIO, Program Steering Committee',
    cadence: 'Monthly',
    summary: 'Portfolio view of identified, in-progress, and realized savings across Rate, Usage, and License optimization levers, plus time-to-remediate velocity.',
    widgets: [
      'Savings by lever: Rate vs Usage vs License optimization',
      'Identified vs In-Progress vs Realized savings funnel',
      'Average cycle time from Advisor recommendation to engineering deployment',
      'Top realized optimization initiatives of the quarter'
    ],
    kpis: ['recommendation_realization', 'effective_savings_rate'],
    dataSources: ['FinOps Hubs Optimization Backlog', 'Advisor API', 'Jira / GitHub Projects'],
    exampleQuery: {
      language: 'kusto',
      title: 'Realized Savings Funnel by Lever',
      code: `Costs()
| where ChargePeriodStart >= ago(90d)
// Correlated with historical baselines`
    },
    metrics: [
      { name: 'Realized Annualized Savings', value: '$420,000/yr', change: '+38% YoY', isPositive: true, timeframe: 'Cumulative' },
      { name: 'In-Flight Pipeline', value: '$95,000/yr', change: '18 initiatives', isPositive: true, timeframe: 'Active sprints' },
      { name: 'Avg Velocity to Action', value: '14 days', change: '-6 days', isPositive: true, timeframe: 'Advisor to merged PR' }
    ],
    chartData: [
      { name: 'Rate Optimization', value1: 180 },
      { name: 'Usage Optimization', value1: 140 },
      { name: 'License Optimization', value1: 100 }
    ]
  }
];
