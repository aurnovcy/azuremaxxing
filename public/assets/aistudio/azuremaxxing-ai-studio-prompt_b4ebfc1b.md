Build a polished, production-quality website called "Azure maxxing": "The Field Guide to Getting Maximum Value from Every Azure Dollar." The site must be SEO-first and dark-mode-only, with a design language inspired by Vercel's website (black canvas, hairline borders, Geist typography, restrained accents). Make it fully responsive.

## Framework (SEO-critical)
Prefer Next.js (App Router, TypeScript, Tailwind) with static generation (SSG) so every tip, calculator, playbook and landing page is pre-rendered as real HTML with its own metadata. If Next.js isn't available in this environment, use React + TypeScript + Vite + Tailwind with react-router, react-helmet-async, and a build-time prerender step (e.g. vite-plugin-ssg or react-snap) so crawlers receive fully rendered HTML. Do not ship a client-only SPA with a single shared <title>. Content must live in typed data files (tips, dashboards, KPIs, changelog, playbooks, Resource Graph queries, deadlines) and generate pages programmatically.

## Core idea
"Maxxing" means maximizing the business value of each dollar on the Azure invoice: remove waste, lower the unit price of what you keep, and spend deliberately where it buys outsized value elsewhere. Tone: confident, practical, slightly irreverent, never fear-mongering.

Azure has a THIRD lever that is unusually big: **license optimization** (Azure Hybrid Benefit, Dev/Test pricing, edition choice, ESU strategy), which can rival the other two for Windows Server and SQL Server estates. Make this a signature theme.

## Pricing stance
Do NOT hard-code a dollar price list. Azure prices vary by region, agreement type (EA, MCA, CSP, pay-as-you-go), currency and date. The site describes pricing mechanics and published relative discounts, and every tip links to the relevant Azure pricing or Microsoft Learn page with a "last verified" date. Calculators must be driven by the user's own inputs and prices.

## Audience
- Startup (ST)
- Scale-up (SU)
- Enterprise (EN): EA/MCA, management group hierarchy, MACC
- Home page uses a "What's your monthly Azure bill?" selector (Under $50k / $50k–$1M / Over $1M) that routes to the matching playbook.

## Pages and information architecture (clean, keyword-rich, lowercase-hyphen URLs)

1. **/** Home: hero with tagline, the bill-size selector, a "Deadlines" banner (countdown to February 1, 2027), the Order of Operations visual, 3–4 featured stat cards, featured calculators, latest "What's New" items, and an FAQ section (FAQPage schema).

2. **/deadlines** A prominent, high-priority page with a countdown timer and plain-English explainers for each date:
   - **February 1, 2027: reservation exchange change.** Announced end of July 2026. If a service is covered by an Azure savings plan (compute or databases), reservations purchased on or after Feb 1, 2027 cannot be exchanged. Active reservations purchased before that date keep one final exchange. An exchange is processed as cancellation, refund and new purchase, so whatever you receive from a post-deadline exchange is itself non-exchangeable; renewals after the deadline are also new, non-exchangeable purchases. Trade-in of reservations to savings plans remains available, and the policy expands automatically as more services become savings-plan eligible.
   - **January 12, 2027:** Windows Server 2016 reaches end of extended support (ESUs available through Azure Arc as a pay-as-you-go monthly subscription billed through Azure).
   - **July 12, 2027:** SQL Server 2014 ESU end.
   - Already passed: SQL Server 2016 end of extended support (July 14, 2026); Windows Server 2012/2012 R2 ESUs ended (October 13, 2026).
   Link each deadline to the related tips (COM-02 to COM-06, EOS-01 to EOS-07).

