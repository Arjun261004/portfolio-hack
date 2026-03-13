import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CursorGlow: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring configuration for the outer ring
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check for interactive elements
      const target = e.target as HTMLElement;
      const isClickable = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer') ||
        getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Inner Dot - Fast & Precise */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#00ff41] rounded-full pointer-events-none z-[100] mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 10px #00ff41',
        }}
      />

      {/* Outer Ring - Smooth & Trailing */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#00ff41]/50 rounded-full pointer-events-none z-[99] mix-blend-screen"
        animate={{
          scale: isHovering ? 1.8 : 1,
          borderWidth: isHovering ? '1px' : '2px',
          opacity: isHovering ? 0.8 : 0.4,
          backgroundColor: isHovering ? 'rgba(0, 255, 65, 0.1)' : 'transparent',
        }}
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: isHovering ? '0 0 20px rgba(0, 255, 65, 0.3)' : 'none',
        }}
      />

      {/* Large Ambient Glow */}
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 bg-[#00ff41]/5 rounded-full pointer-events-none z-[98] mix-blend-screen blur-[100px]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
};
