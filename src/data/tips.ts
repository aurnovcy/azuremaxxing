import { Tip } from '../types';

export const DOMAINS: Record<string, { name: string; prefix: string; description: string }> = {
  'commitments': { name: 'Commitments (Savings Plans & Reservations)', prefix: 'COM', description: 'Portfolios, exchange policies, and reservation vs savings plan strategies.' },
  'azure-hybrid-benefit': { name: 'Azure Hybrid Benefit & Licensing', prefix: 'LIC', description: 'Software Assurance, SQL Server centralized management, and edition rightsizing.' },
  'virtual-machines': { name: 'Virtual Machines', prefix: 'VM', description: 'Deallocation, rightsizing, Cobalt Arm adoption, Spot, and burstable B-series.' },
  'aks-containers': { name: 'AKS & Containers', prefix: 'AKS', description: 'Karpenter node auto-provisioning, cost analysis add-on, and Spot node pools.' },
  'app-service-functions': { name: 'App Service & Functions', prefix: 'APP', description: 'Empty plan cleanup, Flex Consumption, and consolidation.' },
  'storage': { name: 'Blob & File Storage', prefix: 'STG', description: 'Access tiering, lifecycle policies, and redundancy optimization.' },
  'disks-backup': { name: 'Managed Disks & Backup', prefix: 'DSK', description: 'Unattached disk sweeps, Premium SSD v2, and snapshot lifecycle.' },
  'databases': { name: 'Databases & Cosmos DB', prefix: 'DB', description: 'Serverless SQL auto-pause, database savings plan, and Cosmos RU tuning.' },
  'networking': { name: 'Networking & Data Transfer', prefix: 'NET', description: 'Egress mapping, idle gateway pruning, and VNet flow log filtering.' },
  'monitoring-observability': { name: 'Monitoring & Observability', prefix: 'MON', description: 'Log Analytics table plans, DCR transformations, and workspace consolidation.' },
  'data-analytics': { name: 'Data & Analytics', prefix: 'DATA', description: 'Fabric capacity scheduling, Databricks auto-termination, and Synapse pausing.' },
  'ai-foundry': { name: 'AI & Microsoft Foundry', prefix: 'AI', description: 'Prompt caching, batch deployments, PTU sizing, and token governance.' },
  'security': { name: 'Security Services', prefix: 'SEC', description: 'Defender for Cloud tiering, Sentinel table plans, and Key Vault caching.' },
  'lifecycle-esu': { name: 'Lifecycle, End of Support & ESUs', prefix: 'EOS', description: 'Windows/SQL Server 2016 milestones, Azure Arc pay-as-you-go ESUs, and modernization.' },
  'commercial-levers': { name: 'Commercial Levers & Programs', prefix: 'CML', description: 'MACC negotiation, Marketplace burn-down, and Microsoft for Startups.' },
  'automation-shift-left': { name: 'Automation & Shift-Left', prefix: 'AUT', description: 'Infracost PR checks, policy-as-code, and automated orphan cleanup.' },
  'governance-budgets': { name: 'Governance & Budgets', prefix: 'GOV', description: 'Budgets with action groups, anomaly alerts, and SKU restriction policies.' },
  'visibility-reporting': { name: 'Visibility, Data & Reporting', prefix: 'VIS', description: 'FOCUS exports, FinOps hubs, and ARM MCP cost toolsets.' },
  'tags-allocation': { name: 'Tags & Cost Allocation', prefix: 'TAG', description: 'Tag inheritance, allocation rules, and AKS namespace showback.' },
  'culture-process': { name: 'Culture & Process', prefix: 'CUL', description: 'Unit cost targets, non-functional cost requirements, and FinOps game days.' },
  'startup-quick-wins': { name: 'Startup Quick Wins', prefix: 'STU', description: 'Post-credit cliff runway, single-region start, and Dev/Test subscriptions.' },
  'billing-hierarchy': { name: 'Billing Accounts & Subscriptions', prefix: 'ORG', description: 'Management group hierarchy, subscription vending, and agreement scopes.' },
};

