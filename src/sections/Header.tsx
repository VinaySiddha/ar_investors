import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { buildWhatsAppUrl } from '@/config/site.config';
import { useScrolled } from '@/hooks/useScrolled';
import { scrollToSection } from '@/utils/helpers';

const navLinks = [
  { label: 'Home', anchor: 'home' },
  { label: 'About', anchor: 'about' },
  { label: 'Services', anchor: 'services' },
  { label: 'Portfolio', anchor: 'portfolio' },
  { label: 'Contact', anchor: 'contact' },
];

interface HeaderProps {
  activeSection: string;
}

export function Header({ activeSection }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(60);

  // Close menu on resize (desktop)
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (anchor: string) => {
    setMenuOpen(false);
    scrollToSection(anchor);
  };

  return (
    <header
      className={[
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-bg/95 backdrop-blur-md border-b border-border-gold/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent',
      ].join(' ')}
      role="banner"
    >
      <Container>
        <nav
          className="flex items-center justify-between h-16 sm:h-20"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Logo variant="header" />

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.anchor}>
                <button
                  onClick={() => handleNavClick(link.anchor)}
                  className={[
                    'text-sm font-serif font-bold tracking-widest uppercase transition-colors duration-200',
                    'relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm',
                    activeSection === link.anchor
                      ? 'text-gold'
                      : 'text-muted hover:text-gold-light',
                  ].join(' ')}
                  aria-current={activeSection === link.anchor ? 'page' : undefined}
                >
                  {link.label}
                  {activeSection === link.anchor && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 inset-x-0 h-px bg-gold-gradient"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* WhatsApp CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              href={buildWhatsAppUrl()}
              external
              variant="primary"
              size="sm"
              className="rounded-full gap-2"
            >
              <WhatsAppIconSmall />
              WhatsApp
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block h-px w-6 bg-gold-light transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}
            />
            <span
              className={`block h-px w-6 bg-gold-light transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-px w-6 bg-gold-light transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}
            />
          </button>
        </nav>
      </Container>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-16 bg-bg/98 backdrop-blur-xl z-40 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col p-8 gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.anchor}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleNavClick(link.anchor)}
                  className={[
                    'text-left text-2xl font-serif font-bold tracking-wider',
                    'border-b border-border-gold/20 pb-4',
                    'transition-colors duration-200',
                    activeSection === link.anchor ? 'text-gold' : 'text-muted hover:text-gold-light',
                  ].join(' ')}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="pt-4"
              >
                <Button
                  href={buildWhatsAppUrl()}
                  external
                  variant="primary"
                  size="lg"
                  className="w-full rounded-full justify-center gap-2"
                >
                  <WhatsAppIconSmall />
                  Chat on WhatsApp
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function WhatsAppIconSmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
