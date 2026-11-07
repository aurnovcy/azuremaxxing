# Azure maxxing — The Field Guide to Getting Maximum Value from Every Azure Dollar

**Version 1.0 · Research current to October 31, 2026 · Built as the source content for Azure maxxing**

> **What “maxxing” means here.** The goal is to maximize the business value of each dollar on the Azure invoice: remove waste, lower the unit price of what you keep, and spend deliberately where it buys outsized value elsewhere.

> **About prices.** Azure prices depend on region, agreement type (EA, MCA, CSP, pay-as-you-go), currency and date. This guide describes pricing *mechanics* and published relative discounts rather than quoting dollar prices. On the website, link every tip to the relevant Azure pricing or Microsoft Learn page with a “last verified” date.

---

## How to use this repository

Part 1 covers what changed in Azure cost management from late 2025 to late 2026, including a hard deadline every Azure customer needs on their calendar (February 1, 2027). Part 2 is the operating model. Part 3 is the tip repository, about 370 detailed entries across 22 domains, many with ready-to-run Azure CLI, KQL or Resource Graph snippets. Part 4 is the dashboard library: 22 dashboard proposals with KPIs, data sources and example queries. Part 5 is the KPI catalog. Part 6 contains playbooks for startups, scale-ups and enterprises, plus a website content model. An appendix collects Resource Graph “waste hunting” queries.

Every tip uses the same header so it can be parsed straight into a CMS or JSON:

`ID · Title` — followed by a tag line `[Audience · Effort · Impact]`

- **Audience:** `ST` startup, `SU` scale-up, `EN` enterprise (EA/MCA, management group hierarchy, MACC), `All`.
- **Effort:** `Low` (minutes to a day), `Med` (days to weeks), `High` (a project).
- **Impact:** `$` (nice to have), `$$` (noticeable line-item reduction), `$$$` (can move the total bill by double-digit percent).

---

# Part 1 — What’s new in Azure cost management (late 2025 to late 2026)

**Reservation exchanges end for savings-plan-covered services on February 1, 2027.** Announced at the end of July 2026: if a service is covered by an Azure savings plan (compute or databases), reservations for that service purchased on or after February 1, 2027 cannot be exchanged. Active reservations purchased before that date keep the right to one final exchange after it. Microsoft processes an exchange as a cancellation, refund and new purchase, so whatever you receive from a post-deadline exchange is itself non-exchangeable; a renewal after the deadline is also treated as a new, non-exchangeable purchase. Trade-in of reservations to savings plans remains available, and the policy expands automatically as more services become savings-plan eligible. This is the single biggest commitment-strategy change on Azure in years.

**Savings plan for databases (March 2026).** A spend-based, one-year-only commitment that floats across Azure SQL Database (including Hyperscale and serverless), SQL Managed Instance, Azure Database for PostgreSQL and MySQL, Cosmos DB provisioned throughput, Azure DocumentDB, Database Migration Service, and SQL Server hourly licenses on Azure VMs and Arc. Discounts differ by service and are highest for serverless SQL; Cosmos DB serverless and DTU-model SQL are not eligible. Some hourly license usage consumes the commitment at pay-as-you-go rates, so scope and sizing matter.

**Management-group-scoped savings plan and reservation recommendations (September 2026).** Evaluate commitment opportunities across an entire management group hierarchy in one view, instead of subscription by subscription.

**Agentic cost tooling.** Cost Management and Pricing toolsets landed in the Azure Resource Manager MCP server in mid-2026, giving AI agents and developer tools access to cost, pricing, budget and optimization data. Microsoft also introduced the Azure MCP Server at FinOps X 2026 to bring pricing and architectural trade-offs into developer workflows. Copilot in Azure has been generally available for cost questions since 2025.

**FinOps toolkit 13 and 14.** The open-source FinOps toolkit added Parquet and compression options for exports (January 2026), then a recommendations pipeline in FinOps hubs that ingests Azure Advisor cost recommendations plus a built-in catalog of Resource Graph waste queries (stopped VMs, unattached disks, idle load balancers, empty NSGs, orphaned NAT gateways and more), a commitment discount eligibility dataset, and a Copilot Studio agent template for FinOps hubs (April 2026). Azure Optimization Engine capabilities are migrating into FinOps hubs, and FOCUS 1.4 support is on the roadmap.

**FOCUS everywhere.** FOCUS exports are among the most used export types in Cost Management; FOCUS 1.2 arrived in preview in 2025, and the FinOps Foundation ratified FOCUS 1.4 in June 2026 with invoice reconciliation and deeper commitment data. FOCUS 1.5 is previewed for around year-end 2026 with token and model identity.

**FinOps for AI across Microsoft.** Foundry now brings Claude model usage into Azure Cost Management alongside other Foundry spend with tagging and attribution (October 2026). On the Microsoft 365 side, Copilot cost management added spending policies, group-level limits, user spending alerts, model-family access per group and a Microsoft Graph API for policies (preview, September 2026). FinOps teams increasingly own both Azure and Copilot consumption.

**Lifecycle deadlines.** SQL Server 2016 reached end of extended support on July 14, 2026; Windows Server 2012/2012 R2 ESUs ended October 13, 2026; Windows Server 2016 reaches end of extended support on January 12, 2027, with ESUs available through Azure Arc as a pay-as-you-go monthly subscription billed through Azure. Section 3.18 covers the cost implications.

**Observability cost controls.** VNet flow log filtering (by IP, port, protocol, direction) became generally available in October 2026, letting you log less instead of collecting everything.

**FinOps Framework 2026.** Adds Executive Strategy Alignment, deepens FinOps Scopes, adds Technology Category guidance, and renames Workload Optimization to Usage Optimization.

---

# Part 2 — The operating model

## 2.1 The order of operations

1. **See it.** FOCUS export to storage (or FinOps hubs), Cost analysis smart views, Advisor, Resource Graph.
2. **Own it.** Management groups and subscriptions that mirror the org; tags with inheritance; cost allocation rules.
3. **Delete it.** Unattached disks, unassociated public IPs, stopped-but-not-deallocated VMs, empty App Service plans, idle gateways.
4. **Shrink it.** Rightsize VMs, AKS node pools, databases and App Service plans; adopt newer series and Arm (Cobalt) where it fits.
5. **License it.** Apply Azure Hybrid Benefit everywhere you’re entitled; use Dev/Test pricing for non-production.
6. **Schedule it.** Auto-shutdown and Start/Stop for non-production; pause databases, analytics and AKS clusters.
7. **Commit to it.** Savings plans and reservations on the lean baseline, with the February 2027 exchange change in mind.
8. **Re-architect it.** Storage tiers and redundancy, network topology, observability ingestion, serverless where it pays.
9. **Govern it.** Budgets, anomaly alerts, Azure Policy, shift-left estimates.

Commit after you shrink. With exchanges disappearing for most compute and database reservations, buying commitments against oversized resources is riskier on Azure than it has ever been.

## 2.2 Two levers, plus a third that’s unusually big on Azure

**Rate optimization** (savings plans, reservations, Spot, MACC discounts, credits) lowers price. **Usage optimization** (cleanup, rightsizing, scheduling, architecture) lowers quantity. On Azure, **license optimization** (Azure Hybrid Benefit, Dev/Test pricing, edition choice, ESU strategy) is a third lever that can rival the other two for Windows Server and SQL Server estates.

## 2.3 How Azure is shaped

- **Hierarchy:** tenant → management groups → subscriptions → resource groups → resources. Subscriptions are the main billing and quota boundary; management groups carry policy and RBAC; resource groups are the lifecycle unit.
- **Billing accounts differ by agreement.** Enterprise Agreement (enrollments, departments, accounts), Microsoft Customer Agreement (billing profiles, invoice sections), CSP (partner-managed), and pay-as-you-go. Some Cost Management features, scopes and export types vary by agreement; check what your scope supports before designing reports.
- **Discounts stack in a specific way.** Azure Hybrid Benefit removes license cost; reservations and savings plans discount the remaining compute; MACC-negotiated discounts and credits apply on top. Reservations apply before savings plans.

## 2.4 Who does what

Engineering owns usage and rightsizing; the FinOps/platform team owns data, commitments, policy and the optimization backlog; finance owns budgets, forecasts and chargeback; procurement and licensing own MACC, Marketplace, Software Assurance and ESU decisions; leadership owns targets and trade-offs.

## 2.5 Maturity at a glance

| Stage | Visibility | Allocation | Optimization | Governance |
| --- | --- | --- | --- | --- |
| Crawl | Cost analysis, budgets, Advisor | Subscription per environment | Delete orphans, auto-shutdown, AHB on obvious VMs | Budget emails |
| Walk | FOCUS exports, Power BI/FinOps toolkit reports | Tag policy with inheritance, 80%+ tagged, cost allocation rules | Rightsizing, Spot, scheduling, layered savings plans and reservations | Anomaly alerts, Azure Policy guardrails, monthly reviews |
| Run | FinOps hubs, unit economics, MCP/Copilot for engineers | 95%+ allocated incl. AKS and shared services | Automated remediation, architecture changes, AI cost controls | Policy-as-code in CI, efficiency targets, chargeback |

---

# Part 3 — The tip repository

## 3.1 Billing accounts, management groups and subscriptions

**ORG-01 · Know your agreement type before you design anything** — `[All · Low · $$]` EA, MCA, CSP and pay-as-you-go expose different billing scopes, roles, export options and invoice structures. Write down which scopes you have (enrollment/department/account vs billing account/profile/invoice section) and design reports against them.

**ORG-02 · Build a management group hierarchy that mirrors the business** — `[All · Low · $$]` Typical shape: root → platform / landing zones (corp, online) / sandbox / decommissioned. Policies, budgets and commitment recommendations can then be applied at the right level.

**ORG-03 · One subscription per workload per environment** — `[All · Med · $$]` Subscriptions are the cleanest allocation boundary and the natural scope for budgets, quotas and anomaly alerts.

**ORG-04 · Use Dev/Test subscription offers for non-production** — `[All · Low · $$$]` Enterprise Dev/Test (EA) and Azure Plan for Dev/Test (MCA) remove Windows license charges on VMs and offer discounted rates on several services. Non-production must be used only by active Visual Studio subscribers and not run production workloads.

**ORG-05 · Use subscription vending** — `[SU, EN · Med · $$]` Create subscriptions through Terraform/Bicep landing-zone modules so every subscription is born with tags, budgets, policies, diagnostic settings and an owner.

**ORG-06 · Use MCA invoice sections or EA departments for finance alignment** — `[EN · Low · $$]` Map invoice sections or departments to cost centers so invoices arrive already split for finance.

**ORG-07 · Grant Cost Management Reader broadly** — `[All · Low · $$]` Engineers who can see their own costs act on them. Grant it at subscription or resource group scope.

**ORG-08 · Restrict who can purchase commitments** — `[SU, EN · Low · $$]` Use the savings plan and reservation purchaser roles deliberately; uncoordinated purchases create overlapping or stranded commitments.

**ORG-09 · Move abandoned resources into a “decommissioned” management group** — `[All · Low · $]` Apply a deny-all-creation policy there, keep data for a grace period, then delete.

**ORG-10 · Cancel unused subscriptions properly** — `[All · Low · $]` Find subscriptions with negligible spend and no owner; disable and then cancel after confirming nothing is needed.

**ORG-11 · Restrict regions with Azure Policy** — `[All · Low · $]` The built-in “Allowed locations” policy keeps resources out of regions nobody monitors.

**ORG-12 · Protect against compromised credentials** — `[ST · Low · $$$]` Enforce MFA and Conditional Access, avoid long-lived service principal secrets (use managed identities and workload identity federation), and set low quotas for GPU families in non-production. Stolen credentials spinning up GPU VMs remain the classic Azure bill-shock event.

**ORG-13 · Track credits and their expiry** — `[ST · Low · $$]` Microsoft for Startups, Visual Studio and promotional credits appear differently by offer; monitor balances in Cost Management and plan experiments before credits expire.

**ORG-14 · Know what credits don’t cover** — `[ST · Low · $$]` Credits often exclude Marketplace, support and some third-party services. Read the terms before building a runway plan around them.

**ORG-15 · Plan EA-to-MCA transitions carefully** — `[EN · Med · $$]` Commitments, budgets, exports and RBAC need to be recreated or migrated at new scopes. Re-create exports and reports before the transition month.

**ORG-16 · Use billing profiles to separate invoice payment methods** — `[EN · Low · $]` Different legal entities or payment methods get separate billing profiles; keep the count minimal.

**ORG-17 · Use Azure Lighthouse and partner admin links for managed services** — `[SU, EN · Low · $]` Partner-managed tenants should still feed your FOCUS exports; make sure CSP customers can see costs (CSP partners must enable cost visibility).

