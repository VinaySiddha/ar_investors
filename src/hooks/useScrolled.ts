import { useState, useEffect } from 'react';

/**
 * Returns true when the user has scrolled past `threshold` pixels.
 */
export function useScrolled(threshold = 60): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    handler(); // check initial state
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);

  return scrolled;
}
