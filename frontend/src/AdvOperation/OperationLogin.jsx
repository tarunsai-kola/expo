import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

// --- SVG Icons ---
const Icons = {
  Mail: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
  Lock: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
  ShieldCheck: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>,
  ArrowRight: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
};

const OperationLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const errorRef = useRef(null);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API}/advoperationsendotp`, { email });
      if (response.status === 200) {
        setOtpSent(true);
        toast.success('OTP sent to your email!');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter OTP.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API}/advoperationverifyotp`, {
        email,
        otp,
      });
      if (response.status === 200) {
        toast.success('OTP verified successfully!');
        const loginTime = new Date().getTime();
        setTimeout(() => {
          localStorage.setItem("advOperationId", response.data._id);
          localStorage.setItem("advOperationName", response.data.operationName);
          localStorage.setItem("advOperationToken", response.data.token);
          localStorage.setItem("sessionStartTime", loginTime);
          navigate("/AdvOperationDashboard");
        }, 1500);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (errorRef.current && !errorRef.current.contains(event.target)) {
        toast.dismiss(); // dismiss all toasts instead of passing null
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      fontFamily: "'Inter', sans-serif",
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background glows */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', pointerEvents: 'none' }}></div>

      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#1E293B',
            color: '#F8FAFC',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
          }
        }} 
      />

      <div 
        ref={errorRef}
        style={{
          background: 'rgba(30, 41, 59, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '32px',
          padding: '48px 40px',
          width: '100%',
          maxWidth: '440px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
          transform: 'translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          zIndex: 10
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            padding: '20px',
            borderRadius: '50%',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)'
          }}>
            {Icons.ShieldCheck}
          </div>
        </div>

        <h2 style={{ 
          color: '#F8FAFC', 
          fontSize: '28px', 
          fontWeight: '800', 
          textAlign: 'center', 
          margin: '0 0 8px 0',
          letterSpacing: '-0.5px' 
        }}>
          ADV Operation Login
        </h2>
        <p style={{ 
          color: '#94A3B8', 
          fontSize: '15px', 
          textAlign: 'center', 
          margin: '0 0 40px 0',
          fontWeight: '500'
        }}>
          {!otpSent ? "Authenticate to access your secure workspace" : "Check your email for the verification code"}
        </p>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', color: '#CBD5E1', fontSize: '13px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Corporate Email
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: isFocused ? '#60A5FA' : '#64748B', transition: 'color 0.3s ease' }}>
                  {Icons.Mail}
                </div>
                <input
                  type="email"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  style={{
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: isFocused ? '1px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '16px 16px 16px 48px',
                    color: '#F8FAFC',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: isFocused ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : 'none'
                  }}
                />
              </div>
            </div>
            
            <button 
              disabled={loading}
              type="submit"
              style={{
                background: loading ? '#475569' : 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '16px',
                padding: '16px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: loading ? 'none' : '0 10px 20px -10px rgba(37, 99, 235, 0.5)',
                marginTop: '8px'
              }}
              onMouseEnter={(e) => {
                if(!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 25px -10px rgba(37, 99, 235, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if(!loading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 20px -10px rgba(37, 99, 235, 0.5)';
                }
              }}
            >
              {loading ? "Sending Code..." : "Send Verification Code"}
              {!loading && Icons.ArrowRight}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.5s ease' }}>
            <div>
              <label style={{ display: 'block', color: '#CBD5E1', fontSize: '13px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                One-Time Password
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: isFocused ? '#10B981' : '#64748B', transition: 'color 0.3s ease' }}>
                  {Icons.Lock}
                </div>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  style={{
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: isFocused ? '1px solid #10B981' : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '16px 16px 16px 48px',
                    color: '#F8FAFC',
                    fontSize: '18px',
                    letterSpacing: '2px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: isFocused ? '0 0 0 4px rgba(16, 185, 129, 0.1)' : 'none'
                  }}
                />
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              style={{
                background: loading ? '#475569' : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '16px',
                padding: '16px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: loading ? 'none' : '0 10px 20px -10px rgba(16, 185, 129, 0.5)',
                marginTop: '8px'
              }}
              onMouseEnter={(e) => {
                if(!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 25px -10px rgba(16, 185, 129, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if(!loading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 20px -10px rgba(16, 185, 129, 0.5)';
                }
              }}
            >
              {loading ? "Verifying..." : "Verify & Secure Login"}
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button 
                type="button" 
                onClick={() => setOtpSent(false)} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#94A3B8', 
                  fontSize: '14px', 
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: '500'
                }}
              >
                Use a different email
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default OperationLogin;
