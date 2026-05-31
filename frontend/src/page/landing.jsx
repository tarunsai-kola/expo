import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Users, Target, CheckCircle2, Clock, Code2, LineChart,
  Megaphone, BrainCircuit, ShieldCheck, Workflow, Server, Cpu, Database,
  Briefcase, TrendingUp, Landmark, Star, Sparkles, Quote, TerminalSquare,
  ChevronLeft, ChevronRight, Laptop, Award, ShieldAlert, BookOpen, Settings2
} from "lucide-react";
import "./landing.css"; // Static CSS

// Premium Assets
import techHeroBg from "../assets/tech_hero_bg.png";
import advanceHeroNew from "../assets/advance_hero_new.png";
import agentAiHero from "../assets/agent_ai_hero.png";
import AdvancedApplyPopup from "../Components/AdvancedApplyPopup";

const heroImages = [techHeroBg, advanceHeroNew, agentAiHero];

const companies = [
  "Google", "Amazon", "Microsoft", "Infosys", "TCS", "Wipro", "Accenture",
  "Deloitte", "IBM", "Capgemini", "Oracle", "Adobe", "Flipkart", "Swiggy",
  "Zomato", "PhonePe", "Razorpay", "CRED", "Meesho", "Freshworks",
];

const tracks = [
  {
    id: "ds-genai",
    title: "Data Science & Generative AI",
    icon: <BrainCircuit size={22} />,
    desc: "Master predictive modeling, deep learning, and architect LLM-powered applications. Become a dual-threat in traditional data science and modern GenAI.",
    duration: "6 Months",
    role: "AI / Data Scientist",
    outcomes: ["Predictive modeling & machine learning", "Build custom GPTs & RAG pipelines", "Deploy AI models to production", "Advanced Python & PyTorch"],
    link: "/Advance",
    glow: "rgba(99, 102, 241, 0.08)"
  },
  {
    id: "da-ai",
    title: "Data Analytics & AI",
    icon: <Database size={22} />,
    desc: "Combine traditional business intelligence with AI-driven analytics. Extract actionable insights and automate reporting using modern data tools.",
    duration: "5 Months",
    role: "Data Analyst / BI Developer",
    outcomes: ["Advanced SQL & Python", "Tableau & PowerBI Dashboards", "AI-assisted data analysis", "Real-world business capstones"],
    link: "/Advance",
    glow: "rgba(6, 182, 212, 0.08)"
  },
  {
    id: "ai-fsd",
    title: "AI-Powered Full Stack Development",
    icon: <Code2 size={22} />,
    desc: "Build secure, scalable MERN stack applications augmented with AI integrations. Learn to code faster with AI assistants and build intelligent features.",
    duration: "6 Months",
    role: "Full Stack Engineer",
    outcomes: ["React, Node.js, MongoDB", "Integrate OpenAI & LLM APIs", "System Design & Cloud Deployment", "Production-grade web apps"],
    link: "/SoftwareDeveloper",
    glow: "rgba(16, 185, 129, 0.08)"
  },
  {
    id: "cyber",
    title: "Cybersecurity",
    icon: <ShieldCheck size={22} />,
    desc: "Defend against modern digital threats. Learn ethical hacking, network security, and secure architecture for enterprise systems.",
    duration: "5 Months",
    role: "Security Analyst",
    outcomes: ["Vulnerability assessment & Pen-testing", "Network & Cloud Security", "Incident response protocols", "Security compliance & frameworks"],
    link: "/Advance",
    glow: "rgba(244, 63, 94, 0.08)"
  },
  {
    id: "dm-ai",
    title: "Digital Marketing & AI",
    icon: <Megaphone size={22} />,
    desc: "Execute high-ROI campaigns using AI-generated content and predictive analytics. Master SEO, performance marketing, and conversion optimization.",
    duration: "4 Months",
    role: "Growth Marketer",
    outcomes: ["Meta Ads & Google Ads mastery", "AI-driven content generation", "Advanced SEO & Analytics", "Conversion Rate Optimization"],
    link: "/Advance",
    glow: "rgba(245, 158, 11, 0.08)"
  },
];

const programSlides = [
  {
    id: "ds-genai",
    title: "Master Generative AI & Deep Learning",
    eyebrow: "Flagship AI Track",
    desc: "Build custom RAG pipelines, fine-tune LLMs, and architect autonomous multi-agent swarms using PyTorch and LangChain.",
    link: "/Advance",
    gradient: "from-[#1c1445] via-[#2e0b57] to-[#0b031c]",
    buttonText: "Explore AI Syllabus ↗",
    visualCards: [
      { logo: "Google", role: "AI Research Scientist", detail: "30 mins", action: "Attempt Mock" },
      { logo: "Meta", role: "LLM Engineer - 2", detail: "30 mins" },
      { logo: "Microsoft", role: "GenAI Architect", detail: "45 mins" }
    ]
  },
  {
    id: "ai-fsd",
    title: "Build Enterprise MERN & Next.js Systems",
    eyebrow: "Engineering Fast-Track",
    desc: "Code 10x faster with AI copilots, deploy containerized cloud networks, and architect distributed backend architectures.",
    link: "/SoftwareDeveloper",
    gradient: "from-[#022c20] via-[#044030] to-[#01140e]",
    buttonText: "Explore SDE Syllabus ↗",
    visualCards: [
      { logo: "Microsoft", role: "Software Developer - 2", detail: "45 mins", action: "Attempt Mock" },
      { logo: "Uber", role: "Backend Architect", detail: "30 mins" },
      { logo: "Amazon", role: "SDE 1 (MERN Cluster)", detail: "45 mins" }
    ]
  },
  {
    id: "da-ai",
    title: "Extract Executive Intelligence with SQL & BI",
    eyebrow: "Advanced Analytics Track",
    desc: "Command large-scale datasets, automate reporting models, and design real-time high-performance business dashboards.",
    link: "/Advance",
    gradient: "from-[#052b38] via-[#0a3f52] to-[#021217]",
    buttonText: "Explore Analytics Syllabus ↗",
    visualCards: [
      { logo: "Meta", role: "Business Intelligence Analyst", detail: "30 mins", action: "Attempt Mock" },
      { logo: "Netflix", role: "Senior Data Analyst", detail: "45 mins" },
      { logo: "Google", role: "Data Scientist (BI Lead)", detail: "30 mins" }
    ]
  },
  {
    id: "cyber",
    title: "Ethical Hacking & Zero-Trust Cloud Defense",
    eyebrow: "SecOps Track",
    desc: "Defend against enterprise-grade digital threats, learn cloud penetration testing, and establish high-security compliance audits.",
    link: "/Advance",
    gradient: "from-[#420412] via-[#630920] to-[#1c0106]",
    buttonText: "Explore Cybersecurity Syllabus ↗",
    visualCards: [
      { logo: "CrowdStrike", role: "Ethical Pen-Tester", detail: "45 mins", action: "Attempt Mock" },
      { logo: "Palo Alto", role: "Cloud Security Specialist", detail: "30 mins" },
      { logo: "Cisco", role: "Network Security Auditor", detail: "45 mins" }
    ]
  },
  {
    id: "dm-ai",
    title: "High-ROI Performance Marketing & Copywriting",
    eyebrow: "Growth & Business Track",
    desc: "Deploy automated campaign routines, optimize high-conversion funnels, and write high-ranking copy with custom LLM fine-tunes.",
    link: "/Advance",
    gradient: "from-[#3b1502] via-[#5c2405] to-[#1a0800]",
    buttonText: "Explore Marketing Syllabus ↗",
    visualCards: [
      { logo: "Razorpay", role: "Growth Performance Lead", detail: "30 mins", action: "Attempt Mock" },
      { logo: "Flipkart", role: "SEO Automator Architect", detail: "45 mins" },
      { logo: "Swiggy", role: "Ad Campaign Specialist", detail: "30 mins" }
    ]
  }
];

