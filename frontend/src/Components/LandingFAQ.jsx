import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const LandingFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Is this program suitable for working professionals?",
      answer: "Yes. The program is designed for working professionals who can commit 12–15 hours per week. Live sessions are held on weekends, with weekday sessions available for Q&A and code reviews. All recordings are provided within 24 hours."
    },
    {
      question: "Do you guarantee job placement?",
      answer: "We guarantee interview calls at top product companies for graduates who complete all assignments, capstone projects, and mock interviews. We set clear expectations: we do not sit in the interview for you, but we make sure you are overprepared when you get there."
    },
    {
      question: "Is this beginner-friendly?",
      answer: "This is not a 'learn to code from scratch' program. You should have at least a working knowledge of one programming language and basic data structures. We take you from a junior or mid-level developer to a production-ready engineer."
    },
    {
      question: "What is the exact time commitment per week?",
      answer: "Plan for 12–15 hours per week: 4–6 hours of live classes, 4–6 hours of project work, and 2–3 hours of code review and doubt-clearing sessions. This is a serious professional program, not a casual side hobby."
    },
    {
      question: "What EMI options are available?",
      answer: "We offer zero-cost EMI through multiple banking partners, starting at approximately ₹5,999 per month over 12 months. Scholarship reductions of up to 30% are available based on your profile and need-based criteria. Speak to our admissions team for exact terms."
    },
    {
      question: "What is the refund policy?",
      answer: "We offer a 14-day, no-questions-asked refund. Attend the first two weeks of live classes, and if you feel the quality does not match our commitment, we will refund 100% of your fee — immediately."
    }
  ];

  return (
    <section className="py-28 bg-[#FAFAFA] border-t border-gray-100">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="lp-font-outfit text-[#111111] font-extrabold text-4xl md:text-5xl mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed font-light">
            Everything you need to know before making the most important career investment of your life.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                openIndex === idx ? "border-gray-300 shadow-sm" : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
              >
                <span className={`font-semibold text-[15px] pr-4 transition-colors ${openIndex === idx ? "text-[#111111]" : "text-gray-700"}`}>
                  {faq.question}
                </span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  openIndex === idx ? "bg-[#111111] text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  {openIndex === idx ? <Minus size={13} /> : <Plus size={13} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-6 pb-6 text-gray-500 text-sm md:text-[15px] leading-relaxed font-light border-t border-gray-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFAQ;
