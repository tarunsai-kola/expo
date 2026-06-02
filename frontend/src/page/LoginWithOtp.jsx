import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import API from '../API';
import toast, { Toaster } from 'react-hot-toast';
import { FaEnvelope, FaKey, FaArrowLeft } from 'react-icons/fa';
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
    <div className="min-h-screen bg-[#05050A] flex items-center justify-center relative overflow-hidden font-sans p-4">
      <Toaster position="top-center" reverseOrder={false} 
        toastOptions={{
          style: {
            background: '#1e1e2d',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          }
        }} 
      />

      {/* Ambient Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Main Login Card */}
      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Logo Header */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="inline-block p-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md mb-6 hover:bg-white/10 transition-colors">
            <img src={atoraxLogo} alt="Atorax Logo" className="h-10 w-auto object-contain" />
          </Link>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">OTP Login</h2>
          <p className="text-gray-400 text-sm text-center">
            {showOtp 
              ? `We've sent a code to ${email}`
              : "Enter your email to receive a one-time password."}
          </p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-300">
          <form onSubmit={showOtp ? handleVerifyOtp : (e) => { e.preventDefault(); handleSendOtp(); }} className="space-y-5">
            
            {!showOtp ? (
              /* Email Input */
              <div className="space-y-1.5 group animate-in fade-in slide-in-from-right-4 duration-300">
                <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 flex items-center gap-2">
                  <FaEnvelope className="text-blue-500" /> Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                  />
                </div>
              </div>
            ) : (
              /* OTP Input */
              <div className="space-y-1.5 group animate-in fade-in slide-in-from-right-4 duration-300">
                <label htmlFor="otp" className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 flex items-center gap-2">
                  <FaKey className="text-blue-500" /> One-Time Password
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="otp"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm tracking-widest text-center"
                    maxLength={6}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex justify-center items-center h-[52px]"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {showOtp ? "Verifying..." : "Sending..."}
                </div>
              ) : (
                showOtp ? "Verify & Sign In" : "Send OTP"
              )}
            </button>
          </form>

          {/* Action links */}
          <div className="mt-6 flex flex-col space-y-4">
            {showOtp && (
              <div className="flex justify-between items-center text-xs">
                <button 
                  type="button" 
                  onClick={() => setShowOtp(false)}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <FaArrowLeft /> Back
                </button>
                <button 
                  type="button" 
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="text-blue-500 hover:text-blue-400 transition-colors font-semibold disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </div>
            )}

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-[#0a0a10] text-gray-500 rounded-full font-medium">Or</span>
              </div>
            </div>

            {/* Password Login Alternative */}
            <Link 
              to="/Login" 
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-semibold text-sm transition-all"
            >
              Sign in with Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWithOtp;
