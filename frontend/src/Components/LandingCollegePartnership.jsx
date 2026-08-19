import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpenCheck,
  TrendingUp,
  FolderGit2,
  UserRound,
  ShieldCheck,
  BarChart3,
  Building2,
  Layout,
  Users,
  GraduationCap,
  Sparkle
} from 'lucide-react';

const valueCards = [
  {
    icon: <BookOpenCheck size={20} />,
    glowColor: 'rgba(6, 182, 212, 0.25)', // Cyan
    numColor: 'text-[#06b6d4]',
    numGlow: 'drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]',
    title: 'Curriculum-aligned practical learning',
    desc: 'All programs are designed to complement your academic structure, not conflict with it. Faculty coordination is built in.',
  },
  {
    icon: <TrendingUp size={20} />,
    glowColor: 'rgba(139, 92, 246, 0.25)', // Purple
    numColor: 'text-[#8b5cf6]',
    numGlow: 'drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]',
    title: 'Stronger student engagement and confidence',
    desc: 'Students become more invested in their own growth when they can see real connections between learning and doing.',
  },
  {
    icon: <FolderGit2 size={20} />,
    glowColor: 'rgba(245, 158, 11, 0.25)', // Amber
    numColor: 'text-[#f59e0b]',
    numGlow: 'drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]',
    title: 'Industry-relevant projects and portfolios',
    desc: 'Students build real projects that demonstrate capability — giving departments and institutions visible outcomes.',
  },
  {
    icon: <UserRound size={20} />,
    glowColor: 'rgba(59, 130, 246, 0.25)', // Blue
    numColor: 'text-[#3b82f6]',
    numGlow: 'drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]',
    title: 'Structured mentorship and expert exposure',
    desc: 'Bring experienced professionals closer to campus. Mentor sessions that go beyond a single event.',
  },
  {
    icon: <ShieldCheck size={20} />,
    glowColor: 'rgba(239, 68, 68, 0.25)', // Red
    numColor: 'text-[#ef4444]',
    numGlow: 'drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]',
    title: 'Career-readiness support before final year',
    desc: 'Students arrive at placement season with portfolios, aptitude skills and communication ability already developed.',
  },
  {
    icon: <BarChart3 size={20} />,
    glowColor: 'rgba(16, 185, 129, 0.25)', // Emerald
    numColor: 'text-[#10b981]',
    numGlow: 'drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]',
    title: 'Measurable reporting for management',
    desc: 'Regular structured reports show participation, progress, and outcomes — giving management clear institutional visibility.',
  },
];

const stakeholders = [
  {
    role: 'For Management',
    icon: <Building2 size={18} />,
    text: 'Visibility into program scope, student participation, learning progress, and institutional outcomes at every cycle.',
  },
  {
    role: 'For Departments',
    icon: <Layout size={18} />,
    text: 'Customized interventions aligned to department-specific student needs, technology domains, and semester structures.',
  },
  {
    role: 'For Faculty',
    icon: <Users size={18} />,
    text: 'Clear coordination support that complements classroom instruction — not added workload.',
  },
  {
    role: 'For Students',
    icon: <GraduationCap size={18} />,
    text: 'Continuous learning, guided project experience, mentor access and career confidence built through the semesters.',
  },
];

const LandingCollegePartnership = () => {
  return (
    <section className="relative w-full py-24 bg-[#090d16] text-white overflow-hidden" id="why-aiiens">
      
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-15 pointer-events-none mix-blend-screen"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1920')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#090d16] via-transparent to-[#030712] pointer-events-none" />
      
      {/* Decorative Radial Glows */}
      <div className="absolute top-1/4 right-1/10 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/10 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-['Instrument_Sans'] font-semibold text-3xl sm:text-5xl leading-tight">
            What your college gains<br />with Aiiens Campus.
          </h2>
          <p className="font-['Instrument_Sans'] text-white/50 text-lg sm:text-[19px] leading-relaxed max-w-2xl mx-auto">
            A genuine industry-readiness partnership that creates measurable impact for management, departments, faculty and students alike.
          </p>
        </div>

        {/* Value Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {valueCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="group relative bg-[#0e1626]/40 border border-white/5 hover:border-white/15 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              style={{
                boxShadow: `0 4px 30px rgba(0, 0, 0, 0.2)`
              }}
              whileHover={{
                boxShadow: `0 10px 40px ${card.glowColor}`
              }}
            >
              <div>
                {/* ID & Giant Glow Number */}
                <div className="flex justify-between items-start mb-6">
                  <span className="font-['Instrument_Sans'] text-xs font-medium text-white/40">
                    0{idx + 1}
                  </span>
                  <span className={`font-['Instrument_Sans'] font-semibold text-6xl leading-none ${card.numColor} ${card.numGlow} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
                    0{idx + 1}
                  </span>
                </div>

                {/* Icon box */}
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/80 mb-6 group-hover:text-white transition-colors">
                  {card.icon}
                </div>

                {/* Title */}
                <h4 className="font-['Instrument_Sans'] font-semibold text-lg text-white mb-3">
                  {card.title}
                </h4>

                {/* Description */}
                <p className="font-['Instrument_Sans'] text-sm text-white/50 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stakeholder Panel (Designed for every stakeholder) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 sm:p-12 overflow-hidden"
        >
          {/* Subtle inside blur decoration */}
          <div className="absolute -top-1/4 -right-1/10 w-[300px] h-[300px] bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

          {/* Sparkle Decoration at bottom right */}
          <div className="absolute bottom-6 right-6 text-white/20 z-0">
            <Sparkle size={48} className="animate-spin-slow" />
          </div>

          <div className="relative z-10 mb-10">
            <p className="font-['Instrument_Sans'] font-medium text-xs text-white/40 tracking-[2px] uppercase mb-2">
              Designed for Every Stakeholder
            </p>
            <h3 className="font-['Instrument_Sans'] font-semibold text-2xl sm:text-3xl text-white tracking-tight">
              One partnership. Value at every level.
            </h3>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {stakeholders.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-colors hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/70">
                    {s.icon}
                  </div>
                  <span className="font-['Instrument_Sans'] font-semibold text-sm text-white">
                    {s.role}
                  </span>
                </div>
                <p className="font-['Instrument_Sans'] text-sm text-white/50 leading-relaxed">
                  {s.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default LandingCollegePartnership;
