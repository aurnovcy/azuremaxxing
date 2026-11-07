import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckSquare, Square, RotateCcw, ArrowRight, ShieldCheck, CheckCircle2, BookOpen } from 'lucide-react';
import { SEO } from '../utils/seo';
import { PLAYBOOKS } from '../data/playbooks';
import { getStoredJson, setStoredJson } from '../utils/storage';

export const PlaybookDetail: React.FC = () => {
  const { slug = 'startup-30-day-plan' } = useParams<{ slug: string }>();
  const playbook = PLAYBOOKS[slug] || PLAYBOOKS['startup-30-day-plan'];

  const storageKey = `azuremaxxing_playbook_${playbook.id}_completed`;
  const [completedSteps, setCompletedSteps] = useState<string[]>(() =>
    getStoredJson<string[]>(storageKey, [])
  );

  useEffect(() => {
    setCompletedSteps(getStoredJson<string[]>(storageKey, []));
  }, [storageKey]);

  const toggleStep = (stepId: string) => {
    const updated = completedSteps.includes(stepId)
      ? completedSteps.filter(id => id !== stepId)
      : [...completedSteps, stepId];
    setCompletedSteps(updated);
    setStoredJson(storageKey, updated);
  };

  const resetProgress = () => {
    if (window.confirm('Reset progress on this playbook?')) {
      setCompletedSteps([]);
      setStoredJson(storageKey, []);
    }
  };

  const totalSteps = playbook.sections.reduce((acc, sec) => acc + sec.steps.length, 0);
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps.length / totalSteps) * 100) : 0;

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: playbook.title,
    description: playbook.summary,
    totalTime: playbook.timeframe,
    step: playbook.sections.flatMap((sec, sIdx) =>
      sec.steps.map((st, idx) => ({
        '@type': 'HowToStep',
        position: sIdx * 10 + idx + 1,
        name: st.title,
        text: st.description
      }))
    )
  };

  return (
    <div className="w-full pb-20">
      <SEO
        title={`${playbook.title} | azuremaxxing`}
        description={playbook.summary}
        canonicalPath={`/playbooks/${playbook.slug}`}
        schema={howToSchema}
      />

      {/* Header */}
      <section className="pt-12 pb-10 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 text-xs font-mono text-[#888888] mb-3">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#3b9eff]">Playbooks</span>
            <span>/</span>
            <span className="text-white uppercase">{playbook.audience}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white">
            {playbook.title}
          </h1>
          <p className="mt-3 text-base text-[#a1a1a1] max-w-3xl leading-relaxed">
            {playbook.summary}
          </p>

          {/* Quick Playbook Selector Tabs */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-1 scrollbar-none">
            {Object.values(PLAYBOOKS).map(p => (
              <Link
                key={p.slug}
                to={`/playbooks/${p.slug}`}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  p.slug === playbook.slug
                    ? 'bg-white text-black font-semibold'
                    : 'bg-[#111111] text-[#a1a1a1] hover:text-white hover:bg-[#1a1a1a] border border-[#222222]'
                }`}
              >
                {p.title.split(':')[0]} ({p.billRange})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Progress Bar */}
      <div className="sticky top-14 z-30 bg-black/95 border-b border-[#1f1f1f] py-3.5 backdrop-blur-md">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-white font-medium">
              Progress: <strong className="text-[#3b9eff]">{completedSteps.length}</strong> of {totalSteps} tasks ({progressPercent}%)
            </span>
            <div className="hidden sm:block w-48 h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#262626]">
              <div
                className="h-full bg-[#3b9eff] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {completedSteps.length > 0 && (
              <button
                onClick={resetProgress}
                className="flex items-center gap-1 text-[11px] font-mono text-[#888888] hover:text-white transition-colors"
                title="Reset completed checklist"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
            <span className="text-xs font-mono text-emerald-400">
              {progressPercent === 100 ? '🎉 Playbook Completed!' : `Target: ${playbook.timeframe}`}
            </span>
          </div>
        </div>
      </div>

      {/* Playbook Checklist Sections */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-10 space-y-12">
        {playbook.sections.map((section, sIdx) => (
          <section key={sIdx} className="space-y-4">
            <div className="border-b border-[#1f1f1f] pb-3">
              <h2 className="text-xl font-bold text-white tracking-tight">{section.title}</h2>
              <p className="text-xs text-[#888888] mt-0.5">{section.subtitle}</p>
            </div>

            <div className="space-y-3">
              {section.steps.map((step) => {
                const isChecked = completedSteps.includes(step.id);
                return (
                  <div
                    key={step.id}
                    onClick={() => toggleStep(step.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 select-none ${
                      isChecked
                        ? 'bg-[#090909] border-[#1a1a1a] opacity-75'
                        : 'bg-[#0e0e0e] border-[#222222] hover:border-[#333333]'
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 text-[#3b9eff] shrink-0"
                      aria-label={isChecked ? 'Mark incomplete' : 'Mark complete'}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Square className="w-5 h-5 text-[#444444] hover:text-[#888888]" />
                      )}
                    </button>

                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className={`text-sm font-semibold transition-colors ${isChecked ? 'line-through text-[#888888]' : 'text-white'}`}>
                          {step.title}
                        </h3>
                        <div className="flex items-center gap-2 font-mono text-[10px]">
                          <span className="px-1.5 py-0.5 rounded bg-[#161616] border border-[#222222] text-[#888888] uppercase">
                            {step.lever}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-[#161616] border border-[#222222] text-[#3b9eff]">
                            {step.effort} effort
                          </span>
                        </div>
                      </div>

                      <p className={`text-xs leading-relaxed ${isChecked ? 'text-[#666666]' : 'text-[#a1a1a1]'}`}>
                        {step.description}
                      </p>

                      {step.tipId && (
                        <div className="pt-1.5 flex items-center gap-3">
                          <Link
                            to={`/tips?q=${step.tipId}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 font-mono text-xs text-[#3b9eff] hover:underline"
                          >
                            <span>Tip {step.tipId}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Completion Box */}
        {progressPercent === 100 && (
          <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/15 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Congratulations! Playbook Checklist Complete</h3>
            <p className="text-xs text-[#a1a1a1] max-w-lg mx-auto">
              Your Azure environment now adheres to the azuremaxxing standard. Next step: establish continuous weekly showback digests and monthly cost reviews.
            </p>
            <div className="pt-2">
              <Link
                to="/dashboards"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-400 text-black font-semibold text-xs"
              >
                <span>Deploy D01 Executive Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
