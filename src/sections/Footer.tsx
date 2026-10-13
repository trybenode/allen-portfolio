import { Github, Linkedin, Instagram } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { navLinks } from '../data/navLinks';

/**
 * TODO(allen): these are inferred from your @ttdotdev handle — correct any
 * that point at the wrong profile.
 */
const socials = [
  { label: 'GitHub', Icon: Github, href: 'https://github.com/Tsunamiisking/' },
  { label: 'LinkedIn', Icon: Linkedin, href: 'https://www.linkedin.com/in/allen-douglas-ttdotdev/' },
  { label: 'Instagram', Icon: Instagram, href: 'https://instagram.com/ttdotdev' },
  { label: 'WhatsApp', Icon: SiWhatsapp, href: 'https://wa.me/2348101502547' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 pb-8 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-8">
        {/* Left — name + tagline */}
        <div className="max-w-xs">
          <h2 className="text-[#D7E2EA] font-medium uppercase tracking-wide text-xl sm:text-2xl">
            Allen Douglas
          </h2>
          <p className="mt-2 text-[#D7E2EA]/60 font-light leading-relaxed text-sm sm:text-base">
            Software engineer &amp; founder, based in Lagos, Nigeria.
          </p>
        </div>

        {/* Middle — nav links */}
        <nav className="flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#D7E2EA] font-light uppercase tracking-wide text-sm transition-opacity duration-200 hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right — socials + company link */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-5">
            {socials.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
          <a
            href="https://trybenode.online"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D7E2EA]/60 font-light tracking-wide text-sm transition-opacity duration-200 hover:opacity-100"
          >
            trybenode.online
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-[#D7E2EA]/15">
        <p className="text-[#D7E2EA]/40 font-light text-xs sm:text-sm text-center">
          © 2026 Allen Douglas. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
