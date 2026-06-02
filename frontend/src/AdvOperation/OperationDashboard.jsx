import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
} from "chart.js";

ChartJS.register(
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

// --- Premium SVG Icons ---
const Icons = {
  Booked: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  Paid: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>,
  Default: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>,
  Rupee: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12"></path><path d="M6 8h12"></path><path d="M6 13h8"></path><path d="M14 13l-8 8"></path><path d="M14 3a5 5 0 0 1 0 10"></path></svg>,
  Target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
};

const OperationDashboard = () => {
  const [operationData, setOperationData] = useState([]);
  const [newStudent, setNewStudent] = useState([]);
  const [operation, setOperation] = useState([]);
  const today = new Date();
  const currentMonthWithDate = today.toISOString().slice(0, 7);
  const operationName = localStorage.getItem("advOperationName");

  const fetchOperationData = async () => {
    const operationId = localStorage.getItem("advOperationId");
    const operationName = localStorage.getItem("advOperationName");
    try {
      const response = await axios.get(`${API}/getadvenrolls?all=true`, {
        params: { operationId },
      });
      setOperationData(
        response.data.filter((data) => data.operationName === operationName)
      );
    } catch (err) {
      console.log("Failed to fetch user data");
    }
  };

  const fetchOperation = async () => {
    try {
      const response = await axios.get(`${API}/getadvoperation`);
      setOperation(response.data.filter((item) => item.fullname === operationName));
    } catch (error) {
      console.error("There was an error fetching bda:", error);
    }
  };

  const fetchNewStudent = async () => {
    try {
      const response = await axios.get(`${API}/getadvenrolls?all=true`);
      setNewStudent(
        response.data.filter(
          (item) => item.counselor && item.operationName === operationName
        )
      );
    } catch (error) {
      console.error("There was an error fetching new student:", error);
    }
  };

  useEffect(() => {
    fetchOperationData();
    fetchOperation();
    fetchNewStudent();
  }, []);

  const bookedCount = operationData.filter((item) => item.status === "booked").length;
  const fullPaidCount = operationData.filter((item) => item.status === "fullPaid").length;
  const defaultCount = operationData.filter((item) => item.status === "default").length;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const currentMonthData = operationData.filter((student) => {
    const createdAt = new Date(student.createdAt);
    return createdAt.getMonth() === currentMonth && createdAt.getFullYear() === currentYear;
  });

  const totalRevenue = currentMonthData.reduce(
    (acc, student) => acc + (student.programPrice || 0),
    0
  );

  const bookedRevenue = currentMonthData.reduce(
    (acc, student) => acc + (student.paidAmount || 0),
    0
  );

  const creditedRevenue = currentMonthData.reduce((acc, student) => {
    const lastRemark = Array.isArray(student.remark) && student.remark.length > 0
      ? student.remark[student.remark.length - 1]
      : null;

    if (
      student.status === "fullPaid" ||
      lastRemark === "Half_Cleared"
    ) {
      return acc + (student.paidAmount || 0);
    }

    return acc;
  }, 0);

  const pendingRevenue = totalRevenue - creditedRevenue;

  const revenueByMonth = operationData.reduce((acc, student) => {
    const month = new Date(student.createdAt).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    if (!acc[month]) {
      acc[month] = { totalRevenue: 0 };
    }
    if (student.status === "booked" || student.status === "default") {
      acc[month].totalRevenue += student.paidAmount || 0;
    } else if (student.status === "fullPaid") {
      acc[month].totalRevenue += student.programPrice || 0;
    }
    return acc;
  }, {});

  const sortedMonths = Object.keys(revenueByMonth).sort(
    (a, b) => new Date(`1 ${a}`) - new Date(`1 ${b}`)
  );
  const lastTwoMonths = sortedMonths.slice(-2);
  const revenueData = lastTwoMonths.map((month) => ({
    month,
    revenue: revenueByMonth[month]?.totalRevenue || 0,
  }));

  const lineChartData = {
    labels: revenueData.map((data) => data.month),
    datasets: [
      {
        label: "Revenue Growth (₹)",
        data: revenueData.map((data) => data.revenue),
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.15)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: "#10B981",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#10B981",
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#F8FAFC', font: { family: "'Inter', sans-serif", size: 14 } }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#F8FAFC',
        bodyColor: '#10B981',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `₹ ${context.parsed.y.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94A3B8', font: { family: "'Inter', sans-serif" } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: {
          color: '#94A3B8',
          font: { family: "'Inter', sans-serif" },
          callback: (value) => `₹${value >= 1000 ? (value / 1000) + 'k' : value}`
        }
      }
    }
  };

  return (
    <div style={{
      background: '#0F172A',
      minHeight: '100vh',
      padding: '90px 30px 40px',
      fontFamily: "'Inter', sans-serif",
      color: '#F8FAFC',
      marginLeft: '260px',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Header */}
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{
            margin: '0 0 8px 0',
            fontSize: '32px',
            fontWeight: '800',
            background: 'linear-gradient(90deg, #F8FAFC, #94A3B8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            ADV Operation Dashboard
          </h1>
          <p style={{ margin: 0, color: '#94A3B8', fontSize: '15px' }}>
            Overview of your enrollment targets and revenue performance.
          </p>
        </header>

        {/* Top KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>

          {/* Booked */}
          <KpiCard
            icon={Icons.Booked}
            label="Total Booked"
            value={bookedCount}
            accentColor="#F59E0B"
          />

          {/* Full Paid */}
          <KpiCard
            icon={Icons.Paid}
            label="Full Paid"
            value={fullPaidCount}
            accentColor="#10B981"
          />

          {/* Default */}
          <KpiCard
            icon={Icons.Default}
            label="Defaulted"
            value={defaultCount}
            accentColor="#EF4444"
          />
        </div>

        {/* Lower Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>

          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Revenue Details */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', padding: '10px', borderRadius: '12px' }}>
                  {Icons.Rupee}
                </div>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>
                  Revenue Details{' '}
                  <span style={{ color: '#94A3B8', fontSize: '14px', fontWeight: '500' }}>(This Month)</span>
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <RevenueRow label="Total Revenue" value={totalRevenue} color="#F8FAFC" />
                <RevenueRow label="Credited Revenue" value={creditedRevenue} color="#10B981" />
                <RevenueRow label="Pending Revenue" value={pendingRevenue} color="#F59E0B" isLast />
              </div>
            </div>

            {/* Target */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8B5CF6', padding: '10px', borderRadius: '12px' }}>
                  {Icons.Target}
                </div>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Your Target</h2>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.5)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.02)' }}>
                {operation.length > 0 ? operation.map((item, index) => {
                  if (item.target && item.target.length > 0) {
                    const lastTarget = item.target[item.target.length - 1];
                    if (lastTarget.currentMonth === currentMonthWithDate && lastTarget.percentage) {
                      return (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ background: 'rgba(139,92,246,0.1)', color: '#8B5CF6', padding: '12px', borderRadius: '50%' }}>
                            {Icons.Target}
                          </div>
                          <div>
                            <p style={{ margin: '0 0 4px 0', color: '#94A3B8', fontSize: '13px' }}>Current Target</p>
                            <h3 style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: '#F8FAFC' }}>{lastTarget.percentage}</h3>
                          </div>
                        </div>
                      );
                    } else {
                      return <p key={index} style={{ margin: 0, color: '#64748B', fontStyle: 'italic' }}>No target assigned for this month.</p>;
                    }
                  } else {
                    return <p key={index} style={{ margin: 0, color: '#64748B', fontStyle: 'italic' }}>No target assigned.</p>;
                  }
                }) : (
                  <p style={{ margin: 0, color: '#64748B', fontStyle: 'italic' }}>Loading targets...</p>
                )}
              </div>
            </div>

          </div>

          {/* Right Column (Chart) */}
          <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: '700' }}>Revenue Growth Timeline</h2>
            <div style={{ flex: 1, minHeight: '350px', position: 'relative' }}>
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          div[style*="marginLeft: '260px'"] { margin-left: 0 !important; }
          div[style*="gridTemplateColumns: '1fr 2fr'"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

// --- Reusable Sub-components ---

const cardStyle = {
  background: 'rgba(30, 41, 59, 0.7)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.05)',
  borderRadius: '24px',
  padding: '28px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
};

const KpiCard = ({ icon, label, value, accentColor }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        padding: '28px',
        border: `1px solid ${accentColor}33`,
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 40px -10px ${accentColor}33` : `0 10px 30px -10px ${accentColor}22`,
      }}>
      <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: `radial-gradient(circle, ${accentColor}22 0%, rgba(0,0,0,0) 70%)`, borderRadius: '50%', pointerEvents: 'none' }}></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ background: `${accentColor}1A`, color: accentColor, padding: '16px', borderRadius: '20px', display: 'flex' }}>
          {icon}
        </div>
        <div>
          <p style={{ margin: '0 0 4px 0', color: '#94A3B8', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</p>
          <h3 style={{ margin: 0, fontSize: '36px', fontWeight: '800', color: '#F8FAFC' }}>{value}</h3>
        </div>
      </div>
    </div>
  );
};

const RevenueRow = ({ label, value, color, isLast }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: isLast ? '0' : '16px', borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)' }}>
    <p style={{ margin: 0, color: '#94A3B8', fontWeight: '500', fontSize: '15px' }}>{label}</p>
    <p style={{ margin: 0, color, fontWeight: '700', fontSize: '16px' }}>₹ {value.toLocaleString()}</p>
  </div>
);

export default OperationDashboard;