3. **/playbooks/startup-30-day-plan**, **/playbooks/scale-up-90-day-program**, **/playbooks/enterprise-12-month-program**: interactive checklists with progress saved in localStorage (try/catch, graceful fallback). Each is also a fully readable, indexable article with HowTo structured data.
   - Startup 30-day plan: Week 1 Guardrails (budgets with action groups on every subscription, anomaly alerts, MFA and managed identities, allowed locations and VM SKU policies, credit balances and expiry). Week 2 Visibility (FOCUS export with backfill, tag inheritance, saved Cost analysis views, Advisor workbook). Week 3 Quick wins (run the Resource Graph waste queries and delete orphans, deallocate stopped VMs, auto-shutdown and Start/Stop for dev, log ingestion review, storage lifecycle rules, serverless SQL for dev databases, move non-production to Dev/Test subscriptions). Week 4 Rate and AI (model the post-credit cliff, a small monthly-paid compute savings plan for the steady floor; for AI, smaller models, prompt caching, batch deployments and an AI budget).
   - Scale-up 90-day program: Days 1–30 Foundation (management groups and subscription vending, tag policy with inheritance and allocation rules, FinOps toolkit reports or FinOps hubs, AKS cost analysis, memory metrics on VMs, Azure Hybrid Benefit audit; baseline effective savings rate, tag coverage, AHB coverage, unit cost). Days 31–60 Usage and license optimization (clear the Waste Tracker, rightsize top VMs/AKS pools/App Service plans/databases, Spot and Arm pilots, observability diet, network map and idle gateways, AHB everywhere entitled). Days 61–90 Rate and governance (commitment portfolio decisions with the Feb 2027 deadline in mind, database savings plan evaluation, team scorecards, PR cost estimates, monthly cost review, optimization backlog).
   - Enterprise 12-month program: Q1 (now through January 2027) Deadlines first (reservation inventory and pre-deadline exchanges before Feb 1, 2027; auto-renew review; Windows Server 2016 ESU or upgrade decisions before Jan 12, 2027 with Arc onboarding; FOCUS and FinOps hubs as system of record). Q2 Allocation and license optimization (95% allocation including AKS and hub networking, centralized SQL AHB, SQL edition right-sizing, Dev/Test offers for all non-production). Q3 Usage optimization at scale (automated orphan cleanup and Advisor-to-ticket routing, modernization with Arm/newer series/PaaS, observability workspace consolidation and commitment tiers). Q4 Commercial, shift-left and AI (MACC renewal combined with commitment and ESU strategy, policy-as-code and PR cost checks, AI FinOps across Foundry, API Management gateway and Microsoft 365 Copilot, efficiency targets in team goals).

4. **/tips** Tips Library, plus **/tips/[id]-[slug]** detail pages (e.g. /tips/com-02-february-2027-reservation-deadline). Filters: domain, audience, effort, impact, lever (rate / usage / license), service. Filter state lives in query params (shareable), but the canonical URL for the filtered view points back to /tips. Each tip page: summary, how-to (portal steps, Azure CLI, Bicep, KQL or Resource Graph snippet where relevant), "how to verify the savings," related tips, linked dashboards and KPIs, docs links, and a visible "Last verified" date. Seed at least 30 realistic tips (more will be added later) using this schema:

```json
{
  "id": "COM-02",
  "slug": "february-2027-reservation-deadline",
  "title": "Treat February 1, 2027 as a planning deadline",
  "domain": "commitments",
  "audience": ["startup","scaleup","enterprise"],
  "effort": "low",
  "impact": 3,
  "lever": "rate",
  "services": ["Azure Reservations","Azure savings plans"],
  "summary": "Reservations for savings-plan-covered services lose exchange rights for new purchases; existing ones keep one final exchange.",
  "seo_title": "Azure Reservation Exchange Ends Feb 1, 2027: What To Do Now",
  "meta_description": "Reservation exchanges end for savings-plan-covered services on Feb 1, 2027. Inventory your reservations, decide exchange vs trade-in vs hold, and avoid lock-in.",
  "how_to": ["portal steps","Azure CLI","decision checklist"],
  "snippets": [],
  "verify": "Reservation inventory reviewed; decisions recorded for each reservation",
  "related": ["COM-03","COM-04","COM-05","COM-06"],
  "dashboard": ["D03"],
  "kpi": ["commitment_utilization","effective_savings_rate"],
  "docs": ["https://learn.microsoft.com/azure/cost-management-billing/reservations/exchange-and-refund-azure-reservations"],
  "last_verified": "2026-10-31"
}
```

   ID prefixes: ORG, VIS, TAG, GOV, COM, LIC, VM, AKS, APP, STG, DSK, DB, NET, MON, DATA, AI, SEC, EOS, CML, AUT, CUL, STU.

   Domains: Billing accounts, management groups and subscriptions; Visibility, data and reporting; Tags and cost allocation; Governance, budgets and anomaly detection; Commitments (savings plans and reservations); Azure Hybrid Benefit and licensing; Virtual machines; AKS and containers; App Service, Functions and integration; Blob and file storage; Managed disks and backup; Databases; Networking and data transfer; Monitoring and observability; Data and analytics; AI and Microsoft Foundry; Security services; Lifecycle, end of support and ESUs; Commercial levers and programs; Automation and shift-left; Culture and process; Startup quick wins.

