import PaymentPlanWidget from "../Components/PaymentPlanWidget";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown, CheckCircle2, TerminalSquare, Network, BrainCircuit,
  ShieldCheck, Workflow, Layers, ArrowRight,
  Briefcase, TrendingUp, Landmark, BarChart3, UserCheck, Code, LineChart, PieChart, Database
} from "lucide-react";
import AdvancedApplyPopup from "../Components/AdvancedApplyPopup";
import PremiumCurriculum from "../Components/PremiumCurriculum";
import ProgramStatsBar from "../Components/ProgramStatsBar";
import TopOnePercent from "../Components/TopOnePercent";
import Certification from "./AdvanceCourse/Components/Certification";
import ApplyNowButton from "./AdvanceCourse/Components/ApplyNowButton";
import SalaryGrowth from "../Components/SalaryGrowth";
import CareerOutcomes from "../Components/CareerOutcomes";
import MarketLeaders from "../Components/MarketLeaders";
import MeetYourMentors from "../Components/MeetYourMentors";
import AuthorityMarquee from "../Components/AuthorityMarquee";
import "./DataAnalytics.css";

import heroDaGraphic from "../assets/da_hero_cyan_1.png";
import heroDaGraphic2 from "../assets/da_hero_cyan_2.png";
import heroDaGraphic3 from "../assets/da_hero_cyan_3.png";

const heroImages = [heroDaGraphic, heroDaGraphic2, heroDaGraphic3];

// We reuse the career path images
import careerPath0 from "../assets/career_path_0_2.png";
import careerPath1 from "../assets/career_path_2_6.png";
import careerPath2 from "../assets/career_path_6_10.png";

/* ─── Static Data ─── */
const trustStats = [
  { value: "16 Weeks", label: "Duration" },
  { value: "100% Online", label: "Format" },
  { value: "8+ Projects", label: "Hands-on Practice" },
  { value: "1 Capstone", label: "Real Projects" },
  { value: "AI Analytics", label: "Core Focus" },
];

