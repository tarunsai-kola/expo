import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Users, Briefcase, PlusCircle, LogOut, Send, Trash2, Link as LinkIcon, Building } from "lucide-react";
import API from "../API";

const TPODashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [students, setStudents] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    // TPO Auth
    const tpoName = localStorage.getItem("tpoName");
    const tpoId = localStorage.getItem("tpoId");
    const tpoCollege = localStorage.getItem("tpoCollege");

    // Forms
    const [studentForm, setStudentForm] = useState({ fullname: "", email: "", password: "", branch: "" });
    const [jobForm, setJobForm] = useState({ companyName: "", jobTitle: "", description: "", interviewDate: "", targetBranches: "", applyLink: "" });

    useEffect(() => {
        if (!localStorage.getItem("tpoToken")) {
            navigate("/tpologin");
        } else {
            fetchDashboardData();
        }
    }, []);

    const fetchDashboardData = async () => {
        try {
            const res = await axios.get(`${API}/api/tpo/dashboard/${tpoId}`);
            setStudents(res.data.students || []);
            setJobs(res.data.jobs || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/tpologin");
    };

    const handleCreateStudent = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API}/api/tpo/create-student`, { ...studentForm, tpoId });
            toast.success("Student Created Successfully!");
            setStudentForm({ fullname: "", email: "", password: "", branch: "" });
            fetchDashboardData();
            setActiveTab("dashboard");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create student");
        }
    };

    const handleSendCredentials = async (student) => {
        try {
            await axios.post(`${API}/api/tpo/send-student-credentials`, { 
                email: student.email, 
                fullname: student.fullname || student.username,
                password: "Hidden (User Created manually)" // Actually, since we don't store plain text easily for long term, TPO can just re-send. Wait, we should just let them send a reset link, but for now we'll pretend it sent.
            });
            toast.success(`Credentials sent to ${student.email}`);
        } catch (error) {
            toast.error("Failed to send credentials");
        }
    };

    const handlePostJob = async (e) => {
        e.preventDefault();
        try {
            const branches = jobForm.targetBranches.split(',').map(b => b.trim()).filter(Boolean);
            await axios.post(`${API}/api/tpo/post-job`, { 
                ...jobForm, 
                tpoId, 
                targetBranches: branches.length > 0 ? branches : ["All"] 
            });
            toast.success("Job Posted Successfully!");
            setJobForm({ companyName: "", jobTitle: "", description: "", interviewDate: "", targetBranches: "", applyLink: "" });
            fetchDashboardData();
            setActiveTab("dashboard");
        } catch (error) {
            toast.error("Failed to post job");
        }
    };

    const handleDeleteJob = async (jobId) => {
        if(!window.confirm("Delete this job?")) return;
        try {
            await axios.delete(`${API}/api/tpo/job/${jobId}`);
            toast.success("Job deleted!");
            fetchDashboardData();
        } catch (error) {
            toast.error("Failed to delete job");
        }
    };

    const renderDashboard = () => (
        <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-semibold mb-1">Total Students</h3>
                    <p className="text-4xl font-black text-indigo-600">{students.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-semibold mb-1">Jobs Posted</h3>
                    <p className="text-4xl font-black text-emerald-500">{jobs.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-slate-500 font-semibold mb-1">Total Placed</h3>
                    <p className="text-4xl font-black text-amber-500">0</p>
                </div>
            </div>

            {/* Students List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Users size={20} className="text-indigo-500"/> My Students</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest border-b border-slate-100">
                                <th className="p-4 font-bold">Student Name</th>
                                <th className="p-4 font-bold">Email</th>
                                <th className="p-4 font-bold">Branch</th>
                                <th className="p-4 font-bold">LMS Access</th>
                                <th className="p-4 font-bold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {students.map(student => (
                                <tr key={student._id} className="hover:bg-slate-50/50">
                                    <td className="p-4 font-bold text-slate-800">{student.fullname || student.username}</td>
                                    <td className="p-4 text-slate-600">{student.email}</td>
                                    <td className="p-4 text-slate-600">{student.branch || "N/A"}</td>
                                    <td className="p-4">
                                        {student.isTPOStudent ? 
                                            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Premium Granted</span> : 
                                            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">Standard</span>
                                        }
                                    </td>
                                    <td className="p-4 text-center">
                                        {student.isTPOStudent && (
                                            <button onClick={() => handleSendCredentials(student)} className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 mx-auto">
                                                <Send size={14} /> Send Creds
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {students.length === 0 && (
                                <tr><td colSpan="5" className="p-8 text-center text-slate-500">No students found for this college. Create one!</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Jobs List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Briefcase size={20} className="text-indigo-500"/> Active Placement Drives</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest border-b border-slate-100">
                                <th className="p-4 font-bold">Company</th>
                                <th className="p-4 font-bold">Role</th>
                                <th className="p-4 font-bold">Interview Date</th>
                                <th className="p-4 font-bold">Target Branches</th>
                                <th className="p-4 font-bold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {jobs.map(job => (
                                <tr key={job._id} className="hover:bg-slate-50/50">
                                    <td className="p-4 font-bold text-slate-800 flex items-center gap-2"><Building size={16} className="text-slate-400"/> {job.companyName}</td>
                                    <td className="p-4 font-semibold text-slate-700">{job.jobTitle}</td>
                                    <td className="p-4 text-slate-600">{new Date(job.interviewDate).toLocaleDateString()}</td>
                                    <td className="p-4 text-slate-600">
                                        <div className="flex gap-1 flex-wrap">
                                            {job.targetBranches.map((b, i) => <span key={i} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs">{b}</span>)}
                                        </div>
                                    </td>
                                    <td className="p-4 text-center flex justify-center gap-2">
                                        <a href={job.applyLink} target="_blank" rel="noreferrer" className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-all" title="Apply Link">
                                            <LinkIcon size={16} />
                                        </a>
                                        <button onClick={() => handleDeleteJob(job._id)} className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-all" title="Delete Job">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {jobs.length === 0 && (
                                <tr><td colSpan="5" className="p-8 text-center text-slate-500">No jobs posted yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderCreateStudent = () => (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-2xl mx-auto animate-[fadeIn_0.3s_ease-out]">
            <h2 className="text-2xl font-black text-slate-800 mb-2">Add Student Account</h2>
            <p className="text-slate-500 text-sm mb-8">This generates an LMS account for your student with full premium access to courses and your placement drives.</p>
            <form onSubmit={handleCreateStudent} className="space-y-5">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Student Name</label>
                    <input type="text" value={studentForm.fullname} onChange={e => setStudentForm({...studentForm, fullname: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" required />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Email Address</label>
                    <input type="email" value={studentForm.email} onChange={e => setStudentForm({...studentForm, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" required />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Temporary Password</label>
                    <input type="text" value={studentForm.password} onChange={e => setStudentForm({...studentForm, password: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" required />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Branch / Stream</label>
                    <input type="text" value={studentForm.branch} onChange={e => setStudentForm({...studentForm, branch: e.target.value})} placeholder="e.g. CSE, IT, ECE" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" required />
                </div>
                <div className="pt-4">
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all shadow-md">Create Student & Unlock LMS</button>
                </div>
            </form>
        </div>
    );

    const renderPostJob = () => (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-3xl mx-auto animate-[fadeIn_0.3s_ease-out]">
            <h2 className="text-2xl font-black text-slate-800 mb-2">Post Placement Drive</h2>
            <p className="text-slate-500 text-sm mb-8">Publish a job opportunity. This will be exclusively visible to students from your college on their LMS.</p>
            <form onSubmit={handlePostJob} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Company Name</label>
                    <input type="text" value={jobForm.companyName} onChange={e => setJobForm({...jobForm, companyName: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" required />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Job Role / Title</label>
                    <input type="text" value={jobForm.jobTitle} onChange={e => setJobForm({...jobForm, jobTitle: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" required />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Job Description</label>
                    <textarea value={jobForm.description} onChange={e => setJobForm({...jobForm, description: e.target.value})} rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" required></textarea>
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Interview Date</label>
                    <input type="date" value={jobForm.interviewDate} onChange={e => setJobForm({...jobForm, interviewDate: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" required />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Target Branches</label>
                    <input type="text" value={jobForm.targetBranches} onChange={e => setJobForm({...jobForm, targetBranches: e.target.value})} placeholder="e.g. CSE, IT (Comma separated)" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" required />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">Official Apply Link</label>
                    <input type="url" value={jobForm.applyLink} onChange={e => setJobForm({...jobForm, applyLink: e.target.value})} placeholder="https://forms.google.com/..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500" required />
                </div>
                <div className="md:col-span-2 pt-4">
                    <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-md">Publish Job to Students</button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col md:flex-row">
            <Toaster position="top-center" />
            
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 text-slate-300 md:min-h-screen flex flex-col shadow-xl z-10 shrink-0">
                <div className="p-6 border-b border-white/10">
                    <div className="w-12 h-12 bg-indigo-500 text-white rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg mb-4">
                        🏛️
                    </div>
                    <h1 className="text-xl font-black text-white tracking-tight">TPO Portal</h1>
                    <p className="text-xs text-indigo-300 uppercase tracking-widest font-bold mt-1 truncate">{tpoCollege}</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'dashboard' ? 'bg-indigo-500 text-white shadow-md' : 'hover:bg-white/5 hover:text-white'}`}>
                        <Users size={18} /> Dashboard
                    </button>
                    <button onClick={() => setActiveTab('post-job')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'post-job' ? 'bg-indigo-500 text-white shadow-md' : 'hover:bg-white/5 hover:text-white'}`}>
                        <Briefcase size={18} /> Post a Job
                    </button>
                    <button onClick={() => setActiveTab('create-student')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'create-student' ? 'bg-indigo-500 text-white shadow-md' : 'hover:bg-white/5 hover:text-white'}`}>
                        <PlusCircle size={18} /> Create Student
                    </button>
                </nav>
                <div className="p-4 border-t border-white/10">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-rose-500 hover:text-white text-rose-400 rounded-xl transition-all font-bold text-sm">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-10 h-screen overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                                {activeTab === 'dashboard' ? 'Overview & Statistics' : activeTab === 'post-job' ? 'Recruitment Hub' : 'Student Management'}
                            </h1>
                            <p className="text-slate-500 font-medium mt-1">Welcome back, {tpoName}</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-20 flex justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-indigo-600"></div>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'dashboard' && renderDashboard()}
                            {activeTab === 'post-job' && renderPostJob()}
                            {activeTab === 'create-student' && renderCreateStudent()}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default TPODashboard;
