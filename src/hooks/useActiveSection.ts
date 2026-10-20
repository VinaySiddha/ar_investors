import { useState, useEffect, useRef } from 'react';

/**
 * Returns the id of the section currently most visible in the viewport.
 * Uses IntersectionObserver for performance — no scroll listeners needed.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const ratios = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });

        let maxRatio = 0;
        let mostVisible = sectionIds[0] ?? '';
        ratios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisible = id;
          }
        });

        setActiveSection(mostVisible);
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: '-80px 0px -20% 0px',
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [sectionIds.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps

  return activeSection;
}
