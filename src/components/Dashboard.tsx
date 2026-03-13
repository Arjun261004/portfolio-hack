import { User } from 'lucide-react';
import { motion } from 'framer-motion';

export function Dashboard() {
  return (
    <section className="relative w-full min-h-screen p-8 pt-32 text-cyber-green flex flex-col items-center z-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="glass-panel w-full max-w-5xl rounded-lg p-8 box-glow relative overflow-hidden"
      >
        <div className="absolute top-0 flex w-full h-1 bg-cyber-green/20">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 2, delay: 0.5 }}
            className="h-full bg-cyber-green glow-line"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Hologram Avatar Placeholder */}
          <div className="relative w-48 h-48 rounded-full border-2 border-cyber-green/50 flex items-center justify-center dashboard-avatar-glow">
            <div className="absolute inset-0 rounded-full border border-cyber-blue/50 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-0 rounded-full border border-cyber-purple/50 animate-[spin_15s_linear_infinite_reverse]" />
            <User size={64} className="text-cyber-green opacity-80" />
            <div className="absolute bottom-[-10px] w-32 h-2 bg-cyber-green blur-md opacity-50" />
          </div>

          <div className="flex-1 space-y-4">
            <h2 className="text-sm tracking-[0.3em] text-cyber-blue">ID: DEV-7734</h2>
            <h1 className="text-5xl font-bold text-glow uppercase">Computer Science Engineer</h1>
            <h3 className="text-2xl text-cyber-gray-light font-mono">Software Developer // System Architect</h3>
            
            <p className="max-w-xl text-cyber-green/80 mt-6 leading-relaxed bg-cyber-black/50 p-4 border-l-4 border-cyber-green">
              Expert in full-stack development, distributed systems, and algorithmic optimization. 
              Currently hacking code to create highly performant and immersive digital experiences.
            </p>

            <div className="flex gap-4 mt-8">
              <div className="px-4 py-2 border border-cyber-blue/30 bg-cyber-blue/10 text-cyber-blue font-mono text-sm">
                STATUS: ONLINE
              </div>
              <div className="px-4 py-2 border border-cyber-green/30 bg-cyber-green/10 font-mono text-sm">
                ACCESS LEVEL: ROOT
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
