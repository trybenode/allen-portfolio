import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import LiveProjectButton from '../components/LiveProjectButton';
import StatusBadge from '../components/StatusBadge';
import ScreenFrame from '../components/ScreenFrame';
import useMediaQuery from '../hooks/useMediaQuery';
import { projects, type Project } from '../data/projects';

const CARD_RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';

/**
 * Card screenshots are mostly white app UI, which glares against #0C0C0C.
 * At rest each one gets a scrim + a slight brightness/saturation pull so it
 * settles into the page; on hover it returns to full colour, which doubles as
 * the affordance that the image is a link. Tune via CARD_SCRIM / CARD_FILTER.
 */
const CARD_SCRIM = 'bg-[#0C0C0C]/30';
const CARD_FILTER = 'brightness-[0.88] saturate-[0.9]';

/**
 * Every card now shows the same thing: three framed screens in a row. Phones
 * get a bezel, web captures get a browser bar, so a mobile-first project and a
 * web-first project read as one family instead of two different layouts.
 */
function ScreenRow({ project }: { project: Project }) {
  const to = `/projects/${project.slug}`;
  const isPhone = project.cardImages[0].kind === 'phone';

  return (
    <div
      className={`grid gap-3 sm:gap-4 ${
        isPhone
          ? 'grid-cols-3 justify-items-center'
          : 'grid-cols-1 sm:grid-cols-3'
      }`}
    >
      {project.cardImages.map((shot, i) => (
        <Link
          key={shot.src}
          to={to}
          aria-label={`${project.name} screenshot ${i + 1}`}
          className={`group relative block ${
            isPhone ? 'w-full md:w-auto md:h-[38vh]' : 'w-full'
          }`}
        >
          <ScreenFrame
            src={shot.src}
            alt={`${project.name} screenshot ${i + 1}`}
            kind={shot.kind}
            className={
              isPhone
                ? 'w-full md:w-auto md:h-full aspect-[1/2]'
                : 'w-full aspect-[16/11]'
            }
            imgClassName={`${CARD_FILTER} transition duration-500 group-hover:brightness-100 group-hover:saturate-100`}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 ${
              isPhone ? 'rounded-[20px]' : 'rounded-xl'
            } ${CARD_SCRIM} transition-opacity duration-500 group-hover:opacity-0`}
          />
        </Link>
      ))}
    </div>
  );
}

interface CardProps {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  /** At md+ the cards sticky-stack and scale; below that they're plain flow. */
  isStacked: boolean;
}

function ProjectCard({
  project,
  index,
  progress,
  range,
  targetScale,
  isStacked,
}: CardProps) {
  // Hook must run unconditionally; we simply don't apply it when not stacked.
  const scale = useTransform(progress, range, [1, targetScale]);
  const number = String(index + 1).padStart(2, '0');

  return (
    <div className={isStacked ? 'h-[85vh] flex items-start justify-center sticky top-24 md:top-32' : 'mb-8 last:mb-0'}>
      <motion.div
        style={isStacked ? { scale, top: `${index * 28}px` } : undefined}
        className={`relative w-full max-w-6xl mx-auto ${CARD_RADIUS} border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8`}
      >
        {/* Top row — stacks vertically below sm */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-4 mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 md:gap-8">
            <span
              className="text-[#D7E2EA] font-black leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {number}
            </span>
            <div className="flex flex-col gap-2 sm:pt-2 md:pt-4 max-w-2xl">
              <span className="font-mono text-[#D7E2EA]/60 uppercase tracking-widest text-[11px] sm:text-xs">
                {project.category}
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <Link
                  to={`/projects/${project.slug}`}
                  className="text-[#D7E2EA] font-medium uppercase leading-tight transition-opacity duration-200 hover:opacity-70"
                  style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)' }}
                >
                  {project.name}
                </Link>
                <StatusBadge label={project.status} />
              </div>
              <p className="text-[#D7E2EA]/70 font-light leading-relaxed text-sm sm:text-base max-w-lg">
                {project.description}
              </p>
            </div>
          </div>

          {project.liveUrl && (
            <div className="shrink-0">
              <LiveProjectButton href={project.liveUrl} />
            </div>
          )}
        </div>

        <ScreenRow project={project} />
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Sticky/scroll-linked stacking is desktop-only: on mobile the viewport is
  // too short for it, and address-bar resize makes vh-based sticky jump.
  const isStacked = useMediaQuery('(min-width: 768px)');

  const total = projects.length;

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-16"
    >
      <h2
        className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-12 sm:mb-16 md:mb-20"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Project
      </h2>

      <div ref={containerRef}>
        {projects.map((project, i) => {
          const targetScale = 1 - (total - 1 - i) * 0.03;
          const range: [number, number] = [i / total, 1];
          return (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
              isStacked={isStacked}
            />
          );
        })}
      </div>
    </section>
  );
}
