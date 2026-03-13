import { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const fileSystem: Record<string, string> = {
  'resume.txt': 'Loading resume data...\n\nName: ARJUN S\nRole: B.Tech Computer Science Student\nGPA: 9.23/10\nLocation: Bangalore, India',
  'skills.bin': 'Executing skill check... [OK]\nPYTHON      |||||||||| 95%\nJAVASCRIPT  |||||||||  90%\nMERN STACK  ||||||||   80%\nSQL/MONGO   ||||||||   85%',
  'secret.log': 'FIDELITY INVESTMENTS // INCOMING INTERN // SUMMER 2026'
};

export function TerminalResume() {
  const [history, setHistory] = useState<{ command: string; output: string }[]>([]);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    let output = '';

    if (cmd === 'help') {
      output = "Available commands:\n- ls\n- cat <filename>\n- clear\n- whoami\n- pwd";
    } else if (cmd === 'ls') {
      output = Object.keys(fileSystem).join('  ');
    } else if (cmd.startsWith('cat ')) {
      const file = cmd.split(' ')[1];
      output = fileSystem[file] || `cat: ${file}: No such file or directory`;
    } else if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (cmd === 'whoami') {
      output = "root_developer";
    } else if (cmd === 'pwd') {
      output = "/home/developer/root";
    } else if (cmd !== '') {
      output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    if (cmd !== '') {
      setHistory(prev => [...prev, { command: cmd, output }]);
    }
    setInputVal('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <section className="relative w-full py-20 px-8 flex justify-center z-20">
      <div className="w-full max-w-4xl">
        <div className="glass-panel border-cyber-green/40 rounded-lg overflow-hidden flex flex-col h-[400px]">
          {/* Terminal Header */}
          <div className="bg-cyber-gray px-4 py-2 border-b border-cyber-green/40 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-cyber-red"></div>
              <div className="w-3 h-3 rounded-full bg-[#f1fa8c]"></div>
              <div className="w-3 h-3 rounded-full bg-cyber-green"></div>
            </div>
            <div className="text-cyber-gray-light font-mono text-xs flex items-center gap-2">
              <Terminal size={14} /> root@dev-system:~
            </div>
          </div>

          {/* Terminal Body */}
          <div 
            className="flex-1 p-4 bg-black/80 text-cyber-green font-mono text-sm overflow-y-auto"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="mb-4 text-cyber-blue">
              Welcome to DEV_OS v2.4. Type 'help' to see available commands.
            </div>

            {history.map((entry, i) => (
              <div key={i} className="mb-4">
                <div className="flex gap-2 text-cyber-green">
                  <span>~/root</span>
                  <span className="text-cyber-purple">$</span>
                  <span>{entry.command}</span>
                </div>
                {entry.output && (
                  <div className="text-cyber-gray-light whitespace-pre-wrap mt-1">
                    {entry.output}
                  </div>
                )}
              </div>
            ))}

            <form onSubmit={handleCommand} className="flex gap-2 text-cyber-green">
              <span>~/root</span>
              <span className="text-cyber-purple">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 bg-transparent outline-none border-none text-cyber-green font-mono caret-cyber-green"
                autoComplete="off"
                spellCheck="false"
              />
            </form>
            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