5. **Programmatic landing pages** (auto-generated from tip data, each with a unique H1, intro paragraph, and matching tips):
   - /tips/domain/[domain] (e.g. /tips/domain/azure-hybrid-benefit)
   - /tips/service/[service] (e.g. /tips/service/aks, /tips/service/log-analytics, /tips/service/azure-sql)
   - /for/startups, /for/scale-ups, /for/enterprises
   Each needs a unique intro (not templated boilerplate).

6. **/resource-graph-queries** A copy-paste library of Azure Resource Graph "waste hunting" queries, one anchor per query, with a copy button, a one-line explanation, a "what to do with the results" note, and the safety note: "Property names can change as resource providers evolve; test each query before automating deletion, and always snapshot or export before deleting." Include: unattached managed disks; unassociated public IP addresses; VMs stopped but not deallocated (still billing for compute); empty App Service plans; orphaned network interfaces; load balancers with no backend pool members; snapshots older than 90 days; Windows VMs without Azure Hybrid Benefit applied; premium disks in resources tagged non-production; NAT gateways with no subnets attached; resources missing a required tag. Example of the format:
   ```kusto
   Resources
   | where type =~ 'microsoft.compute/disks'
   | where properties.diskState =~ 'Unattached'
   | project name, resourceGroup, subscriptionId, location, sku = tostring(sku.name), sizeGB = toint(properties.diskSizeGB), timeCreated = properties.timeCreated
   | order by sizeGB desc
   ```
   Show how to run them with `az graph query -q "<query>" --first 1000`.

7. **/dashboards** gallery plus **/dashboards/[id]-[slug]** detail pages: mock Recharts visualization with fake data, widget list, KPIs, data sources and an example KQL/SQL query. Include D01 Executive Cloud Pulse, D02 Unit Economics, D03 Commitment Command Center, D04 Waste and Orphan Tracker, D05 License Optimization, D06 Rightsizing and Modernization, D07 Allocation Health, D08 Anomaly Feed, D09 Network and Egress Map, D10 Storage Lifecycle, D11 AKS and Containers, D12 AI and Foundry Spend, D13 Databases, D14 Observability Spend, D15 Lifecycle and ESU, D16 Budget vs Forecast Variance, D17 Team Showback Scorecard, D18 Credits Burn-down, D19 Startup Runway View, D20 Marketplace and MACC, D21 Sustainability, D22 Optimization Pipeline.

8. **/calculators** index plus one page per calculator (working interactive tool PLUS 300+ words of explanatory, indexable copy: how it works, assumptions, worked example, and a 3–5 question FAQ). All driven by the user's own prices; label "estimates, verify against Azure pricing and your agreement":
   - /calculators/reservation-exchange-planner (inventory input → exchange-before-deadline, trade-in or hold recommendation)
   - /calculators/reservation-vs-savings-plan (compute and databases)
   - /calculators/azure-hybrid-benefit-savings (from core counts)
   - /calculators/esu-vs-upgrade-windows-server-sql-server-2016
   - /calculators/log-analytics-plan-and-commitment-tier (from the Usage table)
   - /calculators/storage-tier-and-lifecycle
   - /calculators/non-production-scheduling-savings
   - /calculators/azure-openai-standard-vs-batch-vs-ptu
   - /calculators/cosmos-db-autoscale-vs-manual-vs-serverless
   - /calculators/startup-post-credit-cliff
   Keep all constants in one editable config with a "last verified" date and source link per constant.

