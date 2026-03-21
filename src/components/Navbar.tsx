import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { COMPANY_DETAILS } from '../constants';

const SCROLL_THRESHOLD = 70;
const THROTTLE_MS = 120;

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navbarHidden, setNavbarHidden] = useState(false);
  const lastScrollY = useRef(0);
  const lastRun = useRef(0);
  const location = useLocation();
  const isPortal = location.pathname === '/daga';

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastRun.current < THROTTLE_MS) return;
      lastRun.current = now;
      const y = window.scrollY;
      if (y > SCROLL_THRESHOLD) {
        setNavbarHidden(y > lastScrollY.current);
      } else {
        setNavbarHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isPortal) return null;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ y: navbarHidden ? '-100%' : 0 }}
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center"
      >
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/dpeipics/DpeiLogo.png" 
            alt="DEE PIESS Logo" 
            className="w-10 h-10 object-contain"
          />
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight uppercase leading-none">DEE PIESS</span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-white/40 font-bold group-hover:text-brand-gold transition-colors">Interior Contractor</span>
          </div>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-white/60">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`hover:text-white transition-colors ${location.pathname === link.path ? 'text-white' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/contact" className="hidden sm:block bg-white text-black px-5 py-2 rounded-full text-[11px] uppercase tracking-widest font-bold hover:bg-brand-gold transition-all active:scale-95">
            Get in Touch
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-black md:hidden flex flex-col p-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-8"
          >
            <div className="flex justify-end items-center shrink-0 mb-6">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex h-12 w-12 min-h-[48px] min-w-[48px] items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X size={26} strokeWidth={2} />
              </button>
            </div>
            <div className="flex flex-col gap-8 flex-1 min-h-0 overflow-y-auto">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-serif font-bold tracking-tight hover:text-brand-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif italic text-brand-gold hover:text-white transition-colors"
              >
                Get in Touch
              </Link>
            </div>
            
            <div className="mt-auto pt-8 border-t border-white/10 shrink-0">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-4">Contact</p>
              <p className="text-sm text-white/60 mb-1">dpei.projects@gmail.com</p>
              <p className="text-sm text-white/60">WhatsApp {COMPANY_DETAILS.phoneWhatsappDisplay}</p>
              <p className="text-sm text-white/60">{COMPANY_DETAILS.phoneSecondaryDisplay}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
