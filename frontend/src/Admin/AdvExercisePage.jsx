import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import { FaDatabase, FaCode, FaCheck, FaExclamationTriangle } from "react-icons/fa";

const AdvExercisePage = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [replaceExisting, setReplaceExisting] = useState(false);
    const [jsonInput, setJsonInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Fetch both advanced and regular courses
                const [advRes, regRes] = await Promise.all([
                    axios.get(`${API}/getadvcourses`),
                    axios.get(`${API}/getcourses`)
                ]);

                // Combine and Deduplicate (just in case)
                const combined = [...advRes.data, ...regRes.data];
                const uniqueCourses = combined.filter((course, index, self) =>
                    index === self.findIndex((c) => c._id === course._id)
                ).sort((a, b) => a.title.localeCompare(b.title));

                setCourses(uniqueCourses);
            } catch (err) {
                console.error("Error fetching courses", err);
                toast.error("Failed to load courses");
            }
        };
        fetchCourses();
    }, []);

    // Fetch stats when a course is selected
    useEffect(() => {
        if (!selectedCourse) {
            setStats(null);
            return;
        }
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${API}/exercise/stats`, { params: { course: selectedCourse } });
                setStats(res.data);
            } catch (err) {
                console.error("Error fetching stats", err);
            }
        };
        fetchStats();
    }, [selectedCourse]);

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedCourse) {
            return toast.error("Please select a Course");
        }

        if (!jsonInput.trim()) {
            return toast.error("Please paste the JSON question data");
        }

        let parsedQuestions;
        try {
            parsedQuestions = JSON.parse(jsonInput);
            if (!Array.isArray(parsedQuestions)) {
                throw new Error("JSON must be an array of objects []");
            }
        } catch (err) {
            return toast.error("Invalid JSON format: " + err.message);
        }

        setLoading(true);
        try {
            const payload = {
                course: selectedCourse,
                replaceExisting,
                questions: parsedQuestions
            };

            const res = await axios.post(`${API}/exercise/upload`, payload);
            toast.success(res.data.message || "Upload successful!");
            setJsonInput(""); // clear after success

            // Refresh stats
            const statsRes = await axios.get(`${API}/exercise/stats`, { params: { course: selectedCourse } });
            setStats(statsRes.data);

        } catch (err) {
            console.error("Upload error:", err.response?.data || err);
            toast.error(err.response?.data?.error || "Failed to upload questions");
        } finally {
            setLoading(false);
        }
    };

    const copyTemplate = () => {
        const template = [
            {
                "difficulty": "Beginner",
                "question": "What is Node.js?",
                "options": ["A web browser", "A runtime environment", "A database", "A framework"],
                "correctAnswer": "A runtime environment",
                "explanation": "Node.js allows running JS on the server.",
                "topic": "Basics"
            }
        ];
        setJsonInput(JSON.stringify(template, null, 2));
        toast.success("Template copied to input!");
    };

    return (
        <div id="AdminAddCourse" className="min-h-screen">
            <Toaster position="top-center" toastOptions={{
                style: { background: '#1e1e2d', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
            }} />
            
            <div className="max-w-4xl mx-auto bg-[#0F0F14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl mt-10">
                <form onSubmit={handleUpload}>
                    <div className="mb-8 border-b border-white/10 pb-6 text-center">
                        <div className="inline-flex items-center justify-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-4 text-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.1)]">
                            <FaCode size={28} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight m-0">Exercise Management</h2>
                        <p className="text-gray-400 text-sm mt-2">Upload and manage question banks dynamically for all courses.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Course Selection */}
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Target Course</label>
                            <select
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                                required
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm appearance-none"
                            >
                                <option value="" className="bg-[#11111a] text-gray-400">-- Select Course --</option>
                                {courses.map(c => (
                                    <option key={c._id} value={c.title} className="bg-[#11111a]">{c.title}</option>
                                ))}
                            </select>
                        </div>

                        {/* Live Database Stats */}
                        {stats && (
                            <div className="bg-blue-900/10 border border-blue-500/20 p-5 rounded-xl animate-in fade-in duration-300">
                                <h4 className="flex items-center gap-2 m-0 mb-4 text-sm font-bold text-blue-400">
                                    <FaDatabase /> Current Active Questions in Database
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-lg flex flex-col items-center">
                                        <span className="font-semibold mb-1">Beginner</span>
                                        <span className="text-xl font-black">{stats.Beginner}</span>
                                    </div>
                                    <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 p-3 rounded-lg flex flex-col items-center">
                                        <span className="font-semibold mb-1">Intermediate</span>
                                        <span className="text-xl font-black">{stats.Intermediate}</span>
                                    </div>
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg flex flex-col items-center">
                                        <span className="font-semibold mb-1">Advanced</span>
                                        <span className="text-xl font-black">{stats.Advanced}</span>
                                    </div>
                                    <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 p-3 rounded-lg flex flex-col items-center">
                                        <span className="font-semibold mb-1">Total Pool</span>
                                        <span className="text-xl font-black">{stats.Total}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Replace Existing Toggle */}
                        <label className="flex items-start gap-4 cursor-pointer bg-red-500/5 border border-red-500/20 p-5 rounded-xl hover:bg-red-500/10 transition-colors">
                            <div className="relative flex items-center pt-1">
                                <input
                                    type="checkbox"
                                    checked={replaceExisting}
                                    onChange={(e) => setReplaceExisting(e.target.checked)}
                                    className="w-5 h-5 accent-red-500 cursor-pointer"
                                />
                            </div>
                            <div>
                                <strong className="text-red-400 block mb-1 flex items-center gap-2">
                                    <FaExclamationTriangle /> Replace Existing Questions (Soft Delete)
                                </strong>
                                <span className="text-xs text-gray-400 leading-relaxed block">
                                    If checked, all current questions for this course are removed from the active test pool before inserting new ones. Pending student tests will not crash.
                                </span>
                            </div>
                        </label>

                        {/* JSON Input */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Questions Payload (JSON Array)</label>
                                <button type="button" onClick={copyTemplate} className="text-blue-400 hover:text-blue-300 text-xs font-semibold hover:underline bg-blue-500/10 px-3 py-1.5 rounded-lg transition-colors">
                                    Load Example Template
                                </button>
                            </div>

                            <textarea
                                value={jsonInput}
                                onChange={(e) => setJsonInput(e.target.value)}
                                placeholder='[\n  {\n    "difficulty": "Beginner",\n    "question": "...",\n    "options": ["A","B","C","D"],\n    "correctAnswer": "A"\n  }\n]'
                                className="w-full h-[400px] font-mono text-[13px] p-5 bg-black/50 text-[#93c5fd] rounded-xl mt-2 border border-white/10 resize-y focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all leading-relaxed"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-base tracking-wide transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Uploading to Database...
                            </>
                        ) : (
                            <>
                                <FaCheck /> Upload Questions
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdvExercisePage;
