import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Map as MapIcon, 
  UserPlus, 
  Rocket, 
  BarChart3, 
  FileText,
  Handshake
} from 'lucide-react';

const LandingImplementationFlow = () => {
  const steps = [
    {
      id: '01',
      title: 'UNDERSTAND',
      subtitle: 'We start by understanding.',
      points: [
        'Understand students, faculty and institutional goals',
        'Identify strengths, gaps and aspirations',
        'Listen to real needs on campus'
      ],
      icon: <Users size={24} />,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: '02',
      title: 'MAP',
      subtitle: 'We co-create the right roadmap.',
      points: [
        'Map interventions to academic structure',
        'Align with curriculum and resources',
        'Define measurable outcomes together'
      ],
      icon: <MapIcon size={24} />,
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: '03',
      title: 'ONBOARD',
      subtitle: 'We introduce the ecosystem.',
      points: [
        'Orient students & faculty to Aiiens programs',
        'Share learning paths and opportunities',
        'Build excitement and early engagement'
      ],
      icon: <UserPlus size={24} />,
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: '04',
      title: 'DELIVER',
      subtitle: 'We deliver experiences that matter.',
      points: [
        'Workshops, projects, mentorship and sessions',
        'Hands-on learning and real-world exposure',
        'Continuous support from experts and mentors'
      ],
      icon: <Rocket size={24} />,
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: '05',
      title: 'MEASURE',
      subtitle: 'We measure what truly matters.',
      points: [
        'Track engagement, skills and progress',
        'Use data to refine and improve',
        'Ensure every student benefits'
      ],
      icon: <BarChart3 size={24} />,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: '06',
      title: 'REPORT',
      subtitle: 'We share impact and grow together.',
      points: [
        'Share reports and outcomes transparently',
        'Celebrate success stories',
        'Plan the next cycle for greater impact'
      ],
      icon: <FileText size={24} />,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#F8FAFC]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/implementation_bg.jpg" 
          alt="Abstract journey background" 
          className="w-full h-full object-cover opacity-30"
        />
        {/* Very light gradient overlay to ensure text and steps remain perfectly readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/95 via-[#F8FAFC]/80 to-[#F8FAFC]/95 backdrop-blur-[1px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <div className="text-slate-500 uppercase tracking-widest text-sm font-bold mb-4">IMPLEMENTATION FLOW</div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight tracking-tight mb-2">
              A THOUGHTFUL JOURNEY.
            </h2>
            <h2 className="text-4xl md:text-5xl font-black text-indigo-600 leading-tight tracking-tight">
              MEANINGFUL IMPACT.
            </h2>
          </div>
          <div className="max-w-sm md:text-right border-l-4 md:border-l-0 md:border-r-4 border-indigo-200 pl-4 md:pl-0 md:pr-4">
            <p className="text-slate-600 font-medium">
              We don't begin with a one-size-fits-all approach. We <span className="text-indigo-600 font-bold">listen, design together, deliver with care</span> and <span className="text-indigo-600 font-bold">grow</span> with the institution.
            </p>
          </div>
        </div>

        {/* Timeline Flow */}
        <div className="relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 md:left-[3.5rem] top-[40px] bottom-[40px] w-0.5 bg-indigo-100 hidden sm:block"></div>
          
          <div className="flex flex-col gap-16 md:gap-24 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 md:gap-12 relative"
              >
                {/* Step Indicator */}
                <div className="shrink-0 flex flex-col items-center sm:w-28 z-10">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-indigo-100 flex flex-col items-center justify-center text-indigo-600 shadow-sm">
                    <span className="text-xl font-black leading-none mb-1">{step.id}</span>
                    <div className="scale-75">{step.icon}</div>
                  </div>
                  {/* Small dotted line for mobile */}
                  {index !== steps.length - 1 && (
                    <div className="sm:hidden w-0.5 h-12 bg-indigo-100 my-2"></div>
                  )}
                </div>

                {/* Content Area */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  
                  {/* Image */}
                  <div className="rounded-2xl overflow-hidden h-64 border border-slate-200 shadow-md order-2 md:order-1 relative group">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>

                  {/* Text Content */}
                  <div className="order-1 md:order-2">
                    <h3 className="text-2xl font-black text-[#0F172A] mb-2 uppercase tracking-wide">{step.title}</h3>
                    <p className="text-slate-800 font-bold mb-4">{step.subtitle}</p>
                    <ul className="space-y-3">
                      {step.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                          <span className="text-slate-600 text-sm">{point}</span>
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-indigo-50 rounded-3xl p-8 md:p-10 border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-indigo-100">
              <Handshake size={32} className="text-indigo-400" />
            </div>
            <div>
              <p className="text-slate-700 font-medium mb-1">We walk with the institution.</p>
              <p className="text-slate-700 font-medium mb-1">We grow with the students.</p>
              <p className="text-indigo-600 font-bold">We build what lasts.</p>
            </div>
          </div>

          <div className="bg-white px-8 py-6 rounded-2xl shadow-sm border border-slate-100 max-w-sm w-full md:w-auto">
            <p className="text-slate-700 font-medium mb-1">UNDERSTAND. DELIVER. IMPROVE.</p>
            <p className="text-indigo-600 font-black text-xl">TOGETHER.</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default LandingImplementationFlow;
