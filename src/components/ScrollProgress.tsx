import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const section = Math.floor(latest * 5); // 5 sections
      setCurrentSection(section);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-alcovia-orange via-alcovia-red to-alcovia-deep-orange z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Section Indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 space-y-3">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full border-2 border-alcovia-orange/50 cursor-pointer"
            animate={{
              backgroundColor: currentSection >= i ? 'hsl(45 100% 55%)' : 'transparent',
              scale: currentSection === i ? 1.3 : 1,
            }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              const sections = ['hero', 'manifesto', 'offerings', 'school', 'team'];
              document.getElementById(sections[i])?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ScrollProgress;