9. **/kpis** KPI glossary (definitions and formulas): effective savings rate, commitment utilization and coverage, AHB coverage, tag/allocation coverage, unit cost, waste %, idle spend share, etc. One anchor per KPI.

10. **/whats-new** dated changelog plus an RSS/Atom feed at /feed.xml. Seed:
    - Savings plan for databases (March 2026): spend-based, one-year-only, floats across Azure SQL Database (incl. Hyperscale and serverless), SQL Managed Instance, PostgreSQL and MySQL, Cosmos DB provisioned throughput, Azure DocumentDB, Database Migration Service, and SQL Server hourly licenses on Azure VMs and Arc. Discounts differ by service and are highest for serverless SQL; Cosmos DB serverless and DTU-model SQL are not eligible.
    - Management-group-scoped savings plan and reservation recommendations (September 2026).
    - Agentic cost tooling: Cost Management and Pricing toolsets in the Azure Resource Manager MCP server (mid-2026); Azure MCP Server introduced at FinOps X 2026; Copilot in Azure GA for cost questions since 2025.
    - FinOps toolkit 13 and 14: Parquet and compression for exports (Jan 2026); recommendations pipeline in FinOps hubs with Advisor cost recommendations plus a built-in catalog of Resource Graph waste queries; commitment discount eligibility dataset; Copilot Studio agent template for FinOps hubs (Apr 2026); Azure Optimization Engine capabilities migrating into FinOps hubs.
    - FOCUS: FOCUS 1.2 preview in 2025; FinOps Foundation ratified FOCUS 1.4 in June 2026 (invoice reconciliation, deeper commitment data); FOCUS 1.5 previewed for around year-end 2026 with token and model identity.
    - FinOps for AI: Foundry brings Claude model usage into Azure Cost Management with tagging and attribution (Oct 2026); Microsoft 365 Copilot cost management adds spending policies, group-level limits, user spending alerts and a Graph API for policies (preview, Sept 2026).
    - VNet flow log filtering GA (Oct 2026).
    - FinOps Framework 2026: Executive Strategy Alignment, deeper FinOps Scopes, Technology Category guidance, Workload Optimization renamed Usage Optimization.

11. **/maturity-model** Crawl/Walk/Run table with a short self-assessment quiz that outputs the user's stage and recommended tips.

12. **/azure-explained** short explainer page, "How Azure is shaped": hierarchy (tenant → management groups → subscriptions → resource groups → resources); billing accounts differ by agreement (EA, MCA, CSP, pay-as-you-go) and some Cost Management features vary by agreement; discounts stack in a specific order (Azure Hybrid Benefit removes license cost; reservations and savings plans discount the remaining compute; MACC-negotiated discounts and credits apply on top; reservations apply before savings plans).

13. **/ask** Gemini-powered assistant (see below), **/sources**, **/about**, **/disclaimer**.

