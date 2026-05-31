import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, BadgeCheck } from 'lucide-react';

const LandingMentors = () => {
  const mentors = [
    {
      name: "Rahul Sharma",
      role: "Senior SDE-III",
      company: "Microsoft",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
      expertise: ["Distributed Systems", "Azure Cloud"],
      quote: "My goal is to teach you how to think like a staff engineer, not just a junior developer."
    },
    {
      name: "Priya Desai",
      role: "Engineering Manager",
      company: "Amazon",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
      expertise: ["Backend Architecture", "AWS Scalability"],
      quote: "I'll show you exactly what FAANG interviewers look for when they ask system design questions."
    },
    {
      name: "Amit Patel",
      role: "Staff Engineer",
      company: "Google",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop",
      expertise: ["Algorithms", "GenAI Integration"],
      quote: "We don't solve LeetCode for sport. We build scalable systems that handle millions of users."
    }
  ];

  return (
    <section className="py-28 bg-white border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="inline-block text-[10px] font-bold tracking-[2.5px] uppercase text-[#0F7B53] border border-[#0F7B53]/20 bg-[#0F7B53]/5 px-4 py-1.5 rounded-full mb-5">
              Your Mentors
            </span>
            <h2 className="lp-font-outfit text-[#111111] font-extrabold text-4xl md:text-5xl tracking-tight">
              Learn from engineers who built it.
            </h2>
          </div>
          <p className="text-gray-400 font-light text-base max-w-xs border-l border-gray-200 pl-6">
            No teaching assistants. No academic professors. Pure industry experience from the top 1% of tech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mentors.map((mentor, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
              className="group relative flex flex-col"
            >
              {/* Extreme Neon Glow on Hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-[#00FFA3]/60 to-blue-500/60 rounded-[32px] opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700" />
              
              <div className="relative h-full bg-[#0a0a0a] border border-white/10 group-hover:border-[#00FFA3]/50 shadow-2xl rounded-[32px] p-8 transition-all duration-500 flex flex-col transform group-hover:-translate-y-2 z-10 overflow-hidden">
                
                {/* Cyber Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none" 
                  style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
                />

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="relative">
                    {/* Gen Z Grayscale to Color Avatar */}
                    <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-white/10 to-white/5 group-hover:from-[#00FFA3] group-hover:to-blue-500 transition-all duration-500">
                      <div className="w-full h-full rounded-full overflow-hidden bg-[#111]">
                        <img
                          src={mentor.image}
                          alt={mentor.name}
                          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                        />
                      </div>
                    </div>
                    {/* Neon Floating Badge */}
                    <div className="absolute -bottom-2 -right-2 bg-[#00FFA3] rounded-full p-1.5 shadow-[0_0_15px_rgba(0,255,163,0.5)] transform scale-90 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <BadgeCheck size={18} className="text-black" />
                    </div>
                  </div>
                  
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-black hover:bg-[#00FFA3] hover:border-[#00FFA3] hover:shadow-[0_0_20px_rgba(0,255,163,0.4)] transition-all duration-300 backdrop-blur-md"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>

                <div className="mb-6 relative z-10">
                  <h3 className="text-3xl font-black text-white mb-1 tracking-tight group-hover:text-[#00FFA3] transition-colors">{mentor.name}</h3>
                  <p className="text-[16px] font-bold text-gray-300">{mentor.role}</p>
                  <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] mt-2">{mentor.company}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                  {mentor.expertise.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[#00FFA3]/10 border border-[#00FFA3]/20 text-[#00FFA3] text-[10px] font-black uppercase tracking-widest rounded-full shadow-[inset_0_0_10px_rgba(0,255,163,0.05)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-auto relative z-10">
                  <div className="bg-white/5 border border-white/10 border-l-2 border-l-[#00FFA3] rounded-xl p-5 relative transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20 group-hover:border-l-[#00FFA3] group-hover:shadow-[0_0_15px_rgba(0,255,163,0.1)]">
                    <p className="text-gray-300 text-[14px] font-medium leading-relaxed">
                      <span className="text-[#00FFA3] font-serif text-xl mr-1 italic">"</span>
                      {mentor.quote}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingMentors;
