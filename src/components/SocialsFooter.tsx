import { motion } from 'framer-motion';
import { Linkedin, Instagram } from 'lucide-react';
import alcoviaLogo from '@/assets/alcovia-logo.jpg';

const socialCards = [
  {
    id: 1,
    platform: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/company/alcovia",
    color: "from-blue-600 to-blue-800",
    rotate: -12,
    zIndex: 1
  },
  {
    id: 2,
    platform: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/alcovia",
    color: "from-pink-500 via-purple-500 to-orange-500",
    rotate: -6,
    zIndex: 2
  },
  {
    id: 3,
    platform: "Community",
    icon: null,
    url: "https://alcovia.life",
    color: "from-alcovia-lime/80 to-alcovia-lime",
    rotate: 0,
    zIndex: 3,
    isMain: true
  },
  {
    id: 4,
    platform: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/alcovia",
    color: "from-pink-500 via-purple-500 to-orange-500",
    rotate: 6,
    zIndex: 2
  },
  {
    id: 5,
    platform: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/company/alcovia",
    color: "from-blue-600 to-blue-800",
    rotate: 12,
    zIndex: 1
  },
];

const SocialsFooter = () => {
  return (
    <footer className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-alcovia-dark to-alcovia-black" />

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
          className="flex justify-center items-center mb-20"
        >
          <div className="relative flex items-center justify-center h-80 w-full max-w-2xl">
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
                  x: (index - 2) * 30,
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
                  y: -20, 
                  scale: 1.1,
                  rotate: 0,
                  zIndex: 10
                }}
                className="absolute w-40 h-56 md:w-48 md:h-64 rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-[0_0_40px_hsl(68_100%_50%_/_0.3)]"
                style={{ 
                  zIndex: card.zIndex,
                  transformOrigin: 'bottom center'
                }}
              >
                {/* Card Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color}`} />
                
                {/* Card Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-6">
                  {card.isMain ? (
                    <>
                      <div className="w-16 h-16 rounded-full bg-background/20 flex items-center justify-center mb-4 overflow-hidden">
                        <img src={alcoviaLogo} alt="Alcovia" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-display font-bold text-primary-foreground text-lg">
                        Join Us
                      </span>
                    </>
                  ) : (
                    <>
                      {card.icon && <card.icon className="w-12 h-12 text-foreground mb-4" />}
                      <span className="font-display font-bold text-foreground text-sm">
                        {card.platform}
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
          className="text-center pt-12 border-t border-border/30"
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