const toolsList = [
  { name: "Excel", img: "https://img.icons8.com/color/512/microsoft-excel-2019--v1.png" },
  { name: "SQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Power BI", img: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
  { name: "Tableau", img: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Tableau_Logo.png" },
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Pandas", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "AWS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", invert: true },
  { name: "Snowflake", img: "https://www.vectorlogo.zone/logos/snowflake/snowflake-icon.svg" },
  { name: "ChatGPT", img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", invert: true },
];

const careerPaths = [
  {
    exp: "0–2 Years",
    title: "Junior Data & Business Analysts",
    desc: "Build the foundational Excel, SQL, and Power BI skills to step into a high-growth Analytics role.",
    benefits: [
      "Master Business Problem Solving & KPI Frameworks",
      "End-to-end workflows across Excel, SQL, and Power BI",
      "Build dynamic dashboards and generate AI-powered insights"
    ],
    quote: "I want to move beyond simple spreadsheets and start analyzing real business data dynamically.",
    image: careerPath0,
  },
  {
    exp: "2–6 Years",
    title: "Mid-Level Analysts & BI Developers",
    desc: "Move from a solid contributor to a predictive analyst leveraging Python and AI automation.",
    benefits: [
      "Advanced SQL Window Functions, CTEs, and Query Optimization",
      "Python for EDA, Pandas, and Machine Learning essentials",
      "Utilize AI tools (ChatGPT, Gemini) for automated reporting"
    ],
    quote: "I need to upgrade my skills from traditional BI to advanced analytics and predictive modeling.",
    image: careerPath1,
  },
  {
    exp: "6–10+ Years",
    title: "Analytics Managers & Data Leaders",
    desc: "Lead data transformation—design enterprise-scale reporting architecture and manage analytics teams.",
    benefits: [
      "Enterprise Data Modeling and Executive Leadership Dashboards",
      "Scaling AI-powered analytics pipelines in production",
      "Leading cross-functional BI teams and maximizing ROI"
    ],
    quote: "My focus is on strategy and scalability. I need to deliver executive insights that drive business decisions.",
    image: careerPath2,
  },
];

const daPhases = [
  {
    id: "phase-1",
    phase: "PHASE 1",
    duration: "WEEKS 1–4",
    title: "Analytics Foundations",
    focusLabel: "CURRICULUM",
    focus: [
      "W1: Business Analytics & Excel Foundations (KPIs, Cleaning)",
      "W2: Advanced Excel (Power Query) & Business Reporting",
      "W3: SQL Mastery (Joins, CTEs, Window Functions)",
      "W4: Python for Analytics (Pandas, NumPy, EDA)"
    ],
    application: "Business Performance Analysis, Retail Sales Dashboard, Customer Analytics DB"
  },
  {
    id: "phase-2",
    phase: "PHASE 2",
    duration: "WEEKS 5–8",
    title: "BI, Statistics & AI",
    focusLabel: "CURRICULUM",
    focus: [
      "W5: Statistics (Hypothesis Testing, Regression, A/B Testing)",
      "W6: Power BI & Business Intelligence (DAX, Data Modeling, Dashboards)",
      "W7: AI for Analytics (ChatGPT, Prompt Engineering)",
      "W8: Machine Learning Essentials & Churn Prediction"
    ],
    application: "HR Analytics Dashboard, Marketing Analytics, Churn Prediction Model"
  },
  {
    id: "phase-3",
    phase: "PHASE 3",
    duration: "WEEKS 9–12",
    title: "Industry Capstone",
    focusLabel: "CURRICULUM",
    focus: [
      "W9: Retail & E-Commerce Analytics (Customer Segmentation, Revenue Dashboard)",
      "W10: Marketing Analytics (Campaign ROI, Funnel Analytics)",
      "W11: Financial Analytics (Revenue Forecasting, Profitability Reports)",
      "W12: Industry Capstone (End-to-End Extraction, Cleaning, Analysis, Dashboards & AI Insights)"
    ],
    application: "Deliver a Portfolio-Ready AI-Powered Business Analytics Project"
  },
  {
    id: "phase-4",
    phase: "PHASE 4",
    duration: "WEEKS 13–16",
    title: "Placement Preparation",
    focusLabel: "CURRICULUM",
    focus: [
      "W13: ATS Resume, LinkedIn Optimization & GitHub/Canva Portfolio",
      "W14: Technical Interview Prep (150+ SQL Qs, Python, Power BI, Stats, Prompt Eng)",
      "W15: Mock Interviews (Technical, HR, Case Studies, Group Discussions)",
      "W16: Placement Acceleration (Daily Apps, Recruiter Outreach, Negotiation)"
    ],
    application: "Industry-Ready Resume, Technical Interview Readiness, Job Offer Acceleration"
  }
];

const capstoneProjects = [
  { icon: LineChart, title: "Retail Sales Analytics Dashboard", desc: "Build dynamic, end-to-end sales performance dashboards analyzing huge retail datasets.", tools: ["Excel", "Power BI", "Data Cleaning"] },
  { icon: Database, title: "Customer Analytics Database", desc: "Design a relational customer database using advanced SQL, extracting actionable demographic insights.", tools: ["SQL", "MySQL", "Joins", "CTEs"] },
  { icon: UserCheck, title: "HR Analytics Dashboard", desc: "Perform deep Exploratory Data Analysis (EDA) on employee attrition, satisfaction, and performance metrics.", tools: ["Python", "Pandas", "NumPy"] },
  { icon: PieChart, title: "Marketing Analytics Dashboard", desc: "Analyze campaign ROI, funnel metrics, and customer acquisition costs across multiple marketing channels.", tools: ["SQL", "Power BI", "DAX"] },
  { icon: TerminalSquare, title: "Customer Churn Prediction Model", desc: "Train machine learning models to identify at-risk customers and deploy retention strategies.", tools: ["Python", "Scikit-Learn", "Machine Learning"] },
  { icon: BarChart3, title: "Financial Analytics & Exec Reports", desc: "Forecast revenue and present profitability tracking using executive-level storytelling.", tools: ["Excel", "Power BI", "Financial Modeling"] },
];

const faqData = [
  { q: "What is the duration of the program?", a: "The program runs for 16 weeks (4 months), 100% online with live interactive sessions." },
  { q: "Who is this program for?", a: "Business analysts, MIS analysts, and professionals looking to master Data Analytics, SQL, Power BI, and modern AI tools." },
  { q: "Will I get certified?", a: "Yes. You earn multiple Professional Certifications including Data Analytics, SQL, Power BI, Python, and AI for Business." },
  { q: "Do you provide placement support?", a: "Yes! Weeks 13-16 are entirely dedicated to Resume building, Interview Prep (150+ SQL questions), Mock Interviews, and direct Placement Acceleration." },
  { q: "What kind of projects will I build?", a: "You will build 8 hands-on portfolio projects, ranging from Retail Sales Dashboards and Marketing Analytics to a full end-to-end Industry Capstone using AI." },
];

const DataAnalytics = () => {
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
    <div className="da-bg">

      {/* ============================================================
          1. HERO
          ============================================================ */}
      <section id="overview" className="relative min-h-[100vh] flex flex-col items-center justify-center pt-32 pb-24 px-6 overflow-hidden bg-[#020617]">
        
        {/* 1. Full-Bleed Immersive Background */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Data Analytics ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover mix-blend-screen transition-opacity duration-[2000ms] ease-in-out ${heroImageIdx === idx ? "opacity-50" : "opacity-0"}`}
            />
          ))}
          
          {/* Deep Vignette Mask */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0.3)_0%,rgba(2,6,23,0.98)_100%)] pointer-events-none" />
          
          {/* Intense Floating Orbs for 3D Depth (Cyan/Blue Theme) */}
          <div 
            className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#06b6d4]/20 blur-[130px] rounded-full pointer-events-none mix-blend-screen animate-pulse" 
          />
          <div 
            className="absolute bottom-[10%] right-[15%] w-[600px] h-[600px] bg-[#3b82f6]/10 blur-[150px] rounded-full pointer-events-none mix-blend-screen animate-pulse" 
            style={{ animationDelay: '1s' }}
          />
        </div>

        {/* 2. Floating God-Tier Hero Content */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center text-center mt-[-8vh]">
          {/* Premium Glass Badge */}
          <div
            className="mb-10 inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[0.25em] uppercase border border-cyan-500/20 bg-cyan-900/10 backdrop-blur-2xl text-cyan-200 shadow-[0_10px_40px_rgba(6,182,212,0.3)]"
          >
            <div className="relative flex items-center justify-center w-2 h-2">
              <span className="absolute w-2 h-2 rounded-full bg-[#06b6d4] opacity-100" />
              <span className="absolute w-4 h-4 rounded-full bg-[#06b6d4]/40 animate-ping" />
            </div>
            16-Week Professional Program
          </div>

          {/* Epic Metallic Typography */}
          <h1
            className="font-black ag-font-outfit mb-8 leading-[1.05] tracking-tight max-w-5xl"
            style={{ fontSize: "clamp(50px, 9vw, 110px)" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] pb-2">
              Advanced Data Analytics
            </span>
            <span className="relative inline-block mt-2">
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#67e8f9] via-[#06b6d4] to-[#2563eb] drop-shadow-md">
                & AI Integration
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-[22px] text-slate-300 mb-16 max-w-3xl leading-relaxed font-medium px-4 drop-shadow-lg"
          >
            Master Excel, SQL, Power BI, Python, and AI automation to extract powerful business insights and secure high-growth Analytics roles.
          </p>

          {/* Hyper-Premium Interactive Elements */}
          <div className="flex flex-col items-center gap-12 px-4">
            <div className="flex flex-wrap justify-center gap-6">
              
              {/* Spinning Conic Gradient Button */}
              <div className="relative group rounded-full p-[2px] overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.7)] transition-shadow duration-500">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_240deg,rgba(6,182,212,1)_360deg)] animate-[spin_3s_linear_infinite] opacity-100" />
                <div className="absolute inset-0 bg-[#06b6d4]/20 backdrop-blur-md" />
                <div className="relative">
                  <ApplyNowButton
                    courseValue="Data Analytics"
                    className="!px-12 !py-5 !text-[16px] !rounded-full !bg-[#020617]/90 hover:!bg-[#020617]/70 transition-colors backdrop-blur-2xl text-white font-black tracking-wide"
                    label="Apply Now"
                  />
                </div>
              </div>

              {/* Glass Outline Button */}
              <button
                onClick={() => setShowPopup(true)}
                className="px-12 py-5 text-[16px] font-black tracking-wide rounded-full border border-white/20 bg-white/5 backdrop-blur-2xl text-slate-200 hover:bg-white/15 hover:border-cyan-500/40 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                View Curriculum
              </button>
            </div>
            
            {/* Cyan Placement Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-10 mx-auto w-fit bg-[#082f49] rounded-[16px] py-3 px-8 md:px-14 flex flex-col md:flex-row items-center gap-8 md:gap-20 shadow-2xl border border-[#0369a1]"
            >
               {/* Placements */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-[#0ea5e9] flex items-center justify-center shadow-inner shrink-0">
                     <Briefcase className="text-white" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-cyan-100/70 text-[10px] font-bold mb-0.5">Placements</p>
                     <p className="text-white text-[20px] font-bold leading-none">1100+</p>
                  </div>
               </div>

               {/* Separator */}
               <div className="hidden md:block w-px h-10 bg-white/10"></div>

               {/* Salary Hike */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-[#0ea5e9] flex items-center justify-center shadow-inner shrink-0">
                     <TrendingUp className="text-white" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-cyan-100/70 text-[10px] font-bold mb-0.5">Salary Hike</p>
                     <p className="text-white text-[18px] font-bold leading-[1.1]">Upto <br/> 350%</p>
                  </div>
               </div>

               {/* Separator */}
               <div className="hidden md:block w-px h-10 bg-white/10"></div>

               {/* ROI */}
               <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-[#0ea5e9] flex items-center justify-center shadow-inner shrink-0">
                     <Landmark className="text-white" size={18} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                     <p className="text-cyan-100/70 text-[10px] font-bold mb-0.5">ROI on Course</p>
                     <p className="text-white text-[20px] font-bold leading-none">10x to 20X</p>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <ProgramStatsBar stats={trustStats} labelColor="text-[#06b6d4]" />
      
      {/* COLLABORATION COMPANY MARQUEE */}
      <AuthorityMarquee theme="dark" />

      {/* TOP ONE PERCENT (PROGRAM HIGHLIGHTS) */}
      <TopOnePercent
        badge="Program Highlights"
        title="Engineered for"
        titleHighlight="Analytics Leaders"
        subtitle="Gain the technical depth required to build end-to-end analytics pipelines, BI dashboards, and AI integrations."
      />

      {/* CAREER TRACKS */}
      <section id="paths" className="py-24 px-6 bg-[#030712] border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="inline-block bg-[#06b6d4]/15 text-[#06b6d4] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
                Career Tracks
              </span>
              <h2 className="text-3xl md:text-[44px] font-black ag-font-outfit text-white tracking-tight leading-tight">
                Find the right track for your role
              </h2>
              <p className="text-slate-400 text-lg mt-3">
                A dedicated data analytics track for every stage of your career.
              </p>
            </div>
            <ApplyNowButton
              courseValue="Data Analytics"
              className="!px-6 !py-3 !text-sm !rounded-xl whitespace-nowrap !bg-[#06b6d4] hover:!bg-[#0891b2] !text-black"
              label="Start Your Analytics Career →"
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
                      isActive ? "border-cyan-500/30 bg-cyan-900/10" : "border-slate-800 bg-[#0f172a] hover:border-slate-700"
                    }`}
                    onClick={() => setActiveCareerPath(idx)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-[#06b6d4] text-black text-[11px] font-bold px-3 py-1 rounded">
                          {path.exp}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-slate-400 transition-transform duration-300 ${isActive ? "rotate-180 text-cyan-400" : ""}`}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-white">{path.title}</h3>

                      <div 
                        className={`transition-all duration-500 ease-in-out overflow-hidden`}
                        style={{ maxHeight: isActive ? '500px' : '0px', opacity: isActive ? 1 : 0 }}
                      >
                        <p className="text-slate-400 text-sm leading-relaxed mt-3 mb-5">{path.desc}</p>
                        <div className="pt-5 border-t border-slate-700">
                          <h4 className="text-white font-bold text-sm mb-3">What you'll gain</h4>
                          <ul className="flex flex-col gap-2.5">
                            {path.benefits.map((b, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-slate-400 text-sm">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#06b6d4] shrink-0" />
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
            <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-auto border border-slate-800">
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
                    <p className="text-white text-base md:text-lg font-medium leading-relaxed italic border-l-4 border-[#06b6d4] pl-5 drop-shadow-lg">
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
        phases={daPhases} 
        title="16-Week Analytics Roadmap" 
        accentColor="text-[#06b6d4]" 
        bgColor="bg-[#020617]"
        cardBgColor="bg-[#0f172a]"
      />

      {/* TOOLS & TECHNOLOGIES */}
      <section id="tools" className="py-24 px-6 bg-[#030712] border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#06b6d4]/15 text-[#06b6d4] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Tech Stack
            </span>
            <h2 className="text-3xl md:text-[40px] font-black ag-font-outfit text-white tracking-tight mb-3">
              Tools &amp; Technologies
            </h2>
            <p className="text-slate-400 text-lg">Master the modern data analytics &amp; AI business stack</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
            {toolsList.map((tool, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 w-[90px] group cursor-default"
              >
                <div
                  className="w-16 h-16 bg-[#0f172a] rounded-2xl flex items-center justify-center overflow-hidden border border-slate-800 transition-all duration-300 group-hover:scale-110 group-hover:border-[#06b6d4]/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                >
                  {tool.img ? (
                    <img src={tool.img} alt={tool.name} className={`w-9 h-9 object-contain ${tool.invert ? "invert opacity-80" : ""}`} />
                  ) : (
                    <span className="text-sm font-bold text-slate-400">{tool.name.substring(0, 2)}</span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-slate-400 tracking-widest text-center leading-tight uppercase group-hover:text-[#06b6d4] transition-colors">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6 bg-[#030712] border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <span className="inline-block bg-[#06b6d4]/15 text-[#06b6d4] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
                Projects
              </span>
              <h2 className="text-3xl md:text-[44px] font-black ag-font-outfit text-white tracking-tight">
                Flagship Analytics Portfolios
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capstoneProjects.map((project, i) => (
              <div
                key={i}
                className="glass-panel rounded-[28px] p-8 relative overflow-hidden group cursor-pointer border border-slate-800 hover:border-[#06b6d4]/30 transition-all duration-500 min-h-[380px] flex flex-col bg-[#0f172a]"
                onClick={() => setShowPopup(true)}
              >
                 {/* Faded Background Image */}
                 <div 
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10 group-hover:opacity-30 mix-blend-luminosity transition-all duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${heroImages[i % heroImages.length]})` }}
                 ></div>
                 {/* Gradient overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent z-0 pointer-events-none"></div>
                 
                 <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8">
                       <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-900 border border-slate-700 text-white shadow-[0_0_20px_rgba(6,182,212,0.05)] group-hover:scale-110 transition-transform duration-500">
                          {React.createElement(project.icon, {
                            size: 24,
                            className: "text-slate-400 group-hover:text-[#06b6d4] transition-colors duration-500",
                            strokeWidth: 1.5,
                          })}
                       </div>
                       <span className="text-[11px] font-bold text-[#06b6d4] bg-[#06b6d4]/10 px-3 py-1.5 rounded-full border border-[#06b6d4]/20 backdrop-blur-md">Analytics Project</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#06b6d4] transition-colors">
                       {project.title}
                    </h3>
                    
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                       {project.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                       {project.tools.slice(0,3).map(t => (
                          <span key={t} className="text-[10px] font-semibold bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg">
                             {t}
                          </span>
                       ))}
                       {project.tools.length > 3 && (
                          <span className="text-[10px] font-semibold bg-slate-800 border border-slate-700 text-slate-400 px-3 py-1.5 rounded-lg">
                             +{project.tools.length - 3}
                          </span>
                       )}
                    </div>

                    <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform duration-300 pt-4 border-t border-slate-700">
                       View Project Details <ArrowRight size={16} className="ml-2 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                 </div>
              </div>
            ))}

            {/* 7th card: Clean CTA */}
            <div className="bg-gradient-to-br from-[#06b6d4]/10 to-transparent border border-cyan-500/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-500 hover:bg-[#06b6d4]/20">
              <div className="w-16 h-16 bg-[#06b6d4]/10 rounded-full flex items-center justify-center mb-6 border border-[#06b6d4]/30">
                <Layers size={28} className="text-[#06b6d4]" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 leading-tight ag-font-outfit">
                AI Analytics<br/>Assistant & More
              </h3>
              <p className="text-slate-400 text-[15px] mb-8 max-w-[240px] leading-relaxed">
                Build 8 comprehensive portfolios incorporating ChatGPT, Gemini, and Python APIs.
              </p>
              <button
                onClick={() => setShowPopup(true)}
                className="bg-[#06b6d4] hover:bg-[#0891b2] text-black font-bold py-3.5 px-8 rounded-full transition-all duration-300 flex items-center gap-2 shadow-[0_4px_14px_rgba(6,182,212,0.4)] hover:shadow-[0_6px_20px_rgba(6,182,212,0.6)] hover:-translate-y-0.5"
              >
                Start Learning <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATION */}
      <section className="py-24 px-6 bg-[#020617]">
        <div className="max-w-6xl mx-auto">
          <Certification />
        </div>
      </section>

      {/* SALARY GROWTH */}
      <SalaryGrowth domain="DataAnalytics" />

      {/* CAREER OUTCOMES */}
      <CareerOutcomes domain="DataAnalytics" />

      {/* MARKET LEADERS */}
      <MarketLeaders />

      {/* MEET YOUR MENTORS */}
      <MeetYourMentors />

      {/* PRICING */}
      <section className="py-24 px-6 bg-[#030712] border-t border-white/5" id="pricing">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#0ea5e9]/15 text-[#0ea5e9] font-extrabold text-[11px] uppercase tracking-[1.5px] px-5 py-2 rounded-full mb-5">
              Pricing & Financing
            </span>
            <h2 className="text-3xl md:text-[44px] font-black text-white tracking-tight mb-3">
              Invest in your future
            </h2>
            <p className="text-gray-400 text-lg">Transparent pricing. Flexible payment options.</p>
          </div>
          <PaymentPlanWidget basePrice={51999} durationMonths={6} courseName="Data Analytics" themeColor="#0ea5e9" />
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

      {showPopup && <AdvancedApplyPopup onClose={() => setShowPopup(false)} initialDomain="Data Analytics" />}
    </div>
  );
};

export default DataAnalytics;