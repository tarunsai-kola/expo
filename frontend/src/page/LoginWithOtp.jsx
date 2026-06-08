import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import API from '../API';
import toast, { Toaster } from 'react-hot-toast';
import { Mail, KeyRound, ArrowLeft, Lock } from 'lucide-react';
import atoraxLogo from '../assets/LOGO3.png';

const LoginWithOtp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API}/send-otp`, { email });
      if (response.status === 200) {
        toast.success('OTP sent successfully');
        setShowOtp(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API}/verify-otp`, { email, otp });
      toast.success('login successful!!!');
      if (response.status === 200) {
        setTimeout(() => {
          localStorage.setItem('userId', response.data._id);
          localStorage.setItem('userEmail', response.data.email);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('advance', response.data.advance);
          if (response.data.advance) {
            navigate('/advancedashboard');
          } else {
            navigate('/Dashboard');
          }
        }, 2000);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Your account is inactive. Please contact support.");
      } else if (error.response?.status === 400) {
        toast.error("Invalid or expired OTP. Please try again.");
      } else if (error.response?.status === 404) {
        toast.error("User not found. Please check your email.");
      } else {
        toast.error(
          error.response?.data?.message || "An error occurred while verifying OTP. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center relative overflow-hidden font-sans p-4">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[55vh] bg-indigo-600 rounded-b-[100px] shadow-2xl shadow-indigo-200/50 -z-0 transform -translate-y-10 skew-y-2"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl -z-0 pointer-events-none"></div>

      {/* Main Login Card */}
      <div className="w-full max-w-[440px] relative z-10 animate-[fadeIn_0.5s_ease-out] mt-10">
        
        {/* Logo Header */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="inline-block p-4 bg-white rounded-2xl shadow-lg shadow-indigo-900/10 mb-6 hover:-translate-y-1 transition-transform">
            <img src={atoraxLogo} alt="Atorax Logo" className="h-10 w-auto object-contain" />
          </Link>
          <h2 className="text-3xl font-black text-white tracking-tight mb-2">OTP Login</h2>
          <p className="text-indigo-100 font-medium text-center max-w-[280px]">
            {showOtp 
              ? `We've sent a 6-digit code to ${email}`
              : "Enter your email to receive a one-time secure password."}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 transition-all duration-300">
          <form onSubmit={showOtp ? handleVerifyOtp : (e) => { e.preventDefault(); handleSendOtp(); }} className="space-y-6">
            
            {!showOtp ? (
              /* Email Input */
              <div className="space-y-2 animate-[fadeIn_0.3s_ease-out]">
                <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                   Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all sm:text-sm"
                  />
                </div>
              </div>
            ) : (
              /* OTP Input */
              <div className="space-y-2 animate-[fadeIn_0.3s_ease-out]">
                <label htmlFor="otp" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                  One-Time Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <KeyRound size={18} />
                  </div>
                  <input
                    type="text"
                    id="otp"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 font-bold placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all sm:text-lg tracking-widest"
                    maxLength={6}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black tracking-wide transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex justify-center items-center"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {showOtp ? "Verifying..." : "Sending OTP..."}
                </div>
              ) : (
                showOtp ? "Verify & Sign In" : "Send OTP"
              )}
            </button>
          </form>

          {/* Action links */}
          <div className="mt-8 flex flex-col space-y-4">
            {showOtp && (
              <div className="flex justify-between items-center text-sm font-bold">
                <button 
                  type="button" 
                  onClick={() => setShowOtp(false)}
                  className="text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft size={16} /> Change Email
                </button>
                <button 
                  type="button" 
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="text-indigo-600 hover:text-indigo-700 transition-colors disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </div>
            )}

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest text-slate-400">
                <span className="px-4 bg-white">Or</span>
              </div>
            </div>

            {/* Password Login Alternative */}
            <Link 
              to="/Login" 
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-bold transition-all shadow-sm"
            >
              <Lock size={18} className="text-slate-500" />
              Sign in with Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWithOtp;
