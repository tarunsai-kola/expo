import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  PackageOpen, 
  UserCircle2, 
  BarChart, 
  Send, 
  Briefcase, 
  Star,
  Settings,
  PenTool,
  Users,
  CheckCircle,
  FileText,
  Map,
  Target,
  FolderOpen,
  Award,
  Shield,
  DoorOpen,
  BookOpen,
  Wrench,
  Globe,
  TrendingUp,
  Quote
} from 'lucide-react';

const LandingCareerSupport = () => {
  const journeySteps = [
    {
      title: 'SKILLS',
      desc: ['Learn with purpose', 'Strengthen fundamentals', 'Build technical depth'],
      icon: <Lightbulb size={20} className="text-indigo-600" />,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=300'
    },
    {
      title: 'PROJECTS',
      desc: ['Build real-world projects', 'Solve meaningful problems', 'Create measurable impact'],
      icon: <PackageOpen size={20} className="text-indigo-600" />,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=300'
    },
    {
      title: 'PROFILE',
      desc: ['Showcase your learning', 'Build a strong portfolio', 'Highlight your achievements'],
      icon: <UserCircle2 size={20} className="text-indigo-600" />,
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=300'
    },
    {
      title: 'PREPARATION',
      desc: ['Aptitude & technical preparedness', 'Communication practice', 'Interview readiness'],
      icon: <BarChart size={20} className="text-indigo-600" />,
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=300'
    },
    {
      title: 'APPLICATION',
      desc: ['Target the right roles', 'Craft tailored applications', 'Stay consistent'],
      icon: <Send size={20} className="text-indigo-600" />,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=300'
    },
    {
      title: 'INTERNSHIP',
      desc: ['Gain real-world experience', 'Learn from mentors', 'Deliver and grow'],
      icon: <Briefcase size={20} className="text-indigo-600" />,
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=300'
    },
    {
      title: 'CAREER',
      desc: ['Build your path', 'Expand your impact', 'Keep growing'],
      icon: <Star size={20} className="text-indigo-600" />,
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=300'
    }
  ];

  const supportItems = [
    { title: 'Curated Internship Opportunities', desc: 'Access relevant and quality internship openings.', icon: <Settings size={28} /> },
    { title: 'Application Guidance', desc: 'Improve resumes, cover letters and application quality.', icon: <PenTool size={28} /> },
    { title: 'Mock Interviews & Practice', desc: 'Build confidence with realistic interview preparation.', icon: <Users size={28} /> },
    { title: 'Mentor Connect', desc: 'Get advice from industry professionals who guide you.', icon: <CheckCircle size={28} /> },
    { title: 'Portfolio Review', desc: 'Make your work stand out with strong presentation.', icon: <FileText size={28} /> },
    { title: 'Career Roadmap', desc: 'Plan your path and take the right steps forward.', icon: <Map size={28} /> }
  ];

  const advantageItems = [
    { title: 'Deep Skills', desc: 'Strong technical skills built through practice.', icon: <Lightbulb size={24} /> },
    { title: 'Real Projects', desc: 'Hands-on projects that solve real problems.', icon: <FolderOpen size={24} /> },
    { title: 'Proof of Work', desc: 'Documented work that builds trust and credibility.', icon: <Award size={24} /> },
    { title: 'Confidence', desc: 'Prepared mindset that shows in every interaction.', icon: <Shield size={24} /> },
    { title: 'Open Doors', desc: 'The right opportunities at the right time.', icon: <DoorOpen size={24} /> }
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Phase Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="bg-indigo-600 text-white px-3 py-1 rounded text-sm font-bold tracking-wider">PHASE 4</span>
          <span className="text-indigo-600 font-bold tracking-wider">INTERNSHIPS & CAREER SUPPORT</span>
        </div>

        {/* Hero Area */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 mb-20">
          <div>
            <h2 className="text-5xl md:text-6xl font-black text-[#0F172A] leading-tight tracking-tight mb-4 uppercase">
              BE PREPARED <br />
              <span className="text-indigo-600">BEFORE OPPORTUNITY</span> <br />
              ARRIVES.
            </h2>
            <p className="text-xl text-slate-600 font-medium mb-12 max-w-lg leading-relaxed">
              We help you build the skills, experience and confidence to step into real-world opportunities with clarity.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -top-12 -right-12 text-slate-300 font-black text-4xl uppercase leading-none opacity-20 text-right">
              OPPORTUNITIES <br/> DON'T HAPPEN. <br/> PREPARATION <br/> DOES.
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white relative z-10 h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
                alt="Student working on laptop" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Quote Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -left-8 md:bottom-8 md:-left-16 bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 max-w-[300px] z-20"
            >
              <Quote className="text-indigo-400 mb-2 rotate-180" size={32} />
              <p className="text-slate-800 font-bold text-lg leading-snug">
                You don't get ready when opportunity comes. You get ready so that opportunity finds you.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Your Journey Section */}
        <div className="mb-20">
          <div className="text-center mb-10 border-b border-slate-200 pb-4">
            <h3 className="text-indigo-600 font-black text-xl tracking-widest uppercase">YOUR JOURNEY TO REAL OPPORTUNITIES</h3>
          </div>
          
          <div className="flex overflow-x-auto pb-8 gap-4 snap-x hide-scrollbar">
            {journeySteps.map((step, index) => (
              <div key={index} className="min-w-[220px] max-w-[220px] flex-shrink-0 snap-start border border-slate-200 bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="p-3 border-b border-slate-100 flex items-center gap-2 justify-center bg-slate-50">
                  {step.icon}
                  <span className="font-bold text-slate-800 text-sm tracking-wide">{step.title}</span>
                </div>
                <div className="h-32 w-full overflow-hidden relative">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-indigo-900/10"></div>
                </div>
                <div className="p-4 bg-white">
                  <ul className="space-y-2">
                    {step.desc.map((item, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How Aiiens Campus Supports You */}
        <div className="mb-20 bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
          <div className="text-center mb-10 border-b border-slate-200 pb-4">
            <h3 className="text-indigo-600 font-black text-xl tracking-widest uppercase">HOW AIIENS CAMPUS SUPPORTS YOU</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 text-center">
            {supportItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 border border-indigo-100 shadow-sm">
                  {item.icon}
                </div>
                <h4 className="font-bold text-slate-800 mb-2 text-sm leading-snug">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Best Preparation is Your Advantage */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 mb-20 bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
          <div className="h-full min-h-[300px] relative">
            <img 
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800" 
              alt="Student focused" 
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-indigo-900/10"></div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="mb-8 border-b border-slate-200 pb-4 text-center lg:text-left">
              <h3 className="text-indigo-600 font-black text-xl tracking-widest uppercase">YOUR BEST PREPARATION IS YOUR ADVANTAGE</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {advantageItems.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="mb-3 text-indigo-500">{item.icon}</div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation Banner */}
        <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100 flex flex-col sm:flex-row justify-between divide-y sm:divide-y-0 sm:divide-x divide-indigo-200 shadow-sm">
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <BookOpen size={24} className="text-indigo-600 mb-2" />
            <span className="font-bold text-slate-800 uppercase tracking-wider text-sm mb-1">LEARN</span>
            <span className="text-xs text-slate-500">Build strong skills.</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <Wrench size={24} className="text-indigo-600 mb-2" />
            <span className="font-bold text-slate-800 uppercase tracking-wider text-sm mb-1">BUILD</span>
            <span className="text-xs text-slate-500">Create real impact.</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <Globe size={24} className="text-indigo-600 mb-2" />
            <span className="font-bold text-slate-800 uppercase tracking-wider text-sm mb-1">CONNECT</span>
            <span className="text-xs text-slate-500">Engage with industry.</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <TrendingUp size={24} className="text-indigo-600 mb-2" />
            <span className="font-bold text-slate-800 uppercase tracking-wider text-sm mb-1">GROW</span>
            <span className="text-xs text-slate-500">Move toward your future.</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LandingCareerSupport;