**ORG-18 · Keep sandbox subscriptions separate and capped** — `[All · Low · $$]` Sandboxes get budgets with action groups, restrictive SKU policies and auto-cleanup.

**ORG-19 · Use resource groups as lifecycle units** — `[All · Low · $]` Everything that lives and dies together goes in one resource group; deleting a resource group is the cleanest way to remove an experiment completely.

**ORG-20 · Watch for resources in “Microsoft-managed” resource groups** — `[All · Low · $]` AKS node resource groups (MC\_\*), Databricks managed groups and others hold billable resources that are easy to miss in allocation.

## 3.2 Visibility, data and reporting

**VIS-01 · Turn on FOCUS exports on day one** — `[All · Low · $$$]` Cost Management exports support FOCUS, which includes actual and amortized cost in a single dataset. Daily export to a storage account, Parquet with compression, partitioned by month.

**VIS-02 · Also export price sheet, reservation details and recommendations** — `[SU, EN · Low · $$]` These datasets let you compute effective vs list price, commitment utilization and coverage outside the portal.

**VIS-03 · Deploy FinOps hubs from the FinOps toolkit** — `[SU, EN · Med · $$$]` FinOps hubs ingest exports into Azure Data Explorer or Microsoft Fabric, normalize them, and come with Power BI reports, recommendations (Advisor plus Resource Graph waste queries) and AI integrations. Free and open source; you pay for the underlying resources.

**VIS-04 · Use the FinOps toolkit PowerShell module** — `[All · Low · $]` `New-FinOpsCostExport` creates exports with format and compression options; use `-WhatIf` to preview resource provider registration.

```powershell
Install-Module FinOpsToolkit
New-FinOpsCostExport -Name 'focus-daily' -Scope '/providers/Microsoft.Billing/billingAccounts/<id>' `
  -Dataset FocusCost -StorageAccountId '<storage-resource-id>' -Format Parquet -CompressionMode Snappy -Execute -Backfill 12
