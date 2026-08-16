import React from 'react';
import { motion } from 'framer-motion';
import { 
  Landmark, 
  Users, 
  GraduationCap, 
  Star, 
  UserCircle,
  Handshake
} from 'lucide-react';

const LandingCollegePartnership = () => {
  const pillars = [
    {
      title: 'COLLEGE',
      desc: 'Provides academic foundation, infrastructure and learning environment.',
      icon: <Landmark size={32} className="text-indigo-600 mb-4" />
    },
    {
      title: 'DEPARTMENT',
      desc: 'Identifies student needs, integrates activities and supports implementation.',
      icon: <Users size={32} className="text-indigo-600 mb-4" />
    },
    {
      title: 'AIIENS CAMPUS',
      desc: 'Brings industry-relevant programmes, mentors and career-readiness support.',
      icon: <GraduationCap size={32} className="text-indigo-600 mb-4" />
    },
    {
      title: 'MENTORS',
      desc: 'Guide, review and inspire students with real-world experience.',
      icon: <Star size={32} className="text-indigo-600 mb-4" />
    },
    {
      title: 'STUDENTS',
      desc: 'Engage, build skills and grow with confidence.',
      icon: <UserCircle size={32} className="text-indigo-600 mb-4" />
    }
  ];

  const workTogether = [
    {
      title: 'WORKSHOPS & EXPERT SESSIONS',
      desc: 'Industry insights delivered on campus.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'PROJECT & LAB INTEGRATION',
      desc: 'Practical learning aligned with academic curriculum.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'MENTORING & GUIDANCE',
      desc: 'Personalised support for every student.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'CAREER READINESS ACTIVITIES',
      desc: 'Aptitude, communication, interviews and more.',
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'FEEDBACK & CONTINUOUS IMPROVEMENT',
      desc: 'Measure, reflect and evolve together.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <div className="text-slate-500 uppercase tracking-widest text-sm font-bold mb-4">COLLEGE PARTNERSHIP MODEL</div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight tracking-tight mb-2">
              AIIENS WORKS 
            </h2>
            <h2 className="text-4xl md:text-5xl font-black text-indigo-600 leading-tight tracking-tight">
              WITH THE COLLEGE,
            </h2>
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight tracking-tight">
              NOT AGAINST IT.
            </h2>
          </div>
          <div className="max-w-sm md:text-right border-l-4 md:border-l-0 md:border-r-4 border-indigo-200 pl-4 md:pl-0 md:pr-4">
            <p className="text-slate-600 font-medium">
              We are not here to replace what colleges do best. We are here to <span className="text-indigo-600 font-bold">strengthen the practical layer</span> that prepares students for real-world success.
            </p>
          </div>
        </div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full h-80 md:h-[400px] rounded-3xl overflow-hidden mb-16 shadow-xl relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600" 
            alt="Students and mentor working together" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-indigo-900/10"></div>
        </motion.div>

        {/* 5 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          {pillars.map((pillar, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center px-4"
            >
              {pillar.icon}
              <h4 className="font-bold text-slate-900 mb-3 tracking-wide">{pillar.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Middle Banner */}
        <div className="bg-indigo-50/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-16 mb-24 border border-indigo-100">
          <div className="flex items-center gap-4">
            <Handshake className="text-indigo-400 shrink-0" size={28} />
            <p className="text-slate-700 font-medium text-lg">Different roles. One shared goal — <span className="text-indigo-600 font-bold">student success.</span></p>
          </div>
          <div className="hidden md:block w-px h-12 bg-indigo-200"></div>
          <div>
            <p className="text-slate-700 font-medium text-lg">A stronger ecosystem. <span className="text-indigo-600 font-bold">Better outcomes.</span></p>
          </div>
        </div>

        {/* How We Work Together Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xl font-bold text-[#0F172A] tracking-wider uppercase">HOW WE WORK TOGETHER</h3>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {workTogether.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="rounded-xl overflow-hidden h-40 mb-4 shadow-sm border border-slate-100 relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-2 uppercase leading-snug">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-indigo-50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-indigo-100 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-indigo-100">
              <GraduationCap size={24} className="text-indigo-400" />
            </div>
            <p className="text-slate-700 font-medium">
              When institutions and industry-readiness partners work together, students <span className="text-indigo-600 font-bold">gain more</span> from their college years.
            </p>
          </div>

          <div className="border-l-0 md:border-l-2 border-indigo-200 pt-4 md:pt-0 pl-0 md:pl-8 text-center md:text-left min-w-[250px]">
            <p className="text-slate-700 font-medium uppercase text-sm tracking-widest mb-1">STRONGER TOGETHER.</p>
            <p className="text-indigo-600 font-bold uppercase text-sm tracking-widest">BETTER FOR STUDENTS.</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default LandingCollegePartnership;