const cohortSlides = [
  {
    step: "01",
    phase: "Systems & Backend Foundations",
    duration: "Weeks 1–4",
    detail: "Master core software engineering principles in Java or Python. Dive deep into clean OOP logic, algorithmic complexity, concurrency frameworks, and technical problem-solving patterns.",
    outcome: "Write highly optimized, readable, and benchmarked core code foundations.",
    icon: <Cpu size={24} className="text-indigo-400" />
  },
  {
    step: "02",
    phase: "Database Architecture & Optimization",
    duration: "Weeks 5–8",
    detail: "Learn data storage optimization. Design structured database schemas, write advanced optimized SQL queries, configure transaction isolation, and learn NoSQL databases like MongoDB.",
    outcome: "Architect low-latency, scalable database layers that handle complex relational models.",
    icon: <Database size={24} className="text-cyan-400" />
  },
  {
    step: "03",
    phase: "Modern Client-Side Applications",
    duration: "Weeks 9–12",
    detail: "Construct high-performance frontends. Work with React, Next.js, and TypeScript, implement state management using Redux Toolkit, and set up modern secure routing protocols.",
    outcome: "Create seamless client dashboards optimized for fast initial rendering.",
    icon: <Laptop size={24} className="text-teal-400" />
  },
  {
    step: "04",
    phase: "DevOps & Cloud Deployment Infrastructure",
    duration: "Weeks 13–14",
    detail: "Configure native operations. Containerize application builds with Docker, orchestrate scalable node clusters on Kubernetes, and deploy directly to AWS services using automated CI/CD triggers.",
    outcome: "Scale web systems globally with zero-downtime integration capabilities.",
    icon: <Server size={24} className="text-emerald-400" />
  },
  {
    step: "05",
    phase: "Applied Generative AI & Agents",
    duration: "Weeks 15–16",
    detail: "Embed native artificial intelligence features. Learn prompt pipelines, integrate OpenAI/Anthropic APIs, implement vector search models with custom RAG systems, and build multi-agent flows.",
    outcome: "Deploy intelligent automation modules executing active user tasks autonomously.",
    icon: <BrainCircuit size={24} className="text-amber-400" />
  },
  {
    step: "06",
    phase: "Corporate Sprints & Placements",
    duration: "Weeks 17–24",
    detail: "Execute end-to-end projects in agile, collaborative team structures. Refine personal developer portfolios, complete simulated SDE code boards, and gain direct referrals into corporate staffing tiers.",
    outcome: "Pass core tech evaluation boards and secure high-paying tech vacancies.",
    icon: <Award size={24} className="text-rose-400" />
  }
];

const testimonials = [
  { id: 1, quote: "Atorax didn't just teach me to code; they taught me how to be an engineer. The curriculum is exactly what hiring managers look for. I got multiple offers before the program even ended.", author: "Rohan S.", role: "SDE at TCS Digital", initial: "RS", color: "from-indigo-400 to-purple-400" },
  { id: 2, quote: "The mentorship is unmatched. My mentor was a Senior Engineer at Microsoft and he completely overhauled the way I approach System Design. Worth every penny.", author: "Priya M.", role: "Backend Developer at Razorpay", initial: "PM", color: "from-emerald-400 to-teal-400" },
  { id: 3, quote: "Transitioning from a non-CS background was terrifying, but the structured path and 1:1 support gave me confidence. Six months later, I'm working my dream job.", author: "Karan D.", role: "Data Analyst at Fractal", initial: "KD", color: "from-cyan-400 to-blue-400" },
];

const HeroBackground = ({ images }) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(bgInterval);
  }, [images.length]);

  return (
    <div className="absolute inset-0 z-0 bg-[#06080c] overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentBgIndex}
          src={images[currentBgIndex]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.28, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          alt="Cinematic Background"
          className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity grayscale"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-[#080A10]/90 to-[#080A10] z-10"></div>
    </div>
  );
};