## SEO requirements (implement all of these)
- **Per-page metadata:** unique <title> (50–60 chars) and meta description (140–160 chars) on every page, driven by `seo_title` / `meta_description` fields in the data files, with sensible generated fallbacks. Title pattern: "{Page title} | Azure maxxing".
- **Canonical URLs** on every page, plus `robots` meta (noindex on /ask results and any filtered or search-result variants).
- **Open Graph and Twitter Card tags** on every page, with auto-generated OG images per tip, calculator, playbook and deadline (dark background, Geist type, tip ID, title, and impact chips).
- **Structured data (JSON-LD):** WebSite with SearchAction; Organization; BreadcrumbList on every non-home page; Article on tip pages (`dateModified` = `last_verified`); HowTo on playbooks and tips with steps; FAQPage on calculators, the deadlines page and the home page; SoftwareApplication / WebApplication on calculator pages; ItemList on listing pages; SoftwareSourceCode or TechArticle on query-library entries. Validate that JSON-LD matches visible page content.
- **Crawlability:** generate `sitemap.xml` (with `lastmod`) from the data files, a `robots.txt` that references it, and clean semantic HTML: exactly one H1 per page, logical H2/H3 hierarchy, `<main>`, `<nav>`, `<article>`, `<header>`/`<footer>`, descriptive anchor text, and visible breadcrumbs.
- **Internal linking:** every tip links to related tips, its domain page, its service pages, its dashboards and its KPIs; every calculator links to the relevant tips and playbooks; every playbook step links to its tip page; the Deadlines page links to every deadline-related tip. Add "Next / Previous in this domain" links and a "Popular tips" block.
- **Target keywords** (weave naturally into titles, H1s, intros and FAQs; no keyword stuffing): "reduce Azure bill", "Azure cost optimization checklist", "Azure FinOps for startups", "Azure Hybrid Benefit savings", "Azure reservation exchange deadline", "Azure savings plan vs reservation", "Azure savings plan for databases", "Windows Server 2016 end of support Azure", "SQL Server 2016 ESU Azure Arc", "Azure Resource Graph unattached disks", "Log Analytics cost optimization", "AKS cost optimization", "Azure OpenAI PTU vs batch cost", "Azure Dev/Test pricing".
- **Performance and Core Web Vitals:** ship minimal JS, code-split heavy components (Recharts only on dashboard and calculator pages), `font-display: swap` for Geist, preload critical fonts, reserve space to avoid layout shift, lazy-load below-the-fold content; target Lighthouse 95+ on Performance, Accessibility, Best Practices and SEO.
- **Freshness signals:** show "Last verified: {date}" on every tip, calculator and What's New entry, and keep `dateModified` in structured data and the sitemap in sync.
- **Content quality:** each page needs unique, substantive copy. Calculators, query entries and landing pages need explanatory text and FAQs, not just a widget or list. Avoid duplicate meta descriptions.
- **Optional:** add `/llms.txt` summarizing the site structure and key resources, and `rel="noopener noreferrer"` plus descriptive `title` attributes on external links.

