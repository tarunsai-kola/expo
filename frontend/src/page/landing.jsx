import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Hls from "hls.js";
import {
  ArrowRight, CheckCircle2, AlertCircle, BookOpen,
  Briefcase, Users, Target, Monitor, TrendingUp, Building2,
  Star, Presentation, MessageSquare, Award, FileText,
  Mic2, Compass, FolderOpen, BrainCircuit, BarChart2,
  Lightbulb, Handshake, GraduationCap, ChevronRight,
  CalendarCheck, Download, CheckCheck, Shield, Globe,
  Megaphone, Layers, Send, ChevronDown,
} from "lucide-react";
import "./landing.css";

import CampusHeader from "../Components/CampusHeader";
import CampusFooter from "../Components/CampusFooter";
import LandingStudentEcosystem from "../Components/LandingStudentEcosystem";
import LandingCollegePartnership from "../Components/LandingCollegePartnership";
import LandingImplementationFlow from "../Components/LandingImplementationFlow";
import LandingSemesterPathway from "../Components/LandingSemesterPathway";
import LandingCareerSupport from "../Components/LandingCareerSupport";

const GapSection = () => {
  const academic = [
    { text: 'Strong theoretical concepts and fundamentals' },
    { text: 'Curriculum structure and academic examinations' },
    { text: 'Domain-specific knowledge foundation' },
    { text: 'Research exposure and academic rigour' },
  ];
  const industry = [
    { text: 'Practical problem-solving and applied thinking' },
    { text: 'Real projects and demonstrable portfolios' },
    { text: 'Communication, teamwork and professional habits' },
    { text: 'Mentor guidance and industry exposure' },
    { text: 'Internship experience and career readiness' },
  ];
  const painPoints = [
    { icon: <AlertCircle size={16} />, text: 'Limited practical exposure in classrooms' },
    { icon: <AlertCircle size={16} />, text: 'Scattered and unstructured learning outside syllabus' },
    { icon: <AlertCircle size={16} />, text: 'Weak student project portfolios' },
    { icon: <AlertCircle size={16} />, text: 'Limited industry mentorship and expert access' },
    { icon: <AlertCircle size={16} />, text: 'Unclear career direction for many students' },
    { icon: <AlertCircle size={16} />, text: 'Significant internship experience gaps' },
    { icon: <AlertCircle size={16} />, text: 'Final-year placement pressure with inadequate preparation' },
  ];

  return (
    <section className="relative w-full py-24 bg-[#030712] text-white overflow-hidden" id="why-aiiens-gap">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-20 pointer-events-none mix-blend-lighten"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#030712] pointer-events-none" />

      {/* Decorative Blur Glows */}
      <div className="absolute top-1/4 left-1/10 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-['Instrument_Sans'] font-semibold text-3xl sm:text-5xl leading-tight">
            The gap is not talent. It is the <span className="font-['Instrument_Serif'] italic font-normal text-blue-200">distance</span> between learning and doing.
          </h2>
          <p className="font-['Instrument_Sans'] text-white/60 text-lg sm:text-[19px] leading-relaxed max-w-2xl mx-auto">
            Engineering colleges produce highly knowledgeable graduates. But the bridge between academic theory and real-world execution is where the gap lives.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-stretch mb-20">
          
          {/* Academic Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <BookOpen size={22} />
                </div>
                <div>
                  <div className="text-[11px] text-white/40 font-bold tracking-[1.5px] uppercase font-['Instrument_Sans']">
                    What Colleges Provide
                  </div>
                  <div className="text-lg font-bold text-white font-['Instrument_Sans']">
                    Academic Learning
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {academic.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="font-['Instrument_Sans'] text-sm sm:text-base text-white/70 leading-relaxed">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bridge Connector */}
          <div className="lg:col-span-1 flex lg:flex-col items-center justify-center gap-3 py-6 lg:py-0">
            <div className="h-0.5 lg:h-12 w-12 lg:w-0.5 bg-gradient-to-r lg:bg-gradient-to-b from-blue-500/50 to-transparent" />
            <div className="font-['Instrument_Serif'] italic text-2xl text-blue-300">The Gap</div>
            <div className="h-0.5 lg:h-12 w-12 lg:w-0.5 bg-gradient-to-r lg:bg-gradient-to-b from-transparent to-emerald-500/50" />
          </div>

          {/* Industry Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/20 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Briefcase size={22} />
                </div>
                <div>
                  <div className="text-[11px] text-emerald-400/60 font-bold tracking-[1.5px] uppercase font-['Instrument_Sans']">
                    What Industry Expects
                  </div>
                  <div className="text-lg font-bold text-white font-['Instrument_Sans']">
                    Industry Capability
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {industry.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="font-['Instrument_Sans'] text-sm sm:text-base text-white/80 leading-relaxed">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Pain Points / Common Challenges */}
        <div className="border-t border-white/5 pt-16">
          <p className="text-center font-['Instrument_Sans'] font-medium text-xs text-white/40 tracking-[2px] uppercase mb-10">
            Common Challenges Institutions Are Solving
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {painPoints.map((pt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex items-start gap-3 bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-xl p-5 transition-all hover:bg-white/[0.04]"
              >
                <span className="text-red-400 flex-shrink-0 mt-0.5">{pt.icon}</span>
                <span className="font-['Instrument_Sans'] text-sm text-white/70 leading-relaxed">
                  {pt.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Section 7: LMS Journey ──────────────────────────────────────────────────

const LmsSection = () => {
  const journeySteps = [
    { icon: <Presentation size={18} />, label: 'Workshop', color: '#3B82F6' },
    { icon: <Monitor size={18} />, label: 'LMS Access', color: '#10B981' },
    { icon: <FolderOpen size={18} />, label: 'Guided Project', color: '#8B5CF6' },
    { icon: <Users size={18} />, label: 'Mentor Feedback', color: '#F59E0B' },
    { icon: <CheckCheck size={18} />, label: 'Assessment', color: '#EF4444' },
    { icon: <BarChart2 size={18} />, label: 'Progress Tracking', color: '#06B6D4' },
    { icon: <Compass size={18} />, label: 'Career Resources', color: '#10B981' },
  ];

  const lmsFeatures = [
    'Curated learning resources by domain',
    'Structured learning paths, module by module',
    'Projects and guided assignments',
    'Assessments and performance evaluations',
    'Student progress dashboard',
    'Mentor feedback and interaction log',
    'Resume, interview and internship resources',
  ];

  const metrics = [
    { label: 'Data Analytics', value: 72, color: '#3B82F6' },
    { label: 'Python Fundamentals', value: 88, color: '#10B981' },
    { label: 'Communication Skills', value: 65, color: '#8B5CF6' },
    { label: 'Project Completion', value: 91, color: '#F59E0B' },
    { label: 'Career Readiness', value: 54, color: '#EF4444' },
  ];

  return (
    <section className="relative w-full py-24 bg-[#090d16] text-white overflow-hidden" id="lms-learning">
      
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10 pointer-events-none mix-blend-screen"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1920')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#090d16] pointer-events-none" />

      {/* Decorative Radial Glows */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-['Instrument_Sans'] font-semibold text-3xl sm:text-5xl leading-tight">
            Learning continues<br />beyond a workshop.
          </h2>
          <p className="font-['Instrument_Sans'] text-white/50 text-lg sm:text-[19px] leading-relaxed max-w-2xl mx-auto">
            A single workshop is the beginning. Our LMS platform ensures that learning continues, deepens and can be tracked — long after the session ends.
          </p>
        </div>

        {/* Journey Flow Panel (Horizontal Steps) */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 sm:p-10 mb-10 backdrop-blur-md">
          <p className="font-['Instrument_Sans'] text-xs font-semibold text-white/40 uppercase tracking-[2px] mb-8">
            The Learning Journey
          </p>
          <div className="flex items-center justify-between overflow-x-auto gap-4 pb-4 no-scrollbar">
            {journeySteps.map((step, idx) => (
              <div key={idx} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center gap-3 min-w-[100px]">
                  <div 
                    className="w-12 h-12 rounded-full border flex items-center justify-center transition-transform hover:scale-105 duration-300"
                    style={{
                      borderColor: `${step.color}30`,
                      background: `${step.color}15`,
                      color: step.color
                    }}
                  >
                    {step.icon}
                  </div>
                  <span className="font-['Instrument_Sans'] text-xs font-medium text-white/70 text-center">
                    {step.label}
                  </span>
                </div>
                {idx < journeySteps.length - 1 && (
                  <div 
                    className="w-12 sm:w-16 h-0.5 mx-2"
                    style={{
                      background: `linear-gradient(to right, ${step.color}80, ${journeySteps[idx + 1].color}80)`
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* LMS + Dashboard Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Capabilities List */}
          <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 rounded-3xl p-8 sm:p-10 backdrop-blur-md flex flex-col justify-between">
            <div>
              <p className="font-['Instrument_Sans'] text-xs font-semibold text-white/40 uppercase tracking-[2px] mb-4">
                LMS Capabilities
              </p>
              <h3 className="font-['Instrument_Sans'] font-semibold text-2xl text-white tracking-tight leading-tight mb-8">
                Everything students need. Everything management can track.
              </h3>
              <div className="space-y-4">
                {lmsFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="font-['Instrument_Sans'] text-sm sm:text-base text-white/70 leading-relaxed">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dashboard Mockup */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#0e1626]/80 to-[#070b12]/80 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-md flex flex-col justify-between">
            <div>
              {/* Chrome circles */}
              <div className="flex gap-2 mb-8">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28CA42]" />
              </div>

              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="font-['Instrument_Sans'] text-xs text-white/40 block mb-1">
                    Student Learning Dashboard
                  </span>
                  <span className="font-['Instrument_Sans'] text-xs text-white/20">
                    Semester 4 — Computer Science & Engineering
                  </span>
                </div>
                <span className="font-['Instrument_Sans'] text-[10px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full uppercase tracking-wider">
                  Active
                </span>
              </div>

              {/* Progress metrics */}
              <div className="space-y-5">
                {metrics.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 + 0.2, duration: 0.4 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-['Instrument_Sans'] text-xs text-white/70">
                        {m.label}
                      </span>
                      <span className="font-['Instrument_Sans'] text-xs font-semibold" style={{ color: m.color }}>
                        {m.value}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${m.value}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 + 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${m.color}80, ${m.color})`
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom stat row */}
            <div className="border-t border-white/5 pt-6 mt-10 grid grid-cols-3 gap-4">
              {[
                { label: 'Mentor Sessions', value: '8' },
                { label: 'Projects', value: '3' },
                { label: 'Assessments', value: '12' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-['Instrument_Sans'] text-xl font-bold text-white">
                    {s.value}
                  </div>
                  <div className="font-['Instrument_Sans'] text-[10px] text-white/30 uppercase tracking-wider mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
      <style>{`
        @media (max-width: 860px) {
          .campus-lms-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

// ─── Section 9: Industry Connection ─────────────────────────────────────────

const IndustrySection = () => {
  const connections = [
    { icon: <Megaphone size={20} />, title: 'Expert Talks', desc: 'Domain professionals share experience, trends and practical wisdom with students and faculty.', color: '#1A56DB', bg: '#EBF0FB' },
    { icon: <Lightbulb size={20} />, title: 'Live Problem Statements', desc: 'Real challenges from industry contexts used as learning and project material.', color: '#0D9488', bg: '#F0FDFA' },
    { icon: <FileText size={20} />, title: 'Project Reviews', desc: 'Expert feedback on student projects from professionals with relevant domain experience.', color: '#7C3AED', bg: '#F5F3FF' },
    { icon: <Users size={20} />, title: 'Mentor Sessions', desc: 'Structured interaction with experienced practitioners who guide learning and career thinking.', color: '#D97706', bg: '#FFFBEB' },
    { icon: <MessageSquare size={20} />, title: 'Career Conversations', desc: 'Candid, honest conversations about career paths, roles and what skills truly matter.', color: '#DC2626', bg: '#FEF2F2' },
    { icon: <Globe size={20} />, title: 'Industry Exposure', desc: 'Understanding how organisations work, how decisions are made and what professional environments look like.', color: '#0891B2', bg: '#ECFEFF' },
    { icon: <Briefcase size={20} />, title: 'Internship Guidance', desc: 'How to identify, apply for and make the most of internship opportunities as a student.', color: '#16A34A', bg: '#F0FDF4' },
    { icon: <Building2 size={20} />, title: 'Corporate Engagement', desc: 'Opportunities for sustained corporate interaction tailored to your campus and department context.', color: '#9333EA', bg: '#FAF5FF' },
  ];

  return (
    <section className="relative w-full py-24 bg-[#090d16] text-white overflow-hidden" id="industry-connection">
      
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10 pointer-events-none mix-blend-screen"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=1920')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#090d16] pointer-events-none" />

      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block font-['Instrument_Sans'] text-xs font-semibold uppercase tracking-[2px] text-blue-400 bg-blue-400/10 px-4 py-1.5 rounded-full border border-blue-400/20">
            Industry Connection
          </span>
          <h2 className="font-['Instrument_Sans'] font-semibold text-3xl sm:text-5xl leading-tight">
            Bring the industry<br />closer to campus.
          </h2>
          <p className="font-['Instrument_Sans'] text-white/50 text-lg sm:text-[19px] leading-relaxed max-w-2xl mx-auto">
            Industry exposure should not be a once-a-year event. We create structured, recurring touchpoints that give students a genuine window into professional life.
          </p>
        </div>

        {/* Grid of Connections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 campus-industry-connections-grid">
          {connections.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group bg-[#0e1626]/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-white/10"
              whileHover={{
                boxShadow: `0 8px 30px ${c.color}15`,
                borderColor: `${c.color}25`
              }}
            >
              <div>
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform"
                  style={{
                    background: `${c.color}15`,
                    color: c.color,
                    border: `1px solid ${c.color}25`
                  }}
                >
                  {c.icon}
                </div>
                <h4 className="font-['Instrument_Sans'] font-semibold text-base text-white mb-2 leading-tight">
                  {c.title}
                </h4>
                <p className="font-['Instrument_Sans'] text-xs sm:text-sm text-white/50 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Honest note */}
        <div className="mt-12 bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 flex items-start gap-4">
          <Shield size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="font-['Instrument_Sans'] text-sm text-white/60 leading-relaxed">
            <strong className="text-white">Our commitment to honesty:</strong> We do not make placement guarantees, claim verified referral counts, or cite partnerships that we cannot substantiate. Every industry engagement we facilitate is real, structured and purposeful.
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 1060px) {
          .campus-industry-connections-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .campus-industry-connections-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

// ─── Section 10: Management Dashboard ───────────────────────────────────────

const DashboardSection = () => {
  const metrics = [
    { label: 'Student Participation', value: '847', sub: 'Active students this semester', color: '#3B82F6', icon: <Users size={16} /> },
    { label: 'Learning Completion', value: '73%', sub: 'LMS module completion rate', color: '#10B981', icon: <CheckCheck size={16} /> },
    { label: 'Assessment Progress', value: '91%', sub: 'Students with ≥1 assessment done', color: '#8B5CF6', icon: <Award size={16} /> },
    { label: 'Project Milestones', value: '412', sub: 'Projects submitted across departments', color: '#F59E0B', icon: <FolderOpen size={16} /> },
    { label: 'Mentor Engagement', value: '68%', sub: 'Students with mentor interaction', color: '#EF4444', icon: <Users size={16} /> },
    { label: 'Career-Readiness Activity', value: '59%', sub: 'Students engaged in readiness sessions', color: '#06B6D4', icon: <Target size={16} /> },
  ];

  const departments = [
    { name: 'Computer Science & Engineering', students: 240, completion: 78, color: '#3B82F6' },
    { name: 'Electronics & Communication', students: 180, completion: 65, color: '#10B981' },
    { name: 'Mechanical Engineering', students: 160, completion: 54, color: '#F59E0B' },
    { name: 'Information Technology', students: 267, completion: 82, color: '#8B5CF6' },
  ];

  return (
    <section className="relative w-full py-24 bg-[#020617] text-white overflow-hidden" id="outcomes">
      
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10 pointer-events-none mix-blend-screen"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1920')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#090d16] via-transparent to-[#020617] pointer-events-none" />

      {/* Decorative Blur Glows */}
      <div className="absolute top-1/3 left-1/10 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/10 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6">
        
        {/* Split Presentation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Overall Stats & Header */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <h2 className="font-['Instrument_Sans'] font-semibold text-3xl sm:text-5xl leading-tight">
                Visibility for management.<br />Growth for students.
              </h2>
              <p className="font-['Instrument_Sans'] text-white/50 text-base sm:text-lg leading-relaxed">
                Aiiens provides structured reviews and transparent reports so institutions can see engagement, progress and areas for improvement — at program, department and student level.
              </p>
              
              {/* Illustrative warning banner */}
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-1.5 rounded-full mt-2">
                <AlertCircle size={12} className="text-red-400" />
                <span className="font-['Instrument_Sans'] text-[10px] font-semibold text-red-300 uppercase tracking-wider">
                  Illustrative preview — not live institutional data
                </span>
              </div>
            </div>

            {/* Quick Metrics Grid (2 columns) */}
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="bg-[#0e1626]/40 border border-white/5 rounded-xl p-4 flex flex-col justify-between"
                  style={{ minHeight: '120px' }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div 
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${m.color}15`,
                        color: m.color,
                        border: `1px solid ${m.color}25`
                      }}
                    >
                      {m.icon}
                    </div>
                    <span className="font-['Instrument_Sans'] text-[9px] text-white/20 uppercase tracking-widest">
                      Illustrative
                    </span>
                  </div>
                  <div>
                    <div className="font-['Instrument_Sans'] text-2xl font-bold text-white leading-none mb-1">
                      {m.value}
                    </div>
                    <div className="font-['Instrument_Sans'] text-[10px] text-white/50 leading-tight">
                      {m.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Detailed Department Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-7 bg-[#0e1626]/60 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-md flex flex-col justify-between"
          >
            <div>
              {/* Chrome headers */}
              <div className="flex gap-2 mb-8">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28CA42]" />
              </div>

              <div className="mb-8">
                <p className="font-['Instrument_Sans'] text-xs font-semibold text-white/40 uppercase tracking-[2px] mb-2">
                  Department-Level Reporting
                </p>
                <h3 className="font-['Instrument_Sans'] font-semibold text-xl sm:text-2xl text-white tracking-tight leading-tight">
                  Completion rate by department
                </h3>
              </div>

              <div className="space-y-6">
                {departments.map((d, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="font-['Instrument_Sans'] font-semibold text-sm text-white/80">
                          {d.name}
                        </span>
                        <span className="font-['Instrument_Sans'] text-xs text-white/30 ml-3">
                          {d.students} students
                        </span>
                      </div>
                      <span className="font-['Instrument_Sans'] text-sm font-semibold" style={{ color: d.color }}>
                        {d.completion}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${d.completion}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 + 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${d.color}80, ${d.color})`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom mini disclaimer or info */}
            <div className="border-t border-white/5 pt-6 mt-10">
              <p className="font-['Instrument_Sans'] text-xs text-white/30 leading-relaxed">
                All reporting interfaces compile real-time student activity data, providing administrative visibility across domains, capstone evaluations, and readiness checkmarks.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
      <style>{`
        @media (max-width: 860px) {
          .campus-metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .campus-metrics-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

// ─── Section 11: Why Aiiens ──────────────────────────────────────────────────

const WhyAiiensSection = () => {
  const traditional = [
    'Learn concepts from lectures and textbooks',
    'Complete the syllabus and pass examinations',
    'Earn an academic certificate or degree',
  ];
  const aiiens = [
    'Learn concepts with structured depth',
    'Practise through guided exercises and LMS paths',
    'Build real projects with mentor guidance',
    'Receive expert feedback and iterate',
    'Validate capability through assessment and review',
    'Become career-ready with portfolio and confidence',
  ];
  const principles = [
    { label: 'Student-Centric', icon: <GraduationCap size={20} />, desc: 'Every program is designed around what the student needs to grow.', color: '#1A56DB' },
    { label: 'Future-Ready', icon: <Layers size={20} />, desc: 'Skills and exposure aligned with how industry is evolving.', color: '#0D9488' },
    { label: 'Project-Driven', icon: <FolderOpen size={20} />, desc: 'Learning is real only when students build and create.', color: '#7C3AED' },
    { label: 'Mentor-Guided', icon: <Users size={20} />, desc: 'Expert guidance accelerates learning and builds direction.', color: '#D97706' },
    { label: 'Career-Focused', icon: <Target size={20} />, desc: 'Readiness for the real world is built throughout, not at the end.', color: '#DC2626' },
    { label: 'Institution-Friendly', icon: <Handshake size={20} />, desc: 'We work with your college structure, calendar and faculty.', color: '#0891B2' },
  ];

  return (
    <section className="relative w-full py-24 bg-[#020617] text-white overflow-hidden" id="why-aiiens">
      
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10 pointer-events-none mix-blend-screen"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1920')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#090d16] via-transparent to-[#020617] pointer-events-none" />

      {/* Decorative Glows */}
      <div className="absolute top-1/4 right-1/10 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/10 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block font-['Instrument_Sans'] text-xs font-semibold uppercase tracking-[2px] text-blue-400 bg-blue-400/10 px-4 py-1.5 rounded-full border border-blue-400/20">
            Why Aiiens Campus
          </span>
          <h2 className="font-['Instrument_Sans'] font-semibold text-3xl sm:text-5xl leading-tight">
            Beyond content.<br />Built for capability.
          </h2>
          <p className="font-['Instrument_Sans'] text-white/50 text-lg sm:text-[19px] leading-relaxed max-w-2xl mx-auto">
            There is a meaningful difference between consuming content and building capability. The Aiiens journey is designed to create the latter.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 campus-why-compare">
          
          {/* Traditional */}
          <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 sm:p-10 backdrop-blur-md">
            <p className="font-['Instrument_Sans'] text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-2">
              Traditional Approach
            </p>
            <h4 className="font-['Instrument_Sans'] font-semibold text-xl text-white mb-6">
              Content-first learning
            </h4>
            <div className="space-y-3">
              {traditional.map((t, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4">
                  <ChevronRight size={14} className="text-white/30" />
                  <span className="font-['Instrument_Sans'] text-sm text-white/50">{t}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl font-['Instrument_Sans'] text-xs text-white/40 leading-relaxed">
              Result: Academic achievement, but limited practical readiness
            </div>
          </div>

          {/* Aiiens */}
          <div className="bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/20 rounded-3xl p-8 sm:p-10 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />
            <p className="font-['Instrument_Sans'] text-[10px] font-bold text-emerald-400 uppercase tracking-[2px] mb-2">
              The Aiiens Journey
            </p>
            <h4 className="font-['Instrument_Sans'] font-semibold text-xl text-white mb-6">
              Capability-first development
            </h4>
            <div className="space-y-3">
              {aiiens.map((t, i) => (
                <div key={i} className="flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4">
                  <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                  <span className="font-['Instrument_Sans'] text-sm text-white/80">{t}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl font-['Instrument_Sans'] text-xs text-emerald-300/80 leading-relaxed">
              Result: Confident, capable students ready for the real world
            </div>
          </div>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 campus-principles-grid-inner">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="bg-[#0e1626]/40 border border-white/5 hover:border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:-translate-y-1"
              whileHover={{
                boxShadow: `0 8px 30px ${p.color}15`,
                borderColor: `${p.color}25`
              }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: `${p.color}15`,
                  color: p.color,
                  border: `1px solid ${p.color}25`
                }}
              >
                {p.icon}
              </div>
              <h5 className="font-['Instrument_Sans'] font-semibold text-base text-white">
                {p.label}
              </h5>
              <p className="font-['Instrument_Sans'] text-xs sm:text-sm text-white/50 leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) {
          .campus-why-compare { grid-template-columns: 1fr !important; }
          .campus-principles-grid-inner { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .campus-principles-grid-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

// ─── Section 12: Partnership Models ─────────────────────────────────────────

const PartnershipModels = () => {
  const models = [
    {
      icon: <Building2 size={24} />,
      title: 'Campus Industry-Readiness Ecosystem',
      desc: 'A full-semester, institution-wide program that integrates workshops, LMS learning, projects, mentorship, career readiness and reporting across departments.',
      points: ['All departments', 'Semester-aligned', 'Comprehensive reporting', 'Faculty coordination'],
      color: '#1A56DB',
      bg: '#EBF0FB',
      featured: true,
    },
    {
      icon: <Layers size={24} />,
      title: 'Department-Specific Skill Programs',
      desc: 'Targeted skill programs for specific departments or student cohorts, aligned to domain needs and semester priorities.',
      points: ['Domain-specific', 'Single department or batch', 'Flexible scope', 'Measurable outcomes'],
      color: '#0D9488',
      bg: '#F0FDFA',
      featured: false,
    },
    {
      icon: <FolderOpen size={24} />,
      title: 'Project, Innovation & Mentorship Labs',
      desc: 'Dedicated project and mentorship environments where students work on structured problems with expert guidance and feedback.',
      points: ['Real-world problem statements', 'Expert mentor access', 'Portfolio output', 'Cross-batch cohorts'],
      color: '#7C3AED',
      bg: '#F5F3FF',
      featured: false,
    },
    {
      icon: <Target size={24} />,
      title: 'Career Readiness & Placement Preparation',
      desc: 'A focused program for pre-final and final year students covering aptitude, communication, resume, mock interviews and internship navigation.',
      points: ['Pre-final & final year', 'Aptitude training', 'Mock interviews', 'Portfolio review'],
      color: '#D97706',
      bg: '#FFFBEB',
      featured: false,
    },
  ];

  return (
    <section className="relative w-full py-24 bg-[#090d16] text-white overflow-hidden" id="partnership-model">
      
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10 pointer-events-none mix-blend-screen"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#090d16] pointer-events-none" />

      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block font-['Instrument_Sans'] text-xs font-semibold uppercase tracking-[2px] text-blue-400 bg-blue-400/10 px-4 py-1.5 rounded-full border border-blue-400/20">
            Partnership Options
          </span>
          <h2 className="font-['Instrument_Sans'] font-semibold text-3xl sm:text-5xl leading-tight">
            Flexible models for<br />different campus needs.
          </h2>
          <p className="font-['Instrument_Sans'] text-white/50 text-lg sm:text-[19px] leading-relaxed max-w-2xl mx-auto">
            Whether you want a comprehensive institution-wide program or a focused intervention for a specific department or year — we have a model for your context.
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 campus-models-grid">
          {models.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="group relative bg-[#0e1626]/40 border rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              style={{
                borderColor: m.featured ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255,255,255,0.05)',
                background: m.featured ? 'linear-gradient(135deg, rgba(15,45,94,0.3) 0%, rgba(30,58,138,0.2) 100%)' : 'rgba(14,22,38,0.4)',
                boxShadow: m.featured ? '0 10px 40px rgba(59, 130, 246, 0.1)' : '0 4px 30px rgba(0,0,0,0.2)'
              }}
              whileHover={{
                borderColor: m.featured ? 'rgba(59, 130, 246, 0.5)' : `${m.color}30`,
                boxShadow: m.featured ? '0 15px 45px rgba(59, 130, 246, 0.2)' : `0 8px 30px ${m.color}15`
              }}
            >
              {m.featured && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full pointer-events-none" />
              )}
              
              <div>
                {m.featured && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    <Star size={10} className="fill-emerald-400" /> Most comprehensive
                  </div>
                )}
                
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: `${m.color}15`,
                    color: m.color,
                    border: `1px solid ${m.color}25`
                  }}
                >
                  {m.icon}
                </div>

                <h4 className="font-['Instrument_Sans'] font-semibold text-lg text-white mb-3">
                  {m.title}
                </h4>
                
                <p className="font-['Instrument_Sans'] text-sm text-white/50 leading-relaxed mb-6">
                  {m.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {m.points.map((pt, j) => (
                    <span 
                      key={j} 
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: `${m.color}10`,
                        color: m.color,
                        border: `1px solid ${m.color}20`
                      }}
                    >
                      {pt}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 font-['Instrument_Sans'] font-semibold text-xs px-6 py-3 rounded-full transition-all self-start"
                style={{
                  background: m.featured ? '#ffffff' : 'rgba(255,255,255,0.05)',
                  color: m.featured ? '#0b1329' : '#ffffff',
                  border: m.featured ? 'none' : '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <span>Book a Consultation</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
      <style>{`
        @media (max-width: 768px) {
          .campus-models-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

// ─── Section 13: Social Proof ────────────────────────────────────────────────

const SocialProofSection = () => (
  <section className="relative w-full py-24 bg-[#030712] text-white overflow-hidden" id="resources">
    
    {/* Background Image & Overlay */}
    <div 
      className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10 pointer-events-none mix-blend-screen"
      style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=1920')` 
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-[#090d16] via-transparent to-[#030712] pointer-events-none" />

    {/* Decorative Glows */}
    <div className="absolute top-1/4 right-1/10 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

    <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="inline-block font-['Instrument_Sans'] text-xs font-semibold uppercase tracking-[2px] text-blue-400 bg-blue-400/10 px-4 py-1.5 rounded-full border border-blue-400/20">
          Built with Institutions
        </span>
        <h2 className="font-['Instrument_Sans'] font-semibold text-3xl sm:text-5xl leading-tight">
          Designed for student impact.
        </h2>
        <p className="font-['Instrument_Sans'] text-white/50 text-lg sm:text-[19px] leading-relaxed max-w-2xl mx-auto">
          We are building institutional partnerships with the rigour and honesty they deserve. Real proof takes time to gather — and we believe in sharing only what is verified.
        </p>
      </div>

      {/* Dashed coming soon container */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white/[0.01] border-2 border-dashed border-white/10 rounded-3xl p-10 sm:p-16 text-center max-w-2xl mx-auto backdrop-blur-md"
      >
        <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/10 text-blue-400 flex items-center justify-center mx-auto mb-6">
          <Shield size={28} />
        </div>
        <h3 className="font-['Instrument_Sans'] font-semibold text-xl text-white mb-4">
          Partnership stories — coming soon
        </h3>
        <p className="font-['Instrument_Sans'] text-sm sm:text-base text-white/50 leading-relaxed max-w-lg mx-auto mb-8">
          We do not use invented testimonials, fabricated case studies or unverified institution logos. As our institutional partnerships mature, we will share real program scopes, honest outcomes and verified stories — with full permission from the institutions involved.
        </p>
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400">
          <CheckCircle2 size={16} />
          <span>Only verified, institution-approved proof will appear here</span>
        </div>
      </motion.div>

      {/* Downloadable resource */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
        <p className="font-['Instrument_Sans'] text-sm text-white/50">
          Want to understand our model better before scheduling a conversation?
        </p>
        <a
          href="/AIIENS Brochure.pdf"
          download
          className="group flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-['Instrument_Sans'] font-semibold text-xs px-6 py-3 rounded-full transition-all"
        >
          <Download size={14} />
          <span>Request Partnership Deck</span>
        </a>
      </div>

    </div>
  </section>
);

// ─── Final CTA + Lead Form ───────────────────────────────────────────────────

const ContactSection = () => {
  const [form, setForm] = useState({
    name: '', designation: '', college: '', city: '',
    email: '', phone: '', message: '', consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative w-full py-24 bg-[#020617] text-white overflow-hidden" id="contact">
      
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10 pointer-events-none mix-blend-screen"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1920')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#090d16] via-transparent to-[#020617] pointer-events-none" />

      {/* Decorative Glows */}
      <div className="absolute top-1/3 left-1/10 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/10 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start campus-contact-grid">
          
          {/* Left: Messaging */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-block font-['Instrument_Sans'] text-xs font-semibold uppercase tracking-[2px] text-blue-400 bg-blue-400/10 px-4 py-1.5 rounded-full border border-blue-400/20">
              Let's start a conversation
            </span>
            <h2 className="font-['Instrument_Sans'] font-semibold text-3xl sm:text-5xl leading-tight">
              Let's design an industry-readiness roadmap for your campus.
            </h2>
            <p className="font-['Instrument_Sans'] text-white/50 text-base sm:text-lg leading-relaxed">
              Tell us about your departments, student strengths and institutional priorities. Our team will help you map a meaningful, honest intervention — without pressure.
            </p>
            
            <div className="space-y-6 pt-4">
              {[
                { icon: <CalendarCheck size={18} />, title: 'Free institutional consultation', desc: 'A focused conversation to understand your campus context and priorities.' },
                { icon: <FileText size={18} />, title: 'Customised program map', desc: 'We share a proposed approach aligned to your departments and semester structure.' },
                { icon: <Shield size={18} />, title: 'No pressure, no commitments', desc: 'Our goal is to help you make the right decision for your institution.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-['Instrument_Sans'] font-semibold text-sm text-white">
                      {item.title}
                    </h4>
                    <p className="font-['Instrument_Sans'] text-xs text-white/50 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7 bg-[#0e1626]/60 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-md">
            {submitted ? (
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-['Instrument_Sans'] font-semibold text-xl text-white">
                  Thank you for reaching out.
                </h3>
                <p className="font-['Instrument_Sans'] text-sm sm:text-base text-white/50 leading-relaxed max-w-md mx-auto">
                  We have received your consultation request. Our team will review your institution's context and be in touch within 2 working days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-['Instrument_Sans'] font-semibold text-xl text-white">
                    Book a Management Consultation
                  </h3>
                  <p className="font-['Instrument_Sans'] text-xs text-white/40 mt-1">
                    All fields help us prepare for a more productive first conversation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 campus-form-fields">
                  {[
                    { name: 'name', label: 'Your Name', placeholder: 'Full name', type: 'text', required: true },
                    { name: 'designation', label: 'Designation', placeholder: 'e.g. Principal, Dean, HoD', type: 'text', required: true },
                    { name: 'college', label: 'College / University', placeholder: 'Institution name', type: 'text', required: true, full: true },
                    { name: 'email', label: 'Institutional Email', placeholder: 'you@college.edu', type: 'email', required: true },
                    { name: 'phone', label: 'Phone Number', placeholder: '+91', type: 'tel', required: true },
                    { name: 'city', label: 'City & State', placeholder: 'e.g. Hyderabad, Telangana', type: 'text', required: true, full: true },
                  ].map(field => (
                    <div key={field.name} style={{ gridColumn: field.full ? '1 / -1' : undefined }} className="space-y-2">
                      <label className="block font-['Instrument_Sans'] text-xs font-semibold text-white/70">
                        {field.label} {field.required && <span className="text-red-400">*</span>}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                  ))}

                  {/* Message - full width */}
                  <div className="grid grid-cols-1 col-span-full space-y-2">
                    <label className="block font-['Instrument_Sans'] text-xs font-semibold text-white/70">
                      Message / Context
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your institution's current context, what you're hoping to achieve, or any specific departments or student groups you'd like to focus on."
                      rows={4}
                      className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all resize-vertical"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={form.consent}
                    onChange={handleChange}
                    required
                    className="mt-1 cursor-pointer"
                  />
                  <label htmlFor="consent" className="font-['Instrument_Sans'] text-xs text-white/40 leading-relaxed cursor-pointer select-none">
                    I agree to let Aiiens Campus contact me regarding this consultation request. We will not share your information or send spam.
                  </label>
                </div>

                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-['Instrument_Sans'] font-semibold text-sm py-4 rounded-full transition-all shadow-[0_4px_20px_rgba(59,130,246,0.25)]"
                >
                  <Send size={16} />
                  <span>Book a Management Consultation</span>
                </button>
                <p className="text-center font-['Instrument_Sans'] text-[10px] text-white/30">
                  We respond within 2 working days. No spam, no sales pressure.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .campus-contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .campus-form-fields { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

// ─── Hero Section ────────────────────────────────────────────────────────────

const HeroSection = () => {
  const videoRef = useRef(null);
  const videoSrc = "https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((e) => console.log("Auto-play prevented:", e));
      });
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((e) => console.log("Auto-play prevented:", e));
      });
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        poster="https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjB0ZWNobm9sb2d5JTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3Njg5NzIyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

      {/* Decorative Gradients */}
      <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-900/20 blur-[120px] mix-blend-screen rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-indigo-900/20 blur-[120px] mix-blend-screen rounded-full pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 mt-20 flex flex-col items-center text-center space-y-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="font-['Instrument_Serif'] text-3xl sm:text-5xl lg:text-[48px] leading-[1.1] text-white"
        >
          Engineering Education, Upgraded.
        </motion.h2>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-['Instrument_Sans'] font-semibold text-6xl sm:text-8xl lg:text-[136px] leading-[0.9] tracking-tighter bg-gradient-to-b from-white via-white to-[#b4c0ff] bg-clip-text text-transparent"
        >
          Career Ready.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.7 }} 
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-['Instrument_Sans'] text-lg sm:text-[20px] leading-[1.65] text-white opacity-70 max-w-xl mx-auto"
        >
          We partner with engineering colleges to build structured, semester-wise industry-readiness programs.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center pl-6 pr-2 py-2 rounded-full bg-white transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <span className="font-['Instrument_Sans'] font-medium text-lg text-[#0a0400] mr-4">Book a Management Consultation</span>
            <div className="w-10 h-10 rounded-full bg-[#3054ff] group-hover:bg-[#2040e0] flex items-center justify-center transition-colors">
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </button>

          <a 
            href="/AIIENS Brochure.pdf"
            download
            className="group flex items-center gap-2 px-4 py-2 rounded-lg font-['Instrument_Sans'] text-white/70 hover:text-white backdrop-blur-sm hover:bg-white/5 transition-all"
          >
            Download Partnership Deck
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// ─── FAQ Section ─────────────────────────────────────────────────────────────

const FaqSection = () => {
  const faqs = [
    {
      q: "Does this disrupt our academic calendar?",
      a: "No. The semester pathway is co-created with your department heads to align exactly with your existing academic calendar, ensuring zero disruption to regular coursework and exams."
    },
    {
      q: "Do you guarantee placements for our students?",
      a: "We do not offer fake placement guarantees. We guarantee measurable capability building, portfolio development, and interview readiness, which naturally leads to better placement outcomes."
    },
    {
      q: "Who conducts the workshops and mentorship sessions?",
      a: "Sessions are conducted by verified industry practitioners and subject matter experts with real-world experience, not just academic trainers."
    },
    {
      q: "How does the college management track progress?",
      a: "Management receives access to a transparent dashboard and regular milestone reports showing student engagement, module completion, and assessment scores at both a cohort and individual level."
    },
    {
      q: "Can this be customized for specific departments?",
      a: "Yes. We offer both institution-wide ecosystem programs and department-specific skill paths tailored to the unique domain requirements of branches like CS, EC, or Mechanical."
    }
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="relative w-full py-24 bg-[#090d16] text-white overflow-hidden" id="faq">
      
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-10 pointer-events-none mix-blend-screen"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=1920')` 
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#090d16] pointer-events-none" />

      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block font-['Instrument_Sans'] text-xs font-semibold uppercase tracking-[2px] text-blue-400 bg-blue-400/10 px-4 py-1.5 rounded-full border border-blue-400/20">
            FAQ
          </span>
          <h2 className="font-['Instrument_Sans'] font-semibold text-3xl sm:text-5xl leading-tight">
            Common questions from college leadership.
          </h2>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="border rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-md"
              style={{
                borderColor: openIdx === i ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                background: openIdx === i ? 'rgba(14, 22, 38, 0.8)' : 'rgba(14, 22, 38, 0.4)'
              }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                className="w-full px-6 py-5 flex justify-between items-center bg-none border-none cursor-pointer text-left outline-none"
              >
                <span className="font-['Instrument_Sans'] font-semibold text-sm sm:text-base text-white">
                  {faq.q}
                </span>
                <motion.div 
                  animate={{ rotate: openIdx === i ? 180 : 0 }}
                  className="text-white/60 flex-shrink-0 ml-4"
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-5 font-['Instrument_Sans'] text-xs sm:text-sm text-white/50 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { useLocation } from 'react-router-dom';

// ─── Main Page ───────────────────────────────────────────────────────────────

const HomePage = () => {
  const location = useLocation();

  useEffect(() => { 
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      window.scrollTo(0, 0); 
    }
  }, [location.hash]);

  return (
    <div className="campus-page">
      <Helmet>
        <title>Aiiens Campus | Industry-Readiness Partner for Engineering Colleges</title>
        <meta
          name="description"
          content="Aiiens Campus partners with engineering colleges to build industry-ready students through workshops, structured training, LMS learning, projects, mentorship and career readiness — semester by semester."
        />
        <meta property="og:title" content="Aiiens Campus | Industry-Readiness Partner for Engineering Colleges" />
        <meta property="og:description" content="Aiiens Campus works alongside engineering institutions to build structured, semester-wise industry-readiness programs." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Aiiens Campus",
            "url": "https://aiiensedu.com",
            "logo": "https://aiiensedu.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-90141-10638",
              "contactType": "Institutional Partnerships",
              "email": "campus@aiiensedu.com"
            }
          })}
        </script>
      </Helmet>

      <CampusHeader />

      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. The Gap */}
        <GapSection />

        {/* 3. Ecosystem */}
        <LandingStudentEcosystem />

        {/* 4. Institutional Value */}
        <LandingCollegePartnership />

        {/* 5. Implementation Flow */}
        <LandingImplementationFlow />

        {/* 6. Semester Pathway */}
        <LandingSemesterPathway />

        {/* 7. LMS / Continuous Learning */}
        <LmsSection />

        {/* 8. Career Readiness */}
        <LandingCareerSupport />

        {/* 10. Management Dashboard */}
        <DashboardSection />

        {/* 12. Partnership Models */}
        <PartnershipModels />

        {/* FAQ */}
        <FaqSection />

        {/* Final CTA + Lead Form */}
        <ContactSection />
      </main>

      <CampusFooter />
    </div>
  );
};

export default HomePage;
