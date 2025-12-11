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
      {/* Animated background with fire theme */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-alcovia-black via-alcovia-darker to-alcovia-dark"
        style={{ y: backgroundY }}
      >
        {/* Subtle photo background */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/addition/General Website Photos/photo-5.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(40px)',
          }}
        />
        {/* Multiple radial gradient glows */}
        <motion.div
          className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, hsl(12 100% 60% / 0.3) 0%, hsl(350 89% 60% / 0.15) 40%, transparent 70%)',
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 100, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-2xl"
          style={{
            background: 'radial-gradient(circle, hsl(340 100% 65% / 0.3) 0%, hsl(350 89% 60% / 0.15) 40%, transparent 70%)',
          }}
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -80, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
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
                scale: 1.15, 
                y: -12,
                boxShadow: '0 25px 50px -10px hsl(12 100% 60% / 0.5), 0 0 60px hsl(350 89% 60% / 0.3)',
                rotate: [0, -2, 2, 0]
              }}
              className="px-6 py-4 md:px-8 md:py-5 rounded-full border-2 border-primary/40 bg-gradient-to-r from-card/60 to-card/40 backdrop-blur-md cursor-pointer hover:border-primary/80 transition-all duration-300"
              style={{
                boxShadow: '0 10px 30px -5px hsl(12 100% 60% / 0.2)'
              }}
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

      {/* Decorative elements with parallax and fire theme */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 border-2 border-alcovia-orange/30 rounded-full"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [0, -50]),
          boxShadow: '0 0 30px hsl(12 100% 60% / 0.3)'
        }}
        animate={{ 
          rotate: 360,
          borderColor: ['hsl(12 100% 60% / 0.3)', 'hsl(350 89% 60% / 0.3)', 'hsl(12 100% 60% / 0.3)']
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          borderColor: { duration: 4, repeat: Infinity }
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-24 h-24 border-2 border-alcovia-red/30 rounded-full"
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [0, 50]),
          boxShadow: '0 0 30px hsl(350 89% 60% / 0.3)'
        }}
        animate={{ 
          rotate: -360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity }
        }}
      />
      <motion.div
        className="absolute top-1/2 right-20 w-6 h-6 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(12 100% 60%) 0%, hsl(350 89% 60%) 100%)',
          boxShadow: '0 0 20px hsl(12 100% 60% / 0.6)'
        }}
        animate={{ 
          y: [0, -30, 0], 
          scale: [1, 1.8, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 left-20 w-4 h-4 rounded-full"
        style={{
          background: 'hsl(350 89% 60%)',
          boxShadow: '0 0 15px hsl(350 89% 60% / 0.8)'
        }}
        animate={{ 
          y: [0, 25, 0], 
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.5, 1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Additional floating fire particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 2 === 0 ? 'hsl(12 100% 60%)' : 'hsl(340 100% 65%)',
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 30}%`,
            boxShadow: `0 0 10px ${i % 2 === 0 ? 'hsl(12 100% 60% / 0.8)' : 'hsl(340 100% 65% / 0.8)'}`
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeOut"
          }}
        />
      ))}
    </section>
  );
};

export default ManifestoSection;
