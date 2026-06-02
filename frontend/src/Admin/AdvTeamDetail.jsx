import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";


const AdvTeamDetail = () => {
  const [detailVisible, setDetailVisible] = useState(false);
  const [allData, setAllData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [teamNames, setTeamNames] = useState([]);
  const [advTeamEmailMap, setAdvTeamEmailMap] = useState({});

  const today = new Date();
  const currentMonth = today.toISOString().slice(0, 7);

  const normalizeRole = (role = "") => {
    const value = String(role).trim().toLowerCase();
    if (value === "adv manager") return "manager";
    if (value === "adv leader") return "leader";
    if (value === "sr inside sales specialist") return "sr_inside_sales_specialist";
    if (value === "inside sales specialist") return "inside_sales_specialist";
    return value;
  };

  const fetchAllData = async () => {
    try {
      const [crmRes, legacyRes] = await Promise.allSettled([
        axios.get(`${API}/api/admin/agents`, { withCredentials: true }),
        axios.get(`${API}/getadvteam`, { withCredentials: true }),
      ]);

      const crmUsers = crmRes.status === "fulfilled" && Array.isArray(crmRes.value.data)
        ? crmRes.value.data
        : [];
      const legacyUsers = legacyRes.status === "fulfilled" && Array.isArray(legacyRes.value.data)
        ? legacyRes.value.data
        : [];

      const legacyByEmail = {};
      legacyUsers.forEach((user) => {
        const emailKey = String(user.email || "").toLowerCase();
        if (!emailKey) return;
        legacyByEmail[emailKey] = user;
      });
      setAdvTeamEmailMap(legacyByEmail);

      let normalizedUsers = [];

      if (crmUsers.length > 0) {
        normalizedUsers = crmUsers.map((user) => {
          const emailKey = String(user.email || "").toLowerCase();
          const legacyMatch = legacyByEmail[emailKey];

          return {
            ...user,
            name: user.name || user.fullname || legacyMatch?.fullname || "",
            email: user.email || legacyMatch?.email || "",
            role: normalizeRole(user.role || user.designation || legacyMatch?.designation),
            status: user.status || legacyMatch?.status || "Active",
            team: user.team || legacyMatch?.team || "",
            teams: user.teams || legacyMatch?.teams || [],
          };
        });
      } else {
        normalizedUsers = legacyUsers.map((user) => ({
          _id: user._id,
          name: user.fullname || user.name || "",
          email: user.email || "",
          role: normalizeRole(user.designation || user.role),
          status: user.status || "Active",
          team: user.team || "",
          teams: user.teams || [],
          team_id: null,
        }));
      }

      const activeAgents = normalizedUsers.filter((user) => user.status !== "Inactive");
      setAllData(activeAgents);
    } catch (error) {
      console.error("Error fetching all data:", error);
    }
  };

  const fetchTeamNames = async () => {
    try {
      const [newTeamsRes, legacyTeamNamesRes] = await Promise.allSettled([
        axios.get(`${API}/api/adv-teams/get-all-teams`, { withCredentials: true }),
        axios.get(`${API}/getadvteamname`, { withCredentials: true }),
      ]);

      const newTeams = newTeamsRes.status === "fulfilled" && Array.isArray(newTeamsRes.value.data)
        ? newTeamsRes.value.data
        : [];
      const legacyNames = legacyTeamNamesRes.status === "fulfilled" && Array.isArray(legacyTeamNamesRes.value.data)
        ? legacyTeamNamesRes.value.data
        : [];

      const mergedTeamNames = [
        ...newTeams.map((team) => team.team_name || team.team).filter(Boolean),
        ...legacyNames.map((team) => team.teamname || team.team_name || team.team).filter(Boolean),
      ];

      const uniqueTeamObjects = Array.from(new Set(mergedTeamNames)).map((name) => ({ team_name: name }));
      setTeamNames(uniqueTeamObjects);
    } catch (error) {
      console.error("Error fetching team names:", error);
    }
  };

  const fetchAgentEnrollments = async (email) => {
    try {
      const response = await axios.get(`${API}/getadvenrolls`, { withCredentials: true });
      const enrollments = response.data.data || response.data || [];
      const agentEnrollments = enrollments.filter(enroll => enroll.counselor === email);
      return agentEnrollments;
    } catch (error) {
      console.error("Error fetching agent enrollments:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchAllData();
    fetchTeamNames();
  }, []);

  const groupByDate = (enrollments) => {
    const result = {};
    const today = new Date();
    const last10Days = new Date();
    last10Days.setDate(today.getDate() - 9);

    enrollments.forEach((item) => {
      const date = new Date(item.createdAt).toISOString().split("T")[0];
      const itemDate = new Date(date);

      if (itemDate >= last10Days && itemDate <= today) {
        if (!result[date]) {
          result[date] = { count: 0, total: 0, credited: 0, booked: 0 };
        }
        result[date].count++;
        result[date].total += item.programPrice || 0;
        result[date].booked += item.paidAmount || 0;
        if (
          item.status === "fullPaid" ||
          (Array.isArray(item.remark) &&
            item.remark[item.remark.length - 1] === "Half_Cleared")
        ) {
          result[date].credited += item.paidAmount || 0;
        }
      }
    });

    return Object.entries(result)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([date, values]) => ({
        date,
        count: values.count,
        total: values.total,
        booked: values.booked,
        credited: values.credited,
      }));
  };

  const groupByMonth = (enrollments) => {
    const result = {};
    const getMonth = (date, offset) => {
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() - offset);
      return newDate.toISOString().slice(0, 7);
    };

    const currentMonth = getMonth(today, 0);
    const prevMonth1 = getMonth(today, 1);
    const prevMonth2 = getMonth(today, 2);
    const prevMonth3 = getMonth(today, 3);

    enrollments.forEach((item) => {
      const month = new Date(item.createdAt).toISOString().slice(0, 7);
      const status = item.status;

      if ([currentMonth, prevMonth1, prevMonth2, prevMonth3].includes(month)) {
        if (!result[month]) {
          result[month] = { count: 0, total: 0, credited: 0 };
        }
        result[month].count++;
        result[month].total += item.programPrice || 0;
        if (
          status === "fullPaid" ||
          (Array.isArray(item.remark) &&
            item.remark[item.remark.length - 1] === "Half_Cleared")
        ) {
          result[month].credited += item.paidAmount || 0;
        }
      }
    });

    return Object.entries(result)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([month, values]) => ({
        month,
        count: values.count,
        total: values.total,
        credited: values.credited,
      }));
  };

  const selectedAgentDetail = async (agent) => {
    const enrollments = await fetchAgentEnrollments(agent.email);
    setSelectedAgent({ ...agent, enrollments });
    setDetailVisible(true);
    setDailyRevenue(groupByDate(enrollments));
    setMonthlyRevenue(groupByMonth(enrollments));
  };

  const resetData = () => {
    setSelectedAgent(null);
    setDetailVisible(false);
  };

  const getTeamNameById = (teamId) => {
    if (!teamId) return "";
    const match = teamNames.find((team) => String(team._id || "") === String(teamId));
    return match?.team_name || match?.team || "";
  };

  const getAgentTeamName = (agent) => {
    if (!agent) return "N/A";
    if (agent.team_id?.team_name) return agent.team_id.team_name;

    const teamId = agent.team_id?._id || agent.team_id;
    if (teamId) {
      const mappedName = getTeamNameById(teamId);
      if (mappedName) return mappedName;
    }

    if (agent.team) return agent.team;
    if (agent.team_name) return agent.team_name;
    if (Array.isArray(agent.teams) && agent.teams.length > 0) return agent.teams.join(", ");

    const emailKey = String(agent.email || "").toLowerCase();
    const legacyMatch = advTeamEmailMap[emailKey];
    if (legacyMatch?.team) return legacyMatch.team;
    if (Array.isArray(legacyMatch?.teams) && legacyMatch.teams.length > 0) {
      return legacyMatch.teams.join(", ");
    }

    return "N/A";
  };

  const availableTeamOptions = Array.from(
    new Set(
      teamNames
        .map((team) => team.team_name || team.team)
        .concat(allData.map((agent) => getAgentTeamName(agent)))
        .filter((name) => name && name !== "N/A")
    )
  );

  const filteredData = selectedTeam
    ? allData.filter((agent) => {
        return String(getAgentTeamName(agent)).split(",").map((t) => t.trim()).includes(selectedTeam);
      })
    : allData;

  const getTop3Teams = () => {
    const teamRevenue = {};

    allData.forEach((agent) => {
      const teamList = String(getAgentTeamName(agent))
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean);

      if (teamList.length === 0) teamList.push("N/A");

      teamList.forEach((teamName) => {
        if (!teamRevenue[teamName]) {
          teamRevenue[teamName] = {
            team: teamName,
            totalRevenue: 0,
            creditedRevenue: 0,
            agentCount: 0,
          };
        }
        teamRevenue[teamName].agentCount++;
      });
    });

    return Object.values(teamRevenue)
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, 3);
  };

  const getTop3Managers = () => {
    return allData
      .filter((agent) => agent.role === "manager")
      .slice(0, 3)
      .map((agent) => ({
        name: agent.name,
        email: agent.email,
        role: agent.role,
        team: getAgentTeamName(agent),
        status: agent.status || "Active",
      }));
  };

  const getTop3ByRoles = (roles) => {
    const normalizedRoles = new Set(roles.map((role) => role.toLowerCase()));

    return allData
      .filter((agent) => normalizedRoles.has((agent.role || "").toLowerCase()))
      .slice(0, 3)
      .map((agent) => ({
        name: agent.name,
        email: agent.email,
        team: getAgentTeamName(agent),
      }));
  };

  return (
    <div className="admin-content-wrap min-h-screen bg-slate-50 text-slate-700 font-sans p-6">
      
      {/* Selected agent detail Overlay */}
      {detailVisible && selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-50/80 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 shadow-2xl p-6 md:p-8 rounded-2xl w-full max-w-5xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-600 flex items-center justify-center">
                  {selectedAgent.name.charAt(0)}
                </div>
                {selectedAgent.name}
              </h2>
              <button
                onClick={resetData}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-rose-500/20 hover:text-rose-600 transition-colors"
              >
                <i className="fa fa-times text-lg"></i>
              </button>
            </div>

            <div className="space-y-8">
              {/* Daily Revenue Table */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-600 mb-3 pl-1">Daily Revenue (Last 10 Days)</h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-slate-50">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-white border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Date</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Booked</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Total Revenue</th>
                        <th className="px-4 py-3 text-xs font-semibold text-emerald-600 uppercase">Credited</th>
                        <th className="px-4 py-3 text-xs font-semibold text-amber-600 uppercase">Pending</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-sm">
                      {dailyRevenue.length > 0 ? (
                        dailyRevenue.map((data, index) => (
                          <tr key={index} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 text-slate-900 font-medium">{data.date}</td>
                            <td className="px-4 py-3 text-slate-700">{data.count}</td>
                            <td className="px-4 py-3 text-slate-900 font-mono">₹ {data.total.toLocaleString()}</td>
                            <td className="px-4 py-3 text-emerald-600 font-mono">₹ {data.credited.toLocaleString()}</td>
                            <td className="px-4 py-3 text-amber-600 font-mono">₹ {(data.total - data.credited).toLocaleString()}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-4 py-6 text-center text-slate-500 italic">No daily data found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Monthly Revenue Table */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-600 mb-3 pl-1">Monthly Revenue</h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-slate-50">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-white border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Month</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Booked</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Total Revenue</th>
                        <th className="px-4 py-3 text-xs font-semibold text-emerald-600 uppercase">Credited</th>
                        <th className="px-4 py-3 text-xs font-semibold text-amber-600 uppercase">Pending</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-sm">
                      {monthlyRevenue.length > 0 ? (
                        monthlyRevenue.map((data, index) => (
                          <tr key={index} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 text-slate-900 font-medium">{data.month}</td>
                            <td className="px-4 py-3 text-slate-700">{data.count}</td>
                            <td className="px-4 py-3 text-slate-900 font-mono">₹ {data.total.toLocaleString()}</td>
                            <td className="px-4 py-3 text-emerald-600 font-mono">₹ {data.credited.toLocaleString()}</td>
                            <td className="px-4 py-3 text-amber-600 font-mono">₹ {(data.total - data.credited).toLocaleString()}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-4 py-6 text-center text-slate-500 italic">No monthly data found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* All Time Revenue */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-600 mb-3 pl-1">All Time Revenue</h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-slate-50">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-white border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Total Booked</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-600 uppercase">Total Revenue</th>
                        <th className="px-4 py-3 text-xs font-semibold text-emerald-600 uppercase">Total Credited</th>
                        <th className="px-4 py-3 text-xs font-semibold text-amber-600 uppercase">Total Pending</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-sm">
                      {selectedAgent.enrollments.length > 0 ? (
                        <tr className="bg-indigo-500/5">
                          <td className="px-4 py-4 text-slate-900 font-bold text-lg">{selectedAgent.enrollments.length}</td>
                          <td className="px-4 py-4 text-indigo-600 font-mono font-bold text-lg">
                            ₹ {selectedAgent.enrollments.reduce((sum, item) => sum + (item.programPrice || 0), 0).toLocaleString()}
                          </td>
                          <td className="px-4 py-4 text-emerald-600 font-mono font-bold text-lg">
                            ₹ {selectedAgent.enrollments.reduce((sum, item) => {
                              const isFullPaid = item.status === "fullPaid";
                              const hasHalfClearedRemark = Array.isArray(item.remark) && item.remark.length > 0 && item.remark[item.remark.length - 1] === "Half_Cleared";
                              if (isFullPaid || hasHalfClearedRemark) return sum + (item.paidAmount || 0);
                              return sum;
                            }, 0).toLocaleString()}
                          </td>
                          <td className="px-4 py-4 text-amber-600 font-mono font-bold text-lg">
                            ₹ {(selectedAgent.enrollments.reduce((sum, item) => sum + (item.programPrice || 0), 0) -
                              selectedAgent.enrollments.reduce((sum, item) => {
                                const isFullPaid = item.status === "fullPaid";
                                const hasHalfClearedRemark = Array.isArray(item.remark) && item.remark.length > 0 && item.remark[item.remark.length - 1] === "Half_Cleared";
                                if (isFullPaid || hasHalfClearedRemark) return sum + (item.paidAmount || 0);
                                return sum;
                              }, 0)).toLocaleString()}
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-4 py-6 text-center text-slate-500 italic">No enrollments recorded</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                <i className="fa fa-sitemap text-indigo-500"></i>
                Team Details
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Team Performance Snapshot
                <span className="text-indigo-600 font-medium ml-1">
                  {selectedTeam ? ` - ${selectedTeam}` : " - All Teams"}
                </span>
              </p>
            </div>

            <select
              className="min-w-[240px] rounded-xl border border-slate-200 bg-white text-slate-900 px-4 py-3 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option value="">Filter by Team: All Teams</option>
              {availableTeamOptions.map((teamName, index) => (
                <option key={index} value={teamName}>
                  {teamName}
                </option>
              ))}
            </select>
          </div>

          {/* Overview Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 backdrop-blur-md p-6 shadow-lg flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center text-xl">
                <i className="fa fa-users"></i>
              </div>
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-slate-600">Total Agents</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{filteredData.length}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 backdrop-blur-md p-6 shadow-lg flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-600 flex items-center justify-center text-xl">
                <i className="fa fa-layer-group"></i>
              </div>
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-slate-600">Active Teams</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{teamNames.length}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 backdrop-blur-md p-6 shadow-lg flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center text-xl">
                <i className="fa fa-star"></i>
              </div>
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-slate-600">Top Managers Shown</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{Math.min(getTop3Managers().length, 3)}</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 mb-4 uppercase tracking-wider pl-1">Leaderboards</h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
          {/* Top 3 Teams */}
          <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 backdrop-blur-md shadow-lg overflow-hidden">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>🏆</span> Top 3 Teams
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-white border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-widest">
                  <tr>
                    <th className="px-4 py-3">Rank</th>
                    <th className="px-4 py-3">Team Name</th>
                    <th className="px-4 py-3">Agent Count</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  {getTop3Teams().map((team, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-bold text-amber-600">#{index + 1}</td>
                      <td className="px-4 py-3 text-slate-900 font-medium">{team.team}</td>
                      <td className="px-4 py-3 text-slate-700">{team.agentCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top 3 Managers */}
          <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 backdrop-blur-md shadow-lg overflow-hidden">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>⭐</span> Top 3 Managers
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left whitespace-nowrap">
                <thead className="bg-white border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-widest">
                  <tr>
                    <th className="px-4 py-3">Rank</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Team</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  {getTop3Managers().length > 0 ? (
                    getTop3Managers().map((manager, index) => (
                      <tr key={index} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-bold text-emerald-600">#{index + 1}</td>
                        <td className="px-4 py-3 text-slate-900 font-medium">{manager.name}</td>
                        <td className="px-4 py-3 text-slate-600 text-xs">{manager.email}</td>
                        <td className="px-4 py-3 text-slate-700"><span className="bg-slate-100 px-2 py-1 rounded text-xs">{manager.team}</span></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-4 py-6 text-center text-slate-500">No Managers</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 mb-4 uppercase tracking-wider pl-1">Role Highlights</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 mb-10">
          {[
            {
              title: "Top 3 Leaders",
              icon: "👑",
              roles: ["leader", "adv_leader"],
              emptyLabel: "No Leaders",
              color: "text-purple-600"
            },
            {
              title: "Top 3 Inside Sales",
              icon: "📞",
              roles: ["inside_sales_specialist", "inside sales specialist"],
              emptyLabel: "No Inside Sales Specialists",
              color: "text-blue-600"
            },
            {
              title: "Top 3 SR Inside Sales",
              icon: "🚀",
              roles: ["sr_inside_sales_specialist", "sr inside sales specialist"],
              emptyLabel: "No SR Specialists",
              color: "text-rose-600"
            },
          ].map((roleConfig) => {
            const roleData = getTop3ByRoles(roleConfig.roles);

            return (
              <div key={roleConfig.title} className="border border-slate-200 rounded-2xl p-6 bg-slate-50 backdrop-blur-md shadow-lg overflow-hidden">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span>{roleConfig.icon}</span> {roleConfig.title}
                </h3>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-white border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-widest">
                      <tr>
                        <th className="px-4 py-3">Rank</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Team</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-sm">
                      {roleData.length > 0 ? (
                        roleData.map((agent, index) => (
                          <tr key={index} className="hover:bg-slate-50 transition-colors">
                            <td className={`px-4 py-3 font-bold ${roleConfig.color}`}>#{index + 1}</td>
                            <td className="px-4 py-3 text-slate-900 font-medium">{agent.name}</td>
                            <td className="px-4 py-3 text-slate-600 text-xs truncate max-w-[120px]" title={agent.team}>{agent.team}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="px-4 py-6 text-center text-slate-500">{roleConfig.emptyLabel}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>

        <h3 className="text-lg font-semibold text-slate-900 mb-4 uppercase tracking-wider pl-1">All Agents Master List</h3>
        <div className="bg-slate-50 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-white border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-widest">
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Team</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {filteredData.length > 0 ? filteredData.map((agent, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 text-slate-500 font-mono">{index + 1}</td>
                    <td 
                      className="px-6 py-4 font-bold text-indigo-600 cursor-pointer hover:text-indigo-300 transition-colors flex items-center gap-2"
                      onClick={() => selectedAgentDetail(agent)}
                    >
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-600 border border-indigo-500/30 flex items-center justify-center text-xs">
                        {agent.name.charAt(0)}
                      </div>
                      {agent.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs">{agent.email}</td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 border border-slate-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-700">
                        {(agent.role || 'N/A').replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-700 truncate max-w-[200px]" title={getAgentTeamName(agent)}>{getAgentTeamName(agent)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${agent.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-slate-500/10 text-slate-600 border-slate-500/20'}`}>
                        {agent.status || "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        className="px-4 py-1.5 rounded-lg text-xs font-bold border border-indigo-500/50 bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 transition-colors"
                        onClick={() => selectedAgentDetail(agent)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-10 text-center text-slate-500 italic">
                      No agents found for the selected team.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvTeamDetail;
