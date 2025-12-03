import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

const StickyBookDemo = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-6 right-6 z-[100]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <motion.button
        className="group relative px-6 py-3 rounded-full font-display font-bold text-sm md:text-base overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 0 20px hsl(45 100% 55% / 0.4), 0 0 40px hsl(0 60% 35% / 0.2), inset 0 0 20px hsl(45 100% 55% / 0.1)',
            '0 0 30px hsl(45 100% 55% / 0.6), 0 0 60px hsl(0 60% 35% / 0.4), inset 0 0 30px hsl(45 100% 55% / 0.2)',
            '0 0 20px hsl(45 100% 55% / 0.4), 0 0 40px hsl(0 60% 35% / 0.2), inset 0 0 20px hsl(45 100% 55% / 0.1)',
          ]
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        style={{
          background: 'rgba(10, 10, 10, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '2px solid transparent',
          backgroundImage: `
            linear-gradient(rgba(10, 10, 10, 0.6), rgba(10, 10, 10, 0.6)),
            linear-gradient(135deg, hsl(45 100% 55%), hsl(0 60% 35%), hsl(355 75% 45%))
          `,
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, hsl(45 100% 55% / 0.2), hsl(0 60% 35% / 0.2), hsl(355 75% 45% / 0.2))',
          }}
        />

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          }}
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        />

        {/* Button Content */}
        <span className="relative z-10 flex items-center gap-2 text-gradient">
          <Calendar className="w-4 h-4 md:w-5 md:h-5" />
          <span>Book Demo</span>
        </span>

        {/* Glow dots */}
        <motion.div
          className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gradient-to-br from-alcovia-orange to-alcovia-red"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      {/* Keyboard focus ring */}
      <style>{`
        button:focus-visible {
          outline: 3px solid hsl(45 100% 55%);
          outline-offset: 4px;
        }
      `}</style>
    </motion.div>
  );
};

export default StickyBookDemo;

