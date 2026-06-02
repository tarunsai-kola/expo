import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import { RiMailSendFill } from "react-icons/ri";
import { PiLockKeyOpenFill, PiLockKeyFill } from "react-icons/pi";
import { FaUserTimes } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";

/* ─── tiny design tokens ─────────────────────────────────── */
const T = {
  bg:        "#0F172A",
  card:      "rgba(30,41,59,0.85)",
  border:    "rgba(255,255,255,0.07)",
  text:      "#F1F5F9",
  muted:     "#94A3B8",
  accent:    "#3B82F6",   // blue
  green:     "#10B981",
  red:       "#EF4444",
  yellow:    "#F59E0B",
  radius:    "16px",
  font:      "'Inter', sans-serif",
};

/* ─── reusable styles ───────────────────────────────────── */
const styles = {
  page: {
    background: T.bg,
    minHeight: "100vh",
    marginLeft: "260px",
    padding: "36px 28px",
    fontFamily: T.font,
    color: T.text,
    boxSizing: "border-box",
  },
  card: {
    background: T.card,
    backdropFilter: "blur(12px)",
    border: `1px solid ${T.border}`,
    borderRadius: T.radius,
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  },
  input: {
    width: "100%",
    background: "rgba(15,23,42,0.7)",
    border: `1px solid ${T.border}`,
    borderRadius: "12px",
    padding: "12px 16px",
    color: T.text,
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border 0.2s",
    fontFamily: T.font,
  },
  select: {
    width: "100%",
    background: "rgba(15,23,42,0.7)",
    border: `1px solid ${T.border}`,
    borderRadius: "12px",
    padding: "12px 16px",
    color: T.text,
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: T.font,
    cursor: "pointer",
  },
  label: {
    display: "block",
    color: T.muted,
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "6px",
  },
  btnPrimary: {
    background: `linear-gradient(135deg, ${T.accent}, #2563EB)`,
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "12px 24px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: T.font,
  },
  btnGhost: {
    background: "rgba(255,255,255,0.05)",
    color: T.muted,
    border: `1px solid ${T.border}`,
    borderRadius: "12px",
    padding: "12px 24px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    fontFamily: T.font,
  },
  thStyle: {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    color: T.muted,
    whiteSpace: "nowrap",
    background: "rgba(15,23,42,0.6)",
    borderBottom: `1px solid ${T.border}`,
  },
  tdStyle: {
    padding: "14px 16px",
    fontSize: "13px",
    color: T.text,
    borderBottom: `1px solid rgba(255,255,255,0.03)`,
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  },
};

/* ─── SVGs ──────────────────────────────────────────────── */
const Icons = {
  Search: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  ),
  Plus: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  ),
  Info: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
  ),
  Send: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
  ),
  Close: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
};

