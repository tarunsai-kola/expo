import axios from "axios";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import API from "../API";

// --- Premium SVG Icons ---
const Icons = {
  TotalLeads: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  Converted: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>,
  Enrollments: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>,
  Fresh: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>,
  Contact: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
  Connected: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>,
  Demo: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>,
  Won: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
  Lost: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>,
  Calendar: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  Alert: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
  Money: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12"></path><path d="M6 8h12"></path><path d="M6 13h8.5a4.5 4.5 0 1 0 0-9H6"></path><path d="M13 14.5L6 21"></path></svg>,
  Mic: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>,
  Phone: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
  Chart: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
  Wave: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
};

const AdvTeamHome = () => {
  const [advEnrollments, setAdvEnrollments] = useState([]);
  const [advTeamMember, setAdvTeamMember] = useState([]);
  const [outcomeCounts, setOutcomeCounts] = useState({
    fresh: 0, interested: 0, follow_up: 0, callback_requested: 0,
    no_answer: 0, not_interested: 0, junk: 0, converted: 0, qualified: 0, total: 0
  });
  
  const advTeamName = localStorage.getItem("advTeamName");
  const userId = localStorage.getItem("advTeamId");
  const designation = localStorage.getItem("advTeamDesignation") || "";
  const isLeader = designation.toLowerCase().includes("leader");
  const isSpecialist = designation.toLowerCase().includes("specialist") || designation.toLowerCase().includes("sales") || designation.toLowerCase().includes("inside_sales");
  const apiRole = isSpecialist ? "SR Inside Sales Specialist" : isLeader ? "ADV Leader" : "ADV Manager";

  const today = new Date();
  const [leaderboardData, setLeaderboardData] = useState([]);

  const fetchDailyLeaderboard = async () => {
    try {
      const response = await axios.get(`${API}/api/adv-reports/adv-leaderboard`, {
        params: { date: today.toISOString().split('T')[0] }
      });
      setLeaderboardData(response.data);
    } catch (error) {
      console.error("Error fetching daily leaderboard:", error);
    }
  };

  const fetchOutcomeCounts = async () => {
    try {
      if (!userId) return;
      const res = await axios.get(`${API}/api/adv-leads/get-outcome-counts`, {
        params: { role: apiRole, userId, strictlyOwned: true }
      });
      if (res.data) {
        setOutcomeCounts(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch outcome counts", err);
    }
  };

  const fetchAdvEnrollments = async () => {
    try {
      const response = await axios.get(`${API}/getadvenrolls`);
      const enrollments = response.data.data || response.data;
      setAdvEnrollments(
        enrollments.filter(
          (item) => item.counselor && item.counselor === advTeamName
        )
      );
    } catch (error) {
      console.error("There was an error fetching advance enrollments:", error);
    }
  };

  const fetchAdvTeamMember = async () => {
    try {
      const response = await axios.get(`${API}/getadvteam`);
      setAdvTeamMember(response.data.filter((item) => item.fullname === advTeamName));
    } catch (error) {
      console.error("There was an error fetching advance team member:", error);
    }
  };

  useEffect(() => {
    fetchAdvTeamMember();
    fetchAdvEnrollments();
    fetchOutcomeCounts();
    fetchDailyLeaderboard();
  }, []);

  const totalRevenue = advEnrollments.reduce((acc, student) => acc + (student.programPrice || 0), 0);
  const bookedRevenue = advEnrollments.reduce((acc, student) => acc + (student.paidAmount || 0), 0);
  
  const creditedRevenue = advEnrollments.reduce((acc, student) => {
    const lastRemark = Array.isArray(student.remark) && student.remark.length > 0
      ? student.remark[student.remark.length - 1]
      : null;
    if (student.status === "fullPaid" || lastRemark === "Half_Cleared") {
      return acc + (student.paidAmount || 0);
    }
    return acc;
  }, 0);

  const pendingRevenue = totalRevenue - creditedRevenue;
  const totalBooked = advEnrollments.filter((s) => s.status === "booked").length;
  const totalFullPaid = advEnrollments.filter((s) => s.status === "fullPaid").length;
  const totalDefault = advEnrollments.filter((s) => s.status === "default").length;

  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    if (outcomeCounts.converted > 0) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [outcomeCounts.converted]);

  const topCallers = [...leaderboardData].sort((a, b) => b.callCount - a.callCount).slice(0, 5);
  const topSpeakers = [...leaderboardData].sort((a, b) => b.talkTime - a.talkTime).slice(0, 5);
  const topRevenueData = [...leaderboardData].sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  const formatTalkTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  const LeadStatCard = ({ label, count, iconObj, theme, isHuge = false }) => {
    const themes = {
      blue: { bg: 'bg-blue-50/50 hover:bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-100', border: 'border-blue-100/50 hover:border-blue-200' },
      emerald: { bg: 'bg-emerald-50/50 hover:bg-emerald-50', text: 'text-emerald-600', iconBg: 'bg-emerald-100', border: 'border-emerald-100/50 hover:border-emerald-200' },
      purple: { bg: 'bg-purple-50/50 hover:bg-purple-50', text: 'text-purple-600', iconBg: 'bg-purple-100', border: 'border-purple-100/50 hover:border-purple-200' },
      amber: { bg: 'bg-amber-50/50 hover:bg-amber-50', text: 'text-amber-600', iconBg: 'bg-amber-100', border: 'border-amber-100/50 hover:border-amber-200' },
      rose: { bg: 'bg-rose-50/50 hover:bg-rose-50', text: 'text-rose-600', iconBg: 'bg-rose-100', border: 'border-rose-100/50 hover:border-rose-200' },
      slate: { bg: 'bg-slate-50/50 hover:bg-slate-50', text: 'text-slate-600', iconBg: 'bg-slate-200', border: 'border-slate-100 hover:border-slate-300' }
    };
    
    const t = themes[theme] || themes.slate;

    return (
      <div className={`relative overflow-hidden flex flex-col justify-between ${isHuge ? 'p-8 min-h-[160px]' : 'p-6 min-h-[140px]'} bg-white rounded-3xl border ${t.border} shadow-sm hover:shadow-md transition-all duration-300 group`}>
        <div className="flex justify-between items-center z-10">
          <h3 className={`font-semibold tracking-wide uppercase text-slate-500 ${isHuge ? 'text-sm' : 'text-xs'}`}>{label}</h3>
          <div className={`p-3 rounded-2xl ${t.iconBg} ${t.text} group-hover:scale-110 transition-transform duration-300`}>
            {iconObj}
          </div>
        </div>
        <p className={`font-black text-slate-800 tracking-tight z-10 ${isHuge ? 'text-5xl mt-6' : 'text-3xl mt-4'}`}>{count}</p>
        
        {/* Decorative background element */}
        <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${t.iconBg}`}></div>
        
        {label === 'Converted' && showConfetti && isHuge && (
          <div className="absolute inset-0 pointer-events-none z-20">
             <Confetti width={300} height={180} recycle={false} numberOfPieces={100} gravity={0.2} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans ml-[280px] mt-[70px] p-8 md:p-10 lg:p-12 overflow-x-hidden">
      
      {/* Welcome Header */}
      <div className="flex items-center gap-6 mb-12 animate-[fadeIn_0.5s_ease-out]">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 flex items-center justify-center text-white shrink-0 ring-4 ring-indigo-50">
          {Icons.Wave}
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{advTeamName}</span>
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base">Here's your real-time performance and pipeline overview for today.</p>
        </div>
      </div>

      {/* Primary Highlights Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12 animate-[fadeIn_0.6s_ease-out]">
        <LeadStatCard label="Total Leads" count={outcomeCounts.total} iconObj={Icons.TotalLeads} theme="blue" isHuge />
        <LeadStatCard label="Converted" count={outcomeCounts.converted} iconObj={Icons.Converted} theme="emerald" isHuge />
        <LeadStatCard label="Enrollments" count={advEnrollments.length} iconObj={Icons.Enrollments} theme="purple" isHuge />
        
        <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-8 flex flex-col justify-between shadow-xl shadow-slate-900/10 group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="flex justify-between items-center relative z-10">
             <h3 className="text-sm font-bold tracking-wide uppercase text-slate-400">Booked Revenue</h3>
             <div className="p-3 rounded-2xl bg-white/10 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
               {Icons.Money}
             </div>
          </div>
          <div className="relative z-10 mt-6">
            <p className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2">₹{bookedRevenue.toLocaleString()}</p>
            <p className="text-sm font-medium text-slate-400">Generated from <span className="text-white font-bold">{totalBooked}</span> bookings</p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">Lead Pipeline Breakdown</h3>
      </div>
      
      {/* Detailed Pipeline Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-12">
        <LeadStatCard label="Fresh Leads" count={outcomeCounts["Fresh Lead"] || 0} iconObj={Icons.Fresh} theme="slate" />
        <LeadStatCard label="Attempting Contact" count={outcomeCounts["Attempting Contact"] || 0} iconObj={Icons.Contact} theme="amber" />
        <LeadStatCard label="First Connected" count={outcomeCounts["First Call Connected"] || 0} iconObj={Icons.Connected} theme="blue" />
        <LeadStatCard label="Demo Conducted" count={outcomeCounts["Demo Conducted"] || 0} iconObj={Icons.Demo} theme="purple" />
        <LeadStatCard label="Closed Won" count={outcomeCounts["Closed Won"] || 0} iconObj={Icons.Won} theme="emerald" />
        <LeadStatCard label="Closed Lost" count={outcomeCounts["Closed Lost"] || 0} iconObj={Icons.Lost} theme="rose" />
      </div>

      {/* Funnel Visualization */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-purple-50 text-purple-600 p-3 rounded-2xl">{Icons.Chart}</div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Conversion Funnel Efficiency</h3>
          </div>
          
          <div className="flex flex-col gap-5 max-w-4xl">
              {[
                  { label: "Fresh Leads", count: outcomeCounts["Fresh Lead"] || 0, color: "bg-slate-500" },
                  { label: "Attempting Contact", count: outcomeCounts["Attempting Contact"] || 0, color: "bg-amber-500" },
                  { label: "First Call Connected", count: outcomeCounts["First Call Connected"] || 0, color: "bg-blue-500" },
                  { label: "Demo Conducted", count: outcomeCounts["Demo Conducted"] || 0, color: "bg-purple-500" },
                  { label: "Closed Won", count: outcomeCounts["Closed Won"] || 0, color: "bg-emerald-500" }
              ].map((stage, idx) => {
                  const total = outcomeCounts.total || 1;
                  const percentage = ((stage.count / total) * 100).toFixed(1);
                  const width = `${Math.max(percentage, 8)}%`;
                  
                  return (
                      <div key={stage.label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 group">
                          <div className="w-48 text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">{stage.label}</div>
                          <div className="flex-1 h-10 bg-slate-50 rounded-2xl overflow-hidden relative border border-slate-100/50">
                              <div 
                                className={`h-full flex items-center px-4 text-xs font-bold text-white shadow-inner transition-all duration-1000 ease-out ${stage.color}`}
                                style={{ width: width }}
                              >
                                  {stage.count} <span className="opacity-80 ml-2 font-medium">({percentage}%)</span>
                              </div>
                          </div>
                      </div>
                  );
              })}
          </div>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">Enrollment & Revenue Intel</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Booked Payments", count: totalBooked, info: "Initial booking payments", iconText: "text-amber-600", iconBg: "bg-amber-100", iconObj: Icons.Calendar, border: "border-amber-100" },
          { label: "Full Paid", count: totalFullPaid, info: "Completed 100% fees", iconText: "text-emerald-600", iconBg: "bg-emerald-100", iconObj: Icons.Won, border: "border-emerald-100" },
          { label: "Default Status", count: totalDefault, info: "Missed payment deadlines", iconText: "text-rose-600", iconBg: "bg-rose-100", iconObj: Icons.Alert, border: "border-rose-100" },
        ].map(stat => (
          <div key={stat.label} className={`bg-white rounded-3xl p-6 border ${stat.border} shadow-sm flex items-start gap-5 hover:shadow-md transition-shadow`}>
            <div className={`p-4 rounded-2xl ${stat.iconBg} ${stat.iconText} shrink-0`}>
              {stat.iconObj}
            </div>
            <div>
              <p className="text-xs font-bold tracking-wide text-slate-500 uppercase mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-800 tracking-tight mb-1">{stat.count}</p>
              <p className="text-sm font-medium text-slate-400">{stat.info}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Total Revenue", amount: totalRevenue, color: "bg-slate-800", text: "text-slate-800" },
          { label: "Booked Revenue", amount: bookedRevenue, color: "bg-blue-500", text: "text-blue-600" },
          { label: "Credited Revenue", amount: creditedRevenue, color: "bg-emerald-500", text: "text-emerald-600" },
          { label: "Pending Revenue", amount: pendingRevenue, color: "bg-rose-500", text: "text-rose-600" },
        ].map(rev => (
          <div key={rev.label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group hover:border-slate-200 transition-colors">
            <div className={`absolute left-0 top-0 w-1.5 h-full ${rev.color} opacity-70 group-hover:opacity-100 transition-opacity`}></div>
            <h3 className="text-xs font-bold tracking-wide uppercase text-slate-500 mb-3">{rev.label}</h3>
            <p className={`text-2xl lg:text-3xl font-black tracking-tight ${rev.text}`}>₹{rev.amount.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Mini Leaderboard Widget */}
      <div className="mb-6 flex items-center gap-3 mt-12">
        <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">Today's Top Performers</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h4 className="flex items-center gap-3 text-base font-bold text-slate-800 mb-6">
            <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl">{Icons.Money}</div> Top Revenue
          </h4>
          <div className="flex flex-col gap-3">
            {topRevenueData.length > 0 && topRevenueData[0].revenue > 0 ? (
              topRevenueData.filter(u => u.revenue > 0).map((user, idx) => (
                <div key={idx} className={`flex justify-between items-center p-3 rounded-2xl ${idx === 0 ? 'bg-blue-50/50 border border-blue-100' : 'hover:bg-slate-50 border border-transparent'} transition-colors`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-blue-500 text-white shadow-sm shadow-blue-500/30' : 'bg-slate-100 text-slate-500'}`}>
                      {idx + 1}
                    </div>
                    <span className="font-semibold text-slate-700 text-sm">{user.name.split(' ')[0]}</span>
                  </div>
                  <span className="font-bold text-blue-600 text-sm">₹{user.revenue.toLocaleString()}</span>
                </div>
              ))
            ) : (
              <div className="text-slate-400 text-center py-8 text-sm font-medium">No revenue generated yet today</div>
            )}
          </div>
        </div>

        {/* Top Callers */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h4 className="flex items-center gap-3 text-base font-bold text-slate-800 mb-6">
            <div className="bg-rose-50 text-rose-600 p-2.5 rounded-xl">{Icons.Phone}</div> Top Callers
          </h4>
          <div className="flex flex-col gap-3">
            {topCallers.length > 0 && topCallers[0].callCount > 0 ? (
              topCallers.filter(u => u.callCount > 0).map((user, idx) => (
                <div key={idx} className={`flex justify-between items-center p-3 rounded-2xl ${idx === 0 ? 'bg-rose-50/50 border border-rose-100' : 'hover:bg-slate-50 border border-transparent'} transition-colors`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30' : 'bg-slate-100 text-slate-500'}`}>
                      {idx + 1}
                    </div>
                    <span className="font-semibold text-slate-700 text-sm">{user.name.split(' ')[0]}</span>
                  </div>
                  <span className="font-bold text-rose-600 text-sm">{user.callCount} calls</span>
                </div>
              ))
            ) : (
              <div className="text-slate-400 text-center py-8 text-sm font-medium">No calls made yet today</div>
            )}
          </div>
        </div>

        {/* Top Talk Time */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h4 className="flex items-center gap-3 text-base font-bold text-slate-800 mb-6">
            <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl">{Icons.Mic}</div> Top Talk Time
          </h4>
          <div className="flex flex-col gap-3">
            {topSpeakers.length > 0 && topSpeakers[0].talkTime > 0 ? (
              topSpeakers.filter(u => u.talkTime > 0).map((user, idx) => (
                <div key={idx} className={`flex justify-between items-center p-3 rounded-2xl ${idx === 0 ? 'bg-emerald-50/50 border border-emerald-100' : 'hover:bg-slate-50 border border-transparent'} transition-colors`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30' : 'bg-slate-100 text-slate-500'}`}>
                      {idx + 1}
                    </div>
                    <span className="font-semibold text-slate-700 text-sm">{user.name.split(' ')[0]}</span>
                  </div>
                  <span className="font-bold text-emerald-600 text-sm">{formatTalkTime(user.talkTime)}</span>
                </div>
              ))
            ) : (
              <div className="text-slate-400 text-center py-8 text-sm font-medium">No talk time logged yet today</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdvTeamHome;