const renderCompanyLogo = (companyName) => {
  const name = companyName.toLowerCase();
  if (name.includes("google")) {
    return (
      <div className="flex items-center gap-1.5 select-none">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
        </svg>
        <span className="text-[11px] font-bold text-zinc-100">Google</span>
      </div>
    );
  }
  if (name.includes("meta")) {
    return (
      <div className="flex items-center gap-1.5 select-none">
        <svg className="w-3.5 h-3.5 text-[#0064e0]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3a9 9 0 0 0-6.36 15.36L8.46 15.5A5.5 5.5 0 0 1 12 6.5a5.5 5.5 0 0 1 3.54 9l2.82 2.86A9 9 0 0 0 12 3zm0 18a9 9 0 0 0 6.36-15.36l-2.82 2.86a5.5 5.5 0 0 1-3.54 9 5.5 5.5 0 0 1-3.54-9l-2.82-2.86A9 9 0 0 0 12 21z" fill="currentColor"/>
        </svg>
        <span className="text-[11px] font-bold text-zinc-100">Meta</span>
      </div>
    );
  }
  if (name.includes("microsoft")) {
    return (
      <div className="flex items-center gap-1.5 select-none">
        <div className="grid grid-cols-2 gap-0.5 shrink-0 select-none">
          <span className="w-1.5 h-1.5 bg-[#f25022]" /><span className="w-1.5 h-1.5 bg-[#7fba00]" />
          <span className="w-1.5 h-1.5 bg-[#00a4ef]" /><span className="w-1.5 h-1.5 bg-[#ffb900]" />
        </div>
        <span className="text-[11px] font-bold text-zinc-100">Microsoft</span>
      </div>
    );
  }
  if (name.includes("amazon")) {
    return (
      <div className="flex items-center gap-1.5 select-none">
        <span className="text-[#ff9900] font-black text-xs">a</span>
        <span className="text-[11px] font-bold text-zinc-100">Amazon</span>
      </div>
    );
  }
  if (name.includes("netflix")) {
    return (
      <div className="flex items-center gap-1.5 select-none">
        <span className="text-[#e50914] font-black text-xs">N</span>
        <span className="text-[11px] font-bold text-zinc-100">Netflix</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 select-none">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
      <span className="text-[11px] font-bold text-zinc-100 capitalize">{companyName}</span>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTrack, setActiveTrack] = useState(tracks[0]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  // Auto-advance program slides every 6 seconds
  useEffect(() => {
    const progInterval = setInterval(() => {
      setCurrentProgramIndex((prev) => (prev + 1) % programSlides.length);
    }, 6000);
    return () => clearInterval(progInterval);
  }, []);

  const handleNextProgram = () => {
    setCurrentProgramIndex((prev) => (prev + 1) % programSlides.length);
  };

  const handlePrevProgram = () => {
    setCurrentProgramIndex((prev) => (prev - 1 + programSlides.length) % programSlides.length);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-advance cohort progression slides every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % cohortSlides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % cohortSlides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + cohortSlides.length) % cohortSlides.length);
  };

  return (
    <div className="lp-bg min-h-screen selection:bg-indigo-500/30">
      <Helmet>
        <title>Atorax | Premium Advanced Tech Programs & Elite Placements</title>
        <meta name="description" content="Accelerate your technology career with industry-led advanced software engineering, AI, and data science programs backed by 1:1 expert mentorship." />
      </Helmet>

      {/* ─── Hero Section ─── */}
      <section style={{ position: "relative", minHeight: "95vh", display: "flex", alignItems: "center", overflow: "hidden", padding: "110px 0 80px" }}>
        <HeroBackground images={heroImages} />

        {/* Subtle Accent Glows */}
        <div className="absolute top-[20%] left-[15%] w-[40vw] aspect-square bg-indigo-650/5 rounded-full blur-[140px] pointer-events-none mix-blend-screen z-0"></div>
        <div className="absolute bottom-[15%] right-[10%] w-[35vw] aspect-square bg-emerald-500/3 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0"></div>

        <div className="relative z-10 w-full max-w-[1250px] mx-auto px-6">
          <div className="lp-hero-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Premium Subtle Glass Badge */}
              <div className="mb-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-white/5 bg-white/[0.02] backdrop-blur-2xl text-zinc-400">
                <div className="relative flex items-center justify-center w-1.5 h-1.5 shrink-0">
                  <span className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="absolute w-3 h-3 rounded-full bg-emerald-400/40 animate-ping" />
                </div>
                The Flagship Career Platform
              </div>

              {/* Epic Subtle Metallic Title */}
              <h1 className="lp-font-outfit text-white font-extrabold leading-[1.05] tracking-tight mb-8" style={{ fontSize: "clamp(46px, 5.8vw, 80px)" }}>
                Where ambitious <br className="hidden md:block"/>
                students become <br className="hidden md:block"/>
                <span className="subtle-gradient-text">
                  hireable tech leaders.
                </span>
              </h1>

              <p style={{ fontSize: "clamp(16px, 1.4vw, 19px)", color: "#94a3b8", lineHeight: 1.6, maxWidth: "580px", marginBottom: "44px" }} className="font-light">
                Accelerate your technical trajectory. We offer rigorous curriculums, 1:1 senior engineering mentorship, and pathways to 500+ top tech partners.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 items-center mb-10">
                {/* Conic Border Button */}
                <div className="relative group rounded-full p-[1.5px] overflow-hidden shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:shadow-[0_0_40px_rgba(99,102,241,0.35)] transition-all">
                  <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_240deg,rgba(99,102,241,0.6)_360deg)] animate-[spin_4s_linear_infinite]" />
                  <div className="absolute inset-0 bg-indigo-650/15 backdrop-blur-md" />
                  <button
                    onClick={() => navigate("/Advance")}
                    className="relative px-8 h-[50px] text-sm font-bold tracking-wide rounded-full bg-[#080A10]/95 text-white hover:bg-[#080A10]/75 transition-colors flex items-center justify-center gap-2.5 border border-white/5"
                  >
                    Explore Advanced Programs <ArrowRight size={15} />
                  </button>
                </div>

                {/* Frost Outline Button */}
                <button
                  onClick={() => setShowPopup(true)}
                  className="px-8 h-[50px] text-sm font-bold tracking-wide rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-2xl text-zinc-300 hover:bg-white/[0.08] hover:border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  Schedule Consultation
                </button>
              </div>
            </motion.div>

            {/* Premium Stat Card Block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center lg:items-end w-full"
            >
              <div className="w-full max-w-[410px] bg-[#0C0E16]/80 rounded-[32px] p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.02] to-transparent z-0 pointer-events-none" />
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/[0.04] rounded-full blur-2xl pointer-events-none" />

                <h3 className="text-white font-extrabold text-lg mb-6 flex items-center gap-2">
                  <Sparkles className="text-indigo-400" size={16} /> Verified Platform Outputs
                </h3>

                <div className="flex flex-col gap-5">
                  {/* Placements */}
                  <div className="flex items-center gap-4 bg-white/[0.01] border border-white/5 rounded-2xl p-4 group-hover:border-indigo-500/10 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/5 flex items-center justify-center border border-indigo-500/15 text-indigo-300">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">Verified Placements</p>
                      <p className="text-white text-xl font-black leading-none">4500+</p>
                    </div>
                  </div>

                  {/* Salary Hike */}
                  <div className="flex items-center gap-4 bg-white/[0.01] border border-white/5 rounded-2xl p-4 group-hover:border-emerald-500/10 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/5 flex items-center justify-center border border-emerald-500/15 text-emerald-300">
                      <TrendingUp size={18} />
                    </div>
                    <div>
                      <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">Average Salary Increase</p>
                      <p className="text-white text-xl font-black leading-none">Upto 350%</p>
                    </div>
                  </div>

                  {/* ROI */}
                  <div className="flex items-center gap-4 bg-white/[0.01] border border-white/5 rounded-2xl p-4 group-hover:border-cyan-500/10 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/5 flex items-center justify-center border border-cyan-500/15 text-cyan-300">
                      <Landmark size={18} />
                    </div>
                    <div>
                      <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">Estimated Program ROI</p>
                      <p className="text-white text-xl font-black leading-none">10X to 20X</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4.5 border-t border-white/5 text-center text-zinc-500 text-xs flex justify-center items-center gap-1.5">
                  <Award size={13} className="text-indigo-400" /> Endorsed by top 500+ corporate hiring layers
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Company Marquee ─── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.03)", background: "#05060a", padding: "36px 0", overflow: "hidden" }}>
        <div style={{ overflow: "hidden", maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}>
          <div className="lp-marquee" style={{ display: "flex", gap: "0", width: "max-content" }}>
            {[...companies, ...companies].map((c, i) => (
              <div key={i} style={{ padding: "10px 32px", whiteSpace: "nowrap", fontSize: "13px", fontWeight: 700, color: "#475569", borderRight: "1px solid rgba(255,255,255,0.03)", flexShrink: 0, letterSpacing: "2px" }} className="uppercase">{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bento Edge Section ─── */}
      <section style={{ padding: "110px 0", background: "#080A10" }} id="edge">
        <div style={{ width: "min(92%, 1250px)", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#818cf8", background: "rgba(129,140,248,0.08)", padding: "6px 16px", borderRadius: "99px", marginBottom: "16px" }}>
              Core Philosophy
            </span>
            <h2 className="lp-font-outfit text-white font-extrabold leading-tight text-glow" style={{ fontSize: "clamp(30px, 4.2vw, 50px)", maxWidth: "800px", margin: "0 auto" }}>
              We build programs the way technology companies build software.
            </h2>
          </div>

          <div className="bento-grid">
            {/* Large Bento Card */}
            <div className="bento-large glass-panel rounded-[32px] p-10 flex flex-col justify-end relative overflow-hidden group border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute top-10 right-10 p-4.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-indigo-400">
                <Server size={34} strokeWidth={1.5} />
              </div>

              <div className="relative z-10 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest text-indigo-300 mb-6">
                  <Cpu size={11} /> Infrastructure
                </div>
                <h3 className="lp-font-outfit text-2xl md:text-3xl font-extrabold text-white mb-4">Master Complex Enterprise Architectures.</h3>
                <p className="text-zinc-400 text-[15px] leading-relaxed mb-6 font-light">
                  No toy databases. Learn to configure clean distributed backend endpoints, optimize SQL indexing, implement container clusters, and manage scalable cloud server workflows.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["System Design", "Cloud Native", "Kubernetes", "Generative AI"].map((tag, i) => (
                    <span key={i} className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs font-semibold text-zinc-300">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Side Bento Card 1 */}
            <div className="glass-panel rounded-[32px] p-8 flex flex-col justify-between relative overflow-hidden group border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/5 text-emerald-400 flex items-center justify-center border border-emerald-500/15 mb-8 group-hover:scale-105 transition-transform">
                <Laptop size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2.5">Live Mentorship</h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  Architectural progress audits and weekly casework feedback loops led by active industry practitioners.
                </p>
              </div>
            </div>

            {/* Side Bento Card 2 */}
            <div className="glass-panel rounded-[32px] p-8 flex flex-col justify-between relative overflow-hidden group border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/5 text-cyan-400 flex items-center justify-center border border-cyan-500/15 mb-8 group-hover:scale-105 transition-transform">
                <Users size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2.5">Platform Placements</h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  Unlock priority referral pipelines to corporate staffing networks across our verified corporate network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEW SECTION: Interactive Cohort Pedagogy Slideshow ─── */}
      <section style={{ padding: "110px 0", background: "#0A0D14", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
        <div style={{ width: "min(92%, 1250px)", margin: "0 auto" }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="inline-block bg-[#818cf8]/10 text-[#818cf8] font-extrabold text-[11px] uppercase tracking-[2px] px-5 py-2 rounded-full mb-5">
                Cohort Progression
              </span>
              <h2 className="lp-font-outfit text-white font-extrabold tracking-tight leading-tight" style={{ fontSize: "clamp(30px, 4.5vw, 48px)" }}>
                The Atorax Execution Path
              </h2>
              <p className="text-zinc-400 text-base mt-2 font-light">
                An active, milestone-driven execution framework to secure your dream role.
              </p>
            </div>

            {/* Subtle Navigation Buttons */}
            <div className="flex gap-3">
              <button onClick={handlePrevSlide} className="slide-control-btn" aria-label="Previous Slide">
                <ChevronLeft size={20} />
              </button>
              <button onClick={handleNextSlide} className="slide-control-btn" aria-label="Next Slide">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Frosted Glass Slide Viewer */}
          <div className="glass-panel rounded-[32px] p-8 md:p-14 shadow-2xl relative overflow-hidden min-h-[380px] flex flex-col justify-between border border-white/5">
            <div className="absolute top-0 right-0 p-10 bg-indigo-500/[0.01] pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-center relative z-10"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {cohortSlides[activeSlide].icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-0.5">Timeline Sequence</span>
                      <span className="text-xs font-bold text-zinc-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">{cohortSlides[activeSlide].duration}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3.5xl font-extrabold text-white mb-5">
                    <span className="text-indigo-400 mr-3">{cohortSlides[activeSlide].step}.</span>
                    {cohortSlides[activeSlide].phase}
                  </h3>

                  <p className="text-zinc-400 text-[16px] leading-relaxed mb-6 font-light">
                    {cohortSlides[activeSlide].detail}
                  </p>
                </div>

                <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6.5 lg:p-8">
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3.5">Milestone Outcome</h4>
                  <p className="text-zinc-200 text-sm md:text-base font-semibold leading-relaxed">
                    {cohortSlides[activeSlide].outcome}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Indicators */}
            <div className="flex gap-2 mt-10 border-t border-white/5 pt-6 relative z-10">
              {cohortSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`h-1 rounded-full transition-all duration-300 border-none cursor-pointer ${
                    i === activeSlide ? "w-8 bg-indigo-400" : "w-2 bg-zinc-800 hover:bg-zinc-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Flagship Programs Slider (New Slide Visual Carousel) ─── */}
      <section style={{ padding: "110px 0", background: "#080A10", overflow: "hidden" }} id="flagship-programs">
        <div style={{ width: "min(92%, 1250px)", margin: "0 auto", textAlign: "center", marginBottom: "56px" }}>
          <span className="inline-block bg-[#818cf8]/10 text-[#818cf8] font-extrabold text-[11px] uppercase tracking-[2px] px-5 py-2 rounded-full mb-5">
            Flagship Specializations
          </span>
          <h2 className="lp-font-outfit text-white font-extrabold tracking-tight leading-tight text-glow" style={{ fontSize: "clamp(30px, 4.5vw, 48px)" }}>
            Specialized Career Paths
          </h2>
          <p className="text-zinc-400 text-base mt-2 font-light max-w-xl mx-auto">
            Acquire elite system design and AI capabilities through industry-certified program tracks.
          </p>
        </div>

        {/* Center-Peek Slider Canvas */}
        <div className="program-slider-canvas select-none">
          <div className="py-4 overflow-hidden">
            <div 
              className="program-slider-track items-center"
              style={{
                transform: `translateX(calc(50vw - (var(--slide-width) / 2) - (${currentProgramIndex} * (var(--slide-width) + var(--slide-gap)))))`,
                width: "max-content"
              }}
            >
              {programSlides.map((slide, idx) => {
                const isActive = idx === currentProgramIndex;
                return (
                  <div
                    key={slide.id}
                    className={`program-slide-card rounded-[32px] p-6 md:p-12 overflow-hidden bg-gradient-to-r ${slide.gradient} border border-white/10 ${
                      isActive ? "opacity-100 scale-100 shadow-[0_20px_50px_rgba(0,0,0,0.55)]" : "opacity-30 scale-95 pointer-events-none"
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-8 lg:gap-12 items-center">
                      {/* Left Side Program Details */}
                      <div>
                        <div className="inline-block bg-white/10 border border-white/10 text-white text-[9px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-6">
                          {slide.eyebrow}
                        </div>
                        <h3 className="lp-font-outfit text-white font-extrabold leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(23px, 3.2vw, 36px)" }}>
                          {slide.title}
                        </h3>
                        <p className="text-zinc-200 text-sm md:text-[15px] leading-relaxed mb-8 font-light max-w-xl">
                          {slide.desc}
                        </p>
                        
                        <button
                          onClick={() => navigate(slide.link)}
                          className="px-7 h-[48px] bg-white text-zinc-950 font-extrabold rounded-xl hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 text-sm shadow-lg hover:-translate-y-0.5"
                        >
                          {slide.buttonText}
                        </button>
                      </div>

                      {/* Right Side Visual Cards Stack (Fidelity Mock & Accurate Brand Logos) */}
                      <div className="relative h-[220px] flex items-center justify-center">
                        <div className="relative w-full max-w-[320px] h-[180px]">
                          {/* Card 1: Bottom / Microsoft (Blurred offset, peeks at top) */}
                          <div className="absolute top-[0px] left-1/2 transform -translate-x-1/2 w-[88%] bg-[#12131a]/85 border border-white/5 rounded-2xl p-3 shadow-xl opacity-30 blur-[0.6px] z-0 select-none">
                            <div className="flex justify-between items-center">
                              {renderCompanyLogo(slide.visualCards[2].logo)}
                              <div className="flex items-center gap-1 select-none">
                                <Clock size={9} className="text-zinc-600" />
                                <span className="text-[9px] text-zinc-650 tracking-wide font-medium">{slide.visualCards[2].detail}</span>
                              </div>
                            </div>
                          </div>

                          {/* Card 2: Middle / Meta (Semi-opaque offset, peeks in middle) */}
                          <div className="absolute top-[26px] left-1/2 transform -translate-x-1/2 w-[94%] bg-[#0d0e12]/95 border border-white/10 rounded-2xl p-3.5 shadow-2xl opacity-70 blur-[0.3px] z-10 select-none">
                            <div className="flex justify-between items-center">
                              {renderCompanyLogo(slide.visualCards[1].logo)}
                              <div className="flex items-center gap-1 select-none">
                                <Clock size={9} className="text-zinc-550" />
                                <span className="text-[9px] text-zinc-500 tracking-wide font-medium">{slide.visualCards[1].detail}</span>
                              </div>
                            </div>
                          </div>

                          {/* Card 3: Top / Google (Fully sharp card in front, positioned at bottom) */}
                          <div className="absolute top-[56px] left-1/2 transform -translate-x-1/2 w-[100%] bg-[#08090d] border border-white/20 rounded-2xl p-5 shadow-2xl z-20">
                            <div className="flex justify-between items-center border-b border-white/10 pb-2.5 mb-3.5">
                              {renderCompanyLogo(slide.visualCards[0].logo)}
                              <div className="flex items-center gap-1 select-none">
                                <Clock size={10} className="text-zinc-550" />
                                <span className="text-[9px] text-zinc-400 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/5 tracking-wide">{slide.visualCards[0].detail}</span>
                              </div>
                            </div>
                            
                            <p className="text-white text-xs font-black tracking-wide mb-4 leading-tight">{slide.visualCards[0].role}</p>
                            
                            <button
                              onClick={() => navigate(slide.link)}
                              className="w-full py-2 bg-[#12131a] hover:bg-[#1a1c26] border border-white/10 text-white font-extrabold text-[10px] rounded-lg tracking-wider transition-all select-none"
                            >
                              {slide.visualCards[0].action}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Unified Navigation Arrow & Pagination Row */}
          <div className="flex items-center justify-center gap-4 mt-8 select-none">
            <button onClick={handlePrevProgram} className="slide-control-btn w-9 h-9" aria-label="Previous Program">
              <ChevronLeft size={16} />
            </button>
            
            <div className="flex gap-2">
              {programSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentProgramIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 border-none cursor-pointer ${
                    i === currentProgramIndex ? "w-6 bg-blue-500" : "w-2 bg-zinc-800 hover:bg-zinc-700"
                  }`}
                />
              ))}
            </div>

            <button onClick={handleNextProgram} className="slide-control-btn w-9 h-9" aria-label="Next Program">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── NEW SECTION: Outcome Powerhouse (Your Recipe for a Rockstar Career) ─── */}
      <section style={{ padding: "110px 0", background: "#06080C", borderTop: "1px solid rgba(255,255,255,0.03)" }} id="rockstar-recipe">
        <div style={{ width: "min(92%, 1250px)", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "70px" }}>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#818cf8", background: "rgba(129,140,248,0.08)", padding: "6px 16px", borderRadius: "99px", marginBottom: "16px" }}>
              Welcome to the Outcome Powerhouse
            </span>
            <h2 className="lp-font-outfit text-white font-extrabold leading-tight text-glow" style={{ fontSize: "clamp(30px, 4.5vw, 48px)", maxWidth: "800px", margin: "0 auto" }}>
              Your Recipe for a Rockstar Career
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 540px), 1fr))", gap: "30px" }}>
            {/* Card 1: Get Referrals */}
            <div className="glass-panel rounded-[28px] p-8 md:p-10 border border-white/5 flex flex-col md:flex-row justify-between gap-8 group overflow-hidden relative min-h-[380px] transition-all duration-500 hover:border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.01] to-transparent pointer-events-none" />
              
              <div className="flex flex-col justify-between relative z-10 w-full md:w-[45%]">
                <div>
                  <span style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", color: "#f59e0b", background: "rgba(245,158,11,0.08)", padding: "5px 12px", borderRadius: "99px", marginBottom: "18px" }} className="uppercase">
                    Access 3000+ Companies
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-snug lp-font-outfit">Get Referrals</h3>
                  <p className="text-zinc-400 text-[14.5px] leading-relaxed font-light">
                    Boost your job prospects with direct developer referrals from our vast enterprise network of companies.
                  </p>
                </div>
              </div>

              {/* Logo Cloud Visual (Fully Stylized & Non-Overlapping) */}
              <div className="relative z-10 w-full md:w-[50%] h-[260px] bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center p-4">
                <div className="relative w-full h-[220px]">
                  {/* Google */}
                  <div className="absolute top-[6%] left-[8%] px-4 py-2.5 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] flex items-center gap-2 transform -rotate-6 transition-transform group-hover:scale-105 duration-300">
                    <span className="text-blue-500 font-extrabold text-sm select-none">G</span>
                    <span className="text-zinc-800 text-xs font-bold">Google</span>
                  </div>
                  {/* Microsoft */}
                  <div className="absolute bottom-[8%] right-[6%] px-4 py-2.5 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] flex items-center gap-2 transform rotate-3 transition-transform group-hover:scale-105 duration-300">
                    <div className="grid grid-cols-2 gap-0.5 shrink-0 select-none">
                      <span className="w-1.5 h-1.5 bg-[#f25022]" /><span className="w-1.5 h-1.5 bg-[#7fba00]" />
                      <span className="w-1.5 h-1.5 bg-[#00a4ef]" /><span className="w-1.5 h-1.5 bg-[#ffb900]" />
                    </div>
                    <span className="text-zinc-800 text-xs font-bold">Microsoft</span>
                  </div>
                  {/* Infosys */}
                  <div className="absolute top-[40%] left-[38%] px-4 py-2 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] flex items-center gap-2 transform rotate-12 transition-transform group-hover:scale-105 duration-300">
                    <span className="text-[#007cc3] font-black text-xs select-none">Infosys</span>
                  </div>
                  {/* PayPal */}
                  <div className="absolute bottom-[12%] left-[8%] px-4 py-2 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] flex items-center gap-2 transform -rotate-12 transition-transform group-hover:scale-105 duration-300">
                    <span className="text-[#003087] font-black text-xs select-none">PayPal</span>
                  </div>
                  {/* NVIDIA */}
                  <div className="absolute top-[10%] right-[10%] px-4 py-2 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] flex items-center gap-2 transform rotate-6 transition-transform group-hover:scale-105 duration-300">
                    <span className="text-[#76b900] font-black text-xs select-none">NVIDIA</span>
                  </div>
                  {/* Meesho */}
                  <div className="absolute top-[38%] left-[6%] px-3 py-1.5 bg-white border border-gray-100 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.25)] text-[#ff3f6c] text-[10px] font-black tracking-tight transform -rotate-3 select-none">meesho</div>
                  {/* Rapido */}
                  <div className="absolute top-[48%] right-[8%] px-3 py-1.5 bg-white border border-gray-100 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.25)] text-[#27272a] text-[10px] font-black tracking-tight transform rotate-6 select-none">rapido</div>
                  {/* Flipkart */}
                  <div className="absolute bottom-[10%] left-[40%] px-3.5 py-2 bg-white border border-gray-100 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] text-[#1f74e5] text-xs font-black transform -rotate-6 select-none">Flipkart</div>
                </div>
              </div>
            </div>

            {/* Card 2: Company-Specific Prep */}
            <div className="glass-panel rounded-[28px] p-8 md:p-10 border border-white/5 flex flex-col md:flex-row justify-between gap-8 group overflow-hidden relative min-h-[380px] transition-all duration-500 hover:border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.01] to-transparent pointer-events-none" />
              
              <div className="flex flex-col justify-between relative z-10 w-full md:w-[45%]">
                <div>
                  <span style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", color: "#3b82f6", background: "rgba(59,130,246,0.08)", padding: "5px 12px", borderRadius: "99px", marginBottom: "18px" }} className="uppercase">
                    Unlimited 1:1 Mock Prep
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-snug lp-font-outfit">Company-Specific Mock Prep</h3>
                  <p className="text-zinc-400 text-[14.5px] leading-relaxed font-light">
                    Get ready for core evaluations with heavily customized, rigorous 1-on-1 mock interviews tailored specifically for your target companies.
                  </p>
                </div>
              </div>

              {/* Calendar Planner Visual (Fixed Height) */}
              <div className="relative z-10 w-full md:w-[50%] h-[260px] bg-[#080B10] border border-white/5 rounded-2xl overflow-hidden p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-2 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Tailored Planner</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[9px] font-bold text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase">MAY 29</span>
                    <span className="text-[9px] font-bold text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 uppercase">MAY 30</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 flex-grow justify-center">
                  {/* Task 1: Amazon Practice */}
                  <div className="relative bg-[#C2410C]/90 rounded-xl p-3 border border-[#EA580C]/20 shadow-lg flex flex-col justify-between min-h-[82px] group-hover:translate-x-1 transition-transform">
                    <div>
                      <p className="text-[9px] font-bold text-orange-200/80 mb-0.5 leading-none">Practice Interview</p>
                      <h4 className="text-white text-xs font-extrabold leading-tight">Scheduled for Amazon</h4>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                      <span className="text-[9px] font-bold text-orange-200">14:30 - 15:30</span>
                      <span className="px-2.5 py-1 bg-white text-[8px] font-black text-orange-950 rounded-full flex items-center gap-1 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" /> Join Mock
                      </span>
                    </div>
                  </div>

                  {/* Task 2: Amazon Round 1 */}
                  <div className="bg-[#1E3A8A]/90 rounded-xl p-3 border border-[#2563EB]/20 shadow-lg min-h-[64px] flex flex-col justify-between">
                    <div>
                      <p className="text-[9px] font-bold text-blue-200/80 mb-0.5 leading-none">Round 1 Interview</p>
                      <h4 className="text-white text-xs font-extrabold leading-tight">Scheduled for Amazon</h4>
                    </div>
                    <div className="flex justify-between items-center mt-2.5">
                      <span className="text-[9px] font-bold text-blue-200">15:30 - 16:30</span>
                      <span className="text-[8px] font-bold text-blue-300">Hosted by Atorax</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Live Coding Practice */}
            <div className="glass-panel rounded-[28px] p-8 md:p-10 border border-white/5 flex flex-col md:flex-row justify-between gap-8 group overflow-hidden relative min-h-[380px] transition-all duration-500 hover:border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.01] to-transparent pointer-events-none" />
              
              <div className="flex flex-col justify-between relative z-10 w-full md:w-[45%]">
                <div>
                  <span style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", color: "#10b981", background: "rgba(16,185,129,0.08)", padding: "5px 12px", borderRadius: "99px", marginBottom: "18px" }} className="uppercase">
                    Interactive Coding Sessions
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-snug lp-font-outfit">Live Coding Practice</h3>
                  <p className="text-zinc-400 text-[14.5px] leading-relaxed font-light">
                    Improve your core systems execution skills with weekly live coding exercises and real time feedback.
                  </p>
                </div>
              </div>

              {/* Live split mockup (Fixed Height) */}
              <div className="relative z-10 w-full md:w-[50%] h-[260px] grid grid-cols-[0.8fr_1.2fr] gap-3.5 bg-[#080B10] border border-white/5 rounded-2xl p-3.5 overflow-hidden">
                {/* Left: Video panel */}
                <div className="relative h-full bg-[#171923] rounded-xl overflow-hidden flex flex-col justify-between p-2.5 border border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="px-1.5 py-0.5 rounded bg-red-600 text-white text-[8px] font-bold tracking-wider">LIVE</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  {/* Mentor avatar visual */}
                  <div className="flex flex-col items-center justify-center flex-grow py-2">
                    <div className="w-11 h-11 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400">SL</div>
                    <span className="text-[9px] font-bold text-zinc-300 mt-2">Suryansh L.</span>
                  </div>
                  <div className="text-[8px] text-zinc-500 font-medium text-center">Mentor Lead</div>
                </div>

                {/* Right: Code editor console */}
                <div className="relative h-full bg-[#05070A] rounded-xl border border-white/5 overflow-hidden flex flex-col justify-between p-3 font-mono text-[9px] text-zinc-400">
                  <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-red-500/60" /><span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <span className="text-[8px] text-zinc-500 ml-1.5 select-none">solution.py</span>
                  </div>
                  <div className="flex-grow select-none flex flex-col gap-1 leading-normal font-medium overflow-hidden">
                    <div className="text-zinc-650">1  <span className="text-purple-400 font-bold">def</span> twoSum(nums, target):</div>
                    <div className="text-zinc-400">2      seen = {}</div>
                    <div className="text-zinc-400">3      <span className="text-purple-400 font-bold">for</span> i, n <span className="text-indigo-400 font-bold">in</span> enumerate(nums):</div>
                    <div className="text-zinc-400">4          diff = target - n</div>
                    <div className="text-zinc-300">5          <span className="text-purple-400 font-bold">if</span> diff <span className="text-indigo-400 font-bold">in</span> seen:</div>
                    <div className="text-emerald-400">6              <span className="text-purple-400 font-bold">return</span> [seen[diff], i]</div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-1.5 text-[8px] text-emerald-400/90 font-extrabold select-none shrink-0">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 shadow-lg animate-pulse" /> Verified Compile
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Career Support */}
            <div className="glass-panel rounded-[28px] p-8 md:p-10 border border-white/5 flex flex-col md:flex-row justify-between gap-8 group overflow-hidden relative min-h-[380px] transition-all duration-500 hover:border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/[0.01] to-transparent pointer-events-none" />
              
              <div className="flex flex-col justify-between relative z-10 w-full md:w-[45%]">
                <div>
                  <span style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", color: "#f43f5e", background: "rgba(244,63,94,0.08)", padding: "5px 12px", borderRadius: "99px", marginBottom: "18px" }} className="uppercase">
                    Lifetime Placement Assistance
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-snug lp-font-outfit">Career Support</h3>
                  <p className="text-zinc-400 text-[14.5px] leading-relaxed font-light">
                    Continue to receive targeted tech vacancies and active referral support as an alumnus.
                  </p>
                </div>
              </div>

              {/* Connected Timeline Node Graph (Fidelity alignment, No Collisions) */}
              <div className="relative z-10 w-full md:w-[50%] h-[260px] bg-[#080B10] border border-white/5 rounded-2xl overflow-hidden p-4.5 flex items-center justify-center">
                <div className="relative w-full flex flex-col gap-3.5">
                  {/* Centered track line passing perfectly under nodes */}
                  <div className="absolute left-[18px] top-4 bottom-4 w-[2px] border-l border-dashed border-emerald-500/35 z-0 pointer-events-none" />

                  {/* Stage 3: Top */}
                  <div className="relative z-10 flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-[#171923] border border-emerald-500/35 text-emerald-400 flex items-center justify-center shrink-0 z-10 shadow-lg">
                      <Sparkles size={14} />
                    </div>
                    <div className="flex-grow bg-[#171923] border border-white/10 rounded-xl p-2.5 shadow-lg transition-all duration-300 hover:border-emerald-500/20">
                      <h4 className="text-white font-extrabold text-[11px] leading-tight">Senior SDE (SDE 2)</h4>
                      <p className="text-[9px] text-zinc-400 mt-0.5">Microsoft • Full-time • 2023-Present</p>
                    </div>
                  </div>

                  {/* Stage 2: Middle */}
                  <div className="relative z-10 flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-[#171923] border border-indigo-500/35 text-indigo-400 flex items-center justify-center shrink-0 z-10 shadow-lg">
                      <Code2 size={14} />
                    </div>
                    <div className="flex-grow bg-[#171923] border border-white/10 rounded-xl p-2.5 shadow-lg transition-all duration-300 hover:border-indigo-500/20">
                      <h4 className="text-white font-extrabold text-[11px] leading-tight">Software Developer (SDE 1)</h4>
                      <p className="text-[9px] text-zinc-400 mt-0.5">Razorpay • Full-time • 2022-2023</p>
                    </div>
                  </div>

                  {/* Stage 1: Bottom */}
                  <div className="relative z-10 flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-[#171923] border border-white/5 text-zinc-550 flex items-center justify-center shrink-0 z-10 shadow-lg">
                      <TerminalSquare size={14} />
                    </div>
                    <div className="flex-grow bg-[#171923]/60 border border-white/5 rounded-xl p-2.5 shadow-lg">
                      <h4 className="text-zinc-300 font-bold text-[11px] leading-tight">Quality Assurance</h4>
                      <p className="text-[9px] text-zinc-500 mt-0.5">Flipkart • Full-time • 2021-2022</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── Testimonials Section ─── */}
      <section style={{ padding: "110px 0", background: "#0A0D14", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
        <div className="lp-trust-grid" style={{ width: "min(92%, 1250px)", margin: "0 auto" }}>
          <div>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#10b981", background: "rgba(16,185,129,0.08)", padding: "6px 16px", borderRadius: "99px", marginBottom: "20px" }}>
              Proven Outcomes
            </span>
            <h2 className="lp-font-outfit text-white font-extrabold tracking-tight leading-tight mb-6" style={{ fontSize: "clamp(30px, 5vw, 50px)" }}>
              Don't just take <br className="hidden md:block" /> our word for it.
            </h2>
            <p style={{ fontSize: "clamp(16px, 1.4vw, 18px)", color: "#94a3b8", lineHeight: 1.7 }} className="font-light mb-8">
              Over 10,000 students have repositioned themselves into elite technical positions under our structured system. Joining Atorax means inheriting an unmatched global network.
            </p>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-1 rounded-full transition-all duration-300 border-none cursor-pointer ${
                    i === activeTestimonial ? "w-8 bg-indigo-400" : "w-2 bg-zinc-800 hover:bg-zinc-700"
                  }`}
                />
              ))}
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div className="glass-panel rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 p-8 text-white/[0.01] pointer-events-none z-0">
                <Quote size={180} />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 flex flex-col h-full"
                >
                  <p className="text-zinc-200 text-lg md:text-[20px] leading-relaxed italic mb-8 font-light">
                    "{testimonials[activeTestimonial].quote}"
                  </p>

                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/5">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${testimonials[activeTestimonial].color} flex items-center justify-center font-bold text-white text-sm shadow-xl shrink-0`}>
                      {testimonials[activeTestimonial].initial}
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-extrabold">{testimonials[activeTestimonial].author}</h4>
                      <p className="text-indigo-450 text-[11px] font-bold tracking-wider uppercase mt-0.5">{testimonials[activeTestimonial].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Immersive Conversion CTA ─── */}
      <section style={{ padding: "130px 0 150px", background: "linear-gradient(to bottom, #0A0D14, #080A10)", textAlign: "center", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
        {/* Cinematic Backdrop Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.04)_0%,transparent_60%)] z-0 pointer-events-none" />

        <div style={{ position: "relative", zIndex: 10, maxWidth: "840px", margin: "0 auto", padding: "0 24px" }}>
          <h2 className="lp-font-outfit text-white font-extrabold tracking-tight leading-[1.08] mb-6 text-glow" style={{ fontSize: "clamp(36px, 6vw, 64px)" }}>
            The tech industry is waiting. <br />
            <span className="subtle-gradient-text">
              Are you ready?
            </span>
          </h2>
          <p style={{ fontSize: "clamp(16px, 1.4vw, 19px)", color: "#94a3b8", marginBottom: "48px", lineHeight: 1.6 }} className="font-light">
            Join thousands of ambitious builders who stopped dreaming and started executing. Next cohorts are filling up rapidly. Secure your legacy.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/Advance")}
              className="px-10 h-[54px] bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-xl transition-all shadow-xl shadow-indigo-650/10 flex items-center justify-center gap-2 hover:-translate-y-0.5 text-sm"
            >
              Secure Your Spot <ArrowRight size={15} />
            </button>
            <button
              onClick={() => setShowPopup(true)}
              className="px-10 h-[54px] bg-transparent text-white font-extrabold rounded-xl border border-white/20 hover:bg-white/5 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 text-sm"
            >
              Schedule Consult
            </button>
          </div>

          <div style={{ marginTop: "44px", fontSize: "13px", color: "#475569" }} className="flex justify-center items-center gap-2 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span style={{ color: "#94a3b8" }}><strong style={{ color: "#f1f5f9" }}>127 students</strong> started accelerating their careers this week.</span>
          </div>
        </div>
      </section>

      {/* Applied popup for seamless conversions */}
      {showPopup && (
        <AdvancedApplyPopup
          onClose={() => setShowPopup(false)}
          initialDomain="Advance"
        />
      )}
    </div>
  );
};

export default HomePage;
