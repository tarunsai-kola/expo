import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, Check, X, ChevronDown,
  BrainCircuit, Network, Cpu, Code2, ShieldCheck, Workflow,
  Layers, TerminalSquare, Star, Users, Clock, BookOpen,
  Award, Target, Zap, TrendingUp, Briefcase, Globe, Database, GitBranch
} from "lucide-react";
import AdvancedApplyPopup from "../Components/AdvancedApplyPopup";
import PaymentPlanWidget from "../Components/PaymentPlanWidget";
import MeetYourMentors from "../Components/MeetYourMentors";
import AuthorityMarquee from "../Components/AuthorityMarquee";
import MarketLeaders from "../Components/MarketLeaders";
import ProgramStatsBar from "../Components/ProgramStatsBar";
import PremiumCurriculum from "../Components/PremiumCurriculum";
import SalaryGrowth from "../Components/SalaryGrowth";
import CareerOutcomes from "../Components/CareerOutcomes";
import ApplyNowButton from "./AdvanceCourse/Components/ApplyNowButton";
import cyberTechBg from "../assets/cyber_tech_bg.png";
import cyberTechBg2 from "../assets/cyber_tech_bg_2.png";
import cyberTechBg3 from "../assets/cyber_tech_bg_3.png";
import "./AgenticAndGenAI.css";

const heroImages = [cyberTechBg, cyberTechBg2, cyberTechBg3];

const trustStats = [
  { value: "24 Weeks", label: "Duration" },
  { value: "100% Online", label: "Format" },
  { value: "60 Students", label: "Batch Size" },
  { value: "5 Capstones", label: "Enterprise Projects" },
  { value: "15+ Interviews", label: "Placement" },
];

/* ──────── DATA ──────── */
const STATS = [
  { n: "4,500+",   l: "Career Transitions" },
  { n: "₹28 LPA", l: "Avg. CTC After" },
  { n: "350%",     l: "Avg. Salary Hike" },
  { n: "200+",     l: "Hiring Partners" },
  { n: "4.9 / 5", l: "Student Rating" },
];

const COMPANIES = ["Google","Microsoft","Amazon","Meta","Flipkart","Razorpay","Swiggy","PhonePe","Zomato","Zepto","CRED","Infosys","TCS","Wipro","Meesho"];

const FEATURES = [
  { icon: BrainCircuit, t: "LLM Engineering",        d: "Master OpenAI, Gemini, Claude, LangChain — from API basics to production-grade systems." },
  { icon: Network,      t: "Agentic AI Systems",      d: "Build autonomous multi-agent workflows with CrewAI, LangGraph, and persistent memory." },
  { icon: Cpu,          t: "AI Infrastructure",       d: "Deploy and scale AI services with enterprise observability, cost engineering, and SLAs." },
  { icon: Database,     t: "RAG & Vector Databases",  d: "Hybrid retrieval systems combining semantic search with structured knowledge graphs." },
  { icon: ShieldCheck,  t: "AI Safety & Governance",  d: "Guardrails AI, RBAC, PII scrubbing, and enterprise AI compliance frameworks." },
  { icon: GitBranch,    t: "Production Deployment",   d: "FastAPI microservices, Docker, CI/CD pipelines — the full engineering lifecycle." },
];

