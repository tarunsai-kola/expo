import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight, FaBriefcase, FaGraduationCap, FaCheckCircle,
  FaLaptopCode, FaComments, FaAward, FaRobot, FaDatabase,
  FaShieldAlt, FaChartLine, FaClock, FaSuitcase
} from "react-icons/fa";
import "./landing.css"; // Static CSS

/* ─── Static Data ─── */
const companies = [
  "Google", "Amazon", "Microsoft", "Infosys", "TCS", "Wipro", "Accenture",
  "Deloitte", "IBM", "Capgemini", "Oracle", "Adobe", "Flipkart", "Swiggy",
  "Zomato", "PhonePe", "Razorpay", "CRED", "Meesho", "Freshworks",
];

const tracks = [
  { id: "ds-genai", title: "Data Science & Generative AI", icon: <FaRobot />, desc: "Master predictive modeling, deep learning, and architect LLM-powered applications. Become a dual-threat in traditional data science and modern GenAI.", duration: "6 Months", role: "AI / Data Scientist", outcomes: ["Predictive modeling & machine learning", "Build custom GPTs & RAG pipelines", "Deploy AI models to production", "Advanced Python & PyTorch"], link: "/Advance" },
  { id: "da-ai", title: "Data Analytics & AI", icon: <FaDatabase />, desc: "Combine traditional business intelligence with AI-driven analytics. Extract actionable insights and automate reporting using modern data tools.", duration: "5 Months", role: "Data Analyst / BI Developer", outcomes: ["Advanced SQL & Python", "Tableau & PowerBI Dashboards", "AI-assisted data analysis", "Real-world business capstones"], link: "/Advance" },
  { id: "ai-fsd", title: "AI-Powered Full Stack Development", icon: <FaLaptopCode />, desc: "Build secure, scalable MERN stack applications augmented with AI integrations. Learn to code faster with AI assistants and build intelligent features.", duration: "6 Months", role: "Full Stack Engineer", outcomes: ["React, Node.js, MongoDB", "Integrate OpenAI & LLM APIs", "System Design & Cloud Deployment", "Production-grade web apps"], link: "/Advance" },
  { id: "cyber", title: "Cybersecurity", icon: <FaShieldAlt />, desc: "Defend against modern digital threats. Learn ethical hacking, network security, and secure architecture for enterprise systems.", duration: "5 Months", role: "Security Analyst", outcomes: ["Vulnerability assessment & Pen-testing", "Network & Cloud Security", "Incident response protocols", "Security compliance & frameworks"], link: "/Advance" },
  { id: "dm-ai", title: "Digital Marketing & AI", icon: <FaChartLine />, desc: "Execute high-ROI campaigns using AI-generated content and predictive analytics. Master SEO, performance marketing, and conversion optimization.", duration: "4 Months", role: "Growth Marketer", outcomes: ["Meta Ads & Google Ads mastery", "AI-driven content generation", "Advanced SEO & Analytics", "Conversion Rate Optimization"], link: "/Advance" },
];

const testimonials = [
  { id: 1, quote: "Atorax didn't just teach me to code; they taught me how to be an engineer. The curriculum is exactly what hiring managers at product companies look for. I got multiple offers before the program even ended.", author: "Rohan S.", role: "SDE at TCS Digital", initial: "R" },
  { id: 2, quote: "The mentorship is unmatched. My mentor was a Senior Engineer at Microsoft and he completely overhauled the way I approach System Design. Worth every penny and more.", author: "Priya M.", role: "Backend Developer at Razorpay", initial: "P" },
  { id: 3, quote: "Transitioning from a non-CS background was terrifying, but the structured path and 1:1 support gave me confidence. Six months later, I'm working my dream job as a Data Analyst.", author: "Karan D.", role: "Data Analyst at Fractal", initial: "K" },
];

