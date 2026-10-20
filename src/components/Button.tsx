import { forwardRef } from 'react';
import { scrollToSection } from '@/utils/helpers';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  scrollTo?: string;
  external?: boolean;
  children: React.ReactNode;
}

// ─── Size tokens ──────────────────────────────────────────────────────────────
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

/**
 * Ripple orb that expands from the centre on hover.
 * Colour is driven by the variant so the fill always contrasts nicely.
 */
function RippleOrb({ variant }: { variant: ButtonVariant }) {
  const orbColor: Record<ButtonVariant, string> = {
    // primary button has gold bg → orb fills with near-black so text flips to gold
    primary: 'bg-bg',
    // outline button has transparent bg → orb fills with gold
    outline: 'bg-gold',
    // ghost button → orb fills with gold/20
    ghost: 'bg-gold/20',
  };

  return (
    <span
      aria-hidden="true"
      className={[
        'absolute left-1/2 top-full',
        '-translate-x-1/2 -translate-y-1/2',
        'w-8 h-8 rounded-full',
        'scale-0 group-hover:scale-[18]',
        'transition-transform duration-700 ease-in-out',
        orbColor[variant],
      ].join(' ')}
    />
  );
}

// ─── Per-variant wrapper classes (border / ring / base bg) ────────────────────
const variantWrapper: Record<ButtonVariant, string> = {
  primary: [
    'bg-gold-gradient border border-transparent',
    'focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
    'shadow-sm hover:shadow-gold-glow',
  ].join(' '),
  outline: [
    'bg-transparent border border-border-gold',
    'hover:border-gold hover:shadow-gold-glow',
    'focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
  ].join(' '),
  ghost: [
    'bg-transparent border border-transparent',
    'focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
  ].join(' '),
};

/**
 * Text node – sits above the orb (z-10) and shifts colour on hover
 * so it always reads clearly against the expanding fill.
 */
function LabelSpan({
  variant,
  children,
}: {
  variant: ButtonVariant;
  children: React.ReactNode;
}) {
  const textTransition: Record<ButtonVariant, string> = {
    // gold bg → after orb fills with dark → keep text dark (bg-coloured)
    primary: 'text-bg font-serif font-bold group-hover:text-gold',
    // transparent → after orb fills with gold → flip to dark
    outline: 'text-gold-light font-serif font-bold group-hover:text-bg',
    ghost: 'text-gold font-serif font-bold group-hover:text-gold-light',
  };

  return (
    <span
      className={[
        'relative z-10 font-serif font-bold',
        'transition-colors duration-500',
        textTransition[variant],
        // Carry child flex items (icon + text) through
        'inline-flex items-center gap-2',
      ].join(' ')}
    >
      {children}
    </span>
  );
}

// ─── Base shell shared by <button> and <a> ────────────────────────────────────
const baseShell =
  'relative overflow-hidden group ' +
  'inline-flex items-center justify-center ' +
  'rounded-full font-serif font-bold tracking-wider uppercase ' +
  'cursor-pointer select-none ' +
  'transition-all duration-300 ';

// ─── Public component ─────────────────────────────────────────────────────────
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      href,
      scrollTo,
      external,
      children,
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    const classes = [
      baseShell,
      sizeClasses[size],
      variantWrapper[variant],
      className,
    ].join(' ');

    const inner = (
      <>
        <RippleOrb variant={variant} />
        <LabelSpan variant={variant}>{children}</LabelSpan>
      </>
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (scrollTo) scrollToSection(scrollTo);
      onClick?.(e);
    };

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {inner}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} onClick={handleClick} {...props}>
        {inner}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
