import { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

export const CONTACT_EMAIL = 'douglasallendev@gmail.com';
/** 08101502547 in international form for wa.me. */
export const WHATSAPP_URL = 'https://wa.me/2348101502547';

interface ContactButtonProps {
  className?: string;
}

/**
 * Opens a small chooser instead of going straight to mail, since most people
 * reaching out from a phone would rather use WhatsApp.
 */
export default function ContactButton({ className = '' }: ContactButtonProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const item =
    'flex items-center gap-3 rounded-full px-4 py-2.5 font-mono text-[#D7E2EA] text-xs uppercase tracking-wide transition-colors hover:bg-white/10';

  return (
    <div ref={wrapRef} className="relative inline-block">
      {open && (
        <div
          role="menu"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 rounded-2xl border border-white/15 bg-[#121214] p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.6)] z-50"
        >
          <a
            role="menuitem"
            href={`mailto:${CONTACT_EMAIL}`}
            className={item}
            onClick={() => setOpen(false)}
          >
            <Mail size={16} />
            Email
          </a>
          <a
            role="menuitem"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={item}
            onClick={() => setOpen(false)}
          >
            <SiWhatsapp size={16} />
            WhatsApp
          </a>
        </div>
      )}

      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`inline-block rounded-full text-white font-medium uppercase tracking-widest transition-transform duration-200 hover:scale-105 px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base ${className}`}
        style={{
          background:
            'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
          boxShadow:
            '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
          outline: '2px solid #FFFFFF',
          outlineOffset: '-3px',
        }}
      >
        Contact Me
      </button>
    </div>
  );
}
