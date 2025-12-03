import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollReveal from '@/components/ScrollReveal';
import ScrollProgress from '@/components/ScrollProgress';
import FloatingParticles from '@/components/FloatingParticles';
import InteractiveBackground from '@/components/InteractiveBackground';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import PremiumEdTechHero from '@/components/PremiumEdTechHero';
import StickyBookDemo from '@/components/StickyBookDemo';
import ManifestoSection from '@/components/ManifestoSection';
import OfferingsGrid from '@/components/OfferingsGrid';
import SchoolToggle from '@/components/SchoolToggle';
import MeetTheTeam from '@/components/MeetTheTeam';
import SocialsFooter from '@/components/SocialsFooter';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scroll during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <SmoothScroll>
          <div className="relative min-h-screen bg-background overflow-hidden">
            {/* Interactive Elements */}
            <CustomCursor />
            <FloatingParticles />
            <InteractiveBackground />
            <ScrollProgress />
            
            {/* Noise overlay for texture */}
            <div className="noise-overlay" />
            
            {/* Navigation */}
            <Navbar />
            
            {/* Sticky Book Demo CTA */}
            <StickyBookDemo />
            
            {/* Main Content */}
            <main>
              <section id="hero">
                <PremiumEdTechHero />
              </section>
              
              <section id="manifesto">
                <ScrollReveal variant="blur" delay={0.2}>
                  <ManifestoSection />
                </ScrollReveal>
              </section>
              
              <section id="offerings">
                <ScrollReveal variant="zoom" delay={0.3}>
                  <OfferingsGrid />
                </ScrollReveal>
              </section>
              
              <section id="school">
                <ScrollReveal variant="flip" delay={0.2}>
                  <SchoolToggle />
                </ScrollReveal>
              </section>
              
              <section id="team">
                <ScrollReveal variant="elastic" delay={0.4}>
                  <MeetTheTeam />
                </ScrollReveal>
              </section>
              
              <ScrollReveal variant="slide" direction="up" delay={0.1}>
                <SocialsFooter />
              </ScrollReveal>
            </main>
          </div>
        </SmoothScroll>
      )}
    </>
  );
};

export default Index;
