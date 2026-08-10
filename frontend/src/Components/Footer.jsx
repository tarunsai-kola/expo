import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/aiiens_logo.jpeg";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedinIn, FaInstagram, FaTwitter, FaArrowRight, FaGithub } from "react-icons/fa";

const Footer = () => {
  const platformLinks = [
    { label: "Home", to: "/" },
    // { label: "All Programs", to: "/SoftwareDeveloper" },
    { label: "Advanced Programs", to: "/Advance" },
    { label: "Blog", to: "/blog" },
  ];

  const discoverLinks = [];

  const legalLinks = [
    { label: 'Terms of Service', to: '/Terms' },
    { label: 'Privacy Policy', to: '/Privacy' },
    { label: 'Refund Policy', to: '/RefundPolicy' },
  ];

  return (
    <footer className="relative bg-[#EFF6FF] text-[#0F172A] pt-24 pb-8 overflow-hidden border-t border-[#E2E8F0] font-sans mt-auto">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none transform -translate-y-1/2"></div>
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#2563EB]/10 rounded-full blur-[100px] pointer-events-none transform -translate-y-1/2"></div>
      
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="bg-white p-2 rounded-xl border border-[#E2E8F0] group-hover:border-[#E2E8F0] transition-colors">
                <img src={logo} alt="Aiiens Campus" className="h-8 w-auto object-contain" />
              </div>
              <span className="text-2xl font-black tracking-widest text-[#0F172A]">AIIENS CAMPUS</span>
            </Link>
            <p className="text-[#64748B] text-sm leading-relaxed mb-8 max-w-sm">
              Empowering the next generation of engineers with structured learning, expert mentorship, and measured career outcomes. Build the future with Aiiens Campus.
            </p>
            
            <div className="flex gap-3">
              {[
                { icon: <FaLinkedinIn size={16} />, href: '#' },
                { icon: <FaInstagram size={16} />, href: '#' },
                { icon: <FaTwitter size={16} />, href: '#' },
                { icon: <FaGithub size={16} />, href: '#' },
              ].map((s, i) => (
                <a key={i} href={s.href} 
                   className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#2563EB] hover:bg-[#DBEAFE] hover:border-[#2563EB] transition-all transform hover:-translate-y-1">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-[#0F172A] font-bold mb-6 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-4">
              {platformLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-[#64748B] hover:text-[#2563EB] text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>



          {/* Contact */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h4 className="text-[#0F172A] font-bold mb-6 text-sm uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-5">
              <a href="mailto:support@Aiiens Campus.com" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB] transition-all shrink-0">
                  <FaEnvelope size={14} />
                </div>
                <div>
                  <div className="text-xs text-[#64748B] font-medium mb-1">Email</div>
                  <div className="text-[#475569] text-sm group-hover:text-[#0F172A] transition-colors">support@Aiiens Campus.com</div>
                </div>
              </a>
              
              <a href="tel:+917829104024" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB] transition-all shrink-0">
                  <FaPhoneAlt size={14} />
                </div>
                <div>
                  <div className="text-xs text-[#64748B] font-medium mb-1">Phone</div>
                  <div className="text-[#475569] text-sm group-hover:text-[#0F172A] transition-colors">+91 9014110638</div>
                </div>
              </a>
              
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB] transition-all shrink-0">
                  <FaMapMarkerAlt size={14} />
                </div>
                <div>
                  <div className="text-xs text-[#64748B] font-medium mb-1">Office</div>
                  <div className="text-[#475569] text-sm group-hover:text-[#0F172A] transition-colors">Vizianagaram, AP, India</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#E2E8F0] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#64748B] text-sm">
            © {new Date().getFullYear()} Aiiens Campus. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {legalLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-[#64748B] hover:text-[#0F172A] text-sm transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
