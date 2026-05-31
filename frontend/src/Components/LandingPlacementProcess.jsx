import React from 'react';
import { motion } from 'framer-motion';
import { FileCode, Activity, Network, Rocket } from 'lucide-react';

const LandingPlacementProcess = () => {
  const steps = [
    {
      icon: <FileCode size={22} />,
      title: "ATS Profile Overhaul",
      description: "We reconstruct your Resume, GitHub, and LinkedIn to pass Applicant Tracking Systems and catch recruiter attention in under 6 seconds."
    },
    {
      icon: <Activity size={22} />,
      title: "Technical Grilling",
      description: "Rigorous 1:1 mock interviews covering extreme scale system design, advanced DSA, and behavioral questions specific to target companies."
    },
    {
      icon: <Network size={22} />,
      title: "Internal Referrals",
      description: "Bypass the application queue entirely. We leverage our alumni and mentor network to place you in front of hiring managers directly."
    },
    {
      icon: <Rocket size={22} />,
      title: "Offer Negotiation",
      description: "Once you crack the interview, our experts guide you through salary negotiation to ensure you secure top-of-market compensation."
    }
  ];

  return (
    <section className="py-28 bg-[#FAFAFA] border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-24">
          <span className="inline-block text-[10px] font-black tracking-[2.5px] uppercase text-[#00FFA3] border border-[#00FFA3]/30 bg-[#00FFA3]/10 px-4 py-1.5 rounded-full mb-5 shadow-[0_0_15px_rgba(0,255,163,0.15)]">
            Placement Support
          </span>
          <h2 className="lp-font-outfit text-[#111111] font-extrabold text-4xl md:text-5xl mb-4 tracking-tight">
            How we get you hired.
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Getting hired isn't just about writing good code. It's about positioning. We've reverse-engineered every step of the hiring pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 mb-24">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group flex flex-col items-center text-center relative"
            >
              <div className="relative mb-6">
                {/* Glowing Neon Aura */}
                <div className="absolute inset-0 bg-[#00FFA3]/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-[72px] h-[72px] rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-[#00FFA3] relative z-10 group-hover:border-[#00FFA3]/50 group-hover:shadow-[0_0_25px_rgba(0,255,163,0.3)] transition-all duration-300 transform group-hover:-translate-y-1">
                  {step.icon}
                </div>
                
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-[#00FFA3] text-black text-xs font-black flex items-center justify-center shadow-[0_0_10px_rgba(0,255,163,0.6)] z-20 transform group-hover:rotate-12 transition-all duration-300">
                  {idx + 1}
                </div>
              </div>
              <h3 className="font-black text-[#111111] text-[17px] mb-3 tracking-tight transition-colors">{step.title}</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Boundary Setting & Proof Box - Hacker Aesthetic */}
        <div className="relative group max-w-[1100px] mx-auto">
          {/* Cyber glow behind the whole box */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00FFA3]/40 via-blue-500/40 to-[#00FFA3]/40 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700" />
          
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[32px] p-8 md:p-14 shadow-2xl relative z-10 overflow-hidden">
            {/* Cyber Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
              style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
              <div>
                <h4 className="text-3xl font-black text-white mb-10 tracking-tight">What we commit to</h4>
                <ul className="space-y-6">
                  <li className="flex gap-4 text-gray-300 text-[15px] font-medium leading-relaxed">
                    <span className="text-[#FF0055] font-black text-xl mt-0.5 flex-shrink-0 drop-shadow-[0_0_12px_rgba(255,0,85,0.8)]">✕</span>
                    <span>We do <strong className="text-white">not</strong> sit in the interview for you. You must put in the 12–15 hrs/week.</span>
                  </li>
                  <li className="flex gap-4 text-gray-300 text-[15px] font-medium leading-relaxed">
                    <span className="text-[#FF0055] font-black text-xl mt-0.5 flex-shrink-0 drop-shadow-[0_0_12px_rgba(255,0,85,0.8)]">✕</span>
                    <span>We do <strong className="text-white">not</strong> guarantee jobs to students who skip capstone projects.</span>
                  </li>
                  <li className="flex gap-4 text-gray-300 text-[15px] font-medium leading-relaxed">
                    <span className="text-[#00FFA3] font-black text-xl mt-0.5 flex-shrink-0 drop-shadow-[0_0_12px_rgba(0,255,163,0.8)]">✓</span>
                    <span>We <strong className="text-white">do</strong> guarantee interview calls at top product companies for eligible graduates.</span>
                  </li>
                  <li className="flex gap-4 text-gray-300 text-[15px] font-medium leading-relaxed">
                    <span className="text-[#00FFA3] font-black text-xl mt-0.5 flex-shrink-0 drop-shadow-[0_0_12px_rgba(0,255,163,0.8)]">✓</span>
                    <span>We <strong className="text-white">do</strong> provide unlimited mock interviews until you feel confident.</span>
                  </li>
                </ul>
              </div>

              <div className="border-t md:border-t-0 md:border-l border-white/10 pt-10 md:pt-0 md:pl-16 flex flex-col justify-center">
                <h4 className="text-3xl font-black text-white mb-10 tracking-tight">Audited Placement Stats</h4>
                <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                  <div>
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-3">82%</div>
                    <div className="text-[10px] font-black text-[#00FFA3] uppercase tracking-widest">Placed within 90 days</div>
                  </div>
                  <div>
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00FFA3] to-emerald-300 mb-3">24L</div>
                    <div className="text-[10px] font-black text-[#00FFA3] uppercase tracking-widest">Median salary (2–5 yrs exp.)</div>
                  </div>
                  <div>
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-3">350%</div>
                    <div className="text-[10px] font-black text-[#00FFA3] uppercase tracking-widest">Average salary hike</div>
                  </div>
                  <div>
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00FFA3] to-emerald-300 mb-3">500+</div>
                    <div className="text-[10px] font-black text-[#00FFA3] uppercase tracking-widest">Hiring partners</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPlacementProcess;
