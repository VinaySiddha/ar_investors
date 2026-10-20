import { Helmet } from 'react-helmet-async';
import { seo, contact, brand, services } from '@/config/site.config';

/** Generates all head tags and JSON-LD structured data from site.config.ts */
export function SEO() {
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'FinancialService', 'LocalBusiness'],
    '@id': `${seo.siteUrl}/#organization`,
    name: brand.name,
    url: seo.siteUrl,
    logo: `${seo.siteUrl}/images/logo.svg`,
    description: seo.defaultDescription,
    telephone: contact.phone,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address,
      addressLocality: contact.city,
      addressCountry: contact.countryCode,
      postalCode: contact.postalCode || '',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: seo.geo.latitude,
      longitude: seo.geo.longitude,
    },
    areaServed: ['Qatar', 'Oman', 'India', 'Russia'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: contact.phone,
      email: contact.email,
      availableLanguage: ['English', 'Arabic'],
    },
    sameAs: [
      'https://linkedin.com/company/arinvestors',
      'https://twitter.com/arinvestors',
    ],
  };

  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${seo.siteUrl}/#website`,
    url: seo.siteUrl,
    name: brand.name,
    description: seo.defaultDescription,
    publisher: { '@id': `${seo.siteUrl}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${seo.siteUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: seo.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${seo.siteUrl}/#services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Portfolio',
        item: `${seo.siteUrl}/#portfolio`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Contact',
        item: `${seo.siteUrl}/#contact`,
      },
    ],
  };

  const jsonLdServices = services.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    description: s.description,
    provider: { '@id': `${seo.siteUrl}/#organization` },
    areaServed: ['Qatar', 'Oman', 'India', 'Russia'],
    serviceType: s.title,
  }));

  return (
    <Helmet>
      {/* ── Primary ─────────────────────────────────────── */}
      <html lang="en" dir="ltr" />
      <title>{seo.defaultTitle}</title>
      <meta name="description" content={seo.defaultDescription} />
      <meta name="keywords" content={seo.keywords.join(', ')} />
      <link rel="canonical" href={seo.siteUrl} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="theme-color" content="#0B0B0B" />

      {/* ── Geo ─────────────────────────────────────────── */}
      <meta name="geo.region" content={seo.geo.region} />
      <meta name="geo.placename" content={seo.geo.placeName} />
      <meta name="geo.position" content={`${seo.geo.latitude};${seo.geo.longitude}`} />
      <meta name="ICBM" content={`${seo.geo.latitude}, ${seo.geo.longitude}`} />

      {/* ── hreflang ────────────────────────────────────── */}
      <link rel="alternate" hrefLang="en" href={seo.siteUrl} />
      <link rel="alternate" hrefLang="ar" href={`${seo.siteUrl}/ar/`} />
      <link rel="alternate" hrefLang="x-default" href={seo.siteUrl} />

      {/* ── Open Graph ──────────────────────────────────── */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.siteUrl} />
      <meta property="og:title" content={seo.defaultTitle} />
      <meta property="og:description" content={seo.defaultDescription} />
      <meta property="og:image" content={`${seo.siteUrl}${seo.ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${brand.name} — ${brand.tagline}`} />
      <meta property="og:locale" content={seo.locale} />
      <meta property="og:site_name" content={brand.name} />

      {/* ── Twitter Card ────────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seo.twitterHandle} />
      <meta name="twitter:creator" content={seo.twitterHandle} />
      <meta name="twitter:title" content={seo.defaultTitle} />
      <meta name="twitter:description" content={seo.defaultDescription} />
      <meta name="twitter:image" content={`${seo.siteUrl}${seo.ogImage}`} />

      {/* ── JSON-LD ─────────────────────────────────────── */}
      <script type="application/ld+json">{JSON.stringify(jsonLdOrg)}</script>
      <script type="application/ld+json">{JSON.stringify(jsonLdWebsite)}</script>
      <script type="application/ld+json">{JSON.stringify(jsonLdBreadcrumb)}</script>
      {jsonLdServices.map((s) => (
        <script key={s.name} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
}
