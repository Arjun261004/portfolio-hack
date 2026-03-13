import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  isGlitched?: boolean;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ isGlitched }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const chars = '01ｱｲｳｴｵｶｷクケコサシスセソタチツテト0123456789ABCDEF';
    const charArray = chars.split('');
    const fontSize = 18;
    
    let columns = Math.ceil(canvas.width / fontSize);
    let rows = Math.ceil(canvas.height / fontSize);
    
    const grid: { char: string; opacity: number; targetOpacity: number; scale: number; lastUpdate: number }[] = [];

    const initGrid = () => {
      columns = Math.ceil(canvas.width / fontSize);
      rows = Math.ceil(canvas.height / fontSize);
      grid.length = 0;
      for (let i = 0; i < columns * rows; i++) {
        grid.push({
          char: charArray[Math.floor(Math.random() * charArray.length)],
          opacity: Math.random() * 0.3,
          targetOpacity: Math.random() * 0.4,
          scale: 1,
          lastUpdate: Math.random() * 1000
        });
      }
    };

    initGrid();

    let animFrameId: number;
    const interactionRadius = 54;

    const draw = (currentTime: number) => {
      animFrameId = requestAnimationFrame(draw);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Separate cells into "Normal" and "Interactive" for batching
      const interactiveCells: { idx: number; dx: number; dy: number; dist: number }[] = [];
      const normalCells: number[] = [];

      for (let i = 0; i < grid.length; i++) {
        const c = i % columns;
        const r = Math.floor(i / columns);
        const x = c * fontSize;
        const y = r * fontSize;

        const dx = x - mouse.current.x;
        const dy = y - mouse.current.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < interactionRadius * interactionRadius) {
          interactiveCells.push({ idx: i, dx, dy, dist: Math.sqrt(distSq) });
        } else {
          normalCells.push(i);
        }
      }

      // 1. Draw Normal Cells (Batched Font)
      ctx.font = `${fontSize - 4}px monospace`;
      ctx.shadowBlur = 0;
      
      const themeColor = isGlitched ? '255, 0, 0' : '0, 255, 65';
      
      for (const idx of normalCells) {
        const cell = grid[idx];
        const c = idx % columns;
        const r = Math.floor(idx / columns);
        
        // Randomly update character
        const updateThreshold = isGlitched ? 500 : 2000;
        if (currentTime - cell.lastUpdate > updateThreshold + Math.random() * 3000) {
          cell.char = charArray[Math.floor(Math.random() * charArray.length)];
          cell.lastUpdate = currentTime;
        }

        // Normal flicker
        if (Math.random() > (isGlitched ? 0.9 : 0.98)) {
          cell.targetOpacity = Math.random() * (isGlitched ? 0.6 : 0.3);
        }
        cell.opacity += (cell.targetOpacity - cell.opacity) * 0.05;
        cell.scale += (1 - cell.scale) * 0.1;

        ctx.fillStyle = `rgba(${themeColor}, ${cell.opacity})`;
        ctx.fillText(cell.char, c * fontSize, r * fontSize + fontSize - 4);
      }

      // 2. Draw Interactive Cells (Individual Font/Glow)
      for (const { idx, dist } of interactiveCells) {
        const cell = grid[idx];
        const c = idx % columns;
        const r = Math.floor(idx / columns);

        const factor = 1 - (dist / interactionRadius);
        const targetScale = 1 + (factor * 1.2);
        const activeGlow = factor * 0.8;

        // Smoothly animate
        cell.scale += (targetScale - cell.scale) * 0.5;
        cell.opacity += (0.4 + activeGlow - cell.opacity) * 0.45;

        const currentSize = fontSize * cell.scale;
        ctx.font = `bold ${currentSize - 4}px monospace`;
        
        // Apply glow
        ctx.shadowBlur = 15 * factor;
        ctx.shadowColor = isGlitched ? '#ff0000' : '#00ff41';
        ctx.fillStyle = `rgba(${themeColor}, ${Math.min(1, cell.opacity)})`;
        
        // Rapid character change near cursor
        if (Math.random() > (isGlitched ? 0.5 : 0.85)) {
          cell.char = charArray[Math.floor(Math.random() * charArray.length)];
        }

        ctx.fillText(cell.char, c * fontSize, r * fontSize + fontSize - 4);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleResize = () => {
      resize();
      initGrid();
    };

    animFrameId = requestAnimationFrame(draw);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [isGlitched]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-500 ${isGlitched ? 'blur-[1px]' : ''}`}
      style={{ opacity: isGlitched ? 1 : 0.8 }}
    />
  );
};
