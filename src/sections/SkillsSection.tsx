import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, GitBranch, Globe, Smartphone, Database } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { services } from '../data/services';

const EASE = [0.25, 0.1, 0.25, 1] as const;

type TabId = 'development' | 'specialties' | 'workflow';

const tabs: { id: TabId; label: string; Icon: LucideIcon }[] = [
  { id: 'development', label: 'Development', Icon: Code2 },
  { id: 'specialties', label: 'Specialties', Icon: Sparkles },
  { id: 'workflow', label: 'Workflow', Icon: GitBranch },
];

const developmentCards: {
  Icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
}[] = [
  {
    Icon: Globe,
    title: 'Web App Development',
    description:
      'Full-stack web apps with Next.js and React, with Redux or Zustand holding state. TrybeMarket runs on this in production, payments and all.',
    tags: [
      'Next.js',
      'React',
      'Redux',
      'Zustand',
      'TanStack Query',
      'Turborepo',
      'Tailwind CSS',
      'shadcn/ui',
    ],
  },
  {
    Icon: Smartphone,
    title: 'Mobile Development',
    description:
      'Cross-platform apps with Expo and React Native, built for real users. CribNConnect and the Network Analyser app both run on it, with offline support, realtime chat, and background data collection.',
    tags: ['React Native', 'Expo', 'Redux', 'NativeWind', 'Firebase'],
  },
  {
    Icon: Database,
    title: 'APIs & Data',
    description:
      'The server side: REST APIs, auth, payments, background jobs and the databases behind them, plus the managed services that sit alongside, whether that is a hosted platform or a database I run myself.',
    tags: [
      'Node.js',
      'Express',
      'Fastify',
      'FastAPI',
      'Python/Django',
      'PostgreSQL',
      'Drizzle',
      'SQL',
      'Oracle',
      'MongoDB',
      'Firestore',
      'Supabase',
      'Redis',
      'BullMQ',
      'Clerk',
      'Paystack',
      'Cloudinary',
      'PostHog',
      'Cloud hosting',
    ],
  },
];

const workflowTools = [
  'Git & GitHub',
  'Vite',
  'Figma',
  'Vercel',
  'Claude Code',
  'VS Code',
];

/**
 * Self-assessed, but grounded in the shipped work on this page rather than
 * guessed. Rubric used: large codebase or production traffic -> ~80;
 * used seriously in one project -> 55-60. Edit freely, they're yours.
 *   React Native / Expo  CribNConnect (48.8k lines, 542 commits) + Network Analyser app
 *   React / Next.js      TrybeMarket, in production (27k lines) + NA dashboard
 *   Firebase / Firestore TrybeMarket security rules + CribNConnect realtime chat
 *   Paystack             two integrations, server verification + HMAC webhooks
 *   Node.js / MongoDB    Network Analyser API (geo queries, clustering)
 *   Python / Django      kept at your original number; no project here shows it yet
 */
const skills = [
  { name: 'React Native / Expo', level: 80 },
  { name: 'React / Next.js', level: 80 },
  { name: 'Firebase / Firestore', level: 80 },
  { name: 'Tailwind CSS', level: 75 },
  { name: 'Paystack', level: 70 },
  { name: 'Node.js / Express', level: 60 },
  { name: 'MongoDB', level: 55 },
  { name: 'Python / Django', level: 60 },
];

function Tag({ label, large = false }: { label: string; large?: boolean }) {
  return (
    <span
      className={`rounded-full bg-[#0C0C0C]/5 text-[#0C0C0C] font-medium uppercase tracking-wide ${
        large ? 'px-4 py-2 text-sm' : 'px-3 py-1 text-xs'
      }`}
    >
      {label}
    </span>
  );
}

function IconBadge({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full bg-[#0C0C0C]/5 w-10 h-10 shrink-0">
      <Icon size={20} className="text-[#0C0C0C]" />
    </span>
  );
}

function SkillBar({
  name,
  level,
  index,
}: {
  name: string;
  level: number;
  index: number;
}) {
  return (
    <FadeIn delay={index * 0.1} y={20}>
      <div className="flex items-center justify-between">
        <span className="text-[#0C0C0C] font-medium text-sm">{name}</span>
        <span className="text-[#0C0C0C] text-sm opacity-60">{level}%</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-[rgba(12,12,12,0.1)] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[#0C0C0C]"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: '50px', amount: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
        />
      </div>
    </FadeIn>
  );
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<TabId>('development');

  return (
    <section
      id="skills"
      className="bg-white rounded-t-[32px] sm:rounded-t-[45px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 md:pt-24 pb-24 sm:pb-24 md:pb-28 relative z-10"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-12 sm:mb-16"
          style={{ fontSize: 'clamp(2rem, 7vw, 5rem)' }}
        >
          Skills &amp; Expertise
        </h2>
      </FadeIn>

      {/* Segmented tab control */}
      <FadeIn delay={0.1} y={20}>
        <div
          role="tablist"
          aria-label="Skills categories"
          className="flex items-center justify-center gap-1 sm:gap-2 max-w-2xl mx-auto rounded-full bg-[#0C0C0C]/5 p-1.5"
        >
          {tabs.map(({ id, label, Icon }) => {
            const isActive = id === activeTab;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 rounded-full px-2 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-white border border-[rgba(12,12,12,0.08)] shadow-sm text-[#0C0C0C] font-medium'
                    : 'bg-transparent border border-transparent text-[#0C0C0C]/50 hover:text-[#0C0C0C]/70'
                }`}
              >
                <Icon size={16} className="shrink-0" />
                <span className="uppercase tracking-wide">{label}</span>
              </button>
            );
          })}
        </div>
      </FadeIn>

      {/* Tab panels — keyed so each switch remounts and re-runs the FadeIn */}
      <div key={activeTab} className="mt-10 sm:mt-12 max-w-4xl mx-auto">
        {activeTab === 'development' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {developmentCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.1} y={30}>
                <div className="h-full rounded-2xl border border-[rgba(12,12,12,0.1)] p-6">
                  <IconBadge Icon={card.Icon} />
                  <h3 className="mt-4 text-[#0C0C0C] font-medium text-lg">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[#0C0C0C] font-light text-sm leading-relaxed opacity-70">
                    {card.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <Tag key={tag} label={tag} />
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {activeTab === 'specialties' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <FadeIn key={service.name} delay={i * 0.1} y={30}>
                <div className="h-full flex flex-col items-center text-center gap-3 rounded-2xl border border-[rgba(12,12,12,0.1)] p-5">
                  <IconBadge Icon={service.Icon} />
                  <h3 className="text-[#0C0C0C] font-medium text-sm leading-snug">
                    {service.name}
                  </h3>
                </div>
              </FadeIn>
            ))}
          </div>
        )}

        {activeTab === 'workflow' && (
          <FadeIn delay={0} y={20}>
            <div className="flex flex-wrap justify-center gap-3">
              {workflowTools.map((tool) => (
                <Tag key={tool} label={tool} large />
              ))}
            </div>
          </FadeIn>
        )}
      </div>

      {/* Skill bars — always visible, independent of the active tab */}
      <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
        {skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
