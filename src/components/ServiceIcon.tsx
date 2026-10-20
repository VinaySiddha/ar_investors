/**
 * Gold line-art icons for the Services section.
 * Each icon is an inline SVG with a 1.5px gold stroke and no fill.
 */

export type ServiceIconName =
  | 'investment'
  | 'development'
  | 'revival'
  | 'ship'
  | 'briefcase'
  | 'chart'
  | 'revive';

interface ServiceIconProps {
  name: ServiceIconName;
  size?: number;
  className?: string;
}

export function ServiceIcon({ name, size = 48, className = '' }: ServiceIconProps) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'url(#icon-gold)',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className,
  };

  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="icon-gold" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5E3A1" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9C7A1E" />
        </linearGradient>
      </defs>
      {icons[name]}
    </svg>
  );
}

const icons: Record<ServiceIconName, React.ReactNode> = {
  investment: (
    <>
      <rect x="6" y="28" width="8" height="13" rx="1" />
      <rect x="20" y="20" width="8" height="21" rx="1" />
      <rect x="34" y="12" width="8" height="29" rx="1" />
      <polyline points="8,14 20,8 34,4" />
      <polyline points="30,4 34,4 34,8" />
    </>
  ),
  briefcase: (
    <>
      <rect x="6" y="14" width="36" height="26" rx="4" />
      <path d="M18 14V10a4 4 0 014-4h4a4 4 0 014 4v4M6 26h36" />
    </>
  ),
  development: (
    <>
      <circle cx="24" cy="8" r="4" />
      <circle cx="8" cy="36" r="4" />
      <circle cx="40" cy="36" r="4" />
      <line x1="24" y1="12" x2="8" y2="32" />
      <line x1="24" y1="12" x2="40" y2="32" />
      <line x1="12" y1="36" x2="36" y2="36" />
      <circle cx="24" cy="24" r="3" />
    </>
  ),
  chart: (
    <>
      <line x1="6" y1="42" x2="42" y2="42" />
      <line x1="12" y1="34" x2="12" y2="24" />
      <line x1="22" y1="34" x2="22" y2="16" />
      <line x1="32" y1="34" x2="32" y2="16" />
      <polyline points="12,24 22,16 32,8 42,8" />
    </>
  ),
  revival: (
    <>
      <path d="M24 40 C12 30, 8 18, 18 12 C14 20, 20 24, 24 20 C28 24, 34 20, 30 12 C40 18, 36 30, 24 40Z" />
      <polyline points="24,20 24,8" />
      <polyline points="20,12 24,8 28,12" />
    </>
  ),
  revive: (
    <>
      <path d="M40 24a16 16 0 00-28-10L8 18M8 8v10h10M8 24a16 16 0 0028 10l4-4M40 40V30H30" />
    </>
  ),
  ship: (
    <>
      <path d="M8 32 L12 20 L36 20 L40 32 Z" />
      <line x1="24" y1="8" x2="24" y2="20" />
      <path d="M18 10 Q24 7 30 10" />
      <circle cx="24" cy="8" r="2" />
      <line x1="8" y1="38" x2="40" y2="38" />
      <path d="M16 32 Q24 40 32 32" />
      <path d="M34 26 A6 6 0 0 1 28 32" />
      <path d="M20 32 A6 6 0 0 1 14 26" />
    </>
  ),
};
