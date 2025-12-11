import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const ProgressiveImage = ({ src, alt, className = '', style = {} }: ProgressiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImgSrc(src);
      setIsLoaded(true);
    };

    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {/* Blur placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-alcovia-dark/50 to-alcovia-darker/50 animate-pulse" />
      )}
      
      {/* Actual image with fade in */}
      {imgSrc && (
        <motion.img
          src={imgSrc}
          alt={alt}
          className={`${className} ${isLoaded ? '' : 'opacity-0'}`}
          style={{
            ...style,
            willChange: 'opacity',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};

export default ProgressiveImage;

