import { useState, useEffect, useRef } from "react";
import { useScroll, motion, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

const commands = [
  "Initializing ARJUN_S probe...",
  "Searching VIT database...",
  "Credentials verified: CS_ENGINEER",
  "GPA check: 9.23 // PASS",
  "Scanning experience repositories...",
  "Zyebro Tech intern logs found.",
  "Fidelity Investments clearance: PENDING_2026",
  "Decrypting project databanks...",
  "UrbanCart & WaterQuest unlocked."
];

export const TerminalWindow = ({ isEmbedded = false, progress }: { isEmbedded?: boolean, progress?: MotionValue<number> }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: localScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const scrollVar = progress || localScroll;

  const [visibleCommands, setVisibleCommands] = useState<string[]>(commands.slice(0, 2));
  const [currentTypingText, setCurrentTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingIndex, setTypingIndex] = useState(-1);

  // Derive which command index we should be up to based on scroll progress
  useMotionValueEvent(scrollVar, "change", (latest) => {
    // If we're at the very top, reset to initial state
    if (latest <= 0) {
      if (typingIndex !== -1 || visibleCommands.length > 2) {
        setVisibleCommands(commands.slice(0, 2));
        setIsTyping(false);
        setTypingIndex(-1);
        setCurrentTypingText("");
      }
      return;
    }

    const remainingCommands = commands.slice(2);
    const bracketSize = 1 / remainingCommands.length;
    
    let targetIndex = 2 + Math.floor(latest / bracketSize);
    if (latest === 1) targetIndex = commands.length - 1;
    targetIndex = Math.max(2, Math.min(targetIndex, commands.length - 1));

    if (targetIndex > typingIndex && !isTyping) {
      // Start typing the next command
      setTypingIndex(targetIndex);
      setIsTyping(true);
      setCurrentTypingText("");
    }
  });

  // Typing effect logic
  useEffect(() => {
    if (!isTyping || typingIndex < 2 || typingIndex >= commands.length) return;

    const fullText = commands[typingIndex];
    if (currentTypingText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentTypingText(fullText.slice(0, currentTypingText.length + 1));
      }, Math.random() * 20 + 15); // Slightly faster random delay
      return () => clearTimeout(timeout);
    } else {
      // Finished typing this command
      setIsTyping(false);
      setVisibleCommands(prev => {
        // Only add if we haven't already (in case of fast scrolls)
        if (!prev.includes(fullText)) {
          return [...prev, fullText];
        }
        return prev;
      });
      setCurrentTypingText("");
    }
  }, [isTyping, currentTypingText, typingIndex]);

  // Handle fast scrolling where we might have skipped brackets
  useEffect(() => {
    if (!isTyping && typingIndex > visibleCommands.length - 1 && typingIndex >= 2) {
      // Catch up missing commands instantly if scrolled too fast
      const missing = commands.slice(visibleCommands.length, typingIndex);
      if (missing.length > 0) {
         setVisibleCommands(prev => {
           const newVis = [...prev];
           missing.forEach(m => {
             if (!newVis.includes(m)) newVis.push(m);
           });
           return newVis;
         });
      }
      // Start typing the latest one we should be on
      setIsTyping(true);
      setCurrentTypingText("");
    }
  }, [isTyping, typingIndex, visibleCommands.length]);


  const opacity = useTransform(scrollVar, [0.85, 1], [1, 0]);
  const scale = useTransform(scrollVar, [0.85, 1], [1, 1.2]);

  const terminalContent = (
    <div className={`w-full h-full rounded-md shadow-2xl overflow-hidden flex flex-col pointer-events-auto bg-[#0a0f1c] font-mono`}>
      {/* Mac Terminal Header */}
      <div className="h-7 bg-[#dfdfdf] flex items-center px-3 border-b border-[#cccccc] shrink-0 justify-between select-none relative z-10">
        <div className="flex gap-1.5 items-center z-10">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#dca02e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-[#23ab36]" />
        </div>
        <div className="absolute inset-x-0 mx-auto text-center pointer-events-none flex justify-center items-center gap-1.5 opacity-80">
          <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          <span className="text-gray-800 text-[10px] sm:text-[11px] lg:text-xs font-sans font-medium tracking-wide">
            macworld — -bash — 80x17
          </span>
        </div>
      </div>
          
      {/* Terminal Body */}
      <div className={`p-4 sm:p-5 text-[#4af626] leading-relaxed flex-1 overflow-y-auto ${isEmbedded ? "text-[10px] sm:text-[11px] md:text-xs lg:text-sm" : "text-sm"} bg-[#0a0f1c]`}>
        {visibleCommands.map((cmd, i) => (
          <div key={i} className="mb-1">
            <span className="opacity-70 mr-2">{'>'}</span> 
            {cmd}
          </div>
        ))}
            
        {(isTyping || visibleCommands.length < commands.length) && (
          <div className="flex items-center">
            <span className="opacity-70 mr-2">{'>'}</span>
            <span>{currentTypingText}</span>
            <span className="inline-block w-[8px] h-[15px] bg-green-400 ml-1 animate-pulse" />
          </div>
        )}
            
        {!isTyping && visibleCommands.length === commands.length && (
          <div className="flex items-center mt-2">
            <span className="inline-block w-[8px] h-[15px] bg-green-400 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );

  if (isEmbedded) {
    return (
      <div ref={containerRef} className="w-full h-full">
        {terminalContent}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-[200vh]">
      <motion.div 
        style={{ opacity, scale }}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-black via-neutral-950 to-neutral-900"
      >
        {terminalContent}
      </motion.div>
    </div>
  );
};
