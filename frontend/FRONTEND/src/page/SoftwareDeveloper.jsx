import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ChevronDown,
  Layers,
  Bot,
  Video,
  Briefcase,
  CheckCircle2,
  TerminalSquare,
  Network,
  BrainCircuit,
  ShieldCheck,
  Workflow,
  ArrowRight,
  MonitorPlay,
  CalendarDays,
  BarChart3,
  FileSearch,
  Building2,
  BadgeCheck,
  UserCheck,
  TrendingUp,
  HeartPulse,
  Users,
  DollarSign,
  GraduationCap,
  Server,
  Cloud,
  Code,
  Landmark
} from "lucide-react";

import Certification from "./AdvanceCourse/Components/Certification";
import ApplyNowButton from "./AdvanceCourse/Components/ApplyNowButton";
import AdvancedApplyPopup from "../Components/AdvancedApplyPopup";
import TopOnePercent from "../Components/TopOnePercent";
import MarketLeaders from "../Components/MarketLeaders";
import MeetYourMentors from "../Components/MeetYourMentors";
import FloatingNav from "../Components/FloatingNav";
import AuthorityMarquee from "../Components/AuthorityMarquee";
import NonTechReviewsMarquee from "../Components/NonTechReviewsMarquee";

import cyberTechBg from "../assets/cyber_tech_bg.png";
import cyberTechBg2 from "../assets/cyber_tech_bg_2.png";
import cyberTechBg3 from "../assets/cyber_tech_bg_3.png";

const heroImages = [cyberTechBg, cyberTechBg2, cyberTechBg3];

import alumni1 from "../assets/alumni/alumni_1.png";
import alumni2 from "../assets/alumni/alumni_2.png";
import alumni3 from "../assets/alumni/alumni_3.png";

/* ───────── STATIC DATA ───────── */

const trustStats = [
  { value: "24 Weeks", label: "Duration" },
  { value: "100% Online", label: "Format" },
  { value: "120+ Hours", label: "Hands-on Practice" },
  { value: "6 Capstones", label: "Real Projects" },
  { value: "20+", label: "Interview Opportunities" },
];

const careerPaths = [
  {
    exp: "0–1 Years",
    title: "Recent Graduates & Aspiring Developers",
    desc: "Build strong software engineering foundations in Java/Python, DSA, database engineering, and full-stack integration.",
    benefits: [
      "Master clean code principles, OOP, and data structures",
      "Build production-grade microservices and frontend applications",
      "Ready for high-paying Software Engineer & Developer roles",
    ],
    quote: "I want a program that bridges the gap between academic theories and industry-standard production development.",
    image: alumni1,
  },
  {
    exp: "1–3 Years",
    title: "Early Career Professionals & Backend/Frontend Developers",
    desc: "Scale up your engineering skills with Cloud-Native tools, distributed systems, and AI workflows.",
    benefits: [
      "Architect microservices with Spring Boot/FastAPI and integrate REST APIs",
      "Deploy apps with Docker, Kubernetes, and CI/CD pipelines on AWS",
      "Elevate your design patterns and database query optimization",
    ],
    quote: "I need to transition from basic scripting to building scalable, secure, and distributed enterprise applications.",
    image: alumni2,
  },
  {
    exp: "3–5 Years",
    title: "Experienced Engineers & Technical Leads",
    desc: "Transition to AI Engineering and System Design. Combine GenAI, LLMs, and System Design.",
    benefits: [
      "Master High-Level and Low-Level System Design (SOLID, design patterns)",
      "Build AI application architectures using RAG, Vector DBs, and LangChain",
      "Optimise distributed systems for high availability and low latency",
    ],
    quote: "I want to integrate AI engineering and advanced system design to step into Tech Lead and Architect roles.",
    image: alumni3,
  },
];

