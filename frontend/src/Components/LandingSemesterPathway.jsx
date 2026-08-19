import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Layers,
  Zap,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Play,
  Pause
} from 'lucide-react';

const stages = [
  {
    id: 1,
    label: 'Awareness',
    tag: 'Semesters 1–2',
    icon: <Compass size={22} />,
    color: '#3B82F6', // Blue
    bg: 'rgba(59, 130, 246, 0.1)',
    heading: 'Explore industry and build early direction.',
    summary: 'Help students move beyond the syllabus. Build curiosity, identify interests, and establish foundational soft skills.',
    points: [
      'Domain exploration and technology awareness workshops',
      'Mentor conversations and industry Q&A sessions',
      'Identifying student aptitude and areas of interest',
      'Communication and professional behaviour foundations',
      'Introduction to LMS learning paths and resources',
    ],
  },
  {
    id: 2,
    label: 'Capability',
    tag: 'Semesters 3–5',
    icon: <Layers size={22} />,
    color: '#10B981', // Emerald
    bg: 'rgba(16, 185, 129, 0.1)',
    heading: 'Build deep skills and real project experience.',
    summary: 'Move from awareness to action. Students develop technical skills, complete guided projects, and build demonstrable portfolio evidence.',
    points: [
      'Structured domain-specific and technical skill training',
      'Guided real-world project execution with mentor feedback',
      'Teamwork, collaboration and peer-learning exercises',
      'LMS assessments and structured learning checkpoints',
      'Project portfolio documentation and review',
    ],
  },
  {
    id: 3,
    label: 'Readiness',
    tag: 'Semester 6',
    icon: <Zap size={22} />,
    color: '#F59E0B', // Amber
    bg: 'rgba(245, 158, 11, 0.1)',
    heading: 'Sharpen skills and prepare for the real world.',
    summary: 'A dedicated readiness semester — advanced projects, career preparation essentials, and internship guidance before final-year pressure begins.',
    points: [
      'Advanced capstone projects and portfolio completion',
      'Aptitude training, logical reasoning and communication practice',
      'Resume strategy and LinkedIn profile development',
      'Mock interview preparation and structured feedback',
      'Internship application guidance and readiness review',
    ],
  },
  {
    id: 4,
    label: 'Transition',
    tag: 'Semesters 7–8',
    icon: <GraduationCap size={22} />,
    color: '#D946EF', // Fuchsia
    bg: 'rgba(217, 70, 239, 0.1)',
    heading: 'Move from campus to career with confidence.',
    summary: 'Support students through the most critical stage — final projects, job-readiness, and the professional transition from student to practitioner.',
    points: [
      'Final-year project mentorship, review and presentation support',
      'Live mock interview sessions with structured expert feedback',
      'Career guidance and professional job-readiness sessions',
      'Internship experience consolidation and reflection',
      'Professional portfolio completion and final review',
    ],
  },
];

