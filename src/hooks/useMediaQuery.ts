import { useEffect, useState } from 'react';

/**
 * Subscribes to a CSS media query.
 *
 * Used to genuinely branch behaviour (not just styling) at a breakpoint —
 * e.g. the project cards drop their sticky/scroll-linked stacking below `md`
 * rather than merely hiding it with CSS.
 */
export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
