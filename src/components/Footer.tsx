import React from 'react';
import { Link } from 'react-router-dom';
import { Rss, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#1f1f1f] bg-[#050505] text-[#888888] text-xs mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-[#1a1a1a]">
          {/* Col 1: Brand & Tagline */}
          <div className="col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2 text-white font-bold tracking-tight text-sm">
              <span className="w-4 h-4 rounded bg-[#3b9eff] flex items-center justify-center text-black font-mono text-[10px] font-black">
                ▲
              </span>
              <span>azuremaxxing</span>
            </Link>
            <p className="text-[#a1a1a1] max-w-sm leading-relaxed">
              The Field Guide to Getting Maximum Value from Every Azure Dollar. Rate, usage, and license optimization for engineering and FinOps teams.
            </p>
            <div className="flex items-center gap-3 pt-2 font-mono text-[11px] text-[#666666]">
              <a
                href="/feed.xml"
                className="inline-flex items-center gap-1 text-[#888888] hover:text-[#3b9eff] transition-colors"
                title="Atom / RSS Feed"
              >
                <Rss className="w-3 h-3 text-amber-500" />
                <span>feed.xml</span>
              </a>
            </div>
          </div>

          {/* Col 2: Playbooks */}
          <div className="space-y-2.5">
            <h4 className="font-mono uppercase text-[11px] tracking-wider text-white font-semibold">Playbooks</h4>
            <ul className="space-y-2 text-[#a1a1a1]">
              <li>
                <Link to="/playbooks/startup-30-day-plan" className="hover:text-white transition-colors">
                  Startup 30-Day Plan
                </Link>
              </li>
              <li>
                <Link to="/playbooks/scale-up-90-day-program" className="hover:text-white transition-colors">
                  Scale-Up 90-Day Program
                </Link>
              </li>
              <li>
                <Link to="/playbooks/enterprise-12-month-program" className="hover:text-white transition-colors">
                  Enterprise 12-Month Plan
                </Link>
              </li>
              <li>
                <Link to="/maturity-model" className="hover:text-white transition-colors">
                  FinOps Maturity Model
                </Link>
              </li>
              <li>
                <Link to="/azure-explained" className="hover:text-white transition-colors">
                  How Azure is Shaped
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Tools & Queries */}
          <div className="space-y-2.5">
            <h4 className="font-mono uppercase text-[11px] tracking-wider text-white font-semibold">Tools & Queries</h4>
            <ul className="space-y-2 text-[#a1a1a1]">
              <li>
                <Link to="/deadlines" className="hover:text-white transition-colors text-amber-400">
                  Deadlines (Feb 1, 2027)
                </Link>
              </li>
              <li>
                <Link to="/resource-graph-queries" className="hover:text-white transition-colors">
                  Resource Graph Library
                </Link>
              </li>
              <li>
                <Link to="/calculators" className="hover:text-white transition-colors">
                  10 FinOps Calculators
                </Link>
              </li>
              <li>
                <Link to="/dashboards" className="hover:text-white transition-colors">
                  22 Dashboard Specs
                </Link>
              </li>
              <li>
                <Link to="/ask" className="hover:text-white transition-colors text-[#3b9eff]">
                  Ask Azure maxxing AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Reference & Legal */}
          <div className="space-y-2.5">
            <h4 className="font-mono uppercase text-[11px] tracking-wider text-white font-semibold">Reference</h4>
            <ul className="space-y-2 text-[#a1a1a1]">
              <li>
                <Link to="/kpis" className="hover:text-white transition-colors">
                  KPI Catalog
                </Link>
              </li>
              <li>
                <Link to="/whats-new" className="hover:text-white transition-colors">
                  What's New (2025-2026)
                </Link>
              </li>
              <li>
                <Link to="/sources" className="hover:text-white transition-colors">
                  Primary Sources
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About & Method
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-white transition-colors">
                  Pricing Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Editorial Footnote */}
        <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[#666666] text-[11px] leading-relaxed">
          <p className="max-w-3xl">
            Pricing mechanics and published relative discounts only; prices vary by region, agreement type (EA, MCA, CSP, pay-as-you-go), currency, and date. Content reviewed quarterly and after Microsoft Ignite, Build, and FinOps X. Not affiliated with or endorsed by Microsoft.
          </p>
          <div className="flex items-center gap-4 shrink-0 font-mono">
            <Link to="/sitemap.xml" className="hover:text-[#a1a1a1]">
              sitemap.xml
            </Link>
            <span>·</span>
            <Link to="/llms.txt" className="hover:text-[#a1a1a1]">
              llms.txt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
