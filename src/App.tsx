import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { site } from "./config/site.config";

const { brand, contact, hero, about, stats, services, portfolio, regions, seo } = site;
const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;
const NAV = ["home", "about", "services", "portfolio", "contact"] as const;

/* ---------- SEO: sets head tags + JSON-LD from config ---------- */
function useSeo() {
  useEffect(() => {
    document.title = seo.title;
    const meta = (attr: "name" | "property", key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    meta("name", "description", seo.description);
    meta("name", "keywords", seo.keywords.join(", "));
    meta("property", "og:title", seo.title);
    meta("property", "og:description", seo.description);
    meta("property", "og:type", "website");
    meta("property", "og:url", seo.siteUrl);
    meta("property", "og:image", seo.siteUrl + seo.ogImage);
    meta("name", "twitter:card", "summary_large_image");

    const ld = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["FinancialService", "LocalBusiness"],
          name: brand.name,
          slogan: brand.tagline,
          url: seo.siteUrl,
          email: contact.email,
          description: seo.description,
          image: seo.siteUrl + seo.ogImage,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Msheireb Downtown",
            addressLocality: "Doha",
            addressCountry: "QA",
          },
          geo: { "@type": "GeoCoordinates", latitude: seo.geo.lat, longitude: seo.geo.lng },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: contact.email,
            telephone: `+${contact.whatsapp}`,
          },
          areaServed: regions.map((r) => r.name),
          sameAs: site.social.map((s) => s.url),
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Services",
            itemListElement: services.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s.title, description: s.description },
            })),
          },
        },
        { "@type": "WebSite", name: brand.name, url: seo.siteUrl },
      ],
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.text = JSON.stringify(ld);
    document.head.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);
}

