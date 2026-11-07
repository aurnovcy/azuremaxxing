export interface CalculatorFaq {
  question: string;
  answer: string;
}

export interface CalculatorConstant {
  key: string;
  label: string;
  value: number | string;
  unit: string;
  lastVerified: string;
  sourceUrl: string;
  note: string;
}

export interface CalculatorDefinition {
  slug: string;
  title: string;
  summary: string;
  seo_title: string;
  meta_description: string;
  badge?: string;
  howItWorks: string;
  assumptions: string[];
  workedExample: string;
  faqs: CalculatorFaq[];
  constants: CalculatorConstant[];
  relatedTips: string[];
  relatedPlaybooks: string[];
  lastVerified: string;
}

export const CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'reservation-exchange-planner',
    title: 'Reservation Exchange Planner (Feb 1, 2027 Cutoff)',
    summary: 'Evaluate existing Azure reservations against the upcoming February 1, 2027 policy change: recommend exchange before deadline, trade-in, or hold.',
    seo_title: 'Azure Reservation Exchange Planner: Feb 1, 2027 Deadline Tool',
    meta_description: 'Interactive planner to inventory Azure reservations, evaluate post-deadline lock-in risk, and decide between pre-deadline exchange, trade-in, and hold.',
    badge: 'Critical Deadline',
    howItWorks: `At the end of July 2026, Microsoft announced that starting February 1, 2027, reservations for any service covered by an Azure savings plan (compute or databases) can no longer be exchanged. Active reservations purchased before that cutoff keep the right to one final exchange.

Because an exchange is treated technically and legally as a cancellation, refund, and new purchase, whatever reservation you receive from a post-deadline exchange is itself permanently non-exchangeable. Renewals that execute on or after February 1, 2027 are also treated as new, non-exchangeable purchases.

This calculator assesses your reservation portfolio across three core dimensions:
1. Expiration horizon: Does the reservation expire before or after February 1, 2027?
2. Architecture stability: Is the underlying VM size, family, or region guaranteed to remain unchanged for the full term, or is a migration (e.g., to Arm Cobalt or PaaS) planned?
3. Trade-in viability: Would trading in the compute or database reservation into an Azure Savings Plan provide better multi-service flexibility, even with a slightly shallower discount?

By evaluating these parameters against your inventory, the planner outputs a concrete action for every commitment: Pre-deadline exchange, Trade-in to Savings Plan, or Hold with single-exchange reserve.`,
    assumptions: [
      'Applies to services covered by Azure savings plans (Compute: VMs, App Service, Functions, Container Apps, Dedicated Hosts; Databases: SQL DB, SQL MI, PostgreSQL, MySQL, Cosmos DB provisioned throughput).',
      'Exchange before Feb 1, 2027 retains standard existing exchange rules without consuming the single post-deadline exchange.',
      'Auto-renewals after the cutoff date are created without exchange rights.',
      'Savings plan trade-in is a one-way path: savings plans cannot be converted back into reservations.'
    ],
    workedExample: 'Suppose you have 10 Standard_D8s_v5 3-year compute reservations purchased in August 2025 expiring August 2028. You plan to migrate container clusters to Cobalt Arm (Dpsv6) in mid-2027. Recommendation: Perform an exchange before Feb 1, 2027 if target SKU is ready, or reserve your single post-deadline exchange exclusively for the migration date.',
    faqs: [
      {
        question: 'What happens if I exchange a reservation after February 1, 2027?',
        answer: 'You can use your single remaining exchange right for that pre-deadline reservation. However, the new reservation you receive is immediately non-exchangeable because it was created after the cutoff.'
      },
      {
        question: 'Does this change affect storage or Red Hat reservations?',
        answer: 'The policy applies specifically to services covered by Azure savings plans. Storage reservations are currently not covered by savings plans, but the policy expands automatically as Microsoft adds services.'
      },
      {
        question: 'Can I trade in a reservation for a savings plan after the deadline?',
        answer: 'Yes, self-service trade-in of compute reservations to compute savings plans and database reservations to database savings plans remains available.'
      }
    ],
    constants: [
      {
        key: 'cutoff_date',
        label: 'Policy Cutoff Date',
        value: '2027-02-01',
        unit: 'date',
        lastVerified: '2026-10-31',
        sourceUrl: 'https://techcommunity.microsoft.com/t5/finops-blog/reservation-exchanges-for-azure-services-covered-by-savings/ba-p/4542437',
        note: 'Announced by Microsoft July 30, 2026.'
      }
    ],
    relatedTips: ['COM-02', 'COM-03', 'COM-04', 'COM-05', 'COM-06'],
    relatedPlaybooks: ['scale-up-90-day-program', 'enterprise-12-month-program'],
    lastVerified: '2026-10-31'
  },
  {
    slug: 'reservation-vs-savings-plan',
    title: 'Reservation vs Savings Plan Comparator',
    summary: 'Compare discount depth vs flexibility across compute and databases to determine break-even utilization thresholds.',
    seo_title: 'Azure Reservation vs Savings Plan Calculator: Compute & DB',
    meta_description: 'Model whether to buy an Azure Savings Plan or specific Reservations for compute and databases based on your fleet stability.',
    badge: 'Core FinOps',
    howItWorks: `Azure provides two primary commitment vehicles: Azure Reservations (resource and region-specific) and Azure Savings Plans (hourly spend commitments floating across services and regions).

Reservations offer the deepest discounts—typically 40% to 72% for 3-year terms on virtual machines and databases—but tie you to a specific instance family and region. Savings plans offer roughly 25% to 50% discounts but follow your spend automatically across VM families, Azure regions, Container Apps, and App Service.

This comparator models the mathematical trade-off:
- If a reservation provides a 60% discount and a savings plan provides 42%, the reservation breaks even when utilized at least 72% of the time.
- If your workload utilization drops below that threshold due to downsizing, re-platforming, or regional moves, the savings plan delivers a higher net Effective Savings Rate (ESR).
- With reservation exchanges disappearing for savings-plan-covered services, unutilized reservation risk is far higher than before.`,
    assumptions: [
      'Compute savings plan floats across VMs, App Service Premium v3, Functions Premium, Container Apps, and Dedicated Hosts.',
      'Database savings plan is 1-year only and floats across SQL DB, SQL MI, PostgreSQL, MySQL, and Cosmos DB throughput.',
      'Reservations apply before savings plans when both exist in scope.'
    ],
    workedExample: 'A fleet spending $10,000/month pay-as-you-go on D-series VMs. 3-yr Reservation at 62% discount = $3,800/mo. 3-yr Savings Plan at 48% discount = $5,200/mo. If the team changes VM series in 14 months and loses exchange rights, the stranded reservation loses money compared to the savings plan.',
    faqs: [
      {
        question: 'Which commitment is applied first if I have both?',
        answer: 'Azure always applies specific reservations first to eligible usage, and savings plans are consumed by remaining hourly usage.'
      },
      {
        question: 'Is there a price penalty for paying monthly instead of upfront?',
        answer: 'No. Azure charges the exact same total price for monthly payment vs upfront for both reservations and savings plans.'
      }
    ],
    constants: [
      {
        key: 'vm_3yr_ri_discount_avg',
        label: 'Average 3-Yr VM Reservation Discount',
        value: 62,
        unit: '%',
        lastVerified: '2026-10-31',
        sourceUrl: 'https://azure.microsoft.com/pricing/reserved-vm-instances',
        note: 'Published relative average for General Purpose VMs.'
      },
      {
        key: 'vm_3yr_sp_discount_avg',
        label: 'Average 3-Yr Compute Savings Plan Discount',
        value: 48,
        unit: '%',
        lastVerified: '2026-10-31',
        sourceUrl: 'https://learn.microsoft.com/azure/cost-management-billing/savings-plan/savings-plan-overview',
        note: 'Published relative average across compute families.'
      }
    ],
    relatedTips: ['COM-01', 'COM-08', 'COM-09', 'COM-17'],
    relatedPlaybooks: ['scale-up-90-day-program', 'enterprise-12-month-program'],
    lastVerified: '2026-10-31'
  },
  {
    slug: 'azure-hybrid-benefit-savings',
    title: 'Azure Hybrid Benefit Savings Estimator',
    summary: 'Calculate potential savings from applying existing Windows Server and SQL Server core licenses with Software Assurance to Azure.',
    seo_title: 'Azure Hybrid Benefit Calculator: Windows & SQL Server Cores',
    meta_description: 'Estimate your annual licensing savings by applying Azure Hybrid Benefit to Windows Server VMs and Azure SQL Database vCores.',
    badge: 'Signature Lever',
    howItWorks: `On Azure, licensing optimization is the "third lever" that can rival rate and usage optimization. Windows Server and SQL Server running at standard pay-as-you-go rates include steep OS and database software surcharges.

Under Azure Hybrid Benefit (AHB):
- Windows Server: Each 2-processor license or each 16-core pack with active Software Assurance covers up to 16 vCores on Azure VMs across one or two VMs. This slashes the base VM hourly rate by up to 40%.
- SQL Server Enterprise Edition: Each core covered by Software Assurance allows you to license 4 vCores of Azure SQL Database General Purpose or 1 vCore of Business Critical / Managed Instance.
- Stacking: AHB stacks directly on top of Azure Reservations and Savings Plans! AHB removes the licensing cost, and commitments discount the underlying base compute.`,
    assumptions: [
      'Customer owns qualifying Windows Server or SQL Server licenses with active Software Assurance or CSP subscriptions.',
      'Minimum of 8 core licenses required per VM for Windows Server AHB.',
      'SQL Server Enterprise virtualization rights provide 4x vCore ratio on Azure SQL General Purpose.'
    ],
    workedExample: 'A customer with 64 Windows Server cores and 32 SQL Server Enterprise cores. Applying Windows AHB saves ~$2,400/month in OS surcharges. Applying SQL AHB saves ~$8,800/month across Azure SQL vCores. Total annual savings: $134,400.',
    faqs: [
      {
        question: 'Does applying AHB require a reboot or downtime?',
        answer: 'No. Switching licenseType to Windows_Server or BasePrice in Azure is an instant metadata update without VM restart.'
      },
      {
        question: 'Can I use AHB for Linux distributions?',
        answer: 'Yes. Azure Hybrid Benefit also applies to Red Hat Enterprise Linux (RHEL) and SUSE Linux Enterprise Server (SLES) subscriptions.'
      }
    ],
    constants: [
      {
        key: 'windows_os_surcharge_ratio',
        label: 'Approximate Windows OS Surcharge Share',
        value: 40,
        unit: '%',
        lastVerified: '2026-10-31',
        sourceUrl: 'https://azure.microsoft.com/pricing/hybrid-benefit/',
        note: 'Published benchmark for standard compute instances.'
      }
    ],
    relatedTips: ['LIC-01', 'LIC-02', 'LIC-03', 'LIC-06'],
    relatedPlaybooks: ['scale-up-90-day-program', 'enterprise-12-month-program'],
    lastVerified: '2026-10-31'
  },
  {
    slug: 'esu-vs-upgrade-windows-server-sql-server-2016',
    title: 'ESU vs Upgrade Comparator (WS2016 & SQL2016)',
    summary: 'Model the compounding financial liability of Extended Security Updates (ESU) vs in-place modernization or Azure Arc monthly subscriptions.',
    seo_title: 'Windows Server 2016 ESU Cost vs Upgrade Calculator',
    meta_description: 'Compare Year 1, 2, and 3 Extended Security Update costs against upgrade projects for Windows Server 2016 and SQL Server 2016.',
    badge: 'Urgent Deadline',
    howItWorks: `When Microsoft products reach end of extended support (SQL Server 2016 reached EOS on July 14, 2026; Windows Server 2016 reaches EOS on January 12, 2027), organizations must pay for Extended Security Updates to receive critical security patches.

ESU pricing follows an aggressive step ladder:
- Year 1: ~75% of the original license price per year.
- Year 2: ~100% of the original license price per year.
- Year 3: ~125% of the original license price per year.

Via Azure Arc, ESUs can be purchased as a flexible monthly pay-as-you-go subscription billed through Azure. This calculator models the cumulative 36-month cost of maintaining legacy versions versus the one-time engineering investment of migrating to Windows Server 2022/2025 or Azure SQL Managed Instance.`,
    assumptions: [
      'Arc-enabled ESUs bill monthly and can be canceled as servers are retired or upgraded.',
      'SQL Server 2016 is currently in Year 1 ESU.',
      'Windows Server 2016 enters Year 1 ESU on January 13, 2027.'
    ],
    workedExample: 'A fleet of 50 Windows Server 2016 VMs (400 cores). Year 1 ESU costs ~$36,000. Year 2 ESU costs ~$48,000. Year 3 ESU costs ~$60,000. Total 3-year ESU liability = $144,000. Upgrading within 6 months saves over $120,000 in avoided compliance fees.',
    faqs: [
      {
        question: 'Are ESUs free on any Azure services?',
        answer: 'Microsoft has included ESUs on certain Azure native platforms like Azure VMware Solution, but rules vary by version. Verify against Microsoft Learn.'
      },
      {
        question: 'Does Arc-billed ESU spending count toward my MACC?',
        answer: 'Yes, Extended Security Updates billed through Azure Arc qualify as Azure consumption and draw down MACC commitments.'
      }
    ],
    constants: [
      {
        key: 'esu_year1_pct',
        label: 'Year 1 ESU Rate of License Value',
        value: 75,
        unit: '%',
        lastVerified: '2026-10-31',
        sourceUrl: 'https://www.microsoft.com/windows-server/extended-security-updates',
        note: 'Standard commercial pricing model.'
      }
    ],
    relatedTips: ['EOS-01', 'EOS-02', 'EOS-03', 'EOS-05', 'CML-03'],
    relatedPlaybooks: ['enterprise-12-month-program'],
    lastVerified: '2026-10-31'
  },
  {
    slug: 'log-analytics-plan-and-commitment-tier',
    title: 'Log Analytics Table Plan & Commitment Tier Optimizer',
    summary: 'Optimize ingestion costs by modeling Analytics vs Basic vs Auxiliary table plans and matching daily volume to commitment tiers.',
    seo_title: 'Log Analytics Cost Calculator: Table Plans & Commitment Tiers',
    meta_description: 'Calculate savings from moving verbose logs to Basic/Auxiliary table plans and committing to 100+ GB/day Log Analytics tiers.',
    howItWorks: `Log Analytics ingestion charges are among the fastest-growing lines on enterprise cloud invoices. Traditional configurations send all telemetry into the full "Analytics" table plan ($2.30/GB Pay-As-You-Go).

Two powerful levers exist:
1. Table Plans: Tables containing verbose debug, firewall, or container logs (e.g. ContainerLogV2, Syslog) can be configured to the Basic plan (~$0.65/GB) or Auxiliary plan (~$0.12/GB), slashing ingestion fees by 70% to 95%.
2. Commitment Tiers: Workspaces or dedicated clusters ingesting over 100 GB/day save substantially by switching from Pay-As-You-Go to Commitment Tiers (100, 200, 300, 400, 500, 1000, 2000, 5000 GB/day), yielding discounts up to 30% to 50%.`,
    assumptions: [
      'Basic tables support 8-day interactive retention and limited KQL capabilities.',
      'Commitment tier applies to billable ingestion volume over a 31-day minimum commitment.',
      'Unused commitment volume in a tier is billed at the commitment rate.'
    ],
    workedExample: 'Ingesting 350 GB/day on Pay-As-You-Go (~$24,000/mo). Moving 150 GB/day of debug logs to Basic tables saves $7,400/mo. Purchasing a 200 GB/day commitment tier for the remaining Analytics logs saves an additional $2,100/mo. Total savings: $9,500/mo (40%).',
    faqs: [
      {
        question: 'Can I change my commitment tier at any time?',
        answer: 'You can increase your tier at any time. Decreasing or canceling requires a 31-day commitment waiting period.'
      }
    ],
    constants: [
      {
        key: 'payg_log_ingest',
        label: 'Pay-As-You-Go Ingestion Baseline',
        value: 2.30,
        unit: '$/GB',
        lastVerified: '2026-10-31',
        sourceUrl: 'https://azure.microsoft.com/pricing/details/monitor/',
        note: 'Standard US East benchmark.'
      }
    ],
    relatedTips: ['MON-01', 'MON-02', 'MON-05', 'MON-06'],
    relatedPlaybooks: ['scale-up-90-day-program', 'enterprise-12-month-program'],
    lastVerified: '2026-10-31'
  },
  {
    slug: 'storage-tier-and-lifecycle',
    title: 'Storage Tier & Lifecycle Policy Estimator',
    summary: 'Model cost reduction across Hot, Cool, Cold, and Archive Blob storage based on access frequency and data aging.',
    seo_title: 'Azure Storage Tier Calculator: Hot vs Cool vs Cold vs Archive',
    meta_description: 'Estimate storage bill savings by automating blob tier transitions from Hot to Cool, Cold, and Archive storage.',
    howItWorks: `Blob storage pricing balances capacity cost against read/write access and transaction fees.
- Hot: Highest capacity price, lowest transaction and data retrieval fees. Ideal for active working sets.
- Cool: ~50% cheaper capacity than Hot, with moderate retrieval fees. Ideal for data accessed less than once a month.
- Cold: ~75% cheaper capacity than Hot, 90-day minimum retention. Ideal for quarterly audit records.
- Archive: ~90% cheaper capacity than Hot, requires hours to rehydrate before reading. Ideal for multi-year compliance archives.

Automating these transitions with Azure Blob Lifecycle Management eliminates manual effort and ensures older data immediately drops to the lowest possible cost tier.`,
    assumptions: [
      'Minimum retention periods: Cool (30 days), Cold (90 days), Archive (180 days). Early deletion incurs pro-rated fees.',
      'Archive tier data requires rehydration time and data retrieval charges before reading.'
    ],
    workedExample: 'A 100 TB log archive stored in Hot Blob costs ~$2,000/month. Moving blobs older than 30 days to Cool and older than 90 days to Cold drops the monthly bill to ~$600/month (70% savings).',
    faqs: [
      {
        question: 'Can lifecycle management delete blobs automatically?',
        answer: 'Yes, lifecycle rules support delete actions based on daysAfterModificationGreaterThan or daysAfterCreationGreaterThan.'
      }
    ],
    constants: [
      {
        key: 'hot_blob_rate',
        label: 'Hot Tier LRS Storage Rate',
        value: 0.018,
        unit: '$/GB/mo',
        lastVerified: '2026-10-31',
        sourceUrl: 'https://azure.microsoft.com/pricing/details/storage/blobs/',
        note: 'Published US East base rate.'
      }
    ],
    relatedTips: ['STG-01', 'STG-02', 'STG-03'],
    relatedPlaybooks: ['startup-30-day-plan', 'scale-up-90-day-program'],
    lastVerified: '2026-10-31'
  },
  {
    slug: 'non-production-scheduling-savings',
    title: 'Non-Production Scheduling & Auto-Shutdown Savings',
    summary: 'Calculate compute and database savings from turning off dev and test environments during nights and weekends.',
    seo_title: 'Azure Auto-Shutdown Calculator: Dev/Test Scheduling Savings',
    meta_description: 'Calculate how much your team saves by deallocating dev/test VMs and stopping databases during off-hours (128 hours/week idle).',
    howItWorks: `A standard week has 168 hours. A typical engineering team works approximately 40 hours per week (8am–5pm, Monday–Friday).

If development and test environments run 24 hours a day, 7 days a week:
- Productive working hours: 40 hours (24% of the week)
- Completely idle off-hours: 128 hours (76% of the week)

By implementing automated scheduling (Start/Stop VMs v2, Azure SQL Serverless auto-pause, PostgreSQL flexible server schedules, and AKS stop/start), you stop paying compute charges for 76% of the month on all non-production resources.`,
    assumptions: [
      'Storage and disks continue to bill while compute is deallocated or stopped.',
      'Assumes standard business schedule (e.g. 50 hours active per week, 118 hours deallocated).'
    ],
    workedExample: '20 development VMs costing $4,000/month on 24/7 compute. Deallocating nights (7pm–7am) and weekends reduces compute runtime by ~65%, saving $2,600/month ($31,200/year).',
    faqs: [
      {
        question: 'Does stopping a VM delete its data?',
        answer: 'No. OS and data disks persist safely in Azure Managed Disks. When started, the VM resumes with all data intact.'
      }
    ],
    constants: [
      {
        key: 'total_hours_in_week',
        label: 'Hours in a Standard Week',
        value: 168,
        unit: 'hours',
        lastVerified: '2026-10-31',
        sourceUrl: 'https://learn.microsoft.com/azure/automation/automation-solution-vm-management',
        note: 'Standard mathematical baseline.'
      }
    ],
    relatedTips: ['VM-01', 'VM-04', 'VM-05', 'DB-01', 'AKS-08'],
    relatedPlaybooks: ['startup-30-day-plan', 'scale-up-90-day-program'],
    lastVerified: '2026-10-31'
  },
  {
    slug: 'azure-openai-standard-vs-batch-vs-ptu',
    title: 'Azure OpenAI: Standard vs Batch vs PTU Break-Even',
    summary: 'Determine break-even token volume between Pay-As-You-Go Standard, Global Batch (50% off), and Provisioned Throughput (PTU).',
    seo_title: 'Azure OpenAI Cost Calculator: Standard vs Batch vs PTU',
    meta_description: 'Model break-even points between Pay-As-You-Go, Global Batch, and Provisioned Throughput Units (PTU) for Azure OpenAI and Foundry.',
    howItWorks: `Azure OpenAI and Microsoft Foundry provide three consumption and pricing mechanisms:
1. Standard Deployments (Pay-As-You-Go): Billed per 1,000 tokens (input and output). Ideal for variable, low-to-moderate interactive user traffic.
2. Global Batch Deployments: 50% discount on input and output tokens with a 24-hour turnaround target. Ideal for offline document summarization, embeddings, and evaluations.
3. Provisioned Throughput Units (PTU): Billed for dedicated model capacity per hour or month, regardless of tokens processed. Essential for high, predictable volume and latency SLAs.

PTU reaches break-even when your continuous token throughput utilizes at least 70% to 80% of the provisioned unit capacity over a monthly commitment.`,
    assumptions: [
      'Global Batch provides an exact 50% discount on corresponding standard rates.',
      'Monthly or annual PTU commitments deliver deeper discounts than hourly on-demand PTUs.',
      'Prompt caching delivers automatic 50% discount on cached inputs on standard deployments.'
    ],
    workedExample: 'Processing 200 million input tokens and 50 million output tokens monthly on GPT-4o. Moving 100M tokens to Global Batch saves $1,250. Optimizing prompt caching on the remaining interactive traffic saves another $1,000.',
    faqs: [
      {
        question: 'Can I mix PTU and Pay-As-You-Go?',
        answer: 'Yes. The best-practice architecture sizes PTU to cover the 80th percentile steady baseline, and allows peak spikes to spill over into Standard Pay-As-You-Go.'
      }
    ],
    constants: [
      {
        key: 'batch_discount_ratio',
        label: 'Global Batch Published Discount',
        value: 50,
        unit: '%',
        lastVerified: '2026-10-31',
        sourceUrl: 'https://learn.microsoft.com/azure/ai-services/openai/how-to/batch',
        note: 'Published Microsoft rate.'
      }
    ],
    relatedTips: ['AI-02', 'AI-03', 'AI-04', 'AI-07', 'AI-08'],
    relatedPlaybooks: ['scale-up-90-day-program', 'enterprise-12-month-program'],
    lastVerified: '2026-10-31'
  },
  {
    slug: 'cosmos-db-autoscale-vs-manual-vs-serverless',
    title: 'Cosmos DB: Autoscale vs Manual vs Serverless',
    summary: 'Compare costs across Cosmos DB provisioned manual RU/s, autoscale RU/s, and serverless based on request volume and duty cycle.',
    seo_title: 'Cosmos DB Cost Calculator: Serverless vs Autoscale vs Manual',
    meta_description: 'Identify the cheapest Cosmos DB pricing model based on request patterns, burst factors, and commitment eligibility.',
    howItWorks: `Cosmos DB throughput is metered in Request Units (RU/s). Choosing the wrong model can lead to a 3x to 5x higher invoice.

- Serverless: You pay strictly per RU consumed ($0.25 per 1M RUs). Ideal for light workloads with low traffic and long quiet intervals (<10% duty cycle).
- Autoscale: You specify a maximum RU/s (e.g. 4,000 RU/s), and Azure scales dynamically between 10% and 100% (400 to 4,000 RU/s) based on instantaneous request spikes. Ideal for traffic with predictable diurnal variation.
- Manual Provisioned: You fix a constant throughput 24/7. Cheaper unit rate than autoscale, but bills 100% capacity continuously. Eligible for Cosmos reservations and the Database Savings Plan!`,
    assumptions: [
      'Cosmos DB Serverless is capped at 50 GB storage and 5,000 RU/s per container.',
      'Serverless is NOT eligible for the Database Savings Plan or Cosmos reservations.',
      'Autoscale bills hourly for the highest RU/s recorded during that hour.'
    ],
    workedExample: 'A microservice consuming 500 RU/s average with occasional 2,000 RU/s spikes. Serverless costs ~$80/mo. Autoscale (max 2,000 RU/s) averages ~$120/mo. Manual provisioned (2,000 RU/s) costs ~$175/mo.',
    faqs: [
      {
        question: 'Can I convert a serverless Cosmos account to provisioned throughput?',
        answer: 'No. Serverless accounts cannot be directly converted to provisioned; you must create a new account and migrate data via Azure Data Factory or Change Feed.'
      }
    ],
    constants: [
      {
        key: 'cosmos_serverless_rate',
        label: 'Cosmos Serverless RU Rate',
        value: 0.25,
        unit: '$/1M RUs',
        lastVerified: '2026-10-31',
        sourceUrl: 'https://azure.microsoft.com/pricing/details/cosmos-db/',
        note: 'Published standard rate.'
      }
    ],
    relatedTips: ['DB-11', 'DB-12', 'DB-13', 'COM-15'],
    relatedPlaybooks: ['startup-30-day-plan', 'scale-up-90-day-program'],
    lastVerified: '2026-10-31'
  },
  {
    slug: 'startup-post-credit-cliff',
    title: 'Startup Post-Credit Cliff & Runway Estimator',
    summary: 'Forecast credit expiration date, estimate the unoptimized post-credit cash invoice, and model the buffer gained from early optimization.',
    seo_title: 'Azure Credit Cliff Calculator: Startup Runway Forecaster',
    meta_description: 'Forecast the exact month your Microsoft for Startups credits will expire and calculate your net cash runway extension with FinOps.',
    howItWorks: `Venture-backed startups frequently build infrastructure rapidly during early credit programs (such as Microsoft for Startups Founders Hub), paying zero dollars out of pocket.

When credits reach zero, the full, unoptimized retail bill suddenly hits the corporate credit card. Without pre-planning:
- Oversized VM instances and premium disks cause immediate cash burn shock.
- Development environments left running 24/7 drain bank balances.
- Founders are forced into emergency triage.

This estimator takes your remaining credit balance, monthly burn rate, and projected monthly growth rate to calculate the exact cliff month and models how much cash is preserved by buying a modest 1-year monthly savings plan 60 days before the cliff.`,
    assumptions: [
      'Microsoft for Startups credits expire after 12 months or when exhausted, whichever occurs first.',
      '1-year compute savings plan paid monthly requires zero upfront cash.',
      'Dev/Test environments can be moved to Azure Dev/Test subscription offers before credit depletion.'
    ],
    workedExample: 'A startup with $25,000 credits remaining burning $5,000/month with 10% monthly growth. Credits exhaust in 4.5 months. Post-cliff invoice will be ~$7,500/month. Pre-cliff cleanup and a small savings plan reduces this to $4,600/month, preserving $35,000 in cash over the following year.',
    faqs: [
      {
        question: 'Do Azure credits cover third-party Marketplace software?',
        answer: 'Most startup credit offers exclude third-party Marketplace software and Azure support plans. Verify your specific agreement terms.'
      }
    ],
    constants: [
      {
        key: 'startup_sp_reduction_pct',
        label: 'Estimated Post-Cliff Savings Plan Reduction',
        value: 32,
        unit: '%',
        lastVerified: '2026-10-31',
        sourceUrl: 'https://learn.microsoft.com/azure/cost-management-billing/savings-plan/savings-plan-overview',
        note: '1-year compute savings plan average.'
      }
    ],
    relatedTips: ['STU-03', 'STU-04', 'STU-05', 'COM-13'],
    relatedPlaybooks: ['startup-30-day-plan'],
    lastVerified: '2026-10-31'
  }
];
