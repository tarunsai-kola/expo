import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

// Import New Cinematic Styles
import "../cinematic-landing.css";

// Import New Cinematic Chapters
import CinematicHero from "../Components/CinematicHero";
import AuthorityMarquee from "../Components/AuthorityMarquee";
import CareerTracks from "../Components/CareerTracks";
import PremiumTestimonials from "../Components/PremiumTestimonials";

const HomePage = () => {
  // Ensure we start at the top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cine-landing">
      {/* Chapter 1: Hero / Ambition */}
      <CinematicHero />

      {/* Chapter 2: Proof / Authority */}
      <AuthorityMarquee />

      {/* Chapter 3: Programs / Transformation */}
      <CareerTracks />

      {/* Chapter 4: Outcomes / Trust */}
      <PremiumTestimonials />

      {/* Chapter 5: Conversion / Urgency */}
      <section className="cine-conversion-chapter">
        <div className="cine-conversion-glow"></div>
        <div className="cine-container cine-conversion-content">
          <motion.h2 
            className="cine-conversion-h2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The tech industry is waiting.<br />
            <span className="cine-text-electric">Are you ready?</span>
          </motion.h2>
          
          <motion.p 
            className="cine-conversion-sub"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Join the 10,000+ ambitious students who decided to stop watching 
            from the sidelines and start building their careers. Next cohort 
            filling fast.
          </motion.p>
          
          <motion.div 
            className="cine-conversion-actions"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/Advance" className="cine-btn-primary" style={{ padding: "18px 40px", fontSize: "18px" }}>
              Secure Your Spot <FaArrowRight />
            </Link>
            <Link to="/ContactUs" className="cine-btn-secondary" style={{ padding: "18px 40px", fontSize: "18px" }}>
              Schedule a Call
            </Link>
          </motion.div>
          
          <motion.div 
            style={{ marginTop: "48px", fontSize: "14px", color: "var(--cine-slate)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <strong style={{ color: "var(--cine-white)" }}>127 students</strong> enrolled this week.
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
