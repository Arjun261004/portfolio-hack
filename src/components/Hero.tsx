import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const [terminalText, setTerminalText] = useState('Establishing connection...');
  const [accessGranted, setAccessGranted] = useState(false);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const scene = sceneRef.current;
      const terminal = terminalRef.current;
      
      if (!scene || !terminal) return;

      // The zoom animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5, // Smoother scrubbing
          onUpdate: (self) => {
            const p = self.progress;
            
            // Text progression based on scroll
            if (p < 0.3) {
              setTerminalText('Establishing connection...');
              setAccessGranted(false);
            } else if (p >= 0.3 && p < 0.6) {
              setTerminalText('Bypassing firewall...\nDecryption in progress...');
              setAccessGranted(false);
            } else if (p >= 0.6 && p < 0.85) {
              setTerminalText('Accessing developer system...\nCompiling node data...');
              setAccessGranted(false);
            } else if (p >= 0.85) {
              setTerminalText('ACCESS GRANTED');
              setAccessGranted(true);
            }
          }
        }
      });

      // Target Transform Origin (X Y) based on where the monitor is in the image
      // Roughly center X (50%), and slightly above center Y (48%) depending on the generated image
      // We will set this in CSS but let's animate the scale
      
      tl.to(scene, {
        scale: 12, // Zoom in deeper
        xPercent: 0, 
        yPercent: -10, // Shift slightly if needed to keep monitor dead center
        ease: "power2.in"
      }, 0);
      
      // Fade out the scene at the very end to transition to the portfolio
      tl.to(scene, {
        opacity: 0,
        ease: "power1.in"
      }, 0.9);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-black">
      {/* Sticky wrapper */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Scene Container - scales up from center of monitor */}
        <div 
          ref={sceneRef} 
          className="relative w-full h-full transform-gpu origin-[50%_52%] will-change-transform"
        >
          {/* Background hacker image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/hacker-bg.png)' }}
          />
          
          {/* Dark Overlay for cinematic feel */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />

          {/* Terminal Screen inside monitor bounding box */}
          {/* Sizing and positioning depends strictly on the background image. 
              Approx center of a typical monitor in these generative images */}
          <div 
            ref={terminalRef}
            className="absolute top-[38.5%] left-[39.5%] w-[15.5%] h-[9%] flex flex-col justify-start items-start overflow-hidden bg-black opacity-95 p-[1%] rounded-[0.2vw]"
            // Adding a slight perspective/rotation if needed
            style={{ transform: 'rotateX(0deg) rotateY(0deg)', boxShadow: '0 0 1.5vw 0.5vw black' }}
          >
            {/* Very tiny text initially, because it's scaled up by the scene 8x */}
            <div className={`text-neon-green font-mono w-full ${accessGranted ? 'text-[0.6vw] text-center font-bold animate-pulse text-white drop-shadow-[0_0_8px_#fff] mt-[2%]' : 'text-[0.35vw] text-left leading-relaxed'} whitespace-pre-line mix-blend-screen overflow-hidden`}>
              {terminalText}
              {!accessGranted && <span className="animate-blink inline-block w-[0.3vw] h-[0.55vw] bg-neon-green ml-[1px] align-middle" />}
            </div>
            
            {/* Monitor glow effect */}
            {accessGranted && (
               <div className="absolute inset-0 bg-neon-green/20 mix-blend-overlay animate-pulse pointer-events-none" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
