import { useRef, useState } from 'react';

// Simplified Sound System for ambient effects
export const useSoundSystem = () => {
  const [isMuted, setIsMuted] = useState(true);
  const audioCtx = useRef<AudioContext | null>(null);
  const humOsc = useRef<OscillatorNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);

  const initAudio = () => {
    if (audioCtx.current) return;
    
    audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    gainNode.current = audioCtx.current.createGain();
    gainNode.current.connect(audioCtx.current.destination);
    gainNode.current.gain.setValueAtTime(0, audioCtx.current.currentTime);

    // Ambient Hum
    humOsc.current = audioCtx.current.createOscillator();
    humOsc.current.type = 'sine';
    humOsc.current.frequency.setValueAtTime(50, audioCtx.current.currentTime);
    
    const modulator = audioCtx.current.createOscillator();
    modulator.type = 'sine';
    modulator.frequency.setValueAtTime(0.5, audioCtx.current.currentTime);
    const modGain = audioCtx.current.createGain();
    modGain.gain.setValueAtTime(2, audioCtx.current.currentTime);
    
    modulator.connect(modGain);
    modGain.connect(humOsc.current.frequency);
    
    humOsc.current.connect(gainNode.current);
    modulator.start();
    humOsc.current.start();
  };

  const toggleMute = () => {
    if (!audioCtx.current) initAudio();
    
    const targetGain = isMuted ? 0.05 : 0;
    gainNode.current?.gain.linearRampToValueAtTime(targetGain, audioCtx.current!.currentTime + 0.5);
    setIsMuted(!isMuted);
  };

  const playClick = () => {
    if (!audioCtx.current || isMuted) return;
    
    const osc = audioCtx.current.createOscillator();
    const clickGain = audioCtx.current.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, audioCtx.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.current.currentTime + 0.1);
    
    clickGain.gain.setValueAtTime(0.02, audioCtx.current.currentTime);
    clickGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 0.1);
    
    osc.connect(clickGain);
    clickGain.connect(audioCtx.current.destination);
    
    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.1);
  };

  return { toggleMute, isMuted, playClick };
};
