import { motion } from 'framer-motion';

export const ScanlineOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* Subtle CRT Flicker */}
      <motion.div 
        className="absolute inset-0 bg-white/[0.015]"
        animate={{ opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 0.1, repeat: Infinity }}
      />
      
      {/* Moving Scanline */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-1 bg-cyber-green/[0.03] blur-[1px]"
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Static Scanlines */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 2px, 3px 100%'
        }}
      />
    </div>
  );
};
