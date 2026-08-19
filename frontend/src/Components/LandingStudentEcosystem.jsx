import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Presentation,
  BookOpen,
  FolderKanban,
  Users,
  Target,
  Monitor,
  Building2,
  Briefcase,
  TrendingUp,
  GraduationCap
} from 'lucide-react';

const nodes = [
  {
    id: 1,
    icon: <Presentation size={20} />,
    label: 'Workshops',
    desc: 'Expert-led sessions, real-world insights, practical demonstrations',
    color: '#3B82F6',
  },
  {
    id: 2,
    icon: <BookOpen size={20} />,
    label: 'Structured Training',
    desc: 'Skill-focused learning paths aligned to domain and semester',
    color: '#10B981',
  },
  {
    id: 3,
    icon: <Monitor size={20} />,
    label: 'LMS Platform',
    desc: 'Curated resources, assessments, progress tracking, anytime access',
    color: '#8B5CF6',
  },
  {
    id: 4,
    icon: <FolderKanban size={20} />,
    label: 'Projects',
    desc: 'Real problem-solving, guided builds, portfolio evidence',
    color: '#F59E0B',
  },
  {
    id: 5,
    icon: <Users size={20} />,
    label: 'Mentorship',
    desc: 'Guidance from experienced professionals, feedback that builds confidence',
    color: '#3B82F6',
  },
  {
    id: 6,
    icon: <Target size={20} />,
    label: 'Career Readiness',
    desc: 'Aptitude, communication, resume, portfolio, interview preparation',
    color: '#EF4444',
  },
  {
    id: 7,
    icon: <Building2 size={20} />,
    label: 'Corporate Exposure',
    desc: 'Industry interactions, expert talks, live problem statements',
    color: '#06B6D4',
  },
  {
    id: 8,
    icon: <Briefcase size={20} />,
    label: 'Internships',
    desc: 'Apply skills in real environments. Early professional experience.',
    color: '#10B981',
  },
  {
    id: 9,
    icon: <TrendingUp size={20} />,
    label: 'College Partnership',
    desc: 'Institutional alignment, faculty coordination, management reporting',
    color: '#D946EF',
  },
];

