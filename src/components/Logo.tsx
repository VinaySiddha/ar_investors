/**
 * Official AR Investor's Brand Logo
 * Based on official brand guidelines sheet:
 * - 'header' / 'horizontal': Diamond emblem with AR monogram + wordmark + italic tagline
 * - 'full' / 'primary': 3D Diamond emblem above large AR Investor's with corridor flourish
 * - 'icon': Diamond emblem with AR monogram
 */

interface LogoProps {
  variant?: 'header' | 'full' | 'icon';
  className?: string;
  showTagline?: boolean;
}

export function Logo({ variant = 'header', className = '', showTagline = true }: LogoProps) {
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {/* 3D Faceted Diamond */}
        <Diamond3DSVG size={76} />

        {/* Wordmark in Plus Jakarta Sans */}
        <div className="mt-3">
          <h1
            className="font-serif text-3xl sm:text-4xl font-bold tracking-[0.08em] leading-tight"
            style={{
              background: 'linear-gradient(135deg, #FFF0B8 0%, #D4AF62 45%, #F8DF87 70%, #B08D57 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 25px rgba(212,175,98,0.3)',
            }}
          >
            AR Investor's
          </h1>

          {/* Italic Tagline */}
          <p
            className="font-serif italic text-sm sm:text-base tracking-wide mt-1"
            style={{ color: '#D4AF62' }}
          >
            We Invest Where Others See Risk
          </p>

          {/* Decorative Flourish Divider with Corridors */}
          <div className="flex items-center justify-center gap-3 mt-3 text-[11px] sm:text-xs font-sans font-medium tracking-[0.25em] text-[#A39B8B] uppercase">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#B08D57]" />
            <span className="text-[#D4AF62]">◆</span>
            <span>Qatar · Oman · India · Russia</span>
            <span className="text-[#D4AF62]">◆</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#B08D57]" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'icon') {
    return <DiamondEmblemSVG size={42} className={className} />;
  }

  // Horizontal Logo (for website header / navigation)
  return (
    <a
      href="#home"
      className={`flex items-center gap-3 sm:gap-3.5 group focus-visible:outline-none select-none ${className}`}
      aria-label="AR Investor's — Home"
    >
      <DiamondEmblemSVG size={38} />
      <div className="flex flex-col text-left">
        <span
          className="font-serif text-lg sm:text-xl font-bold tracking-[0.05em] leading-tight transition-colors duration-200"
          style={{
            background: 'linear-gradient(90deg, #FFF0B8 0%, #D4AF62 60%, #F8DF87 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          AR Investor's
        </span>
        {showTagline && (
          <span
            className="font-serif italic text-[10px] sm:text-[11px] tracking-wider text-[#D4AF62]/90 hidden sm:inline"
          >
            We Invest Where Others See Risk
          </span>
        )}
      </div>
    </a>
  );
}

/** 3D Faceted Diamond as shown in the Brand Guidelines */
export function Diamond3DSVG({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id="facet-light" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF0B8" />
          <stop offset="100%" stopColor="#F8DF87" />
        </linearGradient>
        <linearGradient id="facet-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8DF87" />
          <stop offset="50%" stopColor="#D4AF62" />
          <stop offset="100%" stopColor="#B08D57" />
        </linearGradient>
        <linearGradient id="facet-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B08D57" />
          <stop offset="100%" stopColor="#8C6429" />
        </linearGradient>
        <filter id="gold-shine">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#gold-shine)">
        {/* Table (Top central facet) */}
        <polygon points="26,6 74,6 88,32 12,32" fill="url(#facet-light)" />

        {/* Crown Facets */}
        <polygon points="26,6 50,6 38,32" fill="#FFF0B8" opacity="0.9" />
        <polygon points="50,6 74,6 62,32" fill="#F8DF87" opacity="0.85" />
        <polygon points="12,32 26,6 38,32" fill="url(#facet-gold)" />
        <polygon points="74,6 88,32 62,32" fill="url(#facet-dark)" />
        <polygon points="38,32 50,6 62,32" fill="url(#facet-light)" />

        {/* Girdle Line (Border) */}
        <line x1="12" y1="32" x2="88" y2="32" stroke="#FFF0B8" strokeWidth="0.8" opacity="0.6" />

        {/* Pavilion (Lower triangular facets converging at bottom culet) */}
        <polygon points="12,32 50,82 38,32" fill="url(#facet-dark)" opacity="0.95" />
        <polygon points="38,32 50,82 50,32" fill="url(#facet-gold)" />
        <polygon points="50,32 50,82 62,32" fill="url(#facet-light)" opacity="0.85" />
        <polygon points="62,32 50,82 88,32" fill="url(#facet-dark)" opacity="0.85" />
      </g>
    </svg>
  );
}

/** Official Hexagonal / Diamond Emblem with AR Monogram inside */
export function DiamondEmblemSVG({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id="emblem-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF0B8" />
          <stop offset="35%" stopColor="#D4AF62" />
          <stop offset="70%" stopColor="#F8DF87" />
          <stop offset="100%" stopColor="#B08D57" />
        </linearGradient>
      </defs>

      {/* Diamond outer frame */}
      <polygon
        points="50,6 94,50 50,94 6,50"
        fill="#050505"
        stroke="url(#emblem-gold)"
        strokeWidth="2.5"
      />

      {/* Inner geometric facet lines */}
      <polygon
        points="50,14 86,50 50,86 14,50"
        fill="none"
        stroke="url(#emblem-gold)"
        strokeWidth="1"
        opacity="0.6"
      />
      <line x1="50" y1="6" x2="50" y2="25" stroke="url(#emblem-gold)" strokeWidth="1" opacity="0.7" />
      <line x1="50" y1="75" x2="50" y2="94" stroke="url(#emblem-gold)" strokeWidth="1" opacity="0.7" />
      <line x1="6" y1="50" x2="25" y2="50" stroke="url(#emblem-gold)" strokeWidth="1" opacity="0.7" />
      <line x1="75" y1="50" x2="94" y2="50" stroke="url(#emblem-gold)" strokeWidth="1" opacity="0.7" />

      {/* Monogram AR in Plus Jakarta Sans */}
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontSize="24"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontWeight="800"
        letterSpacing="1"
        fill="url(#emblem-gold)"
      >
        AR
      </text>
    </svg>
  );
}

