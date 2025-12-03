import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ManifestoSection from '@/components/ManifestoSection';
import OfferingsGrid from '@/components/OfferingsGrid';
import SchoolToggle from '@/components/SchoolToggle';
import SocialsFooter from '@/components/SocialsFooter';

const Index = () => {
  return (
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
  );
};

export default Index;
