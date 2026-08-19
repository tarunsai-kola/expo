import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ear,
  Map as MapIcon,
  UserCheck,
  Rocket,
  BarChart2,
  FileText,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    id: '01',
    verb: 'Understand',
    heading: 'We start by listening to your institution.',
    detail:
      'Every college has a unique profile — different departments, student demographics, faculty capabilities, and institutional priorities. We begin by understanding your context: where students currently are, what the faculty needs, and what the institution wants to achieve.',
    points: [
      'Student profile, strengths and existing gaps',
      'Departmental goals and faculty availability',
      'Institutional vision and management priorities',
      'Current infrastructure and resources',
    ],
    icon: <Ear size={20} />,
    accentColor: '#3B82F6', // Blue
    bgColor: 'rgba(59, 130, 246, 0.1)',
  },
  {
    id: '02',
    verb: 'Map',
    heading: 'We co-create a roadmap with your team.',
    detail:
      'No two colleges receive the same program. Together with department heads and faculty, we map interventions that align with your academic calendar, curriculum structure, and institutional priorities — defining measurable outcomes at every stage.',
    points: [
      'Roadmap aligned to academic semester structure',
      'Domain and department-specific customisation',
      'Resource planning and faculty coordination',
      'Clearly defined milestones and outcome metrics',
    ],
    icon: <MapIcon size={20} />,
    accentColor: '#10B981', // Emerald
    bgColor: 'rgba(16, 185, 129, 0.1)',
  },
  {
    id: '03',
    verb: 'Onboard',
    heading: 'We orient students and faculty to the ecosystem.',
    detail:
      'A smooth start matters. We conduct orientation sessions for students and coordination briefings for faculty. Learning paths are activated, digital access is set up, and early engagement activities are launched to build momentum.',
    points: [
      'Student orientation and learning path activation',
      'Faculty briefing and coordination setup',
      'LMS onboarding and digital access',
      'Early engagement workshops and icebreaker activities',
    ],
    icon: <UserCheck size={20} />,
    accentColor: '#8B5CF6', // Violet
    bgColor: 'rgba(139, 92, 246, 0.1)',
  },
  {
    id: '04',
    verb: 'Deliver',
    heading: 'We execute live workshops, projects and mentorship.',
    detail:
      'Execution is everything. We deliver live workshops, assign guided project work, launch structured domain training modules on our LMS, and facilitate recurring interactions with industry experts and practitioners.',
    points: [
      'Live workshops and interactive domain sessions',
      'Guided project milestones and code evaluations',
      'Structured technical and soft-skill modules',
      'Regular expert Q&A and group mentorship',
    ],
    icon: <Rocket size={20} />,
    accentColor: '#F59E0B', // Amber
    bgColor: 'rgba(245, 158, 11, 0.1)',
  },
  {
    id: '05',
    verb: 'Measure',
    heading: 'We track every project milestone and assessment.',
    detail:
      'We do not wait until final exams. Learning is monitored continuously. Every project submission, LMS module completion, mock interview session, and assessment is logged to provide live indicators of cohort capabilities.',
    points: [
      'Continuous progress logging on digital dash',
      'Code quality, presentation, and logic reviews',
      'Mock interview readiness evaluations',
      'Department-level and cohort-level analytics',
    ],
    icon: <BarChart2 size={20} />,
    accentColor: '#EF4444', // Red
    bgColor: 'rgba(239, 68, 68, 0.1)',
  },
  {
    id: '06',
    verb: 'Report',
    heading: 'We share transparent reports and plan the next cycle.',
    detail:
      'At structured intervals and at cycle end, we deliver clear, honest reports to management. No vanity metrics — just real data on what worked, where students progressed, and what we recommend for the next semester.',
    points: [
      'Structured progress reports for management',
      'Department-level breakdowns and insights',
      'Outcome highlights: participation, completions, projects',
      'Honest recommendations for the next program cycle',
      'Shared planning session for continuous improvement',
    ],
    icon: <FileText size={20} />,
    accentColor: '#06B6D4', // Cyan
    bgColor: 'rgba(6, 182, 212, 0.1)',
  },
];

