import { HelmetProvider } from 'react-helmet-async';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Services } from '@/sections/Services';
import { Regions } from '@/sections/Regions';
import { Portfolio } from '@/sections/Portfolio';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import { SEO } from '@/components/SEO';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { useActiveSection } from '@/hooks/useActiveSection';

const SECTION_IDS = ['home', 'about', 'services', 'portfolio', 'contact'];

export default function App() {
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <HelmetProvider>
      <SEO />
      <Header activeSection={activeSection} />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <Regions />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </HelmetProvider>
  );
}
