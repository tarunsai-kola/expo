import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  CheckCircle2, ArrowRight, User, Phone, Mail, MapPin, Briefcase, Target, 
  BrainCircuit, TrendingUp, Sparkles, Send, ShieldCheck
} from 'lucide-react';
import API from '../API';

const FreeCareerAssessment = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    city: '',
    ageGroup: '',
    currentStatus: '',
    fieldOfStudy: '',
    currentJobRole: '',
    yearsOfExperience: '',
    primaryCareerGoal: '',
    goalTimeline: '',
    biggestChallenge: '',
    communicationSkills: '',
    problemSolvingSkills: '',
    techComfort: '',
    weeklyLearningHours: '',
    primaryMotivator: '',
    confidenceScore: '',
    clearRoadmap: '',
    rightSkills: '',
    wantConsultation: '',
    helpArea: '',
    topCareerChallenge12Months: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const res = await axios.post(`${API}/careerassessment`, formData);
      if (res.status === 201) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit assessment. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    "Career Readiness Score",
    "Professional Strength Assessment",
    "Skills Gap Analysis",
    "Personalized Career Roadmap",
    "Recommended Career Paths",
    "Industry Skill Recommendations",
    "Learning & Growth Plan",
    "Free Career Consultation"
  ];

  return (
    <div 
      className="text-zinc-300 font-['Inter'] min-h-screen selection:bg-indigo-500/30"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(5,5,5,0.85), rgba(5,5,5,0.95)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <Helmet>
        <title>Free Career Growth Assessment | Atorax</title>
        <meta name="description" content="Discover Your Career Potential, Strengths, Skill Gaps & Personalized Growth Roadmap." />
      </Helmet>

      <style>{`
        .glass-panel {
          background: rgba(24, 24, 27, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .form-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 14px 16px;
          color: white;
          font-size: 15px;
          transition: all 0.2s;
        }
        .form-input:focus {
          outline: none;
          border-color: rgba(99, 102, 241, 0.5);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }
        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
        }
        .form-select option {
          background: #18181b;
          color: white;
        }
        .form-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #a1a1aa;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}</style>

      {/* HEADER SECTION */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80vw] max-w-[800px] aspect-square bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen z-0"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-indigo-300 mb-6 backdrop-blur-md">
                <Sparkles size={14}/> 100% Free Analysis
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
                Free Career Growth <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400">Assessment</span>
              </h1>
              
              <p className="text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl font-light">
                Discover your career potential, strengths, skill gaps, and get a personalized growth roadmap. Whether you're a student, job seeker, or working professional, get clarity in just 5 minutes.
              </p>

              <div className="glass-panel rounded-2xl p-6 md:p-8 border-l-4 border-l-indigo-500">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-indigo-400" /> What You'll Receive
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="glass-panel rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5"></div>
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-6 border border-indigo-500/20">
                    <Target size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Why Take This Assessment?</h3>
                  <p className="text-zinc-400 leading-relaxed mb-6 font-light">
                    Most people have unanswered questions: <em>Am I on the right career path? What skills should I learn? How do I increase my salary?</em> 
                    <br/><br/>
                    This assessment is the first step toward getting concrete answers.
                  </p>
                  <button onClick={() => document.getElementById('assessment-form').scrollIntoView({ behavior: 'smooth' })} className="w-full py-4 rounded-xl font-bold text-white shadow-xl flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 transition-all active:scale-[0.98]">
                    Start Assessment <ArrowRight size={18}/>
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section id="assessment-form" className="py-20 relative z-10">
        {isSuccess ? (
          <div className="max-w-[800px] mx-auto px-6 text-center py-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="glass-panel rounded-[32px] p-12 relative overflow-hidden shadow-2xl border-emerald-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/5"></div>
              <div className="relative z-10">
                <div className="w-24 h-24 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-8 border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-4xl font-bold text-white mb-6">Assessment Completed Successfully!</h2>
                <p className="text-xl text-zinc-300 mb-8 max-w-lg mx-auto font-light leading-relaxed">
                  Thank you for taking the Free Career Growth Assessment. Our career experts are analyzing your responses and will generate your personalized growth roadmap shortly.
                </p>
                <div className="bg-black/30 p-6 rounded-2xl mb-10 border border-white/5 max-w-md mx-auto">
                  <p className="text-zinc-400 text-sm">
                    We will send your <strong>Career Readiness Score</strong> and <strong>Custom Roadmap</strong> directly to your email within the next 24 hours.
                  </p>
                </div>
                <button 
                  onClick={() => navigate('/')} 
                  className="px-8 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 transition-all mx-auto border border-white/20"
                >
                  <ArrowRight size={18} className="rotate-180" /> Return to Homepage
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
        <div className="max-w-[800px] mx-auto px-6">
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* Section 1: Basic Information */}
            <div className="glass-panel rounded-[24px] p-8 border-white/10">
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 text-white flex items-center justify-center font-bold">1</div>
                <h3 className="text-2xl font-bold text-white">Basic Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="form-input" placeholder="John Doe" />
                </div>
                <div>
                  <label className="form-label">Mobile Number *</label>
                  <input required type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} className="form-input" placeholder="+91 9876543210" />
                </div>
                <div>
                  <label className="form-label">Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="form-label">City *</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="form-input" placeholder="e.g. Bangalore" />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">Age Group *</label>
                  <select required name="ageGroup" value={formData.ageGroup} onChange={handleInputChange} className="form-input form-select">
                    <option value="" disabled>Select Age Group</option>
                    <option value="22–25">22–25</option>
                    <option value="26–30">26–30</option>
                    <option value="31–35">31–35</option>
                    <option value="35+">35+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Professional Profile */}
            <div className="glass-panel rounded-[24px] p-8 border-white/10">
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 text-white flex items-center justify-center font-bold">2</div>
                <h3 className="text-2xl font-bold text-white">Professional Profile</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="form-label">Which best describes you? *</label>
                  <select required name="currentStatus" value={formData.currentStatus} onChange={handleInputChange} className="form-input form-select">
                    <option value="" disabled>Select Option</option>
                    <option value="Final Year Student">Final Year Student</option>
                    <option value="Graduate Seeking Job">Graduate Seeking Job</option>
                    <option value="Working Professional">Working Professional</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Entrepreneur">Entrepreneur</option>
                    <option value="Career Break">Career Break</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Field of Study</label>
                  <select name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleInputChange} className="form-input form-select">
                    <option value="">Select Field</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Management">Management</option>
                    <option value="Arts">Arts</option>
                    <option value="Science">Science</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Current Job Role (if applicable)</label>
                  <input type="text" name="currentJobRole" value={formData.currentJobRole} onChange={handleInputChange} className="form-input" placeholder="e.g. Data Analyst" />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">Years of Experience *</label>
                  <select required name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleInputChange} className="form-input form-select">
                    <option value="" disabled>Select Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0–2 Years">0–2 Years</option>
                    <option value="2–5 Years">2–5 Years</option>
                    <option value="5–10 Years">5–10 Years</option>
                    <option value="10+ Years">10+ Years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Goals & Challenges */}
            <div className="glass-panel rounded-[24px] p-8 border-white/10">
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 text-white flex items-center justify-center font-bold">3</div>
                <h3 className="text-2xl font-bold text-white">Goals & Challenges</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="form-label">What is your primary career goal? *</label>
                  <select required name="primaryCareerGoal" value={formData.primaryCareerGoal} onChange={handleInputChange} className="form-input form-select">
                    <option value="" disabled>Select Goal</option>
                    <option value="Get My First Job">Get My First Job</option>
                    <option value="Switch Career">Switch Career</option>
                    <option value="Get Promotion">Get Promotion</option>
                    <option value="Increase Salary">Increase Salary</option>
                    <option value="Learn New Skills">Learn New Skills</option>
                    <option value="Become Industry Ready">Become Industry Ready</option>
                    <option value="Explore Career Options">Explore Career Options</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">When do you want to achieve this goal? *</label>
                  <select required name="goalTimeline" value={formData.goalTimeline} onChange={handleInputChange} className="form-input form-select">
                    <option value="" disabled>Select Timeline</option>
                    <option value="Within 3 Months">Within 3 Months</option>
                    <option value="Within 6 Months">Within 6 Months</option>
                    <option value="Within 12 Months">Within 12 Months</option>
                    <option value="Within 24 Months">Within 24 Months</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">What is your biggest career challenge today? *</label>
                  <select required name="biggestChallenge" value={formData.biggestChallenge} onChange={handleInputChange} className="form-input form-select">
                    <option value="" disabled>Select Challenge</option>
                    <option value="Lack of Skills">Lack of Skills</option>
                    <option value="Lack of Direction">Lack of Direction</option>
                    <option value="Not Getting Interviews">Not Getting Interviews</option>
                    <option value="Low Salary">Low Salary</option>
                    <option value="Career Growth Stagnation">Career Growth Stagnation</option>
                    <option value="Lack of Confidence">Lack of Confidence</option>
                    <option value="Lack of Industry Exposure">Lack of Industry Exposure</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Skills Assessment */}
            <div className="glass-panel rounded-[24px] p-8 border-white/10">
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 text-white flex items-center justify-center font-bold">4</div>
                <h3 className="text-2xl font-bold text-white">Skills Assessment</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Communication Skills (1-10) *</label>
                  <input required type="number" min="1" max="10" name="communicationSkills" value={formData.communicationSkills} onChange={handleInputChange} className="form-input" placeholder="Scale 1-10" />
                </div>
                <div>
                  <label className="form-label">Problem-Solving Skills (1-10) *</label>
                  <input required type="number" min="1" max="10" name="problemSolvingSkills" value={formData.problemSolvingSkills} onChange={handleInputChange} className="form-input" placeholder="Scale 1-10" />
                </div>
                <div className="md:col-span-2">
                  <label className="form-label">How comfortable are you with technology? *</label>
                  <select required name="techComfort" value={formData.techComfort} onChange={handleInputChange} className="form-input form-select">
                    <option value="" disabled>Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Weekly Learning Dedication *</label>
                  <select required name="weeklyLearningHours" value={formData.weeklyLearningHours} onChange={handleInputChange} className="form-input form-select">
                    <option value="" disabled>Select Hours</option>
                    <option value="Less than 3 Hours">Less than 3 Hours</option>
                    <option value="3–5 Hours">3–5 Hours</option>
                    <option value="5–10 Hours">5–10 Hours</option>
                    <option value="10–15 Hours">10–15 Hours</option>
                    <option value="15+ Hours">15+ Hours</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">What motivates you most? *</label>
                  <select required name="primaryMotivator" value={formData.primaryMotivator} onChange={handleInputChange} className="form-input form-select">
                    <option value="" disabled>Select Motivator</option>
                    <option value="Better Salary">Better Salary</option>
                    <option value="Career Growth">Career Growth</option>
                    <option value="New Opportunities">New Opportunities</option>
                    <option value="Personal Development">Personal Development</option>
                    <option value="Industry Recognition">Industry Recognition</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 5: Career Confidence Score */}
            <div className="glass-panel rounded-[24px] p-8 border-white/10">
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 text-white flex items-center justify-center font-bold">5</div>
                <h3 className="text-2xl font-bold text-white">Career Confidence Score</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="form-label">How confident are you about achieving your career goals? (1-10) *</label>
                  <input required type="number" min="1" max="10" name="confidenceScore" value={formData.confidenceScore} onChange={handleInputChange} className="form-input" placeholder="Scale 1-10" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Do you have a clear career roadmap? *</label>
                    <select required name="clearRoadmap" value={formData.clearRoadmap} onChange={handleInputChange} className="form-input form-select">
                      <option value="" disabled>Select Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Not Sure">Not Sure</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Right skills for future opportunities? *</label>
                    <select required name="rightSkills" value={formData.rightSkills} onChange={handleInputChange} className="form-input form-select">
                      <option value="" disabled>Select Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Partially">Partially</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 6: Consultation Qualification */}
            <div className="glass-panel rounded-[24px] p-8 border-white/10 border-indigo-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-500/5 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-6">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">6</div>
                  <h3 className="text-2xl font-bold text-white">Consultation Qualification</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="form-label">Would you like a FREE Personalized Career Consultation? *</label>
                    <select required name="wantConsultation" value={formData.wantConsultation} onChange={handleInputChange} className="form-input form-select border-indigo-500/30">
                      <option value="" disabled>Select Option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">What would you like help with?</label>
                    <select name="helpArea" value={formData.helpArea} onChange={handleInputChange} className="form-input form-select">
                      <option value="">Select Area</option>
                      <option value="Career Planning">Career Planning</option>
                      <option value="Skill Development">Skill Development</option>
                      <option value="Resume Review">Resume Review</option>
                      <option value="Interview Preparation">Interview Preparation</option>
                      <option value="Career Transition">Career Transition</option>
                      <option value="Salary Growth Strategy">Salary Growth Strategy</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label text-indigo-300">Most Important Question: If you could solve ONE career challenge in the next 12 months, what would it be? *</label>
                    <textarea required name="topCareerChallenge12Months" value={formData.topCareerChallenge12Months} onChange={handleInputChange} rows="3" className="form-input resize-none border-indigo-500/30" placeholder="Type your answer here..."></textarea>
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-5 rounded-2xl font-bold text-white shadow-[0_0_30px_-10px_rgba(99,102,241,0.5)] flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-emerald-500 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100 text-lg"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> Processing...</span>
              ) : (
                <><Send size={20}/> Submit Assessment & Get Free Report</>
              )}
            </button>
            <p className="text-center text-zinc-500 text-xs mt-4">By submitting, you agree to our Terms of Service and Privacy Policy.</p>
          </form>
        </div>
        )}
      </section>
    </div>
  );
};

export default FreeCareerAssessment;
