/** Single source of truth: edit this file and the whole site (copy, SEO, JSON-LD, WhatsApp links) updates. */
export const site = {
  brand: {
    name: "AR Investor's",
    tagline: "We Invest Where Others See Risk",
    shortName: "ARI",
    logoPath: "/images/logo.svg",
    faviconPath: "/favicon.ico",
  },

  contact: {
    email: "info@arinvestors.qa",
    whatsapp: "9747530038055",
    whatsappNumber: "9747530038055",
    whatsappMessage: "Hello AR Investor's, I would like to discuss an opportunity.",
    whatsappDefaultMessage: "Hello AR Investor's, I would like to discuss an opportunity.",
    phone: "+974 7530038055",
    address: "Msheireb Downtown Doha Qatar",
    city: "Doha",
    country: "Qatar",
    countryCode: "QA",
    postalCode: "",
    website: "https://www.arinvestors.qa",
    mapUrl: "https://maps.google.com/?q=Msheireb+Downtown+Doha+Qatar",
    // Endpoint for the form (Formspree / Web3Forms). Empty = falls back to WhatsApp.
    formEndpoint: "",
  },

  hero: {
    headline: "We Invest Where Others See Risk",
    pillars: ["Strategic Investments", "Business Development", "Revival & Restructuring", "Maritime Solutions"],
    subheadlineItems: ["Strategic Investments", "Business Development", "Revival & Restructuring", "Maritime Solutions"],
    description:
      "AR Investor's partners across Qatar, Oman, India and Russia to unlock opportunities in emerging markets with confidence, expertise and capital.",
    primaryCta: "Explore our services",
    secondaryCta: "Get in touch",
    ctas: [
      { label: "Explore Our Services", target: "#services", variant: "primary" as const },
      { label: "Get In Touch", target: "#contact", variant: "outline" as const },
    ],
  },

  about: {
    heading: "About AR Investor's",
    subheading: "Capital with a point of view",
    title: "Capital with a point of view",
    text: "Based in Msheireb Downtown, Doha, we back businesses that conventional investors pass over. We combine due diligence, hands-on operations and regional partnerships to turn risk into durable returns.",
    story: [
      "Based in Msheireb Downtown, Doha, we back businesses that conventional investors pass over.",
      "We combine due diligence, hands-on operations and regional partnerships to turn risk into durable returns.",
      "Our partners operate seamlessly across Qatar, Oman, India, and Russia, giving our clients an unparalleled edge in navigating GCC, South Asian, and Eurasian markets.",
    ],
    mission: "To generate sustainable value for our partners by deploying strategic capital and expert advisory services across high-growth emerging markets.",
    stats: [
      { value: "4", label: "Countries" },
      { value: "4", label: "Service lines" },
      { value: "3", label: "Regions covered" },
    ],
  },

  stats: [
    { value: "4", label: "Countries" },
    { value: "4", label: "Service lines" },
    { value: "3", label: "Regions covered" },
  ],

  services: [
    { id: "new-business-investments", icon: "briefcase" as const, title: "New Business Investments", description: "Identifying and funding high-potential ventures from startup to scale-up, with due diligence and strategic capital." },
    { id: "business-development", icon: "chart" as const, title: "Business Development", description: "Expanding market reach, partnerships and revenue streams through strategic planning and operational support." },
    { id: "loss-business-revival", icon: "revive" as const, title: "Loss Business Revival", description: "Transforming distressed businesses into profitable ventures through restructuring, turnaround management and financial advisory." },
    { id: "ship-scrapping", icon: "ship" as const, title: "Ship Scrapping", description: "Responsible, compliant ship scrapping, asset recovery, recycling and environmental management for maritime assets." },
  ],

  portfolio: [
    { title: "Doha Logistics Hub", sector: "Logistics", country: "Qatar", description: "Co-founded and scaled a multi-modal logistics platform serving the GCC corridor.", image: "/images/portfolio/logistics.jpg" },
    { title: "Mumbai Port Terminal", sector: "Maritime", country: "India", description: "Turnaround and restructuring of an essential maritime freight and handling asset.", image: "/images/portfolio/maritime.jpg" },
    { title: "Muscat Tech Ventures", sector: "Technology", country: "Oman", description: "Strategic investment and operational acceleration for enterprise cloud services.", image: "/images/portfolio/tech.jpg" },
  ],

  regions: [
    { name: "Qatar", code: "QA", countryCode: "QA" },
    { name: "Oman", code: "OM", countryCode: "OM" },
    { name: "India", code: "IN", countryCode: "IN" },
    { name: "Russia", code: "RU", countryCode: "RU" },
  ],
  regionsLine: "Operating across GCC, South Asia & Eurasia",
  regionsTagline: "Operating across GCC, South Asia & Eurasia",

  social: [
    { platform: "linkedin", url: "https://linkedin.com/company/arinvestors", label: "LinkedIn" },
    { platform: "twitter", url: "https://twitter.com/arinvestors", label: "Twitter / X" },
  ],

  legal: {
    privacyUrl: "/privacy",
    termsUrl: "/terms",
    copyrightHolder: "AR Investor's",
  },

  seo: {
    siteUrl: "https://www.arinvestors.qa",
    defaultTitle: "AR Investor's | Investment Company in Doha, Qatar",
    title: "AR Investor's | Investment Company in Doha, Qatar",
    titleTemplate: "%s | AR Investor's",
    defaultDescription:
      "AR Investor's is a Doha-based investment firm funding new businesses, reviving distressed companies and offering ship scrapping across Qatar, Oman, India and Russia.",
    description:
      "AR Investor's is a Doha-based investment firm funding new businesses, reviving distressed companies and offering ship scrapping across Qatar, Oman, India and Russia.",
    keywords: ["investment company in Qatar", "business investment Doha", "business revival and restructuring", "ship scrapping services", "investment opportunities Qatar Oman India Russia"],
    ogImage: "/og-image.jpg",
    twitterHandle: "@arinvestors",
    locale: "en_QA",
    geo: { lat: 25.2867, lng: 51.5333, latitude: 25.2867, longitude: 51.5333, region: "QA-DA", placeName: "Doha, Qatar" },
  },
} as const;

export type Site = typeof site;

// Named exports for compatibility with all components
export const brand = site.brand;
export const contact = site.contact;
export const hero = site.hero;
export const about = site.about;
export const stats = site.stats;
export const services = site.services;
export const portfolio = site.portfolio;
export const regions = site.regions;
export const regionsLine = site.regionsLine;
export const regionsTagline = site.regionsTagline;
export const social = site.social;
export const legal = site.legal;
export const seo = site.seo;

export function buildWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(message ?? contact.whatsappMessage);
  return `https://wa.me/${contact.whatsapp}?text=${text}`;
}

export function buildMailtoUrl(subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString();
  return `mailto:${contact.email}${qs ? `?${qs}` : ""}`;
}

export default site;
