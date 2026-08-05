import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../API";
const AdminWorkshop = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);

    const WORKSHOP_TITLES = ["All", "AI & Machine Learning", "Cybersecurity", "IoT & Robotics"];
    const [selectedTab, setSelectedTab] = useState("All");

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const res = await axios.get(`${API}/api/workshop/registrations`);
            setRegistrations(res.data);
        } catch (error) {
            console.error("Failed to fetch registrations", error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = (title) => {
        window.open(`${API}/api/workshop/export/${encodeURIComponent(title)}`, "_blank");
    };

    const filteredRegistrations = selectedTab === "All" 
        ? registrations 
        : registrations.filter(r => r.workshopTitle === selectedTab);

    return (
        <div className="admin-content-wrap bg-gray-50 min-h-screen font-display">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Workshop Registrations</h1>
                    <button 
                        onClick={() => handleExport(selectedTab)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
                    >
                        <span className="material-symbols-outlined text-sm">download</span>
                        Export {selectedTab} to CSV
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                    {WORKSHOP_TITLES.map((title) => (
                        <button
                            key={title}
                            onClick={() => setSelectedTab(title)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                selectedTab === title 
                                    ? "bg-blue-600 text-white" 
                                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                            }`}
                        >
                            {title} ({title === "All" ? registrations.length : registrations.filter(r => r.workshopTitle === title).length})
                        </button>
                    ))}
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-200 text-sm font-semibold text-gray-700">
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Phone</th>
                                    <th className="p-4">College</th>
                                    <th className="p-4">Workshop</th>
                                    <th className="p-4">Registered Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-gray-500">Loading data...</td>
                                    </tr>
                                ) : filteredRegistrations.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-gray-500">No registrations found for {selectedTab}.</td>
                                    </tr>
                                ) : (
                                    filteredRegistrations.map((reg) => (
                                        <tr key={reg._id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="p-4 font-medium text-gray-900">{reg.name}</td>
                                            <td className="p-4 text-gray-600">{reg.email}</td>
                                            <td className="p-4 text-gray-600">{reg.phone}</td>
                                            <td className="p-4 text-gray-600">{reg.college}</td>
                                            <td className="p-4">
                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                                                    {reg.workshopTitle}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-500 text-sm">
                                                {new Date(reg.registeredAt).toLocaleDateString()}
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

export default AdminWorkshop;
