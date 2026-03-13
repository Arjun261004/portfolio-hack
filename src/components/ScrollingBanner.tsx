import { motion } from 'framer-motion';

export const ScrollingBanner = () => {
  const text = "AWAITING USER INPUT... SCROLL DOWN TO ENTER THE SYSTEM // ";
  const repeatedText = Array(10).fill(text).join("");

  return (
    <div className="absolute top-0 left-0 w-full overflow-hidden bg-cyber-green/5 border-b border-cyber-green/20 py-2 z-50 backdrop-blur-sm">
      <motion.div
        className="whitespace-nowrap flex"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="text-cyber-green text-sm font-bold tracking-[0.15em] opacity-80 uppercase">
          {repeatedText}
        </span>
      </motion.div>
    </div>
  );
};
