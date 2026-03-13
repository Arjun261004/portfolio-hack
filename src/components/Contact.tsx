import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export function Contact() {
  return (
    <section className="relative w-full py-20 px-8 flex justify-center z-20 mb-20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-4xl glass-panel p-8 md:p-12 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-cyber-purple/5 group-hover:bg-cyber-purple/10 transition-colors pointer-events-none" />
        
        <h2 className="text-3xl font-bold mb-8 text-glow text-cyber-purple uppercase text-center">
          Initiate Contact Protocol
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl text-cyber-blue font-mono mb-4">Transmission Channels</h3>
            
            <a href="mailto:hacker@example.com" className="flex items-center gap-4 text-cyber-gray-light hover:text-cyber-green transition-colors font-mono group/link">
              <div className="p-3 border border-cyber-green/30 rounded-sm group-hover/link:border-cyber-green group-hover/link:bg-cyber-green/10 transition-all">
                <Mail size={20} />
              </div>
              user@system.dev
            </a>

            <a href="#" className="flex items-center gap-4 text-cyber-gray-light hover:text-cyber-purple transition-colors font-mono group/link">
              <div className="p-3 border border-cyber-purple/30 rounded-sm group-hover/link:border-cyber-purple group-hover/link:bg-cyber-purple/10 transition-all">
                <Github size={20} />
              </div>
              github.com/developer
            </a>

            <a href="#" className="flex items-center gap-4 text-cyber-gray-light hover:text-cyber-blue transition-colors font-mono group/link">
              <div className="p-3 border border-cyber-blue/30 rounded-sm group-hover/link:border-cyber-blue group-hover/link:bg-cyber-blue/10 transition-all">
                <Linkedin size={20} />
              </div>
              linkedin.com/in/developer
            </a>
          </div>

          {/* Form */}
          <form className="space-y-4 font-mono">
            <div>
              <input 
                type="text" 
                placeholder="YOUR_NAME" 
                className="w-full bg-cyber-black/50 border border-cyber-green/30 p-3 text-cyber-green outline-none focus:border-cyber-green focus:shadow-[0_0_10px_#00ff41] transition-all"
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="YOUR_EMAIL@EXAMPLE.COM" 
                className="w-full bg-cyber-black/50 border border-cyber-green/30 p-3 text-cyber-green outline-none focus:border-cyber-green focus:shadow-[0_0_10px_#00ff41] transition-all"
              />
            </div>
            <div>
              <textarea 
                placeholder="TRANSMISSION_PAYLOAD..." 
                rows={4}
                className="w-full bg-cyber-black/50 border border-cyber-green/30 p-3 text-cyber-green outline-none focus:border-cyber-green focus:shadow-[0_0_10px_#00ff41] transition-all resize-none"
              ></textarea>
            </div>
            <button 
              type="button" 
              className="w-full py-4 border-2 border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-cyber-black transition-all font-bold tracking-widest flex justify-center items-center gap-2"
            >
              SEND DATA <Send size={18} />
            </button>
          </form>
        </div>

        {/* Decorative corner brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyber-purple/50" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyber-purple/50" />
      </motion.div>
    </section>
  );
}
