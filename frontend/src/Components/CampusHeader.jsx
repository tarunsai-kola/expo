import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/aiiens_logo.jpeg';

const navLinks = [
  { label: 'Why Aiiens', href: '#why-aiiens', type: 'scroll' },
  { label: 'Ecosystem', href: '#ecosystem', type: 'scroll' },
  { label: 'Partnership Model', href: '#partnership-model', type: 'scroll' },
  { label: 'Implementation', href: '#implementation', type: 'scroll' },
];

const CampusHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/' + href);
      return;
    }
    
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="w-full max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between gap-4">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img src={logo} alt="Aiiens Campus" className="h-8 w-auto rounded-md" />
            <span className="font-['Instrument_Sans'] text-xl font-bold text-white tracking-tight">
              Aiiens Campus
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="font-['Instrument_Sans'] text-sm font-medium text-white/70 hover:text-white transition-colors whitespace-nowrap"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/masterclass"
              className="font-['Instrument_Sans'] text-sm font-medium text-white/70 hover:text-white transition-colors whitespace-nowrap"
            >
              Masterclass
            </Link>
            <Link
              to="/Advance"
              className="font-['Instrument_Sans'] text-sm font-medium text-white/70 hover:text-white transition-colors whitespace-nowrap"
            >
              All Programs
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <Link
              to="/login"
              className="font-['Instrument_Sans'] text-sm font-semibold text-white/80 hover:text-white border border-white/20 px-4 py-2 rounded-full transition-colors"
            >
              Login
            </Link>
            <a
              href="/AIIENS Brochure.pdf"
              download
              className="font-['Instrument_Sans'] text-sm font-medium text-white/70 hover:text-white transition-colors hidden lg:block"
            >
              Download Deck
            </a>
            <button
              onClick={() => scrollTo('#contact')}
              className="font-['Instrument_Sans'] bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Book a Consultation
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-2 flex-shrink-0"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed top-[72px] left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 p-6 z-40 flex flex-col gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="font-['Instrument_Sans'] text-left text-base font-medium text-white/80 hover:text-white transition-colors py-3 border-b border-white/5"
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/masterclass"
            onClick={() => setMobileOpen(false)}
            className="font-['Instrument_Sans'] text-left text-base font-medium text-white/80 hover:text-white transition-colors py-3 border-b border-white/5"
          >
            Masterclass
          </Link>
          <Link
            to="/Advance"
            onClick={() => setMobileOpen(false)}
            className="font-['Instrument_Sans'] text-left text-base font-medium text-white/80 hover:text-white transition-colors py-3 border-b border-white/5"
          >
            All Programs
          </Link>
          <div className="pt-4 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="font-['Instrument_Sans'] w-full text-center text-base font-semibold text-white border border-white/20 px-5 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Login
            </Link>
            <a
              href="/AIIENS Brochure.pdf"
              download
              className="font-['Instrument_Sans'] w-full text-center text-base font-medium text-white/70 hover:text-white transition-colors py-2"
            >
              Download Partnership Deck
            </a>
            <button
              onClick={() => { setMobileOpen(false); scrollTo('#contact'); }}
              className="font-['Instrument_Sans'] w-full bg-white text-black px-5 py-3 rounded-full text-base font-semibold hover:bg-gray-100 transition-colors text-center"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CampusHeader;