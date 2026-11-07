import { Playbook } from '../types';

export const PLAYBOOKS: Record<string, Playbook> = {
  'startup-30-day-plan': {
    id: 'startup-30-day-plan',
    slug: 'startup-30-day-plan',
    title: 'Startup 30-Day Plan: Guardrails, Visibility & Quick Wins',
    audience: 'startup',
    timeframe: '30 Days',
    billRange: 'Under $50k / month',
    summary: 'Essential operational checklist for venture-backed and bootstrapped startups to eliminate waste, avoid accidental bill shock, and prepare for the post-credit cliff.',
    sections: [
      {
        title: 'Week 1 — Guardrails & Defense',
        subtitle: 'Protect against surprise bill shock, compromised credentials, and regional drift',
        steps: [
          {
            id: 'st-01',
            title: 'Set budgets with action groups on every subscription',
            description: 'Configure Cost Management budgets with email and Slack alerts at 50%, 80%, and 100% of monthly runway allocation.',
            tipId: 'GOV-01',
            impact: 3,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'st-02',
            title: 'Enable Cost Anomaly alerts',
            description: 'Activate subscription-level daily anomaly detection to receive immediate email flags if a runaway service spins up.',
            tipId: 'GOV-03',
            impact: 3,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'st-03',
            title: 'Enforce MFA and ditch long-lived service principal keys',
            description: 'Require Conditional Access MFA on all admin accounts and switch CI/CD pipelines to Azure Workload Identity Federation.',
            tipId: 'ORG-12',
            impact: 3,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'st-04',
            title: 'Apply Azure Policy for allowed locations and VM SKUs',
            description: 'Restrict deployments to your primary home region (e.g., East US) and deny unneeded GPU or high-memory M-series SKUs.',
            tipId: 'ORG-11',
            impact: 2,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'st-05',
            title: 'Track credit balances and exact expiration dates',
            description: 'Review your Microsoft for Startups balance and terms in Cost Management; mark the exact calendar month credits expire.',
            tipId: 'ORG-13',
            impact: 2,
            effort: 'low',
            lever: 'rate'
          }
        ]
      },
      {
        title: 'Week 2 — Visibility & Allocation',
        subtitle: 'Get 100% visibility into where every single dollar is flowing',
        steps: [
          {
            id: 'st-06',
            title: 'Turn on daily FOCUS exports to Blob Storage',
            description: 'Configure automated daily FOCUS exports in Parquet format with Snappy compression and backfill the last 6 months.',
            tipId: 'VIS-01',
            impact: 3,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'st-07',
            title: 'Enable Tag Inheritance in Cost Management',
            description: 'Turn on tag inheritance at subscription and resource group scopes to instantly achieve 90%+ tag coverage.',
            tipId: 'TAG-02',
            impact: 3,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'st-08',
            title: 'Save Cost Analysis views for your engineering team',
            description: 'Save custom Cost Analysis smart views filtered by service, environment, and resource group for weekly review.',
            tipId: 'VIS-06',
            impact: 2,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'st-09',
            title: 'Review the Azure Advisor Cost Optimization workbook',
            description: 'Audit Advisor recommendations to identify low-hanging fruit in VM rightsizing and idle resources.',
            tipId: 'VIS-09',
            impact: 2,
            effort: 'low',
            lever: 'usage'
          }
        ]
      },
      {
        title: 'Week 3 — Quick Wins & Waste Sweep',
        subtitle: 'Harvest immediate 20–40% invoice reductions by clearing zombie assets',
        steps: [
          {
            id: 'st-10',
            title: 'Sweep and delete all unattached managed disks',
            description: 'Run the Resource Graph unattached disk query and delete orphaned disks left behind from deleted VMs.',
            tipId: 'DSK-01',
            impact: 2,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'st-11',
            title: 'Release unassociated public IP addresses',
            description: 'Delete standalone public IPs that are not attached to any NIC or gateway.',
            tipId: 'NET-12',
            impact: 1,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'st-12',
            title: 'Ensure stopped VMs are deallocated',
            description: 'Identify VMs in PowerState/stopped and execute deallocate to stop hourly compute billing.',
            tipId: 'VM-01',
            impact: 3,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'st-13',
            title: 'Enable auto-shutdown on all dev/test VMs',
            description: 'Configure built-in auto-shutdown at 7:00 PM local time with a webhook notification.',
            tipId: 'VM-04',
            impact: 2,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'st-14',
            title: 'Delete empty App Service plans',
            description: 'Locate and delete App Service plans hosting 0 apps that continue billing hourly capacity.',
            tipId: 'APP-01',
            impact: 2,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'st-15',
            title: 'Switch dev databases to Azure SQL Serverless with auto-pause',
            description: 'Configure dev databases to General Purpose Serverless with a 60-minute auto-pause delay.',
            tipId: 'DB-01',
            impact: 3,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'st-16',
            title: 'Move non-production workloads to Dev/Test subscriptions',
            description: 'Provision QA and staging into Dev/Test subscriptions to eliminate Windows licensing fees.',
            tipId: 'ORG-04',
            impact: 3,
            effort: 'low',
            lever: 'license'
          }
        ]
      },
      {
        title: 'Week 4 — Rate & AI Optimization',
        subtitle: 'Protect runway, model post-credit cash flow, and tame AI token bills',
        steps: [
          {
            id: 'st-17',
            title: 'Model the post-credit cliff in your financial forecast',
            description: 'Calculate the exact cash burn impact of credits ending and budget for cloud infrastructure.',
            tipId: 'STU-05',
            impact: 3,
            effort: 'low',
            lever: 'rate'
          },
          {
            id: 'st-18',
            title: 'Purchase a small 1-year compute savings plan paid monthly',
            description: 'Commit to 50–70% of your proven steady-state compute floor; monthly payments require zero upfront capital.',
            tipId: 'COM-13',
            impact: 2,
            effort: 'low',
            lever: 'rate'
          },
          {
            id: 'st-19',
            title: 'Structure AI prompts to exploit Prompt Caching',
            description: 'Place static system prompts and schemas at the start of prompts to receive automatic 50% cached token discounts.',
            tipId: 'AI-03',
            impact: 3,
            effort: 'low',
            lever: 'rate'
          },
          {
            id: 'st-20',
            title: 'Route asynchronous AI jobs to Global Batch',
            description: 'Move nightly summarization, data enrichment, and evaluation jobs to Global Batch for 50% discount.',
            tipId: 'AI-04',
            impact: 3,
            effort: 'low',
            lever: 'rate'
          }
        ]
      }
    ],
    kpis: ['waste_percent', 'orphan_spend_share', 'non_prod_off_hours_ratio', 'effective_savings_rate']
  },
  'scale-up-90-day-program': {
    id: 'scale-up-90-day-program',
    slug: 'scale-up-90-day-program',
    title: 'Scale-Up 90-Day Program: Systems, Commitments & Unit Cost',
    audience: 'scaleup',
    timeframe: '90 Days',
    billRange: '$50k – $1M / month',
    summary: 'Comprehensive transformation roadmap for growth-stage companies with multi-cluster AKS, database clusters, and distributed engineering squads.',
    sections: [
      {
        title: 'Days 1–30 — Foundation & Attribution',
        subtitle: 'Establish management group hierarchies, landing zones, and telemetry',
        steps: [
          {
            id: 'su-01',
            title: 'Design clean management groups and subscription vending',
            description: 'Organize subscriptions into Platform, Workloads (prod, non-prod), and Sandbox management groups.',
            tipId: 'ORG-02',
            impact: 2,
            effort: 'med',
            lever: 'usage'
          },
          {
            id: 'su-02',
            title: 'Enforce tag policies and cost allocation rules',
            description: 'Require owner, application, environment, and cost-center tags; allocate shared hub network costs.',
            tipId: 'TAG-03',
            impact: 2,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'su-03',
            title: 'Deploy FinOps hubs from the FinOps toolkit',
            description: 'Deploy open-source FinOps hubs in Azure Data Explorer or Microsoft Fabric for centralized analytics.',
            tipId: 'VIS-03',
            impact: 3,
            effort: 'med',
            lever: 'usage'
          },
          {
            id: 'su-04',
            title: 'Enable the AKS cost analysis add-on across all clusters',
            description: 'Attribute shared Kubernetes infrastructure costs to specific namespaces and services.',
            tipId: 'AKS-01',
            impact: 3,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'su-05',
            title: 'Install Azure Monitor agent for VM memory telemetry',
            description: 'Collect OS memory metrics to ensure VM rightsizing decisions are safe and data-driven.',
            tipId: 'VM-03',
            impact: 2,
            effort: 'med',
            lever: 'usage'
          },
          {
            id: 'su-06',
            title: 'Audit Azure Hybrid Benefit entitlement',
            description: 'Run Resource Graph queries to verify all entitled Windows and SQL instances have AHB applied.',
            tipId: 'LIC-05',
            impact: 3,
            effort: 'low',
            lever: 'license'
          }
        ]
      },
      {
        title: 'Days 31–60 — Usage & License Optimization',
        subtitle: 'Rightsize core workloads, adopt Arm Cobalt, and trim observability ingestion',
        steps: [
          {
            id: 'su-07',
            title: 'Clear the D04 Waste and Orphan Tracker',
            description: 'Eliminate unattached disks, unassociated IPs, empty server farms, and snapshots older than 90 days.',
            tipId: 'DSK-01',
            impact: 2,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'su-08',
            title: 'Rightsize top 20 virtual machines and AKS node pools',
            description: 'Act on Advisor recommendations to downsize over-provisioned compute with low average CPU and memory.',
            tipId: 'VM-02',
            impact: 3,
            effort: 'med',
            lever: 'usage'
          },
          {
            id: 'su-09',
            title: 'Pilot Arm-based Cobalt 100 VMs and node pools',
            description: 'Deploy multi-arch container images to Cobalt Arm instances for up to 40% better price-performance.',
            tipId: 'VM-08',
            impact: 3,
            effort: 'med',
            lever: 'usage'
          },
          {
            id: 'su-10',
            title: 'Implement an observability diet in Log Analytics',
            description: 'Shift high-volume debug tables to Basic/Auxiliary plans and configure VNet flow log filtering.',
            tipId: 'MON-02',
            impact: 3,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'su-11',
            title: 'Audit data transfer map and prune idle network gateways',
            description: 'Remove unattached NAT gateways, review inter-region replication, and co-locate analytics with storage.',
            tipId: 'NET-01',
            impact: 3,
            effort: 'med',
            lever: 'usage'
          },
          {
            id: 'su-12',
            title: 'Centralize SQL Server Azure Hybrid Benefit',
            description: 'Assign SQL core entitlements at billing scope to automatically pool and maximize licensing discounts.',
            tipId: 'LIC-03',
            impact: 2,
            effort: 'low',
            lever: 'license'
          }
        ]
      },
      {
        title: 'Days 61–90 — Commitments & Governance',
        subtitle: 'Build commitment ladders with the Feb 2027 deadline in mind and shift-left',
        steps: [
          {
            id: 'su-13',
            title: 'Review reservation portfolio against Feb 1, 2027 cutoff',
            description: 'Inventory reservations, execute pre-deadline exchanges for shifting shapes, and audit auto-renew flags.',
            tipId: 'COM-02',
            impact: 3,
            effort: 'low',
            lever: 'rate'
          },
          {
            id: 'su-14',
            title: 'Evaluate 1-year Database Savings Plan for steady DBs',
            description: 'Size a database savings plan to cover baseline SQL DB, Managed Instance, and PostgreSQL throughput.',
            tipId: 'COM-15',
            impact: 2,
            effort: 'low',
            lever: 'rate'
          },
          {
            id: 'su-15',
            title: 'Distribute weekly team showback scorecards (D17)',
            description: 'Send weekly digests to engineering squads showing team spend, unit cost, and open recommendations.',
            tipId: 'CUL-02',
            impact: 2,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'su-16',
            title: 'Integrate Infracost cost checks into CI/CD pull requests',
            description: 'Require automated cost diff estimates on all Terraform and Bicep pull requests before merging.',
            tipId: 'AUT-01',
            impact: 2,
            effort: 'med',
            lever: 'usage'
          },
          {
            id: 'su-17',
            title: 'Institute monthly FinOps executive cost reviews',
            description: 'Meet monthly with engineering and finance leads to review ESR, unit costs, and the optimization backlog.',
            tipId: 'GOV-09',
            impact: 3,
            effort: 'low',
            lever: 'usage'
          }
        ]
      }
    ],
    kpis: ['effective_savings_rate', 'ahb_coverage', 'tag_coverage', 'unit_cost', 'arm_spot_share']
  },
  'enterprise-12-month-program': {
    id: 'enterprise-12-month-program',
    slug: 'enterprise-12-month-program',
    title: 'Enterprise 12-Month Program: Deadlines, Architecture & MACC',
    audience: 'enterprise',
    timeframe: '12 Months',
    billRange: 'Over $1M / month',
    summary: 'Strategic enterprise operating plan for Fortune 500 and large global enterprises operating under EA/MCA agreements and MACC commitments.',
    sections: [
      {
        title: 'Quarter 1 (Now – Jan 2027) — Deadlines First',
        subtitle: 'Address critical commercial and lifecycle deadlines before policy windows close',
        steps: [
          {
            id: 'en-01',
            title: 'Execute pre-deadline reservation exchanges before Feb 1, 2027',
            description: 'Audit every compute and database reservation; exchange mismatched instances while the flexible policy is active.',
            tipId: 'COM-02',
            impact: 3,
            effort: 'low',
            lever: 'rate'
          },
          {
            id: 'en-02',
            title: 'Audit and turn off auto-renew on volatile reservations',
            description: 'Prevent automatic post-deadline renewals that create permanently non-exchangeable commitments.',
            tipId: 'COM-05',
            impact: 2,
            effort: 'low',
            lever: 'rate'
          },
          {
            id: 'en-03',
            title: 'Finalize Windows Server 2016 ESU or upgrade plan (Jan 12, 2027 EOS)',
            description: 'Onboard legacy servers to Azure Arc for monthly pay-as-you-go ESUs or accelerate in-place upgrades.',
            tipId: 'EOS-01',
            impact: 3,
            effort: 'low',
            lever: 'license'
          },
          {
            id: 'en-04',
            title: 'Establish FOCUS and FinOps hubs as single system of record',
            description: 'Deploy enterprise-scale FinOps hubs with automated data normalization across all enrollment accounts.',
            tipId: 'VIS-03',
            impact: 3,
            effort: 'med',
            lever: 'usage'
          }
        ]
      },
      {
        title: 'Quarter 2 — Allocation & License Optimization',
        subtitle: 'Achieve 95%+ cost allocation and maximize Software Assurance rights',
        steps: [
          {
            id: 'en-05',
            title: 'Target 95%+ cost allocation across shared services',
            description: 'Implement cost allocation rules for shared hub networking, firewalls, and multi-tenant AKS clusters.',
            tipId: 'TAG-05',
            impact: 2,
            effort: 'med',
            lever: 'usage'
          },
          {
            id: 'en-06',
            title: 'Centralize SQL Server Azure Hybrid Benefit assignment',
            description: 'Manage SQL AHB centrally at billing profile scope to ensure 100% entitlement utilization without over-allocation.',
            tipId: 'LIC-03',
            impact: 2,
            effort: 'low',
            lever: 'license'
          },
          {
            id: 'en-07',
            title: 'Rightsize SQL Server editions (Enterprise to Standard)',
            description: 'Audit SQL Server database features and downgrade non-critical workloads from Enterprise to Standard.',
            tipId: 'LIC-08',
            impact: 3,
            effort: 'med',
            lever: 'license'
          },
          {
            id: 'en-08',
            title: 'Enforce Enterprise Dev/Test offers for all non-production',
            description: 'Migrate all dev and QA subscriptions to Enterprise Dev/Test to eliminate Windows OS license charges.',
            tipId: 'ORG-04',
            impact: 3,
            effort: 'low',
            lever: 'license'
          }
        ]
      },
      {
        title: 'Quarter 3 — Usage Optimization at Scale',
        subtitle: 'Automate waste remediation and drive architectural modernization',
        steps: [
          {
            id: 'en-09',
            title: 'Automate orphan asset cleanup with Azure Policy and Logic Apps',
            description: 'Deploy scheduled functions to snapshot and delete unattached disks and idle gateways after a 7-day grace period.',
            tipId: 'AUT-03',
            impact: 2,
            effort: 'low',
            lever: 'usage'
          },
          {
            id: 'en-10',
            title: 'Automate Advisor cost recommendations into Jira / ADO tickets',
            description: 'Integrate the FinOps recommendations pipeline directly into developer backlogs with automated tracking.',
            tipId: 'AUT-05',
            impact: 2,
            effort: 'med',
            lever: 'usage'
          },
          {
            id: 'en-11',
            title: 'Accelerate Cobalt Arm and modern series migrations',
            description: 'Set enterprise target for >60% of Linux VM hours on current series (v5/v6) and Cobalt Arm.',
            tipId: 'VM-08',
            impact: 3,
            effort: 'high',
            lever: 'usage'
          },
          {
            id: 'en-12',
            title: 'Consolidate Log Analytics workspaces and commit to tiers',
            description: 'Merge fragmented regional workspaces and purchase 1,000+ GB/day commitment tiers for 30–50% savings.',
            tipId: 'MON-05',
            impact: 3,
            effort: 'low',
            lever: 'usage'
          }
        ]
      },
      {
        title: 'Quarter 4 — Commercial, Shift-Left & AI Governance',
        subtitle: 'Align MACC negotiations, implement AI FinOps, and embed efficiency into OKRs',
        steps: [
          {
            id: 'en-13',
            title: 'Align EA/MCA and MACC renewal with commitment portfolio',
            description: 'Combine MACC negotiations, Marketplace drawdown strategies, and post-2027 commitment terms.',
            tipId: 'CML-01',
            impact: 3,
            effort: 'high',
            lever: 'rate'
          },
          {
            id: 'en-14',
            title: 'Burn down MACC with qualifying Marketplace and ESU spend',
            description: 'Route third-party enterprise SaaS purchases (Datadog, Confluent, Palo Alto) through Azure Marketplace.',
            tipId: 'CML-03',
            impact: 2,
            effort: 'low',
            lever: 'rate'
          },
          {
            id: 'en-15',
            title: 'Deploy AI Gateway for Azure OpenAI, Foundry and Copilot',
            description: 'Place Azure API Management AI Gateway in front of LLM endpoints to enforce token limits and semantic caching.',
            tipId: 'AI-11',
            impact: 2,
            effort: 'med',
            lever: 'usage'
          },
          {
            id: 'en-16',
            title: 'Govern Microsoft 365 Copilot usage-based spend policies',
            description: 'Leverage Microsoft Graph API and Copilot cost management to set group-level limits and user spending alerts.',
            tipId: 'AI-19',
            impact: 2,
            effort: 'med',
            lever: 'usage'
          },
          {
            id: 'en-17',
            title: 'Incorporate cloud efficiency metrics into engineering team OKRs',
            description: 'Set team-level targets for Effective Savings Rate, tag coverage, and unit cost performance.',
            tipId: 'CUL-04',
            impact: 3,
            effort: 'low',
            lever: 'usage'
          }
        ]
      }
    ],
    kpis: ['effective_savings_rate', 'ahb_coverage', 'tag_coverage', 'esu_spend', 'recommendation_realization', 'unit_cost']
  }
};
