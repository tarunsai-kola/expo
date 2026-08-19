import React from 'react';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  MessageSquare,
  Users,
  FileText,
  Linkedin,
  FolderOpen,
  Mic2,
  Compass,
  ArrowRight
} from 'lucide-react';

const pillars = [
  {
    title: 'Analytical & Behavioral Foundation',
    color: '#3B82F6', // Blue
    glow: 'rgba(59, 130, 246, 0.15)',
    items: [
      {
        icon: <BrainCircuit size={18} />,
        label: 'Aptitude & Analytical Thinking',
        desc: 'Quantitative reasoning, logical thinking and problem-solving — built through structured practice.',
      },
      {
        icon: <Users size={18} />,
        label: 'Professional Habits & Teamwork',
        desc: 'Collaboration, accountability, feedback culture and professional workplace etiquette.',
      }
    ]
  },
  {
    title: 'Professional Presence & Communication',
    color: '#10B981', // Emerald
    glow: 'rgba(16, 185, 129, 0.15)',
    items: [
      {
        icon: <MessageSquare size={18} />,
        label: 'Communication & Presentation',
        desc: 'Verbal, written and visual communication skills for professional settings and group work.',
      },
      {
        icon: <Linkedin size={18} />,
        label: 'LinkedIn Profile Development',
        desc: 'Building a professional digital presence that reflects capability and invites industry attention.',
      }
    ]
  },
  {
    title: 'Application & Portfolio Strategy',
    color: '#F59E0B', // Amber
    glow: 'rgba(245, 158, 11, 0.15)',
    items: [
      {
        icon: <FileText size={18} />,
        label: 'Resume Strategy',
        desc: 'Crafting a resume that communicates real skills, projects and experience clearly and honestly.',
      },
      {
        icon: <FolderOpen size={18} />,
        label: 'Portfolio Evidence',
        desc: 'Documented projects and contributions that prove what students have built and learned.',
      }
    ]
  },
  {
    title: 'Interview & Placement Readiness',
    color: '#EF4444', // Red
    glow: 'rgba(239, 68, 68, 0.15)',
    items: [
      {
        icon: <Mic2 size={18} />,
        label: 'Mock Interviews',
        desc: 'Structured practice with structured feedback — so students walk into real interviews with confidence.',
      },
      {
        icon: <Compass size={18} />,
        label: 'Internship & Career Roadmap',
        desc: 'Clear next-step guidance: where to apply, what roles to target, and how to navigate the job search.',
      }
    ]
  }
];

const LandingCareerSupport = () => {
  return (
    <section className="relative w-full py-24 bg-[#020617] text-white overflow-hidden" id="career-readiness">
      
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10 pointer-events-none mix-blend-luminosity"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#090d16] via-transparent to-[#020617] pointer-events-none" />

      {/* Decorative Blur Glows */}
      <div className="absolute top-1/3 right-1/10 w-[450px] h-[450px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/10 w-[450px] h-[450px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6">
        
        {/* Two-Column Presentation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Sticky Header Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <span className="inline-block font-['Instrument_Sans'] text-xs font-semibold uppercase tracking-[2px] text-blue-400 bg-blue-400/10 px-4 py-1.5 rounded-full border border-blue-400/20">
              Career Readiness
            </span>
            <h2 className="font-['Instrument_Sans'] font-semibold text-3xl sm:text-5xl leading-tight">
              Technical skill is only<br />part of being ready.
            </h2>
            <p className="font-['Instrument_Sans'] text-white/50 text-base sm:text-lg leading-relaxed">
              True career readiness combines technical depth with communication, professionalism, and the ability to present oneself credibly. Our toolkit addresses all dimensions.
            </p>
            
            {/* Woven in every semester helper block */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 mt-8">
              <h4 className="font-['Instrument_Sans'] font-semibold text-sm text-white mb-2">
                Woven into Every Semester
              </h4>
              <p className="font-['Instrument_Sans'] text-xs text-white/40 leading-relaxed">
                We don't treat career preparation as a final-year add-on. Readiness is built gradually, starting from early semesters and deepening through each stage of the program.
              </p>
            </div>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-['Instrument_Sans'] font-semibold text-sm px-6 py-3 rounded-full transition-all shadow-[0_4px_20px_rgba(59,130,246,0.25)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.4)]"
            >
              <span>Discuss career outcomes</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Column: Grouped Pillars Layout */}
          <div className="lg:col-span-7 space-y-6">
            {pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="bg-[#0e1626]/40 border border-white/5 hover:border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md transition-all duration-300"
                whileHover={{
                  boxShadow: `0 8px 30px ${pillar.glow}`,
                  borderColor: `${pillar.color}20`
                }}
              >
                {/* Header of Pillar */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: pillar.color }} />
                  <h3 className="font-['Instrument_Sans'] font-semibold text-base sm:text-lg text-white">
                    {pillar.title}
                  </h3>
                </div>

                {/* Sub-items list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {pillar.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="space-y-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${pillar.color}12`,
                          color: pillar.color,
                          border: `1px solid ${pillar.color}25`
                        }}
                      >
                        {item.icon}
                      </div>
                      <h4 className="font-['Instrument_Sans'] font-semibold text-sm text-white">
                        {item.label}
                      </h4>
                      <p className="font-['Instrument_Sans'] text-xs text-white/50 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default LandingCareerSupport;
