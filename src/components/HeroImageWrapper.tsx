import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { MacbookImage } from './MacbookImage';
import { MatrixRain } from './MatrixRain';
import { ScrollingBanner } from './ScrollingBanner';
import { SystemHUD } from './SystemHUD';
import { ScanlineOverlay } from './ScanlineOverlay';
import { BiometricScan } from './BiometricScan';
import { GlitchConsole } from './GlitchConsole';
import { DinoGame } from './DinoGame';

interface HeroImageWrapperProps {
  onZoomComplete?: () => void;
  zoomComplete?: boolean;
  isGlitched?: boolean;
  onGlitch?: () => void;
}

export const HeroImageWrapper = ({ onZoomComplete, zoomComplete, isGlitched, onGlitch }: HeroImageWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const zoomCompleteRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const [showBiometric, setShowBiometric] = useState(false);

  // Zoom: 1x → 3.5x so the full terminal window stays visible at max zoom
  const scale = useTransform(progress, [0, 0.85], [1, 3.5]);
  
  // Fade to black near the end for seamless transition to AccessGranted
  const opacity = useTransform(progress, [0.75, 0.95], [1, 0]);

  // Hide HUD components once zooming starts
  const hudOpacity = useTransform(progress, [0, 0.05], [1, 0]);
  const hudPointerEvents = useTransform(progress, (v) => v > 0.05 ? 'none' : 'auto') as any;

  // Handle Biometric trigger
  useEffect(() => {
    return progress.on("change", (latest) => {
      if (latest > 0.9 && !showBiometric) {
        setShowBiometric(true);
      } else if (latest <= 0.9 && showBiometric) {
        setShowBiometric(false);
      }
    });
  }, [progress, showBiometric]);

  // Sync ref with prop
  useEffect(() => {
    zoomCompleteRef.current = !!zoomComplete;
    if (!zoomComplete) setShowBiometric(false);
  }, [zoomComplete]);

  // When zoomComplete becomes false (triggered by App when user scrolls back),
  // animate the reverse zoom
  useEffect(() => {
    if (!zoomComplete && progress.get() > 0 && !isAnimatingRef.current) {
      isAnimatingRef.current = true;
      animate(progress, 0, {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
    }
  }, [zoomComplete, progress]);

  const handleWheel = useCallback((e: WheelEvent) => {
    // Don't intercept during animated reverse
    if (isAnimatingRef.current) {
      e.preventDefault();
      return;
    }

    const current = progress.get();

    // If zoom is fully complete, let normal scroll happen (App handles scroll-back detection)
    if (zoomCompleteRef.current) return;

    // If at the top and scrolling up, let it go
    if (current <= 0 && e.deltaY < 0) return;

    // If not actively zooming and hero not in view, don't intercept
    if (current <= 0) {
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        if (rect.top > 10 || rect.bottom < 0) return;
      }
    }

    // During zoom phase, prevent actual scroll and drive the zoom
    e.preventDefault();
    e.stopPropagation();

    const delta = e.deltaY * 0.001;
    const next = Math.max(0, Math.min(1, current + delta));
    progress.set(next);

    // Trigger zoom complete
    if (next >= 1 && !zoomCompleteRef.current) {
      zoomCompleteRef.current = true;
      onZoomComplete?.();
    }
  }, [progress, onZoomComplete]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      <ScrollingBanner />
      <SystemHUD />
      <ScanlineOverlay />
      
      {onGlitch && <GlitchConsole onGlitch={onGlitch} progress={progress} />}
      
      {/* Dino Game Box - Positioned top right below signal strength */}
      <motion.div 
        style={{ opacity: hudOpacity, pointerEvents: hudPointerEvents }}
        className="absolute top-[300px] right-8 z-[60] hidden lg:block"
      >
        <DinoGame />
      </motion.div>

      {showBiometric && <BiometricScan />}
      
      <motion.div 
        style={{ 
          opacity, 
          scale,
          transformOrigin: 'center 47%',
        }}
        className="w-full h-full flex flex-col items-center justify-center bg-black will-change-transform pt-8"
      >
         <MatrixRain isGlitched={isGlitched} />
         <div className="relative z-10 w-full max-w-5xl px-4 flex justify-center">
            <MacbookImage progress={progress} />
         </div>
      </motion.div>
    </div>
  );
};
