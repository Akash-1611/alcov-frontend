import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// All 20 photos from the General Website Photos folder
const photos = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: `/addition/General Website Photos/photo-${i + 1}.jpg`,
  alt: `Alcovia activity ${i + 1}`,
}));

// Featured photos (larger files, likely better quality) for hero/featured sections
const featuredPhotos = [2, 3, 4, 6]; // photo-2, photo-3, photo-4, photo-6

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const displayedPhotos = filter === 'featured' 
    ? photos.filter(p => featuredPhotos.includes(p.id))
    : photos;

  // Reset selected photo when filter changes
  const handleFilterChange = (newFilter: 'all' | 'featured') => {
    setFilter(newFilter);
    setSelectedPhoto(null); // Close lightbox if open
  };

  const selectedIndex = selectedPhoto !== null 
    ? displayedPhotos.findIndex(p => p.id === selectedPhoto)
    : -1;

  const nextPhoto = () => {
    if (selectedIndex < displayedPhotos.length - 1) {
      setSelectedPhoto(displayedPhotos[selectedIndex + 1].id);
    } else {
      setSelectedPhoto(displayedPhotos[0].id);
    }
  };

  const prevPhoto = () => {
    if (selectedIndex > 0) {
      setSelectedPhoto(displayedPhotos[selectedIndex - 1].id);
    } else {
      setSelectedPhoto(displayedPhotos[displayedPhotos.length - 1].id);
    }
  };

  return (
    <section className="relative py-responsive overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-alcovia-dark via-alcovia-black to-alcovia-darker" />
      
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(45 100% 55% / 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10 container-responsive">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.span
            className="text-primary font-body text-sm tracking-[0.3em] uppercase block mb-4"
          >
            Our Journey
          </motion.span>
          <h2 className="hero-text text-responsive-4xl mb-6">
            <span className="text-foreground">See Alcovia </span>
            <span className="text-gradient">In Action</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto mb-8">
            Explore moments from our programs, workshops, mentorship sessions, and community events
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={() => handleFilterChange('all')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-alcovia-orange via-alcovia-red to-alcovia-deep-orange text-primary-foreground'
                  : 'bg-card/60 backdrop-blur-md border border-border/50 text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Photos ({photos.length})
            </motion.button>
            <motion.button
              onClick={() => handleFilterChange('featured')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                filter === 'featured'
                  ? 'bg-gradient-to-r from-alcovia-orange via-alcovia-red to-alcovia-deep-orange text-primary-foreground'
                  : 'bg-card/60 backdrop-blur-md border border-border/50 text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Featured ({featuredPhotos.length})
            </motion.button>
          </div>
        </motion.div>

        {/* Gallery Grid - Premium Scattered Polaroid Style */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="relative w-full min-h-[600px]"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              padding: '2rem 0',
            }}
          >
            {displayedPhotos.map((photo, index) => {
              const isFeatured = featuredPhotos.includes(photo.id);
              
              // Create natural scattered rotation angles
              const rotations = [2, -3, 1, -2, 3, -1, 2, -3, 1, -2, 3, -1, 2, -3, 1, -2, 3, -1, 2, -3];
              const rotation = rotations[index % rotations.length];
              
              // Varied hover rotations
              const hoverRotation = index % 2 === 0 ? 0 : 0;
              
              return (
                <motion.div
                  key={photo.id}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.08,
                    rotate: hoverRotation,
                    zIndex: 50,
                    y: -20,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  }}
                  onClick={() => setSelectedPhoto(photo.id)}
                  data-interactive="true"
                  className="group relative cursor-pointer"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                  }}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8, 
                    rotate: rotation + (index % 3 - 1) * 5,
                    y: 50 
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: rotation,
                    y: 0 
                  }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                >
                  {/* Polaroid Frame with 3D depth */}
                  <div
                    className="relative bg-white p-3 pb-16 shadow-2xl"
                    style={{
                      boxShadow: `
                        0 1px 3px rgba(0,0,0,0.12),
                        0 1px 2px rgba(0,0,0,0.24),
                        0 10px 40px rgba(0,0,0,0.3),
                        0 0 80px rgba(255,183,77,0.15)
                      `,
                      transform: 'translateZ(0)',
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
                        loading="lazy"
                        decoding="async"
                        style={{
                          filter: 'contrast(1.05) saturate(1.1)',
                        }}
                      />
                      
                      {/* Vignette Effect */}
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.15)',
                        }}
                      />
                    </div>

                    {/* Handwritten-style Caption */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span 
                        className="text-gray-700 text-sm font-handwriting"
                        style={{
                          fontFamily: '"Brush Script MT", cursive',
                          transform: 'rotate(-1deg)',
                        }}
                      >
                        Memory #{photo.id}
                      </span>
                      {isFeatured && (
                        <motion.span
                          className="text-alcovia-orange text-lg"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            delay: index * 0.08 + 0.4,
                            type: "spring",
                            stiffness: 200,
                            damping: 10
                          }}
                        >
                          ⭐
                        </motion.span>
                      )}
                    </div>

                    {/* Tape Effect on Top */}
                    <motion.div
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/60 backdrop-blur-sm"
                      style={{
                        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
                        transform: 'translateX(-50%) rotate(-2deg)',
                      }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 0.7, y: 0 }}
                      transition={{ delay: index * 0.08 + 0.2 }}
                    />

                    {/* Paper Texture Overlay */}
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-[0.03]"
                      style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
                      }}
                    />

                    {/* Hover Glow */}
                    <motion.div
                      className="absolute -inset-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(255,183,77,0.4), transparent 70%)',
                        filter: 'blur(20px)',
                      }}
                    />
                  </div>

                  {/* Floating Pin/Tack Shadow */}
                  <motion.div
                    className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-6 opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'radial-gradient(circle, rgba(0,0,0,0.3), transparent)',
                      filter: 'blur(4px)',
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-4 z-[10000] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-border/50 text-foreground flex items-center justify-center hover:bg-card transition-colors z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Navigation Buttons */}
              {displayedPhotos.length > 1 && (
                <>
                  <motion.button
                    onClick={prevPhoto}
                    className="absolute left-4 w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-border/50 text-foreground flex items-center justify-center hover:bg-card transition-colors z-10"
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>
                  <motion.button
                    onClick={nextPhoto}
                    className="absolute right-4 w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-border/50 text-foreground flex items-center justify-center hover:bg-card transition-colors z-10"
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </>
              )}

              {/* Image */}
              <motion.img
                key={selectedPhoto}
                src={displayedPhotos[selectedIndex]?.src}
                alt={displayedPhotos[selectedIndex]?.alt}
                className="max-w-full max-h-full object-contain rounded-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />

              {/* Photo Counter */}
              <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-md border border-border/50 text-foreground text-sm font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {selectedIndex + 1} / {displayedPhotos.length}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;