const CURRICULUM = [
  {
    id: "P0", tag: "Pre-course", dur: "Pre-recorded",
    title: "Software Engineering Foundations",
    topics: ["Python & Programming Fundamentals", "API Design & Backend Basics", "Git Workflows & Collaboration", "Data Structures Refresher"],
    project: "Async content available from Day 1 of enrollment — designed to bring all experience levels to the same baseline before live sessions begin."
  },
  {
    id: "P1", tag: "Foundation", dur: "Weeks 1–3",
    title: "AI Product Builder",
    topics: ["LLM Engineering Architecture", "Prompt Design & Evaluation Pipelines", "Enterprise RAG Knowledge Systems", "Multi-model Routing & Response Scoring"],
    project: "Enterprise Document Copilot — a production knowledge assistant with full audit logging, deployed on cloud infrastructure."
  },
  {
    id: "P2", tag: "Architecture", dur: "Weeks 4–6",
    title: "Enterprise Intelligence Architect",
    topics: ["Hybrid Retrieval & GraphRAG", "Multi-source Knowledge Orchestration", "Decision Intelligence System Design", "Advanced Vector DB Engineering"],
    project: "Executive Intelligence Dashboard — real-time business insight engine pulling from 5+ live data sources with AI-generated summaries."
  },
  {
    id: "P3", tag: "Agentic AI", dur: "Weeks 7–10",
    title: "Autonomous Workflow Architect",
    topics: ["Agentic System Design & Orchestration", "Multi-agent Collaboration (CrewAI, LangGraph)", "Memory-driven Workflows & State Management", "Human-in-the-loop Automation"],
    project: "Sales Automation Agent — fully autonomous pipeline managing lead qualification, follow-up emails, and CRM updates, saving 40+ hours/week."
  },
  {
    id: "P4", tag: "Infrastructure", dur: "Weeks 11–14",
    title: "AI Infrastructure Manager",
    topics: ["AI Backend Services & Inference Serving", "Observability, Monitoring & SLA Management", "AI Cost Engineering & Model Routing", "Enterprise Multi-tenant Architecture"],
    project: "Enterprise AI Governance Platform — real-time monitoring, cost-optimization engine, and compliance reporting dashboard."
  },
  {
    id: "P5", tag: "Capstone", dur: "Weeks 15–16",
    title: "Enterprise AI Platform Strategist",
    topics: ["AI Platform Architecture Design", "SLA Engineering & Performance Benchmarking", "Full AI Operations — Mega Capstone", "Portfolio Review & Career Preparation"],
    project: "AI Automation Platform — managing cross-department enterprise workflows for 500+ concurrent users with full observability."
  },
];

const agenticPhases = CURRICULUM.map((c, i) => ({
  id: `agentic-phase-${i}`,
  phase: c.id === "P0" ? "PHASE 0" : `PHASE ${i}`,
  duration: c.dur,
  title: c.title,
  focusLabel: "CURRICULUM",
  focus: c.topics,
  application: c.project
}));

