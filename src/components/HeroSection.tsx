import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background with fire theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-alcovia-black via-alcovia-darker to-alcovia-black" />
      
      {/* Multiple animated gradient orbs for depth */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(12 100% 60% / 0.4) 0%, hsl(350 89% 60% / 0.2) 40%, transparent 70%)',
          y,
          left: '10%',
          top: '20%'
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-25 blur-2xl"
        style={{
          background: 'radial-gradient(circle, hsl(350 89% 60% / 0.4) 0%, hsl(340 100% 65% / 0.2) 40%, transparent 70%)',
          y: useTransform(scrollYProgress, [0, 1], [0, -150]),
          right: '10%',
          top: '30%'
        }}
        animate={{
          scale: [1, 1.4, 1],
          x: [0, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 3 === 0 ? 'hsl(12 100% 60%)' : i % 3 === 1 ? 'hsl(350 89% 60%)' : 'hsl(340 100% 65%)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        style={{ opacity, scale }}
      >
        {/* Pre-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-primary font-body text-sm md:text-base tracking-[0.3em] uppercase mb-6"
        >
          Building Future Leaders
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hero-text text-5xl md:text-7xl lg:text-9xl mb-8"
        >
          <span className="text-foreground">Become an</span>
          <br />
          <span className="text-gradient">Alcovian</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 font-body"
        >
          Join a community of driven teens building their legacy through mentorship, 
          self-discovery, and unprecedented learning experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
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

      {/* Grid overlay with orange glow */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(hsl(12 100% 60% / 0.15) 1px, transparent 1px),
            linear-gradient(90deg, hsl(350 89% 60% / 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }} />
      </div>
      
      {/* Animated corner accents */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-alcovia-orange opacity-50"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-alcovia-red opacity-50"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-alcovia-deep-orange opacity-50"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-alcovia-pink opacity-50"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />
    </section>
  );
};

export default HeroSection;
