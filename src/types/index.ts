export type AudienceType = 'startup' | 'scaleup' | 'enterprise';
export type EffortType = 'low' | 'med' | 'high';
export type ImpactType = 1 | 2 | 3; // $ ($), $$ ($$), $$$ ($$$)
export type LeverType = 'rate' | 'usage' | 'license';

export interface CodeSnippet {
  language: 'bash' | 'powershell' | 'kusto' | 'bicep' | 'json' | 'sql';
  title: string;
  code: string;
}

export interface Tip {
  id: string;
  slug: string;
  title: string;
  domain: string;
  domainName?: string;
  audience: AudienceType[];
  effort: EffortType;
  impact: ImpactType;
  lever: LeverType;
  services: string[];
  summary: string;
  seo_title: string;
  meta_description: string;
  how_to: string[];
  snippets: CodeSnippet[];
  verify: string;
  related: string[];
  dashboard: string[];
  kpi: string[];
  docs: string[];
  last_verified: string;
  isPreview?: boolean;
}

export interface DeadlineItem {
  id: string;
  title: string;
  date: string; // ISO string
  status: 'critical' | 'upcoming' | 'passed';
  headline: string;
  summary: string;
  fullExplanation: string;
  immediateActions: string[];
  relatedTips: string[];
  docs: string[];
  lastVerified: string;
}

export interface ResourceGraphQuery {
  id: string;
  title: string;
  description: string;
  actionGuidance: string;
  kql: string;
  cliCommand: string;
  wasteCategory: 'disks' | 'ip' | 'compute' | 'appservice' | 'networking' | 'snapshots' | 'licensing' | 'governance';
  estimatedWasteImpact: string;
}

export interface DashboardMetric {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
}

export interface DashboardProposal {
  id: string;
  slug: string;
  title: string;
  audience: string;
  cadence: string;
  summary: string;
  widgets: string[];
  kpis: string[];
  dataSources: string[];
  exampleQuery: {
    language: 'kusto' | 'sql';
    title: string;
    code: string;
  };
  metrics: DashboardMetric[];
  chartData: Array<{ name: string; value1: number; value2?: number; target?: number }>;
  chartLabels?: { series1: string; series2?: string };
}

export interface KPIItem {
  id: string;
  name: string;
  formula: string;
  target: string;
  whyItMatters: string;
  lever: LeverType;
  frequency: string;
  category: string;
}

export interface ChangelogItem {
  id: string;
  date: string;
  title: string;
  tag: string;
  summary: string;
  impact: string;
  isPreview?: boolean;
  links?: { label: string; url: string }[];
}

export interface PlaybookStep {
  id: string;
  title: string;
  description: string;
  tipId?: string;
  impact: ImpactType;
  effort: EffortType;
  lever: LeverType;
}

export interface PlaybookSection {
  title: string;
  subtitle: string;
  steps: PlaybookStep[];
}

export interface Playbook {
  id: string;
  slug: string;
  title: string;
  audience: AudienceType;
  timeframe: string;
  billRange: string;
  summary: string;
  sections: PlaybookSection[];
  kpis: string[];
}
