import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import { Users, Plus, X, Edit2, Trash2, EyeOff, Send, Mail, UserCog, User, ShieldCheck, Lock, Phone, Building } from "lucide-react";

const CreateTPO = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [tpoList, setTpoList] = useState([]);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    collegeName: "",
  });

  const [loading, setLoading] = useState(true);

  const toggleVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
    if (isFormVisible) resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTPO = {
      fullname: formData.fullname.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password.trim(),
      collegeName: formData.collegeName.trim(),
    };
    try {
      const response = await axios.post(`${API}/api/tpo/create-tpo`, newTPO);
      toast.success("TPO created successfully!");
      fetchTPOs();
      resetForm();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "There was an error while creating the TPO";
      toast.error(errorMessage);
    }
  };

  const fetchTPOs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/api/tpo/all`);
      setTpoList(response.data || []);
    } catch (error) {
      console.error("There was an error fetching TPOs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTPOs();
  }, []);

  const resetForm = () => {
    setFormData({
      fullname: "",
      email: "",
      phone: "",
      password: "",
      collegeName: "",
    });
    setIsFormVisible(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "fullname" || name === "email" ? value.toLowerCase() : value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pt-[90px] lg:ml-[265px] p-6 relative">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
                <UserCog size={24} className="text-indigo-600" />
              </div>
              TPO Management
            </h1>
            <p className="text-slate-500 font-medium mt-2 ml-1">Create and manage Training & Placement Officers.</p>
          </div>
          <button 
            onClick={toggleVisibility}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-indigo-200 flex items-center gap-2 hover:-translate-y-0.5"
          >
            {isFormVisible ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add New TPO</>}
          </button>
        </div>

        {/* Modal / Inline Form */}
        {isFormVisible && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-8 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Plus size={20} className="text-indigo-500" />
                Create New TPO Account
              </h2>
              <button onClick={resetForm} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors"><User size={18} /></div>
                  <input
                    value={formData.fullname}
                    onChange={handleChange}
                    type="text"
                    name="fullname"
                    placeholder="John Doe"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors"><Mail size={18} /></div>
                  <input
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="tpo@college.edu"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors"><Phone size={18} /></div>
                  <input
                    value={formData.phone}
                    onChange={handleChange}
                    type="text"
                    name="phone"
                    placeholder="9876543210"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">College Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors"><Building size={18} /></div>
                  <input
                    value={formData.collegeName}
                    onChange={handleChange}
                    type="text"
                    name="collegeName"
                    placeholder="e.g. Stanford University"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Account Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors"><Lock size={18} /></div>
                  <input
                    type="text"
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    placeholder="Create password"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-sm"
                  />
                </div>
              </div>

              <div className="md:col-span-2 pt-4">
                <button type="submit" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-sm tracking-wide transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                  Create TPO Account
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <Users size={20} />
            </div>
            <h2 className="text-lg font-black text-slate-800">Active TPO Accounts</h2>
            <div className="ml-auto bg-white px-3 py-1 rounded-full border border-slate-200 text-xs font-bold text-slate-500 shadow-sm">
              {tpoList.length} Total
            </div>
          </div>

          <div className="p-6 md:p-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm font-bold text-slate-400">Loading TPO directory...</p>
              </div>
            ) : tpoList.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Users size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-bold text-slate-600 mb-1">No TPO Accounts Found</h3>
                <p className="text-sm text-slate-500 mb-6">Get started by creating your first TPO account.</p>
                <button onClick={toggleVisibility} className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-indigo-600 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all">
                  <Plus size={18} /> Add TPO Account
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-4 font-black text-xs uppercase tracking-widest text-slate-400 w-16">ID</th>
                      <th className="pb-4 font-black text-xs uppercase tracking-widest text-slate-400">Personnel Info</th>
                      <th className="pb-4 font-black text-xs uppercase tracking-widest text-slate-400">College</th>
                      <th className="pb-4 font-black text-xs uppercase tracking-widest text-slate-400">Phone</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tpoList.map((tpo, index) => (
                      <tr key={tpo._id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="py-4 text-sm font-bold text-slate-400">
                          #{String(index + 1).padStart(2, '0')}
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black text-sm">
                              {tpo.fullname.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-slate-800 capitalize">{tpo.fullname}</div>
                              <div className="text-xs font-semibold text-slate-500 lowercase">{tpo.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                            <Building size={14} /> {tpo.collegeName}
                          </span>
                        </td>
                        <td className="py-4 text-sm text-slate-600 font-medium">
                          {tpo.phone}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTPO;