const toolsList = [
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "OpenAI", img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", invert: true },
  { name: "Hugging Face", img: "https://cdn.worldvectorlogo.com/logos/huggingface-2.svg", invert: true },
  { name: "Pinecone", img: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>' },
  { name: "PyTorch", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "FastAPI", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
];

const PROJECTS = [
  { icon: TerminalSquare, n:"01", title: "Autonomous Code Assistant",       tools:["LangChain","OpenAI","GitHub API"],   d:"LLM-powered dev tool reading entire repositories, suggesting architectural improvements, and generating production-ready pull requests with test coverage." },
  { icon: Network,         n:"02", title: "Omnichannel Support Agent",        tools:["CrewAI","FastAPI","Azure"],          d:"Multi-modal customer service agent that autonomously handles 85% of support tickets across text, voice, and vision — without human escalation." },
  { icon: BrainCircuit,    n:"03", title: "Predictive Market Analyst",        tools:["LlamaIndex","PostgreSQL","Python"],  d:"RAG system combining live financial APIs with historical data for real-time market insights, automated risk scoring, and portfolio recommendations." },
  { icon: ShieldCheck,     n:"04", title: "Enterprise Data Sanitizer",        tools:["Guardrails AI","LangFuse","AWS"],    d:"Production AI pipeline detecting, classifying, and scrubbing PII from enterprise datasets before model training — fully GDPR & SOC2 compliant." },
  { icon: Workflow,        n:"05", title: "Multi-Agent DevOps Orchestrator",  tools:["LangGraph","Azure","FastAPI"],       d:"Autonomous agent network collaborating to deploy, monitor, and auto-heal cloud infrastructure with zero-downtime rolling deployments." },
];

const COMPARE = [
  { f: "Live 1:1 Mentorship from working AI Engineers",          a: true,  o: false },
  { f: "5 Production-Grade Capstone Projects",                   a: true,  o: false },
  { f: "Anthropic SDE Certification (Industry Recognised)",      a: true,  o: false },
  { f: "Dedicated Placement Team + 15+ Interview Opportunities", a: true,  o: false },
  { f: "Real Enterprise Use Cases — not toy tutorials",          a: true,  o: false },
  { f: "LangChain + LangGraph + CrewAI coverage",                a: true,  o: false },
  { f: "AI Infrastructure, Observability & Cost Engineering",    a: true,  o: false },
  { f: "200+ Verified Hiring Partner Network",                   a: true,  o: false },
  { f: "Lifetime Curriculum Access + Alumni Network",            a: true,  o: true  },
];

const TRACKS = [
  {
    exp: "0 – 2 Yrs", icon: Code2,
    title: "Engineers & Tech Analysts",
    roles: ["AI Engineer","Prompt Engineer","ML Ops Associate","AI Product Analyst"],
    before: "₹4–8 LPA", after: "₹12–20 LPA", hike: "~3×",
    wins: [
      "End-to-end AI workflows: Python → LangChain → production APIs",
      "GenAI fluency from prompt engineering to RAG and fine-tuning",
      "Build and ship full-stack AI apps in a real engineering environment",
    ],
  },
  {
    exp: "2 – 6 Yrs", icon: BrainCircuit,
    title: "Mid-Level Engineers & Tech Leads",
    roles: ["Senior AI Engineer","LLM Architect","AI Solutions Engineer","Tech Lead (AI)"],
    before: "₹10–18 LPA", after: "₹24–42 LPA", hike: "~2.5×",
    wins: [
      "Architect hybrid RAG and multi-source decision intelligence systems",
      "Design autonomous, memory-driven multi-agent workflows at enterprise scale",
      "Master AI infrastructure — inference serving, model routing, reliability",
    ],
  },
  {
    exp: "6+ Yrs", icon: Network,
    title: "Tech Leaders & Engineering Managers",
    roles: ["Head of AI","VP Engineering","AI Platform Architect","CTO"],
    before: "₹25–40 LPA", after: "₹55–90 LPA", hike: "~2×",
    wins: [
      "Enterprise AI strategy, governance, and measurable ROI delivery",
      "Scale LLM and autonomous agent systems across entire departments",
      "Lead AI engineering teams and manage cross-functional delivery",
    ],
  },
];

const FAQS = [
  { q: "Who is this program for?", a: "Software engineers, tech analysts, mid-level professionals, engineering managers, and tech leaders who want to build or lead AI systems. We have dedicated learning tracks for 0–2, 2–6, and 6+ years of experience." },
  { q: "How many hours per week?", a: "8–12 hours per week — 4–6 hours of live weekend sessions (all recorded) plus 4–6 hours of self-paced project work. Designed to fit around a full-time job." },
  { q: "What certifications will I earn?", a: "The Anthropic SDE Certification upon completion — an industry-recognised credential valued by top AI teams globally. You also earn phase-by-phase completion certificates." },
  { q: "No prior AI/ML experience — can I join?", a: "Yes. Phase 0 gives you pre-recorded foundational content in Python and APIs. The main program starts from LLM basics and builds progressively. Your software engineering background is all you need." },
  { q: "What does 'placement support' really mean?", a: "ATS-optimized resume building, LinkedIn & GitHub profile reviews, mock technical interviews by working engineers, referral pipelines into 200+ hiring partners, and 15+ curated interview opportunities per student." },
  { q: "Is EMI truly interest-free?", a: "Yes — 0% interest, no processing fee, no hidden charges. EMI starts at ₹5,000/month. The fee covers everything: curriculum, all 5 projects, mentorship, certification, and placement support." },
];

/* ──────── COMPONENT ──────── */
const AgenticAndGenAI = () => {
  const [open,    setOpen   ] = useState(false);
  const [phase,   setPhase  ] = useState(0);
  const [track,   setTrack  ] = useState(0);
  const [faq,     setFaq    ] = useState(null);
  const [heroImageIdx, setHeroImageIdx] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIdx((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const apply = () => setOpen(true);

  return (
    <div className="ato-page">

      {/* ── FLOATING NAV ── */}
      <nav className="ato-floatnav hidden md:flex">
        {["Overview","Curriculum","Projects","Pricing"].map((label, i) => {
          const ids = ["overview","curriculum","projects","pricing"];
          return (
            <button key={i} onClick={() => document.getElementById(ids[i])?.scrollIntoView({behavior:"smooth",block:"start"})}
              style={{padding:"9px 18px", borderRadius:40, fontSize:13, fontWeight:600, color:"var(--txt-main)", background:"transparent", border:"none", cursor:"pointer", transition:"color 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.color="var(--green)"}
              onMouseLeave={e=>e.currentTarget.style.color="var(--txt-main)"}
            >
              {label}
            </button>
          );
        })}
        <button onClick={apply}
          style={{marginLeft:6, padding:"9px 22px", borderRadius:40, fontSize:13, fontWeight:700, color:"white", background:"var(--green)", border:"none", cursor:"pointer", boxShadow:"0 2px 12px rgba(5,150,105,0.3)"}}
        >
          Apply Now
        </button>
      </nav>

      {/* ══════════════════════════════════════════
          HERO (IMMERSIVE TECH)
          ══════════════════════════════════════════ */}
      <section id="overview" className="relative min-h-[100vh] flex flex-col items-center justify-center pt-32 pb-24 px-6 overflow-hidden bg-[#020408]">
        
        {/* 1. Full-Bleed Immersive Background */}
        <div className="absolute inset-0 z-0">
          {/* Deep Vignette Mask */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,4,8,0.3)_0%,rgba(2,4,8,0.95)_100%)] pointer-events-none" />
        </div>

        {/* 2. Floating God-Tier Hero Content */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center text-center mt-[-8vh]">
          {/* Premium Glass Badge */}
          <div
            className="mb-10 inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[0.25em] uppercase border border-white/15 bg-white/[0.03] backdrop-blur-2xl text-gray-300 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
          >
            <div className="relative flex items-center justify-center w-2 h-2">
              <span className="absolute w-2 h-2 rounded-full bg-[#10b981] opacity-100" />
              <span className="absolute w-4 h-4 rounded-full bg-[#10b981]/40 animate-ping" />
            </div>
            16-WEEK AGENTIC AI PROGRAM
          </div>

          {/* Epic Metallic Typography */}
          <h1
            className="font-black sd-font-outfit mb-8 leading-[1.05] tracking-tight max-w-5xl"
            style={{ fontSize: "clamp(50px, 9vw, 110px)" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] pb-2">
              Become a World-Class
            </span>
            <span className="relative inline-block mt-2">
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#6ee7b7] via-[#10b981] to-[#047857] drop-shadow-[0_0_60px_rgba(16,185,129,0.8)]">
                AI Engineer
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-[22px] text-gray-400 mb-16 max-w-3xl leading-relaxed font-medium px-4 drop-shadow-lg"
          >
            Build production-grade LLM applications, agentic systems, and enterprise AI infrastructure to <strong className="text-white">lead AI transformation.</strong>
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
                    courseValue="Agentic and GenAI Engineering"
                    className="!px-12 !py-5 !text-[16px] !rounded-full !bg-[#05070a]/90 hover:!bg-[#05070a]/70 transition-colors backdrop-blur-2xl text-white font-black tracking-wide"
                    label="Apply Now — Free"
                  />
                </div>
              </div>

              {/* Glass Outline Button */}
              <button
                onClick={() => document.getElementById("curriculum")?.scrollIntoView({behavior:"smooth",block:"start"})}
                className="px-12 py-5 text-[16px] font-black tracking-wide rounded-full border border-white/20 bg-white/5 backdrop-blur-2xl text-gray-200 hover:bg-white/15 hover:border-white/40 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                View Curriculum
              </button>
            </div>
            
            {/* Ultra-Compact Green Placement Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-6 mx-auto w-fit bg-[#091C11] rounded-[16px] py-3 px-8 md:px-14 flex flex-col md:flex-row items-center gap-8 md:gap-20 shadow-2xl border border-[#144A2D]"
            >
               {/* Placements */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-[#12764F] flex items-center justify-center shadow-inner shrink-0">
                     <Briefcase className="text-white" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-emerald-50/70 text-[10px] font-bold mb-0.5">Hiring Partners</p>
                     <p className="text-white text-[20px] font-bold leading-none">200+</p>
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

               {/* Capstones */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-[#12764F] flex items-center justify-center shadow-inner shrink-0">
                     <TerminalSquare className="text-white" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-emerald-50/70 text-[10px] font-bold mb-0.5">Enterprise Projects</p>
                     <p className="text-white text-[20px] font-bold leading-none">5 Capstones</p>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <ProgramStatsBar stats={trustStats} labelColor="text-[#10b981]" />
      
      {/* COLLABORATION COMPANY MARQUEE */}
      <AuthorityMarquee theme="dark" />


      {/* ══════════════════════════════════════════
          TECH STACK
          ══════════════════════════════════════════ */}
      <section id="tools" className="py-24 px-6 bg-[#0b0b0f] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#7c3aed]/15 text-[#a78bfa] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Tech Stack
            </span>
            <h2 className="text-3xl md:text-[40px] font-black ag-font-outfit text-white tracking-tight mb-3">
              Tools &amp; Technologies
            </h2>
            <p className="text-slate-400 text-lg">Master the modern Generative AI &amp; Agentic automation stack</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
            {toolsList.map((tool, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 w-[90px] group cursor-default"
              >
                <div
                  className="w-16 h-16 bg-[#13131A] rounded-2xl flex items-center justify-center overflow-hidden border border-white/5 transition-all duration-300 group-hover:scale-110 group-hover:border-[#7c3aed]/50 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.25)]"
                >
                  {tool.img ? (
                    <img src={tool.img} alt={tool.name} className={`w-9 h-9 object-contain ${tool.invert ? "invert opacity-80" : ""}`} />
                  ) : (
                    <span className="text-sm font-bold text-slate-400">{tool.name.substring(0, 2)}</span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest text-center leading-tight uppercase group-hover:text-[#a78bfa] transition-colors">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHAT YOU'LL LEARN (LIGHT BACKGROUND)
          ══════════════════════════════════════════ */}
      <section className="ato-sec-alt">
        <div className="ato-wrap">
          <div style={{textAlign:"center",marginBottom:52}}>
            <div className="ato-badge" style={{marginBottom:18}}>Curriculum Overview</div>
            <h2 className="ato-h2" style={{marginBottom:14,marginTop:16}}>Everything you will master</h2>
            <p className="ato-lead" style={{maxWidth:520,margin:"0 auto"}}>A comprehensive 16-week journey from LLM fundamentals to enterprise AI architecture.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:16}}>
            {FEATURES.map((f,i)=>(
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.07}} className="ato-feat-card" style={{position:"relative",zIndex:1}}>
                <div className="ato-icon">
                  {React.createElement(f.icon,{size:22,color:"var(--green)",strokeWidth:2})}
                </div>
                <h3 style={{fontSize:17,fontWeight:700,color:"var(--txt-main)",marginBottom:8}}>{f.t}</h3>
                <p className="ato-body">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CURRICULUM (PREMIUM STYLE)
          ══════════════════════════════════════════ */}
      <div id="curriculum">
        <PremiumCurriculum 
          phases={agenticPhases} 
          title="16-Week Agentic AI Roadmap" 
          accentColor="text-[#10b981]" 
          bgColor="bg-[#0B1120]"
          cardBgColor="bg-[#151B2B]"
        />
      </div>

      {/* ══════════════════════════════════════════
          PROJECTS (LIGHT BACKGROUND)
          ══════════════════════════════════════════ */}
      <section id="projects" className="ato-sec-alt">
        <div className="ato-wrap">
          <div style={{textAlign:"center",marginBottom:52}}>
            <div className="ato-badge" style={{marginBottom:18}}>Portfolio Projects</div>
            <h2 className="ato-h2" style={{marginBottom:14,marginTop:16}}>5 Enterprise Capstone Projects</h2>
            <p className="ato-lead" style={{maxWidth:500,margin:"0 auto"}}>Real-world systems — not toy tutorials. Projects you can show in your next interview.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:16}}>
            {PROJECTS.map((p,i)=>(
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.09}}
                className="ato-feat-card" style={{cursor:"pointer",padding:32}} onClick={apply}
              >
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
                  <div className="ato-icon">
                    {React.createElement(p.icon,{size:22,color:"var(--green)",strokeWidth:2})}
                  </div>
                  <span style={{fontSize:42,fontWeight:900,color:"var(--bg-subtle)",fontFamily:"'Bricolage Grotesque',sans-serif",lineHeight:1}}>{p.n}</span>
                </div>
                <h3 style={{fontSize:18,fontWeight:700,color:"var(--txt-main)",marginBottom:12}}>{p.title}</h3>
                <p className="ato-body" style={{marginBottom:22,fontSize:14}}>{p.d}</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:8,paddingTop:16,borderTop:"1px solid var(--border)"}}>
                  {p.tools.map(t=>(
                    <span key={t} style={{fontSize:12,fontWeight:600,color:"var(--txt-mut)",background:"var(--bg-subtle)",border:"1px solid var(--border)",padding:"5px 10px",borderRadius:6}}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* CTA card */}
            <div style={{background:"var(--green-bg)",border:"1px solid var(--green-brd)",borderRadius:12,padding:32,display:"flex",flexDirection:"column",justifyContent:"center",cursor:"pointer"}} onClick={apply}>
              <div className="ato-icon" style={{marginBottom:20}}>
                <Layers size={22} color="var(--green)" strokeWidth={2}/>
              </div>
              <h3 className="ato-h3" style={{color:"var(--green)",marginBottom:12,fontSize:22}}>View the complete project syllabus</h3>
              <p className="ato-body" style={{marginBottom:24,fontSize:14}}>Every project, dataset, tool, and deliverable — detailed in the full guide.</p>
              <button onClick={apply} className="ato-btn-p">Download Syllabus <ArrowRight size={16}/></button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COMPARE TABLE
          ══════════════════════════════════════════ */}
      <section className="ato-sec">
        <div className="ato-wrap-s">
          <div style={{textAlign:"center",marginBottom:44}}>
            <div className="ato-badge" style={{marginBottom:18}}>Why Atorax</div>
            <h2 className="ato-h2" style={{marginBottom:14,marginTop:16}}>Atorax vs. Other Programs</h2>
            <p className="ato-lead" style={{maxWidth:460,margin:"0 auto"}}>We're not another online course. We're an engineering program with real outcomes.</p>
          </div>

          <div style={{background:"var(--bg-white)",border:"1px solid var(--border)",borderRadius:12,overflow:"hidden",boxShadow:"0 4px 12px rgba(0,0,0,0.02)"}}>
            <div className="ato-table-header">
              <p className="ato-label">Feature</p>
              <p className="ato-label" style={{textAlign:"center",color:"var(--green)"}}>Atorax</p>
              <p className="ato-label" style={{textAlign:"center"}}>Others</p>
            </div>
            {COMPARE.map((row,i)=>(
              <div key={i} className="ato-row">
                <p style={{fontSize:14,color:"var(--txt-main)",fontWeight:600}}>{row.f}</p>
                <div style={{display:"flex",justifyContent:"center"}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:"var(--green-bg)",border:"1px solid var(--green-brd)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Check size={14} color="var(--green)" strokeWidth={3}/>
                  </div>
                </div>
                <div style={{display:"flex",justifyContent:"center"}}>
                  {row.o
                    ? <div style={{width:28,height:28,borderRadius:"50%",background:"var(--bg-subtle)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center"}}><Check size={14} color="var(--txt-light)" strokeWidth={2.5}/></div>
                    : <div style={{width:28,height:28,borderRadius:"50%",background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.14)",display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color="#ef4444" strokeWidth={2.5}/></div>
                  }
                </div>
              </div>
            ))}
          </div>

          <div style={{textAlign:"center",marginTop:36}}>
            <button onClick={apply} className="ato-btn-p" style={{fontSize:16,padding:"16px 44px"}}>Join the Next Cohort <ArrowRight size={18}/></button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CAREER TRACKS
          ══════════════════════════════════════════ */}
      <section id="paths" className="ato-sec-alt">
        <div className="ato-wrap">
          <div style={{textAlign:"center",marginBottom:40}}>
            <div className="ato-badge" style={{marginBottom:18}}>Career Transformation</div>
            <h2 className="ato-h2" style={{marginBottom:14,marginTop:16}}>A track built for your level</h2>
          </div>

          <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:36,flexWrap:"wrap"}}>
            {TRACKS.map((t,i)=>(
              <button key={i} onClick={()=>setTrack(i)} className={`ato-track-btn ${track===i?"on":""}`}>{t.exp}</button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={track} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:0.22}}
              style={{background:"var(--bg-white)",border:"1px solid var(--border)",borderRadius:12,padding:40,boxShadow:"0 4px 16px rgba(0,0,0,0.03)"}}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* LEFT */}
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:24}}>
                    <div className="ato-icon" style={{margin:0}}>
                      {React.createElement(TRACKS[track].icon,{size:20,color:"var(--green)",strokeWidth:2})}
                    </div>
                    <div>
                      <p className="ato-label" style={{marginBottom:4}}>{TRACKS[track].exp}</p>
                      <h3 style={{fontSize:20,fontWeight:700,color:"var(--txt-main)"}}>{TRACKS[track].title}</h3>
                    </div>
                  </div>

                  <p className="ato-label" style={{marginBottom:12}}>Target Roles After Completion</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:32}}>
                    {TRACKS[track].roles.map((r,i)=><span key={i} className="ato-role-tag">{r}</span>)}
                  </div>

                  <p className="ato-label" style={{marginBottom:12}}>What You'll Gain</p>
                  <div style={{display:"flex",flexDirection:"column",gap:12}}>
                    {TRACKS[track].wins.map((w,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12}}>
                        <div className="ato-check" style={{marginTop:3,width:22,height:22}}>
                          <Check size={12} color="var(--green)" strokeWidth={3}/>
                        </div>
                        <span style={{fontSize:15,color:"var(--txt-main)",lineHeight:1.65,fontWeight:500}}>{w}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT */}
                <div style={{display:"flex",flexDirection:"column",gap:16}}>
                  <div style={{background:"var(--bg-subtle)",border:"1px solid var(--border)",borderRadius:10,padding:30}}>
                    <p className="ato-label" style={{marginBottom:24}}>Salary Transformation</p>
                    <div style={{display:"flex",alignItems:"center",gap:20}}>
                      <div style={{flex:1,textAlign:"center"}}>
                        <p style={{fontSize:12,color:"var(--txt-mut)",marginBottom:8,fontWeight:600}}>Before</p>
                        <p className="ato-display" style={{fontSize:28,fontWeight:800,color:"var(--txt-main)"}}>{TRACKS[track].before}</p>
                      </div>
                      <div style={{textAlign:"center"}}>
                        <ArrowRight size={22} color="var(--green)"/>
                        <p style={{fontSize:12,fontWeight:800,color:"var(--green)",marginTop:4}}>{TRACKS[track].hike}</p>
                      </div>
                      <div style={{flex:1,textAlign:"center"}}>
                        <p style={{fontSize:12,color:"var(--txt-mut)",marginBottom:8,fontWeight:600}}>After</p>
                        <p className="ato-display" style={{fontSize:28,fontWeight:800,color:"var(--green)"}}>{TRACKS[track].after}</p>
                      </div>
                    </div>
                  </div>

                  <div style={{background:"var(--green-bg)",border:"1px solid var(--green-brd)",borderRadius:10,padding:28}}>
                    <p style={{fontSize:14,fontWeight:700,color:"var(--green)",marginBottom:8}}>🎯 Limited Seats — 60 per Cohort</p>
                    <p style={{fontSize:14,color:"var(--txt-main)",lineHeight:1.7,marginBottom:20,fontWeight:500}}>Apply early to secure your spot and access early-bird pricing before the cohort fills.</p>
                    <button onClick={apply} style={{width:"100%",background:"var(--green)",color:"white",fontWeight:700,fontSize:15,padding:"16px 24px",borderRadius:8,border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                      Apply Now <ArrowRight size={16}/>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* MENTORS + COMPANIES */}
      <div style={{borderTop:"1px solid var(--border)"}}><MeetYourMentors/></div>
      <div style={{borderTop:"1px solid var(--border)"}}><MarketLeaders/></div>

      {/* ══════════════════════════════════════════
          PRICING
          ══════════════════════════════════════════ */}
      <section id="pricing" className="ato-sec bg-[#0b0b0f] border-t border-white/10" style={{padding: '96px 24px'}}>
        <div style={{maxWidth: '1100px', margin: '0 auto'}}>
          <div className="text-center mb-12">
            <h2 className="ato-h2 text-white" style={{marginBottom:14,marginTop:16}}>Transparent pricing. Zero surprises.</h2>
            <p className="ato-sub text-gray-400">Complete curriculum access, mentor reviews, and career support.</p>
          </div>
          <PaymentPlanWidget basePrice={96000} durationMonths={6} courseName="Agentic AI" themeColor="#7c3aed" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
          ══════════════════════════════════════════ */}
      <section className="ato-sec-alt">
        <div className="ato-wrap-s">
          <div style={{textAlign:"center",marginBottom:44}}>
            <div className="ato-badge" style={{marginBottom:18}}>FAQ</div>
            <h2 className="ato-h2" style={{marginTop:16}}>Questions? We have answers.</h2>
          </div>
          <div style={{background:"var(--bg-white)",border:"1px solid var(--border)",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.02)"}}>
            {FAQS.map((f,i)=>(
              <div key={i} className="ato-faq-row" onClick={()=>setFaq(faq===i?null:i)}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,padding:"22px 28px",cursor:"pointer"}}>
                  <h4 style={{fontSize:16,fontWeight:600,color:"var(--txt-main)",margin:0}}>{f.q}</h4>
                  <ChevronDown size={20} color={faq===i?"var(--green)":"var(--txt-light)"} style={{flexShrink:0,transform:faq===i?"rotate(180deg)":"none",transition:"transform 0.28s"}}/>
                </div>
                <AnimatePresence>
                  {faq===i && (
                    <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.22}} style={{overflow:"hidden"}}>
                      <p style={{padding:"0 28px 24px",fontSize:15,color:"var(--txt-mut)",lineHeight:1.7,borderTop:"1px solid var(--border)",paddingTop:18}}>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SALARY GROWTH */}
      <SalaryGrowth domain="AgenticAndGenAI" />

      {/* CAREER OUTCOMES */}
      <CareerOutcomes domain="AgenticAndGenAI" />

      {/* ══════════════════════════════════════════
          FINAL CTA (DARK NAVY)
          ══════════════════════════════════════════ */}
      <section style={{background:"var(--navy)",padding:"100px 28px",borderTop:"1px solid var(--border)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"40%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(5,150,105,0.08) 0%,transparent 65%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:680,margin:"0 auto",textAlign:"center",position:"relative",zIndex:1}}>
          <div className="ato-badge" style={{marginBottom:24,display:"inline-flex", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"#10b981"}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:"#10b981",display:"inline-block"}}/>
            Limited Seats · {new Date().toLocaleString("default",{month:"long",year:"numeric"})} Cohort
          </div>
          <h2 className="ato-h1" style={{color:"#ffffff",marginBottom:20}}>
            Ready to build the{" "}
            <span style={{color:"#10b981"}}>
              future of AI?
            </span>
          </h2>
          <p style={{fontSize:18,color:"#94a3b8",marginBottom:40,lineHeight:1.75,maxWidth:520,margin:"0 auto 40px"}}>
            Join 4,500+ engineers who have transformed their careers. Applications reviewed within 48 hours.
          </p>
          <div style={{display:"flex",justifyContent:"center",gap:14,flexWrap:"wrap"}}>
            <button onClick={apply} className="ato-btn-p" style={{fontSize:17,padding:"18px 46px"}}>Apply Now — Free <ArrowRight size={20}/></button>
            <button onClick={apply} style={{display:"inline-flex", alignItems:"center", gap:9, background:"rgba(255,255,255,0.05)", color:"white", fontSize:17, fontWeight:600, padding:"18px 46px", borderRadius:8, border:"1px solid rgba(255,255,255,0.1)", cursor:"pointer"}}>
              Download Brochure
            </button>
          </div>
          <p style={{fontSize:13,color:"#64748b",marginTop:20,fontWeight:500}}>No application fee · Limited to 60 seats per cohort · Results in 48 hours</p>
        </div>
      </section>

      {open && <AdvancedApplyPopup onClose={()=>setOpen(false)}/>}
    </div>
  );
};

export default AgenticAndGenAI;
