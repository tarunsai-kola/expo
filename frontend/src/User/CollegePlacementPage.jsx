import React, { useState, useEffect } from "react";
import axios from "axios";
import { Briefcase, Building, Link as LinkIcon, Calendar } from "lucide-react";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const CollegePlacementPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await axios.get(`${API}/api/tpo/student-jobs/${userId}`);
            setJobs(res.data || []);
        } catch (error) {
            console.error("Error fetching jobs", error);
            toast.error("Failed to fetch placement jobs.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 md:p-8 animate-[fadeIn_0.3s_ease-out]">
            <Toaster position="top-center" />
            
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                    <Briefcase size={28} className="text-indigo-600" />
                    College Placements
                </h1>
                <p className="text-slate-500 font-medium mt-2">Exclusive placement drives organized by your college TPO.</p>
            </div>

            {loading ? (
                <div className="py-20 flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-indigo-600"></div>
                </div>
            ) : jobs.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                    <Briefcase size={48} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-xl font-bold text-slate-700 mb-2">No Active Placement Drives</h3>
                    <p className="text-slate-500">Your college has not posted any active placement drives for your branch at this moment. Check back later!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {jobs.map(job => (
                        <div key={job._id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-slate-200 p-6 transition-all duration-300 flex flex-col group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{job.jobTitle}</h2>
                                    <div className="flex items-center gap-2 text-slate-500 font-medium mt-1">
                                        <Building size={16} /> {job.companyName}
                                    </div>
                                </div>
                                <div className="bg-indigo-50 text-indigo-700 font-bold text-xs px-3 py-1.5 rounded-lg border border-indigo-100 flex items-center gap-1.5 whitespace-nowrap">
                                    <Calendar size={14} /> {new Date(job.interviewDate).toLocaleDateString()}
                                </div>
                            </div>
                            
                            <p className="text-slate-600 text-sm mb-6 flex-1 line-clamp-4 leading-relaxed">
                                {job.description}
                            </p>

                            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex gap-2">
                                    {job.targetBranches.map((branch, idx) => (
                                        <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded">
                                            {branch}
                                        </span>
                                    ))}
                                </div>
                                
                                <a 
                                    href={job.applyLink} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
                                >
                                    Apply Now <LinkIcon size={14} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CollegePlacementPage;
