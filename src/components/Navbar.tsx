import { motion } from 'framer-motion';
import alcoviaLogo from '@/assets/alcovia-logo.jpg';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <img 
            src={alcoviaLogo} 
            alt="Alcovia" 
            className="h-10 md:h-12 w-auto"
          />
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href="https://alcovia.life"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm md:text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join Alcovia
        </motion.a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
