import { useEffect, useRef, useState } from 'react';

/**
 * Replaces the old scroll-driven image marquee. Everything here is real:
 * the line counts, commit totals and statuses all come from the same numbers
 * shown on the project pages. Keep them in sync if those change.
 *
 * Total commits = 444 (trybemarket) + 542 (cribnconnect) + 129 (network
 * analyser) + 99 (primsett).
 */
type Entry =
  | { kind: 'cmd'; text: string }
  | { kind: 'out'; text: string; tone?: 'base' | 'dim' | 'accent' }
  | { kind: 'gap' };

const ACCENT = 'text-[#C08BE8]';

const SESSION: Entry[] = [
  { kind: 'cmd', text: 'whoami' },
  { kind: 'out', text: 'allen douglas' },
  { kind: 'out', text: 'software engineer · founder', tone: 'dim' },
  { kind: 'out', text: 'co-founder, trybenode', tone: 'dim' },
  { kind: 'gap' },

  { kind: 'cmd', text: 'cat stack.json' },
  { kind: 'out', text: '{', tone: 'dim' },
  // Kept compact (no column padding) so no line wraps at 375px.
  { kind: 'out', text: '  "mobile": ["react native","expo"],' },
  { kind: 'out', text: '  "web": ["next.js","react","redux"],' },
  { kind: 'out', text: '  "ui": ["tailwind","nativewind"],' },
  { kind: 'out', text: '  "api": ["node","express","fastify"],' },
  { kind: 'out', text: '  "python": ["fastapi","django"],' },
  { kind: 'out', text: '  "data": ["postgres","sql","oracle"],' },
  { kind: 'out', text: '  "nosql": ["firestore","mongodb"],' },
  { kind: 'out', text: '  "cache": ["redis"],' },
  { kind: 'out', text: '  "payments": ["paystack"]' },
  { kind: 'out', text: '}', tone: 'dim' },
  { kind: 'gap' },

  { kind: 'cmd', text: 'ls -l projects/' },
  { kind: 'out', text: 'trybemarket        live        27.0k loc', tone: 'accent' },
  { kind: 'out', text: 'cribnconnect       in dev      48.8k loc', tone: 'accent' },
  { kind: 'out', text: 'network-analyser   in dev       7.5k loc', tone: 'accent' },
  { kind: 'out', text: 'primsett           in dev      12.1k loc', tone: 'accent' },
  { kind: 'gap' },

  { kind: 'cmd', text: 'git log --oneline | wc -l' },
  { kind: 'out', text: '1214 commits since may 2025' },
  { kind: 'gap' },

  { kind: 'cmd', text: 'cat now.txt' },
  {
    kind: 'out',
    text: 'shipping a student marketplace with real money flows, and a crowdsourced network monitor for nigeria. open to work that ships.',
    tone: 'dim',
  },
];

/** Plain-text transcript, read by screen readers instead of the typing. */
const TRANSCRIPT = SESSION.map((e) =>
  e.kind === 'cmd' ? `$ ${e.text}` : e.kind === 'out' ? e.text : ''
).join('\n');

const TONE = {
  base: 'text-[#D7E2EA]',
  dim: 'text-[#D7E2EA]/50',
  accent: ACCENT,
} as const;

export default function TerminalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const [typing, setTyping] = useState('');
  // Skipping has to stop the running loop, otherwise it keeps calling
  // setRevealed with earlier indexes and rewinds the output.
  const skipped = useRef(false);
  const done = revealed >= SESSION.length;

  // Start once the panel is actually on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(SESSION.length);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Type the commands, dump the output, like a real session.
  useEffect(() => {
    if (!started) return;
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    (async () => {
      for (let i = 0; i < SESSION.length; i++) {
        const entry = SESSION[i];
        if (cancelled || skipped.current) return;

        if (entry.kind === 'cmd') {
          for (let c = 1; c <= entry.text.length; c++) {
            if (cancelled || skipped.current) return;
            setTyping(entry.text.slice(0, c));
            await wait(24);
          }
          if (cancelled || skipped.current) return;
          setTyping('');
          setRevealed(i + 1);
          await wait(240);
        } else {
          setRevealed(i + 1);
          await wait(entry.kind === 'gap' ? 120 : 55);
        }
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [started]);

  // Follow the output as it prints.
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [revealed, typing]);

  const skip = () => {
    skipped.current = true;
    setTyping('');
    setRevealed(SESSION.length);
  };

  const current = SESSION[revealed];

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 px-5 sm:px-8 md:px-10"
    >
      <div className="max-w-3xl mx-auto overflow-hidden rounded-xl border border-white/15 bg-white/[0.03] shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
        {/* Title bar */}
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </span>
          <p className="font-mono text-[#D7E2EA]/40 text-[11px] truncate">
            allen@portfolio ~ %
          </p>
          {started && !done && (
            <button
              type="button"
              onClick={skip}
              className="ml-auto font-mono text-[#D7E2EA]/40 text-[11px] uppercase tracking-wide transition-opacity hover:opacity-70"
            >
              skip
            </button>
          )}
        </div>

        {/* Output */}
        <div
          ref={bodyRef}
          aria-hidden="true"
          className="font-mono text-[11px] sm:text-xs md:text-[13px] leading-relaxed px-4 sm:px-6 py-5 min-h-[560px] md:min-h-[580px] max-h-[86vh] overflow-y-auto"
        >
          {SESSION.slice(0, revealed).map((entry, i) =>
            entry.kind === 'gap' ? (
              <div key={i} className="h-4" />
            ) : entry.kind === 'cmd' ? (
              <p key={i} className="whitespace-pre-wrap break-words">
                <span className={ACCENT}>$ </span>
                <span className="text-[#D7E2EA]">{entry.text}</span>
              </p>
            ) : (
              <p
                key={i}
                className={`whitespace-pre-wrap break-words ${TONE[entry.tone ?? 'base']}`}
              >
                {entry.text}
              </p>
            )
          )}

          {/* The line being typed right now */}
          {!done && current?.kind === 'cmd' && (
            <p className="whitespace-pre-wrap break-words">
              <span className={ACCENT}>$ </span>
              <span className="text-[#D7E2EA]">{typing}</span>
              <span className="terminal-cursor text-[#D7E2EA]">▊</span>
            </p>
          )}

          {/* Resting prompt once the session finishes */}
          {done && (
            <p className="mt-4 whitespace-pre-wrap">
              <span className={ACCENT}>$ </span>
              <span className="terminal-cursor text-[#D7E2EA]">▊</span>
            </p>
          )}
        </div>
      </div>

      <p className="sr-only">{TRANSCRIPT}</p>
    </section>
  );
}
