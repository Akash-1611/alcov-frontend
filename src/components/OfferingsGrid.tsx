import { motion } from 'framer-motion';
import { Briefcase, Mic, Users, Brain, Heart, GraduationCap, Calendar, Shield, Sparkles } from 'lucide-react';

const offerings = [
  {
    icon: Briefcase,
    title: "Career Discovery",
    subtitle: "Workshops",
    description: "Explore diverse career paths with hands-on workshops"
  },
  {
    icon: Mic,
    title: "Podcast Shoots",
    subtitle: "with Industry Experts",
    description: "Learn from leaders through exclusive podcast sessions"
  },
  {
    icon: Users,
    title: "1:1 Mentorship",
    subtitle: "with Top Professionals",
    description: "Personal guidance from industry veterans"
  },
  {
    icon: Brain,
    title: "Scientific Academic",
    subtitle: "Score Building",
    description: "Evidence-based methods to boost your grades"
  },
  {
    icon: Heart,
    title: "Forge Bonds",
    subtitle: "with Driven Teens",
    description: "Connect with similarly ambitious peers"
  },
  {
    icon: GraduationCap,
    title: "Harvard & UCL",
    subtitle: "Weekly Mentorship",
    description: "Learn from Ivy League professionals every week"
  },
  {
    icon: Calendar,
    title: "Monthly Career",
    subtitle: "Counsellor Meetings",
    description: "Regular check-ins to keep you on track"
  },
  {
    icon: Shield,
    title: "Build",
    subtitle: "Resilience",
    description: "Develop mental strength for any challenge"
  },
  {
    icon: Sparkles,
    title: "Build",
    subtitle: "Empathy",
    description: "Cultivate emotional intelligence"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const OfferingsGrid = () => {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-alcovia-black via-alcovia-dark to-alcovia-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
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
            What We Offer
          </motion.span>
          <h2 className="hero-text text-4xl md:text-6xl lg:text-7xl">
            <span className="text-foreground">The </span>
            <span className="text-gradient">Alcovia</span>
            <span className="text-foreground"> Experience</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {offerings.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              <motion.div
                className="relative w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300"
                whileHover={{ rotate: 5 }}
              >
                <item.icon className="w-7 h-7 text-primary" />
              </motion.div>

              {/* Content */}
              <div className="relative">
                <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-primary font-display font-semibold text-lg mb-3">
                  {item.subtitle}
                </p>
                <p className="text-muted-foreground font-body text-sm">
                  {item.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/50 group-hover:bg-primary transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OfferingsGrid;
