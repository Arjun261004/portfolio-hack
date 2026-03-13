import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const SystemHUD = () => {
  const [cpu, setCpu] = useState(24);
  const [mem, setMem] = useState(62);
  const [ping, setPing] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 4)));
      setMem(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 2)));
      setPing(prev => Math.min(100, Math.max(8, prev + (Math.random() - 0.5) * 2)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] font-mono text-[10px] uppercase tracking-widest text-cyber-green/60 p-6 hidden lg:block">
      {/* Top Left - System Status */}
      <div className="absolute top-24 left-6 space-y-4">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between w-32 border-b border-cyber-green/20 pb-1">
            <span>CPU_LOAD</span>
            <span className="text-cyber-green">{cpu.toFixed(1)}%</span>
          </div>
          <div className="h-1 w-32 bg-cyber-green/5 overflow-hidden">
            <motion.div 
              className="h-full bg-cyber-green/40"
              animate={{ width: `${cpu}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between w-32 border-b border-cyber-green/20 pb-1">
            <span>MEM_USE</span>
            <span className="text-cyber-green">{mem.toFixed(1)}%</span>
          </div>
          <div className="h-1 w-32 bg-cyber-green/5 overflow-hidden">
            <motion.div 
              className="h-full bg-cyber-green/40"
              animate={{ width: `${mem}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </div>

      {/* Top Right - Network Status */}
      <div className="absolute top-24 right-6 text-right space-y-1">
        <div className="flex items-center justify-end gap-2">
          <span>SIGNAL_STRENGTH</span>
          <div className="flex gap-1 items-end h-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`w-1 bg-cyber-green/60 ${i <= 4 ? 'h-full' : 'h-1/2 opacity-20'}`} />
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <span>LATENCY</span>
          <span className="text-cyber-green">{ping.toFixed(0)}MS</span>
        </div>
        <div className="flex justify-end gap-2">
          <span>UPLINK</span>
          <span className="text-cyber-green">ACTIVE</span>
        </div>
      </div>

      {/* Bottom Corners - Aesthetic Brackets */}
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-cyber-green/40 opacity-50" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-cyber-green/40 opacity-50" />
    </div>
  );
};
