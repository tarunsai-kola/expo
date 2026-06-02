import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Calendar, Clock, Share2, CheckCircle2, 
  Users, Star, PlayCircle, Download, X, Plus, Minus,
  Globe, Award, Video, Zap, BookOpen, BrainCircuit
} from 'lucide-react';
import img from "../assets/atorax_certificate.png";

const MasterClass = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);
  const [isRegisterForm, setisRegisterForm] = useState(false);
  const [isDownloadForm, setisDownloadForm] = useState(false);
  const [allMasterClass, setallMasterClass] = useState([]);
  const [upcomingMasterClass, setUpcomingMasterClass] = useState([]);
  const [ongoingMasterClass, setOngoingMasterClass] = useState([]);
  const [completedMasterClass, setCompletedMasterClass] = useState([]);
  const [selectedMasterClass, setSelectedMasterClass] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    field: "",
    phone: "",
  });

  const faqs = [
    { question: "How do I register for the masterclass?", answer: "Simply click the Register Now button and fill in your required details and join the community group." },
    { question: "Will I receive a certificate?", answer: "Yes! After completing a MasterClass, you will receive a certificate of completion." },
    { question: "Do I need to pay any fees?", answer: "Our MasterClasses are free of cost, making learning accessible to everyone." },
    { question: "Can I interact with the mentor?", answer: "Yes! Our sessions are live and interactive, allowing you to ask questions and engage with mentors." },
    { question: "What are the technical requirements to attend?", answer: "A stable internet connection, a laptop or mobile device, and a willingness to learn!" },
    { question: "How do I access the Masterclass session link?", answer: "Once registered, you will receive the session link via email before the class starts even you will be added community group." },
  ];

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  const closeForm = () => {
    setisRegisterForm(false);
    setisDownloadForm(false);
    setSelectedMasterClass(null);
    setFormData({ name: "", email: "", experience: "", field: "", phone: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "email" ? value.toLowerCase() : value });
  };

  const fetchMasterclass = async () => {
    try {
      const response = await axios.get(`${API}/allmasterclasswithsapplicant`);
      const data = response.data || [];
      setallMasterClass(data.filter((item) => item.status === "upcoming" || item.status === "ongoing"));
      setUpcomingMasterClass(data.filter((item) => item.status === "upcoming"));
      setOngoingMasterClass(data.filter((item) => item.status === "ongoing"));
      setCompletedMasterClass(data.filter((item) => item.status === "completed"));
    } catch (error) {
      console.error("There was an error fetching MasterClass:", error);
    }
  };

  useEffect(() => {
    fetchMasterclass();
  }, []);

  const handleDownload = (masterClass) => {
    setSelectedMasterClass(masterClass);
    setisDownloadForm(true);
  };

  const downloadCertificate = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    setIsSubmitting(true);
    try {
      const response = await axios.get(`${API}/masterclassauth/${selectedMasterClass._id}/${email}`);
      const certificateData = response.data;
      setisDownloadForm(false);
      setSelectedMasterClass(null);

      if (!certificateData.certificate) throw new Error("Certificate not available");

      const imageResponse = await fetch(certificateData.certificate);
      const blob = await imageResponse.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "certificate.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
      toast.success("Certificate downloaded successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API}/masterclassapply/${selectedMasterClass._id}`, formData);
      toast.success("Successfully Applied! Join our Community group");
      setTimeout(() => {
        if(selectedMasterClass?.link) window.open(selectedMasterClass.link, "_blank");
      }, 3000);
      fetchMasterclass();
      closeForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error applying for MasterClass");
    } finally {
      setIsSubmitting(false);
    }
  };

  const slugify = (text) => text?.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-") || "";

  const handleShare = async (masterclass) => {
    const slug = masterclass?.title ? slugify(masterclass.title) : "";
    const shareUrl = slug ? `${window.location.origin}/MasterClass/${slug}` : window.location.origin;
    if (navigator.share) {
      try {
        await navigator.share({ title: masterclass?.title, text: `Check out this Masterclass`, url: shareUrl });
        return;
      } catch (err) {
        console.error("Share failed", err);
      }
    }
    navigator.clipboard.writeText(shareUrl).then(() => toast.success("Link copied!")).catch(() => toast.error("Failed to copy link"));
  };

  const convertGoogleDriveUrl = (url) => {
    if (!url || typeof url !== "string") return url;
    const trimmed = url.trim();
    if (trimmed.includes("lh3.googleusercontent.com")) return trimmed;
    const fileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([^/?&#]+)/);
    if (fileMatch) return `https://lh3.googleusercontent.com/d/${fileMatch[1]}`;
    const idMatch = trimmed.match(/[?&]id=([^&#]+)/);
    if (idMatch && trimmed.includes("drive.google.com")) return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
    return trimmed;
  };

  const activeMasterClasses = [...allMasterClass].sort((a, b) => new Date(a.start) - new Date(b.start));

  return (
    <div className="bg-[#05050A] text-zinc-300 font-sans min-h-screen selection:bg-blue-500/30">
      <Helmet>
        <title>Atorax MasterClass | Upskill in Tech</title>
        <meta name="description" content="Join Atorax MasterClass to learn top tech skills from industry leaders." />
      </Helmet>
      <Toaster position="top-center" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80vw] max-w-4xl aspect-square bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-blue-400 mb-8 backdrop-blur-md">
              <Zap size={14}/> Elevate Your Career
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-6">
              Master Tech with <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Top Experts
              </span>
            </h1>
            
            <p className="text-xl text-zinc-400 leading-relaxed mb-10 max-w-2xl mx-auto font-light">
              Join Atorax MasterClass to learn directly from industry engineers. Free, interactive, and career-focused sessions in AI, Data Science, and Full Stack.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => document.getElementById('active-classes').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                Explore Classes <Play size={18}/>
              </button>
              <button onClick={() => document.getElementById('why-join').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                Why Join Us?
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="max-w-6xl mx-auto px-6 mt-20 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-xl">
            {[
              { icon: Users, label: "Learners", value: "10K+" },
              { icon: Star, label: "Average Rating", value: "4.8" },
              { icon: PlayCircle, label: "Active Classes", value: (upcomingMasterClass.length + ongoingMasterClass.length).toString() },
              { icon: CheckCircle2, label: "Completed Sessions", value: completedMasterClass.length.toString() }
            ].map((stat, i) => (
              <div key={i} className="p-6 text-center border-r last:border-0 border-white/5">
                <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        
        {/* Active Classes Grid */}
        <section id="active-classes">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Active Classes</h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">Practical masterclasses led by industry professionals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeMasterClasses.map((mc, idx) => (
              <motion.article 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={mc._id} 
                className="group relative bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden cursor-pointer bg-[#0a0a12]" onClick={() => navigate(`/MasterClass/${slugify(mc.title)}`)}>
                  <img src={convertGoogleDriveUrl(mc.image)} alt={mc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border shadow-lg backdrop-blur-md
                      ${mc.status === 'ongoing' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-blue-500/20 text-blue-300 border-blue-500/30'}`}>
                      {mc.status}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow relative">
                  <div className="absolute -top-6 right-6 w-12 h-12 bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center text-blue-400 shadow-xl">
                    <Play size={20} className="ml-1" />
                  </div>
                  
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Users size={14}/> {(mc.applications?.length || 0) + 124} Registered
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-6 line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">
                    {mc.title}
                  </h3>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-sm text-zinc-400">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><Calendar size={14} className="text-blue-400"/></div>
                      <span className="font-medium text-zinc-300">{new Date(mc.start).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-400">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><Clock size={14} className="text-blue-400"/></div>
                      <span className="font-medium text-zinc-300">
                        {new Date(mc.start).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center gap-3 pt-6 border-t border-white/5">
                    <button onClick={() => navigate(`/MasterClass/${slugify(mc.title)}`)} className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors">
                      View Details
                    </button>
                    <button onClick={() => handleShare(mc)} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5 transition-all">
                      <Share2 size={18}/>
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
            {activeMasterClasses.length === 0 && (
              <div className="col-span-full py-20 text-center text-zinc-600 bg-white/[0.02] rounded-3xl border border-white/5">
                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl">No active masterclasses at the moment. Check back soon!</p>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Us */}
        <section id="why-join">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Why Choose Atorax</h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">We focus on real outcomes, not just theory.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Designed for the AI Era", desc: "Learn bleeding-edge technologies demanded in top tier product companies." },
              { icon: Award, title: "Verified Certificate", desc: "Get recognized by top recruiters with our official completion certificate." },
              { icon: Video, title: "100% Live", desc: "No pre-recorded boring lectures. Real-time interaction and Q&A." },
              { icon: Zap, title: "Top Instructors", desc: "Mentored by engineers from FAANG and high-growth startups." },
              { icon: BookOpen, title: "Bonus Resources", desc: "Get access to exclusive mindmaps, cheat sheets, and code repositories." },
              { icon: BrainCircuit, title: "Live Quizzes", desc: "Test your knowledge immediately during the class and get instant feedback." }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Certificate Banner */}
          <div className="mt-16 rounded-[32px] overflow-hidden border border-white/10 bg-gradient-to-br from-indigo-900/40 to-blue-900/20 backdrop-blur-xl relative flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 p-12 md:p-16 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                <CheckCircle2 size={14}/> Official Credential
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-6">Certified Excellence</h3>
              <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                Validate your expertise with an industry-recognized certificate. Share your success directly to LinkedIn and stand out to top recruiters.
              </p>
              <ul className="space-y-4">
                {['Verifiable Unique URL', '1-Click LinkedIn Integration', 'High-Resolution PDF'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white font-medium">
                    <CheckCircle2 className="text-emerald-400" size={20}/> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-1/2 p-12 flex justify-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.2),transparent)]"></div>
              <img src={img} alt="Certificate" className="relative z-10 w-full max-w-md rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 transform rotate-2 hover:rotate-0 transition-transform duration-500" />
            </div>
          </div>
        </section>

        {/* Completed Masterclasses */}
        {completedMasterClass.length > 0 && (
          <section>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-white mb-4">Completed Sessions</h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto">Watch recordings and grab certificates of past sessions.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...completedMasterClass].reverse().map((mc) => (
                <div key={mc._id} className="bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden flex flex-col opacity-80 hover:opacity-100 transition-opacity">
                  <div className="relative h-48 bg-[#0a0a12]">
                    <img src={convertGoogleDriveUrl(mc.image)} alt={mc.title} className="w-full h-full object-cover grayscale opacity-60" onError={(e) => e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"} />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-zinc-800 text-zinc-400 border border-zinc-700">Completed</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-white mb-4">{mc.title}</h3>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-between text-sm text-zinc-400">
                        <span>Date</span>
                        <span className="font-medium text-zinc-300">{new Date(mc.end).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-zinc-400">
                        <span>Participants</span>
                        <span className="font-medium text-zinc-300">{mc.applications?.length || 150}+</span>
                      </div>
                    </div>
                    {mc.pdfstatus && (
                      <button onClick={() => handleDownload(mc)} className="mt-auto w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-colors flex justify-center items-center gap-2">
                        <Download size={16}/> Get Certificate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Got Questions?</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
                <button onClick={() => toggleFAQ(idx)} className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white/[0.02] transition-colors">
                  <span className="font-bold text-white text-lg">{faq.question}</span>
                  {openIndex === idx ? <Minus className="text-blue-400 shrink-0" /> : <Plus className="text-zinc-500 shrink-0" />}
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-5 text-zinc-400 leading-relaxed">
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Forms Overlay */}
      <AnimatePresence>
        {(isRegisterForm || isDownloadForm) && selectedMasterClass && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-md bg-[#0a0a12] border border-white/10 rounded-[32px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h3 className="text-xl font-bold text-white">
                  {isRegisterForm ? "Register Now" : "Download Certificate"}
                </h3>
                <button onClick={closeForm} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
                  <X size={18}/>
                </button>
              </div>
              
              <div className="p-8">
                <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium">
                  {selectedMasterClass.title}
                </div>

                <form onSubmit={isRegisterForm ? handleSubmit : downloadCertificate} className="space-y-4">
                  {isRegisterForm && (
                    <>
                      <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                      <select required name="experience" value={formData.experience} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none">
                        <option value="" disabled className="bg-[#0a0a12]">Work experience (Years)</option>
                        <option value="0-2" className="bg-[#0a0a12]">0-2</option>
                        <option value="2-4" className="bg-[#0a0a12]">2-4</option>
                        <option value="4-6" className="bg-[#0a0a12]">4-6</option>
                        <option value="6-8" className="bg-[#0a0a12]">6+</option>
                      </select>
                      <input required type="text" name="field" value={formData.field} onChange={handleChange} placeholder="Current Field / Industry" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                      <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="WhatsApp Number" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                    </>
                  )}

                  {isDownloadForm && (
                    <input required type="email" name="email" placeholder="Registered Email Address" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                  )}

                  <button type="submit" disabled={isSubmitting} className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold shadow-lg disabled:opacity-70 transition-all">
                    {isSubmitting ? "Processing..." : (isRegisterForm ? "Submit Application" : "Download Certificate")}
                  </button>

                  <p className="text-center text-xs text-zinc-500 mt-4">
                    {isRegisterForm ? "Please enter your details carefully, they will appear on your certificate." : "Please enter the same email used during registration."}
                  </p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MasterClass;
