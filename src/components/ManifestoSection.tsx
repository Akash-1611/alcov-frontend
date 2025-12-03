import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const offerings = [
  { title: "Mentorship", subtitle: "from professionals" },
  { title: "Self", subtitle: "Discovery" },
  { title: "Build", subtitle: "Leadership" },
  { title: "Meet", subtitle: "Future Builders" },
];

const manifestoWords = [
  { text: "Unprecedented", highlight: true },
  { text: "Learnings,", highlight: true },
  { text: "Failing", highlight: false },
  { text: "regularly,", highlight: false },
  { text: "building", highlight: false },
  { text: "with", highlight: false },
  { text: "friends,", highlight: true },
  { text: "while", highlight: false },
  { text: "being", highlight: false },
  { text: "on", highlight: false },
  { text: "a", highlight: false },
  { text: "journey", highlight: false },
  { text: "of", highlight: false },
  { text: "self", highlight: true },
  { text: "discovery.", highlight: true },
  { text: "Get", highlight: false },
  { text: "on", highlight: false },
  { text: "a", highlight: false },
  { text: "legacy", highlight: true },
  { text: "building", highlight: false },
  { text: "journey", highlight: false },
  { text: "today,", highlight: false },
  { text: "to", highlight: false },
  { text: "build", highlight: false },
  { text: "the", highlight: false },
  { text: "future", highlight: true },
  { text: "of", highlight: false },
  { text: "tomorrow.", highlight: false },
];

const ManifestoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 bg-alcovia-black"
        style={{ y: backgroundY }}
      >
        {/* Radial gradient glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(68 100% 50% / 0.2) 0%, transparent 60%)',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </motion.div>
      
      {/* Offerings Pills */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {offerings.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.1, 
                y: -8,
                boxShadow: '0 20px 40px -10px hsl(68 100% 50% / 0.3)'
              }}
              className="px-6 py-4 md:px-8 md:py-5 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm cursor-pointer"
            >
              <span className="text-primary font-display font-bold text-lg md:text-xl">
                {item.title}
              </span>
              <span className="text-muted-foreground font-body text-lg md:text-xl ml-2">
                {item.subtitle}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Manifesto Text with word-by-word reveal */}
      <div ref={textRef} className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div className="manifesto-text text-3xl md:text-5xl lg:text-6xl flex flex-wrap justify-center gap-x-3 md:gap-x-4">
          {manifestoWords.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0, 
                rotateX: 0 
              } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.04,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={`inline-block ${word.highlight ? 'text-primary' : 'text-foreground'}`}
              whileHover={{ 
                scale: 1.1,
                color: 'hsl(68 100% 50%)',
                transition: { duration: 0.2 }
              }}
            >
              {word.text}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Decorative elements with parallax */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 border border-primary/20 rounded-full"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-24 h-24 border border-primary/20 rounded-full"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 right-20 w-4 h-4 bg-primary/50 rounded-full"
        animate={{ y: [0, -20, 0], scale: [1, 1.5, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 left-20 w-2 h-2 bg-primary rounded-full"
        animate={{ y: [0, 20, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </section>
  );
};

export default ManifestoSection;
