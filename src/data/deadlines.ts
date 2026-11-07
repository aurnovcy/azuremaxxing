import { DeadlineItem } from '../types';

export const DEADLINES: DeadlineItem[] = [
  {
    id: 'reservation-exchange-2027',
    title: 'Azure Reservation Exchange Policy Cutoff',
    date: '2027-02-01T00:00:00Z',
    status: 'critical',
    headline: 'Reservations for savings-plan-covered services lose exchange rights',
    summary: 'Starting February 1, 2027, newly purchased reservations for services covered by an Azure savings plan (compute or databases) CANNOT be exchanged.',
    fullExplanation: `Announced at the end of July 2026: if an Azure service is covered by an Azure savings plan (compute or databases), reservations purchased on or after February 1, 2027 cannot be exchanged.

Key mechanics every FinOps and architecture team must understand:
1. One Final Exchange for Pre-Deadline Purchases: Active reservations purchased before February 1, 2027 retain the right to ONE final exchange after that date.
2. Exchanges are Cancel-and-Repurchase: An exchange is legally and technically processed as a cancellation, refund, and new purchase. Therefore, whatever new reservation you receive from a post-deadline exchange is itself non-exchangeable!
3. Renewals Count as New Purchases: Auto-renewals or manual renewals occurring after the deadline are treated as new purchases without exchange rights.
4. Trade-Ins Remain Available: Self-service trade-in of compute reservations to compute savings plans, and database reservations to database savings plans, remains fully supported.
5. Expanding Scope: As Microsoft adds more services to Azure savings plans, this non-exchangeable policy will automatically expand to encompass those reservations.`,
    immediateActions: [
      'Inventory every active reservation across all subscriptions and enrollments.',
      'Check auto-renew flags on every reservation: turn off auto-renew on any commitment whose instance size or region might change.',
      'Execute pre-deadline exchanges before February 1, 2027 to align commitments with your current and planned architecture.',
      'Decide whether to execute a trade-in to an Azure Savings Plan for workloads moving between instance families or PaaS.',
      'Reserve your "one final exchange" for planned migrations rather than routine adjustments.'
    ],
    relatedTips: ['COM-02', 'COM-03', 'COM-04', 'COM-05', 'COM-06', 'COM-08'],
    docs: [
      'https://techcommunity.microsoft.com/t5/finops-blog/reservation-exchanges-for-azure-services-covered-by-savings/ba-p/4542437',
      'https://learn.microsoft.com/azure/cost-management-billing/reservations/exchange-and-refund-azure-reservations'
    ],
    lastVerified: '2026-10-31'
  },
  {
    id: 'windows-server-2016-eos',
    title: 'Windows Server 2016 End of Extended Support',
    date: '2027-01-12T00:00:00Z',
    status: 'upcoming',
    headline: 'End of regular security updates; Extended Security Updates (ESU) required',
    summary: 'Windows Server 2016 reaches end of extended support on January 12, 2027. Workloads must be upgraded, migrated to supported services, or enrolled in ESUs via Azure Arc.',
    fullExplanation: `On January 12, 2027, Microsoft ends regular security updates for Windows Server 2016. Organizations running this version face compliance and security vulnerabilities unless they:
- Upgrade in-place to Windows Server 2019, 2022, or 2025.
- Modernize to containerized Linux/Cobalt Arm or PaaS (App Service, Azure SQL).
- Onboard machines to Azure Arc to subscribe to monthly pay-as-you-go Extended Security Updates (ESU).

Arc-enabled ESUs bill as a monthly subscription directly on your Azure bill (and can draw down MACC commitments), allowing you to cancel individual servers as upgrades complete.`,
    immediateActions: [
      'Scan your entire hybrid and cloud estate using Azure Arc and Resource Graph.',
      'Calculate total core counts to estimate Year 1 ESU costs vs in-place upgrade costs.',
      'Onboard candidate servers to Azure Arc prior to December 2026 to avoid a last-minute scramble.',
      'Verify if any workloads qualify for free or included ESUs on specialized Azure platforms (e.g. Azure VMware Solution).'
    ],
    relatedTips: ['EOS-01', 'EOS-02', 'EOS-03', 'EOS-05', 'EOS-07'],
    docs: [
      'https://www.microsoft.com/windows-server/extended-security-updates',
      'https://learn.microsoft.com/azure/azure-arc/servers/prepare-extended-security-updates'
    ],
    lastVerified: '2026-10-31'
  },
  {
    id: 'sql-server-2014-esu-end',
    title: 'SQL Server 2014 Extended Security Updates End',
    date: '2027-07-12T00:00:00Z',
    status: 'upcoming',
    headline: 'Year 3 ESU concludes; all official security patches permanently cease',
    summary: 'SQL Server 2014 reaches Year 3 ESU termination. No further security patches will be published under any commercial agreement.',
    fullExplanation: `SQL Server 2014 extended support ended in July 2024. The 3-year Extended Security Update period concludes on July 12, 2027. Beyond this date, databases must be migrated to Azure SQL Managed Instance, Azure SQL Database, or modern SQL Server versions (2022/2025).`,
    immediateActions: [
      'Identify all remaining SQL Server 2014 instances.',
      'Establish migration paths to Azure SQL Managed Instance or Azure Database for PostgreSQL.',
      'Apply Azure Hybrid Benefit during migration to offset vCore licensing costs.'
    ],
    relatedTips: ['EOS-01', 'EOS-08', 'LIC-02', 'DB-22'],
    docs: [
      'https://learn.microsoft.com/lifecycle/products/sql-server-2014'
    ],
    lastVerified: '2026-10-31'
  },
  {
    id: 'sql-server-2016-eos-passed',
    title: 'SQL Server 2016 End of Extended Support (Passed)',
    date: '2026-07-14T00:00:00Z',
    status: 'passed',
    headline: 'Regular support ended; currently in Year 1 ESU via Azure Arc',
    summary: 'SQL Server 2016 reached end of extended support on July 14, 2026. Instances require active ESUs or immediate migration.',
    fullExplanation: `SQL Server 2016 is now in the ESU phase. Organizations should leverage Azure Arc to pay for monthly ESUs while migrating to Azure SQL Managed Instance or Azure SQL Database with Azure Hybrid Benefit.`,
    immediateActions: [
      'Audit existing SQL Server 2016 instances to confirm active ESU license status.',
      'Accelerate migration to Azure SQL Database or Managed Instance.'
    ],
    relatedTips: ['EOS-01', 'EOS-02', 'LIC-02'],
    docs: [
      'https://learn.microsoft.com/lifecycle/products/sql-server-2016'
    ],
    lastVerified: '2026-10-31'
  },
  {
    id: 'windows-server-2012-esu-passed',
    title: 'Windows Server 2012/2012 R2 ESUs Ended (Passed)',
    date: '2026-10-13T00:00:00Z',
    status: 'passed',
    headline: 'Year 3 ESU ended; legacy systems require immediate decommissioning',
    summary: 'Windows Server 2012 and 2012 R2 extended security updates ended permanently on October 13, 2026.',
    fullExplanation: `Windows Server 2012 and 2012 R2 have fully exited all official security update channels. Any remaining instances pose extreme operational, compliance, and cyber insurance risk.`,
    immediateActions: [
      'Retire or isolate any remaining Windows Server 2012 VMs.',
      'Rehost applications on modern Windows Server 2022/2025 or Linux.'
    ],
    relatedTips: ['EOS-01', 'EOS-11'],
    docs: [
      'https://learn.microsoft.com/lifecycle/products/windows-server-2012'
    ],
    lastVerified: '2026-10-31'
  }
];