const LandingImplementationFlow = () => {
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => setExpanded(prev => (prev === id ? null : id));

  return (
    <section className="relative w-full py-24 bg-[#020617] text-white overflow-hidden" id="implementation">
      
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10 pointer-events-none mix-blend-screen"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=1920')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#090d16] via-transparent to-[#020617] pointer-events-none" />

      {/* Decorative Radial Glows */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6">

        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="inline-block font-['Instrument_Sans'] text-xs font-semibold uppercase tracking-[2px] text-blue-400 bg-blue-400/10 px-4 py-1.5 rounded-full border border-blue-400/20">
            Partnership Delivery Model
          </span>
          <h2 className="font-['Instrument_Sans'] font-semibold text-3xl sm:text-5xl leading-tight text-white">
            Designed with your institution.<br />Delivered with care.
          </h2>
          <p className="font-['Instrument_Sans'] text-white/50 text-base sm:text-lg leading-relaxed max-w-2xl">
            We don't arrive with a standard program and leave. We listen, co-design, deliver and report — working as a genuine partner at every stage.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Connecting spine */}
          <div className="absolute left-6 sm:left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 via-violet-500 to-cyan-500 opacity-20 rounded-full" />

          <div className="flex flex-col gap-6 pl-14 sm:pl-20">
            {steps.map((step, idx) => {
              const isOpen = expanded === step.id;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="relative"
                >
                  {/* Step marker */}
                  <button
                    onClick={() => toggle(step.id)}
                    className="absolute -left-14 sm:-left-20 top-4 w-10 sm:w-12 h-10 sm:h-12 rounded-full flex flex-col items-center justify-center transition-all duration-300 z-10"
                    style={{
                      background: isOpen ? step.accentColor : '#0a0f1d',
                      border: `2px solid ${step.accentColor}`,
                      color: isOpen ? '#ffffff' : step.accentColor,
                      boxShadow: isOpen 
                        ? `0 0 20px ${step.accentColor}50`
                        : `0 0 10px rgba(0,0,0,0.5)`
                    }}
                  >
                    <span className="font-['Instrument_Sans'] text-[9px] font-bold tracking-wider leading-none mb-0.5">
                      {step.id}
                    </span>
                    <div className="scale-75 sm:scale-90">{step.icon}</div>
                  </button>

                  {/* Glassmorphic Accordion Card */}
                  <div
                    className="bg-[#0e1626]/40 border rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300"
                    style={{
                      borderColor: isOpen ? `${step.accentColor}30` : 'rgba(255,255,255,0.05)',
                      boxShadow: isOpen ? `0 8px 32px ${step.accentColor}10` : 'none'
                    }}
                  >
                    {/* Card header */}
                    <button
                      onClick={() => toggle(step.id)}
                      className="w-full padding-6 py-6 px-6 sm:px-8 flex items-center justify-between gap-4 bg-none border-none cursor-pointer text-left focus:outline-none"
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: step.bgColor,
                            color: step.accentColor,
                            border: `1px solid ${step.accentColor}20`
                          }}
                        >
                          {step.icon}
                        </div>
                        <div>
                          <div 
                            className="font-['Instrument_Sans'] text-[10px] font-bold tracking-[1.5px] uppercase mb-1"
                            style={{ color: step.accentColor }}
                          >
                            {step.verb}
                          </div>
                          <h4 className="font-['Instrument_Sans'] font-semibold text-base sm:text-lg text-white leading-tight">
                            {step.heading}
                          </h4>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-white/40 flex-shrink-0"
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </button>

                    {/* Expanded body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 sm:px-8 pb-6 pt-2 border-t border-white/5 space-y-5">
                            <p className="font-['Instrument_Sans'] text-sm sm:text-base text-white/60 leading-relaxed">
                              {step.detail}
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                              {step.points.map((pt, i) => (
                                <li key={i} className="flex items-start gap-3">
                                  <span 
                                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" 
                                    style={{ backgroundColor: step.accentColor }}
                                  />
                                  <span className="font-['Instrument_Sans'] text-xs sm:text-sm text-white/50 leading-relaxed">
                                    {pt}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 bg-gradient-to-r from-blue-600/80 to-indigo-600/80 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-2">
            <span className="font-['Instrument_Sans'] text-[10px] font-bold tracking-[1.5px] uppercase text-white/60 block">
              Our Commitment
            </span>
            <h3 className="font-['Instrument_Sans'] font-semibold text-xl sm:text-2xl text-white tracking-tight">
              Understand. Deliver. Improve. Together.
            </h3>
            <p className="font-['Instrument_Sans'] text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed">
              We walk alongside your institution — not ahead of it. Every decision is made with your goals, your faculty and your students in mind.
            </p>
          </div>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2 bg-white hover:bg-white/90 text-blue-900 font-['Instrument_Sans'] font-semibold text-sm px-6 py-3.5 rounded-full transition-all shadow-[0_4px_20px_rgba(255,255,255,0.15)] flex-shrink-0"
          >
            <span>Schedule a Consultation</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingImplementationFlow;
