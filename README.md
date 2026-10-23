# AR Investor’s — Official Institutional Website

> **Brand Ideology:** *Clarity in Complexity. Conviction Through Research.*  
> **Tagline:** *We Invest Where Others See Risk*  
> **Operational Base:** Msheireb Downtown, Doha, State of Qatar  
> **Corridors:** Qatar · Oman · India · Russia  

---

## 1. Architectural Philosophy & Technology Stack

The AR Investor's website is built from the ground up on modern, standards-based web technologies without third-party framework dependencies:

- **Markup:** Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- **Styling:** Modular CSS3 with CSS Custom Properties (`tokens.css`, `global.css`, `components.css`, `responsive.css`)
- **Dual-Surface System:** Obsidian Dark (`#050505`) for signature brand moments; Paper White (`#F6F5F1`) for editorial and research reading
- **Scripting:** Pure Vanilla ES6 JavaScript modules (`navigation.js`, `interactions.js`, `main.js`) with zero npm runtime dependencies
- **Typography:** Manrope (headings) and Inter (body) with Playfair Display (editorial accents) and tabular figures
- **Graphics:** Scalable, resolution-independent SVG logos and icons
- **SEO & Search Indexing:** Valid JSON-LD structured data (`Organization`, `WebSite`, `BreadcrumbList`, `Article`), clean semantic markup, dedicated `robots.txt`, and XML `sitemap.xml`
- **Performance:** Optimized for sub-second Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1)

---

## 2. Directory Structure

```
ar-investors/
├── index.html                  # Homepage (Brand introduction, narrative & conversion)
├── about/
│   └── index.html              # About (Identity, governance, operational transparency)
├── investment-approach/
│   └── index.html              # Investment Approach (Four-stage analytical framework)
├── markets/
│   └── index.html              # Regional Markets (Qatar, Oman, India, Russia)
├── insights/
│   └── index.html              # Insights & Research (Original papers & commentary)
├── contact/
│   └── index.html              # Contact (Validated form, mailto, direct WhatsApp)
├── css/
│   ├── tokens.css              # Design tokens & color palette custom properties
│   ├── global.css              # Reset, typography, dual-surface classes, container
│   ├── components.css          # Header, navigation, cards, process steps, footer
│   └── responsive.css          # Mobile drawer, fluid clamp scaling, breakpoints
├── js/
│   ├── main.js                 # Application entry point & copyright year handler
│   ├── navigation.js           # Accessible mobile drawer & scroll header controller
│   └── interactions.js         # Accessible form validation & status messaging
├── assets/
│   ├── logo/                   # Diamond & AR monogram SVG assets
│   ├── images/                 # Editorial & architectural visuals
│   └── icons/                  # Crisp inline/standalone SVG UI icons
├── robots.txt                  # Search engine crawl rules & sitemap pointer
├── sitemap.xml                 # Canonical XML sitemap with all indexable URLs
├── favicon.svg                 # Scalable faceted diamond SVG favicon
├── 404.html                    # Custom institutional 404 error page
├── SEO-STRATEGY.md             # Keyword map & technical SEO specification
├── CLIENT-CONFIRMATIONS.md     # Pre-launch client confirmation checklist
└── README.md                   # Architecture & deployment documentation
```

---

## 3. Local Development & Preview

Because this project uses pure, standards-compliant static web technologies, no build step or node compilation is required.

To preview the website locally using any standard HTTP server:

### Option A: Using Python 3 (Installed on virtually all systems)
```bash
# From the project root directory
python3 -m http.server 8080
```
Then open `http://localhost:8080` in your web browser.

### Option B: Using Node.js `npx serve`
```bash
npx serve .
```

### Option C: Using VS Code Live Server
Right-click on `index.html` and select **"Open with Live Server"**.

---

## 4. Deployment Instructions

### A. Cloudflare Pages / Vercel / Netlify
1. Connect your Git repository.
2. Set **Build command**: *(Leave empty)*
3. Set **Output directory**: `.` (or root directory).
4. Deploy.

### B. Nginx Configuration
```nginx
server {
    listen 443 ssl http2;
    server_name arinvestors.in www.arinvestors.in;

    root /var/www/ar-investors;
    index index.html;

    # Gzip / Brotli compression
    gzip on;
    gzip_types text/plain text/css application/javascript image/svg+xml;

    # Clean URL routing & trailing slashes
    location / {
        try_files $uri $uri/ =404;
    }

    error_page 404 /404.html;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

---

## 5. Pre-Launch Verification
Please consult [CLIENT-CONFIRMATIONS.md](./CLIENT-CONFIRMATIONS.md) for items requiring confirmation from the business owner prior to public DNS launch.
