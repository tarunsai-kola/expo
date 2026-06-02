import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const AdvProjectPage = () => {
    const [projects, setProjects] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingProjectId, setEditingProjectId] = useState(null);

    // Form states
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState("Beginner");
    const [roadmap, setRoadmap] = useState({});
    const [jsonRoadmap, setJsonRoadmap] = useState("");
    const [showJsonInput, setShowJsonInput] = useState(false);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const coursesRes = await axios.get(`${API}/getadvcourses`);
            setCourses(coursesRes.data);

            // Fetch projects per advance course (avoids broken populate issue with CreateCourse ref)
            const projectArrays = await Promise.all(
                coursesRes.data.map(course =>
                    axios.get(`${API}/api/projects/course/${course._id}`)
                        .then(res => res.data.map(p => ({ ...p, _courseTitle: course.title, _courseId: course._id })))
                        .catch(() => [])
                )
            );
            setProjects(projectArrays.flat());
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const initializeRoadmap = () => {
        const newRoadmap = {};
        for (let i = 1; i <= 24; i++) {
            newRoadmap[i] = { phase: "", tasks: ["", "", "", "", ""] };
        }
        setRoadmap(newRoadmap);
    };

    const toggleForm = () => {
        if (!isFormVisible && !editingProjectId) initializeRoadmap();
        setIsFormVisible(!isFormVisible);
    };

    const resetForm = () => {
        setEditingProjectId(null);
        setSelectedCourseId("");
        setTitle("");
        setDescription("");
        setLevel("Beginner");
        initializeRoadmap();
        setJsonRoadmap("");
        setShowJsonInput(false);
        setIsFormVisible(false);
    };

    const handleTaskChange = (week, taskIdx, value) => {
        const updatedRoadmap = { ...roadmap };
        updatedRoadmap[week].tasks[taskIdx] = value;
        setRoadmap(updatedRoadmap);
    };

    const handlePhaseChange = (week, value) => {
        const updatedRoadmap = { ...roadmap };
        updatedRoadmap[week].phase = value;
        setRoadmap(updatedRoadmap);
    };

    const handleApplyJson = () => {
        try {
            const parsed = JSON.parse(jsonRoadmap);
            const formatted = {};
            for (let i = 1; i <= 24; i++) {
                if (!parsed[i] || !parsed[i].phase || !Array.isArray(parsed[i].tasks)) {
                    throw new Error(`Invalid data for Week ${i}. Must have "phase" string and "tasks" array.`);
                }
                formatted[i] = parsed[i];
            }
            setRoadmap(formatted);
            toast.success("Roadmap applied from JSON!");
            setShowJsonInput(false);
        } catch (error) {
            toast.error("Invalid JSON: " + error.message);
        }
    };

    const copyTemplate = () => {
        const template = {};
        for (let i = 1; i <= 24; i++) {
            template[i] = {
                phase: `Phase ${Math.ceil(i / 4)}`,
                tasks: ["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"]
            };
        }
        setJsonRoadmap(JSON.stringify(template, null, 2));
        toast.success("Template copied!");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCourseId || !title || !description) {
            return toast.error("Please fill in all basic project details");
        }
        const projectData = { _id: editingProjectId, courseId: selectedCourseId, title, description, level, roadmap };
        try {
            await axios.post(`${API}/api/projects`, projectData);
            toast.success(editingProjectId ? "Project updated!" : "Project created!");
            fetchInitialData();
            resetForm();
        } catch (error) {
            console.error("Error saving project:", error);
            toast.error(error.response?.data?.message || "Error saving project");
        }
    };

    const handleEdit = (project) => {
        setEditingProjectId(project._id);
        setSelectedCourseId(project.courseId?._id || project.courseId);
        setTitle(project.title);
        setDescription(project.description);
        setLevel(project.level);
        const rawRoadmap = project.roadmap instanceof Map ? Object.fromEntries(project.roadmap) : project.roadmap;
        const fullRoadmap = {};
        for (let i = 1; i <= 24; i++) {
            fullRoadmap[i] = rawRoadmap[i] || { phase: "", tasks: ["", "", "", "", ""] };
        }
        setRoadmap(fullRoadmap);
        setIsFormVisible(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            await axios.delete(`${API}/api/projects/${id}`);
            toast.success("Project deleted!");
            fetchInitialData();
        } catch {
            toast.error("Error deleting project");
        }
    };

    return (
        <div className="admin-content-wrap min-h-screen bg-slate-50 text-slate-700 font-sans p-6 md:p-10" id="AdminAddCourse">
            <Toaster position="top-center" toastOptions={{ style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' } }} />
            
            {/* Form Overlay */}
            {isFormVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/80 backdrop-blur-sm">
                    <div className="bg-white border border-slate-200 shadow-2xl p-6 md:p-8 rounded-2xl w-full max-w-4xl overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-600 flex items-center justify-center text-xl">
                                    <i className="fa fa-tasks"></i>
                                </div>
                                {editingProjectId ? "Edit Advance Project" : "Add New Advance Project"}
                            </h2>
                            <button
                                onClick={resetForm}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-rose-500/20 hover:text-rose-600 transition-colors"
                            >
                                <i className="fa fa-times text-lg"></i>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-slate-600 text-sm font-bold uppercase tracking-wider mb-2">Select Advance Course</label>
                                    <select 
                                        value={selectedCourseId} 
                                        onChange={(e) => setSelectedCourseId(e.target.value)} 
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                                        required
                                    >
                                        <option value="" className="bg-white text-slate-600">-- Select Advance Course --</option>
                                        {courses.map(course => (
                                            <option key={course._id} value={course._id} className="bg-white">{course.title}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-slate-600 text-sm font-bold uppercase tracking-wider mb-2">Difficulty Level</label>
                                    <select 
                                        value={level} 
                                        onChange={(e) => setLevel(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                                    >
                                        <option value="Beginner" className="bg-white">Beginner</option>
                                        <option value="Intermediate" className="bg-white">Intermediate</option>
                                        <option value="Advanced" className="bg-white">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-600 text-sm font-bold uppercase tracking-wider mb-2">Project Title</label>
                                <input 
                                    type="text" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)} 
                                    placeholder="e.g., Enterprise E-commerce Platform" 
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
                                    required 
                                />
                            </div>

                            <div>
                                <label className="block text-slate-600 text-sm font-bold uppercase tracking-wider mb-2">Description</label>
                                <textarea 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                    placeholder="Comprehensive project overview..." 
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500 h-28 resize-none"
                                    required 
                                />
                            </div>

                            <div className="mt-8">
                                <div className="flex flex-col sm:flex-row justify-between items-center pb-4 border-b border-slate-200 mb-6 gap-4">
                                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                        <i className="fa fa-map-signs text-indigo-600"></i>
                                        24-Week Roadmap
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() => setShowJsonInput(!showJsonInput)}
                                        className="px-4 py-2 bg-slate-50 border border-slate-600 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors"
                                    >
                                        {showJsonInput ? "Switch to Manual Input" : "Import from JSON"}
                                    </button>
                                </div>

                                {showJsonInput ? (
                                    <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                                        <p className="text-sm text-slate-600 flex items-center justify-between">
                                            Paste your 24-week roadmap JSON here.
                                            <button type="button" onClick={copyTemplate} className="text-indigo-600 hover:text-indigo-300 font-bold underline">
                                                [Copy Template]
                                            </button>
                                        </p>
                                        <textarea
                                            value={jsonRoadmap}
                                            onChange={(e) => setJsonRoadmap(e.target.value)}
                                            placeholder="Paste JSON roadmap here..."
                                            className="w-full h-80 px-4 py-4 bg-white border border-slate-200 rounded-xl text-emerald-600 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        <button 
                                            type="button" 
                                            onClick={handleApplyJson} 
                                            className="w-full bg-emerald-600/20 text-emerald-600 border border-emerald-500/50 font-bold py-3 rounded-xl hover:bg-emerald-600/40 transition-colors"
                                        >
                                            <i className="fa fa-check mr-2"></i> Apply JSON Roadmap
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <p className="text-sm text-slate-600 italic">Enter phase name and 5 tasks for each week.</p>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                            {Object.keys(roadmap).map(week => (
                                                <div key={week} className="bg-slate-50 p-5 border border-slate-200 rounded-xl hover:border-indigo-500/30 transition-colors">
                                                    <h4 className="text-indigo-600 font-bold text-lg mb-3">Week {week}</h4>
                                                    <div className="mb-4">
                                                        <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Phase Name</label>
                                                        <input
                                                            type="text"
                                                            placeholder={`Week ${week} Phase`}
                                                            value={roadmap[week].phase}
                                                            onChange={(e) => handlePhaseChange(week, e.target.value)}
                                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-500 text-sm"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-slate-600 text-xs font-bold uppercase mb-1">Tasks (Day 1–5)</label>
                                                        <div className="space-y-2">
                                                            {roadmap[week].tasks.map((task, idx) => (
                                                                <input
                                                                    key={idx}
                                                                    type="text"
                                                                    placeholder={`Day ${idx + 1} Task`}
                                                                    value={task}
                                                                    onChange={(e) => handleTaskChange(week, idx, e.target.value)}
                                                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-indigo-500 text-xs placeholder:text-slate-600"
                                                                    required
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="pt-6 border-t border-slate-200">
                                <button 
                                    type="submit" 
                                    className="w-full bg-indigo-600 text-slate-900 font-bold py-4 rounded-xl hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all duration-300 text-lg"
                                >
                                    {editingProjectId ? "Update Project" : "Create Project"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
                            <i className="fa fa-folder-open text-indigo-500"></i>
                            Advance Course Projects
                        </h1>
                        <p className="text-slate-600 mt-1">Manage project roadmaps and assignments</p>
                    </div>
                    <button 
                        className="bg-indigo-600 text-slate-900 font-bold py-2.5 px-6 rounded-xl hover:bg-indigo-500 hover:shadow-[0_0_15px_rgba(79,70,229,0.4)] transition-all flex items-center gap-2" 
                        onClick={toggleForm}
                    >
                        <i className="fa fa-plus"></i> New Project
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                    </div>
                ) : (
                    <div className="bg-slate-50 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse whitespace-nowrap">
                                <thead>
                                    <tr className="bg-white border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-widest">
                                        <th className="px-6 py-4">Sl No.</th>
                                        <th className="px-6 py-4">Advance Course</th>
                                        <th className="px-6 py-4">Project Name</th>
                                        <th className="px-6 py-4">Level</th>
                                        <th className="px-6 py-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 text-sm">
                                    {projects.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-10 text-center text-slate-500 italic">No advance projects yet. Add one to get started!</td>
                                        </tr>
                                    ) : (
                                        projects.map((proj, index) => (
                                            <tr key={proj._id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 text-slate-500 font-mono">{index + 1}</td>
                                                <td className="px-6 py-4 font-bold text-indigo-600">{proj._courseTitle || "Unknown Course"}</td>
                                                <td className="px-6 py-4 text-slate-900 font-medium">{proj.title}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                                                        proj.level === 'Advanced' ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' :
                                                        proj.level === 'Intermediate' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                                                        'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                                                    }`}>
                                                        {proj.level}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button 
                                                            onClick={() => handleEdit(proj)}
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 hover:bg-indigo-500 hover:text-slate-900 transition-all"
                                                            title="Edit Project"
                                                        >
                                                            <i className="fa fa-edit"></i>
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(proj._id)}
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-500/10 border border-rose-500/20 text-rose-600 hover:bg-rose-500 hover:text-slate-900 transition-all"
                                                            title="Delete Project"
                                                        >
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(30, 41, 59, 0.5);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(71, 85, 105, 0.8);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(99, 102, 241, 0.8);
                }
            `}</style>
        </div>
    );
};

export default AdvProjectPage;
