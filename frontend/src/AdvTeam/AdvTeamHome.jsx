import axios from "axios";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import API from "../API";

// --- SVG Icons ---
const Icons = {
  TotalLeads: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  Converted: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>,
  Enrollments: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>,
  Fresh: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>,
  Contact: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
  Connected: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>,
  Demo: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>,
  Won: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
  Lost: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>,
  Calendar: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  Alert: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>,
  Money: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12"></path><path d="M6 8h12"></path><path d="M6 13h8.5a4.5 4.5 0 1 0 0-9H6"></path><path d="M13 14.5L6 21"></path></svg>,
  Mic: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>,
  Phone: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
  Chart: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
  Wave: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
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
  const topRevenue = [...leaderboardData].sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  const formatTalkTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  const LeadStatCard = ({ label, count, iconObj, color, bgColor, isHuge = false }) => (
    <div style={{ 
      background: '#fff', 
      border: `1px solid rgba(226, 232, 240, 0.8)`,
      padding: isHuge ? '32px 28px' : '24px 20px',
      borderRadius: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: isHuge ? '180px' : '140px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'default'
    }} onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = `0 20px 25px -5px ${bgColor}80, 0 8px 10px -6px ${bgColor}40`;
        e.currentTarget.style.borderColor = color;
    }} onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)';
        e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)';
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: isHuge ? '16px' : '14px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</h3>
        <div style={{ 
          background: bgColor, 
          color: color, 
          padding: isHuge ? '12px' : '10px', 
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {iconObj}
        </div>
      </div>
      <p style={{ margin: '16px 0 0 0', fontSize: isHuge ? '48px' : '36px', fontWeight: '900', color: '#0F172A', lineHeight: '1', letterSpacing: '-1px' }}>{count}</p>
      {label === 'Converted' && showConfetti && isHuge && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
           <Confetti width={300} height={180} recycle={false} numberOfPieces={100} gravity={0.2} />
        </div>
      )}
    </div>
  );

  return (
    <div id="BdaPanel" style={{ padding: '40px 30px', background: '#F8FAFC', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <div className="welcome-message" style={{ marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ 
          width: '60px', height: '60px', background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', 
          borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
          boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)'
        }}>
          {Icons.Wave}
        </div>
        <div>
          <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#0F172A', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>
            Welcome back, {advTeamName}
          </h2>
          <p style={{ fontSize: '16px', color: '#64748B', margin: 0, fontWeight: '500' }}>Here's your real-time performance overview for today.</p>
        </div>
      </div>

      {/* Primary Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px', marginBottom: '56px' }}>
        <LeadStatCard label="Total Leads" count={outcomeCounts.total} iconObj={Icons.TotalLeads} color="#3B82F6" bgColor="#EFF6FF" isHuge />
        <LeadStatCard label="Converted" count={outcomeCounts.converted} iconObj={Icons.Converted} color="#10B981" bgColor="#ECFDF5" isHuge />
        <LeadStatCard label="Total Enrollments" count={advEnrollments.length} iconObj={Icons.Enrollments} color="#8B5CF6" bgColor="#F5F3FF" isHuge />
        <div style={{ 
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', 
          padding: '32px 28px', 
          borderRadius: '24px', 
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.4)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <h3 style={{ margin: 0, fontSize: '16px', color: '#94A3B8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Booked Revenue</h3>
             <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '14px', color: '#38BDF8' }}>
               {Icons.Money}
             </div>
          </div>
          <div>
            <p style={{ margin: '0', fontSize: '46px', fontWeight: '900', letterSpacing: '-1px', color: '#fff' }}>₹{bookedRevenue.toLocaleString()}</p>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#94A3B8', fontWeight: '500' }}>Generated from <span style={{ color: '#fff', fontWeight: '700' }}>{totalBooked}</span> bookings</p>
          </div>
        </div>
      </div>

      <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ width: '12px', height: '12px', background: '#3B82F6', borderRadius: '4px', display: 'inline-block' }}></span>
        Lead Pipeline Breakdown
      </h3>
      
      {/* Detailed Pipeline Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '56px' }}>
        <LeadStatCard label="Fresh Leads" count={outcomeCounts["Fresh Lead"] || 0} iconObj={Icons.Fresh} color="#64748B" bgColor="#F1F5F9" />
        <LeadStatCard label="Attempting Contact" count={outcomeCounts["Attempting Contact"] || 0} iconObj={Icons.Contact} color="#F59E0B" bgColor="#FFFBEB" />
        <LeadStatCard label="First Call Connected" count={outcomeCounts["First Call Connected"] || 0} iconObj={Icons.Connected} color="#3B82F6" bgColor="#EFF6FF" />
        <LeadStatCard label="Demo Conducted" count={outcomeCounts["Demo Conducted"] || 0} iconObj={Icons.Demo} color="#8B5CF6" bgColor="#F5F3FF" />
        <LeadStatCard label="Closed Won" count={outcomeCounts["Closed Won"] || 0} iconObj={Icons.Won} color="#10B981" bgColor="#ECFDF5" />
        <LeadStatCard label="Closed Lost" count={outcomeCounts["Closed Lost"] || 0} iconObj={Icons.Lost} color="#EF4444" bgColor="#FEF2F2" />
      </div>

      {/* Funnel Visualization */}
      <div style={{ background: '#fff', padding: '40px', borderRadius: '32px', border: '1px solid rgba(226, 232, 240, 0.8)', marginBottom: '56px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
            <div style={{ background: '#F5F3FF', color: '#8B5CF6', padding: '10px', borderRadius: '12px' }}>{Icons.Chart}</div>
            <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#0F172A', margin: 0 }}>Conversion Funnel Efficiency</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                  { label: "Fresh Leads", count: outcomeCounts["Fresh Lead"] || 0, color: "#64748B" },
                  { label: "Attempting Contact", count: outcomeCounts["Attempting Contact"] || 0, color: "#F59E0B" },
                  { label: "First Call Connected", count: outcomeCounts["First Call Connected"] || 0, color: "#3B82F6" },
                  { label: "Demo Conducted", count: outcomeCounts["Demo Conducted"] || 0, color: "#8B5CF6" },
                  { label: "Closed Won", count: outcomeCounts["Closed Won"] || 0, color: "#10B981" }
              ].map((stage, idx, arr) => {
                  const total = outcomeCounts.total || 1;
                  const percentage = ((stage.count / total) * 100).toFixed(1);
                  const width = `${Math.max(percentage, 10)}%`;
                  
                  return (
                      <div key={stage.label} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                          <div style={{ width: '200px', fontSize: '15px', fontWeight: '700', color: '#475569' }}>{stage.label}</div>
                          <div style={{ flex: 1, height: '40px', background: '#F1F5F9', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
                              <div style={{ 
                                  width: width, 
                                  height: '100%', 
                                  background: `linear-gradient(90deg, ${stage.color}DD, ${stage.color})`,
                                  transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '16px',
                                  color: '#fff',
                                  fontSize: '13px',
                                  fontWeight: '800',
                                  boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.1)'
                              }}>
                                  {stage.count} <span style={{ opacity: 0.8, marginLeft: '6px', fontWeight: '600' }}>({percentage}%)</span>
                              </div>
                          </div>
                      </div>
                  );
              })}
          </div>
      </div>

      <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ width: '12px', height: '12px', background: '#8B5CF6', borderRadius: '4px', display: 'inline-block' }}></span>
        Enrollment & Revenue Intel
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', marginBottom: '40px' }}>
        {[
          { label: "Booked Payments", count: totalBooked, info: "Initial booking payments received", color: "#F59E0B", iconObj: Icons.Calendar, bg: "#FFFBEB" },
          { label: "Full Paid", count: totalFullPaid, info: "Completed 100% tuition fees", color: "#10B981", iconObj: Icons.Check, bg: "#ECFDF5" },
          { label: "Default Status", count: totalDefault, info: "Missed payment deadlines", color: "#EF4444", iconObj: Icons.Alert, bg: "#FEF2F2" },
        ].map(stat => (
          <div key={stat.label} style={{ background: '#fff', borderRadius: '24px', padding: '32px 28px', border: `1px solid ${stat.bg}`, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.02)', display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
            <div style={{ background: stat.bg, color: stat.color, padding: '16px', borderRadius: '16px' }}>
              {stat.iconObj}
            </div>
            <div>
              <p style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>{stat.label}</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '36px', fontWeight: '900', color: '#0F172A', letterSpacing: '-1px' }}>{stat.count}</p>
              <p style={{ margin: 0, fontSize: '14px', color: '#94A3B8', fontWeight: '500' }}>{stat.info}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '28px', marginBottom: '56px' }}>
        {[
          { label: "Total Revenue", amount: totalRevenue, color: "#1E293B", bg: "#F8FAFC" },
          { label: "Booked Revenue", amount: bookedRevenue, color: "#3B82F6", bg: "#EFF6FF" },
          { label: "Credited Revenue", amount: creditedRevenue, color: "#10B981", bg: "#ECFDF5" },
          { label: "Pending Revenue", amount: pendingRevenue, color: "#EF4444", bg: "#FEF2F2" },
        ].map(rev => (
          <div key={rev.label} style={{ background: '#fff', border: `1px solid rgba(226, 232, 240, 0.8)`, borderRadius: '20px', padding: '28px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '100%', background: rev.color }}></div>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>{rev.label}</h3>
            <p style={{ margin: 0, color: rev.color, fontSize: '32px', fontWeight: '900', letterSpacing: '-1px' }}>₹{rev.amount.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Mini Leaderboard Widget */}
      <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', marginTop: '48px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ width: '12px', height: '12px', background: '#F59E0B', borderRadius: '4px', display: 'inline-block' }}></span>
        Today's Top Performers
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
        {/* Top Revenue */}
        <div style={{ background: '#fff', padding: '28px', borderRadius: '24px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.02)' }}>
          <h4 style={{ color: '#0F172A', margin: '0 0 24px 0', fontSize: '18px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#EFF6FF', color: '#3B82F6', padding: '10px', borderRadius: '12px' }}>{Icons.Money}</div> Top Revenue
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {topRevenue.length > 0 && topRevenue[0].revenue > 0 ? (
              topRevenue.filter(u => u.revenue > 0).map((user, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: idx === 0 ? '#EFF6FF' : '#F8FAFC', borderRadius: '16px', border: idx === 0 ? '1px solid #BFDBFE' : '1px solid transparent' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: idx === 0 ? '#3B82F6' : '#E2E8F0', color: idx === 0 ? '#fff' : '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px' }}>
                      {idx + 1}
                    </div>
                    <span style={{ fontWeight: '700', color: '#1E293B', fontSize: '16px' }}>{user.name.split(' ')[0]}</span>
                  </div>
                  <span style={{ fontWeight: '800', color: '#3B82F6', fontSize: '16px' }}>₹{user.revenue.toLocaleString()}</span>
                </div>
              ))
            ) : (
              <div style={{ color: '#94A3B8', textAlign: 'center', padding: '30px 10px', fontWeight: '500' }}>No revenue generated yet today</div>
            )}
          </div>
        </div>

        {/* Top Callers */}
        <div style={{ background: '#fff', padding: '28px', borderRadius: '24px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.02)' }}>
          <h4 style={{ color: '#0F172A', margin: '0 0 24px 0', fontSize: '18px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#FEF2F2', color: '#EF4444', padding: '10px', borderRadius: '12px' }}>{Icons.Phone}</div> Top Callers
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {topCallers.length > 0 && topCallers[0].callCount > 0 ? (
              topCallers.filter(u => u.callCount > 0).map((user, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: idx === 0 ? '#FEF2F2' : '#F8FAFC', borderRadius: '16px', border: idx === 0 ? '1px solid #FECACA' : '1px solid transparent' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: idx === 0 ? '#EF4444' : '#E2E8F0', color: idx === 0 ? '#fff' : '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px' }}>
                      {idx + 1}
                    </div>
                    <span style={{ fontWeight: '700', color: '#1E293B', fontSize: '16px' }}>{user.name.split(' ')[0]}</span>
                  </div>
                  <span style={{ fontWeight: '800', color: '#EF4444', fontSize: '16px' }}>{user.callCount} calls</span>
                </div>
              ))
            ) : (
              <div style={{ color: '#94A3B8', textAlign: 'center', padding: '30px 10px', fontWeight: '500' }}>No calls made yet today</div>
            )}
          </div>
        </div>

        {/* Top Talk Time */}
        <div style={{ background: '#fff', padding: '28px', borderRadius: '24px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.02)' }}>
          <h4 style={{ color: '#0F172A', margin: '0 0 24px 0', fontSize: '18px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#ECFDF5', color: '#10B981', padding: '10px', borderRadius: '12px' }}>{Icons.Mic}</div> Top Talk Time
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {topSpeakers.length > 0 && topSpeakers[0].talkTime > 0 ? (
              topSpeakers.filter(u => u.talkTime > 0).map((user, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: idx === 0 ? '#ECFDF5' : '#F8FAFC', borderRadius: '16px', border: idx === 0 ? '1px solid #A7F3D0' : '1px solid transparent' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: idx === 0 ? '#10B981' : '#E2E8F0', color: idx === 0 ? '#fff' : '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px' }}>
                      {idx + 1}
                    </div>
                    <span style={{ fontWeight: '700', color: '#1E293B', fontSize: '16px' }}>{user.name.split(' ')[0]}</span>
                  </div>
                  <span style={{ fontWeight: '800', color: '#10B981', fontSize: '16px' }}>{formatTalkTime(user.talkTime)}</span>
                </div>
              ))
            ) : (
              <div style={{ color: '#94A3B8', textAlign: 'center', padding: '30px 10px', fontWeight: '500' }}>No talk time logged yet today</div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdvTeamHome;
