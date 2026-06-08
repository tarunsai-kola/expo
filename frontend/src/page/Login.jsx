import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, Smartphone } from "lucide-react";
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
          <h2 className="text-3xl font-black text-white tracking-tight mb-2">Welcome Back</h2>
          <p className="text-indigo-100 font-medium">Sign in to your Atorax dashboard.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div className="space-y-2">
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

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-12 py-3.5 text-slate-700 font-medium placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end -mt-2">
              <Link to="/forgotpassword" className="text-sm font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black tracking-wide transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex justify-center items-center"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </div>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest text-slate-400">
              <span className="px-4 bg-white">Or</span>
            </div>
          </div>

          {/* OTP Login Alternative */}
          <Link 
            to="/Loginwithotp" 
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-bold transition-all shadow-sm"
          >
            <Smartphone size={18} className="text-slate-500" />
            Sign in with OTP
          </Link>
        </div>

        {/* Footer info */}
        <p className="text-center text-sm font-medium text-slate-500 mt-8">
          By signing in, you agree to Atorax's <br/>
          <Link to="/Terms" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">Terms of Service</Link> and <Link to="/Privacy" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
