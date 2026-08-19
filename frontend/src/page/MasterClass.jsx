import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";
import MasterclassModal from "./MasterclassModal";
import CampusHeader from "../Components/CampusHeader";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, ArrowRight, Sparkles, Code2, Users } from "lucide-react";

// Sample placeholder logos for the collaboration section
const IEEE_LOGO = "https://upload.wikimedia.org/wikipedia/commons/2/21/IEEE_logo.svg";

const Masterclass = () => {
    const [workshops, setWorkshops] = useState([]);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                const res = await axios.get(`${API}/api/workshop/list`);
                setWorkshops(res.data);
            } catch (error) {
                console.error("Failed to fetch workshops", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkshops();
    }, []);

    const handleRegisterClick = (workshop) => {
        setSelectedWorkshop(workshop.title);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-[#030712] min-h-screen font-['Instrument_Sans'] text-white selection:bg-[#ff6b2d]/30 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#1462EE]/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#ff6b2d]/10 blur-[120px]" />
                <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[60%] h-[30%] rounded-full bg-purple-500/10 blur-[150px]" />
            </div>

            <CampusHeader />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80 mb-8 backdrop-blur-md"
                >
                    <Sparkles size={16} className="text-[#ff6b2d]" />
                    <span>Exclusive Industry-Led Sessions</span>
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
                >
                    Aiiens Campus <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1462EE] via-purple-500 to-[#ff6b2d]">
                        Masterclass Workshops
                    </span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
                >
                    Accelerate your career with our intensive, hands-on workshops. Learn from industry experts and build real-world skills that employers demand.
                </motion.p>
            </section>

            {/* Collaboration Section */}
            <section className="relative py-10 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 text-center flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    <span className="text-sm font-semibold text-white/40 uppercase tracking-widest whitespace-nowrap">In Collaboration With</span>
                    
                    <div className="flex flex-wrap justify-center items-center gap-10">
                        <img src={IEEE_LOGO} alt="IEEE Logo" className="h-10 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                        <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                <Code2 size={20} className="text-white" />
                            </div>
                            <div className="text-left">
                                <span className="block font-bold text-sm text-white">R&D Cell</span>
                                <span className="block text-xs text-white/60">CRD College of Engineering</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workshops Section */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Available Masterclasses</h2>
                        <p className="text-white/60 max-w-xl">
                            Select from our curated list of high-impact technical workshops designed for rapid skill acquisition.
                        </p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="bg-white/5 rounded-3xl p-8 border border-white/5 animate-pulse">
                                <div className="h-8 bg-white/10 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                                <div className="h-4 bg-white/10 rounded w-5/6 mb-8"></div>
                                <div className="h-4 bg-white/10 rounded w-1/4 mb-4"></div>
                                <div className="space-y-3 mb-8">
                                    <div className="h-4 bg-white/10 rounded w-full"></div>
                                    <div className="h-4 bg-white/10 rounded w-full"></div>
                                    <div className="h-4 bg-white/10 rounded w-4/5"></div>
                                </div>
                                <div className="h-12 bg-white/10 rounded-xl w-full"></div>
                            </div>
                        ))
                    ) : workshops.length === 0 ? (
                        <div className="col-span-full py-20 text-center flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <Users size={32} className="text-white/40" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No active workshops</h3>
                            <p className="text-white/50">Check back later for upcoming masterclasses.</p>
                        </div>
                    ) : (
                        workshops.map((workshop, index) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                key={workshop._id} 
                                className="group relative bg-white/[0.03] hover:bg-white/[0.05] rounded-3xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_40px_-15px_rgba(20,98,238,0.3)] flex flex-col"
                            >
                                {/* Gradient Top Border */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1462EE] to-[#ff6b2d] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                
                                <div className="p-8 flex-1 flex flex-col relative z-10">
                                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">{workshop.title}</h3>
                                    <p className="text-white/60 mb-8 flex-1 leading-relaxed text-sm">{workshop.description}</p>
                                    
                                    <div className="mb-8">
                                        <h4 className="font-semibold text-xs uppercase tracking-wider text-white/40 mb-4">Curriculum</h4>
                                        <ul className="space-y-3">
                                            {workshop.curriculum.map((item, idx) => (
                                                <li key={idx} className="flex items-start text-sm text-white/70">
                                                    <CheckCircle2 size={18} className="text-[#1462EE] mr-3 shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <div className="flex items-center text-white/50 text-sm mb-8 font-medium">
                                        <Clock size={16} className="mr-2 text-[#ff6b2d]" />
                                        {workshop.duration}
                                    </div>
                                    
                                    <button
                                        onClick={() => handleRegisterClick(workshop)}
                                        className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-[#1462EE] text-white py-4 rounded-xl font-semibold transition-all duration-300 border border-white/10 hover:border-transparent group/btn overflow-hidden relative"
                                    >
                                        <span className="relative z-10">Register Now</span>
                                        <ArrowRight size={18} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                        {/* Hover glow effect behind button text */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#1462EE] to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity z-0"></div>
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </section>

            <Toaster position="top-center" reverseOrder={false} containerStyle={{ zIndex: 999999 }} />
            <MasterclassModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                workshopTitle={selectedWorkshop} 
            />
        </div>
    );
};

export default Masterclass;