```

**VIS-05 · Learn actual vs amortized cost** — `[All · Low · $$]` Actual cost shows purchases (including upfront reservations) on the day they happen; amortized cost spreads them over the term and allocates commitment benefit to the resources that used it. Use amortized for team reporting and actual for invoice reconciliation.

**VIS-06 · Use Cost analysis smart views** — `[All · Low · $$]` Resources, Services, Reservations and Subscriptions smart views include anomaly insights and drill-downs; save views per team.

**VIS-07 · Ask Copilot in Azure cost questions** — `[All · Low · $]` Natural-language questions (“why did costs in subscription X increase last week?”) give quick first answers; verify before acting.

**VIS-08 · Connect cost tools to your IDE through the ARM MCP server** — `[SU, EN · Low · $$]` The Cost Management and Pricing toolsets let AI agents combine resource information with cost, pricing, budgets and recommendations during design and investigation.

**VIS-09 · Use the Advisor cost workbook** — `[All · Low · $$]` The Cost Optimization workbook in Advisor groups opportunities by compute, storage, networking and more, with links to act.

**VIS-10 · Track your Advisor Score for cost** — `[All · Low · $]` A simple progress metric you can share with leadership; postpone or dismiss recommendations with reasons so the score stays meaningful.

**VIS-11 · Use Azure Resource Graph for inventory-based waste hunting** — `[All · Low · $$$]` Resource Graph queries across all subscriptions in seconds. See the appendix for ready-made queries.

**VIS-12 · Normalize to unit cost** — `[All · Med · $$$]` Cost per customer, transaction or AI conversation tells you if growth is efficient.

**VIS-13 · Keep 13+ months of history** — `[All · Low · $]` Backfill exports (VIS-04 shows `-Backfill`) so year-over-year comparisons work.

**VIS-14 · Report Marketplace separately** — `[SU, EN · Low · $]` Marketplace purchases appear on Azure invoices; show them next to, not inside, infrastructure.

**VIS-15 · Use the Emissions Impact Dashboard** — `[All · Low · $]` Pair carbon and cost reporting; region and SKU choices affect both.

**VIS-16 · Build a weekly “top movers” report** — `[All · Low · $$]` Week-over-week change by subscription, service and meter catches drift early.

**VIS-17 · Use the pricing calculator inside the portal for estimates** — `[All · Low · $]` Estimates that reflect your agreement’s prices are more realistic than public list prices.

**VIS-18 · Reconcile exports to invoices monthly** — `[EN · Low · $]` Finance trust in the data is a prerequisite for chargeback.

**VIS-19 · Include Microsoft 365 Copilot consumption in AI reporting** — `[EN · Med · $$]` Usage-based Copilot features now have their own cost management and reporting; FinOps teams should see AI spend across Azure and Microsoft 365 together.

**VIS-20 · Put cost next to performance** — `[SU, EN · Med · $$]` Azure Monitor workbooks and Grafana dashboards can include cost from exports so engineers see both daily.

**VIS-21 · Use Cost Management APIs instead of portal scraping** — `[SU, EN · Low · $]` The Query, Exports and Cost Details APIs are the supported programmatic routes; mind throttling and prefer exports for bulk data.

**VIS-22 · Understand the data refresh latency** — `[All · Low · $]` Cost data typically lags usage by hours; marketplace and some services lag more. Don’t raise alarms on incomplete days.

## 3.3 Tags and cost allocation

**TAG-01 · Keep a small mandatory tag set** — `[All · Low · $$]` Four or five tags (owner/team, application, environment, cost-center) beat twenty nobody fills in.

**TAG-02 · Enable tag inheritance in Cost Management** — `[All · Low · $$$]` Tag inheritance applies subscription and resource group tags to usage records, which instantly raises allocation coverage without touching resources.

**TAG-03 · Enforce tags with Azure Policy** — `[All · Low · $$]` Use “Require a tag on resource groups” plus “Inherit a tag from the resource group if missing” (modify effect with remediation tasks).

**TAG-04 · Tag at creation in IaC** — `[All · Med · $$]` Bicep and Terraform modules should require tags as parameters.

**TAG-05 · Use cost allocation rules for shared costs** — `[SU, EN · Med · $$]` Distribute shared subscription costs (hub networking, shared services) to consuming subscriptions or resource groups proportionally or by fixed percentage.

**TAG-06 · Allocate AKS costs with the cost analysis add-on** — `[All · Low · $$$]` The AKS cost analysis add-on breaks cluster costs down by namespace and Kubernetes asset, so shared clusters stop being one blob.

**TAG-07 · Tag Foundry and Azure OpenAI deployments** — `[All · Low · $$]` Tag AI resources by application and team; Foundry now brings partner model usage (such as Claude) into Cost Management with tagging and attribution.

**TAG-08 · Measure tag coverage by cost** — `[All · Low · $$]` Report the share of amortized cost carrying each required tag. Target 90%+ walk, 95%+ run.

**TAG-09 · Publish “unallocated” on every report** — `[All · Low · $$]` Visible unallocated spend creates pressure to fix it.

**TAG-10 · Tag for lifecycle** — `[All · Low · $$]` An `expiresOn` tag plus an Automation runbook or Logic App that warns owners and deallocates expired resources kills experiment sprawl.

**TAG-11 · Remember that not every resource supports tags in usage data** — `[All · Low · $]` Some meters don’t carry resource tags; use resource group/subscription inheritance and allocation rules to fill the gaps.

**TAG-12 · Standardize tag names and values** — `[All · Low · $]` Tag names are case-insensitive but values are case-sensitive in many reports; publish allowed values.

**TAG-13 · Use management group and subscription structure as the primary allocation key** — `[All · Low · $$]` Tags are a supplement; the structure is harder to get wrong.

**TAG-14 · Keep allocation logic in one place** — `[EN · Med · $]` Implement allocation in FinOps hubs or your warehouse once, rather than separately in every report.

## 3.4 Governance, budgets and anomaly detection

**GOV-01 · Create a budget on every subscription on day one** — `[All · Low · $$$]` Alert on actual and forecasted thresholds and route to an action group (email, Teams, webhook).

**GOV-02 · Use budget action groups to automate responses** — `[All · Med · $$]` For sandboxes, an action group can trigger an Automation runbook or Logic App that deallocates VMs or scales services down when a threshold is hit.

**GOV-03 · Turn on anomaly alerts** — `[All · Low · $$$]` Cost anomaly alerts at subscription scope email you when daily cost deviates from the expected pattern.

**GOV-04 · Route alerts to the owning team** — `[All · Low · $$]` Send to the team’s channel, not a central mailbox nobody reads.

**GOV-05 · Use Azure Policy to restrict expensive SKUs** — `[SU, EN · Low · $$]` “Allowed virtual machine size SKUs” and “Allowed storage account SKUs” per management group keep GPU and premium SKUs out of places they don’t belong.

**GOV-06 · Deny public IPs and premium networking where unnecessary** — `[SU, EN · Low · $]` Policies can block public IP creation, Premium Firewall SKUs or unneeded gateways in spoke subscriptions.

**GOV-07 · Enforce diagnostic settings with retention** — `[All · Low · $$]` Deploy diagnostic settings via policy so logs go to the right workspace and table plan, not everywhere.

**GOV-08 · Use quotas as guardrails** — `[All · Low · $$]` Lower vCPU quotas for expensive families in non-production subscriptions.

**GOV-09 · Run a monthly cost review** — `[All · Low · $$$]` Same dashboard each time: trend, unit cost, top movers, open recommendations, commitments, decisions.

**GOV-10 · Keep an optimization backlog** — `[SU, EN · Low · $$]` Treat Advisor and FinOps hub recommendations as tickets with owner, estimate and realized savings.

**GOV-11 · Dismiss recommendations with reasons** — `[All · Low · $]` Use postpone/dismiss so DR or compliance resources stop resurfacing; record why.

**GOV-12 · Customize Advisor rightsizing thresholds** — `[All · Low · $$]` Advisor’s VM/VMSS CPU threshold and lookback period can be configured per subscription; align with your risk appetite so engineers trust the recommendations.

**GOV-13 · Require approval for commitment purchases** — `[SU, EN · Low · $$]` Especially after February 2027, every reservation is a one-way door. Require a documented analysis.

**GOV-14 · Write a decommissioning checklist** — `[All · Low · $$]` Disks, snapshots, public IPs, NICs, NAT gateways, private endpoints, load balancers, App Service plans, Log Analytics tables, backup items, DNS zones.

**GOV-15 · Use resource locks thoughtfully** — `[All · Low · $]` Locks protect production but also block cleanup; review locked resources in decommissioned subscriptions.

**GOV-16 · Use Azure Policy “audit” before “deny”** — `[All · Low · $]` Measure impact before enforcing to avoid blocking legitimate deployments.

**GOV-17 · Govern Copilot spending policies alongside Azure budgets** — `[EN · Low · $$]` Usage-based Copilot features support spending policies at tenant, group and user level with threshold alerts; treat them as part of the same FinOps program.

**GOV-18 · Use the Graph API to manage Copilot spending policies at scale** — `[EN · Med · $]` Programmatic policy management lets FinOps tools apply limits consistently.

**GOV-19 · Gate AI model access by group** — `[EN · Low · $$]` Model-family access per group limits which expensive models users can reach.

**GOV-20 · Schedule a quarterly commitment and license review** — `[SU, EN · Low · $$]` Commitments, AHB coverage, Software Assurance renewals and ESU decisions belong in the same meeting.

## 3.5 Commitments: savings plans and reservations

**COM-01 · Know the menu** — `[All · Low · $$$]` Savings plan for compute (1- or 3-year hourly spend commitment across VMs, Dedicated Hosts, App Service premium tiers, Functions Premium, Container Apps and more). Savings plan for databases (1-year, across Azure SQL, SQL MI, PostgreSQL, MySQL, Cosmos DB provisioned throughput, DocumentDB and more). Reservations (resource-specific, 1- or 3-year, for VMs, databases, storage, Cosmos DB, Databricks, Fabric, Azure OpenAI provisioned throughput, disks and many others). Spot VMs as an alternative for interruptible work.

**COM-02 · Treat February 1, 2027 as a planning deadline** — `[All · Low · $$$]` After that date, new reservations for savings-plan-covered services can’t be exchanged, and existing ones keep a single final exchange. Inventory every reservation, its expiry, its likely future need, and decide now whether to exchange before the deadline, trade in to a savings plan, or hold.

**COM-03 · Use pre-deadline exchanges to fix known mismatches** — `[All · Low · $$]` Until February 1, 2027 the current exchange policy still applies. Move reservations that no longer match your fleet (families, regions, sizes) while you still can.

**COM-04 · Spend your one final exchange strategically** — `[All · Low · $$]` Whatever you receive from a post-deadline exchange is non-exchangeable. Save the final exchange for a known migration, not for routine tidying.

**COM-05 · Watch auto-renew after the deadline** — `[All · Low · $$]` A renewal after February 1, 2027 is a new purchase without exchange rights. Review auto-renew settings before each expiry.

**COM-06 · Use trade-in to move from reservations to savings plans** — `[All · Low · $$]` Compute reservations can be traded in for a compute savings plan and database reservations for a database savings plan. A savings plan can’t be exchanged back into a reservation.

**COM-07 · Shrink first, then commit** — `[All · Low · $$$]` Rightsize, delete orphans, apply AHB and schedule non-production before buying.

**COM-08 · Reservations for stable shapes, savings plans for everything that moves** — `[All · Low · $$$]` Reservations give the deepest discounts for a fixed family and region; savings plans follow you across families, regions and services. Post-2027, only reserve what you are confident won’t change shape.

**COM-09 · Remember reservations apply before savings plans** — `[All · Low · $$]` Size the savings plan for what remains after reservations, or you’ll over-commit.

**COM-10 · Use management-group-scoped recommendations** — `[EN · Low · $$]` Evaluate savings plan and reservation opportunities across an entire hierarchy in one view.

**COM-11 · Choose scope deliberately** — `[SU, EN · Low · $$]` Shared scope maximizes utilization; management group, subscription or resource group scope supports chargeback. Shared is the safe default for utilization.

**COM-12 · Buy in staggered tranches** — `[All · Low · $$]` Monthly or quarterly purchases build a ladder that tracks the baseline and avoid a single large expiry.

**COM-13 · Pay monthly unless cash is cheap** — `[All · Low · $]` Monthly payment has no price penalty for reservations and savings plans; startups should almost always pay monthly.

**COM-14 · Know the cancellation rules** — `[All · Low · $$]` Reservations can be cancelled subject to an early termination fee and an annual refund cap; savings plans cannot be cancelled. Factor this into risk.

**COM-15 · Size database savings plans to the stable floor** — `[All · Low · $$]` One-year term only, discount varies by service; serverless SQL gets the highest rate. Size close to baseline usage.

**COM-16 · Check database savings plan exclusions** — `[All · Low · $$]` DTU-model SQL and Cosmos DB serverless aren’t eligible; storage, backup and BYOL licensing don’t consume the plan. Some hourly SQL Server licenses consume the commitment at pay-as-you-go rates, so check what your scope will absorb.

**COM-17 · Compare database reservations against the database savings plan** — `[SU, EN · Med · $$]` Reservations can still discount more for very stable databases; the plan wins when you’re modernizing (SQL to PostgreSQL, provisioned to serverless) or moving regions.

**COM-18 · Use VM reservation instance size flexibility** — `[All · Low · $]` VM reservations with instance size flexibility apply across sizes in the same flexibility group and region.

**COM-19 · Reserve disks, storage and other non-compute where stable** — `[SU, EN · Low · $$]` Premium SSD (larger sizes), Blob storage capacity, Azure Files, Cosmos DB, Databricks, Fabric, Synapse, App Service stamps and many more offer reservations.

**COM-20 · Leave interruptible work on Spot** — `[All · Low · $$]` Commit the steady floor; let Spot absorb flexible capacity.

**COM-21 · Set reservation utilization alerts** — `[All · Low · $$]` Cost Management can alert when reservation utilization drops below a threshold.

**COM-22 · Track coverage, utilization and Effective Savings Rate** — `[All · Low · $$]` ESR = savings from discounts ÷ what the usage would cost at pay-as-you-go. It captures both coverage and discount depth.

**COM-23 · Allocate commitment benefits fairly** — `[SU, EN · Med · $$]` Use amortized cost so teams see the discount on their usage; charge unused commitment to a central line.

**COM-24 · Use RBAC roles for savings plans** — `[SU, EN · Low · $]` Savings plan administrator, purchaser, contributor and reader roles separate duties.

**COM-25 · Consider third-party commitment managers carefully** — `[SU, EN · Low · $$]` Their value proposition changes with the end of exchanges; model their fee and risk-sharing terms against a disciplined native cadence.

## 3.6 Azure Hybrid Benefit and licensing

**LIC-01 · Apply Azure Hybrid Benefit to every eligible Windows Server VM** — `[EN · Low · $$$]` With Software Assurance or eligible subscriptions, AHB removes the Windows license charge from VM pricing.

```bash
az vm update -g <rg> -n <vm> --license-type Windows_Server
```

**LIC-02 · Apply AHB to SQL Server everywhere you’re entitled** — `[EN · Low · $$$]` Azure SQL Database (vCore), SQL Managed Instance and SQL Server on VMs support AHB; SQL license cost frequently exceeds compute.

**LIC-03 · Use centralized AHB management for SQL** — `[EN · Low · $$]` Assign SQL Server licenses at billing scope so Azure applies AHB automatically up to your entitlement, instead of resource by resource.

**LIC-04 · Use AHB for RHEL and SLES** — `[EN · Low · $$]` Bring your own Red Hat or SUSE subscriptions to pay-as-you-go images and stop paying twice.

**LIC-05 · Audit AHB coverage monthly with Resource Graph** — `[EN · Low · $$]` See the appendix query for Windows VMs without `licenseType`.

**LIC-06 · Stack AHB with reservations and savings plans** — `[EN · Low · $$$]` They address different cost components (license vs compute) and combine.

**LIC-07 · Use Developer/Express editions for SQL in non-production** — `[All · Low · $$]` Enterprise edition in test environments is an expensive habit.

**LIC-08 · Right-size SQL Server edition** — `[EN · Med · $$]` Many Enterprise workloads only need Standard features; downgrade saves a large share of license cost.

**LIC-09 · Use constrained vCPU VM sizes for per-core licenses** — `[EN · Low · $$]` Constrained-core sizes keep memory and IO while reducing active vCPUs, lowering per-core SQL Server and Oracle licensing.

**LIC-10 · Use pay-as-you-go SQL licensing through Arc for variable estates** — `[EN · Med · $$]` SQL Server enabled by Azure Arc can bill licenses hourly, which helps with dev/test churn and seasonal instances.

**LIC-11 · Count Dev/Test subscription savings** — `[All · Low · $$]` Windows VMs in Dev/Test subscriptions don’t pay Windows license charges; move non-production there.

**LIC-12 · Review Microsoft licensing rules for outsourcing** — `[EN · Low · $]` Licensing rules differ between Azure and other clouds; factor them into multi-cloud placement decisions.

**LIC-13 · Buy third-party software through Marketplace when it burns down MACC** — `[SU, EN · Low · $$]` Azure benefit-eligible Marketplace offers count toward your Microsoft Azure Consumption Commitment.

**LIC-14 · Negotiate Marketplace private offers** — `[SU, EN · Low · $$]` Custom pricing and terms from publishers via private offers.

**LIC-15 · Audit Marketplace subscriptions quarterly** — `[All · Low · $]` SaaS and VM offers auto-renew after projects end.

## 3.7 Virtual machines

**VM-01 · Deallocate, don’t just stop** — `[All · Low · $$$]` A VM stopped from inside the OS keeps billing for compute; only “Stopped (deallocated)” stops compute charges.

```bash
az vm deallocate -g <rg> -n <vm>
```

**VM-02 · Act on Advisor rightsizing and shutdown recommendations** — `[All · Low · $$$]` Advisor flags underutilized VMs and VM scale sets with resize or shutdown suggestions.

**VM-03 · Collect memory metrics** — `[All · Med · $$]` The Azure Monitor agent with VM insights gives memory data so rightsizing doesn’t rely on CPU alone.

**VM-04 · Use auto-shutdown for dev/test VMs** — `[All · Low · $$]` Built-in auto-shutdown per VM with a notification webhook; quick and effective.

**VM-05 · Use Start/Stop VMs v2 for schedules at scale** — `[All · Low · $$$]` Schedule-based and sequenced start/stop across subscriptions using tags. Non-production running only business hours cuts its compute substantially.

**VM-06 · Use burstable B-series for low-average workloads** — `[All · Low · $$]` B-series suits workloads with low average CPU and occasional bursts; watch credit exhaustion.

**VM-07 · Move to newer VM series** — `[All · Med · $$]` Newer generations (v5/v6 and beyond) generally offer better price-performance; benchmark your workload.

**VM-08 · Evaluate Arm-based Cobalt VMs** — `[All · Med · $$$]` Azure Cobalt-based VMs offer strong price-performance for scale-out Linux, containers and open-source stacks. Build multi-arch images.

**VM-09 · Prefer AMD variants where Arm doesn’t fit** — `[All · Low · $]` AMD-based series (“a” in the name) are often cheaper than Intel equivalents.

**VM-10 · Run interruptible work on Spot VMs** — `[All · Med · $$$]` Spot VMs are deeply discounted with eviction risk. Use eviction policy “Deallocate” or “Delete” deliberately and set a max price of -1 to avoid price-based eviction.

**VM-11 · Mix Spot and regular in VM Scale Sets (flexible orchestration)** — `[All · Med · $$]` Spot Priority Mix keeps a regular-priority base and fills the rest with Spot.

**VM-12 · Use Spot placement scores and eviction rates** — `[All · Low · $]` Pick sizes and regions with better availability to reduce evictions.

**VM-13 · Autoscale VM Scale Sets** — `[All · Low · $$]` Scale on metrics or schedules; predictive autoscale helps with daily cycles.

**VM-14 · Use ephemeral OS disks for stateless VMs** — `[All · Low · $$]` Ephemeral OS disks use local storage, are free of managed disk charges, and reimage fast.

**VM-15 · Use Standard SSD for non-production disks** — `[All · Low · $$]` Premium SSD on dev/test VMs is common and unnecessary.

**VM-16 · Release unassociated public IPs** — `[All · Low · $]` Public IPs bill whether used or not. Use Bastion or private access instead of public IPs on VMs.

**VM-17 · Clean up orphaned NICs, disks and snapshots after VM deletion** — `[All · Low · $$]` Deleting a VM doesn’t delete its disks and NICs unless you set delete options; set `--os-disk-delete-option Delete` and NIC delete options at creation.

**VM-18 · Use Azure Bastion SKUs wisely** — `[All · Low · $]` Bastion Developer SKU suits dev/test access cheaply; Standard and Premium bill hourly. One Bastion in a hub can serve peered VNets.

**VM-19 · Consolidate low-utilization VMs** — `[All · Med · $$]` Many tiny always-on VMs often cost more than containers or App Service.

**VM-20 · Dedicated Hosts only for licensing or compliance** — `[EN · Low · $$]` Pack them densely; use host groups and automatic placement.

**VM-21 · Use Azure Compute Fleet or VMSS flexible mode for diversification** — `[SU, EN · Med · $$]` Diversify across sizes for Spot capacity and cost.

**VM-22 · Watch GPU idle time** — `[All · Low · $$$]` Alert on low GPU utilization; deallocate idle GPU VMs immediately.

**VM-23 · Use Azure Batch or CycleCloud for job workloads** — `[All · Low · $$]` Pools that scale to zero with Spot nodes beat permanent clusters.

**VM-24 · Use capacity reservations only with commitments** — `[EN · Low · $$]` On-demand capacity reservations bill whether used or not; pair with reservations or savings plans and release unused capacity.

**VM-25 · Avoid premium features you don’t use** — `[All · Low · $]` Accelerated networking is free, but Ultra disks, zonal redundancy and large temp disks may not be needed for every workload.

## 3.8 AKS and containers

**AKS-01 · Enable the AKS cost analysis add-on** — `[All · Low · $$$]` Namespace and asset-level costs in Cost analysis.

**AKS-02 · Act on AKS cost recommendations in Advisor** — `[All · Low · $$]` Advisor surfaces AKS cost recommendations such as rightsizing node pools.

**AKS-03 · Set requests that match reality** — `[All · Med · $$$]` Over-requested CPU and memory are the largest Kubernetes waste source; use VPA recommendations.

**AKS-04 · Use the cluster autoscaler with an aggressive profile for non-prod** — `[All · Low · $$]` Tune scale-down delay and utilization thresholds so empty nodes leave quickly.

**AKS-05 · Use node auto-provisioning (Karpenter-based)** — `[SU, EN · Med · $$$]` Node auto-provisioning picks right-sized VMs, consolidates workloads and mixes Spot and Arm.

**AKS-06 · Run stateless pods on Spot node pools** — `[All · Low · $$]` Add tolerations for the Spot taint; keep system pools on regular VMs.

**AKS-07 · Use Arm node pools** — `[All · Med · $$]` Cobalt or Ampere node pools with multi-arch images for price-performance.

**AKS-08 · Stop non-production clusters** — `[All · Low · $$]` `az aks stop` deallocates the cluster’s nodes; start it again in the morning.

```bash
az aks stop -g <rg> -n <cluster>
```

**AKS-09 · Choose Free vs Standard vs Premium tier deliberately** — `[All · Low · $]` Standard adds a financially backed SLA and scale; dev clusters rarely need it.

**AKS-10 · Evaluate AKS Automatic** — `[ST, SU · Low · $$]` Managed node provisioning and best-practice defaults reduce operational effort; compare against a well-tuned Standard cluster for large estates.

**AKS-11 · Consolidate small clusters** — `[SU, EN · High · $$]` Each cluster carries system pools, monitoring, networking and management overhead.

**AKS-12 · Size system node pools minimally** — `[All · Low · $]` Small, dedicated system pools with the right VM size; don’t run apps there.

**AKS-13 · Trim Container Insights collection** — `[All · Low · $$]` Use cost-optimized collection presets, filter namespaces, and send logs to Basic tables where suitable.

**AKS-14 · Keep traffic zone-aware** — `[All · Med · $]` Topology-aware routing reduces cross-zone hops and latency.

**AKS-15 · Use Container Apps for scale-to-zero microservices** — `[All · Low · $$]` Consumption plan scales to zero; dedicated workload profiles suit steady load. Container Apps is covered by the compute savings plan.

**AKS-16 · Use ACR tiers and retention policies** — `[All · Low · $]` Basic or Standard is enough for many teams; enable retention and purge untagged manifests.

**AKS-17 · Clean up orphaned persistent volumes** — `[All · Low · $]` Check reclaim policies and sweep released disks in the node resource group.

**AKS-18 · Track cost per namespace and per request** — `[SU, EN · Med · $$]` Join cost analysis data with request metrics for unit cost per service.

## 3.9 App Service, Functions and integration

**APP-01 · Delete empty App Service plans** — `[All · Low · $$]` A plan with no apps still bills. See the appendix query.

**APP-02 · Consolidate apps onto fewer plans** — `[All · Med · $$]` Many low-traffic apps can share one plan; use per-app scaling where needed.

**APP-03 · Scale down non-production plans** — `[All · Low · $$]` Lower tiers and instance counts for dev/test; schedule scale-down overnight.

**APP-04 · Use Premium v3/v4 with the compute savings plan or reservations** — `[SU, EN · Low · $$]` Premium tiers are commitment-eligible; older tiers may cost more per unit of capacity.

**APP-05 · Use autoscale rules on plans** — `[All · Low · $$]` Scale out on demand; set sensible minimums.

**APP-06 · Use Functions Flex Consumption for event workloads** — `[All · Low · $$]` Scale to zero with optional always-ready instances; move off legacy consumption or oversized Premium plans where it fits.

**APP-07 · Right-size always-ready and pre-warmed instances** — `[All · Low · $]` They remove cold starts but bill continuously; size to business needs.

**APP-08 · Use Static Web Apps for static front ends** — `[All · Low · $]` Cheaper than running a full App Service plan for static content.

**APP-09 · Choose Logic Apps Standard vs Consumption by volume** — `[All · Med · $$]` Consumption bills per action; Standard bills for compute. High-volume workflows often belong on Standard.

**APP-10 · Use API Management tiers deliberately** — `[All · Low · $$]` Consumption or v2 tiers often fit; Premium is for multi-region and VNet-heavy needs. Delete idle developer instances.

**APP-11 · Use Service Bus and Event Hubs tiers deliberately** — `[All · Low · $$]` Premium and Dedicated tiers bill for capacity; Standard suits many workloads. Scale Event Hubs throughput units or enable auto-inflate with a cap.

**APP-12 · Filter events at the source** — `[All · Low · $]` Event Grid filters and Service Bus subscription rules prevent paying to process irrelevant events.

**APP-13 · Set log levels and sampling for App Service and Functions** — `[All · Low · $$]` Application Insights adaptive sampling and lower log levels reduce ingestion.

**APP-14 · Use deployment slots carefully** — `[All · Low · $]` Slots share plan capacity; keep only the slots you use.

**APP-15 · Know when serverless stops being cheaper** — `[SU, EN · Med · $$]` At high, steady throughput, App Service, Container Apps dedicated profiles or AKS may be cheaper. Re-check as traffic grows.

## 3.10 Blob and file storage

**STG-01 · Use access tiers: hot, cool, cold, archive** — `[All · Low · $$$]` Lower tiers trade cheaper storage for higher access and transaction charges. Match tier to how often data is read.

**STG-02 · Automate tiering with lifecycle management** — `[All · Low · $$$]` Lifecycle policies move blobs to cooler tiers after days since last modification or last access, and delete them later.

```json
{"rules":[{"name":"age-out","enabled":true,"type":"Lifecycle","definition":{
 "filters":{"blobTypes":["blockBlob"],"prefixMatch":["logs/"]},
 "actions":{"baseBlob":{"tierToCool":{"daysAfterModificationGreaterThan":30},
  "tierToCold":{"daysAfterModificationGreaterThan":90},
  "tierToArchive":{"daysAfterModificationGreaterThan":180},
  "delete":{"daysAfterModificationGreaterThan":730}}}}}]}
