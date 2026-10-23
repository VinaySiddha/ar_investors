/**
 * AR Investor's — Main Application Entry Point
 * Lightweight, zero-dependency, standards-compliant
 */

import { initNavigation } from './navigation.js';
import { initInteractions } from './interactions.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearSpans = document.querySelectorAll('.copyright-year');
  const currentYear = new Date().getFullYear();
  yearSpans.forEach((span) => {
    span.textContent = currentYear.toString();
  });

  // 2. Initialize Navigation System
  initNavigation();

  // 3. Initialize Interactions & Form Handlers
  initInteractions();
});
