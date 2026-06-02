import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import toast, { Toaster } from "react-hot-toast";
import { FaWhatsapp, FaUserAstronaut, FaEnvelope, FaPhone, FaBuilding, FaBriefcase, FaGraduationCap, FaChevronDown, FaCheck, FaTimes } from "react-icons/fa";

const Dialog = ({ isOpen, onClose, fullname, errorMessage, email, counselor, domain, monthOpted }) => {
  if (!isOpen) return null;

  // Create WhatsApp message with user details
  const whatsappMessage = `Hello,\n I am ${fullname}.\n Email: ${email}.\n Domain: ${domain}.\n Opted Month: ${monthOpted}.\n Kindly confirm my details`;
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-[#11111a] border border-white/10 p-8 rounded-3xl w-full max-w-md text-center shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <FaTimes size={20} />
        </button>
        
        {errorMessage ? (
          <div>
            <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30">
              <FaTimes size={30} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{errorMessage}</h2>
            <p className="text-sm text-gray-400 mt-2">
              NOTE: If you have any doubt, feel free to contact your counselor for more details.
            </p>
          </div>
        ) : (
          <div>
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <FaCheck size={30} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              Thank you for registering!
            </h3>
            <h3 className="mb-4 text-emerald-400 font-bold">
              Welcome to Atorax Advance Program
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your advance program dashboard access form has been submitted successfully.
            </p>
            {/* <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-2xl text-left">
              <p className="text-sm text-gray-300 mb-4">
                <strong className="text-white block mb-1">Next Steps:</strong> Please contact your assigned operations executive:<br />
                <span className="text-blue-400 font-semibold block mt-2">Bhumika HK</span>
                <span>bhumika@atorax.org</span>
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] font-bold text-sm"
              >
                <FaWhatsapp size={18} />
                Contact on WhatsApp
              </a>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}

const InputField = ({ label, type = "text", value, onChange, required, disabled }) => (
  <div className="space-y-1.5 group">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{label}</label>
    <input
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, required }) => (
  <div className="space-y-1.5 group">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{label}</label>
    <div className="relative">
      <select
        required={required}
        value={value}
        onChange={onChange}
        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
      >
        <option value="" disabled className="bg-[#11111a] text-gray-400">Select {label}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value} className="bg-[#11111a] text-white py-2">
            {opt.label}
          </option>
        ))}
      </select>
      <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xs" />
    </div>
  </div>
);

const AdvanceDashboardAccess = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // Helper function to format name to Title Case
  const toTitleCase = (value) => {
    if (!value) return "";
    const endsWithSpace = value.endsWith(" ");
    const formatted = value
      .split(/\s+/)
      .filter((word) => word.length > 0)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    return endsWithSpace ? formatted + " " : formatted;
  };

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [counselor, setCounselor] = useState("");
  const [domain, setDomain] = useState("");
  const [programPrice, setProgramPrice] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [monthOpted, setMonthOpted] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clearPaymentMonth, setClearPaymentMonth] = useState("");
  const [modeofpayment, setModeOfPayment] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [remainingAmount, setRemainingAmount] = useState("");
  const [experience, setExperience] = useState("");
  const [paymentPlan, setPaymentPlan] = useState("");
  const [numberOfInstallments, setNumberOfInstallments] = useState("");
  const [referFriend, setReferFriend] = useState("");
  const [yearOfPassingOut, setYearOfPassingOut] = useState("");
  const [course, setCourse] = useState([]);
  const [lead, setLead] = useState("");
  const [languages, setLanguages] = useState(["English"]);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [batchTiming, setBatchTiming] = useState("");

  const LANGUAGE_OPTIONS = ["English", "Hindi", "Kannada", "Telugu", "Tamil", "Malayalam", "Bengali"];
  const [monthsToShow, setMonthsToShow] = useState([]);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth(); 
    const currentYear = currentDate.getFullYear();
    const nextMonthIndex = (currentMonthIndex + 1) % 12;
    const nextMonthYear = currentMonthIndex + 1 > 11 ? currentYear + 1 : currentYear;

    setMonthsToShow([
      `${monthNames[currentMonthIndex]} ${currentYear}`,
      `${monthNames[nextMonthIndex]} ${nextMonthYear}`,
    ]);
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API}/getadvcourses`);
      setCourse(response.data);
    } catch (error) {
      console.error("There was an error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const navigate = useNavigate();
  const resetForm = () => {
    setFullname("");
    setEmail("");
    setPhone("");
    setWhatsAppNumber("");
    setCounselor("");
    setDomain("");
    setProgramPrice("");
    setPaidAmount("");
    setRemainingAmount("");
    setMonthOpted("");
    setTransactionId("");
    setExperience("");
    setPaymentPlan("");
    setNumberOfInstallments("");
    setClearPaymentMonth("");
    setModeOfPayment("");
    setReferFriend("");
    setYearOfPassingOut("");
    setLanguages(["English"]);
    setCompanyName("");
    setRole("");
    setBatchTiming("");
    navigate("/advancedashboardaccess");
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const getInstallmentDates = () => {
    if (paymentPlan !== "Installments" || !numberOfInstallments) return [];
    const count = parseInt(numberOfInstallments, 10);
    const dates = [];
    let current = new Date();
    for (let i = 0; i < count; i++) {
      current.setDate(current.getDate() + 20);
      dates.push(current.toISOString().split("T")[0]);
    }
    return dates;
  };

  const handleSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();

    const calculatedDates = getInstallmentDates();
    let finalClearPaymentMonth = clearPaymentMonth;
    if (paymentPlan === "Installments" && calculatedDates.length > 0) {
      finalClearPaymentMonth = calculatedDates.join(", ");
    }
    
    const finalPaymentPlan = paymentPlan === "Installments" 
      ? `Pay in ${numberOfInstallments} Installments` 
      : paymentPlan;

    const formData = {
      fullname,
      email: email.trim(),
      phone,
      counselor: counselor.trim(),
      domain: domain.trim(),
      programPrice,
      paidAmount,
      monthOpted,
      transactionId,
      clearPaymentMonth: finalClearPaymentMonth,
      modeofpayment,
      whatsAppNumber,
      remainingAmount,
      experience,
      paymentPlan: finalPaymentPlan,
      referFriend,
      yearOfPassingOut,
      lead: lead.trim(),
      languages,
      companyName,
      role,
      program: domain.trim(),
      batchTiming
    };

    if (isEmailVerified) {
      try {
        let response = await axios.post(`${API}/advenroll`, formData);
        if (response.status === 200 || response.status === 201) {
          setIsModalOpen(true);
        } else {
          toast.error("Error submitting the form.");
          resetForm();
        }
      } catch (error) {
        let errMessage = "An error occurred.";
        if (error.response) {
          errMessage = error.response.data?.message || error.response.data?.error || "An error occurred while processing your request.";
        } else if (error.request) {
          errMessage = "No response from the server. Please try again later.";
        }
        if (errMessage.toString().toLowerCase().includes("already submitted")) {
          errMessage = "You have already submitted your details.";
        }
        setErrorMessage(errMessage);
        setIsModalOpen(true);
        setIsSubmitting(false);
      }
    } else {
      toast.error("Please enter a valid registered email.");
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleEmailChange = async (e) => {
    const enteredEmail = e.target.value.trim();
    setEmail(enteredEmail);
    setIsEmailVerified(false); 

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(enteredEmail)) {
      try {
        const response = await axios.post(`${API}/verify-transaction-email`, { email: enteredEmail });
        if (response.data.success) {
          setCounselor(response.data.counselor || "");
          setLead(response.data.lead || "");
          setIsEmailVerified(true);
        }
      } catch (error) {
        setCounselor("");
        setLead("");
        setIsEmailVerified(false);
      }
    } else {
      setCounselor("");
      setLead("");
    }
  };

  return (
    <div className="min-h-screen bg-[#05050A] text-gray-300 font-sans relative overflow-hidden pb-24 pt-20">
      <Toaster position="top-center" reverseOrder={false} toastOptions={{
        style: { background: '#1e1e2d', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }
      }} />

      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none transform -translate-y-1/2 -translate-x-1/4"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none transform translate-y-1/3 translate-x-1/4"></div>

      <div className="max-w-[1000px] mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center p-4 bg-white/5 border border-white/10 rounded-2xl mb-6 text-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.15)]">
            <FaUserAstronaut size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Advance Program <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Access Form</span>
          </h1>
          
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-4 max-w-3xl mx-auto backdrop-blur-md">
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              <strong className="text-blue-400 font-bold">Kind Reminder:</strong> Please ensure that you complete this form on the <strong>same day your payment is made</strong>. Submissions will not be accepted later, and access will not be granted if the form is delayed.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-[32px] p-6 md:p-12 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <InputField label="Full Name" value={fullname} onChange={(e) => setFullname(toTitleCase(e.target.value))} required />
              
              <div className="space-y-1.5 group relative">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 transition-all text-sm ${
                    email && isEmailVerified ? 'border-emerald-500/50 focus:border-emerald-500 focus:ring-emerald-500' : 
                    email && !isEmailVerified ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500' : 
                    'border-white/10 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                />
                {email && (
                  <div className="absolute right-3 top-[34px]">
                    {isEmailVerified ? <FaCheck className="text-emerald-500" /> : <div className="w-4 h-4 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>}
                  </div>
                )}
              </div>

              <InputField label="Contact No" type="number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <InputField label="Whatsapp Number" type="number" value={whatsAppNumber} onChange={(e) => setWhatsAppNumber(e.target.value)} required />
              <InputField label="Counselor Name" value={counselor} onChange={(e) => setCounselor(e.target.value)} required />
              
              <SelectField 
                label="Mode of Payment" 
                value={modeofpayment} 
                onChange={(e) => setModeOfPayment(e.target.value)} 
                required
                options={[
                  {value: 'RazorPay', label: 'RazorPay'},
                  {value: 'QR Code', label: 'QR Code'},
                  {value: 'EaseBuZZ', label: 'EaseBuZZ'},
                  {value: 'PayPal', label: 'PayPal'},
                  {value: 'Credit Card', label: 'Credit Card'},
                  {value: 'Debit Card', label: 'Debit Card'}
                ]} 
              />

              <SelectField 
                label="Opted Domain" 
                value={domain} 
                onChange={(e) => setDomain(e.target.value)} 
                required
                options={course.filter((item) => item.show === true).map(c => ({value: c.title, label: c.title}))}
              />

              <SelectField 
                label="Opted Month" 
                value={monthOpted} 
                onChange={(e) => setMonthOpted(e.target.value)} 
                required
                options={monthsToShow.map(m => ({value: m, label: m}))}
              />

              <InputField label="Program Price (₹)" type="number" value={programPrice} onChange={(e) => setProgramPrice(e.target.value)} required />
              <InputField label="Paid Amount (₹)" type="number" value={paidAmount} onChange={(e) => setPaidAmount(e.target.value)} required />
              <InputField label="Remaining Amount (₹)" type="number" value={remainingAmount} onChange={(e) => setRemainingAmount(e.target.value)} required />

              <SelectField 
                label="Payment Plan" 
                value={paymentPlan} 
                onChange={(e) => setPaymentPlan(e.target.value)} 
                required
                options={[
                  {value: 'Pay in Full (One-time payment)', label: 'Pay in Full (One-time)'},
                  {value: 'Installments', label: 'Installments'},
                  {value: 'No Cost EMI', label: 'No Cost EMI'}
                ]} 
              />

              {paymentPlan === "Installments" && (
                <SelectField 
                  label="No. of Installments" 
                  value={numberOfInstallments} 
                  onChange={(e) => setNumberOfInstallments(e.target.value)} 
                  required
                  options={[
                    {value: '3', label: '3 Installments'},
                    {value: '4', label: '4 Installments'},
                    {value: '5', label: '5 Installments'},
                    {value: '6', label: '6 Installments'}
                  ]} 
                />
              )}

              <InputField label="Year of Passing Out" type="number" value={yearOfPassingOut} onChange={(e) => setYearOfPassingOut(e.target.value)} required />
              <InputField label="Company Name (if working)" value={companyName} onChange={(e) => setCompanyName(toTitleCase(e.target.value))} />
              <InputField label="Role (if working)" value={role} onChange={(e) => setRole(toTitleCase(e.target.value))} />
              <InputField label="Total Experience (Years)" type="number" value={experience} onChange={(e) => setExperience(e.target.value)} required />
              <InputField label="Transaction ID" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} required />

              {/* Custom Language Dropdown */}
              <div className="space-y-1.5 group relative col-span-1 md:col-span-2 lg:col-span-1 z-20">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Languages Known</label>
                <div 
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white cursor-pointer flex justify-between items-center transition-all text-sm min-h-[46px]"
                >
                  <span className={`truncate pr-4 ${languages.length === 0 ? 'text-gray-500' : ''}`}>
                    {languages.length > 0 ? languages.join(", ") : "Select Languages"}
                  </span>
                  <FaChevronDown className={`text-gray-500 text-xs transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {isLangDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsLangDropdownOpen(false)}></div>
                    <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#11111a] border border-white/10 rounded-xl shadow-2xl max-h-60 overflow-y-auto backdrop-blur-xl">
                      {LANGUAGE_OPTIONS.map((lang) => (
                        <div
                          key={lang}
                          onClick={() => {
                            setLanguages((prev) =>
                              prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
                            );
                          }}
                          className="flex items-center px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
                        >
                          <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors ${
                            languages.includes(lang) ? "bg-blue-600 border-blue-600" : "border-white/20"
                          }`}>
                            {languages.includes(lang) && <FaCheck size={10} className="text-white" />}
                          </div>
                          <span className={`text-sm ${languages.includes(lang) ? 'text-white' : 'text-gray-400'}`}>{lang}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Installment Info Box */}
            {paymentPlan === "Installments" && numberOfInstallments && (
              <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-6 animate-in fade-in duration-300">
                <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
                  <FaCheck size={14} /> Scheduled Installment Dates
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {getInstallmentDates().map((date, index) => (
                    <div key={index} className="bg-black/30 border border-white/5 rounded-lg px-4 py-2 text-sm text-gray-300">
                      <span className="text-gray-500 mr-2">#{index + 1}</span> {new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Refer a Friend */}
            <div className="space-y-1.5 group pt-4 border-t border-white/10">
              <label className="text-sm font-bold text-gray-200 ml-1">Refer your friends to earn cashback.</label>
              <p className="text-xs text-gray-500 ml-1 mb-2">Provide their Name and Contact Number</p>
              <textarea
                value={referFriend}
                onChange={(e) => setReferFriend(e.target.value)}
                rows={3}
                required
                placeholder="E.g., John Doe - 9876543210"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting || !isEmailVerified}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-base tracking-wide transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Submitting Application...
                  </>
                ) : (
                  "Submit Dashboard Access Form"
                )}
              </button>
            </div>

          </form>
        </div>

        <Dialog
          isOpen={isModalOpen}
          onClose={closeModal}
          fullname={fullname}
          email={email}
          counselor={counselor}
          domain={domain}
          monthOpted={monthOpted}
          errorMessage={errorMessage}
        />

      </div>
    </div>
  );
};

export default AdvanceDashboardAccess;