```

**STG-03 · Enable last-access-time tracking for access-based rules** — `[All · Low · $$]` Tiering on last access is more accurate than on modification time for read-heavy data.

**STG-04 · Respect early deletion periods** — `[All · Low · $]` Cool, cold and archive have minimum retention periods with early deletion charges; don’t tier short-lived data.

**STG-05 · Remember archive rehydration costs and latency** — `[All · Low · $]` Archive needs rehydration before reading; plan for hours of latency and the rehydration charge.

**STG-06 · Choose redundancy per data class** — `[All · Low · $$]` LRS, ZRS, GRS, RA-GRS, GZRS and RA-GZRS differ significantly in cost. Dev/test and reproducible data rarely need geo-redundancy.

**STG-07 · Tune soft delete and versioning** — `[All · Low · $$]` Deleted blobs, snapshots and versions in retention are billed. Add lifecycle rules for previous versions and keep retention appropriate.

**STG-08 · Delete old blob snapshots** — `[All · Low · $]` Snapshots accumulate; lifecycle rules can delete them by age.

**STG-09 · Reserve Blob and Files capacity for stable volumes** — `[SU, EN · Low · $$]` Storage reservations discount committed capacity per tier and redundancy.

**STG-10 · Pick Azure Files billing model deliberately** — `[All · Low · $$]` Compare provisioned (v2) vs pay-as-you-go models and tiers (premium, transaction-optimized, hot, cool) for your IO pattern.

**STG-11 · Use Azure Files tiering with File Sync** — `[EN · Low · $$]` Cloud tiering keeps hot files on-premises and cold files in Azure.

**STG-12 · Keep compute and storage in the same region** — `[All · Low · $$]` Cross-region reads incur data transfer.

**STG-13 · Reduce transaction costs** — `[All · Med · $]` Batch small writes, use larger blocks, and cache reads behind Front Door or CDN.

**STG-14 · Use Blob inventory and Storage insights** — `[All · Low · $$]` Inventory reports show tier, size and age per container so you know what to tier or delete.

**STG-15 · Use columnar, compressed formats** — `[All · Med · $$]` Parquet/Delta with compression shrinks storage and analytics scan costs.

**STG-16 · Delete orphaned storage accounts** — `[All · Low · $]` Old diagnostics, boot diagnostics and staging accounts accumulate quietly.

**STG-17 · Use private endpoints selectively** — `[All · Low · $]` Private endpoints carry hourly and data processing charges; use service endpoints where they meet security requirements.

**STG-18 · Prefer premium block blob only for low-latency needs** — `[All · Low · $]` Premium storage suits high-transaction workloads; most data belongs in standard tiers.

**STG-19 · Use NFS on Blob or ADLS for analytics instead of file shares** — `[SU, EN · Med · $]` Object storage is usually cheaper than file storage for large analytic datasets.

**STG-20 · Set immutable storage policies only where required** — `[EN · Low · $]` Legal hold and time-based retention prevent deletion, which also prevents cost cleanup.

## 3.11 Managed disks and backup

**DSK-01 · Delete unattached managed disks** — `[All · Low · $$]` The appendix query finds them across all subscriptions.

**DSK-02 · Choose disk type by measured IOPS** — `[All · Low · $$]` Standard HDD, Standard SSD, Premium SSD, Premium SSD v2 and Ultra Disk differ greatly in cost. Many Premium disks run far below their performance tier.

**DSK-03 · Use Premium SSD v2 to decouple performance from size** — `[All · Med · $$]` Provision capacity, IOPS and throughput independently instead of buying a larger disk for performance.

**DSK-04 · Downsize oversized disks** — `[All · Med · $]` Managed disks can’t shrink in place; migrate data to a smaller disk where savings justify it.

**DSK-05 · Use disk bursting instead of larger tiers** — `[All · Low · $]` Bursting covers short spikes without permanently higher tiers.

**DSK-06 · Use incremental snapshots** — `[All · Low · $$]` Incremental snapshots store only changes and are cheaper than full snapshots.

**DSK-07 · Delete old snapshots** — `[All · Low · $$]` Snapshots older than your recovery need are pure cost; the appendix query lists them by age.

**DSK-08 · Reserve large Premium SSD disks** — `[SU, EN · Low · $]` Disk reservations are available for larger Premium SSD sizes.

**DSK-09 · Right-size Azure Backup retention** — `[All · Low · $$]` Daily backups kept for years are common; align policies to actual recovery requirements.

**DSK-10 · Use Backup archive tier for long-term points** — `[All · Low · $]` Move eligible long-term recovery points to the archive tier.

**DSK-11 · Use LRS backup storage for non-critical data** — `[All · Low · $]` Geo-redundant backup storage costs more; choose redundancy per workload.

**DSK-12 · Stop protection and delete data for decommissioned resources** — `[All · Low · $]` Backup items for deleted VMs keep billing until you stop protection and delete data.

**DSK-13 · Review Site Recovery protected instances** — `[EN · Low · $$]` Replicated VMs bill per instance plus storage; remove replication for retired systems.

**DSK-14 · Use enhanced backup policies deliberately** — `[All · Low · $]` More frequent snapshots and longer instant restore retention add storage cost.

## 3.12 Databases

**DB-01 · Use Azure SQL serverless with auto-pause for intermittent workloads** — `[All · Low · $$$]` Serverless bills compute per second and can pause when idle (storage still bills). Ideal for dev/test and spiky apps.

**DB-02 · Use elastic pools for many small databases** — `[All · Low · $$]` Pools share resources across databases with variable usage.

**DB-03 · Act on Azure SQL rightsizing recommendations** — `[All · Low · $$]` Advisor and Query Performance Insight show over-provisioned databases.

**DB-04 · Choose vCore over DTU when you need AHB or commitments** — `[EN · Med · $$]` vCore models support Azure Hybrid Benefit, reservations and the database savings plan; DTU doesn’t.

**DB-05 · Use Hyperscale for large or growing databases** — `[SU, EN · Med · $$]` Hyperscale pricing and scaling can beat Business Critical for many large workloads; benchmark.

**DB-06 · Stop SQL Managed Instance when idle** — `[All · Low · $$]` SQL MI supports stop/start (with schedules) for non-production instances.

**DB-07 · Use the General Purpose tier unless you need Business Critical** — `[All · Low · $$]` Business Critical costs substantially more; reserve it for workloads needing its latency and HA.

**DB-08 · Skip zone redundancy and replicas in non-production** — `[All · Low · $$]` HA features multiply footprint.

**DB-09 · Stop PostgreSQL and MySQL flexible servers off-hours** — `[All · Low · $$]` Stopped servers don’t bill compute (storage still bills); servers auto-start after a maximum stop period, so schedule them.

```bash
az postgres flexible-server stop -g <rg> -n <server>
```

**DB-10 · Use burstable tiers for small PostgreSQL/MySQL** — `[All · Low · $$]` Burstable compute suits dev/test and low-traffic apps.

**DB-11 · Cosmos DB: use autoscale for variable traffic** — `[All · Low · $$]` Autoscale throughput scales between a max and a floor; pays off when usage varies a lot.

**DB-12 · Cosmos DB: use serverless for low, spiky traffic** — `[All · Low · $$]` Serverless bills per request unit consumed; note it isn’t eligible for the database savings plan.

**DB-13 · Cosmos DB: reduce RU per operation** — `[All · Med · $$$]` Point reads by id and partition key, tuned indexing policies (exclude unused paths), and smaller documents cut RU charges dramatically.

**DB-14 · Cosmos DB: use TTL** — `[All · Low · $]` Expire old items automatically to control storage and index size.

**DB-15 · Cosmos DB: share throughput at database level** — `[All · Low · $$]` Database-level provisioned throughput shared across containers avoids per-container minimums.

**DB-16 · Cosmos DB: review multi-region writes** — `[SU, EN · Low · $$]` Each additional region multiplies throughput and storage cost.

**DB-17 · Use reserved capacity or the database savings plan for steady databases** — `[SU, EN · Low · $$$]` Databases are steady and long-lived, making them strong commitment candidates; weigh reservations against the plan (COM-17).

**DB-18 · Use Azure Cache for Redis / Managed Redis tiers deliberately** — `[All · Low · $$]` Pick the smallest tier that meets memory and throughput; drop replicas and clustering in non-production.

**DB-19 · Delete idle databases** — `[All · Low · $$]` Find databases with no connections over weeks; export a BACPAC or back up, then delete.

**DB-20 · Trim backup retention and long-term retention** — `[All · Low · $]` Match PITR and LTR retention to policy.

**DB-21 · Consolidate small servers** — `[SU, EN · Med · $$]` Many tiny servers for many microservices often cost more than one well-sized server with per-service databases.

**DB-22 · Modernize off SQL Server licensing where possible** — `[EN · High · $$$]` Moving to Azure Database for PostgreSQL removes SQL licensing, and the database savings plan follows the migration.

## 3.13 Networking and data transfer

**NET-01 · Draw your data-transfer map** — `[All · Med · $$$]` List internet egress, inter-region, peering, VPN, ExpressRoute, private endpoint and NAT flows with volume.

**NET-02 · Delete idle gateways** — `[All · Low · $$]` VPN gateways, ExpressRoute gateways, Application Gateways and NAT gateways bill hourly whether used or not.

**NET-03 · Right-size VPN and ExpressRoute gateway SKUs** — `[All · Low · $$]` Higher SKUs cost more; choose by measured throughput and tunnel count.

**NET-04 · Choose ExpressRoute metered vs unlimited by volume** — `[EN · Low · $$]` Metered plans charge egress per GB; unlimited includes it. Model your outbound volume.

**NET-05 · Use ExpressRoute Local for in-metro regions** — `[EN · Low · $$]` Local circuits include egress for regions in the same metro.

**NET-06 · Deallocate Azure Firewall in non-production** — `[All · Low · $$]` Azure Firewall can be deallocated and reallocated with PowerShell; also choose Basic or Standard instead of Premium where features aren’t needed.

**NET-07 · Share one firewall and Bastion in the hub** — `[SU, EN · Med · $$]` Hub-and-spoke with shared services avoids duplicate firewalls and bastions per spoke.

**NET-08 · Review VNet peering traffic** — `[All · Low · $$]` Peering charges apply to data in and out; global peering costs more. Keep chatty services in the same VNet or region.

**NET-09 · Reduce cross-region traffic** — `[All · Med · $$]` Replicate only what DR and latency require; co-locate analytics with data.

**NET-10 · Use Front Door or CDN for public content** — `[All · Low · $$$]` Caching reduces origin egress and compute; compare Front Door Standard vs Premium features.

**NET-11 · Compress responses** — `[All · Low · $$]` Compression at Front Door or the app cuts egress bytes for text.

**NET-12 · Release unassociated public IPs** — `[All · Low · $]` Standard public IPs bill whether associated or not.

**NET-13 · Use public IP prefixes thoughtfully** — `[EN · Low · $]` Prefixes reserve blocks you pay for; use them only where you need predictable addresses.

**NET-14 · Count private endpoint costs** — `[All · Low · $$]` Each private endpoint bills hourly and per GB processed; hundreds of endpoints across spokes add up. Centralize where architecture allows.

**NET-15 · Use NAT Gateway wisely** — `[All · Low · $]` NAT Gateway bills hourly and per GB; consolidate where possible, and use service endpoints or private endpoints for Azure PaaS traffic instead.

**NET-16 · Delete idle load balancers and Application Gateways** — `[All · Low · $$]` Standard Load Balancer rules and Application Gateway instances bill continuously.

**NET-17 · Right-size Application Gateway v2 autoscaling** — `[All · Low · $$]` Set minimum instances low; consider WAF policies only where needed.

**NET-18 · Use Azure DNS Private Resolver deliberately** — `[EN · Low · $]` Endpoints bill hourly; share them centrally.

**NET-19 · Filter VNet flow logs** — `[All · Low · $$]` Generally available filtering by IP, port, protocol and direction lets you log only what you need.

**NET-20 · Turn off Traffic Analytics where unused** — `[All · Low · $]` Traffic Analytics processes flow logs and ingests into Log Analytics; enable it where you use it.

**NET-21 · Review DDoS Network Protection coverage** — `[EN · Low · $$]` Network Protection is a significant monthly subscription per plan; IP Protection per public IP may suit smaller footprints.

**NET-22 · Use Virtual WAN only when its scale pays off** — `[EN · Med · $$]` Hubs and connections bill hourly; small estates may be cheaper with hub-and-spoke VNets.

**NET-23 · Allocate hub networking costs** — `[EN · Low · $]` Use cost allocation rules to spread hub costs to consuming subscriptions.

**NET-24 · Measure egress per customer** — `[SU, EN · Med · $$]` For SaaS and media, egress per customer is a key unit cost and pricing input.

## 3.14 Monitoring and observability

**MON-01 · Find what you ingest** — `[All · Low · $$$]` Run this in each Log Analytics workspace to rank billable data by table:

```kusto
Usage
| where TimeGenerated > ago(30d)
| where IsBillable == true
| summarize IngestedGB = sum(Quantity) / 1000 by DataType
| sort by IngestedGB desc
```

**MON-02 · Use Basic and Auxiliary logs for high-volume, low-query data** — `[All · Low · $$$]` Table plans with lower ingestion prices (and query charges) suit verbose debug, flow and audit logs.

**MON-03 · Transform data at ingestion with data collection rules** — `[All · Med · $$]` DCR transformations drop columns and rows before they’re billed.

**MON-04 · Set retention per table** — `[All · Low · $$]` Keep interactive retention short and use long-term retention (archive) for compliance.

**MON-05 · Use commitment tiers for steady ingestion** — `[SU, EN · Low · $$]` Log Analytics and Sentinel commitment tiers discount predictable daily volume; dedicated clusters can pool commitments across workspaces.

**MON-06 · Consolidate workspaces** — `[SU, EN · Med · $$]` Fewer workspaces make commitment tiers reachable and reduce duplicated data.

**MON-07 · Avoid duplicate diagnostic settings** — `[All · Low · $$]` The same resource sending logs to multiple workspaces or destinations multiplies cost.

**MON-08 · Enable sampling in Application Insights** — `[All · Low · $$]` Adaptive or fixed-rate sampling reduces telemetry volume while preserving statistics.

**MON-09 · Set a daily cap as a safety net, not a strategy** — `[All · Low · $$]` Caps stop runaway ingestion but drop data; alert before the cap is reached.

**MON-10 · Trim AKS Container Insights and Prometheus metrics** — `[All · Low · $$]` Use cost presets, namespace filters and fewer scraped metrics.

**MON-11 · Watch custom metric and metric-alert counts** — `[All · Low · $]` Alert rules and custom metrics bill monthly; remove unused ones.

**MON-12 · Route archive-only logs to storage** — `[All · Low · $$]` Diagnostic settings to a storage account with lifecycle rules are cheapest for keep-but-rarely-read logs.

**MON-13 · Review Sentinel data connectors** — `[EN · Low · $$]` Some sources (Microsoft 365, Defender alerts) are free; verbose sources like firewall logs belong in cheaper table plans.

**MON-14 · Use Azure Monitor workspace for Prometheus** — `[All · Low · $]` Managed Prometheus bills by samples ingested; tune scrape intervals.

**MON-15 · Reduce log volume at the source** — `[All · Med · $$$]` Drop debug logs in production and stop logging full payloads.

**MON-16 · Don’t duplicate telemetry into third-party tools** — `[SU, EN · Med · $$]` Pick a system of record per signal.

**MON-17 · Track observability as a share of total spend** — `[SU, EN · Low · $$]` Investigate when monitoring cost grows faster than the workloads it monitors.

**MON-18 · Use workbooks to show ingestion by team** — `[SU, EN · Low · $]` Join `_ResourceId` to tags for showback of logging cost.

## 3.15 Data and analytics

**DATA-01 · Pause Microsoft Fabric capacities when idle** — `[All · Low · $$$]` Fabric capacities bill while running; pause non-production capacities and schedule them.

**DATA-02 · Reserve Fabric capacity for steady use** — `[SU, EN · Low · $$]` Fabric capacity reservations discount always-on capacity.

**DATA-03 · Right-size Fabric capacity using the Capacity Metrics app** — `[All · Low · $$]` Smoothing and bursting mean you may need less capacity than peak suggests.

**DATA-04 · Pause Synapse dedicated SQL pools** — `[All · Low · $$]` Dedicated pools bill while running; pause outside working hours.

**DATA-05 · Use serverless SQL and Spark pools for ad hoc work** — `[All · Low · $]` Pay per query or per session instead of keeping pools running.

**DATA-06 · Databricks: use job clusters, auto-termination and Spot workers** — `[All · Low · $$$]` All-purpose clusters left running are a top waste source; set auto-termination and use Spot for workers.

**DATA-07 · Databricks: pre-purchase DBCUs for steady usage** — `[SU, EN · Low · $$]` Databricks commit units discount predictable consumption.

**DATA-08 · Databricks: use cluster policies** — `[SU, EN · Low · $$]` Policies cap node types, sizes and auto-termination for every user.

**DATA-09 · Data Factory: reduce activity runs and DIU** — `[All · Low · $$]` Fewer, larger copy activities and right-sized DIUs cut orchestration and data movement cost; shut down idle SSIS integration runtimes.

**DATA-10 · Azure Data Explorer: use optimized autoscale and stop dev clusters** — `[All · Low · $$]` Scale clusters with demand and stop non-production clusters.

**DATA-11 · Power BI / Fabric: match licensing to usage** — `[All · Low · $]` Audit Pro/PPU licenses and capacity usage.

**DATA-12 · Partition and use columnar formats** — `[All · Med · $$]` Delta/Parquet with partitioning reduce compute for every engine.

**DATA-13 · Use Event Hubs capture instead of custom pipelines** — `[All · Low · $]` Capture writes streams to storage without extra compute.

**DATA-14 · Use Stream Analytics streaming units carefully** — `[All · Low · $]` Right-size SUs and stop idle jobs.

## 3.16 AI and Microsoft Foundry

**AI-01 · Treat AI as its own FinOps scope** — `[All · Low · $$$]` Dedicated subscriptions or resource groups, budgets, anomaly alerts and unit metrics (cost per conversation, document, agent task).

**AI-02 · Pick the smallest model that meets quality** — `[All · Med · $$$]` Mini/nano-class models handle most traffic; use evaluations in Foundry to prove where larger models are needed.

**AI-03 · Use prompt caching** — `[All · Low · $$$]` Prompt caching is on by default for supported models and discounts cached input tokens on Standard deployments; structure prompts so stable content comes first.

**AI-04 · Use Global Batch or Data Zone Batch for asynchronous work** — `[All · Low · $$$]` Batch deployments are priced at half of the corresponding Standard rate with a 24-hour target; ideal for enrichment, classification and evals.

**AI-05 · Use the model router** — `[All · Low · $$]` Foundry’s model router sends prompts to cheaper models when they suffice.

**AI-06 · Choose Global, Data Zone or Regional deployment deliberately** — `[All · Low · $$]` Global is usually cheapest and most available; Data Zone and Regional cost more for residency needs. Use them only where required.

**AI-07 · Size provisioned throughput (PTU) to a traffic percentile** — `[SU, EN · Med · $$]` Cover the steady, high-priority baseline with PTU and spill over to Standard.

**AI-08 · Reserve PTUs for steady workloads** — `[SU, EN · Low · $$$]` Monthly and yearly PTU reservations are much cheaper than hourly PTU. Reservations are tied to deployment type (Global, Data Zone, Regional).

**AI-09 · Cap output tokens and control reasoning effort** — `[All · Low · $$]` Output and reasoning tokens cost more than input; set max tokens and reasoning effort per task.

**AI-10 · Trim RAG context and right-size Azure AI Search** — `[All · Med · $$]` Better retrieval reduces input tokens; choose the smallest AI Search tier and replica/partition count that meets latency, and use vector compression.

**AI-11 · Put an API Management AI gateway in front of models** — `[SU, EN · Med · $$]` Token-limit and token-metrics policies enforce per-team quotas, emit usage for chargeback and enable semantic caching.

**AI-12 · Watch agent loops** — `[All · Med · $$]` Set step limits, track tokens per task and alert on outliers.

**AI-13 · Attribute AI spend by deployment and tag** — `[All · Low · $$]` Separate deployments per application and tag them; Claude usage in Foundry now appears in Cost Management with attribution.

**AI-14 · Delete idle managed online endpoints** — `[All · Low · $$$]` Azure Machine Learning endpoints bill for deployed instances even with zero traffic.

**AI-15 · Use serverless/pay-per-token deployments for spiky usage** — `[All · Low · $$]` Avoid dedicated compute for low or bursty model traffic.

**AI-16 · Use low-priority/Spot for training** — `[All · Med · $$$]` Azure ML compute clusters can use low-priority VMs with checkpointing; scale clusters to zero when idle.

**AI-17 · Set idle shutdown on compute instances** — `[All · Low · $$]` Notebook compute instances, especially GPU, should shut down automatically.

**AI-18 · Govern GitHub Copilot and Copilot BYOK spend** — `[SU, EN · Med · $$]` Routing BYOK traffic through an API Management gateway in front of Foundry allows real-time per-user limits.

**AI-19 · Manage Microsoft 365 Copilot usage-based billing** — `[EN · Low · $$]` Spending policies, user alerts and model-family access per group keep usage-based Copilot spend predictable.

**AI-20 · Measure cost per outcome** — `[All · Med · $$$]` Cost per resolved ticket or accepted suggestion tells you whether AI spend creates value.

## 3.17 Security services

**SEC-01 · Enable Defender for Cloud plans per resource type deliberately** — `[All · Low · $$]` Each plan bills per resource or per unit; enable based on exposure and use resource-level exclusions where supported.

**SEC-02 · Choose Defender for Servers P1 vs P2** — `[All · Low · $$]` P2 adds features (and cost); many non-production servers only need P1 or none.

**SEC-03 · Use the Defender pre-purchase plan for large estates** — `[EN · Low · $$]` Pre-purchase discounts committed Defender consumption.

**SEC-04 · Put Sentinel noise in cheaper table plans** — `[EN · Low · $$]` Auxiliary and Basic logs cut ingestion cost for verbose sources.

**SEC-05 · Consolidate Key Vaults and avoid HSM where unnecessary** — `[All · Low · $]` Premium/HSM-backed keys and Managed HSM cost much more; operations are billed per transaction.

**SEC-06 · Cache secrets in clients** — `[All · Low · $]` Reduce Key Vault transactions.

**SEC-07 · Right-size WAF policies and rules** — `[All · Low · $]` Remove unused policies and custom rules.

**SEC-08 · Review Microsoft Purview and Defender for Storage scanning scope** — `[EN · Low · $$]` Scan sensitive data stores, not everything.

**SEC-09 · Use DDoS IP Protection for small footprints** — `[All · Low · $$]` See NET-21.

**SEC-10 · Remove unused service principals and credentials** — `[All · Low · $]` Fewer credentials means less risk of the compromise that causes the largest bills.

## 3.18 Lifecycle, end of support and ESUs

**EOS-01 · Inventory every Windows Server and SQL Server version** — `[EN · Low · $$$]` Use Azure Arc, Azure Migrate discovery and Resource Graph to list versions across Azure, on-premises and other clouds. You can’t price an ESU decision without an accurate count.

**EOS-02 · Know the current dates** — `[EN · Low · $$]` SQL Server 2016 reached end of extended support on July 14, 2026. Windows Server 2012/2012 R2 ESUs ended October 13, 2026. Windows Server 2016 reaches end of extended support on January 12, 2027. SQL Server 2014 ESUs end July 12, 2027.

**EOS-03 · Onboard servers to Azure Arc before you need ESUs** — `[EN · Med · $$]` ESUs enabled by Azure Arc are a pay-as-you-go monthly subscription billed through Azure (and can draw down MACC). Onboarding ahead of the deadline avoids a January scramble for Windows Server 2016.

**EOS-04 · Check which Azure destinations include ESUs** — `[EN · Low · $$]` Microsoft has included ESUs for some products when they run on Azure (for example, on Azure VMware Solution and Azure Local for Windows Server 2016), but the rules differ by product and version. Don’t assume earlier “free on Azure” arrangements carry over; verify for each product on Microsoft Learn.

**EOS-05 · Compare ESU cost with upgrade and modernization cost** — `[EN · Med · $$$]` ESU prices escalate year over year. An in-place upgrade (Windows Server 2016 can upgrade to 2019, 2022 or 2025) or a move to managed services often pays for itself within the ESU window.

**EOS-06 · Use ESUs as a bridge, not a destination** — `[EN · Low · $$]` Pair every ESU enrollment with a dated upgrade or retirement plan.

**EOS-07 · Use pay-as-you-go ESUs for shrinking estates** — `[EN · Low · $$]` Monthly Arc billing lets you stop paying for servers as they’re upgraded, unlike up-front annual purchases.

**EOS-08 · Modernize SQL Server to Azure SQL Managed Instance or PostgreSQL** — `[EN · High · $$$]` Managed services remove version end-of-support entirely; combined with AHB or a move off SQL licensing, savings can be large.

**EOS-09 · Track ESU spend as its own cost line** — `[EN · Low · $$]` Tag ESU-enabled servers and report the “lifecycle tax” monthly so the cost of delay is visible.

**EOS-10 · Plan Express edition exits** — `[EN · Low · $]` Express editions have no ESU path; find them early.

**EOS-11 · Retire old VM series and managed service versions** — `[All · Med · $]` Older VM series and deprecated service versions often cost more per unit of performance and may face forced migrations.

**EOS-12 · Put lifecycle dates in the FinOps calendar** — `[All · Low · $$]` Review end-of-support dates quarterly alongside commitment expiries.

## 3.19 Commercial levers and programs

**CML-01 · Negotiate a MACC at scale** — `[EN · High · $$$]` A Microsoft Azure Consumption Commitment can bring discounts in exchange for committed spend. Commit to what your forecast supports.

**CML-02 · Model MACC shortfall risk** — `[EN · Med · $$]` Shortfalls are billed; build downside scenarios.

**CML-03 · Burn down MACC with eligible Marketplace and ESU spend** — `[EN · Low · $$]` Azure benefit-eligible Marketplace offers and Arc-billed ESUs can count toward MACC.

**CML-04 · Use Azure Migrate business cases** — `[EN · Low · $$]` Business cases model TCO, AHB and ESU savings for migrations.

**CML-05 · Ask for migration and modernization funding** — `[SU, EN · Low · $$$]` Microsoft programs (such as Azure Accelerate and partner-funded offers) can provide credits or funded engagements for qualifying projects.

**CML-06 · Apply to Microsoft for Startups** — `[ST · Low · $$$]` Azure credits, technical guidance and partner benefits for eligible startups.

**CML-07 · Use Visual Studio subscription credits for individual dev/test** — `[All · Low · $]` Developers’ monthly credits cover personal experimentation outside production subscriptions.

**CML-08 · Right-size support plans** — `[All · Low · $$]` Review support tier and unified support terms annually; use the reviews and engineering time you pay for.

**CML-09 · Use your account team’s optimization reviews** — `[SU, EN · Low · $$]` Cloud solution architects and partners run cost and Well-Architected reviews.

**CML-10 · Run a Well-Architected cost optimization assessment** — `[All · Low · $$]` The Azure Well-Architected Review cost pillar structures the conversation.

**CML-11 · Benchmark discounts before renewal** — `[EN · Med · $]` Use peer benchmarks and your FOCUS history to negotiate.

**CML-12 · Align EA/MCA renewal with commitment strategy** — `[EN · Med · $$]` Plan MACC, reservations, savings plans and the February 2027 exchange change together.

## 3.20 Automation and shift-left

**AUT-01 · Estimate cost in pull requests** — `[SU, EN · Med · $$]` Infracost supports Terraform on Azure; Bicep users can export to ARM and use estimation tools or the ARM MCP pricing tools.

**AUT-02 · Use Azure Policy as code** — `[SU, EN · Med · $$]` Store policy definitions and assignments in Git; enforce tags, allowed SKUs and regions.

**AUT-03 · Automate orphan cleanup** — `[All · Low · $$]` Scheduled Automation runbooks or Functions run Resource Graph queries (appendix) and notify owners or delete after a grace period.

**AUT-04 · Automate schedules** — `[All · Low · $$$]` Start/Stop VMs v2, AKS stop/start, SQL MI schedules, Fabric capacity pause and PostgreSQL stop/start via Automation or Logic Apps.

**AUT-05 · Automate Advisor recommendations into tickets** — `[SU, EN · Med · $$]` Pull Advisor recommendations via API or FinOps hubs and open tickets for owners.

**AUT-06 · Automate diagnostic settings with policy** — `[All · Low · $$]` DeployIfNotExists policies make logging consistent and cheaper.

**AUT-07 · Automate AHB application** — `[EN · Low · $$]` A policy or runbook sets `licenseType` on new Windows VMs where entitled.

**AUT-08 · Automate expiring-resource cleanup** — `[All · Low · $$]` Nightly job reads `expiresOn` tags, warns owners, deallocates and later deletes.

**AUT-09 · Use the FinOps hub Copilot Studio agent template** — `[SU, EN · Med · $]` Let finance and business users ask questions of hub data in Microsoft 365.

**AUT-10 · Send weekly team digests** — `[All · Low · $]` Top recommendations and cost changes per team from FinOps hubs or exports.

**AUT-11 · Build ephemeral environments with TTL** — `[SU, EN · Med · $$]` Preview environments per pull request should be deleted on merge.

**AUT-12 · Keep human approval for destructive actions** — `[All · Low · $]` Snapshot, notify and wait before deleting anything production-adjacent.

## 3.21 Culture and process

**CUL-01 · Make cost a non-functional requirement** — `[All · Low · $$$]` Put cost targets in design docs next to latency and availability.

**CUL-02 · Show engineers their own costs** — `[All · Low · $$]` Cost Management Reader access and team dashboards drive behavior.

**CUL-03 · Celebrate savings** — `[All · Low · $]` Recognize teams that realize savings.

**CUL-04 · Set efficiency targets, not just budgets** — `[SU, EN · Low · $$]` ESR, AHB coverage, tag coverage and unit cost reward doing more with the same.

**CUL-05 · Run FinOps game days** — `[All · Low · $]` Hunt waste in a real non-production subscription using the appendix queries.

**CUL-06 · Train finance on Azure mechanics** — `[SU, EN · Low · $]` Amortization, commitments, AHB and MACC all affect forecasts.

**CUL-07 · Give FinOps and licensing a seat in architecture reviews** — `[SU, EN · Low · $$]` On Azure, license choices can matter as much as architecture.

**CUL-08 · Start scopes from business questions** — `[EN · Low · $$]` The FinOps Framework 2026 recommends initiating scopes from leadership questions.

## 3.22 Startup quick wins

**STU-01 · Start in one region** — `[ST · Low · $$]` Multi-region from day one multiplies cost.

**STU-02 · Default to App Service, Container Apps, Functions and serverless SQL** — `[ST · Low · $$]` Scale-to-zero and managed services track usage when traffic is low.

**STU-03 · Budgets with action groups on every subscription** — `[ST · Low · $$$]` Cheapest protection against surprise bills.

**STU-04 · Keep cloud cost in the runway model** — `[ST · Low · $$]` Track Azure as a share of burn and plan for credits ending.

**STU-05 · Model the post-credit cliff** — `[ST · Low · $$$]` Forecast the month credits run out; buy a small monthly-paid savings plan before the cliff, not after.

**STU-06 · Use Dev/Test subscriptions for non-production** — `[ST · Low · $$]` Avoid Windows and some service charges where eligible.

**STU-07 · Skip zone redundancy and geo-replication for prototypes** — `[ST · Low · $]` Add resilience when the product needs it.

**STU-08 · Watch AI token spend from day one** — `[ST · Low · $$$]` Separate AI resources, budgets, anomaly alerts and batch/caching where possible.

**STU-09 · Review costs weekly** — `[ST · Low · $$]` Fifteen minutes in Cost analysis every Monday.

**STU-10 · Turn on FOCUS exports before you need them** — `[ST · Low · $]` History matters for fundraising and negotiations.

---

# Part 4 — Dashboard library

## 4.1 Choosing a dashboard stack

| Option | Best for | Data | Effort |
| --- | --- | --- | --- |
| Cost analysis smart views and saved views | Everyone, quick analysis | Cost Management | Minutes |
| Advisor and its Cost Optimization workbook | Savings opportunities | Advisor | Minutes |
| FinOps toolkit Power BI reports (storage-based) | Scale-ups wanting rich reports quickly | FOCUS exports in storage | Hours |
| FinOps hubs (Data Explorer or Fabric) | Enterprises, large data volumes, recommendations, AI agents | Exports plus Advisor and Resource Graph | Days |
| Custom BI on FOCUS | Unit economics, multi-cloud, business joins | FOCUS plus business data | Weeks |
| Third-party FinOps platforms | Multi-cloud allocation and automation | Exports and APIs | Days |

## 4.2 Design principles

1. One dashboard per audience and decision.
2. Label every number as actual or amortized, and be consistent.
3. Every chart gets a comparison: prior period, budget, forecast or target.
4. Unit cost next to total cost.
5. Show “unallocated,” “unused commitment” and “license cost” explicitly.
6. Drill down to subscription, resource group, service, meter and resource.
7. Link each waste widget to its remediation runbook.

## 4.3 Twenty-two dashboard proposals

### D01 · Executive Cloud Pulse

**Audience:** CEO, CFO, CTO · **Cadence:** monthly **Widgets:** month-to-date vs budget vs forecast; 13-month amortized trend; cloud cost as a share of revenue; headline unit cost; Effective Savings Rate; AHB coverage; Advisor cost score; MACC burndown; commitments and ESU obligations in the next 90 days.

### D02 · Unit Economics

**Audience:** product leaders, FinOps, finance · **Cadence:** weekly **Widgets:** unit cost by product; cost to serve by customer tier; marginal cost curve; unit cost split into compute, storage, network, licensing, AI and observability.

### D03 · Commitment Command Center

**Audience:** FinOps, procurement · **Cadence:** weekly **Widgets:** reservation and savings plan utilization; coverage by service family (compute, databases, storage, AI PTU); expiry ladder; auto-renew settings; reservations eligible for exchange before February 1, 2027 and those with one final exchange; trade-in candidates; management-group recommendations. **Alerts:** utilization below target; expiry within 60 days; auto-renew enabled on a reservation whose shape may change.

### D04 · Waste and Orphan Tracker

**Audience:** engineering managers, FinOps · **Cadence:** weekly **Widgets:** unattached disks, unassociated public IPs, stopped-not-deallocated VMs, empty App Service plans, orphaned NICs, idle load balancers and gateways, old snapshots, backup items for deleted resources; owners and monthly cost of each. **Data:** Resource Graph (appendix), FinOps hub recommendations, Advisor.

### D05 · License Optimization

**Audience:** licensing, FinOps · **Cadence:** monthly **Widgets:** AHB coverage for Windows Server, SQL Server, RHEL/SLES; SQL editions by environment; license-included spend vs entitlement; Dev/Test subscription usage; constrained-vCPU adoption.

### D06 · Rightsizing and Modernization

**Audience:** platform teams · **Cadence:** biweekly **Widgets:** share of VM hours on current series; Arm share; Spot share; memory-metrics coverage; open Advisor rightsizing savings by team; realized savings.

### D07 · Allocation Health

**Audience:** FinOps, finance · **Cadence:** monthly **Widgets:** share of cost carrying each required tag (after inheritance); unallocated cost by subscription and service; cost allocation rule results; AKS namespace allocation coverage; MC\_ and managed resource group spend.

### D08 · Anomaly Feed

**Audience:** on-call, FinOps · **Cadence:** daily **Widgets:** anomaly alerts by subscription with impact, owner, status; time to resolve; budget threshold breaches.

### D09 · Network and Egress Map

**Audience:** network teams · **Cadence:** monthly **Widgets:** spend by transfer type (internet egress, inter-region, peering, ExpressRoute, VPN, NAT, private endpoints, Front Door); idle gateways; firewall and Bastion costs; egress per customer.

### D10 · Storage Lifecycle

**Audience:** data and platform teams · **Cadence:** monthly **Widgets:** capacity by tier and redundancy; lifecycle policy coverage; soft-deleted and versioned bytes; disk types vs measured IOPS; snapshot age histogram; backup storage by vault.

### D11 · AKS and Containers

**Audience:** platform team · **Cadence:** weekly **Widgets:** cost by cluster and namespace; requested vs used CPU/memory; idle node cost; Spot and Arm share; cluster tier; Container Insights cost.

### D12 · AI and Foundry Spend

**Audience:** AI product leads, FinOps · **Cadence:** daily **Widgets:** spend by model, deployment type and tag; input vs output vs cached tokens; batch share; PTU utilization and reservation coverage; cost per conversation or task; Copilot usage-based spend by group.

### D13 · Databases

**Audience:** DBAs · **Cadence:** monthly **Widgets:** spend by engine and tier; serverless vs provisioned; database savings plan coverage; idle databases; Cosmos DB RU consumption vs provisioned; backup growth.

### D14 · Observability Spend

**Audience:** SRE · **Cadence:** monthly **Widgets:** ingestion by table and workspace; table plan mix (Analytics/Basic/Auxiliary); commitment tier fit; Application Insights sampling; observability as a share of total.

### D15 · Lifecycle and ESU

**Audience:** CTO, infrastructure, licensing · **Cadence:** monthly **Widgets:** server counts by Windows Server and SQL Server version and location; ESU enrollments and monthly cost; upgrade progress; projected ESU spend for the next 12 months; days to each end-of-support date.

### D16 · Budget vs Forecast Variance

**Audience:** finance · **Cadence:** monthly **Widgets:** budget vs actual vs forecast by cost center; variance waterfall (volume, rate, mix, new workloads).

### D17 · Team Showback Scorecard

**Audience:** each engineering team · **Cadence:** weekly digest **Widgets:** team spend and unit cost; open recommendations; tag compliance; orphans owned.

### D18 · Credits Burn-down

**Audience:** startup founders · **Cadence:** weekly **Widgets:** credit balance and expiry; burn rate; projected exhaustion date; post-credit run-rate.

### D19 · Startup Runway View

**Audience:** founders · **Cadence:** monthly **Widgets:** Azure spend as a share of burn and revenue; cost per active customer; gross margin with and without credits.

### D20 · Marketplace and MACC

**Audience:** procurement · **Cadence:** quarterly **Widgets:** Marketplace spend by publisher; MACC-eligible share; renewal calendar; MACC burndown vs plan.

### D21 · Sustainability

**Audience:** sustainability team · **Cadence:** quarterly **Widgets:** emissions by subscription and region (Emissions Impact Dashboard); idle resource hours; Arm and modern-series share.

### D22 · Optimization Pipeline

**Audience:** FinOps lead, leadership · **Cadence:** monthly **Widgets:** identified vs in-progress vs realized savings; savings by lever (rate, usage, license); time from recommendation to action.

## 4.4 Example queries

**FinOps hubs (Data Explorer KQL), monthly effective cost by service.** FinOps hubs expose FOCUS-aligned functions such as `Costs()`; check your hub version’s schema.

```kusto
Costs()
| where ChargePeriodStart >= startofmonth(ago(365d))
| summarize EffectiveCost = sum(EffectiveCost), BilledCost = sum(BilledCost)
    by Month = startofmonth(ChargePeriodStart), ServiceName
