import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Terminal, Database, Code2, Cpu } from 'lucide-react';

const LandingCurriculum = () => {
  const [activePhase, setActivePhase] = useState(0);

  const curriculum = [
    {
      title: "Foundation & System Design",
      duration: "Weeks 1–4",
      icon: <Cpu size={18} />,
      outcomes: [
        "Master Data Structures and Algorithms (DSA) for scale.",
        "Learn High-Level System Design (HLSD) to architect entire platforms.",
        "Dive into Low-Level Design (LLD) for clean, maintainable code.",
        "Implement Enterprise Design Patterns and Microservices."
      ],
      tools: ["Java", "C++", "Python", "UML"],
      capstone: null
    },
    {
      title: "Backend Engineering at Scale",
      duration: "Weeks 5–10",
      icon: <Terminal size={18} />,
      outcomes: [
        "Build high-throughput distributed backends.",
        "Implement async messaging pipelines for scalable data flow.",
        "Handle thousands of concurrent requests smoothly.",
        "Secure APIs and backend endpoints for enterprise use."
      ],
      tools: ["Node.js", "Spring Boot", "Go", "Redis", "Kafka"],
      capstone: null
    },
    {
      title: "Database & Cloud Infrastructure",
      duration: "Weeks 11–16",
      icon: <Database size={18} />,
      outcomes: [
        "Configure Infrastructure as Code (IaC) for automated deployments.",
        "Manage container clusters and orchestration systems.",
        "Optimize databases for massive read/write scale.",
        "Design robust, scalable cloud infrastructure workflows."
      ],
      tools: ["PostgreSQL", "MongoDB", "AWS", "Docker", "Kubernetes"],
      capstone: {
        name: "Distributed Ticket Booking System",
        desc: "Build a BookMyShow clone handling 100k concurrent bookings with distributed locking and Redis caching."
      }
    },
    {
      title: "Capstone & GenAI Integration",
      duration: "Weeks 17–24",
      icon: <Code2 size={18} />,
      outcomes: [
        "Integrate state-of-the-art Generative AI models.",
        "Build Semantic Retrieval-Augmented Generation (RAG) pipelines.",
        "Deploy intelligent agents securely in production environments.",
        "Present a fully-functional enterprise-grade final project."
      ],
      tools: ["LangChain", "OpenAI API", "Pinecone", "PyTorch"],
      capstone: {
        name: "LLM-Powered Enterprise RAG Agent",
        desc: "Develop an AI agent that indexes internal company documentation and answers complex queries with full source citations."
      }
    }
  ];

  return (
    <section className="py-28 bg-[#FAFAFA] border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[10px] font-bold tracking-[2.5px] uppercase text-[#0F7B53] border border-[#0F7B53]/20 bg-[#0F7B53]/5 px-4 py-1.5 rounded-full mb-5">
            Curriculum Breakdown
          </span>
          <h2 className="lp-font-outfit text-[#111111] font-extrabold text-4xl md:text-5xl mb-4 tracking-tight">
            Learn what top tech companies actually use.
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed font-light">
            A battle-tested 24-week engineering path designed by ex-FAANG engineers to make you technically undeniable.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar — scrollable horizontally on mobile, vertical on desktop */}
          <div className="w-full lg:w-[30%] flex flex-row lg:flex-col gap-3 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {curriculum.map((phase, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhase(idx)}
                className={`shrink-0 lg:w-full text-left px-5 py-4 lg:py-5 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                  activePhase === idx
                    ? "bg-[#1A8352] border-[#1A8352] shadow-[0_0_20px_rgba(26,131,82,0.3)]"
                    : "bg-[#1A1A1A] border-white/10 hover:border-white/20 hover:bg-[#222]"
                }`}
              >
                <div>
                  <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${activePhase === idx ? "text-white/80" : "text-gray-400"}`}>
                    {phase.duration}
                  </div>
                  <div className={`font-bold text-[15px] tracking-wide ${activePhase === idx ? "text-white" : "text-gray-200"}`}>
                    {phase.title.toUpperCase()}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right Panel */}
          <div className="w-full lg:w-[70%] bg-[#1A1A1A] border border-white/10 rounded-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="h-16 border-b border-white/10 flex items-center px-8 justify-between bg-[#1A1A1A]">
              <div className="flex items-center gap-2">
                <span className="text-white/90 font-bold text-lg tracking-wide uppercase">Phase {activePhase + 1} <span className="text-[#1A8352] ml-1">({curriculum[activePhase].duration})</span></span>
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col"
                >
                  {/* Table Layout — stacks on mobile, side-by-side on desktop */}
                  <div className="rounded-xl border border-white/10 overflow-hidden mb-8">
                    {/* Domain header + content */}
                    <div className="flex flex-col md:flex-row">
                      {/* Left: Domain */}
                      <div className="md:w-[35%] flex flex-col">
                        <div className="p-4 bg-[#1A8352] text-[10px] font-bold tracking-widest text-white uppercase border-b border-white/10">
                          Domain
                        </div>
                        <div className="p-5 bg-[#1A1A1A] flex items-start md:items-center flex-1 border-b md:border-b-0 md:border-r border-white/10">
                          <span className="text-gray-200 font-semibold text-sm leading-snug">{curriculum[activePhase].title}</span>
                        </div>
                      </div>
                      {/* Right: Key Outcomes */}
                      <div className="flex flex-col flex-1">
                        <div className="p-4 bg-[#111111] text-[10px] font-bold tracking-widest text-white/50 uppercase border-b border-white/10">
                          Key Outcomes
                        </div>
                        <div className="p-5 bg-[#111111] flex flex-col gap-3">
                          {curriculum[activePhase].outcomes.map((outcome, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#1A8352] mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(26,131,82,0.8)]" />
                              <p className="text-gray-300 text-[13px] font-medium leading-relaxed">{outcome}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {curriculum[activePhase].capstone && (
                    <div className="mb-6 p-5 border border-[#1A8352]/20 bg-[#1A8352]/10 rounded-xl">
                      <div className="text-[10px] font-bold text-[#209F70] uppercase tracking-wider mb-2">
                        Capstone Project
                      </div>
                      <div className="font-bold text-white text-[15px] mb-1">{curriculum[activePhase].capstone.name}</div>
                      <p className="text-gray-400 text-sm font-light">{curriculum[activePhase].capstone.desc}</p>
                    </div>
                  )}

                  <div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                      Production Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence mode="popLayout">
                        {curriculum[activePhase].tools.map((tool, i) => (
                          <motion.span
                            key={`${activePhase}-${tool}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: i * 0.04 }}
                            className="px-3 py-1.5 bg-[#1A1A1A] border border-white/10 text-gray-300 rounded-full text-[11px] font-bold tracking-wide"
                          >
                            {tool}
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingCurriculum;
