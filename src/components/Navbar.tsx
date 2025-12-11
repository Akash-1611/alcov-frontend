import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import alcoviaLogo from '@/assets/alcovia-logo.jpg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 10, 10, 0.0)', 'rgba(10, 10, 10, 0.9)']
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(20px)']
  );
  
  const borderOpacity = useTransform(
    scrollY,
    [0, 100],
    [0, 0.3]
  );

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });

    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    // Set dark mode by default on initial load
    document.documentElement.classList.add('dark');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const navItems = [
    { name: 'About', href: '#manifesto' },
    { name: 'Programs', href: '#offerings' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Team', href: '#team' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50 transition-all duration-500"
    >
      {/* Curvy backdrop with enhanced styling */}
      <motion.div 
        className="absolute inset-0 rounded-3xl border-2 transition-all duration-500"
        style={{ 
          backgroundColor,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
          borderColor: `hsl(45 100% 55% / ${isScrolled ? '0.4' : '0.2'})`,
          boxShadow: isScrolled 
            ? '0 20px 60px -10px hsl(45 100% 55% / 0.3), 0 0 40px hsl(0 60% 35% / 0.2)' 
            : '0 10px 40px -10px hsl(45 100% 55% / 0.1), 0 0 20px hsl(0 60% 35% / 0.1)'
        }}
      />
      
      <div className="flex items-center justify-between w-full relative z-10 px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        {/* Logo with enhanced glow effect */}
        <motion.div 
          className="flex items-center gap-3 relative group -ml-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute -inset-2 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(circle, hsl(45 100% 55% / 0.4), hsl(0 60% 35% / 0.2), transparent)'
            }}
          />
          <div className="relative flex items-center gap-3">
            <img 
              src={alcoviaLogo} 
              alt="Alcovia" 
              className="h-8 sm:h-10 lg:h-12 w-auto rounded-lg border-2 border-alcovia-orange/30"
              style={{
                filter: 'drop-shadow(0 0 15px hsl(45 100% 55% / 0.4))'
              }}
            />
            <motion.span 
              className="font-display font-bold text-lg sm:text-xl text-gradient hidden md:block"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ALCOVIA
            </motion.span>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="relative font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.name}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-alcovia-orange to-alcovia-red rounded-full opacity-0 group-hover:opacity-100"
                layoutId="navUnderline"
              />
            </motion.a>
          ))}
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle - Always visible */}
          <motion.button
            onClick={toggleTheme}
            className="relative p-2 sm:p-2.5 rounded-2xl bg-card/60 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all duration-300 group flex-shrink-0 z-10"
            whileHover={{ scale: 1.05, rotateY: 10 }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: 'preserve-3d' }}
            aria-label="Toggle theme"
          >
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-alcovia-orange/20 to-alcovia-red/10 opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <motion.div
              animate={{ rotate: isDark ? 0 : 180 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative z-10"
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-alcovia-orange" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-alcovia-red" />
              )}
            </motion.div>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 sm:p-2.5 rounded-2xl bg-card/60 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all duration-300 flex-shrink-0 z-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground" />
              ) : (
                <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground" />
              )}
            </motion.div>
          </motion.button>

          {/* CTA Button - Responsive visibility */}
          <motion.a
            href="https://alcovia.life"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block px-4 py-2 rounded-2xl bg-gradient-to-r from-alcovia-orange via-alcovia-red to-alcovia-deep-orange font-semibold text-sm text-primary-foreground relative overflow-hidden group border border-alcovia-orange/30"
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              boxShadow: '0 4px 20px hsl(45 100% 55% / 0.3), 0 0 30px hsl(0 60% 35% / 0.2)'
            }}
          >
            <span className="relative z-10">Join Alcovia</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-alcovia-red to-alcovia-orange opacity-0 group-hover:opacity-100 rounded-2xl"
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
        className="lg:hidden overflow-hidden border-t border-border/30 mt-4 mx-6"
      >
        <div className="py-6 space-y-4">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="block px-4 py-3 rounded-xl font-body text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-card/50 transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : -20
              }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </motion.a>
          ))}
          <motion.a
            href="https://alcovia.life"
            target="_blank"
            rel="noopener noreferrer"
            className="block mx-4 mt-6 btn-primary text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 20
            }}
            transition={{ delay: 0.4 }}
          >
            Join Alcovia
          </motion.a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
