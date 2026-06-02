import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../API';
import toast, { Toaster } from 'react-hot-toast';

const AdvFormLeads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalLeads, setTotalLeads] = useState(0);

    useEffect(() => {
        fetchLeads();
    }, [page]);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API}/api/adv-leads/get-adv-form-leads?page=${page}&limit=30`);
            if (res.data.success) {
                setLeads(res.data.leads);
                setTotalPages(res.data.totalPages);
                setTotalLeads(res.data.total);
            }
        } catch (error) {
            toast.error("Failed to fetch leads");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCRM = async (leadId) => {
        try {
            const res = await axios.post(`${API}/api/adv-leads/add-form-lead-to-crm`, { leadId });
            if (res.data.success) {
                toast.success(res.data.message);
                setLeads(prevLeads => prevLeads.map(l => 
                    String(l._id) === String(leadId) ? { ...l, isAddedToCRM: true } : l
                ));
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "";
            if (errorMsg.includes("already exists") || errorMsg.includes("already in the CRM")) {
                toast.success("Lead already exists in CRM. Marking as added.");
                setLeads(prevLeads => prevLeads.map(l => 
                    String(l._id) === String(leadId) ? { ...l, isAddedToCRM: true } : l
                ));
            } else {
                toast.error(errorMsg || "Failed to add lead to CRM");
            }
            console.error(error);
        }
    };

    return (
        <div className="admin-content-wrap min-h-screen bg-slate-50 text-slate-700 font-sans p-6">
            <Toaster toastOptions={{ style: { background: '#1e293b', color: '#f8fafc', border: '1px solid #334155' } }} />
            
            <div className="max-w-7xl mx-auto py-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                            <i className="fa fa-users text-indigo-500"></i>
                            Advanced Enrollment Leads
                        </h1>
                        <p className="text-slate-600 mt-1">Total Leads: <span className="font-bold text-indigo-600">{totalLeads}</span></p>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-slate-50 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                        <span className="flex items-center text-sm font-medium text-slate-700 border-r border-slate-200 pr-3">
                            Page {page} of {totalPages}
                        </span>
                        <div className="flex gap-1">
                            <button 
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1 || loading}
                                className="p-1.5 rounded text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                                title="Previous Page"
                            >
                                <i className="fa fa-chevron-left text-sm"></i>
                            </button>
                            <button 
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages || loading}
                                className="p-1.5 rounded text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                                title="Next Page"
                            >
                                <i className="fa fa-chevron-right text-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-white border-b border-slate-200">
                                    <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-widest">Name & Email</th>
                                    <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-widest">Contact</th>
                                    <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-widest">Domain & Goal</th>
                                    <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-widest">Commitment</th>
                                    <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-widest">Preferred Time</th>
                                    <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-widest">Date</th>
                                    <th className="p-4 text-xs font-semibold text-slate-600 uppercase tracking-widest">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="p-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-indigo-500 border-t-transparent"></div>
                                                <p className="text-slate-600 font-medium">Fetching enrollment data...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : leads.length > 0 ? (
                                    (() => {
                                        const grouped = leads.reduce((acc, lead) => {
                                            const d = new Date(lead.created_at);
                                            const dateKey = d.toLocaleDateString("en-GB");
                                            if (!acc[dateKey]) acc[dateKey] = [];
                                            acc[dateKey].push(lead);
                                            return acc;
                                        }, {});

                                        return Object.keys(grouped).sort((a, b) => {
                                            const dateA = new Date(a.split('/').reverse().join('-'));
                                            const dateB = new Date(b.split('/').reverse().join('-'));
                                            return dateB - dateA;
                                        }).map(date => (
                                            <React.Fragment key={date}>
                                                <tr className="bg-white">
                                                    <td colSpan="7" className="px-6 py-3 text-xs font-bold text-indigo-600 uppercase tracking-widest border-y border-slate-200">
                                                        <div className="flex items-center gap-2">
                                                            <i className="fa fa-calendar-o"></i>
                                                            {date}
                                                        </div>
                                                    </td>
                                                </tr>
                                                {grouped[date].map((lead) => (
                                                    <tr key={lead._id} className="hover:bg-slate-50 transition-colors group">
                                                        <td className="p-4">
                                                            <div className="font-bold text-slate-900">{lead.fullName}</div>
                                                            <div className="text-xs text-slate-600 mt-0.5">{lead.email}</div>
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="text-sm font-medium text-slate-700">{lead.contactNumber}</div>
                                                            <div className="text-xs text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                                                                <i className="fa fa-whatsapp text-[10px]"></i> WA: {lead.whatsappNumber}
                                                            </div>
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="text-xs bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-2 py-1 rounded inline-block font-bold mb-1.5">
                                                                {lead.domain}
                                                            </div>
                                                            <div className="text-xs text-slate-600 truncate max-w-[200px]" title={lead.primaryGoal}>{lead.primaryGoal}</div>
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="text-xs font-bold text-slate-700 mb-1">{lead.commitmentLevel}</div>
                                                            <div className={`text-[10px] uppercase font-bold tracking-wider ${lead.readyToInvest === 'Yes, I\'m ready' ? 'text-emerald-600' : 'text-orange-400'}`}>
                                                                Invest: {lead.readyToInvest}
                                                            </div>
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="text-sm font-bold text-slate-700 mb-1">{lead.connectTime}</div>
                                                            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Lang: {lead.preferredLanguages?.join(', ')}</div>
                                                        </td>
                                                        <td className="p-4">
                                                            <div className="text-xs text-slate-700 font-medium">
                                                                {new Date(lead.created_at).toLocaleDateString()}
                                                            </div>
                                                            <div className="text-[10px] text-slate-500 mt-0.5">
                                                                {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </div>
                                                        </td>
                                                        <td className="p-4">
                                                            <button 
                                                                onClick={() => !lead.isAddedToCRM && handleAddToCRM(lead._id)}
                                                                disabled={lead.isAddedToCRM}
                                                                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all shadow-sm flex items-center gap-1.5 ${
                                                                    lead.isAddedToCRM 
                                                                    ? 'bg-emerald-500/20 text-emerald-600 cursor-default border border-emerald-500/30' 
                                                                    : 'bg-indigo-600 text-slate-900 hover:bg-indigo-500 border border-transparent shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]'
                                                                }`}
                                                            >
                                                                <i className={`fa ${lead.isAddedToCRM ? 'fa-check-circle' : 'fa-user-plus'}`}></i>
                                                                {lead.isAddedToCRM ? 'Added to CRM' : 'Add to CRM'}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ));
                                    })()
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="p-20 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3 border border-slate-200">
                                                    <i className="fa fa-folder-open-o text-2xl text-slate-500"></i>
                                                </div>
                                                <h3 className="text-sm font-medium text-slate-900">No Enrollment Leads</h3>
                                                <p className="text-xs text-slate-600 mt-1">There are no leads found in the database.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvFormLeads;
