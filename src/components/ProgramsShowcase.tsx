import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Showcase photos - using more photos for a richer experience
const showcaseImages = [
  {
    id: 1,
    src: '/addition/General Website Photos/photo-1.jpg',
    title: 'Career Discovery',
    description: 'Exploring diverse career paths through interactive workshops'
  },
  {
    id: 2,
    src: '/addition/General Website Photos/photo-2.jpg',
    title: 'Workshop Sessions',
    description: 'Hands-on learning experiences with industry experts'
  },
  {
    id: 3,
    src: '/addition/General Website Photos/photo-3.jpg',
    title: 'Mentorship Programs',
    description: 'One-on-one guidance from Harvard & UCL professionals'
  },
  {
    id: 4,
    src: '/addition/General Website Photos/photo-4.jpg',
    title: 'Team Collaboration',
    description: 'Building projects with fellow ambitious students'
  },
  {
    id: 5,
    src: '/addition/General Website Photos/photo-5.jpg',
    title: 'Community Building',
    description: 'Forging lasting bonds with like-minded peers'
  },
  {
    id: 6,
    src: '/addition/General Website Photos/photo-6.jpg',
    title: 'Events & Activities',
    description: 'Engaging community events and networking sessions'
  },
  {
    id: 7,
    src: '/addition/General Website Photos/photo-7.jpg',
    title: 'Career Counseling',
    description: 'Monthly meetings to guide your professional journey'
  },
  {
    id: 8,
    src: '/addition/General Website Photos/photo-8.jpg',
    title: 'Resilience Training',
    description: 'Building mental strength to overcome any challenge'
  },
  {
    id: 9,
    src: '/addition/General Website Photos/photo-9.jpg',
    title: 'Empathy Development',
    description: 'Cultivating emotional intelligence and understanding'
  },
  {
    id: 10,
    src: '/addition/General Website Photos/photo-10.jpg',
    title: 'Leadership Development',
    description: 'Developing essential leadership skills for tomorrow'
  },
  {
    id: 11,
    src: '/addition/General Website Photos/photo-11.jpg',
    title: 'Career Exploration',
    description: 'Discovering your path through diverse opportunities'
  },
];

const ProgramsShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % showcaseImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + showcaseImages.length) % showcaseImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false); // Pause auto-play when user manually navigates
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10 seconds
  };

  return (
    <section className="relative py-responsive overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-alcovia-black via-alcovia-darker to-alcovia-dark"
        />
        
        {/* Large blurred photo background that changes with slides */}
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.15, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={showcaseImages[currentIndex].src}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'blur(80px) brightness(0.3)' }}
          />
        </motion.div>

        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, hsl(45 100% 55% / 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 container-responsive">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="text-primary font-body text-sm tracking-[0.3em] uppercase block mb-4"
          >
            Programs in Action
          </motion.span>
          <h2 className="hero-text text-responsive-4xl mb-6">
            <span className="text-foreground">Experience </span>
            <span className="text-gradient">Alcovia</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            See our programs come to life through real moments and experiences
          </p>
        </motion.div>

        {/* Enhanced Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Image Display with 3D effect */}
          <motion.div
            className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              boxShadow: '0 25px 80px -10px rgba(0,0,0,0.6), 0 0 60px hsl(45 100% 55% / 0.3)',
            }}
          >
            {/* Image with slide animation */}
            <motion.div
              key={currentIndex}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -100 }}
              transition={{ 
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <img
                src={showcaseImages[currentIndex].src}
                alt={showcaseImages[currentIndex].title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                style={{ willChange: 'transform' }}
              />
              
              {/* Enhanced Gradient Overlay with animation */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-alcovia-black/95 via-alcovia-black/40 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
              
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 border-4 border-alcovia-orange/0 rounded-3xl"
                animate={{
                  borderColor: ['hsl(45 100% 55% / 0)', 'hsl(45 100% 55% / 0.3)', 'hsl(45 100% 55% / 0)'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              
              {/* Content Overlay with enhanced animations */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-8 md:p-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {/* Number indicator */}
                <motion.div
                  className="inline-block px-4 py-2 rounded-full bg-alcovia-orange/20 backdrop-blur-md border border-alcovia-orange/40 mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-alcovia-orange font-bold text-sm">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(showcaseImages.length).padStart(2, '0')}
                  </span>
                </motion.div>

                <motion.h3 
                  className="font-display font-bold text-3xl md:text-5xl text-white mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {showcaseImages[currentIndex].title}
                </motion.h3>
                <motion.p 
                  className="text-white/90 font-body text-lg md:text-xl max-w-3xl"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {showcaseImages[currentIndex].description}
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Enhanced Navigation Buttons */}
            <motion.button
              onClick={prevSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-alcovia-orange/90 to-alcovia-red/90 backdrop-blur-md border-2 border-white/20 text-white flex items-center justify-center hover:from-alcovia-orange hover:to-alcovia-red transition-all duration-300 z-10 shadow-lg"
              whileHover={{ scale: 1.15, x: -8 }}
              whileTap={{ scale: 0.95 }}
              data-interactive="true"
            >
              <ChevronLeft className="w-8 h-8" />
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.button>

            <motion.button
              onClick={nextSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-alcovia-orange/90 to-alcovia-red/90 backdrop-blur-md border-2 border-white/20 text-white flex items-center justify-center hover:from-alcovia-orange hover:to-alcovia-red transition-all duration-300 z-10 shadow-lg"
              whileHover={{ scale: 1.15, x: 8 }}
              whileTap={{ scale: 0.95 }}
              data-interactive="true"
            >
              <ChevronRight className="w-8 h-8" />
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 1,
                }}
              />
            </motion.button>

            {/* Enhanced Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-alcovia-black/60 backdrop-blur-md px-4 py-3 rounded-full border border-alcovia-orange/30">
              {showcaseImages.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === currentIndex 
                      ? 'w-8 bg-gradient-to-r from-alcovia-orange to-alcovia-red shadow-lg' 
                      : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
                  whileHover={{ scale: 1.3, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  data-interactive="true"
                >
                  {index === currentIndex && (
                    <motion.div
                      className="w-full h-full bg-white/30 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 4, ease: "linear" }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Corner Accent */}
            <motion.div
              className="absolute top-4 right-4 w-4 h-4 rounded-full bg-gradient-to-br from-alcovia-orange to-alcovia-red"
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
              }}
            />
          </motion.div>

          {/* Enhanced Scrolling Thumbnail Row */}
          <motion.div
            className="relative mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {/* Gradient fades on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-alcovia-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-alcovia-black to-transparent z-10 pointer-events-none" />
            
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-4">
              {showcaseImages.map((image, index) => (
                <motion.button
                  key={image.id}
                  onClick={() => goToSlide(index)}
                  className={`relative flex-shrink-0 w-40 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-500 group ${
                    index === currentIndex
                      ? 'border-alcovia-orange shadow-xl shadow-alcovia-orange/50 scale-105'
                      : 'border-alcovia-orange/20 hover:border-alcovia-orange/60'
                  }`}
                  whileHover={{ scale: 1.08, y: -6 }}
                  whileTap={{ scale: 0.95 }}
                  data-interactive="true"
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      index === currentIndex ? 'opacity-100 scale-100' : 'opacity-60 scale-95 group-hover:opacity-80 group-hover:scale-100'
                    }`}
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Overlay gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-300 ${
                    index === currentIndex 
                      ? 'from-alcovia-orange/40 to-transparent' 
                      : 'from-alcovia-black/60 to-transparent group-hover:from-alcovia-orange/30'
                  }`} />
                  
                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-alcovia-black/90 to-transparent">
                    <p className={`text-xs font-semibold transition-colors duration-300 ${
                      index === currentIndex ? 'text-alcovia-orange' : 'text-white/70 group-hover:text-white'
                    }`}>
                      {image.title}
                    </p>
                  </div>
                  
                  {/* Active border animation */}
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0 border-3 border-alcovia-orange rounded-2xl"
                      layoutId="activeThumbnail"
                      animate={{
                        boxShadow: [
                          '0 0 20px hsl(45 100% 55% / 0.5)',
                          '0 0 40px hsl(45 100% 55% / 0.8)',
                          '0 0 20px hsl(45 100% 55% / 0.5)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsShowcase;

