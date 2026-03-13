import { motion } from 'framer-motion';
import { Database, ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "NeuroSys Anomaly Detector",
    description: "An ML-powered pipeline detecting anomalous events in distributed system logs using autoencoders.",
    tech: ["Python", "TensorFlow", "Kafka", "Elasticsearch"],
    github: "#",
    demo: "#"
  },
  {
    title: "Quantum File Encryptor",
    description: "A fast file encryption utility that combines AES-256 with quantum-resistant key exchange algorithms (simulated).",
    tech: ["C++", "OpenSSL", "Cryptography"],
    github: "#",
    demo: "#"
  },
  {
    title: "Cyber-Protocol Router",
    description: "Custom overlay network implementation to route proxy traffic efficiently across decentralized nodes.",
    tech: ["Go", "gRPC", "Docker", "Redis"],
    github: "#",
    demo: "#"
  },
  {
    title: "Terminal.OS Frontend",
    description: "A web-based terminal emulator providing a simulated OS environment inside the browser for managing server configs.",
    tech: ["React", "TypeScript", "xterm.js"],
    github: "#",
    demo: "#"
  }
];

export function Projects() {
  return (
    <section className="relative w-full py-20 px-8 flex flex-col items-center z-20">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold mb-12 text-glow text-cyber-green flex items-center gap-4">
          <Database className="text-cyber-purple" />
          DATABASE.QEURY("PROJECTS")
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass-panel p-8 relative group"
            >
              {/* Background abstract shape */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-purple/10 rounded-full blur-3xl -z-10 group-hover:bg-cyber-blue/20 transition-colors duration-500" />
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-cyber-blue group-hover:text-cyber-green transition-colors">{project.title}</h3>
                <div className="flex gap-3 text-cyber-gray-light">
                  <a href={project.github} className="hover:text-cyber-green transition-colors">
                    <Github size={20} />
                  </a>
                  <a href={project.demo} className="hover:text-cyber-purple transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              <p className="text-cyber-green/70 mb-6 font-mono text-sm leading-relaxed h-16">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-xs font-mono px-2 py-1 bg-cyber-black text-cyber-blue border border-cyber-blue/30 rounded-sm">
                    {t}
                  </span>
                ))}
              </div>

              {/* Bracket UI decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-purple/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-purple/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