const programOutline = [
  {
    phase: "Phase 1",
    weeks: "Weeks 1–8",
    title: "Software Engineering Foundations",
    focus: [
      "Advanced Java / Python, OOP, and Design Patterns",
      "Collections framework, Multithreading, Clean Code, Exception Handling",
      "Data Structures & Algorithms (Arrays, Linked Lists, Trees, Graphs, Recursion, DP)",
      "Database Engineering (SQL, NoSQL, MongoDB, Joins, Window Functions, Optimization)",
      "Backend Engineering (Spring Boot / FastAPI, REST APIs, Microservices, API Gateway)",
    ],
    application: "Enterprise Employee Management System, Inventory Management Database, E-Commerce Backend System",
  },
  {
    phase: "Phase 2",
    weeks: "Weeks 9–12",
    title: "Modern Full Stack Development",
    focus: [
      "Frontend Engineering (React.js & Next.js, Modern JS, TypeScript)",
      "State Management (React Hooks, Redux Toolkit)",
      "Full Stack Product Integration, Authentication, RBAC",
      "Payment Gateway Integration and Application Deployment",
    ],
    application: "Netflix Clone, Learning Management System (LMS)",
  },
  {
    phase: "Phase 3",
    weeks: "Weeks 13–14",
    title: "Cloud-Native Engineering & DevOps",
    focus: [
      "Cloud Engineering (AWS, EC2, S3, RDS, IAM, CloudWatch)",
      "DevOps Foundations (Git, GitHub, Docker, Kubernetes Basics)",
      "CI/CD Pipelines and GitHub Actions",
    ],
    application: "Cloud-Native Application Deployment",
  },
  {
    phase: "Phase 4",
    weeks: "Weeks 15–16",
    title: "AI Engineering & Modern Development",
    focus: [
      "AI Development Tools (GitHub Copilot, Cursor AI, Claude, AI Code Review)",
      "Generative AI Engineering (Prompt Engineering, OpenAI APIs)",
      "LLM Integration, Vector Databases, Embeddings, RAG",
      "AI Agents and LangChain Fundamentals",
    ],
    application: "AI Resume Analyzer, AI Interview Coach, AI Customer Support Agent, AI Knowledge Assistant",
  },
  {
    phase: "Phase 5",
    weeks: "Weeks 17–20",
    title: "Industry Implementation",
    focus: [
      "Enterprise Capstone Project: Agile Teams & real software development practices",
      "Sprint cycles: Sprint 1 (Requirements) & Sprint 2 (Architecture)",
      "Sprint cycles: Sprint 3 (Development & Testing) & Sprint 4 (Deployment)",
    ],
    application: "Capstone Project Options: AI Recruitment, CRM, FinTech, EdTech, Healthcare, AI Document Search",
  },
  {
    phase: "Phase 6",
    weeks: "Weeks 21–24",
    title: "System Design & Career Acceleration",
    focus: [
      "Advanced DSA (Top 150 Coding Problems, Mock Coding Interviews)",
      "System Design (HLD/LLD: Scalability, SOLID, Case Studies: Netflix, Uber)",
      "Product Engineering, Resume & LinkedIn Optimization",
      "Placement Readiness (Mock Technical & HR Interviews, Networking, Salary Negotiation)",
    ],
    application: "Interview readiness and positioning for top-tier SDE/AI engineering roles",
  },
];

