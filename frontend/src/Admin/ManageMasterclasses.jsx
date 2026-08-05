import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";

const ManageMasterclasses = () => {
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        curriculum: "", // Will be split by comma
        duration: "",
        isActive: true
    });

    useEffect(() => {
        fetchWorkshops();
    }, []);

    const fetchWorkshops = async () => {
        try {
            const res = await axios.get(`${API}/api/workshop/admin/list`);
            setWorkshops(res.data);
        } catch (error) {
            toast.error("Failed to fetch workshops");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const payload = {
            ...formData,
            curriculum: formData.curriculum.split(",").map(i => i.trim()).filter(i => i)
        };

        try {
            if (isEditing) {
                await axios.put(`${API}/api/workshop/admin/update/${currentId}`, payload);
                toast.success("Workshop updated successfully");
            } else {
                await axios.post(`${API}/api/workshop/admin/create`, payload);
                toast.success("Workshop created successfully");
            }
            
            resetForm();
            fetchWorkshops();
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const handleEdit = (ws) => {
        setFormData({
            title: ws.title,
            description: ws.description,
            curriculum: ws.curriculum.join(", "),
            duration: ws.duration,
            isActive: ws.isActive
        });
        setCurrentId(ws._id);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this workshop?")) return;
        
        try {
            await axios.delete(`${API}/api/workshop/admin/delete/${id}`);
            toast.success("Workshop deleted");
            fetchWorkshops();
        } catch (error) {
            toast.error("Failed to delete workshop");
        }
    };

    const resetForm = () => {
        setFormData({ title: "", description: "", curriculum: "", duration: "", isActive: true });
        setIsEditing(false);
        setCurrentId(null);
    };

    return (
        <div className="admin-content-wrap bg-gray-50 min-h-screen font-display">
            <Toaster position="top-center" />
            
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow border border-gray-200 p-6 sticky top-24">
                        <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Workshop" : "Create New Workshop"}</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input 
                                    type="text" name="title" required value={formData.title} onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea 
                                    name="description" required rows="3" value={formData.description} onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Curriculum (comma separated)</label>
                                <textarea 
                                    name="curriculum" required rows="3" value={formData.curriculum} onChange={handleChange}
                                    placeholder="Intro to AI, Python Basics, Projects..."
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                <input 
                                    type="text" name="duration" required value={formData.duration} onChange={handleChange}
                                    placeholder="e.g., 2 Days (Weekend)"
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input 
                                    type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleChange}
                                    className="w-4 h-4 text-blue-600 rounded"
                                />
                                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active (Visible on Landing Page)</label>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition">
                                    {isEditing ? "Update" : "Create"}
                                </button>
                                {isEditing && (
                                    <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* List Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                            <h2 className="text-lg font-bold">Existing Masterclasses</h2>
                        </div>
                        
                        <div className="p-4">
                            {loading ? (
                                <p className="text-gray-500 text-center py-8">Loading workshops...</p>
                            ) : workshops.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No workshops created yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {workshops.map(ws => (
                                        <div key={ws._id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start hover:shadow-md transition">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-lg font-bold text-gray-900">{ws.title}</h3>
                                                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${ws.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {ws.isActive ? 'Active' : 'Hidden'}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">{ws.description}</p>
                                                
                                                <div className="text-sm text-gray-500 flex gap-4">
                                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> {ws.duration}</span>
                                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">menu_book</span> {ws.curriculum.length} Topics</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex gap-2 shrink-0 ml-4">
                                                <button onClick={() => handleEdit(ws)} className="p-2 text-blue-600 bg-blue-50 rounded hover:bg-blue-100">
                                                    <span className="material-symbols-outlined">edit</span>
                                                </button>
                                                <button onClick={() => handleDelete(ws._id)} className="p-2 text-red-600 bg-red-50 rounded hover:bg-red-100">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ManageMasterclasses;
