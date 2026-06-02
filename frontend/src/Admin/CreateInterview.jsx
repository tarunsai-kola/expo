import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import API from "../API";

const CreateInterview = () => {
    const [interviewers, setInterviewers] = useState([]);
    const [formData, setFormData] = useState({
        interviewName: "",
        interviewerId: "",
        date: "",
        startTime: "",
        endTime: "",
        mode: "Online"
    });

    const [interviews, setInterviews] = useState([]);

    useEffect(() => {
        fetchInterviewers();
        fetchInterviews();
    }, []);

    const fetchInterviews = async () => {
        try {
            const res = await axios.get(`${API}/api/interview/all`);
            setInterviews(res.data);
        } catch (error) {
            console.error("Failed to fetch interviews", error);
        }
    };

    const fetchInterviewers = async () => {
        try {
            const res = await axios.get(`${API}/api/interviewer/all`);
            setInterviewers(res.data);
        } catch (error) {
            console.error("Failed to fetch interviewers", error);
            toast.error("Could not load interviewers");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/api/interview/create-interview`, formData);
            if (res.status === 201) {
                toast.success("Interview Schedule Created!", {
                    style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
                });
                setFormData({
                    interviewName: "",
                    interviewerId: "",
                    date: "",
                    startTime: "",
                    endTime: "",
                    mode: "Online"
                });
                fetchInterviews(); // Refresh list
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Creation failed", {
                style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
            });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this interview schedule?")) return;
        try {
            await axios.delete(`${API}/api/interview/delete-interview/${id}`);
            toast.success("Interview deleted successfully", {
                style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
            });
            fetchInterviews();
        } catch (error) {
            toast.error("Failed to delete interview", {
                style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' }
            });
        }
    };

    return (
        <div className="admin-content-wrap min-h-screen bg-slate-50 text-slate-700 font-sans p-6 md:p-10 md:ml-64">
            <div className="w-full max-w-7xl mx-auto bg-slate-50 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-8 border-b border-slate-200 pb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-600 flex items-center justify-center text-xl">
                        <i className="fa fa-calendar-check-o"></i>
                    </div>
                    Create Mock Interview Schedule
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-slate-600 text-sm font-bold uppercase tracking-wider mb-2">Interview Name</label>
                            <input
                                type="text"
                                name="interviewName"
                                placeholder="e.g., Mock Interview A"
                                value={formData.interviewName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-slate-600 text-sm font-bold uppercase tracking-wider mb-2">Assign Interviewer</label>
                            <select
                                name="interviewerId"
                                value={formData.interviewerId}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                                required
                            >
                                <option value="" className="bg-white text-slate-600">Select Interviewer</option>
                                {interviewers.map((int) => (
                                    <option key={int._id} value={int._id} className="bg-white text-slate-900">{int.fullname}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-slate-600 text-sm font-bold uppercase tracking-wider mb-2">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-slate-600 text-sm font-bold uppercase tracking-wider mb-2">Start Time (Hourly)</label>
                            <select
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                                required
                            >
                                <option value="" className="bg-white text-slate-600">Select Start Time</option>
                                {Array.from({ length: 24 }).map((_, i) => {
                                    const hour = i.toString().padStart(2, '0') + ":00";
                                    return <option key={hour} value={hour} className="bg-white text-slate-900">{hour}</option>;
                                })}
                            </select>
                        </div>

                        <div>
                            <label className="block text-slate-600 text-sm font-bold uppercase tracking-wider mb-2">End Time (Hourly)</label>
                            <select
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                                required
                            >
                                <option value="" className="bg-white text-slate-600">Select End Time</option>
                                {Array.from({ length: 24 }).map((_, i) => {
                                    const hour = i.toString().padStart(2, '0') + ":00";
                                    return <option key={hour} value={hour} className="bg-white text-slate-900">{hour}</option>;
                                })}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-slate-600 text-sm font-bold uppercase tracking-wider mb-2">Mode</label>
                        <select
                            name="mode"
                            value={formData.mode}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                        >
                            <option value="Online" className="bg-white text-slate-900">Online</option>
                            <option value="Offline" className="bg-white text-slate-900">Offline</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full md:w-auto bg-indigo-600 text-slate-900 font-bold py-3 px-10 rounded-xl hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all duration-300"
                    >
                        Create Interview Schedule
                    </button>
                </form>

                {/* Schedule List Table */}
                <div className="mt-12">
                    <div className="flex justify-between items-center mb-6 border-t border-slate-200 pt-8">
                        <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            Scheduled Interviews
                        </h3>
                        <button onClick={fetchInterviews} className="text-sm font-bold text-indigo-600 hover:text-indigo-300 transition-colors flex items-center gap-2 bg-indigo-500/10 px-4 py-2 rounded-lg border border-indigo-500/20">
                            <i className="fa fa-refresh"></i> Refresh List
                        </button>
                    </div>
                    
                    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-slate-50">
                        <table className="min-w-full text-left whitespace-nowrap">
                            <thead className="bg-white border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-widest">Name</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-widest">Interviewer</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-widest">Date</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-widest">Time</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-widest">Mode</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 text-sm">
                                {interviews.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-10 text-slate-500 italic">No interviews scheduled yet.</td>
                                    </tr>
                                ) : (
                                    interviews.map((item) => (
                                        <tr key={item._id} className="hover:bg-slate-50 transition-colors group">
                                            <td className="px-6 py-4 font-bold text-slate-900">{item.interviewName}</td>
                                            <td className="px-6 py-4 text-slate-700">{item.interviewer?.fullname || "Unknown"}</td>
                                            <td className="px-6 py-4 text-slate-600">{new Date(item.date).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-slate-600 font-mono text-xs">{item.startTime} - {item.endTime}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-slate-100 border border-slate-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-700">
                                                    {item.mode}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${item.isActive ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 border-rose-500/20'}`}>
                                                    {item.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 text-slate-600 hover:bg-rose-500/20 hover:text-rose-600 transition-colors ml-auto"
                                                    title="Delete Interview"
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateInterview;
