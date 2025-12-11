import { useEffect, useRef, ReactNode } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: 'slide' | 'fade' | 'zoom' | 'flip' | 'blur' | 'elastic';
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}

const ScrollReveal = ({ 
  children, 
  variant = 'slide',
  direction = 'up', 
  delay = 0, 
  duration = 0.8 
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px", // Reduced for earlier reveal
    amount: 0.2 // Trigger when 20% is visible
  });
  const controls = useAnimation();

  const getVariants = () => {
    const baseTransition = {
      duration,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    };

    switch (variant) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: baseTransition },
        };
      
      case 'zoom':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: { ...baseTransition, type: 'spring', stiffness: 100 } },
        };
      
      case 'flip':
        return {
          hidden: { opacity: 0, rotateY: -90, transformPerspective: 1000 },
          visible: { opacity: 1, rotateY: 0, transition: { ...baseTransition, type: 'spring', stiffness: 80 } },
        };
      
      case 'blur':
        return {
          hidden: { opacity: 0, filter: 'blur(10px)', y: 30 },
          visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: baseTransition },
        };
      
      case 'elastic':
        return {
          hidden: { opacity: 0, scale: 0.3, rotate: -10 },
          visible: { 
            opacity: 1, 
            scale: 1, 
            rotate: 0, 
            transition: { 
              ...baseTransition, 
              type: 'spring', 
              stiffness: 200, 
              damping: 10 
            } 
          },
        };
      
      default: // slide
        return {
          hidden: {
            opacity: 0,
            y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
            x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
            scale: 0.95,
          },
          visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: baseTransition,
          },
        };
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;