import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/LOGO3.png";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const exploreLinks = [
    { label: "Home", to: "/" },
    { label: "All Programs", to: "/Mentorship" },
    { label: "Advanced Programs", to: "/Advance" },
    { label: "Masterclass", to: "/MasterClass" },
  ];

  const supportLinks = [
    { label: "Events", to: "/events" },
    { label: "Alumni Outcomes", to: "/Alumni" },
    { label: "About Us", to: "/AboutUs" },
    { label: "Career", to: "/Career" },
  ];

  return (
    <footer style={{
      background: '#0F1115',
      color: '#fff',
      paddingTop: '72px',
      paddingBottom: '32px',
      paddingLeft: '24px',
      paddingRight: '24px',
      fontFamily: "'Inter', sans-serif",
      borderTop: '1px solid rgba(255,255,255,0.07)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Main Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 lg:gap-8 pb-12 mb-7 border-b border-white/5">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              display: 'inline-block',
              padding: '10px 16px',
              marginBottom: '20px',
            }}>
              <img src={logo} alt="Atorax" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px', maxWidth: '260px' }}>
              Structured learning, expert mentorship, and measured career outcomes for the modern tech professional.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { icon: <FaLinkedinIn size={13} />, href: '#' },
                { icon: <FaInstagram size={14} />, href: '#' },
                { icon: <FaTwitter size={13} />, href: '#' },
              ].map((s, i) => (
                <a key={i} href={s.href} style={{
                  width: '36px', height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)',
                  transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                  textDecoration: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div className="col-span-1 lg:col-span-2 lg:col-start-6">
            <h3 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '18px' }}>Platform</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {exploreLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover Links */}
          <div className="col-span-1 lg:col-span-2">
            <h3 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '18px' }}>Discover</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {supportLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-4 xl:col-span-3 lg:ml-auto">
            <h3 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '18px' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: <FaEnvelope size={12} />, text: 'support@atorax.com', href: 'mailto:support@atorax.com' },
                { icon: <FaPhoneAlt size={12} />, text: '+91 7829104024', href: 'tel:+917829104024' },
                { icon: <FaMapMarkerAlt size={12} />, text: 'Bengaluru, KA, India', href: null },
              ].map((c, i) => (
                c.href ? (
                  <a key={i} href={c.href} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'rgba(255,255,255,0.45)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                  >
                    <span style={{ color: '#1462EE', marginTop: '2px', flexShrink: 0 }}>{c.icon}</span>
                    {c.text}
                  </a>
                ) : (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>
                    <span style={{ color: '#1462EE', marginTop: '2px', flexShrink: 0 }}>{c.icon}</span>
                    {c.text}
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontWeight: 600, margin: 0 }}>
            © {new Date().getFullYear()} Atorax. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {[
              { label: 'Terms of Service', to: '/Terms' },
              { label: 'Privacy Policy', to: '/Privacy' },
              { label: 'Refund Policy', to: '/RefundPolicy' },
            ].map((l) => (
              <Link key={l.to} to={l.to} style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
