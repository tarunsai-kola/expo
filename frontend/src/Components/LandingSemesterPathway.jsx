import React from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Settings, 
  Target, 
  TrendingUp,
  Users
} from 'lucide-react';

const LandingSemesterPathway = () => {
  const pathways = [
    {
      id: '01',
      phase: 'EARLY SEMESTERS',
      title: 'AWARENESS',
      subtitle: 'Explore. Discover. Get curious.',
      points: [
        'Explore interests and emerging technologies',
        'Attend workshops & expert sessions',
        'Discover real-world possibilities',
        'Interact with mentors and seniors'
      ],
      icon: <Eye size={24} />,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: '02',
      phase: 'MIDDLE SEMESTERS',
      title: 'CAPABILITY',
      subtitle: 'Learn. Build. Collaborate.',
      points: [
        'Learn in-depth and strengthen fundamentals',
        'Work on projects and solve real problems',
        'Build technical and soft skills',
        'Teamwork, peer learning and mentorship'
      ],
      icon: <Settings size={24} />,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: '03',
      phase: 'PRE-FINAL YEAR',
      title: 'READINESS',
      subtitle: 'Prepare. Showcase. Get ready.',
      points: [
        'Take up advanced projects',
        'Build your professional portfolio',
        'Improve communication & aptitude',
        'Prepare for internships and industry roles'
      ],
      icon: <Target size={24} />,
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: '04',
      phase: 'FINAL YEAR',
      title: 'TRANSITION',
      subtitle: 'Apply. Connect. Grow.',
      points: [
        'Apply for internships and opportunities',
        'Ace interviews and assessments',
        'Get career guidance and support',
        'Transition confidently into the professional world'
      ],
      icon: <TrendingUp size={24} />,
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <div className="text-slate-500 uppercase tracking-widest text-sm font-bold mb-4">SEMESTER-WISE PATHWAY</div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight tracking-tight mb-2">
              DON'T WAIT UNTIL
            </h2>
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight tracking-tight mb-2">
              FINAL YEAR TO BECOME
            </h2>
            <h2 className="text-4xl md:text-5xl font-black text-indigo-600 leading-tight tracking-tight">
              INDUSTRY-READY.
            </h2>
          </div>
          <div className="max-w-xs md:text-right border-l-4 md:border-l-0 md:border-r-4 border-indigo-200 pl-4 md:pl-0 md:pr-4">
            <p className="text-slate-600 font-medium">
              Industry readiness is not a one-semester sprint.<br />
              It's a journey we build together — <span className="text-indigo-600 font-bold">step by step, semester by semester.</span>
            </p>
          </div>
        </div>

        {/* Pathway Timeline */}
        <div className="relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[39px] sm:left-[3.5rem] top-[40px] bottom-[40px] w-0.5 bg-indigo-100 hidden sm:block"></div>
          
          <div className="flex flex-col gap-16 md:gap-24 relative">
            {pathways.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 md:gap-12 relative"
              >
                {/* Step Indicator */}
                <div className="shrink-0 flex flex-col items-center sm:w-28 z-10">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-indigo-100 flex flex-col items-center justify-center text-indigo-600 shadow-sm relative group cursor-default">
                    <span className="text-xl font-black leading-none mb-1 group-hover:scale-110 transition-transform">{step.id}</span>
                    <div className="scale-75 group-hover:rotate-12 transition-transform">{step.icon}</div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white">
                  
                  {/* Image */}
                  <div className="rounded-2xl overflow-hidden h-64 border border-slate-200 shadow-sm relative group order-2 md:order-1">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  {/* Text Content */}
                  <div className="order-1 md:order-2">
                    <div className="text-indigo-600 uppercase tracking-widest text-sm font-bold mb-2">{step.phase}</div>
                    <h3 className="text-3xl font-black text-[#0F172A] mb-4 uppercase tracking-wide">{step.title}</h3>
                    <p className="text-slate-800 font-bold mb-6 text-lg">{step.subtitle}</p>
                    <ul className="space-y-3">
                      {step.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                          <span className="text-slate-600 font-medium">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 bg-indigo-50 rounded-3xl p-8 border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-indigo-100">
              <Users size={28} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-slate-700 font-medium mb-1">Every semester adds value.</p>
              <p className="text-slate-700 font-medium mb-1">Every step builds you.</p>
              <p className="text-indigo-600 font-bold">Your future is built today.</p>
            </div>
          </div>

          <div className="bg-white px-8 py-5 rounded-xl shadow-sm border border-slate-100 md:ml-auto w-full md:w-auto">
            <p className="text-slate-700 font-medium mb-1 uppercase text-sm tracking-wider">START EARLY.</p>
            <p className="text-slate-700 font-medium mb-1 uppercase text-sm tracking-wider">GROW STEADY.</p>
            <p className="text-indigo-600 font-bold uppercase text-sm tracking-wider">STAY AHEAD.</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default LandingSemesterPathway;
