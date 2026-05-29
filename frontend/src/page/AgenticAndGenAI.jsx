import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown, CheckCircle2, TerminalSquare, Network, BrainCircuit,
  ShieldCheck, Workflow, Layers, ArrowRight,
  Briefcase, TrendingUp, Landmark
} from "lucide-react";
import AdvancedApplyPopup from "../Components/AdvancedApplyPopup";
import PremiumCurriculum from "../Components/PremiumCurriculum";
import ProgramStatsBar from "../Components/ProgramStatsBar";
import TopOnePercent from "../Components/TopOnePercent";
import Certification from "./AdvanceCourse/Components/Certification";
import ApplyNowButton from "./AdvanceCourse/Components/ApplyNowButton";
import SalaryGrowth from "../Components/SalaryGrowth";
import MarketLeaders from "../Components/MarketLeaders";
import MeetYourMentors from "../Components/MeetYourMentors";
import FloatingNav from "../Components/FloatingNav";
import "./AgenticAndGenAI.css"; // Static CSS to prevent blinking

import heroAiGraphic from "../assets/hero_ai_graphic.png";
import heroAiGraphic2 from "../assets/hero_ai_graphic_2.png";
import heroAiGraphic3 from "../assets/hero_ai_graphic_3.png";

const heroImages = [heroAiGraphic, heroAiGraphic2, heroAiGraphic3];

import careerPath0 from "../assets/career_path_0_2.png";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";

/* ─── Static Data ─── */
const trustStats = [
  { value: "16 Weeks", label: "Duration" },
  { value: "100% Online", label: "Format" },
  { value: "90+ Hours", label: "Hands-on Practice" },
  { value: "5 Capstones", label: "Real Projects" },
  { value: "15+", label: "Interview Opportunities" },
];

const careerPaths = [
  {
    exp: "0–2 Years",
    title: "Software Engineers & Tech Analysts",
    desc: "Build the data and AI skills that take you from writing code to driving technical decisions.",
    benefits: [
      "End-to-end workflows across SQL, Python, dashboards, and AI",
      "GenAI fluency — from prompt engineering to RAG and fine-tuning",
      "Full-stack AI: from raw data to deployed models in production",
    ],
    quote: "Writing code isn't enough — I want to build with AI. I just need someone to show me the real-world applications.",
    image: careerPath0,
  },
  {
    exp: "2–6 Years",
    title: "Mid-Level Engineers & Tech Professionals",
    desc: "Move from solid contributor to technical decision-maker with deep AI architecture skills.",
    benefits: [
      "Architect hybrid RAG and multi-source decision intelligence systems",
      "Design autonomous, memory-driven multi-agent workflows",
      "Master AI infrastructure — inference serving, model routing, reliability",
    ],
    quote: "I need to transition from using APIs to designing scalable AI infrastructure and leading technical decisions.",
    image: careerPath1,
  },
  {
    exp: "6–10+ Years",
    title: "Tech Leaders & Engineering Managers",
    desc: "Lead AI transformation — design enterprise-scale architecture and manage high-performing AI teams.",
    benefits: [
      "Enterprise AI strategy and governance",
      "Scaling LLMs and autonomous agents in production",
      "Leading AI engineering teams and managing AI ROI",
    ],
    quote: "My focus is on strategy, scalability, and ROI. I need to architect AI platforms that drive business value.",
    image: careerPath2,
  },
];

