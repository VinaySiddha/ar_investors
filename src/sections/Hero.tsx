import { motion } from 'framer-motion';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { hero } from '@/config/site.config';

/** Creates a simple fade-up animation object for a given delay. */
function fadeUpAt(delay: number) {
  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: 'easeOut' as const, delay },
  };
}

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex flex-col items-center justify-center hero-texture gold-dust overflow-hidden"
    >
      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 30%, rgba(11,11,11,0.7) 100%)',
        }}
      />

      {/* Animated background geometric rings */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-gold/5"
            style={{
              width: `${200 + i * 120}px`,
              height: `${200 + i * 120}px`,
              borderRadius: '4px',
              top: '50%',
              left: '50%',
              translateX: '-50%',
              translateY: '-50%',
              rotate: 45 + i * 5,
            }}
            animate={{ rotate: 45 + i * 5 + 360 }}
            transition={{
              duration: 40 + i * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <Container className="relative z-10 pt-28 pb-20 text-center">
        {/* Full logo mark */}
        <motion.div
          {...fadeUpAt(0)}
          className="flex justify-center mb-10"
        >
          <Logo variant="full" />
        </motion.div>

        {/* H1 */}
        <motion.h1
          id="hero-heading"
          {...fadeUpAt(0.15)}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-gold-light max-w-4xl mx-auto"
          style={{ textShadow: '0 0 60px rgba(212,175,55,0.2)' }}
        >
          {hero.headline}
        </motion.h1>

        {/* Subheadline items */}
        <motion.div
          {...fadeUpAt(0.3)}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6"
          aria-label="Core services"
        >
          {hero.subheadlineItems.map((item, i) => (
            <span key={i}>
              <span className="text-sm sm:text-base text-gold font-serif font-bold tracking-wide">
                {item}
              </span>
              {i < hero.subheadlineItems.length - 1 && (
                <span className="text-border-gold mx-2 sm:mx-3" aria-hidden="true">•</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          {...fadeUpAt(0.45)}
          className="mt-6 text-muted text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          {hero.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUpAt(0.6)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          {hero.ctas.map((cta) => (
            <Button
              key={cta.label}
              variant={cta.variant}
              size="lg"
              scrollTo={cta.target.replace('#', '')}
            >
              {cta.label}
            </Button>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-xs text-muted uppercase tracking-[0.2em]">Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent"
            animate={{ scaleY: [1, 0.6, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </Container>
    </section>
  );
}
