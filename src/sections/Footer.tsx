import { Container } from '@/components/Container';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/Button';
import { brand, contact, social, legal, buildWhatsAppUrl } from '@/config/site.config';
import { currentYear } from '@/utils/helpers';
import { scrollToSection } from '@/utils/helpers';

const footerNav = [
  { label: 'Home', anchor: 'home' },
  { label: 'About', anchor: 'about' },
  { label: 'Services', anchor: 'services' },
  { label: 'Portfolio', anchor: 'portfolio' },
  { label: 'Contact', anchor: 'contact' },
];

export function Footer() {
  return (
    <footer
      className="bg-bg-elevated border-t border-border-gold/20 pt-16 pb-8"
      role="contentinfo"
    >
      <Container>
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pb-12 border-b border-border-gold/15">
          {/* Brand */}
          <div>
            <Logo variant="header" />
            <p className="mt-4 text-muted text-sm leading-relaxed max-w-xs">
              Strategic investment and business-advisory firm based in Msheireb Downtown, Doha, Qatar.
              Operating across GCC, South Asia and Eurasia.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4 mt-6">
              {social.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${brand.name} on ${s.label}`}
                  className="w-9 h-9 rounded-sm border border-border-gold/30 flex items-center justify-center text-muted hover:text-gold hover:border-gold/60 hover:shadow-gold-glow transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <SocialIcon platform={s.platform} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-gold mb-5">
              Navigation
            </h3>
            <ul className="space-y-3" role="list">
              {footerNav.map((link) => (
                <li key={link.anchor}>
                  <button
                    onClick={() => scrollToSection(link.anchor)}
                    className="text-sm font-serif font-bold text-muted hover:text-gold-light transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-gold mb-5">
              Contact Us
            </h3>
            <address className="not-italic space-y-3">
              <p className="text-sm text-muted">
                <span className="text-gold-light">{contact.address}</span>,{' '}
                {contact.city}, {contact.country}
              </p>
              <p className="text-sm">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-muted hover:text-gold-light transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
                >
                  {contact.email}
                </a>
              </p>
            </address>
            <div className="mt-5">
              <Button
                href={buildWhatsAppUrl()}
                external
                variant="outline"
                size="sm"
                className="rounded-full gap-2 text-xs"
              >
                <WAIconTiny />
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-muted">
          <p>
            © {currentYear()} {legal.copyrightHolder}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href={legal.privacyUrl}
              className="hover:text-gold-light transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
            >
              Privacy Policy
            </a>
            <a
              href={legal.termsUrl}
              className="hover:text-gold-light transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function WAIconTiny() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  if (platform === 'linkedin') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }
  if (platform === 'twitter') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (platform === 'instagram') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    );
  }
  return null;
}
