import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import Magnet from '../components/Magnet';
import ContactButton from '../components/ContactButton';
import { navLinks } from '../data/navLinks';
import heroPortrait from '../assets/hero/hero-portrait.webp';

const PORTRAIT_FADE_BOTTOM =
  'linear-gradient(to bottom, #000 75%, transparent 100%)';

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll while the mobile overlay menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <section
      className="relative flex flex-col"
      // 100dvh tracks the mobile address bar; h-screen is the fallback.
      style={{ overflowX: 'clip', height: '100dvh', minHeight: '100svh' }}
    >
      {/* Navbar */}
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="px-6 md:px-10 pt-6 md:pt-8 relative z-20"
      >
        {/* Mobile (< sm): wordmark + hamburger */}
        <div className="flex sm:hidden justify-between items-center">
          <a
            href="#"
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-lg"
          >
            @ttdotdev
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* sm and up: original horizontal nav, unchanged */}
        <div className="hidden sm:flex justify-between items-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
        </div>
      </FadeIn>

      {/* Mobile full-screen overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0C0C0C] flex flex-col sm:hidden">
          <div className="flex justify-end px-6 pt-6">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
            >
              <X size={28} />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-8 flex-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-3xl transition-opacity duration-200 hover:opacity-70"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Hero heading */}
      <div className="overflow-hidden px-6 md:px-10">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading font-black uppercase tracking-tight w-full whitespace-normal leading-[0.95] sm:whitespace-nowrap sm:leading-none mt-6 sm:mt-4 md:-mt-5"
            style={{ fontSize: 'clamp(2.75rem, 13vw, 8.5rem)' }}
          >
            Hi, i&apos;m allen
          </h1>
        </FadeIn>
      </div>

      {/* Hero portrait: transparent cutout, cropped + converted from hero-portrait.png */}
      {/*
        Positioning lives on this plain wrapper, NOT on the FadeIn. FadeIn is a
        motion element and Framer Motion writes an inline `transform`, which
        silently overrode Tailwind's `-translate-x-1/2` and pushed the portrait
        half its own width to the right. Three separate transform layers now:
        this wrapper centers, FadeIn animates, Magnet does the hover offset.
      */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 z-10 w-max">
        {/* Soft radial glow that grounds the portrait against the flat bg */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[130%] rounded-full blur-3xl bg-gradient-radial from-white/10 via-transparent to-transparent"
        />

        <FadeIn delay={0.6} y={30} className="relative">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src={heroPortrait}
              alt="Allen Douglas"
              // Height-driven so the whole figure always fits the hero,
              // whatever the screen's aspect ratio.
              className="h-[58vh] sm:h-[74dvh] md:h-[80dvh] w-auto max-w-none select-none pointer-events-none"
              draggable={false}
              // The legs run off the bottom of the photo, so fade that edge
              // into the page instead of ending on a hard cut.
              style={{
                WebkitMaskImage: PORTRAIT_FADE_BOTTOM,
                maskImage: PORTRAIT_FADE_BOTTOM,
              }}
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="mt-auto flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 relative z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a software engineer &amp; founder building products that solve real
            problems, from student marketplaces to community platforms
          </p>
          {/* Credentials caption */}
          <p className="mt-3 text-[#D7E2EA] font-light uppercase tracking-wide opacity-50 text-[10px] sm:text-xs">
            BSc Software Engineering · CS50x  
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
