import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ManifestoSection from '@/components/ManifestoSection';
import OfferingsGrid from '@/components/OfferingsGrid';
import SchoolToggle from '@/components/SchoolToggle';
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
            {/* Custom Cursor */}
            <CustomCursor />
            
            {/* Noise overlay for texture */}
            <div className="noise-overlay" />
            
            {/* Navigation */}
            <Navbar />
            
            {/* Main Content */}
            <main>
              <HeroSection />
              <ManifestoSection />
              <OfferingsGrid />
              <SchoolToggle />
              <SocialsFooter />
            </main>
          </div>
        </SmoothScroll>
      )}
    </>
  );
};

export default Index;
