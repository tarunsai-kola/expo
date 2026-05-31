import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

const LandingWhoIsThisFor = () => {
  const goodFit = [
    "Software Engineers at 5–8 LPA ready to break into product companies at 15–30+ LPA.",
    "Frontend developers transitioning into full-stack or backend architecture roles.",
    "Individuals prepared to commit 12–15 focused hours per week for 6 months.",
    "Developers who understand the basics but consistently fail system design interviews."
  ];

  const badFit = [
    "Absolute beginners with zero programming experience.",
    "People looking for a passive, pre-recorded video course to watch casually.",
    "Those unwilling to receive harsh, line-by-line feedback on their code.",
    "Candidates seeking a 'guaranteed job' without putting in the deep work."
  ];

  return (
    <section className="py-28 bg-[#FAFAFA] border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[10px] font-bold tracking-[2.5px] uppercase text-[#111111] border border-gray-300 bg-white px-4 py-1.5 rounded-full mb-5">
            Selective Admission
          </span>
          <h2 className="lp-font-outfit text-[#111111] font-extrabold text-4xl md:text-5xl mb-4 tracking-tight">
            Who we accept — and who we don't.
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            We intentionally keep cohorts at 40 seats and standards high. This is an intense career accelerator, not a casual online course.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* For */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border border-gray-100 rounded-2xl p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
            style={{ background: 'linear-gradient(171.63deg, #ffffff 2%, #e9f0d3 100%)' }}
          >
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#aeb544]/10 border border-[#aeb544]/20 flex items-center justify-center">
                <CheckCircle2 size={20} className="text-[#969d35]" />
              </div>
              <h3 className="text-xl font-bold text-[#111111]">This IS for you if…</h3>
            </div>
            <div className="space-y-5">
              {goodFit.map((item, idx) => (
                <div key={idx} className="flex gap-3.5">
                  <CheckCircle2 size={17} className="text-[#969d35] mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600 font-light leading-relaxed text-[15px]">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Not for */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border border-gray-100 rounded-2xl p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
            style={{ background: 'linear-gradient(171.63deg, #ffffff 2%, #fae3e3 100%)' }}
          >
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                <XCircle size={20} className="text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-[#111111]">This is NOT for you if…</h3>
            </div>
            <div className="space-y-5">
              {badFit.map((item, idx) => (
                <div key={idx} className="flex gap-3.5">
                  <XCircle size={17} className="text-gray-300 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-500 font-light leading-relaxed text-[15px]">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingWhoIsThisFor;
