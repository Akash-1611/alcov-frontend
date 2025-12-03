import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.closest('button') || 
          target.closest('a') ||
          target.classList.contains('cursor-pointer') ||
          getComputedStyle(target).cursor === 'pointer') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      cursorX.set(-100);
      cursorY.set(-100);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cursorX.set(-100);
        cursorY.set(-100);
      }
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor - Alcovian with wing */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Wing SVG - Fiery Phoenix Wings */}
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_20px_rgba(218,165,32,0.8)]"
          >
            {/* Glow effect */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="fireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(45 100% 55%)" />
                <stop offset="50%" stopColor="hsl(0 60% 35%)" />
                <stop offset="100%" stopColor="hsl(355 75% 45%)" />
              </linearGradient>
            </defs>
            
            {/* Left Wing - Larger and more dramatic */}
            <motion.path
              d="M25 12 Q 10 15 5 22 Q 2 28 8 32 Q 14 34 18 28 Q 20 24 16 22 Q 12 20 12 24"
              stroke="url(#fireGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="hsl(45 100% 55% / 0.2)"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                pathLength: { duration: 0.6 },
                opacity: { duration: 2, repeat: Infinity },
                scale: { duration: 2, repeat: Infinity }
              }}
            />
            
            {/* Right Wing - Larger and more dramatic */}
            <motion.path
              d="M25 12 Q 40 15 45 22 Q 48 28 42 32 Q 36 34 32 28 Q 30 24 34 22 Q 38 20 38 24"
              stroke="url(#fireGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="hsl(0 60% 35% / 0.2)"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                pathLength: { duration: 0.6, delay: 0.1 },
                opacity: { duration: 2, repeat: Infinity, delay: 0.3 },
                scale: { duration: 2, repeat: Infinity, delay: 0.3 }
              }}
            />
            
            {/* Center dot - the Alcovian with glow */}
            <motion.circle
              cx="25"
              cy="25"
              r="5"
              fill="url(#fireGradient)"
              filter="url(#glow)"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Inner core */}
            <circle
              cx="25"
              cy="25"
              r="2"
              fill="white"
              opacity="0.9"
            />
            
            {/* Flame particles */}
            <motion.circle
              cx="25"
              cy="15"
              r="1.5"
              fill="hsl(45 100% 60%)"
              animate={{
                y: [-5, 5],
                opacity: [1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            <motion.circle
              cx="20"
              cy="18"
              r="1"
              fill="hsl(0 60% 40%)"
              animate={{
                y: [-3, 5],
                opacity: [1, 0]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.3
              }}
            />
            <motion.circle
              cx="30"
              cy="18"
              r="1"
              fill="hsl(355 75% 50%)"
              animate={{
                y: [-3, 5],
                opacity: [1, 0]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.6
              }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Trailing cursor with gradient glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: useSpring(cursorX, { damping: 40, stiffness: 150 }),
          y: useSpring(cursorY, { damping: 40, stiffness: 150 }),
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-8 h-8 rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, hsl(45 100% 55% / 0.4) 0%, hsl(0 60% 35% / 0.2) 50%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