| order by Month desc, EffectiveCost desc
```

**FinOps hubs, Effective Savings Rate.**

```kusto
Costs()
| where ChargePeriodStart >= startofmonth(ago(180d)) and ChargeCategory == 'Usage'
| summarize List = sum(ListCost), Effective = sum(EffectiveCost) by Month = startofmonth(ChargePeriodStart)
| extend EffectiveSavingsRate = 1 - Effective / List
| order by Month desc
```

**FinOps hubs, unused commitment cost.**

```kusto
Costs()
| where ChargePeriodStart >= startofmonth(ago(180d)) and CommitmentDiscountStatus == 'Unused'
| summarize UnusedCost = sum(EffectiveCost) by Month = startofmonth(ChargePeriodStart), CommitmentDiscountType
| order by Month desc
```

**FinOps hubs, tag coverage by cost.**

```kusto
Costs()
| where ChargePeriodStart >= startofmonth(ago(90d))
| extend Team = tostring(Tags['team'])
| summarize Total = sum(EffectiveCost), Tagged = sumif(EffectiveCost, isnotempty(Team)) by Month = startofmonth(ChargePeriodStart)
| extend TagCoverage = Tagged / Total
```

**FOCUS export in any SQL engine (Fabric, Synapse serverless, Databricks), cost by subscription.**

```sql
SELECT DATE_TRUNC('month', ChargePeriodStart) AS month,
       SubAccountName,
       SUM(EffectiveCost) AS effective_cost
