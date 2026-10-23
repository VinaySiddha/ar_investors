/**
 * AR Investor's — Interactions & Service Context Controller
 * Interactive card highlights, 3D tilt effects, and form validation
 */

const SERVICES_DATA = {
  'investments': {
    title: 'New Business Investments',
    subtitle: 'Venture Capital & Growth Equity Deployment',
    badge: 'Equity & Strategic Capital',
    icon: '/assets/icons/briefcase.svg',
    summary: 'Identifying, validating, and funding early-to-growth stage ventures across Qatar, Oman, India, and Eurasia with empirical due diligence and strategic balance sheet support.',
    pillars: [
      {
        title: 'Rigorous Due Diligence',
        desc: 'Forensic evaluation of proprietary tech moats, customer acquisition economics, and cross-border regulatory feasibility.'
      },
      {
        title: 'Syndicated Structuring',
        desc: 'Structuring equity, mezzanine credit facilities, and founder-aligned governance to ensure long-term incentive alignment.'
      },
      {
        title: 'Corridor Expansion',
        desc: 'Connecting portfolio companies directly to sovereign procurement and distribution channels across the GCC and South Asia.'
      }
    ],
    sectors: 'Enterprise Software, Industrial Manufacturing, Sustainable Cold-Chain Logistics',
    enquiryCategory: 'strategic'
  },
  'development': {
    title: 'Business Development',
    subtitle: 'Cross-Border Commercial Expansion & Market Penetration',
    badge: 'Commercial Scaling',
    icon: '/assets/icons/trending-up.svg',
    summary: 'Unlocking untapped sovereign commercial corridors, strategic supplier alliances, and international distribution pipelines across the Gulf, South Asia, and Eurasia.',
    pillars: [
      {
        title: 'Corridor Penetration',
        desc: 'Establishing formal commercial bridges between Doha, Muscat, and South Asian commercial gateways with local compliance.'
      },
      {
        title: 'Institutional Partnerships',
        desc: 'Negotiating high-stakes joint ventures, public-private concessions, and long-term sovereign offtake agreements.'
      },
      {
        title: 'Revenue Stream Diversification',
        desc: 'Auditing existing product lines to identify secondary commercial pipelines and export monetisation opportunities.'
      }
    ],
    sectors: 'Import/Export Hubs, Advanced Logistics Infrastructure, Cross-Border Trading',
    enquiryCategory: 'partnership'
  },
  'revival': {
    title: 'Loss Business Revival',
    subtitle: 'Turnaround Management & Operational Restructuring',
    badge: 'Stressed Asset Advisory',
    icon: '/assets/icons/refresh-cw.svg',
    summary: 'Transforming distressed, loss-making, or capital-constrained commercial enterprises into disciplined, cash-flow positive entities through forensic intervention.',
    pillars: [
      {
        title: 'Forensic Debt Re-profiling',
        desc: 'Negotiating creditor standstill agreements, restructuring burdensome obligations, and infusing critical bridge liquidity.'
      },
      {
        title: 'Interim Executive Leadership',
        desc: 'Deploying veteran turnaround managers to execute immediate cost rationalization and protect working capital.'
      },
      {
        title: 'Governance Re-engineering',
        desc: 'Dismantling inefficient corporate silos and establishing rigorous KPIs, board oversight, and financial controls.'
      }
    ],
    sectors: 'Manufacturing Operators, Stressed Logistics Fleets, Specialized Industrial Plants',
    enquiryCategory: 'advisory'
  },
  'scrapping': {
    title: 'Ship Scrapping & Maritime Solutions',
    subtitle: 'Compliant Maritime Asset Recovery & Green Recycling',
    badge: 'Maritime Asset Solutions',
    icon: '/assets/icons/ship.svg',
    summary: 'End-to-end maritime asset management, compliant end-of-life vessel acquisition, environmental decommissioning, and secondary raw material recovery.',
    pillars: [
      {
        title: 'Asset Acquisition & LDT Valuation',
        desc: 'Precision inspection of light displacement tonnage, remaining onboard fuel bunkers, and auxiliary non-ferrous machinery.'
      },
      {
        title: 'Hong Kong Convention Compliance',
        desc: 'HKC-certified green dismantling ensuring strict containment of hazardous materials and zero beach pollution.'
      },
      {
        title: 'Circular Steel Recycling',
        desc: 'Processing high-grade structural marine steel plates directly into sovereign rebar and industrial steel mill feeds.'
      }
    ],
    sectors: 'Bulk Carriers, Commercial Tankers, Offshore Supply Vessels, Marine Tonnage',
    enquiryCategory: 'strategic'
  }
};

