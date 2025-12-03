import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText = ({ text, className = '' }: GlitchTextProps) => {
  const [glitchText, setGlitchText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  const triggerGlitch = () => {
    if (isGlitching) return;
    
    setIsGlitching(true);
    let iterations = 0;
    
    const interval = setInterval(() => {
      setGlitchText(
        text
          .split('')
          .map((char, index) => {
            if (index < iterations) return text[index];
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join('')
      );

      if (iterations >= text.length) {
        clearInterval(interval);
        setGlitchText(text);
        setIsGlitching(false);
      }

      iterations += 1 / 3;
    }, 30);
  };

  return (
    <motion.span
      className={`inline-block cursor-pointer ${className}`}
      onHoverStart={triggerGlitch}
      whileHover={{ scale: 1.02 }}
      style={{
        textShadow: isGlitching 
          ? '2px 0 #ff6b35, -2px 0 #e63946, 0 2px #daa520' 
          : 'none'
      }}
    >
      {glitchText}
    </motion.span>
  );
};

export default GlitchText;