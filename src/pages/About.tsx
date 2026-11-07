import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ShieldCheck, Terminal, Award } from 'lucide-react';
import { SEO } from '../utils/seo';

export const About: React.FC = () => {
  return (
    <div className="w-full pb-20">
      <SEO
        title="About azuremaxxing – Method, Architecture & Philosophy"
        description="The story and engineering philosophy behind azuremaxxing: The Field Guide to Getting Maximum Value from Every Azure Dollar."
        canonicalPath="/about"
      />

      <section className="pt-12 pb-10 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[#3b9eff]">Mission & Background</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white mt-1">
            About azuremaxxing
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#d4d4d4] max-w-2xl leading-relaxed">
            "Maxxing" means maximizing the business value returned for every single dollar on the Azure invoice.
          </p>
        </div>
      </section>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 pt-10 space-y-12">
        <section className="space-y-4 text-sm text-[#d4d4d4] leading-relaxed">
          <h2 className="text-xl font-bold text-white tracking-tight">The Problem with Cloud Advice</h2>
          <p>
            Most cloud cost optimization content falls into two traps: superficial "turn off unused VMs" listicles that ignore real enterprise architecture, or vendor marketing pitches aimed at selling closed-source SaaS dashboards.
          </p>
          <p>
            Azure in particular has architectural nuances that generic cloud advice completely misses:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[#a1a1a1]">
            <li><strong className="text-white">The Third Lever (Licensing):</strong> Azure Hybrid Benefit, Dev/Test pricing, and SQL Server edition sizing can rival or exceed traditional compute rightsizing.</li>
            <li><strong className="text-white">The February 1, 2027 Reservation Cliff:</strong> Ending reservation exchanges turns every new reservation into a permanent commitment.</li>
            <li><strong className="text-white">The FOCUS Ingestion Revolution:</strong> Azure has led the cloud industry in adopting open, standardized billing data (FOCUS 1.4 / 1.5).</li>
          </ul>
        </section>

        <section className="p-6 rounded-2xl border border-[#222222] bg-[#0a0a0a] space-y-3">
          <h3 className="text-base font-semibold text-white">Editorial Tone & Integrity</h3>
          <p className="text-xs text-[#a1a1a1] leading-relaxed">
            Tone: confident, practical, slightly irreverent, never fear-mongering. We never quote hard-coded price lists because Azure prices vary by region, agreement type, currency, and date. Every tip is dated and links directly to official Microsoft documentation.
          </p>
          <div className="pt-2">
            <Link to="/disclaimer" className="text-xs text-[#3b9eff] hover:underline font-mono">
              Read our full pricing & affiliation disclaimer →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
