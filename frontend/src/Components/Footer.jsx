import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/LOGO3.png";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedinIn, FaInstagram, FaTwitter, FaArrowRight, FaGithub } from "react-icons/fa";

const Footer = () => {
  const platformLinks = [
    { label: "Home", to: "/" },
    { label: "All Programs", to: "/SoftwareDeveloper" },
    { label: "Advanced Programs", to: "/Advance" },
    { label: "Masterclass", to: "/MasterClass" },
    { label: "Free Assessment", to: "/free-career-assessment" },
  ];

  const discoverLinks = [];

  const legalLinks = [
    { label: 'Terms of Service', to: '/Terms' },
    { label: 'Privacy Policy', to: '/Privacy' },
    { label: 'Refund Policy', to: '/RefundPolicy' },
  ];

  return (
    <footer className="relative bg-[#05050A] text-white pt-24 pb-8 overflow-hidden border-t border-white/10 font-sans mt-auto">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none transform -translate-y-1/2"></div>
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none transform -translate-y-1/2"></div>
      
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* Top Section: CTA / Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white/[0.02] border border-white/5 rounded-2xl p-8 mb-16 backdrop-blur-sm">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">Ready to accelerate your career?</h3>
            <p className="text-gray-400 text-sm">Join the top 1% of tech professionals today.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/free-career-assessment" className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transform hover:-translate-y-1 flex items-center gap-2">
              Get Free Assessment <FaArrowRight size={12} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="bg-white/5 p-2 rounded-xl border border-white/10 group-hover:border-white/20 transition-colors">
                <img src={logo} alt="Atorax" className="h-8 w-auto object-contain" />
              </div>
              <span className="text-2xl font-black tracking-widest text-white">ATORAX</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Empowering the next generation of engineers with structured learning, expert mentorship, and measured career outcomes. Build the future with Atorax.
            </p>
            
            <div className="flex gap-3">
              {[
                { icon: <FaLinkedinIn size={16} />, href: '#' },
                { icon: <FaInstagram size={16} />, href: '#' },
                { icon: <FaTwitter size={16} />, href: '#' },
                { icon: <FaGithub size={16} />, href: '#' },
              ].map((s, i) => (
                <a key={i} href={s.href} 
                   className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 transition-all transform hover:-translate-y-1">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-4">
              {platformLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>



          {/* Contact */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Contact Us</h4>
            <div className="space-y-5">
              <a href="mailto:support@atorax.com" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all shrink-0">
                  <FaEnvelope size={14} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1">Email</div>
                  <div className="text-gray-300 text-sm group-hover:text-white transition-colors">support@atorax.com</div>
                </div>
              </a>
              
              <a href="tel:+917829104024" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all shrink-0">
                  <FaPhoneAlt size={14} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1">Phone</div>
                  <div className="text-gray-300 text-sm group-hover:text-white transition-colors">+91 7829104024</div>
                </div>
              </a>
              
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all shrink-0">
                  <FaMapMarkerAlt size={14} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium mb-1">Office</div>
                  <div className="text-gray-300 text-sm group-hover:text-white transition-colors">Bengaluru, KA, India</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Atorax. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {legalLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-gray-500 hover:text-white text-sm transition-colors">
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
