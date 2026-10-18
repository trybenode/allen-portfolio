import { SiReact, SiNodedotjs, SiMongodb, SiFigma } from 'react-icons/si';
import FadeIn from '../components/FadeIn';
import AnimatedText from '../components/AnimatedText';
import ContactButton from '../components/ContactButton';

const aboutText =
  "I'm a full-stack engineer who builds web and mobile products end to end, from clean, responsive interfaces to scalable APIs and databases. As co-founder of a software studio with a hand-full of projects and through my own ventures, I turn ideas into reliable, production-ready software people actually use. Let's build something real together!";

/**
 * Four decorative corner accents — purely visual texture framing the copy.
 * Stack glyphs in the page accent colour at low opacity so they read as
 * background, not as content competing with the heading.
 * Swap any of these for another `react-icons/si` glyph (e.g. SiPython,
 * SiTailwindcss) without touching the sizes / positions / FadeIn timings.
 */
const ACCENT = 'w-full h-auto text-[#D7E2EA] opacity-25';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden"
    >
      {/* Top-left */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none"
      >
        <SiReact className={ACCENT} aria-hidden="true" />
      </FadeIn>

      {/* Bottom-left */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none"
      >
        <SiNodedotjs className={ACCENT} aria-hidden="true" />
      </FadeIn>

      {/* Top-right */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none"
      >
        <SiMongodb className={ACCENT} aria-hidden="true" />
      </FadeIn>

      {/* Bottom-right */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none"
      >
        <SiFigma className={ACCENT} aria-hidden="true" />
      </FadeIn>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight text-center"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              About me
            </h2>
          </FadeIn>

          <AnimatedText
            text={aboutText}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        <FadeIn delay={0.2} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
