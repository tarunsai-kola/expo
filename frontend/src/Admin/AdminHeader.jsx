import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import API from "../API";
import logo from "../assets/LOGO3.png";
import toast, { Toaster } from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post(`${API}/admin/logout`, {}, { withCredentials: true });
      toast.success("Logout successful!!!");
      setTimeout(() => {
        localStorage.removeItem("adminToken");
        navigate("/AdminLogin");
      }, 2000);
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("adminToken");
      navigate("/AdminLogin");
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? "bg-blue-600/20 text-blue-400 border-blue-500/30" : "text-gray-400 hover:bg-white/5 hover:text-gray-200 border-transparent";
  };

  return (
    <div className="z-[1000] fixed top-0 left-0 w-full h-[70px] bg-[#05050A]/80 backdrop-blur-md border-b border-white/10 flex items-center px-6 justify-between">
      <Toaster position="top-center" reverseOrder={false} toastOptions={{
        style: { background: '#1e1e2d', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      }} />
      
      {/* Top Navbar */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <img src={logo} alt="Atorax Logo" className="h-10 object-contain" />
        </Link>
        <span className="text-white/50 text-sm font-bold tracking-widest uppercase border-l border-white/10 pl-4 ml-2">Admin Portal</span>
      </div>

      <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl transition-all font-bold text-sm">
        <FaSignOutAlt /> Logout
      </button>

      {/* Sidebar */}
      <div className="fixed top-[70px] left-0 w-[265px] h-[calc(100vh-70px)] bg-[#0A0A0F]/95 backdrop-blur-2xl border-r border-white/5 overflow-y-auto custom-scrollbar pb-10">
        
        {/* Ambient Glow inside Sidebar */}
        <div className="absolute top-0 left-0 w-full h-32 bg-blue-600/10 blur-[50px] pointer-events-none"></div>

        <div className="flex flex-col p-4 gap-1 relative z-10">
          
          <Link to="/AdminDashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all border text-sm font-bold ${isActive('/AdminDashboard')}`}>
            <i className="fa fa-home w-5 text-center text-blue-500"></i> Home
          </Link>
          
          <div className="mt-6 mb-2">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-4">CRM Governance</h3>
          </div>
          
          <Link to="/AdvAdminDashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all border text-sm font-semibold ${isActive('/AdvAdminDashboard')}`}>
            <i className="fa fa-dashboard w-5 text-center text-blue-400"></i> Admin Dashboard
          </Link>
          <Link to="/Admin/CallLogs" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all border text-sm font-semibold ${isActive('/Admin/CallLogs')}`}>
            <i className="fa fa-phone w-5 text-center text-indigo-400"></i> Call Activity Logs
          </Link>
          <Link to="/Admin/LiveMonitor" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all border text-sm font-semibold justify-between ${isActive('/Admin/LiveMonitor')}`}>
            <div className="flex items-center gap-3">
              <i className="fa fa-heartbeat w-5 text-center text-emerald-400"></i> Live Monitoring
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
          </Link>
          <Link to="/Admin/Reports" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all border text-sm font-semibold ${isActive('/Admin/Reports')}`}>
            <i className="fa fa-file-excel-o w-5 text-center text-blue-400"></i> System Reports
          </Link>

          <div className="mt-6 mb-2">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-4">Course Management</h3>
          </div>

          {[
            { to: "/AddAdvCourse", icon: "fa-plus-circle", text: "Create Course", color: "text-blue-400" },
            { to: "/AddAdvModule", icon: "fa-list", text: "Course List", color: "text-blue-400" },
            { to: "/AdvExercisePage", icon: "fa-code", text: "Exercise Builder", color: "text-indigo-400" },
            { to: "/CreateAdvOperation", icon: "fa-briefcase", text: "Create Operation", color: "text-blue-400" },
            { to: "/CreateAdvTeam", icon: "fa-users", text: "Create Team", color: "text-purple-400" },
            { to: "/AdvOnBoardingDetails", icon: "fa-graduation-cap", text: "Onboarding", color: "text-emerald-400" },
            { to: "/AdvBooked", icon: "fa-bookmark", text: "Booked", color: "text-blue-400" },
            { to: "/AdvFullPaid", icon: "fa-check-square", text: "FullPaid", color: "text-emerald-400" },
            { to: "/AdvDefault", icon: "fa-times-circle", text: "Default", color: "text-red-400" },
            { to: "/AdvanceQueries", icon: "fa-question-circle", text: "Course Queries", color: "text-yellow-400" },
            { to: "/AdvLeadManagement", icon: "fa-users", text: "Lead Mgmt", color: "text-purple-400" },
            { to: "/AdvFormLeads", icon: "fa-wpforms", text: "Form Leads", color: "text-blue-400" },
            { to: "/AdvTeamDetail", icon: "fa-users", text: "Team Details", color: "text-purple-400" },
            { to: "/AdvUserManagement", icon: "fa-users-cog", text: "User Mgmt", color: "text-indigo-400" },
            { to: "/AdminAnalytics", icon: "fa-area-chart", text: "Analytics", color: "text-emerald-400" },
            { to: "/BulkImport", icon: "fa-upload", text: "Bulk Import Leads", color: "text-blue-400" },
            { to: "/AdvRevenueSheet", icon: "fa-line-chart", text: "Revenue Sheet", color: "text-emerald-400" },
            { to: "/AdvProjectPage", icon: "fa-tasks", text: "Project Mgmt", color: "text-indigo-400" },
            { to: "/CreateInterview", icon: "fa-calendar-plus-o", text: "Create Mock Interview", color: "text-blue-400" },
            { to: "/MasterClasses", icon: "fa-graduation-cap", text: "Master Class", color: "text-purple-400" },
            { to: "/admin-career-assessment", icon: "fa-address-card", text: "Career Assessments", color: "text-emerald-400" },
            { to: "/Admin/Attendance", icon: "fa-calendar", text: "Attendance", color: "text-blue-400" },
          ].map((item, index) => (
            <Link key={index} to={item.to} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all border text-sm font-semibold group ${isActive(item.to)}`}>
              <i className={`fa ${item.icon} w-5 text-center ${item.color} group-hover:scale-110 transition-transform`}></i> 
              <span className="truncate">{item.text}</span>
            </Link>
          ))}
          
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
};

export default AdminHeader;
