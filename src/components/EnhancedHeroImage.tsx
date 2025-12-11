import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';

// Rotating hero images with 3D tilt effect
const heroImages = [
  '/addition/General Website Photos/photo-2.jpg',
  '/addition/General Website Photos/photo-3.jpg',
  '/addition/General Website Photos/photo-4.jpg',
  '/addition/General Website Photos/photo-6.jpg',
];

const EnhancedHeroImage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.5, duration: 1.2, ease: "backOut" }}
    >
      {/* 3D Container */}
      <motion.div
        className="relative"
        style={{
          perspective: 1000,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Image with 3D Tilt */}
        <motion.div
          className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border-4 border-alcovia-orange/40"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            boxShadow: isHovered 
              ? '0 30px 60px rgba(0,0,0,0.5), 0 0 80px hsl(45 100% 55% / 0.6)'
              : '0 20px 50px rgba(0,0,0,0.4), 0 0 50px hsl(45 100% 55% / 0.3)',
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated Image Transition */}
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={heroImages[currentIndex]}
              alt="Alcovia students"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-alcovia-orange/20 via-transparent to-alcovia-red/20" />

          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />

          {/* 3D Depth Layer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"
            style={{
              transform: 'translateZ(20px)',
            }}
          />

          {/* Corner Accents */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={`absolute w-16 h-16 border-2 border-alcovia-orange ${
                i === 0 ? 'top-4 left-4 border-r-0 border-b-0' :
                i === 1 ? 'top-4 right-4 border-l-0 border-b-0' :
                i === 2 ? 'bottom-4 left-4 border-r-0 border-t-0' :
                'bottom-4 right-4 border-l-0 border-t-0'
              }`}
              animate={{
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>

        {/* Floating Glow Behind */}
        <motion.div
          className="absolute inset-0 rounded-3xl blur-3xl -z-10"
          style={{
            background: 'radial-gradient(circle, hsl(45 100% 55% / 0.4) 0%, hsl(0 60% 35% / 0.2) 50%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Image Indicators */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-alcovia-orange' 
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              data-interactive="true"
            />
          ))}
        </div>
      </motion.div>

      {/* Floating Particles Around Image */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-alcovia-orange"
          style={{
            left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 120}%`,
            top: `${50 + Math.sin(i * 45 * Math.PI / 180) * 120}%`,
            boxShadow: '0 0 20px hsl(45 100% 55%)',
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </motion.div>
  );
};

export default EnhancedHeroImage;

