import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Code,
  Cpu,
  Database,
  Cloud,
  ShieldCheck,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  MapPin,
  Briefcase,
  Send,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  GraduationCap,
  Users,
  Award,
  Phone,
  Mail,
  User,
  BookOpen,
  Calendar,
  AlertCircle,
} from "lucide-react";

import careeraboutimg from "../assets/Collaborate1.svg";
import img from "../assets/career.jpg";

// ============================================================================
// 📢 GOOGLE APPS SCRIPT WEB APP INTEGRATION:
// 1. Create a Google Sheet (columns: Timestamp, Name, Email, Phone, Subject, Experience, Current Role, LinkedIn, Why Join).
// 2. Click Extensions > Apps Script in Google Sheets.
// 3. Paste the provided doPost(e) code (see copyable guide at bottom of this page).
// 4. Click Deploy > New deployment > Select 'Web app'.
//    - Execute as: 'Me'
//    - Who has access: 'Anyone'
// 5. Paste your deployed Web App URL below:
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyp62VKlaquGgw-mJwvr8XprWaQ9gbHlASSz7gQE70_0C36GJOddiYNCQJ3nHjjMoI2qw/exec";

// Mentor opening positions
const MENTOR_OPENINGS = [
  {
    id: "fullstack",
    title: "Full Stack Web Development Mentor",
    domain: "Full Stack Web Development",
    category: "Software & Web",
    badge: "High Demand",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    icon: Code,
    iconColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    type: "Part-Time • Remote • Flexible",
    experience: "2+ Years in MERN / Python / Java Stacks",
    stipend: "Competitive Honorarium / Hour",
    description:
      "Mentor engineering cohorts through end-to-end full stack architecture, RESTful APIs, database design, code reviews, and enterprise capstone projects.",
    skills: ["React.js", "Node.js", "Express", "MongoDB / PostgreSQL", "System Design", "Git & CI/CD"],
    responsibilities: [
      "Deliver live interactive coding and architecture guidance",
      "Conduct capstone code reviews and technical mock interviews",
      "Help students debug real-world full-stack web applications",
    ],
  },
  {
    id: "aiml",
    title: "AI, Machine Learning & GenAI Mentor",
    domain: "Artificial Intelligence & Machine Learning",
    category: "AI & Data",
    badge: "Trending",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    icon: Sparkles,
    iconColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    type: "Part-Time • Remote • Flexible",
    experience: "2+ Years in ML, Deep Learning or LLM Solutions",
    stipend: "Competitive Honorarium / Hour",
    description:
      "Train students on modern machine learning foundations, fine-tuning large language models, building RAG applications, and deploying AI models.",
    skills: ["Python", "PyTorch / TensorFlow", "Scikit-Learn", "GenAI & LLMs", "LangChain", "Vector DBs"],
    responsibilities: [
      "Guide practical implementations of ML models and prompt engineering",
      "Mentor real-world generative AI and data pipeline projects",
      "Provide industry insights into modern MLOps workflows",
    ],
  },
  {
    id: "datascience",
    title: "Data Science & Business Analytics Mentor",
    domain: "Data Science & Analytics",
    category: "AI & Data",
    badge: "Urgent Opening",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    icon: Database,
    iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    type: "Part-Time • Remote • Flexible",
    experience: "2+ Years in Data Analytics, BI, or Data Science",
    stipend: "Competitive Honorarium / Hour",
    description:
      "Instruct engineering students in data wrangling, exploratory data analysis, business intelligence dashboarding with Power BI/Tableau, and statistical modeling.",
    skills: ["Python / R", "Advanced SQL", "Power BI / Tableau", "Pandas & NumPy", "Statistics", "EDA"],
    responsibilities: [
      "Guide learners through exploratory data projects and dashboarding",
      "Teach advanced SQL queries and business metric formulation",
      "Review end-to-end data portfolios for campus placements",
    ],
  },
  {
    id: "devops",
    title: "Cloud Computing & DevOps Mentor",
    domain: "Cloud Computing & DevOps",
    category: "Cloud & Security",
    badge: "Industry Core",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    icon: Cloud,
    iconColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    type: "Part-Time • Remote • Flexible",
    experience: "3+ Years in AWS / Azure, Docker, Kubernetes, CI/CD",
    stipend: "Competitive Honorarium / Hour",
    description:
      "Empower future cloud engineers with real-world DevOps practices, Infrastructure as Code, container orchestration, and continuous integration/delivery.",
    skills: ["AWS / Azure", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Linux / Bash"],
    responsibilities: [
      "Demonstrate cloud infrastructure setup and automated deployments",
      "Coach students on containerization and microservice orchestration",
      "Evaluate capstone cloud architectural blueprints",
    ],
  },
  {
    id: "vlsi",
    title: "VLSI Design & Embedded Systems Mentor",
    domain: "VLSI & Embedded Systems",
    category: "Core Engineering",
    badge: "Core Engineering",
    badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    icon: Cpu,
    iconColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    type: "Part-Time • Remote • Flexible",
    experience: "2+ Years in Digital Design, Verilog, or Embedded C",
    stipend: "Competitive Honorarium / Hour",
    description:
      "Inspire core electrical and electronics students with hands-on Verilog RTL coding, FPGA synthesis, microcontroller interfacing, and embedded firmware design.",
    skills: ["Verilog / VHDL", "RTL Design", "FPGA Interfacing", "Embedded C", "ARM / STM32", "EDA Tools"],
    responsibilities: [
      "Conduct RTL design reviews and FPGA simulation walk-throughs",
      "Guide practical hardware-software co-design implementations",
      "Prepare students for core semiconductor and embedded interviews",
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Ethical Hacking Mentor",
    domain: "Cybersecurity & Ethical Hacking",
    category: "Cloud & Security",
    badge: "High Growth",
    badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    icon: ShieldCheck,
    iconColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    type: "Part-Time • Remote • Flexible",
    experience: "2+ Years in Security Operations, Pentesting, or SOC",
    stipend: "Competitive Honorarium / Hour",
    description:
      "Lead practical cybersecurity sessions covering penetration testing, network traffic analysis, vulnerability scanning, and OWASP top security audits.",
    skills: ["Network Security", "Penetration Testing", "Burp Suite", "Wireshark", "OWASP Top 10", "SOC Ops"],
    responsibilities: [
      "Facilitate capture-the-flag (CTF) challenges and defense drills",
      "Review defensive security configurations and threat modeling",
      "Mentor students in security certifications and industry practices",
    ],
  },
];

// Existing corporate roles
const CORPORATE_JOBS = [
  {
    title: "Marketing Specialist (Lead Generator)",
    department: "Marketing",
    description: "Lead and execute innovative marketing campaigns to drive brand awareness and engagement. Ideal for creative thinkers with a flair for digital marketing.",
    location: "Bangalore / Remote",
  },
  {
    title: "Operations Executive",
    department: "Back Office",
    description: "Manage day-to-day operations, ensuring smooth processes and efficiency. A great fit for detail-oriented individuals who excel at multitasking.",
    location: "Bangalore",
  },
  {
    title: "HR Specialist",
    department: "HR",
    description: "Handle recruitment, employee engagement, and HR strategies to support our growing team. Ideal for those with strong interpersonal skills and HR expertise.",
    location: "Bangalore",
  },
  {
    title: "Content Writer",
    department: "Digital Marketing",
    description: "Create compelling and engaging content for our website, blogs, and social media channels. Perfect for creative writers with a passion for storytelling.",
    location: "Remote / Hybrid",
  },
  {
    title: "Corporate Placement Coordinator",
    department: "Placements",
    description: "Build and maintain relationships with corporate partners to facilitate placement opportunities for our learners. A role for those who excel in networking.",
    location: "Bangalore",
  },
];

const Career = () => {
  const mentorSectionRef = useRef(null);
  const formSectionRef = useRef(null);

  // Filter state for mentor opening cards
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Full Stack Web Development",
    experience: "3 - 5 Years",
    currentRole: "",
    linkedinUrl: "",
    whyJoin: "",
    consent: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [lastSubmittedName, setLastSubmittedName] = useState("");
  const [openJobIndex, setOpenJobIndex] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
    window.scrollTo(0, 0);
  }, []);

  // Filtered mentor openings
  const categories = ["All", "Software & Web", "AI & Data", "Cloud & Security", "Core Engineering"];
  const filteredOpenings =
    selectedCategory === "All"
      ? MENTOR_OPENINGS
      : MENTOR_OPENINGS.filter((item) => item.category === selectedCategory);

  // Scroll helpers
  const scrollToMentorOpenings = () => {
    mentorSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToApplyForm = (subjectToSelect = null) => {
    if (subjectToSelect) {
      setFormData((prev) => ({ ...prev, subject: subjectToSelect }));
    }
    formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Form submission handler with Google Apps Script support
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // Basic validation
    if (!formData.name.trim()) {
      setSubmitError("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setSubmitError("Please enter a valid phone number.");
      return;
    }
    if (!formData.whyJoin.trim()) {
      setSubmitError("Please share why you want to join as a mentor.");
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionPayload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject,
        experience: formData.experience,
        currentRole: formData.currentRole.trim(),
        linkedinUrl: formData.linkedinUrl.trim(),
        whyJoin: formData.whyJoin.trim(),
        submittedAt: new Date().toLocaleString(),
      };

      if (GOOGLE_APPS_SCRIPT_URL && GOOGLE_APPS_SCRIPT_URL.trim().startsWith("http")) {
        // Send to deployed Google Apps Script Web App
        // Using urlencoded + no-cors is standard for Google Apps Script Web App without CORS redirection blocks
        const params = new URLSearchParams(submissionPayload).toString();

        await fetch(GOOGLE_APPS_SCRIPT_URL.trim(), {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params,
        });
      } else {
        // Demo simulation mode when Apps Script URL is yet to be plugged in
        console.info(
          "Mentor application data ready. To write directly to Google Sheets, set GOOGLE_APPS_SCRIPT_URL at the top of Career.jsx.",
          submissionPayload
        );
        // Short simulated delay for smooth UX
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setLastSubmittedName(formData.name);
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Full Stack Web Development",
        experience: "3 - 5 Years",
        currentRole: "",
        linkedinUrl: "",
        whyJoin: "",
        consent: true,
      });
    } catch (err) {
      console.error("Error submitting mentor application:", err);
      setSubmitError("Failed to submit application. Please try again or reach out to info@aiienscampus.in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#050811] text-white min-h-screen font-sans selection:bg-blue-600 selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION
      ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden border-b border-white/5">
        {/* Ambient Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div
            data-aos="fade-down"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Sparkles size={14} className="animate-pulse" />
            We're Hiring Industry Mentors • Join Aiiens Campus
          </div>

          {/* Headline */}
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6"
          >
            Mentor the Next Generation of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              Tech Engineers
            </span>
          </h1>

          {/* Subtitle */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal"
          >
            Partner with Aiiens Campus to mentor ambitious engineering students, review capstone projects,
            and lead hands-on cohort sessions. High-impact engagement with flexible weekend & evening hours.
          </p>

          {/* CTAs */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={scrollToMentorOpenings}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explore Mentor Openings</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToApplyForm()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold border border-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply as Mentor Now</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-white/10"
          >
            {[
              { label: "Engineering Students", val: "10,000+" },
              { label: "Active Industry Mentors", val: "50+ Mentors" },
              { label: "Session Formats", val: "Live & 1:1 Labs" },
              { label: "Schedule Flexibility", val: "Weekends / Evenings" },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xl sm:text-2xl font-bold text-white mb-1">{stat.val}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. WHY BECOME A MENTOR WITH US
      ────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Why Mentor With Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4 text-white">
            Transform Careers While Growing Your Own Brand
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            We provide structured syllabi, verified learner cohorts, and seamless logistics so you can focus 100% on high-value mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Award,
              title: "Competitive Honorarium",
              desc: "Earn attractive, transparent remuneration per cohort session or project review hour, credited reliably on schedule.",
            },
            {
              icon: Clock,
              title: "Flexible Weekend Slots",
              desc: "Zero interference with your full-time corporate role. Commit 4–6 hours weekly during Saturdays, Sundays, or evenings.",
            },
            {
              icon: BookOpen,
              title: "Turnkey Curriculum & Decks",
              desc: "No need to build course slides from scratch. We provide curated topic outlines, code repos, and evaluation rubrics.",
            },
            {
              icon: Users,
              title: "Verified Student Cohorts",
              desc: "Work with engineering students and early professionals pre-screened for foundational readiness and motivation.",
            },
            {
              icon: Sparkles,
              title: "Industry Recognition & Profile",
              desc: "Gain spotlight features across our partner college summits, LinkedIn showcases, and our verified Mentor Directory.",
            },
            {
              icon: GraduationCap,
              title: "Tangible Career Impact",
              desc: "Directly help students crack technical interviews, build production capstones, and land their dream jobs.",
            },
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 80}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <IconComp size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. MENTORS OPENING CARDS SECTION
      ────────────────────────────────────────────────────────────── */}
      <section ref={mentorSectionRef} id="mentor-openings" className="py-20 px-4 bg-[#070b18] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                Current Openings
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
                Open Mentor Positions
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
                Choose the domain that matches your expertise and apply directly. We onboard mentors continuously for upcoming student cohorts.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpenings.map((job) => {
              const IconComp = job.icon;
              return (
                <div
                  key={job.id}
                  data-aos="fade-up"
                  className="flex flex-col justify-between p-6 rounded-2xl bg-[#0b1022] border border-white/10 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
                >
                  <div>
                    {/* Top Row: Icon & Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${job.iconColor}`}>
                        <IconComp size={22} />
                      </div>
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${job.badgeColor}`}>
                        {job.badge}
                      </span>
                    </div>

                    {/* Title & Domain */}
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                      {job.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Metadata specs */}
                    <div className="space-y-2 mb-5 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-blue-400 shrink-0" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase size={14} className="text-emerald-400 shrink-0" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award size={14} className="text-amber-400 shrink-0" />
                        <span>{job.stipend}</span>
                      </div>
                    </div>

                    {/* Skill tags */}
                    <div className="mb-6">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Core Subjects & Skills:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {job.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[11px] text-slate-300 font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={() => scrollToApplyForm(job.domain)}
                      className="w-full py-2.5 px-4 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white font-medium text-sm border border-blue-500/20 hover:border-blue-600 transition-all flex items-center justify-center gap-2 group-hover:gap-3 cursor-pointer"
                    >
                      <span>Apply for this Role</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. MENTOR APPLICATION FORM SECTION (With Google Apps Script)
      ────────────────────────────────────────────────────────────── */}
      <section ref={formSectionRef} id="mentor-apply-form" className="py-24 px-4 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Form Header */}
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              Join as a Mentor
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-3 mb-4">
              Mentor Application Form
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Fill out your details below. Our academic and mentor relations team will review your application
              and get in touch with you within 24–48 hours.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-[#0b1022]/90 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl">
            {submitSuccess ? (
              /* Success State */
              <div className="py-12 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={44} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Application Received Successfully!
                </h3>
                <p className="text-slate-300 text-base max-w-lg mx-auto leading-relaxed">
                  Thank you, <span className="text-blue-400 font-semibold">{lastSubmittedName || "Applicant"}</span>!
                  Your application to mentor with Aiiens Campus has been submitted. Our team will review your domain expertise and contact you soon.
                </p>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 max-w-md mx-auto text-left text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-white mb-1">What happens next?</div>
                  <div>• Profile screening by our Academic Advisory Board</div>
                  <div>• Brief 15-minute introductory video alignment call</div>
                  <div>• Onboarding & cohort schedule mapping</div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              /* Actual Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-3">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <User size={16} />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Rahul Sharma"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Mail size={16} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. rahul.sharma@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Phone size={16} />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. +91 98765 43210"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject / Domain */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Subject / Domain Expertise <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#0b1022] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
                      >
                        <option value="Full Stack Web Development">Full Stack Web Development (MERN / Python / Java)</option>
                        <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning / GenAI</option>
                        <option value="Data Science & Analytics">Data Science & Business Analytics</option>
                        <option value="Cloud Computing & DevOps">Cloud Computing & DevOps (AWS / K8s / Docker)</option>
                        <option value="VLSI & Embedded Systems">VLSI Design & Embedded Systems (Verilog / FPGA)</option>
                        <option value="Cybersecurity & Ethical Hacking">Cybersecurity & Ethical Hacking</option>
                        <option value="Mobile App Development">Mobile App Development (React Native / Flutter / Android)</option>
                        <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                        <option value="Other">Other Specialized Domain</option>
                      </select>
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Total Industry Experience <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#0b1022] border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
                    >
                      <option value="1 - 2 Years">1 - 2 Years</option>
                      <option value="3 - 5 Years">3 - 5 Years</option>
                      <option value="5 - 8 Years">5 - 8 Years</option>
                      <option value="8+ Years">8+ Years (Lead / Staff / Principal)</option>
                    </select>
                  </div>

                  {/* Current Role / Company (Optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Current Role & Company <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="currentRole"
                      value={formData.currentRole}
                      onChange={handleInputChange}
                      placeholder="e.g. Senior SDE @ TechCorp"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* LinkedIn Profile */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    LinkedIn / Portfolio URL <span className="text-slate-500 font-normal">(Recommended)</span>
                  </label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>

                {/* Why do you want to join */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Why do you want to join as a mentor? <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="whyJoin"
                    rows={4}
                    value={formData.whyJoin}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us what motivates you to mentor students, your hands-on industry experience, past teaching/mentorship background, and preferred session timings..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
                    I confirm that the details provided are accurate and authorize Aiiens Campus to contact me via email/phone regarding mentorship opportunities.
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-base shadow-xl shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Submit Mentor Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. OTHER CORPORATE OPENINGS (Accordion)
      ────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 max-w-5xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Internal Operations
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
            Other Corporate & Management Openings
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Looking for full-time roles in Marketing, Operations, or Placements? Explore current office vacancies.
          </p>
        </div>

        <div className="space-y-4">
          {CORPORATE_JOBS.map((job, idx) => {
            const isOpen = openJobIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden transition-all"
              >
                <div
                  onClick={() => setOpenJobIndex(isOpen ? null : idx)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/[0.04] transition-colors"
                >
                  <div>
                    <h4 className="text-base font-semibold text-white">{job.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {job.location}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 border-t border-white/5 pt-4 space-y-3">
                    <p>{job.description}</p>
                    <div className="flex items-center gap-2 text-xs text-blue-400">
                      <span>To apply for corporate roles, email your CV to:</span>
                      <a href="mailto:careers@aiiensedu.com" className="underline font-semibold">
                        careers@aiiensedu.com
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. MENTOR FAQ
      ────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-[#070b18] border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">Frequently Asked Questions</h3>
            <p className="text-slate-400 text-sm">Common questions about mentoring at Aiiens Campus</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "What is the weekly time commitment for mentors?",
                a: "Most mentors spend 4 to 6 hours per week, primarily during weekend cohorts or weekday evening interactive sessions. You can choose batches that fit your schedule.",
              },
              {
                q: "Do I need prior formal teaching experience?",
                a: "No prior classroom teaching experience is required. We look for strong industry domain proficiency, hands-on problem-solving skills, and a genuine passion for guiding learners.",
              },
              {
                q: "How are sessions delivered?",
                a: "Sessions are conducted live online via high-definition video classrooms with integrated code editors, interactive whiteboards, and LMS integration.",
              },
              {
                q: "How does mentor remuneration work?",
                a: "Honorariums are calculated on a transparent hourly or cohort milestone basis and credited directly to your bank account monthly.",
              },
            ].map((faq, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="font-semibold text-white text-sm mb-1">{faq.q}</div>
                <div className="text-xs sm:text-sm text-slate-400 leading-relaxed">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;
