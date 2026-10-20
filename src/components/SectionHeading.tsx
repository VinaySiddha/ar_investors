interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

/**
 * Reusable section heading with optional eyebrow label and subtitle.
 * Renders an H2 by default for correct document outline.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  centered = false,
  className = '',
}: SectionHeadingProps) {
  const align = centered ? 'text-center' : 'text-left';

  return (
    <header className={`${align} ${className}`}>
      {eyebrow && (
        <p className="text-xs font-serif font-bold uppercase tracking-[0.3em] text-gold mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gold-light leading-tight"
        style={{ textShadow: '0 0 40px rgba(212,175,55,0.15)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted font-serif text-base sm:text-lg max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
      {/* Gold accent line */}
      <div
        className={`mt-5 h-px w-16 bg-gold-gradient ${centered ? 'mx-auto' : ''}`}
        aria-hidden="true"
      />
    </header>
  );
}