const agenticPhases = [
  {
    id: "phase-0",
    phase: "PHASE 0",
    duration: "PRE-RECORDED",
    title: "Software Engineering & Backend Foundations",
    focusLabel: "FOCUS",
    focus: [
      "Python proficiency and programming fundamentals",
      "API design and backend basics",
      "Git workflows and collaboration"
    ],
    application: "Async content to bring you up to speed before live sessions begin."
  },
  {
    id: "phase-1",
    phase: "PHASE 1",
    duration: "WEEKS 1–3",
    title: "AI Product Builder",
    focusLabel: "CURRICULUM",
    focus: [
      "LLM engineering foundations",
      "Prompt architecture and evaluation pipelines",
      "Enterprise knowledge copilots using RAG"
    ],
    application: "Enterprise document copilots, AI QA systems, multi-model routing consoles"
  },
  {
    id: "phase-2",
    phase: "PHASE 2",
    duration: "WEEKS 4–6",
    title: "Enterprise Intelligence Architect",
    focusLabel: "CURRICULUM",
    focus: [
      "Hybrid retrieval and GraphRAG architectures",
      "Multi-source knowledge orchestration",
      "Decision intelligence systems"
    ],
    application: "Executive intelligence dashboards, research copilots, relationship intelligence engines"
  },
  {
    id: "phase-3",
    phase: "PHASE 3",
    duration: "WEEKS 7–10",
    title: "Autonomous Workflow Architect",
    focusLabel: "CURRICULUM",
    focus: [
      "Agentic AI system design",
      "Multi-agent collaboration and orchestration",
      "Memory-driven AI workflows",
      "Human-in-the-loop automation"
    ],
    application: "Sales automation AI, support automation agents, recruiting automation workflows"
  },
  {
    id: "phase-4",
    phase: "PHASE 4",
    duration: "WEEKS 11–14",
    title: "AI Infrastructure Manager",
    focusLabel: "CURRICULUM",
    focus: [
      "AI backend services and inference serving",
      "Observability, monitoring, and reliability",
      "AI cost engineering and model routing"
    ],
    application: "Enterprise AI service infrastructure, AI governance platforms, cost optimisation engines"
  },
  {
    id: "phase-5",
    phase: "PHASE 5",
    duration: "WEEKS 15–16",
    title: "Enterprise AI Platform Strategist",
    focusLabel: "CURRICULUM",
    focus: [
      "AI platform architecture design",
      "Multi-tenant AI services and SLA engineering",
      "Full AI operations platform — mega capstone"
    ],
    application: "Enterprise AI automation platforms managing cross-department workflows"
  }
];

const capstoneProjects = [
  { icon: TerminalSquare, title: "Autonomous Code Assistant", desc: "LLM-powered tool that reads repositories, suggests improvements, and generates pull requests.", tools: ["LangChain", "OpenAI", "GitHub API"] },
  { icon: Network, title: "Omnichannel Support Agent", desc: "Multi-modal customer service agent routing requests across text, voice, and vision APIs.", tools: ["CrewAI", "FastAPI", "Azure"] },
  { icon: BrainCircuit, title: "Predictive Market Analyst", desc: "RAG system combining live financial APIs with historical data for real-time predictive insights.", tools: ["LlamaIndex", "PostgreSQL", "Python"] },
  { icon: ShieldCheck, title: "Enterprise Data Sanitizer", desc: "AI pipeline that detects and scrubs PII from unstructured enterprise datasets before training.", tools: ["Guardrails AI", "LangFuse", "AWS"] },
  { icon: Workflow, title: "Multi-Agent DevOps Orchestrator", desc: "Autonomous agents collaborating to deploy, monitor, and auto-heal cloud infrastructure.", tools: ["LangGraph", "Azure", "FastAPI"] },
];

