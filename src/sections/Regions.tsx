import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/Container';
import { regions, regionsTagline } from '@/config/site.config';

/** Inline SVG country flags — no external requests */
function FlagIcon({ countryCode, size = 48 }: { countryCode: string; size?: number }) {
  const flags: Record<string, React.ReactNode> = {
    QA: (
      // Qatar: maroon with white serrated stripe
      <svg width={size} height={size * 0.6} viewBox="0 0 900 540" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="900" height="540" fill="#8D1B3D" />
        <polygon points="0,0 270,0 360,30 270,60 360,90 270,120 360,150 270,180 360,210 270,240 360,270 270,300 360,330 270,360 360,390 270,420 360,450 270,480 360,510 270,540 0,540" fill="#fff" />
      </svg>
    ),
    OM: (
      // Oman: red, white, green with emblem strip
      <svg width={size} height={size * 0.6} viewBox="0 0 900 540" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="900" height="540" fill="#fff" />
        <rect width="900" height="180" fill="#DB161B" />
        <rect y="360" width="900" height="180" fill="#008000" />
        <rect width="180" height="540" fill="#DB161B" />
        <text x="90" y="300" textAnchor="middle" fontSize="120" fill="#fff">⚔</text>
      </svg>
    ),
    IN: (
      // India: saffron, white (with Ashoka Chakra), India green
      <svg width={size} height={size * 0.6} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="900" height="200" fill="#FF9933" />
        <rect y="200" width="900" height="200" fill="#fff" />
        <rect y="400" width="900" height="200" fill="#138808" />
        <circle cx="450" cy="300" r="60" fill="none" stroke="#000080" strokeWidth="8" />
        <circle cx="450" cy="300" r="10" fill="#000080" />
      </svg>
    ),
    RU: (
      // Russia: white, blue, red
      <svg width={size} height={size * 0.6} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="900" height="200" fill="#fff" />
        <rect y="200" width="900" height="200" fill="#0039A6" />
        <rect y="400" width="900" height="200" fill="#D52B1E" />
      </svg>
    ),
  };

  return (
    <div
      className="overflow-hidden rounded-sm border border-border-gold/20 shadow-md"
      style={{ width: size, height: size * 0.6 }}
    >
      {flags[countryCode] ?? (
        <div className="w-full h-full bg-bg-elevated flex items-center justify-center text-muted text-xs">
          {countryCode}
        </div>
      )}
    </div>
  );
}

export function Regions() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });

  return (
    <section
      id="regions"
      aria-label="Operating regions"
      className="py-16 bg-bg border-y border-border-gold/20"
    >
      <Container>
        <motion.div
          ref={ref}
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-serif font-bold uppercase tracking-[0.3em] text-gold mb-2">
            Global Footprint
          </p>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-gold-light">{regionsTagline}</p>
          <div className="mt-4 h-px w-12 bg-gold-gradient mx-auto" aria-hidden="true" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 sm:gap-14">
          {regions.map((region, i) => (
            <motion.div
              key={region.countryCode}
              className="flex flex-col items-center gap-3 group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <div className="group-hover:shadow-gold-glow transition-shadow duration-300">
                <FlagIcon countryCode={region.countryCode} size={80} />
              </div>
              <p className="text-sm font-serif font-bold text-muted group-hover:text-gold-light transition-colors duration-200 uppercase tracking-widest">
                {region.name}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
