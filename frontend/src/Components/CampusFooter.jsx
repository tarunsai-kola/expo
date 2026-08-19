import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, FileDown, ArrowRight } from 'lucide-react';
import logo from '../assets/aiiens_logo.jpeg';

const CampusFooter = () => {
  const institutionLinks = [
    { label: 'Why Aiiens Campus', href: '#why-aiiens' },
    { label: 'Partnership Ecosystem', href: '#ecosystem' },
    { label: 'Partnership Models', href: '#partnership-model' },
    { label: 'Delivery & Implementation', href: '#implementation' },
    { label: 'Outcomes & Reporting', href: '#outcomes' },
  ];
  const resourceLinks = [
    { label: 'Partnership Brochure', href: '#resources' },
    { label: 'Schedule Consultation', href: '#contact' },
    { label: 'Partnership Enquiry', href: '#contact' },
  ];
  const legalLinks = [
    { label: 'Privacy Policy', to: '/Privacy' },
    { label: 'Terms of Service', to: '/Terms' },
    { label: 'Refund Policy', to: '/RefundPolicy' },
  ];

  const scrollTo = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer style={{
      background: '#091e42',
      color: 'rgba(255,255,255,0.75)',
      fontFamily: 'Inter, sans-serif',
      paddingTop: 80,
      paddingBottom: 32,
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>

        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.2fr',
          gap: 48,
          marginBottom: 64,
        }}
          className="campus-footer-grid"
        >
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <img src={logo} alt="Aiiens Campus" style={{ height: 36, borderRadius: 8 }} />
              <span style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 800, fontSize: 17,
                color: '#ffffff',
                letterSpacing: '-0.01em',
              }}>Aiiens Campus</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 24, maxWidth: 320 }}>
              Industry-readiness partner for engineering colleges. We work with institutions to strengthen
              the practical layer — semester by semester.
            </p>
            <a href="/AIIENS Brochure.pdf" download style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 12,
              marginBottom: 24,
              cursor: 'pointer',
              transition: 'all 0.2s',
              textDecoration: 'none',
            }}
            >
              <FileDown size={16} color="rgba(255,255,255,0.7)" />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
                Download Partnership Deck
              </span>
            </a>
            {/* Social links removed pending live URLs
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { Icon: Linkedin, href: '#' },
                { Icon: Instagram, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href}
                  style={{
                    width: 38, height: 38, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none', transition: 'all 0.2s',
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            */}
          </div>

          {/* Institution links */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 13, color: '#ffffff', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 20 }}>
              Institution
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {institutionLinks.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 13.5, color: 'rgba(255,255,255,0.6)',
                      fontFamily: 'Inter, sans-serif',
                      padding: 0, textAlign: 'left',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.target.style.color = '#ffffff'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 13, color: '#ffffff', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 20 }}>
              Resources
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {resourceLinks.map(link => (
                <li key={link.label}>
                  {link.label === 'Partnership Brochure' ? (
                    <a
                      href="/AIIENS Brochure.pdf"
                      download
                      style={{
                        display: 'inline-block',
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: 13.5, color: 'rgba(255,255,255,0.6)',
                        fontFamily: 'Inter, sans-serif',
                        padding: 0, textAlign: 'left',
                        transition: 'color 0.2s',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={e => e.target.style.color = '#ffffff'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => scrollTo(link.href)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: 13.5, color: 'rgba(255,255,255,0.6)',
                        fontFamily: 'Inter, sans-serif',
                        padding: 0, textAlign: 'left',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.target.style.color = '#ffffff'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
              <li style={{ marginTop: 8 }}>
                <Link to="/blog"
                  style={{
                    fontSize: 13.5, color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none', transition: 'color 0.2s',
                  }}
                >
                  Blog & Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: 13, color: '#ffffff', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 20 }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                {
                  Icon: Mail,
                  label: 'Email',
                  value: 'campus@aiiensedu.com',
                  href: 'mailto:campus@aiiensedu.com',
                },
                {
                  Icon: Phone,
                  label: 'Phone',
                  value: '+91 90141 10638',
                  href: 'tel:+919014110638',
                },
                {
                  Icon: MapPin,
                  label: 'Office',
                  value: 'Vizianagaram, Andhra Pradesh, India',
                  href: null,
                },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                  }}>
                    <Icon size={15} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 2, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      {label}
                    </div>
                    {href ? (
                      <a href={href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
                        {value}
                      </a>
                    ) : (
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick CTA */}
            <button
              onClick={() => scrollTo('#contact')}
              style={{
                marginTop: 24,
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '11px 20px',
                background: '#1A56DB',
                color: '#ffffff',
                border: 'none', borderRadius: 999,
                fontSize: 13, fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Schedule Consultation
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 28 }} />

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
            © {new Date().getFullYear()} Aiiens Campus. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {legalLinks.map(link => (
              <Link
                key={link.label}
                to={link.to}
                style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .campus-footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 600px) {
          .campus-footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default CampusFooter;
