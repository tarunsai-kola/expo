import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaMobileAlt } from "react-icons/fa";
import atoraxLogo from "../assets/LOGO3.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API}/checkuserauth`, {
        email,
        password,
      });
      toast.success("Login successful!");
      if (response.status === 200) {
        localStorage.setItem("userId", response.data._id);
        localStorage.setItem("userEmail", response.data.email);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("advance", response.data.advance);
        
        // Small delay for animation
        setTimeout(() => {
          if (response.data.advance) {
            navigate("/advancedashboard");
          } else {
            navigate("/Dashboard");
          }
        }, 1000);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Your account is inactive. Please contact support.");
      } else if (error.response?.status === 401) {
        toast.error("Invalid email or password.");
      } else {
        toast.error(
          error.response?.data?.message ||
          "An error occurred while logging in. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
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
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Sign in to your Atorax learning dashboard.</p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Input */}
            <div className="space-y-1.5 group">
              <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 flex items-center gap-2">
                <FaEnvelope className="text-blue-500" /> Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5 group">
              <label htmlFor="password" className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 flex items-center gap-2">
                <FaLock className="text-blue-500" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end pt-1">
              <Link to="/forgotpassword" className="text-xs font-semibold text-blue-500 hover:text-blue-400 transition-colors">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Logging in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-[#0a0a10] text-gray-500 rounded-full font-medium">Or continue with</span>
            </div>
          </div>

          {/* OTP Login Alternative */}
          <Link 
            to="/Loginwithotp" 
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-semibold text-sm transition-all"
          >
            <FaMobileAlt className="text-gray-400" />
            Sign in with OTP
          </Link>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-gray-500 mt-8">
          By signing in, you agree to Atorax's <br/>
          <Link to="/Terms" className="text-gray-400 hover:text-white underline underline-offset-2">Terms of Service</Link> and <Link to="/Privacy" className="text-gray-400 hover:text-white underline underline-offset-2">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
