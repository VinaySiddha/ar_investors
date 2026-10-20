/**
 * Inline SVG Diamond Logo
 * Two variants: 'header' (compact with AR monogram) and 'full' (diamond above wordmark).
 */

interface LogoProps {
  variant?: 'header' | 'full';
  className?: string;
}

export function Logo({ variant = 'header', className = '' }: LogoProps) {
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <DiamondSVG size={72} />
        <div className="text-center">
          <p
            className="font-serif text-3xl font-bold tracking-[0.15em] text-gold-light leading-none"
            style={{ textShadow: '0 0 30px rgba(212,175,55,0.4)' }}
          >
            AR Investor's
          </p>
          <p className="text-muted font-serif font-bold text-xs tracking-[0.3em] uppercase mt-1">
            Doha · Qatar
          </p>
        </div>
      </div>
    );
  }

  return (
    <a
      href="#home"
      className={`flex items-center gap-3 group focus-visible:outline-none ${className}`}
      aria-label="AR Investor's — Home"
    >
      <DiamondSVG size={36} />
      <span
        className="font-serif text-xl font-bold tracking-wider text-gold-light group-hover:text-gold transition-colors duration-200"
        aria-hidden="true"
      >
        AR Investor's
      </span>
    </a>
  );
}

function DiamondSVG({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id="diamond-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E3A1" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9C7A1E" />
        </linearGradient>
        <linearGradient id="diamond-face" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5E3A1" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#C9A646" stopOpacity="0.7" />
        </linearGradient>
        <filter id="diamond-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#diamond-glow)">
        {/* Crown facets */}
        <polygon points="50,8 72,32 50,38 28,32" fill="url(#diamond-grad)" />
        <polygon points="50,8 72,32 85,28" fill="#C9A646" opacity="0.6" />
        <polygon points="50,8 28,32 15,28" fill="#F5E3A1" opacity="0.8" />
        {/* Girdle */}
        <polygon points="15,28 28,32 50,38 72,32 85,28 92,48 50,95 8,48" fill="url(#diamond-face)" />
        {/* Pavilion facets */}
        <polygon points="50,38 8,48 28,32" fill="#D4AF37" opacity="0.5" />
        <polygon points="50,38 92,48 72,32" fill="#9C7A1E" opacity="0.6" />
        <polygon points="50,38 8,48 50,95" fill="#C9A646" opacity="0.4" />
        <polygon points="50,38 92,48 50,95" fill="#9C7A1E" opacity="0.5" />
        {/* AR Monogram */}
        <text
          x="50"
          y="62"
          textAnchor="middle"
          fontSize="18"
          fontFamily="Poppins, sans-serif"
          fontWeight="700"
          fill="#0B0B0B"
          letterSpacing="1"
        >
          AR
        </text>
      </g>
    </svg>
  );
}
