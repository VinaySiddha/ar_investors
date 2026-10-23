/**
 * AR Investor's — Navigation & SPA Scrollspy Controller
 * Handles mobile drawer, accessible states, smooth scrolling, and active link tracking
 */

export function initNavigation() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const menuWrapper = document.querySelector('.nav-menu-wrapper');
  const navLinks = document.querySelectorAll('.nav-link');

  // 1. Header scroll styling
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Mobile Menu Toggle
  if (toggleBtn && menuWrapper) {
    const openMenu = () => {
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.setAttribute('aria-label', 'Close navigation menu');
      menuWrapper.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      const firstLink = menuWrapper.querySelector('a');
      if (firstLink) firstLink.focus();
    };

    const closeMenu = () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Open navigation menu');
      menuWrapper.classList.remove('is-open');
      document.body.style.overflow = '';
      toggleBtn.focus();
    };

    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuWrapper.classList.contains('is-open')) {
        closeMenu();
      }
    });

    // Close when clicking a nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (menuWrapper.classList.contains('is-open')) {
          closeMenu();
        }
      });
    });
  }

  // 3. SPA Smooth Scrolling & Hash Routing
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Check if it's an anchor on this page
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const headerHeight = header ? header.offsetHeight : 70;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight + 5;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          history.pushState(null, '', href);
        }
      }
    });
  });

  // 4. Scrollspy for SPA Sections
  const sections = document.querySelectorAll('section[id], header[id]');
  if (sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}` || (id === 'home' && href === '/')) {
              link.classList.add('is-active');
              link.setAttribute('aria-current', 'page');
            } else if (href.startsWith('#')) {
              link.classList.remove('is-active');
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((sec) => observer.observe(sec));
  }
}
