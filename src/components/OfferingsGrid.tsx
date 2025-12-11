import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Briefcase, Mic, Users, Brain, Heart, GraduationCap, Calendar, Shield, Sparkles } from 'lucide-react';

const offerings = [
  {
    icon: Briefcase,
    title: "Career Discovery",
    subtitle: "Workshops",
    description: "Explore diverse career paths with hands-on workshops",
    image: "/addition/General Website Photos/photo-1.jpg"
  },
  {
    icon: Mic,
    title: "Podcast Shoots",
    subtitle: "with Industry Experts",
    description: "Learn from leaders through exclusive podcast sessions",
    image: "/addition/General Website Photos/photo-2.jpg"
  },
  {
    icon: Users,
    title: "1:1 Mentorship",
    subtitle: "with Top Professionals",
    description: "Personal guidance from industry veterans",
    image: "/addition/General Website Photos/photo-3.jpg"
  },
  {
    icon: Brain,
    title: "Scientific Academic",
    subtitle: "Score Building",
    description: "Evidence-based methods to boost your grades",
    image: "/addition/General Website Photos/photo-4.jpg"
  },
  {
    icon: Heart,
    title: "Forge Bonds",
    subtitle: "with Driven Teens",
    description: "Connect with similarly ambitious peers",
    image: "/addition/General Website Photos/photo-5.jpg"
  },
  {
    icon: GraduationCap,
    title: "Harvard & UCL",
    subtitle: "Weekly Mentorship",
    description: "Learn from Ivy League professionals every week",
    image: "/addition/General Website Photos/photo-6.jpg"
  },
  {
    icon: Calendar,
    title: "Monthly Career",
    subtitle: "Counsellor Meetings",
    description: "Regular check-ins to keep you on track",
    image: "/addition/General Website Photos/photo-7.jpg"
  },
  {
    icon: Shield,
    title: "Build",
    subtitle: "Resilience",
    description: "Develop mental strength for any challenge",
    image: "/addition/General Website Photos/photo-8.jpg"
  },
  {
    icon: Sparkles,
    title: "Build",
    subtitle: "Empathy",
    description: "Cultivate emotional intelligence",
    image: "/addition/General Website Photos/photo-9.jpg"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const OfferingsGrid = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isInSection, setIsInSection] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const inSection = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsInSection(inSection);
        
        if (!inSection && selectedCard !== null) {
          setSelectedCard(null);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedCard]);

  return (
    <section ref={sectionRef} className="relative py-responsive overflow-hidden">
      {/* Background with animated gradients and photos */}
      <div className="absolute inset-0 bg-gradient-to-b from-alcovia-dark via-alcovia-black to-alcovia-darker">
        {/* Subtle rotating photo background */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <img
            src="/addition/General Website Photos/photo-10.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'blur(60px) brightness(0.2)' }}
          />
        </motion.div>
      </div>
      
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(12 100% 60% / 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 100, 0],
          y: [0, -50, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(350 89% 60% / 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          x: [0, -100, 0],
          y: [0, 50, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="relative z-10 container-responsive">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            className="text-primary font-body text-sm tracking-[0.3em] uppercase block mb-4"
          >
            What We Offer
          </motion.span>
          <h2 className="hero-text text-responsive-4xl">
            <span className="text-foreground">The </span>
            <span className="text-gradient">Alcovia</span>
            <span className="text-foreground"> Experience</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid-responsive-3 gap-responsive"
        >
          {offerings.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -20, 
                scale: selectedCard === null ? 1.05 : selectedCard === index ? 1.05 : 0.95,
                rotateY: 8,
                zIndex: selectedCard === index ? 50 : 1
              }}
              animate={{
                x: [0, 10, -10, 0],
                y: [0, -8, 8, 0],
                opacity: selectedCard === null ? 1 : selectedCard === index ? 1 : 0.3,
                scale: selectedCard === index ? 1.2 : selectedCard === null ? 1 : 0.9
              }}
              transition={{
                x: { duration: 6 + index * 0.5, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
              onClick={() => setSelectedCard(selectedCard === index ? null : index)}
              onMouseEnter={() => setSelectedCard(index)}
              onMouseLeave={() => setSelectedCard(null)}
              data-interactive="true"
              className="group relative p-4 sm:p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl border-2 border-alcovia-orange/30 hover:border-alcovia-orange/60 transition-all duration-500 overflow-hidden cursor-pointer"
              style={{
                boxShadow: selectedCard === index 
                  ? '0 40px 100px -10px hsl(0 0% 0% / 0.8), 0 0 80px hsl(45 100% 55% / 0.4)' 
                  : '0 20px 60px -10px hsl(0 0% 0% / 0.6), 0 0 40px hsl(45 100% 55% / 0.1)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Real Photo Background */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-alcovia-black/60 via-alcovia-black/40 to-alcovia-black/60" />
              </div>

              {/* Animated Background Pattern */}
              <motion.div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 40%, hsl(45 100% 55% / 0.4) 0%, transparent 50%),
                                   radial-gradient(circle at 70% 60%, hsl(0 60% 35% / 0.3) 0%, transparent 50%)`
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Floating particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-alcovia-orange/60"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${15 + (i % 2) * 70}%`
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, 10, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1.5, 0.5]
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    delay: index * 0.2 + i * 0.3
                  }}
                />
              ))}
              
              {/* Enhanced glow effect on hover */}
              <motion.div 
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-alcovia-orange/15 via-alcovia-red/10 to-alcovia-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 20%, hsl(45 100% 55% / 0.15), transparent 70%)',
                    'radial-gradient(circle at 80% 80%, hsl(0 60% 35% / 0.15), transparent 70%)',
                    'radial-gradient(circle at 20% 20%, hsl(45 100% 55% / 0.15), transparent 70%)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Enhanced Icon with 3D effect */}
              <motion.div
                className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-alcovia-orange/30 via-alcovia-red/20 to-alcovia-pink/10 flex items-center justify-center mb-8 border border-alcovia-orange/40"
                whileHover={{ 
                  rotateX: 15,
                  rotateY: 15,
                  scale: 1.15
                }}
                animate={{
                  y: [0, -5, 0],
                  rotateZ: [0, 2, -2, 0]
                }}
                transition={{
                  y: { duration: 3 + index * 0.2, repeat: Infinity },
                  rotateZ: { duration: 4 + index * 0.3, repeat: Infinity }
                }}
                style={{
                  boxShadow: '0 10px 40px hsl(45 100% 55% / 0.3), 0 0 60px hsl(0 60% 35% / 0.2)',
                  transformStyle: 'preserve-3d'
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-alcovia-orange to-alcovia-red opacity-0 group-hover:opacity-30"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20 + index * 2, repeat: Infinity, ease: "linear" }}
                >
                  <item.icon className="w-10 h-10 text-alcovia-orange relative z-10 drop-shadow-lg" />
                </motion.div>
              </motion.div>

              {/* Enhanced Content */}
              <div className="relative space-y-4">
                <motion.h3 
                  className="font-display font-bold text-2xl text-foreground leading-tight"
                  whileHover={{ scale: 1.02 }}
                >
                  {item.title}
                </motion.h3>
                <motion.p 
                  className="text-gradient font-display font-semibold text-lg"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                >
                  {item.subtitle}
                </motion.p>
                <p className="text-muted-foreground font-body text-base leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Premium corner decoration */}
              <motion.div
                className="absolute top-6 right-6 w-4 h-4 rounded-full bg-gradient-to-br from-alcovia-orange to-alcovia-red"
                animate={{
                  scale: [1, 1.5, 1],
                  boxShadow: [
                    '0 0 10px hsl(45 100% 55% / 0.5)',
                    '0 0 25px hsl(45 100% 55% / 0.8)',
                    '0 0 10px hsl(45 100% 55% / 0.5)'
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              />
              
              {/* Enhanced shine effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'linear-gradient(135deg, transparent 20%, hsl(45 100% 55% / 0.15) 40%, hsl(0 60% 35% / 0.1) 60%, transparent 80%)',
                  backgroundSize: '300% 300%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Overlay for selected card */}
        <AnimatePresence>
          {selectedCard !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 pointer-events-none"
            />
          )}
        </AnimatePresence>
        {/* Blur overlay - only when in section and card selected */}
        <AnimatePresence>
          {selectedCard !== null && isInSection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default OfferingsGrid;