FROM focus_costs
WHERE ChargePeriodStart >= DATEADD(month, -12, CURRENT_DATE)
GROUP BY 1, 2
ORDER BY 1 DESC, 3 DESC;
```

(Adjust date functions to your engine’s dialect.)

**Log Analytics, billable ingestion by table (per workspace).** See MON-01.

**Log Analytics, billable ingestion by resource for showback.**

```kusto
find where TimeGenerated > ago(7d) project _ResourceId, _BilledSize, _IsBillable
| where _IsBillable == true
| summarize BilledGB = sum(_BilledSize) / 1e9 by _ResourceId
| sort by BilledGB desc
| take 50
```

---

# Part 5 — KPI catalog

| KPI | Formula | Starting target | Why it matters |
| --- | --- | --- | --- |
| Effective Savings Rate | 1 − effective cost ÷ list-equivalent cost | Track trend | Coverage and discount depth together |
| Commitment coverage | Committed usage ÷ eligible usage | Steady-baseline share | Rate optimization reach |
| Commitment utilization | Used ÷ purchased commitment | At or near full | Over-commitment waste |
| Unused commitment cost | Sum of unused reservation and savings plan cost | Near zero | Direct waste |
| AHB coverage | Eligible cores with AHB ÷ entitled cores | Near full | License optimization |
| Dev/Test usage share | Non-prod spend on Dev/Test offers ÷ non-prod spend | Near full | License optimization |
| Tag coverage | Tagged amortized cost ÷ total | 90%+ walk, 95%+ run | Accountability |
| Orphan spend share | Orphaned resource cost ÷ total | Low single digits | Hygiene |
| Advisor cost score | From Advisor | Rising | Native benchmark |
| Recommendation realization | Realized ÷ recommended savings | Rising | Program effectiveness |
| Modern series share | Current-series VM hours ÷ total | Majority and rising | Price-performance |
| Arm and Spot shares | Arm/Spot hours ÷ eligible hours | Rising | Price-performance |
| Non-prod off-hours ratio | Deallocated hours ÷ total in non-prod | Half or more | Scheduling |
| Observability share | Monitoring cost ÷ total | Track trend | Telemetry bloat |
| Egress share | Network cost ÷ total | Track trend | Architecture signal |
| ESU spend | Monthly ESU cost | Falling to zero | Lifecycle discipline |
| Servers past end of support | Count by version | Falling | Risk and cost |
| Unit cost | Cost ÷ business driver | Flat or falling with growth | Value |
| Forecast accuracy | 1 − abs(actual − forecast) ÷ actual | Within a few percent | Finance trust |
| Anomaly time to resolve | Mean days from alert to resolution | Days, not weeks | Governance speed |
| AI cost per outcome | AI spend ÷ successful tasks | Falling | AI value |
| PTU utilization | Used ÷ provisioned throughput | High | AI commitment waste |
| Batch and cache share | Batch tokens and cached input ÷ total | Rising for eligible workloads | AI rate optimization |

Targets are starting points; calibrate to your business and revisit quarterly.

---

# Part 6 — Playbooks and website content model

## 6.1 Startup: the 30-day plan

**Week 1 — Guardrails.** Budgets with action groups on every subscription (STU-03), anomaly alerts (GOV-03), MFA and managed identities (ORG-12), allowed locations and VM SKUs policies (ORG-11, GOV-05), credit balances and expiry (ORG-13).

**Week 2 — Visibility.** FOCUS export with backfill (VIS-01, VIS-04), tag inheritance (TAG-02), saved Cost analysis views, Advisor workbook (VIS-09).

**Week 3 — Quick wins.** Run the appendix queries and delete orphans (DSK-01, NET-12, APP-01); deallocate stopped VMs (VM-01); auto-shutdown and Start/Stop for dev (VM-04, VM-05); log ingestion review (MON-01, MON-02); storage lifecycle rules (STG-02); serverless SQL for dev databases (DB-01); move non-production to Dev/Test subscriptions (STU-06).

**Week 4 — Rate and AI.** Model the post-credit cliff (STU-05); a small monthly-paid compute savings plan for the steady floor; for AI, smaller models, prompt caching, batch deployments and an AI budget (AI-02 to AI-04).

## 6.2 Scale-up: the 90-day program

**Days 1–30 — Foundation.** Management groups and subscription vending (ORG-02, ORG-05), tag policy with inheritance and allocation rules (TAG-02, TAG-03, TAG-05), FinOps toolkit reports or FinOps hubs (VIS-03), AKS cost analysis (AKS-01), memory metrics on VMs (VM-03), AHB audit (LIC-05). Baseline ESR, tag coverage, AHB coverage, unit cost.

**Days 31–60 — Usage and license optimization.** Clear the Waste Tracker (D04); rightsize top VMs, AKS pools, App Service plans and databases; Spot and Arm pilots (VM-08, VM-10, AKS-06); observability diet (MON-02 to MON-08); network map and idle gateways (NET-01, NET-02); AHB everywhere entitled (LIC-01 to LIC-04).

**Days 61–90 — Rate and governance.** Commitment portfolio decisions with the February 2027 deadline in mind (COM-02 to COM-06), database savings plan evaluation (COM-15 to COM-17), team scorecards (D17), PR cost estimates (AUT-01), monthly cost review (GOV-09), optimization backlog (GOV-10, D22).

## 6.3 Enterprise: the 12-month program

**Quarter 1 (now through January 2027) — Deadlines first.** Reservation inventory and pre-deadline exchanges before February 1, 2027 (COM-02, COM-03); auto-renew review (COM-05); Windows Server 2016 ESU or upgrade decisions before January 12, 2027, with Arc onboarding (EOS-01 to EOS-07); FOCUS and FinOps hubs as the system of record.

**Quarter 2 — Allocation and license optimization.** 95% allocation including AKS and hub networking; centralized SQL AHB (LIC-03); SQL edition right-sizing (LIC-08); Dev/Test offers for all non-production (ORG-04).

**Quarter 3 — Usage optimization at scale.** Automated orphan cleanup and Advisor-to-ticket routing (AUT-03, AUT-05); modernization program (Arm, newer series, PaaS); observability workspace consolidation and commitment tiers (MON-05, MON-06).

**Quarter 4 — Commercial, shift-left and AI.** MACC renewal with commitment and ESU strategy combined (CML-01 to CML-03, CML-12); policy-as-code and PR cost checks (AUT-01, AUT-02); AI FinOps across Foundry, APIM gateway and Microsoft 365 Copilot (AI-01 to AI-19); efficiency targets in team goals (CUL-04).

## 6.4 Proposed content model for the Azure maxxing website

**Tip schema:**

```json
{
  "id": "COM-02",
  "title": "Treat February 1, 2027 as a planning deadline",
  "domain": "commitments",
  "audience": ["startup", "scaleup", "enterprise"],
  "effort": "low",
  "impact": 3,
  "lever": "rate",
  "services": ["Azure Reservations", "Azure savings plans"],
  "summary": "Reservations for savings-plan-covered services lose exchange rights for new purchases; existing ones keep one final exchange.",
  "how_to": ["portal steps", "Azure CLI", "decision checklist"],
  "snippets": [],
  "verify": "Reservation inventory reviewed; decisions recorded for each reservation",
  "related": ["COM-03", "COM-04", "COM-05", "COM-06"],
  "dashboard": ["D03"],
  "kpi": ["commitment_utilization", "effective_savings_rate"],
  "docs": ["https://learn.microsoft.com/azure/cost-management-billing/reservations/exchange-and-refund-azure-reservations"],
  "last_verified": "2026-10-31"
}
```

**Information architecture.** Home with a bill-size selector; a prominent “Deadlines” page (February 1, 2027 exchange change; January 12, 2027 Windows Server 2016 end of support; July 12, 2027 SQL Server 2014 ESU end); playbooks as checklists; a filterable tips library where each tip has CLI/KQL/Bicep snippets and a verification query; a Resource Graph query library (the appendix) with copy buttons; a dashboards gallery; a KPI glossary; a dated “What’s new” changelog; and calculators.

**Calculators to build first.**

1. Reservation exchange planner: inventory upload → exchange-before-deadline, trade-in or hold recommendation.
2. Reservation vs savings plan comparator for compute and databases.
3. Azure Hybrid Benefit savings estimator from core counts.
4. ESU vs upgrade cost comparator for Windows Server 2016 and SQL Server 2016.
5. Log Analytics table plan and commitment tier optimizer from the `Usage` table.
6. Storage tier and lifecycle estimator from access patterns.
7. Non-production scheduling savings.
8. Azure OpenAI Standard vs Batch vs PTU break-even.
9. Cosmos DB autoscale vs manual vs serverless comparator.
10. Post-credit cliff estimator for startups.

**Editorial rules.** Date-stamp every claim, link to Microsoft Learn or Azure pricing, label preview vs GA, separate Microsoft-published facts from third-party analysis, and review quarterly and after Microsoft Ignite, Build and FinOps X.

---

# Appendix — Azure Resource Graph waste-hunting queries

Run in Resource Graph Explorer or with `az graph query -q "<query>" --first 1000`. All queries span every subscription you can read.

**Unattached managed disks**

```kusto
Resources
| where type =~ 'microsoft.compute/disks'
| where properties.diskState =~ 'Unattached'
| project name, resourceGroup, subscriptionId, location, sku = tostring(sku.name), sizeGB = toint(properties.diskSizeGB), timeCreated = properties.timeCreated
| order by sizeGB desc
```

**Unassociated public IP addresses**

```kusto
Resources
| where type =~ 'microsoft.network/publicipaddresses'
| where isnull(properties.ipConfiguration) and isnull(properties.natGateway) and isnull(properties.publicIPPrefix)
| project name, resourceGroup, subscriptionId, location, sku = tostring(sku.name)
```

**VMs stopped but not deallocated (still billing for compute)**

```kusto
Resources
| where type =~ 'microsoft.compute/virtualmachines'
| extend powerState = tostring(properties.extended.instanceView.powerState.code)
| where powerState =~ 'PowerState/stopped'
| project name, resourceGroup, subscriptionId, location, size = tostring(properties.hardwareProfile.vmSize)
```

**Empty App Service plans**

```kusto
Resources
| where type =~ 'microsoft.web/serverfarms'
| where toint(properties.numberOfSites) == 0
| project name, resourceGroup, subscriptionId, location, sku = tostring(sku.name), tier = tostring(sku.tier)
```

**Orphaned network interfaces**

```kusto
Resources
| where type =~ 'microsoft.network/networkinterfaces'
| where isnull(properties.virtualMachine) and isnull(properties.privateEndpoint) and isnull(properties.privateLinkService)
| project name, resourceGroup, subscriptionId, location
```

**Load balancers with no backend pool members**

```kusto
Resources
| where type =~ 'microsoft.network/loadbalancers'
| where array_length(properties.backendAddressPools) == 0
| project name, resourceGroup, subscriptionId, location, sku = tostring(sku.name)
```

**Snapshots older than 90 days**

```kusto
Resources
| where type =~ 'microsoft.compute/snapshots'
| extend ageDays = datetime_diff('day', now(), todatetime(properties.timeCreated))
| where ageDays > 90
| project name, resourceGroup, subscriptionId, ageDays, sizeGB = toint(properties.diskSizeGB)
| order by ageDays desc
```

**Windows VMs without Azure Hybrid Benefit applied**

```kusto
Resources
| where type =~ 'microsoft.compute/virtualmachines'
| where tostring(properties.storageProfile.osDisk.osType) =~ 'Windows'
| extend licenseType = tostring(properties.licenseType)
| where licenseType !in~ ('Windows_Server', 'Windows_Client')
| project name, resourceGroup, subscriptionId, location, size = tostring(properties.hardwareProfile.vmSize)
```

**Premium disks in resources tagged as non-production**

```kusto
Resources
| where type =~ 'microsoft.compute/disks'
| where tostring(sku.name) startswith 'Premium'
| where tostring(tags['environment']) in~ ('dev', 'test', 'sandbox')
| project name, resourceGroup, subscriptionId, sku = tostring(sku.name), sizeGB = toint(properties.diskSizeGB)
```

**NAT gateways with no subnets attached**

```kusto
Resources
| where type =~ 'microsoft.network/natgateways'
| where isnull(properties.subnets) or array_length(properties.subnets) == 0
| project name, resourceGroup, subscriptionId, location
```

**Resources missing a required tag**

```kusto
Resources
| where isempty(tostring(tags['team']))
| summarize count() by type, subscriptionId
| order by count_ desc
```

Property names in Resource Graph can change as resource providers evolve; test each query before automating deletion, and always snapshot or export before deleting.

---

# Sources

Microsoft primary sources:

- Reservation exchanges for Azure services covered by savings plans end starting Feb. 1, 2027 (FinOps Blog, July 30, 2026) — [https://techcommunity.microsoft.com/t5/finops-blog/reservation-exchanges-for-azure-services-covered-by-savings/ba-p/4542437](https://techcommunity.microsoft.com/t5/finops-blog/reservation-exchanges-for-azure-services-covered-by-savings/ba-p/4542437)
- Azure Reserved VM Instances pricing page (exchange policy) — [https://azure.microsoft.com/pricing/reserved-vm-instances](https://azure.microsoft.com/pricing/reserved-vm-instances)
- Self-service trade-in for savings plans — [https://learn.microsoft.com/azure/cost-management-billing/savings-plan/reservation-trade-in](https://learn.microsoft.com/azure/cost-management-billing/savings-plan/reservation-trade-in)
- Savings plan overview (compute and databases eligibility) — [https://learn.microsoft.com/azure/cost-management-billing/savings-plan/savings-plan-overview](https://learn.microsoft.com/azure/cost-management-billing/savings-plan/savings-plan-overview)
- Microsoft FinOps News, September 2026 (management-group-scoped recommendations) — [https://techcommunity.microsoft.com/blog/finopsblog/microsoft-finops-news---september-2026/4561596](https://techcommunity.microsoft.com/blog/finopsblog/microsoft-finops-news---september-2026/4561596)
- Cost Management and Pricing toolsets in Azure Resource Manager MCP Server — [https://techcommunity.microsoft.com/blog/finopsblog/introducing-cost-management-and-pricing-toolsets-in-azure-resource-manager-mcp-s/4530710](https://techcommunity.microsoft.com/blog/finopsblog/introducing-cost-management-and-pricing-toolsets-in-azure-resource-manager-mcp-s/4530710)
- What’s new in FinOps toolkit 13 (January 2026) — [https://techcommunity.microsoft.com/blog/finopsblog/what%E2%80%99s-new-in-finops-toolkit-13-%E2%80%93-january-2026/4493090](https://techcommunity.microsoft.com/blog/finopsblog/what%E2%80%99s-new-in-finops-toolkit-13-%E2%80%93-january-2026/4493090)
- What’s new in FinOps toolkit 14 (April 2026) — [https://techcommunity.microsoft.com/blog/finopsblog/whats-new-in-finops-toolkit-14-%E2%80%93-april-2026/4519497](https://techcommunity.microsoft.com/blog/finopsblog/whats-new-in-finops-toolkit-14-%E2%80%93-april-2026/4519497)
- News and updates from FinOps X 2025 (FOCUS 1.2 exports, PTU reservations) — [https://techcommunity.microsoft.com/blog/finopsblog/-/4426851](https://techcommunity.microsoft.com/blog/finopsblog/-/4426851)
- New FinOps for AI capabilities (September 2026) — [https://techcommunity.microsoft.com/blog/ai-finops-blog/new-finops-for-ai-capabilities-control-spend-measure-value-and-optimize-for-impa/4559660](https://techcommunity.microsoft.com/blog/ai-finops-blog/new-finops-for-ai-capabilities-control-spend-measure-value-and-optimize-for-impa/4559660)
- Extended Security Updates for Windows Server and SQL Server — [https://www.microsoft.com/windows-server/extended-security-updates](https://www.microsoft.com/windows-server/extended-security-updates)

FinOps community and analysis sources (verify against Microsoft documentation before publishing):

- FinOps Foundation, FinOps Framework 2026 — [https://www.finops.org/insights/2026-finops-framework/](https://www.finops.org/insights/2026-finops-framework/)
- Flexera, FinOps X 2026 recap (FOCUS 1.4, Azure MCP Server) — [https://www.flexera.com/blog/perspectives/finops-x-2026-recap/](https://www.flexera.com/blog/perspectives/finops-x-2026-recap/)
- FinOps Weekly, Azure updates October 29, 2026 (Claude cost attribution in Foundry, VNet flow log filtering) — [https://finopsweekly.com/news/azure-updates-2026-10-29/](https://finopsweekly.com/news/azure-updates-2026-10-29/)
- Directions on Microsoft and Redmond Magazine coverage of the savings plan for databases — [https://www.directionsonmicrosoft.com/reports/azure-savings-plan-for-databases-now-available/](https://www.directionsonmicrosoft.com/reports/azure-savings-plan-for-databases-now-available/) and [https://redmondmag.com/articles/2026/04/10/microsoft-expands-azure-database-cost-saving-options.aspx](https://redmondmag.com/articles/2026/04/10/microsoft-expands-azure-database-cost-saving-options.aspx)
- endoflife.ai, Windows Server 2016 ESU reference — [https://endoflife.ai/article-windows-server-2016-esu](https://endoflife.ai/article-windows-server-2016-esu)