import React, { useEffect, useRef, useState } from 'react';

export const DinoGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAME_OVER'>('IDLE');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const requestRef = useRef<number>(null);
  const gameStateRef = useRef<'IDLE' | 'PLAYING' | 'GAME_OVER'>('IDLE');
  const scoreRef = useRef(0);

  // Game Constants
  const GRAVITY = 0.6;
  const JUMP_FORCE = -10;
  const GROUND_Y = 120;
  const BOX_WIDTH = 310;
  const BOX_HEIGHT = 150;

  // Game Objects State
  const dino = useRef({
    x: 30,
    y: GROUND_Y - 20,
    width: 20,
    height: 20,
    dy: 0,
    isJumping: false,
  });

  const obstacles = useRef<{ x: number; y: number; width: number; height: number }[]>([]);
  const gameSpeed = useRef(4);
  const frameCount = useRef(0);

  const spawnObstacle = () => {
    const height = 15 + Math.random() * 15;
    const width = 10 + Math.random() * 10;
    obstacles.current.push({
      x: BOX_WIDTH,
      y: GROUND_Y - height,
      width: width,
      height: height,
    });
  };

  const resetGame = () => {
    dino.current = {
      x: 30,
      y: GROUND_Y - 20,
      width: 20,
      height: 20,
      dy: 0,
      isJumping: false,
    };
    obstacles.current = [];
    gameSpeed.current = 4;
    scoreRef.current = 0;
    setScore(0);
    frameCount.current = 0;
    gameStateRef.current = 'PLAYING';
    setGameState('PLAYING');
  };

  const handleInput = (e: KeyboardEvent | TouchEvent) => {
    if (gameStateRef.current === 'IDLE' || gameStateRef.current === 'GAME_OVER') {
      if (e instanceof KeyboardEvent && e.code === 'Space') {
        resetGame();
        e.preventDefault();
      } else if (e instanceof TouchEvent) {
        resetGame();
        e.preventDefault();
      }
    } else if (gameStateRef.current === 'PLAYING') {
      if (e instanceof KeyboardEvent && (e.code === 'Space' || e.code === 'ArrowUp')) {
        if (!dino.current.isJumping) {
          dino.current.dy = JUMP_FORCE;
          dino.current.isJumping = true;
        }
        e.preventDefault();
      } else if (e instanceof TouchEvent) {
        if (!dino.current.isJumping) {
          dino.current.dy = JUMP_FORCE;
          dino.current.isJumping = true;
        }
        e.preventDefault();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleInput);
    window.addEventListener('touchstart', handleInput);
    return () => {
      window.removeEventListener('keydown', handleInput);
      window.removeEventListener('touchstart', handleInput);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const update = () => {
    if (gameStateRef.current !== 'PLAYING') return;

    // Update Dino
    dino.current.dy += GRAVITY;
    dino.current.y += dino.current.dy;

    if (dino.current.y > GROUND_Y - dino.current.height) {
      dino.current.y = GROUND_Y - dino.current.height;
      dino.current.dy = 0;
      dino.current.isJumping = false;
    }

    // Update Obstacles
    frameCount.current++;
    if (frameCount.current % Math.max(60, 100 - Math.floor(scoreRef.current / 50)) === 0) {
      spawnObstacle();
    }

    obstacles.current.forEach((obs, index) => {
      obs.x -= gameSpeed.current;

      // Collision Check
      if (
        dino.current.x < obs.x + obs.width &&
        dino.current.x + dino.current.width > obs.x &&
        dino.current.y < obs.y + obs.height &&
        dino.current.y + dino.current.height > obs.y
      ) {
        gameStateRef.current = 'GAME_OVER';
        setGameState('GAME_OVER');
      }

      // Remove off-screen obstacles
      if (obs.x + obs.width < 0) {
        obstacles.current.splice(index, 1);
        scoreRef.current++;
        setScore(scoreRef.current);
        if (scoreRef.current > highScore) setHighScore(scoreRef.current);
        
        // Increase speed
        if (scoreRef.current % 10 === 0) {
          gameSpeed.current += 0.2;
        }
      }
    });
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, BOX_WIDTH, BOX_HEIGHT);

    // Draw Ground
    ctx.strokeStyle = '#00ff41';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y);
    ctx.lineTo(BOX_WIDTH, GROUND_Y);
    ctx.stroke();

    // Draw Dino (Pixel Style)
    ctx.fillStyle = '#00ff41';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00ff41';
    ctx.fillRect(dino.current.x, dino.current.y, dino.current.width, dino.current.height);

    // Draw Obstacles
    obstacles.current.forEach((obs) => {
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });

    // Draw UI
    ctx.shadowBlur = 0;
    ctx.font = '10px "Courier New", monospace';
    ctx.fillText(`SCORE: ${score.toString().padStart(5, '0')}`, 10, 20);
    ctx.fillText(`HIGH: ${highScore.toString().padStart(5, '0')}`, BOX_WIDTH - 80, 20);

    if (gameStateRef.current === 'IDLE') {
        ctx.fillStyle = 'rgba(0, 255, 65, 0.1)';
        ctx.fillRect(0, 0, BOX_WIDTH, BOX_HEIGHT);
        ctx.fillStyle = '#00ff41';
        ctx.textAlign = 'center';
        ctx.font = '14px "Courier New", monospace';
        ctx.fillText('PRESS SPACE TO START', BOX_WIDTH / 2, BOX_HEIGHT / 2);
    }

    if (gameStateRef.current === 'GAME_OVER') {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(0, 0, BOX_WIDTH, BOX_HEIGHT);
      ctx.fillStyle = '#ff0000';
      ctx.textAlign = 'center';
      ctx.font = '18px "Courier New", monospace';
      ctx.fillText('SYSTEM FAILURE', BOX_WIDTH / 2, BOX_HEIGHT / 2 - 10);
      ctx.font = '10px "Courier New", monospace';
      ctx.fillStyle = '#00ff41';
      ctx.fillText('PRESS SPACE TO RESTART', BOX_WIDTH / 2, BOX_HEIGHT / 2 + 20);
      
      // Blinking cursor effect
      if (Math.floor(Date.now() / 500) % 2 === 0) {
        ctx.fillRect(BOX_WIDTH / 2 + 70, BOX_HEIGHT / 2 + 10, 5, 10);
      }
    }
    
    ctx.textAlign = 'start';
  };

  const loop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      update();
      draw(ctx);
    }
    requestRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(loop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [score, gameState, highScore]);

  return (
    <div className="border-2 border-[#00ff41] bg-black p-2 shadow-[0_0_30px_rgba(0,255,65,0.2)] w-[310px] relative overflow-hidden pointer-events-auto">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between border-b border-[#00ff41]/20 pb-1">
          <span className="text-[#00ff41] text-[10px] font-black tracking-widest uppercase">
            &gt;&gt; RUNTIME_TEST.EXE
          </span>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff41]/40" />
          </div>
        </div>
        
        <canvas 
          ref={canvasRef} 
          width={BOX_WIDTH} 
          height={BOX_HEIGHT} 
          className="w-full h-[150px] bg-[#050505]"
        />

        <div className="text-[9px] text-[#00ff41]/60 font-black uppercase tracking-widest pt-1 flex justify-between">
          <span>SECURE_BOOT: ACTIVE</span>
          <span>V_CORE: 1.2V</span>
        </div>
      </div>
      
      {/* Decorative corners */}
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-[#00ff41]" />
      <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-[#00ff41]" />
    </div>
  );
};
