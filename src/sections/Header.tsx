import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/Logo';
import { buildWhatsAppUrl } from '@/config/site.config';
import { useScrolled } from '@/hooks/useScrolled';
import { scrollToSection } from '@/utils/helpers';

const navLinks = [
  { label: 'Overview', anchor: 'home' },
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
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const scrolled = useScrolled(40);

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
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (anchor: string) => {
    setMenuOpen(false);
    scrollToSection(anchor);
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none transition-all duration-300"
      role="banner"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* ── Left: Brand Identity Glass Pill ── */}
        <div
          className={[
            'pointer-events-auto flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all duration-300',
            'backdrop-blur-xl border',
            scrolled
              ? 'bg-[#050505]/90 border-[#B08D57]/45 shadow-[0_8px_32px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,240,184,0.25)]'
              : 'bg-[#171717]/80 border-[#B08D57]/30 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:border-[#D4AF62]/50',
          ].join(' ')}
        >
          <Logo variant="header" />
        </div>

        {/* ── Center: Floating Glass Bubble Navigation Island ── */}
        <nav
          className={[
            'pointer-events-auto hidden md:flex items-center gap-1 p-1.5 rounded-full transition-all duration-300',
            'backdrop-blur-xl border relative shadow-[0_12px_40px_rgba(0,0,0,0.6)]',
            scrolled
              ? 'bg-[#050505]/90 border-[#B08D57]/40 shadow-[0_12px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,240,184,0.2)]'
              : 'bg-[#171717]/80 border-[#B08D57]/25 hover:border-[#B08D57]/50',
          ].join(' ')}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.anchor;
            const isHovered = hoveredNav === link.anchor;

            return (
              <button
                key={link.anchor}
                onClick={() => handleNavClick(link.anchor)}
                onMouseEnter={() => setHoveredNav(link.anchor)}
                onMouseLeave={() => setHoveredNav(null)}
                className={[
                  'relative px-4 py-2 rounded-full text-xs font-serif font-bold uppercase tracking-widest transition-colors duration-200 select-none cursor-pointer',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
                  isActive ? 'text-gold-light' : 'text-muted hover:text-text',
                ].join(' ')}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Active Sliding Glass Bubble */}
                {isActive && (
                  <motion.div
                    layoutId="activeBubble"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-gold/25 via-gold/15 to-gold/25 border border-gold/40 shadow-[0_0_18px_rgba(212,175,55,0.25),inset_0_1px_1px_rgba(245,227,161,0.35)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}

                {/* Hover Glass Pill Preview (when not active) */}
                {!isActive && isHovered && (
                  <motion.div
                    layoutId="hoverBubble"
                    className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-1.5">
                  {link.label}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_#D4AF37]" />
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        {/* ── Right: Executive Actions & Advisory Glass Bubble ── */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          {/* Direct Consultation / Advisory CTA */}
          <button
            onClick={() => handleNavClick('contact')}
            className={[
              'hidden sm:inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs font-serif font-bold uppercase tracking-widest cursor-pointer select-none transition-all duration-300',
              'backdrop-blur-xl border border-gold/40 text-gold-light hover:text-white',
              'bg-gradient-to-r from-[#1E190D]/90 via-[#2A2312]/85 to-[#1E190D]/90 hover:from-gold hover:to-[#9C7A1E] hover:text-[#0B0B0B]',
              'shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(245,227,161,0.25)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
            ].join(' ')}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
            <span>Consultation</span>
          </button>

          {/* WhatsApp Direct Line Glass Bubble */}
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Direct Advisory via WhatsApp"
            className={[
              'hidden lg:flex items-center gap-2 px-3.5 py-2 sm:py-2.5 rounded-full text-xs font-serif font-bold tracking-wider transition-all duration-300',
              'backdrop-blur-xl border border-[#25D366]/40 text-white bg-[#0E1C12]/80 hover:bg-[#25D366] hover:text-white',
              'shadow-[0_4px_16px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(37,211,102,0.25)] hover:shadow-[0_0_20px_rgba(37,211,102,0.4)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]',
            ].join(' ')}
          >
            <WhatsAppIconSmall />
            <span>Advisory Desk</span>
          </a>

          {/* Mobile Glass Menu Trigger Button */}
          <button
            className={[
              'md:hidden flex items-center justify-center w-11 h-11 rounded-full cursor-pointer transition-all duration-300',
              'backdrop-blur-xl border border-gold/30 bg-[#121212]/80 text-gold-light',
              'shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(245,227,161,0.2)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
            ].join(' ')}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <div className="flex flex-col gap-1.5 items-center justify-center w-5">
              <span
                className={`block h-0.5 w-5 bg-gold-light transition-all duration-300 origin-center ${
                  menuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-3.5 bg-gold-light self-end transition-all duration-300 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-gold-light transition-all duration-300 origin-center ${
                  menuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ── Mobile Glass Drawer Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="md:hidden pointer-events-auto mt-3 mx-auto w-full max-w-md rounded-3xl backdrop-blur-2xl bg-[#0D0D0D]/95 border border-gold/30 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(245,227,161,0.25)] flex flex-col gap-6"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Header info inside drawer */}
            <div className="flex items-center justify-between border-b border-border-gold/20 pb-4">
              <div>
                <p className="text-xs font-serif font-bold tracking-[0.25em] text-gold uppercase">
                  Advisory Navigation
                </p>
                <p className="text-muted text-xs mt-0.5">Doha · Qatar Headquarters</p>
              </div>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-serif font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Desk
              </span>
            </div>

            {/* Navigation Bubbles List */}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.anchor;
                return (
                  <motion.button
                    key={link.anchor}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link.anchor)}
                    className={[
                      'flex items-center justify-between px-4 py-3 rounded-2xl text-left font-serif font-bold tracking-wider text-base transition-all duration-200',
                      isActive
                        ? 'bg-gradient-to-r from-gold/25 via-gold/15 to-transparent border border-gold/40 text-gold-light shadow-[inset_0_1px_1px_rgba(245,227,161,0.3)]'
                        : 'text-muted hover:text-text hover:bg-white/[0.04]',
                    ].join(' ')}
                  >
                    <span>{link.label}</span>
                    {isActive ? (
                      <span className="text-xs uppercase tracking-widest text-gold font-normal">
                        Active •
                      </span>
                    ) : (
                      <span className="text-muted/40 text-sm">→</span>
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* Business Contact Actions in Drawer */}
            <div className="pt-2 border-t border-border-gold/20 flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-serif font-bold uppercase tracking-widest bg-gold-gradient text-[#0B0B0B] shadow-[0_0_20px_rgba(212,175,55,0.35)] cursor-pointer"
              >
                Schedule Consultation
              </button>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-serif font-bold tracking-wider border border-[#25D366]/40 text-white bg-[#25D366]/20 hover:bg-[#25D366]/30 transition-colors"
              >
                <WhatsAppIconSmall />
                Connect on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function WhatsAppIconSmall() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
