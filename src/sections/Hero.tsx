import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/Container';
import { hero } from '@/config/site.config';
import { scrollToSection } from '@/utils/helpers';
import type { GlobeConfig, Position } from '@/components/ui/globe';

// Lazy-load 3D WebGL Globe so Three.js / three-globe are only evaluated on the client
const World = lazy(() =>
  import('@/components/ui/globe').then((m) => ({ default: m.World }))
);

/** Animation helper for staggered fade-up effects */
function fadeUpAt(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, ease: 'easeOut' as const, delay },
  };
}

const credentials = [
  { label: 'Headquarters', value: 'Msheireb Downtown, Doha' },
  { label: 'Strategic Corridors', value: 'GCC · South Asia · Eurasia' },
  { label: 'Specialization', value: 'Turnaround & Maritime Assets' },
];

/** AR Investor's Deep Black & Sovereign Gold Globe Configuration */
const globeConfig: GlobeConfig = {
  pointSize: 3,
  globeColor: '#050505',
  showAtmosphere: true,
  atmosphereColor: '#D4AF37',
  atmosphereAltitude: 0.14,
  emissive: '#090909',
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: 'rgba(212, 175, 55, 0.65)',
  ambientLight: '#D4AF37',
  directionalLeftLight: '#FFFFFF',
  directionalTopLight: '#F5E3A1',
  pointLight: '#D4AF37',
  arcTime: 1400,
  arcLength: 0.85,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 25.2867, lng: 51.5333 }, // Centered on Doha, Qatar
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

