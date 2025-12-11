import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  title: string;
  videoSrc: string;
  thumbnail?: string;
  duration?: string;
  description?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    title: 'Parent Testimonial 1',
    videoSrc: 'https://res.cloudinary.com/dkk6j7jos/video/upload/v1765488210/Parent_Testimonial_1_1_pa4qvk.mp4',
    description: 'Hear from parents about their experience with Alcovia',
  },
  {
    id: 2,
    title: 'Parent Testimonial 2',
    videoSrc: 'https://res.cloudinary.com/dkk6j7jos/video/upload/v1765489233/Parent_Testimonial_2_1_qqblyd.mp4',
    description: 'Real stories from families who have seen transformation',
  },
];

const ParentTestimonials = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentTestimonial = selectedTestimonial !== null
    ? testimonials.find(t => t.id === selectedTestimonial)
    : null;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Throttle timeupdate for better performance
    let rafId: number;
    const updateTime = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setCurrentTime(video.currentTime);
          rafId = 0;
        });
      }
    };
    
    const updateDuration = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);
    
    // Optimize buffering
    const handleLoadStart = () => {
      video.playbackRate = 1.0;
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('loadstart', handleLoadStart);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('loadstart', handleLoadStart);
    };
  }, [selectedTestimonial]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(console.error);
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
  }, [isMuted]);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  };

  const selectedIndex = selectedTestimonial !== null
    ? testimonials.findIndex(t => t.id === selectedTestimonial)
    : -1;

  const nextTestimonial = () => {
    if (selectedIndex < testimonials.length - 1) {
      setSelectedTestimonial(testimonials[selectedIndex + 1].id);
      setIsPlaying(false);
    } else {
      setSelectedTestimonial(testimonials[0].id);
      setIsPlaying(false);
    }
  };

  const prevTestimonial = () => {
    if (selectedIndex > 0) {
      setSelectedTestimonial(testimonials[selectedIndex - 1].id);
      setIsPlaying(false);
    } else {
      setSelectedTestimonial(testimonials[testimonials.length - 1].id);
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative py-responsive overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-alcovia-darker via-alcovia-black to-alcovia-dark" />
      
      {/* Animated background orbs - Static for better performance */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(0 60% 35% / 0.3) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 container-responsive">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="text-primary font-body text-sm tracking-[0.3em] uppercase block mb-4"
          >
            Trusted by Families
          </motion.span>
          <h2 className="hero-text text-responsive-4xl mb-6">
            <span className="text-foreground">Parent </span>
            <span className="text-gradient">Testimonials</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Hear directly from parents about the impact Alcovia has had on their children's growth and development
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedTestimonial(testimonial.id)}
              className="group relative aspect-video rounded-3xl overflow-hidden cursor-pointer border-2 border-alcovia-orange/30 hover:border-alcovia-orange/60 transition-all duration-500"
              style={{
                boxShadow: '0 20px 60px -10px hsl(0 0% 0% / 0.6), 0 0 40px hsl(45 100% 55% / 0.1)',
              }}
            >
              {/* Video Preview/Thumbnail - Optimized */}
              <div className="absolute inset-0 bg-gradient-to-br from-alcovia-orange/20 via-alcovia-red/10 to-alcovia-darker">
                <video
                  src={testimonial.videoSrc}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                  muted
                  playsInline
                  preload="none"
                  poster=""
                />
              </div>

              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-alcovia-black/90 via-alcovia-black/50 to-transparent"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 0.9 }}
              />

              {/* Play Button */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="relative">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-alcovia-orange via-alcovia-red to-alcovia-deep-orange flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        '0 0 30px hsl(45 100% 55% / 0.5)',
                        '0 0 50px hsl(45 100% 55% / 0.8)',
                        '0 0 30px hsl(45 100% 55% / 0.5)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <Play className="w-10 h-10 text-white ml-1" fill="white" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  {testimonial.title}
                </h3>
                {testimonial.description && (
                  <p className="text-white/80 font-body text-sm">
                    {testimonial.description}
                  </p>
                )}
              </div>

              {/* Shine Effect - Removed for better performance */}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedTestimonial !== null && currentTestimonial && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedTestimonial(null);
                setIsPlaying(false);
              }}
              className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 z-[10000] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => {
                  setSelectedTestimonial(null);
                  setIsPlaying(false);
                }}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-border/50 text-foreground flex items-center justify-center hover:bg-card transition-colors z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Navigation Buttons */}
              {testimonials.length > 1 && (
                <>
                  <motion.button
                    onClick={prevTestimonial}
                    className="absolute left-4 w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-border/50 text-foreground flex items-center justify-center hover:bg-card transition-colors z-10"
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>
                  <motion.button
                    onClick={nextTestimonial}
                    className="absolute right-4 w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-border/50 text-foreground flex items-center justify-center hover:bg-card transition-colors z-10"
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </>
              )}

              {/* Video Container - Optimized */}
              <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-alcovia-black">
                <video
                  ref={videoRef}
                  src={currentTestimonial.videoSrc}
                  className="w-full h-full object-contain"
                  playsInline
                  preload="auto"
                  style={{
                    willChange: 'auto',
                  }}
                />

                {/* Video Controls Overlay - Simplified when playing */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                  initial={{ opacity: isPlaying ? 0 : 1 }}
                  animate={{ opacity: isPlaying ? 0 : 1 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
                    {/* Progress Bar */}
                    <div
                      className="w-full h-2 bg-white/20 rounded-full cursor-pointer overflow-hidden"
                      onClick={handleProgressClick}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-alcovia-orange to-alcovia-red rounded-full"
                        style={{
                          width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                        }}
                      />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <motion.button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-border/50 text-foreground flex items-center justify-center hover:bg-card transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {isPlaying ? (
                            <Pause className="w-6 h-6" />
                          ) : (
                            <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
                          )}
                        </motion.button>

                        <motion.button
                          onClick={() => setIsMuted(!isMuted)}
                          className="w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-border/50 text-foreground flex items-center justify-center hover:bg-card transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {isMuted ? (
                            <VolumeX className="w-6 h-6" />
                          ) : (
                            <Volume2 className="w-6 h-6" />
                          )}
                        </motion.button>

                        <span className="text-white text-sm font-mono">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>

                      <div className="text-white text-sm">
                        {selectedIndex + 1} / {testimonials.length}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ParentTestimonials;

