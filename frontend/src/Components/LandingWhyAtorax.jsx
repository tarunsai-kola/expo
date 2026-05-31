import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Crosshair, Code, Briefcase } from 'lucide-react';

const LandingWhyAtorax = () => {
  const bentoItems = [
    {
      title: "Production-Grade Depth",
      icon: <Code size={22} />,
      desc: "Forget basic CRUD apps. You'll architect microservices, build RAG pipelines, and integrate GenAI — exactly how top engineering teams operate.",
      colSpan: "md:col-span-2",
      delay: 0.1,
      glowColor: "from-[#00FFA3]/20 to-emerald-500/10",
      iconColor: "text-[#00FFA3]"
    },
    {
      title: "1:1 FAANG Mentorship",
      icon: <Shield size={22} />,
      desc: "No TAs. Direct guidance from Senior Engineers at Microsoft, Amazon, and Google.",
      colSpan: "md:col-span-1",
      delay: 0.2,
      glowColor: "from-blue-500/20 to-cyan-500/10",
      iconColor: "text-blue-400"
    },
    {
      title: "Guaranteed Referrals",
      icon: <Target size={22} />,
      desc: "Bypass the resume black hole with direct internal referrals to top product companies.",
      colSpan: "md:col-span-1",
      delay: 0.3,
      glowColor: "from-purple-500/20 to-fuchsia-500/10",
      iconColor: "text-purple-400"
    },
    {
      title: "Savage Mock Interviews",
      icon: <Crosshair size={22} />,
      desc: "Company-specific technical grilling that makes the actual FAANG interview loop feel like a warm-up.",
      colSpan: "md:col-span-2",
      delay: 0.4,
      glowColor: "from-orange-500/20 to-red-500/10",
      iconColor: "text-orange-400"
    },
    {
      title: "Line-by-Line Code Reviews",
      icon: <Zap size={22} />,
      desc: "We don't just check if it works. We review for scale, security, and enterprise-grade standards.",
      colSpan: "md:col-span-2",
      delay: 0.5,
      glowColor: "from-yellow-500/20 to-amber-500/10",
      iconColor: "text-yellow-400"
    },
    {
      title: "Measurable ROI",
      icon: <Briefcase size={22} />,
      desc: "Average salary hike of 150–300%. Our graduates don't just get jobs — they secure careers.",
      colSpan: "md:col-span-1",
      delay: 0.6,
      glowColor: "from-pink-500/20 to-rose-500/10",
      iconColor: "text-pink-400"
    }
  ];

  return (
    <section className="relative overflow-hidden py-28 bg-[#020202] border-t border-white/5">
      
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#00FFA3]/10 via-blue-500/5 to-transparent rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center relative mb-6">
            <div className="absolute inset-0 bg-[#00FFA3]/20 blur-lg rounded-full animate-pulse" />
            <span className="relative inline-flex items-center gap-2 text-[11px] font-black tracking-[0.2em] uppercase text-[#00FFA3] border border-[#00FFA3]/30 bg-[#0a0a0a] px-6 py-2 rounded-full shadow-[0_0_20px_rgba(0,255,163,0.15)]">
              The Atorax Advantage
            </span>
          </div>
          <h2 className="lp-font-outfit text-white font-extrabold text-4xl md:text-5xl mb-6 tracking-tight drop-shadow-sm">
            Not just another bootcamp.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">An elite career accelerator.</span>
          </h2>
          <p className="text-gray-400 text-[17px] md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            We don't teach you how to code. We teach you how to engineer systems at scale — transforming you into the top 1% of talent that tech giants compete to hire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bentoItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay, duration: 0.5 }}
              className={`${item.colSpan} group relative bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.03] hover:border-white/20 hover:shadow-2xl transition-all duration-700 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)]`}
            >
              {/* Noise Texture */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

              {/* Hover Inner Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
              
              {/* Physical Glass Edge Light */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className={`relative z-10 w-14 h-14 rounded-2xl bg-[#050505] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] border border-white/10 flex items-center justify-center mb-6 text-gray-500 group-hover:border-white/20 group-hover:${item.iconColor} transition-all duration-700`}>
                {item.icon}
                {/* Icon Inner Glow */}
                <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 bg-current pointer-events-none" />
              </div>
              <h3 className={`relative z-10 text-xl font-extrabold text-white mb-3 tracking-tight group-hover:${item.iconColor} transition-colors duration-700`}>
                {item.title}
              </h3>
              <p className="relative z-10 text-gray-400 font-medium leading-relaxed text-[15px] group-hover:text-gray-300 transition-colors duration-500">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingWhyAtorax;
