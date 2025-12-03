import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
        exit={{ 
          clipPath: 'circle(0% at 50% 50%)',
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        }}
      >
        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <motion.span 
            className="text-6xl md:text-8xl font-display font-extrabold text-gradient"
            animate={{ 
              textShadow: [
                '0 0 20px hsl(68 100% 50% / 0.3)',
                '0 0 60px hsl(68 100% 50% / 0.6)',
                '0 0 20px hsl(68 100% 50% / 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ALCOVIA
          </motion.span>
        </motion.div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
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

        {/* Animated particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full"
            initial={{ 
              x: 0, 
              y: 0,
              opacity: 0 
            }}
            animate={{ 
              x: Math.cos(i * 60 * Math.PI / 180) * 150,
              y: Math.sin(i * 60 * Math.PI / 180) * 150,
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
