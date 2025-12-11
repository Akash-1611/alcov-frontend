import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Faster, smoother loading
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400); // Faster transition
          return 100;
        }
        return prev + Math.random() * 20; // Faster progress
      });
    }, 80); // More frequent updates for smoothness

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
        exit={{ 
          clipPath: 'circle(0% at 50% 50%)',
          transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] } // Smoother exit
        }}
        style={{ willChange: 'clip-path' }} // GPU acceleration
      >
        {/* Logo animation with fire effect */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 relative"
        >
          {/* Glow orbs behind text */}
          <motion.div
            className="absolute inset-0 -z-10 blur-3xl"
            animate={{
              background: [
                'radial-gradient(circle, hsl(45 100% 55% / 0.4) 0%, transparent 70%)',
                'radial-gradient(circle, hsl(0 60% 35% / 0.5) 0%, transparent 70%)',
                'radial-gradient(circle, hsl(355 75% 45% / 0.4) 0%, transparent 70%)',
                'radial-gradient(circle, hsl(45 100% 55% / 0.4) 0%, transparent 70%)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <motion.span 
            className="text-6xl md:text-8xl font-display font-extrabold text-gradient relative"
            animate={{ 
              textShadow: [
                '0 0 30px hsl(45 100% 55% / 0.5), 0 0 60px hsl(0 60% 35% / 0.3)',
                '0 0 50px hsl(45 100% 55% / 0.8), 0 0 90px hsl(0 60% 35% / 0.6)',
                '0 0 30px hsl(45 100% 55% / 0.5), 0 0 60px hsl(0 60% 35% / 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ALCOVIA
          </motion.span>
        </motion.div>

        {/* Progress bar with gradient */}
        <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden relative">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, hsl(45 100% 55%), hsl(0 60% 35%), hsl(355 75% 45%))',
              boxShadow: '0 0 20px hsl(45 100% 55% / 0.6)'
            }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.1 }}
          />
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-50"
            style={{
              background: 'linear-gradient(90deg, hsl(45 100% 55% / 0.3), hsl(0 60% 35% / 0.3))',
              filter: 'blur(8px)'
            }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Loading text */}
        <motion.p
          className="mt-4 text-muted-foreground font-body text-sm tracking-widest uppercase"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Building Legacy
        </motion.p>

        {/* Animated fire particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${8 + (i % 3) * 2}px`,
              height: `${8 + (i % 3) * 2}px`,
              background: i % 3 === 0 
                ? 'radial-gradient(circle, hsl(45 100% 55%), hsl(0 60% 35%))' 
                : i % 3 === 1 
                ? 'radial-gradient(circle, hsl(0 60% 35%), hsl(355 75% 45%))'
                : 'radial-gradient(circle, hsl(355 75% 45%), hsl(45 100% 55%))',
              boxShadow: `0 0 20px ${i % 3 === 0 ? 'hsl(45 100% 55%)' : i % 3 === 1 ? 'hsl(0 60% 35%)' : 'hsl(355 75% 45%)'}`
            }}
            initial={{ 
              x: 0, 
              y: 0,
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              x: Math.cos(i * 45 * Math.PI / 180) * 180,
              y: Math.sin(i * 45 * Math.PI / 180) * 180,
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