const LandingSemesterPathway = () => {
  const [activeStage, setActiveStage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);

  // Auto-progress stages every 3 seconds
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setActiveStage((prev) => (prev % 4) + 1);
      }, 3000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleStageClick = (id) => {
    setActiveStage(id);
    setIsPlaying(false); // Pause autoplay once the user interacts
  };

  const currentStage = stages.find(s => s.id === activeStage);

  return (
    <section className="relative w-full py-24 bg-[#030712] text-white overflow-hidden" id="outcomes">
      
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10 pointer-events-none mix-blend-screen"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#090d16] via-transparent to-[#030712] pointer-events-none" />

      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-['Instrument_Sans'] font-semibold text-3xl sm:text-5xl leading-tight">
            Don't wait until final year<br />to build industry readiness.
          </h2>
          <p className="font-['Instrument_Sans'] text-white/50 text-lg sm:text-[19px] leading-relaxed max-w-2xl mx-auto">
            Industry readiness is built semester by semester — not crammed in a final-year sprint. Aiiens Campus integrates into your institution across all four stages.
          </p>
        </div>

        {/* Stepper Stepper Stepper */}
        <div className="max-w-4xl mx-auto mb-12">
          
          {/* Stepper Timeline Nav */}
          <div className="relative flex justify-between items-center z-10 mb-6">
            
            {/* Background connection line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/5 -translate-y-1/2 z-0" />
            
            {/* Glowing progress line */}
            <motion.div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-amber-500 -translate-y-1/2 z-0 origin-left"
              animate={{
                width: `${((activeStage - 1) / 3) * 100}%`
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />

            {stages.map((stage) => {
              const isActive = stage.id === activeStage;
              const isPassed = stage.id < activeStage;
              return (
                <button
                  key={stage.id}
                  onClick={() => handleStageClick(stage.id)}
                  className="relative z-10 flex flex-col items-center focus:outline-none group"
                >
                  {/* Outer circle */}
                  <motion.div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isActive 
                        ? 'bg-slate-900 border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                        : isPassed
                          ? 'bg-[#0f172a] border-emerald-500 text-emerald-400'
                          : 'bg-[#020617] border-white/10 text-white/40 group-hover:border-white/30 group-hover:text-white/70'
                    }`}
                  >
                    {stage.icon}
                  </motion.div>

                  {/* Stage Details below circle */}
                  <div className="absolute top-14 flex flex-col items-center">
                    <span className={`font-['Instrument_Sans'] text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/40'
                    }`}>
                      {stage.label}
                    </span>
                    <span className={`font-['Instrument_Sans'] text-[10px] whitespace-nowrap transition-colors duration-300 mt-0.5 ${
                      isActive ? 'text-white/80' : 'text-white/30'
                    }`}>
                      {stage.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Autoplay Controls (Play / Pause Indicator) */}
          <div className="flex justify-end items-center gap-2 mt-20 pr-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white/40 hover:text-white flex items-center gap-1.5 text-xs font-['Instrument_Sans'] tracking-wider uppercase transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause size={12} />
                  <span>Autoplay Active</span>
                </>
              ) : (
                <>
                  <Play size={12} />
                  <span>Autoplay Paused</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Details Area */}
        <div className="max-w-4xl mx-auto mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="bg-[#0e1626]/40 border border-white/5 rounded-3xl p-8 sm:p-10 backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Column: Summary */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <span 
                    className="inline-block font-['Instrument_Sans'] text-[11px] font-bold tracking-widest uppercase px-3.5 py-1 rounded-full mb-6"
                    style={{
                      background: `${currentStage.color}15`,
                      color: currentStage.color,
                      border: `1px solid ${currentStage.color}30`
                    }}
                  >
                    {currentStage.tag}
                  </span>
                  
                  <h3 className="font-['Instrument_Sans'] font-semibold text-2xl sm:text-3xl text-white leading-tight mb-4">
                    {currentStage.heading}
                  </h3>
                  
                  <p className="font-['Instrument_Sans'] text-sm sm:text-base text-white/50 leading-relaxed">
                    {currentStage.summary}
                  </p>
                </div>

                {/* Progress bar inside details if playing */}
                {isPlaying && (
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      key={activeStage}
                      className="h-full rounded-full"
                      style={{ backgroundColor: currentStage.color }}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "linear" }}
                    />
                  </div>
                )}
              </div>

              {/* Right Column: Deliverables Checklist */}
              <div className="md:col-span-7 bg-white/[0.01] border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-center">
                <div className="space-y-4">
                  <p className="font-['Instrument_Sans'] text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
                    Key Deliverables
                  </p>
                  
                  {currentStage.points.map((pt, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 size={16} className="flex-shrink-0 mt-1" style={{ color: currentStage.color }} />
                      <span className="font-['Instrument_Sans'] text-sm text-white/70 leading-relaxed">
                        {pt}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA nudge */}
        <p className="text-center font-['Instrument_Sans'] text-sm text-white/40 mt-16">
          Our team will work with your department heads to customise the right stage-wise intervention.{' '}
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-blue-400 font-semibold hover:text-blue-300 underline transition-colors"
          >
            Discuss your institution's needs →
          </button>
        </p>

      </div>
    </section>
  );
};

export default LandingSemesterPathway;
