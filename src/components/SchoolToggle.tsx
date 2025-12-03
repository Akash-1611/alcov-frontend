import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const SchoolToggle = () => {
  const [activeState, setActiveState] = useState<'school' | 'outside'>('school');

  const content = {
    school: {
      title: "AT SCHOOL",
      heading: "How Alcovia helps students ace school.",
      points: [
        "Scientific study techniques backed by research",
        "Time management frameworks for busy students",
        "Academic mentorship from top achievers",
        "Exam preparation strategies that work",
        "Building focus and concentration"
      ]
    },
    outside: {
      title: "OUTSIDE SCHOOL",
      heading: "How Alcovia fulfills its mission of building differentiation for each Alcovian.",
      points: [
        "Real-world project experiences",
        "Leadership and communication skills",
        "Networking with industry professionals",
        "Personal brand development",
        "Building a unique portfolio"
      ]
    }
  };

  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-alcovia-black" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Toggle Buttons */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-full bg-card/50 backdrop-blur-sm p-2 border border-border/50">
            <motion.button
              onClick={() => setActiveState('school')}
              className={`relative px-8 py-4 rounded-full font-display font-bold text-lg md:text-xl transition-colors duration-300 ${
                activeState === 'school' ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeState === 'school' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative z-10">AT SCHOOL</span>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveState('outside')}
              className={`relative px-8 py-4 rounded-full font-display font-bold text-lg md:text-xl transition-colors duration-300 ${
                activeState === 'outside' ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeState === 'outside' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative z-10">OUTSIDE</span>
            </motion.button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeState}
              initial={{ opacity: 0, y: 40, clipPath: "inset(0 50% 0 50%)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0%)" }}
              exit={{ opacity: 0, y: -40, clipPath: "inset(0 50% 0 50%)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              {/* Title */}
              <motion.span
                className="text-primary font-body text-sm tracking-[0.3em] uppercase block mb-6"
              >
                {content[activeState].title}
              </motion.span>

              {/* Heading */}
              <motion.h2
                className="hero-text text-3xl md:text-5xl lg:text-6xl max-w-4xl mx-auto mb-12"
              >
                {content[activeState].heading}
              </motion.h2>

              {/* Points */}
              <div className="flex flex-wrap justify-center gap-4">
                {content[activeState].points.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="px-6 py-3 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm"
                  >
                    <span className="text-foreground font-body text-sm md:text-base">
                      {point}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Decorative lines */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent to-primary/30" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-l from-transparent to-primary/30" />
      </div>
    </section>
  );
};

export default SchoolToggle;
