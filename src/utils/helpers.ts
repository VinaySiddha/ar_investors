/**
 * Smooth-scrolls to a section by anchor id.
 * Falls back to document.querySelector for older browsers.
 */
export function scrollToSection(sectionId: string): void {
  const target = document.getElementById(sectionId.replace(/^#/, ''));
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Clamps a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Returns the current year as a string — used for the copyright line.
 */
export function currentYear(): string {
  return new Date().getFullYear().toString();
}

/**
 * Formats a phone number for display (kept as-is, already formatted in config).
 */
export function formatPhone(raw: string): string {
  return raw;
}
