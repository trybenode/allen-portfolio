import { useMemo, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Github, Info } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';
import StatusBadge from '../components/StatusBadge';
import Lightbox from '../components/Lightbox';
import ScreenFrame from '../components/ScreenFrame';
import { getProject } from '../data/projects';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[#D7E2EA]/40 uppercase tracking-widest text-xs mb-6">
      <span className="text-[#D7E2EA]/25">// </span>
      {children}
    </h2>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  const [open, setOpen] = useState<number | null>(null);

  // One flat list: the frames themselves distinguish phone from web, so the
  // gallery no longer needs separate sections per kind.
  const flat = useMemo(
    () =>
      (project?.gallery ?? []).map((g, i) => ({
        ...g,
        alt: `${project?.name} screenshot ${i + 1}`,
      })),
    [project]
  );

  const allPhones = flat.length > 0 && flat.every((f) => f.kind === 'phone');

  // Unknown slug -> back to the portfolio rather than a blank screen.
  if (!project) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-8 sm:pt-10 pb-20 sm:pb-24">
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={-10}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[#D7E2EA]/70 uppercase tracking-wide text-[11px] sm:text-xs transition-opacity duration-200 hover:opacity-70"
          >
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>
        </FadeIn>

        {/* Header */}
        <FadeIn delay={0.08} y={30}>
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
            <h1
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.25rem, 8vw, 6rem)' }}
            >
              {project.name}
            </h1>
            <StatusBadge label={project.status} />
          </div>
        </FadeIn>

        <FadeIn delay={0.14} y={20}>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="font-mono text-[#D7E2EA]/60 uppercase tracking-widest text-[11px] sm:text-xs">
              {project.category}
            </p>
            {flat.length > 0 && (
              <a
                href="#screens"
                className="font-mono text-[#D7E2EA]/60 uppercase tracking-widest text-[11px] sm:text-xs underline underline-offset-4 decoration-white/20 transition-opacity hover:opacity-70"
              >
                See {flat.length} screens ↓
              </a>
            )}
          </div>
        </FadeIn>

        {/* Overview */}
        <FadeIn delay={0.2} y={20}>
          <p className="mt-8 text-[#D7E2EA] font-light leading-relaxed max-w-2xl text-base sm:text-lg">
            {project.overview}
          </p>
        </FadeIn>

        {project.metrics.length > 0 && (
          <FadeIn delay={0.24} y={20}>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-y border-white/10 py-5">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-[#D7E2EA] text-lg sm:text-xl">
                    {m.value}
                  </dt>
                  <dd className="font-mono text-[#D7E2EA]/40 uppercase tracking-widest text-[10px] mt-1">
                    {m.label}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        )}

        {project.tags.length > 0 && (
          <FadeIn delay={0.26} y={20}>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono rounded-full bg-white/5 text-[#D7E2EA] px-3 py-1 text-[11px] uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeIn>
        )}

        {/* Stack */}
        <FadeIn delay={0.32} y={20}>
          <section className="mt-16 sm:mt-20">
            <SectionLabel>Stack</SectionLabel>
            <dl>
              {project.stack.map((row) => (
                <div
                  key={row.layer}
                  className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-1 sm:gap-8 py-4 border-t border-white/10 last:border-b"
                >
                  <dt className="font-mono text-[#D7E2EA]/40 uppercase tracking-wide text-[11px] sm:pt-1">
                    {row.layer}
                  </dt>
                  <dd className="text-[#D7E2EA] font-light leading-relaxed text-sm sm:text-base">
                    {row.choice}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </FadeIn>

        {/* Highlights: same numbered rhythm as the Services list */}
        <section className="mt-16 sm:mt-20">
          <FadeIn delay={0} y={20}>
            <SectionLabel>Highlights</SectionLabel>
          </FadeIn>
          <ol>
            {project.highlights.map((h, i) => (
              <FadeIn key={h.title} delay={i * 0.08} y={30}>
                <li className="flex items-start gap-5 sm:gap-8 md:gap-12 py-8 sm:py-10 border-t border-white/10">
                  <span
                    className="text-[#D7E2EA] font-black leading-none shrink-0 min-w-[1.3em] tabular-nums"
                    style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-3 sm:gap-4 sm:pt-2">
                    <h3
                      className="text-[#D7E2EA] font-medium uppercase leading-tight"
                      style={{ fontSize: 'clamp(1rem, 2vw, 1.75rem)' }}
                    >
                      {h.title}
                    </h3>
                    <p
                      className="text-[#D7E2EA] font-light leading-relaxed max-w-2xl"
                      style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)', opacity: 0.6 }}
                    >
                      {h.body}
                    </p>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ol>
          <div className="border-t border-white/10" />
        </section>

        {/* Known limitations: honest context, deliberately quiet */}
        <FadeIn delay={0} y={20}>
          <aside className="mt-10 flex gap-3 rounded-2xl border border-white/10 p-5 sm:p-6 opacity-55">
            <Info size={18} className="text-[#D7E2EA] shrink-0 mt-0.5" />
            <div>
              <p className="font-mono text-[#D7E2EA] uppercase tracking-widest text-[11px] mb-2">
                Known limitations
              </p>
              <p className="text-[#D7E2EA] font-light leading-relaxed text-sm">
                {project.limitations}
              </p>
            </div>
          </aside>
        </FadeIn>

        {/* Screens: compact thumbnails, full size in the lightbox */}
        {flat.length > 0 && (
          <section id="screens" className="mt-16 sm:mt-20 scroll-mt-8">
            <FadeIn delay={0} y={20}>
              <SectionLabel>Screens</SectionLabel>
            </FadeIn>
            {/* All one kind: pack them tight. Mixed: identical cells with each
                frame centred, so phones and browsers line up on one grid. */}
            <div
              className={`grid gap-3 sm:gap-4 ${
                allPhones
                  ? 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-6'
                  : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
              }`}
            >
              {flat.map((item, i) => (
                <FadeIn key={item.src} delay={Math.min(i, 5) * 0.05} y={20}>
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-label={`Open ${item.alt}`}
                    className={`group relative flex h-full w-full items-center justify-center cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D7E2EA]/60 rounded-xl ${
                      allPhones ? '' : 'aspect-[4/5]'
                    }`}
                  >
                    <ScreenFrame
                      src={item.src}
                      alt=""
                      kind={item.kind}
                      eager={i < 4}
                      className={
                        allPhones
                          ? 'w-full aspect-[1/2]'
                          : item.kind === 'phone'
                            ? 'h-full w-auto aspect-[1/2]'
                            : 'w-full aspect-[16/11]'
                      }
                      imgClassName="brightness-95 saturate-[0.95] transition duration-500 group-hover:brightness-100 group-hover:saturate-100"
                    />
                  </button>
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {(project.repos.length > 0 || project.liveUrl) && (
          <FadeIn delay={0} y={20}>
            <div className="mt-16 sm:mt-20 flex flex-wrap items-center gap-4">
              {project.repos.map((repo) => (
                <a
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA]/40 text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-3 text-sm transition-colors duration-200 hover:bg-[#D7E2EA]/10"
                >
                  <Github size={18} />
                  {repo.label}
                </a>
              ))}
              {project.liveUrl && <LiveProjectButton href={project.liveUrl} />}
            </div>
          </FadeIn>
        )}
      </div>

      <Lightbox images={flat} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
    </div>
  );
}
