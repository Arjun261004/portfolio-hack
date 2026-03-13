import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const experiences = [
  {
    year: "2024 - Present",
    role: "Senior Systems Engineer",
    company: "CyberDyne Systems",
    description: "Architecting decentralized infrastructure and leading the neural-net optimization team."
  },
  {
    year: "2021 - 2024",
    role: "Full Stack Developer",
    company: "Neo-Tech Solutions",
    description: "Built scalable resilient APIs in Go and interactive 3D visualizations using WebGL/React."
  },
  {
    year: "2019 - 2021",
    role: "Security Analyst",
    company: "Grid Protocols",
    description: "Performed penetration testing and secured mainframe access layers. Discovered 3 zero-day vulnerabilities."
  }
];

export function Experience() {
  return (
    <section className="relative w-full py-20 px-8 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-16 text-glow text-cyber-blue flex items-center gap-4">
          <Activity className="text-cyber-green animate-pulse" />
          SYSTEM_HISTORY.LOG
        </h2>

        <div className="relative border-l-2 border-cyber-gray-light/30 pl-8 ml-4 md:ml-8 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {/* Timeline marker */}
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-cyber-black border-2 border-cyber-blue shadow-[0_0_10px_#0ff0fc]" />
              
              <div className="glass-panel p-6 relative group overflow-hidden">
                <div className="absolute inset-0 bg-cyber-blue/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                
                <span className="text-sm font-mono text-cyber-green/70 mb-2 block object-glow">
                  [{exp.year}]
                </span>
                <h3 className="text-xl font-bold text-cyber-blue mb-1">{exp.role}</h3>
                <h4 className="text-md text-cyber-purple mb-4 font-mono">@ {exp.company}</h4>
                <p className="text-cyber-gray-light/80 text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
