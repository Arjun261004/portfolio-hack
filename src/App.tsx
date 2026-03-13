import { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroImageWrapper } from './components/HeroImageWrapper';
import { AccessGranted } from './components/AccessGranted';
import { PortfolioSystem } from './components/PortfolioSystem';
import { CursorGlow } from './components/CursorGlow';
import { MatrixRain } from './components/MatrixRain';
import { useSoundSystem } from './hooks/useSoundSystem';
import { Volume2, VolumeX } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const accessGrantedRef = useRef<HTMLDivElement>(null);
  const [zoomComplete, setZoomComplete] = useState(false);
  const [isGlitched, setIsGlitched] = useState(false);
  const lastScrollY = useRef(0);
  const typedBuffer = useRef('');
  const { toggleMute, isMuted, playClick } = useSoundSystem();

  const triggerGlitch = useCallback(() => {
    setIsGlitched(true);
    setTimeout(() => setIsGlitched(false), 3000);
  }, []);

  // Secret Commands Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      playClick();
      typedBuffer.current = (typedBuffer.current + e.key).slice(-10);
      
      const cmd = typedBuffer.current.toLowerCase();
      if (cmd.includes('hack')) {
        triggerGlitch();
        typedBuffer.current = '';
      }
      if (cmd.includes('reveal')) {
        setZoomComplete(true);
        typedBuffer.current = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playClick, triggerGlitch]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Stop Lenis during the zoom phase, start it after zoom completes
  useEffect(() => {
    if (!lenisRef.current) return;
    if (zoomComplete) {
      lenisRef.current.start();
    } else {
      lenisRef.current.stop();
    }
  }, [zoomComplete]);

  // Detect scroll-back using the native scroll event (works with Lenis)
  useEffect(() => {
    if (!zoomComplete) return;

    const handleScroll = () => {
      const agEl = accessGrantedRef.current;
      if (!agEl) return;

      const currentScrollY = window.scrollY;
      const containerTop = agEl.offsetTop;
      const scrollingUp = currentScrollY < lastScrollY.current;

      lastScrollY.current = currentScrollY;

      if (scrollingUp && currentScrollY <= containerTop + 5) {
        if (lenisRef.current) lenisRef.current.stop();
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        setZoomComplete(false);
      }
    };

    lastScrollY.current = window.scrollY;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [zoomComplete]);

  const handleZoomComplete = useCallback(() => {
    // Add a cinematic delay before transitioning to the Access Granted page
    setTimeout(() => {
      setZoomComplete(true);
      requestAnimationFrame(() => {
        if (accessGrantedRef.current) {
          const el = accessGrantedRef.current;
          const targetTop = el.offsetTop;
          window.scrollTo({ top: targetTop, behavior: 'instant' as ScrollBehavior });
          lastScrollY.current = targetTop;
        }
      });
    }, 400);
  }, []);

  return (
    <main className={`relative w-full bg-black min-h-screen text-[#00ff41] font-mono selection:bg-[#00ff41] selection:text-black cursor-none overflow-x-hidden ${isGlitched ? 'animate-glitch is-glitched' : ''}`}>
      <MatrixRain isGlitched={isGlitched} />
      <CursorGlow />
      
      {/* Sound Toggle */}
      <div className="fixed bottom-6 right-6 z-[100] pointer-events-auto">
        <button 
          onClick={toggleMute}
          className="p-3 bg-black/40 border border-cyber-green/20 rounded-full hover:bg-cyber-green/10 transition-colors shadow-[0_0_15px_rgba(0,255,65,0.1)] group"
        >
          {isMuted ? (
            <VolumeX size={18} className="text-cyber-green/60" />
          ) : (
            <Volume2 size={18} className="text-cyber-green animate-pulse" />
          )}
          
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black border border-cyber-green/20 px-2 py-1 rounded text-[10px] text-cyber-green pointer-events-none">
            {isMuted ? 'ENABLE AUDIO' : 'DISABLE AUDIO'}
          </div>
        </button>
      </div>

      <HeroImageWrapper 
        onZoomComplete={handleZoomComplete} 
        zoomComplete={zoomComplete} 
        isGlitched={isGlitched}
        onGlitch={triggerGlitch}
      />
      <div ref={accessGrantedRef}>
        <AccessGranted zoomComplete={zoomComplete} />
      </div>
      <div className="relative z-30 -mt-[10vh] pt-[10vh]">
        <PortfolioSystem />
      </div>
    </main>
  );
}

export default App;