const LandingStudentEcosystem = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <section className="relative w-full py-24 bg-[#090d16] text-white overflow-hidden" id="ecosystem">
      
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10 pointer-events-none mix-blend-screen"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1920')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#090d16] pointer-events-none" />

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="font-['Instrument_Sans'] font-semibold text-3xl sm:text-5xl leading-tight">
            One connected ecosystem.<br />Stronger student outcomes.
          </h2>
          <p className="font-['Instrument_Sans'] text-white/50 text-lg sm:text-[19px] leading-relaxed max-w-2xl mx-auto">
            We do not replace the college. We strengthen the practical layer that helps students apply, build, communicate and grow.
          </p>
        </div>

        {/* 3x3 Grid Layout */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Cell 1: Workshops */}
            <motion.div
              onMouseEnter={() => setHoveredNode(1)}
              onMouseLeave={() => setHoveredNode(null)}
              className="bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.04]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/80 mb-4 transition-colors group-hover:text-white">
                {nodes[0].icon}
              </div>
              <h3 className="font-['Instrument_Sans'] font-semibold text-lg text-white mb-2">{nodes[0].label}</h3>
              <p className="font-['Instrument_Sans'] text-sm text-white/50 leading-relaxed">{nodes[0].desc}</p>
            </motion.div>

            {/* Cell 2: Structured Training */}
            <motion.div
              onMouseEnter={() => setHoveredNode(2)}
              onMouseLeave={() => setHoveredNode(null)}
              className="bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.04]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/80 mb-4">
                {nodes[1].icon}
              </div>
              <h3 className="font-['Instrument_Sans'] font-semibold text-lg text-white mb-2">{nodes[1].label}</h3>
              <p className="font-['Instrument_Sans'] text-sm text-white/50 leading-relaxed">{nodes[1].desc}</p>
            </motion.div>

            {/* Cell 3: LMS Platform */}
            <motion.div
              onMouseEnter={() => setHoveredNode(3)}
              onMouseLeave={() => setHoveredNode(null)}
              className="bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.04]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/80 mb-4">
                {nodes[2].icon}
              </div>
              <h3 className="font-['Instrument_Sans'] font-semibold text-lg text-white mb-2">{nodes[2].label}</h3>
              <p className="font-['Instrument_Sans'] text-sm text-white/50 leading-relaxed">{nodes[2].desc}</p>
            </motion.div>

            {/* Cell 4: Projects */}
            <motion.div
              onMouseEnter={() => setHoveredNode(4)}
              onMouseLeave={() => setHoveredNode(null)}
              className="bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.04]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/80 mb-4">
                {nodes[3].icon}
              </div>
              <h3 className="font-['Instrument_Sans'] font-semibold text-lg text-white mb-2">{nodes[3].label}</h3>
              <p className="font-['Instrument_Sans'] text-sm text-white/50 leading-relaxed">{nodes[3].desc}</p>
            </motion.div>

            {/* CENTER HUB: The Student (Minimal Dark Style) */}
            <motion.div 
              className="relative bg-gradient-to-b from-[#1e293b]/50 to-[#0f172a]/50 border border-blue-500/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center overflow-hidden min-h-[220px]"
              style={{
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                <GraduationCap size={24} />
              </div>
              <h3 className="font-['Instrument_Sans'] font-bold text-lg text-white tracking-tight mb-2">The Student</h3>
              <p className="font-['Instrument_Sans'] text-xs text-white/60 max-w-[180px]">
                Everything connects back to their growth and readiness
              </p>
            </motion.div>

            {/* Cell 6: Mentorship */}
            <motion.div
              onMouseEnter={() => setHoveredNode(5)}
              onMouseLeave={() => setHoveredNode(null)}
              className="bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.04]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/80 mb-4">
                {nodes[4].icon}
              </div>
              <h3 className="font-['Instrument_Sans'] font-semibold text-lg text-white mb-2">{nodes[4].label}</h3>
              <p className="font-['Instrument_Sans'] text-sm text-white/50 leading-relaxed">{nodes[4].desc}</p>
            </motion.div>

            {/* Cell 7: Career Readiness */}
            <motion.div
              onMouseEnter={() => setHoveredNode(6)}
              onMouseLeave={() => setHoveredNode(null)}
              className="bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.04]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/80 mb-4">
                {nodes[5].icon}
              </div>
              <h3 className="font-['Instrument_Sans'] font-semibold text-lg text-white mb-2">{nodes[5].label}</h3>
              <p className="font-['Instrument_Sans'] text-sm text-white/50 leading-relaxed">{nodes[5].desc}</p>
            </motion.div>

            {/* Cell 8: Corporate Exposure */}
            <motion.div
              onMouseEnter={() => setHoveredNode(7)}
              onMouseLeave={() => setHoveredNode(null)}
              className="bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.04]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/80 mb-4">
                {nodes[6].icon}
              </div>
              <h3 className="font-['Instrument_Sans'] font-semibold text-lg text-white mb-2">{nodes[6].label}</h3>
              <p className="font-['Instrument_Sans'] text-sm text-white/50 leading-relaxed">{nodes[6].desc}</p>
            </motion.div>

            {/* Cell 9: Internships */}
            <motion.div
              onMouseEnter={() => setHoveredNode(8)}
              onMouseLeave={() => setHoveredNode(null)}
              className="bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.04]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/80 mb-4">
                {nodes[7].icon}
              </div>
              <h3 className="font-['Instrument_Sans'] font-semibold text-lg text-white mb-2">{nodes[7].label}</h3>
              <p className="font-['Instrument_Sans'] text-sm text-white/50 leading-relaxed">{nodes[7].desc}</p>
            </motion.div>

            {/* Cell 10: College Partnership (Spans 3 Columns) */}
            <motion.div
              onMouseEnter={() => setHoveredNode(9)}
              onMouseLeave={() => setHoveredNode(null)}
              className="md:col-span-3 bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.04] flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/80 flex-shrink-0">
                {nodes[8].icon}
              </div>
              <div>
                <h3 className="font-['Instrument_Sans'] font-semibold text-lg text-white mb-1">{nodes[8].label}</h3>
                <p className="font-['Instrument_Sans'] text-sm text-white/50 leading-relaxed">{nodes[8].desc}</p>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Supporting Quote Banner (Minimal Glass Style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 max-w-3xl mx-auto border-t border-white/10 pt-10 text-center"
        >
          <p className="font-['Instrument_Serif'] italic text-2xl text-blue-200 leading-relaxed">
            "We do not replace the college. We strengthen the practical layer that helps students <span className="font-['Instrument_Sans'] not-italic font-semibold text-white">apply, build, communicate and grow</span>."
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default LandingStudentEcosystem;
