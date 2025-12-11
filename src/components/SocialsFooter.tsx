import { motion } from 'framer-motion';
import { Linkedin, Instagram } from 'lucide-react';
import alcoviaLogo from '@/assets/alcovia-logo.jpg';

const socialCards = [
  {
    id: 1,
    platform: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/company/alcovia",
    color: "from-blue-600 via-blue-700 to-blue-900",
    rotate: -15,
    zIndex: 1
  },
  {
    id: 2,
    platform: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/alcovia",
    color: "from-pink-500 via-purple-500 to-orange-500",
    rotate: -8,
    zIndex: 2
  },
  {
    id: 3,
    platform: "Community",
    icon: null,
    url: "https://alcovia.life",
    color: "from-alcovia-orange via-alcovia-red to-alcovia-deep-orange",
    rotate: 0,
    zIndex: 3,
    isMain: true
  },
  {
    id: 4,
    platform: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/alcovia",
    color: "from-purple-500 via-pink-500 to-orange-500",
    rotate: 8,
    zIndex: 2
  },
  {
    id: 5,
    platform: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/company/alcovia",
    color: "from-blue-700 via-blue-800 to-blue-900",
    rotate: 15,
    zIndex: 1
  },
];

const SocialsFooter = () => {
  return (
    <footer className="relative py-20 md:py-32 overflow-hidden">
      {/* Background with fire theme */}
      <div className="absolute inset-0 bg-gradient-to-t from-alcovia-dark via-alcovia-black to-alcovia-darker" />
      
      {/* Animated background effects */}
      <motion.div
        className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(12 100% 60% / 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 100, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[700px] h-[700px] rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(350 89% 60% / 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.5, 1],
          x: [0, -100, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="hero-text text-4xl md:text-6xl lg:text-7xl mb-4">
            <span className="text-foreground">WHAT'S UP </span>
            <span className="text-gradient">ON SOCIALS</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            Follow Alcovia on social media
          </p>
        </motion.div>

        {/* Fanned Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center items-center mb-16"
        >
          <div className="relative flex items-center justify-center h-96 w-full max-w-4xl">
            {socialCards.map((card, index) => (
              <motion.a
                key={card.id}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ 
                  rotate: 0, 
                  x: 0,
                  scale: 0.8,
                  opacity: 0 
                }}
                whileInView={{ 
                  rotate: card.rotate, 
                  x: (index - 2) * 50,
                  scale: 1,
                  opacity: 1 
                }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ 
                  y: -40, 
                  scale: 1.2,
                  rotate: 0,
                  zIndex: 10,
                  boxShadow: '0 40px 80px -10px rgba(0,0,0,0.9), 0 0 120px hsl(45 100% 55% / 0.8), 0 0 150px hsl(0 60% 35% / 0.6)'
                }}
                className="absolute w-56 h-80 md:w-64 md:h-88 lg:w-72 lg:h-96 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500"
                style={{
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.6), 0 0 30px hsl(12 100% 60% / 0.2)'
                }}
                style={{ 
                  zIndex: card.zIndex,
                  transformOrigin: 'bottom center'
                }}
              >
                {/* Card Background with animation */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color}`}>
                  {/* Animated overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                    animate={{
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  />
                </div>
                
                {/* Glow effect for main card */}
                {card.isMain && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      boxShadow: '0 0 60px hsl(12 100% 60% / 0.4) inset'
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 60px hsl(12 100% 60% / 0.4) inset',
                        '0 0 80px hsl(350 89% 60% / 0.6) inset',
                        '0 0 60px hsl(12 100% 60% / 0.4) inset'
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                
                {/* Card Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-8 z-10">
                  {card.isMain ? (
                    <>
                      <motion.div 
                        className="w-24 h-24 rounded-full bg-background/20 flex items-center justify-center mb-6 overflow-hidden border-4 border-white/30"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <img src={alcoviaLogo} alt="Alcovia" className="w-full h-full object-cover" />
                      </motion.div>
                      <span className="font-display font-bold text-primary-foreground text-xl mb-2">
                        Join Alcovia
                      </span>
                      <span className="font-body text-primary-foreground/80 text-sm text-center">
                        Building Future Leaders
                      </span>
                    </>
                  ) : (
                    <>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        className="mb-6"
                      >
                        {card.icon && <card.icon className="w-16 h-16 text-foreground" />}
                      </motion.div>
                      <span className="font-display font-bold text-foreground text-lg mb-2">
                        {card.platform}
                      </span>
                      <span className="font-body text-foreground/70 text-sm">
                        Follow Us
                      </span>
                    </>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center pt-8 border-t border-border/30"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <img src={alcoviaLogo} alt="Alcovia" className="h-10 w-auto" />
            
            {/* Links */}
            <div className="flex gap-8">
              <a href="https://alcovia.life" className="text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                About
              </a>
              <a href="https://alcovia.life" className="text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                Programs
              </a>
              <a href="https://alcovia.life" className="text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                Contact
              </a>
            </div>

            {/* Copyright */}
            <p className="text-muted-foreground font-body text-sm">
              © 2024 Alcovia. Ahead of the Curve.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default SocialsFooter;