const TimelineRoadmap = React.memo(({ phases }) => {
  return (
    <>
      {phases.map((phase, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <div
            key={idx}
            id={`phase-${idx}`}
            className={`relative mb-16 md:mb-24 flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""}`}
          >
            {/* Static Node Dot to prevent blinking */}
            <div 
              className="absolute -left-[41px] md:left-1/2 top-1.5 w-[20px] h-[20px] rounded-full border-4 border-bg bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)] transform md:-translate-x-1/2 z-10" 
            />

            <div className="hidden md:block w-1/2" />

            <div className="w-full md:w-1/2 md:px-8 group">
              <div className="bg-surface2 rounded-3xl border border-border p-6 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:scale-[1.01] group-hover:border-primary/50 group-hover:shadow-[0_15px_40px_rgba(99,102,241,0.15)] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
                <div className="flex justify-between items-start gap-4 mb-4">
                  <span className="text-[11px] font-black uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {phase.phase} · {phase.weeks}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-outfit text-text mb-4 leading-snug">
                  {phase.title}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-primary font-bold text-[11.5px] uppercase tracking-widest mb-2.5">
                      Core Modules
                    </h4>
                    <ul className="space-y-2">
                      {phase.focus.map((item, keyIdx) => (
                        <li key={keyIdx} className="flex items-start gap-2.5 text-textMuted text-xs leading-relaxed">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-border/60">
                    <h4 className="text-fuchsia-400 font-bold text-[11.5px] uppercase tracking-widest mb-1.5">
                      Production Application
                    </h4>
                    <p className="text-textMuted text-xs leading-relaxed font-semibold italic">
                      {phase.application}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
});

const capstoneProjects = [
  {
    icon: TerminalSquare,
    title: "AI-Powered Recruitment Platform",
    desc: "Autonomous screening, resume ranking, and placement coordination with real-time feedback loops.",
    tools: ["React", "FastAPI", "OpenAI APIs", "PostgreSQL"],
    architecture: "Web Client ➔ FastAPI Gateway ➔ OpenAI Engine ➔ PostgreSQL Database"
  },
  {
    icon: HeartPulse,
    title: "Healthcare Management System",
    desc: "Multi-tenant medical records, appointment scheduling, role-based access, and patient health charts.",
    tools: ["Next.js", "Spring Boot", "MongoDB", "Docker"],
    architecture: "Next.js UI ➔ Spring Security ➔ MongoDB Replica Set ➔ Docker Containers"
  },
  {
    icon: Users,
    title: "Enterprise CRM Platform",
    desc: "Highly scalable sales CRM with dashboard reporting, pipeline tracking, and customer contact management.",
    tools: ["React", "Python", "PostgreSQL", "AWS S3"],
    architecture: "React Frontend ➔ Django API ➔ PostgreSQL ➔ AWS S3 Assets Store"
  },
  {
    icon: DollarSign,
    title: "FinTech Loan Management System",
    desc: "Distributed payment flows, loan application processing, KYC document verification, and ledger storage.",
    tools: ["Java", "Spring Boot", "PostgreSQL", "AWS EC2"],
    architecture: "Spring Gateway ➔ Microservices ➔ PostgreSQL ➔ AWS EC2 Clusters"
  },
  {
    icon: GraduationCap,
    title: "EdTech Learning Platform (LMS)",
    desc: "Interactive course modules, video streaming, student enrollment trackers, and payment integration.",
    tools: ["Next.js", "FastAPI", "MongoDB", "Docker"],
    architecture: "Next.js App Router ➔ FastAPI Backend ➔ Stripe Gateway ➔ MongoDB Store"
  },
  {
    icon: BrainCircuit,
    title: "AI Document Search & Knowledge Platform",
    desc: "RAG system indexing corporate documents using embeddings and vector search for QA automation.",
    tools: ["LangChain", "Vector DB", "OpenAI", "Python"],
    architecture: "PDF Ingestion ➔ Sentence Embeddings ➔ PGVector Search ➔ LLM Refinement"
  },
];

const toolsList = [
  { name: "Java", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Spring Boot", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
  { name: "FastAPI", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", invert: true },
  { name: "PostgreSQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Kubernetes", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg" },
  { name: "LangChain", img: "https://unpkg.com/simple-icons@latest/icons/langchain.svg", invert: true },
  { name: "OpenAI", img: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg", invert: true },
  { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
];

const customFeatures = [
  {
    Icon: MonitorPlay,
    title: "100% Live Interactive Classes",
    sub: "Learn directly from senior SDEs & AI experts from top product companies. Interactive sessions with concept-to-code focus.",
  },
  {
    Icon: CalendarDays,
    title: "24-Week Structured SDE Program",
    sub: "Follow a rigorous week-by-week curriculum. Master everything from core computer science to cloud and RAG agent systems.",
  },
  {
    Icon: BarChart3,
    title: "6+ Enterprise Projects & Capstones",
    sub: "Build a production-grade portfolio. Work on scalable databases, backend microservices, full-stack LMS, and LLM-powered applications.",
  },
  {
    Icon: FileSearch,
    title: "Premium Career Support Ecosystem",
    sub: "Get noticed by elite tech recruiters. We optimize your professional profiles and conduct technical mock interviews.",
  },
  {
    Icon: Building2,
    title: "Hiring Partners & Direct Referrals",
    sub: "Fast-track your job search. Get direct access to our network of 500+ global corporate partners actively hiring.",
  },
  {
    Icon: BadgeCheck,
    title: "Verifiable SDE & AI Certification",
    sub: "Validate your expertise. Earn an industry-recognized credential that demonstrates project competence to global employers.",
  },
  {
    Icon: UserCheck,
    title: "1:1 Mentor-Led PR Reviews",
    sub: "Get industry-specific guidance. Learn directly from senior SDEs who review your pull requests line-by-line.",
  },
  {
    Icon: TrendingUp,
    title: "Built for Hyper-Growth Career Outcomes",
    sub: "Position yourself in the top 1%. Combine robust software engineering foundations with cutting-edge AI engineering skills.",
  },
];

const salaryData = {
  entry: {
    id: "entry",
    label: "Fresh Graduates",
    sub: "0–1 years experience",
    min: "₹6 LPA",
    avg: "₹9 LPA",
    max: "₹12 LPA",
    minPct: 35,
    avgPct: 55,
    maxPct: 80,
    companies: ["TCS", "Infosys", "Wipro", "Cognizant", "Accenture"],
  },
  mid: {
    id: "mid",
    label: "Mid-Level Developers",
    sub: "1–3 years experience",
    min: "₹10 LPA",
    avg: "₹15 LPA",
    max: "₹20 LPA",
    minPct: 45,
    avgPct: 68,
    maxPct: 90,
    companies: ["Capgemini", "IBM", "Deloitte", "Hexaware", "Oracle"],
  },
  senior: {
    id: "senior",
    label: "Experienced Engineers",
    sub: "3–5 years experience",
    min: "₹18 LPA",
    avg: "₹26 LPA",
    max: "₹35+ LPA",
    minPct: 50,
    avgPct: 75,
    maxPct: 100,
    companies: ["Amazon", "Microsoft", "Google", "NovaMind Labs", "Atorax"],
  },
};

const faqData = [
  { q: "What is the duration of the program?", a: "The program runs for 24 weeks (6 months) consisting of 16 weeks of core technical training, 4 weeks of enterprise capstone projects, and 4 weeks of career branding & interview prep." },
  { q: "Who is this program designed for?", a: "Recent engineering or computer science graduates and working professionals (0–5 years of experience) looking to fast-track their development skills and break into elite SDE or AI roles." },
  { q: "What is the format of the classes?", a: "The program is 100% online with live mentor-led weekend masterclasses, weekly progress tracking, asynchronous lab assignments, and active Discord community support." },
  { q: "Will I get certified upon completion?", a: "Yes, you earn a professional-grade verifiable Software Engineering and AI Application Developer certification recognized by 500+ corporate hiring partners." },
  { q: "What projects will I build?", a: "You will build over 6 real-world enterprise projects including a Netflix clone, an LMS platform, and a comprehensive AI-powered capstone project such as a recruitment CRM or FinTech solution." },
  { q: "Does the program include placement support?", a: "Yes, the last 4 weeks are entirely dedicated to advanced DSA prep, SOLID system design, resume review, LinkedIn profiling, and mock technical & HR interviews, backed by direct placement support." }
];

/* ───────── MAIN PAGE COMPONENT ───────── */

const SoftwareDeveloper = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const [activeCareerPath, setActiveCareerPath] = useState(0);
  const [isCareerPathHovered, setIsCareerPathHovered] = useState(false);
  const [showApplyPopup, setShowApplyPopup] = useState(false);
  
  // Custom states to differentiate from Agentic layout
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [terminalTab, setTerminalTab] = useState("java");

  const [salaryTab, setSalaryTab] = useState("entry");
  const chartRef = useRef(null);
  const isChartInView = useInView(chartRef, { once: false, margin: "-80px" });

  const sd = salaryData[salaryTab];

  const bars = [
    { label: "Min", value: sd.min, pct: sd.minPct, color: "bg-gradient-to-t from-slate-700 to-slate-500", delay: 0 },
    { label: "Avg", value: sd.avg, pct: sd.avgPct, color: "bg-gradient-to-t from-[#4f46e5] to-[#818cf8]", delay: 0.1 },
    { label: "Max", value: sd.max, pct: sd.maxPct, color: "bg-gradient-to-t from-fuchsia-700 to-fuchsia-500", delay: 0.2 },
  ];

  // Auto-rotate Career Paths
  useEffect(() => {
    if (isCareerPathHovered) return;
    const timer = setInterval(() => {
      setActiveCareerPath((prev) => (prev + 1) % careerPaths.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isCareerPathHovered]);


  return (
    <div className="bg-bg text-text" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Google Fonts & Color Variables Override */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        
        :root {
          --primary: #6366f1; /* Indigo-500 */
          --primary-hover: #4f46e5; /* Indigo-600 */
          --primary-active: #3730a3; /* Indigo-800 */
          --primary-soft: rgba(99, 102, 241, 0.18);
          --accent-green-border: rgba(99, 102, 241, 0.28);
        }
      `}</style>

      {/* ============================================================
          1. SPLIT HERO SECTION WITH TERMINAL SIMULATION (Distinct Layout)
          ============================================================ */}
      <section id="overview" className="relative min-h-[100vh] flex items-center pt-24 pb-20 px-6 overflow-hidden bg-[#020306]">
        
        {/* Full-Bleed background carousel */}
        <div className="absolute inset-0 z-0">
          <HeroRotator />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,3,6,0.2)_0%,rgba(2,3,6,0.95)_100%)] pointer-events-none" />
          
          {/* Neon Purple/Indigo Glowing Orbs */}
          <motion.div 
            animate={{ y: [-20, 20, -20], x: [-15, 15, -15], scale: [1, 1.1, 1] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] left-[10%] w-[400px] h-[400px] bg-indigo-500/15 blur-[120px] rounded-full pointer-events-none mix-blend-screen" 
          />
          <motion.div 
            animate={{ y: [20, -20, 20], x: [15, -15, 15], scale: [1, 1.15, 1] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-fuchsia-500/10 blur-[140px] rounded-full pointer-events-none mix-blend-screen" 
          />
        </div>

        {/* Floating God-Tier Hero Content */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center text-center mt-[-4vh]">
          {/* Premium Glass Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[0.25em] uppercase border border-white/15 bg-white/[0.03] backdrop-blur-2xl text-gray-300 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
          >
            <div className="relative flex items-center justify-center w-2 h-2">
              <span className="absolute w-2 h-2 rounded-full bg-indigo-400 animate-pulse opacity-100" />
              <span className="absolute w-4 h-4 rounded-full bg-indigo-400/40 animate-ping" />
            </div>
            24-Week Comprehensive SDE Program
          </motion.div>

          {/* Epic Metallic Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="font-black font-outfit mb-8 leading-[1.05] tracking-tight max-w-5xl"
            style={{ fontSize: "clamp(46px, 8vw, 96px)" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              Become the Developer Who Builds 
            </span>
            <br className="hidden md:block" />
            <span className="relative inline-block mt-2">
              <span className="absolute inset-0 bg-primary/30 blur-[80px] animate-pulse"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-primary to-fuchsia-400 drop-shadow-[0_0_60px_rgba(99,102,241,0.6)]">
                AI-Powered Systems
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-[22px] text-gray-400 mb-16 max-w-3xl leading-relaxed font-medium px-4 drop-shadow-lg"
          >
            Master modern full stack software engineering, microservices, cloud-native DevOps, and direct generative AI integration.
          </motion.p>

          {/* Hyper-Premium Interactive Elements */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center gap-12 px-4"
          >
            <div className="flex flex-wrap justify-center gap-6">
              
              {/* Spinning Conic Gradient Button */}
              <div className="relative group rounded-full p-[2px] overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:shadow-[0_0_60px_rgba(99,102,241,0.7)] transition-shadow duration-500">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_240deg,rgba(99,102,241,1)_360deg)] animate-spin-slow opacity-100" />
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" />
                <div className="relative">
                  <ApplyNowButton
                    courseValue="Software Developer"
                    className="!px-12 !py-5 !text-[16px] !rounded-full !bg-[#05070a]/90 hover:!bg-[#05070a]/70 transition-colors backdrop-blur-2xl text-white font-black tracking-wide"
                    label="Apply Now"
                  />
                </div>
              </div>

              {/* Glass Outline Button */}
              <button
                onClick={() => setShowApplyPopup(true)}
                className="px-12 py-5 text-[16px] font-black tracking-wide rounded-full border border-white/20 bg-white/5 backdrop-blur-2xl text-gray-200 hover:bg-white/15 hover:border-white/40 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                View Syllabus
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
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          2. TRUST BAR
          ============================================================ */}
      <section className="relative z-10 -mt-8 px-6 pb-2">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row justify-around items-center w-full px-6 py-6 md:py-8 bg-[#0e1217] border border-white/20 rounded-[1.25rem] md:rounded-[2rem] shadow-2xl gap-8 md:gap-4"
          >
            {trustStats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center flex-1"
              >
                <div className="text-2xl md:text-[26px] font-black font-outfit text-white mb-1.5">{s.value}</div>
                <div className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-[#e2cf9f] font-bold">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          2.5 INDUSTRY NETWORK (SCROLLING LOGOS)
          ============================================================ */}
      <div className="bg-[#0b0e14] pt-4 pb-8 mt-0">
        <AuthorityMarquee theme="dark" />
      </div>

      {/* ============================================================
          2. SDE ROLES OUTCOMES (Positioned Early for Layout Distinction)
          ============================================================ */}
      <section className="pt-8 pb-20 px-6 bg-surface border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-primary/15 text-primary font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Career Outcomes
            </span>
            <h2 className="text-3xl md:text-[44px] font-black font-outfit text-text tracking-tight mb-3">
              Apply For Premier Tech Roles
            </h2>
            <p className="text-textMuted text-lg">
              After successful completion, you will be prepared for the following positions:
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {[
              "Software Engineer",
              "Full Stack Developer",
              "Backend Developer",
              "Frontend Developer",
              "Cloud Engineer",
              "Application Developer",
              "AI Application Developer",
              "AI Engineer",
              "Software Development Engineer (SDE)",
              "Associate Product Engineer",
              "Platform Engineer"
            ].map((role, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-surface2 border border-border rounded-2xl p-5 flex items-center gap-4 transition-all hover:border-primary/40 hover:shadow-[0_10px_30px_rgba(99,102,241,0.15)]"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 font-bold">
                  ✓
                </div>
                <span className="font-bold text-text text-[15px]">{role}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ============================================================
          4. PROGRAM HIGHLIGHTS (TopOnePercent)
          ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <TopOnePercent
          badge="Program Highlights"
          title="Designed for"
          titleHighlight="Top-Tier SDE & AI Roles"
          subtitle="Gain the technical depth required to build production-grade full-stack systems and Generative AI applications."
          customFeatures={customFeatures}
        />
      </motion.div>

      {/* ============================================================
          5. CAREER TRACKS (Accordions)
          ============================================================ */}
      <section id="paths" className="py-24 px-6 bg-surface border-t border-border">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6"
          >
            <div>
              <span className="inline-block bg-primary/15 text-primary font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
                Career Tracks
              </span>
              <h2 className="text-3xl md:text-[44px] font-black font-outfit text-text tracking-tight leading-tight">
                Find the path for your experience
              </h2>
              <p className="text-textMuted text-lg mt-3">
                A dedicated track for every stage of your career.
              </p>
            </div>
            <ApplyNowButton
              courseValue="Software Developer"
              className="!px-6 !py-3 !text-sm !rounded-xl whitespace-nowrap"
              label="Start Your SDE Career →"
            />
          </motion.div>

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
                      isActive ? "border-border bg-surface2" : "border-border/50 bg-surface hover:border-border"
                    }`}
                    onClick={() => setActiveCareerPath(idx)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-primary text-white text-[11px] font-bold px-3 py-1 rounded">
                          {path.exp}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-textMuted transition-transform ${isActive ? "rotate-180" : ""}`}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-text">{path.title}</h3>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-textMuted text-sm leading-relaxed mt-3 mb-5">{path.desc}</p>
                            <div className="pt-5 border-t border-border">
                              <h4 className="text-text font-bold text-sm mb-3">What you'll gain</h4>
                              <ul className="flex flex-col gap-2.5">
                                {path.benefits.map((b, i) => (
                                  <li key={i} className="flex items-start gap-2.5 text-textMuted text-sm">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                    {b}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-auto border border-border">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCareerPath}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <img
                    src={careerPaths[activeCareerPath].image}
                    alt={careerPaths[activeCareerPath].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                    <p className="text-white text-base md:text-lg font-medium leading-relaxed italic border-l-4 border-white/60 pl-5">
                      "{careerPaths[activeCareerPath].quote}"
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          6. VERTICAL INTERACTIVE TIMELINE (Distinct Curriculum Layout)
          ============================================================ */}
      <section id="curriculum" className="py-24 px-6 bg-bg">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block bg-primary/15 text-primary font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Timeline Roadmap
            </span>
            <h2 className="text-3xl md:text-[44px] font-black font-outfit text-text tracking-tight mb-3">
              Your 24-Week Path to Mastery
            </h2>
            <p className="text-textMuted text-lg max-w-xl mx-auto">
              Follow our rigorous, structured milestone map containing comprehensive SDE and AI learning arcs.
            </p>
          </motion.div>

          {/* Timeline Stack */}
          <div className="relative border-l-2 border-dashed border-indigo-500/20 pl-8 md:pl-0 md:border-l-0">
            
            {/* Center Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-indigo-500/20 transform -translate-x-1/2" />

            <TimelineRoadmap phases={programOutline} />
          </div>

          {/* Download brochure footer */}
          <div className="mt-16 text-center">
            <button
              onClick={() => setShowApplyPopup(true)}
              className="px-8 py-4 font-bold text-sm rounded-xl border border-border text-gray-300 hover:text-white hover:border-white/20 transition-all"
            >
              Download Detailed Syllabus Brochure
            </button>
          </div>
        </div>
      </section>


      {/* ============================================================
          5b. TOOLS & TECHNOLOGIES
          ============================================================ */}
      <section className="py-20 px-6 bg-surface border-t border-border">
        <div className="max-w-6xl mx-auto">
          <MemoizedTechStackHeader />
          <MemoizedTechStack toolsList={toolsList} />
        </div>
      </section>

      {/* ============================================================
          7. INTERACTIVE CAPSTONE EXPLORER (Distinct Project Layout)
          ============================================================ */}
      <section id="projects" className="py-24 px-6 bg-bg border-t border-border">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-primary/15 text-primary font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-[44px] font-black font-outfit text-text tracking-tight mb-3">
              Capstone Project Explorer
            </h2>
            <p className="text-textMuted text-lg max-w-xl mx-auto">
              Interact with the tabs below to explore the architecture, schematics, and tech specs of our flagship capstone projects.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left selector tab list */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {capstoneProjects.map((proj, idx) => {
                const isActive = activeProjectIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveProjectIdx(idx)}
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all ${
                      isActive 
                        ? "bg-surface2 border-primary/50 shadow-[0_0_20px_rgba(99,102,241,0.15)] text-text" 
                        : "bg-surface border-border text-textMuted hover:border-white/10"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? "bg-primary/20 text-primary" : "bg-white/5 text-gray-500"}`}>
                      {React.createElement(proj.icon, { size: 20 })}
                    </div>
                    <span className="font-bold text-sm leading-tight">{proj.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Detailed Showcase Panel */}
            <div className="lg:col-span-8 bg-surface2 rounded-3xl border border-border p-6 md:p-8 min-h-[380px] flex flex-col justify-between relative overflow-hidden shadow-2xl">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProjectIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4 border-b border-border pb-5">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      {React.createElement(capstoneProjects[activeProjectIdx].icon, { size: 24 })}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-black font-outfit text-text leading-tight">
                        {capstoneProjects[activeProjectIdx].title}
                      </h3>
                      <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-1">
                        Enterprise Capstone Project Spec
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-primary font-bold text-xs uppercase tracking-widest mb-2">Project Description</h4>
                    <p className="text-gray-300 text-sm md:text-[15px] leading-relaxed">
                      {capstoneProjects[activeProjectIdx].desc}
                    </p>
                  </div>

                  {/* Architecture Schematic Diagram */}
                  <div className="bg-[#0b0e14] border border-white/5 rounded-2xl p-4">
                    <h4 className="text-fuchsia-400 font-bold text-[10px] uppercase tracking-widest mb-3">System Flow Architecture</h4>
                    <div className="text-xs font-mono text-gray-300 flex flex-wrap items-center gap-2">
                      {capstoneProjects[activeProjectIdx].architecture.split(" ➔ ").map((step, idx, arr) => (
                        <React.Fragment key={idx}>
                          <span className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                            {step}
                          </span>
                          {idx < arr.length - 1 && <span className="text-indigo-400 font-bold font-sans">➔</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-primary font-bold text-xs uppercase tracking-widest mb-3">Technology Stack Integrations</h4>
                    <div className="flex flex-wrap gap-2">
                      {capstoneProjects[activeProjectIdx].tools.map((tech, keyIdx) => (
                        <span key={keyIdx} className="text-xs font-semibold text-gray-300 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between flex-wrap gap-4">
                <p className="text-[11px] text-textMuted font-medium italic">
                  * Agile teams follow Sprint structures from business requirement gathering to live deployments.
                </p>
                <button
                  onClick={() => setShowApplyPopup(true)}
                  className="bg-primary hover:bg-primaryHover text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-[0_4px_12px_rgba(99,102,241,0.3)] text-sm"
                >
                  Register to Build This
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          8. CERTIFICATION & CAREER SUPPORT
          ============================================================ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="py-24 px-6 bg-bg"
      >
        <div className="max-w-6xl mx-auto">
          <Certification />
        </div>
      </motion.section>

      {/* ============================================================
          9. CUSTOM SALARY GROWTH
          ============================================================ */}
      <section className="py-24 px-6 bg-bg border-t border-border">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-14"
          >
            <div>
              <span className="inline-block bg-primary/15 text-primary font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
                Salary Scales
              </span>
              <h2 className="text-3xl md:text-[44px] font-black font-outfit text-text tracking-tight leading-tight">
                Expected Salary Ranges
              </h2>
              <p className="text-textMuted mt-3 text-lg max-w-lg">
                Strong compensation packages across experience tiers in India.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Left — Tabs */}
            <div className="flex flex-col gap-3">
              <div className="text-[11px] font-bold text-textMuted uppercase tracking-widest mb-2">
                Select Experience Level
              </div>
              {Object.values(salaryData).map((tab) => {
                const isActive = salaryTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSalaryTab(tab.id)}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all text-left border ${
                      isActive
                        ? "bg-surface2 border-primary/40 shadow-[0_0_24px_rgba(99,102,241,0.15)]"
                        : "bg-surface border-border hover:border-white/10"
                    }`}
                  >
                    <div>
                      <div className={`font-bold text-base ${isActive ? "text-primary" : "text-textMuted"}`}>
                        {tab.label}
                      </div>
                      <div className="text-[11px] text-textMuted mt-0.5">{tab.sub}</div>
                    </div>
                    {!isActive && <ArrowRight size={16} className="text-textMuted" />}
                  </button>
                );
              })}
            </div>

            {/* Right — Chart + Companies */}
            <div className="flex flex-col gap-6">
              {/* Chart */}
              <div
                ref={chartRef}
                className="bg-surface2 rounded-2xl p-8 md:p-10 border border-border"
              >
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-text mb-1">Salary Range</h3>
                  <p className="text-[11px] text-textMuted font-bold tracking-widest uppercase">
                    Annual Packages (LPA)
                  </p>
                </div>

                {/* Bars */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={salaryTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-56 flex items-end justify-center gap-8 md:gap-16"
                  >
                    {bars.map((bar) => (
                      <div key={bar.label} className="flex flex-col items-center flex-1 max-w-[110px] h-full">
                        {/* Value label */}
                        <motion.span
                          key={`${salaryTab}-${bar.label}-val`}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: bar.delay + 0.4 }}
                          className="font-bold text-xl md:text-2xl text-text mb-1"
                        >
                          {bar.value}
                        </motion.span>
                        <span className="text-[10px] text-textMuted font-bold tracking-widest mb-3 uppercase">
                          {bar.label}
                        </span>

                        {/* Bar container */}
                        <div className="w-full flex-1 flex items-end">
                          <motion.div
                            key={`${salaryTab}-${bar.label}`}
                            className={`w-full rounded-t-xl ${bar.color}`}
                            initial={{ height: 0 }}
                            animate={{ height: isChartInView ? `${bar.pct}%` : 0 }}
                            transition={{
                              duration: 0.85,
                              delay: bar.delay,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{ minHeight: 0 }}
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Grid lines */}
                <div className="mt-4 border-t border-border/40 pt-3 flex justify-between">
                  <span className="text-[10px] text-textMuted font-bold tracking-widest uppercase">0</span>
                  <span className="text-[10px] text-textMuted font-bold tracking-widest uppercase">Scale (LPA)</span>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] text-textMuted italic">
                * Indicative figures sourced from industry reports and job market data. Not a guaranteed outcome.
              </p>

              {/* Companies */}
              <div className="bg-surface rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[11px] font-bold text-textMuted uppercase tracking-widest">
                    Hiring partners in our network
                  </span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={salaryTab + "-companies"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-wrap gap-3"
                  >
                    {sd.companies.map((company, i) => (
                      <motion.div
                        key={company}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25, delay: i * 0.06 }}
                        className="bg-surface2 rounded-xl px-5 py-3 border border-border font-bold text-text text-sm tracking-tight transition-all hover:-translate-y-0.5 hover:border-primary/40 cursor-default"
                      >
                        {company}
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          9.5 MARKET REALITY (LEADERS)
          ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <MarketLeaders />
      </motion.div>

      {/* ============================================================
          9.6 MEET YOUR MENTORS
          ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <MeetYourMentors />
      </motion.div>

      {/* ============================================================
          9.7 PROGRAM USP + INVESTMENT
          ============================================================ */}
      <section className="py-24 px-6 bg-surface border-t border-border" id="pricing">
        <div className="max-w-6xl mx-auto">
          {/* Pricing / USP grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-surface2 border border-border rounded-2xl p-8 md:p-14 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-14 items-start mb-20"
          >
            <div>
              <span className="inline-block bg-primary/15 text-primary font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-6">
                Program USP
              </span>
              <h2 className="text-3xl md:text-[40px] font-black font-outfit text-text tracking-tight leading-tight mb-6">
                Top 1% Career Positioning
              </h2>
              <p className="text-textMuted text-lg leading-relaxed mb-8">
                Unlike traditional Full Stack programs that focus only on coding, this curriculum combines:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Software Engineering",
                  "Full Stack Development",
                  "Cloud-Native Engineering",
                  "AI Application Development",
                  "System Design",
                  "Product Engineering",
                  "Career Acceleration",
                  "Interview Preparation",
                  "Industry Capstone Projects"
                ].map((usp, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      ✓
                    </div>
                    <span className="text-sm font-bold text-text">{usp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 w-full shadow-lg">
              <span className="inline-block bg-primary/15 text-primary font-extrabold text-[10px] uppercase tracking-[1.5px] px-4 py-1.5 rounded-full mb-4">
                Investment
              </span>
              <h3 className="text-2xl font-black font-outfit text-text mb-4">
                EMI Starts from ₹5,000/month
              </h3>
              <p className="text-textMuted text-sm leading-relaxed mb-6">
                Covers the complete 24-week curriculum, live sessions, 6+ capstones, career support, and SDE certification.
              </p>
              <ApplyNowButton
                courseValue="Software Developer"
                className="!w-full !px-8 !py-4 !text-base !rounded-xl"
                label="Apply Now"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          9.8 NON-TECH TRANSITION REVIEWS (SCROLLING MARQUEE)
          ============================================================ */}
      <NonTechReviewsMarquee />

      {/* ============================================================
          10. FAQ + FINAL CTA
          ============================================================ */}
      <section className="py-24 px-6 bg-bg border-t border-border">
        <div className="max-w-3xl mx-auto">
          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-[44px] font-black font-outfit text-text tracking-tight">
              Common Questions
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            className="space-y-3 mb-20"
          >
            {faqData.map((faq, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="bg-surface2 border border-border rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => setOpenFaqIdx(openFaqIdx === i ? null : i)}
              >
                <div className="p-5 flex justify-between items-center gap-4">
                  <h4 className="font-bold text-text text-sm group-hover:text-primary transition-colors">
                    {faq.q}
                  </h4>
                  <ChevronDown
                    size={18}
                    className={`text-textMuted transition-transform duration-300 shrink-0 ${
                      openFaqIdx === i ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {openFaqIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 text-textMuted text-sm leading-relaxed border-t border-border pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-center py-16 border-t border-border"
          >
            <h2 className="text-3xl md:text-4xl font-black font-outfit text-text mb-4 tracking-tight">
              Ready to build your career at scale?
            </h2>
            <p className="text-textMuted text-lg mb-8 max-w-md mx-auto">
              Join the next cohort and master modern SDE in 24 weeks.
            </p>
            <ApplyNowButton
              courseValue="Software Developer"
              className="!px-12 !py-4 !text-base !rounded-xl"
              label="Apply Now"
            />
          </motion.div>
        </div>
      </section>

      {/* Apply Popup */}
      {showApplyPopup && (
        <AdvancedApplyPopup
          onClose={() => setShowApplyPopup(false)}
          initialDomain="Software Developer"
        />
      )}

      {/* Floating Sticky Navigation Bar */}
      <FloatingNav onApplyClick={() => setShowApplyPopup(true)} />
    </div>
  );
};

const HeroRotator = React.memo(() => {
  const [heroImageIdx, setHeroImageIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIdx((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.img 
        key={heroImageIdx}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.35, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        src={heroImages[heroImageIdx]} 
        alt="Cyber Tech Background" 
        className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
      />
    </AnimatePresence>
  );
});

const MemoizedTechStack = React.memo(({ toolsList }) => {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-x-6 gap-y-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
    >
      {toolsList.map((tool, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 24, scale: 0.85 },
            visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="flex flex-col items-center gap-3 w-[90px] group cursor-default"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden border border-border transition-all duration-300 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]"
            style={{ backgroundColor: "var(--surface-2)" }}
          >
            {tool.img ? (
              <img src={tool.img} alt={tool.name} className={`w-9 h-9 object-contain ${tool.invert ? "invert" : ""}`} />
            ) : (
              <span className="text-sm font-bold text-textMuted">{tool.name.substring(0, 2)}</span>
            )}
          </div>
          <span className="text-[10px] font-bold text-textMuted tracking-widest text-center leading-tight uppercase group-hover:text-primary transition-colors">
            {tool.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
});

// Memoized Header for Tech Stack to prevent it from blinking
const MemoizedTechStackHeader = React.memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    className="text-center mb-12"
  >
    <span className="inline-block bg-primary/15 text-primary font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
      Tech Stack
    </span>
    <h2 className="text-3xl md:text-[40px] font-black font-outfit text-text tracking-tight mb-3">
      Tools &amp; Technologies
    </h2>
    <p className="text-textMuted text-lg">Master the modern software &amp; AI engineering stack</p>
  </motion.div>
));

export default SoftwareDeveloper;