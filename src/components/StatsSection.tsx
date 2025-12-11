import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Users, Award, TrendingUp, Target } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 10000,
    suffix: '+',
    label: 'Active Students',
    description: 'Learning and growing together',
    color: 'from-alcovia-orange to-alcovia-red'
  },
  {
    icon: Award,
    value: 95,
    suffix: '%',
    label: 'Success Rate',
    description: 'Students achieving their goals',
    color: 'from-alcovia-red to-alcovia-pink'
  },
  {
    icon: TrendingUp,
    value: 500,
    suffix: '+',
    label: 'Programs Completed',
    description: 'Transformative experiences delivered',
    color: 'from-alcovia-deep-orange to-alcovia-orange'
  },
  {
    icon: Target,
    value: 50,
    suffix: '+',
    label: 'Expert Mentors',
    description: 'Harvard & UCL professionals',
    color: 'from-alcovia-orange via-alcovia-red to-alcovia-deep-orange'
  },
];

const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const StatsSection = () => {
  return (
    <section className="relative py-responsive overflow-hidden">
      {/* Dynamic Background with Multiple Photos */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-alcovia-darker via-alcovia-black to-alcovia-dark" />
        
        {/* Large background photo collage */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-2">
            {[15, 16, 17, 18, 19, 20].map((num, i) => (
              <motion.div
                key={num}
                className="relative overflow-hidden"
                initial={{ opacity: 0, scale: 1.2 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1 }}
              >
                <img
                  src={`/addition/General Website Photos/photo-${num}.jpg`}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: 'blur(20px) brightness(0.3)' }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, hsl(45 100% 55% / 0.3) 0%, hsl(0 60% 35% / 0.15) 50%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 container-responsive">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            className="text-primary font-body text-sm tracking-[0.3em] uppercase block mb-4"
          >
            Our Impact
          </motion.span>
          <h2 className="hero-text text-responsive-4xl mb-6">
            <span className="text-foreground">Numbers That </span>
            <span className="text-gradient">Matter</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Real results from real students building their futures with Alcovia
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl border-2 border-alcovia-orange/30 hover:border-alcovia-orange/60 transition-all duration-500 overflow-hidden">
                {/* Background Pattern */}
                <motion.div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `radial-gradient(circle at 30% 40%, hsl(45 100% 55% / 0.4) 0%, transparent 50%),
                                     radial-gradient(circle at 70% 60%, hsl(0 60% 35% / 0.3) 0%, transparent 50%)`
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                {/* Glow Effect */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-alcovia-orange/15 via-alcovia-red/10 to-alcovia-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Icon */}
                <motion.div
                  className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{
                    boxShadow: '0 10px 40px hsl(45 100% 55% / 0.3)'
                  }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-white/20"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Number */}
                <div className="relative mb-3">
                  <h3 className="font-display font-bold text-5xl text-gradient">
                    <AnimatedCounter value={stat.value} />
                    {stat.suffix}
                  </h3>
                </div>

                {/* Label */}
                <h4 className="font-display font-bold text-xl text-foreground mb-2">
                  {stat.label}
                </h4>

                {/* Description */}
                <p className="text-muted-foreground font-body text-sm">
                  {stat.description}
                </p>

                {/* Corner Decoration */}
                <motion.div
                  className="absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-br from-alcovia-orange to-alcovia-red"
                  animate={{
                    scale: [1, 1.5, 1],
                    boxShadow: [
                      '0 0 10px hsl(45 100% 55% / 0.5)',
                      '0 0 25px hsl(45 100% 55% / 0.8)',
                      '0 0 10px hsl(45 100% 55% / 0.5)'
                    ]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

