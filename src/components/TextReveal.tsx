import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
}

const TextReveal = ({ text, className = '' }: TextRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.3"]
  });

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={`flex flex-wrap justify-center ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
};

interface WordProps {
  children: string;
  progress: any;
  range: [number, number];
}

const Word = ({ children, progress, range }: WordProps) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const y = useTransform(progress, range, [20, 0]);
  
  const isHighlight = ['Unprecedented', 'Learnings', 'friends', 'self', 'discovery', 'legacy', 'future'].some(
    w => children.toLowerCase().includes(w.toLowerCase())
  );

  return (
    <motion.span
      style={{ opacity, y }}
      className={`mr-3 md:mr-4 inline-block ${
        isHighlight ? 'text-primary' : 'text-foreground'
      }`}
    >
      {children}
    </motion.span>
  );
};

export default TextReveal;