/* ---------- Active section highlight ---------- */
function useActive() {
  const [active, setActive] = useState<string>("home");
  useEffect(() => {
    const io = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && setActive(x.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

/* ---------- Icons & flags (inline, no external requests) ---------- */
const Diamond = () => (
  <svg viewBox="0 0 100 90" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M25 5h50l22 28-47 55L3 33zM3 33h94M25 5l25 83M75 5L50 88M25 5l-8 28M75 5l8 28" />
  </svg>
);

const ICONS: Record<string, ReactNode> = {
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" />
    </>
  ),
  chart: <path d="M3 21h18M6 17v-5M11 17V8M16 17v-8M21 17V4" />,
  revive: (
    <>
      <path d="M20 12a8 8 0 00-14-5L4 9M4 4v5h5M4 12a8 8 0 0014 5l2-2M20 20v-5h-5" />
    </>
  ),
  ship: <path d="M3 17l2 4h14l2-4-9-3zM12 14V4l6 6h-6M6 11l6-1" />,
};

const FLAGS: Record<string, ReactNode> = {
  QA: (
    <>
      <rect width="60" height="40" fill="#8a1538" />
      <path d="M0 0h20l8 3.6-8 3.6 8 3.6-8 3.6 8 3.6-8 3.6 8 3.6-8 3.6 8 3.6-8 3.6H0z" fill="#fff" />
    </>
  ),
  OM: (
    <>
      <rect width="60" height="40" fill="#fff" />
      <rect y="13" width="60" height="14" fill="#db161b" />
      <rect y="27" width="60" height="13" fill="#008000" />
      <rect width="16" height="40" fill="#db161b" />
    </>
  ),
  IN: (
    <>
      <rect width="60" height="14" fill="#ff9933" />
      <rect y="13" width="60" height="14" fill="#fff" />
      <rect y="27" width="60" height="13" fill="#138808" />
      <circle cx="30" cy="20" r="5" fill="none" stroke="#000080" strokeWidth="1.5" />
    </>
  ),
  RU: (
    <>
      <rect width="60" height="14" fill="#fff" />
      <rect y="13" width="60" height="14" fill="#0039a6" />
      <rect y="27" width="60" height="13" fill="#d52b1e" />
    </>
  ),
};

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 2a8 8 0 11-4.2 14.8l-.4-.2-2.6.7.7-2.5-.3-.4A8 8 0 0112 4zm-3 3.5c-.3 0-.6.2-.8.5-.3.4-.7 1-.7 2s.8 2.3 1.6 3.3c1 1.3 2.4 2.4 4.3 3.1 1.8.600 2.3.500 2.8.400.5-.100 1.3-.600 1.5-1.2s.2-1.1.100-1.2l-1.8-.9c-.3-.1-.5-.1-.7.1l-.8 1c-.1.2-.3.2-.6.1-1-.4-2-1.2-2.7-2.3-.1-.3 0-.4.2-.6l.5-.6c.1-.2.1-.4 0-.6l-.8-2c-.2-.5-.4-.5-.6-.5z" />
  </svg>
);

/* ---------- Contact form ---------- */
function ContactForm() {
  const [status, setStatus] = useState("");
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("website")) return; // honeypot
    if (!contact.formEndpoint) {
      const text = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\n\n${data.get("message")}`;
      window.open(
        `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener"
      );
      return;
    }
    setStatus("Sending…");
    try {
      const res = await fetch(contact.formEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error();
      setStatus("Message sent. We will reply soon.");
      e.currentTarget.reset();
    } catch {
      setStatus(`Could not send. Email us at ${contact.email} instead.`);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <label>
        Name
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        Email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        Phone
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <label>
        Message
        <textarea name="message" rows={5} required />
      </label>
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn solid" type="submit">
        Send message
      </button>
      {status && (
        <p className="note" role="status">
          {status}
        </p>
      )}
    </form>
  );
}

/* ---------- App ---------- */
export default function App() {
  useSeo();
  const active = useActive();
  const [open, setOpen] = useState(false);
  const go = () => setOpen(false);

  return (
    <>
      <header>
        <div className="wrap bar">
          <a className="logo" href="#home">
            <Diamond />
            {brand.name}
          </a>
          <button
            className="menu"
            aria-expanded={open}
            aria-controls="nav"
            onClick={() => setOpen(!open)}
          >
            Menu
          </button>
          <nav id="nav" className={open ? "open" : ""} aria-label="Primary">
            {NAV.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={go}
                className={`link${active === id ? " on" : ""}`}
              >
                {id[0].toUpperCase() + id.slice(1)}
              </a>
            ))}
            <a className="btn wa" href={wa} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              WhatsApp
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section id="home" className="hero" aria-labelledby="h1">
          <div className="gem" style={{ color: "var(--gold)" }}>
            <Diamond />
          </div>
          <div className="wrap">
            <h1 id="h1">{hero.headline}</h1>
            <ul>
              {hero.pillars.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p>{hero.description}</p>
            <div className="cta">
              <a className="btn solid" href="#services">
                {hero.primaryCta}
              </a>
              <a className="btn ghost" href="#contact">
                {hero.secondaryCta}
              </a>
            </div>
          </div>
        </section>

        <section id="about" aria-labelledby="about-h">
          <div className="wrap about">
            <div>
              <h2 id="about-h">{about.title}</h2>
              <p className="lead">{about.text}</p>
            </div>
            <div className="stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" aria-labelledby="services-h" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2 id="services-h">Our services</h2>
            <div className="grid2">
              {services.map((s) => (
                <article className="card" key={s.title}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {ICONS[s.icon]}
                  </svg>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="regions">
          <div className="wrap">
            <div className="flags">
              {regions.map((r) => (
                <figure key={r.code}>
                  <svg viewBox="0 0 60 40" role="img" aria-label={`Flag of ${r.name}`}>
                    {FLAGS[r.code]}
                  </svg>
                  <figcaption>{r.name}</figcaption>
                </figure>
              ))}
            </div>
            <p className="lead" style={{ marginInline: "auto" }}>
              {site.regionsLine}
            </p>
          </div>
        </div>

        <section id="portfolio" aria-labelledby="portfolio-h">
          <div className="wrap">
            <h2 id="portfolio-h">Portfolio</h2>
            <div className="grid3">
              {portfolio.map((p, i) => (
                <article className="card" key={i}>
                  <small>
                    {p.sector} · {p.country}
                  </small>
                  <h3 style={{ margin: "8px 0" }}>{p.title}</h3>
                  <p>{p.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-h" style={{ paddingTop: 0 }}>
          <div className="wrap contact">
            <div>
              <h2 id="contact-h">Talk to us</h2>
              <p className="lead">
                Tell us about the opportunity. We usually reply within one business day.
              </p>
              <address>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  WhatsApp: +{contact.whatsapp}
                </a>
                <span>{contact.address}</span>
                <a href={contact.website}>{contact.website.replace("https://", "")}</a>
              </address>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </span>
          <span>
            {site.social.map((s) => (
              <a key={s.platform} href={s.url} rel="noopener noreferrer" style={{ marginRight: 14 }}>
                {s.platform}
              </a>
            ))}
            Privacy · Terms
          </span>
        </div>
      </footer>

      <a className="btn wa float" href={wa} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon />
        Chat on WhatsApp
      </a>
    </>
  );
}
