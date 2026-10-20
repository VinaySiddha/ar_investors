import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { portfolio } from '@/config/site.config';

export function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="py-20 lg:py-28 bg-bg-elevated"
    >
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            id="portfolio-heading"
            eyebrow="Track Record"
            title="Selected Portfolio"
            subtitle="A snapshot of ventures we have backed, built, and transformed across our operating regions."
            centered
          />
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((item, i) => (
            <motion.article
              key={item.title}
              className="group relative bg-bg border border-border-gold/30 rounded-sm overflow-hidden card-gold-hover"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              aria-label={`${item.title} — ${item.sector} in ${item.country}`}
            >
              {/* Image / placeholder */}
              <div className="relative h-48 bg-bg overflow-hidden">
                <img
                  src={item.image}
                  alt={`${item.title} project — ${item.sector}, ${item.country}`}
                  width={400}
                  height={192}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                  onError={(e) => {
                    // Fallback pattern when image not found
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 40%, rgba(11,11,11,0.9) 100%)',
                  }}
                  aria-hidden="true"
                />
                {/* Country / sector badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-xs font-serif font-bold bg-bg/80 backdrop-blur-sm border border-border-gold/40 text-gold px-2 py-1 rounded-sm">
                    {item.country}
                  </span>
                  <span className="text-xs font-serif font-bold bg-bg/80 backdrop-blur-sm border border-border-gold/20 text-muted px-2 py-1 rounded-sm">
                    {item.sector}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-serif text-xl font-bold text-gold-light mb-2">
                  {item.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{item.description}</p>
              </div>

              {/* Hover bottom line */}
              <div
                className="absolute bottom-0 inset-x-0 h-px w-0 group-hover:w-full bg-gold-gradient transition-all duration-500"
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
