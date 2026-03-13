import { motion } from 'framer-motion';

export const BiometricScan = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex items-center justify-center bg-black/80 z-[70] backdrop-blur-sm"
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Scanning Reticle */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          <motion.div 
            className="absolute inset-0 border-2 border-dashed border-cyber-green opacity-40 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-4 border border-cyber-green opacity-60 rounded-full"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Fingerprint Icon (Approximated with CSS) */}
          <div className="relative w-20 h-28 border-2 border-cyber-green/40 rounded-t-full flex flex-col gap-2 p-2 overflow-hidden">
             {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="w-full h-[2px] bg-cyber-green/40 rounded-full"
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ delay: i * 0.1, duration: 1, repeat: Infinity }}
                />
             ))}
             {/* Scan line */}
             <motion.div 
               className="absolute left-0 top-0 w-full h-[2px] bg-cyber-green shadow-[0_0_10px_#00ff41]"
               animate={{ top: ['0%', '100%'] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-cyber-green text-sm font-bold tracking-[0.3em] font-mono animate-pulse">
            BIO-IDENT_SCANNING
          </span>
          <span className="text-cyber-green/60 text-[10px] font-mono tracking-widest">
            AWAITING AUTHORIZATION...
          </span>
        </div>
      </div>
    </motion.div>
  );
};
