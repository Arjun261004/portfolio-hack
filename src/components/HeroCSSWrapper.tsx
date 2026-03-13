import { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import { MacbookCSS } from './MacbookCSS';

export const HeroCSSWrapper = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fade out the Macbook scene at the very end of the scroll (when terminal is done)
  const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.85, 1], [1, 1.2]);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh]">
      <motion.div 
        style={{ opacity, scale }}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-black via-neutral-950 to-neutral-900"
      >
         <MacbookCSS />
      </motion.div>
    </div>
  );
};
