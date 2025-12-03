import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EnhancedHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroFrontRef = useRef<HTMLDivElement>(null);
  const heroMidRef = useRef<HTMLDivElement>(null);
  const heroBackRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Three-layer parallax
  const yBack = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Mask reveal animation for hero front
      if (heroFrontRef.current) {
        gsap.from(heroFrontRef.current, {
          clipPath: 'inset(0 100% 0 0)',
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.5,
        });
      }

      // Staggered entrance for mid layer
      if (heroMidRef.current) {
        gsap.from(heroMidRef.current, {
          opacity: 0,
          y: 100,
          scale: 0.8,
          duration: 1.2,
          ease: 'back.out(1.4)',
          delay: 0.8,
        });
      }

      // Background fade in
      if (heroBackRef.current) {
        gsap.from(heroBackRef.current, {
          opacity: 0,
          scale: 1.2,
          duration: 1.5,
          ease: 'power2.out',
        });
      }

      // Slow blob rotation
      if (blob1Ref.current) {
        gsap.to(blob1Ref.current, {
          rotation: 360,
          duration: 20,
          ease: 'none',
          repeat: -1,
        });
      }

      if (blob2Ref.current) {
        gsap.to(blob2Ref.current, {
          rotation: -360,
          duration: 25,
          ease: 'none',
          repeat: -1,
        });
      }

      // Content stagger
      gsap.from('.hero-content-item', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Layer with Blobs */}
      <motion.div
        ref={heroBackRef}
        className="absolute inset-0 z-0"
        style={{ y: yBack }}
      >
        {/* Blurred Abstract Background */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-alcovia-black via-alcovia-darker to-alcovia-dark"
          style={{
            backgroundImage: 'url(/alcovia-hero-back.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(40px)',
            opacity: 0.3,
          }}
        />
        
        {/* SVG Blob 1 */}
        <div
          ref={blob1Ref}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(12 100% 60% / 0.4) 0%, transparent 70%)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            filter: 'blur(60px)',
          }}
        />
        
        {/* SVG Blob 2 */}
        <div
          ref={blob2Ref}
          className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(350 89% 60% / 0.4) 0%, transparent 70%)',
            borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* Mid Layer - Product UI Card */}
      <motion.div
        ref={heroMidRef}
        className="absolute right-10 md:right-20 top-1/2 -translate-y-1/2 z-10 hidden lg:block"
        style={{ y: yMid }}
      >
        <img 
          src="/alcovia-hero-mid.svg" 
          alt="Alcovia Dashboard" 
          className="w-80 xl:w-96 drop-shadow-[0_0_40px_rgba(255,107,53,0.3)]"
        />
      </motion.div>

      {/* Front Layer - Student on Laptop */}
      <motion.div
        ref={heroFrontRef}
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{ y: yFront }}
      >
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Placeholder for student image - replace with actual image */}
          <div className="w-full h-[400px] md:h-[500px] bg-gradient-to-t from-alcovia-dark/50 to-transparent flex items-end justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-t-full bg-gradient-to-br from-alcovia-orange/20 to-alcovia-red/20 backdrop-blur-sm border-t-2 border-x-2 border-alcovia-orange/30" />
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div 
        ref={contentRef}
        className="relative z-30 text-center px-6 max-w-5xl mx-auto"
        style={{ opacity }}
      >
        {/* Pre-headline */}
        <motion.p
          className="hero-content-item text-primary font-body text-sm md:text-base tracking-[0.3em] uppercase mb-6"
        >
          Building Future Leaders
        </motion.p>

        {/* Main headline */}
        <motion.h1
          className="hero-content-item hero-text text-5xl md:text-7xl lg:text-9xl mb-8"
        >
          <span className="text-foreground">Become an</span>
          <br />
          <span className="text-gradient">Alcovian</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="hero-content-item text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 font-body"
        >
          Join a community of driven teens building their legacy through mentorship, 
          self-discovery, and unprecedented learning experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="hero-content-item flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
          </motion.button>
          <motion.button
            className="btn-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator with enhanced glow */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.p
          className="text-xs tracking-widest text-muted-foreground uppercase mb-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.p>
        <motion.div
          className="w-6 h-10 border-2 rounded-full flex justify-center relative"
          style={{
            borderColor: 'hsl(12 100% 60% / 0.5)',
            boxShadow: '0 0 20px hsl(12 100% 60% / 0.3)'
          }}
          animate={{ 
            y: [0, 10, 0],
            boxShadow: [
              '0 0 20px hsl(12 100% 60% / 0.3)',
              '0 0 30px hsl(350 89% 60% / 0.5)',
              '0 0 20px hsl(12 100% 60% / 0.3)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full mt-2"
            style={{
              background: 'linear-gradient(to bottom, hsl(12 100% 60%), hsl(350 89% 60%))',
              boxShadow: '0 0 10px hsl(12 100% 60%)'
            }}
            animate={{ 
              y: [0, 12, 0], 
              opacity: [1, 0, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EnhancedHero;