/** Strategic global transaction and maritime corridors */
const globalArcs: Position[] = [
  // ── Core Corridors: Qatar, Oman, India, Russia ──
  {
    order: 1,
    startLat: 25.2867,
    startLng: 51.5333, // Doha, Qatar
    endLat: 23.588,
    endLng: 58.3829, // Muscat, Oman
    arcAlt: 0.15,
    color: '#D4AF37',
  },
  {
    order: 1,
    startLat: 25.2867,
    startLng: 51.5333, // Doha, Qatar
    endLat: 19.076,
    endLng: 72.8777, // Mumbai, India
    arcAlt: 0.25,
    color: '#F5E3A1',
  },
  {
    order: 2,
    startLat: 25.2867,
    startLng: 51.5333, // Doha, Qatar
    endLat: 55.7558,
    endLng: 37.6173, // Moscow, Russia
    arcAlt: 0.35,
    color: '#C5A059',
  },
  {
    order: 2,
    startLat: 19.076,
    startLng: 72.8777, // Mumbai, India
    endLat: 23.588,
    endLng: 58.3829, // Muscat, Oman
    arcAlt: 0.2,
    color: '#E8CF82',
  },
  {
    order: 3,
    startLat: 55.7558,
    startLng: 37.6173, // Moscow, Russia
    endLat: 28.6139,
    endLng: 77.209, // New Delhi, India
    arcAlt: 0.32,
    color: '#D4AF37',
  },
  // ── International Maritime & Financial Hubs ──
  {
    order: 3,
    startLat: 25.2867,
    startLng: 51.5333, // Doha, Qatar
    endLat: 51.5074,
    endLng: -0.1278, // London, UK
    arcAlt: 0.4,
    color: '#F5E3A1',
  },
  {
    order: 4,
    startLat: 25.2867,
    startLng: 51.5333, // Doha, Qatar
    endLat: 1.3521,
    endLng: 103.8198, // Singapore
    arcAlt: 0.38,
    color: '#D4AF37',
  },
  {
    order: 4,
    startLat: 51.5074,
    startLng: -0.1278, // London, UK
    endLat: 40.7128,
    endLng: -74.006, // New York, USA
    arcAlt: 0.42,
    color: '#C5A059',
  },
  {
    order: 5,
    startLat: 1.3521,
    startLng: 103.8198, // Singapore
    endLat: 35.6762,
    endLng: 139.6503, // Tokyo, Japan
    arcAlt: 0.28,
    color: '#F5E3A1',
  },
  {
    order: 5,
    startLat: 22.3193,
    startLng: 114.1694, // Hong Kong
    endLat: 25.2867,
    endLng: 51.5333, // Doha, Qatar
    arcAlt: 0.45,
    color: '#D4AF37',
  },
  {
    order: 6,
    startLat: -33.8688,
    startLng: 151.2093, // Sydney, Australia
    endLat: 1.3521,
    endLng: 103.8198, // Singapore
    arcAlt: 0.4,
    color: '#E8CF82',
  },
  {
    order: 6,
    startLat: 48.8566,
    startLng: 2.3522, // Paris
    endLat: 25.2867,
    endLng: 51.5333, // Doha
    arcAlt: 0.3,
    color: '#C5A059',
  },
];

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-[100svh] flex flex-col items-center justify-start bg-[#050505] text-[#F7F4EA] overflow-hidden pt-28 sm:pt-36 pb-16"
    >
      {/* ── 1. Modern Luminous Mesh Glow (Drifting Ambient Light Fields) ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Central Golden Sun Core */}
        <motion.div
          className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[750px] h-[550px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(212,175,55,0.22) 0%, rgba(184,134,11,0.1) 40%, transparent 75%)',
            filter: 'blur(95px)',
          }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.75, 0.95, 0.75],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Drifting Champagne Ambient Light */}
        <motion.div
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(253,240,205,0.08) 0%, rgba(212,175,55,0.04) 50%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Minimal Noise & Sparkle */}
        <div className="absolute inset-0 gold-dust opacity-35" />
      </div>

      <Container className="relative z-10 text-center flex flex-col items-center">
        {/* ── Official Prestige Eyebrow Pill ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 sm:mb-7"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full backdrop-blur-md bg-[#171717]/80 border border-[#B08D57]/40 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F8DF87] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF62]" />
            </span>
            <span className="text-[11px] sm:text-xs font-sans font-semibold uppercase tracking-[0.24em] text-[#FFF0B8]">
              Private Equity & Strategic Advisory · Doha, Qatar
            </span>
          </div>
        </motion.div>

        {/* ── Plus Jakarta Sans Bold Main Headline ── */}
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-center tracking-tight max-w-4xl mx-auto leading-[1.08]"
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #FFFFFF 15%, #F8DF87 50%, #D4AF62 75%, #B08D57 100%)',
              filter: 'drop-shadow(0 4px 30px rgba(212,175,98,0.3))',
            }}
          >
            We Invest <br /> Where Others See Risk
          </span>
        </motion.h1>

        {/* ── Official Corridor Line ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex items-center justify-center gap-3 mt-4 text-xs sm:text-sm font-sans font-medium tracking-[0.25em] text-[#A39B8B] uppercase"
        >
          <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-[#B08D57]" />
          <span className="text-[#D4AF62]">◆</span>
          <span className="text-[#FFF0B8]">Qatar · Oman · India · Russia · Singapore · UK</span>
          <span className="text-[#D4AF62]">◆</span>
          <span className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-[#B08D57]" />
        </motion.div>

        {/* ── Core Service Pillars Badges ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-5 max-w-3xl"
          aria-label="Core investment pillars"
        >
          {hero.subheadlineItems.map((pillar) => (
            <span
              key={pillar}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full backdrop-blur-md bg-[#171717]/80 border border-[#B08D57]/30 text-xs font-sans font-medium text-neutral-300 hover:border-[#D4AF62] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF62]" />
              {pillar}
            </span>
          ))}
        </motion.div>

        {/* ── Concise Firm Description ── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm sm:text-base md:text-lg font-sans font-normal text-neutral-300 max-w-2xl mt-5 mx-auto leading-relaxed"
        >
          A premium, global, and trustworthy investment brand focused on high-potential markets. We deploy strategic capital, operational turnaround expertise, and cross-border advisory across GCC, South Asia, and Eurasia.
        </motion.p>

        {/* ── Official Glowing Bottom-Accent CTA Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4 z-20 relative"
        >
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3.5 backdrop-blur-md border bg-[#D4AF62]/15 border-[#D4AF62]/40 text-white mx-auto text-center rounded-full relative group hover:bg-[#D4AF62]/25 transition-all duration-300 shadow-[0_0_25px_rgba(212,175,98,0.25)] cursor-pointer"
          >
            <span className="text-sm font-sans font-semibold tracking-wide flex items-center gap-2 text-[#FFF0B8]">
              Explore Opportunities <span>→</span>
            </span>
            <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-[#D4AF62] to-transparent" />
          </button>

          <button
            onClick={() => scrollToSection('services')}
            className="px-7 py-3.5 backdrop-blur-md border bg-[#171717]/60 border-white/15 text-neutral-300 hover:text-white hover:border-[#D4AF62]/40 hover:bg-[#171717] mx-auto text-center rounded-full relative transition-all duration-300 cursor-pointer text-sm font-sans font-medium"
          >
            Our Service Lines
          </button>
        </motion.div>
      </Container>

      {/* ── 3D Interactive World Globe (3D Corridors) ── */}
      <motion.div
        {...fadeUpAt(0.7)}
        className="relative w-full max-w-6xl mx-auto mt-6 sm:mt-10 h-[400px] sm:h-[520px] md:h-[640px] flex items-center justify-center z-10"
      >
        {/* Subtle radial glow underneath globe */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 60%, rgba(212,175,55,0.14) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* ThreeJS Globe Container */}
        <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
          {mounted && (
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full border border-gold/20 animate-pulse" />
                </div>
              }
            >
              <World data={globalArcs} globeConfig={globeConfig} />
            </Suspense>
          )}
        </div>

        {/* Smooth bottom gradient blend to seamless deep black */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none select-none z-10"
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Executive Credential Strip ── */}
      <Container className="relative z-20 text-center flex flex-col items-center -mt-6 sm:-mt-10">
        <motion.div
          {...fadeUpAt(0.9)}
          className="w-full max-w-4xl rounded-3xl backdrop-blur-2xl bg-[#0A0A0A]/85 border border-[#B08D57]/30 p-5 sm:p-6 shadow-[0_16px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(253,240,205,0.18)]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 divide-y sm:divide-y-0 sm:divide-x divide-[#B08D57]/20 text-center">
            {credentials.map((cred) => (
              <div key={cred.label} className="pt-3 sm:pt-0 sm:px-4 first:pt-0">
                <p className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.24em] text-[#D4AF62]">
                  {cred.label}
                </p>
                <p className="mt-1 text-xs sm:text-sm font-sans font-semibold text-[#E8E2D2]">
                  {cred.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Minimalist Scroll Indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-[10px] font-sans font-semibold tracking-[0.28em] uppercase text-[#A39B8B]/70">
            Scroll to Discover
          </span>
          <div className="relative w-px h-8 bg-[#D4AF62]/20 overflow-hidden">
            <motion.div
              className="w-full h-3 bg-gradient-to-b from-transparent via-[#D4AF62] to-transparent"
              animate={{ y: [0, 32] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
