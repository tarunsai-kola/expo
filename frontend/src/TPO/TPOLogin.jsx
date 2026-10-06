import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API from "../API";

const TPOLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/api/tpo/tpo-login`, { email, password });
            if (res.status === 200) {
                toast.success("Login Successful!");
                localStorage.setItem("tpoToken", res.data.token);
                localStorage.setItem("tpoId", res.data.tpo.id);
                localStorage.setItem("tpoName", res.data.tpo.fullname);
                localStorage.setItem("tpoCollege", res.data.tpo.collegeName);

                setTimeout(() => {
                    navigate("/tpodashboard");
                }, 1500);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Toaster position="top-center" />
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border border-slate-200">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                        🎓
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-800">TPO Portal</h2>
                    <p className="text-slate-500 text-sm mt-1">Training & Placement Officer Login</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-slate-700 font-semibold mb-1 text-sm">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-slate-700 font-semibold mb-1 text-sm">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all shadow-md transform hover:-translate-y-0.5">
                        Secure Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TPOLogin;
