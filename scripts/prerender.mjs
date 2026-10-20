import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

async function buildSSG() {
  const vite = await createServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    const { prerender } = await vite.ssrLoadModule('/src/prerender.tsx');
    const { site } = await vite.ssrLoadModule('/src/config/site.config.ts');
    const { html } = prerender();

    const templatePath = path.resolve(root, 'dist/index.html');
    if (!fs.existsSync(templatePath)) {
      throw new Error(`dist/index.html does not exist. Run vite build first.`);
    }

    let template = fs.readFileSync(templatePath, 'utf-8');

    // Replace root container with prerendered static HTML
    template = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

    // Inject JSON-LD structured data into head
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["FinancialService", "LocalBusiness"],
          name: site.brand.name,
          slogan: site.brand.tagline,
          url: site.seo.siteUrl,
          email: site.contact.email,
          description: site.seo.description,
          image: site.seo.siteUrl + site.seo.ogImage,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Msheireb Downtown",
            addressLocality: "Doha",
            addressCountry: "QA",
          },
          geo: { "@type": "GeoCoordinates", latitude: site.seo.geo.lat, longitude: site.seo.geo.lng },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: site.contact.email,
            telephone: `+${site.contact.whatsapp}`,
          },
          areaServed: site.regions.map((r) => r.name),
          sameAs: site.social.map((s) => s.url),
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Services",
            itemListElement: site.services.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s.title, description: s.description },
            })),
          },
        },
        { "@type": "WebSite", name: site.brand.name, url: site.seo.siteUrl },
      ],
    };

    const scriptTag = `    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  `;
    template = template.replace('</head>', `${scriptTag}</head>`);

    fs.writeFileSync(templatePath, template, 'utf-8');
    console.log('✅ SSG: Successfully prerendered full static HTML & JSON-LD into dist/index.html');
  } catch (error) {
    console.error('❌ SSG Error:', error);
    process.exit(1);
  } finally {
    await vite.close();
  }
}

buildSSG();
