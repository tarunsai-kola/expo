import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../API";
import toast, { Toaster } from 'react-hot-toast';
import { FiMail, FiKey, FiArrowRight } from "react-icons/fi";

const AdvTeamLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Send OTP 
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/advteamsendotp`, { email });
      toast.success("OTP sent to your email!");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP!");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API}/advteamverifyotp`, { email, otp });
      if (response.status === 200) {
        toast.success("Login successful!");
        const loginTime = new Date().getTime();
        setTimeout(() => {
          localStorage.setItem("advTeamEmail", email);
          localStorage.setItem("advTeamId", response.data.bdaId);
          localStorage.setItem("advTeamName", response.data.bdaName);
          localStorage.setItem("advTeamToken", response.data.token);
          localStorage.setItem("advTeamDesignation", response.data.user.role);
          localStorage.setItem("advTeamTeam", response.data.user.team);
          localStorage.setItem("advTeamSessionStartTime", loginTime);
          navigate("/advteam/home");
        }, 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to verify OTP!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-gray-300 font-sans relative overflow-hidden flex items-center justify-center">
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#11111a',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px'
          }
        }} 
      />

      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"></div>

      <div className="relative w-full max-w-md p-8 bg-[#0a0a14]/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-10 mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6">
            <span className="text-2xl font-bold text-white">AT</span>
          </div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Advance Team
          </h2>
          <p className="text-gray-500 mt-2 text-sm font-medium">Secure Access Portal</p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendOTP} className="space-y-6">
            <div className="space-y-1.5 group">
              <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Company Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                  placeholder="Enter your official email"
                />
              </div>
            </div>

            <button 
              disabled={loading} 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>Send OTP <FiArrowRight /></>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <div className="space-y-1.5 group">
              <label htmlFor="otp" className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">One Time Password</label>
              <div className="relative">
                <FiKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  id="otp"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm text-center tracking-[0.5em] font-mono text-lg"
                  placeholder="------"
                  maxLength={6}
                />
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Verify & Login"
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                className="text-sm text-gray-400 hover:text-white transition-colors"
                onClick={() => setStep(1)}
              >
                ← Back to Email
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdvTeamLogin;
