import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['hsl(45 100% 55%)', 'hsl(0 60% 35%)', 'hsl(355 75% 45%)'];
    
    // Reduced particle count for better performance
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 20 + 15, // Slower for smoothness
    }));

    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-30"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            willChange: 'transform', // GPU acceleration
          }}
          initial={{
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            x: [particle.x, particle.x + Math.random() * 200 - 100],
            y: [particle.y, particle.y + Math.random() * 200 - 100],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut', // Smoother than linear
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;