const tools = [
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "LangChain", img: "https://unpkg.com/simple-icons@latest/icons/langchain.svg", invert: true },
  { name: "LlamaIndex", img: null, invert: false },
  { name: "OpenAI", img: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg", invert: true },
  { name: "Gemini", img: "https://unpkg.com/simple-icons@latest/icons/googlegemini.svg", invert: true },
  { name: "FastAPI", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "Azure", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
  { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "PostgreSQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
];

const faqData = [
  { q: "What is the duration of the program?", a: "The program runs for 16 weeks (4 months), 100% online with live weekend sessions." },
  { q: "Who is this program for?", a: "Software engineers, tech analysts, mid-level professionals, engineering managers, and tech leaders looking to transition into AI engineering roles." },
  { q: "What extra benefits are included?", a: "FREE Claude Tool Subscription, 5 AI Mock Interviews via Koyo, Anthropic SDE Certification, portfolio & resume building, Newton Builders community access, and AI Hackathons." },
  { q: "Will I get certified?", a: "Yes. You earn an industry-recognized Anthropic SDE Certification upon completion." },
  { q: "Will I have access to the curriculum after the course?", a: "Yes, you get lifetime curriculum access." },
  { q: "Are there tracks for different experience levels?", a: "Yes — dedicated tracks for 0–2 years, 2–6 years, and 6–10+ years experience." },
];

const Tag = ({ children }) => (
  <span style={{ display: "inline-block", background: "rgba(19,138,82,0.15)", color: "#138a52", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", padding: "6px 16px", borderRadius: "999px", marginBottom: "20px" }}>{children}</span>
);

const AgenticAndGenAI = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [activeCareerPath, setActiveCareerPath] = useState(0);
  const [isCareerPathHovered, setIsCareerPathHovered] = useState(false);
  const [heroImageIdx, setHeroImageIdx] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-rotate Hero Images
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIdx((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate Career Paths
  useEffect(() => {
    if (isCareerPathHovered) return;
    const timer = setInterval(() => {
      setActiveCareerPath((prev) => (prev + 1) % careerPaths.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isCareerPathHovered]);

  return (
    <div className="ag-bg">

      {/* ============================================================
          1. HERO
          ============================================================ */}
      <section id="overview" className="relative min-h-[100vh] flex flex-col items-center justify-center pt-32 pb-24 px-6 overflow-hidden bg-[#020408]">
        
        {/* 1. Full-Bleed Immersive Background */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Agentic AI Engineering ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover mix-blend-screen transition-opacity duration-[2000ms] ease-in-out ${heroImageIdx === idx ? "opacity-50" : "opacity-0"}`}
            />
          ))}
          
          {/* Deep Vignette Mask */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,4,8,0.3)_0%,rgba(2,4,8,0.95)_100%)] pointer-events-none" />
          
          {/* Intense Floating Orbs for 3D Depth */}
          <div 
            className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#10b981]/20 blur-[130px] rounded-full pointer-events-none mix-blend-screen animate-pulse" 
          />
          <div 
            className="absolute bottom-[10%] right-[15%] w-[600px] h-[600px] bg-teal-500/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen animate-pulse" 
            style={{ animationDelay: '1s' }}
          />
        </div>

        {/* 2. Floating God-Tier Hero Content */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center text-center mt-[-8vh]">
          {/* Premium Glass Badge */}
          <div
            className="mb-10 inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[0.25em] uppercase border border-white/15 bg-white/[0.03] backdrop-blur-2xl text-gray-300 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
          >
            <div className="relative flex items-center justify-center w-2 h-2">
              <span className="absolute w-2 h-2 rounded-full bg-emerald-400 opacity-100" />
              <span className="absolute w-4 h-4 rounded-full bg-emerald-400/40 animate-ping" />
            </div>
            Built for future-ready engineers
          </div>

          {/* Epic Metallic Typography */}
          <h1
            className="font-black ag-font-outfit mb-8 leading-[1.05] tracking-tight max-w-5xl"
            style={{ fontSize: "clamp(50px, 9vw, 110px)" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] pb-2">
              Master the future as an
            </span>
            <span className="relative inline-block mt-2">
              <span className="absolute inset-0 bg-[#10b981]/30 blur-[80px] animate-pulse"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-[#10b981] to-teal-400 drop-shadow-[0_0_60px_rgba(16,185,129,0.8)]">
                AI Engineer
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-[22px] text-gray-400 mb-16 max-w-3xl leading-relaxed font-medium px-4 drop-shadow-lg"
          >
            Build production-grade LLM applications, agentic systems, and highly scalable AI infrastructure in this intensive 16-week program.
          </p>

          {/* Hyper-Premium Interactive Elements */}
          <div className="flex flex-col items-center gap-12 px-4">
            <div className="flex flex-wrap justify-center gap-6">
              
              {/* Spinning Conic Gradient Button */}
              <div className="relative group rounded-full p-[2px] overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.7)] transition-shadow duration-500">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_240deg,rgba(16,185,129,1)_360deg)] animate-[spin_3s_linear_infinite] opacity-100" />
                <div className="absolute inset-0 bg-[#10b981]/20 backdrop-blur-md" />
                <div className="relative">
                  <ApplyNowButton
                    courseValue="Agentic and GenAI"
                    className="!px-12 !py-5 !text-[16px] !rounded-full !bg-[#05070a]/90 hover:!bg-[#05070a]/70 transition-colors backdrop-blur-2xl text-white font-black tracking-wide"
                    label="Apply Now"
                  />
                </div>
              </div>

              {/* Glass Outline Button */}
              <button
                onClick={() => setShowPopup(true)}
                className="px-12 py-5 text-[16px] font-black tracking-wide rounded-full border border-white/20 bg-white/5 backdrop-blur-2xl text-gray-200 hover:bg-white/15 hover:border-white/40 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                View Curriculum
              </button>
            </div>
            
            {/* Green Placement Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-10 mx-auto w-fit bg-[#091C11] rounded-[16px] py-3 px-8 md:px-14 flex flex-col md:flex-row items-center gap-8 md:gap-20 shadow-2xl border border-[#144A2D]"
            >
               {/* Placements */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-[#12764F] flex items-center justify-center shadow-inner shrink-0">
                     <Briefcase className="text-white" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-emerald-50/70 text-[10px] font-bold mb-0.5">Placements</p>
                     <p className="text-white text-[20px] font-bold leading-none">4500+</p>
                  </div>
               </div>

               {/* Separator */}
               <div className="hidden md:block w-px h-10 bg-white/10"></div>

               {/* Salary Hike */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-[#12764F] flex items-center justify-center shadow-inner shrink-0">
                     <TrendingUp className="text-white" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-emerald-50/70 text-[10px] font-bold mb-0.5">Salary Hike</p>
                     <p className="text-white text-[18px] font-bold leading-[1.1]">Upto <br/> 350%</p>
                  </div>
               </div>

               {/* Separator */}
               <div className="hidden md:block w-px h-10 bg-white/10"></div>

               {/* ROI */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-[#12764F] flex items-center justify-center shadow-inner shrink-0">
                     <Landmark className="text-white" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-emerald-50/70 text-[10px] font-bold mb-0.5">ROI on Course</p>
                     <p className="text-white text-[20px] font-bold leading-none">10x to 20X</p>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <ProgramStatsBar stats={trustStats} labelColor="text-[#10b981]" />

      {/* TOP ONE PERCENT (PROGRAM HIGHLIGHTS) */}
      <TopOnePercent
        badge="Program Highlights"
        title="Built for"
        titleHighlight="Serious Career Growth"
        subtitle="Gain the technical depth required to build production-grade agentic systems and AI infrastructure."
      />

      {/* CAREER TRACKS */}
      <section id="paths" className="py-24 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="inline-block bg-[#10b981]/15 text-[#10b981] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
                Career Tracks
              </span>
              <h2 className="text-3xl md:text-[44px] font-black ag-font-outfit text-white tracking-tight leading-tight">
                Find the AI path for your role
              </h2>
              <p className="text-gray-400 text-lg mt-3">
                A dedicated track for every stage of your career.
              </p>
            </div>
            <ApplyNowButton
              courseValue="Agentic and GenAI"
              className="!px-6 !py-3 !text-sm !rounded-xl whitespace-nowrap"
              label="Start Your AI Career →"
            />
          </div>

          <div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            onMouseEnter={() => setIsCareerPathHovered(true)}
            onMouseLeave={() => setIsCareerPathHovered(false)}
          >
            {/* Accordions */}
            <div className="flex flex-col gap-4">
              {careerPaths.map((path, idx) => {
                const isActive = activeCareerPath === idx;
                return (
                  <div
                    key={idx}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                      isActive ? "border-white/20 bg-white/[0.04]" : "border-white/5 bg-[#0A0A0A] hover:border-white/10"
                    }`}
                    onClick={() => setActiveCareerPath(idx)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-[#10b981] text-white text-[11px] font-bold px-3 py-1 rounded">
                          {path.exp}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-gray-400 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-white">{path.title}</h3>

                      <div 
                        className={`transition-all duration-500 ease-in-out overflow-hidden`}
                        style={{ maxHeight: isActive ? '500px' : '0px', opacity: isActive ? 1 : 0 }}
                      >
                        <p className="text-gray-400 text-sm leading-relaxed mt-3 mb-5">{path.desc}</p>
                        <div className="pt-5 border-t border-white/10">
                          <h4 className="text-white font-bold text-sm mb-3">What you'll gain</h4>
                          <ul className="flex flex-col gap-2.5">
                            {path.benefits.map((b, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-gray-400 text-sm">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-auto border border-white/10">
              {careerPaths.map((path, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeCareerPath === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                >
                  <img
                    src={path.image}
                    alt={path.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                    <p className="text-white text-base md:text-lg font-medium leading-relaxed italic border-l-4 border-white/60 pl-5 drop-shadow-lg">
                      "{path.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <PremiumCurriculum 
        phases={agenticPhases} 
        title="16-Week AI Roadmap" 
        accentColor="text-[#138a52]" 
        bgColor="bg-[#020408]"
        cardBgColor="bg-[#0B1014]"
      />

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6 bg-[#050505] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <span className="inline-block bg-[#10b981]/15 text-[#10b981] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
                Projects
              </span>
              <h2 className="text-3xl md:text-[44px] font-black ag-font-outfit text-white tracking-tight">
                Flagship Capstone Projects
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capstoneProjects.map((project, i) => (
              <div
                key={i}
                className="glass-panel rounded-[28px] p-8 relative overflow-hidden group cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-500 min-h-[380px] flex flex-col"
                onClick={() => setShowPopup(true)}
              >
                 {/* Faded Background Image */}
                 <div 
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10 group-hover:opacity-30 mix-blend-luminosity transition-all duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${heroImages[i % heroImages.length]})` }}
                 ></div>
                 {/* Gradient overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/60 to-transparent z-0 pointer-events-none"></div>
                 
                 <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8">
                       <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-zinc-900 border border-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform duration-500">
                          {React.createElement(project.icon, {
                            size: 24,
                            className: "text-gray-400 group-hover:text-[#10b981] transition-colors duration-500",
                            strokeWidth: 1.5,
                          })}
                       </div>
                       <span className="text-[11px] font-bold text-zinc-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">Enterprise Project</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#10b981] transition-colors">
                       {project.title}
                    </h3>
                    
                    <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                       {project.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                       {project.tools.slice(0,3).map(t => (
                          <span key={t} className="text-[10px] font-semibold bg-white/5 border border-white/5 text-zinc-300 px-3 py-1.5 rounded-lg">
                             {t}
                          </span>
                       ))}
                       {project.tools.length > 3 && (
                          <span className="text-[10px] font-semibold bg-white/5 border border-white/5 text-zinc-400 px-3 py-1.5 rounded-lg">
                             +{project.tools.length - 3}
                          </span>
                       )}
                    </div>

                    <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform duration-300 pt-4 border-t border-white/5">
                       View Project Details <ArrowRight size={16} className="ml-2 text-zinc-400 group-hover:text-white transition-colors" />
                    </div>
                 </div>
              </div>
            ))}

            {/* 6th card: Clean CTA */}
            <div className="bg-gradient-to-br from-[#10b981]/5 to-transparent border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-[#10b981]/10">
              <div className="w-16 h-16 bg-[#10b981]/10 rounded-full flex items-center justify-center mb-6 border border-[#10b981]/30">
                <Layers size={28} className="text-[#10b981]" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 leading-tight ag-font-outfit">
                More projects<br/>waiting for you
              </h3>
              <p className="text-gray-400 text-[15px] mb-8 max-w-[240px] leading-relaxed">
                Build a portfolio that proves your expertise and gets you hired.
              </p>
              <button
                onClick={() => setShowPopup(true)}
                className="bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3.5 px-8 rounded-full transition-all duration-300 flex items-center gap-2 shadow-[0_4px_14px_rgba(16,185,129,0.4)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.6)] hover:-translate-y-0.5"
              >
                Start Learning <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATION */}
      <section className="py-24 px-6 bg-[#0B0F13]">
        <div className="max-w-6xl mx-auto">
          <Certification />
        </div>
      </section>

      {/* SALARY GROWTH */}
      <SalaryGrowth />

      {/* MARKET LEADERS */}
      <MarketLeaders />

      {/* MEET YOUR MENTORS */}
      <MeetYourMentors />

      {/* PRICING */}
      <section className="py-24 px-6 bg-[#050505] border-t border-white/5" id="pricing">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-14 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-14 items-start mb-20 backdrop-blur-md">
            <div>
              <span className="inline-block bg-[#10b981]/15 text-[#10b981] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-6">
                Investment
              </span>
              <h2 className="text-3xl md:text-[48px] font-black ag-font-outfit text-white tracking-tight leading-tight mb-6">
                EMI starts from
                <br />
                ₹5,000/month
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Covers the full 16-week curriculum, AI projects, mentorship, certification, and career support.
              </p>
              <button
                onClick={() => setShowPopup(true)}
                className="bg-[#10b981] hover:bg-[#059669] text-white px-10 py-4 font-bold text-base rounded-xl transition-colors shadow-lg shadow-[#10b981]/20"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "96px 24px", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 className="ag-font-outfit" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.02em", textAlign: "center", marginBottom: "48px" }}>Common Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqData.map((faq, i) => (
              <div key={i} className="ag-card" style={{ cursor: "pointer", padding: "0" }} onClick={() => setOpenFaqIdx(openFaqIdx === i ? null : i)}>
                <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h4 style={{ fontWeight: 700, color: "var(--text)", fontSize: "15px", margin: 0 }}>{faq.q}</h4>
                  <ChevronDown size={18} style={{ color: "#64748b", transform: openFaqIdx === i ? "rotate(180deg)" : "none", transition: "transform 0.3s" }} />
                </div>
                {openFaqIdx === i && (
                  <div style={{ padding: "0 24px 20px", color: "#94a3b8", fontSize: "14px", lineHeight: 1.7 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {showPopup && <AdvancedApplyPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default AgenticAndGenAI;
