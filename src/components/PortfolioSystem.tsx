import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardContainer, CardBody, CardItem } from './ui/3d-card';
import { Terminal, Cpu, FolderGit2, UserCog, Mail, GraduationCap, Briefcase, Linkedin, MapPin } from 'lucide-react';


export const PortfolioSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const tabs = [
    { id: 'dashboard', icon: UserCog, label: 'Identity.sys' },
    { id: 'skills', icon: Cpu, label: 'Skills.exe' },
    { id: 'projects', icon: FolderGit2, label: 'Projects.db' },
    { id: 'terminal', icon: Terminal, label: 'Root.sh' },
    { id: 'contact', icon: Mail, label: 'Comm.net' },
  ];

  return (
    <div className="min-h-screen w-full bg-black/40 relative z-10 overflow-hidden text-[#00ff41] font-mono flex items-center justify-center p-4">
      {/* Background grid / noise */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,255,65,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      
      <CardContainer className="w-full max-w-6xl px-2 sm:px-4" maxRotateX={7.5} maxRotateY={7.5}>
        <CardBody className="relative w-full border border-[#00ff41]/30 bg-black/40 backdrop-blur-md rounded-xl flex flex-col md:flex-row overflow-hidden shadow-[0_0_50px_rgba(0,255,65,0.15)] min-h-[85vh] md:h-[85vh]">
          <CardItem translateZ="40" className="flex flex-col md:flex-row w-full h-full overflow-hidden">

        
        {/* Sidebar Navigation - Hidden on mobile, shown on md+ */}
        <div className="hidden md:flex w-64 border-r border-[#00ff41]/30 flex-col bg-[#050505]/50">
          <div className="p-6 border-b border-[#00ff41]/30">
            <h1 className="text-xl font-bold tracking-widest flex items-center gap-2">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              SYSTEM_UI
            </h1>
            <p className="text-xs text-[#00ff41]/60 mt-2">V 2.0.4.1 // CONNECTED</p>
          </div>
          
          <nav className="flex-1 p-4 flex flex-col gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ x: 5, backgroundColor: 'rgba(0, 255, 65, 0.15)' }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 p-3 rounded transition-all duration-300 w-full text-left ${
                    isActive 
                      ? 'bg-[#00ff41]/20 text-white shadow-[inset_4px_0_0_#00ff41]' 
                      : 'text-[#00ff41]/70 hover:text-[#00ff41]'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm tracking-wider">{tab.label}</span>
                </motion.button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#00ff41]/30 text-xs text-[#00ff41]/40 flex flex-col gap-2">
            <div className="flex justify-between">
              <span>SCANNER: ACTIVE</span>
              <span>100%</span>
            </div>
            <div className="flex justify-between">
              <span>UPTIME: 99.9%</span>
              <span>MEM: 32GB</span>
            </div>
          </div>
        </div>


        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <header className="h-14 md:h-16 border-b border-[#00ff41]/30 flex items-center px-4 md:px-6 justify-between bg-[#050505]/50 sticky top-0 md:relative z-50">
             <div className="flex gap-2 md:gap-4 items-center">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-[#00ff41] hover:bg-[#00ff41]/10 rounded-md transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <div className="relative w-6 h-5">
                    <span className={`absolute left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-2' : 'top-0'}`} />
                    <span className={`absolute left-0 w-6 h-0.5 bg-current top-2 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                    <span className={`absolute left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-2' : 'top-4'}`} />
                  </div>
                </button>
                <div className="hidden sm:flex gap-2 md:gap-4">
                  <span className="text-[10px] md:text-xs border border-[#00ff41]/30 px-2 py-0.5 md:py-1 bg-[#00ff41]/10">STATUS: SECURE</span>
                  <span className="text-[10px] md:text-xs border border-[#00ff41]/30 px-2 py-0.5 md:py-1 bg-[#00ff41]/10 text-[#00ff41]/70 animate-pulse hidden xs:inline">AUTHORIZED_ACCESS</span>
                </div>
                <div className="sm:hidden text-xs font-bold text-white truncate max-w-[150px]">
                  {tabs.find(t => t.id === activeTab)?.label}
                </div>
             </div>
             <div className="text-[10px] md:text-xs text-[#00ff41]/50 flex gap-2">
                <span className="hidden sm:inline">[X] CLOSE</span>
                <span className="hidden sm:inline">[-] MIN</span>
                <span className="sm:hidden font-bold">V 2.0.4</span>
             </div>

             {/* Mobile Sidebar Overlay */}
             <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed inset-y-0 left-0 w-72 bg-black border-r border-[#00ff41]/30 z-[60] flex flex-col md:hidden pt-4"
                  >
                    <div className="p-6 border-b border-[#00ff41]/30 flex justify-between items-center">
                      <h2 className="text-lg font-bold tracking-widest text-white">MENU.EXE</h2>
                      <button onClick={() => setIsMobileMenuOpen(false)} className="text-[#00ff41] p-2 min-w-[44px] min-h-[44px]">&times;</button>
                    </div>
                    <nav className="flex-1 p-4 space-y-2">
                      {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => {
                              setActiveTab(tab.id);
                              setIsMobileMenuOpen(false);
                            }}
                            className={`flex items-center gap-4 p-4 rounded-lg w-full text-left transition-all ${
                              isActive ? 'bg-[#00ff41]/20 text-white border-l-4 border-[#00ff41]' : 'text-[#00ff41]/60 hover:text-[#00ff41]'
                            }`}
                          >
                            <Icon size={20} />
                            <span className="font-bold tracking-wider">{tab.label}</span>
                          </button>
                        );
                      })}
                    </nav>
                  </motion.div>
                )}
             </AnimatePresence>
          </header>

          <main className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar overflow-x-hidden">

            <AnimatePresence mode="wait">
                <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.23, 1, 0.32, 1] // Custom ease-out-quint for ultra smoothness
                }}
                className="h-full"
              >
                {activeTab === 'dashboard' && <DashboardTab />}
                {activeTab === 'skills' && <SkillsTab />}
                {activeTab === 'projects' && <ProjectsTab />}
                {activeTab === 'terminal' && <TerminalTab />}
                {activeTab === 'contact' && <ContactTab />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
          </CardItem>
        </CardBody>
      </CardContainer>
    </div>
  );
};

