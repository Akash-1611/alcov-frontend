import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollReveal from '@/components/ScrollReveal';
import ScrollProgress from '@/components/ScrollProgress';
import FloatingParticles from '@/components/FloatingParticles';
import MouseTrail from '@/components/MouseTrail';
import InteractiveBackground from '@/components/InteractiveBackground';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import PremiumEdTechHero from '@/components/PremiumEdTechHero';

import ManifestoSection from '@/components/ManifestoSection';
import OfferingsGrid from '@/components/OfferingsGrid';
import ProgramsShowcase from '@/components/ProgramsShowcase';
import StatsSection from '@/components/StatsSection';
import SchoolToggle from '@/components/SchoolToggle';
import MeetTheTeam from '@/components/MeetTheTeam';
import PhotoGallery from '@/components/PhotoGallery';
import ParentTestimonials from '@/components/ParentTestimonials';
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
            <FloatingParticles />
            <MouseTrail />
            <InteractiveBackground />
            <ScrollProgress />
            
            {/* Noise overlay for texture */}
            <div className="noise-overlay" />
            
            {/* Navigation */}
            <Navbar />
            

            
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
              
              <section id="showcase">
                <ScrollReveal variant="fade" delay={0.2}>
                  <ProgramsShowcase />
                </ScrollReveal>
              </section>
              
              <section id="stats">
                <ScrollReveal variant="scale" delay={0.2}>
                  <StatsSection />
                </ScrollReveal>
              </section>
              
              <section id="school">
                <ScrollReveal variant="flip" delay={0.2}>
                  <SchoolToggle />
                </ScrollReveal>
              </section>
              
              <section id="team">
                <ScrollReveal variant="fade" delay={0.1}>
                  <MeetTheTeam />
                </ScrollReveal>
              </section>
              
              <section id="gallery">
                <ScrollReveal variant="zoom" delay={0.2}>
                  <PhotoGallery />
                </ScrollReveal>
              </section>
              
              <section id="testimonials">
                <ScrollReveal variant="fade" delay={0.1}>
                  <ParentTestimonials />
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