const HomePage = () => {
  const [activeTrack, setActiveTrack] = useState(tracks[0]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="lp-bg">
      {/* ─── Hero Section ─── */}
      <section style={{ position: "relative", padding: "80px 0 60px", overflow: "hidden", background: "#0F1115" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 40%, rgba(20,98,238,0.06) 0%, transparent 55%)", zIndex: 0 }} />
        
        <div className="lp-hero-grid" style={{ position: "relative", zIndex: 10, width: "min(92%, 1400px)", margin: "0 auto" }}>
          <div>
            <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#FF8803", marginBottom: "16px" }}>
              <span style={{ width: "8px", height: "8px", background: "#FF8803", borderRadius: "50%", boxShadow: "0 0 8px rgba(255,136,3,0.5)" }} />
              The Flagship Career Platform
            </span>

            <h1 style={{ fontSize: "clamp(48px, 6.5vw, 84px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em", marginBottom: "32px", color: "#fff" }}>
              <span style={{ display: "block", marginBottom: "8px" }}>Where ambitious</span>
              <span style={{ display: "block", marginBottom: "8px" }}>students become</span>
              <span style={{ display: "block", marginBottom: "8px" }}>hireable tech</span>
              <span style={{ display: "block" }}>professionals.</span>
            </h1>

            <p style={{ fontSize: "clamp(16px, 1.5vw, 20px)", color: "#A1A1AA", lineHeight: 1.6, maxWidth: "600px", marginBottom: "48px" }}>
              Don't just take courses. Accelerate your career with industry-led programs, 1:1 expert mentorship, and a proven pipeline to 500+ top tech companies.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link to="/Advance" style={{ background: "#1462EE", color: "#fff", padding: "14px 28px", borderRadius: "8px", fontWeight: 600, fontSize: "16px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                Accelerate Your Career <FaArrowRight />
              </Link>
              <Link to="/ContactUs" style={{ background: "transparent", color: "#fff", padding: "14px 28px", borderRadius: "8px", fontWeight: 600, fontSize: "16px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", border: "1.5px solid rgba(255,255,255,0.3)" }}>
                View Placements
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Authority Marquee / Company Section ─── */}
      <section style={{ background: "#fff", color: "#0F1115", padding: "80px 0", overflow: "hidden" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span style={{ display: "inline-block", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#1462EE", marginBottom: "16px" }}>
            Industry Network
          </span>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.1, color: "#0F1115", marginBottom: "16px" }}>
            500+ companies hire our graduates
          </h2>
          <p style={{ fontSize: "18px", color: "#475569", maxWidth: "600px", margin: "0 auto" }}>
            From high-growth startups to Fortune 500 giants, Atorax alumni are trusted across every tier of the tech industry.
          </p>
        </div>

        <div style={{ overflow: "hidden", maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
          <div className="lp-marquee" style={{ display: "flex", gap: "0", width: "max-content" }}>
            {[...companies, ...companies].map((c, i) => (
              <div key={i} style={{ padding: "16px 40px", whiteSpace: "nowrap", fontSize: "16px", fontWeight: 700, color: "#64748B", borderRight: "1px solid #e2e8f0", flexShrink: 0 }}>{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Career Tracks Section ─── */}
      <section style={{ padding: "120px 0", background: "#16181D" }}>
        <div style={{ width: "min(92%, 1400px)", margin: "0 auto" }}>
          <span style={{ display: "block", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#FF8803", marginBottom: "16px" }}>
            Career Tracks
          </span>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.1, color: "#fff", marginBottom: "60px" }}>
            Choose your <span style={{ color: "#fff" }}>transformation.</span>
          </h2>

          <div className="lp-tracks-layout">
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {tracks.map(t => (
                <button key={t.id} onClick={() => setActiveTrack(t)} style={{ padding: "20px 24px", borderRadius: "16px", background: activeTrack.id === t.id ? "rgba(255,255,255,0.05)" : "transparent", border: `1px solid ${activeTrack.id === t.id ? "rgba(255,255,255,0.08)" : "transparent"}`, color: activeTrack.id === t.id ? "#fff" : "#A1A1AA", textAlign: "left", fontSize: "18px", fontWeight: 600, cursor: "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ opacity: 0.7 }}>{t.icon}</span> {t.title}
                </button>
              ))}
            </div>

            <div style={{ background: "#0F1115", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "32px", padding: "60px", boxShadow: "0 32px 64px rgba(0,0,0,0.3)", position: "relative", overflow: "hidden" }}>
              <div style={{ display: "flex", gap: "24px", marginBottom: "32px" }}>
                {[{ icon: <FaClock />, text: activeTrack.duration }, { icon: <FaSuitcase />, text: activeTrack.role }].map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#A1A1AA", fontSize: "15px", fontWeight: 500, background: "rgba(255,255,255,0.05)", padding: "8px 16px", borderRadius: "999px" }}>
                    <span style={{ color: "#1462EE" }}>{m.icon}</span> {m.text}
                  </div>
                ))}
              </div>
              <h3 style={{ fontSize: "40px", fontWeight: 800, color: "#fff", marginBottom: "24px" }}>{activeTrack.title}</h3>
              <p style={{ fontSize: "18px", color: "#A1A1AA", lineHeight: 1.7, marginBottom: "40px", maxWidth: "600px" }}>{activeTrack.desc}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginBottom: "48px" }}>
                {activeTrack.outcomes.map((o, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <FaCheckCircle style={{ color: "#1462EE", marginTop: "3px", flexShrink: 0 }} />
                    <span style={{ color: "#fff", fontSize: "16px", lineHeight: 1.5 }}>{o}</span>
                  </div>
                ))}
              </div>
              <Link to={activeTrack.link} style={{ background: "#1462EE", color: "#fff", padding: "14px 28px", borderRadius: "8px", fontWeight: 600, fontSize: "16px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                View Program Curriculum <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials Section ─── */}
      <section style={{ padding: "120px 0", background: "#0F1115" }}>
        <div className="lp-trust-grid" style={{ width: "min(92%, 1400px)", margin: "0 auto" }}>
          <div>
            <span style={{ display: "block", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#FF8803", marginBottom: "16px" }}>
              Proven Outcomes
            </span>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.1, color: "#fff", marginBottom: "24px" }}>
              Don't just take<br />our word for it.
            </h2>
            <p style={{ fontSize: "clamp(16px, 1.5vw, 20px)", color: "#A1A1AA", lineHeight: 1.6 }}>
              Over 10,000 students have accelerated their careers with Atorax. Our alumni network spans the globe's most innovative companies. When you join, you're not just buying a course — you're securing a network.
            </p>
            <div style={{ display: "flex", gap: "8px", marginTop: "40px" }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? "32px" : "12px", height: "6px", borderRadius: "3px", background: i === activeTestimonial ? "#1462EE" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
              ))}
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "24px", padding: "48px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
              <div style={{ fontSize: "80px", color: "rgba(20,98,238,0.15)", lineHeight: 1, position: "absolute", top: "24px", left: "32px", fontFamily: "serif" }}>"</div>
              <p style={{ fontSize: "20px", color: "#fff", lineHeight: 1.7, marginBottom: "32px", position: "relative", zIndex: 1 }}>{testimonials[activeTestimonial].quote}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "20px", color: "#A1A1AA" }}>{testimonials[activeTestimonial].initial}</div>
                <div>
                  <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{testimonials[activeTestimonial].author}</h4>
                  <p style={{ fontSize: "14px", color: "#A1A1AA" }}>{testimonials[activeTestimonial].role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Conversion CTA ─── */}
      <section style={{ padding: "140px 0", background: "linear-gradient(to bottom, #16181D, #0F1115)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", zIndex: 10, maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.1, color: "#fff", marginBottom: "24px" }}>
            The tech industry is waiting.<br /><span style={{ color: "#fff" }}>Are you ready?</span>
          </h2>
          <p style={{ fontSize: "20px", color: "#A1A1AA", marginBottom: "48px", lineHeight: 1.6 }}>
            Join the 10,000+ ambitious students who decided to stop watching from the sidelines and start building their careers. Next cohort filling fast.
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/Advance" style={{ background: "#1462EE", color: "#fff", padding: "18px 40px", borderRadius: "8px", fontWeight: 600, fontSize: "18px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              Secure Your Spot <FaArrowRight />
            </Link>
            <Link to="/ContactUs" style={{ background: "transparent", color: "#fff", padding: "18px 40px", borderRadius: "8px", fontWeight: 600, fontSize: "18px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px", border: "1.5px solid rgba(255,255,255,0.3)" }}>
              Schedule a Call
            </Link>
          </div>
          <div style={{ marginTop: "48px", fontSize: "14px", color: "#A1A1AA" }}>
            <strong style={{ color: "#fff" }}>127 students</strong> enrolled this week.
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
