import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Presentation, 
  Building2, 
  Briefcase, 
  Building, 
  Target, 
  Monitor, 
  Package, 
  Users, 
  BookOpen 
} from 'lucide-react';

const defaultImage = 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=800';

const LandingStudentEcosystem = () => {
  const nodes = [
    { id: 1, title: 'WORKSHOPS', desc: 'Industry experts. Real-world insights. Practical learning.', icon: <Presentation size={24} className="text-indigo-600" />, x: -340, y: -260, image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'COLLEGE PARTNERSHIPS', desc: 'We work with colleges to strengthen, not replace, education.', icon: <Building2 size={24} className="text-indigo-600" />, x: -440, y: -90, image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'INTERNSHIPS', desc: 'Apply skills in real environments. Gain early exposure.', icon: <Briefcase size={24} className="text-indigo-600" />, x: -440, y: 90, image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800' },
    { id: 4, title: 'CORPORATE EXPOSURE', desc: 'Industry visits, leaders interactions and global outlook.', icon: <Building size={24} className="text-indigo-600" />, x: -320, y: 270, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' },
    { id: 5, title: 'CAREER READINESS', desc: 'Aptitude. Communication. Interviews. Portfolio. Personal branding.', icon: <Target size={24} className="text-indigo-600" />, x: 0, y: 350, image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800' },
    { id: 6, title: 'LMS', desc: 'Learn anytime. Track progress. Stay on your path.', icon: <Monitor size={24} className="text-indigo-600" />, x: 320, y: 270, image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800' },
    { id: 7, title: 'PROJECTS', desc: 'Solve real problems. Build, test and create with purpose.', icon: <Package size={24} className="text-indigo-600" />, x: 440, y: 90, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800' },
    { id: 8, title: 'MENTORSHIP', desc: 'One-to-one guidance. Feedback that shapes confidence.', icon: <Users size={24} className="text-indigo-600" />, x: 440, y: -90, image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800' },
    { id: 9, title: 'TRAINING', desc: 'Structured learning paths built for skills, not just syllabus.', icon: <BookOpen size={24} className="text-indigo-600" />, x: 340, y: -260, image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800' },
  ];

  const [activeNode, setActiveNode] = useState(null);
  const currentImage = activeNode ? nodes.find(n => n.id === activeNode)?.image : defaultImage;

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern learning space" 
          className="w-full h-full object-cover opacity-40"
        />
        {/* Gradient overlay to ensure text and cards remain crisp */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-indigo-50/90 backdrop-blur-sm"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center md:text-left mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-black text-[#0F172A] leading-tight tracking-tight mb-4">
              Everything comes <br className="hidden md:block"/>
              back to <span className="text-indigo-600">the student.</span>
            </h2>
          </div>
          <div className="mt-6 md:mt-0 md:text-right border-l-2 border-indigo-200 pl-6 hidden md:block">
            <p className="text-lg text-[#64748B] font-medium">
              Different experiences.<br />
              <span className="text-indigo-600 font-bold">One continuous<br /> student journey.</span>
            </p>
          </div>
        </div>

        {/* Central Ecosystem Diagram - Desktop/Tablet */}
        <div className="hidden lg:flex relative h-[950px] items-center justify-center mt-[-50px]">
          
          {/* Connecting Lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {/* Background Circles */}
            <circle cx="50%" cy="50%" r="420" fill="none" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="10 10" className="opacity-80" />
            <circle cx="50%" cy="50%" r="280" fill="none" stroke="#F8FAFC" strokeWidth="1" className="opacity-50" />
            
            {/* Lines from center to each node */}
            {nodes.map((node) => {
              // Calculate intersection with the center circle (radius ~170 to avoid drawing inside the student image)
              const angle = Math.atan2(node.y, node.x);
              const startRadius = 180;
              const startX = `calc(50% + ${Math.cos(angle) * startRadius}px)`;
              const startY = `calc(50% + ${Math.sin(angle) * startRadius}px)`;
              
              // Draw to the inner edge of the card
              const distanceToCard = Math.sqrt(node.x * node.x + node.y * node.y) - 120; // Approx distance to card edge
              const endX = `calc(50% + ${Math.cos(angle) * distanceToCard}px)`;
              const endY = `calc(50% + ${Math.sin(angle) * distanceToCard}px)`;

              return (
                <g key={`connection-${node.id}`}>
                  <line 
                    x1={startX} 
                    y1={startY} 
                    x2={endX} 
                    y2={endY} 
                    stroke="#E2E8F0" 
                    strokeWidth="1.5" 
                    className="opacity-70"
                  />
                  {/* Decorative dot at the end of the line */}
                  <circle 
                    cx={endX} 
                    cy={endY} 
                    r="3" 
                    fill="#818CF8" 
                  />
                </g>
              );
            })}
          </svg>

          {/* Center Student Node */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="absolute z-20 flex flex-col items-center justify-center"
          >
            <div className="w-[320px] h-[320px] rounded-full overflow-hidden border-[8px] border-white shadow-2xl relative bg-indigo-50">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={currentImage} 
                  alt="Student at center" 
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 via-transparent to-transparent z-10"></div>
              <div className="absolute bottom-6 left-0 w-full text-center z-20">
                <span className="bg-white/90 backdrop-blur-sm text-indigo-800 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm transition-all duration-300">
                  {activeNode ? nodes.find(n => n.id === activeNode)?.title : "Aiiens Campus"}
                </span>
              </div>
            </div>
            <div className="bg-white px-8 py-4 rounded-2xl shadow-xl mt-[-20px] relative z-30 border border-slate-100 text-center">
              <h3 className="text-indigo-600 font-bold text-lg mb-1 uppercase tracking-wider">The Student</h3>
              <p className="text-slate-600 text-sm">At the centre of<br/>everything we do.</p>
            </div>
          </motion.div>

          {/* Surrounding Nodes */}
          {nodes.map((node, index) => {
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: node.x * 0.8, y: node.y * 0.8 }}
                whileInView={{ opacity: 1, x: node.x, y: node.y }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="absolute w-[240px] z-10"
                style={{ 
                  left: '50%', 
                  top: '50%',
                  marginLeft: '-120px',
                  marginTop: '-50px',
                }}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className={`rounded-2xl p-4 shadow-lg border-2 transition-all hover:scale-105 hover:-translate-y-1 cursor-default relative overflow-hidden group ${
                  activeNode === node.id ? 'border-indigo-400 shadow-indigo-200/50 shadow-xl' : 'border-slate-100'
                } ${
                  node.x < 0 ? 'text-right' : node.x > 0 ? 'text-left' : 'text-center'
                }`}>
                  
                  {/* Background Image Layer */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={node.image} 
                      alt={node.title} 
                      className={`w-full h-full object-cover transition-opacity duration-500 ${activeNode === node.id ? 'opacity-100' : 'opacity-40'}`} 
                    />
                    {/* Overlay to ensure text readability */}
                    <div className={`absolute inset-0 transition-colors duration-500 ${
                      activeNode === node.id ? 'bg-indigo-900/85' : 'bg-white/90'
                    }`}></div>
                  </div>

                  {/* Content Layer */}
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors duration-500 ${
                      activeNode === node.id ? 'bg-white/20 text-white backdrop-blur-sm' : 'bg-indigo-50 text-indigo-600'
                    } ${
                      node.x < 0 ? 'ml-auto' : node.x > 0 ? 'mr-auto' : 'mx-auto'
                    }`}>
                      {/* Clone icon to set color correctly */}
                      {React.cloneElement(node.icon, { className: activeNode === node.id ? 'text-white' : 'text-indigo-600' })}
                    </div>
                    <h4 className={`font-bold mb-2 uppercase text-sm tracking-wide transition-colors duration-500 ${activeNode === node.id ? 'text-white' : 'text-slate-900'}`}>
                      {node.title}
                    </h4>
                    <p className={`text-xs leading-relaxed transition-colors duration-500 ${activeNode === node.id ? 'text-indigo-100' : 'text-slate-500'}`}>
                      {node.desc}
                    </p>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col gap-6">
          <div className="bg-indigo-50 p-6 rounded-3xl text-center mb-6">
            <img 
              src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400" 
              alt="Student" 
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg mb-4"
            />
            <h3 className="text-indigo-600 font-bold text-xl uppercase tracking-wider mb-2">The Student</h3>
            <p className="text-slate-600">At the centre of everything we do.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nodes.map((node, i) => (
              <motion.div 
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                  {node.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1 uppercase text-sm">{node.title}</h4>
                  <p className="text-slate-500 text-xs">{node.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 max-w-4xl mx-auto bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
              <Users size={28} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-slate-600 font-medium mb-1">A connected ecosystem.</p>
              <p className="text-slate-600 font-medium mb-1">Guided by experts.</p>
              <p className="text-slate-600 font-medium mb-2">Built for real impact.</p>
              <p className="text-indigo-600 font-bold">Designed for your future.</p>
            </div>
          </div>

          <div className="h-px w-full md:w-px md:h-32 bg-slate-200"></div>

          <div>
            <p className="text-slate-600 font-medium mb-1 text-lg">YOUR JOURNEY.</p>
            <p className="text-indigo-600 font-bold mb-1 text-lg">OUR ECOSYSTEM.</p>
            <p className="text-indigo-600 font-bold text-lg">LIMITLESS POSSIBILITIES.</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default LandingStudentEcosystem;
