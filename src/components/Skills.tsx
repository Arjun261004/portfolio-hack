import { motion } from 'framer-motion';

const skills = [
  { name: 'Python', level: 95 },
  { name: 'Java', level: 90 },
  { name: 'React', level: 85 },
  { name: 'Data Structures', level: 98 },
  { name: 'Machine Learning', level: 75 },
  { name: 'Algorithms', level: 95 },
  { name: 'TypeScript', level: 88 },
  { name: 'Node.js', level: 80 },
  { name: 'System Design', level: 85 }
];

export function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section className="relative w-full py-20 px-8 text-cyber-green flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold mb-12 text-glow flex items-center gap-4">
          <span className="text-cyber-blue">&gt;</span> SYSTEM.MODULES.SKILLS()
        </h2>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="glass-panel p-6 relative group hover:border-cyber-green transition-colors cursor-crosshair overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyber-green/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              
              <div className="flex justify-between items-center mb-4 relative z-10">
                <span className="font-mono text-lg">{skill.name}</span>
                <span className="text-cyber-blue font-mono text-sm">{skill.level}%</span>
              </div>
              
              {/* Circuit Node Visual */}
              <div className="w-full h-1 bg-cyber-black relative z-10">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, delay: 0.2 + index * 0.1 }}
                  className="h-full bg-cyber-green glow-line shadow-[0_0_10px_#00ff41]" 
                />
              </div>

              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyber-green/50" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyber-green/50" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
