import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Founder & CEO",
    image: "/team/Screenshot 2025-12-04 014416.png",
    bio: "Harvard MBA with 10+ years in EdTech innovation",
    social: { linkedin: "#", twitter: "#", email: "alex@alcovia.life" }
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Head of Mentorship",
    image: "/team/Screenshot 2025-12-04 014424.png",
    bio: "UCL Psychology graduate, former McKinsey consultant",
    social: { linkedin: "#", twitter: "#", email: "sarah@alcovia.life" }
  },
  {
    id: 3,
    name: "Marcus Williams",
    role: "Lead Academic Advisor",
    image: "/team/Screenshot 2025-12-04 014435.png",
    bio: "Oxford PhD, specialized in student development",
    social: { linkedin: "#", twitter: "#", email: "marcus@alcovia.life" }
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    role: "Community Manager",
    image: "/team/Screenshot 2025-12-04 014442.png",
    bio: "Stanford graduate, expert in youth engagement",
    social: { linkedin: "#", twitter: "#", email: "emma@alcovia.life" }
  },
  {
    id: 5,
    name: "David Kim",
    role: "Technology Director",
    image: "/team/Screenshot 2025-12-04 014448.png",
    bio: "MIT Computer Science, former Google engineer",
    social: { linkedin: "#", twitter: "#", email: "david@alcovia.life" }
  },
  {
    id: 6,
    name: "Lisa Thompson",
    role: "Head of Operations",
    image: "/team/Screenshot 2025-12-04 014455.png",
    bio: "Wharton MBA, scaling education platforms globally",
    social: { linkedin: "#", twitter: "#", email: "lisa@alcovia.life" }
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const MeetTheTeam = () => {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-alcovia-darker via-alcovia-black to-alcovia-dark" />
      
      {/* Static background orbs */}
      <div
        className="absolute top-1/3 left-1/5 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(45 100% 55% / 0.3) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/5 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(0 60% 35% / 0.3) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
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
            Our Leadership
          </motion.span>
          <h2 className="hero-text text-4xl md:text-6xl lg:text-7xl mb-6">
            <span className="text-foreground">Meet The </span>
            <span className="text-gradient">Team</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Passionate educators and industry leaders dedicated to building the next generation of changemakers
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02
              }}
              className="group relative bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl rounded-3xl border-2 border-alcovia-orange/30 hover:border-alcovia-orange/60 transition-all duration-500 overflow-hidden"
              style={{
                boxShadow: '0 20px 60px -10px hsl(0 0% 0% / 0.6), 0 0 40px hsl(45 100% 55% / 0.1)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Static Background Pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 40%, hsl(45 100% 55% / 0.4) 0%, transparent 50%),
                                   radial-gradient(circle at 70% 60%, hsl(0 60% 35% / 0.3) 0%, transparent 50%)`
                }}
              />

              {/* Enhanced glow effect on hover */}
              <div 
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-alcovia-orange/15 via-alcovia-red/10 to-alcovia-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Image Container */}
              <div className="relative p-6 pb-0">
                <motion.div
                  className="relative w-full h-64 rounded-2xl overflow-hidden border-2 border-alcovia-orange/40"
                  whileHover={{ scale: 1.05 }}
                  style={{
                    boxShadow: '0 10px 40px hsl(45 100% 55% / 0.3), 0 0 60px hsl(0 60% 35% / 0.2)'
                  }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-alcovia-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative p-6 space-y-4">
                <div>
                  <motion.h3 
                    className="font-display font-bold text-xl text-foreground mb-1"
                    whileHover={{ scale: 1.02 }}
                  >
                    {member.name}
                  </motion.h3>
                  <p 
                    className="text-gradient font-display font-semibold text-base"
                  >
                    {member.role}
                  </p>
                </div>
                
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-3 pt-2">
                  <motion.a
                    href={member.social.linkedin}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-alcovia-orange/20 to-alcovia-red/10 flex items-center justify-center border border-alcovia-orange/30 hover:border-alcovia-orange/60 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotateZ: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-4 h-4 text-alcovia-orange" />
                  </motion.a>
                  <motion.a
                    href={member.social.twitter}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-alcovia-orange/20 to-alcovia-red/10 flex items-center justify-center border border-alcovia-orange/30 hover:border-alcovia-orange/60 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotateZ: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter className="w-4 h-4 text-alcovia-orange" />
                  </motion.a>
                  <motion.a
                    href={`mailto:${member.social.email}`}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-alcovia-orange/20 to-alcovia-red/10 flex items-center justify-center border border-alcovia-orange/30 hover:border-alcovia-orange/60 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotateZ: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-4 h-4 text-alcovia-orange" />
                  </motion.a>
                </div>
              </div>

              {/* Premium corner decoration */}
              <div
                className="absolute top-6 right-6 w-4 h-4 rounded-full bg-gradient-to-br from-alcovia-orange to-alcovia-red"
                style={{
                  boxShadow: '0 0 15px hsl(45 100% 55% / 0.6)'
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MeetTheTeam;