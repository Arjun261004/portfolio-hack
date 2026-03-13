import React, { useState } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface GlitchConsoleProps {
  onGlitch: () => void;
  progress: MotionValue<number>;
}

export const GlitchConsole: React.FC<GlitchConsoleProps> = ({ onGlitch, progress }) => {
  const [inputValue, setInputValue] = useState('');
  
  // Hide the console once zooming starts (progress > 0.05)
  const opacity = useTransform(progress, [0, 0.05], [1, 0]);
  const pointerEvents = useTransform(progress, (v) => v > 0.05 ? 'none' : 'auto');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setInputValue(val);
    if (val === 'HACK') {
      onGlitch();
      setInputValue('');
    }
  };

  return (
    <motion.div 
      style={{ opacity, pointerEvents }}
      className="absolute top-[300px] left-8 z-[60] font-mono hidden lg:block"
    >
      {/* 20% Bigger, Fully Opaque Black Box with Green Theme */}
      <div className="border-2 border-[#00ff41] bg-black p-5 shadow-[0_0_30px_rgba(0,255,65,0.2)] w-[310px]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#00ff41] text-[16px] font-black tracking-[0.2em] uppercase">
               &gt;&gt; DO NOT <span className="text-red-600 animate-pulse">"HACK"</span> !!
            </span>
          </div>
          
          <div className="relative w-full group">
            <div className="absolute inset-0 bg-[#00ff41]/5 border border-[#00ff41]/30 group-focus-within:border-[#00ff41]/80 transition-colors" />
            <div className="relative flex items-center px-3 py-3 gap-2">
              <span className="text-[#00ff41] text-md font-black">$</span>
              <input 
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="SYSTEM_ID..."
                className="bg-transparent border-none outline-none text-[#00ff41] text-sm w-full placeholder:text-[#00ff41]/20 uppercase tracking-widest font-black"
              />
            </div>
            
            {/* Decorative corners in theme green */}
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-[#00ff41]" />
            <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-[#00ff41]" />
          </div>

          <div className="text-[11px] text-[#00ff41] font-black uppercase tracking-widest border-t border-[#00ff41]/20 pt-2">
            CAUTION: SYSTEM ACCESS MONITOR
          </div>
        </div>
      </div>
    </motion.div>
  );
};
