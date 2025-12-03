import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const offerings = [
  { title: "Mentorship", subtitle: "from professionals" },
  { title: "Self", subtitle: "Discovery" },
  { title: "Build", subtitle: "Leadership" },
  { title: "Meet", subtitle: "Future Builders" },
];

const ManifestoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-alcovia-black" />
      
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
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="px-6 py-4 md:px-8 md:py-5 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm"
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

      {/* Manifesto Text */}
      <motion.div 
        className="relative z-10 max-w-6xl mx-auto px-6"
        style={{ y: textY }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="manifesto-text text-3xl md:text-5xl lg:text-6xl"
        >
          <span className="text-foreground">Unprecedented </span>
          <span className="text-primary">Learnings</span>
          <span className="text-foreground">, Failing regularly, building with </span>
          <span className="text-primary">friends</span>
          <span className="text-foreground">, while being on a journey of </span>
          <span className="text-primary">self discovery</span>
          <span className="text-foreground">. Get on a </span>
          <span className="text-primary">legacy</span>
          <span className="text-foreground"> building journey today, to build the </span>
          <span className="text-primary">future</span>
          <span className="text-foreground"> of tomorrow.</span>
        </motion.p>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 border border-primary/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-24 h-24 border border-primary/20 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
    </section>
  );
};

export default ManifestoSection;
