import { Download } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { experience } from '../data/experience';

/**
 * Drop the PDF at `public/allen-douglas-cv.pdf` and this button serves it.
 * Until then the link 404s, so it is the one thing left to add here.
 */
const CV_URL = '/allen-douglas-cv.pdf';

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="bg-[#0C0C0C] rounded-t-[32px] sm:rounded-t-[45px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 relative z-10"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center mb-12 sm:mb-16"
          style={{ fontSize: 'clamp(2rem, 7vw, 5rem)' }}
        >
          Experience
        </h2>
      </FadeIn>

      <div className="max-w-4xl mx-auto">
        {experience.map((role, i) => (
          <FadeIn key={role.company} delay={i * 0.1} y={30}>
            {/* Timeline rail: the dot marks the role, the line continues down */}
            <div className="relative border-l border-white/10 pl-6 sm:pl-10 pb-10 last:pb-0">
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#D7E2EA]" />

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3
                  className="text-[#D7E2EA] font-medium uppercase leading-tight"
                  style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.75rem)' }}
                >
                  {role.title}
                </h3>
                <span className="font-mono text-[#D7E2EA]/40 text-[11px] uppercase tracking-widest">
                  @ {role.company}
                </span>
                {role.period && (
                  <span className="font-mono text-[#D7E2EA]/40 text-[11px] uppercase tracking-widest sm:ml-auto">
                    {role.period}
                  </span>
                )}
              </div>

              {(role.employment || role.location) && (
                <p className="mt-2 font-mono text-[#D7E2EA]/40 text-[11px] uppercase tracking-widest">
                  {[role.employment, role.location].filter(Boolean).join(' · ')}
                </p>
              )}

              <p className="mt-3 text-[#D7E2EA]/60 font-light leading-relaxed max-w-2xl text-sm sm:text-base">
                {role.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {role.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono rounded-full bg-white/5 text-[#D7E2EA] px-3 py-1 text-[11px] uppercase tracking-wide"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}

        <FadeIn delay={0.2} y={20}>
          <div className="mt-10 sm:mt-12 flex justify-center">
            <a
              href={CV_URL}
              download
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA]/40 font-mono text-[#D7E2EA] uppercase tracking-widest px-7 py-3.5 text-xs sm:text-sm transition-colors duration-200 hover:bg-[#D7E2EA]/10"
            >
              <Download size={17} />
              Download CV
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
