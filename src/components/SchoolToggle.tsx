import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { BookOpen, Target, Users, Trophy, Briefcase, Lightbulb, Network, Star } from 'lucide-react';

const SchoolToggle = () => {
  const [activeState, setActiveState] = useState<'school' | 'outside'>('school');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);

  const content = {
    school: {
      title: "AT SCHOOL",
      heading: "How Alcovia helps students ace school.",
      icon: BookOpen,
      color: 'hsl(45 100% 55%)',
      points: [
        { text: "Scientific study techniques backed by research", icon: Target },
        { text: "Time management frameworks for busy students", icon: Trophy },
        { text: "Academic mentorship from top achievers", icon: Users },
        { text: "Exam preparation strategies that work", icon: Star },
        { text: "Building focus and concentration", icon: Lightbulb }
      ]
    },
    outside: {
      title: "OUTSIDE SCHOOL",
      heading: "How Alcovia fulfills its mission of building differentiation for each Alcovian.",
      icon: Briefcase,
      color: 'hsl(0 60% 35%)',
      points: [
        { text: "Real-world project experiences", icon: Briefcase },
        { text: "Leadership and communication skills", icon: Users },
        { text: "Networking with industry professionals", icon: Network },
        { text: "Personal brand development", icon: Star },
        { text: "Building a unique portfolio", icon: Trophy }
      ]
    }
  };

  return (
    <motion.section 
      ref={containerRef}
      className="relative py-responsive overflow-hidden"
      style={{ y, scale, opacity }}
    >
      {/* Background with animated effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-alcovia-darker via-alcovia-black to-alcovia-dark" />
      
      {/* Animated glow orbs */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(12 100% 60% / 0.3) 0%, hsl(350 89% 60% / 0.15) 50%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <div className="relative z-10 container-responsive">
        {/* Enhanced Toggle Buttons */}
        <div className="flex justify-center mb-16">
          <motion.div 
            className="flex gap-6 p-3 rounded-3xl bg-gradient-to-r from-alcovia-darker/80 via-alcovia-black/60 to-alcovia-darker/80 backdrop-blur-xl border-2 border-alcovia-orange/20"
            style={{
              boxShadow: '0 20px 60px -10px hsl(45 100% 55% / 0.3), 0 0 80px hsl(0 60% 35% / 0.2)'
            }}
            whileHover={{
              boxShadow: '0 25px 80px -10px hsl(45 100% 55% / 0.5), 0 0 100px hsl(0 60% 35% / 0.3)',
              scale: 1.02
            }}
          >
            {/* School Button */}
            <motion.button
              onClick={() => setActiveState('school')}
              className={`relative group overflow-hidden rounded-2xl transition-all duration-500 ${
                activeState === 'school' ? 'text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Background with image */}
              <div className="relative w-48 h-32 overflow-hidden rounded-2xl">
                {/* Real School Photo Background */}
                <img
                  src="/addition/General Website Photos/photo-13.jpg"
                  alt="School activities"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-alcovia-orange/40 via-alcovia-red/30 to-alcovia-orange/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen size={40} className="text-white drop-shadow-lg" />
                </div>
                
                {/* Active State Overlay */}
                {activeState === 'school' && (
                  <motion.div
                    layoutId="activeOverlay"
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, hsl(45 100% 55% / 0.9), hsl(0 60% 35% / 0.7))',
                      boxShadow: '0 0 40px hsl(45 100% 55% / 0.6), inset 0 0 40px hsl(45 100% 55% / 0.3)'
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 40px hsl(45 100% 55% / 0.6), inset 0 0 40px hsl(45 100% 55% / 0.3)',
                        '0 0 60px hsl(45 100% 55% / 0.8), inset 0 0 60px hsl(45 100% 55% / 0.5)',
                        '0 0 40px hsl(45 100% 55% / 0.6), inset 0 0 40px hsl(45 100% 55% / 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                
                {/* Floating particles */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-alcovia-orange"
                    style={{
                      left: `${20 + i * 20}%`,
                      top: `${30 + (i % 2) * 40}%`,
                      boxShadow: '0 0 10px hsl(45 100% 55%)'
                    }}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
              
              {/* Text Label */}
              <motion.div 
                className="absolute bottom-2 left-0 right-0 text-center"
                animate={{ y: activeState === 'school' ? 0 : 5 }}
              >
                <span className="font-display font-bold text-sm tracking-wide drop-shadow-lg">
                  AT SCHOOL
                </span>
              </motion.div>
            </motion.button>
            
            {/* Outside Button */}
            <motion.button
              onClick={() => setActiveState('outside')}
              className={`relative group overflow-hidden rounded-2xl transition-all duration-500 ${
                activeState === 'outside' ? 'text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.05, rotateY: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Background with image */}
              <div className="relative w-48 h-32 overflow-hidden rounded-2xl">
                {/* Real Outside School Photo Background */}
                <img
                  src="/addition/General Website Photos/photo-14.jpg"
                  alt="Outside school activities"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-alcovia-red/40 via-alcovia-pink/30 to-alcovia-red/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Briefcase size={40} className="text-white drop-shadow-lg" />
                </div>
                
                {/* Active State Overlay */}
                {activeState === 'outside' && (
                  <motion.div
                    layoutId="activeOverlay"
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, hsl(0 60% 35% / 0.9), hsl(355 75% 45% / 0.7))',
                      boxShadow: '0 0 40px hsl(0 60% 35% / 0.6), inset 0 0 40px hsl(0 60% 35% / 0.3)'
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 40px hsl(0 60% 35% / 0.6), inset 0 0 40px hsl(0 60% 35% / 0.3)',
                        '0 0 60px hsl(0 60% 35% / 0.8), inset 0 0 60px hsl(0 60% 35% / 0.5)',
                        '0 0 40px hsl(0 60% 35% / 0.6), inset 0 0 40px hsl(0 60% 35% / 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                
                {/* Floating particles */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-alcovia-red"
                    style={{
                      left: `${20 + i * 20}%`,
                      top: `${30 + (i % 2) * 40}%`,
                      boxShadow: '0 0 10px hsl(0 60% 35%)'
                    }}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
              
              {/* Text Label */}
              <motion.div 
                className="absolute bottom-2 left-0 right-0 text-center"
                animate={{ y: activeState === 'outside' ? 0 : 5 }}
              >
                <span className="font-display font-bold text-sm tracking-wide drop-shadow-lg">
                  OUTSIDE
                </span>
              </motion.div>
            </motion.button>
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeState}
              initial={{ opacity: 0, y: 40, clipPath: "inset(0 50% 0 50%)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0%)" }}
              exit={{ opacity: 0, y: -40, clipPath: "inset(0 50% 0 50%)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-2 gap-responsive items-center"
            >
              {/* Left Side - 3D Visual */}
              <motion.div
                className="relative flex justify-center lg:justify-end"
                initial={{ rotateY: -30, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {/* 3D Card Container */}
                <motion.div
                  className="relative w-80 h-80 perspective-1000"
                  whileHover={{ scale: 1.05 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Main 3D Card */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 backdrop-blur-xl"
                    style={{
                      background: `linear-gradient(135deg, ${content[activeState].color}/20, ${content[activeState].color}/5)`,
                      borderColor: `${content[activeState].color}/30`,
                      boxShadow: `0 25px 50px -12px ${content[activeState].color}/20, 0 0 40px ${content[activeState].color}/10`
                    }}
                    animate={{
                      rotateY: [0, 5, -5, 0],
                      rotateX: [0, 2, -2, 0]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Central Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="relative"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity
                        }}
                      >
                        {(() => {
                          const IconComponent = content[activeState].icon;
                          return <IconComponent 
                            size={80} 
                            style={{ color: content[activeState].color }}
                            className="drop-shadow-lg"
                          />;
                        })()}
                        {/* Icon Glow */}
                        <motion.div
                          className="absolute inset-0 rounded-full blur-xl opacity-50"
                          style={{ background: content[activeState].color }}
                          animate={{
                            scale: [0.8, 1.2, 0.8],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Floating Elements */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-full"
                        style={{
                          background: content[activeState].color,
                          left: `${20 + (i % 4) * 20}%`,
                          top: `${20 + Math.floor(i / 4) * 60}%`,
                          boxShadow: `0 0 20px ${content[activeState].color}`
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.4, 1, 0.4],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{
                          duration: 3 + i * 0.2,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Shadow Card */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-30 blur-sm"
                    style={{
                      background: `linear-gradient(135deg, ${content[activeState].color}/10, transparent)`,
                      transform: 'translateZ(-20px) rotateX(5deg)'
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Right Side - Content */}
              <motion.div
                className="text-center lg:text-left"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {/* Title */}
                <motion.span
                  className="text-primary font-body text-sm tracking-[0.3em] uppercase block mb-6"
                >
                  {content[activeState].title}
                </motion.span>

                {/* Heading */}
                <motion.h2
                  className="hero-text text-responsive-3xl mb-responsive leading-tight"
                >
                  {content[activeState].heading}
                </motion.h2>

                {/* Enhanced Points */}
                <div className="space-y-4">
                  {content[activeState].points.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm hover:bg-card/40 transition-all duration-300 group"
                      whileHover={{ scale: 1.02, x: 10 }}
                    >
                      <motion.div
                        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${content[activeState].color}/20, ${content[activeState].color}/5)`,
                          border: `1px solid ${content[activeState].color}/30`
                        }}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        {(() => {
                          const PointIcon = point.icon;
                          return <PointIcon 
                            size={20} 
                            style={{ color: content[activeState].color }}
                          />;
                        })()}
                      </motion.div>
                      <span className="text-foreground font-body text-sm md:text-base group-hover:text-primary transition-colors">
                        {point.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Decorative lines with glow */}
        <motion.div 
          className="absolute left-0 top-1/2 -translate-y-1/2 w-40 h-0.5 rounded-full"
          style={{
            background: 'linear-gradient(to right, transparent, hsl(12 100% 60% / 0.6), hsl(350 89% 60% / 0.4))',
            boxShadow: '0 0 20px hsl(12 100% 60% / 0.5)'
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            width: ['160px', '180px', '160px']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-0.5 rounded-full"
          style={{
            background: 'linear-gradient(to left, transparent, hsl(12 100% 60% / 0.6), hsl(350 89% 60% / 0.4))',
            boxShadow: '0 0 20px hsl(350 89% 60% / 0.5)'
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            width: ['160px', '180px', '160px']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        
        {/* Floating particles around the section */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 2 === 0 ? 'hsl(12 100% 60%)' : 'hsl(350 89% 60%)',
              left: `${15 + i * 15}%`,
              top: i % 2 === 0 ? '20%' : '80%',
              boxShadow: `0 0 15px ${i % 2 === 0 ? 'hsl(12 100% 60%)' : 'hsl(350 89% 60%)'}`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default SchoolToggle;
