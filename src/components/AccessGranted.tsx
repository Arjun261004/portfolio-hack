import React, { useRef, useEffect, useState } from 'react';
import { useScroll, motion, useTransform, AnimatePresence } from 'framer-motion';

const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`01';

const GlitchText: React.FC<{ text: string; active: boolean; delay?: number }> = ({ 
  text, 
  active, 
  delay = 0
}) => {
  const [displayText, setDisplayText] = useState(text.replace(/./g, ' '));
  const [isStable, setIsStable] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayText(text.replace(/./g, ' '));
      setIsStable(false);
      return;
    }

    const startTimeout = setTimeout(() => {
      let iteration = 0;
      const maxIterations = text.length * 4;
      const interval = setInterval(() => {
        setDisplayText(
          text.split('').map((char, i) => {
            if (char === ' ') return ' ';
            // Progressively stabilize characters
            if (i < iteration / 4 || isStable) return char;
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }).join('')
        );
        iteration++;
        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setTimeout(() => setIsStable(true), 200);
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [active, text, delay, isStable]);

  return (
    <span className={`transition-all duration-700 ${isStable ? 'drop-shadow-[0_0_50px_rgba(0,255,65,1)] text-[#00ff41] scale-110 brightness-125' : 'text-[#00ff41]'}`}>
      {displayText}
    </span>
  );
};

const HexDump: React.FC<{ active: boolean }> = ({ active }) => {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      const newLine = Array.from({ length: 4 }, () => 
        Math.floor(Math.random() * 65535).toString(16).padStart(4, '0').toUpperCase()
      ).join(' ');
      setLines(prev => [newLine, ...prev].slice(0, 12));
    }, 100);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="font-mono text-[8px] text-[#00ff41]/40 leading-tight select-none">
      {lines.map((line, i) => (
        <div key={i} className="whitespace-nowrap">{line}</div>
      ))}
    </div>
  );
};

const SystemLog: React.FC<{ active: boolean }> = ({ active }) => {
  const logs = [
    "INITIALIZING_QUANTUM_CORE...",
    "HANDSHAKE_ESTABLISHED",
    "DECRYPTING_BIO_METRIC_HASH",
    "MEMORY_FLUSH_COMPLETE",
    "BYPASSING_FIREWALL_v4.2.1",
    "ACCESS_NODE_CONNECTED: IP.192.168.1.1",
    "AUTHORIZATION_SEQUENCE_ACCEPTED",
    "UPLOADING_NEURAL_INTERFACE"
  ];
  const [currentLogs, setCurrentLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!active) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setCurrentLogs(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="font-mono text-[9px] text-[#00ff41]/60 space-y-1">
      {currentLogs.map((log, i) => (
        <div key={i} className="flex gap-2">
          <span className="opacity-40 animate-pulse">[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
          <span>{log}</span>
        </div>
      ))}
    </div>
  );
};

const RotatingRing: React.FC<{ 
  size: number; 
  duration: number; 
  reverse?: boolean; 
  active: boolean;
  segmented?: boolean;
}> = ({ size, duration, reverse, active, segmented }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5, rotateY: 45, rotateX: 20 }}
    animate={active ? { 
      opacity: [0, 0.4, 0.2], 
      scale: 1, 
      rotate: reverse ? -360 : 360,
      rotateY: 45,
      rotateX: 20
    } : { opacity: 0, scale: 0.5 }}
    transition={{ 
      rotate: { duration, repeat: Infinity, ease: "linear" },
      opacity: { duration: 1 },
      scale: { duration: 1.5, ease: "easeOut" }
    }}
    className="absolute pointer-events-none rounded-full"
    style={{ 
      width: size, 
      height: size,
      borderStyle: segmented ? 'dashed' : 'solid',
      borderWidth: '4px',
      borderColor: 'rgba(0, 255, 65, 0.9)',
      boxShadow: '0 0 25px rgba(0, 255, 65, 0.4)',
    }}
  />
);

export const AccessGranted: React.FC<{ zoomComplete?: boolean }> = ({ zoomComplete = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const [isActive, setIsActive] = useState(false);
  const [showInterface, setShowInterface] = useState(false);

  useEffect(() => {
    if (zoomComplete) {
      setTimeout(() => setIsActive(true), 200);
      setTimeout(() => setShowInterface(true), 1200);
    } else {
      setIsActive(false);
      setShowInterface(false);
    }
  }, [zoomComplete]);

  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="relative w-full h-[150vh] bg-transparent overflow-hidden">
      <motion.div
        style={{ opacity: zoomComplete ? 1 : opacity }}
        className="sticky top-0 w-full h-screen flex items-center justify-center pointer-events-none"
      >
        {/* Background Visual Enhancements */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0" />
        
        {/* Viewport Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.9)] z-10" />

        {/* Cinematic HUD Framing */}
        <AnimatePresence>
          {showInterface && (
            <>
              {/* Left Panel: Hex Dump */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="absolute left-10 top-1/2 -translate-y-1/2 h-[400px] w-32 hidden xl:block z-30"
              >
                <div className="mb-4 text-[#00ff41] text-[10px] font-black tracking-widest border-b border-[#00ff41]/30 pb-1">
                  CORE_DUMP.EXE
                </div>
                <HexDump active={isActive} />
              </motion.div>

              {/* Right Panel: System Logs */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="absolute right-10 top-1/2 -translate-y-1/2 h-[400px] w-64 hidden xl:block z-30"
              >
                <div className="mb-4 text-[#00ff41] text-[10px] font-black tracking-widest border-b border-[#00ff41]/30 pb-1 text-right">
                  STATUS_LOGS
                </div>
                <SystemLog active={isActive} />
              </motion.div>

              {/* Bottom Info Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.6, y: 0 }}
                className="absolute bottom-6 md:bottom-10 inset-x-4 md:inset-x-20 flex justify-between items-end border-t border-[#00ff41]/20 pt-4 z-30 text-[8px] md:text-[10px] uppercase font-bold text-[#00ff41]"
              >

                <div className="space-y-1">
                  <div>USER: ARJUN.ADMIN</div>
                  <div>SECURITY_LEVEL: OMEGA</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="animate-pulse mb-1">SCROLL_TO_PROCEED</div>
                  <div className="animate-bounce">▼</div>
                </div>
                <div className="text-right space-y-1">
                  <div>SESSION: {new Date().getTime().toString(16).slice(-8)}</div>
                  <div className="text-white/40">READY_FOR_DEPLOYMENT...</div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Central HUD Experience */}
        <div className="relative flex items-center justify-center z-20 scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 transition-transform duration-500" style={{ perspective: '1000px' }}>
          {/* Rotating Rings with 3D Depth */}
          <RotatingRing size={690} duration={24} reverse active={isActive} segmented />
          <RotatingRing size={600} duration={15} active={isActive} />
          <RotatingRing size={552} duration={9} reverse active={isActive} segmented />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isActive ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center w-[300px] h-[300px] md:w-[460px] md:h-[460px]"
          >
            {/* Inner Glow Circle */}
            <div className="absolute inset-0 rounded-full bg-[#00ff41]/5 shadow-[0_0_150px_rgba(0,255,65,0.25),inset_0_0_150px_rgba(0,255,65,0.25)] border-[4px] border-[#00ff41]/60" />

            
            <div className="z-10 text-center px-10">
              <h2 className="text-[2.2rem] md:text-[3.2rem] font-black tracking-[0.15em] leading-[1.1] mb-2 font-display uppercase">
                <GlitchText text="ACCESS" active={isActive} delay={400} />
                <br />
                <GlitchText text="GRANTED" active={isActive} delay={800} />
              </h2>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={showInterface ? { opacity: 1 } : {}}
                className="h-[2px] w-[80%] bg-gradient-to-r from-transparent via-[#00ff41] to-transparent my-6 mx-auto shadow-[0_0_15px_#00ff41]"
              />
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={showInterface ? { opacity: 1, y: 0 } : {}}
                className="text-[#00ff41] font-mono text-sm tracking-[0.5em] font-black"
                style={{ textShadow: '0 0 15px rgba(0,255,65,0.6)' }}
              >
                BYPASS_SUCCESSFUL // ROOT_ENABLED
              </motion.p>
            </div>

            {/* Scanning Line HUD Effect - Bolder */}
            <motion.div
              animate={{ y: [-230, 230] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-[#00ff41]/30 to-transparent pointer-events-none border-y border-[#00ff41]/10"
            />
          </motion.div>
        </div>

        {/* Cinematic Chromatic Aberration Peak (Reveal Moment) */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, times: [0, 0.5, 1] }}
              className="absolute inset-0 bg-[#00ff41] pointer-events-none z-[100] mix-blend-screen"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
