import { KPIItem } from '../types';

export const KPIS: KPIItem[] = [
  {
    id: 'effective_savings_rate',
    name: 'Effective Savings Rate (ESR)',
    formula: '1 − (Effective Cost ÷ List-Equivalent Cost)',
    target: '30% – 45% (Track rising trend)',
    whyItMatters: 'The single most comprehensive rate optimization metric. Captures both commitment coverage and the discount depth achieved across your entire estate.',
    lever: 'rate',
    frequency: 'Monthly',
    category: 'Commitments & Commercial'
  },
  {
    id: 'commitment_coverage',
    name: 'Commitment Coverage',
    formula: 'Committed Usage ÷ Total Eligible Usage',
    target: '70% – 85% of steady baseline',
    whyItMatters: 'Measures how much of your commitment-eligible compute, database, and storage spend is shielded from on-demand pay-as-you-go rates.',
    lever: 'rate',
    frequency: 'Weekly',
    category: 'Commitments & Commercial'
  },
  {
    id: 'commitment_utilization',
    name: 'Commitment Utilization',
    formula: 'Used Commitment Amount ÷ Purchased Commitment Amount',
    target: '≥ 95%',
    whyItMatters: 'Direct measure of waste. Any utilization below 95% represents purchased commitment dollars expiring unutilized every single hour.',
    lever: 'rate',
    frequency: 'Daily / Weekly',
    category: 'Commitments & Commercial'
  },
  {
    id: 'unused_commitment_cost',
    name: 'Unused Commitment Cost',
    formula: 'Sum of unused reservation and savings plan amortized dollars',
    target: 'Near $0',
    whyItMatters: 'Exposes exact financial waste resulting from oversized commitments, unexpected decommissions, or post-deadline exchange lock-in.',
    lever: 'rate',
    frequency: 'Weekly',
    category: 'Commitments & Commercial'
  },
  {
    id: 'ahb_coverage',
    name: 'Azure Hybrid Benefit Coverage',
    formula: 'Eligible Cores with AHB Applied ÷ Total Entitled Cores',
    target: '≥ 95%',
    whyItMatters: 'Measures license efficiency. Failing to apply AHB to entitled Windows and SQL workloads leaves up to 40-55% in unneeded software surcharges on the invoice.',
    lever: 'license',
    frequency: 'Monthly',
    category: 'Licensing'
  },
  {
    id: 'dev_test_usage_share',
    name: 'Dev/Test Usage Share',
    formula: 'Non-Production Spend on Dev/Test Offers ÷ Total Non-Production Spend',
    target: '≥ 90%',
    whyItMatters: 'Ensures development, test, and sandbox workloads leverage discounted enterprise Dev/Test rates and zero Windows OS licensing surcharges.',
    lever: 'license',
    frequency: 'Monthly',
    category: 'Licensing'
  },
  {
    id: 'tag_coverage',
    name: 'Tag & Cost Allocation Coverage',
    formula: 'Amortized Cost Carrying Mandatory Tags ÷ Total Amortized Cost',
    target: '≥ 90% (Walk), ≥ 95% (Run)',
    whyItMatters: 'Foundational for FinOps accountability. You cannot hold engineering squads accountable for costs that cannot be attributed.',
    lever: 'usage',
    frequency: 'Weekly',
    category: 'Allocation & Governance'
  },
  {
    id: 'orphan_spend_share',
    name: 'Orphan Resource Spend Share',
    formula: 'Orphaned Resource Spend (Unattached Disks, Idle IPs, Empty Plans) ÷ Total Spend',
    target: '< 1% (Low single digits)',
    whyItMatters: 'Key measure of basic cloud hygiene. Orphan spend is 100% waste with zero business output.',
    lever: 'usage',
    frequency: 'Weekly',
    category: 'Usage Optimization'
  },
  {
    id: 'modern_series_share',
    name: 'Modern Series VM Share',
    formula: 'Current-Series VM Hours (v5/v6) ÷ Total VM Hours',
    target: '≥ 80% and rising',
    whyItMatters: 'Older hardware series cost more per unit of compute performance and lack modern architectural improvements like Cobalt Arm.',
    lever: 'usage',
    frequency: 'Monthly',
    category: 'Architecture'
  },
  {
    id: 'arm_spot_share',
    name: 'Arm Cobalt & Spot Compute Share',
    formula: '(Arm Hours + Spot Hours) ÷ Total Eligible Compute Hours',
    target: '≥ 25% – 40%',
    whyItMatters: 'Combines power-efficient modern silicon (Cobalt 100) with ultra-deep Spot discounts for stateless and batch workloads.',
    lever: 'usage',
    frequency: 'Monthly',
    category: 'Architecture'
  },
  {
    id: 'non_prod_off_hours_ratio',
    name: 'Non-Prod Off-Hours Ratio',
    formula: 'Deallocated Hours in Non-Production ÷ Total Available Hours in Period',
    target: '≥ 50% – 65%',
    whyItMatters: 'Measures scheduling discipline. Dev and test environments running 24/7 are paying for 128 hours per week of completely empty office time.',
    lever: 'usage',
    frequency: 'Monthly',
    category: 'Usage Optimization'
  },
  {
    id: 'observability_share',
    name: 'Observability Spend Share',
    formula: 'Monitoring & Log Analytics Spend ÷ Total Cloud Spend',
    target: '3% – 6% (Stable trend)',
    whyItMatters: 'Alerts against telemetry bloat where logging costs scale faster than the underlying business services generating the logs.',
    lever: 'usage',
    frequency: 'Monthly',
    category: 'Observability'
  },
  {
    id: 'egress_share',
    name: 'Network Egress Spend Share',
    formula: 'Data Transfer & Egress Spend ÷ Total Cloud Spend',
    target: '3% – 8%',
    whyItMatters: 'High egress indicates architectural flaws: un-cached public APIs, cross-region replication leaks, or chatty inter-region topologies.',
    lever: 'usage',
    frequency: 'Monthly',
    category: 'Architecture'
  },
  {
    id: 'esu_spend',
    name: 'Extended Security Updates (ESU) Spend',
    formula: 'Monthly ESU charges across Windows Server and SQL Server',
    target: 'Declining to $0 as migrations complete',
    whyItMatters: 'ESU spend represents a "lifecycle tax" for technical debt. Tracking it monthly creates visibility and urgency for modernization projects.',
    lever: 'license',
    frequency: 'Monthly',
    category: 'Lifecycle'
  },
  {
    id: 'servers_past_eos',
    name: 'Servers Past End of Support',
    formula: 'Total VM and Arc instances running versions past official extended support',
    target: '0 instances',
    whyItMatters: 'Measures security vulnerability exposure, regulatory compliance risk, and potential cyber insurance invalidation.',
    lever: 'license',
    frequency: 'Monthly',
    category: 'Lifecycle'
  },
  {
    id: 'unit_cost',
    name: 'Unit Cost per Business Driver',
    formula: 'Amortized Cloud Cost ÷ Primary Business Metric (e.g. Active Tenants, Transactions, Orders)',
    target: 'Flat or declining with revenue scale',
    whyItMatters: 'The ultimate indicator of cloud efficiency. Demonstrates that business growth creates operating leverage rather than linear infrastructure bloat.',
    lever: 'usage',
    frequency: 'Monthly',
    category: 'Unit Economics'
  },
  {
    id: 'forecast_accuracy',
    name: 'Forecast Accuracy',
    formula: '1 − (|Actual Cost − Forecasted Cost| ÷ Actual Cost)',
    target: '≥ 95%',
    whyItMatters: 'Builds finance and executive trust. Prevents unexpected end-of-quarter budget adjustments.',
    lever: 'usage',
    frequency: 'Monthly',
    category: 'Governance'
  },
  {
    id: 'recommendation_realization',
    name: 'Advisor Recommendation Realization Rate',
    formula: 'Realized Monthly Savings ÷ Total Advisor & Waste Identified Savings',
    target: '≥ 60% and rising',
    whyItMatters: 'Measures organizational action. Identifies whether engineering backlogs prioritize cloud efficiency recommendations or let them languish.',
    lever: 'usage',
    frequency: 'Monthly',
    category: 'Culture & Process'
  },
  {
    id: 'ai_cost_per_outcome',
    name: 'AI Cost per Successful Outcome',
    formula: 'AI & Foundry Spend ÷ Successful Agent Tasks or User Query Resolutions',
    target: 'Declining trend',
    whyItMatters: 'Direct measure of AI ROI. Prevents open-ended agent loops or oversized reasoning models from undermining product unit economics.',
    lever: 'usage',
    frequency: 'Weekly',
    category: 'AI & Foundry'
  },
  {
    id: 'batch_cache_share',
    name: 'AI Batch & Cached Token Share',
    formula: '(Global Batch Tokens + Cached Input Tokens) ÷ Total Processed Tokens',
    target: '≥ 40% – 60% for batch workloads',
    whyItMatters: 'Tracks prompt caching architecture and batch queue adoption, cutting input token costs by 50% automatically.',
    lever: 'rate',
    frequency: 'Weekly',
    category: 'AI & Foundry'
  },
  {
    id: 'ptu_utilization',
    name: 'Provisioned Throughput (PTU) Utilization',
    formula: 'Utilized Throughput ÷ Total Provisioned Capacity',
    target: '≥ 85%',
    whyItMatters: 'Ensures dedicated model capacity delivers high ROI without leaving expensive hourly PTUs idle.',
    lever: 'rate',
    frequency: 'Daily',
    category: 'AI & Foundry'
  }
];
