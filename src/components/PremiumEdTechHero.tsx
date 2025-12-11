import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PremiumEdTechHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Mouse position for 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse movement
  const springConfig = { stiffness: 100, damping: 25 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // 3D parallax transforms for different layers
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);
  
  // Layer movements - foreground moves most, background least
  const foregroundX = useTransform(mouseXSpring, [-0.5, 0.5], [-40, 40]);
  const foregroundY = useTransform(mouseYSpring, [-0.5, 0.5], [-40, 40]);
  
  const midLayerX = useTransform(mouseXSpring, [-0.5, 0.5], [-25, 25]);
  const midLayerY = useTransform(mouseYSpring, [-0.5, 0.5], [-25, 25]);
  
  const backgroundX = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);
  const backgroundY = useTransform(mouseYSpring, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    // Check for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsLoaded(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsLoaded(true)
      });

      // Kid opening laptop animation
      tl.from('.laptop-kid', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.4,
        ease: 'power3.inOut',
        delay: 0.2,
      })
      // Laptop screen glow appears
      .from('.laptop-glow', {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.6')
      // Mid-layer UI card entrance
      .from('.mid-layer-card', {
        opacity: 0,
        y: 80,
        rotateX: -20,
        duration: 1,
        ease: 'back.out(1.2)',
      }, '-=0.5')
      // Split mask reveal for hero content
      .from('.hero-mask-left', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1,
        ease: 'power3.inOut',
      }, '-=0.7')
      .from('.hero-mask-right', {
        clipPath: 'inset(0 0 0 100%)',
        duration: 1,
        ease: 'power3.inOut',
      }, '-=1')
      // Headline entrance
      .from('.hero-headline span', {
        y: 80,
        opacity: 0,
        rotateX: -60,
        stagger: 0.04,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.5')
      // Subheadline soft fade
      .from('.hero-subheadline', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3')
      // CTA buttons scale in
      .from('.hero-cta', {
        scale: 0.8,
        opacity: 0,
        stagger: 0.08,
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.2');

      // Continuous floating shapes animation
      gsap.to('.float-shape-1', {
        y: '-=30',
        x: '+=20',
        rotation: '+=360',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.float-shape-2', {
        y: '+=40',
        x: '-=30',
        rotation: '-=360',
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.float-shape-3', {
        y: '-=25',
        x: '-=15',
        rotation: '+=180',
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Handle mouse move for 3D parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || prefersReducedMotion) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-alcovia-black"
      style={{ perspective: '1000px' }}
    >
      {/* Soft Animated Background Shapes */}
      <div className="absolute inset-0 z-0 opacity-30">
        {/* Real Photo Background - Subtle */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/addition/General Website Photos/photo-3.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(60px) brightness(0.3)',
          }}
        />
        
        {/* Shape 1 - Large gradient blob */}
        <motion.div
          className="float-shape-1 absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, hsl(45 100% 55% / 0.3) 0%, transparent 70%)',
            x: backgroundX,
            y: backgroundY,
          }}
        />
        
        {/* Shape 2 - Medium red blob */}
        <motion.div
          className="float-shape-2 absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, hsl(0 60% 35% / 0.3) 0%, transparent 70%)',
            x: backgroundX,
            y: backgroundY,
          }}
        />
        
        {/* Shape 3 - Small accent */}
        <motion.div
          className="float-shape-3 absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(circle, hsl(355 75% 45% / 0.25) 0%, transparent 70%)',
            x: backgroundX,
            y: backgroundY,
          }}
        />

        {/* Geometric grid overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
              backgroundImage: `
              linear-gradient(hsl(45 100% 55% / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(0 60% 35% / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Background Layer - Abstract shapes */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          x: backgroundX,
          y: backgroundY,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-alcovia-black/50 via-transparent to-alcovia-darker/50" />
        
        {/* Floating Educational Graphics */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <svg viewBox="0 0 64 64" className="w-full h-full text-alcovia-orange">
            <path d="M32 8L40 24H24L32 8Z" fill="currentColor" opacity="0.6" />
            <rect x="20" y="24" width="24" height="32" rx="4" fill="currentColor" opacity="0.4" />
            <circle cx="32" cy="40" r="6" fill="currentColor" />
          </svg>
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-16 w-20 h-20 opacity-15"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        >
          <svg viewBox="0 0 64 64" className="w-full h-full text-alcovia-red">
            <rect x="8" y="16" width="48" height="32" rx="6" fill="currentColor" opacity="0.5" />
            <rect x="12" y="20" width="40" height="2" fill="currentColor" />
            <rect x="12" y="26" width="32" height="2" fill="currentColor" />
            <rect x="12" y="32" width="36" height="2" fill="currentColor" />
            <circle cx="48" cy="40" r="4" fill="currentColor" />
          </svg>
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 left-20 w-12 h-12 opacity-25"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        >
          <svg viewBox="0 0 64 64" className="w-full h-full text-alcovia-orange">
            <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.3" />
            <path d="M20 32L28 40L44 24" stroke="currentColor" strokeWidth="3" fill="none" />
          </svg>
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 right-24 w-14 h-14 opacity-20"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 64 64" className="w-full h-full text-alcovia-red">
            <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6" />
            <circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.8" />
            <circle cx="32" cy="32" r="4" fill="currentColor" />
          </svg>
        </motion.div>
      </motion.div>

      {/* EdTech Visual Elements */}
      <motion.div
        className="absolute left-10 lg:left-20 top-1/4 z-15 hidden lg:block"
        style={{
          x: midLayerX,
          y: midLayerY,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Animated Book Stack */}
        <motion.div
          className="relative w-32 h-40 mb-8"
          initial={{ opacity: 0, rotateY: -90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ delay: 1, duration: 1.2 }}
          whileHover={{ scale: 1.1, rotateY: 15 }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-28 h-8 rounded-r-lg border-l-4"
              style={{
                bottom: `${i * 8}px`,
                left: `${i * 2}px`,
                background: `linear-gradient(135deg, hsl(${45 + i * 30} 100% ${55 + i * 5}%), hsl(${0 + i * 20} 60% ${35 + i * 5}%))`,
                borderColor: `hsl(${45 + i * 30} 100% ${45 + i * 5}%)`,
                boxShadow: `0 4px 15px hsl(${45 + i * 30} 100% 55% / 0.3)`
              }}
              animate={{
                y: [0, -2, 0],
                rotateZ: [0, 1, 0]
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-r-lg" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Mid Layer - Product UI Card */}
      <motion.div
        className="mid-layer-card absolute top-1/2 -translate-y-1/2 z-20 hidden lg:block"
        style={{
          right: 'clamp(0.5rem, 1.5rem, max(1.5rem, calc(100vw - 26rem)))',
          maxWidth: 'min(24rem, calc(100vw - 4rem))',
          x: midLayerX,
          y: midLayerY,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05, rotateY: 5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glowing card background */}
          <div className="absolute inset-0 bg-gradient-to-br from-alcovia-orange/30 to-alcovia-red/30 rounded-3xl blur-2xl" />
          
          {/* Enhanced UI Card */}
          <div className="relative w-72 sm:w-80 xl:w-96 max-w-[min(24rem,calc(100vw-4rem))] p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border-2 border-alcovia-orange/40 bg-gradient-to-br from-alcovia-darker/80 via-alcovia-black/60 to-alcovia-darker/80 backdrop-blur-xl overflow-hidden">
            {/* Animated Background Pattern */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, hsl(45 100% 55% / 0.3) 0%, transparent 50%),
                                 radial-gradient(circle at 80% 20%, hsl(0 60% 35% / 0.3) 0%, transparent 50%),
                                 radial-gradient(circle at 40% 80%, hsl(355 75% 45% / 0.2) 0%, transparent 50%)`
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-alcovia-orange/60"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 3) * 30}%`
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}

            {/* Card Header with Enhanced Design */}
            <div className="relative flex items-center gap-4 mb-8">
              <motion.div 
                className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-alcovia-orange via-alcovia-red to-alcovia-deep-orange flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                style={{
                  boxShadow: '0 8px 32px hsl(45 100% 55% / 0.4), 0 0 40px hsl(0 60% 35% / 0.3)'
                }}
              >
                <span className="text-white font-display font-bold text-2xl relative z-10">A</span>
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <motion.h3 
                  className="text-foreground font-display font-bold text-xl mb-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  Learning Progress
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  Your Growth Journey
                </motion.p>
              </div>
            </div>

            {/* Enhanced Progress Stats */}
            <div className="space-y-6 mb-8">
              {[
                { label: 'Skills Mastered', value: '85%', width: '85%', color: 'from-alcovia-orange to-alcovia-red' },
                { label: 'Goals Achieved', value: '72%', width: '72%', color: 'from-alcovia-red to-alcovia-pink' },
                { label: 'Mentor Sessions', value: '94%', width: '94%', color: 'from-alcovia-deep-orange to-alcovia-orange' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + i * 0.2 }}
                  className="relative"
                >
                  <div className="flex justify-between mb-3">
                    <span className="text-foreground text-sm font-semibold">{stat.label}</span>
                    <motion.span 
                      className="text-primary font-bold text-sm"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ delay: 2 + i * 0.2, duration: 0.5 }}
                    >
                      {stat.value}
                    </motion.span>
                  </div>
                  <div className="relative h-3 bg-muted/30 rounded-full overflow-hidden border border-border/20">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${stat.color} rounded-full relative`}
                      initial={{ width: 0 }}
                      animate={{ width: stat.width }}
                      transition={{ delay: 1.8 + i * 0.2, duration: 1.2, ease: "easeOut" }}
                      style={{
                        boxShadow: `0 0 20px hsl(45 100% 55% / 0.4)`
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ delay: 2.5 + i * 0.2, duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Trust Badge */}
            <motion.div 
              className="relative flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/30 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ delay: 3, duration: 2, repeat: Infinity }}
                style={{
                  boxShadow: '0 4px 20px hsl(45 100% 55% / 0.3)'
                }}
              >
                <svg className="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <div>
                <span className="text-foreground text-sm font-semibold block">Verified Platform</span>
                <span className="text-muted-foreground text-xs">Trusted by 1000+ Students</span>
              </div>
              
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ delay: 3.5, duration: 2, repeat: Infinity, repeatDelay: 4 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Foreground Layer - Student with Laptop */}
      <motion.div
        className="laptop-kid absolute bottom-0 left-0 right-0 z-30 pointer-events-none"
        style={{
          x: foregroundX,
          y: foregroundY,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-end">
          {/* Laptop glow effect behind student */}
          <motion.div
            className="laptop-glow absolute bottom-20 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, hsl(45 100% 55% / 0.4) 0%, hsl(0 60% 35% / 0.2) 50%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Enhanced Student Photo with 3D Effect */}
          <motion.div
            className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: "backOut" }}
            style={{ perspective: 1000 }}
          >
            {/* 3D Rotating Image */}
            <motion.div
              className="relative w-full h-full"
              animate={{
                y: [0, -15, 0],
                rotateY: [0, 5, 0, -5, 0],
              }}
              transition={{
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                rotateY: { duration: 10, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.img 
                src="/addition/General Website Photos/photo-6.jpg" 
                alt="Alcovia students learning" 
                className="w-full h-full object-cover rounded-3xl border-4 border-alcovia-orange/40"
                style={{
                  boxShadow: '0 20px 50px rgba(218,165,32,0.5), 0 0 80px hsl(45 100% 55% / 0.3)',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
                loading="eager"
                decoding="async"
              />
              
              {/* Animated corner accents */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className={`absolute w-12 h-12 border-2 border-alcovia-orange ${
                    i === 0 ? 'top-2 left-2 border-r-0 border-b-0' :
                    i === 1 ? 'top-2 right-2 border-l-0 border-b-0' :
                    i === 2 ? 'bottom-2 left-2 border-r-0 border-t-0' :
                    'bottom-2 right-2 border-l-0 border-t-0'
                  } rounded-xl`}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
              
              {/* Shine overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-3xl"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            </motion.div>
            
            {/* Enhanced EdTech Elements around student */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute opacity-60"
                style={{
                  left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 140}px`,
                  top: `${50 + Math.sin(i * 45 * Math.PI / 180) * 140}px`,
                  width: i % 2 === 0 ? '32px' : '28px',
                  height: i % 2 === 0 ? '32px' : '28px'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 0.6,
                  y: [0, -20, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  scale: { delay: 2 + i * 0.1, duration: 0.5 },
                  opacity: { delay: 2 + i * 0.1, duration: 0.5 },
                  y: { duration: 5 + i * 0.3, repeat: Infinity, delay: i * 0.4 },
                  rotate: { duration: 15 + i * 2, repeat: Infinity, ease: "linear" }
                }}
              >
                <div className="w-full h-full rounded-lg bg-gradient-to-br from-alcovia-orange/80 to-alcovia-red/60 flex items-center justify-center border border-alcovia-orange/30" style={{
                  boxShadow: `0 4px 15px hsl(${45 + i * 20} 100% 55% / 0.4)`
                }}>
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                    {i % 4 === 0 && <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />}
                    {i % 4 === 1 && <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M19 19H5V5H19V19Z" />}
                    {i % 4 === 2 && <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H15.5L20.5 19L19 20.5L14 15.5V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3M9.5 5C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z" />}
                    {i % 4 === 3 && <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1L9 7V9H21M12 10C10.9 10 10 10.9 10 12S10.9 14 12 14S14 13.1 14 12S13.1 10 12 10Z" />}
                  </svg>
                </div>
              </motion.div>
            ))}
            
            {/* Extra glow around student for emphasis */}
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl opacity-30"
              style={{
                background: 'radial-gradient(circle at center, hsl(45 100% 55% / 0.3), transparent 60%)',
              }}
              animate={{
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          {/* Social Proof Stats Below Student */}
          <motion.div
            className="mt-responsive flex flex-col items-center justify-center gap-responsive"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
          >
            {[
              { label: '10K+', sublabel: 'Students' },
              { label: '50+', sublabel: 'Mentors' },
              { label: '95%', sublabel: 'Success Rate' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-3 sm:p-4 rounded-xl bg-alcovia-black/70 backdrop-blur-md border border-alcovia-orange/30">
                <div className="text-responsive-2xl font-display font-bold text-white drop-shadow-lg">
                  {stat.label}
                </div>
                <div className="text-responsive-xs text-alcovia-orange font-semibold">{stat.sublabel}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Hero Content - Center */}
      <motion.div
        className="relative z-40 text-center px-4 sm:px-6 w-full max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32 pb-[400px] sm:pb-[450px] lg:pb-[500px]"
        style={{
          rotateX: useTransform(rotateX, (val) => val / 3),
          rotateY: useTransform(rotateY, (val) => val / 3),
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Trust Badge */}
        <motion.div
          className="hero-mask-left inline-flex items-center gap-2 px-4 py-2 rounded-full bg-alcovia-darker/60 backdrop-blur-md border border-alcovia-orange/30 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-primary font-body text-xs sm:text-sm tracking-wide">
            Trusted by 10,000+ Students Worldwide
          </span>
        </motion.div>

        {/* Headline with split animation */}
        <div className="hero-headline mb-responsive overflow-hidden">
          <h1 className="hero-text">
            {['Build', 'Your', 'Future,'].map((word, i) => (
              <span key={i} className="inline-block mr-4 md:mr-6">
                <span className="text-foreground">{word}</span>
              </span>
            ))}
            <br />
            {['One', 'Lesson', 'at', 'a', 'Time'].map((word, i) => (
              <span key={i} className="inline-block mr-3 md:mr-4">
                <span className="text-gradient">{word}</span>
              </span>
            ))}
          </h1>
        </div>

        {/* Subheadline */}
        <motion.p
          className="hero-subheadline text-muted-foreground text-responsive-lg max-w-4xl mx-auto mb-responsive font-body leading-relaxed"
        >
          Join Alcovia&apos;s transformative learning journey. Get personalized mentorship from 
          Harvard &amp; UCL professionals, build real-world skills, and connect with driven peers 
          who share your ambition.
        </motion.p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-responsive justify-center items-center mb-responsive">
          <motion.button
            className="hero-cta btn-primary group relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -2, rotateX: 5 }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="relative z-10">Start Your Journey</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-alcovia-red to-alcovia-orange opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            />
          </motion.button>
          
          <motion.button
            className="hero-cta btn-outline group relative"
            whileHover={{ scale: 1.05, y: -2, rotateX: -5 }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="relative z-10">Watch Demo</span>
            <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-alcovia-orange/20 to-alcovia-red/20 opacity-0 group-hover:opacity-100 rounded-full"
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>


      </motion.div>



      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
        transition={{ delay: 3 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center p-2">
            <motion.div
              className="w-1.5 h-3 rounded-full bg-gradient-to-b from-alcovia-orange to-alcovia-red"
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PremiumEdTechHero;