export const TIPS: Tip[] = [
  {
    id: 'COM-02',
    slug: 'february-2027-reservation-deadline',
    title: 'Treat February 1, 2027 as a planning deadline',
    domain: 'commitments',
    domainName: 'Commitments (Savings Plans & Reservations)',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'low',
    impact: 3,
    lever: 'rate',
    services: ['Azure Reservations', 'Azure savings plans'],
    summary: 'Reservations for savings-plan-covered services lose exchange rights for new purchases; existing ones keep one final exchange.',
    seo_title: 'Azure Reservation Exchange Ends Feb 1, 2027: What To Do Now',
    meta_description: 'Reservation exchanges end for savings-plan-covered services on Feb 1, 2027. Inventory your reservations, decide exchange vs trade-in vs hold, and avoid lock-in.',
    how_to: [
      'Inventory all existing active reservations across all subscriptions and management groups using Azure Portal or Cost Details API.',
      'Identify instances where the underlying VM size, family, or region is slated to change within the next 12 to 36 months.',
      'Execute pre-deadline exchanges prior to Feb 1, 2027 to align commitments with your target cloud architecture.',
      'Flag any reservation auto-renew settings: renewals after Feb 1, 2027 are treated as new non-exchangeable purchases.',
      'Consider self-service trade-in to an Azure Savings Plan for compute or databases where multi-service flexibility is required.'
    ],
    snippets: [
      {
        language: 'bash',
        title: 'List Active Reservations via Azure CLI',
        code: `az reservations reservation list \\
  --query "[?properties.provisioningState=='Succeeded'].{Name:name, Sku:sku.name, Term:properties.term, Expiry:properties.expiryDate, AutoRenew:properties.renew}" \\
  -o table`
      }
    ],
    verify: 'Reservation inventory completed in D03 Commitment Command Center; all auto-renew flags audited and post-2027 commitments documented.',
    related: ['COM-03', 'COM-04', 'COM-05', 'COM-06', 'COM-08'],
    dashboard: ['D03'],
    kpi: ['commitment_utilization', 'effective_savings_rate'],
    docs: ['https://techcommunity.microsoft.com/t5/finops-blog/reservation-exchanges-for-azure-services-covered-by-savings/ba-p/4542437', 'https://learn.microsoft.com/azure/cost-management-billing/reservations/exchange-and-refund-azure-reservations'],
    last_verified: '2026-10-31'
  },
  {
    id: 'COM-01',
    slug: 'know-the-commitment-menu',
    title: 'Know the commitment menu: Savings Plans vs Reservations',
    domain: 'commitments',
    domainName: 'Commitments (Savings Plans & Reservations)',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'low',
    impact: 3,
    lever: 'rate',
    services: ['Azure Reservations', 'Azure savings plans', 'Spot VMs'],
    summary: 'Master the interplay between compute savings plans, database savings plans, specific reservations, and Spot instances.',
    seo_title: 'Azure Commitment Menu: Savings Plans vs Reservations Compared',
    meta_description: 'Compare Azure compute savings plans, database savings plans, and reservations to maximize discount depth without overcommitting.',
    how_to: [
      'Layer commitments: baseline steady-state compute with reservations, dynamic compute with savings plans, and spike capacity with Spot.',
      'Use 1-year database savings plans to float across SQL DB, Managed Instance, PostgreSQL, MySQL, and Cosmos DB provisioned throughput.',
      'Calculate your historical utilization floor over 90 days before committing.'
    ],
    snippets: [
      {
        language: 'powershell',
        title: 'Get Savings Plan Recommendations',
        code: `Get-AzBillingBenefitsSavingsPlanOrderRecommendation -ScopeType 'Single' -Scope '/subscriptions/{sub-id}'`
      }
    ],
    verify: 'Effective Savings Rate (ESR) reaches >25% on steady state compute without dropping reservation utilization below 95%.',
    related: ['COM-02', 'COM-08', 'COM-09'],
    dashboard: ['D03'],
    kpi: ['commitment_coverage', 'commitment_utilization'],
    docs: ['https://learn.microsoft.com/azure/cost-management-billing/savings-plan/savings-plan-overview'],
    last_verified: '2026-10-31'
  },
  {
    id: 'COM-07',
    slug: 'shrink-first-then-commit',
    title: 'The Golden Rule: Shrink first, then commit',
    domain: 'commitments',
    domainName: 'Commitments (Savings Plans & Reservations)',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'low',
    impact: 3,
    lever: 'rate',
    services: ['Azure Virtual Machines', 'Azure Reservations'],
    summary: 'Never purchase reservations on oversized or zombie resources. Complete cleanup and rightsizing before locking in commitments.',
    seo_title: 'Why You Must Shrink Before Committing on Azure',
    meta_description: 'With reservation exchanges ending, buying commitments on oversized resources locks in waste. Follow the FinOps order of operations.',
    how_to: [
      'Step 1: Run Resource Graph waste queries to delete unattached disks and idle IPs.',
      'Step 2: Collect 30-day memory metrics and downsize underutilized VMs and SQL databases.',
      'Step 3: Schedule auto-shutdown on dev/test environments.',
      'Step 4: Only commit to the resulting trimmed floor.'
    ],
    snippets: [],
    verify: 'Advisor rightsizing backlog resolved for candidate workloads prior to issuing purchase order.',
    related: ['COM-02', 'VM-01', 'VM-02', 'DB-03'],
    dashboard: ['D03', 'D04', 'D06'],
    kpi: ['commitment_utilization', 'unused_commitment_cost'],
    docs: ['https://learn.microsoft.com/azure/advisor/advisor-cost-recommendations'],
    last_verified: '2026-10-31'
  },
  {
    id: 'LIC-01',
    slug: 'apply-azure-hybrid-benefit-windows-vm',
    title: 'Apply Azure Hybrid Benefit to every eligible Windows Server VM',
    domain: 'azure-hybrid-benefit',
    domainName: 'Azure Hybrid Benefit & Licensing',
    audience: ['enterprise', 'scaleup'],
    effort: 'low',
    impact: 3,
    lever: 'license',
    services: ['Azure Virtual Machines', 'Windows Server'],
    summary: 'Software Assurance and qualifying subscriptions eliminate the base Windows license rate on VMs, saving up to 40% on compute cost.',
    seo_title: 'Azure Hybrid Benefit for Windows Server: How to Apply & Save',
    meta_description: 'Step-by-step guide to applying Azure Hybrid Benefit to Windows VMs with Azure CLI and Resource Graph to save up to 40% immediately.',
    how_to: [
      'Verify eligible Windows Server core licenses covered with active Software Assurance or Cloud Solution Provider subscriptions.',
      'Run the Resource Graph query to detect all Windows VMs currently billed at pay-as-you-go license rates.',
      'Update each VM license type to Windows_Server in-place without reboot.'
    ],
    snippets: [
      {
        language: 'bash',
        title: 'Apply AHB to a Windows VM',
        code: `az vm update -g <resource-group> -n <vm-name> --license-type Windows_Server`
      },
      {
        language: 'kusto',
        title: 'Find Windows VMs missing AHB',
        code: `Resources
| where type =~ 'microsoft.compute/virtualmachines'
| where tostring(properties.storageProfile.osDisk.osType) =~ 'Windows'
| extend licenseType = tostring(properties.licenseType)
| where licenseType !in~ ('Windows_Server', 'Windows_Client')
| project name, resourceGroup, subscriptionId, location, vmSize = tostring(properties.hardwareProfile.vmSize)`
      }
    ],
    verify: 'Query returns zero unentitled Windows VMs; Cost Analysis shows Windows OS surcharge reduced to $0 on amortized bills.',
    related: ['LIC-02', 'LIC-03', 'LIC-05', 'LIC-06'],
    dashboard: ['D05'],
    kpi: ['ahb_coverage'],
    docs: ['https://learn.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing'],
    last_verified: '2026-10-31'
  },
  {
    id: 'LIC-02',
    slug: 'apply-ahb-to-sql-server',
    title: 'Apply AHB to SQL Server (DB, MI, and IaaS)',
    domain: 'azure-hybrid-benefit',
    domainName: 'Azure Hybrid Benefit & Licensing',
    audience: ['enterprise', 'scaleup'],
    effort: 'low',
    impact: 3,
    lever: 'license',
    services: ['Azure SQL Database', 'Azure SQL Managed Instance', 'SQL Server on Azure VMs'],
    summary: 'SQL Server licensing often exceeds the underlying compute cost. AHB slashes vCore licensing fees across PaaS and IaaS.',
    seo_title: 'SQL Server Azure Hybrid Benefit: Cut SQL vCore Costs by 55%',
    meta_description: 'Apply SQL Server Hybrid Benefit to Azure SQL DB, Managed Instance, and Azure VMs to dramatically lower licensing costs.',
    how_to: [
      'In Azure Portal or CLI, toggle SQL Server license type to BasePrice (Azure Hybrid Benefit).',
      'For SQL VMs, register with the SQL IaaS Agent Extension to switch license type without redeploying.',
      'Leverage 4 vCores of Azure SQL Database General Purpose for every 1 SQL Server Enterprise edition core under Software Assurance virtualization rights.'
    ],
    snippets: [
      {
        language: 'bash',
        title: 'Set AHB on Azure SQL Database',
        code: `az sql db update -g <rg> -s <server> -n <db> --license-type BasePrice`
      }
    ],
    verify: 'Invoice line item for SQL Server licensing switches to Base Compute only.',
    related: ['LIC-01', 'LIC-03', 'LIC-08', 'DB-04'],
    dashboard: ['D05', 'D13'],
    kpi: ['ahb_coverage'],
    docs: ['https://learn.microsoft.com/azure/azure-sql/azure-hybrid-benefit'],
    last_verified: '2026-10-31'
  },
  {
    id: 'LIC-03',
    slug: 'centralized-sql-ahb-management',
    title: 'Use centralized AHB management for SQL Server',
    domain: 'azure-hybrid-benefit',
    domainName: 'Azure Hybrid Benefit & Licensing',
    audience: ['enterprise'],
    effort: 'low',
    impact: 2,
    lever: 'license',
    services: ['Azure SQL Database', 'Azure SQL Managed Instance', 'Microsoft Cost Management'],
    summary: 'Assign SQL Server core licenses at the billing scope or subscription level rather than manually toggling individual databases.',
    seo_title: 'Centralized Azure Hybrid Benefit for SQL: Enterprise Guide',
    meta_description: 'Centralize SQL Server AHB license assignment across EA and MCA billing accounts for automatic discount pooling.',
    how_to: [
      'Navigate to Cost Management + Billing > Reservations + Hybrid Benefit.',
      'Assign pooled SQL Server Enterprise and Standard core licenses to designated subscription or billing scopes.',
      'Azure automatically applies the discount dynamically to the highest-consuming SQL vCore instances.'
    ],
    snippets: [],
    verify: 'Central license pool displays 95%+ utilization without over-allocating on-premises licenses.',
    related: ['LIC-01', 'LIC-02', 'ORG-01'],
    dashboard: ['D05'],
    kpi: ['ahb_coverage'],
    docs: ['https://learn.microsoft.com/azure/cost-management-billing/manage/azure-hybrid-benefit-scope'],
    last_verified: '2026-10-31'
  },
  {
    id: 'VM-01',
    slug: 'deallocate-dont-just-stop-vms',
    title: 'Deallocate, don\'t just stop: Avoid phantom compute charges',
    domain: 'virtual-machines',
    domainName: 'Virtual Machines',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'low',
    impact: 3,
    lever: 'usage',
    services: ['Azure Virtual Machines'],
    summary: 'A VM stopped from inside the operating system remains in "Stopped" state and continues billing for compute; only "Stopped (deallocated)" ceases charges.',
    seo_title: 'Stopped vs Deallocated Azure VMs: Stop Paying for Compute',
    meta_description: 'Learn why shutting down a VM from Windows or Linux still bills for compute. Use az vm deallocate to eliminate phantom charges.',
    how_to: [
      'Inspect your VM fleet using the Resource Graph query for powerState == "PowerState/stopped".',
      'Always use Azure Portal, Azure CLI, or Automation runbooks to stop VMs, never OS shutdown commands alone.',
      'Configure auto-shutdown or scheduled runbooks that invoke the deallocate API.'
    ],
    snippets: [
      {
        language: 'bash',
        title: 'Properly Deallocate a VM via Azure CLI',
        code: `az vm deallocate -g <resource-group> -n <vm-name>`
      },
      {
        language: 'kusto',
        title: 'Detect VMs stopped but not deallocated',
        code: `Resources
| where type =~ 'microsoft.compute/virtualmachines'
| extend powerState = tostring(properties.extended.instanceView.powerState.code)
| where powerState =~ 'PowerState/stopped'
| project name, resourceGroup, subscriptionId, location, size = tostring(properties.hardwareProfile.vmSize)`
      }
    ],
    verify: 'Resource Graph query returns zero rows; no compute charges accrued for halted developer instances.',
    related: ['VM-04', 'VM-05', 'AUT-04'],
    dashboard: ['D04'],
    kpi: ['waste_percent', 'orphan_spend_share'],
    docs: ['https://learn.microsoft.com/azure/virtual-machines/states-billing'],
    last_verified: '2026-10-31'
  },
  {
    id: 'VM-08',
    slug: 'evaluate-arm-cobalt-vms',
    title: 'Evaluate Arm-based Cobalt VMs for up to 40% price-performance gain',
    domain: 'virtual-machines',
    domainName: 'Virtual Machines',
    audience: ['scaleup', 'enterprise'],
    effort: 'med',
    impact: 3,
    lever: 'usage',
    services: ['Azure Virtual Machines', 'Azure Cobalt 100'],
    summary: 'Azure Cobalt 100 processor-based VM series deliver dramatic performance per dollar for cloud-native Linux microservices, open-source DBs, and web tiers.',
    seo_title: 'Azure Arm Cobalt 100 VMs: 40% Better Price-Performance',
    meta_description: 'Migrate Linux workloads and container images to Cobalt Arm instances for improved energy efficiency and lower cost per vCPU.',
    how_to: [
      'Audit container workloads and services for multi-arch (ARM64) Docker image support.',
      'Deploy pilot node pools or test VM instances on Cobalt series.',
      'Benchmark throughput and tail latency against equivalent x86-64 instances.'
    ],
    snippets: [
      {
        language: 'bash',
        title: 'Deploy an Arm-based VM',
        code: `az vm create -g <rg> -n myCobaltVM --image Canonical:0001-com-ubuntu-server-jammy:22_04-lts-arm64:latest --size Standard_D4ps_v6`
      }
    ],
    verify: 'Cost per transaction drops by 20–40% on production benchmarked microservices.',
    related: ['VM-07', 'VM-09', 'AKS-07'],
    dashboard: ['D06', 'D21'],
    kpi: ['modern_series_share', 'arm_spot_share', 'unit_cost'],
    docs: ['https://learn.microsoft.com/azure/virtual-machines/sizes/general-purpose/dpsv6-series'],
    last_verified: '2026-10-31'
  },
  {
    id: 'VM-10',
    slug: 'run-interruptible-work-on-spot',
    title: 'Run interruptible work on Spot VMs for up to 90% discount',
    domain: 'virtual-machines',
    domainName: 'Virtual Machines',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'med',
    impact: 3,
    lever: 'rate',
    services: ['Azure Spot Virtual Machines', 'Virtual Machine Scale Sets'],
    summary: 'Spot VMs monetize spare Azure capacity at deep discounts. Perfect for batch processing, CI/CD runners, and stateless workloads.',
    seo_title: 'Azure Spot VMs Guide: Run Workloads at up to 90% Off',
    meta_description: 'Use Azure Spot instances with eviction policies and Spot Priority Mix in scale sets to cut compute bills safely.',
    how_to: [
      'Select eviction policy: "Deallocate" for fast resumption, or "Delete" for transient stateless jobs.',
      'Set max-price to -1 so the instance is never evicted due to pricing fluctuations (only capacity demand).',
      'In VM Scale Sets, configure Spot Priority Mix to maintain a baseline of regular VMs and burst on Spot.'
    ],
    snippets: [
      {
        language: 'bash',
        title: 'Create a Spot VM with Azure CLI',
        code: `az vm create -g <rg> -n spotRunner --image Ubuntu2204 --priority Spot --eviction-policy Deallocate --max-price -1 --size Standard_D4s_v5`
      }
    ],
    verify: 'CI runner compute bill decreases by >70% with acceptable job re-queue rates.',
    related: ['VM-11', 'AKS-06', 'COM-20'],
    dashboard: ['D06'],
    kpi: ['arm_spot_share', 'effective_savings_rate'],
    docs: ['https://learn.microsoft.com/azure/virtual-machines/spot-vms'],
    last_verified: '2026-10-31'
  },
  {
    id: 'AKS-01',
    slug: 'enable-aks-cost-analysis-addon',
    title: 'Enable the AKS cost analysis add-on for namespace visibility',
    domain: 'aks-containers',
    domainName: 'AKS & Containers',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'low',
    impact: 3,
    lever: 'usage',
    services: ['Azure Kubernetes Service', 'Microsoft Cost Management'],
    summary: 'Transforms opaque multi-tenant AKS clusters into granular, namespace and pod-level cost breakdowns in Azure Cost Management.',
    seo_title: 'AKS Cost Analysis Add-On: Allocate Kubernetes Costs by Namespace',
    meta_description: 'Enable the native AKS cost analysis add-on to allocate cluster infrastructure spend to namespaces and microservice teams.',
    how_to: [
      'Enable the cost analysis add-on on your AKS cluster via CLI or Portal.',
      'Allow OpenCost telemetry ingestion into your Azure Cost Management pipeline.',
      'View amortized cost filtered by Kubernetes namespace in Cost Analysis smart views.'
    ],
    snippets: [
      {
        language: 'bash',
        title: 'Enable Cost Analysis Add-On on AKS',
        code: `az aks update -g <resource-group> -n <cluster-name> --enable-cost-analysis`
      }
    ],
    verify: 'Namespace and workload dimensions appear in Cost Analysis under the cluster resource.',
    related: ['AKS-02', 'AKS-03', 'TAG-06'],
    dashboard: ['D07', 'D11'],
    kpi: ['tag_coverage', 'unit_cost'],
    docs: ['https://learn.microsoft.com/azure/aks/cost-analysis'],
    last_verified: '2026-10-31'
  },
  {
    id: 'AKS-05',
    slug: 'node-auto-provisioning-karpenter',
    title: 'Use node auto-provisioning (Karpenter) to eliminate bin-packing waste',
    domain: 'aks-containers',
    domainName: 'AKS & Containers',
    audience: ['scaleup', 'enterprise'],
    effort: 'med',
    impact: 3,
    lever: 'usage',
    services: ['Azure Kubernetes Service', 'Karpenter'],
    summary: 'Karpenter-based node auto-provisioning launches right-sized VMs on-demand for pending pods, aggressively consolidating empty nodes.',
    seo_title: 'Karpenter on AKS: Node Auto-Provisioning for Maximum Efficiency',
    meta_description: 'Eliminate over-provisioned node pools in AKS with Karpenter node auto-provisioning, rightsizing, and automatic consolidation.',
    how_to: [
      'Enable Node Auto-Provisioning (NAP) on AKS clusters.',
      'Define NodePool constraints specifying permissible VM families (e.g., Cobalt Dpsv6 and Spot instances).',
      'Observe Karpenter consolidating fragmented pods onto minimal VM footprints during off-peak hours.'
    ],
    snippets: [],
    verify: 'Average cluster CPU and memory utilization increases from 35% to >75%.',
    related: ['AKS-03', 'AKS-04', 'AKS-06'],
    dashboard: ['D06', 'D11'],
    kpi: ['unit_cost', 'arm_spot_share'],
    docs: ['https://learn.microsoft.com/azure/aks/node-autoprovisioning'],
    last_verified: '2026-10-31'
  },
  {
    id: 'DSK-01',
    slug: 'delete-unattached-managed-disks',
    title: 'Delete unattached managed disks immediately',
    domain: 'disks-backup',
    domainName: 'Managed Disks & Backup',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'low',
    impact: 2,
    lever: 'usage',
    services: ['Azure Managed Disks'],
    summary: 'When virtual machines are deleted without delete options set, OS and data disks persist indefinitely, billing for full provisioned GB.',
    seo_title: 'Find and Delete Unattached Azure Disks with Resource Graph',
    meta_description: 'Detect orphaned managed disks across all subscriptions with our copy-paste Azure Resource Graph query and stop wasting storage budget.',
    how_to: [
      'Run the Resource Graph waste query in Azure Portal Resource Graph Explorer.',
      'Export the unattached disk list and verify with resource owners if snapshot retention is required.',
      'Snapshot any disks needed for compliance, then delete the unattached disks.',
      'For future VM deployments, configure --os-disk-delete-option Delete.'
    ],
    snippets: [
      {
        language: 'kusto',
        title: 'Find all unattached managed disks',
        code: `Resources
| where type =~ 'microsoft.compute/disks'
| where properties.diskState =~ 'Unattached'
| project name, resourceGroup, subscriptionId, location, sku = tostring(sku.name), sizeGB = toint(properties.diskSizeGB), timeCreated = properties.timeCreated
| order by sizeGB desc`
      },
      {
        language: 'bash',
        title: 'Delete an unattached disk',
        code: `az disk delete -g <resource-group> -n <disk-name> --yes`
      }
    ],
    verify: 'Unattached disk query count reaches 0 in D04 Waste Tracker dashboard.',
    related: ['DSK-02', 'DSK-07', 'VM-17'],
    dashboard: ['D04'],
    kpi: ['orphan_spend_share', 'waste_percent'],
    docs: ['https://learn.microsoft.com/azure/virtual-machines/disks-find-unattached-portal'],
    last_verified: '2026-10-31'
  },
  {
    id: 'DSK-03',
    slug: 'use-premium-ssd-v2-decouple-performance',
    title: 'Use Premium SSD v2 to decouple IOPS and throughput from disk capacity',
    domain: 'disks-backup',
    domainName: 'Managed Disks & Backup',
    audience: ['scaleup', 'enterprise'],
    effort: 'med',
    impact: 2,
    lever: 'usage',
    services: ['Azure Managed Disks', 'Premium SSD v2'],
    summary: 'Avoid buying expensive 1TB+ Premium SSD v1 disks just to reach target IOPS. Premium SSD v2 lets you provision exact capacity, IOPS, and MB/s independently.',
    seo_title: 'Azure Premium SSD v2: Stop Over-Provisioning Disk Capacity',
    meta_description: 'Decouple IOPS and throughput from disk size using Premium SSD v2 to slash high-IO database disk costs.',
    how_to: [
      'Measure actual disk IOPS and throughput on candidate VMs.',
      'Create a Premium SSD v2 disk with exact required capacity (e.g. 128 GB) and set custom IOPS (e.g. 5,000 IOPS).',
      'Migrate data from oversized v1 disks to the lean v2 disk.'
    ],
    snippets: [],
    verify: 'Disk line item cost drops by 40–60% while maintaining identical or improved latency metrics.',
    related: ['DSK-02', 'DSK-04', 'DB-03'],
    dashboard: ['D10'],
    kpi: ['unit_cost'],
    docs: ['https://learn.microsoft.com/azure/virtual-machines/disks-types#premium-ssd-v2'],
    last_verified: '2026-10-31'
  },
  {
    id: 'DB-01',
    slug: 'azure-sql-serverless-auto-pause',
    title: 'Use Azure SQL serverless with auto-pause for intermittent workloads',
    domain: 'databases',
    domainName: 'Databases & Cosmos DB',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'low',
    impact: 3,
    lever: 'usage',
    services: ['Azure SQL Database', 'Serverless'],
    summary: 'Serverless compute bills per second active and automatically pauses when idle during nights and weekends, reducing non-prod DB spend by up to 80%.',
    seo_title: 'Azure SQL Serverless Auto-Pause: Cut Dev/Test Database Costs',
    meta_description: 'Configure auto-pause delay on Azure SQL Serverless to pay only for storage when dev and staging environments are inactive.',
    how_to: [
      'In Azure Portal or CLI, configure Azure SQL DB compute tier to General Purpose Serverless.',
      'Set Min vCores to 0.5 and Max vCores to meet peak traffic.',
      'Set Auto-pause delay to 60 minutes for development and testing environments.'
    ],
    snippets: [
      {
        language: 'bash',
        title: 'Configure SQL Database Serverless with Auto-Pause',
        code: `az sql db update -g <rg> -s <server> -n <db> \\
  --edition GeneralPurpose --family Gen5 --capacity 2 \\
  --min-capacity 0.5 --auto-pause-delay 60`
      }
    ],
    verify: 'Cost analysis confirms compute vCore hours drop to near zero outside business hours.',
    related: ['DB-02', 'DB-09', 'STU-02'],
    dashboard: ['D13'],
    kpi: ['non_prod_off_hours_ratio'],
    docs: ['https://learn.microsoft.com/azure/azure-sql/database/serverless-tier-overview'],
    last_verified: '2026-10-31'
  },
  {
    id: 'DB-11',
    slug: 'cosmos-db-autoscale-vs-manual',
    title: 'Cosmos DB: Autoscale vs Manual vs Serverless decision matrix',
    domain: 'databases',
    domainName: 'Databases & Cosmos DB',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'low',
    impact: 2,
    lever: 'usage',
    services: ['Azure Cosmos DB'],
    summary: 'Picking the wrong Cosmos DB throughput model causes severe budget waste. Match your traffic variability to the right model.',
    seo_title: 'Cosmos DB Pricing Models: Serverless vs Autoscale vs Manual RU',
    meta_description: 'Compare Azure Cosmos DB manual throughput, autoscale RU/s, and serverless to pick the optimal pricing architecture.',
    how_to: [
      'If traffic is unpredictable with long quiet periods (<10% duty cycle): choose Cosmos DB Serverless.',
      'If traffic has sustained diurnal spikes (peak:trough > 3:1): choose Autoscale (scales 10% to 100% of max RU/s).',
      'If traffic is uniform 24/7 (>70% average utilization): choose Manual provisioned RU/s paired with a Cosmos reservation or DB savings plan.'
    ],
    snippets: [],
    verify: 'Cosmos DB bill reflects appropriate model; no idle RU/s over-provisioning.',
    related: ['DB-12', 'DB-13', 'COM-15'],
    dashboard: ['D13'],
    kpi: ['unit_cost'],
    docs: ['https://learn.microsoft.com/azure/cosmos-db/how-to-choose-offer'],
    last_verified: '2026-10-31'
  },
  {
    id: 'NET-01',
    slug: 'draw-your-data-transfer-map',
    title: 'Draw your data-transfer map to unmask hidden egress fees',
    domain: 'networking',
    domainName: 'Networking & Data Transfer',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'med',
    impact: 3,
    lever: 'usage',
    services: ['Virtual Network', 'Azure Front Door', 'ExpressRoute', 'NAT Gateway'],
    summary: 'Network data transfer charges hide across multiple meters: internet egress, inter-region replication, VNet peering, and private endpoints.',
    seo_title: 'Azure Data Transfer Map: How to Audit & Reduce Egress Charges',
    meta_description: 'Audit internet egress, cross-region transfers, and private endpoint data processing charges with a comprehensive network map.',
    how_to: [
      'Identify top data transfer meters in Cost Analysis (Data Transfer Out, Inter-Region Egress, VNet Peering Out/In).',
      'Co-locate analytics compute and storage within the same Azure region.',
      'Place Azure Front Door or CDN in front of public endpoints to cache static responses and slash origin egress.',
      'Audit spoke VNets for unneeded cross-region peering or duplicate NAT gateways.'
    ],
    snippets: [],
    verify: 'Data transfer spend stabilizes under 8% of total cloud invoice in D09 Network and Egress Map.',
    related: ['NET-08', 'NET-10', 'NET-14', 'NET-19'],
    dashboard: ['D09'],
    kpi: ['egress_share', 'unit_cost'],
    docs: ['https://azure.microsoft.com/pricing/details/bandwidth/'],
    last_verified: '2026-10-31'
  },
  {
    id: 'NET-19',
    slug: 'filter-vnet-flow-logs',
    title: 'Filter VNet flow logs to stop ingesting junk traffic telemetry',
    domain: 'networking',
    domainName: 'Networking & Data Transfer',
    audience: ['scaleup', 'enterprise'],
    effort: 'low',
    impact: 2,
    lever: 'usage',
    services: ['Virtual Network', 'Network Watcher', 'Log Analytics'],
    summary: 'VNet flow log filtering by IP, port, protocol, and direction is GA as of October 2026. Filter out trusted intra-subnet traffic before it hits Log Analytics.',
    seo_title: 'VNet Flow Log Filtering GA: Cut Network Logging Costs',
    meta_description: 'Use the new GA VNet flow log filtering to drop redundant health check and internal traffic from Log Analytics ingestion.',
    how_to: [
      'Open Network Watcher > Flow logs > Target resource.',
      'Apply filtering rules to exclude internal health check probes and routine intra-cluster traffic.',
      'Send only perimeter and cross-zone flows to the Log Analytics workspace.'
    ],
    snippets: [],
    verify: 'Log Analytics NetworkMonitoring or AzureNetworkAnalytics_CL ingestion drops by 50%+ in D14 Observability Spend.',
    related: ['NET-20', 'MON-01', 'MON-02'],
    dashboard: ['D09', 'D14'],
    kpi: ['observability_share'],
    docs: ['https://learn.microsoft.com/azure/network-watcher/vnet-flow-logs-overview'],
    last_verified: '2026-10-31'
  },
  {
    id: 'MON-01',
    slug: 'find-what-you-ingest-log-analytics',
    title: 'Rank billable data by table in Log Analytics workspaces',
    domain: 'monitoring-observability',
    domainName: 'Monitoring & Observability',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'low',
    impact: 3,
    lever: 'usage',
    services: ['Azure Monitor', 'Log Analytics'],
    summary: 'Run the standard Usage query to pinpoint the top 3 tables driving 80% of your log ingestion charges.',
    seo_title: 'Audit Log Analytics Ingestion: Identify Expensive Tables',
    meta_description: 'Find out which tables consume your Azure Monitor budget with this simple KQL query and optimize ingestion table plans.',
    how_to: [
      'Open your primary Log Analytics workspace and execute the KQL query below.',
      'Sort tables by IngestedGB to identify candidates for Basic/Auxiliary plans or DCR filtering.',
      'Common culprits: ContainerLogV2, AzureDiagnostics, SecurityEvent, and AppTraces.'
    ],
    snippets: [
      {
        language: 'kusto',
        title: 'Rank Ingested Data by Table over 30 Days',
        code: `Usage
| where TimeGenerated > ago(30d)
| where IsBillable == true
| summarize IngestedGB = sum(Quantity) / 1000 by DataType
| sort by IngestedGB desc`
      }
    ],
    verify: 'Workspace owners receive the top 5 ingestion table list with assigned mitigation plans.',
    related: ['MON-02', 'MON-03', 'MON-05'],
    dashboard: ['D14'],
    kpi: ['observability_share'],
    docs: ['https://learn.microsoft.com/azure/azure-monitor/logs/cost-logs'],
    last_verified: '2026-10-31'
  },
  {
    id: 'MON-02',
    slug: 'basic-auxiliary-logs-table-plans',
    title: 'Switch high-volume, low-query tables to Basic or Auxiliary plans',
    domain: 'monitoring-observability',
    domainName: 'Monitoring & Observability',
    audience: ['scaleup', 'enterprise'],
    effort: 'low',
    impact: 3,
    lever: 'usage',
    services: ['Log Analytics', 'Azure Sentinel'],
    summary: 'Basic and Auxiliary table plans cost a fraction of the Analytics plan for verbose debugging, firewall logs, and compliance telemetry.',
    seo_title: 'Log Analytics Table Plans: Cut Ingestion Costs with Basic Logs',
    meta_description: 'Move high-volume debug and network logs to Basic and Auxiliary table plans to slash Log Analytics ingestion fees by up to 75%.',
    how_to: [
      'In Log Analytics > Tables, change plan for ContainerLogV2, AppServiceConsoleLogs, or Syslog to Basic or Auxiliary.',
      'Verify that 8-day interactive search for Basic logs satisfies operational debugging needs.',
      'Use summary rules or Data Collection Rules (DCR) to aggregate metrics before storing.'
    ],
    snippets: [],
    verify: 'Monthly Log Analytics line item drops while compliance retention is preserved.',
    related: ['MON-01', 'MON-03', 'SEC-04'],
    dashboard: ['D14'],
    kpi: ['observability_share'],
    docs: ['https://learn.microsoft.com/azure/azure-monitor/logs/manage-table-overview'],
    last_verified: '2026-10-31'
  },
  {
    id: 'AI-01',
    slug: 'treat-ai-as-its-own-finops-scope',
    title: 'Treat AI and Microsoft Foundry as its own FinOps scope',
    domain: 'ai-foundry',
    domainName: 'AI & Microsoft Foundry',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'low',
    impact: 3,
    lever: 'usage',
    services: ['Azure OpenAI', 'Microsoft Foundry', 'API Management'],
    summary: 'AI token spend can spike overnight without traditional server cues. Establish dedicated subscriptions, token budgets, and anomaly thresholds.',
    seo_title: 'FinOps for AI: Managing Azure OpenAI and Foundry Costs',
    meta_description: 'Best practices for organizing AI resources, setting token anomaly alerts, and tracking unit economics per conversation or task.',
    how_to: [
      'Isolate Azure OpenAI and Microsoft Foundry hubs into dedicated subscriptions or resource groups.',
      'Establish Cost Management anomaly alerts with strict sensitivity on AI scopes.',
      'Track unit cost per outcome: cost per resolved customer inquiry, cost per generated document, or cost per evaluation run.'
    ],
    snippets: [],
    verify: 'AI cost per outcome dashboard (D12) is reviewed weekly by product engineering leads.',
    related: ['AI-02', 'AI-03', 'AI-04', 'AI-11'],
    dashboard: ['D12'],
    kpi: ['ai_cost_per_outcome', 'batch_cache_share'],
    docs: ['https://techcommunity.microsoft.com/blog/ai-finops-blog/new-finops-for-ai-capabilities-control-spend-measure-value-and-optimize-for-impa/4559660'],
    last_verified: '2026-10-31'
  },
  {
    id: 'AI-03',
    slug: 'use-prompt-caching-for-models',
    title: 'Structure prompts to maximize Prompt Caching automatic discounts',
    domain: 'ai-foundry',
    domainName: 'AI & Microsoft Foundry',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'low',
    impact: 3,
    lever: 'rate',
    services: ['Azure OpenAI', 'Microsoft Foundry'],
    summary: 'Prompt caching is enabled automatically on supported models, cutting cached input token prices in half. Structure prompts with static system instructions first.',
    seo_title: 'Prompt Caching in Azure OpenAI: 50% Off Input Tokens',
    meta_description: 'How to organize system prompts, few-shot examples, and tools to trigger Azure OpenAI prompt caching discounts consistently.',
    how_to: [
      'Place large static elements (system instructions, persona, tool schemas, long reference documentation) at the very beginning of the prompt.',
      'Place dynamic user queries, timestamps, and transient variables at the end.',
      'Prompts exceeding the minimum threshold (e.g. 1,024 tokens) automatically receive the discounted cached token rate.'
    ],
    snippets: [],
    verify: 'Billing metrics in Foundry show >40% of input tokens billed at the cached discount rate.',
    related: ['AI-02', 'AI-04', 'AI-09'],
    dashboard: ['D12'],
    kpi: ['batch_cache_share', 'ai_cost_per_outcome'],
    docs: ['https://learn.microsoft.com/azure/ai-services/openai/how-to/prompt-caching'],
    last_verified: '2026-10-31'
  },
  {
    id: 'AI-04',
    slug: 'use-global-batch-for-asynchronous-jobs',
    title: 'Use Global Batch deployments for 50% discount on non-real-time AI',
    domain: 'ai-foundry',
    domainName: 'AI & Microsoft Foundry',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'low',
    impact: 3,
    lever: 'rate',
    services: ['Azure OpenAI', 'Microsoft Foundry'],
    summary: 'Asynchronous processing (catalog enrichment, evaluations, synthetic data generation, nightly summarization) runs at half price with a 24-hour turnaround.',
    seo_title: 'Azure OpenAI Global Batch: 50% Discount for Async Workloads',
    meta_description: 'Save 50% on Azure OpenAI token costs by routing non-interactive evaluation and enrichment jobs through the Global Batch API.',
    how_to: [
      'Format asynchronous requests into JSONL files and submit via the Azure OpenAI Batch API.',
      'Target non-blocking queues with a 24-hour completion window.',
      'Separate batch billing tags to report interactive vs background AI spending.'
    ],
    snippets: [],
    verify: '50% reduction in unit cost for batch enrichment workflows reflected in D12 AI Spend dashboard.',
    related: ['AI-01', 'AI-02', 'AI-07'],
    dashboard: ['D12'],
    kpi: ['batch_cache_share'],
    docs: ['https://learn.microsoft.com/azure/ai-services/openai/how-to/batch'],
    last_verified: '2026-10-31'
  },
  {
    id: 'EOS-01',
    slug: 'inventory-windows-and-sql-server-versions',
    title: 'Inventory every Windows Server and SQL Server version before ESU dates',
    domain: 'lifecycle-esu',
    domainName: 'Lifecycle, End of Support & ESUs',
    audience: ['enterprise', 'scaleup'],
    effort: 'low',
    impact: 3,
    lever: 'license',
    services: ['Azure Arc', 'Azure Migrate', 'Resource Graph'],
    summary: 'Windows Server 2016 extended support ends January 12, 2027. SQL Server 2016 ended July 14, 2026. You cannot price an ESU decision without an accurate version count.',
    seo_title: 'Windows Server 2016 End of Support: Inventory & ESU Strategy',
    meta_description: 'Inventory Windows Server 2016 and SQL Server 2016 instances across Azure, on-prem, and clouds to prepare for the January 12, 2027 deadline.',
    how_to: [
      'Run Azure Arc or Azure Migrate discovery across all datacenters and clouds.',
      'Execute the Resource Graph query to identify legacy OS versions on Azure VMs.',
      'Categorize machines into: Upgrade in-place, Modernize to PaaS, or Enroll in Arc-enabled ESUs.'
    ],
    snippets: [
      {
        language: 'kusto',
        title: 'Find Windows Server 2016 and Older VMs',
        code: `Resources
| where type =~ 'microsoft.compute/virtualmachines'
| where properties.storageProfile.osDisk.osType =~ 'Windows'
| extend osVersion = tostring(properties.storageProfile.imageReference.sku)
| where osVersion contains '2016' or osVersion contains '2012'
| project name, resourceGroup, subscriptionId, location, osVersion`
      }
    ],
    verify: 'Comprehensive server census completed; ESU financial liability modeled in D15 Lifecycle dashboard.',
    related: ['EOS-02', 'EOS-03', 'EOS-05', 'EOS-07'],
    dashboard: ['D15'],
    kpi: ['servers_past_eos', 'esu_spend'],
    docs: ['https://www.microsoft.com/windows-server/extended-security-updates', 'https://learn.microsoft.com/azure/azure-arc/servers/prepare-extended-security-updates'],
    last_verified: '2026-10-31'
  },
  {
    id: 'EOS-03',
    slug: 'onboard-servers-to-azure-arc-for-esus',
    title: 'Onboard servers to Azure Arc for monthly pay-as-you-go ESUs',
    domain: 'lifecycle-esu',
    domainName: 'Lifecycle, End of Support & ESUs',
    audience: ['enterprise'],
    effort: 'med',
    impact: 2,
    lever: 'license',
    services: ['Azure Arc', 'Extended Security Updates'],
    summary: 'Azure Arc-enabled ESUs bill monthly through your Azure invoice and can draw down your MACC commitment. As servers are upgraded, monthly billing stops immediately.',
    seo_title: 'Azure Arc Extended Security Updates: Monthly Pay-As-You-Go',
    meta_description: 'How to use Azure Arc to license Windows Server and SQL Server ESUs on a flexible monthly subscription that burns down MACC.',
    how_to: [
      'Deploy the Connected Machine agent to Windows Server 2016 instances.',
      'Link the machines to an Azure subscription and activate the Extended Security Updates license profile.',
      'Cancel or adjust monthly licenses as upgrade waves complete, avoiding locked-in annual upfront commitments.'
    ],
    snippets: [],
    verify: 'ESU coverage active with zero security vulnerability gaps; monthly charges decrease with each completed migration.',
    related: ['EOS-01', 'EOS-05', 'CML-03'],
    dashboard: ['D15', 'D20'],
    kpi: ['esu_spend', 'servers_past_eos'],
    docs: ['https://learn.microsoft.com/azure/azure-arc/servers/deploy-extended-security-updates'],
    last_verified: '2026-10-31'
  },
  {
    id: 'VIS-01',
    slug: 'turn-on-focus-exports-on-day-one',
    title: 'Turn on daily FOCUS exports in Parquet format with compression',
    domain: 'visibility-reporting',
    domainName: 'Visibility, Data & Reporting',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'low',
    impact: 3,
    lever: 'usage',
    services: ['Microsoft Cost Management', 'Azure Storage'],
    summary: 'Cost Management exports support the FinOps Open Cost and Usage Specification (FOCUS), uniting actual and amortized costs in a single normalized dataset.',
    seo_title: 'Azure Cost Management FOCUS Exports: Setup & Parquet Best Practices',
    meta_description: 'Step-by-step guide to configuring daily FOCUS 1.4 exports to Azure Storage in partitioned Snappy Parquet format.',
    how_to: [
      'Navigate to Cost Management > Exports at your billing account or subscription scope.',
      'Select Dataset: FOCUS Cost, Format: Parquet, Compression: Snappy, with monthly partitioning.',
      'Run an initial backfill of 12 months using the FinOps Toolkit PowerShell module.'
    ],
    snippets: [
      {
        language: 'powershell',
        title: 'Create FOCUS Export with FinOps Toolkit',
        code: `Install-Module FinOpsToolkit
New-FinOpsCostExport -Name 'focus-daily' \\
  -Scope '/providers/Microsoft.Billing/billingAccounts/<id>' \\
  -Dataset FocusCost -StorageAccountId '<storage-id>' \\
  -Format Parquet -CompressionMode Snappy -Execute -Backfill 12`
      }
    ],
    verify: 'Storage account container receives daily partitioned Parquet files readable by Synapse, Fabric, or DuckDB.',
    related: ['VIS-03', 'VIS-04', 'VIS-05'],
    dashboard: ['D01', 'D02', 'D07'],
    kpi: ['tag_coverage', 'unit_cost'],
    docs: ['https://learn.microsoft.com/azure/cost-management-billing/costs/tutorial-export-acm-data'],
    last_verified: '2026-10-31'
  },
  {
    id: 'VIS-03',
    slug: 'deploy-finops-hubs',
    title: 'Deploy FinOps hubs from the open-source FinOps toolkit',
    domain: 'visibility-reporting',
    domainName: 'Visibility, Data & Reporting',
    audience: ['scaleup', 'enterprise'],
    effort: 'med',
    impact: 3,
    lever: 'usage',
    services: ['FinOps Toolkit', 'Azure Data Explorer', 'Microsoft Fabric'],
    summary: 'FinOps hubs ingest FOCUS exports, normalize data across multi-cloud and EA/MCA scopes, and provide ready-made Power BI reports and AI agent templates.',
    seo_title: 'Deploy FinOps Hubs: The Open-Source Azure FinOps Engine',
    meta_description: 'How to deploy FinOps hubs from the FinOps toolkit to centralize Azure cost analytics, waste recommendations, and Copilot integration.',
    how_to: [
      'Deploy the FinOps hub template from Microsoft FinOps toolkit GitHub release.',
      'Configure automated ingestion pipelines for Advisor recommendations and Resource Graph waste queries.',
      'Connect Power BI starter templates or query with Azure Data Explorer KQL.'
    ],
    snippets: [],
    verify: 'Hub processes daily exports; Power BI dashboards refresh automatically.',
    related: ['VIS-01', 'VIS-04', 'AUT-05'],
    dashboard: ['D01', 'D03', 'D04'],
    kpi: ['effective_savings_rate', 'recommendation_realization'],
    docs: ['https://microsoft.github.io/finops-toolkit/hubs'],
    last_verified: '2026-10-31'
  },
  {
    id: 'TAG-01',
    slug: 'keep-small-mandatory-tag-set',
    title: 'Keep a small mandatory tag set (4–5 tags maximum)',
    domain: 'tags-allocation',
    domainName: 'Tags & Cost Allocation',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'low',
    impact: 2,
    lever: 'usage',
    services: ['Azure Policy', 'Microsoft Cost Management'],
    summary: 'Four or five consistently populated tags (owner, application, environment, cost-center) beat twenty tags that engineers ignore or fill with dummy data.',
    seo_title: 'Azure Tagging Strategy: Minimum Viable Mandatory Tag Set',
    meta_description: 'Establish high-compliance cost allocation with a 4-tag standard: owner, application, environment, and cost-center.',
    how_to: [
      'Define the 4 mandatory tags: owner, application, environment, cost-center.',
      'Enable Cost Management Tag Inheritance so child resources automatically inherit tags from their parent resource group.',
      'Enforce tag assignment at pull-request time in Terraform and Bicep modules.'
    ],
    snippets: [],
    verify: 'Tag coverage metric in D07 Allocation Health exceeds 90%.',
    related: ['TAG-02', 'TAG-03', 'TAG-08'],
    dashboard: ['D07'],
    kpi: ['tag_coverage'],
    docs: ['https://learn.microsoft.com/azure/azure-resource-manager/management/tag-resources'],
    last_verified: '2026-10-31'
  },
  {
    id: 'TAG-02',
    slug: 'enable-tag-inheritance-cost-management',
    title: 'Enable Tag Inheritance in Cost Management for instant allocation gains',
    domain: 'tags-allocation',
    domainName: 'Tags & Cost Allocation',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'low',
    impact: 3,
    lever: 'usage',
    services: ['Microsoft Cost Management'],
    summary: 'Tag inheritance automatically copies subscription and resource group tags down to usage records for resources lacking individual tags, instantly boosting coverage.',
    seo_title: 'Enable Tag Inheritance in Azure Cost Management',
    meta_description: 'Increase cost allocation coverage to over 90% without touching individual cloud resources by enabling tag inheritance.',
    how_to: [
      'In Azure Portal, navigate to Cost Management > Manage > Tags.',
      'Turn on tag inheritance for both Subscription and Resource Group scopes.',
      'Select which tags to prioritize in the event of conflicting values between group and resource.'
    ],
    snippets: [],
    verify: 'Unallocated spend drops dramatically in Cost Analysis without modifying a single deployed resource.',
    related: ['TAG-01', 'TAG-05', 'TAG-08'],
    dashboard: ['D07'],
    kpi: ['tag_coverage'],
    docs: ['https://learn.microsoft.com/azure/cost-management-billing/costs/enable-tag-inheritance'],
    last_verified: '2026-10-31'
  },
  {
    id: 'GOV-01',
    slug: 'create-budget-action-group-on-every-subscription',
    title: 'Create a budget with an Action Group on every subscription on day one',
    domain: 'governance-budgets',
    domainName: 'Governance & Budgets',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'low',
    impact: 3,
    lever: 'usage',
    services: ['Microsoft Cost Management', 'Azure Monitor Action Groups'],
    summary: 'Budgets alert on actual and forecasted spending thresholds. Pairing them with Action Groups enables automated circuit-breakers for sandboxes.',
    seo_title: 'Azure Budgets with Action Groups: Automated Spend Guardrails',
    meta_description: 'How to configure Azure Cost Management budgets with alert thresholds and webhook action groups to shut down runaway bills.',
    how_to: [
      'Set budget thresholds at 50%, 80%, 100% of monthly budget, plus a 110% Forecasted alert.',
      'Attach an Action Group routing notifications directly to the team Slack/Teams channel.',
      'For sandbox subscriptions, configure the Action Group to trigger an Automation runbook deallocating compute.'
    ],
    snippets: [
      {
        language: 'bash',
        title: 'Create an Azure Budget with CLI',
        code: `az consumption budget create --budget-name MonthlyCap --amount 5000 \\
  --time-grain monthly --start-date 2026-11-01 --end-date 2027-12-31`
      }
    ],
    verify: 'All active subscriptions display green budget status in Cost Management.',
    related: ['GOV-02', 'GOV-03', 'STU-03'],
    dashboard: ['D16'],
    kpi: ['forecast_accuracy', 'anomaly_time_to_resolve'],
    docs: ['https://learn.microsoft.com/azure/cost-management-billing/costs/tutorial-acm-create-budgets'],
    last_verified: '2026-10-31'
  },
  {
    id: 'STG-02',
    slug: 'automate-storage-tiering-lifecycle-management',
    title: 'Automate tiering with Blob Lifecycle Management rules',
    domain: 'storage',
    domainName: 'Blob & File Storage',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'low',
    impact: 3,
    lever: 'usage',
    services: ['Azure Blob Storage', 'Lifecycle Management'],
    summary: 'Automatically migrate aging blobs from Hot to Cool after 30 days, Cold after 90 days, Archive after 180 days, and delete after retention expires.',
    seo_title: 'Azure Blob Lifecycle Management: Cut Storage Bills by 70%',
    meta_description: 'Automate data movement from Hot to Cool, Cold, and Archive storage tiers using native JSON lifecycle policies.',
    how_to: [
      'Define lifecycle rules on Storage Accounts containing logs, diagnostics, or backup archives.',
      'Tier blobs based on daysAfterModificationGreaterThan or daysAfterLastAccessTimeGreaterThan.',
      'Specify permanent deletion rules for temporary staging containers.'
    ],
    snippets: [
      {
        language: 'json',
        title: 'Storage Lifecycle Policy Rule Example',
        code: `{
  "rules": [
    {
      "name": "age-out-logs",
      "enabled": true,
      "type": "Lifecycle",
      "definition": {
        "filters": { "blobTypes": ["blockBlob"], "prefixMatch": ["logs/"] },
        "actions": {
          "baseBlob": {
            "tierToCool": { "daysAfterModificationGreaterThan": 30 },
            "tierToCold": { "daysAfterModificationGreaterThan": 90 },
            "tierToArchive": { "daysAfterModificationGreaterThan": 180 },
            "delete": { "daysAfterModificationGreaterThan": 730 }
          }
        }
      }
    }
  ]
}`
      }
    ],
    verify: 'Storage account metrics reflect capacity shifting into Cool, Cold, and Archive tiers.',
    related: ['STG-01', 'STG-03', 'STG-07'],
    dashboard: ['D10'],
    kpi: ['waste_percent'],
    docs: ['https://learn.microsoft.com/azure/storage/blobs/lifecycle-management-overview'],
    last_verified: '2026-10-31'
  },
  {
    id: 'APP-01',
    slug: 'delete-empty-app-service-plans',
    title: 'Delete empty App Service plans that bill with zero active apps',
    domain: 'app-service-functions',
    domainName: 'App Service & Functions',
    audience: ['startup', 'scaleup', 'enterprise'],
    effort: 'low',
    impact: 2,
    lever: 'usage',
    services: ['Azure App Service'],
    summary: 'An App Service Plan allocates dedicated VM capacity. If all web apps are deleted or moved, the plan keeps billing at 100% until deleted.',
    seo_title: 'Find and Delete Empty Azure App Service Plans',
    meta_description: 'Detect orphaned App Service plans across your environment with Resource Graph to eliminate accidental infrastructure charges.',
    how_to: [
      'Execute the Resource Graph query filtering serverfarms where numberOfSites == 0.',
      'Verify that no pending deployment pipelines rely on the plan.',
      'Delete the empty server farm.'
    ],
    snippets: [
      {
        language: 'kusto',
        title: 'Find Empty App Service Plans',
        code: `Resources
| where type =~ 'microsoft.web/serverfarms'
| where toint(properties.numberOfSites) == 0
| project name, resourceGroup, subscriptionId, location, sku = tostring(sku.name), tier = tostring(sku.tier)`
      }
    ],
    verify: 'Query returns zero empty serverfarms across all enterprise subscriptions.',
    related: ['APP-02', 'APP-03'],
    dashboard: ['D04'],
    kpi: ['orphan_spend_share', 'waste_percent'],
    docs: ['https://learn.microsoft.com/azure/app-service/overview-hosting-plans'],
    last_verified: '2026-10-31'
  },
  {
    id: 'STU-05',
    slug: 'model-post-credit-cliff-startups',
    title: 'Model the post-credit cliff: Avoid surprise cash depletion',
    domain: 'startup-quick-wins',
    domainName: 'Startup Quick Wins',
    audience: ['startup'],
    effort: 'low',
    impact: 3,
    lever: 'rate',
    services: ['Microsoft for Startups', 'Azure Savings Plans'],
    summary: 'Startups often ignore optimization while Microsoft for Startups credits mask the bill. When credits expire, the sudden invoice can jeopardize runway.',
    seo_title: 'Surviving the Azure Credit Cliff: Startup Runway Guide',
    meta_description: 'How venture-backed startups can forecast Azure credit expiration and lock in monthly-paid savings plans to protect cash burn.',
    how_to: [
      'Calculate the exact projected month of credit exhaustion based on current run rate and growth.',
      'Two months before expiry, audit the infrastructure using the Startup 30-Day Playbook.',
      'Purchase a small 1-year compute savings plan paid monthly for the steady floor to reduce the initial cash shock by 30%.'
    ],
    snippets: [],
    verify: 'Cash runway projection reflects optimized post-credit cloud spend in D18 Credits Burndown.',
    related: ['STU-03', 'STU-04', 'COM-13'],
    dashboard: ['D18', 'D19'],
    kpi: ['unit_cost', 'effective_savings_rate'],
    docs: ['https://www.microsoft.com/startups'],
    last_verified: '2026-10-31'
  },
  {
    id: 'AUT-01',
    slug: 'estimate-cost-in-pull-requests',
    title: 'Shift-left FinOps: Estimate cost in pull requests with Infracost',
    domain: 'automation-shift-left',
    domainName: 'Automation & Shift-Left',
    audience: ['scaleup', 'enterprise'],
    effort: 'med',
    impact: 2,
    lever: 'usage',
    services: ['Terraform', 'Azure DevOps', 'GitHub Actions'],
    summary: 'Empower engineers with real-time monthly cost diffs in GitHub/GitLab pull requests before code merges to production.',
    seo_title: 'Infracost on Azure: Pull Request Cloud Cost Estimates',
    meta_description: 'Integrate automated cost estimations into CI/CD pipelines so developers see the financial impact of infrastructure changes.',
    how_to: [
      'Add Infracost action to GitHub Actions or Azure DevOps pull request pipelines.',
      'Set automated PR comment showing previous vs new estimated monthly spend.',
      'Configure guardrails to flag PRs that increase monthly costs by more than a specified threshold (e.g. $500/mo).'
    ],
    snippets: [],
    verify: 'PR review comments display cost breakdowns for all infrastructure changes.',
    related: ['AUT-02', 'CUL-01', 'CUL-02'],
    dashboard: ['D22'],
    kpi: ['recommendation_realization'],
    docs: ['https://www.infracost.io/docs/'],
    last_verified: '2026-10-31'
  },
  {
    id: 'ORG-04',
    slug: 'use-dev-test-subscription-offers',
    title: 'Use Dev/Test subscription offers for non-production environments',
    domain: 'billing-hierarchy',
    domainName: 'Billing Accounts & Subscriptions',
    audience: ['enterprise', 'scaleup', 'startup'],
    effort: 'low',
    impact: 3,
    lever: 'license',
    services: ['Enterprise Dev/Test', 'Azure Plan for Dev/Test'],
    summary: 'Dev/Test subscriptions waive Windows Server licensing fees and offer substantial discounts on Azure SQL, App Service, and Logic Apps.',
    seo_title: 'Azure Dev/Test Pricing: Cut Non-Production Cloud Costs',
    meta_description: 'Save 40%+ on non-production VMs and PaaS services by provisioning workloads into dedicated Enterprise Dev/Test subscriptions.',
    how_to: [
      'Provision dedicated development and QA environments under Enterprise Dev/Test (EA) or Azure Plan for Dev/Test (MCA).',
      'Ensure workloads are accessed exclusively by licensed Visual Studio subscribers.',
      'Prevent production traffic routing to Dev/Test subscriptions via Azure Policy.'
    ],
    snippets: [],
    verify: 'Windows OS license meter reflects $0.00 across all development subscriptions.',
    related: ['ORG-03', 'LIC-11', 'STU-06'],
    dashboard: ['D05'],
    kpi: ['dev_test_usage_share'],
    docs: ['https://azure.microsoft.com/pricing/offers/ms-azr-0148p/'],
    last_verified: '2026-10-31'
  }
];