## Design system: Vercel-inspired dark theme (dark mode ONLY, no light toggle)
Take inspiration from Vercel's visual language without copying their branding or logo.
- **Canvas:** pure black (#000000) with a very subtle radial glow or faint dot/grid pattern in the hero; surfaces in near-black (#0a0a0a, #111111).
- **Borders:** 1px hairline borders everywhere (#1f1f1f–#333333) instead of heavy shadows; cards gain a lighter border (#444–#666) on hover, with an optional soft glow that follows the cursor.
- **Typography:** Geist Sans for UI/body and Geist Mono for tip IDs, tags, code, KPIs and numbers. Tight letter-spacing and large, bold, high-contrast headlines (56–72px hero, -0.04em tracking); body in muted gray (#a1a1a1), primary text in near-white (#ededed).
- **Color:** monochrome base with ONE sharp accent: **electric blue (#3b9eff or similar)** for highlights, links, active filters and chart emphasis. Semantic colors sparingly: amber for "Preview" badges and for deadline warnings, red for waste/alerts. Avoid purple-gradient SaaS clichés.
- **Buttons:** primary = white background with black text, 6px radius; secondary = transparent with 1px border. Pill chips for audience (ST/SU/EN), effort (Low/Med/High), impact ($/$$/$$$) and lever (Rate/Usage/License) in mono type.
- **Layout:** generous whitespace, max-width container (~1200px), sticky top nav with translucent blurred black background and hairline bottom border, a command-palette search (⌘K) over tips, queries, calculators and playbooks, and a minimal multi-column footer.
- **Components:** bento-style grid cards; code blocks with a dark theme (Shiki or Prism "github-dark"), a copy button and language labels (Azure CLI, Bicep, KQL); stat cards with large mono numbers; a countdown component for deadlines; a timeline component for playbooks; subtle fade/slide-in animations only (respect `prefers-reduced-motion`).
- **Charts:** Recharts styled for dark mode (transparent background, gray gridlines, accent-colored primary series).
- **Order of Operations visual (signature element):** an animated horizontal stepper with connecting hairlines: 1 See it → 2 Own it → 3 Delete it → 4 Shrink it → 5 License it → 6 Schedule it → 7 Commit to it → 8 Re-architect it → 9 Govern it. Highlight the callout: "Commit AFTER you shrink. With exchanges disappearing for most compute and database reservations, buying commitments against oversized resources is riskier on Azure than it has ever been."
- **Accessibility:** WCAG AA contrast, visible focus rings in the accent color, full keyboard navigation, ARIA labels on interactive widgets, skip-to-content link.

## Also include (content)
- Three-lever explainer: rate optimization (savings plans, reservations, Spot, MACC discounts, credits) lowers price; usage optimization (cleanup, rightsizing, scheduling, architecture) lowers quantity; license optimization (Azure Hybrid Benefit, Dev/Test pricing, edition choice, ESU strategy) removes license cost.
- Maturity table (Crawl / Walk / Run across Visibility, Allocation, Optimization, Governance): Crawl = Cost analysis, budgets, Advisor; subscription-level allocation; delete idle and apply AHB; budget alerts to email. Walk = FOCUS export and FinOps hubs/toolkit reports; tag inheritance and 80%+ tag coverage; rightsizing, Spot, scheduling, layered commitments; anomaly alerts, Azure Policy, monthly reviews. Run = unit economics and FOCUS as system of record; 95%+ allocated including AKS and shared networking; automated remediation and architecture-level savings; PR cost checks, per-team efficiency targets and chargeback.

## Gemini-powered feature
Build "Ask Azure maxxing" at /ask. The user describes their situation (monthly bill range, agreement type, top services, Windows/SQL footprint, existing reservations) or pastes a Cost analysis CSV. Call Gemini with a system prompt that: (a) enforces the order of operations and the "commit after you shrink" rule, (b) always checks the user's exposure to the February 1, 2027 reservation exchange change and Windows Server 2016 / SQL Server 2016 deadlines, (c) recommends specific tips from the library by ID and links to their pages, (d) returns structured JSON (prioritized actions with effort, impact, lever, tip ID) rendered as cards, (e) reminds users to verify prices and features against Azure pricing and Microsoft Learn, and (f) never invents Azure prices, discounts or features it isn't sure about. Mark this page noindex and keep the API call server-side (route handler) so the key is not exposed.

## Editorial rules (build into the UI)
- Every claim shows a date stamp and a link to Microsoft Learn or Azure pricing.
- Label preview vs GA features with a visible amber "Preview" badge.
- Visually separate Microsoft-published facts from third-party analysis.
- Footer note: "Pricing mechanics and relative discounts only; prices vary by region, agreement and date. Content reviewed quarterly and after Microsoft Ignite, Build and FinOps X. Research current to October 31, 2026."
- /sources lists Microsoft primary sources (FinOps Blog on reservation exchange changes, Azure Reserved VM Instances pricing page, savings plan trade-in docs, savings plan overview) and FinOps Foundation sources (FinOps Framework 2026).
- Disclaimer: not affiliated with or endorsed by Microsoft.

## Build order
Phase 1: design system, layout, nav, ⌘K search, SEO infrastructure (metadata helper, JSON-LD helpers, sitemap, robots, OG image generation), Home, Deadlines page with countdown, Tips Library with 30 seed tips and generated detail pages. Phase 2: Playbooks, the Resource Graph query library, the reservation exchange planner and Azure Hybrid Benefit calculators with full explanatory content, domain/service/audience landing pages. Phase 3: remaining calculators, dashboards gallery, KPI glossary, What's New plus RSS, maturity model, and the Gemini assistant. Scaffold unbuilt routes with real navigation and placeholder content so they can be expanded.
