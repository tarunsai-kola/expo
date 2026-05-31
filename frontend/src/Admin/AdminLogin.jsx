import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import checkAdminAuth from "../checkAdminAuth";
import toast, { Toaster } from 'react-hot-toast';
import { FaEnvelope, FaKey, FaShieldAlt, FaArrowRight, FaLock } from 'react-icons/fa';

const AdminLogIn = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); 
  const [isTimerActive, setIsTimerActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!localStorage.getItem("adminToken")) return;
      
      const isAdmin = await checkAdminAuth();
      if (isAdmin) {
        navigate("/AdminDashboard");
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    let timer;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }
    try {
      await axios.post(`${API}/otpsend`, { email });
      setIsOtpSent(true);
      setTimeLeft(120);
      setIsTimerActive(true);
      toast.success("OTP sent to your email!");
    }
    catch (err) {
      console.error("OTP error:", err.response?.data || err.message);
      const msg = err.response?.data?.message || "Failed to send OTP. Try again.";
      toast.error(msg);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("OTP is required");
      return;
    }
    try {
      const response = await axios.post(`${API}/otpverify`, { email, otp });
      if(response.status === 200){
        toast.success('Login successful!!!');
        setTimeout(() => {
           localStorage.setItem("adminToken", response.data.token);
           localStorage.setItem("adminId", response.data.adminId);
           localStorage.setItem("adminName", response.data.adminName);
           navigate("/AdminDashboard");
        }, 1500);
      }
    } catch (err) {
      toast.error("Failed to verify OTP or Invalid OTP");
    }
  };

  const handleResendOtp = () => {
    handleSendOtp();
    setOtp(""); 
  };

  return (
    <div className="min-h-screen bg-[#05050A] flex items-center justify-center p-4 relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} toastOptions={{
        style: { background: '#1e1e2d', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      }} />

      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none transform -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none transform translate-y-1/2 translate-x-1/2"></div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-white/5 border border-white/10 rounded-2xl mb-4 text-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.15)]">
            <FaShieldAlt size={32} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Admin Portal</h1>
          <p className="text-gray-400 mt-2 text-sm">Secure access for Atorax administrators</p>
        </div>

        {/* Glassmorphic Form Card */}
        <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
          
          {/* Top Edge Highlight */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

          <div className="space-y-6 relative z-10">
            
            {/* Email Input */}
            <div className={`space-y-1.5 transition-all duration-500 ${isOtpSent ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Admin Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isOtpSent}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm disabled:bg-black/20"
                  placeholder="Enter your admin email"
                />
              </div>
            </div>

            {/* OTP Input (Fades in if OTP sent) */}
            {isOtpSent && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-top-4 duration-500">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 flex justify-between">
                  <span>Security Code</span>
                  <span className={`text-xs ${timeLeft <= 30 ? 'text-red-400 animate-pulse' : 'text-blue-400'}`}>
                    0{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                    <FaKey />
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm text-center tracking-[0.5em] font-mono text-lg"
                    placeholder="------"
                    maxLength={6}
                  />
                </div>
                
                {/* Resend OTP */}
                {timeLeft === 0 && (
                  <div className="flex justify-end pt-2">
                    <button 
                      onClick={handleResendOtp}
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                    >
                      Resend OTP Code
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Action Button */}
            <div className="pt-4">
              <button
                onClick={isOtpSent ? handleVerifyOtp : handleSendOtp}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-base tracking-wide transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 group"
              >
                {isOtpSent ? (
                  <>
                    <FaLock className="group-hover:scale-110 transition-transform" /> Secure Login
                  </>
                ) : (
                  <>
                    Send OTP <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 text-center text-xs text-gray-600 border-t border-white/5 pt-6">
              <p>Protected by Atorax Secure Gateway</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLogIn;