// --- Sub Components ---

const DashboardTab = () => (
  <div className="h-full flex flex-col gap-6 md:gap-8">
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-center md:text-left">
      <div className="w-32 h-32 md:w-48 md:h-48 border border-[#00ff41] bg-[#00ff41]/5 relative group flex-shrink-0">
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-2 border border-[#00ff41]/50 group-hover:inset-1 transition-all duration-300" />
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <img 
            src="/identity.png" 
            alt="Arjun S" 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 text-[8px] md:text-[10px] z-10">&gt; TARGET_ID_ARJUN_S</div>
      </div>
      
      <div className="space-y-4 flex-1 w-full">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,255,65,0.5)] tracking-wider uppercase">ARJUN S</h2>
          <p className="text-lg md:text-xl text-[#00ff41] mt-1 font-bold">B.TECH COMPUTER SCIENCE STUDENT</p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-2 md:gap-4 mt-3 text-[10px] md:text-xs text-[#00ff41]/70 bg-[#00ff41]/5 p-2 border-l-2 border-[#00ff41]">
            <span className="flex items-center gap-1"><MapPin size={12} /> K.R. PURAM, BANGALORE</span>
            <span className="flex items-center gap-1"><Mail size={12} /> ARJUNSATHISHCH@GMAIL.COM</span>
            <span className="flex items-center gap-1"><Linkedin size={12} /> /IN/ARJUN-S</span>
          </div>
        </div>
        
        <div className="p-4 border-l-2 border-[#00ff41] bg-[#00ff41]/5 leading-relaxed text-[#00ff41]/90 text-xs md:text-sm">
          <p>Results-driven Computer Science undergraduate with a strong passion for innovation, problem solving, and continuous learning. Demonstrated ability to collaborate effectively in team environments and communicate ideas with clarity.</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

      <div className="border border-[#00ff41]/30 p-4 bg-black/30 bg-[#00ff41]/5">
        <h3 className="text-sm font-bold flex items-center gap-2 mb-4 text-white">
          <GraduationCap size={16} className="text-[#00ff41]" /> EDUCATION_RECORD
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-bold">
              <span>VELLORE INSTITUTE OF TECHNOLOGY (VIT)</span>
              <span>2023 – 2027</span>
            </div>
            <div className="text-[10px] text-[#00ff41]/70">B.TECH IN COMPUTER SCIENCE</div>
            <div className="text-xs mt-1 text-white">GPA: 9.23 / 10</div>
          </div>
          <div className="border-t border-[#00ff41]/10 pt-2">
            <div className="flex justify-between text-[11px] font-bold">
              <span>NARAYANA SCHOOL, BANGALORE</span>
              <span>2023</span>
            </div>
            <div className="text-[10px] text-[#00ff41]/50 italic">12TH GRADE (SCIENCE)</div>
          </div>
        </div>
      </div>

      <div className="border border-[#00ff41]/30 p-4 bg-black/30 bg-[#00ff41]/5 font-mono">
        <h3 className="text-sm font-bold flex items-center gap-2 mb-4 text-white">
          <Briefcase size={16} className="text-[#00ff41]" /> EXPERIENCE_LOG
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-[11px] font-bold">
              <span>FIDELITY INVESTMENTS</span>
              <span>MAY 2026</span>
            </div>
            <div className="text-[10px] text-[#00ff41]/70">SOFTWARE ENGINEERING INTERN (INCOMING)</div>
          </div>
          <div className="border-t border-[#00ff41]/10 pt-2">
            <div className="flex justify-between text-[11px] font-bold">
              <span>ZYEBRO TECHNOLOGIES</span>
              <span>2025</span>
            </div>
            <div className="text-[10px] text-[#00ff41]/70 text-xs">MERN STACK DEVELOPMENT INTERN</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SkillsTab = () => {
  const skillGroups = [
    { title: "LANGUAGES", skills: ["Python", "Java", "C/C++", "JavaScript", "R"] },
    { title: "WEB_TECHNOLOGIES", skills: ["HTML", "CSS", "React.js", "Node.js", "Express.js"] },
    { title: "DATABASE/CORE", skills: ["MongoDB", "SQL", "Data Structures", "Algorithms"] },
    { title: "TOOLS/SOFT", skills: ["Git", "VS Code", "Problem Solving", "Collaboration"] }
  ];
  
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl md:text-2xl mb-4 md:mb-6 flex items-center gap-2"><Cpu /> TARGET_SKILL_MATRIX</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {skillGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-3">
            <h3 className="text-[10px] md:text-xs font-bold text-[#00ff41]/60 tracking-[0.2em]">{group.title}</h3>
            <div className="grid grid-cols-1 gap-2">
              {group.skills.map((skill) => (
                <div 
                  key={skill}
                  className="border border-[#00ff41]/20 p-2 md:p-3 bg-[#050505] hover:border-[#00ff41] hover:bg-[#00ff41]/10 transition-all flex justify-between items-center group overflow-hidden min-h-[44px]"
                >
                  <span className="text-xs md:text-sm text-white/90 font-bold">{skill}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div key={level} className={`w-1 md:w-1.5 h-3 ${level <= 4 ? 'bg-[#00ff41]' : 'bg-[#00ff41]/20'} group-hover:animate-pulse`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

const ProjectsTab = () => {
  const projects = [
    {
      title: "Faculty Slot Booking System (FSBS)",
      desc: "Full-stack system replacing manual scheduling. Features role-based access control, availability management, and calendar-based scheduling with Google integration.",
      tech: ["React", "Express", "MongoDB", "CAS/SSO"],
      status: "ONGOING"
    },
    {
      title: "WaterQuest - Smart Monitoring System",
      desc: "Embedded IoT system for real-time water leakage detection and quality monitoring. Features automatic shut-off and GSM/IoT notification alerts.",
      tech: ["IoT", "Sensors", "GSM", "Embedded Systems"],
      status: "ONGOING"
    },
    {
      title: "UrbanCart E-Commerce",
      desc: "Full-stack platform with user authentication, product management, cart functionality, and secure JWT-based data operations.",
      tech: ["MERN Stack", "JWT", "MongoDB"],
      status: "COMPLETED"
    },
    {
      title: "AI-Based Document Reader",
      desc: "Web-based platform generating concise summaries of long documents and articles using advanced NLP models.",
      tech: ["NLP", "Python", "Web"],
      status: "COMPLETED"
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl md:text-2xl mb-4 md:mb-6 flex items-center gap-2"><FolderGit2 /> EXTRACTED_DATABANKS</h2>
      <div className="space-y-4 pr-0 md:pr-2">
        {projects.map((p, i) => (
          <div key={i} className="border border-[#00ff41]/30 p-4 bg-[#00ff41]/5 hover:bg-[#00ff41]/10 flex flex-col gap-2 transition-colors relative group border-l-4 border-l-[#00ff41]">
            <div className="md:absolute top-0 right-0 px-2 py-1 text-[8px] md:text-[10px] text-[#00ff41]/60 border border-[#00ff41]/30 bg-black/40 w-fit mb-2 md:mb-0">{p.status}</div>
            <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00ff41] animate-ping" />
              {p.title}
            </h3>
            <p className="text-[#00ff41]/70 text-xs md:text-sm">{p.desc}</p>
            <div className="flex flex-wrap gap-2 text-[8px] md:text-[10px] mt-1">
              {p.tech.map(tech => (
                <span key={tech} className="border border-[#08f7fe]/50 text-[#08f7fe] px-2 py-0.5 bg-[#08f7fe]/10">{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const TerminalTab = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    '> INITIALIZING ARJUN_S_PROBE...', 
    '> BIOMETRIC DATA MATCHED.', 
    '> TYPE "INFO" FOR RECORDS.',
    '> TYPE "RESUME" FOR DRIVE LINK.',
    '> TYPE "LINKEDIN" FOR PROFILE.',
    '> TYPE "CONTACT" FOR THE CONTACT INFORMATION'
  ]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const newHistory = [...history, `> ${input}`];
      const cmd = input.toLowerCase().trim();
      
      if (cmd === 'help') {
        newHistory.push('AVAILABLE COMMANDS:');
        newHistory.push('- info     : displays profile records');
        newHistory.push('- resume   : view full resume (drive link)');
        newHistory.push('- edu      : show academic credentials');
        newHistory.push('- linkedin : open linkedIn profile');
        newHistory.push('- contact  : show contact information');
        newHistory.push('- clear    : wipe console logs');
      } else if (cmd === 'info') {
        newHistory.push('TARGET: ARJUN S');
        newHistory.push('RANK: B.TECH CS (VIT)');
        newHistory.push('TAGS: INNOVATION, PROBLEM-SOLVING, MERN');
      } else if (cmd === 'resume') {
        newHistory.push('OPENING EXTERNAL LINK: RESUME_DRIVE_DATA...');
        window.open("https://drive.google.com/file/d/16NsG67T-3b3n9AVleHCmwwClGwhHJrpz/view?usp=drive_link", "_blank");
      } else if (cmd === 'edu') {
        newHistory.push('VIT: GPA 9.23/10');
        newHistory.push('NARAYANA: 12TH GRADE (SCIENCE)');
      } else if (cmd === 'linkedin') {
        newHistory.push('OPENING EXTERNAL LINK: linkedin.com/in/arjunsathish26/...');
        window.open("https://www.linkedin.com/in/arjunsathish26/", "_blank");
      } else if (cmd === 'contact') {
        newHistory.push('GAMIL : arjunsathish@gmail.com');
        newHistory.push('PH NO. : +91 8310362854');
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else {
        newHistory.push(`error: command "${input}" not found.`);
      }
      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl md:text-2xl mb-4 flex items-center gap-2"><Terminal /> SYSTEM_ROOT</h2>
      <div className="flex-1 border border-[#00ff41]/30 bg-[#020202] p-3 md:p-4 font-mono text-[10px] md:text-sm overflow-y-auto w-full max-w-full lg:max-w-3xl">

        {history.map((line, i) => (
          <div key={i} className="text-[#00ff41]/80 mb-1">{line}</div>
        ))}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[#00ff41]">&gt;</span>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent outline-none text-[#00ff41] caret-[#00ff41]"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

const ContactTab = () => (
  <div className="h-full flex flex-col justify-center items-center p-2">
    <div className="w-full max-w-md border border-[#00ff41]/30 bg-black/50 p-6 md:p-12 backdrop-blur text-center relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#00ff41]/20 animate-scanline" />
      
      <h2 className="text-xl md:text-3xl font-bold text-white tracking-widest mb-2 uppercase">COMM_CHANNEL</h2>
      <p className="text-[#00ff41]/70 mb-6 md:mb-12 text-[10px]">ESTABLISHING DIRECT UPLINK...</p>
      
      <div className="flex flex-col items-center gap-6 md:gap-8">
        <a 
          href="mailto:arjunsathishch@gmail.com"
          className="relative block p-4 md:p-8 border border-[#00ff41]/20 bg-[#00ff41]/5 rounded-xl transition-all duration-500 hover:border-[#00ff41] hover:bg-[#00ff41]/10 group/mail"
        >
          <div className="absolute inset-0 bg-[#00ff41]/5 blur-2xl rounded-full scale-0 group-hover/mail:scale-100 transition-transform duration-700" />
          <Mail 
            className="w-16 h-16 md:w-[120px] md:h-[120px] text-[#00ff41] relative z-10 drop-shadow-[0_0_20px_rgba(0,255,65,0.4)] group-hover/mail:scale-105 group-hover/mail:drop-shadow-[0_0_35px_rgba(0,255,65,0.7)] transition-all duration-500" 
          />
        </a>

        <div className="space-y-2">
          <p className="text-[#00ff41] font-bold tracking-widest animate-pulse text-[10px] md:text-sm">
            &gt; CLICK THE GMAIL ICON FOR CONTACTING
          </p>
          <p className="text-[8px] md:text-[10px] text-[#00ff41]/40 uppercase tracking-[0.3em]">
            secure_protocol_active // pgp_encrypted
          </p>
        </div>
      </div>
    </div>
  </div>
);

