import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Routers keep the window scroll position across navigations, which would drop
 * you halfway down a freshly-opened detail page. Reset on every path change.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
