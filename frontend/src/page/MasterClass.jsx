import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from "react";
import HomePopup from "../Components/HomePopup";
import { Link, useNavigate } from "react-router-dom";
import API from "../API";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
import img from "../assets/atorax_certificate.png";
import imghero from "../assets/masterclass.jpeg";
import imgalt from "../assets/defaultmasterclass.jpg";
import Popularcourse from "../Components/popularcourse";

import dsPoster from "../../atorax/images/poster/datascience.png";
import mernPoster from "../../atorax/images/poster/mern.png";
import pmPoster from "../../atorax/images/poster/productmanagement.png";

const MasterClass = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);
  const [isRegisterForm, setisRegisterForm] = useState(false);
  const [isDownloadForm, setisDownloadForm] = useState(false);
  const [allMasterClass, setallMasterClass] = useState([]);
  const [upcomingMasterClass, setUpcomingMasterClass] = useState([]);
  const [ongoingMasterClass, setOngoingMasterClass] = useState([]);
  const [completedMasterClass, setCompletedMasterClass] = useState([]);
  const [selectedMasterClass, setSelectedMasterClass] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    field: "",
    phone: "",
  });
  const faqs = [
    {
      question: "How do I register for the masterclass?",
      answer:
        "Simply click the Register Now button and fill in your required details and join the community group.",
    },
    {
      question: "Will I receive a certificate?",
      answer:
        "Yes! After completing a MasterClass, you will receive a certificate of completion.",
    },
    {
      question: "Do I need to pay any fees?",
      answer:
        "Our MasterClasses are free of cost, making learning accessible to everyone.",
    },
    {
      question: "Can I interact with the mentor?",
      answer:
        "Yes! Our sessions are live and interactive, allowing you to ask questions and engage with mentors.",
    },
    {
      question: "What are the technical requirements to attend?",
      answer:
        "A stable internet connection, a laptop or mobile device, and a willingness to learn!",
    },
    {
      question: "How do I access the Masterclass session link?",
      answer:
        "Once registered, you will receive the session link via email before the class starts even you will be added community group.",
    },
  ];
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const closeForm = () => {
    setisRegisterForm(false);
    setisDownloadForm(false);
    setSelectedMasterClass(null);
    setFormData({
      name: "",
      email: "",
      experience: "",
      field: "",
      phone: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "email" ? value.toLowerCase() : value,
    });
  };

  const fetchMasterclass = async () => {
    try {
      const response = await axios.get(`${API}/allmasterclasswithsapplicant`);
      setallMasterClass(
        response.data.filter(
          (item) => item.status === "upcoming" || item.status === "ongoing"
        )
      );
      setUpcomingMasterClass(
        response.data.filter((item) => item.status === "upcoming")
      );
      setOngoingMasterClass(
        response.data.filter((item) => item.status === "ongoing")
      );
      setCompletedMasterClass(
        response.data.filter((item) => item.status === "completed")
      );
    } catch (error) {
      console.error("There was an error fetching MasterClass:", error);
    }
  };

  useEffect(() => {
    fetchMasterclass();
  }, []);

  const handleApply = async (masterClass) => {
    setSelectedMasterClass(masterClass);
    setisRegisterForm(true);
  };

  const handleDownload = async (masterClass) => {
    setSelectedMasterClass(masterClass);
    setisDownloadForm(true);
  };

  const downloadCertificate = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    // console.log("Submitted Email:", email);
    // console.log("Submitted id:", selectedMasterClass);
    try {
      const response = await axios.get(
        `${API}/masterclassauth/${selectedMasterClass._id}/${email}`
      );
      const certificateData = response.data;
      // console.log("final",response.data);
      setisDownloadForm(false);
      setSelectedMasterClass(null);

      if (!certificateData.certificate) {
        throw new Error("Certificate not available");
      }

      // console.log("masteruser", certificateData.certificate);

      // Fetch the image as blob to force download
      const imageResponse = await fetch(certificateData.certificate);
      const blob = await imageResponse.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "certificate.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
      toast.success("Certificate downloaded successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/masterclassapply/${selectedMasterClass._id}`,
        formData
      );
      toast.success("Successfully Applied! Join our Community group");
      setTimeout(() => {
        window.open(selectedMasterClass.link, "_blank");
      }, 3000);
      fetchMasterclass();
      closeForm();
    } catch (error) {
      console.error("Error applying for MasterClass", error);
      toast.error(
        error.response?.data?.message || "Error applying for MasterClass"
      );
    }
  };

  const handleShare = async (masterclass) => {
    const slug = masterclass?.title ? slugify(masterclass.title) : "";
    const shareUrl = slug ? `${window.location.origin}/MasterClass/${slug}` : `${window.location.origin}/mentorship`;
    let shared = false;
    if (navigator.share) {
      try {
        await navigator.share({
          title: masterclass?.title || 'Atorax Masterclass',
          text: `Check out this Masterclass: ${masterclass?.title || ""}`,
          url: shareUrl,
        });
        shared = true;
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
    if (!shared) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareUrl);
          toast.success("Masterclass link copied to clipboard!");
        } else {
          throw new Error("Clipboard API not available");
        }
      } catch (err) {
        try {
          const textArea = document.createElement("textarea");
          textArea.value = shareUrl;
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          document.body.appendChild(textArea);
          textArea.select();
          const successful = document.execCommand("copy");
          document.body.removeChild(textArea);
          if (successful) {
            toast.success("Masterclass link copied to clipboard!");
          } else {
            throw new Error("execCommand copy failed");
          }
        } catch (fallbackErr) {
          console.error("Failed to copy link:", fallbackErr);
          toast.error("Failed to copy link.");
        }
      }
    }
  };

  const activeMasterClasses = [...allMasterClass].sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );

  const latestCompletedMasterClass = [...completedMasterClass]
    .sort((a, b) => new Date(b.end) - new Date(a.end))
    .slice(0, 2);

  const formatClassDate = (dateValue) =>
    new Date(dateValue).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatClassDateTime = (dateValue) =>
    new Date(dateValue).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const formatClassDateScaler = (dateValue) => {
    const d = new Date(dateValue);
    const day = d.getDate();
    const suffix = (dayVal) => {
      if (dayVal > 3 && dayVal < 21) return 'th';
      switch (dayVal % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    };
    const month = d.toLocaleDateString("en-US", { month: "short" });
    const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
    return `${day}${suffix(day)} ${month}, ${weekday}`;
  };

  const formatClassTimeScaler = (dateValue, durationStr) => {
    const d = new Date(dateValue);
    const startStr = d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const parsedDur = parseInt(durationStr) || 90;
    const end = new Date(d.getTime() + parsedDur * 60000);
    const endStr = end.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${startStr} - ${endStr}`;
  };

  const slugify = (text) => {
    if (!text) return "";
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  };

  // Converts any Google Drive share link to an embeddable image URL
  const convertGoogleDriveUrl = (url) => {
    if (!url || typeof url !== "string") return url;
    const trimmed = url.trim();
    if (trimmed.includes("lh3.googleusercontent.com")) return trimmed;
    const fileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([^/?&#]+)/);
    if (fileMatch) {
      return `https://lh3.googleusercontent.com/d/${fileMatch[1]}`;
    }
    const idMatch = trimmed.match(/[?&]id=([^&#]+)/);
    if (idMatch && trimmed.includes("drive.google.com")) {
      return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
    }
    return trimmed;
  };

  return (
    <div id="MasterClass">
      <Helmet>
        <title>Atorax MasterClass | Upskill in Tech, Coding & AI</title>
        <meta
          name="keywords"
          content="e-learning, Atorax MasterClass, coding, data science, AI courses, tech upskilling, online mentorship"
        />
        <meta
          name="description"
          content="Join Atorax MasterClass to learn top tech skills from industry leaders. Master coding, data science, AI, and more with hands-on learning and mentorship."
        />

        <meta
          property="og:title"
          content="Atorax MasterClass | Upskill in Tech, Coding & AI"
        />
        <meta
          property="og:url"
          content="https://www.atorax.com/MasterClass"
        />
        <meta
          property="og:image"
          content="https://www.atorax.com/assets/LOGO3-Do06qODb.png"
        />
        <meta
          property="og:description"
          content="Join Atorax MasterClass to learn top tech skills from industry leaders. Master coding, data science, AI, and more with hands-on learning and mentorship."
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary" />
        <meta
          property="twitter:title"
          content="Atorax MasterClass | Upskill in Tech, Coding & AI"
        />
        <meta
          name="twitter:image"
          content="https://www.atorax.com/assets/LOGO3-Do06qODb.png"
        />
        <meta
          property="twitter:description"
          content="Join Atorax MasterClass to learn top tech skills from industry leaders. Master coding, data science, AI, and more with hands-on learning and mentorship."
        />

        <link rel="canonical" href="https://www.atorax.com/MasterClass" />
      </Helmet>

      <Toaster position="top-center" reverseOrder={false} />
      

      {/* V3 Trust-First Layout */}
      <div className="mc-v3-hero-wrapper">
        <section className="mc-v3-hero">
          <div className="mc-hero-tag">
            <i className="fa fa-bolt"></i> Elevate Your Career
          </div>
          <h1>Master Tech with<br/><span>Top Experts</span></h1>
          <p>
            Join Atorax MasterClass to learn directly from industry engineers. 
            Free, interactive, and career-focused sessions in AI, Data Science, and Full Stack.
          </p>
          <div className="mc-hero-actions">
            <a href="#active-classes" className="mc-btn-solid">Explore Classes</a>
            <a href="#why-join" className="mc-btn-light-outline"><i className="fa fa-play"></i> Why Join Us?</a>
          </div>
        </section>
      </div>

      <div className="mc-shell">
        {/* V3 Trust Bar */}
        <section className="mc-trust-bar">
          <div className="mc-trust-stat">
            <strong>10K+</strong>
            <span>Learners</span>
          </div>
          <div className="mc-trust-stat">
            <strong>4.8</strong>
            <span>Average Rating</span>
          </div>
          <div className="mc-trust-stat">
            <strong>{(upcomingMasterClass?.length || 0) + (ongoingMasterClass?.length || 0)}</strong>
            <span>Active Classes</span>
          </div>
          <div className="mc-trust-stat">
            <strong>{completedMasterClass?.length || 0}</strong>
            <span>Completed Sessions</span>
          </div>
        </section>

        <section className="mc-classes" id="active-classes">
          <div className="mc-section-header">
            <h2>Active Classes</h2>
            <p>Practical masterclasses led by industry professionals.</p>
          </div>
          <div className="mc-grid-v3">
            {activeMasterClasses.map((masterclass) => {
              const titleLower = masterclass.title.toLowerCase();
              
              const mRegisteredCount = masterclass.registeredCount || "3,840+";

              return (
                <article 
                  className="mc-card-v3"
                  key={masterclass._id}
                >
                  <div className="mc-card-v3-img" onClick={() => { if (masterclass.status !== "completed") navigate(`/MasterClass/${slugify(masterclass.title)}`); }}>
                    <img
                      src={convertGoogleDriveUrl(masterclass.image)}
                      alt={masterclass.title}
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"; }}
                    />
                    <span className={`mc-status-badge bg-${masterclass.status}`}>
                      {masterclass.status}
                    </span>
                  </div>

                  <div className="mc-card-v3-body">
                    <div className="mc-card-v3-tag">
                      <i className="fa fa-fire"></i>
                      {masterclass.registeredCount ? masterclass.registeredCount : ( (95 + (masterclass._id ? [...masterclass._id.toString()].reduce((a, c) => a + c.charCodeAt(0), 0) % 60 : 0)) + (masterclass.applications || 0) )} Registered
                    </div>
                    
                    <h3>{masterclass.title}</h3>

                    <div className="mc-card-v3-meta">
                      <div className="mc-meta-item">
                        <span>Starts On</span>
                        <strong>{new Date(masterclass.start).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
                      </div>
                      <div className="mc-meta-item">
                        <span>Time</span>
                        <strong>{formatClassTimeScaler(masterclass.start, masterclass.duration)}</strong>
                      </div>
                    </div>

                    <div className="mc-card-v3-actions">
                      <button
                        className="mc-btn-block primary"
                        onClick={() => masterclass.status === "completed" ? handleDownload(masterclass) : navigate(`/MasterClass/${slugify(masterclass.title)}`)}
                      >
                        {masterclass.status === "completed" ? "Get Certificate" : "View More"}
                      </button>
                      <button
                        className="mc-btn-icon"
                        onClick={() => handleShare(masterclass)}
                        title="Share Mentorship Link"
                      >
                        <i className="fa fa-share-alt"></i>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <div id="why-join" className="mc-web-media flex flex-col mt-16 mb-16">
          <div className="mc-section-header">
            <h2>Why Choose Atorax</h2>
            <p>We focus on real outcomes, not just theory.</p>
          </div>
          
          <div className="mc-why-grid">
            <div className="mc-why-card">
              <div className="mc-why-icon"><i className="fa fa-globe"></i></div>
              <h3>Designed for the AI Era</h3>
              <p>Learn bleeding-edge technologies and frameworks that are highly demanded in top tier product companies worldwide.</p>
            </div>
            <div className="mc-why-card">
              <div className="mc-why-icon"><i className="fa fa-certificate"></i></div>
              <h3>Verified Certificate</h3>
              <p>Get recognized by top recruiters with our official completion certificate.</p>
            </div>
            <div className="mc-why-card">
              <div className="mc-why-icon"><i className="fa fa-video-camera"></i></div>
              <h3>100% Live</h3>
              <p>No pre-recorded boring lectures. Real-time interaction and Q&A.</p>
            </div>
          </div>
          
          <div className="mc-why-grid" style={{marginTop: '24px'}}>
            <div className="mc-why-card">
              <div className="mc-why-icon"><i className="fa fa-magic"></i></div>
              <h3>Top Instructors</h3>
              <p>Mentored by engineers from FAANG and high-growth startups.</p>
            </div>
            <div className="mc-why-card">
              <div className="mc-why-icon"><i className="fa fa-book"></i></div>
              <h3>Bonus Resources</h3>
              <p>Get access to exclusive mindmaps, cheat sheets, and code repositories.</p>
            </div>
             <div className="mc-why-card">
              <div className="mc-why-icon"><i className="fa fa-question-circle-o"></i></div>
              <h3>Live Quizzes</h3>
              <p>Test your knowledge immediately during the class and get instant feedback.</p>
            </div>
          </div>

          <section className="mt-16">
            <div className="w-full max-w-5xl mx-auto rounded-[24px] overflow-hidden border border-[#e2e8f0] bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-stretch">
              <div className="w-full md:w-1/2 p-10 flex flex-col justify-center text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-6 w-max border border-blue-100">
                  <i className="fa fa-shield"></i> Official Credential
                </div>
                <h2 className="text-3xl font-extrabold text-[#0f172a] mb-4 tracking-tight" style={{ letterSpacing: '-0.03em' }}>Certified Excellence</h2>
                <p className="text-[#475569] mb-8 leading-relaxed">
                  Validate your expertise with an industry-recognized certificate. Share your success directly to LinkedIn and stand out to top recruiters.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-[#0f172a] font-medium"><i className="fa fa-check-circle text-[#059669] text-lg"></i> Verifiable Unique URL</li>
                  <li className="flex items-center gap-3 text-[#0f172a] font-medium"><i className="fa fa-check-circle text-[#059669] text-lg"></i> 1-Click LinkedIn Integration</li>
                  <li className="flex items-center gap-3 text-[#0f172a] font-medium"><i className="fa fa-check-circle text-[#059669] text-lg"></i> High-Resolution PDF</li>
                </ul>
              </div>
              <div className="w-full md:w-1/2 bg-[#f8fafc] flex items-center justify-center p-8 md:p-12 border-t md:border-t-0 md:border-l border-[#e2e8f0] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent opacity-70"></div>
                <img 
                  src={img} 
                  alt="Certificate preview" 
                  className="w-full h-48 md:h-64 object-cover object-top rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),_0_4px_6px_-4px_rgba(0,0,0,0.05)] transform hover:scale-[1.03] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative z-10 border border-[#e2e8f0]" 
                />
              </div>
            </div>
          </section>
        </div>

        {/* <section className="mc-industrial-video">
          <div className="mc-section-head">
            <h2>Industrial Talk Session</h2>
          </div>
          <div className="mc-industrial-video-card">
            <a
              className="mc-industrial-thumb-link"
              href="https://drive.google.com/file/d/15rAhofL6ei6Gxy9fHRrkcjXB4SMGMzft/preview"
              target="_blank"
              rel="noreferrer"
              aria-label="Open industrial talk session"
            >
              <img
                src="/course_thumbnails/industrytalksession.jpg"
                alt="Industrial Talk Session Thumbnail"
                className="mc-industrial-thumb"
              />
              <span className="mc-industrial-thumb-play">
                <i className="fa fa-play"></i>
              </span>
            </a>
            <div className="mc-industrial-video-text">
              <h3>Podcast on Career Advancement</h3>
              <p>
                With Karam Dharmanandra Singh, manager at BOSCH. Learn how
                product teams operate and how to prepare for industry projects.
              </p>
            </div>
          </div>
        </section> */}



        {completedMasterClass.length > 0 && (
          <section className="mc-completed-catalog">
            <div className="mc-section-header">
              <h2>Completed Masterclasses</h2>
              <p>Watch recordings of our past highly-rated sessions.</p>
            </div>
            <div className="mc-grid-v3">
              {[...completedMasterClass].reverse().map((masterclass) => (
                <article className="mc-card-v3" key={masterclass._id}>
                  <div className="mc-card-v3-img">
                    <img
                      src={convertGoogleDriveUrl(masterclass.image)}
                      alt={masterclass.title}
                      onError={(e) => (e.target.src = imgalt)}
                    />
                    <span className="mc-status-badge bg-completed">Completed</span>
                  </div>
                  <div className="mc-card-v3-body">
                    <h3>{masterclass.title}</h3>
                    <div className="mc-card-v3-meta">
                      <div className="mc-meta-item">
                        <span>Date</span>
                        <strong>{formatClassDate(masterclass.end)}</strong>
                      </div>
                      <div className="mc-meta-item">
                        <span>Participants</span>
                        <strong>{masterclass.applications?.length || masterclass.applications || 0}</strong>
                      </div>
                    </div>
                    {masterclass.pdfstatus && (
                      <div className="mc-card-v3-actions mt-auto">
                        <button className="mc-btn-block primary" onClick={() => handleDownload(masterclass)}>Get Certificate</button>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="mc-faq">
          <div className="mc-section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about the masterclass.</p>
          </div>
          <div className="mc-faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className={`mc-faq-item ${openIndex === index ? 'active' : ''}`}>
                <button className="mc-faq-btn" onClick={() => toggleFAQ(index)}>
                  <span>{faq.question}</span>
                  <i className={`fa ${openIndex === index ? "fa-minus" : "fa-plus"}`}></i>
                </button>
                {openIndex === index && (
                  <div className="mc-faq-content">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
      {/* Registration Form */}
      {isRegisterForm && selectedMasterClass && (
        <div id="registrationform">
          <div className="form">
            <div className="close">
              <h3>Register NOW!</h3>
              <span className="fa fa-close" onClick={closeForm}></span>
            </div>
            <h3 className="title">{selectedMasterClass.title}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                placeholder="Personal Email id"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Work experience (Years)</option>
                <option value="0-2">0-2</option>
                <option value="2-4">2-4</option>
                <option value="4-6">4-6</option>
                <option value="6-8">6+</option>
                
              </select>
              <input
                type="text"
                placeholder="In which field are you currently working"
                name="field"
                value={formData.field}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="WhatsApp Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input className="submitbtn" type="submit" value="SUBMIT" />
              <p>
                <span>NOTE : </span>Enter your details carefully, they will
                appear on your certificate.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Certificate Download Form */}
      {isDownloadForm && selectedMasterClass && (
        <div id="registrationform">
          <div className="form">
            <div className="close">
              <h3>Download Certificate!</h3>
              <span className="fa fa-close" onClick={closeForm}></span>
            </div>
            <h3 className="title">{selectedMasterClass.title}</h3>
            <form onSubmit={downloadCertificate}>
              <input
                type="email"
                name="email"
                placeholder="Personal Email id"
                required
              />
              <input className="submitbtn" type="submit" value="SUBMIT" />
              <p>
                <span>NOTE : </span>Please enter the same Email that you used
                during registration.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterClass;