/**
 * 0. Atmospheric Golden Stardust Particle Canvas
 */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;
  let animationFrameId = null;
  let isVisible = true;

  const mouse = {
    x: -9999,
    y: -9999,
    radius: 130
  };

  const particleCount = 42;
  const particles = [];

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * width : (Math.random() > 0.5 ? 0 : width);
      this.y = initial ? Math.random() * height : Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.radius = Math.random() * 1.6 + 0.8;
      this.baseAlpha = Math.random() * 0.45 + 0.25;
      this.alpha = this.baseAlpha;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulseAngle = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      this.pulseAngle += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.15;

      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.hypot(dx, dy);

      if (dist < mouse.radius) {
        const force = (1 - dist / mouse.radius) * 1.5;
        const angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * force;
        this.y -= Math.sin(angle) * force;
      }

      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
      if (this.y < -10) this.y = height + 10;
      if (this.y > height + 10) this.y = -10;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(248, 223, 135, ${Math.max(0, this.alpha)})`;
      ctx.fill();
    }
  }

  function resize() {
    const heroSection = canvas.closest('.section-hero') || canvas.parentElement;
    if (!heroSection) return;

    width = heroSection.clientWidth;
    height = heroSection.clientHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    if (particles.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
  }

  function connectParticles() {
    const maxDist = 115;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(212, 175, 98, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    connectParticles();

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(loop);
    }
  }

  window.addEventListener('resize', () => {
    resize();
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => p.draw());
      connectParticles();
    }
  }, { passive: true });

  const heroSection = canvas.closest('.section-hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      mouse.x = -9999;
      mouse.y = -9999;
    }, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId && !prefersReducedMotion) {
          animationFrameId = requestAnimationFrame(loop);
        } else if (!isVisible && animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      });
    }, { threshold: 0.05 });

    observer.observe(heroSection);
  }

  resize();

  if (prefersReducedMotion) {
    particles.forEach((p) => p.draw());
    connectParticles();
  } else {
    animationFrameId = requestAnimationFrame(loop);
  }
}

export function initInteractions() {
  // ── 0. Atmospheric Golden Stardust Particle Canvas ──
  initHeroCanvas();

  // ── 1. Interactive Services Click & Deep-Dive Expansion ──
  const serviceCards = document.querySelectorAll('.service-card-mockup');
  const drawerContainer = document.querySelector('#service-drawer-container');

  if (serviceCards.length > 0 && drawerContainer) {
    serviceCards.forEach((card) => {
      // 3D Card Hover Tilt
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (-y / rect.height) * 8;
        const rotateY = (x / rect.width) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale3d(1.01, 1.01, 1.01)`;
      });

      card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('is-selected')) {
          card.style.transform = '';
        } else {
          card.style.transform = 'translateY(-2px)';
        }
      });

      // Card Click Handler
      card.addEventListener('click', () => {
        const serviceKey = card.getAttribute('data-service');
        if (!serviceKey || !SERVICES_DATA[serviceKey]) return;

        const isCurrentlySelected = card.classList.contains('is-selected');

        // Reset all cards
        serviceCards.forEach((c) => {
          c.classList.remove('is-selected');
          c.style.transform = '';
        });

        if (isCurrentlySelected) {
          // Collapse drawer
          drawerContainer.innerHTML = '';
          drawerContainer.style.display = 'none';
          return;
        }

        // Mark active
        card.classList.add('is-selected');
        card.style.transform = 'translateY(-2px)';

        const data = SERVICES_DATA[serviceKey];

        // Render Context Deep-Dive Drawer
        drawerContainer.style.display = 'block';
        drawerContainer.innerHTML = `
          <div class="service-detail-drawer" role="region" aria-live="polite">
            <div class="drawer-header">
              <div class="drawer-title-wrap">
                <img src="${data.icon}" alt="" width="32" height="32" aria-hidden="true">
                <div>
                  <h3 style="font-size: 1.5rem; font-weight: 700; color: #FFFFFF; margin-bottom: 2px;">
                    ${data.title}
                  </h3>
                  <span style="font-size: 0.85rem; color: var(--color-champagne-gold); font-family: var(--font-heading); font-weight: 600;">
                    ${data.subtitle}
                  </span>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span class="drawer-badge">${data.badge}</span>
                <button type="button" class="drawer-close-btn" id="drawer-close-btn" aria-label="Close service details">
                  <span>Close ×</span>
                </button>
              </div>
            </div>

            <p style="font-size: 0.95rem; color: var(--color-warm-ivory); line-height: 1.7; max-width: 82ch; margin-bottom: var(--space-6);">
              ${data.summary}
            </p>

            <div class="drawer-pillars-grid">
              ${data.pillars.map((p, idx) => `
                <div class="drawer-pillar-card">
                  <h4>
                    <span style="color: var(--color-champagne-gold); font-size: 0.85rem; font-weight: 800;">0${idx + 1}.</span>
                    ${p.title}
                  </h4>
                  <p>${p.desc}</p>
                </div>
              `).join('')}
            </div>

            <div style="margin-top: var(--space-6); padding-top: var(--space-4); border-top: 1px solid rgba(176, 141, 87, 0.2); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);">
              <div style="font-size: 0.8rem; color: var(--color-muted-stone);">
                <strong style="color: #FFFFFF;">Target Focus Areas:</strong> ${data.sectors}
              </div>
              <button type="button" class="btn" id="inquire-service-btn" data-category="${data.enquiryCategory}" data-service="${data.title}" style="background: linear-gradient(180deg, #F8DF87 0%, #D4AF62 55%, #B08D57 100%); color: #050505; font-weight: 700; border: none; padding: 0.65rem 1.45rem; border-radius: 6px; font-size: 0.85rem; cursor: pointer;">
                Inquire For This Mandate →
              </button>
            </div>
          </div>
        `;

        // Smooth scroll to details
        drawerContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Close button handler
        document.querySelector('#drawer-close-btn')?.addEventListener('click', () => {
          drawerContainer.innerHTML = '';
          drawerContainer.style.display = 'none';
          card.classList.remove('is-selected');
          card.style.transform = '';
        });

        // "Inquire For This Mandate" Button handler
        document.querySelector('#inquire-service-btn')?.addEventListener('click', (e) => {
          const btn = e.currentTarget;
          const cat = btn ? btn.getAttribute('data-category') : null;
          const serviceName = btn ? btn.getAttribute('data-service') : null;
          
          const contactSection = document.querySelector('#contact');
          const typeSelect = document.querySelector('#contact-type');
          const messageTextarea = document.querySelector('#contact-message');

          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }

          if (typeSelect && cat) {
            typeSelect.value = cat;
          }

          if (messageTextarea && serviceName) {
            messageTextarea.value = `Hello AR Investor's team,\n\nWe are interested in discussing an engagement regarding ${serviceName}.\n\nContext & Objectives: `;
            messageTextarea.focus();
          }
        });
      });
    });
  }

  // ── 2. Contact Form Live Submission & Delivery ──
  const contactForm = document.querySelector('#contact-form');
  const formStatus = document.querySelector('#form-status');

  if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');

      requiredFields.forEach((field) => {
        const group = field.closest('.form-group');
        const val = field.value.trim();

        if (!val) {
          isValid = false;
          group?.classList.add('has-error');
          field.setAttribute('aria-invalid', 'true');
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          isValid = false;
          group?.classList.add('has-error');
          field.setAttribute('aria-invalid', 'true');
        } else {
          group?.classList.remove('has-error');
          field.setAttribute('aria-invalid', 'false');
        }
      });

      if (!isValid) {
        const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid && typeof firstInvalid.focus === 'function') {
          firstInvalid.focus();
        }
        return;
      }

      const nameVal = contactForm.querySelector('#contact-name')?.value.trim() || '';
      const emailVal = contactForm.querySelector('#contact-email')?.value.trim() || '';
      const typeSelect = contactForm.querySelector('#contact-type');
      const serviceArea = typeSelect ? typeSelect.options[typeSelect.selectedIndex].text : 'General Inquiry';
      const messageVal = contactForm.querySelector('#contact-message')?.value.trim() || '';

      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Institutional Enquiry';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg style="animation: spin 1s linear infinite; display: inline-block; vertical-align: middle; margin-right: 8px;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/></svg>
          Transmitting Institutional Message...
        `;
      }

      if (formStatus) {
        formStatus.className = 'form-status pending';
        formStatus.innerHTML = `<strong>Routing Message:</strong> Transmitting your institutional mandate to <strong>info@arinvestors.in</strong>...`;
        formStatus.style.display = 'block';
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      const payload = {
        name: nameVal,
        email: emailVal,
        service_area: serviceArea,
        message: messageVal,
        _subject: `Institutional Inquiry: ${nameVal} (${serviceArea}) — AR Investor's`,
        _template: 'table',
        _captcha: 'false'
      };

      try {
        const response = await fetch('https://formsubmit.co/ajax/info@arinvestors.in', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json().catch(() => ({}));

        if (data.success === 'true' || data.success === true) {
          if (formStatus) {
            formStatus.className = 'form-status success';
            formStatus.innerHTML = `
              <strong>Message Delivered:</strong> Your institutional message has been transmitted directly to <strong>info@arinvestors.in</strong>. Our executive team in Doha will review your parameters and follow up promptly.
            `;
            formStatus.style.display = 'block';
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          contactForm.reset();
        } else if (data.message && data.message.includes('Activation')) {
          const mailtoUrl = `mailto:info@arinvestors.in?subject=${encodeURIComponent(`Institutional Inquiry: ${nameVal} (${serviceArea})`)}&body=${encodeURIComponent(`Name: ${nameVal}\nCorporate Email: ${emailVal}\nService Area: ${serviceArea}\n\nMessage:\n${messageVal}`)}`;
          if (formStatus) {
            formStatus.className = 'form-status success';
            formStatus.innerHTML = `
              <strong>Inquiry Transmitted to Mail Desk:</strong> FormSubmit requires a one-time inbox activation click at <strong>info@arinvestors.in</strong>. In parallel, your direct mail dispatch has been prepared below:<br>
              <a href="${mailtoUrl}" class="btn" style="display: inline-block; margin-top: 10px; background: #D4AF62; color: #050505; font-weight: 700; padding: 0.55rem 1.35rem; border-radius: 6px; font-size: 0.85rem; text-decoration: none;">
                Open Email Client (info@arinvestors.in) →
              </a>
            `;
            formStatus.style.display = 'block';
            formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          window.location.href = mailtoUrl;
        } else {
          throw new Error(data.message || 'Transmission response not OK');
        }
      } catch (err) {
        console.warn('FormSubmit AJAX fallback to mailto:', err);
        const mailtoUrl = `mailto:info@arinvestors.in?subject=${encodeURIComponent(`Institutional Inquiry: ${nameVal} (${serviceArea})`)}&body=${encodeURIComponent(`Name: ${nameVal}\nCorporate Email: ${emailVal}\nService Area: ${serviceArea}\n\nMessage:\n${messageVal}`)}`;

        if (formStatus) {
          formStatus.className = 'form-status pending';
          formStatus.innerHTML = `
            <strong>Direct Dispatch Ready:</strong> Your institutional message has been prepared for <strong>info@arinvestors.in</strong>.<br>
            <a href="${mailtoUrl}" class="btn" style="display: inline-block; margin-top: 10px; background: #D4AF62; color: #050505; font-weight: 700; padding: 0.55rem 1.35rem; border-radius: 6px; font-size: 0.85rem; text-decoration: none;">
              Dispatch via Email Client (info@arinvestors.in) →
            </a>
          `;
          formStatus.style.display = 'block';
          formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        window.location.href = mailtoUrl;
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });

    // Real-time error removal on input
    contactForm.querySelectorAll('.form-control').forEach((input) => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        group?.classList.remove('has-error');
        input.removeAttribute('aria-invalid');
      });
    });
  }

  // ── Footer Intelligence Dispatch Mailing Form ──
  const footerMailingForm = document.getElementById('footer-mailing-form');
  if (footerMailingForm) {
    const footerEmailInput = document.getElementById('footer-email-input');
    const footerMailingBtn = document.getElementById('footer-mailing-btn');
    const footerStatus = document.getElementById('footer-mailing-status');

    footerMailingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const emailVal = footerEmailInput ? footerEmailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(emailVal)) {
        if (footerStatus) {
          footerStatus.style.display = 'block';
          footerStatus.style.color = '#FF8080';
          footerStatus.textContent = 'Please enter a valid institutional email address.';
        }
        footerEmailInput?.focus();
        return;
      }

      const origBtnText = footerMailingBtn ? footerMailingBtn.innerHTML : 'Subscribe to Memos';
      if (footerMailingBtn) {
        footerMailingBtn.disabled = true;
        footerMailingBtn.innerHTML = 'Subscribing...';
      }

      if (footerStatus) {
        footerStatus.style.display = 'block';
        footerStatus.style.color = '#FFF0B8';
        footerStatus.textContent = 'Transmitting subscription to info@arinvestors.in...';
      }

      const payload = {
        email: emailVal,
        _subject: `New Market Intelligence Dispatch Subscription: ${emailVal} — AR Investor's`,
        _template: 'table',
        _captcha: 'false'
      };

      try {
        const res = await fetch('https://formsubmit.co/ajax/info@arinvestors.in', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await res.json().catch(() => ({}));

        if (data.success === 'true' || data.success === true) {
          if (footerStatus) {
            footerStatus.style.color = '#90EE90';
            footerStatus.innerHTML = `<strong>Subscribed:</strong> ${emailVal} added to executive dispatch registry.`;
          }
          footerMailingForm.reset();
        } else {
          // Direct mailto fallback
          const mailto = `mailto:info@arinvestors.in?subject=${encodeURIComponent('Subscription: Executive Market Memorandums')}&body=${encodeURIComponent(`Please register my corporate email (${emailVal}) for AR Investor's quarterly executive memorandums and market intelligence.`)}`;
          if (footerStatus) {
            footerStatus.style.color = '#FFF0B8';
            footerStatus.innerHTML = `Subscription recorded. <a href="${mailto}" style="color: #F8DF87; text-decoration: underline;">Confirm via email client</a>.`;
          }
          window.location.href = mailto;
        }
      } catch (err) {
        const mailto = `mailto:info@arinvestors.in?subject=${encodeURIComponent('Subscription: Executive Market Memorandums')}&body=${encodeURIComponent(`Please register my corporate email (${emailVal}) for AR Investor's quarterly executive memorandums and market intelligence.`)}`;
        if (footerStatus) {
          footerStatus.style.color = '#FFF0B8';
          footerStatus.innerHTML = `Opening email client. <a href="${mailto}" style="color: #F8DF87; text-decoration: underline;">Click here if not redirected</a>.`;
        }
        window.location.href = mailto;
      } finally {
        if (footerMailingBtn) {
          footerMailingBtn.disabled = false;
          footerMailingBtn.innerHTML = origBtnText;
        }
      }
    });
  }
}
