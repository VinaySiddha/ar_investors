# AR Investor's Website

Production-ready SPA for **AR Investor's** — a luxury investment and business-advisory firm based in Msheireb Downtown, Doha, Qatar.

## Tech Stack

- **Vite 8 + React 19 + TypeScript 6** — lightning-fast DX and strict typing
- **Tailwind CSS v4** — utility-first styling with custom gold design tokens
- **Framer Motion 14** — scroll animations, prefers-reduced-motion aware
- **react-helmet-async** — full SEO head management + JSON-LD
- **react-hook-form** — lightweight form validation with honeypot spam protection

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env

# 3. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Editing Content

**All site copy, contact details, SEO meta, and configuration live in one file:**

```
src/config/site.config.ts
```

### Key sections:

| Export | What it controls |
|--------|-----------------|
| `brand` | Company name, tagline, logo paths |
| `contact` | Email, WhatsApp number, address, website |
| `hero` | H1, sub-headline items, CTA labels/targets |
| `about` | Story paragraphs, mission, stats |
| `services[]` | Service cards (title, description, icon) |
| `portfolio[]` | Portfolio cards (title, sector, country, image) |
| `regions[]` | Country flags strip |
| `social[]` | Social media links |
| `seo` | Title, description, keywords, OG image, geo coords |
| `legal` | Privacy / Terms URLs, copyright holder |

**One change in `site.config.ts` automatically updates:**
- All rendered copy
- `<title>` and `<meta>` tags
- JSON-LD structured data
- WhatsApp chat links (`https://wa.me/<number>?text=…`)
- Mailto links

### Updating the WhatsApp number

```ts
// src/config/site.config.ts
export const contact = {
  whatsappNumber: '97450000000', // ← digits only, no +, spaces, or dashes
  whatsappDefaultMessage: 'Hello, I'd like to discuss an opportunity.',
  ...
};
```

### Adding a portfolio item

```ts
export const portfolio: PortfolioItem[] = [
  // ... existing items ...
  {
    title: 'My New Project',
    sector: 'Real Estate',
    country: 'Qatar',
    description: 'Brief description of the project.',
    image: '/images/portfolio/my-project.jpg',
  },
];
```

### Adding a service

```ts
export const services: ServiceItem[] = [
  // ... existing ...
  {
    id: 'new-service',
    title: 'New Service',
    description: 'Description here.',
    icon: 'investment', // one of: investment | development | revival | ship
  },
];
```

---

## Building for Production

```bash
npm run build
```

Output goes to `dist/`. The build is fully static — serve with any CDN or static host.

### Preview the production build locally

```bash
npm run preview
```

---

## Deployment

### Netlify (Recommended)

1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_FORM_ENDPOINT=https://formspree.io/f/YOUR_ID`
5. The `public/_headers` file sets security and cache headers automatically

### Vercel

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Nginx (VPS/Self-hosted)

```nginx
server {
    listen 80;
    server_name www.arinvestors.qa arinvestors.qa;
    root /var/www/ar-investors/dist;
    index index.html;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Contact Form Setup

### Option 1: Formspree (easiest)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy the endpoint URL
3. Set `VITE_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID` in `.env`

### Option 2: Web3Forms

1. Get an access key from [web3forms.com](https://web3forms.com)
2. Set `VITE_FORM_ENDPOINT=https://api.web3forms.com/submit`
3. Add `access_key` to the form data (modify `Contact.tsx`)

### Fallback

If `VITE_FORM_ENDPOINT` is empty, the form falls back to opening a `mailto:` link.

---

## SEO Checklist

After deploying, complete these steps:

### Google Search Console
- [ ] Add and verify property at [search.google.com/search-console](https://search.google.com/search-console)
- [ ] Submit `https://www.arinvestors.qa/sitemap.xml`
- [ ] Request indexing of the homepage
- [ ] Monitor Core Web Vitals report

### Bing Webmaster Tools
- [ ] Add site at [bing.com/webmasters](https://www.bing.com/webmasters)
- [ ] Import from Google Search Console or verify separately
- [ ] Submit sitemap

### Google Business Profile
- [ ] Claim/create profile for **AR Investor's**
- [ ] Category: Investment company / Financial consultant
- [ ] Address: Msheireb Downtown, Doha, Qatar
- [ ] Add phone, website, hours, photos
- [ ] Enable WhatsApp messaging

### Technical SEO Verification
- [ ] Run Lighthouse audit (target: 95+ all categories)
- [ ] Validate JSON-LD at [schema.org/validator](https://validator.schema.org/)
- [ ] Check OG tags at [opengraph.xyz](https://www.opengraph.xyz)
- [ ] Test Twitter Card at [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)
- [ ] Verify hreflang at [hreflang.org/checker](https://www.hreflang.org/checker)
- [ ] Check WCAG contrast at [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker)

### Performance
- [ ] Set up WebP/AVIF portfolio images (replace JPG placeholders in `public/images/`)
- [ ] Confirm LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Consider [Cloudflare](https://cloudflare.com) or Netlify CDN for edge caching

---

## Project Structure

```
ar_investors/
├── public/
│   ├── _headers           # Netlify security + cache headers
│   ├── 404.html           # Custom 404 page
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── site.webmanifest
│   ├── favicon.ico        # ← Replace with actual favicon
│   ├── og-image.png       # ← Replace with 1200×630 OG image
│   └── images/
│       └── portfolio/     # ← Add portfolio images here
│
├── src/
│   ├── config/
│   │   └── site.config.ts     # ← EDIT THIS FILE for all content
│   ├── components/            # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   ├── Logo.tsx
│   │   ├── SEO.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── ServiceIcon.tsx
│   │   └── WhatsAppButton.tsx
│   ├── sections/              # Page sections
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Regions.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── hooks/
│   │   ├── useActiveSection.ts
│   │   └── useScrolled.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
│
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## Assumptions & Placeholders

| Item | Status |
|------|--------|
| WhatsApp number | **⚠️ CONFIRM** — currently `97450000000` (placeholder) |
| Contact phone | **⚠️ CONFIRM** — currently `+974 5000 0000` |
| Form endpoint | **⚠️ SET** `VITE_FORM_ENDPOINT` in `.env` |
| Favicon / OG image | **⚠️ REPLACE** placeholder files in `public/` |
| Portfolio images | **⚠️ ADD** WebP images to `public/images/portfolio/` |
| Social media URLs | **⚠️ UPDATE** in `site.config.ts` → `social[]` |
| Privacy / Terms pages | Linked as `/privacy` and `/terms` — create content separately |
| Arabic hreflang | Included as placeholder; Arabic version not yet built |
| Analytics | Optional — add Plausible/Fathom script in `index.html` |
| Map URL | Uses Google Maps search link — can swap for embed |

---

## License

Proprietary — © AR Investor's. All rights reserved.