/* ─── Main Component ─────────────────────────────────────── */
const AdvBookedPayment = () => {
  /* ── State ── */
  const [iscourseFormVisible, setiscourseFormVisible] = useState(false);
  const [course, setCourse] = useState([]);
  const [offerData, setOfferData] = useState(null);
  const [offerDate, setOfferDate] = useState("");
  const [offerDuration, setOfferDuration] = useState("");
  const [offerStart, setOfferStart] = useState("");
  const [offerEnd, setOfferEnd] = useState("");
  const [offerLocation, setOfferLocation] = useState("Online");
  const [isOfferLetterSending, setIsOfferLetterSending] = useState(false);
  const [advTeam, setAdvTeam] = useState([]);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState([]);
  const [counselor, setCounselor] = useState([]);
  const [domain, setDomain] = useState([]);
  const [programPrice, setProgramPrice] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [monthOpted, setMonthOpted] = useState("");
  const [monthsToShow, setMonthsToShow] = useState([]);
  const [clearPaymentMonth, setClearPaymentMonth] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [advEnrolls, setAdvEnrolls] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [operationData, setOperationData] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [months, setMonths] = useState([]);
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  /* ── Helpers ── */
  const resetForm = () => {
    setiscourseFormVisible(false);
    setFullname(""); setEmail(""); setPhone(""); setProgram(""); setCounselor(""); setDomain("");
    setProgramPrice(""); setPaidAmount(""); setMonthOpted(""); setClearPaymentMonth(""); setEditingStudentId(null);
  };
  const resetOfferLeter = () => { setOfferData(null); setOfferDate(""); setOfferDuration(""); setOfferStart(""); setOfferEnd(""); setOfferLocation("Online"); };
  const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");
  const getCurrentMonth = () => { const m = ["January","February","March","April","May","June","July","August","September","October","November","December"]; const d = new Date(); return `${m[d.getMonth()]} ${d.getFullYear()}`; };
  const getPastMonths = () => { const m = ["January","February","March","April","May","June","July","August","September","October","November","December"]; const d = new Date(); const ci = d.getMonth(); const cy = d.getFullYear(); return Array.from({length:4},(_,i)=>{ const td=new Date(cy,ci-i,1); return `${m[td.getMonth()]} ${td.getFullYear()}`; }); };
  const getMonthFromDate = (date) => { const m = ["January","February","March","April","May","June","July","August","September","October","November","December"]; const d = new Date(date); return `${m[d.getMonth()]} ${d.getFullYear()}`; };

  /* ── Fetch ── */
  const fetchCourses = async () => { try { const r = await axios.get(`${API}/getadvcourses`); setCourse(r.data); } catch(e){} };
  const fetchAdvTeam = async () => { try { const r = await axios.get(`${API}/getadvteam`); setAdvTeam(r.data); } catch(e){} };
  const fetchOperationData = async () => { const operationId = localStorage.getItem("advOperationId"); try { const r = await axios.get(`${API}/getadvoperation`,{params:{operationId}}); setOperationData(r.data); } catch(e){} };

  const fetchAdvEnrolls = async () => {
    const operationName = localStorage.getItem("advOperationName");
    try {
      const response = await axios.get(`${API}/getadvenrolls?all=true`);
      const bookedStudents = response.data
        ? response.data.filter(i => i.status === "booked" && i.operationName === operationName)
        : response.filter(i => i.status === "booked" && i.operationName === operationName);
      setAdvEnrolls(bookedStudents);
      const currentMonth = getCurrentMonth();
      setSelectedMonth(currentMonth);
      setFilteredStudents(bookedStudents.filter(s => getMonthFromDate(s.createdAt) === currentMonth));
    } catch(e) { console.error(e); }
  };

  useEffect(() => {
    fetchCourses(); fetchAdvTeam(); fetchAdvEnrolls(); fetchOperationData();
    setMonths(getPastMonths());
  }, []);

  useEffect(() => {
    const today = new Date();
    setMinDate(today.toISOString().split("T")[0]);
    setMaxDate(new Date(today.setDate(today.getDate()+5)).toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    setMonthsToShow(["January","February","March","April","May","June","July","August","September","October","November","December"]);
  }, []);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedMonth, advEnrolls]);

  /* ── Handlers ── */
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { fullname, email:email.trim(), phone, program, counselor:counselor.trim(), domain:domain.trim(), programPrice, paidAmount, monthOpted, clearPaymentMonth, operationName:operationData.fullname, operationId:operationData._id };
    try {
      let r = editingStudentId ? await axios.put(`${API}/editadvenroll/${editingStudentId}`,formData) : await axios.post(`${API}/advenroll`,formData);
      if (r.status===200||r.status===201) { toast.success(editingStudentId?"Student updated.":"Submitted."); fetchAdvEnrolls(); resetForm(); }
      else toast.error("Error submitting.");
    } catch { toast.error("Error or student already exists."); }
  };

  const handleRemarkChange = async (e, studentId) => {
    const sel = e.target.value;
    setRemarks(sel);
    if (sel && studentId) {
      try {
        const r = await axios.post(`${API}/updateadvenrollremark`,{remark:sel,studentId});
        if(r.status===200) toast.success(r.data.message); else toast.error(r.data.error);
      } catch { toast.error("Error updating remark."); }
    }
  };

  const handleEdit = (studentId) => {
    if(!window.confirm("Edit this?")) return;
    const s = advEnrolls.find(i=>i._id===studentId);
    setFullname(s.fullname); setEmail(s.email); setPhone(s.phone); setWhatsAppNumber(s.whatsAppNumber);
    setProgram(s.program); setCounselor(s.counselor); setDomain(s.domain); setProgramPrice(s.programPrice);
    setPaidAmount(s.paidAmount); setMonthOpted(s.monthOpted); setClearPaymentMonth(s.clearPaymentMonth);
    setEditingStudentId(studentId); setiscourseFormVisible(true);
  };

  const handleSendEmail = async (value) => {
    if(value.isSending) return; value.isSending=true;
    const emailData = { fullname:value.fullname,email:value.email,phone:value.phone,program:value.program,counselor:value.counselor,domain:value.domain,clearPaymentMonth:value.clearPaymentMonth,monthOpted:value.monthOpted };
    try {
      const r = await axios.post(`${API}/send-email`,emailData);
      if(r.status===200){
        toast.success("Email sent!"); 
        const upd = await axios.put(`${API}/advmailsendedchange/${value._id}`,{mailSended:true});
        if(upd.status===200){ toast.success("Record updated!"); const upFn=(p)=>p.map(s=>s._id===value._id?{...s,mailSended:true}:s); setAdvEnrolls(upFn); setFilteredStudents(upFn); }
        else toast.error("Failed to update.");
      } else toast.error("Failed to send email.");
    } catch { toast.error("Error sending email."); } finally { value.isSending=false; }
  };

  const handleDialogOpen = (item) => { setDialogData(item); setDialogVisible(true); };
  const handleDialogClose = () => { setDialogVisible(false); setDialogData(null); };

  const handleSearchChange = (e) => {
    const v = e.target.value; setSearchQuery(v);
    setFilteredStudents(advEnrolls.filter(s=>(s.email&&s.email.toLowerCase().includes(v.toLowerCase()))||(s.phone&&s.phone.toLowerCase().includes(v.toLowerCase()))||(s.fullname&&s.fullname.toLowerCase().includes(v.toLowerCase()))||(s.counselor&&s.counselor.toLowerCase().includes(v.toLowerCase()))||(s.operationName&&s.operationName.toLowerCase().includes(v.toLowerCase()))||(s.createdAt&&s.createdAt.toLowerCase().includes(v.toLowerCase()))||(s.clearPaymentMonth&&s.clearPaymentMonth.toLowerCase().includes(v.toLowerCase()))||(s.collegeName&&s.collegeName.toLowerCase().includes(v.toLowerCase()))||(s.branch&&s.branch.toLowerCase().includes(v.toLowerCase()))));
  };

  const handleAddNewCandidate = () => { resetForm(); setEditingStudentId(null); setiscourseFormVisible(true); };

  const handleSendOnboardingDetails = async (value) => {
    if(!window.confirm("Send onboarding email?")) return;
    const emailData = {fullname:value.fullname,email:value.email,program:value.program,domain:value.domain,clearPaymentMonth:value.clearPaymentMonth,monthOpted:value.monthOpted};
    try {
      const r = await axios.post(`${API}/sendedOnboardingMail`,emailData);
      if(r.status===200){
        toast.success("Onboarding email sent!");
        const upd = await axios.put(`${API}/advmailsendedchange/${value._id}`,{onboardingSended:true});
        if(upd.status===200){ toast.success("Record updated!"); const upFn=(p)=>p.map(s=>s._id===value._id?{...s,onboardingSended:true}:s); setAdvEnrolls(upFn); setFilteredStudents(upFn); }
        else toast.error("Failed to update.");
      } else toast.error("Failed to send onboarding email.");
    } catch { toast.error("Error."); }
  };

  const handleCopyMobileNumbers = (selectedDate) => {
    const students = groupedData[selectedDate];
    if(Array.isArray(students)){ navigator.clipboard.writeText(students.map(s=>s.whatsAppNumber).join("\n")).then(()=>toast.success("Numbers copied!")).catch(e=>toast.error("Failed: "+e)); }
    else alert("No students found.");
  };

  const createAccount = async (value) => {
    if(value.isSending) return; value.isSending=true;
    try {
      const r = await axios.post(`${API}/users`,{fullname:value.fullname.trim(),email:value.email.trim(),phone:value.phone});
      if(r.status===200){
        toast.success("User created!");
        const upd = await axios.put(`${API}/advmailsendedchange/${value._id}`,{userCreated:true});
        if(upd.status===200){ toast.success("Record updated!"); const upFn=(p)=>p.map(s=>s._id===value._id?{...s,userCreated:true}:s); setAdvEnrolls(upFn); setFilteredStudents(upFn); }
        else toast.error("Failed to update.");
      } else toast.error("Failed to create user.");
    } catch { toast.success("User already created — check active users."); } finally { value.isSending=false; }
  };

  const handleMonthChange = (e) => {
    const m = e.target.value; setSelectedMonth(m);
    setFilteredStudents(advEnrolls.filter(s=>getMonthFromDate(s.createdAt)===m));
  };

  const sendOfferleter = async (e) => {
    e.preventDefault(); setIsOfferLetterSending(true);
    const offerLetterDetails = { id:offerData._id, fullname:offerData.fullname.split(" ").map(w=>w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join(" "), domain:offerData.domain, email:offerData.email, date:new Date(offerDate).toLocaleDateString("en-GB",{year:"numeric",month:"long",day:"numeric"}), duration:offerDuration, start:new Date(offerStart).toLocaleDateString("en-GB",{year:"numeric",month:"long",day:"numeric"}), end:new Date(offerEnd).toLocaleDateString("en-GB",{year:"numeric",month:"long",day:"numeric"}), location:offerLocation, smtpConfig:'SMTP_MAIL2' };
    try { await axios.post(`${API}/sendofferletter`,offerLetterDetails); toast.success("Offer letter sent!"); fetchAdvEnrolls(); resetOfferLeter(); }
    catch(e){ console.error(e); }
    finally { setIsOfferLetterSending(false); }
  };

  /* ── Pagination & grouping ── */
  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfLastItem - itemsPerPage, indexOfLastItem);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const nextPage = () => { if(currentPage<totalPages) setCurrentPage(p=>p+1); };
  const prevPage = () => { if(currentPage>1) setCurrentPage(p=>p-1); };

  const groupedData = currentItems.reduce((acc,item)=>{ const d=formatDate(item.createdAt); if(!acc[d]) acc[d]=[]; acc[d].push(item); return acc; },{});

  /* ── RENDER ── */
  return (
    <div style={styles.page}>
      <Toaster position="top-center" toastOptions={{ style:{background:'#1E293B',color:'#F8FAFC',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'12px'} }} />

      {/* ── Offer Letter Modal ── */}
      {offerData && (
        <div style={{ position:"fixed",inset:0,zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div onClick={resetOfferLeter} style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0.6)" }}/>
          <div style={{ ...styles.card, position:"relative",zIndex:1001,width:"100%",maxWidth:"480px",padding:"36px",display:"flex",flexDirection:"column",gap:"16px" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px" }}>
              <h2 style={{ margin:0,fontSize:"20px",fontWeight:"800" }}>Send Offer Letter</h2>
              <button onClick={resetOfferLeter} style={{ background:"none",border:"none",color:T.muted,cursor:"pointer" }}>{Icons.Close}</button>
            </div>
            <div style={{ background:"rgba(15,23,42,0.5)",borderRadius:"12px",padding:"16px",display:"flex",flexDirection:"column",gap:"4px" }}>
              <p style={{ margin:0,color:T.muted,fontSize:"13px" }}>Name: <strong style={{ color:T.text }}>{offerData?.fullname}</strong></p>
              <p style={{ margin:0,color:T.muted,fontSize:"13px" }}>Domain: <strong style={{ color:T.text }}>{offerData?.domain}</strong></p>
              <p style={{ margin:0,color:T.muted,fontSize:"13px" }}>Email: <strong style={{ color:T.text }}>{offerData?.email}</strong></p>
            </div>
            <form onSubmit={sendOfferleter} style={{ display:"flex",flexDirection:"column",gap:"14px" }}>
              <div><label style={styles.label}>Offer Letter Date</label><input type="date" value={offerDate} onChange={e=>setOfferDate(e.target.value)} required style={styles.input}/></div>
              <div><label style={styles.label}>Internship Duration</label>
                <select value={offerDuration} onChange={e=>setOfferDuration(e.target.value)} required style={styles.select}>
                  <option value="">Select Duration</option>
                  {["One","Two","Three","Four","Five","Six"].map(v=><option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div><label style={styles.label}>Start Date</label><input type="date" value={offerStart} onChange={e=>setOfferStart(e.target.value)} required style={styles.input}/></div>
              <div><label style={styles.label}>End Date</label><input type="date" value={offerEnd} onChange={e=>setOfferEnd(e.target.value)} required style={styles.input}/></div>
              <div><label style={styles.label}>Reporting Location</label>
                <select value={offerLocation} onChange={e=>setOfferLocation(e.target.value)} required style={styles.select}>
                  <option value="Online">Online</option><option value="Offline">Offline</option>
                </select>
              </div>
              <div style={{ display:"flex",gap:"12px",marginTop:"8px" }}>
                <button type="button" onClick={resetOfferLeter} style={{ ...styles.btnGhost,flex:1 }}>Cancel</button>
                <button type="submit" disabled={isOfferLetterSending} style={{ ...styles.btnPrimary,flex:1,opacity:isOfferLetterSending?0.6:1 }}>{isOfferLetterSending?"Sending...":"Send Letter"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Enrollment Form Modal ── */}
      {iscourseFormVisible && (
        <div style={{ position:"fixed",inset:0,zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div onClick={resetForm} style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0.6)" }}/>
          <div style={{ ...styles.card,position:"relative",zIndex:1001,width:"100%",maxWidth:"500px",padding:"36px",maxHeight:"90vh",overflowY:"auto",display:"flex",flexDirection:"column",gap:"14px" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px" }}>
              <h2 style={{ margin:0,fontSize:"20px",fontWeight:"800" }}>{editingStudentId?"Edit Enrollment":"Add New Enrollment"}</h2>
              <button onClick={resetForm} style={{ background:"none",border:"none",color:T.muted,cursor:"pointer" }}>{Icons.Close}</button>
            </div>
            <form onSubmit={handleSubmit} style={{ display:"flex",flexDirection:"column",gap:"14px" }}>
              {[{ph:"Candidate Full Name",val:fullname,set:setFullname,type:"text"},{ph:"Candidate Email",val:email,set:setEmail,type:"text"},{ph:"Contact No",val:phone,set:setPhone,type:"number"},{ph:"WhatsApp No",val:whatsAppNumber,set:setWhatsAppNumber,type:"number"}].map(({ph,val,set,type})=>(
                <input key={ph} value={val} onChange={e=>set(e.target.value)} type={type} placeholder={ph} required style={styles.input}/>
              ))}
              <select value={program} onChange={e=>setProgram(e.target.value)} style={styles.select}>
                <option value="" disabled>Mode of Program</option>
                {["Self-guided","Instructor Led","Career Advancement"].map(v=><option key={v} value={v}>{v}</option>)}
              </select>
              <select disabled={editingStudentId!==null} value={counselor} onChange={e=>setCounselor(e.target.value)} style={styles.select}>
                <option value="" disabled>Select Counselor</option>
                {advTeam.map(i=><option key={i._id} value={i.fullname}>{i.fullname}</option>)}
              </select>
              <select value={domain} onChange={e=>setDomain(e.target.value)} style={styles.select}>
                <option value="" disabled>Select Domain</option>
                {course.map(i=><option key={i._id} value={i.title}>{i.title}</option>)}
              </select>
              <select value={monthOpted} onChange={e=>setMonthOpted(e.target.value)} required style={styles.select}>
                <option value="" disabled>Select Month Opted</option>
                {monthsToShow.map((m,i)=><option key={i} value={m}>{m}</option>)}
              </select>
              <input value={programPrice} onChange={e=>setProgramPrice(e.target.value)} type="number" placeholder="Program Price" required disabled={editingStudentId!==null} style={{ ...styles.input,opacity:editingStudentId?0.5:1 }}/>
              <input value={paidAmount} onChange={e=>setPaidAmount(e.target.value)} type="number" placeholder="Paid Amount" required style={styles.input}/>
              <div>
                <label style={styles.label}>Next Instalment Date</label>
                <input value={clearPaymentMonth} onChange={e=>setClearPaymentMonth(e.target.value)} type="date" min={minDate} max={maxDate} style={styles.input}/>
              </div>
              <button type="submit" style={{ ...styles.btnPrimary,marginTop:"8px" }}>{editingStudentId?"Save Changes":"Submit Enrollment"}</button>
            </form>
          </div>
        </div>
      )}

      {/* ── Page Header ── */}
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"32px",flexWrap:"wrap",gap:"16px" }}>
        <div>
          <h1 style={{ margin:"0 0 6px 0",fontSize:"28px",fontWeight:"800",background:"linear-gradient(90deg,#F8FAFC,#94A3B8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>
            Booked Payments
          </h1>
          <p style={{ margin:0,color:T.muted,fontSize:"14px" }}>Advance Program — Enrolled students with pending full payment</p>
        </div>
        <button onClick={handleAddNewCandidate} style={{ ...styles.btnPrimary,display:"flex",alignItems:"center",gap:"8px",boxShadow:"0 8px 20px -8px rgba(59,130,246,0.5)" }}>
          {Icons.Plus} Add Enrollment
        </button>
      </div>

      {/* ── Filters bar ── */}
      <div style={{ ...styles.card,padding:"20px 24px",marginBottom:"24px",display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap" }}>
        {/* Search */}
        <div style={{ position:"relative",flex:"1",minWidth:"220px" }}>
          <div style={{ position:"absolute",left:"14px",top:"50%",transform:"translateY(-50%)",color:T.muted }}>{Icons.Search}</div>
          <input type="text" placeholder="Search by name, email, phone…" value={searchQuery} onChange={handleSearchChange}
            style={{ ...styles.input,paddingLeft:"42px" }}
            onFocus={e=>e.target.style.border=`1px solid ${T.accent}`}
            onBlur={e=>e.target.style.border=`1px solid ${T.border}`}
          />
        </div>
        {/* Month filter */}
        <select value={selectedMonth} onChange={handleMonthChange} style={{ ...styles.select,minWidth:"180px",flex:"0 0 auto" }}>
          {months.map((m,i)=><option key={i} value={m}>{m}</option>)}
        </select>
        {/* Count badge */}
        <div style={{ background:"rgba(59,130,246,0.1)",border:`1px solid ${T.accent}33`,borderRadius:"10px",padding:"8px 18px",color:T.accent,fontWeight:"700",fontSize:"14px",whiteSpace:"nowrap" }}>
          {filteredStudents.length} Records
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{ ...styles.card,padding:0,overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%",borderCollapse:"collapse" }}>
            <thead>
              <tr>
                {["Sl","Name","WhatsApp","Program Price","Paid Amount","Remaining","Month Opted","Next Instalment","Hierarchy","Edit","Credentials","Create User","Onboarding","Offer Letter","Details","Last Remark","Update Remark"].map(h=>(
                  <th key={h} style={styles.thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedData).length > 0 ? (
                Object.keys(groupedData).map(date => (
                  <React.Fragment key={date}>
                    {/* Date separator row */}
                    <tr onClick={()=>handleCopyMobileNumbers(date)} style={{ cursor:"pointer" }}>
                      <td colSpan={17} style={{ padding:"10px 16px",background:"rgba(59,130,246,0.08)",borderLeft:`3px solid ${T.accent}`,color:T.accent,fontWeight:"700",fontSize:"13px",letterSpacing:"0.5px" }}>
                        {date} — click to copy WhatsApp numbers
                      </td>
                    </tr>
                    {/* Student rows */}
                    {groupedData[date].map((item, index) => {
                      const advTeamObj = advTeam.find(b=>b.fullname===item.counselor);
                      const teamName = advTeamObj?.team||'';
                      const managers = advTeam.filter(b=>b.designation&&b.designation.toLowerCase()==='manager');
                      const managerObj = managers.find(mgr=>Array.isArray(mgr.teams)&&mgr.teams.includes(teamName));
                      const managerName = managerObj?.fullname||'';
                      const lastRemark = item.remark&&item.remark[item.remark.length-1];

                      // row color based on remark
                      let rowBg = "transparent";
                      if(lastRemark==="Cleared") rowBg="rgba(16,185,129,0.05)";
                      else if(lastRemark==="Default") rowBg="rgba(239,68,68,0.05)";
                      else if(lastRemark==="DNP"||lastRemark==="NATC") rowBg="rgba(245,158,11,0.05)";

                      return (
                        <tr key={item._id} style={{ background:rowBg, transition:"background 0.2s" }}
                          onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.03)"}}
                          onMouseLeave={e=>{e.currentTarget.style.background=rowBg}}>
                          <td style={styles.tdStyle}>{index+1}</td>
                          <td style={{ ...styles.tdStyle,textTransform:"capitalize",fontWeight:"600",color:"#CBD5E1" }}>{item.fullname}</td>
                          <td style={styles.tdStyle}>{item.whatsAppNumber}</td>
                          <td style={{ ...styles.tdStyle,color:T.green }}>₹{Number(item.programPrice).toLocaleString()}</td>
                          <td style={{ ...styles.tdStyle,color:T.accent }}>₹{Number(item.paidAmount).toLocaleString()}</td>
                          <td style={{ ...styles.tdStyle,color:T.yellow }}>₹{(item.programPrice-item.paidAmount).toLocaleString()}</td>
                          <td style={{ ...styles.tdStyle,textTransform:"capitalize" }}>{item.monthOpted}</td>
                          <td style={styles.tdStyle}>{item.clearPaymentMonth}</td>
                          <td style={styles.tdStyle}>
                            <div style={{ display:"flex",flexDirection:"column",gap:"2px" }}>
                              <span style={{ fontWeight:"700",color:"#CBD5E1",fontSize:"12px" }}>{managerName} <span style={{ color:T.muted,fontWeight:"400" }}>(Mgr)</span></span>
                              <span style={{ color:T.muted,fontSize:"11px" }}>{teamName}</span>
                            </div>
                          </td>
                          {/* Edit */}
                          <td style={styles.tdStyle}>
                            <button onClick={()=>handleEdit(item._id)} style={{ background:"rgba(59,130,246,0.1)",color:T.accent,border:`1px solid ${T.accent}33`,borderRadius:"8px",padding:"6px 14px",fontSize:"12px",fontWeight:"600",cursor:"pointer",fontFamily:T.font }}>Edit</button>
                          </td>
                          {/* Login Credentials */}
                          <td style={{ ...styles.tdStyle,textAlign:"center" }}>
                            <div onClick={!item.mailSended?()=>handleSendEmail(item):null} style={{ cursor:item.mailSended?"default":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"4px",color:item.mailSended?T.green:T.red,fontSize:"20px" }}>
                              {item.mailSended?<PiLockKeyOpenFill/>:<PiLockKeyFill/>}
                            </div>
                          </td>
                          {/* Create User */}
                          <td style={{ ...styles.tdStyle,textAlign:"center" }}>
                            <div onClick={()=>createAccount(item)} style={{ cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",color:item.userCreated?T.green:T.red,fontSize:"18px" }}>
                              {item.userCreated?<FaUserCheck/>:<FaUserTimes/>}
                              <span style={{ fontSize:"10px",fontWeight:"600" }}>{item.userCreated?"Created":"Not Yet"}</span>
                            </div>
                          </td>
                          {/* Onboarding */}
                          <td style={{ ...styles.tdStyle,textAlign:"center" }}>
                            <div onClick={()=>handleSendOnboardingDetails(item)} style={{ cursor:"pointer",color:item.onboardingSended?T.green:T.red,fontSize:"18px",display:"flex",justifyContent:"center" }}>
                              <RiMailSendFill/>
                            </div>
                          </td>
                          {/* Offer Letter */}
                          <td style={{ ...styles.tdStyle,textAlign:"center" }}>
                            <button onClick={()=>setOfferData(item)} style={{ background:item.offerlettersended?"rgba(16,185,129,0.1)":"rgba(139,92,246,0.1)",color:item.offerlettersended?T.green:"#8B5CF6",border:"none",borderRadius:"8px",padding:"6px 12px",fontSize:"11px",fontWeight:"700",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px",fontFamily:T.font }}>
                              {Icons.Send} {item.offerlettersended?"Sent":"Send"}
                            </button>
                          </td>
                          {/* More Details */}
                          <td style={{ ...styles.tdStyle,textAlign:"center" }}>
                            <button onClick={()=>handleDialogOpen(item)} style={{ background:"rgba(255,255,255,0.05)",color:T.muted,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"6px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px",fontSize:"12px",fontFamily:T.font }}>
                              {Icons.Info}
                            </button>
                          </td>
                          {/* Last Remark */}
                          <td style={styles.tdStyle}>
                            <span style={{ background:lastRemark==="Cleared"?"rgba(16,185,129,0.15)":lastRemark==="Default"?"rgba(239,68,68,0.15)":"rgba(255,255,255,0.05)",color:lastRemark==="Cleared"?T.green:lastRemark==="Default"?T.red:T.muted,padding:"4px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:"600" }}>
                              {lastRemark||"None"}
                            </span>
                          </td>
                          {/* Remark dropdown */}
                          <td style={styles.tdStyle}>
                            <select onChange={e=>handleRemarkChange(e,item._id)} defaultValue="Select Remark"
                              style={{ ...styles.select,padding:"8px 12px",fontSize:"12px",minWidth:"160px" }}>
                              <option disabled value="Select Remark">Select Remark</option>
                              {["Reminder Issued","DNP","NATC","Not Interested","Cut Call","Default","Cleared","Half_Cleared","Switch Off","Call Back later","Busy","Declined","Need More Time","Reviews are not good","When Batch Starts","No response","False pitch so not intrested","Offer letter issues","Counselor Told To Pay Before Class Start"].map(r=>(
                                <option key={r} value={r}>{r}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))
              ) : (
                <tr><td colSpan={17} style={{ ...styles.tdStyle,textAlign:"center",padding:"60px",color:T.muted }}>No records found for this month.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredStudents.length > itemsPerPage && (
          <div style={{ display:"flex",justifyContent:"center",alignItems:"center",gap:"16px",padding:"20px",borderTop:`1px solid ${T.border}` }}>
            <button onClick={prevPage} disabled={currentPage===1} style={{ ...styles.btnGhost,opacity:currentPage===1?0.4:1,padding:"10px 20px" }}>Previous</button>
            <span style={{ color:T.muted,fontWeight:"600" }}>Page {currentPage} of {totalPages}</span>
            <button onClick={nextPage} disabled={currentPage===totalPages} style={{ ...styles.btnPrimary,opacity:currentPage===totalPages?0.4:1,padding:"10px 20px" }}>Next</button>
          </div>
        )}
      </div>

      {/* ── Details Dialog ── */}
      {dialogVisible && dialogData && (
        <div style={{ position:"fixed",inset:0,zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div onClick={handleDialogClose} style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0.6)" }}/>
          <div style={{ ...styles.card,position:"relative",zIndex:1001,width:"100%",maxWidth:"440px",padding:"36px" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px" }}>
              <h2 style={{ margin:0,fontSize:"20px",fontWeight:"800" }}>Student Details</h2>
              <button onClick={handleDialogClose} style={{ background:"none",border:"none",color:T.muted,cursor:"pointer" }}>{Icons.Close}</button>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:"14px" }}>
              {[["Email",dialogData.email],["Phone",dialogData.phone],["Program",dialogData.program],["Domain Opted",dialogData.domain],["Counselor",dialogData.counselor],["College Name",dialogData.collegeName],["Branch",dialogData.branch],["Aadhar No",dialogData.aadharNumber],["Next Instalment",dialogData.clearPaymentMonth||"N/A"]].map(([k,v])=>(
                <div key={k} style={{ display:"flex",justifyContent:"space-between",gap:"12px",paddingBottom:"12px",borderBottom:`1px solid ${T.border}` }}>
                  <span style={{ color:T.muted,fontSize:"13px",fontWeight:"600" }}>{k}</span>
                  <span style={{ color:T.text,fontSize:"13px",textAlign:"right" }}>{v}</span>
                </div>
              ))}
            </div>
            <button onClick={handleDialogClose} style={{ ...styles.btnGhost,width:"100%",marginTop:"20px",textAlign:"center" }}>Close</button>
          </div>
        </div>
      )}

      <style>{`
        input::placeholder { color: #475569; }
        option { background: #1E293B; color: #F1F5F9; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
};

export default AdvBookedPayment;
