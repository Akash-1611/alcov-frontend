import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

const MouseTrail = () => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    let timeoutId: NodeJS.Timeout;
    let idCounter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: idCounter++,
      };

      setTrail((prev) => [...prev.slice(-8), newPoint]);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setTrail([]);
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997]">
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: point.x,
            top: point.y,
            background: `radial-gradient(circle, hsl(45 100% 55% / ${0.6 - index * 0.06}), transparent)`,
          }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  );
};

export default MouseTrail;

