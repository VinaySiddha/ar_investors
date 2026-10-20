import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { about } from '@/config/site.config';

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });
  return { ref, isInView };
}

export function About() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 lg:py-28 bg-bg-elevated section-texture relative"
    >
      <Container>
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Heading + Story */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionHeading
                id="about-heading"
                eyebrow="Who We Are"
                title={about.heading}
                subtitle={about.subheading}
              />
            </motion.div>

            <div className="mt-8 space-y-4">
              {about.story.map((paragraph, i) => (
                <motion.p
                  key={i}
                  className="text-muted leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Mission statement */}
            <motion.blockquote
              className="mt-8 border-l-2 border-gold pl-6 text-gold-light font-serif text-xl font-bold italic"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <p>"{about.mission}"</p>
              <footer className="mt-2 text-sm text-muted not-italic font-serif font-bold uppercase tracking-wider">
                — Our Mission
              </footer>
            </motion.blockquote>
          </div>

          {/* Right: Stats grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 self-center">
            {about.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="group relative bg-bg border border-border-gold/30 rounded-sm p-6 sm:p-8 text-center hover:border-gold/60 transition-all duration-300 hover:shadow-gold-glow"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                {/* Background glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                <p
                  className="font-serif text-3xl sm:text-4xl font-bold text-gold-shimmer"
                  aria-label={`${stat.value} ${stat.label}`}
                >
                  {stat.value}
                </p>
                <p className="text-muted text-sm mt-2 font-serif font-bold uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
