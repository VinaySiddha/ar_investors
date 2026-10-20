import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { Card } from '@/components/Card';
import { ServiceIcon } from '@/components/ServiceIcon';
import { services } from '@/config/site.config';

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-20 lg:py-28 bg-bg relative"
    >
      {/* Subtle gold geometric background */}
      <div className="pointer-events-none absolute inset-0 section-texture" aria-hidden="true" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          ref={ref}
        >
          <SectionHeading
            id="services-heading"
            eyebrow="What We Do"
            title="Our Services"
            subtitle="Comprehensive investment and advisory solutions crafted for complex, high-growth markets."
            centered
          />
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card
                as="article"
                className="h-full flex flex-col gap-5 p-8 group"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-sm border border-border-gold/40 flex items-center justify-center bg-bg group-hover:border-gold/60 group-hover:shadow-gold-glow transition-all duration-300"
                  aria-hidden="true"
                >
                  <ServiceIcon name={service.icon} size={32} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-serif text-2xl font-bold text-gold-light mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{service.description}</p>
                </div>

                {/* Gold line bottom accent */}
                <div
                  className="h-px w-0 group-hover:w-full bg-gold-gradient transition-all duration-500"
                  aria-hidden="true"
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
