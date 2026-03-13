import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function GlitchOverlay({ trigger }: { trigger: boolean }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger) {
      setActive(true);
      const to = setTimeout(() => setActive(false), 1500); // Glitch duration
      return () => clearTimeout(to);
    }
  }, [trigger]);

  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0, 1, 0, 0.8, 0] }}
      transition={{ duration: 1.5, times: [0, 0.1, 0.2, 0.3, 0.4, 0.6, 1] }}
      className="fixed inset-0 z-50 pointer-events-none mix-blend-difference"
      style={{
        background: 'repeating-linear-gradient(0deg, rgba(255, 0, 60, 0.2) 0px, rgba(0, 255, 65, 0.2) 2px, transparent 2px, transparent 4px)'
      }}
    >
      <div className="w-full h-full bg-cyber-green opacity-20 filter invert" />
    </motion.div>
  );
}
